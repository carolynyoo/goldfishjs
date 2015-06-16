/*jslint node: true */
'use strict';

app.directive('scrubber', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/scrubber.html',
		controller: function ($scope, CommLinkFactory, KeyframeFactory) {
			$scope.greeting = "the scrubber has loaded";
			console.log("here's the greeting: ", $scope.greeting);

			$scope.keyframes = KeyframeFactory.getAllKeyframes();
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
	        };

	        CommLinkFactory.onBrowserUpdate($scope, onFilebrowserUpdateHandler);

		}
	};
});




// app.config(function ($stateProvider) {

//     $stateProvider.state('main.projectbrowser.scrubber', {
//         url: '/scrubber',
//         controller: 'ScrubberController',
//         templateUrl: 'js/ui-routes/scrubber/scrubber.html'
//     });

// });

// app.controller('ScrubberController', function($scope, $rootScope) {
// 	//project browser logic
// 	$rootScope.$on("$stateChangeSuccess", function(event, greeting) {
// 		console.log(greeting);
// 	});

// });