const BaseController = require('./apply')

class ThirdPartyName extends BaseController {
    post (req, res, next) {
        // remove thirdPartyExplanation field and validation when not required
        if (req.sessionModel.get('isParentOfChild')) {
            delete req.form.options.fields.thirdPartyExplanation
            req.sessionModel.unset('thirdPartyExplanation')
        }

        super.post(req, res, next)
    }
}

module.exports = ThirdPartyName
