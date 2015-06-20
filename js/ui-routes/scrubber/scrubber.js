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

			// Variables used to enable/disable scrubber buttons
			$scope.isFirstFrame = false;
			$scope.isLastFrame = false;

			$scope.dummyKeyframe = {
				source: "scrubber",
				filename: "User/pete/keyframe",
				text_state: "(function () {})()",
				event_type: "changed",
				last_commit: "1234lkj151354",
				last_commit_time: new Date(), 
				prev_keyframe: "f1oij1g40941t4",
				next_keyframe: "0108ujt1oi14r",
				branch_name: "pubsub",
				createdAt: new Date()
			};

			var onKeyframeUpdateHandler = function() {
	            $scope.keyframes = KeyframeFactory.getAllKeyframes();
	        };

	        CommLinkFactory.onDataUpdated($scope, onKeyframeUpdateHandler);

	        // On scrubber click, will broadcast the selected keyframe via commLink to other directives that are listening.
			$scope.broadcastKeyframeSelected = function () {
				console.log("Directive: scrubber keyframe select button clicked: ");
				CommLinkFactory.updateScrubber($scope.currentKeyframe);
			};
			
	        // Listener registers when the file browser is updated.
	        var onFilebrowserUpdateHandler = function (file) {
	        	console.log("Pinged from the file browser:", file);
	        	KeyframeFactory.getFileKeyframes(file.filename)
					.then(function(keyframes) {
			        	$scope.currentKeyframe = keyframes[keyframes.length - 1];
			        	$scope.keyframes = keyframes;
					}).catch(function (err) {
						console.log("Scrubber: Single File Keyframe error in retrieval: ", err);
					});
	        };

	        CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);

			
			$scope.nextKeyframe = function(keyframe){
				$scope.isFirstFrame = false;
				var keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

				console.log("nextKeyframe executed, index is: ", keyframeIndex);
			    // console.log("keyframe:", keyframe);
			    // console.log("keyframe:", $scope.keyframes);
			    // console.log("$scope.diffsArray : ", $scope.diffsArray);
			    
			    if (keyframeIndex === $scope.keyframes.length - 1){
			    	console.log("@ Last Keyframe");
					$scope.currentKeyframe = $scope.keyframes[$scope.keyframes.length - 1];
					$scope.isLastFrame = true;
			    }

			    else {
				    $scope.currentKeyframe = $scope.keyframes[keyframeIndex + 1];
				    console.log("New Current Keyframe:", $scope.currentKeyframe);
				}
			};

			$scope.previousKeyframe = function(keyframe) {
				$scope.isLastFrame = false;
				var keyframeIndex = $scope.getKeyframeIndex(keyframe);

				// $scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[keyframeIndex].text_state, $scope.keyframes[keyframeIndex+1].text_state);

				console.log("previousKeyframe executed, index is: ", keyframeIndex);
			    // console.log("keyframe:", keyframe);
			    // console.log("keyframe:", $scope.keyframes);
			    // console.log("$scope.diffsArray : ", $scope.diffsArray);
			    
			    if (keyframeIndex === 0){
			    	console.log("@ First Keyframe");
					$scope.currentKeyframe = $scope.keyframes[0];
					$scope.isFirstFrame = true;
			    }

			    else {
				    $scope.currentKeyframe = $scope.keyframes[keyframeIndex - 1];
				    console.log("New Current Keyframe:", $scope.currentKeyframe);
				}
			};

	        $scope.backTenFrames = function(frameID){
	        	$scope.currentKeyframeId -= 10;
	            $scope.currentKeyframe = $scope.keyframes[frameID].text_state;
	            $scope.branchName = $scope.keyframes[frameID].branch_name;
	            $scope.fileName = $scope.keyframes[frameID].filename;
	            $scope.lastCommit = $scope.keyframes[frameID].last_commit;
	            $scope.lastCommitTime = $scope.keyframes[frameID].last_commit_time;
	        };

	        $scope.getKeyframeIndex = function (keyframe) {
	        	return _.findIndex($scope.keyframes, {_id: keyframe._id});
	        };

		}
	};
});











