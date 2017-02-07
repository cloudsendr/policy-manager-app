(function () {
    angular.module("dataService.rootService", [])
        .service("rootService", rootService);

    function rootService(utilityService) {
        var service = {};

        service.getDevicePlatform = utilityService.getDevicePlatform;

        return service;
    }
})();
