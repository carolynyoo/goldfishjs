// var index = require('./db/models/index.js');
var fs = require('fs');
var app = angular.module('gitplayback', ['ui.router', 'ui.ace']);

var path = require('path');
var appPath = process.env.PWD;
console.log("apppath:", appPath);

var _ = require('lodash');

// Path to database
var dbPath = path.join(appPath, 'db/models');
console.log("dbpath:", dbPath);

// fs.readFile('./db/models/keyframe.js', function(err, file) {
// 	console.log('keyframe file', file);
// });

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    // $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    // $urlRouterProvider.when('/', '/main/projectbrowser/scrubber/viewer');
    // $urlRouterProvider.when('/projectbrowser', '/main/projectbrowser/scrubber/viewer');
    // $urlRouterProvider.when('/projectbrowser/scrubber', '/main/projectbrowser/scrubber/viewer');
    $urlRouterProvider.otherwise('/');
});

/// Require models
var models = require(dbPath);
var Keyframe = models.Keyframe;

app.factory('nwguiFactory', function(){
	var nwGui = require('nw.gui');
	return nwGui;
 });

// app.factory('folderviewFactory', function(){
// 	var folder_view = require('folder_view');
// 	return 5;
//  });

app.factory('GitDiffFactory', function(){
	
	return {

			// Returns an Array of Diffs

			calculateDiff: function(text1, text2){
			console.log("Text1:", text1);
			console.log("Text2:", text2);
			
			var dmp = new diff_match_patch();
			var diffsCreated = dmp.diff_main(text1, text2);
			console.log("Diffs Array Before:", diffsCreated);

//			currdiff = {added: diffsCreated[0][0], removed: diffsCreated[0,1]};
			// diff_main("Good dog", "Bad dog") => [(-1, "Goo"), (1, "Ba"), (0, "d dog")]

			dmp.diff_cleanupSemantic(diffsCreated); // makes diffs human readable
			console.log("Semantic Diffs:", diffsCreated);

			// Splice to new array - think original data might be a tuple
			var semDiffArray = [].splice.call(diffsCreated, 0);
			console.log("spliced array:", semDiffArray);
			
			console.log("semDiffArray[0]:", semDiffArray[0]);
			console.log("semDiffArray[0][0]:", semDiffArray[0][0]);

			console.log("THE DIFF:", semDiffArray[1][1]);

			// TODO: This will only get the first chunk
			// of the diff and not all of the diffs contained in the array

			// will later need to loop
			var textAdded = semDiffArray[1][1];
			var textSame = semDiffArray[0][1];

			// console.log("THE REMOVED:", semDiffArray[2][1]);
			// var textRemoved = semDiffArray[2][1];

			// var object = {"textAdded": textAdded, "textSame": textSame, "textRemoved": textRemoved};

			// TODO: This should eventually loop through array of diffs
			// But for now, I am reading into object and accessing directly
			// Array should run through and ng-repeat
			var object = {"textAdded": textAdded, "textSame": textSame, "textRemoved": "empty- fix this later"};

			return object;

		}
	}
});

app.factory('KeyframeFactory', function (CommLinkFactory) {
	var getAllKeyframes = function() {
		return Keyframe.find({}).sort({createdAt:1}).exec()
		    .then(function(keyframes) {
		      console.log("Fetched all keyframes succesfully");
		      console.log("keyframes:", keyframes);
		      return keyframes; 
		    })
		    .fail(function(err) {
		      console.log("Error retrieving keyframes: ", err);
			});
		};

	var updateKeyframe = function () {
		// placeholder for future use
	};

	var deleteKeyframe = function () {
		// placeholder for future use
	};

	return {
		getAllKeyframes: getAllKeyframes,
		updateKeyframe: updateKeyframe,
		deleteKeyframe: deleteKeyframe
    };
    
});

// Filter to convert datetime to human-readable
app.filter('datetime', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
  input = Number(input);
  var _date = $filter('date')(new Date(input),
                              'MMM dd yyyy - HH:mm:ss');
 
  return _date.toUpperCase();

 };
});
