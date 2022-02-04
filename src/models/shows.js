const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Show',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      releaseDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      calification: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
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
