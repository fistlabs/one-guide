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
        this.config = _.extend({}, this.params.config);
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
    adapterName: 'base',

    /**
     * @public
     * @static
     * @memberOf {BaseAdapter}
     * @method
     *
     * @param {String} configFile
     *
     * @returns {Object}
     * */
    loadConfig: function (configFile) {
        return require(configFile);
    }
});

module.exports = BaseAdapter;
