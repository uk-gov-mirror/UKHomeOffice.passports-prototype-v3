module.exports = {
    'is-uk-application': {
        formatter: 'boolean',
        validate: 'required'
    },
    'country-of-application': {
        items: require('./data/countries'),
        validate: 'required',
        dependent: { field: 'is-uk-application', value: false }
    },
    'date-of-birth': {
        validate: [
            // 'required',
            'date',
            // { type: 'before' },
            // { type: 'after', arguments: config.eligibility.after }
        ],
        autocomplete: 'bday'
    },
    'previous-passport': {
        formatter: 'boolean',
        validate: 'required',
        items: [{
            value: true
        }, {
            value: false
        }]
    },
    'passport-lost': {
        formatter: 'boolean',
        validate: 'required',
        items: [{
            value: true
        }, {
            value: false
        }]
    },
    'passport-issue': {
        // validate: [
        //     'required',
        //     'date',
        //     {
        //         type: 'before'
        //     }, {
        //         type: 'after',
        //         arguments: config.eligibility.after
        //     }, {
        //         type: 'afterField',
        //         arguments: ['date-of-birth', true]
        //     }
        // ],
        // autocomplete: 'passport-issue',
        // offset: 11,
    },
    'passport-issuing-authority': {
        // validate: 'required',
        items: [
            'not-other',
            'other'
        ],
    },
    'damaged': {
        formatter: 'boolean',
        // validate: 'required',
        items: [{
            value: true
        }, {
            value: false
        }]
    },
    'damaged-reason': {
        validate: [
            // 'required',
            'alphanumex1',
            { type: 'maxlength', arguments: 250 }
        ],
        dependent: {
            field: 'damaged',
            value: true
        },
        // attributes: {
        //     'spellcheck': 'true',
        //     'autocapitalize': 'sentences'
        // }
    },
    'other-passports': {
        formatter: 'boolean',
        // validate: 'required',
        items: [{
            value: true
        }, {
            value: false
        }]
    },


}
