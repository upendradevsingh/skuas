#!/usr/bin/env node


/**
 * Module dependencies
 */

var _ = require('lodash');
var program = require('commander');
var package = require('../package.json');
var NOOP = function() {};


//
//
// Monkey-patch commander
//
//

// Allow us to display help(), but omit the wildcard (*) command.
program.Command.prototype.usageMinusWildcard = program.usageMinusWildcard = function() {
    program.commands = _.reject(program.commands, {
        _name: '*'
    });
    program.help();
};

// Force commander to display version information.
program.Command.prototype.versionInformation = program.versionInformation = function() {
    program.emit('version');
};



program
    .version(package.version, '-v, --version');


//
// Normalize version argument, i.e.
//
// $ skuas -v
// $ skuas -V
// $ skuas --version
// $ skuas version
//


// make `-v` option case-insensitive
process.argv = _.map(process.argv, function(arg) {
    return (arg === '-V') ? '-v' : arg;
});


// $ sails version (--version synonym)
program
    .command('version')
    .description('')
    .action(program.versionInformation);


// $ skuas new <appname>
cmd = program.command('new [path_to_new_app]');
// cmd.option('--dry');
cmd.option('--base [baseApp]');
cmd.option('--viewEngine [viewEngine]');
cmd.option('--template [viewEngine]');
cmd.usage('[path_to_new_app]');
cmd.unknownOption = NOOP;
cmd.action(require('./new'));
//cmd.action(require('../node_modules/sails/bin/sails-new'));

//
// Normalize help argument, i.e.
//
// $ skuas --help
// $ skuas help
// $ skuas
// $ skuas <unrecognized_cmd>
//


// $ skuas help (--help synonym)
cmd = program.command('help');
cmd.description('');
cmd.action(program.usageMinusWildcard);



// $ skuas <unrecognized_cmd>
// Mask the '*' in `help`.
program
    .command('*')
    .action(program.usageMinusWildcard);



// Don't balk at unknown options
program.unknownOption = NOOP;



// $ skuas
//
program.parse(process.argv);
var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
    program.usageMinusWildcard();
}