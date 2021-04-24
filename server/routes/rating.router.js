const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/rating.controller");

router.post("/", ratingController.setRating);

module.exports = router;
