fs = require('fs');

function ControllerObject(command, mediaName){
  this.command = command;
  this.mediaName = mediaName;
};

var Search = require('./apiSearch.js')
var newSearch = new Search();

ControllerObject.prototype.getTweets = function(){
  console.log('insideTweets');
  var tweets = newSearch.tweets();
  console.log(tweets);
};

ControllerObject.prototype.getSong = function(song){
  console.log('insideSong');
  newSearch.song(song);
}

ControllerObject.prototype.getMovie = function(movie){
  console.log('insideMovie');
  newSearch.movie(movie);
}

ControllerObject.prototype.getHelp = function(){
  helpText = 'Available commands:\n'
  tweetHelp = 'my-tweets         will display last 20 tweets \n' 
  movieHelp = 'movie-this         will display movie information \n'
  songHelp = 'spotify-this-song  get song information \n'
  doWhatHelp = 'do-what-it-says:   not quite sure what this does';
  console.log(helpText, tweetHelp, movieHelp, songHelp, doWhatHelp);
}

ControllerObject.prototype.write2File = function(){
  console.log(this.command,this.mediaName);
}

module.exports = ControllerObject;