var app = angular.module('gitplayback', ['ui.router']);

app.controller('MainController', function ($scope) {

$scope.framesArray = ['nothing'];
$scope.currentFrame = "no current frame";

});

app.factory('KeyframeFactory', function ($http) {
	return {
		getKeyframe: function(){
			// sequelize query goes here
			console.log("got keyframe?");
		}
	}
});