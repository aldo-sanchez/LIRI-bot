var command = process.argv[2].toLowerCase();
var mediaName = process.argv.splice(3).join(' ').toLowerCase();

var Controller = require('./controller.js');
var myController = new Controller(command, mediaName);

switch(command){
  case 'my-tweets':
    console.log('these are my tweets: \n');
    myController.getTweets(myController.command, myController.mediaName);
    break;
  case 'spotify-this-song':
    console.log('these are some songs: \n');
    myController.getSong(myController.command, myController.mediaName);
    break;
  case 'movie-this':
    console.log('this is my movie: \n')
    myController.getMovie(myController.command, myController.mediaName);
    break;
  case 'do-what-it-says':
    myController.readRandom();
    break;
  case 'help':
    myController.getHelp();
    break;
  default: console.log('not an available command\n for available commands type: node liri.js help');
};