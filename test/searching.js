var assert = require('assert');
var Searching = require('../src/arrays/searching.js')

var array = [1, 2, 3, 4, 5, 6, 7 ,8 ,9];
var searching = new Searching(array);

describe("Searching.binary", function() {
    it("does the binary search correctly if the value in the array", function() {
        assert.equal(searching.binary(2), 1);
    });
});

describe("Searching.linear", function() {
    it("does the linear search correctly if the value in the array", function() {
        assert.equal(searching.linear(2), 1);
    });
});