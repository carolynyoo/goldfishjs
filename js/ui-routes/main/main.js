/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main', {
        url: '',
        controller: 'MainController',
        templateUrl: 'js/ui-routes/main/main.html'
    });

});

app.controller('MainController', function($scope, KeyframeFactory, nwguiFactory, GitDiffFactory) {
	
	$scope.framesArray = ['nothing'];
	$scope.currentFrame = "no current frame";
	$scope.firstFrame = "no current frame";

	$scope.diffsArray = "nothing";

	$scope.editor = "nothing";


	$scope.showFileTab = false;
	$scope.toggleActive = function() {
	console.log("scope.showFileTab", $scope.showFileTab);
	console.log("NG CLICK");
    $scope.showFileTab = $scope.showFileTab === false ? true: false;
    console.log("scope.showFileTab", $scope.showFileTab);
	};


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

	$scope.getall.then(function (data) {
		// Puts data from promise in framesArray
		$scope.framesArray = data;
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
	    $scope.editor.setValue($scope.currentFrame); // update editor
	    $scope.editor.navigateFileStart(); // return to top of file
	    $scope.branchName = $scope.framesArray[frameID+1].branch_name;
	    $scope.fileName = $scope.framesArray[frameID+1].filename;
	    $scope.lastCommit = $scope.framesArray[frameID+1].last_commit;
	    $scope.lastCommitTime = $scope.framesArray[frameID+1].last_commit_time;
	    $scope.currentFrameID += 1;
	    console.log("currframe after assigned:", currframe);
	//    $scope.$digest();
		}
	};

	$scope.backTenFrames = function(frameID){
		
		$scope.currentFrameID -= 10;
	    $scope.currentFrame = $scope.framesArray[frameID].text_state;
	    $scope.branchName = $scope.framesArray[frameID].branch_name;
	    $scope.fileName = $scope.framesArray[frameID].filename;
	    $scope.lastCommit = $scope.framesArray[frameID].last_commit;
	    $scope.lastCommitTime = $scope.framesArray[frameID].last_commit_time;
	    
	//    $scope.$digest();	

	};

	$scope.getall.then(function (data) {
		// Retrieves first frame
		$scope.firstFrame = data[0]["text_state"];   	
	});

	$scope.playFrame = "empty";
	// KeyframeFactory.playKeyframes();


	// Ace Editor Scope Variables
	
	$scope.aceLoaded = function(_editor) {
    // Options
    $scope.editor = _editor;
    // _editor.setTheme("ace/theme/solarized_light");
    _editor.setTheme("../../../bower_components/ace-builds/src-min-noconflict/theme-solarized_light.js");
 //   _editor.setMode("ace/mode/javascript"); // Will need to let user toggle this or sense file ext later
    _editor.setReadOnly(true);
    _editor.setValue($scope.currentFrame);
    _editor.navigateFileStart();
  	};

 	$scope.aceChanged = function(e) {
    //
  	};



	window.setTimeout(function(){
				
				//console.log("first frame:", $scope.firstFrame);
				console.log("first frame:", $scope.firstFrame);
				}, 1000)

});











