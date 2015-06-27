/*jslint node: true */
'use strict';
var path = require('path');

app.directive('projectbrowser', function($rootScope, $state) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		controller: function ($scope, CommLinkFactory) {

			$scope.fileTree = require(path.join(process.env.PWD, "js", "dirTree.js"));

			$scope.goToFile = function(path) {
				$state.go('main.file', {
					file: path
				});
			};
		}
	};
});
