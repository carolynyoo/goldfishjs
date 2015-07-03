/*jslint node: true */
'use strict';

app.directive('viewer', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/viewer/viewer.html',
		// scope: {},
		controller: function ($scope, CommLinkFactory, SettingsFactory) {

			$scope.editor = {};
			$scope.modelist = ace.require("ace/ext/modelist");
			var Range = ace.require("ace/range").Range;
			$scope.mode = "";
			$scope.additionMarker = [];
			$scope.deletionMarker = [];

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
	  			var lineCounter = 0;
	  			var text = "";

	  			// console.log(":::received KEYFRAME: ", keyframe);
	  			console.log(":::>Viewer: SF.diffMode: ", SettingsFactory.getMode());

	  			if($scope.additionMarker.length >= 1) {
	  				$scope.additionMarker.forEach(function(marker, index){
		  				$scope.editor.getSession().removeMarker($scope.additionMarker[index]);
	  				});
	  				$scope.additionMarker = [];
	  			}

	  			if($scope.deletionMarker.length >= 1) {
	  				$scope.deletionMarker.forEach(function(marker, index){
		  				$scope.editor.getSession().removeMarker($scope.deletionMarker[index]);
	  				});
	  				$scope.deletionMarker = [];
	  			}

	  			if(SettingsFactory.getMode()) {

	  				console.log("editor diffmode hit");

	  				$scope.deletionMarker.forEach(function(marker, index){
		  				$scope.editor.getSession().removeMarker($scope.deletionMarker[index]);
	  				});
	  			
		  			keyframe.diffsArray.forEach(function(changeObj, index) {
		  				text += changeObj.value;

		  				if(changeObj.added) {
		  					$scope.additionMarker[index] = $scope.editor.getSession().addMarker(new Range(lineCounter, 0, lineCounter+changeObj.count, 0), "addition", "line");
		  				}
		  				if(changeObj.removed) {
		  					$scope.deletionMarker[index] = $scope.editor.getSession().addMarker(new Range(lineCounter, 0, lineCounter+changeObj.count, 0), "deletion", "line");
		  				}

		  				lineCounter += changeObj.count;	
		  			});

	  	   			$scope.editor.setValue(text, 1);

	  			} else {	
	  	   			$scope.editor.setValue(keyframe.text_state, 1);
	  			}
	  			
			    $scope.mode = $scope.modelist.getModeForPath(keyframe.filename).mode;
	  	   		$scope.editor.session.setMode($scope.mode);
	  	   		$scope.editor.navigateFileStart();
	  	 	};

		}
	};
});






