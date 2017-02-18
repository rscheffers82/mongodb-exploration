const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Postschema = new Schema({
  title: String,
  content: String
});

module.exports = Postschema;
