var rh = require('../lib/regex-helper'),
    grunt = require('grunt'),
    cleanerHelper = {};

exports.varReplace = function(originalString, constantsObject, markupPrefix) {
  var modifiedString = originalString;
  if( typeof markupPrefix === 'undefined') {
    grunt.log.write('Replacing variables:');
    for (var key in constantsObject) {
      if(constantsObject.hasOwnProperty(key)) {
        modifiedString = cleanerHelper.varJspReplace(modifiedString, key, constantsObject[key]);
      }
      grunt.log.write('.');
    }
  } else {
    grunt.log.write('Replacing Prefixed variables:');
    for (var i in constantsObject) {
      if(constantsObject.hasOwnProperty(i)) {
        modifiedString = cleanerHelper.varPrefixReplace(modifiedString, i, constantsObject[i], markupPrefix);
      }
      grunt.log.write('.');
    }
  }
  grunt.log.ok();
  return modifiedString;
};

exports.jspClean = function(originalString, markupPrefix) {
  var modifiedString;
  if( typeof markupPrefix === 'undefined' ) {
    grunt.log.write('Cleaning leftover JSP markup');
    modifiedString = cleanerHelper.cleanJsp(originalString);
    grunt.log.ok();
  } else {
    grunt.log.write('cleaning leftover prefixed JSP markup');
    modifiedString = cleanerHelper.cleanPrefixedJsp(originalString, markupPrefix);
    grunt.log.ok();
  }
  return modifiedString;
};

cleanerHelper = {
  varJspReplace: function(original, searchFor, replaceWith) {
    //Expected RegExp <%=\sVariable(?:(?!<).)*%>
    var regex = '<%=\\s*' + searchFor + '(?:(?!<).)*%>';
    return rh.regexReplace(original, replaceWith, regex, 'gi');
  },
  varPrefixReplace: function(original, searchFor, replaceWith, prefix) {
    //Expected RegExp <c:out\svalue="\${\sVariable\s}((?!<).)*</c:out>
    var regex = '<' + prefix +  ':out\\s*value="\\${\\s*' + searchFor + '\\s*}((?!<).)*</' + prefix + ':out>';
    return rh.regexReplace(original, replaceWith, regex, 'gi');
  },
  cleanJsp: function(original) {
    //Expected RegExp <%\s*(?:(?!<).)*%>
    var regex = '<%\\s*(?:(?!<).)*%>';
    return rh.regexDelete(original, regex, 'gi');
  },
  cleanPrefixedJsp: function(original, prefix) {
    //Expected RegExp <c:\s*.*</c:[a-z\s]*>
    var regex = '<' + prefix + ':\\s*.*</' + prefix +  ':[a-z\\s]*>';
    return rh.regexDelete(original, regex, 'gi');
  }
};