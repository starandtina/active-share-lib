import test from 'tape'

import buildUrl from '../src/util/buildUrl'

test('util#buildUrl', function (t) {
  t.plan(1);

  const url = 'http://www.a.com/?a=1'
  const params = {
    b: 1,
    c: 'khalil zhang'
  }

  t.equal(
    buildUrl(url, params),
    'http://www.a.com/?a=1&b=1&c=khalil%20zhang'
  )
});
