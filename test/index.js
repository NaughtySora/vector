'use strict';

const Vector = require('../lib/Vector.js');

const vec = new Vector(Int8Array);

// vec.push
// vec.pop
// vec.get
// vec.set() contact buffer?

vec.push(1);
vec.push(2);
vec.push(3);
vec.push(4);
vec.push(5);

console.log(vec.pop(), vec.pop(), vec.pop(), vec.pop(), vec.pop(), vec.pop(),)
