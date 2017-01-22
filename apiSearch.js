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
  spotify.search({type: 'track', query: song}, function(error, data){
  if(error) throw error;
  var artistName = data.tracks.items[0].artists[0].name;
  var songName = data.tracks.items[0].name;
  var previewLink = data.tracks.items[0].preview_url;
  var albumName = data.tracks.items[0].album.name;
  
  console.log(artistName);
  console.log(songName);
  console.log(albumName);
  console.log(previewLink);
});
}

// OMDB
var request = require('request');
Search.prototype.movie = function(movie){
  console.log('mov')
  var url = 'http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json';
  request(url,function(error, response, body){
    if(error) throw error;
    title = JSON.parse(body).Title;
    year = JSON.parse(body).Year; 
    rating = JSON.parse(body).imdbRating;
    country = JSON.parse(body).Country;
    language = JSON.parse(body).Language;
    plot = JSON.parse(body).Plot;
    actors = JSON.parse(body).Actors;
    tomatoRating = JSON.parse(body).tomatoRating;
    tomatoURL = JSON.parse(body).tomatoURL;


  console.log(title, year, rating, country, language, plot, actors, tomatoRating, tomatoURL);
});
}

module.exports = Search;