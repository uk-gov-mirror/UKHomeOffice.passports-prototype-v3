const BaseController = require('./apply')

class RetrievingImageController extends BaseController {
    successHandler (req, res, next) {
        const url = req.sessionModel.get('photoCodePath')
        let quality

        if (url.match(/pass|^1$|2AtDAiw/i)) {
            quality = 'pass'
        } else if (url.match(/override?(able)?|^2$|2jdD4hk|35lyjrG/i)) {
            quality = 'overridable'
        } else if (url.match(/fail|^3$|2kp3DUh/i)) {
            quality = 'fail'
        } else if (url.match(/invalid|error|^4$|12345678|a1b2c3d4/i)) {
            quality = undefined
        } else {
            quality = 'pass'
        }
        req.sessionModel.set('photoQuality', quality)

        let photoAgeGroup = req.sessionModel.get('photoAgeGroup')
        let photoAgeRange

        if (photoAgeGroup == 'adult') {
            photoAgeRange = 'adult'
        } else if (photoAgeGroup == '12to15') {
            photoAgeRange = 'child-12to15'
        } else if (photoAgeGroup == '6to11') {
            photoAgeRange = 'child-6to11'
        } else if (photoAgeGroup == '1to5') {
            photoAgeRange = 'child-1to5'
        } else if (photoAgeGroup == 'under1') {
            photoAgeRange = 'baby-12months'
        } else {
            photoAgeRange = 'adult'
        }
        req.sessionModel.set('photoAgeRange', photoAgeRange)

        req.sessionModel.set('photo', quality && ('/public/images/photo-preview-thumbnail/' + photoAgeRange + '/thumbnail-' + quality + '-' + photoAgeRange + '.jpg'))

        super.successHandler(req, res, next)
    }
}

module.exports = RetrievingImageController
