var Benchmark = require('benchmark');
var StringMatcher = require('../src/strings/stringMatcher.js')

var fs = require('fs');

var longString = fs.readFileSync( __dirname + '/benchdata/longstring.txt').toString();
var hugeString = fs.readFileSync( __dirname + '/benchdata/hugestring.txt').toString();

var smallString = 'abcuuuabcuuuabcuuuabcuuu';
var mediumLength = new StringMatcher(longString);
var smallLength = new StringMatcher(smallString);
var hugeLength = new StringMatcher(hugeString)


var smallLengthSmallPattern = new Benchmark.Suite;
var mediumLengthSmallPattern = new Benchmark.Suite;
var hugeLengthSmallPattern = new Benchmark.Suite;

smallLengthSmallPattern
    .add('linear#smalllength', function() {
    smallLength.linear("abcu");
  }).add('kmp#smalllength', function() {
    smallLength.kmp("abcu");
  }).add("regex:smalllength", function() {
    console.log(String(event.target));
  }).on('complete', function() {
    console.log('----on small length small pattern is ' + this.filter('fastest').map('name'));
  })
.run({ 'async': false });

mediumLengthSmallPattern
  .add('linear#mediumlength ', function() {
    mediumLength.linear("aaaa");
}).add('kmp#mediumlength', function() {
    mediumLength.kmp("aaaa");
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('----on medium length small pattern is ' + this.filter('fastest').map('name'));
})
.run({ 'async': false });

hugeLengthSmallPattern
  .add('linear#hugelength', function() {
    hugeLength.linear("aaauuuaaauuuaaau");
}).add('kmp#hugelength', function() {
    hugeLength.kmp("aaauuuaaauuuaaau");
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('----on huge length small pattern is' + this.filter('fastest').map('name'));
})
.run({ 'async': false });
