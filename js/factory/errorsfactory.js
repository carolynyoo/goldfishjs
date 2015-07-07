
app.factory('ErrorsFactory', function($timeout) {
	return {
		errors: [],
		add: function(err) {
			var index = this.errors.push(err);
			var self = this;
			$timeout(function() {
				self.errors.splice(index, 1);
			}, 3000);
		}
	};
});