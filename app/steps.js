module.exports = {
    '/filter': {
        entryPoint: true,
        resetJourney: true,
        skip: true,
        next: '/filter/begin'
    },
    '/filter/begin': {
        backLink: '/start.html',
        next: '/filter/overseas'
    },
    '/filter/overseas': {
        fields: [
            'isUKApplication',
            'countryOfApplication'
        ],
        next: '/filter/intro'
    },
    '/filter/intro': {
        next: '/filter/age'
    },
    '/filter/age': {
        fields: [
            'dateOfBirth'
        ],
        next: '/photo/digital-photo'
    },

    '/photo/digital-photo': {
        next: '/photo/choose-photo-method'
    },
    '/photo/choose-photo-method': {
        fields: [
            'photo-method'
        ],
        next: [
            { field: 'photo-method', value: 'photo-code', next: 'retrieve' },
            '/photo/how-to-take-a-photo'
        ]
    },
    '/photo/how-to-take-a-photo': {
        next: '/photo/upload'
    },
    '/photo/upload': {
        fields: [
            'photo'
        ],
        next: [
            { field: 'photo-quality', value: 'good', next: 'photo-check-result-good' },
            { field: 'photo-quality', value: 'fair', next: 'photo-check-result-fair' },
            { field: 'photo-quality', value: 'poor', next: 'photo-check-result-poor' },
            'not-accepted'
        ]
    },
    '/photo/photo-check-result-poor': {
        template: 'photo-check-result',
        next: '/photo/choose-submit-photo'
    },
    '/photo/photo-check-result-fair': {
        template: 'photo-check-result',
        next: '/photo/choose-submit-photo'
    },
    '/photo/photo-check-result-good': {
        template: 'photo-check-result',
        next: '/photo/choose-submit-good-photo'
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
            'lost'
        ],
        next: [
            { field: 'lost', value: true, next: '/filter/cancelled-passport' },
            '/filter/issue-date'
        ]
    },
    '/filter/cancelled-passport': {
        fields: [
            'cancelled'
        ],
        next: [
            { field: 'cancelled', value: true, next: '/filter/other-passports' },
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
            { field: 'isUKApplication', value: true, next: '/filter/summary' },
            { field: 'applicationType', value: 'first', next: '/filter/country-of-birth' },
            '/filter/british-citizen'
        ]
    },
    '/filter/country-of-birth': {
        fields: [
            'countryOfBirth'
        ],
        next: '/filter/summary'
    },
    '/filter/british-citizen': {
        fields: [
            'nationality'
        ],
        next: '/filter/summary'
    },
    '/filter/summary': {
        next: '/apply/confirm'
    },

    '/apply/confirm': {
        next: '/apply/costs'
    },
    '/apply/costs': {
    }
}
