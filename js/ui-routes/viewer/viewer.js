/*jslint node: true */
'use strict';

app.directive('viewer', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/viewer/viewer.html',
		controller: function ($scope, CommLinkFactory, KeyframeFactory) {

			var onScrubberUpdateHandler = function (keyframe) {
				console.log("Pinged from the scrubber", keyframe);
			};

			CommLinkFactory.onScrubberUpdate($scope, onScrubberUpdateHandler);

		}
	};
});


// app.config(function ($stateProvider) {

//     $stateProvider.state('main.projectbrowser.scrubber.viewer', {
//         url: '/viewer',
//         controller: 'ViewerController',
//         templateUrl: 'js/ui-routes/viewer/viewer.html'
//     });

// });

// app.controller('ViewerController', function($scope) {
// 	//project browser logic
// });