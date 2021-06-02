const router = require('express').Router()

const superheroRouter = require('./superhero')
const authRouter = require('./auth')

router.use('/auth', authRouter)
router.use('/superhero', superheroRouter)

module.exports = router