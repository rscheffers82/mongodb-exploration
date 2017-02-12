const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');

describe('Reading users out of the database', () => {
  let roy;

  beforeEach( (done) => {
    roy = new User( { name: 'Roy'});
    roy.save()
      .then( () => done() );
  });

  it('finds all users with a name of Roy', (done) => {
    User.find({ name: 'Roy' })
      .then( (users) => {
        // console.log(users[0]._id);
        // console.log(roy._id);
        // NOTE: _id is wrapped in an object, use .toString() to convert it to a string
        assert( users[0]._id.toString() === roy._id.toString() );
        done();
      });
  });

  it('finds specific userID', (done) => {
    User.findOne({ _id: roy._id })
      .then( (user) => {
        assert( user.name === roy.name );
        done();
      });
  });
});
