'use strict';

class Vector {
  #buffer = null;
  #view = null;
  #View = null;
  #length = 0;
  #capacity = 0;
  #pointer = 0;

  constructor(View) {
    this.#buffer = new ArrayBuffer(View.BYTES_PER_ELEMENT);
    this.#view = new View(this.#buffer);
    this.#View = View;
    this.#capacity = 1;
  }

  #resize() {
    const capacity = this.#buffer.byteLength << 1;
    this.#buffer = this.#buffer.transfer(capacity);
    this.#view = new this.#View(this.#buffer);
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