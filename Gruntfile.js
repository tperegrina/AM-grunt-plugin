module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '*',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        expr: true
      },
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    clean: {
      "functional-test-data":[
        'test/temp/**/*.*'
      ]
    },
    nodeunit: {
      all: ['test/**/*test.js']
    },
    "jsp-cleaner": {
      test: {
        src: 'test/fixtures/regexReplace.txt',
        actions: [
          {
            type: 'var-replace',
            constants: {
              variable1: 'Constant Number 1',
              variable2: 'Constant Number 2',
              variable3: 'Constant Number 3'
            }
          },
          {

          }
        ]
      }
    }
  });
  //Load dependency tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['jshint', 'nodeunit']);
  grunt.registerTask('cleaner', ['jsp-cleaner']);
};

