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
        it('Should clone params.config to adapter.config', function () {
            var config = {
                x: 42
            };
            var adapter = new BaseAdapter({
                config: config
            });
            assert.ok(adapter.config);
            assert.deepEqual(adapter.config, config);
            assert.notStrictEqual(adapter.config, config);
        });
    });
    describe('adapter.findFileIssues()', function () {
        it('Should be a function', function () {
            var adapter = new BaseAdapter();
            assert.strictEqual(typeof adapter.findFileIssues, 'function');
        });
        it('Should return Array', function () {
            var adapter = new BaseAdapter();
            assert.ok(Array.isArray(adapter.findFileIssues()));
        });
    });
    describe('adapter.formatFileIssue()', function () {
        it('Should be a function', function () {
            var adapter = new BaseAdapter();
            assert.strictEqual(typeof adapter.formatFileIssue, 'function');
        });
        it('Should return given object', function () {
            var issue = {};
            var adapter = new BaseAdapter();
            assert.strictEqual(adapter.formatFileIssue(issue), issue);
        });
    });
    describe('BaseAdapter.loadConfig()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof BaseAdapter.loadConfig, 'function');
        });
        it('Should just require filename', function () {
            var conf = BaseAdapter.loadConfig(__filename);
            assert.strictEqual(conf.id, exports.id);
        });
    });
    describe('BaseAdapter.mergeConfigs', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof BaseAdapter.mergeConfigs, 'function');
        });
        it('Should extent c1 but no mutate', function () {
            var c1 = {
                foo: 1
            };
            var c2 = {
                bar: 2
            };
            var conf = BaseAdapter.mergeConfigs(c1, c2);
            assert.notStrictEqual(c1, conf);
            assert.deepEqual(conf, {
                foo: 1,
                bar: 2
            });
        });
    });
});
