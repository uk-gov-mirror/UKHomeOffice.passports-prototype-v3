module.exports = {
    '/filter': {
        entryPoint: true,
        resetJourney: true,
        skip: true,
        next: '/filter/overseas'
    },
    '/filter/overseas': {
        // controller: require('../../controllers/overseas'),
        fields: [
            'is-uk-application',
            'country-of-application'
        ],
        // backLink: false,
        next: [
            // UK
            {
                field: 'is-uk-application',
                value: true,
                next: '/filter/age'
            },
            // OVS
            // urgent
            // {
            //     field: 'urgent',
            //     value: true,
            //     next: config.urls['urgent-not-eligible']
            // },
            // restricted country
            // {
            //     field: 'country-of-application',
            //     op: country => countries.isRestrictedById(country),
            //     next: config.urls['overseas-information']
            // },
            // all others
            '/filter/age'
        ]
    },
    '/filter/age': {
        // controller: require('../../controllers/date'),
        fields: [
            'date-of-birth'
        ],
        next: [
            // {
            //     op: 'all',
            //     value: {
            //         'urgent': true,
            //         'age-group': 'child'
            //     },
            //     next: config.urls['urgent-not-eligible']
            // }, {
            //     op: 'all',
            //     value: {
            //         'urgent': true,
            //         'age-subgroup': 'Rising16'
            //     },
            //     next: config.urls['urgent-not-eligible']
            // },
            '/filter/previous-passport'
        ]
    },
    '/filter/previous-passport': {
        fields: [
            'previous-passport'
        ],
        next: [{
            field: 'previous-passport',
            value: true,
            next: '/filter/lost-or-stolen'
        },
        //     {
        //         field: 'urgent',
        //         value: true,
        //         next: config.urls['urgent-not-eligible']
        //     },
        //     {
        //         field: 'is-uk-application',
        //         value: true,
        //         next: 'naturalisation-certificate'
        //     },
        //     {
        //         field: 'country-of-application',
        //         op: countryId => !countries.isActiveById(countryId),
        //         next: 'country-birth'
        //     },
        //     'naturalisation-certificate'
        ]
    },
    '/filter/lost-or-stolen': {
        fields: [
            'passport-lost'
        ],
        next: [{
                field: 'passport-lost',
                value: true,
                next: '/filter/cancelled-passport'
            },
            {
                field: 'urgent',
                value: true,
                next: '/filter/name-changed'
            },
            '/filter/issue-date'
        ]
    },
    '/filter/issue-date': {
        // controller: require('../../controllers/issue-date'),
        fields: [
            'passport-issue',
            'passport-issuing-authority'
        ],
        // revalidateIf: [
        //     'age-group',
        //     'country-of-application'
        // ],
        next: [
            // urgent with csig
            // {
            //     op: 'all',
            //     value: {
            //         'urgent': true,
            //         'csig-required': true
            //     },
            //     next: config.urls['urgent-not-eligible']
            // },
            // // UK
            // {
            //     field: 'is-uk-application',
            //     value: true,
            //     next: 'damaged'
            // },
            // // OVS
            // {
            //     field: 'country-of-application',
            //     op: countryId => !countries.isActiveById(countryId),
            //     next: [{
            //             field: 'application-type',
            //             value: 'first',
            //             next: 'country-birth'
            //         },
            //         config.urls['overseas-information']
            //     ]
            // },
            '/filter/damaged'
        ]
    },
    '/filter/damaged': {
        // controller: require('../../controllers/damaged'),
        fields: [
            'damaged',
            'damaged-reason'
        ],
        next: [
            // {
            //     op: 'all',
            //     value: {
            //         'urgent': true,
            //         'damaged': true
            //     },
            //     next: config.urls['urgent-not-eligible']
            // }, {
            //     field: 'application-type',
            //     value: 'first',
            //     next: 'naturalisation-certificate'
            // },
            '/filter/other-passports'
        ]
    },
    '/filter/other-passports': {
        // controller: require('../../controllers/other-passports'),
        fields: [
            'other-passports'
        ],
        next: [
            // DPS
            {
                op: 'all',
                value: {
                    'urgent': true,
                    'other-passports': true
                },
                // next: config.urls['urgent-not-eligible']
            },
            // UK
            {
                field: 'is-uk-application',
                value: true,
                // next: config.urls.apply
            },
            // OVS
            {
                field: 'application-type',
                value: 'first',
                next: 'overseas-country-of-birth'
            },
            '/filter/british-citizen'
        ]
    },

}
