require('./dbMongo')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String
});

let User = mongoose.model('User', userSchema, 'user');

function findByUsername(username) {
  return User.findOne({username})
}

function findById(id) {
  return User.findById(id)
}

module.exports = {
  findByUsername,
  findById
}