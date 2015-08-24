// ======= ======= ======= DB connection.js ======= ======= =======
var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///mystox_db");
var User = sequelize.import("../models/user");
var Stock = sequelize.import("../models/stock");

// Song.belongsTo(Artist);
Stock.hasMany(User);
User.hasMany(Stock);

module.exports = {
  sql: Sequelize,
  dbobj: sequelize,
  models: {
    User: User,
    Stock: Stock
  }
}
