var assert = require('assert');
var Types = require('../src/types.js')
var Structures = require('../src/structures.js')

describe("Types.ctor", function() {
    it("defines primitive types", function() {
        var types = new Types();

        assert.notEqual(types.getPrimitiveTypes, undefined);
        assert.notEqual(types.getPrimitiveTypes().indexOf('boolean'), -1);
        assert.notEqual(types.getPrimitiveTypes().indexOf('number'), -1);
        assert.notEqual(types.getPrimitiveTypes().indexOf('string'), -1);
    });
});

describe("Types.isObject", function() {
    it("determines if a value is an object", function() {
        var types = new Types();

        assert.equal(types.isObject(new Object()), true);
        assert.equal(types.isObject(new Array()), true);
        assert.equal(types.isObject(new Structures.Stack()), true);
        assert.equal(types.isObject(3), false);
    });
});

describe("Types.isFunction", function() {
    it("determines if a value is a function", function() {
        var types = new Types();
        var noop = function() { }

        assert.equal(types.isFunction(new Object()), false);
        assert.equal(types.isFunction(noop), true);
    });
});

describe("Types.isNotFunction", function() {
    it("determines if a value is not a function", function() {
        var types = new Types();
        var noop = function() { }

        assert.equal(types.isNotFunction(new Object()), true);
        assert.equal(types.isNotFunction(noop), false);
        assert.equal(types.isNotFunction(undefined), true);
    });
});

describe("Types.isNotFunctionButDefined", function() {
    it("determines if a value is not a function but it is defined", function() {
        var types = new Types();
        var noop = function() { }
        assert.equal(types.isNotFunctionButDefined(new Object()), true);
        assert.equal(types.isNotFunctionButDefined(noop), false);
        assert.equal(types.isNotFunctionButDefined(undefined), false);
    });
});

describe("Types.isNumber", function() {
    it("determines if a value is a number", function() {
        var types = new Types();

        assert.equal(types.isNumber(5e3), true);
        assert.equal(types.isNumber(0xff), true);
        assert.equal(types.isNumber(-1.1), true);
        assert.equal(types.isNumber(0), true);
        assert.equal(types.isNumber(1), true);
        assert.equal(types.isNumber(1.1), true);
        assert.equal(types.isNumber(10), true);
        assert.equal(types.isNumber(10.10), true);
        assert.equal(types.isNumber(100), true);
        assert.equal(types.isNumber(new Number(5)), true);
        assert.equal(types.isNumber(parseInt('012')), true);
        assert.equal(types.isNumber(parseFloat('012')), true);

        assert.equal(types.isNumber(Infinity), false);
        assert.equal(types.isNumber(NaN), false);
        assert.equal(types.isNumber(null), false);
        assert.equal(types.isNumber(undefined), false); 
    });
});