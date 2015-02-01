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
        this.params = _.extend({}, params);
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

});

module.exports = BaseAdapter;
