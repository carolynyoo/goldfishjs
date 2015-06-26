app.controller('MainController', function($scope, KeyframeFactory, nwguiFactory, GitDiffFactory) {
	
	// $scope.framesArray = ['nothing'];
	// $scope.currentFrame = "no current frame";
	$scope.firstFrame = "no current frame";
	$scope.diffsArray = "nothing";
	$scope.editor = "nothing";
	$scope.showFileTab = false;
	// Gets all keyframes
	$scope.getall = KeyframeFactory.getAllKeyframes();
	$scope.framesArray = "empty";
	$scope.branchName = "branch name goes here";
	$scope.fileName = "filename goes here";
	$scope.lastCommit = "last commit hash goes here";
	$scope.lastCommitTime = "which occurred at this time";
	$scope.playFrame = "empty";


	// $scope.example = function () {
	// 	console.log("for isolate scope test");
	// };

	// Opens debugger window
	var nwgui = nwguiFactory;
	nwgui.Window.get().showDevTools();

	//var folder_view = folderviewFactory;

});