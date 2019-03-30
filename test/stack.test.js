var assert = require('assert');
var Structures = require('../src/structures.js')

describe("Stack.ctor", function() {
    it("creates an empty stack", function() {
        var stack = new Structures.Stack();

        assert.equal(stack.count(), 0);
        assert.equal(stack.elementType(), 'any');
        assert.equal(stack.maxItems(), Number.MAX_VALUE);
        assert.equal(stack.isFrozen(), false);
        assert.equal(stack.getExplicitUnfreeze(), false);
    });
});

describe("Stack.push", function() {
    it("pushes into a non strong typed stack", function() {
        var stack = new Structures.Stack();

        stack.push('a');
        stack.push('2');

        assert.equal(stack.count(), 2);
    });

    it("pushes into a strong typed stack", function() {
        var stack = new Structures.Stack(undefined, 'number');

        stack.push(1);
        stack.push('a');

        assert.equal(stack.count(), 1);
    });

    it("pushes a custom alglib collection into a strong typed stack", function() {
        var tempStack = new Structures.Stack();

        var stack = new Structures.Stack(undefined, 'stack');

        stack.push(tempStack);
        stack.push('a');

        assert.equal(stack.count(), 1);
    });
});

describe("Stack.pop", function() {
    it("gets a value from a stack", function() {
        var stack = new Structures.Stack();

        stack.push('1');
        stack.push('2');

        assert.equal(stack.pop(), '2');
    });
});

describe("Stack.any", function() {
    it("checks if a stack has a value", function() {
        var stack = new Structures.Stack();

        stack.push('1');

        assert.equal(stack.any(), true);
    });

    it("checks if a stack has no value", function() {
        var stack = new Structures.Stack();

        assert.equal(stack.any(), false);
    });

});

describe("Stack.contains", function() {
    it("finds if an element in the container", function() {
        var stack = new Structures.Stack();

        stack.push('1');
        var contains = stack.contains('1');

        assert.equal(contains, true);
    });

    it("finds if an element in the frozen container", function() {
        var stack = new Structures.Stack();

        stack.push(1);
        stack.freeze();
        var contains = stack.contains(1);

        assert.equal(contains, true);
    });
});