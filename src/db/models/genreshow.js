'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class GenreShow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GenreShow.init(
    {
      GenreId: DataTypes.NUMBER,
      ShowId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'GenreShow',
    }
  );
  return GenreShow;
};
