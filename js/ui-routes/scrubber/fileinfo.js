app.directive('fileinfo', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/fileinfo.html',
		link: function (scope, element, attr) {

			scope.showFileTab = true;
			scope.toggleActive = function() {
			// Toggles true false	    
		    scope.showFileTab = scope.showFileTab === false ? true: false;
			};

		}
	};
});