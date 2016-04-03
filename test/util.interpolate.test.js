import test from 'tape'

import interpolate from '../src/util/interpolate'

test('util#interpolate', function (t) {
  t.plan(4);

  const size = 'Small'
  const age = 40
  const result = `Quantity of ${size} can not be less than ${age}.`

  t.equal(
    interpolate('Quantity of {0} can not be less than {1}.', 'Small', 40),
    result
  );

  t.equal(
    interpolate('Quantity of {0} can not be less than {1}.', ['Small', 40]),
    result
  );

  t.equal(
    interpolate('Quantity of {size} can not be less than {age}.', {
      size: 'Small',
      age: 40
    }),
    result
  );

  t.equal(
    interpolate('Quantity of {size} can not be less than {age}.', {
      size: () => 'Small',
      age: 40
    }),
    result
  );
});
