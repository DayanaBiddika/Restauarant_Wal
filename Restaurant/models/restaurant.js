'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Address.hasMany(Restaurant,{foreignKey:"addressId"});
      Restaurant.belongsTo(models.Address,{foreignKey:"addressId"})
      
    }
  }
  Restaurant.init({
    addressId:{
      type:DataTypes.INTEGER,
      references:{
        model:"Addresses",
        key:"id"
      }
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.STRING,
    deletedAt:DataTypes.DATE,
    deletedBy:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};