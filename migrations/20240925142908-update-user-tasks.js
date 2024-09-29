'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Удаление старого столбца completeTask, если он существует
     const table = await queryInterface.describeTable('Users');
     if (table.completeTask) {
       await queryInterface.removeColumn('Users', 'completeTask');
     }
     
     // Добавление столбца completeTask с типом массив
     await queryInterface.addColumn('Users', 'completeTask', {
       type: Sequelize.ARRAY(Sequelize.INTEGER),
       defaultValue: [],
     });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
