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
      })
  }

  // ======= ======= ======= menu items ======= ======= =======
  Elements.prototype.displayStocks = function() {
      console.log("displayStocks");
      initNewStock(["AAPL", "GOOGL"]);
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
  function initNewStock(stocksArray) {
      console.log("initNewStock");

    var newStock = new StockData(stocksArray, function(stockJson) {
      console.log("new StockData");

        if (!stockJson || stockJson.Message){
            console.error("Error: ", stockJson.Message);
            return;
        }
        console.log("stockJson.results: " + stockJson.results);
        console.log("stockJson.results[0]: " + stockJson.results[0]);
        console.log("stockJson.results[0].close: " + stockJson.results[0].close);
        console.log("stockJson.results[0].lastPrice: " + stockJson.results[0].lastPrice);
        this.displayStock(stockJson);

    });

    function StockData(sSymbolArray, fCallback) {
      console.log("StockData");
      for (var i = 0; i < sSymbolArray.length; i++) {
        this.symbol = sSymbolArray[i];
        this.fCallback = fCallback;   // fCallback = error or process/display json
        // this.dataSource = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
        this.dataSource = "http://marketdata.websol.barchart.com/getQuote.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbols=GOOGL,AAPL";
      }
    };

    StockData.prototype.makeRequest = function() {
      console.log("makeRequest");
      console.log("this.dataSource: " + this.dataSource);
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

        var container = $(".contents");
        container.empty();
        container.css("margin-top", 0);
        this.$el = $("<div class='stock'></div>");

        var htmlString = "<table><tr><th>Name</th><th>Symbol</th><th>Low</th><th>High</th><th>LastPrice</th></tr>" +
        // "<tr><td><h3>" + stockJson.Name + "</h3></td>" +
        // "<td>" + stockJson.Symbol + "</td>" +
        // "<td>" + stockJson.Low + "</td>" +
        // "<td>" + stockJson.High + "</td>" +
        // "<td>" + stockJson.LastPrice + "</td>" +
        "<tr><td><h3>" + stockJson.results[0].name + "</h3></td>" +
        "<td>" + stockJson.results[0].symbol + "</td>" +
        "<td>" + stockJson.results[0].low + "</td>" +
        "<td>" + stockJson.results[0].high + "</td>" +
        "<td>" + stockJson.results[0].lastPrice + "</td></tr>" +
        "<tr><td><h3>" + stockJson.results[1].name + "</h3></td>" +
        "<td>" + stockJson.results[1].symbol + "</td>" +
        "<td>" + stockJson.results[1].low + "</td>" +
        "<td>" + stockJson.results[1].high + "</td>" +
        "<td>" + stockJson.results[1].lastPrice + "</td>" +
        "</tr></table>";
        this.$el.html(htmlString);

        // var htmlString = $("<table><tr><th>Name</th><th>Symbol</th><th>Low</th><th>High</th><th>LastPrice</th></tr>");
        // htmlString.append("<tr><td><h3>" + stockJson.Name + "</h3></td>");
        // htmlString.append("<td>" + stockJson.Symbol + "</td>");
        // htmlString.append("<td>" + stockJson.Low + "</td>");
        // htmlString.append("<td>" + stockJson.High + "</td>");
        // htmlString.append("<td>" + stockJson.LastPrice + "</td>");
        // htmlString.append("</tr></table>");

        // this.$el.html(htmlString);
        $(".contents").append(this.$el);
    }

    StockData.prototype.handleSuccess = function(stockJson) {
      console.log("handleSuccess");
      console.log("stockJson: " + stockJson);
        this.fCallback(stockJson);
    };

    StockData.prototype.handleError = function(stockJson) {
      console.log("handleError");
        console.error(stockJson);
    };

    newStock.makeRequest(stocksArray);

  }

});
