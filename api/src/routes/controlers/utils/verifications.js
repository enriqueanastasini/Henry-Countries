const { Country } = require("../../../db")

const getCountryIdVerification = async (countriesId) =>{
    const countries = []
      for (let {id} of countriesId){
        if (!id) throw Error("Missing id for country option");
        else {
          const country = await Country.findByPk(id.toUpperCase());
          if (!country) throw Error("The id was not found in the db");
          else countries.push(country);
        }
      }
    return countries
    
}

module.exports = {
    getCountryIdVerification
}