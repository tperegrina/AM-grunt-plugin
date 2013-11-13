var rh = require('regex-helper'),
    cleanerHelper = {};

exports.varReplace = function(originalString, constantsObject, markupPrefix) {
  if( typeof markupPrefix === 'undefined') {
    for (var i = 0; i < constantsObject.length; i++) {
      cleanerHelper.varJspReplace(originalString, constantsObject[i])
    }
  } else {
    for (var i = 0; i < constantsObject.length; i++) {
      cleanerHelper.varPrefixReplace(originalString, constantsObject[i], markupPrefix);
    }
  }
};

exports.jspClean = function(originalString, markupPrefix) {

};

cleanerHelper = {
  varJspReplace: function(original, constants) {
    var regex = '<%=\s*' + constants.key + '(?:(?!<).)*%>';
    rh.regexReplace(original, constants.value, regex, 'gi');
  },
  varPrefixReplace: function(original, constants, prefix) {
    var regex = '<' + prefix +  ':out\s*value="\${' + 'constants.key' + '}((?!<).)*</' + prefix + ':out>';
    rh.regexReplace(original, constants.value, regex, 'gi');
  },
  cleanJsp: function(original) {
    var regex = '<%@\s*(?:(?!<).)*%>';
    rh.regexDelete(original, regex, 'gi');
  },
  cleanPrefixedJsp: function(original, prefix) {

  }
};

