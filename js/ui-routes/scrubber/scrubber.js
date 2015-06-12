/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('scrubber', {
        url: '/scrubber',
        parent: 'projectbrowser',
        controller: 'ScrubberController',
        templateUrl: 'js/ui-routes/scrubber/scrubber.html'
    });

});

app.controller('ScrubberController', function($scope) {
	//project browser logic
});