// ======= ======= ======= CONTROLLER users.js ======= ======= =======
var express = require("express");
var router = express.Router();
var Ownership = require("../../db/connection").models.Ownership;

function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.get("/ownerships", function(req, res){
  Ownership.findAll().then(function(ownerships){
    res.json(ownerships);
  });
});

router.post("/ownerships", function(req, res){
  Ownerships.create(req.body).then(function(ownerships){
    res.json(ownerships);
  });
});

router.get("/ownerships/:id", function(req, res){
  Ownership.findById(req.params.id).then(function(ownership){
    if(!ownership) return error(res, "not found");
    res.json(ownership);
  });
});
router.patch("/ownerships/:id", function(req, res){
  Ownership.findById(req.params.id).then(function(ownership){
    if(!ownership) return error(res, "not found");
    ownership.updateAttributes(req.body).then(function(updatedOwnership){
      res.json(updatedOwnership);
    });
  });
});

router.delete("/ownerships/:id", function(req, res){
  Ownership.findById(req.params.id).then(function(ownership){
    if(!ownership) return error(res, "not found");
    ownership.destroy().then(function(){
      res.json({success: true});
    });
  });
});


module.exports = router;
