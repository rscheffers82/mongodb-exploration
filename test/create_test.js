const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {

  it('saves a user', (done) => {
    // create a new user
    const roy = new User({ name: 'Roy Scheffers' });

    // save to the database
    roy.save()
      .then( () => {
        // Has the record been saved?
        assert(roy.isNew);
        done();
      });

  });
});
