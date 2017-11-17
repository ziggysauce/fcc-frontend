/*
// Triggers button to fetch new quote
$( document ).ready(function() {
    $("#newQuote").on("click", randomQuote);
});

// Function to use API for quotes
function randomQuote(){
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=getQuote&callback=?");
};

// Gets random quote
function getQuote(response){
  $("#quoteText, #quoteAuthor, #quotebox").fadeOut(400, function() {
    $("#quotebox").hide().fadeIn(400);
    $("#quoteText").html(response.quoteText).hide().fadeIn(400);
    if (response.quoteAuthor !== "") {
      $("#quoteAuthor").html("- " + response.quoteAuthor).hide().fadeIn(400);
    }
    else {
      $("#quoteAuthor").html ("- Unknown").hide().fadeIn(400);
    }
    $("#tweetThis").attr('href', 'https://twitter.com/intent/tweet?text=' + response.quoteText + ' ' + response.quoteAuthor)
  });
  $("body, button").animate({
    backgroundColor: colorChange
  });
};


// Change color everytime new quote is requested

var colorChange = colors[Math.floor(Math.random() * colors.length)];
$("body, button,").animate({
  backgroundColor: colorChange
});
$("i, quotebox, button:hover, footer div a i:hover").animate({
  color: colorChange
});
$("button:hover").animate({
  outline: colorChange
});
*/

// Color options
var colors = ["#FF8862", "#A9FFCC", "#A9ADFF", "#FFFCA9", "#A9EBFF", "#FFA9D0", "#6BC0FF"];

// Triggers button to fetch new quote
$( document ).ready(function() {
    $("#newQuote").on("click", randomQuote);
});

// Gets random quote using API
var randomQuote = function(colorChange, colors) {
  $("#quoteText, #quoteAuthor, #quotebox").fadeOut(400, function() {
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
      dataType: "jsonp",
      success: function(response) {
        $("#quotebox").hide().fadeIn(400);
        $("#quoteText").css("color", colorChange).html(response.quoteText).hide().fadeIn(400);
        if (response.quoteAuthor !== "") {
          $("#quoteAuthor").html("- " + response.quoteAuthor).hide().fadeIn(400);
        }
        else {
          $("#quoteAuthor").html ("- Unknown").hide().fadeIn(400);
        }
        $("#tweetThis").attr('href', 'https://twitter.com/intent/tweet?text=' + response.quoteText + ' ' + response.quoteAuthor)
      }
    });
  });
};

$("#newQuote").click(function() {
  var colorChange = colors[Math.floor(Math.random() * colors.length)];
  $("body button").animate({
    backgroundColor: colorChange
  }, 1000);
});
