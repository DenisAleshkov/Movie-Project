const uuid = require("uuid");
const path = require("path");
const { Event, EventInfo, Type } = require("../models/models");
const ApiError = require("./../error/api.error");

class EventController {
  async create(req, res, next) {
    try {
      const { name, price, cityId, locationId, status, typeId, info } = req.body;
      const { img } = req.files;
      let filename = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", filename));
      const event = await Event.create({
        name,
        price,
        cityId,
        locationId,
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

      return res.json({event,info});
    } catch (e) {
      next(ApiError.badRequest(e.message))
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
}

module.exports = new EventController();
