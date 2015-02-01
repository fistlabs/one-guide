'use strict';

var assert = require('assert');

describe('lib/reporters/console', function () {
    var reporter = require('../lib/reporters/console');
    describe('reporter.generate()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof reporter.generate, 'function');
        });
        it('Should return empty string if no issues given', function () {
            assert.strictEqual(reporter.generate([]), '');
        });
        it('Should return report', function () {
            var issues = [
                {
                    filename: '/foo/bar/baz.js',
                    line: 1,
                    severity: 1,
                    column: 2,
                    message: 'OMG'
                },
                {
                    filename: '/foo/bar/baz.js',
                    line: 2,
                    severity: 2,
                    column: 2,
                    message: 'OMG2'
                },
                {
                    filename: '/foo/bar/baz.js',
                    line: 3,
                    severity: 3,
                    column: 2,
                    message: 'OMG3.'
                }
            ];
            var report = reporter.generate(issues);
            assert.ok(/\/foo\/bar\/baz\.js/.test(report));
            assert.ok(/1:2/.test(report));
            assert.ok(/2:2/.test(report));
            assert.ok(/3:2/.test(report));
            assert.ok(/OMG\./.test(report));
            assert.ok(/OMG2\./.test(report));
            assert.ok(/OMG3\./.test(report));
        });
    });
});
