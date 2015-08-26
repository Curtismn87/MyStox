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
        this.stockDataObject = null;
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

        var groupDataObject;

        self = this;
        $(this.menuArray[0]).on("click", function(){
            self.displayLoginForm();
        });
        $(this.menuArray[1]).on("click", function(){
            updateMenu(self.menuArray[1], self);
            groupDataObject = makeStockDataObject("portfolio");
            self.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        });
        $(this.menuArray[2]).on("click", function(){
            updateMenu(self.menuArray[2], self);
            groupDataObject = makeStockDataObject("watch");
            self.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        });
        $(this.menuArray[3]).on("click", function(){
            updateMenu(self.menuArray[3], self);
            groupDataObject = makeStockDataObject("sold");
            self.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        });
        $(this.menuArray[4]).on("click", function(){
            updateMenu(self.menuArray[4], self);
            groupDataObject = makeStockDataObject("index");
            self.stockDataObject = groupDataObject;
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
            this.stockDataObject = groupDataObject;
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

    // ======= ======= ======= displayGroupData ======= ======= =======
    Display.prototype.displayGroupData = function() {
        console.log("displayGroupData");
        var self = this;

        var container = $(".contents");
        container.empty();
        container.css("margin-top", 0);
        this.$el = $("<div class='stock'></div>");

        var displayObject = this.stockDataObject;
        console.log("  displayObject: " + displayObject)
        console.log("  displayObject.name: " + displayObject.name)
        console.log("  displayObject.stockObjectsArray[0]: " + displayObject.stockObjectsArray[0])
        console.log("  displayObject.stockObjectsArray.length: " + displayObject.stockObjectsArray.length)

        var stockCount = displayObject.stockObjectsArray.length;
        console.log("stockCount: " + stockCount);
        var htmlString = "<table><tr><th>Name</th><th>Symbol</th><th>Low</th><th>High</th><th>LastPrice</th><th>change</th></tr>";

        for (var i = 0; i < displayObject.stockObjectsArray.length; i++) {
            nextStockDataArray = displayObject.stockObjectsArray[i];
            nextSymbol = nextStockDataArray[0];
            nextName = nextStockDataArray[1];
            nextNetChange = nextStockDataArray[2];
            nextLow = nextStockDataArray[3];
            nextHigh = nextStockDataArray[4];
            nextLastPrice = nextStockDataArray[5];

            htmlString = htmlString + "<tr><td><h3>" +
            "<a href='#' id='stock" + i + "' value='" + nextSymbol + "' >" + nextName + "</h3></a></td>" +
            "<td>" + nextSymbol + "</td>" +
            "<td>" + nextLow + "</td>" +
            "<td>" + nextHigh + "</td>" +
            "<td>" + nextLastPrice + "</td>" +
            "<td>" + nextNetChange + "</td></tr>";
        }

        htmlString = htmlString + "</table>";
        this.$el.html(htmlString);

        $(".contents").append(this.$el);

        for (var i = 0; i < displayObject.stockObjectsArray.length; i++) {
            var $stockLink = $("#stock" + i);
            $stockLink.on("click", function(){
                var linkValue = $(this).attr('value');
                self.stockDataObject.displayStockGraph(linkValue);
            })
        }
    }

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
        //     symbolString = this.makeGroupString();           // array => string
        //     groupData = this.getAjaxGroupData(symbolString); // make ajax request
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
    StockData.prototype.getAjaxGroupData = function(symbolString) {
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
                tempDataArray = [nextResult.symbol, nextResult.name, nextResult.netChange, nextResult.low, nextResult.high, nextResult.lastPrice];
                this.stockObjectsArray.push(tempDataArray);
            }
            displayObject.displayGroupData();
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

    // ======= ======= ======= displayGroupData ======= ======= =======
    StockData.prototype.displayStockGraph = function(linkValue) {
        console.log("displayStockGraph");

        this.dataSource = "http://marketdata.websol.barchart.com/getHistory.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbol=" + linkValue +
        "&type=daily&startDate=20140822000000";
        this.getAjaxHistoryData();

    }

    // ======= ======= ======= getAjaxGroupData ======= ======= =======
    StockData.prototype.getAjaxHistoryData = function() {
        console.log("getAjaxHistoryData");
        console.log("  this.name: " + this.name);
        self = this;
        // if (this.ajaxRequest) {
        //     console.log("request aborted");
        //     this.ajaxRequest.abort();
        // }
        this.ajaxRequest = $.ajax({
            // url: this.dataSource,                       // markitondemand API
            // data: { symbol: symbolString },             // markitondemand API
            url: this.dataSource,     // barchart API
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            error: self.handleError,
            always: self.handleAlways,
            success: self.extractGraphData,
            context: self
        });
    }

    // ======= ======= ======= getAjaxGroupData ======= ======= =======
    StockData.prototype.extractGraphData = function(jsonData) {
        console.log("getAjaxHistoryData");
        console.dir(jsonData);

        var closeValuesArray = [];
        for (i = 0; i < jsonData.results.length; i++) {
            nextClose = jsonData.results[i].close;
            nextDate = jsonData.results[i].tradingDay;
            nextDataPoint = [nextDate, nextClose];
            closeValuesArray.push(nextDataPoint);
        }


    }
});
