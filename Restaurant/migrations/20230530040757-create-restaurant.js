'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.STRING
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.STRING
      },
      addressId:{
          type:Sequelize.INTEGER
        },
      deletedAt:{
        type:Sequelize.DATE
      },
      deletedBy:{
        type:Sequelize.STRING
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Restaurants');
  }
};