const Router = require('express')
const router = new Router()
const locationController = require('../controllers/location.controller')

router.post('/', locationController.create)
router.get('/', locationController.getAll)
router.post('/getLocationInCity', locationController.getLocationInCity)

module.exports = router