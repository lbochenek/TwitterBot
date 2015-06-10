//https://github.com/aparrish/example-twitter-bot-node/blob/master/bot.js

var twitterApi = require('node-twitter-api');
var util = require('util');

function choice(list)
{
	return list[Math.floor(Math.random() * list.length)];
}

function generateTweet()
{
	return "";
}

function main()
{
	var accessToken = process.argv[4];
	var tokenSecret = process.argv[5];

	var twitter = new twitterAPI({
		consumerKey: process.argv[2];
		consumerSecret: process.argv[3];
	});

	twitter.statuses("update", 
		{"status":generateTweet()},
		accessToken,
		tokenSecret,
		function(error, data, response){
			if(error){
				console.log("something went wrong: " + util.inspect(error));
			}
		}
	);
}

main();