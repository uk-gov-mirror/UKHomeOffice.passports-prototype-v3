module.exports = {
    isUKApplication: {
        formatter: 'boolean',
        validate: 'required'
    },
    countryOfApplication: {
        items: require('./data/countries'),
        validate: 'required',
        dependent: { field: 'isUKApplication', value: false }
    },
    dateOfBirth: {
        validate: ['required', 'date'],
        autocomplete: 'bday'
    },

    photoMethod: {
        validate: 'required'
    },
    photo: {
    },
    submitPhoto: {
        formatter: 'boolean',
        validate: 'required'
    },

    previousPassport: {
        formatter: 'boolean',
        validate: 'required'
    },
    lost: {
        formatter: 'boolean',
        validate: 'required'
    },
    cancelled: {
        formatter: 'boolean',
        validate: 'required'
    },
    passportIssue: {
        validate: ['required', 'date'],
        autocomplete: 'passport-issue',
        offset: 11
    },
    passportIssuingAuthority: {
    },
    damaged: {
        formatter: 'boolean'
    },
    damagedReason: {
        validate: [
            'required',
            'alphanumex1',
            { type: 'maxlength', arguments: 250 }
        ],
        dependent: { field: 'damaged', value: true }
    },
    naturalised: {
        formatter: 'boolean',
        validate: 'required'
    },
    otherPassports: {
        formatter: 'boolean',
        validate: 'required'
    },
    countryOfBirth: {
        items: require('./data/birth-countries'),
        validate: 'required'
    },
    nationality: {
        validate: 'required'
    },
    passportNumber: {
        validate: [
            'required',
            'numeric',
            { type: 'exactlength', arguments: 9 }
        ]
    },
    passportExpiry: {
        validate: [
            'required',
            'date'
        ],
        autocomplete: 'hmpo-passport-expiry',
        offset: 20
    },
    oldPassportNumber: {
        formatters: [
            'removespaces',
            'uppercase'
        ],
        validate: [
            'required',
            'alphanum',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 }
        ]
    },
    oldPassportExpiry: {
        validate: [
            'required',
            'date'
        ],
        autocomplete: 'hmpo-passport-expiry',
        offset: 20
    },
    optionalPassportNumber: {
        formatters: [
            'removespaces',
            'uppercase'
        ],
        validate: [
            'alphanum',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 }
        ]
    },
    optionalPassportExpiry: {
        validate: [
            'date'
        ],
        autocomplete: 'hmpo-passport-expiry',
        offset: 20
    },
    title: {
        validate: 'required'
    },
    otherTitle: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 20 }
        ],
        dependent: {
            field: 'title',
            value: 'Other'
        }
    },
    firstName: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 30 }
        ]
    },
    lastName: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
        ]
    },
    changeOfName: {
        formatter: 'boolean',
        validate: 'required'
    },
    nameChangeReason: {
        validate: 'required'
    },
    previousNames: {
        formatter: 'boolean',
        validate: 'required'
    },
    previousFirstName1: {
        errorGroup: "previousName1",
        validate: 'required',
        dependent: 'previousNames'
    },
    previousLastName1: {
        errorGroup: "previousName1",
        validate: 'required',
        dependent: 'previousNames'
    },
    previousFirstName2: {
        errorGroup: "previousName2",
        dependent: 'previousNames'
    },
    previousLastName2: {
        errorGroup: "previousName2",
        dependent: 'previousNames'
    },
    previousFirstName3: {
        errorGroup: "previousName3",
        dependent: 'previousNames'
    },
    previousLastName3: {
        errorGroup: "previousName3",
        dependent: 'previousNames'
    },
    previousNames: {
        formatter: 'boolean',
        validate: 'required'
    },
    previousNames: {
        formatter: 'boolean',
        validate: 'required'
    },
    gender: {
        validate: 'required',
    },
    bornInUK: {
        formatter: 'boolean',
        validate: 'required'
    },
    countryOfBirth: {
        items: require('./data/countries'),
        validate: 'required',
        dependent: { field: 'bornInUK', value: false }
    },
    townOfBirth: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
        ]
    },
    naturalisationCertificateNumber: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 12 },
            // 'alphanum'
        ]
    },
    naturalisationIssueDate: {
        validate: [
            'required',
            'date',
            { type: 'before' }
        ],
        autocomplete: 'nat-reg-date'
    },
    parent1FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 },
            // 'firstname'
        ]
    },
    parent1LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 },
            // 'surname'
        ]
    },
    parent1DateOfBirth: {
        validate: [
            'date',
            // { type: 'before' },
        ],
        autocomplete: 'parent1-bday'
    },
    parent1NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 },
            'alphanumex1'
        ]
    },
    parent1TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 },
            // 'townOfBirth'
        ]
    },
    parent1CountryOfBirth: {
        items: require('./data/countries'), // TODO: replace with birth countries library
        validate: 'required',
    },
    parent1Nationality: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 19 },
            // 'nationality'
        ]
    },
    parent1HasPassport: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parent1PassportNumber: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 },
            'alphanum'
        ],
        dependent: 'parent1-has-passport'
    },
    parent1PassportIssueDate: {
        validate: [
            'date',
            // { type: 'before' },
        ],
        autocomplete: 'parent1-issue-date',
        dependent: 'parent1-has-passport'
    },
    parent2FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 },
            // 'firstname'
        ]
    },
    parent2LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 },
            // 'surname'
        ]
    },
    parent2DateOfBirth: {
        validate: [
            'date',
            // { type: 'before' },
        ],
        autocomplete: 'parent2-bday'
    },
    parent2NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 },
            // 'alphanumex1'
        ]
    },
    parent2TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 },
            // 'townOfBirth'
        ]
    },
    parent2CountryOfBirth: {
        items: require('./data/birth-countries'),
        validate: 'required'
    },
    parent2Nationality: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 19 },
            // 'nationality'
        ]
    },
    parent2HasPassport: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parent2PassportNumber: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 },
            'alphanum'
        ],
        dependent: 'parent2-has-passport'
    },
    parent2PassportIssueDate: {
        validate: [
            'date',
            // { type: 'before' },
        ],
        autocomplete: 'parent2-issue-date',
        dependent: 'parent2-has-passport'
    },
    parentsMarried: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parentsMarriageDate: {
        validate: [
            'date',
            { type: 'before' },
        ],
        autocomplete: 'parents-marriage-bday',
        dependent: 'parentsMarried'
    },
    addressLine1: {
        validate: [
            'required',
            // 'placename',
            { type: 'minlength', arguments: 3 },
            { type: 'maxlength', arguments: 40 }
        ],
    },
    addressLine2: {
        validate: [
            // 'placename',
            { type: 'maxlength', arguments: 40 }
        ]
    },
    addressTown: {
        validate: [
            'required',
            // 'placename',
            { type: 'maxlength', arguments: 30 }
        ]
    },
    addressPostcode: {
        formatter: 'uppercase',
        validate: [
            'required',
            { type: 'maxlength', arguments: 10 }
        ]
    },
    contactEmail: {
        formatter: ['trim'],
        validate: [
            'required',
            'email',
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        'ignore-defaults': true
    },
    contactEmailConfirm: {
        formatter: ['trim'],
        validate: [
            'required',
            { type: 'match', arguments: 'contactEmail' },
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        'ignore-defaults': true
    },
    contactPhone: {
        formatter: ['removespaces', 'removehyphens'],
        validate: [
            'required',
            { type: 'maxlength', arguments: 15 },
            // 'numeric',
            // 'phonenumber'
        ],
        type: 'tel'
    },
    contactPrefsEmail: {
        formatter: 'boolean-strict' // checkbox
    },
    contactPrefsSMS: {
        formatter: 'boolean-strict' // checkbox
    },
    mobilePhone: {
        formatter: ['removespaces', 'removehyphens', 'removeslashes'],
        validate: [
            'required',
            { type: 'maxlength', arguments: 15 },
            // 'numeric',
        ],
        type: 'tel',
        dependent: 'contactPrefsSMS'
    },
    largePassport: {
        formatter: 'boolean',
        validate: 'required'
    },
    braille: {
        formatter: 'boolean-strict' // checkbox
    },
    canSign: {
        formatter: 'boolean',
        validate: ['required']
    },
    noSignReason: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 250 },
            // 'alphanumex1'
        ]
    },
    thirdParty: {
        formatter: 'boolean',
        validate: 'required'
    },
    secureDelivery: {
        formatter: 'boolean',
        validate: 'required'
    },
    declaration: {
        formatter: 'boolean',
        validate: [
            'required',
            { type: 'equal', arguments: true }
        ]
    },


    appReference: {
        validate: 'required'
    },
    trackDateOfBirth: {
        validate: ['required', 'date'],
        autocomplete: 'bday'
    },
    trackEmail: {
        validate: 'required'
    }
}