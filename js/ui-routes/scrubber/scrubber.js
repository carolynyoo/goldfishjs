/*jslint node: true */
'use strict';

var _ = require('lodash');

app.directive('scrubber', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/scrubber.html',
		// scope: {},
		controller: function ($scope, CommLinkFactory, GitDiffFactory, SettingsFactory) {

			// $scope.keyframes = [];
			$scope.diffsArray = [];
			$scope.currentKeyframe = {};
			$scope.priorFrame = {};
			$scope.keyframeIndex = '';

			// Variables used to enable/disable scrubber buttons
			$scope.isFirstFrame = false;
			$scope.isLastFrame = false;
			$scope.isPlaying = false;

			// Initialize setting variables
			$scope.diffSwitch = SettingsFactory.getMode();
			$scope.infoSwitch = SettingsFactory.getInfoMode();

			$scope.switchDiffMode = function () {
				SettingsFactory.switchMode();
				console.log("Diff Mode turned: ", SettingsFactory.getMode());
			};

			$scope.switchInfoMode = function () {
				SettingsFactory.switchInfoMode();
				console.log("File Info Mode turned: ", SettingsFactory.getInfoMode());
			};

	        // On scrubber click, will broadcast the selected keyframe via commLink to other directives that are listening.
			$scope.broadcastKeyframeSelected = function () {
				CommLinkFactory.updateScrubber($scope.currentKeyframe);
			};
			
	        $scope.goToKeyframe = function () {
	        	$scope.pause();
	        	$scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex];

				$scope.isLastFrame = false;
				$scope.isFirstFrame = false;
				if ($scope.keyframeIndex === 0) {
					$scope.isFirstFrame = true;
				}
				if ($scope.keyframeIndex === $scope.keyframes.length-1) {
					$scope.isLastFrame = true;
				}

				if (SettingsFactory.getMode()) {
					$scope.makeDiff();
				} else {
					$scope.broadcastKeyframeSelected();
				}

				$scope.currentKeyframe.diffsArray = null;
	        };

			$scope.nextKeyframe = function(keyframe){
				$scope.isFirstFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);
				$scope.$apply($scope.keyframeIndex);

			    if ($scope.keyframeIndex === $scope.keyframes.length - 1){
			    	console.log("@ Last Keyframe");
			    	$scope.updatePointers(null, "end");
					$scope.pause();
			    } else {
				    $scope.updatePointers(1, "advance");
				}
				
				if (SettingsFactory.getMode()) {
					$scope.makeDiff();
				} else {
					$scope.broadcastKeyframeSelected();
				}

				$scope.currentKeyframe.diffsArray = null;

			};

			$scope.previousKeyframe = function(keyframe) {
				$scope.isLastFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);
			    
			    if ($scope.keyframeIndex === 0){
			    	console.log("@ First Keyframe");
			    	$scope.updatePointers(null, "start");
					$scope.pause();
			    } else {
				    $scope.updatePointers(1);
				}

				if (SettingsFactory.getMode()) {
					$scope.makeDiff();
				} else {
					$scope.broadcastKeyframeSelected();
				}

				$scope.currentKeyframe.diffsArray = null;
			};

	        $scope.advanceTenFrames = function(keyframe){
	        	$scope.isFirstFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

		    	console.log("kf.length: ", $scope.keyframes.length);
		    	console.log("kf.index:  ", $scope.keyframeIndex);
			    if ((($scope.keyframes.length - 1) - $scope.keyframeIndex) <= 10) {
			    	$scope.updatePointers(null, "end");
			    } else {
				    $scope.updatePointers(10, "advance");
				}

				if (SettingsFactory.getMode()) {
					$scope.makeDiff();
				} else {
					$scope.broadcastKeyframeSelected();
				}
				
				$scope.currentKeyframe.diffsArray = null;
	        };

	        $scope.backTenFrames = function(keyframe){
	        	$scope.isLastFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

			    if ($scope.keyframeIndex <= 10) {
			    	$scope.updatePointers(null, "start");
			    } else {
				    $scope.updatePointers(10);
				}

				if (SettingsFactory.getMode()) {
					$scope.makeDiff();
				} else {
					$scope.broadcastKeyframeSelected();
				}
				
				$scope.currentKeyframe.diffsArray = null;
	        };

	        $scope.getKeyframeIndex = function (keyframe) {
	        	return _.findIndex($scope.keyframes, {_id: keyframe._id});
	        };

    		$scope.playIntervalId = {};

     		$scope.play = function () {
     			//seconds is a variable we should use at a later time to allow speed adjustment
     			// var delay = seconds * 1000;
	     			$scope.isPlaying = true;
	     			$scope.isFirstFrame = false;
	     			$scope.playIntervalId = setInterval(function () {
		     			$scope.nextKeyframe($scope.currentKeyframe);
	     			}, 750);
     		};

     		$scope.pause = function () {
     			$scope.isPlaying = false;
     			$scope.$apply(clearInterval($scope.playIntervalId));
     		};

     		$scope.updatePointers = function (step, position) {
     			$scope.priorFrame = $scope.currentKeyframe;

     			if (position === "advance") {
     				$scope.keyframeIndex += step;
     			} else if (position === "start") {
     				$scope.keyframeIndex = 0;
     				$scope.isFirstFrame = true;
     			} else if (position === "end") {
     				$scope.keyframeIndex = $scope.keyframes.length-1;
     				$scope.isLastFrame = true;
     				if(SettingsFactory.getMode()) {
						$scope.broadcastKeyframeSelected();
     				}
     			} else {
     				$scope.keyframeIndex -= step;
     			}
     			
     			$scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex];
				
				// This broadcast needs to be executed when a file is first loaded
     			if(!SettingsFactory.getMode()) {
					$scope.broadcastKeyframeSelected();
     			}

     		};

     		$scope.makeDiff = function () {
 				return GitDiffFactory.calculateDiff($scope.priorFrame.text_state, $scope.currentKeyframe.text_state)
 					.then(function(difference) {
 						$scope.currentKeyframe.diffsArray = difference;
 					}).then(function() {
						$scope.broadcastKeyframeSelected();
 					}).catch(function(err) {
 						console.log("GitDiffFactory Returns Error: ", err);
 					});
     		};

     		$scope.updatePointers(null, "end");

		}
	};
});











