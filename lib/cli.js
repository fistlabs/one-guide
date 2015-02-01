'use strict';

var OneGuide = /** @type OneGuide */ require('../lib/one-guide');
var adapters = require('./adapters');

function cli(patterns, excludes) {
    var checkFlow = new OneGuide({
        root: process.cwd(),
        adapters: adapters,
        excludes: excludes
    });

    return checkFlow.addPatternList(patterns).then(function () {
        process.stderr.write(checkFlow.toString());
        return Number(checkFlow.hasCriticalIssues());
    });
}

module.exports = cli;
