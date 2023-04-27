const { createActivityControler, getActivitiesControler } = require("../controlers/activities")

// Funciones con la responsabilidad de recibir un pedido y responder infomación

const createActivityHandler = async (req,res)=>{  
    try{
        const {name, difficulty, duration, season, countriesId } = req.body
        
        const actividad = await createActivityControler(name, difficulty, duration, season, countriesId)
        res.status(201).json(actividad)
    }
    catch(error){
        res.status(400).send({error: error.message})  
    }
}

const getActivitiesHandler = async (req,res)=>{ 
    try{
        const activities = await getActivitiesControler()
        res.status(200).json(activities)
    }
    catch(error){
        res.status(400).send({error: error.message})
    }
}

module.exports = {
    createActivityHandler,
    getActivitiesHandler

}