#one-guide [![Build Status](https://travis-ci.org/fistlabs/one-guide.svg)](https://travis-ci.org/fistlabs/one-guide)

The solution based on [jscs](http://jscs.info/) checker and [eslint](http://jscs.info/) validator.

OneGuide is a tool that wraps jscs and eslint and provides an issues in one format. 

_Configs are built-in and not customizable._

OneGuide provides 3 interfaces:

##[Gulp](http://gulpjs.com/) plugin

```js
var oneGuidePipe = require('one-guide/plugins/gulp');
gulp.task('lint', function () {
    return this.src([
        'lib/**/*.js'
    ]).pipe(oneGuidePipe({
        root: process.cwd(),
        excludes: lintConf.excludes
    }));
});
```

##[Grunt](http://gruntjs.com/) plugin

```js
grunt.registerTask('lint', 'Lint\'N\'Style JavaScript', require('one-guide/plugins/grunt'));
    
grunt.initConfig({
    lint: {
        options: {
            root: process.cwd(),
            patterns: ['lib/**/*.js', 'test/**/*.js'],
            excludes: ['test/fixtures/**']
        }
    }
});
```

##Cli tool

```bash
$ one-guide "lib/**/*.js" "test/**/*.js" -I "test/fixtures/**"
```

---------
LICENSE [MIT](LICENSE)
