/*jslint node: true */
'use strict';

app.directive('viewer', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/viewer/viewer.html',
		controller: function ($scope, CommLinkFactory, KeyframeFactory) {

			$scope.aceLoaded = function(_editor) {
			    // Options
			    $scope.editor = _editor;
			    _editor.setTheme("ace/theme/solarized_light");
			    // _editor.setTheme("../../../bower_components/ace-builds/src-min-noconflict/theme-solarized_light.js");
			 //   _editor.setMode("ace/mode/javascript"); // Will need to let user toggle this or sense file ext later
			    _editor.setReadOnly(true);
			    _editor.setValue($scope.currentFrame);
			    _editor.$blockScrolling = Infinity;
			    _editor.navigateFileStart();
		  	};
		  	
			var onScrubberUpdateHandler = function (keyframe) {
				console.log("Pinged from the scrubber", keyframe);
			};

			CommLinkFactory.onScrubberUpdate($scope, onScrubberUpdateHandler);

		}
	};
});






