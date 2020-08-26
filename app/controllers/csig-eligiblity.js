const BaseController = require('./apply')

class CsigEligiblityController extends BaseController {
    successHandler (req, res, next) {
        this.setCsigAdultEligible(req)
        this.setCsigChildEligible(req)
        super.successHandler(req, res, next)
    }

    setCsigAdultEligible(req) {
        let csigAdultEligible = true
        if (req.sessionModel.get('howLongAdult') < '2') {
            csigAdultEligible = false
        }
        req.sessionModel.set('csigAdultEligible', csigAdultEligible)
    }

    setCsigChildEligible(req) {
        let csigChildEligible = true
        if (req.sessionModel.get('howLong') < '2') {
            csigChildEligible = false
        }
        req.sessionModel.set('csigChildEligible', csigChildEligible)
    }

};
module.exports = CsigEligiblityController