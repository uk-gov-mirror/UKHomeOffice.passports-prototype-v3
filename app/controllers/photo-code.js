const BaseController = require('./apply')

class PhotoCodeRetrieveController extends BaseController {
    process(req, res, next) {

        if (!req.form.values.photoCodeSld || !req.form.values.photoCodeTld) {
            req.form.values.photoCodeSld = 'bit'
            req.form.values.photoCodeTld = 'ly'
        }
        if (!req.form.values.photoCodePath) {
            req.form.values.photoCodePath = '2AtDAiw'
        }

        let photoCode =
            req.form.values.photoCodeSld + '.' +
            req.form.values.photoCodeTld + '/' +
            req.form.values.photoCodePath

        req.form.values.photoCode = photoCode

        super.process(req, res, next)
    }
}

module.exports = PhotoCodeRetrieveController
