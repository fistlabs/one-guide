'use strict';

var BaseAdapter = /** @type BaseAdapter */ require('./base-adapter');
var Config = require('eslint/lib/config');

var _ = require('lodash-node');
var eslint = require('eslint');
var inherit = require('inherit');
var linter = eslint.linter;

/**
 * @class EslintAdapter
 * @extends BaseAdapter
 * */
var EslintAdapter = inherit(BaseAdapter, /**@lends EslintAdapter.prototype */ {

    /**
     * @public
     * @memberOf {EslintAdapter}
     * @method
     *
     * @param {Buffer|String} content
     * @param {String} filename
     *
     * @returns {Array}
     * */
    findFileIssues: function (content, filename) {
        return linter.verify(content, this.config, filename);
    },

    /**
     * @public
     * @memberOf {EslintAdapter}
     * @method
     *
     * @param {Object} issue
     * @param {String} filename
     *
     * @returns {Object}
     * */
    formatFileIssue: function (issue, filename) {
        delete issue.node;
        delete issue.source;
        delete issue.ruleId;
        issue.filename = filename;
        return issue;
    }
}, {

    /**
     * @public
     * @static
     * @memberOf {EslintAdapter}
     * @property
     * @type {String}
     * */
    adapterName: 'eslint',

    /**
     * @public
     * @static
     * @memberOf {EslintAdapter}
     * @method
     *
     * @param {String} configFile
     *
     * @returns {Object}
     * */
    loadConfig: function (configFile) {
        return new Config({
            configFile: configFile
        }).useSpecificConfig;
    },

    /**
     * @public
     * @static
     * @memberOf {EslintAdapter}
     * @method
     *
     * @param {Object} c1
     * @param {Object} c2
     *
     * @returns {Object}
     * */
    mergeConfigs: function (c1, c2) {
        c1 = _.extend({}, c1);
        c2 = Object(c2);
        _.forOwn(c2, function (subConf, sect) {
            c1[sect] = this.__base(c1[sect], subConf);
        }, this);
        return c1;
    }
});

module.exports = EslintAdapter;
