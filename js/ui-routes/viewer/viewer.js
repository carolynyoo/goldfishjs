/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('viewer', {
        url: '/viewer',
        parent: 'scrubber',
        controller: 'ViewerController',
        templateUrl: 'js/ui-routes/viewer/viewer.html'
    });

});

app.controller('ViewerController', function($scope) {
	//project browser logic
});