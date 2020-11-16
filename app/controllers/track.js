const BaseController = require('.')
const moment = require('moment')

class DefaultTrackController extends BaseController {
    get (req, res, next) {
        // set dates
        const date = moment(req.sessionModel.get('submitted'))
        req.sessionModel.set({
            submitted: date.toISOString(),
            photoRejectedDate: moment(date).toISOString(),
            resubmissionDeadlineDate: moment(date).add(49, 'days').toISOString()
        })

        // choose if urgent
        let isUrgent = req.sessionModel.get('isUrgent')
        switch (req.query.urgent) {
            case 'true':
                isUrgent = true
                break;
            case 'false':
                isUrgent = false
        }
        req.sessionModel.set({ isUrgent })

        // choose documents type
        let documentsRequired = req.sessionModel.get('documentsRequired') || 'documents'
        switch (req.query.docs) {
            case 'documents':
            case 'passport':
            case 'none':
                documentsRequired = req.query.docs.toLowerCase()
        }
        req.sessionModel.set({ documentsRequired })

        // choose referee type
        let csigRequired = req.sessionModel.get('csigRequired')
        switch (req.query.csig) {
            case 'true':
                csigRequired = true
                break;
            case 'false':
                csigRequired = false
        }
        req.sessionModel.set({ csigRequired })

        // choose tracking status
        let status = req.sessionModel.get('status')
        if (req.query.status) {
            status = req.query.status.toUpperCase()
                .replace(/[^A-Z]+/g, '_')
        }
        if (!status || req.form.options.route === '/track/reference') {
            status = req.sessionModel.get('csigRequired')
                ? 'AWAITING_REFEREE_NOMINATION' : 'SUBMITTED'
        }
        req.sessionModel.set({ status })

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

        // notifications
        let mobileNotification = req.sessionModel.get('contactPrefsSMS')
        if (typeof mobileNotification !== 'boolean') mobileNotification = true

        let emailNotification = req.sessionModel.get('contactPrefsEmail')
        if (typeof emailNotification !== 'boolean') emailNotification = true

        req.sessionModel.set({
            mobileNotification,
            emailNotification
        })

        // set status template
        if (req.form.options.route === '/track/view') {
            const template = 'track/status/' + status.toLowerCase()
                .replace(/[^a-z]+/g, '-')
            req.form.options.template = template
        }

        super.get(req, res, next)
    }
}

module.exports = DefaultTrackController
