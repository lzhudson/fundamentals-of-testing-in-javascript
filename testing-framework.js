const { sum, subtract } = require('./math');

function sumTest() {
  const result = sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
}

test('sum adds numbers', sumTest);

function subtractTest() {
  const result = subtract(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
}

test('subtract subtracts numbers', subtractTest);


function test(title, callback) {
  try {
    callback();
    console.log(`✔ ${title}`);
  } catch(error) {
    console.log(`✗ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if(actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected){},
    toBeGreatherThan(expected){}
  }
}