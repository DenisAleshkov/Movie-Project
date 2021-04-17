const Router = require("express");
const router = new Router();
const typeController = require("../controllers/type.controller");

router.post("/", typeController.create);
router.get("/", typeController.getAll);
router.post("/getEvent", typeController.getEventById)

module.exports = router;
