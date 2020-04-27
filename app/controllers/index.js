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
        let backURL = req.sessionModel.get('backURL')
        if  (backURL && backURL === req.originalUrl){ //clears backURL when redirected back
            req.sessionModel.set('backURL', undefined)
        }
        req.sessionModel.set('currentURL', req.originalUrl)
        console.log('Getting values')
        if  (req.query['cookies']) {
            res.cookie('cookiesAccepted', true)
            req.cookies['cookiesAccepted'] = true
            console.log('Set cookie value')
        }
        if (req.query['backURL']) {
            req.sessionModel.set('backURL', req.query['backURL'])
        }
        req.sessionModel.set ('cookies', req.cookies)
        super.getValues (req, res, next)
    }
}


module.exports = DefaultController
