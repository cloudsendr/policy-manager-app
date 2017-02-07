(function () {
    angular.module("policy.root", ["dataService.rootService"])
        .directive("policyRoot", policyRoot);

    function policyRoot($log, $ionicPopup, $timeout, utilityService, rootService, APP_STATES, POLICY_CHANNELS, appFlowService) {
        return {
            restrict: "E",
            scope: {},
            controllerAs: "vm",
            controller: policyRootController,
            templateUrl: "components/policy.root/policy.root.html"
        };


        function policyRootController($scope) {
            var vm = this;
            var listeners = {};
            var contentBanner = null;
            var removeTimeout = null;

            //TODO: Break up display variables by view since
            //some are specific to a state other than root;
            //i.e - vm.manualServiceRequest, vm.triggeredServiceRequest, etc
            vm.display = {};
            vm.display.platform = rootService.getDevicePlatform();

            vm.display.hasPolicies = false;

            vm.display.hasCatalogMessages = false;

          // ---------------------------------------------------------

          function toPolicyList() {
              appFlowService.root.goToPolicy();
          };

          function toCatalogList() {
              appFlowService.root.goToCataloglist();
          }
        }
    }
})();
