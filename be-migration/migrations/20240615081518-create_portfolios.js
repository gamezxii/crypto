"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("portfolios", {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },

        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },

        coin: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },

        amount: {
          type: Sequelize.DECIMAL(18, 10),
          allowNull: false,
        },

        average_purchase_price: {
          type: Sequelize.DECIMAL(18, 10),
          allowNull: false,
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
      .then(() => queryInterface.addIndex("portfolios", ["user_id"]))
      .then(() => queryInterface.addIndex("portfolios", ["user_id", "coin"]));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("portfolios");
  },
};
