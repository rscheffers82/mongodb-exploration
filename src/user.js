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
  // subdocuments or imbedded documents
  posts: [Postschema],
  likes: Number,
  // own model
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// see the function() instead of () =>
// This is because the this will then be linked to the user object
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// user function instead of () => to make this available
UserSchema.pre('remove', function(next) {
  // this = user / roy
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: { $in: this.blogPost } })
    .then( () => next() );      // call next to move on to the next middleware
  // go through the BlogPost model
  // if the _id is $in blogPost (collection of user's blogposts)
  // remove it
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
