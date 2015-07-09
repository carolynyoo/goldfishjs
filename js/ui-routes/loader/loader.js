/*jslint node: true */
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('loader', {
      template: '<loader></loader>',
      url: '/',
      resolve: {
        repositories: function(SettingsFactory) {
          return SettingsFactory.getRecentRepos();
        }
      }
    });

});

app.directive('loader', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/ui-routes/loader/loader.html',
    controller: function ($scope, $state, DirTreeFactory, DropDirectoryFactory) {
      $scope.fileTree = DirTreeFactory.getTree(DropDirectoryFactory.getDir());
      // console.log("LOADER CTRL: Here are the saved repos: ", $scope.repositories);
    }
  };
});