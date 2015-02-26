'use strict';

var _ = require('lodash-node');
var inherit = require('inherit');

/**
 * @class BaseAdapter
 * */
var BaseAdapter = inherit(/** @lends BaseAdapter.prototype */ {

    /**
     * @private
     * @memberOf {BaseAdapter}
     * @method
     *
     * @param {Object} params
     * */
    __constructor: function (params) {

        /**
         * @public
         * @memberOf {BaseAdapter}
         * @property
         * @type {Object}
         * */
        this.params = _.extend({}, params);

        /**
         * @public
         * @memberOf {BaseAdapter}
         * @property
         * @type {Object}
         * */
        this.config = this.loadConfig(this.params.configFile);
    },

    /**
     * @public
     * @memberOf {BaseAdapter}
     * @method
     *
     * @param {String} configFile
     *
     * @returns {Object}
     * */
    loadConfig: function (configFile) {
        return require(configFile);
    },

    /**
     * @public
     * @memberOf {BaseAdapter}
     * @method
     *
     * @returns {Array}
     * */
    findFileIssues: function () {
        return [];
    },

    /**
     * @public
     * @memberOf {BaseAdapter}
     * @method
     *
     * @returns {Object}
     * */
    formatFileIssue: function (issue) {
        return issue;
    }

}, {

    /**
     * @public
     * @static
     * @memberOf {BaseAdapter}
     * @property
     * @type {String}
     * */
    adapterName: 'base'
});

module.exports = BaseAdapter;
