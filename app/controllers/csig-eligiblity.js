const BaseController = require('./csig')

class CsigEligiblityController extends BaseController {
    successHandler (req, res, next) {
        this.setCsigAdultEligible(req)
        this.setCsigChildEligible(req)
        super.successHandler(req, res, next)
    }

    setCsigAdultEligible(req) {
        let csigAdultEligible = true
        if (req.sessionModel.get('howManyYearsKnownAdult') < 2) {
            csigAdultEligible = false
        }
        req.sessionModel.set('csigAdultEligible', csigAdultEligible)
    }

    setCsigChildEligible(req) {
        let csigChildEligible = true
        if (req.sessionModel.get('howManyYearsKnownChild') < 2) {
            csigChildEligible = false
        }
        req.sessionModel.set('csigChildEligible', csigChildEligible)
    }

};
module.exports = CsigEligiblityController