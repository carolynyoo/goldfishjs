/*jslint node: true */
'use strict';

app.directive('scrubber', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/scrubber.html',
		scope: {},
		controller: function ($scope, CommLinkFactory, KeyframeFactory, GitDiffFactory) {
			// $scope.greeting = "the scrubber has loaded";
			// console.log("here's the greeting: ", $scope.greeting);

			$scope.keyframes = [];
			$scope.diffsArray = [];
			$scope.currentKeyframe = "";

			// $scope.keyframes = KeyframeFactory.getAllKeyframes()
			// 					.then(function(keyframes) {
			// 						console.log("keyframes in the scrubber", keyframes);
			// 					}).catch(function (err) {
			// 						console.log("err in the scrubber", err);
			// 					});

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
				CommLinkFactory.updateScrubber($scope.dummyKeyframe);
			};
			
	        // Listener registers when the file browser is updated.
	        var onFilebrowserUpdateHandler = function (file) {
	        	console.log("Pinged from the file browser:", file);
	        	$scope.keyframes = KeyframeFactory.getFileKeyframes(file.filename)
	        						.then(function(keyframes) {
							        	$scope.currentKeyframe = keyframes[keyframes.length - 1];
	        						}).catch(function (err) {
	        							console.log("Scrubber: Single File Keyframe error in retrieval: ", err);
	        						});
	        };

	        CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);

			
			$scope.nextKeyframe = function(frameID){

				$scope.diffsArray = GitDiffFactory.calculateDiff($scope.keyframes[frameID].text_state, $scope.keyframes[frameID+1].text_state);

				console.log("clicked and ran nextKeyframe function");
			    console.log("frameID:", frameID);
			    console.log("currframe:", currframe);
			    console.log("keyframesLength: ",$scope.keyframes.length);
			    
			    if (frameID == $scope.keyframes.length - 1){
			    	console.log("Got to last frame");
					$scope.currentKeyframe = "Frame " + frameID + " is the last frame!";
					$scope.$digest();
			    }

			    else{
				    $scope.currentKeyframe = $scope.keyframes[frameID+1].text_state;
				    $scope.editor.setValue($scope.currentKeyframe); // update editor
				    $scope.editor.navigateFileStart(); // return to top of file
				    $scope.branchName = $scope.keyframes[frameID+1].branch_name;
				    $scope.fileName = $scope.keyframes[frameID+1].filename;
				    $scope.lastCommit = $scope.keyframes[frameID+1].last_commit;
				    $scope.lastCommitTime = $scope.keyframes[frameID+1].last_commit_time;
				    $scope.currentKeyframeId += 1;
				    console.log("currframe after assigned:", currframe);
					// $scope.$digest();
				}
			};

	        $scope.backTenFrames = function(frameID){
	        	
	        	$scope.currentKeyframeId -= 10;
	            $scope.currentKeyframe = $scope.keyframes[frameID].text_state;
	            $scope.branchName = $scope.keyframes[frameID].branch_name;
	            $scope.fileName = $scope.keyframes[frameID].filename;
	            $scope.lastCommit = $scope.keyframes[frameID].last_commit;
	            $scope.lastCommitTime = $scope.keyframes[frameID].last_commit_time;
	            
	        //    $scope.$digest();	

	        };

		}
	};
});











