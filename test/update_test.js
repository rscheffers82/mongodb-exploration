const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let roy;

  beforeEach( (done) => {
    roy = new User({ name: 'Roy Scheffers'});
    roy.save()
      .then( () => done() );
  });

// helper function to make the same assertions for our various DB actions / operations
function assertName(operation, done) {
  operation
    .then( () => User.find({}) )
    .then( (users) => {
      assert(users.length === 1);
      assert(users[0].name === 'R.G.G. Scheffers');
      done();
    });
}

  it('instance type using set \'n save', (done) => {
    // use this to update (several properties on) an instance and THEN call save once
    roy.set('name', 'R.G.G. Scheffers');
    assertName(roy.save(), done);
  });

  it('A model instance can update', (done) => {
    // Data is ready to go and can be updated, touches the DB right away
    assertName( roy.update({ name: 'R.G.G. Scheffers' }), done );
  });

  it('A model class can update', (done) => {
    assertName(
      User.update( {name: 'Roy Scheffers'}, { name: 'R.G.G. Scheffers'} ),
      done
    );
  });

  it('A model class can update on record', (done) => {
    // use when to update a unique entry
    assertName(
      User.findOneAndUpdate( {name: 'Roy Scheffers'}, { name: 'R.G.G. Scheffers'} ),
      done
    );
  });

  it('A model class can find a record with an ID and update', (done) => {
    // use when to update a unique entry, this time use the ID
    assertName(
      User.findByIdAndUpdate( roy._id, { name: 'R.G.G. Scheffers'} ),
      done
    );
  });
});
