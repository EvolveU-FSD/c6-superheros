require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const superheroSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  nickname: String,
  alterego: String,
  sidekick: String
});

module.exports = mongoose.model('Superhero', superheroSchema, 'superhero');