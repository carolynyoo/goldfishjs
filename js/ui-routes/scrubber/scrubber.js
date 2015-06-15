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

			var onKeyframeUpdateHandler = function() {
	            $scope.keyframes = KeyframeFactory.getAllKeyframes();
	        };

	        CommLinkFactory.onDataUpdated($scope, onKeyframeUpdateHandler);

	        $scope.onEditData = function (keyframe) {
	        	CommLinkFactory.editData(keyframe);
	        };

	        $scope.onDelete = function (keyframe) {
	        	KeyframeFactory.deleteKeyframe(keyframe);
	        };
			
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