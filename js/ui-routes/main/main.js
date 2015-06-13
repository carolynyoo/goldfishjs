/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main', {
        url: '',
        controller: 'MainController',
        templateUrl: 'js/ui-routes/main/main.html'
    });

});

app.controller('MainController', function($scope, KeyframeFactory, nwguiFactory) {
	
	// $scope.framesArray = ['nothing'];
	// $scope.currentFrame = "no current frame";

	// // Opens debugger window
	// var nwgui = nwguiFactory;
	// nwgui.Window.get().showDevTools();

	// //var folder_view = folderviewFactory;

	// // Gets all keyframes
	// $scope.getall = KeyframeFactory.getAllKeyframes();

	// $scope.framesArray = "empty";
	// $scope.currentFrameID = 0;

	// $scope.branchName = "branch name goes here";
	// $scope.fileName = "filename goes here";
	// $scope.lastCommit = "last commit hash goes here";
	// $scope.lastCommitTime = "which occurred at this time";

	// $scope.framesArray = $scope.getall.then(function (data) {
		
	// 	//data[0]["dataValues"]["text_state"];
	// 	var AllFramesArray = [];

	// 	for (var i = 0; i < data.length; i++)
	// 	{ 
	// 	AllFramesArray.push(data[i]);
	// 	}

	// 	console.log("AllFramesArray:", AllFramesArray);
	// 	$scope.framesArray = AllFramesArray;

	// 	// $scope.firstFrame = data[0]["dataValues"]["text_state"];
	//  //   	$scope.$digest();
	// });

	// $scope.advanceFrame = function(frameID, currframe){
	// 	console.log("clicked and ran advanceFrame function");
	//     console.log("frameID:", frameID);
	//     console.log("currframe:", currframe);
	//     console.log("framesArrayLength: ",$scope.framesArray.length);
	//     if (frameID == $scope.framesArray.length - 1){
	//     	console.log("Got to last frame");
	// 		$scope.currentFrame = "Frame " + frameID + " is the last frame!";
	// 		$scope.$digest();
	//     }
	//     else{
	//     $scope.currentFrame = $scope.framesArray[frameID+1].text_state;
	//     $scope.branchName = $scope.framesArray[frameID+1].branch_name;
	//     $scope.fileName = $scope.framesArray[frameID+1].filename;
	//     $scope.lastCommit = $scope.framesArray[frameID+1].last_commit;
	//     $scope.lastCommitTime = $scope.framesArray[frameID+1].last_commit_time;
	//     $scope.currentFrameID += 1;
	//     console.log("currframe after assigned:", currframe);
	//     $scope.$digest();
	// 	}

	// };


	// $scope.backTenFrames = function(frameID){
		
	// 	$scope.currentFrameID -= 10;
	//     $scope.currentFrame = $scope.framesArray[frameID].text_state;
	//     $scope.branchName = $scope.framesArray[frameID].branch_name;
	//     $scope.fileName = $scope.framesArray[frameID].filename;
	//     $scope.lastCommit = $scope.framesArray[frameID].last_commit;
	//     $scope.lastCommitTime = $scope.framesArray[frameID].last_commit_time;
	    
	//     $scope.$digest();	

	// };

	// $scope.firstFrame = $scope.getall.then(function (data) {
	// 	 console.log("data in firstFrame:", data)
	// 	// console.log("data[0]:", data[0]);
	// 	// console.log("data[dataValues]:", data[0]["dataValues"]);
	// 	 console.log("data[dataValues][text_state]:", data[0]["dataValues"]["text_state"]);


	// 	//data[0]["dataValues"]["text_state"];
	// 	data[0]["dataValues"]["text_state"];
	// 	$scope.firstFrame = data[0]["dataValues"]["text_state"];
	//    	$scope.$digest();
	// });

	// $scope.playFrame = "empty";
	// KeyframeFactory.playKeyframes();


	// window.setTimeout(function(){
	// 	//console.log("first frame:", $scope.firstFrame);
	// 	console.log("first frame:", $scope.firstFrame);
	// }, 1000)

});