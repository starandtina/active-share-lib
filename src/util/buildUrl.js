// buildUrl('http://www.a.com/?a=1', {
//   b: 1,
//   c: 'khalil zhang'
// }); -- http://www.a.com/?a=1&b=1&c=khalil%20zhang
export default function buildUrl(url, params) {
  var q = [];
  for (var key in params) {
    q.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
  }
  if (q.length !== 0) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    url = url + sep + q.join('&'); // eslint-disable-line no-param-reassign
  }

  return url;
}
