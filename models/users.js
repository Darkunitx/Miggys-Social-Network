const { Schema, Types, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      }],
    friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    }],
  },
  {
    toJSON: {
      getters: true,
      virtual : true,
    },
    id: false,
  }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const users = model('users', userSchema);

module.exports = users;
