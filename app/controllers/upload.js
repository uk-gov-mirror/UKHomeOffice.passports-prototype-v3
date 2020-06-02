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
        } else if (filename.match(/good|1\.jpe?g/i)) {
            quality = 'good'
        } else {
            quality = 'good'
        }
        // Override quality for specific filename
        if (filename.match(/fail-adult|fail-child-12to15|fail-child-6to11|fail-child-1to5|fail-baby-12months|4-adult|4-child-12to15|4-child-6to11|4-child-1to5|4-baby-12months\.jpe?g/i)) {
            quality = undefined
        } else if (filename.match(/poor-adult|poor-child-12to15|poor-child-6to11|poor-child-1to5|poor-baby-12months|3-adult|3-child-12to15|3-child-6to11|3-child-1to5|3-baby-12months\.jpe?g/i)) {
            quality = 'poor'
        } else if (filename.match(/fair-adult|fair-child-12to15|fair-child-6to11|fair-child-1to5|fair-baby-12months|2-adult|2-child-12to15|2-child-1to5|2-child-6to11|2-baby-12months\.jpe?g/i)) {
            quality = 'fair'
        } else if (filename.match(/good-adult|good-child-12to15|good-child-6to11|good-child-1to5|good-baby-12months|1-adult|1-child-12to15|1-child-1to5|1-child-6to11|1-baby-12months\.jpe?g/i)) {
            quality = 'good'
        }
        req.sessionModel.set('photoQuality', quality)

        // TODO: Improve this logic by matching thumbnail filename used to photo filename uploaded
        let adultOrChild = req.sessionModel.get('adultOrChild')
        let ageGroup = req.sessionModel.get('ageGroup')
        let photoAgeRange

        if (adultOrChild == 'adult') {
            photoAgeRange = 'adult'
        } else {
            if (ageGroup == '12to15') {
                photoAgeRange = 'child-12to15'
            }
            else if (ageGroup == 'under12') {
                photoAgeRange = 'child-6to11'

                // TODO: Need to put this logic in apply.js, or add DOB logic here
                if (ageGroup == 'under6') {
                    photoAgeRange = 'child-1to5'
                } else if (ageGroup == 'under1') {
                    photoAgeRange = 'baby-12months'
                }
            }
        }
        // Override photoAgeRange for specific filename
        if (filename.match(/fail-adult|4-adult|poor-adult|3-adult|fair-adult|2-adult|good-adult|1-adult\.jpe?g/i)) {
            photoAgeRange = 'adult'
        } else if (filename.match(/fail-child-12to15|4-child-12to15|poor-child-12to15|3-child-12to15|fair-child-12to15|2-child-12to15|good-child-12to15|1-child-12to15\.jpe?g/i)) {
            photoAgeRange = 'child-12to15'
        } else if (filename.match(/fail-child-6to11|4-child-6to11|poor-child-6to11|3-child-6to11|fair-child-6to11|2-child-6to11|good-child-6to11|1-child-6to11\.jpe?g/i)) {
            photoAgeRange = 'child-6to11'
        } else if (filename.match(/fail-child-1to5|4-child-1to5|poor-child-1to5|3-child-1to5|fair-child-1to5|2-child-1to5|good-child-1to5|1-child-1to5\.jpe?g/i)) {
            photoAgeRange = 'child-1to5'
        } else if (filename.match(/fail-baby-12months|4-baby-12months|poor-baby-12months|3-baby-12months|fair-baby-12months|2-baby-12months|good-baby-12months|1-baby-12months\.jpe?g/i)) {
            photoAgeRange = 'baby-12months'
        }
        req.sessionModel.set('photoAgeRange', photoAgeRange)

        req.sessionModel.set('photo', quality && ('/public/images/photo-preview-thumbnail/' + photoAgeRange + '/thumbnail-' + quality + '-' + photoAgeRange + '.jpg'))

        super.successHandler(req, res, next)
    }
}

module.exports = UploadController
