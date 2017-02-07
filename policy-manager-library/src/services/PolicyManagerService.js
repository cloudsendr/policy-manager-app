import APIService from './APIService';
import * as Models from '../models/';

/**
 * @type {Object}
 * @name END_POINTS
 * @access private
 */
const END_POINTS = {
    policies: "/api/v1/policies"
};

/**
 * @name PolicyManagerService
 *
 * @desc
 * API proxy for policy manager handling.
 * All service calls return a Promise, resolving with the data.
 *
 * Endpoints:
 * * policies: /api/v1/policies
 */
export default class PolicyManagerService extends APIService {
    /**
     * @param {Service} $http - AngularJS, $http service for making API calls
     * @see https://docs.angularjs.org/api/ng/service/$http
     *
     * @param {String} API_KEY - Authentication key
     * @param {String} API_SECRET - Authentication key
     */
    constructor($http, API_KEY, API_SECRET) {
        super($http, API_KEY, API_SECRET);
    }

    /**
     * @desc Get policies datad
     * @returns {Promise}
     */
    getPolicies() {
        return this.doGet(END_POINTS.policies);
    }

    /**
     * @desc Get policies data, by policyId
     * @param   {string} policyId
     * @returns {Promise}
     */
    getPolicyById(policyId: string) {
        return this.doGet(END_POINTS.policies + '/' + policyId);
    }

    /**
     * @desc Update policy data
     * @param {Policy} policy
     * @returns {Promise}
     */
    updatePolicy(policy: Models.Policy) {
      console.log("in policy =", policy);
      console.log("json policy =", policy.toObject());
        return this.doPut(END_POINTS.policies, policy.toObject());
    }
    /**
     * @desc Save policy data
     * @param {Policy} policy
     * @returns {Promise}
     */
    savePolicy(policy: Models.Policy) {
        return this.doPost(END_POINTS.policies, policy.toObject());
    }
}
