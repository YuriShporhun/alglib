var assert = require('assert');
var Common = require('../src/common.js')

describe("Common.isEven", function() {
    it("finds if a number is even correctly", function() {
        var common = new Common();

        assert.equal(common.isEven(4), true);
        assert.equal(common.isEven(5), false);
      
        assert.equal(common.isEven(4.1), true);
        assert.equal(common.isEven(5.1), false);

        assert.equal(common.isEven(9007199254740991), false);
    });
});

describe("Common.isOdd", function() {
    it("finds if a number is odd correctly", function() {
        var common = new Common();

        assert.equal(common.isOdd(4), false);
        assert.equal(common.isOdd(5), true);

        assert.equal(common.isOdd(4.1), false);
        assert.equal(common.isOdd(5.1), true);

        assert.equal(common.isOdd(9007199254740991), true);
    });
});