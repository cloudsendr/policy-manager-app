(function () {
    angular.module("policy.unexpectedError", [])
        .service("PolicyUnexpectedErrorService", PolicyUnexpectedErrorService);

    function PolicyUnexpectedErrorService($injector, APP_NETWORK_CONNECTIVITY) {
        var service = {};

        service.request = handleRequest;
        service.responseError = handleResponseError;
        service.requestError = handleRequestError;

        return service;

        // ------------------------------------------------------

        function handleRequest(config) {
            //var $log = $injector.get('$log');

            if (!APP_NETWORK_CONNECTIVITY.online) {
                var $q = $injector.get("$q");
                //Create a canceller deferred object and resolve it immediately
                //if the user is offline
                var canceller = $q.defer();
                config.timeout = canceller.promise;
                canceller.resolve();
            }

            //$log.info(config);

            return config;
        }

        function handleResponseError(response) {
            var utilityService = $injector.get('utilityService');
            var errorCodes = $injector.get('HttpErrorCodes');
            var $q = $injector.get('$q');

            if (response.status !== errorCodes.NOT_FOUND && response.status !== errorCodes.CONFLICT) {
                var error = {};
                error.statusText = response.statusText + ": " + response.status;
                error.data = {
                    message: "Unexpected server error"
                };
                utilityService.handleServerError(error);
            }

            return $q.reject(response);
        }

        function handleRequestError(rejection) {
            var $q = $injector.get("$q");
            //var $log = $injector.get('$log');

            //$log.error("Unexpected REQUEST error occurred: ", rejection);

            return $q.reject(rejection);
        }
    }
})();
