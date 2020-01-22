const BaseController = require('./apply')

class UploadController extends BaseController {
    successHandler (req, res, next) {
        const filename = req.sessionModel.get('photo')
        let quality

        if (filename.match(/bad|fail|4\.jpe?g/i)) {
            quality = undefined
        } else if (filename.match(/poor|3\.jpe?g/i)) {
            quality = 'poor'
        } else if (filename.match(/fair|okay|2\.jpe?g/i)) {
            quality = 'fair'
        } else {
            quality = 'good'
        }

        req.sessionModel.set('photoQuality', quality)
        req.sessionModel.set('photo', quality && ('/public/images/thumbnail-' + quality + '.jpg'))

        super.successHandler(req, res, next)
    }
}

module.exports = UploadController
