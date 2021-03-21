const { sumAsync, subtractAsync } = require('./math');

async function sumTest() {
  const result = await sumAsync(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
}

test('sum adds numbers', sumTest);

async function subtractTest() {
  const result = await subtractAsync(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
}

test('subtract subtracts numbers', subtractTest);


async function test(title, callback) {
  try {
    await callback();
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