/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('main.projectbrowser', {
        url: '/projectbrowser',
        controller: 'ProjectbrowserController',
        templateUrl: 'js/ui-routes/projectbrowser/projectbrowser.html'
    });

});
// localhost:3000/session049124123.db/12:23:51/app.js
// locahost:3000/projectBrowser/keyFrame/filename

app.controller('ProjectbrowserController', function($scope) {
	//project browser logic
});