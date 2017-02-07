(function () {
    angular.module("dataService.catalogListService", [])
        .service("catalogListService", catalogListService);

    function catalogListService(PolicyManagerLib, PolicyLoadingService, utilityService) {
        var service = {};
        var _archiveContext = false;

        service.getActivityLogs = getActivityLogs;
        service.getActivityLogTypes = utilityService.getActivityLogTypes;
        service.initializeModals = initializeModals;
        service.destroyModals = destroyModals;
        service.initializePopovers = initializePopovers;
        service.filterActivityLogs = filterActivityLogs;

        service.setArchiveContext = setArchiveContext;
        service.removeArchiveContext = removeArchiveContext;
        service.isArchiveContext = isArchiveContext;
        service.archiveActivityLog = archiveActivityLog;

        service.cacheActivityLogFilter = cacheActivityLogFilter;
        service.getActivityLogFilter = getActivityLogFilter;

        return service;

        // ---------------------------------------------------

        function getActivityLogs(nextPage, filter) {
            var accountId = localStorageService.get(localStorageService.keys().myAccount);
            var request = {};

            request.accountId = accountId;
            if (nextPage) {
                request.pageHref = nextPage;
            }

            if (!filter) {
                if (_archiveContext) {
                    request.hidden = "true";
                }

                return ConnectedHomeLib.getActivityLogs(request)
                    .then(handlePagedActivityLogs)
                    .catch(handlePagedActivityLogError);
            } else {
                return filterActivityLogs(filter, nextPage);
            }
        }

        function initializeModals(modalList, $scope) {
            return connectedModalService.initializeModals(modalList, $scope);
        }

        function destroyModals(modalList) {
            return connectedModalService.destroyModals(modalList);
        }

        function initializePopovers(popoverList, $scope) {
            return connectedModalService.initializePopovers(popoverList, $scope);
        }

        function filterActivityLogs(filter, nextPage) {
            cacheActivityLogFilter(filter);
            var accountId = localStorageService.get(localStorageService.keys().myAccount);
            var request = {};
            request.accountId = accountId;
            request.activityType = filter;
            if (nextPage) {
                request.pageHref = nextPage;
            }

            if (!filter) {
                return getActivityLogs(null);
            } else {
                if (_archiveContext) {
                    request.hidden = "true";
                }
                return ConnectedHomeLib.getActivityLogsByType(request)
                    .then(handlePagedActivityLogs)
                    .catch(handlePagedActivityLogError);
            }
        }

        function setArchiveContext() {
            _archiveContext = true;
        }

        function removeArchiveContext() {
            _archiveContext = false;
        }

        function isArchiveContext() {
            return _archiveContext;
        }

        function archiveActivityLog(activityLogId) {
            return ConnectedHomeLib.archiveActivityLog(activityLogId);
        }

        function cacheActivityLogFilter(filter) {
            if(filter === "") {
                filter = false;
            }
            localStorageService.put(localStorageService.keys().activityLogFilter, filter);
        }

        function getActivityLogFilter() {
            var filter = localStorageService.get(localStorageService.keys().activityLogFilter);
            return (angular.equals(filter, {})) ? false : filter;
        }

        // ----------------------------------------------------------------------------------------------------------------------------------

        function handlePagedActivityLogs(response) {
            var activityLogs = [];
            if (response.data.embedded.activityLogs) {
                activityLogs = response.data.embedded.activityLogs;
                activityLogs.sort(function (a, b) {
                    if (a.age < b.age)
                        return -1;
                    if (a.age > b.age)
                        return 1;
                });
            }
            return {
                nextPage: (response.data.links.next) ? response.data.links.next.href : null,
                data: activityLogs,
                total: response.data.page.totalElements
            };
        }

        function handlePagedActivityLogError(error) {
            utilityService.handleServerError(error);
            return {
                nextPage: null,
                data: [],
                total: 0
            };
        }
    }
})();
