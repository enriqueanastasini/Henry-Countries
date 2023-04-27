const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    activity_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
     },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            customValidator(value) {
                if (value < 1 || value > 5) {
                    throw new Error("difficulty is supossed to be between 1 to 5");
            }}
        }
    },
    duration: {
        type: DataTypes.DECIMAL(5, 2),
    },
    season: {
        type: DataTypes.ENUM(['spring', 'summer', 'winter', 'autumn']),
        allowNull: false,
    }    
},{timestamps: false});
}