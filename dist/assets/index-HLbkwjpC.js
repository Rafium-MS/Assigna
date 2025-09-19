var ox = Object.defineProperty;
var lx = (e, t, r) =>
  t in e
    ? ox(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (e[t] = r);
var Et = (e, t, r) => lx(e, typeof t != 'symbol' ? t + '' : t, r);
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const a of s)
      if (a.type === 'childList')
        for (const i of a.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(s) {
    const a = {};
    return (
      s.integrity && (a.integrity = s.integrity),
      s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (a.credentials = 'omit')
          : (a.credentials = 'same-origin'),
      a
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const a = r(s);
    fetch(s.href, a);
  }
})();
function ux(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var xm = { exports: {} },
  wl = {},
  wm = { exports: {} },
  pe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bi = Symbol.for('react.element'),
  cx = Symbol.for('react.portal'),
  dx = Symbol.for('react.fragment'),
  fx = Symbol.for('react.strict_mode'),
  hx = Symbol.for('react.profiler'),
  px = Symbol.for('react.provider'),
  mx = Symbol.for('react.context'),
  gx = Symbol.for('react.forward_ref'),
  yx = Symbol.for('react.suspense'),
  vx = Symbol.for('react.memo'),
  xx = Symbol.for('react.lazy'),
  Bf = Symbol.iterator;
function wx(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Bf && e[Bf]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var bm = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  _m = Object.assign,
  km = {};
function ea(e, t, r) {
  ((this.props = e),
    (this.context = t),
    (this.refs = km),
    (this.updater = r || bm));
}
ea.prototype.isReactComponent = {};
ea.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
ea.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function Sm() {}
Sm.prototype = ea.prototype;
function _d(e, t, r) {
  ((this.props = e),
    (this.context = t),
    (this.refs = km),
    (this.updater = r || bm));
}
var kd = (_d.prototype = new Sm());
kd.constructor = _d;
_m(kd, ea.prototype);
kd.isPureReactComponent = !0;
var Kf = Array.isArray,
  Nm = Object.prototype.hasOwnProperty,
  Sd = { current: null },
  Em = { key: !0, ref: !0, __self: !0, __source: !0 };
function jm(e, t, r) {
  var n,
    s = {},
    a = null,
    i = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (a = '' + t.key),
    t))
      Nm.call(t, n) && !Em.hasOwnProperty(n) && (s[n] = t[n]);
  var o = arguments.length - 2;
  if (o === 1) s.children = r;
  else if (1 < o) {
    for (var l = Array(o), c = 0; c < o; c++) l[c] = arguments[c + 2];
    s.children = l;
  }
  if (e && e.defaultProps)
    for (n in ((o = e.defaultProps), o)) s[n] === void 0 && (s[n] = o[n]);
  return {
    $$typeof: bi,
    type: e,
    key: a,
    ref: i,
    props: s,
    _owner: Sd.current,
  };
}
function bx(e, t) {
  return {
    $$typeof: bi,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Nd(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === bi;
}
function _x(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var Hf = /\/+/g;
function Kl(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? _x('' + e.key)
    : t.toString(36);
}
function ao(e, t, r, n, s) {
  var a = typeof e;
  (a === 'undefined' || a === 'boolean') && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (a) {
      case 'string':
      case 'number':
        i = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case bi:
          case cx:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (s = s(i)),
      (e = n === '' ? '.' + Kl(i, 0) : n),
      Kf(s)
        ? ((r = ''),
          e != null && (r = e.replace(Hf, '$&/') + '/'),
          ao(s, t, r, '', function (c) {
            return c;
          }))
        : s != null &&
          (Nd(s) &&
            (s = bx(
              s,
              r +
                (!s.key || (i && i.key === s.key)
                  ? ''
                  : ('' + s.key).replace(Hf, '$&/') + '/') +
                e,
            )),
          t.push(s)),
      1
    );
  if (((i = 0), (n = n === '' ? '.' : n + ':'), Kf(e)))
    for (var o = 0; o < e.length; o++) {
      a = e[o];
      var l = n + Kl(a, o);
      i += ao(a, t, r, l, s);
    }
  else if (((l = wx(e)), typeof l == 'function'))
    for (e = l.call(e), o = 0; !(a = e.next()).done; )
      ((a = a.value), (l = n + Kl(a, o++)), (i += ao(a, t, r, l, s)));
  else if (a === 'object')
    throw (
      (t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.',
      )
    );
  return i;
}
function Pi(e, t, r) {
  if (e == null) return e;
  var n = [],
    s = 0;
  return (
    ao(e, n, '', '', function (a) {
      return t.call(r, a, s++);
    }),
    n
  );
}
function kx(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = r));
        },
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = r));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var St = { current: null },
  io = { transition: null },
  Sx = {
    ReactCurrentDispatcher: St,
    ReactCurrentBatchConfig: io,
    ReactCurrentOwner: Sd,
  };
function Cm() {
  throw Error('act(...) is not supported in production builds of React.');
}
pe.Children = {
  map: Pi,
  forEach: function (e, t, r) {
    Pi(
      e,
      function () {
        t.apply(this, arguments);
      },
      r,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Pi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Pi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Nd(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.',
      );
    return e;
  },
};
pe.Component = ea;
pe.Fragment = dx;
pe.Profiler = hx;
pe.PureComponent = _d;
pe.StrictMode = fx;
pe.Suspense = yx;
pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sx;
pe.act = Cm;
pe.cloneElement = function (e, t, r) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.',
    );
  var n = _m({}, e.props),
    s = e.key,
    a = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((a = t.ref), (i = Sd.current)),
      t.key !== void 0 && (s = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var o = e.type.defaultProps;
    for (l in t)
      Nm.call(t, l) &&
        !Em.hasOwnProperty(l) &&
        (n[l] = t[l] === void 0 && o !== void 0 ? o[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) n.children = r;
  else if (1 < l) {
    o = Array(l);
    for (var c = 0; c < l; c++) o[c] = arguments[c + 2];
    n.children = o;
  }
  return { $$typeof: bi, type: e.type, key: s, ref: a, props: n, _owner: i };
};
pe.createContext = function (e) {
  return (
    (e = {
      $$typeof: mx,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: px, _context: e }),
    (e.Consumer = e)
  );
};
pe.createElement = jm;
pe.createFactory = function (e) {
  var t = jm.bind(null, e);
  return ((t.type = e), t);
};
pe.createRef = function () {
  return { current: null };
};
pe.forwardRef = function (e) {
  return { $$typeof: gx, render: e };
};
pe.isValidElement = Nd;
pe.lazy = function (e) {
  return { $$typeof: xx, _payload: { _status: -1, _result: e }, _init: kx };
};
pe.memo = function (e, t) {
  return { $$typeof: vx, type: e, compare: t === void 0 ? null : t };
};
pe.startTransition = function (e) {
  var t = io.transition;
  io.transition = {};
  try {
    e();
  } finally {
    io.transition = t;
  }
};
pe.unstable_act = Cm;
pe.useCallback = function (e, t) {
  return St.current.useCallback(e, t);
};
pe.useContext = function (e) {
  return St.current.useContext(e);
};
pe.useDebugValue = function () {};
pe.useDeferredValue = function (e) {
  return St.current.useDeferredValue(e);
};
pe.useEffect = function (e, t) {
  return St.current.useEffect(e, t);
};
pe.useId = function () {
  return St.current.useId();
};
pe.useImperativeHandle = function (e, t, r) {
  return St.current.useImperativeHandle(e, t, r);
};
pe.useInsertionEffect = function (e, t) {
  return St.current.useInsertionEffect(e, t);
};
pe.useLayoutEffect = function (e, t) {
  return St.current.useLayoutEffect(e, t);
};
pe.useMemo = function (e, t) {
  return St.current.useMemo(e, t);
};
pe.useReducer = function (e, t, r) {
  return St.current.useReducer(e, t, r);
};
pe.useRef = function (e) {
  return St.current.useRef(e);
};
pe.useState = function (e) {
  return St.current.useState(e);
};
pe.useSyncExternalStore = function (e, t, r) {
  return St.current.useSyncExternalStore(e, t, r);
};
pe.useTransition = function () {
  return St.current.useTransition();
};
pe.version = '18.3.1';
wm.exports = pe;
var C = wm.exports;
const ye = ux(C);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nx = C,
  Ex = Symbol.for('react.element'),
  jx = Symbol.for('react.fragment'),
  Cx = Object.prototype.hasOwnProperty,
  Tx = Nx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Ax = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tm(e, t, r) {
  var n,
    s = {},
    a = null,
    i = null;
  (r !== void 0 && (a = '' + r),
    t.key !== void 0 && (a = '' + t.key),
    t.ref !== void 0 && (i = t.ref));
  for (n in t) Cx.call(t, n) && !Ax.hasOwnProperty(n) && (s[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) s[n] === void 0 && (s[n] = t[n]);
  return {
    $$typeof: Ex,
    type: e,
    key: a,
    ref: i,
    props: s,
    _owner: Tx.current,
  };
}
wl.Fragment = jx;
wl.jsx = Tm;
wl.jsxs = Tm;
xm.exports = wl;
var u = xm.exports,
  Uu = {},
  Am = { exports: {} },
  zt = {},
  Im = { exports: {} },
  Pm = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(M, R) {
    var U = M.length;
    M.push(R);
    e: for (; 0 < U; ) {
      var K = (U - 1) >>> 1,
        ne = M[K];
      if (0 < s(ne, R)) ((M[K] = R), (M[U] = ne), (U = K));
      else break e;
    }
  }
  function r(M) {
    return M.length === 0 ? null : M[0];
  }
  function n(M) {
    if (M.length === 0) return null;
    var R = M[0],
      U = M.pop();
    if (U !== R) {
      M[0] = U;
      e: for (var K = 0, ne = M.length, fe = ne >>> 1; K < fe; ) {
        var A = 2 * (K + 1) - 1,
          O = M[A],
          le = A + 1,
          Ne = M[le];
        if (0 > s(O, U))
          le < ne && 0 > s(Ne, O)
            ? ((M[K] = Ne), (M[le] = U), (K = le))
            : ((M[K] = O), (M[A] = U), (K = A));
        else if (le < ne && 0 > s(Ne, U)) ((M[K] = Ne), (M[le] = U), (K = le));
        else break e;
      }
    }
    return R;
  }
  function s(M, R) {
    var U = M.sortIndex - R.sortIndex;
    return U !== 0 ? U : M.id - R.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var a = performance;
    e.unstable_now = function () {
      return a.now();
    };
  } else {
    var i = Date,
      o = i.now();
    e.unstable_now = function () {
      return i.now() - o;
    };
  }
  var l = [],
    c = [],
    d = 1,
    h = null,
    f = 3,
    y = !1,
    m = !1,
    x = !1,
    S = typeof setTimeout == 'function' ? setTimeout : null,
    g = typeof clearTimeout == 'function' ? clearTimeout : null,
    p = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(M) {
    for (var R = r(c); R !== null; ) {
      if (R.callback === null) n(c);
      else if (R.startTime <= M)
        (n(c), (R.sortIndex = R.expirationTime), t(l, R));
      else break;
      R = r(c);
    }
  }
  function k(M) {
    if (((x = !1), v(M), !m))
      if (r(l) !== null) ((m = !0), re(b));
      else {
        var R = r(c);
        R !== null && ae(k, R.startTime - M);
      }
  }
  function b(M, R) {
    ((m = !1), x && ((x = !1), g(N), (N = -1)), (y = !0));
    var U = f;
    try {
      for (
        v(R), h = r(l);
        h !== null && (!(h.expirationTime > R) || (M && !D()));

      ) {
        var K = h.callback;
        if (typeof K == 'function') {
          ((h.callback = null), (f = h.priorityLevel));
          var ne = K(h.expirationTime <= R);
          ((R = e.unstable_now()),
            typeof ne == 'function' ? (h.callback = ne) : h === r(l) && n(l),
            v(R));
        } else n(l);
        h = r(l);
      }
      if (h !== null) var fe = !0;
      else {
        var A = r(c);
        (A !== null && ae(k, A.startTime - R), (fe = !1));
      }
      return fe;
    } finally {
      ((h = null), (f = U), (y = !1));
    }
  }
  var _ = !1,
    w = null,
    N = -1,
    j = 5,
    T = -1;
  function D() {
    return !(e.unstable_now() - T < j);
  }
  function V() {
    if (w !== null) {
      var M = e.unstable_now();
      T = M;
      var R = !0;
      try {
        R = w(!0, M);
      } finally {
        R ? F() : ((_ = !1), (w = null));
      }
    } else _ = !1;
  }
  var F;
  if (typeof p == 'function')
    F = function () {
      p(V);
    };
  else if (typeof MessageChannel < 'u') {
    var B = new MessageChannel(),
      ie = B.port2;
    ((B.port1.onmessage = V),
      (F = function () {
        ie.postMessage(null);
      }));
  } else
    F = function () {
      S(V, 0);
    };
  function re(M) {
    ((w = M), _ || ((_ = !0), F()));
  }
  function ae(M, R) {
    N = S(function () {
      M(e.unstable_now());
    }, R);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      m || y || ((m = !0), re(b));
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (j = 0 < M ? Math.floor(1e3 / M) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return r(l);
    }),
    (e.unstable_next = function (M) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = f;
      }
      var U = f;
      f = R;
      try {
        return M();
      } finally {
        f = U;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, R) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var U = f;
      f = M;
      try {
        return R();
      } finally {
        f = U;
      }
    }),
    (e.unstable_scheduleCallback = function (M, R, U) {
      var K = e.unstable_now();
      switch (
        (typeof U == 'object' && U !== null
          ? ((U = U.delay), (U = typeof U == 'number' && 0 < U ? K + U : K))
          : (U = K),
        M)
      ) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return (
        (ne = U + ne),
        (M = {
          id: d++,
          callback: R,
          priorityLevel: M,
          startTime: U,
          expirationTime: ne,
          sortIndex: -1,
        }),
        U > K
          ? ((M.sortIndex = U),
            t(c, M),
            r(l) === null &&
              M === r(c) &&
              (x ? (g(N), (N = -1)) : (x = !0), ae(k, U - K)))
          : ((M.sortIndex = ne), t(l, M), m || y || ((m = !0), re(b))),
        M
      );
    }),
    (e.unstable_shouldYield = D),
    (e.unstable_wrapCallback = function (M) {
      var R = f;
      return function () {
        var U = f;
        f = R;
        try {
          return M.apply(this, arguments);
        } finally {
          f = U;
        }
      };
    }));
})(Pm);
Im.exports = Pm;
var Ix = Im.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Px = C,
  Ft = Ix;
function $(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, r = 1;
    r < arguments.length;
    r++
  )
    t += '&args[]=' + encodeURIComponent(arguments[r]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var Rm = new Set(),
  Ka = {};
function is(e, t) {
  (Fs(e, t), Fs(e + 'Capture', t));
}
function Fs(e, t) {
  for (Ka[e] = t, e = 0; e < t.length; e++) Rm.add(t[e]);
}
var $r = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  zu = Object.prototype.hasOwnProperty,
  Rx =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Wf = {},
  qf = {};
function Dx(e) {
  return zu.call(qf, e)
    ? !0
    : zu.call(Wf, e)
      ? !1
      : Rx.test(e)
        ? (qf[e] = !0)
        : ((Wf[e] = !0), !1);
}
function Ox(e, t, r, n) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return n
        ? !1
        : r !== null
          ? !r.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function Lx(e, t, r, n) {
  if (t === null || typeof t > 'u' || Ox(e, t, r, n)) return !0;
  if (n) return !1;
  if (r !== null)
    switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Nt(e, t, r, n, s, a, i) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = n),
    (this.attributeNamespace = s),
    (this.mustUseProperty = r),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = a),
    (this.removeEmptyString = i));
}
var it = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    it[e] = new Nt(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  it[t] = new Nt(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  it[e] = new Nt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  it[e] = new Nt(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    it[e] = new Nt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  it[e] = new Nt(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  it[e] = new Nt(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  it[e] = new Nt(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  it[e] = new Nt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ed = /[\-:]([a-z])/g;
function jd(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ed, jd);
    it[t] = new Nt(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(Ed, jd);
    it[t] = new Nt(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(Ed, jd);
  it[t] = new Nt(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  it[e] = new Nt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
it.xlinkHref = new Nt(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1,
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  it[e] = new Nt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Cd(e, t, r, n) {
  var s = it.hasOwnProperty(t) ? it[t] : null;
  (s !== null
    ? s.type !== 0
    : n ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (Lx(t, r, s, n) && (r = null),
    n || s === null
      ? Dx(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, '' + r))
      : s.mustUseProperty
        ? (e[s.propertyName] = r === null ? (s.type === 3 ? !1 : '') : r)
        : ((t = s.attributeName),
          (n = s.attributeNamespace),
          r === null
            ? e.removeAttribute(t)
            : ((s = s.type),
              (r = s === 3 || (s === 4 && r === !0) ? '' : '' + r),
              n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
}
var Hr = Px.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Ri = Symbol.for('react.element'),
  gs = Symbol.for('react.portal'),
  ys = Symbol.for('react.fragment'),
  Td = Symbol.for('react.strict_mode'),
  Bu = Symbol.for('react.profiler'),
  Dm = Symbol.for('react.provider'),
  Om = Symbol.for('react.context'),
  Ad = Symbol.for('react.forward_ref'),
  Ku = Symbol.for('react.suspense'),
  Hu = Symbol.for('react.suspense_list'),
  Id = Symbol.for('react.memo'),
  Yr = Symbol.for('react.lazy'),
  Lm = Symbol.for('react.offscreen'),
  Zf = Symbol.iterator;
function ca(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Zf && e[Zf]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var Fe = Object.assign,
  Hl;
function _a(e) {
  if (Hl === void 0)
    try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      Hl = (t && t[1]) || '';
    }
  return (
    `
` +
    Hl +
    e
  );
}
var Wl = !1;
function ql(e, t) {
  if (!e || Wl) return '';
  Wl = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var n = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          n = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        n = c;
      }
      e();
    }
  } catch (c) {
    if (c && n && typeof c.stack == 'string') {
      for (
        var s = c.stack.split(`
`),
          a = n.stack.split(`
`),
          i = s.length - 1,
          o = a.length - 1;
        1 <= i && 0 <= o && s[i] !== a[o];

      )
        o--;
      for (; 1 <= i && 0 <= o; i--, o--)
        if (s[i] !== a[o]) {
          if (i !== 1 || o !== 1)
            do
              if ((i--, o--, 0 > o || s[i] !== a[o])) {
                var l =
                  `
` + s[i].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    l.includes('<anonymous>') &&
                    (l = l.replace('<anonymous>', e.displayName)),
                  l
                );
              }
            while (1 <= i && 0 <= o);
          break;
        }
    }
  } finally {
    ((Wl = !1), (Error.prepareStackTrace = r));
  }
  return (e = e ? e.displayName || e.name : '') ? _a(e) : '';
}
function Mx(e) {
  switch (e.tag) {
    case 5:
      return _a(e.type);
    case 16:
      return _a('Lazy');
    case 13:
      return _a('Suspense');
    case 19:
      return _a('SuspenseList');
    case 0:
    case 2:
    case 15:
      return ((e = ql(e.type, !1)), e);
    case 11:
      return ((e = ql(e.type.render, !1)), e);
    case 1:
      return ((e = ql(e.type, !0)), e);
    default:
      return '';
  }
}
function Wu(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case ys:
      return 'Fragment';
    case gs:
      return 'Portal';
    case Bu:
      return 'Profiler';
    case Td:
      return 'StrictMode';
    case Ku:
      return 'Suspense';
    case Hu:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case Om:
        return (e.displayName || 'Context') + '.Consumer';
      case Dm:
        return (e._context.displayName || 'Context') + '.Provider';
      case Ad:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case Id:
        return (
          (t = e.displayName || null),
          t !== null ? t : Wu(e.type) || 'Memo'
        );
      case Yr:
        ((t = e._payload), (e = e._init));
        try {
          return Wu(e(t));
        } catch {}
    }
  return null;
}
function Vx(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return Wu(t);
    case 8:
      return t === Td ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function _n(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function Mm(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function Fx(e) {
  var t = Mm(e) ? 'checked' : 'value',
    r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    n = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof r < 'u' &&
    typeof r.get == 'function' &&
    typeof r.set == 'function'
  ) {
    var s = r.get,
      a = r.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return s.call(this);
        },
        set: function (i) {
          ((n = '' + i), a.call(this, i));
        },
      }),
      Object.defineProperty(e, t, { enumerable: r.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (i) {
          n = '' + i;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Di(e) {
  e._valueTracker || (e._valueTracker = Fx(e));
}
function Vm(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(),
    n = '';
  return (
    e && (n = Mm(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = n),
    e !== r ? (t.setValue(e), !0) : !1
  );
}
function jo(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function qu(e, t) {
  var r = t.checked;
  return Fe({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: r ?? e._wrapperState.initialChecked,
  });
}
function Qf(e, t) {
  var r = t.defaultValue == null ? '' : t.defaultValue,
    n = t.checked != null ? t.checked : t.defaultChecked;
  ((r = _n(t.value != null ? t.value : r)),
    (e._wrapperState = {
      initialChecked: n,
      initialValue: r,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    }));
}
function Fm(e, t) {
  ((t = t.checked), t != null && Cd(e, 'checked', t, !1));
}
function Zu(e, t) {
  Fm(e, t);
  var r = _n(t.value),
    n = t.type;
  if (r != null)
    n === 'number'
      ? ((r === 0 && e.value === '') || e.value != r) && (e.value = '' + r)
      : e.value !== '' + r && (e.value = '' + r);
  else if (n === 'submit' || n === 'reset') {
    e.removeAttribute('value');
    return;
  }
  (t.hasOwnProperty('value')
    ? Qu(e, t.type, r)
    : t.hasOwnProperty('defaultValue') && Qu(e, t.type, _n(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Gf(e, t, r) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var n = t.type;
    if (
      !(
        (n !== 'submit' && n !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = '' + e._wrapperState.initialValue),
      r || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((r = e.name),
    r !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    r !== '' && (e.name = r));
}
function Qu(e, t, r) {
  (t !== 'number' || jo(e.ownerDocument) !== e) &&
    (r == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + r && (e.defaultValue = '' + r));
}
var ka = Array.isArray;
function Ts(e, t, r, n) {
  if (((e = e.options), t)) {
    t = {};
    for (var s = 0; s < r.length; s++) t['$' + r[s]] = !0;
    for (r = 0; r < e.length; r++)
      ((s = t.hasOwnProperty('$' + e[r].value)),
        e[r].selected !== s && (e[r].selected = s),
        s && n && (e[r].defaultSelected = !0));
  } else {
    for (r = '' + _n(r), t = null, s = 0; s < e.length; s++) {
      if (e[s].value === r) {
        ((e[s].selected = !0), n && (e[s].defaultSelected = !0));
        return;
      }
      t !== null || e[s].disabled || (t = e[s]);
    }
    t !== null && (t.selected = !0);
  }
}
function Gu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error($(91));
  return Fe({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function Yf(e, t) {
  var r = t.value;
  if (r == null) {
    if (((r = t.children), (t = t.defaultValue), r != null)) {
      if (t != null) throw Error($(92));
      if (ka(r)) {
        if (1 < r.length) throw Error($(93));
        r = r[0];
      }
      t = r;
    }
    (t == null && (t = ''), (r = t));
  }
  e._wrapperState = { initialValue: _n(r) };
}
function $m(e, t) {
  var r = _n(t.value),
    n = _n(t.defaultValue);
  (r != null &&
    ((r = '' + r),
    r !== e.value && (e.value = r),
    t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
    n != null && (e.defaultValue = '' + n));
}
function Jf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function Um(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Yu(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? Um(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var Oi,
  zm = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, r, n, s) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, r, n, s);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t;
    else {
      for (
        Oi = Oi || document.createElement('div'),
          Oi.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Oi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Ha(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ta = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  $x = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Ta).forEach(function (e) {
  $x.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Ta[t] = Ta[e]));
  });
});
function Bm(e, t, r) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : r || typeof t != 'number' || t === 0 || (Ta.hasOwnProperty(e) && Ta[e])
      ? ('' + t).trim()
      : t + 'px';
}
function Km(e, t) {
  e = e.style;
  for (var r in t)
    if (t.hasOwnProperty(r)) {
      var n = r.indexOf('--') === 0,
        s = Bm(r, t[r], n);
      (r === 'float' && (r = 'cssFloat'), n ? e.setProperty(r, s) : (e[r] = s));
    }
}
var Ux = Fe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Ju(e, t) {
  if (t) {
    if (Ux[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error($(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error($(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error($(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error($(62));
  }
}
function Xu(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var ec = null;
function Pd(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var tc = null,
  As = null,
  Is = null;
function Xf(e) {
  if ((e = Si(e))) {
    if (typeof tc != 'function') throw Error($(280));
    var t = e.stateNode;
    t && ((t = Nl(t)), tc(e.stateNode, e.type, t));
  }
}
function Hm(e) {
  As ? (Is ? Is.push(e) : (Is = [e])) : (As = e);
}
function Wm() {
  if (As) {
    var e = As,
      t = Is;
    if (((Is = As = null), Xf(e), t)) for (e = 0; e < t.length; e++) Xf(t[e]);
  }
}
function qm(e, t) {
  return e(t);
}
function Zm() {}
var Zl = !1;
function Qm(e, t, r) {
  if (Zl) return e(t, r);
  Zl = !0;
  try {
    return qm(e, t, r);
  } finally {
    ((Zl = !1), (As !== null || Is !== null) && (Zm(), Wm()));
  }
}
function Wa(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var n = Nl(r);
  if (n === null) return null;
  r = n[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ((n = !n.disabled) ||
        ((e = e.type),
        (n = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !n));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != 'function') throw Error($(231, t, typeof r));
  return r;
}
var rc = !1;
if ($r)
  try {
    var da = {};
    (Object.defineProperty(da, 'passive', {
      get: function () {
        rc = !0;
      },
    }),
      window.addEventListener('test', da, da),
      window.removeEventListener('test', da, da));
  } catch {
    rc = !1;
  }
function zx(e, t, r, n, s, a, i, o, l) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, c);
  } catch (d) {
    this.onError(d);
  }
}
var Aa = !1,
  Co = null,
  To = !1,
  nc = null,
  Bx = {
    onError: function (e) {
      ((Aa = !0), (Co = e));
    },
  };
function Kx(e, t, r, n, s, a, i, o, l) {
  ((Aa = !1), (Co = null), zx.apply(Bx, arguments));
}
function Hx(e, t, r, n, s, a, i, o, l) {
  if ((Kx.apply(this, arguments), Aa)) {
    if (Aa) {
      var c = Co;
      ((Aa = !1), (Co = null));
    } else throw Error($(198));
    To || ((To = !0), (nc = c));
  }
}
function os(e) {
  var t = e,
    r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (r = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function Gm(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function eh(e) {
  if (os(e) !== e) throw Error($(188));
}
function Wx(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = os(e)), t === null)) throw Error($(188));
    return t !== e ? null : e;
  }
  for (var r = e, n = t; ; ) {
    var s = r.return;
    if (s === null) break;
    var a = s.alternate;
    if (a === null) {
      if (((n = s.return), n !== null)) {
        r = n;
        continue;
      }
      break;
    }
    if (s.child === a.child) {
      for (a = s.child; a; ) {
        if (a === r) return (eh(s), e);
        if (a === n) return (eh(s), t);
        a = a.sibling;
      }
      throw Error($(188));
    }
    if (r.return !== n.return) ((r = s), (n = a));
    else {
      for (var i = !1, o = s.child; o; ) {
        if (o === r) {
          ((i = !0), (r = s), (n = a));
          break;
        }
        if (o === n) {
          ((i = !0), (n = s), (r = a));
          break;
        }
        o = o.sibling;
      }
      if (!i) {
        for (o = a.child; o; ) {
          if (o === r) {
            ((i = !0), (r = a), (n = s));
            break;
          }
          if (o === n) {
            ((i = !0), (n = a), (r = s));
            break;
          }
          o = o.sibling;
        }
        if (!i) throw Error($(189));
      }
    }
    if (r.alternate !== n) throw Error($(190));
  }
  if (r.tag !== 3) throw Error($(188));
  return r.stateNode.current === r ? e : t;
}
function Ym(e) {
  return ((e = Wx(e)), e !== null ? Jm(e) : null);
}
function Jm(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Jm(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Xm = Ft.unstable_scheduleCallback,
  th = Ft.unstable_cancelCallback,
  qx = Ft.unstable_shouldYield,
  Zx = Ft.unstable_requestPaint,
  Ke = Ft.unstable_now,
  Qx = Ft.unstable_getCurrentPriorityLevel,
  Rd = Ft.unstable_ImmediatePriority,
  eg = Ft.unstable_UserBlockingPriority,
  Ao = Ft.unstable_NormalPriority,
  Gx = Ft.unstable_LowPriority,
  tg = Ft.unstable_IdlePriority,
  bl = null,
  wr = null;
function Yx(e) {
  if (wr && typeof wr.onCommitFiberRoot == 'function')
    try {
      wr.onCommitFiberRoot(bl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var ir = Math.clz32 ? Math.clz32 : e0,
  Jx = Math.log,
  Xx = Math.LN2;
function e0(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Jx(e) / Xx) | 0)) | 0);
}
var Li = 64,
  Mi = 4194304;
function Sa(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Io(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var n = 0,
    s = e.suspendedLanes,
    a = e.pingedLanes,
    i = r & 268435455;
  if (i !== 0) {
    var o = i & ~s;
    o !== 0 ? (n = Sa(o)) : ((a &= i), a !== 0 && (n = Sa(a)));
  } else ((i = r & ~s), i !== 0 ? (n = Sa(i)) : a !== 0 && (n = Sa(a)));
  if (n === 0) return 0;
  if (
    t !== 0 &&
    t !== n &&
    !(t & s) &&
    ((s = n & -n), (a = t & -t), s >= a || (s === 16 && (a & 4194240) !== 0))
  )
    return t;
  if ((n & 4 && (n |= r & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= n; 0 < t; )
      ((r = 31 - ir(t)), (s = 1 << r), (n |= e[r]), (t &= ~s));
  return n;
}
function t0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function r0(e, t) {
  for (
    var r = e.suspendedLanes,
      n = e.pingedLanes,
      s = e.expirationTimes,
      a = e.pendingLanes;
    0 < a;

  ) {
    var i = 31 - ir(a),
      o = 1 << i,
      l = s[i];
    (l === -1
      ? (!(o & r) || o & n) && (s[i] = t0(o, t))
      : l <= t && (e.expiredLanes |= o),
      (a &= ~o));
  }
}
function sc(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function rg() {
  var e = Li;
  return ((Li <<= 1), !(Li & 4194240) && (Li = 64), e);
}
function Ql(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function _i(e, t, r) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - ir(t)),
    (e[t] = r));
}
function n0(e, t) {
  var r = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var n = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var s = 31 - ir(r),
      a = 1 << s;
    ((t[s] = 0), (n[s] = -1), (e[s] = -1), (r &= ~a));
  }
}
function Dd(e, t) {
  var r = (e.entangledLanes |= t);
  for (e = e.entanglements; r; ) {
    var n = 31 - ir(r),
      s = 1 << n;
    ((s & t) | (e[n] & t) && (e[n] |= t), (r &= ~s));
  }
}
var ke = 0;
function ng(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var sg,
  Od,
  ag,
  ig,
  og,
  ac = !1,
  Vi = [],
  un = null,
  cn = null,
  dn = null,
  qa = new Map(),
  Za = new Map(),
  tn = [],
  s0 =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' ',
    );
function rh(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      un = null;
      break;
    case 'dragenter':
    case 'dragleave':
      cn = null;
      break;
    case 'mouseover':
    case 'mouseout':
      dn = null;
      break;
    case 'pointerover':
    case 'pointerout':
      qa.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      Za.delete(t.pointerId);
  }
}
function fa(e, t, r, n, s, a) {
  return e === null || e.nativeEvent !== a
    ? ((e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: n,
        nativeEvent: a,
        targetContainers: [s],
      }),
      t !== null && ((t = Si(t)), t !== null && Od(t)),
      e)
    : ((e.eventSystemFlags |= n),
      (t = e.targetContainers),
      s !== null && t.indexOf(s) === -1 && t.push(s),
      e);
}
function a0(e, t, r, n, s) {
  switch (t) {
    case 'focusin':
      return ((un = fa(un, e, t, r, n, s)), !0);
    case 'dragenter':
      return ((cn = fa(cn, e, t, r, n, s)), !0);
    case 'mouseover':
      return ((dn = fa(dn, e, t, r, n, s)), !0);
    case 'pointerover':
      var a = s.pointerId;
      return (qa.set(a, fa(qa.get(a) || null, e, t, r, n, s)), !0);
    case 'gotpointercapture':
      return (
        (a = s.pointerId),
        Za.set(a, fa(Za.get(a) || null, e, t, r, n, s)),
        !0
      );
  }
  return !1;
}
function lg(e) {
  var t = Un(e.target);
  if (t !== null) {
    var r = os(t);
    if (r !== null) {
      if (((t = r.tag), t === 13)) {
        if (((t = Gm(r)), t !== null)) {
          ((e.blockedOn = t),
            og(e.priority, function () {
              ag(r);
            }));
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function oo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = ic(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      ((ec = n), r.target.dispatchEvent(n), (ec = null));
    } else return ((t = Si(r)), t !== null && Od(t), (e.blockedOn = r), !1);
    t.shift();
  }
  return !0;
}
function nh(e, t, r) {
  oo(e) && r.delete(t);
}
function i0() {
  ((ac = !1),
    un !== null && oo(un) && (un = null),
    cn !== null && oo(cn) && (cn = null),
    dn !== null && oo(dn) && (dn = null),
    qa.forEach(nh),
    Za.forEach(nh));
}
function ha(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    ac ||
      ((ac = !0),
      Ft.unstable_scheduleCallback(Ft.unstable_NormalPriority, i0)));
}
function Qa(e) {
  function t(s) {
    return ha(s, e);
  }
  if (0 < Vi.length) {
    ha(Vi[0], e);
    for (var r = 1; r < Vi.length; r++) {
      var n = Vi[r];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (
    un !== null && ha(un, e),
      cn !== null && ha(cn, e),
      dn !== null && ha(dn, e),
      qa.forEach(t),
      Za.forEach(t),
      r = 0;
    r < tn.length;
    r++
  )
    ((n = tn[r]), n.blockedOn === e && (n.blockedOn = null));
  for (; 0 < tn.length && ((r = tn[0]), r.blockedOn === null); )
    (lg(r), r.blockedOn === null && tn.shift());
}
var Ps = Hr.ReactCurrentBatchConfig,
  Po = !0;
function o0(e, t, r, n) {
  var s = ke,
    a = Ps.transition;
  Ps.transition = null;
  try {
    ((ke = 1), Ld(e, t, r, n));
  } finally {
    ((ke = s), (Ps.transition = a));
  }
}
function l0(e, t, r, n) {
  var s = ke,
    a = Ps.transition;
  Ps.transition = null;
  try {
    ((ke = 4), Ld(e, t, r, n));
  } finally {
    ((ke = s), (Ps.transition = a));
  }
}
function Ld(e, t, r, n) {
  if (Po) {
    var s = ic(e, t, r, n);
    if (s === null) (au(e, t, n, Ro, r), rh(e, n));
    else if (a0(s, e, t, r, n)) n.stopPropagation();
    else if ((rh(e, n), t & 4 && -1 < s0.indexOf(e))) {
      for (; s !== null; ) {
        var a = Si(s);
        if (
          (a !== null && sg(a),
          (a = ic(e, t, r, n)),
          a === null && au(e, t, n, Ro, r),
          a === s)
        )
          break;
        s = a;
      }
      s !== null && n.stopPropagation();
    } else au(e, t, n, null, r);
  }
}
var Ro = null;
function ic(e, t, r, n) {
  if (((Ro = null), (e = Pd(n)), (e = Un(e)), e !== null))
    if (((t = os(e)), t === null)) e = null;
    else if (((r = t.tag), r === 13)) {
      if (((e = Gm(t)), e !== null)) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((Ro = e), null);
}
function ug(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (Qx()) {
        case Rd:
          return 1;
        case eg:
          return 4;
        case Ao:
        case Gx:
          return 16;
        case tg:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var an = null,
  Md = null,
  lo = null;
function cg() {
  if (lo) return lo;
  var e,
    t = Md,
    r = t.length,
    n,
    s = 'value' in an ? an.value : an.textContent,
    a = s.length;
  for (e = 0; e < r && t[e] === s[e]; e++);
  var i = r - e;
  for (n = 1; n <= i && t[r - n] === s[a - n]; n++);
  return (lo = s.slice(e, 1 < n ? 1 - n : void 0));
}
function uo(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Fi() {
  return !0;
}
function sh() {
  return !1;
}
function Bt(e) {
  function t(r, n, s, a, i) {
    ((this._reactName = r),
      (this._targetInst = s),
      (this.type = n),
      (this.nativeEvent = a),
      (this.target = i),
      (this.currentTarget = null));
    for (var o in e)
      e.hasOwnProperty(o) && ((r = e[o]), (this[o] = r ? r(a) : a[o]));
    return (
      (this.isDefaultPrevented = (
        a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1
      )
        ? Fi
        : sh),
      (this.isPropagationStopped = sh),
      this
    );
  }
  return (
    Fe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r &&
          (r.preventDefault
            ? r.preventDefault()
            : typeof r.returnValue != 'unknown' && (r.returnValue = !1),
          (this.isDefaultPrevented = Fi));
      },
      stopPropagation: function () {
        var r = this.nativeEvent;
        r &&
          (r.stopPropagation
            ? r.stopPropagation()
            : typeof r.cancelBubble != 'unknown' && (r.cancelBubble = !0),
          (this.isPropagationStopped = Fi));
      },
      persist: function () {},
      isPersistent: Fi,
    }),
    t
  );
}
var ta = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Vd = Bt(ta),
  ki = Fe({}, ta, { view: 0, detail: 0 }),
  u0 = Bt(ki),
  Gl,
  Yl,
  pa,
  _l = Fe({}, ki, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Fd,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== pa &&
            (pa && e.type === 'mousemove'
              ? ((Gl = e.screenX - pa.screenX), (Yl = e.screenY - pa.screenY))
              : (Yl = Gl = 0),
            (pa = e)),
          Gl);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Yl;
    },
  }),
  ah = Bt(_l),
  c0 = Fe({}, _l, { dataTransfer: 0 }),
  d0 = Bt(c0),
  f0 = Fe({}, ki, { relatedTarget: 0 }),
  Jl = Bt(f0),
  h0 = Fe({}, ta, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  p0 = Bt(h0),
  m0 = Fe({}, ta, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  g0 = Bt(m0),
  y0 = Fe({}, ta, { data: 0 }),
  ih = Bt(y0),
  v0 = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  x0 = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  w0 = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function b0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = w0[e]) ? !!t[e] : !1;
}
function Fd() {
  return b0;
}
var _0 = Fe({}, ki, {
    key: function (e) {
      if (e.key) {
        var t = v0[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = uo(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? x0[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fd,
    charCode: function (e) {
      return e.type === 'keypress' ? uo(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? uo(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
    },
  }),
  k0 = Bt(_0),
  S0 = Fe({}, _l, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  oh = Bt(S0),
  N0 = Fe({}, ki, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fd,
  }),
  E0 = Bt(N0),
  j0 = Fe({}, ta, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  C0 = Bt(j0),
  T0 = Fe({}, _l, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  A0 = Bt(T0),
  I0 = [9, 13, 27, 32],
  $d = $r && 'CompositionEvent' in window,
  Ia = null;
$r && 'documentMode' in document && (Ia = document.documentMode);
var P0 = $r && 'TextEvent' in window && !Ia,
  dg = $r && (!$d || (Ia && 8 < Ia && 11 >= Ia)),
  lh = ' ',
  uh = !1;
function fg(e, t) {
  switch (e) {
    case 'keyup':
      return I0.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function hg(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
}
var vs = !1;
function R0(e, t) {
  switch (e) {
    case 'compositionend':
      return hg(t);
    case 'keypress':
      return t.which !== 32 ? null : ((uh = !0), lh);
    case 'textInput':
      return ((e = t.data), e === lh && uh ? null : e);
    default:
      return null;
  }
}
function D0(e, t) {
  if (vs)
    return e === 'compositionend' || (!$d && fg(e, t))
      ? ((e = cg()), (lo = Md = an = null), (vs = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return dg && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var O0 = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function ch(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!O0[e.type] : t === 'textarea';
}
function pg(e, t, r, n) {
  (Hm(n),
    (t = Do(t, 'onChange')),
    0 < t.length &&
      ((r = new Vd('onChange', 'change', null, r, n)),
      e.push({ event: r, listeners: t })));
}
var Pa = null,
  Ga = null;
function L0(e) {
  Ng(e, 0);
}
function kl(e) {
  var t = bs(e);
  if (Vm(t)) return e;
}
function M0(e, t) {
  if (e === 'change') return t;
}
var mg = !1;
if ($r) {
  var Xl;
  if ($r) {
    var eu = 'oninput' in document;
    if (!eu) {
      var dh = document.createElement('div');
      (dh.setAttribute('oninput', 'return;'),
        (eu = typeof dh.oninput == 'function'));
    }
    Xl = eu;
  } else Xl = !1;
  mg = Xl && (!document.documentMode || 9 < document.documentMode);
}
function fh() {
  Pa && (Pa.detachEvent('onpropertychange', gg), (Ga = Pa = null));
}
function gg(e) {
  if (e.propertyName === 'value' && kl(Ga)) {
    var t = [];
    (pg(t, Ga, e, Pd(e)), Qm(L0, t));
  }
}
function V0(e, t, r) {
  e === 'focusin'
    ? (fh(), (Pa = t), (Ga = r), Pa.attachEvent('onpropertychange', gg))
    : e === 'focusout' && fh();
}
function F0(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return kl(Ga);
}
function $0(e, t) {
  if (e === 'click') return kl(t);
}
function U0(e, t) {
  if (e === 'input' || e === 'change') return kl(t);
}
function z0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var cr = typeof Object.is == 'function' ? Object.is : z0;
function Ya(e, t) {
  if (cr(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (n = 0; n < r.length; n++) {
    var s = r[n];
    if (!zu.call(t, s) || !cr(e[s], t[s])) return !1;
  }
  return !0;
}
function hh(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ph(e, t) {
  var r = hh(e);
  e = 0;
  for (var n; r; ) {
    if (r.nodeType === 3) {
      if (((n = e + r.textContent.length), e <= t && n >= t))
        return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = hh(r);
  }
}
function yg(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? yg(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function vg() {
  for (var e = window, t = jo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == 'string';
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = jo(e.document);
  }
  return t;
}
function Ud(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function B0(e) {
  var t = vg(),
    r = e.focusedElem,
    n = e.selectionRange;
  if (
    t !== r &&
    r &&
    r.ownerDocument &&
    yg(r.ownerDocument.documentElement, r)
  ) {
    if (n !== null && Ud(r)) {
      if (
        ((t = n.start),
        (e = n.end),
        e === void 0 && (e = t),
        'selectionStart' in r)
      )
        ((r.selectionStart = t),
          (r.selectionEnd = Math.min(e, r.value.length)));
      else if (
        ((e = ((t = r.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var s = r.textContent.length,
          a = Math.min(n.start, s);
        ((n = n.end === void 0 ? a : Math.min(n.end, s)),
          !e.extend && a > n && ((s = n), (n = a), (a = s)),
          (s = ph(r, a)));
        var i = ph(r, n);
        s &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== s.node ||
            e.anchorOffset !== s.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(s.node, s.offset),
          e.removeAllRanges(),
          a > n
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == 'function' && r.focus(), r = 0; r < t.length; r++)
      ((e = t[r]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var K0 = $r && 'documentMode' in document && 11 >= document.documentMode,
  xs = null,
  oc = null,
  Ra = null,
  lc = !1;
function mh(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  lc ||
    xs == null ||
    xs !== jo(n) ||
    ((n = xs),
    'selectionStart' in n && Ud(n)
      ? (n = { start: n.selectionStart, end: n.selectionEnd })
      : ((n = (
          (n.ownerDocument && n.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (n = {
          anchorNode: n.anchorNode,
          anchorOffset: n.anchorOffset,
          focusNode: n.focusNode,
          focusOffset: n.focusOffset,
        })),
    (Ra && Ya(Ra, n)) ||
      ((Ra = n),
      (n = Do(oc, 'onSelect')),
      0 < n.length &&
        ((t = new Vd('onSelect', 'select', null, t, r)),
        e.push({ event: t, listeners: n }),
        (t.target = xs))));
}
function $i(e, t) {
  var r = {};
  return (
    (r[e.toLowerCase()] = t.toLowerCase()),
    (r['Webkit' + e] = 'webkit' + t),
    (r['Moz' + e] = 'moz' + t),
    r
  );
}
var ws = {
    animationend: $i('Animation', 'AnimationEnd'),
    animationiteration: $i('Animation', 'AnimationIteration'),
    animationstart: $i('Animation', 'AnimationStart'),
    transitionend: $i('Transition', 'TransitionEnd'),
  },
  tu = {},
  xg = {};
$r &&
  ((xg = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete ws.animationend.animation,
    delete ws.animationiteration.animation,
    delete ws.animationstart.animation),
  'TransitionEvent' in window || delete ws.transitionend.transition);
function Sl(e) {
  if (tu[e]) return tu[e];
  if (!ws[e]) return e;
  var t = ws[e],
    r;
  for (r in t) if (t.hasOwnProperty(r) && r in xg) return (tu[e] = t[r]);
  return e;
}
var wg = Sl('animationend'),
  bg = Sl('animationiteration'),
  _g = Sl('animationstart'),
  kg = Sl('transitionend'),
  Sg = new Map(),
  gh =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' ',
    );
function Tn(e, t) {
  (Sg.set(e, t), is(t, [e]));
}
for (var ru = 0; ru < gh.length; ru++) {
  var nu = gh[ru],
    H0 = nu.toLowerCase(),
    W0 = nu[0].toUpperCase() + nu.slice(1);
  Tn(H0, 'on' + W0);
}
Tn(wg, 'onAnimationEnd');
Tn(bg, 'onAnimationIteration');
Tn(_g, 'onAnimationStart');
Tn('dblclick', 'onDoubleClick');
Tn('focusin', 'onFocus');
Tn('focusout', 'onBlur');
Tn(kg, 'onTransitionEnd');
Fs('onMouseEnter', ['mouseout', 'mouseover']);
Fs('onMouseLeave', ['mouseout', 'mouseover']);
Fs('onPointerEnter', ['pointerout', 'pointerover']);
Fs('onPointerLeave', ['pointerout', 'pointerover']);
is(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(
    ' ',
  ),
);
is(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' ',
  ),
);
is('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
is(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' '),
);
is(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
);
is(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
);
var Na =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' ',
    ),
  q0 = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Na));
function yh(e, t, r) {
  var n = e.type || 'unknown-event';
  ((e.currentTarget = r), Hx(n, t, void 0, e), (e.currentTarget = null));
}
function Ng(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r],
      s = n.event;
    n = n.listeners;
    e: {
      var a = void 0;
      if (t)
        for (var i = n.length - 1; 0 <= i; i--) {
          var o = n[i],
            l = o.instance,
            c = o.currentTarget;
          if (((o = o.listener), l !== a && s.isPropagationStopped())) break e;
          (yh(s, o, c), (a = l));
        }
      else
        for (i = 0; i < n.length; i++) {
          if (
            ((o = n[i]),
            (l = o.instance),
            (c = o.currentTarget),
            (o = o.listener),
            l !== a && s.isPropagationStopped())
          )
            break e;
          (yh(s, o, c), (a = l));
        }
    }
  }
  if (To) throw ((e = nc), (To = !1), (nc = null), e);
}
function Te(e, t) {
  var r = t[hc];
  r === void 0 && (r = t[hc] = new Set());
  var n = e + '__bubble';
  r.has(n) || (Eg(t, e, 2, !1), r.add(n));
}
function su(e, t, r) {
  var n = 0;
  (t && (n |= 4), Eg(r, e, n, t));
}
var Ui = '_reactListening' + Math.random().toString(36).slice(2);
function Ja(e) {
  if (!e[Ui]) {
    ((e[Ui] = !0),
      Rm.forEach(function (r) {
        r !== 'selectionchange' && (q0.has(r) || su(r, !1, e), su(r, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ui] || ((t[Ui] = !0), su('selectionchange', !1, t));
  }
}
function Eg(e, t, r, n) {
  switch (ug(t)) {
    case 1:
      var s = o0;
      break;
    case 4:
      s = l0;
      break;
    default:
      s = Ld;
  }
  ((r = s.bind(null, t, r, e)),
    (s = void 0),
    !rc ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (s = !0),
    n
      ? s !== void 0
        ? e.addEventListener(t, r, { capture: !0, passive: s })
        : e.addEventListener(t, r, !0)
      : s !== void 0
        ? e.addEventListener(t, r, { passive: s })
        : e.addEventListener(t, r, !1));
}
function au(e, t, r, n, s) {
  var a = n;
  if (!(t & 1) && !(t & 2) && n !== null)
    e: for (;;) {
      if (n === null) return;
      var i = n.tag;
      if (i === 3 || i === 4) {
        var o = n.stateNode.containerInfo;
        if (o === s || (o.nodeType === 8 && o.parentNode === s)) break;
        if (i === 4)
          for (i = n.return; i !== null; ) {
            var l = i.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = i.stateNode.containerInfo),
              l === s || (l.nodeType === 8 && l.parentNode === s))
            )
              return;
            i = i.return;
          }
        for (; o !== null; ) {
          if (((i = Un(o)), i === null)) return;
          if (((l = i.tag), l === 5 || l === 6)) {
            n = a = i;
            continue e;
          }
          o = o.parentNode;
        }
      }
      n = n.return;
    }
  Qm(function () {
    var c = a,
      d = Pd(r),
      h = [];
    e: {
      var f = Sg.get(e);
      if (f !== void 0) {
        var y = Vd,
          m = e;
        switch (e) {
          case 'keypress':
            if (uo(r) === 0) break e;
          case 'keydown':
          case 'keyup':
            y = k0;
            break;
          case 'focusin':
            ((m = 'focus'), (y = Jl));
            break;
          case 'focusout':
            ((m = 'blur'), (y = Jl));
            break;
          case 'beforeblur':
          case 'afterblur':
            y = Jl;
            break;
          case 'click':
            if (r.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            y = ah;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            y = d0;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            y = E0;
            break;
          case wg:
          case bg:
          case _g:
            y = p0;
            break;
          case kg:
            y = C0;
            break;
          case 'scroll':
            y = u0;
            break;
          case 'wheel':
            y = A0;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            y = g0;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            y = oh;
        }
        var x = (t & 4) !== 0,
          S = !x && e === 'scroll',
          g = x ? (f !== null ? f + 'Capture' : null) : f;
        x = [];
        for (var p = c, v; p !== null; ) {
          v = p;
          var k = v.stateNode;
          if (
            (v.tag === 5 &&
              k !== null &&
              ((v = k),
              g !== null && ((k = Wa(p, g)), k != null && x.push(Xa(p, k, v)))),
            S)
          )
            break;
          p = p.return;
        }
        0 < x.length &&
          ((f = new y(f, m, null, r, d)), h.push({ event: f, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === 'mouseover' || e === 'pointerover'),
          (y = e === 'mouseout' || e === 'pointerout'),
          f &&
            r !== ec &&
            (m = r.relatedTarget || r.fromElement) &&
            (Un(m) || m[Ur]))
        )
          break e;
        if (
          (y || f) &&
          ((f =
            d.window === d
              ? d
              : (f = d.ownerDocument)
                ? f.defaultView || f.parentWindow
                : window),
          y
            ? ((m = r.relatedTarget || r.toElement),
              (y = c),
              (m = m ? Un(m) : null),
              m !== null &&
                ((S = os(m)), m !== S || (m.tag !== 5 && m.tag !== 6)) &&
                (m = null))
            : ((y = null), (m = c)),
          y !== m)
        ) {
          if (
            ((x = ah),
            (k = 'onMouseLeave'),
            (g = 'onMouseEnter'),
            (p = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((x = oh),
              (k = 'onPointerLeave'),
              (g = 'onPointerEnter'),
              (p = 'pointer')),
            (S = y == null ? f : bs(y)),
            (v = m == null ? f : bs(m)),
            (f = new x(k, p + 'leave', y, r, d)),
            (f.target = S),
            (f.relatedTarget = v),
            (k = null),
            Un(d) === c &&
              ((x = new x(g, p + 'enter', m, r, d)),
              (x.target = v),
              (x.relatedTarget = S),
              (k = x)),
            (S = k),
            y && m)
          )
            t: {
              for (x = y, g = m, p = 0, v = x; v; v = us(v)) p++;
              for (v = 0, k = g; k; k = us(k)) v++;
              for (; 0 < p - v; ) ((x = us(x)), p--);
              for (; 0 < v - p; ) ((g = us(g)), v--);
              for (; p--; ) {
                if (x === g || (g !== null && x === g.alternate)) break t;
                ((x = us(x)), (g = us(g)));
              }
              x = null;
            }
          else x = null;
          (y !== null && vh(h, f, y, x, !1),
            m !== null && S !== null && vh(h, S, m, x, !0));
        }
      }
      e: {
        if (
          ((f = c ? bs(c) : window),
          (y = f.nodeName && f.nodeName.toLowerCase()),
          y === 'select' || (y === 'input' && f.type === 'file'))
        )
          var b = M0;
        else if (ch(f))
          if (mg) b = U0;
          else {
            b = F0;
            var _ = V0;
          }
        else
          (y = f.nodeName) &&
            y.toLowerCase() === 'input' &&
            (f.type === 'checkbox' || f.type === 'radio') &&
            (b = $0);
        if (b && (b = b(e, c))) {
          pg(h, b, r, d);
          break e;
        }
        (_ && _(e, f, c),
          e === 'focusout' &&
            (_ = f._wrapperState) &&
            _.controlled &&
            f.type === 'number' &&
            Qu(f, 'number', f.value));
      }
      switch (((_ = c ? bs(c) : window), e)) {
        case 'focusin':
          (ch(_) || _.contentEditable === 'true') &&
            ((xs = _), (oc = c), (Ra = null));
          break;
        case 'focusout':
          Ra = oc = xs = null;
          break;
        case 'mousedown':
          lc = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ((lc = !1), mh(h, r, d));
          break;
        case 'selectionchange':
          if (K0) break;
        case 'keydown':
        case 'keyup':
          mh(h, r, d);
      }
      var w;
      if ($d)
        e: {
          switch (e) {
            case 'compositionstart':
              var N = 'onCompositionStart';
              break e;
            case 'compositionend':
              N = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              N = 'onCompositionUpdate';
              break e;
          }
          N = void 0;
        }
      else
        vs
          ? fg(e, r) && (N = 'onCompositionEnd')
          : e === 'keydown' && r.keyCode === 229 && (N = 'onCompositionStart');
      (N &&
        (dg &&
          r.locale !== 'ko' &&
          (vs || N !== 'onCompositionStart'
            ? N === 'onCompositionEnd' && vs && (w = cg())
            : ((an = d),
              (Md = 'value' in an ? an.value : an.textContent),
              (vs = !0))),
        (_ = Do(c, N)),
        0 < _.length &&
          ((N = new ih(N, e, null, r, d)),
          h.push({ event: N, listeners: _ }),
          w ? (N.data = w) : ((w = hg(r)), w !== null && (N.data = w)))),
        (w = P0 ? R0(e, r) : D0(e, r)) &&
          ((c = Do(c, 'onBeforeInput')),
          0 < c.length &&
            ((d = new ih('onBeforeInput', 'beforeinput', null, r, d)),
            h.push({ event: d, listeners: c }),
            (d.data = w))));
    }
    Ng(h, t);
  });
}
function Xa(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function Do(e, t) {
  for (var r = t + 'Capture', n = []; e !== null; ) {
    var s = e,
      a = s.stateNode;
    (s.tag === 5 &&
      a !== null &&
      ((s = a),
      (a = Wa(e, r)),
      a != null && n.unshift(Xa(e, a, s)),
      (a = Wa(e, t)),
      a != null && n.push(Xa(e, a, s))),
      (e = e.return));
  }
  return n;
}
function us(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function vh(e, t, r, n, s) {
  for (var a = t._reactName, i = []; r !== null && r !== n; ) {
    var o = r,
      l = o.alternate,
      c = o.stateNode;
    if (l !== null && l === n) break;
    (o.tag === 5 &&
      c !== null &&
      ((o = c),
      s
        ? ((l = Wa(r, a)), l != null && i.unshift(Xa(r, l, o)))
        : s || ((l = Wa(r, a)), l != null && i.push(Xa(r, l, o)))),
      (r = r.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Z0 = /\r\n?/g,
  Q0 = /\u0000|\uFFFD/g;
function xh(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      Z0,
      `
`,
    )
    .replace(Q0, '');
}
function zi(e, t, r) {
  if (((t = xh(t)), xh(e) !== t && r)) throw Error($(425));
}
function Oo() {}
var uc = null,
  cc = null;
function dc(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var fc = typeof setTimeout == 'function' ? setTimeout : void 0,
  G0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  wh = typeof Promise == 'function' ? Promise : void 0,
  Y0 =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof wh < 'u'
        ? function (e) {
            return wh.resolve(null).then(e).catch(J0);
          }
        : fc;
function J0(e) {
  setTimeout(function () {
    throw e;
  });
}
function iu(e, t) {
  var r = t,
    n = 0;
  do {
    var s = r.nextSibling;
    if ((e.removeChild(r), s && s.nodeType === 8))
      if (((r = s.data), r === '/$')) {
        if (n === 0) {
          (e.removeChild(s), Qa(t));
          return;
        }
        n--;
      } else (r !== '$' && r !== '$?' && r !== '$!') || n++;
    r = s;
  } while (r);
  Qa(t);
}
function fn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function bh(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === '$' || r === '$!' || r === '$?') {
        if (t === 0) return e;
        t--;
      } else r === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var ra = Math.random().toString(36).slice(2),
  gr = '__reactFiber$' + ra,
  ei = '__reactProps$' + ra,
  Ur = '__reactContainer$' + ra,
  hc = '__reactEvents$' + ra,
  X0 = '__reactListeners$' + ra,
  ew = '__reactHandles$' + ra;
function Un(e) {
  var t = e[gr];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if ((t = r[Ur] || r[gr])) {
      if (
        ((r = t.alternate),
        t.child !== null || (r !== null && r.child !== null))
      )
        for (e = bh(e); e !== null; ) {
          if ((r = e[gr])) return r;
          e = bh(e);
        }
      return t;
    }
    ((e = r), (r = e.parentNode));
  }
  return null;
}
function Si(e) {
  return (
    (e = e[gr] || e[Ur]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function bs(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error($(33));
}
function Nl(e) {
  return e[ei] || null;
}
var pc = [],
  _s = -1;
function An(e) {
  return { current: e };
}
function Ie(e) {
  0 > _s || ((e.current = pc[_s]), (pc[_s] = null), _s--);
}
function Ce(e, t) {
  (_s++, (pc[_s] = e.current), (e.current = t));
}
var kn = {},
  pt = An(kn),
  At = An(!1),
  Jn = kn;
function $s(e, t) {
  var r = e.type.contextTypes;
  if (!r) return kn;
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
    return n.__reactInternalMemoizedMaskedChildContext;
  var s = {},
    a;
  for (a in r) s[a] = t[a];
  return (
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    s
  );
}
function It(e) {
  return ((e = e.childContextTypes), e != null);
}
function Lo() {
  (Ie(At), Ie(pt));
}
function _h(e, t, r) {
  if (pt.current !== kn) throw Error($(168));
  (Ce(pt, t), Ce(At, r));
}
function jg(e, t, r) {
  var n = e.stateNode;
  if (((t = t.childContextTypes), typeof n.getChildContext != 'function'))
    return r;
  n = n.getChildContext();
  for (var s in n) if (!(s in t)) throw Error($(108, Vx(e) || 'Unknown', s));
  return Fe({}, r, n);
}
function Mo(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || kn),
    (Jn = pt.current),
    Ce(pt, e),
    Ce(At, At.current),
    !0
  );
}
function kh(e, t, r) {
  var n = e.stateNode;
  if (!n) throw Error($(169));
  (r
    ? ((e = jg(e, t, Jn)),
      (n.__reactInternalMemoizedMergedChildContext = e),
      Ie(At),
      Ie(pt),
      Ce(pt, e))
    : Ie(At),
    Ce(At, r));
}
var Ar = null,
  El = !1,
  ou = !1;
function Cg(e) {
  Ar === null ? (Ar = [e]) : Ar.push(e);
}
function tw(e) {
  ((El = !0), Cg(e));
}
function In() {
  if (!ou && Ar !== null) {
    ou = !0;
    var e = 0,
      t = ke;
    try {
      var r = Ar;
      for (ke = 1; e < r.length; e++) {
        var n = r[e];
        do n = n(!0);
        while (n !== null);
      }
      ((Ar = null), (El = !1));
    } catch (s) {
      throw (Ar !== null && (Ar = Ar.slice(e + 1)), Xm(Rd, In), s);
    } finally {
      ((ke = t), (ou = !1));
    }
  }
  return null;
}
var ks = [],
  Ss = 0,
  Vo = null,
  Fo = 0,
  Wt = [],
  qt = 0,
  Xn = null,
  Rr = 1,
  Dr = '';
function Vn(e, t) {
  ((ks[Ss++] = Fo), (ks[Ss++] = Vo), (Vo = e), (Fo = t));
}
function Tg(e, t, r) {
  ((Wt[qt++] = Rr), (Wt[qt++] = Dr), (Wt[qt++] = Xn), (Xn = e));
  var n = Rr;
  e = Dr;
  var s = 32 - ir(n) - 1;
  ((n &= ~(1 << s)), (r += 1));
  var a = 32 - ir(t) + s;
  if (30 < a) {
    var i = s - (s % 5);
    ((a = (n & ((1 << i) - 1)).toString(32)),
      (n >>= i),
      (s -= i),
      (Rr = (1 << (32 - ir(t) + s)) | (r << s) | n),
      (Dr = a + e));
  } else ((Rr = (1 << a) | (r << s) | n), (Dr = e));
}
function zd(e) {
  e.return !== null && (Vn(e, 1), Tg(e, 1, 0));
}
function Bd(e) {
  for (; e === Vo; )
    ((Vo = ks[--Ss]), (ks[Ss] = null), (Fo = ks[--Ss]), (ks[Ss] = null));
  for (; e === Xn; )
    ((Xn = Wt[--qt]),
      (Wt[qt] = null),
      (Dr = Wt[--qt]),
      (Wt[qt] = null),
      (Rr = Wt[--qt]),
      (Wt[qt] = null));
}
var Vt = null,
  Mt = null,
  Oe = !1,
  sr = null;
function Ag(e, t) {
  var r = Qt(5, null, null, 0);
  ((r.elementType = 'DELETED'),
    (r.stateNode = t),
    (r.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r));
}
function Sh(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return (
        (t =
          t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Vt = e), (Mt = fn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Vt = e), (Mt = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((r = Xn !== null ? { id: Rr, overflow: Dr } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: r,
              retryLane: 1073741824,
            }),
            (r = Qt(18, null, null, 0)),
            (r.stateNode = t),
            (r.return = e),
            (e.child = r),
            (Vt = e),
            (Mt = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function mc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function gc(e) {
  if (Oe) {
    var t = Mt;
    if (t) {
      var r = t;
      if (!Sh(e, t)) {
        if (mc(e)) throw Error($(418));
        t = fn(r.nextSibling);
        var n = Vt;
        t && Sh(e, t)
          ? Ag(n, r)
          : ((e.flags = (e.flags & -4097) | 2), (Oe = !1), (Vt = e));
      }
    } else {
      if (mc(e)) throw Error($(418));
      ((e.flags = (e.flags & -4097) | 2), (Oe = !1), (Vt = e));
    }
  }
}
function Nh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Vt = e;
}
function Bi(e) {
  if (e !== Vt) return !1;
  if (!Oe) return (Nh(e), (Oe = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !dc(e.type, e.memoizedProps))),
    t && (t = Mt))
  ) {
    if (mc(e)) throw (Ig(), Error($(418)));
    for (; t; ) (Ag(e, t), (t = fn(t.nextSibling)));
  }
  if ((Nh(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error($(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === '/$') {
            if (t === 0) {
              Mt = fn(e.nextSibling);
              break e;
            }
            t--;
          } else (r !== '$' && r !== '$!' && r !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      Mt = null;
    }
  } else Mt = Vt ? fn(e.stateNode.nextSibling) : null;
  return !0;
}
function Ig() {
  for (var e = Mt; e; ) e = fn(e.nextSibling);
}
function Us() {
  ((Mt = Vt = null), (Oe = !1));
}
function Kd(e) {
  sr === null ? (sr = [e]) : sr.push(e);
}
var rw = Hr.ReactCurrentBatchConfig;
function ma(e, t, r) {
  if (
    ((e = r.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (r._owner) {
      if (((r = r._owner), r)) {
        if (r.tag !== 1) throw Error($(309));
        var n = r.stateNode;
      }
      if (!n) throw Error($(147, e));
      var s = n,
        a = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === a
        ? t.ref
        : ((t = function (i) {
            var o = s.refs;
            i === null ? delete o[a] : (o[a] = i);
          }),
          (t._stringRef = a),
          t);
    }
    if (typeof e != 'string') throw Error($(284));
    if (!r._owner) throw Error($(290, e));
  }
  return e;
}
function Ki(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      $(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e,
      ),
    )
  );
}
function Eh(e) {
  var t = e._init;
  return t(e._payload);
}
function Pg(e) {
  function t(g, p) {
    if (e) {
      var v = g.deletions;
      v === null ? ((g.deletions = [p]), (g.flags |= 16)) : v.push(p);
    }
  }
  function r(g, p) {
    if (!e) return null;
    for (; p !== null; ) (t(g, p), (p = p.sibling));
    return null;
  }
  function n(g, p) {
    for (g = new Map(); p !== null; )
      (p.key !== null ? g.set(p.key, p) : g.set(p.index, p), (p = p.sibling));
    return g;
  }
  function s(g, p) {
    return ((g = gn(g, p)), (g.index = 0), (g.sibling = null), g);
  }
  function a(g, p, v) {
    return (
      (g.index = v),
      e
        ? ((v = g.alternate),
          v !== null
            ? ((v = v.index), v < p ? ((g.flags |= 2), p) : v)
            : ((g.flags |= 2), p))
        : ((g.flags |= 1048576), p)
    );
  }
  function i(g) {
    return (e && g.alternate === null && (g.flags |= 2), g);
  }
  function o(g, p, v, k) {
    return p === null || p.tag !== 6
      ? ((p = pu(v, g.mode, k)), (p.return = g), p)
      : ((p = s(p, v)), (p.return = g), p);
  }
  function l(g, p, v, k) {
    var b = v.type;
    return b === ys
      ? d(g, p, v.props.children, k, v.key)
      : p !== null &&
          (p.elementType === b ||
            (typeof b == 'object' &&
              b !== null &&
              b.$$typeof === Yr &&
              Eh(b) === p.type))
        ? ((k = s(p, v.props)), (k.ref = ma(g, p, v)), (k.return = g), k)
        : ((k = yo(v.type, v.key, v.props, null, g.mode, k)),
          (k.ref = ma(g, p, v)),
          (k.return = g),
          k);
  }
  function c(g, p, v, k) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== v.containerInfo ||
      p.stateNode.implementation !== v.implementation
      ? ((p = mu(v, g.mode, k)), (p.return = g), p)
      : ((p = s(p, v.children || [])), (p.return = g), p);
  }
  function d(g, p, v, k, b) {
    return p === null || p.tag !== 7
      ? ((p = qn(v, g.mode, k, b)), (p.return = g), p)
      : ((p = s(p, v)), (p.return = g), p);
  }
  function h(g, p, v) {
    if ((typeof p == 'string' && p !== '') || typeof p == 'number')
      return ((p = pu('' + p, g.mode, v)), (p.return = g), p);
    if (typeof p == 'object' && p !== null) {
      switch (p.$$typeof) {
        case Ri:
          return (
            (v = yo(p.type, p.key, p.props, null, g.mode, v)),
            (v.ref = ma(g, null, p)),
            (v.return = g),
            v
          );
        case gs:
          return ((p = mu(p, g.mode, v)), (p.return = g), p);
        case Yr:
          var k = p._init;
          return h(g, k(p._payload), v);
      }
      if (ka(p) || ca(p))
        return ((p = qn(p, g.mode, v, null)), (p.return = g), p);
      Ki(g, p);
    }
    return null;
  }
  function f(g, p, v, k) {
    var b = p !== null ? p.key : null;
    if ((typeof v == 'string' && v !== '') || typeof v == 'number')
      return b !== null ? null : o(g, p, '' + v, k);
    if (typeof v == 'object' && v !== null) {
      switch (v.$$typeof) {
        case Ri:
          return v.key === b ? l(g, p, v, k) : null;
        case gs:
          return v.key === b ? c(g, p, v, k) : null;
        case Yr:
          return ((b = v._init), f(g, p, b(v._payload), k));
      }
      if (ka(v) || ca(v)) return b !== null ? null : d(g, p, v, k, null);
      Ki(g, v);
    }
    return null;
  }
  function y(g, p, v, k, b) {
    if ((typeof k == 'string' && k !== '') || typeof k == 'number')
      return ((g = g.get(v) || null), o(p, g, '' + k, b));
    if (typeof k == 'object' && k !== null) {
      switch (k.$$typeof) {
        case Ri:
          return (
            (g = g.get(k.key === null ? v : k.key) || null),
            l(p, g, k, b)
          );
        case gs:
          return (
            (g = g.get(k.key === null ? v : k.key) || null),
            c(p, g, k, b)
          );
        case Yr:
          var _ = k._init;
          return y(g, p, v, _(k._payload), b);
      }
      if (ka(k) || ca(k)) return ((g = g.get(v) || null), d(p, g, k, b, null));
      Ki(p, k);
    }
    return null;
  }
  function m(g, p, v, k) {
    for (
      var b = null, _ = null, w = p, N = (p = 0), j = null;
      w !== null && N < v.length;
      N++
    ) {
      w.index > N ? ((j = w), (w = null)) : (j = w.sibling);
      var T = f(g, w, v[N], k);
      if (T === null) {
        w === null && (w = j);
        break;
      }
      (e && w && T.alternate === null && t(g, w),
        (p = a(T, p, N)),
        _ === null ? (b = T) : (_.sibling = T),
        (_ = T),
        (w = j));
    }
    if (N === v.length) return (r(g, w), Oe && Vn(g, N), b);
    if (w === null) {
      for (; N < v.length; N++)
        ((w = h(g, v[N], k)),
          w !== null &&
            ((p = a(w, p, N)),
            _ === null ? (b = w) : (_.sibling = w),
            (_ = w)));
      return (Oe && Vn(g, N), b);
    }
    for (w = n(g, w); N < v.length; N++)
      ((j = y(w, g, N, v[N], k)),
        j !== null &&
          (e && j.alternate !== null && w.delete(j.key === null ? N : j.key),
          (p = a(j, p, N)),
          _ === null ? (b = j) : (_.sibling = j),
          (_ = j)));
    return (
      e &&
        w.forEach(function (D) {
          return t(g, D);
        }),
      Oe && Vn(g, N),
      b
    );
  }
  function x(g, p, v, k) {
    var b = ca(v);
    if (typeof b != 'function') throw Error($(150));
    if (((v = b.call(v)), v == null)) throw Error($(151));
    for (
      var _ = (b = null), w = p, N = (p = 0), j = null, T = v.next();
      w !== null && !T.done;
      N++, T = v.next()
    ) {
      w.index > N ? ((j = w), (w = null)) : (j = w.sibling);
      var D = f(g, w, T.value, k);
      if (D === null) {
        w === null && (w = j);
        break;
      }
      (e && w && D.alternate === null && t(g, w),
        (p = a(D, p, N)),
        _ === null ? (b = D) : (_.sibling = D),
        (_ = D),
        (w = j));
    }
    if (T.done) return (r(g, w), Oe && Vn(g, N), b);
    if (w === null) {
      for (; !T.done; N++, T = v.next())
        ((T = h(g, T.value, k)),
          T !== null &&
            ((p = a(T, p, N)),
            _ === null ? (b = T) : (_.sibling = T),
            (_ = T)));
      return (Oe && Vn(g, N), b);
    }
    for (w = n(g, w); !T.done; N++, T = v.next())
      ((T = y(w, g, N, T.value, k)),
        T !== null &&
          (e && T.alternate !== null && w.delete(T.key === null ? N : T.key),
          (p = a(T, p, N)),
          _ === null ? (b = T) : (_.sibling = T),
          (_ = T)));
    return (
      e &&
        w.forEach(function (V) {
          return t(g, V);
        }),
      Oe && Vn(g, N),
      b
    );
  }
  function S(g, p, v, k) {
    if (
      (typeof v == 'object' &&
        v !== null &&
        v.type === ys &&
        v.key === null &&
        (v = v.props.children),
      typeof v == 'object' && v !== null)
    ) {
      switch (v.$$typeof) {
        case Ri:
          e: {
            for (var b = v.key, _ = p; _ !== null; ) {
              if (_.key === b) {
                if (((b = v.type), b === ys)) {
                  if (_.tag === 7) {
                    (r(g, _.sibling),
                      (p = s(_, v.props.children)),
                      (p.return = g),
                      (g = p));
                    break e;
                  }
                } else if (
                  _.elementType === b ||
                  (typeof b == 'object' &&
                    b !== null &&
                    b.$$typeof === Yr &&
                    Eh(b) === _.type)
                ) {
                  (r(g, _.sibling),
                    (p = s(_, v.props)),
                    (p.ref = ma(g, _, v)),
                    (p.return = g),
                    (g = p));
                  break e;
                }
                r(g, _);
                break;
              } else t(g, _);
              _ = _.sibling;
            }
            v.type === ys
              ? ((p = qn(v.props.children, g.mode, k, v.key)),
                (p.return = g),
                (g = p))
              : ((k = yo(v.type, v.key, v.props, null, g.mode, k)),
                (k.ref = ma(g, p, v)),
                (k.return = g),
                (g = k));
          }
          return i(g);
        case gs:
          e: {
            for (_ = v.key; p !== null; ) {
              if (p.key === _)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === v.containerInfo &&
                  p.stateNode.implementation === v.implementation
                ) {
                  (r(g, p.sibling),
                    (p = s(p, v.children || [])),
                    (p.return = g),
                    (g = p));
                  break e;
                } else {
                  r(g, p);
                  break;
                }
              else t(g, p);
              p = p.sibling;
            }
            ((p = mu(v, g.mode, k)), (p.return = g), (g = p));
          }
          return i(g);
        case Yr:
          return ((_ = v._init), S(g, p, _(v._payload), k));
      }
      if (ka(v)) return m(g, p, v, k);
      if (ca(v)) return x(g, p, v, k);
      Ki(g, v);
    }
    return (typeof v == 'string' && v !== '') || typeof v == 'number'
      ? ((v = '' + v),
        p !== null && p.tag === 6
          ? (r(g, p.sibling), (p = s(p, v)), (p.return = g), (g = p))
          : (r(g, p), (p = pu(v, g.mode, k)), (p.return = g), (g = p)),
        i(g))
      : r(g, p);
  }
  return S;
}
var zs = Pg(!0),
  Rg = Pg(!1),
  $o = An(null),
  Uo = null,
  Ns = null,
  Hd = null;
function Wd() {
  Hd = Ns = Uo = null;
}
function qd(e) {
  var t = $o.current;
  (Ie($o), (e._currentValue = t));
}
function yc(e, t, r) {
  for (; e !== null; ) {
    var n = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
        : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
      e === r)
    )
      break;
    e = e.return;
  }
}
function Rs(e, t) {
  ((Uo = e),
    (Hd = Ns = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ct = !0), (e.firstContext = null)));
}
function Jt(e) {
  var t = e._currentValue;
  if (Hd !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Ns === null)) {
      if (Uo === null) throw Error($(308));
      ((Ns = e), (Uo.dependencies = { lanes: 0, firstContext: e }));
    } else Ns = Ns.next = e;
  return t;
}
var zn = null;
function Zd(e) {
  zn === null ? (zn = [e]) : zn.push(e);
}
function Dg(e, t, r, n) {
  var s = t.interleaved;
  return (
    s === null ? ((r.next = r), Zd(t)) : ((r.next = s.next), (s.next = r)),
    (t.interleaved = r),
    zr(e, n)
  );
}
function zr(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (r = e.alternate),
      r !== null && (r.childLanes |= t),
      (r = e),
      (e = e.return));
  return r.tag === 3 ? r.stateNode : null;
}
var Jr = !1;
function Qd(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Og(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Lr(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function hn(e, t, r) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (((n = n.shared), ve & 2)) {
    var s = n.pending;
    return (
      s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
      (n.pending = t),
      zr(e, r)
    );
  }
  return (
    (s = n.interleaved),
    s === null ? ((t.next = t), Zd(n)) : ((t.next = s.next), (s.next = t)),
    (n.interleaved = t),
    zr(e, r)
  );
}
function co(e, t, r) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
  ) {
    var n = t.lanes;
    ((n &= e.pendingLanes), (r |= n), (t.lanes = r), Dd(e, r));
  }
}
function jh(e, t) {
  var r = e.updateQueue,
    n = e.alternate;
  if (n !== null && ((n = n.updateQueue), r === n)) {
    var s = null,
      a = null;
    if (((r = r.firstBaseUpdate), r !== null)) {
      do {
        var i = {
          eventTime: r.eventTime,
          lane: r.lane,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null,
        };
        (a === null ? (s = a = i) : (a = a.next = i), (r = r.next));
      } while (r !== null);
      a === null ? (s = a = t) : (a = a.next = t);
    } else s = a = t;
    ((r = {
      baseState: n.baseState,
      firstBaseUpdate: s,
      lastBaseUpdate: a,
      shared: n.shared,
      effects: n.effects,
    }),
      (e.updateQueue = r));
    return;
  }
  ((e = r.lastBaseUpdate),
    e === null ? (r.firstBaseUpdate = t) : (e.next = t),
    (r.lastBaseUpdate = t));
}
function zo(e, t, r, n) {
  var s = e.updateQueue;
  Jr = !1;
  var a = s.firstBaseUpdate,
    i = s.lastBaseUpdate,
    o = s.shared.pending;
  if (o !== null) {
    s.shared.pending = null;
    var l = o,
      c = l.next;
    ((l.next = null), i === null ? (a = c) : (i.next = c), (i = l));
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (o = d.lastBaseUpdate),
      o !== i &&
        (o === null ? (d.firstBaseUpdate = c) : (o.next = c),
        (d.lastBaseUpdate = l)));
  }
  if (a !== null) {
    var h = s.baseState;
    ((i = 0), (d = c = l = null), (o = a));
    do {
      var f = o.lane,
        y = o.eventTime;
      if ((n & f) === f) {
        d !== null &&
          (d = d.next =
            {
              eventTime: y,
              lane: 0,
              tag: o.tag,
              payload: o.payload,
              callback: o.callback,
              next: null,
            });
        e: {
          var m = e,
            x = o;
          switch (((f = t), (y = r), x.tag)) {
            case 1:
              if (((m = x.payload), typeof m == 'function')) {
                h = m.call(y, h, f);
                break e;
              }
              h = m;
              break e;
            case 3:
              m.flags = (m.flags & -65537) | 128;
            case 0:
              if (
                ((m = x.payload),
                (f = typeof m == 'function' ? m.call(y, h, f) : m),
                f == null)
              )
                break e;
              h = Fe({}, h, f);
              break e;
            case 2:
              Jr = !0;
          }
        }
        o.callback !== null &&
          o.lane !== 0 &&
          ((e.flags |= 64),
          (f = s.effects),
          f === null ? (s.effects = [o]) : f.push(o));
      } else
        ((y = {
          eventTime: y,
          lane: f,
          tag: o.tag,
          payload: o.payload,
          callback: o.callback,
          next: null,
        }),
          d === null ? ((c = d = y), (l = h)) : (d = d.next = y),
          (i |= f));
      if (((o = o.next), o === null)) {
        if (((o = s.shared.pending), o === null)) break;
        ((f = o),
          (o = f.next),
          (f.next = null),
          (s.lastBaseUpdate = f),
          (s.shared.pending = null));
      }
    } while (!0);
    if (
      (d === null && (l = h),
      (s.baseState = l),
      (s.firstBaseUpdate = c),
      (s.lastBaseUpdate = d),
      (t = s.shared.interleaved),
      t !== null)
    ) {
      s = t;
      do ((i |= s.lane), (s = s.next));
      while (s !== t);
    } else a === null && (s.shared.lanes = 0);
    ((ts |= i), (e.lanes = i), (e.memoizedState = h));
  }
}
function Ch(e, t, r) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var n = e[t],
        s = n.callback;
      if (s !== null) {
        if (((n.callback = null), (n = r), typeof s != 'function'))
          throw Error($(191, s));
        s.call(n);
      }
    }
}
var Ni = {},
  br = An(Ni),
  ti = An(Ni),
  ri = An(Ni);
function Bn(e) {
  if (e === Ni) throw Error($(174));
  return e;
}
function Gd(e, t) {
  switch ((Ce(ri, t), Ce(ti, e), Ce(br, Ni), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Yu(null, '');
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Yu(t, e)));
  }
  (Ie(br), Ce(br, t));
}
function Bs() {
  (Ie(br), Ie(ti), Ie(ri));
}
function Lg(e) {
  Bn(ri.current);
  var t = Bn(br.current),
    r = Yu(t, e.type);
  t !== r && (Ce(ti, e), Ce(br, r));
}
function Yd(e) {
  ti.current === e && (Ie(br), Ie(ti));
}
var Le = An(0);
function Bo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (
        r !== null &&
        ((r = r.dehydrated), r === null || r.data === '$?' || r.data === '$!')
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var lu = [];
function Jd() {
  for (var e = 0; e < lu.length; e++)
    lu[e]._workInProgressVersionPrimary = null;
  lu.length = 0;
}
var fo = Hr.ReactCurrentDispatcher,
  uu = Hr.ReactCurrentBatchConfig,
  es = 0,
  Ve = null,
  Ge = null,
  et = null,
  Ko = !1,
  Da = !1,
  ni = 0,
  nw = 0;
function ut() {
  throw Error($(321));
}
function Xd(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++)
    if (!cr(e[r], t[r])) return !1;
  return !0;
}
function ef(e, t, r, n, s, a) {
  if (
    ((es = a),
    (Ve = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (fo.current = e === null || e.memoizedState === null ? ow : lw),
    (e = r(n, s)),
    Da)
  ) {
    a = 0;
    do {
      if (((Da = !1), (ni = 0), 25 <= a)) throw Error($(301));
      ((a += 1),
        (et = Ge = null),
        (t.updateQueue = null),
        (fo.current = uw),
        (e = r(n, s)));
    } while (Da);
  }
  if (
    ((fo.current = Ho),
    (t = Ge !== null && Ge.next !== null),
    (es = 0),
    (et = Ge = Ve = null),
    (Ko = !1),
    t)
  )
    throw Error($(300));
  return e;
}
function tf() {
  var e = ni !== 0;
  return ((ni = 0), e);
}
function hr() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (et === null ? (Ve.memoizedState = et = e) : (et = et.next = e), et);
}
function Xt() {
  if (Ge === null) {
    var e = Ve.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ge.next;
  var t = et === null ? Ve.memoizedState : et.next;
  if (t !== null) ((et = t), (Ge = e));
  else {
    if (e === null) throw Error($(310));
    ((Ge = e),
      (e = {
        memoizedState: Ge.memoizedState,
        baseState: Ge.baseState,
        baseQueue: Ge.baseQueue,
        queue: Ge.queue,
        next: null,
      }),
      et === null ? (Ve.memoizedState = et = e) : (et = et.next = e));
  }
  return et;
}
function si(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function cu(e) {
  var t = Xt(),
    r = t.queue;
  if (r === null) throw Error($(311));
  r.lastRenderedReducer = e;
  var n = Ge,
    s = n.baseQueue,
    a = r.pending;
  if (a !== null) {
    if (s !== null) {
      var i = s.next;
      ((s.next = a.next), (a.next = i));
    }
    ((n.baseQueue = s = a), (r.pending = null));
  }
  if (s !== null) {
    ((a = s.next), (n = n.baseState));
    var o = (i = null),
      l = null,
      c = a;
    do {
      var d = c.lane;
      if ((es & d) === d)
        (l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (n = c.hasEagerState ? c.eagerState : e(n, c.action)));
      else {
        var h = {
          lane: d,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (l === null ? ((o = l = h), (i = n)) : (l = l.next = h),
          (Ve.lanes |= d),
          (ts |= d));
      }
      c = c.next;
    } while (c !== null && c !== a);
    (l === null ? (i = n) : (l.next = o),
      cr(n, t.memoizedState) || (Ct = !0),
      (t.memoizedState = n),
      (t.baseState = i),
      (t.baseQueue = l),
      (r.lastRenderedState = n));
  }
  if (((e = r.interleaved), e !== null)) {
    s = e;
    do ((a = s.lane), (Ve.lanes |= a), (ts |= a), (s = s.next));
    while (s !== e);
  } else s === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function du(e) {
  var t = Xt(),
    r = t.queue;
  if (r === null) throw Error($(311));
  r.lastRenderedReducer = e;
  var n = r.dispatch,
    s = r.pending,
    a = t.memoizedState;
  if (s !== null) {
    r.pending = null;
    var i = (s = s.next);
    do ((a = e(a, i.action)), (i = i.next));
    while (i !== s);
    (cr(a, t.memoizedState) || (Ct = !0),
      (t.memoizedState = a),
      t.baseQueue === null && (t.baseState = a),
      (r.lastRenderedState = a));
  }
  return [a, n];
}
function Mg() {}
function Vg(e, t) {
  var r = Ve,
    n = Xt(),
    s = t(),
    a = !cr(n.memoizedState, s);
  if (
    (a && ((n.memoizedState = s), (Ct = !0)),
    (n = n.queue),
    rf(Ug.bind(null, r, n, e), [e]),
    n.getSnapshot !== t || a || (et !== null && et.memoizedState.tag & 1))
  ) {
    if (
      ((r.flags |= 2048),
      ai(9, $g.bind(null, r, n, s, t), void 0, null),
      tt === null)
    )
      throw Error($(349));
    es & 30 || Fg(r, t, s);
  }
  return s;
}
function Fg(e, t, r) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: r }),
    (t = Ve.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ve.updateQueue = t),
        (t.stores = [e]))
      : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e)));
}
function $g(e, t, r, n) {
  ((t.value = r), (t.getSnapshot = n), zg(t) && Bg(e));
}
function Ug(e, t, r) {
  return r(function () {
    zg(t) && Bg(e);
  });
}
function zg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !cr(e, r);
  } catch {
    return !0;
  }
}
function Bg(e) {
  var t = zr(e, 1);
  t !== null && or(t, e, 1, -1);
}
function Th(e) {
  var t = hr();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: si,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = iw.bind(null, Ve, e)),
    [t.memoizedState, e]
  );
}
function ai(e, t, r, n) {
  return (
    (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
    (t = Ve.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ve.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((r = t.lastEffect),
        r === null
          ? (t.lastEffect = e.next = e)
          : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e))),
    e
  );
}
function Kg() {
  return Xt().memoizedState;
}
function ho(e, t, r, n) {
  var s = hr();
  ((Ve.flags |= e),
    (s.memoizedState = ai(1 | t, r, void 0, n === void 0 ? null : n)));
}
function jl(e, t, r, n) {
  var s = Xt();
  n = n === void 0 ? null : n;
  var a = void 0;
  if (Ge !== null) {
    var i = Ge.memoizedState;
    if (((a = i.destroy), n !== null && Xd(n, i.deps))) {
      s.memoizedState = ai(t, r, a, n);
      return;
    }
  }
  ((Ve.flags |= e), (s.memoizedState = ai(1 | t, r, a, n)));
}
function Ah(e, t) {
  return ho(8390656, 8, e, t);
}
function rf(e, t) {
  return jl(2048, 8, e, t);
}
function Hg(e, t) {
  return jl(4, 2, e, t);
}
function Wg(e, t) {
  return jl(4, 4, e, t);
}
function qg(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Zg(e, t, r) {
  return (
    (r = r != null ? r.concat([e]) : null),
    jl(4, 4, qg.bind(null, t, e), r)
  );
}
function nf() {}
function Qg(e, t) {
  var r = Xt();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && Xd(t, n[1])
    ? n[0]
    : ((r.memoizedState = [e, t]), e);
}
function Gg(e, t) {
  var r = Xt();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && Xd(t, n[1])
    ? n[0]
    : ((e = e()), (r.memoizedState = [e, t]), e);
}
function Yg(e, t, r) {
  return es & 21
    ? (cr(r, t) || ((r = rg()), (Ve.lanes |= r), (ts |= r), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ct = !0)), (e.memoizedState = r));
}
function sw(e, t) {
  var r = ke;
  ((ke = r !== 0 && 4 > r ? r : 4), e(!0));
  var n = uu.transition;
  uu.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((ke = r), (uu.transition = n));
  }
}
function Jg() {
  return Xt().memoizedState;
}
function aw(e, t, r) {
  var n = mn(e);
  if (
    ((r = {
      lane: n,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Xg(e))
  )
    ey(t, r);
  else if (((r = Dg(e, t, r, n)), r !== null)) {
    var s = bt();
    (or(r, e, n, s), ty(r, t, n));
  }
}
function iw(e, t, r) {
  var n = mn(e),
    s = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (Xg(e)) ey(t, s);
  else {
    var a = e.alternate;
    if (
      e.lanes === 0 &&
      (a === null || a.lanes === 0) &&
      ((a = t.lastRenderedReducer), a !== null)
    )
      try {
        var i = t.lastRenderedState,
          o = a(i, r);
        if (((s.hasEagerState = !0), (s.eagerState = o), cr(o, i))) {
          var l = t.interleaved;
          (l === null
            ? ((s.next = s), Zd(t))
            : ((s.next = l.next), (l.next = s)),
            (t.interleaved = s));
          return;
        }
      } catch {
      } finally {
      }
    ((r = Dg(e, t, s, n)),
      r !== null && ((s = bt()), or(r, e, n, s), ty(r, t, n)));
  }
}
function Xg(e) {
  var t = e.alternate;
  return e === Ve || (t !== null && t === Ve);
}
function ey(e, t) {
  Da = Ko = !0;
  var r = e.pending;
  (r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
    (e.pending = t));
}
function ty(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    ((n &= e.pendingLanes), (r |= n), (t.lanes = r), Dd(e, r));
  }
}
var Ho = {
    readContext: Jt,
    useCallback: ut,
    useContext: ut,
    useEffect: ut,
    useImperativeHandle: ut,
    useInsertionEffect: ut,
    useLayoutEffect: ut,
    useMemo: ut,
    useReducer: ut,
    useRef: ut,
    useState: ut,
    useDebugValue: ut,
    useDeferredValue: ut,
    useTransition: ut,
    useMutableSource: ut,
    useSyncExternalStore: ut,
    useId: ut,
    unstable_isNewReconciler: !1,
  },
  ow = {
    readContext: Jt,
    useCallback: function (e, t) {
      return ((hr().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Jt,
    useEffect: Ah,
    useImperativeHandle: function (e, t, r) {
      return (
        (r = r != null ? r.concat([e]) : null),
        ho(4194308, 4, qg.bind(null, t, e), r)
      );
    },
    useLayoutEffect: function (e, t) {
      return ho(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ho(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var r = hr();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (r.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, r) {
      var n = hr();
      return (
        (t = r !== void 0 ? r(t) : t),
        (n.memoizedState = n.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (n.queue = e),
        (e = e.dispatch = aw.bind(null, Ve, e)),
        [n.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = hr();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Th,
    useDebugValue: nf,
    useDeferredValue: function (e) {
      return (hr().memoizedState = e);
    },
    useTransition: function () {
      var e = Th(!1),
        t = e[0];
      return ((e = sw.bind(null, e[1])), (hr().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, r) {
      var n = Ve,
        s = hr();
      if (Oe) {
        if (r === void 0) throw Error($(407));
        r = r();
      } else {
        if (((r = t()), tt === null)) throw Error($(349));
        es & 30 || Fg(n, t, r);
      }
      s.memoizedState = r;
      var a = { value: r, getSnapshot: t };
      return (
        (s.queue = a),
        Ah(Ug.bind(null, n, a, e), [e]),
        (n.flags |= 2048),
        ai(9, $g.bind(null, n, a, r, t), void 0, null),
        r
      );
    },
    useId: function () {
      var e = hr(),
        t = tt.identifierPrefix;
      if (Oe) {
        var r = Dr,
          n = Rr;
        ((r = (n & ~(1 << (32 - ir(n) - 1))).toString(32) + r),
          (t = ':' + t + 'R' + r),
          (r = ni++),
          0 < r && (t += 'H' + r.toString(32)),
          (t += ':'));
      } else ((r = nw++), (t = ':' + t + 'r' + r.toString(32) + ':'));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  lw = {
    readContext: Jt,
    useCallback: Qg,
    useContext: Jt,
    useEffect: rf,
    useImperativeHandle: Zg,
    useInsertionEffect: Hg,
    useLayoutEffect: Wg,
    useMemo: Gg,
    useReducer: cu,
    useRef: Kg,
    useState: function () {
      return cu(si);
    },
    useDebugValue: nf,
    useDeferredValue: function (e) {
      var t = Xt();
      return Yg(t, Ge.memoizedState, e);
    },
    useTransition: function () {
      var e = cu(si)[0],
        t = Xt().memoizedState;
      return [e, t];
    },
    useMutableSource: Mg,
    useSyncExternalStore: Vg,
    useId: Jg,
    unstable_isNewReconciler: !1,
  },
  uw = {
    readContext: Jt,
    useCallback: Qg,
    useContext: Jt,
    useEffect: rf,
    useImperativeHandle: Zg,
    useInsertionEffect: Hg,
    useLayoutEffect: Wg,
    useMemo: Gg,
    useReducer: du,
    useRef: Kg,
    useState: function () {
      return du(si);
    },
    useDebugValue: nf,
    useDeferredValue: function (e) {
      var t = Xt();
      return Ge === null ? (t.memoizedState = e) : Yg(t, Ge.memoizedState, e);
    },
    useTransition: function () {
      var e = du(si)[0],
        t = Xt().memoizedState;
      return [e, t];
    },
    useMutableSource: Mg,
    useSyncExternalStore: Vg,
    useId: Jg,
    unstable_isNewReconciler: !1,
  };
function rr(e, t) {
  if (e && e.defaultProps) {
    ((t = Fe({}, t)), (e = e.defaultProps));
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function vc(e, t, r, n) {
  ((t = e.memoizedState),
    (r = r(n, t)),
    (r = r == null ? t : Fe({}, t, r)),
    (e.memoizedState = r),
    e.lanes === 0 && (e.updateQueue.baseState = r));
}
var Cl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? os(e) === e : !1;
  },
  enqueueSetState: function (e, t, r) {
    e = e._reactInternals;
    var n = bt(),
      s = mn(e),
      a = Lr(n, s);
    ((a.payload = t),
      r != null && (a.callback = r),
      (t = hn(e, a, s)),
      t !== null && (or(t, e, s, n), co(t, e, s)));
  },
  enqueueReplaceState: function (e, t, r) {
    e = e._reactInternals;
    var n = bt(),
      s = mn(e),
      a = Lr(n, s);
    ((a.tag = 1),
      (a.payload = t),
      r != null && (a.callback = r),
      (t = hn(e, a, s)),
      t !== null && (or(t, e, s, n), co(t, e, s)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var r = bt(),
      n = mn(e),
      s = Lr(r, n);
    ((s.tag = 2),
      t != null && (s.callback = t),
      (t = hn(e, s, n)),
      t !== null && (or(t, e, n, r), co(t, e, n)));
  },
};
function Ih(e, t, r, n, s, a, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(n, a, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Ya(r, n) || !Ya(s, a)
        : !0
  );
}
function ry(e, t, r) {
  var n = !1,
    s = kn,
    a = t.contextType;
  return (
    typeof a == 'object' && a !== null
      ? (a = Jt(a))
      : ((s = It(t) ? Jn : pt.current),
        (n = t.contextTypes),
        (a = (n = n != null) ? $s(e, s) : kn)),
    (t = new t(r, a)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Cl),
    (e.stateNode = t),
    (t._reactInternals = e),
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = s),
      (e.__reactInternalMemoizedMaskedChildContext = a)),
    t
  );
}
function Ph(e, t, r, n) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(r, n),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(r, n),
    t.state !== e && Cl.enqueueReplaceState(t, t.state, null));
}
function xc(e, t, r, n) {
  var s = e.stateNode;
  ((s.props = r), (s.state = e.memoizedState), (s.refs = {}), Qd(e));
  var a = t.contextType;
  (typeof a == 'object' && a !== null
    ? (s.context = Jt(a))
    : ((a = It(t) ? Jn : pt.current), (s.context = $s(e, a))),
    (s.state = e.memoizedState),
    (a = t.getDerivedStateFromProps),
    typeof a == 'function' && (vc(e, t, a, r), (s.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof s.getSnapshotBeforeUpdate == 'function' ||
      (typeof s.UNSAFE_componentWillMount != 'function' &&
        typeof s.componentWillMount != 'function') ||
      ((t = s.state),
      typeof s.componentWillMount == 'function' && s.componentWillMount(),
      typeof s.UNSAFE_componentWillMount == 'function' &&
        s.UNSAFE_componentWillMount(),
      t !== s.state && Cl.enqueueReplaceState(s, s.state, null),
      zo(e, r, s, n),
      (s.state = e.memoizedState)),
    typeof s.componentDidMount == 'function' && (e.flags |= 4194308));
}
function Ks(e, t) {
  try {
    var r = '',
      n = t;
    do ((r += Mx(n)), (n = n.return));
    while (n);
    var s = r;
  } catch (a) {
    s =
      `
Error generating stack: ` +
      a.message +
      `
` +
      a.stack;
  }
  return { value: e, source: t, stack: s, digest: null };
}
function fu(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function wc(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
var cw = typeof WeakMap == 'function' ? WeakMap : Map;
function ny(e, t, r) {
  ((r = Lr(-1, r)), (r.tag = 3), (r.payload = { element: null }));
  var n = t.value;
  return (
    (r.callback = function () {
      (qo || ((qo = !0), (Ac = n)), wc(e, t));
    }),
    r
  );
}
function sy(e, t, r) {
  ((r = Lr(-1, r)), (r.tag = 3));
  var n = e.type.getDerivedStateFromError;
  if (typeof n == 'function') {
    var s = t.value;
    ((r.payload = function () {
      return n(s);
    }),
      (r.callback = function () {
        wc(e, t);
      }));
  }
  var a = e.stateNode;
  return (
    a !== null &&
      typeof a.componentDidCatch == 'function' &&
      (r.callback = function () {
        (wc(e, t),
          typeof n != 'function' &&
            (pn === null ? (pn = new Set([this])) : pn.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : '',
        });
      }),
    r
  );
}
function Rh(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new cw();
    var s = new Set();
    n.set(t, s);
  } else ((s = n.get(t)), s === void 0 && ((s = new Set()), n.set(t, s)));
  s.has(r) || (s.add(r), (e = Sw.bind(null, e, t, r)), t.then(e, e));
}
function Dh(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Oh(e, t, r, n, s) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = s), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (r.flags |= 131072),
          (r.flags &= -52805),
          r.tag === 1 &&
            (r.alternate === null
              ? (r.tag = 17)
              : ((t = Lr(-1, 1)), (t.tag = 2), hn(r, t, 1))),
          (r.lanes |= 1)),
      e);
}
var dw = Hr.ReactCurrentOwner,
  Ct = !1;
function yt(e, t, r, n) {
  t.child = e === null ? Rg(t, null, r, n) : zs(t, e.child, r, n);
}
function Lh(e, t, r, n, s) {
  r = r.render;
  var a = t.ref;
  return (
    Rs(t, s),
    (n = ef(e, t, r, n, a, s)),
    (r = tf()),
    e !== null && !Ct
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~s),
        Br(e, t, s))
      : (Oe && r && zd(t), (t.flags |= 1), yt(e, t, n, s), t.child)
  );
}
function Mh(e, t, r, n, s) {
  if (e === null) {
    var a = r.type;
    return typeof a == 'function' &&
      !ff(a) &&
      a.defaultProps === void 0 &&
      r.compare === null &&
      r.defaultProps === void 0
      ? ((t.tag = 15), (t.type = a), ay(e, t, a, n, s))
      : ((e = yo(r.type, null, n, t, t.mode, s)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((a = e.child), !(e.lanes & s))) {
    var i = a.memoizedProps;
    if (
      ((r = r.compare), (r = r !== null ? r : Ya), r(i, n) && e.ref === t.ref)
    )
      return Br(e, t, s);
  }
  return (
    (t.flags |= 1),
    (e = gn(a, n)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function ay(e, t, r, n, s) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (Ya(a, n) && e.ref === t.ref)
      if (((Ct = !1), (t.pendingProps = n = a), (e.lanes & s) !== 0))
        e.flags & 131072 && (Ct = !0);
      else return ((t.lanes = e.lanes), Br(e, t, s));
  }
  return bc(e, t, r, n, s);
}
function iy(e, t, r) {
  var n = t.pendingProps,
    s = n.children,
    a = e !== null ? e.memoizedState : null;
  if (n.mode === 'hidden')
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Ce(js, Lt),
        (Lt |= r));
    else {
      if (!(r & 1073741824))
        return (
          (e = a !== null ? a.baseLanes | r : r),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Ce(js, Lt),
          (Lt |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (n = a !== null ? a.baseLanes : r),
        Ce(js, Lt),
        (Lt |= n));
    }
  else
    (a !== null ? ((n = a.baseLanes | r), (t.memoizedState = null)) : (n = r),
      Ce(js, Lt),
      (Lt |= n));
  return (yt(e, t, s, r), t.child);
}
function oy(e, t) {
  var r = t.ref;
  ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function bc(e, t, r, n, s) {
  var a = It(r) ? Jn : pt.current;
  return (
    (a = $s(t, a)),
    Rs(t, s),
    (r = ef(e, t, r, n, a, s)),
    (n = tf()),
    e !== null && !Ct
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~s),
        Br(e, t, s))
      : (Oe && n && zd(t), (t.flags |= 1), yt(e, t, r, s), t.child)
  );
}
function Vh(e, t, r, n, s) {
  if (It(r)) {
    var a = !0;
    Mo(t);
  } else a = !1;
  if ((Rs(t, s), t.stateNode === null))
    (po(e, t), ry(t, r, n), xc(t, r, n, s), (n = !0));
  else if (e === null) {
    var i = t.stateNode,
      o = t.memoizedProps;
    i.props = o;
    var l = i.context,
      c = r.contextType;
    typeof c == 'object' && c !== null
      ? (c = Jt(c))
      : ((c = It(r) ? Jn : pt.current), (c = $s(t, c)));
    var d = r.getDerivedStateFromProps,
      h =
        typeof d == 'function' ||
        typeof i.getSnapshotBeforeUpdate == 'function';
    (h ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((o !== n || l !== c) && Ph(t, i, n, c)),
      (Jr = !1));
    var f = t.memoizedState;
    ((i.state = f),
      zo(t, n, i, s),
      (l = t.memoizedState),
      o !== n || f !== l || At.current || Jr
        ? (typeof d == 'function' && (vc(t, r, d, n), (l = t.memoizedState)),
          (o = Jr || Ih(t, r, o, n, f, l, c))
            ? (h ||
                (typeof i.UNSAFE_componentWillMount != 'function' &&
                  typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = n),
              (t.memoizedState = l)),
          (i.props = n),
          (i.state = l),
          (i.context = c),
          (n = o))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
          (n = !1)));
  } else {
    ((i = t.stateNode),
      Og(e, t),
      (o = t.memoizedProps),
      (c = t.type === t.elementType ? o : rr(t.type, o)),
      (i.props = c),
      (h = t.pendingProps),
      (f = i.context),
      (l = r.contextType),
      typeof l == 'object' && l !== null
        ? (l = Jt(l))
        : ((l = It(r) ? Jn : pt.current), (l = $s(t, l))));
    var y = r.getDerivedStateFromProps;
    ((d =
      typeof y == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((o !== h || f !== l) && Ph(t, i, n, l)),
      (Jr = !1),
      (f = t.memoizedState),
      (i.state = f),
      zo(t, n, i, s));
    var m = t.memoizedState;
    o !== h || f !== m || At.current || Jr
      ? (typeof y == 'function' && (vc(t, r, y, n), (m = t.memoizedState)),
        (c = Jr || Ih(t, r, c, n, f, m, l) || !1)
          ? (d ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' &&
                i.componentWillUpdate(n, m, l),
              typeof i.UNSAFE_componentWillUpdate == 'function' &&
                i.UNSAFE_componentWillUpdate(n, m, l)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = n),
            (t.memoizedState = m)),
        (i.props = n),
        (i.state = m),
        (i.context = l),
        (n = c))
      : (typeof i.componentDidUpdate != 'function' ||
          (o === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' ||
          (o === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (n = !1));
  }
  return _c(e, t, r, n, a, s);
}
function _c(e, t, r, n, s, a) {
  oy(e, t);
  var i = (t.flags & 128) !== 0;
  if (!n && !i) return (s && kh(t, r, !1), Br(e, t, a));
  ((n = t.stateNode), (dw.current = t));
  var o =
    i && typeof r.getDerivedStateFromError != 'function' ? null : n.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = zs(t, e.child, null, a)), (t.child = zs(t, null, o, a)))
      : yt(e, t, o, a),
    (t.memoizedState = n.state),
    s && kh(t, r, !0),
    t.child
  );
}
function ly(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? _h(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && _h(e, t.context, !1),
    Gd(e, t.containerInfo));
}
function Fh(e, t, r, n, s) {
  return (Us(), Kd(s), (t.flags |= 256), yt(e, t, r, n), t.child);
}
var kc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Sc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function uy(e, t, r) {
  var n = t.pendingProps,
    s = Le.current,
    a = !1,
    i = (t.flags & 128) !== 0,
    o;
  if (
    ((o = i) ||
      (o = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0),
    o
      ? ((a = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (s |= 1),
    Ce(Le, s & 1),
    e === null)
  )
    return (
      gc(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = n.children),
          (e = n.fallback),
          a
            ? ((n = t.mode),
              (a = t.child),
              (i = { mode: 'hidden', children: i }),
              !(n & 1) && a !== null
                ? ((a.childLanes = 0), (a.pendingProps = i))
                : (a = Il(i, n, 0, null)),
              (e = qn(e, n, r, null)),
              (a.return = t),
              (e.return = t),
              (a.sibling = e),
              (t.child = a),
              (t.child.memoizedState = Sc(r)),
              (t.memoizedState = kc),
              e)
            : sf(t, i))
    );
  if (((s = e.memoizedState), s !== null && ((o = s.dehydrated), o !== null)))
    return fw(e, t, i, n, o, s, r);
  if (a) {
    ((a = n.fallback), (i = t.mode), (s = e.child), (o = s.sibling));
    var l = { mode: 'hidden', children: n.children };
    return (
      !(i & 1) && t.child !== s
        ? ((n = t.child),
          (n.childLanes = 0),
          (n.pendingProps = l),
          (t.deletions = null))
        : ((n = gn(s, l)), (n.subtreeFlags = s.subtreeFlags & 14680064)),
      o !== null ? (a = gn(o, a)) : ((a = qn(a, i, r, null)), (a.flags |= 2)),
      (a.return = t),
      (n.return = t),
      (n.sibling = a),
      (t.child = n),
      (n = a),
      (a = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Sc(r)
          : {
              baseLanes: i.baseLanes | r,
              cachePool: null,
              transitions: i.transitions,
            }),
      (a.memoizedState = i),
      (a.childLanes = e.childLanes & ~r),
      (t.memoizedState = kc),
      n
    );
  }
  return (
    (a = e.child),
    (e = a.sibling),
    (n = gn(a, { mode: 'visible', children: n.children })),
    !(t.mode & 1) && (n.lanes = r),
    (n.return = t),
    (n.sibling = null),
    e !== null &&
      ((r = t.deletions),
      r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
    (t.child = n),
    (t.memoizedState = null),
    n
  );
}
function sf(e, t) {
  return (
    (t = Il({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Hi(e, t, r, n) {
  return (
    n !== null && Kd(n),
    zs(t, e.child, null, r),
    (e = sf(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function fw(e, t, r, n, s, a, i) {
  if (r)
    return t.flags & 256
      ? ((t.flags &= -257), (n = fu(Error($(422)))), Hi(e, t, i, n))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((a = n.fallback),
          (s = t.mode),
          (n = Il({ mode: 'visible', children: n.children }, s, 0, null)),
          (a = qn(a, s, i, null)),
          (a.flags |= 2),
          (n.return = t),
          (a.return = t),
          (n.sibling = a),
          (t.child = n),
          t.mode & 1 && zs(t, e.child, null, i),
          (t.child.memoizedState = Sc(i)),
          (t.memoizedState = kc),
          a);
  if (!(t.mode & 1)) return Hi(e, t, i, null);
  if (s.data === '$!') {
    if (((n = s.nextSibling && s.nextSibling.dataset), n)) var o = n.dgst;
    return (
      (n = o),
      (a = Error($(419))),
      (n = fu(a, n, void 0)),
      Hi(e, t, i, n)
    );
  }
  if (((o = (i & e.childLanes) !== 0), Ct || o)) {
    if (((n = tt), n !== null)) {
      switch (i & -i) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      ((s = s & (n.suspendedLanes | i) ? 0 : s),
        s !== 0 &&
          s !== a.retryLane &&
          ((a.retryLane = s), zr(e, s), or(n, e, s, -1)));
    }
    return (df(), (n = fu(Error($(421)))), Hi(e, t, i, n));
  }
  return s.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Nw.bind(null, e)),
      (s._reactRetry = t),
      null)
    : ((e = a.treeContext),
      (Mt = fn(s.nextSibling)),
      (Vt = t),
      (Oe = !0),
      (sr = null),
      e !== null &&
        ((Wt[qt++] = Rr),
        (Wt[qt++] = Dr),
        (Wt[qt++] = Xn),
        (Rr = e.id),
        (Dr = e.overflow),
        (Xn = t)),
      (t = sf(t, n.children)),
      (t.flags |= 4096),
      t);
}
function $h(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  (n !== null && (n.lanes |= t), yc(e.return, t, r));
}
function hu(e, t, r, n, s) {
  var a = e.memoizedState;
  a === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: r,
        tailMode: s,
      })
    : ((a.isBackwards = t),
      (a.rendering = null),
      (a.renderingStartTime = 0),
      (a.last = n),
      (a.tail = r),
      (a.tailMode = s));
}
function cy(e, t, r) {
  var n = t.pendingProps,
    s = n.revealOrder,
    a = n.tail;
  if ((yt(e, t, n.children, r), (n = Le.current), n & 2))
    ((n = (n & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && $h(e, r, t);
        else if (e.tag === 19) $h(e, r, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    n &= 1;
  }
  if ((Ce(Le, n), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (s) {
      case 'forwards':
        for (r = t.child, s = null; r !== null; )
          ((e = r.alternate),
            e !== null && Bo(e) === null && (s = r),
            (r = r.sibling));
        ((r = s),
          r === null
            ? ((s = t.child), (t.child = null))
            : ((s = r.sibling), (r.sibling = null)),
          hu(t, !1, s, r, a));
        break;
      case 'backwards':
        for (r = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && Bo(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = r), (r = s), (s = e));
        }
        hu(t, !0, r, null, a);
        break;
      case 'together':
        hu(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function po(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Br(e, t, r) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (ts |= t.lanes),
    !(r & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error($(153));
  if (t.child !== null) {
    for (
      e = t.child, r = gn(e, e.pendingProps), t.child = r, r.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling),
        (r = r.sibling = gn(e, e.pendingProps)),
        (r.return = t));
    r.sibling = null;
  }
  return t.child;
}
function hw(e, t, r) {
  switch (t.tag) {
    case 3:
      (ly(t), Us());
      break;
    case 5:
      Lg(t);
      break;
    case 1:
      It(t.type) && Mo(t);
      break;
    case 4:
      Gd(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context,
        s = t.memoizedProps.value;
      (Ce($o, n._currentValue), (n._currentValue = s));
      break;
    case 13:
      if (((n = t.memoizedState), n !== null))
        return n.dehydrated !== null
          ? (Ce(Le, Le.current & 1), (t.flags |= 128), null)
          : r & t.child.childLanes
            ? uy(e, t, r)
            : (Ce(Le, Le.current & 1),
              (e = Br(e, t, r)),
              e !== null ? e.sibling : null);
      Ce(Le, Le.current & 1);
      break;
    case 19:
      if (((n = (r & t.childLanes) !== 0), e.flags & 128)) {
        if (n) return cy(e, t, r);
        t.flags |= 128;
      }
      if (
        ((s = t.memoizedState),
        s !== null &&
          ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
        Ce(Le, Le.current),
        n)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), iy(e, t, r));
  }
  return Br(e, t, r);
}
var dy, Nc, fy, hy;
dy = function (e, t) {
  for (var r = t.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      ((r.child.return = r), (r = r.child));
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    ((r.sibling.return = r.return), (r = r.sibling));
  }
};
Nc = function () {};
fy = function (e, t, r, n) {
  var s = e.memoizedProps;
  if (s !== n) {
    ((e = t.stateNode), Bn(br.current));
    var a = null;
    switch (r) {
      case 'input':
        ((s = qu(e, s)), (n = qu(e, n)), (a = []));
        break;
      case 'select':
        ((s = Fe({}, s, { value: void 0 })),
          (n = Fe({}, n, { value: void 0 })),
          (a = []));
        break;
      case 'textarea':
        ((s = Gu(e, s)), (n = Gu(e, n)), (a = []));
        break;
      default:
        typeof s.onClick != 'function' &&
          typeof n.onClick == 'function' &&
          (e.onclick = Oo);
    }
    Ju(r, n);
    var i;
    r = null;
    for (c in s)
      if (!n.hasOwnProperty(c) && s.hasOwnProperty(c) && s[c] != null)
        if (c === 'style') {
          var o = s[c];
          for (i in o) o.hasOwnProperty(i) && (r || (r = {}), (r[i] = ''));
        } else
          c !== 'dangerouslySetInnerHTML' &&
            c !== 'children' &&
            c !== 'suppressContentEditableWarning' &&
            c !== 'suppressHydrationWarning' &&
            c !== 'autoFocus' &&
            (Ka.hasOwnProperty(c)
              ? a || (a = [])
              : (a = a || []).push(c, null));
    for (c in n) {
      var l = n[c];
      if (
        ((o = s != null ? s[c] : void 0),
        n.hasOwnProperty(c) && l !== o && (l != null || o != null))
      )
        if (c === 'style')
          if (o) {
            for (i in o)
              !o.hasOwnProperty(i) ||
                (l && l.hasOwnProperty(i)) ||
                (r || (r = {}), (r[i] = ''));
            for (i in l)
              l.hasOwnProperty(i) &&
                o[i] !== l[i] &&
                (r || (r = {}), (r[i] = l[i]));
          } else (r || (a || (a = []), a.push(c, r)), (r = l));
        else
          c === 'dangerouslySetInnerHTML'
            ? ((l = l ? l.__html : void 0),
              (o = o ? o.__html : void 0),
              l != null && o !== l && (a = a || []).push(c, l))
            : c === 'children'
              ? (typeof l != 'string' && typeof l != 'number') ||
                (a = a || []).push(c, '' + l)
              : c !== 'suppressContentEditableWarning' &&
                c !== 'suppressHydrationWarning' &&
                (Ka.hasOwnProperty(c)
                  ? (l != null && c === 'onScroll' && Te('scroll', e),
                    a || o === l || (a = []))
                  : (a = a || []).push(c, l));
    }
    r && (a = a || []).push('style', r);
    var c = a;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
hy = function (e, t, r, n) {
  r !== n && (t.flags |= 4);
};
function ga(e, t) {
  if (!Oe)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var r = null; t !== null; )
          (t.alternate !== null && (r = t), (t = t.sibling));
        r === null ? (e.tail = null) : (r.sibling = null);
        break;
      case 'collapsed':
        r = e.tail;
        for (var n = null; r !== null; )
          (r.alternate !== null && (n = r), (r = r.sibling));
        n === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (n.sibling = null);
    }
}
function ct(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    r = 0,
    n = 0;
  if (t)
    for (var s = e.child; s !== null; )
      ((r |= s.lanes | s.childLanes),
        (n |= s.subtreeFlags & 14680064),
        (n |= s.flags & 14680064),
        (s.return = e),
        (s = s.sibling));
  else
    for (s = e.child; s !== null; )
      ((r |= s.lanes | s.childLanes),
        (n |= s.subtreeFlags),
        (n |= s.flags),
        (s.return = e),
        (s = s.sibling));
  return ((e.subtreeFlags |= n), (e.childLanes = r), t);
}
function pw(e, t, r) {
  var n = t.pendingProps;
  switch ((Bd(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ct(t), null);
    case 1:
      return (It(t.type) && Lo(), ct(t), null);
    case 3:
      return (
        (n = t.stateNode),
        Bs(),
        Ie(At),
        Ie(pt),
        Jd(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (Bi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), sr !== null && (Rc(sr), (sr = null)))),
        Nc(e, t),
        ct(t),
        null
      );
    case 5:
      Yd(t);
      var s = Bn(ri.current);
      if (((r = t.type), e !== null && t.stateNode != null))
        (fy(e, t, r, n, s),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!n) {
          if (t.stateNode === null) throw Error($(166));
          return (ct(t), null);
        }
        if (((e = Bn(br.current)), Bi(t))) {
          ((n = t.stateNode), (r = t.type));
          var a = t.memoizedProps;
          switch (((n[gr] = t), (n[ei] = a), (e = (t.mode & 1) !== 0), r)) {
            case 'dialog':
              (Te('cancel', n), Te('close', n));
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              Te('load', n);
              break;
            case 'video':
            case 'audio':
              for (s = 0; s < Na.length; s++) Te(Na[s], n);
              break;
            case 'source':
              Te('error', n);
              break;
            case 'img':
            case 'image':
            case 'link':
              (Te('error', n), Te('load', n));
              break;
            case 'details':
              Te('toggle', n);
              break;
            case 'input':
              (Qf(n, a), Te('invalid', n));
              break;
            case 'select':
              ((n._wrapperState = { wasMultiple: !!a.multiple }),
                Te('invalid', n));
              break;
            case 'textarea':
              (Yf(n, a), Te('invalid', n));
          }
          (Ju(r, a), (s = null));
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              var o = a[i];
              i === 'children'
                ? typeof o == 'string'
                  ? n.textContent !== o &&
                    (a.suppressHydrationWarning !== !0 &&
                      zi(n.textContent, o, e),
                    (s = ['children', o]))
                  : typeof o == 'number' &&
                    n.textContent !== '' + o &&
                    (a.suppressHydrationWarning !== !0 &&
                      zi(n.textContent, o, e),
                    (s = ['children', '' + o]))
                : Ka.hasOwnProperty(i) &&
                  o != null &&
                  i === 'onScroll' &&
                  Te('scroll', n);
            }
          switch (r) {
            case 'input':
              (Di(n), Gf(n, a, !0));
              break;
            case 'textarea':
              (Di(n), Jf(n));
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof a.onClick == 'function' && (n.onclick = Oo);
          }
          ((n = s), (t.updateQueue = n), n !== null && (t.flags |= 4));
        } else {
          ((i = s.nodeType === 9 ? s : s.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = Um(r)),
            e === 'http://www.w3.org/1999/xhtml'
              ? r === 'script'
                ? ((e = i.createElement('div')),
                  (e.innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof n.is == 'string'
                  ? (e = i.createElement(r, { is: n.is }))
                  : ((e = i.createElement(r)),
                    r === 'select' &&
                      ((i = e),
                      n.multiple
                        ? (i.multiple = !0)
                        : n.size && (i.size = n.size)))
              : (e = i.createElementNS(e, r)),
            (e[gr] = t),
            (e[ei] = n),
            dy(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((i = Xu(r, n)), r)) {
              case 'dialog':
                (Te('cancel', e), Te('close', e), (s = n));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                (Te('load', e), (s = n));
                break;
              case 'video':
              case 'audio':
                for (s = 0; s < Na.length; s++) Te(Na[s], e);
                s = n;
                break;
              case 'source':
                (Te('error', e), (s = n));
                break;
              case 'img':
              case 'image':
              case 'link':
                (Te('error', e), Te('load', e), (s = n));
                break;
              case 'details':
                (Te('toggle', e), (s = n));
                break;
              case 'input':
                (Qf(e, n), (s = qu(e, n)), Te('invalid', e));
                break;
              case 'option':
                s = n;
                break;
              case 'select':
                ((e._wrapperState = { wasMultiple: !!n.multiple }),
                  (s = Fe({}, n, { value: void 0 })),
                  Te('invalid', e));
                break;
              case 'textarea':
                (Yf(e, n), (s = Gu(e, n)), Te('invalid', e));
                break;
              default:
                s = n;
            }
            (Ju(r, s), (o = s));
            for (a in o)
              if (o.hasOwnProperty(a)) {
                var l = o[a];
                a === 'style'
                  ? Km(e, l)
                  : a === 'dangerouslySetInnerHTML'
                    ? ((l = l ? l.__html : void 0), l != null && zm(e, l))
                    : a === 'children'
                      ? typeof l == 'string'
                        ? (r !== 'textarea' || l !== '') && Ha(e, l)
                        : typeof l == 'number' && Ha(e, '' + l)
                      : a !== 'suppressContentEditableWarning' &&
                        a !== 'suppressHydrationWarning' &&
                        a !== 'autoFocus' &&
                        (Ka.hasOwnProperty(a)
                          ? l != null && a === 'onScroll' && Te('scroll', e)
                          : l != null && Cd(e, a, l, i));
              }
            switch (r) {
              case 'input':
                (Di(e), Gf(e, n, !1));
                break;
              case 'textarea':
                (Di(e), Jf(e));
                break;
              case 'option':
                n.value != null && e.setAttribute('value', '' + _n(n.value));
                break;
              case 'select':
                ((e.multiple = !!n.multiple),
                  (a = n.value),
                  a != null
                    ? Ts(e, !!n.multiple, a, !1)
                    : n.defaultValue != null &&
                      Ts(e, !!n.multiple, n.defaultValue, !0));
                break;
              default:
                typeof s.onClick == 'function' && (e.onclick = Oo);
            }
            switch (r) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                n = !!n.autoFocus;
                break e;
              case 'img':
                n = !0;
                break e;
              default:
                n = !1;
            }
          }
          n && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ct(t), null);
    case 6:
      if (e && t.stateNode != null) hy(e, t, e.memoizedProps, n);
      else {
        if (typeof n != 'string' && t.stateNode === null) throw Error($(166));
        if (((r = Bn(ri.current)), Bn(br.current), Bi(t))) {
          if (
            ((n = t.stateNode),
            (r = t.memoizedProps),
            (n[gr] = t),
            (a = n.nodeValue !== r) && ((e = Vt), e !== null))
          )
            switch (e.tag) {
              case 3:
                zi(n.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  zi(n.nodeValue, r, (e.mode & 1) !== 0);
            }
          a && (t.flags |= 4);
        } else
          ((n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
            (n[gr] = t),
            (t.stateNode = n));
      }
      return (ct(t), null);
    case 13:
      if (
        (Ie(Le),
        (n = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Oe && Mt !== null && t.mode & 1 && !(t.flags & 128))
          (Ig(), Us(), (t.flags |= 98560), (a = !1));
        else if (((a = Bi(t)), n !== null && n.dehydrated !== null)) {
          if (e === null) {
            if (!a) throw Error($(318));
            if (
              ((a = t.memoizedState),
              (a = a !== null ? a.dehydrated : null),
              !a)
            )
              throw Error($(317));
            a[gr] = t;
          } else
            (Us(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ct(t), (a = !1));
        } else (sr !== null && (Rc(sr), (sr = null)), (a = !0));
        if (!a) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = r), t)
        : ((n = n !== null),
          n !== (e !== null && e.memoizedState !== null) &&
            n &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Le.current & 1 ? Je === 0 && (Je = 3) : df())),
          t.updateQueue !== null && (t.flags |= 4),
          ct(t),
          null);
    case 4:
      return (
        Bs(),
        Nc(e, t),
        e === null && Ja(t.stateNode.containerInfo),
        ct(t),
        null
      );
    case 10:
      return (qd(t.type._context), ct(t), null);
    case 17:
      return (It(t.type) && Lo(), ct(t), null);
    case 19:
      if ((Ie(Le), (a = t.memoizedState), a === null)) return (ct(t), null);
      if (((n = (t.flags & 128) !== 0), (i = a.rendering), i === null))
        if (n) ga(a, !1);
        else {
          if (Je !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Bo(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    ga(a, !1),
                    n = i.updateQueue,
                    n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    n = r,
                    r = t.child;
                  r !== null;

                )
                  ((a = r),
                    (e = n),
                    (a.flags &= 14680066),
                    (i = a.alternate),
                    i === null
                      ? ((a.childLanes = 0),
                        (a.lanes = e),
                        (a.child = null),
                        (a.subtreeFlags = 0),
                        (a.memoizedProps = null),
                        (a.memoizedState = null),
                        (a.updateQueue = null),
                        (a.dependencies = null),
                        (a.stateNode = null))
                      : ((a.childLanes = i.childLanes),
                        (a.lanes = i.lanes),
                        (a.child = i.child),
                        (a.subtreeFlags = 0),
                        (a.deletions = null),
                        (a.memoizedProps = i.memoizedProps),
                        (a.memoizedState = i.memoizedState),
                        (a.updateQueue = i.updateQueue),
                        (a.type = i.type),
                        (e = i.dependencies),
                        (a.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (r = r.sibling));
                return (Ce(Le, (Le.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          a.tail !== null &&
            Ke() > Hs &&
            ((t.flags |= 128), (n = !0), ga(a, !1), (t.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = Bo(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (n = !0),
              (r = e.updateQueue),
              r !== null && ((t.updateQueue = r), (t.flags |= 4)),
              ga(a, !0),
              a.tail === null && a.tailMode === 'hidden' && !i.alternate && !Oe)
            )
              return (ct(t), null);
          } else
            2 * Ke() - a.renderingStartTime > Hs &&
              r !== 1073741824 &&
              ((t.flags |= 128), (n = !0), ga(a, !1), (t.lanes = 4194304));
        a.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((r = a.last),
            r !== null ? (r.sibling = i) : (t.child = i),
            (a.last = i));
      }
      return a.tail !== null
        ? ((t = a.tail),
          (a.rendering = t),
          (a.tail = t.sibling),
          (a.renderingStartTime = Ke()),
          (t.sibling = null),
          (r = Le.current),
          Ce(Le, n ? (r & 1) | 2 : r & 1),
          t)
        : (ct(t), null);
    case 22:
    case 23:
      return (
        cf(),
        (n = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
        n && t.mode & 1
          ? Lt & 1073741824 && (ct(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ct(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error($(156, t.tag));
}
function mw(e, t) {
  switch ((Bd(t), t.tag)) {
    case 1:
      return (
        It(t.type) && Lo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Bs(),
        Ie(At),
        Ie(pt),
        Jd(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (Yd(t), null);
    case 13:
      if (
        (Ie(Le), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error($(340));
        Us();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (Ie(Le), null);
    case 4:
      return (Bs(), null);
    case 10:
      return (qd(t.type._context), null);
    case 22:
    case 23:
      return (cf(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Wi = !1,
  dt = !1,
  gw = typeof WeakSet == 'function' ? WeakSet : Set,
  J = null;
function Es(e, t) {
  var r = e.ref;
  if (r !== null)
    if (typeof r == 'function')
      try {
        r(null);
      } catch (n) {
        $e(e, t, n);
      }
    else r.current = null;
}
function Ec(e, t, r) {
  try {
    r();
  } catch (n) {
    $e(e, t, n);
  }
}
var Uh = !1;
function yw(e, t) {
  if (((uc = Po), (e = vg()), Ud(e))) {
    if ('selectionStart' in e)
      var r = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        r = ((r = e.ownerDocument) && r.defaultView) || window;
        var n = r.getSelection && r.getSelection();
        if (n && n.rangeCount !== 0) {
          r = n.anchorNode;
          var s = n.anchorOffset,
            a = n.focusNode;
          n = n.focusOffset;
          try {
            (r.nodeType, a.nodeType);
          } catch {
            r = null;
            break e;
          }
          var i = 0,
            o = -1,
            l = -1,
            c = 0,
            d = 0,
            h = e,
            f = null;
          t: for (;;) {
            for (
              var y;
              h !== r || (s !== 0 && h.nodeType !== 3) || (o = i + s),
                h !== a || (n !== 0 && h.nodeType !== 3) || (l = i + n),
                h.nodeType === 3 && (i += h.nodeValue.length),
                (y = h.firstChild) !== null;

            )
              ((f = h), (h = y));
            for (;;) {
              if (h === e) break t;
              if (
                (f === r && ++c === s && (o = i),
                f === a && ++d === n && (l = i),
                (y = h.nextSibling) !== null)
              )
                break;
              ((h = f), (f = h.parentNode));
            }
            h = y;
          }
          r = o === -1 || l === -1 ? null : { start: o, end: l };
        } else r = null;
      }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (cc = { focusedElem: e, selectionRange: r }, Po = !1, J = t; J !== null; )
    if (((t = J), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (J = e));
    else
      for (; J !== null; ) {
        t = J;
        try {
          var m = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m !== null) {
                  var x = m.memoizedProps,
                    S = m.memoizedState,
                    g = t.stateNode,
                    p = g.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : rr(t.type, x),
                      S,
                    );
                  g.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = '')
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error($(163));
            }
        } catch (k) {
          $e(t, t.return, k);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (J = e));
          break;
        }
        J = t.return;
      }
  return ((m = Uh), (Uh = !1), m);
}
function Oa(e, t, r) {
  var n = t.updateQueue;
  if (((n = n !== null ? n.lastEffect : null), n !== null)) {
    var s = (n = n.next);
    do {
      if ((s.tag & e) === e) {
        var a = s.destroy;
        ((s.destroy = void 0), a !== void 0 && Ec(t, r, a));
      }
      s = s.next;
    } while (s !== n);
  }
}
function Tl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var r = (t = t.next);
    do {
      if ((r.tag & e) === e) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== t);
  }
}
function jc(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function py(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), py(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[gr], delete t[ei], delete t[hc], delete t[X0], delete t[ew])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function my(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function zh(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || my(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Cc(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    ((e = e.stateNode),
      t
        ? r.nodeType === 8
          ? r.parentNode.insertBefore(e, t)
          : r.insertBefore(e, t)
        : (r.nodeType === 8
            ? ((t = r.parentNode), t.insertBefore(e, r))
            : ((t = r), t.appendChild(e)),
          (r = r._reactRootContainer),
          r != null || t.onclick !== null || (t.onclick = Oo)));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (Cc(e, t, r), e = e.sibling; e !== null; )
      (Cc(e, t, r), (e = e.sibling));
}
function Tc(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    ((e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (Tc(e, t, r), e = e.sibling; e !== null; )
      (Tc(e, t, r), (e = e.sibling));
}
var st = null,
  nr = !1;
function Zr(e, t, r) {
  for (r = r.child; r !== null; ) (gy(e, t, r), (r = r.sibling));
}
function gy(e, t, r) {
  if (wr && typeof wr.onCommitFiberUnmount == 'function')
    try {
      wr.onCommitFiberUnmount(bl, r);
    } catch {}
  switch (r.tag) {
    case 5:
      dt || Es(r, t);
    case 6:
      var n = st,
        s = nr;
      ((st = null),
        Zr(e, t, r),
        (st = n),
        (nr = s),
        st !== null &&
          (nr
            ? ((e = st),
              (r = r.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r))
            : st.removeChild(r.stateNode)));
      break;
    case 18:
      st !== null &&
        (nr
          ? ((e = st),
            (r = r.stateNode),
            e.nodeType === 8
              ? iu(e.parentNode, r)
              : e.nodeType === 1 && iu(e, r),
            Qa(e))
          : iu(st, r.stateNode));
      break;
    case 4:
      ((n = st),
        (s = nr),
        (st = r.stateNode.containerInfo),
        (nr = !0),
        Zr(e, t, r),
        (st = n),
        (nr = s));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !dt &&
        ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
      ) {
        s = n = n.next;
        do {
          var a = s,
            i = a.destroy;
          ((a = a.tag),
            i !== void 0 && (a & 2 || a & 4) && Ec(r, t, i),
            (s = s.next));
        } while (s !== n);
      }
      Zr(e, t, r);
      break;
    case 1:
      if (
        !dt &&
        (Es(r, t),
        (n = r.stateNode),
        typeof n.componentWillUnmount == 'function')
      )
        try {
          ((n.props = r.memoizedProps),
            (n.state = r.memoizedState),
            n.componentWillUnmount());
        } catch (o) {
          $e(r, t, o);
        }
      Zr(e, t, r);
      break;
    case 21:
      Zr(e, t, r);
      break;
    case 22:
      r.mode & 1
        ? ((dt = (n = dt) || r.memoizedState !== null), Zr(e, t, r), (dt = n))
        : Zr(e, t, r);
      break;
    default:
      Zr(e, t, r);
  }
}
function Bh(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    (r === null && (r = e.stateNode = new gw()),
      t.forEach(function (n) {
        var s = Ew.bind(null, e, n);
        r.has(n) || (r.add(n), n.then(s, s));
      }));
  }
}
function tr(e, t) {
  var r = t.deletions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var s = r[n];
      try {
        var a = e,
          i = t,
          o = i;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case 5:
              ((st = o.stateNode), (nr = !1));
              break e;
            case 3:
              ((st = o.stateNode.containerInfo), (nr = !0));
              break e;
            case 4:
              ((st = o.stateNode.containerInfo), (nr = !0));
              break e;
          }
          o = o.return;
        }
        if (st === null) throw Error($(160));
        (gy(a, i, s), (st = null), (nr = !1));
        var l = s.alternate;
        (l !== null && (l.return = null), (s.return = null));
      } catch (c) {
        $e(s, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (yy(t, e), (t = t.sibling));
}
function yy(e, t) {
  var r = e.alternate,
    n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((tr(t, e), dr(e), n & 4)) {
        try {
          (Oa(3, e, e.return), Tl(3, e));
        } catch (x) {
          $e(e, e.return, x);
        }
        try {
          Oa(5, e, e.return);
        } catch (x) {
          $e(e, e.return, x);
        }
      }
      break;
    case 1:
      (tr(t, e), dr(e), n & 512 && r !== null && Es(r, r.return));
      break;
    case 5:
      if (
        (tr(t, e),
        dr(e),
        n & 512 && r !== null && Es(r, r.return),
        e.flags & 32)
      ) {
        var s = e.stateNode;
        try {
          Ha(s, '');
        } catch (x) {
          $e(e, e.return, x);
        }
      }
      if (n & 4 && ((s = e.stateNode), s != null)) {
        var a = e.memoizedProps,
          i = r !== null ? r.memoizedProps : a,
          o = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            (o === 'input' && a.type === 'radio' && a.name != null && Fm(s, a),
              Xu(o, i));
            var c = Xu(o, a);
            for (i = 0; i < l.length; i += 2) {
              var d = l[i],
                h = l[i + 1];
              d === 'style'
                ? Km(s, h)
                : d === 'dangerouslySetInnerHTML'
                  ? zm(s, h)
                  : d === 'children'
                    ? Ha(s, h)
                    : Cd(s, d, h, c);
            }
            switch (o) {
              case 'input':
                Zu(s, a);
                break;
              case 'textarea':
                $m(s, a);
                break;
              case 'select':
                var f = s._wrapperState.wasMultiple;
                s._wrapperState.wasMultiple = !!a.multiple;
                var y = a.value;
                y != null
                  ? Ts(s, !!a.multiple, y, !1)
                  : f !== !!a.multiple &&
                    (a.defaultValue != null
                      ? Ts(s, !!a.multiple, a.defaultValue, !0)
                      : Ts(s, !!a.multiple, a.multiple ? [] : '', !1));
            }
            s[ei] = a;
          } catch (x) {
            $e(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((tr(t, e), dr(e), n & 4)) {
        if (e.stateNode === null) throw Error($(162));
        ((s = e.stateNode), (a = e.memoizedProps));
        try {
          s.nodeValue = a;
        } catch (x) {
          $e(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (tr(t, e), dr(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
      )
        try {
          Qa(t.containerInfo);
        } catch (x) {
          $e(e, e.return, x);
        }
      break;
    case 4:
      (tr(t, e), dr(e));
      break;
    case 13:
      (tr(t, e),
        dr(e),
        (s = e.child),
        s.flags & 8192 &&
          ((a = s.memoizedState !== null),
          (s.stateNode.isHidden = a),
          !a ||
            (s.alternate !== null && s.alternate.memoizedState !== null) ||
            (lf = Ke())),
        n & 4 && Bh(e));
      break;
    case 22:
      if (
        ((d = r !== null && r.memoizedState !== null),
        e.mode & 1 ? ((dt = (c = dt) || d), tr(t, e), (dt = c)) : tr(t, e),
        dr(e),
        n & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !d && e.mode & 1)
        )
          for (J = e, d = e.child; d !== null; ) {
            for (h = J = d; J !== null; ) {
              switch (((f = J), (y = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Oa(4, f, f.return);
                  break;
                case 1:
                  Es(f, f.return);
                  var m = f.stateNode;
                  if (typeof m.componentWillUnmount == 'function') {
                    ((n = f), (r = f.return));
                    try {
                      ((t = n),
                        (m.props = t.memoizedProps),
                        (m.state = t.memoizedState),
                        m.componentWillUnmount());
                    } catch (x) {
                      $e(n, r, x);
                    }
                  }
                  break;
                case 5:
                  Es(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    Hh(h);
                    continue;
                  }
              }
              y !== null ? ((y.return = f), (J = y)) : Hh(h);
            }
            d = d.sibling;
          }
        e: for (d = null, h = e; ; ) {
          if (h.tag === 5) {
            if (d === null) {
              d = h;
              try {
                ((s = h.stateNode),
                  c
                    ? ((a = s.style),
                      typeof a.setProperty == 'function'
                        ? a.setProperty('display', 'none', 'important')
                        : (a.display = 'none'))
                    : ((o = h.stateNode),
                      (l = h.memoizedProps.style),
                      (i =
                        l != null && l.hasOwnProperty('display')
                          ? l.display
                          : null),
                      (o.style.display = Bm('display', i))));
              } catch (x) {
                $e(e, e.return, x);
              }
            }
          } else if (h.tag === 6) {
            if (d === null)
              try {
                h.stateNode.nodeValue = c ? '' : h.memoizedProps;
              } catch (x) {
                $e(e, e.return, x);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            ((h.child.return = h), (h = h.child));
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            (d === h && (d = null), (h = h.return));
          }
          (d === h && (d = null),
            (h.sibling.return = h.return),
            (h = h.sibling));
        }
      }
      break;
    case 19:
      (tr(t, e), dr(e), n & 4 && Bh(e));
      break;
    case 21:
      break;
    default:
      (tr(t, e), dr(e));
  }
}
function dr(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (my(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error($(160));
      }
      switch (n.tag) {
        case 5:
          var s = n.stateNode;
          n.flags & 32 && (Ha(s, ''), (n.flags &= -33));
          var a = zh(e);
          Tc(e, a, s);
          break;
        case 3:
        case 4:
          var i = n.stateNode.containerInfo,
            o = zh(e);
          Cc(e, o, i);
          break;
        default:
          throw Error($(161));
      }
    } catch (l) {
      $e(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function vw(e, t, r) {
  ((J = e), vy(e));
}
function vy(e, t, r) {
  for (var n = (e.mode & 1) !== 0; J !== null; ) {
    var s = J,
      a = s.child;
    if (s.tag === 22 && n) {
      var i = s.memoizedState !== null || Wi;
      if (!i) {
        var o = s.alternate,
          l = (o !== null && o.memoizedState !== null) || dt;
        o = Wi;
        var c = dt;
        if (((Wi = i), (dt = l) && !c))
          for (J = s; J !== null; )
            ((i = J),
              (l = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Wh(s)
                : l !== null
                  ? ((l.return = i), (J = l))
                  : Wh(s));
        for (; a !== null; ) ((J = a), vy(a), (a = a.sibling));
        ((J = s), (Wi = o), (dt = c));
      }
      Kh(e);
    } else
      s.subtreeFlags & 8772 && a !== null ? ((a.return = s), (J = a)) : Kh(e);
  }
}
function Kh(e) {
  for (; J !== null; ) {
    var t = J;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              dt || Tl(5, t);
              break;
            case 1:
              var n = t.stateNode;
              if (t.flags & 4 && !dt)
                if (r === null) n.componentDidMount();
                else {
                  var s =
                    t.elementType === t.type
                      ? r.memoizedProps
                      : rr(t.type, r.memoizedProps);
                  n.componentDidUpdate(
                    s,
                    r.memoizedState,
                    n.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var a = t.updateQueue;
              a !== null && Ch(t, a, n);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((r = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                Ch(t, i, r);
              }
              break;
            case 5:
              var o = t.stateNode;
              if (r === null && t.flags & 4) {
                r = o;
                var l = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    l.autoFocus && r.focus();
                    break;
                  case 'img':
                    l.src && (r.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var d = c.memoizedState;
                  if (d !== null) {
                    var h = d.dehydrated;
                    h !== null && Qa(h);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error($(163));
          }
        dt || (t.flags & 512 && jc(t));
      } catch (f) {
        $e(t, t.return, f);
      }
    }
    if (t === e) {
      J = null;
      break;
    }
    if (((r = t.sibling), r !== null)) {
      ((r.return = t.return), (J = r));
      break;
    }
    J = t.return;
  }
}
function Hh(e) {
  for (; J !== null; ) {
    var t = J;
    if (t === e) {
      J = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      ((r.return = t.return), (J = r));
      break;
    }
    J = t.return;
  }
}
function Wh(e) {
  for (; J !== null; ) {
    var t = J;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            Tl(4, t);
          } catch (l) {
            $e(t, r, l);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == 'function') {
            var s = t.return;
            try {
              n.componentDidMount();
            } catch (l) {
              $e(t, s, l);
            }
          }
          var a = t.return;
          try {
            jc(t);
          } catch (l) {
            $e(t, a, l);
          }
          break;
        case 5:
          var i = t.return;
          try {
            jc(t);
          } catch (l) {
            $e(t, i, l);
          }
      }
    } catch (l) {
      $e(t, t.return, l);
    }
    if (t === e) {
      J = null;
      break;
    }
    var o = t.sibling;
    if (o !== null) {
      ((o.return = t.return), (J = o));
      break;
    }
    J = t.return;
  }
}
var xw = Math.ceil,
  Wo = Hr.ReactCurrentDispatcher,
  af = Hr.ReactCurrentOwner,
  Gt = Hr.ReactCurrentBatchConfig,
  ve = 0,
  tt = null,
  qe = null,
  at = 0,
  Lt = 0,
  js = An(0),
  Je = 0,
  ii = null,
  ts = 0,
  Al = 0,
  of = 0,
  La = null,
  jt = null,
  lf = 0,
  Hs = 1 / 0,
  Tr = null,
  qo = !1,
  Ac = null,
  pn = null,
  qi = !1,
  on = null,
  Zo = 0,
  Ma = 0,
  Ic = null,
  mo = -1,
  go = 0;
function bt() {
  return ve & 6 ? Ke() : mo !== -1 ? mo : (mo = Ke());
}
function mn(e) {
  return e.mode & 1
    ? ve & 2 && at !== 0
      ? at & -at
      : rw.transition !== null
        ? (go === 0 && (go = rg()), go)
        : ((e = ke),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : ug(e.type))),
          e)
    : 1;
}
function or(e, t, r, n) {
  if (50 < Ma) throw ((Ma = 0), (Ic = null), Error($(185)));
  (_i(e, r, n),
    (!(ve & 2) || e !== tt) &&
      (e === tt && (!(ve & 2) && (Al |= r), Je === 4 && rn(e, at)),
      Pt(e, n),
      r === 1 && ve === 0 && !(t.mode & 1) && ((Hs = Ke() + 500), El && In())));
}
function Pt(e, t) {
  var r = e.callbackNode;
  r0(e, t);
  var n = Io(e, e === tt ? at : 0);
  if (n === 0)
    (r !== null && th(r), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = n & -n), e.callbackPriority !== t)) {
    if ((r != null && th(r), t === 1))
      (e.tag === 0 ? tw(qh.bind(null, e)) : Cg(qh.bind(null, e)),
        Y0(function () {
          !(ve & 6) && In();
        }),
        (r = null));
    else {
      switch (ng(n)) {
        case 1:
          r = Rd;
          break;
        case 4:
          r = eg;
          break;
        case 16:
          r = Ao;
          break;
        case 536870912:
          r = tg;
          break;
        default:
          r = Ao;
      }
      r = Ey(r, xy.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = r));
  }
}
function xy(e, t) {
  if (((mo = -1), (go = 0), ve & 6)) throw Error($(327));
  var r = e.callbackNode;
  if (Ds() && e.callbackNode !== r) return null;
  var n = Io(e, e === tt ? at : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || t) t = Qo(e, n);
  else {
    t = n;
    var s = ve;
    ve |= 2;
    var a = by();
    (tt !== e || at !== t) && ((Tr = null), (Hs = Ke() + 500), Wn(e, t));
    do
      try {
        _w();
        break;
      } catch (o) {
        wy(e, o);
      }
    while (!0);
    (Wd(),
      (Wo.current = a),
      (ve = s),
      qe !== null ? (t = 0) : ((tt = null), (at = 0), (t = Je)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((s = sc(e)), s !== 0 && ((n = s), (t = Pc(e, s)))), t === 1)
    )
      throw ((r = ii), Wn(e, 0), rn(e, n), Pt(e, Ke()), r);
    if (t === 6) rn(e, n);
    else {
      if (
        ((s = e.current.alternate),
        !(n & 30) &&
          !ww(s) &&
          ((t = Qo(e, n)),
          t === 2 && ((a = sc(e)), a !== 0 && ((n = a), (t = Pc(e, a)))),
          t === 1))
      )
        throw ((r = ii), Wn(e, 0), rn(e, n), Pt(e, Ke()), r);
      switch (((e.finishedWork = s), (e.finishedLanes = n), t)) {
        case 0:
        case 1:
          throw Error($(345));
        case 2:
          Fn(e, jt, Tr);
          break;
        case 3:
          if (
            (rn(e, n), (n & 130023424) === n && ((t = lf + 500 - Ke()), 10 < t))
          ) {
            if (Io(e, 0) !== 0) break;
            if (((s = e.suspendedLanes), (s & n) !== n)) {
              (bt(), (e.pingedLanes |= e.suspendedLanes & s));
              break;
            }
            e.timeoutHandle = fc(Fn.bind(null, e, jt, Tr), t);
            break;
          }
          Fn(e, jt, Tr);
          break;
        case 4:
          if ((rn(e, n), (n & 4194240) === n)) break;
          for (t = e.eventTimes, s = -1; 0 < n; ) {
            var i = 31 - ir(n);
            ((a = 1 << i), (i = t[i]), i > s && (s = i), (n &= ~a));
          }
          if (
            ((n = s),
            (n = Ke() - n),
            (n =
              (120 > n
                ? 120
                : 480 > n
                  ? 480
                  : 1080 > n
                    ? 1080
                    : 1920 > n
                      ? 1920
                      : 3e3 > n
                        ? 3e3
                        : 4320 > n
                          ? 4320
                          : 1960 * xw(n / 1960)) - n),
            10 < n)
          ) {
            e.timeoutHandle = fc(Fn.bind(null, e, jt, Tr), n);
            break;
          }
          Fn(e, jt, Tr);
          break;
        case 5:
          Fn(e, jt, Tr);
          break;
        default:
          throw Error($(329));
      }
    }
  }
  return (Pt(e, Ke()), e.callbackNode === r ? xy.bind(null, e) : null);
}
function Pc(e, t) {
  var r = La;
  return (
    e.current.memoizedState.isDehydrated && (Wn(e, t).flags |= 256),
    (e = Qo(e, t)),
    e !== 2 && ((t = jt), (jt = r), t !== null && Rc(t)),
    e
  );
}
function Rc(e) {
  jt === null ? (jt = e) : jt.push.apply(jt, e);
}
function ww(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && ((r = r.stores), r !== null))
        for (var n = 0; n < r.length; n++) {
          var s = r[n],
            a = s.getSnapshot;
          s = s.value;
          try {
            if (!cr(a(), s)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((r = t.child), t.subtreeFlags & 16384 && r !== null))
      ((r.return = t), (t = r));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function rn(e, t) {
  for (
    t &= ~of,
      t &= ~Al,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var r = 31 - ir(t),
      n = 1 << r;
    ((e[r] = -1), (t &= ~n));
  }
}
function qh(e) {
  if (ve & 6) throw Error($(327));
  Ds();
  var t = Io(e, 0);
  if (!(t & 1)) return (Pt(e, Ke()), null);
  var r = Qo(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = sc(e);
    n !== 0 && ((t = n), (r = Pc(e, n)));
  }
  if (r === 1) throw ((r = ii), Wn(e, 0), rn(e, t), Pt(e, Ke()), r);
  if (r === 6) throw Error($(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Fn(e, jt, Tr),
    Pt(e, Ke()),
    null
  );
}
function uf(e, t) {
  var r = ve;
  ve |= 1;
  try {
    return e(t);
  } finally {
    ((ve = r), ve === 0 && ((Hs = Ke() + 500), El && In()));
  }
}
function rs(e) {
  on !== null && on.tag === 0 && !(ve & 6) && Ds();
  var t = ve;
  ve |= 1;
  var r = Gt.transition,
    n = ke;
  try {
    if (((Gt.transition = null), (ke = 1), e)) return e();
  } finally {
    ((ke = n), (Gt.transition = r), (ve = t), !(ve & 6) && In());
  }
}
function cf() {
  ((Lt = js.current), Ie(js));
}
function Wn(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var r = e.timeoutHandle;
  if ((r !== -1 && ((e.timeoutHandle = -1), G0(r)), qe !== null))
    for (r = qe.return; r !== null; ) {
      var n = r;
      switch ((Bd(n), n.tag)) {
        case 1:
          ((n = n.type.childContextTypes), n != null && Lo());
          break;
        case 3:
          (Bs(), Ie(At), Ie(pt), Jd());
          break;
        case 5:
          Yd(n);
          break;
        case 4:
          Bs();
          break;
        case 13:
          Ie(Le);
          break;
        case 19:
          Ie(Le);
          break;
        case 10:
          qd(n.type._context);
          break;
        case 22:
        case 23:
          cf();
      }
      r = r.return;
    }
  if (
    ((tt = e),
    (qe = e = gn(e.current, null)),
    (at = Lt = t),
    (Je = 0),
    (ii = null),
    (of = Al = ts = 0),
    (jt = La = null),
    zn !== null)
  ) {
    for (t = 0; t < zn.length; t++)
      if (((r = zn[t]), (n = r.interleaved), n !== null)) {
        r.interleaved = null;
        var s = n.next,
          a = r.pending;
        if (a !== null) {
          var i = a.next;
          ((a.next = s), (n.next = i));
        }
        r.pending = n;
      }
    zn = null;
  }
  return e;
}
function wy(e, t) {
  do {
    var r = qe;
    try {
      if ((Wd(), (fo.current = Ho), Ko)) {
        for (var n = Ve.memoizedState; n !== null; ) {
          var s = n.queue;
          (s !== null && (s.pending = null), (n = n.next));
        }
        Ko = !1;
      }
      if (
        ((es = 0),
        (et = Ge = Ve = null),
        (Da = !1),
        (ni = 0),
        (af.current = null),
        r === null || r.return === null)
      ) {
        ((Je = 1), (ii = t), (qe = null));
        break;
      }
      e: {
        var a = e,
          i = r.return,
          o = r,
          l = t;
        if (
          ((t = at),
          (o.flags |= 32768),
          l !== null && typeof l == 'object' && typeof l.then == 'function')
        ) {
          var c = l,
            d = o,
            h = d.tag;
          if (!(d.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var f = d.alternate;
            f
              ? ((d.updateQueue = f.updateQueue),
                (d.memoizedState = f.memoizedState),
                (d.lanes = f.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var y = Dh(i);
          if (y !== null) {
            ((y.flags &= -257),
              Oh(y, i, o, a, t),
              y.mode & 1 && Rh(a, c, t),
              (t = y),
              (l = c));
            var m = t.updateQueue;
            if (m === null) {
              var x = new Set();
              (x.add(l), (t.updateQueue = x));
            } else m.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              (Rh(a, c, t), df());
              break e;
            }
            l = Error($(426));
          }
        } else if (Oe && o.mode & 1) {
          var S = Dh(i);
          if (S !== null) {
            (!(S.flags & 65536) && (S.flags |= 256),
              Oh(S, i, o, a, t),
              Kd(Ks(l, o)));
            break e;
          }
        }
        ((a = l = Ks(l, o)),
          Je !== 4 && (Je = 2),
          La === null ? (La = [a]) : La.push(a),
          (a = i));
        do {
          switch (a.tag) {
            case 3:
              ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
              var g = ny(a, l, t);
              jh(a, g);
              break e;
            case 1:
              o = l;
              var p = a.type,
                v = a.stateNode;
              if (
                !(a.flags & 128) &&
                (typeof p.getDerivedStateFromError == 'function' ||
                  (v !== null &&
                    typeof v.componentDidCatch == 'function' &&
                    (pn === null || !pn.has(v))))
              ) {
                ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                var k = sy(a, o, t);
                jh(a, k);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      ky(r);
    } catch (b) {
      ((t = b), qe === r && r !== null && (qe = r = r.return));
      continue;
    }
    break;
  } while (!0);
}
function by() {
  var e = Wo.current;
  return ((Wo.current = Ho), e === null ? Ho : e);
}
function df() {
  ((Je === 0 || Je === 3 || Je === 2) && (Je = 4),
    tt === null || (!(ts & 268435455) && !(Al & 268435455)) || rn(tt, at));
}
function Qo(e, t) {
  var r = ve;
  ve |= 2;
  var n = by();
  (tt !== e || at !== t) && ((Tr = null), Wn(e, t));
  do
    try {
      bw();
      break;
    } catch (s) {
      wy(e, s);
    }
  while (!0);
  if ((Wd(), (ve = r), (Wo.current = n), qe !== null)) throw Error($(261));
  return ((tt = null), (at = 0), Je);
}
function bw() {
  for (; qe !== null; ) _y(qe);
}
function _w() {
  for (; qe !== null && !qx(); ) _y(qe);
}
function _y(e) {
  var t = Ny(e.alternate, e, Lt);
  ((e.memoizedProps = e.pendingProps),
    t === null ? ky(e) : (qe = t),
    (af.current = null));
}
function ky(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((r = mw(r, t)), r !== null)) {
        ((r.flags &= 32767), (qe = r));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((Je = 6), (qe = null));
        return;
      }
    } else if (((r = pw(r, t, Lt)), r !== null)) {
      qe = r;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      qe = t;
      return;
    }
    qe = t = e;
  } while (t !== null);
  Je === 0 && (Je = 5);
}
function Fn(e, t, r) {
  var n = ke,
    s = Gt.transition;
  try {
    ((Gt.transition = null), (ke = 1), kw(e, t, r, n));
  } finally {
    ((Gt.transition = s), (ke = n));
  }
  return null;
}
function kw(e, t, r, n) {
  do Ds();
  while (on !== null);
  if (ve & 6) throw Error($(327));
  r = e.finishedWork;
  var s = e.finishedLanes;
  if (r === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
    throw Error($(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var a = r.lanes | r.childLanes;
  if (
    (n0(e, a),
    e === tt && ((qe = tt = null), (at = 0)),
    (!(r.subtreeFlags & 2064) && !(r.flags & 2064)) ||
      qi ||
      ((qi = !0),
      Ey(Ao, function () {
        return (Ds(), null);
      })),
    (a = (r.flags & 15990) !== 0),
    r.subtreeFlags & 15990 || a)
  ) {
    ((a = Gt.transition), (Gt.transition = null));
    var i = ke;
    ke = 1;
    var o = ve;
    ((ve |= 4),
      (af.current = null),
      yw(e, r),
      yy(r, e),
      B0(cc),
      (Po = !!uc),
      (cc = uc = null),
      (e.current = r),
      vw(r),
      Zx(),
      (ve = o),
      (ke = i),
      (Gt.transition = a));
  } else e.current = r;
  if (
    (qi && ((qi = !1), (on = e), (Zo = s)),
    (a = e.pendingLanes),
    a === 0 && (pn = null),
    Yx(r.stateNode),
    Pt(e, Ke()),
    t !== null)
  )
    for (n = e.onRecoverableError, r = 0; r < t.length; r++)
      ((s = t[r]), n(s.value, { componentStack: s.stack, digest: s.digest }));
  if (qo) throw ((qo = !1), (e = Ac), (Ac = null), e);
  return (
    Zo & 1 && e.tag !== 0 && Ds(),
    (a = e.pendingLanes),
    a & 1 ? (e === Ic ? Ma++ : ((Ma = 0), (Ic = e))) : (Ma = 0),
    In(),
    null
  );
}
function Ds() {
  if (on !== null) {
    var e = ng(Zo),
      t = Gt.transition,
      r = ke;
    try {
      if (((Gt.transition = null), (ke = 16 > e ? 16 : e), on === null))
        var n = !1;
      else {
        if (((e = on), (on = null), (Zo = 0), ve & 6)) throw Error($(331));
        var s = ve;
        for (ve |= 4, J = e.current; J !== null; ) {
          var a = J,
            i = a.child;
          if (J.flags & 16) {
            var o = a.deletions;
            if (o !== null) {
              for (var l = 0; l < o.length; l++) {
                var c = o[l];
                for (J = c; J !== null; ) {
                  var d = J;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Oa(8, d, a);
                  }
                  var h = d.child;
                  if (h !== null) ((h.return = d), (J = h));
                  else
                    for (; J !== null; ) {
                      d = J;
                      var f = d.sibling,
                        y = d.return;
                      if ((py(d), d === c)) {
                        J = null;
                        break;
                      }
                      if (f !== null) {
                        ((f.return = y), (J = f));
                        break;
                      }
                      J = y;
                    }
                }
              }
              var m = a.alternate;
              if (m !== null) {
                var x = m.child;
                if (x !== null) {
                  m.child = null;
                  do {
                    var S = x.sibling;
                    ((x.sibling = null), (x = S));
                  } while (x !== null);
                }
              }
              J = a;
            }
          }
          if (a.subtreeFlags & 2064 && i !== null) ((i.return = a), (J = i));
          else
            e: for (; J !== null; ) {
              if (((a = J), a.flags & 2048))
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Oa(9, a, a.return);
                }
              var g = a.sibling;
              if (g !== null) {
                ((g.return = a.return), (J = g));
                break e;
              }
              J = a.return;
            }
        }
        var p = e.current;
        for (J = p; J !== null; ) {
          i = J;
          var v = i.child;
          if (i.subtreeFlags & 2064 && v !== null) ((v.return = i), (J = v));
          else
            e: for (i = p; J !== null; ) {
              if (((o = J), o.flags & 2048))
                try {
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Tl(9, o);
                  }
                } catch (b) {
                  $e(o, o.return, b);
                }
              if (o === i) {
                J = null;
                break e;
              }
              var k = o.sibling;
              if (k !== null) {
                ((k.return = o.return), (J = k));
                break e;
              }
              J = o.return;
            }
        }
        if (
          ((ve = s), In(), wr && typeof wr.onPostCommitFiberRoot == 'function')
        )
          try {
            wr.onPostCommitFiberRoot(bl, e);
          } catch {}
        n = !0;
      }
      return n;
    } finally {
      ((ke = r), (Gt.transition = t));
    }
  }
  return !1;
}
function Zh(e, t, r) {
  ((t = Ks(r, t)),
    (t = ny(e, t, 1)),
    (e = hn(e, t, 1)),
    (t = bt()),
    e !== null && (_i(e, 1, t), Pt(e, t)));
}
function $e(e, t, r) {
  if (e.tag === 3) Zh(e, e, r);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Zh(t, e, r);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof n.componentDidCatch == 'function' &&
            (pn === null || !pn.has(n)))
        ) {
          ((e = Ks(r, e)),
            (e = sy(t, e, 1)),
            (t = hn(t, e, 1)),
            (e = bt()),
            t !== null && (_i(t, 1, e), Pt(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Sw(e, t, r) {
  var n = e.pingCache;
  (n !== null && n.delete(t),
    (t = bt()),
    (e.pingedLanes |= e.suspendedLanes & r),
    tt === e &&
      (at & r) === r &&
      (Je === 4 || (Je === 3 && (at & 130023424) === at && 500 > Ke() - lf)
        ? Wn(e, 0)
        : (of |= r)),
    Pt(e, t));
}
function Sy(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Mi), (Mi <<= 1), !(Mi & 130023424) && (Mi = 4194304))
      : (t = 1));
  var r = bt();
  ((e = zr(e, t)), e !== null && (_i(e, t, r), Pt(e, r)));
}
function Nw(e) {
  var t = e.memoizedState,
    r = 0;
  (t !== null && (r = t.retryLane), Sy(e, r));
}
function Ew(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode,
        s = e.memoizedState;
      s !== null && (r = s.retryLane);
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error($(314));
  }
  (n !== null && n.delete(t), Sy(e, r));
}
var Ny;
Ny = function (e, t, r) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || At.current) Ct = !0;
    else {
      if (!(e.lanes & r) && !(t.flags & 128)) return ((Ct = !1), hw(e, t, r));
      Ct = !!(e.flags & 131072);
    }
  else ((Ct = !1), Oe && t.flags & 1048576 && Tg(t, Fo, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var n = t.type;
      (po(e, t), (e = t.pendingProps));
      var s = $s(t, pt.current);
      (Rs(t, r), (s = ef(null, t, n, e, s, r)));
      var a = tf();
      return (
        (t.flags |= 1),
        typeof s == 'object' &&
        s !== null &&
        typeof s.render == 'function' &&
        s.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            It(n) ? ((a = !0), Mo(t)) : (a = !1),
            (t.memoizedState =
              s.state !== null && s.state !== void 0 ? s.state : null),
            Qd(t),
            (s.updater = Cl),
            (t.stateNode = s),
            (s._reactInternals = t),
            xc(t, n, e, r),
            (t = _c(null, t, n, !0, a, r)))
          : ((t.tag = 0), Oe && a && zd(t), yt(null, t, s, r), (t = t.child)),
        t
      );
    case 16:
      n = t.elementType;
      e: {
        switch (
          (po(e, t),
          (e = t.pendingProps),
          (s = n._init),
          (n = s(n._payload)),
          (t.type = n),
          (s = t.tag = Cw(n)),
          (e = rr(n, e)),
          s)
        ) {
          case 0:
            t = bc(null, t, n, e, r);
            break e;
          case 1:
            t = Vh(null, t, n, e, r);
            break e;
          case 11:
            t = Lh(null, t, n, e, r);
            break e;
          case 14:
            t = Mh(null, t, n, rr(n.type, e), r);
            break e;
        }
        throw Error($(306, n, ''));
      }
      return t;
    case 0:
      return (
        (n = t.type),
        (s = t.pendingProps),
        (s = t.elementType === n ? s : rr(n, s)),
        bc(e, t, n, s, r)
      );
    case 1:
      return (
        (n = t.type),
        (s = t.pendingProps),
        (s = t.elementType === n ? s : rr(n, s)),
        Vh(e, t, n, s, r)
      );
    case 3:
      e: {
        if ((ly(t), e === null)) throw Error($(387));
        ((n = t.pendingProps),
          (a = t.memoizedState),
          (s = a.element),
          Og(e, t),
          zo(t, n, null, r));
        var i = t.memoizedState;
        if (((n = i.element), a.isDehydrated))
          if (
            ((a = {
              element: n,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = a),
            (t.memoizedState = a),
            t.flags & 256)
          ) {
            ((s = Ks(Error($(423)), t)), (t = Fh(e, t, n, r, s)));
            break e;
          } else if (n !== s) {
            ((s = Ks(Error($(424)), t)), (t = Fh(e, t, n, r, s)));
            break e;
          } else
            for (
              Mt = fn(t.stateNode.containerInfo.firstChild),
                Vt = t,
                Oe = !0,
                sr = null,
                r = Rg(t, null, n, r),
                t.child = r;
              r;

            )
              ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
        else {
          if ((Us(), n === s)) {
            t = Br(e, t, r);
            break e;
          }
          yt(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Lg(t),
        e === null && gc(t),
        (n = t.type),
        (s = t.pendingProps),
        (a = e !== null ? e.memoizedProps : null),
        (i = s.children),
        dc(n, s) ? (i = null) : a !== null && dc(n, a) && (t.flags |= 32),
        oy(e, t),
        yt(e, t, i, r),
        t.child
      );
    case 6:
      return (e === null && gc(t), null);
    case 13:
      return uy(e, t, r);
    case 4:
      return (
        Gd(t, t.stateNode.containerInfo),
        (n = t.pendingProps),
        e === null ? (t.child = zs(t, null, n, r)) : yt(e, t, n, r),
        t.child
      );
    case 11:
      return (
        (n = t.type),
        (s = t.pendingProps),
        (s = t.elementType === n ? s : rr(n, s)),
        Lh(e, t, n, s, r)
      );
    case 7:
      return (yt(e, t, t.pendingProps, r), t.child);
    case 8:
      return (yt(e, t, t.pendingProps.children, r), t.child);
    case 12:
      return (yt(e, t, t.pendingProps.children, r), t.child);
    case 10:
      e: {
        if (
          ((n = t.type._context),
          (s = t.pendingProps),
          (a = t.memoizedProps),
          (i = s.value),
          Ce($o, n._currentValue),
          (n._currentValue = i),
          a !== null)
        )
          if (cr(a.value, i)) {
            if (a.children === s.children && !At.current) {
              t = Br(e, t, r);
              break e;
            }
          } else
            for (a = t.child, a !== null && (a.return = t); a !== null; ) {
              var o = a.dependencies;
              if (o !== null) {
                i = a.child;
                for (var l = o.firstContext; l !== null; ) {
                  if (l.context === n) {
                    if (a.tag === 1) {
                      ((l = Lr(-1, r & -r)), (l.tag = 2));
                      var c = a.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var d = c.pending;
                        (d === null
                          ? (l.next = l)
                          : ((l.next = d.next), (d.next = l)),
                          (c.pending = l));
                      }
                    }
                    ((a.lanes |= r),
                      (l = a.alternate),
                      l !== null && (l.lanes |= r),
                      yc(a.return, r, t),
                      (o.lanes |= r));
                    break;
                  }
                  l = l.next;
                }
              } else if (a.tag === 10) i = a.type === t.type ? null : a.child;
              else if (a.tag === 18) {
                if (((i = a.return), i === null)) throw Error($(341));
                ((i.lanes |= r),
                  (o = i.alternate),
                  o !== null && (o.lanes |= r),
                  yc(i, r, t),
                  (i = a.sibling));
              } else i = a.child;
              if (i !== null) i.return = a;
              else
                for (i = a; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((a = i.sibling), a !== null)) {
                    ((a.return = i.return), (i = a));
                    break;
                  }
                  i = i.return;
                }
              a = i;
            }
        (yt(e, t, s.children, r), (t = t.child));
      }
      return t;
    case 9:
      return (
        (s = t.type),
        (n = t.pendingProps.children),
        Rs(t, r),
        (s = Jt(s)),
        (n = n(s)),
        (t.flags |= 1),
        yt(e, t, n, r),
        t.child
      );
    case 14:
      return (
        (n = t.type),
        (s = rr(n, t.pendingProps)),
        (s = rr(n.type, s)),
        Mh(e, t, n, s, r)
      );
    case 15:
      return ay(e, t, t.type, t.pendingProps, r);
    case 17:
      return (
        (n = t.type),
        (s = t.pendingProps),
        (s = t.elementType === n ? s : rr(n, s)),
        po(e, t),
        (t.tag = 1),
        It(n) ? ((e = !0), Mo(t)) : (e = !1),
        Rs(t, r),
        ry(t, n, s),
        xc(t, n, s, r),
        _c(null, t, n, !0, e, r)
      );
    case 19:
      return cy(e, t, r);
    case 22:
      return iy(e, t, r);
  }
  throw Error($(156, t.tag));
};
function Ey(e, t) {
  return Xm(e, t);
}
function jw(e, t, r, n) {
  ((this.tag = e),
    (this.key = r),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = n),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Qt(e, t, r, n) {
  return new jw(e, t, r, n);
}
function ff(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Cw(e) {
  if (typeof e == 'function') return ff(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Ad)) return 11;
    if (e === Id) return 14;
  }
  return 2;
}
function gn(e, t) {
  var r = e.alternate;
  return (
    r === null
      ? ((r = Qt(e.tag, t, e.key, e.mode)),
        (r.elementType = e.elementType),
        (r.type = e.type),
        (r.stateNode = e.stateNode),
        (r.alternate = e),
        (e.alternate = r))
      : ((r.pendingProps = t),
        (r.type = e.type),
        (r.flags = 0),
        (r.subtreeFlags = 0),
        (r.deletions = null)),
    (r.flags = e.flags & 14680064),
    (r.childLanes = e.childLanes),
    (r.lanes = e.lanes),
    (r.child = e.child),
    (r.memoizedProps = e.memoizedProps),
    (r.memoizedState = e.memoizedState),
    (r.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (r.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (r.sibling = e.sibling),
    (r.index = e.index),
    (r.ref = e.ref),
    r
  );
}
function yo(e, t, r, n, s, a) {
  var i = 2;
  if (((n = e), typeof e == 'function')) ff(e) && (i = 1);
  else if (typeof e == 'string') i = 5;
  else
    e: switch (e) {
      case ys:
        return qn(r.children, s, a, t);
      case Td:
        ((i = 8), (s |= 8));
        break;
      case Bu:
        return (
          (e = Qt(12, r, t, s | 2)),
          (e.elementType = Bu),
          (e.lanes = a),
          e
        );
      case Ku:
        return ((e = Qt(13, r, t, s)), (e.elementType = Ku), (e.lanes = a), e);
      case Hu:
        return ((e = Qt(19, r, t, s)), (e.elementType = Hu), (e.lanes = a), e);
      case Lm:
        return Il(r, s, a, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Dm:
              i = 10;
              break e;
            case Om:
              i = 9;
              break e;
            case Ad:
              i = 11;
              break e;
            case Id:
              i = 14;
              break e;
            case Yr:
              ((i = 16), (n = null));
              break e;
          }
        throw Error($(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = Qt(i, r, t, s)),
    (t.elementType = e),
    (t.type = n),
    (t.lanes = a),
    t
  );
}
function qn(e, t, r, n) {
  return ((e = Qt(7, e, n, t)), (e.lanes = r), e);
}
function Il(e, t, r, n) {
  return (
    (e = Qt(22, e, n, t)),
    (e.elementType = Lm),
    (e.lanes = r),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function pu(e, t, r) {
  return ((e = Qt(6, e, null, t)), (e.lanes = r), e);
}
function mu(e, t, r) {
  return (
    (t = Qt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = r),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Tw(e, t, r, n, s) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ql(0)),
    (this.expirationTimes = Ql(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ql(0)),
    (this.identifierPrefix = n),
    (this.onRecoverableError = s),
    (this.mutableSourceEagerHydrationData = null));
}
function hf(e, t, r, n, s, a, i, o, l) {
  return (
    (e = new Tw(e, t, r, o, l)),
    t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
    (a = Qt(3, null, null, t)),
    (e.current = a),
    (a.stateNode = e),
    (a.memoizedState = {
      element: n,
      isDehydrated: r,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Qd(a),
    e
  );
}
function Aw(e, t, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: gs,
    key: n == null ? null : '' + n,
    children: e,
    containerInfo: t,
    implementation: r,
  };
}
function jy(e) {
  if (!e) return kn;
  e = e._reactInternals;
  e: {
    if (os(e) !== e || e.tag !== 1) throw Error($(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (It(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error($(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (It(r)) return jg(e, r, t);
  }
  return t;
}
function Cy(e, t, r, n, s, a, i, o, l) {
  return (
    (e = hf(r, n, !0, e, s, a, i, o, l)),
    (e.context = jy(null)),
    (r = e.current),
    (n = bt()),
    (s = mn(r)),
    (a = Lr(n, s)),
    (a.callback = t ?? null),
    hn(r, a, s),
    (e.current.lanes = s),
    _i(e, s, n),
    Pt(e, n),
    e
  );
}
function Pl(e, t, r, n) {
  var s = t.current,
    a = bt(),
    i = mn(s);
  return (
    (r = jy(r)),
    t.context === null ? (t.context = r) : (t.pendingContext = r),
    (t = Lr(a, i)),
    (t.payload = { element: e }),
    (n = n === void 0 ? null : n),
    n !== null && (t.callback = n),
    (e = hn(s, t, i)),
    e !== null && (or(e, s, i, a), co(e, s, i)),
    i
  );
}
function Go(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Qh(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function pf(e, t) {
  (Qh(e, t), (e = e.alternate) && Qh(e, t));
}
function Iw() {
  return null;
}
var Ty =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function mf(e) {
  this._internalRoot = e;
}
Rl.prototype.render = mf.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error($(409));
  Pl(e, t, null, null);
};
Rl.prototype.unmount = mf.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (rs(function () {
      Pl(null, e, null, null);
    }),
      (t[Ur] = null));
  }
};
function Rl(e) {
  this._internalRoot = e;
}
Rl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ig();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < tn.length && t !== 0 && t < tn[r].priority; r++);
    (tn.splice(r, 0, e), r === 0 && lg(e));
  }
};
function gf(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Dl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function Gh() {}
function Pw(e, t, r, n, s) {
  if (s) {
    if (typeof n == 'function') {
      var a = n;
      n = function () {
        var c = Go(i);
        a.call(c);
      };
    }
    var i = Cy(t, n, e, 0, null, !1, !1, '', Gh);
    return (
      (e._reactRootContainer = i),
      (e[Ur] = i.current),
      Ja(e.nodeType === 8 ? e.parentNode : e),
      rs(),
      i
    );
  }
  for (; (s = e.lastChild); ) e.removeChild(s);
  if (typeof n == 'function') {
    var o = n;
    n = function () {
      var c = Go(l);
      o.call(c);
    };
  }
  var l = hf(e, 0, !1, null, null, !1, !1, '', Gh);
  return (
    (e._reactRootContainer = l),
    (e[Ur] = l.current),
    Ja(e.nodeType === 8 ? e.parentNode : e),
    rs(function () {
      Pl(t, l, r, n);
    }),
    l
  );
}
function Ol(e, t, r, n, s) {
  var a = r._reactRootContainer;
  if (a) {
    var i = a;
    if (typeof s == 'function') {
      var o = s;
      s = function () {
        var l = Go(i);
        o.call(l);
      };
    }
    Pl(t, i, e, s);
  } else i = Pw(r, t, e, s, n);
  return Go(i);
}
sg = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Sa(t.pendingLanes);
        r !== 0 &&
          (Dd(t, r | 1), Pt(t, Ke()), !(ve & 6) && ((Hs = Ke() + 500), In()));
      }
      break;
    case 13:
      (rs(function () {
        var n = zr(e, 1);
        if (n !== null) {
          var s = bt();
          or(n, e, 1, s);
        }
      }),
        pf(e, 1));
  }
};
Od = function (e) {
  if (e.tag === 13) {
    var t = zr(e, 134217728);
    if (t !== null) {
      var r = bt();
      or(t, e, 134217728, r);
    }
    pf(e, 134217728);
  }
};
ag = function (e) {
  if (e.tag === 13) {
    var t = mn(e),
      r = zr(e, t);
    if (r !== null) {
      var n = bt();
      or(r, e, t, n);
    }
    pf(e, t);
  }
};
ig = function () {
  return ke;
};
og = function (e, t) {
  var r = ke;
  try {
    return ((ke = e), t());
  } finally {
    ke = r;
  }
};
tc = function (e, t, r) {
  switch (t) {
    case 'input':
      if ((Zu(e, r), (t = r.name), r.type === 'radio' && t != null)) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (
          r = r.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]',
          ),
            t = 0;
          t < r.length;
          t++
        ) {
          var n = r[t];
          if (n !== e && n.form === e.form) {
            var s = Nl(n);
            if (!s) throw Error($(90));
            (Vm(n), Zu(n, s));
          }
        }
      }
      break;
    case 'textarea':
      $m(e, r);
      break;
    case 'select':
      ((t = r.value), t != null && Ts(e, !!r.multiple, t, !1));
  }
};
qm = uf;
Zm = rs;
var Rw = { usingClientEntryPoint: !1, Events: [Si, bs, Nl, Hm, Wm, uf] },
  ya = {
    findFiberByHostInstance: Un,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  Dw = {
    bundleType: ya.bundleType,
    version: ya.version,
    rendererPackageName: ya.rendererPackageName,
    rendererConfig: ya.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Hr.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Ym(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: ya.findFiberByHostInstance || Iw,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var Zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Zi.isDisabled && Zi.supportsFiber)
    try {
      ((bl = Zi.inject(Dw)), (wr = Zi));
    } catch {}
}
zt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Rw;
zt.createPortal = function (e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!gf(t)) throw Error($(200));
  return Aw(e, t, null, r);
};
zt.createRoot = function (e, t) {
  if (!gf(e)) throw Error($(299));
  var r = !1,
    n = '',
    s = Ty;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (r = !0),
      t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
    (t = hf(e, 1, !1, null, null, r, !1, n, s)),
    (e[Ur] = t.current),
    Ja(e.nodeType === 8 ? e.parentNode : e),
    new mf(t)
  );
};
zt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error($(188))
      : ((e = Object.keys(e).join(',')), Error($(268, e)));
  return ((e = Ym(t)), (e = e === null ? null : e.stateNode), e);
};
zt.flushSync = function (e) {
  return rs(e);
};
zt.hydrate = function (e, t, r) {
  if (!Dl(t)) throw Error($(200));
  return Ol(null, e, t, !0, r);
};
zt.hydrateRoot = function (e, t, r) {
  if (!gf(e)) throw Error($(405));
  var n = (r != null && r.hydratedSources) || null,
    s = !1,
    a = '',
    i = Ty;
  if (
    (r != null &&
      (r.unstable_strictMode === !0 && (s = !0),
      r.identifierPrefix !== void 0 && (a = r.identifierPrefix),
      r.onRecoverableError !== void 0 && (i = r.onRecoverableError)),
    (t = Cy(t, null, e, 1, r ?? null, s, !1, a, i)),
    (e[Ur] = t.current),
    Ja(e),
    n)
  )
    for (e = 0; e < n.length; e++)
      ((r = n[e]),
        (s = r._getVersion),
        (s = s(r._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [r, s])
          : t.mutableSourceEagerHydrationData.push(r, s));
  return new Rl(t);
};
zt.render = function (e, t, r) {
  if (!Dl(t)) throw Error($(200));
  return Ol(null, e, t, !1, r);
};
zt.unmountComponentAtNode = function (e) {
  if (!Dl(e)) throw Error($(40));
  return e._reactRootContainer
    ? (rs(function () {
        Ol(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[Ur] = null));
        });
      }),
      !0)
    : !1;
};
zt.unstable_batchedUpdates = uf;
zt.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
  if (!Dl(r)) throw Error($(200));
  if (e == null || e._reactInternals === void 0) throw Error($(38));
  return Ol(e, t, r, !1, n);
};
zt.version = '18.3.1-next-f1338f8080-20240426';
function Ay() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ay);
    } catch (e) {
      console.error(e);
    }
}
(Ay(), (Am.exports = zt));
var Iy = Am.exports,
  Yh = Iy;
((Uu.createRoot = Yh.createRoot), (Uu.hydrateRoot = Yh.hydrateRoot));
const na = C.createContext({
    location: { pathname: '/', state: void 0 },
    navigate: () => {
      throw new Error('navigate called outside of a router context');
    },
  }),
  vo = typeof window < 'u',
  yf = '__assigna_router_state__',
  Jh = (e, t) => ({ [yf]: !0, pathname: e, state: t }),
  gu = (e) => {
    if (!vo) return { pathname: yn('/'), state: void 0 };
    const { pathname: t } = window.location,
      r = e ?? window.history.state;
    if (r && r[yf]) {
      const n =
        typeof r.pathname == 'string' && r.pathname.length > 0 ? r.pathname : t;
      return { pathname: yn(n || '/'), state: r.state };
    }
    return { pathname: yn(t || '/'), state: void 0 };
  };
function yn(e) {
  return e ? (e.length > 1 && e.endsWith('/') ? e.slice(0, -1) : e) : '/';
}
function Py(e, t) {
  return yn(e) === yn(t);
}
function Ow(e, t) {
  const r = yn(e),
    n = yn(t);
  return r === '/' ? n === '/' : n === r || n.startsWith(r + '/');
}
function Lw({ children: e }) {
  const [t, r] = C.useState(() => gu());
  (C.useEffect(() => {
    if (!vo) return;
    const a = () => {
      r(gu());
    };
    return (
      window.addEventListener('popstate', a),
      () => window.removeEventListener('popstate', a)
    );
  }, []),
    C.useEffect(() => {
      if (!vo) return;
      const a = gu(),
        i = window.history.state;
      if (!i || i[yf] !== !0) {
        const o = a.pathname;
        window.history.replaceState(Jh(o, a.state), '', o);
      }
    }, []));
  const n = C.useCallback((a, i = {}) => {
      const o =
          typeof a == 'string' ? a : ((a == null ? void 0 : a.pathname) ?? '/'),
        l = yn(o),
        c = i.state;
      if (vo) {
        const d = Jh(l, c);
        (i.replace
          ? window.history.replaceState(d, '', l)
          : window.history.pushState(d, '', l),
          r({ pathname: l, state: c }));
      } else r({ pathname: l, state: c });
    }, []),
    s = C.useMemo(() => ({ location: t, navigate: n }), [t, n]);
  return C.createElement(na.Provider, { value: s }, e);
}
function Ry() {
  const e = C.useContext(na);
  if (!e) throw new Error('useNavigate must be used within a BrowserRouter');
  return e.navigate;
}
function Dy() {
  const e = C.useContext(na);
  if (!e) throw new Error('useLocation must be used within a BrowserRouter');
  return e.location;
}
function Dc({ to: e, replace: t = !1, state: r }) {
  const n = Ry();
  return (
    C.useEffect(() => {
      const s =
        typeof e == 'string' ? e : ((e == null ? void 0 : e.pathname) ?? '/');
      n(s, { replace: t, state: r });
    }, [n, t, r, e]),
    null
  );
}
function Mw({ children: e }) {
  const { location: t } = C.useContext(na),
    r = t.pathname,
    n = C.Children.toArray(e);
  for (const s of n) {
    if (!C.isValidElement(s)) continue;
    const { path: a = '*', element: i } = s.props || {};
    if (a === '*' || Py(a, r))
      return C.createElement(C.Fragment, null, i ?? null);
  }
  return null;
}
function Qi() {
  return null;
}
function Oy(e) {
  return typeof e == 'string' ? e : ((e == null ? void 0 : e.pathname) ?? '/');
}
function Ly(e) {
  return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
}
function My({ to: e, onClick: t, replace: r = !1, state: n, ...s }) {
  const { navigate: a } = C.useContext(na),
    i = Oy(e),
    o = (l) => {
      (t && t(l),
        !(
          l.defaultPrevented ||
          l.button !== 0 ||
          (s.target && s.target !== '_self') ||
          Ly(l)
        ) && (l.preventDefault(), a(i, { replace: r, state: n })));
    };
  return C.createElement('a', { ...s, href: i, onClick: o });
}
function Vw({
  to: e,
  className: t,
  children: r,
  end: n = !1,
  onClick: s,
  state: a,
  ...i
}) {
  const { location: o, navigate: l } = C.useContext(na),
    c = Oy(e),
    d = n ? Py(c, o.pathname) : Ow(c, o.pathname),
    h =
      typeof t == 'function'
        ? (t({ isActive: d, isPending: !1 }) ?? void 0)
        : t,
    f = typeof r == 'function' ? r({ isActive: d, isPending: !1 }) : r,
    y = (m) => {
      (s && s(m),
        !(
          m.defaultPrevented ||
          m.button !== 0 ||
          (i.target && i.target !== '_self') ||
          Ly(m)
        ) && (m.preventDefault(), l(c, { state: a })));
    };
  return C.createElement(
    'a',
    {
      ...i,
      href: c,
      className: h,
      'aria-current': d ? 'page' : void 0,
      onClick: y,
    },
    f,
  );
}
const Fw = (e, t, r, n) => {
    var a, i, o, l;
    const s = [r, { code: t, ...(n || {}) }];
    if (
      (i = (a = e == null ? void 0 : e.services) == null ? void 0 : a.logger) !=
        null &&
      i.forward
    )
      return e.services.logger.forward(s, 'warn', 'react-i18next::', !0);
    (Zn(s[0]) && (s[0] = `react-i18next:: ${s[0]}`),
      (l = (o = e == null ? void 0 : e.services) == null ? void 0 : o.logger) !=
        null && l.warn
        ? e.services.logger.warn(...s)
        : console != null && console.warn && console.warn(...s));
  },
  Xh = {},
  Oc = (e, t, r, n) => {
    (Zn(r) && Xh[r]) || (Zn(r) && (Xh[r] = new Date()), Fw(e, t, r, n));
  },
  Vy = (e, t) => () => {
    if (e.isInitialized) t();
    else {
      const r = () => {
        (setTimeout(() => {
          e.off('initialized', r);
        }, 0),
          t());
      };
      e.on('initialized', r);
    }
  },
  Lc = (e, t, r) => {
    e.loadNamespaces(t, Vy(e, r));
  },
  ep = (e, t, r, n) => {
    if (
      (Zn(r) && (r = [r]),
      e.options.preload && e.options.preload.indexOf(t) > -1)
    )
      return Lc(e, r, n);
    (r.forEach((s) => {
      e.options.ns.indexOf(s) < 0 && e.options.ns.push(s);
    }),
      e.loadLanguages(t, Vy(e, n)));
  },
  $w = (e, t, r = {}) =>
    !t.languages || !t.languages.length
      ? (Oc(t, 'NO_LANGUAGES', 'i18n.languages were undefined or empty', {
          languages: t.languages,
        }),
        !0)
      : t.hasLoadedNamespace(e, {
          lng: r.lng,
          precheck: (n, s) => {
            if (
              r.bindI18n &&
              r.bindI18n.indexOf('languageChanging') > -1 &&
              n.services.backendConnector.backend &&
              n.isLanguageChangingTo &&
              !s(n.isLanguageChangingTo, e)
            )
              return !1;
          },
        }),
  Zn = (e) => typeof e == 'string',
  Uw = (e) => typeof e == 'object' && e !== null,
  zw =
    /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
  Bw = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
    '&nbsp;': ' ',
    '&#160;': ' ',
    '&copy;': '©',
    '&#169;': '©',
    '&reg;': '®',
    '&#174;': '®',
    '&hellip;': '…',
    '&#8230;': '…',
    '&#x2F;': '/',
    '&#47;': '/',
  },
  Kw = (e) => Bw[e],
  Hw = (e) => e.replace(zw, Kw);
let Mc = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: !0,
  unescape: Hw,
};
const Ww = (e = {}) => {
    Mc = { ...Mc, ...e };
  },
  qw = () => Mc;
let Fy;
const Zw = (e) => {
    Fy = e;
  },
  Qw = () => Fy,
  Gw = {
    type: '3rdParty',
    init(e) {
      (Ww(e.options.react), Zw(e));
    },
  },
  Yw = C.createContext();
class Jw {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((r) => {
      this.usedNamespaces[r] || (this.usedNamespaces[r] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const Xw = (e, t) => {
    const r = C.useRef();
    return (
      C.useEffect(() => {
        r.current = e;
      }, [e, t]),
      r.current
    );
  },
  $y = (e, t, r, n) => e.getFixedT(t, r, n),
  eb = (e, t, r, n) => C.useCallback($y(e, t, r, n), [e, t, r, n]),
  Ue = (e, t = {}) => {
    var k, b, _, w;
    const { i18n: r } = t,
      { i18n: n, defaultNS: s } = C.useContext(Yw) || {},
      a = r || n || Qw();
    if ((a && !a.reportNamespaces && (a.reportNamespaces = new Jw()), !a)) {
      Oc(
        a,
        'NO_I18NEXT_INSTANCE',
        'useTranslation: You will need to pass in an i18next instance by using initReactI18next',
      );
      const N = (T, D) =>
          Zn(D)
            ? D
            : Uw(D) && Zn(D.defaultValue)
              ? D.defaultValue
              : Array.isArray(T)
                ? T[T.length - 1]
                : T,
        j = [N, {}, !1];
      return ((j.t = N), (j.i18n = {}), (j.ready = !1), j);
    }
    (k = a.options.react) != null &&
      k.wait &&
      Oc(
        a,
        'DEPRECATED_OPTION',
        'useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.',
      );
    const i = { ...qw(), ...a.options.react, ...t },
      { useSuspense: o, keyPrefix: l } = i;
    let c = s || ((b = a.options) == null ? void 0 : b.defaultNS);
    ((c = Zn(c) ? [c] : c || ['translation']),
      (w = (_ = a.reportNamespaces).addUsedNamespaces) == null || w.call(_, c));
    const d =
        (a.isInitialized || a.initializedStoreOnce) &&
        c.every((N) => $w(N, a, i)),
      h = eb(a, t.lng || null, i.nsMode === 'fallback' ? c : c[0], l),
      f = () => h,
      y = () => $y(a, t.lng || null, i.nsMode === 'fallback' ? c : c[0], l),
      [m, x] = C.useState(f);
    let S = c.join();
    t.lng && (S = `${t.lng}${S}`);
    const g = Xw(S),
      p = C.useRef(!0);
    (C.useEffect(() => {
      const { bindI18n: N, bindI18nStore: j } = i;
      ((p.current = !0),
        !d &&
          !o &&
          (t.lng
            ? ep(a, t.lng, c, () => {
                p.current && x(y);
              })
            : Lc(a, c, () => {
                p.current && x(y);
              })),
        d && g && g !== S && p.current && x(y));
      const T = () => {
        p.current && x(y);
      };
      return (
        N && (a == null || a.on(N, T)),
        j && (a == null || a.store.on(j, T)),
        () => {
          ((p.current = !1),
            a && N && (N == null || N.split(' ').forEach((D) => a.off(D, T))),
            j && a && j.split(' ').forEach((D) => a.store.off(D, T)));
        }
      );
    }, [a, S]),
      C.useEffect(() => {
        p.current && d && x(f);
      }, [a, l, d]));
    const v = [m, a, d];
    if (((v.t = m), (v.i18n = a), (v.ready = d), d || (!d && !o))) return v;
    throw new Promise((N) => {
      t.lng ? ep(a, t.lng, c, () => N()) : Lc(a, c, () => N());
    });
  },
  Ae =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : global,
  Ze = Object.keys,
  ht = Array.isArray;
function _t(e, t) {
  return (
    typeof t != 'object' ||
      Ze(t).forEach(function (r) {
        e[r] = t[r];
      }),
    e
  );
}
typeof Promise > 'u' || Ae.Promise || (Ae.Promise = Promise);
const oi = Object.getPrototypeOf,
  tb = {}.hasOwnProperty;
function $t(e, t) {
  return tb.call(e, t);
}
function Ws(e, t) {
  (typeof t == 'function' && (t = t(oi(e))),
    (typeof Reflect > 'u' ? Ze : Reflect.ownKeys)(t).forEach((r) => {
      Mr(e, r, t[r]);
    }));
}
const Uy = Object.defineProperty;
function Mr(e, t, r, n) {
  Uy(
    e,
    t,
    _t(
      r && $t(r, 'get') && typeof r.get == 'function'
        ? { get: r.get, set: r.set, configurable: !0 }
        : { value: r, configurable: !0, writable: !0 },
      n,
    ),
  );
}
function Os(e) {
  return {
    from: function (t) {
      return (
        (e.prototype = Object.create(t.prototype)),
        Mr(e.prototype, 'constructor', e),
        { extend: Ws.bind(null, e.prototype) }
      );
    },
  };
}
const rb = Object.getOwnPropertyDescriptor;
function vf(e, t) {
  let r;
  return rb(e, t) || ((r = oi(e)) && vf(r, t));
}
const nb = [].slice;
function Yo(e, t, r) {
  return nb.call(e, t, r);
}
function zy(e, t) {
  return t(e);
}
function Ea(e) {
  if (!e) throw new Error('Assertion Failed');
}
function By(e) {
  Ae.setImmediate ? setImmediate(e) : setTimeout(e, 0);
}
function Ky(e, t) {
  return e.reduce((r, n, s) => {
    var a = t(n, s);
    return (a && (r[a[0]] = a[1]), r);
  }, {});
}
function Vr(e, t) {
  if (typeof t == 'string' && $t(e, t)) return e[t];
  if (!t) return e;
  if (typeof t != 'string') {
    for (var r = [], n = 0, s = t.length; n < s; ++n) {
      var a = Vr(e, t[n]);
      r.push(a);
    }
    return r;
  }
  var i = t.indexOf('.');
  if (i !== -1) {
    var o = e[t.substr(0, i)];
    return o == null ? void 0 : Vr(o, t.substr(i + 1));
  }
}
function lr(e, t, r) {
  if (e && t !== void 0 && (!('isFrozen' in Object) || !Object.isFrozen(e)))
    if (typeof t != 'string' && 'length' in t) {
      Ea(typeof r != 'string' && 'length' in r);
      for (var n = 0, s = t.length; n < s; ++n) lr(e, t[n], r[n]);
    } else {
      var a = t.indexOf('.');
      if (a !== -1) {
        var i = t.substr(0, a),
          o = t.substr(a + 1);
        if (o === '')
          r === void 0
            ? ht(e) && !isNaN(parseInt(i))
              ? e.splice(i, 1)
              : delete e[i]
            : (e[i] = r);
        else {
          var l = e[i];
          ((l && $t(e, i)) || (l = e[i] = {}), lr(l, o, r));
        }
      } else
        r === void 0
          ? ht(e) && !isNaN(parseInt(t))
            ? e.splice(t, 1)
            : delete e[t]
          : (e[t] = r);
    }
}
function Hy(e) {
  var t = {};
  for (var r in e) $t(e, r) && (t[r] = e[r]);
  return t;
}
const sb = [].concat;
function Wy(e) {
  return sb.apply([], e);
}
const qy =
    'BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey'
      .split(',')
      .concat(
        Wy(
          [8, 16, 32, 64].map((e) =>
            ['Int', 'Uint', 'Float'].map((t) => t + e + 'Array'),
          ),
        ),
      )
      .filter((e) => Ae[e]),
  ab = qy.map((e) => Ae[e]);
Ky(qy, (e) => [e, !0]);
let Xr = null;
function Ei(e) {
  Xr = typeof WeakMap < 'u' && new WeakMap();
  const t = Vc(e);
  return ((Xr = null), t);
}
function Vc(e) {
  if (!e || typeof e != 'object') return e;
  let t = Xr && Xr.get(e);
  if (t) return t;
  if (ht(e)) {
    ((t = []), Xr && Xr.set(e, t));
    for (var r = 0, n = e.length; r < n; ++r) t.push(Vc(e[r]));
  } else if (ab.indexOf(e.constructor) >= 0) t = e;
  else {
    const a = oi(e);
    for (var s in ((t = a === Object.prototype ? {} : Object.create(a)),
    Xr && Xr.set(e, t),
    e))
      $t(e, s) && (t[s] = Vc(e[s]));
  }
  return t;
}
const { toString: ib } = {};
function Fc(e) {
  return ib.call(e).slice(8, -1);
}
const $c = typeof Symbol < 'u' ? Symbol.iterator : '@@iterator',
  ob =
    typeof $c == 'symbol'
      ? function (e) {
          var t;
          return e != null && (t = e[$c]) && t.apply(e);
        }
      : function () {
          return null;
        },
  ps = {};
function Pr(e) {
  var t, r, n, s;
  if (arguments.length === 1) {
    if (ht(e)) return e.slice();
    if (this === ps && typeof e == 'string') return [e];
    if ((s = ob(e))) {
      for (r = []; !(n = s.next()).done; ) r.push(n.value);
      return r;
    }
    if (e == null) return [e];
    if (typeof (t = e.length) == 'number') {
      for (r = new Array(t); t--; ) r[t] = e[t];
      return r;
    }
    return [e];
  }
  for (t = arguments.length, r = new Array(t); t--; ) r[t] = arguments[t];
  return r;
}
const xf =
  typeof Symbol < 'u'
    ? (e) => e[Symbol.toStringTag] === 'AsyncFunction'
    : () => !1;
var Sr =
  typeof location < 'u' &&
  /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function Zy(e, t) {
  ((Sr = e), (Qy = t));
}
var Qy = () => !0;
const lb = !new Error('').stack;
function ls() {
  if (lb)
    try {
      throw (ls.arguments, new Error());
    } catch (e) {
      return e;
    }
  return new Error();
}
function Uc(e, t) {
  var r = e.stack;
  return r
    ? ((t = t || 0),
      r.indexOf(e.name) === 0 &&
        (t += (e.name + e.message).split(`
`).length),
      r
        .split(
          `
`,
        )
        .slice(t)
        .filter(Qy)
        .map(
          (n) =>
            `
` + n,
        )
        .join(''))
    : '';
}
var Gy = [
    'Unknown',
    'Constraint',
    'Data',
    'TransactionInactive',
    'ReadOnly',
    'Version',
    'NotFound',
    'InvalidState',
    'InvalidAccess',
    'Abort',
    'Timeout',
    'QuotaExceeded',
    'Syntax',
    'DataClone',
  ],
  wf = [
    'Modify',
    'Bulk',
    'OpenFailed',
    'VersionChange',
    'Schema',
    'Upgrade',
    'InvalidTable',
    'MissingAPI',
    'NoSuchDatabase',
    'InvalidArgument',
    'SubTransaction',
    'Unsupported',
    'Internal',
    'DatabaseClosed',
    'PrematureCommit',
    'ForeignAwait',
  ].concat(Gy),
  ub = {
    VersionChanged: 'Database version changed by other database connection',
    DatabaseClosed: 'Database has been closed',
    Abort: 'Transaction aborted',
    TransactionInactive: 'Transaction has already completed or failed',
    MissingAPI:
      'IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb',
  };
function Ls(e, t) {
  ((this._e = ls()), (this.name = e), (this.message = t));
}
function Yy(e, t) {
  return (
    e +
    '. Errors: ' +
    Object.keys(t)
      .map((r) => t[r].toString())
      .filter((r, n, s) => s.indexOf(r) === n).join(`
`)
  );
}
function Jo(e, t, r, n) {
  ((this._e = ls()),
    (this.failures = t),
    (this.failedKeys = n),
    (this.successCount = r),
    (this.message = Yy(e, t)));
}
function Va(e, t) {
  ((this._e = ls()),
    (this.name = 'BulkError'),
    (this.failures = Object.keys(t).map((r) => t[r])),
    (this.failuresByPos = t),
    (this.message = Yy(e, t)));
}
(Os(Ls)
  .from(Error)
  .extend({
    stack: {
      get: function () {
        return (
          this._stack ||
          (this._stack = this.name + ': ' + this.message + Uc(this._e, 2))
        );
      },
    },
    toString: function () {
      return this.name + ': ' + this.message;
    },
  }),
  Os(Jo).from(Ls),
  Os(Va).from(Ls));
var bf = wf.reduce((e, t) => ((e[t] = t + 'Error'), e), {});
const cb = Ls;
var oe = wf.reduce((e, t) => {
  var r = t + 'Error';
  function n(s, a) {
    ((this._e = ls()),
      (this.name = r),
      s
        ? typeof s == 'string'
          ? ((this.message = `${s}${
              a
                ? `
 ` + a
                : ''
            }`),
            (this.inner = a || null))
          : typeof s == 'object' &&
            ((this.message = `${s.name} ${s.message}`), (this.inner = s))
        : ((this.message = ub[t] || r), (this.inner = null)));
  }
  return (Os(n).from(cb), (e[t] = n), e);
}, {});
((oe.Syntax = SyntaxError), (oe.Type = TypeError), (oe.Range = RangeError));
var tp = Gy.reduce((e, t) => ((e[t + 'Error'] = oe[t]), e), {}),
  xo = wf.reduce(
    (e, t) => (
      ['Syntax', 'Type', 'Range'].indexOf(t) === -1 && (e[t + 'Error'] = oe[t]),
      e
    ),
    {},
  );
function Se() {}
function li(e) {
  return e;
}
function db(e, t) {
  return e == null || e === li
    ? t
    : function (r) {
        return t(e(r));
      };
}
function ns(e, t) {
  return function () {
    (e.apply(this, arguments), t.apply(this, arguments));
  };
}
function fb(e, t) {
  return e === Se
    ? t
    : function () {
        var r = e.apply(this, arguments);
        r !== void 0 && (arguments[0] = r);
        var n = this.onsuccess,
          s = this.onerror;
        ((this.onsuccess = null), (this.onerror = null));
        var a = t.apply(this, arguments);
        return (
          n && (this.onsuccess = this.onsuccess ? ns(n, this.onsuccess) : n),
          s && (this.onerror = this.onerror ? ns(s, this.onerror) : s),
          a !== void 0 ? a : r
        );
      };
}
function hb(e, t) {
  return e === Se
    ? t
    : function () {
        e.apply(this, arguments);
        var r = this.onsuccess,
          n = this.onerror;
        ((this.onsuccess = this.onerror = null),
          t.apply(this, arguments),
          r && (this.onsuccess = this.onsuccess ? ns(r, this.onsuccess) : r),
          n && (this.onerror = this.onerror ? ns(n, this.onerror) : n));
      };
}
function pb(e, t) {
  return e === Se
    ? t
    : function (r) {
        var n = e.apply(this, arguments);
        _t(r, n);
        var s = this.onsuccess,
          a = this.onerror;
        ((this.onsuccess = null), (this.onerror = null));
        var i = t.apply(this, arguments);
        return (
          s && (this.onsuccess = this.onsuccess ? ns(s, this.onsuccess) : s),
          a && (this.onerror = this.onerror ? ns(a, this.onerror) : a),
          n === void 0 ? (i === void 0 ? void 0 : i) : _t(n, i)
        );
      };
}
function mb(e, t) {
  return e === Se
    ? t
    : function () {
        return t.apply(this, arguments) !== !1 && e.apply(this, arguments);
      };
}
function _f(e, t) {
  return e === Se
    ? t
    : function () {
        var r = e.apply(this, arguments);
        if (r && typeof r.then == 'function') {
          for (var n = this, s = arguments.length, a = new Array(s); s--; )
            a[s] = arguments[s];
          return r.then(function () {
            return t.apply(n, a);
          });
        }
        return t.apply(this, arguments);
      };
}
((xo.ModifyError = Jo), (xo.DexieError = Ls), (xo.BulkError = Va));
var ui = {};
const Jy = 100,
  [zc, Xo, Bc] =
    typeof Promise > 'u'
      ? []
      : (() => {
          let e = Promise.resolve();
          if (typeof crypto > 'u' || !crypto.subtle) return [e, oi(e), e];
          const t = crypto.subtle.digest('SHA-512', new Uint8Array([0]));
          return [t, oi(t), e];
        })(),
  Xy = Xo && Xo.then,
  wo = zc && zc.constructor,
  kf = !!Bc;
var Kc = !1,
  gb = Bc
    ? () => {
        Bc.then(Gi);
      }
    : Ae.setImmediate
      ? setImmediate.bind(null, Gi)
      : Ae.MutationObserver
        ? () => {
            var e = document.createElement('div');
            (new MutationObserver(() => {
              (Gi(), (e = null));
            }).observe(e, { attributes: !0 }),
              e.setAttribute('i', '1'));
          }
        : () => {
            setTimeout(Gi, 0);
          },
  Fa = function (e, t) {
    (ja.push([e, t]), el && (gb(), (el = !1)));
  },
  Hc = !0,
  el = !0,
  Qn = [],
  bo = [],
  Wc = null,
  qc = li,
  Ms = {
    id: 'global',
    global: !0,
    ref: 0,
    unhandleds: [],
    onunhandled: sp,
    pgp: !1,
    env: {},
    finalize: function () {
      this.unhandleds.forEach((e) => {
        try {
          sp(e[0], e[1]);
        } catch {}
      });
    },
  },
  se = Ms,
  ja = [],
  Gn = 0,
  _o = [];
function Y(e) {
  if (typeof this != 'object')
    throw new TypeError('Promises must be constructed via new');
  ((this._listeners = []), (this.onuncatched = Se), (this._lib = !1));
  var t = (this._PSD = se);
  if (
    (Sr &&
      ((this._stackHolder = ls()), (this._prev = null), (this._numPrev = 0)),
    typeof e != 'function')
  ) {
    if (e !== ui) throw new TypeError('Not a function');
    return (
      (this._state = arguments[1]),
      (this._value = arguments[2]),
      void (this._state === !1 && Qc(this, this._value))
    );
  }
  ((this._state = null), (this._value = null), ++t.ref, tv(this, e));
}
const Zc = {
  get: function () {
    var e = se,
      t = tl;
    function r(n, s) {
      var a = !e.global && (e !== se || t !== tl);
      const i = a && !Kr();
      var o = new Y((l, c) => {
        Sf(this, new ev(rl(n, e, a, i), rl(s, e, a, i), l, c, e));
      });
      return (Sr && sv(o, this), o);
    }
    return ((r.prototype = ui), r);
  },
  set: function (e) {
    Mr(
      this,
      'then',
      e && e.prototype === ui
        ? Zc
        : {
            get: function () {
              return e;
            },
            set: Zc.set,
          },
    );
  },
};
function ev(e, t, r, n, s) {
  ((this.onFulfilled = typeof e == 'function' ? e : null),
    (this.onRejected = typeof t == 'function' ? t : null),
    (this.resolve = r),
    (this.reject = n),
    (this.psd = s));
}
function tv(e, t) {
  try {
    t(
      (r) => {
        if (e._state === null) {
          if (r === e)
            throw new TypeError('A promise cannot be resolved with itself.');
          var n = e._lib && ji();
          (r && typeof r.then == 'function'
            ? tv(e, (s, a) => {
                r instanceof Y ? r._then(s, a) : r.then(s, a);
              })
            : ((e._state = !0), (e._value = r), rv(e)),
            n && Ci());
        }
      },
      Qc.bind(null, e),
    );
  } catch (r) {
    Qc(e, r);
  }
}
function Qc(e, t) {
  if ((bo.push(t), e._state === null)) {
    var r = e._lib && ji();
    ((t = qc(t)),
      (e._state = !1),
      (e._value = t),
      Sr &&
        t !== null &&
        typeof t == 'object' &&
        !t._promise &&
        (function (n, s, a) {
          try {
            n.apply(null, a);
          } catch {}
        })(() => {
          var n = vf(t, 'stack');
          ((t._promise = e),
            Mr(t, 'stack', {
              get: () =>
                Kc ? n && (n.get ? n.get.apply(t) : n.value) : e.stack,
            }));
        }),
      (function (n) {
        Qn.some((s) => s._value === n._value) || Qn.push(n);
      })(e),
      rv(e),
      r && Ci());
  }
}
function rv(e) {
  var t = e._listeners;
  e._listeners = [];
  for (var r = 0, n = t.length; r < n; ++r) Sf(e, t[r]);
  var s = e._PSD;
  (--s.ref || s.finalize(),
    Gn === 0 &&
      (++Gn,
      Fa(() => {
        --Gn == 0 && Nf();
      }, [])));
}
function Sf(e, t) {
  if (e._state !== null) {
    var r = e._state ? t.onFulfilled : t.onRejected;
    if (r === null) return (e._state ? t.resolve : t.reject)(e._value);
    (++t.psd.ref, ++Gn, Fa(yb, [r, e, t]));
  } else e._listeners.push(t);
}
function yb(e, t, r) {
  try {
    Wc = t;
    var n,
      s = t._value;
    (t._state
      ? (n = e(s))
      : (bo.length && (bo = []),
        (n = e(s)),
        bo.indexOf(s) === -1 &&
          (function (a) {
            for (var i = Qn.length; i; )
              if (Qn[--i]._value === a._value) return void Qn.splice(i, 1);
          })(t)),
      r.resolve(n));
  } catch (a) {
    r.reject(a);
  } finally {
    ((Wc = null), --Gn == 0 && Nf(), --r.psd.ref || r.psd.finalize());
  }
}
function nv(e, t, r) {
  if (t.length === r) return t;
  var n = '';
  if (e._state === !1) {
    var s,
      a,
      i = e._value;
    (i != null
      ? ((s = i.name || 'Error'), (a = i.message || i), (n = Uc(i, 0)))
      : ((s = i), (a = '')),
      t.push(s + (a ? ': ' + a : '') + n));
  }
  return (
    Sr &&
      ((n = Uc(e._stackHolder, 2)) && t.indexOf(n) === -1 && t.push(n),
      e._prev && nv(e._prev, t, r)),
    t
  );
}
function sv(e, t) {
  var r = t ? t._numPrev + 1 : 0;
  r < 100 && ((e._prev = t), (e._numPrev = r));
}
function Gi() {
  ji() && Ci();
}
function ji() {
  var e = Hc;
  return ((Hc = !1), (el = !1), e);
}
function Ci() {
  var e, t, r;
  do
    for (; ja.length > 0; )
      for (e = ja, ja = [], r = e.length, t = 0; t < r; ++t) {
        var n = e[t];
        n[0].apply(null, n[1]);
      }
  while (ja.length > 0);
  ((Hc = !0), (el = !0));
}
function Nf() {
  var e = Qn;
  ((Qn = []),
    e.forEach((n) => {
      n._PSD.onunhandled.call(null, n._value, n);
    }));
  for (var t = _o.slice(0), r = t.length; r; ) t[--r]();
}
function Yi(e) {
  return new Y(ui, !1, e);
}
function Re(e, t) {
  var r = se;
  return function () {
    var n = ji(),
      s = se;
    try {
      return (Nn(r, !0), e.apply(this, arguments));
    } catch (a) {
      t && t(a);
    } finally {
      (Nn(s, !1), n && Ci());
    }
  };
}
(Ws(Y.prototype, {
  then: Zc,
  _then: function (e, t) {
    Sf(this, new ev(null, null, e, t, se));
  },
  catch: function (e) {
    if (arguments.length === 1) return this.then(null, e);
    var t = arguments[0],
      r = arguments[1];
    return typeof t == 'function'
      ? this.then(null, (n) => (n instanceof t ? r(n) : Yi(n)))
      : this.then(null, (n) => (n && n.name === t ? r(n) : Yi(n)));
  },
  finally: function (e) {
    return this.then(
      (t) => (e(), t),
      (t) => (e(), Yi(t)),
    );
  },
  stack: {
    get: function () {
      if (this._stack) return this._stack;
      try {
        Kc = !0;
        var e = nv(this, [], 20).join(`
From previous: `);
        return (this._state !== null && (this._stack = e), e);
      } finally {
        Kc = !1;
      }
    },
  },
  timeout: function (e, t) {
    return e < 1 / 0
      ? new Y((r, n) => {
          var s = setTimeout(() => n(new oe.Timeout(t)), e);
          this.then(r, n).finally(clearTimeout.bind(null, s));
        })
      : this;
  },
}),
  typeof Symbol < 'u' &&
    Symbol.toStringTag &&
    Mr(Y.prototype, Symbol.toStringTag, 'Dexie.Promise'),
  (Ms.env = av()),
  Ws(Y, {
    all: function () {
      var e = Pr.apply(null, arguments).map(Ji);
      return new Y(function (t, r) {
        e.length === 0 && t([]);
        var n = e.length;
        e.forEach((s, a) =>
          Y.resolve(s).then((i) => {
            ((e[a] = i), --n || t(e));
          }, r),
        );
      });
    },
    resolve: (e) => {
      if (e instanceof Y) return e;
      if (e && typeof e.then == 'function')
        return new Y((r, n) => {
          e.then(r, n);
        });
      var t = new Y(ui, !0, e);
      return (sv(t, Wc), t);
    },
    reject: Yi,
    race: function () {
      var e = Pr.apply(null, arguments).map(Ji);
      return new Y((t, r) => {
        e.map((n) => Y.resolve(n).then(t, r));
      });
    },
    PSD: { get: () => se, set: (e) => (se = e) },
    totalEchoes: { get: () => tl },
    newPSD: Sn,
    usePSD: aa,
    scheduler: {
      get: () => Fa,
      set: (e) => {
        Fa = e;
      },
    },
    rejectionMapper: {
      get: () => qc,
      set: (e) => {
        qc = e;
      },
    },
    follow: (e, t) =>
      new Y((r, n) =>
        Sn(
          (s, a) => {
            var i = se;
            ((i.unhandleds = []),
              (i.onunhandled = a),
              (i.finalize = ns(function () {
                (function (o) {
                  function l() {
                    (o(), _o.splice(_o.indexOf(l), 1));
                  }
                  (_o.push(l),
                    ++Gn,
                    Fa(() => {
                      --Gn == 0 && Nf();
                    }, []));
                })(() => {
                  this.unhandleds.length === 0 ? s() : a(this.unhandleds[0]);
                });
              }, i.finalize)),
              e());
          },
          t,
          r,
          n,
        ),
      ),
  }),
  wo &&
    (wo.allSettled &&
      Mr(Y, 'allSettled', function () {
        const e = Pr.apply(null, arguments).map(Ji);
        return new Y((t) => {
          e.length === 0 && t([]);
          let r = e.length;
          const n = new Array(r);
          e.forEach((s, a) =>
            Y.resolve(s)
              .then(
                (i) => (n[a] = { status: 'fulfilled', value: i }),
                (i) => (n[a] = { status: 'rejected', reason: i }),
              )
              .then(() => --r || t(n)),
          );
        });
      }),
    wo.any &&
      typeof AggregateError < 'u' &&
      Mr(Y, 'any', function () {
        const e = Pr.apply(null, arguments).map(Ji);
        return new Y((t, r) => {
          e.length === 0 && r(new AggregateError([]));
          let n = e.length;
          const s = new Array(n);
          e.forEach((a, i) =>
            Y.resolve(a).then(
              (o) => t(o),
              (o) => {
                ((s[i] = o), --n || r(new AggregateError(s)));
              },
            ),
          );
        });
      })));
const ft = { awaits: 0, echoes: 0, id: 0 };
var vb = 0,
  ko = [],
  yu = 0,
  tl = 0,
  xb = 0;
function Sn(e, t, r, n) {
  var s = se,
    a = Object.create(s);
  ((a.parent = s), (a.ref = 0), (a.global = !1), (a.id = ++xb));
  var i = Ms.env;
  ((a.env = kf
    ? {
        Promise: Y,
        PromiseProp: { value: Y, configurable: !0, writable: !0 },
        all: Y.all,
        race: Y.race,
        allSettled: Y.allSettled,
        any: Y.any,
        resolve: Y.resolve,
        reject: Y.reject,
        nthen: rp(i.nthen, a),
        gthen: rp(i.gthen, a),
      }
    : {}),
    t && _t(a, t),
    ++s.ref,
    (a.finalize = function () {
      --this.parent.ref || this.parent.finalize();
    }));
  var o = aa(a, e, r, n);
  return (a.ref === 0 && a.finalize(), o);
}
function sa() {
  return (ft.id || (ft.id = ++vb), ++ft.awaits, (ft.echoes += Jy), ft.id);
}
function Kr() {
  return (
    !!ft.awaits &&
    (--ft.awaits == 0 && (ft.id = 0), (ft.echoes = ft.awaits * Jy), !0)
  );
}
function Ji(e) {
  return ft.echoes && e && e.constructor === wo
    ? (sa(),
      e.then(
        (t) => (Kr(), t),
        (t) => (Kr(), Xe(t)),
      ))
    : e;
}
function wb(e) {
  (++tl,
    (ft.echoes && --ft.echoes != 0) || (ft.echoes = ft.id = 0),
    ko.push(se),
    Nn(e, !0));
}
function bb() {
  var e = ko[ko.length - 1];
  (ko.pop(), Nn(e, !1));
}
function Nn(e, t) {
  var r = se;
  if (
    ((t ? !ft.echoes || (yu++ && e === se) : !yu || (--yu && e === se)) ||
      iv(t ? wb.bind(null, e) : bb),
    e !== se && ((se = e), r === Ms && (Ms.env = av()), kf))
  ) {
    var n = Ms.env.Promise,
      s = e.env;
    ((Xo.then = s.nthen),
      (n.prototype.then = s.gthen),
      (r.global || e.global) &&
        (Object.defineProperty(Ae, 'Promise', s.PromiseProp),
        (n.all = s.all),
        (n.race = s.race),
        (n.resolve = s.resolve),
        (n.reject = s.reject),
        s.allSettled && (n.allSettled = s.allSettled),
        s.any && (n.any = s.any)));
  }
}
function av() {
  var e = Ae.Promise;
  return kf
    ? {
        Promise: e,
        PromiseProp: Object.getOwnPropertyDescriptor(Ae, 'Promise'),
        all: e.all,
        race: e.race,
        allSettled: e.allSettled,
        any: e.any,
        resolve: e.resolve,
        reject: e.reject,
        nthen: Xo.then,
        gthen: e.prototype.then,
      }
    : {};
}
function aa(e, t, r, n, s) {
  var a = se;
  try {
    return (Nn(e, !0), t(r, n, s));
  } finally {
    Nn(a, !1);
  }
}
function iv(e) {
  Xy.call(zc, e);
}
function rl(e, t, r, n) {
  return typeof e != 'function'
    ? e
    : function () {
        var s = se;
        (r && sa(), Nn(t, !0));
        try {
          return e.apply(this, arguments);
        } finally {
          (Nn(s, !1), n && iv(Kr));
        }
      };
}
function rp(e, t) {
  return function (r, n) {
    return e.call(this, rl(r, t), rl(n, t));
  };
}
('' + Xy).indexOf('[native code]') === -1 && (sa = Kr = Se);
const np = 'unhandledrejection';
function sp(e, t) {
  var r;
  try {
    r = t.onuncatched(e);
  } catch {}
  if (r !== !1)
    try {
      var n,
        s = { promise: t, reason: e };
      if (
        (Ae.document && document.createEvent
          ? ((n = document.createEvent('Event')).initEvent(np, !0, !0),
            _t(n, s))
          : Ae.CustomEvent && _t((n = new CustomEvent(np, { detail: s })), s),
        n &&
          Ae.dispatchEvent &&
          (dispatchEvent(n),
          !Ae.PromiseRejectionEvent && Ae.onunhandledrejection))
      )
        try {
          Ae.onunhandledrejection(n);
        } catch {}
      Sr &&
        n &&
        !n.defaultPrevented &&
        console.warn(`Unhandled rejection: ${e.stack || e}`);
    } catch {}
}
var Xe = Y.reject;
function Gc(e, t, r, n) {
  if (e.idbdb && (e._state.openComplete || se.letThrough || e._vip)) {
    var s = e._createTransaction(t, r, e._dbSchema);
    try {
      (s.create(), (e._state.PR1398_maxLoop = 3));
    } catch (a) {
      return a.name === bf.InvalidState &&
        e.isOpen() &&
        --e._state.PR1398_maxLoop > 0
        ? (console.warn('Dexie: Need to reopen db'),
          e._close(),
          e.open().then(() => Gc(e, t, r, n)))
        : Xe(a);
    }
    return s
      ._promise(t, (a, i) => Sn(() => ((se.trans = s), n(a, i, s))))
      .then((a) => s._completion.then(() => a));
  }
  if (e._state.openComplete)
    return Xe(new oe.DatabaseClosed(e._state.dbOpenError));
  if (!e._state.isBeingOpened) {
    if (!e._options.autoOpen) return Xe(new oe.DatabaseClosed());
    e.open().catch(Se);
  }
  return e._state.dbReadyPromise.then(() => Gc(e, t, r, n));
}
const ap = '3.2.7',
  Kn = '￿',
  Yc = -1 / 0,
  jr =
    'Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.',
  ov = 'String expected.',
  $a = [],
  Ll =
    typeof navigator < 'u' && /(MSIE|Trident|Edge)/.test(navigator.userAgent),
  _b = Ll,
  kb = Ll,
  lv = (e) => !/(dexie\.js|dexie\.min\.js)/.test(e),
  Ml = '__dbnames',
  vu = 'readonly',
  xu = 'readwrite';
function ss(e, t) {
  return e
    ? t
      ? function () {
          return e.apply(this, arguments) && t.apply(this, arguments);
        }
      : e
    : t;
}
const uv = {
  type: 3,
  lower: -1 / 0,
  lowerOpen: !1,
  upper: [[]],
  upperOpen: !1,
};
function Xi(e) {
  return typeof e != 'string' || /\./.test(e)
    ? (t) => t
    : (t) => (t[e] === void 0 && e in t && delete (t = Ei(t))[e], t);
}
class Sb {
  _trans(t, r, n) {
    const s = this._tx || se.trans,
      a = this.name;
    function i(l, c, d) {
      if (!d.schema[a])
        throw new oe.NotFound('Table ' + a + ' not part of transaction');
      return r(d.idbtrans, d);
    }
    const o = ji();
    try {
      return s && s.db === this.db
        ? s === se.trans
          ? s._promise(t, i, n)
          : Sn(() => s._promise(t, i, n), {
              trans: s,
              transless: se.transless || se,
            })
        : Gc(this.db, t, [this.name], i);
    } finally {
      o && Ci();
    }
  }
  get(t, r) {
    return t && t.constructor === Object
      ? this.where(t).first(r)
      : this._trans('readonly', (n) =>
          this.core
            .get({ trans: n, key: t })
            .then((s) => this.hook.reading.fire(s)),
        ).then(r);
  }
  where(t) {
    if (typeof t == 'string') return new this.db.WhereClause(this, t);
    if (ht(t)) return new this.db.WhereClause(this, `[${t.join('+')}]`);
    const r = Ze(t);
    if (r.length === 1) return this.where(r[0]).equals(t[r[0]]);
    const n = this.schema.indexes
      .concat(this.schema.primKey)
      .filter((c) => {
        if (c.compound && r.every((d) => c.keyPath.indexOf(d) >= 0)) {
          for (let d = 0; d < r.length; ++d)
            if (r.indexOf(c.keyPath[d]) === -1) return !1;
          return !0;
        }
        return !1;
      })
      .sort((c, d) => c.keyPath.length - d.keyPath.length)[0];
    if (n && this.db._maxKey !== Kn) {
      const c = n.keyPath.slice(0, r.length);
      return this.where(c).equals(c.map((d) => t[d]));
    }
    !n &&
      Sr &&
      console.warn(
        `The query ${JSON.stringify(t)} on ${this.name} would benefit of a compound index [${r.join('+')}]`,
      );
    const { idxByName: s } = this.schema,
      a = this.db._deps.indexedDB;
    function i(c, d) {
      try {
        return a.cmp(c, d) === 0;
      } catch {
        return !1;
      }
    }
    const [o, l] = r.reduce(
      ([c, d], h) => {
        const f = s[h],
          y = t[h];
        return [
          c || f,
          c || !f
            ? ss(
                d,
                f && f.multi
                  ? (m) => {
                      const x = Vr(m, h);
                      return ht(x) && x.some((S) => i(y, S));
                    }
                  : (m) => i(y, Vr(m, h)),
              )
            : d,
        ];
      },
      [null, null],
    );
    return o
      ? this.where(o.name).equals(t[o.keyPath]).filter(l)
      : n
        ? this.filter(l)
        : this.where(r).equals('');
  }
  filter(t) {
    return this.toCollection().and(t);
  }
  count(t) {
    return this.toCollection().count(t);
  }
  offset(t) {
    return this.toCollection().offset(t);
  }
  limit(t) {
    return this.toCollection().limit(t);
  }
  each(t) {
    return this.toCollection().each(t);
  }
  toArray(t) {
    return this.toCollection().toArray(t);
  }
  toCollection() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }
  orderBy(t) {
    return new this.db.Collection(
      new this.db.WhereClause(this, ht(t) ? `[${t.join('+')}]` : t),
    );
  }
  reverse() {
    return this.toCollection().reverse();
  }
  mapToClass(t) {
    this.schema.mappedClass = t;
    const r = (n) => {
      if (!n) return n;
      const s = Object.create(t.prototype);
      for (var a in n)
        if ($t(n, a))
          try {
            s[a] = n[a];
          } catch {}
      return s;
    };
    return (
      this.schema.readHook &&
        this.hook.reading.unsubscribe(this.schema.readHook),
      (this.schema.readHook = r),
      this.hook('reading', r),
      t
    );
  }
  defineClass() {
    return this.mapToClass(function (t) {
      _t(this, t);
    });
  }
  add(t, r) {
    const { auto: n, keyPath: s } = this.schema.primKey;
    let a = t;
    return (
      s && n && (a = Xi(s)(t)),
      this._trans('readwrite', (i) =>
        this.core.mutate({
          trans: i,
          type: 'add',
          keys: r != null ? [r] : null,
          values: [a],
        }),
      )
        .then((i) => (i.numFailures ? Y.reject(i.failures[0]) : i.lastResult))
        .then((i) => {
          if (s)
            try {
              lr(t, s, i);
            } catch {}
          return i;
        })
    );
  }
  update(t, r) {
    if (typeof t != 'object' || ht(t))
      return this.where(':id').equals(t).modify(r);
    {
      const n = Vr(t, this.schema.primKey.keyPath);
      if (n === void 0)
        return Xe(
          new oe.InvalidArgument(
            'Given object does not contain its primary key',
          ),
        );
      try {
        typeof r != 'function'
          ? Ze(r).forEach((s) => {
              lr(t, s, r[s]);
            })
          : r(t, { value: t, primKey: n });
      } catch {}
      return this.where(':id').equals(n).modify(r);
    }
  }
  put(t, r) {
    const { auto: n, keyPath: s } = this.schema.primKey;
    let a = t;
    return (
      s && n && (a = Xi(s)(t)),
      this._trans('readwrite', (i) =>
        this.core.mutate({
          trans: i,
          type: 'put',
          values: [a],
          keys: r != null ? [r] : null,
        }),
      )
        .then((i) => (i.numFailures ? Y.reject(i.failures[0]) : i.lastResult))
        .then((i) => {
          if (s)
            try {
              lr(t, s, i);
            } catch {}
          return i;
        })
    );
  }
  delete(t) {
    return this._trans('readwrite', (r) =>
      this.core.mutate({ trans: r, type: 'delete', keys: [t] }),
    ).then((r) => (r.numFailures ? Y.reject(r.failures[0]) : void 0));
  }
  clear() {
    return this._trans('readwrite', (t) =>
      this.core.mutate({ trans: t, type: 'deleteRange', range: uv }),
    ).then((t) => (t.numFailures ? Y.reject(t.failures[0]) : void 0));
  }
  bulkGet(t) {
    return this._trans('readonly', (r) =>
      this.core
        .getMany({ keys: t, trans: r })
        .then((n) => n.map((s) => this.hook.reading.fire(s))),
    );
  }
  bulkAdd(t, r, n) {
    const s = Array.isArray(r) ? r : void 0,
      a = (n = n || (s ? void 0 : r)) ? n.allKeys : void 0;
    return this._trans('readwrite', (i) => {
      const { auto: o, keyPath: l } = this.schema.primKey;
      if (l && s)
        throw new oe.InvalidArgument(
          'bulkAdd(): keys argument invalid on tables with inbound keys',
        );
      if (s && s.length !== t.length)
        throw new oe.InvalidArgument(
          'Arguments objects and keys must have the same length',
        );
      const c = t.length;
      let d = l && o ? t.map(Xi(l)) : t;
      return this.core
        .mutate({ trans: i, type: 'add', keys: s, values: d, wantResults: a })
        .then(({ numFailures: h, results: f, lastResult: y, failures: m }) => {
          if (h === 0) return a ? f : y;
          throw new Va(
            `${this.name}.bulkAdd(): ${h} of ${c} operations failed`,
            m,
          );
        });
    });
  }
  bulkPut(t, r, n) {
    const s = Array.isArray(r) ? r : void 0,
      a = (n = n || (s ? void 0 : r)) ? n.allKeys : void 0;
    return this._trans('readwrite', (i) => {
      const { auto: o, keyPath: l } = this.schema.primKey;
      if (l && s)
        throw new oe.InvalidArgument(
          'bulkPut(): keys argument invalid on tables with inbound keys',
        );
      if (s && s.length !== t.length)
        throw new oe.InvalidArgument(
          'Arguments objects and keys must have the same length',
        );
      const c = t.length;
      let d = l && o ? t.map(Xi(l)) : t;
      return this.core
        .mutate({ trans: i, type: 'put', keys: s, values: d, wantResults: a })
        .then(({ numFailures: h, results: f, lastResult: y, failures: m }) => {
          if (h === 0) return a ? f : y;
          throw new Va(
            `${this.name}.bulkPut(): ${h} of ${c} operations failed`,
            m,
          );
        });
    });
  }
  bulkDelete(t) {
    const r = t.length;
    return this._trans('readwrite', (n) =>
      this.core.mutate({ trans: n, type: 'delete', keys: t }),
    ).then(({ numFailures: n, lastResult: s, failures: a }) => {
      if (n === 0) return s;
      throw new Va(
        `${this.name}.bulkDelete(): ${n} of ${r} operations failed`,
        a,
      );
    });
  }
}
function Ua(e) {
  var t = {},
    r = function (i, o) {
      if (o) {
        for (var l = arguments.length, c = new Array(l - 1); --l; )
          c[l - 1] = arguments[l];
        return (t[i].subscribe.apply(null, c), e);
      }
      if (typeof i == 'string') return t[i];
    };
  r.addEventType = a;
  for (var n = 1, s = arguments.length; n < s; ++n) a(arguments[n]);
  return r;
  function a(i, o, l) {
    if (typeof i != 'object') {
      var c;
      (o || (o = mb), l || (l = Se));
      var d = {
        subscribers: [],
        fire: l,
        subscribe: function (h) {
          d.subscribers.indexOf(h) === -1 &&
            (d.subscribers.push(h), (d.fire = o(d.fire, h)));
        },
        unsubscribe: function (h) {
          ((d.subscribers = d.subscribers.filter(function (f) {
            return f !== h;
          })),
            (d.fire = d.subscribers.reduce(o, l)));
        },
      };
      return ((t[i] = r[i] = d), d);
    }
    Ze((c = i)).forEach(function (h) {
      var f = c[h];
      if (ht(f)) a(h, c[h][0], c[h][1]);
      else {
        if (f !== 'asap') throw new oe.InvalidArgument('Invalid event config');
        var y = a(h, li, function () {
          for (var m = arguments.length, x = new Array(m); m--; )
            x[m] = arguments[m];
          y.subscribers.forEach(function (S) {
            By(function () {
              S.apply(null, x);
            });
          });
        });
      }
    });
  }
}
function va(e, t) {
  return (Os(t).from({ prototype: e }), t);
}
function cs(e, t) {
  return (
    !(e.filter || e.algorithm || e.or) && (t ? e.justLimit : !e.replayFilter)
  );
}
function wu(e, t) {
  e.filter = ss(e.filter, t);
}
function bu(e, t, r) {
  var n = e.replayFilter;
  ((e.replayFilter = n ? () => ss(n(), t()) : t), (e.justLimit = r && !n));
}
function So(e, t) {
  if (e.isPrimKey) return t.primaryKey;
  const r = t.getIndexByKeyPath(e.index);
  if (!r)
    throw new oe.Schema(
      'KeyPath ' + e.index + ' on object store ' + t.name + ' is not indexed',
    );
  return r;
}
function ip(e, t, r) {
  const n = So(e, t.schema);
  return t.openCursor({
    trans: r,
    values: !e.keysOnly,
    reverse: e.dir === 'prev',
    unique: !!e.unique,
    query: { index: n, range: e.range },
  });
}
function eo(e, t, r, n) {
  const s = e.replayFilter ? ss(e.filter, e.replayFilter()) : e.filter;
  if (e.or) {
    const a = {},
      i = (o, l, c) => {
        if (
          !s ||
          s(
            l,
            c,
            (f) => l.stop(f),
            (f) => l.fail(f),
          )
        ) {
          var d = l.primaryKey,
            h = '' + d;
          (h === '[object ArrayBuffer]' && (h = '' + new Uint8Array(d)),
            $t(a, h) || ((a[h] = !0), t(o, l, c)));
        }
      };
    return Promise.all([
      e.or._iterate(i, r),
      op(ip(e, n, r), e.algorithm, i, !e.keysOnly && e.valueMapper),
    ]);
  }
  return op(ip(e, n, r), ss(e.algorithm, s), t, !e.keysOnly && e.valueMapper);
}
function op(e, t, r, n) {
  var s = Re(n ? (a, i, o) => r(n(a), i, o) : r);
  return e.then((a) => {
    if (a)
      return a.start(() => {
        var i = () => a.continue();
        ((t &&
          !t(
            a,
            (o) => (i = o),
            (o) => {
              (a.stop(o), (i = Se));
            },
            (o) => {
              (a.fail(o), (i = Se));
            },
          )) ||
          s(a.value, a, (o) => (i = o)),
          i());
      });
  });
}
function xt(e, t) {
  try {
    const r = lp(e),
      n = lp(t);
    if (r !== n)
      return r === 'Array'
        ? 1
        : n === 'Array'
          ? -1
          : r === 'binary'
            ? 1
            : n === 'binary'
              ? -1
              : r === 'string'
                ? 1
                : n === 'string'
                  ? -1
                  : r === 'Date'
                    ? 1
                    : n !== 'Date'
                      ? NaN
                      : -1;
    switch (r) {
      case 'number':
      case 'Date':
      case 'string':
        return e > t ? 1 : e < t ? -1 : 0;
      case 'binary':
        return (function (s, a) {
          const i = s.length,
            o = a.length,
            l = i < o ? i : o;
          for (let c = 0; c < l; ++c)
            if (s[c] !== a[c]) return s[c] < a[c] ? -1 : 1;
          return i === o ? 0 : i < o ? -1 : 1;
        })(up(e), up(t));
      case 'Array':
        return (function (s, a) {
          const i = s.length,
            o = a.length,
            l = i < o ? i : o;
          for (let c = 0; c < l; ++c) {
            const d = xt(s[c], a[c]);
            if (d !== 0) return d;
          }
          return i === o ? 0 : i < o ? -1 : 1;
        })(e, t);
    }
  } catch {}
  return NaN;
}
function lp(e) {
  const t = typeof e;
  if (t !== 'object') return t;
  if (ArrayBuffer.isView(e)) return 'binary';
  const r = Fc(e);
  return r === 'ArrayBuffer' ? 'binary' : r;
}
function up(e) {
  return e instanceof Uint8Array
    ? e
    : ArrayBuffer.isView(e)
      ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
      : new Uint8Array(e);
}
class Nb {
  _read(t, r) {
    var n = this._ctx;
    return n.error
      ? n.table._trans(null, Xe.bind(null, n.error))
      : n.table._trans('readonly', t).then(r);
  }
  _write(t) {
    var r = this._ctx;
    return r.error
      ? r.table._trans(null, Xe.bind(null, r.error))
      : r.table._trans('readwrite', t, 'locked');
  }
  _addAlgorithm(t) {
    var r = this._ctx;
    r.algorithm = ss(r.algorithm, t);
  }
  _iterate(t, r) {
    return eo(this._ctx, t, r, this._ctx.table.core);
  }
  clone(t) {
    var r = Object.create(this.constructor.prototype),
      n = Object.create(this._ctx);
    return (t && _t(n, t), (r._ctx = n), r);
  }
  raw() {
    return ((this._ctx.valueMapper = null), this);
  }
  each(t) {
    var r = this._ctx;
    return this._read((n) => eo(r, t, n, r.table.core));
  }
  count(t) {
    return this._read((r) => {
      const n = this._ctx,
        s = n.table.core;
      if (cs(n, !0))
        return s
          .count({
            trans: r,
            query: { index: So(n, s.schema), range: n.range },
          })
          .then((i) => Math.min(i, n.limit));
      var a = 0;
      return eo(n, () => (++a, !1), r, s).then(() => a);
    }).then(t);
  }
  sortBy(t, r) {
    const n = t.split('.').reverse(),
      s = n[0],
      a = n.length - 1;
    function i(c, d) {
      return d ? i(c[n[d]], d - 1) : c[s];
    }
    var o = this._ctx.dir === 'next' ? 1 : -1;
    function l(c, d) {
      var h = i(c, a),
        f = i(d, a);
      return h < f ? -o : h > f ? o : 0;
    }
    return this.toArray(function (c) {
      return c.sort(l);
    }).then(r);
  }
  toArray(t) {
    return this._read((r) => {
      var n = this._ctx;
      if (n.dir === 'next' && cs(n, !0) && n.limit > 0) {
        const { valueMapper: s } = n,
          a = So(n, n.table.core.schema);
        return n.table.core
          .query({
            trans: r,
            limit: n.limit,
            values: !0,
            query: { index: a, range: n.range },
          })
          .then(({ result: i }) => (s ? i.map(s) : i));
      }
      {
        const s = [];
        return eo(n, (a) => s.push(a), r, n.table.core).then(() => s);
      }
    }, t);
  }
  offset(t) {
    var r = this._ctx;
    return (
      t <= 0 ||
        ((r.offset += t),
        cs(r)
          ? bu(r, () => {
              var n = t;
              return (s, a) =>
                n === 0 ||
                (n === 1
                  ? (--n, !1)
                  : (a(() => {
                      (s.advance(n), (n = 0));
                    }),
                    !1));
            })
          : bu(r, () => {
              var n = t;
              return () => --n < 0;
            })),
      this
    );
  }
  limit(t) {
    return (
      (this._ctx.limit = Math.min(this._ctx.limit, t)),
      bu(
        this._ctx,
        () => {
          var r = t;
          return function (n, s, a) {
            return (--r <= 0 && s(a), r >= 0);
          };
        },
        !0,
      ),
      this
    );
  }
  until(t, r) {
    return (
      wu(this._ctx, function (n, s, a) {
        return !t(n.value) || (s(a), r);
      }),
      this
    );
  }
  first(t) {
    return this.limit(1)
      .toArray(function (r) {
        return r[0];
      })
      .then(t);
  }
  last(t) {
    return this.reverse().first(t);
  }
  filter(t) {
    var r, n;
    return (
      wu(this._ctx, function (s) {
        return t(s.value);
      }),
      (r = this._ctx),
      (n = t),
      (r.isMatch = ss(r.isMatch, n)),
      this
    );
  }
  and(t) {
    return this.filter(t);
  }
  or(t) {
    return new this.db.WhereClause(this._ctx.table, t, this);
  }
  reverse() {
    return (
      (this._ctx.dir = this._ctx.dir === 'prev' ? 'next' : 'prev'),
      this._ondirectionchange && this._ondirectionchange(this._ctx.dir),
      this
    );
  }
  desc() {
    return this.reverse();
  }
  eachKey(t) {
    var r = this._ctx;
    return (
      (r.keysOnly = !r.isMatch),
      this.each(function (n, s) {
        t(s.key, s);
      })
    );
  }
  eachUniqueKey(t) {
    return ((this._ctx.unique = 'unique'), this.eachKey(t));
  }
  eachPrimaryKey(t) {
    var r = this._ctx;
    return (
      (r.keysOnly = !r.isMatch),
      this.each(function (n, s) {
        t(s.primaryKey, s);
      })
    );
  }
  keys(t) {
    var r = this._ctx;
    r.keysOnly = !r.isMatch;
    var n = [];
    return this.each(function (s, a) {
      n.push(a.key);
    })
      .then(function () {
        return n;
      })
      .then(t);
  }
  primaryKeys(t) {
    var r = this._ctx;
    if (r.dir === 'next' && cs(r, !0) && r.limit > 0)
      return this._read((s) => {
        var a = So(r, r.table.core.schema);
        return r.table.core.query({
          trans: s,
          values: !1,
          limit: r.limit,
          query: { index: a, range: r.range },
        });
      })
        .then(({ result: s }) => s)
        .then(t);
    r.keysOnly = !r.isMatch;
    var n = [];
    return this.each(function (s, a) {
      n.push(a.primaryKey);
    })
      .then(function () {
        return n;
      })
      .then(t);
  }
  uniqueKeys(t) {
    return ((this._ctx.unique = 'unique'), this.keys(t));
  }
  firstKey(t) {
    return this.limit(1)
      .keys(function (r) {
        return r[0];
      })
      .then(t);
  }
  lastKey(t) {
    return this.reverse().firstKey(t);
  }
  distinct() {
    var t = this._ctx,
      r = t.index && t.table.schema.idxByName[t.index];
    if (!r || !r.multi) return this;
    var n = {};
    return (
      wu(this._ctx, function (s) {
        var a = s.primaryKey.toString(),
          i = $t(n, a);
        return ((n[a] = !0), !i);
      }),
      this
    );
  }
  modify(t) {
    var r = this._ctx;
    return this._write((n) => {
      var s;
      if (typeof t == 'function') s = t;
      else {
        var a = Ze(t),
          i = a.length;
        s = function (x) {
          for (var S = !1, g = 0; g < i; ++g) {
            var p = a[g],
              v = t[p];
            Vr(x, p) !== v && (lr(x, p, v), (S = !0));
          }
          return S;
        };
      }
      const o = r.table.core,
        { outbound: l, extractKey: c } = o.schema.primaryKey,
        d = this.db._options.modifyChunkSize || 200,
        h = [];
      let f = 0;
      const y = [],
        m = (x, S) => {
          const { failures: g, numFailures: p } = S;
          f += x - p;
          for (let v of Ze(g)) h.push(g[v]);
        };
      return this.clone()
        .primaryKeys()
        .then((x) => {
          const S = (g) => {
            const p = Math.min(d, x.length - g);
            return o
              .getMany({
                trans: n,
                keys: x.slice(g, g + p),
                cache: 'immutable',
              })
              .then((v) => {
                const k = [],
                  b = [],
                  _ = l ? [] : null,
                  w = [];
                for (let j = 0; j < p; ++j) {
                  const T = v[j],
                    D = { value: Ei(T), primKey: x[g + j] };
                  s.call(D, D.value, D) !== !1 &&
                    (D.value == null
                      ? w.push(x[g + j])
                      : l || xt(c(T), c(D.value)) === 0
                        ? (b.push(D.value), l && _.push(x[g + j]))
                        : (w.push(x[g + j]), k.push(D.value)));
                }
                const N = cs(r) &&
                  r.limit === 1 / 0 &&
                  (typeof t != 'function' || t === _u) && {
                    index: r.index,
                    range: r.range,
                  };
                return Promise.resolve(
                  k.length > 0 &&
                    o.mutate({ trans: n, type: 'add', values: k }).then((j) => {
                      for (let T in j.failures) w.splice(parseInt(T), 1);
                      m(k.length, j);
                    }),
                )
                  .then(
                    () =>
                      (b.length > 0 || (N && typeof t == 'object')) &&
                      o
                        .mutate({
                          trans: n,
                          type: 'put',
                          keys: _,
                          values: b,
                          criteria: N,
                          changeSpec: typeof t != 'function' && t,
                        })
                        .then((j) => m(b.length, j)),
                  )
                  .then(
                    () =>
                      (w.length > 0 || (N && t === _u)) &&
                      o
                        .mutate({
                          trans: n,
                          type: 'delete',
                          keys: w,
                          criteria: N,
                        })
                        .then((j) => m(w.length, j)),
                  )
                  .then(() => x.length > g + p && S(g + d));
              });
          };
          return S(0).then(() => {
            if (h.length > 0)
              throw new Jo('Error modifying one or more objects', h, f, y);
            return x.length;
          });
        });
    });
  }
  delete() {
    var t = this._ctx,
      r = t.range;
    return cs(t) && ((t.isPrimKey && !kb) || r.type === 3)
      ? this._write((n) => {
          const { primaryKey: s } = t.table.core.schema,
            a = r;
          return t.table.core
            .count({ trans: n, query: { index: s, range: a } })
            .then((i) =>
              t.table.core
                .mutate({ trans: n, type: 'deleteRange', range: a })
                .then(
                  ({
                    failures: o,
                    lastResult: l,
                    results: c,
                    numFailures: d,
                  }) => {
                    if (d)
                      throw new Jo(
                        'Could not delete some values',
                        Object.keys(o).map((h) => o[h]),
                        i - d,
                      );
                    return i - d;
                  },
                ),
            );
        })
      : this.modify(_u);
  }
}
const _u = (e, t) => (t.value = null);
function Eb(e, t) {
  return e < t ? -1 : e === t ? 0 : 1;
}
function jb(e, t) {
  return e > t ? -1 : e === t ? 0 : 1;
}
function Ot(e, t, r) {
  var n = e instanceof dv ? new e.Collection(e) : e;
  return ((n._ctx.error = r ? new r(t) : new TypeError(t)), n);
}
function ds(e) {
  return new e.Collection(e, () => cv('')).limit(0);
}
function Cb(e, t, r, n, s, a) {
  for (var i = Math.min(e.length, n.length), o = -1, l = 0; l < i; ++l) {
    var c = t[l];
    if (c !== n[l])
      return s(e[l], r[l]) < 0
        ? e.substr(0, l) + r[l] + r.substr(l + 1)
        : s(e[l], n[l]) < 0
          ? e.substr(0, l) + n[l] + r.substr(l + 1)
          : o >= 0
            ? e.substr(0, o) + t[o] + r.substr(o + 1)
            : null;
    s(e[l], c) < 0 && (o = l);
  }
  return i < n.length && a === 'next'
    ? e + r.substr(e.length)
    : i < e.length && a === 'prev'
      ? e.substr(0, r.length)
      : o < 0
        ? null
        : e.substr(0, o) + n[o] + r.substr(o + 1);
}
function to(e, t, r, n) {
  var s,
    a,
    i,
    o,
    l,
    c,
    d,
    h = r.length;
  if (!r.every((x) => typeof x == 'string')) return Ot(e, ov);
  function f(x) {
    ((s = (function (g) {
      return g === 'next' ? (p) => p.toUpperCase() : (p) => p.toLowerCase();
    })(x)),
      (a = (function (g) {
        return g === 'next' ? (p) => p.toLowerCase() : (p) => p.toUpperCase();
      })(x)),
      (i = x === 'next' ? Eb : jb));
    var S = r
      .map(function (g) {
        return { lower: a(g), upper: s(g) };
      })
      .sort(function (g, p) {
        return i(g.lower, p.lower);
      });
    ((o = S.map(function (g) {
      return g.upper;
    })),
      (l = S.map(function (g) {
        return g.lower;
      })),
      (c = x),
      (d = x === 'next' ? '' : n));
  }
  f('next');
  var y = new e.Collection(e, () => Gr(o[0], l[h - 1] + n));
  y._ondirectionchange = function (x) {
    f(x);
  };
  var m = 0;
  return (
    y._addAlgorithm(function (x, S, g) {
      var p = x.key;
      if (typeof p != 'string') return !1;
      var v = a(p);
      if (t(v, l, m)) return !0;
      for (var k = null, b = m; b < h; ++b) {
        var _ = Cb(p, v, o[b], l[b], i, c);
        _ === null && k === null
          ? (m = b + 1)
          : (k === null || i(k, _) > 0) && (k = _);
      }
      return (
        S(
          k !== null
            ? function () {
                x.continue(k + d);
              }
            : g,
        ),
        !1
      );
    }),
    y
  );
}
function Gr(e, t, r, n) {
  return { type: 2, lower: e, upper: t, lowerOpen: r, upperOpen: n };
}
function cv(e) {
  return { type: 1, lower: e, upper: e };
}
let dv = class {
  get Collection() {
    return this._ctx.table.db.Collection;
  }
  between(t, r, n, s) {
    ((n = n !== !1), (s = s === !0));
    try {
      return this._cmp(t, r) > 0 ||
        (this._cmp(t, r) === 0 && (n || s) && (!n || !s))
        ? ds(this)
        : new this.Collection(this, () => Gr(t, r, !n, !s));
    } catch {
      return Ot(this, jr);
    }
  }
  equals(t) {
    return t == null ? Ot(this, jr) : new this.Collection(this, () => cv(t));
  }
  above(t) {
    return t == null
      ? Ot(this, jr)
      : new this.Collection(this, () => Gr(t, void 0, !0));
  }
  aboveOrEqual(t) {
    return t == null
      ? Ot(this, jr)
      : new this.Collection(this, () => Gr(t, void 0, !1));
  }
  below(t) {
    return t == null
      ? Ot(this, jr)
      : new this.Collection(this, () => Gr(void 0, t, !1, !0));
  }
  belowOrEqual(t) {
    return t == null
      ? Ot(this, jr)
      : new this.Collection(this, () => Gr(void 0, t));
  }
  startsWith(t) {
    return typeof t != 'string'
      ? Ot(this, ov)
      : this.between(t, t + Kn, !0, !0);
  }
  startsWithIgnoreCase(t) {
    return t === ''
      ? this.startsWith(t)
      : to(this, (r, n) => r.indexOf(n[0]) === 0, [t], Kn);
  }
  equalsIgnoreCase(t) {
    return to(this, (r, n) => r === n[0], [t], '');
  }
  anyOfIgnoreCase() {
    var t = Pr.apply(ps, arguments);
    return t.length === 0
      ? ds(this)
      : to(this, (r, n) => n.indexOf(r) !== -1, t, '');
  }
  startsWithAnyOfIgnoreCase() {
    var t = Pr.apply(ps, arguments);
    return t.length === 0
      ? ds(this)
      : to(this, (r, n) => n.some((s) => r.indexOf(s) === 0), t, Kn);
  }
  anyOf() {
    const t = Pr.apply(ps, arguments);
    let r = this._cmp;
    try {
      t.sort(r);
    } catch {
      return Ot(this, jr);
    }
    if (t.length === 0) return ds(this);
    const n = new this.Collection(this, () => Gr(t[0], t[t.length - 1]));
    n._ondirectionchange = (a) => {
      ((r = a === 'next' ? this._ascending : this._descending), t.sort(r));
    };
    let s = 0;
    return (
      n._addAlgorithm((a, i, o) => {
        const l = a.key;
        for (; r(l, t[s]) > 0; ) if ((++s, s === t.length)) return (i(o), !1);
        return (
          r(l, t[s]) === 0 ||
          (i(() => {
            a.continue(t[s]);
          }),
          !1)
        );
      }),
      n
    );
  }
  notEqual(t) {
    return this.inAnyRange(
      [
        [Yc, t],
        [t, this.db._maxKey],
      ],
      { includeLowers: !1, includeUppers: !1 },
    );
  }
  noneOf() {
    const t = Pr.apply(ps, arguments);
    if (t.length === 0) return new this.Collection(this);
    try {
      t.sort(this._ascending);
    } catch {
      return Ot(this, jr);
    }
    const r = t.reduce(
      (n, s) => (n ? n.concat([[n[n.length - 1][1], s]]) : [[Yc, s]]),
      null,
    );
    return (
      r.push([t[t.length - 1], this.db._maxKey]),
      this.inAnyRange(r, { includeLowers: !1, includeUppers: !1 })
    );
  }
  inAnyRange(t, r) {
    const n = this._cmp,
      s = this._ascending,
      a = this._descending,
      i = this._min,
      o = this._max;
    if (t.length === 0) return ds(this);
    if (
      !t.every((p) => p[0] !== void 0 && p[1] !== void 0 && s(p[0], p[1]) <= 0)
    )
      return Ot(
        this,
        'First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower',
        oe.InvalidArgument,
      );
    const l = !r || r.includeLowers !== !1,
      c = r && r.includeUppers === !0;
    let d,
      h = s;
    function f(p, v) {
      return h(p[0], v[0]);
    }
    try {
      ((d = t.reduce(function (p, v) {
        let k = 0,
          b = p.length;
        for (; k < b; ++k) {
          const _ = p[k];
          if (n(v[0], _[1]) < 0 && n(v[1], _[0]) > 0) {
            ((_[0] = i(_[0], v[0])), (_[1] = o(_[1], v[1])));
            break;
          }
        }
        return (k === b && p.push(v), p);
      }, [])),
        d.sort(f));
    } catch {
      return Ot(this, jr);
    }
    let y = 0;
    const m = c ? (p) => s(p, d[y][1]) > 0 : (p) => s(p, d[y][1]) >= 0,
      x = l ? (p) => a(p, d[y][0]) > 0 : (p) => a(p, d[y][0]) >= 0;
    let S = m;
    const g = new this.Collection(this, () =>
      Gr(d[0][0], d[d.length - 1][1], !l, !c),
    );
    return (
      (g._ondirectionchange = (p) => {
        (p === 'next' ? ((S = m), (h = s)) : ((S = x), (h = a)), d.sort(f));
      }),
      g._addAlgorithm((p, v, k) => {
        for (var b = p.key; S(b); )
          if ((++y, y === d.length)) return (v(k), !1);
        return (
          !!(function (_) {
            return !m(_) && !x(_);
          })(b) ||
          (this._cmp(b, d[y][1]) === 0 ||
            this._cmp(b, d[y][0]) === 0 ||
            v(() => {
              h === s ? p.continue(d[y][0]) : p.continue(d[y][1]);
            }),
          !1)
        );
      }),
      g
    );
  }
  startsWithAnyOf() {
    const t = Pr.apply(ps, arguments);
    return t.every((r) => typeof r == 'string')
      ? t.length === 0
        ? ds(this)
        : this.inAnyRange(t.map((r) => [r, r + Kn]))
      : Ot(this, 'startsWithAnyOf() only works with strings');
  }
};
function pr(e) {
  return Re(function (t) {
    return (ci(t), e(t.target.error), !1);
  });
}
function ci(e) {
  (e.stopPropagation && e.stopPropagation(),
    e.preventDefault && e.preventDefault());
}
const di = 'storagemutated',
  nn = 'x-storagemutated-1',
  En = Ua(null, di);
class Tb {
  _lock() {
    return (
      Ea(!se.global),
      ++this._reculock,
      this._reculock !== 1 || se.global || (se.lockOwnerFor = this),
      this
    );
  }
  _unlock() {
    if ((Ea(!se.global), --this._reculock == 0))
      for (
        se.global || (se.lockOwnerFor = null);
        this._blockedFuncs.length > 0 && !this._locked();

      ) {
        var t = this._blockedFuncs.shift();
        try {
          aa(t[1], t[0]);
        } catch {}
      }
    return this;
  }
  _locked() {
    return this._reculock && se.lockOwnerFor !== this;
  }
  create(t) {
    if (!this.mode) return this;
    const r = this.db.idbdb,
      n = this.db._state.dbOpenError;
    if ((Ea(!this.idbtrans), !t && !r))
      switch (n && n.name) {
        case 'DatabaseClosedError':
          throw new oe.DatabaseClosed(n);
        case 'MissingAPIError':
          throw new oe.MissingAPI(n.message, n);
        default:
          throw new oe.OpenFailed(n);
      }
    if (!this.active) throw new oe.TransactionInactive();
    return (
      Ea(this._completion._state === null),
      ((t = this.idbtrans =
        t ||
        (this.db.core
          ? this.db.core.transaction(this.storeNames, this.mode, {
              durability: this.chromeTransactionDurability,
            })
          : r.transaction(this.storeNames, this.mode, {
              durability: this.chromeTransactionDurability,
            }))).onerror = Re((s) => {
        (ci(s), this._reject(t.error));
      })),
      (t.onabort = Re((s) => {
        (ci(s),
          this.active && this._reject(new oe.Abort(t.error)),
          (this.active = !1),
          this.on('abort').fire(s));
      })),
      (t.oncomplete = Re(() => {
        ((this.active = !1),
          this._resolve(),
          'mutatedParts' in t && En.storagemutated.fire(t.mutatedParts));
      })),
      this
    );
  }
  _promise(t, r, n) {
    if (t === 'readwrite' && this.mode !== 'readwrite')
      return Xe(new oe.ReadOnly('Transaction is readonly'));
    if (!this.active) return Xe(new oe.TransactionInactive());
    if (this._locked())
      return new Y((a, i) => {
        this._blockedFuncs.push([
          () => {
            this._promise(t, r, n).then(a, i);
          },
          se,
        ]);
      });
    if (n)
      return Sn(() => {
        var a = new Y((i, o) => {
          this._lock();
          const l = r(i, o, this);
          l && l.then && l.then(i, o);
        });
        return (a.finally(() => this._unlock()), (a._lib = !0), a);
      });
    var s = new Y((a, i) => {
      var o = r(a, i, this);
      o && o.then && o.then(a, i);
    });
    return ((s._lib = !0), s);
  }
  _root() {
    return this.parent ? this.parent._root() : this;
  }
  waitFor(t) {
    var r = this._root();
    const n = Y.resolve(t);
    if (r._waitingFor) r._waitingFor = r._waitingFor.then(() => n);
    else {
      ((r._waitingFor = n), (r._waitingQueue = []));
      var s = r.idbtrans.objectStore(r.storeNames[0]);
      (function i() {
        for (++r._spinCount; r._waitingQueue.length; )
          r._waitingQueue.shift()();
        r._waitingFor && (s.get(-1 / 0).onsuccess = i);
      })();
    }
    var a = r._waitingFor;
    return new Y((i, o) => {
      n.then(
        (l) => r._waitingQueue.push(Re(i.bind(null, l))),
        (l) => r._waitingQueue.push(Re(o.bind(null, l))),
      ).finally(() => {
        r._waitingFor === a && (r._waitingFor = null);
      });
    });
  }
  abort() {
    this.active &&
      ((this.active = !1),
      this.idbtrans && this.idbtrans.abort(),
      this._reject(new oe.Abort()));
  }
  table(t) {
    const r = this._memoizedTables || (this._memoizedTables = {});
    if ($t(r, t)) return r[t];
    const n = this.schema[t];
    if (!n) throw new oe.NotFound('Table ' + t + ' not part of transaction');
    const s = new this.db.Table(t, n, this);
    return ((s.core = this.db.core.table(t)), (r[t] = s), s);
  }
}
function Jc(e, t, r, n, s, a, i) {
  return {
    name: e,
    keyPath: t,
    unique: r,
    multi: n,
    auto: s,
    compound: a,
    src: (r && !i ? '&' : '') + (n ? '*' : '') + (s ? '++' : '') + fv(t),
  };
}
function fv(e) {
  return typeof e == 'string' ? e : e ? '[' + [].join.call(e, '+') + ']' : '';
}
function hv(e, t, r) {
  return {
    name: e,
    primKey: t,
    indexes: r,
    mappedClass: null,
    idxByName: Ky(r, (n) => [n.name, n]),
  };
}
let fi = (e) => {
  try {
    return (e.only([[]]), (fi = () => [[]]), [[]]);
  } catch {
    return ((fi = () => Kn), Kn);
  }
};
function Xc(e) {
  return e == null
    ? () => {}
    : typeof e == 'string'
      ? (function (t) {
          return t.split('.').length === 1 ? (n) => n[t] : (n) => Vr(n, t);
        })(e)
      : (t) => Vr(t, e);
}
function cp(e) {
  return [].slice.call(e);
}
let Ab = 0;
function za(e) {
  return e == null ? ':id' : typeof e == 'string' ? e : `[${e.join('+')}]`;
}
function Ib(e, t, r) {
  function n(l) {
    if (l.type === 3) return null;
    if (l.type === 4)
      throw new Error('Cannot convert never type to IDBKeyRange');
    const { lower: c, upper: d, lowerOpen: h, upperOpen: f } = l;
    return c === void 0
      ? d === void 0
        ? null
        : t.upperBound(d, !!f)
      : d === void 0
        ? t.lowerBound(c, !!h)
        : t.bound(c, d, !!h, !!f);
  }
  const { schema: s, hasGetAll: a } = (function (l, c) {
      const d = cp(l.objectStoreNames);
      return {
        schema: {
          name: l.name,
          tables: d
            .map((h) => c.objectStore(h))
            .map((h) => {
              const { keyPath: f, autoIncrement: y } = h,
                m = ht(f),
                x = f == null,
                S = {},
                g = {
                  name: h.name,
                  primaryKey: {
                    name: null,
                    isPrimaryKey: !0,
                    outbound: x,
                    compound: m,
                    keyPath: f,
                    autoIncrement: y,
                    unique: !0,
                    extractKey: Xc(f),
                  },
                  indexes: cp(h.indexNames)
                    .map((p) => h.index(p))
                    .map((p) => {
                      const {
                          name: v,
                          unique: k,
                          multiEntry: b,
                          keyPath: _,
                        } = p,
                        w = {
                          name: v,
                          compound: ht(_),
                          keyPath: _,
                          unique: k,
                          multiEntry: b,
                          extractKey: Xc(_),
                        };
                      return ((S[za(_)] = w), w);
                    }),
                  getIndexByKeyPath: (p) => S[za(p)],
                };
              return (
                (S[':id'] = g.primaryKey),
                f != null && (S[za(f)] = g.primaryKey),
                g
              );
            }),
        },
        hasGetAll:
          d.length > 0 &&
          'getAll' in c.objectStore(d[0]) &&
          !(
            typeof navigator < 'u' &&
            /Safari/.test(navigator.userAgent) &&
            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604
          ),
      };
    })(e, r),
    i = s.tables.map((l) =>
      (function (c) {
        const d = c.name;
        return {
          name: d,
          schema: c,
          mutate: function ({
            trans: h,
            type: f,
            keys: y,
            values: m,
            range: x,
          }) {
            return new Promise((S, g) => {
              S = Re(S);
              const p = h.objectStore(d),
                v = p.keyPath == null,
                k = f === 'put' || f === 'add';
              if (!k && f !== 'delete' && f !== 'deleteRange')
                throw new Error('Invalid operation type: ' + f);
              const { length: b } = y || m || { length: 1 };
              if (y && m && y.length !== m.length)
                throw new Error(
                  'Given keys array must have same length as given values array.',
                );
              if (b === 0)
                return S({
                  numFailures: 0,
                  failures: {},
                  results: [],
                  lastResult: void 0,
                });
              let _;
              const w = [],
                N = [];
              let j = 0;
              const T = (V) => {
                (++j, ci(V));
              };
              if (f === 'deleteRange') {
                if (x.type === 4)
                  return S({
                    numFailures: j,
                    failures: N,
                    results: [],
                    lastResult: void 0,
                  });
                x.type === 3
                  ? w.push((_ = p.clear()))
                  : w.push((_ = p.delete(n(x))));
              } else {
                const [V, F] = k ? (v ? [m, y] : [m, null]) : [y, null];
                if (k)
                  for (let B = 0; B < b; ++B)
                    (w.push(
                      (_ =
                        F && F[B] !== void 0 ? p[f](V[B], F[B]) : p[f](V[B])),
                    ),
                      (_.onerror = T));
                else
                  for (let B = 0; B < b; ++B)
                    (w.push((_ = p[f](V[B]))), (_.onerror = T));
              }
              const D = (V) => {
                const F = V.target.result;
                (w.forEach((B, ie) => B.error != null && (N[ie] = B.error)),
                  S({
                    numFailures: j,
                    failures: N,
                    results: f === 'delete' ? y : w.map((B) => B.result),
                    lastResult: F,
                  }));
              };
              ((_.onerror = (V) => {
                (T(V), D(V));
              }),
                (_.onsuccess = D));
            });
          },
          getMany: ({ trans: h, keys: f }) =>
            new Promise((y, m) => {
              y = Re(y);
              const x = h.objectStore(d),
                S = f.length,
                g = new Array(S);
              let p,
                v = 0,
                k = 0;
              const b = (w) => {
                  const N = w.target;
                  ((g[N._pos] = N.result), ++k === v && y(g));
                },
                _ = pr(m);
              for (let w = 0; w < S; ++w)
                f[w] != null &&
                  ((p = x.get(f[w])),
                  (p._pos = w),
                  (p.onsuccess = b),
                  (p.onerror = _),
                  ++v);
              v === 0 && y(g);
            }),
          get: ({ trans: h, key: f }) =>
            new Promise((y, m) => {
              y = Re(y);
              const x = h.objectStore(d).get(f);
              ((x.onsuccess = (S) => y(S.target.result)), (x.onerror = pr(m)));
            }),
          query: (function (h) {
            return (f) =>
              new Promise((y, m) => {
                y = Re(y);
                const { trans: x, values: S, limit: g, query: p } = f,
                  v = g === 1 / 0 ? void 0 : g,
                  { index: k, range: b } = p,
                  _ = x.objectStore(d),
                  w = k.isPrimaryKey ? _ : _.index(k.name),
                  N = n(b);
                if (g === 0) return y({ result: [] });
                if (h) {
                  const j = S ? w.getAll(N, v) : w.getAllKeys(N, v);
                  ((j.onsuccess = (T) => y({ result: T.target.result })),
                    (j.onerror = pr(m)));
                } else {
                  let j = 0;
                  const T =
                      S || !('openKeyCursor' in w)
                        ? w.openCursor(N)
                        : w.openKeyCursor(N),
                    D = [];
                  ((T.onsuccess = (V) => {
                    const F = T.result;
                    return F
                      ? (D.push(S ? F.value : F.primaryKey),
                        ++j === g ? y({ result: D }) : void F.continue())
                      : y({ result: D });
                  }),
                    (T.onerror = pr(m)));
                }
              });
          })(a),
          openCursor: function ({
            trans: h,
            values: f,
            query: y,
            reverse: m,
            unique: x,
          }) {
            return new Promise((S, g) => {
              S = Re(S);
              const { index: p, range: v } = y,
                k = h.objectStore(d),
                b = p.isPrimaryKey ? k : k.index(p.name),
                _ = m ? (x ? 'prevunique' : 'prev') : x ? 'nextunique' : 'next',
                w =
                  f || !('openKeyCursor' in b)
                    ? b.openCursor(n(v), _)
                    : b.openKeyCursor(n(v), _);
              ((w.onerror = pr(g)),
                (w.onsuccess = Re((N) => {
                  const j = w.result;
                  if (!j) return void S(null);
                  ((j.___id = ++Ab), (j.done = !1));
                  const T = j.continue.bind(j);
                  let D = j.continuePrimaryKey;
                  D && (D = D.bind(j));
                  const V = j.advance.bind(j),
                    F = () => {
                      throw new Error('Cursor not stopped');
                    };
                  ((j.trans = h),
                    (j.stop =
                      j.continue =
                      j.continuePrimaryKey =
                      j.advance =
                        () => {
                          throw new Error('Cursor not started');
                        }),
                    (j.fail = Re(g)),
                    (j.next = function () {
                      let B = 1;
                      return this.start(() =>
                        B-- ? this.continue() : this.stop(),
                      ).then(() => this);
                    }),
                    (j.start = (B) => {
                      const ie = new Promise((ae, M) => {
                          ((ae = Re(ae)),
                            (w.onerror = pr(M)),
                            (j.fail = M),
                            (j.stop = (R) => {
                              ((j.stop =
                                j.continue =
                                j.continuePrimaryKey =
                                j.advance =
                                  F),
                                ae(R));
                            }));
                        }),
                        re = () => {
                          if (w.result)
                            try {
                              B();
                            } catch (ae) {
                              j.fail(ae);
                            }
                          else
                            ((j.done = !0),
                              (j.start = () => {
                                throw new Error('Cursor behind last entry');
                              }),
                              j.stop());
                        };
                      return (
                        (w.onsuccess = Re((ae) => {
                          ((w.onsuccess = re), re());
                        })),
                        (j.continue = T),
                        (j.continuePrimaryKey = D),
                        (j.advance = V),
                        re(),
                        ie
                      );
                    }),
                    S(j));
                }, g)));
            });
          },
          count({ query: h, trans: f }) {
            const { index: y, range: m } = h;
            return new Promise((x, S) => {
              const g = f.objectStore(d),
                p = y.isPrimaryKey ? g : g.index(y.name),
                v = n(m),
                k = v ? p.count(v) : p.count();
              ((k.onsuccess = Re((b) => x(b.target.result))),
                (k.onerror = pr(S)));
            });
          },
        };
      })(l),
    ),
    o = {};
  return (
    i.forEach((l) => (o[l.name] = l)),
    {
      stack: 'dbcore',
      transaction: e.transaction.bind(e),
      table(l) {
        if (!o[l]) throw new Error(`Table '${l}' not found`);
        return o[l];
      },
      MIN_KEY: -1 / 0,
      MAX_KEY: fi(t),
      schema: s,
    }
  );
}
function ed({ _novip: e }, t) {
  const r = t.db,
    n = (function (s, a, { IDBKeyRange: i, indexedDB: o }, l) {
      return {
        dbcore: (function (d, h) {
          return h.reduce((f, { create: y }) => ({ ...f, ...y(f) }), d);
        })(Ib(a, i, l), s.dbcore),
      };
    })(e._middlewares, r, e._deps, t);
  ((e.core = n.dbcore),
    e.tables.forEach((s) => {
      const a = s.name;
      e.core.schema.tables.some((i) => i.name === a) &&
        ((s.core = e.core.table(a)),
        e[a] instanceof e.Table && (e[a].core = s.core));
    }));
}
function nl({ _novip: e }, t, r, n) {
  r.forEach((s) => {
    const a = n[s];
    t.forEach((i) => {
      const o = vf(i, s);
      (!o || ('value' in o && o.value === void 0)) &&
        (i === e.Transaction.prototype || i instanceof e.Transaction
          ? Mr(i, s, {
              get() {
                return this.table(s);
              },
              set(l) {
                Uy(this, s, {
                  value: l,
                  writable: !0,
                  configurable: !0,
                  enumerable: !0,
                });
              },
            })
          : (i[s] = new e.Table(s, a)));
    });
  });
}
function td({ _novip: e }, t) {
  t.forEach((r) => {
    for (let n in r) r[n] instanceof e.Table && delete r[n];
  });
}
function Pb(e, t) {
  return e._cfg.version - t._cfg.version;
}
function Rb(e, t, r, n) {
  const s = e._dbSchema,
    a = e._createTransaction('readwrite', e._storeNames, s);
  (a.create(r), a._completion.catch(n));
  const i = a._reject.bind(a),
    o = se.transless || se;
  Sn(() => {
    ((se.trans = a),
      (se.transless = o),
      t === 0
        ? (Ze(s).forEach((l) => {
            ku(r, l, s[l].primKey, s[l].indexes);
          }),
          ed(e, r),
          Y.follow(() => e.on.populate.fire(a)).catch(i))
        : (function ({ _novip: l }, c, d, h) {
            const f = [],
              y = l._versions;
            let m = (l._dbSchema = nd(l, l.idbdb, h)),
              x = !1;
            const S = y.filter((p) => p._cfg.version >= c);
            function g() {
              return f.length
                ? Y.resolve(f.shift()(d.idbtrans)).then(g)
                : Y.resolve();
            }
            return (
              S.forEach((p) => {
                (f.push(() => {
                  const v = m,
                    k = p._cfg.dbschema;
                  (sd(l, v, h), sd(l, k, h), (m = l._dbSchema = k));
                  const b = pv(v, k);
                  (b.add.forEach((w) => {
                    ku(h, w[0], w[1].primKey, w[1].indexes);
                  }),
                    b.change.forEach((w) => {
                      if (w.recreate)
                        throw new oe.Upgrade(
                          'Not yet support for changing primary key',
                        );
                      {
                        const N = h.objectStore(w.name);
                        (w.add.forEach((j) => rd(N, j)),
                          w.change.forEach((j) => {
                            (N.deleteIndex(j.name), rd(N, j));
                          }),
                          w.del.forEach((j) => N.deleteIndex(j)));
                      }
                    }));
                  const _ = p._cfg.contentUpgrade;
                  if (_ && p._cfg.version > c) {
                    (ed(l, h), (d._memoizedTables = {}), (x = !0));
                    let w = Hy(k);
                    (b.del.forEach((D) => {
                      w[D] = v[D];
                    }),
                      td(l, [l.Transaction.prototype]),
                      nl(l, [l.Transaction.prototype], Ze(w), w),
                      (d.schema = w));
                    const N = xf(_);
                    let j;
                    N && sa();
                    const T = Y.follow(() => {
                      if (((j = _(d)), j && N)) {
                        var D = Kr.bind(null, null);
                        j.then(D, D);
                      }
                    });
                    return j && typeof j.then == 'function'
                      ? Y.resolve(j)
                      : T.then(() => j);
                  }
                }),
                  f.push((v) => {
                    ((!x || !_b) &&
                      (function (k, b) {
                        [].slice
                          .call(b.db.objectStoreNames)
                          .forEach(
                            (_) => k[_] == null && b.db.deleteObjectStore(_),
                          );
                      })(p._cfg.dbschema, v),
                      td(l, [l.Transaction.prototype]),
                      nl(
                        l,
                        [l.Transaction.prototype],
                        l._storeNames,
                        l._dbSchema,
                      ),
                      (d.schema = l._dbSchema));
                  }));
              }),
              g().then(() => {
                var p, v;
                ((v = h),
                  Ze((p = m)).forEach((k) => {
                    v.db.objectStoreNames.contains(k) ||
                      ku(v, k, p[k].primKey, p[k].indexes);
                  }));
              })
            );
          })(e, t, a, r).catch(i));
  });
}
function pv(e, t) {
  const r = { del: [], add: [], change: [] };
  let n;
  for (n in e) t[n] || r.del.push(n);
  for (n in t) {
    const s = e[n],
      a = t[n];
    if (s) {
      const i = { name: n, def: a, recreate: !1, del: [], add: [], change: [] };
      if (
        '' + (s.primKey.keyPath || '') != '' + (a.primKey.keyPath || '') ||
        (s.primKey.auto !== a.primKey.auto && !Ll)
      )
        ((i.recreate = !0), r.change.push(i));
      else {
        const o = s.idxByName,
          l = a.idxByName;
        let c;
        for (c in o) l[c] || i.del.push(c);
        for (c in l) {
          const d = o[c],
            h = l[c];
          d ? d.src !== h.src && i.change.push(h) : i.add.push(h);
        }
        (i.del.length > 0 || i.add.length > 0 || i.change.length > 0) &&
          r.change.push(i);
      }
    } else r.add.push([n, a]);
  }
  return r;
}
function ku(e, t, r, n) {
  const s = e.db.createObjectStore(
    t,
    r.keyPath
      ? { keyPath: r.keyPath, autoIncrement: r.auto }
      : { autoIncrement: r.auto },
  );
  return (n.forEach((a) => rd(s, a)), s);
}
function rd(e, t) {
  e.createIndex(t.name, t.keyPath, { unique: t.unique, multiEntry: t.multi });
}
function nd(e, t, r) {
  const n = {};
  return (
    Yo(t.objectStoreNames, 0).forEach((s) => {
      const a = r.objectStore(s);
      let i = a.keyPath;
      const o = Jc(
          fv(i),
          i || '',
          !1,
          !1,
          !!a.autoIncrement,
          i && typeof i != 'string',
          !0,
        ),
        l = [];
      for (let d = 0; d < a.indexNames.length; ++d) {
        const h = a.index(a.indexNames[d]);
        i = h.keyPath;
        var c = Jc(
          h.name,
          i,
          !!h.unique,
          !!h.multiEntry,
          !1,
          i && typeof i != 'string',
          !1,
        );
        l.push(c);
      }
      n[s] = hv(s, o, l);
    }),
    n
  );
}
function sd({ _novip: e }, t, r) {
  const n = r.db.objectStoreNames;
  for (let s = 0; s < n.length; ++s) {
    const a = n[s],
      i = r.objectStore(a);
    e._hasGetAll = 'getAll' in i;
    for (let o = 0; o < i.indexNames.length; ++o) {
      const l = i.indexNames[o],
        c = i.index(l).keyPath,
        d = typeof c == 'string' ? c : '[' + Yo(c).join('+') + ']';
      if (t[a]) {
        const h = t[a].idxByName[d];
        h && ((h.name = l), delete t[a].idxByName[d], (t[a].idxByName[l] = h));
      }
    }
  }
  typeof navigator < 'u' &&
    /Safari/.test(navigator.userAgent) &&
    !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
    Ae.WorkerGlobalScope &&
    Ae instanceof Ae.WorkerGlobalScope &&
    [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 &&
    (e._hasGetAll = !1);
}
class Db {
  _parseStoresSpec(t, r) {
    Ze(t).forEach((n) => {
      if (t[n] !== null) {
        var s = t[n].split(',').map((i, o) => {
            const l = (i = i.trim()).replace(/([&*]|\+\+)/g, ''),
              c = /^\[/.test(l) ? l.match(/^\[(.*)\]$/)[1].split('+') : l;
            return Jc(
              l,
              c || null,
              /\&/.test(i),
              /\*/.test(i),
              /\+\+/.test(i),
              ht(c),
              o === 0,
            );
          }),
          a = s.shift();
        if (a.multi) throw new oe.Schema('Primary key cannot be multi-valued');
        (s.forEach((i) => {
          if (i.auto)
            throw new oe.Schema(
              'Only primary key can be marked as autoIncrement (++)',
            );
          if (!i.keyPath)
            throw new oe.Schema(
              'Index must have a name and cannot be an empty string',
            );
        }),
          (r[n] = hv(n, a, s)));
      }
    });
  }
  stores(t) {
    const r = this.db;
    this._cfg.storesSource = this._cfg.storesSource
      ? _t(this._cfg.storesSource, t)
      : t;
    const n = r._versions,
      s = {};
    let a = {};
    return (
      n.forEach((i) => {
        (_t(s, i._cfg.storesSource),
          (a = i._cfg.dbschema = {}),
          i._parseStoresSpec(s, a));
      }),
      (r._dbSchema = a),
      td(r, [r._allTables, r, r.Transaction.prototype]),
      nl(
        r,
        [r._allTables, r, r.Transaction.prototype, this._cfg.tables],
        Ze(a),
        a,
      ),
      (r._storeNames = Ze(a)),
      this
    );
  }
  upgrade(t) {
    return (
      (this._cfg.contentUpgrade = _f(this._cfg.contentUpgrade || Se, t)),
      this
    );
  }
}
function Ef(e, t) {
  let r = e._dbNamesDB;
  return (
    r ||
      ((r = e._dbNamesDB =
        new Yn(Ml, { addons: [], indexedDB: e, IDBKeyRange: t })),
      r.version(1).stores({ dbnames: 'name' })),
    r.table('dbnames')
  );
}
function jf(e) {
  return e && typeof e.databases == 'function';
}
function ad(e) {
  return Sn(function () {
    return ((se.letThrough = !0), e());
  });
}
function Ob() {
  var e;
  return !navigator.userAgentData &&
    /Safari\//.test(navigator.userAgent) &&
    !/Chrom(e|ium)\//.test(navigator.userAgent) &&
    indexedDB.databases
    ? new Promise(function (t) {
        var r = function () {
          return indexedDB.databases().finally(t);
        };
        ((e = setInterval(r, 100)), r());
      }).finally(function () {
        return clearInterval(e);
      })
    : Promise.resolve();
}
function Lb(e) {
  const t = e._state,
    { indexedDB: r } = e._deps;
  if (t.isBeingOpened || e.idbdb)
    return t.dbReadyPromise.then(() => (t.dbOpenError ? Xe(t.dbOpenError) : e));
  (Sr && (t.openCanceller._stackHolder = ls()),
    (t.isBeingOpened = !0),
    (t.dbOpenError = null),
    (t.openComplete = !1));
  const n = t.openCanceller;
  function s() {
    if (t.openCanceller !== n)
      throw new oe.DatabaseClosed('db.open() was cancelled');
  }
  let a = t.dbReadyResolve,
    i = null,
    o = !1;
  const l = () =>
    new Y((c, d) => {
      if ((s(), !r)) throw new oe.MissingAPI();
      const h = e.name,
        f = t.autoSchema ? r.open(h) : r.open(h, Math.round(10 * e.verno));
      if (!f) throw new oe.MissingAPI();
      ((f.onerror = pr(d)),
        (f.onblocked = Re(e._fireOnBlocked)),
        (f.onupgradeneeded = Re((y) => {
          if (((i = f.transaction), t.autoSchema && !e._options.allowEmptyDB)) {
            ((f.onerror = ci), i.abort(), f.result.close());
            const x = r.deleteDatabase(h);
            x.onsuccess = x.onerror = Re(() => {
              d(new oe.NoSuchDatabase(`Database ${h} doesnt exist`));
            });
          } else {
            i.onerror = pr(d);
            var m = y.oldVersion > Math.pow(2, 62) ? 0 : y.oldVersion;
            ((o = m < 1), (e._novip.idbdb = f.result), Rb(e, m / 10, i, d));
          }
        }, d)),
        (f.onsuccess = Re(() => {
          i = null;
          const y = (e._novip.idbdb = f.result),
            m = Yo(y.objectStoreNames);
          if (m.length > 0)
            try {
              const S = y.transaction(
                (x = m).length === 1 ? x[0] : x,
                'readonly',
              );
              (t.autoSchema
                ? (function ({ _novip: g }, p, v) {
                    g.verno = p.version / 10;
                    const k = (g._dbSchema = nd(0, p, v));
                    ((g._storeNames = Yo(p.objectStoreNames, 0)),
                      nl(g, [g._allTables], Ze(k), k));
                  })(e, y, S)
                : (sd(e, e._dbSchema, S),
                  (function (g, p) {
                    const v = pv(nd(0, g.idbdb, p), g._dbSchema);
                    return !(
                      v.add.length ||
                      v.change.some((k) => k.add.length || k.change.length)
                    );
                  })(e, S) ||
                    console.warn(
                      'Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.',
                    )),
                ed(e, S));
            } catch {}
          var x;
          ($a.push(e),
            (y.onversionchange = Re((S) => {
              ((t.vcFired = !0), e.on('versionchange').fire(S));
            })),
            (y.onclose = Re((S) => {
              e.on('close').fire(S);
            })),
            o &&
              (function ({ indexedDB: S, IDBKeyRange: g }, p) {
                !jf(S) && p !== Ml && Ef(S, g).put({ name: p }).catch(Se);
              })(e._deps, h),
            c());
        }, d)));
    }).catch((c) =>
      c && c.name === 'UnknownError' && t.PR1398_maxLoop > 0
        ? (t.PR1398_maxLoop--,
          console.warn('Dexie: Workaround for Chrome UnknownError on open()'),
          l())
        : Y.reject(c),
    );
  return Y.race([n, (typeof navigator > 'u' ? Y.resolve() : Ob()).then(l)])
    .then(
      () => (
        s(),
        (t.onReadyBeingFired = []),
        Y.resolve(ad(() => e.on.ready.fire(e.vip))).then(function c() {
          if (t.onReadyBeingFired.length > 0) {
            let d = t.onReadyBeingFired.reduce(_f, Se);
            return (
              (t.onReadyBeingFired = []),
              Y.resolve(ad(() => d(e.vip))).then(c)
            );
          }
        })
      ),
    )
    .finally(() => {
      ((t.onReadyBeingFired = null), (t.isBeingOpened = !1));
    })
    .then(() => e)
    .catch((c) => {
      t.dbOpenError = c;
      try {
        i && i.abort();
      } catch {}
      return (n === t.openCanceller && e._close(), Xe(c));
    })
    .finally(() => {
      ((t.openComplete = !0), a());
    });
}
function id(e) {
  var t = (a) => e.next(a),
    r = s(t),
    n = s((a) => e.throw(a));
  function s(a) {
    return (i) => {
      var o = a(i),
        l = o.value;
      return o.done
        ? l
        : l && typeof l.then == 'function'
          ? l.then(r, n)
          : ht(l)
            ? Promise.all(l).then(r, n)
            : r(l);
    };
  }
  return s(t)();
}
function Mb(e, t, r) {
  var n = arguments.length;
  if (n < 2) throw new oe.InvalidArgument('Too few arguments');
  for (var s = new Array(n - 1); --n; ) s[n - 1] = arguments[n];
  return ((r = s.pop()), [e, Wy(s), r]);
}
function mv(e, t, r, n, s) {
  return Y.resolve().then(() => {
    const a = se.transless || se,
      i = e._createTransaction(t, r, e._dbSchema, n),
      o = { trans: i, transless: a };
    if (n) i.idbtrans = n.idbtrans;
    else
      try {
        (i.create(), (e._state.PR1398_maxLoop = 3));
      } catch (h) {
        return h.name === bf.InvalidState &&
          e.isOpen() &&
          --e._state.PR1398_maxLoop > 0
          ? (console.warn('Dexie: Need to reopen db'),
            e._close(),
            e.open().then(() => mv(e, t, r, null, s)))
          : Xe(h);
      }
    const l = xf(s);
    let c;
    l && sa();
    const d = Y.follow(() => {
      if (((c = s.call(i, i)), c))
        if (l) {
          var h = Kr.bind(null, null);
          c.then(h, h);
        } else
          typeof c.next == 'function' &&
            typeof c.throw == 'function' &&
            (c = id(c));
    }, o);
    return (
      c && typeof c.then == 'function'
        ? Y.resolve(c).then((h) =>
            i.active
              ? h
              : Xe(
                  new oe.PrematureCommit(
                    'Transaction committed too early. See http://bit.ly/2kdckMn',
                  ),
                ),
          )
        : d.then(() => c)
    )
      .then((h) => (n && i._resolve(), i._completion.then(() => h)))
      .catch((h) => (i._reject(h), Xe(h)));
  });
}
function ro(e, t, r) {
  const n = ht(e) ? e.slice() : [e];
  for (let s = 0; s < r; ++s) n.push(t);
  return n;
}
const Vb = {
  stack: 'dbcore',
  name: 'VirtualIndexMiddleware',
  level: 1,
  create: function (e) {
    return {
      ...e,
      table(t) {
        const r = e.table(t),
          { schema: n } = r,
          s = {},
          a = [];
        function i(d, h, f) {
          const y = za(d),
            m = (s[y] = s[y] || []),
            x = d == null ? 0 : typeof d == 'string' ? 1 : d.length,
            S = h > 0,
            g = {
              ...f,
              isVirtual: S,
              keyTail: h,
              keyLength: x,
              extractKey: Xc(d),
              unique: !S && f.unique,
            };
          return (
            m.push(g),
            g.isPrimaryKey || a.push(g),
            x > 1 && i(x === 2 ? d[0] : d.slice(0, x - 1), h + 1, f),
            m.sort((p, v) => p.keyTail - v.keyTail),
            g
          );
        }
        const o = i(n.primaryKey.keyPath, 0, n.primaryKey);
        s[':id'] = [o];
        for (const d of n.indexes) i(d.keyPath, 0, d);
        function l(d) {
          const h = d.query.index;
          return h.isVirtual
            ? {
                ...d,
                query: {
                  index: h,
                  range:
                    ((f = d.query.range),
                    (y = h.keyTail),
                    {
                      type: f.type === 1 ? 2 : f.type,
                      lower: ro(
                        f.lower,
                        f.lowerOpen ? e.MAX_KEY : e.MIN_KEY,
                        y,
                      ),
                      lowerOpen: !0,
                      upper: ro(
                        f.upper,
                        f.upperOpen ? e.MIN_KEY : e.MAX_KEY,
                        y,
                      ),
                      upperOpen: !0,
                    }),
                },
              }
            : d;
          var f, y;
        }
        return {
          ...r,
          schema: {
            ...n,
            primaryKey: o,
            indexes: a,
            getIndexByKeyPath: function (d) {
              const h = s[za(d)];
              return h && h[0];
            },
          },
          count: (d) => r.count(l(d)),
          query: (d) => r.query(l(d)),
          openCursor(d) {
            const { keyTail: h, isVirtual: f, keyLength: y } = d.query.index;
            return f
              ? r.openCursor(l(d)).then(
                  (m) =>
                    m &&
                    (function (x) {
                      return Object.create(x, {
                        continue: {
                          value: function (g) {
                            g != null
                              ? x.continue(
                                  ro(g, d.reverse ? e.MAX_KEY : e.MIN_KEY, h),
                                )
                              : d.unique
                                ? x.continue(
                                    x.key
                                      .slice(0, y)
                                      .concat(
                                        d.reverse ? e.MIN_KEY : e.MAX_KEY,
                                        h,
                                      ),
                                  )
                                : x.continue();
                          },
                        },
                        continuePrimaryKey: {
                          value(g, p) {
                            x.continuePrimaryKey(ro(g, e.MAX_KEY, h), p);
                          },
                        },
                        primaryKey: { get: () => x.primaryKey },
                        key: {
                          get() {
                            const g = x.key;
                            return y === 1 ? g[0] : g.slice(0, y);
                          },
                        },
                        value: { get: () => x.value },
                      });
                    })(m),
                )
              : r.openCursor(d);
          },
        };
      },
    };
  },
};
function Cf(e, t, r, n) {
  return (
    (r = r || {}),
    (n = n || ''),
    Ze(e).forEach((s) => {
      if ($t(t, s)) {
        var a = e[s],
          i = t[s];
        if (typeof a == 'object' && typeof i == 'object' && a && i) {
          const o = Fc(a);
          o !== Fc(i)
            ? (r[n + s] = t[s])
            : o === 'Object'
              ? Cf(a, i, r, n + s + '.')
              : a !== i && (r[n + s] = t[s]);
        } else a !== i && (r[n + s] = t[s]);
      } else r[n + s] = void 0;
    }),
    Ze(t).forEach((s) => {
      $t(e, s) || (r[n + s] = t[s]);
    }),
    r
  );
}
const Fb = {
  stack: 'dbcore',
  name: 'HooksMiddleware',
  level: 2,
  create: (e) => ({
    ...e,
    table(t) {
      const r = e.table(t),
        { primaryKey: n } = r.schema;
      return {
        ...r,
        mutate(a) {
          const i = se.trans,
            { deleting: o, creating: l, updating: c } = i.table(t).hook;
          switch (a.type) {
            case 'add':
              if (l.fire === Se) break;
              return i._promise('readwrite', () => d(a), !0);
            case 'put':
              if (l.fire === Se && c.fire === Se) break;
              return i._promise('readwrite', () => d(a), !0);
            case 'delete':
              if (o.fire === Se) break;
              return i._promise('readwrite', () => d(a), !0);
            case 'deleteRange':
              if (o.fire === Se) break;
              return i._promise(
                'readwrite',
                () =>
                  (function (f) {
                    return h(f.trans, f.range, 1e4);
                  })(a),
                !0,
              );
          }
          return r.mutate(a);
          function d(f) {
            const y = se.trans,
              m =
                f.keys ||
                (function (x, S) {
                  return S.type === 'delete'
                    ? S.keys
                    : S.keys || S.values.map(x.extractKey);
                })(n, f);
            if (!m) throw new Error('Keys missing');
            return (
              (f =
                f.type === 'add' || f.type === 'put'
                  ? { ...f, keys: m }
                  : { ...f }).type !== 'delete' && (f.values = [...f.values]),
              f.keys && (f.keys = [...f.keys]),
              (function (x, S, g) {
                return S.type === 'add'
                  ? Promise.resolve([])
                  : x.getMany({ trans: S.trans, keys: g, cache: 'immutable' });
              })(r, f, m).then((x) => {
                const S = m.map((g, p) => {
                  const v = x[p],
                    k = { onerror: null, onsuccess: null };
                  if (f.type === 'delete') o.fire.call(k, g, v, y);
                  else if (f.type === 'add' || v === void 0) {
                    const b = l.fire.call(k, g, f.values[p], y);
                    g == null &&
                      b != null &&
                      ((g = b),
                      (f.keys[p] = g),
                      n.outbound || lr(f.values[p], n.keyPath, g));
                  } else {
                    const b = Cf(v, f.values[p]),
                      _ = c.fire.call(k, b, g, v, y);
                    if (_) {
                      const w = f.values[p];
                      Object.keys(_).forEach((N) => {
                        $t(w, N) ? (w[N] = _[N]) : lr(w, N, _[N]);
                      });
                    }
                  }
                  return k;
                });
                return r
                  .mutate(f)
                  .then(
                    ({
                      failures: g,
                      results: p,
                      numFailures: v,
                      lastResult: k,
                    }) => {
                      for (let b = 0; b < m.length; ++b) {
                        const _ = p ? p[b] : m[b],
                          w = S[b];
                        _ == null
                          ? w.onerror && w.onerror(g[b])
                          : w.onsuccess &&
                            w.onsuccess(
                              f.type === 'put' && x[b] ? f.values[b] : _,
                            );
                      }
                      return {
                        failures: g,
                        results: p,
                        numFailures: v,
                        lastResult: k,
                      };
                    },
                  )
                  .catch(
                    (g) => (
                      S.forEach((p) => p.onerror && p.onerror(g)),
                      Promise.reject(g)
                    ),
                  );
              })
            );
          }
          function h(f, y, m) {
            return r
              .query({
                trans: f,
                values: !1,
                query: { index: n, range: y },
                limit: m,
              })
              .then(({ result: x }) =>
                d({ type: 'delete', keys: x, trans: f }).then((S) =>
                  S.numFailures > 0
                    ? Promise.reject(S.failures[0])
                    : x.length < m
                      ? { failures: [], numFailures: 0, lastResult: void 0 }
                      : h(
                          f,
                          { ...y, lower: x[x.length - 1], lowerOpen: !0 },
                          m,
                        ),
                ),
              );
          }
        },
      };
    },
  }),
};
function gv(e, t, r) {
  try {
    if (!t || t.keys.length < e.length) return null;
    const n = [];
    for (let s = 0, a = 0; s < t.keys.length && a < e.length; ++s)
      xt(t.keys[s], e[a]) === 0 &&
        (n.push(r ? Ei(t.values[s]) : t.values[s]), ++a);
    return n.length === e.length ? n : null;
  } catch {
    return null;
  }
}
const $b = {
  stack: 'dbcore',
  level: -1,
  create: (e) => ({
    table: (t) => {
      const r = e.table(t);
      return {
        ...r,
        getMany: (n) => {
          if (!n.cache) return r.getMany(n);
          const s = gv(n.keys, n.trans._cache, n.cache === 'clone');
          return s
            ? Y.resolve(s)
            : r
                .getMany(n)
                .then(
                  (a) => (
                    (n.trans._cache = {
                      keys: n.keys,
                      values: n.cache === 'clone' ? Ei(a) : a,
                    }),
                    a
                  ),
                );
        },
        mutate: (n) => (
          n.type !== 'add' && (n.trans._cache = null),
          r.mutate(n)
        ),
      };
    },
  }),
};
function Tf(e) {
  return !('from' in e);
}
const Ir = function (e, t) {
  if (!this) {
    const r = new Ir();
    return (e && 'd' in e && _t(r, e), r);
  }
  _t(
    this,
    arguments.length
      ? { d: 1, from: e, to: arguments.length > 1 ? t : e }
      : { d: 0 },
  );
};
function hi(e, t, r) {
  const n = xt(t, r);
  if (isNaN(n)) return;
  if (n > 0) throw RangeError();
  if (Tf(e)) return _t(e, { from: t, to: r, d: 1 });
  const s = e.l,
    a = e.r;
  if (xt(r, e.from) < 0)
    return (
      s ? hi(s, t, r) : (e.l = { from: t, to: r, d: 1, l: null, r: null }),
      dp(e)
    );
  if (xt(t, e.to) > 0)
    return (
      a ? hi(a, t, r) : (e.r = { from: t, to: r, d: 1, l: null, r: null }),
      dp(e)
    );
  (xt(t, e.from) < 0 && ((e.from = t), (e.l = null), (e.d = a ? a.d + 1 : 1)),
    xt(r, e.to) > 0 && ((e.to = r), (e.r = null), (e.d = e.l ? e.l.d + 1 : 1)));
  const i = !e.r;
  (s && !e.l && sl(e, s), a && i && sl(e, a));
}
function sl(e, t) {
  Tf(t) ||
    (function r(n, { from: s, to: a, l: i, r: o }) {
      (hi(n, s, a), i && r(n, i), o && r(n, o));
    })(e, t);
}
function Ub(e, t) {
  const r = od(t);
  let n = r.next();
  if (n.done) return !1;
  let s = n.value;
  const a = od(e);
  let i = a.next(s.from),
    o = i.value;
  for (; !n.done && !i.done; ) {
    if (xt(o.from, s.to) <= 0 && xt(o.to, s.from) >= 0) return !0;
    xt(s.from, o.from) < 0
      ? (s = (n = r.next(o.from)).value)
      : (o = (i = a.next(s.from)).value);
  }
  return !1;
}
function od(e) {
  let t = Tf(e) ? null : { s: 0, n: e };
  return {
    next(r) {
      const n = arguments.length > 0;
      for (; t; )
        switch (t.s) {
          case 0:
            if (((t.s = 1), n))
              for (; t.n.l && xt(r, t.n.from) < 0; )
                t = { up: t, n: t.n.l, s: 1 };
            else for (; t.n.l; ) t = { up: t, n: t.n.l, s: 1 };
          case 1:
            if (((t.s = 2), !n || xt(r, t.n.to) <= 0))
              return { value: t.n, done: !1 };
          case 2:
            if (t.n.r) {
              ((t.s = 3), (t = { up: t, n: t.n.r, s: 0 }));
              continue;
            }
          case 3:
            t = t.up;
        }
      return { done: !0 };
    },
  };
}
function dp(e) {
  var t, r;
  const n =
      (((t = e.r) === null || t === void 0 ? void 0 : t.d) || 0) -
      (((r = e.l) === null || r === void 0 ? void 0 : r.d) || 0),
    s = n > 1 ? 'r' : n < -1 ? 'l' : '';
  if (s) {
    const a = s === 'r' ? 'l' : 'r',
      i = { ...e },
      o = e[s];
    ((e.from = o.from),
      (e.to = o.to),
      (e[s] = o[s]),
      (i[s] = o[a]),
      (e[a] = i),
      (i.d = fp(i)));
  }
  e.d = fp(e);
}
function fp({ r: e, l: t }) {
  return (e ? (t ? Math.max(e.d, t.d) : e.d) : t ? t.d : 0) + 1;
}
Ws(Ir.prototype, {
  add(e) {
    return (sl(this, e), this);
  },
  addKey(e) {
    return (hi(this, e, e), this);
  },
  addKeys(e) {
    return (e.forEach((t) => hi(this, t, t)), this);
  },
  [$c]() {
    return od(this);
  },
});
const zb = {
  stack: 'dbcore',
  level: 0,
  create: (e) => {
    const t = e.schema.name,
      r = new Ir(e.MIN_KEY, e.MAX_KEY);
    return {
      ...e,
      table: (n) => {
        const s = e.table(n),
          { schema: a } = s,
          { primaryKey: i } = a,
          { extractKey: o, outbound: l } = i,
          c = {
            ...s,
            mutate: (f) => {
              const y = f.trans,
                m = y.mutatedParts || (y.mutatedParts = {}),
                x = (_) => {
                  const w = `idb://${t}/${n}/${_}`;
                  return m[w] || (m[w] = new Ir());
                },
                S = x(''),
                g = x(':dels'),
                { type: p } = f;
              let [v, k] =
                f.type === 'deleteRange'
                  ? [f.range]
                  : f.type === 'delete'
                    ? [f.keys]
                    : f.values.length < 50
                      ? [[], f.values]
                      : [];
              const b = f.trans._cache;
              return s.mutate(f).then((_) => {
                if (ht(v)) {
                  (p !== 'delete' && (v = _.results), S.addKeys(v));
                  const w = gv(v, b);
                  (w || p === 'add' || g.addKeys(v),
                    (w || k) &&
                      (function (N, j, T, D) {
                        function V(F) {
                          const B = N(F.name || '');
                          function ie(ae) {
                            return ae != null ? F.extractKey(ae) : null;
                          }
                          const re = (ae) =>
                            F.multiEntry && ht(ae)
                              ? ae.forEach((M) => B.addKey(M))
                              : B.addKey(ae);
                          (T || D).forEach((ae, M) => {
                            const R = T && ie(T[M]),
                              U = D && ie(D[M]);
                            xt(R, U) !== 0 &&
                              (R != null && re(R), U != null && re(U));
                          });
                        }
                        j.indexes.forEach(V);
                      })(x, a, w, k));
                } else if (v) {
                  const w = { from: v.lower, to: v.upper };
                  (g.add(w), S.add(w));
                } else
                  (S.add(r),
                    g.add(r),
                    a.indexes.forEach((w) => x(w.name).add(r)));
                return _;
              });
            },
          },
          d = ({ query: { index: f, range: y } }) => {
            var m, x;
            return [
              f,
              new Ir(
                (m = y.lower) !== null && m !== void 0 ? m : e.MIN_KEY,
                (x = y.upper) !== null && x !== void 0 ? x : e.MAX_KEY,
              ),
            ];
          },
          h = {
            get: (f) => [i, new Ir(f.key)],
            getMany: (f) => [i, new Ir().addKeys(f.keys)],
            count: d,
            query: d,
            openCursor: d,
          };
        return (
          Ze(h).forEach((f) => {
            c[f] = function (y) {
              const { subscr: m } = se;
              if (m) {
                const x = (k) => {
                    const b = `idb://${t}/${n}/${k}`;
                    return m[b] || (m[b] = new Ir());
                  },
                  S = x(''),
                  g = x(':dels'),
                  [p, v] = h[f](y);
                if ((x(p.name || '').add(v), !p.isPrimaryKey)) {
                  if (f !== 'count') {
                    const k =
                      f === 'query' &&
                      l &&
                      y.values &&
                      s.query({ ...y, values: !1 });
                    return s[f].apply(this, arguments).then((b) => {
                      if (f === 'query') {
                        if (l && y.values)
                          return k.then(({ result: w }) => (S.addKeys(w), b));
                        const _ = y.values ? b.result.map(o) : b.result;
                        y.values ? S.addKeys(_) : g.addKeys(_);
                      } else if (f === 'openCursor') {
                        const _ = b,
                          w = y.values;
                        return (
                          _ &&
                          Object.create(_, {
                            key: { get: () => (g.addKey(_.primaryKey), _.key) },
                            primaryKey: {
                              get() {
                                const N = _.primaryKey;
                                return (g.addKey(N), N);
                              },
                            },
                            value: {
                              get: () => (w && S.addKey(_.primaryKey), _.value),
                            },
                          })
                        );
                      }
                      return b;
                    });
                  }
                  g.add(r);
                }
              }
              return s[f].apply(this, arguments);
            };
          }),
          c
        );
      },
    };
  },
};
class Yn {
  constructor(t, r) {
    ((this._middlewares = {}), (this.verno = 0));
    const n = Yn.dependencies;
    ((this._options = r =
      {
        addons: Yn.addons,
        autoOpen: !0,
        indexedDB: n.indexedDB,
        IDBKeyRange: n.IDBKeyRange,
        ...r,
      }),
      (this._deps = { indexedDB: r.indexedDB, IDBKeyRange: r.IDBKeyRange }));
    const { addons: s } = r;
    ((this._dbSchema = {}),
      (this._versions = []),
      (this._storeNames = []),
      (this._allTables = {}),
      (this.idbdb = null),
      (this._novip = this));
    const a = {
      dbOpenError: null,
      isBeingOpened: !1,
      onReadyBeingFired: null,
      openComplete: !1,
      dbReadyResolve: Se,
      dbReadyPromise: null,
      cancelOpen: Se,
      openCanceller: null,
      autoSchema: !0,
      PR1398_maxLoop: 3,
    };
    var i;
    ((a.dbReadyPromise = new Y((o) => {
      a.dbReadyResolve = o;
    })),
      (a.openCanceller = new Y((o, l) => {
        a.cancelOpen = l;
      })),
      (this._state = a),
      (this.name = t),
      (this.on = Ua(this, 'populate', 'blocked', 'versionchange', 'close', {
        ready: [_f, Se],
      })),
      (this.on.ready.subscribe = zy(this.on.ready.subscribe, (o) => (l, c) => {
        Yn.vip(() => {
          const d = this._state;
          if (d.openComplete) (d.dbOpenError || Y.resolve().then(l), c && o(l));
          else if (d.onReadyBeingFired)
            (d.onReadyBeingFired.push(l), c && o(l));
          else {
            o(l);
            const h = this;
            c ||
              o(function f() {
                (h.on.ready.unsubscribe(l), h.on.ready.unsubscribe(f));
              });
          }
        });
      })),
      (this.Collection =
        ((i = this),
        va(Nb.prototype, function (o, l) {
          this.db = i;
          let c = uv,
            d = null;
          if (l)
            try {
              c = l();
            } catch (m) {
              d = m;
            }
          const h = o._ctx,
            f = h.table,
            y = f.hook.reading.fire;
          this._ctx = {
            table: f,
            index: h.index,
            isPrimKey:
              !h.index ||
              (f.schema.primKey.keyPath && h.index === f.schema.primKey.name),
            range: c,
            keysOnly: !1,
            dir: 'next',
            unique: '',
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: !0,
            isMatch: null,
            offset: 0,
            limit: 1 / 0,
            error: d,
            or: h.or,
            valueMapper: y !== li ? y : null,
          };
        }))),
      (this.Table = (function (o) {
        return va(Sb.prototype, function (l, c, d) {
          ((this.db = o),
            (this._tx = d),
            (this.name = l),
            (this.schema = c),
            (this.hook = o._allTables[l]
              ? o._allTables[l].hook
              : Ua(null, {
                  creating: [fb, Se],
                  reading: [db, li],
                  updating: [pb, Se],
                  deleting: [hb, Se],
                })));
        });
      })(this)),
      (this.Transaction = (function (o) {
        return va(Tb.prototype, function (l, c, d, h, f) {
          ((this.db = o),
            (this.mode = l),
            (this.storeNames = c),
            (this.schema = d),
            (this.chromeTransactionDurability = h),
            (this.idbtrans = null),
            (this.on = Ua(this, 'complete', 'error', 'abort')),
            (this.parent = f || null),
            (this.active = !0),
            (this._reculock = 0),
            (this._blockedFuncs = []),
            (this._resolve = null),
            (this._reject = null),
            (this._waitingFor = null),
            (this._waitingQueue = null),
            (this._spinCount = 0),
            (this._completion = new Y((y, m) => {
              ((this._resolve = y), (this._reject = m));
            })),
            this._completion.then(
              () => {
                ((this.active = !1), this.on.complete.fire());
              },
              (y) => {
                var m = this.active;
                return (
                  (this.active = !1),
                  this.on.error.fire(y),
                  this.parent
                    ? this.parent._reject(y)
                    : m && this.idbtrans && this.idbtrans.abort(),
                  Xe(y)
                );
              },
            ));
        });
      })(this)),
      (this.Version = (function (o) {
        return va(Db.prototype, function (l) {
          ((this.db = o),
            (this._cfg = {
              version: l,
              storesSource: null,
              dbschema: {},
              tables: {},
              contentUpgrade: null,
            }));
        });
      })(this)),
      (this.WhereClause = (function (o) {
        return va(dv.prototype, function (l, c, d) {
          ((this.db = o),
            (this._ctx = { table: l, index: c === ':id' ? null : c, or: d }));
          const h = o._deps.indexedDB;
          if (!h) throw new oe.MissingAPI();
          ((this._cmp = this._ascending = h.cmp.bind(h)),
            (this._descending = (f, y) => h.cmp(y, f)),
            (this._max = (f, y) => (h.cmp(f, y) > 0 ? f : y)),
            (this._min = (f, y) => (h.cmp(f, y) < 0 ? f : y)),
            (this._IDBKeyRange = o._deps.IDBKeyRange));
        });
      })(this)),
      this.on('versionchange', (o) => {
        (o.newVersion > 0
          ? console.warn(
              `Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`,
            )
          : console.warn(
              `Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`,
            ),
          this.close());
      }),
      this.on('blocked', (o) => {
        !o.newVersion || o.newVersion < o.oldVersion
          ? console.warn(`Dexie.delete('${this.name}') was blocked`)
          : console.warn(
              `Upgrade '${this.name}' blocked by other connection holding version ${o.oldVersion / 10}`,
            );
      }),
      (this._maxKey = fi(r.IDBKeyRange)),
      (this._createTransaction = (o, l, c, d) =>
        new this.Transaction(
          o,
          l,
          c,
          this._options.chromeTransactionDurability,
          d,
        )),
      (this._fireOnBlocked = (o) => {
        (this.on('blocked').fire(o),
          $a
            .filter(
              (l) => l.name === this.name && l !== this && !l._state.vcFired,
            )
            .map((l) => l.on('versionchange').fire(o)));
      }),
      this.use(Vb),
      this.use(Fb),
      this.use(zb),
      this.use($b),
      (this.vip = Object.create(this, { _vip: { value: !0 } })),
      s.forEach((o) => o(this)));
  }
  version(t) {
    if (isNaN(t) || t < 0.1)
      throw new oe.Type('Given version is not a positive number');
    if (
      ((t = Math.round(10 * t) / 10), this.idbdb || this._state.isBeingOpened)
    )
      throw new oe.Schema('Cannot add version when database is open');
    this.verno = Math.max(this.verno, t);
    const r = this._versions;
    var n = r.filter((s) => s._cfg.version === t)[0];
    return (
      n ||
      ((n = new this.Version(t)),
      r.push(n),
      r.sort(Pb),
      n.stores({}),
      (this._state.autoSchema = !1),
      n)
    );
  }
  _whenReady(t) {
    return this.idbdb &&
      (this._state.openComplete || se.letThrough || this._vip)
      ? t()
      : new Y((r, n) => {
          if (this._state.openComplete)
            return n(new oe.DatabaseClosed(this._state.dbOpenError));
          if (!this._state.isBeingOpened) {
            if (!this._options.autoOpen) return void n(new oe.DatabaseClosed());
            this.open().catch(Se);
          }
          this._state.dbReadyPromise.then(r, n);
        }).then(t);
  }
  use({ stack: t, create: r, level: n, name: s }) {
    s && this.unuse({ stack: t, name: s });
    const a = this._middlewares[t] || (this._middlewares[t] = []);
    return (
      a.push({ stack: t, create: r, level: n ?? 10, name: s }),
      a.sort((i, o) => i.level - o.level),
      this
    );
  }
  unuse({ stack: t, name: r, create: n }) {
    return (
      t &&
        this._middlewares[t] &&
        (this._middlewares[t] = this._middlewares[t].filter((s) =>
          n ? s.create !== n : !!r && s.name !== r,
        )),
      this
    );
  }
  open() {
    return Lb(this);
  }
  _close() {
    const t = this._state,
      r = $a.indexOf(this);
    if ((r >= 0 && $a.splice(r, 1), this.idbdb)) {
      try {
        this.idbdb.close();
      } catch {}
      this._novip.idbdb = null;
    }
    ((t.dbReadyPromise = new Y((n) => {
      t.dbReadyResolve = n;
    })),
      (t.openCanceller = new Y((n, s) => {
        t.cancelOpen = s;
      })));
  }
  close() {
    this._close();
    const t = this._state;
    ((this._options.autoOpen = !1),
      (t.dbOpenError = new oe.DatabaseClosed()),
      t.isBeingOpened && t.cancelOpen(t.dbOpenError));
  }
  delete() {
    const t = arguments.length > 0,
      r = this._state;
    return new Y((n, s) => {
      const a = () => {
        this.close();
        var i = this._deps.indexedDB.deleteDatabase(this.name);
        ((i.onsuccess = Re(() => {
          ((function ({ indexedDB: o, IDBKeyRange: l }, c) {
            !jf(o) && c !== Ml && Ef(o, l).delete(c).catch(Se);
          })(this._deps, this.name),
            n());
        })),
          (i.onerror = pr(s)),
          (i.onblocked = this._fireOnBlocked));
      };
      if (t)
        throw new oe.InvalidArgument('Arguments not allowed in db.delete()');
      r.isBeingOpened ? r.dbReadyPromise.then(a) : a();
    });
  }
  backendDB() {
    return this.idbdb;
  }
  isOpen() {
    return this.idbdb !== null;
  }
  hasBeenClosed() {
    const t = this._state.dbOpenError;
    return t && t.name === 'DatabaseClosed';
  }
  hasFailed() {
    return this._state.dbOpenError !== null;
  }
  dynamicallyOpened() {
    return this._state.autoSchema;
  }
  get tables() {
    return Ze(this._allTables).map((t) => this._allTables[t]);
  }
  transaction() {
    const t = Mb.apply(this, arguments);
    return this._transaction.apply(this, t);
  }
  _transaction(t, r, n) {
    let s = se.trans;
    (s && s.db === this && t.indexOf('!') === -1) || (s = null);
    const a = t.indexOf('?') !== -1;
    let i, o;
    t = t.replace('!', '').replace('?', '');
    try {
      if (
        ((o = r.map((c) => {
          var d = c instanceof this.Table ? c.name : c;
          if (typeof d != 'string')
            throw new TypeError(
              'Invalid table argument to Dexie.transaction(). Only Table or String are allowed',
            );
          return d;
        })),
        t == 'r' || t === vu)
      )
        i = vu;
      else {
        if (t != 'rw' && t != xu)
          throw new oe.InvalidArgument('Invalid transaction mode: ' + t);
        i = xu;
      }
      if (s) {
        if (s.mode === vu && i === xu) {
          if (!a)
            throw new oe.SubTransaction(
              'Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY',
            );
          s = null;
        }
        (s &&
          o.forEach((c) => {
            if (s && s.storeNames.indexOf(c) === -1) {
              if (!a)
                throw new oe.SubTransaction(
                  'Table ' + c + ' not included in parent transaction.',
                );
              s = null;
            }
          }),
          a && s && !s.active && (s = null));
      }
    } catch (c) {
      return s
        ? s._promise(null, (d, h) => {
            h(c);
          })
        : Xe(c);
    }
    const l = mv.bind(null, this, i, o, s, n);
    return s
      ? s._promise(i, l, 'lock')
      : se.trans
        ? aa(se.transless, () => this._whenReady(l))
        : this._whenReady(l);
  }
  table(t) {
    if (!$t(this._allTables, t))
      throw new oe.InvalidTable(`Table ${t} does not exist`);
    return this._allTables[t];
  }
}
const Bb =
  typeof Symbol < 'u' && 'observable' in Symbol
    ? Symbol.observable
    : '@@observable';
class Kb {
  constructor(t) {
    this._subscribe = t;
  }
  subscribe(t, r, n) {
    return this._subscribe(
      t && typeof t != 'function' ? t : { next: t, error: r, complete: n },
    );
  }
  [Bb]() {
    return this;
  }
}
function yv(e, t) {
  return (
    Ze(t).forEach((r) => {
      sl(e[r] || (e[r] = new Ir()), t[r]);
    }),
    e
  );
}
function Hb(e) {
  let t,
    r = !1;
  const n = new Kb((s) => {
    const a = xf(e);
    let i = !1,
      o = {},
      l = {};
    const c = {
      get closed() {
        return i;
      },
      unsubscribe: () => {
        ((i = !0), En.storagemutated.unsubscribe(y));
      },
    };
    s.start && s.start(c);
    let d = !1,
      h = !1;
    function f() {
      return Ze(l).some((x) => o[x] && Ub(o[x], l[x]));
    }
    const y = (x) => {
        (yv(o, x), f() && m());
      },
      m = () => {
        if (d || i) return;
        o = {};
        const x = {},
          S = (function (g) {
            a && sa();
            const p = () => Sn(e, { subscr: g, trans: null }),
              v = se.trans ? aa(se.transless, p) : p();
            return (a && v.then(Kr, Kr), v);
          })(x);
        (h || (En(di, y), (h = !0)),
          (d = !0),
          Promise.resolve(S).then(
            (g) => {
              ((r = !0),
                (t = g),
                (d = !1),
                i || (f() ? m() : ((o = {}), (l = x), s.next && s.next(g))));
            },
            (g) => {
              ((d = !1), (r = !1), s.error && s.error(g), c.unsubscribe());
            },
          ));
      };
    return (m(), c);
  });
  return ((n.hasValue = () => r), (n.getValue = () => t), n);
}
let ld;
try {
  ld = {
    indexedDB:
      Ae.indexedDB || Ae.mozIndexedDB || Ae.webkitIndexedDB || Ae.msIndexedDB,
    IDBKeyRange: Ae.IDBKeyRange || Ae.webkitIDBKeyRange,
  };
} catch {
  ld = { indexedDB: null, IDBKeyRange: null };
}
const Mn = Yn;
function No(e) {
  let t = Or;
  try {
    ((Or = !0), En.storagemutated.fire(e));
  } finally {
    Or = t;
  }
}
(Ws(Mn, {
  ...xo,
  delete: (e) => new Mn(e, { addons: [] }).delete(),
  exists: (e) =>
    new Mn(e, { addons: [] })
      .open()
      .then((t) => (t.close(), !0))
      .catch('NoSuchDatabaseError', () => !1),
  getDatabaseNames(e) {
    try {
      return (function ({ indexedDB: t, IDBKeyRange: r }) {
        return jf(t)
          ? Promise.resolve(t.databases()).then((n) =>
              n.map((s) => s.name).filter((s) => s !== Ml),
            )
          : Ef(t, r).toCollection().primaryKeys();
      })(Mn.dependencies).then(e);
    } catch {
      return Xe(new oe.MissingAPI());
    }
  },
  defineClass: () =>
    function (e) {
      _t(this, e);
    },
  ignoreTransaction: (e) => (se.trans ? aa(se.transless, e) : e()),
  vip: ad,
  async: function (e) {
    return function () {
      try {
        var t = id(e.apply(this, arguments));
        return t && typeof t.then == 'function' ? t : Y.resolve(t);
      } catch (r) {
        return Xe(r);
      }
    };
  },
  spawn: function (e, t, r) {
    try {
      var n = id(e.apply(r, t || []));
      return n && typeof n.then == 'function' ? n : Y.resolve(n);
    } catch (s) {
      return Xe(s);
    }
  },
  currentTransaction: { get: () => se.trans || null },
  waitFor: function (e, t) {
    const r = Y.resolve(
      typeof e == 'function' ? Mn.ignoreTransaction(e) : e,
    ).timeout(t || 6e4);
    return se.trans ? se.trans.waitFor(r) : r;
  },
  Promise: Y,
  debug: {
    get: () => Sr,
    set: (e) => {
      Zy(e, e === 'dexie' ? () => !0 : lv);
    },
  },
  derive: Os,
  extend: _t,
  props: Ws,
  override: zy,
  Events: Ua,
  on: En,
  liveQuery: Hb,
  extendObservabilitySet: yv,
  getByKeyPath: Vr,
  setByKeyPath: lr,
  delByKeyPath: function (e, t) {
    typeof t == 'string'
      ? lr(e, t, void 0)
      : 'length' in t &&
        [].map.call(t, function (r) {
          lr(e, r, void 0);
        });
  },
  shallowClone: Hy,
  deepClone: Ei,
  getObjectDiff: Cf,
  cmp: xt,
  asap: By,
  minKey: Yc,
  addons: [],
  connections: $a,
  errnames: bf,
  dependencies: ld,
  semVer: ap,
  version: ap
    .split('.')
    .map((e) => parseInt(e))
    .reduce((e, t, r) => e + t / Math.pow(10, 2 * r)),
}),
  (Mn.maxKey = fi(Mn.dependencies.IDBKeyRange)),
  typeof dispatchEvent < 'u' &&
    typeof addEventListener < 'u' &&
    (En(di, (e) => {
      if (!Or) {
        let t;
        (Ll
          ? ((t = document.createEvent('CustomEvent')),
            t.initCustomEvent(nn, !0, !0, e))
          : (t = new CustomEvent(nn, { detail: e })),
          (Or = !0),
          dispatchEvent(t),
          (Or = !1));
      }
    }),
    addEventListener(nn, ({ detail: e }) => {
      Or || No(e);
    })));
let Or = !1;
if (typeof BroadcastChannel < 'u') {
  const e = new BroadcastChannel(nn);
  (typeof e.unref == 'function' && e.unref(),
    En(di, (t) => {
      Or || e.postMessage(t);
    }),
    (e.onmessage = (t) => {
      t.data && No(t.data);
    }));
} else if (typeof self < 'u' && typeof navigator < 'u') {
  (En(di, (t) => {
    try {
      Or ||
        (typeof localStorage < 'u' &&
          localStorage.setItem(
            nn,
            JSON.stringify({ trig: Math.random(), changedParts: t }),
          ),
        typeof self.clients == 'object' &&
          [...self.clients.matchAll({ includeUncontrolled: !0 })].forEach((r) =>
            r.postMessage({ type: nn, changedParts: t }),
          ));
    } catch {}
  }),
    typeof addEventListener < 'u' &&
      addEventListener('storage', (t) => {
        if (t.key === nn) {
          const r = JSON.parse(t.newValue);
          r && No(r.changedParts);
        }
      }));
  const e = self.document && navigator.serviceWorker;
  e &&
    e.addEventListener('message', function ({ data: t }) {
      t && t.type === nn && No(t.changedParts);
    });
}
((Y.rejectionMapper = function (e, t) {
  if (
    !e ||
    e instanceof Ls ||
    e instanceof TypeError ||
    e instanceof SyntaxError ||
    !e.name ||
    !tp[e.name]
  )
    return e;
  var r = new tp[e.name](t || e.message, e);
  return (
    'stack' in e &&
      Mr(r, 'stack', {
        get: function () {
          return this.inner.stack;
        },
      }),
    r
  );
}),
  Zy(Sr, lv));
const pi = ['not_sent', 'in_progress', 'sent', 'responded'],
  Wb = 120,
  vv = Wb * 24 * 60 * 60 * 1e3,
  ia = 'admin_master',
  xv = [ia, 'admin', 'manager', 'publisher', 'viewer'],
  qb = {
    BASE_URL: '/Assigna/',
    DEV: !1,
    MODE: 'production',
    PROD: !0,
    SSR: !1,
  };
var Zb = {};
const Af = (e) => {
    const t = typeof import.meta < 'u' && qb;
    if (t) {
      const n = t[e];
      if (typeof n == 'string') return n;
    }
    const r = Zb;
    if (r) {
      const n = r[e];
      if (typeof n == 'string') return n;
    }
  },
  hp = 'admin_master',
  pp = Af('VITE_ADMIN_MASTER_NAME') ?? 'Administrador Master',
  mp = Af('VITE_ADMIN_MASTER_EMAIL') ?? 'admin_master@example.com',
  gp = Af('VITE_ADMIN_MASTER_PASSWORD') ?? 'assigna123',
  Su = ia,
  Qb = 'modulepreload',
  Gb = function (e) {
    return '/Assigna/' + e;
  },
  yp = {},
  Yb = function (t, r, n) {
    let s = Promise.resolve();
    if (r && r.length > 0) {
      document.getElementsByTagName('link');
      const i = document.querySelector('meta[property=csp-nonce]'),
        o =
          (i == null ? void 0 : i.nonce) ||
          (i == null ? void 0 : i.getAttribute('nonce'));
      s = Promise.allSettled(
        r.map((l) => {
          if (((l = Gb(l)), l in yp)) return;
          yp[l] = !0;
          const c = l.endsWith('.css'),
            d = c ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${l}"]${d}`)) return;
          const h = document.createElement('link');
          if (
            ((h.rel = c ? 'stylesheet' : Qb),
            c || (h.as = 'script'),
            (h.crossOrigin = ''),
            (h.href = l),
            o && h.setAttribute('nonce', o),
            document.head.appendChild(h),
            c)
          )
            return new Promise((f, y) => {
              (h.addEventListener('load', f),
                h.addEventListener('error', () =>
                  y(new Error(`Unable to preload CSS for ${l}`)),
                ));
            });
        }),
      );
    }
    function a(i) {
      const o = new Event('vite:preloadError', { cancelable: !0 });
      if (((o.payload = i), window.dispatchEvent(o), !o.defaultPrevented))
        throw i;
    }
    return s.then((i) => {
      for (const o of i || []) o.status === 'rejected' && a(o.reason);
      return t().catch(a);
    });
  },
  Jb = new TextEncoder(),
  Xb = (e) => {
    const t = new Uint8Array(e);
    return Array.from(t)
      .map((r) => r.toString(16).padStart(2, '0'))
      .join('');
  },
  vp = (e) => {
    const t = e.trim().toLowerCase();
    if (t.length === 0 || t.length % 2 !== 0) return null;
    const r = t.length / 2,
      n = new Uint8Array(r);
    for (let s = 0; s < r; s++) {
      const a = s * 2,
        i = Number.parseInt(t.slice(a, a + 2), 16);
      if (Number.isNaN(i)) return null;
      n[s] = i;
    }
    return n;
  },
  e_ = (e, t) => {
    if (e.length !== t.length) return !1;
    let r = 0;
    for (let n = 0; n < e.length; n++) r |= e[n] ^ t[n];
    return r === 0;
  },
  t_ = async () => {
    var n, s;
    const e = globalThis.crypto,
      t =
        (e == null ? void 0 : e.subtle) ??
        ((n = e == null ? void 0 : e.webcrypto) == null ? void 0 : n.subtle);
    if (t) return t;
    const r = globalThis.process;
    if (
      typeof ((s = r == null ? void 0 : r.versions) == null
        ? void 0
        : s.node) == 'string'
    ) {
      const { webcrypto: a } = await Yb(
        async () => {
          const { webcrypto: i } = await Promise.resolve().then(() => YN);
          return { webcrypto: i };
        },
        void 0,
      );
      if (a != null && a.subtle) return a.subtle;
    }
    throw new Error('SubtleCrypto API is not available in this environment');
  },
  qs = async (e) => {
    const t = await t_(),
      r = e.normalize('NFKC'),
      n = Jb.encode(r),
      s = await t.digest('SHA-256', n);
    return Xb(s);
  },
  r_ = async (e, t) => {
    if (typeof t != 'string' || t.trim().length === 0) return !1;
    const r = vp(t);
    if (!r) return !1;
    const n = await qs(e),
      s = vp(n);
    return s ? e_(r, s) : !1;
  },
  xp = ['Prédio', 'Vila', 'Residência', 'Comércio'];
class n_ extends Yn {
  constructor() {
    super('assigna');
    Et(this, 'territorios');
    Et(this, 'saidas');
    Et(this, 'designacoes');
    Et(this, 'sugestoes');
    Et(this, 'streets');
    Et(this, 'propertyTypes');
    Et(this, 'addresses');
    Et(this, 'buildingsVillages');
    Et(this, 'derivedTerritories');
    Et(this, 'derivedTerritoryAddresses');
    Et(this, 'metadata');
    Et(this, 'naoEmCasa');
    Et(this, 'users');
    (this.version(3).stores({
      territorios: 'id, nome',
      saidas: 'id, nome, diaDaSemana',
      designacoes: 'id, territorioId, saidaId',
      sugestoes: '[territorioId+saidaId]',
      metadata: 'key',
      streets: '++id, territoryId, name',
      property_types: '++id, name',
      addresses: '++id, streetId, numberStart, numberEnd',
      buildingsVillages: 'id, territory_id',
      derived_territories: '++id, baseTerritoryId, name',
      derived_territory_addresses: '[derivedTerritoryId+addressId]',
    }),
      this.version(4).stores({
        territorios: 'id, nome',
        saidas: 'id, nome, diaDaSemana',
        designacoes: 'id, territorioId, saidaId',
        sugestoes: '[territorioId+saidaId]',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses:
          '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
      }),
      this.version(5).stores({
        territorios: 'id, nome',
        saidas: 'id, nome, diaDaSemana',
        designacoes: 'id, territorioId, saidaId',
        sugestoes: '[territorioId+saidaId]',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses:
          '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
        nao_em_casa: 'id, territorioId, followUpAt, completedAt',
      }),
      this.version(6).stores({
        territorios: 'id, nome',
        saidas: 'id, nome, diaDaSemana',
        designacoes: 'id, territorioId, saidaId',
        sugestoes: '[territorioId+saidaId]',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses:
          '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
        nao_em_casa: 'id, territorioId, followUpAt, completedAt',
      }),
      this.version(7)
        .stores({
          territorios: 'id, nome, publisherId',
          saidas: 'id, nome, diaDaSemana, publisherId',
          designacoes: 'id, territorioId, saidaId, publisherId',
          sugestoes:
            '[territorioId+saidaId], territorioId, saidaId, publisherId',
          metadata: 'key',
          streets: '++id, territoryId, name',
          property_types: '++id, name',
          addresses:
            '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
          buildingsVillages: 'id, territory_id, publisherId',
          derived_territories: '++id, baseTerritoryId, name',
          derived_territory_addresses: '[derivedTerritoryId+addressId]',
          nao_em_casa: 'id, territorioId, followUpAt, completedAt, publisherId',
        })
        .upgrade(async (r) => {
          const n = '',
            s = [
              'territorios',
              'saidas',
              'designacoes',
              'sugestoes',
              'buildingsVillages',
              'nao_em_casa',
            ];
          await Promise.all(
            s.map((a) =>
              r
                .table(a)
                .toCollection()
                .modify((i) => {
                  typeof i.publisherId != 'string' && (i.publisherId = n);
                }),
            ),
          );
        }),
      this.version(8).stores({
        territorios: 'id, nome, publisherId',
        saidas: 'id, nome, diaDaSemana, publisherId',
        designacoes: 'id, territorioId, saidaId, publisherId',
        sugestoes: '[territorioId+saidaId], territorioId, saidaId, publisherId',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses:
          '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id, publisherId',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
        nao_em_casa: 'id, territorioId, followUpAt, completedAt, publisherId',
      }),
      this.version(9).stores({
        territorios: 'id, nome, publisherId',
        saidas: 'id, nome, diaDaSemana, publisherId',
        designacoes: 'id, territorioId, saidaId, publisherId',
        sugestoes: '[territorioId+saidaId], territorioId, saidaId, publisherId',
        metadata: 'key',
        streets: '++id, territoryId, name',
        property_types: '++id, name',
        addresses:
          '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
        buildingsVillages: 'id, territory_id, publisherId',
        derived_territories: '++id, baseTerritoryId, name',
        derived_territory_addresses: '[derivedTerritoryId+addressId]',
        nao_em_casa: 'id, territorioId, followUpAt, completedAt, publisherId',
        users: 'id, email, role',
      }),
      this.version(10)
        .stores({
          territorios: 'id, nome, publisherId',
          saidas: 'id, nome, diaDaSemana, publisherId',
          designacoes: 'id, territorioId, saidaId, publisherId',
          sugestoes:
            '[territorioId+saidaId], territorioId, saidaId, publisherId',
          metadata: 'key',
          streets: '++id, territoryId, name',
          property_types: '++id, name',
          addresses:
            '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
          buildingsVillages: 'id, territory_id, publisherId',
          derived_territories: '++id, baseTerritoryId, name',
          derived_territory_addresses: '[derivedTerritoryId+addressId]',
          nao_em_casa:
            'id, territorioId, followUpAt, completedAt, conversationConfirmed, publisherId',
          users: 'id, email, role',
        })
        .upgrade(async (r) => {
          await r
            .table('nao_em_casa')
            .toCollection()
            .modify((n) => {
              typeof n.conversationConfirmed != 'boolean' &&
                (n.conversationConfirmed = !1);
            });
        }),
      this.version(11)
        .stores({
          territorios: 'id, nome, publisherId',
          saidas: 'id, nome, diaDaSemana, publisherId',
          designacoes: 'id, territorioId, saidaId, publisherId',
          sugestoes:
            '[territorioId+saidaId], territorioId, saidaId, publisherId',
          metadata: 'key',
          streets: '++id, territoryId, name',
          property_types: '++id, name',
          addresses:
            '++id, streetId, numberStart, numberEnd, lastSuccessfulVisit, nextVisitAllowed',
          buildingsVillages: 'id, territory_id, publisherId',
          derived_territories: '++id, baseTerritoryId, name',
          derived_territory_addresses: '[derivedTerritoryId+addressId]',
          nao_em_casa:
            'id, territorioId, followUpAt, completedAt, conversationConfirmed, publisherId',
          users: 'id, email, role',
        })
        .upgrade(async (r) => {
          await r
            .table('users')
            .toCollection()
            .modify((n) => {
              typeof n.passwordHash != 'string' && (n.passwordHash = '');
            });
        }),
      (this.buildingsVillages = this.table('buildingsVillages')),
      (this.propertyTypes = this.table('property_types')),
      (this.derivedTerritories = this.table('derived_territories')),
      (this.derivedTerritoryAddresses = this.table(
        'derived_territory_addresses',
      )),
      (this.naoEmCasa = this.table('nao_em_casa')),
      (this.users = this.table('users')));
  }
}
const I = new n_(),
  Zs = 11;
async function s_() {
  await I.transaction('rw', I.propertyTypes, async () => {
    const e = await I.propertyTypes.toArray(),
      t = new Set(
        e
          .map((s) =>
            typeof s.name == 'string' ? s.name.trim().toLowerCase() : '',
          )
          .filter((s) => s.length > 0),
      ),
      r = xp.filter((s) => !t.has(s.trim().toLowerCase())),
      n = e.length === 0 ? xp : r;
    n.length > 0 &&
      (await I.propertyTypes.bulkAdd(n.map((s) => ({ name: s }))));
  });
}
async function wv() {
  await s_();
}
async function If() {
  const e = await I.users.get(hp),
    t = new Date().toISOString();
  if (!e) {
    const s = await qs(gp),
      a = {
        id: hp,
        name: pp,
        email: mp,
        role: Su,
        passwordHash: s,
        createdAt: t,
        updatedAt: t,
      };
    await I.users.put(a);
    return;
  }
  const r = {};
  let n = !1;
  ((typeof e.passwordHash != 'string' || e.passwordHash.trim().length === 0) &&
    ((r.passwordHash = await qs(gp)), (n = !0)),
    e.role !== Su && ((r.role = Su), (n = !0)),
    (typeof e.name != 'string' || e.name.trim().length === 0) &&
      ((r.name = pp), (n = !0)),
    (typeof e.email != 'string' || e.email.trim().length === 0) &&
      ((r.email = mp), (n = !0)),
    (typeof e.createdAt != 'string' || e.createdAt.trim().length === 0) &&
      ((r.createdAt = t), (n = !0)),
    n
      ? ((r.updatedAt = t), await I.users.put({ ...e, ...r, id: e.id }))
      : (typeof e.updatedAt != 'string' || e.updatedAt.trim().length === 0) &&
        (await I.users.put({ ...e, updatedAt: t })));
}
async function a_() {
  await I.open();
  const e = await I.metadata.get('schemaVersion');
  return (e == null ? void 0 : e.value) ?? 0;
}
async function i_(e) {
  await I.metadata.put({ key: 'schemaVersion', value: e });
}
async function o_() {
  const e = await a_();
  (e < 2 &&
    (await I.transaction(
      'rw',
      I.territorios,
      I.buildingsVillages,
      I.metadata,
      async () => {
        const t = await I.territorios.toArray();
        let r = 0;
        for (const n of t) {
          const s = Array.isArray(n.legacyBuildings) ? n.legacyBuildings : [];
          if (s.length === 0) continue;
          const { legacyBuildings: a, ...i } = n;
          await I.territorios.put(i);
          const o = (...d) => {
              for (const h of d) if (h != null) return h;
              return null;
            },
            l = (...d) => {
              for (const h of d) {
                if (h == null) continue;
                const f = typeof h == 'number' ? h : Number(h);
                if (!Number.isNaN(f)) return f;
              }
              return null;
            },
            c = s.map((d, h) => {
              const f = `${n.id}-${h + 1}`,
                y = d.id ?? f,
                m = d.territoryId ?? d.territorioId ?? n.id;
              return {
                id: y,
                territory_id: m,
                publisherId: '',
                name: o(d.name),
                address_line: o(d.addressLine, d.address_line),
                type: o(d.type),
                number: o(d.number),
                residences_count: l(d.residencesCount, d.residences_count),
                modality: o(d.modality),
                reception_type: o(d.receptionType, d.reception_type),
                responsible: o(d.responsible),
                contact_method: null,
                letter_status: null,
                letter_history: [],
                assigned_at: o(d.assignedAt, d.assigned_at),
                returned_at: o(d.returnedAt, d.returned_at),
                block: o(d.block),
                notes: o(d.notes),
                created_at: o(
                  d.createdAt,
                  d.created_at,
                  d.assignedAt,
                  d.assigned_at,
                ),
              };
            });
          c.length > 0 &&
            (await I.buildingsVillages.bulkPut(c), (r += c.length));
        }
        if (r > 0) {
          const n = await I.metadata.get('buildingsVillagesMigrated'),
            s = ((n == null ? void 0 : n.value) ?? 0) + r;
          await I.metadata.put({ key: 'buildingsVillagesMigrated', value: s });
        }
      },
    )),
    e < 3 &&
      (await I.transaction(
        'rw',
        [
          I.buildingsVillages,
          I.streets,
          I.addresses,
          I.propertyTypes,
          I.derivedTerritories,
          I.derivedTerritoryAddresses,
          I.metadata,
        ],
        async () => {
          var o, l;
          const t = 'Building/Village',
            r = await I.propertyTypes.where('name').equals(t).first();
          let n;
          (r == null ? void 0 : r.id) !== void 0
            ? (n = r.id)
            : (n = await I.propertyTypes.add({ name: t }));
          const s = await I.buildingsVillages.toArray(),
            a = new Map();
          let i = 0;
          for (const c of s) {
            if (!c.territory_id) continue;
            const d = (o = c.address_line) == null ? void 0 : o.trim(),
              h = (l = c.number) == null ? void 0 : l.trim();
            if (!d || !h || !/^\d+$/.test(h)) continue;
            const f = `${c.territory_id}::${d.toLowerCase()}`;
            let y = a.get(f);
            y === void 0 &&
              ((y = await I.streets.add({
                territoryId: c.territory_id,
                name: d,
              })),
              a.set(f, y));
            const m = Number.parseInt(h, 10),
              x = await I.addresses.add({
                streetId: y,
                numberStart: m,
                numberEnd: m,
                propertyTypeId: n,
              }),
              S = await I.derivedTerritories.add({
                baseTerritoryId: c.territory_id,
                name: c.name ?? `Derived territory ${c.id}`,
              });
            (await I.derivedTerritoryAddresses.put({
              derivedTerritoryId: S,
              addressId: x,
            }),
              i++);
          }
          if (i > 0) {
            const c = await I.metadata.get('derivedTerritoriesMigrated'),
              d = ((c == null ? void 0 : c.value) ?? 0) + i;
            await I.metadata.put({
              key: 'derivedTerritoriesMigrated',
              value: d,
            });
          }
        },
      )),
    e < 4 &&
      (await I.transaction('rw', I.addresses, I.metadata, async () => {
        const t = await I.addresses.toArray();
        let r = 0;
        for (const n of t) {
          const s = n.id;
          if (s === void 0) continue;
          const a = n.lastSuccessfulVisit,
            i = typeof a == 'string' ? new Date(a) : null,
            o = i && !Number.isNaN(i.getTime()) ? i.toISOString() : null,
            l = n.nextVisitAllowed,
            c = typeof l == 'string' ? new Date(l) : null;
          let h = c && !Number.isNaN(c.getTime()) ? c.toISOString() : null;
          !h && o && (h = new Date(new Date(o).getTime() + vv).toISOString());
          const f = {};
          (n.lastSuccessfulVisit !== o && (f.lastSuccessfulVisit = o),
            n.nextVisitAllowed !== h && (f.nextVisitAllowed = h),
            Object.keys(f).length > 0 && (await I.addresses.update(s, f), r++));
        }
        if (r > 0) {
          const n = await I.metadata.get('addressVisitsMigrated'),
            s = ((n == null ? void 0 : n.value) ?? 0) + r;
          await I.metadata.put({ key: 'addressVisitsMigrated', value: s });
        }
      })),
    e < 5 &&
      (await I.transaction('rw', I.buildingsVillages, I.metadata, async () => {
        const t = new Set(pi),
          r = (o) => {
            if (typeof o != 'string') return null;
            const l = o.trim();
            return l.length > 0 ? l : null;
          },
          n = (o) => {
            if (typeof o != 'string') return null;
            const l = o.trim();
            return l.length === 0
              ? null
              : /^\d{4}-\d{2}-\d{2}/.test(l) && l.length > 10
                ? l.slice(0, 10)
                : l;
          },
          s = (o, l, c) => {
            if (typeof l != 'object' || l === null) return null;
            const d = l,
              h = d.id,
              f = `${o}-letter-${c + 1}`,
              y = typeof h == 'string' && h.trim().length > 0 ? h.trim() : f,
              m = d.status,
              x = typeof m == 'string' && t.has(m) ? m : 'sent',
              S = n(
                typeof d.sent_at == 'string'
                  ? d.sent_at
                  : typeof d.sentAt == 'string'
                    ? d.sentAt
                    : null,
              ),
              g = r(
                typeof d.notes == 'string'
                  ? d.notes
                  : typeof d.description == 'string'
                    ? d.description
                    : null,
              );
            return { id: y, status: x, sent_at: S, notes: g };
          },
          a = await I.buildingsVillages.toArray();
        let i = 0;
        for (const o of a) {
          const l = {},
            c = o.contact_method;
          if (typeof c == 'string') {
            const x = c.trim();
            x.length === 0
              ? (l.contact_method = null)
              : x !== c && (l.contact_method = x);
          } else (c === void 0 || c !== null) && (l.contact_method = null);
          const d = o.letter_status;
          let h = null;
          (typeof d == 'string' && t.has(d) && (h = d),
            d !== h && (l.letter_status = h));
          const f = o.letter_history,
            y = Array.isArray(f)
              ? f.map((x, S) => s(o.id, x, S)).filter((x) => x !== null)
              : [];
          let m = !0;
          (Array.isArray(f) &&
            (m =
              f.length !== y.length ||
              f.some((x, S) => {
                const g = y[S];
                if (!g) return !0;
                const p = x,
                  v =
                    typeof (p == null ? void 0 : p.sent_at) == 'string'
                      ? p.sent_at
                      : typeof (p == null ? void 0 : p.sentAt) == 'string'
                        ? p.sentAt
                        : null,
                  k =
                    typeof (p == null ? void 0 : p.notes) == 'string'
                      ? p.notes
                      : typeof (p == null ? void 0 : p.description) == 'string'
                        ? p.description
                        : null;
                return (
                  (p == null ? void 0 : p.id) !== g.id ||
                  (p == null ? void 0 : p.status) !== g.status ||
                  v !== g.sent_at ||
                  k !== g.notes
                );
              })),
            m && (l.letter_history = y),
            Object.keys(l).length > 0 &&
              (await I.buildingsVillages.update(o.id, l), i++));
        }
        if (i > 0) {
          const o = await I.metadata.get('buildingsVillagesLettersMigrated'),
            l = ((o == null ? void 0 : o.value) ?? 0) + i;
          await I.metadata.put({
            key: 'buildingsVillagesLettersMigrated',
            value: l,
          });
        }
      })),
    e < 7 &&
      (await I.transaction(
        'rw',
        [
          I.territorios,
          I.saidas,
          I.designacoes,
          I.sugestoes,
          I.buildingsVillages,
          I.naoEmCasa,
        ],
        async () => {
          const t = '',
            r = async (n) => {
              await n.toCollection().modify((s) => {
                typeof s.publisherId != 'string' && (s.publisherId = t);
              });
            };
          await Promise.all([
            r(I.territorios),
            r(I.saidas),
            r(I.designacoes),
            r(I.sugestoes),
            r(I.buildingsVillages),
            r(I.naoEmCasa),
          ]);
        },
      )),
    e < 8 && (await wv()),
    await If(),
    e < Zs && (await i_(Zs)));
}
const Fr = {
    async all() {
      return I.designacoes.toArray();
    },
    async forPublisher(e) {
      return I.designacoes.where('publisherId').equals(e).toArray();
    },
    async add(e) {
      await I.designacoes.put(e);
    },
    async bulkAdd(e) {
      await I.designacoes.bulkPut(e);
    },
    async clear() {
      await I.designacoes.clear();
    },
    async remove(e) {
      await I.designacoes.delete(e);
    },
  },
  l_ = (e) => {
    const t = new Map();
    return (
      e.forEach((r) => {
        const n = r.dataInicial.slice(0, 7),
          s = `${r.saidaId}-${n}`,
          a = t.get(s) || { saidaId: r.saidaId, month: n, total: 0 };
        ((a.total += 1), t.set(s, a));
      }),
      Array.from(t.values())
    );
  },
  u_ = (e, t) => {
    const n = [
      `generated_at,${new Date().toISOString().split('T')[0]}`,
      t.join(','),
    ];
    return (
      e.forEach((s) => {
        const a = t
          .map((i) => {
            const o = s[i];
            return o == null ? '' : `"${String(o).replace(/"/g, '""')}"`;
          })
          .join(',');
        n.push(a);
      }),
      n.join(`
`)
    );
  },
  c_ = (e, t, r) => {
    const n = new Blob([e], { type: r }),
      s = URL.createObjectURL(n),
      a = document.createElement('a');
    ((a.href = s), (a.download = t), a.click(), URL.revokeObjectURL(s));
  },
  bv = 'tm.exportScheduler';
function d_() {
  const e = new Date();
  return (e.setMonth(e.getMonth() + 1), e.setHours(0, 0, 0, 0), e.getTime());
}
function f_() {
  try {
    const e = localStorage.getItem(bv);
    if (e) return JSON.parse(e);
  } catch {}
  return { enabled: !1, nextRun: d_() };
}
function h_(e) {
  localStorage.setItem(bv, JSON.stringify(e));
}
function p_(e) {
  const [t, r] = C.useState(() => f_());
  return (
    C.useEffect(() => {
      h_(t);
    }, [t]),
    C.useEffect(() => {
      if (!t.enabled || !e) return;
      const n = setInterval(
        async () => {
          if (Date.now() >= t.nextRun) {
            const s = await Fr.forPublisher(e),
              a = l_(s).map((c) => ({ ...c })),
              i = u_(a, ['saidaId', 'month', 'total']),
              o = new Date().toISOString().split('T')[0];
            c_(i, `monthly-summary-${o}.csv`, 'text/csv');
            const l = new Date(t.nextRun);
            (l.setMonth(l.getMonth() + 1), r({ ...t, nextRun: l.getTime() }));
          }
        },
        60 * 60 * 1e3,
      );
      return () => clearInterval(n);
    }, [t, e]),
    { config: t, setConfig: r }
  );
}
const ur = {
    async all() {
      return I.territorios.toArray();
    },
    async forPublisher(e) {
      return I.territorios.where('publisherId').equals(e).toArray();
    },
    async add(e) {
      await I.territorios.put(e);
    },
    async bulkAdd(e) {
      await I.territorios.bulkPut(e);
    },
    async clear() {
      await I.territorios.clear();
    },
    async remove(e) {
      await I.territorios.delete(e);
    },
  },
  vn = {
    async all() {
      return I.saidas.toArray();
    },
    async forPublisher(e) {
      return I.saidas.where('publisherId').equals(e).toArray();
    },
    async add(e) {
      await I.saidas.put(e);
    },
    async bulkAdd(e) {
      await I.saidas.bulkPut(e);
    },
    async clear() {
      await I.saidas.clear();
    },
    async remove(e) {
      await I.saidas.delete(e);
    },
  },
  mi = {
    async all() {
      return I.sugestoes.toArray();
    },
    async forPublisher(e) {
      return I.sugestoes.where('publisherId').equals(e).toArray();
    },
    async add(e) {
      await I.sugestoes.put(e);
    },
    async bulkAdd(e) {
      await I.sugestoes.bulkPut(e);
    },
    async clear() {
      await I.sugestoes.clear();
    },
    async remove(e, t) {
      await I.sugestoes.delete([e, t]);
    },
  },
  xn = {
    async all() {
      return I.buildingsVillages.toArray();
    },
    async forPublisher(e) {
      return I.buildingsVillages.where('publisherId').equals(e).toArray();
    },
    async add(e) {
      await I.buildingsVillages.put(e);
    },
    async bulkAdd(e) {
      await I.buildingsVillages.bulkPut(e);
    },
    async clear() {
      await I.buildingsVillages.clear();
    },
    async remove(e) {
      await I.buildingsVillages.delete(e);
    },
  },
  wn = {
    async all() {
      return I.naoEmCasa.toArray();
    },
    async forPublisher(e) {
      return I.naoEmCasa.where('publisherId').equals(e).toArray();
    },
    async add(e) {
      await I.naoEmCasa.put(e);
    },
    async bulkAdd(e) {
      await I.naoEmCasa.bulkPut(e);
    },
    async remove(e) {
      await I.naoEmCasa.delete(e);
    },
    async clear() {
      await I.naoEmCasa.clear();
    },
  },
  Yt = {
    async all() {
      return I.users.toArray();
    },
    async findById(e) {
      const t = e.trim();
      if (t) return I.users.get(t);
    },
    async findByEmail(e) {
      const t = e.trim();
      if (t) return I.users.where('email').equalsIgnoreCase(t).first();
    },
    async add(e) {
      await I.users.put(e);
    },
    async update(e) {
      await I.users.put(e);
    },
    async bulkAdd(e) {
      e.length !== 0 && (await I.users.bulkPut(e));
    },
    async remove(e) {
      await I.users.delete(e);
    },
    async clear() {
      (await I.users.clear(), await If());
    },
  },
  al = {
    auth: { currentUser: null },
    territorios: [],
    saidas: [],
    designacoes: [],
    sugestoes: [],
    naoEmCasa: [],
    users: [],
  };
function m_(e, t) {
  switch (t.type) {
    case 'SIGN_IN':
      return { ...e, auth: { currentUser: t.payload } };
    case 'SIGN_OUT':
      return al;
    case 'SET_TERRITORIOS':
      return { ...e, territorios: [...t.payload] };
    case 'ADD_TERRITORIO':
      return { ...e, territorios: [...e.territorios, t.payload] };
    case 'UPDATE_TERRITORIO':
      return {
        ...e,
        territorios: e.territorios.map((r) =>
          r.id === t.payload.id ? t.payload : r,
        ),
      };
    case 'REMOVE_TERRITORIO':
      return {
        ...e,
        territorios: e.territorios.filter((r) => r.id !== t.payload),
      };
    case 'SET_SAIDAS':
      return { ...e, saidas: [...t.payload] };
    case 'ADD_SAIDA':
      return { ...e, saidas: [...e.saidas, t.payload] };
    case 'UPDATE_SAIDA':
      return {
        ...e,
        saidas: e.saidas.map((r) => (r.id === t.payload.id ? t.payload : r)),
      };
    case 'REMOVE_SAIDA':
      return { ...e, saidas: e.saidas.filter((r) => r.id !== t.payload) };
    case 'SET_DESIGNACOES':
      return { ...e, designacoes: [...t.payload] };
    case 'ADD_DESIGNACAO':
      return { ...e, designacoes: [...e.designacoes, t.payload] };
    case 'UPDATE_DESIGNACAO':
      return {
        ...e,
        designacoes: e.designacoes.map((r) =>
          r.id === t.payload.id ? t.payload : r,
        ),
      };
    case 'REMOVE_DESIGNACAO':
      return {
        ...e,
        designacoes: e.designacoes.filter((r) => r.id !== t.payload),
      };
    case 'SET_SUGESTOES':
      return { ...e, sugestoes: [...t.payload] };
    case 'ADD_SUGESTAO':
      return { ...e, sugestoes: [...e.sugestoes, t.payload] };
    case 'UPDATE_SUGESTAO':
      return {
        ...e,
        sugestoes: e.sugestoes.map((r) =>
          r.territorioId === t.payload.territorioId &&
          r.saidaId === t.payload.saidaId
            ? t.payload
            : r,
        ),
      };
    case 'REMOVE_SUGESTAO':
      return {
        ...e,
        sugestoes: e.sugestoes.filter(
          (r) =>
            r.territorioId !== t.payload.territorioId ||
            r.saidaId !== t.payload.saidaId,
        ),
      };
    case 'SET_NAO_EM_CASA':
      return { ...e, naoEmCasa: [...t.payload] };
    case 'ADD_NAO_EM_CASA':
      return { ...e, naoEmCasa: [...e.naoEmCasa, t.payload] };
    case 'UPDATE_NAO_EM_CASA':
      return {
        ...e,
        naoEmCasa: e.naoEmCasa.map((r) =>
          r.id === t.payload.id ? t.payload : r,
        ),
      };
    case 'REMOVE_NAO_EM_CASA':
      return { ...e, naoEmCasa: e.naoEmCasa.filter((r) => r.id !== t.payload) };
    case 'SET_USERS':
      return { ...e, users: [...t.payload] };
    case 'ADD_USER':
      return { ...e, users: [...e.users, t.payload] };
    case 'UPDATE_USER':
      return {
        ...e,
        users: e.users.map((r) => (r.id === t.payload.id ? t.payload : r)),
      };
    case 'REMOVE_USER':
      return { ...e, users: e.users.filter((r) => r.id !== t.payload) };
    case 'RESET_STATE':
      return al;
    default:
      return e;
  }
}
const _v = C.createContext(null),
  Rt = () => {
    const e = C.useContext(_v);
    if (!e) throw new Error('ToastProvider missing');
    return e;
  },
  g_ = ({ children: e }) => {
    const [t, r] = C.useState([]),
      n = (a, i) => {
        const o = Date.now();
        (r((l) => [...l, { id: o, type: a, message: i }]),
          setTimeout(() => r((l) => l.filter((c) => c.id !== o)), 3e3));
      },
      s = { success: (a) => n('success', a), error: (a) => n('error', a) };
    return u.jsxs(_v.Provider, {
      value: s,
      children: [
        e,
        u.jsx('div', {
          className: 'fixed top-4 right-4 z-50 space-y-2',
          children: t.map((a) =>
            u.jsx(
              'div',
              {
                className: `px-4 py-2 rounded shadow text-white text-sm ${a.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`,
                children: a.message,
              },
              a.id,
            ),
          ),
        }),
      ],
    });
  };
function kv(e, t) {
  const [r, n] = C.useState(() => {
    try {
      const s = localStorage.getItem(e);
      return s ? JSON.parse(s) : t;
    } catch {
      return t;
    }
  });
  return (
    C.useEffect(() => {
      localStorage.setItem(e, JSON.stringify(r));
    }, [e, r]),
    [r, n]
  );
}
const oa = () => crypto.randomUUID();
C.createContext(null);
const il = 'tm.auth',
  y_ = () => {
    try {
      const e = localStorage.getItem(il);
      if (!e) return { currentUser: null };
      const t = JSON.parse(e);
      if (t && typeof t == 'object' && 'currentUser' in t) {
        const { currentUser: r } = t;
        if (!r || typeof r != 'object') return { currentUser: null };
        if (typeof r.id == 'string' && typeof r.role == 'string') {
          const n = new Date().toISOString();
          return {
            currentUser: {
              ...r,
              createdAt: typeof r.createdAt == 'string' ? r.createdAt : n,
              updatedAt: typeof r.updatedAt == 'string' ? r.updatedAt : n,
            },
          };
        }
      }
    } catch (e) {
      console.error('Failed to load auth state from storage', e);
    }
    try {
      localStorage.removeItem(il);
    } catch (e) {
      console.error('Failed to remove invalid auth state', e);
    }
    return { currentUser: null };
  },
  v_ = (e) => {
    try {
      localStorage.setItem(il, JSON.stringify(e));
    } catch (t) {
      console.error('Failed to persist auth state', t);
    }
  },
  x_ = () => {
    try {
      localStorage.removeItem(il);
    } catch (e) {
      console.error('Failed to clear auth state from storage', e);
    }
  },
  Sv = C.createContext({ state: al, dispatch: () => {} }),
  Nv = ({ children: e }) => {
    var i;
    const [t, r] = C.useReducer(m_, al),
      [n, s] = C.useState(!1),
      a = ((i = t.auth.currentUser) == null ? void 0 : i.id) ?? null;
    return (
      C.useEffect(() => {
        let o = !0;
        return (
          (async () => {
            try {
              const c = y_();
              o &&
                c.currentUser &&
                r({ type: 'SIGN_IN', payload: c.currentUser });
            } catch (c) {
              console.error('Falha ao carregar dados iniciais', c);
            } finally {
              o && s(!0);
            }
          })(),
          () => {
            o = !1;
          }
        );
      }, [r]),
      C.useEffect(() => {
        if (!n) return;
        let o = !0;
        return (
          (async () => {
            try {
              if (!a) {
                o &&
                  (r({ type: 'SET_TERRITORIOS', payload: [] }),
                  r({ type: 'SET_SAIDAS', payload: [] }),
                  r({ type: 'SET_DESIGNACOES', payload: [] }),
                  r({ type: 'SET_SUGESTOES', payload: [] }),
                  r({ type: 'SET_NAO_EM_CASA', payload: [] }),
                  r({ type: 'SET_USERS', payload: [] }));
                return;
              }
              const [c, d, h, f, y, m] = await Promise.all([
                ur.forPublisher(a),
                vn.forPublisher(a),
                Fr.forPublisher(a),
                mi.forPublisher(a),
                wn.forPublisher(a),
                Yt.all(),
              ]);
              if (!o) return;
              (r({ type: 'SET_TERRITORIOS', payload: c }),
                r({ type: 'SET_SAIDAS', payload: d }),
                r({ type: 'SET_DESIGNACOES', payload: h }),
                r({ type: 'SET_SUGESTOES', payload: f }),
                r({ type: 'SET_NAO_EM_CASA', payload: y }),
                r({ type: 'SET_USERS', payload: m }));
            } catch (c) {
              console.error('Falha ao carregar dados iniciais', c);
            }
          })(),
          () => {
            o = !1;
          }
        );
      }, [n, a, r]),
      C.useEffect(() => {
        n && (t.auth.currentUser ? v_(t.auth) : x_());
      }, [n, t.auth]),
      u.jsx(Sv.Provider, { value: { state: t, dispatch: r }, children: e })
    );
  },
  Pn = () => C.useContext(Sv),
  w_ = (e) => e.territorios,
  b_ = (e) => e.saidas,
  __ = (e) => e.designacoes,
  k_ = (e) => e.naoEmCasa,
  S_ = (e) => e.auth.currentUser,
  N_ = (e) => e.users,
  Nr = () => {
    const { state: e, dispatch: t } = Pn(),
      r = S_(e),
      n = C.useCallback(
        async ({ identifier: a, password: i }) => {
          const o = a.trim(),
            l = i.trim();
          if (!o || !l) return null;
          try {
            const c = (await Yt.findByEmail(o)) ?? (await Yt.findById(o));
            if (!c || !(await r_(l, c.passwordHash))) return null;
            const h = new Date().toISOString(),
              f = {
                id: c.id,
                role: c.role,
                createdAt:
                  (r == null ? void 0 : r.id) === c.id ? r.createdAt : h,
                updatedAt: h,
              };
            return (t({ type: 'SIGN_IN', payload: f }), f);
          } catch (c) {
            return (console.error('Failed to sign in', c), null);
          }
        },
        [r, t],
      ),
      s = C.useCallback(() => {
        t({ type: 'SIGN_OUT' });
      }, [t]);
    return { currentUser: r, isAuthenticated: !!r, signIn: n, signOut: s };
  },
  Pf = (e) => {
    const [t, r, n] = e.split('-').map(Number);
    return new Date(t, (r ?? 1) - 1, n ?? 1);
  },
  Ev = (e) => {
    const t = e.getTime() - e.getTimezoneOffset() * 6e4;
    return new Date(t).toISOString();
  },
  ud = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  wt = (e) => Pf(e).toLocaleDateString(),
  Rf = (e) => Ev(e).slice(0, 10),
  E_ = (e) => Ev(e).slice(0, 16),
  ol = (e, t) => {
    const r = Pf(e);
    return (r.setDate(r.getDate() + t), Rf(r));
  },
  jv = (e, t) => {
    const r = Pf(e),
      n = (t - r.getDay() + 7) % 7;
    return (n && r.setDate(r.getDate() + n), Rf(r));
  },
  gi = () => Rf(new Date()),
  j_ = () => {
    const { currentUser: e } = Nr(),
      { config: t, setConfig: r } = p_(e == null ? void 0 : e.id),
      { t: n } = Ue(),
      s = E_(new Date(t.nextRun));
    return u.jsxs('div', {
      className:
        'border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 mt-4 bg-white dark:bg-neutral-900',
      children: [
        u.jsx('h2', {
          className: 'text-lg font-semibold mb-2',
          children: n('scheduler.title'),
        }),
        u.jsxs('label', {
          className: 'flex items-center gap-2',
          children: [
            u.jsx('input', {
              type: 'checkbox',
              checked: t.enabled,
              onChange: (a) => r({ ...t, enabled: a.target.checked }),
            }),
            u.jsx('span', { children: n('scheduler.enable') }),
          ],
        }),
        u.jsxs('div', {
          className: 'mt-2',
          children: [
            u.jsx('span', {
              className: 'text-sm text-neutral-600 dark:text-neutral-300 mr-2',
              children: n('scheduler.nextRun'),
            }),
            u.jsx('input', {
              type: 'datetime-local',
              value: s,
              onChange: (a) =>
                r({ ...t, nextRun: new Date(a.target.value).getTime() }),
              className: 'rounded border px-2 py-1',
            }),
          ],
        }),
      ],
    });
  },
  Df = ({ children: e }) =>
    u.jsx('div', {
      className:
        'fixed inset-0 z-40 flex items-center justify-center bg-black/40',
      children: u.jsx('div', {
        className:
          'bg-white dark:bg-neutral-900 rounded-xl p-6 shadow max-w-sm w-full',
        children: e,
      }),
    }),
  Cv = C.createContext(() => Promise.resolve(!1)),
  la = () => C.useContext(Cv),
  C_ = ({ children: e }) => {
    const [t, r] = C.useState(null),
      { t: n } = Ue(),
      s = (i) => new Promise((o) => r({ message: i, resolve: o })),
      a = (i) => {
        (t == null || t.resolve(i), r(null));
      };
    return u.jsxs(Cv.Provider, {
      value: s,
      children: [
        e,
        t &&
          u.jsxs(Df, {
            children: [
              u.jsx('p', { className: 'mb-4', children: t.message }),
              u.jsxs('div', {
                className: 'flex justify-end gap-2',
                children: [
                  u.jsx('button', {
                    onClick: () => a(!1),
                    className: 'px-3 py-2 rounded-xl border',
                    children: n('confirm.cancel'),
                  }),
                  u.jsx('button', {
                    onClick: () => a(!0),
                    className:
                      'px-3 py-2 rounded-xl border bg-red-600 text-white',
                    children: n('confirm.confirm'),
                  }),
                ],
              }),
            ],
          }),
      ],
    });
  },
  ge = ({ className: e = '', ...t }) =>
    u.jsx('button', {
      ...t,
      className: `rounded-xl px-3 py-2 shadow border hover:shadow-md active:scale-[.98] transition ${e}`,
    }),
  kt = ({ className: e = '', title: t, actions: r, children: n }) => {
    const s = !!(t != null && t.trim()),
      a = r != null && r !== !1,
      i = s || a;
    return u.jsxs('div', {
      className: `rounded-2xl shadow p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-black/5 ${e}`,
      children: [
        i &&
          u.jsxs('div', {
            className:
              'mb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between',
            children: [
              s &&
                u.jsx('h2', {
                  className:
                    'text-lg font-semibold text-neutral-900 dark:text-neutral-100',
                  children: t,
                }),
              a &&
                u.jsx('div', {
                  className:
                    'flex w-full flex-wrap items-center gap-2 text-neutral-700 dark:text-neutral-200 sm:ml-auto sm:w-auto sm:justify-end',
                  children: r,
                }),
            ],
          }),
        n,
      ],
    });
  },
  T_ = ({ value: e, onChange: t, compress: r }) => {
    const n = async (s) => {
      if (!s) {
        t(void 0);
        return;
      }
      if (r) {
        const a = document.createElement('img');
        ((a.src = URL.createObjectURL(s)),
          await new Promise((d) => (a.onload = d)));
        const i = document.createElement('canvas'),
          l = Math.min(1, 600 / Math.max(a.width, a.height));
        ((i.width = a.width * l), (i.height = a.height * l));
        const c = i.getContext('2d');
        (c == null || c.drawImage(a, 0, 0, i.width, i.height),
          t(i.toDataURL('image/jpeg', 0.8)));
      } else {
        const a = new FileReader();
        ((a.onload = () => t(a.result)), a.readAsDataURL(s));
      }
    };
    return u.jsxs('div', {
      className: 'flex items-center gap-3',
      children: [
        e
          ? u.jsx('img', {
              src: e,
              alt: 'preview',
              className: 'w-16 h-16 object-cover rounded-lg border',
            })
          : u.jsx('div', {
              className:
                'w-16 h-16 rounded-lg border grid place-items-center text-xs text-neutral-500',
              children: 'sem imagem',
            }),
        u.jsxs('div', {
          className: 'flex items-center gap-2',
          children: [
            u.jsx('input', {
              type: 'file',
              accept: 'image/*',
              onChange: (s) => {
                var a;
                return n((a = s.target.files) == null ? void 0 : a[0]);
              },
            }),
            e &&
              u.jsx(ge, {
                onClick: () => t(void 0),
                className:
                  'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                children: 'Remover',
              }),
          ],
        }),
      ],
    });
  },
  Me = ye.forwardRef(({ className: e = '', ...t }, r) =>
    u.jsx('input', {
      ref: r,
      ...t,
      className: `w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 bg-white dark:bg-neutral-900 ${e}`,
    }),
  );
Me.displayName = 'Input';
const je = ({ children: e, className: t = '', ...r }) =>
    u.jsx('label', {
      ...r,
      className: `text-sm font-medium text-neutral-600 dark:text-neutral-300 ${t}`,
      children: e,
    }),
  Tv = { register: '/register' },
  $n = [ia, 'admin', 'manager'],
  A_ = [ia],
  cd = [...$n, 'publisher'],
  wp = [...cd, 'viewer'],
  Of = {
    territories: { path: '/', allowedRoles: $n },
    streets: { path: '/streets', allowedRoles: $n },
    buildingsVillages: { path: '/buildings-villages', allowedRoles: $n },
    letters: { path: '/letters', allowedRoles: cd },
    exits: { path: '/exits', allowedRoles: $n },
    assignments: { path: '/assignments', allowedRoles: $n },
    users: { path: '/users', allowedRoles: A_ },
    todayAssignments: { path: '/today', allowedRoles: wp },
    calendar: { path: '/calendar', allowedRoles: wp },
    suggestions: { path: '/suggestions', allowedRoles: $n },
    notAtHome: { path: '/nao-em-casa', allowedRoles: cd },
  },
  bp = Object.fromEntries(Object.entries(Of).map(([e, t]) => [e, t.path])),
  Av = Object.entries(Of),
  Er = 'w-5 h-5',
  _p = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('path', { d: 'M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z' }),
        u.jsx('path', { d: 'M9 3v16' }),
        u.jsx('path', { d: 'M15 5v16' }),
      ],
    }),
  I_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('path', { d: 'M3 12h13' }),
        u.jsx('path', { d: 'M12 5l7 7-7 7' }),
      ],
    }),
  P_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('rect', { x: '6', y: '3', width: '12', height: '18', rx: '2' }),
        u.jsx('path', { d: 'M9 3v4h6V3' }),
      ],
    }),
  R_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('circle', { cx: '12', cy: '12', r: '4' }),
        u.jsx('path', { d: 'M12 2v2' }),
        u.jsx('path', { d: 'M12 20v2' }),
        u.jsx('path', { d: 'M4.93 4.93l1.41 1.41' }),
        u.jsx('path', { d: 'M17.66 17.66l1.41 1.41' }),
        u.jsx('path', { d: 'M2 12h2' }),
        u.jsx('path', { d: 'M20 12h2' }),
        u.jsx('path', { d: 'M6.34 17.66l-1.41 1.41' }),
        u.jsx('path', { d: 'M19.07 4.93l-1.41 1.41' }),
      ],
    }),
  D_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2' }),
        u.jsx('path', { d: 'M16 2v4' }),
        u.jsx('path', { d: 'M8 2v4' }),
        u.jsx('path', { d: 'M3 10h18' }),
      ],
    }),
  O_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('path', { d: 'M9 18h6' }),
        u.jsx('path', { d: 'M10 22h4' }),
        u.jsx('path', {
          d: 'M12 2a6 6 0 00-4 10c0 2-1 3-1 3h10s-1-1-1-3a6 6 0 00-4-10z',
        }),
      ],
    }),
  L_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('path', { d: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2' }),
        u.jsx('circle', { cx: '9', cy: '7', r: '4' }),
        u.jsx('path', { d: 'M22 21v-2a4 4 0 00-3-3.87' }),
        u.jsx('path', { d: 'M16 3.13a4 4 0 010 7.75' }),
      ],
    }),
  M_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('path', { d: 'M3 21h18' }),
        u.jsx('path', { d: 'M6 21V9h6v12' }),
        u.jsx('path', { d: 'M12 21V5h6v16' }),
        u.jsx('path', { d: 'M9 13h2' }),
        u.jsx('path', { d: 'M15 9h2' }),
        u.jsx('path', { d: 'M15 13h2' }),
      ],
    }),
  V_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('rect', { x: '3', y: '5', width: '18', height: '14', rx: '2' }),
        u.jsx('path', { d: 'M3 7l9 6 9-6' }),
      ],
    }),
  F_ = () =>
    u.jsxs('svg', {
      viewBox: '0 0 24 24',
      className: Er,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        u.jsx('path', { d: 'M3 9l9-6 9 6' }),
        u.jsx('path', { d: 'M4 10v10a1 1 0 001 1h6' }),
        u.jsx('path', { d: 'M20 14l-6 6' }),
        u.jsx('path', { d: 'M14 14l6 6' }),
      ],
    }),
  $_ = [
    { id: 'territories', label: 'sidebar.territories', icon: u.jsx(_p, {}) },
    { id: 'streets', label: 'sidebar.streets', icon: u.jsx(_p, {}) },
    {
      id: 'buildingsVillages',
      label: 'sidebar.buildingsVillages',
      icon: u.jsx(M_, {}),
    },
    { id: 'letters', label: 'sidebar.letters', icon: u.jsx(V_, {}) },
    { id: 'exits', label: 'sidebar.exits', icon: u.jsx(I_, {}) },
    { id: 'assignments', label: 'sidebar.assignments', icon: u.jsx(P_, {}) },
    { id: 'users', label: 'sidebar.users', icon: u.jsx(L_, {}) },
    {
      id: 'todayAssignments',
      label: 'sidebar.todayAssignments',
      icon: u.jsx(R_, {}),
    },
    { id: 'calendar', label: 'sidebar.calendar', icon: u.jsx(D_, {}) },
    { id: 'notAtHome', label: 'sidebar.notAtHome', icon: u.jsx(F_, {}) },
    { id: 'suggestions', label: 'sidebar.suggestions', icon: u.jsx(O_, {}) },
  ],
  U_ = ia.toLowerCase(),
  z_ = () => {
    const e = () =>
        typeof window < 'u' && typeof window.matchMedia == 'function'
          ? window.matchMedia('(min-width: 768px)').matches
          : !1,
      [t, r] = C.useState(e);
    return (
      C.useEffect(() => {
        if (typeof window > 'u' || typeof window.matchMedia != 'function')
          return;
        const n = window.matchMedia('(min-width: 768px)'),
          s = (a) => {
            r(a.matches);
          };
        return (
          r(n.matches),
          typeof n.addEventListener == 'function'
            ? (n.addEventListener('change', s),
              () => n.removeEventListener('change', s))
            : (n.addListener(s), () => n.removeListener(s))
        );
      }, []),
      t
    );
  },
  B_ = ({ id: e, open: t, onClose: r }) => {
    var h;
    const { t: n } = Ue(),
      { currentUser: s } = Nr(),
      a =
        ((h = s == null ? void 0 : s.role) == null
          ? void 0
          : h.toLowerCase()) ?? null,
      i = a === U_,
      o = z_(),
      l = o || t,
      c = e ?? 'app-sidebar',
      d = a
        ? $_.filter(
            (f) =>
              i || Of[f.id].allowedRoles.some((y) => y.toLowerCase() === a),
          )
        : [];
    return (
      C.useEffect(() => {
        if (!t || o) return;
        const f = (y) => {
          y.key === 'Escape' && r();
        };
        return (
          window.addEventListener('keydown', f),
          () => window.removeEventListener('keydown', f)
        );
      }, [t, r, o]),
      u.jsxs(u.Fragment, {
        children: [
          !o &&
            u.jsx('div', {
              className: `fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${t ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`,
              'aria-hidden': 'true',
              onClick: r,
            }),
          u.jsxs('nav', {
            id: c,
            'aria-label': n('app.navigation', 'Navegação principal'),
            'aria-hidden': !l,
            className: `bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4 md:p-2 flex flex-col gap-2 w-64 md:w-48 h-full md:h-auto fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:shadow-none ${l ? 'translate-x-0 shadow-lg md:shadow-none pointer-events-auto' : '-translate-x-full pointer-events-none'}`,
            children: [
              u.jsx('div', {
                className: 'flex justify-end md:hidden',
                children: u.jsxs('button', {
                  type: 'button',
                  onClick: r,
                  className:
                    'inline-flex items-center gap-2 rounded-xl border px-3 py-2',
                  children: [
                    u.jsx('span', {
                      className: 'sr-only',
                      children: n(
                        'sidebar.closeMenu',
                        'Fechar menu de navegação',
                      ),
                    }),
                    u.jsxs('svg', {
                      className: 'h-5 w-5',
                      viewBox: '0 0 24 24',
                      stroke: 'currentColor',
                      strokeWidth: '2',
                      fill: 'none',
                      'aria-hidden': 'true',
                      children: [
                        u.jsx('path', { d: 'M6 6l12 12' }),
                        u.jsx('path', { d: 'M18 6L6 18' }),
                      ],
                    }),
                  ],
                }),
              }),
              d.map((f) =>
                u.jsxs(
                  Vw,
                  {
                    to: bp[f.id],
                    end: bp[f.id] === '/',
                    'aria-label': n(f.label),
                    tabIndex: l ? 0 : -1,
                    onClick: () => {
                      o || r();
                    },
                    className: ({ isActive: y }) =>
                      `flex items-center gap-2 px-3 py-2 rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${y ? 'bg-neutral-200 dark:bg-neutral-800' : ''}`,
                    children: [
                      f.icon,
                      u.jsx('span', {
                        className: 'sr-only md:not-sr-only md:inline',
                        children: n(f.label),
                      }),
                    ],
                  },
                  f.id,
                ),
              ),
            ],
          }),
        ],
      })
    );
  },
  K_ = () => {
    const { i18n: e, t } = Ue(),
      r = (n) => {
        const s = n.target.value;
        (e.changeLanguage(s),
          typeof window < 'u' && localStorage.setItem('locale', s));
      };
    return u.jsxs('select', {
      value: e.language,
      onChange: r,
      className: 'border rounded px-2 py-1',
      children: [
        u.jsx('option', { value: 'en-US', children: t('language.english') }),
        u.jsx('option', { value: 'pt-BR', children: t('language.portuguese') }),
        u.jsx('option', { value: 'es-ES', children: t('language.spanish') }),
      ],
    });
  },
  H_ = ({ className: e = '' }) => {
    const { t } = Ue(),
      { currentUser: r, signIn: n, signOut: s } = Nr(),
      a = Rt(),
      [i, o] = C.useState({ identifier: '', password: '' }),
      [l, c] = C.useState(!1);
    if (r)
      return u.jsxs('div', {
        className: `flex items-center gap-3 ${e}`,
        children: [
          u.jsxs('div', {
            className:
              'text-right leading-tight text-xs text-neutral-500 dark:text-neutral-300',
            children: [
              u.jsx('p', {
                className:
                  'text-sm font-semibold text-neutral-900 dark:text-neutral-100',
                children: r.id,
              }),
              u.jsx('p', {
                className: 'uppercase tracking-wide',
                children: r.role,
              }),
            ],
          }),
          u.jsx(ge, {
            type: 'button',
            onClick: s,
            className:
              'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed',
            children: t('auth.signOut'),
          }),
        ],
      });
    const d = async (f) => {
        f.preventDefault();
        const y = i.identifier.trim(),
          m = i.password.trim();
        if (!y || !m) return;
        c(!0);
        const x = await n({ identifier: y, password: m });
        if ((c(!1), !x)) {
          a.error(t('auth.invalidCredentials'));
          return;
        }
        o({ identifier: '', password: '' });
      },
      h = i.identifier.trim().length > 0 && i.password.trim().length > 0 && !l;
    return u.jsxs('form', {
      onSubmit: d,
      className: `flex flex-wrap items-end gap-2 ${e}`,
      noValidate: !0,
      children: [
        u.jsxs('div', {
          className: 'flex flex-col',
          children: [
            u.jsx(je, {
              htmlFor: 'auth-id',
              className: 'sr-only',
              children: t('auth.identifierLabel'),
            }),
            u.jsx(Me, {
              id: 'auth-id',
              value: i.identifier,
              onChange: (f) => o((y) => ({ ...y, identifier: f.target.value })),
              placeholder: t('auth.identifierPlaceholder'),
              autoComplete: 'username',
              className: 'w-32',
            }),
          ],
        }),
        u.jsxs('div', {
          className: 'flex flex-col',
          children: [
            u.jsx(je, {
              htmlFor: 'auth-password',
              className: 'sr-only',
              children: t('auth.passwordLabel'),
            }),
            u.jsx(Me, {
              id: 'auth-password',
              type: 'password',
              value: i.password,
              onChange: (f) => o((y) => ({ ...y, password: f.target.value })),
              placeholder: t('auth.passwordPlaceholder'),
              autoComplete: 'current-password',
              className: 'w-28',
            }),
          ],
        }),
        u.jsxs('div', {
          className: 'flex items-center gap-3',
          children: [
            u.jsx(ge, {
              type: 'submit',
              className:
                'bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed',
              disabled: !h,
              children: t('auth.signIn'),
            }),
            u.jsx(My, {
              to: Tv.register,
              className: 'text-sm text-emerald-600 hover:underline',
              children: t('register.cta'),
            }),
          ],
        }),
      ],
    });
  },
  W_ = ({ children: e }) => {
    const { t } = Ue(),
      [r, n] = C.useState(() => {
        const o = localStorage.getItem('dark');
        return o !== null
          ? JSON.parse(o)
          : window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches;
      }),
      [s, a] = C.useState(!1),
      i = 'app-primary-navigation';
    return (
      C.useLayoutEffect(() => {
        (document.documentElement.classList.toggle('dark', r),
          document.documentElement.classList.add('min-h-full'),
          document.body.classList.add('bg-neutral-50', 'dark:bg-neutral-950'),
          localStorage.setItem('dark', JSON.stringify(r)));
      }, [r]),
      u.jsxs('div', {
        className:
          'min-h-screen text-neutral-900 dark:text-neutral-100 flex flex-col md:flex-row',
        children: [
          u.jsx(B_, { id: i, open: s, onClose: () => a(!1) }),
          u.jsxs('div', {
            className: 'flex-1 w-full flex flex-col',
            children: [
              u.jsx('header', {
                className:
                  'sticky top-0 z-10 backdrop-blur bg-white/60 dark:bg-neutral-950/50 border-b',
                children: u.jsxs('div', {
                  className:
                    'max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3',
                  children: [
                    u.jsxs('div', {
                      className: 'flex items-center gap-3',
                      children: [
                        u.jsxs('button', {
                          type: 'button',
                          className:
                            'md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2',
                          onClick: () => a((o) => !o),
                          'aria-controls': i,
                          'aria-expanded': s,
                          children: [
                            u.jsx('span', {
                              className: 'sr-only',
                              children: s
                                ? t(
                                    'sidebar.closeMenu',
                                    'Fechar menu de navegação',
                                  )
                                : t(
                                    'sidebar.openMenu',
                                    'Abrir menu de navegação',
                                  ),
                            }),
                            u.jsxs('svg', {
                              className: 'h-5 w-5',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              strokeWidth: '2',
                              fill: 'none',
                              'aria-hidden': 'true',
                              children: [
                                u.jsx('path', { d: 'M4 7h16' }),
                                u.jsx('path', { d: 'M4 12h16' }),
                                u.jsx('path', { d: 'M4 17h16' }),
                              ],
                            }),
                          ],
                        }),
                        u.jsx('h1', {
                          className: 'font-bold tracking-tight',
                          children: 'Territory Manager',
                        }),
                      ],
                    }),
                    u.jsxs('div', {
                      className:
                        'flex flex-wrap items-center justify-end gap-2',
                      children: [
                        u.jsx(H_, { className: 'flex-shrink-0' }),
                        u.jsx(K_, {}),
                        u.jsx('button', {
                          onClick: () => n((o) => !o),
                          className: 'rounded-xl px-3 py-2 border',
                          children: r
                            ? `☀️ ${t('app.theme.light')}`
                            : `🌙 ${t('app.theme.dark')}`,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              u.jsx('main', {
                className:
                  'max-w-6xl mx-auto px-4 py-6 grid gap-4 flex-1 w-full',
                children: e,
              }),
              u.jsx('footer', {
                className: 'py-8 text-center text-xs text-neutral-500',
                children: 'Dados salvos localmente (localStorage).',
              }),
            ],
          }),
        ],
      })
    );
  };
var Ti = (e) => e.type === 'checkbox',
  Hn = (e) => e instanceof Date,
  vt = (e) => e == null;
const Iv = (e) => typeof e == 'object';
var He = (e) => !vt(e) && !Array.isArray(e) && Iv(e) && !Hn(e),
  q_ = (e) =>
    He(e) && e.target ? (Ti(e.target) ? e.target.checked : e.target.value) : e,
  Z_ = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
  Q_ = (e, t) => e.has(Z_(t)),
  G_ = (e) => {
    const t = e.constructor && e.constructor.prototype;
    return He(t) && t.hasOwnProperty('isPrototypeOf');
  },
  Lf =
    typeof window < 'u' &&
    typeof window.HTMLElement < 'u' &&
    typeof document < 'u';
function Pe(e) {
  let t;
  const r = Array.isArray(e),
    n = typeof FileList < 'u' ? e instanceof FileList : !1;
  if (e instanceof Date) t = new Date(e);
  else if (!(Lf && (e instanceof Blob || n)) && (r || He(e)))
    if (((t = r ? [] : Object.create(Object.getPrototypeOf(e))), !r && !G_(e)))
      t = e;
    else for (const s in e) e.hasOwnProperty(s) && (t[s] = Pe(e[s]));
  else return e;
  return t;
}
var Vl = (e) => /^\w*$/.test(e),
  De = (e) => e === void 0,
  Fl = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  Mf = (e) => Fl(e.replace(/["|']|\]/g, '').split(/\.|\[/)),
  Q = (e, t, r) => {
    if (!t || !He(e)) return r;
    const n = (Vl(t) ? [t] : Mf(t)).reduce((s, a) => (vt(s) ? s : s[a]), e);
    return De(n) || n === e ? (De(e[t]) ? r : e[t]) : n;
  },
  mr = (e) => typeof e == 'boolean',
  _e = (e, t, r) => {
    let n = -1;
    const s = Vl(t) ? [t] : Mf(t),
      a = s.length,
      i = a - 1;
    for (; ++n < a; ) {
      const o = s[n];
      let l = r;
      if (n !== i) {
        const c = e[o];
        l = He(c) || Array.isArray(c) ? c : isNaN(+s[n + 1]) ? {} : [];
      }
      if (o === '__proto__' || o === 'constructor' || o === 'prototype') return;
      ((e[o] = l), (e = e[o]));
    }
  };
const kp = { BLUR: 'blur', FOCUS_OUT: 'focusout' },
  Zt = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all',
  },
  Cr = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate',
  },
  Pv = ye.createContext(null);
Pv.displayName = 'HookFormContext';
const Y_ = () => ye.useContext(Pv);
var J_ = (e, t, r, n = !0) => {
  const s = { defaultValues: t._defaultValues };
  for (const a in e)
    Object.defineProperty(s, a, {
      get: () => {
        const i = a;
        return (
          t._proxyFormState[i] !== Zt.all &&
            (t._proxyFormState[i] = !n || Zt.all),
          e[i]
        );
      },
    });
  return s;
};
const Rv = typeof window < 'u' ? ye.useLayoutEffect : ye.useEffect;
var yr = (e) => typeof e == 'string',
  X_ = (e, t, r, n, s) =>
    yr(e)
      ? (n && t.watch.add(e), Q(r, e, s))
      : Array.isArray(e)
        ? e.map((a) => (n && t.watch.add(a), Q(r, a)))
        : (n && (t.watchAll = !0), r),
  dd = (e) => vt(e) || !Iv(e);
function sn(e, t, r = new WeakSet()) {
  if (dd(e) || dd(t)) return e === t;
  if (Hn(e) && Hn(t)) return e.getTime() === t.getTime();
  const n = Object.keys(e),
    s = Object.keys(t);
  if (n.length !== s.length) return !1;
  if (r.has(e) || r.has(t)) return !0;
  (r.add(e), r.add(t));
  for (const a of n) {
    const i = e[a];
    if (!s.includes(a)) return !1;
    if (a !== 'ref') {
      const o = t[a];
      if (
        (Hn(i) && Hn(o)) ||
        (He(i) && He(o)) ||
        (Array.isArray(i) && Array.isArray(o))
          ? !sn(i, o, r)
          : i !== o
      )
        return !1;
    }
  }
  return !0;
}
var Dv = (e, t, r, n, s) =>
    t
      ? {
          ...r[e],
          types: { ...(r[e] && r[e].types ? r[e].types : {}), [n]: s || !0 },
        }
      : {},
  Tt = (e) => (Array.isArray(e) ? e : [e]),
  Sp = () => {
    let e = [];
    return {
      get observers() {
        return e;
      },
      next: (s) => {
        for (const a of e) a.next && a.next(s);
      },
      subscribe: (s) => (
        e.push(s),
        {
          unsubscribe: () => {
            e = e.filter((a) => a !== s);
          },
        }
      ),
      unsubscribe: () => {
        e = [];
      },
    };
  },
  gt = (e) => He(e) && !Object.keys(e).length,
  Vf = (e) => e.type === 'file',
  ar = (e) => typeof e == 'function',
  ll = (e) => {
    if (!Lf) return !1;
    const t = e ? e.ownerDocument : 0;
    return (
      e instanceof
      (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement)
    );
  },
  Ov = (e) => e.type === 'select-multiple',
  Ff = (e) => e.type === 'radio',
  ek = (e) => Ff(e) || Ti(e),
  Nu = (e) => ll(e) && e.isConnected;
function tk(e, t) {
  const r = t.slice(0, -1).length;
  let n = 0;
  for (; n < r; ) e = De(e) ? n++ : e[t[n++]];
  return e;
}
function rk(e) {
  for (const t in e) if (e.hasOwnProperty(t) && !De(e[t])) return !1;
  return !0;
}
function Be(e, t) {
  const r = Array.isArray(t) ? t : Vl(t) ? [t] : Mf(t),
    n = r.length === 1 ? e : tk(e, r),
    s = r.length - 1,
    a = r[s];
  return (
    n && delete n[a],
    s !== 0 &&
      ((He(n) && gt(n)) || (Array.isArray(n) && rk(n))) &&
      Be(e, r.slice(0, -1)),
    e
  );
}
var Lv = (e) => {
  for (const t in e) if (ar(e[t])) return !0;
  return !1;
};
function ul(e, t = {}) {
  const r = Array.isArray(e);
  if (He(e) || r)
    for (const n in e)
      Array.isArray(e[n]) || (He(e[n]) && !Lv(e[n]))
        ? ((t[n] = Array.isArray(e[n]) ? [] : {}), ul(e[n], t[n]))
        : vt(e[n]) || (t[n] = !0);
  return t;
}
function Mv(e, t, r) {
  const n = Array.isArray(e);
  if (He(e) || n)
    for (const s in e)
      Array.isArray(e[s]) || (He(e[s]) && !Lv(e[s]))
        ? De(t) || dd(r[s])
          ? (r[s] = Array.isArray(e[s]) ? ul(e[s], []) : { ...ul(e[s]) })
          : Mv(e[s], vt(t) ? {} : t[s], r[s])
        : (r[s] = !sn(e[s], t[s]));
  return r;
}
var xa = (e, t) => Mv(e, t, ul(t));
const Np = { value: !1, isValid: !1 },
  Ep = { value: !0, isValid: !0 };
var Vv = (e) => {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        const t = e
          .filter((r) => r && r.checked && !r.disabled)
          .map((r) => r.value);
        return { value: t, isValid: !!t.length };
      }
      return e[0].checked && !e[0].disabled
        ? e[0].attributes && !De(e[0].attributes.value)
          ? De(e[0].value) || e[0].value === ''
            ? Ep
            : { value: e[0].value, isValid: !0 }
          : Ep
        : Np;
    }
    return Np;
  },
  Fv = (e, { valueAsNumber: t, valueAsDate: r, setValueAs: n }) =>
    De(e)
      ? e
      : t
        ? e === ''
          ? NaN
          : e && +e
        : r && yr(e)
          ? new Date(e)
          : n
            ? n(e)
            : e;
const jp = { isValid: !1, value: null };
var $v = (e) =>
  Array.isArray(e)
    ? e.reduce(
        (t, r) =>
          r && r.checked && !r.disabled ? { isValid: !0, value: r.value } : t,
        jp,
      )
    : jp;
function Cp(e) {
  const t = e.ref;
  return Vf(t)
    ? t.files
    : Ff(t)
      ? $v(e.refs).value
      : Ov(t)
        ? [...t.selectedOptions].map(({ value: r }) => r)
        : Ti(t)
          ? Vv(e.refs).value
          : Fv(De(t.value) ? e.ref.value : t.value, e);
}
var nk = (e, t, r, n) => {
    const s = {};
    for (const a of e) {
      const i = Q(t, a);
      i && _e(s, a, i._f);
    }
    return {
      criteriaMode: r,
      names: [...e],
      fields: s,
      shouldUseNativeValidation: n,
    };
  },
  cl = (e) => e instanceof RegExp,
  wa = (e) =>
    De(e)
      ? e
      : cl(e)
        ? e.source
        : He(e)
          ? cl(e.value)
            ? e.value.source
            : e.value
          : e,
  Cs = (e) => ({
    isOnSubmit: !e || e === Zt.onSubmit,
    isOnBlur: e === Zt.onBlur,
    isOnChange: e === Zt.onChange,
    isOnAll: e === Zt.all,
    isOnTouch: e === Zt.onTouched,
  });
const Tp = 'AsyncFunction';
var sk = (e) =>
    !!e &&
    !!e.validate &&
    !!(
      (ar(e.validate) && e.validate.constructor.name === Tp) ||
      (He(e.validate) &&
        Object.values(e.validate).find((t) => t.constructor.name === Tp))
    ),
  ak = (e) =>
    e.mount &&
    (e.required ||
      e.min ||
      e.max ||
      e.maxLength ||
      e.minLength ||
      e.pattern ||
      e.validate),
  fd = (e, t, r) =>
    !r &&
    (t.watchAll ||
      t.watch.has(e) ||
      [...t.watch].some(
        (n) => e.startsWith(n) && /^\.\w+/.test(e.slice(n.length)),
      ));
const Vs = (e, t, r, n) => {
  for (const s of r || Object.keys(e)) {
    const a = Q(e, s);
    if (a) {
      const { _f: i, ...o } = a;
      if (i) {
        if (i.refs && i.refs[0] && t(i.refs[0], s) && !n) return !0;
        if (i.ref && t(i.ref, i.name) && !n) return !0;
        if (Vs(o, t)) break;
      } else if (He(o) && Vs(o, t)) break;
    }
  }
};
function Ap(e, t, r) {
  const n = Q(e, r);
  if (n || Vl(r)) return { error: n, name: r };
  const s = r.split('.');
  for (; s.length; ) {
    const a = s.join('.'),
      i = Q(t, a),
      o = Q(e, a);
    if (i && !Array.isArray(i) && r !== a) return { name: r };
    if (o && o.type) return { name: a, error: o };
    if (o && o.root && o.root.type) return { name: `${a}.root`, error: o.root };
    s.pop();
  }
  return { name: r };
}
var ik = (e, t, r, n) => {
    r(e);
    const { name: s, ...a } = e;
    return (
      gt(a) ||
      Object.keys(a).length >= Object.keys(t).length ||
      Object.keys(a).find((i) => t[i] === (!n || Zt.all))
    );
  },
  ok = (e, t, r) =>
    !e ||
    !t ||
    e === t ||
    Tt(e).some((n) => n && (r ? n === t : n.startsWith(t) || t.startsWith(n))),
  lk = (e, t, r, n, s) =>
    s.isOnAll
      ? !1
      : !r && s.isOnTouch
        ? !(t || e)
        : (r ? n.isOnBlur : s.isOnBlur)
          ? !e
          : (r ? n.isOnChange : s.isOnChange)
            ? e
            : !0,
  uk = (e, t) => !Fl(Q(e, t)).length && Be(e, t),
  Uv = (e, t, r) => {
    const n = Tt(Q(e, r));
    return (_e(n, 'root', t[r]), _e(e, r, n), e);
  },
  Eo = (e) => yr(e);
function Ip(e, t, r = 'validate') {
  if (Eo(e) || (Array.isArray(e) && e.every(Eo)) || (mr(e) && !e))
    return { type: r, message: Eo(e) ? e : '', ref: t };
}
var fs = (e) => (He(e) && !cl(e) ? e : { value: e, message: '' }),
  hd = async (e, t, r, n, s, a) => {
    const {
        ref: i,
        refs: o,
        required: l,
        maxLength: c,
        minLength: d,
        min: h,
        max: f,
        pattern: y,
        validate: m,
        name: x,
        valueAsNumber: S,
        mount: g,
      } = e._f,
      p = Q(r, x);
    if (!g || t.has(x)) return {};
    const v = o ? o[0] : i,
      k = (V) => {
        s &&
          v.reportValidity &&
          (v.setCustomValidity(mr(V) ? '' : V || ''), v.reportValidity());
      },
      b = {},
      _ = Ff(i),
      w = Ti(i),
      N = _ || w,
      j =
        ((S || Vf(i)) && De(i.value) && De(p)) ||
        (ll(i) && i.value === '') ||
        p === '' ||
        (Array.isArray(p) && !p.length),
      T = Dv.bind(null, x, n, b),
      D = (V, F, B, ie = Cr.maxLength, re = Cr.minLength) => {
        const ae = V ? F : B;
        b[x] = {
          type: V ? ie : re,
          message: ae,
          ref: i,
          ...T(V ? ie : re, ae),
        };
      };
    if (
      a
        ? !Array.isArray(p) || !p.length
        : l &&
          ((!N && (j || vt(p))) ||
            (mr(p) && !p) ||
            (w && !Vv(o).isValid) ||
            (_ && !$v(o).isValid))
    ) {
      const { value: V, message: F } = Eo(l)
        ? { value: !!l, message: l }
        : fs(l);
      if (
        V &&
        ((b[x] = {
          type: Cr.required,
          message: F,
          ref: v,
          ...T(Cr.required, F),
        }),
        !n)
      )
        return (k(F), b);
    }
    if (!j && (!vt(h) || !vt(f))) {
      let V, F;
      const B = fs(f),
        ie = fs(h);
      if (!vt(p) && !isNaN(p)) {
        const re = i.valueAsNumber || (p && +p);
        (vt(B.value) || (V = re > B.value),
          vt(ie.value) || (F = re < ie.value));
      } else {
        const re = i.valueAsDate || new Date(p),
          ae = (U) => new Date(new Date().toDateString() + ' ' + U),
          M = i.type == 'time',
          R = i.type == 'week';
        (yr(B.value) &&
          p &&
          (V = M
            ? ae(p) > ae(B.value)
            : R
              ? p > B.value
              : re > new Date(B.value)),
          yr(ie.value) &&
            p &&
            (F = M
              ? ae(p) < ae(ie.value)
              : R
                ? p < ie.value
                : re < new Date(ie.value)));
      }
      if ((V || F) && (D(!!V, B.message, ie.message, Cr.max, Cr.min), !n))
        return (k(b[x].message), b);
    }
    if ((c || d) && !j && (yr(p) || (a && Array.isArray(p)))) {
      const V = fs(c),
        F = fs(d),
        B = !vt(V.value) && p.length > +V.value,
        ie = !vt(F.value) && p.length < +F.value;
      if ((B || ie) && (D(B, V.message, F.message), !n))
        return (k(b[x].message), b);
    }
    if (y && !j && yr(p)) {
      const { value: V, message: F } = fs(y);
      if (
        cl(V) &&
        !p.match(V) &&
        ((b[x] = { type: Cr.pattern, message: F, ref: i, ...T(Cr.pattern, F) }),
        !n)
      )
        return (k(F), b);
    }
    if (m) {
      if (ar(m)) {
        const V = await m(p, r),
          F = Ip(V, v);
        if (F && ((b[x] = { ...F, ...T(Cr.validate, F.message) }), !n))
          return (k(F.message), b);
      } else if (He(m)) {
        let V = {};
        for (const F in m) {
          if (!gt(V) && !n) break;
          const B = Ip(await m[F](p, r), v, F);
          B &&
            ((V = { ...B, ...T(F, B.message) }), k(B.message), n && (b[x] = V));
        }
        if (!gt(V) && ((b[x] = { ref: v, ...V }), !n)) return b;
      }
    }
    return (k(!0), b);
  };
const ck = {
  mode: Zt.onSubmit,
  reValidateMode: Zt.onChange,
  shouldFocusError: !0,
};
function dk(e = {}) {
  let t = { ...ck, ...e },
    r = {
      submitCount: 0,
      isDirty: !1,
      isReady: !1,
      isLoading: ar(t.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: t.errors || {},
      disabled: t.disabled || !1,
    },
    n = {},
    s =
      He(t.defaultValues) || He(t.values)
        ? Pe(t.defaultValues || t.values) || {}
        : {},
    a = t.shouldUnregister ? {} : Pe(s),
    i = { action: !1, mount: !1, watch: !1 },
    o = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    l,
    c = 0;
  const d = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1,
  };
  let h = { ...d };
  const f = { array: Sp(), state: Sp() },
    y = t.criteriaMode === Zt.all,
    m = (E) => (P) => {
      (clearTimeout(c), (c = setTimeout(E, P)));
    },
    x = async (E) => {
      if (!t.disabled && (d.isValid || h.isValid || E)) {
        const P = t.resolver ? gt((await w()).errors) : await j(n, !0);
        P !== r.isValid && f.state.next({ isValid: P });
      }
    },
    S = (E, P) => {
      !t.disabled &&
        (d.isValidating ||
          d.validatingFields ||
          h.isValidating ||
          h.validatingFields) &&
        ((E || Array.from(o.mount)).forEach((L) => {
          L && (P ? _e(r.validatingFields, L, P) : Be(r.validatingFields, L));
        }),
        f.state.next({
          validatingFields: r.validatingFields,
          isValidating: !gt(r.validatingFields),
        }));
    },
    g = (E, P = [], L, Z, q = !0, H = !0) => {
      if (Z && L && !t.disabled) {
        if (((i.action = !0), H && Array.isArray(Q(n, E)))) {
          const X = L(Q(n, E), Z.argA, Z.argB);
          q && _e(n, E, X);
        }
        if (H && Array.isArray(Q(r.errors, E))) {
          const X = L(Q(r.errors, E), Z.argA, Z.argB);
          (q && _e(r.errors, E, X), uk(r.errors, E));
        }
        if (
          (d.touchedFields || h.touchedFields) &&
          H &&
          Array.isArray(Q(r.touchedFields, E))
        ) {
          const X = L(Q(r.touchedFields, E), Z.argA, Z.argB);
          q && _e(r.touchedFields, E, X);
        }
        ((d.dirtyFields || h.dirtyFields) && (r.dirtyFields = xa(s, a)),
          f.state.next({
            name: E,
            isDirty: D(E, P),
            dirtyFields: r.dirtyFields,
            errors: r.errors,
            isValid: r.isValid,
          }));
      } else _e(a, E, P);
    },
    p = (E, P) => {
      (_e(r.errors, E, P), f.state.next({ errors: r.errors }));
    },
    v = (E) => {
      ((r.errors = E), f.state.next({ errors: r.errors, isValid: !1 }));
    },
    k = (E, P, L, Z) => {
      const q = Q(n, E);
      if (q) {
        const H = Q(a, E, De(L) ? Q(s, E) : L);
        (De(H) || (Z && Z.defaultChecked) || P
          ? _e(a, E, P ? H : Cp(q._f))
          : B(E, H),
          i.mount && x());
      }
    },
    b = (E, P, L, Z, q) => {
      let H = !1,
        X = !1;
      const be = { name: E };
      if (!t.disabled) {
        if (!L || Z) {
          (d.isDirty || h.isDirty) &&
            ((X = r.isDirty),
            (r.isDirty = be.isDirty = D()),
            (H = X !== be.isDirty));
          const Ee = sn(Q(s, E), P);
          ((X = !!Q(r.dirtyFields, E)),
            Ee ? Be(r.dirtyFields, E) : _e(r.dirtyFields, E, !0),
            (be.dirtyFields = r.dirtyFields),
            (H = H || ((d.dirtyFields || h.dirtyFields) && X !== !Ee)));
        }
        if (L) {
          const Ee = Q(r.touchedFields, E);
          Ee ||
            (_e(r.touchedFields, E, L),
            (be.touchedFields = r.touchedFields),
            (H = H || ((d.touchedFields || h.touchedFields) && Ee !== L)));
        }
        H && q && f.state.next(be);
      }
      return H ? be : {};
    },
    _ = (E, P, L, Z) => {
      const q = Q(r.errors, E),
        H = (d.isValid || h.isValid) && mr(P) && r.isValid !== P;
      if (
        (t.delayError && L
          ? ((l = m(() => p(E, L))), l(t.delayError))
          : (clearTimeout(c),
            (l = null),
            L ? _e(r.errors, E, L) : Be(r.errors, E)),
        (L ? !sn(q, L) : q) || !gt(Z) || H)
      ) {
        const X = {
          ...Z,
          ...(H && mr(P) ? { isValid: P } : {}),
          errors: r.errors,
          name: E,
        };
        ((r = { ...r, ...X }), f.state.next(X));
      }
    },
    w = async (E) => {
      S(E, !0);
      const P = await t.resolver(
        a,
        t.context,
        nk(E || o.mount, n, t.criteriaMode, t.shouldUseNativeValidation),
      );
      return (S(E), P);
    },
    N = async (E) => {
      const { errors: P } = await w(E);
      if (E)
        for (const L of E) {
          const Z = Q(P, L);
          Z ? _e(r.errors, L, Z) : Be(r.errors, L);
        }
      else r.errors = P;
      return P;
    },
    j = async (E, P, L = { valid: !0 }) => {
      for (const Z in E) {
        const q = E[Z];
        if (q) {
          const { _f: H, ...X } = q;
          if (H) {
            const be = o.array.has(H.name),
              Ee = q._f && sk(q._f);
            Ee && d.validatingFields && S([Z], !0);
            const Ht = await hd(
              q,
              o.disabled,
              a,
              y,
              t.shouldUseNativeValidation && !P,
              be,
            );
            if (
              (Ee && d.validatingFields && S([Z]),
              Ht[H.name] && ((L.valid = !1), P))
            )
              break;
            !P &&
              (Q(Ht, H.name)
                ? be
                  ? Uv(r.errors, Ht, H.name)
                  : _e(r.errors, H.name, Ht[H.name])
                : Be(r.errors, H.name));
          }
          !gt(X) && (await j(X, P, L));
        }
      }
      return L.valid;
    },
    T = () => {
      for (const E of o.unMount) {
        const P = Q(n, E);
        P &&
          (P._f.refs ? P._f.refs.every((L) => !Nu(L)) : !Nu(P._f.ref)) &&
          Ne(E);
      }
      o.unMount = new Set();
    },
    D = (E, P) => !t.disabled && (E && P && _e(a, E, P), !sn(U(), s)),
    V = (E, P, L) =>
      X_(E, o, { ...(i.mount ? a : De(P) ? s : yr(E) ? { [E]: P } : P) }, L, P),
    F = (E) => Fl(Q(i.mount ? a : s, E, t.shouldUnregister ? Q(s, E, []) : [])),
    B = (E, P, L = {}) => {
      const Z = Q(n, E);
      let q = P;
      if (Z) {
        const H = Z._f;
        H &&
          (!H.disabled && _e(a, E, Fv(P, H)),
          (q = ll(H.ref) && vt(P) ? '' : P),
          Ov(H.ref)
            ? [...H.ref.options].forEach(
                (X) => (X.selected = q.includes(X.value)),
              )
            : H.refs
              ? Ti(H.ref)
                ? H.refs.forEach((X) => {
                    (!X.defaultChecked || !X.disabled) &&
                      (Array.isArray(q)
                        ? (X.checked = !!q.find((be) => be === X.value))
                        : (X.checked = q === X.value || !!q));
                  })
                : H.refs.forEach((X) => (X.checked = X.value === q))
              : Vf(H.ref)
                ? (H.ref.value = '')
                : ((H.ref.value = q),
                  H.ref.type || f.state.next({ name: E, values: Pe(a) })));
      }
      ((L.shouldDirty || L.shouldTouch) &&
        b(E, q, L.shouldTouch, L.shouldDirty, !0),
        L.shouldValidate && R(E));
    },
    ie = (E, P, L) => {
      for (const Z in P) {
        if (!P.hasOwnProperty(Z)) return;
        const q = P[Z],
          H = E + '.' + Z,
          X = Q(n, H);
        (o.array.has(E) || He(q) || (X && !X._f)) && !Hn(q)
          ? ie(H, q, L)
          : B(H, q, L);
      }
    },
    re = (E, P, L = {}) => {
      const Z = Q(n, E),
        q = o.array.has(E),
        H = Pe(P);
      (_e(a, E, H),
        q
          ? (f.array.next({ name: E, values: Pe(a) }),
            (d.isDirty || d.dirtyFields || h.isDirty || h.dirtyFields) &&
              L.shouldDirty &&
              f.state.next({
                name: E,
                dirtyFields: xa(s, a),
                isDirty: D(E, H),
              }))
          : Z && !Z._f && !vt(H)
            ? ie(E, H, L)
            : B(E, H, L),
        fd(E, o) && f.state.next({ ...r, name: E }),
        f.state.next({ name: i.mount ? E : void 0, values: Pe(a) }));
    },
    ae = async (E) => {
      i.mount = !0;
      const P = E.target;
      let L = P.name,
        Z = !0;
      const q = Q(n, L),
        H = (Ee) => {
          Z =
            Number.isNaN(Ee) ||
            (Hn(Ee) && isNaN(Ee.getTime())) ||
            sn(Ee, Q(a, L, Ee));
        },
        X = Cs(t.mode),
        be = Cs(t.reValidateMode);
      if (q) {
        let Ee, Ht;
        const Ii = P.type ? Cp(q._f) : q_(E),
          qr = E.type === kp.BLUR || E.type === kp.FOCUS_OUT,
          sx =
            (!ak(q._f) && !t.resolver && !Q(r.errors, L) && !q._f.deps) ||
            lk(qr, Q(r.touchedFields, L), r.isSubmitted, be, X),
          zl = fd(L, o, qr);
        (_e(a, L, Ii),
          qr
            ? (!P || !P.readOnly) && (q._f.onBlur && q._f.onBlur(E), l && l(0))
            : q._f.onChange && q._f.onChange(E));
        const Bl = b(L, Ii, qr),
          ax = !gt(Bl) || zl;
        if ((!qr && f.state.next({ name: L, type: E.type, values: Pe(a) }), sx))
          return (
            (d.isValid || h.isValid) &&
              (t.mode === 'onBlur' ? qr && x() : qr || x()),
            ax && f.state.next({ name: L, ...(zl ? {} : Bl) })
          );
        if ((!qr && zl && f.state.next({ ...r }), t.resolver)) {
          const { errors: Uf } = await w([L]);
          if ((H(Ii), Z)) {
            const ix = Ap(r.errors, n, L),
              zf = Ap(Uf, n, ix.name || L);
            ((Ee = zf.error), (L = zf.name), (Ht = gt(Uf)));
          }
        } else
          (S([L], !0),
            (Ee = (await hd(q, o.disabled, a, y, t.shouldUseNativeValidation))[
              L
            ]),
            S([L]),
            H(Ii),
            Z &&
              (Ee
                ? (Ht = !1)
                : (d.isValid || h.isValid) && (Ht = await j(n, !0))));
        Z && (q._f.deps && R(q._f.deps), _(L, Ht, Ee, Bl));
      }
    },
    M = (E, P) => {
      if (Q(r.errors, P) && E.focus) return (E.focus(), 1);
    },
    R = async (E, P = {}) => {
      let L, Z;
      const q = Tt(E);
      if (t.resolver) {
        const H = await N(De(E) ? E : q);
        ((L = gt(H)), (Z = E ? !q.some((X) => Q(H, X)) : L));
      } else
        E
          ? ((Z = (
              await Promise.all(
                q.map(async (H) => {
                  const X = Q(n, H);
                  return await j(X && X._f ? { [H]: X } : X);
                }),
              )
            ).every(Boolean)),
            !(!Z && !r.isValid) && x())
          : (Z = L = await j(n));
      return (
        f.state.next({
          ...(!yr(E) || ((d.isValid || h.isValid) && L !== r.isValid)
            ? {}
            : { name: E }),
          ...(t.resolver || !E ? { isValid: L } : {}),
          errors: r.errors,
        }),
        P.shouldFocus && !Z && Vs(n, M, E ? q : o.mount),
        Z
      );
    },
    U = (E) => {
      const P = { ...(i.mount ? a : s) };
      return De(E) ? P : yr(E) ? Q(P, E) : E.map((L) => Q(P, L));
    },
    K = (E, P) => ({
      invalid: !!Q((P || r).errors, E),
      isDirty: !!Q((P || r).dirtyFields, E),
      error: Q((P || r).errors, E),
      isValidating: !!Q(r.validatingFields, E),
      isTouched: !!Q((P || r).touchedFields, E),
    }),
    ne = (E) => {
      (E && Tt(E).forEach((P) => Be(r.errors, P)),
        f.state.next({ errors: E ? r.errors : {} }));
    },
    fe = (E, P, L) => {
      const Z = (Q(n, E, { _f: {} })._f || {}).ref,
        q = Q(r.errors, E) || {},
        { ref: H, message: X, type: be, ...Ee } = q;
      (_e(r.errors, E, { ...Ee, ...P, ref: Z }),
        f.state.next({ name: E, errors: r.errors, isValid: !1 }),
        L && L.shouldFocus && Z && Z.focus && Z.focus());
    },
    A = (E, P) =>
      ar(E)
        ? f.state.subscribe({
            next: (L) => 'values' in L && E(V(void 0, P), L),
          })
        : V(E, P, !0),
    O = (E) =>
      f.state.subscribe({
        next: (P) => {
          ok(E.name, P.name, E.exact) &&
            ik(P, E.formState || d, Wr, E.reRenderRoot) &&
            E.callback({ values: { ...a }, ...r, ...P, defaultValues: s });
        },
      }).unsubscribe,
    le = (E) => (
      (i.mount = !0),
      (h = { ...h, ...E.formState }),
      O({ ...E, formState: h })
    ),
    Ne = (E, P = {}) => {
      for (const L of E ? Tt(E) : o.mount)
        (o.mount.delete(L),
          o.array.delete(L),
          P.keepValue || (Be(n, L), Be(a, L)),
          !P.keepError && Be(r.errors, L),
          !P.keepDirty && Be(r.dirtyFields, L),
          !P.keepTouched && Be(r.touchedFields, L),
          !P.keepIsValidating && Be(r.validatingFields, L),
          !t.shouldUnregister && !P.keepDefaultValue && Be(s, L));
      (f.state.next({ values: Pe(a) }),
        f.state.next({ ...r, ...(P.keepDirty ? { isDirty: D() } : {}) }),
        !P.keepIsValid && x());
    },
    Qe = ({ disabled: E, name: P }) => {
      ((mr(E) && i.mount) || E || o.disabled.has(P)) &&
        (E ? o.disabled.add(P) : o.disabled.delete(P));
    },
    me = (E, P = {}) => {
      let L = Q(n, E);
      const Z = mr(P.disabled) || mr(t.disabled);
      return (
        _e(n, E, {
          ...(L || {}),
          _f: {
            ...(L && L._f ? L._f : { ref: { name: E } }),
            name: E,
            mount: !0,
            ...P,
          },
        }),
        o.mount.add(E),
        L
          ? Qe({ disabled: mr(P.disabled) ? P.disabled : t.disabled, name: E })
          : k(E, !0, P.value),
        {
          ...(Z ? { disabled: P.disabled || t.disabled } : {}),
          ...(t.progressive
            ? {
                required: !!P.required,
                min: wa(P.min),
                max: wa(P.max),
                minLength: wa(P.minLength),
                maxLength: wa(P.maxLength),
                pattern: wa(P.pattern),
              }
            : {}),
          name: E,
          onChange: ae,
          onBlur: ae,
          ref: (q) => {
            if (q) {
              (me(E, P), (L = Q(n, E)));
              const H =
                  (De(q.value) &&
                    q.querySelectorAll &&
                    q.querySelectorAll('input,select,textarea')[0]) ||
                  q,
                X = ek(H),
                be = L._f.refs || [];
              if (X ? be.find((Ee) => Ee === H) : H === L._f.ref) return;
              (_e(n, E, {
                _f: {
                  ...L._f,
                  ...(X
                    ? {
                        refs: [
                          ...be.filter(Nu),
                          H,
                          ...(Array.isArray(Q(s, E)) ? [{}] : []),
                        ],
                        ref: { type: H.type, name: E },
                      }
                    : { ref: H }),
                },
              }),
                k(E, !1, void 0, H));
            } else
              ((L = Q(n, E, {})),
                L._f && (L._f.mount = !1),
                (t.shouldUnregister || P.shouldUnregister) &&
                  !(Q_(o.array, E) && i.action) &&
                  o.unMount.add(E));
          },
        }
      );
    },
    nt = () => t.shouldFocusError && Vs(n, M, o.mount),
    Dt = (E) => {
      mr(E) &&
        (f.state.next({ disabled: E }),
        Vs(
          n,
          (P, L) => {
            const Z = Q(n, L);
            Z &&
              ((P.disabled = Z._f.disabled || E),
              Array.isArray(Z._f.refs) &&
                Z._f.refs.forEach((q) => {
                  q.disabled = Z._f.disabled || E;
                }));
          },
          0,
          !1,
        ));
    },
    ze = (E, P) => async (L) => {
      let Z;
      L && (L.preventDefault && L.preventDefault(), L.persist && L.persist());
      let q = Pe(a);
      if ((f.state.next({ isSubmitting: !0 }), t.resolver)) {
        const { errors: H, values: X } = await w();
        ((r.errors = H), (q = Pe(X)));
      } else await j(n);
      if (o.disabled.size) for (const H of o.disabled) Be(q, H);
      if ((Be(r.errors, 'root'), gt(r.errors))) {
        f.state.next({ errors: {} });
        try {
          await E(q, L);
        } catch (H) {
          Z = H;
        }
      } else (P && (await P({ ...r.errors }, L)), nt(), setTimeout(nt));
      if (
        (f.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: gt(r.errors) && !Z,
          submitCount: r.submitCount + 1,
          errors: r.errors,
        }),
        Z)
      )
        throw Z;
    },
    Kt = (E, P = {}) => {
      Q(n, E) &&
        (De(P.defaultValue)
          ? re(E, Pe(Q(s, E)))
          : (re(E, P.defaultValue), _e(s, E, Pe(P.defaultValue))),
        P.keepTouched || Be(r.touchedFields, E),
        P.keepDirty ||
          (Be(r.dirtyFields, E),
          (r.isDirty = P.defaultValue ? D(E, Pe(Q(s, E))) : D())),
        P.keepError || (Be(r.errors, E), d.isValid && x()),
        f.state.next({ ...r }));
    },
    Rn = (E, P = {}) => {
      const L = E ? Pe(E) : s,
        Z = Pe(L),
        q = gt(E),
        H = q ? s : Z;
      if ((P.keepDefaultValues || (s = L), !P.keepValues)) {
        if (P.keepDirtyValues) {
          const X = new Set([...o.mount, ...Object.keys(xa(s, a))]);
          for (const be of Array.from(X))
            Q(r.dirtyFields, be) ? _e(H, be, Q(a, be)) : re(be, Q(H, be));
        } else {
          if (Lf && De(E))
            for (const X of o.mount) {
              const be = Q(n, X);
              if (be && be._f) {
                const Ee = Array.isArray(be._f.refs)
                  ? be._f.refs[0]
                  : be._f.ref;
                if (ll(Ee)) {
                  const Ht = Ee.closest('form');
                  if (Ht) {
                    Ht.reset();
                    break;
                  }
                }
              }
            }
          if (P.keepFieldsRef) for (const X of o.mount) re(X, Q(H, X));
          else n = {};
        }
        ((a = t.shouldUnregister ? (P.keepDefaultValues ? Pe(s) : {}) : Pe(H)),
          f.array.next({ values: { ...H } }),
          f.state.next({ values: { ...H } }));
      }
      ((o = {
        mount: P.keepDirtyValues ? o.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: '',
      }),
        (i.mount = !d.isValid || !!P.keepIsValid || !!P.keepDirtyValues),
        (i.watch = !!t.shouldUnregister),
        f.state.next({
          submitCount: P.keepSubmitCount ? r.submitCount : 0,
          isDirty: q
            ? !1
            : P.keepDirty
              ? r.isDirty
              : !!(P.keepDefaultValues && !sn(E, s)),
          isSubmitted: P.keepIsSubmitted ? r.isSubmitted : !1,
          dirtyFields: q
            ? {}
            : P.keepDirtyValues
              ? P.keepDefaultValues && a
                ? xa(s, a)
                : r.dirtyFields
              : P.keepDefaultValues && E
                ? xa(s, E)
                : P.keepDirty
                  ? r.dirtyFields
                  : {},
          touchedFields: P.keepTouched ? r.touchedFields : {},
          errors: P.keepErrors ? r.errors : {},
          isSubmitSuccessful: P.keepIsSubmitSuccessful
            ? r.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
          defaultValues: s,
        }));
    },
    Dn = (E, P) => Rn(ar(E) ? E(a) : E, P),
    On = (E, P = {}) => {
      const L = Q(n, E),
        Z = L && L._f;
      if (Z) {
        const q = Z.refs ? Z.refs[0] : Z.ref;
        q.focus && (q.focus(), P.shouldSelect && ar(q.select) && q.select());
      }
    },
    Wr = (E) => {
      r = { ...r, ...E };
    },
    lt = {
      control: {
        register: me,
        unregister: Ne,
        getFieldState: K,
        handleSubmit: ze,
        setError: fe,
        _subscribe: O,
        _runSchema: w,
        _focusError: nt,
        _getWatch: V,
        _getDirty: D,
        _setValid: x,
        _setFieldArray: g,
        _setDisabledField: Qe,
        _setErrors: v,
        _getFieldArray: F,
        _reset: Rn,
        _resetDefaultValues: () =>
          ar(t.defaultValues) &&
          t.defaultValues().then((E) => {
            (Dn(E, t.resetOptions), f.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: T,
        _disableForm: Dt,
        _subjects: f,
        _proxyFormState: d,
        get _fields() {
          return n;
        },
        get _formValues() {
          return a;
        },
        get _state() {
          return i;
        },
        set _state(E) {
          i = E;
        },
        get _defaultValues() {
          return s;
        },
        get _names() {
          return o;
        },
        set _names(E) {
          o = E;
        },
        get _formState() {
          return r;
        },
        get _options() {
          return t;
        },
        set _options(E) {
          t = { ...t, ...E };
        },
      },
      subscribe: le,
      trigger: R,
      register: me,
      handleSubmit: ze,
      watch: A,
      setValue: re,
      getValues: U,
      reset: Dn,
      resetField: Kt,
      clearErrors: ne,
      unregister: Ne,
      setError: fe,
      setFocus: On,
      getFieldState: K,
    };
  return { ...lt, formControl: lt };
}
var Qr = () => {
    if (typeof crypto < 'u' && crypto.randomUUID) return crypto.randomUUID();
    const e = typeof performance > 'u' ? Date.now() : performance.now() * 1e3;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (t) => {
      const r = (Math.random() * 16 + e) % 16 | 0;
      return (t == 'x' ? r : (r & 3) | 8).toString(16);
    });
  },
  Eu = (e, t, r = {}) =>
    r.shouldFocus || De(r.shouldFocus)
      ? r.focusName || `${e}.${De(r.focusIndex) ? t : r.focusIndex}.`
      : '',
  ju = (e, t) => [...e, ...Tt(t)],
  Cu = (e) => (Array.isArray(e) ? e.map(() => {}) : void 0);
function Tu(e, t, r) {
  return [...e.slice(0, t), ...Tt(r), ...e.slice(t)];
}
var Au = (e, t, r) =>
    Array.isArray(e)
      ? (De(e[r]) && (e[r] = void 0), e.splice(r, 0, e.splice(t, 1)[0]), e)
      : [],
  Iu = (e, t) => [...Tt(t), ...Tt(e)];
function fk(e, t) {
  let r = 0;
  const n = [...e];
  for (const s of t) (n.splice(s - r, 1), r++);
  return Fl(n).length ? n : [];
}
var Pu = (e, t) =>
    De(t)
      ? []
      : fk(
          e,
          Tt(t).sort((r, n) => r - n),
        ),
  Ru = (e, t, r) => {
    [e[t], e[r]] = [e[r], e[t]];
  },
  Pp = (e, t, r) => ((e[t] = r), e);
function hk(e) {
  const t = Y_(),
    {
      control: r = t.control,
      name: n,
      keyName: s = 'id',
      shouldUnregister: a,
      rules: i,
    } = e,
    [o, l] = ye.useState(r._getFieldArray(n)),
    c = ye.useRef(r._getFieldArray(n).map(Qr)),
    d = ye.useRef(o),
    h = ye.useRef(!1);
  ((d.current = o),
    r._names.array.add(n),
    ye.useMemo(() => i && r.register(n, i), [r, i, n]),
    Rv(
      () =>
        r._subjects.array.subscribe({
          next: ({ values: b, name: _ }) => {
            if (_ === n || !_) {
              const w = Q(b, n);
              Array.isArray(w) && (l(w), (c.current = w.map(Qr)));
            }
          },
        }).unsubscribe,
      [r, n],
    ));
  const f = ye.useCallback(
      (b) => {
        ((h.current = !0), r._setFieldArray(n, b));
      },
      [r, n],
    ),
    y = (b, _) => {
      const w = Tt(Pe(b)),
        N = ju(r._getFieldArray(n), w);
      ((r._names.focus = Eu(n, N.length - 1, _)),
        (c.current = ju(c.current, w.map(Qr))),
        f(N),
        l(N),
        r._setFieldArray(n, N, ju, { argA: Cu(b) }));
    },
    m = (b, _) => {
      const w = Tt(Pe(b)),
        N = Iu(r._getFieldArray(n), w);
      ((r._names.focus = Eu(n, 0, _)),
        (c.current = Iu(c.current, w.map(Qr))),
        f(N),
        l(N),
        r._setFieldArray(n, N, Iu, { argA: Cu(b) }));
    },
    x = (b) => {
      const _ = Pu(r._getFieldArray(n), b);
      ((c.current = Pu(c.current, b)),
        f(_),
        l(_),
        !Array.isArray(Q(r._fields, n)) && _e(r._fields, n, void 0),
        r._setFieldArray(n, _, Pu, { argA: b }));
    },
    S = (b, _, w) => {
      const N = Tt(Pe(_)),
        j = Tu(r._getFieldArray(n), b, N);
      ((r._names.focus = Eu(n, b, w)),
        (c.current = Tu(c.current, b, N.map(Qr))),
        f(j),
        l(j),
        r._setFieldArray(n, j, Tu, { argA: b, argB: Cu(_) }));
    },
    g = (b, _) => {
      const w = r._getFieldArray(n);
      (Ru(w, b, _),
        Ru(c.current, b, _),
        f(w),
        l(w),
        r._setFieldArray(n, w, Ru, { argA: b, argB: _ }, !1));
    },
    p = (b, _) => {
      const w = r._getFieldArray(n);
      (Au(w, b, _),
        Au(c.current, b, _),
        f(w),
        l(w),
        r._setFieldArray(n, w, Au, { argA: b, argB: _ }, !1));
    },
    v = (b, _) => {
      const w = Pe(_),
        N = Pp(r._getFieldArray(n), b, w);
      ((c.current = [...N].map((j, T) =>
        !j || T === b ? Qr() : c.current[T],
      )),
        f(N),
        l([...N]),
        r._setFieldArray(n, N, Pp, { argA: b, argB: w }, !0, !1));
    },
    k = (b) => {
      const _ = Tt(Pe(b));
      ((c.current = _.map(Qr)),
        f([..._]),
        l([..._]),
        r._setFieldArray(n, [..._], (w) => w, {}, !0, !1));
    };
  return (
    ye.useEffect(() => {
      if (
        ((r._state.action = !1),
        fd(n, r._names) && r._subjects.state.next({ ...r._formState }),
        h.current &&
          (!Cs(r._options.mode).isOnSubmit || r._formState.isSubmitted) &&
          !Cs(r._options.reValidateMode).isOnSubmit)
      )
        if (r._options.resolver)
          r._runSchema([n]).then((b) => {
            const _ = Q(b.errors, n),
              w = Q(r._formState.errors, n);
            (w
              ? (!_ && w.type) ||
                (_ && (w.type !== _.type || w.message !== _.message))
              : _ && _.type) &&
              (_ ? _e(r._formState.errors, n, _) : Be(r._formState.errors, n),
              r._subjects.state.next({ errors: r._formState.errors }));
          });
        else {
          const b = Q(r._fields, n);
          b &&
            b._f &&
            !(
              Cs(r._options.reValidateMode).isOnSubmit &&
              Cs(r._options.mode).isOnSubmit
            ) &&
            hd(
              b,
              r._names.disabled,
              r._formValues,
              r._options.criteriaMode === Zt.all,
              r._options.shouldUseNativeValidation,
              !0,
            ).then(
              (_) =>
                !gt(_) &&
                r._subjects.state.next({
                  errors: Uv(r._formState.errors, _, n),
                }),
            );
        }
      (r._subjects.state.next({ name: n, values: Pe(r._formValues) }),
        r._names.focus &&
          Vs(r._fields, (b, _) => {
            if (r._names.focus && _.startsWith(r._names.focus) && b.focus)
              return (b.focus(), 1);
          }),
        (r._names.focus = ''),
        r._setValid(),
        (h.current = !1));
    }, [o, n, r]),
    ye.useEffect(
      () => (
        !Q(r._formValues, n) && r._setFieldArray(n),
        () => {
          const b = (_, w) => {
            const N = Q(r._fields, _);
            N && N._f && (N._f.mount = w);
          };
          r._options.shouldUnregister || a ? r.unregister(n) : b(n, !1);
        }
      ),
      [n, r, s, a],
    ),
    {
      swap: ye.useCallback(g, [f, n, r]),
      move: ye.useCallback(p, [f, n, r]),
      prepend: ye.useCallback(m, [f, n, r]),
      append: ye.useCallback(y, [f, n, r]),
      remove: ye.useCallback(x, [f, n, r]),
      insert: ye.useCallback(S, [f, n, r]),
      update: ye.useCallback(v, [f, n, r]),
      replace: ye.useCallback(k, [f, n, r]),
      fields: ye.useMemo(
        () => o.map((b, _) => ({ ...b, [s]: c.current[_] || Qr() })),
        [o, s],
      ),
    }
  );
}
function zv(e = {}) {
  const t = ye.useRef(void 0),
    r = ye.useRef(void 0),
    [n, s] = ye.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: ar(e.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: e.errors || {},
      disabled: e.disabled || !1,
      isReady: !1,
      defaultValues: ar(e.defaultValues) ? void 0 : e.defaultValues,
    });
  if (!t.current)
    if (e.formControl)
      ((t.current = { ...e.formControl, formState: n }),
        e.defaultValues &&
          !ar(e.defaultValues) &&
          e.formControl.reset(e.defaultValues, e.resetOptions));
    else {
      const { formControl: i, ...o } = dk(e);
      t.current = { ...o, formState: n };
    }
  const a = t.current.control;
  return (
    (a._options = e),
    Rv(() => {
      const i = a._subscribe({
        formState: a._proxyFormState,
        callback: () => s({ ...a._formState }),
        reRenderRoot: !0,
      });
      return (
        s((o) => ({ ...o, isReady: !0 })),
        (a._formState.isReady = !0),
        i
      );
    }, [a]),
    ye.useEffect(() => a._disableForm(e.disabled), [a, e.disabled]),
    ye.useEffect(() => {
      (e.mode && (a._options.mode = e.mode),
        e.reValidateMode && (a._options.reValidateMode = e.reValidateMode));
    }, [a, e.mode, e.reValidateMode]),
    ye.useEffect(() => {
      e.errors && (a._setErrors(e.errors), a._focusError());
    }, [a, e.errors]),
    ye.useEffect(() => {
      e.shouldUnregister && a._subjects.state.next({ values: a._getWatch() });
    }, [a, e.shouldUnregister]),
    ye.useEffect(() => {
      if (a._proxyFormState.isDirty) {
        const i = a._getDirty();
        i !== n.isDirty && a._subjects.state.next({ isDirty: i });
      }
    }, [a, n.isDirty]),
    ye.useEffect(() => {
      e.values && !sn(e.values, r.current)
        ? (a._reset(e.values, {
            keepFieldsRef: !0,
            ...a._options.resetOptions,
          }),
          (r.current = e.values),
          s((i) => ({ ...i })))
        : a._resetDefaultValues();
    }, [a, e.values]),
    ye.useEffect(() => {
      (a._state.mount || (a._setValid(), (a._state.mount = !0)),
        a._state.watch &&
          ((a._state.watch = !1), a._subjects.state.next({ ...a._formState })),
        a._removeUnmounted());
    }),
    (t.current.formState = J_(n, a)),
    t.current
  );
}
var we;
(function (e) {
  e.assertEqual = (s) => {};
  function t(s) {}
  e.assertIs = t;
  function r(s) {
    throw new Error();
  }
  ((e.assertNever = r),
    (e.arrayToEnum = (s) => {
      const a = {};
      for (const i of s) a[i] = i;
      return a;
    }),
    (e.getValidEnumValues = (s) => {
      const a = e.objectKeys(s).filter((o) => typeof s[s[o]] != 'number'),
        i = {};
      for (const o of a) i[o] = s[o];
      return e.objectValues(i);
    }),
    (e.objectValues = (s) =>
      e.objectKeys(s).map(function (a) {
        return s[a];
      })),
    (e.objectKeys =
      typeof Object.keys == 'function'
        ? (s) => Object.keys(s)
        : (s) => {
            const a = [];
            for (const i in s)
              Object.prototype.hasOwnProperty.call(s, i) && a.push(i);
            return a;
          }),
    (e.find = (s, a) => {
      for (const i of s) if (a(i)) return i;
    }),
    (e.isInteger =
      typeof Number.isInteger == 'function'
        ? (s) => Number.isInteger(s)
        : (s) =>
            typeof s == 'number' && Number.isFinite(s) && Math.floor(s) === s));
  function n(s, a = ' | ') {
    return s.map((i) => (typeof i == 'string' ? `'${i}'` : i)).join(a);
  }
  ((e.joinValues = n),
    (e.jsonStringifyReplacer = (s, a) =>
      typeof a == 'bigint' ? a.toString() : a));
})(we || (we = {}));
var Rp;
(function (e) {
  e.mergeShapes = (t, r) => ({ ...t, ...r });
})(Rp || (Rp = {}));
const ee = we.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set',
  ]),
  en = (e) => {
    switch (typeof e) {
      case 'undefined':
        return ee.undefined;
      case 'string':
        return ee.string;
      case 'number':
        return Number.isNaN(e) ? ee.nan : ee.number;
      case 'boolean':
        return ee.boolean;
      case 'function':
        return ee.function;
      case 'bigint':
        return ee.bigint;
      case 'symbol':
        return ee.symbol;
      case 'object':
        return Array.isArray(e)
          ? ee.array
          : e === null
            ? ee.null
            : e.then &&
                typeof e.then == 'function' &&
                e.catch &&
                typeof e.catch == 'function'
              ? ee.promise
              : typeof Map < 'u' && e instanceof Map
                ? ee.map
                : typeof Set < 'u' && e instanceof Set
                  ? ee.set
                  : typeof Date < 'u' && e instanceof Date
                    ? ee.date
                    : ee.object;
      default:
        return ee.unknown;
    }
  },
  z = we.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite',
  ]);
class kr extends Error {
  get errors() {
    return this.issues;
  }
  constructor(t) {
    (super(),
      (this.issues = []),
      (this.addIssue = (n) => {
        this.issues = [...this.issues, n];
      }),
      (this.addIssues = (n = []) => {
        this.issues = [...this.issues, ...n];
      }));
    const r = new.target.prototype;
    (Object.setPrototypeOf
      ? Object.setPrototypeOf(this, r)
      : (this.__proto__ = r),
      (this.name = 'ZodError'),
      (this.issues = t));
  }
  format(t) {
    const r =
        t ||
        function (a) {
          return a.message;
        },
      n = { _errors: [] },
      s = (a) => {
        for (const i of a.issues)
          if (i.code === 'invalid_union') i.unionErrors.map(s);
          else if (i.code === 'invalid_return_type') s(i.returnTypeError);
          else if (i.code === 'invalid_arguments') s(i.argumentsError);
          else if (i.path.length === 0) n._errors.push(r(i));
          else {
            let o = n,
              l = 0;
            for (; l < i.path.length; ) {
              const c = i.path[l];
              (l === i.path.length - 1
                ? ((o[c] = o[c] || { _errors: [] }), o[c]._errors.push(r(i)))
                : (o[c] = o[c] || { _errors: [] }),
                (o = o[c]),
                l++);
            }
          }
      };
    return (s(this), n);
  }
  static assert(t) {
    if (!(t instanceof kr)) throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, we.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (r) => r.message) {
    const r = {},
      n = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const a = s.path[0];
        ((r[a] = r[a] || []), r[a].push(t(s)));
      } else n.push(t(s));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
kr.create = (e) => new kr(e);
const pd = (e, t) => {
  let r;
  switch (e.code) {
    case z.invalid_type:
      e.received === ee.undefined
        ? (r = 'Required')
        : (r = `Expected ${e.expected}, received ${e.received}`);
      break;
    case z.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(e.expected, we.jsonStringifyReplacer)}`;
      break;
    case z.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${we.joinValues(e.keys, ', ')}`;
      break;
    case z.invalid_union:
      r = 'Invalid input';
      break;
    case z.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${we.joinValues(e.options)}`;
      break;
    case z.invalid_enum_value:
      r = `Invalid enum value. Expected ${we.joinValues(e.options)}, received '${e.received}'`;
      break;
    case z.invalid_arguments:
      r = 'Invalid function arguments';
      break;
    case z.invalid_return_type:
      r = 'Invalid function return type';
      break;
    case z.invalid_date:
      r = 'Invalid date';
      break;
    case z.invalid_string:
      typeof e.validation == 'object'
        ? 'includes' in e.validation
          ? ((r = `Invalid input: must include "${e.validation.includes}"`),
            typeof e.validation.position == 'number' &&
              (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
          : 'startsWith' in e.validation
            ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
            : 'endsWith' in e.validation
              ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
              : we.assertNever(e.validation)
        : e.validation !== 'regex'
          ? (r = `Invalid ${e.validation}`)
          : (r = 'Invalid');
      break;
    case z.too_small:
      e.type === 'array'
        ? (r = `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'more than'} ${e.minimum} element(s)`)
        : e.type === 'string'
          ? (r = `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'over'} ${e.minimum} character(s)`)
          : e.type === 'number'
            ? (r = `Number must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${e.minimum}`)
            : e.type === 'bigint'
              ? (r = `Number must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${e.minimum}`)
              : e.type === 'date'
                ? (r = `Date must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(e.minimum))}`)
                : (r = 'Invalid input');
      break;
    case z.too_big:
      e.type === 'array'
        ? (r = `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'less than'} ${e.maximum} element(s)`)
        : e.type === 'string'
          ? (r = `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'under'} ${e.maximum} character(s)`)
          : e.type === 'number'
            ? (r = `Number must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`)
            : e.type === 'bigint'
              ? (r = `BigInt must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`)
              : e.type === 'date'
                ? (r = `Date must be ${e.exact ? 'exactly' : e.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(e.maximum))}`)
                : (r = 'Invalid input');
      break;
    case z.custom:
      r = 'Invalid input';
      break;
    case z.invalid_intersection_types:
      r = 'Intersection results could not be merged';
      break;
    case z.not_multiple_of:
      r = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case z.not_finite:
      r = 'Number must be finite';
      break;
    default:
      ((r = t.defaultError), we.assertNever(e));
  }
  return { message: r };
};
let pk = pd;
function mk() {
  return pk;
}
const gk = (e) => {
  const { data: t, path: r, errorMaps: n, issueData: s } = e,
    a = [...r, ...(s.path || [])],
    i = { ...s, path: a };
  if (s.message !== void 0) return { ...s, path: a, message: s.message };
  let o = '';
  const l = n
    .filter((c) => !!c)
    .slice()
    .reverse();
  for (const c of l) o = c(i, { data: t, defaultError: o }).message;
  return { ...s, path: a, message: o };
};
function G(e, t) {
  const r = mk(),
    n = gk({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [
        e.common.contextualErrorMap,
        e.schemaErrorMap,
        r,
        r === pd ? void 0 : pd,
      ].filter((s) => !!s),
    });
  e.common.issues.push(n);
}
class Ut {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    this.value === 'valid' && (this.value = 'dirty');
  }
  abort() {
    this.value !== 'aborted' && (this.value = 'aborted');
  }
  static mergeArray(t, r) {
    const n = [];
    for (const s of r) {
      if (s.status === 'aborted') return ce;
      (s.status === 'dirty' && t.dirty(), n.push(s.value));
    }
    return { status: t.value, value: n };
  }
  static async mergeObjectAsync(t, r) {
    const n = [];
    for (const s of r) {
      const a = await s.key,
        i = await s.value;
      n.push({ key: a, value: i });
    }
    return Ut.mergeObjectSync(t, n);
  }
  static mergeObjectSync(t, r) {
    const n = {};
    for (const s of r) {
      const { key: a, value: i } = s;
      if (a.status === 'aborted' || i.status === 'aborted') return ce;
      (a.status === 'dirty' && t.dirty(),
        i.status === 'dirty' && t.dirty(),
        a.value !== '__proto__' &&
          (typeof i.value < 'u' || s.alwaysSet) &&
          (n[a.value] = i.value));
    }
    return { status: t.value, value: n };
  }
}
const ce = Object.freeze({ status: 'aborted' }),
  Ca = (e) => ({ status: 'dirty', value: e }),
  er = (e) => ({ status: 'valid', value: e }),
  Dp = (e) => e.status === 'aborted',
  Op = (e) => e.status === 'dirty',
  Qs = (e) => e.status === 'valid',
  dl = (e) => typeof Promise < 'u' && e instanceof Promise;
var te;
(function (e) {
  ((e.errToObj = (t) => (typeof t == 'string' ? { message: t } : t || {})),
    (e.toString = (t) =>
      typeof t == 'string' ? t : t == null ? void 0 : t.message));
})(te || (te = {}));
class jn {
  constructor(t, r, n, s) {
    ((this._cachedPath = []),
      (this.parent = t),
      (this.data = r),
      (this._path = n),
      (this._key = s));
  }
  get path() {
    return (
      this._cachedPath.length ||
        (Array.isArray(this._key)
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const Lp = (e, t) => {
  if (Qs(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error('Validation failed but no issues detected.');
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const r = new kr(e.common.issues);
      return ((this._error = r), this._error);
    },
  };
};
function he(e) {
  if (!e) return {};
  const {
    errorMap: t,
    invalid_type_error: r,
    required_error: n,
    description: s,
  } = e;
  if (t && (r || n))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return t
    ? { errorMap: t, description: s }
    : {
        errorMap: (i, o) => {
          const { message: l } = e;
          return i.code === 'invalid_enum_value'
            ? { message: l ?? o.defaultError }
            : typeof o.data > 'u'
              ? { message: l ?? n ?? o.defaultError }
              : i.code !== 'invalid_type'
                ? { message: o.defaultError }
                : { message: l ?? r ?? o.defaultError };
        },
        description: s,
      };
}
class xe {
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return en(t.data);
  }
  _getOrReturnCtx(t, r) {
    return (
      r || {
        common: t.parent.common,
        data: t.data,
        parsedType: en(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      }
    );
  }
  _processInputParams(t) {
    return {
      status: new Ut(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: en(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      },
    };
  }
  _parseSync(t) {
    const r = this._parse(t);
    if (dl(r)) throw new Error('Synchronous parse encountered promise.');
    return r;
  }
  _parseAsync(t) {
    const r = this._parse(t);
    return Promise.resolve(r);
  }
  parse(t, r) {
    const n = this.safeParse(t, r);
    if (n.success) return n.data;
    throw n.error;
  }
  safeParse(t, r) {
    const n = {
        common: {
          issues: [],
          async: (r == null ? void 0 : r.async) ?? !1,
          contextualErrorMap: r == null ? void 0 : r.errorMap,
        },
        path: (r == null ? void 0 : r.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: en(t),
      },
      s = this._parseSync({ data: t, path: n.path, parent: n });
    return Lp(n, s);
  }
  '~validate'(t) {
    var n, s;
    const r = {
      common: { issues: [], async: !!this['~standard'].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: en(t),
    };
    if (!this['~standard'].async)
      try {
        const a = this._parseSync({ data: t, path: [], parent: r });
        return Qs(a) ? { value: a.value } : { issues: r.common.issues };
      } catch (a) {
        ((s =
          (n = a == null ? void 0 : a.message) == null
            ? void 0
            : n.toLowerCase()) != null &&
          s.includes('encountered') &&
          (this['~standard'].async = !0),
          (r.common = { issues: [], async: !0 }));
      }
    return this._parseAsync({ data: t, path: [], parent: r }).then((a) =>
      Qs(a) ? { value: a.value } : { issues: r.common.issues },
    );
  }
  async parseAsync(t, r) {
    const n = await this.safeParseAsync(t, r);
    if (n.success) return n.data;
    throw n.error;
  }
  async safeParseAsync(t, r) {
    const n = {
        common: {
          issues: [],
          contextualErrorMap: r == null ? void 0 : r.errorMap,
          async: !0,
        },
        path: (r == null ? void 0 : r.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: en(t),
      },
      s = this._parse({ data: t, path: n.path, parent: n }),
      a = await (dl(s) ? s : Promise.resolve(s));
    return Lp(n, a);
  }
  refine(t, r) {
    const n = (s) =>
      typeof r == 'string' || typeof r > 'u'
        ? { message: r }
        : typeof r == 'function'
          ? r(s)
          : r;
    return this._refinement((s, a) => {
      const i = t(s),
        o = () => a.addIssue({ code: z.custom, ...n(s) });
      return typeof Promise < 'u' && i instanceof Promise
        ? i.then((l) => (l ? !0 : (o(), !1)))
        : i
          ? !0
          : (o(), !1);
    });
  }
  refinement(t, r) {
    return this._refinement((n, s) =>
      t(n) ? !0 : (s.addIssue(typeof r == 'function' ? r(n, s) : r), !1),
    );
  }
  _refinement(t) {
    return new Js({
      schema: this,
      typeName: de.ZodEffects,
      effect: { type: 'refinement', refinement: t },
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  constructor(t) {
    ((this.spa = this.safeParseAsync),
      (this._def = t),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this['~standard'] = {
        version: 1,
        vendor: 'zod',
        validate: (r) => this['~validate'](r),
      }));
  }
  optional() {
    return bn.create(this, this._def);
  }
  nullable() {
    return Xs.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return _r.create(this);
  }
  promise() {
    return ml.create(this, this._def);
  }
  or(t) {
    return hl.create([this, t], this._def);
  }
  and(t) {
    return pl.create(this, t, this._def);
  }
  transform(t) {
    return new Js({
      ...he(this._def),
      schema: this,
      typeName: de.ZodEffects,
      effect: { type: 'transform', transform: t },
    });
  }
  default(t) {
    const r = typeof t == 'function' ? t : () => t;
    return new yd({
      ...he(this._def),
      innerType: this,
      defaultValue: r,
      typeName: de.ZodDefault,
    });
  }
  brand() {
    return new Fk({ typeName: de.ZodBranded, type: this, ...he(this._def) });
  }
  catch(t) {
    const r = typeof t == 'function' ? t : () => t;
    return new vd({
      ...he(this._def),
      innerType: this,
      catchValue: r,
      typeName: de.ZodCatch,
    });
  }
  describe(t) {
    const r = this.constructor;
    return new r({ ...this._def, description: t });
  }
  pipe(t) {
    return $f.create(this, t);
  }
  readonly() {
    return xd.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const yk = /^c[^\s-]{8,}$/i,
  vk = /^[0-9a-z]+$/,
  xk = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  wk =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  bk = /^[a-z0-9_-]{21}$/i,
  _k = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  kk =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Sk =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  Nk = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$';
let Du;
const Ek =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  jk =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  Ck =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  Tk =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  Ak = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Ik = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  Bv =
    '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
  Pk = new RegExp(`^${Bv}$`);
function Kv(e) {
  let t = '[0-5]\\d';
  e.precision
    ? (t = `${t}\\.\\d{${e.precision}}`)
    : e.precision == null && (t = `${t}(\\.\\d+)?`);
  const r = e.precision ? '+' : '?';
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${r}`;
}
function Rk(e) {
  return new RegExp(`^${Kv(e)}$`);
}
function Dk(e) {
  let t = `${Bv}T${Kv(e)}`;
  const r = [];
  return (
    r.push(e.local ? 'Z?' : 'Z'),
    e.offset && r.push('([+-]\\d{2}:?\\d{2})'),
    (t = `${t}(${r.join('|')})`),
    new RegExp(`^${t}$`)
  );
}
function Ok(e, t) {
  return !!(
    ((t === 'v4' || !t) && Ek.test(e)) ||
    ((t === 'v6' || !t) && Ck.test(e))
  );
}
function Lk(e, t) {
  if (!_k.test(e)) return !1;
  try {
    const [r] = e.split('.');
    if (!r) return !1;
    const n = r
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(r.length + ((4 - (r.length % 4)) % 4), '='),
      s = JSON.parse(atob(n));
    return !(
      typeof s != 'object' ||
      s === null ||
      ('typ' in s && (s == null ? void 0 : s.typ) !== 'JWT') ||
      !s.alg ||
      (t && s.alg !== t)
    );
  } catch {
    return !1;
  }
}
function Mk(e, t) {
  return !!(
    ((t === 'v4' || !t) && jk.test(e)) ||
    ((t === 'v6' || !t) && Tk.test(e))
  );
}
class ln extends xe {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = String(t.data)),
      this._getType(t) !== ee.string)
    ) {
      const a = this._getOrReturnCtx(t);
      return (
        G(a, {
          code: z.invalid_type,
          expected: ee.string,
          received: a.parsedType,
        }),
        ce
      );
    }
    const n = new Ut();
    let s;
    for (const a of this._def.checks)
      if (a.kind === 'min')
        t.data.length < a.value &&
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            code: z.too_small,
            minimum: a.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'max')
        t.data.length > a.value &&
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            code: z.too_big,
            maximum: a.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'length') {
        const i = t.data.length > a.value,
          o = t.data.length < a.value;
        (i || o) &&
          ((s = this._getOrReturnCtx(t, s)),
          i
            ? G(s, {
                code: z.too_big,
                maximum: a.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: a.message,
              })
            : o &&
              G(s, {
                code: z.too_small,
                minimum: a.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: a.message,
              }),
          n.dirty());
      } else if (a.kind === 'email')
        Sk.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            validation: 'email',
            code: z.invalid_string,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'emoji')
        (Du || (Du = new RegExp(Nk, 'u')),
          Du.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            G(s, {
              validation: 'emoji',
              code: z.invalid_string,
              message: a.message,
            }),
            n.dirty()));
      else if (a.kind === 'uuid')
        wk.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            validation: 'uuid',
            code: z.invalid_string,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'nanoid')
        bk.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            validation: 'nanoid',
            code: z.invalid_string,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'cuid')
        yk.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            validation: 'cuid',
            code: z.invalid_string,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'cuid2')
        vk.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            validation: 'cuid2',
            code: z.invalid_string,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'ulid')
        xk.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            validation: 'ulid',
            code: z.invalid_string,
            message: a.message,
          }),
          n.dirty());
      else if (a.kind === 'url')
        try {
          new URL(t.data);
        } catch {
          ((s = this._getOrReturnCtx(t, s)),
            G(s, {
              validation: 'url',
              code: z.invalid_string,
              message: a.message,
            }),
            n.dirty());
        }
      else
        a.kind === 'regex'
          ? ((a.regex.lastIndex = 0),
            a.regex.test(t.data) ||
              ((s = this._getOrReturnCtx(t, s)),
              G(s, {
                validation: 'regex',
                code: z.invalid_string,
                message: a.message,
              }),
              n.dirty()))
          : a.kind === 'trim'
            ? (t.data = t.data.trim())
            : a.kind === 'includes'
              ? t.data.includes(a.value, a.position) ||
                ((s = this._getOrReturnCtx(t, s)),
                G(s, {
                  code: z.invalid_string,
                  validation: { includes: a.value, position: a.position },
                  message: a.message,
                }),
                n.dirty())
              : a.kind === 'toLowerCase'
                ? (t.data = t.data.toLowerCase())
                : a.kind === 'toUpperCase'
                  ? (t.data = t.data.toUpperCase())
                  : a.kind === 'startsWith'
                    ? t.data.startsWith(a.value) ||
                      ((s = this._getOrReturnCtx(t, s)),
                      G(s, {
                        code: z.invalid_string,
                        validation: { startsWith: a.value },
                        message: a.message,
                      }),
                      n.dirty())
                    : a.kind === 'endsWith'
                      ? t.data.endsWith(a.value) ||
                        ((s = this._getOrReturnCtx(t, s)),
                        G(s, {
                          code: z.invalid_string,
                          validation: { endsWith: a.value },
                          message: a.message,
                        }),
                        n.dirty())
                      : a.kind === 'datetime'
                        ? Dk(a).test(t.data) ||
                          ((s = this._getOrReturnCtx(t, s)),
                          G(s, {
                            code: z.invalid_string,
                            validation: 'datetime',
                            message: a.message,
                          }),
                          n.dirty())
                        : a.kind === 'date'
                          ? Pk.test(t.data) ||
                            ((s = this._getOrReturnCtx(t, s)),
                            G(s, {
                              code: z.invalid_string,
                              validation: 'date',
                              message: a.message,
                            }),
                            n.dirty())
                          : a.kind === 'time'
                            ? Rk(a).test(t.data) ||
                              ((s = this._getOrReturnCtx(t, s)),
                              G(s, {
                                code: z.invalid_string,
                                validation: 'time',
                                message: a.message,
                              }),
                              n.dirty())
                            : a.kind === 'duration'
                              ? kk.test(t.data) ||
                                ((s = this._getOrReturnCtx(t, s)),
                                G(s, {
                                  validation: 'duration',
                                  code: z.invalid_string,
                                  message: a.message,
                                }),
                                n.dirty())
                              : a.kind === 'ip'
                                ? Ok(t.data, a.version) ||
                                  ((s = this._getOrReturnCtx(t, s)),
                                  G(s, {
                                    validation: 'ip',
                                    code: z.invalid_string,
                                    message: a.message,
                                  }),
                                  n.dirty())
                                : a.kind === 'jwt'
                                  ? Lk(t.data, a.alg) ||
                                    ((s = this._getOrReturnCtx(t, s)),
                                    G(s, {
                                      validation: 'jwt',
                                      code: z.invalid_string,
                                      message: a.message,
                                    }),
                                    n.dirty())
                                  : a.kind === 'cidr'
                                    ? Mk(t.data, a.version) ||
                                      ((s = this._getOrReturnCtx(t, s)),
                                      G(s, {
                                        validation: 'cidr',
                                        code: z.invalid_string,
                                        message: a.message,
                                      }),
                                      n.dirty())
                                    : a.kind === 'base64'
                                      ? Ak.test(t.data) ||
                                        ((s = this._getOrReturnCtx(t, s)),
                                        G(s, {
                                          validation: 'base64',
                                          code: z.invalid_string,
                                          message: a.message,
                                        }),
                                        n.dirty())
                                      : a.kind === 'base64url'
                                        ? Ik.test(t.data) ||
                                          ((s = this._getOrReturnCtx(t, s)),
                                          G(s, {
                                            validation: 'base64url',
                                            code: z.invalid_string,
                                            message: a.message,
                                          }),
                                          n.dirty())
                                        : we.assertNever(a);
    return { status: n.value, value: t.data };
  }
  _regex(t, r, n) {
    return this.refinement((s) => t.test(s), {
      validation: r,
      code: z.invalid_string,
      ...te.errToObj(n),
    });
  }
  _addCheck(t) {
    return new ln({ ...this._def, checks: [...this._def.checks, t] });
  }
  email(t) {
    return this._addCheck({ kind: 'email', ...te.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: 'url', ...te.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: 'emoji', ...te.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: 'uuid', ...te.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: 'nanoid', ...te.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: 'cuid', ...te.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: 'cuid2', ...te.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: 'ulid', ...te.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: 'base64', ...te.errToObj(t) });
  }
  base64url(t) {
    return this._addCheck({ kind: 'base64url', ...te.errToObj(t) });
  }
  jwt(t) {
    return this._addCheck({ kind: 'jwt', ...te.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: 'ip', ...te.errToObj(t) });
  }
  cidr(t) {
    return this._addCheck({ kind: 'cidr', ...te.errToObj(t) });
  }
  datetime(t) {
    return typeof t == 'string'
      ? this._addCheck({
          kind: 'datetime',
          precision: null,
          offset: !1,
          local: !1,
          message: t,
        })
      : this._addCheck({
          kind: 'datetime',
          precision:
            typeof (t == null ? void 0 : t.precision) > 'u'
              ? null
              : t == null
                ? void 0
                : t.precision,
          offset: (t == null ? void 0 : t.offset) ?? !1,
          local: (t == null ? void 0 : t.local) ?? !1,
          ...te.errToObj(t == null ? void 0 : t.message),
        });
  }
  date(t) {
    return this._addCheck({ kind: 'date', message: t });
  }
  time(t) {
    return typeof t == 'string'
      ? this._addCheck({ kind: 'time', precision: null, message: t })
      : this._addCheck({
          kind: 'time',
          precision:
            typeof (t == null ? void 0 : t.precision) > 'u'
              ? null
              : t == null
                ? void 0
                : t.precision,
          ...te.errToObj(t == null ? void 0 : t.message),
        });
  }
  duration(t) {
    return this._addCheck({ kind: 'duration', ...te.errToObj(t) });
  }
  regex(t, r) {
    return this._addCheck({ kind: 'regex', regex: t, ...te.errToObj(r) });
  }
  includes(t, r) {
    return this._addCheck({
      kind: 'includes',
      value: t,
      position: r == null ? void 0 : r.position,
      ...te.errToObj(r == null ? void 0 : r.message),
    });
  }
  startsWith(t, r) {
    return this._addCheck({ kind: 'startsWith', value: t, ...te.errToObj(r) });
  }
  endsWith(t, r) {
    return this._addCheck({ kind: 'endsWith', value: t, ...te.errToObj(r) });
  }
  min(t, r) {
    return this._addCheck({ kind: 'min', value: t, ...te.errToObj(r) });
  }
  max(t, r) {
    return this._addCheck({ kind: 'max', value: t, ...te.errToObj(r) });
  }
  length(t, r) {
    return this._addCheck({ kind: 'length', value: t, ...te.errToObj(r) });
  }
  nonempty(t) {
    return this.min(1, te.errToObj(t));
  }
  trim() {
    return new ln({
      ...this._def,
      checks: [...this._def.checks, { kind: 'trim' }],
    });
  }
  toLowerCase() {
    return new ln({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toLowerCase' }],
    });
  }
  toUpperCase() {
    return new ln({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toUpperCase' }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === 'ip');
  }
  get isCIDR() {
    return !!this._def.checks.find((t) => t.kind === 'cidr');
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === 'base64');
  }
  get isBase64url() {
    return !!this._def.checks.find((t) => t.kind === 'base64url');
  }
  get minLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
ln.create = (e) =>
  new ln({
    checks: [],
    typeName: de.ZodString,
    coerce: (e == null ? void 0 : e.coerce) ?? !1,
    ...he(e),
  });
function Vk(e, t) {
  const r = (e.toString().split('.')[1] || '').length,
    n = (t.toString().split('.')[1] || '').length,
    s = r > n ? r : n,
    a = Number.parseInt(e.toFixed(s).replace('.', '')),
    i = Number.parseInt(t.toFixed(s).replace('.', ''));
  return (a % i) / 10 ** s;
}
class Gs extends xe {
  constructor() {
    (super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf));
  }
  _parse(t) {
    if (
      (this._def.coerce && (t.data = Number(t.data)),
      this._getType(t) !== ee.number)
    ) {
      const a = this._getOrReturnCtx(t);
      return (
        G(a, {
          code: z.invalid_type,
          expected: ee.number,
          received: a.parsedType,
        }),
        ce
      );
    }
    let n;
    const s = new Ut();
    for (const a of this._def.checks)
      a.kind === 'int'
        ? we.isInteger(t.data) ||
          ((n = this._getOrReturnCtx(t, n)),
          G(n, {
            code: z.invalid_type,
            expected: 'integer',
            received: 'float',
            message: a.message,
          }),
          s.dirty())
        : a.kind === 'min'
          ? (a.inclusive ? t.data < a.value : t.data <= a.value) &&
            ((n = this._getOrReturnCtx(t, n)),
            G(n, {
              code: z.too_small,
              minimum: a.value,
              type: 'number',
              inclusive: a.inclusive,
              exact: !1,
              message: a.message,
            }),
            s.dirty())
          : a.kind === 'max'
            ? (a.inclusive ? t.data > a.value : t.data >= a.value) &&
              ((n = this._getOrReturnCtx(t, n)),
              G(n, {
                code: z.too_big,
                maximum: a.value,
                type: 'number',
                inclusive: a.inclusive,
                exact: !1,
                message: a.message,
              }),
              s.dirty())
            : a.kind === 'multipleOf'
              ? Vk(t.data, a.value) !== 0 &&
                ((n = this._getOrReturnCtx(t, n)),
                G(n, {
                  code: z.not_multiple_of,
                  multipleOf: a.value,
                  message: a.message,
                }),
                s.dirty())
              : a.kind === 'finite'
                ? Number.isFinite(t.data) ||
                  ((n = this._getOrReturnCtx(t, n)),
                  G(n, { code: z.not_finite, message: a.message }),
                  s.dirty())
                : we.assertNever(a);
    return { status: s.value, value: t.data };
  }
  gte(t, r) {
    return this.setLimit('min', t, !0, te.toString(r));
  }
  gt(t, r) {
    return this.setLimit('min', t, !1, te.toString(r));
  }
  lte(t, r) {
    return this.setLimit('max', t, !0, te.toString(r));
  }
  lt(t, r) {
    return this.setLimit('max', t, !1, te.toString(r));
  }
  setLimit(t, r, n, s) {
    return new Gs({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: r, inclusive: n, message: te.toString(s) },
      ],
    });
  }
  _addCheck(t) {
    return new Gs({ ...this._def, checks: [...this._def.checks, t] });
  }
  int(t) {
    return this._addCheck({ kind: 'int', message: te.toString(t) });
  }
  positive(t) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !1,
      message: te.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !1,
      message: te.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !0,
      message: te.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !0,
      message: te.toString(t),
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: 'multipleOf',
      value: t,
      message: te.toString(r),
    });
  }
  finite(t) {
    return this._addCheck({ kind: 'finite', message: te.toString(t) });
  }
  safe(t) {
    return this._addCheck({
      kind: 'min',
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: te.toString(t),
    })._addCheck({
      kind: 'max',
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: te.toString(t),
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (t === null || r.value < t) && (t = r.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find(
      (t) =>
        t.kind === 'int' || (t.kind === 'multipleOf' && we.isInteger(t.value)),
    );
  }
  get isFinite() {
    let t = null,
      r = null;
    for (const n of this._def.checks) {
      if (n.kind === 'finite' || n.kind === 'int' || n.kind === 'multipleOf')
        return !0;
      n.kind === 'min'
        ? (r === null || n.value > r) && (r = n.value)
        : n.kind === 'max' && (t === null || n.value < t) && (t = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(t);
  }
}
Gs.create = (e) =>
  new Gs({
    checks: [],
    typeName: de.ZodNumber,
    coerce: (e == null ? void 0 : e.coerce) || !1,
    ...he(e),
  });
class yi extends xe {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte));
  }
  _parse(t) {
    if (this._def.coerce)
      try {
        t.data = BigInt(t.data);
      } catch {
        return this._getInvalidInput(t);
      }
    if (this._getType(t) !== ee.bigint) return this._getInvalidInput(t);
    let n;
    const s = new Ut();
    for (const a of this._def.checks)
      a.kind === 'min'
        ? (a.inclusive ? t.data < a.value : t.data <= a.value) &&
          ((n = this._getOrReturnCtx(t, n)),
          G(n, {
            code: z.too_small,
            type: 'bigint',
            minimum: a.value,
            inclusive: a.inclusive,
            message: a.message,
          }),
          s.dirty())
        : a.kind === 'max'
          ? (a.inclusive ? t.data > a.value : t.data >= a.value) &&
            ((n = this._getOrReturnCtx(t, n)),
            G(n, {
              code: z.too_big,
              type: 'bigint',
              maximum: a.value,
              inclusive: a.inclusive,
              message: a.message,
            }),
            s.dirty())
          : a.kind === 'multipleOf'
            ? t.data % a.value !== BigInt(0) &&
              ((n = this._getOrReturnCtx(t, n)),
              G(n, {
                code: z.not_multiple_of,
                multipleOf: a.value,
                message: a.message,
              }),
              s.dirty())
            : we.assertNever(a);
    return { status: s.value, value: t.data };
  }
  _getInvalidInput(t) {
    const r = this._getOrReturnCtx(t);
    return (
      G(r, {
        code: z.invalid_type,
        expected: ee.bigint,
        received: r.parsedType,
      }),
      ce
    );
  }
  gte(t, r) {
    return this.setLimit('min', t, !0, te.toString(r));
  }
  gt(t, r) {
    return this.setLimit('min', t, !1, te.toString(r));
  }
  lte(t, r) {
    return this.setLimit('max', t, !0, te.toString(r));
  }
  lt(t, r) {
    return this.setLimit('max', t, !1, te.toString(r));
  }
  setLimit(t, r, n, s) {
    return new yi({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: r, inclusive: n, message: te.toString(s) },
      ],
    });
  }
  _addCheck(t) {
    return new yi({ ...this._def, checks: [...this._def.checks, t] });
  }
  positive(t) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !1,
      message: te.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !1,
      message: te.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !0,
      message: te.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !0,
      message: te.toString(t),
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: 'multipleOf',
      value: t,
      message: te.toString(r),
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
yi.create = (e) =>
  new yi({
    checks: [],
    typeName: de.ZodBigInt,
    coerce: (e == null ? void 0 : e.coerce) ?? !1,
    ...he(e),
  });
class md extends xe {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = !!t.data), this._getType(t) !== ee.boolean)
    ) {
      const n = this._getOrReturnCtx(t);
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.boolean,
          received: n.parsedType,
        }),
        ce
      );
    }
    return er(t.data);
  }
}
md.create = (e) =>
  new md({
    typeName: de.ZodBoolean,
    coerce: (e == null ? void 0 : e.coerce) || !1,
    ...he(e),
  });
class fl extends xe {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = new Date(t.data)),
      this._getType(t) !== ee.date)
    ) {
      const a = this._getOrReturnCtx(t);
      return (
        G(a, {
          code: z.invalid_type,
          expected: ee.date,
          received: a.parsedType,
        }),
        ce
      );
    }
    if (Number.isNaN(t.data.getTime())) {
      const a = this._getOrReturnCtx(t);
      return (G(a, { code: z.invalid_date }), ce);
    }
    const n = new Ut();
    let s;
    for (const a of this._def.checks)
      a.kind === 'min'
        ? t.data.getTime() < a.value &&
          ((s = this._getOrReturnCtx(t, s)),
          G(s, {
            code: z.too_small,
            message: a.message,
            inclusive: !0,
            exact: !1,
            minimum: a.value,
            type: 'date',
          }),
          n.dirty())
        : a.kind === 'max'
          ? t.data.getTime() > a.value &&
            ((s = this._getOrReturnCtx(t, s)),
            G(s, {
              code: z.too_big,
              message: a.message,
              inclusive: !0,
              exact: !1,
              maximum: a.value,
              type: 'date',
            }),
            n.dirty())
          : we.assertNever(a);
    return { status: n.value, value: new Date(t.data.getTime()) };
  }
  _addCheck(t) {
    return new fl({ ...this._def, checks: [...this._def.checks, t] });
  }
  min(t, r) {
    return this._addCheck({
      kind: 'min',
      value: t.getTime(),
      message: te.toString(r),
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: 'max',
      value: t.getTime(),
      message: te.toString(r),
    });
  }
  get minDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'min' && (t === null || r.value > t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === 'max' && (t === null || r.value < t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
}
fl.create = (e) =>
  new fl({
    checks: [],
    coerce: (e == null ? void 0 : e.coerce) || !1,
    typeName: de.ZodDate,
    ...he(e),
  });
class Mp extends xe {
  _parse(t) {
    if (this._getType(t) !== ee.symbol) {
      const n = this._getOrReturnCtx(t);
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.symbol,
          received: n.parsedType,
        }),
        ce
      );
    }
    return er(t.data);
  }
}
Mp.create = (e) => new Mp({ typeName: de.ZodSymbol, ...he(e) });
class Vp extends xe {
  _parse(t) {
    if (this._getType(t) !== ee.undefined) {
      const n = this._getOrReturnCtx(t);
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.undefined,
          received: n.parsedType,
        }),
        ce
      );
    }
    return er(t.data);
  }
}
Vp.create = (e) => new Vp({ typeName: de.ZodUndefined, ...he(e) });
class Fp extends xe {
  _parse(t) {
    if (this._getType(t) !== ee.null) {
      const n = this._getOrReturnCtx(t);
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.null,
          received: n.parsedType,
        }),
        ce
      );
    }
    return er(t.data);
  }
}
Fp.create = (e) => new Fp({ typeName: de.ZodNull, ...he(e) });
class $p extends xe {
  constructor() {
    (super(...arguments), (this._any = !0));
  }
  _parse(t) {
    return er(t.data);
  }
}
$p.create = (e) => new $p({ typeName: de.ZodAny, ...he(e) });
class Up extends xe {
  constructor() {
    (super(...arguments), (this._unknown = !0));
  }
  _parse(t) {
    return er(t.data);
  }
}
Up.create = (e) => new Up({ typeName: de.ZodUnknown, ...he(e) });
class Cn extends xe {
  _parse(t) {
    const r = this._getOrReturnCtx(t);
    return (
      G(r, {
        code: z.invalid_type,
        expected: ee.never,
        received: r.parsedType,
      }),
      ce
    );
  }
}
Cn.create = (e) => new Cn({ typeName: de.ZodNever, ...he(e) });
class zp extends xe {
  _parse(t) {
    if (this._getType(t) !== ee.undefined) {
      const n = this._getOrReturnCtx(t);
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.void,
          received: n.parsedType,
        }),
        ce
      );
    }
    return er(t.data);
  }
}
zp.create = (e) => new zp({ typeName: de.ZodVoid, ...he(e) });
class _r extends xe {
  _parse(t) {
    const { ctx: r, status: n } = this._processInputParams(t),
      s = this._def;
    if (r.parsedType !== ee.array)
      return (
        G(r, {
          code: z.invalid_type,
          expected: ee.array,
          received: r.parsedType,
        }),
        ce
      );
    if (s.exactLength !== null) {
      const i = r.data.length > s.exactLength.value,
        o = r.data.length < s.exactLength.value;
      (i || o) &&
        (G(r, {
          code: i ? z.too_big : z.too_small,
          minimum: o ? s.exactLength.value : void 0,
          maximum: i ? s.exactLength.value : void 0,
          type: 'array',
          inclusive: !0,
          exact: !0,
          message: s.exactLength.message,
        }),
        n.dirty());
    }
    if (
      (s.minLength !== null &&
        r.data.length < s.minLength.value &&
        (G(r, {
          code: z.too_small,
          minimum: s.minLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: s.minLength.message,
        }),
        n.dirty()),
      s.maxLength !== null &&
        r.data.length > s.maxLength.value &&
        (G(r, {
          code: z.too_big,
          maximum: s.maxLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: s.maxLength.message,
        }),
        n.dirty()),
      r.common.async)
    )
      return Promise.all(
        [...r.data].map((i, o) => s.type._parseAsync(new jn(r, i, r.path, o))),
      ).then((i) => Ut.mergeArray(n, i));
    const a = [...r.data].map((i, o) =>
      s.type._parseSync(new jn(r, i, r.path, o)),
    );
    return Ut.mergeArray(n, a);
  }
  get element() {
    return this._def.type;
  }
  min(t, r) {
    return new _r({
      ...this._def,
      minLength: { value: t, message: te.toString(r) },
    });
  }
  max(t, r) {
    return new _r({
      ...this._def,
      maxLength: { value: t, message: te.toString(r) },
    });
  }
  length(t, r) {
    return new _r({
      ...this._def,
      exactLength: { value: t, message: te.toString(r) },
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
_r.create = (e, t) =>
  new _r({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: de.ZodArray,
    ...he(t),
  });
function ms(e) {
  if (e instanceof We) {
    const t = {};
    for (const r in e.shape) {
      const n = e.shape[r];
      t[r] = bn.create(ms(n));
    }
    return new We({ ...e._def, shape: () => t });
  } else
    return e instanceof _r
      ? new _r({ ...e._def, type: ms(e.element) })
      : e instanceof bn
        ? bn.create(ms(e.unwrap()))
        : e instanceof Xs
          ? Xs.create(ms(e.unwrap()))
          : e instanceof as
            ? as.create(e.items.map((t) => ms(t)))
            : e;
}
class We extends xe {
  constructor() {
    (super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const t = this._def.shape(),
      r = we.objectKeys(t);
    return ((this._cached = { shape: t, keys: r }), this._cached);
  }
  _parse(t) {
    if (this._getType(t) !== ee.object) {
      const c = this._getOrReturnCtx(t);
      return (
        G(c, {
          code: z.invalid_type,
          expected: ee.object,
          received: c.parsedType,
        }),
        ce
      );
    }
    const { status: n, ctx: s } = this._processInputParams(t),
      { shape: a, keys: i } = this._getCached(),
      o = [];
    if (
      !(this._def.catchall instanceof Cn && this._def.unknownKeys === 'strip')
    )
      for (const c in s.data) i.includes(c) || o.push(c);
    const l = [];
    for (const c of i) {
      const d = a[c],
        h = s.data[c];
      l.push({
        key: { status: 'valid', value: c },
        value: d._parse(new jn(s, h, s.path, c)),
        alwaysSet: c in s.data,
      });
    }
    if (this._def.catchall instanceof Cn) {
      const c = this._def.unknownKeys;
      if (c === 'passthrough')
        for (const d of o)
          l.push({
            key: { status: 'valid', value: d },
            value: { status: 'valid', value: s.data[d] },
          });
      else if (c === 'strict')
        o.length > 0 &&
          (G(s, { code: z.unrecognized_keys, keys: o }), n.dirty());
      else if (c !== 'strip')
        throw new Error('Internal ZodObject error: invalid unknownKeys value.');
    } else {
      const c = this._def.catchall;
      for (const d of o) {
        const h = s.data[d];
        l.push({
          key: { status: 'valid', value: d },
          value: c._parse(new jn(s, h, s.path, d)),
          alwaysSet: d in s.data,
        });
      }
    }
    return s.common.async
      ? Promise.resolve()
          .then(async () => {
            const c = [];
            for (const d of l) {
              const h = await d.key,
                f = await d.value;
              c.push({ key: h, value: f, alwaysSet: d.alwaysSet });
            }
            return c;
          })
          .then((c) => Ut.mergeObjectSync(n, c))
      : Ut.mergeObjectSync(n, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return (
      te.errToObj,
      new We({
        ...this._def,
        unknownKeys: 'strict',
        ...(t !== void 0
          ? {
              errorMap: (r, n) => {
                var a, i;
                const s =
                  ((i = (a = this._def).errorMap) == null
                    ? void 0
                    : i.call(a, r, n).message) ?? n.defaultError;
                return r.code === 'unrecognized_keys'
                  ? { message: te.errToObj(t).message ?? s }
                  : { message: s };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new We({ ...this._def, unknownKeys: 'strip' });
  }
  passthrough() {
    return new We({ ...this._def, unknownKeys: 'passthrough' });
  }
  extend(t) {
    return new We({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...t }),
    });
  }
  merge(t) {
    return new We({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: de.ZodObject,
    });
  }
  setKey(t, r) {
    return this.augment({ [t]: r });
  }
  catchall(t) {
    return new We({ ...this._def, catchall: t });
  }
  pick(t) {
    const r = {};
    for (const n of we.objectKeys(t))
      t[n] && this.shape[n] && (r[n] = this.shape[n]);
    return new We({ ...this._def, shape: () => r });
  }
  omit(t) {
    const r = {};
    for (const n of we.objectKeys(this.shape)) t[n] || (r[n] = this.shape[n]);
    return new We({ ...this._def, shape: () => r });
  }
  deepPartial() {
    return ms(this);
  }
  partial(t) {
    const r = {};
    for (const n of we.objectKeys(this.shape)) {
      const s = this.shape[n];
      t && !t[n] ? (r[n] = s) : (r[n] = s.optional());
    }
    return new We({ ...this._def, shape: () => r });
  }
  required(t) {
    const r = {};
    for (const n of we.objectKeys(this.shape))
      if (t && !t[n]) r[n] = this.shape[n];
      else {
        let a = this.shape[n];
        for (; a instanceof bn; ) a = a._def.innerType;
        r[n] = a;
      }
    return new We({ ...this._def, shape: () => r });
  }
  keyof() {
    return Hv(we.objectKeys(this.shape));
  }
}
We.create = (e, t) =>
  new We({
    shape: () => e,
    unknownKeys: 'strip',
    catchall: Cn.create(),
    typeName: de.ZodObject,
    ...he(t),
  });
We.strictCreate = (e, t) =>
  new We({
    shape: () => e,
    unknownKeys: 'strict',
    catchall: Cn.create(),
    typeName: de.ZodObject,
    ...he(t),
  });
We.lazycreate = (e, t) =>
  new We({
    shape: e,
    unknownKeys: 'strip',
    catchall: Cn.create(),
    typeName: de.ZodObject,
    ...he(t),
  });
class hl extends xe {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t),
      n = this._def.options;
    function s(a) {
      for (const o of a) if (o.result.status === 'valid') return o.result;
      for (const o of a)
        if (o.result.status === 'dirty')
          return (r.common.issues.push(...o.ctx.common.issues), o.result);
      const i = a.map((o) => new kr(o.ctx.common.issues));
      return (G(r, { code: z.invalid_union, unionErrors: i }), ce);
    }
    if (r.common.async)
      return Promise.all(
        n.map(async (a) => {
          const i = { ...r, common: { ...r.common, issues: [] }, parent: null };
          return {
            result: await a._parseAsync({
              data: r.data,
              path: r.path,
              parent: i,
            }),
            ctx: i,
          };
        }),
      ).then(s);
    {
      let a;
      const i = [];
      for (const l of n) {
        const c = { ...r, common: { ...r.common, issues: [] }, parent: null },
          d = l._parseSync({ data: r.data, path: r.path, parent: c });
        if (d.status === 'valid') return d;
        (d.status === 'dirty' && !a && (a = { result: d, ctx: c }),
          c.common.issues.length && i.push(c.common.issues));
      }
      if (a) return (r.common.issues.push(...a.ctx.common.issues), a.result);
      const o = i.map((l) => new kr(l));
      return (G(r, { code: z.invalid_union, unionErrors: o }), ce);
    }
  }
  get options() {
    return this._def.options;
  }
}
hl.create = (e, t) => new hl({ options: e, typeName: de.ZodUnion, ...he(t) });
function gd(e, t) {
  const r = en(e),
    n = en(t);
  if (e === t) return { valid: !0, data: e };
  if (r === ee.object && n === ee.object) {
    const s = we.objectKeys(t),
      a = we.objectKeys(e).filter((o) => s.indexOf(o) !== -1),
      i = { ...e, ...t };
    for (const o of a) {
      const l = gd(e[o], t[o]);
      if (!l.valid) return { valid: !1 };
      i[o] = l.data;
    }
    return { valid: !0, data: i };
  } else if (r === ee.array && n === ee.array) {
    if (e.length !== t.length) return { valid: !1 };
    const s = [];
    for (let a = 0; a < e.length; a++) {
      const i = e[a],
        o = t[a],
        l = gd(i, o);
      if (!l.valid) return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else
    return r === ee.date && n === ee.date && +e == +t
      ? { valid: !0, data: e }
      : { valid: !1 };
}
class pl extends xe {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t),
      s = (a, i) => {
        if (Dp(a) || Dp(i)) return ce;
        const o = gd(a.value, i.value);
        return o.valid
          ? ((Op(a) || Op(i)) && r.dirty(), { status: r.value, value: o.data })
          : (G(n, { code: z.invalid_intersection_types }), ce);
      };
    return n.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseAsync({
            data: n.data,
            path: n.path,
            parent: n,
          }),
        ]).then(([a, i]) => s(a, i))
      : s(
          this._def.left._parseSync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseSync({ data: n.data, path: n.path, parent: n }),
        );
  }
}
pl.create = (e, t, r) =>
  new pl({ left: e, right: t, typeName: de.ZodIntersection, ...he(r) });
class as extends xe {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== ee.array)
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.array,
          received: n.parsedType,
        }),
        ce
      );
    if (n.data.length < this._def.items.length)
      return (
        G(n, {
          code: z.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: 'array',
        }),
        ce
      );
    !this._def.rest &&
      n.data.length > this._def.items.length &&
      (G(n, {
        code: z.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: 'array',
      }),
      r.dirty());
    const a = [...n.data]
      .map((i, o) => {
        const l = this._def.items[o] || this._def.rest;
        return l ? l._parse(new jn(n, i, n.path, o)) : null;
      })
      .filter((i) => !!i);
    return n.common.async
      ? Promise.all(a).then((i) => Ut.mergeArray(r, i))
      : Ut.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new as({ ...this._def, rest: t });
  }
}
as.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new as({ items: e, typeName: de.ZodTuple, rest: null, ...he(t) });
};
class Bp extends xe {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== ee.map)
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.map,
          received: n.parsedType,
        }),
        ce
      );
    const s = this._def.keyType,
      a = this._def.valueType,
      i = [...n.data.entries()].map(([o, l], c) => ({
        key: s._parse(new jn(n, o, n.path, [c, 'key'])),
        value: a._parse(new jn(n, l, n.path, [c, 'value'])),
      }));
    if (n.common.async) {
      const o = new Map();
      return Promise.resolve().then(async () => {
        for (const l of i) {
          const c = await l.key,
            d = await l.value;
          if (c.status === 'aborted' || d.status === 'aborted') return ce;
          ((c.status === 'dirty' || d.status === 'dirty') && r.dirty(),
            o.set(c.value, d.value));
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = new Map();
      for (const l of i) {
        const c = l.key,
          d = l.value;
        if (c.status === 'aborted' || d.status === 'aborted') return ce;
        ((c.status === 'dirty' || d.status === 'dirty') && r.dirty(),
          o.set(c.value, d.value));
      }
      return { status: r.value, value: o };
    }
  }
}
Bp.create = (e, t, r) =>
  new Bp({ valueType: t, keyType: e, typeName: de.ZodMap, ...he(r) });
class vi extends xe {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== ee.set)
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.set,
          received: n.parsedType,
        }),
        ce
      );
    const s = this._def;
    (s.minSize !== null &&
      n.data.size < s.minSize.value &&
      (G(n, {
        code: z.too_small,
        minimum: s.minSize.value,
        type: 'set',
        inclusive: !0,
        exact: !1,
        message: s.minSize.message,
      }),
      r.dirty()),
      s.maxSize !== null &&
        n.data.size > s.maxSize.value &&
        (G(n, {
          code: z.too_big,
          maximum: s.maxSize.value,
          type: 'set',
          inclusive: !0,
          exact: !1,
          message: s.maxSize.message,
        }),
        r.dirty()));
    const a = this._def.valueType;
    function i(l) {
      const c = new Set();
      for (const d of l) {
        if (d.status === 'aborted') return ce;
        (d.status === 'dirty' && r.dirty(), c.add(d.value));
      }
      return { status: r.value, value: c };
    }
    const o = [...n.data.values()].map((l, c) =>
      a._parse(new jn(n, l, n.path, c)),
    );
    return n.common.async ? Promise.all(o).then((l) => i(l)) : i(o);
  }
  min(t, r) {
    return new vi({
      ...this._def,
      minSize: { value: t, message: te.toString(r) },
    });
  }
  max(t, r) {
    return new vi({
      ...this._def,
      maxSize: { value: t, message: te.toString(r) },
    });
  }
  size(t, r) {
    return this.min(t, r).max(t, r);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
vi.create = (e, t) =>
  new vi({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: de.ZodSet,
    ...he(t),
  });
class Kp extends xe {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Kp.create = (e, t) => new Kp({ getter: e, typeName: de.ZodLazy, ...he(t) });
class Hp extends xe {
  _parse(t) {
    if (t.data !== this._def.value) {
      const r = this._getOrReturnCtx(t);
      return (
        G(r, {
          received: r.data,
          code: z.invalid_literal,
          expected: this._def.value,
        }),
        ce
      );
    }
    return { status: 'valid', value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
Hp.create = (e, t) => new Hp({ value: e, typeName: de.ZodLiteral, ...he(t) });
function Hv(e, t) {
  return new Ys({ values: e, typeName: de.ZodEnum, ...he(t) });
}
class Ys extends xe {
  _parse(t) {
    if (typeof t.data != 'string') {
      const r = this._getOrReturnCtx(t),
        n = this._def.values;
      return (
        G(r, {
          expected: we.joinValues(n),
          received: r.parsedType,
          code: z.invalid_type,
        }),
        ce
      );
    }
    if (
      (this._cache || (this._cache = new Set(this._def.values)),
      !this._cache.has(t.data))
    ) {
      const r = this._getOrReturnCtx(t),
        n = this._def.values;
      return (
        G(r, { received: r.data, code: z.invalid_enum_value, options: n }),
        ce
      );
    }
    return er(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const r of this._def.values) t[r] = r;
    return t;
  }
  get Values() {
    const t = {};
    for (const r of this._def.values) t[r] = r;
    return t;
  }
  get Enum() {
    const t = {};
    for (const r of this._def.values) t[r] = r;
    return t;
  }
  extract(t, r = this._def) {
    return Ys.create(t, { ...this._def, ...r });
  }
  exclude(t, r = this._def) {
    return Ys.create(
      this.options.filter((n) => !t.includes(n)),
      { ...this._def, ...r },
    );
  }
}
Ys.create = Hv;
class Wp extends xe {
  _parse(t) {
    const r = we.getValidEnumValues(this._def.values),
      n = this._getOrReturnCtx(t);
    if (n.parsedType !== ee.string && n.parsedType !== ee.number) {
      const s = we.objectValues(r);
      return (
        G(n, {
          expected: we.joinValues(s),
          received: n.parsedType,
          code: z.invalid_type,
        }),
        ce
      );
    }
    if (
      (this._cache ||
        (this._cache = new Set(we.getValidEnumValues(this._def.values))),
      !this._cache.has(t.data))
    ) {
      const s = we.objectValues(r);
      return (
        G(n, { received: n.data, code: z.invalid_enum_value, options: s }),
        ce
      );
    }
    return er(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Wp.create = (e, t) =>
  new Wp({ values: e, typeName: de.ZodNativeEnum, ...he(t) });
class ml extends xe {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== ee.promise && r.common.async === !1)
      return (
        G(r, {
          code: z.invalid_type,
          expected: ee.promise,
          received: r.parsedType,
        }),
        ce
      );
    const n = r.parsedType === ee.promise ? r.data : Promise.resolve(r.data);
    return er(
      n.then((s) =>
        this._def.type.parseAsync(s, {
          path: r.path,
          errorMap: r.common.contextualErrorMap,
        }),
      ),
    );
  }
}
ml.create = (e, t) => new ml({ type: e, typeName: de.ZodPromise, ...he(t) });
class Js extends xe {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === de.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t),
      s = this._def.effect || null,
      a = {
        addIssue: (i) => {
          (G(n, i), i.fatal ? r.abort() : r.dirty());
        },
        get path() {
          return n.path;
        },
      };
    if (((a.addIssue = a.addIssue.bind(a)), s.type === 'preprocess')) {
      const i = s.transform(n.data, a);
      if (n.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (r.value === 'aborted') return ce;
          const l = await this._def.schema._parseAsync({
            data: o,
            path: n.path,
            parent: n,
          });
          return l.status === 'aborted'
            ? ce
            : l.status === 'dirty' || r.value === 'dirty'
              ? Ca(l.value)
              : l;
        });
      {
        if (r.value === 'aborted') return ce;
        const o = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n,
        });
        return o.status === 'aborted'
          ? ce
          : o.status === 'dirty' || r.value === 'dirty'
            ? Ca(o.value)
            : o;
      }
    }
    if (s.type === 'refinement') {
      const i = (o) => {
        const l = s.refinement(o, a);
        if (n.common.async) return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.',
          );
        return o;
      };
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return o.status === 'aborted'
          ? ce
          : (o.status === 'dirty' && r.dirty(),
            i(o.value),
            { status: r.value, value: o.value });
      } else
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then((o) =>
            o.status === 'aborted'
              ? ce
              : (o.status === 'dirty' && r.dirty(),
                i(o.value).then(() => ({ status: r.value, value: o.value }))),
          );
    }
    if (s.type === 'transform')
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        if (!Qs(i)) return ce;
        const o = s.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error(
            'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.',
          );
        return { status: r.value, value: o };
      } else
        return this._def.schema
          ._parseAsync({ data: n.data, path: n.path, parent: n })
          .then((i) =>
            Qs(i)
              ? Promise.resolve(s.transform(i.value, a)).then((o) => ({
                  status: r.value,
                  value: o,
                }))
              : ce,
          );
    we.assertNever(s);
  }
}
Js.create = (e, t, r) =>
  new Js({ schema: e, typeName: de.ZodEffects, effect: t, ...he(r) });
Js.createWithPreprocess = (e, t, r) =>
  new Js({
    schema: t,
    effect: { type: 'preprocess', transform: e },
    typeName: de.ZodEffects,
    ...he(r),
  });
class bn extends xe {
  _parse(t) {
    return this._getType(t) === ee.undefined
      ? er(void 0)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
bn.create = (e, t) =>
  new bn({ innerType: e, typeName: de.ZodOptional, ...he(t) });
class Xs extends xe {
  _parse(t) {
    return this._getType(t) === ee.null
      ? er(null)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Xs.create = (e, t) =>
  new Xs({ innerType: e, typeName: de.ZodNullable, ...he(t) });
class yd extends xe {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    let n = r.data;
    return (
      r.parsedType === ee.undefined && (n = this._def.defaultValue()),
      this._def.innerType._parse({ data: n, path: r.path, parent: r })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
yd.create = (e, t) =>
  new yd({
    innerType: e,
    typeName: de.ZodDefault,
    defaultValue: typeof t.default == 'function' ? t.default : () => t.default,
    ...he(t),
  });
class vd extends xe {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t),
      n = { ...r, common: { ...r.common, issues: [] } },
      s = this._def.innerType._parse({
        data: n.data,
        path: n.path,
        parent: { ...n },
      });
    return dl(s)
      ? s.then((a) => ({
          status: 'valid',
          value:
            a.status === 'valid'
              ? a.value
              : this._def.catchValue({
                  get error() {
                    return new kr(n.common.issues);
                  },
                  input: n.data,
                }),
        }))
      : {
          status: 'valid',
          value:
            s.status === 'valid'
              ? s.value
              : this._def.catchValue({
                  get error() {
                    return new kr(n.common.issues);
                  },
                  input: n.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
vd.create = (e, t) =>
  new vd({
    innerType: e,
    typeName: de.ZodCatch,
    catchValue: typeof t.catch == 'function' ? t.catch : () => t.catch,
    ...he(t),
  });
class qp extends xe {
  _parse(t) {
    if (this._getType(t) !== ee.nan) {
      const n = this._getOrReturnCtx(t);
      return (
        G(n, {
          code: z.invalid_type,
          expected: ee.nan,
          received: n.parsedType,
        }),
        ce
      );
    }
    return { status: 'valid', value: t.data };
  }
}
qp.create = (e) => new qp({ typeName: de.ZodNaN, ...he(e) });
class Fk extends xe {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t),
      n = r.data;
    return this._def.type._parse({ data: n, path: r.path, parent: r });
  }
  unwrap() {
    return this._def.type;
  }
}
class $f extends xe {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return a.status === 'aborted'
          ? ce
          : a.status === 'dirty'
            ? (r.dirty(), Ca(a.value))
            : this._def.out._parseAsync({
                data: a.value,
                path: n.path,
                parent: n,
              });
      })();
    {
      const s = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n,
      });
      return s.status === 'aborted'
        ? ce
        : s.status === 'dirty'
          ? (r.dirty(), { status: 'dirty', value: s.value })
          : this._def.out._parseSync({
              data: s.value,
              path: n.path,
              parent: n,
            });
    }
  }
  static create(t, r) {
    return new $f({ in: t, out: r, typeName: de.ZodPipeline });
  }
}
class xd extends xe {
  _parse(t) {
    const r = this._def.innerType._parse(t),
      n = (s) => (Qs(s) && (s.value = Object.freeze(s.value)), s);
    return dl(r) ? r.then((s) => n(s)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
xd.create = (e, t) =>
  new xd({ innerType: e, typeName: de.ZodReadonly, ...he(t) });
var de;
(function (e) {
  ((e.ZodString = 'ZodString'),
    (e.ZodNumber = 'ZodNumber'),
    (e.ZodNaN = 'ZodNaN'),
    (e.ZodBigInt = 'ZodBigInt'),
    (e.ZodBoolean = 'ZodBoolean'),
    (e.ZodDate = 'ZodDate'),
    (e.ZodSymbol = 'ZodSymbol'),
    (e.ZodUndefined = 'ZodUndefined'),
    (e.ZodNull = 'ZodNull'),
    (e.ZodAny = 'ZodAny'),
    (e.ZodUnknown = 'ZodUnknown'),
    (e.ZodNever = 'ZodNever'),
    (e.ZodVoid = 'ZodVoid'),
    (e.ZodArray = 'ZodArray'),
    (e.ZodObject = 'ZodObject'),
    (e.ZodUnion = 'ZodUnion'),
    (e.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
    (e.ZodIntersection = 'ZodIntersection'),
    (e.ZodTuple = 'ZodTuple'),
    (e.ZodRecord = 'ZodRecord'),
    (e.ZodMap = 'ZodMap'),
    (e.ZodSet = 'ZodSet'),
    (e.ZodFunction = 'ZodFunction'),
    (e.ZodLazy = 'ZodLazy'),
    (e.ZodLiteral = 'ZodLiteral'),
    (e.ZodEnum = 'ZodEnum'),
    (e.ZodEffects = 'ZodEffects'),
    (e.ZodNativeEnum = 'ZodNativeEnum'),
    (e.ZodOptional = 'ZodOptional'),
    (e.ZodNullable = 'ZodNullable'),
    (e.ZodDefault = 'ZodDefault'),
    (e.ZodCatch = 'ZodCatch'),
    (e.ZodPromise = 'ZodPromise'),
    (e.ZodBranded = 'ZodBranded'),
    (e.ZodPipeline = 'ZodPipeline'),
    (e.ZodReadonly = 'ZodReadonly'));
})(de || (de = {}));
const W = ln.create,
  Ye = Gs.create,
  Wv = md.create;
Cn.create;
const mt = _r.create,
  rt = We.create;
hl.create;
pl.create;
as.create;
const gl = Ys.create;
ml.create;
bn.create;
Xs.create;
const Zp = (e, t, r) => {
    if (e && 'reportValidity' in e) {
      const n = Q(r, t);
      (e.setCustomValidity((n && n.message) || ''), e.reportValidity());
    }
  },
  qv = (e, t) => {
    for (const r in t.fields) {
      const n = t.fields[r];
      n && n.ref && 'reportValidity' in n.ref
        ? Zp(n.ref, r, e)
        : n.refs && n.refs.forEach((s) => Zp(s, r, e));
    }
  },
  $k = (e, t) => {
    t.shouldUseNativeValidation && qv(e, t);
    const r = {};
    for (const n in e) {
      const s = Q(t.fields, n),
        a = Object.assign(e[n] || {}, { ref: s && s.ref });
      if (Uk(t.names || Object.keys(e), n)) {
        const i = Object.assign({}, Q(r, n));
        (_e(i, 'root', a), _e(r, n, i));
      } else _e(r, n, a);
    }
    return r;
  },
  Uk = (e, t) => e.some((r) => r.startsWith(t + '.'));
var zk = function (e, t) {
    for (var r = {}; e.length; ) {
      var n = e[0],
        s = n.code,
        a = n.message,
        i = n.path.join('.');
      if (!r[i])
        if ('unionErrors' in n) {
          var o = n.unionErrors[0].errors[0];
          r[i] = { message: o.message, type: o.code };
        } else r[i] = { message: a, type: s };
      if (
        ('unionErrors' in n &&
          n.unionErrors.forEach(function (d) {
            return d.errors.forEach(function (h) {
              return e.push(h);
            });
          }),
        t)
      ) {
        var l = r[i].types,
          c = l && l[n.code];
        r[i] = Dv(i, t, r, s, c ? [].concat(c, n.message) : n.message);
      }
      e.shift();
    }
    return r;
  },
  Zv = function (e, t, r) {
    return (
      r === void 0 && (r = {}),
      function (n, s, a) {
        try {
          return Promise.resolve(
            (function (i, o) {
              try {
                var l = Promise.resolve(
                  e[r.mode === 'sync' ? 'parse' : 'parseAsync'](n, t),
                ).then(function (c) {
                  return (
                    a.shouldUseNativeValidation && qv({}, a),
                    { errors: {}, values: r.raw ? n : c }
                  );
                });
              } catch (c) {
                return o(c);
              }
              return l && l.then ? l.then(void 0, o) : l;
            })(0, function (i) {
              if (
                (function (o) {
                  return Array.isArray(o == null ? void 0 : o.errors);
                })(i)
              )
                return {
                  values: {},
                  errors: $k(
                    zk(
                      i.errors,
                      !a.shouldUseNativeValidation && a.criteriaMode === 'all',
                    ),
                    a,
                  ),
                };
              throw i;
            }),
          );
        } catch (i) {
          return Promise.reject(i);
        }
      }
    );
  };
const ua = () => {
    var a;
    const { state: e, dispatch: t } = Pn(),
      r = Rt(),
      n = w_(e),
      s = ((a = e.auth.currentUser) == null ? void 0 : a.id) ?? '';
    return {
      territorios: n,
      addTerritorio: C.useCallback(
        async (i) => {
          const o = { id: oa(), publisherId: s, ...i };
          return (
            await ur.add(o),
            t({ type: 'ADD_TERRITORIO', payload: o }),
            r.success('Território salvo'),
            o
          );
        },
        [s, t, r],
      ),
      updateTerritorio: C.useCallback(
        async (i, o) => {
          const l = n.find((h) => h.id === i),
            c = (l == null ? void 0 : l.publisherId) ?? s,
            d = { id: i, publisherId: c, ...o };
          return (
            await ur.add(d),
            t({ type: 'UPDATE_TERRITORIO', payload: d }),
            r.success('Território atualizado'),
            d
          );
        },
        [s, t, n, r],
      ),
      removeTerritorio: C.useCallback(
        async (i) => {
          (await ur.remove(i),
            t({ type: 'REMOVE_TERRITORIO', payload: i }),
            r.success('Território removido'));
        },
        [t, r],
      ),
    };
  },
  Bk = rt({
    nome: W().min(1, 'territories.validation.nameRequired'),
    imagem: W().optional(),
  }),
  Ou = 5,
  Kk = () => {
    var T;
    const {
        territorios: e,
        addTerritorio: t,
        removeTerritorio: r,
        updateTerritorio: n,
      } = ua(),
      s = la(),
      { t: a } = Ue(),
      {
        register: i,
        handleSubmit: o,
        reset: l,
        setValue: c,
        watch: d,
        formState: h,
      } = zv({ resolver: Zv(Bk), defaultValues: { nome: '', imagem: void 0 } }),
      { errors: f } = h,
      [y, m] = C.useState(null),
      [x, S] = C.useState(''),
      [g, p] = C.useState(!1),
      [v, k] = C.useState(1),
      b = e.filter(
        (D) =>
          D.nome.toLowerCase().includes(x.toLowerCase()) &&
          (!g || !!(D.imagem || D.imageUrl)),
      ),
      _ = Math.max(1, Math.ceil(b.length / Ou));
    C.useEffect(() => {
      v > _ && k(_);
    }, [v, _]);
    const w = b.slice((v - 1) * Ou, v * Ou),
      N = async (D) => {
        (y ? await n(y, D) : await t(D), l(), m(null));
      },
      j = (D) => {
        (m(D.id), l({ nome: D.nome, imagem: D.imagem ?? D.imageUrl }));
      };
    return u.jsxs('div', {
      className: 'grid gap-4',
      children: [
        u.jsx(kt, {
          title: a(
            y ? 'territories.editTerritory' : 'territories.createTerritory',
          ),
          children: u.jsxs('form', {
            onSubmit: o(N),
            className: 'grid md:grid-cols-3 gap-3',
            children: [
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: a('territories.name') }),
                  u.jsx(Me, {
                    ...i('nome'),
                    placeholder: a('territories.namePlaceholder'),
                  }),
                  ((T = f.nome) == null ? void 0 : T.message) &&
                    u.jsx('p', {
                      className: 'text-sm text-red-600',
                      children: a(f.nome.message),
                    }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1 md:col-span-2',
                children: [
                  u.jsx(je, { children: a('territories.optionalImage') }),
                  u.jsx(T_, {
                    value: d('imagem'),
                    onChange: (D) => c('imagem', D),
                    compress: !0,
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'md:col-span-3 flex justify-end gap-2',
                children: [
                  y &&
                    u.jsx(ge, {
                      type: 'button',
                      onClick: () => {
                        (l(), m(null));
                      },
                      className:
                        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                      children: a('common.cancel'),
                    }),
                  u.jsx(ge, {
                    type: 'submit',
                    className: 'bg-black text-white',
                    children: a(
                      y ? 'common.update' : 'territories.saveTerritory',
                    ),
                  }),
                ],
              }),
            ],
          }),
        }),
        u.jsx(kt, {
          title: a('territories.territoriesWithCount', { count: b.length }),
          actions: u.jsxs('div', {
            className: 'flex gap-2 items-center',
            children: [
              u.jsx(Me, {
                placeholder: a('territories.searchPlaceholder'),
                value: x,
                onChange: (D) => {
                  (S(D.target.value), k(1));
                },
                className: 'max-w-xs',
              }),
              u.jsxs('label', {
                className: 'flex items-center gap-1 text-sm',
                children: [
                  u.jsx('input', {
                    type: 'checkbox',
                    checked: g,
                    onChange: (D) => {
                      (p(D.target.checked), k(1));
                    },
                  }),
                  a('territories.withImage'),
                ],
              }),
            ],
          }),
          children:
            b.length === 0
              ? u.jsx('p', {
                  className: 'text-neutral-500',
                  children: a('territories.noTerritories'),
                })
              : u.jsxs('div', {
                  className: 'overflow-x-auto',
                  children: [
                    u.jsxs('table', {
                      className: 'w-full text-sm',
                      children: [
                        u.jsx('thead', {
                          children: u.jsxs('tr', {
                            className: 'text-left border-b',
                            children: [
                              u.jsx('th', {
                                className: 'py-2',
                                children: a('territories.name'),
                              }),
                              u.jsx('th', { children: a('territories.image') }),
                              u.jsx('th', {}),
                            ],
                          }),
                        }),
                        u.jsx('tbody', {
                          children: w.map((D) =>
                            u.jsxs(
                              'tr',
                              {
                                className: 'border-b last:border-0',
                                children: [
                                  u.jsx('td', {
                                    className: 'py-2',
                                    children: D.nome,
                                  }),
                                  u.jsx('td', {
                                    children:
                                      D.imagem || D.imageUrl
                                        ? u.jsx('img', {
                                            src: D.imagem || D.imageUrl,
                                            alt: D.nome,
                                            className:
                                              'w-16 h-16 object-cover rounded-lg border',
                                          })
                                        : a('territories.noImagePlaceholder'),
                                  }),
                                  u.jsx('td', {
                                    className: 'py-2 text-right',
                                    children: u.jsxs('div', {
                                      className: 'flex gap-2 justify-end',
                                      children: [
                                        u.jsx(ge, {
                                          onClick: () => j(D),
                                          className:
                                            'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                                          children: a('common.edit'),
                                        }),
                                        u.jsx(ge, {
                                          onClick: async () => {
                                            (await s(
                                              a('territories.confirmDelete'),
                                            )) && (await r(D.id));
                                          },
                                          className: 'bg-red-50 text-red-700',
                                          children: a('common.delete'),
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              },
                              D.id,
                            ),
                          ),
                        }),
                      ],
                    }),
                    u.jsxs('div', {
                      className: 'flex justify-between items-center mt-3',
                      children: [
                        u.jsx('span', {
                          className: 'text-sm text-neutral-500',
                          children: a('territories.pageInfo', {
                            page: v,
                            pageCount: _,
                          }),
                        }),
                        u.jsxs('div', {
                          className: 'flex gap-2',
                          children: [
                            u.jsx(ge, {
                              type: 'button',
                              disabled: v === 1,
                              onClick: () => k((D) => D - 1),
                              children: a('common.previous'),
                            }),
                            u.jsx(ge, {
                              type: 'button',
                              disabled: v === _,
                              onClick: () => k((D) => D + 1),
                              children: a('common.next'),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
        }),
      ],
    });
  },
  Lu = (e) => {
    const t = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - t.left, y: e.clientY - t.top };
  };
function Hk({ imageUrl: e, onAdd: t, onUpdate: r, onDelete: n }) {
  const s = (o) => {
      const l = Lu(o);
      t == null || t(l);
    },
    a = (o) => {
      o.preventDefault();
      const l = Lu(o);
      r == null || r(l);
    },
    i = (o) => {
      const l = Lu(o);
      n == null || n(l);
    };
  return u.jsxs('div', {
    className: 'relative inline-block',
    children: [
      u.jsx('img', {
        src: e,
        alt: '',
        className: 'max-w-full h-auto select-none',
      }),
      u.jsx('canvas', {
        className: 'absolute top-0 left-0 w-full h-full cursor-crosshair',
        onClick: s,
        onContextMenu: a,
        onDoubleClick: i,
      }),
    ],
  });
}
function Wk() {
  const { t: e } = Ue(),
    t = Rt(),
    { currentUser: r } = Nr(),
    [n, s] = C.useState([]),
    [a, i] = C.useState([]),
    [o, l] = C.useState([]),
    [c, d] = C.useState([]),
    [h, f] = C.useState('ruas'),
    [y, m] = C.useState(null),
    [x, S] = C.useState(''),
    [g, p] = C.useState(''),
    v = C.useRef(g),
    k = (r == null ? void 0 : r.id) ?? null,
    b = C.useMemo(() => n.find((R) => R.id === g), [n, g]),
    _ = C.useMemo(() => a.filter((R) => R.territoryId === g), [a, g]),
    w = C.useCallback(async () => {
      const R = await I.propertyTypes.toArray();
      l(R);
    }, []),
    N = C.useCallback(
      async (R, U) => {
        if (!R || !U) {
          (i([]), d([]));
          return;
        }
        const K = n.find((O) => O.id === R);
        if (!K || K.publisherId !== U) {
          (i([]), d([]));
          return;
        }
        const ne = await I.streets.where('territoryId').equals(R).toArray();
        if (v.current !== R) return;
        i(ne);
        const fe = ne.map((O) => O.id).filter((O) => typeof O == 'number'),
          A =
            fe.length > 0
              ? await I.addresses.where('streetId').anyOf(fe).toArray()
              : [];
        v.current === R && d(A);
      },
      [n],
    );
  (C.useEffect(() => {
    let R = !0;
    return (
      (async () => {
        try {
          if (!k) {
            if (!R) return;
            (s([]), l([]), i([]), d([]), p(''));
            return;
          }
          const [K, ne] = await Promise.all([
            ur.forPublisher(k),
            I.propertyTypes.toArray(),
          ]);
          if (!R) return;
          (s(K),
            l(ne),
            p((fe) => {
              var A;
              return fe && K.some((O) => O.id === fe && O.publisherId === k)
                ? fe
                : (((A = K[0]) == null ? void 0 : A.id) ?? '');
            }),
            K.length === 0 && i([]));
        } catch (K) {
          if ((console.error(K), !R)) return;
          (s([]),
            l([]),
            i([]),
            d([]),
            p(''),
            t.error(e('ruasNumeracoes.feedback.loadError')));
        }
      })(),
      () => {
        R = !1;
      }
    );
  }, [k, e, t]),
    C.useEffect(() => {
      ((v.current = g), N(g, k));
    }, [g, N, k]));
  const j = async (R) => {
      R.preventDefault();
      const U = R.currentTarget,
        K = new FormData(U),
        ne = String(K.get('name'));
      if (!g || !ne) return;
      const fe = k;
      !fe ||
        !b ||
        b.publisherId !== fe ||
        (await I.streets.put({ territoryId: g, name: ne }),
        await N(g, fe),
        U.reset());
    },
    T = C.useCallback(() => {
      (m(null), S(''));
    }, []),
    D = C.useCallback((R) => {
      R.id !== void 0 && (m(R.id), S(R.name));
    }, []),
    V = C.useCallback(
      async (R) => {
        R.preventDefault();
        const U = R.currentTarget,
          ne = new FormData(U).get('name'),
          fe = typeof ne == 'string' ? ne.trim() : '';
        if (fe)
          try {
            (await I.propertyTypes.put({ name: fe }),
              await w(),
              U.reset(),
              t.success(e('ruasNumeracoes.feedback.createSuccess')));
          } catch (A) {
            (console.error(A), t.error(e('ruasNumeracoes.feedback.saveError')));
          }
      },
      [w, e, t],
    ),
    F = C.useCallback(async () => {
      if (y === null) return;
      const R = x.trim();
      if (R)
        try {
          (await I.propertyTypes.put({ id: y, name: R }),
            await w(),
            T(),
            t.success(e('ruasNumeracoes.feedback.updateSuccess')));
        } catch (U) {
          (console.error(U), t.error(e('ruasNumeracoes.feedback.saveError')));
        }
    }, [T, y, x, w, e, t]),
    B = C.useCallback(
      async (R) => {
        if (R !== void 0)
          try {
            (await I.propertyTypes.delete(R),
              y === R && T(),
              await w(),
              t.success(e('ruasNumeracoes.feedback.deleteSuccess')));
          } catch (U) {
            (console.error(U),
              t.error(e('ruasNumeracoes.feedback.deleteError')));
          }
      },
      [T, y, w, e, t],
    ),
    ie = C.useCallback(
      async (R) => {
        if ((R.preventDefault(), !g)) return;
        const U = R.currentTarget,
          K = new FormData(U),
          ne = (me) => {
            if (typeof me != 'string') return null;
            const nt = me.trim();
            if (nt.length === 0) return null;
            const Dt = Number.parseInt(nt, 10);
            return Number.isNaN(Dt) ? null : Dt;
          },
          fe = ne(K.get('streetId')),
          A = ne(K.get('propertyTypeId')),
          O = ne(K.get('number'));
        if (fe === null || A === null || O === null) return;
        const le = _.some((me) => me.id === fe),
          Ne = o.some((me) => me.id === A);
        if (!le || !Ne) return;
        const Qe = k;
        if (!(!Qe || !b || b.publisherId !== Qe))
          try {
            (await I.addresses.put({
              streetId: fe,
              numberStart: O,
              numberEnd: O,
              propertyTypeId: A,
            }),
              await N(g, Qe),
              U.reset());
          } catch (me) {
            console.error(me);
          }
      },
      [o, k, N, b, g, _],
    ),
    re = C.useCallback(
      async (R) => {
        const U = R.id;
        if (U === void 0) return;
        const K = k;
        if (!K || !b || b.publisherId !== K) return;
        const ne = new Date(),
          fe = ne.toISOString(),
          A = new Date(ne.getTime() + vv).toISOString();
        try {
          (await I.addresses.update(U, {
            lastSuccessfulVisit: fe,
            nextVisitAllowed: A,
          }),
            d((O) =>
              O.map((le) =>
                le.id === U
                  ? { ...le, lastSuccessfulVisit: fe, nextVisitAllowed: A }
                  : le,
              ),
            ));
        } catch (O) {
          console.error(O);
        }
      },
      [k, b],
    ),
    ae = C.useMemo(() => {
      const R = new Map();
      _.forEach((K) => {
        K.id !== void 0 && R.set(K.id, K.name);
      });
      const U = new Map();
      return (
        o.forEach((K) => {
          K.id !== void 0 && U.set(K.id, K.name);
        }),
        c.map((K) => ({
          ...K,
          streetName: R.get(K.streetId) ?? '',
          propertyTypeName: U.get(K.propertyTypeId) ?? '',
          numberLabel:
            K.numberStart === K.numberEnd
              ? `${K.numberStart}`
              : `${K.numberStart}–${K.numberEnd}`,
        }))
      );
    }, [c, o, _]),
    M = C.useCallback((R) => {
      if (!R) return null;
      const U = new Date(R);
      return Number.isNaN(U.getTime()) ? null : U.toLocaleString();
    }, []);
  return u.jsxs('div', {
    className: 'grid grid-cols-1 gap-4 sm:grid-cols-2',
    children: [
      u.jsx('div', {
        className: 'border rounded p-2',
        children: b && u.jsx(Hk, { imageUrl: b.imageUrl ?? b.imagem ?? '' }),
      }),
      u.jsxs('div', {
        className: 'flex flex-col gap-4',
        children: [
          u.jsxs('div', {
            className: 'flex flex-col gap-1',
            children: [
              u.jsx('label', {
                htmlFor: 'territory-select',
                className: 'text-sm font-medium',
                children: e('ruasNumeracoes.territorySelector.label'),
              }),
              u.jsxs('select', {
                id: 'territory-select',
                className: 'border p-1 w-full',
                value: g,
                onChange: (R) => p(R.target.value),
                disabled: n.length === 0,
                children: [
                  u.jsx('option', {
                    value: '',
                    children: e('ruasNumeracoes.territorySelector.placeholder'),
                  }),
                  n.map((R) =>
                    u.jsx('option', { value: R.id, children: R.nome }, R.id),
                  ),
                ],
              }),
            ],
          }),
          u.jsxs('div', {
            className: 'flex flex-wrap gap-2',
            children: [
              u.jsx('button', {
                type: 'button',
                className: h === 'ruas' ? 'font-bold' : '',
                onClick: () => f('ruas'),
                children: e('ruasNumeracoes.tabs.streets'),
              }),
              u.jsx('button', {
                type: 'button',
                className: h === 'enderecos' ? 'font-bold' : '',
                onClick: () => f('enderecos'),
                children: e('ruasNumeracoes.tabs.addresses'),
              }),
              u.jsx('button', {
                type: 'button',
                className: h === 'tipos' ? 'font-bold' : '',
                onClick: () => f('tipos'),
                children: e('ruasNumeracoes.tabs.propertyTypes'),
              }),
              u.jsx('button', {
                type: 'button',
                className: h === 'resumo' ? 'font-bold' : '',
                onClick: () => f('resumo'),
                children: e('ruasNumeracoes.tabs.summary'),
              }),
            ],
          }),
          h === 'ruas' &&
            u.jsxs('div', {
              children: [
                u.jsxs('form', {
                  onSubmit: j,
                  className:
                    'mb-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end',
                  children: [
                    u.jsx('input', {
                      name: 'name',
                      placeholder: e(
                        'ruasNumeracoes.streetsForm.streetNamePlaceholder',
                      ),
                      className: 'border p-1 w-full sm:flex-1',
                    }),
                    u.jsx('button', {
                      type: 'submit',
                      className: 'border px-2 py-1 w-full sm:w-auto',
                      children: e('common.save'),
                    }),
                  ],
                }),
                u.jsx('div', {
                  className: 'overflow-x-auto',
                  children: u.jsxs('table', {
                    className: 'w-full min-w-[320px] text-sm',
                    children: [
                      u.jsx('thead', {
                        children: u.jsx('tr', {
                          children: u.jsx('th', {
                            className: 'text-left',
                            children: e('ruasNumeracoes.streetsTable.name'),
                          }),
                        }),
                      }),
                      u.jsx('tbody', {
                        children: _.map((R) =>
                          u.jsx(
                            'tr',
                            { children: u.jsx('td', { children: R.name }) },
                            R.id,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          h === 'enderecos' &&
            u.jsxs('div', {
              children: [
                u.jsxs('form', {
                  onSubmit: ie,
                  className:
                    'mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3',
                  children: [
                    u.jsxs('label', {
                      className: 'flex flex-col gap-1 text-sm',
                      children: [
                        u.jsx('span', {
                          className: 'font-medium',
                          children: e(
                            'ruasNumeracoes.addressesForm.selectStreet',
                          ),
                        }),
                        u.jsxs('select', {
                          name: 'streetId',
                          className: 'border p-1',
                          children: [
                            u.jsx('option', {
                              value: '',
                              children: e(
                                'ruasNumeracoes.addressesForm.selectStreet',
                              ),
                            }),
                            _.map((R) =>
                              u.jsx(
                                'option',
                                { value: R.id, children: R.name },
                                R.id ?? R.name,
                              ),
                            ),
                          ],
                        }),
                      ],
                    }),
                    u.jsxs('label', {
                      className: 'flex flex-col gap-1 text-sm',
                      children: [
                        u.jsx('span', {
                          className: 'font-medium',
                          children: e(
                            'ruasNumeracoes.addressesForm.selectType',
                          ),
                        }),
                        u.jsxs('select', {
                          name: 'propertyTypeId',
                          className: 'border p-1',
                          children: [
                            u.jsx('option', {
                              value: '',
                              children: e(
                                'ruasNumeracoes.addressesForm.selectType',
                              ),
                            }),
                            o.map((R) =>
                              u.jsx(
                                'option',
                                { value: R.id, children: R.name },
                                R.id ?? R.name,
                              ),
                            ),
                          ],
                        }),
                      ],
                    }),
                    u.jsxs('label', {
                      className: 'flex flex-col gap-1 text-sm',
                      children: [
                        u.jsx('span', {
                          className: 'font-medium',
                          children: e('ruasNumeracoes.addressesForm.number'),
                        }),
                        u.jsx('input', {
                          name: 'number',
                          type: 'number',
                          className: 'border p-1',
                        }),
                      ],
                    }),
                    u.jsx('div', {
                      className: 'sm:col-span-2 lg:col-span-3',
                      children: u.jsx('button', {
                        type: 'submit',
                        className: 'border px-2 py-1 w-full sm:w-auto',
                        children: e('common.create'),
                      }),
                    }),
                  ],
                }),
                u.jsx('div', {
                  className: 'overflow-x-auto',
                  children: u.jsxs('table', {
                    className: 'w-full min-w-[560px] text-sm',
                    children: [
                      u.jsx('thead', {
                        children: u.jsxs('tr', {
                          children: [
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e(
                                'ruasNumeracoes.addressesTable.street',
                              ),
                            }),
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e(
                                'ruasNumeracoes.addressesTable.number',
                              ),
                            }),
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e('ruasNumeracoes.addressesTable.type'),
                            }),
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e(
                                'ruasNumeracoes.addressesTable.lastVisit',
                              ),
                            }),
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e(
                                'ruasNumeracoes.addressesTable.nextVisit',
                              ),
                            }),
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e(
                                'ruasNumeracoes.addressesTable.actions',
                              ),
                            }),
                          ],
                        }),
                      }),
                      u.jsx('tbody', {
                        children: ae.map((R, U) => {
                          const K =
                              M(R.lastSuccessfulVisit) ??
                              e('ruasNumeracoes.addressesTable.neverVisited'),
                            ne =
                              M(R.nextVisitAllowed) ??
                              e(
                                'ruasNumeracoes.addressesTable.cooldownNotScheduled',
                              );
                          return u.jsxs(
                            'tr',
                            {
                              children: [
                                u.jsx('td', {
                                  className: 'px-2 py-1',
                                  children: R.streetName || '—',
                                }),
                                u.jsx('td', {
                                  className: 'px-2 py-1',
                                  children: R.numberLabel,
                                }),
                                u.jsx('td', {
                                  className: 'px-2 py-1',
                                  children: R.propertyTypeName || '—',
                                }),
                                u.jsx('td', {
                                  className: 'px-2 py-1',
                                  children: K,
                                }),
                                u.jsx('td', {
                                  className: 'px-2 py-1',
                                  children: ne,
                                }),
                                u.jsx('td', {
                                  className: 'px-2 py-1',
                                  children: u.jsx('button', {
                                    type: 'button',
                                    className: 'border px-2 py-1',
                                    onClick: () => {
                                      re(R);
                                    },
                                    children: e(
                                      'ruasNumeracoes.addressesTable.markVisit',
                                    ),
                                  }),
                                }),
                              ],
                            },
                            R.id ?? `${R.streetId}-${U}`,
                          );
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          h === 'tipos' &&
            u.jsxs('div', {
              children: [
                u.jsxs('form', {
                  onSubmit: V,
                  className:
                    'mb-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end',
                  children: [
                    u.jsx('input', {
                      name: 'name',
                      placeholder: e(
                        'ruasNumeracoes.propertyTypesForm.namePlaceholder',
                      ),
                      className: 'border p-1 w-full sm:flex-1',
                    }),
                    u.jsx('button', {
                      type: 'submit',
                      className: 'border px-2 py-1 w-full sm:w-auto',
                      children: e('common.create'),
                    }),
                  ],
                }),
                u.jsx('div', {
                  className: 'overflow-x-auto',
                  children: u.jsxs('table', {
                    className: 'w-full min-w-[480px] text-sm',
                    children: [
                      u.jsx('thead', {
                        children: u.jsxs('tr', {
                          children: [
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e(
                                'ruasNumeracoes.propertyTypesTable.name',
                              ),
                            }),
                            u.jsx('th', {
                              className:
                                'px-2 py-1 text-left whitespace-nowrap',
                              children: e(
                                'ruasNumeracoes.propertyTypesTable.actions',
                              ),
                            }),
                          ],
                        }),
                      }),
                      u.jsx('tbody', {
                        children:
                          o.length === 0
                            ? u.jsx('tr', {
                                children: u.jsx('td', {
                                  colSpan: 2,
                                  className: 'px-2 py-2 text-sm text-gray-500',
                                  children: e(
                                    'ruasNumeracoes.propertyTypesTable.empty',
                                  ),
                                }),
                              })
                            : o.map((R, U) => {
                                const K = y === R.id;
                                return u.jsxs(
                                  'tr',
                                  {
                                    children: [
                                      u.jsx('td', {
                                        className: 'px-2 py-1',
                                        children: K
                                          ? u.jsx('input', {
                                              value: x,
                                              onChange: (ne) =>
                                                S(ne.target.value),
                                              onKeyDown: (ne) => {
                                                ne.key === 'Enter' &&
                                                  (ne.preventDefault(), F());
                                              },
                                              className: 'w-full border p-1',
                                            })
                                          : R.name,
                                      }),
                                      u.jsx('td', {
                                        className: 'min-w-[12rem] px-2 py-1',
                                        children: u.jsx('div', {
                                          className:
                                            'flex flex-col gap-2 sm:flex-row sm:flex-wrap',
                                          children: K
                                            ? u.jsxs(u.Fragment, {
                                                children: [
                                                  u.jsx('button', {
                                                    type: 'button',
                                                    className:
                                                      'border px-2 py-1 w-full sm:w-auto',
                                                    onClick: () => {
                                                      F();
                                                    },
                                                    children: e('common.save'),
                                                  }),
                                                  u.jsx('button', {
                                                    type: 'button',
                                                    className:
                                                      'border px-2 py-1 w-full sm:w-auto',
                                                    onClick: T,
                                                    children:
                                                      e('common.cancel'),
                                                  }),
                                                ],
                                              })
                                            : u.jsxs(u.Fragment, {
                                                children: [
                                                  u.jsx('button', {
                                                    type: 'button',
                                                    className:
                                                      'border px-2 py-1 w-full sm:w-auto',
                                                    onClick: () => D(R),
                                                    children: e('common.edit'),
                                                  }),
                                                  u.jsx('button', {
                                                    type: 'button',
                                                    className:
                                                      'border px-2 py-1 w-full sm:w-auto',
                                                    onClick: () => {
                                                      B(R.id);
                                                    },
                                                    children:
                                                      e('common.delete'),
                                                  }),
                                                ],
                                              }),
                                        }),
                                      }),
                                    ],
                                  },
                                  R.id ?? `${R.name}-${U}`,
                                );
                              }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          h === 'resumo' &&
            u.jsxs('div', {
              children: [
                u.jsx('p', {
                  children: e('ruasNumeracoes.summary.totalStreets', {
                    count: _.length,
                  }),
                }),
                u.jsx('p', {
                  children: e('ruasNumeracoes.summary.totalAddresses', {
                    count: c.length,
                  }),
                }),
                u.jsx('p', {
                  children: e('ruasNumeracoes.summary.totalPropertyTypes', {
                    count: o.length,
                  }),
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
const qk = (e) =>
    rt({
      id: W().optional(),
      territory_id: W().min(
        1,
        e('buildingsVillages.validation.selectTerritory'),
      ),
      name: W().trim().min(1, e('buildingsVillages.validation.nameRequired')),
      address_line: W().trim().optional(),
      type: W().trim().optional(),
      number: W().trim().optional(),
      residences_count: W()
        .trim()
        .optional()
        .refine(
          (t) => {
            if (t === void 0 || t === '') return !0;
            const r = Number(t);
            return Number.isInteger(r) && r >= 0;
          },
          { message: e('buildingsVillages.validation.invalidNumber') },
        ),
      modality: W().trim().optional(),
      reception_type: W().trim().optional(),
      responsible: W().trim().optional(),
      contact_method: W().trim().optional(),
      letter_status: gl(pi),
      letter_history: mt(
        rt({
          id: W(),
          status: gl(pi),
          sent_at: W().optional(),
          notes: W().optional(),
        }),
      ).optional(),
      assigned_at: W().optional(),
      returned_at: W().optional(),
      block: W().trim().optional(),
      notes: W().trim().optional(),
    }),
  Qv = 'not_sent',
  Qp = 'sent',
  Mu = {
    territory_id: '',
    name: '',
    address_line: '',
    type: '',
    number: '',
    residences_count: '',
    modality: '',
    reception_type: '',
    responsible: '',
    contact_method: '',
    letter_status: Qv,
    letter_history: [],
    assigned_at: '',
    returned_at: '',
    block: '',
    notes: '',
  },
  Gp = {
    not_sent: 'buildingsVillages.letterStatus.notSent',
    in_progress: 'buildingsVillages.letterStatus.inProgress',
    sent: 'buildingsVillages.letterStatus.sent',
    responded: 'buildingsVillages.letterStatus.responded',
  },
  Yp = () =>
    typeof crypto < 'u' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 12),
  Vu = (e) => {
    if (!e) return null;
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString();
  },
  Fu = (e) => (e ? (e.length > 10 ? e.slice(0, 10) : e) : ''),
  fr = (e) => {
    if (!e) return null;
    const t = e.trim();
    return t.length === 0 ? null : t;
  },
  Zk = (e) =>
    [...e].sort((t, r) => {
      const n = t.sent_at ?? '';
      return (r.sent_at ?? '').localeCompare(n);
    });
function Qk() {
  const [e, t] = C.useState([]),
    [r, n] = C.useState([]),
    [s, a] = C.useState({
      search: '',
      territory: 'all',
      type: 'all',
      modality: 'all',
    }),
    [i, o] = C.useState(!1),
    [l, c] = C.useState(null),
    [d, h] = C.useState(!0),
    f = Rt(),
    y = la(),
    { t: m } = Ue(),
    { currentUser: x } = Nr(),
    S = (x == null ? void 0 : x.id) ?? null,
    g = C.useMemo(() => qk(m), [m]),
    p = C.useMemo(() => Zv(g), [g]),
    {
      register: v,
      handleSubmit: k,
      reset: b,
      control: _,
      formState: { errors: w, isSubmitting: N },
    } = zv({ resolver: p, defaultValues: Mu }),
    {
      fields: j,
      append: T,
      remove: D,
    } = hk({ control: _, name: 'letter_history', keyName: 'fieldId' });
  C.useEffect(() => {
    let A = !0;
    return (
      (async () => {
        try {
          if (!S) {
            A && (t([]), n([]), h(!1));
            return;
          }
          A && h(!0);
          const [le, Ne] = await Promise.all([
            xn.forPublisher(S),
            ur.forPublisher(S),
          ]);
          if (!A) return;
          (t(le), n(Ne));
        } catch (le) {
          if (!A) return;
          (console.error(le),
            f.error(m('buildingsVillages.feedback.loadError')));
        } finally {
          A && h(!1);
        }
      })(),
      () => {
        A = !1;
      }
    );
  }, [S, f, m]);
  const V = C.useMemo(
      () => r.reduce((A, O) => ((A[O.id] = O.nome), A), {}),
      [r],
    ),
    F = C.useMemo(() => {
      const A = new Set();
      return (
        e.forEach((O) => {
          O.type && A.add(O.type);
        }),
        Array.from(A).sort((O, le) => O.localeCompare(le))
      );
    }, [e]),
    B = C.useMemo(() => {
      const A = new Set();
      return (
        e.forEach((O) => {
          O.modality && A.add(O.modality);
        }),
        Array.from(A).sort((O, le) => O.localeCompare(le))
      );
    }, [e]),
    ie = C.useMemo(() => pi.map((A) => ({ value: A, label: m(Gp[A]) })), [m]),
    re = (A) => m(A ? Gp[A] : 'buildingsVillages.letterStatus.unknown'),
    ae = () => {
      T({ id: Yp(), status: Qp, sent_at: '', notes: '' });
    },
    M = C.useMemo(() => {
      const A = s.search.trim().toLowerCase();
      return e
        .filter((O) => {
          const le =
              A.length === 0 ||
              [
                O.name,
                O.address_line,
                O.responsible,
                O.block,
                O.notes,
                O.contact_method,
                O.letter_status ? re(O.letter_status) : null,
                ...(Array.isArray(O.letter_history)
                  ? O.letter_history.flatMap((nt) => [nt.notes, re(nt.status)])
                  : []),
              ]
                .filter(Boolean)
                .some((nt) => nt.toLowerCase().includes(A)),
            Ne = s.territory === 'all' || O.territory_id === s.territory,
            Qe = s.type === 'all' || O.type === s.type,
            me = s.modality === 'all' || O.modality === s.modality;
          return le && Ne && Qe && me;
        })
        .sort((O, le) => (O.name ?? '').localeCompare(le.name ?? ''));
    }, [s, e, m]),
    R = async (A) => {
      if (await y(m('buildingsVillages.confirmDelete')))
        try {
          (await xn.remove(A.id),
            t((le) => le.filter((Ne) => Ne.id !== A.id)),
            f.success(m('buildingsVillages.feedback.deleteSuccess')));
        } catch (le) {
          (console.error(le),
            f.error(m('buildingsVillages.feedback.deleteError')));
        }
    },
    U = () => {
      (o(!1),
        c(null),
        b({ ...Mu, territory_id: s.territory !== 'all' ? s.territory : '' }));
    },
    K = () => {
      (c(null),
        b({ ...Mu, territory_id: s.territory !== 'all' ? s.territory : '' }),
        o(!0));
    },
    ne = (A) => {
      (c(A),
        b({
          id: A.id,
          territory_id: A.territory_id,
          name: A.name ?? '',
          address_line: A.address_line ?? '',
          type: A.type ?? '',
          number: A.number ?? '',
          residences_count:
            A.residences_count !== null && A.residences_count !== void 0
              ? String(A.residences_count)
              : '',
          modality: A.modality ?? '',
          reception_type: A.reception_type ?? '',
          responsible: A.responsible ?? '',
          contact_method: A.contact_method ?? '',
          letter_status: A.letter_status ?? Qv,
          letter_history: Array.isArray(A.letter_history)
            ? A.letter_history.map((O) => ({
                id: O.id,
                status: O.status ?? Qp,
                sent_at: Fu(O.sent_at),
                notes: O.notes ?? '',
              }))
            : [],
          assigned_at: Fu(A.assigned_at),
          returned_at: Fu(A.returned_at),
          block: A.block ?? '',
          notes: A.notes ?? '',
        }),
        o(!0));
    },
    fe = k(async (A) => {
      const O = A.id ?? (l == null ? void 0 : l.id) ?? Yp(),
        le = Array.isArray(A.letter_history)
          ? A.letter_history
              .map((me, nt) => {
                const Dt = typeof me.id == 'string' ? me.id.trim() : '',
                  ze = `${O}-letter-${nt + 1}`,
                  Kt = typeof me.sent_at == 'string' ? me.sent_at.trim() : '';
                return {
                  id: Dt.length > 0 ? Dt : ze,
                  status: me.status,
                  sent_at: Kt.length > 0 ? Kt : null,
                  notes: fr(me.notes),
                };
              })
              .filter((me) => me.sent_at !== null || me.notes !== null)
          : [],
        Ne = (l == null ? void 0 : l.publisherId) ?? S;
      if (!Ne) {
        f.error(m('buildingsVillages.feedback.saveError'));
        return;
      }
      const Qe = {
        id: O,
        territory_id: A.territory_id,
        publisherId: Ne,
        name: A.name.trim(),
        address_line: fr(A.address_line),
        type: fr(A.type),
        number: fr(A.number),
        residences_count:
          A.residences_count && A.residences_count !== ''
            ? Number(A.residences_count)
            : null,
        modality: fr(A.modality),
        reception_type: fr(A.reception_type),
        responsible: fr(A.responsible),
        contact_method: fr(A.contact_method),
        letter_status: A.letter_status ?? null,
        letter_history: le,
        assigned_at: A.assigned_at ? A.assigned_at : null,
        returned_at: A.returned_at ? A.returned_at : null,
        block: fr(A.block),
        notes: fr(A.notes),
        created_at: (l == null ? void 0 : l.created_at) ?? null,
      };
      Qe.created_at || (Qe.created_at = new Date().toISOString());
      try {
        (await xn.add(Qe),
          t((me) =>
            me.some((Dt) => Dt.id === Qe.id)
              ? me.map((Dt) => (Dt.id === Qe.id ? Qe : Dt))
              : [Qe, ...me],
          ),
          f.success(
            m(
              l
                ? 'buildingsVillages.feedback.updateSuccess'
                : 'buildingsVillages.feedback.createSuccess',
            ),
          ),
          U());
      } catch (me) {
        (console.error(me), f.error(m('buildingsVillages.feedback.saveError')));
      }
    });
  return u.jsxs('div', {
    className: 'space-y-6',
    children: [
      u.jsxs('div', {
        className:
          'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between',
        children: [
          u.jsxs('div', {
            children: [
              u.jsx('h1', {
                className: 'text-2xl font-semibold',
                children: m('buildingsVillages.title'),
              }),
              u.jsx('p', {
                className: 'text-sm text-neutral-500 dark:text-neutral-400',
                children: m('buildingsVillages.subtitle'),
              }),
            ],
          }),
          u.jsx('button', {
            type: 'button',
            onClick: K,
            className:
              'self-start rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700',
            children: m('buildingsVillages.newRecord'),
          }),
        ],
      }),
      u.jsxs('section', {
        className:
          'rounded-2xl border border-black/5 bg-white/70 p-4 shadow backdrop-blur dark:border-white/10 dark:bg-neutral-900/60',
        children: [
          u.jsx('h2', {
            className: 'mb-4 text-lg font-semibold',
            children: m('filters.filters'),
          }),
          u.jsxs('div', {
            className: 'grid gap-4 md:grid-cols-4 sm:grid-cols-2',
            children: [
              u.jsxs('label', {
                className:
                  'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                children: [
                  u.jsx('span', {
                    className: 'mb-1',
                    children: m('buildingsVillages.filters.search'),
                  }),
                  u.jsx('input', {
                    type: 'search',
                    value: s.search,
                    onChange: (A) =>
                      a((O) => ({ ...O, search: A.target.value })),
                    className:
                      'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                    placeholder: m(
                      'buildingsVillages.filters.searchPlaceholder',
                    ),
                  }),
                ],
              }),
              u.jsxs('label', {
                className:
                  'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                children: [
                  u.jsx('span', {
                    className: 'mb-1',
                    children: m('buildingsVillages.filters.territory'),
                  }),
                  u.jsxs('select', {
                    value: s.territory,
                    onChange: (A) =>
                      a((O) => ({ ...O, territory: A.target.value })),
                    className:
                      'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                    children: [
                      u.jsx('option', {
                        value: 'all',
                        children: m('filters.all'),
                      }),
                      r.map((A) =>
                        u.jsx(
                          'option',
                          { value: A.id, children: A.nome },
                          A.id,
                        ),
                      ),
                    ],
                  }),
                ],
              }),
              u.jsxs('label', {
                className:
                  'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                children: [
                  u.jsx('span', {
                    className: 'mb-1',
                    children: m('buildingsVillages.filters.type'),
                  }),
                  u.jsxs('select', {
                    value: s.type,
                    onChange: (A) => a((O) => ({ ...O, type: A.target.value })),
                    className:
                      'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                    children: [
                      u.jsx('option', {
                        value: 'all',
                        children: m('filters.all'),
                      }),
                      F.map((A) =>
                        u.jsx('option', { value: A, children: A }, A),
                      ),
                    ],
                  }),
                ],
              }),
              u.jsxs('label', {
                className:
                  'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                children: [
                  u.jsx('span', {
                    className: 'mb-1',
                    children: m('buildingsVillages.filters.modality'),
                  }),
                  u.jsxs('select', {
                    value: s.modality,
                    onChange: (A) =>
                      a((O) => ({ ...O, modality: A.target.value })),
                    className:
                      'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                    children: [
                      u.jsx('option', {
                        value: 'all',
                        children: m('buildingsVillages.filters.allModalities'),
                      }),
                      B.map((A) =>
                        u.jsx('option', { value: A, children: A }, A),
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      u.jsxs('section', {
        className: 'space-y-4',
        children: [
          u.jsxs('div', {
            className: 'flex items-center justify-between',
            children: [
              u.jsx('h2', {
                className: 'text-lg font-semibold',
                children: m('buildingsVillages.records.title'),
              }),
              u.jsx('span', {
                className: 'text-sm text-neutral-500 dark:text-neutral-400',
                children: m('buildingsVillages.records.count', {
                  count: M.length,
                }),
              }),
            ],
          }),
          d
            ? u.jsx('div', {
                className:
                  'rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400',
                children: m('buildingsVillages.records.loading'),
              })
            : M.length === 0
              ? u.jsx('div', {
                  className:
                    'rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400',
                  children: m('buildingsVillages.records.empty'),
                })
              : u.jsx('div', {
                  className: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3',
                  children: M.map((A) =>
                    u.jsxs(
                      'article',
                      {
                        className:
                          'flex flex-col rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/70',
                        children: [
                          u.jsxs('header', {
                            className:
                              'mb-3 flex items-start justify-between gap-3',
                            children: [
                              u.jsxs('div', {
                                children: [
                                  u.jsx('h3', {
                                    className:
                                      'text-lg font-semibold text-neutral-900 dark:text-neutral-100',
                                    children:
                                      A.name ||
                                      m('buildingsVillages.records.noName'),
                                  }),
                                  u.jsx('p', {
                                    className:
                                      'text-xs text-neutral-500 dark:text-neutral-400',
                                    children:
                                      V[A.territory_id] ??
                                      m(
                                        'buildingsVillages.records.noTerritory',
                                      ),
                                  }),
                                ],
                              }),
                              u.jsxs('div', {
                                className: 'flex gap-2',
                                children: [
                                  u.jsx('button', {
                                    type: 'button',
                                    onClick: () => ne(A),
                                    className:
                                      'rounded-lg border border-black/10 px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-neutral-800',
                                    children: m('common.edit'),
                                  }),
                                  u.jsx('button', {
                                    type: 'button',
                                    onClick: () => void R(A),
                                    className:
                                      'rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50',
                                    children: m('common.delete'),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          u.jsxs('dl', {
                            className:
                              'space-y-2 text-sm text-neutral-600 dark:text-neutral-300',
                            children: [
                              A.address_line &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.address',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.address_line }),
                                  ],
                                }),
                              A.number &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.number',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.number }),
                                  ],
                                }),
                              A.type &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.type',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.type }),
                                  ],
                                }),
                              A.modality &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.modality',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.modality }),
                                  ],
                                }),
                              A.reception_type &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.reception',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.reception_type }),
                                  ],
                                }),
                              A.residences_count !== null &&
                                A.residences_count !== void 0 &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.residences',
                                      ),
                                    }),
                                    u.jsx('dd', {
                                      children: A.residences_count,
                                    }),
                                  ],
                                }),
                              A.responsible &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.responsible',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.responsible }),
                                  ],
                                }),
                              A.contact_method &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.contactMethod',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.contact_method }),
                                  ],
                                }),
                              A.letter_status &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.letterStatus',
                                      ),
                                    }),
                                    u.jsx('dd', {
                                      children: re(A.letter_status),
                                    }),
                                  ],
                                }),
                              A.letter_history.length > 0 &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.letterHistory',
                                      ),
                                    }),
                                    u.jsx('dd', {
                                      children: u.jsx('ul', {
                                        className: 'space-y-1',
                                        children: Zk(A.letter_history).map(
                                          (O) => {
                                            const le = [
                                              O.sent_at ? Vu(O.sent_at) : null,
                                              re(O.status),
                                            ]
                                              .filter(Boolean)
                                              .join(' • ');
                                            return u.jsxs(
                                              'li',
                                              {
                                                className:
                                                  'rounded-lg bg-neutral-50 px-2 py-1 dark:bg-neutral-800/60',
                                                children: [
                                                  u.jsx('span', {
                                                    className:
                                                      'block text-xs font-medium text-neutral-700 dark:text-neutral-200',
                                                    children: le,
                                                  }),
                                                  O.notes &&
                                                    u.jsx('span', {
                                                      className:
                                                        'block text-xs text-neutral-500 dark:text-neutral-400',
                                                      children: O.notes,
                                                    }),
                                                ],
                                              },
                                              O.id,
                                            );
                                          },
                                        ),
                                      }),
                                    }),
                                  ],
                                }),
                              A.assigned_at &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.assignedAt',
                                      ),
                                    }),
                                    u.jsx('dd', {
                                      children: Vu(A.assigned_at),
                                    }),
                                  ],
                                }),
                              A.returned_at &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.returnedAt',
                                      ),
                                    }),
                                    u.jsx('dd', {
                                      children: Vu(A.returned_at),
                                    }),
                                  ],
                                }),
                              A.block &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.block',
                                      ),
                                    }),
                                    u.jsx('dd', { children: A.block }),
                                  ],
                                }),
                              A.notes &&
                                u.jsxs('div', {
                                  children: [
                                    u.jsx('dt', {
                                      className:
                                        'font-medium text-neutral-500 dark:text-neutral-400',
                                      children: m(
                                        'buildingsVillages.fields.notes',
                                      ),
                                    }),
                                    u.jsx('dd', {
                                      className: 'whitespace-pre-line',
                                      children: A.notes,
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        ],
                      },
                      A.id,
                    ),
                  ),
                }),
        ],
      }),
      i &&
        u.jsxs(Df, {
          children: [
            u.jsxs('div', {
              className: 'flex items-start justify-between gap-4',
              children: [
                u.jsxs('div', {
                  children: [
                    u.jsx('h2', {
                      className: 'text-xl font-semibold',
                      children: m(
                        l
                          ? 'buildingsVillages.modal.editTitle'
                          : 'buildingsVillages.modal.createTitle',
                      ),
                    }),
                    u.jsx('p', {
                      className:
                        'text-sm text-neutral-500 dark:text-neutral-400',
                      children: m(
                        l
                          ? 'buildingsVillages.modal.descriptionEdit'
                          : 'buildingsVillages.modal.descriptionCreate',
                      ),
                    }),
                  ],
                }),
                u.jsx('button', {
                  type: 'button',
                  onClick: U,
                  className:
                    'rounded-full border border-black/10 px-2 py-1 text-xs text-neutral-500 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-400 dark:hover:bg-neutral-800',
                  children: m('app.close'),
                }),
              ],
            }),
            u.jsxs('form', {
              onSubmit: fe,
              className: 'mt-6 space-y-4',
              children: [
                u.jsxs('div', {
                  className: 'grid gap-4 sm:grid-cols-2',
                  children: [
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsxs('span', {
                          className: 'mb-1',
                          children: [
                            m('buildingsVillages.fields.territory'),
                            ' *',
                          ],
                        }),
                        u.jsxs('select', {
                          ...v('territory_id'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          children: [
                            u.jsx('option', {
                              value: '',
                              children: m(
                                'buildingsVillages.placeholders.territory',
                              ),
                            }),
                            r.map((A) =>
                              u.jsx(
                                'option',
                                { value: A.id, children: A.nome },
                                A.id,
                              ),
                            ),
                          ],
                        }),
                        w.territory_id &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.territory_id.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsxs('span', {
                          className: 'mb-1',
                          children: [m('buildingsVillages.fields.name'), ' *'],
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('name'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m('buildingsVillages.placeholders.name'),
                        }),
                        w.name &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.name.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.address'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('address_line'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m(
                            'buildingsVillages.placeholders.address',
                          ),
                        }),
                        w.address_line &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.address_line.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.number'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('number'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m(
                            'buildingsVillages.placeholders.number',
                          ),
                        }),
                        w.number &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.number.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.type'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('type'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m('buildingsVillages.placeholders.type'),
                        }),
                        w.type &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.type.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.modality'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('modality'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m(
                            'buildingsVillages.placeholders.modality',
                          ),
                        }),
                        w.modality &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.modality.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.reception'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('reception_type'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m(
                            'buildingsVillages.placeholders.reception',
                          ),
                        }),
                        w.reception_type &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.reception_type.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.responsible'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('responsible'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m(
                            'buildingsVillages.placeholders.responsible',
                          ),
                        }),
                        w.responsible &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.responsible.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.contactMethod'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('contact_method'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m(
                            'buildingsVillages.placeholders.contactMethod',
                          ),
                        }),
                        w.contact_method &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.contact_method.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.letterStatus'),
                        }),
                        u.jsx('select', {
                          ...v('letter_status'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          children: ie.map((A) =>
                            u.jsx(
                              'option',
                              { value: A.value, children: A.label },
                              A.value,
                            ),
                          ),
                        }),
                        w.letter_status &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.letter_status.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.residences'),
                        }),
                        u.jsx('input', {
                          type: 'number',
                          min: 0,
                          ...v('residences_count'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: '0',
                        }),
                        w.residences_count &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.residences_count.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.block'),
                        }),
                        u.jsx('input', {
                          type: 'text',
                          ...v('block'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                          placeholder: m(
                            'buildingsVillages.placeholders.block',
                          ),
                        }),
                        w.block &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.block.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.assignedAt'),
                        }),
                        u.jsx('input', {
                          type: 'date',
                          ...v('assigned_at'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                        }),
                        w.assigned_at &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.assigned_at.message,
                          }),
                      ],
                    }),
                    u.jsxs('label', {
                      className:
                        'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                      children: [
                        u.jsx('span', {
                          className: 'mb-1',
                          children: m('buildingsVillages.fields.returnedAt'),
                        }),
                        u.jsx('input', {
                          type: 'date',
                          ...v('returned_at'),
                          className:
                            'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                        }),
                        w.returned_at &&
                          u.jsx('span', {
                            className: 'mt-1 text-xs text-red-600',
                            children: w.returned_at.message,
                          }),
                      ],
                    }),
                  ],
                }),
                u.jsxs('div', {
                  className: 'space-y-3',
                  children: [
                    u.jsxs('div', {
                      className:
                        'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between',
                      children: [
                        u.jsx('span', {
                          className:
                            'text-sm font-medium text-neutral-600 dark:text-neutral-300',
                          children: m('buildingsVillages.fields.letterHistory'),
                        }),
                        u.jsx('button', {
                          type: 'button',
                          onClick: ae,
                          className:
                            'self-start rounded-lg border border-blue-500 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500/20',
                          children: m('buildingsVillages.letterHistory.add'),
                        }),
                      ],
                    }),
                    j.length === 0
                      ? u.jsx('p', {
                          className:
                            'rounded-xl border border-dashed border-black/10 px-3 py-2 text-xs text-neutral-500 dark:border-white/10 dark:text-neutral-400',
                          children: m('buildingsVillages.letterHistory.empty'),
                        })
                      : u.jsx('div', {
                          className: 'space-y-3',
                          children: j.map((A, O) =>
                            u.jsxs(
                              'div',
                              {
                                className:
                                  'space-y-2 rounded-xl border border-black/10 p-3 shadow-sm dark:border-white/10 dark:bg-neutral-950/40',
                                children: [
                                  u.jsx('input', {
                                    type: 'hidden',
                                    ...v(`letter_history.${O}.id`),
                                  }),
                                  u.jsxs('div', {
                                    className: 'grid gap-3 sm:grid-cols-3',
                                    children: [
                                      u.jsxs('label', {
                                        className:
                                          'flex flex-col text-xs font-medium text-neutral-600 dark:text-neutral-300',
                                        children: [
                                          u.jsx('span', {
                                            className: 'mb-1',
                                            children: m(
                                              'buildingsVillages.letterHistory.sentAt',
                                            ),
                                          }),
                                          u.jsx('input', {
                                            type: 'date',
                                            ...v(`letter_history.${O}.sent_at`),
                                            className:
                                              'w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900',
                                          }),
                                        ],
                                      }),
                                      u.jsxs('label', {
                                        className:
                                          'flex flex-col text-xs font-medium text-neutral-600 dark:text-neutral-300',
                                        children: [
                                          u.jsx('span', {
                                            className: 'mb-1',
                                            children: m(
                                              'buildingsVillages.letterHistory.status',
                                            ),
                                          }),
                                          u.jsx('select', {
                                            ...v(`letter_history.${O}.status`),
                                            className:
                                              'w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900',
                                            children: ie.map((le) =>
                                              u.jsx(
                                                'option',
                                                {
                                                  value: le.value,
                                                  children: le.label,
                                                },
                                                le.value,
                                              ),
                                            ),
                                          }),
                                        ],
                                      }),
                                      u.jsx('div', {
                                        className: 'flex items-end justify-end',
                                        children: u.jsx('button', {
                                          type: 'button',
                                          onClick: () => D(O),
                                          className:
                                            'rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/40',
                                          children: m(
                                            'buildingsVillages.letterHistory.remove',
                                          ),
                                        }),
                                      }),
                                    ],
                                  }),
                                  u.jsxs('label', {
                                    className:
                                      'flex flex-col text-xs font-medium text-neutral-600 dark:text-neutral-300',
                                    children: [
                                      u.jsx('span', {
                                        className: 'mb-1',
                                        children: m(
                                          'buildingsVillages.letterHistory.notes',
                                        ),
                                      }),
                                      u.jsx('textarea', {
                                        rows: 2,
                                        ...v(`letter_history.${O}.notes`),
                                        className:
                                          'w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900',
                                        placeholder: m(
                                          'buildingsVillages.letterHistory.notesPlaceholder',
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              A.fieldId,
                            ),
                          ),
                        }),
                  ],
                }),
                u.jsxs('label', {
                  className:
                    'flex flex-col text-sm font-medium text-neutral-600 dark:text-neutral-300',
                  children: [
                    u.jsx('span', {
                      className: 'mb-1',
                      children: m('buildingsVillages.fields.notes'),
                    }),
                    u.jsx('textarea', {
                      rows: 3,
                      ...v('notes'),
                      className:
                        'w-full rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-950',
                      placeholder: m('buildingsVillages.placeholders.notes'),
                    }),
                    w.notes &&
                      u.jsx('span', {
                        className: 'mt-1 text-xs text-red-600',
                        children: w.notes.message,
                      }),
                  ],
                }),
                u.jsxs('div', {
                  className: 'flex justify-end gap-2 pt-2',
                  children: [
                    u.jsx('button', {
                      type: 'button',
                      onClick: U,
                      className:
                        'rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-neutral-800',
                      children: m('common.cancel'),
                    }),
                    u.jsx('button', {
                      type: 'submit',
                      disabled: N,
                      className:
                        'rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70',
                      children: m(
                        N
                          ? 'app.saving'
                          : l
                            ? 'common.update'
                            : 'common.create',
                      ),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
const Gk = {
    not_sent: 'buildingsVillages.letterStatus.notSent',
    in_progress: 'buildingsVillages.letterStatus.inProgress',
    sent: 'buildingsVillages.letterStatus.sent',
    responded: 'buildingsVillages.letterStatus.responded',
  },
  Yk = (e) => {
    if (!e) return null;
    const t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString();
  },
  Jk = (e) =>
    [...e].sort((t, r) => {
      const n = t.sent_at ?? '';
      return (r.sent_at ?? '').localeCompare(n);
    }),
  Jp = (e, t) => t(e ? Gk[e] : 'buildingsVillages.letterStatus.unknown'),
  Xk = () => {
    const [e, t] = C.useState([]),
      [r, n] = C.useState([]),
      [s, a] = C.useState(!0),
      i = Rt(),
      { t: o } = Ue(),
      { currentUser: l } = Nr(),
      c = (l == null ? void 0 : l.id) ?? null;
    C.useEffect(() => {
      let y = !0;
      return (
        (async () => {
          try {
            if (!c) {
              y && (t([]), n([]), a(!1));
              return;
            }
            y && a(!0);
            const [x, S] = await Promise.all([
              xn.forPublisher(c),
              ur.forPublisher(c),
            ]);
            if (!y) return;
            (t(x), n(S));
          } catch (x) {
            if (!y) return;
            (console.error(x), i.error(o('letters.feedback.loadError')));
          } finally {
            y && a(!1);
          }
        })(),
        () => {
          y = !1;
        }
      );
    }, [c, i, o]);
    const d = C.useMemo(
        () => r.reduce((y, m) => ((y[m.id] = m.nome), y), {}),
        [r],
      ),
      h = C.useMemo(() => {
        const y = new Map();
        return (
          e.forEach((m) => {
            var k;
            const x = (k = m.responsible) == null ? void 0 : k.trim();
            if (!x) return;
            const S = Array.isArray(m.letter_history) ? m.letter_history : [],
              g = S.length > 0,
              p = !!m.letter_status;
            if (!g && !p) return;
            const v = y.get(x) ?? {
              responsible: x,
              contactMethods: [],
              lettersCount: 0,
              entries: [],
            };
            if (
              (v.entries.push({
                buildingId: m.id,
                buildingName: m.name ?? null,
                territoryId: m.territory_id,
                contactMethod: m.contact_method,
                letterStatus: m.letter_status ?? null,
                letterHistory: S,
              }),
              m.contact_method)
            ) {
              const b = m.contact_method.trim();
              b.length > 0 &&
                !v.contactMethods.includes(b) &&
                v.contactMethods.push(b);
            }
            ((v.lettersCount += S.length), y.set(x, v));
          }),
          Array.from(y.values())
            .map((m) => ({
              ...m,
              contactMethods: m.contactMethods.sort((x, S) =>
                x.localeCompare(S),
              ),
              entries: m.entries.sort((x, S) => {
                const g = x.buildingName ?? '',
                  p = S.buildingName ?? '';
                return g.localeCompare(p);
              }),
            }))
            .sort((m, x) => m.responsible.localeCompare(x.responsible))
        );
      }, [e]),
      f = C.useMemo(() => h.reduce((y, m) => y + m.lettersCount, 0), [h]);
    return u.jsxs('div', {
      className: 'space-y-6',
      children: [
        u.jsxs('header', {
          className: 'space-y-2',
          children: [
            u.jsx('h1', {
              className: 'text-2xl font-semibold',
              children: o('letters.title'),
            }),
            u.jsx('p', {
              className: 'text-sm text-neutral-500 dark:text-neutral-400',
              children: o('letters.subtitle'),
            }),
          ],
        }),
        u.jsx('section', {
          className:
            'rounded-2xl border border-black/5 bg-white/70 p-4 shadow backdrop-blur dark:border-white/10 dark:bg-neutral-900/60',
          children: u.jsx('p', {
            className: 'text-sm text-neutral-600 dark:text-neutral-300',
            children: o('letters.summary', {
              responsibles: h.length,
              letters: f,
            }),
          }),
        }),
        s
          ? u.jsx('div', {
              className:
                'rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400',
              children: o('letters.loading'),
            })
          : h.length === 0
            ? u.jsx('div', {
                className:
                  'rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400',
                children: o('letters.empty'),
              })
            : u.jsx('div', {
                className: 'space-y-6',
                children: h.map((y) =>
                  u.jsxs(
                    'section',
                    {
                      className:
                        'space-y-3 rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/70',
                      children: [
                        u.jsxs('header', {
                          className:
                            'flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between',
                          children: [
                            u.jsxs('div', {
                              children: [
                                u.jsx('h2', {
                                  className:
                                    'text-xl font-semibold text-neutral-900 dark:text-neutral-100',
                                  children: y.responsible,
                                }),
                                u.jsx('p', {
                                  className:
                                    'text-xs text-neutral-500 dark:text-neutral-400',
                                  children: o('letters.groupSummary', {
                                    letters: y.lettersCount,
                                    buildings: y.entries.length,
                                  }),
                                }),
                              ],
                            }),
                            y.contactMethods.length > 0 &&
                              u.jsx('p', {
                                className:
                                  'text-xs text-neutral-500 dark:text-neutral-400',
                                children: o('letters.contactMethods', {
                                  methods: y.contactMethods.join(', '),
                                }),
                              }),
                          ],
                        }),
                        u.jsx('div', {
                          className: 'space-y-3',
                          children: y.entries.map((m) =>
                            u.jsxs(
                              'article',
                              {
                                className:
                                  'space-y-2 rounded-xl border border-black/5 p-3 shadow-sm dark:border-white/10 dark:bg-neutral-950/50',
                                children: [
                                  u.jsxs('header', {
                                    className:
                                      'flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between',
                                    children: [
                                      u.jsxs('div', {
                                        children: [
                                          u.jsx('h3', {
                                            className:
                                              'text-lg font-medium text-neutral-900 dark:text-neutral-100',
                                            children:
                                              m.buildingName ||
                                              o('letters.unnamedBuilding'),
                                          }),
                                          u.jsx('p', {
                                            className:
                                              'text-xs text-neutral-500 dark:text-neutral-400',
                                            children:
                                              d[m.territoryId] ??
                                              o('letters.unknownTerritory'),
                                          }),
                                        ],
                                      }),
                                      m.letterStatus &&
                                        u.jsx('span', {
                                          className:
                                            'inline-flex items-center justify-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/20 dark:text-blue-200',
                                          children: Jp(m.letterStatus, o),
                                        }),
                                    ],
                                  }),
                                  u.jsxs('dl', {
                                    className:
                                      'space-y-1 text-xs text-neutral-600 dark:text-neutral-300',
                                    children: [
                                      m.contactMethod &&
                                        u.jsxs('div', {
                                          children: [
                                            u.jsx('dt', {
                                              className:
                                                'font-medium text-neutral-500 dark:text-neutral-400',
                                              children: o(
                                                'letters.contactMethod',
                                              ),
                                            }),
                                            u.jsx('dd', {
                                              children: m.contactMethod,
                                            }),
                                          ],
                                        }),
                                      m.letterHistory.length === 0
                                        ? u.jsxs('div', {
                                            children: [
                                              u.jsx('dt', {
                                                className:
                                                  'font-medium text-neutral-500 dark:text-neutral-400',
                                                children: o('letters.history'),
                                              }),
                                              u.jsx('dd', {
                                                children:
                                                  o('letters.noHistory'),
                                              }),
                                            ],
                                          })
                                        : u.jsxs('div', {
                                            children: [
                                              u.jsx('dt', {
                                                className:
                                                  'font-medium text-neutral-500 dark:text-neutral-400',
                                                children: o('letters.history'),
                                              }),
                                              u.jsx('dd', {
                                                children: u.jsx('ul', {
                                                  className: 'space-y-1',
                                                  children: Jk(
                                                    m.letterHistory,
                                                  ).map((x) => {
                                                    const S = [
                                                      x.sent_at
                                                        ? Yk(x.sent_at)
                                                        : null,
                                                      Jp(x.status, o),
                                                    ]
                                                      .filter(Boolean)
                                                      .join(' • ');
                                                    return u.jsxs(
                                                      'li',
                                                      {
                                                        className:
                                                          'rounded-lg bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-200',
                                                        children: [
                                                          u.jsx('span', {
                                                            children: S,
                                                          }),
                                                          x.notes &&
                                                            u.jsx('span', {
                                                              className:
                                                                'block text-[11px] font-normal text-neutral-500 dark:text-neutral-400',
                                                              children: x.notes,
                                                            }),
                                                        ],
                                                      },
                                                      x.id,
                                                    );
                                                  }),
                                                }),
                                              }),
                                            ],
                                          }),
                                    ],
                                  }),
                                ],
                              },
                              m.buildingId,
                            ),
                          ),
                        }),
                      ],
                    },
                    y.responsible,
                  ),
                ),
              }),
      ],
    });
  },
  $l = () => {
    var a;
    const { state: e, dispatch: t } = Pn(),
      r = Rt(),
      n = b_(e),
      s = ((a = e.auth.currentUser) == null ? void 0 : a.id) ?? '';
    return {
      saidas: n,
      addSaida: C.useCallback(
        async (i) => {
          const o = { id: oa(), publisherId: s, ...i };
          return (
            await vn.add(o),
            t({ type: 'ADD_SAIDA', payload: o }),
            r.success('Saída salva'),
            o
          );
        },
        [s, t, r],
      ),
      updateSaida: C.useCallback(
        async (i, o) => {
          const l = n.find((h) => h.id === i),
            c = (l == null ? void 0 : l.publisherId) ?? s,
            d = { id: i, publisherId: c, ...o };
          return (
            await vn.add(d),
            t({ type: 'UPDATE_SAIDA', payload: d }),
            r.success('Saída atualizada'),
            d
          );
        },
        [s, t, n, r],
      ),
      removeSaida: C.useCallback(
        async (i) => {
          (await vn.remove(i),
            t({ type: 'REMOVE_SAIDA', payload: i }),
            r.success('Saída removida'));
        },
        [t, r],
      ),
    };
  },
  eS = () => {
    const { saidas: e, addSaida: t, removeSaida: r } = $l(),
      n = la(),
      { t: s } = Ue(),
      [a, i] = C.useState(''),
      [o, l] = C.useState(6),
      [c, d] = C.useState('09:00'),
      h = async (f) => {
        (f.preventDefault(),
          a.trim() &&
            (await t({ nome: a.trim(), diaDaSemana: o, hora: c }),
            i(''),
            l(6),
            d('09:00')));
      };
    return u.jsxs('div', {
      className: 'grid gap-4',
      children: [
        u.jsx(kt, {
          title: s('exits.newExit'),
          children: u.jsxs('form', {
            onSubmit: h,
            className: 'grid md:grid-cols-4 gap-3',
            children: [
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: s('exits.name') }),
                  u.jsx(Me, {
                    value: a,
                    onChange: (f) => i(f.target.value),
                    placeholder: s('exits.namePlaceholder'),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: s('exits.weekday') }),
                  u.jsx('select', {
                    value: o,
                    onChange: (f) => l(Number(f.target.value)),
                    className:
                      'w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900',
                    children: ud.map((f, y) =>
                      u.jsx('option', { value: y, children: f }, f),
                    ),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: s('exits.time') }),
                  u.jsx(Me, {
                    type: 'time',
                    value: c,
                    onChange: (f) => d(f.target.value),
                  }),
                ],
              }),
              u.jsx('div', {
                className: 'flex items-end justify-end',
                children: u.jsx(ge, {
                  type: 'submit',
                  className: 'bg-black text-white',
                  children: s('exits.save'),
                }),
              }),
            ],
          }),
        }),
        u.jsx(kt, {
          title: s('exits.exitsWithCount', { count: e.length }),
          children:
            e.length === 0
              ? u.jsx('p', {
                  className: 'text-neutral-500',
                  children: s('exits.noExits'),
                })
              : u.jsx('div', {
                  className: 'grid md:grid-cols-2 gap-3',
                  children: e.map((f) =>
                    u.jsxs(
                      'div',
                      {
                        className:
                          'rounded-xl border p-3 flex items-center justify-between bg-white dark:bg-neutral-950',
                        children: [
                          u.jsxs('div', {
                            children: [
                              u.jsx('p', {
                                className: 'font-semibold',
                                children: f.nome,
                              }),
                              u.jsxs('p', {
                                className: 'text-sm text-neutral-600',
                                children: [ud[f.diaDaSemana], ' · ', f.hora],
                              }),
                            ],
                          }),
                          u.jsx(ge, {
                            onClick: async () => {
                              (await n(s('exits.confirmDelete'))) &&
                                (await r(f.id));
                            },
                            className: 'bg-red-50 text-red-700',
                            children: s('exits.delete'),
                          }),
                        ],
                      },
                      f.id,
                    ),
                  ),
                }),
        }),
      ],
    });
  },
  tS = {
    ativo: 'bg-green-600',
    devolvido: 'bg-blue-600',
    atrasado: 'bg-red-600',
  },
  rS = ({ status: e }) => {
    const { t } = Ue();
    return u.jsx('span', {
      className: `text-xs text-white px-2 py-1 rounded ${tS[e]}`,
      children: t(`status.${e}`),
    });
  },
  Ai = () => {
    var a;
    const { state: e, dispatch: t } = Pn(),
      r = Rt(),
      n = __(e),
      s = ((a = e.auth.currentUser) == null ? void 0 : a.id) ?? '';
    return {
      designacoes: n,
      addDesignacao: C.useCallback(
        async (i) => {
          const o = { id: oa(), devolvido: !1, ...i, publisherId: s };
          return (
            await Fr.add(o),
            t({ type: 'ADD_DESIGNACAO', payload: o }),
            r.success('Designação salva'),
            o
          );
        },
        [s, t, r],
      ),
      updateDesignacao: C.useCallback(
        async (i, o) => {
          const l = n.find((d) => d.id === i);
          if (!l) return;
          const c = { ...l, ...o, id: i };
          return (
            await Fr.add(c),
            t({ type: 'UPDATE_DESIGNACAO', payload: c }),
            r.success('Designação atualizada'),
            c
          );
        },
        [n, t, r],
      ),
      removeDesignacao: C.useCallback(
        async (i) => {
          (await Fr.remove(i),
            t({ type: 'REMOVE_DESIGNACAO', payload: i }),
            r.success('Designação removida'));
        },
        [t, r],
      ),
    };
  },
  nS = {
    avoidLastAssignments: 5,
    defaultDurationDays: 30,
    avoidMonthsPerExit: 6,
    recentWeight: 1,
    balanceWeight: 1,
  },
  Gv = () => kv('tm.rules', nS),
  vr = (e, t) => {
    const r = t.find((n) => n.id === e);
    return r
      ? 'name' in r && typeof r.name == 'string'
        ? r.name
        : 'nome' in r && typeof r.nome == 'string'
          ? r.nome
          : '—'
      : '—';
  },
  Yv = (e, t) =>
    t
      .filter((r) => r.territorioId === e)
      .map((r) => new Date(`${r.dataInicial}T00:00:00`))
      .sort((r, n) => n.getTime() - r.getTime())[0],
  sS = () => {
    const { territorios: e } = ua(),
      { saidas: t } = $l(),
      {
        designacoes: r,
        addDesignacao: n,
        removeDesignacao: s,
        updateDesignacao: a,
      } = Ai(),
      [i] = Gv(),
      o = la(),
      l = Rt(),
      { t: c } = Ue(),
      d = gi(),
      [h, f] = C.useState(''),
      [y, m] = C.useState(''),
      [x, S] = C.useState(d),
      [g, p] = C.useState(ol(d, i.defaultDurationDays)),
      v = () => {
        const _ = t.find((V) => V.id === y);
        if (!_) {
          l.error(c('assignments.selectExit'));
          return;
        }
        const w = new Set(
            [...r]
              .sort((V, F) => F.dataInicial.localeCompare(V.dataInicial))
              .slice(0, i.avoidLastAssignments)
              .map((V) => V.territorioId),
          ),
          N = new Date(`${x}T00:00:00`),
          T = e
            .filter((V) => !w.has(V.id))
            .flatMap((V) => {
              const F = r
                .filter((M) => M.territorioId === V.id && M.saidaId === _.id)
                .map((M) => new Date(`${M.dataInicial}T00:00:00`))
                .sort((M, R) => R.getTime() - M.getTime())[0];
              if (
                F &&
                (N.getTime() - F.getTime()) / 1e3 / 60 / 60 / 24 / 30 <
                  i.avoidMonthsPerExit
              )
                return [];
              const B = Yv(V.id, r),
                ie = B
                  ? Math.floor((N.getTime() - B.getTime()) / 864e5)
                  : Number.POSITIVE_INFINITY,
                re = B ? 1 / (ie + 1) : 0,
                ae = -i.recentWeight * re;
              return [{ territorioId: V.id, score: ae }];
            })
            .sort((V, F) => F.score - V.score)[0];
        if (!T) {
          l.error(c('assignments.noAvailableTerritories'));
          return;
        }
        const D = jv(x, _.diaDaSemana);
        (f(T.territorioId), S(D), p(ol(D, i.defaultDurationDays)));
      },
      k = async (_) => {
        if ((_.preventDefault(), !h || !y)) {
          l.error(c('assignments.selectTerritoryAndExit'));
          return;
        }
        await n({
          territorioId: h,
          saidaId: y,
          dataInicial: x,
          dataFinal: g,
          devolvido: !1,
        });
      },
      b = async (_) => {
        await a(_.id, { devolvido: !_.devolvido });
      };
    return u.jsxs('div', {
      className: 'grid gap-4',
      children: [
        u.jsx(kt, {
          title: c('assignments.newAssignment'),
          children: u.jsxs('form', {
            onSubmit: k,
            className: 'grid md:grid-cols-5 gap-3',
            children: [
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: c('assignments.territory') }),
                  u.jsxs('select', {
                    value: h,
                    onChange: (_) => f(_.target.value),
                    className:
                      'w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900',
                    children: [
                      u.jsx('option', {
                        value: '',
                        children: c('assignments.selectPlaceholder'),
                      }),
                      e.map((_) =>
                        u.jsx(
                          'option',
                          { value: _.id, children: _.nome },
                          _.id,
                        ),
                      ),
                    ],
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: c('assignments.exit') }),
                  u.jsxs('select', {
                    value: y,
                    onChange: (_) => m(_.target.value),
                    className:
                      'w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900',
                    children: [
                      u.jsx('option', {
                        value: '',
                        children: c('assignments.selectPlaceholder'),
                      }),
                      t.map((_) =>
                        u.jsx(
                          'option',
                          { value: _.id, children: _.nome },
                          _.id,
                        ),
                      ),
                    ],
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: c('assignments.assignmentDate') }),
                  u.jsx(Me, {
                    type: 'date',
                    value: x,
                    onChange: (_) => S(_.target.value),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  u.jsx(je, { children: c('assignments.returnDate') }),
                  u.jsx(Me, {
                    type: 'date',
                    value: g,
                    onChange: (_) => p(_.target.value),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'flex items-end justify-end gap-2',
                children: [
                  u.jsx(ge, {
                    type: 'button',
                    onClick: v,
                    className: 'bg-blue-600 text-white',
                    children: c('assignments.generateSuggestion'),
                  }),
                  u.jsx(ge, {
                    type: 'submit',
                    className: 'bg-black text-white',
                    children: c('assignments.save'),
                  }),
                ],
              }),
            ],
          }),
        }),
        u.jsx(kt, {
          title: c('assignments.assignmentsWithCount', { count: r.length }),
          children:
            r.length === 0
              ? u.jsx('p', {
                  className: 'text-neutral-500',
                  children: c('assignments.noAssignments'),
                })
              : u.jsx('div', {
                  className: 'overflow-x-auto',
                  children: u.jsxs('table', {
                    className: 'w-full text-sm',
                    children: [
                      u.jsx('thead', {
                        children: u.jsxs('tr', {
                          className: 'text-left border-b',
                          children: [
                            u.jsx('th', {
                              className: 'py-2',
                              children: c('assignments.territory'),
                            }),
                            u.jsx('th', { children: c('assignments.exit') }),
                            u.jsx('th', {
                              children: c('assignments.assignmentDate'),
                            }),
                            u.jsx('th', {
                              children: c('assignments.returnDate'),
                            }),
                            u.jsx('th', { children: c('assignments.status') }),
                            u.jsx('th', {}),
                          ],
                        }),
                      }),
                      u.jsx('tbody', {
                        children: r.map((_) => {
                          const w = _.devolvido
                            ? 'devolvido'
                            : new Date(_.dataFinal) < new Date()
                              ? 'atrasado'
                              : 'ativo';
                          return u.jsxs(
                            'tr',
                            {
                              className: 'border-b last:border-0',
                              children: [
                                u.jsx('td', {
                                  className: 'py-2',
                                  children: vr(_.territorioId, e),
                                }),
                                u.jsx('td', { children: vr(_.saidaId, t) }),
                                u.jsx('td', { children: wt(_.dataInicial) }),
                                u.jsx('td', { children: wt(_.dataFinal) }),
                                u.jsx('td', {
                                  children: u.jsx(rS, { status: w }),
                                }),
                                u.jsxs('td', {
                                  className:
                                    'text-right flex gap-2 justify-end',
                                  children: [
                                    u.jsx(ge, {
                                      onClick: () => b(_),
                                      className:
                                        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                                      children: _.devolvido
                                        ? c('assignments.reactivate')
                                        : c('assignments.markAsReturned'),
                                    }),
                                    u.jsx(ge, {
                                      onClick: async () => {
                                        (await o(
                                          c('assignments.confirmDelete'),
                                        )) && (await s(_.id));
                                      },
                                      className: 'bg-red-50 text-red-700',
                                      children: c('assignments.delete'),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            _.id,
                          );
                        }),
                      }),
                    ],
                  }),
                }),
        }),
      ],
    });
  },
  aS = () => kv('tm.warningDays', 2),
  iS = () => {
    const { designacoes: e } = Ai(),
      { territorios: t } = ua(),
      [r, n] = aS(),
      [s, a] = C.useState(() => new Date()),
      [i, o] = C.useState(null),
      { t: l } = Ue(),
      c = new Date(),
      d = (S) => S.toISOString().slice(0, 10),
      h = new Date(s.getFullYear(), s.getMonth(), 1),
      f = new Date(h);
    f.setDate(f.getDate() - f.getDay());
    const y = [];
    for (let S = 0; S < 42; S += 1) {
      const g = new Date(f);
      (g.setDate(f.getDate() + S), y.push(g));
    }
    const m = (S) => o(S),
      x = () => o(null);
    return u.jsxs('div', {
      className: 'grid gap-4',
      children: [
        u.jsxs(kt, {
          children: [
            u.jsxs('div', {
              className: 'flex items-center justify-between mb-4',
              children: [
                u.jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    u.jsx(ge, {
                      onClick: () =>
                        a(new Date(s.getFullYear(), s.getMonth() - 1, 1)),
                      className:
                        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                      children: '◀',
                    }),
                    u.jsx('h2', {
                      className: 'font-semibold',
                      children: s.toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                      }),
                    }),
                    u.jsx(ge, {
                      onClick: () =>
                        a(new Date(s.getFullYear(), s.getMonth() + 1, 1)),
                      className:
                        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                      children: '▶',
                    }),
                  ],
                }),
                u.jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    u.jsx(je, { children: l('calendar.warningDays') }),
                    u.jsx(Me, {
                      type: 'number',
                      min: 0,
                      value: r,
                      onChange: (S) => n(Number(S.target.value) || 0),
                      className: 'w-16',
                    }),
                  ],
                }),
              ],
            }),
            u.jsx('div', {
              className:
                'grid grid-cols-7 text-sm font-medium text-center mb-1',
              children: ud.map((S) =>
                u.jsx('div', { children: S.slice(0, 3) }, S),
              ),
            }),
            u.jsx('div', {
              className:
                'grid grid-cols-7 gap-px bg-neutral-200 rounded overflow-hidden',
              children: y.map((S) => {
                const g = d(S),
                  p = S.getMonth() === s.getMonth(),
                  v = e.filter((w) => w.dataInicial === g),
                  k = e.filter((w) => w.dataFinal === g && !w.devolvido);
                let b = p ? 'bg-white' : 'bg-neutral-50 text-neutral-400';
                const _ = k.map((w) =>
                  Math.ceil(
                    (new Date(w.dataFinal).getTime() - c.getTime()) / 864e5,
                  ),
                );
                return (
                  _.some((w) => w < 0)
                    ? (b += ' bg-red-100')
                    : _.some((w) => w <= r) && (b += ' bg-yellow-100'),
                  u.jsxs(
                    'div',
                    {
                      className: `min-h-24 p-1 cursor-pointer ${b}`,
                      onClick: () => m(g),
                      onDragStart: () => m(g),
                      draggable: !0,
                      children: [
                        u.jsx('div', {
                          className: 'text-xs text-right',
                          children: S.getDate(),
                        }),
                        v.map((w) => {
                          const N = Math.ceil(
                            (new Date(w.dataFinal).getTime() - c.getTime()) /
                              864e5,
                          );
                          let j = null;
                          return (
                            w.devolvido ||
                              (N < 0
                                ? (j = u.jsx('span', {
                                    className:
                                      'ml-1 text-[10px] px-1 rounded bg-red-600 text-white',
                                    children: l('calendar.overdue'),
                                  }))
                                : N <= r &&
                                  (j = u.jsx('span', {
                                    className:
                                      'ml-1 text-[10px] px-1 rounded bg-orange-500 text-white',
                                    children: l('calendar.dueIn', { diff: N }),
                                  }))),
                            u.jsxs(
                              'div',
                              {
                                className: 'text-[10px] truncate',
                                children: [vr(w.territorioId, t), j],
                              },
                              w.id,
                            )
                          );
                        }),
                      ],
                    },
                    g,
                  )
                );
              }),
            }),
          ],
        }),
        i &&
          u.jsx(Df, {
            children: u.jsxs('div', {
              className: 'grid gap-2',
              children: [
                u.jsx('h3', {
                  className: 'text-lg font-semibold',
                  children: wt(i),
                }),
                (() => {
                  const S = e.filter(
                    (g) => g.dataInicial === i || g.dataFinal === i,
                  );
                  return S.length === 0
                    ? u.jsx('p', {
                        className: 'text-sm text-neutral-500',
                        children: l('calendar.noAssignments'),
                      })
                    : u.jsx('ul', {
                        className: 'text-sm grid gap-1',
                        children: S.map((g) =>
                          u.jsxs(
                            'li',
                            {
                              children: [
                                vr(g.territorioId, t),
                                ' — ',
                                wt(g.dataInicial),
                                ' →',
                                wt(g.dataFinal),
                              ],
                            },
                            g.id,
                          ),
                        ),
                      });
                })(),
                u.jsx('div', {
                  className: 'text-right',
                  children: u.jsx(ge, {
                    onClick: x,
                    className:
                      'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                    children: l('app.close'),
                  }),
                }),
              ],
            }),
          }),
      ],
    });
  },
  no = 12,
  Xp = (e, t, r) => Math.min(Math.max(e, t), r),
  oS = ({
    steps: e,
    open: t,
    stepIndex: r,
    onNext: n,
    onPrevious: s,
    onClose: a,
  }) => {
    const { t: i } = Ue(),
      [o, l] = C.useState(null),
      [c, d] = C.useState(null),
      h = e.length,
      f = r >= h - 1,
      y = r <= 0,
      m = e[r],
      x = C.useMemo(
        () => () => {
          var w;
          if (!t) return;
          const S = (w = e[r]) == null ? void 0 : w.ref.current;
          if (!S) {
            (l(null), d(null));
            return;
          }
          const g = S.getBoundingClientRect(),
            p = {
              top: g.top - no,
              left: g.left - no,
              width: g.width + no * 2,
              height: g.height + no * 2,
            };
          l(p);
          const v = Math.min(320, window.innerWidth - 32),
            k = 16;
          let b = g.bottom + k;
          (b + 200 > window.innerHeight && (b = g.top - k - 200),
            (b = Xp(b, 16, Math.max(16, window.innerHeight - 216))));
          const _ = Xp(g.left, 16, window.innerWidth - v - 16);
          d({ top: b, left: _ });
        },
        [t, r, e],
      );
    return (
      C.useLayoutEffect(() => {
        if (!t) {
          (l(null), d(null));
          return;
        }
        return (
          x(),
          window.addEventListener('resize', x),
          window.addEventListener('scroll', x, !0),
          () => {
            (window.removeEventListener('resize', x),
              window.removeEventListener('scroll', x, !0));
          }
        );
      }, [t, x]),
      C.useEffect(() => {
        var g;
        if (!t) return;
        const S = (g = e[r]) == null ? void 0 : g.ref.current;
        (S &&
          S.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          }),
          x());
      }, [t, r, e, x]),
      C.useEffect(() => {
        if (!t) return;
        const S = (g) => {
          g.key === 'Escape' && (g.preventDefault(), a());
        };
        return (
          window.addEventListener('keydown', S),
          () => window.removeEventListener('keydown', S)
        );
      }, [t, a]),
      !t || h === 0
        ? null
        : Iy.createPortal(
            u.jsxs('div', {
              className: 'fixed inset-0 z-[1000]',
              children: [
                u.jsx('div', { className: 'absolute inset-0', onClick: a }),
                o &&
                  u.jsx('div', {
                    className:
                      'pointer-events-none fixed rounded-2xl border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] transition-all duration-150',
                    style: {
                      top: Math.max(o.top, 8),
                      left: Math.max(o.left, 8),
                      width: Math.max(o.width, 40),
                      height: Math.max(o.height, 40),
                    },
                  }),
                u.jsx('div', {
                  className:
                    'fixed inset-0 flex items-start justify-center overflow-hidden pointer-events-none',
                  children: u.jsx('div', {
                    className: 'relative w-full',
                    style: { maxWidth: '100%', height: '100%' },
                    children:
                      c &&
                      m &&
                      u.jsxs('div', {
                        className:
                          'pointer-events-auto fixed z-[1001] max-w-[320px] rounded-2xl bg-white p-4 text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-100',
                        style: { top: c.top, left: c.left },
                        children: [
                          u.jsx('div', {
                            className:
                              'mb-2 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400',
                            children: i('suggestions.tour.progress', {
                              current: r + 1,
                              total: h,
                            }),
                          }),
                          u.jsx('h3', {
                            className: 'text-lg font-semibold',
                            children: m.title,
                          }),
                          u.jsx('p', {
                            className:
                              'mt-1 text-sm text-neutral-600 dark:text-neutral-300',
                            children: m.description,
                          }),
                          u.jsxs('div', {
                            className: 'mt-4 flex flex-wrap gap-2',
                            children: [
                              u.jsx(ge, {
                                type: 'button',
                                onClick: s,
                                disabled: y,
                                className:
                                  'bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-50',
                                children: i('common.previous'),
                              }),
                              u.jsx(ge, {
                                type: 'button',
                                onClick: a,
                                className:
                                  'ml-auto bg-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-300',
                                children: i('app.close'),
                              }),
                              u.jsx(ge, {
                                type: 'button',
                                onClick: f ? a : n,
                                className:
                                  'bg-black text-white dark:bg-white dark:text-black',
                                children: i(
                                  f ? 'suggestions.tour.finish' : 'common.next',
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                  }),
                }),
              ],
            }),
            document.body,
          )
    );
  },
  lS = () => {
    const { territorios: e } = ua(),
      { saidas: t } = $l(),
      { designacoes: r, addDesignacao: n } = Ai(),
      [s, a] = Gv(),
      i = Rt(),
      { t: o } = Ue(),
      [l, c] = C.useState(() => gi()),
      [d, h] = C.useState(s.defaultDurationDays),
      [f, y] = C.useState(s.avoidLastAssignments),
      [m, x] = C.useState(s.avoidMonthsPerExit),
      [S, g] = C.useState(s.recentWeight),
      [p, v] = C.useState(s.balanceWeight),
      [k, b] = C.useState(null),
      [_, w] = C.useState({}),
      [N, j] = C.useState(null),
      T = C.useRef(null),
      D = C.useRef(null),
      V = C.useRef(null),
      F = C.useRef(null),
      B = C.useRef(null),
      ie = C.useRef(null),
      re = C.useMemo(
        () => [
          {
            ref: T,
            title: o('suggestions.labels.startDate'),
            description: o('suggestions.tooltips.startDate'),
          },
          {
            ref: D,
            title: o('suggestions.labels.duration'),
            description: o('suggestions.tooltips.duration'),
          },
          {
            ref: V,
            title: o('suggestions.labels.avoidCount'),
            description: o('suggestions.tooltips.avoidCount'),
          },
          {
            ref: F,
            title: o('suggestions.labels.monthsPerExit'),
            description: o('suggestions.tooltips.monthsPerExit'),
          },
          {
            ref: B,
            title: o('suggestions.labels.recentWeight'),
            description: o('suggestions.tooltips.recentWeight'),
          },
          {
            ref: ie,
            title: o('suggestions.labels.balanceWeight'),
            description: o('suggestions.tooltips.balanceWeight'),
          },
        ],
        [o],
      ),
      ae = N !== null,
      M = () => j(0),
      R = () => j(null),
      U = () => j((O) => (O === null ? O : O >= re.length - 1 ? null : O + 1)),
      K = () => j((O) => (O === null || O <= 0 ? O : O - 1)),
      ne = () => {
        if (e.length === 0 || t.length === 0) {
          (b([]), w({}));
          return;
        }
        const O = [],
          le = {},
          Ne = new Set(
            [...r]
              .sort((ze, Kt) => Kt.dataInicial.localeCompare(ze.dataInicial))
              .slice(0, f)
              .map((ze) => ze.territorioId),
          ),
          Qe = new Set(),
          me = t.map((ze) => ({
            id: ze.id,
            count: r.filter((Kt) => Kt.saidaId === ze.id).length,
          })),
          nt = Math.max(1, ...me.map((ze) => ze.count));
        ([...t]
          .sort((ze, Kt) => {
            var On, Wr;
            const Rn =
                ((On = me.find((Ln) => Ln.id === ze.id)) == null
                  ? void 0
                  : On.count) || 0,
              Dn =
                ((Wr = me.find((Ln) => Ln.id === Kt.id)) == null
                  ? void 0
                  : Wr.count) || 0;
            return Rn - Dn;
          })
          .forEach((ze) => {
            var Ln;
            const Kt =
                ((Ln = me.find((lt) => lt.id === ze.id)) == null
                  ? void 0
                  : Ln.count) || 0,
              Rn = (nt - Kt) / nt,
              Dn = new Date(`${l}T00:00:00`),
              On = e
                .filter((lt) => !Ne.has(lt.id) && !Qe.has(lt.id))
                .flatMap((lt) => {
                  const E = r
                    .filter(
                      (X) => X.territorioId === lt.id && X.saidaId === ze.id,
                    )
                    .map((X) => new Date(`${X.dataInicial}T00:00:00`))
                    .sort((X, be) => be.getTime() - X.getTime())[0];
                  if (
                    E &&
                    (Dn.getTime() - E.getTime()) / 1e3 / 60 / 60 / 24 / 30 < m
                  )
                    return [];
                  const P = Yv(lt.id, r),
                    L = P
                      ? Math.floor((Dn.getTime() - P.getTime()) / 864e5)
                      : Number.POSITIVE_INFINITY,
                    Z = P ? 1 / (L + 1) : 0,
                    q = p * Rn - S * Z,
                    H = [
                      o('suggestions.reasons.exitLoad', {
                        value: (Rn * 100).toFixed(0),
                      }),
                      P
                        ? o('suggestions.reasons.recent', {
                            value: (Z * 100).toFixed(0),
                          })
                        : o('suggestions.reasons.neverUsed'),
                    ];
                  return [{ territorioId: lt.id, score: q, reasons: H }];
                })
                .sort((lt, E) => E.score - lt.score);
            le[ze.id] = On;
            const Wr = On[0];
            if (Wr) {
              Qe.add(Wr.territorioId);
              const lt = jv(l, ze.diaDaSemana);
              O.push({
                saidaId: ze.id,
                territorioId: Wr.territorioId,
                dataInicial: lt,
                dataFinal: ol(lt, d),
              });
            }
          }),
          w(le),
          b(O));
      },
      fe = () => {
        if (!k || k.length === 0) {
          i.error(o('suggestions.toast.nothingToApply'));
          return;
        }
        (k.forEach(
          (O) =>
            void n({
              territorioId: O.territorioId,
              saidaId: O.saidaId,
              dataInicial: O.dataInicial,
              dataFinal: O.dataFinal,
              devolvido: !1,
            }),
        ),
          i.success(o('suggestions.toast.applied')));
      },
      A = () =>
        a({
          avoidLastAssignments: f,
          defaultDurationDays: d,
          avoidMonthsPerExit: m,
          recentWeight: S,
          balanceWeight: p,
        });
    return u.jsxs('div', {
      className: 'grid gap-4',
      children: [
        u.jsx(kt, {
          title: o('suggestions.cards.rules'),
          actions: u.jsxs(u.Fragment, {
            children: [
              u.jsx(ge, {
                onClick: M,
                className: 'bg-blue-600 text-white',
                children: o('suggestions.actions.viewTour'),
              }),
              u.jsx(ge, {
                onClick: A,
                className:
                  'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                children: o('suggestions.actions.saveDefaults'),
              }),
            ],
          }),
          children: u.jsxs('div', {
            className: 'grid md:grid-cols-6 gap-3',
            children: [
              u.jsxs('div', {
                ref: T,
                className: 'grid gap-1',
                children: [
                  u.jsx(je, {
                    htmlFor: 'suggestion-rule-startDate',
                    title: o('suggestions.tooltips.startDate'),
                    children: o('suggestions.labels.startDate'),
                  }),
                  u.jsx(Me, {
                    id: 'suggestion-rule-startDate',
                    type: 'date',
                    value: l,
                    onChange: (O) => c(O.target.value),
                  }),
                ],
              }),
              u.jsxs('div', {
                ref: D,
                className: 'grid gap-1',
                children: [
                  u.jsx(je, {
                    htmlFor: 'suggestion-rule-duration',
                    title: o('suggestions.tooltips.duration'),
                    children: o('suggestions.labels.duration'),
                  }),
                  u.jsx(Me, {
                    id: 'suggestion-rule-duration',
                    type: 'number',
                    min: 1,
                    value: d,
                    onChange: (O) => h(Number(O.target.value) || 1),
                  }),
                ],
              }),
              u.jsxs('div', {
                ref: V,
                className: 'grid gap-1',
                children: [
                  u.jsx(je, {
                    htmlFor: 'suggestion-rule-avoidCount',
                    title: o('suggestions.tooltips.avoidCount'),
                    children: o('suggestions.labels.avoidCount'),
                  }),
                  u.jsx(Me, {
                    id: 'suggestion-rule-avoidCount',
                    type: 'number',
                    min: 0,
                    value: f,
                    onChange: (O) => y(Number(O.target.value) || 0),
                  }),
                ],
              }),
              u.jsxs('div', {
                ref: F,
                className: 'grid gap-1',
                children: [
                  u.jsx(je, {
                    htmlFor: 'suggestion-rule-monthsPerExit',
                    title: o('suggestions.tooltips.monthsPerExit'),
                    children: o('suggestions.labels.monthsPerExit'),
                  }),
                  u.jsx(Me, {
                    id: 'suggestion-rule-monthsPerExit',
                    type: 'number',
                    min: 0,
                    value: m,
                    onChange: (O) => x(Number(O.target.value) || 0),
                  }),
                ],
              }),
              u.jsxs('div', {
                ref: B,
                className: 'grid gap-1',
                children: [
                  u.jsx(je, {
                    htmlFor: 'suggestion-rule-recentWeight',
                    title: o('suggestions.tooltips.recentWeight'),
                    children: o('suggestions.labels.recentWeight'),
                  }),
                  u.jsx(Me, {
                    id: 'suggestion-rule-recentWeight',
                    type: 'number',
                    min: 0,
                    step: '0.1',
                    value: S,
                    onChange: (O) => g(Number(O.target.value) || 0),
                  }),
                ],
              }),
              u.jsxs('div', {
                ref: ie,
                className: 'grid gap-1',
                children: [
                  u.jsx(je, {
                    htmlFor: 'suggestion-rule-balanceWeight',
                    title: o('suggestions.tooltips.balanceWeight'),
                    children: o('suggestions.labels.balanceWeight'),
                  }),
                  u.jsx(Me, {
                    id: 'suggestion-rule-balanceWeight',
                    type: 'number',
                    min: 0,
                    step: '0.1',
                    value: p,
                    onChange: (O) => v(Number(O.target.value) || 0),
                  }),
                ],
              }),
              u.jsx('div', {
                className: 'flex items-end',
                children: u.jsx(ge, {
                  onClick: ne,
                  className: 'bg-black text-white w-full',
                  children: o('suggestions.actions.generate'),
                }),
              }),
            ],
          }),
        }),
        u.jsx(oS, {
          steps: re,
          open: ae,
          stepIndex: N ?? 0,
          onClose: R,
          onNext: U,
          onPrevious: K,
        }),
        u.jsx(kt, {
          title: o('suggestions.cards.generated'),
          actions:
            k &&
            k.length > 0 &&
            u.jsx(ge, {
              onClick: fe,
              className: 'bg-green-600 text-white',
              children: o('suggestions.actions.applyAll'),
            }),
          children:
            k === null
              ? u.jsx('p', {
                  className: 'text-neutral-500',
                  children: o('suggestions.messages.waiting'),
                })
              : k.length === 0
                ? u.jsx('p', {
                    className: 'text-neutral-500',
                    children: o('suggestions.messages.empty'),
                  })
                : u.jsxs('div', {
                    className: 'grid gap-4',
                    children: [
                      u.jsx('div', {
                        className: 'overflow-x-auto',
                        children: u.jsxs('table', {
                          className: 'w-full text-sm',
                          children: [
                            u.jsx('thead', {
                              children: u.jsxs('tr', {
                                className: 'text-left border-b',
                                children: [
                                  u.jsx('th', {
                                    className: 'py-2',
                                    children: o('suggestions.table.exit'),
                                  }),
                                  u.jsx('th', {
                                    children: o('suggestions.table.territory'),
                                  }),
                                  u.jsx('th', {
                                    children: o('suggestions.table.start'),
                                  }),
                                  u.jsx('th', {
                                    children: o('suggestions.table.end'),
                                  }),
                                ],
                              }),
                            }),
                            u.jsx('tbody', {
                              children: k.map((O, le) =>
                                u.jsxs(
                                  'tr',
                                  {
                                    className: 'border-b last:border-0',
                                    children: [
                                      u.jsx('td', {
                                        className: 'py-2',
                                        children: vr(O.saidaId, t),
                                      }),
                                      u.jsx('td', {
                                        children: vr(O.territorioId, e),
                                      }),
                                      u.jsx('td', {
                                        children: wt(O.dataInicial),
                                      }),
                                      u.jsx('td', {
                                        children: wt(O.dataFinal),
                                      }),
                                    ],
                                  },
                                  O.saidaId + O.territorioId + le,
                                ),
                              ),
                            }),
                          ],
                        }),
                      }),
                      u.jsx('div', {
                        className: 'grid md:grid-cols-2 gap-4',
                        children: Object.entries(_).map(([O, le]) =>
                          u.jsxs(
                            'div',
                            {
                              className: 'border rounded-xl p-3',
                              children: [
                                u.jsx('h4', {
                                  className: 'font-semibold mb-2',
                                  children: vr(O, t),
                                }),
                                u.jsx('ol', {
                                  className:
                                    'list-decimal ml-4 space-y-1 text-sm',
                                  children: le.map((Ne) =>
                                    u.jsxs(
                                      'li',
                                      {
                                        children: [
                                          vr(Ne.territorioId, e),
                                          ' - ',
                                          Ne.score.toFixed(2),
                                          u.jsx('span', {
                                            className: 'block text-neutral-500',
                                            children: Ne.reasons.join(' | '),
                                          }),
                                        ],
                                      },
                                      Ne.territorioId,
                                    ),
                                  ),
                                }),
                              ],
                            },
                            O,
                          ),
                        ),
                      }),
                    ],
                  }),
        }),
      ],
    });
  },
  uS = () => {
    var a;
    const { state: e, dispatch: t } = Pn(),
      r = Rt(),
      n = k_(e),
      s = ((a = e.auth.currentUser) == null ? void 0 : a.id) ?? '';
    return {
      registros: n,
      addNaoEmCasa: C.useCallback(
        async (i) => {
          const o = {
            id: oa(),
            completedAt: i.completedAt ?? null,
            conversationConfirmed: i.conversationConfirmed ?? !1,
            ...i,
            publisherId: s,
          };
          return (
            await wn.add(o),
            t({ type: 'ADD_NAO_EM_CASA', payload: o }),
            r.success('Retorno agendado'),
            o
          );
        },
        [s, t, r],
      ),
      updateNaoEmCasa: C.useCallback(
        async (i, o) => {
          const l = n.find((d) => d.id === i);
          if (!l) return;
          const c = {
            ...l,
            ...o,
            id: i,
            conversationConfirmed:
              o.conversationConfirmed ?? l.conversationConfirmed ?? !1,
          };
          return (
            await wn.add(c),
            t({ type: 'UPDATE_NAO_EM_CASA', payload: c }),
            r.success('Registro atualizado'),
            c
          );
        },
        [t, n, r],
      ),
      removeNaoEmCasa: C.useCallback(
        async (i) => {
          (await wn.remove(i),
            t({ type: 'REMOVE_NAO_EM_CASA', payload: i }),
            r.success('Registro removido'));
        },
        [t, r],
      ),
    };
  },
  cS = 120,
  dS = (e) => {
    if (!e) return 'other';
    const t = e.toLowerCase();
    return t.includes('comer') ||
      t.includes('negócio') ||
      t.includes('business')
      ? 'commercial'
      : t.includes('resi') || t.includes('casa') || t.includes('home')
        ? 'residential'
        : 'other';
  },
  em = (e, t) => {
    if (e == null && t == null) return '—';
    if (e != null && t != null) return e === t ? String(e) : `${e} – ${t}`;
    const r = e ?? t;
    return r != null ? String(r) : '—';
  },
  fS = (e, t) =>
    t.id !== void 0
      ? `id:${t.id}`
      : `combo:${e}:${t.streetId}:${t.numberStart}:${t.numberEnd}`,
  hS = (e, t) => {
    const r = new Map();
    for (const s of e) {
      const a = s.address.streetId,
        i = a != null ? `id:${a}` : `name:${s.streetName ?? t}`,
        o = s.streetName ?? t,
        l = r.get(i);
      l ? l.addresses.push(s) : r.set(i, { key: i, name: o, addresses: [s] });
    }
    const n = Array.from(r.values()).sort((s, a) =>
      s.name.localeCompare(a.name, void 0, { sensitivity: 'base' }),
    );
    return (
      n.forEach((s) => {
        s.addresses.sort((a, i) => {
          const o =
              a.address.numberStart ??
              a.address.numberEnd ??
              Number.POSITIVE_INFINITY,
            l =
              i.address.numberStart ??
              i.address.numberEnd ??
              Number.POSITIVE_INFINITY;
          if (o !== l) return o - l;
          const c =
              a.address.numberEnd ??
              a.address.numberStart ??
              Number.POSITIVE_INFINITY,
            d =
              i.address.numberEnd ??
              i.address.numberStart ??
              Number.POSITIVE_INFINITY;
          return c - d;
        });
      }),
      n
    );
  },
  pS = () => {
    const { territorios: e } = ua(),
      { designacoes: t } = Ai(),
      { registros: r, addNaoEmCasa: n, updateNaoEmCasa: s } = uS(),
      { t: a } = Ue(),
      i = C.useMemo(() => gi(), []),
      o = C.useMemo(
        () => a('naoEmCasa.confirmConversation', { date: wt(i) }),
        [a, i],
      ),
      l = C.useMemo(
        () =>
          t.filter(
            (N) => N.dataInicial <= i && N.dataFinal >= i && !N.devolvido,
          ),
        [t, i],
      ),
      c = C.useMemo(
        () => Array.from(new Set(l.map((N) => N.territorioId))),
        [l],
      ),
      d = C.useMemo(
        () =>
          c.map((N) => e.find((j) => j.id === N)).filter((N) => N !== void 0),
        [c, e],
      ),
      [h, f] = C.useState([]),
      y = C.useMemo(() => {
        const N = new Map();
        return (
          h.forEach((j) => {
            j.id !== void 0 && N.set(j.id, j);
          }),
          N
        );
      }, [h]),
      [m, x] = C.useState({});
    (C.useEffect(() => {
      let N = !0;
      return (
        (async () => {
          const T = await I.propertyTypes.toArray();
          N && f(T);
        })(),
        () => {
          N = !1;
        }
      );
    }, []),
      C.useEffect(() => {
        let N = !1;
        return (
          (async () => {
            if (c.length === 0) {
              N || x({});
              return;
            }
            const T = await Promise.all(
              c.map(async (D) => {
                const V = await I.streets
                    .where('territoryId')
                    .equals(D)
                    .toArray(),
                  F = V.map((ie) => ie.id).filter((ie) => ie !== void 0),
                  B =
                    F.length > 0
                      ? await I.addresses.where('streetId').anyOf(F).toArray()
                      : [];
                return [D, { streets: V, addresses: B }];
              }),
            );
            N || x(Object.fromEntries(T));
          })(),
          () => {
            N = !0;
          }
        );
      }, [c]));
    const S = C.useMemo(() => r.filter((N) => !N.completedAt), [r]),
      g = C.useMemo(() => {
        const N = new Map();
        return (
          S.forEach((j) => {
            const T =
              j.addressId != null
                ? `id:${j.addressId}`
                : `combo:${j.territorioId}:${j.streetId ?? ''}:${j.numberStart ?? ''}:${j.numberEnd ?? ''}`;
            N.set(T, j);
          }),
          N
        );
      }, [S]),
      p = C.useCallback(
        (N) => {
          const j = m[N];
          return j
            ? j.addresses.map((T) => {
                var F;
                const D = j.streets.find((B) => B.id === T.streetId),
                  V =
                    ((F = y.get(T.propertyTypeId)) == null ? void 0 : F.name) ??
                    null;
                return {
                  address: T,
                  streetName: (D == null ? void 0 : D.name) ?? null,
                  propertyTypeName: V,
                  category: dS(V),
                };
              })
            : [];
        },
        [m, y],
      ),
      v = C.useCallback(
        async (N, j, T) => {
          const D = ol(i, cS),
            { address: V, streetName: F, propertyTypeName: B } = j;
          if (T) {
            await s(T.id, {
              territorioId: N,
              addressId: V.id ?? null,
              streetId: V.streetId,
              streetName: F,
              numberStart: V.numberStart,
              numberEnd: V.numberEnd,
              propertyTypeId: V.propertyTypeId,
              propertyTypeName: B,
              recordedAt: i,
              followUpAt: D,
              completedAt: null,
              conversationConfirmed: !1,
            });
            return;
          }
          await n({
            territorioId: N,
            addressId: V.id ?? null,
            streetId: V.streetId,
            streetName: F,
            numberStart: V.numberStart,
            numberEnd: V.numberEnd,
            propertyTypeId: V.propertyTypeId,
            propertyTypeName: B,
            recordedAt: i,
            followUpAt: D,
            completedAt: null,
            conversationConfirmed: !1,
          });
        },
        [n, i, s],
      ),
      k = C.useCallback(
        async (N, j) => {
          await s(N.id, { conversationConfirmed: j });
        },
        [s],
      ),
      b = C.useCallback(
        async (N) => {
          const j = gi();
          await s(N.id, { completedAt: j, conversationConfirmed: !0 });
        },
        [s],
      ),
      _ = C.useMemo(
        () => [...S].sort((N, j) => N.followUpAt.localeCompare(j.followUpAt)),
        [S],
      ),
      w = C.useCallback(
        (N) => {
          var j;
          return (
            ((j = e.find((T) => T.id === N)) == null ? void 0 : j.nome) ?? N
          );
        },
        [e],
      );
    return u.jsxs('div', {
      className: 'grid gap-4',
      children: [
        u.jsx(kt, {
          title: a('naoEmCasa.todayAssignments', { count: d.length }),
          children:
            d.length === 0
              ? u.jsx('p', {
                  className: 'text-neutral-500',
                  children: a('naoEmCasa.noAssignments'),
                })
              : u.jsx('div', {
                  className: 'grid gap-6',
                  children: d.map((N) => {
                    const j = p(N.id),
                      T = a('naoEmCasa.unknownStreet'),
                      D = hS(j, T);
                    return u.jsx(
                      'div',
                      {
                        className: 'flex flex-col gap-4',
                        children: u.jsxs('div', {
                          className: 'flex flex-col md:flex-row gap-4',
                          children: [
                            u.jsx('div', {
                              className: 'md:w-64',
                              children:
                                N.imagem || N.imageUrl
                                  ? u.jsx('img', {
                                      src: N.imagem || N.imageUrl,
                                      alt: a('naoEmCasa.miniMapAlt', {
                                        name: N.nome,
                                      }),
                                      className:
                                        'w-full rounded-lg border object-cover',
                                    })
                                  : u.jsx('div', {
                                      className:
                                        'h-40 w-full rounded-lg border grid place-items-center text-sm text-neutral-500',
                                      children: a('naoEmCasa.noImage'),
                                    }),
                            }),
                            u.jsxs('div', {
                              className: 'flex-1 overflow-x-auto',
                              children: [
                                u.jsx('h3', {
                                  className: 'text-lg font-semibold mb-2',
                                  children: N.nome,
                                }),
                                j.length === 0
                                  ? u.jsx('p', {
                                      className: 'text-neutral-500',
                                      children: a('naoEmCasa.noAddresses'),
                                    })
                                  : u.jsx('div', {
                                      className: 'grid gap-3',
                                      children: D.map((V) =>
                                        u.jsxs(
                                          'details',
                                          {
                                            className:
                                              'rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-700',
                                            children: [
                                              u.jsxs('summary', {
                                                className:
                                                  'flex cursor-pointer select-none items-center justify-between gap-2 px-4 py-3 font-medium text-neutral-800 dark:text-neutral-300',
                                                children: [
                                                  u.jsx('span', {
                                                    children: V.name,
                                                  }),
                                                  u.jsx('span', {
                                                    className:
                                                      'text-sm text-neutral-500 dark:text-neutral-400',
                                                    children: a(
                                                      'naoEmCasa.streetAddresses',
                                                      {
                                                        count:
                                                          V.addresses.length,
                                                      },
                                                    ),
                                                  }),
                                                ],
                                              }),
                                              u.jsx('div', {
                                                className:
                                                  'border-t border-neutral-200 dark:border-neutral-700',
                                                children: V.addresses.map(
                                                  (F) => {
                                                    const { address: B } = F,
                                                      ie = fS(N.id, B),
                                                      re = g.get(ie),
                                                      ae =
                                                        (re == null
                                                          ? void 0
                                                          : re.conversationConfirmed) ??
                                                        !1,
                                                      M =
                                                        F.category ===
                                                        'residential'
                                                          ? a(
                                                              'naoEmCasa.residential',
                                                            )
                                                          : F.category ===
                                                              'commercial'
                                                            ? a(
                                                                'naoEmCasa.commercial',
                                                              )
                                                            : a(
                                                                'naoEmCasa.other',
                                                              ),
                                                      R = em(
                                                        B.numberStart,
                                                        B.numberEnd,
                                                      ),
                                                      U = ae;
                                                    return u.jsxs(
                                                      'div',
                                                      {
                                                        className:
                                                          'flex flex-col gap-3 border-b border-neutral-200 px-4 py-3 last:border-b-0 dark:border-neutral-700',
                                                        children: [
                                                          u.jsxs('div', {
                                                            className:
                                                              'flex flex-col gap-1',
                                                            children: [
                                                              u.jsx('p', {
                                                                className:
                                                                  'font-medium text-neutral-800 dark:text-neutral-200',
                                                                children: a(
                                                                  'naoEmCasa.addressLabel',
                                                                  {
                                                                    street:
                                                                      F.streetName ??
                                                                      a(
                                                                        'naoEmCasa.unknownStreet',
                                                                      ),
                                                                    range: R,
                                                                  },
                                                                ),
                                                              }),
                                                              u.jsxs('p', {
                                                                className:
                                                                  'text-sm text-neutral-500 dark:text-neutral-400',
                                                                children: [
                                                                  u.jsx(
                                                                    'span',
                                                                    {
                                                                      children:
                                                                        F.propertyTypeName ??
                                                                        a(
                                                                          'naoEmCasa.unknownType',
                                                                        ),
                                                                    },
                                                                  ),
                                                                  u.jsx(
                                                                    'span',
                                                                    {
                                                                      className:
                                                                        'ml-2 text-xs text-neutral-400 dark:text-neutral-300',
                                                                      children:
                                                                        M,
                                                                    },
                                                                  ),
                                                                ],
                                                              }),
                                                              re &&
                                                                u.jsx('p', {
                                                                  className:
                                                                    'text-xs text-neutral-500 dark:text-neutral-400',
                                                                  children: a(
                                                                    'naoEmCasa.scheduledFor',
                                                                    {
                                                                      date: wt(
                                                                        re.followUpAt,
                                                                      ),
                                                                    },
                                                                  ),
                                                                }),
                                                              ae &&
                                                                u.jsx('p', {
                                                                  className:
                                                                    'text-xs font-medium text-green-600 dark:text-green-400',
                                                                  children: a(
                                                                    'naoEmCasa.conversationConfirmedLabel',
                                                                  ),
                                                                }),
                                                            ],
                                                          }),
                                                          u.jsxs('div', {
                                                            className:
                                                              'flex flex-col gap-3 md:flex-row md:items-center md:justify-between',
                                                            children: [
                                                              u.jsxs('label', {
                                                                className: `flex items-center gap-2 text-sm ${re ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-500'}`,
                                                                children: [
                                                                  u.jsx(
                                                                    'input',
                                                                    {
                                                                      type: 'checkbox',
                                                                      className:
                                                                        'h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500',
                                                                      disabled:
                                                                        !re,
                                                                      checked:
                                                                        ae,
                                                                      onChange:
                                                                        (K) =>
                                                                          re &&
                                                                          k(
                                                                            re,
                                                                            K
                                                                              .target
                                                                              .checked,
                                                                          ),
                                                                    },
                                                                  ),
                                                                  o,
                                                                ],
                                                              }),
                                                              u.jsx(ge, {
                                                                type: 'button',
                                                                className:
                                                                  'bg-blue-600 text-white disabled:cursor-not-allowed disabled:opacity-60',
                                                                disabled: U,
                                                                onClick: () =>
                                                                  v(
                                                                    N.id,
                                                                    F,
                                                                    re,
                                                                  ),
                                                                children: a(
                                                                  'naoEmCasa.recordNotAtHome',
                                                                ),
                                                              }),
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      ie,
                                                    );
                                                  },
                                                ),
                                              }),
                                            ],
                                          },
                                          V.key,
                                        ),
                                      ),
                                    }),
                              ],
                            }),
                          ],
                        }),
                      },
                      N.id,
                    );
                  }),
                }),
        }),
        u.jsx(kt, {
          title: a('naoEmCasa.followUpsTitle', { count: _.length }),
          children:
            _.length === 0
              ? u.jsx('p', {
                  className: 'text-neutral-500',
                  children: a('naoEmCasa.noFollowUps'),
                })
              : u.jsx('ul', {
                  className: 'grid gap-3',
                  children: _.map((N) => {
                    const j = N.streetName ?? a('naoEmCasa.unknownStreet'),
                      T = em(N.numberStart ?? null, N.numberEnd ?? null),
                      D = N.propertyTypeName ?? a('naoEmCasa.unknownType');
                    return u.jsxs(
                      'li',
                      {
                        className:
                          'flex flex-col gap-3 rounded-xl border p-3 md:flex-row md:items-center md:justify-between',
                        children: [
                          u.jsxs('div', {
                            className: 'flex-1',
                            children: [
                              u.jsx('p', {
                                className: 'font-medium',
                                children: w(N.territorioId),
                              }),
                              u.jsx('p', {
                                className: 'text-sm text-neutral-600',
                                children: a('naoEmCasa.addressLabel', {
                                  street: j,
                                  range: T,
                                }),
                              }),
                              u.jsx('p', {
                                className: 'text-sm text-neutral-500',
                                children: D,
                              }),
                              u.jsx('p', {
                                className: 'text-sm text-neutral-600',
                                children: a('naoEmCasa.followUpOn', {
                                  date: wt(N.followUpAt),
                                }),
                              }),
                              u.jsx('p', {
                                className: 'text-xs text-neutral-400',
                                children: a('naoEmCasa.recordedOn', {
                                  date: wt(N.recordedAt),
                                }),
                              }),
                            ],
                          }),
                          u.jsx(ge, {
                            type: 'button',
                            onClick: () => b(N),
                            className: 'bg-green-600 text-white self-start',
                            children: a('naoEmCasa.markCompleted'),
                          }),
                        ],
                      },
                      N.id,
                    );
                  }),
                }),
        }),
      ],
    });
  },
  mS = () => {
    const { state: e, dispatch: t } = Pn(),
      r = Rt(),
      { t: n } = Ue(),
      s = N_(e);
    return {
      users: s,
      addUser: C.useCallback(
        async (a) => {
          const i = new Date().toISOString(),
            o = a.password.trim();
          if (!o) throw new Error('PASSWORD_REQUIRED');
          const l = await qs(o),
            { password: c, ...d } = a,
            h = { id: oa(), createdAt: i, updatedAt: i, passwordHash: l, ...d };
          return (
            await Yt.add(h),
            t({ type: 'ADD_USER', payload: h }),
            r.success(n('users.toast.createSuccess')),
            h
          );
        },
        [t, n, r],
      ),
      updateUser: C.useCallback(
        async (a, i) => {
          var m;
          const o = s.find((x) => x.id === a),
            l = (o == null ? void 0 : o.createdAt) ?? new Date().toISOString(),
            c = (m = i.password) == null ? void 0 : m.trim(),
            d =
              c && c.length > 0
                ? await qs(c)
                : ((o == null ? void 0 : o.passwordHash) ?? ''),
            { password: h, ...f } = i,
            y = {
              id: a,
              createdAt: l,
              updatedAt: new Date().toISOString(),
              passwordHash: d,
              ...f,
            };
          return (
            await Yt.update(y),
            t({ type: 'UPDATE_USER', payload: y }),
            r.success(n('users.toast.updateSuccess')),
            y
          );
        },
        [t, n, r, s],
      ),
      removeUser: C.useCallback(
        async (a) => {
          (await Yt.remove(a),
            t({ type: 'REMOVE_USER', payload: a }),
            r.success(n('users.toast.deleteSuccess')));
        },
        [t, n, r],
      ),
    };
  },
  tm = 'viewer',
  gS = () => {
    const { t: e } = Ue(),
      t = la(),
      r = Rt(),
      { users: n, addUser: s, updateUser: a, removeUser: i } = mS(),
      [o, l] = C.useState(null),
      [c, d] = C.useState(''),
      [h, f] = C.useState(''),
      [y, m] = C.useState(tm),
      [x, S] = C.useState(''),
      [g, p] = C.useState(''),
      [v, k] = C.useState(!1),
      b = C.useMemo(
        () =>
          [...n].sort((T, D) =>
            T.name.localeCompare(D.name, void 0, { sensitivity: 'base' }),
          ),
        [n],
      ),
      _ = () => {
        (l(null), d(''), f(''), m(tm), S(''), p(''), k(!1));
      },
      w = async (T) => {
        T.preventDefault();
        const D = c.trim(),
          V = h.trim(),
          F = x.trim(),
          B = g.trim();
        if (D) {
          if (o) {
            if (F || B) {
              if (!F || !B) {
                r.error(e('users.form.passwordMismatch'));
                return;
              }
              if (F !== B) {
                r.error(e('users.form.passwordMismatch'));
                return;
              }
            }
          } else {
            if (!F) {
              r.error(e('users.form.passwordRequired'));
              return;
            }
            if (F !== B) {
              r.error(e('users.form.passwordMismatch'));
              return;
            }
          }
          try {
            (k(!0),
              o
                ? await a(o, {
                    name: D,
                    email: V,
                    role: y,
                    password: F || void 0,
                  })
                : await s({ name: D, email: V, role: y, password: F }),
              _());
          } catch (ie) {
            if (ie instanceof Error && ie.message === 'PASSWORD_REQUIRED') {
              r.error(e('users.form.passwordRequired'));
              return;
            }
            (console.error('Failed to save user', ie),
              r.error(e('users.toast.saveError')));
          } finally {
            k(!1);
          }
        }
      },
      N = (T) => {
        (l(T.id), d(T.name), f(T.email), m(T.role), S(''), p(''));
      },
      j = async (T) => {
        (await t(e('users.confirmDelete', { name: T.name }))) &&
          (await i(T.id), o === T.id && _());
      };
    return u.jsxs('div', {
      className: 'grid gap-4',
      children: [
        u.jsx(kt, {
          title: e(o ? 'users.form.editTitle' : 'users.form.createTitle'),
          children: u.jsxs('form', {
            onSubmit: w,
            className: 'grid gap-3 md:grid-cols-6',
            children: [
              u.jsxs('div', {
                className: 'grid gap-1 md:col-span-2',
                children: [
                  u.jsx(je, {
                    htmlFor: 'user-name',
                    children: e('users.form.name'),
                  }),
                  u.jsx(Me, {
                    id: 'user-name',
                    value: c,
                    onChange: (T) => d(T.target.value),
                    placeholder: e('users.form.namePlaceholder'),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1 md:col-span-2',
                children: [
                  u.jsx(je, {
                    htmlFor: 'user-email',
                    children: e('users.form.email'),
                  }),
                  u.jsx(Me, {
                    id: 'user-email',
                    type: 'email',
                    value: h,
                    onChange: (T) => f(T.target.value),
                    placeholder: e('users.form.emailPlaceholder'),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1 md:col-span-2',
                children: [
                  u.jsx(je, {
                    htmlFor: 'user-role',
                    children: e('users.form.role'),
                  }),
                  u.jsx('select', {
                    id: 'user-role',
                    value: y,
                    onChange: (T) => m(T.target.value),
                    className:
                      'w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900',
                    children: xv.map((T) =>
                      u.jsx(
                        'option',
                        { value: T, children: e(`users.roles.${T}`) },
                        T,
                      ),
                    ),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1 md:col-span-3',
                children: [
                  u.jsx(je, {
                    htmlFor: 'user-password',
                    children: e('users.form.password'),
                  }),
                  u.jsx(Me, {
                    id: 'user-password',
                    type: 'password',
                    value: x,
                    onChange: (T) => S(T.target.value),
                    placeholder: e('users.form.passwordPlaceholder'),
                    autoComplete: 'new-password',
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'grid gap-1 md:col-span-3',
                children: [
                  u.jsx(je, {
                    htmlFor: 'user-password-confirm',
                    children: e('users.form.passwordConfirmation'),
                  }),
                  u.jsx(Me, {
                    id: 'user-password-confirm',
                    type: 'password',
                    value: g,
                    onChange: (T) => p(T.target.value),
                    placeholder: e(
                      'users.form.passwordConfirmationPlaceholder',
                    ),
                    autoComplete: 'new-password',
                  }),
                  u.jsx('p', {
                    className: 'text-xs text-neutral-500',
                    children: e('users.form.passwordHint'),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: 'flex items-end justify-end gap-2 md:col-span-6',
                children: [
                  o &&
                    u.jsx(ge, {
                      type: 'button',
                      className:
                        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                      onClick: _,
                      children: e('users.form.cancel'),
                    }),
                  u.jsx(ge, {
                    type: 'submit',
                    className: 'bg-black text-white',
                    disabled: v,
                    children: e(o ? 'users.form.update' : 'users.form.save'),
                  }),
                ],
              }),
            ],
          }),
        }),
        u.jsx(kt, {
          title: e('users.listTitle', { count: n.length }),
          children:
            b.length === 0
              ? u.jsx('p', {
                  className: 'text-neutral-500',
                  children: e('users.empty'),
                })
              : u.jsx('div', {
                  className: 'grid gap-3',
                  children: b.map((T) =>
                    u.jsxs(
                      'div',
                      {
                        className:
                          'rounded-xl border p-3 flex flex-col gap-3 bg-white dark:bg-neutral-900 md:flex-row md:items-center md:justify-between',
                        children: [
                          u.jsxs('div', {
                            children: [
                              u.jsx('p', {
                                className: 'font-semibold',
                                children: T.name,
                              }),
                              u.jsx('p', {
                                className: 'text-sm text-neutral-600',
                                children: T.email
                                  ? T.email
                                  : e('users.noEmail'),
                              }),
                              u.jsx('p', {
                                className: 'text-sm text-neutral-500',
                                children: e(`users.roles.${T.role}`),
                              }),
                            ],
                          }),
                          u.jsxs('div', {
                            className: 'flex gap-2',
                            children: [
                              u.jsx(ge, {
                                type: 'button',
                                className:
                                  'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
                                onClick: () => N(T),
                                children: e('users.actions.edit'),
                              }),
                              u.jsx(ge, {
                                type: 'button',
                                className: 'bg-red-50 text-red-700',
                                onClick: () => {
                                  j(T);
                                },
                                children: e('users.actions.delete'),
                              }),
                            ],
                          }),
                        ],
                      },
                      T.id,
                    ),
                  ),
                }),
        }),
      ],
    });
  },
  yS = () => {
    const { t: e } = Ue(),
      { designacoes: t } = Ai(),
      { territorios: r } = ua(),
      { saidas: n } = $l(),
      s = C.useMemo(() => gi(), []),
      a = C.useMemo(
        () =>
          t
            .filter(
              (i) => i.dataInicial <= s && i.dataFinal >= s && !i.devolvido,
            )
            .map((i) => ({
              designacao: i,
              territoryName: vr(i.territorioId, r),
              exitName: vr(i.saidaId, n),
            }))
            .sort((i, o) =>
              i.territoryName.localeCompare(o.territoryName, void 0, {
                sensitivity: 'base',
              }),
            ),
        [t, n, r, s],
      );
    return u.jsx('div', {
      className: 'grid gap-4',
      children: u.jsx(kt, {
        title: e('viewerAssignments.title'),
        children: u.jsxs('div', {
          className: 'grid gap-4',
          children: [
            u.jsx('p', {
              className: 'text-sm text-neutral-600 dark:text-neutral-300',
              children: e('viewerAssignments.currentDate', { date: wt(s) }),
            }),
            a.length === 0
              ? u.jsx('p', {
                  className: 'text-sm text-neutral-500 dark:text-neutral-400',
                  children: e('viewerAssignments.empty'),
                })
              : u.jsxs('div', {
                  className: 'grid gap-3',
                  children: [
                    u.jsx('p', {
                      className:
                        'text-sm text-neutral-600 dark:text-neutral-300',
                      children: e('viewerAssignments.summary', {
                        count: a.length,
                      }),
                    }),
                    u.jsx('ul', {
                      className: 'grid gap-3',
                      children: a.map(
                        ({ designacao: i, territoryName: o, exitName: l }) =>
                          u.jsx(
                            'li',
                            {
                              className:
                                'rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 shadow-sm',
                              children: u.jsxs('div', {
                                className:
                                  'flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between',
                                children: [
                                  u.jsxs('div', {
                                    className: 'grid gap-1',
                                    children: [
                                      u.jsx('span', {
                                        className:
                                          'font-medium text-neutral-900 dark:text-neutral-100',
                                        children: o,
                                      }),
                                      u.jsx('span', {
                                        className:
                                          'text-sm text-neutral-600 dark:text-neutral-300',
                                        children: e(
                                          'viewerAssignments.assignmentRange',
                                          {
                                            start: wt(i.dataInicial),
                                            end: wt(i.dataFinal),
                                          },
                                        ),
                                      }),
                                    ],
                                  }),
                                  u.jsxs('div', {
                                    className:
                                      'grid gap-1 text-sm text-neutral-600 dark:text-neutral-300 text-left sm:text-right',
                                    children: [
                                      l !== '—' &&
                                        u.jsx('span', {
                                          children: e(
                                            'viewerAssignments.exitLabel',
                                            { name: l },
                                          ),
                                        }),
                                      u.jsx('span', {
                                        children: e(
                                          'viewerAssignments.returnBy',
                                          { date: wt(i.dataFinal) },
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            i.id,
                          ),
                      ),
                    }),
                  ],
                }),
          ],
        }),
      }),
    });
  },
  rm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  vS = (e) => {
    const t = (e == null ? void 0 : e.trim().toLowerCase()) ?? '';
    if (!t) return null;
    for (const [, r] of Av)
      if (r.allowedRoles.some((n) => n.toLowerCase() === t)) return r.path;
    return null;
  },
  nm = { name: '', email: '', password: '' },
  xS = () => {
    const { t: e } = Ue(),
      { dispatch: t } = Pn(),
      r = Rt(),
      { currentUser: n } = Nr(),
      s = Dy(),
      a = Ry(),
      i = s.state ?? void 0,
      [o, l] = C.useState(nm),
      [c, d] = C.useState({}),
      [h, f] = C.useState(!1);
    C.useEffect(() => {
      if (!n) return;
      const S = vS(n.role);
      S && a(S, { replace: !0 });
    }, [n, a]);
    const y = C.useMemo(
        () =>
          i != null && i.from
            ? e('register.redirectMessage', { from: i.from })
            : null,
        [i == null ? void 0 : i.from, e],
      ),
      m = async (S) => {
        if ((S.preventDefault(), h)) return;
        d({});
        const g = o.name.trim(),
          p = o.email.trim(),
          v = o.password.trim(),
          k = {};
        if (
          (g || (k.name = e('register.errors.nameRequired')),
          rm.test(p) || (k.email = e('register.errors.emailInvalid')),
          v.length < 6 &&
            (k.password = e('register.errors.passwordLength', { min: 6 })),
          Object.keys(k).length > 0)
        ) {
          d(k);
          return;
        }
        f(!0);
        try {
          const b = p.toLowerCase();
          if (await Yt.findByEmail(b)) {
            d({ email: e('register.errors.emailTaken') });
            return;
          }
          const w = await qs(v),
            N = new Date().toISOString(),
            j = {
              id: oa(),
              name: g,
              email: b,
              role: 'viewer',
              passwordHash: w,
              createdAt: N,
              updatedAt: N,
            };
          (await Yt.add(j), t({ type: 'ADD_USER', payload: j }));
          const T = { id: j.id, role: j.role, createdAt: N, updatedAt: N };
          (t({ type: 'SIGN_IN', payload: T }),
            r.success(e('register.success')),
            d({}),
            l(nm));
        } catch (b) {
          (console.error('Failed to register user', b),
            d({ general: e('register.errors.generic') }),
            r.error(e('register.errors.generic')));
        } finally {
          f(!1);
        }
      },
      x =
        o.name.trim().length > 0 &&
        rm.test(o.email.trim()) &&
        o.password.trim().length >= 6 &&
        !h;
    return u.jsx('section', {
      className: 'mx-auto flex w-full max-w-xl flex-col gap-6 py-10',
      children: u.jsx(kt, {
        title: e('register.title'),
        children: u.jsxs('form', {
          className: 'space-y-4',
          onSubmit: m,
          noValidate: !0,
          children: [
            u.jsx('p', {
              className: 'text-sm text-neutral-600 dark:text-neutral-300',
              children: e('register.subtitle'),
            }),
            y
              ? u.jsx('p', {
                  className:
                    'rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200',
                  children: y,
                })
              : null,
            u.jsxs('div', {
              className: 'space-y-1',
              children: [
                u.jsx(je, {
                  htmlFor: 'register-name',
                  children: e('register.fields.name'),
                }),
                u.jsx(Me, {
                  id: 'register-name',
                  value: o.name,
                  onChange: (S) => l((g) => ({ ...g, name: S.target.value })),
                  autoComplete: 'name',
                  required: !0,
                  disabled: h,
                }),
                c.name
                  ? u.jsx('p', {
                      className: 'text-sm text-red-600',
                      children: c.name,
                    })
                  : null,
              ],
            }),
            u.jsxs('div', {
              className: 'space-y-1',
              children: [
                u.jsx(je, {
                  htmlFor: 'register-email',
                  children: e('register.fields.email'),
                }),
                u.jsx(Me, {
                  id: 'register-email',
                  type: 'email',
                  value: o.email,
                  onChange: (S) => l((g) => ({ ...g, email: S.target.value })),
                  autoComplete: 'email',
                  inputMode: 'email',
                  required: !0,
                  disabled: h,
                }),
                c.email
                  ? u.jsx('p', {
                      className: 'text-sm text-red-600',
                      children: c.email,
                    })
                  : null,
              ],
            }),
            u.jsxs('div', {
              className: 'space-y-1',
              children: [
                u.jsx(je, {
                  htmlFor: 'register-password',
                  children: e('register.fields.password'),
                }),
                u.jsx(Me, {
                  id: 'register-password',
                  type: 'password',
                  value: o.password,
                  onChange: (S) =>
                    l((g) => ({ ...g, password: S.target.value })),
                  autoComplete: 'new-password',
                  minLength: 6,
                  required: !0,
                  disabled: h,
                }),
                c.password
                  ? u.jsx('p', {
                      className: 'text-sm text-red-600',
                      children: c.password,
                    })
                  : null,
              ],
            }),
            c.general
              ? u.jsx('p', {
                  className: 'text-sm text-red-600',
                  children: c.general,
                })
              : null,
            u.jsxs('div', {
              className:
                'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between',
              children: [
                u.jsx(ge, {
                  type: 'submit',
                  disabled: !x,
                  className:
                    'bg-emerald-500 text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50',
                  children: e(h ? 'register.submitting' : 'register.submit'),
                }),
                u.jsxs('span', {
                  className: 'text-sm text-neutral-600 dark:text-neutral-300',
                  children: [
                    e('register.alreadyHaveAccount'),
                    ' ',
                    e('register.signInHint'),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  wS = (e) => {
    const t = (r) => r.toString().padStart(2, '0');
    return [
      e.getFullYear(),
      t(e.getMonth() + 1),
      t(e.getDate()),
      t(e.getHours()),
      t(e.getMinutes()),
      t(e.getSeconds()),
    ].join('');
  },
  bS = async (e) => {
    const [t, r, n, s, a, i, o] = await Promise.all([
        ur.forPublisher(e),
        vn.forPublisher(e),
        Fr.forPublisher(e),
        mi.forPublisher(e),
        wn.forPublisher(e),
        xn.forPublisher(e),
        Yt.all(),
      ]),
      [l, c, d, h, f, y] = await Promise.all([
        I.streets.toArray(),
        I.propertyTypes.toArray(),
        I.addresses.toArray(),
        I.derivedTerritories.toArray(),
        I.derivedTerritoryAddresses.toArray(),
        I.metadata.toArray(),
      ]);
    return {
      version: Zs,
      exportedAt: new Date().toISOString(),
      territorios: t,
      saidas: r,
      designacoes: n,
      sugestoes: s,
      naoEmCasa: a,
      buildingsVillages: i,
      users: o,
      streets: l,
      propertyTypes: c,
      addresses: d,
      derivedTerritories: h,
      derivedTerritoryAddresses: f,
      metadata: y,
    };
  },
  _S = (e) => {
    const t = new Blob([e], { type: 'application/json' }),
      r = URL.createObjectURL(t),
      n = document.createElement('a'),
      s = wS(new Date());
    ((n.href = r),
      (n.download = `assigna-export-${s}.json`),
      document.body.appendChild(n),
      n.click(),
      document.body.removeChild(n),
      URL.revokeObjectURL(r));
  },
  kS = async (e) => {
    if (!e) throw new Error('Publisher ID is required to export data');
    const t = await bS(e),
      r = JSON.stringify(t, null, 2);
    _S(r);
  },
  SS = rt({
    id: W(),
    nome: W(),
    publisherId: W().optional().default(''),
    imagem: W().optional(),
    imageUrl: W().optional(),
  }),
  NS = rt({
    id: W(),
    nome: W(),
    diaDaSemana: Ye(),
    hora: W(),
    publisherId: W().optional().default(''),
  }),
  ES = rt({
    id: W(),
    territorioId: W(),
    saidaId: W(),
    dataInicial: W(),
    dataFinal: W(),
    publisherId: W().optional().default(''),
    devolvido: Wv().optional(),
  }),
  jS = rt({
    territorioId: W(),
    saidaId: W(),
    dataInicial: W(),
    dataFinal: W(),
    publisherId: W().optional().default(''),
  }),
  Jv = gl(pi),
  CS = rt({
    id: W(),
    status: Jv,
    sent_at: W().nullable().optional().default(null),
    notes: W().nullable().optional().default(null),
  }),
  TS = rt({
    id: W(),
    territory_id: W(),
    publisherId: W().optional().default(''),
    name: W().nullable(),
    address_line: W().nullable(),
    type: W().nullable(),
    number: W().nullable(),
    residences_count: Ye().nullable(),
    modality: W().nullable(),
    reception_type: W().nullable(),
    responsible: W().nullable(),
    contact_method: W().nullable().optional().default(null),
    letter_status: Jv.nullable().optional().default(null),
    letter_history: mt(CS).optional().default([]),
    assigned_at: W().nullable(),
    returned_at: W().nullable(),
    block: W().nullable(),
    notes: W().nullable(),
    created_at: W().nullable(),
  }),
  AS = rt({ id: Ye(), territoryId: W(), name: W() }),
  IS = rt({ id: Ye(), name: W() }),
  PS = rt({
    id: Ye(),
    streetId: Ye(),
    numberStart: Ye(),
    numberEnd: Ye(),
    propertyTypeId: Ye(),
  }),
  RS = rt({
    id: W(),
    territorioId: W(),
    publisherId: W().optional().default(''),
    addressId: Ye().nullable().optional(),
    streetId: Ye().nullable().optional(),
    streetName: W().nullable().optional(),
    numberStart: Ye().nullable().optional(),
    numberEnd: Ye().nullable().optional(),
    propertyTypeId: Ye().nullable().optional(),
    propertyTypeName: W().nullable().optional(),
    recordedAt: W(),
    followUpAt: W(),
    completedAt: W().nullable().optional(),
    conversationConfirmed: Wv().optional().default(!1),
  }),
  DS = rt({ id: Ye(), baseTerritoryId: W(), name: W() }),
  OS = rt({ derivedTerritoryId: Ye(), addressId: Ye() }),
  LS = rt({
    id: W(),
    name: W(),
    email: W(),
    role: gl(xv),
    passwordHash: W().optional().default(''),
    createdAt: W(),
    updatedAt: W(),
  }),
  MS = rt({ key: W(), value: Ye() }),
  VS = rt({
    version: Ye().optional(),
    exportedAt: W().optional(),
    territorios: mt(SS).optional().default([]),
    saidas: mt(NS).optional().default([]),
    designacoes: mt(ES).optional().default([]),
    sugestoes: mt(jS).optional().default([]),
    buildingsVillages: mt(TS).optional().default([]),
    streets: mt(AS).optional().default([]),
    propertyTypes: mt(IS).optional().default([]),
    addresses: mt(PS).optional().default([]),
    naoEmCasa: mt(RS).optional().default([]),
    derivedTerritories: mt(DS).optional().default([]),
    derivedTerritoryAddresses: mt(OS).optional().default([]),
    metadata: mt(MS).optional().default([]),
    users: mt(LS).optional().default([]),
  }).transform((e) => ({
    ...e,
    territorios: e.territorios ?? [],
    saidas: e.saidas ?? [],
    designacoes: e.designacoes ?? [],
    sugestoes: e.sugestoes ?? [],
    buildingsVillages: e.buildingsVillages ?? [],
    streets: e.streets ?? [],
    propertyTypes: e.propertyTypes ?? [],
    addresses: e.addresses ?? [],
    naoEmCasa: e.naoEmCasa ?? [],
    derivedTerritories: e.derivedTerritories ?? [],
    derivedTerritoryAddresses: e.derivedTerritoryAddresses ?? [],
    metadata: e.metadata ?? [],
    users: e.users ?? [],
  })),
  FS = async (e) => (typeof e == 'string' ? e : e.text()),
  $S = (e) => {
    const t = e.metadata.filter((r) => r.key !== 'schemaVersion');
    return (t.push({ key: 'schemaVersion', value: Zs }), t);
  },
  US = async (e) => {
    const t = await FS(e);
    let r;
    try {
      r = JSON.parse(t);
    } catch {
      throw new Error('INVALID_JSON');
    }
    let n;
    try {
      n = VS.parse(r);
    } catch (a) {
      throw a instanceof kr ? new Error('INVALID_EXPORT_DATA') : a;
    }
    const s = $S(n);
    return (
      await I.transaction(
        'rw',
        [
          I.territorios,
          I.saidas,
          I.designacoes,
          I.sugestoes,
          I.buildingsVillages,
          I.naoEmCasa,
          I.users,
          I.streets,
          I.propertyTypes,
          I.addresses,
          I.derivedTerritories,
          I.derivedTerritoryAddresses,
          I.metadata,
        ],
        async () => {
          (await Promise.all([
            ur.clear(),
            vn.clear(),
            Fr.clear(),
            mi.clear(),
            xn.clear(),
            wn.clear(),
            Yt.clear(),
            I.streets.clear(),
            I.propertyTypes.clear(),
            I.addresses.clear(),
            I.derivedTerritories.clear(),
            I.derivedTerritoryAddresses.clear(),
            I.metadata.clear(),
          ]),
            n.territorios.length > 0 && (await ur.bulkAdd(n.territorios)),
            n.saidas.length > 0 && (await vn.bulkAdd(n.saidas)),
            n.designacoes.length > 0 && (await Fr.bulkAdd(n.designacoes)),
            n.sugestoes.length > 0 && (await mi.bulkAdd(n.sugestoes)),
            n.naoEmCasa.length > 0 && (await wn.bulkAdd(n.naoEmCasa)),
            n.buildingsVillages.length > 0 &&
              (await xn.bulkAdd(n.buildingsVillages)),
            n.users.length > 0 && (await Yt.bulkAdd(n.users)),
            n.streets.length > 0 && (await I.streets.bulkPut(n.streets)),
            n.propertyTypes.length > 0 &&
              (await I.propertyTypes.bulkPut(n.propertyTypes)),
            n.addresses.length > 0 && (await I.addresses.bulkPut(n.addresses)),
            n.derivedTerritories.length > 0 &&
              (await I.derivedTerritories.bulkPut(n.derivedTerritories)),
            n.derivedTerritoryAddresses.length > 0 &&
              (await I.derivedTerritoryAddresses.bulkPut(
                n.derivedTerritoryAddresses,
              )),
            await I.metadata.bulkPut(s));
        },
      ),
      await If(),
      { ...n, metadata: s, version: Zs }
    );
  },
  zS = () => {
    const e = Dy(),
      { currentUser: t } = Nr(),
      r = e.state ?? void 0,
      n =
        (r == null ? void 0 : r.reason) ??
        (t ? 'unauthorized' : 'unauthenticated'),
      s = {
        unauthenticated: {
          title: 'Faça login para continuar',
          description:
            'Entre com uma conta autorizada usando os controles no topo da página.',
        },
        unauthorized: {
          title: 'Acesso não permitido',
          description:
            'Sua conta atual não possui permissão para acessar esta seção.',
        },
      };
    return u.jsxs('section', {
      className:
        'flex flex-col items-center justify-center gap-4 py-24 text-center',
      children: [
        u.jsxs('div', {
          className: 'max-w-lg space-y-3',
          children: [
            u.jsx('h2', {
              className: 'text-2xl font-semibold',
              children: s[n].title,
            }),
            u.jsx('p', {
              className: 'text-neutral-600 dark:text-neutral-300',
              children: s[n].description,
            }),
            r != null && r.from
              ? u.jsxs('p', {
                  className: 'text-sm text-neutral-500',
                  children: ['Rota solicitada: ', r.from],
                })
              : null,
            t
              ? u.jsxs('p', {
                  className: 'text-xs uppercase tracking-wide text-neutral-500',
                  children: ['Usuário atual: ', t.id, ' · ', t.role],
                })
              : null,
          ],
        }),
        u.jsx(My, {
          to: '/',
          className:
            'rounded-xl px-3 py-2 border bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700 transition',
          children: 'Voltar para o início',
        }),
      ],
    });
  },
  Xv = '/unauthorized',
  ex = Tv.register,
  sm = ia.toLowerCase(),
  BS = {
    territories: Kk,
    streets: Wk,
    buildingsVillages: Qk,
    letters: Xk,
    exits: eS,
    assignments: sS,
    users: gS,
    todayAssignments: yS,
    calendar: iS,
    suggestions: lS,
    notAtHome: pS,
  },
  KS = ({ component: e, allowedRoles: t, currentRole: r, path: n }) => {
    const s = (r == null ? void 0 : r.toLowerCase()) ?? null,
      a = s !== null && t.some((i) => i.toLowerCase() === s);
    return s === null
      ? u.jsx(Dc, {
          to: ex,
          replace: !0,
          state: { from: n, reason: 'unauthenticated' },
        })
      : a
        ? u.jsx(e, {})
        : u.jsx(Dc, {
            to: Xv,
            replace: !0,
            state: { from: n, reason: 'unauthorized' },
          });
  },
  HS = () => {
    const { dispatch: e } = Pn(),
      t = Rt(),
      r = la(),
      { t: n } = Ue(),
      s = C.useRef(null),
      { currentUser: a } = Nr(),
      i = async () => {
        try {
          if (!(a != null && a.id)) {
            (t.error(n('app.exportError')),
              console.error(
                'Exportação falhou: nenhum publicador autenticado.',
              ));
            return;
          }
          (await kS(a.id), t.success(n('app.exportSuccess')));
        } catch (d) {
          (console.error(n('app.exportError'), d),
            t.error(n('app.exportError')));
        }
      },
      o = () => {
        var d;
        (d = s.current) == null || d.click();
      },
      l = async (d) => {
        var f;
        const h = (f = d.target.files) == null ? void 0 : f[0];
        if (h)
          try {
            const y = await US(h);
            (e({ type: 'SET_TERRITORIOS', payload: y.territorios }),
              e({ type: 'SET_SAIDAS', payload: y.saidas }),
              e({ type: 'SET_DESIGNACOES', payload: y.designacoes }),
              e({ type: 'SET_SUGESTOES', payload: y.sugestoes }),
              e({ type: 'SET_NAO_EM_CASA', payload: y.naoEmCasa }),
              e({ type: 'SET_USERS', payload: y.users }),
              t.success(n('app.importSuccess')));
          } catch (y) {
            (console.error(n('app.importError'), y),
              t.error(n('app.importError')));
          } finally {
            d.target.value = '';
          }
      },
      c = async () => {
        if (await r(n('app.clearConfirm')))
          try {
            (await Promise.all([
              ur.clear(),
              vn.clear(),
              Fr.clear(),
              mi.clear(),
              wn.clear(),
              Yt.clear(),
              xn.clear(),
              I.streets.clear(),
              I.propertyTypes.clear(),
              I.addresses.clear(),
              I.derivedTerritories.clear(),
              I.derivedTerritoryAddresses.clear(),
              I.naoEmCasa.clear(),
              I.metadata.clear(),
            ]),
              await wv(),
              await I.metadata.put({ key: 'schemaVersion', value: Zs }),
              e({ type: 'RESET_STATE' }),
              t.success(n('app.clearSuccess')));
          } catch (d) {
            (console.error(n('app.clearError'), d),
              t.error(n('app.clearError')));
          }
      };
    return u.jsxs('div', {
      className: 'flex flex-col items-end gap-2',
      children: [
        u.jsx('input', {
          ref: s,
          type: 'file',
          accept: 'application/json,application/*+json',
          onChange: l,
          className: 'hidden',
        }),
        u.jsxs('div', {
          className: 'flex flex-wrap justify-end gap-2',
          children: [
            u.jsx(ge, {
              onClick: i,
              className:
                'mt-4 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
              children: 'Exportar',
            }),
            u.jsx(ge, {
              onClick: o,
              className:
                'mt-4 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700',
              children: 'Importar',
            }),
            u.jsx(ge, {
              onClick: c,
              className: 'mt-4 bg-red-600 text-white',
              children: 'Limpar TODOS os dados',
            }),
          ],
        }),
      ],
    });
  },
  WS = () => {
    const { currentUser: e } = Nr(),
      t = (e == null ? void 0 : e.role) ?? null,
      r = (t == null ? void 0 : t.toLowerCase()) ?? null,
      n = r === sm,
      s = r === sm;
    return u.jsxs(W_, {
      children: [
        u.jsxs(Mw, {
          children: [
            u.jsx(Qi, { path: ex, element: u.jsx(xS, {}) }),
            Av.map(([a, i]) => {
              const o = BS[a];
              return u.jsx(
                Qi,
                {
                  path: i.path,
                  element: u.jsx(KS, {
                    component: o,
                    allowedRoles: i.allowedRoles,
                    currentRole: t,
                    path: i.path,
                  }),
                },
                a,
              );
            }),
            u.jsx(Qi, { path: Xv, element: u.jsx(zS, {}) }),
            u.jsx(Qi, {
              path: '*',
              element: u.jsx(Dc, { to: '/', replace: !0 }),
            }),
          ],
        }),
        n && u.jsx(j_, {}),
        s && u.jsx(HS, {}),
      ],
    });
  };
function qS() {
  return u.jsx(Nv, { children: u.jsx(Lw, { children: u.jsx(WS, {}) }) });
}
const ue = (e) => typeof e == 'string',
  ba = () => {
    let e, t;
    const r = new Promise((n, s) => {
      ((e = n), (t = s));
    });
    return ((r.resolve = e), (r.reject = t), r);
  },
  am = (e) => (e == null ? '' : '' + e),
  ZS = (e, t, r) => {
    e.forEach((n) => {
      t[n] && (r[n] = t[n]);
    });
  },
  QS = /###/g,
  im = (e) => (e && e.indexOf('###') > -1 ? e.replace(QS, '.') : e),
  om = (e) => !e || ue(e),
  Ba = (e, t, r) => {
    const n = ue(t) ? t.split('.') : t;
    let s = 0;
    for (; s < n.length - 1; ) {
      if (om(e)) return {};
      const a = im(n[s]);
      (!e[a] && r && (e[a] = new r()),
        Object.prototype.hasOwnProperty.call(e, a) ? (e = e[a]) : (e = {}),
        ++s);
    }
    return om(e) ? {} : { obj: e, k: im(n[s]) };
  },
  lm = (e, t, r) => {
    const { obj: n, k: s } = Ba(e, t, Object);
    if (n !== void 0 || t.length === 1) {
      n[s] = r;
      return;
    }
    let a = t[t.length - 1],
      i = t.slice(0, t.length - 1),
      o = Ba(e, i, Object);
    for (; o.obj === void 0 && i.length; )
      ((a = `${i[i.length - 1]}.${a}`),
        (i = i.slice(0, i.length - 1)),
        (o = Ba(e, i, Object)),
        o != null &&
          o.obj &&
          typeof o.obj[`${o.k}.${a}`] < 'u' &&
          (o.obj = void 0));
    o.obj[`${o.k}.${a}`] = r;
  },
  GS = (e, t, r, n) => {
    const { obj: s, k: a } = Ba(e, t, Object);
    ((s[a] = s[a] || []), s[a].push(r));
  },
  yl = (e, t) => {
    const { obj: r, k: n } = Ba(e, t);
    if (r && Object.prototype.hasOwnProperty.call(r, n)) return r[n];
  },
  YS = (e, t, r) => {
    const n = yl(e, r);
    return n !== void 0 ? n : yl(t, r);
  },
  tx = (e, t, r) => {
    for (const n in t)
      n !== '__proto__' &&
        n !== 'constructor' &&
        (n in e
          ? ue(e[n]) ||
            e[n] instanceof String ||
            ue(t[n]) ||
            t[n] instanceof String
            ? r && (e[n] = t[n])
            : tx(e[n], t[n], r)
          : (e[n] = t[n]));
    return e;
  },
  hs = (e) => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
var JS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};
const XS = (e) => (ue(e) ? e.replace(/[&<>"'\/]/g, (t) => JS[t]) : e);
class e1 {
  constructor(t) {
    ((this.capacity = t),
      (this.regExpMap = new Map()),
      (this.regExpQueue = []));
  }
  getRegExp(t) {
    const r = this.regExpMap.get(t);
    if (r !== void 0) return r;
    const n = new RegExp(t);
    return (
      this.regExpQueue.length === this.capacity &&
        this.regExpMap.delete(this.regExpQueue.shift()),
      this.regExpMap.set(t, n),
      this.regExpQueue.push(t),
      n
    );
  }
}
const t1 = [' ', ',', '?', '!', ';'],
  r1 = new e1(20),
  n1 = (e, t, r) => {
    ((t = t || ''), (r = r || ''));
    const n = t1.filter((i) => t.indexOf(i) < 0 && r.indexOf(i) < 0);
    if (n.length === 0) return !0;
    const s = r1.getRegExp(
      `(${n.map((i) => (i === '?' ? '\\?' : i)).join('|')})`,
    );
    let a = !s.test(e);
    if (!a) {
      const i = e.indexOf(r);
      i > 0 && !s.test(e.substring(0, i)) && (a = !0);
    }
    return a;
  },
  wd = (e, t, r = '.') => {
    if (!e) return;
    if (e[t]) return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
    const n = t.split(r);
    let s = e;
    for (let a = 0; a < n.length; ) {
      if (!s || typeof s != 'object') return;
      let i,
        o = '';
      for (let l = a; l < n.length; ++l)
        if ((l !== a && (o += r), (o += n[l]), (i = s[o]), i !== void 0)) {
          if (
            ['string', 'number', 'boolean'].indexOf(typeof i) > -1 &&
            l < n.length - 1
          )
            continue;
          a += l - a + 1;
          break;
        }
      s = i;
    }
    return s;
  },
  xi = (e) => (e == null ? void 0 : e.replace('_', '-')),
  s1 = {
    type: 'logger',
    log(e) {
      this.output('log', e);
    },
    warn(e) {
      this.output('warn', e);
    },
    error(e) {
      this.output('error', e);
    },
    output(e, t) {
      var r, n;
      (n =
        (r = console == null ? void 0 : console[e]) == null
          ? void 0
          : r.apply) == null || n.call(r, console, t);
    },
  };
class vl {
  constructor(t, r = {}) {
    this.init(t, r);
  }
  init(t, r = {}) {
    ((this.prefix = r.prefix || 'i18next:'),
      (this.logger = t || s1),
      (this.options = r),
      (this.debug = r.debug));
  }
  log(...t) {
    return this.forward(t, 'log', '', !0);
  }
  warn(...t) {
    return this.forward(t, 'warn', '', !0);
  }
  error(...t) {
    return this.forward(t, 'error', '');
  }
  deprecate(...t) {
    return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0);
  }
  forward(t, r, n, s) {
    return s && !this.debug
      ? null
      : (ue(t[0]) && (t[0] = `${n}${this.prefix} ${t[0]}`), this.logger[r](t));
  }
  create(t) {
    return new vl(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options,
    });
  }
  clone(t) {
    return (
      (t = t || this.options),
      (t.prefix = t.prefix || this.prefix),
      new vl(this.logger, t)
    );
  }
}
var xr = new vl();
class Ul {
  constructor() {
    this.observers = {};
  }
  on(t, r) {
    return (
      t.split(' ').forEach((n) => {
        this.observers[n] || (this.observers[n] = new Map());
        const s = this.observers[n].get(r) || 0;
        this.observers[n].set(r, s + 1);
      }),
      this
    );
  }
  off(t, r) {
    if (this.observers[t]) {
      if (!r) {
        delete this.observers[t];
        return;
      }
      this.observers[t].delete(r);
    }
  }
  emit(t, ...r) {
    (this.observers[t] &&
      Array.from(this.observers[t].entries()).forEach(([s, a]) => {
        for (let i = 0; i < a; i++) s(...r);
      }),
      this.observers['*'] &&
        Array.from(this.observers['*'].entries()).forEach(([s, a]) => {
          for (let i = 0; i < a; i++) s.apply(s, [t, ...r]);
        }));
  }
}
class um extends Ul {
  constructor(t, r = { ns: ['translation'], defaultNS: 'translation' }) {
    (super(),
      (this.data = t || {}),
      (this.options = r),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0));
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const r = this.options.ns.indexOf(t);
    r > -1 && this.options.ns.splice(r, 1);
  }
  getResource(t, r, n, s = {}) {
    var c, d;
    const a =
        s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator,
      i =
        s.ignoreJSONStructure !== void 0
          ? s.ignoreJSONStructure
          : this.options.ignoreJSONStructure;
    let o;
    t.indexOf('.') > -1
      ? (o = t.split('.'))
      : ((o = [t, r]),
        n &&
          (Array.isArray(n)
            ? o.push(...n)
            : ue(n) && a
              ? o.push(...n.split(a))
              : o.push(n)));
    const l = yl(this.data, o);
    return (
      !l &&
        !r &&
        !n &&
        t.indexOf('.') > -1 &&
        ((t = o[0]), (r = o[1]), (n = o.slice(2).join('.'))),
      l || !i || !ue(n)
        ? l
        : wd(
            (d = (c = this.data) == null ? void 0 : c[t]) == null
              ? void 0
              : d[r],
            n,
            a,
          )
    );
  }
  addResource(t, r, n, s, a = { silent: !1 }) {
    const i =
      a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let o = [t, r];
    (n && (o = o.concat(i ? n.split(i) : n)),
      t.indexOf('.') > -1 && ((o = t.split('.')), (s = r), (r = o[1])),
      this.addNamespaces(r),
      lm(this.data, o, s),
      a.silent || this.emit('added', t, r, n, s));
  }
  addResources(t, r, n, s = { silent: !1 }) {
    for (const a in n)
      (ue(n[a]) || Array.isArray(n[a])) &&
        this.addResource(t, r, a, n[a], { silent: !0 });
    s.silent || this.emit('added', t, r, n);
  }
  addResourceBundle(t, r, n, s, a, i = { silent: !1, skipCopy: !1 }) {
    let o = [t, r];
    (t.indexOf('.') > -1 && ((o = t.split('.')), (s = n), (n = r), (r = o[1])),
      this.addNamespaces(r));
    let l = yl(this.data, o) || {};
    (i.skipCopy || (n = JSON.parse(JSON.stringify(n))),
      s ? tx(l, n, a) : (l = { ...l, ...n }),
      lm(this.data, o, l),
      i.silent || this.emit('added', t, r, n));
  }
  removeResourceBundle(t, r) {
    (this.hasResourceBundle(t, r) && delete this.data[t][r],
      this.removeNamespaces(r),
      this.emit('removed', t, r));
  }
  hasResourceBundle(t, r) {
    return this.getResource(t, r) !== void 0;
  }
  getResourceBundle(t, r) {
    return (r || (r = this.options.defaultNS), this.getResource(t, r));
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const r = this.getDataByLanguage(t);
    return !!((r && Object.keys(r)) || []).find(
      (s) => r[s] && Object.keys(r[s]).length > 0,
    );
  }
  toJSON() {
    return this.data;
  }
}
var rx = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, r, n, s) {
    return (
      e.forEach((a) => {
        var i;
        t =
          ((i = this.processors[a]) == null ? void 0 : i.process(t, r, n, s)) ??
          t;
      }),
      t
    );
  },
};
const nx = Symbol('i18next/PATH_KEY');
function a1() {
  const e = [],
    t = Object.create(null);
  let r;
  return (
    (t.get = (n, s) => {
      var a;
      return (
        (a = r == null ? void 0 : r.revoke) == null || a.call(r),
        s === nx ? e : (e.push(s), (r = Proxy.revocable(n, t)), r.proxy)
      );
    }),
    Proxy.revocable(Object.create(null), t).proxy
  );
}
function bd(e, t) {
  const { [nx]: r } = e(a1());
  return r.join((t == null ? void 0 : t.keySeparator) ?? '.');
}
const cm = {},
  dm = (e) => !ue(e) && typeof e != 'boolean' && typeof e != 'number';
class xl extends Ul {
  constructor(t, r = {}) {
    (super(),
      ZS(
        [
          'resourceStore',
          'languageUtils',
          'pluralResolver',
          'interpolator',
          'backendConnector',
          'i18nFormat',
          'utils',
        ],
        t,
        this,
      ),
      (this.options = r),
      this.options.keySeparator === void 0 && (this.options.keySeparator = '.'),
      (this.logger = xr.create('translator')));
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t, r = { interpolation: {} }) {
    const n = { ...r };
    if (t == null) return !1;
    const s = this.resolve(t, n);
    return (s == null ? void 0 : s.res) !== void 0;
  }
  extractFromKey(t, r) {
    let n = r.nsSeparator !== void 0 ? r.nsSeparator : this.options.nsSeparator;
    n === void 0 && (n = ':');
    const s =
      r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let a = r.ns || this.options.defaultNS || [];
    const i = n && t.indexOf(n) > -1,
      o =
        !this.options.userDefinedKeySeparator &&
        !r.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !r.nsSeparator &&
        !n1(t, n, s);
    if (i && !o) {
      const l = t.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0) return { key: t, namespaces: ue(a) ? [a] : a };
      const c = t.split(n);
      ((n !== s || (n === s && this.options.ns.indexOf(c[0]) > -1)) &&
        (a = c.shift()),
        (t = c.join(s)));
    }
    return { key: t, namespaces: ue(a) ? [a] : a };
  }
  translate(t, r, n) {
    let s = typeof r == 'object' ? { ...r } : r;
    if (
      (typeof s != 'object' &&
        this.options.overloadTranslationOptionHandler &&
        (s = this.options.overloadTranslationOptionHandler(arguments)),
      typeof s == 'object' && (s = { ...s }),
      s || (s = {}),
      t == null)
    )
      return '';
    (typeof t == 'function' && (t = bd(t, { ...this.options, ...s })),
      Array.isArray(t) || (t = [String(t)]));
    const a =
        s.returnDetails !== void 0
          ? s.returnDetails
          : this.options.returnDetails,
      i =
        s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator,
      { key: o, namespaces: l } = this.extractFromKey(t[t.length - 1], s),
      c = l[l.length - 1];
    let d = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
    d === void 0 && (d = ':');
    const h = s.lng || this.language,
      f = s.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((h == null ? void 0 : h.toLowerCase()) === 'cimode')
      return f
        ? a
          ? {
              res: `${c}${d}${o}`,
              usedKey: o,
              exactUsedKey: o,
              usedLng: h,
              usedNS: c,
              usedParams: this.getUsedParamsDetails(s),
            }
          : `${c}${d}${o}`
        : a
          ? {
              res: o,
              usedKey: o,
              exactUsedKey: o,
              usedLng: h,
              usedNS: c,
              usedParams: this.getUsedParamsDetails(s),
            }
          : o;
    const y = this.resolve(t, s);
    let m = y == null ? void 0 : y.res;
    const x = (y == null ? void 0 : y.usedKey) || o,
      S = (y == null ? void 0 : y.exactUsedKey) || o,
      g = ['[object Number]', '[object Function]', '[object RegExp]'],
      p = s.joinArrays !== void 0 ? s.joinArrays : this.options.joinArrays,
      v = !this.i18nFormat || this.i18nFormat.handleAsObject,
      k = s.count !== void 0 && !ue(s.count),
      b = xl.hasDefaultValue(s),
      _ = k ? this.pluralResolver.getSuffix(h, s.count, s) : '',
      w =
        s.ordinal && k
          ? this.pluralResolver.getSuffix(h, s.count, { ordinal: !1 })
          : '',
      N = k && !s.ordinal && s.count === 0,
      j =
        (N && s[`defaultValue${this.options.pluralSeparator}zero`]) ||
        s[`defaultValue${_}`] ||
        s[`defaultValue${w}`] ||
        s.defaultValue;
    let T = m;
    v && !m && b && (T = j);
    const D = dm(T),
      V = Object.prototype.toString.apply(T);
    if (v && T && D && g.indexOf(V) < 0 && !(ue(p) && Array.isArray(T))) {
      if (!s.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            'accessing an object - but returnObjects options is not enabled!',
          );
        const F = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(x, T, { ...s, ns: l })
          : `key '${o} (${this.language})' returned an object instead of string.`;
        return a
          ? ((y.res = F), (y.usedParams = this.getUsedParamsDetails(s)), y)
          : F;
      }
      if (i) {
        const F = Array.isArray(T),
          B = F ? [] : {},
          ie = F ? S : x;
        for (const re in T)
          if (Object.prototype.hasOwnProperty.call(T, re)) {
            const ae = `${ie}${i}${re}`;
            (b && !m
              ? (B[re] = this.translate(ae, {
                  ...s,
                  defaultValue: dm(j) ? j[re] : void 0,
                  joinArrays: !1,
                  ns: l,
                }))
              : (B[re] = this.translate(ae, { ...s, joinArrays: !1, ns: l })),
              B[re] === ae && (B[re] = T[re]));
          }
        m = B;
      }
    } else if (v && ue(p) && Array.isArray(m))
      ((m = m.join(p)), m && (m = this.extendTranslation(m, t, s, n)));
    else {
      let F = !1,
        B = !1;
      (!this.isValidLookup(m) && b && ((F = !0), (m = j)),
        this.isValidLookup(m) || ((B = !0), (m = o)));
      const re =
          (s.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          B
            ? void 0
            : m,
        ae = b && j !== m && this.options.updateMissing;
      if (B || F || ae) {
        if (
          (this.logger.log(
            ae ? 'updateKey' : 'missingKey',
            h,
            c,
            o,
            ae ? j : m,
          ),
          i)
        ) {
          const K = this.resolve(o, { ...s, keySeparator: !1 });
          K &&
            K.res &&
            this.logger.warn(
              'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.',
            );
        }
        let M = [];
        const R = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          s.lng || this.language,
        );
        if (this.options.saveMissingTo === 'fallback' && R && R[0])
          for (let K = 0; K < R.length; K++) M.push(R[K]);
        else
          this.options.saveMissingTo === 'all'
            ? (M = this.languageUtils.toResolveHierarchy(
                s.lng || this.language,
              ))
            : M.push(s.lng || this.language);
        const U = (K, ne, fe) => {
          var O;
          const A = b && fe !== m ? fe : re;
          (this.options.missingKeyHandler
            ? this.options.missingKeyHandler(K, c, ne, A, ae, s)
            : (O = this.backendConnector) != null &&
              O.saveMissing &&
              this.backendConnector.saveMissing(K, c, ne, A, ae, s),
            this.emit('missingKey', K, c, ne, m));
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && k
            ? M.forEach((K) => {
                const ne = this.pluralResolver.getSuffixes(K, s);
                (N &&
                  s[`defaultValue${this.options.pluralSeparator}zero`] &&
                  ne.indexOf(`${this.options.pluralSeparator}zero`) < 0 &&
                  ne.push(`${this.options.pluralSeparator}zero`),
                  ne.forEach((fe) => {
                    U([K], o + fe, s[`defaultValue${fe}`] || j);
                  }));
              })
            : U(M, o, j));
      }
      ((m = this.extendTranslation(m, t, s, y, n)),
        B &&
          m === o &&
          this.options.appendNamespaceToMissingKey &&
          (m = `${c}${d}${o}`),
        (B || F) &&
          this.options.parseMissingKeyHandler &&
          (m = this.options.parseMissingKeyHandler(
            this.options.appendNamespaceToMissingKey ? `${c}${d}${o}` : o,
            F ? m : void 0,
            s,
          )));
    }
    return a
      ? ((y.res = m), (y.usedParams = this.getUsedParamsDetails(s)), y)
      : m;
  }
  extendTranslation(t, r, n, s, a) {
    var l, c;
    if ((l = this.i18nFormat) != null && l.parse)
      t = this.i18nFormat.parse(
        t,
        { ...this.options.interpolation.defaultVariables, ...n },
        n.lng || this.language || s.usedLng,
        s.usedNS,
        s.usedKey,
        { resolved: s },
      );
    else if (!n.skipInterpolation) {
      n.interpolation &&
        this.interpolator.init({
          ...n,
          interpolation: { ...this.options.interpolation, ...n.interpolation },
        });
      const d =
        ue(t) &&
        (((c = n == null ? void 0 : n.interpolation) == null
          ? void 0
          : c.skipOnVariables) !== void 0
          ? n.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let h;
      if (d) {
        const y = t.match(this.interpolator.nestingRegexp);
        h = y && y.length;
      }
      let f = n.replace && !ue(n.replace) ? n.replace : n;
      if (
        (this.options.interpolation.defaultVariables &&
          (f = { ...this.options.interpolation.defaultVariables, ...f }),
        (t = this.interpolator.interpolate(
          t,
          f,
          n.lng || this.language || s.usedLng,
          n,
        )),
        d)
      ) {
        const y = t.match(this.interpolator.nestingRegexp),
          m = y && y.length;
        h < m && (n.nest = !1);
      }
      (!n.lng && s && s.res && (n.lng = this.language || s.usedLng),
        n.nest !== !1 &&
          (t = this.interpolator.nest(
            t,
            (...y) =>
              (a == null ? void 0 : a[0]) === y[0] && !n.context
                ? (this.logger.warn(
                    `It seems you are nesting recursively key: ${y[0]} in key: ${r[0]}`,
                  ),
                  null)
                : this.translate(...y, r),
            n,
          )),
        n.interpolation && this.interpolator.reset());
    }
    const i = n.postProcess || this.options.postProcess,
      o = ue(i) ? [i] : i;
    return (
      t != null &&
        o != null &&
        o.length &&
        n.applyPostProcessor !== !1 &&
        (t = rx.handle(
          o,
          t,
          r,
          this.options && this.options.postProcessPassResolved
            ? {
                i18nResolved: {
                  ...s,
                  usedParams: this.getUsedParamsDetails(n),
                },
                ...n,
              }
            : n,
          this,
        )),
      t
    );
  }
  resolve(t, r = {}) {
    let n, s, a, i, o;
    return (
      ue(t) && (t = [t]),
      t.forEach((l) => {
        if (this.isValidLookup(n)) return;
        const c = this.extractFromKey(l, r),
          d = c.key;
        s = d;
        let h = c.namespaces;
        this.options.fallbackNS && (h = h.concat(this.options.fallbackNS));
        const f = r.count !== void 0 && !ue(r.count),
          y = f && !r.ordinal && r.count === 0,
          m =
            r.context !== void 0 &&
            (ue(r.context) || typeof r.context == 'number') &&
            r.context !== '',
          x = r.lngs
            ? r.lngs
            : this.languageUtils.toResolveHierarchy(
                r.lng || this.language,
                r.fallbackLng,
              );
        h.forEach((S) => {
          var g, p;
          this.isValidLookup(n) ||
            ((o = S),
            !cm[`${x[0]}-${S}`] &&
              (g = this.utils) != null &&
              g.hasLoadedNamespace &&
              !((p = this.utils) != null && p.hasLoadedNamespace(o)) &&
              ((cm[`${x[0]}-${S}`] = !0),
              this.logger.warn(
                `key "${s}" for languages "${x.join(', ')}" won't get resolved as namespace "${o}" was not yet loaded`,
                'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
              )),
            x.forEach((v) => {
              var _;
              if (this.isValidLookup(n)) return;
              i = v;
              const k = [d];
              if ((_ = this.i18nFormat) != null && _.addLookupKeys)
                this.i18nFormat.addLookupKeys(k, d, v, S, r);
              else {
                let w;
                f && (w = this.pluralResolver.getSuffix(v, r.count, r));
                const N = `${this.options.pluralSeparator}zero`,
                  j = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (f &&
                    (r.ordinal &&
                      w.indexOf(j) === 0 &&
                      k.push(d + w.replace(j, this.options.pluralSeparator)),
                    k.push(d + w),
                    y && k.push(d + N)),
                  m)
                ) {
                  const T = `${d}${this.options.contextSeparator || '_'}${r.context}`;
                  (k.push(T),
                    f &&
                      (r.ordinal &&
                        w.indexOf(j) === 0 &&
                        k.push(T + w.replace(j, this.options.pluralSeparator)),
                      k.push(T + w),
                      y && k.push(T + N)));
                }
              }
              let b;
              for (; (b = k.pop()); )
                this.isValidLookup(n) ||
                  ((a = b), (n = this.getResource(v, S, b, r)));
            }));
        });
      }),
      { res: n, usedKey: s, exactUsedKey: a, usedLng: i, usedNS: o }
    );
  }
  isValidLookup(t) {
    return (
      t !== void 0 &&
      !(!this.options.returnNull && t === null) &&
      !(!this.options.returnEmptyString && t === '')
    );
  }
  getResource(t, r, n, s = {}) {
    var a;
    return (a = this.i18nFormat) != null && a.getResource
      ? this.i18nFormat.getResource(t, r, n, s)
      : this.resourceStore.getResource(t, r, n, s);
  }
  getUsedParamsDetails(t = {}) {
    const r = [
        'defaultValue',
        'ordinal',
        'context',
        'replace',
        'lng',
        'lngs',
        'fallbackLng',
        'ns',
        'keySeparator',
        'nsSeparator',
        'returnObjects',
        'returnDetails',
        'joinArrays',
        'postProcess',
        'interpolation',
      ],
      n = t.replace && !ue(t.replace);
    let s = n ? t.replace : t;
    if (
      (n && typeof t.count < 'u' && (s.count = t.count),
      this.options.interpolation.defaultVariables &&
        (s = { ...this.options.interpolation.defaultVariables, ...s }),
      !n)
    ) {
      s = { ...s };
      for (const a of r) delete s[a];
    }
    return s;
  }
  static hasDefaultValue(t) {
    const r = 'defaultValue';
    for (const n in t)
      if (
        Object.prototype.hasOwnProperty.call(t, n) &&
        r === n.substring(0, r.length) &&
        t[n] !== void 0
      )
        return !0;
    return !1;
  }
}
class fm {
  constructor(t) {
    ((this.options = t),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = xr.create('languageUtils')));
  }
  getScriptPartFromCode(t) {
    if (((t = xi(t)), !t || t.indexOf('-') < 0)) return null;
    const r = t.split('-');
    return r.length === 2 || (r.pop(), r[r.length - 1].toLowerCase() === 'x')
      ? null
      : this.formatLanguageCode(r.join('-'));
  }
  getLanguagePartFromCode(t) {
    if (((t = xi(t)), !t || t.indexOf('-') < 0)) return t;
    const r = t.split('-');
    return this.formatLanguageCode(r[0]);
  }
  formatLanguageCode(t) {
    if (ue(t) && t.indexOf('-') > -1) {
      let r;
      try {
        r = Intl.getCanonicalLocales(t)[0];
      } catch {}
      return (
        r && this.options.lowerCaseLng && (r = r.toLowerCase()),
        r || (this.options.lowerCaseLng ? t.toLowerCase() : t)
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? t.toLowerCase()
      : t;
  }
  isSupportedCode(t) {
    return (
      (this.options.load === 'languageOnly' ||
        this.options.nonExplicitSupportedLngs) &&
        (t = this.getLanguagePartFromCode(t)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(t) > -1
    );
  }
  getBestMatchFromCodes(t) {
    if (!t) return null;
    let r;
    return (
      t.forEach((n) => {
        if (r) return;
        const s = this.formatLanguageCode(n);
        (!this.options.supportedLngs || this.isSupportedCode(s)) && (r = s);
      }),
      !r &&
        this.options.supportedLngs &&
        t.forEach((n) => {
          if (r) return;
          const s = this.getScriptPartFromCode(n);
          if (this.isSupportedCode(s)) return (r = s);
          const a = this.getLanguagePartFromCode(n);
          if (this.isSupportedCode(a)) return (r = a);
          r = this.options.supportedLngs.find((i) => {
            if (i === a) return i;
            if (
              !(i.indexOf('-') < 0 && a.indexOf('-') < 0) &&
              ((i.indexOf('-') > 0 &&
                a.indexOf('-') < 0 &&
                i.substring(0, i.indexOf('-')) === a) ||
                (i.indexOf(a) === 0 && a.length > 1))
            )
              return i;
          });
        }),
      r || (r = this.getFallbackCodes(this.options.fallbackLng)[0]),
      r
    );
  }
  getFallbackCodes(t, r) {
    if (!t) return [];
    if (
      (typeof t == 'function' && (t = t(r)),
      ue(t) && (t = [t]),
      Array.isArray(t))
    )
      return t;
    if (!r) return t.default || [];
    let n = t[r];
    return (
      n || (n = t[this.getScriptPartFromCode(r)]),
      n || (n = t[this.formatLanguageCode(r)]),
      n || (n = t[this.getLanguagePartFromCode(r)]),
      n || (n = t.default),
      n || []
    );
  }
  toResolveHierarchy(t, r) {
    const n = this.getFallbackCodes(
        (r === !1 ? [] : r) || this.options.fallbackLng || [],
        t,
      ),
      s = [],
      a = (i) => {
        i &&
          (this.isSupportedCode(i)
            ? s.push(i)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${i}`,
              ));
      };
    return (
      ue(t) && (t.indexOf('-') > -1 || t.indexOf('_') > -1)
        ? (this.options.load !== 'languageOnly' &&
            a(this.formatLanguageCode(t)),
          this.options.load !== 'languageOnly' &&
            this.options.load !== 'currentOnly' &&
            a(this.getScriptPartFromCode(t)),
          this.options.load !== 'currentOnly' &&
            a(this.getLanguagePartFromCode(t)))
        : ue(t) && a(this.formatLanguageCode(t)),
      n.forEach((i) => {
        s.indexOf(i) < 0 && a(this.formatLanguageCode(i));
      }),
      s
    );
  }
}
const hm = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
  pm = {
    select: (e) => (e === 1 ? 'one' : 'other'),
    resolvedOptions: () => ({ pluralCategories: ['one', 'other'] }),
  };
class i1 {
  constructor(t, r = {}) {
    ((this.languageUtils = t),
      (this.options = r),
      (this.logger = xr.create('pluralResolver')),
      (this.pluralRulesCache = {}));
  }
  addRule(t, r) {
    this.rules[t] = r;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(t, r = {}) {
    const n = xi(t === 'dev' ? 'en' : t),
      s = r.ordinal ? 'ordinal' : 'cardinal',
      a = JSON.stringify({ cleanedCode: n, type: s });
    if (a in this.pluralRulesCache) return this.pluralRulesCache[a];
    let i;
    try {
      i = new Intl.PluralRules(n, { type: s });
    } catch {
      if (!Intl)
        return (
          this.logger.error('No Intl support, please use an Intl polyfill!'),
          pm
        );
      if (!t.match(/-|_/)) return pm;
      const l = this.languageUtils.getLanguagePartFromCode(t);
      i = this.getRule(l, r);
    }
    return ((this.pluralRulesCache[a] = i), i);
  }
  needsPlural(t, r = {}) {
    let n = this.getRule(t, r);
    return (
      n || (n = this.getRule('dev', r)),
      (n == null ? void 0 : n.resolvedOptions().pluralCategories.length) > 1
    );
  }
  getPluralFormsOfKey(t, r, n = {}) {
    return this.getSuffixes(t, n).map((s) => `${r}${s}`);
  }
  getSuffixes(t, r = {}) {
    let n = this.getRule(t, r);
    return (
      n || (n = this.getRule('dev', r)),
      n
        ? n
            .resolvedOptions()
            .pluralCategories.sort((s, a) => hm[s] - hm[a])
            .map(
              (s) =>
                `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ''}${s}`,
            )
        : []
    );
  }
  getSuffix(t, r, n = {}) {
    const s = this.getRule(t, n);
    return s
      ? `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ''}${s.select(r)}`
      : (this.logger.warn(`no plural rule found for: ${t}`),
        this.getSuffix('dev', r, n));
  }
}
const mm = (e, t, r, n = '.', s = !0) => {
    let a = YS(e, t, r);
    return (
      !a &&
        s &&
        ue(r) &&
        ((a = wd(e, r, n)), a === void 0 && (a = wd(t, r, n))),
      a
    );
  },
  $u = (e) => e.replace(/\$/g, '$$$$');
class o1 {
  constructor(t = {}) {
    var r;
    ((this.logger = xr.create('interpolator')),
      (this.options = t),
      (this.format =
        ((r = t == null ? void 0 : t.interpolation) == null
          ? void 0
          : r.format) || ((n) => n)),
      this.init(t));
  }
  init(t = {}) {
    t.interpolation || (t.interpolation = { escapeValue: !0 });
    const {
      escape: r,
      escapeValue: n,
      useRawValueToEscape: s,
      prefix: a,
      prefixEscaped: i,
      suffix: o,
      suffixEscaped: l,
      formatSeparator: c,
      unescapeSuffix: d,
      unescapePrefix: h,
      nestingPrefix: f,
      nestingPrefixEscaped: y,
      nestingSuffix: m,
      nestingSuffixEscaped: x,
      nestingOptionsSeparator: S,
      maxReplaces: g,
      alwaysFormat: p,
    } = t.interpolation;
    ((this.escape = r !== void 0 ? r : XS),
      (this.escapeValue = n !== void 0 ? n : !0),
      (this.useRawValueToEscape = s !== void 0 ? s : !1),
      (this.prefix = a ? hs(a) : i || '{{'),
      (this.suffix = o ? hs(o) : l || '}}'),
      (this.formatSeparator = c || ','),
      (this.unescapePrefix = d ? '' : h || '-'),
      (this.unescapeSuffix = this.unescapePrefix ? '' : d || ''),
      (this.nestingPrefix = f ? hs(f) : y || hs('$t(')),
      (this.nestingSuffix = m ? hs(m) : x || hs(')')),
      (this.nestingOptionsSeparator = S || ','),
      (this.maxReplaces = g || 1e3),
      (this.alwaysFormat = p !== void 0 ? p : !1),
      this.resetRegExp());
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = (r, n) =>
      (r == null ? void 0 : r.source) === n
        ? ((r.lastIndex = 0), r)
        : new RegExp(n, 'g');
    ((this.regexp = t(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
      (this.regexpUnescape = t(
        this.regexpUnescape,
        `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`,
      )),
      (this.nestingRegexp = t(
        this.nestingRegexp,
        `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`,
      )));
  }
  interpolate(t, r, n, s) {
    var y;
    let a, i, o;
    const l =
        (this.options &&
          this.options.interpolation &&
          this.options.interpolation.defaultVariables) ||
        {},
      c = (m) => {
        if (m.indexOf(this.formatSeparator) < 0) {
          const p = mm(
            r,
            l,
            m,
            this.options.keySeparator,
            this.options.ignoreJSONStructure,
          );
          return this.alwaysFormat
            ? this.format(p, void 0, n, { ...s, ...r, interpolationkey: m })
            : p;
        }
        const x = m.split(this.formatSeparator),
          S = x.shift().trim(),
          g = x.join(this.formatSeparator).trim();
        return this.format(
          mm(
            r,
            l,
            S,
            this.options.keySeparator,
            this.options.ignoreJSONStructure,
          ),
          g,
          n,
          { ...s, ...r, interpolationkey: S },
        );
      };
    this.resetRegExp();
    const d =
        (s == null ? void 0 : s.missingInterpolationHandler) ||
        this.options.missingInterpolationHandler,
      h =
        ((y = s == null ? void 0 : s.interpolation) == null
          ? void 0
          : y.skipOnVariables) !== void 0
          ? s.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: (m) => $u(m) },
        {
          regex: this.regexp,
          safeValue: (m) => (this.escapeValue ? $u(this.escape(m)) : $u(m)),
        },
      ].forEach((m) => {
        for (o = 0; (a = m.regex.exec(t)); ) {
          const x = a[1].trim();
          if (((i = c(x)), i === void 0))
            if (typeof d == 'function') {
              const g = d(t, a, s);
              i = ue(g) ? g : '';
            } else if (s && Object.prototype.hasOwnProperty.call(s, x)) i = '';
            else if (h) {
              i = a[0];
              continue;
            } else
              (this.logger.warn(
                `missed to pass in variable ${x} for interpolating ${t}`,
              ),
                (i = ''));
          else !ue(i) && !this.useRawValueToEscape && (i = am(i));
          const S = m.safeValue(i);
          if (
            ((t = t.replace(a[0], S)),
            h
              ? ((m.regex.lastIndex += i.length),
                (m.regex.lastIndex -= a[0].length))
              : (m.regex.lastIndex = 0),
            o++,
            o >= this.maxReplaces)
          )
            break;
        }
      }),
      t
    );
  }
  nest(t, r, n = {}) {
    let s, a, i;
    const o = (l, c) => {
      const d = this.nestingOptionsSeparator;
      if (l.indexOf(d) < 0) return l;
      const h = l.split(new RegExp(`${d}[ ]*{`));
      let f = `{${h[1]}`;
      ((l = h[0]), (f = this.interpolate(f, i)));
      const y = f.match(/'/g),
        m = f.match(/"/g);
      ((((y == null ? void 0 : y.length) ?? 0) % 2 === 0 && !m) ||
        m.length % 2 !== 0) &&
        (f = f.replace(/'/g, '"'));
      try {
        ((i = JSON.parse(f)), c && (i = { ...c, ...i }));
      } catch (x) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${l}`,
            x,
          ),
          `${l}${d}${f}`
        );
      }
      return (
        i.defaultValue &&
          i.defaultValue.indexOf(this.prefix) > -1 &&
          delete i.defaultValue,
        l
      );
    };
    for (; (s = this.nestingRegexp.exec(t)); ) {
      let l = [];
      ((i = { ...n }),
        (i = i.replace && !ue(i.replace) ? i.replace : i),
        (i.applyPostProcessor = !1),
        delete i.defaultValue);
      const c = /{.*}/.test(s[1])
        ? s[1].lastIndexOf('}') + 1
        : s[1].indexOf(this.formatSeparator);
      if (
        (c !== -1 &&
          ((l = s[1]
            .slice(c)
            .split(this.formatSeparator)
            .map((d) => d.trim())
            .filter(Boolean)),
          (s[1] = s[1].slice(0, c))),
        (a = r(o.call(this, s[1].trim(), i), i)),
        a && s[0] === t && !ue(a))
      )
        return a;
      (ue(a) || (a = am(a)),
        a ||
          (this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`),
          (a = '')),
        l.length &&
          (a = l.reduce(
            (d, h) =>
              this.format(d, h, n.lng, { ...n, interpolationkey: s[1].trim() }),
            a.trim(),
          )),
        (t = t.replace(s[0], a)),
        (this.regexp.lastIndex = 0));
    }
    return t;
  }
}
const l1 = (e) => {
    let t = e.toLowerCase().trim();
    const r = {};
    if (e.indexOf('(') > -1) {
      const n = e.split('(');
      t = n[0].toLowerCase().trim();
      const s = n[1].substring(0, n[1].length - 1);
      t === 'currency' && s.indexOf(':') < 0
        ? r.currency || (r.currency = s.trim())
        : t === 'relativetime' && s.indexOf(':') < 0
          ? r.range || (r.range = s.trim())
          : s.split(';').forEach((i) => {
              if (i) {
                const [o, ...l] = i.split(':'),
                  c = l
                    .join(':')
                    .trim()
                    .replace(/^'+|'+$/g, ''),
                  d = o.trim();
                (r[d] || (r[d] = c),
                  c === 'false' && (r[d] = !1),
                  c === 'true' && (r[d] = !0),
                  isNaN(c) || (r[d] = parseInt(c, 10)));
              }
            });
    }
    return { formatName: t, formatOptions: r };
  },
  gm = (e) => {
    const t = {};
    return (r, n, s) => {
      let a = s;
      s &&
        s.interpolationkey &&
        s.formatParams &&
        s.formatParams[s.interpolationkey] &&
        s[s.interpolationkey] &&
        (a = { ...a, [s.interpolationkey]: void 0 });
      const i = n + JSON.stringify(a);
      let o = t[i];
      return (o || ((o = e(xi(n), s)), (t[i] = o)), o(r));
    };
  },
  u1 = (e) => (t, r, n) => e(xi(r), n)(t);
class c1 {
  constructor(t = {}) {
    ((this.logger = xr.create('formatter')), (this.options = t), this.init(t));
  }
  init(t, r = { interpolation: {} }) {
    this.formatSeparator = r.interpolation.formatSeparator || ',';
    const n = r.cacheInBuiltFormats ? gm : u1;
    this.formats = {
      number: n((s, a) => {
        const i = new Intl.NumberFormat(s, { ...a });
        return (o) => i.format(o);
      }),
      currency: n((s, a) => {
        const i = new Intl.NumberFormat(s, { ...a, style: 'currency' });
        return (o) => i.format(o);
      }),
      datetime: n((s, a) => {
        const i = new Intl.DateTimeFormat(s, { ...a });
        return (o) => i.format(o);
      }),
      relativetime: n((s, a) => {
        const i = new Intl.RelativeTimeFormat(s, { ...a });
        return (o) => i.format(o, a.range || 'day');
      }),
      list: n((s, a) => {
        const i = new Intl.ListFormat(s, { ...a });
        return (o) => i.format(o);
      }),
    };
  }
  add(t, r) {
    this.formats[t.toLowerCase().trim()] = r;
  }
  addCached(t, r) {
    this.formats[t.toLowerCase().trim()] = gm(r);
  }
  format(t, r, n, s = {}) {
    const a = r.split(this.formatSeparator);
    if (
      a.length > 1 &&
      a[0].indexOf('(') > 1 &&
      a[0].indexOf(')') < 0 &&
      a.find((o) => o.indexOf(')') > -1)
    ) {
      const o = a.findIndex((l) => l.indexOf(')') > -1);
      a[0] = [a[0], ...a.splice(1, o)].join(this.formatSeparator);
    }
    return a.reduce((o, l) => {
      var h;
      const { formatName: c, formatOptions: d } = l1(l);
      if (this.formats[c]) {
        let f = o;
        try {
          const y =
              ((h = s == null ? void 0 : s.formatParams) == null
                ? void 0
                : h[s.interpolationkey]) || {},
            m = y.locale || y.lng || s.locale || s.lng || n;
          f = this.formats[c](o, m, { ...d, ...s, ...y });
        } catch (y) {
          this.logger.warn(y);
        }
        return f;
      } else this.logger.warn(`there was no format function for ${c}`);
      return o;
    }, t);
  }
}
const d1 = (e, t) => {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
};
class f1 extends Ul {
  constructor(t, r, n, s = {}) {
    var a, i;
    (super(),
      (this.backend = t),
      (this.store = r),
      (this.services = n),
      (this.languageUtils = n.languageUtils),
      (this.options = s),
      (this.logger = xr.create('backendConnector')),
      (this.waitingReads = []),
      (this.maxParallelReads = s.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5),
      (this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      (i = (a = this.backend) == null ? void 0 : a.init) == null ||
        i.call(a, n, s.backend, s));
  }
  queueLoad(t, r, n, s) {
    const a = {},
      i = {},
      o = {},
      l = {};
    return (
      t.forEach((c) => {
        let d = !0;
        (r.forEach((h) => {
          const f = `${c}|${h}`;
          !n.reload && this.store.hasResourceBundle(c, h)
            ? (this.state[f] = 2)
            : this.state[f] < 0 ||
              (this.state[f] === 1
                ? i[f] === void 0 && (i[f] = !0)
                : ((this.state[f] = 1),
                  (d = !1),
                  i[f] === void 0 && (i[f] = !0),
                  a[f] === void 0 && (a[f] = !0),
                  l[h] === void 0 && (l[h] = !0)));
        }),
          d || (o[c] = !0));
      }),
      (Object.keys(a).length || Object.keys(i).length) &&
        this.queue.push({
          pending: i,
          pendingCount: Object.keys(i).length,
          loaded: {},
          errors: [],
          callback: s,
        }),
      {
        toLoad: Object.keys(a),
        pending: Object.keys(i),
        toLoadLanguages: Object.keys(o),
        toLoadNamespaces: Object.keys(l),
      }
    );
  }
  loaded(t, r, n) {
    const s = t.split('|'),
      a = s[0],
      i = s[1];
    (r && this.emit('failedLoading', a, i, r),
      !r &&
        n &&
        this.store.addResourceBundle(a, i, n, void 0, void 0, { skipCopy: !0 }),
      (this.state[t] = r ? -1 : 2),
      r && n && (this.state[t] = 0));
    const o = {};
    (this.queue.forEach((l) => {
      (GS(l.loaded, [a], i),
        d1(l, t),
        r && l.errors.push(r),
        l.pendingCount === 0 &&
          !l.done &&
          (Object.keys(l.loaded).forEach((c) => {
            o[c] || (o[c] = {});
            const d = l.loaded[c];
            d.length &&
              d.forEach((h) => {
                o[c][h] === void 0 && (o[c][h] = !0);
              });
          }),
          (l.done = !0),
          l.errors.length ? l.callback(l.errors) : l.callback()));
    }),
      this.emit('loaded', o),
      (this.queue = this.queue.filter((l) => !l.done)));
  }
  read(t, r, n, s = 0, a = this.retryTimeout, i) {
    if (!t.length) return i(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: r,
        fcName: n,
        tried: s,
        wait: a,
        callback: i,
      });
      return;
    }
    this.readingCalls++;
    const o = (c, d) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const h = this.waitingReads.shift();
          this.read(h.lng, h.ns, h.fcName, h.tried, h.wait, h.callback);
        }
        if (c && d && s < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, t, r, n, s + 1, a * 2, i);
          }, a);
          return;
        }
        i(c, d);
      },
      l = this.backend[n].bind(this.backend);
    if (l.length === 2) {
      try {
        const c = l(t, r);
        c && typeof c.then == 'function'
          ? c.then((d) => o(null, d)).catch(o)
          : o(null, c);
      } catch (c) {
        o(c);
      }
      return;
    }
    return l(t, r, o);
  }
  prepareLoading(t, r, n = {}, s) {
    if (!this.backend)
      return (
        this.logger.warn(
          'No backend was added via i18next.use. Will not load resources.',
        ),
        s && s()
      );
    (ue(t) && (t = this.languageUtils.toResolveHierarchy(t)),
      ue(r) && (r = [r]));
    const a = this.queueLoad(t, r, n, s);
    if (!a.toLoad.length) return (a.pending.length || s(), null);
    a.toLoad.forEach((i) => {
      this.loadOne(i);
    });
  }
  load(t, r, n) {
    this.prepareLoading(t, r, {}, n);
  }
  reload(t, r, n) {
    this.prepareLoading(t, r, { reload: !0 }, n);
  }
  loadOne(t, r = '') {
    const n = t.split('|'),
      s = n[0],
      a = n[1];
    this.read(s, a, 'read', void 0, void 0, (i, o) => {
      (i &&
        this.logger.warn(
          `${r}loading namespace ${a} for language ${s} failed`,
          i,
        ),
        !i &&
          o &&
          this.logger.log(`${r}loaded namespace ${a} for language ${s}`, o),
        this.loaded(t, i, o));
    });
  }
  saveMissing(t, r, n, s, a, i = {}, o = () => {}) {
    var l, c, d, h, f;
    if (
      (c = (l = this.services) == null ? void 0 : l.utils) != null &&
      c.hasLoadedNamespace &&
      !(
        (h = (d = this.services) == null ? void 0 : d.utils) != null &&
        h.hasLoadedNamespace(r)
      )
    ) {
      this.logger.warn(
        `did not save key "${n}" as the namespace "${r}" was not yet loaded`,
        'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
      );
      return;
    }
    if (!(n == null || n === '')) {
      if ((f = this.backend) != null && f.create) {
        const y = { ...i, isUpdate: a },
          m = this.backend.create.bind(this.backend);
        if (m.length < 6)
          try {
            let x;
            (m.length === 5 ? (x = m(t, r, n, s, y)) : (x = m(t, r, n, s)),
              x && typeof x.then == 'function'
                ? x.then((S) => o(null, S)).catch(o)
                : o(null, x));
          } catch (x) {
            o(x);
          }
        else m(t, r, n, s, o, y);
      }
      !t || !t[0] || this.store.addResource(t[0], r, n, s);
    }
  }
}
const ym = () => ({
    debug: !1,
    initAsync: !0,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: 'all',
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: 'fallback',
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: (e) => {
      let t = {};
      if (
        (typeof e[1] == 'object' && (t = e[1]),
        ue(e[1]) && (t.defaultValue = e[1]),
        ue(e[2]) && (t.tDescription = e[2]),
        typeof e[2] == 'object' || typeof e[3] == 'object')
      ) {
        const r = e[3] || e[2];
        Object.keys(r).forEach((n) => {
          t[n] = r[n];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: (e) => e,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
    cacheInBuiltFormats: !0,
  }),
  vm = (e) => {
    var t, r;
    return (
      ue(e.ns) && (e.ns = [e.ns]),
      ue(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]),
      ue(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]),
      ((r = (t = e.supportedLngs) == null ? void 0 : t.indexOf) == null
        ? void 0
        : r.call(t, 'cimode')) < 0 &&
        (e.supportedLngs = e.supportedLngs.concat(['cimode'])),
      typeof e.initImmediate == 'boolean' && (e.initAsync = e.initImmediate),
      e
    );
  },
  so = () => {},
  h1 = (e) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((r) => {
      typeof e[r] == 'function' && (e[r] = e[r].bind(e));
    });
  };
class wi extends Ul {
  constructor(t = {}, r) {
    if (
      (super(),
      (this.options = vm(t)),
      (this.services = {}),
      (this.logger = xr),
      (this.modules = { external: [] }),
      h1(this),
      r && !this.isInitialized && !t.isClone)
    ) {
      if (!this.options.initAsync) return (this.init(t, r), this);
      setTimeout(() => {
        this.init(t, r);
      }, 0);
    }
  }
  init(t = {}, r) {
    ((this.isInitializing = !0),
      typeof t == 'function' && ((r = t), (t = {})),
      t.defaultNS == null &&
        t.ns &&
        (ue(t.ns)
          ? (t.defaultNS = t.ns)
          : t.ns.indexOf('translation') < 0 && (t.defaultNS = t.ns[0])));
    const n = ym();
    ((this.options = { ...n, ...this.options, ...vm(t) }),
      (this.options.interpolation = {
        ...n.interpolation,
        ...this.options.interpolation,
      }),
      t.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = t.keySeparator),
      t.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = t.nsSeparator));
    const s = (c) => (c ? (typeof c == 'function' ? new c() : c) : null);
    if (!this.options.isClone) {
      this.modules.logger
        ? xr.init(s(this.modules.logger), this.options)
        : xr.init(null, this.options);
      let c;
      this.modules.formatter ? (c = this.modules.formatter) : (c = c1);
      const d = new fm(this.options);
      this.store = new um(this.options.resources, this.options);
      const h = this.services;
      ((h.logger = xr),
        (h.resourceStore = this.store),
        (h.languageUtils = d),
        (h.pluralResolver = new i1(d, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        this.options.interpolation.format &&
          this.options.interpolation.format !== n.interpolation.format &&
          this.logger.deprecate(
            'init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting',
          ),
        c &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === n.interpolation.format) &&
          ((h.formatter = s(c)),
          h.formatter.init && h.formatter.init(h, this.options),
          (this.options.interpolation.format = h.formatter.format.bind(
            h.formatter,
          ))),
        (h.interpolator = new o1(this.options)),
        (h.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (h.backendConnector = new f1(
          s(this.modules.backend),
          h.resourceStore,
          h,
          this.options,
        )),
        h.backendConnector.on('*', (y, ...m) => {
          this.emit(y, ...m);
        }),
        this.modules.languageDetector &&
          ((h.languageDetector = s(this.modules.languageDetector)),
          h.languageDetector.init &&
            h.languageDetector.init(h, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((h.i18nFormat = s(this.modules.i18nFormat)),
          h.i18nFormat.init && h.i18nFormat.init(this)),
        (this.translator = new xl(this.services, this.options)),
        this.translator.on('*', (y, ...m) => {
          this.emit(y, ...m);
        }),
        this.modules.external.forEach((y) => {
          y.init && y.init(this);
        }));
    }
    if (
      ((this.format = this.options.interpolation.format),
      r || (r = so),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const c = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng,
      );
      c.length > 0 && c[0] !== 'dev' && (this.options.lng = c[0]);
    }
    (!this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        'init: no languageDetector is used and no lng is defined',
      ),
      [
        'getResource',
        'hasResourceBundle',
        'getResourceBundle',
        'getDataByLanguage',
      ].forEach((c) => {
        this[c] = (...d) => this.store[c](...d);
      }),
      [
        'addResource',
        'addResources',
        'addResourceBundle',
        'removeResourceBundle',
      ].forEach((c) => {
        this[c] = (...d) => (this.store[c](...d), this);
      }));
    const o = ba(),
      l = () => {
        const c = (d, h) => {
          ((this.isInitializing = !1),
            this.isInitialized &&
              !this.initializedStoreOnce &&
              this.logger.warn(
                'init: i18next is already initialized. You should call init just once!',
              ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log('initialized', this.options),
            this.emit('initialized', this.options),
            o.resolve(h),
            r(d, h));
        };
        if (this.languages && !this.isInitialized)
          return c(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, c);
      };
    return (
      this.options.resources || !this.options.initAsync
        ? l()
        : setTimeout(l, 0),
      o
    );
  }
  loadResources(t, r = so) {
    var a, i;
    let n = r;
    const s = ue(t) ? t : this.language;
    if (
      (typeof t == 'function' && (n = t),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        (s == null ? void 0 : s.toLowerCase()) === 'cimode' &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return n();
      const o = [],
        l = (c) => {
          if (!c || c === 'cimode') return;
          this.services.languageUtils.toResolveHierarchy(c).forEach((h) => {
            h !== 'cimode' && o.indexOf(h) < 0 && o.push(h);
          });
        };
      (s
        ? l(s)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach((d) => l(d)),
        (i = (a = this.options.preload) == null ? void 0 : a.forEach) == null ||
          i.call(a, (c) => l(c)),
        this.services.backendConnector.load(o, this.options.ns, (c) => {
          (!c &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            n(c));
        }));
    } else n(null);
  }
  reloadResources(t, r, n) {
    const s = ba();
    return (
      typeof t == 'function' && ((n = t), (t = void 0)),
      typeof r == 'function' && ((n = r), (r = void 0)),
      t || (t = this.languages),
      r || (r = this.options.ns),
      n || (n = so),
      this.services.backendConnector.reload(t, r, (a) => {
        (s.resolve(), n(a));
      }),
      s
    );
  }
  use(t) {
    if (!t)
      throw new Error(
        'You are passing an undefined module! Please check the object you are passing to i18next.use()',
      );
    if (!t.type)
      throw new Error(
        'You are passing a wrong module! Please check the object you are passing to i18next.use()',
      );
    return (
      t.type === 'backend' && (this.modules.backend = t),
      (t.type === 'logger' || (t.log && t.warn && t.error)) &&
        (this.modules.logger = t),
      t.type === 'languageDetector' && (this.modules.languageDetector = t),
      t.type === 'i18nFormat' && (this.modules.i18nFormat = t),
      t.type === 'postProcessor' && rx.addPostProcessor(t),
      t.type === 'formatter' && (this.modules.formatter = t),
      t.type === '3rdParty' && this.modules.external.push(t),
      this
    );
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(['cimode', 'dev'].indexOf(t) > -1)) {
      for (let r = 0; r < this.languages.length; r++) {
        const n = this.languages[r];
        if (
          !(['cimode', 'dev'].indexOf(n) > -1) &&
          this.store.hasLanguageSomeTranslations(n)
        ) {
          this.resolvedLanguage = n;
          break;
        }
      }
      !this.resolvedLanguage &&
        this.languages.indexOf(t) < 0 &&
        this.store.hasLanguageSomeTranslations(t) &&
        ((this.resolvedLanguage = t), this.languages.unshift(t));
    }
  }
  changeLanguage(t, r) {
    this.isLanguageChangingTo = t;
    const n = ba();
    this.emit('languageChanging', t);
    const s = (o) => {
        ((this.language = o),
          (this.languages = this.services.languageUtils.toResolveHierarchy(o)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(o));
      },
      a = (o, l) => {
        (l
          ? this.isLanguageChangingTo === t &&
            (s(l),
            this.translator.changeLanguage(l),
            (this.isLanguageChangingTo = void 0),
            this.emit('languageChanged', l),
            this.logger.log('languageChanged', l))
          : (this.isLanguageChangingTo = void 0),
          n.resolve((...c) => this.t(...c)),
          r && r(o, (...c) => this.t(...c)));
      },
      i = (o) => {
        var d, h;
        !t && !o && this.services.languageDetector && (o = []);
        const l = ue(o) ? o : o && o[0],
          c = this.store.hasLanguageSomeTranslations(l)
            ? l
            : this.services.languageUtils.getBestMatchFromCodes(
                ue(o) ? [o] : o,
              );
        (c &&
          (this.language || s(c),
          this.translator.language || this.translator.changeLanguage(c),
          (h =
            (d = this.services.languageDetector) == null
              ? void 0
              : d.cacheUserLanguage) == null || h.call(d, c)),
          this.loadResources(c, (f) => {
            a(f, c);
          }));
      };
    return (
      !t &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? i(this.services.languageDetector.detect())
        : !t &&
            this.services.languageDetector &&
            this.services.languageDetector.async
          ? this.services.languageDetector.detect.length === 0
            ? this.services.languageDetector.detect().then(i)
            : this.services.languageDetector.detect(i)
          : i(t),
      n
    );
  }
  getFixedT(t, r, n) {
    const s = (a, i, ...o) => {
      let l;
      (typeof i != 'object'
        ? (l = this.options.overloadTranslationOptionHandler([a, i].concat(o)))
        : (l = { ...i }),
        (l.lng = l.lng || s.lng),
        (l.lngs = l.lngs || s.lngs),
        (l.ns = l.ns || s.ns),
        l.keyPrefix !== '' && (l.keyPrefix = l.keyPrefix || n || s.keyPrefix));
      const c = this.options.keySeparator || '.';
      let d;
      return (
        l.keyPrefix && Array.isArray(a)
          ? (d = a.map(
              (h) => (
                typeof h == 'function' &&
                  (h = bd(h, { ...this.options, ...i })),
                `${l.keyPrefix}${c}${h}`
              ),
            ))
          : (typeof a == 'function' && (a = bd(a, { ...this.options, ...i })),
            (d = l.keyPrefix ? `${l.keyPrefix}${c}${a}` : a)),
        this.t(d, l)
      );
    };
    return (
      ue(t) ? (s.lng = t) : (s.lngs = t),
      (s.ns = r),
      (s.keyPrefix = n),
      s
    );
  }
  t(...t) {
    var r;
    return (r = this.translator) == null ? void 0 : r.translate(...t);
  }
  exists(...t) {
    var r;
    return (r = this.translator) == null ? void 0 : r.exists(...t);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t, r = {}) {
    if (!this.isInitialized)
      return (
        this.logger.warn(
          'hasLoadedNamespace: i18next was not initialized',
          this.languages,
        ),
        !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          'hasLoadedNamespace: i18n.languages were undefined or empty',
          this.languages,
        ),
        !1
      );
    const n = r.lng || this.resolvedLanguage || this.languages[0],
      s = this.options ? this.options.fallbackLng : !1,
      a = this.languages[this.languages.length - 1];
    if (n.toLowerCase() === 'cimode') return !0;
    const i = (o, l) => {
      const c = this.services.backendConnector.state[`${o}|${l}`];
      return c === -1 || c === 0 || c === 2;
    };
    if (r.precheck) {
      const o = r.precheck(this, i);
      if (o !== void 0) return o;
    }
    return !!(
      this.hasResourceBundle(n, t) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (i(n, t) && (!s || i(a, t)))
    );
  }
  loadNamespaces(t, r) {
    const n = ba();
    return this.options.ns
      ? (ue(t) && (t = [t]),
        t.forEach((s) => {
          this.options.ns.indexOf(s) < 0 && this.options.ns.push(s);
        }),
        this.loadResources((s) => {
          (n.resolve(), r && r(s));
        }),
        n)
      : (r && r(), Promise.resolve());
  }
  loadLanguages(t, r) {
    const n = ba();
    ue(t) && (t = [t]);
    const s = this.options.preload || [],
      a = t.filter(
        (i) =>
          s.indexOf(i) < 0 && this.services.languageUtils.isSupportedCode(i),
      );
    return a.length
      ? ((this.options.preload = s.concat(a)),
        this.loadResources((i) => {
          (n.resolve(), r && r(i));
        }),
        n)
      : (r && r(), Promise.resolve());
  }
  dir(t) {
    var s, a;
    if (
      (t ||
        (t =
          this.resolvedLanguage ||
          (((s = this.languages) == null ? void 0 : s.length) > 0
            ? this.languages[0]
            : this.language)),
      !t)
    )
      return 'rtl';
    try {
      const i = new Intl.Locale(t);
      if (i && i.getTextInfo) {
        const o = i.getTextInfo();
        if (o && o.direction) return o.direction;
      }
    } catch {}
    const r = [
        'ar',
        'shu',
        'sqr',
        'ssh',
        'xaa',
        'yhd',
        'yud',
        'aao',
        'abh',
        'abv',
        'acm',
        'acq',
        'acw',
        'acx',
        'acy',
        'adf',
        'ads',
        'aeb',
        'aec',
        'afb',
        'ajp',
        'apc',
        'apd',
        'arb',
        'arq',
        'ars',
        'ary',
        'arz',
        'auz',
        'avl',
        'ayh',
        'ayl',
        'ayn',
        'ayp',
        'bbz',
        'pga',
        'he',
        'iw',
        'ps',
        'pbt',
        'pbu',
        'pst',
        'prp',
        'prd',
        'ug',
        'ur',
        'ydd',
        'yds',
        'yih',
        'ji',
        'yi',
        'hbo',
        'men',
        'xmn',
        'fa',
        'jpr',
        'peo',
        'pes',
        'prs',
        'dv',
        'sam',
        'ckb',
      ],
      n =
        ((a = this.services) == null ? void 0 : a.languageUtils) ||
        new fm(ym());
    return t.toLowerCase().indexOf('-latn') > 1
      ? 'ltr'
      : r.indexOf(n.getLanguagePartFromCode(t)) > -1 ||
          t.toLowerCase().indexOf('-arab') > 1
        ? 'rtl'
        : 'ltr';
  }
  static createInstance(t = {}, r) {
    return new wi(t, r);
  }
  cloneInstance(t = {}, r = so) {
    const n = t.forkResourceStore;
    n && delete t.forkResourceStore;
    const s = { ...this.options, ...t, isClone: !0 },
      a = new wi(s);
    if (
      ((t.debug !== void 0 || t.prefix !== void 0) &&
        (a.logger = a.logger.clone(t)),
      ['store', 'services', 'language'].forEach((o) => {
        a[o] = this[o];
      }),
      (a.services = { ...this.services }),
      (a.services.utils = { hasLoadedNamespace: a.hasLoadedNamespace.bind(a) }),
      n)
    ) {
      const o = Object.keys(this.store.data).reduce(
        (l, c) => (
          (l[c] = { ...this.store.data[c] }),
          (l[c] = Object.keys(l[c]).reduce(
            (d, h) => ((d[h] = { ...l[c][h] }), d),
            l[c],
          )),
          l
        ),
        {},
      );
      ((a.store = new um(o, s)), (a.services.resourceStore = a.store));
    }
    return (
      (a.translator = new xl(a.services, s)),
      a.translator.on('*', (o, ...l) => {
        a.emit(o, ...l);
      }),
      a.init(s, r),
      (a.translator.options = s),
      (a.translator.backendConnector.services.utils = {
        hasLoadedNamespace: a.hasLoadedNamespace.bind(a),
      }),
      a
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const ot = wi.createInstance();
ot.createInstance = wi.createInstance;
ot.createInstance;
ot.dir;
ot.init;
ot.loadResources;
ot.reloadResources;
ot.use;
ot.changeLanguage;
ot.getFixedT;
ot.t;
ot.exists;
ot.setDefaultNamespace;
ot.hasLoadedNamespace;
ot.loadNamespaces;
ot.loadLanguages;
const p1 = {
    title: 'Home',
    today: 'Today is {{date}}',
    exampleNumber: 'Example number: {{value}}',
  },
  m1 = { title: 'About' },
  g1 = {
    home: 'Home',
    about: 'About',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    dashboard: 'Dashboard',
  },
  y1 = {
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    save: 'Save',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    continue: 'Continue',
    areYouSure: 'Are you sure?',
  },
  v1 = {
    title: 'Monthly export',
    enable: 'Enable',
    disable: 'Disable',
    nextRun: 'Next run:',
    lastRun: 'Last run:',
    frequency: 'Frequency',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    time: 'Time',
    runNow: 'Run now',
  },
  x1 = {
    territories: 'Territories',
    streets: 'Streets',
    buildingsVillages: 'Buildings & Villages',
    letters: 'Letters',
    exits: 'Exits',
    assignments: 'Assignments',
    todayAssignments: "Today's assignments",
    calendar: 'Calendar',
    suggestions: 'Suggestions',
    notAtHome: 'Not at Home',
    dashboard: 'Dashboard',
    reports: 'Reports',
    maps: 'Maps',
    users: 'Users',
    settings: 'Settings',
    notifications: 'Notifications',
  },
  w1 = {
    title: 'Not at Home',
    todayAssignments: 'Territories assigned for today ({{count}})',
    noAssignments: 'No territories assigned for today.',
    miniMapAlt: '{{name}} territory mini map',
    noImage: 'No image available',
    addressesTitle: 'Addresses',
    noAddresses: 'No addresses registered for this territory.',
    table: {
      street: 'Street',
      numbers: 'Numbers',
      type: 'Type',
      actions: 'Actions',
    },
    residential: 'Residential',
    commercial: 'Commercial',
    other: 'Other',
    recordNotAtHome: 'Record not at home',
    streetAddresses: '{{count}} address',
    streetAddresses_plural: '{{count}} addresses',
    confirmConversation: 'Confirm conversation ({{date}})',
    conversationConfirmedLabel: 'Conversation confirmed',
    scheduledFor: 'Return scheduled for {{date}}',
    followUpsTitle: 'Scheduled returns ({{count}})',
    noFollowUps: 'No pending returns.',
    followUpOn: 'Return on {{date}}',
    recordedOn: 'Recorded on {{date}}',
    markCompleted: 'Mark as completed',
    unknownStreet: 'Unknown street',
    unknownType: 'Unknown type',
    addressLabel: '{{street}} • no. {{range}}',
  },
  b1 = {
    title: "Today's assignments",
    currentDate: 'Reference date: {{date}}',
    empty: 'No territories assigned for today.',
    summary: 'Active territories today: {{count}}',
    assignmentRange: 'Period: {{start}} – {{end}}',
    exitLabel: 'Group: {{name}}',
    returnBy: 'Return by {{date}}',
  },
  _1 = {
    title: 'Buildings and Villages',
    subtitle:
      'Register, filter, and organize information about buildings, villages, and condominiums in the territory.',
    newRecord: 'New record',
    filters: {
      search: 'Search',
      searchPlaceholder: 'Name, responsible person, or address',
      territory: 'Territory',
      type: 'Type',
      modality: 'Modality',
      allModalities: 'All',
    },
    records: {
      title: 'Records',
      count: '{{count}} record found',
      count_plural: '{{count}} records found',
      loading: 'Loading records...',
      empty: 'No records found with the applied filters.',
      noName: 'No name',
      noTerritory: 'Territory not informed',
    },
    fields: {
      territory: 'Territory',
      name: 'Name',
      address: 'Address',
      number: 'Number',
      type: 'Type',
      modality: 'Modality',
      reception: 'Reception type',
      residences: 'Number of residences',
      responsible: 'Responsible person',
      contactMethod: 'Contact method',
      letterStatus: 'Letter status',
      letterHistory: 'Correspondence history',
      assignedAt: 'Assigned on',
      returnedAt: 'Returned on',
      block: 'Block',
      notes: 'Notes',
    },
    placeholders: {
      territory: 'Select a territory',
      name: 'Building or village identification',
      address: 'Street, avenue, or reference',
      number: 'Property number',
      type: 'Building, village, condominium...',
      modality: 'Condominium, gated community...',
      reception: 'Reception desk, intercom...',
      responsible: 'Name of the superintendent, doorman...',
      contactMethod: 'Phone, email, concierge...',
      block: 'Block identification',
      notes: 'Relevant details, schedules, access instructions...',
    },
    letterStatus: {
      notSent: 'No letter sent',
      inProgress: 'Correspondence in progress',
      sent: 'Letter sent',
      responded: 'Response received',
      unknown: 'Status unknown',
    },
    letterHistory: {
      add: 'Add entry',
      empty: 'No correspondence recorded yet.',
      sentAt: 'Sent on',
      status: 'Status',
      remove: 'Remove',
      notes: 'Notes',
      notesPlaceholder: 'Summary, follow-up, reply details...',
    },
    modal: {
      editTitle: 'Edit record',
      createTitle: 'New record',
      descriptionEdit:
        'Fill in the fields below to update the building or village.',
      descriptionCreate:
        'Fill in the fields below to register the building or village.',
    },
    validation: {
      selectTerritory: 'Select a territory',
      nameRequired: 'Enter the building or village name',
      invalidNumber: 'Enter a valid number',
    },
    feedback: {
      loadError: 'Could not load the data',
      deleteSuccess: 'Record removed successfully',
      deleteError: 'Could not remove the record',
      updateSuccess: 'Record updated successfully',
      createSuccess: 'Record created successfully',
      saveError: 'Could not save the record',
    },
    confirmDelete: 'Do you really want to remove this record?',
  },
  k1 = {
    title: 'Letters',
    subtitle:
      'Review correspondence sent and responses grouped by responsible person.',
    summary:
      'Responsibles tracked: {{responsibles}} • Letters recorded: {{letters}}',
    loading: 'Loading correspondence...',
    empty: 'No correspondence has been recorded yet.',
    feedback: { loadError: 'Failed to load correspondence data' },
    groupSummary: 'Letters recorded: {{letters}} • Properties: {{buildings}}',
    contactMethods: 'Contact methods: {{methods}}',
    contactMethod: 'Preferred contact',
    history: 'History',
    noHistory: 'No letters recorded for this property.',
    unnamedBuilding: 'Unnamed building/village',
    unknownTerritory: 'Territory unknown',
  },
  S1 = {
    tabs: {
      streets: 'Streets',
      addresses: 'Addresses',
      propertyTypes: 'Property types',
      summary: 'Summary',
    },
    territorySelector: {
      label: 'Territory',
      placeholder: 'Select a territory',
    },
    streetsForm: { streetNamePlaceholder: 'Street name' },
    streetsTable: { name: 'Name' },
    addressesForm: {
      selectStreet: 'Select a street',
      selectType: 'Type',
      number: 'Number',
    },
    addressesTable: {
      street: 'Street',
      number: 'Number',
      type: 'Type',
      lastVisit: 'Last successful visit',
      nextVisit: 'Next visit allowed',
      actions: 'Actions',
      markVisit: 'Mark successful visit',
      neverVisited: 'Never visited',
      cooldownNotScheduled: 'No cooldown scheduled',
      cooldownActive: 'This address is locked until {{date}}.',
      cooldownTooltip: 'Next visit allowed on {{date}}',
      cooldownAlert:
        '{{count}} address cannot be revisited until its cooldown expires.',
      cooldownAlert_plural:
        '{{count}} addresses cannot be revisited until their cooldowns expire.',
    },
    propertyTypesForm: { namePlaceholder: 'Property type name' },
    propertyTypesTable: {
      name: 'Name',
      actions: 'Actions',
      empty: 'No property types registered.',
    },
    feedback: {
      loadError: 'Unable to load territories or property types.',
      createSuccess: 'Property type created successfully.',
      updateSuccess: 'Property type updated successfully.',
      deleteSuccess: 'Property type removed successfully.',
      saveError: 'Unable to save the property type.',
      deleteError: 'Unable to delete the property type.',
    },
    summary: {
      totalStreets: 'Total streets: {{count}}',
      totalAddresses: 'Total addresses: {{count}}',
      totalPropertyTypes: 'Total property types: {{count}}',
    },
  },
  N1 = {
    ativo: 'Active',
    devolvido: 'Returned',
    atrasado: 'Late',
    pendente: 'Pending',
    emAndamento: 'In progress',
    inativo: 'Inactive',
    arquivado: 'Archived',
  },
  E1 = {
    newExit: 'Create field exit',
    name: 'Name',
    namePlaceholder: 'E.g.: Saturday Morning Group',
    weekday: 'Weekday',
    time: 'Time',
    save: 'Save exit',
    exitsWithCount: 'Field exits ({{count}})',
    noExits: 'No exits registered.',
    confirmDelete: 'Delete exit?',
    delete: 'Delete',
  },
  j1 = {
    pageTitle: 'User management',
    form: {
      createTitle: 'New user',
      editTitle: 'Edit user',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      password: 'Password',
      passwordPlaceholder: 'Set a secure password',
      passwordConfirmation: 'Confirm password',
      passwordConfirmationPlaceholder: 'Repeat the password',
      passwordHint:
        'Fill both fields to set or update the password. Leave them blank to keep the current one.',
      passwordRequired: 'Please provide a password.',
      passwordMismatch: 'Passwords do not match.',
      namePlaceholder: 'Full name',
      emailPlaceholder: 'name@example.com',
      save: 'Save user',
      update: 'Update user',
      cancel: 'Cancel edit',
    },
    listTitle: 'Registered users ({{count}})',
    empty: 'No users registered.',
    noEmail: 'No email provided',
    actions: { edit: 'Edit', delete: 'Delete' },
    confirmDelete: 'Are you sure you want to remove {{name}}?',
    toast: {
      createSuccess: 'User saved',
      updateSuccess: 'User updated',
      deleteSuccess: 'User removed',
      saveError: 'Unable to save the user.',
    },
    roles: {
      admin_master: 'Admin master',
      admin: 'Administrator',
      manager: 'Manager',
      publisher: 'Publisher',
      viewer: 'Viewer',
    },
  },
  C1 = {
    createTerritory: 'Create Territory',
    editTerritory: 'Edit Territory',
    name: 'Name',
    namePlaceholder: 'E.g.: Territory 12 – Downtown',
    optionalImage: 'Image (optional)',
    saveTerritory: 'Save Territory',
    territoriesWithCount: 'Territories ({{count}})',
    searchPlaceholder: 'Search...',
    withImage: 'With image',
    noTerritories: 'No territories registered.',
    image: 'Image',
    noImagePlaceholder: '—',
    confirmDelete: 'Delete territory?',
    pageInfo: 'Page {{page}} of {{pageCount}}',
    validation: { nameRequired: 'Name is required' },
  },
  T1 = {
    selectExit: 'Select an exit',
    noAvailableTerritories: 'No territories available',
    selectTerritoryAndExit: 'Select territory and exit',
    newAssignment: 'New Assignment',
    territory: 'Territory',
    selectPlaceholder: 'Select…',
    exit: 'Exit',
    assignmentDate: 'Assignment date',
    returnDate: 'Return date',
    generateSuggestion: 'Generate suggestion',
    save: 'Save',
    assignmentsWithCount: 'Assignments ({{count}})',
    noAssignments: 'No assignments.',
    status: 'Status',
    reactivate: 'Reactivate',
    markAsReturned: 'Mark as returned',
    confirmDelete: 'Delete assignment?',
    delete: 'Delete',
  },
  A1 = {
    cards: { rules: 'Suggestion Rules', generated: 'Generated Suggestions' },
    actions: {
      saveDefaults: 'Save defaults',
      generate: 'Generate Suggestions',
      applyAll: 'Apply All',
      viewTour: 'View tour',
    },
    labels: {
      startDate: 'Start date',
      duration: 'Duration (days)',
      avoidCount: 'Avoid repetition (last N)',
      monthsPerExit: 'Repeat per exit (months)',
      recentWeight: 'Recency weight',
      balanceWeight: 'Exit load weight',
    },
    tooltips: {
      startDate: 'Starting date to generate suggestions',
      duration: 'Default assignment duration in days',
      avoidCount: 'Number of recent assignments to avoid repeating',
      monthsPerExit:
        'Minimum months before repeating the same territory in the same exit',
      recentWeight: 'Higher values penalize recently used territories',
      balanceWeight: 'Higher values balance exit workload',
    },
    messages: {
      waiting: 'Waiting for generation…',
      empty: 'No suggestions (check territories and exits).',
    },
    table: {
      exit: 'Exit',
      territory: 'Territory',
      start: 'Assignment',
      end: 'Return',
    },
    toast: {
      nothingToApply: 'Nothing to apply',
      applied: 'Suggestions applied',
    },
    tour: { progress: 'Step {{current}} of {{total}}', finish: 'Finish tour' },
    reasons: {
      exitLoad: 'Exit load {{value}}%',
      recent: 'Recent {{value}}%',
      neverUsed: 'Never used',
    },
  },
  I1 = {
    warningDays: 'Alert (days)',
    overdue: 'Overdue',
    dueIn: 'D-{{diff}}',
    noAssignments: 'No assignments.',
  },
  P1 = { title: 'Reports' },
  R1 = {
    updateAvailable: 'New version available. Update?',
    loading: 'Loading...',
    saving: 'Saving...',
    error: 'Something went wrong',
    success: 'Completed successfully',
    retry: 'Retry',
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied to clipboard',
    noData: 'No data available',
    search: 'Search',
    exportSuccess: 'Export file generated',
    exportError: 'Unable to export data',
    importSuccess: 'Data imported successfully',
    importError: 'Unable to import data',
    clearConfirm: 'Clear ALL data?',
    clearSuccess: 'Data cleared',
    clearError: 'Unable to clear data',
    theme: { light: 'Light', dark: 'Dark' },
  },
  D1 = {
    signIn: 'Sign in',
    signOut: 'Sign out',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    rememberMe: 'Remember me',
  },
  O1 = {
    title: 'Create your account',
    subtitle: 'Fill in the information below to create a new account.',
    cta: 'Create account',
    submit: 'Create account',
    submitting: 'Creating...',
    alreadyHaveAccount: 'Already have an account?',
    signInHint: 'Use the sign-in form in the header.',
    redirectMessage: 'Create an account or sign in to access {{from}}.',
    success: 'Account created successfully! You are now signed in.',
    fields: { name: 'Name', email: 'Email', password: 'Password' },
    errors: {
      nameRequired: 'Enter your name',
      emailInvalid: 'Enter a valid email address',
      emailTaken: 'This email is already associated with an account',
      passwordLength: 'Use at least {{min}} characters',
      generic: "We couldn't create your account. Please try again.",
    },
  },
  L1 = { english: 'English', portuguese: 'Portuguese', spanish: 'Spanish' },
  M1 = {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    view: 'View',
    update: 'Update',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    yes: 'Yes',
    no: 'No',
  },
  V1 = {
    filters: 'Filters',
    apply: 'Apply',
    clear: 'Clear',
    reset: 'Reset',
    from: 'From',
    to: 'To',
    all: 'All',
    status: 'Status',
  },
  F1 = {
    actions: 'Actions',
    rowsPerPage: 'Rows per page',
    of: 'of',
    empty: 'No records found',
  },
  $1 = {
    next: 'Next',
    previous: 'Previous',
    first: 'First',
    last: 'Last',
    page: 'Page',
    of: 'of',
  },
  U1 = { today: 'Today', yesterday: 'Yesterday', tomorrow: 'Tomorrow' },
  z1 = {
    required: 'This field is required',
    invalidEmail: 'Enter a valid email',
    minLength: 'Minimum length is {{min}}',
    maxLength: 'Maximum length is {{max}}',
  },
  B1 = {
    home: p1,
    about: m1,
    navbar: g1,
    confirm: y1,
    scheduler: v1,
    sidebar: x1,
    naoEmCasa: w1,
    viewerAssignments: b1,
    buildingsVillages: _1,
    letters: k1,
    ruasNumeracoes: S1,
    status: N1,
    exits: E1,
    users: j1,
    territories: C1,
    assignments: T1,
    suggestions: A1,
    calendar: I1,
    reports: P1,
    app: R1,
    auth: D1,
    register: O1,
    language: L1,
    common: M1,
    filters: V1,
    table: F1,
    pagination: $1,
    dates: U1,
    validation: z1,
  },
  K1 = {
    title: 'Inicio',
    today: 'Hoy es {{date}}',
    exampleNumber: 'Número de ejemplo: {{value}}',
  },
  H1 = { title: 'Acerca de' },
  W1 = {
    home: 'Inicio',
    about: 'Acerca de',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    dashboard: 'Panel',
  },
  q1 = {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    save: 'Guardar',
    yes: 'Sí',
    no: 'No',
    ok: 'Aceptar',
    continue: 'Continuar',
    areYouSure: '¿Está seguro?',
  },
  Z1 = {
    title: 'Exportación mensual',
    enable: 'Activar',
    disable: 'Desactivar',
    nextRun: 'Próxima ejecución:',
    lastRun: 'Última ejecución:',
    frequency: 'Frecuencia',
    daily: 'Diaria',
    weekly: 'Semanal',
    monthly: 'Mensual',
    time: 'Hora',
    runNow: 'Ejecutar ahora',
  },
  Q1 = {
    territories: 'Territorios',
    streets: 'Calles',
    buildingsVillages: 'Edificios y Villas',
    letters: 'Correspondencia',
    exits: 'Salidas',
    assignments: 'Asignaciones',
    todayAssignments: 'Asignaciones de hoy',
    calendar: 'Calendario',
    suggestions: 'Sugerencias',
    notAtHome: 'No en Casa',
    dashboard: 'Panel',
    reports: 'Informes',
    maps: 'Mapas',
    users: 'Usuarios',
    settings: 'Configuración',
    notifications: 'Notificaciones',
  },
  G1 = {
    title: 'No en Casa',
    todayAssignments: 'Territorios asignados para hoy ({{count}})',
    noAssignments: 'No hay territorios asignados para hoy.',
    miniMapAlt: 'Mapa del territorio {{name}}',
    noImage: 'Sin imagen disponible',
    addressesTitle: 'Direcciones',
    noAddresses: 'No hay direcciones registradas para este territorio.',
    table: {
      street: 'Calle',
      numbers: 'Números',
      type: 'Tipo',
      actions: 'Acciones',
    },
    residential: 'Residencial',
    commercial: 'Comercial',
    other: 'Otros',
    recordNotAtHome: 'Registrar ausencia',
    streetAddresses: '{{count}} dirección',
    streetAddresses_plural: '{{count}} direcciones',
    confirmConversation: 'Confirmar conversación ({{date}})',
    conversationConfirmedLabel: 'Conversación confirmada',
    scheduledFor: 'Visita programada para {{date}}',
    followUpsTitle: 'Visitas programadas ({{count}})',
    noFollowUps: 'No hay visitas pendientes.',
    followUpOn: 'Visitar el {{date}}',
    recordedOn: 'Registrado el {{date}}',
    markCompleted: 'Marcar como completado',
    unknownStreet: 'Calle desconocida',
    unknownType: 'Tipo desconocido',
    addressLabel: '{{street}} • n.º {{range}}',
  },
  Y1 = {
    title: 'Asignaciones de hoy',
    currentDate: 'Fecha de referencia: {{date}}',
    empty: 'No hay territorios asignados para hoy.',
    summary: 'Territorios activos hoy: {{count}}',
    assignmentRange: 'Periodo: {{start}} – {{end}}',
    exitLabel: 'Salida: {{name}}',
    returnBy: 'Devolver antes del {{date}}',
  },
  J1 = {
    title: 'Edificios y Villas',
    subtitle:
      'Registra, filtra y organiza información sobre edificios, villas y condominios del territorio.',
    newRecord: 'Nuevo registro',
    filters: {
      search: 'Buscar',
      searchPlaceholder: 'Nombre, responsable o dirección',
      territory: 'Territorio',
      type: 'Tipo',
      modality: 'Modalidad',
      allModalities: 'Todas',
    },
    records: {
      title: 'Registros',
      count: '{{count}} registro encontrado',
      count_plural: '{{count}} registros encontrados',
      loading: 'Cargando registros...',
      empty: 'Ningún registro encontrado con los filtros aplicados.',
      noName: 'Sin nombre',
      noTerritory: 'Territorio no informado',
    },
    fields: {
      territory: 'Territorio',
      name: 'Nombre',
      address: 'Dirección',
      number: 'Número',
      type: 'Tipo',
      modality: 'Modalidad',
      reception: 'Tipo de recepción',
      residences: 'Cantidad de residencias',
      responsible: 'Responsable',
      contactMethod: 'Método de contacto',
      letterStatus: 'Estado de la correspondencia',
      letterHistory: 'Historial de correspondencia',
      assignedAt: 'Asignado el',
      returnedAt: 'Devuelto el',
      block: 'Bloque',
      notes: 'Observaciones',
    },
    placeholders: {
      territory: 'Seleccione un territorio',
      name: 'Identificación del edificio o villa',
      address: 'Calle, avenida o referencia',
      number: 'Número de la propiedad',
      type: 'Edificio, villa, condominio...',
      modality: 'Condominio, villa cerrada...',
      reception: 'Portería, intercomunicador...',
      responsible: 'Nombre del síndico, portero...',
      contactMethod: 'Teléfono, correo, portería...',
      block: 'Identificación del bloque',
      notes: 'Detalles relevantes, horarios, instrucciones de acceso...',
    },
    letterStatus: {
      notSent: 'Ninguna carta enviada',
      inProgress: 'Correspondencia en curso',
      sent: 'Carta enviada',
      responded: 'Respuesta recibida',
      unknown: 'Estado desconocido',
    },
    letterHistory: {
      add: 'Agregar registro',
      empty: 'No se ha registrado correspondencia.',
      sentAt: 'Fecha de envío',
      status: 'Estado',
      remove: 'Eliminar',
      notes: 'Notas',
      notesPlaceholder: 'Resumen, respuesta, detalles de seguimiento...',
    },
    modal: {
      editTitle: 'Editar registro',
      createTitle: 'Nuevo registro',
      descriptionEdit:
        'Complete los campos abajo para actualizar el edificio o villa.',
      descriptionCreate:
        'Complete los campos abajo para registrar el edificio o villa.',
    },
    validation: {
      selectTerritory: 'Seleccione un territorio',
      nameRequired: 'Ingrese el nombre del edificio o villa',
      invalidNumber: 'Ingrese un número válido',
    },
    feedback: {
      loadError: 'No se pudieron cargar los datos',
      deleteSuccess: 'Registro eliminado con éxito',
      deleteError: 'No se pudo eliminar el registro',
      updateSuccess: 'Registro actualizado con éxito',
      createSuccess: 'Registro creado con éxito',
      saveError: 'No se pudo guardar el registro',
    },
    confirmDelete: '¿Desea realmente eliminar este registro?',
  },
  X1 = {
    title: 'Correspondencia',
    subtitle: 'Revisa cartas enviadas y respuestas agrupadas por responsable.',
    summary:
      'Responsables registrados: {{responsibles}} • Cartas registradas: {{letters}}',
    loading: 'Cargando correspondencia...',
    empty: 'Aún no se ha registrado correspondencia.',
    feedback: { loadError: 'No se pudo cargar la correspondencia' },
    groupSummary:
      'Cartas registradas: {{letters}} • Propiedades: {{buildings}}',
    contactMethods: 'Métodos de contacto: {{methods}}',
    contactMethod: 'Contacto preferido',
    history: 'Historial',
    noHistory: 'No hay cartas registradas para esta propiedad.',
    unnamedBuilding: 'Edificio/Villa sin nombre',
    unknownTerritory: 'Territorio desconocido',
  },
  eN = {
    tabs: {
      streets: 'Calles',
      addresses: 'Direcciones',
      propertyTypes: 'Tipos',
      summary: 'Resumen',
    },
    territorySelector: {
      label: 'Territorio',
      placeholder: 'Selecciona un territorio',
    },
    streetsForm: { streetNamePlaceholder: 'Nombre de la calle' },
    streetsTable: { name: 'Nombre' },
    addressesForm: {
      selectStreet: 'Selecciona una calle',
      selectType: 'Tipo',
      number: 'Número',
    },
    addressesTable: {
      street: 'Calle',
      number: 'Número',
      type: 'Tipo',
      lastVisit: 'Última visita exitosa',
      nextVisit: 'Próxima visita permitida',
      actions: 'Acciones',
      markVisit: 'Marcar visita exitosa',
      neverVisited: 'Nunca visitado',
      cooldownNotScheduled: 'Sin bloqueo activo',
      cooldownActive: 'Esta dirección está bloqueada hasta {{date}}.',
      cooldownTooltip: 'Próxima visita permitida el {{date}}',
      cooldownAlert:
        '{{count}} dirección está bloqueada hasta que termine el periodo de espera.',
      cooldownAlert_plural:
        '{{count}} direcciones están bloqueadas hasta que termine el periodo de espera.',
    },
    propertyTypesForm: { namePlaceholder: 'Nombre del tipo de propiedad' },
    propertyTypesTable: {
      name: 'Nombre',
      actions: 'Acciones',
      empty: 'Ningún tipo registrado.',
    },
    feedback: {
      loadError:
        'No se pudieron cargar los territorios o los tipos de propiedad.',
      createSuccess: 'Tipo de propiedad creado correctamente.',
      updateSuccess: 'Tipo de propiedad actualizado correctamente.',
      deleteSuccess: 'Tipo de propiedad eliminado correctamente.',
      saveError: 'No se pudo guardar el tipo de propiedad.',
      deleteError: 'No se pudo eliminar el tipo de propiedad.',
    },
    summary: {
      totalStreets: 'Total de calles: {{count}}',
      totalAddresses: 'Total de direcciones: {{count}}',
      totalPropertyTypes: 'Total de tipos de propiedad: {{count}}',
    },
  },
  tN = {
    ativo: 'Activo',
    devolvido: 'Devuelto',
    atrasado: 'Atrasado',
    pendente: 'Pendiente',
    emAndamento: 'En curso',
    inativo: 'Inactivo',
    arquivado: 'Archivado',
  },
  rN = {
    newExit: 'Registrar salida de campo',
    name: 'Nombre',
    namePlaceholder: 'Ej.: Grupo Sábado Mañana',
    weekday: 'Día de la semana',
    time: 'Horario',
    save: 'Guardar salida',
    exitsWithCount: 'Salidas ({{count}})',
    noExits: 'Ninguna salida registrada.',
    confirmDelete: '¿Eliminar salida?',
    delete: 'Eliminar',
  },
  nN = {
    pageTitle: 'Gestión de usuarios',
    form: {
      createTitle: 'Nuevo usuario',
      editTitle: 'Editar usuario',
      name: 'Nombre',
      email: 'Correo electrónico',
      role: 'Rol',
      password: 'Contraseña',
      passwordPlaceholder: 'Define una contraseña segura',
      passwordConfirmation: 'Confirmar contraseña',
      passwordConfirmationPlaceholder: 'Repite la contraseña',
      passwordHint:
        'Completa ambos campos para definir o actualizar la contraseña. Déjalos en blanco para mantener la actual.',
      passwordRequired: 'Ingresa una contraseña.',
      passwordMismatch: 'Las contraseñas no coinciden.',
      namePlaceholder: 'Nombre completo',
      emailPlaceholder: 'nombre@ejemplo.com',
      save: 'Guardar usuario',
      update: 'Actualizar usuario',
      cancel: 'Cancelar edición',
    },
    listTitle: 'Usuarios registrados ({{count}})',
    empty: 'No hay usuarios registrados.',
    noEmail: 'Sin correo electrónico',
    actions: { edit: 'Editar', delete: 'Eliminar' },
    confirmDelete: '¿Desea eliminar a {{name}}?',
    toast: {
      createSuccess: 'Usuario guardado',
      updateSuccess: 'Usuario actualizado',
      deleteSuccess: 'Usuario eliminado',
      saveError: 'No se pudo guardar el usuario.',
    },
    roles: {
      admin_master: 'Administrador maestro',
      admin: 'Administrador',
      manager: 'Gestor',
      publisher: 'Publicador',
      viewer: 'Lector',
    },
  },
  sN = {
    createTerritory: 'Registrar territorio',
    editTerritory: 'Editar territorio',
    name: 'Nombre',
    namePlaceholder: 'Ej.: Territorio 12 – Centro',
    optionalImage: 'Imagen (opcional)',
    saveTerritory: 'Guardar territorio',
    territoriesWithCount: 'Territorios ({{count}})',
    searchPlaceholder: 'Buscar...',
    withImage: 'Con imagen',
    noTerritories: 'Ningún territorio registrado.',
    image: 'Imagen',
    noImagePlaceholder: '—',
    confirmDelete: '¿Eliminar territorio?',
    pageInfo: 'Página {{page}} de {{pageCount}}',
    validation: { nameRequired: 'Nombre obligatorio' },
  },
  aN = {
    selectExit: 'Seleccione una salida',
    noAvailableTerritories: 'No hay territorios disponibles',
    selectTerritoryAndExit: 'Seleccione territorio y salida',
    newAssignment: 'Nueva Asignación',
    territory: 'Territorio',
    selectPlaceholder: 'Seleccione…',
    exit: 'Salida',
    assignmentDate: 'Fecha de asignación',
    returnDate: 'Fecha de devolución',
    generateSuggestion: 'Generar sugerencia',
    save: 'Guardar',
    assignmentsWithCount: 'Asignaciones ({{count}})',
    noAssignments: 'Sin asignaciones.',
    status: 'Estado',
    reactivate: 'Reactivar',
    markAsReturned: 'Marcar como devuelto',
    confirmDelete: '¿Eliminar asignación?',
    delete: 'Eliminar',
  },
  iN = {
    cards: {
      rules: 'Reglas de sugerencias',
      generated: 'Sugerencias generadas',
    },
    actions: {
      saveDefaults: 'Guardar valores predeterminados',
      generate: 'Generar sugerencias',
      applyAll: 'Aplicar todo',
      viewTour: 'Ver tour',
    },
    labels: {
      startDate: 'Fecha inicial',
      duration: 'Duración (días)',
      avoidCount: 'Evitar repetición (últimas N)',
      monthsPerExit: 'Repetición por salida (meses)',
      recentWeight: 'Peso de recencia',
      balanceWeight: 'Peso de carga por salida',
    },
    tooltips: {
      startDate: 'Fecha inicial para generar las sugerencias',
      duration: 'Duración predeterminada de las asignaciones en días',
      avoidCount: 'Cantidad de asignaciones recientes a evitar repetir',
      monthsPerExit:
        'Tiempo mínimo en meses antes de repetir el mismo territorio en la misma salida',
      recentWeight:
        'Los valores mayores penalizan a los territorios usados recientemente',
      balanceWeight: 'Los valores mayores equilibran la carga entre salidas',
    },
    messages: {
      waiting: 'Esperando la generación…',
      empty: 'Sin sugerencias (verifique los territorios y salidas).',
    },
    table: {
      exit: 'Salida',
      territory: 'Territorio',
      start: 'Asignación',
      end: 'Devolución',
    },
    toast: {
      nothingToApply: 'Nada que aplicar',
      applied: 'Sugerencias aplicadas',
    },
    tour: {
      progress: 'Paso {{current}} de {{total}}',
      finish: 'Finalizar tour',
    },
    reasons: {
      exitLoad: 'Carga de salida {{value}}%',
      recent: 'Reciente {{value}}%',
      neverUsed: 'Nunca usado',
    },
  },
  oN = {
    warningDays: 'Alerta (días)',
    overdue: 'Atrasado',
    dueIn: 'D-{{diff}}',
    noAssignments: 'Sin asignaciones.',
  },
  lN = { title: 'Informes' },
  uN = {
    updateAvailable: 'Nueva versión disponible. ¿Actualizar?',
    loading: 'Cargando...',
    saving: 'Guardando...',
    error: 'Algo salió mal',
    success: 'Completado con éxito',
    retry: 'Intentar de nuevo',
    close: 'Cerrar',
    copy: 'Copiar',
    copied: 'Copiado al portapapeles',
    noData: 'No hay datos disponibles',
    search: 'Buscar',
    exportSuccess: 'Archivo de exportación generado',
    exportError: 'No se pudieron exportar los datos',
    importSuccess: 'Datos importados con éxito',
    importError: 'No se pudieron importar los datos',
    clearConfirm: '¿Borrar TODOS los datos?',
    clearSuccess: 'Datos borrados',
    clearError: 'No se pudieron borrar los datos',
    theme: { light: 'Claro', dark: 'Oscuro' },
  },
  cN = {
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    email: 'Correo electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    rememberMe: 'Recordarme',
  },
  dN = { english: 'Inglés', portuguese: 'Portugués', spanish: 'Español' },
  fN = {
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    view: 'Ver',
    update: 'Actualizar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    yes: 'Sí',
    no: 'No',
  },
  hN = {
    filters: 'Filtros',
    apply: 'Aplicar',
    clear: 'Limpiar',
    reset: 'Restablecer',
    from: 'Desde',
    to: 'Hasta',
    all: 'Todos',
    status: 'Estado',
  },
  pN = {
    actions: 'Acciones',
    rowsPerPage: 'Filas por página',
    of: 'de',
    empty: 'No se encontró ningún registro',
  },
  mN = {
    next: 'Siguiente',
    previous: 'Anterior',
    first: 'Primera',
    last: 'Última',
    page: 'Página',
    of: 'de',
  },
  gN = { today: 'Hoy', yesterday: 'Ayer', tomorrow: 'Mañana' },
  yN = {
    required: 'Este campo es obligatorio',
    invalidEmail: 'Introduce un correo electrónico válido',
    minLength: 'La longitud mínima es {{min}}',
    maxLength: 'La longitud máxima es {{max}}',
  },
  vN = {
    home: K1,
    about: H1,
    navbar: W1,
    confirm: q1,
    scheduler: Z1,
    sidebar: Q1,
    naoEmCasa: G1,
    viewerAssignments: Y1,
    buildingsVillages: J1,
    letters: X1,
    ruasNumeracoes: eN,
    status: tN,
    exits: rN,
    users: nN,
    territories: sN,
    assignments: aN,
    suggestions: iN,
    calendar: oN,
    reports: lN,
    app: uN,
    auth: cN,
    language: dN,
    common: fN,
    filters: hN,
    table: pN,
    pagination: mN,
    dates: gN,
    validation: yN,
  },
  xN = {
    title: 'Início',
    today: 'Hoje é {{date}}',
    exampleNumber: 'Número de exemplo: {{value}}',
  },
  wN = { title: 'Sobre' },
  bN = {
    home: 'Início',
    about: 'Sobre',
    settings: 'Configurações',
    profile: 'Perfil',
    logout: 'Sair',
    dashboard: 'Painel',
  },
  _N = {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Excluir',
    save: 'Salvar',
    yes: 'Sim',
    no: 'Não',
    ok: 'OK',
    continue: 'Continuar',
    areYouSure: 'Tem certeza?',
  },
  kN = {
    title: 'Exportação mensal',
    enable: 'Ativar',
    disable: 'Desativar',
    nextRun: 'Próxima execução:',
    lastRun: 'Última execução:',
    frequency: 'Frequência',
    daily: 'Diária',
    weekly: 'Semanal',
    monthly: 'Mensal',
    time: 'Hora',
    runNow: 'Executar agora',
  },
  SN = {
    territories: 'Territórios',
    streets: 'Ruas',
    buildingsVillages: 'Prédios & Vilas',
    letters: 'Cartas',
    exits: 'Saídas',
    assignments: 'Designações',
    todayAssignments: 'Designações do dia',
    calendar: 'Calendário',
    suggestions: 'Sugestões',
    notAtHome: 'Não em Casa',
    dashboard: 'Painel',
    reports: 'Relatórios',
    maps: 'Mapas',
    users: 'Usuários',
    settings: 'Configurações',
    notifications: 'Notificações',
  },
  NN = {
    title: 'Não em Casa',
    todayAssignments: 'Territórios designados para hoje ({{count}})',
    noAssignments: 'Nenhum território designado para hoje.',
    miniMapAlt: 'Mapa do território {{name}}',
    noImage: 'Sem imagem disponível',
    addressesTitle: 'Endereços',
    noAddresses: 'Nenhum endereço cadastrado para este território.',
    table: {
      street: 'Rua',
      numbers: 'Números',
      type: 'Tipo',
      actions: 'Ações',
    },
    residential: 'Residencial',
    commercial: 'Comercial',
    other: 'Outros',
    recordNotAtHome: 'Registrar ausência',
    streetAddresses: '{{count}} endereço',
    streetAddresses_plural: '{{count}} endereços',
    confirmConversation: 'Confirmar conversa ({{date}})',
    conversationConfirmedLabel: 'Conversa confirmada',
    scheduledFor: 'Retorno agendado para {{date}}',
    followUpsTitle: 'Retornos agendados ({{count}})',
    noFollowUps: 'Nenhum retorno pendente.',
    followUpOn: 'Retornar em {{date}}',
    recordedOn: 'Registrado em {{date}}',
    markCompleted: 'Marcar como concluído',
    unknownStreet: 'Rua não informada',
    unknownType: 'Tipo não informado',
    addressLabel: '{{street}} • nº {{range}}',
  },
  EN = {
    title: 'Designações do dia',
    currentDate: 'Data de referência: {{date}}',
    empty: 'Nenhum território designado para hoje.',
    summary: 'Total de territórios ativos hoje: {{count}}',
    assignmentRange: 'Período: {{start}} – {{end}}',
    exitLabel: 'Saída: {{name}}',
    returnBy: 'Devolver até {{date}}',
  },
  jN = {
    title: 'Prédios e Vilas',
    subtitle:
      'Cadastre, filtre e organize informações sobre prédios, vilas e condomínios do território.',
    newRecord: 'Novo registro',
    filters: {
      search: 'Buscar',
      searchPlaceholder: 'Nome, responsável ou endereço',
      territory: 'Território',
      type: 'Tipo',
      modality: 'Modalidade',
      allModalities: 'Todas',
    },
    records: {
      title: 'Registros',
      count: '{{count}} registro encontrado',
      count_plural: '{{count}} registros encontrados',
      loading: 'Carregando registros...',
      empty: 'Nenhum registro encontrado com os filtros aplicados.',
      noName: 'Sem nome',
      noTerritory: 'Território não informado',
    },
    fields: {
      territory: 'Território',
      name: 'Nome',
      address: 'Endereço',
      number: 'Número',
      type: 'Tipo',
      modality: 'Modalidade',
      reception: 'Tipo de recepção',
      residences: 'Quantidade de residências',
      responsible: 'Responsável',
      contactMethod: 'Método de contato',
      letterStatus: 'Status da correspondência',
      letterHistory: 'Histórico de correspondências',
      assignedAt: 'Designado em',
      returnedAt: 'Devolvido em',
      block: 'Bloco',
      notes: 'Observações',
    },
    placeholders: {
      territory: 'Selecione um território',
      name: 'Identificação do prédio ou vila',
      address: 'Rua, avenida ou referência',
      number: 'Número do imóvel',
      type: 'Prédio, vila, condomínio...',
      modality: 'Condomínio, vila fechada...',
      reception: 'Portaria, interfone...',
      responsible: 'Nome do síndico, porteiro...',
      contactMethod: 'Telefone, e-mail, portaria...',
      block: 'Identificação do bloco',
      notes: 'Detalhes relevantes, horários, instruções de acesso...',
    },
    letterStatus: {
      notSent: 'Nenhuma carta enviada',
      inProgress: 'Correspondência em andamento',
      sent: 'Carta enviada',
      responded: 'Resposta recebida',
      unknown: 'Status não informado',
    },
    letterHistory: {
      add: 'Adicionar registro',
      empty: 'Nenhuma correspondência registrada.',
      sentAt: 'Data de envio',
      status: 'Status',
      remove: 'Remover',
      notes: 'Anotações',
      notesPlaceholder: 'Resumo do conteúdo, resposta recebida...',
    },
    modal: {
      editTitle: 'Editar registro',
      createTitle: 'Novo registro',
      descriptionEdit:
        'Preencha os campos abaixo para atualizar o prédio ou vila.',
      descriptionCreate:
        'Preencha os campos abaixo para cadastrar o prédio ou vila.',
    },
    validation: {
      selectTerritory: 'Selecione um território',
      nameRequired: 'Informe o nome do prédio ou vila',
      invalidNumber: 'Informe um número válido',
    },
    feedback: {
      loadError: 'Não foi possível carregar os dados',
      deleteSuccess: 'Registro removido com sucesso',
      deleteError: 'Não foi possível remover o registro',
      updateSuccess: 'Registro atualizado com sucesso',
      createSuccess: 'Registro criado com sucesso',
      saveError: 'Não foi possível salvar o registro',
    },
    confirmDelete: 'Deseja realmente remover este registro?',
  },
  CN = {
    title: 'Correspondências',
    subtitle: 'Acompanhe cartas enviadas e respostas por responsável.',
    summary:
      'Responsáveis acompanhados: {{responsibles}} • Cartas registradas: {{letters}}',
    loading: 'Carregando correspondências...',
    empty: 'Nenhuma correspondência registrada até o momento.',
    feedback: { loadError: 'Não foi possível carregar as correspondências' },
    groupSummary: 'Cartas registradas: {{letters}} • Imóveis: {{buildings}}',
    contactMethods: 'Métodos de contato: {{methods}}',
    contactMethod: 'Contato preferencial',
    history: 'Histórico',
    noHistory: 'Nenhuma carta registrada para este imóvel.',
    unnamedBuilding: 'Prédio/Vila sem nome',
    unknownTerritory: 'Território não identificado',
  },
  TN = {
    tabs: {
      streets: 'Ruas',
      addresses: 'Endereços',
      propertyTypes: 'Tipos',
      summary: 'Resumo',
    },
    territorySelector: {
      label: 'Território',
      placeholder: 'Selecione um território',
    },
    streetsForm: { streetNamePlaceholder: 'Nome da rua' },
    streetsTable: { name: 'Nome' },
    addressesForm: {
      selectStreet: 'Selecione a rua',
      selectType: 'Tipo',
      number: 'Número',
    },
    addressesTable: {
      street: 'Rua',
      number: 'Número',
      type: 'Tipo',
      lastVisit: 'Última visita bem-sucedida',
      nextVisit: 'Próxima visita liberada',
      actions: 'Ações',
      markVisit: 'Marcar visita bem-sucedida',
      neverVisited: 'Nunca visitado',
      cooldownNotScheduled: 'Sem bloqueio ativo',
      cooldownActive: 'Este endereço está bloqueado até {{date}}.',
      cooldownTooltip: 'Próxima visita liberada em {{date}}',
      cooldownAlert:
        '{{count}} endereço está bloqueado até o fim do período de resfriamento.',
      cooldownAlert_plural:
        '{{count}} endereços estão bloqueados até o fim do período de resfriamento.',
    },
    propertyTypesForm: { namePlaceholder: 'Nome do tipo de propriedade' },
    propertyTypesTable: {
      name: 'Nome',
      actions: 'Ações',
      empty: 'Nenhum tipo cadastrado.',
    },
    feedback: {
      loadError:
        'Não foi possível carregar territórios ou tipos de propriedade.',
      createSuccess: 'Tipo de propriedade criado com sucesso.',
      updateSuccess: 'Tipo de propriedade atualizado com sucesso.',
      deleteSuccess: 'Tipo de propriedade removido com sucesso.',
      saveError: 'Não foi possível salvar o tipo de propriedade.',
      deleteError: 'Não foi possível remover o tipo de propriedade.',
    },
    summary: {
      totalStreets: 'Total de ruas: {{count}}',
      totalAddresses: 'Total de endereços: {{count}}',
      totalPropertyTypes: 'Total de tipos de propriedade: {{count}}',
    },
  },
  AN = {
    ativo: 'Ativo',
    devolvido: 'Devolvido',
    atrasado: 'Atrasado',
    pendente: 'Pendente',
    emAndamento: 'Em andamento',
    inativo: 'Inativo',
    arquivado: 'Arquivado',
  },
  IN = {
    newExit: 'Cadastrar Saída de Campo',
    name: 'Nome',
    namePlaceholder: 'Ex.: Grupo Sábado Manhã',
    weekday: 'Dia da Semana',
    time: 'Horário',
    save: 'Salvar Saída',
    exitsWithCount: 'Saídas ({{count}})',
    noExits: 'Nenhuma saída cadastrada.',
    confirmDelete: 'Excluir saída?',
    delete: 'Excluir',
  },
  PN = {
    pageTitle: 'Gerenciamento de usuários',
    form: {
      createTitle: 'Novo usuário',
      editTitle: 'Editar usuário',
      name: 'Nome',
      email: 'E-mail',
      role: 'Papel',
      password: 'Senha',
      passwordPlaceholder: 'Defina uma senha segura',
      passwordConfirmation: 'Confirmar senha',
      passwordConfirmationPlaceholder: 'Repita a senha',
      passwordHint:
        'Preencha ambos os campos para definir ou alterar a senha. Deixe em branco para manter a atual.',
      passwordRequired: 'Informe uma senha.',
      passwordMismatch: 'As senhas não coincidem.',
      namePlaceholder: 'Nome completo',
      emailPlaceholder: 'nome@exemplo.com',
      save: 'Salvar usuário',
      update: 'Atualizar usuário',
      cancel: 'Cancelar edição',
    },
    listTitle: 'Usuários cadastrados ({{count}})',
    empty: 'Nenhum usuário cadastrado.',
    noEmail: 'Nenhum e-mail informado',
    actions: { edit: 'Editar', delete: 'Excluir' },
    confirmDelete: 'Deseja realmente remover {{name}}?',
    toast: {
      createSuccess: 'Usuário salvo',
      updateSuccess: 'Usuário atualizado',
      deleteSuccess: 'Usuário removido',
      saveError: 'Não foi possível salvar o usuário.',
    },
    roles: {
      admin_master: 'Admin master',
      admin: 'Administrador',
      manager: 'Gerente',
      publisher: 'Publicador',
      viewer: 'Leitor',
    },
  },
  RN = {
    createTerritory: 'Cadastrar Território',
    editTerritory: 'Editar Território',
    name: 'Nome',
    namePlaceholder: 'Ex.: Território 12 – Centro',
    optionalImage: 'Imagem (opcional)',
    saveTerritory: 'Salvar Território',
    territoriesWithCount: 'Territórios ({{count}})',
    searchPlaceholder: 'Buscar...',
    withImage: 'Com imagem',
    noTerritories: 'Nenhum território cadastrado.',
    image: 'Imagem',
    noImagePlaceholder: '—',
    confirmDelete: 'Excluir território?',
    pageInfo: 'Página {{page}} de {{pageCount}}',
    validation: { nameRequired: 'Nome obrigatório' },
  },
  DN = {
    selectExit: 'Selecione uma saída',
    noAvailableTerritories: 'Sem territórios disponíveis',
    selectTerritoryAndExit: 'Selecione território e saída',
    newAssignment: 'Nova Designação',
    territory: 'Território',
    selectPlaceholder: 'Selecione…',
    exit: 'Saída',
    assignmentDate: 'Data Designação',
    returnDate: 'Data Devolução',
    generateSuggestion: 'Gerar sugestão',
    save: 'Salvar',
    assignmentsWithCount: 'Designações ({{count}})',
    noAssignments: 'Sem designações.',
    status: 'Status',
    reactivate: 'Reativar',
    markAsReturned: 'Devolver',
    confirmDelete: 'Excluir designação?',
    delete: 'Excluir',
  },
  ON = {
    cards: { rules: 'Regras de sugestão', generated: 'Sugestões geradas' },
    actions: {
      saveDefaults: 'Salvar padrões',
      generate: 'Gerar sugestões',
      applyAll: 'Aplicar tudo',
      viewTour: 'Ver tour',
    },
    labels: {
      startDate: 'Data inicial',
      duration: 'Duração (dias)',
      avoidCount: 'Evitar repetição (últimas N)',
      monthsPerExit: 'Repetição por saída (meses)',
      recentWeight: 'Peso recência',
      balanceWeight: 'Peso carga saída',
    },
    tooltips: {
      startDate: 'Data inicial para geração das sugestões',
      duration: 'Duração padrão das designações em dias',
      avoidCount:
        'Número de últimas designações consideradas para evitar repetição',
      monthsPerExit:
        'Tempo mínimo em meses antes de repetir o mesmo território na mesma saída',
      recentWeight:
        'Quanto maior, mais penaliza territórios usados recentemente',
      balanceWeight: 'Quanto maior, mais equilibrada a carga entre saídas',
    },
    messages: {
      waiting: 'Aguardando geração…',
      empty: 'Sem sugestões (verifique se há territórios e saídas).',
    },
    table: {
      exit: 'Saída',
      territory: 'Território',
      start: 'Designação',
      end: 'Devolução',
    },
    toast: {
      nothingToApply: 'Nada para aplicar',
      applied: 'Designações aplicadas',
    },
    tour: {
      progress: 'Passo {{current}} de {{total}}',
      finish: 'Finalizar tour',
    },
    reasons: {
      exitLoad: 'Carga saída {{value}}%',
      recent: 'Recente {{value}}%',
      neverUsed: 'Nunca usado',
    },
  },
  LN = {
    warningDays: 'Alerta (dias)',
    overdue: 'Atrasado',
    dueIn: 'D-{{diff}}',
    noAssignments: 'Sem designações.',
  },
  MN = { title: 'Relatórios' },
  VN = {
    updateAvailable: 'Nova versão disponível. Atualizar?',
    loading: 'Carregando...',
    saving: 'Salvando...',
    error: 'Algo deu errado',
    success: 'Concluído com sucesso',
    retry: 'Tentar novamente',
    close: 'Fechar',
    copy: 'Copiar',
    copied: 'Copiado para a área de transferência',
    noData: 'Nenhum dado disponível',
    search: 'Pesquisar',
    exportSuccess: 'Arquivo de exportação gerado',
    exportError: 'Não foi possível exportar os dados',
    importSuccess: 'Dados importados com sucesso',
    importError: 'Não foi possível importar os dados',
    clearConfirm: 'Limpar TODOS os dados?',
    clearSuccess: 'Dados limpos',
    clearError: 'Não foi possível limpar os dados',
    theme: { light: 'Claro', dark: 'Escuro' },
  },
  FN = {
    signIn: 'Entrar',
    signOut: 'Sair',
    email: 'E-mail',
    password: 'Senha',
    forgotPassword: 'Esqueceu sua senha?',
    rememberMe: 'Lembrar-me',
  },
  $N = {
    title: 'Crie sua conta',
    subtitle: 'Preencha os dados abaixo para criar uma nova conta.',
    cta: 'Criar conta',
    submit: 'Criar conta',
    submitting: 'Criando...',
    alreadyHaveAccount: 'Já possui uma conta?',
    signInHint: 'Use o formulário de acesso no topo da página.',
    redirectMessage: 'Crie uma conta ou faça login para acessar {{from}}.',
    success: 'Conta criada com sucesso! Você já está autenticado.',
    fields: { name: 'Nome', email: 'E-mail', password: 'Senha' },
    errors: {
      nameRequired: 'Informe seu nome',
      emailInvalid: 'Informe um e-mail válido',
      emailTaken: 'Este e-mail já está associado a uma conta',
      passwordLength: 'Utilize pelo menos {{min}} caracteres',
      generic: 'Não foi possível criar sua conta. Tente novamente.',
    },
  },
  UN = { english: 'Inglês', portuguese: 'Português', spanish: 'Espanhol' },
  zN = {
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    create: 'Criar',
    view: 'Visualizar',
    update: 'Atualizar',
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    yes: 'Sim',
    no: 'Não',
  },
  BN = {
    filters: 'Filtros',
    apply: 'Aplicar',
    clear: 'Limpar',
    reset: 'Redefinir',
    from: 'De',
    to: 'Até',
    all: 'Todos',
    status: 'Status',
  },
  KN = {
    actions: 'Ações',
    rowsPerPage: 'Linhas por página',
    of: 'de',
    empty: 'Nenhum registro encontrado',
  },
  HN = {
    next: 'Próximo',
    previous: 'Anterior',
    first: 'Primeira',
    last: 'Última',
    page: 'Página',
    of: 'de',
  },
  WN = { today: 'Hoje', yesterday: 'Ontem', tomorrow: 'Amanhã' },
  qN = {
    required: 'Este campo é obrigatório',
    invalidEmail: 'Digite um e-mail válido',
    minLength: 'O comprimento mínimo é {{min}}',
    maxLength: 'O comprimento máximo é {{max}}',
  },
  ZN = {
    home: xN,
    about: wN,
    navbar: bN,
    confirm: _N,
    scheduler: kN,
    sidebar: SN,
    naoEmCasa: NN,
    viewerAssignments: EN,
    buildingsVillages: jN,
    letters: CN,
    ruasNumeracoes: TN,
    status: AN,
    exits: IN,
    users: PN,
    territories: RN,
    assignments: DN,
    suggestions: ON,
    calendar: LN,
    reports: MN,
    app: VN,
    auth: FN,
    register: $N,
    language: UN,
    common: zN,
    filters: BN,
    table: KN,
    pagination: HN,
    dates: WN,
    validation: qN,
  },
  QN = typeof window < 'u' ? localStorage.getItem('locale') : null;
ot.use(Gw).init({
  resources: {
    'en-US': { translation: B1 },
    'es-ES': { translation: vN },
    'pt-BR': { translation: ZN },
  },
  lng: QN || 'en-US',
  fallbackLng: 'en-US',
  interpolation: { escapeValue: !1 },
});
if ('serviceWorker' in navigator) {
  let e = !1;
  (window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(async (t) => {
      if (
        ((t.onupdatefound = () => {
          const r = t.installing;
          r &&
            r.addEventListener('statechange', () => {
              r.state === 'installed' &&
                navigator.serviceWorker.controller &&
                confirm(ot.t('app.updateAvailable')) &&
                r.postMessage({ type: 'SKIP_WAITING' });
            });
        }),
        'Notification' in window &&
          (await Notification.requestPermission()) === 'granted')
      ) {
        const n =
          (await t.pushManager.getSubscription()) ||
          (await t.pushManager.subscribe({ userVisibleOnly: !0 }));
        localStorage.setItem('pushEndpoint', n.endpoint);
      }
    });
  }),
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      e || (window.location.reload(), (e = !0));
    }));
}
async function GN() {
  try {
    await o_();
  } catch (e) {
    console.error('Failed to initialize the IndexedDB schema', e);
  }
  Uu.createRoot(document.getElementById('root')).render(
    u.jsx(ye.StrictMode, {
      children: u.jsx(Nv, {
        children: u.jsx(g_, {
          children: u.jsx(C_, { children: u.jsx(qS, {}) }),
        }),
      }),
    }),
  );
}
GN();
const YN = Object.freeze(
  Object.defineProperty({ __proto__: null }, Symbol.toStringTag, {
    value: 'Module',
  }),
);
