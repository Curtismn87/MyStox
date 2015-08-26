var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

// var usersController = require("./controllers/users");
var stocksController = require("./app/controllers/stocks");

app.get("/", function(req, res){
  console.log("app.get");
  res.sendFile(__dirname + "/app/views/index.html");
});

app.get("/test", function(req, res){
  console.log("app.get");
  res.sendFile(__dirname + "/app/views/testviews.html");
});
app.use("/", express.static(path.join(__dirname + "/")));


// app.use("/", usersController);
app.use("/test", stocksController);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
