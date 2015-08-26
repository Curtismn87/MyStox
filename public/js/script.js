// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
    console.log("document.ready");

    // == make new StockData instance
    function makeStockDataObject(whichGroup) {
        console.log("makeStockDataObject");
        var groupDataObject = new StockData(whichGroup);    // constructor
        groupDataObject.name = whichGroup;                  // store group name on object
        groupDataObject.displayObject = this;               // store display object
        console.log("  this.name: " + groupDataObject.name);
        return groupDataObject;
    }

    // ======= ======= ======= DisplayObject ======= ======= =======
    // ======= ======= ======= DisplayObject ======= ======= =======
    // ======= ======= ======= DisplayObject ======= ======= =======

    function Display(whichDisplay) {
        console.log('Display');
        this.name = whichDisplay;
        this.menuArray = null;
    }
    var displayObject = new Display("display1");		// constructor

    // ======= ======= ======= initEventListeners ======= ======= =======
    Display.prototype.initMenuDivs = function() {
        console.log("initMenuDivs");
        console.log('  this.name: ' + this.name);

        var menuArray = [];
        var menuLength = $(".menuLink").length;
        for (i = 0; i < menuLength; i++) {
            menuArray.push($(".menuLink").eq(i));
        }
        this.menuArray = menuArray;
    }

    // ======= ======= ======= initEventListeners ======= ======= =======
    Display.prototype.initEventListeners = function() {
        console.log("initEventListeners");
        console.log('  this.name: ' + this.name);

        self = this;
        $(this.menuArray[0]).on("click", function(){
            self.displayLoginForm();
        });
        $(this.menuArray[1]).on("click", function(){
            updateMenu(self.menuArray[1], self);
            groupDataObject = makeStockDataObject("portfolio");
            groupDataObject.getGroupData();
        });
        $(this.menuArray[2]).on("click", function(){
            updateMenu(self.menuArray[2], self);
            groupDataObject = makeStockDataObject("watch");
            groupDataObject.getGroupData();
        });
        $(this.menuArray[3]).on("click", function(){
            updateMenu(self.menuArray[3], self);
            groupDataObject = makeStockDataObject("sold");
            groupDataObject.getGroupData();
        });
        $(this.menuArray[4]).on("click", function(){
            updateMenu(self.menuArray[4], self);
            groupDataObject = makeStockDataObject("index");
            groupDataObject.getGroupData();
        });
        $(this.menuArray[5]).on("click", function(){
            self.displayProfile();
        });

        function updateMenu(whichMenuItem, self) {
            console.log("updateMenu");
            console.log('  self.name: ' + self.name);
            for (i = 0; i < self.menuArray.length; i++) {
                nextMenuItem = self.menuArray[i];
                console.log("  nextMenuItem: " + nextMenuItem.attr('class'));
                nextMenuItem.removeClass("thisPage");
            }
            whichMenuItem.addClass("thisPage");
            for (i = 0; i < self.menuArray.length; i++) {
                nextMenuItem = self.menuArray[i];
                console.log("  nextMenuItem: " + nextMenuItem.attr('class'));
            }
        }

    }

    // ======= ======= ======= loginForm ======= ======= =======
    Display.prototype.displayLoginForm = function() {
        console.log("displayLoginForm");
        console.log('  this.name: ' + this.name);
        var self = this;

        // == init form container div
        $(".contents").html("");
        this.$el = $("<div class='loginForm'></div>");

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
            self.updateLoginMenuItem();
            groupDataObject = makeStockDataObject("portfolio");
            groupDataObject.getGroupData();
        })
    }

    // ======= ======= ======= loginForm ======= ======= =======
    Display.prototype.updateLoginMenuItem = function() {
        console.log("updateLoginMenuItem");
        // this.menuArray[0].text("logout");
        this.menuArray[0].html("<a href='#'>logout</a>");
    }

    displayObject.initMenuDivs();
    displayObject.initEventListeners();


    // ======= ======= ======= StockObject ======= ======= =======
    // ======= ======= ======= StockObject ======= ======= =======
    // ======= ======= ======= StockObject ======= ======= =======

    function StockData(whichGroup, groupArray, displayObject) {
        console.log('StockData');
        this.name = whichGroup;             // portfolio, watchlist, sold, indexes
        this.groupArray = groupArray;       // stocks in group (returned from database)
        this.stockObjectsArray = [];       // stocks in group (returned from database)
        this.displayObject = displayObject; // store display object for display access
        this.jsonCallback = "???";          // callback function required for jsonp data ???
        this.dataSource = "http://marketdata.websol.barchart.com/getQuote.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbols=";
        // this.dataSource = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
        // this.dataSource = "http://dev.markitondemand.com/Api/v2/Quote";
    }

    // ======= ======= ======= getGroupData ======= ======= =======
    StockData.prototype.getGroupData = function() {
        console.log('getGroupData');
        console.log('  this.name: ' + this.name);

        // == create url for local server API
        if (this.name = "portfolio") {
            urlString = "/users/:id/stocks/";
        } else if (this.name = "watch") {
            urlString = "/users/:id/watch/";
        } else if (this.name = "sold") {
            urlString = "/users/:id/sold/";
        } else if (this.name = "index") {
            urlString = "/users/:id/index/";
        }

        // == extract stock list from database
        // $.ajax({
        //     url: urlString,
        //     method: "get"
        // }).then(function(response) {
        //     this.groupArray = response;                     // from database
        //     symbolStrig = this.makeGroupString();           // array => string
        //     groupData = this.getAjaxGroupData(symbolStrig); // make ajax request
        // }).fail(function() {
        //     console.log("database query failed");
        // });

        // == temp stock list for development
        tempArray = ["AAPL", "GOOGL", "HD"];
        // tempArray = ["APPL"];
        this.groupArray = tempArray;
        symbolString = this.makeGroupString();
        groupData = this.getAjaxGroupData(symbolString);

    }

    // ======= ======= ======= makeGroupString ======= ======= =======
    StockData.prototype.makeGroupString = function() {
        console.log("makeGroupString");
        console.log("  this.name: " + this.name);
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

    // ======= ======= ======= getAjaxGroupData ======= ======= =======
    StockData.prototype.getAjaxGroupData = function(symbolStrig) {
        console.log("getAjaxGroupData");
        console.log("  this.name: " + this.name);
        self = this;
        if (this.ajaxRequest) {
            console.log("request aborted");
            this.ajaxRequest.abort();
        }
        this.ajaxRequest = $.ajax({
            // url: this.dataSource,                       // markitondemand API
            // data: { symbol: symbolString },             // markitondemand API
            url: this.dataSource + symbolString,     // barchart API
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            error: self.handleError,
            always: self.handleAlways,
            success: self.extractGroupData,
            context: self
        });

    }

    // ======= ======= ======= extractGroupData ======= ======= =======
    StockData.prototype.extractGroupData = function(jsonStock) {
        console.log("extractGroupData");
        console.log("  this.name: " + this.name);
        console.dir(jsonStock);
        if (jsonStock.results) {
            var stockCount = jsonStock.results.length;
            console.log("  stockCount: " + stockCount);

            var tempDataArray = [];
            // == store extracted data in StockData instance
            for (var i = 0; i < jsonStock.results.length; i++) {
                nextResult = jsonStock.results[i];
                console.log("  nextResult.name: " + nextResult.name);
                tempDataArray = [nextResult.symbol, nextResult.name, nextResult.change, nextResult.low, nextResult.high, nextResult.lastPrice];
                this.stockObjectsArray.push(tempDataArray);
            }
        } else {
            console.log("  no results in this response");
            this.handleError(jsonStock);
        }
    }

    // ======= ======= ======= handleError ======= ======= =======
    StockData.prototype.handleError = function(jsonStock) {
        console.log("handleError");

        // == create string for message display
        var msgString = "code: " + jsonStock.status.code + "<br>message: " + jsonStock.status.message

        // == init message container div
        $(".contents").html("");
        this.$el = $("<div class='errorMessage'></div>");

        // == append and position login form elements
        this.$el.html(msgString);
        $(".contents").append(this.$el);
        $(".contents").css("margin-top", "100px");
    }

});
