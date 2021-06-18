require('./dbMongo')
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

const Superhero = mongoose.model('Superhero', superheroSchema, 'superhero');

async function findAll() { 
  return Superhero.find({}) 
}

async function findById(id) { 
  return Superhero.findOne({_id: id})
}

async function create(superheroToCreate) { 
  let newSuperhero = new Superhero(superheroToCreate)
  return newSuperhero.save()
} 

async function update(id, superheroToUpdate) {
  return Superhero.findByIdAndUpdate(id, superheroToUpdate)
}

async function deleteSuperhero(id) {
  return Superhero.findByIdAndDelete(id)
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteSuperhero
}