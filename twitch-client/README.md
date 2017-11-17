# Use the Twitchtv JSON API

## Objective

Build an app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/Myvqmo/.

## Requirements

* User Story: I can see whether Free Code Camp is currently streaming on Twitch.tv.

* User Story: I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.

* User Story: if a Twitch user is currently streaming, I can see additional details about what they are streaming.

* User Story: I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed). You can verify this works by adding brunofin and comster404 to your array of Twitch streamers.

**Hint:** Here's an array of the Twitch.tv usernames of people who regularly stream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

**UPDATE:** Due to a change in conditions on API usage explained here Twitch.tv now requires an API key, but we've built a workaround. Use https://wind-bow.gomix.me/twitch-api instead of twitch's API base URL (i.e. https://api.twitch.tv/kraken ) and you'll still be able to get account information, without needing to sign up for an API key.

## Deployment
* Open index.html

## Launch
[Twitch Client](https://ziggysauce.github.io/chingu-fcc-speedrun-challenge/frontend/twitch-client/index.html)

## Notes
[Medium Article](https://medium.com/chingu-fcc-speedrun/fcc-speedrun-twitch-client-3810470daf9d)

Created a twitch-client app that uses the FCC API https://wind-bow.glitch.me/ (pass-through for twitch API) and shows the online/offline status of streams saved in the JavaScript list. If a streamer is currently online it also shows a description.
