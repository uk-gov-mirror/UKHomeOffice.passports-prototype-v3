const BaseController = require('./apply')

class RetrievingImageController extends BaseController {
    successHandler (req, res, next) {
        const url = req.sessionModel.get('photoCodePath')
        let quality
        let showPhotoPreview = true

        if (url.match(/pass|^1$|2AtDAiw/i)) {
            quality = 'pass'
        } else if (url.match(/override?(able)?|^2$|2jdD4hk|35lyjrG/i)) {
            quality = 'error-overridable'
        } else if (url.match(/fail|not-?accepted|^3$|2kp3DUh/i)) {
            quality = 'error-fail'
            showPhotoPreview = false
        } else if (url.match(/fetch|code-?(error)?|^4$|12345678|a1b2c3d4/i)) {
            quality = 'error-fetch'
            showPhotoPreview = false
        } else if (url.match(/file|invalid|^5$/i)) {
            quality = 'error-file-invalid'
            showPhotoPreview = false
        } else if (url.match(/server|busy|^6$/i)) {
            quality = 'error-server-too-busy'
            showPhotoPreview = false
        } else if (url.match(/requests|^7$/i)) {
            quality = 'error-too-many-requests'
            showPhotoPreview = false
        } else if (url.match(/error/i)) {
            quality = 'error-fail'
            showPhotoPreview = false
        } else {
            quality = 'pass'
        }
        req.sessionModel.set('photoQuality', quality)

        if (!showPhotoPreview) {
            req.sessionModel.unset('photo')
        } else {
            if (url.match(/pass|^1$|2AtDAiw/i)) {
                req.sessionModel.set('photo', '/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-2AtDAiw.jpg')
            } else if (url.match(/override?(able)?|^2$|2jdD4hk/i)) {
                req.sessionModel.set('photo', '/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-2jdD4hk.jpg')
            } else if (url.match(/35lyjrG/i)) {
                req.sessionModel.set('photo', '/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-35lyjrG.jpg')
            } else {
                req.sessionModel.set('photo', '/public/images/photo-preview-thumbnail/oix/adult/thumbnail-' + quality + '-adult-2AtDAiw.jpg')
            }
        }

        super.successHandler(req, res, next)
    }
}

module.exports = RetrievingImageController
