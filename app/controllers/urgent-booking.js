const _ = require('underscore');
const BaseController = require('./urgent');
const paramParser = require('../lib/param-parser');

class UrgentBookingController extends BaseController {
    locals(req, res) {
        let localValues = super.locals(req, res);
        let officeDetails = paramParser.parseLocationParam(req);
        let extendLocals = {
            office: officeDetails
        };
        _.extend(localValues, extendLocals);
        return localValues;
    }
}
module.exports = UrgentBookingController
