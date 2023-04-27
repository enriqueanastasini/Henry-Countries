const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique:true
    },
    flag: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    continent: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    capital_city:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING(30),
    },
    area: {
      type: DataTypes.FLOAT,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    timestamps: false
  });
};
