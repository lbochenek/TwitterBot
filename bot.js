//https://github.com/aparrish/example-twitter-bot-node/blob/master/bot.js

var twitterAPI = require('node-twitter-api');
var util = require('util');

function choice(list)
{
	return list[Math.floor(Math.random() * list.length)];
}

function generateTweet()
{
	var tweet = "";

	var syrupFlavors = ["vanilla ", "hazelnut ", "caramel ", "mocha ", "white mocha ", "toffee nut ", "raspberry ", "peppermint ", "pumpkin ", "irish cream ", "coconut ", "gingerbread ", "cinnamon"];
	var coffees = [{name: "espresso ", milk: false, steamed_milk: false, milk_foam: false, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: false}, 
				   {name: "espresso macchiato ", milk: false, steamed_milk: false, milk_foam: true, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: false}, 
				   {name: "espresso con panna ", milk: false, steamed_milk: false, milk_foam: false, steamed_half: false, whipped_cream: true, water: false, syrup: false, espresso: true, coffee: false}, 
				   {name: "caffé latte ", milk: false, steamed_milk: true, milk_foam: true, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: false}, 
				   {name: "flat white ", milk: false, steamed_milk: true, milk_foam: false, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: false},
				   {name: "caffé breve ", milk: false, steamed_milk: false, milk_foam: true, steamed_half: true, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: false}, 
				   {name: "cappucino ", milk: false, steamed_milk: true, milk_foam: true, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: false}, 
				   {name: "caffé mocha ", milk: false, steamed_milk: true, milk_foam: false, steamed_half: false, whipped_cream: true, water: false, syrup: true, espresso: true, coffee: false}, 
				   {name: "americano ", milk: false, steamed_milk: false, milk_foam: false, steamed_half: false, whipped_cream: false, water: true, syrup: false, espresso: true, coffee: false}, 
				   {name: "latte macchiato ", milk: false, steamed_milk: true, milk_foam: false, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: false}, 
				   {name: "red eye ", milk: false, steamed_milk: false, milk_foam: false, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: true, coffee: true},
				   {name: "café au lait ", milk: true, steamed_milk: false, milk_foam: false, steamed_half: false, whipped_cream: false, water: false, syrup: false, espresso: false, coffee: true},
				   {name: "frappé ", milk: true, steamed_milk: false, milk_foam: false, steamed_half: false, whipped_cream: true, water: false, syrup: false, espresso: true, coffee: false}];
	var milks = ["whole milk ", "2% milk ", "skim milk ", "almond milk ", "cream ", "organic milk "];
	var espAmount = ["", "double ", "triple ", "quad "];

	//http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var coffee = coffees[randomNum(coffees.length - 1, 0)];
	if(coffee.espresso)
	{
		var amount = espAmount[randomNum(espAmount.length - 1, 0)];
		tweet += amount;

	}

	if(chance(0.3))
	{
		tweet += "decaf ";
	}
	else if(chance(0.25))
	{
		tweet += "half-caff ";
	}

	if(chance(0.4))
	{
		tweet += "skinny ";
	}

	if(chance(0.4))
	{
		tweet += "iced ";
	}

	if(!coffee.syrup)
	{
		if(chance(.5))
		{
			var syrup = syrupFlavors[randomNum(syrupFlavors.length - 1, 0)];
			if(chance(0.15))
			{
				var pumps = randomNum(10, 0);

			}
			tweet += syrup;
		}
	}

	var malked = false;
	if(coffee.steamed_milk||coffee.milk)
	{
		if(chance(.25))
		{
			tweet += "soy ";
			malked = true;
		}
	}

	if(coffee.milk_foam)
	{
		if(chance(.5))
		{
			tweet+="no foam ";
		}
	}

	if(coffee.whipped_cream)
	{
		if(chance(0.3))
		{
			tweet += "extra whip ";
		}
	}

	tweet += coffee.name;

	var hasWith = false;
	if((!malked) && (coffee.steamed_milk||coffee.milk))
	{
		var milk = milks[randomNum(milks.length - 1, 0)];
		tweet += ("with " + milk);
		hasWith = true;
	}

	if(coffee.whipped_cream)
	{
		var drizzle = syrupFlavors[randomNum(syrupFlavors - 1, 0)];
		if(hasWith)
		{
			tweet += ("and " + drizzle + " drizzle");
		}
		else
		{
			tweet += ("with " + drizzle + " drizzle");
		}
	}

	return tweet;
}

function chance(num)
{
	var compare = 1 - num;
	var chance = Math.random();
	return chance > compare;
}

function randomNum(max, min)
{
	//http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var ind = Math.floor(Math.random() * (max - min + 1)) + min;

	return ind;
}

function main()
{
	var accessToken = process.argv[4];
	var tokenSecret = process.argv[5];

	var twitter = new twitterAPI({
		consumerKey: process.argv[2],
		consumerSecret: process.argv[3],
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