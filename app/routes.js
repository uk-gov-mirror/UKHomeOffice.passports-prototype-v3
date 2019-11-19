const express = require('express')
const router = express.Router()
const Wizard = require('hmpo-form-wizard')

const steps = require('./steps')
const fields = require('./fields')

const wizard = Wizard(steps, fields, {
    name: 'filter',
    editable: true,
    editBackStep: '/apply/confirm',
    controller: require('./controllers/default')
})

router.use(wizard)

module.exports = router
