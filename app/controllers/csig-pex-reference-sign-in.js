
const BaseController = require('./csig')

class CsigPEXReferenceSignInController extends BaseController {
    get(req, res, next){
        req.sessionModel.set('csigChild', false);
        req.sessionModel.set('csigExpired', false);
        req.sessionModel.set('csigInvalid', false);
        req.sessionModel.set('csigIdentityFailed', false);
        super.get(req, res, next)
    }
    successHandler (req, res, next) {
        var referenceNumber = req.sessionModel.get('csigAppReference');
        if (referenceNumber.startsWith('2')) {
            req.sessionModel.set('csigChild', true);
        }
        if (referenceNumber.startsWith('3')) {
            req.sessionModel.set ('csigInvalid', true)
        }
        if (referenceNumber.startsWith('4')){
            req.sessionModel.set ('csigExpired', true)
        }
        if (referenceNumber.startsWith('5')){
            req.sessionModel.set('csigIdentityFailed', true);
        }
        super.successHandler(req, res, next)
    }
};
module.exports = CsigPEXReferenceSignInController