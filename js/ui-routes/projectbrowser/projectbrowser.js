/*jslint node: true */
'use strict';
var path = require('path');

app.directive('projectbrowser', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html',
		controller: function ($scope, CommLinkFactory) {
			// $scope.greeting = "the file browser has loaded";
			// console.log("here's the greeting: ", $scope.greeting);
			
			var filename = path.join(process.env.PWD, "index.html");

			var dummyFile = {
				source: "projectbrowser",
				filename: filename
			};

			// On click, will broadcast via commLink to other directives that are listening.
			$scope.selectFile = function () {
				console.log("Directive: file selected button clicked: ");
				CommLinkFactory.updateBrowser(dummyFile);
			};
		}
	};
});



