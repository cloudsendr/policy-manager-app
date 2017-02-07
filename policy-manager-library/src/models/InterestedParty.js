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
            id: null,
            type: null,
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            timestamp: null
        });
    }

    /**
     * @desc id
     * @return {string}
     * @example
     * "588fa44fe4b025619191b1c3"
     */
    get id() {
        let instance = privateProps.get(this);
        return instance.id;
    }

    /**
     * @param {String} id
     */
    set id(id: string) {
        let instance = privateProps.get(this);
        instance.id = id;
    }

    /**
     * @param {String} type  // enum: ['agent', 'lender', 'buyer', 'seller']
     */
    get type() {
        let instance = privateProps.get(this);
        return instance.type;
    }

    /**
     * @desc type
     * @return {string}
     * @example
     * "seller"
     */
    set type(type: string) {
        let instance = privateProps.get(this);
        instance.type = type;
    }

    /**
     * @param {String} firstName - Party first name
     */
    get firstName() {
        let instance = privateProps.get(this);
        return instance.firstName;
    }

    /**
     * @desc lastName
     * @return {string}
     * @example
     * "John"
     */
    set firstName(firstName: string) {
        let instance = privateProps.get(this);
        instance.firstName = firstName;
    }

    /**
     * @param {String} lastName - Party last name
     */
    get lastName() {
        let instance = privateProps.get(this);
        return instance.lastName;
    }

    /**
     * @desc lastName
     * @return {string}
     * @example
     * "John"
     */
    set lastName(lastName: string) {
        let instance = privateProps.get(this);
        instance.lastName = lastName;
    }

    /**
     * @desc email
     * @return {string}
     * @example
     * "sal-salesman@salehome.com"
     */
    get email() {
        let instance = privateProps.get(this);
        return instance.email;
    }

    /**
     * @param {String} email - email
     */
    set email(email: string) {
        let instance = privateProps.get(this);
        instance.email = email;
    }

    /**
     * @desc phone
     * @return {string}
     * @example
     * "18006667788"
     */
    get phone() {
        let instance = privateProps.get(this);
        return instance.phone;
    }

    /**
     * @param {String} phone - phone
     */
    set phone(phone: string) {
        let instance = privateProps.get(this);
        instance.phone = phone;
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

    /**
     * @desc Return this model in Javascript object form
     * @return {Object}
     */
    toObject() {
        let instance = privateProps.get(this);

         return {
          id: instance.id,
          type: instance.type,
          firstName: instance.firstName,
          lastName: instance.lastName,
          email: instance.email,
          phone: instance.phone,
          timestamp: instance.timestamp
        };
    }
}
