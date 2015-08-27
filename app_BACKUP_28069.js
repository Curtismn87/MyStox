// ======= ======= ======= app.js ======= ======= =======

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var usersController = require("./app/controllers/users");
<<<<<<< HEAD
var stocksController = require("./app/controllers/stocks");
var ownershipsController = require("./app/controllers/ownerships");
=======
// var stocksController = require("./controllers/stocks");
>>>>>>> api-recode

app.get("/", function(req, res){
  console.log("app.get");
  res.sendFile(__dirname + "/app/views/index.html");
});

<<<<<<< HEAD

app.use("/", usersController);
app.use("/", stocksController);
app.use("/", ownershipsController);
=======
app.use("/", usersController);
// app.use("/", stocksController);
>>>>>>> api-recode

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
