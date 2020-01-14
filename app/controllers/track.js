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
            status = req.sessionModel.get('csigRequired') ?
                'AWAITING_REFEREE_NOMINATION' : 'SUBMITTED'
        }
        req.sessionModel.set({
            status,
            tellUsWhatYouThinkLink: status === 'AWAITING_REFEREE_NOMINATION',
        })

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
        const documentsRequired = req.sessionModel.get('documentsRequired') || 'documents'
        req.sessionModel.set({
            documentsRequired,
            documentsLink: documentsRequired !== 'none'
        })

        // notifications
        let mobileNotification = req.sessionModel.get('contactPrefsSMS');
        if (typeof mobileNotification !== 'boolean') mobileNotification = true;

        let emailNotification = req.sessionModel.get('contactPrefsEmail');
        if (typeof emailNotification !== 'boolean') emailNotification = true;

        req.sessionModel.set({
            mobileNotification,
            emailNotification
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
