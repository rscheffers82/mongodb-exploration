const assert = require('assert');
// const mongoose = require('mongoose');

const User = require('../src/user');
// const Postschema = require('../src/post_schema');

describe('Subdocuments', () => {


  it('can create a subdocument', (done) => {
    const roy = new User({
      name: 'Roy',
      posts: [{ title: 'My 1st blog' }]
    });

    roy.save()
      .then( () => User.findOne({ name: 'Roy' }) )
      .then( (user) => {
        assert(user.posts[0].title === 'My 1st blog');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    const roy = new User({ name: 'Roy', posts: [] });
    roy.save()
      .then( () => User.findOne( { name: 'Roy' }) )
      .then( (user) => {
        user.posts.push({ title: 'My 2nd blog post' });
        // ensure the promise is returned to the outer promise
        return user.save();
      })
      .then( () => User.findOne( { name: 'Roy' }) )
      .then( (user) => {
                console.log(user);
        assert(user.posts[0].title === 'My 2nd blog post');
        done();
      })

  });

  // it('', (done) => {
  //
  // });

});
