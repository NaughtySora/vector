
type TypedArray =
  Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor |
  Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor |
  BigInt64ArrayConstructor | BigUint64ArrayConstructor |
  Float16ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;

export class Vector {
  constructor(View: TypedArray, size?: number);
  push(value: number): void;
  pop(): number | undefined;
  clear(): void;
  reset(): void;
  get(index: number): number | undefined;
  set(index: number, value: number): void;
  resize(value: number): void
  insert(index: number, value: number): void;
  delete(index: number): void;
  toString(): string;
  [Symbol.dispose](): void;
  [Symbol.iterator](): Iterator<number>;
  length: number;
  size: number;
  capacity: number;
}
