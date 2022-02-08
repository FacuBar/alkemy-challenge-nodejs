'use strict';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configF from '../config/config.cjs';
import { URL } from 'url'; // in Browser, the URL in native accessible on window

const __dirname = new URL('.', import.meta.url).pathname;
const env = process.env.NODE_ENV || 'development';
const config = configF[env];
const db = {};

let once = false;

export default function connectDB() {
  if (once) return db;

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

  fs.readdirSync(path.resolve(__dirname, './'))
    .filter(
      (t) => ~t.indexOf('.js') && !~t.indexOf('index') && !~t.indexOf('.map')
    )
    .forEach(async (file, i, arr) => {
      let { default: model } = await import(path.resolve(__dirname, file));
      model = model(sequelize, Sequelize.DataTypes);
      db[model.name] = model;

      // cheap work around for import being async
      if (i === arr.length - 1) {
        Object.keys(db).forEach((modelName) => {
          if (db[modelName].associate) {
            db[modelName].associate(db);
          }
        });
      }
    });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}
