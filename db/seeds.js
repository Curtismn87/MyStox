var DB = require("../db/connection");
var User = DB.models.User;
var Stock = DB.models.Stock;
var Ownership = DB.models.Ownership;

var users = [
  {name: "Matt Curtis", portfolioSize: 2, userName: "mattCurtis"},
  {name: "Tom Beach", portfolioSize: 4, userName: "tomBeach"},
  {name: "Kevin Cole", portfolioSize: 3, userName: "kevinCole"},
  {name: "Phil Engle", portfolioSize: 2, userName: "philEngle"}
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
  {userId: 1, stockId: 1, group: "portfolio"},
  {userId: 1, stockId: 2, group: "watch"},
  {userId: 2, stockId: 1, group: "portfolio"},
  {userId: 2, stockId: 2, group: "portfolio"},
  {userId: 2, stockId: 4, group: "portfolio"},
  {userId: 2, stockId: 7, group: "sold"},
  {userId: 2, stockId: 8, group: "sold"},
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
