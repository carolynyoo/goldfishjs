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
		    		console.log('getting to sub ctrl')
		    		$scope.keyframes = keyframes;
		    		console.log('main.file ctrl, scope.keyframes is', $scope.keyframes)
		    	}
    		},
    		scrubber: {
    			template: '<scrubber></scrubber>',
    			controller: function($scope, keyframes) {
		    		console.log('getting to sub ctrl')
		    		$scope.keyframes = keyframes;
		    		console.log('main.file ctrl, scope.keyframes is', $scope.keyframes)
		    	}
    		}
    	},
    	resolve: {
    		keyframes: function(KeyframeFactory, $stateParams) {
    			var filename = $stateParams.file.replace(/%2F/g,'/')
    			console.log('filename', filename)
	    		return KeyframeFactory.getFileKeyframes(filename);
	    	},
	    },
    	
    });

});