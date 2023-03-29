'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Teams = queryInterface.createTable("teams", {
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
    return Teams
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams')
   }
};
