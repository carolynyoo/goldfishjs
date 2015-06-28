/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main', {
        url: '',
        controller: 'MainController',
        templateUrl: 'js/ui-routes/main/main.html',
        resolve: {
          fileTree: function(DirTreeFactory, DropDirectoryFactory) {
            return DirTreeFactory.getTree(DropDirectoryFactory.getDir());
          }
        }
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
    		keyframes: function(KeyframeFactory, $stateParams) {
    			var filename = $stateParams.file.replace(/%2F/g,'/');
	    		return KeyframeFactory.getFileKeyframes(filename);
	    	},
	    },
    	
    });

});