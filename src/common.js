'use strict'

/**
 * 
 * @param {boolean} disableWarnings 
 */
function Common(disableWarnings) { 
    disableWarnings = disableWarnings | false;
    this._disableWarnings = disableWarnings;
}

/**
 * Checks if a number is an integer value
 * @param {Number} number A number you want to check 
 * @returns {boolean} true if a number is an integer and false otherwise
 */
Common.prototype.isInt = function (number) {
    return Number(number) === number && number % 1 === 0;
}

/**
 * Checks if a number is a float value
 * @param {Number} number A number you want to check 
 * @returns {boolean} true if a number is a float and false otherwise
 */
Common.prototype.isFloat = function (number){
    return Number(number) === number && number % 1 !== 0;
}

/**
 * Converts a number to an integer
 * @param {Numner} number A number you want to convert to an integer
 * @returns A converted to integer number
 */
Common.prototype.floatToInt = function(number) {
    return number | 0;
}

/**
 * Determines if a number is odd
 * @param {Number} number A number
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
 * Determines if a number is even
 * @param {Number} number A number
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

Common.prototype.isEvenArray = function(array) {
    if(!array instanceof Array) {
        console.error('Common.isEvenArray: you passed not an array')
        return;
    }
    var isEven = true;
    for(var i = 0; i < array.length; i++) {
        if(!this.isEven(array[i])) {
            isEven = false;
            break;
        }
    }
    return isEven;
}

Common.prototype.isOddArray = function(array) {
    if(!array instanceof Array) {
        console.error('Common.isOddArray: you passed not an array');
        return;
    }

    var isOdd = true;
    for(var i = 0; i < array.length; i++) {
        if(!this.isOdd) {
            isOdd = false;
            break;
        }
    }

    return isOdd;
}

module.exports = Common