'use strict';
const bcryptjs=require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let psd=await bcryptjs.hash("dayana", 10)
    await queryInterface.bulkInsert('Users',[
      {
        firstName:'dayana',
        lastName:'biddika',
        role:'Admin',
        email:'dayanad@gmail.com',
        password:psd,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:'harsha',
        lastName:'biddika',
        role:'restaurantOwner',
        email:'harshaa@gmail.com',
        password:psd,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:'teja',
        lastName:'bolloju',
        role:'user',
        email:'tejaa@gmail.com',
        password:psd,
        createdAt: new Date(),
        updatedAt: new Date()
      },

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
    await queryInterface.bulkDelete('Users',null,{});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
