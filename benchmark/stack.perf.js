var Benchmark = require('benchmark');
var Structures = require('../src/structures');

stack = Structures.Stack();
frozen = Structures.Stack();

for(var i = 0; i < 1000; i++) {
    stack.push(i);
    frozen.push(i);
}

frozen.freeze();

var containsMiddle = new Benchmark.Suite;
var containsBeginning = new Benchmark.Suite;

containsMiddle
    .add('contains#middle       ', function() {
    stack.contains(500);
  }).add('frozen contains#middle', function() {
    frozen.contains(500);
  }).on('cycle', function(event) {
    console.log(String(event.target));
  }).on('complete', function() {
    console.log('contains vs frozen contains middle - ' + this.filter('fastest').map('name'));
  })
.run({ 'async': false });

containsBeginning
    .add('contains#beginning       ', function() {
    stack.contains(250);
  }).add('frozen contains#beginning', function() {
    frozen.contains(250);
  }).on('cycle', function(event) {
    console.log(String(event.target));
  }).on('complete', function() {
    console.log('contains vs frozen contains beginning - ' + this.filter('fastest').map('name'));
  })
.run({ 'async': false });

