'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Сначала удаляем старый столбец completeTask
    await queryInterface.removeColumn('Users', 'completeTask');

    // Затем добавляем новый столбец completeTask как массив
    await queryInterface.addColumn('Users', 'completeTask', {
      type: Sequelize.ARRAY(Sequelize.INTEGER), // Указываем тип как массив целых чисел
      defaultValue: [], // Устанавливаем значение по умолчанию как пустой массив
    });

    // Добавляем остальные столбцы
    await queryInterface.addColumn('Users', 'level', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Users', 'stars', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Users', 'streak', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Удаляем новые столбцы при откате миграции
    await queryInterface.removeColumn('Users', 'level');
    await queryInterface.removeColumn('Users', 'completeTask'); // Удаляем новый массивный столбец
    await queryInterface.removeColumn('Users', 'stars');
    await queryInterface.removeColumn('Users', 'streak');

    // Если нужно, можно вернуть старый столбец completeTask как INTEGER
    await queryInterface.addColumn('Users', 'completeTask', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  }
};
