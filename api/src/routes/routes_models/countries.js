const { Router } = require("express")
const router = Router()
const { getCountryByPkHandler, getCountriesHandler } = require("../handlers/countries")

//Responsabilidad: Encargado de gestionar las rutas del servidor relacionadas con los paisese --> "/countries"
//Busca y obtiene país por su nombre
router.get("/", getCountriesHandler)
//Busca y obtiene país por su id y obtiene las actividades si es que tiene
router.get("/:id", getCountryByPkHandler)


module.exports = router;