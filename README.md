# Vectors

# Attributes:
- Dynamic size
- Sequential data
- Fast random access O(1)
- Cache friendly
- insert/remove in middle O(n)

## Similar/Related concepts:
- Array - static fix length
- Dynamic Array
- Deque - vector-like, efficient push/pop
- Slice/View - shared memory 'piece' of vector

## Examples:
- C++ std::vector, canonical vector
- RUST Vec<T> similar to C++, explicit reallocation
- JS Array, semantically an array, can be sparse, hold any type of data, degrade if uses sparsely
- and many more

So basically JS has a 'real' array, its TypedArray
An arbitrary JS Array is more like vector/dynamic array

## Reasons of having array and vector:
### Vector:
- Unknown size
- Developer productivity, no manual resizing
### Array:
- Predictable memory
- Zero reallocation
- Lower overhead

### Vectors Grow:
- When length == capacity, allocate new larger memory block, 
copy old elements, free old memory
- Usually grows 2-1.5x so 100 bytes size becomes 200-150 bytes

### Common interface:
- length, capacity, isEmpty, getter first, getter last
- get, set, push, pop, insert, remove, clear
- iterator, slice/view