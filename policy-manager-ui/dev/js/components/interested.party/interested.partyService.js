(function () {
    angular.module("dataService.interestedPartyService", [])
        .service("interestedPartyService", interestedPartyService);

    function interestedPartyService(PolicyManagerLib, PolicyLoadingService, utilityService) {
        var service = {};

        service.getParty = getParty;
        service.updateParty = updateParty;

        return service;

        // ---------------------------------------------------

        function getParty(partyId) {
            return PolicyManagerLib.getInterestedPartyById(partyId)
                    .then(handleGetParty)
                    .catch(handleGetPartyError);
        }

        function updateParty(party) {
          return PolicyManagerLib.updateInterestedParty(party)
                  .then(handleUpdateParty)
                  .catch(handleUpdatePartyError);
        }
        // ----------------------------------------------------------------------------------------------------------------------------------

        function handleGetParty(response) {
          console.log(">>> party in party service", response);
            if (response.data !== undefined) {
                return response;
            } else {
              return null;
            }
        }

        function handleGetPartyError(error) {
            utilityService.handleServerError(error);
            return {};
        }

        function handleUpdateParty(response) {
            return response;
        }

        function handleUpdatePartyError(error) {
            utilityService.handleServerError(error);
            return {};
        }
    }
})();
