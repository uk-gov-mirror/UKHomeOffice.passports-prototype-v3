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
    }

}
