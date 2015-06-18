// var index = require('./db/models/index.js');
var fs = require('fs');
var path = require('path');
// var _ = require('lodash');

// Database...and Models (Is this still needed?)
var appPath = process.env.PWD;
var dbPath = path.join(appPath, 'db/models');

var models = require(dbPath);
var Keyframe = models.Keyframe;

// Boot up the Angular App
var app = angular.module('gitplayback', ['ui.router', 'ui.ace']);
app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    // $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});
