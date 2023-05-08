const { Country, Activity } = require("../../../src/db")
const { ValidationError } = require("sequelize");
const { Op } = require('sequelize')
const axios = require("axios")

// Verificar que la BD tenga los registros
const countCountriesControlers = async () => {
  return await Country.count()
  
}

// MANEJO DE ERRORES --> getAllCountriesData
const getAllCountriesDataControler = async () => {
  const invalidCountries = []
  const validCountries = []
  await axios("https://restcountries.com/v3/all")
  .then(response => {
    return response.data.forEach(country => {
    const { cca3, name, flags, continents, capital, subregion, area, population } = country
    if(cca3 && name.common && flags && continents && capital && population){
      validCountries.push({
        id: cca3,
        name: name.common,
        flag: flags,
        continent: continents[0],
        capital_city: capital,
        subregion: subregion,
        area: area,
        population: population
      })
    } else {
      invalidCountries.push(name.common)
    }
    })
    })
  return({ validCountries, invalidCountries})
}
  // MANEJO DE ERRORES --> saveCountriesData
const saveCountriesDataControler = async (countriesData) => {
  if(!countriesData.length) throw Error("No information to save in the database") //Si se modifica cualquier valor de la api y deja de funcionar mi getAllCountriesData
  const createdCountries = await Country.bulkCreate(countriesData).catch(error => {throw error}) //Bulk recibe un array y lo guarda en una DB
    return({message: "Data saved succsesfully", createdCountries})
}

const getAllCountriesControler = async () => {
    const countries = await Country.findAll()
    if(!countries) throw Error("DataBase Error")
    else return countries
}

const getCountryByPkControler = async (id) => {
    const country = await Country.findByPk(id.toUpperCase(), {include: Activity}) 
    if(!country) throw Error(`The country id ${id} was not found`) //Se buscó un id que no estaba en la db
    else return country
}

const getCountryByNameControler = async (name) => {
    const country = await Country.findAll({
        where: { 
            name: {
                [Op.iLike]: `%${name}%`
              }}
        })
        const countries = country.map(country => country.dataValues )
        if(!country.length) throw Error(`The country ${name} was not found`) // Error "El pais xxx no se encontró"
        else return countries
}



module.exports = {
    getCountryByPkControler,
    getAllCountriesControler,
    getCountryByNameControler,
    getAllCountriesDataControler,
    saveCountriesDataControler,
    countCountriesControlers,
}