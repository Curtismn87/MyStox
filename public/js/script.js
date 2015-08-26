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

        var stockCount = displayObject.stockObjectsArray.length;
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
        console.log("extractGraphData");
        console.dir(jsonData);

        var closeValuesArray = [];
        // for (i = 0; i < jsonData.results.length; i++) {
        var emptyObject = { "x":null, "y":null }
        for (i = 0; i < 10; i++) {
            nextDate = jsonData.results[i].tradingDay;
            nextClose = jsonData.results[i].close;
            emptyObject.x = nextDate;
            emptyObject.y = nextClose;
            closeValuesArray.push(emptyObject);
        }

        console.dir(closeValuesArray[0]);
        console.log("closeValuesArray[0]: " + closeValuesArray[0]);

        $(".contents").html("");

        //The data for our line
        // var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
        //                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
        //                  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

        // var lineData = [ [1, 1], [3, 3], [5, 2],  [6, 4],  [7, 3],  [9, 9] ];

        var parseDate = d3.time.format("%Y-%c-%d").parse;

        //This is the accessor function we talked about above
        var lineFunction = d3.svg.line()
            // .x(function(d) { return d.x; })
            // .y(function(d) { return d.y; })
            .x(function(d) {
                x = parseDate(d.x);
                return x;
            })
            .y(function(d) { return d.y; })
            .interpolate("linear");

       //The SVG Container
       var svgContainer = d3.select(".contents").append("svg")
            .attr("width", 200)
            .attr("height", 200)
            .attr("fill", "red");

       //The line SVG Path we draw
       var lineGraph = svgContainer.append("path")
                                //    .attr("d", lineFunction(lineData))
                                   .attr("d", lineFunction(closeValuesArray))
                                   .attr("stroke", "blue")
                                   .attr("stroke-width", 2)
                                   .attr("fill", "none");


        // console.log("closeValuesArray.length: " + closeValuesArray.length);
        // console.log("closeValuesArray[0]: " + closeValuesArray[0]);
        // console.log("closeValuesArray[0][0]: " + closeValuesArray[0][0]);
        // console.log("closeValuesArray[0][1]: " + closeValuesArray[0][1]);

        // ======= ======= ======= d3 processing ======= ======= =======
        // ======= ======= ======= d3 processing ======= ======= =======
        // ======= ======= ======= d3 processing ======= ======= =======

        // var closeValuesArray = [["01/10/13", 99.61707], ["01/11/13", 99.61707], ["01/12/13", 99.61707], ["01/13/13", 99.61707], ["01/14/13", 99.61707]];
        //
        // // == positioning data for elements
        // var margin = {top: 30, right: 20, bottom: 30, left: 50},
        // width = 600 - margin.left - margin.right,
        // height = 270 - margin.top - margin.bottom;
        //
        // var parseDate = d3.time.format("%Y-%c-%d").parse;
        //
        // var x = d3.time.scale().range([0, width]);
        // var y = d3.scale.linear().range([height, 0]);
        //
        // // == create svg axes
        // var xAxis = d3.svg.axis().scale(x)
        //     .orient("bottom").ticks(5);
        //
        // var yAxis = d3.svg.axis().scale(y)
        //     .orient("left").ticks(5);
        //
        // // == path generator function for lines
        // var lineFunction = d3.svg.line()
        //     // == accessor functions which the path generator uses to produce path data
        //     .x(function(d) { return x(d.date); })
        //     .y(function(d) { return y(d.close); })
        //     .interpolate("linear");
        //
        // // == svg container
        // var svgContainer = d3.select(".contents")
        //     .append("svg")
        //     .attr("width", 500)
        //     .attr("height", 200);
        //
        // // == svg path
        // var lineGraph = svgContainer.append("path")
        //     .attr("d", lineFunction(closeValuesArray))
        //     .attr("stroke", "blue")
        //     .attr("stroke-width", 2)
        //     .attr("fill", "none");

        // var svg = d3.select(".contents")
        //     .append("svg")
        //         .attr("width", width + margin.left + margin.right)
        //         .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //
        //     console.dir(svg);

            // svg.data(closeValueArray).enter().data(function(d){
            //   console.log(d);
            // })

            // closeValuesArray.forEach(function(d) {
            //     console.log(closeValuesArray);
            //     d.date = parseDate(d.date);
            //     d.close = +d.close;
            //     console.log("d.date: " + d.date);
            //
            //     // Scale the range of the data
            //     x.domain(d3.extent(closeValuesArray, function(d) { return d.date; }));
            //     y.domain([0, d3.max(closeValuesArray, function(d) { return d.close; })]);
            //
            //     svg.append("path")      // Add the valueline path.
            //         .attr("d", valueline(closeValuesArray));
            //
            //     svg.append("g")         // Add the X Axis
            //         .attr("class", "x axis")
            //         .attr("transform", "translate(0," + height + ")")
            //         .call(xAxis);
            //
            //     svg.append("g")         // Add the Y Axis
            //         .attr("class", "y axis")
            //         .call(yAxis);
            //
            // });

        // var margin = {top: 80, right: 80, bottom: 80, left: 80},
        //     width = 960 - margin.left - margin.right,
        //     height = 500 - margin.top - margin.bottom;
        //
        // var parse = d3.time.format("%b %Y").parse;
        //
        // // Scales and axes. Note the inverted domain for the y-scale: bigger is up!
        // var x = d3.time.scale().range([0, width]),
        //     y = d3.scale.linear().range([height, 0]),
        //     xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true),
        //     yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");
        //
        // // An area generator, for the light fill.
        // var area = d3.svg.area()
        //     .interpolate("monotone")
        //     .x(function(d) { return x(d.date); })
        //     .y0(height)
        //     .y1(function(d) { return y(d.price); });
        //
        // // A line generator, for the dark stroke.
        // var line = d3.svg.line()
        //     .interpolate("monotone")
        //     .x(function(d) { return x(d.date); })
        //     .y(function(d) { return y(d.price); });
        //
        // d3.csv("readme.csv", type, function(error, data) {
        //
        //   // Filter to one symbol; the S&P 500.
        //   var values = data.filter(function(d) {
        //     return d.symbol == "S&P 500";
        //   });
        //
        //   // Compute the minimum and maximum date, and the maximum price.
        //   x.domain([values[0].date, values[values.length - 1].date]);
        //   y.domain([0, d3.max(values, function(d) { return d.price; })]).nice();
        //
        //   // Add an SVG element with the desired dimensions and margin.
        //   var svg = d3.select("body").append("svg")
        //       .attr("width", width + margin.left + margin.right)
        //       .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        //       .on("click", click);
        //
        //   // Add the clip path.
        //   svg.append("clipPath")
        //       .attr("id", "clip")
        //     .append("rect")
        //       .attr("width", width)
        //       .attr("height", height);
        //
        //   // Add the area path.
        //   svg.append("path")
        //       .attr("class", "area")
        //       .attr("clip-path", "url(#clip)")
        //       .attr("d", area(values));
        //
        //   // Add the x-axis.
        //   svg.append("g")
        //       .attr("class", "x axis")
        //       .attr("transform", "translate(0," + height + ")")
        //       .call(xAxis);
        //
        //   // Add the y-axis.
        //   svg.append("g")
        //       .attr("class", "y axis")
        //       .attr("transform", "translate(" + width + ",0)")
        //       .call(yAxis);
        //
        //   // Add the line path.
        //   svg.append("path")
        //       .attr("class", "line")
        //       .attr("clip-path", "url(#clip)")
        //       .attr("d", line(values));
        //
        //   // Add a small label for the symbol name.
        //   svg.append("text")
        //       .attr("x", width - 6)
        //       .attr("y", height - 6)
        //       .style("text-anchor", "end")
        //       .text(values[0].symbol);
        //
        //   // On click, update the x-axis.
        //   function click() {
        //     var n = values.length - 1,
        //         i = Math.floor(Math.random() * n / 2),
        //         j = i + Math.floor(Math.random() * n / 2) + 1;
        //     x.domain([values[i].date, values[j].date]);
        //     var t = svg.transition().duration(750);
        //     t.select(".x.axis").call(xAxis);
        //     t.select(".area").attr("d", area(values));
        //     t.select(".line").attr("d", line(values));
        //   }
        // });
        //
        // // Parse dates and numbers. We assume values are sorted by date.
        // function type(d) {
        //   d.date = parse(d.date);
        //   d.price = +d.price;
        //   return d;
        // }
    }
});
