const { Router } = require('express');
const countriesRouter = require("./routes_models/countries")
const  activitiesRouter = require("./routes_models/activities.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countriesRouter)
router.use("/activities", activitiesRouter)

module.exports = router;
