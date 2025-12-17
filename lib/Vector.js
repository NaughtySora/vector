'use strict';

const kBuffer = Symbol('buffer');

class Vector {
  [kBuffer] = new ArrayBuffer();
  #view = null;
  #View = null;
  #length = 0;
  #capacity = 0;

  constructor(View, size) {
    this.#view = new View(this[kBuffer]);
    this.#View = View;
    if (typeof size === "number") this.#resize(size);
  }

  #resize(value) {
    const capacity = value ?? ((this.#capacity << 1) || 1);
    this[kBuffer] = this[kBuffer].transfer(
      capacity * this.#View.BYTES_PER_ELEMENT
    );
    this.#view = new this.#View(this[kBuffer]);
    this.#capacity = capacity;
  }

  get #overflow() {
    return this.#capacity <= this.#length;
  }

  push(value) {
    if (this.#overflow) this.#resize();
    this.#view[this.length] = value;
    this.#length++;
  }

  pop() {
    if (this.#length === 0) return;
    const index = this.#length - 1;
    const value = this.#view[index];
    this.#view[index] = 0;
    this.#length = index;
    return value;
  }

  clear() {
    this.#view.fill(0);
    this.#length = 0;
  }

  reset() {
    this.#view = new this.#View(this[kBuffer] = new ArrayBuffer());
    this.#capacity = 0;
    this.#length = 0;
  }

  get(index) {
    if (this.#length === 0) return;
    if (index < 0 || index >= this.#length) return;
    return this.#view[index];
  }

  set(index, value) {
    if (index < 0 || index >= this.#length) return;
    this.#view[index] = value;
  }

  resize(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error('resize value should be positive integer or zero');
    }
    this.#resize(value);
    this.#length = value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.#length) return;
    if ((this.#length + 1) > this.#capacity) this.#resize();
    for (let i = this.#length - 1; i >= index; i--) {
      this.#view[i + 1] = this.#view[i];
    }
    this.#view[index] = value;
    this.#length++;
  }

  delete(index) {
    if (index < 0 || index >= this.#length) return;
    for (let i = index; i < this.#length; i++) {
      this.#view[i] = (i + 1) >= this.#length ? 0 : this.#view[i + 1];
    }
    this.#length--;
  }

  toString() {
    if (this.length === 0) return '';
    const output = [];
    for (let i = 0; i < this.#length; i++) {
      output.push(this.#view[i]);
    }
    return output.toString();
  }

  [Symbol.dispose]() {
    this.reset();
  }

  [Symbol.iterator]() {
    const length = this.#length;
    const view = this.#view;
    let i = 0;
    return {
      next() {
        if (i === length) return { done: true };
        return { value: view[i++], done: false };
      },
    };
  }

  get [Symbol.toStringTag]() {
    return Vector.name;
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