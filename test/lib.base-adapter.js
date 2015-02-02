'use strict';

var assert = require('assert');

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
            var adapter = new BaseAdapter({foo: 'bar'});
            assert.ok(adapter.params);
            assert.strictEqual(typeof adapter.params, 'object');
        });
        it('Should be a shallow copy of object', function () {
            var kwargs = {foo: 'bar'};
            var adapter = new BaseAdapter(kwargs);
            assert.deepEqual(adapter.params, kwargs);
            assert.notStrictEqual(adapter.params, kwargs);
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
});
