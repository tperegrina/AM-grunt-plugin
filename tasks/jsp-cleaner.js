/*
 * grunt-jsp-cleaner
 *
 *
 */

module.exports = function(grunt) {

  "use strict";

  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('jsp-cleaner', 'remove or replace jsp markup', function(){
    var files = grunt.file.expand(this.files[0].src),
      actions = this.data.actions,
      arrString = "[object Array]",
      regexString = "[object RegExp]",
      toString = Object.prototype.toString,
      GLOBAL = 'g',
      options = null,
      srchAction = null,
      rplAction = null,
      updatedContent;
      for(var i = 0; i< files.length; i++){
        if(toString.call(actions) === arrString){
          updatedContent = grunt.file.read(files[i]);
          for(var j = 0; j < actions.length; j++){
            srchAction = actions[j].search,
            rplAction = actions[j].replace; 
            options = actions[j].flags;
            if(typeof options === 'undefined'){
              options = GLOBAL;
            }
            if( (typeof srchAction !== 'string' && toString.call(srchAction) !== regexString ) || (typeof rplAction !== 'string' && typeof rplAction !== 'function') || typeof options !== 'string' ){
              grunt.warn('An error occured while processing (Invalid type passed for \'search\' or \'replace\' of \'flags\', only strings accepted.)' );
            }
            if(typeof srchAction === 'string'){
              srchAction = grunt.template.process(srchAction);
            }
            if(typeof rplAction === 'string'){
              rplAction = grunt.template.process(rplAction);
            }
            updatedContent = regexReplace( updatedContent, srchAction, rplAction , options, j, actions[j].name);
          }
          grunt.file.write(files[i], updatedContent);
          if(this.errorCount){
            return false;
          } 
          grunt.log.writeln('File \'' + files[i] + '\' replace complete.');
        }
      }
  });
  // ==========================================================================
  // HELPERS
  // ==========================================================================

  var regexReplace = function(source, regexString, regexOptions, substitutionString) {
    var regExp = null,
        updatedSource;
    //Initialize regular expression object
      regExp = new RegExp(regexString, regexOptions);
    //replace the source
    updatedSource = String(source).replace(regExp, substitutionString); //Substring can be a function
    return updatedSource;
  };

  var regexDelete = function(source, regexString, regexOptions) {
    return regexReplace(source, regexString, regexOptions, function(){return '';});
  };

};
