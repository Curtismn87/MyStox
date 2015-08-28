// ======= ======= ======= CONTROLLER stocks.js ======= ======= =======
var express = require("express");
var router = express.Router();
var Stock = require("../../db/connection").models.Stock;


// function error(response, message){
//   response.status(500);
//   response.json({error: message});
// }
//
// router.get("/stocks", function(req, res){
//   Stock.findAll().then(function(stocks){
//     res.json(stocks);
//   });
// });
//
// router.post("/stocks", function(req, res){
//   Stock.create(req.body).then(function(stock){
//     res.json(stock);
//   });
// });
//
// router.get("/stocks/:id", function(req, res){
//   Stock.findById(req.params.id).then(function(stock){
//     if(!stock) return error(res, "not found");
//     res.json(stock);
//   });
// });
//
// router.patch("/stocks/:id", function(req, res){
//   Stock.findById(req.params.id).then(function(stock){
//     if(!stock) return error(res, "not found");
//     stock.updateAttributes(req.body).then(function(updatedStock){
//       res.json(updatedStock);
//     });
//   });
// });
//
// router.delete("/stocks/:id", function(req, res){
//   Stock.findById(req.params.id).then(function(stock){
//     if(!stock) return error(res, "not found");
//     stock.destroy().then(function(){
//       res.json({success: true});
//     });
//   });
// });

module.exports = router;
