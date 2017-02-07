(function () {
    angular.module("policy-manager-ui")
        .config(configureStates);

    function configureStates($stateProvider, $urlRouterProvider, APP_STATES) {
        for (var index in APP_STATES) {
            $stateProvider.state(APP_STATES[index].name, APP_STATES[index].config);
        }

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("/root");
    }
})();
