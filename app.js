// ======= ======= ======= app.js ======= ======= =======

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var usersController = require("./app/controllers/users");
var stocksController = require("./app/controllers/stocks");
var ownershipsController = require("./app/controllers/ownerships");

app.get("/", function(req, res){
  console.log("app.get");
  res.sendFile(__dirname + "/app/views/index.html");
});

app.use("/", usersController);
app.use("/", stocksController);
app.use("/", ownershipsController);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
