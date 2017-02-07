(function () {
    angular.module("interested.party", ["dataService.interestedPartyService"])
        .directive("interestedParty", interestedParty);

    function interestedParty($state, appFlowService, interestedPartyService, POLICY_CHANNELS, PolicyLoadingService) {
        return {
            restrict: "E",
            scope: {
                context: "@"
            },
            controllerAs: "vm",
            bindToController: true,
            controller: interestedPartyController,
            templateUrl: "components/interested.party/interested.party.html"
        };

        function interestedPartyController($scope) {
            var vm = this;

            vm.display = {};
            vm.display.party = $state.params.partyData;


            vm.events = {};
            vm.events.getParty = getParty;
            vm.events.updateParty = updateParty;

            if(vm.display.party) {
              console.log(">>> party is ", vm.display.party);
              getParty(vm.display.party.id);
            }

            // -----------------------------------------------

            function getParty(partyId) {
                interestedPartyService.getParty(partyId).then(handleGetParty);
            }

            function updateParty(party) {
                interestedPartyService.updateParty(party).then(handleUpdateParty);
            }

            function handleGetParty(party) {
                vm.display.party = party.data;
            }

            function handleUpdateParty(party) {
                vm.display.party = party.data;
            }
        }
      }
})();
