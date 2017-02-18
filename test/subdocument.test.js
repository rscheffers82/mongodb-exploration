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
        assert(user.posts[0].title === 'My 2nd blog post');
        done();
      })

  });

  it('can remove an existing subdocument', (done) => {
    const roy = new User({ name: 'Roy', posts: [{ title: 'My 3rd blog post' }] });

    roy.save()
      .then( () => User.findOne({ name: 'Roy' }) )
      .then( (user) => {
        // for removing sub-documents, we need to call save.
        // this in contrary to roy.remove() for removing the record which does it automatically for us
        user.posts[0].remove();
        return user.save();
      })
      .then( () => User.findOne( { name: 'Roy' }) )
      .then( (user) => {
        assert( user.posts[0] === undefined );
        done();
      });

  });

});
