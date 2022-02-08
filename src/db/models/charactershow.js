'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CharacterShow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CharacterShow.init(
    {
      CharacterId: DataTypes.NUMBER,
      ShowId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'CharacterShow',
    }
  );
  return CharacterShow;
};
