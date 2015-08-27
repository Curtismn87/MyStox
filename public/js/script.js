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
        this.menuLinkArray = null;
        this.stockDataObject = null;
    }
    var displayObject = new Display("display1");		// constructor

    // ======= ======= ======= initEventListeners ======= ======= =======
    Display.prototype.initMenuDivs = function() {
        console.log("initMenuDivs");
        console.log('  this.name: ' + this.name);

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
        console.log('  this.name: ' + this.name);
        console.log('  this.menuLinkArray: ' + this.menuLinkArray);

        var groupDataObject;

        self = this;
        $(this.menuLinkArray[0]).on("click", function(){
            console.log("login");
            displayObject.displayLoginForm();
        });
        $(this.menuLinkArray[1]).on("click", function(){
            console.log("portfolio");
            updateMenu(displayObject.menuLinkArray[1], displayObject);
            groupDataObject = makeStockDataObject("portfolio");
            displayObject.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        });
        $(this.menuLinkArray[2]).on("click", function(){
            console.log("watch");
            updateMenu(displayObject.menuLinkArray[2], displayObject);
            groupDataObject = makeStockDataObject("watch");
            displayObject.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        });
        $(this.menuLinkArray[3]).on("click", function(){
            updateMenu(displayObject.menuLinkArray[3], displayObject);
            groupDataObject = makeStockDataObject("sold");
            displayObject.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        });
        $(this.menuLinkArray[4]).on("click", function(){
            updateMenu(displayObject.menuLinkArray[4], displayObject);
            groupDataObject = makeStockDataObject("index");
            displayObject.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        });
        $(this.menuLinkArray[5]).on("click", function(){
            displayObject.displayProfile();
        });


        function updateMenu(whichMenuItem, self) {
            console.log("updateMenu");
            console.log('  self.name: ' + self.name);
            for (i = 0; i < self.menuLinkArray.length; i++) {
                nextMenuItem = self.menuLinkArray[i];
                console.log("  nextMenuItem: " + nextMenuItem.attr('class'));
                nextMenuItem.removeClass("thisPage");
            }
            whichMenuItem.addClass("thisPage");
            for (i = 0; i < self.menuLinkArray.length; i++) {
                nextMenuItem = self.menuLinkArray[i];
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
            displayObject.updateLoginMenuItem();
            groupDataObject = makeStockDataObject("portfolio");
            displayObject.stockDataObject = groupDataObject;
            groupDataObject.getGroupData();
        })
    }

    // ======= ======= ======= loginForm ======= ======= =======
    Display.prototype.updateLoginMenuItem = function() {
        console.log("updateLoginMenuItem");
        // this.menuLinkArray[0].text("logout");
        this.menuLinkArray[0].html("<a href='#'>logout</a>");
    }

    // ======= ======= ======= initialize interface ======= ======= =======
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



    // function sendAjax(whichButton, whichMethod, whichUrl, whichParams) {
    //   console.log("sendAjax");
    //   var params;
    //   if (whichParams == 0) {
    //     params = {title: $(whichButton).siblings("[name=title]").val()}
    //   } else {
    //     params = whichParams;
    //   }
    //   if (!params) {params = {}};
    //   var id = 0;
    //   $.ajax({
    //     method: whichMethod,
    //     contentType: "application/json",
    //     url: whichUrl,
    //     data: JSON.stringify(params)
    //   }).always(function(){
    //     location.reload();
    //   });
    // };

    // ======= ======= ======= getGroupData ======= ======= =======
    StockData.prototype.getGroupData = function() {
        console.log('getGroupData');
        console.log('  this.name: ' + this.name);
        // whichMethod, whichUrl, whichParams

        // == create url for local server API
        if (this.name = "portfolio") {
            urlString = "/users/:id/stocks";
        } else if (this.name = "watch") {
            urlString = "/users/:id/watch/";
        } else if (this.name = "sold") {
            urlString = "/users/:id/sold/";
        } else if (this.name = "index") {
            urlString = "/users/:id/index/";
        }

        // == extract stock list from database
        $.ajax({
            url: urlString,
            method: "get"
        }).then(function(response) {
            this.groupArray = response;                     // from database
            symbolString = this.makeGroupString();           // array => string
            groupData = this.getAjaxGroupData(symbolString); // make ajax request
        }).fail(function() {
            console.log("database query failed");
        });

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

        InitChart();



        // ======= ======= ======= StockObject ======= ======= =======
        // ======= ======= ======= StockObject ======= ======= =======
        // ======= ======= ======= StockObject ======= ======= =======



        function InitChart() {
            console.log("InitChart");

            // == datasource
            var data = [{
                "sale": "202",
                "year": "2000"
            }, {
                "sale": "215",
                "year": "2002"
            }, {
                "sale": "179",
                "year": "2004"
            }, {
                "sale": "199",
                "year": "2006"
            }, {
                "sale": "134",
                "year": "2008"
            }, {
                "sale": "176",
                "year": "2010"
            }];

            var data2 = [{
                "sale": "152",
                "year": "2000"
            }, {
                "sale": "189",
                "year": "2002"
            }, {
                "sale": "179",
                "year": "2004"
            }, {
                "sale": "199",
                "year": "2006"
            }, {
                "sale": "134",
                "year": "2008"
            }, {
                "sale": "176",
                "year": "2010"
            }];

            check = $(".visualisation").attr("class");
            console.log("check: " + check);

            // == select svg object; set xywh/margins
            var vis = d3.select(".visualisation"),
                WIDTH = 1000,
                HEIGHT = 500,
                MARGINS = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 50
                },

                // == Range: graph_wh inside container, Domain: data max/min values
                xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]),
                yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]),

                // == create axes (d3.svg.axis method via api link)
                xAxis = d3.svg.axis()
                    .scale(xScale),
                yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");    // /////// /////// ///////

            console.log("vis: " + vis);

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
                    return xScale(d.year);
                })
                .y(function(d) {
                    return yScale(d.sale);
                })
                .interpolate("basis");

            // == append line path to svg; set params
            vis.append('svg:path')
                .attr('d', lineGen(data))
                .attr('stroke', 'green')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            vis.append('svg:path')
                .attr('d', lineGen(data2))
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
        }
    }
})


        // ======= ======= ======= big graph axes ======= ======= =======

        // basic SVG setup
    	// var margin = { top: 20, right: 100, bottom: 40, left: 100 };
    	// var height = 300 - margin.top - margin.bottom;
    	// var width = 700 - margin.left - margin.right;
        //
        // var svg = d3.select(".contents").append("svg")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //
        // // setup scales - the domain is specified inside of the function called when we load the data
    	// var xScale = d3.time.scale().range([0, width]);
    	// var yScale = d3.scale.linear().range([height, 0]);
    	// var color = d3.scale.category10();
        //
        // // setup the axes
        // var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
        // var yAxis = d3.svg.axis().scale(yScale).orient("left");
        //
        // // create function to parse dates into date objects
    	// var parseDate = d3.time.format("%Y-%m-%d").parse;
    	// var formatDate = d3.time.format("%Y-%m-%d");
    	// // var bisectDate = d3.bisector(function(d) { return d.date; }).left;
        //
        // // ======= ======= ======= blue line stuff ======= ======= =======
        // var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
        //                  { "x": 40,  "y": 10}, { "x": 300,  "y": 40},
        //                  { "x": 300,  "y": 5},  { "x": 400, "y": 60}];
        //
        // var lineFunction = d3.svg.line()
        //     .x(function(d) { return d.x; })
        //     .y(function(d) { return d.y; })
        //     .interpolate("linear");
        //
        // var lineGraph = svg.append("path")
        //     .attr("d", lineFunction(lineData))
        //     .attr("stroke", "blue")
        //     .attr("stroke-width", 2)
        //     .attr("fill", "none");
        //
        //     // import data and create chart
        // 	d3.csv("stock_data.csv",
        //
        //         function(d) {
        // 			return {
        // 				date: parseDate(d.date),
        // 				Amazon: +d.Amazon,
        // 				Apple: +d.Apple,
        // 				Facebook: +d.Facebook,
        // 				Google: +d.Google,
        // 				IBM: +d.IBM,
        // 				Microsoft: +d.Microsoft
        // 			};
        // 		},
        //
        // 		function(error, data) {
        //
        // 			// add the x axis
        // 			svg.append("g")
        // 				.attr("class", "x axis")
        // 				.attr("transform", "translate(0," + height + ")")
        // 				.call(xAxis);
        //
        // 			// add the y axis
        // 			svg.append("g")
        // 				.attr("class", "y axis")
        // 				.call(yAxis)
        // 				.append("text")
        // 				.attr("transform","rotate(-90)")
        // 				.attr("y",-60)
        // 				.attr("dy",".71em")
        // 				.style("text-anchor","end")
        // 				.text("Price ($)");
        //
        //             var stock = svg.selectAll(".stockXYZ")
        // 				// .data(stocks)
        //                 .data(closeValuesArray)
        // 				.enter().append("g")
        // 				.attr("class","stockXYZ");
        //
        // 			// add the stock price paths
        // 			stock.append("path")
        // 				.attr("class","line")
        // 				.attr("id",function(d,i){ return "id" + i; })
        // 				.attr("d", function(d) {
        // 					return line(d.values);
        // 				})
        // 				.style("stroke", function(d) { return color(d.name); });


                // ======= ======= ======= little blue line ======= ======= =======
                // ======= ======= ======= little blue line ======= ======= =======
                // ======= ======= ======= little blue line ======= ======= =======
                // ======= ======= ======= little blue line ======= ======= =======
                // ======= ======= ======= little blue line ======= ======= =======
                // ======= ======= ======= little blue line ======= ======= =======
                // ======= ======= ======= little blue line ======= ======= =======
                // ======= ======= ======= little blue line ======= ======= =======

                // The data for our line

            //     var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
            //                      { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
            //                      { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
               //
            //     //This is the accessor function we talked about above
            //     var lineFunction = d3.svg.line()
            //         .x(function(d) { return d.x; })
            //         .y(function(d) { return d.y; })
            //         .interpolate("linear");
               //
            //    //The SVG Container
            //    var svgContainer = d3.select(".contents").append("svg")
            //         .attr("width", 200)
            //         .attr("height", 200)
            //         .attr("fill", "red");
               //
            //    //The line SVG Path we draw
            //    var lineGraph = svgContainer.append("path")
            //        .attr("d", lineFunction(lineData))
            //        .attr("stroke", "blue")
            //        .attr("stroke-width", 2)
            //        .attr("fill", "none");




                        // sort data ascending - needed to get correct bisector results
            			// data.sort(function(a,b) {
            			// 	return a.date - b.date;
            			// });

            			// color domain
            			// color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

            			// create stocks array with object for each company containing all data
            			// var stocks = color.domain().map(function(name) {
            			// 	return {
            			// 		name: name,
            			// 		values: data.map(function(d){
            			// 			return {date: d.date, close: d[name]};
            			// 		})
            			// 	};
            			// });

            			// add domain ranges to the x and y scales
            			// xScale.domain([
            			// 	d3.min(stocks, function(c) { return d3.min(c.values, function(v) { return v.date; }); }),
            			// 	d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.date; }); })
            			// ]);
            			// yScale.domain([
            			// 	0,
            			// 	d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
            			// ]);

        			// add circle at intersection
        			// focus.append("circle")
        			// 	.attr("class","y")
        			// 	.attr("fill","none")
        			// 	.attr("stroke","black")
        			// 	.style("opacity",0.5)
        			// 	.attr("r",8);

        			// // add horizontal line at intersection
        			// focus.append("line")
        			// 	.attr("class","x")
        			// 	.attr("stroke","black")
        			// 	.attr("stroke-dasharray","3,3")
        			// 	.style("opacity",0.5)
        			// 	.attr("x1", 0)
        			// 	.attr("x2", width);

        			// add vertical line at intersection
        			// focus.append("line")
        			// 	.attr("class","y")
        			// 	.attr("stroke","black")
        			// 	.attr("stroke-dasharray","3,3")
        			// 	.style("opacity",0.5)
        			// 	.attr("y1", 0)
        			// 	.attr("y2", height);

        			// append rectangle for capturing if mouse moves within area
        			// svg.append("rect")
        			// 	.attr("width",width)
        			// 	.attr("height",height)
        			// 	.style("fill","none")
        			// 	.style("pointer-events","all")
        			// 	.on("mouseover", function() { focus.style("display", null); })
        			// 	.on("mouseout", function() { focus.style("display", "none"); })
        			// 	.on("mousemove", mousemove);

        			// add the line groups


        			// add the stock labels at the right edge of chart
        			// var maxLen = data.length;
        			// stock.append("text")
        			// 	.datum(function(d) {
        			// 		return {name: d.name, value: d.values[maxLen - 1]};
        			// 	})
        			// 	.attr("transform", function(d) {
        			// 		return "translate(" + xScale(d.value.date) + "," + yScale(d.value.close) + ")";
        			// 	})
        			// 	.attr("id",function(d,i){ return "text_id" + i; })
        		    // .attr("x", 3)
        		    // .attr("dy", ".35em")
        		    // .text(function(d) { return d.name; })
        		    // .on("mouseover",function(d,i) {
        		    // 	for (j=0; j < 6; j++) {
        			// 			if (i !== j) {
        			// 				d3.select("#id"+j).style("opacity",0.1);
        			// 				d3.select("#text_id"+j).style("opacity",0.2);
        			// 			}
        			// 		};
        		    // })
        		    // .on("mouseout", function(d,i) {
        		    // 	for (j=0; j < 6; j++) {
        			// 			d3.select("#id"+j).style("opacity",1);
        			// 			d3.select("#text_id"+j).style("opacity",1);
        			// 		};
        		    // });

        			// mousemove function
        			// function mousemove() {
                    //
        			// 	var x0 = xScale.invert(d3.mouse(this)[0]);
        			// 	var i = bisectDate(data, x0, 1); // gives index of element which has date higher than x0
        			// 	var d0 = data[i - 1], d1 = data[i];
        			// 	var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        			// 	var close = d3.max([+d.Amazon,+d.Apple,+d.Facebook,+d.Google,+d.IBM,+d.Microsoft]);
                    //
        			// 	focus.select("circle.y")
        			// 	.attr("transform", "translate(" + xScale(d.date) + "," + yScale(close) + ")");
                    //
        			// 	focus.select("line.y")
        			// 		.attr("y2",height - yScale(close))
        			// 		.attr("transform", "translate(" + xScale(d.date) + ","
        			// 			+ yScale(close) + ")");
                    //
        			// 	focus.select("line.x")
        			// 	.attr("x2",xScale(d.date))
        			// 	.attr("transform", "translate(0,"
        			// 		+ (yScale(close)) + ")");
                    //
        			// };








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
