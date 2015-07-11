app.directive('borderOnHover', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			element.on('mouseenter', function() {
				// console.log(this);
				element.addClass('border-on-hover');
			});
			element.on('mouseleave', function() {
				element.removeClass('border-on-hover');
			});
		}
	};
});