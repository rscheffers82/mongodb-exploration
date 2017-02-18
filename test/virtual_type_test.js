const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

  it('postCount returns number of posts', (done) => {
    const roy = new User({
      name: 'RoyS',
      posts: [{ title: 'Be creative...'}]
    });

    roy.save()
    .then( () => User.findOne({ name: 'RoyS' }) )
    .then( (user) => {
      assert(user.postCount === 1);
      done();
    });
  });
});
