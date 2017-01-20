var command = process.argv[2];
var mediaName = process.argv.splice(3).join(' ');

var Controller = require('./controller.js');
var myController = new Controller(command, mediaName);

switch(command){
  case 'my-tweets':
    console.log('these are my tweets');
    myController.getTweets();
    break;
  case 'spotify-this-song':
    console.log('this song is:...');
    myController.getSong(myController.mediaName);
    break;
  case 'movie-this':
    console.log('this is my movie')
    myController.getMovie(myController.mediaName)
    break;
  case 'do-what-it-says':
    console.log('not quite sure what this is');
    break;
  case 'help':
    myController.getHelp();
    break;
  default: console.log('not an available command');
};