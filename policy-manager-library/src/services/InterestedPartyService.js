import APIService from './APIService';
import * as Models from '../models/';

/**
 * @type {Object}
 * @name END_POINTS
 * @access private
 */
const END_POINTS = {
    policies: "/api/v1/interestedParties"
};


app.get('/api/v1/interestedParties', controller.findInterestedParties(app));
  app.get('/api/v1/interestedParties/:id', controller.findInterestedParty(app));
  app.post('/api/v1/interestedParties', controller.saveInterestedParty(app));
  app.put('/api/v1/interestedParties', controller.updateInterestedParty(app));
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
     * @desc Get interestedParties data
     * @returns {Promise}
     */
    getInterestedParties() {
        return this.doGet(END_POINTS.interestedParties);
    }

    /**
     * @desc Get interestedParty data, by id
     * @param   {string} partyId
     * @returns {Promise}
     */
    getInterestedPartyId(partyId: string) {
        return this.doGet(END_POINTS.interestedParties + '/' + partyId);
    }

    /**
     * @desc Update interestedParty data
     * @param {Policy} interestedParty
     * @returns {Promise}
     */
    updateInterestedParty(interestedParty: Models.InterestedParty) {
        return this.doPut(END_POINTS.interestedParty, interestedParty.toObject());
    }
    /**
     * @desc Save interestedParty data
     * @param {Policy} interestedParty
     * @returns {Promise}
     */
    saveInterestedParty(interestedParty: Models.InterestedParty) {
        return this.doPost(END_POINTS.interestedParty, interestedParty.toObject());
    }
}
