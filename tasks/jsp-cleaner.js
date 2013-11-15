/*
 * grunt-jsp-cleaner
 */

var cleanerHelper = require('../lib/cleaner-helper');

module.exports = function(grunt) {

  "use strict";

  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('jsp-cleaner', 'remove or replace jsp markup', function(){
    var fileAddr = this.data.src,
        content,
        actions = this.data.actions,
        writeAddr = this.data.dest;

    if(grunt.file.isFile(fileAddr)) {
      content = grunt.file.read(fileAddr);
    }

    for (var i = 0; i < actions.length; i++) {
      switch (actions[i].type) {
        case 'replace':
          content = cleanerHelper.varReplace(content, actions[i].constants, actions[i].prefix);
          break;
        case 'clean':
          content = cleanerHelper.jspClean(content, actions[i].prefix);
          break;
        default:
          grunt.log.error('Incorrect action type');
          break;
      }
      grunt.log.writeln(content);
      grunt.file.write(writeAddr, content);
    }
  });

};
