'use strict';

var path = require('path');

module.exports = [
    {
        Class: require.resolve('./eslint-adapter'),
        configFile: path.join(__dirname, './configs/default/.eslintrc')
    },
    {
        Class: require.resolve('./jscs-adapter'),
        configFile: path.join(__dirname, './configs/default/.jscsrc')
    }
];
