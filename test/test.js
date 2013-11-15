var grunt = require('grunt'),
    rh = require('../lib/regex-helper'),
    ch = require('../lib/cleaner-helper');
"use strict";
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.textReplace = {
  'Test regex helper': {
    'test regex replacing - no options': function (test) {
      test.equal(rh.regexReplace('Hello world', 'Goodbye', 'Hello'), 'Goodbye world');
      test.done();
    },
    'test regex replacing - with options': function (test) {
      test.equal(rh.regexReplace('Hello world', 'Goodbye', 'hello', 'gi'), 'Goodbye world');
      test.done();
    },
    'test regex deleting - no options': function (test) {
      test.equal(rh.regexDelete('Hello world', 'Hello'), ' world');
      test.done();
    },
    'test regex deleting - with options': function(test) {
      test.equal(rh.regexDelete('Hello world', 'hello', 'gi'), ' world');
      test.done();
    }
  },
  'Test Cleaner helper': {
    'var-replace should replace a single jsp variable': function (test) {
      test.equal(ch.varReplace('<%=variable1%>', {variable1: 'Hello World'}), 'Hello World');
      test.done();
    },
    'var-replace should replace a single jsp variable with spaces': function (test) {
      test.equal(ch.varReplace('<%=  variable1 %>', {variable1: 'Hello World'}), 'Hello World');
      test.done();
    },
    'var-replace should not replace a differently named variable': function (test) {
      test.notEqual(ch.varReplace('<%=variable2%>', {variable1: 'Hello World'}), 'Hello World');
      test.done();
    },
    'var-replace should replace a group of jsp variables with separate constants ': function (test) {
      var variableList = {
            variable1: 'Constant1',
            variable2: 'Constant2'};
      test.equal(ch.varReplace('<%=variable1%>\n<%=variable2%>', variableList), 'Constant1\nConstant2');
      test.done();
    },
    'var-replace should replace a single prefixed jsp variable ' : function (test) {
      test.equal(ch.varReplace('<c:out value="${variable1}">body</c:out>',
          { variable1: 'prefixed Constant1' }, 'c'), 'prefixed Constant1');
      test.done();
    },
    'var-replace should replace a group of prefixed jsp variables' : function (test) {
      var variableList = {
            variable1: 'prefixed Constant1',
            variable2: 'prefixed Constant2'};
      test.equal(ch.varReplace('<c:out value="${variable1}">body</c:out>\n<c:out value="${variable2}">body</c:out>',
          variableList, 'c'), 'prefixed Constant1\nprefixed Constant2');
      test.done();
    },
    'jsp cleaner should delete instances of JSP markup': function (test) {
      test.equal(ch.jspClean('<%=jspMarkup%>'), '');
      test.done();
    },
    'jsp cleaner should NOT delete instances of HTML markup': function (test) {
      test.equal(ch.jspClean('<div>'), '<div>');
      test.done();
    },
    'jsp cleaner should delete instances of prefixed JSP markup': function (test) {
      test.equal(ch.jspClean('<c:instruction>body</c:instruction>', 'c'), '');
      test.done();
    },
    'jsp cleaner should delete multiline instances of prefixed JSP markup' : function (test) {
      test.equal(ch.jspClean('<c:instruction>\nbody\n</c:instruction>', 'c'), '');
      test.done();
    }
  },
  'End to end plugin tests': {
    'Jsp Cleaner plugin should open an html file and perform a series of tasks on it': function (test) {
      var testFile = grunt.file.read('test/temp/e2e-test.txt'),
          expectedFile = grunt.file.read('test/expected/e2e-test-expected.txt');
      test.equal(testFile, expectedFile);
      test.done();
    }
  }
};

