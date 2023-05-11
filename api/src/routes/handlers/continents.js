const {getContinentsControler} = require("../controlers/continents")

const getContinents = async (req,res) => {
    try {
      const continets = await getContinentsControler()
      res.status(200).json(continets)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

module.exports ={
    getContinents
}