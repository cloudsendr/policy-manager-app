(function () {
    angular.module('policy-manager-ui', ['ionic',
                                        'angular-momentjs',
                                        'policy-manager-lib',
                                        'ngIOS9UIWebViewPatch',
                                        'angular-uri',
                                        'ionic.rating',
                                        'jett.ionic.content.banner',
                                        'ngLetterAvatar',
                                        'logglyLogger',
                                        'ng-showdown',
                                        'policy.constants.errorCodes',
                                        'policy.constants.loadingTemplate',
                                        'policy.constants.appStates',
                                        'policy.constants.channels',
                                        'policy.unexpectedError',
                                        'policy.services.appFlowService',
                                        'policy.services.utility',
                                        'policy.formatters.phoneNumber',
                                        'policy.loading',
                                        'policy.root',
                                        'policy.list',
                                        'policy.detail',
                                        'interested.party',
                                        'catalog.list'
                                  ])
        .config(function ($ionicConfigProvider, $compileProvider) {
            $ionicConfigProvider.views.transition('platform');
            $ionicConfigProvider.views.swipeBackEnabled(false);
            $compileProvider.debugInfoEnabled(false);
        });
})();
