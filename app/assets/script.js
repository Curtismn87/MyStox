$(document).ready(function(){
  console.log("Document ready!");

  $("#main_nav li:eq(5)").on("click", function(){
    console.log("profile button clicked");
    var container = $(".contents");
    container.empty();
    container.append("<input type='text' id='inputName' name='Name' placeholder='Name'>");
    container.append("<input type='text' id='inputTicker' name='Ticker' placeholder='Ticker'>");
    container.append("<button type='submit' id='submitStock' value='submit'>Submit</button>");
  });

$(document).on("click", "#submitStock", function(){
  console.log("submit button!!");

});

  $("#main_nav li:eq(4)").on("click", function(){
    console.log("indexes button clicked");
    var container = $(".contents");
    container.empty();
  });

  $("#main_nav li:eq(4)").on("click", function(){
      var url = "http://localhost:3000/test#";
      $.ajax({
        url: url,
        type: "get",
        dataType: "json"
      }).done(function(){
        console.log("ajax request success!");
      }).fail(function(){
        console.log("ajax request fails!");
      }).always(function(){
        console.log("this always happens regardless of successful ajax request or not");
      });
    });




}); // ends document ready
