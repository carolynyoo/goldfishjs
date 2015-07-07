app.directive('fileinfo', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/fileinfo.html',
		link: function (scope, element, attr) {

		scope.showFileTab = false;
		scope.toggleActive = function() {
	    	scope.showFileTab = scope.showFileTab === false ? true: false;
			};

		}
	};
});