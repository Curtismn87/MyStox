var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var usersController = require("./app/controllers/users");
var stocksController = require("./app/controllers/stocks");

app.get("/", function(req, res){
  console.log("app.get");
  res.sendFile(__dirname + "/app/views/index.html");
});


app.use("/", usersController);
app.use("/", stocksController);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
