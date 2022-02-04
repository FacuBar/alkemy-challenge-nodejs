const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const modelDefiners = [
  require('../models/characters'),
  require('../models/genres'),
  require('../models/shows'),
  require('../models/users'),
];

// defining schemas
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// adding associations
require('../models/associations')(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
