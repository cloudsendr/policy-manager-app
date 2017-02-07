import * as Services from '../services/';
import * as Models from '../models/';

/**
 * @type {WeakMap}
 * @name services
 * @access private
 */
let services = new WeakMap();

/**
 * @type {WeakMap}
 * @name privateProps
 * @access private
 */
let privateProps = new WeakMap();

/**
 * @name PolicyManagerLib
 *
 * @desc
 * Facade for all API proxy services:
 * * PolicyManagerService
 */
export default class {
    /**
     * @param {Service} $http - AngularJS, $http service for making API calls
     * @see https://docs.angularjs.org/api/ng/service/$http
     */
    constructor($http, $q) {
        services.set(this, {
          policyManagerService: new Services.PolicyManagerService($http),
          interestedPartyService: new Services.InterestedPartyService($http)
        });

        privateProps.set(this, {
            rejection: new Models.Rejection($q)
        });
    }

    /**
     * @desc Get policies datad
     * @returns {Promise}
     */
    getPolicies() {
        return services.get(this).policyManagerService.getPolicies();
    }

    /**
     * @param {string} policyId
     * @return {Promise}
     * @throws {Error} PolicyId is required
     */
     getPolicyById(policyId: string) {
        if (policyId === "") {
            console.error("[.getPolicyById(policyId)] policyId is required");
            return privateProps.get(this).rejection.badRequest("PolicyId id is required");
        }
        return services.get(this).policyManagerService.getPolicyById(policyId);
    }

    /**
     * @param {Object} policy
     * @param {string} policy.policyNumber
     * @param {string} policy.status
     * @param {string} policy.address
     * @param {string} policy.lenderId
     * @param {string} policy.agentId
     * @param {string} policy.sellerId
     * @param {string} policy.buyerId
     * @param {date} policy.timestamp
     *
     * @return {Promise}
     *
     * @throws {Error} Invalid policy data
     */
    updatePolicy(policy: Object) {
        let policyData = new Models.Policy();

        try {
          policyData.id = policy.id;
          policyData.policyNumber = policy.policyNumber;
          policyData.status = policy.status;
          policyData.address = policy.address;
          policyData.lender = policy.lender;
          policyData.agent = policy.agent;
          policyData.seller = policy.seller;
          policyData.buyer = policy.buyer;
        } catch (e) {
            console.error("[.updatePolicy()] Invalid policy given: ", policy);
            return privateProps.get(this).rejection.badRequest("Invalid policy");
        }

        return services.get(this).policyManagerService.updatePolicy(policyData);
    }

    /**
     * @param {Object} policy
     * @param {string} policy.policyNumber
     * @param {string} policy.status
     * @param {string} policy.address
     * @param {string} policy.lenderId
     * @param {string} policy.agentId
     * @param {string} policy.sellerId
     * @param {string} policy.buyerId
     * @param {date} policy.timestamp
     *
     * @return {Promise}
     *
     * @throws {Error} Invalid policy data
     */
    savePolicy(policy: Object) {
        let policyData = new Models.Policy();

        try {
            policyData.status = (policy.status) ? policy.status : "";
            policyData.address = (policy.address) ? policy.address : "";
            policyData.lenderId = (policy.lenderId) ? policy.lenderId : "";
            policyData.agentId = (policy.agentId) ? policy.agentId : "";
            policyData.sellerId = (policy.sellerId) ? policy.sellerId : "";
            policyData.buyerId = (policy.buyerId) ? policy.buyerId : "";
            policyData.timestamp = (policy.timestamp) ? policy.timestamp : new date();
        } catch (e) {
            console.error("[.savePolicy()] Invalid policy given: ", policy);
            return privateProps.get(this).rejection.badRequest("Invalid policy");
        }

        return services.get(this).policyManagerService.savePolicy(policyData);
    }

    /**
     * @desc Get interestedParties datad
     * @returns {Promise}
     */
    getInterestedParties() {
        return services.get(this).interestedPartyService.getInterestedParties();
    }

    /**
     * @param {string} partyId
     * @return {Promise}
     * @throws {Error} PartyId is required
     */
     getInterestedPartyById(partyId: string) {
        if (partyId === "") {
            console.error("[.getInterestedPartyById()] partyId is required");
            return privateProps.get(this).rejection.badRequest("partyId id is required");
        }
        return services.get(this).interestedPartyService.getInterestedPartyById(partyId);
    }

    /**
     * @param {Object} interestedParty
     * @param {string} interestedParty.id
     * @param {string} interestedParty.type
     * @param {string} interestedParty.fullName
     * @param {string} interestedParty.email
     * @param {string} interestedParty.phone
     * @param {date} interestedParty.timestamp
     *
     * @return {Promise}
     *
     * @throws {Error} Invalid interestedParty data
     */
    updateInterestedParty(interestedParty: Object) {
        let interestedPartyData = new Models.InterestedParty();

        try {
            interestedPartyData.id = interestedParty.id;
            interestedPartyData.type = (interestedParty.type) ? interestedParty.type : "";
            interestedPartyData.firstName = (interestedParty.firstName) ? interestedParty.firstName : "";
            interestedPartyData.lastName = (interestedParty.lastName) ? interestedParty.lastName : "";
            interestedPartyData.email = (interestedParty.email) ? interestedParty.email : "";
            interestedPartyData.phone = (interestedParty.phone) ? interestedParty.phone : "";
            interestedPartyData.timestamp = (interestedParty.timestamp) ? interestedParty.timestamp : new date();
        } catch (e) {
            console.error("[.updateInterestedParty()] Invalid interestedParty given: ", interestedParty);
            return privateProps.get(this).rejection.badRequest("Invalid interestedParty");
        }

        return services.get(this).interestedPartyService.updateInterestedParty(interestedPartyData);
    }

    /**
    * @param {Object} interestedParty
    * @param {string} interestedParty.type
    * @param {string} interestedParty.fullName
    * @param {string} interestedParty.email
    * @param {string} interestedParty.phone
    * @param {date} interestedParty.timestamp
     *
     * @return {Promise}
     *
     * @throws {Error} Invalid interestedParty data
     */
    saveInterestedParty(interestedParty: Object) {
        let interestedPartyData = new Models.InterestedParty();

        try {
          interestedPartyData.type = (interestedParty.type) ? interestedParty.type : "";
          interestedPartyData.fullName = (interestedParty.fullName) ? interestedParty.fullName : "";
          interestedPartyData.email = (interestedParty.email) ? interestedParty.email : "";
          interestedPartyData.phone = (interestedParty.phone) ? interestedParty.phone : "";
          interestedPartyData.timestamp = (interestedParty.timestamp) ? interestedParty.timestamp : new date();
        } catch (e) {
            console.error("[.saveInterestedParty()] Invalid interestedParty given: ", interestedParty);
            return privateProps.get(this).rejection.badRequest("Invalid interestedParty");
        }

        return services.get(this).interestedPartyService.saveInterestedParty(interestedPartyData);
    }

}
