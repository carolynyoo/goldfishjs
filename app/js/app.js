var app = angular.module('gitplayback', ['ui.router']);


app.controller('MainController', function ($scope, KeyframeFactory) {

$scope.framesArray = ['nothing'];
$scope.currentFrame = "no current frame";

$scope.getall = KeyframeFactory.getKeyframe();

});

app.factory('KeyframeFactory', function ($http) {
	return {
		getKeyframe: function(){
			// sequelize query goes here
			console.log("got keyframe?");


// Keyframe
//     .findAll({})
//     .then(function() {
      
//     })
//     .then(function() {
//       console.log("Fetched all keyframes succesfully"); 
//     })
//     .catch(function(err) {
//       console.log("Error retrieving keyframes: ", err);
//     });



		}
	}
});

// Pulled this from local db :p
// select id, filename, text_state from Keyframes where id = 68;
//require('/Users/randallwong/Desktop/FoundationsPrework/gitplayback/db/models/')(sequelize);
