var regexHelper = {};

exports.regexReplace = function(source, substitution, regex, options) {
  return regexHelper.regexReplace(source, substitution, regex, options);
};

exports.regexDelete = function(source, regex, options) {
  return regexHelper.regexDelete(source, regex, options);
};

regexHelper = {

  regexReplace: function(source, substitutionString, regexString, regexOptions) {
    regexOptions = typeof regexOptions !== 'undefined' ? regexOptions : 'g';
    var regExp = new RegExp(regexString, regexOptions),
        updatedSource;
    //replace the source
    updatedSource = String(source).replace(regExp, substitutionString); //Substring can be a function
    return updatedSource;
  },

  regexDelete: function(source, regexString, regexOptions) {
    return regexHelper.regexReplace(source, function(){return '';}, regexString, regexOptions);
  }

};

