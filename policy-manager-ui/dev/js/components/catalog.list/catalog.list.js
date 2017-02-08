(function () {
    angular.module("catalog.list", ["dataService.catalogListService"])
        .directive("catalogList", catalogList);

    function catalogList(catalogListService, PolicyLoadingService) {
        return {
            restrict: "E",
            scope: {
                context: "@"
            },
            controllerAs: "vm",
            bindToController: true,
            controller: catalogListController,
            templateUrl: "components/catalog.list/catalog.list.html"
        };

        function catalogListController($scope) {
            var vm = this;
            var _nextPage = null;

            vm.display = {};
            vm.display.catalog = [{'body': 'Your Policy has been created.', 'fromStatus':'Created', 'toStatus':''},
              {'body': 'Title check for your policy is in progress.', 'fromStatus':'Created', 'toStatus':'Title Check'},
              {'body': 'Your policy has been denied due to the title check.', 'fromStatus':'Title Check', 'toStatus':'Denied'},
              {'body': 'Your policy is now in Pending Liens status.', 'fromStatus':'Title Check', 'toStatus':'Pending Liens'},
              {'body': 'Your policy has been denied due to Pending Liens.', 'fromStatus':'Pending Liens', 'toStatus':'Denied'},
              {'body': 'Your Policy has cleared Pending Liens and is awaiting approval.', 'fromStatus':'Pending Liens', 'toStatus':'Pending Liens Cleared'},
              {'body': 'Your Policy has been denied.', 'fromStatus':'Pending Liens Cleared', 'toStatus':'Denied'},
              {'body': 'Your Policy has been approved.', 'fromStatus':'Pending Liens Cleared', 'toStatus':'Approved'},
              ];

            vm.events = {};

            // -----------------------------------------------
          }
    }
})();
