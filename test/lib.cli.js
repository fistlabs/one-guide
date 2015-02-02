'use strict';

var assert = require('assert');
var path = require('path');

describe('lib/cli', function () {
    var cli = require('../lib/cli');

    it('Should return 0 on valid code', function () {
        return cli('default', [path.join(__dirname, 'fixtures/valid.js')], []).then(function (code) {
            assert.strictEqual(code, 0);
        });
    });

    it('Should return 1 on invalid code with critical issues', function () {
        return cli('default', [path.join(__dirname, 'fixtures/invalid.js')], []).then(function (code) {
            assert.strictEqual(code, 1);
        });
    });

    it('Should return 0 on invalid code with no critical issues', function () {
        return cli('default', [path.join(__dirname, 'fixtures/invalid-no-crit.js')], []).then(function (code) {
            assert.strictEqual(code, 0);
        });
    });
});
