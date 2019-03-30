'use strict'

var Types = require('../types.js')
var types = new Types();

privates = {
    prefix: function(pattern) {
        var m = pattern.length;
        var prefixes = []
        prefixes.push(0);
        var k = 0;
        for(var q = 1; q < m; q++) {
            while(k > 0 && (pattern.charAt(k) !== pattern.charAt(q))) {
                k = prefixes[k - 1];                          
            }
            if(pattern.charAt(k) === pattern.charAt(q)) {
                k++;
            }
            prefixes[q] = k;
        }
        return prefixes;
    }
}

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

StringMatcher.prototype.length = function() {
    return this._string.length;
}

StringMatcher.prototype.hint = function() {
    console.log('N - string length; P - pattern length')
    console.log('linear: preparation time = O(1), time = O(N - P + 1)M, memory = O(N + P), performs well on small strings; If P ~ M / 2 then time ~Theta(N^2)');
}

/**
 * Performs a linear pattern search in the string.
 * Complexity:
 * --let N - string length; P - pattern length
 * --Time: O(N - P + 1)M
 * --Memory: O(n)
 * --Preparation time: O(1)
 * When to use:
 * You have a little string and a little pattern to find. Performs well when string and pattern 
 */
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
                break;
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

StringMatcher.prototype.kmp = function(pattern) {
    var prefixes = privates.prefix(pattern),
        q = 0,
        foundIndexes = [],
        n = this._string.length;
        
    for(var i = 0; i < n; i++) {
        while((pattern.charAt(q) !== this._string.charAt(i)) && q > 0) {
            q = prefixes[q - 1];        
        }
        if(pattern.charAt(q) === this._string.charAt(i)) {
            q++;
        }
        if(q === pattern.length) {
            foundIndexes.push(i - pattern.length + 1);
            q = prefixes[q - 1];
        }
    }
    return foundIndexes;
}

module.exports = StringMatcher