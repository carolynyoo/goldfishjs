var fs = require('fs');
var path = require('path');

// Database Paths for injecting db value into angular app
var appPath = process.env.PWD;
var appConfigPath = process.env.HOME + '/Library/Preferences/Saved\ Application\ State/goldfishjs';
var dbPath = path.join(appPath, 'db/models');

var dbFactory = require(dbPath);

// Boot up the Angular App
var app = angular.module('gitplayback', ['angularTreeview', 'ui.router', 'ui.ace', 'ngAnimate', 'ngAria', 'ngMaterial', 'ngMdIcons']);
app.config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
});

app.run(function(ValuesService) {
    ValuesService.AppConfig = dbFactory.setAppConfigDb(appConfigPath);
    console.log(">>>>APP DATABASE: ", ValuesService.AppConfig);
});