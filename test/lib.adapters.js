'use strict';

var _ = require('lodash-node');
var assert = require('assert');
var path = require('path');

function hasAdapter(adapters, adapterName, confName) {
    var adapter = _.find(adapters, {
        Class: path.join(__dirname, '../lib/', adapterName),
        configFile: path.join(__dirname, '../lib/configs/', confName)
    });
    return Boolean(adapter);
}

describe('lib/adapters', function () {
    var adapters = require('../lib/adapters');
    it('Should have jscs adapter', function () {
        assert.ok(hasAdapter(adapters, 'jscs-adapter.js', '.jscsrc'));
    });
    it('Should have eslint adapter', function () {
        assert.ok(hasAdapter(adapters, 'eslint-adapter.js', '.eslintrc'));
    });
});
