/* JavaScript file for Wikipedia Viewer */

var input; var searchResults = []; var searchInfo = []; var searchLinks = [];
var contentclone = $(".content").clone();

$(document).ready(function() {
  results();
});

function results(callback) {
  //$(".content").hide();
  $("#hitSearch").click(function() {
    // Clear results each time search is made
    searchResults = []; searchInfo = []; searchLinks = [];
    $(".contentinfo").remove();
    input = $("#searchInput").val();
    // Get search data based on input
    if (input) {
      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data) {
        for (var i=0; i<data[1].length; i++){
          searchResults.push(data[1][i]);
          searchInfo.push(data[2][i]);
          searchLinks.push(data[3][i]);
        }
        animations();
      });
    }
    // If nothing is entered, alert user
    else {
      alert("Please enter something into the search field");
      return false;
    }
  });
  // Store input from search bar when 'enter' pressed
  $("#searchInput").keypress(function(e) {
    if (e.which == 13) {
      $("#hitSearch").click();
      return false;
    }
  });
};

function showResults() {
  if (searchResults.length > 0) {
    for (var i=0; i<searchResults.length; i++) {
      $(".content").append("<div class='contentinfo'><h1 class='highlight'>" + searchResults[i] + "</h1><p>" + searchInfo[i] + "</p><a class='highlightlink' href='" + searchLinks[i] + "' target='_blank'>Read More<a/></div>");
    }
    $(".content").fadeOut(1).fadeIn(1500);
    console.log(input, searchResults, searchInfo, searchLinks);
  }
  else {
    // Suggest alternative search options
    $(".content").append("<div class='contentinfo'><p>Sorry, there were no results matching your search.</p><p>The page <span class='highlight'><strong>\"" + $("#searchInput").val() + "\"</strong></span> does not exist.</p><ul><li>Check that all keywords are spelled correctly</li><li>Try using more general keywords (be less specific)</li><li>Try entering a shorter search if it is too long</li></ul></div>");
    $(".content").fadeOut(1).fadeIn(1500);
  }
};

function animations() {
  // Animate positioning
  $("#wikibox").animate({bottom: "21em", top: 0, left: 0, right: 0}, 500);
  // Allow user to reset search
  $("#refresh").click(function() {
    $("#wikibox").animate({bottom: "3em", top: 0, left: 0, right: 0}, 500);
    input = undefined; searchResults = []; searchInfo = []; searchLinks = [];
    $(".contentinfo").remove();
    $("#form")[0].reset();
    });
  showResults();
}
