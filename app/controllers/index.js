const BaseController = require('hmpo-form-wizard').Controller
const DateMixin = require('hmpo-components').mixins.Date
const moment = require('moment')

class DefaultController extends DateMixin(BaseController) {
    middlewareSetup() {
        super.middlewareSetup();
        this.use(this.logSessionChanges)
    }

    logSessionChanges(req, res, next) {
        req.sessionModel.on('change', changes => {
            console.log(req.originalUrl, changes)
        });
        next();
    }
}

module.exports = DefaultController
