// ======= ======= ======= DB connection.js ======= ======= =======
var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///mystox_db");

var User = sequelize.import("../models/user");
var Stock = sequelize.import("../models/stock");

Stock.hasMany(User);
User.hasMany(Stock);

module.exports = {
  sql: Sequelize,
  db: sequelize,
  models: {
    User: User,
    Stock: Stock
  }
};
