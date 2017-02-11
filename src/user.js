const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

// user is what represents the collection. If it's absent mongoose will create it
// User is the entire user class or user model, same thing
// User represents the entire collection of users
const User = mongoose.model('user', UserSchema);

module.exports = User;

// Import statements at the top
// Define hte Schema
// Export the model
// Create the model
