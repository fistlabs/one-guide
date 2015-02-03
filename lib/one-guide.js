'use strict';

var _ = require('lodash-node');
var adapters = require('./adapters');
var f = require('util').format;
var fs = require('fs');
var inherit = require('inherit');
var minimatch = require('minimatch');
var path = require('path');
var vow = require('vow');
var vowFs = require('vow-fs');
var consoleReporter = require('./reporters/console');

/**
 * @class OneGuide
 * */
var OneGuide = inherit(/** @lends OneGuide.prototype */ {

    /**
     * @private
     * @memberOf {OneGuide}
     * @method
     *
     * @param {Object} params
     *
     * @constructs
     * */
    __constructor: function (params) {

        /**
         * @public
         * @memberOf {OneGuide}
         * @property
         * @type {Array}
         * */
        this.adapters = [];

        /**
         * @public
         * @memberOf {OneGuide}
         * @property
         * @type {Array}
         * */
        this.issues = [];

        /**
         * @public
         * @memberOf {OneGuide}
         * @property
         * @type {Object}
         * */
        this.params = _.extend({
            excludes: [],
            config: 'yandex-node',
            root: process.cwd()
        }, params);

        _.forEach(adapters, this.addAdapter, this);
    },

    getConfigFilename: function (name) {
        return path.join(__dirname, f('configs/%s/.%src', this.params.config, name));
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {Object} adapterConf
     * @param {String} adapterConf.Class
     * @param {String} adapterConf.configFile
     *
     * @returns {OneGuide}
     * */
    addAdapter: function (adapterConf) {
        var AdapterClass = require(adapterConf.Class);
        var adapter = new AdapterClass({
            configFile: this.getConfigFilename(AdapterClass.adapterName)
        });
        this.adapters.push(adapter);
        return this;
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {String} filename
     *
     * @returns {Boolean}
     * */
    isFilenameExcluded: function (filename) {
        return _.some(this.params.excludes, function (pattern) {
            pattern = path.resolve(this.params.root, pattern);
            return minimatch(filename, pattern);
        }, this);
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {String} filename
     *
     * @returns {Boolean}
     * */
    isSuitable: function (filename) {
        return !this.isFilenameExcluded(filename) && fs.statSync(filename).isFile();
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {Buffer|String} content
     * @param {String} filename
     *
     * @returns {OneGuide}
     * */
    addFileContent: function (content, filename) {
        _.forEach(this.adapters, function (adapter) {
            var issues = adapter.findFileIssues(content, filename);
            issues = _.map(issues, function (issue) {
                return adapter.formatFileIssue(issue, filename);
            });
            Array.prototype.push.apply(this.issues, issues);
        }, this);
        return this;
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {String} filename
     *
     * @returns {Promise}
     * */
    addFilename: function (filename) {
        return vowFs.read(filename, 'utf-8').then(function (content) {
            this.addFileContent(content, filename);
        }, this);
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {Array<String>} fileList
     *
     * @returns {Promise}
     * */
    addFileList: function (fileList) {
        var promises = _.map(fileList, function (filename) {
            filename = path.resolve(this.params.root, filename);

            if (this.isSuitable(filename)) {
                return this.addFilename(filename);
            }

        }, this);
        return vow.all(promises);
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {String} pattern
     *
     * @returns {Promise}
     * */
    addPattern: function (pattern) {
        return vowFs.glob(pattern, {cwd: this.params.root}).then(function (fileList) {
            return this.addFileList(fileList);
        }, this);
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @param {Array<String>} patterns
     *
     * @returns {Promise}
     * */
    addPatternList: function (patterns) {
        var promises = _.map(patterns, function (pattern) {
            return this.addPattern(pattern);
        }, this);
        return vow.all(promises);
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @returns {String}
     * */
    toString: function () {
        return consoleReporter.generate(this.issues);
    },

    /**
     * @public
     * @memberOf {OneGuide}
     * @method
     *
     * @returns {Boolean}
     * */
    hasCriticalIssues: function () {
        var found = _.find(this.issues, function (issue) {
            return issue.severity > 1;
        });
        return Boolean(found);
    }
});

module.exports = OneGuide;
