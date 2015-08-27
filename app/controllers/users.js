
// ======= ======= ======= CONTROLLER users.js ======= ======= =======

var express = require("express");
var router = express.Router();
var User = require("../../db/connection").models.User;

function error(response, message){
    response.status(500);
    response.json({error: message});
}

// == CREATE user
router.post("/users", function(req, res){
    User.create(req.body).then(function(user){
        res.json(user);
    });
});

// == READ all users
router.get("/users", function(req, res){
    User.findAll().then(function(users){
        res.json(users);
    });
});

// == READ user
router.get("/users/:id", function(req, res){
    console.log("/users/:id");
    User.findById(req.params.id).then(function(user){
        if(!user) return error(res, "not found");
        res.json(user);
        console.dir(res.json(user));
    });
});

// == UPDATE user
router.patch("/users/:id", function(req, res){
    User.findById(req.params.id).then(function(user){
        if(!user) return error(res, "not found");
            user.updateAttributes(req.body).then(function(updatedUser){
        res.json(updatedUser);
        });
    });
});

// == READ all user stocks
router.get("/users/:id/ownership", function(req, res){
    console.log("GET: /users/:id/ownership");
    User.findById(req.params.id).then(function(user){
        if(!user) return error(res, "not found");
        user.getStocks().then(function(stocks){
            res.send(stocks);
        });
    });
});

// == DELETE user
router.delete("/users/:id", function(req, res){
    User.findById(req.params.id).then(function(user){
        if(!user) return error(res, "not found");
            user.destroy().then(function(){
            res.json({success: true});
        });
    });
});

// == DELETE stock from group
router.delete("/users/:user_id/stock/:id", function(req, res){
    // User.findById(req.params.id).then(function(user){
    //     if(!user) return error(res, "not found");
    //         Ownership.findById(req.params.id).then(function(stock){
    //             stock.destroy().then(function(){
    //         res.json({success: true});
    //     });
    // });
});

module.exports = router;
