## [Algo] Fizzbuzz

### Description

A classic implementation of the FizzBuzz problem that prints numbers from 1 to N, replacing:
- Multiples of 3 with "Fizz"
- Multiples of 5 with "Buzz"
- Multiples of both with "FizzBuzz"

### Installation

No installation needed, just Node.js installed on your system.

### Usage

```bash
# Run with default value (N=42)
node fizzbuzz.js

# Run with custom value
node fizzbuzz.js 30
```

### Examples

```bash
$ node fizzbuzz.js 5
1
2
Fizz
4
Buzz
```

### Error Handling

- Invalid inputs will default to 42
- Numbers too large will display an error message
- Negative numbers will be converted to positive
