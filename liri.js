require("dotenv").config();

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

var keys = require("./keys.js")
var axios = require("axios");
var songName = process.argv[3];

if(process.argv[2] === "spotify") {
  spotify.request('https://api.spotify.com/v1/search?q=' + songName + '&type=track&limit=2')
  .then(function(data) {
    console.log("You searched for: " + songName);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
})
}
