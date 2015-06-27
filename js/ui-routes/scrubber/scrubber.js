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
			$scope.keyframeIndex = '';

			// Variables used to enable/disable scrubber buttons
			$scope.isFirstFrame = false;
			$scope.isLastFrame = false;
			$scope.isPlaying = false;

			// $scope.$watch('keyframeIndex', function (newVal, oldVal) {
			// 	console.log('KFI Watcher, New: ', newVal);
			// 	console.log('KFI Watcher, Old: ', oldVal);
			// 	$scope.goToKeyframe();
			// });

	        // On scrubber click, will broadcast the selected keyframe via commLink to other directives that are listening.
			$scope.broadcastKeyframeSelected = function () {
				console.log("Directive: scrubber keyframe select button clicked: ");
				CommLinkFactory.updateScrubber($scope.currentKeyframe);
			};
			
	        // Listener registers when the file browser is updated.
	   //      var onFilebrowserUpdateHandler = function (file) {
	   //      	console.log("Pinged from the file browser:", file);
	   //      	$scope.isLastFrame = true;
				// $scope.isFirstFrame = false;
	   //      	KeyframeFactory.getFileKeyframes(file)
				// 	.then(function(keyframes) {
			 //        	$scope.keyframes = keyframes;
			 //        	$scope.updatePointers(null, "end");
			 //        	// $scope.goToKeyframe();
			 //        	// $scope.$apply($scope.keyframeIndex);
			 //        	console.log("File Load: # of Frames: ", keyframes.length);
			 //        	console.log("File Load: Frame Index: ", $scope.keyframeIndex);
				// 	}).catch(function (err) {
				// 		console.log("Scrubber: Error retrieving File Keyframes: ", err);
				// 	});
	   //      };

	   //      CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);
			
	        $scope.goToKeyframe = function () {
	        	console.log("NG-CHANGE/CLICK on SLIDER: ", $scope.keyframeIndex);
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
	        	console.log("goToKeyframe $scope.currentKeyframe", $scope.currentKeyframe);
				$scope.broadcastKeyframeSelected();
	        };

			$scope.nextKeyframe = function(keyframe){
				$scope.isFirstFrame = false;
				$scope.keyframeIndex = $scope.getKeyframeIndex(keyframe);
				$scope.$apply($scope.keyframeIndex);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);
			    
			    if ($scope.keyframeIndex === $scope.keyframes.length - 1){
			    	console.log("@ Last Keyframe");
			    	$scope.updatePointers(null, "end");
					$scope.pause();
			    } else {
				    $scope.updatePointers(1, "advance");
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

			    if (($scope.keyframes.length - $scope.keyframeIndex) < 10) {
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
			    
			    if ($scope.keyframeIndex < 10) {
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
     			console.log('scope.keyframes is', $scope.keyframes)
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

     			console.log("Pointer Update: KFI = ", $scope.keyframeIndex);
     			console.log("Current Keyframe:     ", $scope.currentKeyframe);
     		};
     		$scope.updatePointers(null, "end");
			$scope.broadcastKeyframeSelected();
     		
		}
	};
});











