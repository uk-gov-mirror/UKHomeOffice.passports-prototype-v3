const _ = require('underscore');
const BaseController = require('./urgent');
const paramParser = require('../lib/param-parser');
const availableAppointments = require('../lib/dps-available-appointments-date');
const moment = require('moment');

class UrgentDatePlaceController extends BaseController {

    locals(req, res) {
        let localValues = super.locals(req, res);
        let extendLocals = availableAppointments.availableAppointmentsByDateAndPlace(req);

        _.extend(localValues, extendLocals);
        return localValues;
    }
}
module.exports = UrgentDatePlaceController
