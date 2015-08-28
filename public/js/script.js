// ======= ======= ======= PUBLIC script.js ======= ======= =======
$(document).ready(function(){
    console.log("document.ready");

    // == make new StockData instance
    function makeStockDataObject(whichGroup) {
        console.log("makeStockDataObject");
        var stockDataObject = new StockData(whichGroup);    // constructor
        stockDataObject.groupName = whichGroup;             // store group name on object
        stockDataObject.displayObject = displayObject;      // store displayObject in stockDataObject

        displayObject.stockDataObject = stockDataObject;    // store stockDataObject in displayObject
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
        console.log("this.currentUser: " + this.currentUser);

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

        if (this.currentUser) {
            this.stockDataObject.getUserGroupData();
        } else {
            $(".contents").html("");
            this.$el = $("<div class='message'>Please log in</div>");
            this.$el.css("margin-top", "100px");
            $(".contents").append(this.$el);
        }

    }

    // ======= ======= ======= loginForm ======= ======= =======
    Display.prototype.displayLoginForm = function() {
        console.log("displayLoginForm");

        var self = this;

        // == clear container elements; init form container div
        $("#visualisation").css("display", "none");
        $(".contents").html("");
        this.$el = $("<div class='loginForm'></div>");

        // == init login form elements
        var htmlString = $("<div><form action='authenticate' method='post'>");
        htmlString.append("<input id='username' type='text' name='username'> username<br>");
        htmlString.append("<input id='password' type='text' name='password'> password<br>");
        htmlString.append("<input type='button' id='loginBtn' value='enter'><br>");
        htmlString.append("</form></div>");

        // == append and position login form elements
        this.$el.html(htmlString);
        $(".contents").append(this.$el);
        $(".loginForm").css("margin-top", "100px");
        this.loginBtn = $("#loginBtn");
        var userName = $("#username").val();
        var password = $("#password").val();

        // == activate login button
        $(this.loginBtn).on("click", function(){
            console.log("loginBtn");
            displayObject.updateLoginMenuItem();
            displayObject.loginUser(userName, password);
            displayObject.selectCurrentView("login", displayObject.menuLinkArray[1], displayObject);
        })
    }

    // ======= ======= ======= loginUser ======= ======= =======
    Display.prototype.loginUser = function(userName, password) {
        console.log("loginUser");

        var self = this;

        var url = "http://localhost:3000/users/2";
        // var url = "http://localhost:3000/users/authenticate";
        $.ajax({
            url: url,
            type: "get",
            // type: "post",
            dataType: "json"
        }).done(function(jsonData){
            console.log("  ajax request success!");
            self.currentUser = 2;
            // this.currentUser = jsonData.id;
            var container = $(".userNameDiv");
            container.text(jsonData.name);

            // == create data object for user
            var stockDataObject = makeStockDataObject("portfolio");
            self.stockDataObject = stockDataObject;
            displayObject.displaySubMenu("portfolio");
            stockDataObject.getUserGroupData();

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
            stockData = displayObject.stockDataObject.getAjaxStockData(ticker);
        })
    }

    // ======= ======= ======= displayGroupData ======= ======= =======
    Display.prototype.displayGroupData = function(newStock) {
        console.log("displayGroupData");
        console.log("displayObject.stockDataObject: " + displayObject.stockDataObject);
        console.log("displayObject.stockDataObject.groupName: " + displayObject.stockDataObject.groupName);
        console.log("displayObject.stockDataObject.stockObjectsArray: " + displayObject.stockDataObject.stockObjectsArray);
        console.log("displayObject.stockDataObject.stockObjectsArray.length: " + displayObject.stockDataObject.stockObjectsArray.length);
        var stockCount = displayObject.stockDataObject.stockObjectsArray.length;

        var whichButton, whichGroup;
        var nextStockDataArray, nextSymbol, nextName, nextNetChange, nextLow, nextHigh, nextLastPrice, db_id;
        var self = this;
        var nextTickerArray = displayObject.stockDataObject.groupArray;
        var stockCount = displayObject.stockDataObject.stockObjectsArray.length;

        // == clear previous content
        var container = $(".contents");
        container.empty();
        container.css("margin-top", 0);
        this.$el = $("<div class='stock'></div>");

        // == build table html
        var htmlString = "<table class='column column-12'><tr><th>Name</th><th>Symbol</th><th>Low</th>" + "<th>High</th><th>LastPrice</th><th>change</th><th>action</th></tr>";

        // == process jsonData
        for (var i = 0; i < stockCount; i++) {
            nextStockDataArray = displayObject.stockDataObject.stockObjectsArray[i];
            nextSymbol = nextStockDataArray[0];
            nextName = nextStockDataArray[1];
            nextNetChange = nextStockDataArray[2];
            nextLow = nextStockDataArray[3];
            nextHigh = nextStockDataArray[4];
            nextLastPrice = nextStockDataArray[5];

            if (nextTickerArray.length > 0) {
                db_id = nextTickerArray[i][0];
            } else {
                db_id = 0;
            }

            // == enable new stock processing
            if (newStock) {
                whichAction = "<input class='stockAction' id='" + db_id + "' type='button' value='add'>" +
                    "<select class='stockAction' id='whichGroup'><option value='portfolio'>portfolio</option>" +
                    "<option value='watchlist'>watchlist</option>" +
                    "<option value='sold'>sold</option>" +
                    "<option value='index'>index</option></select>";

            // == enable delete
            } else {
                whichAction = "<input class='stockAction' id='" + db_id + "' type='button' value='delete'>";
            }
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
            "<td>" + whichAction + "</td></tr>";
        }

        htmlString = htmlString + "</table>";
        this.$el.html(htmlString);
        $(".contents").append(this.$el);

        // == activate stock action options
        for (var i = 0; i < stockCount; i++) {
            var $stockLink = $("#stock" + i);
            $stockLink.on("click", function(){
                var linkValue = $(this).attr('value');
                self.stockDataObject.displayStockGraph(linkValue);
            })

            var db_id = nextTickerArray[i][0];
            var $whichButton = $("#" + db_id);
            var $whichGroup = $("#whichGroup");

            if (newStock) {
                $whichButton.on("click", function(){
                    console.log("addStockBtn");
                    var element_id = $(this).attr('id');
                    self.stockDataObject.addToGroup($whichGroup.val());
                })
            } else {
                $whichButton.on("click", function(){
                    console.log("deleteStockBtn");
                    var element_id = $(this).attr('id');
                    self.stockDataObject.portfolioToSold(element_id);
                })
            }
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

    // ======= ======= ======= getUserGroupData ======= ======= =======
    StockData.prototype.getUserGroupData = function(ticker) {
        console.log('getUserGroupData');

        var self = this;
        var currentUser = displayObject.currentUser;

        // == get user's stocks from ownership join table
        // var url = "http://localhost:3000/users/" + currentUser + "/ownership/" + this.groupName;
        var url = "http://localhost:3000/users/2/ownership/";
        // var url = "http://localhost:3000/users/" + currentUser + "/ownership/";
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
            self.handleError;
        }).always(function(){
            console.log("  ajax request always");
            self.handleAlways;
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
            success: self.processStockData,
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
            success: self.processGroupData,
            context: self
        });
    }

    // ======= ======= ======= processStockData ======= ======= =======
    StockData.prototype.processStockData = function(jsonStock) {
        console.log("processStockData");

        console.dir(jsonStock);
        if (jsonStock.results) {
            nextResult = jsonStock.results[0];
            tempDataArray = [nextResult.symbol, nextResult.name, nextResult.netChange, nextResult.low, nextResult.high, nextResult.lastPrice];
            this.stockObjectsArray = [];
            this.stockObjectsArray.push(tempDataArray);
            displayObject.displayGroupData(nextResult.symbol);
        } else {
            console.log("  no results in this response");
            this.handleError(jsonStock);
        }
    }

    // ======= ======= ======= processGroupData ======= ======= =======
    StockData.prototype.processGroupData = function(jsonStock) {
        console.log("processGroupData");

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
            console.log("this.stockObjectsArray.length: " + this.stockObjectsArray.length);
            displayObject.displayGroupData();
        } else {
            console.log("  no results in this response");
            this.handleError(jsonStock);
        }
    }

    // ======= ======= ======= addToGroup ======= ======= =======
    StockData.prototype.addToGroup = function(whichGroup) {
        console.log('addToGroup');
        console.log('  whichGroup: ' + whichGroup);

        var currentUser = displayObject.currentUser;
        var url = "http://localhost:3000/users/" + currentUser + "/stocks/" + whichGroup;
        $.ajax({
            url: url,
            type: "post",
            dataType: "json"
        }).done(function(){
            console.log("  ajax request success!");
        }).fail(function(){
            console.log("  ajax request fails!");
        }).always(function(){
            console.log("  ajax request always");
        });

    }

    // ======= ======= ======= portfolioToSold ======= ======= =======
    StockData.prototype.portfolioToSold = function(stockId) {
        console.log('portfolioToSold');
        console.log('  stockId: ' + stockId);

        var currentUser = displayObject.currentUser;
        var url = "http://localhost:3000/users/" + currentUser + "/stocks/" + stockId;
        $.ajax({
            url: url,
            type: "delete",
            dataType: "json"
        }).done(function(){
            console.log("  ajax request success!");
        }).fail(function(){
            console.log("  ajax request fails!");
        }).always(function(){
            console.log("  ajax request always");
        });

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


    // ======= ======= ======= stock histories ======= ======= =======
    // ======= ======= ======= stock histories ======= ======= =======
    // ======= ======= ======= stock histories ======= ======= =======


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
        var tempDataCount = 60;                                 // for development
        var emptyObject = { "x":null, "y":null }
        // for (i = 0; i < jsonData.results.length; i++) {      // for prod
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


        // ======= ======= ======= history chart ======= ======= =======
        // ======= ======= ======= history chart ======= ======= =======
        // ======= ======= ======= history chart ======= ======= =======


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
