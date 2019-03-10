'use strict'

var Types = require('../types.js')
var types = new Types();

var StringMatcher = function(string) {
    if(types.isNotString(string)) {
        console.error('StringMatcher.ctor: you passed wrong type for the "string" argument; Now it has the default value - "undefined"');
        string = "undefined"; 
    }
    if(string.length  === 0) {
        console.error('StringMatcher.ctor: you passed an empty string; Now it has value - "empty"');
        string = "empty";
    }
    this._string = string;
}

StringMatcher.prototype.length = function(){
    return this._string.length;
}

StringMatcher.prototype.linear = function(pattern) {
    if(types.isNotString(pattern)) {
        console.error('StringMatcher.linear: you passed wrong type for the "pattern" argument;');
        return;
    }
    if(this.length() < pattern.length) {
        console.error('StringMatcher.linear: the pattern length if larger than the initial string length;');
        return;
    }

    var foundIndexes = [];

    var sLength = this.length();
    var pLength = pattern.length;

    for(var i = 0; i < sLength - pLength + 1; i++) {
        var found = true;
        for(var j = 0; j < pLength; j++) {
            if(pattern.charAt(j) !== this._string.charAt(i + j)) {
                found = false;
            }
        }
        if(found === true) {
            foundIndexes.push(i);
        }
    }

    if(foundIndexes.length === 0) {
        return null;
    }

    return foundIndexes;
}

module.exports = StringMatcher