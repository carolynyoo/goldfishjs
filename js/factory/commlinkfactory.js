app.factory('CommLinkFactory', function ($rootScope) {
        
        // private notification messages
        var editDataEvent = 'edit data';
        var updateDataEvent = 'update data';

        // PUBLISH edit data notification
        var editData = function (item) {
            $rootScope.$broadcast(editDataEvent, {item: item});
        };

        // SUBSCRIBE to edit data notification
        var onEditData = function($scope, handler) {
            $scope.$on(editDataEvent, function(event, args) {
               handler(args.item);
            });
        };

        // PUBLISH data changed notification
        var dataUpdated = function () {
            $rootScope.$broadcast(updateDataEvent);
        };

        // SUBSCRIBE to data changed notification
        var onDataUpdated = function ($scope, handler) {
            $scope.$on(updateDataEvent, function (event) {
                handler();
            });
        };

        // return the publicly accessible methods
        return {
            editData: editData,
            onEditData: onEditData,
            dataUpdated: dataUpdated,
            onDataUpdated: onDataUpdated
        };
    });