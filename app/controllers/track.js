const BaseController = require('.')
const moment = require('moment');
const trackingStatuses = require('../data/tracking-statuses');

class DefaultTrackController extends BaseController {
    get(req, res, next) {
        let status = req.sessionModel.get('status')
        if (!status) {
            status = 'SUBMITTED'
            req.sessionModel.set({ status })
        }

        // get status history for a given status
        let statusData = Object.assign({}, trackingStatuses[status])
        let date = moment()
        statusData.history = statusData.history || []
        statusData.history = statusData.history.map(status => {
            date.add(15, 'minutes')
            return { status, date: date.toISOString() }
        })
        req.sessionModel.set(statusData)

        // template
        if (req.form.options.route === '/track/view') {
            let template = 'track/view-' + status.toLowerCase()
                .replace(/[^a-z]+/g, '-')
            req.form.options.template = template;
        }

        // format the application reference
        let reference = req.sessionModel.get('appReference')
        reference = reference || '123456789X'
        reference = reference.replace(/\s+/g, '');
        reference = reference.replace(/(PEX|POD)/, '')
        let formattedReference = 'PEX' + reference.replace(/(...)/g, ' $1');
        req.sessionModel.set({
            reference,
            formattedReference
        })

        // documents required
        let docs = req.sessionModel.get('docs') || 'documents'
        req.sessionModel.set({
            tellUsWhatYouThinkLink: status === 'awating-referee-nomination',
            extraDocuments: docs === 'documents',
            onlyOldPassportRequired: docs === 'passport',
            noDocuments: docs === 'nodocs',
            documentsLink: docs !== 'nodocs'
        });

        super.get(req, res, next)
    }
}

module.exports = DefaultTrackController
