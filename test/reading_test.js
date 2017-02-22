const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');

describe('Reading users out of the database', () => {
  let roy;

  beforeEach( (done) => {
    roy = new User({ name: 'Roy' });
    zoki = new User({ name: 'Zoki' });
    mattie = new User({ name: 'Mattie' });
    linda = new User({ name: 'Linda' });

    Promise.all([ roy.save(), zoki.save(), mattie.save(), linda.save() ])
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

    it('can skip and limit the result set', (done) => {
      User.find({})
        .sort({ name: 1 })
        .skip(1)
        .limit(2)
        .then( (users) => {
          assert(users.length === 2);
          assert( users[0].name === 'Mattie' );
          assert( users[1].name === 'Roy' );
          done();
        })
    });

});
