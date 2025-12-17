'use strict';

const Vector = require('../lib/Vector.js');

const vec = new Vector(Int8Array);

vec.push(1);
vec.push(2);
vec.push(3);
vec.insert(1, 5);
