const uuid = require("uuid");
const path = require("path");
const {
  Event,
  EventInfo,
  Type,
  CityLocation,
  Location,
  Rating,
  City,
  TicketEvent,
  Ticket,
  EventUser,
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
    const cityId = event.get("cityId");
    const locationId = event.get("locationId");
    const typeId = event.get("typeId");
    const location = await Location.findOne({
      where: { id: locationId },
    });
    const city = await City.findOne({
      where: { id: cityId },
    });
    const type = await Type.findOne({
      where: { id: typeId },
    });
    const cityName = await city.get("name");
    const locationName = await location.get("name");
    const typeName = await type.get("name");
    const eventData = { event, cityName, locationName, typeName };
    return res.json(eventData);
  }

  async getEventByLocation(req, res) {
    const { locationId } = req.body;
    const events = await Event.findAll({
      where: { locationId },
    });
    return res.json(events);
  }

  async setRateEvent(req, res) {
    const { eventId, rating, userId } = req.body;
    const event = await Event.findOne({
      where: { id: eventId },
    });

    const rateEvent = await Rating.findOne({ where: { eventId, userId } });
    if (rateEvent) {
      rateEvent.rate = rating;
      await rateEvent.save();
    } else {
      await Rating.create({
        eventId,
        rate: rating,
        userId,
      });
    }
    const newRateEvent = await Rating.findAll({ where: { eventId } });
    const average =
      newRateEvent.length &&
      newRateEvent.reduce((accum, current) => accum + current.get("rate"), 0) /
        newRateEvent.length;
    await event.update(
      {
        rating: average,
      },
      {
        where: { id: eventId },
      }
    );

    res.send({ message: "Event was rated" });
  }

  async setTicket(req, res, next) {
    try {
      const { eventId, userId } = req.body;
      const ticket = await Ticket.create({ userId });
      const ticketId = await ticket.get("id");
      await TicketEvent.create({
        ticketId,
        eventId,
      });
      await EventUser.create({ eventId, userId });
      return res.send({ message: "ticket is bought" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new EventController();
