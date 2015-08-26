// ======= ======= ======= CONTROLLER artist.js ======= ======= =======
var express = require("express");
var router = express.Router();
var Stock = require("../../db/connection").models.Stock;


function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.get("/stocks", function(req, res){
  Stock.findAll().then(function(stocks){
    res.json(stocks);
  });
});

module.exports = router;
