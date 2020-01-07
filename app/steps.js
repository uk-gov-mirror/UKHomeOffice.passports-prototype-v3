const apply = {
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
            'photoMethod'
        ],
        next: [
            { field: 'photoMethod', value: 'photo-code', next: '/photo/retrieve' },
            '/photo/how-to-take-a-photo'
        ]
    },
    '/photo/how-to-take-a-photo': {
        next: '/photo/upload'
    },
    '/photo/upload': {
        controller: require('./controllers/upload'),
        fields: [
            'photo'
        ],
        next: [
            { field: 'photoQuality', value: 'good', next: '/photo/photo-check-result-good' },
            { field: 'photoQuality', value: 'fair', next: '/photo/photo-check-result-fair' },
            { field: 'photoQuality', value: 'poor', next: '/photo/photo-check-result-poor' },
            '/photo/not-accepted'
        ]
    },
    '/photo/photo-check-result-poor': {
        template: 'photo/photo-check-result',
        next: '/photo/choose-submit-photo'
    },
    '/photo/photo-check-result-fair': {
        template: 'photo/photo-check-result',
        next: '/photo/choose-submit-photo'
    },
    '/photo/photo-check-result-good': {
        template: 'photo/photo-check-result',
        next: '/photo/choose-submit-good-photo'
    },
    '/photo/choose-submit-photo': {
        next: '/filter/previous-passport'
    },
    '/photo/choose-submit-good-photo': {
        fields: [
            'submitPhoto'
        ],
        next: [
            { field: 'submitPhoto', value: false, next: '/photo/choose-photo-method' },
            '/filter/previous-passport'
        ]
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
        next: [
            { field: 'previousPassport', value: true, next: [
                { field: 'lost', value: true, next: '/apply/optional-passport-details' },
                { field: 'applicationType', value: 'first', next: '/apply/old-passport-details' },
                '/apply/passport-details'
            ]},
            '/apply/name'
        ]
    },

    '/apply/passport-details': {
        fields: [
            'passportNumber',
            'passportExpiry',
        ],
        next: '/apply/name'
    },
    '/apply/old-passport-details': {
        fields: [
            'oldPassportNumber',
            'oldPassportExpiry'
        ],
        next: '/apply/name'
    },
    '/apply/optional-passport-details': {
        fields: [
            'optionalPassportNumber',
            'optionalPassportExpiry'
        ],
        next: '/apply/name'
    },
    '/apply/name': {
        fields: [
            'title',
            'otherTitle',
            'firstName',
            'lastName',
            'changeOfName'
        ],
        revalidateIf: [ 'adultOrChild' ],
        next: [
            { field: 'changeOfName', value: true, next: [
                { field: 'adultOrChild', value: 'child', next: '/apply/previous-names' },
                '/apply/change-of-name'
            ]},
            '/apply/previous-names'
        ]
    },
    '/apply/change-of-name': {
        fields: [
            'nameChangeReason'
        ],
        revalidateIf: [ 'changeOfName' ],
        next: '/apply/previous-names'
    },
    '/apply/previous-names': {
        fields: [
            'previousNames',
            'previousName1',
            'previousFirstName1',
            'previousLastName1',
            'previousName2',
            'previousFirstName2',
            'previousLastName2',
            'previousName3',
            'previousFirstName3',
            'previousLastName3'
        ],
        revalidateIf: [ 'changeOfName' ],
        next: '/apply/gender'
    },
    '/apply/gender': {
        fields: [
            'gender'
        ],
        next: '/apply/birth',
    },
    '/apply/birth': {
        fields: [
            'bornInUK',
            'countryOfBirth',
            'townOfBirth'
        ],
        next: [
            { field: 'applicationType', value: 'first', next: [
                { field: 'naturalised', value: true, next: '/apply/naturalisation-details' },
                '/apply/family-details'
            ]},
            { field: 'adultOrChild', value: 'child', next: '/apply/parents-details' },
            '/apply/address-manual'
        ]
    },
    '/apply/naturalisation-details': {
        fields: [
            'naturalisationCertificateNumber',
            'naturalisationIssueDate'
        ],
        next: '/apply/family-details'
    },
    '/apply/family-details': {
        next: '/apply/parents-details'
    },
    '/apply/parents-details': {
        fields: [
            'parent1FirstName',
            'parent1LastName',
            'parent1DateOfBirth',
            'parent1NoDetailsReason',
            'parent2FirstName',
            'parent2LastName',
            'parent2DateOfBirth',
            'parent2NoDetailsReason',
            'parentsMarried',
            'parentsMarriageDate'
        ],
        next: [
            { field: 'application-type', value: 'first', next: [
                { field: 'isEUSS', value: true, next: '/apply/parents-eu-settled-status' },
                '/apply/parent1-details'
            ]},
            '/apply/parent1-details'
        ]
    },
    '/apply/parents-eu-settled-status': {
    },
    '/apply/parent1-details': {
        fields: [
            'parent1TownOfBirth',
            'parent1CountryOfBirth',
            'parent1Nationality',
            'parent1HasPassport',
            'parent1PassportNumber',
            'parent1PassportIssueDate'
        ],
        next: '/apply/parent2-details'
    },
    '/apply/parent2-details': {
        fields: [
            'parent2TownOfBirth',
            'parent2CountryOfBirth',
            'parent2Nationality',
            'parent2HasPassport',
            'parent2PassportNumber',
            'parent2PassportIssueDate'
        ],
        next: '/apply/address-manual'
    },

    '/apply/address-manual': {
        fields: [
            'addressLine1',
            'addressLine2',
            'addressTown',
            'addressPostcode'
        ],
        next: [
            { field: 'addressPostcode', op: postcode => postcode && postcode.startsWith('BF'), next: '/apply/hm-forces' },
            '/apply/contact-details'
        ]
    },
    '/apply/hm-forces': {
    },
    '/apply/contact-details': {
        fields: [
            'contactEmail',
            'contactEmailConfirm',
            'diallingCodeContact',
            'contactPhone',
            'contactPhoneGroup'
        ],
        next: '/apply/contact-preferences'
    },
    '/apply/contact-preferences': {
        fields: [
            'contactPrefsEmail',
            'contactPrefsSMS',
            'diallingCodeSMS',
            'mobilePhone',
            'mobilePhoneGroup'
        ],
        next: '/apply/new-passport'
    },
    '/apply/new-passport': {
        fields: [
            'largePassport',
            'braille'
        ],
        editBackStep: '/apply/cost',
        next: [
            { field: 'ageGroup', value: 'under12', next: '/apply/relationship-to-applicant'},
            '/apply/sign'
        ]
    },
    '/apply/sign': {
        fields: [
            'canSign',
            'noSignReason'
        ],
        next: [
            { field: 'isUKApplication', value: true, next: [
                { field: 'adultOrChild', value: 'child', next: '/apply/relationship-to-applicant' },
                '/apply/who-for'
            ]},
            { field: 'adultOrChild', value: 'child', next: '/apply/relationship-to-applicant' },
            '/apply/who-for'
        ]
    },
    '/apply/who-for': {
        fields: [
            'thirdParty'
        ],
        next: [
            { field: 'thirdParty', value: true, next: '/apply/relationship-to-applicant' },
            '/apply/confirm'
        ]
    },
    '/apply/confirm': {
        // next: '/apply/cost'
        editable: false,
        next: [
            // { field: DpsPromotion.dpsCheckedFields,
            //     op: (fieldValues, req, res) => DpsPromotion.isEligible(fieldValues, req, res),
            //     next: '/apply/passport-urgent' },
            { field: 'csigRequired', value: true, next: '/apply/confirm-identity' },
            { field: 'urgent', value: true, next: '/apply/cost' },
            { field: 'noDocuments', value: true, next: '/apply/cost' }, // TODO: add noDocuments logic to trigger
            '/apply/documents-to-send'
        ]
    },
    '/apply/confirm-identity': {
        next: [
            { field: 'noDocuments', value: true, next: '/apply/cost' },
            '/apply/documents-to-send'
        ]
    },
    '/apply/documents-to-send': {
        // controller: require('../../controllers/documents-to-send'),
        fields: [
            'documents-to-send'
        ],
        next: [
            { field: 'documents-to-send', value: false, next: '/apply/cost' },
            { field: 'isUKApplication', value: true, next: '/apply/passport-delivery' },
            '/apply/cost'
        ]
    },
        '/apply/passport-delivery': {
        // controller: require('../../controllers/delivery'),
        fields: [
            'secureDelivery'
        ],
        editBackStep: '/apply/cost',
        next: '/apply/cost'
    },
    '/apply/cost': {
        // controller: require('../../controllers/cost'),
        editable: false,
        revalidateIf: [ '*' ],
        next: '/apply/declaration'
    },
    '/apply/declaration': {
        // controller: require('../../controllers/declaration'),
        editable: false,
        fields: [
            'declaration'
        ],
        revalidateIf: [ '*' ],
        next: [
            // { fn: Captcha.needsCaptcha, next: 'captcha' },
            // { fn: req => featureFlag.isEnabled('govPay', req), next: [
            //     { field: 'cost', value: 0, next: 'submit-application'},
            //     'initialise-payment'
            // ]},
            '/apply/payment'
        ]
    },
    '/apply/payment': {
        // controller: require('../../controllers/payment'),
        editable: false,
        // revalidate: true,
        // csrf: false,
        // fields: ['base64Response'],
        // next: '/apply/payment-submission'
        next: '/apply/next-steps'
    },
    // '/apply/payment-submission': {
        // controller: require('../../controllers/payment-submission'),
        // editable: false,
        // revalidate: true,
        // next: '/apply/next-steps'
    // },
    // '/apply/initialise-payment': {
        // controller: require('../../controllers/initialise-payment'),
    //     editable: false,
    //     next: '/apply/redirect-to-gov-pay'
    // },
    // '/apply/redirect-to-gov-pay': {
        // controller: require('../../controllers/redirect-to-gov-pay'),
        // skip: true,
    //     editable: false
    // },
    // '/apply/complete-payment': {
        // controller: require('../../controllers/complete-payment'),
        // prereqs: ['initialise-payment'],
        // skip: true,
    //     next: '/apply/submit-application'
    // },
    // '/apply/submit-application': {
        // controller: require('../../controllers/submit-application'),
    //     editable: false,
    //     next: '/apply/next-steps'
    // },
    '/apply/next-steps': { // TODO: add logic to trigger `next-steps-csig` and `next-steps-csig-no-docs.html`, or refactor and consolidate pages
        // controller: require('../../controllers/next-steps'),
        backLink: false,
        editable: false,
        // noPost: true
    },
    '/apply/next-steps-csig': {
        backLink: false,
        editable: false,
    },
    '/apply/next-steps-csig-no-docs': {
        backLink: false,
        editable: false,
    },
}

const tracking = {
    '/track': {
        entryPoint: true,
        skip: true,
        next: '/track/reference'
    },
    '/track/reference': {
        fields: [
            'appReference'
        ],
        next: '/track/email'
    },
    '/track/email': {
        fields: [
            'trackDateOfBirth',
            'trackEmail'
        ],
        next: '/track/view'
    },
    '/track/view': {
    }
}

module.exports = {
    apply,
    tracking
}
