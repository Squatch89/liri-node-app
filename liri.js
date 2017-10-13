const keys = require("./keys.js");

const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');

const command = process.argv[2];
let query = "";

for (let i = 3; i < process.argv.length; i ++) {
    query = query.trim() + " " + process.argv[i];
    console.log(command);
}

switch (command) {
    case "my-tweets":
        twitterFun();
        break;
    case "spotify-this-song":
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
    
    const params = {screen_name: 'TechManWallace'};
    
    client.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (err) {
            console.log(err);
        }
        for (let i = 0; i < 20; i++) {
            
            console.log("======================================================================");
            console.log("\n");
            console.log(tweets[i].created_at);
            console.log("");
            console.log(tweets[i].text);
            console.log("\n");
            console.log("======================================================================");
            
        }
        // console.log(JSON.stringify(response));
    })
}

function spotifyFun() {
    console.log("spotify was called");
    const Spotify = new spotify ({
        id: keys.spotify.clientID,
        secret: keys.spotify.clientSecret
    });
    Spotify.search({type: 'track', query: query, limit: 1}, function(err, data) {
        if (err) {
            console.log(err);
        }
        console.log("======================================================================");
        console.log("\n");
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        console.log(`Track Name: ${data.tracks.items[0].name}`);
        console.log(`Album Name: ${data.tracks.items[0].album.name}`);
        console.log(`Preview URL: ${data.tracks.items[0].preview_url}`);
        console.log("\n");
        console.log("======================================================================");
        
    // * Artist(s)
    //
    //     * The song's name
    //
    //     * A preview link of the song from Spotify
    //
    //     * The album that the song is from
    })
}

function OMDB() {
    console.log("OMDB was called");

}