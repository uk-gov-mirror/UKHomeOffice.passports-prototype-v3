
const BaseController = require('./index')

class csigSignInController extends BaseController {
    get(req, res, next){
        req.sessionModel.set('csig-child', false);
        req.sessionModel.set('csig-expired', false);
        req.sessionModel.set('csig-invalid', false);
        super.get(req, res, next)
    }
    successHandler (req, res, next) {
        var referenceNumber = req.sessionModel.get('csigAppReference');
        if (referenceNumber.startsWith('2')) {
            req.sessionModel.set ('csig-expired', true)
        }
        if (referenceNumber.startsWith('3')) {
            req.sessionModel.set ('csig-invalid', true)
        }
        if (referenceNumber.startsWith('4')){
            req.sessionModel.set('csig-child', true);
        }
        super.successHandler(req, res, next)
    }
};
module.exports = csigSignInController