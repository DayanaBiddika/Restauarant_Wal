'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Restaurants",[
      {
        name:"pakka local",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        createdBy:"restaurantOwner",
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedBy:"restaurantOwner"
      },
      {
        name:"pista house",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        createdBy:"restaurantOwner",
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedBy:"restaurantOwner"

      },
      {
        name:"Mehfil",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        createdBy:"restaurantOwner",
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedBy:"restaurantOwner"
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants',null,{});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
