require("dotenv").config();

var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js")
var axios = require("axios");

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

fs.readFile("random.txt", "utf8", function(error, newSearch) {
  if (error) {
    return console.log(error);
  }
  if (process.argv[2] === "do-what-it-says") {
    spotify.request('https://api.spotify.com/v1/search?q=' + newSearch + '&type=track&limit=2')
    .then(function(data) {
      console.log("You searched for: " + userInput);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Album Name: " + data.tracks.items[0].album.name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
  })
  }

})

var userInput = process.argv.slice(3).join(" ");

var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

if (process.argv[2] === "spotify-this-song") {
  spotify.request('https://api.spotify.com/v1/search?q=' + userInput + '&type=track&limit=2')
  .then(function(data) {
    console.log("You searched for: " + userInput);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
})
} 

if (process.argv[2] === "movie-this") {
  axios.get(queryUrl).then(
    function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Movie Released in " + response.data.Year);
      console.log("Ratings: " + response.data.Ratings[1].Source + " " + response.data.Ratings[2].Value);
      console.log("Movie produced in " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  )
}

if (process.argv[2] === "concert-this") {
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
  .then(function(response) {
      console.log("Artist: " + userInput)
      console.log("Event date: " + response.data[0].datetime);
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("venue City: " + response.data[0].venue.city);
    }
  )
}