function Search(){};

// Twitter
var Twitter = require('twitter');

var keysTwitter = require('./keys.js');

var client = new Twitter(keysTwitter);

Search.prototype.tweets = function(display2Console, write2File){
  twitterInfo = {
    screen_name: '@willbeard4food',
    count: 20
  };
  client.get('statuses/user_timeline', twitterInfo, function(error, tweets, response) {
    if(error) throw error;

    // check tweet count.  if tweets are less than the 20 default then loop for the actual tweet count.  otherwise loop for the default 20
    var twitterCount;
    tweets.length < twitterInfo.count ? twitterCount = tweets.length : twitterCount = twitterInfo.count;
    var tweetObj = {};

    for(i = 0; i < twitterCount; i++){
      var tweetKey = 'tweet'+i;
      
      tweetObj[tweetKey] = {
        created: tweets[i].created_at,
        tweet: tweets[i].text
      };
    };
    display2Console(tweetObj);
  });
};

// Spotify
var spotify = require('spotify');

Search.prototype.song = function(song, display2Console){
  spotify.search({type: 'track', query: song}, function(error, response){
  if(error) throw error;
  var data = response.tracks;
  var songCount = data.items.length;
  songObj = {};

  for(i = 0; i < songCount; i++){
    var songKey = 'song'+i;
    songObj[songKey] = {
      artist: data.items[i].artists[0].name,
      song: data.items[i].name,
      preview: data.items[i].preview_url,
      album: data.items[i].album.name
    }; 
  }
  display2Console(songObj);
});
}

// OMDB
var request = require('request');
Search.prototype.movie = function(movie, display2Console){
  var url = 'http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json';
  request(url,function(error, response, body){
    if(error) throw error;
    body = JSON.parse(body);
    movieObj = {};

    movieObj['movie'] = {
      title: body.Title,
      year: body.Year,
      rating: body.imdbRating,
      country: body.Country,
      language: body.Language,
      plot: body.Plot,
      actors: body.Actors,
      tomatoRating: body.tomatoRating,
      tomatoURL: body.tomatoURL
    };
    display2Console(movieObj);
  });
};

module.exports = Search;