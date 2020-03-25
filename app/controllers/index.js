const BaseController = require('hmpo-form-wizard').Controller
const DateMixin = require('hmpo-components').mixins.Date

class DefaultController extends DateMixin(BaseController) {
    middlewareSetup () {
        super.middlewareSetup()
        this.use(this.logSessionChanges)
    }

    logSessionChanges (req, res, next) {
        req.sessionModel.on('change', changes => {
            delete changes.errorValues
            console.log(req.originalUrl, changes)
        })
        next()
    }

    getValues (req, res, next) {
        // console.log('Getting values')
        if  (req.query['cookies']) {
            req.sessionModel.set ('cookiesAccepted', true)
            console.log('Set cookie value')
        }
        super.getValues (req, res, next)
    }
}


module.exports = DefaultController
