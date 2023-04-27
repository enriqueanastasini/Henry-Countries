const { Activity } = require("../../db")
const { ValidationError } = require("sequelize");
const { getCountryIdVerification } = require("./utils/verifications")

//Tienen la responsabilidad de comunicarse con la base de datos y dar una respuesta
/* ***createActivityControler***
Tiene la responsabilidad de crear las actividades que definen en la base de datos y relacionarlas con los países 
donde se pueden realizar. 
Aprendizaje:
  **Formato de counrtiesID: [{id: id}, {id: id}]
  En los metodos de recorrido de arrays del forEach / map / etc.. no se espera a la resolución de la promesa para
  continuar con la lectura del codigo, por lo tanto es recomendable usar. for..of -- o incluir un Promise.all() previo 
  al recorrido
*/
const createActivityControler = async (name, difficulty, duration, season, countriesId) => { 
    const countries = await getCountryIdVerification(countriesId)
    const actividad = await Activity.create({name, difficulty, duration, season: season.toLowerCase()})
    const listOfCountries = []
    for (let country of countries){
      const add = await country.addActivity(actividad)
      listOfCountries.push(add[0].dataValues.countryId)
    };
    return {actividad, listOfCountries}
}
/* ***getActivitiesControler***
Tiene la responsabilidad de solicitar a la base de datos todas las actividades.
Aprendizaje:
  **Formato de counrtiesID: [{id: id}, {id: id}]
  En los metodos de recorrido de arrays del forEach / map / etc.. no se espera a la resolución de la promesa para
  continuar con la lectura del codigo, por lo tanto es recomendable usar. for..of -- o incluir un Promise.all() previo 
  al recorrido
*/
const getActivitiesControler = async () => {
    const activities = await Activity.findAll()
    return activities
}

module.exports = {
    createActivityControler,
    getActivitiesControler
}