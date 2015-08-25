var DB = require("./connection");

DB.db.sync({force: true}).then(function(){
  process.exit();
});
