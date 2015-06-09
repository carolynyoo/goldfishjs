var app = angular.module('gitplayback', ['ui.router']);


var models = require('/Users/randallwong/Desktop/FoundationsPrework/gitplayback/db/models/');
var Keyframe = models.Keyframe;

app.controller('MainController', function ($scope, KeyframeFactory, nwguiFactory) {

$scope.framesArray = ['nothing'];
$scope.currentFrame = "no current frame";


var nwgui = nwguiFactory;
//var folder_view = folderviewFactory;

nwgui.Window.get().showDevTools();


$scope.getall = KeyframeFactory.getKeyframe();

// Keyframe
//     .findAll()
//     .then(function() {
      
//     })
//     .then(function(keyframes) {
//       console.log("Fetched all keyframes succesfully");
//       console.log("keyframes:", keyframes);
//     })
//     .catch(function(err) {
//       console.log("Error retrieving keyframes: ", err);
//     });


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
		getKeyframe: function(){
			// sequelize query goes here

			// this will eventually be an array, but just setting 1 for now
			// var next = "next keyframe";
			// console.log("got keyframe?");

			// window.setTimeout(function(){
			// input = next;
			// console.log("set timeout");
			// console.log("")
			// }, 2000)




Keyframe
    .findAll()
    .then(function(keyframes) {
      console.log("keyframes:", keyframes); 
    })
    .then(function() {
      console.log("Fetched all keyframes succesfully");

    })
    .catch(function(err) {
      console.log("Error retrieving keyframes: ", err);
    });



		}
	}
});

// Pulled this from local db :p
// select id, filename, text_state from Keyframes where id = 68;
//require('/Users/randallwong/Desktop/FoundationsPrework/gitplayback/db/models/')(sequelize);
