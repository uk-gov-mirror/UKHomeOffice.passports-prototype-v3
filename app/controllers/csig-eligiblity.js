const BaseController = require('./apply')

class csigEligiblity extends BaseController {

    setCsigAdultEligible(req) {
        let CsigAdultEligible = true
        if (req.sessionModel.get('howLongAdult') < '2') {
            CsigAdultEligible = false
        }
        req.sessionModel.set('CsigAdultEligible', CsigAdultEligible)
    }

    setCsigChildEligible(req) {
        let CsigChildEligible = true
        if (req.sessionModel.get('howLong') < '2') {
            CsigChildEligible = false
        }
        req.sessionModel.set('CsigChildEligible', CsigChildEligible)
    }

};
module.exports = csigEligiblity