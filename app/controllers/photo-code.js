const BaseController = require('./apply');

class PhotoCodeRetrieveController extends BaseController {
    process(req, res, next) {

        let photoCode =
            req.form.values['photoCodeSld'] + '.' +
            req.form.values['photoCodeTld'] + '/' +
            req.form.values['photoCodePath']

        if (photoCode.match(/^\.\/$/i)) {
            photoCode = 'bit.ly/2AtDAiw'
        } else if (photoCode.match(/^\.\/.+$|^.+\.\/.+$|^\..+\/.+$/i)) {
            photoCode = 'bit.ly/' + req.form.values['photoCodePath']
        }

        req.form.values['photoCode'] = photoCode;

        super.process(req, res, next);
    }
}

module.exports = PhotoCodeRetrieveController;
