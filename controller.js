fs = require('fs');

function ControllerObject(command, mediaName){
  this.command = command;
  this.mediaName = mediaName;
};

var Search = require('./apiSearch.js')
var newSearch = new Search();

ControllerObject.prototype.getTweets = function(){
  newSearch.tweets(this.display2Console, this.write2File);
  // console.log(tweets);
};

ControllerObject.prototype.getSong = function(song){
  newSearch.song(song, this.display2Console);
}

ControllerObject.prototype.getMovie = function(movie){
  newSearch.movie(movie, this.display2Console);
}

ControllerObject.prototype.getHelp = function(){
  helpText = 'Available commands:\n'
  tweetHelp = 'my-tweets         will display last 20 tweets \n' 
  movieHelp = 'movie-this         will display movie information \n'
  songHelp = 'spotify-this-song  get song information \n'
  doWhatHelp = 'do-what-it-says:   not quite sure what this does';
  console.log(helpText, tweetHelp, movieHelp, songHelp, doWhatHelp);
}

ControllerObject.prototype.write2File = function(obj){
  // console.log('test',obj);
  for(firstKey in obj){
    for(secondKey in obj[firstKey]){
      console.log(secondKey + ': ' + obj[firstKey][secondKey]);
    }
    console.log('\n')
  }
}

ControllerObject.prototype.display2Console = function(obj){
  for(firstKey in obj){
    for(secondKey in obj[firstKey]){
      console.log(secondKey + ': ' + obj[firstKey][secondKey]);
    }
    console.log('\n')
  }
}
module.exports = ControllerObject;