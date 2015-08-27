var DB = require("../db/connection");
var User = DB.models.User;
var Stock = DB.models.Stock;
var Ownership = DB.models.Ownership;


var users = [
  {name: "Matt Curtis", portfolioSize: "2"},
  {name: "Tom Beach", portfolioSize: "4"},
  {name: "Kevin Cole", portfolioSize: "3"},
  {name: "Phil Engle", portfolioSize: "2"}
];

var stocks = [
  {name:"Google", ticker: "GOOGL"},
  {name:"Apple", ticker: "AAPL"},
  {name:"Facebook", ticker: "FB"},
  {name:"Nike", ticker: "NKE"},
  {name:"Under Armour", ticker: "UA"},
  {name:"American Express", ticker: "AXP"},
  {name:"Reingold", ticker: "GOLD"},
  {name:"Home Depot", ticker: "HD"}
];

var ownerships = [
  {userId: "1", stockId: "1"},
  {userId: "1", stockId: "2"},
  {userId: "2", stockId: "1"},
  {userId: "2", stockId: "2"},
  {userId: "2", stockId: "7"},
  {userId: "2", stockId: "8"},
  {userId: "3", stockId: "1"},
  {userId: "3", stockId: "6"},
  {userId: "4", stockId: "5"},
  {userId: "4", stockId: "4"},
  {userId: "4", stockId: "3"}
];

User.bulkCreate(users).then(function(){
  Stock.bulkCreate(stocks);
  return Ownership.bulkCreate(ownerships);
});
