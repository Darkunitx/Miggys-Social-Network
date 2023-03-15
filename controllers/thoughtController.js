const { users, thoughts } = require('../models');

module.exports = {
//  Get all thoughts

getThoughts(req, res) {
  thoughts
    .find({})
    .select('-__v')
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// Get a single thought by ID
getSingleThought(req, res) {
  thoughts
    .findOne({ _id: req.params.thoughtId })
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// Create a thought
createThought(req, res) {
  thoughts
    .create(req.body)
    .then((newThought) => { 
      return users.findOneAndUpdate(
      { _id: req.body.userID },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
  })
  .then((users) => {
    if (!users) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(users);
    })
  .catch((err) => res.json(err));
},

// Update a thought by ID

updateThought(req, res) {
  thoughts
    .findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    })
    .catch((err) => res.status(500).json(err));
},

// Delete a thought by ID

// MUST FIX DELETED ROUTES

deleteThought(req, res) {
  thoughts.findOneAndRemove({ _id: req.params.thoughtId })
  .then ((thought) =>
      !thought
          ? res
              .status(404)
              .json ({ message: "No thought found with this id!"})
          : res.json ({message: "Thought has been successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
},

addReaction(req, res) {
  thoughts
    .findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then((users) => {
      if (!users) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(users);
    })
    .catch((err) => res.status(500).json(err));
},

removeReaction(req, res) {
  thoughts
    .findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    })
    .catch((err) => res.status(500).json(err));
},

};
