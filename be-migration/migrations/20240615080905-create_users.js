"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("users", {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },

        username: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },

        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },

        first_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },

        last_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      })
      .then(() => queryInterface.addIndex("users", ["username"]))
      .then(() => queryInterface.addIndex("users", ["first_name"]));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
