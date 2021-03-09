const BaseController = require('./apply')

class DocumentsToSend extends BaseController {
    get (req, res, next) {

        let docsSimpleRenewal =[{"name": "old passport"}]
        if (req.sessionModel.get ('otherPassports')){
            docsSimpleRenewal.push ({"name": "any current or expired passports from other countries that haven’t been cancelled"})
        }
        // res.locals.documentsObject = require('../../app/data/dcs-documents-renew.json')
        req.sessionModel.set ('docsSimpleRenewal', docsSimpleRenewal)
        super.get(req, res, next)
    }
}



module.exports = DocumentsToSend
