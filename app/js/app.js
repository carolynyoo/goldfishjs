var app = angular.module('gitplayback', ['ui.router']);


app.controller('MainController', function ($scope, KeyframeFactory) {

$scope.framesArray = ['nothing'];
$scope.currentFrame = "no current frame";

$scope.getall = KeyframeFactory.getKeyframe($scope.currentFrame);

});

app.factory('KeyframeFactory', function () {
	return {
		getKeyframe: function(input){
			// sequelize query goes here

			// this will eventually be an array, but just setting 1 for now
			var next = "next keyframe";
			console.log("got keyframe?");

			window.setTimeout(function(){
			input = next;
			console.log("set timeout");
			}, 2000)

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
