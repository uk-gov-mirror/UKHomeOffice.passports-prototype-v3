const _ = require('underscore');
const moment = require('moment');
const BaseController = require('./urgent');
const paramParser = require('../lib/param-parser');

class UrgentCheckAppointment extends BaseController {
    parseBookingParams(req) {
        let date = paramParser.parseDateTimeParam(req, 'DD-MM-YYYY', 'date');
        let time = paramParser.parseDateTimeParam(req, 'H:mma', 'time');
        return {
            officeDetails: paramParser.parseLocationParam(req),
            dateTime: new moment(date + ' ' + time, 'DD-MM-YYYY H:mma', true)
        };
    }

    locals(req, res) {
        let localValues = super.locals(req, res);
        let parsedParams = this.parseBookingParams(req);
        _.extend(localValues, {
            'apt-date-time': parsedParams.dateTime.toISOString(),
            location: parsedParams.officeDetails
        });
        return localValues;
    }

    successHandler(req, res) {
        req.sessionModel.set('dps-back-url', req.originalUrl);
        super.successHandler(req, res);
    }

    saveValues(req, res, callback) {
        let parsedParams = this.parseBookingParams(req);
        req.sessionModel.set('apt-date-time', parsedParams.dateTime.toISOString());
        req.sessionModel.set('apt-location', parsedParams.officeDetails);

        req.sessionModel.set('urgent-within-5-days', false)

        let dateDiffFromTodaysDate = Math.ceil(moment(parsedParams.dateTime, 'DD-MM-YYYY').diff(moment(), 'days', true));

        if (dateDiffFromTodaysDate < 5) {
            req.sessionModel.set('urgent-within-5-days', true);
            console.log(req.sessionModel.get('urgent-within-5-days'));
        }

        super.saveValues(req, res, callback)
    }
}
module.exports = UrgentCheckAppointment
