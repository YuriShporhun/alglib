var assert = require('assert');
var Sorting = require('../src/sorting.js')

describe("Sorting.insertion", function() {
    it("does the insertion sorting algorithm correctly in ascending order", function() {
        var array = [3, 2, 4, 5, 1];
        var sorting = new Sorting(array, function(x, y){
            return x > y;
        });
        assert.deepEqual(sorting.insertion(), [1, 2, 3, 4, 5]);
    });

    it("does the insertion sorting algorithm correctly in descending order", function() {
        var array = [3, 2, 4, 5, 1];
        var sorting = new Sorting(array, function(x, y){
            return x < y;
        });
        assert.deepEqual(sorting.insertion(), [5, 4, 3, 2, 1]);
    });
});