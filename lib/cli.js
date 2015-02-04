'use strict';

var OneGuide = /** @type OneGuide */ require('../lib/one-guide');

function cli(config, patterns, excludes) {
    var checkFlow = new OneGuide({
        root: process.cwd(),
        config: config,
        excludes: excludes
    });

    return checkFlow.addPatternList(patterns).then(function () {
        if (checkFlow.issues.length) {
            process.stderr.write(checkFlow.toString());
            if (checkFlow.hasCriticalIssues()) {
                return 1;
            }
        }
        return 0;
    });
}

module.exports = cli;
