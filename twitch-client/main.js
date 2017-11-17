/* JS for twitch-client app */

// Store stream names and URLs
var api = "https://wind-bow.glitch.me/twitch-api/streams/";
var streams = ["freecodecamp", "ESL_SC2", "OgamingSC2", "aimbotcalvin", "Surefour", "PlayOverwatch", "harbleu", "BazzaGazza", "Loserfruit", "codeyniku", "Grimmmz"]

$(document).ready(function() {
  $(".onbox").hide();
  $(".offbox").hide();
  // Loop through all streams for data
  streams.map(showStreams).map(streamData);
  // Clicking on any of the navigation buttons shows the streams corresponding
  toggleAll(); toggleOn(); toggleOff();
});


// Get URL for all streams
function showStreams(name) {
  return("" + api + name + "");
};

// Get data for all streams
function streamData(data) {
  $.getJSON("" + data + "", function(data2) {
    console.log(data2);
    if (data2.stream) {
      console.log("online");
      // Create new div for every stream online
      $(".onbox").append("<div class='online'><div class='left'><a href='" + data2.stream.channel.url + "' class='t-title' target='_blank'>" + data2.stream.channel.display_name + "</a><p class='t-desc'>" + data2.stream.channel.status + "</p></div><div class='right'><span class='statuson'></span></div></div>");
    }
    else {
      console.log("offline");
      // Create new div for every stream offline
      $(".offbox").append("<div class='offline'><div class='left'><a href='https://www.twitch.tv/" + data2._links.channel.slice(38) + "' class='t-title' target='_blank'>" + (data2._links.channel).slice(38) + "</a></div><div class='right'><span class='statusoff'></span></div></div>");
    }
  });
};

// Toggle between all, online, and off streams upon click
function toggleAll() {
  $("#alltab").click(function() {
    $("#ontab").removeClass("activenav");
    $("#offtab").removeClass("activenav");
    $("#alltab").addClass("activenav");
    $(".onbox").show(500);
    $(".offbox").show(500);
  });
};

function toggleOn() {
  $("#ontab").click(function() {
    $("#alltab").removeClass("activenav");
    $("#offtab").removeClass("activenav");
    $("#ontab").addClass("activenav");
    $(".offbox").hide(500);
    $(".onbox").show(500);
  });
};

function toggleOff() {
  $("#offtab").click(function() {
    $("#ontab").removeClass("activenav");
    $("#alltab").removeClass("activenav");
    $("#offtab").addClass("activenav");
    $(".onbox").hide(500);
    $(".offbox").show(500);
  });
};
