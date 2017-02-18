const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it('requires a user\'s name longer than 2 chars long', () => {
    const user = new User({ name: 'Al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('should disallow invalid records from being saved', (done) => {
    // use the .catch to get the error message and then display it to the user.
    const user = new User({ name: 'Al'});
    user.save()
      .catch( (validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters');
        done();
      });
  });

});
