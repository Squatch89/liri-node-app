const keys = require("./keys.js");

const twitter = require('twitter');
const spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

const command = process.argv[2];
let query = "";

for (let i = 3; i < process.argv.length; i++) {
    query += process.argv[i] + " ";
    console.log(query);
}

switch (command) {
    case "my-tweets":
        twitterFun();
        break;
    case "spotify-this-song":
        spotifyFun();
        break;
    case "movie-this":
        OMDB();
        break;
    case "do-what-it-says":
        random();
        break;
    default:
        console.log("Try one of these commands: my-tweets, spotify-this-song, movie-this");
}


function twitterFun() {
    console.log("twitter was called");
    const client = new twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });
    
    const params = {screen_name: 'TechManWallace'};
    
    client.get('statuses/user_timeline', params, function (err, tweets, response) {
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
    })
}

function spotifyFun() {
    console.log("spotify was called");
    const Spotify = new spotify({
        id: keys.spotify.clientID,
        secret: keys.spotify.clientSecret
    });
    if (query !== "") {
        Spotify.search({type: 'track', query: query, limit: 1}, function (err, data) {
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
        })
    }
    else {
        Spotify.search({type: 'track', query: 'Ace of Base', limit: 1}, function (err, data) {
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
        })
    }
}

function OMDB() {
    console.log("OMDB was called");
    
    if (query !== "") {
        request(`http://www.omdbapi.com/?apikey=${keys.OMDB}&t=${query}`, function (err, response, body) {
            console.log("======================================================================");
            console.log("\n");
            console.log(`Title: ${JSON.parse(body).Title}`);
            console.log(`Year: ${JSON.parse(body).Year}`);
            console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            console.log("\n");
            console.log("======================================================================");
        })
    }
    else {
        request(`http://www.omdbapi.com/?apikey=${keys.OMDB}&t=Mr Nobody`, function (err, response, body) {
            console.log("======================================================================");
            console.log("\n");
            console.log(`Title: ${JSON.parse(body).Title}`);
            console.log(`Year: ${JSON.parse(body).Year}`);
            console.log(`IMDB Rating: ${JSON.parse(body).Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            console.log("\n");
            console.log("======================================================================");
        })
    }
}

function random() {
    console.log("random was called");
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        }
        const dataArr = data.split(", ");
        
        query = dataArr[1];
    
        spotifyFun();
    })

}