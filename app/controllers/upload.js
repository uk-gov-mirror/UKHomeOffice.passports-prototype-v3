const BaseController = require('./default')

class UploadController extends BaseController {
    successHandler (req, res, next) {
        const filename = req.sessionModel.get('photo')
        let quality

        if (filename.indexOf('bad') >= 0) {
            quality = undefined
        } else if (filename.indexOf('poor') >= 0) {
            quality = 'poor'
        } else if (filename.indexOf('fair') >= 0) {
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
