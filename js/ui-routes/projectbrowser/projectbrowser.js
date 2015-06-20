/*jslint node: true */
'use strict';
var path = require('path');

app.directive('projectbrowser', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		controller: function ($scope, CommLinkFactory) {
			$scope.fileTree = require(path.join(process.env.PWD, "js", "dirTree.js"));

			// On click, will broadcast via commLink to other directives that are listening.
			$scope.selectFile = function () {
				console.log("Directive: file selected button clicked: ");
				CommLinkFactory.updateBrowser($scope.fileTree);
			};
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