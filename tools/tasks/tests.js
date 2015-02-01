'use strict';

var gulpMocha = require('gulp-mocha');
var gulpIstanbul = require('gulp-istanbul');
var filesToCover = [
    'lib/**/*.js',
    'plugins/**/*.js'
];

module.exports = function (gulp) {
    gulp.task('unit', [], runMochaTests);
    gulp.task('cover', [], runTestsAndCover);
    gulp.task('test', ['lint'], runTestsAndCover);
};

function runTestsAndCover(done) {
    var self = this;
    this.src(filesToCover).
        //  cover files
        pipe(gulpIstanbul()).
        //  hook require for testing suite to require covered files
        pipe(gulpIstanbul.hookRequire()).
        on('finish', function () {
            // run tests
            runMochaTests.call(self).
                //  write coverage reports
                pipe(gulpIstanbul.writeReports()).
                on('end', done);
        });
}

function runMochaTests() {
    var mochaSuiteStream = gulpMocha({
        ui: 'bdd',
        reporter: 'spec',
        checkLeaks: true,
        slow: Infinity
    });
    return this.src('test/*.js').pipe(mochaSuiteStream);
}
