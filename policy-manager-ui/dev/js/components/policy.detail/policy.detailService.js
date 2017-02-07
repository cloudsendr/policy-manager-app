(function () {
    angular.module("dataService.policyDetailService", [])
        .service("policyDetailService", policyDetailService);

    function policyDetailService(PolicyManagerLib, PolicyLoadingService, utilityService) {
        var service = {};

        service.getPolicy = getPolicy;
        service.updatePolicy = updatePolicy;

        return service;

        // ---------------------------------------------------

        function getPolicy(policyId) {

            return PolicyManagerLib.getPolicyById(policyId)
                    .then(handleGetPolicy)
                    .catch(handleGetPolicyError);
        }

        function updatePolicy(policy) {
            return PolicyManagerLib.updatePolicy(policy)
                    .then(handleUpdatePolicy)
                    .catch(handleUpdatePolicyError);
        }
        // ----------------------------------------------------------------------------------------------------------------------------------

        function handleGetPolicy(response) {
          console.log(">>> policies in detailservice", response);
            if (response.data !== undefined) {
                return response;
            } else {
              return null;
            }
        }

        function handleGetPolicyError(error) {
            utilityService.handleServerError(error);
            return  null;
        }
        function handleUpdatePolicy(response) {
          console.log(">>> updated  policy", response);
              return response;
        }

        function handleUpdatePolicyError(error) {
            utilityService.handleServerError(error);
            return {
                nextPage: null,
                data: [],
                total: 0
            };
        }
    }
})();
