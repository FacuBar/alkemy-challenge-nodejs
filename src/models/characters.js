const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Character',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      image: {
        allowNull: false,
        // url to the image
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      age: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      weight: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      history: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    }
  );
};
