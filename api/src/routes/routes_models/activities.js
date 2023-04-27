const { Router } = require("express")
const { createActivityHandler, getActivitiesHandler } = require("../handlers/activities")

const router = Router()

router.post("/", createActivityHandler)
router.get("/", getActivitiesHandler)

module.exports = router;