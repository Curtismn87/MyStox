// ======= ======= ======= MODEL stock.js ======= ======= =======
module.exports = function(sequelize, DataTypes){
  return sequelize.define("stock", {
    ticker: DataTypes.STRING,
    name: DataTypes.STRING,
  });
};
