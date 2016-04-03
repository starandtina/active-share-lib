// Replaces nummeric placeholders like {0} in a string with arguments
// passed to the function
// eg: interpolate('Quantity of {0} can not be less than {1}.', 'Small', 40)
// eg: interpolate('Quantity of {name} can not be less than {maxQuantity}.', {name:'small', maxQuantity: 40})
// eg: interpolate('Quantity of {name} can not be less than {maxQuantity}.', {name: function(name){return name.toUpperCase();}, maxQuantity: 40})
export default function interpolate() {
  var args = Array.prototype.slice.call(arguments);
  var str = args.shift();
  var context = args[0];
  var toString = Object.prototype.toString;

  context = args.length === 1 ?
    (context !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(context))) ? context : args) : args;

  return str.replace(/{([\s\S]+?)}/g, function (match, interpolateStr) {
    var replacer = context[interpolateStr];

    if (toString.call(replacer) === '[object Function]') {
      replacer = replacer(interpolateStr);
    }

    return replacer === null || replacer === void 0 ? '' : replacer;
  });
}
