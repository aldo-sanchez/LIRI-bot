var Twitter = require('twitter');

var importTwitter = require('./keys.js');
var keysTwitter = importTwitter.keysTwitter;
console.log(keysTwitter)

var client = new Twitter(keysTwitter);

console.log(client)

client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
   console.log(tweets);
});

// client.post('statuses/update', {status: 'Posting from node.js'}, function(error, tweet, response){
//   if(error) throw error;
//   console.log(tweet);
//   // console.log(response);
// });