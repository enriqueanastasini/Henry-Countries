const { Router } = require("express")
const { getContinents } = require("../handlers/continents");

const router = Router()

router.get("/", getContinents)

module.exports = router;