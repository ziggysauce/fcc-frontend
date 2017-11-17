// Triggers button to fetch new quote
$( document ).ready(function() {
    $("#newQuote").on("click", randomQuote);
});

// Gets random quote using API
var randomQuote = function() {
  $("#quoteText, #quoteAuthor, #quotebox").fadeOut(400, function() {
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
      dataType: "jsonp",
      success: function(response) {
        $("#quotebox").hide().fadeIn(400);
        $("#quoteText").html(response.quoteText).hide().fadeIn(400);
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
