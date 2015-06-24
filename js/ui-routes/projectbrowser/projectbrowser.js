/*jslint node: true */
'use strict';
var path = require('path');

app.directive('projectbrowser', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		controller: function ($scope, CommLinkFactory, DirTreeFactory) {

			$scope.fileTree = DirTreeFactory.getTree(process.env.PWD);

			// This watches for the latest file selected in the browser file tree
			$scope.$watch('abc.currentNode.path', function(newFile, oldFile) {
				console.log('The newest selected browser file:     ', newFile);
				console.log('The previously selected browser file: ', oldFile);

				$scope.selectFile(newFile);
			});

			// On file click in the browser, the pathname will be broadcast via commLink to other directives that are listening.
			$scope.selectFile = function (file) {
				console.log("Browser Broadcasting this file: ", file);
				CommLinkFactory.updateBrowser(file);
			};
		}
	};
});
