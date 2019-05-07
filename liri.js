require("dotenv").config();

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

var keys = require("./keys.js")
var axios = require("axios");
var songName = process.argv[2];

// spotify.request('https://api.spotify.com/v1/search?q=' + songName +'&type=track%2Cartist&market=US&limit=10&offset=5')
// .then(function(data) {
//     var newData = JSON.stringify(data);
//     console.log(newData);
// })

spotify.request('https://api.spotify.com/v1/search?q=' + songName + '&type=track&limit=2')
.then(function(data) {
    // var newData = JSON.stringify(data);
    // console.log(data.tracks.items);
    console.log(data.tracks.items.album);
})



// if(process.argv[2] === "spotify") {
//     console.log("hey it worked");
// }
