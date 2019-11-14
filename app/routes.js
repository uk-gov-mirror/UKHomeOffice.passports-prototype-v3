const express = require('express')
const router = express.Router()
const Wizard = require('hmpo-form-wizard');

let steps = require('./steps');
let fields = require('./fields');

let wizard = Wizard(steps, fields, {
    name: 'filter',
    templatePath: 'pages',
    editable: true,
    editBackStep: '/apply/confirm',
    controller: require('./controllers/default')
});

router.use(wizard);

module.exports = router
