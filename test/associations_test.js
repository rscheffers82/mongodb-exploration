const mongoose = require('mongoose');
const assert = require('assert');
const User =require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let roy, blogPost, comment;

  beforeEach( (done) => {
    // no associations are made here yet
    roy = new User({ name: 'Roy' });
    blogPost = new BlogPost({ title: 'Roy \'s journey into Mongo', content: 'It started all with...' });
    comment = new Comment({ content: 'Awesome blogpost!' });

    // make the associations
    roy.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = roy;

    Promise.all([ roy.save(), blogPost.save(), comment.save() ])
    .then( () => done() );
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Roy' })
      .populate('blogPosts')
      .then( (user) =>{
        assert(user.blogPosts[0].title === 'Roy \'s journey into Mongo');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Roy' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then( (user) => {
        // console.log(user.blogPosts[0].comments[0]);
        assert(user.name == 'Roy');
        assert(user.blogPosts[0].title === 'Roy \'s journey into Mongo');
        assert(user.blogPosts[0].comments[0].content === 'Awesome blogpost!');
        assert(user.blogPosts[0].comments[0].user.name === 'Roy');
        done();
      });
  });

});
