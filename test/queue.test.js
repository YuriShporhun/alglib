var assert = require('assert');
var Structures = require('../src/structures.js')

describe("Queue.ctor", function() {
    it("creates an empty queue", function() {
        var queue = new Structures.Queue();

        assert.equal(queue.count(), 0);
        assert.equal(queue.elementType(), 'any');
        assert.equal(queue.maxItems(), Number.MAX_VALUE);
    });
});