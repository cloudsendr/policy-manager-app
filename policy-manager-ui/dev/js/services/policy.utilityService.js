(function () {
    angular.module("policy.services.utility", [])
        .service("utilityService", utilityService);

    function utilityService($ionicHistory, $ionicContentBanner, $q) {
        var _contentbanner = null;
        var service = {};

        service.removeLeadingOneFromPhoneNumber = removeLeadingOneFromPhoneNumber;
        service.addLeadingOneOnPhoneNumber = addLeadingOneOnPhoneNumber;
        service.clearViewCache = clearViewCache;
        service.showContentBanner = showContentBanner;
        service.getFutureDateTime = getFutureDateTime;
        service.getDevicePlatform = getDevicePlatform;

        service.triggerRejection = triggerRejection;
        service.handleServerError = handleServerError;
        service.displayNetworkError = displayNetworkError;

        service.initializePushNotifications = initializePushNotifications;

        return service;

        // ---------------------------------------------------------

        function removeLeadingOneFromPhoneNumber(phoneNumber) {
            phoneNumber = phoneNumber + "";

            if (phoneNumber.length === 11 && phoneNumber.substring(0, 1) === "1") {
                phoneNumber = phoneNumber.slice(1, phoneNumber.length);
            }

            return phoneNumber;
        }

        function addLeadingOneOnPhoneNumber(phoneNumber) {
            phoneNumber = phoneNumber + "";
            if (phoneNumber.substring(0, 1) !== "1") {
                phoneNumber = "1" + phoneNumber;
            }

            return parseInt(phoneNumber);
        }

        function clearViewCache() {
            $ionicHistory.clearHistory();
            return $ionicHistory.clearCache();
        }


        //TODO: Perhaps make a PR to content banner author to broadcast messages on click and close...
        function showContentBanner(textArray, options) {
            if (_contentbanner) {
                _contentbanner();
                _contentbanner = null;
            }

            var type = 'info';
            if (options) {
                type = (options.type) ? options.type : 'info';
            }

            _contentbanner = $ionicContentBanner.show({
                text: textArray,
                interval: 1750,
                autoClose: 3000,
                type: type,
                transition: 'vertical'
            });
        }

        function getFutureDateTime(futureInHours) {
            var currentDate = new Date();
            var twoHoursLater = new Date(currentDate.setHours(currentDate.getHours() + futureInHours));
            var twoHoursLaterTime = new Date(twoHoursLater.getFullYear(), twoHoursLater.getDate(), twoHoursLater.getHours() + 1, twoHoursLater.getHours(), twoHoursLater.getMinutes());

            return {
                date: twoHoursLater,
                time: twoHoursLaterTime
            };
        }

        function getDevicePlatform() {
            return ionic.Platform.platform();
        }

        function triggerRejection(rejectionMessage, hideBanner) {
            var defer = $q.defer();

            if (hideBanner === undefined) {
                if (Array.isArray(rejectionMessage)) {
                    showContentBanner(rejectionMessage, {
                        type: "validation"
                    });
                } else {
                    showContentBanner([rejectionMessage], {
                        type: "validation"
                    });
                }
            }

            defer.reject(rejectionMessage);

            return defer.promise;
        }

        function handleServerError(error) {

            if (error.data !== null) {
                console.log(">>> server error ", error);
                showContentBanner([error.statusText, error.data.message], {
                    type: 'error'
                });
            }

            if (error.rejection) {
                return error.rejection;
            } else {
                var defer = $q.defer();
                defer.reject(error);

                return defer.promise;
            }
        }

        function displayNetworkError() {
            showContentBanner(["Uh oh... the system is down", "Please try again later"], {
                type: "network"
            });
        }

        function initializePushNotifications() {
            var push = PushNotification.init({
                "android": {
                    "senderID": "716259692006",
                    "sound": true,
                    "vibrate": true,
                    "iconColor": "blue"
                },
                "ios": {
                    "alert": true,
                    "badge": true,
                    "sound": true,
                    "clearBadge": true
                }
            });

            push.on('registration', function (data) {
                console.log(">>> registration information", JSON.stringify(data));
                localStorageService.put(localStorageService.keys().regId, data.registrationId);
            });

            push.on('error', function (e) {
                alert("Error");
            });
        }
    }
})();
