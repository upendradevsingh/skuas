/**
 * Utils hook
 * @description All the utils methods to be added into global namespace
 */

var methods = require('./private/helpers');

module.exports = function helpers(sails) {
    'use strict';

    return {
        /**
         * Configure the hook.
         * This can be used to prepare data before hook gets initialized.
         * This method will be called before hook gets loaded or initialized.
         */
        configure: function() {
            global.WebCore = global.WebCore || {};
            global.WebCore.utils = global.WebCore.utils || {};
        },

        /**
         * Initialize hooks
         * @param {function} cb a callback function to let sails complete the loading and move to next step
         */
        initialize: function(cb) {

            for (var key in methods) {
                if (methods.hasOwnProperty(key)) {
                    global.WebCore.utils[key] = methods[key];
                }
            }
            cb();
        }
    };
};