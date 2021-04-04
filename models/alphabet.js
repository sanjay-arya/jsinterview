'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alphabet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Alphabet.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    randAlphabet: DataTypes.STRING(1)
  }, {
    sequelize,
    modelName: 'Alphabet',
    tableName: 'alphabets'
  });
  return Alphabet;
};