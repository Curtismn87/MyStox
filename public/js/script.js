// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
  console.log("document.ready");

  var Markit = {};

  Markit.QuoteService = function(sSymbol, fCallback) {
      this.symbol = sSymbol;
      this.fCallback = fCallback;
      this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
      this.makeRequest();
  };

  Markit.QuoteService.prototype.makeRequest = function() {
    console.log("makeRequest");
      //Abort any open requests
      if (this.xhr) { this.xhr.abort(); }
      //Start a new request
      this.xhr = $.ajax({
          data: { symbol: this.symbol },
          url: this.DATA_SRC,
          dataType: "jsonp",
          success: this.handleSuccess,
          error: this.handleError,
          context: this
      });
  };

  Markit.QuoteService.prototype.displayStock = function(stockJson) {
      console.log("displayStock");

      // == container for stock data
      this.$el = $("<div class='stock'></div>");

      var htmlString = $("<div>");
      htmlString.append("<h3>" + stockJson.Name + "</h3>");
      htmlString.append("<h1>" + stockJson.Symbol + "</h1>");
      htmlString.append("<h1>" + stockJson.Low + "</h1>");
      htmlString.append("<h1>" + stockJson.High + "</h1>");
      htmlString.append("<h1>" + stockJson.LastPrice + "</h1>");
      htmlString.append("</div>");

      this.$el.html(htmlString);
      $(".stockData").append(this.$el);

  }

  Markit.QuoteService.prototype.handleSuccess = function(stockJson) {
    console.log("handleSuccess");
      this.fCallback(stockJson);
  };

  Markit.QuoteService.prototype.handleError = function(stockJson) {
      console.error(stockJson);
  };

  new Markit.QuoteService("AAPL", function(stockJson) {
    console.log("Markit.QuoteService");

      //Catch errors
      if (!stockJson || stockJson.Message){
          console.error("Error: ", stockJson.Message);
          return;
      }

      //If all goes well, your quote will be here.
      console.log(stockJson);
      console.log(stockJson.Name);
      this.displayStock(stockJson);

      //Now proceed to do something with the data.
      $("h1").first().text(stockJson.Name);

      /**
      * Need help? Visit the API documentation at:
      * http://dev.markitondemand.com
      */
  });


});
