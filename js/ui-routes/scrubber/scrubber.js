/*jslint node: true */
'use strict';

var _ = require('lodash');

app.directive('scrubber', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/scrubber.html',
		scope: {},
		controller: function ($scope, CommLinkFactory, KeyframeFactory, GitDiffFactory) {

			$scope.keyframes = [];
			$scope.diffsArray = [];
			$scope.currentKeyframe = {};
			$scope.keyframeIndex = '';

			// Variables used to enable/disable scrubber buttons
			$scope.isFirstFrame = false;
			$scope.isLastFrame = false;
			$scope.isPlaying = false;

	        // On scrubber click, will broadcast the selected keyframe via commLink to other directives that are listening.
			$scope.broadcastKeyframeSelected = function () {
				console.log("Directive: scrubber keyframe select button clicked: ");
				CommLinkFactory.updateScrubber($scope.currentKeyframe);
			};
			
	        // Listener registers when the file browser is updated.
	        var onFilebrowserUpdateHandler = function (file) {
	        	console.log("Pinged from the file browser:", file);
	        	$scope.isLastFrame = true;
				$scope.isFirstFrame = false;
	        	KeyframeFactory.getFileKeyframes(file)
					.then(function(keyframes) {
			        	$scope.keyframes = keyframes;
			        	$scope.currentKeyframe = keyframes[keyframes.length - 1];
			        	$scope.keyframeIndex = $scope.getKeyframeIndex($scope.currentKeyframe);
			        	// $scope.$apply($scope.keyframeIndex);
			        	console.log("# of Frames: ", keyframes.length);
			        	console.log("Frame Index: ", $scope.keyframeIndex);
					}).catch(function (err) {
						console.log("Scrubber: Single File Keyframe error in retrieval: ", err);
					});
	        };

	        CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);
			
	        $scope.goToKeyframe = function () {
	        	console.log("goToKeyframe $scope.goToKeyframe", $scope.keyframeIndex);
	        	$scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex-1];
				$scope.broadcastKeyframeSelected();

				$scope.isLastFrame = false;
				$scope.isFirstFrame = false;
				if ($scope.keyframeIndex === 0) {
					$scope.isFirstFrame = true;
				}
				if ($scope.keyframeIndex === $scope.keyframes.length-1) {
					$scope.isLastFrame = true;
				}
	        	console.log("goToKeyframe $scope.currentKeyframe", $scope.currentKeyframe);
	        };

			$scope.nextKeyframe = function(keyframe){
				$scope.isFirstFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);
				// $scope.$apply($scope.keyframeIndex);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);
			    
			    if ($scope.keyframeIndex === $scope.keyframes.length - 1){
			    	console.log("@ Last Keyframe");
					$scope.currentKeyframe = $scope.keyframes[$scope.keyframes.length - 1];
					$scope.isLastFrame = true;
					$scope.pause();
					console.log("nextKeyframe executed, index is: ", $scope.keyframeIndex);
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex + 1];
					console.log("nextKeyframe executed, index is: ", $scope.keyframeIndex);
				}

				$scope.broadcastKeyframeSelected();
			};

			$scope.previousKeyframe = function(keyframe) {
				$scope.isLastFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    // console.log("keyframe:", keyframe);
			    // console.log("keyframe:", $scope.keyframes);
			    // console.log("$scope.diffsArray : ", $scope.diffsArray);
			    
			    if ($scope.keyframeIndex === 0){
			    	console.log("@ First Keyframe");
					$scope.currentKeyframe = $scope.keyframes[0];
					$scope.isFirstFrame = true;
					$scope.pause();
					console.log("previousKeyframe executed, index is: ", $scope.keyframeIndex);
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex - 1];
				    console.log("New Current Keyframe:", $scope.currentKeyframe);
					console.log("previousKeyframe executed, index is: ", $scope.keyframeIndex);
				}

				$scope.broadcastKeyframeSelected();
			};

	        $scope.advanceTenFrames = function(keyframe){
	        	$scope.isFirstFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    
			    if (($scope.keyframes.length - $scope.keyframeIndex) < 10) {
			    	$scope.keyframeIndex = $scope.keyframes.length;
			    	$scope.currentKeyframe = $scope.keyframes[$scope.keyframes.length-1];
				    console.log("Less than ten frames remaining, default to last frame:", $scope.currentKeyframe);
					console.log("advanceTenFrames executed, index is: ", $scope.keyframeIndex);
					$scope.isLastFrame = true;
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex + 10];
				    // console.log("New Current Keyframe:", $scope.currentKeyframe);
					console.log("advanceTenFrames executed, index is: ", $scope.keyframeIndex);
				}

				$scope.broadcastKeyframeSelected();
	        };

	        $scope.backTenFrames = function(keyframe){
	        	$scope.isLastFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    
			    if ($scope.keyframeIndex < 10) {
			    	$scope.keyframeIndex = 0;
			    	$scope.currentKeyframe = $scope.keyframes[0];
				    console.log("Less than ten frames remaining, default to first frame:", $scope.currentKeyframe);
					console.log("previousKeyframe executed, index is: ", $scope.keyframeIndex);
					$scope.isFirstFrame = true;
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex - 10];
					console.log("previousKeyframe executed, index is: ", $scope.keyframeIndex);
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
	     			}, 500);
     		};

     		$scope.pause = function () {
     			$scope.isPlaying = false;
     			$scope.$apply(clearInterval($scope.playIntervalId));
     		};

		}
	};
});











