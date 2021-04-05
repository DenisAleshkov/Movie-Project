const Router = require("express");
const router = new Router();
const cityController = require("../controllers/city.controller");
// const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", cityController.create);
router.get("/", cityController.getAll);

module.exports = router;
