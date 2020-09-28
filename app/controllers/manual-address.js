
const BaseController = require('./csig')

class AddressManualForm extends BaseController {
    saveValues(req, res, callback) {
        let values = req.form.values;

        req.sessionModel.set('address-lookup', false);

        super.saveValues(req, res, callback);
    }
}
module.exports = AddressManualForm;