module.exports = {
    'is-uk-application': {
        formatter: 'boolean',
        validate: 'required'
    },
    'country-of-application': {
        items: require('./data/countries'),
        validate: 'required',
        dependent: { field: 'is-uk-application', value: false }
    }
}
