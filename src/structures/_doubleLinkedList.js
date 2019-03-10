'use strict'

var _DoubleLinkedList = function () {
    this._head = null;
}

_DoubleLinkedList.prototype.ListElement = function(key, prev, next) {
    this._prev = prev;
    this._next = next;
    this._key = key;
}

_DoubleLinkedList.prototype.insert = function(object) {
    if(this._head === null) {
        this._head = new this.ListElement(object, null, null);
    } else {
        var prevElement = new ListElement(this._head.key, null, )
        this._head = new this.ListElement(object, null, null);

    }
}

