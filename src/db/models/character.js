'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Character.belongsToMany(models.Show, {
        through: models.CharacterShow,
        foreignKey: 'CharacterId',
      });
    }
  }
  Character.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      age: DataTypes.NUMBER,
      weight: DataTypes.NUMBER,
      history: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Character',
    }
  );
  return Character;
};
