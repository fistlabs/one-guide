'use strict';

var _ = require('lodash-node');
var assert = require('assert');
var path = require('path');
var fs = require('fs');

describe('lib/eslint-adapter', function () {
    var EslintAdapter = require('../lib/eslint-adapter');
    var configFile = path.join(__dirname, '../lib/configs/yandex-node/.eslintrc');

    describe('EslintAdapter()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof EslintAdapter, 'function');
        });
    });
    describe('EslintAdapter.adapterName', function () {
        it('Should have name "eslint"', function () {
            assert.strictEqual(EslintAdapter.adapterName, 'eslint');
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
                config: EslintAdapter.loadConfig(configFile)
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
    describe('mergeConfigs()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof EslintAdapter.mergeConfigs, 'function');
        });
        it('Should merge sub configs', function () {
            var c1 = {
                sub1: {
                    foo: 'bar'
                },
                sub2: {
                    bar: 'baz'
                }
            };
            var c1c = _.cloneDeep(c1);
            var c2 = {
                sub1: {
                    foo: 'baz'
                },
                sub2: {
                    baz: 'zot'
                },
                sub3: {
                    moo: 'boo'
                }
            };
            var conf = EslintAdapter.mergeConfigs(c1, c2);
            assert.notStrictEqual(c1, conf);
            assert.deepEqual(conf, {
                sub1: {
                    foo: 'baz'
                },
                sub2: {
                    bar: 'baz',
                    baz: 'zot'
                },
                sub3: {
                    moo: 'boo'
                }
            });
            assert.deepEqual(c1, c1c);
        });
    });
});
