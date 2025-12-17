'use strict';

const Vector = require('../lib/Vector.js');
const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

describe('Vector', () => {
  it('constructor', () => {
    const vec = new Vector(Int8Array);
    assert.equal(vec.capacity, 0);
    assert.equal(vec.length, 0);
    assert.equal(vec.size, 0);
    const vec2 = new Vector(Int8Array, 4);
    assert.equal(vec2.capacity, 4);
    assert.equal(vec2.length, 0);
    assert.equal(vec2.size, 0);
  });


  it('push/pop', () => {
    const vec = new Vector(Int32Array);
    vec.push(1);
    assert.equal(vec.length, 1);
    assert.equal(vec.size, Int32Array.BYTES_PER_ELEMENT);
    assert.equal(vec.capacity, 1);
    vec.push(2);
    assert.equal(vec.length, 2);
    assert.equal(vec.size, Int32Array.BYTES_PER_ELEMENT * 2);
    assert.equal(vec.capacity, 2);
    vec.push(3);
    assert.equal(vec.length, 3);
    assert.equal(vec.size, Int32Array.BYTES_PER_ELEMENT * 3);
    assert.equal(vec.capacity, 4);
    const val = vec.pop();
    assert.equal(val, 3);
    assert.equal(vec.length, 2);
    assert.equal(vec.size, Int32Array.BYTES_PER_ELEMENT * 2);
    assert.equal(vec.capacity, 4);
    vec.pop();
    vec.pop();
    assert.equal(vec.length, 0);
    assert.equal(vec.size, 0);
    assert.equal(vec.capacity, 4);
  });
});