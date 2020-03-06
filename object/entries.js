const object = {
  a: 'somestring',
  b: 42,
  c: false,
  k: 'k',
  yay: 'yay',
};

const same = [];

Object.entries(object).forEach(([key, value]) => {
  if (key === value) {
    same.push([key, value]);
  }
});

const map = new Map(same);

// Also we can make like this
// const map = new Map(Object.entries(object));

console.log(map.get('yay'));
// expected output: String 'yay'
