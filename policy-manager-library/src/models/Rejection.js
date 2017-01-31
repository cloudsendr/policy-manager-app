/**
 * @type {WeakMap}
 * @name privateProp
 * @access private
 */
let privateProps = new WeakMap();

export default class {
    constructor($q) {
        privateProps.set(this, {
            $q: $q
        });
    }

    badRequest(message: string) {
        let deferred = privateProps.get(this).$q.defer();

        deferred.reject({
            statusText: "Bad Request",
            data: {
                message: message,
                status: 400,
                rejection: deferred.promise
            }
        });

        return deferred.promise;
    }
}