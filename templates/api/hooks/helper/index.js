/**
 * Module dependencies
 */

var _ = require('lodash');
var path = require('path');
var buildDictionary = require('sails-build-dictionary');

/**
 * @param  {SailsApp} sails
 * @return {Function}
 */
module.exports = function(sails) {
    'use strict';

    /**
     * `helpers`
     *
     * The definition of `helpers`, a core hook.
     *
     * @param  {SailsApp} sails
     * @return {Dictionary}
     */
    return {

        /**
         * Implicit defaults which will be merged into sails.config before this hook is loaded...
         * @type {Dictionary}
         */
        defaults: {
            globals: {
                helpers: true
            }
        },


        /**
         * Before any hooks have begun loading...
         * (called automatically by Sails core)
         */
        configure: function() {
            // This initial setup of `sails.helpers` was included here as an experimental
            // feature so that these modules would be accessible for other hooks.  This will be
            // deprecated in Sails v1.0 in favor of (likely) the ability for hook authors to register
            // or unregister helpers programatically.  In addition, helpers will no longer be exposed
            // on the `sails` app instance.
            //
            // Expose an empty dictionary for `sails.helpers` so that it is
            // guaranteed to exist.
            sails.helpers = {};
        },

        /* eslint indent: 0 */
        /**
         * Before THIS hook has begun loading...
         * (called automatically by Sails core)
         */
        loadModules: function(cb) {
            var _this = this;

            // Load service modules using the module loader
            // (by default, this loads helpers from files in `api/helpers/*`)
            buildDictionary
                .optional({
                        dirname: path.resolve(sails.config.appPath, 'api/helpers'),
                        filter: new RegExp('(.+)\\.(' + sails.config.moduleloader.sourceExt.join('|') + ')$'),
                        replaceExpr: null,
                        flattenDirectories: true,
                        keepDirectoryPath: true
                    },
                    function(err, modules) {
                        _this.exposeModules(err, modules);
                        // Relevant modules have finished loading.
                        return cb();
                    });
        },
        exposeModules: function(err, modules) {

            if (err) {
                sails.log.error('Error occurred loading modules ::');
                sails.log.error(err);
                return;
            }

            // Expose helpers on `sails.helpers` to provide access even when globals are disabled.
            _.extend(sails.helpers, modules);

            // Expose globals (if enabled)
            if (sails.config.globals.helpers) {
                _.each(sails.helpers, function(helper, identity) {
                    var globalId = helper.globalId || helper.identity || identity;
                    global[globalId] = helper;
                });
            }
        }
    };
};