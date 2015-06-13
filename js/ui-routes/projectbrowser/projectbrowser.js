/*jslint node: true */
'use strict';

app.directive('projectbrowser', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		link: function (scope) {
			scope.greeting = "the file browser has loaded";

			console.log("here's the greeting: ", scope.greeting);
		}
	};
});











// app.config(function ($stateProvider) {

//     $stateProvider.state('main.projectbrowser', {
//         url: '/projectbrowser',
//         controller: 'ProjectbrowserController',
//         templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html'
//     });

// });
// // localhost:3000/session049124123.db/12:23:51/app.js
// // locahost:3000/projectBrowser/keyFrame/filename

// app.controller('ProjectbrowserController', function($scope, $rootScope) {
// 	//project browser logic
// 	$rootScope.$broadcast("hello", "my name is Peter");
// });