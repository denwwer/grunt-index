/*
 * grunt-index
 * https://github.com/Klab-Berlin/grunt-index
 *
 * Copyright (c) 2014 Frederik Rudeck
 * Licensed under the MIT license.
 */

'use strict';


var doT = require('dot');


module.exports = function(grunt) {

  grunt.registerMultiTask('index', 'Compile a index.html file with doT.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      template: 'default.jst'
    });

    var template = grunt.file.read(options.template);
    var templateData = this.data.templateData || {};

    // Populate hashed assets
    if (options.assetsMap) {
      var assets = grunt.file.readJSON(options.assetsMap);
      var keys = Object.keys(assets);
      var assetData = {
        assets: {
          css: {},
          js: {}
        }
      };

      grunt.log.writeln('Replace assets to hashed version');

      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var path = k.split('/');
        // Match app.min.js => app
        var name = path[path.length - 1].match(/^[a-zA-Z]+/)[0];
        var ext = 'js';

        if (k.match(/\.css$/)) {
          ext = 'css';
        }

        assetData.assets[ext][name] = assets[k].replace(/^(dist|desc)/, '');
      }

      Object.assign(templateData, assetData);
    }

    if (typeof this.data.dest === 'undefined') {
      grunt.log.error('You have to specify a destination in your task configuration');
      return false;
    }

    templateData.dest = this.data.dest;

    var index = doT.template(template)(templateData);

    grunt.file.write(this.data.dest, index);
    grunt.log.writeln('Generated ' + this.data.dest);
  });
};
