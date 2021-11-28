const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo de la tabla pokemon
  sequelize.define('pokemon', {
    id: { // EL id es un campo de tipo UUID para no tener colisiones con los id de la api
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    // idPoke: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    img:{
       type: DataTypes.STRING,
       allowNull:false,
       defaultValue: 'https://okdiario.com/img/series/2016/11/05/pokemon.jpg',
    },
    createdInDb: { // Campo para saber si el pokemon fue creado en la base de datos o no
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }, 
  },
  
  {
    timestamps: false // Pongo el Timestamps en false para que no se generen las columnas de fecha de creacion y actualizacion
  });
};
