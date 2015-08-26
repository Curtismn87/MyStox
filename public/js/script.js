// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
    console.log("document.ready");

    // ======= ======= ======= DisplayObject ======= ======= =======
    function Display(whichDisplay) {
        console.log('Display');
        this.name = whichDisplay;
    }
    var displayObject = new Display("display1");		// constructor

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
        getGroupData("portfolio");
    }

    Display.prototype.displayWatchGroup = function() {
        console.log("displayWatchGroup");
        getGroupData("watch");
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

    displayObject.initMenuDivs();
    displayObject.initEventListeners();


    // ======= ======= ======= StockObject ======= ======= =======
    function StockData(whichGroup, groupArray) {
        console.log('StockData');
        this.name = whichGroup;
        this.groupArray = groupArray;
        this.dataSource = "http://marketdata.websol.barchart.com/getQuote.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbols=";
    }

    function getGroupData(whichGroup) {
        console.log('getGroupData');
        if (whichGroup = "portfolio") {
            whichArray = ["APPL", "GOOGL", "HD"]                            // from database
            var portfolioGroup = new StockData(whichGroup, whichArray);	    // constructor
            symbolString = portfolioGroup.makeGroupString();
            groupData = portfolioGroup.getAjaxGroupData();
        } else if (whichGroup = "portfolio") {
            whichArray = ["APPL", "GOOGL", "HD"]                           // from database
            var watchGroup = new StockData(whichGroup, whichArray);		   // constructor
            symbolString = watchGroup.makeGroupString();
        }
    }

    StockData.prototype.makeGroupString = function() {
        console.log("makeGroupString");
        var symbolString = '';
        for (var i = 0; i < this.groupArray.length; i++) {
            if (i == this.groupArray.length - 1) {
              symbolString = symbolString + this.groupArray[i];
            } else {
              symbolString = symbolString + this.groupArray[i] + ",";
            }
        }
        return symbolString;
    }

    StockData.prototype.getAjaxGroupData = function(symbolString) {
        console.log("getAjaxGroupData");
        if (this.ajaxRequest) {
            this.ajaxRequest.abort();
        }
        this.ajaxRequest = $.ajax({
            url: this.dataSource + symbolString,
            // url: this.dataSource + "APPL",
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            error: this.handleError,
            always: this.handleAlways,
            success: this.extractGroupData,
            // success: function(data) {console.log("data: " + data.status.message);},
            context: this
        });
    }

    StockData.prototype.extractGroupData = function(jsonStock) {
        console.log("extractGroupData");
        console.log("jsonStock.code: " + jsonStock.status.code);
        console.log("jsonStock.message: " + jsonStock.status.message);
        if (jsonStock.results) {
            var stockCount = jsonStock.results.length;
            console.log("stockCount: " + stockCount);
            for (var i = 0; i < jsonStock.results.length; i++) {
                nextResult = jsonStock.results[i];
                this.symbol = nextResult.symbol;
                this.name = nextResult.name;
                this.change = nextResult.change;
                this.low = nextResult.low;
                this.high = nextResult.high;
                this.lastPrice = nextResult.lastPrice;
            }
        } else {
            console.log("no results in this response");
        }
    }

    StockData.prototype.handleError = function() {
        console.log("handleError");
    }

});
