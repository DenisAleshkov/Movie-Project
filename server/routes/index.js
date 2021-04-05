const Router = require("express")

const router = new Router()

const userRouter = require("./user.router")
const cityRouter = require("./city.router")
const locationRouter = require("./location.router")
const eventRouter = require("./event.router")

router.use("/user", userRouter)
router.use("/city", cityRouter)
router.use("/location", locationRouter)
router.use("/event", eventRouter)

module.exports = router
