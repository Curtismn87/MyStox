// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
  console.log("document.ready");

  // ======= Elements =======
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

  Elements.prototype.initEventListeners = function() {
    console.log("initEventListeners");
    self = this;

    $(this.menu0).on("click", function(){
      console.log("click0");
      self.loginForm();
    });
    $(this.menu1).on("click", function(){
      console.log("click1");
    });
    $(this.menu2).on("click", function(){
      console.log("click2");
    });
    $(this.menu3).on("click", function(){
      console.log("click3");
    });
    $(this.menu4).on("click", function(){
      console.log("click4");
    });
    $(this.menu5).on("click", function(){
      console.log("click5");
    });
    $(this.menu6).on("click", function(){
      console.log("click6");
    });
  }

  Elements.prototype.loginForm = function(stockJson) {
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


  new Elements(function() {
    console.log("Elements");

  });

  // ======= Markit =======
  var Markit = {};

  Markit = function(sSymbol, fCallback) {
    console.log("Markit");
    this.symbol = sSymbol;
    this.fCallback = fCallback;
    this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
    this.makeRequest();
  };

  Markit.prototype.makeRequest = function() {
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

  Markit.prototype.displayStock = function(stockJson) {
      console.log("displayStock");

      this.$el = $("<div class='stock'></div>");

      var htmlString = $("<div>");
      htmlString.append("<h3>" + stockJson.Name + "</h3>");
      htmlString.append("<h1>" + stockJson.Symbol + "</h1>");
      htmlString.append("<h1>" + stockJson.Low + "</h1>");
      htmlString.append("<h1>" + stockJson.High + "</h1>");
      htmlString.append("<h1>" + stockJson.LastPrice + "</h1>");
      htmlString.append("</div>");

      this.$el.html(htmlString);
      $(".contents").append(this.$el);

  }

  Markit.prototype.handleSuccess = function(stockJson) {
    console.log("handleSuccess");
      this.fCallback(stockJson);
  };

  Markit.prototype.handleError = function(stockJson) {
      console.error(stockJson);
  };


  new Markit("AAPL", function(stockJson) {
    console.log("Markit");

      if (!stockJson || stockJson.Message){
          console.error("Error: ", stockJson.Message);
          return;
      }
      this.displayStock(stockJson);

  });


});
