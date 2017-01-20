// Twitter
var Twitter = require('twitter');

var keysTwitter = require('./keys.js');

var client = new Twitter(keysTwitter);

function Search(){};

Search.prototype.tweets = function(){
  client.get('statuses/user_timeline', {screen_name: '@willbeard4food', count: 10}, function(error, tweets, response) {
     console.log(tweets);
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
  console.log('wow')
  spotify.search({type: 'track', query: song}, function(error, data){
  if(error) throw error;
  console.log(data.tracks.items[0])
});
}

// OMDB
var request = require('request');
Search.prototype.movie = function(movie){
  console.log('mov')
  var url = 'http://www.omdbapi.com/?t='+movie+'&y=&plot=short&r=json';
  request(url,function(error, response, body){
  if(error) throw error;
  console.log(body)
});
}

module.exports = Search;