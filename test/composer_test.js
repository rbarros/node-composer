'use strict';

var composer = require('../lib/composer.js');

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

exports['composer'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'options': function(test) {
    test.expect(1);
    test.equal(typeof composer.options, 'object', 'return options.');
    test.done();
  },
  'exist': function(test) {
    test.expect(1);
    // tests here
    test.equal(composer.exist(), false, 'exist file composer.');
    test.done();
  },
  'php': function(test) {
    test.expect(1);
    test.equal(composer.php(), true, 'return options.');
    //composer.options.php = 'foo -v';
    //test.throws(composer.php(), Error, 'Fatal error: /bin/sh: 1: foo: not found');
    //test.throws(composer.php(), Error, 'Fatal error: /bin/sh: 1: foo: not found');
    test.done();
  }
};
