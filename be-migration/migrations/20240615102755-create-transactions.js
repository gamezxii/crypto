"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("transactions", {
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

        portfolio_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "portfolios",
            key: "id",
          },
        },

        coin: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },

        transaction_type: {
          type: Sequelize.ENUM(["BUY", "SELL"]),
          allowNull: false,
        },

        amount: {
          type: Sequelize.DECIMAL(18, 10),
          allowNull: false,
        },

        price: {
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
      .then(() => queryInterface.addIndex("transactions", ["user_id"]))
      .then(() =>
        queryInterface.addIndex("transactions", ["user_id", "portfolio_id"])
      )
      .then(() => queryInterface.addIndex("transactions", ["user_id", "coin"]))
      .then(() =>
        queryInterface.addIndex("transactions", ["user_id", "amount", "price"])
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transactions");
  },
};
