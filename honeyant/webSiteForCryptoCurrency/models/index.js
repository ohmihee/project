'use strict';

const Sequelize = require('sequelize'); // class
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Join = require('./join');
const Item = require('./item');
// const {history} = require('./trading');
// const {content} = require('./trading');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); // DB접속정보
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
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

//db.User의 객체 안에 class User을 넣은 것

db.Join = Join;
// db.Item = Item;
// db.History = history;
// db.Content = content;

// Item.init(sequelize);
// history.init(sequelize);
// content.init(sequelize);
Join.init(sequelize);

/*
Item.associate(db);
history.associate(db);
content.associate(db);
Join.associate(db);
*/
db.sequelize = sequelize; // Object
db.Sequelize = Sequelize; // class

module.exports = db;