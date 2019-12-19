const addressLines = [
    'addressLine1',
    'addressLine2',
    'addressTown',
    'addressPostcode'
];

let manualAddressLines = addressLines.slice();
manualAddressLines.push('addressStateProvince');

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
        // next: [
        //     '/apply/passport-details'
        // ]
        next: [
            { field: 'previousPassport', value: true, next: [
                { field: 'applicationType', value: 'first', next: '/apply/old-passport-details' },
                { field: 'applicationType', value: 'replace', next: '/apply/optional-passport-details' },
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
        revalidateIf: [ 'adult-or-child' ],
        next: [
            { field: 'change-of-name', value: true, next: [
                { field: 'adult-or-child', value: 'child', next: '/apply/previous-names' },
                '/apply/change-of-name'
            ]},
            '/apply/previous-names'
        ]
    },
    '/apply/change-of-name': {
        fields: [
            'nameChangeReason'
        ],
        revalidateIf: [ 'change-of-name' ],
        next: '/apply/previous-names'
    },
    '/apply/previous-names': {
        fields: [
            'previousNames'
        ],
        revalidateIf: [ 'change-of-name' ],
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
            { field: 'veteran', value: true, next: 'free-passport' },
            { field: 'applicationType', value: 'first', next: [
                { field: 'naturalised', value: true, next: '/apply/naturalisation-details' },
                '/apply/family-details'
            ]},
            { field: 'adultOrChild', value: 'child', next: '/apply/parents-details' },
            { field: 'isUKApplication', value: false, next: '/apply/address-manual' },
            // '/apply/address'
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
        // controller: require('../../controllers/parents'),
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
                { field: ['date-of-birth', 'naturalised', 'application-type', 'country-of-birth'],
                    op: (fieldValues, req) => Euss.isEligible(fieldValues, req), next: 'parents-eu-settled-status' },
                'parent1-details'
            ]},
            'parent1-details'
        ]
    },

    '/apply/address-manual': {
        allowedErrors: ['address-not-found', 'address-invalid'],
        fields: manualAddressLines,
        // prereqs: ['address'],
        revalidateIf: [ 'address-postcode', 'country-of-application' ],
        next: [
            { field: 'urgent', value: true, next: [
                { field: 'address-postcode', op: (fieldValue) => fieldValue && fieldValue.startsWith('BF'), next: 'hm-forces' },
                '/apply/contact-details'
            ]},
            '/apply/contact-details'
        ]
    },
    '/apply/contact-details': {
        fields: [
            'contact-email',
            'contact-email-confirm',
            'dialling-code-contact',
            'contact-phone',
            'contact-phone-group'
        ],
        next: '/apply/contact-preferences'
    },
    '/apply/contact-preferences': {
        // controller: require('../../controllers/contact-preferences'),
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
        // controller: require('../../controllers/new-passport'),
        fields: [
            'largePassport',
            'braille'
        ],
        revalidateIf: [ 'veteran' ],
        next: [
            { field: 'age-subgroup', value: '0-11', next: '/apply/relationship-to-applicant'},
            '/apply/sign'
        ]
    },
    '/apply/sign': {
        fields: [
            'canSign',
            'noSignReason'
        ],
        next: [
            { field: 'urgent', value: true, next: '/apply/confirm' },
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
        next: '/apply/costs'
    },
    '/apply/costs': {
    }
}
