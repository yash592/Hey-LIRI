var keys = require("./keys.js");
var fs = require("fs");
var inquirer = require("inquirer");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var omdb = require("omdbapi");

var client = new twitter({
  consumer_key: 'bnICMoNqPDvV83mppQYCD3JJm',
  consumer_secret: 'n3q6bNOx72P7mW4l83EhHVD5ff925fJBxI4f4MtraMA4lSsncR',
  access_token_key: '932310531783794688-zUnUejjA6qPa6v8f52moAKPixhDHJRG',
  access_token_secret: 'B1cc1YyrUWn7I7mmjJ0mYUmGVQx2Dfze23iKttoiL4N09',
});



// Prompting user about what they want

inquirer.prompt ([


{
	type: "list",
	name: "whatyawant",
	message: "What do you want me to to?",
	choices: ["Show me my tweets", "Spotify a song", "Show me a movie", "Do what it says"]
},

    // switch cases to evaluate and respong to user's input

	]).then(function(response) {

		switch (response.whatyawant) {
			case "Show me my tweets":
			tweets();
			console.log("tweets!");
			break;

			case "Spotify a song":
			console.log("songs!");
			break;

			case "Show me a movie":
			console.log("movies!");
			break;

			case "Do what it says":
			console.log("FU!");
			break;

		}

		// @DonalIdTrump show retarded tweets

		function tweets() {

            var params = {screen_name: 'DonalIdTrump'};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {

  				for (var i = 0; i < 20; i++) {

                    console.log("");
                    console.log("==================================================================================================");
                    console.log("");
  					console.log("Retarded Tweet #" + [i] + ": " +  tweets[i].text);
  					console.log("");
  					console.log("==================================================================================================");
  					console.log("");

  				};
  			};    		
  			
		});

		}; //function tweet ends here

		function spotify () {

		}; // spotify() ends here

		function movie () {

		}; // movie() ends here

		function say () {

		}; //say() ends here

		

	}); // then function response closes here