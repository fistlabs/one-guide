'use strict';

var BaseAdapter = /** @type BaseAdapter */ require('./base-adapter');
var Checker = require('jscs');

var inherit = require('inherit');
var loadConfigFile = require('jscs/lib/cli-config');

/**
 * @class JscsAdapter
 * @extends BaseAdapter
 * */
var JscsAdapter = inherit(BaseAdapter, /**@lends JscsAdapter.prototype */ {

    /**
     * @private
     * @memberOf {JscsAdapter}
     * @method
     *
     * @param {Object} params
     * @param {String} params.configFile
     *
     * @constructs
     * */
    __constructor: function (params) {
        var jscsChecker = new Checker();
        this.__base(params);

        jscsChecker.registerDefaultRules();
        jscsChecker.configure(this.config);

        /**
         * @public
         * @memberOf {JscsAdapter}
         * @property
         * @type {Checker}
         * */
        this.jscsChecker = jscsChecker;
    },

    /**
     * @public
     * @memberOf {JscsAdapter}
     * @method
     *
     * @param {Buffer|String} content
     * @param {String} filename
     *
     * @returns {Array}
     * */
    findFileIssues: function (content, filename) {
        return this.jscsChecker.checkString(content, filename).getErrorList();
    },

    /**
     * @public
     * @memberOf {JscsAdapter}
     * @method
     *
     * @param {Object} issue
     *
     * @returns {Object}
     * */
    formatFileIssue: function (issue) {
        issue.severity = 1;
        delete issue.rule;
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
    adapterName: 'jscs',

    /**
     * @public
     * @static
     * @memberOf {JscsAdapter}
     * @method
     *
     * @param {String} configFile
     *
     * @returns {Object}
     * */
    loadConfig: function (configFile) {
        return loadConfigFile.load(configFile);
    }

});

module.exports = JscsAdapter;
