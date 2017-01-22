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

    for(i = 0; i < twitterCount; i++){
      var createdOn = tweets[i].created_at;
      var tweetText = tweets[i].text;
      console.log('created on:', createdOn)
      console.log('tweet:',tweetText+'\n')
    };
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
  
  for(i = 0; i < songCount; i++){
    var artistName = data.items[i].artists[0].name;
    var songName = data.items[i].name;
    var previewLink = data.items[i].preview_url;
    var albumName = data.items[i].album.name;

    console.log(artistName);
    console.log(songName);
    console.log(albumName);
    console.log(previewLink + '\n');

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

    movie = {
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

    for(key in movie){
      console.log(key + ': ' + movie[key]);
    };
  });
};

module.exports = Search;