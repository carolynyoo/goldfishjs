/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main.projectbrowser.scrubber.viewer', {
        url: '/viewer',
        controller: 'ViewerController',
        templateUrl: 'js/ui-routes/viewer/viewer.html'
    });

});

app.controller('ViewerController', function($scope) {
	//project browser logic
});