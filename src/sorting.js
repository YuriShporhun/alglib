'use strict'

/**
 * @callback comparer
 * @param {Object} x first element
 * @param {Object} y second element
 * @returns {boolean} if first element less than second; is first element greater than second;
 */

/**
 * Construnctor function which provides many sorting algorithms
 * @param {Array} array
 * @param {comparer} comparer predicate which describes is one element greater or less than other 
 * @param {boolean} makeCopy describes will constructor copy your array or not (true by default)
 * @param {boolean} performanceLogging describes will methods log a result of their work 
 */
function Sorting(array, comparer, makeCopy, performanceLogging) {
    if(!array) {
        console.log('Sorting constructor: you have to pass an array as the first argument. Note: now the array has a default value [0]');
        array = [0]
    }

    if(!array instanceof Array) {
        console.log('Sorting constructor: you passed non array type into construnctor. Note: now the array has a default value [0]');
        array = [0]
    }

    if(array.length === 0) {
        console.log('Sorting constructor: you passed an empty array into construnctor. Note: now the array has a default value [0]');
        array = [0]
    }

    makeCopy = makeCopy || true;
    performanceLogging = performanceLogging || false;
    comparer = comparer || function (x, y) {
        return x > y;
    } 

    if(makeCopy === true) {
        this._array = array.slice();
    } else {
        this._array = array;
    }

    this._comparer = comparer;
    this._loggging = performanceLogging;
}

/**
 * Set the array which will be sorted
 * @param {Array} array The array which will be sorted
 * @param {boolean} makeCopy Will your array be copied of passed by reference
 */
Sorting.prototype.setArray = function(array, makeCopy) {
    makeCopy = makeCopy || true;

    if(makeCopy === true) {
        this._array = array.slice();
    } else {
        this._array = array;
    }
}

Sorting.prototype.hint = function() {
    console.log('Insertion sort: time = O(n^2), memory = O(n), use when you do not have much enough ram, but also your dataset is small');
}

Sorting.prototype.setComparer = function(comparer) {
    this._comparer = comparer;
}

/**
 * Insertion sorting algorithm.
 * Complexity:
 * --Time: O(n^2)
 * --Memory: O(n)
 * When to use:
 * You have a little data set, but also you need to save your memory.
 */
Sorting.prototype.insertion = function () {
    if(this._array.length === 1) {
        return array;
    }

    if(this._loggging) {
        performance.mark('insertion-sort-start');
    }

    for(var j = 1; j < this._array.length; j++) {
        var key = this._array[j];
        var i = j - 1;
        while(i > -1 && this._comparer(this._array[i], key)) {
            this._array[i + 1] = this._array[i];
            i--;
        }
        this._array[i + 1] = key;
    } 


    if(this._loggging) {     
        performance.mark('insertion-sort-end');
        performance.measure('insertion-sort', 'insertion-sort-start', 'insertion-sort-end');
    }

    return this._array;
}

module.exports = Sorting