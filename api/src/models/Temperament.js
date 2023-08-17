const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Temperament', {
        id:{
            type: DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false
          },
          name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
          }
    }, { timestamps: false })
}