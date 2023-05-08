const {getContinentsControler} = require("../controlers/continents")

const getContinents = async (req,res) => {
    try {
      const continets = await getContinentsControler()
      console.log(continets)
      res.status(200).json(continets)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

module.exports ={
    getContinents
}