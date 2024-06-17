require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta_migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_meta_seeds",
    // dialectOptions: {
    //   ssl: {
    //     require: false,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
