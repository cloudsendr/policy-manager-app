(function () {
    angular.module("policy.detail", ["dataService.policyDetailService"])
        .directive("policyDetail", policyDetail);

    function policyDetail($state, $ionicHistory, appFlowService, policyDetailService, POLICY_CHANNELS, PolicyLoadingService) {
        return {
            restrict: "E",
            scope: {
                context: "@"
            },
            controllerAs: "vm",
            bindToController: true,
            controller: policyDetailController,
            templateUrl: "components/policy.detail/policy.detail.html"
        };

        function policyDetailController($scope) {
            var vm = this;

            vm.display = {};
            vm.display.policyDetail = $state.params.policyData;
            vm.display.statusList = [{'statusCode': 'created',
                                      'status': 'Created'},
                                     {'statusCode': 'title_check',
                                      'status': 'Title Check'},
                                     {'statusCode': 'pending_liens',
                                      'status': 'Pending Liens'},
                                     {'statusCode': 'pending_liens_cleared',
                                      'status': 'Pending Liens Cleared'},
                                     {'statusCode': 'approved',
                                      'status': 'Approved'},
                                     {'statusCode': 'denied',
                                      'status': 'Denied'}];

            vm.events = {};
            vm.events.getPolicy = getPolicy;
            vm.events.updatePolicy = updatePolicy;
            vm.events.goToParty = goToParty;

            // -----------------------------------------------

            if(vm.display.policyDetail) {
              console.log(">>> policydetail is ", vm.display.policyDetail);
              getPolicy(vm.display.policyDetail.id);
            }


            // -----------------------------------------------

            function getPolicy(policyId) {
                policyDetailService.getPolicy(policyId).then(handlePolicy);
            }

            function updatePolicy(policy) {
              console.log("clicked uodate policy", policy);
                policyDetailService.updatePolicy(policy).then(handleUpdatePolicy);
            }

            function handlePolicy(policy) {
                vm.display.policy = policy.data;
            }

            function handleUpdatePolicy(policy) {
                vm.display.policy = policy.data;
                $ionicHistory.goBack();
            }

            function goToParty(party) {
              console.log(">> clicked go to party =", party);
                appFlowService.policy.goToParty({
                    partyData: party
                });
              }
            }

        }
})();
