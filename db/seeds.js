var DB = require("../db/connection");
var User = DB.models.User;
var Stock = DB.models.Stock;
var Ownership = DB.models.Ownership;

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

var ownerships = [
  {userId: 1, stockId: 1, group: "portfolio"},
  {userId: 1, stockId: 2, group: "watch"},
  {userId: 2, stockId: 1, group: "portfolio"},
  {userId: 2, stockId: 2, group: "sold"},
  {userId: 3, stockId: 1, group: "sold"},
  {userId: 3, stockId: 6, group: "portfolio"},
  {userId: 4, stockId: 5, group: "portfolio"},
  {userId: 4, stockId: 4, group: "watch"},
  {userId: 4, stockId: 3, group: "sold"}
];

User.bulkCreate(users).then(function(){
  Stock.bulkCreate(stocks);
  return Ownership.bulkCreate(ownerships);
});
