'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User)
    }
  }
  Project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    mediaUrl: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};