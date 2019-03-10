'use strict'

var _Queue = function (maxItems, elementType) {
    this._alglibtype = 'queue';

    this._queue = [];
    this._tail = 0;
    this._head = 0;

    maxItems = maxItems || Number.MAX_VALUE;
    elementType = elementType || 'any';

    this._maxItems = maxItems;
    this._elementType = elementType;
}

_Queue.prototype.elementType = function() {
    return this._elementType;
}

_Queue.prototype.maxItems = function() {
    return this._maxItems;
}

_Queue.prototype.enqueue = function(object) {
    if(this.count() >= this.maxItems) {
        console.error('Queue enqueue: maximum elements count reached');
        return;
    }
    this._queue[this._tail] = object;
    this._tail++;
}

_Queue.prototype.dequeue = function() {
    if(this._head == this._tail) {
        console.error('Queue.dequeue: the queue is already empty');
        return;    
    }
    var headIndex = this._head;
    this._head++;
    return this._queue[headIndex];
}

_Queue.prototype.head = function() {
    if(this.empty()) {
        return null;
    }
    return this._queue[this._head];
}

_Queue.prototype.any = function() {
    return this._head !== this._tail;
}

_Queue.prototype.empty = function() {
    return this._head === this._tail;
}

_Queue.prototype.count = function() {
    return this._tail - this._head;
}

_Queue.prototype.contains = function(object) {
    var tempQueue = this._queue.slice(this._head, this._tail - 1);
    return tempQueue.includes(object);
}

module.exports = _Queue