// ======= ======= ======= MODEL user.js ======= ======= =======
module.exports = function(sequelize, DataTypes){
  return sequelize.define("user", {
    name: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    nationality: DataTypes.STRING
  });
}
