var fs = require('fs')
var gulp = require('gulp')
var log = require('gulp-util').log
var babelify = require('babelify')
var browserify = require('browserify')
var prependify = require('prependify')

var ex = {}

ex.log = function (what, colorCode) {
    return ('\u001b[' + colorCode + 'm' + what + '\u001b[0m')
}
ex.generateBundle = function (input, output, showDestination) {
  log("Starting '" + ex.log("babelify + concat", 36) + "'...")
  if (showDestination) log("Packaging into '" + ex.log(output, 36) + "'")
  browserify({ debug: true })
    .transform(babelify)
    .require(input, { entry: true })
    .plugin(prependify, '/**\n  This file was autogenerated.\n'
      + '  See https://github.com/borgbackup/borgweb\n'
      + '*/\n')
    .bundle()
    .on('error', function (err) { log("Error: " + err.message) })
    .pipe(fs.createWriteStream(output))
}

module.exports = ex