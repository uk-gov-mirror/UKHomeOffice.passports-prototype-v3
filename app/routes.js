const express = require('express')
const router = express.Router()
const Wizard = require('hmpo-form-wizard')

const steps = require('./steps')
const fields = require('./fields')

require('./formatters')
require('./validators')

router.use(Wizard(
    steps.apply,
    fields,
    {
        name: 'apply',
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
        name: 'apply',
        journeyName: 'tracking',
        controller: require('./controllers/track')
    }
))

router.use((err, req, res, next) => {
    if (err.code === 'SESSION_EXPIRED') return res.redirect('/');
    if (err.code === 'MISSING_PREREQ') return res.redirect('/');
    next();
})

module.exports = router
