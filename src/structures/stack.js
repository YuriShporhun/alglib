'use strict'

var Types = require('../types.js')
var Errors = require('../errors/stack.errors.js')
var Sorting = require('../sorting.js');
var Searching = require('../arrays/searching.js')

/**
 * A callback which fires when a stack is overflowed
 * @callback onOverflowCallback
 * @param {Stack} sender The stack which is overflowed
 */

 /**
 * A callback which fires when a stack is empty
 * @callback onEmptyCallback
 * @param {Stack} sender The stack which is empty
 */

/**
 * Represents a stack data structure.
 * @param {Number} maxItems Maximum elements in a stack
 * @param {string} elementType A type of an element you want to use with a stack
 * @param {onOverflowCallback} onOverflow Callback which fires when a stack is overflowed
 * @param {onEmptyCallback} onEmpty 
 */
var Stack = function (maxItems, elementType, intitialState, onOverflow, onEmpty) {
    this._alglibtype = 'stack';
    this._noop = {};
    var types = new Types();

    if(types.isNotArrayButDefined(intitialState)) {
        console.error(Errors.wrongInitialStateType);
        intitialState = [];
    }

    this._stack = intitialState || [];
    this._frozenStack = [];
    this._frozen = false;
    this._explicitUnfreeze = false;
    this._name = "<unknown>";

    if(types.isNotNumberButDefined(maxItems)) {
        console.error(Errors.wrongMaxItemsType);
        maxItems = Number.MAX_VALUE;
    }

    maxItems = maxItems || Number.MAX_VALUE;

    if(types.isNotStringButDefined(elementType)) {
        console.error('Stack.ctor: you passed wrong typed elementType; Now it equals "any"');
        elementType = 'any';
    }

    elementType = elementType || 'any';

    this._maxItems = maxItems;
    this._elementType = elementType;

    if(types.isNotFunctionButDefined(onOverflow)) {
        console.error('Stack.ctor: you passen wrong typed onOverflow; Now it equals noop');
        onOverflow = this._noop;
    }

    this._onOverflow = onOverflow | this._noop;
    this._onEmpty = onEmpty | this._noop;
}

Stack.prototype.freeze = function(explicitUnfreeze) {
    this._frozen = true;
    this.setExplicitUnfreeze(explicitUnfreeze || this._explicitUnfreeze);
    var sorting = new Sorting(this._stack, function(x, y) {
        return x < y;
    }, true);
    this._frozenStack = sorting.insertion();
}

Stack.prototype.unfreeze = function() {
    this._frozen = false;
    this._frozenStack = []
}

 /**
 * A callback which applies to every element of a stack
 * @callback operatorMapCallback
 * @param {object} stackElement An element of a stack
 */

/**
 * Applies map to a stack
 * @param {operatorMapCallback} operator
 * @returns {Stack} A shallow copy of a stack
 */
Stack.prototype.map = function(operator) {
    var tempStack = this.getStack();
    for(var i = 0; i < tempStack.length; i++) {
        operator(tempStack[i]);
    }
    return new Stack(tempStack, this.getMaxItems(), this.getElementType(), this.getOnOverfrow(), this.getOnEmpty());
}

/**
 * @description Prints use cases and complexity of basic operations
 */
Stack.prototype.hint = function () {
    Console.log('Stack: a structure which implements the last-in-first-out pattern.')
    console.log('Stack.push: O(1); changes internal state');
    console.log('Stack.contains: O(n)');
    console.log('Stack.contains(frozen): O(log n)');
    console.log('Stack.count: O(1)');
    console.log('Stack.pop: O(1); changes internal state');
    console.log('Stack.top: O(1)');
}

/**
 * @description Pushes a new object into a stack. Changes the stack internal state.
 * @param {object} object An object which will be pushed
 */
