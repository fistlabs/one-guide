'use strict';

var path = require('path');

module.exports = [
    {
        Class: require.resolve('./eslint-adapter'),
        configFile: path.join(__dirname, './configs/.eslintrc')
    },
    {
        Class: require.resolve('./jscs-adapter'),
        configFile: path.join(__dirname, './configs/.jscsrc')
    }
];
