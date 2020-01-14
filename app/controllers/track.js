const BaseController = require('.')
const moment = require('moment')

class DefaultTrackController extends BaseController {
    get (req, res, next) {
        // get subnmitted date
        const date = moment(req.sessionModel.get('submitted'))
        req.sessionModel.set({ submitted: date.toISOString() })

        // choose tracking status
        let status = req.sessionModel.get('status')
        if (req.query.status) {
            status = req.query.status.toUpperCase()
                .replace(/[^A-Z]+/g, '_')
        }
        if (!status) {
            status = 'SUBMITTED'
        }
        req.sessionModel.set({ status })

        // set status template
        if (req.form.options.route === '/track/view') {
            const template = 'track/status/' + status.toLowerCase()
                .replace(/[^a-z]+/g, '-')
            req.form.options.template = template
        }

        // format the application reference
        let reference = req.sessionModel.get('appReference')
        reference = reference || '123456789X'
        reference = reference.replace(/\s+/g, '')
        reference = reference.replace(/(PEX|POD)/, '')
        const formattedReference = 'PEX' + reference.replace(/(...)/g, ' $1')
        req.sessionModel.set({
            reference,
            formattedReference
        })

        // documents required
        const docs = req.sessionModel.get('docs') || 'documents'
        req.sessionModel.set({
            tellUsWhatYouThinkLink: status === 'awating-referee-nomination',
            extraDocuments: docs === 'documents',
            onlyOldPassportRequired: docs === 'passport',
            noDocuments: docs === 'nodocs',
            documentsLink: docs !== 'nodocs'
        })

        // notifications
        req.sessionModel.set({
            mobileNotification: true,
            emailNotification: true
        })

        // survey link
        req.sessionModel.set({
            tellUsWhatYouThinkLink: true
        })

        // dates
        req.sessionModel.set({
            photoRejectedDate: moment().toISOString(),
            resubmissionDeadlineDate: moment().add(49, 'days').toISOString()
        })

        super.get(req, res, next)
    }
}

module.exports = DefaultTrackController
