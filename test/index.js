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
    vec.pop();
    const v = vec.pop();
    assert.equal(v, undefined);
    vec.pop();
    assert.equal(vec.length, 0);
    assert.equal(vec.size, 0);
    assert.equal(vec.capacity, 4);
  });

  it('clear', () => {
    const vec = new Vector(Int16Array, 4);
    vec.push(1);
    vec.push(2);
    assert.equal(vec.get(0), 1);
    assert.equal(vec.length, 2);
    assert.equal(vec.size, 2 * Int16Array.BYTES_PER_ELEMENT);
    assert.equal(vec.capacity, 4);
    vec.clear();
    assert.equal(vec.get(0), undefined);
    assert.equal(vec.length, 0);
    assert.equal(vec.size, 0);
    assert.equal(vec.capacity, 4);
  });

  it('reset', () => {
    const vec = new Vector(Int16Array, 4);
    vec.push(1);
    vec.push(2);
    assert.equal(vec.get(0), 1);
    assert.equal(vec.length, 2);
    assert.equal(vec.size, 2 * Int16Array.BYTES_PER_ELEMENT);
    assert.equal(vec.capacity, 4);
    vec.reset();
    assert.equal(vec.get(0), undefined);
    assert.equal(vec.length, 0);
    assert.equal(vec.size, 0);
    assert.equal(vec.capacity, 0);
  });

  it('get/set', () => {
    const vec = new Vector(Int8Array);
    vec.resize(4);
    vec.set(1, 16);
    assert.equal(vec.get(1), 16);
    vec.set(3, 32);
    assert.equal(vec.get(3), 32);
    vec.set(4, 28);
    assert.equal(vec.get(4), undefined);
    assert.equal(vec.get(-1), undefined);
  });

  it('resize', () => {
    const vec = new Vector(Int32Array, 4);
    assert.equal(vec.length, 0);
    assert.equal(vec.capacity, 4);
    vec.resize(4);
    assert.equal(vec.length, 4);
    assert.equal(vec.capacity, 4);
    assert.throws(() => {
      vec.resize(12.5);
    }, { message: 'resize value should be positive integer or zero' })
  });

  it('insert/delete', () => {
    const vec = new Vector(Float32Array, 4);
    vec.push(11);
    vec.push(32);
    vec.push(16);
    assert.equal(vec.length, 3);
    vec.insert(1, 15);
    assert.deepEqual([...vec], [11, 15, 32, 16]);
    vec.delete(2);
    vec.insert(5, 25);
    assert.deepEqual([...vec], [11, 15, 16]);
    vec.insert(1, 1);
    vec.insert(3, 12);
    assert.deepEqual([...vec], [11, 1, 15, 12, 16]);
    vec.delete(10);
    assert.deepEqual([...vec], [11, 1, 15, 12, 16]);
  });

  it('toString', () => {
    const vec = new Vector(Int32Array, 4);
    assert.equal(vec.toString(), '');
    vec.push(3);
    vec.push(5);
    vec.push(8);
    assert.equal(vec.toString(), '3,5,8');
    vec.clear();
    assert.equal(vec.toString(), '');
  });

  it('iterator', () => {
    const vec = new Vector(Int32Array, 2);
    assert.deepEqual([...vec], []);
    vec.push(1);
    vec.push(3);
    assert.deepEqual([...vec], [1, 3]);
  });

  it('disposable', () => {
    let v = null;
    {
      using vec = new Vector(Int8Array, 4);
      vec.push(1);
      assert.equal(vec.get(0), 1);
      v = vec;
    }
    assert.equal(v.get(0), undefined);
    assert.equal(v.length, 0);
  });

  it('toStringTag', () => {
    const vec = new Vector(Int32Array);
    assert.equal(Object.prototype.toString.call(vec), '[object Vector]');
  });
});