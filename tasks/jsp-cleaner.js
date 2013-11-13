/*
 * grunt-jsp-cleaner
 */

var gruntRegexHelper = require('../lib/regex-helper');

module.exports = function(grunt) {

  "use strict";

  /*
  regex

   <%=\s*variable(?:(?!<).)*%> variable
   <%@\s*((?!<).)*%>
   <c:out\s*value="\${variable}((?!<).)*</c:out>  variable, c
   <c:\s*((?!<).)*</c:if>
   */

/*  "grunt-jsp-clean": {
    task-name: {
      src: 'foo/bar.js', //single file
        actions: [
          {
            type: 'var-replace',
            constants: [
              {var: 'constant'},
              {var2: 'constant2}'
            ]
          }, {
            type: 'var-replace',
            prefix: 'c',
            constants: {
              var: 'constant',
              var2: 'constant2'
            }
          }, {
            name: 'foobar',
            search: new RegExp('\\w+'),
            replace: function(){
              return 'foofoo';
            }
          }
        ]
      }
    }*/

  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('jsp-cleaner', 'remove or replace jsp markup', function(){
    var fileAddr = this.data.src,
        file,
        actions = this.data.actions,
        writeAddr = 'test/temp/regexReplace.txt';
    if(grunt.file.isFile(fileAddr)) file = grunt.file.read(fileAddr);
    grunt.file.write(writeAddr, gruntRegexHelper.regexReplace(file, 'Goodbye', 'Hello'));
    for (var i = 0; i < actions.length; i++) {
      if(actions[i].type === 'var-replace') {
         cleanerHelper.varReplace(content, actions[i].constants);
      } else {
        grunt.log.error('Incorrect action type');
      }

    }

    /* var files = grunt.file.expand(this.files[0].src),

       for(var i = 0; i< files.length; i++){
         if(toString.call(actions) === arrString){
           updatedContent = grunt.file.read(files[i]);
           for(var j = 0; j < actions.length; j++){
             srchAction = actions[j].search;
             rplAction = actions[j].replace;
             options = actions[j].flags;
             if( (typeof srchAction !== 'string' && toString.call(srchAction) !== regexString )
             || (typeof rplAction !== 'string' && typeof rplAction !== 'function') || typeof options !== 'string' )
             {
               grunt.warn('An error occured while processing (Invalid type passed for \'search\' or \'replace\' of \'flags\'
                , only strings accepted.)' );
             }
             if(typeof srchAction === 'string'){
               srchAction = grunt.template.process(srchAction);
             }
             if(typeof rplAction === 'string'){
               rplAction = grunt.template.process(rplAction);
             }
             updatedContent = regexReplace( updatedContent, srchAction, rplAction , options);
           }
           grunt.file.write(files[i], updatedContent);
           if(this.errorCount){
             return false;
           }
           grunt.log.writeln('File \'' + files[i] + '\' replace complete.');
         }
       }*/
  });

};
