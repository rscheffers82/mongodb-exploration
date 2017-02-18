const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Postschema = require('./post_schema');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  // subdocuments or imbedded documents
  posts: [Postschema]
});

// user is what represents the collection. If it's absent mongoose will create it
// User is the entire user class or user model, same thing
// User represents the entire collection of users
const User = mongoose.model('user', UserSchema);

module.exports = User;

// Import statements at the top
// Define hte Schema
// Create the model
// Export the model
