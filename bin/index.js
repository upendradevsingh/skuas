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
// $ webcore -v
// $ webcore -V
// $ webcore --version
// $ webcore version
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


// $ webcore new <appname>
cmd = program.command('new [path_to_new_app]');
// cmd.option('--dry');
cmd.option('--base [baseApp]');
cmd.option('--viewEngine [viewEngine]');
cmd.option('--template [viewEngine]');
cmd.usage('[path_to_new_app]');
cmd.unknownOption = NOOP;
cmd.action(require('./new'));
//cmd.action(require('../node_modules/sails/bin/sails-new'));

cmd = cmd = program.command('update');
cmd.action(require('./exec'));


//
// Normalize help argument, i.e.
//
// $ webcore --help
// $ webcore help
// $ webcore
// $ webcore <unrecognized_cmd>
//


// $ webcore help (--help synonym)
cmd = program.command('help');
cmd.description('');
cmd.action(program.usageMinusWildcard);



// $ webcore <unrecognized_cmd>
// Mask the '*' in `help`.
program
    .command('*')
    .action(program.usageMinusWildcard);



// Don't balk at unknown options
program.unknownOption = NOOP;



// $ webcore
//
program.parse(process.argv);
var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
    program.usageMinusWildcard();
}