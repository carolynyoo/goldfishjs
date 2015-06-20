app.controller('MainController', function($scope, KeyframeFactory, nwguiFactory, GitDiffFactory) {
	
	// $scope.framesArray = ['nothing'];
	// $scope.currentFrame = "no current frame";
	$scope.firstFrame = "no current frame";
	$scope.diffsArray = "nothing";
	$scope.editor = "nothing";
	$scope.showFileTab = false;

	$scope.toggleActive = function() {
		// console.log("scope.showFileTab", $scope.showFileTab);
		// console.log("NG CLICK");
	    
	    $scope.showFileTab = $scope.showFileTab === false ? true: false;
	    // console.log("scope.showFileTab", $scope.showFileTab);
	};

	// $scope.example = function () {
	// 	console.log("for isolate scope test");
	// };

	// Opens debugger window
	var nwgui = nwguiFactory;
	nwgui.Window.get().showDevTools();

	//var folder_view = folderviewFactory;

	// Gets all keyframes
	$scope.getall = KeyframeFactory.getAllKeyframes();

	$scope.framesArray = "empty";
	// $scope.currentFrameID = 0;
	$scope.branchName = "branch name goes here";
	$scope.fileName = "filename goes here";
	$scope.lastCommit = "last commit hash goes here";
	$scope.lastCommitTime = "which occurred at this time";

	// $scope.getall.then(function (data) {
	// 	// Puts data from promise in framesArray
	// 	$scope.framesArray = data;
	// }); 

	// $scope.getall.then(function (data) {
	// 	// Retrieves first frame
	// 	$scope.firstFrame = data[0]["text_state"];   	
	// });

	$scope.playFrame = "empty";
	// KeyframeFactory.playKeyframes();


	// Ace Editor Scope Variables
	
	// $scope.aceLoaded = function(_editor) {
	//     // Options
	//     $scope.editor = _editor;
	//     _editor.setTheme("ace/theme/solarized_light");
	//     // _editor.setTheme("../../../bower_components/ace-builds/src-min-noconflict/theme-solarized_light.js");
	//  //   _editor.setMode("ace/mode/javascript"); // Will need to let user toggle this or sense file ext later
	//     _editor.setReadOnly(true);
	//     _editor.setValue($scope.currentFrame);
	//     _editor.$blockScrolling = Infinity;
	//     _editor.navigateFileStart();
 //  	};

 	$scope.aceChanged = function(e) {
    //
  	};

	// window.setTimeout(function(){
	// 	//console.log("first frame:", $scope.firstFrame);
	// 	console.log("first frame:", $scope.firstFrame);
	// }, 1000);

});