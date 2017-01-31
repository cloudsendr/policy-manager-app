/**
 * @type {string}
 * @name API_URL
 * @access private
 */

const API_URL = "https://myserver/policies"

/**
 * @type {WeakMap}
 * @name privateProp
 * @access private
 */
let privateProps = new WeakMap();

/**
 * @name APIService
 *
 * @desc
 * Service which performs all basic server calls (GET, PUT, POST, DELETE)
 * The assigned API_KEY will be added to the headers before a server call is made,
 * and be removed after the call is made (successful or not)
 */
export default class {
    /**
     * @param {Service} $http - AngularJS, $http service for making API calls
     * @see https://docs.angularjs.org/api/ng/service/$http
     *
     */
    constructor($http) {
        privateProps.set(this, {
            $http: $http
        });
    }

    /**
     * @param {string} url - REST endpoint being called
     * @return {Promise} Angular promise
     */
    doGet(url: string) {
        let instance = privateProps.get(this);

        let promise = instance.$http.get(API_URL + url);

        return promise;
    }

    /**
     * @param {string} uri - REST endpoint being called
     * @return {Promise} Angular promise
     */
    doGetUri(uri: string) {
        let instance = privateProps.get(this);

        let promise = instance.$http.get(uri);

        return promise;
    }

    /**
     * @param {string} url - REST endpoint being called
     * @param {string} request - request data
     * @return {Promise} Angular promise
     */
    doPost(url: string, request: Object) {
        let instance = privateProps.get(this);

        let promise = instance.$http.post(API_URL + url, request);

        return promise;
    }

    /**
     * @param {string} url - REST endpoint being called
     * @param {string} request - request data
     * @return {Promise} Angular promise
     */
    doPut(url: string, request: Object) {
        let instance = privateProps.get(this);

        let promise = instance.$http.put(API_URL + url, request);

        return promise;
    }

    /**
     * @param {string} url - REST endpoint being called
     * @return {Promise} Angular promise
     */
    doDelete(url) {
        let instance = privateProps.get(this);

        let promise = instance.$http.delete(API_URL + url);

        return promise;
    }
}
