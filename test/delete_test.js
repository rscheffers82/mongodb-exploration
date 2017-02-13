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

  it('class method remove', (done) => {
    // User the User model class
    // Use this method to remove multiple records that specify the criteria
    User.remove( { name: 'Roy Scheffers' })
      .then( () => User.findOne({ name: 'Roy Scheffers'}) )
      .then( (user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    // User the User model class
    User.findOneAndRemove( { name: 'Roy Scheffers' })
      .then( () => User.findOne({ name: 'Roy Scheffers'}) )
      .then( (user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    // User the User model class
    User.findByIdAndRemove( roy._id )
      .then( () => User.findOne({ name: 'Roy Scheffers'}) )
      .then( (user) => {
        assert(user === null);
        done();
      });
  });
});
