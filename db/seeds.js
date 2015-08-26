var DB = require("../db/connection");
var User = DB.models.User;
var Stock = DB.models.Stock;
var Portfolio = DB.models.Portfolio;


var users = [
  {name: "Matt Curtis", portfolioSize: "2"},
  {name: "Tom Beach", portfolioSize: "4"},
  {name: "Kevin Cole", portfolioSize: "3"},
  {name: "Phil Engle", portfolioSize: "2"}
];

var stocks = [
  {name:"Google", ticker: "GOOG"},
  {name:"Apple", ticker: "AAPL"},
  {name:"Facebook", ticker: "FB"},
  {name:"Nike", ticker: "NKE"},
  {name:"Under Armour", ticker: "UA"},
  {name:"American Express", ticker: "AXP"}
];

var portfolios = [
  {brokerageAccount: "Scott Trade", userId: "1", stockId: "1"},
  {brokerageAccount: "Scott Trade", userId: "1", stockId: "2"},
  {brokerageAccount: "E-Trade", userId: "2", stockId: "1"},
  {brokerageAccount: "E-Trade", userId: "2", stockId: "2"},
  {brokerageAccount: "E-Trade", userId: "3", stockId: "1"},
  {brokerageAccount: "Fidelity", userId: "3", stockId: "6"},
  {brokerageAccount: "Fidelity", userId: "4", stockId: "5"},
  {brokerageAccount: "Fidelity", userId: "4", stockId: "4"},
  {brokerageAccount: "Fidelity", userId: "4", stockId: "3"}
];

User.bulkCreate(users).then(function(){
  Stock.bulkCreate(stocks);
  return Portfolio.bulkCreate(portfolios);
});
