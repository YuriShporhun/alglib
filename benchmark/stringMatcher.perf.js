var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var StringMatcher = require('../src/strings/stringMatcher.js')

var fs = require('fs');

var longString = fs.readFileSync( __dirname + '/benchdata/longstring.txt').toString();
var hugeString = fs.readFileSync( __dirname + '/benchdata/hugestring.txt').toString();

var longLength = new StringMatcher(longString);
var smallLength = new StringMatcher('abcuuuabcuuuabcuuuabcuuu');
var hugeLength = new StringMatcher(hugeString)

suite
  .add('linear#smalllength < 100 chars              ', function() {
    smallLength.linear("abc");
}).add('linear#longlength > 8000 chars; < 9000 chars', function() {
    longLength.linear("aaa");
}).add('linear#hugelength ~600000 chars             ', function() {
    hugeLength.linear("aaa");
})
.on('cycle', function(event) {
console.log(String(event.target));
})
.on('complete', function() {
console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
