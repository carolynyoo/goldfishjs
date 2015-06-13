/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main.projectbrowser.scrubber', {
        url: '/scrubber',
        controller: 'ScrubberController',
        templateUrl: 'js/ui-routes/scrubber/scrubber.html'
    });

});

app.controller('ScrubberController', function($scope) {
	//project browser logic
});