'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'premium', {
      type: Sequelize.BOOLEAN,
      allowNull: true, // Устанавливаем allowNull: true
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'premium');
  }
};
