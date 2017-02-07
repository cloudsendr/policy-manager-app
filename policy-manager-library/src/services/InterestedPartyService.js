import APIService from './APIService';
import * as Models from '../models/';

/**
 * @type {Object}
 * @name END_POINTS
 * @access private
 */
const END_POINTS = {
    interestedParties: "/api/v1/interestedParties"
};

/**
 * @name InterestedPartyService
 *
 * @desc
 * API proxy for interested party  handling.
 * All service calls return a Promise, resolving with the data.
 *
 * Endpoints:
 * * interestedParties: /api/v1/interestedParties
 */
export default class InterestedPartyService extends APIService {
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
    getInterestedPartyById(partyId: string) {
        return this.doGet(END_POINTS.interestedParties + '/' + partyId);
    }

    /**
     * @desc Update interestedParty data
     * @param {InterestedParty} interestedParty
     * @returns {Promise}
     */
    updateInterestedParty(interestedParty: Models.InterestedParty) {
        return this.doPut(END_POINTS.interestedParties, interestedParty.toObject());
    }
    /**
     * @desc Save interestedParty data
     * @param {InterestedParty} interestedParty
     * @returns {Promise}
     */
    saveInterestedParty(interestedParty: Models.InterestedParty) {
        return this.doPost(END_POINTS.interestedParties, interestedParty.toObject());
    }
}
