var Stack = require('../src/structures/stack.js')
var Queue = require('../src/structures/_queue.js')

Structures = {
    /**
     * Represents a stack data structure.
     * @param {number} maxItems Maximum elements in a stack
     * @param {string} elementType A type of an element you want to use with a stack
     */
    Stack: function (maxItems, elementType) {
        return new Stack(maxItems, elementType);
    },

    /**
     * Represents a queue data structure
     * @param {number} maxItems Maximum elements in a queue
     * @param {string} elementType A type of an element you want to use with a queue
     */
    Queue: function (maxItems, elementType) {
        return new Queue(maxItems, elementType);
    }
}

module.exports = Structures