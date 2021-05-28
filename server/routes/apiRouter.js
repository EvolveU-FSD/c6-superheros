const router = require('express').Router()
const superheroRouter = require('./superhero')
router.use('/superhero', superheroRouter)
module.exports = router