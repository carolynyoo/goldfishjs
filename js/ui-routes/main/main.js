/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main', {
        url: '/main',
        controller: 'MainController',
        templateUrl: 'js/ui-routes/main/main.html'
    });

});

app.controller('MainController', function($scope) {
	//project browser logic
});