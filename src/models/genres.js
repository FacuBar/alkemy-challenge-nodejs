const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Genre',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        // url to an image
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );
};
