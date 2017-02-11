const mongoose = require('mongoose');

// using connect, ://server / mongodb name
// the database users_test will be created if it is not present. Mongoose takes care of this.

// .connection, try to connect to the db
// event handles:
// - .once  execute once when the open event occurs. That happens when we connect to the DB
// - on     always execute when the error event occurs. No connection can be made or it drops
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('good to go!'))
  .on('error', (error) => {
    console.warn('Warning: ', error);
  });

// Models are used to represent all records in a specific collection
// A model represents the entire collection, e.g. Users, States, Cars, etc.
// Model, the entire collection
// Instance of a Model, is one record of e.g. User, State, Car...

// A Schema tells exactly which fields each record needs to have.
// In a Schema you label the fieds and of which type they are.
// Schema tells the model which properties are required
