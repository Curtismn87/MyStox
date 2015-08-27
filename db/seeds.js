var DB = require("../db/connection");
var User = DB.models.User;
var Stock = DB.models.Stock;
var Ownership = DB.models.Ownership;
var Group = DB.models.Group;



var users = [
  {name: "Matt Curtis", portfolioSize: 2},
  {name: "Tom Beach", portfolioSize: 4},
  {name: "Kevin Cole", portfolioSize: 3},
  {name: "Phil Engle", portfolioSize: 2}
];

var stocks = [
  {name:"Google", ticker: "GOOG"},
  {name:"Apple", ticker: "AAPL"},
  {name:"Facebook", ticker: "FB"},
  {name:"Nike", ticker: "NKE"},
  {name:"Under Armour", ticker: "UA"},
  {name:"American Express", ticker: "AXP"}
];

var groups = [
  {name: "Watch", details: "Stocks that you want to follow but are not apart of your portfolio"},
  {name: "Portfolio", details: "Stocks that you currently own"},
  {name: "Sold", details: "Stocks that you have traded"},
  {name: "Index", details: "Stocks in current index"}
];

var ownerships = [
  {userId: 1, stockId: 1, groupId: 1},
  {userId: 1, stockId: 2, groupId: 1},
  {userId: 2, stockId: 1, groupId: 3},
  {userId: 2, stockId: 2, groupId: 4},
  {userId: 3, stockId: 1, groupId: 1},
  {userId: 3, stockId: 6, groupId: 2},
  {userId: 4, stockId: 5, groupId: 3},
  {userId: 4, stockId: 4, groupId: 4},
  {userId: 4, stockId: 3, groupId: 1}
];

User.bulkCreate(users).then(function(){
  Group.bulkCreate(groups);
  Stock.bulkCreate(stocks);
  return Ownership.bulkCreate(ownerships);
});
