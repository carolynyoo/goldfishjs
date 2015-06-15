app.factory('CommLinkFactory', function ($rootScope) {
        
        // private notification messages
        var editDataEvent = 'edit data';
        var updateDataEvent = 'update data';

        // publish edit data notification
        var editData = function (item) {
            $rootScope.$broadcast(editDataEvent, {item: item});
        };

        //subscribe to edit data notification
        var onEditData = function($scope, handler) {
            $scope.$on(editDataEvent, function(event, args) {
               handler(args.item);
            });
        };

        // publish data changed notification
        var dataUpdated = function () {
            $rootScope.$broadcast(updateDataEvent);
        };

        // subscribe to data changed notification
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