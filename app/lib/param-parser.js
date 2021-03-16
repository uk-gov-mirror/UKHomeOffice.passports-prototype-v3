const moment = require('moment');
//const dpsLocationConfig = require('../data/dps-locations-new')
let parseDateTimeParam = (req, format, paramName) => {
    let dateTime = req.params[paramName] ? new moment(req.params[paramName], format, true): new moment();
    if (!dateTime.isValid()) {
        throw new Error('Invalid ' + paramName + ' parameter');
    }
    return dateTime.format(format);
};

let parseLocationParam = (req) => {
    let officeName = req.params.location.toLowerCase();
    let officeAddress = require('../data/dps-locations-new.json')[officeName];
    if (!officeAddress) {
        throw new Error('Invalid location parameter');
    }
    return {
        location: officeAddress.location,
        name: officeAddress.name,
        address: officeAddress.address,
        postcode: officeAddress.postcode
    };
};

module.exports = {
    parseDateTimeParam,
    parseLocationParam
};
