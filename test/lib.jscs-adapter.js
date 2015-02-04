'use strict';

var Checker = require('jscs');

var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('lib/jscs-adapter', function () {
    var JscsAdapter = require('../lib/jscs-adapter');
    var configFile = path.join(__dirname, '../lib/configs/yandex-node/.jscsrc');

    describe('JscsAdapter()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof JscsAdapter, 'function');
        });
    });
    describe('JscsAdapter.adapterName', function () {
        it('Should have name "jscs"', function () {
            assert.strictEqual(JscsAdapter.adapterName, 'jscs');
        });
    });
    describe('adapter.jscsChecker', function () {
        it('Should create eslint config', function () {
            var adapter = new JscsAdapter({
                configFile: configFile
            });
            assert.ok(adapter.jscsChecker instanceof Checker);
        });
    });
    describe('adapter.findFileIssues()', function () {
        it('Should find an issue', function () {
            var adapter = new JscsAdapter({
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
                rule: 'foo'
            };
            var adapter = new JscsAdapter({
                configFile: configFile
            });
            issue = adapter.formatFileIssue(issue);
            assert.strictEqual(issue.severity, 1);
            assert.strictEqual(issue.node, void 0);
        });
    });
});
