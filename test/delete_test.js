const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let roy;

  beforeEach( (done) => {
    roy = new User({ name: 'Roy Scheffers'});
    roy.save()
      .then( () => done() );
  });

  it('model instance remove', (done) => {
    // uses Roy
    roy.remove()
      .then( () => User.findOne({ name: 'Roy Scheffers'}) )
      .then( (user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', () => {
    // User the User model class
  });

  it('class method findAndRemove', () => {
    // User the User model class

  });

  it('class method findByIdAndRemove', () => {
    // User the User model class

  });
});
