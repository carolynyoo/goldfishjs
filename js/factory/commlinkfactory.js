app.factory('CommLinkFactory', function ($rootScope) {
        
    // private generic notification messages
    var editDataEvent = 'edit data';
    var updateDataEvent = 'update data';

    // private targeted notification messages
    var browerUpdateEvent = 'browser updated';
    var scrubberUpdateEvent = 'scrubber updated';
    var viewerUpdateEvent = 'viewer updated';

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Use these functions when you want to notify other components of a change to the file browser //
    //////////////////////////////////////////////////////////////////////////////////////////////////
    
    // PUBLISH update to the File Browser
    var updateBrowser = function (item) {
        $rootScope.$broadcast(browerUpdateEvent, {item: item});
    };

    // SUBSCRIBE to File Browser update notification
    var onBrowserUpdate = function($scope, handler) {
        $scope.$on(browerUpdateEvent, function(event, args) {
           handler(args.item);
        });
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Use these functions when you want to notify other components of a change to the scrubber //
    //////////////////////////////////////////////////////////////////////////////////////////////
    
    // PUBLISH
    var updateScrubber = function (item) {
        $rootScope.$broadcast(scrubberUpdateEvent, {item: item});
    };

    // SUBSCRIBE
    var onScrubberUpdate = function($scope, handler) {
        $scope.$on(scrubberUpdateEvent, function(event, args) {
           handler(args.item);
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Use these functions when you want to notify other components of a change to the file viewer //
    /////////////////////////////////////////////////////////////////////////////////////////////////
    
    // PUBLISH
    var updateViewer = function (item) {
        $rootScope.$broadcast(viewerUpdateEvent, {item: item});
    };

    // SUBSCRIBE
    var onViewerUpdate = function($scope, handler) {
        $scope.$on(viewerUpdateEvent, function(event, args) {
           handler(args.item);
        });
    };

    ///////////////////////////////////////////////////////////
    // These are GENERIC pub/sub event and handler functions //
    ///////////////////////////////////////////////////////////
    
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
        onDataUpdated: onDataUpdated,
        updateBrowser: updateBrowser,
        onBrowserUpdate: onBrowserUpdate,
        updateScrubber: updateScrubber,
        onScrubberUpdate: onScrubberUpdate,
        updateViewer: updateViewer,
        onViewerUpdate: onViewerUpdate
    };
});




