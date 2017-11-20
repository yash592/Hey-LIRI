var keys = require("./keys.js");
var fs = require("fs");
var inquirer = require("inquirer");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var omdb = require("omdbapi");
var request = require("request");

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
	message: "Hello! What do you want me to to?",
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

		};






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
				name: "spotifyInput",
				message: "What song would you like to know more about?"
			}

				]).then(function(song){

					spotifykey.search ({ type: 'track', query: song.spotifyInput, limit: 5 }, function(err, data) {
					  if (err) {
					    return console.log('Error occurred: ' + err);
					  }

					  for (var i = 0; i < 4; i++) {

					  	console.log("");
					  	console.log("==================================================================================================");
					  	console.log("");
					  	console.log("Artist: " + data.tracks.items[i].artists[0].name + " ---- " + "Album: " + data.tracks.items[i].album.name + " ---- " + "Song Name: " + data.tracks.items[i].name + " ---- " + "Preview URL: " + data.tracks.items[i].preview_url) // Artist
					  	console.log("");
					  	console.log("==================================================================================================");
					  	console.log("");


					  }
					

							// * Artist(s)
					     
					        // * The song's name
					     
					        // * A preview link of the song from Spotify
					       
					        // * The album that the song is from



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
				name: "movieInput",
				message: "What Movie would you like to know more about?"
			}

				]).then(function(pickMovie){

					var queryUrl = "http://www.omdbapi.com/?t=" + pickMovie.movieInput + "&y=&plot=short&apikey=trilogy";

					request(queryUrl, function(error, response, body) {

					  // If the request is successful
					  if (!error && response.statusCode === 200) {


					    // Parse the body of the site and recover just the imdbRating
					    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                        
                        // * Title of the movie.
                        // * Year the movie came out.
                        // * IMDB Rating of the movie.
                        // * Rotten Tomatoes Rating of the movie.
                        // * Country where the movie was produced.
                        // * Language of the movie.
                        // * Plot of the movie.
                        // * Actors in the movie.

                        console.log(" ")

					    console.log("Title: " + JSON.parse(body).Title + " --- " + "Release year: " + JSON.parse(body).Year + " --- " + "IMDB rating: " + JSON.parse(body).Ratings[0].Value + " --- " + "Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);

                        console.log(" ")

					    console.log("Country produced in: " + JSON.parse(body).Country + " --- " + 	"Languages: " + JSON.parse(body).Language);

                        console.log(" ")

					    console.log("Plot: " + JSON.parse(body).Plot);

                        console.log(" ")
 
					    console.log("Actors: " + JSON.parse(body).Actors);


					  }

					});					

				});


		}; // movie() ends here


		// if(pickMovie.movieInput == "") {

		// 					pickMovie.movieInput = "Mr Nobody";

		// 				}







		//-----------------------------------------------------------------------------------------------------------------------------
		
		//Say what I say

		//-----------------------------------------------------------------------------------------------------------------------------



		function say () {

			fs.readFile("random.txt", "utf8", function(error, data){

				if (error) {
					return console.log(error);
				}

				console.log(data);

				var dataArr = data.split(",");

				console.log(dataArr);
				console.log(dataArr[1]);


                // LOOOOOOOOL 
				spotifykey.search ({ type: 'track', query: dataArr[1], limit: 5 }, function(err, data) {
				  if (err) {
				    return console.log('Error occurred: ' + err);
				  }

				  for (var i = 0; i < 4; i++) {

				  	console.log("");
				  	console.log("==================================================================================================");
				  	console.log("");
				  	console.log("Artist: " + data.tracks.items[i].artists[0].name + " ---- " + "Album: " + data.tracks.items[i].album.name + " ---- " + "Song Name: " + data.tracks.items[i].name + " ---- " + "Preview URL: " + data.tracks.items[i].preview_url) // Artist
				  	console.log("");
				  	console.log("==================================================================================================");
				  	console.log("");


				  }


				});

			})

		}; //say() ends here

		

	}); // then function response closes here