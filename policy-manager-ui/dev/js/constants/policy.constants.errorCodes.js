(function () {
    angular.module("policy.constants.errorCodes", [])
        .constant('HttpErrorCodes', {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            NOT_MODIFIED: 304,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAYMENT_REQUIRED: 402,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            CONFLICT: 409,
            INTERNAL_SERVER_ERROR: 500,
            BAD_GATEWAY: 502,
            SERVICE_UNAVAILABLE: 503,
            GATEWAY_TIMEOUT: 504
        });
})();
