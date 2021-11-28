const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { // Exportamos una funcion que define el modelo
 // defino el modelo de la tabla type
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false // Pongo el Timestamps en false para que no se generen las columnas de fecha de creacion y actualizacion
  }
  )
}