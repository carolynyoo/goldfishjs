/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main', {
        url: '',
        controller: 'MainController',
        templateUrl: 'js/ui-routes/main/main.html'
    })
    .state('main.file', {
    	url: '/:file',
    	views: {
    		viewer: {
    			template: '<viewer></viewer>',
    			controller: function($scope, keyframes) {
		    		$scope.keyframes = keyframes;
		    	}
    		},
    		scrubber: {
    			template: '<scrubber></scrubber>',
    			controller: function($scope, keyframes) {
		    		$scope.keyframes = keyframes;
		    	}
    		}
    	},
    	resolve: {
    		keyframes: function(KeyframeFactory, $stateParams, Errors) {
    			var filename = $stateParams.file.replace(/%2F/g,'/');
	    		return KeyframeFactory.getFileKeyframes(filename);
	    		// .then(function(keyframes) {
	    		// 	if(!keyframes || !keyframes.length) { throw new Error("no keyframes for this file"); }
	    		// 	return keyframes;
	    		// })
	    		// .catch(function(err) {
	    		// 	Errors.add(err);
	    		// 	throw err;
	    		// });
	    	},
	    },
    	
    });

});