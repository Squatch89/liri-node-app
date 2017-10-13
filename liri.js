const keys = require("./keys.js");

const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');

let command = "";

for (let i = 2; i < process.argv.length; i ++) {
    command = command.trim() + " " + process.argv[i];
    console.log(command);
}

switch (command) {
    case "my tweets":
        twitterFun();
        break;
    case "spotify this song":
        spotifyFun();
        break;
    case "movie this":
        OMDB();
        break;
    default:
        console.log("Try one of these commands: my tweets, spotify this song, movie this");
}


function twitterFun() {
    console.log("twitter was called");
    const client = new twitter ({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });
    
    const params = {screen_name: 'nodejs'};
    
    client.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (err) {
            console.log(err);
        }
        console.log(tweets);
        // console.log(JSON.stringify(response));
    })
}

function spotifyFun() {
    console.log("spotify was called");
}

function OMDB() {
    console.log("OMDB was called");

}