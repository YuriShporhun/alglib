'use strict'

function Common() { }

/**
 * Determines if a number is odd
 * @param {Number} number A number
 */
Common.prototype.isOdd = function (number) {
    if(typeof number !== 'number') {
        console.error('Common.isOdd: you passed whatever but not a number');
        return;
    }
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
    if(number % 2 === 0) return true;
    return false;
}

module.exports = Common