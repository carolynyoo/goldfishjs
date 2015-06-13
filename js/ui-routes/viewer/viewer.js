/*jslint node: true */
'use strict';

app.directive('viewer', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/viewer/viewer.html',
		link: function (scope) {
			scope.greeting = "the viewer has loaded";

			console.log("here's the greeting: ", scope.greeting);
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