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
