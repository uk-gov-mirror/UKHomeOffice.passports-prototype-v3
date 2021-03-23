const _ = require('underscore');
const BaseController = require('./urgent');
const paramParser = require('../lib/param-parser');
const availableAppointmentsTime = require('../lib/dps-available-appointments-time');

class UrgentTimeController extends BaseController {
    locals(req, res) {
        let localValues = super.locals(req, res);

        let officeDetails = paramParser.parseLocationParam(req);
        let appointmentsAvailabilityByTimeAndLocation = availableAppointmentsTime.availableAppointmentsByTimeAndPlace(req, officeDetails['location']);

        let extendLocals = {
            'office': officeDetails,
            'appointmentsByTimeAndLocation': appointmentsAvailabilityByTimeAndLocation['appointmentsAvailability'],
            'links': appointmentsAvailabilityByTimeAndLocation['links']
        };

        _.extend(localValues, extendLocals);
        return localValues;
    }
}
module.exports = UrgentTimeController
