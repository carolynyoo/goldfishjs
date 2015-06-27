/*jslint node: true */
'use strict';

app.directive('viewer', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/viewer/viewer.html',
		// scope: {},
		controller: function ($scope, CommLinkFactory, KeyframeFactory) {

			$scope.editor = {};
			$scope.modelist = ace.require("ace/ext/modelist");
			$scope.mode = "";

			var onScrubberUpdateHandler = function (keyframe) {
				console.log("Pinged from the scrubber", keyframe);
				$scope.aceChanged(keyframe);
			};

			CommLinkFactory.onScrubberUpdate($scope, onScrubberUpdateHandler);
			
			// Listener registers when the file browser is updated. The very last keyframe is loaded by default.
	    //     var onFilebrowserUpdateHandler = function (file) {
	    //     	console.log("Pinged from the file browser:", file);
	    //     	KeyframeFactory.getFileKeyframes(file)
					// .then(function(keyframes) {
					// 	$scope.keyframes = keyframes;
					// 	$scope.mode = $scope.modelist.getModeForPath(file).mode;
			  //       	$scope.aceChanged(keyframes[keyframes.length-1], $scope.mode);
					// }).catch(function (err) {
					// 	console.log("Viewer: Single File Keyframe error in retrieval: ", err);
					// 	$scope.editor.setValue("Database: File history not found.");
					// });
	    //     };

	    //     CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);

	        // These functions are used to both load and then update the code editor, respectively
			$scope.aceLoaded = function (_editor) {
			    // Options
			    console.log("ACE LOADED");
			    _editor.setTheme("ace/theme/idle_fingers");
			 	// _editor.setMode("ace/mode/javascript"); // Will need to let user toggle this or sense file ext later
			    _editor.setReadOnly(true);
			    _editor.setValue($scope.currentFrame, 1);
			    _editor.$blockScrolling = Infinity;
			    _editor.navigateFileStart();
			    $scope.editor = _editor;
		  	};

	  		$scope.aceChanged = function (keyframe) {
			    console.log("ACE CHANGED");
			    // console.log("ACE Mode:  ", keyframe);
			    $scope.mode = $scope.modelist.getModeForPath(keyframe.filename).mode;
	  	   		$scope.editor.session.setMode($scope.mode);
	  	   		$scope.editor.setValue(keyframe.text_state, 1);
	  	   		$scope.editor.navigateFileStart();
	  	 	};

		}
	};
});






