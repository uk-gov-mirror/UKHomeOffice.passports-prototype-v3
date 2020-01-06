const express = require('express')
const router = express.Router()
const Wizard = require('hmpo-form-wizard')

const steps = require('./steps')
const fields = require('./fields')

require('./formatters');
require('./validators');

router.use(Wizard(
    steps.apply,
    fields,
    {
        journeyName: 'apply',
        editable: true,
        editBackStep: '/apply/confirm',
        controller: require('./controllers/apply')
    }
))


router.use(Wizard(
    steps.tracking,
    fields,
    {
        journeyName: 'tracking',
        controller: require('./controllers/track')
    }
))


module.exports = router
