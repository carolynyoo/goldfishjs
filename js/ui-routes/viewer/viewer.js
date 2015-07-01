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
			var Range = ace.require("ace/range").Range;
			console.log("ACE Range: ", Range);
			$scope.mode = "";

			var onScrubberUpdateHandler = function (keyframe) {
				$scope.aceChanged(keyframe);
			};

			CommLinkFactory.onScrubberUpdate($scope, onScrubberUpdateHandler);

	        // These functions are used to both load and then update the code editor, respectively
			$scope.aceLoaded = function (_editor) {
			    // Options
			    _editor.setTheme("ace/theme/idle_fingers");
			 	// _editor.setMode("ace/mode/javascript"); // Will need to let user toggle this or sense file ext later
			    _editor.setReadOnly(true);
			    _editor.setValue($scope.currentFrame, 1);
			    _editor.$blockScrolling = Infinity;
			    _editor.navigateFileStart();
			    $scope.editor = _editor;
		  	};

	  		$scope.aceChanged = function (keyframe) {
	  			// $scope.editor.getSession().removeMarker(marker);
	  			var marker = new Range(2, 2, 5, 5);
	  			console.log("Ranger Marker: ", marker);
	  			$scope.editor.getSession().addMarker(marker, "deletion", "text");
	  			// $scope.editor.addMarker(new Range(), "addition", "line", true);
			    $scope.mode = $scope.modelist.getModeForPath(keyframe.filename).mode;
	  	   		$scope.editor.session.setMode($scope.mode);
	  	   		$scope.editor.setValue(keyframe.text_state, 1);
	  	   		$scope.editor.navigateFileStart();
	  	 	};

		}
	};
});






