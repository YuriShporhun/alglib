'use strict'

var _Stack = function (maxItems, elementType, onOverflow, onEmpty) {
    var noop = function() { };
    this._alglibtype = 'stack';
    this._stack = [];

    if(typeof maxItems !== 'number' && typeof maxItems !== 'undefined') {
        console.error('Stack.ctor: you passed wrong typed maxItems; Now it equals Number.MaxValue');
        maxItems = Number.MAX_VALUE;
    }

    maxItems = maxItems || Number.MAX_VALUE;

    if(typeof elementType !== 'string' && typeof elementType !== 'undefined') {
        console.error('Stack.ctor: you passed wrong typed elementType; Now it equals "any"');
        elementType = 'any';
    }

    elementType = elementType || 'any';

    this._maxItems = maxItems;
    this._elementType = elementType;

    this._onOverflow = onOverflow | noop;
    this._onEmpty = onEmpty | noop;
}

_Stack.prototype.elementType = function () {
    return this._elementType;
}

_Stack.prototype.maxItems = function () {
    return this._maxItems;
}

_Stack.prototype.hint = function () {
    Console.log('Stack: a structure which implements the last-in-first-out pattern.')
    console.log('Stack.push: O(1)');
    console.log('Stack.find: O(n)');
    console.log('Stack.count: O(1)');
    console.log('Stack.pop: O(1)');
    console.log('Stack.top: O(1)');
}

_Stack.prototype.contains = function (object) {
    var customTypeProperty = null;
    if(object.hasOwnProperty('_alglibtype')) {
        customTypeProperty = object['_alglibtype'];
    }

    if(typeof object !== this._elementType && this._elementType !== 'any' && this._elementType !== customTypeProperty) {
        console.error('Stack.find: you are trying to find wrong object type');
        return;
    }

    return this._stack.includes(object);
}

_Stack.prototype.count = function () {
    return this._stack.length;
}

_Stack.prototype.push = function (object) {
    var customTypeProperty = null;
    if(object.hasOwnProperty('_alglibtype')) {
        customTypeProperty = object['_alglibtype'];
    }
    if(typeof object !== this._elementType && this._elementType !== 'any' && this._elementType !== customTypeProperty) {
        console.error('Stack.push: you are trying to push a wrong object type');
        return;
    }
    if(this.count == this._maxItems) {
        console.error('Stack.push: maximum elements count reached');
        this._onOverflow(this);
        return;
    }
    this._stack.push(object);
}

_Stack.prototype.pop = function() {
    if(this.count === 0) {
        console.error('Stack.pop: you cannot pop an item from an empty stack');
        this._onEmpty(this);
        return;
    }
    return this._stack.pop();
}

_Stack.prototype.empty = function() {
    return this._stack.length === 0;
}

_Stack.prototype.any = function() {
    return this._stack.length > 0;
}

_Stack.prototype.top = function() {
    return this._stack[this._stack.length - 1];
}

_Stack.prototype.clear = function() {
    this._stack = [];
}

module.exports = _Stack;