const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');

describe('Reading users out of the database', () => {

  beforeEach( (done) => {
    const roy = new User( { name: 'Roy'});
    roy.save()
      .then( () => done() );
  });

  it('finds all users with a name of Roy', () => {

  });

  it('finds specific userID', () => {

  });
});
