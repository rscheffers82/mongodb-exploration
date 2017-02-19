const mongoose = require('mongoose');
const assert = require('assert');

const User =require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware test', () => {
  let roy, blogPost;

  beforeEach( (done) => {
    // no associations are made here yet
    roy = new User({ name: 'Roy' });
    blogPost = new BlogPost({ title: 'Roy \'s journey into Mongo', content: 'It started all with...' });

    // make the associations
    roy.blogPosts.push(blogPost);

    Promise.all([ roy.save(), blogPost.save() ])
    .then( () => done() );
  });

  it('should cleanup blogposts when a user is removed', (done) => {
    roy.remove()
      .then( () => BlogPost.count() )
      .then( (count) => {
        // console.log('Count: ', count);
        assert(count === 0);
        done();
      });
  });

});
