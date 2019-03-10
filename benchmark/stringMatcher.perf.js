var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var StringMatcher = require('../src/strings/stringMatcher.js')

var smalllength = new StringMatcher('abcuuuabcuuuabcuuuabcuuu');

suite.add('linear#smalllength', function() {
  smalllength.linear("abc");
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });