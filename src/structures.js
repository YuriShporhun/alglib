var Stack = require('../src/_structures/_stack.js')

Structures = {
    /**
     * Represents a stack data structure.
     * @param {number} maxItems Maximum elements in a stack
     * @param {string} elementType A type of an element you want to use with a stack
     */
    Stack: function (maxItems, elementType) {
        return new Stack(maxItems, elementType);
    }
}

module.exports = Structures