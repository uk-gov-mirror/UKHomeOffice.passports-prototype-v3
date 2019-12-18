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
        offset: 20,
        display: {
            formatter: 'day-month-year'
        }
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
        offset: 20,
        display: {
            formatter: 'day-month-year'
        }
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
        offset: 20,
        display: {
            formatter: 'day-month-year'
        }
    },
    title: {
        display: {
            formatter: 'title'
        },
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
        ],
        display: {
            formatter: 'name'
        }
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
        validate: 'required',
        display: {
            formatter: 'change-of-name'
        }
    },
    nameChangeReason: {
        validate: 'required'
    },
    previousNames: {
        formatter: 'boolean',
        validate: 'required',
        display: {
            formatter: 'previous-names'
        }
    },
    gender: {
        validate: 'required',
    },
    bornInUK: {
        formatter: 'boolean',
        validate: 'required'
    },
    countryOfBirth: {
        items: require('./data/countries'), // TODO: replace with birth countries library
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
            // 'required',
            { type: 'maxlength', arguments: 10 }
        ]
    },
    addressStateProvince: {
        validate: [
            // 'placename',
            { type: 'maxlength', arguments: 30 }
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
        dependent: {
            field: 'contact-email-check',
            value: 'new'
        },
        display: {
            formatter: 'contact-details'
        },
        'ignore-defaults': true
    },
    contactEmailConfirm: {
        formatter: ['trim'],
        validate: [
            'required',
            { type: 'match', arguments: 'contact-email' },
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        dependent: {
            field: 'contact-email-check',
            value: 'new'
        },
        'ignore-defaults': true
    },
    diallingCodeContact: {
        errorGroup: 'contact-phone-group',
        formatter: ['removespaces', 'removehyphens'],
        validate: [
            'required',
            { type: 'maxlength', arguments: 4 },
            'diallingcodeprefix'
        ],
        type: 'tel'
    },
    contactPhone: {
        errorGroup: 'contactPhoneGroup',
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
        formatter: 'boolean-strict',
        display: {
            formatter: 'progress-updates'
        }
    },
    contactPrefsSMS: {
        formatter: 'boolean-strict'
    },
    diallingCodeSMS: {
        errorGroup: 'mobilePhoneGroup',
        formatter: ['removespaces', 'removehyphens'],
        validate: [
            'required',
            { type: 'maxlength', arguments: 4 },
            // 'diallingcodeprefix'
        ],
        type: 'tel',
        dependent: 'contactPrefsSMS'
    },
    mobilePhone: {
        errorGroup: 'mobilePhoneGroup',
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
        formatter: 'boolean-strict',
        display: {
            // formatter: 'items'
        }
    },
    canSign: {
        formatter: 'boolean',
        validate: ['required'],
        display: {
            // formatter: 'sign'
        }
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


}
