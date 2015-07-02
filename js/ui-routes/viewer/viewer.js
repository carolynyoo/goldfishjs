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
			$scope.additionMarker = null;
			$scope.deletionMarker = null;

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
	  			var marker = null;
	  			var lineCounter = 0;
	  			var text = "";

	  			console.log("Piggy-Backing Diffs: ", keyframe.diffsArray);

	  			$scope.editor.getSession().removeMarker($scope.additionMarker);
	  			$scope.editor.getSession().removeMarker($scope.deletionMarker);
	  			
	  			// if($scope.diffMode) {
		  			// keyframe.diffsArray.forEach(function(changeObj) {
		  			// 	text += changeObj.value;

		  			// 	if(changeObj.added) {
		  			// 		$scope.additionMarker = $scope.editor.getSession().addMarker(new Range(lineCounter+1, 0, lineCounter+1+changeObj.count, 0), "addition", "line");
		  			// 	}
		  			// 	if(changeObj.removed) {
		  			// 		$scope.deletionMarker = $scope.editor.getSession().addMarker(new Range(lineCounter+1, 0, lineCounter+1+changeObj.count, 0), "deletion", "line");
		  			// 	}

		  			// 	lineCounter += changeObj.count;	
		  			// });

	  	   // 			$scope.editor.setValue(text, 1);

	  			// } else {
	  				
	  			// }
	  			
			    $scope.mode = $scope.modelist.getModeForPath(keyframe.filename).mode;
	  	   		$scope.editor.session.setMode($scope.mode);
	  	   		$scope.editor.setValue(keyframe.text_state, 1);
	  	   		$scope.editor.navigateFileStart();
	  	 	};

		}
	};
});






