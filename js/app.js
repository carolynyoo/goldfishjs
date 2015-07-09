var fs = require('fs');
var path = require('path');

// var _ = require('lodash');

// Database Paths for injecting db value into angular app
var appPath = process.env.PWD;
var appConfigPath = process.env.HOME + '/Library/Preferences/Saved Application State/goldfishjs';
var dbPath = path.join(appPath, 'db/models');

// console.log("%$%$%$ APPCONFIGPATH: ", appConfigPath);
// console.log("%$%$%$ appPATH:       ", appPath);

var dbFactory = require(dbPath);

// Boot up the Angular App

var app = angular.module('gitplayback', ['angularTreeview', 'ui.router', 'ui.ace', 'ngAnimate', 'ngAria', 'ngMaterial', 'ngMdIcons']);
app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    // $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});