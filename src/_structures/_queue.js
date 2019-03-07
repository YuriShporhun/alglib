'use strict'

var _Queue = function (maxItems, elementType) {
    this._queue = [];
    this._tail = 0;
    this._head = 0;

    maxItems = maxItems | Number.MAX_VALUE;
    elementType = elementType | 'any';

    this._maxItems = maxItems;
}

_Queue.prototype.enqueue = function(object) {
    this._queue[this._tail] = object;
    this._tail++;
}

_Queue.prototype.deqeue = function() {
    if(this._head == this._tail) {
        console.error('Queue.dequeue: the queue is already empty');
        return;    
    }
    var headIndex = this._head;
    this._head++;
    return this._queue[headIndex];
}

_Queue.prototype.any = function() {
    return this._head !== this._tail;
}

_Queue.prototype.emplty = function() {
    return this._head === this._tail;
}