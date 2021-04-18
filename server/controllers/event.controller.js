const uuid = require("uuid");
const path = require("path");
const {
  Event,
  EventInfo,
  Type,
  CityLocation,
  Location,
} = require("../models/models");
const ApiError = require("./../error/api.error");

class EventController {
  async create(req, res, next) {
    try {
      const {
        name,
        price,
        cityId,
        locationId,
        status,
        typeId,
        info,
        userId,
        locationName,
      } = req.body;
      let newlocationId;
      if (!locationId) {
        const location = await Location.create({ name: locationName, cityId });
        newlocationId = location.get("id");
        await CityLocation.create({ cityId, locationId: newlocationId });
      }
      const { img } = req.files;
      let filename = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", filename));
      const event = await Event.create({
        name,
        price,
        cityId,
        userId,
        locationId: locationId ? locationId : newlocationId,
        status,
        typeId,
        img: filename,
      });
      if (info) {
        info = JSON.parse(info);
        info.forEach((element) => {
          EventInfo.create({
            title: element.title,
            description: element.description,
            eventId: event.id,
          });
        });
      }

      return res.json({ event, info });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { cityId, locationId, limit, page } = req.query;

    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let events;
    if (!cityId && !locationId) {
      events = await Event.findAndCountAll({ limit, offset });
    }
    if (cityId && !locationId) {
      events = await Event.findAndCountAll({
        where: { cityId },
        limit,
        offset,
      });
    }
    if (!cityId && locationId) {
      events = await Event.findAndCountAll({
        where: { locationId },
        limit,
        offset,
      });
    }
    if (cityId && locationId) {
      events = await Event.findAndCountAll({
        where: { locationId, cityId },
        limit,
        offset,
      });
    }
    return res.json(events);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const event = await Event.findOne({
      where: { id },
      include: [{ model: EventInfo, as: "info" }],
    });
    return res.json(event);
  }

  async getEventByLocation(req, res) {
    const { locationId } = req.body;
    const events = await Event.findAll({
      where: { locationId },
    });
    return res.json(events);
  }
}

module.exports = new EventController();
