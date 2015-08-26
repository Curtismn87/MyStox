// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
    console.log("document.ready");

    // ======= ======= ======= DisplayObject ======= ======= =======
    function Display(whichDisplay) {
        console.log('Display');
        this.name = whichDisplay;
    }
    var mainDisplay = new Display("display1");		// constructor

    // ======= ======= ======= initEventListeners ======= ======= =======
    Display.prototype.initMenuDivs = function() {
        console.log("initMenuDivs");
        this.menu0 = $(".menuLink").eq(0);
        this.menu1 = $(".menuLink").eq(1);
        this.menu2 = $(".menuLink").eq(2);
        this.menu3 = $(".menuLink").eq(3);
        this.menu4 = $(".menuLink").eq(4);
        this.menu5 = $(".menuLink").eq(5);
    }

    // ======= ======= ======= initEventListeners ======= ======= =======
    Display.prototype.initEventListeners = function() {
        console.log("initEventListeners");
        self = this;
        $(this.menu0).on("click", function(){
            self.displayLoginForm();
        });
        $(this.menu1).on("click", function(){
            self.displayPortfolioGroup();
        });
        $(this.menu2).on("click", function(){
            self.displayWatchGroup();
        });
        $(this.menu3).on("click", function(){
            self.displaySoldGroup();
        });
        $(this.menu4).on("click", function(){
            self.displayIndexGroup();
        });
        $(this.menu5).on("click", function(){
            self.displayProfile();
        });
    }

    // ======= ======= ======= loginForm ======= ======= =======
    Display.prototype.displayLoginForm = function() {
        console.log("displayLoginForm");

        // == init form container div
        $(".contents").html("");
        this.$el = $("<div class='loginForm'></div>");
        console.log("this.$el: " + this.$el);

        // == init login form elements
        var htmlString = $("<div>");
        htmlString.append("<input type='text' name='username'> username<br>");
        htmlString.append("<input type='text' name='password'> password<br>");
        htmlString.append("<input type='button' id='loginBtn' value='enter'><br>");
        htmlString.append("</div>");

        // == append and position login form elements
        this.$el.html(htmlString);
        $(".contents").append(this.$el);
        $(".contents").css("margin-top", "100px");
        this.loginBtn = $("#loginBtn");

        // == activate login button
        $(this.loginBtn).on("click", function(){
            console.log("loginBtn");
        self.displayPortfolioGroup();
        })
    }

    // ======= ======= ======= menu items ======= ======= =======
    Display.prototype.displayPortfolioGroup = function() {
        console.log("displayPortfolioGroup");
        // initPortfolio(["AAPL", "GOOGL", "HD"]);
    }

    Display.prototype.displayWatchGroup = function() {
        console.log("displayWatchGroup");
    }

    Display.prototype.displaySoldGroup = function() {
        console.log("displaySoldGroup");
    }

    Display.prototype.displayIndexGroup = function() {
        console.log("displayIndexGroup");
    }

    Display.prototype.displayProfile = function() {
        console.log("displayProfile");
    }

    mainDisplay.initMenuDivs();
    mainDisplay.initEventListeners();


  // // ======= ======= ======= new StockData ======= ======= =======
  // function initPortfolio(stocksArray) {
  //     console.log("initPortfolio");
  //
  //   var newStock = new StockData(stocksArray, function(stockJson) {
  //     console.log("new StockData");
  //
  //       if (!stockJson || stockJson.Message){
  //           console.error("Error: ", stockJson.Message);
  //           return;
  //       }
  //       this.displayStock(stockJson);
  //   });
  //
  //   function StockData(sSymbolArray, fCallback) {
  //     console.log("StockData");
  //     for (var i = 0; i < sSymbolArray.length; i++) {
  //       this.symbol = sSymbolArray[i];
  //       this.fCallback = fCallback;   // fCallback = error or process/display json
  //       // this.dataSource = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
  //
  //       var symbolString = '';
  //       for (var i = 0; i < sSymbolArray.length; i++) {
  //         if (i == sSymbolArray.length - 1) {
  //           symbolString = symbolString + sSymbolArray[i];
  //         } else {
  //           symbolString = symbolString + sSymbolArray[i] + ",";
  //         }
  //       }
  //       this.dataSource = "http://marketdata.websol.barchart.com/getQuote.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbols=" + symbolString;
  //     }
  //   };
  //
  //   StockData.prototype.makeRequest = function() {
  //     console.log("makeRequest");
  //     if (this.ajaxRequest) { this.ajaxRequest.abort(); }
  //     this.ajaxRequest = $.ajax({
  //         data: { symbol: this.symbol },
  //         type: 'GET',
  //         // dataType: "json",
  //         dataType: 'jsonp',
  //         crossDomain: true,
  //         url: this.dataSource,
  //         success: this.handleSuccess,
  //         error: this.handleError,
  //         context: this
  //     });
  //   };
  //
  //   StockData.prototype.displayStock = function(stockJson) {
  //     console.log("displayStock");
  //     var self = this;
  //
  //     var container = $(".contents");
  //     container.empty();
  //     container.css("margin-top", 0);
  //     this.$el = $("<div class='stock'></div>");
  //
  //     var stockCount = stockJson.results.length;
  //     var htmlString = "<table><tr><th>Name</th><th>Symbol</th><th>Low</th><th>High</th><th>LastPrice</th></tr>";
  //
  //     for (var i = 0; i < stockJson.results.length; i++) {
  //       nextResult = stockJson.results[i];
  //       htmlString = htmlString + "<tr><td><h3>" +
  //       "<a href='#' id='stock" + i + "' value='" + nextResult.symbol + "' >" + nextResult.name + "</h3></a></td>" +
  //       "<td>" + nextResult.symbol + "</td>" +
  //       "<td>" + nextResult.low + "</td>" +
  //       "<td>" + nextResult.high + "</td>" +
  //       "<td>" + nextResult.lastPrice + "</td></tr>";
  //     }
  //
  //     htmlString = htmlString + "</table>";
  //     this.$el.html(htmlString);
  //
  //     $(".contents").append(this.$el);
  //
  //     for (var i = 0; i < stockJson.results.length; i++) {
  //       var $stockLink = $("#stock" + i);
  //       $stockLink.on("click", function(){
  //         var linkValue = $(this).attr('value');
  //         self.displayStockGraph(linkValue);
  //       })
  //     }
  //   }
  //
  //   StockData.prototype.displayStockGraph = function(historySymbol) {
  //     console.log("displayStockGraph");
  //
  //
  //     // ======= ======= ======= History ======= ======= =======
  //     // ======= ======= ======= History ======= ======= =======
  //     // ======= ======= ======= History ======= ======= =======
  //
  //
  //     var newHistory = new HistoryData(historySymbol, function(stockJson) {
  //       console.log("new HistoryData");
  //
  //         if (!stockJson || stockJson.Message){
  //             console.error("Error: ", stockJson.Message);
  //             return;
  //         }
  //         this.displayStockHistory(stockJson);
  //     });
  //
  //     function HistoryData(historySymbol, fCallback) {
  //       console.log("HistoryData");
  //         // this.symbol = sSymbol;
  //         // this.fCallback = fCallback;   // fCallback = error or process/display json
  //         console.log("historySymbol: " + historySymbol);
  //         this.dataSource = "http://marketdata.websol.barchart.com/getHistory.json?key=5c566d2e239b7f0d6f2c73f38a767326&symbol=" + historySymbol + "&type=daily&startDate=20140822000000";
  //     }
  //
  //     HistoryData.prototype.getHistory = function() {
  //       console.log("getHistory");
  //       if (this.ajaxRequest) { this.ajaxRequest.abort(); }
  //       this.ajaxRequest = $.ajax({
  //           data: { symbol: historySymbol },
  //           type: 'GET',
  //           dataType: "json",
  //           // dataType: 'jsonp',
  //           crossDomain: true,
  //           url: this.dataSource,
  //           success: this.handleSuccess,
  //           error: this.handleError,
  //           always: this.handleAlways,
  //           context: this
  //       });
  //     };
  //     newHistory.getHistory(historySymbol);
  //
  //     HistoryData.prototype.handleAlways = function(stockJson) {
  //       console.log("HistoryData.handleAlways");
  //         this.fCallback(stockJson);
  //     };
  //
  //     HistoryData.prototype.handleSuccess = function(stockJson) {
  //       console.log("HistoryData.handleSuccess");
  //         this.fCallback(stockJson);
  //     };
  //
  //     HistoryData.prototype.handleError = function(stockJson) {
  //       console.log("HistoryData.handleError");
  //         console.error(stockJson);
  //     };
  //
  //     StockData.prototype.displayStockHistory = function(stockJson) {
  //       console.log("displayStockHistory");
  //
  //       var container = $(".contents");
  //       container.empty();
  //       container.css("margin-top", 0);
  //       this.$el = $("<div class='stock'></div>");
  //
  //       var dateCount = stockJson.results.length;
  //       console.log("dateCount: " + dateCount);
  //       // var htmlString = "<table><tr><th>Name</th><th>Symbol</th><th>Low</th><th>High</th><th>LastPrice</th></tr>";
  //
  //     }
  //   };
  //
  //   StockData.prototype.handleSuccess = function(stockJson) {
  //     console.log("handleSuccess");
  //       this.fCallback(stockJson);
  //   };
  //
  //   StockData.prototype.handleError = function(stockJson) {
  //     console.log("handleError");
  //       console.error(stockJson);
  //   };
  //   newStock.makeRequest(stocksArray);
  // };

});
