const { getCountryByPkControler, getAllCountriesControler, getCountryByNameControler } = require("../controlers/countries")

const getCountriesHandler = async (req,res)=>{
    try {
     const { name } = req.query
     if(name){ //Si pasan un nombre por query se busca el país por su nombre
        const country = await getCountryByNameControler(name)
        res.status(200).json(country)
     } else {  //Si no pasan un nombre por query se busca el país por su nombre
        const countries = await getAllCountriesControler()
        res.status(200).json(countries)
     }
     } catch (error) { //falta desarrollar el manejo de errores
        res.status(404).json({error: error.message})  
     }
}

const getCountryByPkHandler = async (req,res)=>{
    try{
       const { id } = req.params
       const country = await getCountryByPkControler(id)
       res.status(200).json(country)
    }
    catch(error){
       res.status(404).json({error: error.message})
    }
 }

module.exports = {
    getCountriesHandler,
    getCountryByPkHandler
}