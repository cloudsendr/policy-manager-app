(function () {
    angular.module("policy.loading", [])
        .service("PolicyLoadingService", PolicyLoadingService);

    function PolicyLoadingService($injector) {
        var showLoading = true;
        var service = {};

        service.request = handleRequest;
        service.response = handleResponse;
        service.responseError = handleResponseError;

        service.enableLoading = enableLoading;
        service.disableLoading = disableLoading;

        return service;

        // ----------------------------------------------------------

        /**
         * @desc Start spinner if request has an api key in the header
         *
         * @param {Object} config
         *
         * @return {Object} config object for $http request
         */
        function handleRequest(config) {
            if (angular.isDefined(config.headers['x-api-key']) && showLoading) {
                var $ionicLoading = $injector.get('$ionicLoading');
                var $timeout = $injector.get('$timeout');

                $timeout(function () {
                    $ionicLoading.show();
                }, 0);
            }

            return config;
        }

        /**
         * @desc Stop spinner if any response comes back and has an api key in the header
         * @desc This method is used for both success and errors, if api key is used
         * @param   {Object}   response
         * @returns {Object} response object from $http call
         */
        function handleResponse(response) {
            var $ionicLoading = $injector.get('$ionicLoading');
            var $timeout = $injector.get('$timeout');

            if (angular.isDefined(response.config.headers['x-api-key'])) {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 0);
            }

            return response;
        }

        function handleResponseError(response) {
            var $ionicLoading = $injector.get('$ionicLoading');
            var $timeout = $injector.get('$timeout');
            var $q = $injector.get('$q');

            if (angular.isDefined(response.config.headers['x-api-key'])) {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 0);
            }

            return $q.reject(response);
        }

        // --------------------------------------------------------

        function enableLoading() {
            showLoading = true;
        }

        function disableLoading() {
            showLoading = false;
        }
    }
})();
