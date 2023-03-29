'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    }
    )
    return Users
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
   }
};
