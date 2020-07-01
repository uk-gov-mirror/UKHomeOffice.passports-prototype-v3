const BaseController = require('./apply')

class RetrievingImageController extends BaseController {
    successHandler (req, res, next) {
        const url = req.sessionModel.get('photoCodePath')
        let quality
        let showPhotoPreview = true

        if (url.match(/pass|^1$|2AtDAiw/i)) {
            quality = 'pass'
        } else if (url.match(/override?(able)?|^2$|2jdD4hk|35lyjrG/i)) {
            quality = 'overridable'
        } else if (url.match(/fail|^3$|2kp3DUh/i)) {
            quality = 'fail'
            showPhotoPreview = false
        } else if (url.match(/invalid|error|^4$|12345678|a1b2c3d4/i)) {
            quality = 'code-error'
            showPhotoPreview = false
        } else {
            quality = 'pass'
        }
        req.sessionModel.set('photoQuality', quality)

        if (!showPhotoPreview) {
            req.sessionModel.unset('photo')
        } else {
            if (url.match(/pass|^1$|2AtDAiw/i)) {
                req.sessionModel.set('photo', quality && ('/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-2AtDAiw.jpg'))
            } else if (url.match(/override?(able)?|^2$|2jdD4hk/i)) {
                req.sessionModel.set('photo', quality && ('/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-2jdD4hk.jpg'))
            } else if (url.match(/35lyjrG/i)) {
                req.sessionModel.set('photo', quality && ('/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-35lyjrG.jpg'))
            } else {
                req.sessionModel.set('photo', quality && ('/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-2AtDAiw.jpg'))
            }
        }

        super.successHandler(req, res, next)
    }
}

module.exports = RetrievingImageController
