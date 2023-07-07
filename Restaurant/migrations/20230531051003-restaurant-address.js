

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Restaurants',{
      fields:['addressId'],
      type:'foreign key',
      name:'restaurant_address_association',
      references:{
        table:'Addresses',
        field:'id'
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Restaurants',{
      fields:['addressId'],
      type:'foreign key',
      name:'restaurant_address_association',
      references:{
        table:'Addresses',
        field:'id'

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
})}
};
