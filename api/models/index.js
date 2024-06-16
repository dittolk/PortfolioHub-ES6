// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

/////////////ES6

'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join, dirname } from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';
import config from '../config/config.js'; // Adjust the path if necessary

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
if (config[env].use_env_variable) {
  sequelize = new Sequelize(process.env[config[env].use_env_variable], config[env]);
} else {
  sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
}

const initializeModels = async () => {
  const files = readdirSync(__dirname).filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

  // for (const file of files) {
  //   const model = await import(join(__dirname, file));
  //   if (model.default) {
  //     model.default(sequelize, Sequelize.DataTypes);
  //     db[model.default.name] = model.default;
  //   }
  // }

  for (const file of files) {
    const modelDefiner = await import(join(__dirname, file));
    const model = modelDefiner.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await initializeModels();

export default db;