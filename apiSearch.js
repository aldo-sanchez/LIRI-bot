function Search(){};

// Twitter
var Twitter = require('twitter');

var keysTwitter = require('./keys.js');

var client = new Twitter(keysTwitter);

Search.prototype.tweets = function(){
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
      }

      for(key in tweetObj[tweetKey]){
        console.log(key + ': ' + tweetObj[tweetKey][key]);
      }
      console.log('\n');
    };
    return tweetObj;
  });

  // client.post('statuses/update', {status: 'Posting from node.js'}, function(error, tweet, response){
  //   if(error) throw error;
  //   console.log(tweet);
  //   // console.log(response);
  // });
};

// Spotify
var spotify = require('spotify');

Search.prototype.song = function(song){
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
    for(key in songObj[songKey]){
      console.log(key + ': ' + songObj[songKey][key]);
    }
    console.log('\n')
  }
});
}

// OMDB
var request = require('request');
Search.prototype.movie = function(movie){
  console.log('mov')
  var url = 'http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json';
  request(url,function(error, response, body){
    if(error) throw error;
    body = JSON.parse(body);

    movieObj = {
      title: body.Title,
      year: body.Year,
      rating: body.imdbRating,
      country: body.Country,
      language: body.Language,
      plot: body.Plot,
      actors: body.Actors,
      tomatoRating: body.tomatoRating,
      tomatoURL: body.tomatoURL
    }

    for(key in movieObj){
      console.log(key + ': ' + movieObj[key]);
    };
  });
};

module.exports = Search;