const Router = require("express");
const userControler = require("./../controllers/user.controler");
const authMiddleware = require("./../middleware/auth.middleware");
const router = new Router();

router.post("/registration", userControler.registration);
router.post("/login", userControler.login);
router.get("/auth", authMiddleware, userControler.check);

module.exports = router;
