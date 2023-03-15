const { users, thoughts } = require('../models');

module.exports = {
// Get all users
getUsers(req, res) {
  users
    .find({})
    .select('-__v')
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// Get a single user by ID

getSingleUser(req, res) {
  users
    .findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// Create a user
createUser(req, res) {
  users
    .create(req.body)
    .then((newUser) => res.json(newUser))
    .catch((err) => res.status(500).json(err));
},

// Update a user by ID

updateUser(req, res) {
  users
    .findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
},

// Delete a user by ID

deleteUser(req, res) {
  users
    .findOneAndDelete({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json('User deleted!');
    })
    .catch((err) => res.status(500).json(err));
},

// Add a friend to a user's friend list

addFriend(req, res) {
  users
    .findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
},

// Remove a friend from a user's friend list

removeFriend(req, res) {
  users
    .findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
  },
};
