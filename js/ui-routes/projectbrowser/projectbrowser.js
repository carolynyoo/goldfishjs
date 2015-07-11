/*jslint node: true */
'use strict';
var path = require('path');

app.directive('projectbrowser', function($rootScope, $state) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		controller: function ($scope, $stateParams, CommLinkFactory, DirTreeFactory, SettingsFactory) {
			$scope.fileTree = DirTreeFactory.getTree(SettingsFactory.getCurrentRepo()); 
			// $scope.fileTree = DirTreeFactory.getTree(process.cwd());
			// console.log("PBROWSER $stateParams: ", $stateParams);
			$scope.goToFile = function(path) {
				$state.go('main.file', {
					file: path
				});
			};
		}
	};
});
