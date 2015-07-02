/*jslint node: true */
'use strict';

var _ = require('lodash');

app.directive('scrubber', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/scrubber.html',
		// scope: {},
		controller: function ($scope, CommLinkFactory, KeyframeFactory, GitDiffFactory) {

			// $scope.keyframes = [];
			$scope.diffsArray = [];
			$scope.currentKeyframe = {};
			$scope.priorFrame = {};
			$scope.keyframeIndex = '';

			// Variables used to enable/disable scrubber buttons
			$scope.isFirstFrame = false;
			$scope.isLastFrame = false;
			$scope.isPlaying = false;

			// Variables used for varioius modes
			$scope.diffMode = true;

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
				$scope.broadcastKeyframeSelected();
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
				
				if($scope.diffMode) {
					$scope.diffsArray = GitDiffFactory.calculateDiff($scope.priorFrame.text_state, $scope.currentKeyframe.text_state);
					console.log("---> Scrubber: Diffs Array", $scope.diffsArray);
					$scope.currentKeyframe.diffsArray = $scope.diffsArray;
					$scope.currentKeyframe.diffMode = $scope.diffMode;
				}
				$scope.broadcastKeyframeSelected();
			};

			$scope.previousKeyframe = function(keyframe) {
				$scope.isLastFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);
			    
			    if ($scope.keyframeIndex === 0){
			    	console.log("@ First Keyframe");
			    	$scope.updatePointers(null, "start");
					$scope.pause();
			    } else {
				    $scope.updatePointers(1);
				}

				$scope.broadcastKeyframeSelected();
			};

	        $scope.advanceTenFrames = function(keyframe){
	        	$scope.isFirstFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

		    	console.log("kf.length: ", $scope.keyframes.length);
		    	console.log("kf.index:  ", $scope.keyframeIndex);
			    if ((($scope.keyframes.length - 1) - $scope.keyframeIndex) <= 10) {
			    	$scope.updatePointers(null, "end");
			    } else {
				    $scope.updatePointers(10, "advance");
				}

				$scope.broadcastKeyframeSelected();
	        };

	        $scope.backTenFrames = function(keyframe){
	        	$scope.isLastFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);
			    
			    if ($scope.keyframeIndex <= 10) {
			    	$scope.updatePointers(null, "start");
			    } else {
				    $scope.updatePointers(10);
				}

				$scope.broadcastKeyframeSelected();
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
	     			}, 250);
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
     			} else {
     				$scope.keyframeIndex -= step;
     			}
     			
     			$scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex];
				$scope.broadcastKeyframeSelected();
     		};
     		$scope.updatePointers(null, "end");

		}
	};
});











