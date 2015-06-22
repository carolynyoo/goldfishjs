/*jslint node: true */
'use strict';
var path = require('path');

app.directive('projectbrowser', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		controller: function ($scope, CommLinkFactory) {

			$scope.fileTree = require(path.join(process.env.PWD, "js", "dirTree.js"));
			$scope.currentNode = {};

			// $scope.$watch(function(scope) { return scope.abc.currentNode; },
			//               function(scope) {
			//               	console.log("$watch:    ", scope.abc.currentNode.path);
			//               });

			// On click, will broadcast via commLink to other directives that are listening.
			$scope.selectFile = function (file) {
				console.log("Browser: this $scope.currentNode:       ", $scope.abc.currentNode.path);
				CommLinkFactory.updateBrowser($scope.abc.currentNode.path);
			};
		}
	};
});
