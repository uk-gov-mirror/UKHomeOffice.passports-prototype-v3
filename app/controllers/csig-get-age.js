const BaseController = require('./csig')
const moment = require('moment')

class CsigGetAgeController extends BaseController {
    successHandler (req, res, next) {
        this.setCsigAge(req)
        super.successHandler(req, res, next)
    }

    setCsigAge (req) {
        console.log ('Start fnc')
        let csigAge
        let csigAdultOrChild = 'child'

        const refereeDateOfBirth = req.sessionModel.get('refereeDateOfBirth')
        csigAge = moment().diff(refereeDateOfBirth, 'years')

        console.log ('Before If')
        if (refereeDateOfBirth) {

            const dobAdult = moment().subtract(18, 'years').format('YYYY-MM-DD')

            console.log(dobAdult)
            console.log(refereeDateOfBirth)
            if (refereeDateOfBirth <= dobAdult) {
                csigAdultOrChild = 'adult'
            }
        }
        console.log ('After If')
        req.sessionModel.set('csigAge', csigAge)
        req.sessionModel.set ('csigAdultOrChild', csigAdultOrChild)
        console.log ('End fnc')
    }

};
module.exports = CsigGetAgeController