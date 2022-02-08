'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genre.belongsToMany(models.Show, {
        through: models.GenreShow,
        foreignKey: 'GenreId',
      });
    }
  }
  Genre.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Genre',
    }
  );
  return Genre;
};
