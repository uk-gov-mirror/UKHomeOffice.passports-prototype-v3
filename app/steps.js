module.exports = {
    '/filter': {
        entryPoint: true,
        resetJourney: true,
        skip: true,
        next: '/filter/overseas'
    },
    '/filter/overseas': {
        fields: [
            'is-uk-application',
            'country-of-application'
        ]
    }
}
