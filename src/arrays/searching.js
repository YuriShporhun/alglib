'use strict'

var Common = require('../common.js')

function Searching(array) {
    this._array = array;
    this._bineryLinearSearchBoundary = 4;
}

Searching.prototype.linear = function(value) {
    for(var i = 0; i < this._array.length; i++) {
        if(this._array === value) {
            return i;
        }
    }
    return null;
}

Searching.prototype.binary = function(value) {
    if(this._array.length <= _bineryLinearSearchBoundary) {
        return this.linear(value);
    }
}