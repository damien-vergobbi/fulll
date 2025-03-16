/**
 * FizzBuzz implementation
 * Returns:
 * - "Fizz" if number is divisible by 3
 * - "Buzz" if number is divisible by 5
 * - "FizzBuzz" if number is divisible by both 3 and 5
 * - The number itself otherwise
 *
 * @param {number} number - The number to check
 * @returns {string | number} The transformed value according to FizzBuzz rules
 */
const fizzBuzz = (number) => {
  const rules = {
    3: "Fizz",
    5: "Buzz",
  };

  // Append 'fizz' if divisible by 3 and 'buzz' if divisible by 5
  const output = Object.entries(rules)
    .map(([key, value]) => (number % key === 0 ? value : ""))
    .join("");

  return output || number; // If output is empty, return the number
};

// Get the number from the command line, default to 42
const n = Math.abs(parseInt(process.argv[2])) || 42;

try {
  Array.from(
    {
      length: n,
    },
    (_, i) => console.log(fizzBuzz(i + 1))
  );

  // Log if 42 is used as a default number
  if (n === 42 && process.argv[2] !== "42") {
    console.log("\n--\n42 has been used as a default number");
  }
} catch (e) {
  if (e instanceof RangeError && e.message === "Invalid array length") {
    console.error("Number too large");
    process.exit(1);
  }

  // Otherwise, log the error
  console.error(e);
}
