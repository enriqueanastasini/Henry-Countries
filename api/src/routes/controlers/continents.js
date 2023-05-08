const { getAllCountriesControler } = require("./countries")

const getContinentsControler = async () => {
    const continentsData = []
    const countries = await getAllCountriesControler()
    countries.forEach(country => continentsData.push(country.continent))
    let continents = Array.from(new Set(continentsData))
    return continents.sort()
  }

module.exports = {
    getContinentsControler
}