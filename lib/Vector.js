'use strict';

const kBuffer = Symbol('VectorBuffer')

class Vector {
  [kBuffer] = null;
  #view = null;
  #View = null;
  #length = 0;
  #capacity = 0;
  #pointer = 0;

  constructor(View) {
    this[kBuffer] = new ArrayBuffer(View.BYTES_PER_ELEMENT);
    this.#view = new View(this[kBuffer]);
    this.#View = View;
    this.#capacity = 1;
  }

  #resize() {
    const capacity = this[kBuffer].byteLength << 1;
    this[kBuffer] = this[kBuffer].transfer(capacity);
    this.#view = new this.#View(this[kBuffer]);
    this.#capacity = capacity;
  }

  get #overflow() {
    return this.#capacity <= this.#length;
  }

  push(value) {
    if (this.#overflow) this.#resize();
    this.#view[this.#pointer++] = value;
    this.#length++;
  }

  pop() {
    if (this.#length === 0) return 0;
    const value = this.#view[--this.#pointer];
    this.#view[this.#pointer] = 0;
    this.#length--;
    return value;
  }

  clear() {
    this.#view.fill(0);
    this[kBuffer] = this[kBuffer].transfer(this.#View.BYTES_PER_ELEMENT);
    this.#view = new this.#View(this[kBuffer]);
    this.#length = 0;
    this.#capacity = 1;
    this.#pointer = 0;
  }

  get(index) {
    if (index < 0 || index >= this.#length) return 0;
    return this.#view[index];
  }

  get length() {
    return this.#length;
  }

  get size() {
    return this.#length * this.#View.BYTES_PER_ELEMENT;
  }

  get capacity() {
    return this.#capacity;
  }
}

module.exports = Vector;