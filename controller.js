fs = require('fs');

function ControllerObject(command, mediaName){
  this.command = command;
  this.mediaName = mediaName;
};

var Search = require('./apiSearch.js')
var newSearch = new Search();

ControllerObject.prototype.getTweets = function(){
  newSearch.tweets(this.command, this.mediaName, this.display2Console, this.write2File);
};

ControllerObject.prototype.getSong = function(){
  if(this.mediaName == ''){this.mediaName = 'the sign ace of base'};

  newSearch.song(this.command, this.mediaName, this.display2Console, this.write2File);
};

ControllerObject.prototype.getMovie = function(){
  if(this.mediaName == ''){this.mediaName = 'mr nobody'};

  newSearch.movie(this.command, this.mediaName, this.display2Console, this.write2File);
};

ControllerObject.prototype.getHelp = function(){
  helpText = 'Available commands:\n'
  tweetHelp = 'my-tweets         will display last 20 tweets \n' 
  movieHelp = 'movie-this         will display movie information \n'
  songHelp = 'spotify-this-song  get song information \n'
  doWhatHelp = 'do-what-it-says:   not quite sure what this does';
  console.log(helpText, tweetHelp, movieHelp, songHelp, doWhatHelp);
};

//write2File writes command, mediaName and the results returned from search on a file named log.txt. this method takes command, mediaName, and an object as parameters.
ControllerObject.prototype.write2File = function(command, mediaName, obj){
  //logText will be used to log the command, mediaName, timeStamp and results.  we begin by defining it with timestamp, command, and mediaName.
  var logText = 'timestamp: ' + Math.floor(Date.now() / 1000) + ',' + 'command: ' + command + ',' + 'mediaName: ' + mediaName + ',';

  //objText will be used to collect the search response obj.  this object can be made up of information about tweets, songs, or movies. some strings inside obj can contain new lines so we write a regex string to find new lines.
  var objText = '';
  var newLineRegex = /\r?\n|\r/g;
  for(firstKey in obj){
    objText += firstKey + ': '
    for(secondKey in obj[firstKey]){
      objText += secondKey + ': ' + obj[firstKey][secondKey] + ','
    };
  };
  objText = objText.replace(newLineRegex, ''); //replace new lines with an empty space.

  logText += objText + '\n'; //add objText and a new line to logText

  //write to log.txt
  fs.appendFile('log.txt', logText, function(error){
    if(error) throw error;
  });
};

ControllerObject.prototype.display2Console = function(obj){
  for(firstKey in obj){
    for(secondKey in obj[firstKey]){
      console.log(secondKey + ': ' + obj[firstKey][secondKey]);
    };
    console.log('\n')
  };
};

ControllerObject.prototype.readRandom = function(){
  var that = this;
  fs.readFile('random.txt', 'utf8', function(error, data){
    if(error) throw error;
    var newLineRegex = /\r?\n|\r/g;
    data = data.split('\n');
    var dataArray = data.map(function(elem,index){
      return elem.replace(newLineRegex,'').split(',');
    });
    var randomElem = Math.floor(Math.random()*dataArray.length);
    that.command = dataArray[randomElem][0];
    that.mediaName = dataArray[randomElem][1];
    switch(that.command){
      case 'my-tweets':
        that.getTweets();
        break;
      case 'spotify-this-song':
        that.getSong();
        break;
      case 'movie-this':
        that.getMovie();
        break;
      default: 'try again?';
    };
  });
};
module.exports = ControllerObject;