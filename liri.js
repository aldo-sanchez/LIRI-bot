var command = process.argv[2];
var mediaName = process.argv.splice(3).join(' ');

console.log('command', command);
console.log('mediaName', mediaName);

var Twitter = require('twitter');

var keysTwitter = require('./keys.js');

var client = new Twitter(keysTwitter);

client.get('statuses/user_timeline', {screen_name: '@willbeard4food', count: 10}, function(error, tweets, response) {
  //  console.log(tweets);
});

// client.post('statuses/update', {status: 'Posting from node.js'}, function(error, tweet, response){
//   if(error) throw error;
//   console.log(tweet);
//   // console.log(response);
// });

var spotify = require('spotify');

spotify.search({type: 'track', query: 'dancing in the moonlight'}, function(error, data){
  if(error) throw error;
  // console.log(data.tracks.items[0])
});

var request = require('request');

var url = 'http://www.omdbapi.com/?t=gladiator&y=&plot=short&r=json';

request(url,function(error, response, body){
  if(error) throw error;
  // console.log(body)
})