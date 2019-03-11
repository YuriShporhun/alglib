var assert = require('assert');
var StringMatcher = require('../src/strings/stringMatcher.js')

describe("StringMatcher.linear", function() {
    it("finds every occurance of a pattern in the string with linear algorithm", function() {
        var stringMatcher = new StringMatcher("abcuabcuabc");

        assert.deepEqual(stringMatcher.linear('abc'), [0, 4, 8 ]);
    });
});

describe("StringMatcher.kmp", function() {
    it("finds every occurance of a pattern in the string with kpm algorithm", function() {
        var stringMatcher = new StringMatcher("abcuabcuabc");

        assert.deepEqual(stringMatcher.kmp('abc'), [0, 4, 8 ]);
    });
});