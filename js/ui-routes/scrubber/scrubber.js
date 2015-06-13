/*jslint node: true */
'use strict';

app.directive('scrubber', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/scrubber.html',
		link: function (scope) {
			scope.greeting = "the scrubber has loaded";

			console.log("here's the greeting: ", scope.greeting);
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