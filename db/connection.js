// ======= ======= ======= DB connection.js ======= ======= =======
var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///mystox_db");

var User = sequelize.import("../app/models/user");
var Stock = sequelize.import("../app/models/stock");
var Portfolio = sequelize.import("../app/models/portfolio");

//Stock.belings(User);
//User.hasMany(Stock);

Stock.belongsToMany(User, {through: 'portfolio'});
User.belongsToMany(Stock, {through: 'portfolio'});

module.exports = {
  sql: Sequelize,
  db: sequelize,
  models: {
    User: User,
    Stock: Stock,
    Portfolio: Portfolio
  }
};
