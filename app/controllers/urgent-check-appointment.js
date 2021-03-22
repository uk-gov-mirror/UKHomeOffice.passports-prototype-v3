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

    saveValues(req, res, callback) {
        let parsedParams = this.parseBookingParams(req);
        req.sessionModel.set('apt-date-time', parsedParams.dateTime.toISOString());
        super.saveValues(req, res, callback)
    }
}
module.exports = UrgentCheckAppointment
