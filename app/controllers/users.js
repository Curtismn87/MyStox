
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
router.get("/users/:id/ownership/", function(req, res){
// router.get("/users/:id/ownership/:groupName", function(req, res){
    console.log("GET: /users/:id/ownership");
    console.log("req.params: " + req.params);
    User.findById(req.params.id).then(function(user){
        if(!user) return error(res, "not found");
        // {where: {user_id: req.params.user_id, group: req.params.groupName}}
        user.getStocks().then(function(stocks){
            res.send(stocks);
        });
    });
});

// == DELETE stock from group
router.delete("/users/:user_id/stocks/:stock_id", function(req, res){
  Ownership.destroy({where: {user_id: req.params.user_id, stock_id: req.params.stock_id}}).then(function(){
    res.json({success: true});
  });
});

module.exports = router;

// ======= ======= ======= ARCHIVE ======= ======= =======

// router.delete("/users/:user_id/stock/:id", function(req, res){
    // User.findById(req.params.id).then(function(user){
    //     if(!user) return error(res, "not found");
    //         Ownership.findById(req.params.id).then(function(stock){
    //             stock.destroy().then(function(){
    //         res.json({success: true});
    //     });
    // });
// });

// == DELETE user
// router.delete("/users/:id", function(req, res){
//     User.findById(req.params.id).then(function(user){
//         if(!user) return error(res, "not found");
//             user.destroy().then(function(){
//             res.json({success: true});
//         });
//     });
// });
