/*eslint max-nested-callbacks: 0*/
'use strict';

var BaseAdapter = require('../lib/base-adapter');

var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('lib/one-guide', function () {
    var OneGuide = require('../lib/one-guide');

    var invalidFilePath = path.join(__dirname, 'fixtures/invalid.js');
    var fixturesPattern = path.join(__dirname, 'fixtures/*.js');

    describe('OneGuide()', function () {
        it('Should be a function', function () {
            assert.strictEqual(typeof OneGuide, 'function');
        });
    });
    describe('guide.adapters', function () {
        it('Should have Array adapters member', function () {
            var guide = new OneGuide();
            assert.ok(Array.isArray(guide.adapters));
        });
        it('Should automatically add adapters', function () {
            var guide = new OneGuide();
            assert.strictEqual(guide.adapters.length, 2);
            assert.ok(guide.adapters[0] instanceof BaseAdapter);
            assert.ok(guide.adapters[1] instanceof BaseAdapter);
        });
    });
    describe('guide.issues', function () {
        it('Should have Array issues member', function () {
            var guide = new OneGuide();
            assert.ok(Array.isArray(guide.issues));
        });
    });
    describe('guide.params', function () {
        it('Should have Object params member', function () {
            var guide = new OneGuide();
            assert.ok(guide.params);
            assert.strictEqual(typeof guide.params, 'object');
        });
        it('Should clone given kwargs', function () {
            var params = {foo: 'bar'};
            var guide = new OneGuide(params);
            assert.strictEqual(guide.params.foo, params.foo);
            assert.notStrictEqual(guide.params, params);
        });
        it('Should provide defaults', function () {
            var guide = new OneGuide();
            assert.strictEqual(guide.params.root, process.cwd());
            assert.deepEqual(guide.params.excludes, []);
        });
    });
    describe('guide.addAdapter()', function () {
        it('Should add adapter by configuration', function () {
            var guide = new OneGuide();
            var baseLoad = require('../lib/base-adapter').loadConfig;

            require('../lib/base-adapter').loadConfig = function (configFile) {
                if (configFile === path.join(__dirname, '../lib/configs/yandex-node/.baserc')) {
                    return {
                        foo: 'bar'
                    };
                }
            };

            guide.addAdapter({
                Class: require.resolve('../lib/base-adapter')
            });
            require('../lib/base-adapter').loadConfig = baseLoad;
            assert.strictEqual(guide.adapters.length, 3);
            assert.ok(guide.adapters[2] instanceof BaseAdapter);
            assert.deepEqual(guide.adapters[2].config, {
                foo: 'bar'
            });
        });
        it('Should have an ability to override adapter config', function () {
            var guide = new OneGuide({
                override: {
                    base: {
                        bar: 'baz'
                    }
                }
            });
            var baseLoad = require('../lib/base-adapter').loadConfig;

            require('../lib/base-adapter').loadConfig = function (configFile) {
                if (configFile === path.join(__dirname, '../lib/configs/yandex-node/.baserc')) {
                    return {
                        foo: 'bar'
                    };
                }
            };

            guide.addAdapter({
                Class: require.resolve('../lib/base-adapter')
            });
            require('../lib/base-adapter').loadConfig = baseLoad;
            assert.strictEqual(guide.adapters.length, 3);
            assert.ok(guide.adapters[2] instanceof BaseAdapter);
            assert.deepEqual(guide.adapters[2].config, {
                foo: 'bar',
                bar: 'baz'
            });
        });
    });
    describe('guide.isFilenameExcluded()', function () {
        it('Should return true if the given filename matches at least one exclude', function () {
            var guide = new OneGuide({
                root: '/',
                excludes: ['var/log/**']
            });
            assert.ok(guide.isFilenameExcluded('/var/log/program.log'));
            assert.ok(!guide.isFilenameExcluded('/var/log2/program.log'));
        });
    });
    describe('guide.isSuitable()', function () {
        it('Should return true if the given filename is not excluded and is file', function () {
            var guide = new OneGuide({
                root: '/'
            });
            assert.ok(guide.isSuitable(__filename));
            assert.ok(!guide.isSuitable(__dirname));
        });
    });
    describe('guide.addFileContent()', function () {
        it('Should store issues by file content', function () {
            var guide = new OneGuide({
                adapters: require('../lib/adapters')
            });
            assert.strictEqual(guide.issues.length, 0);
            guide.addFileContent(fs.readFileSync(invalidFilePath, 'utf-8'), invalidFilePath);
            assert.ok(guide.issues.length);
        });
    });
    describe('guide.addFilename()', function () {
        it('Should store issues by filename', function () {
            var guide = new OneGuide({
                adapters: require('../lib/adapters')
            });
            assert.strictEqual(guide.issues.length, 0);

            return guide.addFilename(invalidFilePath).then(function () {
                assert.ok(guide.issues.length);
            });
        });
    });
    describe('guide.addFileList()', function () {
        it('Should store issues by file list', function () {
            var guide = new OneGuide({
                adapters: require('../lib/adapters')
            });
            assert.strictEqual(guide.issues.length, 0);

            return guide.addFileList([invalidFilePath, __dirname]).then(function () {
                assert.ok(guide.issues.length);
            });
        });
    });
    describe('guide.addPattern()', function () {
        it('Should store issues by pattern', function () {
            var guide = new OneGuide({
                adapters: require('../lib/adapters')
            });
            assert.strictEqual(guide.issues.length, 0);

            return guide.addPattern(fixturesPattern).then(function () {
                assert.ok(guide.issues.length);
            });
        });
    });
    describe('guide.addPatternList()', function () {
        it('Should store issues by pattern list', function () {
            var guide = new OneGuide({
                adapters: require('../lib/adapters')
            });
            assert.strictEqual(guide.issues.length, 0);

            return guide.addPatternList([fixturesPattern]).then(function () {
                assert.ok(guide.issues.length);
            });
        });
    });
    describe('guide.toString()', function () {
        it('Should return String', function () {
            var guide = new OneGuide();
            assert.ok(typeof guide.toString(), 'string');
        });
    });
    describe('guide.hasCriticalIssues()', function () {
        it('Should return true if has critical issues', function () {
            var guide = new OneGuide();
            guide.issues.push({
                severity: 2
            }, {
                severity: 1
            });
            assert.ok(guide.hasCriticalIssues());
        });
        it('Should return false if there is no critical issues', function () {
            var guide = new OneGuide();
            guide.issues.push({
                severity: 1
            });
            assert.ok(!guide.hasCriticalIssues());
        });
    });
});
