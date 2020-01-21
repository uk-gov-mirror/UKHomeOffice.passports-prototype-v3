const BaseController = require('./apply')

class ParentsAndGrandparentsController extends BaseController {
    requireParentOrGrandparentReason (name, req) {
        if (!req.form.values[name + 'FirstName'] ||
            !req.form.values[name + 'LastName'] ||
            !req.form.values[name + 'DateOfBirth']) {
            req.form.options.fields[name + 'NoDetailsReason'].validate.push('required')
        }
    }

    process (req, res, next) {
        super.process(req, res, err => {
            if (err) return next(err)

            const reasonFields = Object.keys(req.form.options.fields)
                .filter(name => name.endsWith('NoDetailsReason'))
                .map(name => name.replace('NoDetailsReason', ''))

            reasonFields.forEach(name => this.requireParentOrGrandparentReason(name, req))

            next()
        })
    }
}

module.exports = ParentsAndGrandparentsController
