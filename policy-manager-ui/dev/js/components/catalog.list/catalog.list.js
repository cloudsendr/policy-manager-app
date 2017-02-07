(function () {
    angular.module("catalog.list", ["dataService.catalogListService"])
        .directive("catalogList", catalogList);

    function catalogList($timeout, $filter, $moment, appFlowService, catalogListService, POLICY_CHANNELS, PolicyLoadingService) {
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
            var _activityLogIdToArchive = null;
            var canArchiveLog = true;
            var scopeListeners = {};

            if (vm.context === "archive") {
                //Let activityLogService know all calls should be made under the
                //archive context
                activityLogService.setArchiveContext();
            } else {
                //Let activityLogService know all calls should be made under the
                //normal context
                activityLogService.removeArchiveContext();
            }

            vm.display = {};
            vm.display.slideOut = false;
            vm.display.activityLogs = null;
            vm.display.activityLogsPlus = [];
            vm.display.activityLogTypes = activityLogService.getActivityLogTypes();
            vm.display.activityLogFilter = activityLogService.getActivityLogFilter();
            vm.display.hasMore = false;
            vm.display.activityLogTotal = null;
            vm.display.isArchiveContext = activityLogService.isArchiveContext();
            vm.display.modals = {
                filterOptions: {
                    url: "activity-filtering-types.html",
                    instance: null
                }
            };

            vm.display.popovers = {
                moreOptions: {
                    url: "activity-overflow-options.html",
                    instance: null
                }
            };

            vm.events = {};
            vm.events.getMoreActivityLogs = getMoreActivityLogs;
            vm.events.refreshActivityLogs = refreshActivityLogs;
            vm.events.filterActivityLogs = filterActivityLogs;
            vm.events.archiveActivityLog = archiveActivityLog;
            vm.events.goToActivity = goToActivity;

            // -----------------------------------------------
            //TODO: For create note entries for self initiated service requests
            //Store which appliance and brand was choosen, etc

            getActivityLogs(vm.display.activityLogFilter);

            activityLogService.initializeModals(vm.display.modals, $scope).then(function (modalMaps) {
                for (var modalName in modalMaps) {
                    vm.display.modals[modalName].instance = modalMaps[modalName];
                }
            });

            activityLogService.initializePopovers(vm.display.popovers, $scope).then(function (popovers) {
                vm.display.popovers.moreOptions.instance = popovers.moreOptions;
            });

            scopeListeners.refreshView = $scope.$on(POLICY_CHANNELS.system.refreshView, function () {
                $scope.$apply(function () {
                    refreshActivityLogs();
                });
            });

            scopeListeners.undoRemoveActivity = $scope.$on(POLICY_CHANNELS.activityLogs.undoRemoveActivity, function () {
                _activityLogIdToArchive = null;
                refreshActivityLogs();
            });

            scopeListeners.removeActivity = $scope.$on(POLICY_CHANNELS.activityLogs.removeActivity, function (event) {
                activityLogService.archiveActivityLog(_activityLogIdToArchive).then(function () {
                    _activityLogIdToArchive = null;
                    refreshActivityLogs();
                });
            });

            scopeListeners.showOptions = $scope.$on(POLICY_CHANNELS.activityLogs.showOptions, function (event, message) {
                vm.display.popovers.moreOptions.instance.show(message);
            });

            scopeListeners.modalShown = $scope.$on("modal.shown", function () {
                for (var popver in vm.display.popovers) {
                    vm.display.popovers[popver].instance.hide();
                }
            });

            $scope.$on("$destroy", function () {
                for (var listener in scopeListeners) {
                    scopeListeners[listener]();
                }
                cleanUp();
            });

            // -----------------------------------------------

            function getActivityLogs(filter) {
                activityLogService.getActivityLogs(null, filter).then(handleActivityLogs);
            }

            function getMoreActivityLogs() {
                activityLogService.getActivityLogs(_nextPage, vm.display.activityLogFilter)
                    .then(function (activityLogs) {
                        handleActivityLogs(activityLogs, true);
                    }).finally(function () {
                        $scope.$broadcast(POLICY_CHANNELS.scroll.infiniteScrollComplete);
                    });
            }

            function refreshActivityLogs(pulled) {
                console.log(">>> can archive stuff");
                canArchiveLog = true;
                PolicyLoadingService.disableLoading();
                activityLogService.getActivityLogs(null, vm.display.activityLogFilter)
                    .then(handleActivityLogs)
                    .finally(function () {
                        $scope.$broadcast(POLICY_CHANNELS.scroll.refreshComplete);
                        PolicyLoadingService.enableLoading();
                    });
            }

            function handleActivityLogs(activityLogs, append) {
                if (!activityLogService.isArchiveContext() && vm.display.activityLogFilter === '') {
                    $scope.$emit(POLICY_CHANNELS.activityLogs.updateCount, activityLogs.total);
                }

                console.log(">>> activityLogs", activityLogs);
                vm.display.activityLogs = (append) ? vm.display.activityLogs.concat(activityLogs.data) : activityLogs.data;
                vm.display.activityLogTotal = activityLogs.total;
                var tmpLabel = '';
                var currLabel = '';
                var minLabel = '';
                vm.display.activityLogsPlus = [];
                for(al in vm.display.activityLogs) {
                    minLabel = "";
                      if(minLabel === 'Just now'  ||
                        minLabel.indexOf('m ago') > 0) {

                          tmpLabel = 'Today';
                          if(tmpLabel !== currLabel) {
                            vm.display.activityLogsPlus.push({'label': tmpLabel,
                                                              'creationDate' : vm.display.activityLogs[al].creationDate - 60000,
                                                              'height':''});
                            currLabel = tmpLabel;
                          }
                          vm.display.activityLogs[al].height='75px';
                          vm.display.activityLogsPlus.push(vm.display.activityLogs[al]);
                      } else if(minLabel.indexOf('h ago') > 0) {
                        var nowHour = $moment().get('hour');
                        var index = minLabel.indexOf('h ago');
                        var logHour = minLabel.substring(index -2, index);
                        if(logHour - nowHour > 0) {
                          tmpLabel = 'Yesterday';
                        } else {
                          tmpLabel = 'Today';
                        }
                        if(tmpLabel !== currLabel) {
                          vm.display.activityLogsPlus.push({'label' : tmpLabel,
                                                            'creationDate' : vm.display.activityLogs[al].creationDate - 60000,
                                                            'height':'30px'});
                          currLabel = tmpLabel;
                        }
                        vm.display.activityLogs[al].height='75px';
                        vm.display.activityLogsPlus.push(vm.display.activityLogs[al]);
                      } else if(minLabel.indexOf('1d ago') == 0) {
                        tmpLabel = 'Yesterday';
                        if(tmpLabel !== currLabel) {
                          vm.display.activityLogsPlus.push({'label' : tmpLabel,
                                                            'creationDate' : vm.display.activityLogs[al].creationDate - 60000,
                                                            'height':'30px'});
                          currLabel = tmpLabel;
                        }
                        vm.display.activityLogs[al].height='75px';
                        vm.display.activityLogsPlus.push(vm.display.activityLogs[al]);
                      } else  if(minLabel.indexOf('2d ago') == 0 ||
                                 minLabel.indexOf('3d ago') == 0 ||
                                 minLabel.indexOf('4d ago') == 0 ||
                                 minLabel.indexOf('5d ago') == 0 ||
                                 minLabel.indexOf('6d ago') == 0 ||
                                 minLabel.indexOf('7d ago') == 0 ) {
                        tmpLabel = $moment(vm.display.activityLogs[al].creationDate).format('dddd');
                        if(tmpLabel !== currLabel) {
                          vm.display.activityLogsPlus.push({'label' : tmpLabel,
                                                            'creationDate' : vm.display.activityLogs[al].creationDate - 60000,
                                                            'height':'35px'});
                          currLabel = tmpLabel;
                        }
                        vm.display.activityLogs[al].height='75px';
                        vm.display.activityLogsPlus.push(vm.display.activityLogs[al]);
                      } else {
                        tmpLabel = 'Older';
                        if(tmpLabel !== currLabel) {
                          vm.display.activityLogsPlus.push({'label': tmpLabel,
                                                            'creationDate' : vm.display.activityLogs[al].creationDate - 60000,
                                                            'height':'35px'});
                          currLabel = tmpLabel;
                        }
                        vm.display.activityLogs[al].height='75px';
                        vm.display.activityLogsPlus.push(vm.display.activityLogs[al]);
                      }
                }
                console.log("Activity logs plus ", vm.display.activityLogsPlus);
                if (activityLogs.nextPage) {
                    vm.display.hasMore = true;
                    _nextPage = activityLogs.nextPage;
                } else {
                    vm.display.hasMore = false;
                    _nextPage = null;
                }
            }

            function archiveActivityLog(index, activityLogId) {
                //TODO: Consolate into one if-else block or something...
                if (activityLogService.isArchiveContext()) {
                    return;
                }
                if (!canArchiveLog) {
                    return;
                }

                vm.display.activityLogs[index].slideOut = true;
                $timeout(function () {
                    canArchiveLog = false;
                    var result = vm.display.activityLogs.splice(index, 1);
                    _activityLogIdToArchive = activityLogId;
                    $scope.$emit(POLICY_CHANNELS.activityLogs.preRemoveActivityLog);
                }, 600);
            };

            function goToActivity(activityLog) {
                if (activityLogService.isArchiveContext()) {
                    appFlowService.activityLogs.goToIndividualArchiveActivity({
                        activityLogId: activityLog.id,
                        activityLogData: activityLog
                    });
                } else {
                    appFlowService.activityLogs.goToIndividualActivity({
                        activityLogId: activityLog.id,
                        activityLogData: activityLog
                    });
                }
            }

            function filterActivityLogs(filter, selected) {
                activityLogService.filterActivityLogs(filter).then(function (response) {
                    vm.display.modals.filterOptions.instance.hide();
                    handleActivityLogs(response);
                });
            }

            // -----------------------------------------------

            function cleanUp() {
                activityLogService.destroyModals(vm.display.modals);
            }
        }
    }
})();
