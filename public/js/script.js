// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
    console.log("document.ready");

    // == make new StockData instance
    function makeStockDataObject(whichGroup) {
        console.log("makeStockDataObject");
        var stockDataObject = new StockData(whichGroup);    // constructor
        stockDataObject.groupName = whichGroup;             // store group name on object
        stockDataObject.displayObject = this;               // store display object
        return stockDataObject;
    }


    // ======= ======= ======= DisplayObject ======= ======= =======
    // ======= ======= ======= DisplayObject ======= ======= =======
    // ======= ======= ======= DisplayObject ======= ======= =======


    function Display(whichDisplay) {
        console.log('Display');
        this.name = whichDisplay;
        this.menuLinkArray = null;
        this.stockDataObject = null;
        this.currentUser = null;
    }
    var displayObject = new Display("display1");		// constructor

    // ======= ======= ======= initEventListeners ======= ======= =======
    Display.prototype.initMenuDivs = function() {
        console.log("initMenuDivs");

        var menuLinkArray = [];
        var menuLength = $(".menuLink").length;
        for (i = 0; i < menuLength; i++) {
            menuLinkArray.push($(".menuLink").eq(i));
        }
        this.menuLinkArray = menuLinkArray;
    }

    // ======= ======= ======= initEventListeners ======= ======= =======
    Display.prototype.initEventListeners = function() {
        console.log("initEventListeners");

        var self = this;

        // == login and profile functions
        $(this.menuLinkArray[0]).on("click", function(){
            displayObject.displayLoginForm();
        });
        $(this.menuLinkArray[5]).on("click", function(){
            displayObject.displayProfile();
        });

        // == stock group functions
        $(this.menuLinkArray[1]).on("click", function(){
            displayObject.selectCurrentView("portfolio", displayObject.menuLinkArray[1], displayObject);
        });
        $(this.menuLinkArray[2]).on("click", function(){
            displayObject.selectCurrentView("watch", displayObject.menuLinkArray[2], displayObject);
        });
        $(this.menuLinkArray[3]).on("click", function(){
            displayObject.selectCurrentView("sold", displayObject.menuLinkArray[3], displayObject);
        });
        $(this.menuLinkArray[4]).on("click", function(){
            displayObject.selectCurrentView("index", displayObject.menuLinkArray[4], displayObject);
        });
    }

    // ======= ======= ======= selectCurrentView ======= ======= =======
    Display.prototype.selectCurrentView = function(whichMenu, whichMenuItem, self) {
        console.log("selectCurrentView");

        // == clear prevous contents
        $(".contents").html("");
        $("#visualisation").css("display", "none");

        // == remove thisPage class from all menuLinks
        for (i = 0; i < self.menuLinkArray.length; i++) {
            nextMenuItem = self.menuLinkArray[i];
            nextMenuItem.removeClass("thisPage");
        }

        if (whichMenu == "login") {
            whichMenu = "portfolio";
        }
        whichMenuItem.addClass("thisPage");

        // == create data object for user
        var stockDataObject = makeStockDataObject(whichMenu);
        displayObject.stockDataObject = stockDataObject;
        displayObject.displaySubMenu("portfolio");
        stockDataObject.getUserGroupData();

    }

    // ======= ======= ======= loginForm ======= ======= =======
    Display.prototype.displayLoginForm = function() {
        console.log("displayLoginForm");

        var self = this;

        // == init form container div
        $(".contents").html("");
        this.$el = $("<div class='loginForm'></div>");

        // == init login form elements
        var htmlString = $("<div>");
        htmlString.append("<input id='username' type='text' name='username'> username<br>");
        htmlString.append("<input id='password' type='text' name='password'> password<br>");
        htmlString.append("<input type='button' id='loginBtn' value='enter'><br>");
        htmlString.append("</div>");

        // == append and position login form elements
        this.$el.html(htmlString);
        $(".contents").append(this.$el);
        $(".loginForm").css("margin-top", "100px");
        this.loginBtn = $("#loginBtn");

        // == activate login button
        $(this.loginBtn).on("click", function(){
            console.log("loginBtn");
            displayObject.updateLoginMenuItem();
            displayObject.loginUser();
            displayObject.selectCurrentView("login", displayObject.menuLinkArray[1], displayObject);
        })
    }

    // ======= ======= ======= loginUser ======= ======= =======
    Display.prototype.loginUser = function() {
        console.log("loginUser");

        userName = $("#username").val();

        var url = "http://localhost:3000/users/2";
        $.ajax({
            url: url,
            type: "get",
            dataType: "json"
        }).done(function(jsonData){
            console.log("  ajax request success!");
            this.currentUser = 2;
            var container = $(".userNameDiv");
            container.text(jsonData.name);
        }).fail(function(){
            console.log("  ajax request fails!");
        }).always(function(){
            console.log("  ajax request always");
        });

    }

    // ======= ======= ======= updateLoginMenuItem ======= ======= =======
    Display.prototype.updateLoginMenuItem = function() {
        console.log("updateLoginMenuItem");

        this.menuLinkArray[0].html("<a href='#'>logout</a>");
    }

    // ======= ======= ======= displaySubMenu ======= ======= =======
    Display.prototype.displaySubMenu = function(whichGroup) {
        console.log("displaySubMenu");

        // == init form container div
        $("#sub_nav").html("");
        this.$el = $("#sub_nav");

        // == init login form elements
        var htmlString = ("");
        htmlString = htmlString + "<p class='sub_nav_el'>add stock</p>";
        htmlString = htmlString + "<p><input class='sub_nav_el' id='tickerInput' type='text' name='ticker' size=6 > ticker <br>";
        htmlString = htmlString + "<input class='sub_nav_el' id='stockSearchBtn' type='button' value='enter'></p>";

        // == append and position login form elements
        this.$el.html(htmlString);
        $("#sub_nav").append(this.$el);
        $("#sub_nav").css("background-color", "orange");
        this.stockSearch = $("#stockSearchBtn");

        // == activate search button
        $(this.stockSearch).on("click", function(){
            console.log("stockSearchBtn");
            var ticker = $("#tickerInput").val();
            stockData = stockDataObject.getAjaxStockData(ticker);
        })
    }

    // ======= ======= ======= displayGroupData ======= ======= =======
    Display.prototype.displayGroupData = function() {
        console.log("displayGroupData");

        var self = this;

        var container = $(".contents");
        container.empty();
        container.css("margin-top", 0);
        this.$el = $("<div class='stock'></div>");

        var displayObject = this.stockDataObject;
        var nextTickerArray = this.stockDataObject.groupArray;

        var stockCount = displayObject.stockObjectsArray.length;
        var htmlString = "<table class='column column-12'><tr><th>Name</th><th>Symbol</th><th>Low</th>" + "<th>High</th><th>LastPrice</th><th>change</th><th>delete</th></tr>";

        for (var i = 0; i < displayObject.stockObjectsArray.length; i++) {
            nextStockDataArray = displayObject.stockObjectsArray[i];
            nextSymbol = nextStockDataArray[0];
            nextName = nextStockDataArray[1];
            nextNetChange = nextStockDataArray[2];
            nextLow = nextStockDataArray[3];
            nextHigh = nextStockDataArray[4];
            nextLastPrice = nextStockDataArray[5];

            var db_id = nextTickerArray[i][0];

            deleteBtn = "<input class='deleteStock' id='" + db_id + "' type='button' value='delete'>";
            htmlString = htmlString + "<tr><td><h3>";

            // == limit size of display name
            if (nextName.length > 12) {
                var end = nextName.indexOf(" ");
                var shortName = nextName.substring(0, end);
                htmlString = htmlString + "<a class='tightName' href='#' id='stock" + i + "' value='" + nextSymbol + "' >" + shortName +
                "</h3></a><br>" + "<p class='shortName'>" + nextName + "</p></td>";
            } else {
                htmlString = htmlString + "<a href='#' id='stock" + i + "' value='" + nextSymbol + "' >" + nextName + "</h3></a></td>";
            }
            htmlString = htmlString + "<td>" + nextSymbol + "</td>" +
            "<td>" + nextLow + "</td>" +
            "<td>" + nextHigh + "</td>" +
            "<td>" + nextLastPrice + "</td>" +
            "<td>" + nextNetChange + "</td>" +
            "<td>" + deleteBtn + "</td></tr>";
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

            // == activate delete button
            var db_id = nextTickerArray[i][0];
            var $deleteStockBtn = $("#" + db_id);
            $deleteStockBtn.on("click", function(){
                console.log("deleteStockBtn");
                var element_id = $(this).attr('id');
                self.stockDataObject.portfolioToSold(element_id);
            })
        }
    }

    // ======= ======= ======= initialize interface ======= ======= =======

    displayObject.initMenuDivs();
    displayObject.initEventListeners();



    // ======= ======= ======= StockObject ======= ======= =======
    // ======= ======= ======= StockObject ======= ======= =======
    // ======= ======= ======= StockObject ======= ======= =======



    function StockData(whichGroup, groupArray, displayObject) {
        console.log('StockData');
        this.groupName = whichGroup;        // portfolio, watchlist, sold, indexes
        this.groupArray = groupArray;       // stocks in group (returned from database)
        this.stockObjectsArray = [];        // stocks in group (returned from database)
        this.displayObject = displayObject; // store display object for display access
        this.jsonCallback = "???";          // callback function required for jsonp data ???
        this.dataSource = "//marketdata.websol.barchart.com/getQuote.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbols=";
        // this.dataSource = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
        // this.dataSource = "http://dev.markitondemand.com/Api/v2/Quote";
    }

    // ======= ======= ======= portfolioToSold ======= ======= =======
    StockData.prototype.portfolioToSold = function(stockId) {
        console.log('portfolioToSold');
        console.log('  stockId: ' + stockId);

        var url = "http://localhost:3000/users/2/stocks/" + stockId;
        $.ajax({
            url: url,
            type: "delete",
            dataType: "json"
        }).done(function(){
            console.log("ajax request success!");
        }).fail(function(){
            console.log("ajax request fails!");
        }).always(function(){
            console.log("this always happens regardless of successful ajax request or not");
        });

    }

    // ======= ======= ======= getUserGroupData ======= ======= =======
    StockData.prototype.getUserGroupData = function(ticker) {
        console.log('getUserGroupData');

        var self = this;
        // whichMethod, whichUrl, whichParams

        // == get user's stocks from ownership join table
        // var url = "http://localhost:3000/users/2/ownership/" + this.groupName;
        var url = "http://localhost:3000/users/2/ownership/";
        $.ajax({
            url: url,
            type: "get",
            dataType: "json"
        }).done(function(jsonData){
            console.log("  ajax request success!");
            console.dir(jsonData)
            extractDatabaseTickers(jsonData);
        }).fail(function(){
            console.log("  ajax request fails!");
        }).always(function(){
            console.log("  ajax request always");
        });

        tickerArray = [];
        function extractDatabaseTickers(jsonData) {
            console.log("extractDatabaseTickers");
            for (var i = 0; i < jsonData.length; i++) {
                nextId = jsonData[i].id;
                nextTicker = jsonData[i].ticker;
                nextTickerArray = [nextId, nextTicker];
                tickerArray.push(nextTickerArray);
            }

            // == temp stock list for development
            // tickerArray = ["AAPL", "GOOGL", "HD"];
            // tickerArray = ["APPL"];
            self.groupArray = tickerArray;
            symbolString = self.makeGroupString();
            groupData = self.getAjaxGroupData(symbolString);
        }
    }

    // ======= ======= ======= makeGroupString ======= ======= =======
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

    // ======= ======= ======= getAjaxStockData ======= ======= =======
    StockData.prototype.getAjaxStockData = function(ticker) {
        console.log("getAjaxStockData");

        self = this;
        // if (this.ajaxRequest) {
        //     console.log("request aborted");
        //     this.ajaxRequest.abort();
        // }
        this.ajaxRequest = $.ajax({
            // url: this.dataSource,                       // markitondemand API
            // data: { symbol: symbolString },             // markitondemand API
            url: this.dataSource + ticker,                 // barchart API
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            error: self.handleError,
            always: self.handleAlways,
            success: self.displayStockData,
            context: self
        });
    }

    // ======= ======= ======= getAjaxGroupData ======= ======= =======
    StockData.prototype.getAjaxGroupData = function(symbolString) {
        console.log("getAjaxGroupData");

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

    // ======= ======= ======= displayStockData ======= ======= =======
    StockData.prototype.displayStockData = function(jsonStock) {
        console.log("displayStockData");

        console.dir(jsonStock);
        if (jsonStock.results) {
            nextResult = jsonStock.results[0];
            tempDataArray = [nextResult.symbol, nextResult.name, nextResult.netChange, nextResult.low, nextResult.high, nextResult.lastPrice];
            this.stockObjectsArray = [];
            this.stockObjectsArray.push(tempDataArray);
            displayObject.displayGroupData();
        } else {
            console.log("  no results in this response");
            this.handleError(jsonStock);
        }
    }

    // ======= ======= ======= extractGroupData ======= ======= =======
    StockData.prototype.extractGroupData = function(jsonStock) {
        console.log("extractGroupData");

        console.dir(jsonStock);
        if (jsonStock.results) {
            var stockCount = jsonStock.results.length;

            var tempDataArray = [];
            // == store extracted data in StockData instance
            for (var i = 0; i < jsonStock.results.length; i++) {
                nextResult = jsonStock.results[i];
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

    // ======= ======= ======= displayStockGraph ======= ======= =======
    StockData.prototype.displayStockGraph = function(ticker) {
        console.log("displayStockGraph");

        this.dataSource = "//marketdata.websol.barchart.com/getHistory.jsonp?key=5c566d2e239b7f0d6f2c73f38a767326&symbol=" + ticker +
        "&type=daily&startDate=20140822000000";
        this.getAjaxHistoryData(ticker);

    }

    // ======= ======= ======= getAjaxHistoryData ======= ======= =======
    StockData.prototype.getAjaxHistoryData = function(ticker) {
        console.log("getAjaxHistoryData");

        self = this;
        // if (this.ajaxRequest) {
        //     console.log("request aborted");
        //     this.ajaxRequest.abort();
        // }
        this.ajaxRequest = $.ajax({
            url: this.dataSource,     // barchart API
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            error: self.handleError,
            always: self.handleAlways,
            success: self.extractGraphData,
            context: self
        });

        this.getAjaxStockData(ticker);
    }

    // ======= ======= ======= extractGraphData ======= ======= =======
    StockData.prototype.extractGraphData = function(jsonData) {
        console.log("extractGraphData");
        console.dir(jsonData);

        var maxClose = 0;
        var closeValuesArray = [];
        var tempDataCount = 60;
        var emptyObject = { "x":null, "y":null }
        // for (i = 0; i < jsonData.results.length; i++) {
        for (i = 0; i < tempDataCount; i++) {
            nextDate = Date.parse(jsonData.results[i].tradingDay);
            nextClose = jsonData.results[i].close;
            if (nextClose > maxClose) {
                maxClose = nextClose;
            }
            emptyObject.x = nextDate;
            emptyObject.y = nextClose;
            closeValuesArray.push(emptyObject);
            emptyObject = { "x":null, "y":null }
        }

        // == get min close value
        var minClose = maxClose;
        // for (i = 0; i < jsonData.results.length; i++) {
        for (i = 0; i < tempDataCount; i++) {
            nextClose = jsonData.results[i].close;
            if (nextClose < minClose) {
                minClose = nextClose;
            }
        }

        dateMin = parseInt(closeValuesArray[0].x);
        dateMax = parseInt(closeValuesArray[9].x);

        $(".contents").html("");
        $("#visualisation").css("display", "block");


        // ======= ======= ======= TempGraph ======= ======= =======
        // ======= ======= ======= TempGraph ======= ======= =======
        // ======= ======= ======= TempGraph ======= ======= =======


        InitChart();

        // ======= ======= ======= InitChart ======= ======= =======
        function InitChart() {
            console.log("InitChart");

            // == clear prevous contents
            // $(".contents").html("");
            $("#visualisation").empty();

            // == select svg object; set xywh/margins
            var vis = d3.select("#visualisation"),
                WIDTH = 720,
                HEIGHT = 405,
                MARGINS = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 50
                },

                // == Range: graph_wh inside container, Domain: data max/min values
                xScale = d3.scale.linear().range([50, WIDTH - 20]).domain([dateMin, dateMax]),
                yScale = d3.scale.linear().range([HEIGHT - 20, 20]).domain([minClose, maxClose]),
                // xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([dateMin, dateMax]),
                // yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([minClose, maxClose]),

                // == create axes (d3.svg.axis method via api link)
                xAxis = d3.svg.axis()
                    .scale(xScale),
                yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");

            // == append axes to container; add styles
            vis.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                .call(xAxis);
            vis.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                .call(yAxis);

            // == adjust yAxis orientation
            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

            // == add line object; apply scales
            var lineGen = d3.svg.line()
                .x(function(d) {
                    // return xScale(d.year);
                    return xScale(d.x);
                })
                .y(function(d) {
                    // return yScale(d.sale);
                    return yScale(d.y);
                });
                // .interpolate("linear");

            // == append line path to svg; set params
            vis.append('svg:path')
                // .attr('d', lineGen(data))
                .attr('d', lineGen(closeValuesArray))
                .attr('stroke', 'green')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            // vis.append('svg:path')
            //     .attr('d', lineGen(data2))
            //     .attr('stroke', 'blue')
            //     .attr('stroke-width', 2)
            //     .attr('fill', 'none');

            // $visualisation.append(vis);
        }
    }
})


// ======= ======= ======= ARCHIVE ======= ======= =======

// == datasource
// var data = [{
//     "sale": "202",
//     "year": "2000"
// }, {
//     "sale": "215",
//     "year": "2002"
// }, {
//     "sale": "179",
//     "year": "2004"
// }, {
//     "sale": "199",
//     "year": "2006"
// }, {
//     "sale": "134",
//     "year": "2008"
// }, {
//     "sale": "176",
//     "year": "2010"
// }];
//
// var data2 = [{
//     "sale": "152",
//     "year": "2000"
// }, {
//     "sale": "189",
//     "year": "2002"
// }, {
//     "sale": "179",
//     "year": "2004"
// }, {
//     "sale": "199",
//     "year": "2006"
// }, {
//     "sale": "134",
//     "year": "2008"
// }, {
//     "sale": "176",
//     "year": "2010"
// }];
