'use strict'

var Common = require('../common.js')

function Searching(array) {
    this._array = array;
    this._linearSearchBoundary = 4;
}

Searching.prototype.linear = function(value) {
    for(var i = 0; i < this._array.length; i++) {
        if(this._array[i] === value) {
            return i;
        }
    }
    return null;
}

Searching.prototype.binary = function(value) {
    if(this._array.length <= this._linearSearchBoundary) {
        return this.linear(value);
    }

    var start = 0,
        end = this._array.length - 1,
        middle = Math.floor((start + end) / 2)
  
    while (start < end && this._array[middle] !== value) {
      if (value < this._array[middle]) {
        end = middle - 1
      } else {
        start = middle + 1
      }
      middle = Math.floor((start + end) / 2)
    }

    if(this._array[middle] !== value) {
        return null;
    } else {
        return middle;
    }
}

module.exports = Searching;