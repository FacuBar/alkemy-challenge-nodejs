'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Show.belongsToMany(models.Character, {
        through: models.CharacterShow,
        foreignKey: 'ShowId',
      });

      Show.belongsToMany(models.Genre, {
        through: models.GenreShow,
        foreignKey: 'ShowId',
      });
    }
  }
  Show.init(
    {
      title: DataTypes.STRING,
      releaseDate: DataTypes.DATE,
      calification: DataTypes.NUMBER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Show',
    }
  );
  return Show;
};
