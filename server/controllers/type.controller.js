const { Type, Event } = require("../models/models");
const ApiError = require("../error/api.error");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async getEventById(req, res) {
    const { typeId } = req.body;
    const events = await Event.findAll({
      where: { typeId },
    });
    return res.json(events);
  }
}

module.exports = new TypeController();
