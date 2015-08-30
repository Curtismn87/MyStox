// ======= ======= ======= app.js ======= ======= =======

var express = require("express");
var app = express();
var path = require("path");
var methodOverride = require('method-override');
var bodyParser = require("body-parser");
var env = require("./env");
var session = require("express-session");

 app.use(methodOverride('_method'));
 app.use(function(req, res, next){
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
     next();
 })
 .options('*', function(req, res, next){
     res.end();
 })
 ;

 app.use(session({
   secret: "what"
 }));

app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var usersController = require("./app/controllers/users");
var stocksController = require("./app/controllers/stocks");
var ownershipsController = require("./app/controllers/ownerships");

 //============== Start of Twitter Strategy==============//
 var passport = require("passport");
 var TwitterStrategy = require("passport-twitter").Strategy;
 passport.serializeUser(function(user, done) {
   done(null, user);
 });

 passport.deserializeUser(function(obj, done) {
   done(null, obj);
 });

 app.use(passport.initialize());
 app.use(passport.session());

 passport.use(new TwitterStrategy({
   consumerKey: env.consumerKey,
   consumerSecret: env.consumerSecret,
   callbackUrl: env.callbackUrl
 }, function(aToken, aTokenSecret, aProfile, done){
   token = aToken;
   tokenSecret = aTokenSecret;
   profile = aProfile;
   done(null, profile);
 }));

 app.get("/auth/twitter", passport.authenticate('twitter'), function(req, res){ });
 app.get("/auth/twitter/callback", passport.authenticate('twitter'), function(req, res){
  req.session.token = token;
  req.session.tokenSecret = tokenSecret;
  req.session.profile = profile;
  console.log(token);
  console.log(tokenSecret);
  console.log(profile);
  res.redirect("/");
 });

 app.get("/signout", function(req, res){
   req.session.destroy();
   res.redirect("/");
 });
//============== End of Twitter Strategy==============//
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
