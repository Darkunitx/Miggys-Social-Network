const router = require('express').Router();
const {
  getUsers,
  // getSingleUser,
   createUser,
  // deleteUser,
  // addFriend,
  // removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// // /api/students/:userId/friends/:friendId
// router.route('/:userId/friends:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
