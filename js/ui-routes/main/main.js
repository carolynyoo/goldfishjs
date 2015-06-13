/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main', {
        url: '/main',
        abstract: true,
        controller: 'MainController',
        templateUrl: '<ui-view/>'
    });

});

app.controller('MainController', function($scope) {
	//project browser logic
});