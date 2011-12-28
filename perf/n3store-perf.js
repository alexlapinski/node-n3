#!/usr/bin/env node --max-old-space-size=1900
var n3 = require('../n3');
var assert = require('assert');

console.log('N3Store performance test');

var TEST;
var dim = 198;
var dimSquared = dim * dim;
var dimCubed = dimSquared * dim;
var prefix = 'http://example.org/#';

var store = new n3.Store();

TEST = '- Adding ' + dimCubed + ' triples';
console.time(TEST);
for(var i=0; i<dim; i++)
  for(var j=0; j<dim; j++)
    for(var k=0; k<dim; k++)
      store.add(prefix + i, prefix + j, prefix + k);
console.timeEnd(TEST);

TEST = '- Finding all ' + dimCubed + ' triples ' + dimSquared * 3 + ' times';
console.time(TEST);
for(i=0; i<dim; i++)
  assert.equal(store.find(prefix + i, null, null).length, dimSquared);
for(j=0; j<dim; j++)
  assert.equal(store.find(null, prefix + j, null).length, dimSquared);
for(k=0; k<dim; k++)
  assert.equal(store.find(null, null, prefix + k).length, dimSquared);
console.timeEnd(TEST);