Stack.prototype.push = function (object) {
    if(this._explicitUnfreeze === true) {
        console.error('Stack.push: stack has the frozen state');
        return;
    }

    var customTypeProperty = null;
    if(object.hasOwnProperty('_alglibtype')) {
        customTypeProperty = object['_alglibtype'];
    }
    if(typeof object !== this._elementType && this._elementType !== 'any' && this._elementType !== customTypeProperty) {
        console.error('Stack.push: you are trying to push a wrong object type');
        return;
    }
    if(this.getIsFilled() === true) {
        console.error('Stack.push: maximum elements count reached');
        this._onOverflow(this);
        return;
    }
    this._stack.push(object);
}

/**
 * @description Finds if the stack contains an object
 * @param {object} object An object you want to find
 * @returns {boolean} true if the stack contains an object, false otherwise
 */
Stack.prototype.contains = function (object) {
    var customTypeProperty = null;
    if(object.hasOwnProperty('_alglibtype')) {
        customTypeProperty = object['_alglibtype'];
    }

    if(typeof object !== this._elementType && this._elementType !== 'any' && this._elementType !== customTypeProperty) {
        console.error('Stack.contains: you are trying to find wrong object type');
        return;
    }
    if(this.isFrozen() === false) {
        return this._stack.indexOf(object) !== -1;
    } else {
        var searhing = new Searching(this._stack);
        return searhing.binary(object) === null ? false : true;
    }
}

/**
 * Gets and removes an element from a stack. Changes the stack internal state
 * @returns {object} the top element of a stack
 */
Stack.prototype.pop = function() {
    if(this.getExplicitUnfreeze() === true) {
        console.error('Stack.push: the stack has frozen state');
        return;
    }

    this._frozen = false;

    if(this.empty() === true) {
        console.error('Stack.pop: you cannot pop an item from an empty stack');
        this._onEmpty(this);
        return;
    }
    return this._stack.pop();
}

/**
 * @description Removes all elements from a stack. Changes the stack internal state.
 */
Stack.prototype.clear = function() {
    if(this._explicitUnfreeze === true) {
        console.error('Stack.clear: the stack has frozen state');
        return;
    }
    this._freeze = false;
    this._stack = [];
}

/**
* Checks if a stack is empty
* @returns true if a stack is empty and false otherwise
*/
Stack.prototype.empty = function() {
    return this.count() === 0;
}

/**
 * Check if a stack is not empty
 * @returns true if a stack is not empty and false otherwise
 */
Stack.prototype.any = function() {
    return this.count() > 0;
}

/**
 * @description Gets the top element of the stack
 * @returns the top element of a stack
 */
Stack.prototype.top = function() {
    return this._stack[this.count() - 1];
}

/**
 * Gets internal type of structure
 */
Stack.prototype.Type = function () {
    return this._alglibtype;
}

/**
 * Gets if a stack was frozen
 */
Stack.prototype.isFrozen = function() {
    return this._frozen;
}

Stack.prototype.getExplicitUnfreeze = function() {
    return this._explicitUnfreeze;
}

Stack.prototype.setExplicitUnfreeze = function(explicitUnfreeze) {
    this._explicitUnfreeze = explicitUnfreeze;
}

/**
 * Sets the name of a stack
 * @param {string} name 
 */
Stack.prototype.setName = function(name) {
    if(typeof name !== 'string') {
        console.error('Stack.setName: name is not a string');
        return;
    }
    _name = name;
}

/**
 * Gets a type which can be passed into a stack
 * @returns {string} A type which can be passed into a stack
 */
Stack.prototype.elementType = function () {
    return this._elementType;
}

/**
 * @description Gets maxinum stack size
 * @returns  {number} Maxinum stack size
 */
Stack.prototype.maxItems = function () {
    return this._maxItems;
}

/**
 * @description Gets a stack data representation copy as an array
 */
Stack.prototype.getStack = function () {
    return _stack.slice();
}

/**
 * 
 */
Stack.prototype.getIsFilled = function() {
    return this._stack.length === this._maxItems;
}

Stack.prototype.count = function() {
    return this._stack.length;
}

module.exports = Stack;
