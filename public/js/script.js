// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
  console.log("document.ready");

  // ======= ======= ======= Elements ======= ======= =======
  var Elements = {};

  Elements = function() {
    console.log("Elements");
    this.menu0 = $(".menuLink").eq(0);
    this.menu1 = $(".menuLink").eq(1);
    this.menu2 = $(".menuLink").eq(2);
    this.menu3 = $(".menuLink").eq(3);
    this.menu4 = $(".menuLink").eq(4);
    this.menu5 = $(".menuLink").eq(5);
    // this.menu6 = $(".menuLink").eq(6);
    this.initEventListeners();
  }

  // ======= ======= ======= initEventListeners ======= ======= =======
  Elements.prototype.initEventListeners = function() {
    console.log("initEventListeners");
    self = this;

    $(this.menu0).on("click", function(){
      self.loginForm();
    });
    $(this.menu1).on("click", function(){
      self.displayStocks();
    });
    $(this.menu2).on("click", function(){
      self.displayWatchList();
    });
    $(this.menu3).on("click", function(){
      self.displaySoldList();
    });
    $(this.menu4).on("click", function(){
      self.displayIndexes();
    });
    $(this.menu5).on("click", function(){
      self.displayProfile();
    });
    // $(this.menu6).on("click", function(){
    //   self.loginForm();
    // });
  }

  // ======= ======= ======= loginForm ======= ======= =======
  Elements.prototype.loginForm = function() {
      console.log("loginForm");

      $(".contents").html("");
      this.$el = $("<div class='loginForm'></div>");
      console.log("this.$el: " + this.$el);

      var htmlString = $("<div>");
      htmlString.append("<input type='text' name='username'> username<br>");
      htmlString.append("<input type='text' name='password'> password<br>");
      htmlString.append("<input type='button' id='loginBtn' value='enter'><br>");
      htmlString.append("</div>");

      this.$el.html(htmlString);
      $(".contents").append(this.$el);
      $(".contents").css("margin-top", "100px");
      this.loginBtn = $("#loginBtn");

      $(this.loginBtn).on("click", function(){
        console.log("loginBtn");
        self.displayPortfolio();
      })
  }

  // ======= ======= ======= menu items ======= ======= =======
  Elements.prototype.displayPortfolio = function() {
      console.log("displayPortfolio");
      initPortfolio(["AAPL", "GOOGL", "HD"]);
  }

  Elements.prototype.displayWatchList = function() {
      console.log("displayWatchList");
  }

  Elements.prototype.displaySoldList = function() {
      console.log("displaySoldList");
  }

  Elements.prototype.displayIndexes = function() {
      console.log("displayIndexes");
  }

  Elements.prototype.displayProfile = function() {
      console.log("displayProfile");
  }

  // ======= ======= ======= new Elements ======= ======= =======
  new Elements(function() {
    console.log("Elements");

  });


  // ======= ======= ======= new StockData ======= ======= =======
  function initPortfolio(stocksArray) {
      console.log("initPortfolio");

    var newStock = new StockData(stocksArray, function(stockJson) {
      console.log("new StockData");

        if (!stockJson || stockJson.Message){
            console.error("Error: ", stockJson.Message);
            return;
        }
        this.displayStock(stockJson);
    });

    function StockData(sSymbolArray, fCallback) {
      console.log("StockData");
      for (var i = 0; i < sSymbolArray.length; i++) {
        this.symbol = sSymbolArray[i];
        this.fCallback = fCallback;   // fCallback = error or process/display json
        // this.dataSource = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";

        var symbolString = '';
        for (var i = 0; i < sSymbolArray.length; i++) {
          if (i == sSymbolArray.length - 1) {
            symbolString = symbolString + sSymbolArray[i];
          } else {
            symbolString = symbolString + sSymbolArray[i] + ",";
          }
        }
        this.dataSource = "http://marketdata.websol.barchart.com/getQuote.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbols=" + symbolString;
      }
    };

    StockData.prototype.makeRequest = function() {
      console.log("makeRequest");
      if (this.ajaxRequest) { this.ajaxRequest.abort(); }
      this.ajaxRequest = $.ajax({
          data: { symbol: this.symbol },
          type: 'GET',
          // dataType: "json",
          dataType: 'jsonp',
          crossDomain: true,
          url: this.dataSource,
          success: this.handleSuccess,
          error: this.handleError,
          context: this
      });
    };

    StockData.prototype.displayStock = function(stockJson) {
      console.log("displayStock");
      var self = this;

      var container = $(".contents");
      container.empty();
      container.css("margin-top", 0);
      this.$el = $("<div class='stock'></div>");

      var stockCount = stockJson.results.length;
      var htmlString = "<table><tr><th>Name</th><th>Symbol</th><th>Low</th><th>High</th><th>LastPrice</th></tr>";

      for (var i = 0; i < stockJson.results.length; i++) {
        nextResult = stockJson.results[i];
        htmlString = htmlString + "<tr><td><h3>" +
        "<a href='#' id='stock" + i + "' value='" + nextResult.symbol + "' >" + nextResult.name + "</h3></a></td>" +
        "<td>" + nextResult.symbol + "</td>" +
        "<td>" + nextResult.low + "</td>" +
        "<td>" + nextResult.high + "</td>" +
        "<td>" + nextResult.lastPrice + "</td></tr>";
      }

      htmlString = htmlString + "</table>";
      this.$el.html(htmlString);

      $(".contents").append(this.$el);

      for (var i = 0; i < stockJson.results.length; i++) {
        var $stockLink = $("#stock" + i);
        $stockLink.on("click", function(){
          var linkValue = $(this).attr('value');
          self.displayStockGraph(linkValue);
        })
      }
    }

    StockData.prototype.displayStockGraph = function(historySymbol) {
      console.log("displayStockGraph");

      var newHistory = new HistoryData(historySymbol, function(stockJson) {
        console.log("new HistoryData");

          if (!stockJson || stockJson.Message){
              console.error("Error: ", stockJson.Message);
              return;
          }
          this.displayStockHistory(stockJson);
      });

      function HistoryData(historySymbol, fCallback) {
        console.log("HistoryData");
          // this.symbol = sSymbol;
          // this.fCallback = fCallback;   // fCallback = error or process/display json
          console.log("historySymbol: " + historySymbol);
          this.dataSource = "http://marketdata.websol.barchart.com/getHistory.json?key=5c566d2e239b7f0d6f2c73f38a767326&symbol=" + historySymbol + "&type=daily&startDate=20140822000000";
      }

      HistoryData.prototype.getHistory = function() {
        console.log("getHistory");
        if (this.ajaxRequest) { this.ajaxRequest.abort(); }
        this.ajaxRequest = $.ajax({
            data: { symbol: historySymbol },
            type: 'GET',
            // dataType: "json",
            dataType: 'jsonp',
            crossDomain: true,
            url: this.dataSource,
            success: this.handleSuccess,
            error: this.handleError,
            context: this
        });
      };
      newHistory.getHistory(historySymbol);

      StockData.prototype.displayStockHistory = function(stockJson) {
        console.log("displayStockHistory");

        var container = $(".contents");
        container.empty();
        container.css("margin-top", 0);
        this.$el = $("<div class='stock'></div>");

        var dateCount = stockJson.results.length;
        console.log("dateCount: " + dateCount);
        // var htmlString = "<table><tr><th>Name</th><th>Symbol</th><th>Low</th><th>High</th><th>LastPrice</th></tr>";

      }
    };

    StockData.prototype.handleSuccess = function(stockJson) {
      console.log("handleSuccess");
        this.fCallback(stockJson);
    };

    StockData.prototype.handleError = function(stockJson) {
      console.log("handleError");
        console.error(stockJson);
    };
    newStock.makeRequest(stocksArray);
  };
});
