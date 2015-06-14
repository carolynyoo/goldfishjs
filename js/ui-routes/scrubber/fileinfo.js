app.directive('fileinfo', function($rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'js/ui-routes/scrubber/fileinfo.html',
		link: function (scope, element, attr) {


			// console.log("THIS AFTER TOGGLE:", this);
			// element.bind('click', function(e){
			// console.log(element.find('panel'));
			// //.toggleClass("active");
			// console.log("THIS AFTER TOGGLE:", this);
			// });

		}
	};
});