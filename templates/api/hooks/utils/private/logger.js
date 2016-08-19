/**
 * Logger module
 *
 * @description Logger module is used to log errors for troubleshooting.
 * Creating a separate logger module to keep logger isolated form the code logic.
 * We can change it anytime without affecting rest of the code.
 *
 */

var LOGGER = {};
LOGGER.log = sails.log;

module.exports = LOGGER;