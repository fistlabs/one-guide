#one-guide [![Build Status](https://travis-ci.org/fistlabs/one-guide.svg)](https://travis-ci.org/fistlabs/one-guide)

The solution based on [jscs](http://jscs.info/) checker and [eslint](http://jscs.info/) validator.

OneGuide is a tool that wraps jscs and eslint and provides an issues in one format. 

_Configs are built-in and not customizable._

##Cli tool

```bash
$ one-guide "lib/**/*.js" "test/**/*.js" -I "test/fixtures/**"
```

##Plugins

* [Gulp](http://gulpjs.com/) [plugin](https://www.npmjs.com/package/gulp-one-guide)
* [Grunt](http://gruntjs.com/) [https://www.npmjs.com/package/grunt-one-guide]

---------
LICENSE [MIT](LICENSE)
