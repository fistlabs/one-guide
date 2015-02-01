'use strict';

var _ = require('lodash-node');
var f = require('util').format;
var colors = require('colors/safe');

function groupIssuesByFilename(allIssues) {
    var groupedIssues = _.groupBy(allIssues, 'filename');
    _.forOwn(groupedIssues, function (issues, filename, groups) {
        groups[filename] = _.sortBy(issues, 'line');
    });
    return groupedIssues;
}

function buildMessageText(str) {
    return str.replace(/\w$/, '$&.');
}

function buildHeaderText(str, severity) {
    if (severity > 1) {
        return colors.red('✕\t') + str;
    }

    return colors.yellow('!\t') + str;
}

module.exports = {
    generate: function (allIssues) {
        var issuesByFile = groupIssuesByFilename(allIssues);
        var stdErr = [];
        _.forOwn(issuesByFile, function (issues, filename) {
            stdErr.push(colors.underline(filename));
            _.forEach(issues, function (issue) {
                var messageText = buildMessageText(issue.message, issue.severity);
                var headerText = colors.grey(f('%d:%d', issue.line, issue.column));
                var issueText;

                headerText = buildHeaderText(headerText, issue.severity);
                issueText = f('%s\t\t%s', headerText, messageText);

                stdErr.push(issueText);
            });
            stdErr.push('');
        });

        if (stdErr.length) {
            stdErr.unshift('');
        }

        return stdErr.join('\n');
    }
};
