const mongoose = require('mongoose');

// tell mongoose to use the ES6 promise implementation
mongoose.Promise = global.Promise;

// wrap in a before, to ensure we only run the mocha test suite once we have a connection
before( (done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => done() )
    .on('error', (error) => {
      console.warn('Warning: ', error);
    });
});

beforeEach( (done) => {
  mongoose.connection.collections.users.drop( () => done() );
});
