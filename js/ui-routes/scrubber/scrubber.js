/*jslint node: true */
'use strict';

app.directive('scrubber', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/scrubber.html',
		scope: {},
		controller: function ($scope, CommLinkFactory, KeyframeFactory, GitDiffFactory) {
			$scope.greeting = "the scrubber has loaded";
			console.log("here's the greeting: ", $scope.greeting);

			$scope.keyframes = KeyframeFactory.getAllKeyframes()
								.then(function(keyframes) {
									console.log("keyframes in the scrubber", keyframes);
								}).catch(function (err) {
									console.log("err in the scrubber", err);
								});

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
	        							console.log("Scrubber: Single File Keyframes: ", keyframes);
	        						}).catch(function (err) {
	        							console.log("Scrubber: Single File Keyframe error in retrieval: ", err);
	        						});
	        };

	        CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);
			
			$scope.advanceFrame = function(frameID, currframe){

				$scope.diffsArray = GitDiffFactory.calculateDiff($scope.framesArray[frameID].text_state, $scope.framesArray[frameID+1].text_state);

				console.log("clicked and ran advanceFrame function");
			    console.log("frameID:", frameID);
			    console.log("currframe:", currframe);
			    console.log("framesArrayLength: ",$scope.framesArray.length);
			    
			    if (frameID == $scope.framesArray.length - 1){
			    	console.log("Got to last frame");
					$scope.currentFrame = "Frame " + frameID + " is the last frame!";
					$scope.$digest();
			    }

			    else{
				    $scope.currentFrame = $scope.framesArray[frameID+1].text_state;
				    $scope.editor.setValue($scope.currentFrame); // update editor
				    $scope.editor.navigateFileStart(); // return to top of file
				    $scope.branchName = $scope.framesArray[frameID+1].branch_name;
				    $scope.fileName = $scope.framesArray[frameID+1].filename;
				    $scope.lastCommit = $scope.framesArray[frameID+1].last_commit;
				    $scope.lastCommitTime = $scope.framesArray[frameID+1].last_commit_time;
				    $scope.currentFrameID += 1;
				    console.log("currframe after assigned:", currframe);
					// $scope.$digest();
				}
			};

	        $scope.backTenFrames = function(frameID){
	        	
	        	$scope.currentFrameID -= 10;
	            $scope.currentFrame = $scope.framesArray[frameID].text_state;
	            $scope.branchName = $scope.framesArray[frameID].branch_name;
	            $scope.fileName = $scope.framesArray[frameID].filename;
	            $scope.lastCommit = $scope.framesArray[frameID].last_commit;
	            $scope.lastCommitTime = $scope.framesArray[frameID].last_commit_time;
	            
	        //    $scope.$digest();	

	        };

		}
	};
});











