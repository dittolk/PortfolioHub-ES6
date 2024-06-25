'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProjectImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectImage.belongsTo(models.Project)
    }
  }
  ProjectImage.init({
    mediaUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectImage',
  });
  return ProjectImage;
};