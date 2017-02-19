const mongoose = require('mongoose');
const User =require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let roy, blogPost, comment;

  beforeEach( (done) => {
    // no associations are made here yet
    roy = new User({ name: 'Roy' });
    blogPost = new BlogPost({ title: 'Roy \'s journey into Mongo', content: 'It started all with...' });
    comment = new Comment({ conent: 'Awesome blogpost!' });

    // make the associations
    roy.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = roy;

    Promise.all([ roy.save(), blogPost.save(), comment.save() ])
    .then( () => done() );
  });

  it.only('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Roy' })
      .then( (user) =>{
        console.log(user);
        done();
      });
  });

  // it('', () => {
  //
  // });
  //
  // it('', () => {
  //
  //   });
});
