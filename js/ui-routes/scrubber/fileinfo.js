app.directive('fileinfo', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/fileinfo.html',
		link: function (scope, element, attr) {

//		console.log("scope.showFileTab before instantiated", scope.showFileTab);
		scope.showFileTab = true;
//		console.log("scope.showFileTab after set true", scope.showFileTab);
		scope.toggleActive = function() {
//		console.log("scope.showFileTab", $scope.showFileTab);
//		console.log("NG CLICK");
	    
	    scope.showFileTab = scope.showFileTab === false ? true: false;
//	    console.log("scope.showFileTab value after click", scope.showFileTab);
		};


		}
	};
});