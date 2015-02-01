'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');

describe('lib/eslint-adapter', function () {
    var EslintAdapter = require('../lib/eslint-adapter');
    var configFile = path.join(__dirname, '../lib/configs/.eslintrc');

    describe('EslintAdapter()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof EslintAdapter, 'function');
        });
    });
    describe('adapter.config', function () {
        it('Should create eslint config', function () {
            var adapter = new EslintAdapter({
                configFile: configFile
            });
            assert.ok(adapter.config);
            assert.strictEqual(typeof adapter.config, 'object');
        });
    });
    describe('adapter.findFileIssues()', function () {
        it('Should find an issue', function () {
            var adapter = new EslintAdapter({
                configFile: configFile
            });
            var filename = path.join(__dirname, 'fixtures/invalid.js');
            var content = fs.readFileSync(filename, 'utf-8');
            assert.ok(adapter.findFileIssues(content, filename).length > 0);
        });
    });
    describe('adapter.formatFileIssue()', function () {
        it('Should return given object', function () {
            var issue = {
                severity: 2,
                node: {},
                source: 'foo',
                ruleId: 'bar'
            };
            var adapter = new EslintAdapter({
                configFile: configFile
            });
            issue = adapter.formatFileIssue(issue, 'path/to/file');
            assert.strictEqual(issue.severity, 2);
            assert.strictEqual(issue.node, void 0);
            assert.strictEqual(issue.source, void 0);
            assert.strictEqual(issue.ruleId, void 0);
            assert.strictEqual(issue.filename, 'path/to/file');
        });
    });
});
