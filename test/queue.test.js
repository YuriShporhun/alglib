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

describe("Queue.enqueue", function() {
    it("enqueues numbers into a queue", function() {
        var queue = new Structures.Queue();

        queue.enqueue(5);
        queue.enqueue(6);

        assert.equal(queue.count(), 2);
        assert.equal(queue.head(), 5);  
        assert.equal(queue.any(), true);
        assert.equal(queue.empty(), false);     
    });
});

describe("Queue.dequeue", function() {
    it("dequeues numbers from a queue", function() {
        var queue = new Structures.Queue();

        queue.enqueue(5);
        queue.enqueue(6);
        queue.enqueue(7);

        // HEAD 5 <- 6 <- 7 TAIL

        var dequeuedElement = queue.dequeue();

        // HEAD 6 <- 7 TAIL

        assert.equal(dequeuedElement, 5);
        assert.equal(queue.head(), 6);  
        assert.equal(queue.count(), 2);     
    });
});