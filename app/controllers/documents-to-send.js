const BaseController = require('./apply')

class DocumentsToSend extends BaseController {
    get (req, res, next) {
        res.locals.documentsObject = require('../../app/data/dcs-documents-renew.json')
        super.get(req, res, next)
    }
}

module.exports = DocumentsToSend
