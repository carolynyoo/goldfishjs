/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('loader', {
        url: '',
        controller: 'LoaderController',
        templateUrl: 'js/ui-routes/loader/loader.html'
    })

});