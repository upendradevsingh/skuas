/**
 * Constant hook
 * @description module to add all the constants into the global namespace.
 * This will enable application to access following variables globally.
 *
 *         CONTENT.TEXT_AUTH
 *         MESSAGE.USER_SESSION_EXPIRED
 *         TEMPLATE.CATEGORY
 *
 * Module will help to keep clean and de-coupled.
 * Please refer README.md for more details.
 */


module.exports = function constants(sails) {
    'use strict';

    return {
        /**
         * Default values
         *
         * @type {Object}
         */
        defaults: {
            message: 'MESSAGE',
            template: 'TEMPLATE',
            content: 'CONTENT'
        },
        /**
         * Configure the hook.
         * This can be used to prepare data before hook gets initialized.
         * This method will be called before hook gets loaded or initialized.
         */
        configure: function() {

            // If User/System config files are available
            // Add them into node globals
            if (sails.config.message) {
                global[this.defaults.message] = sails.config.message;
            }

            // If properties/constants config files are available
            // Add them into node globals
            if (sails.config.content) {
                global[this.defaults.content] = sails.config.content;
            }

            // If template config files are available
            // Add them into node globals
            if (sails.config.template) {
                global[this.defaults.template] = sails.config.template;
            }
        },
        /**
         * Initialize hooks
         * @param {function} cb a callback function to let sails complete the loading and move to next step
         */
        initialize: function(cb) {
            sails.log.verbose('Constants are initialized');
            cb();
        }
    };
};