// ======= ======= ======= DB connection.js ======= ======= =======

var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///mystox_db");
var User = sequelize.import("../app/models/user");
var Stock = sequelize.import("../app/models/stock");
var Ownership = sequelize.import("../app/models/ownership");

Stock.belongsToMany(User, {through: Ownership});
User.belongsToMany(Stock, {through: Ownership});

module.exports = {
  sql: Sequelize,
  db: sequelize,
  models: {
    User: User,
    Stock: Stock,
    Ownership: Ownership
  }
};
