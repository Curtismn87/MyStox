
// ======= ======= ======= CONTROLLER users.js ======= ======= =======

var express = require("express");
var router = express.Router();
var User = require("../../db/connection").models.User;

function error(response, message){
    response.status(500);
    response.json({error: message});
}

// == authenticate user
router.post("/users/authenticate/", function(req, res){
    // User.find({where: {name: req.params.username, password: req.params.password}}).then(function(user){
    User.find({where: {name: req.params.username}}).then(function(user){
        if(!user) return error(res, "not found");
        res.json(user);
        console.dir(res.json(user));
    });
});

// == CREATE user
router.post("/users", function(req, res){
    User.create(req.body).then(function(user){
        // res.json(user);
    });
});

// == CREATE stock
router.post("users/:id/stocks/:whichGroup", function(req, res){
    Stock.create(req.body).then(function(stock){
        // res.json(stock);
    });
    // Ownership.create(req.body).then(function(ownership){
    //     // res.json(stock);
    // });
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
// router.get("/users/:id/ownership/:group", function(req, res){
    console.log("GET: /users/:id/ownership");
    console.log("req.params: " + req.params);
    User.findById(req.params.id).then(function(user){
        if(!user) return error(res, "not found");
            user.getStocks().then(function(stocks){
            // user.getStocks({where: {user_id: req.query.user_id, group: req.query.group}}).then(function(stocks){
            // user.getStocks({where: {user_id: req.params.user_id, group: req.params.group}}).then(function(stocks){
            // stocks.getStocks({where: {user_id: req.params.user_id, group: req.params.group}}).then(function(stocks){
            // ownership.getStocks({where: {user_id: req.params.user_id, group: req.params.group}}).then(function(stocks){
            res.send(stocks);
        });
    });
});

// == DELETE stock from group
router.delete("/users/:user_id/stocks/:stock_id", function(req, res) {
    console.log("DELETE: /users/:user_id/stocks/:stock_id");
        // Ownership.destroy({where: {user_id: req.params.user_id, stock_id: req.params.stock_id}}).then(function(){
        // res.json({success: true});
    // });
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
