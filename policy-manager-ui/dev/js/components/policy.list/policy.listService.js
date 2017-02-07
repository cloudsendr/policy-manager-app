(function () {
    angular.module("dataService.policyListService", [])
        .service("policyListService", policyListService);

    function policyListService(PolicyManagerLib, PolicyLoadingService, utilityService) {
        var service = {};
        var _archiveContext = false;

        service.getPolicies = getPolicies;

        return service;

        // ---------------------------------------------------

        function getPolicies(nextPage) {
            var request = {};

            if (nextPage) {
                request.pageHref = nextPage;
            }

            return PolicyManagerLib.getPolicies(request)
                    .then(handlePagedPolicies)
                    .catch(handlePagedPoliciesError);
        }

        // ----------------------------------------------------------------------------------------------------------------------------------

        function handlePagedPolicies(response) {
          console.log(">>> policies in listservice", response);
            var policies = [];
            if (response.data.elements) {
                policies = response.data.elements;
                policies.sort(function (a, b) {
                    if (a.policyNumber < b.policyNumber)
                        return -1;
                    if (a.policyNumber > b.policyNumber)
                        return 1;
                });
            }
            return {
                nextPage: (response.data.page.total > response.data.page.size * response.data.page.page) ? response.data.page : null,
                data: policies,
                total: response.data.page.total
            };
        }

        function handlePagedPoliciesError(error) {
            utilityService.handleServerError(error);
            return {
                nextPage: null,
                data: [],
                total: 0
            };
        }
    }
})();
