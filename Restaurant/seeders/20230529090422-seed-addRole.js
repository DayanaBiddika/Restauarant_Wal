'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {
        firstName:'dayana',
        lastName:'biddika',
        role:'Admin',
        email:'dayana@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        firstName:'harsha',
        lastName:'biddika',
        role:'restaurantOwner',
         email:'harsha@gmail.com',
        createdAt: new Date(),
         updatedAt: new Date()
       },
      {
        firstName:'teja',
        lastName:'bolloju',
        role:'user',
        email:'teja@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    },
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users',null,{});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
