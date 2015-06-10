var app = angular.module('gitplayback', ['ui.router']);


var models = require('/Users/randallwong/Desktop/FoundationsPrework/gitplayback/db/models/');
var Keyframe = models.Keyframe;

app.controller('MainController', function ($scope, KeyframeFactory, nwguiFactory) {

$scope.framesArray = ['nothing'];
$scope.currentFrame = "no current frame";

// Opens debugger window
var nwgui = nwguiFactory;
nwgui.Window.get().showDevTools();

//var folder_view = folderviewFactory;

// Gets all keyframes
$scope.getall = KeyframeFactory.getAllKeyframes();


$scope.firstFrame = $scope.getall.then(function (data) {
	console.log("data in firstFrame:", data)
	console.log("data[0]:", data[0]);
	console.log("data[dataValues]:", data[0]["dataValues"]);
	console.log("data[dataValues][text_state]:", data[0]["dataValues"]["text_state"]);

	//data[0]["dataValues"]["text_state"];
	data[0]["dataValues"]["text_state"];
	$scope.firstFrame = data[0]["dataValues"]["text_state"];
   	$scope.$digest();
});



window.setTimeout(function(){
			
			//console.log("first frame:", $scope.firstFrame);
			console.log("first frame:", $scope.firstFrame);
			}, 10000)

 });


app.factory('nwguiFactory', function(){
	var nwGui = require('nw.gui');
	return nwGui;
 });

// app.factory('folderviewFactory', function(){
// 	var folder_view = require('folder_view');
// 	return 5;
//  });

app.factory('KeyframeFactory', function () {
	return {
		getAllKeyframes: function(){

		// Sequelize query retrieves all Keyframes
		return Keyframe
		    .findAll()
		    .then(function(keyframes) {
		      console.log("Fetched all keyframes succesfully");
		      console.log("keyframes:", keyframes);
		      return keyframes; 
		    })
		    .catch(function(err) {
		      console.log("Error retrieving keyframes: ", err);
		    });


// this will eventually be an array, but just setting 1 for now
			// var next = "next keyframe";
			// console.log("got keyframe?");

			// window.setTimeout(function(){
			// input = next;
			// console.log("set timeout");
			// console.log("")
			// }, 2000)
		

		}
	}
});
