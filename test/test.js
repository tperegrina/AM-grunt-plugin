var grunt = require('grunt'),
    rh = require('../lib/regex-helper');
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
  'Test grunt tasks': {

  }
};

