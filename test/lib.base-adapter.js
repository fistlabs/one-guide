'use strict';

var assert = require('assert');
var inherit = require('inherit');

exports.id = 'foobar';

describe('lib/base-adapter', function () {
    var BaseAdapter = require('../lib/base-adapter');
    describe('BaseAdapter()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof BaseAdapter, 'function');
        });
    });
    describe('BaseAdapter.adapterName', function () {
        it('Should have name "base"', function () {
            assert.strictEqual(BaseAdapter.adapterName, 'base');
        });
    });
    describe('adapter.params', function () {
        it('Should take params as argument', function () {
            var BaseAdapter2 = inherit(BaseAdapter, {
                loadConfig: function () {}
            });
            var adapter = new BaseAdapter2({foo: 'bar'});
            assert.ok(adapter.params);
            assert.strictEqual(typeof adapter.params, 'object');
        });
        it('Should be a shallow copy of object', function () {
            var kwargs = {foo: 'bar'};
            var BaseAdapter2 = inherit(BaseAdapter, {
                loadConfig: function () {}
            });
            var adapter = new BaseAdapter2(kwargs);
            assert.deepEqual(adapter.params, kwargs);
            assert.notStrictEqual(adapter.params, kwargs);
        });
    });
    describe('adapter.config', function () {
        it('Should auto load config by configFile', function () {
            var spy = [];
            var BaseAdapter2 = inherit(BaseAdapter, {
                loadConfig: function (configFile) {
                    spy.push('loaded');
                    assert.strictEqual(configFile, 'foo/bar');
                    return {
                        foo: 'bar'
                    };
                }
            });
            var adapter = new BaseAdapter2({
                configFile: 'foo/bar'
            });
            assert.ok(adapter.config);
            assert.deepEqual(adapter.config, {
                foo: 'bar'
            });
        });
    });
    describe('adapter.findFileIssues()', function () {
        it('Should be a function', function () {
            var BaseAdapter2 = inherit(BaseAdapter, {
                loadConfig: function () {}
            });
            var adapter = new BaseAdapter2();
            assert.strictEqual(typeof adapter.findFileIssues, 'function');
        });
        it('Should return Array', function () {
            var BaseAdapter2 = inherit(BaseAdapter, {
                loadConfig: function () {}
            });
            var adapter = new BaseAdapter2();
            assert.ok(Array.isArray(adapter.findFileIssues()));
        });
    });
    describe('adapter.formatFileIssue()', function () {
        it('Should be a function', function () {
            var BaseAdapter2 = inherit(BaseAdapter, {
                loadConfig: function () {}
            });
            var adapter = new BaseAdapter2();
            assert.strictEqual(typeof adapter.formatFileIssue, 'function');
        });
        it('Should return given object', function () {
            var issue = {};
            var BaseAdapter2 = inherit(BaseAdapter, {
                loadConfig: function () {}
            });
            var adapter = new BaseAdapter2();
            assert.strictEqual(adapter.formatFileIssue(issue), issue);
        });
    });
    describe('adapter.loadConfig()', function () {
        it('Should be a function', function () {
            var adapter = new BaseAdapter({
                configFile: __filename
            });
            assert.strictEqual(typeof adapter.loadConfig, 'function');
        });
        it('Should just require filename', function () {
            var adapter = new BaseAdapter({
                configFile: __filename
            });
            var conf = adapter.loadConfig(__filename);
            assert.strictEqual(conf.id, adapter.config.id);
            assert.strictEqual(conf.id, exports.id);
        });
    });
});
