var express = require('express');
var router = express.Router();

const Superhero = require('../models/Superhero');

/* List all superheroes. */
router.get('/', async (req, res) => {
  let data = await Superhero.find({});
  console.info(`records retrieved from mongoose:`, data?.length)
  res.send(data);
});

router.post('/', async (req, res) => {
  let superheroToCreate = req.body
  try {
    let newSuperhero = new Superhero(superheroToCreate)
    await newSuperhero.save()
    console.log("Created superhero", newSuperhero)
    res.send(newSuperhero)  
  }
  catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


module.exports = router;
