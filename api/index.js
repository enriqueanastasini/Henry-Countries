//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getAllCountriesDataControler, saveCountriesDataControler, countCountriesControlers } = require("./src/routes/controlers/countries.js")

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3001, async () => {
    try{
      const dbfull = await countCountriesControlers() 
      if(!dbfull){
        const countries = await getAllCountriesDataControler()
        const result = await saveCountriesDataControler(countries.validCountries)
        console.log(`Los siguientes paises no van a poder ser agregados a la db: ${countries.invalidCountries}`)
        console.log(result.message)
      }
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    }
    catch(error){
      console.log(error.message)
    }
  });
});

//Responsabilidad de levantar el servidor