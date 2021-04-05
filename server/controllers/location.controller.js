const {Location} = require('../models/models')
const ApiError = require('../error/api.error');

class LocationController {
    async create(req, res) {
        const {name} = req.body
        const location = await Location.create({name})
        return res.json(location)
    }

    async getAll(req, res) {
        const locations = await Location.findAll()
        return res.json(locations)
    }

}

module.exports = new LocationController()