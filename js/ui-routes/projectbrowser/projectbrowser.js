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

			$scope.$watch(function(scope) { return scope.currentNode; },
			              function(scope) {
			              	console.log("$watch: ", scope.currentNode);
			              });

			// On click, will broadcast via commLink to other directives that are listening.
			$scope.selectFile = function (file) {
				console.log("Browser: this file passed in from tree: ", file);
				console.log("Browser: this $scope.currentNode:       ", $scope.currentNode);
				CommLinkFactory.updateBrowser(file);
			};
		}
	};
});
