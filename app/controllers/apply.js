const BaseController = require('.')
const moment = require('moment')

class DefaultController extends BaseController {
    successHandler (req, res, next) {
        this.setAgeGroup(req)
        this.setApplicationType(req)
        this.setCosts(req)
        super.successHandler(req, res, next)
    }

    setAgeGroup (req) {
        let ageGroup
        let adultOrChild
        let age
        const dateOfBirth = req.sessionModel.get('dateOfBirth')
        if (dateOfBirth) {
            age = moment().diff(dateOfBirth, 'years')

            const dob12to15 = moment().subtract(12, 'years').format('YYYY-MM-DD')
            const dobRising16 = moment().subtract(16, 'years').add(3, 'weeks').format('YYYY-MM-DD')
            const dobAdult = moment().subtract(16, 'years').format('YYYY-MM-DD')
            const dobVeteran = '1929-09-03'

            if (dateOfBirth <= dobVeteran) {
                ageGroup = 'veteran'
                adultOrChild = 'adult'
            } else if (dateOfBirth <= dobAdult) {
                ageGroup = 'adult'
                adultOrChild = 'adult'
            } else if (dateOfBirth <= dobRising16) {
                ageGroup = 'rising16'
                adultOrChild = 'adult'
            } else if (dateOfBirth <= dob12to15) {
                ageGroup = '12to15'
                adultOrChild = 'child'
            } else {
                ageGroup = 'under12'
                adultOrChild = 'child'
            }
        }
        req.sessionModel.set('age', age)
        req.sessionModel.set('ageGroup', ageGroup)
        req.sessionModel.set('adultOrChild', adultOrChild)
    }

    setApplicationType (req) {
        let oldBlue = false;
        let applicationType
        if (req.sessionModel.get('previousPassport') === true) {
            if (req.sessionModel.get('passportIssue') < '2004-01-01') {
                oldBlue = true;
                applicationType = 'first'
            } else {
                applicationType = 'renew'
            }
        } else {
            applicationType = 'first'
        }
        req.sessionModel.set('applicationType', applicationType)
        req.sessionModel.set('oldBlue', oldBlue)
    }

    setCosts (req) {
        let passportCost;
        if (req.sessionModel.get('adultOrChild') === 'child') {
            if (req.sessionModel.get('largePassport')) {
                passportCost = 59.00
            } else {
                passportCost = 49.00
            }
        } else { // adult
            if (req.sessionModel.get('largePassport')) {
                passportCost = 85.50
            } else {
                passportCost = 75.50
            }
        }

        let deliveryCost;
        if (req.sessionModel.get('secureDelivery')) {
            deliveryCost = 5.00;
        } else {
            deliveryCost = 0.00;
        }

        req.sessionModel.set('passportCost', passportCost)
        req.sessionModel.set('deliveryCost', deliveryCost)
        req.sessionModel.set('totalCost', passportCost + deliveryCost)
    }

}

module.exports = DefaultController
