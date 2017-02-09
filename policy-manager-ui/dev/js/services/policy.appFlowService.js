(function () {
    angular.module("policy.services.appFlowService", [])
        .service("appFlowService", appFlowService);

    function appFlowService($state, APP_STATES) {
        var service = {};

        service.externalUrlFlows = externalUrlFlows();

        service.root = rootStateFlows();
        service.policy = policyFlows();
        service.policyDetail = policyDetailFlows();
        service.catalog = catalogFlows();

        return service;

        // ---------------------------------------------------------
        function rootStateFlows() {
            var flows = {};

            flows.goToPolicy = go(APP_STATES.policies);

            return flows;
        }

        function externalUrlFlows() {
            var flows = {};

            flows.goToPolicy = go(APP_STATES.policies);

            return flows;
        }

        function launchStateFlows() {
            var flows = {};

            flows.goHome = go(APP_STATES.launch);

            return flows;
        }

        function policyFlows() {
            var flows = {};

            flows.goToPolicy = go(APP_STATES.policyDetail);
            flows.goToParty = go(APP_STATES.party);

            return flows;
        }

        function policyDetailFlows() {
            var flows = {};

            flows.goToInterestedParty = go(APP_STATES.interestedParty);

            return flows;
        }

        function interestedParties() {
            var flows = {};

            flows.goToInterestedParty = go(APP_STATES.interestedParties);

            return flows;
        }

        function catalogFlows() {
            var flows = {};

            flows.goToCatalogs = go(APP_STATES.catalogs);

            return flows;
        }

        // ----------------------------------------------------------

        function go(state) {
            return function (data) {
                if (data) {
                    $state.go(state.name, data);
                } else {
                    $state.go(state.name);
                }
            };
        }
    }
})();
