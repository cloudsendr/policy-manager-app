(function () {
    angular.module("policy.list", ["dataService.policyListService"])
        .directive("policyList", policyList);

    function policyList($timeout, $filter, $moment, appFlowService, policyListService, POLICY_CHANNELS, PolicyLoadingService) {
        return {
            restrict: "E",
            scope: {
                context: "@"
            },
            controllerAs: "vm",
            bindToController: true,
            controller: policyListController,
            templateUrl: "components/policy.list/policy.list.html"
        };

        function policyListController($scope) {
            var vm = this;
            var _nextPage = null;
            var scopeListeners = {};


            vm.display = {};
            vm.display.policies = [];


            vm.events = {};
            vm.events.getPolicies = getPolicies;
            vm.events.getMorePolicies = getMorePolicies;
            vm.events.refreshPolicies = refreshPolicies;
            vm.events.goToPolicy = goToPolicy;
            vm.events.getStatus = getStatus;

            // -----------------------------------------------
            //TODO: For create note entries for self initiated service requests
            //Store which appliance and brand was choosen, etc

            getPolicies();

            scopeListeners.refreshView = $scope.$on(POLICY_CHANNELS.system.refreshView, function () {
                $scope.$apply(function () {
                    refreshPolicies();
                });
            });

            $scope.$on("$destroy", function () {
                for (var listener in scopeListeners) {
                    scopeListeners[listener]();
                }
            });

            // -----------------------------------------------

            function getPolicies() {
                policyListService.getPolicies(null).then(handlePolicies);
            }

            function getMorePolicies() {
                policyListService.getPolicies(_nextPage)
                    .then(function (policies) {
                        handlePolicies(policies, true);
                    }).finally(function () {
                        $scope.$broadcast(POLICY_CHANNELS.scroll.infiniteScrollComplete);
                    });
            }

            function refreshPolicies(pulled) {
                PolicyLoadingService.disableLoading();
                policyListService.getPolicies(null)
                    .then(handlePolicies)
                    .finally(function () {
                        $scope.$broadcast(POLICY_CHANNELS.scroll.refreshComplete);
                        PolicyLoadingService.enableLoading();
                    });
            }

            function handlePolicies(policies, append) {
                //$scope.$emit(POLICY_CHANNELS.policies.updateCount, policies.total);

                console.log(">>> policies", policies);
                vm.display.policies = (append) ? vm.display.policies.concat(policies.data) : policies.data;
                console.log(">>> vm.display.policies", vm.display.policies);
            }

            function goToPolicy(policy) {
                    appFlowService.policy.goToPolicy({
                        policyData: policy
                    });
                }
            }

            function getStatus(status) {
              return status.replace(/_/g, ' ').toUpperCase();
            }
        }
})();
