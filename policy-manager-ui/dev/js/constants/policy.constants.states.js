(function () {
    angular.module("policy.constants.appStates", [])
        .constant("APP_STATES", configureAppStates());

    function configureAppStates() {
        var states = {};

        //Parent state once inside the app
        states.root = root();

        //Main tabs within the app
        states.policies = policies();
        states.policyDetail = policyDetail();
        states.party = party();
        states.catalog = catalog();

        return states;

        // ----------------------------------------------------

        function root() {
            var state = {};
            state.name = "root";
            state.config = {};
            state.config = {
                url: "/root",
                abstract: true,
                templateUrl: "templates/policy.root.html"
            };

            return state;
        }

        function policies() {
            var state = {};
            state.name = "root.policies";
            state.config = {};
            state.config.url = "/policies";
            state.config.views = {};
            state.config.views['policy-list'] = {
                templateUrl: "templates/policy.list.state.html"
            };

            return state;
        }

        function policyDetail() {
            var state = {};
            state.name = "root.policyDetail";
            state.config = {};
            state.config.params = {
                policyData: {}
            };
            state.config.url = "/policyDetail";
            state.config.views = {};
            state.config.views['policy-list'] = {
                templateUrl: "templates/policy.detail.state.html"
            };

            return state;
        }

        function party() {
            var state = {};
            state.name = "root.party";
            state.config = {};
            state.config.params = {
                partyData: {}
            };
            state.config.url = "/interestedParty";
            state.config.views = {};
            state.config.views['policy-list'] = {
                templateUrl: "templates/interested.party.state.html"
            };

            return state;
        }

        function catalog() {
            var state = {};
            state.name = "root.catalog";
            state.config = {};
            state.config.url = "/catalog";
            state.config.views = {};
            state.config.views['catalog-list'] = {
                templateUrl: "templates/catalog.list.state.html"
            };

            return state;
        }
    }
})();
