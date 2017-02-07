(function () {
    angular.module("policy.constants.channels", [])
        .constant('POLICY_CHANNELS', {
          system: {
              refreshView: "system:refreshView",
              error: "system:error",
              accountNotComplete: "system:accountNotComplete"
          },
          serviceSurvey: {
                ready: 'serviceSurvey:ready',
                close: 'serviceSurvey:close',
                initialize: 'serviceSurvey:initialize',
                completed: "serviceSurvey:completed"
            },
            creditCardNotice: {
                saveLater: "creditCardNotice:saveLater"
            },
            creditCardCollector: {
                complete: "creditCardCollector:complete"
            },
            triageWorkOrder: {
                initialize: "triageWorkOrder:intialize",
                ready: "triageWorkOrder:ready",
                close: "triageWorkOrder:close"
            },
            receipt: {
                receiptUpdated: "receipt:receiptUpdated"
            }
        });
})();
