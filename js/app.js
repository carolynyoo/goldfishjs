// var index = require('./db/models/index.js');
var fs = require('fs');
var app = angular.module('gitplayback', ['ui.router']);

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
			require('diff_match_patch_uncompressed.js');
			
			var dmp = new diff_match_patch();
			var diffsCreated = dmp.diff_main(text1, text2);
			console.log("Diffs Array Before:", diffsCreated);

//			currdiff = {added: diffsCreated[0][0], removed: diffsCreated[0,1]};
			// diff_main("Good dog", "Bad dog") => [(-1, "Goo"), (1, "Ba"), (0, "d dog")]

			var semDiffs = dmp.diff_cleanupSemantic(diffsCreated); // makes diffs human readable
			console.log("Semantic Diffs:", diffsCreated);

			// TODO: read into front end
			// var semDiffsString = JSON.stringify(semDiffs);
			// console.log("SemDiffsString:", semDiffsString);
			// console.log("SemDiffs[0][0][1]:", semDiffs[0][0][1]);
			// var firstElement = semDiffs[0][0][1];
			// return firstElement;

		}
	}
});

app.factory('KeyframeFactory', function () {
	return {
		getAllKeyframes: function() {
  		return Keyframe.find({}).sort({createdAt:1}).exec()
  		    .then(function(keyframes) {
  		      console.log("Fetched all keyframes succesfully");
  		      console.log("keyframes:", keyframes);
  		      return keyframes; 
  		    })
  		    .fail(function(err) {
  		      console.log("Error retrieving keyframes: ", err);
  		    })
      }
    }
  }
);
// this will eventually be an array, but just setting 1 for now
			// var next = "next keyframe";
			// console.log("got keyframe?");

			// window.setTimeout(function(){
			// input = next;
			// console.log("set timeout");
			// console.log("")
			// }, 2000)
		// },
		// playKeyframes: function(){
		// console.log("playframe: XXXXXXXXXX");

		// }

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
