/**
 * 处理url里面的字符，和给url附加参数
 * parse a=1&b=2 => {a:1, b: 2}
 * stringify {a:1, b: 2} => a=1&b=2
 */
export default {
  parse(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    let obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    let regexp = /\+/g;
    qs = qs.split(sep);

    let maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    let len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (let i = 0; i < len; ++i) {
      let x = qs[i].replace(regexp, '%20');
      let idx = x.indexOf(eq);
      let kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!Object.prototype.hasOwnProperty.call(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  },
  stringify(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    const _stringifyPrimitive = function(v) {
      switch (typeof v) {
        case 'string':
          return v;

        case 'boolean':
          return v ? 'true' : 'false';

        case 'number':
          return isFinite(v) ? v : '';

        default:
          return '';
      }
    };

    if (typeof obj === 'object') {
      return Object.keys(obj)
        .map(function(k) {
          let ks = encodeURIComponent(_stringifyPrimitive(k)) + eq;
          if (Array.isArray(obj[k])) {
            return obj[k]
              .map(function(v) {
                return ks + encodeURIComponent(_stringifyPrimitive(v));
              })
              .join(sep);
          } else {
            return ks + encodeURIComponent(_stringifyPrimitive(obj[k]));
          }
        })
        .join(sep);
    }

    if (!name) return '';
    return encodeURIComponent(_stringifyPrimitive(name)) + eq + encodeURIComponent(_stringifyPrimitive(obj));
  },
  url(url, obj) {
    const arr = url.split('?');
    const path = arr[0];
    const params = this.parse(arr[1] || '');
    obj = typeof obj === 'string' ? this.parse(obj) : obj;
    return path + '?' + this.stringify(Object.assign(params, obj));
  }
};
