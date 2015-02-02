'use strict';

var _ = require('lodash-node');

function isAdapter(obj) {
    return _.isObject(obj) && _.isFunction(obj.findFileIssues) && _.isFunction(obj.formatFileIssue);
}

function isAdapterDecl(obj) {
    return _.isObject(obj) && _.isString(obj.Class) && _.isString(obj.configPath);
}

exports.isAdapter = isAdapter;

exports.isAdapterDecl = isAdapterDecl;
