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
			$scope.keyframeIndex = 0;

			// Variables used to enable/disable scrubber buttons
			$scope.isFirstFrame = false;
			$scope.isLastFrame = false;

			var onKeyframeUpdateHandler = function() {
	            $scope.keyframes = KeyframeFactory.getAllKeyframes();
	        };

	        CommLinkFactory.onDataUpdated($scope, onKeyframeUpdateHandler);

	        // On scrubber click, will broadcast the selected keyframe via commLink to other directives that are listening.
			$scope.broadcastKeyframeSelected = function () {
				console.log("Directive: scrubber keyframe select button clicked: ");
				CommLinkFactory.updateScrubber($scope.currentKeyframe);
				console.log("CommLinkFactory.updatedScrubber, currentKeyframe: ", $scope.currentKeyframe);
			};
			
	        // Listener registers when the file browser is updated.
	        var onFilebrowserUpdateHandler = function (file) {
	        	console.log("Pinged from the file browser:", file);
	        	KeyframeFactory.getFileKeyframes(file)
					.then(function(keyframes) {
			        	$scope.currentKeyframe = keyframes[keyframes.length - 1];
			        	$scope.keyframes = keyframes;
					}).catch(function (err) {
						console.log("Scrubber: Single File Keyframe error in retrieval: ", err);
					});
	        };

	        CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);

	        var onScrubberUpdate = function($scope, handler) {
	              $scope.$on(scrubberUpdateEvent, function(event, args) {
	                  handler(args.item);
	              	});
	          };		

			$scope.nextKeyframe = function(keyframe){
				$scope.isFirstFrame = false;
				var keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    // console.log("keyframe:", keyframe);
			    // console.log("keyframe:", $scope.keyframes);
			    // console.log("$scope.diffsArray : ", $scope.diffsArray);
			    
			    // ASK: why the inconsistency here
			    if (keyframeIndex === $scope.keyframes.length - 1){
			    	console.log("@ Last Keyframe");
					$scope.currentKeyframe = $scope.keyframes[$scope.keyframes.length - 1];
					$scope.isLastFrame = true;
					console.log("nextKeyframe executed, index is: ", keyframeIndex);
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[keyframeIndex + 1];
					console.log("nextKeyframe executed, index is: ", keyframeIndex);
				}

				$scope.broadcastKeyframeSelected();
			};

			$scope.previousKeyframe = function(keyframe) {
				$scope.isLastFrame = false;
				var keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    // console.log("keyframe:", keyframe);
			    // console.log("keyframe:", $scope.keyframes);
			    // console.log("$scope.diffsArray : ", $scope.diffsArray);
			    
			    if (keyframeIndex === 0){
			    	console.log("@ First Keyframe");
					$scope.currentKeyframe = $scope.keyframes[0];
					$scope.isFirstFrame = true;
					console.log("previousKeyframe executed, index is: ", keyframeIndex);
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[keyframeIndex - 1];
				    console.log("New Current Keyframe:", $scope.currentKeyframe);
					console.log("previousKeyframe executed, index is: ", keyframeIndex);
				}

				$scope.broadcastKeyframeSelected();
			};


			// Scrubbing playhead appropriately updates current keyframe
			$scope.setKeyframeToPlayhead = function(keyframe){
				$scope.isFirstFrame = false;
				$scope.isLastFrame = false;
				// Gets current keyframe index
//				var keyframeIndex = $scope.getKeyframeIndex(keyframe);
				$scope.keyframeIndex = keyframe; // use actual integer instead of function
				console.log("KeyframeIndex after setKeyframeToPlayhead called:", $scope.keyframeIndex);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    // console.log("keyframe:", keyframe);
			    // console.log("keyframe:", $scope.keyframes);
			    // console.log("$scope.diffsArray : ", $scope.diffsArray);
			    

			    if ($scope.keyframeIndex === 0){
			    	console.log("@ First Keyframe");
					$scope.currentKeyframe = $scope.keyframes[0];
					$scope.isFirstFrame = true;
					console.log("previousKeyframe executed, index is: ", $scope.keyframeIndex);
			    }

			    // Scrubber is currently too many units long
			    // If user scrubs past "present" ex: 200 of 100 frame values
			    else if ($scope.keyframeIndex >= ($scope.keyframes.length - 1)){
			    	console.log("@ Last Keyframe");
			    	// then keyframe is set to "present" time, last keyframe
					$scope.currentKeyframe = $scope.keyframes[$scope.keyframes.length - 1];
					$scope.keyframeIndex = $scope.keyframes.length - 1;
					$scope.isLastFrame = true;
					console.log("nextKeyframe executed, index is: ", $scope.keyframeIndex);
					// Todo:
					// Update playhead on scrubber UI to last keyframe value

			    } else {
			    	// else update current keyframe to playhead
				    $scope.currentKeyframe = $scope.keyframes[$scope.keyframeIndex]; // this works if pulled out chronologically
					console.log("Keyframe index after scrubber update is: ", $scope.keyframeIndex);
				}
				// verify update
				// call onScrubberUpdate function from CommlinkFactory
				$scope.broadcastKeyframeSelected();
			};



	        $scope.advanceTenFrames = function(keyframe){
	        	$scope.isLastFrame = false;
				var keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    
			    if (($scope.keyframes.length - keyframeIndex) < 10) {
			    	keyframeIndex = $scope.keyframes.length;
			    	$scope.currentKeyframe = $scope.keyframes[$scope.keyframes.length-1];
				    console.log("Less than ten frames remaining, default to last frame:", $scope.currentKeyframe);
					console.log("advanceTenFrames executed, index is: ", keyframeIndex);
					$scope.isLastFrame = true;
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[keyframeIndex + 10];
				    // console.log("New Current Keyframe:", $scope.currentKeyframe);
					console.log("advanceTenFrames executed, index is: ", keyframeIndex);
				}

				$scope.broadcastKeyframeSelected();
	        };

	        $scope.backTenFrames = function(keyframe){
	        	$scope.isLastFrame = false;
				var keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

			    
			    if (keyframeIndex < 10) {
			    	keyframeIndex = 0;
			    	$scope.currentKeyframe = $scope.keyframes[0];
				    console.log("Less than ten frames remaining, default to first frame:", $scope.currentKeyframe);
					console.log("previousKeyframe executed, index is: ", keyframeIndex);
					$scope.isFirstFrame = true;
			    } else {
				    $scope.currentKeyframe = $scope.keyframes[keyframeIndex - 10];
					console.log("previousKeyframe executed, index is: ", keyframeIndex);
				}

				$scope.broadcastKeyframeSelected();
	        };

	        $scope.getKeyframeIndex = function (keyframe) {
	        	return _.findIndex($scope.keyframes, {_id: keyframe._id});
	        };

    		$scope.playIntervalId = {};

     		$scope.play = function (seconds) {
     			//seconds is a variable we should use at a later time to allow speed adjustment
     			// var delay = seconds * 1000;

     			$scope.playIntervalId = setInterval($scope.nextKeyframe($scope.currentKeyframe), 1000);
     		};

     		$scope.pause = function () {
     			clearInterval($scope.playIntervalId);
     		};

		}
	};
});











