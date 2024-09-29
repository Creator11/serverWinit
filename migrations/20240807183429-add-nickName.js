'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'nickName', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true, // Устанавливаем allowNull: true

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'nickName');
  }
};
