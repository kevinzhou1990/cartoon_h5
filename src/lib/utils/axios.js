/**
 * @info 对axios封装，添加队列处理
 */
import http_axios from 'axios';
import { isObject, isString, isFunction, isPromise, isNumber, isArray } from './dataType';
import query from './query';
import merge from './merge';

// http_axios.defaults.withCredentials = true;

let _options = {
  url: '',
  timeout: 30 * 1000,
  data: null,
  rely: false,
  success: function() {},
  fail: function() {},
  complete: function() {},
  method: 'get',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

let instance = http_axios.create(_options);

// 同步锁
let _asyncLock = {
  locks: {},
  get(url, data) {
    return isObject(data) || isString(data) ? query.url(url, data) : url;
  },
  add(url, data) {
    this.locks[this.get(url, data)] = true;
  },
  remove(url, data) {
    delete this.locks[this.get(url, data)];
  },
  has(url, data) {
    return this.locks[this.get(url, data)];
  }
};

let _defaults = {};

const _requestMQ = {
  map: {},
  mq: [],
  running: [],
  INIT_MAX_REQUEST: 5,
  MAX_REQUEST: 5,
  timer: null,
  push: function push(param) {
    param.t = +new Date();
    while (this.mq.indexOf(param.t) > -1 || this.running.indexOf(param.t) > -1) {
      param.t += (Math.random() * 10) >> 0;
    }
    this.mq.push(param.t);
    this.map[param.t] = param;
  },
  next: function next() {
    var me = this;
    if (this.mq.length === 0) return;
    if (this.running.length < this.MAX_REQUEST - 1) {
      var newone = this.mq.shift();
      var obj = this.map[newone];
      if (obj.rely) {
        this.MAX_REQUEST = 1;
      }
      var oldComplete = obj.complete;
      obj.complete = function() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        me.running.splice(me.running.indexOf(obj.t), 1);
        delete me.map[obj.t];
        oldComplete && oldComplete.apply(obj, args);
        me.MAX_REQUEST = me.INIT_MAX_REQUEST;
        me.next();

        clearTimeout(me.timer);
      };
      this.running.push(obj.t);
      return _http(obj);
    }
  },
  request: function request(obj) {
    obj = obj || {};
    obj = isString(obj) ? { url: obj } : obj;

    this.push(obj);

    return this.next();
  }
};

function _response(opts, res) {
  _asyncLock.remove(opts.url, opts.data);

  if (res.status === 200) {
    _intercept(opts, res, 'success');
  } else {
    const response = res.response ? res.response : res;
    let status = response.status;
    console.log(status === 0 ? '已经中断！' : '请求[' + opts.url + ']失败，状态码为' + status);
    let result = { data: res, status: status, msg: response.statusText };
    _intercept(opts, result, 'fail');
  }
}

function _intercept(opts, data, type) {
  data.key = opts.key;
  if (type === 'fail') {
    let err = isFunction(_defaults.fail) ? _defaults.fail(data) : data;
    opts.fail(err);
    opts.complete(err);
    opts.__reject(err);
  } else if (type === 'success') {
    let suc = isFunction(_defaults.success) ? _defaults.success(data, opts) : data;
    if (isPromise(suc)) {
      suc.catch(r => {
        opts.fail(r);
        opts.complete(r);
        opts.__reject(r);
      });
    } else if (suc === false) {
      opts.complete(data);
    } else {
      opts.success(suc);
      opts.complete(suc);
      opts.__resolve(suc);
    }
  }
  isFunction(_defaults.complete) && _defaults.complete(data);
}

function _http(opts) {
  instance(opts)
    .then(res => {
      _response(opts, res);
    })
    .catch(res => {
      _response(opts, res);
    });

  !!opts.config.lock && _asyncLock.add(opts.url, opts.data);

  if (isNumber(opts.config.lock) && opts.config.lock > 0) {
    setTimeout(() => {
      _asyncLock.remove(opts.url, opts.data);
    }, opts.config.lock * 1000);
  }
}

function axios(opts) {
  return new Promise((resolve, reject) => {
    if (isString(opts)) {
      opts = { url: opts };
    }

    opts = merge(true, {}, _options, opts);

    opts.config = {
      wait: opts.wait, // 是否wait,默认为false
      alert: opts.alert, // 是否有默认错误提示，默认为true
      lock: opts.lock // 是否请求锁定,默认为false
    };

    if (isObject(this)) {
      opts.config.wait = this.wait;
      opts.config.alert = this.alert;
      opts.config.lock = this.lock;
    } else if (isString(this)) {
      opts.config[this] = true;
    }

    opts.key = Math.round(Math.random() * 100 + Date.now());

    if (isString(opts.method)) {
      opts.method = opts.method.toLocaleString();
    }

    if (opts.args) {
      opts.url = opts.args[0];
      if (opts.method === 'delete' || opts.method === 'get') {
        Object.assign(opts, opts.args[1] || {});
      } else {
        Object.assign(opts, { data: opts.args[1] || {} }, opts.args[2] || {});
      }
      delete opts.args;
    }

    if (isFunction(_defaults.config)) {
      opts = _defaults.config(opts) || opts;
    }

    opts.__resolve = resolve;
    opts.__reject = reject;

    if (!!opts.config.lock && _asyncLock.has(opts.url, opts.data)) {
      _intercept(opts, { status: 999, data: { code: 999, msg: '请勿重复请求！' } }, 'fail');
      return;
    }

    _requestMQ.request(opts);
  });
}

axios.create = opts => {
  instance = http_axios.create(opts);
  //_defaults.options = merge(true, {}, _options, opts);

  return axios;
};

axios.intercept = o => {
  _defaults.config = o.config;
  _defaults.success = o.success;
  _defaults.fail = o.fail;
  _defaults.complete = o.complete;
};

axios.request = function(option) {
  return axios.call(option, { method: 'request', args: [option] });
};

axios.reset = function(option) {
  if (isArray(option)) {
    option.forEach(item =>
      _requestMQ.request(isFunction(_defaults.config) ? _defaults.config(item) || item : item)
    );
  } else {
    _requestMQ.request(isFunction(_defaults.config) ? _defaults.config(option) || option : option);
  }
};

axios.awaitTo = function(promise) {
  if (isPromise(promise)) {
    return promise.then(res => [res, null]).catch(err => [null, err]);
  }
  return Promise.resolve([null, null]);
};

['get', 'delete', 'post', 'patch', 'put'].forEach(method => {
  axios[method] = function(...args) {
    return axios.call(
      this === axios ? (method === 'get' || method === 'delete' ? args[1] : args[2]) : this,
      { args: args, method }
    );
  };
});

['wait', 'lock'].forEach(r => {
  axios[r] = {
    get: axios.get.bind(r),
    delete: axios.delete.bind(r),
    post: axios.post.bind(r),
    put: axios.put.bind(r),
    patch: axios.patch.bind(r)
  };
});

export default axios;
