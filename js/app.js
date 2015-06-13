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

/// Require models
var models = require(dbPath);
var Keyframe = models.Keyframe;

app.controller('MainController', function ($scope, KeyframeFactory, nwguiFactory, GitDiffFactory) {

$scope.framesArray = ['nothing'];
$scope.currentFrame = "no current frame";

$scope.diffsArray = "nothing";


// Opens debugger window
var nwgui = nwguiFactory;
nwgui.Window.get().showDevTools();


//var folder_view = folderviewFactory;

// Gets all keyframes
$scope.getall = KeyframeFactory.getAllKeyframes();

$scope.framesArray = "empty";
$scope.currentFrameID = 0;

$scope.branchName = "branch name goes here";
$scope.fileName = "filename goes here";
$scope.lastCommit = "last commit hash goes here";
$scope.lastCommitTime = "which occurred at this time";

$scope.framesArray = $scope.getall.then(function (data) {
	
	//data[0]["dataValues"]["text_state"];
	var AllFramesArray = [];

	for (var i = 0; i < data.length; i++)
	{ 
	AllFramesArray.push(data[i]);
	}

	console.log("AllFramesArray:", AllFramesArray);
	$scope.framesArray = AllFramesArray;

	// $scope.firstFrame = data[0]["dataValues"]["text_state"];
 //   	$scope.$digest();
}); 

$scope.advanceFrame = function(frameID, currframe){

	$scope.diffsArray = GitDiffFactory.calculateDiff($scope.framesArray[frameID].text_state, $scope.framesArray[frameID+1].text_state);

	console.log("clicked and ran advanceFrame function");
    console.log("frameID:", frameID);
    console.log("currframe:", currframe);
    console.log("framesArrayLength: ",$scope.framesArray.length);
    if (frameID == $scope.framesArray.length - 1){
    	console.log("Got to last frame");
		$scope.currentFrame = "Frame " + frameID + " is the last frame!";
		$scope.$digest();
    }
    else{
    $scope.currentFrame = $scope.framesArray[frameID+1].text_state;
    $scope.branchName = $scope.framesArray[frameID+1].branch_name;
    $scope.fileName = $scope.framesArray[frameID+1].filename;
    $scope.lastCommit = $scope.framesArray[frameID+1].last_commit;
    $scope.lastCommitTime = $scope.framesArray[frameID+1].last_commit_time;
    $scope.currentFrameID += 1;
    console.log("currframe after assigned:", currframe);
    $scope.$digest();
	}
};


$scope.backTenFrames = function(frameID){
	
	$scope.currentFrameID -= 10;
    $scope.currentFrame = $scope.framesArray[frameID].text_state;
    $scope.branchName = $scope.framesArray[frameID].branch_name;
    $scope.fileName = $scope.framesArray[frameID].filename;
    $scope.lastCommit = $scope.framesArray[frameID].last_commit;
    $scope.lastCommitTime = $scope.framesArray[frameID].last_commit_time;
    
    $scope.$digest();	

};

$scope.firstFrame = $scope.getall.then(function (data) {
	 console.log("data in firstFrame:", data)
	// console.log("data[0]:", data[0]);
	// console.log("data[dataValues]:", data[0]["dataValues"]);
	 // console.log("data[dataValues][text_state]:", data[0]["dataValues"]["text_state"]);


	//data[0]["dataValues"]["text_state"];
	//data[0]["dataValues"]["text_state"];
	$scope.firstFrame = data[0]["text_state"];
   	$scope.$digest();
});

$scope.playFrame = "empty";
// KeyframeFactory.playKeyframes();


window.setTimeout(function(){
			
			//console.log("first frame:", $scope.firstFrame);
			console.log("first frame:", $scope.firstFrame);
			}, 1000)

 });


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
  		return Keyframe.find({}).exec()
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
