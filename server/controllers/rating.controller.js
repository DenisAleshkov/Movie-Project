const { Rating } = require("../models/models");
const ApiError = require("../error/api.error");

class CityController {
  async setRating(req, res) {
    const { rate, userId, eventId } = req.body;
    Rating.sequelize
      .query("CALL setEventRating(:rate, :userId, :eventId)", {
        replacements: { rate, userId, eventId },
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}

module.exports = new CityController();
