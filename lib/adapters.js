'use strict';

var path = require('path');

module.exports = [
    {
        Class: require.resolve('./eslint-adapter'),
        configFile: path.join(__dirname, './configs/yandex-node/.eslintrc')
    },
    {
        Class: require.resolve('./jscs-adapter'),
        configFile: path.join(__dirname, './configs/yandex-node/.jscsrc')
    }
];
