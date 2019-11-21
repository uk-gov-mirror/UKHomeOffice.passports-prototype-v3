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
        validate: 'date',
        autocomplete: 'bday'
    },
    'previous-passport': {
        formatter: 'boolean',
        validate: 'required'
    },
    'passport-lost': {
        formatter: 'boolean',
        validate: 'required'
    },
    'passport-issue': {
        validate: 'date',
        autocomplete: 'passport-issue',
        offset: 11
    },
    'passport-issuing-authority': {
    },
    'damaged': {
        formatter: 'boolean'
    },
    'damaged-reason': {
        validate: [
            'alphanumex1',
            { type: 'maxlength', arguments: 250 }
        ],
        dependent: {
            field: 'damaged',
            value: true
        }
    },
    'other-passports': {
        formatter: 'boolean'
    },


}
