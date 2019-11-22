module.exports = {
    '/filter': {
        entryPoint: true,
        resetJourney: true,
        skip: true,
        next: '/filter/overseas'
    },
    '/filter/overseas': {
        fields: [
            'isUKApplication',
            'countryOfApplication'
        ],
        next: '/filter/age'
    },
    '/filter/age': {
        fields: [
            'dateOfBirth'
        ],
        next: '/filter/previous-passport'
    },
    '/filter/previous-passport': {
        fields: [
            'previousPassport'
        ],
        next: [
            { field: 'previousPassport', value: true, next: '/filter/lost-or-stolen' },
            '/filter/naturalisation-certificate'
        ]
    },
    '/filter/lost-or-stolen': {
        fields: [
            'passportLost'
        ],
        next: [
            { field: 'passportLost', value: true, next: '/filter/cancelled-passport' },
            '/filter/issue-date'
        ]
    },
    '/filter/cancelled-passport': {
        fields: [
            'passportCancelled'
        ],
        next: [
            { field: 'passportCancelled', value: true, next: '/filter/other-passports' },
            'https://www.gov.uk/report-a-lost-or-stolen-passport'
        ]
    },
    '/filter/issue-date': {
        fields: [
            'passportIssue',
            'passportIssuingAuthority'
        ],
        next: '/filter/damaged'
    },
    '/filter/damaged': {
        fields: [
            'damaged',
            'damagedReason'
        ],
        next: '/filter/other-passports'
    },
    '/filter/naturalisation-certificate': {
        fields: [
            'naturalised'
        ],
        next: '/filter/other-passports'
    },
    '/filter/other-passports': {
        fields: [
            'otherPassports'
        ],
        next: [
            { field: 'isUKApplication', value: true, next: '/apply/summary' },
            { field: 'applicationType', value: 'first', next: '/filter/country-of-birth' },
            '/filter/british-citizen'
        ]
    },
    '/filter/country-of-birth': {
        fields: [
            'countryOfBirth'
        ],
        next: '/apply/summary'
    },
    '/filter/british-citizen': {
        fields: [
            'nationality'
        ],
        next: '/apply/summary'
    }

}
