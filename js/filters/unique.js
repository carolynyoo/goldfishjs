var _ = require('lodash');

// app.module('customFilters', [])
app.filter('unique', function() {
	    return function (arr, field) {
	        return _.uniq(arr, function(a) { 
	        	return a[field]; 
	        });
    	};
});