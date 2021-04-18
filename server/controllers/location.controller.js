const { Location, CityLocation } = require("../models/models");
const ApiError = require("../error/api.error");

class LocationController {
  async create(req, res) {
    const { name, cityId } = req.body;
    const location = await Location.create({ name, cityId });
    const locationId = location.get("id");
    await CityLocation.create({ cityId, locationId, name });
    return res.json(location);
  }

  async getLocationInCity(req, res) {
    const { cityId } = req.body;
    const cityLocations = await CityLocation.findAll({ where: { cityId } });

    const locations = await Location.findAll();
    const newLocations = [];

    cityLocations.forEach((cityLocation) => {
      locations.forEach((location) => {
        if (cityLocation.get("locationId") === location.get("id")) {
          newLocations.push(location);
        }
      });
    });

    return res.json(newLocations);
  }

  async getAll(req, res) {
    const locations = await Location.findAll();
    return res.json(locations);
  }
}

module.exports = new LocationController();
