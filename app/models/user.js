// ======= ======= ======= MODEL user.js ======= ======= =======
module.exports = function(sequelize, DataTypes){
  return sequelize.define("user", {
    userName: DataTypes.STRING,
    name: DataTypes.STRING,
    portfolioSize: DataTypes.INTEGER
  });
};
