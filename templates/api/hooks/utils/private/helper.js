/**
 * Application util library
 *
 */

var assert = require('assert');
var logger = require('./logger');

//Extending lodash
require('./extend-lodash')();

module.exports = {
    /**
     * @description empty check for a variable
     * @param  {object|string|number|boolean|null|undefined} obj input data of any type
     * @return {Boolean} true|false
     */
    isEmpty: function isEmpty(obj) {
        'use strict';
        if (typeof obj === 'undefined') {
            return true;
        } else if (obj === null || typeof obj === 'number' || typeof obj === 'boolean') {
            return obj ? false : true;
        } else if (typeof obj === 'string') {
            return obj.trim().length ? false : true;
        } else if (typeof obj === 'object') {
            return Object.keys(obj).length ? false : true;
        } else {
            return false;
        }
    },

    LOGGER: logger,

    /**
     * @description Method to parse Json and return false if json string is not valid else parsed Json object
     * @param  {string} stringify json object
     * @return {object} javascript object
     */
    jParse: function tryParseJSON(jsonString) {
        'use strict';
        try {
            var o = JSON.parse(jsonString);
            assert(o);
            assert(typeof o === 'object');
            assert(o !== null);
            return o;
        } catch (e) {
            if (e.name === 'AssertionError') {
                LOGGER.log.error('ERROR JBx0, Failed in parsing passed JSON string ->' + jsonString);
            } else {
                throw e;
            }
            return false;
        }
    },
    /**
     * @description Parse courrupt json response from Jive
     * @param  {string} stringify json object
     * @return {object} javascript object
     */
    parseJiveResponse: function(response) {
        'use strict';

        var trimmedResponse = response.replace('throw \'allowIllegalResourceCall is false.\';', '');
        return trimmedResponse !== '' ? JSON.parse(trimmedResponse) : {};
    }
};