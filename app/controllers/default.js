const BaseController = require('hmpo-form-wizard').Controller
const DateMixin = require('hmpo-components').mixins.Date
const moment = require('moment')

class DefaultController extends DateMixin(BaseController) {
    successHandler (req, res, next) {
        this.setAgeGroup(req)
        this.setApplicationType(req)
        super.successHandler(req, res, next)
    }

    setAgeGroup (req) {
        let ageGroup
        let adultOrChild
        const dateOfBirth = req.sessionModel.get('dateOfBirth')
        if (dateOfBirth) {
            const dob12to15 = moment().subtract(12, 'years').format('YYYY-MM-DD')
            const dobRising16 = moment().subtract(16, 'years').add(3, 'weeks').format('YYYY-MM-DD')
            const dobAdult = moment().subtract(16, 'years').format('YYYY-MM-DD')
            const dobVeteran = '1929-09-03'

            if (dateOfBirth >= dobVeteran) {
                ageGroup = 'veteran'
                adultOrChild = 'adult'
            } else if (dateOfBirth >= dobAdult) {
                ageGroup = 'adult'
                adultOrChild = 'adult'
            } else if (dateOfBirth >= dobRising16) {
                ageGroup = 'rising16'
                adultOrChild = 'adult'
            } else if (dateOfBirth >= dob12to15) {
                ageGroup = '12to15'
                adultOrChild = 'child'
            } else {
                ageGroup = 'under12'
                adultOrChild = 'child'
            }
        }
        req.sessionModel.set('ageGroup', ageGroup)
        req.sessionModel.set('adultOrChild', adultOrChild)
    }

    setApplicationType (req) {
        let applicationType
        if (req.sessionModel.get('previousPassport') === true) {
            if (req.sessionModel.get('passportLost') === true) {
                applicationType = 'replace'
            } else {
                applicationType = 'renew'
            }
        } else {
            applicationType = 'first'
        }
        req.sessionModel.set('applicationType', applicationType)
    }
}

module.exports = DefaultController
