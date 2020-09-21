const BaseController = require('./apply')

class UploadController extends BaseController {
    successHandler (req, res, next) {
        req.sessionModel.unset('photoCode')

        const filename = req.sessionModel.get('photo')
        let quality
        let showPhotoPreview = true

        /*
            Unable to consolidate into single RegEx, so duplicating conditional
            statements, as this RegEx flavour does not support *infinite-width*
            lookbehind to check if `quality` preceded anywhere before matched
            string.
        */
        if (filename.match(/good/i)) {
            quality = 'good'
        } else if (filename.match(/fair|okay/i)) {
            quality = 'fair'
        } else if (filename.match(/poor/i)) {
            quality = 'poor'
        } else if (filename.match(/fail|not-?accepted/i)) {
            quality = 'error-fail'
            showPhotoPreview = false
        } else if (filename.match(/file-?invalid/i)) {
            quality = 'error-file-invalid'
            showPhotoPreview = false
        } else if (filename.match(/server-?too-?busy/i)) {
            quality = 'error-server-too-busy'
            showPhotoPreview = false
        } else if (filename.match(/(?<!\d|\dto)1(?!\d|to\d)/i)) {
            quality = 'good'
        } else if (filename.match(/(?<!\d|\dto)2(?!\d|to\d)/i)) {
            quality = 'fair'
        } else if (filename.match(/(?<!\d|\dto)3(?!\d|to\d)/i)) {
            quality = 'poor'
        } else if (filename.match(/(?<!\d|\dto)4(?!\d|to\d)/i)) {
            quality = 'error-fail'
            showPhotoPreview = false
        } else if (filename.match(/(?<!\d|\dto)5(?!\d|to\d)/i)) {
            quality = 'error-file-invalid'
            showPhotoPreview = false
        } else if (filename.match(/(?<!\d|\dto)6(?!\d|to\d)/i)) {
            quality = 'error-server-too-busy'
            showPhotoPreview = false
        } else if (filename.match(/error/i)) {
            quality = 'error-fail'
            showPhotoPreview = false
        } else {
            quality = 'good'
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
        /*
            Overrides `photoAgeRange` when using specific filenames
        */
        if (filename.match(/adult/i)) {
            photoAgeRange = 'adult'
        } else if (filename.match(/12to15/i)) {
            photoAgeRange = 'child-12to15'
        } else if (filename.match(/6to11/i)) {
            photoAgeRange = 'child-6to11'
        } else if (filename.match(/1to5/i)) {
            photoAgeRange = 'child-1to5'
        } else if (filename.match(/baby|12months/i)) {
            photoAgeRange = 'baby-12months'
        } else if (filename.match(/child/i)) {
            photoAgeRange = 'child-12to15'
        }
        req.sessionModel.set('photoAgeRange', photoAgeRange)

        if (!showPhotoPreview) {
            req.sessionModel.unset('photo')
        } else {
            req.sessionModel.set('photo', '/public/images/photo-preview-thumbnail/upload/' + photoAgeRange + '/thumbnail-' + quality + '-' + photoAgeRange + '.jpg')
        }

        super.successHandler(req, res, next)
    }
}

module.exports = UploadController
