/**
 * Extend lodash
 * @description Add custom method into lodash
 */


/**
 * @description creates a new object from given array
 *
 *
 * Sameple Array [
 * 	{
 * 		config: {},
 * 		value: {}
 * 	}
 * ]
 *
 * @param  {Array} arr
 * @return {Object} obj
 */
function objectsArrayToObject(arr) {
    'use strict';

    return arr.reduce(function(obj, item) {

        obj[item.config] = item.value;

        return obj;

    }, {});
}

/**
 * @description convert a javascript object into query string
 * @param  {Object} obj JavaScript object
 * @return {String} str query string
 */
function objToQuery(obj) {
    'use strict';
    var str = '';

    obj = obj || {};

    _.forEach(obj, function(value, key) {
        str += key + '=' + value + '&';
    });

    if (str !== '') {
        str = str.slice(0, -1);
    }

    return str;
}


module.exports = function() {
    'use strict';

    _.mixin({
        objectsArrayToObject: objectsArrayToObject,
        objToQuery: objToQuery
    });
};