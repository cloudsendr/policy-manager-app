(function () {
    angular.module("policy-manager-ui")
        .run(policyStart);

    function policyStart(appFlowService) {
      appFlowService.root.goToPolicy();
    }
})();
