/*jslint node: true */
'use strict';
var path = require('path');

app.directive('projectbrowser', function($rootScope, $state) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		controller: function ($scope, CommLinkFactory, DirTreeFactory, DropDirectoryFactory) {
			$scope.fileTree = DirTreeFactory.getTree(DropDirectoryFactory.getDir());

			$scope.goToFile = function(path) {
				$state.go('main.file', {
					file: path
				});
			};
		}
	};
});
