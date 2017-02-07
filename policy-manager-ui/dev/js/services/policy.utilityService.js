(function () {
    angular.module("policy.services.utility", [])
        .service("utilityService", utilityService);

    function utilityService($ionicHistory, $ionicContentBanner, $q) {
        var _contentbanner = null;
        var service = {};

        service.getActivityLogTypes = getActivityLogTypes;
        service.getDeviceTypes = getDeviceTypes;
        service.getProviderTypes = getProviderTypes;
        service.removeLeadingOneFromPhoneNumber = removeLeadingOneFromPhoneNumber;
        service.addLeadingOneOnPhoneNumber = addLeadingOneOnPhoneNumber;
        service.clearViewCache = clearViewCache;
        service.cacheUserData = cacheUserData;
        service.cacheUserDataNotFound = cacheUserDataNotFound;
        service.showContentBanner = showContentBanner;
        service.getFutureDateTime = getFutureDateTime;
        service.isAccountComplete = isAccountComplete;
        service.getDevicePlatform = getDevicePlatform;

        service.triggerRejection = triggerRejection;
        service.handleServerError = handleServerError;
        service.displayNetworkError = displayNetworkError;

        service.initializePushNotifications = initializePushNotifications;
        service.getStripeErrorCodes = getStripeErrorCodes;

        return service;

        // ---------------------------------------------------------

        //TODO: Refactor the structure to something more sensible
        //.types.triageAlert
        //.display.triageAlert
        //or something...
        function getActivityLogTypes() {
            var types = {
                triageAlert: {
                    type: "TRIAGE_ALERT",
                    display: "Triage Alert"
                },
                appointment: {
                    type: "APPOINTMENT",
                    display: "Appointment",
                    statuses: {
                        cancelled: "CANCELLED",
                        reschedule: "RESCHEDULE",
                        completed: "COMPLETED",
                        frozen: "FROZEN",
                        enroute: "EN_ROUTE"
                    }
                },
                serviceRequest: {
                    type: "SERVICE_REQUEST",
                    display: "Service Request",
                    statuses: {
                        created: "CREATED",
                        scheduled: "SCHEDULED",
                        cancelled: "CANCELLED",
                        completed: "COMPLETED",
                        enroute: "EN_ROUTE",
                        frozen: "FROZEN"
                    }
                },
                estimate: {
                    type: "ESTIMATE",
                    display: "Estimate"
                },
                paymentError: {
                    type: "PAYMENT_ERROR",
                    display: "Payment Error"
                },
                receipt: {
                    type: "RECEIPT",
                    display: "Receipt"
                }
            };

            var typeArray = [];
            for (var type in types) {
                typeArray.push(types[type]);
            }
            types.typeArray = typeArray;

            return types;
        }

        function getDeviceTypes() {
            var types = {
                water: {
                    type: "water",
                    display: "Water"
                },
                hvac: {
                    type: "hvac",
                    display: "HVAC/AC"
                }
            };

            var typeArray = [];
            for (var type in types) {
                typeArray.push(types[type]);
            }
            types.typeArray = typeArray;

            return types;
        }

        function getProviderTypes() {
            return [
                'Electrician',
                'HVAC',
                'Plumber'
            ];
        }

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

        function cacheUserData(accountData) {
            if (accountData.accountId) {
                localStorageService.put(localStorageService.keys().myAccount, accountData.accountId);
            } else if (accountData.id) {
                localStorageService.put(localStorageService.keys().myAccount, accountData.id);
            }
            localStorageService.put(localStorageService.keys().username, accountData.username);
            localStorageService.put(localStorageService.keys().fullName, accountData.firstName + ' ' + accountData.lastName);
            localStorageService.put(localStorageService.keys().phoneNumber, accountData.phoneNumber);
            //localStorageService.put(localStorageService.keys().isAccountComplete, accountData.isAccountComplete);
            localStorageService.put(localStorageService.keys().isAccountComplete, false);
        }

        function cacheUserDataNotFound() {
            localStorageService.put(localStorageService.keys().myAccount, localStorageService.keys().notFound);
            localStorageService.put(localStorageService.keys().username, localStorageService.keys().notFound);
            localStorageService.put(localStorageService.keys().fullName, localStorageService.keys().notFound);
            localStorageService.put(localStorageService.keys().isAccountComplete, localStorageService.keys().notFound);
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

        function isAccountComplete() {
            return localStorageService.get(localStorageService.keys().isAccountComplete);
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

        //Used for server errors coming from the ConnectedLibrary only
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

        function getStripeErrorCodes() {

            return {
                invalidNumbeer: "invalid_number",
                invalidExpiryMonth: "invalid_expiry_month",
                invalidExpiryYear: "invalid_expiry_year",
                invalidCVC: "invalid_cvc",
                incorrectNumber: "incorrect_number",
                expiredCard: "expired_card",
                incorrectCVC: "incorrect_cvc",
                incorrectZip: "incorrect_zip",
                cardDeclined: "card_declined",
                missing: "missing",
                processingError: "processing_error"
            };
        }
    }
})();
