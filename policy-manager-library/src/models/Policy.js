/**
 * @type {WeakMap}
 * @name privateProp
 * @access private
 */
let privateProps = new WeakMap();

/**
 * @name Policy
 * @desc Model respresenting an alert profile
 */
export default class {
    /**
     * @desc Defaults to an empty profile
     */
    constructor() {
        privateProps.set(this, {
            policyNumber: null,
            status: null,
            address: null,
            lenderId: null,
            agentId: null,
            sellerId: null,
            buyerId: null,
            timestamp: null
        });
    }

    /**
     * @desc Policy Number
     * @return {string}
     * @example
     * "588fa44fe4b025619191b1c3"
     */
    get policyNumber() {
        let instance = privateProps.get(this);
        return instance.policyNumber;
    }

    /**
     * @param {String} policyNumber
     */
    set policyNumber(policyNumber: string) {
        let instance = privateProps.get(this);
        instance.policyNumber = policyNumber;
    }

    /**
     * @param {String} status  // enum: ['created','title_check', 'pending_liens', 'pending_liens_cleared', 'approved', 'denied']
     */
    get status() {
        let instance = privateProps.get(this);
        return instance.status;
    }

    /**
     * @desc status
     * @return {string}
     * @example
     * "created"
     */
    set status(status: string) {
        let instance = privateProps.get(this);
        instance.status = status;
    }

    /**
     * @param {String} address - Property address
     */
    get address() {
        let instance = privateProps.get(this);
        return instance.address;
    }

    /**
     * @desc address
     * @return {string}
     * @example
     * "13600 Sunrise Blvd. Sunrise, FL 33323"
     */
    set address(address: string) {
        let instance = privateProps.get(this);
        instance.address = address;
    }

    /**
     * @desc lenderId
     * @return {string}
     * @example
     * "588fa44fe4b025619191b1c3"
     */
    get lenderId() {
        let instance = privateProps.get(this);
        return instance.lenderId;
    }

    /**
     * @param {String} lenderId - reference id to lender
     */
    set lenderId(lenderId: string) {
        let instance = privateProps.get(this);
        instance.lenderId = lenderId;
    }

    /**
     * @desc agentId
     * @return {string}
     * @example
     * "588fa44fe4b025619191b1c3"
     */
    get agentId() {
        let instance = privateProps.get(this);
        return instance.agentId;
    }

    /**
     * @param {String} agentId - reference id to agent
     */
    set agentId(agentId: string) {
        let instance = privateProps.get(this);
        instance.agentId = agentId;
    }

    /**
     * @desc sellerId
     * @return {string}
     * @example
     * "588fa44fe4b025619191b1c3"
     */
    get sellerId() {
        let instance = privateProps.get(this);
        return instance.sellerId;
    }

    /**
     * @param {String} sellerId - reference id to seller
     */
    set sellerId(sellerId: string) {
        let instance = privateProps.get(this);
        instance.sellerId = sellerId;
    }

    /**
     * @desc buyerId
     * @return {string}
     * @example
     * "588fa44fe4b025619191b1c3"
     */
    get buyerId() {
        let instance = privateProps.get(this);
        return instance.buyerId;
    }

    /**
     * @param {String} buyerId - reference id to buyer
     */
    set buyerId(buyerId: string) {
        let instance = privateProps.get(this);
        instance.buyerId = buyerId;
    }

    /**
     * @desc timestamp
     * @return {date}
     * @example
     * "17890333000"
     */
    get timestamp() {
        let instance = privateProps.get(this);
        return instance.timestamp;
    }

    /**
     * @param {date} timestamp - reference id to buyer
     */
    set timestamp(timestamp: string) {
        let instance = privateProps.get(this);
        instance.timestamp = timestamp;
    }




    //**
    // * @param {Object} propertyAddress - Property address of the user being alerted
  //   */
    // set propertyAddress(propertyAddress: Object) {
    //     let instance = privateProps.get(this);
    //     instance.propertyAddress = {
    //         street: propertyAddress.street,
    //         city: propertyAddress.city,
    //         state: propertyAddress.state,
    //         postalCode: propertyAddress.postalCode
    //     };
    // }


    /**
     * @desc Return this model in Javascript object form
     * @return {Object}
     */
    toObject() {
        let instance = privateProps.get(this);

        return {
          policyNumber: instance.policyNumber,
          status: instance.status,
          address: instance.address,
          lenderId: instance.lenderId,
          agentId: instance.agentId,
          sellerId: instance.sellerId,
          buyerId: instance.buyerId,
          timestamp: instance.timestamp
        };
    }
}
