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

var spotifykey = new spotify ({

  id: '5cce13d7106545b9aa085dd5f5c9598f',
  secret: '30ffbb31f6164884befe7aa462307994'

});




// ===================================

// Prompting user about what they want

// ===================================

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
			console.log("Twitter!")
			tweets();			
			break;

			case "Spotify a song":
			console.log("Spotify!");
			spotify();
			break;

			case "Show me a movie":
			console.log("Movies!");
			movie();
			break;

			case "Do what it says":
			console.log("FU!");
			say();
			break;

		}

		//-----------------------------------------------------------------------------------------------------------------------------

		// @DonalIdTrump show retarded tweets

		//-----------------------------------------------------------------------------------------------------------------------------

		

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

		//-----------------------------------------------------------------------------------------------------------------------------

        // Spotify a song

		//-----------------------------------------------------------------------------------------------------------------------------



		function spotify () {

			inquirer.prompt ([

			{
				type: "input",
				name: "userInput",
				message: "What song would you like to know more about?"
			}

				]).then(function(song){

					spotifykey.search ({ type: 'track', query: song.userInput, limit:1 }, function(err, data) {
					  if (err) {
					    return console.log('Error occurred: ' + err);
					  }
					 
					console.log(data.tracks.items[0].album.artists); 

					});


				});

		}; // spotify() ends here



		//-----------------------------------------------------------------------------------------------------------------------------

		//OMDB a movie

		//-----------------------------------------------------------------------------------------------------------------------------



		function movie () {

			inquirer.prompt ([

			{
				type: "input",
				name: "userInput",
				message: "What Movie would you like to know more about?"
			}

				]).then(function(response){

					

				});


		}; // movie() ends here



		//-----------------------------------------------------------------------------------------------------------------------------
		
		//Say what I say

		//-----------------------------------------------------------------------------------------------------------------------------

		function say () {

		}; //say() ends here

		

	}); // then function response closes here