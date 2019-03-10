'use strict'

var Types = require('./types.js')

var Types = new Types();

/**
 * @param {boolean} disableWarnings If true - warnigns will not be print
 */
function Common(disableWarnings) { 
    disableWarnings = disableWarnings | false;
    this._disableWarnings = disableWarnings;
}

/**
 * @description Checks if a number is an integer value
 * @param {Number} number A number you want to check 
 * @returns {boolean} true if a number is an integer and false otherwise
 */
Common.prototype.isInt = function (number) {
    return Number(number) === number && number % 1 === 0;
}

/**
 * @description Checks if a number is a float value
 * @param {Number} number A number you want to check 
 * @returns {boolean} true if a number is a float and false otherwise
 */
Common.prototype.isFloat = function (number){
    return Number(number) === number && number % 1 !== 0;
}

/**
 * @description Converts a number to an integer
 * @param {Numner} number A number you want to convert to an integer
 * @returns A converted to integer number
 */
Common.prototype.floatToInt = function(number) {
    return number | 0;
}

/**
 * @description Determines if a number is odd
 * @param {Number} number A number
 * @returns 
 */
Common.prototype.isOdd = function (number) {
    if(typeof number !== 'number') {
        console.error('Common.isOdd: you passed whatever but not a number');
        return;
    }

    if(!this._disableWarnings && this.isFloat(number)) {
        console.warn('Common.isOdd: you passed a float insted of int.')
    }

    number = this.floatToInt(number);

    if(number % 2 !== 0) return true;
    return false;
}

/**
 * @description Determines if a number is even
 * @param {Number} number A number
 * @returns {boolean} Returns true if a number is even and false otherwise
 */
Common.prototype.isEven = function(number) {
    if(typeof number !== 'number') {
        console.error('Common.isEven: you passed whatever but not a number.');
        return;
    }

    if(!this._disableWarnings && this.isFloat(number)) {
        console.warn('Common.isEven: you passed a float insted of int.')
    }

    number = this.floatToInt(number);

    if(number % 2 === 0) return true;
    return false;
}

/**
 * @description Determines if an array contains only even numbers
 * @param {Array} array An array
 * @returns {boolean} true if an array has only even numbers and false otherwise
 */
Common.prototype.isEvenArray = function(array) {
    if(!array instanceof Array) {
        console.error('Common.isEvenArray: you passed not an array')
        return;
    }

    var isEven = true;

    for(var i = 0; i < array.length; i++) {
        if(typeof array[i] !== 'number' && disableWarnings === false) {
            console.warn('Common.isEvenArray: an item in the array has type ' 
                + typeof array[i] 
                + ' instead of "number" and was ignored');
            continue;
        }

        if(!this.isEven(array[i])) {
            isEven = false;
            break;
        }
    }
    return isEven;
}

/**
 * @description Determines if an array contains only odd number
 * @param {Array} array An array
 * @returns {boolean} true if an array has only odd numbers and false otherwise
 */
Common.prototype.isOddArray = function(array) {
    if(!array instanceof Array) {
        console.error('Common.isOddArray: you passed not an array');
        return;
    }

    var isOdd = true;
    for(var i = 0; i < array.length; i++) {
        if(typeof array[i] !== 'number' && disableWarnings === false) {
            console.warn('Common.isOddArray: and item in the array has type '
                + typeof array[i]
                + ' istead of "number" as was ignored');
            continue;
        }

        if(!this.isOdd) {
            isOdd = false;
            break;
        }
    }

    return isOdd;
}

module.exports = Common