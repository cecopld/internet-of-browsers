function noop() {}

function flatten(t, n) {
  var e = {};
  return $.each(n, function(n, r) {
    e[t + "_" + n] = r
  }), e
}

function hsl_basic(t, n, e) {
  return t %= 360, "hsl(" + Math.round(t) + ", " + Math.round(100 * n) + "%, " + 100 * e + "%)"
}

function mod(t, n) {
  return (t % n + n) % n
}

function state(t, n, e, r) {
  var i = r || {};
  states[t] = {
    enter: (n || noop).bind(i),
    exit: (e || noop).bind(i)
  }
}

function ping(t, n) {
  var e = 1e-4,
    r = context.createOscillator();
  r.frequency.value = Math.round(t);
  var i = context.createGain();
  i.gain.value = e, now = context.currentTime, i.gain.cancelScheduledValues(now), i.gain.exponentialRampToValueAtTime(n || .9, now + .25), i.gain.exponentialRampToValueAtTime(e, now + 1), i.gain.setTargetAtTime(e, now + 2, e), r.connect(i), i.connect(context.destination), r.start(0), setTimeout(function() {
    r.stop(0), r.disconnect(), i.disconnect()
  }, 2500)
}

function action(t) {
  function n(t, n, e, r, i) {
    var o = parseFloat(i.timings_x),
      a = parseFloat(i.timings_y);
    console.log(o, a);
    var u = Math.sqrt(Math.pow(t - o, 2) + Math.pow(n - a, 2)),
      s = Math.sqrt(Math.pow(e - o, 2) + Math.pow(r - a, 2));
    return u / (u + s)
  }
  var e = t.slice(0);
  if (13 !== e.length) return console.log("wrong length - big problem");
  if (!features.timings_offset) return console.log("no offset - big problem");
  var r = e.shift(),
    i = window.performance.now() - features.timings_offset,
    o = r - i;
  $("#content").fadeOut();
  var a = n(e[0], e[1], e[2], e[3], features),
    u = n(e[2], e[3], e[4], e[5], features),
    s = n(e[4], e[5], e[6], e[7], features),
    c = n(e[6], e[7], e[8], e[9], features),
    l = n(e[8], e[9], e[10], e[11], features),
    f = 1e4;
  setTimeout(function() {
    ping(3e3 * a + 400), $("body").css("background", "hsl(" + 360 * a + ", 50%, 50%)")
  }, 1e4 * a - o + f), console.log(1e4 * a), setTimeout(function() {
    ping(3e3 * u + 400), $("body").css("background", "hsl(" + 360 * u + ", 50%, 50%)")
  }, 1e4 * u + 12e3 - o + f), console.log(1e4 * u + 12e3), setTimeout(function() {
    ping(3e3 * s + 400), $("body").css("background", "hsl(" + 360 * s + ", 50%, 50%)")
  }, 1e4 * s + 24e3 - o + f), console.log(1e4 * s + 24e3), setTimeout(function() {
    ping(3e3 * c + 400), $("body").css("background", "hsl(" + 360 * c + ", 50%, 50%)")
  }, 1e4 * c + 36e3 - o + f), console.log(1e4 * c + 36e3), setTimeout(function() {
    ping(3e3 * l + 400), $("body").css("background", "#fff"), $("#content").fadeIn()
  }, 1e4 * l + 48e3 - o + f), console.log(1e4 * l + 48e3)
}

function rate(t, n, e, r) {
  function i(r) {
    if (r = r || window.performance.now(), u > r - t && requestAnimationFrame(i), !(u > r)) {
      var l = o(r);
      s = l * n / 1e3, c(s) && (e(l), c = a(s))
    }
  }

  function o(n) {
    var e = (n - u) / t,
      r = -(.5 * Math.cos(e * Math.PI * 2)) + .5;
    return .001 > r ? .001 : r
  }

  function a() {
    var t = window.performance.now(),
      n = Math.random();
    return function(e) {
      var r = -Math.log(1 - n) / e;
      return r + t < window.performance.now()
    }
  }
  r = r || 0;
  var u = window.performance.now() + r,
    s = 0,
    c = a(s);
  i()
}

function ratePing() {
  rate(15e3, 1, function(t) {
    ping(440, .6 * t + .1)
  })
}

function rateRook() {
  var t = 1e4 - 1e3 * (data.timings_r || 0);
  rate(15e3, .5, function(t) {
    playRook(!1, .7 * t + .1)
  }, t)
}

function rateKing() {
  var t = 1e3 * (data.timings_r || 10);
  rate(15e3, .5, function(t) {
    playKing(!1, .7 * t + .1)
  }, t)
}

function enableNoSleep() {
  noSleep.enable(), document.removeEventListener("touchstart", enableNoSleep, !1), noSleepEnabled = !0
}! function(t, n, e) {
  function r(t, n) {
    return typeof t === n
  }

  function i() {
    var t, n, e, i, o, a, u;
    for (var s in m) {
      if (t = [], n = m[s], n.name && (t.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
        for (e = 0; e < n.options.aliases.length; e++) t.push(n.options.aliases[e].toLowerCase());
      for (i = r(n.fn, "function") ? n.fn() : n.fn, o = 0; o < t.length; o++) a = t[o], u = a.split("."), 1 === u.length ? b[u[0]] = i : (!b[u[0]] || b[u[0]] instanceof Boolean || (b[u[0]] = new Boolean(b[u[0]])), b[u[0]][u[1]] = i), A.push((i ? "" : "no-") + u.join("-"))
    }
  }

  function o(t) {
    return t.replace(/([a-z])-([a-z])/g, function(t, n, e) {
      return n + e.toUpperCase()
    }).replace(/^-/, "")
  }

  function a(t) {
    var n = _.className,
      e = b._config.classPrefix || "";
    if (b._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + e + "no-js(\\s|$)");
      n = n.replace(r, "$1" + e + "js$2")
    }
    b._config.enableClasses && (n += " " + e + t.join(" " + e), _.className = n)
  }

  function u(t, n) {
    if ("object" == typeof t)
      for (var e in t) w(t, e) && u(e, t[e]);
    else {
      t = t.toLowerCase();
      var r = t.split("."),
        i = b[r[0]];
      if (2 == r.length && (i = i[r[1]]), "undefined" != typeof i) return b;
      n = "function" == typeof n ? n() : n, 1 == r.length ? b[r[0]] = n : (!b[r[0]] || b[r[0]] instanceof Boolean || (b[r[0]] = new Boolean(b[r[0]])), b[r[0]][r[1]] = n), a([(n && 0 != n ? "" : "no-") + r.join("-")]), b._trigger(t, n)
    }
    return b
  }

  function s(t, n) {
    return !!~("" + t).indexOf(n)
  }

  function c(t, n) {
    return function() {
      return t.apply(n, arguments)
    }
  }

  function l(t, n, e) {
    var i;
    for (var o in t)
      if (t[o] in n) return e === !1 ? t[o] : (i = n[t[o]], r(i, "function") ? c(i, e || n) : i);
    return !1
  }

  function f() {
    var t = n.body;
    return t || (t = M("body"), t.fake = !0), t
  }

  function h(t, n, e, r) {
    var i, o, a, u, s = "modernizr",
      c = M("div"),
      l = f();
    if (parseInt(e, 10))
      for (; e--;) a = M("div"), a.id = r ? r[e] : s + (e + 1), c.appendChild(a);
    return i = ["&#173;", '<style id="s', s, '">', t, "</style>"].join(""), c.id = s, (l.fake ? l : c).innerHTML += i, l.appendChild(c), l.fake && (l.style.background = "", l.style.overflow = "hidden", u = _.style.overflow, _.style.overflow = "hidden", _.appendChild(l)), o = n(c, t), l.fake ? (l.parentNode.removeChild(l), _.style.overflow = u, _.offsetHeight) : c.parentNode.removeChild(c), !!o
  }

  function p(t) {
    return t.replace(/([A-Z])/g, function(t, n) {
      return "-" + n.toLowerCase()
    }).replace(/^ms-/, "-ms-")
  }

  function d(n, r) {
    var i = n.length;
    if ("CSS" in t && "supports" in t.CSS) {
      for (; i--;)
        if (t.CSS.supports(p(n[i]), r)) return !0;
      return !1
    }
    if ("CSSSupportsRule" in t) {
      for (var o = []; i--;) o.push("(" + p(n[i]) + ":" + r + ")");
      return o = o.join(" or "), h("@supports (" + o + ") { #modernizr { position: absolute; } }", function(t) {
        return "absolute" == getComputedStyle(t, null).position
      })
    }
    return e
  }

  function g(t, n, i, a) {
    function u() {
      l && (delete j.style, delete j.modElem)
    }
    if (a = r(a, "undefined") ? !1 : a, !r(i, "undefined")) {
      var c = d(t, i);
      if (!r(c, "undefined")) return c
    }
    var l, f, h, p, g;
    for (j.style || (l = !0, j.modElem = M("modernizr"), j.style = j.modElem.style), h = t.length, f = 0; h > f; f++)
      if (p = t[f], g = j.style[p], s(p, "-") && (p = o(p)), j.style[p] !== e) {
        if (a || r(i, "undefined")) return u(), "pfx" == n ? p : !0;
        try {
          j.style[p] = i
        } catch (v) {}
        if (j.style[p] != g) return u(), "pfx" == n ? p : !0
      }
    return u(), !1
  }

  function v(t, n, e, i, o) {
    var a = t.charAt(0).toUpperCase() + t.slice(1),
      u = (t + " " + C.join(a + " ") + a).split(" ");
    return r(n, "string") || r(n, "undefined") ? g(u, n, i, o) : (u = (t + " " + P.join(a + " ") + a).split(" "), l(u, n, e))
  }
  var m = [],
    y = {
      _version: "3.0.0-alpha.3",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function(t, n) {
        var e = this;
        setTimeout(function() {
          n(e[t])
        }, 0)
      },
      addTest: function(t, n, e) {
        m.push({
          name: t,
          fn: n,
          options: e
        })
      },
      addAsyncTest: function(t) {
        m.push({
          name: null,
          fn: t
        })
      }
    },
    b = function() {};
  b.prototype = y, b = new b, b.addTest("devicemotion", "DeviceMotionEvent" in t), b.addTest("deviceorientation", "DeviceOrientationEvent" in t), b.addTest("geolocation", "geolocation" in navigator), b.addTest("webaudio", function() {
    var n = "webkitAudioContext" in t,
      e = "AudioContext" in t;
    return b._config.usePrefixes ? n || e : e
  });
  var w, A = [];
  ! function() {
    var t = {}.hasOwnProperty;
    w = r(t, "undefined") || r(t.call, "undefined") ? function(t, n) {
      return n in t && r(t.constructor.prototype[n], "undefined")
    } : function(n, e) {
      return t.call(n, e)
    }
  }();
  var x = y._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
  y._prefixes = x;
  var _ = n.documentElement;
  y._l = {}, y.on = function(t, n) {
    this._l[t] || (this._l[t] = []), this._l[t].push(n), b.hasOwnProperty(t) && setTimeout(function() {
      b._trigger(t, b[t])
    }, 0)
  }, y._trigger = function(t, n) {
    if (this._l[t]) {
      var e = this._l[t];
      setTimeout(function() {
        var t, r;
        for (t = 0; t < e.length; t++)(r = e[t])(n)
      }, 0), delete this._l[t]
    }
  }, b._q.push(function() {
    y.addTest = u
  });
  var M = function() {
      return "function" != typeof n.createElement ? n.createElement(arguments[0]) : n.createElement.apply(n, arguments)
    },
    k = function(t) {
      function e(n, e) {
        var i;
        return n ? (e && "string" != typeof e || (e = M(e || "div")), n = "on" + n, i = n in e, !i && r && (e.setAttribute || (e = M("div")), e.setAttribute(n, ""), i = "function" == typeof e[n], e[n] !== t && (e[n] = t), e.removeAttribute(n)), i) : !1
      }
      var r = !("onblur" in n.documentElement);
      return e
    }(),
    S = y.hasEvent = k;
  b.addTest("ambientlight", S("devicelight", t));
  var E = "Webkit Moz O ms",
    C = y._config.usePrefixes ? E.split(" ") : [];
  y._cssomPrefixes = C;
  var T = function(n) {
      var e, r = x.length,
        i = t.CSSRule;
      if ("undefined" == typeof i || !n) return !1;
      if (n = n.replace(/^@/, ""), e = n.replace(/-/g, "_").toUpperCase() + "_RULE", e in i) return "@" + n;
      for (var o = 0; r > o; o++) {
        var a = x[o],
          u = a.toUpperCase() + "_" + e;
        if (u in i) return "@-" + a.toLowerCase() + "-" + n
      }
      return !1
    },
    P = y._config.usePrefixes ? E.toLowerCase().split(" ") : [];
  y._domPrefixes = P;
  var N = y.testStyles = h;
  b.addTest("touchevents", function() {
    var e;
    if ("ontouchstart" in t || t.DocumentTouch && n instanceof DocumentTouch) e = !0;
    else {
      var r = ["@media (", x.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      N(r, function(t) {
        e = 9 === t.offsetTop
      })
    }
    return e
  });
  var D = {
    elem: M("modernizr")
  };
  b._q.push(function() {
    delete D.elem
  });
  var j = {
    style: D.elem.style
  };
  b._q.unshift(function() {
    delete j.style
  }), y.testAllProps = v;
  var L = y.prefixed = function(t, n, e) {
    return 0 === t.indexOf("@") ? T(t) : (-1 != t.indexOf("-") && (t = o(t)), n ? v(t, n, e) : v(t, "pfx"))
  };
  b.addTest("batteryapi", !!L("battery", navigator), {
    aliases: ["battery-api"]
  }), b.addTest("getusermedia", !!L("getUserMedia", navigator)), b.addTest("vibrate", !!L("vibrate", navigator)), i(), delete y.addTest, delete y.addAsyncTest;
  for (var R = 0; R < b._q.length; R++) b._q[R]();
  t.Modernizr = b
}(window, document),
function() {
  function t(e, r) {
    n(e), r = r || {};
    var i = this;
    this.key = e, this.config = t.Util.extend(t.getGlobalConfig(), r.cluster ? t.getClusterConfig(r.cluster) : {}, r), this.channels = new t.Channels, this.global_emitter = new t.EventsDispatcher, this.sessionID = Math.floor(1e9 * Math.random()), this.timeline = new t.Timeline(this.key, this.sessionID, {
      cluster: this.config.cluster,
      features: t.Util.getClientFeatures(),
      params: this.config.timelineParams || {},
      limit: 50,
      level: t.Timeline.INFO,
      version: t.VERSION
    }), this.config.disableStats || (this.timelineSender = new t.TimelineSender(this.timeline, {
      host: this.config.statsHost,
      path: "/timeline/v2/jsonp"
    }));
    var o = function(n) {
      var e = t.Util.extend({}, i.config, n);
      return t.StrategyBuilder.build(t.getDefaultStrategy(e), e)
    };
    this.connection = new t.ConnectionManager(this.key, t.Util.extend({
      getStrategy: o,
      timeline: this.timeline,
      activityTimeout: this.config.activity_timeout,
      pongTimeout: this.config.pong_timeout,
      unavailableTimeout: this.config.unavailable_timeout
    }, this.config, {
      encrypted: this.isEncrypted()
    })), this.connection.bind("connected", function() {
      i.subscribeAll(), i.timelineSender && i.timelineSender.send(i.connection.isEncrypted())
    }), this.connection.bind("message", function(t) {
      var n = 0 === t.event.indexOf("pusher_internal:");
      if (t.channel) {
        var e = i.channel(t.channel);
        e && e.handleEvent(t.event, t.data)
      }
      n || i.global_emitter.emit(t.event, t.data)
    }), this.connection.bind("disconnected", function() {
      i.channels.disconnect()
    }), this.connection.bind("error", function(n) {
      t.warn("Error", n)
    }), t.instances.push(this), this.timeline.info({
      instances: t.instances.length
    }), t.isReady && i.connect()
  }

  function n(n) {
    (null === n || void 0 === n) && t.warn("Warning", "You must pass your app key when you instantiate Pusher.")
  }
  var e = t.prototype;
  t.instances = [], t.isReady = !1, t.debug = function() {
    t.log && t.log(t.Util.stringify.apply(this, arguments))
  }, t.warn = function() {
    var n = t.Util.stringify.apply(this, arguments);
    window.console && (window.console.warn ? window.console.warn(n) : window.console.log && window.console.log(n)), t.log && t.log(n)
  }, t.ready = function() {
    t.isReady = !0;
    for (var n = 0, e = t.instances.length; e > n; n++) t.instances[n].connect()
  }, e.channel = function(t) {
    return this.channels.find(t)
  }, e.allChannels = function() {
    return this.channels.all()
  }, e.connect = function() {
    if (this.connection.connect(), this.timelineSender && !this.timelineSenderTimer) {
      var n = this.connection.isEncrypted(),
        e = this.timelineSender;
      this.timelineSenderTimer = new t.PeriodicTimer(6e4, function() {
        e.send(n)
      })
    }
  }, e.disconnect = function() {
    this.connection.disconnect(), this.timelineSenderTimer && (this.timelineSenderTimer.ensureAborted(), this.timelineSenderTimer = null)
  }, e.bind = function(t, n) {
    return this.global_emitter.bind(t, n), this
  }, e.bind_all = function(t) {
    return this.global_emitter.bind_all(t), this
  }, e.subscribeAll = function() {
    var t;
    for (t in this.channels.channels) this.channels.channels.hasOwnProperty(t) && this.subscribe(t)
  }, e.subscribe = function(t) {
    var n = this.channels.add(t, this);
    return "connected" === this.connection.state && n.subscribe(), n
  }, e.unsubscribe = function(t) {
    var n = this.channels.remove(t);
    "connected" === this.connection.state && n.unsubscribe()
  }, e.send_event = function(t, n, e) {
    return this.connection.send_event(t, n, e)
  }, e.isEncrypted = function() {
    return "https:" === t.Util.getDocument().location.protocol ? !0 : Boolean(this.config.encrypted)
  }, t.HTTP = {}, this.Pusher = t
}.call(this),
  function() {
    function t(t) {
      window.clearTimeout(t)
    }

    function n(t) {
      window.clearInterval(t)
    }

    function e(t, n, e, r) {
      var i = this;
      this.clear = n, this.timer = t(function() {
        null !== i.timer && (i.timer = r(i.timer))
      }, e)
    }
    var r = e.prototype;
    r.isRunning = function() {
      return null !== this.timer
    }, r.ensureAborted = function() {
      this.timer && (this.clear(this.timer), this.timer = null)
    }, Pusher.Timer = function(n, r) {
      return new e(setTimeout, t, n, function(t) {
        return r(), null
      })
    }, Pusher.PeriodicTimer = function(t, r) {
      return new e(setInterval, n, t, function(t) {
        return r(), t
      })
    }
  }.call(this),
  function() {
    Pusher.Util = {
      now: function() {
        return Date.now ? Date.now() : (new Date).valueOf()
      },
      defer: function(t) {
        return new Pusher.Timer(0, t)
      },
      extend: function(t) {
        for (var n = 1; n < arguments.length; n++) {
          var e = arguments[n];
          for (var r in e) t[r] = e[r] && e[r].constructor && e[r].constructor === Object ? Pusher.Util.extend(t[r] || {}, e[r]) : e[r]
        }
        return t
      },
      stringify: function() {
        for (var t = ["Pusher"], n = 0; n < arguments.length; n++) t.push("string" == typeof arguments[n] ? arguments[n] : void 0 === window.JSON ? arguments[n].toString() : JSON.stringify(arguments[n]));
        return t.join(" : ")
      },
      arrayIndexOf: function(t, n) {
        var e = Array.prototype.indexOf;
        if (null === t) return -1;
        if (e && t.indexOf === e) return t.indexOf(n);
        for (var r = 0, i = t.length; i > r; r++)
          if (t[r] === n) return r;
        return -1
      },
      objectApply: function(t, n) {
        for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && n(t[e], e, t)
      },
      keys: function(t) {
        var n = [];
        return Pusher.Util.objectApply(t, function(t, e) {
          n.push(e)
        }), n
      },
      values: function(t) {
        var n = [];
        return Pusher.Util.objectApply(t, function(t) {
          n.push(t)
        }), n
      },
      apply: function(t, n, e) {
        for (var r = 0; r < t.length; r++) n.call(e || window, t[r], r, t)
      },
      map: function(t, n) {
        for (var e = [], r = 0; r < t.length; r++) e.push(n(t[r], r, t, e));
        return e
      },
      mapObject: function(t, n) {
        var e = {};
        return Pusher.Util.objectApply(t, function(t, r) {
          e[r] = n(t)
        }), e
      },
      filter: function(t, n) {
        n = n || function(t) {
          return !!t
        };
        for (var e = [], r = 0; r < t.length; r++) n(t[r], r, t, e) && e.push(t[r]);
        return e
      },
      filterObject: function(t, n) {
        var e = {};
        return Pusher.Util.objectApply(t, function(r, i) {
          (n && n(r, i, t, e) || Boolean(r)) && (e[i] = r)
        }), e
      },
      flatten: function(t) {
        var n = [];
        return Pusher.Util.objectApply(t, function(t, e) {
          n.push([e, t])
        }), n
      },
      any: function(t, n) {
        for (var e = 0; e < t.length; e++)
          if (n(t[e], e, t)) return !0;
        return !1
      },
      all: function(t, n) {
        for (var e = 0; e < t.length; e++)
          if (!n(t[e], e, t)) return !1;
        return !0
      },
      method: function(t) {
        var n = Array.prototype.slice.call(arguments, 1);
        return function(e) {
          return e[t].apply(e, n.concat(arguments))
        }
      },
      getWindow: function() {
        return window
      },
      getDocument: function() {
        return document
      },
      getNavigator: function() {
        return navigator
      },
      getLocalStorage: function() {
        try {
          return window.localStorage
        } catch (t) {
          return void 0
        }
      },
      getClientFeatures: function() {
        return Pusher.Util.keys(Pusher.Util.filterObject({
          ws: Pusher.WSTransport,
          flash: Pusher.FlashTransport
        }, function(t) {
          return t.isSupported({})
        }))
      },
      addWindowListener: function(t, n) {
        var e = Pusher.Util.getWindow();
        void 0 !== e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
      },
      removeWindowListener: function(t, n) {
        var e = Pusher.Util.getWindow();
        void 0 !== e.addEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n)
      },
      isXHRSupported: function() {
        var t = window.XMLHttpRequest;
        return Boolean(t) && void 0 !== (new t).withCredentials
      },
      isXDRSupported: function(t) {
        var n = t ? "https:" : "http:",
          e = Pusher.Util.getDocument().location.protocol;
        return Boolean(window.XDomainRequest) && e === n
      }
    }
  }.call(this),
  function() {
    Pusher.VERSION = "2.2.4", Pusher.PROTOCOL = 7, Pusher.host = "ws.pusherapp.com", Pusher.ws_port = 80, Pusher.wss_port = 443, Pusher.sockjs_host = "sockjs.pusher.com", Pusher.sockjs_http_port = 80, Pusher.sockjs_https_port = 443, Pusher.sockjs_path = "/pusher", Pusher.stats_host = "stats.pusher.com", Pusher.channel_auth_endpoint = "/pusher/auth", Pusher.channel_auth_transport = "ajax", Pusher.activity_timeout = 12e4, Pusher.pong_timeout = 3e4, Pusher.unavailable_timeout = 1e4, Pusher.cdn_http = "http://js.pusher.com/", Pusher.cdn_https = "https://js.pusher.com/", Pusher.dependency_suffix = "", Pusher.getDefaultStrategy = function(t) {
      var n;
      return n = t.encrypted ? [":best_connected_ever", ":ws_loop", [":delayed", 2e3, [":http_fallback_loop"]]] : [":best_connected_ever", ":ws_loop", [":delayed", 2e3, [":wss_loop"]],
        [":delayed", 5e3, [":http_fallback_loop"]]
      ], [
        [":def", "ws_options", {
          hostUnencrypted: t.wsHost + ":" + t.wsPort,
          hostEncrypted: t.wsHost + ":" + t.wssPort
        }],
        [":def", "wss_options", [":extend", ":ws_options", {
          encrypted: !0
        }]],
        [":def", "sockjs_options", {
          hostUnencrypted: t.httpHost + ":" + t.httpPort,
          hostEncrypted: t.httpHost + ":" + t.httpsPort,
          httpPath: t.httpPath
        }],
        [":def", "timeouts", {
          loop: !0,
          timeout: 15e3,
          timeoutLimit: 6e4
        }],
        [":def", "ws_manager", [":transport_manager", {
          lives: 2,
          minPingDelay: 1e4,
          maxPingDelay: t.activity_timeout
        }]],
        [":def", "streaming_manager", [":transport_manager", {
          lives: 2,
          minPingDelay: 1e4,
          maxPingDelay: t.activity_timeout
        }]],
        [":def_transport", "ws", "ws", 3, ":ws_options", ":ws_manager"],
        [":def_transport", "wss", "ws", 3, ":wss_options", ":ws_manager"],
        [":def_transport", "flash", "flash", 2, ":ws_options", ":ws_manager"],
        [":def_transport", "sockjs", "sockjs", 1, ":sockjs_options"],
        [":def_transport", "xhr_streaming", "xhr_streaming", 1, ":sockjs_options", ":streaming_manager"],
        [":def_transport", "xdr_streaming", "xdr_streaming", 1, ":sockjs_options", ":streaming_manager"],
        [":def_transport", "xhr_polling", "xhr_polling", 1, ":sockjs_options"],
        [":def_transport", "xdr_polling", "xdr_polling", 1, ":sockjs_options"],
        [":def", "ws_loop", [":sequential", ":timeouts", ":ws"]],
        [":def", "wss_loop", [":sequential", ":timeouts", ":wss"]],
        [":def", "flash_loop", [":sequential", ":timeouts", ":flash"]],
        [":def", "sockjs_loop", [":sequential", ":timeouts", ":sockjs"]],
        [":def", "streaming_loop", [":sequential", ":timeouts", [":if", [":is_supported", ":xhr_streaming"], ":xhr_streaming", ":xdr_streaming"]]],
        [":def", "polling_loop", [":sequential", ":timeouts", [":if", [":is_supported", ":xhr_polling"], ":xhr_polling", ":xdr_polling"]]],
        [":def", "http_loop", [":if", [":is_supported", ":streaming_loop"],
          [":best_connected_ever", ":streaming_loop", [":delayed", 4e3, [":polling_loop"]]],
          [":polling_loop"]
        ]],
        [":def", "http_fallback_loop", [":if", [":is_supported", ":http_loop"],
          [":http_loop"],
          [":sockjs_loop"]
        ]],
        [":def", "strategy", [":cached", 18e5, [":first_connected", [":if", [":is_supported", ":ws"], n, [":if", [":is_supported", ":flash"],
          [":best_connected_ever", ":flash_loop", [":delayed", 2e3, [":http_fallback_loop"]]],
          [":http_fallback_loop"]
        ]]]]]
      ]
    }
  }.call(this),
  function() {
    Pusher.getGlobalConfig = function() {
      return {
        wsHost: Pusher.host,
        wsPort: Pusher.ws_port,
        wssPort: Pusher.wss_port,
        httpHost: Pusher.sockjs_host,
        httpPort: Pusher.sockjs_http_port,
        httpsPort: Pusher.sockjs_https_port,
        httpPath: Pusher.sockjs_path,
        statsHost: Pusher.stats_host,
        authEndpoint: Pusher.channel_auth_endpoint,
        authTransport: Pusher.channel_auth_transport,
        activity_timeout: Pusher.activity_timeout,
        pong_timeout: Pusher.pong_timeout,
        unavailable_timeout: Pusher.unavailable_timeout
      }
    }, Pusher.getClusterConfig = function(t) {
      return {
        wsHost: "ws-" + t + ".pusher.com",
        httpHost: "sockjs-" + t + ".pusher.com"
      }
    }
  }.call(this),
  function() {
    function t(t) {
      var n = function(n) {
        Error.call(this, n), this.name = t
      };
      return Pusher.Util.extend(n.prototype, Error.prototype), n
    }
    Pusher.Errors = {
      BadEventName: t("BadEventName"),
      RequestTimedOut: t("RequestTimedOut"),
      TransportPriorityTooLow: t("TransportPriorityTooLow"),
      TransportClosed: t("TransportClosed"),
      UnsupportedTransport: t("UnsupportedTransport"),
      UnsupportedStrategy: t("UnsupportedStrategy")
    }
  }.call(this),
  function() {
    function t(t) {
      this.callbacks = new n, this.global_callbacks = [], this.failThrough = t
    }

    function n() {
      this._callbacks = {}
    }

    function e(t) {
      return "_" + t
    }
    var r = t.prototype;
    r.bind = function(t, n, e) {
      return this.callbacks.add(t, n, e), this
    }, r.bind_all = function(t) {
      return this.global_callbacks.push(t), this
    }, r.unbind = function(t, n, e) {
      return this.callbacks.remove(t, n, e), this
    }, r.unbind_all = function(t, n) {
      return this.callbacks.remove(t, n), this
    }, r.emit = function(t, n) {
      var e;
      for (e = 0; e < this.global_callbacks.length; e++) this.global_callbacks[e](t, n);
      var r = this.callbacks.get(t);
      if (r && r.length > 0)
        for (e = 0; e < r.length; e++) r[e].fn.call(r[e].context || window, n);
      else this.failThrough && this.failThrough(t, n);
      return this
    }, n.prototype.get = function(t) {
      return this._callbacks[e(t)]
    }, n.prototype.add = function(t, n, r) {
      var i = e(t);
      this._callbacks[i] = this._callbacks[i] || [], this._callbacks[i].push({
        fn: n,
        context: r
      })
    }, n.prototype.remove = function(t, n, r) {
      if (!t && !n && !r) return void(this._callbacks = {});
      var i = t ? [e(t)] : Pusher.Util.keys(this._callbacks);
      n || r ? Pusher.Util.apply(i, function(t) {
        this._callbacks[t] = Pusher.Util.filter(this._callbacks[t] || [], function(t) {
          return n && n !== t.fn || r && r !== t.context
        }), 0 === this._callbacks[t].length && delete this._callbacks[t]
      }, this) : Pusher.Util.apply(i, function(t) {
        delete this._callbacks[t]
      }, this)
    }, Pusher.EventsDispatcher = t
  }.call(this),
  function() {
    function t(t, n) {
      this.lastId = 0, this.prefix = t, this.name = n
    }
    var n = t.prototype;
    n.create = function(t) {
      this.lastId++;
      var n = this.lastId,
        e = this.prefix + n,
        r = this.name + "[" + n + "]",
        i = !1,
        o = function() {
          i || (t.apply(null, arguments), i = !0)
        };
      return this[n] = o, {
        number: n,
        id: e,
        name: r,
        callback: o
      }
    }, n.remove = function(t) {
      delete this[t.number]
    }, Pusher.ScriptReceiverFactory = t, Pusher.ScriptReceivers = new t("_pusher_script_", "Pusher.ScriptReceivers")
  }.call(this),
  function() {
    function t(t) {
      this.src = t
    }
    var n = t.prototype;
    n.send = function(t) {
      var n = this,
        e = "Error loading " + n.src;
      n.script = document.createElement("script"), n.script.id = t.id, n.script.src = n.src, n.script.type = "text/javascript", n.script.charset = "UTF-8", n.script.addEventListener ? (n.script.onerror = function() {
        t.callback(e)
      }, n.script.onload = function() {
        t.callback(null)
      }) : n.script.onreadystatechange = function() {
        ("loaded" === n.script.readyState || "complete" === n.script.readyState) && t.callback(null)
      }, void 0 === n.script.async && document.attachEvent && /opera/i.test(navigator.userAgent) ? (n.errorScript = document.createElement("script"), n.errorScript.id = t.id + "_error", n.errorScript.text = t.name + "('" + e + "');", n.script.async = n.errorScript.async = !1) : n.script.async = !0;
      var r = document.getElementsByTagName("head")[0];
      r.insertBefore(n.script, r.firstChild), n.errorScript && r.insertBefore(n.errorScript, n.script.nextSibling)
    }, n.cleanup = function() {
      this.script && (this.script.onload = this.script.onerror = null, this.script.onreadystatechange = null), this.script && this.script.parentNode && this.script.parentNode.removeChild(this.script), this.errorScript && this.errorScript.parentNode && this.errorScript.parentNode.removeChild(this.errorScript), this.script = null, this.errorScript = null
    }, Pusher.ScriptRequest = t
  }.call(this),
  function() {
    function t(t) {
      this.options = t, this.receivers = t.receivers || Pusher.ScriptReceivers, this.loading = {}
    }
    var n = t.prototype;
    n.load = function(t, n, e) {
      var r = this;
      if (r.loading[t] && r.loading[t].length > 0) r.loading[t].push(e);
      else {
        r.loading[t] = [e];
        var i = new Pusher.ScriptRequest(r.getPath(t, n)),
          o = r.receivers.create(function(n) {
            if (r.receivers.remove(o), r.loading[t]) {
              var e = r.loading[t];
              delete r.loading[t];
              for (var a = function(t) {
                  t || i.cleanup()
                }, u = 0; u < e.length; u++) e[u](n, a)
            }
          });
        i.send(o)
      }
    }, n.getRoot = function(t) {
      var n, e = Pusher.Util.getDocument().location.protocol;
      return n = t && t.encrypted || "https:" === e ? this.options.cdn_https : this.options.cdn_http, n.replace(/\/*$/, "") + "/" + this.options.version
    }, n.getPath = function(t, n) {
      return this.getRoot(n) + "/" + t + this.options.suffix + ".js"
    }, Pusher.DependencyLoader = t
  }.call(this),
  function() {
    function t() {
      Pusher.ready()
    }

    function n(t) {
      document.body ? t() : setTimeout(function() {
        n(t)
      }, 0)
    }

    function e() {
      n(t)
    }
    Pusher.DependenciesReceivers = new Pusher.ScriptReceiverFactory("_pusher_dependencies", "Pusher.DependenciesReceivers"), Pusher.Dependencies = new Pusher.DependencyLoader({
      cdn_http: Pusher.cdn_http,
      cdn_https: Pusher.cdn_https,
      version: Pusher.VERSION,
      suffix: Pusher.dependency_suffix,
      receivers: Pusher.DependenciesReceivers
    }), window.JSON ? e() : Pusher.Dependencies.load("json2", {}, e)
  }(),
  function() {
    for (var t = {
        encode: function(t) {
          return c(u(t))
        }
      }, n = String.fromCharCode, e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = {}, i = 0, o = e.length; o > i; i++) r[e.charAt(i)] = i;
    var a = function(t) {
        var e = t.charCodeAt(0);
        return 128 > e ? t : 2048 > e ? n(192 | e >>> 6) + n(128 | 63 & e) : n(224 | e >>> 12 & 15) + n(128 | e >>> 6 & 63) + n(128 | 63 & e)
      },
      u = function(t) {
        return t.replace(/[^\x00-\x7F]/g, a)
      },
      s = function(t) {
        var n = [0, 2, 1][t.length % 3],
          r = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0),
          i = [e.charAt(r >>> 18), e.charAt(r >>> 12 & 63), n >= 2 ? "=" : e.charAt(r >>> 6 & 63), n >= 1 ? "=" : e.charAt(63 & r)];
        return i.join("")
      },
      c = window.btoa || function(t) {
        return t.replace(/[\s\S]{1,3}/g, s)
      };
    Pusher.Base64 = t
  }.call(this),
  function() {
    function t(t, n) {
      this.url = t, this.data = n
    }

    function n(t) {
      return Pusher.Util.mapObject(t, function(t) {
        return "object" == typeof t && (t = JSON.stringify(t)), encodeURIComponent(Pusher.Base64.encode(t.toString()))
      })
    }
    var e = t.prototype;
    e.send = function(t) {
      if (!this.request) {
        var e = Pusher.Util.filterObject(this.data, function(t) {
            return void 0 !== t
          }),
          r = Pusher.Util.map(Pusher.Util.flatten(n(e)), Pusher.Util.method("join", "=")).join("&"),
          i = this.url + "/" + t.number + "?" + r;
        this.request = new Pusher.ScriptRequest(i), this.request.send(t)
      }
    }, e.cleanup = function() {
      this.request && this.request.cleanup()
    }, Pusher.JSONPRequest = t
  }.call(this),
  function() {
    function t(t, n, e) {
      this.key = t, this.session = n, this.events = [], this.options = e || {}, this.sent = 0, this.uniqueID = 0
    }
    var n = t.prototype;
    t.ERROR = 3, t.INFO = 6, t.DEBUG = 7, n.log = function(t, n) {
      t <= this.options.level && (this.events.push(Pusher.Util.extend({}, n, {
        timestamp: Pusher.Util.now()
      })), this.options.limit && this.events.length > this.options.limit && this.events.shift())
    }, n.error = function(n) {
      this.log(t.ERROR, n)
    }, n.info = function(n) {
      this.log(t.INFO, n)
    }, n.debug = function(n) {
      this.log(t.DEBUG, n)
    }, n.isEmpty = function() {
      return 0 === this.events.length
    }, n.send = function(t, n) {
      var e = this,
        r = Pusher.Util.extend({
          session: e.session,
          bundle: e.sent + 1,
          key: e.key,
          lib: "js",
          version: e.options.version,
          cluster: e.options.cluster,
          features: e.options.features,
          timeline: e.events
        }, e.options.params);
      return e.events = [], t(r, function(t, r) {
        t || e.sent++, n && n(t, r)
      }), !0
    }, n.generateUniqueID = function() {
      return this.uniqueID++, this.uniqueID
    }, Pusher.Timeline = t
  }.call(this),
  function() {
    function t(t, n) {
      this.timeline = t, this.options = n || {}
    }
    var n = t.prototype;
    n.send = function(t, n) {
      var e = this;
      if (!e.timeline.isEmpty()) {
        var r = function(n, r) {
          var i = "http" + (t ? "s" : "") + "://",
            o = i + (e.host || e.options.host) + e.options.path,
            a = new Pusher.JSONPRequest(o, n),
            u = Pusher.ScriptReceivers.create(function(t, n) {
              Pusher.ScriptReceivers.remove(u), a.cleanup(), n && n.host && (e.host = n.host), r && r(t, n)
            });
          a.send(u)
        };
        e.timeline.send(r, n)
      }
    }, Pusher.TimelineSender = t
  }.call(this),
  function() {
    function t(t) {
      this.strategies = t
    }

    function n(t, n, e) {
      var i = Pusher.Util.map(t, function(t, r, i, o) {
        return t.connect(n, e(r, o))
      });
      return {
        abort: function() {
          Pusher.Util.apply(i, r)
        },
        forceMinPriority: function(t) {
          Pusher.Util.apply(i, function(n) {
            n.forceMinPriority(t)
          })
        }
      }
    }

    function e(t) {
      return Pusher.Util.all(t, function(t) {
        return Boolean(t.error)
      })
    }

    function r(t) {
      t.error || t.aborted || (t.abort(), t.aborted = !0)
    }
    var i = t.prototype;
    i.isSupported = function() {
      return Pusher.Util.any(this.strategies, Pusher.Util.method("isSupported"))
    }, i.connect = function(t, r) {
      return n(this.strategies, t, function(t, n) {
        return function(i, o) {
          return n[t].error = i, i ? void(e(n) && r(!0)) : (Pusher.Util.apply(n, function(t) {
            t.forceMinPriority(o.transport.priority)
          }), void r(null, o))
        }
      })
    }, Pusher.BestConnectedEverStrategy = t
  }.call(this),
  function() {
    function t(t, n, e) {
      this.strategy = t, this.transports = n, this.ttl = e.ttl || 18e5, this.encrypted = e.encrypted, this.timeline = e.timeline
    }

    function n(t) {
      return "pusherTransport" + (t ? "Encrypted" : "Unencrypted")
    }

    function e(t) {
      var e = Pusher.Util.getLocalStorage();
      if (e) try {
        var r = e[n(t)];
        if (r) return JSON.parse(r)
      } catch (o) {
        i(t)
      }
      return null
    }

    function r(t, e, r) {
      var i = Pusher.Util.getLocalStorage();
      if (i) try {
        i[n(t)] = JSON.stringify({
          timestamp: Pusher.Util.now(),
          transport: e,
          latency: r
        })
      } catch (o) {}
    }

    function i(t) {
      var e = Pusher.Util.getLocalStorage();
      if (e) try {
        delete e[n(t)]
      } catch (r) {}
    }
    var o = t.prototype;
    o.isSupported = function() {
      return this.strategy.isSupported()
    }, o.connect = function(t, n) {
      var o = this.encrypted,
        a = e(o),
        u = [this.strategy];
      if (a && a.timestamp + this.ttl >= Pusher.Util.now()) {
        var s = this.transports[a.transport];
        s && (this.timeline.info({
          cached: !0,
          transport: a.transport,
          latency: a.latency
        }), u.push(new Pusher.SequentialStrategy([s], {
          timeout: 2 * a.latency + 1e3,
          failFast: !0
        })))
      }
      var c = Pusher.Util.now(),
        l = u.pop().connect(t, function f(e, a) {
          e ? (i(o), u.length > 0 ? (c = Pusher.Util.now(), l = u.pop().connect(t, f)) : n(e)) : (r(o, a.transport.name, Pusher.Util.now() - c), n(null, a))
        });
      return {
        abort: function() {
          l.abort()
        },
        forceMinPriority: function(n) {
          t = n, l && l.forceMinPriority(n)
        }
      }
    }, Pusher.CachedStrategy = t
  }.call(this),
  function() {
    function t(t, n) {
      this.strategy = t, this.options = {
        delay: n.delay
      }
    }
    var n = t.prototype;
    n.isSupported = function() {
      return this.strategy.isSupported()
    }, n.connect = function(t, n) {
      var e, r = this.strategy,
        i = new Pusher.Timer(this.options.delay, function() {
          e = r.connect(t, n)
        });
      return {
        abort: function() {
          i.ensureAborted(), e && e.abort()
        },
        forceMinPriority: function(n) {
          t = n, e && e.forceMinPriority(n)
        }
      }
    }, Pusher.DelayedStrategy = t
  }.call(this),
  function() {
    function t(t) {
      this.strategy = t
    }
    var n = t.prototype;
    n.isSupported = function() {
      return this.strategy.isSupported()
    }, n.connect = function(t, n) {
      var e = this.strategy.connect(t, function(t, r) {
        r && e.abort(), n(t, r)
      });
      return e
    }, Pusher.FirstConnectedStrategy = t
  }.call(this),
  function() {
    function t(t, n, e) {
      this.test = t, this.trueBranch = n, this.falseBranch = e
    }
    var n = t.prototype;
    n.isSupported = function() {
      var t = this.test() ? this.trueBranch : this.falseBranch;
      return t.isSupported()
    }, n.connect = function(t, n) {
      var e = this.test() ? this.trueBranch : this.falseBranch;
      return e.connect(t, n)
    }, Pusher.IfStrategy = t
  }.call(this),
  function() {
    function t(t, n) {
      this.strategies = t, this.loop = Boolean(n.loop), this.failFast = Boolean(n.failFast), this.timeout = n.timeout, this.timeoutLimit = n.timeoutLimit
    }
    var n = t.prototype;
    n.isSupported = function() {
      return Pusher.Util.any(this.strategies, Pusher.Util.method("isSupported"))
    }, n.connect = function(t, n) {
      var e = this,
        r = this.strategies,
        i = 0,
        o = this.timeout,
        a = null,
        u = function(s, c) {
          c ? n(null, c) : (i += 1, e.loop && (i %= r.length), i < r.length ? (o && (o = 2 * o, e.timeoutLimit && (o = Math.min(o, e.timeoutLimit))), a = e.tryStrategy(r[i], t, {
            timeout: o,
            failFast: e.failFast
          }, u)) : n(!0))
        };
      return a = this.tryStrategy(r[i], t, {
        timeout: o,
        failFast: this.failFast
      }, u), {
        abort: function() {
          a.abort()
        },
        forceMinPriority: function(n) {
          t = n, a && a.forceMinPriority(n)
        }
      }
    }, n.tryStrategy = function(t, n, e, r) {
      var i = null,
        o = null;
      return e.timeout > 0 && (i = new Pusher.Timer(e.timeout, function() {
        o.abort(), r(!0)
      })), o = t.connect(n, function(t, n) {
        t && i && i.isRunning() && !e.failFast || (i && i.ensureAborted(), r(t, n))
      }), {
        abort: function() {
          i && i.ensureAborted(), o.abort()
        },
        forceMinPriority: function(t) {
          o.forceMinPriority(t)
        }
      }
    }, Pusher.SequentialStrategy = t
  }.call(this),
  function() {
    function t(t, n, e, r) {
      this.name = t, this.priority = n, this.transport = e, this.options = r || {}
    }

    function n(t, n) {
      return Pusher.Util.defer(function() {
        n(t)
      }), {
        abort: function() {},
        forceMinPriority: function() {}
      }
    }
    var e = t.prototype;
    e.isSupported = function() {
      return this.transport.isSupported({
        encrypted: this.options.encrypted
      })
    }, e.connect = function(t, e) {
      if (!this.isSupported()) return n(new Pusher.Errors.UnsupportedStrategy, e);
      if (this.priority < t) return n(new Pusher.Errors.TransportPriorityTooLow, e);
      var r = this,
        i = !1,
        o = this.transport.createConnection(this.name, this.priority, this.options.key, this.options),
        a = null,
        u = function() {
          o.unbind("initialized", u), o.connect()
        },
        s = function() {
          a = new Pusher.Handshake(o, function(t) {
            i = !0, f(), e(null, t)
          })
        },
        c = function(t) {
          f(), e(t)
        },
        l = function() {
          f(), e(new Pusher.Errors.TransportClosed(o))
        },
        f = function() {
          o.unbind("initialized", u), o.unbind("open", s), o.unbind("error", c), o.unbind("closed", l)
        };
      return o.bind("initialized", u), o.bind("open", s), o.bind("error", c), o.bind("closed", l), o.initialize(), {
        abort: function() {
          i || (f(), a ? a.close() : o.close())
        },
        forceMinPriority: function(t) {
          i || r.priority < t && (a ? a.close() : o.close())
        }
      }
    }, Pusher.TransportStrategy = t
  }.call(this),
  function() {
    function t(t, n, e) {
      var r = t + (n.encrypted ? "s" : ""),
        i = n.encrypted ? n.hostEncrypted : n.hostUnencrypted;

      return r + "://" + i + e
    }

    function n(t, n) {
      var e = "/app/" + t,
        r = "?protocol=" + Pusher.PROTOCOL + "&client=js&version=" + Pusher.VERSION + (n ? "&" + n : "");
      return e + r
    }
    Pusher.URLSchemes = {
      ws: {
        getInitial: function(e, r) {
          return t("ws", r, n(e, "flash=false"))
        }
      },
      flash: {
        getInitial: function(e, r) {
          return t("ws", r, n(e, "flash=true"))
        }
      },
      sockjs: {
        getInitial: function(n, e) {
          return t("http", e, e.httpPath || "/pusher", "")
        },
        getPath: function(t, e) {
          return n(t)
        }
      },
      http: {
        getInitial: function(e, r) {
          var i = (r.httpPath || "/pusher") + n(e);
          return t("http", r, i)
        }
      }
    }
  }.call(this),
  function() {
    function t(t, n, e, r, i) {
      Pusher.EventsDispatcher.call(this), this.hooks = t, this.name = n, this.priority = e, this.key = r, this.options = i, this.state = "new", this.timeline = i.timeline, this.activityTimeout = i.activityTimeout, this.id = this.timeline.generateUniqueID()
    }
    var n = t.prototype;
    Pusher.Util.extend(n, Pusher.EventsDispatcher.prototype), n.handlesActivityChecks = function() {
      return Boolean(this.hooks.handlesActivityChecks)
    }, n.supportsPing = function() {
      return Boolean(this.hooks.supportsPing)
    }, n.initialize = function() {
      var t = this;
      t.timeline.info(t.buildTimelineMessage({
        transport: t.name + (t.options.encrypted ? "s" : "")
      })), t.hooks.beforeInitialize && t.hooks.beforeInitialize.call(t), t.hooks.isInitialized() ? t.changeState("initialized") : t.hooks.file ? (t.changeState("initializing"), Pusher.Dependencies.load(t.hooks.file, {
        encrypted: t.options.encrypted
      }, function(n, e) {
        t.hooks.isInitialized() ? (t.changeState("initialized"), e(!0)) : (n && t.onError(n), t.onClose(), e(!1))
      })) : t.onClose()
    }, n.connect = function() {
      var t = this;
      if (t.socket || "initialized" !== t.state) return !1;
      var n = t.hooks.urls.getInitial(t.key, t.options);
      try {
        t.socket = t.hooks.getSocket(n, t.options)
      } catch (e) {
        return Pusher.Util.defer(function() {
          t.onError(e), t.changeState("closed")
        }), !1
      }
      return t.bindListeners(), Pusher.debug("Connecting", {
        transport: t.name,
        url: n
      }), t.changeState("connecting"), !0
    }, n.close = function() {
      return this.socket ? (this.socket.close(), !0) : !1
    }, n.send = function(t) {
      var n = this;
      return "open" === n.state ? (Pusher.Util.defer(function() {
        n.socket && n.socket.send(t)
      }), !0) : !1
    }, n.ping = function() {
      "open" === this.state && this.supportsPing() && this.socket.ping()
    }, n.onOpen = function() {
      this.hooks.beforeOpen && this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options)), this.changeState("open"), this.socket.onopen = void 0
    }, n.onError = function(t) {
      this.emit("error", {
        type: "WebSocketError",
        error: t
      }), this.timeline.error(this.buildTimelineMessage({
        error: t.toString()
      }))
    }, n.onClose = function(t) {
      t ? this.changeState("closed", {
        code: t.code,
        reason: t.reason,
        wasClean: t.wasClean
      }) : this.changeState("closed"), this.unbindListeners(), this.socket = void 0
    }, n.onMessage = function(t) {
      this.emit("message", t)
    }, n.onActivity = function() {
      this.emit("activity")
    }, n.bindListeners = function() {
      var t = this;
      t.socket.onopen = function() {
        t.onOpen()
      }, t.socket.onerror = function(n) {
        t.onError(n)
      }, t.socket.onclose = function(n) {
        t.onClose(n)
      }, t.socket.onmessage = function(n) {
        t.onMessage(n)
      }, t.supportsPing() && (t.socket.onactivity = function() {
        t.onActivity()
      })
    }, n.unbindListeners = function() {
      this.socket && (this.socket.onopen = void 0, this.socket.onerror = void 0, this.socket.onclose = void 0, this.socket.onmessage = void 0, this.supportsPing() && (this.socket.onactivity = void 0))
    }, n.changeState = function(t, n) {
      this.state = t, this.timeline.info(this.buildTimelineMessage({
        state: t,
        params: n
      })), this.emit(t, n)
    }, n.buildTimelineMessage = function(t) {
      return Pusher.Util.extend({
        cid: this.id
      }, t)
    }, Pusher.TransportConnection = t
  }.call(this),
  function() {
    function t(t) {
      this.hooks = t
    }
    var n = t.prototype;
    n.isSupported = function(t) {
      return this.hooks.isSupported(t)
    }, n.createConnection = function(t, n, e, r) {
      return new Pusher.TransportConnection(this.hooks, t, n, e, r)
    }, Pusher.Transport = t
  }.call(this),
  function() {
    Pusher.WSTransport = new Pusher.Transport({
      urls: Pusher.URLSchemes.ws,
      handlesActivityChecks: !1,
      supportsPing: !1,
      isInitialized: function() {
        return Boolean(window.WebSocket || window.MozWebSocket)
      },
      isSupported: function() {
        return Boolean(window.WebSocket || window.MozWebSocket)
      },
      getSocket: function(t) {
        var n = window.WebSocket || window.MozWebSocket;
        return new n(t)
      }
    }), Pusher.FlashTransport = new Pusher.Transport({
      file: "flashfallback",
      urls: Pusher.URLSchemes.flash,
      handlesActivityChecks: !1,
      supportsPing: !1,
      isSupported: function() {
        try {
          return Boolean(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
        } catch (t) {
          try {
            var n = Pusher.Util.getNavigator();
            return Boolean(n && n.mimeTypes && void 0 !== n.mimeTypes["application/x-shockwave-flash"])
          } catch (e) {
            return !1
          }
        }
      },
      beforeInitialize: function() {
        void 0 === window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR && (window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = !0), window.WEB_SOCKET_SWF_LOCATION = Pusher.Dependencies.getRoot({
          encrypted: this.options.encrypted
        }) + "/WebSocketMain.swf"
      },
      isInitialized: function() {
        return void 0 !== window.FlashWebSocket
      },
      getSocket: function(t) {
        return new FlashWebSocket(t)
      }
    }), Pusher.SockJSTransport = new Pusher.Transport({
      file: "sockjs",
      urls: Pusher.URLSchemes.sockjs,
      handlesActivityChecks: !0,
      supportsPing: !1,
      isSupported: function() {
        return !0
      },
      isInitialized: function() {
        return void 0 !== window.SockJS
      },
      getSocket: function(t, n) {
        return new SockJS(t, null, {
          js_path: Pusher.Dependencies.getPath("sockjs", {
            encrypted: n.encrypted
          }),
          ignore_null_origin: n.ignoreNullOrigin
        })
      },
      beforeOpen: function(t, n) {
        t.send(JSON.stringify({
          path: n
        }))
      }
    });
    var t = {
        urls: Pusher.URLSchemes.http,
        handlesActivityChecks: !1,
        supportsPing: !0,
        isInitialized: function() {
          return Boolean(Pusher.HTTP.Socket)
        }
      },
      n = Pusher.Util.extend({
        getSocket: function(t) {
          return Pusher.HTTP.getStreamingSocket(t)
        }
      }, t),
      e = Pusher.Util.extend({
        getSocket: function(t) {
          return Pusher.HTTP.getPollingSocket(t)
        }
      }, t),
      r = {
        file: "xhr",
        isSupported: Pusher.Util.isXHRSupported
      },
      i = {
        file: "xdr",
        isSupported: function(t) {
          return Pusher.Util.isXDRSupported(t.encrypted)
        }
      };
    Pusher.XHRStreamingTransport = new Pusher.Transport(Pusher.Util.extend({}, n, r)), Pusher.XDRStreamingTransport = new Pusher.Transport(Pusher.Util.extend({}, n, i)), Pusher.XHRPollingTransport = new Pusher.Transport(Pusher.Util.extend({}, e, r)), Pusher.XDRPollingTransport = new Pusher.Transport(Pusher.Util.extend({}, e, i))
  }.call(this),
  function() {
    function t(t, n, e) {
      this.manager = t, this.transport = n, this.minPingDelay = e.minPingDelay, this.maxPingDelay = e.maxPingDelay, this.pingDelay = void 0
    }
    var n = t.prototype;
    n.createConnection = function(t, n, e, r) {
      var i = this;
      r = Pusher.Util.extend({}, r, {
        activityTimeout: i.pingDelay
      });
      var o = i.transport.createConnection(t, n, e, r),
        a = null,
        u = function() {
          o.unbind("open", u), o.bind("closed", s), a = Pusher.Util.now()
        },
        s = function(t) {
          if (o.unbind("closed", s), 1002 === t.code || 1003 === t.code) i.manager.reportDeath();
          else if (!t.wasClean && a) {
            var n = Pusher.Util.now() - a;
            n < 2 * i.maxPingDelay && (i.manager.reportDeath(), i.pingDelay = Math.max(n / 2, i.minPingDelay))
          }
        };
      return o.bind("open", u), o
    }, n.isSupported = function(t) {
      return this.manager.isAlive() && this.transport.isSupported(t)
    }, Pusher.AssistantToTheTransportManager = t
  }.call(this),
  function() {
    function t(t) {
      this.options = t || {}, this.livesLeft = this.options.lives || 1 / 0
    }
    var n = t.prototype;
    n.getAssistant = function(t) {
      return new Pusher.AssistantToTheTransportManager(this, t, {
        minPingDelay: this.options.minPingDelay,
        maxPingDelay: this.options.maxPingDelay
      })
    }, n.isAlive = function() {
      return this.livesLeft > 0
    }, n.reportDeath = function() {
      this.livesLeft -= 1
    }, Pusher.TransportManager = t
  }.call(this),
  function() {
    function t(t) {
      return function(n) {
        return [t.apply(this, arguments), n]
      }
    }

    function n(t) {
      return "string" == typeof t && ":" === t.charAt(0)
    }

    function e(t, n) {
      return n[t.slice(1)]
    }

    function r(t, n) {
      if (0 === t.length) return [
        [], n
      ];
      var e = a(t[0], n),
        i = r(t.slice(1), e[1]);
      return [
        [e[0]].concat(i[0]), i[1]
      ]
    }

    function i(t, r) {
      if (!n(t)) return [t, r];
      var i = e(t, r);
      if (void 0 === i) throw "Undefined symbol " + t;
      return [i, r]
    }

    function o(t, i) {
      if (n(t[0])) {
        var o = e(t[0], i);
        if (t.length > 1) {
          if ("function" != typeof o) throw "Calling non-function " + t[0];
          var u = [Pusher.Util.extend({}, i)].concat(Pusher.Util.map(t.slice(1), function(t) {
            return a(t, Pusher.Util.extend({}, i))[0]
          }));
          return o.apply(this, u)
        }
        return [o, i]
      }
      return r(t, i)
    }

    function a(t, n) {
      return "string" == typeof t ? i(t, n) : "object" == typeof t && t instanceof Array && t.length > 0 ? o(t, n) : [t, n]
    }
    var u = {
        build: function(t, n) {
          var e = Pusher.Util.extend({}, l, n);
          return a(t, e)[1].strategy
        }
      },
      s = {
        ws: Pusher.WSTransport,
        flash: Pusher.FlashTransport,
        sockjs: Pusher.SockJSTransport,
        xhr_streaming: Pusher.XHRStreamingTransport,
        xdr_streaming: Pusher.XDRStreamingTransport,
        xhr_polling: Pusher.XHRPollingTransport,
        xdr_polling: Pusher.XDRPollingTransport
      },
      c = {
        isSupported: function() {
          return !1
        },
        connect: function(t, n) {
          var e = Pusher.Util.defer(function() {
            n(new Pusher.Errors.UnsupportedStrategy)
          });
          return {
            abort: function() {
              e.ensureAborted()
            },
            forceMinPriority: function() {}
          }
        }
      },
      l = {
        extend: function(t, n, e) {
          return [Pusher.Util.extend({}, n, e), t]
        },
        def: function(t, n, e) {
          if (void 0 !== t[n]) throw "Redefining symbol " + n;
          return t[n] = e, [void 0, t]
        },
        def_transport: function(t, n, e, r, i, o) {
          var a = s[e];
          if (!a) throw new Pusher.Errors.UnsupportedTransport(e);
          var u, l = !(t.enabledTransports && -1 === Pusher.Util.arrayIndexOf(t.enabledTransports, n) || t.disabledTransports && -1 !== Pusher.Util.arrayIndexOf(t.disabledTransports, n) || "flash" === n && t.disableFlash === !0);
          u = l ? new Pusher.TransportStrategy(n, r, o ? o.getAssistant(a) : a, Pusher.Util.extend({
            key: t.key,
            encrypted: t.encrypted,
            timeline: t.timeline,
            ignoreNullOrigin: t.ignoreNullOrigin
          }, i)) : c;
          var f = t.def(t, n, u)[1];
          return f.transports = t.transports || {}, f.transports[n] = u, [void 0, f]
        },
        transport_manager: t(function(t, n) {
          return new Pusher.TransportManager(n)
        }),
        sequential: t(function(t, n) {
          var e = Array.prototype.slice.call(arguments, 2);
          return new Pusher.SequentialStrategy(e, n)
        }),
        cached: t(function(t, n, e) {
          return new Pusher.CachedStrategy(e, t.transports, {
            ttl: n,
            timeline: t.timeline,
            encrypted: t.encrypted
          })
        }),
        first_connected: t(function(t, n) {
          return new Pusher.FirstConnectedStrategy(n)
        }),
        best_connected_ever: t(function() {
          var t = Array.prototype.slice.call(arguments, 1);
          return new Pusher.BestConnectedEverStrategy(t)
        }),
        delayed: t(function(t, n, e) {
          return new Pusher.DelayedStrategy(e, {
            delay: n
          })
        }),
        "if": t(function(t, n, e, r) {
          return new Pusher.IfStrategy(n, e, r)
        }),
        is_supported: t(function(t, n) {
          return function() {
            return n.isSupported()
          }
        })
      };
    Pusher.StrategyBuilder = u
  }.call(this),
  function() {
    var t = {};
    t.decodeMessage = function(t) {
      try {
        var n = JSON.parse(t.data);
        if ("string" == typeof n.data) try {
          n.data = JSON.parse(n.data)
        } catch (e) {
          if (!(e instanceof SyntaxError)) throw e
        }
        return n
      } catch (e) {
        throw {
          type: "MessageParseError",
          error: e,
          data: t.data
        }
      }
    }, t.encodeMessage = function(t) {
      return JSON.stringify(t)
    }, t.processHandshake = function(t) {
      if (t = this.decodeMessage(t), "pusher:connection_established" === t.event) {
        if (!t.data.activity_timeout) throw "No activity timeout specified in handshake";
        return {
          action: "connected",
          id: t.data.socket_id,
          activityTimeout: 1e3 * t.data.activity_timeout
        }
      }
      if ("pusher:error" === t.event) return {
        action: this.getCloseAction(t.data),
        error: this.getCloseError(t.data)
      };
      throw "Invalid handshake"
    }, t.getCloseAction = function(t) {
      return t.code < 4e3 ? t.code >= 1002 && t.code <= 1004 ? "backoff" : null : 4e3 === t.code ? "ssl_only" : t.code < 4100 ? "refused" : t.code < 4200 ? "backoff" : t.code < 4300 ? "retry" : "refused"
    }, t.getCloseError = function(t) {
      return 1e3 !== t.code && 1001 !== t.code ? {
        type: "PusherError",
        data: {
          code: t.code,
          message: t.reason || t.message
        }
      } : null
    }, Pusher.Protocol = t
  }.call(this),
  function() {
    function t(t, n) {
      Pusher.EventsDispatcher.call(this), this.id = t, this.transport = n, this.activityTimeout = n.activityTimeout, this.bindListeners()
    }
    var n = t.prototype;
    Pusher.Util.extend(n, Pusher.EventsDispatcher.prototype), n.handlesActivityChecks = function() {
      return this.transport.handlesActivityChecks()
    }, n.send = function(t) {
      return this.transport.send(t)
    }, n.send_event = function(t, n, e) {
      var r = {
        event: t,
        data: n
      };
      return e && (r.channel = e), Pusher.debug("Event sent", r), this.send(Pusher.Protocol.encodeMessage(r))
    }, n.ping = function() {
      this.transport.supportsPing() ? this.transport.ping() : this.send_event("pusher:ping", {})
    }, n.close = function() {
      this.transport.close()
    }, n.bindListeners = function() {
      var t = this,
        n = {
          message: function(n) {
            var e;
            try {
              e = Pusher.Protocol.decodeMessage(n)
            } catch (r) {
              t.emit("error", {
                type: "MessageParseError",
                error: r,
                data: n.data
              })
            }
            if (void 0 !== e) {
              switch (Pusher.debug("Event recd", e), e.event) {
                case "pusher:error":
                  t.emit("error", {
                    type: "PusherError",
                    data: e.data
                  });
                  break;
                case "pusher:ping":
                  t.emit("ping");
                  break;
                case "pusher:pong":
                  t.emit("pong")
              }
              t.emit("message", e)
            }
          },
          activity: function() {
            t.emit("activity")
          },
          error: function(n) {
            t.emit("error", {
              type: "WebSocketError",
              error: n
            })
          },
          closed: function(n) {
            e(), n && n.code && t.handleCloseEvent(n), t.transport = null, t.emit("closed")
          }
        },
        e = function() {
          Pusher.Util.objectApply(n, function(n, e) {
            t.transport.unbind(e, n)
          })
        };
      Pusher.Util.objectApply(n, function(n, e) {
        t.transport.bind(e, n)
      })
    }, n.handleCloseEvent = function(t) {
      var n = Pusher.Protocol.getCloseAction(t),
        e = Pusher.Protocol.getCloseError(t);
      e && this.emit("error", e), n && this.emit(n)
    }, Pusher.Connection = t
  }.call(this),
  function() {
    function t(t, n) {
      this.transport = t, this.callback = n, this.bindListeners()
    }
    var n = t.prototype;
    n.close = function() {
      this.unbindListeners(), this.transport.close()
    }, n.bindListeners = function() {
      var t = this;
      t.onMessage = function(n) {
        t.unbindListeners();
        try {
          var e = Pusher.Protocol.processHandshake(n);
          "connected" === e.action ? t.finish("connected", {
            connection: new Pusher.Connection(e.id, t.transport),
            activityTimeout: e.activityTimeout
          }) : (t.finish(e.action, {
            error: e.error
          }), t.transport.close())
        } catch (r) {
          t.finish("error", {
            error: r
          }), t.transport.close()
        }
      }, t.onClosed = function(n) {
        t.unbindListeners();
        var e = Pusher.Protocol.getCloseAction(n) || "backoff",
          r = Pusher.Protocol.getCloseError(n);
        t.finish(e, {
          error: r
        })
      }, t.transport.bind("message", t.onMessage), t.transport.bind("closed", t.onClosed)
    }, n.unbindListeners = function() {
      this.transport.unbind("message", this.onMessage), this.transport.unbind("closed", this.onClosed)
    }, n.finish = function(t, n) {
      this.callback(Pusher.Util.extend({
        transport: this.transport,
        action: t
      }, n))
    }, Pusher.Handshake = t
  }.call(this),
  function() {
    function t(t, n) {
      Pusher.EventsDispatcher.call(this), this.key = t, this.options = n || {}, this.state = "initialized", this.connection = null, this.encrypted = !!n.encrypted, this.timeline = this.options.timeline, this.connectionCallbacks = this.buildConnectionCallbacks(), this.errorCallbacks = this.buildErrorCallbacks(), this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);
      var e = this;
      Pusher.Network.bind("online", function() {
        e.timeline.info({
          netinfo: "online"
        }), ("connecting" === e.state || "unavailable" === e.state) && e.retryIn(0)
      }), Pusher.Network.bind("offline", function() {
        e.timeline.info({
          netinfo: "offline"
        }), e.connection && e.sendActivityCheck()
      }), this.updateStrategy()
    }
    var n = t.prototype;
    Pusher.Util.extend(n, Pusher.EventsDispatcher.prototype), n.connect = function() {
      if (!this.connection && !this.runner) {
        if (!this.strategy.isSupported()) return void this.updateState("failed");
        this.updateState("connecting"), this.startConnecting(), this.setUnavailableTimer()
      }
    }, n.send = function(t) {
      return this.connection ? this.connection.send(t) : !1
    }, n.send_event = function(t, n, e) {
      return this.connection ? this.connection.send_event(t, n, e) : !1
    }, n.disconnect = function() {
      this.disconnectInternally(), this.updateState("disconnected")
    }, n.isEncrypted = function() {
      return this.encrypted
    }, n.startConnecting = function() {
      var t = this,
        n = function(e, r) {
          e ? t.runner = t.strategy.connect(0, n) : "error" === r.action ? (t.emit("error", {
            type: "HandshakeError",
            error: r.error
          }), t.timeline.error({
            handshakeError: r.error
          })) : (t.abortConnecting(), t.handshakeCallbacks[r.action](r))
        };
      t.runner = t.strategy.connect(0, n)
    }, n.abortConnecting = function() {
      this.runner && (this.runner.abort(), this.runner = null)
    }, n.disconnectInternally = function() {
      if (this.abortConnecting(), this.clearRetryTimer(), this.clearUnavailableTimer(), this.connection) {
        var t = this.abandonConnection();
        t.close()
      }
    }, n.updateStrategy = function() {
      this.strategy = this.options.getStrategy({
        key: this.key,
        timeline: this.timeline,
        encrypted: this.encrypted
      })
    }, n.retryIn = function(t) {
      var n = this;
      n.timeline.info({
        action: "retry",
        delay: t
      }), t > 0 && n.emit("connecting_in", Math.round(t / 1e3)), n.retryTimer = new Pusher.Timer(t || 0, function() {
        n.disconnectInternally(), n.connect()
      })
    }, n.clearRetryTimer = function() {
      this.retryTimer && (this.retryTimer.ensureAborted(), this.retryTimer = null)
    }, n.setUnavailableTimer = function() {
      var t = this;
      t.unavailableTimer = new Pusher.Timer(t.options.unavailableTimeout, function() {
        t.updateState("unavailable")
      })
    }, n.clearUnavailableTimer = function() {
      this.unavailableTimer && this.unavailableTimer.ensureAborted()
    }, n.sendActivityCheck = function() {
      var t = this;
      t.stopActivityCheck(), t.connection.ping(), t.activityTimer = new Pusher.Timer(t.options.pongTimeout, function() {
        t.timeline.error({
          pong_timed_out: t.options.pongTimeout
        }), t.retryIn(0)
      })
    }, n.resetActivityCheck = function() {
      var t = this;
      t.stopActivityCheck(), t.connection.handlesActivityChecks() || (t.activityTimer = new Pusher.Timer(t.activityTimeout, function() {
        t.sendActivityCheck()
      }))
    }, n.stopActivityCheck = function() {
      this.activityTimer && this.activityTimer.ensureAborted()
    }, n.buildConnectionCallbacks = function() {
      var t = this;
      return {
        message: function(n) {
          t.resetActivityCheck(), t.emit("message", n)
        },
        ping: function() {
          t.send_event("pusher:pong", {})
        },
        activity: function() {
          t.resetActivityCheck()
        },
        error: function(n) {
          t.emit("error", {
            type: "WebSocketError",
            error: n
          })
        },
        closed: function() {
          t.abandonConnection(), t.shouldRetry() && t.retryIn(1e3)
        }
      }
    }, n.buildHandshakeCallbacks = function(t) {
      var n = this;
      return Pusher.Util.extend({}, t, {
        connected: function(t) {
          n.activityTimeout = Math.min(n.options.activityTimeout, t.activityTimeout, t.connection.activityTimeout || 1 / 0), n.clearUnavailableTimer(), n.setConnection(t.connection), n.socket_id = n.connection.id, n.updateState("connected", {
            socket_id: n.socket_id
          })
        }
      })
    }, n.buildErrorCallbacks = function() {
      function t(t) {
        return function(e) {
          e.error && n.emit("error", {
            type: "WebSocketError",
            error: e.error
          }), t(e)
        }
      }
      var n = this;
      return {
        ssl_only: t(function() {
          n.encrypted = !0, n.updateStrategy(), n.retryIn(0)
        }),
        refused: t(function() {
          n.disconnect()
        }),
        backoff: t(function() {
          n.retryIn(1e3)
        }),
        retry: t(function() {
          n.retryIn(0)
        })
      }
    }, n.setConnection = function(t) {
      this.connection = t;
      for (var n in this.connectionCallbacks) this.connection.bind(n, this.connectionCallbacks[n]);
      this.resetActivityCheck()
    }, n.abandonConnection = function() {
      if (this.connection) {
        this.stopActivityCheck();
        for (var t in this.connectionCallbacks) this.connection.unbind(t, this.connectionCallbacks[t]);
        var n = this.connection;
        return this.connection = null, n
      }
    }, n.updateState = function(t, n) {
      var e = this.state;
      this.state = t, e !== t && (Pusher.debug("State changed", e + " -> " + t), this.timeline.info({
        state: t,
        params: n
      }), this.emit("state_change", {
        previous: e,
        current: t
      }), this.emit(t, n))
    }, n.shouldRetry = function() {
      return "connecting" === this.state || "connected" === this.state
    }, Pusher.ConnectionManager = t
  }.call(this),
  function() {
    function t() {
      Pusher.EventsDispatcher.call(this);
      var t = this;
      void 0 !== window.addEventListener && (window.addEventListener("online", function() {
        t.emit("online")
      }, !1), window.addEventListener("offline", function() {
        t.emit("offline")
      }, !1))
    }
    Pusher.Util.extend(t.prototype, Pusher.EventsDispatcher.prototype);
    var n = t.prototype;
    n.isOnline = function() {
      return void 0 === window.navigator.onLine ? !0 : window.navigator.onLine
    }, Pusher.NetInfo = t, Pusher.Network = new t
  }.call(this),
  function() {
    function t() {
      this.reset()
    }
    var n = t.prototype;
    n.get = function(t) {
      return Object.prototype.hasOwnProperty.call(this.members, t) ? {
        id: t,
        info: this.members[t]
      } : null
    }, n.each = function(t) {
      var n = this;
      Pusher.Util.objectApply(n.members, function(e, r) {
        t(n.get(r))
      })
    }, n.setMyID = function(t) {
      this.myID = t
    }, n.onSubscription = function(t) {
      this.members = t.presence.hash, this.count = t.presence.count, this.me = this.get(this.myID)
    }, n.addMember = function(t) {
      return null === this.get(t.user_id) && this.count++, this.members[t.user_id] = t.user_info, this.get(t.user_id)
    }, n.removeMember = function(t) {
      var n = this.get(t.user_id);
      return n && (delete this.members[t.user_id], this.count--), n
    }, n.reset = function() {
      this.members = {}, this.count = 0, this.myID = null, this.me = null
    }, Pusher.Members = t
  }.call(this),
  function() {
    function t(t, n) {
      Pusher.EventsDispatcher.call(this, function(n, e) {
        Pusher.debug("No callbacks on " + t + " for " + n)
      }), this.name = t, this.pusher = n, this.subscribed = !1
    }
    var n = t.prototype;
    Pusher.Util.extend(n, Pusher.EventsDispatcher.prototype), n.authorize = function(t, n) {
      return n(!1, {})
    }, n.trigger = function(t, n) {
      if (0 !== t.indexOf("client-")) throw new Pusher.Errors.BadEventName("Event '" + t + "' does not start with 'client-'");
      return this.pusher.send_event(t, n, this.name)
    }, n.disconnect = function() {
      this.subscribed = !1
    }, n.handleEvent = function(t, n) {
      0 === t.indexOf("pusher_internal:") ? "pusher_internal:subscription_succeeded" === t && (this.subscribed = !0, this.emit("pusher:subscription_succeeded", n)) : this.emit(t, n)
    }, n.subscribe = function() {
      var t = this;
      t.authorize(t.pusher.connection.socket_id, function(n, e) {
        n ? t.handleEvent("pusher:subscription_error", e) : t.pusher.send_event("pusher:subscribe", {
          auth: e.auth,
          channel_data: e.channel_data,
          channel: t.name
        })
      })
    }, n.unsubscribe = function() {
      this.pusher.send_event("pusher:unsubscribe", {
        channel: this.name
      })
    }, Pusher.Channel = t
  }.call(this),
  function() {
    function t(t, n) {
      Pusher.Channel.call(this, t, n)
    }
    var n = t.prototype;
    Pusher.Util.extend(n, Pusher.Channel.prototype), n.authorize = function(t, n) {
      var e = new Pusher.Channel.Authorizer(this, this.pusher.config);
      return e.authorize(t, n)
    }, Pusher.PrivateChannel = t
  }.call(this),
  function() {
    function t(t, n) {
      Pusher.PrivateChannel.call(this, t, n), this.members = new Pusher.Members
    }
    var n = t.prototype;
    Pusher.Util.extend(n, Pusher.PrivateChannel.prototype), n.authorize = function(t, n) {
      var e = Pusher.PrivateChannel.prototype.authorize,
        r = this;
      e.call(r, t, function(t, e) {
        if (!t) {
          if (void 0 === e.channel_data) return Pusher.warn("Invalid auth response for channel '" + r.name + "', expected 'channel_data' field"), void n("Invalid auth response");
          var i = JSON.parse(e.channel_data);
          r.members.setMyID(i.user_id)
        }
        n(t, e)
      })
    }, n.handleEvent = function(t, n) {
      switch (t) {
        case "pusher_internal:subscription_succeeded":
          this.members.onSubscription(n), this.subscribed = !0, this.emit("pusher:subscription_succeeded", this.members);
          break;
        case "pusher_internal:member_added":
          var e = this.members.addMember(n);
          this.emit("pusher:member_added", e);
          break;
        case "pusher_internal:member_removed":
          var r = this.members.removeMember(n);
          r && this.emit("pusher:member_removed", r);
          break;
        default:
          Pusher.PrivateChannel.prototype.handleEvent.call(this, t, n)
      }
    }, n.disconnect = function() {
      this.members.reset(), Pusher.PrivateChannel.prototype.disconnect.call(this)
    }, Pusher.PresenceChannel = t
  }.call(this),
  function() {
    function t() {
      this.channels = {}
    }

    function n(t, n) {
      return 0 === t.indexOf("private-") ? new Pusher.PrivateChannel(t, n) : 0 === t.indexOf("presence-") ? new Pusher.PresenceChannel(t, n) : new Pusher.Channel(t, n)
    }
    var e = t.prototype;
    e.add = function(t, e) {
      return this.channels[t] || (this.channels[t] = n(t, e)), this.channels[t]
    }, e.all = function(t) {
      return Pusher.Util.values(this.channels)
    }, e.find = function(t) {
      return this.channels[t]
    }, e.remove = function(t) {
      var n = this.channels[t];
      return delete this.channels[t], n
    }, e.disconnect = function() {
      Pusher.Util.objectApply(this.channels, function(t) {
        t.disconnect()
      })
    }, Pusher.Channels = t
  }.call(this),
  function() {
    Pusher.Channel.Authorizer = function(t, n) {
      this.channel = t, this.type = n.authTransport, this.options = n, this.authOptions = (n || {}).auth || {}
    }, Pusher.Channel.Authorizer.prototype = {
      composeQuery: function(t) {
        var n = "socket_id=" + encodeURIComponent(t) + "&channel_name=" + encodeURIComponent(this.channel.name);
        for (var e in this.authOptions.params) n += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(this.authOptions.params[e]);
        return n
      },
      authorize: function(t, n) {
        return Pusher.authorizers[this.type].call(this, t, n)
      }
    };
    var t = 1;
    Pusher.auth_callbacks = {}, Pusher.authorizers = {
      ajax: function(t, n) {
        var e, r = this;
        e = Pusher.XHR ? new Pusher.XHR : window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), e.open("POST", r.options.authEndpoint, !0), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        for (var i in this.authOptions.headers) e.setRequestHeader(i, this.authOptions.headers[i]);
        return e.onreadystatechange = function() {
          if (4 === e.readyState)
            if (200 === e.status) {
              var t, r = !1;
              try {
                t = JSON.parse(e.responseText), r = !0
              } catch (i) {
                n(!0, "JSON returned from webapp was invalid, yet status code was 200. Data was: " + e.responseText)
              }
              r && n(!1, t)
            } else Pusher.warn("Couldn't get auth info from your webapp", e.status), n(!0, e.status)
        }, e.send(this.composeQuery(t)), e
      },
      jsonp: function(n, e) {
        void 0 !== this.authOptions.headers && Pusher.warn("Warn", "To send headers with the auth request, you must use AJAX, rather than JSONP.");
        var r = t.toString();
        t++;
        var i = Pusher.Util.getDocument(),
          o = i.createElement("script");
        Pusher.auth_callbacks[r] = function(t) {
          e(!1, t)
        };
        var a = "Pusher.auth_callbacks['" + r + "']";
        o.src = this.options.authEndpoint + "?callback=" + encodeURIComponent(a) + "&" + this.composeQuery(n);
        var u = i.getElementsByTagName("head")[0] || i.documentElement;
        u.insertBefore(o, u.firstChild)
      }
    }
  }.call(this),
  function() {
    function t(t, n) {
      if (t !== n) {
        var e = t === t,
          r = n === n;
        if (t > n || !e || "undefined" == typeof t && r) return 1;
        if (n > t || !r || "undefined" == typeof n && e) return -1
      }
      return 0
    }

    function n(t, n, e) {
      if (n !== n) return p(t, e);
      for (var r = (e || 0) - 1, i = t.length; ++r < i;)
        if (t[r] === n) return r;
      return -1
    }

    function e(t) {
      return "function" == typeof t || !1
    }

    function r(t, n) {
      var e = t.length;
      for (t.sort(n); e--;) t[e] = t[e].value;
      return t
    }

    function i(t) {
      return "string" == typeof t ? t : null == t ? "" : t + ""
    }

    function o(t) {
      return t.charCodeAt(0)
    }

    function a(t, n) {
      for (var e = -1, r = t.length; ++e < r && n.indexOf(t.charAt(e)) > -1;);
      return e
    }

    function u(t, n) {
      for (var e = t.length; e-- && n.indexOf(t.charAt(e)) > -1;);
      return e
    }

    function s(n, e) {
      return t(n.criteria, e.criteria) || n.index - e.index
    }

    function c(n, e) {
      for (var r = -1, i = n.criteria, o = e.criteria, a = i.length; ++r < a;) {
        var u = t(i[r], o[r]);
        if (u) return u
      }
      return n.index - e.index
    }

    function l(t) {
      return Ut[t]
    }

    function f(t) {
      return zt[t]
    }

    function h(t) {
      return "\\" + Bt[t]
    }

    function p(t, n, e) {
      for (var r = t.length, i = e ? n || r : (n || 0) - 1; e ? i-- : ++i < r;) {
        var o = t[i];
        if (o !== o) return i
      }
      return -1
    }

    function d(t) {
      return t && "object" == typeof t || !1
    }

    function g(t) {
      return 160 >= t && t >= 9 && 13 >= t || 32 == t || 160 == t || 5760 == t || 6158 == t || t >= 8192 && (8202 >= t || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
    }

    function v(t, n) {
      for (var e = -1, r = t.length, i = -1, o = []; ++e < r;) t[e] === n && (t[e] = F, o[++i] = e);
      return o
    }

    function m(t, n) {
      for (var e, r = -1, i = t.length, o = -1, a = []; ++r < i;) {
        var u = t[r],
          s = n ? n(u, r, t) : u;
        r && e === s || (e = s, a[++o] = u)
      }
      return a
    }

    function y(t) {
      for (var n = -1, e = t.length; ++n < e && g(t.charCodeAt(n)););
      return n
    }

    function b(t) {
      for (var n = t.length; n-- && g(t.charCodeAt(n)););
      return n
    }

    function w(t) {
      return Ft[t]
    }

    function A(g) {
      function Y(t) {
        if (d(t) && !Za(t) && !(t instanceof Ut)) {
          if (t instanceof tt) return t;
          if (ea.call(t, "__chain__") && ea.call(t, "__wrapped__")) return Ie(t)
        }
        return new tt(t)
      }

      function Z() {}

      function tt(t, n, e) {
        this.__wrapped__ = t, this.__actions__ = e || [], this.__chain__ = !!n
      }

      function Ut(t) {
        this.__wrapped__ = t, this.__actions__ = null, this.__dir__ = 1, this.__dropCount__ = 0, this.__filtered__ = !1, this.__iteratees__ = null, this.__takeCount__ = Da, this.__views__ = null
      }

      function zt() {
        var t = this.__actions__,
          n = this.__iteratees__,
          e = this.__views__,
          r = new Ut(this.__wrapped__);
        return r.__actions__ = t ? Kt(t) : null, r.__dir__ = this.__dir__, r.__dropCount__ = this.__dropCount__, r.__filtered__ = this.__filtered__, r.__iteratees__ = n ? Kt(n) : null, r.__takeCount__ = this.__takeCount__, r.__views__ = e ? Kt(e) : null, r
      }

      function Ft() {
        if (this.__filtered__) {
          var t = new Ut(this);
          t.__dir__ = -1, t.__filtered__ = !0
        } else t = this.clone(), t.__dir__ *= -1;
        return t
      }

      function Ht() {
        var t = this.__wrapped__.value();
        if (!Za(t)) return Jn(t, this.__actions__);
        var n = this.__dir__,
          e = 0 > n,
          r = we(0, t.length, this.__views__),
          i = r.start,
          o = r.end,
          a = o - i,
          u = this.__dropCount__,
          s = Sa(a, this.__takeCount__),
          c = e ? o : i - 1,
          l = this.__iteratees__,
          f = l ? l.length : 0,
          h = 0,
          p = [];
        t: for (; a-- && s > h;) {
          c += n;
          for (var d = -1, g = t[c]; ++d < f;) {
            var v = l[d],
              m = v.iteratee,
              y = m(g, c, t),
              b = v.type;
            if (b == q) g = y;
            else if (!y) {
              if (b == I) continue t;
              break t
            }
          }
          u ? u-- : p[h++] = g
        }
        return p
      }

      function Bt() {
        this.__data__ = {}
      }

      function $t(t) {
        return this.has(t) && delete this.__data__[t]
      }

      function Xt(t) {
        return "__proto__" == t ? x : this.__data__[t]
      }

      function Vt(t) {
        return "__proto__" != t && ea.call(this.__data__, t)
      }

      function Yt(t, n) {
        return "__proto__" != t && (this.__data__[t] = n), this
      }

      function Qt(t) {
        var n = t ? t.length : 0;
        for (this.data = {
            hash: xa(null),
            set: new ga
          }; n--;) this.push(t[n])
      }

      function Jt(t, n) {
        var e = t.data,
          r = "string" == typeof n || Ci(n) ? e.set.has(n) : e.hash[n];
        return r ? 0 : -1
      }

      function Zt(t) {
        var n = this.data;
        "string" == typeof t || Ci(t) ? n.set.add(t) : n.hash[t] = !0
      }

      function Kt(t, n) {
        var e = -1,
          r = t.length;
        for (n || (n = Fo(r)); ++e < r;) n[e] = t[e];
        return n
      }

      function tn(t, n) {
        for (var e = -1, r = t.length; ++e < r && n(t[e], e, t) !== !1;);
        return t
      }

      function nn(t, n) {
        for (var e = t.length; e-- && n(t[e], e, t) !== !1;);
        return t
      }

      function en(t, n) {
        for (var e = -1, r = t.length; ++e < r;)
          if (!n(t[e], e, t)) return !1;
        return !0
      }

      function rn(t, n) {
        for (var e = -1, r = t.length, i = -1, o = []; ++e < r;) {
          var a = t[e];
          n(a, e, t) && (o[++i] = a)
        }
        return o
      }

      function on(t, n) {
        for (var e = -1, r = t.length, i = Fo(r); ++e < r;) i[e] = n(t[e], e, t);
        return i
      }

      function an(t) {
        for (var n = -1, e = t.length, r = Na; ++n < e;) {
          var i = t[n];
          i > r && (r = i)
        }
        return r
      }

      function un(t) {
        for (var n = -1, e = t.length, r = Da; ++n < e;) {
          var i = t[n];
          r > i && (r = i)
        }
        return r
      }

      function sn(t, n, e, r) {
        var i = -1,
          o = t.length;
        for (r && o && (e = t[++i]); ++i < o;) e = n(e, t[i], i, t);
        return e
      }

      function cn(t, n, e, r) {
        var i = t.length;
        for (r && i && (e = t[--i]); i--;) e = n(e, t[i], i, t);
        return e
      }

      function ln(t, n) {
        for (var e = -1, r = t.length; ++e < r;)
          if (n(t[e], e, t)) return !0;
        return !1
      }

      function fn(t, n) {
        return "undefined" == typeof t ? n : t
      }

      function hn(t, n, e, r) {
        return "undefined" != typeof t && ea.call(r, e) ? t : n
      }

      function pn(t, n, e) {
        var r = ru(n);
        if (!e) return gn(n, t, r);
        for (var i = -1, o = r.length; ++i < o;) {
          var a = r[i],
            u = t[a],
            s = e(u, n[a], a, t, n);
          (s === s ? s === u : u !== u) && ("undefined" != typeof u || a in t) || (t[a] = s)
        }
        return t
      }

      function dn(t, n) {
        for (var e = -1, r = t.length, i = Ee(r), o = n.length, a = Fo(o); ++e < o;) {
          var u = n[e];
          i ? (u = parseFloat(u), a[e] = ke(u, r) ? t[u] : x) : a[e] = t[u]
        }
        return a
      }

      function gn(t, n, e) {
        e || (e = n, n = {});
        for (var r = -1, i = e.length; ++r < i;) {
          var o = e[r];
          n[o] = t[o]
        }
        return n
      }

      function vn(t, n) {
        for (var e = -1, r = n.length; ++e < r;) {
          var i = n[e];
          t[i] = pe(t[i], M, t)
        }
        return t
      }

      function mn(t, n, e) {
        var r = typeof t;
        return "function" == r ? "undefined" != typeof n && Me(t) ? te(t, n, e) : t : null == t ? Po : "object" == r ? Un(t) : "undefined" == typeof n ? Bn(t + "") : zn(t + "", n)
      }

      function yn(t, n, e, r, i, o, a) {
        var u;
        if (e && (u = i ? e(t, r, i) : e(t)), "undefined" != typeof u) return u;
        if (!Ci(t)) return t;
        var s = Za(t);
        if (s) {
          if (u = Ae(t), !n) return Kt(t, u)
        } else {
          var c = ia.call(t),
            l = c == V;
          if (c != Q && c != H && (!l || i)) return It[c] ? _e(t, c, n) : i ? t : {};
          if (u = xe(l ? {} : t), !n) return gn(t, u, ru(t))
        }
        o || (o = []), a || (a = []);
        for (var f = o.length; f--;)
          if (o[f] == t) return a[f];
        return o.push(t), a.push(u), (s ? tn : Nn)(t, function(r, i) {
          u[i] = yn(r, n, e, i, t, o, a)
        }), u
      }

      function bn(t, n, e, r) {
        if ("function" != typeof t) throw new Qo(z);
        return va(function() {
          t.apply(x, Vn(e, r))
        }, n)
      }

      function wn(t, e) {
        var r = t ? t.length : 0,
          i = [];
        if (!r) return i;
        var o = -1,
          a = be(),
          u = a == n,
          s = u && e.length >= 200 && Ha(e),
          c = e.length;
        s && (a = Jt, u = !1, e = s);
        t: for (; ++o < r;) {
          var l = t[o];
          if (u && l === l) {
            for (var f = c; f--;)
              if (e[f] === l) continue t;
            i.push(l)
          } else a(e, l) < 0 && i.push(l)
        }
        return i
      }

      function An(t, n) {
        var e = t ? t.length : 0;
        if (!Ee(e)) return Nn(t, n);
        for (var r = -1, i = Oe(t); ++r < e && n(i[r], r, i) !== !1;);
        return t
      }

      function xn(t, n) {
        var e = t ? t.length : 0;
        if (!Ee(e)) return Dn(t, n);
        for (var r = Oe(t); e-- && n(r[e], e, r) !== !1;);
        return t
      }

      function _n(t, n) {
        var e = !0;
        return An(t, function(t, r, i) {
          return e = !!n(t, r, i)
        }), e
      }

      function Mn(t, n, e, r) {
        var i = t.length;
        for (e = null == e ? 0 : +e || 0, 0 > e && (e = -e > i ? 0 : i + e), r = "undefined" == typeof r || r > i ? i : +r || 0, 0 > r && (r += i), i = e > r ? 0 : r >>> 0, e >>>= 0; i > e;) t[e++] = n;
        return t
      }

      function kn(t, n) {
        var e = [];
        return An(t, function(t, r, i) {
          n(t, r, i) && e.push(t)
        }), e
      }

      function Sn(t, n, e, r) {
        var i;
        return e(t, function(t, e, o) {
          return n(t, e, o) ? (i = r ? e : t, !1) : void 0
        }), i
      }

      function En(t, n, e, r) {
        for (var i = (r || 0) - 1, o = t.length, a = -1, u = []; ++i < o;) {
          var s = t[i];
          if (d(s) && Ee(s.length) && (Za(s) || Ai(s))) {
            n && (s = En(s, n, e));
            var c = -1,
              l = s.length;
            for (u.length += l; ++c < l;) u[++a] = s[c]
          } else e || (u[++a] = s)
        }
        return u
      }

      function Cn(t, n, e) {
        for (var r = -1, i = Oe(t), o = e(t), a = o.length; ++r < a;) {
          var u = o[r];
          if (n(i[u], u, i) === !1) break
        }
        return t
      }

      function Tn(t, n, e) {
        for (var r = Oe(t), i = e(t), o = i.length; o--;) {
          var a = i[o];
          if (n(r[a], a, r) === !1) break
        }
        return t
      }

      function Pn(t, n) {
        return Cn(t, n, Ji)
      }

      function Nn(t, n) {
        return Cn(t, n, ru)
      }

      function Dn(t, n) {
        return Tn(t, n, ru)
      }

      function jn(t, n) {
        for (var e = -1, r = n.length, i = -1, o = []; ++e < r;) {
          var a = n[e];
          tu(t[a]) && (o[++i] = a)
        }
        return o
      }

      function Ln(t, n, e) {
        var r = -1,
          i = "function" == typeof n,
          o = t ? t.length : 0,
          a = Ee(o) ? Fo(o) : [];
        return An(t, function(t) {
          var o = i ? n : null != t && t[n];
          a[++r] = o ? o.apply(t, e) : x
        }), a
      }

      function Rn(t, n, e, r, i, o) {
        if (t === n) return 0 !== t || 1 / t == 1 / n;

        var a = typeof t,
          u = typeof n;
        return "function" != a && "object" != a && "function" != u && "object" != u || null == t || null == n ? t !== t && n !== n : On(t, n, Rn, e, r, i, o)
      }

      function On(t, n, e, r, i, o, a) {
        var u = Za(t),
          s = Za(n),
          c = B,
          l = B;
        u || (c = ia.call(t), c == H ? c = Q : c != Q && (u = Oi(t))), s || (l = ia.call(n), l == H ? l = Q : l != Q && (s = Oi(n)));
        var f = c == Q,
          h = l == Q,
          p = c == l;
        if (p && !u && !f) return ge(t, n, c);
        var d = f && ea.call(t, "__wrapped__"),
          g = h && ea.call(n, "__wrapped__");
        if (d || g) return e(d ? t.value() : t, g ? n.value() : n, r, i, o, a);
        if (!p) return !1;
        o || (o = []), a || (a = []);
        for (var v = o.length; v--;)
          if (o[v] == t) return a[v] == n;
        o.push(t), a.push(n);
        var m = (u ? de : ve)(t, n, e, r, i, o, a);
        return o.pop(), a.pop(), m
      }

      function In(t, n, e, r, i) {
        var o = n.length;
        if (null == t) return !o;
        for (var a = -1, u = !i; ++a < o;)
          if (u && r[a] ? e[a] !== t[n[a]] : !ea.call(t, n[a])) return !1;
        for (a = -1; ++a < o;) {
          var s = n[a];
          if (u && r[a]) var c = ea.call(t, s);
          else {
            var l = t[s],
              f = e[a];
            c = i ? i(l, f, s) : x, "undefined" == typeof c && (c = Rn(f, l, i, !0))
          }
          if (!c) return !1
        }
        return !0
      }

      function qn(t, n) {
        var e = [];
        return An(t, function(t, r, i) {
          e.push(n(t, r, i))
        }), e
      }

      function Un(t) {
        var n = ru(t),
          e = n.length;
        if (1 == e) {
          var r = n[0],
            i = t[r];
          if (Ce(i)) return function(t) {
            return null != t && t[r] === i && ea.call(t, r)
          }
        }
        for (var o = Fo(e), a = Fo(e); e--;) i = t[n[e]], o[e] = i, a[e] = Ce(i);
        return function(t) {
          return In(t, n, o, a)
        }
      }

      function zn(t, n) {
        return Ce(n) ? function(e) {
          return null != e && e[t] === n
        } : function(e) {
          return null != e && Rn(n, e[t], null, !0)
        }
      }

      function Fn(t, n, e, r, i) {
        if (!Ci(t)) return t;
        var o = Ee(n.length) && (Za(n) || Oi(n));
        return (o ? tn : Nn)(n, function(n, a, u) {
          if (d(n)) return r || (r = []), i || (i = []), Hn(t, u, a, Fn, e, r, i);
          var s = t[a],
            c = e ? e(s, n, a, t, u) : x,
            l = "undefined" == typeof c;
          l && (c = n), !o && "undefined" == typeof c || !l && (c === c ? c === s : s !== s) || (t[a] = c)
        }), t
      }

      function Hn(t, n, e, r, i, o, a) {
        for (var u = o.length, s = n[e]; u--;)
          if (o[u] == s) return void(t[e] = a[u]);
        var c = t[e],
          l = i ? i(c, s, e, t, n) : x,
          f = "undefined" == typeof l;
        f && (l = s, Ee(s.length) && (Za(s) || Oi(s)) ? l = Za(c) ? c : c ? Kt(c) : [] : nu(s) || Ai(s) ? l = Ai(c) ? Ui(c) : nu(c) ? c : {} : f = !1), o.push(s), a.push(l), f ? t[e] = r(l, s, i, o, a) : (l === l ? l !== c : c === c) && (t[e] = l)
      }

      function Bn(t) {
        return function(n) {
          return null == n ? x : n[t]
        }
      }

      function Wn(n, e) {
        var r = e.length,
          i = dn(n, e);
        for (e.sort(t); r--;) {
          var o = parseFloat(e[r]);
          if (o != a && ke(o)) {
            var a = o;
            ma.call(n, o, 1)
          }
        }
        return i
      }

      function $n(t, n) {
        return t + fa(Pa() * (n - t + 1))
      }

      function Xn(t, n, e, r, i) {
        return i(t, function(t, i, o) {
          e = r ? (r = !1, t) : n(e, t, i, o)
        }), e
      }

      function Vn(t, n, e) {
        var r = -1,
          i = t.length;
        n = null == n ? 0 : +n || 0, 0 > n && (n = -n > i ? 0 : i + n), e = "undefined" == typeof e || e > i ? i : +e || 0, 0 > e && (e += i), i = n > e ? 0 : e - n >>> 0, n >>>= 0;
        for (var o = Fo(i); ++r < i;) o[r] = t[r + n];
        return o
      }

      function Yn(t, n) {
        var e;
        return An(t, function(t, r, i) {
          return e = n(t, r, i), !e
        }), !!e
      }

      function Gn(t, e) {
        var r = -1,
          i = be(),
          o = t.length,
          a = i == n,
          u = a && o >= 200,
          s = u && Ha(),
          c = [];
        s ? (i = Jt, a = !1) : (u = !1, s = e ? [] : c);
        t: for (; ++r < o;) {
          var l = t[r],
            f = e ? e(l, r, t) : l;
          if (a && l === l) {
            for (var h = s.length; h--;)
              if (s[h] === f) continue t;
            e && s.push(f), c.push(l)
          } else i(s, f) < 0 && ((e || u) && s.push(f), c.push(l))
        }
        return c
      }

      function Qn(t, n) {
        for (var e = -1, r = n.length, i = Fo(r); ++e < r;) i[e] = t[n[e]];
        return i
      }

      function Jn(t, n) {
        var e = t;
        e instanceof Ut && (e = e.value());
        for (var r = -1, i = n.length; ++r < i;) {
          var o = [e],
            a = n[r];
          pa.apply(o, a.args), e = a.func.apply(a.thisArg, o)
        }
        return e
      }

      function Zn(t, n, e) {
        var r = 0,
          i = t ? t.length : r;
        if ("number" == typeof n && n === n && Ra >= i) {
          for (; i > r;) {
            var o = r + i >>> 1,
              a = t[o];
            (e ? n >= a : n > a) ? r = o + 1: i = o
          }
          return i
        }
        return Kn(t, n, Po, e)
      }

      function Kn(t, n, e, r) {
        n = e(n);
        for (var i = 0, o = t ? t.length : 0, a = n !== n, u = "undefined" == typeof n; o > i;) {
          var s = fa((i + o) / 2),
            c = e(t[s]),
            l = c === c;
          if (a) var f = l || r;
          else f = u ? l && (r || "undefined" != typeof c) : r ? n >= c : n > c;
          f ? i = s + 1 : o = s
        }
        return Sa(o, La)
      }

      function te(t, n, e) {
        if ("function" != typeof t) return Po;
        if ("undefined" == typeof n) return t;
        switch (e) {
          case 1:
            return function(e) {
              return t.call(n, e)
            };
          case 3:
            return function(e, r, i) {
              return t.call(n, e, r, i)
            };
          case 4:
            return function(e, r, i, o) {
              return t.call(n, e, r, i, o)
            };
          case 5:
            return function(e, r, i, o, a) {
              return t.call(n, e, r, i, o, a)
            }
        }
        return function() {
          return t.apply(n, arguments)
        }
      }

      function ne(t) {
        return sa.call(t, 0)
      }

      function ee(t, n, e) {
        for (var r = e.length, i = -1, o = ka(t.length - r, 0), a = -1, u = n.length, s = Fo(o + u); ++a < u;) s[a] = n[a];
        for (; ++i < r;) s[e[i]] = t[i];
        for (; o--;) s[a++] = t[i++];
        return s
      }

      function re(t, n, e) {
        for (var r = -1, i = e.length, o = -1, a = ka(t.length - i, 0), u = -1, s = n.length, c = Fo(a + s); ++o < a;) c[o] = t[o];
        for (var l = o; ++u < s;) c[l + u] = n[u];
        for (; ++r < i;) c[l + e[r]] = t[o++];
        return c
      }

      function ie(t, n) {
        return function(e, r, i) {
          var o = n ? n() : {};
          if (r = ye(r, i, 3), Za(e))
            for (var a = -1, u = e.length; ++a < u;) {
              var s = e[a];
              t(o, s, r(s, a, e), e)
            } else An(e, function(n, e, i) {
              t(o, n, r(n, e, i), i)
            });
          return o
        }
      }

      function oe(t) {
        return function() {
          var n = arguments.length,
            e = arguments[0];
          if (2 > n || null == e) return e;
          if (n > 3 && Se(arguments[1], arguments[2], arguments[3]) && (n = 2), n > 3 && "function" == typeof arguments[n - 2]) var r = te(arguments[--n - 1], arguments[n--], 5);
          else n > 2 && "function" == typeof arguments[n - 1] && (r = arguments[--n]);
          for (var i = 0; ++i < n;) {
            var o = arguments[i];
            o && t(e, o, r)
          }
          return e
        }
      }

      function ae(t, n) {
        function e() {
          return (this instanceof e ? r : t).apply(n, arguments)
        }
        var r = se(t);
        return e
      }

      function ue(t) {
        return function(n) {
          for (var e = -1, r = So(co(n)), i = r.length, o = ""; ++e < i;) o = t(o, r[e], e);
          return o
        }
      }

      function se(t) {
        return function() {
          var n = za(t.prototype),
            e = t.apply(n, arguments);
          return Ci(e) ? e : n
        }
      }

      function ce(t, n) {
        return function(e, r, i) {
          i && Se(e, r, i) && (r = null);
          var a = ye(),
            u = null == r;
          if (a === mn && u || (u = !1, r = a(r, i, 3)), u) {
            var s = Za(e);
            if (s || !Ri(e)) return t(s ? e : Re(e));
            r = o
          }
          return me(e, r, n)
        }
      }

      function le(t, n, e, r, i, o, a, u, s, c) {
        function l() {
          for (var w = arguments.length, A = w, x = Fo(w); A--;) x[A] = arguments[A];
          if (r && (x = ee(x, r, i)), o && (x = re(x, o, a)), d || m) {
            var _ = l.placeholder,
              S = v(x, _);
            if (w -= S.length, c > w) {
              var E = u ? Kt(u) : null,
                C = ka(c - w, 0),
                N = d ? S : null,
                D = d ? null : S,
                j = d ? x : null,
                L = d ? null : x;
              n |= d ? T : P, n &= ~(d ? P : T), g || (n &= ~(M | k));
              var R = le(t, n, e, j, N, L, D, E, s, C);
              return R.placeholder = _, R
            }
          }
          var O = h ? e : this;
          return p && (t = O[b]), u && (x = De(x, u)), f && s < x.length && (x.length = s), (this instanceof l ? y || se(t) : t).apply(O, x)
        }
        var f = n & D,
          h = n & M,
          p = n & k,
          d = n & E,
          g = n & S,
          m = n & C,
          y = !p && se(t),
          b = t;
        return l
      }

      function fe(t, n, e) {
        var r = t.length;
        if (n = +n, r >= n || !_a(n)) return "";
        var i = n - r;
        return e = null == e ? " " : e + "", yo(e, ca(i / e.length)).slice(0, i)
      }

      function he(t, n, e, r) {
        function i() {
          for (var n = -1, u = arguments.length, s = -1, c = r.length, l = Fo(u + c); ++s < c;) l[s] = r[s];
          for (; u--;) l[s++] = arguments[++n];
          return (this instanceof i ? a : t).apply(o ? e : this, l)
        }
        var o = n & M,
          a = se(t);
        return i
      }

      function pe(t, n, e, r, i, o, a, u) {
        var s = n & k;
        if (!s && "function" != typeof t) throw new Qo(z);
        var c = r ? r.length : 0;
        if (c || (n &= ~(T | P), r = i = null), c -= i ? i.length : 0, n & P) {
          var l = r,
            f = i;
          r = i = null
        }
        var h = !s && Ba(t),
          p = [t, n, e, r, i, l, f, o, a, u];
        if (h && h !== !0 && (Te(p, h), n = p[1], u = p[9]), p[9] = null == u ? s ? 0 : t.length : ka(u - c, 0) || 0, n == M) var d = ae(p[0], p[2]);
        else d = n != T && n != (M | T) || p[4].length ? le.apply(x, p) : he.apply(x, p);
        var g = h ? Fa : Wa;
        return g(d, p)
      }

      function de(t, n, e, r, i, o, a) {
        var u = -1,
          s = t.length,
          c = n.length,
          l = !0;
        if (s != c && !(i && c > s)) return !1;
        for (; l && ++u < s;) {
          var f = t[u],
            h = n[u];
          if (l = x, r && (l = i ? r(h, f, u) : r(f, h, u)), "undefined" == typeof l)
            if (i)
              for (var p = c; p-- && (h = n[p], !(l = f && f === h || e(f, h, r, i, o, a))););
            else l = f && f === h || e(f, h, r, i, o, a)
        }
        return !!l
      }

      function ge(t, n, e) {
        switch (e) {
          case W:
          case $:
            return +t == +n;
          case X:
            return t.name == n.name && t.message == n.message;
          case G:
            return t != +t ? n != +n : 0 == t ? 1 / t == 1 / n : t == +n;
          case J:
          case K:
            return t == n + ""
        }
        return !1
      }

      function ve(t, n, e, r, i, o, a) {
        var u = ru(t),
          s = u.length,
          c = ru(n),
          l = c.length;
        if (s != l && !i) return !1;
        for (var f, h = -1; ++h < s;) {
          var p = u[h],
            d = ea.call(n, p);
          if (d) {
            var g = t[p],
              v = n[p];
            d = x, r && (d = i ? r(v, g, p) : r(g, v, p)), "undefined" == typeof d && (d = g && g === v || e(g, v, r, i, o, a))
          }
          if (!d) return !1;
          f || (f = "constructor" == p)
        }
        if (!f) {
          var m = t.constructor,
            y = n.constructor;
          if (m != y && "constructor" in t && "constructor" in n && !("function" == typeof m && m instanceof m && "function" == typeof y && y instanceof y)) return !1
        }
        return !0
      }

      function me(t, n, e) {
        var r = e ? Da : Na,
          i = r,
          o = i;
        return An(t, function(t, a, u) {
          var s = n(t, a, u);
          ((e ? i > s : s > i) || s === r && s === o) && (i = s, o = t)
        }), o
      }

      function ye(t, n, e) {
        var r = Y.callback || Co;
        return r = r === Co ? mn : r, e ? r(t, n, e) : r
      }

      function be(t, e, r) {
        var i = Y.indexOf || Je;
        return i = i === Je ? n : i, t ? i(t, e, r) : i
      }

      function we(t, n, e) {
        for (var r = -1, i = e ? e.length : 0; ++r < i;) {
          var o = e[r],
            a = o.size;
          switch (o.type) {
            case "drop":
              t += a;
              break;
            case "dropRight":
              n -= a;
              break;
            case "take":
              n = Sa(n, t + a);
              break;
            case "takeRight":
              t = ka(t, n - a)
          }
        }
        return {
          start: t,
          end: n
        }
      }

      function Ae(t) {
        var n = t.length,
          e = new t.constructor(n);
        return n && "string" == typeof t[0] && ea.call(t, "index") && (e.index = t.index, e.input = t.input), e
      }

      function xe(t) {
        var n = t.constructor;
        return "function" == typeof n && n instanceof n || (n = Vo), new n
      }

      function _e(t, n, e) {
        var r = t.constructor;
        switch (n) {
          case nt:
            return ne(t);
          case W:
          case $:
            return new r(+t);
          case et:
          case rt:
          case it:
          case ot:
          case at:
          case ut:
          case st:
          case ct:
          case lt:
            var i = t.buffer;
            return new r(e ? ne(i) : i, t.byteOffset, t.length);
          case G:
          case K:
            return new r(t);
          case J:
            var o = new r(t.source, xt.exec(t));
            o.lastIndex = t.lastIndex
        }
        return o
      }

      function Me(t) {
        var n = Y.support,
          e = !(n.funcNames ? t.name : n.funcDecomp);
        if (!e) {
          var r = ta.call(t);
          n.funcNames || (e = !_t.test(r)), e || (e = Pt.test(r) || Ni(t), Fa(t, e))
        }
        return e
      }

      function ke(t, n) {
        return t = +t, n = null == n ? Ia : n, t > -1 && t % 1 == 0 && n > t
      }

      function Se(t, n, e) {
        if (!Ci(e)) return !1;
        var r = typeof n;
        if ("number" == r) var i = e.length,
          o = Ee(i) && ke(n, i);
        else o = "string" == r && n in e;
        var a = e[n];
        return o && (t === t ? t === a : a !== a)
      }

      function Ee(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && Ia >= t
      }

      function Ce(t) {
        return t === t && (0 === t ? 1 / t > 0 : !Ci(t))
      }

      function Te(t, n) {
        var e = t[1],
          r = n[1],
          i = e | r,
          o = D | N,
          a = M | k,
          u = o | a | S | C,
          s = e & D && !(r & D),
          c = e & N && !(r & N),
          l = (c ? t : n)[7],
          f = (s ? t : n)[8],
          h = !(e >= N && r > a || e > a && r >= N),
          p = i >= o && u >= i && (N > e || (c || s) && l.length <= f);
        if (!h && !p) return t;
        r & M && (t[2] = n[2], i |= e & M ? 0 : S);
        var d = n[3];
        if (d) {
          var g = t[3];
          t[3] = g ? ee(g, d, n[4]) : Kt(d), t[4] = g ? v(t[3], F) : Kt(n[4])
        }
        return d = n[5], d && (g = t[5], t[5] = g ? re(g, d, n[6]) : Kt(d), t[6] = g ? v(t[5], F) : Kt(n[6])), d = n[7], d && (t[7] = Kt(d)), r & D && (t[8] = null == t[8] ? n[8] : Sa(t[8], n[8])), null == t[9] && (t[9] = n[9]), t[0] = n[0], t[1] = i, t
      }

      function Pe(t, n) {
        t = Oe(t);
        for (var e = -1, r = n.length, i = {}; ++e < r;) {
          var o = n[e];
          o in t && (i[o] = t[o])
        }
        return i
      }

      function Ne(t, n) {
        var e = {};
        return Pn(t, function(t, r, i) {
          n(t, r, i) && (e[r] = t)
        }), e
      }

      function De(t, n) {
        for (var e = t.length, r = Sa(n.length, e), i = Kt(t); r--;) {
          var o = n[r];
          t[r] = ke(o, e) ? i[o] : x
        }
        return t
      }

      function je(t) {
        {
          var n;
          Y.support
        }
        if (!d(t) || ia.call(t) != Q || !ea.call(t, "constructor") && (n = t.constructor, "function" == typeof n && !(n instanceof n))) return !1;
        var e;
        return Pn(t, function(t, n) {
          e = n
        }), "undefined" == typeof e || ea.call(t, e)
      }

      function Le(t) {
        for (var n = Ji(t), e = n.length, r = e && t.length, i = Y.support, o = r && Ee(r) && (Za(t) || i.nonEnumArgs && Ai(t)), a = -1, u = []; ++a < e;) {
          var s = n[a];
          (o && ke(s, r) || ea.call(t, s)) && u.push(s)
        }
        return u
      }

      function Re(t) {
        return null == t ? [] : Ee(t.length) ? Ci(t) ? t : Vo(t) : io(t)
      }

      function Oe(t) {
        return Ci(t) ? t : Vo(t)
      }

      function Ie(t) {
        return t instanceof Ut ? t.clone() : new tt(t.__wrapped__, t.__chain__, Kt(t.__actions__))
      }

      function qe(t, n, e) {
        n = (e ? Se(t, n, e) : null == n) ? 1 : ka(+n || 1, 1);
        for (var r = 0, i = t ? t.length : 0, o = -1, a = Fo(ca(i / n)); i > r;) a[++o] = Vn(t, r, r += n);
        return a
      }

      function Ue(t) {
        for (var n = -1, e = t ? t.length : 0, r = -1, i = []; ++n < e;) {
          var o = t[n];
          o && (i[++r] = o)
        }
        return i
      }

      function ze() {
        for (var t = -1, n = arguments.length; ++t < n;) {
          var e = arguments[t];
          if (Za(e) || Ai(e)) break
        }
        return wn(e, En(arguments, !1, !0, ++t))
      }

      function Fe(t, n, e) {
        var r = t ? t.length : 0;
        return r ? ((e ? Se(t, n, e) : null == n) && (n = 1), Vn(t, 0 > n ? 0 : n)) : []
      }

      function He(t, n, e) {
        var r = t ? t.length : 0;
        return r ? ((e ? Se(t, n, e) : null == n) && (n = 1), n = r - (+n || 0), Vn(t, 0, 0 > n ? 0 : n)) : []
      }

      function Be(t, n, e) {
        var r = t ? t.length : 0;
        if (!r) return [];
        for (n = ye(n, e, 3); r-- && n(t[r], r, t););
        return Vn(t, 0, r + 1)
      }

      function We(t, n, e) {
        var r = t ? t.length : 0;
        if (!r) return [];
        var i = -1;
        for (n = ye(n, e, 3); ++i < r && n(t[i], i, t););
        return Vn(t, i)
      }

      function $e(t, n, e, r) {
        var i = t ? t.length : 0;
        return i ? (e && "number" != typeof e && Se(t, n, e) && (e = 0, r = i), Mn(t, n, e, r)) : []
      }

      function Xe(t, n, e) {
        var r = -1,
          i = t ? t.length : 0;
        for (n = ye(n, e, 3); ++r < i;)
          if (n(t[r], r, t)) return r;
        return -1
      }

      function Ve(t, n, e) {
        var r = t ? t.length : 0;
        for (n = ye(n, e, 3); r--;)
          if (n(t[r], r, t)) return r;
        return -1
      }

      function Ye(t) {
        return t ? t[0] : x
      }

      function Ge(t, n, e) {
        var r = t ? t.length : 0;
        return e && Se(t, n, e) && (n = !1), r ? En(t, n) : []
      }

      function Qe(t) {
        var n = t ? t.length : 0;
        return n ? En(t, !0) : []
      }

      function Je(t, e, r) {
        var i = t ? t.length : 0;
        if (!i) return -1;
        if ("number" == typeof r) r = 0 > r ? ka(i + r, 0) : r || 0;
        else if (r) {
          var o = Zn(t, e),
            a = t[o];
          return (e === e ? e === a : a !== a) ? o : -1
        }
        return n(t, e, r)
      }

      function Ze(t) {
        return He(t, 1)
      }

      function Ke() {
        for (var t = [], e = -1, r = arguments.length, i = [], o = be(), a = o == n; ++e < r;) {
          var u = arguments[e];
          (Za(u) || Ai(u)) && (t.push(u), i.push(a && u.length >= 120 && Ha(e && u)))
        }
        r = t.length;
        var s = t[0],
          c = -1,
          l = s ? s.length : 0,
          f = [],
          h = i[0];
        t: for (; ++c < l;)
          if (u = s[c], (h ? Jt(h, u) : o(f, u)) < 0) {
            for (e = r; --e;) {
              var p = i[e];
              if ((p ? Jt(p, u) : o(t[e], u)) < 0) continue t
            }
            h && h.push(u), f.push(u)
          }
        return f
      }

      function tr(t) {
        var n = t ? t.length : 0;
        return n ? t[n - 1] : x
      }

      function nr(t, n, e) {
        var r = t ? t.length : 0;
        if (!r) return -1;
        var i = r;
        if ("number" == typeof e) i = (0 > e ? ka(r + e, 0) : Sa(e || 0, r - 1)) + 1;
        else if (e) {
          i = Zn(t, n, !0) - 1;
          var o = t[i];
          return (n === n ? n === o : o !== o) ? i : -1
        }
        if (n !== n) return p(t, i, !0);
        for (; i--;)
          if (t[i] === n) return i;
        return -1
      }

      function er() {
        var t = arguments[0];
        if (!t || !t.length) return t;
        for (var n = 0, e = be(), r = arguments.length; ++n < r;)
          for (var i = 0, o = arguments[n];
            (i = e(t, o, i)) > -1;) ma.call(t, i, 1);
        return t
      }

      function rr(t) {
        return Wn(t || [], En(arguments, !1, !1, 1))
      }

      function ir(t, n, e) {
        var r = -1,
          i = t ? t.length : 0,
          o = [];
        for (n = ye(n, e, 3); ++r < i;) {
          var a = t[r];
          n(a, r, t) && (o.push(a), ma.call(t, r--, 1), i--)
        }
        return o
      }

      function or(t) {
        return Fe(t, 1)
      }

      function ar(t, n, e) {
        var r = t ? t.length : 0;
        return r ? (e && "number" != typeof e && Se(t, n, e) && (n = 0, e = r), Vn(t, n, e)) : []
      }

      function ur(t, n, e, r) {
        var i = ye(e);
        return i === mn && null == e ? Zn(t, n) : Kn(t, n, i(e, r, 1))
      }

      function sr(t, n, e, r) {
        var i = ye(e);
        return i === mn && null == e ? Zn(t, n, !0) : Kn(t, n, i(e, r, 1), !0)
      }

      function cr(t, n, e) {
        var r = t ? t.length : 0;
        return r ? ((e ? Se(t, n, e) : null == n) && (n = 1), Vn(t, 0, 0 > n ? 0 : n)) : []
      }

      function lr(t, n, e) {
        var r = t ? t.length : 0;
        return r ? ((e ? Se(t, n, e) : null == n) && (n = 1), n = r - (+n || 0), Vn(t, 0 > n ? 0 : n)) : []
      }

      function fr(t, n, e) {
        var r = t ? t.length : 0;
        if (!r) return [];
        for (n = ye(n, e, 3); r-- && n(t[r], r, t););
        return Vn(t, r + 1)
      }

      function hr(t, n, e) {
        var r = t ? t.length : 0;
        if (!r) return [];
        var i = -1;
        for (n = ye(n, e, 3); ++i < r && n(t[i], i, t););
        return Vn(t, 0, i)
      }

      function pr() {
        return Gn(En(arguments, !1, !0))
      }

      function dr(t, e, r, i) {
        var o = t ? t.length : 0;
        if (!o) return [];
        null != e && "boolean" != typeof e && (i = r, r = Se(t, e, i) ? null : e, e = !1);
        var a = ye();
        return (a !== mn || null != r) && (r = a(r, i, 3)), e && be() == n ? m(t, r) : Gn(t, r)
      }

      function gr(t) {
        for (var n = -1, e = (t && t.length && an(on(t, na))) >>> 0, r = Fo(e); ++n < e;) r[n] = on(t, Bn(n));
        return r
      }

      function vr(t) {
        return wn(t, Vn(arguments, 1))
      }

      function mr() {
        for (var t = -1, n = arguments.length; ++t < n;) {
          var e = arguments[t];
          if (Za(e) || Ai(e)) var r = r ? wn(r, e).concat(wn(e, r)) : e
        }
        return r ? Gn(r) : []
      }

      function yr() {
        for (var t = arguments.length, n = Fo(t); t--;) n[t] = arguments[t];
        return gr(n)
      }

      function br(t, n) {
        var e = -1,
          r = t ? t.length : 0,
          i = {};
        for (!r || n || Za(t[0]) || (n = []); ++e < r;) {
          var o = t[e];
          n ? i[o] = n[e] : o && (i[o[0]] = o[1])
        }
        return i
      }

      function wr(t) {
        var n = Y(t);
        return n.__chain__ = !0, n
      }

      function Ar(t, n, e) {
        return n.call(e, t), t
      }

      function xr(t, n, e) {
        return n.call(e, t)
      }

      function _r() {
        return wr(this)
      }

      function Mr() {
        return new tt(this.value(), this.__chain__)
      }

      function kr(t) {
        for (var n, e = this; e instanceof Z;) {
          var r = Ie(e);
          n ? i.__wrapped__ = r : n = r;
          var i = r;
          e = e.__wrapped__
        }
        return i.__wrapped__ = t, n
      }

      function Sr() {
        var t = this.__wrapped__;
        return t instanceof Ut ? (this.__actions__.length && (t = new Ut(this)), new tt(t.reverse(), this.__chain__)) : this.thru(function(t) {
          return t.reverse()
        })
      }

      function Er() {
        return this.value() + ""
      }

      function Cr() {
        return Jn(this.__wrapped__, this.__actions__)
      }

      function Tr(t) {
        var n = t ? t.length : 0;
        return Ee(n) && (t = Re(t)), dn(t, En(arguments, !1, !1, 1))
      }

      function Pr(t, n, e) {
        var r = Za(t) ? en : _n;
        return ("function" != typeof n || "undefined" != typeof e) && (n = ye(n, e, 3)), r(t, n)
      }

      function Nr(t, n, e) {
        var r = Za(t) ? rn : kn;
        return n = ye(n, e, 3), r(t, n)
      }

      function Dr(t, n, e) {
        if (Za(t)) {
          var r = Xe(t, n, e);
          return r > -1 ? t[r] : x
        }
        return n = ye(n, e, 3), Sn(t, n, An)
      }

      function jr(t, n, e) {
        return n = ye(n, e, 3), Sn(t, n, xn)
      }

      function Lr(t, n) {
        return Dr(t, Un(n))
      }

      function Rr(t, n, e) {
        return "function" == typeof n && "undefined" == typeof e && Za(t) ? tn(t, n) : An(t, te(n, e, 3))
      }

      function Or(t, n, e) {
        return "function" == typeof n && "undefined" == typeof e && Za(t) ? nn(t, n) : xn(t, te(n, e, 3))
      }

      function Ir(t, n, e) {
        var r = t ? t.length : 0;
        return Ee(r) || (t = io(t), r = t.length), r ? (e = "number" == typeof e ? 0 > e ? ka(r + e, 0) : e || 0 : 0, "string" == typeof t || !Za(t) && Ri(t) ? r > e && t.indexOf(n, e) > -1 : be(t, n, e) > -1) : !1
      }

      function qr(t, n) {
        return Ln(t, n, Vn(arguments, 2))
      }

      function Ur(t, n, e) {
        var r = Za(t) ? on : qn;
        return n = ye(n, e, 3), r(t, n)
      }

      function zr(t, n) {
        return Ur(t, Bn(n))
      }

      function Fr(t, n, e, r) {
        var i = Za(t) ? sn : Xn;
        return i(t, ye(n, r, 4), e, arguments.length < 3, An)
      }

      function Hr(t, n, e, r) {
        var i = Za(t) ? cn : Xn;
        return i(t, ye(n, r, 4), e, arguments.length < 3, xn)
      }

      function Br(t, n, e) {
        var r = Za(t) ? rn : kn;
        return n = ye(n, e, 3), r(t, function(t, e, r) {
          return !n(t, e, r)
        })
      }

      function Wr(t, n, e) {
        if (e ? Se(t, n, e) : null == n) {
          t = Re(t);
          var r = t.length;
          return r > 0 ? t[$n(0, r - 1)] : x
        }
        var i = $r(t);
        return i.length = Sa(0 > n ? 0 : +n || 0, i.length), i
      }

      function $r(t) {
        t = Re(t);
        for (var n = -1, e = t.length, r = Fo(e); ++n < e;) {
          var i = $n(0, n);
          n != i && (r[n] = r[i]), r[i] = t[n]
        }
        return r
      }

      function Xr(t) {
        var n = t ? t.length : 0;
        return Ee(n) ? n : ru(t).length
      }

      function Vr(t, n, e) {
        var r = Za(t) ? ln : Yn;
        return ("function" != typeof n || "undefined" != typeof e) && (n = ye(n, e, 3)), r(t, n)
      }

      function Yr(t, n, e) {
        var i = -1,
          o = t ? t.length : 0,
          a = Ee(o) ? Fo(o) : [];
        return e && Se(t, n, e) && (n = null), n = ye(n, e, 3), An(t, function(t, e, r) {
          a[++i] = {
            criteria: n(t, e, r),
            index: i,
            value: t
          }
        }), r(a, s)
      }

      function Gr(t) {
        var n = arguments;
        n.length > 3 && Se(n[1], n[2], n[3]) && (n = [t, n[1]]);
        var e = -1,
          i = t ? t.length : 0,
          o = En(n, !1, !1, 1),
          a = Ee(i) ? Fo(i) : [];
        return An(t, function(t) {
          for (var n = o.length, r = Fo(n); n--;) r[n] = null == t ? x : t[o[n]];
          a[++e] = {
            criteria: r,
            index: e,
            value: t
          }
        }), r(a, c)
      }

      function Qr(t, n) {
        return Nr(t, Un(n))
      }

      function Jr(t, n) {
        if ("function" != typeof n) {
          if ("function" != typeof t) throw new Qo(z);
          var e = t;
          t = n, n = e
        }
        return t = _a(t = +t) ? t : 0,
          function() {
            return --t < 1 ? n.apply(this, arguments) : void 0
          }
      }

      function Zr(t, n, e) {
        return e && Se(t, n, e) && (n = null), n = t && null == n ? t.length : ka(+n || 0, 0), pe(t, D, null, null, null, null, n)
      }

      function Kr(t, n) {
        var e;
        if ("function" != typeof n) {
          if ("function" != typeof t) throw new Qo(z);
          var r = t;
          t = n, n = r
        }
        return function() {
          return --t > 0 ? e = n.apply(this, arguments) : n = null, e
        }
      }

      function ti(t, n) {
        var e = M;
        if (arguments.length > 2) {
          var r = Vn(arguments, 2),
            i = v(r, ti.placeholder);
          e |= T
        }
        return pe(t, e, n, r, i)
      }

      function ni(t) {
        return vn(t, arguments.length > 1 ? En(arguments, !1, !1, 1) : Yi(t))
      }

      function ei(t, n) {
        var e = M | k;
        if (arguments.length > 2) {
          var r = Vn(arguments, 2),
            i = v(r, ei.placeholder);
          e |= T
        }
        return pe(n, e, t, r, i)
      }

      function ri(t, n, e) {
        e && Se(t, n, e) && (n = null);
        var r = pe(t, E, null, null, null, null, null, n);
        return r.placeholder = ri.placeholder, r
      }

      function ii(t, n, e) {
        e && Se(t, n, e) && (n = null);
        var r = pe(t, C, null, null, null, null, null, n);
        return r.placeholder = ii.placeholder, r
      }

      function oi(t, n, e) {
        function r() {
          h && la(h), s && la(s), s = h = p = x
        }

        function i() {
          var e = n - (Ja() - l);
          if (0 >= e || e > n) {
            s && la(s);
            var r = p;
            s = h = p = x, r && (d = Ja(), c = t.apply(f, u), h || s || (u = f = null))
          } else h = va(i, e)
        }

        function o() {
          h && la(h), s = h = p = x, (v || g !== n) && (d = Ja(), c = t.apply(f, u), h || s || (u = f = null))
        }

        function a() {
          if (u = arguments, l = Ja(), f = this, p = v && (h || !m), g === !1) var e = m && !h;
          else {
            s || m || (d = l);
            var r = g - (l - d),
              a = 0 >= r || r > g;
            a ? (s && (s = la(s)), d = l, c = t.apply(f, u)) : s || (s = va(o, r))
          }
          return a && h ? h = la(h) : h || n === g || (h = va(i, n)), e && (a = !0, c = t.apply(f, u)), !a || h || s || (u = f = null), c
        }
        var u, s, c, l, f, h, p, d = 0,
          g = !1,
          v = !0;
        if ("function" != typeof t) throw new Qo(z);
        if (n = 0 > n ? 0 : n, e === !0) {
          var m = !0;
          v = !1
        } else Ci(e) && (m = e.leading, g = "maxWait" in e && ka(+e.maxWait || 0, n), v = "trailing" in e ? e.trailing : v);
        return a.cancel = r, a
      }

      function ai(t) {
        return bn(t, 1, arguments, 1)
      }

      function ui(t, n) {
        return bn(t, n, arguments, 2)
      }

      function si() {
        var t = arguments,
          n = t.length;
        if (!n) return function() {
          return arguments[0]
        };
        if (!en(t, e)) throw new Qo(z);
        return function() {
          for (var e = 0, r = t[e].apply(this, arguments); ++e < n;) r = t[e].call(this, r);
          return r
        }
      }

      function ci() {
        var t = arguments,
          n = t.length - 1;
        if (0 > n) return function() {
          return arguments[0]
        };
        if (!en(t, e)) throw new Qo(z);
        return function() {
          for (var e = n, r = t[e].apply(this, arguments); e--;) r = t[e].call(this, r);
          return r
        }
      }

      function li(t, n) {
        if ("function" != typeof t || n && "function" != typeof n) throw new Qo(z);
        var e = function() {
          var r = e.cache,
            i = n ? n.apply(this, arguments) : arguments[0];
          if (r.has(i)) return r.get(i);
          var o = t.apply(this, arguments);
          return r.set(i, o), o
        };
        return e.cache = new li.Cache, e
      }

      function fi(t) {
        if ("function" != typeof t) throw new Qo(z);
        return function() {
          return !t.apply(this, arguments)
        }
      }

      function hi(t) {
        return Kr(t, 2)
      }

      function pi(t) {
        var n = Vn(arguments, 1),
          e = v(n, pi.placeholder);
        return pe(t, T, null, n, e)
      }

      function di(t) {
        var n = Vn(arguments, 1),
          e = v(n, di.placeholder);
        return pe(t, P, null, n, e)
      }

      function gi(t) {
        var n = En(arguments, !1, !1, 1);
        return pe(t, N, null, null, null, n)
      }

      function vi(t) {
        if ("function" != typeof t) throw new Qo(z);
        return function(n) {
          return t.apply(this, n)
        }
      }

      function mi(t, n, e) {
        var r = !0,
          i = !0;
        if ("function" != typeof t) throw new Qo(z);
        return e === !1 ? r = !1 : Ci(e) && (r = "leading" in e ? !!e.leading : r, i = "trailing" in e ? !!e.trailing : i), qt.leading = r, qt.maxWait = +n, qt.trailing = i, oi(t, n, qt)
      }

      function yi(t, n) {
        return n = null == n ? Po : n, pe(n, T, null, [t], [])
      }

      function bi(t, n, e, r) {
        return n && "boolean" != typeof n && Se(t, n, e) ? n = !1 : "function" == typeof n && (r = e, e = n, n = !1), e = "function" == typeof e && te(e, r, 1), yn(t, n, e)
      }

      function wi(t, n, e) {
        return n = "function" == typeof n && te(n, e, 1), yn(t, !0, n)
      }

      function Ai(t) {
        var n = d(t) ? t.length : x;
        return Ee(n) && ia.call(t) == H || !1
      }

      function xi(t) {
        return t === !0 || t === !1 || d(t) && ia.call(t) == W || !1
      }

      function _i(t) {
        return d(t) && ia.call(t) == $ || !1
      }

      function Mi(t) {
        return t && 1 === t.nodeType && d(t) && ia.call(t).indexOf("Element") > -1 || !1
      }

      function ki(t) {
        if (null == t) return !0;
        var n = t.length;
        return Ee(n) && (Za(t) || Ri(t) || Ai(t) || d(t) && tu(t.splice)) ? !n : !ru(t).length
      }

      function Si(t, n, e, r) {
        if (e = "function" == typeof e && te(e, r, 3), !e && Ce(t) && Ce(n)) return t === n;
        var i = e ? e(t, n) : x;
        return "undefined" == typeof i ? Rn(t, n, e) : !!i
      }

      function Ei(t) {
        return d(t) && "string" == typeof t.message && ia.call(t) == X || !1
      }

      function Ci(t) {
        var n = typeof t;
        return "function" == n || t && "object" == n || !1
      }

      function Ti(t, n, e, r) {
        var i = ru(n),
          o = i.length;
        if (e = "function" == typeof e && te(e, r, 3), !e && 1 == o) {
          var a = i[0],
            u = n[a];
          if (Ce(u)) return null != t && u === t[a] && ea.call(t, a)
        }
        for (var s = Fo(o), c = Fo(o); o--;) u = s[o] = n[i[o]], c[o] = Ce(u);
        return In(t, i, s, c, e)
      }

      function Pi(t) {
        return ji(t) && t != +t
      }

      function Ni(t) {
        return null == t ? !1 : ia.call(t) == V ? aa.test(ta.call(t)) : d(t) && kt.test(t) || !1
      }

      function Di(t) {
        return null === t
      }

      function ji(t) {
        return "number" == typeof t || d(t) && ia.call(t) == G || !1
      }

      function Li(t) {
        return d(t) && ia.call(t) == J || !1
      }

      function Ri(t) {
        return "string" == typeof t || d(t) && ia.call(t) == K || !1
      }

      function Oi(t) {
        return d(t) && Ee(t.length) && Ot[ia.call(t)] || !1
      }

      function Ii(t) {
        return "undefined" == typeof t
      }

      function qi(t) {
        var n = t ? t.length : 0;
        return Ee(n) ? n ? Kt(t) : [] : io(t)
      }

      function Ui(t) {
        return gn(t, Ji(t))
      }

      function zi(t, n, e) {
        var r = za(t);
        return e && Se(t, n, e) && (n = null), n ? gn(n, r, ru(n)) : r
      }

      function Fi(t) {
        if (null == t) return t;
        var n = Kt(arguments);
        return n.push(fn), eu.apply(x, n)
      }

      function Hi(t, n, e) {
        return n = ye(n, e, 3), Sn(t, n, Nn, !0)
      }

      function Bi(t, n, e) {
        return n = ye(n, e, 3), Sn(t, n, Dn, !0)
      }

      function Wi(t, n, e) {
        return ("function" != typeof n || "undefined" != typeof e) && (n = te(n, e, 3)), Cn(t, n, Ji)
      }

      function $i(t, n, e) {
        return n = te(n, e, 3), Tn(t, n, Ji)
      }

      function Xi(t, n, e) {
        return ("function" != typeof n || "undefined" != typeof e) && (n = te(n, e, 3)), Nn(t, n)
      }

      function Vi(t, n, e) {
        return n = te(n, e, 3), Tn(t, n, ru)
      }

      function Yi(t) {
        return jn(t, Ji(t))
      }

      function Gi(t, n) {
        return t ? ea.call(t, n) : !1
      }

      function Qi(t, n, e) {
        e && Se(t, n, e) && (n = null);
        for (var r = -1, i = ru(t), o = i.length, a = {}; ++r < o;) {
          var u = i[r],
            s = t[u];
          n ? ea.call(a, s) ? a[s].push(u) : a[s] = [u] : a[s] = u
        }
        return a
      }

      function Ji(t) {
        if (null == t) return [];
        Ci(t) || (t = Vo(t));
        var n = t.length;
        n = n && Ee(n) && (Za(t) || Ua.nonEnumArgs && Ai(t)) && n || 0;
        for (var e = t.constructor, r = -1, i = "function" == typeof e && e.prototype === t, o = Fo(n), a = n > 0; ++r < n;) o[r] = r + "";
        for (var u in t) a && ke(u, n) || "constructor" == u && (i || !ea.call(t, u)) || o.push(u);
        return o
      }

      function Zi(t, n, e) {
        var r = {};
        return n = ye(n, e, 3), Nn(t, function(t, e, i) {
          r[e] = n(t, e, i)
        }), r
      }

      function Ki(t, n, e) {
        if (null == t) return {};
        if ("function" != typeof n) {
          var r = on(En(arguments, !1, !1, 1), Go);
          return Pe(t, wn(Ji(t), r))
        }
        return n = te(n, e, 3), Ne(t, function(t, e, r) {
          return !n(t, e, r)
        })
      }

      function to(t) {
        for (var n = -1, e = ru(t), r = e.length, i = Fo(r); ++n < r;) {
          var o = e[n];
          i[n] = [o, t[o]]
        }
        return i
      }

      function no(t, n, e) {
        return null == t ? {} : "function" == typeof n ? Ne(t, te(n, e, 3)) : Pe(t, En(arguments, !1, !1, 1))
      }

      function eo(t, n, e) {
        var r = null == t ? x : t[n];
        return "undefined" == typeof r && (r = e), tu(r) ? r.call(t) : r
      }

      function ro(t, n, e, r) {
        var i = Za(t) || Oi(t);
        if (n = ye(n, r, 4), null == e)
          if (i || Ci(t)) {
            var o = t.constructor;
            e = i ? Za(t) ? new o : [] : za(tu(o) && o.prototype)
          } else e = {};
        return (i ? tn : Nn)(t, function(t, r, i) {
          return n(e, t, r, i)
        }), e
      }

      function io(t) {
        return Qn(t, ru(t))
      }

      function oo(t) {
        return Qn(t, Ji(t))
      }

      function ao(t, n, e) {
        return n = +n || 0, "undefined" == typeof e ? (e = n, n = 0) : e = +e || 0, t >= n && e > t
      }

      function uo(t, n, e) {
        e && Se(t, n, e) && (n = e = null);
        var r = null == t,
          i = null == n;
        if (null == e && (i && "boolean" == typeof t ? (e = t, t = 1) : "boolean" == typeof n && (e = n, i = !0)), r && i && (n = 1, i = !1), t = +t || 0, i ? (n = t, t = 0) : n = +n || 0, e || t % 1 || n % 1) {
          var o = Pa();
          return Sa(t + o * (n - t + parseFloat("1e-" + ((o + "").length - 1))), n)
        }
        return $n(t, n)
      }

      function so(t) {
        return t = i(t), t && t.charAt(0).toUpperCase() + t.slice(1)
      }

      function co(t) {
        return t = i(t), t && t.replace(St, l)
      }

      function lo(t, n, e) {
        t = i(t), n += "";
        var r = t.length;
        return e = ("undefined" == typeof e ? r : Sa(0 > e ? 0 : +e || 0, r)) - n.length, e >= 0 && t.indexOf(n, e) == e
      }

      function fo(t) {
        return t = i(t), t && mt.test(t) ? t.replace(gt, f) : t
      }

      function ho(t) {
        return t = i(t), t && Tt.test(t) ? t.replace(Ct, "\\$&") : t
      }

      function po(t, n, e) {
        t = i(t), n = +n;
        var r = t.length;
        if (r >= n || !_a(n)) return t;
        var o = (n - r) / 2,
          a = fa(o),
          u = ca(o);
        return e = fe("", u, e), e.slice(0, a) + t + e
      }

      function go(t, n, e) {
        return t = i(t), t && fe(t, n, e) + t
      }

      function vo(t, n, e) {
        return t = i(t), t && t + fe(t, n, e)
      }

      function mo(t, n, e) {
        return e && Se(t, n, e) && (n = 0), Ta(t, n)
      }

      function yo(t, n) {
        var e = "";
        if (t = i(t), n = +n, 1 > n || !t || !_a(n)) return e;
        do n % 2 && (e += t), n = fa(n / 2), t += t; while (n);
        return e
      }

      function bo(t, n, e) {
        return t = i(t), e = null == e ? 0 : Sa(0 > e ? 0 : +e || 0, t.length), t.lastIndexOf(n, e) == e
      }

      function wo(t, n, e) {
        var r = Y.templateSettings;
        e && Se(t, n, e) && (n = e = null), t = i(t), n = pn(pn({}, e || n), r, hn);
        var o, a, u = pn(pn({}, n.imports), r.imports, hn),
          s = ru(u),
          c = Qn(u, s),
          l = 0,
          f = n.interpolate || Et,
          p = "__p += '",
          d = Yo((n.escape || Et).source + "|" + f.source + "|" + (f === wt ? At : Et).source + "|" + (n.evaluate || Et).source + "|$", "g"),
          g = "//# sourceURL=" + ("sourceURL" in n ? n.sourceURL : "lodash.templateSources[" + ++Rt + "]") + "\n";
        t.replace(d, function(n, e, r, i, u, s) {
          return r || (r = i), p += t.slice(l, s).replace(Nt, h), e && (o = !0, p += "' +\n__e(" + e + ") +\n'"), u && (a = !0, p += "';\n" + u + ";\n__p += '"), r && (p += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), l = s + n.length, n
        }), p += "';\n";
        var v = n.variable;
        v || (p = "with (obj) {\n" + p + "\n}\n"), p = (a ? p.replace(ft, "") : p).replace(ht, "$1").replace(pt, "$1;"), p = "function(" + (v || "obj") + ") {\n" + (v ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (o ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + p + "return __p\n}";
        var m = Eo(function() {
          return Wo(s, g + "return " + p).apply(x, c)
        });
        if (m.source = p, Ei(m)) throw m;
        return m
      }

      function Ao(t, n, e) {
        var r = t;
        return (t = i(t)) ? (e ? Se(r, n, e) : null == n) ? t.slice(y(t), b(t) + 1) : (n += "", t.slice(a(t, n), u(t, n) + 1)) : t
      }

      function xo(t, n, e) {
        var r = t;
        return t = i(t), t ? t.slice((e ? Se(r, n, e) : null == n) ? y(t) : a(t, n + "")) : t
      }

      function _o(t, n, e) {
        var r = t;
        return t = i(t), t ? (e ? Se(r, n, e) : null == n) ? t.slice(0, b(t) + 1) : t.slice(0, u(t, n + "") + 1) : t
      }

      function Mo(t, n, e) {
        e && Se(t, n, e) && (n = null);
        var r = j,
          o = L;
        if (null != n)
          if (Ci(n)) {
            var a = "separator" in n ? n.separator : a;
            r = "length" in n ? +n.length || 0 : r, o = "omission" in n ? i(n.omission) : o
          } else r = +n || 0;
        if (t = i(t), r >= t.length) return t;
        var u = r - o.length;
        if (1 > u) return o;
        var s = t.slice(0, u);
        if (null == a) return s + o;
        if (Li(a)) {
          if (t.slice(u).search(a)) {
            var c, l, f = t.slice(0, u);
            for (a.global || (a = Yo(a.source, (xt.exec(a) || "") + "g")), a.lastIndex = 0; c = a.exec(f);) l = c.index;
            s = s.slice(0, null == l ? u : l)
          }
        } else if (t.indexOf(a, u) != u) {
          var h = s.lastIndexOf(a);
          h > -1 && (s = s.slice(0, h))
        }
        return s + o
      }

      function ko(t) {
        return t = i(t), t && vt.test(t) ? t.replace(dt, w) : t
      }

      function So(t, n, e) {
        return e && Se(t, n, e) && (n = null), t = i(t), t.match(n || Dt) || []
      }

      function Eo() {
        var t = arguments.length,
          n = arguments[0];
        try {
          for (var e = Fo(t ? t - 1 : 0); --t > 0;) e[t - 1] = arguments[t];
          return n.apply(x, e)
        } catch (r) {
          return Ei(r) ? r : new Bo(r)
        }
      }

      function Co(t, n, e) {
        return e && Se(t, n, e) && (n = null), d(t) ? No(t) : mn(t, n)
      }

      function To(t) {
        return function() {
          return t
        }
      }

      function Po(t) {
        return t
      }

      function No(t) {
        return Un(yn(t, !0))
      }

      function Do(t, n) {
        return zn(t + "", yn(n, !0))
      }

      function jo(t, n, e) {
        if (null == e) {
          var r = Ci(n),
            i = r && ru(n),
            o = i && i.length && jn(n, i);
          (o ? o.length : r) || (o = !1, e = n, n = t, t = this)
        }
        o || (o = jn(n, ru(n)));
        var a = !0,
          u = -1,
          s = tu(t),
          c = o.length;
        e === !1 ? a = !1 : Ci(e) && "chain" in e && (a = e.chain);
        for (; ++u < c;) {
          var l = o[u],
            f = n[l];
          t[l] = f, s && (t.prototype[l] = function(n) {
            return function() {
              var e = this.__chain__;
              if (a || e) {
                var r = t(this.__wrapped__);
                return (r.__actions__ = Kt(this.__actions__)).push({
                  func: n,
                  args: arguments,
                  thisArg: t
                }), r.__chain__ = e, r
              }
              var i = [this.value()];
              return pa.apply(i, arguments), n.apply(t, i)
            }
          }(f))
        }
        return t
      }

      function Lo() {
        return g._ = oa, this
      }

      function Ro() {}

      function Oo(t) {
        return Bn(t + "")
      }

      function Io(t) {
        return function(n) {
          return null == t ? x : t[n]
        }
      }

      function qo(t, n, e) {
        e && Se(t, n, e) && (n = e = null), t = +t || 0, e = null == e ? 1 : +e || 0, null == n ? (n = t, t = 0) : n = +n || 0;
        for (var r = -1, i = ka(ca((n - t) / (e || 1)), 0), o = Fo(i); ++r < i;) o[r] = t, t += e;
        return o
      }

      function Uo(t, n, e) {
        if (t = +t, 1 > t || !_a(t)) return [];
        var r = -1,
          i = Fo(Sa(t, ja));
        for (n = te(n, e, 1); ++r < t;) ja > r ? i[r] = n(r) : n(r);
        return i
      }

      function zo(t) {
        var n = ++ra;
        return i(t) + n
      }
      g = g ? Gt.defaults(Wt.Object(), g, Gt.pick(Wt, Lt)) : Wt;
      var Fo = g.Array,
        Ho = g.Date,
        Bo = g.Error,
        Wo = g.Function,
        $o = g.Math,
        Xo = g.Number,
        Vo = g.Object,
        Yo = g.RegExp,
        Go = g.String,
        Qo = g.TypeError,
        Jo = Fo.prototype,
        Zo = Vo.prototype,
        Ko = (Ko = g.window) && Ko.document,
        ta = Wo.prototype.toString,
        na = Bn("length"),
        ea = Zo.hasOwnProperty,
        ra = 0,
        ia = Zo.toString,
        oa = g._,
        aa = Yo("^" + ho(ia).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        ua = Ni(ua = g.ArrayBuffer) && ua,
        sa = Ni(sa = ua && new ua(0).slice) && sa,
        ca = $o.ceil,
        la = g.clearTimeout,
        fa = $o.floor,
        ha = Ni(ha = Vo.getPrototypeOf) && ha,
        pa = Jo.push,
        da = Zo.propertyIsEnumerable,
        ga = Ni(ga = g.Set) && ga,
        va = g.setTimeout,
        ma = Jo.splice,
        ya = Ni(ya = g.Uint8Array) && ya,
        ba = Ni(ba = g.WeakMap) && ba,
        wa = function() {
          try {
            var t = Ni(t = g.Float64Array) && t,
              n = new t(new ua(10), 0, 1) && t
          } catch (e) {}
          return n
        }(),
        Aa = Ni(Aa = Fo.isArray) && Aa,
        xa = Ni(xa = Vo.create) && xa,
        _a = g.isFinite,
        Ma = Ni(Ma = Vo.keys) && Ma,
        ka = $o.max,
        Sa = $o.min,
        Ea = Ni(Ea = Ho.now) && Ea,
        Ca = Ni(Ca = Xo.isFinite) && Ca,
        Ta = g.parseInt,
        Pa = $o.random,
        Na = Xo.NEGATIVE_INFINITY,
        Da = Xo.POSITIVE_INFINITY,
        ja = $o.pow(2, 32) - 1,
        La = ja - 1,
        Ra = ja >>> 1,
        Oa = wa ? wa.BYTES_PER_ELEMENT : 0,
        Ia = $o.pow(2, 53) - 1,
        qa = ba && new ba,
        Ua = Y.support = {};
      ! function(t) {
        Ua.funcDecomp = !Ni(g.WinRTError) && Pt.test(A), Ua.funcNames = "string" == typeof Wo.name;
        try {
          Ua.dom = 11 === Ko.createDocumentFragment().nodeType
        } catch (n) {
          Ua.dom = !1
        }
        try {
          Ua.nonEnumArgs = !da.call(arguments, 1)
        } catch (n) {
          Ua.nonEnumArgs = !0
        }
      }(0, 0), Y.templateSettings = {
        escape: yt,
        evaluate: bt,
        interpolate: wt,
        variable: "",
        imports: {
          _: Y
        }
      };
      var za = function() {
          function t() {}
          return function(n) {
            if (Ci(n)) {
              t.prototype = n;
              var e = new t;
              t.prototype = null
            }
            return e || g.Object()
          }
        }(),
        Fa = qa ? function(t, n) {
          return qa.set(t, n), t
        } : Po;
      sa || (ne = ua && ya ? function(t) {
        var n = t.byteLength,
          e = wa ? fa(n / Oa) : 0,
          r = e * Oa,
          i = new ua(n);
        if (e) {
          var o = new wa(i, 0, e);
          o.set(new wa(t, 0, e))
        }
        return n != r && (o = new ya(i, r), o.set(new ya(t, r))), i
      } : To(null));
      var Ha = xa && ga ? function(t) {
          return new Qt(t)
        } : To(null),
        Ba = qa ? function(t) {
          return qa.get(t)
        } : Ro,
        Wa = function() {
          var t = 0,
            n = 0;
          return function(e, r) {
            var i = Ja(),
              o = O - (i - n);
            if (n = i, o > 0) {
              if (++t >= R) return e
            } else t = 0;
            return Fa(e, r)
          }
        }(),
        $a = ie(function(t, n, e) {
          ea.call(t, e) ? ++t[e] : t[e] = 1
        }),
        Xa = ie(function(t, n, e) {
          ea.call(t, e) ? t[e].push(n) : t[e] = [n]
        }),
        Va = ie(function(t, n, e) {
          t[e] = n
        }),
        Ya = ce(an),
        Ga = ce(un, !0),
        Qa = ie(function(t, n, e) {
          t[e ? 0 : 1].push(n)
        }, function() {
          return [
            [],
            []
          ]
        }),
        Ja = Ea || function() {
          return (new Ho).getTime()
        },
        Za = Aa || function(t) {
          return d(t) && Ee(t.length) && ia.call(t) == B || !1
        };
      Ua.dom || (Mi = function(t) {
        return t && 1 === t.nodeType && d(t) && !nu(t) || !1
      });
      var Ka = Ca || function(t) {
          return "number" == typeof t && _a(t)
        },
        tu = e(/x/) || ya && !e(ya) ? function(t) {
          return ia.call(t) == V
        } : e,
        nu = ha ? function(t) {
          if (!t || ia.call(t) != Q) return !1;
          var n = t.valueOf,
            e = Ni(n) && (e = ha(n)) && ha(e);
          return e ? t == e || ha(t) == e : je(t)
        } : je,
        eu = oe(pn),
        ru = Ma ? function(t) {
          if (t) var n = t.constructor,
            e = t.length;
          return "function" == typeof n && n.prototype === t || "function" != typeof t && e && Ee(e) ? Le(t) : Ci(t) ? Ma(t) : []
        } : Le,
        iu = oe(Fn),
        ou = ue(function(t, n, e) {
          return n = n.toLowerCase(), t + (e ? n.charAt(0).toUpperCase() + n.slice(1) : n)
        }),
        au = ue(function(t, n, e) {
          return t + (e ? "-" : "") + n.toLowerCase()
        });
      8 != Ta(jt + "08") && (mo = function(t, n, e) {
        return (e ? Se(t, n, e) : null == n) ? n = 0 : n && (n = +n), t = Ao(t), Ta(t, n || (Mt.test(t) ? 16 : 10))
      });
      var uu = ue(function(t, n, e) {
          return t + (e ? "_" : "") + n.toLowerCase()
        }),
        su = ue(function(t, n, e) {
          return t + (e ? " " : "") + (n.charAt(0).toUpperCase() + n.slice(1))
        });
      return Y.prototype = Z.prototype, tt.prototype = za(Z.prototype),
        tt.prototype.constructor = tt, Ut.prototype = za(Z.prototype), Ut.prototype.constructor = Ut, Bt.prototype["delete"] = $t, Bt.prototype.get = Xt, Bt.prototype.has = Vt, Bt.prototype.set = Yt, Qt.prototype.push = Zt, li.Cache = Bt, Y.after = Jr, Y.ary = Zr, Y.assign = eu, Y.at = Tr, Y.before = Kr, Y.bind = ti, Y.bindAll = ni, Y.bindKey = ei, Y.callback = Co, Y.chain = wr, Y.chunk = qe, Y.compact = Ue, Y.constant = To, Y.countBy = $a, Y.create = zi, Y.curry = ri, Y.curryRight = ii, Y.debounce = oi, Y.defaults = Fi, Y.defer = ai, Y.delay = ui, Y.difference = ze, Y.drop = Fe, Y.dropRight = He, Y.dropRightWhile = Be, Y.dropWhile = We, Y.fill = $e, Y.filter = Nr, Y.flatten = Ge, Y.flattenDeep = Qe, Y.flow = si, Y.flowRight = ci, Y.forEach = Rr, Y.forEachRight = Or, Y.forIn = Wi, Y.forInRight = $i, Y.forOwn = Xi, Y.forOwnRight = Vi, Y.functions = Yi, Y.groupBy = Xa, Y.indexBy = Va, Y.initial = Ze, Y.intersection = Ke, Y.invert = Qi, Y.invoke = qr, Y.keys = ru, Y.keysIn = Ji, Y.map = Ur, Y.mapValues = Zi, Y.matches = No, Y.matchesProperty = Do, Y.memoize = li, Y.merge = iu, Y.mixin = jo, Y.negate = fi, Y.omit = Ki, Y.once = hi, Y.pairs = to, Y.partial = pi, Y.partialRight = di, Y.partition = Qa, Y.pick = no, Y.pluck = zr, Y.property = Oo, Y.propertyOf = Io, Y.pull = er, Y.pullAt = rr, Y.range = qo, Y.rearg = gi, Y.reject = Br, Y.remove = ir, Y.rest = or, Y.shuffle = $r, Y.slice = ar, Y.sortBy = Yr, Y.sortByAll = Gr, Y.spread = vi, Y.take = cr, Y.takeRight = lr, Y.takeRightWhile = fr, Y.takeWhile = hr, Y.tap = Ar, Y.throttle = mi, Y.thru = xr, Y.times = Uo, Y.toArray = qi, Y.toPlainObject = Ui, Y.transform = ro, Y.union = pr, Y.uniq = dr, Y.unzip = gr, Y.values = io, Y.valuesIn = oo, Y.where = Qr, Y.without = vr, Y.wrap = yi, Y.xor = mr, Y.zip = yr, Y.zipObject = br, Y.backflow = ci, Y.collect = Ur, Y.compose = ci, Y.each = Rr, Y.eachRight = Or, Y.extend = eu, Y.iteratee = Co, Y.methods = Yi, Y.object = br, Y.select = Nr, Y.tail = or, Y.unique = dr, jo(Y, Y), Y.attempt = Eo, Y.camelCase = ou, Y.capitalize = so, Y.clone = bi, Y.cloneDeep = wi, Y.deburr = co, Y.endsWith = lo, Y.escape = fo, Y.escapeRegExp = ho, Y.every = Pr, Y.find = Dr, Y.findIndex = Xe, Y.findKey = Hi, Y.findLast = jr, Y.findLastIndex = Ve, Y.findLastKey = Bi, Y.findWhere = Lr, Y.first = Ye, Y.has = Gi, Y.identity = Po, Y.includes = Ir, Y.indexOf = Je, Y.inRange = ao, Y.isArguments = Ai, Y.isArray = Za, Y.isBoolean = xi, Y.isDate = _i, Y.isElement = Mi, Y.isEmpty = ki, Y.isEqual = Si, Y.isError = Ei, Y.isFinite = Ka, Y.isFunction = tu, Y.isMatch = Ti, Y.isNaN = Pi, Y.isNative = Ni, Y.isNull = Di, Y.isNumber = ji, Y.isObject = Ci, Y.isPlainObject = nu, Y.isRegExp = Li, Y.isString = Ri, Y.isTypedArray = Oi, Y.isUndefined = Ii, Y.kebabCase = au, Y.last = tr, Y.lastIndexOf = nr, Y.max = Ya, Y.min = Ga, Y.noConflict = Lo, Y.noop = Ro, Y.now = Ja, Y.pad = po, Y.padLeft = go, Y.padRight = vo, Y.parseInt = mo, Y.random = uo, Y.reduce = Fr, Y.reduceRight = Hr, Y.repeat = yo, Y.result = eo, Y.runInContext = A, Y.size = Xr, Y.snakeCase = uu, Y.some = Vr, Y.sortedIndex = ur, Y.sortedLastIndex = sr, Y.startCase = su, Y.startsWith = bo, Y.template = wo, Y.trim = Ao, Y.trimLeft = xo, Y.trimRight = _o, Y.trunc = Mo, Y.unescape = ko, Y.uniqueId = zo, Y.words = So, Y.all = Pr, Y.any = Vr, Y.contains = Ir, Y.detect = Dr, Y.foldl = Fr, Y.foldr = Hr, Y.head = Ye, Y.include = Ir, Y.inject = Fr, jo(Y, function() {
          var t = {};
          return Nn(Y, function(n, e) {
            Y.prototype[e] || (t[e] = n)
          }), t
        }(), !1), Y.sample = Wr, Y.prototype.sample = function(t) {
          return this.__chain__ || null != t ? this.thru(function(n) {
            return Wr(n, t)
          }) : Wr(this.value())
        }, Y.VERSION = _, tn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
          Y[t].placeholder = Y
        }), tn(["filter", "map", "takeWhile"], function(t, n) {
          var e = n == I,
            r = n == U;
          Ut.prototype[t] = function(t, i) {
            var o = this.clone(),
              a = o.__filtered__,
              u = o.__iteratees__ || (o.__iteratees__ = []);
            return o.__filtered__ = a || e || r && o.__dir__ < 0, u.push({
              iteratee: ye(t, i, 3),
              type: n
            }), o
          }
        }), tn(["drop", "take"], function(t, n) {
          var e = "__" + t + "Count__",
            r = t + "While";
          Ut.prototype[t] = function(r) {
            r = null == r ? 1 : ka(fa(r) || 0, 0);
            var i = this.clone();
            if (i.__filtered__) {
              var o = i[e];
              i[e] = n ? Sa(o, r) : o + r
            } else {
              var a = i.__views__ || (i.__views__ = []);
              a.push({
                size: r,
                type: t + (i.__dir__ < 0 ? "Right" : "")
              })
            }
            return i
          }, Ut.prototype[t + "Right"] = function(n) {
            return this.reverse()[t](n).reverse()
          }, Ut.prototype[t + "RightWhile"] = function(t, n) {
            return this.reverse()[r](t, n).reverse()
          }
        }), tn(["first", "last"], function(t, n) {
          var e = "take" + (n ? "Right" : "");
          Ut.prototype[t] = function() {
            return this[e](1).value()[0]
          }
        }), tn(["initial", "rest"], function(t, n) {
          var e = "drop" + (n ? "" : "Right");
          Ut.prototype[t] = function() {
            return this[e](1)
          }
        }), tn(["pluck", "where"], function(t, n) {
          var e = n ? "filter" : "map",
            r = n ? Un : Bn;
          Ut.prototype[t] = function(t) {
            return this[e](r(t))
          }
        }), Ut.prototype.compact = function() {
          return this.filter(Po)
        }, Ut.prototype.dropWhile = function(t, n) {
          var e;
          return t = ye(t, n, 3), this.filter(function(n, r, i) {
            return e || (e = !t(n, r, i))
          })
        }, Ut.prototype.reject = function(t, n) {
          return t = ye(t, n, 3), this.filter(function(n, e, r) {
            return !t(n, e, r)
          })
        }, Ut.prototype.slice = function(t, n) {
          t = null == t ? 0 : +t || 0;
          var e = 0 > t ? this.takeRight(-t) : this.drop(t);
          return "undefined" != typeof n && (n = +n || 0, e = 0 > n ? e.dropRight(-n) : e.take(n - t)), e
        }, Ut.prototype.toArray = function() {
          return this.drop(0)
        }, Nn(Ut.prototype, function(t, n) {
          var e = Y[n],
            r = /^(?:first|last)$/.test(n);
          Y.prototype[n] = function() {
            var n = this.__wrapped__,
              i = arguments,
              o = this.__chain__,
              a = !!this.__actions__.length,
              u = n instanceof Ut,
              s = u && !a;
            if (r && !o) return s ? t.call(n) : e.call(Y, this.value());
            var c = function(t) {
              var n = [t];
              return pa.apply(n, i), e.apply(Y, n)
            };
            if (u || Za(n)) {
              var l = s ? n : new Ut(this),
                f = t.apply(l, i);
              if (!r && (a || f.__actions__)) {
                var h = f.__actions__ || (f.__actions__ = []);
                h.push({
                  func: xr,
                  args: [c],
                  thisArg: Y
                })
              }
              return new tt(f, o)
            }
            return this.thru(c)
          }
        }), tn(["concat", "join", "pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
          var n = Jo[t],
            e = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
            r = /^(?:join|pop|shift)$/.test(t);
          Y.prototype[t] = function() {
            var t = arguments;
            return r && !this.__chain__ ? n.apply(this.value(), t) : this[e](function(e) {
              return n.apply(e, t)
            })
          }
        }), Ut.prototype.clone = zt, Ut.prototype.reverse = Ft, Ut.prototype.value = Ht, Y.prototype.chain = _r, Y.prototype.commit = Mr, Y.prototype.plant = kr, Y.prototype.reverse = Sr, Y.prototype.toString = Er, Y.prototype.run = Y.prototype.toJSON = Y.prototype.valueOf = Y.prototype.value = Cr, Y.prototype.collect = Y.prototype.map, Y.prototype.head = Y.prototype.first, Y.prototype.select = Y.prototype.filter, Y.prototype.tail = Y.prototype.rest, Y
    }
    var x, _ = "3.3.0",
      M = 1,
      k = 2,
      S = 4,
      E = 8,
      C = 16,
      T = 32,
      P = 64,
      N = 128,
      D = 256,
      j = 30,
      L = "...",
      R = 150,
      O = 16,
      I = 0,
      q = 1,
      U = 2,
      z = "Expected a function",
      F = "__lodash_placeholder__",
      H = "[object Arguments]",
      B = "[object Array]",
      W = "[object Boolean]",
      $ = "[object Date]",
      X = "[object Error]",
      V = "[object Function]",
      Y = "[object Map]",
      G = "[object Number]",
      Q = "[object Object]",
      J = "[object RegExp]",
      Z = "[object Set]",
      K = "[object String]",
      tt = "[object WeakMap]",
      nt = "[object ArrayBuffer]",
      et = "[object Float32Array]",
      rt = "[object Float64Array]",
      it = "[object Int8Array]",
      ot = "[object Int16Array]",
      at = "[object Int32Array]",
      ut = "[object Uint8Array]",
      st = "[object Uint8ClampedArray]",
      ct = "[object Uint16Array]",
      lt = "[object Uint32Array]",
      ft = /\b__p \+= '';/g,
      ht = /\b(__p \+=) '' \+/g,
      pt = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      dt = /&(?:amp|lt|gt|quot|#39|#96);/g,
      gt = /[&<>"'`]/g,
      vt = RegExp(dt.source),
      mt = RegExp(gt.source),
      yt = /<%-([\s\S]+?)%>/g,
      bt = /<%([\s\S]+?)%>/g,
      wt = /<%=([\s\S]+?)%>/g,
      At = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      xt = /\w*$/,
      _t = /^\s*function[ \n\r\t]+\w/,
      Mt = /^0[xX]/,
      kt = /^\[object .+?Constructor\]$/,
      St = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
      Et = /($^)/,
      Ct = /[.*+?^${}()|[\]\/\\]/g,
      Tt = RegExp(Ct.source),
      Pt = /\bthis\b/,
      Nt = /['\n\r\u2028\u2029\\]/g,
      Dt = function() {
        var t = "[A-Z\\xc0-\\xd6\\xd8-\\xde]",
          n = "[a-z\\xdf-\\xf6\\xf8-\\xff]+";
        return RegExp(t + "{2,}(?=" + t + n + ")|" + t + "?" + n + "|" + t + "+|[0-9]+", "g")
      }(),
      jt = "   \fÂ \ufeff\n\r\u2028\u2029áš€á Žâ€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€",
      Lt = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "_", "clearTimeout", "document", "isFinite", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "window", "WinRTError"],
      Rt = -1,
      Ot = {};
    Ot[et] = Ot[rt] = Ot[it] = Ot[ot] = Ot[at] = Ot[ut] = Ot[st] = Ot[ct] = Ot[lt] = !0, Ot[H] = Ot[B] = Ot[nt] = Ot[W] = Ot[$] = Ot[X] = Ot[V] = Ot[Y] = Ot[G] = Ot[Q] = Ot[J] = Ot[Z] = Ot[K] = Ot[tt] = !1;
    var It = {};
    It[H] = It[B] = It[nt] = It[W] = It[$] = It[et] = It[rt] = It[it] = It[ot] = It[at] = It[G] = It[Q] = It[J] = It[K] = It[ut] = It[st] = It[ct] = It[lt] = !0, It[X] = It[V] = It[Y] = It[Z] = It[tt] = !1;
    var qt = {
        leading: !1,
        maxWait: 0,
        trailing: !1
      },
      Ut = {
        "Ã€": "A",
        "Ã": "A",
        "Ã‚": "A",
        "Ãƒ": "A",
        "Ã„": "A",
        "Ã…": "A",
        "Ã ": "a",
        "Ã¡": "a",
        "Ã¢": "a",
        "Ã£": "a",
        "Ã¤": "a",
        "Ã¥": "a",
        "Ã‡": "C",
        "Ã§": "c",
        "Ã": "D",
        "Ã°": "d",
        "Ãˆ": "E",
        "Ã‰": "E",
        "ÃŠ": "E",
        "Ã‹": "E",
        "Ã¨": "e",
        "Ã©": "e",
        "Ãª": "e",
        "Ã«": "e",
        "ÃŒ": "I",
        "Ã": "I",
        "ÃŽ": "I",
        "Ã": "I",
        "Ã¬": "i",
        "Ã­": "i",
        "Ã®": "i",
        "Ã¯": "i",
        "Ã‘": "N",
        "Ã±": "n",
        "Ã’": "O",
        "Ã“": "O",
        "Ã”": "O",
        "Ã•": "O",
        "Ã–": "O",
        "Ã˜": "O",
        "Ã²": "o",
        "Ã³": "o",
        "Ã´": "o",
        "Ãµ": "o",
        "Ã¶": "o",
        "Ã¸": "o",
        "Ã™": "U",
        "Ãš": "U",
        "Ã›": "U",
        "Ãœ": "U",
        "Ã¹": "u",
        "Ãº": "u",
        "Ã»": "u",
        "Ã¼": "u",
        "Ã": "Y",
        "Ã½": "y",
        "Ã¿": "y",
        "Ã†": "Ae",
        "Ã¦": "ae",
        "Ãž": "Th",
        "Ã¾": "th",
        "ÃŸ": "ss"
      },
      zt = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#96;"
      },
      Ft = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&#96;": "`"
      },
      Ht = {
        "function": !0,
        object: !0
      },
      Bt = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      },
      Wt = Ht[typeof window] && window !== (this && this.window) ? window : this,
      $t = Ht[typeof exports] && exports && !exports.nodeType && exports,
      Xt = Ht[typeof module] && module && !module.nodeType && module,
      Vt = $t && Xt && "object" == typeof global && global;
    !Vt || Vt.global !== Vt && Vt.window !== Vt && Vt.self !== Vt || (Wt = Vt);
    var Yt = Xt && Xt.exports === $t && $t,
      Gt = A();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (Wt._ = Gt, define(function() {
      return Gt
    })) : $t && Xt ? Yt ? (Xt.exports = Gt)._ = Gt : $t._ = Gt : Wt._ = Gt
  }.call(this), ! function() {
    function t(t) {
      return t && (t.ownerDocument || t.document || t).documentElement
    }

    function n(t) {
      return t && (t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView)
    }

    function e(t, n) {
      return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0
    }

    function r(t) {
      return null === t ? 0 / 0 : +t
    }

    function i(t) {
      return !isNaN(t)
    }

    function o(t) {
      return {
        left: function(n, e, r, i) {
          for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = n.length); i > r;) {
            var o = r + i >>> 1;
            t(n[o], e) < 0 ? r = o + 1 : i = o
          }
          return r
        },
        right: function(n, e, r, i) {
          for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = n.length); i > r;) {
            var o = r + i >>> 1;
            t(n[o], e) > 0 ? i = o : r = o + 1
          }
          return r
        }
      }
    }

    function a(t) {
      return t.length
    }

    function u(t) {
      for (var n = 1; t * n % 1;) n *= 10;
      return n
    }

    function s(t, n) {
      for (var e in n) Object.defineProperty(t.prototype, e, {
        value: n[e],
        enumerable: !1
      })
    }

    function c() {
      this._ = Object.create(null)
    }

    function l(t) {
      return (t += "") === ga || t[0] === va ? va + t : t
    }

    function f(t) {
      return (t += "")[0] === va ? t.slice(1) : t
    }

    function h(t) {
      return l(t) in this._
    }

    function p(t) {
      return (t = l(t)) in this._ && delete this._[t]
    }

    function d() {
      var t = [];
      for (var n in this._) t.push(f(n));
      return t
    }

    function g() {
      var t = 0;
      for (var n in this._) ++t;
      return t
    }

    function v() {
      for (var t in this._) return !1;
      return !0
    }

    function m() {
      this._ = Object.create(null)
    }

    function y(t) {
      return t
    }

    function b(t, n, e) {
      return function() {
        var r = e.apply(n, arguments);
        return r === n ? t : r
      }
    }

    function w(t, n) {
      if (n in t) return n;
      n = n.charAt(0).toUpperCase() + n.slice(1);
      for (var e = 0, r = ma.length; r > e; ++e) {
        var i = ma[e] + n;
        if (i in t) return i
      }
    }

    function A() {}

    function x() {}

    function _(t) {
      function n() {
        for (var n, r = e, i = -1, o = r.length; ++i < o;)(n = r[i].on) && n.apply(this, arguments);
        return t
      }
      var e = [],
        r = new c;
      return n.on = function(n, i) {
        var o, a = r.get(n);
        return arguments.length < 2 ? a && a.on : (a && (a.on = null, e = e.slice(0, o = e.indexOf(a)).concat(e.slice(o + 1)), r.remove(n)), i && e.push(r.set(n, {
          on: i
        })), t)
      }, n
    }

    function M() {
      ea.event.preventDefault()
    }

    function k() {
      for (var t, n = ea.event; t = n.sourceEvent;) n = t;
      return n
    }

    function S(t) {
      for (var n = new x, e = 0, r = arguments.length; ++e < r;) n[arguments[e]] = _(n);
      return n.of = function(e, r) {
        return function(i) {
          try {
            var o = i.sourceEvent = ea.event;
            i.target = t, ea.event = i, n[i.type].apply(e, r)
          } finally {
            ea.event = o
          }
        }
      }, n
    }

    function E(t) {
      return ba(t, _a), t
    }

    function C(t) {
      return "function" == typeof t ? t : function() {
        return wa(t, this)
      }
    }

    function T(t) {
      return "function" == typeof t ? t : function() {
        return Aa(t, this)
      }
    }

    function P(t, n) {
      function e() {
        this.removeAttribute(t)
      }

      function r() {
        this.removeAttributeNS(t.space, t.local)
      }

      function i() {
        this.setAttribute(t, n)
      }

      function o() {
        this.setAttributeNS(t.space, t.local, n)
      }

      function a() {
        var e = n.apply(this, arguments);
        null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
      }

      function u() {
        var e = n.apply(this, arguments);
        null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
      }
      return t = ea.ns.qualify(t), null == n ? t.local ? r : e : "function" == typeof n ? t.local ? u : a : t.local ? o : i
    }

    function N(t) {
      return t.trim().replace(/\s+/g, " ")
    }

    function D(t) {
      return new RegExp("(?:^|\\s+)" + ea.requote(t) + "(?:\\s+|$)", "g")
    }

    function j(t) {
      return (t + "").trim().split(/^|\s+/)
    }

    function L(t, n) {
      function e() {
        for (var e = -1; ++e < i;) t[e](this, n)
      }

      function r() {
        for (var e = -1, r = n.apply(this, arguments); ++e < i;) t[e](this, r)
      }
      t = j(t).map(R);
      var i = t.length;
      return "function" == typeof n ? r : e
    }

    function R(t) {
      var n = D(t);
      return function(e, r) {
        if (i = e.classList) return r ? i.add(t) : i.remove(t);
        var i = e.getAttribute("class") || "";
        r ? (n.lastIndex = 0, n.test(i) || e.setAttribute("class", N(i + " " + t))) : e.setAttribute("class", N(i.replace(n, " ")))
      }
    }

    function O(t, n, e) {
      function r() {
        this.style.removeProperty(t)
      }

      function i() {
        this.style.setProperty(t, n, e)
      }

      function o() {
        var r = n.apply(this, arguments);
        null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
      }
      return null == n ? r : "function" == typeof n ? o : i
    }

    function I(t, n) {
      function e() {
        delete this[t]
      }

      function r() {
        this[t] = n
      }

      function i() {
        var e = n.apply(this, arguments);
        null == e ? delete this[t] : this[t] = e
      }
      return null == n ? e : "function" == typeof n ? i : r
    }

    function q(t) {
      function n() {
        var n = this.ownerDocument,
          e = this.namespaceURI;
        return e ? n.createElementNS(e, t) : n.createElement(t)
      }

      function e() {
        return this.ownerDocument.createElementNS(t.space, t.local)
      }
      return "function" == typeof t ? t : (t = ea.ns.qualify(t)).local ? e : n
    }

    function U() {
      var t = this.parentNode;
      t && t.removeChild(this)
    }

    function z(t) {
      return {
        __data__: t
      }
    }

    function F(t) {
      return function() {
        return xa(this, t)
      }
    }

    function H(t) {
      return arguments.length || (t = e),
        function(n, e) {
          return n && e ? t(n.__data__, e.__data__) : !n - !e
        }
    }

    function B(t, n) {
      for (var e = 0, r = t.length; r > e; e++)
        for (var i, o = t[e], a = 0, u = o.length; u > a; a++)(i = o[a]) && n(i, a, e);
      return t
    }

    function W(t) {
      return ba(t, ka), t
    }

    function $(t) {
      var n, e;
      return function(r, i, o) {
        var a, u = t[o].update,
          s = u.length;
        for (o != e && (e = o, n = 0), i >= n && (n = i + 1); !(a = u[n]) && ++n < s;);
        return a
      }
    }

    function X(t, n, e) {
      function r() {
        var n = this[a];
        n && (this.removeEventListener(t, n, n.$), delete this[a])
      }

      function i() {
        var i = s(n, ia(arguments));
        r.call(this), this.addEventListener(t, this[a] = i, i.$ = e), i._ = n
      }

      function o() {
        var n, e = new RegExp("^__on([^.]+)" + ea.requote(t) + "$");
        for (var r in this)
          if (n = r.match(e)) {
            var i = this[r];
            this.removeEventListener(n[1], i, i.$), delete this[r]
          }
      }
      var a = "__on" + t,
        u = t.indexOf("."),
        s = V;
      u > 0 && (t = t.slice(0, u));
      var c = Sa.get(t);
      return c && (t = c, s = Y), u ? n ? i : r : n ? A : o
    }

    function V(t, n) {
      return function(e) {
        var r = ea.event;
        ea.event = e, n[0] = this.__data__;
        try {
          t.apply(this, n)
        } finally {
          ea.event = r
        }
      }
    }

    function Y(t, n) {
      var e = V(t, n);
      return function(t) {
        var n = this,
          r = t.relatedTarget;
        r && (r === n || 8 & r.compareDocumentPosition(n)) || e.call(n, t)
      }
    }

    function G(e) {
      var r = ".dragsuppress-" + ++Ca,
        i = "click" + r,
        o = ea.select(n(e)).on("touchmove" + r, M).on("dragstart" + r, M).on("selectstart" + r, M);
      if (null == Ea && (Ea = "onselectstart" in e ? !1 : w(e.style, "userSelect")), Ea) {
        var a = t(e).style,
          u = a[Ea];
        a[Ea] = "none"
      }
      return function(t) {
        if (o.on(r, null), Ea && (a[Ea] = u), t) {
          var n = function() {
            o.on(i, null)
          };
          o.on(i, function() {
            M(), n()
          }, !0), setTimeout(n, 0)
        }
      }
    }

    function Q(t, e) {
      e.changedTouches && (e = e.changedTouches[0]);
      var r = t.ownerSVGElement || t;
      if (r.createSVGPoint) {
        var i = r.createSVGPoint();
        if (0 > Ta) {
          var o = n(t);
          if (o.scrollX || o.scrollY) {
            r = ea.select("body").append("svg").style({
              position: "absolute",
              top: 0,
              left: 0,
              margin: 0,
              padding: 0,
              border: "none"
            }, "important");
            var a = r[0][0].getScreenCTM();
            Ta = !(a.f || a.e), r.remove()
          }
        }
        return Ta ? (i.x = e.pageX, i.y = e.pageY) : (i.x = e.clientX, i.y = e.clientY), i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y]
      }
      var u = t.getBoundingClientRect();
      return [e.clientX - u.left - t.clientLeft, e.clientY - u.top - t.clientTop]
    }

    function J() {
      return ea.event.changedTouches[0].identifier
    }

    function Z(t) {
      return t > 0 ? 1 : 0 > t ? -1 : 0
    }

    function K(t, n, e) {
      return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0])
    }

    function tt(t) {
      return t > 1 ? 0 : -1 > t ? Da : Math.acos(t)
    }

    function nt(t) {
      return t > 1 ? Ra : -1 > t ? -Ra : Math.asin(t)
    }

    function et(t) {
      return ((t = Math.exp(t)) - 1 / t) / 2
    }

    function rt(t) {
      return ((t = Math.exp(t)) + 1 / t) / 2
    }

    function it(t) {
      return ((t = Math.exp(2 * t)) - 1) / (t + 1)
    }

    function ot(t) {
      return (t = Math.sin(t / 2)) * t
    }

    function at() {}

    function ut(t, n, e) {
      return this instanceof ut ? (this.h = +t, this.s = +n, void(this.l = +e)) : arguments.length < 2 ? t instanceof ut ? new ut(t.h, t.s, t.l) : At("" + t, xt, ut) : new ut(t, n, e)
    }

    function st(t, n, e) {
      function r(t) {
        return t > 360 ? t -= 360 : 0 > t && (t += 360), 60 > t ? o + (a - o) * t / 60 : 180 > t ? a : 240 > t ? o + (a - o) * (240 - t) / 60 : o
      }

      function i(t) {
        return Math.round(255 * r(t))
      }
      var o, a;
      return t = isNaN(t) ? 0 : (t %= 360) < 0 ? t + 360 : t, n = isNaN(n) ? 0 : 0 > n ? 0 : n > 1 ? 1 : n, e = 0 > e ? 0 : e > 1 ? 1 : e, a = .5 >= e ? e * (1 + n) : e + n - e * n, o = 2 * e - a, new mt(i(t + 120), i(t), i(t - 120))
    }

    function ct(t, n, e) {
      return this instanceof ct ? (this.h = +t, this.c = +n, void(this.l = +e)) : arguments.length < 2 ? t instanceof ct ? new ct(t.h, t.c, t.l) : t instanceof ft ? pt(t.l, t.a, t.b) : pt((t = _t((t = ea.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : new ct(t, n, e)
    }

    function lt(t, n, e) {
      return isNaN(t) && (t = 0), isNaN(n) && (n = 0), new ft(e, Math.cos(t *= Oa) * n, Math.sin(t) * n)
    }

    function ft(t, n, e) {
      return this instanceof ft ? (this.l = +t, this.a = +n, void(this.b = +e)) : arguments.length < 2 ? t instanceof ft ? new ft(t.l, t.a, t.b) : t instanceof ct ? lt(t.h, t.c, t.l) : _t((t = mt(t)).r, t.g, t.b) : new ft(t, n, e)
    }

    function ht(t, n, e) {
      var r = (t + 16) / 116,
        i = r + n / 500,
        o = r - e / 200;
      return i = dt(i) * Va, r = dt(r) * Ya, o = dt(o) * Ga, new mt(vt(3.2404542 * i - 1.5371385 * r - .4985314 * o), vt(-.969266 * i + 1.8760108 * r + .041556 * o), vt(.0556434 * i - .2040259 * r + 1.0572252 * o))
    }

    function pt(t, n, e) {
      return t > 0 ? new ct(Math.atan2(e, n) * Ia, Math.sqrt(n * n + e * e), t) : new ct(0 / 0, 0 / 0, t)
    }

    function dt(t) {
      return t > .206893034 ? t * t * t : (t - 4 / 29) / 7.787037
    }

    function gt(t) {
      return t > .008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29
    }

    function vt(t) {
      return Math.round(255 * (.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055))
    }

    function mt(t, n, e) {
      return this instanceof mt ? (this.r = ~~t, this.g = ~~n, void(this.b = ~~e)) : arguments.length < 2 ? t instanceof mt ? new mt(t.r, t.g, t.b) : At("" + t, mt, st) : new mt(t, n, e)
    }

    function yt(t) {
      return new mt(t >> 16, t >> 8 & 255, 255 & t)
    }

    function bt(t) {
      return yt(t) + ""
    }

    function wt(t) {
      return 16 > t ? "0" + Math.max(0, t).toString(16) : Math.min(255, t).toString(16)
    }

    function At(t, n, e) {
      var r, i, o, a = 0,
        u = 0,
        s = 0;
      if (r = /([a-z]+)\((.*)\)/i.exec(t)) switch (i = r[2].split(","), r[1]) {
        case "hsl":
          return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
        case "rgb":
          return n(kt(i[0]), kt(i[1]), kt(i[2]))
      }
      return (o = Za.get(t.toLowerCase())) ? n(o.r, o.g, o.b) : (null == t || "#" !== t.charAt(0) || isNaN(o = parseInt(t.slice(1), 16)) || (4 === t.length ? (a = (3840 & o) >> 4, a = a >> 4 | a, u = 240 & o, u = u >> 4 | u, s = 15 & o, s = s << 4 | s) : 7 === t.length && (a = (16711680 & o) >> 16, u = (65280 & o) >> 8, s = 255 & o)), n(a, u, s))
    }

    function xt(t, n, e) {
      var r, i, o = Math.min(t /= 255, n /= 255, e /= 255),
        a = Math.max(t, n, e),
        u = a - o,
        s = (a + o) / 2;
      return u ? (i = .5 > s ? u / (a + o) : u / (2 - a - o), r = t == a ? (n - e) / u + (e > n ? 6 : 0) : n == a ? (e - t) / u + 2 : (t - n) / u + 4, r *= 60) : (r = 0 / 0, i = s > 0 && 1 > s ? 0 : r), new ut(r, i, s)
    }

    function _t(t, n, e) {
      t = Mt(t), n = Mt(n), e = Mt(e);
      var r = gt((.4124564 * t + .3575761 * n + .1804375 * e) / Va),
        i = gt((.2126729 * t + .7151522 * n + .072175 * e) / Ya),
        o = gt((.0193339 * t + .119192 * n + .9503041 * e) / Ga);
      return ft(116 * i - 16, 500 * (r - i), 200 * (i - o))
    }

    function Mt(t) {
      return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function kt(t) {
      var n = parseFloat(t);
      return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * n) : n
    }

    function St(t) {
      return "function" == typeof t ? t : function() {
        return t
      }
    }

    function Et(t) {
      return function(n, e, r) {
        return 2 === arguments.length && "function" == typeof e && (r = e, e = null), Ct(n, e, t, r)
      }
    }

    function Ct(t, n, e, r) {
      function i() {
        var t, n = s.status;
        if (!n && Pt(s) || n >= 200 && 300 > n || 304 === n) {
          try {
            t = e.call(o, s)
          } catch (r) {
            return void a.error.call(o, r)
          }
          a.load.call(o, t)
        } else a.error.call(o, s)
      }
      var o = {},
        a = ea.dispatch("beforesend", "progress", "load", "error"),
        u = {},
        s = new XMLHttpRequest,
        c = null;
      return !this.XDomainRequest || "withCredentials" in s || !/^(http(s)?:)?\/\//.test(t) || (s = new XDomainRequest), "onload" in s ? s.onload = s.onerror = i : s.onreadystatechange = function() {
        s.readyState > 3 && i()
      }, s.onprogress = function(t) {
        var n = ea.event;
        ea.event = t;
        try {
          a.progress.call(o, s)
        } finally {
          ea.event = n
        }
      }, o.header = function(t, n) {
        return t = (t + "").toLowerCase(), arguments.length < 2 ? u[t] : (null == n ? delete u[t] : u[t] = n + "", o)
      }, o.mimeType = function(t) {
        return arguments.length ? (n = null == t ? null : t + "", o) : n
      }, o.responseType = function(t) {
        return arguments.length ? (c = t, o) : c
      }, o.response = function(t) {
        return e = t, o
      }, ["get", "post"].forEach(function(t) {
        o[t] = function() {
          return o.send.apply(o, [t].concat(ia(arguments)))
        }
      }), o.send = function(e, r, i) {
        if (2 === arguments.length && "function" == typeof r && (i = r, r = null), s.open(e, t, !0), null == n || "accept" in u || (u.accept = n + ",*/*"), s.setRequestHeader)
          for (var l in u) s.setRequestHeader(l, u[l]);
        return null != n && s.overrideMimeType && s.overrideMimeType(n), null != c && (s.responseType = c), null != i && o.on("error", i).on("load", function(t) {
          i(null, t)
        }), a.beforesend.call(o, s), s.send(null == r ? null : r), o
      }, o.abort = function() {
        return s.abort(), o
      }, ea.rebind(o, a, "on"), null == r ? o : o.get(Tt(r))
    }

    function Tt(t) {
      return 1 === t.length ? function(n, e) {
        t(null == n ? e : null)
      } : t
    }

    function Pt(t) {
      var n = t.responseType;
      return n && "text" !== n ? t.response : t.responseText
    }

    function Nt() {
      var t = Dt(),
        n = jt() - t;
      n > 24 ? (isFinite(n) && (clearTimeout(eu), eu = setTimeout(Nt, n)), nu = 0) : (nu = 1, iu(Nt))
    }

    function Dt() {
      var t = Date.now();
      for (ru = Ka; ru;) t >= ru.t && (ru.f = ru.c(t - ru.t)), ru = ru.n;
      return t
    }

    function jt() {
      for (var t, n = Ka, e = 1 / 0; n;) n.f ? n = t ? t.n = n.n : Ka = n.n : (n.t < e && (e = n.t), n = (t = n).n);
      return tu = t, e
    }

    function Lt(t, n) {
      return n - (t ? Math.ceil(Math.log(t) / Math.LN10) : 1)
    }

    function Rt(t, n) {
      var e = Math.pow(10, 3 * da(8 - n));
      return {
        scale: n > 8 ? function(t) {
          return t / e
        } : function(t) {
          return t * e
        },
        symbol: t
      }
    }

    function Ot(t) {
      var n = t.decimal,
        e = t.thousands,
        r = t.grouping,
        i = t.currency,
        o = r && e ? function(t, n) {
          for (var i = t.length, o = [], a = 0, u = r[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(t.substring(i -= u, i + u)), !((s += u + 1) > n));) u = r[a = (a + 1) % r.length];
          return o.reverse().join(e)
        } : y;
      return function(t) {
        var e = au.exec(t),
          r = e[1] || " ",
          a = e[2] || ">",
          u = e[3] || "-",
          s = e[4] || "",
          c = e[5],
          l = +e[6],
          f = e[7],
          h = e[8],
          p = e[9],
          d = 1,
          g = "",
          v = "",
          m = !1,
          y = !0;
        switch (h && (h = +h.substring(1)), (c || "0" === r && "=" === a) && (c = r = "0", a = "="), p) {
          case "n":
            f = !0, p = "g";
            break;
          case "%":
            d = 100, v = "%", p = "f";
            break;
          case "p":
            d = 100, v = "%", p = "r";
            break;
          case "b":
          case "o":
          case "x":
          case "X":
            "#" === s && (g = "0" + p.toLowerCase());
          case "c":
            y = !1;
          case "d":
            m = !0, h = 0;
            break;
          case "s":
            d = -1, p = "r"
        }
        "$" === s && (g = i[0], v = i[1]), "r" != p || h || (p = "g"), null != h && ("g" == p ? h = Math.max(1, Math.min(21, h)) : ("e" == p || "f" == p) && (h = Math.max(0, Math.min(20, h)))), p = uu.get(p) || It;
        var b = c && f;
        return function(t) {
          var e = v;
          if (m && t % 1) return "";
          var i = 0 > t || 0 === t && 0 > 1 / t ? (t = -t, "-") : "-" === u ? "" : u;
          if (0 > d) {
            var s = ea.formatPrefix(t, h);
            t = s.scale(t), e = s.symbol + v
          } else t *= d;
          t = p(t, h);
          var w, A, x = t.lastIndexOf(".");
          if (0 > x) {
            var _ = y ? t.lastIndexOf("e") : -1;
            0 > _ ? (w = t, A = "") : (w = t.substring(0, _), A = t.substring(_))
          } else w = t.substring(0, x), A = n + t.substring(x + 1);
          !c && f && (w = o(w, 1 / 0));
          var M = g.length + w.length + A.length + (b ? 0 : i.length),
            k = l > M ? new Array(M = l - M + 1).join(r) : "";
          return b && (w = o(k + w, k.length ? l - A.length : 1 / 0)), i += g, t = w + A, ("<" === a ? i + t + k : ">" === a ? k + i + t : "^" === a ? k.substring(0, M >>= 1) + i + t + k.substring(M) : i + (b ? t : k + t)) + e
        }
      }
    }

    function It(t) {
      return t + ""
    }

    function qt() {
      this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function Ut(t, n, e) {
      function r(n) {
        var e = t(n),
          r = o(e, 1);
        return r - n > n - e ? e : r
      }

      function i(e) {
        return n(e = t(new cu(e - 1)), 1), e
      }

      function o(t, e) {
        return n(t = new cu(+t), e), t
      }

      function a(t, r, o) {
        var a = i(t),
          u = [];
        if (o > 1)
          for (; r > a;) e(a) % o || u.push(new Date(+a)), n(a, 1);
        else
          for (; r > a;) u.push(new Date(+a)), n(a, 1);
        return u
      }

      function u(t, n, e) {
        try {
          cu = qt;
          var r = new qt;
          return r._ = t, a(r, n, e)
        } finally {
          cu = Date
        }
      }
      t.floor = t, t.round = r, t.ceil = i, t.offset = o, t.range = a;
      var s = t.utc = zt(t);
      return s.floor = s, s.round = zt(r), s.ceil = zt(i), s.offset = zt(o), s.range = u, t
    }

    function zt(t) {
      return function(n, e) {
        try {
          cu = qt;
          var r = new qt;
          return r._ = n, t(r, e)._
        } finally {
          cu = Date
        }
      }
    }

    function Ft(t) {
      function n(t) {
        function n(n) {
          for (var e, i, o, a = [], u = -1, s = 0; ++u < r;) 37 === t.charCodeAt(u) && (a.push(t.slice(s, u)), null != (i = fu[e = t.charAt(++u)]) && (e = t.charAt(++u)), (o = C[e]) && (e = o(n, null == i ? "e" === e ? " " : "0" : i)), a.push(e), s = u + 1);
          return a.push(t.slice(s, u)), a.join("")
        }
        var r = t.length;
        return n.parse = function(n) {
          var r = {
              y: 1900,
              m: 0,
              d: 1,
              H: 0,
              M: 0,
              S: 0,
              L: 0,
              Z: null
            },
            i = e(r, t, n, 0);
          if (i != n.length) return null;
          "p" in r && (r.H = r.H % 12 + 12 * r.p);
          var o = null != r.Z && cu !== qt,
            a = new(o ? qt : cu);
          return "j" in r ? a.setFullYear(r.y, 0, r.j) : "w" in r && ("W" in r || "U" in r) ? (a.setFullYear(r.y, 0, 1), a.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (a.getDay() + 5) % 7 : r.w + 7 * r.U - (a.getDay() + 6) % 7)) : a.setFullYear(r.y, r.m, r.d), a.setHours(r.H + (r.Z / 100 | 0), r.M + r.Z % 100, r.S, r.L), o ? a._ : a
        }, n.toString = function() {
          return t
        }, n
      }

      function e(t, n, e, r) {
        for (var i, o, a, u = 0, s = n.length, c = e.length; s > u;) {
          if (r >= c) return -1;
          if (i = n.charCodeAt(u++), 37 === i) {
            if (a = n.charAt(u++), o = T[a in fu ? n.charAt(u++) : a], !o || (r = o(t, e, r)) < 0) return -1
          } else if (i != e.charCodeAt(r++)) return -1
        }
        return r
      }

      function r(t, n, e) {
        x.lastIndex = 0;
        var r = x.exec(n.slice(e));
        return r ? (t.w = _.get(r[0].toLowerCase()), e + r[0].length) : -1
      }

      function i(t, n, e) {
        w.lastIndex = 0;
        var r = w.exec(n.slice(e));
        return r ? (t.w = A.get(r[0].toLowerCase()), e + r[0].length) : -1
      }

      function o(t, n, e) {
        S.lastIndex = 0;
        var r = S.exec(n.slice(e));
        return r ? (t.m = E.get(r[0].toLowerCase()), e + r[0].length) : -1
      }

      function a(t, n, e) {
        M.lastIndex = 0;
        var r = M.exec(n.slice(e));
        return r ? (t.m = k.get(r[0].toLowerCase()), e + r[0].length) : -1
      }

      function u(t, n, r) {
        return e(t, C.c.toString(), n, r)
      }

      function s(t, n, r) {
        return e(t, C.x.toString(), n, r)
      }

      function c(t, n, r) {
        return e(t, C.X.toString(), n, r)
      }

      function l(t, n, e) {
        var r = b.get(n.slice(e, e += 2).toLowerCase());
        return null == r ? -1 : (t.p = r, e)
      }
      var f = t.dateTime,
        h = t.date,
        p = t.time,
        d = t.periods,
        g = t.days,
        v = t.shortDays,
        m = t.months,
        y = t.shortMonths;
      n.utc = function(t) {
        function e(t) {
          try {
            cu = qt;
            var n = new cu;
            return n._ = t, r(n)
          } finally {
            cu = Date
          }
        }
        var r = n(t);
        return e.parse = function(t) {
          try {
            cu = qt;
            var n = r.parse(t);
            return n && n._
          } finally {
            cu = Date
          }
        }, e.toString = r.toString, e
      }, n.multi = n.utc.multi = sn;
      var b = ea.map(),
        w = Bt(g),
        A = Wt(g),
        x = Bt(v),
        _ = Wt(v),
        M = Bt(m),
        k = Wt(m),
        S = Bt(y),
        E = Wt(y);
      d.forEach(function(t, n) {
        b.set(t.toLowerCase(), n)
      });
      var C = {
          a: function(t) {
            return v[t.getDay()]
          },
          A: function(t) {
            return g[t.getDay()]
          },
          b: function(t) {
            return y[t.getMonth()]
          },
          B: function(t) {
            return m[t.getMonth()]
          },
          c: n(f),
          d: function(t, n) {
            return Ht(t.getDate(), n, 2)
          },
          e: function(t, n) {
            return Ht(t.getDate(), n, 2)
          },
          H: function(t, n) {
            return Ht(t.getHours(), n, 2)
          },
          I: function(t, n) {
            return Ht(t.getHours() % 12 || 12, n, 2)
          },
          j: function(t, n) {
            return Ht(1 + su.dayOfYear(t), n, 3)
          },
          L: function(t, n) {
            return Ht(t.getMilliseconds(), n, 3)
          },
          m: function(t, n) {
            return Ht(t.getMonth() + 1, n, 2)
          },
          M: function(t, n) {
            return Ht(t.getMinutes(), n, 2)
          },
          p: function(t) {
            return d[+(t.getHours() >= 12)]
          },
          S: function(t, n) {
            return Ht(t.getSeconds(), n, 2)
          },
          U: function(t, n) {
            return Ht(su.sundayOfYear(t), n, 2)
          },
          w: function(t) {
            return t.getDay()
          },
          W: function(t, n) {
            return Ht(su.mondayOfYear(t), n, 2)
          },
          x: n(h),
          X: n(p),
          y: function(t, n) {
            return Ht(t.getFullYear() % 100, n, 2)
          },
          Y: function(t, n) {
            return Ht(t.getFullYear() % 1e4, n, 4)
          },
          Z: an,
          "%": function() {
            return "%"
          }
        },
        T = {
          a: r,
          A: i,
          b: o,
          B: a,
          c: u,
          d: Kt,
          e: Kt,
          H: nn,
          I: nn,
          j: tn,
          L: on,
          m: Zt,
          M: en,
          p: l,
          S: rn,
          U: Xt,
          w: $t,
          W: Vt,
          x: s,
          X: c,
          y: Gt,
          Y: Yt,
          Z: Qt,
          "%": un
        };
      return n
    }

    function Ht(t, n, e) {
      var r = 0 > t ? "-" : "",
        i = (r ? -t : t) + "",
        o = i.length;
      return r + (e > o ? new Array(e - o + 1).join(n) + i : i)
    }

    function Bt(t) {
      return new RegExp("^(?:" + t.map(ea.requote).join("|") + ")", "i")
    }

    function Wt(t) {
      for (var n = new c, e = -1, r = t.length; ++e < r;) n.set(t[e].toLowerCase(), e);
      return n
    }

    function $t(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 1));
      return r ? (t.w = +r[0], e + r[0].length) : -1
    }

    function Xt(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e));
      return r ? (t.U = +r[0], e + r[0].length) : -1
    }

    function Vt(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e));
      return r ? (t.W = +r[0], e + r[0].length) : -1
    }

    function Yt(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 4));
      return r ? (t.y = +r[0], e + r[0].length) : -1
    }

    function Gt(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 2));
      return r ? (t.y = Jt(+r[0]), e + r[0].length) : -1
    }

    function Qt(t, n, e) {
      return /^[+-]\d{4}$/.test(n = n.slice(e, e + 5)) ? (t.Z = -n, e + 5) : -1
    }

    function Jt(t) {
      return t + (t > 68 ? 1900 : 2e3)
    }

    function Zt(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 2));
      return r ? (t.m = r[0] - 1, e + r[0].length) : -1
    }

    function Kt(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 2));
      return r ? (t.d = +r[0], e + r[0].length) : -1
    }

    function tn(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 3));
      return r ? (t.j = +r[0], e + r[0].length) : -1
    }

    function nn(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 2));
      return r ? (t.H = +r[0], e + r[0].length) : -1
    }

    function en(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 2));
      return r ? (t.M = +r[0], e + r[0].length) : -1
    }

    function rn(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 2));
      return r ? (t.S = +r[0], e + r[0].length) : -1
    }

    function on(t, n, e) {
      hu.lastIndex = 0;
      var r = hu.exec(n.slice(e, e + 3));
      return r ? (t.L = +r[0], e + r[0].length) : -1
    }

    function an(t) {
      var n = t.getTimezoneOffset(),
        e = n > 0 ? "-" : "+",
        r = da(n) / 60 | 0,
        i = da(n) % 60;
      return e + Ht(r, "0", 2) + Ht(i, "0", 2)
    }

    function un(t, n, e) {
      pu.lastIndex = 0;
      var r = pu.exec(n.slice(e, e + 1));
      return r ? e + r[0].length : -1
    }

    function sn(t) {
      for (var n = t.length, e = -1; ++e < n;) t[e][0] = this(t[e][0]);
      return function(n) {
        for (var e = 0, r = t[e]; !r[1](n);) r = t[++e];
        return r[0](n)
      }
    }

    function cn() {}

    function ln(t, n, e) {
      var r = e.s = t + n,
        i = r - t,
        o = r - i;
      e.t = t - o + (n - i)
    }

    function fn(t, n) {
      t && mu.hasOwnProperty(t.type) && mu[t.type](t, n)
    }

    function hn(t, n, e) {
      var r, i = -1,
        o = t.length - e;
      for (n.lineStart(); ++i < o;) r = t[i], n.point(r[0], r[1], r[2]);
      n.lineEnd()
    }

    function pn(t, n) {
      var e = -1,
        r = t.length;
      for (n.polygonStart(); ++e < r;) hn(t[e], n, 1);
      n.polygonEnd()
    }

    function dn() {
      function t(t, n) {
        t *= Oa, n = n * Oa / 2 + Da / 4;
        var e = t - r,
          a = e >= 0 ? 1 : -1,
          u = a * e,
          s = Math.cos(n),
          c = Math.sin(n),
          l = o * c,
          f = i * s + l * Math.cos(u),
          h = l * a * Math.sin(u);
        bu.add(Math.atan2(h, f)), r = t, i = s, o = c
      }
      var n, e, r, i, o;
      wu.point = function(a, u) {
        wu.point = t, r = (n = a) * Oa, i = Math.cos(u = (e = u) * Oa / 2 + Da / 4), o = Math.sin(u)
      }, wu.lineEnd = function() {
        t(n, e)
      }
    }

    function gn(t) {
      var n = t[0],
        e = t[1],
        r = Math.cos(e);
      return [r * Math.cos(n), r * Math.sin(n), Math.sin(e)]
    }

    function vn(t, n) {
      return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
    }

    function mn(t, n) {
      return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }

    function yn(t, n) {
      t[0] += n[0], t[1] += n[1], t[2] += n[2]
    }

    function bn(t, n) {
      return [t[0] * n, t[1] * n, t[2] * n]
    }

    function wn(t) {
      var n = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
      t[0] /= n, t[1] /= n, t[2] /= n
    }

    function An(t) {
      return [Math.atan2(t[1], t[0]), nt(t[2])]
    }

    function xn(t, n) {
      return da(t[0] - n[0]) < Pa && da(t[1] - n[1]) < Pa
    }

    function _n(t, n) {
      t *= Oa;
      var e = Math.cos(n *= Oa);
      Mn(e * Math.cos(t), e * Math.sin(t), Math.sin(n))
    }

    function Mn(t, n, e) {
      ++Au, _u += (t - _u) / Au, Mu += (n - Mu) / Au, ku += (e - ku) / Au
    }

    function kn() {
      function t(t, i) {
        t *= Oa;
        var o = Math.cos(i *= Oa),
          a = o * Math.cos(t),
          u = o * Math.sin(t),
          s = Math.sin(i),
          c = Math.atan2(Math.sqrt((c = e * s - r * u) * c + (c = r * a - n * s) * c + (c = n * u - e * a) * c), n * a + e * u + r * s);
        xu += c, Su += c * (n + (n = a)), Eu += c * (e + (e = u)), Cu += c * (r + (r = s)), Mn(n, e, r)
      }
      var n, e, r;
      Du.point = function(i, o) {
        i *= Oa;
        var a = Math.cos(o *= Oa);
        n = a * Math.cos(i), e = a * Math.sin(i), r = Math.sin(o), Du.point = t, Mn(n, e, r)
      }
    }

    function Sn() {
      Du.point = _n
    }

    function En() {
      function t(t, n) {
        t *= Oa;
        var e = Math.cos(n *= Oa),
          a = e * Math.cos(t),
          u = e * Math.sin(t),
          s = Math.sin(n),
          c = i * s - o * u,
          l = o * a - r * s,
          f = r * u - i * a,
          h = Math.sqrt(c * c + l * l + f * f),
          p = r * a + i * u + o * s,
          d = h && -tt(p) / h,
          g = Math.atan2(h, p);
        Tu += d * c, Pu += d * l, Nu += d * f, xu += g, Su += g * (r + (r = a)), Eu += g * (i + (i = u)), Cu += g * (o + (o = s)), Mn(r, i, o)
      }
      var n, e, r, i, o;
      Du.point = function(a, u) {
        n = a, e = u, Du.point = t, a *= Oa;
        var s = Math.cos(u *= Oa);
        r = s * Math.cos(a), i = s * Math.sin(a), o = Math.sin(u), Mn(r, i, o)
      }, Du.lineEnd = function() {
        t(n, e), Du.lineEnd = Sn, Du.point = _n
      }
    }

    function Cn(t, n) {
      function e(e, r) {
        return e = t(e, r), n(e[0], e[1])
      }
      return t.invert && n.invert && (e.invert = function(e, r) {
        return e = n.invert(e, r), e && t.invert(e[0], e[1])
      }), e
    }

    function Tn() {
      return !0
    }

    function Pn(t, n, e, r, i) {
      var o = [],
        a = [];
      if (t.forEach(function(t) {
          if (!((n = t.length - 1) <= 0)) {
            var n, e = t[0],
              r = t[n];
            if (xn(e, r)) {
              i.lineStart();
              for (var u = 0; n > u; ++u) i.point((e = t[u])[0], e[1]);
              return void i.lineEnd()
            }
            var s = new Dn(e, t, null, !0),
              c = new Dn(e, null, s, !1);
            s.o = c, o.push(s), a.push(c), s = new Dn(r, t, null, !1), c = new Dn(r, null, s, !0), s.o = c, o.push(s), a.push(c)
          }
        }), a.sort(n), Nn(o), Nn(a), o.length) {
        for (var u = 0, s = e, c = a.length; c > u; ++u) a[u].e = s = !s;
        for (var l, f, h = o[0];;) {
          for (var p = h, d = !0; p.v;)
            if ((p = p.n) === h) return;
          l = p.z, i.lineStart();
          do {
            if (p.v = p.o.v = !0, p.e) {
              if (d)
                for (var u = 0, c = l.length; c > u; ++u) i.point((f = l[u])[0], f[1]);
              else r(p.x, p.n.x, 1, i);
              p = p.n
            } else {
              if (d) {
                l = p.p.z;
                for (var u = l.length - 1; u >= 0; --u) i.point((f = l[u])[0], f[1])
              } else r(p.x, p.p.x, -1, i);
              p = p.p
            }
            p = p.o, l = p.z, d = !d
          } while (!p.v);
          i.lineEnd()
        }
      }
    }

    function Nn(t) {
      if (n = t.length) {
        for (var n, e, r = 0, i = t[0]; ++r < n;) i.n = e = t[r], e.p = i, i = e;
        i.n = e = t[0], e.p = i
      }
    }

    function Dn(t, n, e, r) {
      this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
    }

    function jn(t, n, e, r) {
      return function(i, o) {
        function a(n, e) {
          var r = i(n, e);
          t(n = r[0], e = r[1]) && o.point(n, e)
        }

        function u(t, n) {
          var e = i(t, n);
          v.point(e[0], e[1])
        }

        function s() {
          y.point = u, v.lineStart()
        }

        function c() {
          y.point = a, v.lineEnd()
        }

        function l(t, n) {
          g.push([t, n]);
          var e = i(t, n);
          w.point(e[0], e[1])
        }

        function f() {
          w.lineStart(), g = []
        }

        function h() {
          l(g[0][0], g[0][1]), w.lineEnd();
          var t, n = w.clean(),
            e = b.buffer(),
            r = e.length;
          if (g.pop(), d.push(g), g = null, r)
            if (1 & n) {
              t = e[0];
              var i, r = t.length - 1,
                a = -1;
              if (r > 0) {
                for (A || (o.polygonStart(), A = !0), o.lineStart(); ++a < r;) o.point((i = t[a])[0], i[1]);
                o.lineEnd()
              }
            } else r > 1 && 2 & n && e.push(e.pop().concat(e.shift())), p.push(e.filter(Ln))
        }
        var p, d, g, v = n(o),
          m = i.invert(r[0], r[1]),
          y = {
            point: a,
            lineStart: s,
            lineEnd: c,
            polygonStart: function() {
              y.point = l, y.lineStart = f, y.lineEnd = h, p = [], d = []
            },
            polygonEnd: function() {
              y.point = a, y.lineStart = s, y.lineEnd = c, p = ea.merge(p);
              var t = zn(m, d);
              p.length ? (A || (o.polygonStart(), A = !0), Pn(p, On, t, e, o)) : t && (A || (o.polygonStart(), A = !0), o.lineStart(), e(null, null, 1, o), o.lineEnd()), A && (o.polygonEnd(), A = !1), p = d = null
            },
            sphere: function() {
              o.polygonStart(), o.lineStart(), e(null, null, 1, o), o.lineEnd(), o.polygonEnd()
            }
          },
          b = Rn(),
          w = n(b),
          A = !1;
        return y
      }
    }

    function Ln(t) {
      return t.length > 1
    }

    function Rn() {
      var t, n = [];
      return {
        lineStart: function() {
          n.push(t = [])
        },
        point: function(n, e) {
          t.push([n, e])
        },
        lineEnd: A,
        buffer: function() {
          var e = n;
          return n = [], t = null, e
        },
        rejoin: function() {
          n.length > 1 && n.push(n.pop().concat(n.shift()))
        }
      }
    }

    function On(t, n) {
      return ((t = t.x)[0] < 0 ? t[1] - Ra - Pa : Ra - t[1]) - ((n = n.x)[0] < 0 ? n[1] - Ra - Pa : Ra - n[1])
    }

    function In(t) {
      var n, e = 0 / 0,
        r = 0 / 0,
        i = 0 / 0;
      return {
        lineStart: function() {
          t.lineStart(), n = 1
        },
        point: function(o, a) {
          var u = o > 0 ? Da : -Da,
            s = da(o - e);
          da(s - Da) < Pa ? (t.point(e, r = (r + a) / 2 > 0 ? Ra : -Ra), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), t.point(o, r), n = 0) : i !== u && s >= Da && (da(e - i) < Pa && (e -= i * Pa), da(o - u) < Pa && (o -= u * Pa), r = qn(e, r, o, a), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), n = 0), t.point(e = o, r = a), i = u
        },
        lineEnd: function() {
          t.lineEnd(), e = r = 0 / 0
        },
        clean: function() {
          return 2 - n
        }
      }
    }

    function qn(t, n, e, r) {
      var i, o, a = Math.sin(t - e);
      return da(a) > Pa ? Math.atan((Math.sin(n) * (o = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (i = Math.cos(n)) * Math.sin(t)) / (i * o * a)) : (n + r) / 2
    }

    function Un(t, n, e, r) {
      var i;
      if (null == t) i = e * Ra, r.point(-Da, i), r.point(0, i), r.point(Da, i), r.point(Da, 0), r.point(Da, -i), r.point(0, -i), r.point(-Da, -i), r.point(-Da, 0), r.point(-Da, i);
      else if (da(t[0] - n[0]) > Pa) {
        var o = t[0] < n[0] ? Da : -Da;
        i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
      } else r.point(n[0], n[1])
    }

    function zn(t, n) {
      var e = t[0],
        r = t[1],
        i = [Math.sin(e), -Math.cos(e), 0],
        o = 0,
        a = 0;
      bu.reset();
      for (var u = 0, s = n.length; s > u; ++u) {
        var c = n[u],
          l = c.length;
        if (l)
          for (var f = c[0], h = f[0], p = f[1] / 2 + Da / 4, d = Math.sin(p), g = Math.cos(p), v = 1;;) {
            v === l && (v = 0), t = c[v];
            var m = t[0],
              y = t[1] / 2 + Da / 4,
              b = Math.sin(y),
              w = Math.cos(y),
              A = m - h,
              x = A >= 0 ? 1 : -1,
              _ = x * A,
              M = _ > Da,
              k = d * b;
            if (bu.add(Math.atan2(k * x * Math.sin(_), g * w + k * Math.cos(_))), o += M ? A + x * ja : A, M ^ h >= e ^ m >= e) {
              var S = mn(gn(f), gn(t));
              wn(S);
              var E = mn(i, S);
              wn(E);
              var C = (M ^ A >= 0 ? -1 : 1) * nt(E[2]);
              (r > C || r === C && (S[0] || S[1])) && (a += M ^ A >= 0 ? 1 : -1)
            }
            if (!v++) break;
            h = m, d = b, g = w, f = t
          }
      }
      return (-Pa > o || Pa > o && 0 > bu) ^ 1 & a
    }

    function Fn(t) {
      function n(t, n) {
        return Math.cos(t) * Math.cos(n) > o
      }

      function e(t) {
        var e, o, s, c, l;
        return {
          lineStart: function() {
            c = s = !1, l = 1
          },
          point: function(f, h) {
            var p, d = [f, h],
              g = n(f, h),
              v = a ? g ? 0 : i(f, h) : g ? i(f + (0 > f ? Da : -Da), h) : 0;
            if (!e && (c = s = g) && t.lineStart(), g !== s && (p = r(e, d), (xn(e, p) || xn(d, p)) && (d[0] += Pa, d[1] += Pa, g = n(d[0], d[1]))), g !== s) l = 0, g ? (t.lineStart(), p = r(d, e), t.point(p[0], p[1])) : (p = r(e, d), t.point(p[0], p[1]), t.lineEnd()), e = p;
            else if (u && e && a ^ g) {
              var m;
              v & o || !(m = r(d, e, !0)) || (l = 0, a ? (t.lineStart(), t.point(m[0][0], m[0][1]), t.point(m[1][0], m[1][1]), t.lineEnd()) : (t.point(m[1][0], m[1][1]), t.lineEnd(), t.lineStart(), t.point(m[0][0], m[0][1])))
            }!g || e && xn(e, d) || t.point(d[0], d[1]), e = d, s = g, o = v
          },
          lineEnd: function() {
            s && t.lineEnd(), e = null
          },
          clean: function() {
            return l | (c && s) << 1
          }
        }
      }

      function r(t, n, e) {
        var r = gn(t),
          i = gn(n),
          a = [1, 0, 0],
          u = mn(r, i),
          s = vn(u, u),
          c = u[0],
          l = s - c * c;
        if (!l) return !e && t;
        var f = o * s / l,
          h = -o * c / l,
          p = mn(a, u),
          d = bn(a, f),
          g = bn(u, h);
        yn(d, g);
        var v = p,
          m = vn(d, v),
          y = vn(v, v),
          b = m * m - y * (vn(d, d) - 1);
        if (!(0 > b)) {
          var w = Math.sqrt(b),
            A = bn(v, (-m - w) / y);
          if (yn(A, d), A = An(A), !e) return A;
          var x, _ = t[0],
            M = n[0],
            k = t[1],
            S = n[1];
          _ > M && (x = _, _ = M, M = x);
          var E = M - _,
            C = da(E - Da) < Pa,
            T = C || Pa > E;
          if (!C && k > S && (x = k, k = S, S = x), T ? C ? k + S > 0 ^ A[1] < (da(A[0] - _) < Pa ? k : S) : k <= A[1] && A[1] <= S : E > Da ^ (_ <= A[0] && A[0] <= M)) {
            var P = bn(v, (-m + w) / y);
            return yn(P, d), [A, An(P)]
          }
        }
      }

      function i(n, e) {
        var r = a ? t : Da - t,
          i = 0;
        return -r > n ? i |= 1 : n > r && (i |= 2), -r > e ? i |= 4 : e > r && (i |= 8), i
      }
      var o = Math.cos(t),
        a = o > 0,
        u = da(o) > Pa,
        s = de(t, 6 * Oa);
      return jn(n, e, s, a ? [0, -t] : [-Da, t - Da])
    }

    function Hn(t, n, e, r) {
      return function(i) {
        var o, a = i.a,
          u = i.b,
          s = a.x,
          c = a.y,
          l = u.x,
          f = u.y,
          h = 0,
          p = 1,
          d = l - s,
          g = f - c;
        if (o = t - s, d || !(o > 0)) {
          if (o /= d, 0 > d) {
            if (h > o) return;
            p > o && (p = o)
          } else if (d > 0) {
            if (o > p) return;
            o > h && (h = o)
          }
          if (o = e - s, d || !(0 > o)) {
            if (o /= d, 0 > d) {
              if (o > p) return;
              o > h && (h = o)
            } else if (d > 0) {
              if (h > o) return;
              p > o && (p = o)
            }
            if (o = n - c, g || !(o > 0)) {
              if (o /= g, 0 > g) {
                if (h > o) return;
                p > o && (p = o)
              } else if (g > 0) {
                if (o > p) return;
                o > h && (h = o)
              }
              if (o = r - c, g || !(0 > o)) {
                if (o /= g, 0 > g) {
                  if (o > p) return;
                  o > h && (h = o)
                } else if (g > 0) {
                  if (h > o) return;
                  p > o && (p = o)
                }
                return h > 0 && (i.a = {
                  x: s + h * d,
                  y: c + h * g
                }), 1 > p && (i.b = {
                  x: s + p * d,
                  y: c + p * g
                }), i
              }
            }
          }
        }
      }
    }

    function Bn(t, n, e, r) {
      function i(r, i) {
        return da(r[0] - t) < Pa ? i > 0 ? 0 : 3 : da(r[0] - e) < Pa ? i > 0 ? 2 : 1 : da(r[1] - n) < Pa ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
      }

      function o(t, n) {
        return a(t.x, n.x)
      }

      function a(t, n) {
        var e = i(t, 1),
          r = i(n, 1);
        return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
      }
      return function(u) {
        function s(t) {
          for (var n = 0, e = v.length, r = t[1], i = 0; e > i; ++i)
            for (var o, a = 1, u = v[i], s = u.length, c = u[0]; s > a; ++a) o = u[a], c[1] <= r ? o[1] > r && K(c, o, t) > 0 && ++n : o[1] <= r && K(c, o, t) < 0 && --n, c = o;
          return 0 !== n
        }

        function c(o, u, s, c) {
          var l = 0,
            f = 0;
          if (null == o || (l = i(o, s)) !== (f = i(u, s)) || a(o, u) < 0 ^ s > 0) {
            do c.point(0 === l || 3 === l ? t : e, l > 1 ? r : n); while ((l = (l + s + 4) % 4) !== f)
          } else c.point(u[0], u[1])
        }

        function l(i, o) {
          return i >= t && e >= i && o >= n && r >= o
        }

        function f(t, n) {
          l(t, n) && u.point(t, n)
        }

        function h() {
          T.point = d, v && v.push(m = []), M = !0, _ = !1, A = x = 0 / 0
        }

        function p() {
          g && (d(y, b), w && _ && E.rejoin(), g.push(E.buffer())), T.point = f, _ && u.lineEnd()
        }

        function d(t, n) {
          t = Math.max(-Lu, Math.min(Lu, t)), n = Math.max(-Lu, Math.min(Lu, n));
          var e = l(t, n);
          if (v && m.push([t, n]), M) y = t, b = n, w = e, M = !1, e && (u.lineStart(), u.point(t, n));
          else if (e && _) u.point(t, n);
          else {
            var r = {
              a: {
                x: A,
                y: x
              },
              b: {
                x: t,
                y: n
              }
            };
            C(r) ? (_ || (u.lineStart(), u.point(r.a.x, r.a.y)), u.point(r.b.x, r.b.y), e || u.lineEnd(), k = !1) : e && (u.lineStart(), u.point(t, n), k = !1)
          }
          A = t, x = n, _ = e
        }
        var g, v, m, y, b, w, A, x, _, M, k, S = u,
          E = Rn(),
          C = Hn(t, n, e, r),
          T = {
            point: f,
            lineStart: h,
            lineEnd: p,
            polygonStart: function() {
              u = E, g = [], v = [], k = !0
            },
            polygonEnd: function() {
              u = S, g = ea.merge(g);
              var n = s([t, r]),
                e = k && n,
                i = g.length;
              (e || i) && (u.polygonStart(), e && (u.lineStart(), c(null, null, 1, u), u.lineEnd()), i && Pn(g, o, n, c, u), u.polygonEnd()), g = v = m = null
            }
          };
        return T
      }
    }

    function Wn(t) {
      var n = 0,
        e = Da / 3,
        r = ae(t),
        i = r(n, e);
      return i.parallels = function(t) {
        return arguments.length ? r(n = t[0] * Da / 180, e = t[1] * Da / 180) : [n / Da * 180, e / Da * 180]
      }, i
    }

    function $n(t, n) {
      function e(t, n) {
        var e = Math.sqrt(o - 2 * i * Math.sin(n)) / i;
        return [e * Math.sin(t *= i), a - e * Math.cos(t)]
      }
      var r = Math.sin(t),
        i = (r + Math.sin(n)) / 2,
        o = 1 + r * (2 * i - r),
        a = Math.sqrt(o) / i;
      return e.invert = function(t, n) {
        var e = a - n;
        return [Math.atan2(t, e) / i, nt((o - (t * t + e * e) * i * i) / (2 * i))]
      }, e
    }

    function Xn() {
      function t(t, n) {
        Ou += i * t - r * n, r = t, i = n
      }
      var n, e, r, i;
      Fu.point = function(o, a) {
        Fu.point = t, n = r = o, e = i = a
      }, Fu.lineEnd = function() {
        t(n, e)
      }
    }

    function Vn(t, n) {
      Iu > t && (Iu = t), t > Uu && (Uu = t), qu > n && (qu = n), n > zu && (zu = n)
    }

    function Yn() {
      function t(t, n) {
        a.push("M", t, ",", n, o)
      }

      function n(t, n) {
        a.push("M", t, ",", n), u.point = e
      }

      function e(t, n) {
        a.push("L", t, ",", n)
      }

      function r() {
        u.point = t
      }

      function i() {
        a.push("Z")
      }
      var o = Gn(4.5),
        a = [],
        u = {
          point: t,
          lineStart: function() {
            u.point = n
          },
          lineEnd: r,
          polygonStart: function() {
            u.lineEnd = i
          },
          polygonEnd: function() {
            u.lineEnd = r, u.point = t
          },
          pointRadius: function(t) {
            return o = Gn(t), u
          },
          result: function() {
            if (a.length) {
              var t = a.join("");
              return a = [], t
            }
          }
        };
      return u
    }

    function Gn(t) {
      return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }

    function Qn(t, n) {
      _u += t, Mu += n, ++ku
    }

    function Jn() {
      function t(t, r) {
        var i = t - n,
          o = r - e,
          a = Math.sqrt(i * i + o * o);
        Su += a * (n + t) / 2, Eu += a * (e + r) / 2, Cu += a, Qn(n = t, e = r)
      }
      var n, e;
      Bu.point = function(r, i) {
        Bu.point = t, Qn(n = r, e = i)
      }
    }

    function Zn() {
      Bu.point = Qn
    }

    function Kn() {
      function t(t, n) {
        var e = t - r,
          o = n - i,
          a = Math.sqrt(e * e + o * o);
        Su += a * (r + t) / 2, Eu += a * (i + n) / 2, Cu += a, a = i * t - r * n, Tu += a * (r + t), Pu += a * (i + n), Nu += 3 * a, Qn(r = t, i = n)
      }
      var n, e, r, i;
      Bu.point = function(o, a) {
        Bu.point = t, Qn(n = r = o, e = i = a)
      }, Bu.lineEnd = function() {
        t(n, e)
      }
    }

    function te(t) {
      function n(n, e) {
        t.moveTo(n + a, e), t.arc(n, e, a, 0, ja)
      }

      function e(n, e) {
        t.moveTo(n, e), u.point = r
      }

      function r(n, e) {
        t.lineTo(n, e)
      }

      function i() {
        u.point = n
      }

      function o() {
        t.closePath()
      }
      var a = 4.5,
        u = {
          point: n,
          lineStart: function() {
            u.point = e
          },
          lineEnd: i,
          polygonStart: function() {
            u.lineEnd = o
          },
          polygonEnd: function() {
            u.lineEnd = i, u.point = n
          },
          pointRadius: function(t) {
            return a = t, u
          },
          result: A
        };
      return u
    }

    function ne(t) {
      function n(t) {
        return (u ? r : e)(t)
      }

      function e(n) {
        return ie(n, function(e, r) {
          e = t(e, r), n.point(e[0], e[1])
        })
      }

      function r(n) {
        function e(e, r) {
          e = t(e, r), n.point(e[0], e[1])
        }

        function r() {
          b = 0 / 0, M.point = o, n.lineStart()
        }

        function o(e, r) {
          var o = gn([e, r]),
            a = t(e, r);
          i(b, w, y, A, x, _, b = a[0], w = a[1], y = e, A = o[0], x = o[1], _ = o[2], u, n), n.point(b, w)
        }

        function a() {
          M.point = e, n.lineEnd()
        }

        function s() {
          r(), M.point = c, M.lineEnd = l
        }

        function c(t, n) {
          o(f = t, h = n), p = b, d = w, g = A, v = x, m = _, M.point = o
        }

        function l() {
          i(b, w, y, A, x, _, p, d, f, g, v, m, u, n), M.lineEnd = a, a()
        }
        var f, h, p, d, g, v, m, y, b, w, A, x, _, M = {
          point: e,
          lineStart: r,
          lineEnd: a,
          polygonStart: function() {
            n.polygonStart(), M.lineStart = s
          },
          polygonEnd: function() {
            n.polygonEnd(), M.lineStart = r
          }
        };
        return M
      }

      function i(n, e, r, u, s, c, l, f, h, p, d, g, v, m) {
        var y = l - n,
          b = f - e,
          w = y * y + b * b;
        if (w > 4 * o && v--) {
          var A = u + p,
            x = s + d,
            _ = c + g,
            M = Math.sqrt(A * A + x * x + _ * _),
            k = Math.asin(_ /= M),
            S = da(da(_) - 1) < Pa || da(r - h) < Pa ? (r + h) / 2 : Math.atan2(x, A),
            E = t(S, k),
            C = E[0],
            T = E[1],
            P = C - n,
            N = T - e,
            D = b * P - y * N;
          (D * D / w > o || da((y * P + b * N) / w - .5) > .3 || a > u * p + s * d + c * g) && (i(n, e, r, u, s, c, C, T, S, A /= M, x /= M, _, v, m), m.point(C, T), i(C, T, S, A, x, _, l, f, h, p, d, g, v, m))
        }
      }
      var o = .5,
        a = Math.cos(30 * Oa),
        u = 16;
      return n.precision = function(t) {
        return arguments.length ? (u = (o = t * t) > 0 && 16, n) : Math.sqrt(o)
      }, n
    }

    function ee(t) {
      var n = ne(function(n, e) {
        return t([n * Ia, e * Ia])
      });
      return function(t) {
        return ue(n(t))
      }
    }

    function re(t) {
      this.stream = t
    }

    function ie(t, n) {
      return {
        point: n,
        sphere: function() {
          t.sphere()
        },
        lineStart: function() {
          t.lineStart()
        },
        lineEnd: function() {
          t.lineEnd()
        },
        polygonStart: function() {
          t.polygonStart()
        },
        polygonEnd: function() {
          t.polygonEnd()
        }
      }
    }

    function oe(t) {
      return ae(function() {
        return t
      })()
    }

    function ae(t) {
      function n(t) {
        return t = u(t[0] * Oa, t[1] * Oa), [t[0] * h + s, c - t[1] * h]
      }

      function e(t) {
        return t = u.invert((t[0] - s) / h, (c - t[1]) / h), t && [t[0] * Ia, t[1] * Ia]
      }

      function r() {
        u = Cn(a = le(m, b, w), o);
        var t = o(g, v);
        return s = p - t[0] * h, c = d + t[1] * h, i()
      }

      function i() {
        return l && (l.valid = !1, l = null), n
      }
      var o, a, u, s, c, l, f = ne(function(t, n) {
          return t = o(t, n), [t[0] * h + s, c - t[1] * h]
        }),
        h = 150,
        p = 480,
        d = 250,
        g = 0,
        v = 0,
        m = 0,
        b = 0,
        w = 0,
        A = ju,
        x = y,
        _ = null,
        M = null;
      return n.stream = function(t) {
          return l && (l.valid = !1), l = ue(A(a, f(x(t)))), l.valid = !0, l
        }, n.clipAngle = function(t) {
          return arguments.length ? (A = null == t ? (_ = t, ju) : Fn((_ = +t) * Oa), i()) : _
        }, n.clipExtent = function(t) {
          return arguments.length ? (M = t, x = t ? Bn(t[0][0], t[0][1], t[1][0], t[1][1]) : y, i()) : M
        }, n.scale = function(t) {
          return arguments.length ? (h = +t, r()) : h
        }, n.translate = function(t) {
          return arguments.length ? (p = +t[0], d = +t[1], r()) : [p, d]
        }, n.center = function(t) {
          return arguments.length ? (g = t[0] % 360 * Oa, v = t[1] % 360 * Oa, r()) : [g * Ia, v * Ia]
        }, n.rotate = function(t) {
          return arguments.length ? (m = t[0] % 360 * Oa, b = t[1] % 360 * Oa, w = t.length > 2 ? t[2] % 360 * Oa : 0, r()) : [m * Ia, b * Ia, w * Ia]
        }, ea.rebind(n, f, "precision"),
        function() {
          return o = t.apply(this, arguments), n.invert = o.invert && e, r()
        }
    }

    function ue(t) {
      return ie(t, function(n, e) {
        t.point(n * Oa, e * Oa)
      })
    }

    function se(t, n) {
      return [t, n]
    }

    function ce(t, n) {
      return [t > Da ? t - ja : -Da > t ? t + ja : t, n]
    }

    function le(t, n, e) {
      return t ? n || e ? Cn(he(t), pe(n, e)) : he(t) : n || e ? pe(n, e) : ce
    }

    function fe(t) {
      return function(n, e) {
        return n += t, [n > Da ? n - ja : -Da > n ? n + ja : n, e]
      }
    }

    function he(t) {
      var n = fe(t);
      return n.invert = fe(-t), n
    }

    function pe(t, n) {
      function e(t, n) {
        var e = Math.cos(n),
          u = Math.cos(t) * e,
          s = Math.sin(t) * e,
          c = Math.sin(n),
          l = c * r + u * i;
        return [Math.atan2(s * o - l * a, u * r - c * i), nt(l * o + s * a)]
      }
      var r = Math.cos(t),
        i = Math.sin(t),
        o = Math.cos(n),
        a = Math.sin(n);
      return e.invert = function(t, n) {
        var e = Math.cos(n),
          u = Math.cos(t) * e,
          s = Math.sin(t) * e,
          c = Math.sin(n),
          l = c * o - s * a;
        return [Math.atan2(s * o + c * a, u * r + l * i), nt(l * r - u * i)]
      }, e
    }

    function de(t, n) {
      var e = Math.cos(t),
        r = Math.sin(t);
      return function(i, o, a, u) {
        var s = a * n;
        null != i ? (i = ge(e, i), o = ge(e, o), (a > 0 ? o > i : i > o) && (i += a * ja)) : (i = t + a * ja, o = t - .5 * s);
        for (var c, l = i; a > 0 ? l > o : o > l; l -= s) u.point((c = An([e, -r * Math.cos(l), -r * Math.sin(l)]))[0], c[1])
      }
    }

    function ge(t, n) {
      var e = gn(n);
      e[0] -= t, wn(e);
      var r = tt(-e[1]);
      return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - Pa) % (2 * Math.PI)
    }

    function ve(t, n, e) {
      var r = ea.range(t, n - Pa, e).concat(n);
      return function(t) {
        return r.map(function(n) {
          return [t, n]
        })
      }
    }

    function me(t, n, e) {
      var r = ea.range(t, n - Pa, e).concat(n);
      return function(t) {
        return r.map(function(n) {
          return [n, t]
        })
      }
    }

    function ye(t) {
      return t.source
    }

    function be(t) {
      return t.target
    }

    function we(t, n, e, r) {
      var i = Math.cos(n),
        o = Math.sin(n),
        a = Math.cos(r),
        u = Math.sin(r),
        s = i * Math.cos(t),
        c = i * Math.sin(t),
        l = a * Math.cos(e),
        f = a * Math.sin(e),
        h = 2 * Math.asin(Math.sqrt(ot(r - n) + i * a * ot(e - t))),
        p = 1 / Math.sin(h),
        d = h ? function(t) {
          var n = Math.sin(t *= h) * p,
            e = Math.sin(h - t) * p,
            r = e * s + n * l,
            i = e * c + n * f,
            a = e * o + n * u;
          return [Math.atan2(i, r) * Ia, Math.atan2(a, Math.sqrt(r * r + i * i)) * Ia]
        } : function() {
          return [t * Ia, n * Ia]
        };
      return d.distance = h, d
    }

    function Ae() {
      function t(t, i) {
        var o = Math.sin(i *= Oa),
          a = Math.cos(i),
          u = da((t *= Oa) - n),
          s = Math.cos(u);
        Wu += Math.atan2(Math.sqrt((u = a * Math.sin(u)) * u + (u = r * o - e * a * s) * u), e * o + r * a * s), n = t, e = o, r = a
      }
      var n, e, r;
      $u.point = function(i, o) {
        n = i * Oa, e = Math.sin(o *= Oa), r = Math.cos(o), $u.point = t
      }, $u.lineEnd = function() {
        $u.point = $u.lineEnd = A
      }
    }

    function xe(t, n) {
      function e(n, e) {
        var r = Math.cos(n),
          i = Math.cos(e),
          o = t(r * i);
        return [o * i * Math.sin(n), o * Math.sin(e)]
      }
      return e.invert = function(t, e) {
        var r = Math.sqrt(t * t + e * e),
          i = n(r),
          o = Math.sin(i),
          a = Math.cos(i);
        return [Math.atan2(t * o, r * a), Math.asin(r && e * o / r)]
      }, e
    }

    function _e(t, n) {
      function e(t, n) {
        a > 0 ? -Ra + Pa > n && (n = -Ra + Pa) : n > Ra - Pa && (n = Ra - Pa);
        var e = a / Math.pow(i(n), o);
        return [e * Math.sin(o * t), a - e * Math.cos(o * t)]
      }
      var r = Math.cos(t),
        i = function(t) {
          return Math.tan(Da / 4 + t / 2)
        },
        o = t === n ? Math.sin(t) : Math.log(r / Math.cos(n)) / Math.log(i(n) / i(t)),
        a = r * Math.pow(i(t), o) / o;
      return o ? (e.invert = function(t, n) {
        var e = a - n,
          r = Z(o) * Math.sqrt(t * t + e * e);
        return [Math.atan2(t, e) / o, 2 * Math.atan(Math.pow(a / r, 1 / o)) - Ra]
      }, e) : ke
    }

    function Me(t, n) {
      function e(t, n) {
        var e = o - n;
        return [e * Math.sin(i * t), o - e * Math.cos(i * t)]
      }
      var r = Math.cos(t),
        i = t === n ? Math.sin(t) : (r - Math.cos(n)) / (n - t),
        o = r / i + t;
      return da(i) < Pa ? se : (e.invert = function(t, n) {
        var e = o - n;
        return [Math.atan2(t, e) / i, o - Z(i) * Math.sqrt(t * t + e * e)]
      }, e)
    }

    function ke(t, n) {
      return [t, Math.log(Math.tan(Da / 4 + n / 2))]
    }

    function Se(t) {
      var n, e = oe(t),
        r = e.scale,
        i = e.translate,
        o = e.clipExtent;
      return e.scale = function() {
        var t = r.apply(e, arguments);
        return t === e ? n ? e.clipExtent(null) : e : t
      }, e.translate = function() {
        var t = i.apply(e, arguments);
        return t === e ? n ? e.clipExtent(null) : e : t
      }, e.clipExtent = function(t) {
        var a = o.apply(e, arguments);
        if (a === e) {
          if (n = null == t) {
            var u = Da * r(),
              s = i();
            o([
              [s[0] - u, s[1] - u],
              [s[0] + u, s[1] + u]
            ])
          }
        } else n && (a = null);
        return a
      }, e.clipExtent(null)
    }

    function Ee(t, n) {
      return [Math.log(Math.tan(Da / 4 + n / 2)), -t]
    }

    function Ce(t) {
      return t[0]
    }

    function Te(t) {
      return t[1]
    }

    function Pe(t) {
      for (var n = t.length, e = [0, 1], r = 2, i = 2; n > i; i++) {
        for (; r > 1 && K(t[e[r - 2]], t[e[r - 1]], t[i]) <= 0;) --r;
        e[r++] = i
      }
      return e.slice(0, r)
    }

    function Ne(t, n) {
      return t[0] - n[0] || t[1] - n[1]
    }

    function De(t, n, e) {
      return (e[0] - n[0]) * (t[1] - n[1]) < (e[1] - n[1]) * (t[0] - n[0])
    }

    function je(t, n, e, r) {
      var i = t[0],
        o = e[0],
        a = n[0] - i,
        u = r[0] - o,
        s = t[1],
        c = e[1],
        l = n[1] - s,
        f = r[1] - c,
        h = (u * (s - c) - f * (i - o)) / (f * a - u * l);
      return [i + h * a, s + h * l]
    }

    function Le(t) {
      var n = t[0],
        e = t[t.length - 1];
      return !(n[0] - e[0] || n[1] - e[1])
    }

    function Re() {
      er(this), this.edge = this.site = this.circle = null
    }

    function Oe(t) {
      var n = rs.pop() || new Re;
      return n.site = t, n
    }

    function Ie(t) {
      Ve(t), ts.remove(t), rs.push(t), er(t)
    }

    function qe(t) {
      var n = t.circle,
        e = n.x,
        r = n.cy,
        i = {
          x: e,
          y: r
        },
        o = t.P,
        a = t.N,
        u = [t];
      Ie(t);
      for (var s = o; s.circle && da(e - s.circle.x) < Pa && da(r - s.circle.cy) < Pa;) o = s.P, u.unshift(s), Ie(s), s = o;
      u.unshift(s), Ve(s);
      for (var c = a; c.circle && da(e - c.circle.x) < Pa && da(r - c.circle.cy) < Pa;) a = c.N, u.push(c), Ie(c), c = a;
      u.push(c), Ve(c);
      var l, f = u.length;
      for (l = 1; f > l; ++l) c = u[l], s = u[l - 1], Ke(c.edge, s.site, c.site, i);
      s = u[0], c = u[f - 1], c.edge = Je(s.site, c.site, null, i), Xe(s), Xe(c)
    }

    function Ue(t) {
      for (var n, e, r, i, o = t.x, a = t.y, u = ts._; u;)
        if (r = ze(u, a) - o, r > Pa) u = u.L;
        else {
          if (i = o - Fe(u, a), !(i > Pa)) {
            r > -Pa ? (n = u.P, e = u) : i > -Pa ? (n = u, e = u.N) : n = e = u;
            break
          }
          if (!u.R) {
            n = u;
            break
          }
          u = u.R
        }
      var s = Oe(t);
      if (ts.insert(n, s), n || e) {
        if (n === e) return Ve(n), e = Oe(n.site), ts.insert(s, e), s.edge = e.edge = Je(n.site, s.site), Xe(n), void Xe(e);
        if (!e) return void(s.edge = Je(n.site, s.site));
        Ve(n), Ve(e);
        var c = n.site,
          l = c.x,
          f = c.y,
          h = t.x - l,
          p = t.y - f,
          d = e.site,
          g = d.x - l,
          v = d.y - f,
          m = 2 * (h * v - p * g),
          y = h * h + p * p,
          b = g * g + v * v,
          w = {
            x: (v * y - p * b) / m + l,
            y: (h * b - g * y) / m + f
          };
        Ke(e.edge, c, d, w), s.edge = Je(c, t, null, w), e.edge = Je(t, d, null, w), Xe(n), Xe(e)
      }
    }

    function ze(t, n) {
      var e = t.site,
        r = e.x,
        i = e.y,
        o = i - n;
      if (!o) return r;
      var a = t.P;
      if (!a) return -(1 / 0);
      e = a.site;
      var u = e.x,
        s = e.y,
        c = s - n;
      if (!c) return u;
      var l = u - r,
        f = 1 / o - 1 / c,
        h = l / c;
      return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * c) - s + c / 2 + i - o / 2))) / f + r : (r + u) / 2
    }

    function Fe(t, n) {
      var e = t.N;
      if (e) return ze(e, n);
      var r = t.site;
      return r.y === n ? r.x : 1 / 0
    }

    function He(t) {
      this.site = t, this.edges = []
    }

    function Be(t) {
      for (var n, e, r, i, o, a, u, s, c, l, f = t[0][0], h = t[1][0], p = t[0][1], d = t[1][1], g = Ku, v = g.length; v--;)
        if (o = g[v], o && o.prepare())
          for (u = o.edges, s = u.length, a = 0; s > a;) l = u[a].end(), r = l.x, i = l.y, c = u[++a % s].start(), n = c.x, e = c.y, (da(r - n) > Pa || da(i - e) > Pa) && (u.splice(a, 0, new tr(Ze(o.site, l, da(r - f) < Pa && d - i > Pa ? {
            x: f,
            y: da(n - f) < Pa ? e : d
          } : da(i - d) < Pa && h - r > Pa ? {
            x: da(e - d) < Pa ? n : h,
            y: d
          } : da(r - h) < Pa && i - p > Pa ? {
            x: h,
            y: da(n - h) < Pa ? e : p
          } : da(i - p) < Pa && r - f > Pa ? {
            x: da(e - p) < Pa ? n : f,
            y: p
          } : null), o.site, null)), ++s)
    }

    function We(t, n) {
      return n.angle - t.angle
    }

    function $e() {
      er(this), this.x = this.y = this.arc = this.site = this.cy = null
    }

    function Xe(t) {
      var n = t.P,
        e = t.N;
      if (n && e) {
        var r = n.site,
          i = t.site,
          o = e.site;
        if (r !== o) {
          var a = i.x,
            u = i.y,
            s = r.x - a,
            c = r.y - u,
            l = o.x - a,
            f = o.y - u,
            h = 2 * (s * f - c * l);
          if (!(h >= -Na)) {
            var p = s * s + c * c,
              d = l * l + f * f,
              g = (f * p - c * d) / h,
              v = (s * d - l * p) / h,
              f = v + u,
              m = is.pop() || new $e;
            m.arc = t, m.site = i, m.x = g + a, m.y = f + Math.sqrt(g * g + v * v), m.cy = f, t.circle = m;
            for (var y = null, b = es._; b;)
              if (m.y < b.y || m.y === b.y && m.x <= b.x) {
                if (!b.L) {
                  y = b.P;
                  break
                }
                b = b.L
              } else {
                if (!b.R) {
                  y = b;
                  break
                }
                b = b.R
              }
            es.insert(y, m), y || (ns = m)
          }
        }
      }
    }

    function Ve(t) {
      var n = t.circle;
      n && (n.P || (ns = n.N), es.remove(n), is.push(n), er(n), t.circle = null)
    }

    function Ye(t) {
      for (var n, e = Zu, r = Hn(t[0][0], t[0][1], t[1][0], t[1][1]), i = e.length; i--;) n = e[i], (!Ge(n, t) || !r(n) || da(n.a.x - n.b.x) < Pa && da(n.a.y - n.b.y) < Pa) && (n.a = n.b = null, e.splice(i, 1))
    }

    function Ge(t, n) {
      var e = t.b;
      if (e) return !0;
      var r, i, o = t.a,
        a = n[0][0],
        u = n[1][0],
        s = n[0][1],
        c = n[1][1],
        l = t.l,
        f = t.r,
        h = l.x,
        p = l.y,
        d = f.x,
        g = f.y,
        v = (h + d) / 2,
        m = (p + g) / 2;
      if (g === p) {
        if (a > v || v >= u) return;
        if (h > d) {
          if (o) {
            if (o.y >= c) return
          } else o = {
            x: v,
            y: s
          };
          e = {
            x: v,
            y: c
          }
        } else {
          if (o) {
            if (o.y < s) return
          } else o = {
            x: v,
            y: c
          };
          e = {
            x: v,
            y: s
          }
        }
      } else if (r = (h - d) / (g - p), i = m - r * v, -1 > r || r > 1)
        if (h > d) {
          if (o) {
            if (o.y >= c) return
          } else o = {
            x: (s - i) / r,
            y: s
          };
          e = {
            x: (c - i) / r,
            y: c
          }
        } else {
          if (o) {
            if (o.y < s) return
          } else o = {
            x: (c - i) / r,
            y: c
          };
          e = {
            x: (s - i) / r,
            y: s
          }
        } else if (g > p) {
        if (o) {
          if (o.x >= u) return
        } else o = {
          x: a,
          y: r * a + i
        };
        e = {
          x: u,
          y: r * u + i
        }
      } else {
        if (o) {
          if (o.x < a) return
        } else o = {
          x: u,
          y: r * u + i
        };
        e = {
          x: a,
          y: r * a + i
        }
      }
      return t.a = o, t.b = e, !0
    }

    function Qe(t, n) {
      this.l = t, this.r = n, this.a = this.b = null
    }

    function Je(t, n, e, r) {
      var i = new Qe(t, n);
      return Zu.push(i), e && Ke(i, t, n, e), r && Ke(i, n, t, r), Ku[t.i].edges.push(new tr(i, t, n)), Ku[n.i].edges.push(new tr(i, n, t)), i
    }

    function Ze(t, n, e) {
      var r = new Qe(t, null);
      return r.a = n, r.b = e, Zu.push(r), r
    }

    function Ke(t, n, e, r) {
      t.a || t.b ? t.l === e ? t.b = r : t.a = r : (t.a = r, t.l = n, t.r = e)
    }

    function tr(t, n, e) {
      var r = t.a,
        i = t.b;
      this.edge = t, this.site = n, this.angle = e ? Math.atan2(e.y - n.y, e.x - n.x) : t.l === n ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
    }

    function nr() {
      this._ = null
    }

    function er(t) {
      t.U = t.C = t.L = t.R = t.P = t.N = null
    }

    function rr(t, n) {
      var e = n,
        r = n.R,
        i = e.U;
      i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e
    }

    function ir(t, n) {
      var e = n,
        r = n.L,
        i = e.U;
      i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e
    }

    function or(t) {
      for (; t.L;) t = t.L;
      return t
    }

    function ar(t, n) {
      var e, r, i, o = t.sort(ur).pop();
      for (Zu = [], Ku = new Array(t.length), ts = new nr, es = new nr;;)
        if (i = ns, o && (!i || o.y < i.y || o.y === i.y && o.x < i.x))(o.x !== e || o.y !== r) && (Ku[o.i] = new He(o), Ue(o), e = o.x, r = o.y), o = t.pop();
        else {
          if (!i) break;
          qe(i.arc)
        }
      n && (Ye(n), Be(n));
      var a = {
        cells: Ku,
        edges: Zu
      };
      return ts = es = Zu = Ku = null, a
    }

    function ur(t, n) {
      return n.y - t.y || n.x - t.x
    }

    function sr(t, n, e) {
      return (t.x - e.x) * (n.y - t.y) - (t.x - n.x) * (e.y - t.y)
    }

    function cr(t) {
      return t.x
    }

    function lr(t) {
      return t.y
    }

    function fr() {
      return {
        leaf: !0,
        nodes: [],
        point: null,
        x: null,
        y: null
      }
    }

    function hr(t, n, e, r, i, o) {
      if (!t(n, e, r, i, o)) {
        var a = .5 * (e + i),
          u = .5 * (r + o),
          s = n.nodes;
        s[0] && hr(t, s[0], e, r, a, u), s[1] && hr(t, s[1], a, r, i, u), s[2] && hr(t, s[2], e, u, a, o), s[3] && hr(t, s[3], a, u, i, o)
      }
    }

    function pr(t, n, e, r, i, o, a) {
      var u, s = 1 / 0;
      return function c(t, l, f, h, p) {
        if (!(l > o || f > a || r > h || i > p)) {
          if (d = t.point) {
            var d, g = n - t.x,
              v = e - t.y,
              m = g * g + v * v;
            if (s > m) {
              var y = Math.sqrt(s = m);
              r = n - y, i = e - y, o = n + y, a = e + y, u = d
            }
          }
          for (var b = t.nodes, w = .5 * (l + h), A = .5 * (f + p), x = n >= w, _ = e >= A, M = _ << 1 | x, k = M + 4; k > M; ++M)
            if (t = b[3 & M]) switch (3 & M) {
              case 0:
                c(t, l, f, w, A);
                break;
              case 1:
                c(t, w, f, h, A);
                break;
              case 2:
                c(t, l, A, w, p);
                break;
              case 3:
                c(t, w, A, h, p)
            }
        }
      }(t, r, i, o, a), u
    }

    function dr(t, n) {
      t = ea.rgb(t), n = ea.rgb(n);
      var e = t.r,
        r = t.g,
        i = t.b,
        o = n.r - e,
        a = n.g - r,
        u = n.b - i;
      return function(t) {
        return "#" + wt(Math.round(e + o * t)) + wt(Math.round(r + a * t)) + wt(Math.round(i + u * t))
      }
    }

    function gr(t, n) {
      var e, r = {},
        i = {};
      for (e in t) e in n ? r[e] = yr(t[e], n[e]) : i[e] = t[e];
      for (e in n) e in t || (i[e] = n[e]);
      return function(t) {
        for (e in r) i[e] = r[e](t);
        return i
      }
    }

    function vr(t, n) {
      return t = +t, n = +n,
        function(e) {
          return t * (1 - e) + n * e
        }
    }

    function mr(t, n) {
      var e, r, i, o = as.lastIndex = us.lastIndex = 0,
        a = -1,
        u = [],
        s = [];
      for (t += "", n += "";
        (e = as.exec(t)) && (r = us.exec(n));)(i = r.index) > o && (i = n.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, s.push({
        i: a,
        x: vr(e, r)
      })), o = us.lastIndex;
      return o < n.length && (i = n.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? s[0] ? (n = s[0].x, function(t) {
        return n(t) + ""
      }) : function() {
        return n
      } : (n = s.length, function(t) {
        for (var e, r = 0; n > r; ++r) u[(e = s[r]).i] = e.x(t);
        return u.join("")
      })
    }

    function yr(t, n) {
      for (var e, r = ea.interpolators.length; --r >= 0 && !(e = ea.interpolators[r](t, n)););
      return e
    }

    function br(t, n) {
      var e, r = [],
        i = [],
        o = t.length,
        a = n.length,
        u = Math.min(t.length, n.length);
      for (e = 0; u > e; ++e) r.push(yr(t[e], n[e]));
      for (; o > e; ++e) i[e] = t[e];
      for (; a > e; ++e) i[e] = n[e];
      return function(t) {
        for (e = 0; u > e; ++e) i[e] = r[e](t);
        return i
      }
    }

    function wr(t) {
      return function(n) {
        return 0 >= n ? 0 : n >= 1 ? 1 : t(n)
      }
    }

    function Ar(t) {
      return function(n) {
        return 1 - t(1 - n)
      }
    }

    function xr(t) {
      return function(n) {
        return .5 * (.5 > n ? t(2 * n) : 2 - t(2 - 2 * n))
      }
    }

    function _r(t) {
      return t * t
    }

    function Mr(t) {
      return t * t * t
    }

    function kr(t) {
      if (0 >= t) return 0;
      if (t >= 1) return 1;
      var n = t * t,
        e = n * t;
      return 4 * (.5 > t ? e : 3 * (t - n) + e - .75)
    }

    function Sr(t) {
      return function(n) {
        return Math.pow(n, t)
      }
    }

    function Er(t) {
      return 1 - Math.cos(t * Ra)
    }

    function Cr(t) {
      return Math.pow(2, 10 * (t - 1))
    }

    function Tr(t) {
      return 1 - Math.sqrt(1 - t * t)
    }

    function Pr(t, n) {
      var e;
      return arguments.length < 2 && (n = .45), arguments.length ? e = n / ja * Math.asin(1 / t) : (t = 1, e = n / 4),
        function(r) {
          return 1 + t * Math.pow(2, -10 * r) * Math.sin((r - e) * ja / n)
        }
    }

    function Nr(t) {
      return t || (t = 1.70158),
        function(n) {
          return n * n * ((t + 1) * n - t)
        }
    }

    function Dr(t) {
      return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }

    function jr(t, n) {
      t = ea.hcl(t), n = ea.hcl(n);
      var e = t.h,
        r = t.c,
        i = t.l,
        o = n.h - e,
        a = n.c - r,
        u = n.l - i;
      return isNaN(a) && (a = 0, r = isNaN(r) ? n.c : r), isNaN(o) ? (o = 0, e = isNaN(e) ? n.h : e) : o > 180 ? o -= 360 : -180 > o && (o += 360),
        function(t) {
          return lt(e + o * t, r + a * t, i + u * t) + ""
        }
    }

    function Lr(t, n) {
      t = ea.hsl(t), n = ea.hsl(n);
      var e = t.h,
        r = t.s,
        i = t.l,
        o = n.h - e,
        a = n.s - r,
        u = n.l - i;
      return isNaN(a) && (a = 0, r = isNaN(r) ? n.s : r), isNaN(o) ? (o = 0, e = isNaN(e) ? n.h : e) : o > 180 ? o -= 360 : -180 > o && (o += 360),
        function(t) {
          return st(e + o * t, r + a * t, i + u * t) + ""
        }
    }

    function Rr(t, n) {
      t = ea.lab(t), n = ea.lab(n);
      var e = t.l,
        r = t.a,
        i = t.b,
        o = n.l - e,
        a = n.a - r,
        u = n.b - i;
      return function(t) {
        return ht(e + o * t, r + a * t, i + u * t) + ""
      }
    }

    function Or(t, n) {
      return n -= t,
        function(e) {
          return Math.round(t + n * e)
        }
    }

    function Ir(t) {
      var n = [t.a, t.b],
        e = [t.c, t.d],
        r = Ur(n),
        i = qr(n, e),
        o = Ur(zr(e, n, -i)) || 0;
      n[0] * e[1] < e[0] * n[1] && (n[0] *= -1, n[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(n[1], n[0]) : Math.atan2(-e[0], e[1])) * Ia, this.translate = [t.e, t.f], this.scale = [r, o], this.skew = o ? Math.atan2(i, o) * Ia : 0
    }

    function qr(t, n) {
      return t[0] * n[0] + t[1] * n[1]
    }

    function Ur(t) {
      var n = Math.sqrt(qr(t, t));
      return n && (t[0] /= n, t[1] /= n), n
    }

    function zr(t, n, e) {
      return t[0] += e * n[0], t[1] += e * n[1], t
    }

    function Fr(t, n) {
      var e, r = [],
        i = [],
        o = ea.transform(t),
        a = ea.transform(n),
        u = o.translate,
        s = a.translate,
        c = o.rotate,
        l = a.rotate,
        f = o.skew,
        h = a.skew,
        p = o.scale,
        d = a.scale;
      return u[0] != s[0] || u[1] != s[1] ? (r.push("translate(", null, ",", null, ")"), i.push({
          i: 1,
          x: vr(u[0], s[0])
        }, {
          i: 3,
          x: vr(u[1], s[1])
        })) : r.push(s[0] || s[1] ? "translate(" + s + ")" : ""), c != l ? (c - l > 180 ? l += 360 : l - c > 180 && (c += 360), i.push({
          i: r.push(r.pop() + "rotate(", null, ")") - 2,
          x: vr(c, l)
        })) : l && r.push(r.pop() + "rotate(" + l + ")"), f != h ? i.push({
          i: r.push(r.pop() + "skewX(", null, ")") - 2,
          x: vr(f, h)
        }) : h && r.push(r.pop() + "skewX(" + h + ")"), p[0] != d[0] || p[1] != d[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), i.push({
          i: e - 4,
          x: vr(p[0], d[0])
        }, {
          i: e - 2,
          x: vr(p[1], d[1])
        })) : (1 != d[0] || 1 != d[1]) && r.push(r.pop() + "scale(" + d + ")"), e = i.length,
        function(t) {
          for (var n, o = -1; ++o < e;) r[(n = i[o]).i] = n.x(t);
          return r.join("")
        }
    }

    function Hr(t, n) {
      return n = (n -= t = +t) || 1 / n,
        function(e) {
          return (e - t) / n
        }
    }

    function Br(t, n) {
      return n = (n -= t = +t) || 1 / n,
        function(e) {
          return Math.max(0, Math.min(1, (e - t) / n))
        }
    }

    function Wr(t) {
      for (var n = t.source, e = t.target, r = Xr(n, e), i = [n]; n !== r;) n = n.parent, i.push(n);
      for (var o = i.length; e !== r;) i.splice(o, 0, e), e = e.parent;
      return i
    }

    function $r(t) {
      for (var n = [], e = t.parent; null != e;) n.push(t), t = e, e = e.parent;
      return n.push(t), n
    }

    function Xr(t, n) {
      if (t === n) return t;
      for (var e = $r(t), r = $r(n), i = e.pop(), o = r.pop(), a = null; i === o;) a = i, i = e.pop(), o = r.pop();
      return a
    }

    function Vr(t) {
      t.fixed |= 2
    }

    function Yr(t) {
      t.fixed &= -7
    }

    function Gr(t) {
      t.fixed |= 4, t.px = t.x, t.py = t.y
    }

    function Qr(t) {
      t.fixed &= -5
    }

    function Jr(t, n, e) {
      var r = 0,
        i = 0;
      if (t.charge = 0, !t.leaf)
        for (var o, a = t.nodes, u = a.length, s = -1; ++s < u;) o = a[s], null != o && (Jr(o, n, e), t.charge += o.charge, r += o.charge * o.cx, i += o.charge * o.cy);
      if (t.point) {
        t.leaf || (t.point.x += Math.random() - .5, t.point.y += Math.random() - .5);
        var c = n * e[t.point.index];
        t.charge += t.pointCharge = c, r += c * t.point.x, i += c * t.point.y
      }
      t.cx = r / t.charge, t.cy = i / t.charge
    }

    function Zr(t, n) {
      return ea.rebind(t, n, "sort", "children", "value"), t.nodes = t, t.links = ii, t
    }

    function Kr(t, n) {
      for (var e = [t]; null != (t = e.pop());)
        if (n(t), (i = t.children) && (r = i.length))
          for (var r, i; --r >= 0;) e.push(i[r])
    }

    function ti(t, n) {
      for (var e = [t], r = []; null != (t = e.pop());)
        if (r.push(t), (o = t.children) && (i = o.length))
          for (var i, o, a = -1; ++a < i;) e.push(o[a]);
      for (; null != (t = r.pop());) n(t)
    }

    function ni(t) {
      return t.children
    }

    function ei(t) {
      return t.value
    }

    function ri(t, n) {
      return n.value - t.value
    }

    function ii(t) {
      return ea.merge(t.map(function(t) {
        return (t.children || []).map(function(n) {
          return {
            source: t,
            target: n
          }
        })
      }))
    }

    function oi(t) {
      return t.x
    }

    function ai(t) {
      return t.y
    }

    function ui(t, n, e) {
      t.y0 = n, t.y = e
    }

    function si(t) {
      return ea.range(t.length)
    }

    function ci(t) {
      for (var n = -1, e = t[0].length, r = []; ++n < e;) r[n] = 0;
      return r
    }

    function li(t) {
      for (var n, e = 1, r = 0, i = t[0][1], o = t.length; o > e; ++e)(n = t[e][1]) > i && (r = e, i = n);
      return r
    }

    function fi(t) {
      return t.reduce(hi, 0)
    }

    function hi(t, n) {
      return t + n[1]
    }

    function pi(t, n) {
      return di(t, Math.ceil(Math.log(n.length) / Math.LN2 + 1))
    }

    function di(t, n) {
      for (var e = -1, r = +t[0], i = (t[1] - r) / n, o = []; ++e <= n;) o[e] = i * e + r;
      return o
    }

    function gi(t) {
      return [ea.min(t), ea.max(t)]
    }

    function vi(t, n) {
      return t.value - n.value
    }

    function mi(t, n) {
      var e = t._pack_next;
      t._pack_next = n, n._pack_prev = t, n._pack_next = e, e._pack_prev = n
    }

    function yi(t, n) {
      t._pack_next = n, n._pack_prev = t
    }

    function bi(t, n) {
      var e = n.x - t.x,
        r = n.y - t.y,
        i = t.r + n.r;
      return .999 * i * i > e * e + r * r
    }

    function wi(t) {
      function n(t) {
        l = Math.min(t.x - t.r, l), f = Math.max(t.x + t.r, f), h = Math.min(t.y - t.r, h), p = Math.max(t.y + t.r, p)
      }
      if ((e = t.children) && (c = e.length)) {
        var e, r, i, o, a, u, s, c, l = 1 / 0,
          f = -(1 / 0),
          h = 1 / 0,
          p = -(1 / 0);
        if (e.forEach(Ai), r = e[0], r.x = -r.r, r.y = 0, n(r), c > 1 && (i = e[1], i.x = i.r, i.y = 0, n(i), c > 2))
          for (o = e[2], Mi(r, i, o), n(o), mi(r, o), r._pack_prev = o, mi(o, i), i = r._pack_next, a = 3; c > a; a++) {
            Mi(r, i, o = e[a]);
            var d = 0,
              g = 1,
              v = 1;
            for (u = i._pack_next; u !== i; u = u._pack_next, g++)
              if (bi(u, o)) {
                d = 1;
                break
              }
            if (1 == d)
              for (s = r._pack_prev; s !== u._pack_prev && !bi(s, o); s = s._pack_prev, v++);
            d ? (v > g || g == v && i.r < r.r ? yi(r, i = u) : yi(r = s, i), a--) : (mi(r, o), i = o, n(o))
          }
        var m = (l + f) / 2,
          y = (h + p) / 2,
          b = 0;
        for (a = 0; c > a; a++) o = e[a], o.x -= m, o.y -= y, b = Math.max(b, o.r + Math.sqrt(o.x * o.x + o.y * o.y));
        t.r = b, e.forEach(xi)
      }
    }

    function Ai(t) {
      t._pack_next = t._pack_prev = t
    }

    function xi(t) {
      delete t._pack_next, delete t._pack_prev
    }

    function _i(t, n, e, r) {
      var i = t.children;
      if (t.x = n += r * t.x, t.y = e += r * t.y, t.r *= r, i)
        for (var o = -1, a = i.length; ++o < a;) _i(i[o], n, e, r)
    }

    function Mi(t, n, e) {
      var r = t.r + e.r,
        i = n.x - t.x,
        o = n.y - t.y;
      if (r && (i || o)) {
        var a = n.r + e.r,
          u = i * i + o * o;
        a *= a, r *= r;
        var s = .5 + (r - a) / (2 * u),
          c = Math.sqrt(Math.max(0, 2 * a * (r + u) - (r -= u) * r - a * a)) / (2 * u);
        e.x = t.x + s * i + c * o, e.y = t.y + s * o - c * i
      } else e.x = t.x + r, e.y = t.y
    }

    function ki(t, n) {
      return t.parent == n.parent ? 1 : 2
    }

    function Si(t) {
      var n = t.children;
      return n.length ? n[0] : t.t
    }

    function Ei(t) {
      var n, e = t.children;
      return (n = e.length) ? e[n - 1] : t.t
    }

    function Ci(t, n, e) {
      var r = e / (n.i - t.i);
      n.c -= r, n.s += e, t.c += r, n.z += e, n.m += e
    }

    function Ti(t) {
      for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0;) n = i[o], n.z += e, n.m += e, e += n.s + (r += n.c)
    }

    function Pi(t, n, e) {
      return t.a.parent === n.parent ? t.a : e
    }

    function Ni(t) {
      return 1 + ea.max(t, function(t) {
        return t.y
      })
    }

    function Di(t) {
      return t.reduce(function(t, n) {
        return t + n.x
      }, 0) / t.length
    }

    function ji(t) {
      var n = t.children;
      return n && n.length ? ji(n[0]) : t
    }

    function Li(t) {
      var n, e = t.children;
      return e && (n = e.length) ? Li(e[n - 1]) : t
    }

    function Ri(t) {
      return {
        x: t.x,
        y: t.y,
        dx: t.dx,
        dy: t.dy
      }
    }

    function Oi(t, n) {
      var e = t.x + n[3],
        r = t.y + n[0],
        i = t.dx - n[1] - n[3],
        o = t.dy - n[0] - n[2];
      return 0 > i && (e += i / 2, i = 0), 0 > o && (r += o / 2, o = 0), {
        x: e,
        y: r,
        dx: i,
        dy: o
      }
    }

    function Ii(t) {
      var n = t[0],
        e = t[t.length - 1];
      return e > n ? [n, e] : [e, n]
    }

    function qi(t) {
      return t.rangeExtent ? t.rangeExtent() : Ii(t.range())
    }

    function Ui(t, n, e, r) {
      var i = e(t[0], t[1]),
        o = r(n[0], n[1]);
      return function(t) {
        return o(i(t))
      }
    }

    function zi(t, n) {
      var e, r = 0,
        i = t.length - 1,
        o = t[r],
        a = t[i];
      return o > a && (e = r, r = i, i = e, e = o, o = a, a = e), t[r] = n.floor(o), t[i] = n.ceil(a), t
    }

    function Fi(t) {
      return t ? {
        floor: function(n) {
          return Math.floor(n / t) * t
        },
        ceil: function(n) {
          return Math.ceil(n / t) * t
        }
      } : ys
    }

    function Hi(t, n, e, r) {
      var i = [],
        o = [],
        a = 0,
        u = Math.min(t.length, n.length) - 1;
      for (t[u] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++a <= u;) i.push(e(t[a - 1], t[a])), o.push(r(n[a - 1], n[a]));
      return function(n) {
        var e = ea.bisect(t, n, 1, u) - 1;
        return o[e](i[e](n))
      }
    }

    function Bi(t, n, e, r) {
      function i() {
        var i = Math.min(t.length, n.length) > 2 ? Hi : Ui,
          s = r ? Br : Hr;
        return a = i(t, n, s, e), u = i(n, t, s, yr), o
      }

      function o(t) {
        return a(t)
      }
      var a, u;
      return o.invert = function(t) {
        return u(t)
      }, o.domain = function(n) {
        return arguments.length ? (t = n.map(Number), i()) : t
      }, o.range = function(t) {
        return arguments.length ? (n = t, i()) : n
      }, o.rangeRound = function(t) {
        return o.range(t).interpolate(Or)
      }, o.clamp = function(t) {
        return arguments.length ? (r = t, i()) : r
      }, o.interpolate = function(t) {
        return arguments.length ? (e = t, i()) : e
      }, o.ticks = function(n) {
        return Vi(t, n)
      }, o.tickFormat = function(n, e) {
        return Yi(t, n, e)
      }, o.nice = function(n) {
        return $i(t, n), i()
      }, o.copy = function() {
        return Bi(t, n, e, r)
      }, i()
    }

    function Wi(t, n) {
      return ea.rebind(t, n, "range", "rangeRound", "interpolate", "clamp")
    }

    function $i(t, n) {
      return zi(t, Fi(Xi(t, n)[2]))
    }

    function Xi(t, n) {
      null == n && (n = 10);
      var e = Ii(t),
        r = e[1] - e[0],
        i = Math.pow(10, Math.floor(Math.log(r / n) / Math.LN10)),
        o = n / r * i;
      return .15 >= o ? i *= 10 : .35 >= o ? i *= 5 : .75 >= o && (i *= 2), e[0] = Math.ceil(e[0] / i) * i, e[1] = Math.floor(e[1] / i) * i + .5 * i, e[2] = i, e
    }

    function Vi(t, n) {
      return ea.range.apply(ea, Xi(t, n))
    }

    function Yi(t, n, e) {
      var r = Xi(t, n);
      if (e) {
        var i = au.exec(e);
        if (i.shift(), "s" === i[8]) {
          var o = ea.formatPrefix(Math.max(da(r[0]), da(r[1])));
          return i[7] || (i[7] = "." + Gi(o.scale(r[2]))), i[8] = "f", e = ea.format(i.join("")),
            function(t) {
              return e(o.scale(t)) + o.symbol
            }
        }
        i[7] || (i[7] = "." + Qi(i[8], r)), e = i.join("")
      } else e = ",." + Gi(r[2]) + "f";
      return ea.format(e)
    }

    function Gi(t) {
      return -Math.floor(Math.log(t) / Math.LN10 + .01)
    }

    function Qi(t, n) {
      var e = Gi(n[2]);
      return t in bs ? Math.abs(e - Gi(Math.max(da(n[0]), da(n[1])))) + +("e" !== t) : e - 2 * ("%" === t)
    }

    function Ji(t, n, e, r) {
      function i(t) {
        return (e ? Math.log(0 > t ? 0 : t) : -Math.log(t > 0 ? 0 : -t)) / Math.log(n)
      }

      function o(t) {
        return e ? Math.pow(n, t) : -Math.pow(n, -t)
      }

      function a(n) {
        return t(i(n))
      }
      return a.invert = function(n) {
        return o(t.invert(n))
      }, a.domain = function(n) {
        return arguments.length ? (e = n[0] >= 0, t.domain((r = n.map(Number)).map(i)), a) : r
      }, a.base = function(e) {
        return arguments.length ? (n = +e, t.domain(r.map(i)), a) : n
      }, a.nice = function() {
        var n = zi(r.map(i), e ? Math : As);
        return t.domain(n), r = n.map(o), a
      }, a.ticks = function() {
        var t = Ii(r),
          a = [],
          u = t[0],
          s = t[1],
          c = Math.floor(i(u)),
          l = Math.ceil(i(s)),
          f = n % 1 ? 2 : n;
        if (isFinite(l - c)) {
          if (e) {
            for (; l > c; c++)
              for (var h = 1; f > h; h++) a.push(o(c) * h);
            a.push(o(c))
          } else
            for (a.push(o(c)); c++ < l;)
              for (var h = f - 1; h > 0; h--) a.push(o(c) * h);
          for (c = 0; a[c] < u; c++);
          for (l = a.length; a[l - 1] > s; l--);
          a = a.slice(c, l)
        }
        return a
      }, a.tickFormat = function(t, n) {
        if (!arguments.length) return ws;
        arguments.length < 2 ? n = ws : "function" != typeof n && (n = ea.format(n));
        var r, u = Math.max(.1, t / a.ticks().length),
          s = e ? (r = 1e-12, Math.ceil) : (r = -1e-12, Math.floor);
        return function(t) {
          return t / o(s(i(t) + r)) <= u ? n(t) : ""
        }
      }, a.copy = function() {
        return Ji(t.copy(), n, e, r)
      }, Wi(a, t)
    }

    function Zi(t, n, e) {
      function r(n) {
        return t(i(n))
      }
      var i = Ki(n),
        o = Ki(1 / n);
      return r.invert = function(n) {
        return o(t.invert(n))
      }, r.domain = function(n) {
        return arguments.length ? (t.domain((e = n.map(Number)).map(i)), r) : e
      }, r.ticks = function(t) {
        return Vi(e, t)
      }, r.tickFormat = function(t, n) {
        return Yi(e, t, n)
      }, r.nice = function(t) {
        return r.domain($i(e, t))
      }, r.exponent = function(a) {
        return arguments.length ? (i = Ki(n = a), o = Ki(1 / n), t.domain(e.map(i)), r) : n
      }, r.copy = function() {
        return Zi(t.copy(), n, e)
      }, Wi(r, t)
    }

    function Ki(t) {
      return function(n) {
        return 0 > n ? -Math.pow(-n, t) : Math.pow(n, t)
      }
    }

    function to(t, n) {
      function e(e) {
        return o[((i.get(e) || ("range" === n.t ? i.set(e, t.push(e)) : 0 / 0)) - 1) % o.length]
      }

      function r(n, e) {
        return ea.range(t.length).map(function(t) {
          return n + e * t
        })
      }
      var i, o, a;
      return e.domain = function(r) {
        if (!arguments.length) return t;
        t = [], i = new c;
        for (var o, a = -1, u = r.length; ++a < u;) i.has(o = r[a]) || i.set(o, t.push(o));
        return e[n.t].apply(e, n.a)
      }, e.range = function(t) {
        return arguments.length ? (o = t, a = 0, n = {
          t: "range",
          a: arguments
        }, e) : o
      }, e.rangePoints = function(i, u) {
        arguments.length < 2 && (u = 0);
        var s = i[0],
          c = i[1],
          l = t.length < 2 ? (s = (s + c) / 2, 0) : (c - s) / (t.length - 1 + u);
        return o = r(s + l * u / 2, l), a = 0, n = {
          t: "rangePoints",
          a: arguments
        }, e
      }, e.rangeRoundPoints = function(i, u) {
        arguments.length < 2 && (u = 0);
        var s = i[0],
          c = i[1],
          l = t.length < 2 ? (s = c = Math.round((s + c) / 2), 0) : (c - s) / (t.length - 1 + u) | 0;
        return o = r(s + Math.round(l * u / 2 + (c - s - (t.length - 1 + u) * l) / 2), l), a = 0, n = {
          t: "rangeRoundPoints",
          a: arguments
        }, e
      }, e.rangeBands = function(i, u, s) {
        arguments.length < 2 && (u = 0), arguments.length < 3 && (s = u);
        var c = i[1] < i[0],
          l = i[c - 0],
          f = i[1 - c],
          h = (f - l) / (t.length - u + 2 * s);
        return o = r(l + h * s, h), c && o.reverse(), a = h * (1 - u), n = {
          t: "rangeBands",
          a: arguments
        }, e
      }, e.rangeRoundBands = function(i, u, s) {
        arguments.length < 2 && (u = 0), arguments.length < 3 && (s = u);
        var c = i[1] < i[0],
          l = i[c - 0],
          f = i[1 - c],
          h = Math.floor((f - l) / (t.length - u + 2 * s));
        return o = r(l + Math.round((f - l - (t.length - u) * h) / 2), h), c && o.reverse(), a = Math.round(h * (1 - u)), n = {
          t: "rangeRoundBands",
          a: arguments
        }, e
      }, e.rangeBand = function() {
        return a
      }, e.rangeExtent = function() {
        return Ii(n.a[0])
      }, e.copy = function() {
        return to(t, n)
      }, e.domain(t)
    }

    function no(t, n) {
      function o() {
        var e = 0,
          r = n.length;
        for (u = []; ++e < r;) u[e - 1] = ea.quantile(t, e / r);
        return a
      }

      function a(t) {
        return isNaN(t = +t) ? void 0 : n[ea.bisect(u, t)]
      }
      var u;
      return a.domain = function(n) {
        return arguments.length ? (t = n.map(r).filter(i).sort(e), o()) : t
      }, a.range = function(t) {
        return arguments.length ? (n = t, o()) : n
      }, a.quantiles = function() {
        return u
      }, a.invertExtent = function(e) {
        return e = n.indexOf(e), 0 > e ? [0 / 0, 0 / 0] : [e > 0 ? u[e - 1] : t[0], e < u.length ? u[e] : t[t.length - 1]]
      }, a.copy = function() {
        return no(t, n)
      }, o()
    }

    function eo(t, n, e) {
      function r(n) {
        return e[Math.max(0, Math.min(a, Math.floor(o * (n - t))))]
      }

      function i() {
        return o = e.length / (n - t), a = e.length - 1, r
      }
      var o, a;
      return r.domain = function(e) {
        return arguments.length ? (t = +e[0], n = +e[e.length - 1], i()) : [t, n]
      }, r.range = function(t) {
        return arguments.length ? (e = t, i()) : e
      }, r.invertExtent = function(n) {
        return n = e.indexOf(n), n = 0 > n ? 0 / 0 : n / o + t, [n, n + 1 / o]
      }, r.copy = function() {
        return eo(t, n, e)
      }, i()
    }

    function ro(t, n) {
      function e(e) {
        return e >= e ? n[ea.bisect(t, e)] : void 0
      }
      return e.domain = function(n) {
        return arguments.length ? (t = n, e) : t
      }, e.range = function(t) {
        return arguments.length ? (n = t, e) : n
      }, e.invertExtent = function(e) {
        return e = n.indexOf(e), [t[e - 1], t[e]]
      }, e.copy = function() {
        return ro(t, n)
      }, e
    }

    function io(t) {
      function n(t) {
        return +t
      }
      return n.invert = n, n.domain = n.range = function(e) {
        return arguments.length ? (t = e.map(n), n) : t
      }, n.ticks = function(n) {
        return Vi(t, n)
      }, n.tickFormat = function(n, e) {
        return Yi(t, n, e)
      }, n.copy = function() {
        return io(t)
      }, n
    }

    function oo() {
      return 0
    }

    function ao(t) {
      return t.innerRadius
    }

    function uo(t) {
      return t.outerRadius
    }

    function so(t) {
      return t.startAngle
    }

    function co(t) {
      return t.endAngle
    }

    function lo(t) {
      return t && t.padAngle
    }

    function fo(t, n, e, r) {
      return (t - e) * n - (n - r) * t > 0 ? 0 : 1
    }

    function ho(t, n, e, r, i) {
      var o = t[0] - n[0],
        a = t[1] - n[1],
        u = (i ? r : -r) / Math.sqrt(o * o + a * a),
        s = u * a,
        c = -u * o,
        l = t[0] + s,
        f = t[1] + c,
        h = n[0] + s,
        p = n[1] + c,
        d = (l + h) / 2,
        g = (f + p) / 2,
        v = h - l,
        m = p - f,
        y = v * v + m * m,
        b = e - r,
        w = l * p - h * f,
        A = (0 > m ? -1 : 1) * Math.sqrt(b * b * y - w * w),
        x = (w * m - v * A) / y,
        _ = (-w * v - m * A) / y,
        M = (w * m + v * A) / y,
        k = (-w * v + m * A) / y,
        S = x - d,
        E = _ - g,
        C = M - d,
        T = k - g;
      return S * S + E * E > C * C + T * T && (x = M, _ = k), [
        [x - s, _ - c],
        [x * e / b, _ * e / b]
      ]
    }

    function po(t) {
      function n(n) {
        function a() {
          c.push("M", o(t(l), u))
        }
        for (var s, c = [], l = [], f = -1, h = n.length, p = St(e), d = St(r); ++f < h;) i.call(this, s = n[f], f) ? l.push([+p.call(this, s, f), +d.call(this, s, f)]) : l.length && (a(), l = []);
        return l.length && a(), c.length ? c.join("") : null
      }
      var e = Ce,
        r = Te,
        i = Tn,
        o = go,
        a = o.key,
        u = .7;
      return n.x = function(t) {
        return arguments.length ? (e = t, n) : e
      }, n.y = function(t) {
        return arguments.length ? (r = t, n) : r
      }, n.defined = function(t) {
        return arguments.length ? (i = t, n) : i
      }, n.interpolate = function(t) {
        return arguments.length ? (a = "function" == typeof t ? o = t : (o = Es.get(t) || go).key, n) : a
      }, n.tension = function(t) {
        return arguments.length ? (u = t, n) : u
      }, n
    }

    function go(t) {
      return t.join("L")
    }

    function vo(t) {
      return go(t) + "Z"
    }

    function mo(t) {
      for (var n = 0, e = t.length, r = t[0], i = [r[0], ",", r[1]]; ++n < e;) i.push("H", (r[0] + (r = t[n])[0]) / 2, "V", r[1]);
      return e > 1 && i.push("H", r[0]), i.join("")
    }

    function yo(t) {
      for (var n = 0, e = t.length, r = t[0], i = [r[0], ",", r[1]]; ++n < e;) i.push("V", (r = t[n])[1], "H", r[0]);
      return i.join("")
    }

    function bo(t) {
      for (var n = 0, e = t.length, r = t[0], i = [r[0], ",", r[1]]; ++n < e;) i.push("H", (r = t[n])[0], "V", r[1]);
      return i.join("")
    }

    function wo(t, n) {
      return t.length < 4 ? go(t) : t[1] + _o(t.slice(1, -1), Mo(t, n))
    }

    function Ao(t, n) {
      return t.length < 3 ? go(t) : t[0] + _o((t.push(t[0]), t), Mo([t[t.length - 2]].concat(t, [t[1]]), n))
    }

    function xo(t, n) {
      return t.length < 3 ? go(t) : t[0] + _o(t, Mo(t, n))
    }

    function _o(t, n) {
      if (n.length < 1 || t.length != n.length && t.length != n.length + 2) return go(t);
      var e = t.length != n.length,
        r = "",
        i = t[0],
        o = t[1],
        a = n[0],
        u = a,
        s = 1;
      if (e && (r += "Q" + (o[0] - 2 * a[0] / 3) + "," + (o[1] - 2 * a[1] / 3) + "," + o[0] + "," + o[1], i = t[1], s = 2), n.length > 1) {
        u = n[1], o = t[s], s++, r += "C" + (i[0] + a[0]) + "," + (i[1] + a[1]) + "," + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1];
        for (var c = 2; c < n.length; c++, s++) o = t[s], u = n[c], r += "S" + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1]
      }
      if (e) {
        var l = t[s];
        r += "Q" + (o[0] + 2 * u[0] / 3) + "," + (o[1] + 2 * u[1] / 3) + "," + l[0] + "," + l[1]
      }
      return r
    }

    function Mo(t, n) {
      for (var e, r = [], i = (1 - n) / 2, o = t[0], a = t[1], u = 1, s = t.length; ++u < s;) e = o, o = a, a = t[u], r.push([i * (a[0] - e[0]), i * (a[1] - e[1])]);
      return r
    }

    function ko(t) {
      if (t.length < 3) return go(t);
      var n = 1,
        e = t.length,
        r = t[0],
        i = r[0],
        o = r[1],
        a = [i, i, i, (r = t[1])[0]],
        u = [o, o, o, r[1]],
        s = [i, ",", o, "L", To(Ps, a), ",", To(Ps, u)];
      for (t.push(t[e - 1]); ++n <= e;) r = t[n], a.shift(), a.push(r[0]), u.shift(), u.push(r[1]), Po(s, a, u);
      return t.pop(), s.push("L", r), s.join("")
    }

    function So(t) {
      if (t.length < 4) return go(t);
      for (var n, e = [], r = -1, i = t.length, o = [0], a = [0]; ++r < 3;) n = t[r], o.push(n[0]), a.push(n[1]);
      for (e.push(To(Ps, o) + "," + To(Ps, a)), --r; ++r < i;) n = t[r], o.shift(), o.push(n[0]), a.shift(), a.push(n[1]), Po(e, o, a);
      return e.join("")
    }

    function Eo(t) {
      for (var n, e, r = -1, i = t.length, o = i + 4, a = [], u = []; ++r < 4;) e = t[r % i], a.push(e[0]), u.push(e[1]);
      for (n = [To(Ps, a), ",", To(Ps, u)], --r; ++r < o;) e = t[r % i], a.shift(), a.push(e[0]), u.shift(), u.push(e[1]), Po(n, a, u);
      return n.join("")
    }

    function Co(t, n) {
      var e = t.length - 1;
      if (e)
        for (var r, i, o = t[0][0], a = t[0][1], u = t[e][0] - o, s = t[e][1] - a, c = -1; ++c <= e;) r = t[c], i = c / e, r[0] = n * r[0] + (1 - n) * (o + i * u), r[1] = n * r[1] + (1 - n) * (a + i * s);
      return ko(t)
    }

    function To(t, n) {
      return t[0] * n[0] + t[1] * n[1] + t[2] * n[2] + t[3] * n[3]
    }

    function Po(t, n, e) {
      t.push("C", To(Cs, n), ",", To(Cs, e), ",", To(Ts, n), ",", To(Ts, e), ",", To(Ps, n), ",", To(Ps, e))
    }

    function No(t, n) {
      return (n[1] - t[1]) / (n[0] - t[0])
    }

    function Do(t) {
      for (var n = 0, e = t.length - 1, r = [], i = t[0], o = t[1], a = r[0] = No(i, o); ++n < e;) r[n] = (a + (a = No(i = o, o = t[n + 1]))) / 2;
      return r[n] = a, r
    }

    function jo(t) {
      for (var n, e, r, i, o = [], a = Do(t), u = -1, s = t.length - 1; ++u < s;) n = No(t[u], t[u + 1]), da(n) < Pa ? a[u] = a[u + 1] = 0 : (e = a[u] / n, r = a[u + 1] / n, i = e * e + r * r, i > 9 && (i = 3 * n / Math.sqrt(i), a[u] = i * e, a[u + 1] = i * r));
      for (u = -1; ++u <= s;) i = (t[Math.min(s, u + 1)][0] - t[Math.max(0, u - 1)][0]) / (6 * (1 + a[u] * a[u])), o.push([i || 0, a[u] * i || 0]);
      return o
    }

    function Lo(t) {
      return t.length < 3 ? go(t) : t[0] + _o(t, jo(t))
    }

    function Ro(t) {
      for (var n, e, r, i = -1, o = t.length; ++i < o;) n = t[i], e = n[0], r = n[1] - Ra, n[0] = e * Math.cos(r), n[1] = e * Math.sin(r);
      return t
    }

    function Oo(t) {
      function n(n) {
        function s() {
          g.push("M", u(t(m), f), l, c(t(v.reverse()), f), "Z")
        }
        for (var h, p, d, g = [], v = [], m = [], y = -1, b = n.length, w = St(e), A = St(i), x = e === r ? function() {
            return p
          } : St(r), _ = i === o ? function() {
            return d
          } : St(o); ++y < b;) a.call(this, h = n[y], y) ? (v.push([p = +w.call(this, h, y), d = +A.call(this, h, y)]), m.push([+x.call(this, h, y), +_.call(this, h, y)])) : v.length && (s(), v = [], m = []);
        return v.length && s(), g.length ? g.join("") : null
      }
      var e = Ce,
        r = Ce,
        i = 0,
        o = Te,
        a = Tn,
        u = go,
        s = u.key,
        c = u,
        l = "L",
        f = .7;
      return n.x = function(t) {
        return arguments.length ? (e = r = t, n) : r
      }, n.x0 = function(t) {
        return arguments.length ? (e = t, n) : e
      }, n.x1 = function(t) {
        return arguments.length ? (r = t, n) : r
      }, n.y = function(t) {
        return arguments.length ? (i = o = t, n) : o
      }, n.y0 = function(t) {
        return arguments.length ? (i = t, n) : i
      }, n.y1 = function(t) {
        return arguments.length ? (o = t, n) : o
      }, n.defined = function(t) {
        return arguments.length ? (a = t, n) : a
      }, n.interpolate = function(t) {
        return arguments.length ? (s = "function" == typeof t ? u = t : (u = Es.get(t) || go).key, c = u.reverse || u, l = u.closed ? "M" : "L", n) : s
      }, n.tension = function(t) {
        return arguments.length ? (f = t, n) : f
      }, n
    }

    function Io(t) {
      return t.radius
    }

    function qo(t) {
      return [t.x, t.y]
    }

    function Uo(t) {
      return function() {
        var n = t.apply(this, arguments),
          e = n[0],
          r = n[1] - Ra;
        return [e * Math.cos(r), e * Math.sin(r)]
      }
    }

    function zo() {
      return 64
    }

    function Fo() {
      return "circle"
    }

    function Ho(t) {
      var n = Math.sqrt(t / Da);
      return "M0," + n + "A" + n + "," + n + " 0 1,1 0," + -n + "A" + n + "," + n + " 0 1,1 0," + n + "Z"
    }

    function Bo(t) {
      return function() {
        var n, e;
        (n = this[t]) && (e = n[n.active]) && (--n.count ? delete n[n.active] : delete this[t], n.active += .5, e.event && e.event.interrupt.call(this, this.__data__, e.index))
      }
    }

    function Wo(t, n, e) {
      return ba(t, Is), t.namespace = n, t.id = e, t
    }

    function $o(t, n, e, r) {
      var i = t.id,
        o = t.namespace;
      return B(t, "function" == typeof e ? function(t, a, u) {
        t[o][i].tween.set(n, r(e.call(t, t.__data__, a, u)))
      } : (e = r(e), function(t) {
        t[o][i].tween.set(n, e)
      }))
    }

    function Xo(t) {
      return null == t && (t = ""),
        function() {
          this.textContent = t
        }
    }

    function Vo(t) {
      return null == t ? "__transition__" : "__transition_" + t + "__"
    }

    function Yo(t, n, e, r, i) {
      var o = t[e] || (t[e] = {
          active: 0,
          count: 0
        }),
        a = o[r];
      if (!a) {
        var u = i.time;
        a = o[r] = {
          tween: new c,
          time: u,
          delay: i.delay,
          duration: i.duration,
          ease: i.ease,
          index: n
        }, i = null, ++o.count, ea.timer(function(i) {
          function s(e) {
            if (o.active > r) return l();
            var i = o[o.active];
            i && (--o.count, delete o[o.active], i.event && i.event.interrupt.call(t, t.__data__, i.index)), o.active = r, a.event && a.event.start.call(t, t.__data__, n), a.tween.forEach(function(e, r) {
              (r = r.call(t, t.__data__, n)) && g.push(r)
            }), h = a.ease, f = a.duration, ea.timer(function() {
              return d.c = c(e || 1) ? Tn : c, 1
            }, 0, u)
          }

          function c(e) {
            if (o.active !== r) return 1;
            for (var i = e / f, u = h(i), s = g.length; s > 0;) g[--s].call(t, u);
            return i >= 1 ? (a.event && a.event.end.call(t, t.__data__, n), l()) : void 0
          }

          function l() {
            return --o.count ? delete o[r] : delete t[e], 1
          }
          var f, h, p = a.delay,
            d = ru,
            g = [];
          return d.t = p + u, i >= p ? s(i - p) : void(d.c = s)
        }, 0, u)
      }
    }

    function Go(t, n, e) {
      t.attr("transform", function(t) {
        var r = n(t);
        return "translate(" + (isFinite(r) ? r : e(t)) + ",0)"
      })
    }

    function Qo(t, n, e) {
      t.attr("transform", function(t) {
        var r = n(t);
        return "translate(0," + (isFinite(r) ? r : e(t)) + ")"
      })
    }

    function Jo(t) {
      return t.toISOString()
    }

    function Zo(t, n, e) {
      function r(n) {
        return t(n)
      }

      function i(t, e) {
        var r = t[1] - t[0],
          i = r / e,
          o = ea.bisect(Xs, i);
        return o == Xs.length ? [n.year, Xi(t.map(function(t) {
          return t / 31536e6
        }), e)[2]] : o ? n[i / Xs[o - 1] < Xs[o] / i ? o - 1 : o] : [Gs, Xi(t, e)[2]]
      }
      return r.invert = function(n) {
        return Ko(t.invert(n))
      }, r.domain = function(n) {
        return arguments.length ? (t.domain(n), r) : t.domain().map(Ko)
      }, r.nice = function(t, n) {
        function e(e) {
          return !isNaN(e) && !t.range(e, Ko(+e + 1), n).length
        }
        var o = r.domain(),
          a = Ii(o),
          u = null == t ? i(a, 10) : "number" == typeof t && i(a, t);
        return u && (t = u[0], n = u[1]), r.domain(zi(o, n > 1 ? {
          floor: function(n) {
            for (; e(n = t.floor(n));) n = Ko(n - 1);
            return n
          },
          ceil: function(n) {
            for (; e(n = t.ceil(n));) n = Ko(+n + 1);
            return n
          }
        } : t))
      }, r.ticks = function(t, n) {
        var e = Ii(r.domain()),
          o = null == t ? i(e, 10) : "number" == typeof t ? i(e, t) : !t.range && [{
            range: t
          }, n];
        return o && (t = o[0], n = o[1]), t.range(e[0], Ko(+e[1] + 1), 1 > n ? 1 : n)
      }, r.tickFormat = function() {
        return e
      }, r.copy = function() {
        return Zo(t.copy(), n, e)
      }, Wi(r, t)
    }

    function Ko(t) {
      return new Date(t)
    }

    function ta(t) {
      return JSON.parse(t.responseText)
    }

    function na(t) {
      var n = oa.createRange();
      return n.selectNode(oa.body), n.createContextualFragment(t.responseText)
    }
    var ea = {
        version: "3.5.5"
      },
      ra = [].slice,
      ia = function(t) {
        return ra.call(t)
      },
      oa = this.document;
    if (oa) try {
      ia(oa.documentElement.childNodes)[0].nodeType
    } catch (aa) {
      ia = function(t) {
        for (var n = t.length, e = new Array(n); n--;) e[n] = t[n];
        return e
      }
    }
    if (Date.now || (Date.now = function() {
        return +new Date
      }), oa) try {
      oa.createElement("DIV").style.setProperty("opacity", 0, "")
    } catch (ua) {
      var sa = this.Element.prototype,
        ca = sa.setAttribute,
        la = sa.setAttributeNS,
        fa = this.CSSStyleDeclaration.prototype,
        ha = fa.setProperty;
      sa.setAttribute = function(t, n) {
        ca.call(this, t, n + "")
      }, sa.setAttributeNS = function(t, n, e) {
        la.call(this, t, n, e + "")
      }, fa.setProperty = function(t, n, e) {
        ha.call(this, t, n + "", e)
      }
    }
    ea.ascending = e, ea.descending = function(t, n) {
      return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0
    }, ea.min = function(t, n) {
      var e, r, i = -1,
        o = t.length;
      if (1 === arguments.length) {
        for (; ++i < o;)
          if (null != (r = t[i]) && r >= r) {
            e = r;
            break
          }
        for (; ++i < o;) null != (r = t[i]) && e > r && (e = r)
      } else {
        for (; ++i < o;)
          if (null != (r = n.call(t, t[i], i)) && r >= r) {
            e = r;
            break
          }
        for (; ++i < o;) null != (r = n.call(t, t[i], i)) && e > r && (e = r)
      }
      return e
    }, ea.max = function(t, n) {
      var e, r, i = -1,
        o = t.length;
      if (1 === arguments.length) {
        for (; ++i < o;)
          if (null != (r = t[i]) && r >= r) {
            e = r;
            break
          }
        for (; ++i < o;) null != (r = t[i]) && r > e && (e = r)
      } else {
        for (; ++i < o;)
          if (null != (r = n.call(t, t[i], i)) && r >= r) {
            e = r;
            break
          }
        for (; ++i < o;) null != (r = n.call(t, t[i], i)) && r > e && (e = r)
      }
      return e
    }, ea.extent = function(t, n) {
      var e, r, i, o = -1,
        a = t.length;
      if (1 === arguments.length) {
        for (; ++o < a;)
          if (null != (r = t[o]) && r >= r) {
            e = i = r;
            break
          }
        for (; ++o < a;) null != (r = t[o]) && (e > r && (e = r), r > i && (i = r))
      } else {
        for (; ++o < a;)
          if (null != (r = n.call(t, t[o], o)) && r >= r) {
            e = i = r;
            break
          }
        for (; ++o < a;) null != (r = n.call(t, t[o], o)) && (e > r && (e = r), r > i && (i = r))
      }
      return [e, i]
    }, ea.sum = function(t, n) {
      var e, r = 0,
        o = t.length,
        a = -1;
      if (1 === arguments.length)
        for (; ++a < o;) i(e = +t[a]) && (r += e);
      else
        for (; ++a < o;) i(e = +n.call(t, t[a], a)) && (r += e);
      return r
    }, ea.mean = function(t, n) {
      var e, o = 0,
        a = t.length,
        u = -1,
        s = a;
      if (1 === arguments.length)
        for (; ++u < a;) i(e = r(t[u])) ? o += e : --s;
      else
        for (; ++u < a;) i(e = r(n.call(t, t[u], u))) ? o += e : --s;
      return s ? o / s : void 0
    }, ea.quantile = function(t, n) {
      var e = (t.length - 1) * n + 1,
        r = Math.floor(e),
        i = +t[r - 1],
        o = e - r;
      return o ? i + o * (t[r] - i) : i
    }, ea.median = function(t, n) {
      var o, a = [],
        u = t.length,
        s = -1;
      if (1 === arguments.length)
        for (; ++s < u;) i(o = r(t[s])) && a.push(o);
      else
        for (; ++s < u;) i(o = r(n.call(t, t[s], s))) && a.push(o);
      return a.length ? ea.quantile(a.sort(e), .5) : void 0
    }, ea.variance = function(t, n) {
      var e, o, a = t.length,
        u = 0,
        s = 0,
        c = -1,
        l = 0;
      if (1 === arguments.length)
        for (; ++c < a;) i(e = r(t[c])) && (o = e - u, u += o / ++l, s += o * (e - u));
      else
        for (; ++c < a;) i(e = r(n.call(t, t[c], c))) && (o = e - u, u += o / ++l, s += o * (e - u));
      return l > 1 ? s / (l - 1) : void 0
    }, ea.deviation = function() {
      var t = ea.variance.apply(this, arguments);
      return t ? Math.sqrt(t) : t
    };
    var pa = o(e);
    ea.bisectLeft = pa.left, ea.bisect = ea.bisectRight = pa.right, ea.bisector = function(t) {
      return o(1 === t.length ? function(n, r) {
        return e(t(n), r)
      } : t)
    }, ea.shuffle = function(t, n, e) {
      (o = arguments.length) < 3 && (e = t.length, 2 > o && (n = 0));
      for (var r, i, o = e - n; o;) i = Math.random() * o-- | 0, r = t[o + n], t[o + n] = t[i + n], t[i + n] = r;
      return t
    }, ea.permute = function(t, n) {
      for (var e = n.length, r = new Array(e); e--;) r[e] = t[n[e]];
      return r
    }, ea.pairs = function(t) {
      for (var n, e = 0, r = t.length - 1, i = t[0], o = new Array(0 > r ? 0 : r); r > e;) o[e] = [n = i, i = t[++e]];
      return o
    }, ea.zip = function() {
      if (!(r = arguments.length)) return [];
      for (var t = -1, n = ea.min(arguments, a), e = new Array(n); ++t < n;)
        for (var r, i = -1, o = e[t] = new Array(r); ++i < r;) o[i] = arguments[i][t];
      return e
    }, ea.transpose = function(t) {
      return ea.zip.apply(ea, t)
    }, ea.keys = function(t) {
      var n = [];
      for (var e in t) n.push(e);
      return n
    }, ea.values = function(t) {
      var n = [];
      for (var e in t) n.push(t[e]);
      return n
    }, ea.entries = function(t) {
      var n = [];
      for (var e in t) n.push({
        key: e,
        value: t[e]
      });
      return n
    }, ea.merge = function(t) {
      for (var n, e, r, i = t.length, o = -1, a = 0; ++o < i;) a += t[o].length;
      for (e = new Array(a); --i >= 0;)
        for (r = t[i], n = r.length; --n >= 0;) e[--a] = r[n];
      return e
    };
    var da = Math.abs;
    ea.range = function(t, n, e) {
      if (arguments.length < 3 && (e = 1, arguments.length < 2 && (n = t, t = 0)), (n - t) / e === 1 / 0) throw new Error("infinite range");
      var r, i = [],
        o = u(da(e)),
        a = -1;
      if (t *= o, n *= o, e *= o, 0 > e)
        for (;
          (r = t + e * ++a) > n;) i.push(r / o);
      else
        for (;
          (r = t + e * ++a) < n;) i.push(r / o);
      return i
    }, ea.map = function(t, n) {
      var e = new c;
      if (t instanceof c) t.forEach(function(t, n) {
        e.set(t, n)
      });
      else if (Array.isArray(t)) {
        var r, i = -1,
          o = t.length;
        if (1 === arguments.length)
          for (; ++i < o;) e.set(i, t[i]);
        else
          for (; ++i < o;) e.set(n.call(t, r = t[i], i), r)
      } else
        for (var a in t) e.set(a, t[a]);
      return e
    };
    var ga = "__proto__",
      va = "\x00";
    s(c, {
      has: h,
      get: function(t) {
        return this._[l(t)]
      },
      set: function(t, n) {
        return this._[l(t)] = n
      },
      remove: p,
      keys: d,
      values: function() {
        var t = [];
        for (var n in this._) t.push(this._[n]);
        return t
      },
      entries: function() {
        var t = [];
        for (var n in this._) t.push({
          key: f(n),
          value: this._[n]
        });
        return t
      },
      size: g,
      empty: v,
      forEach: function(t) {
        for (var n in this._) t.call(this, f(n), this._[n])
      }
    }), ea.nest = function() {
      function t(n, a, u) {
        if (u >= o.length) return r ? r.call(i, a) : e ? a.sort(e) : a;
        for (var s, l, f, h, p = -1, d = a.length, g = o[u++], v = new c; ++p < d;)(h = v.get(s = g(l = a[p]))) ? h.push(l) : v.set(s, [l]);
        return n ? (l = n(), f = function(e, r) {
          l.set(e, t(n, r, u))
        }) : (l = {}, f = function(e, r) {
          l[e] = t(n, r, u)
        }), v.forEach(f), l
      }

      function n(t, e) {
        if (e >= o.length) return t;
        var r = [],
          i = a[e++];
        return t.forEach(function(t, i) {
          r.push({
            key: t,
            values: n(i, e)
          })
        }), i ? r.sort(function(t, n) {
          return i(t.key, n.key)
        }) : r
      }
      var e, r, i = {},
        o = [],
        a = [];
      return i.map = function(n, e) {
        return t(e, n, 0)
      }, i.entries = function(e) {
        return n(t(ea.map, e, 0), 0)
      }, i.key = function(t) {
        return o.push(t), i
      }, i.sortKeys = function(t) {
        return a[o.length - 1] = t, i
      }, i.sortValues = function(t) {
        return e = t, i
      }, i.rollup = function(t) {
        return r = t, i
      }, i
    }, ea.set = function(t) {
      var n = new m;
      if (t)
        for (var e = 0, r = t.length; r > e; ++e) n.add(t[e]);
      return n
    }, s(m, {
      has: h,
      add: function(t) {
        return this._[l(t += "")] = !0, t
      },
      remove: p,
      values: d,
      size: g,
      empty: v,
      forEach: function(t) {
        for (var n in this._) t.call(this, f(n))
      }
    }), ea.behavior = {}, ea.rebind = function(t, n) {
      for (var e, r = 1, i = arguments.length; ++r < i;) t[e = arguments[r]] = b(t, n, n[e]);
      return t
    };
    var ma = ["webkit", "ms", "moz", "Moz", "o", "O"];
    ea.dispatch = function() {
      for (var t = new x, n = -1, e = arguments.length; ++n < e;) t[arguments[n]] = _(t);
      return t
    }, x.prototype.on = function(t, n) {
      var e = t.indexOf("."),
        r = "";
      if (e >= 0 && (r = t.slice(e + 1), t = t.slice(0, e)), t) return arguments.length < 2 ? this[t].on(r) : this[t].on(r, n);
      if (2 === arguments.length) {
        if (null == n)
          for (t in this) this.hasOwnProperty(t) && this[t].on(r, null);
        return this
      }
    }, ea.event = null, ea.requote = function(t) {
      return t.replace(ya, "\\$&")
    };
    var ya = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
      ba = {}.__proto__ ? function(t, n) {
        t.__proto__ = n
      } : function(t, n) {
        for (var e in n) t[e] = n[e]
      },
      wa = function(t, n) {
        return n.querySelector(t)
      },
      Aa = function(t, n) {
        return n.querySelectorAll(t)
      },
      xa = function(t, n) {
        var e = t.matches || t[w(t, "matchesSelector")];
        return (xa = function(t, n) {
          return e.call(t, n)
        })(t, n)
      };
    "function" == typeof Sizzle && (wa = function(t, n) {
      return Sizzle(t, n)[0] || null
    }, Aa = Sizzle, xa = Sizzle.matchesSelector), ea.selection = function() {
      return ea.select(oa.documentElement)
    };
    var _a = ea.selection.prototype = [];
    _a.select = function(t) {
      var n, e, r, i, o = [];
      t = C(t);
      for (var a = -1, u = this.length; ++a < u;) {
        o.push(n = []), n.parentNode = (r = this[a]).parentNode;
        for (var s = -1, c = r.length; ++s < c;)(i = r[s]) ? (n.push(e = t.call(i, i.__data__, s, a)), e && "__data__" in i && (e.__data__ = i.__data__)) : n.push(null)
      }
      return E(o)
    }, _a.selectAll = function(t) {
      var n, e, r = [];
      t = T(t);
      for (var i = -1, o = this.length; ++i < o;)
        for (var a = this[i], u = -1, s = a.length; ++u < s;)(e = a[u]) && (r.push(n = ia(t.call(e, e.__data__, u, i))), n.parentNode = e);
      return E(r)
    };
    var Ma = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: "http://www.w3.org/1999/xhtml",
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
    ea.ns = {
      prefix: Ma,
      qualify: function(t) {
        var n = t.indexOf(":"),
          e = t;
        return n >= 0 && (e = t.slice(0, n), t = t.slice(n + 1)), Ma.hasOwnProperty(e) ? {
          space: Ma[e],
          local: t
        } : t
      }
    }, _a.attr = function(t, n) {
      if (arguments.length < 2) {
        if ("string" == typeof t) {
          var e = this.node();
          return t = ea.ns.qualify(t), t.local ? e.getAttributeNS(t.space, t.local) : e.getAttribute(t)
        }
        for (n in t) this.each(P(n, t[n]));
        return this
      }
      return this.each(P(t, n))
    }, _a.classed = function(t, n) {
      if (arguments.length < 2) {
        if ("string" == typeof t) {
          var e = this.node(),
            r = (t = j(t)).length,
            i = -1;
          if (n = e.classList) {
            for (; ++i < r;)
              if (!n.contains(t[i])) return !1
          } else
            for (n = e.getAttribute("class"); ++i < r;)
              if (!D(t[i]).test(n)) return !1; return !0
        }
        for (n in t) this.each(L(n, t[n]));
        return this
      }
      return this.each(L(t, n))
    }, _a.style = function(t, e, r) {
      var i = arguments.length;
      if (3 > i) {
        if ("string" != typeof t) {
          2 > i && (e = "");
          for (r in t) this.each(O(r, t[r], e));
          return this
        }
        if (2 > i) {
          var o = this.node();
          return n(o).getComputedStyle(o, null).getPropertyValue(t)
        }
        r = ""
      }
      return this.each(O(t, e, r))
    }, _a.property = function(t, n) {
      if (arguments.length < 2) {
        if ("string" == typeof t) return this.node()[t];
        for (n in t) this.each(I(n, t[n]));
        return this
      }
      return this.each(I(t, n))
    }, _a.text = function(t) {
      return arguments.length ? this.each("function" == typeof t ? function() {
        var n = t.apply(this, arguments);
        this.textContent = null == n ? "" : n
      } : null == t ? function() {
        this.textContent = ""
      } : function() {
        this.textContent = t
      }) : this.node().textContent
    }, _a.html = function(t) {
      return arguments.length ? this.each("function" == typeof t ? function() {
        var n = t.apply(this, arguments);
        this.innerHTML = null == n ? "" : n
      } : null == t ? function() {
        this.innerHTML = ""
      } : function() {
        this.innerHTML = t
      }) : this.node().innerHTML
    }, _a.append = function(t) {
      return t = q(t), this.select(function() {
        return this.appendChild(t.apply(this, arguments))
      })
    }, _a.insert = function(t, n) {
      return t = q(t), n = C(n), this.select(function() {
        return this.insertBefore(t.apply(this, arguments), n.apply(this, arguments) || null)
      })
    }, _a.remove = function() {
      return this.each(U)
    }, _a.data = function(t, n) {
      function e(t, e) {
        var r, i, o, a = t.length,
          f = e.length,
          h = Math.min(a, f),
          p = new Array(f),
          d = new Array(f),
          g = new Array(a);
        if (n) {
          var v, m = new c,
            y = new Array(a);
          for (r = -1; ++r < a;) m.has(v = n.call(i = t[r], i.__data__, r)) ? g[r] = i : m.set(v, i), y[r] = v;
          for (r = -1; ++r < f;)(i = m.get(v = n.call(e, o = e[r], r))) ? i !== !0 && (p[r] = i, i.__data__ = o) : d[r] = z(o), m.set(v, !0);
          for (r = -1; ++r < a;) m.get(y[r]) !== !0 && (g[r] = t[r])
        } else {
          for (r = -1; ++r < h;) i = t[r], o = e[r], i ? (i.__data__ = o, p[r] = i) : d[r] = z(o);
          for (; f > r; ++r) d[r] = z(e[r]);
          for (; a > r; ++r) g[r] = t[r]
        }
        d.update = p, d.parentNode = p.parentNode = g.parentNode = t.parentNode, u.push(d), s.push(p), l.push(g)
      }
      var r, i, o = -1,
        a = this.length;
      if (!arguments.length) {
        for (t = new Array(a = (r = this[0]).length); ++o < a;)(i = r[o]) && (t[o] = i.__data__);
        return t
      }
      var u = W([]),
        s = E([]),
        l = E([]);
      if ("function" == typeof t)
        for (; ++o < a;) e(r = this[o], t.call(r, r.parentNode.__data__, o));
      else
        for (; ++o < a;) e(r = this[o], t);
      return s.enter = function() {
        return u
      }, s.exit = function() {
        return l
      }, s
    }, _a.datum = function(t) {
      return arguments.length ? this.property("__data__", t) : this.property("__data__")
    }, _a.filter = function(t) {
      var n, e, r, i = [];
      "function" != typeof t && (t = F(t));
      for (var o = 0, a = this.length; a > o; o++) {
        i.push(n = []), n.parentNode = (e = this[o]).parentNode;
        for (var u = 0, s = e.length; s > u; u++)(r = e[u]) && t.call(r, r.__data__, u, o) && n.push(r)
      }
      return E(i)
    }, _a.order = function() {
      for (var t = -1, n = this.length; ++t < n;)
        for (var e, r = this[t], i = r.length - 1, o = r[i]; --i >= 0;)(e = r[i]) && (o && o !== e.nextSibling && o.parentNode.insertBefore(e, o), o = e);
      return this
    }, _a.sort = function(t) {
      t = H.apply(this, arguments);
      for (var n = -1, e = this.length; ++n < e;) this[n].sort(t);
      return this.order()
    }, _a.each = function(t) {
      return B(this, function(n, e, r) {
        t.call(n, n.__data__, e, r)
      })
    }, _a.call = function(t) {
      var n = ia(arguments);
      return t.apply(n[0] = this, n), this
    }, _a.empty = function() {
      return !this.node()
    }, _a.node = function() {
      for (var t = 0, n = this.length; n > t; t++)
        for (var e = this[t], r = 0, i = e.length; i > r; r++) {
          var o = e[r];
          if (o) return o
        }
      return null
    }, _a.size = function() {
      var t = 0;
      return B(this, function() {
        ++t
      }), t
    };
    var ka = [];
    ea.selection.enter = W, ea.selection.enter.prototype = ka, ka.append = _a.append, ka.empty = _a.empty, ka.node = _a.node, ka.call = _a.call, ka.size = _a.size, ka.select = function(t) {
      for (var n, e, r, i, o, a = [], u = -1, s = this.length; ++u < s;) {
        r = (i = this[u]).update, a.push(n = []), n.parentNode = i.parentNode;
        for (var c = -1, l = i.length; ++c < l;)(o = i[c]) ? (n.push(r[c] = e = t.call(i.parentNode, o.__data__, c, u)), e.__data__ = o.__data__) : n.push(null)
      }
      return E(a)
    }, ka.insert = function(t, n) {
      return arguments.length < 2 && (n = $(this)), _a.insert.call(this, t, n)
    }, ea.select = function(n) {
      var e;
      return "string" == typeof n ? (e = [wa(n, oa)], e.parentNode = oa.documentElement) : (e = [n], e.parentNode = t(n)), E([e])
    }, ea.selectAll = function(t) {
      var n;
      return "string" == typeof t ? (n = ia(Aa(t, oa)), n.parentNode = oa.documentElement) : (n = t, n.parentNode = null), E([n])
    }, _a.on = function(t, n, e) {
      var r = arguments.length;
      if (3 > r) {
        if ("string" != typeof t) {
          2 > r && (n = !1);
          for (e in t) this.each(X(e, t[e], n));
          return this
        }
        if (2 > r) return (r = this.node()["__on" + t]) && r._;
        e = !1
      }
      return this.each(X(t, n, e))
    };
    var Sa = ea.map({
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    });
    oa && Sa.forEach(function(t) {
      "on" + t in oa && Sa.remove(t)
    });
    var Ea, Ca = 0;
    ea.mouse = function(t) {
      return Q(t, k())
    };
    var Ta = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
    ea.touch = function(t, n, e) {
      if (arguments.length < 3 && (e = n, n = k().changedTouches), n)
        for (var r, i = 0, o = n.length; o > i; ++i)
          if ((r = n[i]).identifier === e) return Q(t, r)
    }, ea.behavior.drag = function() {
      function t() {
        this.on("mousedown.drag", o).on("touchstart.drag", a)
      }

      function e(t, n, e, o, a) {
        return function() {
          function u() {
            var t, e, r = n(h, g);
            r && (t = r[0] - b[0], e = r[1] - b[1], d |= t | e, b = r, p({
              type: "drag",
              x: r[0] + c[0],
              y: r[1] + c[1],
              dx: t,
              dy: e
            }))
          }

          function s() {
            n(h, g) && (m.on(o + v, null).on(a + v, null), y(d && ea.event.target === f), p({
              type: "dragend"
            }))
          }
          var c, l = this,
            f = ea.event.target,
            h = l.parentNode,
            p = r.of(l, arguments),
            d = 0,
            g = t(),
            v = ".drag" + (null == g ? "" : "-" + g),
            m = ea.select(e(f)).on(o + v, u).on(a + v, s),
            y = G(f),
            b = n(h, g);
          i ? (c = i.apply(l, arguments), c = [c.x - b[0], c.y - b[1]]) : c = [0, 0], p({
            type: "dragstart"
          })
        }
      }
      var r = S(t, "drag", "dragstart", "dragend"),
        i = null,
        o = e(A, ea.mouse, n, "mousemove", "mouseup"),
        a = e(J, ea.touch, y, "touchmove", "touchend");
      return t.origin = function(n) {
        return arguments.length ? (i = n, t) : i
      }, ea.rebind(t, r, "on")
    }, ea.touches = function(t, n) {
      return arguments.length < 2 && (n = k().touches), n ? ia(n).map(function(n) {
        var e = Q(t, n);
        return e.identifier = n.identifier, e
      }) : []
    };
    var Pa = 1e-6,
      Na = Pa * Pa,
      Da = Math.PI,
      ja = 2 * Da,
      La = ja - Pa,
      Ra = Da / 2,
      Oa = Da / 180,
      Ia = 180 / Da,
      qa = Math.SQRT2,
      Ua = 2,
      za = 4;
    ea.interpolateZoom = function(t, n) {
      function e(t) {
        var n = t * y;
        if (m) {
          var e = rt(g),
            a = o / (Ua * h) * (e * it(qa * n + g) - et(g));
          return [r + a * c, i + a * l, o * e / rt(qa * n + g)]
        }
        return [r + t * c, i + t * l, o * Math.exp(qa * n)]
      }
      var r = t[0],
        i = t[1],
        o = t[2],
        a = n[0],
        u = n[1],
        s = n[2],
        c = a - r,
        l = u - i,
        f = c * c + l * l,
        h = Math.sqrt(f),
        p = (s * s - o * o + za * f) / (2 * o * Ua * h),
        d = (s * s - o * o - za * f) / (2 * s * Ua * h),
        g = Math.log(Math.sqrt(p * p + 1) - p),
        v = Math.log(Math.sqrt(d * d + 1) - d),
        m = v - g,
        y = (m || Math.log(s / o)) / qa;
      return e.duration = 1e3 * y, e
    }, ea.behavior.zoom = function() {
      function t(t) {
        t.on(N, f).on(Ha + ".zoom", p).on("dblclick.zoom", d).on(L, h)
      }

      function e(t) {
        return [(t[0] - k.x) / k.k, (t[1] - k.y) / k.k]
      }

      function r(t) {
        return [t[0] * k.k + k.x, t[1] * k.k + k.y]
      }

      function i(t) {
        k.k = Math.max(C[0], Math.min(C[1], t))
      }

      function o(t, n) {
        n = r(n), k.x += t[0] - n[0], k.y += t[1] - n[1]
      }

      function a(n, e, r, a) {
        n.__chart__ = {
          x: k.x,
          y: k.y,
          k: k.k
        }, i(Math.pow(2, a)), o(v = e, r), n = ea.select(n), T > 0 && (n = n.transition().duration(T)), n.call(t.event)
      }

      function u() {
        A && A.domain(w.range().map(function(t) {
          return (t - k.x) / k.k
        }).map(w.invert)), _ && _.domain(x.range().map(function(t) {
          return (t - k.y) / k.k
        }).map(x.invert))
      }

      function s(t) {
        P++ || t({
          type: "zoomstart"
        })
      }

      function c(t) {
        u(), t({
          type: "zoom",
          scale: k.k,
          translate: [k.x, k.y]
        })
      }

      function l(t) {
        --P || t({
          type: "zoomend"
        }), v = null
      }

      function f() {
        function t() {
          f = 1, o(ea.mouse(i), p), c(u)
        }

        function r() {
          h.on(D, null).on(j, null), d(f && ea.event.target === a), l(u)
        }
        var i = this,
          a = ea.event.target,
          u = R.of(i, arguments),
          f = 0,
          h = ea.select(n(i)).on(D, t).on(j, r),
          p = e(ea.mouse(i)),
          d = G(i);
        Os.call(i), s(u)
      }

      function h() {
        function t() {
          var t = ea.touches(d);
          return p = k.k, t.forEach(function(t) {
            t.identifier in v && (v[t.identifier] = e(t))
          }), t
        }

        function n() {
          var n = ea.event.target;
          ea.select(n).on(w, r).on(A, u), x.push(n);
          for (var e = ea.event.changedTouches, i = 0, o = e.length; o > i; ++i) v[e[i].identifier] = null;
          var s = t(),
            c = Date.now();
          if (1 === s.length) {
            if (500 > c - b) {
              var l = s[0];
              a(d, l, v[l.identifier], Math.floor(Math.log(k.k) / Math.LN2) + 1), M()
            }
            b = c
          } else if (s.length > 1) {
            var l = s[0],
              f = s[1],
              h = l[0] - f[0],
              p = l[1] - f[1];
            m = h * h + p * p
          }
        }

        function r() {
          var t, n, e, r, a = ea.touches(d);
          Os.call(d);
          for (var u = 0, s = a.length; s > u; ++u, r = null)
            if (e = a[u], r = v[e.identifier]) {
              if (n) break;
              t = e, n = r
            }
          if (r) {
            var l = (l = e[0] - t[0]) * l + (l = e[1] - t[1]) * l,
              f = m && Math.sqrt(l / m);
            t = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], n = [(n[0] + r[0]) / 2, (n[1] + r[1]) / 2], i(f * p)
          }
          b = null, o(t, n), c(g)
        }

        function u() {
          if (ea.event.touches.length) {
            for (var n = ea.event.changedTouches, e = 0, r = n.length; r > e; ++e) delete v[n[e].identifier];
            for (var i in v) return void t()
          }
          ea.selectAll(x).on(y, null), _.on(N, f).on(L, h), S(), l(g)
        }
        var p, d = this,
          g = R.of(d, arguments),
          v = {},
          m = 0,
          y = ".zoom-" + ea.event.changedTouches[0].identifier,
          w = "touchmove" + y,
          A = "touchend" + y,
          x = [],
          _ = ea.select(d),
          S = G(d);
        n(), s(g), _.on(N, null).on(L, n)
      }

      function p() {
        var t = R.of(this, arguments);
        y ? clearTimeout(y) : (g = e(v = m || ea.mouse(this)), Os.call(this), s(t)), y = setTimeout(function() {
          y = null, l(t)
        }, 50), M(), i(Math.pow(2, .002 * Fa()) * k.k), o(v, g), c(t)
      }

      function d() {
        var t = ea.mouse(this),
          n = Math.log(k.k) / Math.LN2;
        a(this, t, e(t), ea.event.shiftKey ? Math.ceil(n) - 1 : Math.floor(n) + 1)
      }
      var g, v, m, y, b, w, A, x, _, k = {
          x: 0,
          y: 0,
          k: 1
        },
        E = [960, 500],
        C = Ba,
        T = 250,
        P = 0,
        N = "mousedown.zoom",
        D = "mousemove.zoom",
        j = "mouseup.zoom",
        L = "touchstart.zoom",
        R = S(t, "zoomstart", "zoom", "zoomend");
      return Ha || (Ha = "onwheel" in oa ? (Fa = function() {
        return -ea.event.deltaY * (ea.event.deltaMode ? 120 : 1)
      }, "wheel") : "onmousewheel" in oa ? (Fa = function() {
        return ea.event.wheelDelta
      }, "mousewheel") : (Fa = function() {
        return -ea.event.detail
      }, "MozMousePixelScroll")), t.event = function(t) {
        t.each(function() {
          var t = R.of(this, arguments),
            n = k;
          Ls ? ea.select(this).transition().each("start.zoom", function() {
            k = this.__chart__ || {
              x: 0,
              y: 0,
              k: 1
            }, s(t)
          }).tween("zoom:zoom", function() {
            var e = E[0],
              r = E[1],
              i = v ? v[0] : e / 2,
              o = v ? v[1] : r / 2,
              a = ea.interpolateZoom([(i - k.x) / k.k, (o - k.y) / k.k, e / k.k], [(i - n.x) / n.k, (o - n.y) / n.k, e / n.k]);
            return function(n) {
              var r = a(n),
                u = e / r[2];
              this.__chart__ = k = {
                x: i - r[0] * u,
                y: o - r[1] * u,
                k: u
              }, c(t)
            }
          }).each("interrupt.zoom", function() {
            l(t)
          }).each("end.zoom", function() {
            l(t)
          }) : (this.__chart__ = k, s(t), c(t), l(t))
        })
      }, t.translate = function(n) {
        return arguments.length ? (k = {
          x: +n[0],
          y: +n[1],
          k: k.k
        }, u(), t) : [k.x, k.y]
      }, t.scale = function(n) {
        return arguments.length ? (k = {
          x: k.x,
          y: k.y,
          k: +n
        }, u(), t) : k.k
      }, t.scaleExtent = function(n) {
        return arguments.length ? (C = null == n ? Ba : [+n[0], +n[1]], t) : C
      }, t.center = function(n) {
        return arguments.length ? (m = n && [+n[0], +n[1]], t) : m
      }, t.size = function(n) {
        return arguments.length ? (E = n && [+n[0], +n[1]], t) : E
      }, t.duration = function(n) {
        return arguments.length ? (T = +n, t) : T
      }, t.x = function(n) {
        return arguments.length ? (A = n, w = n.copy(), k = {
          x: 0,
          y: 0,
          k: 1
        }, t) : A
      }, t.y = function(n) {
        return arguments.length ? (_ = n, x = n.copy(), k = {
          x: 0,
          y: 0,
          k: 1
        }, t) : _
      }, ea.rebind(t, R, "on")
    };
    var Fa, Ha, Ba = [0, 1 / 0];
    ea.color = at, at.prototype.toString = function() {
      return this.rgb() + ""
    }, ea.hsl = ut;
    var Wa = ut.prototype = new at;
    Wa.brighter = function(t) {
      return t = Math.pow(.7, arguments.length ? t : 1), new ut(this.h, this.s, this.l / t)
    }, Wa.darker = function(t) {
      return t = Math.pow(.7, arguments.length ? t : 1), new ut(this.h, this.s, t * this.l)
    }, Wa.rgb = function() {
      return st(this.h, this.s, this.l)
    }, ea.hcl = ct;
    var $a = ct.prototype = new at;
    $a.brighter = function(t) {
      return new ct(this.h, this.c, Math.min(100, this.l + Xa * (arguments.length ? t : 1)))
    }, $a.darker = function(t) {
      return new ct(this.h, this.c, Math.max(0, this.l - Xa * (arguments.length ? t : 1)))
    }, $a.rgb = function() {
      return lt(this.h, this.c, this.l).rgb()
    }, ea.lab = ft;
    var Xa = 18,
      Va = .95047,
      Ya = 1,
      Ga = 1.08883,
      Qa = ft.prototype = new at;
    Qa.brighter = function(t) {
      return new ft(Math.min(100, this.l + Xa * (arguments.length ? t : 1)), this.a, this.b)
    }, Qa.darker = function(t) {
      return new ft(Math.max(0, this.l - Xa * (arguments.length ? t : 1)), this.a, this.b)
    }, Qa.rgb = function() {
      return ht(this.l, this.a, this.b)
    }, ea.rgb = mt;
    var Ja = mt.prototype = new at;
    Ja.brighter = function(t) {
      t = Math.pow(.7, arguments.length ? t : 1);
      var n = this.r,
        e = this.g,
        r = this.b,
        i = 30;
      return n || e || r ? (n && i > n && (n = i), e && i > e && (e = i), r && i > r && (r = i), new mt(Math.min(255, n / t), Math.min(255, e / t), Math.min(255, r / t))) : new mt(i, i, i)
    }, Ja.darker = function(t) {
      return t = Math.pow(.7, arguments.length ? t : 1), new mt(t * this.r, t * this.g, t * this.b)
    }, Ja.hsl = function() {
      return xt(this.r, this.g, this.b)
    }, Ja.toString = function() {
      return "#" + wt(this.r) + wt(this.g) + wt(this.b)
    };
    var Za = ea.map({
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    });
    Za.forEach(function(t, n) {
      Za.set(t, yt(n))
    }), ea.functor = St, ea.xhr = Et(y), ea.dsv = function(t, n) {
      function e(t, e, o) {
        arguments.length < 3 && (o = e, e = null);
        var a = Ct(t, n, null == e ? r : i(e), o);
        return a.row = function(t) {
          return arguments.length ? a.response(null == (e = t) ? r : i(t)) : e
        }, a
      }

      function r(t) {
        return e.parse(t.responseText)
      }

      function i(t) {
        return function(n) {
          return e.parse(n.responseText, t)
        }
      }

      function o(n) {
        return n.map(a).join(t)
      }

      function a(t) {
        return u.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t
      }
      var u = new RegExp('["' + t + "\n]"),
        s = t.charCodeAt(0);
      return e.parse = function(t, n) {
        var r;
        return e.parseRows(t, function(t, e) {
          if (r) return r(t, e - 1);
          var i = new Function("d", "return {" + t.map(function(t, n) {
            return JSON.stringify(t) + ": d[" + n + "]"
          }).join(",") + "}");
          r = n ? function(t, e) {
            return n(i(t), e)
          } : i
        })
      }, e.parseRows = function(t, n) {
        function e() {
          if (l >= c) return a;
          if (i) return i = !1, o;
          var n = l;
          if (34 === t.charCodeAt(n)) {
            for (var e = n; e++ < c;)
              if (34 === t.charCodeAt(e)) {
                if (34 !== t.charCodeAt(e + 1)) break;
                ++e
              }
            l = e + 2;
            var r = t.charCodeAt(e + 1);
            return 13 === r ? (i = !0, 10 === t.charCodeAt(e + 2) && ++l) : 10 === r && (i = !0), t.slice(n + 1, e).replace(/""/g, '"')
          }
          for (; c > l;) {
            var r = t.charCodeAt(l++),
              u = 1;
            if (10 === r) i = !0;
            else if (13 === r) i = !0, 10 === t.charCodeAt(l) && (++l, ++u);
            else if (r !== s) continue;
            return t.slice(n, l - u)
          }
          return t.slice(n)
        }
        for (var r, i, o = {}, a = {}, u = [], c = t.length, l = 0, f = 0;
          (r = e()) !== a;) {
          for (var h = []; r !== o && r !== a;) h.push(r), r = e();
          n && null == (h = n(h, f++)) || u.push(h)
        }
        return u
      }, e.format = function(n) {
        if (Array.isArray(n[0])) return e.formatRows(n);
        var r = new m,
          i = [];
        return n.forEach(function(t) {
          for (var n in t) r.has(n) || i.push(r.add(n))
        }), [i.map(a).join(t)].concat(n.map(function(n) {
          return i.map(function(t) {
            return a(n[t])
          }).join(t)
        })).join("\n")
      }, e.formatRows = function(t) {
        return t.map(o).join("\n")
      }, e
    }, ea.csv = ea.dsv(",", "text/csv"), ea.tsv = ea.dsv("  ", "text/tab-separated-values");
    var Ka, tu, nu, eu, ru, iu = this[w(this, "requestAnimationFrame")] || function(t) {
      setTimeout(t, 17)
    };
    ea.timer = function(t, n, e) {
      var r = arguments.length;
      2 > r && (n = 0), 3 > r && (e = Date.now());
      var i = e + n,
        o = {
          c: t,
          t: i,
          f: !1,
          n: null
        };
      tu ? tu.n = o : Ka = o, tu = o, nu || (eu = clearTimeout(eu), nu = 1, iu(Nt))
    }, ea.timer.flush = function() {
      Dt(), jt()
    }, ea.round = function(t, n) {
      return n ? Math.round(t * (n = Math.pow(10, n))) / n : Math.round(t)
    };
    var ou = ["y", "z", "a", "f", "p", "n", "Âµ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Rt);
    ea.formatPrefix = function(t, n) {
      var e = 0;
      return t && (0 > t && (t *= -1), n && (t = ea.round(t, Lt(t, n))), e = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))), ou[8 + e / 3]
    };
    var au = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
      uu = ea.map({
        b: function(t) {
          return t.toString(2)
        },
        c: function(t) {
          return String.fromCharCode(t)
        },
        o: function(t) {
          return t.toString(8)
        },
        x: function(t) {
          return t.toString(16)
        },
        X: function(t) {
          return t.toString(16).toUpperCase()
        },
        g: function(t, n) {
          return t.toPrecision(n)
        },
        e: function(t, n) {
          return t.toExponential(n)
        },
        f: function(t, n) {
          return t.toFixed(n)
        },
        r: function(t, n) {
          return (t = ea.round(t, Lt(t, n))).toFixed(Math.max(0, Math.min(20, Lt(t * (1 + 1e-15), n))))
        }
      }),
      su = ea.time = {},
      cu = Date;
    qt.prototype = {
      getDate: function() {
        return this._.getUTCDate()
      },
      getDay: function() {
        return this._.getUTCDay()
      },
      getFullYear: function() {
        return this._.getUTCFullYear()
      },
      getHours: function() {
        return this._.getUTCHours()
      },
      getMilliseconds: function() {
        return this._.getUTCMilliseconds()
      },
      getMinutes: function() {
        return this._.getUTCMinutes()
      },
      getMonth: function() {
        return this._.getUTCMonth()
      },
      getSeconds: function() {
        return this._.getUTCSeconds()
      },
      getTime: function() {
        return this._.getTime()
      },
      getTimezoneOffset: function() {
        return 0
      },
      valueOf: function() {
        return this._.valueOf()
      },
      setDate: function() {
        lu.setUTCDate.apply(this._, arguments)
      },
      setDay: function() {
        lu.setUTCDay.apply(this._, arguments)
      },
      setFullYear: function() {
        lu.setUTCFullYear.apply(this._, arguments)
      },
      setHours: function() {
        lu.setUTCHours.apply(this._, arguments)
      },
      setMilliseconds: function() {
        lu.setUTCMilliseconds.apply(this._, arguments)
      },
      setMinutes: function() {
        lu.setUTCMinutes.apply(this._, arguments)
      },
      setMonth: function() {
        lu.setUTCMonth.apply(this._, arguments)
      },
      setSeconds: function() {
        lu.setUTCSeconds.apply(this._, arguments)
      },
      setTime: function() {
        lu.setTime.apply(this._, arguments)
      }
    };
    var lu = Date.prototype;
    su.year = Ut(function(t) {
      return t = su.day(t), t.setMonth(0, 1), t
    }, function(t, n) {
      t.setFullYear(t.getFullYear() + n)
    }, function(t) {
      return t.getFullYear()
    }), su.years = su.year.range, su.years.utc = su.year.utc.range, su.day = Ut(function(t) {
      var n = new cu(2e3, 0);
      return n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), n
    }, function(t, n) {
      t.setDate(t.getDate() + n)
    }, function(t) {
      return t.getDate() - 1
    }), su.days = su.day.range, su.days.utc = su.day.utc.range, su.dayOfYear = function(t) {
      var n = su.year(t);
      return Math.floor((t - n - 6e4 * (t.getTimezoneOffset() - n.getTimezoneOffset())) / 864e5)
    }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(t, n) {
      n = 7 - n;
      var e = su[t] = Ut(function(t) {
        return (t = su.day(t)).setDate(t.getDate() - (t.getDay() + n) % 7), t
      }, function(t, n) {
        t.setDate(t.getDate() + 7 * Math.floor(n))
      }, function(t) {
        var e = su.year(t).getDay();
        return Math.floor((su.dayOfYear(t) + (e + n) % 7) / 7) - (e !== n)
      });
      su[t + "s"] = e.range, su[t + "s"].utc = e.utc.range, su[t + "OfYear"] = function(t) {
        var e = su.year(t).getDay();
        return Math.floor((su.dayOfYear(t) + (e + n) % 7) / 7)
      }
    }), su.week = su.sunday, su.weeks = su.sunday.range, su.weeks.utc = su.sunday.utc.range, su.weekOfYear = su.sundayOfYear;
    var fu = {
        "-": "",
        _: " ",
        0: "0"
      },
      hu = /^\s*\d+/,
      pu = /^%/;
    ea.locale = function(t) {
      return {
        numberFormat: Ot(t),
        timeFormat: Ft(t)
      }
    };
    var du = ea.locale({
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""],
      dateTime: "%a %b %e %X %Y",
      date: "%m/%d/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    ea.format = du.numberFormat, ea.geo = {}, cn.prototype = {
      s: 0,
      t: 0,
      add: function(t) {
        ln(t, this.t, gu), ln(gu.s, this.s, this), this.s ? this.t += gu.t : this.s = gu.t
      },
      reset: function() {
        this.s = this.t = 0
      },
      valueOf: function() {
        return this.s
      }
    };
    var gu = new cn;
    ea.geo.stream = function(t, n) {
      t && vu.hasOwnProperty(t.type) ? vu[t.type](t, n) : fn(t, n)
    };
    var vu = {
        Feature: function(t, n) {
          fn(t.geometry, n)
        },
        FeatureCollection: function(t, n) {
          for (var e = t.features, r = -1, i = e.length; ++r < i;) fn(e[r].geometry, n)
        }
      },
      mu = {
        Sphere: function(t, n) {
          n.sphere()
        },
        Point: function(t, n) {
          t = t.coordinates, n.point(t[0], t[1], t[2])
        },
        MultiPoint: function(t, n) {
          for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) t = e[r], n.point(t[0], t[1], t[2])
        },
        LineString: function(t, n) {
          hn(t.coordinates, n, 0)
        },
        MultiLineString: function(t, n) {
          for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) hn(e[r], n, 0)
        },
        Polygon: function(t, n) {
          pn(t.coordinates, n)
        },
        MultiPolygon: function(t, n) {
          for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) pn(e[r], n)
        },
        GeometryCollection: function(t, n) {
          for (var e = t.geometries, r = -1, i = e.length; ++r < i;) fn(e[r], n)
        }
      };
    ea.geo.area = function(t) {
      return yu = 0, ea.geo.stream(t, wu), yu
    };
    var yu, bu = new cn,
      wu = {
        sphere: function() {
          yu += 4 * Da
        },
        point: A,
        lineStart: A,
        lineEnd: A,
        polygonStart: function() {
          bu.reset(), wu.lineStart = dn
        },
        polygonEnd: function() {
          var t = 2 * bu;
          yu += 0 > t ? 4 * Da + t : t, wu.lineStart = wu.lineEnd = wu.point = A
        }
      };
    ea.geo.bounds = function() {
      function t(t, n) {
        b.push(w = [l = t, h = t]), f > n && (f = n), n > p && (p = n)
      }

      function n(n, e) {
        var r = gn([n * Oa, e * Oa]);
        if (m) {
          var i = mn(m, r),
            o = [i[1], -i[0], 0],
            a = mn(o, i);
          wn(a), a = An(a);
          var s = n - d,
            c = s > 0 ? 1 : -1,
            g = a[0] * Ia * c,
            v = da(s) > 180;
          if (v ^ (g > c * d && c * n > g)) {
            var y = a[1] * Ia;
            y > p && (p = y)
          } else if (g = (g + 360) % 360 - 180, v ^ (g > c * d && c * n > g)) {
            var y = -a[1] * Ia;
            f > y && (f = y)
          } else f > e && (f = e), e > p && (p = e);
          v ? d > n ? u(l, n) > u(l, h) && (h = n) : u(n, h) > u(l, h) && (l = n) : h >= l ? (l > n && (l = n), n > h && (h = n)) : n > d ? u(l, n) > u(l, h) && (h = n) : u(n, h) > u(l, h) && (l = n)
        } else t(n, e);
        m = r, d = n
      }

      function e() {
        A.point = n
      }

      function r() {
        w[0] = l, w[1] = h, A.point = t, m = null
      }

      function i(t, e) {
        if (m) {
          var r = t - d;
          y += da(r) > 180 ? r + (r > 0 ? 360 : -360) : r
        } else g = t, v = e;
        wu.point(t, e), n(t, e)
      }

      function o() {
        wu.lineStart()
      }

      function a() {
        i(g, v), wu.lineEnd(), da(y) > Pa && (l = -(h = 180)), w[0] = l, w[1] = h, m = null
      }

      function u(t, n) {
        return (n -= t) < 0 ? n + 360 : n
      }

      function s(t, n) {
        return t[0] - n[0]
      }

      function c(t, n) {
        return n[0] <= n[1] ? n[0] <= t && t <= n[1] : t < n[0] || n[1] < t
      }
      var l, f, h, p, d, g, v, m, y, b, w, A = {
        point: t,
        lineStart: e,
        lineEnd: r,
        polygonStart: function() {
          A.point = i, A.lineStart = o, A.lineEnd = a, y = 0, wu.polygonStart()
        },
        polygonEnd: function() {
          wu.polygonEnd(), A.point = t, A.lineStart = e, A.lineEnd = r, 0 > bu ? (l = -(h = 180), f = -(p = 90)) : y > Pa ? p = 90 : -Pa > y && (f = -90), w[0] = l, w[1] = h
        }
      };
      return function(t) {
        p = h = -(l = f = 1 / 0), b = [], ea.geo.stream(t, A);
        var n = b.length;
        if (n) {
          b.sort(s);
          for (var e, r = 1, i = b[0], o = [i]; n > r; ++r) e = b[r], c(e[0], i) || c(e[1], i) ? (u(i[0], e[1]) > u(i[0], i[1]) && (i[1] = e[1]), u(e[0], i[1]) > u(i[0], i[1]) && (i[0] = e[0])) : o.push(i = e);
          for (var a, e, d = -(1 / 0), n = o.length - 1, r = 0, i = o[n]; n >= r; i = e, ++r) e = o[r], (a = u(i[1], e[0])) > d && (d = a, l = e[0], h = i[1])
        }
        return b = w = null, l === 1 / 0 || f === 1 / 0 ? [
          [0 / 0, 0 / 0],
          [0 / 0, 0 / 0]
        ] : [
          [l, f],
          [h, p]
        ]
      }
    }(), ea.geo.centroid = function(t) {
      Au = xu = _u = Mu = ku = Su = Eu = Cu = Tu = Pu = Nu = 0, ea.geo.stream(t, Du);
      var n = Tu,
        e = Pu,
        r = Nu,
        i = n * n + e * e + r * r;
      return Na > i && (n = Su, e = Eu, r = Cu, Pa > xu && (n = _u, e = Mu, r = ku), i = n * n + e * e + r * r, Na > i) ? [0 / 0, 0 / 0] : [Math.atan2(e, n) * Ia, nt(r / Math.sqrt(i)) * Ia]
    };
    var Au, xu, _u, Mu, ku, Su, Eu, Cu, Tu, Pu, Nu, Du = {
        sphere: A,
        point: _n,
        lineStart: kn,
        lineEnd: Sn,
        polygonStart: function() {
          Du.lineStart = En
        },
        polygonEnd: function() {
          Du.lineStart = kn
        }
      },
      ju = jn(Tn, In, Un, [-Da, -Da / 2]),
      Lu = 1e9;
    ea.geo.clipExtent = function() {
      var t, n, e, r, i, o, a = {
        stream: function(t) {
          return i && (i.valid = !1), i = o(t), i.valid = !0, i
        },
        extent: function(u) {
          return arguments.length ? (o = Bn(t = +u[0][0], n = +u[0][1], e = +u[1][0], r = +u[1][1]), i && (i.valid = !1, i = null), a) : [
            [t, n],
            [e, r]
          ]
        }
      };
      return a.extent([
        [0, 0],
        [960, 500]
      ])
    }, (ea.geo.conicEqualArea = function() {
      return Wn($n)
    }).raw = $n, ea.geo.albers = function() {
      return ea.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, ea.geo.albersUsa = function() {
      function t(t) {
        var o = t[0],
          a = t[1];
        return n = null, e(o, a), n || (r(o, a), n) || i(o, a), n
      }
      var n, e, r, i, o = ea.geo.albers(),
        a = ea.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
        u = ea.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
        s = {
          point: function(t, e) {
            n = [t, e]
          }
        };
      return t.invert = function(t) {
        var n = o.scale(),
          e = o.translate(),
          r = (t[0] - e[0]) / n,
          i = (t[1] - e[1]) / n;
        return (i >= .12 && .234 > i && r >= -.425 && -.214 > r ? a : i >= .166 && .234 > i && r >= -.214 && -.115 > r ? u : o).invert(t)
      }, t.stream = function(t) {
        var n = o.stream(t),
          e = a.stream(t),
          r = u.stream(t);
        return {
          point: function(t, i) {
            n.point(t, i), e.point(t, i), r.point(t, i)
          },
          sphere: function() {
            n.sphere(), e.sphere(), r.sphere()
          },
          lineStart: function() {
            n.lineStart(), e.lineStart(), r.lineStart()
          },
          lineEnd: function() {
            n.lineEnd(), e.lineEnd(), r.lineEnd()
          },
          polygonStart: function() {
            n.polygonStart(), e.polygonStart(), r.polygonStart()
          },
          polygonEnd: function() {
            n.polygonEnd(), e.polygonEnd(), r.polygonEnd()
          }
        }
      }, t.precision = function(n) {
        return arguments.length ? (o.precision(n), a.precision(n), u.precision(n), t) : o.precision()
      }, t.scale = function(n) {
        return arguments.length ? (o.scale(n), a.scale(.35 * n), u.scale(n), t.translate(o.translate())) : o.scale()
      }, t.translate = function(n) {
        if (!arguments.length) return o.translate();
        var c = o.scale(),
          l = +n[0],
          f = +n[1];
        return e = o.translate(n).clipExtent([
          [l - .455 * c, f - .238 * c],
          [l + .455 * c, f + .238 * c]
        ]).stream(s).point, r = a.translate([l - .307 * c, f + .201 * c]).clipExtent([
          [l - .425 * c + Pa, f + .12 * c + Pa],
          [l - .214 * c - Pa, f + .234 * c - Pa]
        ]).stream(s).point, i = u.translate([l - .205 * c, f + .212 * c]).clipExtent([
          [l - .214 * c + Pa, f + .166 * c + Pa],
          [l - .115 * c - Pa, f + .234 * c - Pa]
        ]).stream(s).point, t
      }, t.scale(1070)
    };
    var Ru, Ou, Iu, qu, Uu, zu, Fu = {
        point: A,
        lineStart: A,
        lineEnd: A,
        polygonStart: function() {
          Ou = 0, Fu.lineStart = Xn
        },
        polygonEnd: function() {
          Fu.lineStart = Fu.lineEnd = Fu.point = A, Ru += da(Ou / 2)
        }
      },
      Hu = {
        point: Vn,
        lineStart: A,
        lineEnd: A,
        polygonStart: A,
        polygonEnd: A
      },
      Bu = {
        point: Qn,
        lineStart: Jn,
        lineEnd: Zn,
        polygonStart: function() {
          Bu.lineStart = Kn
        },
        polygonEnd: function() {
          Bu.point = Qn, Bu.lineStart = Jn, Bu.lineEnd = Zn
        }
      };
    ea.geo.path = function() {
      function t(t) {
        return t && ("function" == typeof u && o.pointRadius(+u.apply(this, arguments)), a && a.valid || (a = i(o)), ea.geo.stream(t, a)), o.result()
      }

      function n() {
        return a = null, t
      }
      var e, r, i, o, a, u = 4.5;
      return t.area = function(t) {
        return Ru = 0, ea.geo.stream(t, i(Fu)), Ru
      }, t.centroid = function(t) {
        return _u = Mu = ku = Su = Eu = Cu = Tu = Pu = Nu = 0, ea.geo.stream(t, i(Bu)), Nu ? [Tu / Nu, Pu / Nu] : Cu ? [Su / Cu, Eu / Cu] : ku ? [_u / ku, Mu / ku] : [0 / 0, 0 / 0]
      }, t.bounds = function(t) {
        return Uu = zu = -(Iu = qu = 1 / 0), ea.geo.stream(t, i(Hu)), [
          [Iu, qu],
          [Uu, zu]
        ]
      }, t.projection = function(t) {
        return arguments.length ? (i = (e = t) ? t.stream || ee(t) : y, n()) : e
      }, t.context = function(t) {
        return arguments.length ? (o = null == (r = t) ? new Yn : new te(t), "function" != typeof u && o.pointRadius(u), n()) : r
      }, t.pointRadius = function(n) {
        return arguments.length ? (u = "function" == typeof n ? n : (o.pointRadius(+n), +n), t) : u
      }, t.projection(ea.geo.albersUsa()).context(null)
    }, ea.geo.transform = function(t) {
      return {
        stream: function(n) {
          var e = new re(n);
          for (var r in t) e[r] = t[r];
          return e
        }
      }
    }, re.prototype = {
      point: function(t, n) {
        this.stream.point(t, n)
      },
      sphere: function() {
        this.stream.sphere()
      },
      lineStart: function() {
        this.stream.lineStart()
      },
      lineEnd: function() {
        this.stream.lineEnd()
      },
      polygonStart: function() {
        this.stream.polygonStart()
      },
      polygonEnd: function() {
        this.stream.polygonEnd()
      }
    }, ea.geo.projection = oe, ea.geo.projectionMutator = ae, (ea.geo.equirectangular = function() {
      return oe(se)
    }).raw = se.invert = se, ea.geo.rotation = function(t) {
      function n(n) {
        return n = t(n[0] * Oa, n[1] * Oa), n[0] *= Ia, n[1] *= Ia, n
      }
      return t = le(t[0] % 360 * Oa, t[1] * Oa, t.length > 2 ? t[2] * Oa : 0), n.invert = function(n) {
        return n = t.invert(n[0] * Oa, n[1] * Oa), n[0] *= Ia, n[1] *= Ia, n
      }, n
    }, ce.invert = se, ea.geo.circle = function() {
      function t() {
        var t = "function" == typeof r ? r.apply(this, arguments) : r,
          n = le(-t[0] * Oa, -t[1] * Oa, 0).invert,
          i = [];
        return e(null, null, 1, {
          point: function(t, e) {
            i.push(t = n(t, e)), t[0] *= Ia, t[1] *= Ia
          }
        }), {
          type: "Polygon",
          coordinates: [i]
        }
      }
      var n, e, r = [0, 0],
        i = 6;
      return t.origin = function(n) {
        return arguments.length ? (r = n, t) : r
      }, t.angle = function(r) {
        return arguments.length ? (e = de((n = +r) * Oa, i * Oa), t) : n
      }, t.precision = function(r) {
        return arguments.length ? (e = de(n * Oa, (i = +r) * Oa), t) : i
      }, t.angle(90)
    }, ea.geo.distance = function(t, n) {
      var e, r = (n[0] - t[0]) * Oa,
        i = t[1] * Oa,
        o = n[1] * Oa,
        a = Math.sin(r),
        u = Math.cos(r),
        s = Math.sin(i),
        c = Math.cos(i),
        l = Math.sin(o),
        f = Math.cos(o);
      return Math.atan2(Math.sqrt((e = f * a) * e + (e = c * l - s * f * u) * e), s * l + c * f * u)
    }, ea.geo.graticule = function() {
      function t() {
        return {
          type: "MultiLineString",
          coordinates: n()
        }
      }

      function n() {
        return ea.range(Math.ceil(o / v) * v, i, v).map(h).concat(ea.range(Math.ceil(c / m) * m, s, m).map(p)).concat(ea.range(Math.ceil(r / d) * d, e, d).filter(function(t) {
          return da(t % v) > Pa
        }).map(l)).concat(ea.range(Math.ceil(u / g) * g, a, g).filter(function(t) {
          return da(t % m) > Pa
        }).map(f))
      }
      var e, r, i, o, a, u, s, c, l, f, h, p, d = 10,
        g = d,
        v = 90,
        m = 360,
        y = 2.5;
      return t.lines = function() {
        return n().map(function(t) {
          return {
            type: "LineString",
            coordinates: t
          }
        })
      }, t.outline = function() {
        return {
          type: "Polygon",
          coordinates: [h(o).concat(p(s).slice(1), h(i).reverse().slice(1), p(c).reverse().slice(1))]
        }
      }, t.extent = function(n) {
        return arguments.length ? t.majorExtent(n).minorExtent(n) : t.minorExtent()
      }, t.majorExtent = function(n) {
        return arguments.length ? (o = +n[0][0], i = +n[1][0], c = +n[0][1], s = +n[1][1], o > i && (n = o, o = i, i = n), c > s && (n = c, c = s, s = n), t.precision(y)) : [
          [o, c],
          [i, s]
        ]
      }, t.minorExtent = function(n) {
        return arguments.length ? (r = +n[0][0], e = +n[1][0], u = +n[0][1], a = +n[1][1], r > e && (n = r, r = e, e = n), u > a && (n = u, u = a, a = n), t.precision(y)) : [
          [r, u],
          [e, a]
        ]
      }, t.step = function(n) {
        return arguments.length ? t.majorStep(n).minorStep(n) : t.minorStep()
      }, t.majorStep = function(n) {
        return arguments.length ? (v = +n[0], m = +n[1], t) : [v, m]
      }, t.minorStep = function(n) {
        return arguments.length ? (d = +n[0], g = +n[1], t) : [d, g]
      }, t.precision = function(n) {
        return arguments.length ? (y = +n, l = ve(u, a, 90), f = me(r, e, y), h = ve(c, s, 90), p = me(o, i, y), t) : y
      }, t.majorExtent([
        [-180, -90 + Pa],
        [180, 90 - Pa]
      ]).minorExtent([
        [-180, -80 - Pa],
        [180, 80 + Pa]
      ])
    }, ea.geo.greatArc = function() {
      function t() {
        return {
          type: "LineString",
          coordinates: [n || r.apply(this, arguments), e || i.apply(this, arguments)]
        }
      }
      var n, e, r = ye,
        i = be;
      return t.distance = function() {
        return ea.geo.distance(n || r.apply(this, arguments), e || i.apply(this, arguments))
      }, t.source = function(e) {
        return arguments.length ? (r = e, n = "function" == typeof e ? null : e, t) : r
      }, t.target = function(n) {
        return arguments.length ? (i = n, e = "function" == typeof n ? null : n, t) : i
      }, t.precision = function() {
        return arguments.length ? t : 0
      }, t
    }, ea.geo.interpolate = function(t, n) {
      return we(t[0] * Oa, t[1] * Oa, n[0] * Oa, n[1] * Oa)
    }, ea.geo.length = function(t) {
      return Wu = 0, ea.geo.stream(t, $u), Wu
    };
    var Wu, $u = {
        sphere: A,
        point: A,
        lineStart: Ae,
        lineEnd: A,
        polygonStart: A,
        polygonEnd: A
      },
      Xu = xe(function(t) {
        return Math.sqrt(2 / (1 + t))
      }, function(t) {
        return 2 * Math.asin(t / 2)
      });
    (ea.geo.azimuthalEqualArea = function() {
      return oe(Xu)
    }).raw = Xu;
    var Vu = xe(function(t) {
      var n = Math.acos(t);
      return n && n / Math.sin(n)
    }, y);
    (ea.geo.azimuthalEquidistant = function() {
      return oe(Vu)
    }).raw = Vu, (ea.geo.conicConformal = function() {
      return Wn(_e)
    }).raw = _e, (ea.geo.conicEquidistant = function() {
      return Wn(Me)
    }).raw = Me;
    var Yu = xe(function(t) {
      return 1 / t
    }, Math.atan);
    (ea.geo.gnomonic = function() {
      return oe(Yu)
    }).raw = Yu, ke.invert = function(t, n) {
      return [t, 2 * Math.atan(Math.exp(n)) - Ra]
    }, (ea.geo.mercator = function() {
      return Se(ke)
    }).raw = ke;
    var Gu = xe(function() {
      return 1
    }, Math.asin);
    (ea.geo.orthographic = function() {
      return oe(Gu)
    }).raw = Gu;
    var Qu = xe(function(t) {
      return 1 / (1 + t)
    }, function(t) {
      return 2 * Math.atan(t)
    });
    (ea.geo.stereographic = function() {
      return oe(Qu)
    }).raw = Qu, Ee.invert = function(t, n) {
      return [-n, 2 * Math.atan(Math.exp(t)) - Ra]
    }, (ea.geo.transverseMercator = function() {
      var t = Se(Ee),
        n = t.center,
        e = t.rotate;
      return t.center = function(t) {
        return t ? n([-t[1], t[0]]) : (t = n(), [t[1], -t[0]])
      }, t.rotate = function(t) {
        return t ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : (t = e(), [t[0], t[1], t[2] - 90])
      }, e([0, 0, 90])
    }).raw = Ee, ea.geom = {}, ea.geom.hull = function(t) {
      function n(t) {
        if (t.length < 3) return [];
        var n, i = St(e),
          o = St(r),
          a = t.length,
          u = [],
          s = [];
        for (n = 0; a > n; n++) u.push([+i.call(this, t[n], n), +o.call(this, t[n], n), n]);
        for (u.sort(Ne), n = 0; a > n; n++) s.push([u[n][0], -u[n][1]]);
        var c = Pe(u),
          l = Pe(s),
          f = l[0] === c[0],
          h = l[l.length - 1] === c[c.length - 1],
          p = [];
        for (n = c.length - 1; n >= 0; --n) p.push(t[u[c[n]][2]]);
        for (n = +f; n < l.length - h; ++n) p.push(t[u[l[n]][2]]);
        return p
      }
      var e = Ce,
        r = Te;
      return arguments.length ? n(t) : (n.x = function(t) {
        return arguments.length ? (e = t, n) : e
      }, n.y = function(t) {
        return arguments.length ? (r = t, n) : r
      }, n)
    }, ea.geom.polygon = function(t) {
      return ba(t, Ju), t
    };
    var Ju = ea.geom.polygon.prototype = [];
    Ju.area = function() {
      for (var t, n = -1, e = this.length, r = this[e - 1], i = 0; ++n < e;) t = r, r = this[n], i += t[1] * r[0] - t[0] * r[1];
      return .5 * i
    }, Ju.centroid = function(t) {
      var n, e, r = -1,
        i = this.length,
        o = 0,
        a = 0,
        u = this[i - 1];
      for (arguments.length || (t = -1 / (6 * this.area())); ++r < i;) n = u, u = this[r], e = n[0] * u[1] - u[0] * n[1], o += (n[0] + u[0]) * e, a += (n[1] + u[1]) * e;
      return [o * t, a * t]
    }, Ju.clip = function(t) {
      for (var n, e, r, i, o, a, u = Le(t), s = -1, c = this.length - Le(this), l = this[c - 1]; ++s < c;) {
        for (n = t.slice(), t.length = 0, i = this[s], o = n[(r = n.length - u) - 1], e = -1; ++e < r;) a = n[e], De(a, l, i) ? (De(o, l, i) || t.push(je(o, a, l, i)), t.push(a)) : De(o, l, i) && t.push(je(o, a, l, i)), o = a;
        u && t.push(t[0]), l = i
      }
      return t
    };
    var Zu, Ku, ts, ns, es, rs = [],
      is = [];
    He.prototype.prepare = function() {
      for (var t, n = this.edges, e = n.length; e--;) t = n[e].edge, t.b && t.a || n.splice(e, 1);
      return n.sort(We), n.length
    }, tr.prototype = {
      start: function() {
        return this.edge.l === this.site ? this.edge.a : this.edge.b
      },
      end: function() {
        return this.edge.l === this.site ? this.edge.b : this.edge.a
      }
    }, nr.prototype = {
      insert: function(t, n) {
        var e, r, i;
        if (t) {
          if (n.P = t, n.N = t.N, t.N && (t.N.P = n), t.N = n, t.R) {
            for (t = t.R; t.L;) t = t.L;
            t.L = n
          } else t.R = n;
          e = t
        } else this._ ? (t = or(this._), n.P = null, n.N = t, t.P = t.L = n, e = t) : (n.P = n.N = null, this._ = n, e = null);
        for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C;) r = e.U, e === r.L ? (i = r.R, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.R && (rr(this, e), t = e, e = t.U), e.C = !1, r.C = !0, ir(this, r))) : (i = r.L, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.L && (ir(this, e), t = e, e = t.U), e.C = !1, r.C = !0, rr(this, r))), e = t.U;
        this._.C = !1
      },
      remove: function(t) {
        t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
        var n, e, r, i = t.U,
          o = t.L,
          a = t.R;
        if (e = o ? a ? or(a) : o : a, i ? i.L === t ? i.L = e : i.R = e : this._ = e, o && a ? (r = e.C, e.C = t.C, e.L = o, o.U = e, e !== a ? (i = e.U, e.U = t.U, t = e.R, i.L = t, e.R = a, a.U = e) : (e.U = i, i = e, t = e.R)) : (r = t.C, t = e), t && (t.U = i), !r) {
          if (t && t.C) return void(t.C = !1);
          do {
            if (t === this._) break;
            if (t === i.L) {
              if (n = i.R, n.C && (n.C = !1, i.C = !0, rr(this, i), n = i.R), n.L && n.L.C || n.R && n.R.C) {
                n.R && n.R.C || (n.L.C = !1, n.C = !0, ir(this, n), n = i.R), n.C = i.C, i.C = n.R.C = !1, rr(this, i), t = this._;
                break
              }
            } else if (n = i.L, n.C && (n.C = !1, i.C = !0, ir(this, i), n = i.L), n.L && n.L.C || n.R && n.R.C) {
              n.L && n.L.C || (n.R.C = !1, n.C = !0, rr(this, n), n = i.L), n.C = i.C, i.C = n.L.C = !1, ir(this, i), t = this._;
              break
            }
            n.C = !0, t = i, i = i.U
          } while (!t.C);
          t && (t.C = !1)
        }
      }
    }, ea.geom.voronoi = function(t) {
      function n(t) {
        var n = new Array(t.length),
          r = u[0][0],
          i = u[0][1],
          o = u[1][0],
          a = u[1][1];
        return ar(e(t), u).cells.forEach(function(e, u) {
          var s = e.edges,
            c = e.site,
            l = n[u] = s.length ? s.map(function(t) {
              var n = t.start();
              return [n.x, n.y]
            }) : c.x >= r && c.x <= o && c.y >= i && c.y <= a ? [
              [r, a],
              [o, a],
              [o, i],
              [r, i]
            ] : [];
          l.point = t[u]
        }), n
      }

      function e(t) {
        return t.map(function(t, n) {
          return {
            x: Math.round(o(t, n) / Pa) * Pa,
            y: Math.round(a(t, n) / Pa) * Pa,
            i: n
          }
        })
      }
      var r = Ce,
        i = Te,
        o = r,
        a = i,
        u = os;
      return t ? n(t) : (n.links = function(t) {
        return ar(e(t)).edges.filter(function(t) {
          return t.l && t.r
        }).map(function(n) {
          return {
            source: t[n.l.i],
            target: t[n.r.i]
          }
        })
      }, n.triangles = function(t) {
        var n = [];
        return ar(e(t)).cells.forEach(function(e, r) {
          for (var i, o, a = e.site, u = e.edges.sort(We), s = -1, c = u.length, l = u[c - 1].edge, f = l.l === a ? l.r : l.l; ++s < c;) i = l, o = f, l = u[s].edge, f = l.l === a ? l.r : l.l, r < o.i && r < f.i && sr(a, o, f) < 0 && n.push([t[r], t[o.i], t[f.i]])
        }), n
      }, n.x = function(t) {
        return arguments.length ? (o = St(r = t), n) : r
      }, n.y = function(t) {
        return arguments.length ? (a = St(i = t), n) : i
      }, n.clipExtent = function(t) {
        return arguments.length ? (u = null == t ? os : t, n) : u === os ? null : u
      }, n.size = function(t) {
        return arguments.length ? n.clipExtent(t && [
          [0, 0], t
        ]) : u === os ? null : u && u[1]
      }, n)
    };
    var os = [
      [-1e6, -1e6],
      [1e6, 1e6]
    ];
    ea.geom.delaunay = function(t) {
      return ea.geom.voronoi().triangles(t)
    }, ea.geom.quadtree = function(t, n, e, r, i) {
      function o(t) {
        function o(t, n, e, r, i, o, a, u) {
          if (!isNaN(e) && !isNaN(r))
            if (t.leaf) {
              var s = t.x,
                l = t.y;
              if (null != s)
                if (da(s - e) + da(l - r) < .01) c(t, n, e, r, i, o, a, u);
                else {
                  var f = t.point;
                  t.x = t.y = t.point = null, c(t, f, s, l, i, o, a, u), c(t, n, e, r, i, o, a, u)
                } else t.x = e, t.y = r, t.point = n
            } else c(t, n, e, r, i, o, a, u)
        }

        function c(t, n, e, r, i, a, u, s) {
          var c = .5 * (i + u),
            l = .5 * (a + s),
            f = e >= c,
            h = r >= l,
            p = h << 1 | f;
          t.leaf = !1, t = t.nodes[p] || (t.nodes[p] = fr()), f ? i = c : u = c, h ? a = l : s = l, o(t, n, e, r, i, a, u, s)
        }
        var l, f, h, p, d, g, v, m, y, b = St(u),
          w = St(s);
        if (null != n) g = n, v = e, m = r, y = i;
        else if (m = y = -(g = v = 1 / 0), f = [], h = [], d = t.length, a)
          for (p = 0; d > p; ++p) l = t[p], l.x < g && (g = l.x), l.y < v && (v = l.y), l.x > m && (m = l.x), l.y > y && (y = l.y), f.push(l.x), h.push(l.y);
        else
          for (p = 0; d > p; ++p) {
            var A = +b(l = t[p], p),
              x = +w(l, p);
            g > A && (g = A), v > x && (v = x), A > m && (m = A), x > y && (y = x), f.push(A), h.push(x)
          }
        var _ = m - g,
          M = y - v;
        _ > M ? y = v + _ : m = g + M;
        var k = fr();
        if (k.add = function(t) {
            o(k, t, +b(t, ++p), +w(t, p), g, v, m, y)
          }, k.visit = function(t) {
            hr(t, k, g, v, m, y)
          }, k.find = function(t) {
            return pr(k, t[0], t[1], g, v, m, y)
          }, p = -1, null == n) {
          for (; ++p < d;) o(k, t[p], f[p], h[p], g, v, m, y);
          --p
        } else t.forEach(k.add);
        return f = h = t = l = null, k
      }
      var a, u = Ce,
        s = Te;
      return (a = arguments.length) ? (u = cr, s = lr, 3 === a && (i = e, r = n, e = n = 0), o(t)) : (o.x = function(t) {
        return arguments.length ? (u = t, o) : u
      }, o.y = function(t) {
        return arguments.length ? (s = t, o) : s
      }, o.extent = function(t) {
        return arguments.length ? (null == t ? n = e = r = i = null : (n = +t[0][0], e = +t[0][1], r = +t[1][0], i = +t[1][1]), o) : null == n ? null : [
          [n, e],
          [r, i]
        ]
      }, o.size = function(t) {
        return arguments.length ? (null == t ? n = e = r = i = null : (n = e = 0, r = +t[0], i = +t[1]), o) : null == n ? null : [r - n, i - e]
      }, o)
    }, ea.interpolateRgb = dr, ea.interpolateObject = gr, ea.interpolateNumber = vr, ea.interpolateString = mr;
    var as = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      us = new RegExp(as.source, "g");
    ea.interpolate = yr, ea.interpolators = [function(t, n) {
      var e = typeof n;
      return ("string" === e ? Za.has(n) || /^(#|rgb\(|hsl\()/.test(n) ? dr : mr : n instanceof at ? dr : Array.isArray(n) ? br : "object" === e && isNaN(n) ? gr : vr)(t, n)
    }], ea.interpolateArray = br;
    var ss = function() {
        return y
      },
      cs = ea.map({
        linear: ss,
        poly: Sr,
        quad: function() {
          return _r
        },
        cubic: function() {
          return Mr
        },
        sin: function() {
          return Er
        },
        exp: function() {
          return Cr
        },
        circle: function() {
          return Tr
        },
        elastic: Pr,
        back: Nr,
        bounce: function() {
          return Dr
        }
      }),
      ls = ea.map({
        "in": y,
        out: Ar,
        "in-out": xr,
        "out-in": function(t) {
          return xr(Ar(t))
        }
      });
    ea.ease = function(t) {
      var n = t.indexOf("-"),
        e = n >= 0 ? t.slice(0, n) : t,
        r = n >= 0 ? t.slice(n + 1) : "in";
      return e = cs.get(e) || ss, r = ls.get(r) || y, wr(r(e.apply(null, ra.call(arguments, 1))))
    }, ea.interpolateHcl = jr, ea.interpolateHsl = Lr, ea.interpolateLab = Rr, ea.interpolateRound = Or, ea.transform = function(t) {
      var n = oa.createElementNS(ea.ns.prefix.svg, "g");
      return (ea.transform = function(t) {
        if (null != t) {
          n.setAttribute("transform", t);
          var e = n.transform.baseVal.consolidate()
        }
        return new Ir(e ? e.matrix : fs)
      })(t)
    }, Ir.prototype.toString = function() {
      return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var fs = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0
    };
    ea.interpolateTransform = Fr, ea.layout = {}, ea.layout.bundle = function() {
      return function(t) {
        for (var n = [], e = -1, r = t.length; ++e < r;) n.push(Wr(t[e]));
        return n
      }
    }, ea.layout.chord = function() {
      function t() {
        var t, c, f, h, p, d = {},
          g = [],
          v = ea.range(o),
          m = [];
        for (e = [], r = [], t = 0, h = -1; ++h < o;) {
          for (c = 0, p = -1; ++p < o;) c += i[h][p];
          g.push(c), m.push(ea.range(o)), t += c
        }
        for (a && v.sort(function(t, n) {
            return a(g[t], g[n])
          }), u && m.forEach(function(t, n) {
            t.sort(function(t, e) {
              return u(i[n][t], i[n][e])
            })
          }), t = (ja - l * o) / t, c = 0, h = -1; ++h < o;) {
          for (f = c, p = -1; ++p < o;) {
            var y = v[h],
              b = m[y][p],
              w = i[y][b],
              A = c,
              x = c += w * t;
            d[y + "-" + b] = {
              index: y,
              subindex: b,
              startAngle: A,
              endAngle: x,
              value: w
            }
          }
          r[y] = {
            index: y,
            startAngle: f,
            endAngle: c,
            value: (c - f) / t
          }, c += l
        }
        for (h = -1; ++h < o;)
          for (p = h - 1; ++p < o;) {
            var _ = d[h + "-" + p],
              M = d[p + "-" + h];
            (_.value || M.value) && e.push(_.value < M.value ? {
              source: M,
              target: _
            } : {
              source: _,
              target: M
            })
          }
        s && n()
      }

      function n() {
        e.sort(function(t, n) {
          return s((t.source.value + t.target.value) / 2, (n.source.value + n.target.value) / 2)
        })
      }
      var e, r, i, o, a, u, s, c = {},
        l = 0;
      return c.matrix = function(t) {
        return arguments.length ? (o = (i = t) && i.length, e = r = null, c) : i
      }, c.padding = function(t) {
        return arguments.length ? (l = t, e = r = null, c) : l
      }, c.sortGroups = function(t) {
        return arguments.length ? (a = t, e = r = null, c) : a
      }, c.sortSubgroups = function(t) {
        return arguments.length ? (u = t, e = null, c) : u
      }, c.sortChords = function(t) {
        return arguments.length ? (s = t, e && n(), c) : s
      }, c.chords = function() {
        return e || t(), e
      }, c.groups = function() {
        return r || t(), r
      }, c
    }, ea.layout.force = function() {
      function t(t) {
        return function(n, e, r, i) {
          if (n.point !== t) {
            var o = n.cx - t.x,
              a = n.cy - t.y,
              u = i - e,
              s = o * o + a * a;
            if (s > u * u / v) {
              if (d > s) {
                var c = n.charge / s;
                t.px -= o * c, t.py -= a * c
              }
              return !0
            }
            if (n.point && s && d > s) {
              var c = n.pointCharge / s;
              t.px -= o * c, t.py -= a * c
            }
          }
          return !n.charge
        }
      }

      function n(t) {
        t.px = ea.event.x, t.py = ea.event.y, u.resume()
      }
      var e, r, i, o, a, u = {},
        s = ea.dispatch("start", "tick", "end"),
        c = [1, 1],
        l = .9,
        f = hs,
        h = ps,
        p = -30,
        d = ds,
        g = .1,
        v = .64,
        m = [],
        b = [];
      return u.tick = function() {
        if ((r *= .99) < .005) return s.end({
          type: "end",
          alpha: r = 0
        }), !0;
        var n, e, u, f, h, d, v, y, w, A = m.length,
          x = b.length;
        for (e = 0; x > e; ++e) u = b[e], f = u.source, h = u.target, y = h.x - f.x, w = h.y - f.y, (d = y * y + w * w) && (d = r * o[e] * ((d = Math.sqrt(d)) - i[e]) / d, y *= d, w *= d, h.x -= y * (v = f.weight / (h.weight + f.weight)), h.y -= w * v, f.x += y * (v = 1 - v), f.y += w * v);
        if ((v = r * g) && (y = c[0] / 2, w = c[1] / 2, e = -1, v))
          for (; ++e < A;) u = m[e], u.x += (y - u.x) * v, u.y += (w - u.y) * v;
        if (p)
          for (Jr(n = ea.geom.quadtree(m), r, a), e = -1; ++e < A;)(u = m[e]).fixed || n.visit(t(u));
        for (e = -1; ++e < A;) u = m[e], u.fixed ? (u.x = u.px, u.y = u.py) : (u.x -= (u.px - (u.px = u.x)) * l, u.y -= (u.py - (u.py = u.y)) * l);
        s.tick({
          type: "tick",
          alpha: r
        })
      }, u.nodes = function(t) {
        return arguments.length ? (m = t, u) : m
      }, u.links = function(t) {
        return arguments.length ? (b = t, u) : b
      }, u.size = function(t) {
        return arguments.length ? (c = t, u) : c
      }, u.linkDistance = function(t) {
        return arguments.length ? (f = "function" == typeof t ? t : +t, u) : f
      }, u.distance = u.linkDistance, u.linkStrength = function(t) {
        return arguments.length ? (h = "function" == typeof t ? t : +t, u) : h
      }, u.friction = function(t) {
        return arguments.length ? (l = +t, u) : l
      }, u.charge = function(t) {
        return arguments.length ? (p = "function" == typeof t ? t : +t, u) : p
      }, u.chargeDistance = function(t) {
        return arguments.length ? (d = t * t, u) : Math.sqrt(d)
      }, u.gravity = function(t) {
        return arguments.length ? (g = +t, u) : g
      }, u.theta = function(t) {
        return arguments.length ? (v = t * t, u) : Math.sqrt(v)
      }, u.alpha = function(t) {
        return arguments.length ? (t = +t, r ? r = t > 0 ? t : 0 : t > 0 && (s.start({
          type: "start",
          alpha: r = t
        }), ea.timer(u.tick)), u) : r
      }, u.start = function() {
        function t(t, r) {
          if (!e) {
            for (e = new Array(s), u = 0; s > u; ++u) e[u] = [];
            for (u = 0; l > u; ++u) {
              var i = b[u];
              e[i.source.index].push(i.target), e[i.target.index].push(i.source)
            }
          }
          for (var o, a = e[n], u = -1, c = a.length; ++u < c;)
            if (!isNaN(o = a[u][t])) return o;
          return Math.random() * r
        }
        var n, e, r, s = m.length,
          l = b.length,
          d = c[0],
          g = c[1];
        for (n = 0; s > n; ++n)(r = m[n]).index = n, r.weight = 0;
        for (n = 0; l > n; ++n) r = b[n], "number" == typeof r.source && (r.source = m[r.source]), "number" == typeof r.target && (r.target = m[r.target]), ++r.source.weight, ++r.target.weight;
        for (n = 0; s > n; ++n) r = m[n], isNaN(r.x) && (r.x = t("x", d)), isNaN(r.y) && (r.y = t("y", g)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
        if (i = [], "function" == typeof f)
          for (n = 0; l > n; ++n) i[n] = +f.call(this, b[n], n);
        else
          for (n = 0; l > n; ++n) i[n] = f;
        if (o = [], "function" == typeof h)
          for (n = 0; l > n; ++n) o[n] = +h.call(this, b[n], n);
        else
          for (n = 0; l > n; ++n) o[n] = h;
        if (a = [], "function" == typeof p)
          for (n = 0; s > n; ++n) a[n] = +p.call(this, m[n], n);
        else
          for (n = 0; s > n; ++n) a[n] = p;
        return u.resume()
      }, u.resume = function() {
        return u.alpha(.1)
      }, u.stop = function() {
        return u.alpha(0)
      }, u.drag = function() {
        return e || (e = ea.behavior.drag().origin(y).on("dragstart.force", Vr).on("drag.force", n).on("dragend.force", Yr)), arguments.length ? void this.on("mouseover.force", Gr).on("mouseout.force", Qr).call(e) : e
      }, ea.rebind(u, s, "on")
    };
    var hs = 20,
      ps = 1,
      ds = 1 / 0;
    ea.layout.hierarchy = function() {
      function t(i) {
        var o, a = [i],
          u = [];
        for (i.depth = 0; null != (o = a.pop());)
          if (u.push(o), (c = e.call(t, o, o.depth)) && (s = c.length)) {
            for (var s, c, l; --s >= 0;) a.push(l = c[s]), l.parent = o, l.depth = o.depth + 1;
            r && (o.value = 0), o.children = c
          } else r && (o.value = +r.call(t, o, o.depth) || 0), delete o.children;
        return ti(i, function(t) {
          var e, i;
          n && (e = t.children) && e.sort(n), r && (i = t.parent) && (i.value += t.value)
        }), u
      }
      var n = ri,
        e = ni,
        r = ei;
      return t.sort = function(e) {
        return arguments.length ? (n = e, t) : n
      }, t.children = function(n) {
        return arguments.length ? (e = n, t) : e
      }, t.value = function(n) {
        return arguments.length ? (r = n, t) : r
      }, t.revalue = function(n) {
        return r && (Kr(n, function(t) {
          t.children && (t.value = 0)
        }), ti(n, function(n) {
          var e;
          n.children || (n.value = +r.call(t, n, n.depth) || 0), (e = n.parent) && (e.value += n.value)
        })), n
      }, t
    }, ea.layout.partition = function() {
      function t(n, e, r, i) {
        var o = n.children;
        if (n.x = e, n.y = n.depth * i, n.dx = r, n.dy = i, o && (a = o.length)) {
          var a, u, s, c = -1;
          for (r = n.value ? r / n.value : 0; ++c < a;) t(u = o[c], e, s = u.value * r, i), e += s
        }
      }

      function n(t) {
        var e = t.children,
          r = 0;
        if (e && (i = e.length))
          for (var i, o = -1; ++o < i;) r = Math.max(r, n(e[o]));
        return 1 + r
      }

      function e(e, o) {
        var a = r.call(this, e, o);
        return t(a[0], 0, i[0], i[1] / n(a[0])), a
      }
      var r = ea.layout.hierarchy(),
        i = [1, 1];
      return e.size = function(t) {
        return arguments.length ? (i = t, e) : i
      }, Zr(e, r)
    }, ea.layout.pie = function() {
      function t(a) {
        var u, s = a.length,
          c = a.map(function(e, r) {
            return +n.call(t, e, r)
          }),
          l = +("function" == typeof r ? r.apply(this, arguments) : r),
          f = ("function" == typeof i ? i.apply(this, arguments) : i) - l,
          h = Math.min(Math.abs(f) / s, +("function" == typeof o ? o.apply(this, arguments) : o)),
          p = h * (0 > f ? -1 : 1),
          d = (f - s * p) / ea.sum(c),
          g = ea.range(s),
          v = [];
        return null != e && g.sort(e === gs ? function(t, n) {
          return c[n] - c[t]
        } : function(t, n) {
          return e(a[t], a[n])
        }), g.forEach(function(t) {
          v[t] = {
            data: a[t],
            value: u = c[t],
            startAngle: l,
            endAngle: l += u * d + p,
            padAngle: h
          }
        }), v
      }
      var n = Number,
        e = gs,
        r = 0,
        i = ja,
        o = 0;
      return t.value = function(e) {
        return arguments.length ? (n = e, t) : n
      }, t.sort = function(n) {
        return arguments.length ? (e = n, t) : e
      }, t.startAngle = function(n) {
        return arguments.length ? (r = n, t) : r
      }, t.endAngle = function(n) {
        return arguments.length ? (i = n, t) : i
      }, t.padAngle = function(n) {
        return arguments.length ? (o = n, t) : o
      }, t
    };
    var gs = {};
    ea.layout.stack = function() {
      function t(u, s) {
        if (!(h = u.length)) return u;
        var c = u.map(function(e, r) {
            return n.call(t, e, r)
          }),
          l = c.map(function(n) {
            return n.map(function(n, e) {
              return [o.call(t, n, e), a.call(t, n, e)]
            })
          }),
          f = e.call(t, l, s);
        c = ea.permute(c, f), l = ea.permute(l, f);
        var h, p, d, g, v = r.call(t, l, s),
          m = c[0].length;
        for (d = 0; m > d; ++d)
          for (i.call(t, c[0][d], g = v[d], l[0][d][1]), p = 1; h > p; ++p) i.call(t, c[p][d], g += l[p - 1][d][1], l[p][d][1]);
        return u
      }
      var n = y,
        e = si,
        r = ci,
        i = ui,
        o = oi,
        a = ai;
      return t.values = function(e) {
        return arguments.length ? (n = e, t) : n
      }, t.order = function(n) {
        return arguments.length ? (e = "function" == typeof n ? n : vs.get(n) || si, t) : e
      }, t.offset = function(n) {
        return arguments.length ? (r = "function" == typeof n ? n : ms.get(n) || ci, t) : r
      }, t.x = function(n) {
        return arguments.length ? (o = n, t) : o
      }, t.y = function(n) {
        return arguments.length ? (a = n, t) : a
      }, t.out = function(n) {
        return arguments.length ? (i = n, t) : i
      }, t
    };
    var vs = ea.map({
        "inside-out": function(t) {
          var n, e, r = t.length,
            i = t.map(li),
            o = t.map(fi),
            a = ea.range(r).sort(function(t, n) {
              return i[t] - i[n]
            }),
            u = 0,
            s = 0,
            c = [],
            l = [];
          for (n = 0; r > n; ++n) e = a[n], s > u ? (u += o[e], c.push(e)) : (s += o[e], l.push(e));
          return l.reverse().concat(c)
        },
        reverse: function(t) {
          return ea.range(t.length).reverse()
        },
        "default": si
      }),
      ms = ea.map({
        silhouette: function(t) {
          var n, e, r, i = t.length,
            o = t[0].length,
            a = [],
            u = 0,
            s = [];
          for (e = 0; o > e; ++e) {
            for (n = 0, r = 0; i > n; n++) r += t[n][e][1];
            r > u && (u = r), a.push(r)
          }
          for (e = 0; o > e; ++e) s[e] = (u - a[e]) / 2;
          return s
        },
        wiggle: function(t) {
          var n, e, r, i, o, a, u, s, c, l = t.length,
            f = t[0],
            h = f.length,
            p = [];
          for (p[0] = s = c = 0, e = 1; h > e; ++e) {
            for (n = 0, i = 0; l > n; ++n) i += t[n][e][1];
            for (n = 0, o = 0, u = f[e][0] - f[e - 1][0]; l > n; ++n) {
              for (r = 0, a = (t[n][e][1] - t[n][e - 1][1]) / (2 * u); n > r; ++r) a += (t[r][e][1] - t[r][e - 1][1]) / u;
              o += a * t[n][e][1]
            }
            p[e] = s -= i ? o / i * u : 0, c > s && (c = s)
          }
          for (e = 0; h > e; ++e) p[e] -= c;
          return p
        },
        expand: function(t) {
          var n, e, r, i = t.length,
            o = t[0].length,
            a = 1 / i,
            u = [];
          for (e = 0; o > e; ++e) {
            for (n = 0, r = 0; i > n; n++) r += t[n][e][1];
            if (r)
              for (n = 0; i > n; n++) t[n][e][1] /= r;
            else
              for (n = 0; i > n; n++) t[n][e][1] = a
          }
          for (e = 0; o > e; ++e) u[e] = 0;
          return u
        },
        zero: ci
      });
    ea.layout.histogram = function() {
      function t(t, o) {
        for (var a, u, s = [], c = t.map(e, this), l = r.call(this, c, o), f = i.call(this, l, c, o), o = -1, h = c.length, p = f.length - 1, d = n ? 1 : 1 / h; ++o < p;) a = s[o] = [], a.dx = f[o + 1] - (a.x = f[o]), a.y = 0;
        if (p > 0)
          for (o = -1; ++o < h;) u = c[o], u >= l[0] && u <= l[1] && (a = s[ea.bisect(f, u, 1, p) - 1], a.y += d, a.push(t[o]));
        return s
      }
      var n = !0,
        e = Number,
        r = gi,
        i = pi;
      return t.value = function(n) {
        return arguments.length ? (e = n, t) : e
      }, t.range = function(n) {
        return arguments.length ? (r = St(n), t) : r
      }, t.bins = function(n) {
        return arguments.length ? (i = "number" == typeof n ? function(t) {
          return di(t, n)
        } : St(n), t) : i
      }, t.frequency = function(e) {
        return arguments.length ? (n = !!e, t) : n
      }, t
    }, ea.layout.pack = function() {
      function t(t, o) {
        var a = e.call(this, t, o),
          u = a[0],
          s = i[0],
          c = i[1],
          l = null == n ? Math.sqrt : "function" == typeof n ? n : function() {
            return n
          };
        if (u.x = u.y = 0, ti(u, function(t) {
            t.r = +l(t.value)
          }), ti(u, wi), r) {
          var f = r * (n ? 1 : Math.max(2 * u.r / s, 2 * u.r / c)) / 2;
          ti(u, function(t) {
            t.r += f
          }), ti(u, wi), ti(u, function(t) {
            t.r -= f
          })
        }
        return _i(u, s / 2, c / 2, n ? 1 : 1 / Math.max(2 * u.r / s, 2 * u.r / c)), a
      }
      var n, e = ea.layout.hierarchy().sort(vi),
        r = 0,
        i = [1, 1];
      return t.size = function(n) {
        return arguments.length ? (i = n, t) : i
      }, t.radius = function(e) {
        return arguments.length ? (n = null == e || "function" == typeof e ? e : +e, t) : n
      }, t.padding = function(n) {
        return arguments.length ? (r = +n, t) : r
      }, Zr(t, e)
    }, ea.layout.tree = function() {
      function t(t, i) {
        var l = a.call(this, t, i),
          f = l[0],
          h = n(f);
        if (ti(h, e), h.parent.m = -h.z, Kr(h, r), c) Kr(f, o);
        else {
          var p = f,
            d = f,
            g = f;
          Kr(f, function(t) {
            t.x < p.x && (p = t), t.x > d.x && (d = t), t.depth > g.depth && (g = t)
          });
          var v = u(p, d) / 2 - p.x,
            m = s[0] / (d.x + u(d, p) / 2 + v),
            y = s[1] / (g.depth || 1);
          Kr(f, function(t) {
            t.x = (t.x + v) * m, t.y = t.depth * y
          })
        }
        return l
      }

      function n(t) {
        for (var n, e = {
            A: null,
            children: [t]
          }, r = [e]; null != (n = r.pop());)
          for (var i, o = n.children, a = 0, u = o.length; u > a; ++a) r.push((o[a] = i = {
            _: o[a],
            parent: n,
            children: (i = o[a].children) && i.slice() || [],
            A: null,
            a: null,
            z: 0,
            m: 0,
            c: 0,
            s: 0,
            t: null,
            i: a
          }).a = i);
        return e.children[0]
      }

      function e(t) {
        var n = t.children,
          e = t.parent.children,
          r = t.i ? e[t.i - 1] : null;
        if (n.length) {
          Ti(t);
          var o = (n[0].z + n[n.length - 1].z) / 2;
          r ? (t.z = r.z + u(t._, r._), t.m = t.z - o) : t.z = o
        } else r && (t.z = r.z + u(t._, r._));
        t.parent.A = i(t, r, t.parent.A || e[0])
      }

      function r(t) {
        t._.x = t.z + t.parent.m, t.m += t.parent.m
      }

      function i(t, n, e) {
        if (n) {
          for (var r, i = t, o = t, a = n, s = i.parent.children[0], c = i.m, l = o.m, f = a.m, h = s.m; a = Ei(a), i = Si(i), a && i;) s = Si(s), o = Ei(o), o.a = t, r = a.z + f - i.z - c + u(a._, i._), r > 0 && (Ci(Pi(a, t, e), t, r), c += r, l += r), f += a.m, c += i.m, h += s.m, l += o.m;
          a && !Ei(o) && (o.t = a, o.m += f - l), i && !Si(s) && (s.t = i, s.m += c - h, e = t)
        }
        return e
      }

      function o(t) {
        t.x *= s[0], t.y = t.depth * s[1]
      }
      var a = ea.layout.hierarchy().sort(null).value(null),
        u = ki,
        s = [1, 1],
        c = null;
      return t.separation = function(n) {
        return arguments.length ? (u = n, t) : u
      }, t.size = function(n) {
        return arguments.length ? (c = null == (s = n) ? o : null, t) : c ? null : s
      }, t.nodeSize = function(n) {
        return arguments.length ? (c = null == (s = n) ? null : o, t) : c ? s : null
      }, Zr(t, a)
    }, ea.layout.cluster = function() {
      function t(t, o) {
        var a, u = n.call(this, t, o),
          s = u[0],
          c = 0;
        ti(s, function(t) {
          var n = t.children;
          n && n.length ? (t.x = Di(n), t.y = Ni(n)) : (t.x = a ? c += e(t, a) : 0, t.y = 0, a = t)
        });
        var l = ji(s),
          f = Li(s),
          h = l.x - e(l, f) / 2,
          p = f.x + e(f, l) / 2;
        return ti(s, i ? function(t) {
          t.x = (t.x - s.x) * r[0], t.y = (s.y - t.y) * r[1]
        } : function(t) {
          t.x = (t.x - h) / (p - h) * r[0], t.y = (1 - (s.y ? t.y / s.y : 1)) * r[1]
        }), u
      }
      var n = ea.layout.hierarchy().sort(null).value(null),
        e = ki,
        r = [1, 1],
        i = !1;
      return t.separation = function(n) {
        return arguments.length ? (e = n, t) : e
      }, t.size = function(n) {
        return arguments.length ? (i = null == (r = n), t) : i ? null : r
      }, t.nodeSize = function(n) {
        return arguments.length ? (i = null != (r = n), t) : i ? r : null
      }, Zr(t, n)
    }, ea.layout.treemap = function() {
      function t(t, n) {
        for (var e, r, i = -1, o = t.length; ++i < o;) r = (e = t[i]).value * (0 > n ? 0 : n), e.area = isNaN(r) || 0 >= r ? 0 : r
      }

      function n(e) {
        var o = e.children;
        if (o && o.length) {
          var a, u, s, c = f(e),
            l = [],
            h = o.slice(),
            d = 1 / 0,
            g = "slice" === p ? c.dx : "dice" === p ? c.dy : "slice-dice" === p ? 1 & e.depth ? c.dy : c.dx : Math.min(c.dx, c.dy);
          for (t(h, c.dx * c.dy / e.value), l.area = 0;
            (s = h.length) > 0;) l.push(a = h[s - 1]), l.area += a.area, "squarify" !== p || (u = r(l, g)) <= d ? (h.pop(), d = u) : (l.area -= l.pop().area, i(l, g, c, !1), g = Math.min(c.dx, c.dy), l.length = l.area = 0, d = 1 / 0);
          l.length && (i(l, g, c, !0), l.length = l.area = 0), o.forEach(n)
        }
      }

      function e(n) {
        var r = n.children;
        if (r && r.length) {
          var o, a = f(n),
            u = r.slice(),
            s = [];
          for (t(u, a.dx * a.dy / n.value), s.area = 0; o = u.pop();) s.push(o), s.area += o.area, null != o.z && (i(s, o.z ? a.dx : a.dy, a, !u.length), s.length = s.area = 0);
          r.forEach(e)
        }
      }

      function r(t, n) {
        for (var e, r = t.area, i = 0, o = 1 / 0, a = -1, u = t.length; ++a < u;)(e = t[a].area) && (o > e && (o = e), e > i && (i = e));
        return r *= r, n *= n, r ? Math.max(n * i * d / r, r / (n * o * d)) : 1 / 0
      }

      function i(t, n, e, r) {
        var i, o = -1,
          a = t.length,
          u = e.x,
          c = e.y,
          l = n ? s(t.area / n) : 0;
        if (n == e.dx) {
          for ((r || l > e.dy) && (l = e.dy); ++o < a;) i = t[o], i.x = u, i.y = c, i.dy = l, u += i.dx = Math.min(e.x + e.dx - u, l ? s(i.area / l) : 0);
          i.z = !0, i.dx += e.x + e.dx - u, e.y += l, e.dy -= l
        } else {
          for ((r || l > e.dx) && (l = e.dx); ++o < a;) i = t[o], i.x = u, i.y = c, i.dx = l, c += i.dy = Math.min(e.y + e.dy - c, l ? s(i.area / l) : 0);
          i.z = !1, i.dy += e.y + e.dy - c, e.x += l, e.dx -= l
        }
      }

      function o(r) {
        var i = a || u(r),
          o = i[0];
        return o.x = 0, o.y = 0, o.dx = c[0], o.dy = c[1], a && u.revalue(o), t([o], o.dx * o.dy / o.value), (a ? e : n)(o), h && (a = i), i
      }
      var a, u = ea.layout.hierarchy(),
        s = Math.round,
        c = [1, 1],
        l = null,
        f = Ri,
        h = !1,
        p = "squarify",
        d = .5 * (1 + Math.sqrt(5));
      return o.size = function(t) {
        return arguments.length ? (c = t, o) : c
      }, o.padding = function(t) {
        function n(n) {
          var e = t.call(o, n, n.depth);
          return null == e ? Ri(n) : Oi(n, "number" == typeof e ? [e, e, e, e] : e)
        }

        function e(n) {
          return Oi(n, t)
        }
        if (!arguments.length) return l;
        var r;
        return f = null == (l = t) ? Ri : "function" == (r = typeof t) ? n : "number" === r ? (t = [t, t, t, t], e) : e, o
      }, o.round = function(t) {
        return arguments.length ? (s = t ? Math.round : Number, o) : s != Number
      }, o.sticky = function(t) {
        return arguments.length ? (h = t, a = null, o) : h
      }, o.ratio = function(t) {
        return arguments.length ? (d = t, o) : d
      }, o.mode = function(t) {
        return arguments.length ? (p = t + "", o) : p
      }, Zr(o, u)
    }, ea.random = {
      normal: function(t, n) {
        var e = arguments.length;
        return 2 > e && (n = 1), 1 > e && (t = 0),
          function() {
            var e, r, i;
            do e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, i = e * e + r * r; while (!i || i > 1);
            return t + n * e * Math.sqrt(-2 * Math.log(i) / i)
          }
      },
      logNormal: function() {
        var t = ea.random.normal.apply(ea, arguments);
        return function() {
          return Math.exp(t())
        }
      },
      bates: function(t) {
        var n = ea.random.irwinHall(t);
        return function() {
          return n() / t
        }
      },
      irwinHall: function(t) {
        return function() {
          for (var n = 0, e = 0; t > e; e++) n += Math.random();
          return n
        }
      }
    }, ea.scale = {};
    var ys = {
      floor: y,
      ceil: y
    };
    ea.scale.linear = function() {
      return Bi([0, 1], [0, 1], yr, !1)
    };
    var bs = {
      s: 1,
      g: 1,
      p: 1,
      r: 1,
      e: 1
    };
    ea.scale.log = function() {
      return Ji(ea.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var ws = ea.format(".0e"),
      As = {
        floor: function(t) {
          return -Math.ceil(-t)
        },
        ceil: function(t) {
          return -Math.floor(-t)
        }
      };
    ea.scale.pow = function() {
      return Zi(ea.scale.linear(), 1, [0, 1])
    }, ea.scale.sqrt = function() {
      return ea.scale.pow().exponent(.5)
    }, ea.scale.ordinal = function() {
      return to([], {
        t: "range",
        a: [
          []
        ]
      })
    }, ea.scale.category10 = function() {
      return ea.scale.ordinal().range(xs)
    }, ea.scale.category20 = function() {
      return ea.scale.ordinal().range(_s)
    }, ea.scale.category20b = function() {
      return ea.scale.ordinal().range(Ms)
    }, ea.scale.category20c = function() {
      return ea.scale.ordinal().range(ks)
    };
    var xs = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(bt),
      _s = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(bt),
      Ms = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(bt),
      ks = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(bt);
    ea.scale.quantile = function() {
      return no([], [])
    }, ea.scale.quantize = function() {
      return eo(0, 1, [0, 1])
    }, ea.scale.threshold = function() {
      return ro([.5], [0, 1])
    }, ea.scale.identity = function() {
      return io([0, 1])
    }, ea.svg = {}, ea.svg.arc = function() {
      function t() {
        var t = Math.max(0, +e.apply(this, arguments)),
          c = Math.max(0, +r.apply(this, arguments)),
          l = a.apply(this, arguments) - Ra,
          f = u.apply(this, arguments) - Ra,
          h = Math.abs(f - l),
          p = l > f ? 0 : 1;
        if (t > c && (d = c, c = t, t = d), h >= La) return n(c, p) + (t ? n(t, 1 - p) : "") + "Z";
        var d, g, v, m, y, b, w, A, x, _, M, k, S = 0,
          E = 0,
          C = [];
        if ((m = (+s.apply(this, arguments) || 0) / 2) && (v = o === Ss ? Math.sqrt(t * t + c * c) : +o.apply(this, arguments), p || (E *= -1), c && (E = nt(v / c * Math.sin(m))), t && (S = nt(v / t * Math.sin(m)))), c) {
          y = c * Math.cos(l + E), b = c * Math.sin(l + E), w = c * Math.cos(f - E), A = c * Math.sin(f - E);
          var T = Math.abs(f - l - 2 * E) <= Da ? 0 : 1;
          if (E && fo(y, b, w, A) === p ^ T) {
            var P = (l + f) / 2;
            y = c * Math.cos(P), b = c * Math.sin(P), w = A = null
          }
        } else y = b = 0;
        if (t) {
          x = t * Math.cos(f - S), _ = t * Math.sin(f - S), M = t * Math.cos(l + S), k = t * Math.sin(l + S);
          var N = Math.abs(l - f + 2 * S) <= Da ? 0 : 1;
          if (S && fo(x, _, M, k) === 1 - p ^ N) {
            var D = (l + f) / 2;
            x = t * Math.cos(D), _ = t * Math.sin(D), M = k = null
          }
        } else x = _ = 0;
        if ((d = Math.min(Math.abs(c - t) / 2, +i.apply(this, arguments))) > .001) {
          g = c > t ^ p ? 0 : 1;
          var j = null == M ? [x, _] : null == w ? [y, b] : je([y, b], [M, k], [w, A], [x, _]),
            L = y - j[0],
            R = b - j[1],
            O = w - j[0],
            I = A - j[1],
            q = 1 / Math.sin(Math.acos((L * O + R * I) / (Math.sqrt(L * L + R * R) * Math.sqrt(O * O + I * I))) / 2),
            U = Math.sqrt(j[0] * j[0] + j[1] * j[1]);
          if (null != w) {
            var z = Math.min(d, (c - U) / (q + 1)),
              F = ho(null == M ? [x, _] : [M, k], [y, b], c, z, p),
              H = ho([w, A], [x, _], c, z, p);
            d === z ? C.push("M", F[0], "A", z, ",", z, " 0 0,", g, " ", F[1], "A", c, ",", c, " 0 ", 1 - p ^ fo(F[1][0], F[1][1], H[1][0], H[1][1]), ",", p, " ", H[1], "A", z, ",", z, " 0 0,", g, " ", H[0]) : C.push("M", F[0], "A", z, ",", z, " 0 1,", g, " ", H[0])
          } else C.push("M", y, ",", b);
          if (null != M) {
            var B = Math.min(d, (t - U) / (q - 1)),
              W = ho([y, b], [M, k], t, -B, p),
              $ = ho([x, _], null == w ? [y, b] : [w, A], t, -B, p);
            d === B ? C.push("L", $[0], "A", B, ",", B, " 0 0,", g, " ", $[1], "A", t, ",", t, " 0 ", p ^ fo($[1][0], $[1][1], W[1][0], W[1][1]), ",", 1 - p, " ", W[1], "A", B, ",", B, " 0 0,", g, " ", W[0]) : C.push("L", $[0], "A", B, ",", B, " 0 0,", g, " ", W[0])
          } else C.push("L", x, ",", _)
        } else C.push("M", y, ",", b), null != w && C.push("A", c, ",", c, " 0 ", T, ",", p, " ", w, ",", A), C.push("L", x, ",", _), null != M && C.push("A", t, ",", t, " 0 ", N, ",", 1 - p, " ", M, ",", k);
        return C.push("Z"), C.join("")
      }

      function n(t, n) {
        return "M0," + t + "A" + t + "," + t + " 0 1," + n + " 0," + -t + "A" + t + "," + t + " 0 1," + n + " 0," + t
      }
      var e = ao,
        r = uo,
        i = oo,
        o = Ss,
        a = so,
        u = co,
        s = lo;
      return t.innerRadius = function(n) {
        return arguments.length ? (e = St(n), t) : e
      }, t.outerRadius = function(n) {
        return arguments.length ? (r = St(n), t) : r
      }, t.cornerRadius = function(n) {
        return arguments.length ? (i = St(n), t) : i
      }, t.padRadius = function(n) {
        return arguments.length ? (o = n == Ss ? Ss : St(n), t) : o
      }, t.startAngle = function(n) {
        return arguments.length ? (a = St(n), t) : a
      }, t.endAngle = function(n) {
        return arguments.length ? (u = St(n), t) : u
      }, t.padAngle = function(n) {
        return arguments.length ? (s = St(n), t) : s
      }, t.centroid = function() {
        var t = (+e.apply(this, arguments) + +r.apply(this, arguments)) / 2,
          n = (+a.apply(this, arguments) + +u.apply(this, arguments)) / 2 - Ra;
        return [Math.cos(n) * t, Math.sin(n) * t]
      }, t
    };
    var Ss = "auto";
    ea.svg.line = function() {
      return po(y)
    };
    var Es = ea.map({
      linear: go,
      "linear-closed": vo,
      step: mo,
      "step-before": yo,
      "step-after": bo,
      basis: ko,
      "basis-open": So,
      "basis-closed": Eo,
      bundle: Co,
      cardinal: xo,
      "cardinal-open": wo,
      "cardinal-closed": Ao,
      monotone: Lo
    });
    Es.forEach(function(t, n) {
      n.key = t, n.closed = /-closed$/.test(t)
    });
    var Cs = [0, 2 / 3, 1 / 3, 0],
      Ts = [0, 1 / 3, 2 / 3, 0],
      Ps = [0, 1 / 6, 2 / 3, 1 / 6];
    ea.svg.line.radial = function() {
      var t = po(Ro);
      return t.radius = t.x, delete t.x, t.angle = t.y, delete t.y, t
    }, yo.reverse = bo, bo.reverse = yo, ea.svg.area = function() {
      return Oo(y)
    }, ea.svg.area.radial = function() {
      var t = Oo(Ro);
      return t.radius = t.x, delete t.x, t.innerRadius = t.x0, delete t.x0, t.outerRadius = t.x1, delete t.x1, t.angle = t.y, delete t.y, t.startAngle = t.y0, delete t.y0, t.endAngle = t.y1, delete t.y1, t
    }, ea.svg.chord = function() {
      function t(t, u) {
        var s = n(this, o, t, u),
          c = n(this, a, t, u);
        return "M" + s.p0 + r(s.r, s.p1, s.a1 - s.a0) + (e(s, c) ? i(s.r, s.p1, s.r, s.p0) : i(s.r, s.p1, c.r, c.p0) + r(c.r, c.p1, c.a1 - c.a0) + i(c.r, c.p1, s.r, s.p0)) + "Z"
      }

      function n(t, n, e, r) {
        var i = n.call(t, e, r),
          o = u.call(t, i, r),
          a = s.call(t, i, r) - Ra,
          l = c.call(t, i, r) - Ra;
        return {
          r: o,
          a0: a,
          a1: l,
          p0: [o * Math.cos(a), o * Math.sin(a)],
          p1: [o * Math.cos(l), o * Math.sin(l)]
        }
      }

      function e(t, n) {
        return t.a0 == n.a0 && t.a1 == n.a1
      }

      function r(t, n, e) {
        return "A" + t + "," + t + " 0 " + +(e > Da) + ",1 " + n
      }

      function i(t, n, e, r) {
        return "Q 0,0 " + r
      }
      var o = ye,
        a = be,
        u = Io,
        s = so,
        c = co;
      return t.radius = function(n) {
        return arguments.length ? (u = St(n), t) : u
      }, t.source = function(n) {
        return arguments.length ? (o = St(n), t) : o
      }, t.target = function(n) {
        return arguments.length ? (a = St(n), t) : a
      }, t.startAngle = function(n) {
        return arguments.length ? (s = St(n), t) : s
      }, t.endAngle = function(n) {
        return arguments.length ? (c = St(n), t) : c
      }, t
    }, ea.svg.diagonal = function() {
      function t(t, i) {
        var o = n.call(this, t, i),
          a = e.call(this, t, i),
          u = (o.y + a.y) / 2,
          s = [o, {
            x: o.x,
            y: u
          }, {
            x: a.x,
            y: u
          }, a];
        return s = s.map(r), "M" + s[0] + "C" + s[1] + " " + s[2] + " " + s[3]
      }
      var n = ye,
        e = be,
        r = qo;
      return t.source = function(e) {
        return arguments.length ? (n = St(e), t) : n
      }, t.target = function(n) {
        return arguments.length ? (e = St(n), t) : e
      }, t.projection = function(n) {
        return arguments.length ? (r = n, t) : r
      }, t
    }, ea.svg.diagonal.radial = function() {
      var t = ea.svg.diagonal(),
        n = qo,
        e = t.projection;
      return t.projection = function(t) {
        return arguments.length ? e(Uo(n = t)) : n
      }, t
    }, ea.svg.symbol = function() {
      function t(t, r) {
        return (Ns.get(n.call(this, t, r)) || Ho)(e.call(this, t, r))
      }
      var n = Fo,
        e = zo;
      return t.type = function(e) {
        return arguments.length ? (n = St(e), t) : n
      }, t.size = function(n) {
        return arguments.length ? (e = St(n), t) : e
      }, t
    };
    var Ns = ea.map({
      circle: Ho,
      cross: function(t) {
        var n = Math.sqrt(t / 5) / 2;
        return "M" + -3 * n + "," + -n + "H" + -n + "V" + -3 * n + "H" + n + "V" + -n + "H" + 3 * n + "V" + n + "H" + n + "V" + 3 * n + "H" + -n + "V" + n + "H" + -3 * n + "Z"
      },
      diamond: function(t) {
        var n = Math.sqrt(t / (2 * js)),
          e = n * js;
        return "M0," + -n + "L" + e + ",0 0," + n + " " + -e + ",0Z"
      },
      square: function(t) {
        var n = Math.sqrt(t) / 2;
        return "M" + -n + "," + -n + "L" + n + "," + -n + " " + n + "," + n + " " + -n + "," + n + "Z"
      },
      "triangle-down": function(t) {
        var n = Math.sqrt(t / Ds),
          e = n * Ds / 2;
        return "M0," + e + "L" + n + "," + -e + " " + -n + "," + -e + "Z"
      },
      "triangle-up": function(t) {
        var n = Math.sqrt(t / Ds),
          e = n * Ds / 2;
        return "M0," + -e + "L" + n + "," + e + " " + -n + "," + e + "Z"
      }
    });
    ea.svg.symbolTypes = Ns.keys();
    var Ds = Math.sqrt(3),
      js = Math.tan(30 * Oa);
    _a.transition = function(t) {
      for (var n, e, r = Ls || ++qs, i = Vo(t), o = [], a = Rs || {
          time: Date.now(),
          ease: kr,
          delay: 0,
          duration: 250
        }, u = -1, s = this.length; ++u < s;) {
        o.push(n = []);
        for (var c = this[u], l = -1, f = c.length; ++l < f;)(e = c[l]) && Yo(e, l, i, r, a), n.push(e)
      }
      return Wo(o, i, r)
    }, _a.interrupt = function(t) {
      return this.each(null == t ? Os : Bo(Vo(t)))
    };
    var Ls, Rs, Os = Bo(Vo()),
      Is = [],
      qs = 0;
    Is.call = _a.call, Is.empty = _a.empty, Is.node = _a.node, Is.size = _a.size, ea.transition = function(t, n) {
      return t && t.transition ? Ls ? t.transition(n) : t : ea.selection().transition(t)
    }, ea.transition.prototype = Is, Is.select = function(t) {
      var n, e, r, i = this.id,
        o = this.namespace,
        a = [];
      t = C(t);
      for (var u = -1, s = this.length; ++u < s;) {
        a.push(n = []);
        for (var c = this[u], l = -1, f = c.length; ++l < f;)(r = c[l]) && (e = t.call(r, r.__data__, l, u)) ? ("__data__" in r && (e.__data__ = r.__data__), Yo(e, l, o, i, r[o][i]), n.push(e)) : n.push(null)
      }
      return Wo(a, o, i)
    }, Is.selectAll = function(t) {
      var n, e, r, i, o, a = this.id,
        u = this.namespace,
        s = [];
      t = T(t);
      for (var c = -1, l = this.length; ++c < l;)
        for (var f = this[c], h = -1, p = f.length; ++h < p;)
          if (r = f[h]) {
            o = r[u][a], e = t.call(r, r.__data__, h, c), s.push(n = []);
            for (var d = -1, g = e.length; ++d < g;)(i = e[d]) && Yo(i, d, u, a, o), n.push(i)
          }
      return Wo(s, u, a)
    }, Is.filter = function(t) {
      var n, e, r, i = [];
      "function" != typeof t && (t = F(t));
      for (var o = 0, a = this.length; a > o; o++) {
        i.push(n = []);
        for (var e = this[o], u = 0, s = e.length; s > u; u++)(r = e[u]) && t.call(r, r.__data__, u, o) && n.push(r)
      }
      return Wo(i, this.namespace, this.id)
    }, Is.tween = function(t, n) {
      var e = this.id,
        r = this.namespace;
      return arguments.length < 2 ? this.node()[r][e].tween.get(t) : B(this, null == n ? function(n) {
        n[r][e].tween.remove(t)
      } : function(i) {
        i[r][e].tween.set(t, n)
      })
    }, Is.attr = function(t, n) {
      function e() {
        this.removeAttribute(u)
      }

      function r() {
        this.removeAttributeNS(u.space, u.local)
      }

      function i(t) {
        return null == t ? e : (t += "", function() {
          var n, e = this.getAttribute(u);
          return e !== t && (n = a(e, t), function(t) {
            this.setAttribute(u, n(t))
          })
        })
      }

      function o(t) {
        return null == t ? r : (t += "", function() {
          var n, e = this.getAttributeNS(u.space, u.local);
          return e !== t && (n = a(e, t), function(t) {
            this.setAttributeNS(u.space, u.local, n(t))
          })
        })
      }
      if (arguments.length < 2) {
        for (n in t) this.attr(n, t[n]);
        return this
      }
      var a = "transform" == t ? Fr : yr,
        u = ea.ns.qualify(t);
      return $o(this, "attr." + t, n, u.local ? o : i)
    }, Is.attrTween = function(t, n) {
      function e(t, e) {
        var r = n.call(this, t, e, this.getAttribute(i));
        return r && function(t) {
          this.setAttribute(i, r(t))
        }
      }

      function r(t, e) {
        var r = n.call(this, t, e, this.getAttributeNS(i.space, i.local));
        return r && function(t) {
          this.setAttributeNS(i.space, i.local, r(t))
        }
      }
      var i = ea.ns.qualify(t);
      return this.tween("attr." + t, i.local ? r : e)
    }, Is.style = function(t, e, r) {
      function i() {
        this.style.removeProperty(t)
      }

      function o(e) {
        return null == e ? i : (e += "", function() {
          var i, o = n(this).getComputedStyle(this, null).getPropertyValue(t);
          return o !== e && (i = yr(o, e), function(n) {
            this.style.setProperty(t, i(n), r)
          })
        })
      }
      var a = arguments.length;
      if (3 > a) {
        if ("string" != typeof t) {
          2 > a && (e = "");
          for (r in t) this.style(r, t[r], e);
          return this
        }
        r = ""
      }
      return $o(this, "style." + t, e, o)
    }, Is.styleTween = function(t, e, r) {
      function i(i, o) {
        var a = e.call(this, i, o, n(this).getComputedStyle(this, null).getPropertyValue(t));
        return a && function(n) {
          this.style.setProperty(t, a(n), r)
        }
      }
      return arguments.length < 3 && (r = ""), this.tween("style." + t, i)
    }, Is.text = function(t) {
      return $o(this, "text", t, Xo)
    }, Is.remove = function() {
      var t = this.namespace;
      return this.each("end.transition", function() {
        var n;
        this[t].count < 2 && (n = this.parentNode) && n.removeChild(this)
      })
    }, Is.ease = function(t) {
      var n = this.id,
        e = this.namespace;
      return arguments.length < 1 ? this.node()[e][n].ease : ("function" != typeof t && (t = ea.ease.apply(ea, arguments)), B(this, function(r) {
        r[e][n].ease = t
      }))
    }, Is.delay = function(t) {
      var n = this.id,
        e = this.namespace;
      return arguments.length < 1 ? this.node()[e][n].delay : B(this, "function" == typeof t ? function(r, i, o) {
        r[e][n].delay = +t.call(r, r.__data__, i, o)
      } : (t = +t, function(r) {
        r[e][n].delay = t
      }))
    }, Is.duration = function(t) {
      var n = this.id,
        e = this.namespace;
      return arguments.length < 1 ? this.node()[e][n].duration : B(this, "function" == typeof t ? function(r, i, o) {
        r[e][n].duration = Math.max(1, t.call(r, r.__data__, i, o))
      } : (t = Math.max(1, t), function(r) {
        r[e][n].duration = t
      }))
    }, Is.each = function(t, n) {
      var e = this.id,
        r = this.namespace;
      if (arguments.length < 2) {
        var i = Rs,
          o = Ls;
        try {
          Ls = e, B(this, function(n, i, o) {
            Rs = n[r][e], t.call(n, n.__data__, i, o)
          })
        } finally {
          Rs = i, Ls = o
        }
      } else B(this, function(i) {
        var o = i[r][e];
        (o.event || (o.event = ea.dispatch("start", "end", "interrupt"))).on(t, n)
      });
      return this
    }, Is.transition = function() {
      for (var t, n, e, r, i = this.id, o = ++qs, a = this.namespace, u = [], s = 0, c = this.length; c > s; s++) {
        u.push(t = []);
        for (var n = this[s], l = 0, f = n.length; f > l; l++)(e = n[l]) && (r = e[a][i], Yo(e, l, a, o, {
          time: r.time,
          ease: r.ease,
          delay: r.delay + r.duration,
          duration: r.duration
        })), t.push(e)
      }
      return Wo(u, a, o)
    }, ea.svg.axis = function() {
      function t(t) {
        t.each(function() {
          var t, c = ea.select(this),
            l = this.__chart__ || e,
            f = this.__chart__ = e.copy(),
            h = null == s ? f.ticks ? f.ticks.apply(f, u) : f.domain() : s,
            p = null == n ? f.tickFormat ? f.tickFormat.apply(f, u) : y : n,
            d = c.selectAll(".tick").data(h, f),
            g = d.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Pa),
            v = ea.transition(d.exit()).style("opacity", Pa).remove(),
            m = ea.transition(d.order()).style("opacity", 1),
            b = Math.max(i, 0) + a,
            w = qi(f),
            A = c.selectAll(".domain").data([0]),
            x = (A.enter().append("path").attr("class", "domain"), ea.transition(A));
          g.append("line"), g.append("text");
          var _, M, k, S, E = g.select("line"),
            C = m.select("line"),
            T = d.select("text").text(p),
            P = g.select("text"),
            N = m.select("text"),
            D = "top" === r || "left" === r ? -1 : 1;
          if ("bottom" === r || "top" === r ? (t = Go, _ = "x", k = "y", M = "x2", S = "y2", T.attr("dy", 0 > D ? "0em" : ".71em").style("text-anchor", "middle"), x.attr("d", "M" + w[0] + "," + D * o + "V0H" + w[1] + "V" + D * o)) : (t = Qo, _ = "y", k = "x", M = "y2", S = "x2", T.attr("dy", ".32em").style("text-anchor", 0 > D ? "end" : "start"), x.attr("d", "M" + D * o + "," + w[0] + "H0V" + w[1] + "H" + D * o)), E.attr(S, D * i), P.attr(k, D * b), C.attr(M, 0).attr(S, D * i), N.attr(_, 0).attr(k, D * b), f.rangeBand) {
            var j = f,
              L = j.rangeBand() / 2;
            l = f = function(t) {
              return j(t) + L
            }
          } else l.rangeBand ? l = f : v.call(t, f, l);
          g.call(t, l, f), m.call(t, f, f)
        })
      }
      var n, e = ea.scale.linear(),
        r = Us,
        i = 6,
        o = 6,
        a = 3,
        u = [10],
        s = null;
      return t.scale = function(n) {
        return arguments.length ? (e = n, t) : e
      }, t.orient = function(n) {
        return arguments.length ? (r = n in zs ? n + "" : Us, t) : r
      }, t.ticks = function() {
        return arguments.length ? (u = arguments, t) : u
      }, t.tickValues = function(n) {
        return arguments.length ? (s = n, t) : s
      }, t.tickFormat = function(e) {
        return arguments.length ? (n = e, t) : n
      }, t.tickSize = function(n) {
        var e = arguments.length;
        return e ? (i = +n, o = +arguments[e - 1], t) : i
      }, t.innerTickSize = function(n) {
        return arguments.length ? (i = +n, t) : i
      }, t.outerTickSize = function(n) {
        return arguments.length ? (o = +n, t) : o
      }, t.tickPadding = function(n) {
        return arguments.length ? (a = +n, t) : a
      }, t.tickSubdivide = function() {
        return arguments.length && t
      }, t
    };
    var Us = "bottom",
      zs = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      };
    ea.svg.brush = function() {
      function t(n) {
        n.each(function() {
          var n = ea.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", o).on("touchstart.brush", o),
            a = n.selectAll(".background").data([0]);
          a.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), n.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
          var u = n.selectAll(".resize").data(g, y);
          u.exit().remove(), u.enter().append("g").attr("class", function(t) {
            return "resize " + t
          }).style("cursor", function(t) {
            return Fs[t]
          }).append("rect").attr("x", function(t) {
            return /[ew]$/.test(t) ? -3 : null
          }).attr("y", function(t) {
            return /^[ns]/.test(t) ? -3 : null
          }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), u.style("display", t.empty() ? "none" : null);
          var s, f = ea.transition(n),
            h = ea.transition(a);
          c && (s = qi(c), h.attr("x", s[0]).attr("width", s[1] - s[0]), r(f)), l && (s = qi(l), h.attr("y", s[0]).attr("height", s[1] - s[0]), i(f)), e(f)
        })
      }

      function e(t) {
        t.selectAll(".resize").attr("transform", function(t) {
          return "translate(" + f[+/e$/.test(t)] + "," + h[+/^s/.test(t)] + ")"
        })
      }

      function r(t) {
        t.select(".extent").attr("x", f[0]), t.selectAll(".extent,.n>rect,.s>rect").attr("width", f[1] - f[0])
      }

      function i(t) {
        t.select(".extent").attr("y", h[0]), t.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0])
      }

      function o() {
        function o() {
          32 == ea.event.keyCode && (T || (b = null, N[0] -= f[1], N[1] -= h[1], T = 2), M())
        }

        function g() {
          32 == ea.event.keyCode && 2 == T && (N[0] += f[1], N[1] += h[1], T = 0, M())
        }

        function v() {
          var t = ea.mouse(A),
            n = !1;
          w && (t[0] += w[0], t[1] += w[1]), T || (ea.event.altKey ? (b || (b = [(f[0] + f[1]) / 2, (h[0] + h[1]) / 2]), N[0] = f[+(t[0] < b[0])], N[1] = h[+(t[1] < b[1])]) : b = null), E && m(t, c, 0) && (r(k), n = !0), C && m(t, l, 1) && (i(k), n = !0), n && (e(k), _({
            type: "brush",
            mode: T ? "move" : "resize"
          }))
        }

        function m(t, n, e) {
          var r, i, o = qi(n),
            s = o[0],
            c = o[1],
            l = N[e],
            g = e ? h : f,
            v = g[1] - g[0];
          return T && (s -= l, c -= v + l), r = (e ? d : p) ? Math.max(s, Math.min(c, t[e])) : t[e], T ? i = (r += l) + v : (b && (l = Math.max(s, Math.min(c, 2 * b[e] - r))), r > l ? (i = r, r = l) : i = l), g[0] != r || g[1] != i ? (e ? u = null : a = null, g[0] = r, g[1] = i, !0) : void 0
        }

        function y() {
          v(), k.style("pointer-events", "all").selectAll(".resize").style("display", t.empty() ? "none" : null), ea.select("body").style("cursor", null), D.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), P(), _({
            type: "brushend"
          })
        }
        var b, w, A = this,
          x = ea.select(ea.event.target),
          _ = s.of(A, arguments),
          k = ea.select(A),
          S = x.datum(),
          E = !/^(n|s)$/.test(S) && c,
          C = !/^(e|w)$/.test(S) && l,
          T = x.classed("extent"),
          P = G(A),
          N = ea.mouse(A),
          D = ea.select(n(A)).on("keydown.brush", o).on("keyup.brush", g);
        if (ea.event.changedTouches ? D.on("touchmove.brush", v).on("touchend.brush", y) : D.on("mousemove.brush", v).on("mouseup.brush", y), k.interrupt().selectAll("*").interrupt(), T) N[0] = f[0] - N[0], N[1] = h[0] - N[1];
        else if (S) {
          var j = +/w$/.test(S),
            L = +/^n/.test(S);
          w = [f[1 - j] - N[0], h[1 - L] - N[1]], N[0] = f[j], N[1] = h[L]
        } else ea.event.altKey && (b = N.slice());
        k.style("pointer-events", "none").selectAll(".resize").style("display", null), ea.select("body").style("cursor", x.style("cursor")), _({
          type: "brushstart"
        }), v()
      }
      var a, u, s = S(t, "brushstart", "brush", "brushend"),
        c = null,
        l = null,
        f = [0, 0],
        h = [0, 0],
        p = !0,
        d = !0,
        g = Hs[0];
      return t.event = function(t) {
        t.each(function() {
          var t = s.of(this, arguments),
            n = {
              x: f,
              y: h,
              i: a,
              j: u
            },
            e = this.__chart__ || n;
          this.__chart__ = n, Ls ? ea.select(this).transition().each("start.brush", function() {
            a = e.i, u = e.j, f = e.x, h = e.y, t({
              type: "brushstart"
            })
          }).tween("brush:brush", function() {
            var e = br(f, n.x),
              r = br(h, n.y);
            return a = u = null,
              function(i) {
                f = n.x = e(i), h = n.y = r(i), t({
                  type: "brush",
                  mode: "resize"
                })
              }
          }).each("end.brush", function() {
            a = n.i, u = n.j, t({
              type: "brush",
              mode: "resize"
            }), t({
              type: "brushend"
            })
          }) : (t({
            type: "brushstart"
          }), t({
            type: "brush",
            mode: "resize"
          }), t({
            type: "brushend"
          }))
        })
      }, t.x = function(n) {
        return arguments.length ? (c = n, g = Hs[!c << 1 | !l], t) : c
      }, t.y = function(n) {
        return arguments.length ? (l = n, g = Hs[!c << 1 | !l], t) : l
      }, t.clamp = function(n) {
        return arguments.length ? (c && l ? (p = !!n[0], d = !!n[1]) : c ? p = !!n : l && (d = !!n), t) : c && l ? [p, d] : c ? p : l ? d : null
      }, t.extent = function(n) {
        var e, r, i, o, s;
        return arguments.length ? (c && (e = n[0], r = n[1], l && (e = e[0], r = r[0]), a = [e, r], c.invert && (e = c(e), r = c(r)), e > r && (s = e, e = r, r = s), (e != f[0] || r != f[1]) && (f = [e, r])), l && (i = n[0], o = n[1], c && (i = i[1], o = o[1]), u = [i, o], l.invert && (i = l(i), o = l(o)), i > o && (s = i, i = o, o = s), (i != h[0] || o != h[1]) && (h = [i, o])), t) : (c && (a ? (e = a[0], r = a[1]) : (e = f[0], r = f[1], c.invert && (e = c.invert(e), r = c.invert(r)), e > r && (s = e, e = r, r = s))), l && (u ? (i = u[0], o = u[1]) : (i = h[0], o = h[1], l.invert && (i = l.invert(i), o = l.invert(o)), i > o && (s = i, i = o, o = s))), c && l ? [
          [e, i],
          [r, o]
        ] : c ? [e, r] : l && [i, o])
      }, t.clear = function() {
        return t.empty() || (f = [0, 0], h = [0, 0], a = u = null), t
      }, t.empty = function() {
        return !!c && f[0] == f[1] || !!l && h[0] == h[1]
      }, ea.rebind(t, s, "on")
    };
    var Fs = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
      },
      Hs = [
        ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
        ["e", "w"],
        ["n", "s"],
        []
      ],
      Bs = su.format = du.timeFormat,
      Ws = Bs.utc,
      $s = Ws("%Y-%m-%dT%H:%M:%S.%LZ");
    Bs.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Jo : $s, Jo.parse = function(t) {
      var n = new Date(t);
      return isNaN(n) ? null : n
    }, Jo.toString = $s.toString, su.second = Ut(function(t) {
      return new cu(1e3 * Math.floor(t / 1e3))
    }, function(t, n) {
      t.setTime(t.getTime() + 1e3 * Math.floor(n))
    }, function(t) {
      return t.getSeconds()
    }), su.seconds = su.second.range, su.seconds.utc = su.second.utc.range, su.minute = Ut(function(t) {
      return new cu(6e4 * Math.floor(t / 6e4))
    }, function(t, n) {
      t.setTime(t.getTime() + 6e4 * Math.floor(n))
    }, function(t) {
      return t.getMinutes()
    }), su.minutes = su.minute.range, su.minutes.utc = su.minute.utc.range, su.hour = Ut(function(t) {
      var n = t.getTimezoneOffset() / 60;
      return new cu(36e5 * (Math.floor(t / 36e5 - n) + n))
    }, function(t, n) {
      t.setTime(t.getTime() + 36e5 * Math.floor(n))
    }, function(t) {
      return t.getHours()
    }), su.hours = su.hour.range, su.hours.utc = su.hour.utc.range, su.month = Ut(function(t) {
      return t = su.day(t), t.setDate(1), t
    }, function(t, n) {
      t.setMonth(t.getMonth() + n)
    }, function(t) {
      return t.getMonth()
    }), su.months = su.month.range, su.months.utc = su.month.utc.range;
    var Xs = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
      Vs = [
        [su.second, 1],
        [su.second, 5],
        [su.second, 15],
        [su.second, 30],
        [su.minute, 1],
        [su.minute, 5],
        [su.minute, 15],
        [su.minute, 30],
        [su.hour, 1],
        [su.hour, 3],
        [su.hour, 6],
        [su.hour, 12],
        [su.day, 1],
        [su.day, 2],
        [su.week, 1],
        [su.month, 1],
        [su.month, 3],
        [su.year, 1]
      ],
      Ys = Bs.multi([
        [".%L", function(t) {
          return t.getMilliseconds()
        }],
        [":%S", function(t) {
          return t.getSeconds()
        }],
        ["%I:%M", function(t) {
          return t.getMinutes()
        }],
        ["%I %p", function(t) {
          return t.getHours()
        }],
        ["%a %d", function(t) {
          return t.getDay() && 1 != t.getDate()
        }],
        ["%b %d", function(t) {
          return 1 != t.getDate()
        }],
        ["%B", function(t) {
          return t.getMonth()
        }],
        ["%Y", Tn]
      ]),
      Gs = {
        range: function(t, n, e) {
          return ea.range(Math.ceil(t / e) * e, +n, e).map(Ko)
        },
        floor: y,
        ceil: y
      };
    Vs.year = su.year, su.scale = function() {
      return Zo(ea.scale.linear(), Vs, Ys)
    };
    var Qs = Vs.map(function(t) {
        return [t[0].utc, t[1]]
      }),
      Js = Ws.multi([
        [".%L", function(t) {
          return t.getUTCMilliseconds()
        }],
        [":%S", function(t) {
          return t.getUTCSeconds()
        }],
        ["%I:%M", function(t) {
          return t.getUTCMinutes()
        }],
        ["%I %p", function(t) {
          return t.getUTCHours()
        }],
        ["%a %d", function(t) {
          return t.getUTCDay() && 1 != t.getUTCDate()
        }],
        ["%b %d", function(t) {
          return 1 != t.getUTCDate()
        }],
        ["%B", function(t) {
          return t.getUTCMonth()
        }],
        ["%Y", Tn]
      ]);
    Qs.year = su.year.utc, su.scale.utc = function() {
        return Zo(ea.scale.linear(), Qs, Js)
      }, ea.text = Et(function(t) {
        return t.responseText
      }),
      ea.json = function(t, n) {
        return Ct(t, "application/json", ta, n)
      }, ea.html = function(t, n) {
        return Ct(t, "text/html", na, n)
      }, ea.xml = Et(function(t) {
        return t.responseXML
      }), "function" == typeof define && define.amd ? define(ea) : "object" == typeof module && module.exports && (module.exports = ea), this.d3 = ea
  }(), void 0 === Date.now && (Date.now = function() {
    return (new Date).valueOf()
  });
var TWEEN = TWEEN || function() {
  var t = [];
  return {
    REVISION: "14",
    getAll: function() {
      return t
    },
    removeAll: function() {
      t = []
    },
    add: function(n) {
      t.push(n)
    },
    remove: function(n) {
      var e = t.indexOf(n); - 1 !== e && t.splice(e, 1)
    },
    update: function(n) {
      if (0 === t.length) return !1;
      var e = 0;
      for (n = void 0 !== n ? n : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); e < t.length;) t[e].update(n) ? e++ : t.splice(e, 1);
      return !0
    }
  }
}();
TWEEN.Tween = function(t) {
    var n = t,
      e = {},
      r = {},
      i = {},
      o = 1e3,
      a = 0,
      u = !1,
      s = !1,
      c = !1,
      l = 0,
      f = null,
      h = TWEEN.Easing.Linear.None,
      p = TWEEN.Interpolation.Linear,
      d = [],
      g = null,
      v = !1,
      m = null,
      y = null,
      b = null;
    for (var w in t) e[w] = parseFloat(t[w], 10);
    this.to = function(t, n) {
      return void 0 !== n && (o = n), r = t, this
    }, this.start = function(t) {
      TWEEN.add(this), s = !0, v = !1, f = void 0 !== t ? t : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), f += l;
      for (var o in r) {
        if (r[o] instanceof Array) {
          if (0 === r[o].length) continue;
          r[o] = [n[o]].concat(r[o])
        }
        e[o] = n[o], e[o] instanceof Array == 0 && (e[o] *= 1), i[o] = e[o] || 0
      }
      return this
    }, this.stop = function() {
      return s ? (TWEEN.remove(this), s = !1, null !== b && b.call(n), this.stopChainedTweens(), this) : this
    }, this.stopChainedTweens = function() {
      for (var t = 0, n = d.length; n > t; t++) d[t].stop()
    }, this.delay = function(t) {
      return l = t, this
    }, this.repeat = function(t) {
      return a = t, this
    }, this.yoyo = function(t) {
      return u = t, this
    }, this.easing = function(t) {
      return h = t, this
    }, this.interpolation = function(t) {
      return p = t, this
    }, this.chain = function() {
      return d = arguments, this
    }, this.onStart = function(t) {
      return g = t, this
    }, this.onUpdate = function(t) {
      return m = t, this
    }, this.onComplete = function(t) {
      return y = t, this
    }, this.onStop = function(t) {
      return b = t, this
    }, this.update = function(t) {
      var s;
      if (f > t) return !0;
      v === !1 && (null !== g && g.call(n), v = !0);
      var b = (t - f) / o;
      b = b > 1 ? 1 : b;
      var w = h(b);
      for (s in r) {
        var A = e[s] || 0,
          x = r[s];
        x instanceof Array ? n[s] = p(x, w) : ("string" == typeof x && (x = A + parseFloat(x, 10)), "number" == typeof x && (n[s] = A + (x - A) * w))
      }
      if (null !== m && m.call(n, w), 1 == b) {
        if (a > 0) {
          isFinite(a) && a--;
          for (s in i) {
            if ("string" == typeof r[s] && (i[s] = i[s] + parseFloat(r[s], 10)), u) {
              var _ = i[s];
              i[s] = r[s], r[s] = _
            }
            e[s] = i[s]
          }
          return u && (c = !c), f = t + l, !0
        }
        null !== y && y.call(n);
        for (var M = 0, k = d.length; k > M; M++) d[M].start(f + o);
        return !1
      }
      return !0
    }
  }, TWEEN.Easing = {
    Linear: {
      None: function(t) {
        return t
      }
    },
    Quadratic: {
      In: function(t) {
        return t * t
      },
      Out: function(t) {
        return t * (2 - t)
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
      }
    },
    Cubic: {
      In: function(t) {
        return t * t * t
      },
      Out: function(t) {
        return --t * t * t + 1
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
      }
    },
    Quartic: {
      In: function(t) {
        return t * t * t * t
      },
      Out: function(t) {
        return 1 - --t * t * t * t
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
      }
    },
    Quintic: {
      In: function(t) {
        return t * t * t * t * t
      },
      Out: function(t) {
        return --t * t * t * t * t + 1
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
      }
    },
    Sinusoidal: {
      In: function(t) {
        return 1 - Math.cos(t * Math.PI / 2)
      },
      Out: function(t) {
        return Math.sin(t * Math.PI / 2)
      },
      InOut: function(t) {
        return .5 * (1 - Math.cos(Math.PI * t))
      }
    },
    Exponential: {
      In: function(t) {
        return 0 === t ? 0 : Math.pow(1024, t - 1)
      },
      Out: function(t) {
        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
      },
      InOut: function(t) {
        return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
      }
    },
    Circular: {
      In: function(t) {
        return 1 - Math.sqrt(1 - t * t)
      },
      Out: function(t) {
        return Math.sqrt(1 - --t * t)
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
      }
    },
    Elastic: {
      In: function(t) {
        var n, e = .1,
          r = .4;
        return 0 === t ? 0 : 1 === t ? 1 : (!e || 1 > e ? (e = 1, n = r / 4) : n = r * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - n) * Math.PI / r)))
      },
      Out: function(t) {
        var n, e = .1,
          r = .4;
        return 0 === t ? 0 : 1 === t ? 1 : (!e || 1 > e ? (e = 1, n = r / 4) : n = r * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * t) * Math.sin(2 * (t - n) * Math.PI / r) + 1)
      },
      InOut: function(t) {
        var n, e = .1,
          r = .4;
        return 0 === t ? 0 : 1 === t ? 1 : (!e || 1 > e ? (e = 1, n = r / 4) : n = r * Math.asin(1 / e) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * e * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - n) * Math.PI / r) : e * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - n) * Math.PI / r) * .5 + 1)
      }
    },
    Back: {
      In: function(t) {
        var n = 1.70158;
        return t * t * ((n + 1) * t - n)
      },
      Out: function(t) {
        var n = 1.70158;
        return --t * t * ((n + 1) * t + n) + 1
      },
      InOut: function(t) {
        var n = 2.5949095;
        return (t *= 2) < 1 ? .5 * t * t * ((n + 1) * t - n) : .5 * ((t -= 2) * t * ((n + 1) * t + n) + 2)
      }
    },
    Bounce: {
      In: function(t) {
        return 1 - TWEEN.Easing.Bounce.Out(1 - t)
      },
      Out: function(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
      },
      InOut: function(t) {
        return .5 > t ? .5 * TWEEN.Easing.Bounce.In(2 * t) : .5 * TWEEN.Easing.Bounce.Out(2 * t - 1) + .5
      }
    }
  }, TWEEN.Interpolation = {
    Linear: function(t, n) {
      var e = t.length - 1,
        r = e * n,
        i = Math.floor(r),
        o = TWEEN.Interpolation.Utils.Linear;
      return 0 > n ? o(t[0], t[1], r) : n > 1 ? o(t[e], t[e - 1], e - r) : o(t[i], t[i + 1 > e ? e : i + 1], r - i)
    },
    Bezier: function(t, n) {
      var e, r = 0,
        i = t.length - 1,
        o = Math.pow,
        a = TWEEN.Interpolation.Utils.Bernstein;
      for (e = 0; i >= e; e++) r += o(1 - n, i - e) * o(n, e) * t[e] * a(i, e);
      return r
    },
    CatmullRom: function(t, n) {
      var e = t.length - 1,
        r = e * n,
        i = Math.floor(r),
        o = TWEEN.Interpolation.Utils.CatmullRom;
      return t[0] === t[e] ? (0 > n && (i = Math.floor(r = e * (1 + n))), o(t[(i - 1 + e) % e], t[i], t[(i + 1) % e], t[(i + 2) % e], r - i)) : 0 > n ? t[0] - (o(t[0], t[0], t[1], t[1], -r) - t[0]) : n > 1 ? t[e] - (o(t[e], t[e], t[e - 1], t[e - 1], r - e) - t[e]) : o(t[i ? i - 1 : 0], t[i], t[i + 1 > e ? e : i + 1], t[i + 2 > e ? e : i + 2], r - i)
    },
    Utils: {
      Linear: function(t, n, e) {
        return (n - t) * e + t
      },
      Bernstein: function(t, n) {
        var e = TWEEN.Interpolation.Utils.Factorial;
        return e(t) / e(n) / e(t - n)
      },
      Factorial: function() {
        var t = [1];
        return function(n) {
          var e, r = 1;
          if (t[n]) return t[n];
          for (e = n; e > 1; e--) r *= e;
          return t[n] = r
        }
      }(),
      CatmullRom: function(t, n, e, r, i) {
        var o = .5 * (e - t),
          a = .5 * (r - n),
          u = i * i,
          s = i * u;
        return (2 * n - 2 * e + o + a) * s + (-3 * n + 3 * e - 2 * o - a) * u + o * i + n
      }
    }
  }, "undefined" != typeof module && module.exports && (module.exports = TWEEN),
  function(t, n) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? n(t, !0) : function(t) {
      if (!t.document) throw new Error("jQuery requires a window with a document");
      return n(t)
    } : n(t)
  }("undefined" != typeof window ? window : this, function(t, n) {
    function e(t) {
      var n = t.length,
        e = K.type(t);
      return "function" === e || K.isWindow(t) ? !1 : 1 === t.nodeType && n ? !0 : "array" === e || 0 === n || "number" == typeof n && n > 0 && n - 1 in t
    }

    function r(t, n, e) {
      if (K.isFunction(n)) return K.grep(t, function(t, r) {
        return !!n.call(t, r, t) !== e
      });
      if (n.nodeType) return K.grep(t, function(t) {
        return t === n !== e
      });
      if ("string" == typeof n) {
        if (ut.test(n)) return K.filter(n, t, e);
        n = K.filter(n, t)
      }
      return K.grep(t, function(t) {
        return X.call(n, t) >= 0 !== e
      })
    }

    function i(t, n) {
      for (;
        (t = t[n]) && 1 !== t.nodeType;);
      return t
    }

    function o(t) {
      var n = dt[t] = {};
      return K.each(t.match(pt) || [], function(t, e) {
        n[e] = !0
      }), n
    }

    function a() {
      J.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1), K.ready()
    }

    function u() {
      Object.defineProperty(this.cache = {}, 0, {
        get: function() {
          return {}
        }
      }), this.expando = K.expando + u.uid++
    }

    function s(t, n, e) {
      var r;
      if (void 0 === e && 1 === t.nodeType)
        if (r = "data-" + n.replace(wt, "-$1").toLowerCase(), e = t.getAttribute(r), "string" == typeof e) {
          try {
            e = "true" === e ? !0 : "false" === e ? !1 : "null" === e ? null : +e + "" === e ? +e : bt.test(e) ? K.parseJSON(e) : e
          } catch (i) {}
          yt.set(t, n, e)
        } else e = void 0;
      return e
    }

    function c() {
      return !0
    }

    function l() {
      return !1
    }

    function f() {
      try {
        return J.activeElement
      } catch (t) {}
    }

    function h(t, n) {
      return K.nodeName(t, "table") && K.nodeName(11 !== n.nodeType ? n : n.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function p(t) {
      return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
    }

    function d(t) {
      var n = Ot.exec(t.type);
      return n ? t.type = n[1] : t.removeAttribute("type"), t
    }

    function g(t, n) {
      for (var e = 0, r = t.length; r > e; e++) mt.set(t[e], "globalEval", !n || mt.get(n[e], "globalEval"))
    }

    function v(t, n) {
      var e, r, i, o, a, u, s, c;
      if (1 === n.nodeType) {
        if (mt.hasData(t) && (o = mt.access(t), a = mt.set(n, o), c = o.events)) {
          delete a.handle, a.events = {};
          for (i in c)
            for (e = 0, r = c[i].length; r > e; e++) K.event.add(n, i, c[i][e])
        }
        yt.hasData(t) && (u = yt.access(t), s = K.extend({}, u), yt.set(n, s))
      }
    }

    function m(t, n) {
      var e = t.getElementsByTagName ? t.getElementsByTagName(n || "*") : t.querySelectorAll ? t.querySelectorAll(n || "*") : [];
      return void 0 === n || n && K.nodeName(t, n) ? K.merge([t], e) : e
    }

    function y(t, n) {
      var e = n.nodeName.toLowerCase();
      "input" === e && Mt.test(t.type) ? n.checked = t.checked : ("input" === e || "textarea" === e) && (n.defaultValue = t.defaultValue)
    }

    function b(n, e) {
      var r, i = K(e.createElement(n)).appendTo(e.body),
        o = t.getDefaultComputedStyle && (r = t.getDefaultComputedStyle(i[0])) ? r.display : K.css(i[0], "display");
      return i.detach(), o
    }

    function w(t) {
      var n = J,
        e = zt[t];
      return e || (e = b(t, n), "none" !== e && e || (Ut = (Ut || K("<iframe frameborder='0' width='0' height='0'/>")).appendTo(n.documentElement), n = Ut[0].contentDocument, n.write(), n.close(), e = b(t, n), Ut.detach()), zt[t] = e), e
    }

    function A(t, n, e) {
      var r, i, o, a, u = t.style;
      return e = e || Bt(t), e && (a = e.getPropertyValue(n) || e[n]), e && ("" !== a || K.contains(t.ownerDocument, t) || (a = K.style(t, n)), Ht.test(a) && Ft.test(n) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = e.width, u.width = r, u.minWidth = i, u.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function x(t, n) {
      return {
        get: function() {
          return t() ? void delete this.get : (this.get = n).apply(this, arguments)
        }
      }
    }

    function _(t, n) {
      if (n in t) return n;
      for (var e = n[0].toUpperCase() + n.slice(1), r = n, i = Gt.length; i--;)
        if (n = Gt[i] + e, n in t) return n;
      return r
    }

    function M(t, n, e) {
      var r = $t.exec(n);
      return r ? Math.max(0, r[1] - (e || 0)) + (r[2] || "px") : n
    }

    function k(t, n, e, r, i) {
      for (var o = e === (r ? "border" : "content") ? 4 : "width" === n ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === e && (a += K.css(t, e + xt[o], !0, i)), r ? ("content" === e && (a -= K.css(t, "padding" + xt[o], !0, i)), "margin" !== e && (a -= K.css(t, "border" + xt[o] + "Width", !0, i))) : (a += K.css(t, "padding" + xt[o], !0, i), "padding" !== e && (a += K.css(t, "border" + xt[o] + "Width", !0, i)));
      return a
    }

    function S(t, n, e) {
      var r = !0,
        i = "width" === n ? t.offsetWidth : t.offsetHeight,
        o = Bt(t),
        a = "border-box" === K.css(t, "boxSizing", !1, o);
      if (0 >= i || null == i) {
        if (i = A(t, n, o), (0 > i || null == i) && (i = t.style[n]), Ht.test(i)) return i;
        r = a && (Q.boxSizingReliable() || i === t.style[n]), i = parseFloat(i) || 0
      }
      return i + k(t, n, e || (a ? "border" : "content"), r, o) + "px"
    }

    function E(t, n) {
      for (var e, r, i, o = [], a = 0, u = t.length; u > a; a++) r = t[a], r.style && (o[a] = mt.get(r, "olddisplay"), e = r.style.display, n ? (o[a] || "none" !== e || (r.style.display = ""), "" === r.style.display && _t(r) && (o[a] = mt.access(r, "olddisplay", w(r.nodeName)))) : (i = _t(r), "none" === e && i || mt.set(r, "olddisplay", i ? e : K.css(r, "display"))));
      for (a = 0; u > a; a++) r = t[a], r.style && (n && "none" !== r.style.display && "" !== r.style.display || (r.style.display = n ? o[a] || "" : "none"));
      return t
    }

    function C(t, n, e, r, i) {
      return new C.prototype.init(t, n, e, r, i)
    }

    function T() {
      return setTimeout(function() {
        Qt = void 0
      }), Qt = K.now()
    }

    function P(t, n) {
      var e, r = 0,
        i = {
          height: t
        };
      for (n = n ? 1 : 0; 4 > r; r += 2 - n) e = xt[r], i["margin" + e] = i["padding" + e] = t;
      return n && (i.opacity = i.width = t), i
    }

    function N(t, n, e) {
      for (var r, i = (en[n] || []).concat(en["*"]), o = 0, a = i.length; a > o; o++)
        if (r = i[o].call(e, n, t)) return r
    }

    function D(t, n, e) {
      var r, i, o, a, u, s, c, l, f = this,
        h = {},
        p = t.style,
        d = t.nodeType && _t(t),
        g = mt.get(t, "fxshow");
      e.queue || (u = K._queueHooks(t, "fx"), null == u.unqueued && (u.unqueued = 0, s = u.empty.fire, u.empty.fire = function() {
        u.unqueued || s()
      }), u.unqueued++, f.always(function() {
        f.always(function() {
          u.unqueued--, K.queue(t, "fx").length || u.empty.fire()
        })
      })), 1 === t.nodeType && ("height" in n || "width" in n) && (e.overflow = [p.overflow, p.overflowX, p.overflowY], c = K.css(t, "display"), l = "none" === c ? mt.get(t, "olddisplay") || w(t.nodeName) : c, "inline" === l && "none" === K.css(t, "float") && (p.display = "inline-block")), e.overflow && (p.overflow = "hidden", f.always(function() {
        p.overflow = e.overflow[0], p.overflowX = e.overflow[1], p.overflowY = e.overflow[2]
      }));
      for (r in n)
        if (i = n[r], Zt.exec(i)) {
          if (delete n[r], o = o || "toggle" === i, i === (d ? "hide" : "show")) {
            if ("show" !== i || !g || void 0 === g[r]) continue;
            d = !0
          }
          h[r] = g && g[r] || K.style(t, r)
        } else c = void 0;
      if (K.isEmptyObject(h)) "inline" === ("none" === c ? w(t.nodeName) : c) && (p.display = c);
      else {
        g ? "hidden" in g && (d = g.hidden) : g = mt.access(t, "fxshow", {}), o && (g.hidden = !d), d ? K(t).show() : f.done(function() {
          K(t).hide()
        }), f.done(function() {
          var n;
          mt.remove(t, "fxshow");
          for (n in h) K.style(t, n, h[n])
        });
        for (r in h) a = N(d ? g[r] : 0, r, f), r in g || (g[r] = a.start, d && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
      }
    }

    function j(t, n) {
      var e, r, i, o, a;
      for (e in t)
        if (r = K.camelCase(e), i = n[r], o = t[e], K.isArray(o) && (i = o[1], o = t[e] = o[0]), e !== r && (t[r] = o, delete t[e]), a = K.cssHooks[r], a && "expand" in a) {
          o = a.expand(o), delete t[r];
          for (e in o) e in t || (t[e] = o[e], n[e] = i)
        } else n[r] = i
    }

    function L(t, n, e) {
      var r, i, o = 0,
        a = nn.length,
        u = K.Deferred().always(function() {
          delete s.elem
        }),
        s = function() {
          if (i) return !1;
          for (var n = Qt || T(), e = Math.max(0, c.startTime + c.duration - n), r = e / c.duration || 0, o = 1 - r, a = 0, s = c.tweens.length; s > a; a++) c.tweens[a].run(o);
          return u.notifyWith(t, [c, o, e]), 1 > o && s ? e : (u.resolveWith(t, [c]), !1)
        },
        c = u.promise({
          elem: t,
          props: K.extend({}, n),
          opts: K.extend(!0, {
            specialEasing: {}
          }, e),
          originalProperties: n,
          originalOptions: e,
          startTime: Qt || T(),
          duration: e.duration,
          tweens: [],
          createTween: function(n, e) {
            var r = K.Tween(t, c.opts, n, e, c.opts.specialEasing[n] || c.opts.easing);
            return c.tweens.push(r), r
          },
          stop: function(n) {
            var e = 0,
              r = n ? c.tweens.length : 0;
            if (i) return this;
            for (i = !0; r > e; e++) c.tweens[e].run(1);
            return n ? u.resolveWith(t, [c, n]) : u.rejectWith(t, [c, n]), this
          }
        }),
        l = c.props;
      for (j(l, c.opts.specialEasing); a > o; o++)
        if (r = nn[o].call(c, t, l, c.opts)) return r;
      return K.map(l, N, c), K.isFunction(c.opts.start) && c.opts.start.call(t, c), K.fx.timer(K.extend(s, {
        elem: t,
        anim: c,
        queue: c.opts.queue
      })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function R(t) {
      return function(n, e) {
        "string" != typeof n && (e = n, n = "*");
        var r, i = 0,
          o = n.toLowerCase().match(pt) || [];
        if (K.isFunction(e))
          for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(e)) : (t[r] = t[r] || []).push(e)
      }
    }

    function O(t, n, e, r) {
      function i(u) {
        var s;
        return o[u] = !0, K.each(t[u] || [], function(t, u) {
          var c = u(n, e, r);
          return "string" != typeof c || a || o[c] ? a ? !(s = c) : void 0 : (n.dataTypes.unshift(c), i(c), !1)
        }), s
      }
      var o = {},
        a = t === wn;
      return i(n.dataTypes[0]) || !o["*"] && i("*")
    }

    function I(t, n) {
      var e, r, i = K.ajaxSettings.flatOptions || {};
      for (e in n) void 0 !== n[e] && ((i[e] ? t : r || (r = {}))[e] = n[e]);
      return r && K.extend(!0, t, r), t
    }

    function q(t, n, e) {
      for (var r, i, o, a, u = t.contents, s = t.dataTypes;
        "*" === s[0];) s.shift(), void 0 === r && (r = t.mimeType || n.getResponseHeader("Content-Type"));
      if (r)
        for (i in u)
          if (u[i] && u[i].test(r)) {
            s.unshift(i);
            break
          }
      if (s[0] in e) o = s[0];
      else {
        for (i in e) {
          if (!s[0] || t.converters[i + " " + s[0]]) {
            o = i;
            break
          }
          a || (a = i)
        }
        o = o || a
      }
      return o ? (o !== s[0] && s.unshift(o), e[o]) : void 0
    }

    function U(t, n, e, r) {
      var i, o, a, u, s, c = {},
        l = t.dataTypes.slice();
      if (l[1])
        for (a in t.converters) c[a.toLowerCase()] = t.converters[a];
      for (o = l.shift(); o;)
        if (t.responseFields[o] && (e[t.responseFields[o]] = n), !s && r && t.dataFilter && (n = t.dataFilter(n, t.dataType)), s = o, o = l.shift())
          if ("*" === o) o = s;
          else if ("*" !== s && s !== o) {
        if (a = c[s + " " + o] || c["* " + o], !a)
          for (i in c)
            if (u = i.split(" "), u[1] === o && (a = c[s + " " + u[0]] || c["* " + u[0]])) {
              a === !0 ? a = c[i] : c[i] !== !0 && (o = u[0], l.unshift(u[1]));
              break
            }
        if (a !== !0)
          if (a && t["throws"]) n = a(n);
          else try {
            n = a(n)
          } catch (f) {
            return {
              state: "parsererror",
              error: a ? f : "No conversion from " + s + " to " + o
            }
          }
      }
      return {
        state: "success",
        data: n
      }
    }

    function z(t, n, e, r) {
      var i;
      if (K.isArray(n)) K.each(n, function(n, i) {
        e || kn.test(t) ? r(t, i) : z(t + "[" + ("object" == typeof i ? n : "") + "]", i, e, r)
      });
      else if (e || "object" !== K.type(n)) r(t, n);
      else
        for (i in n) z(t + "[" + i + "]", n[i], e, r)
    }

    function F(t) {
      return K.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
    }
    var H = [],
      B = H.slice,
      W = H.concat,
      $ = H.push,
      X = H.indexOf,
      V = {},
      Y = V.toString,
      G = V.hasOwnProperty,
      Q = {},
      J = t.document,
      Z = "2.1.3",
      K = function(t, n) {
        return new K.fn.init(t, n)
      },
      tt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      nt = /^-ms-/,
      et = /-([\da-z])/gi,
      rt = function(t, n) {
        return n.toUpperCase()
      };
    K.fn = K.prototype = {
      jquery: Z,
      constructor: K,
      selector: "",
      length: 0,
      toArray: function() {
        return B.call(this)
      },
      get: function(t) {
        return null != t ? 0 > t ? this[t + this.length] : this[t] : B.call(this)
      },
      pushStack: function(t) {
        var n = K.merge(this.constructor(), t);
        return n.prevObject = this, n.context = this.context, n
      },
      each: function(t, n) {
        return K.each(this, t, n)
      },
      map: function(t) {
        return this.pushStack(K.map(this, function(n, e) {
          return t.call(n, e, n)
        }))
      },
      slice: function() {
        return this.pushStack(B.apply(this, arguments))
      },
      first: function() {
        return this.eq(0)
      },
      last: function() {
        return this.eq(-1)
      },
      eq: function(t) {
        var n = this.length,
          e = +t + (0 > t ? n : 0);
        return this.pushStack(e >= 0 && n > e ? [this[e]] : [])
      },
      end: function() {
        return this.prevObject || this.constructor(null)
      },
      push: $,
      sort: H.sort,
      splice: H.splice
    }, K.extend = K.fn.extend = function() {
      var t, n, e, r, i, o, a = arguments[0] || {},
        u = 1,
        s = arguments.length,
        c = !1;
      for ("boolean" == typeof a && (c = a, a = arguments[u] || {}, u++), "object" == typeof a || K.isFunction(a) || (a = {}), u === s && (a = this, u--); s > u; u++)
        if (null != (t = arguments[u]))
          for (n in t) e = a[n], r = t[n], a !== r && (c && r && (K.isPlainObject(r) || (i = K.isArray(r))) ? (i ? (i = !1, o = e && K.isArray(e) ? e : []) : o = e && K.isPlainObject(e) ? e : {}, a[n] = K.extend(c, o, r)) : void 0 !== r && (a[n] = r));
      return a
    }, K.extend({
      expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function(t) {
        throw new Error(t)
      },
      noop: function() {},
      isFunction: function(t) {
        return "function" === K.type(t)
      },
      isArray: Array.isArray,
      isWindow: function(t) {
        return null != t && t === t.window
      },
      isNumeric: function(t) {
        return !K.isArray(t) && t - parseFloat(t) + 1 >= 0
      },
      isPlainObject: function(t) {
        return "object" !== K.type(t) || t.nodeType || K.isWindow(t) ? !1 : t.constructor && !G.call(t.constructor.prototype, "isPrototypeOf") ? !1 : !0
      },
      isEmptyObject: function(t) {
        var n;
        for (n in t) return !1;
        return !0
      },
      type: function(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? V[Y.call(t)] || "object" : typeof t
      },
      globalEval: function(t) {
        var n, e = eval;
        t = K.trim(t), t && (1 === t.indexOf("use strict") ? (n = J.createElement("script"), n.text = t, J.head.appendChild(n).parentNode.removeChild(n)) : e(t))
      },
      camelCase: function(t) {
        return t.replace(nt, "ms-").replace(et, rt)
      },
      nodeName: function(t, n) {
        return t.nodeName && t.nodeName.toLowerCase() === n.toLowerCase()
      },
      each: function(t, n, r) {
        var i, o = 0,
          a = t.length,
          u = e(t);
        if (r) {
          if (u)
            for (; a > o && (i = n.apply(t[o], r), i !== !1); o++);
          else
            for (o in t)
              if (i = n.apply(t[o], r), i === !1) break
        } else if (u)
          for (; a > o && (i = n.call(t[o], o, t[o]), i !== !1); o++);
        else
          for (o in t)
            if (i = n.call(t[o], o, t[o]), i === !1) break; return t
      },
      trim: function(t) {
        return null == t ? "" : (t + "").replace(tt, "")
      },
      makeArray: function(t, n) {
        var r = n || [];
        return null != t && (e(Object(t)) ? K.merge(r, "string" == typeof t ? [t] : t) : $.call(r, t)), r
      },
      inArray: function(t, n, e) {
        return null == n ? -1 : X.call(n, t, e)
      },
      merge: function(t, n) {
        for (var e = +n.length, r = 0, i = t.length; e > r; r++) t[i++] = n[r];
        return t.length = i, t
      },
      grep: function(t, n, e) {
        for (var r, i = [], o = 0, a = t.length, u = !e; a > o; o++) r = !n(t[o], o), r !== u && i.push(t[o]);
        return i
      },
      map: function(t, n, r) {
        var i, o = 0,
          a = t.length,
          u = e(t),
          s = [];
        if (u)
          for (; a > o; o++) i = n(t[o], o, r), null != i && s.push(i);
        else
          for (o in t) i = n(t[o], o, r), null != i && s.push(i);
        return W.apply([], s)
      },
      guid: 1,
      proxy: function(t, n) {
        var e, r, i;
        return "string" == typeof n && (e = t[n], n = t, t = e), K.isFunction(t) ? (r = B.call(arguments, 2), i = function() {
          return t.apply(n || this, r.concat(B.call(arguments)))
        }, i.guid = t.guid = t.guid || K.guid++, i) : void 0
      },
      now: Date.now,
      support: Q
    }), K.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, n) {
      V["[object " + n + "]"] = n.toLowerCase()
    });
    var it = function(t) {
      function n(t, n, e, r) {
        var i, o, a, u, s, c, f, p, d, g;
        if ((n ? n.ownerDocument || n : z) !== D && N(n), n = n || D, e = e || [], u = n.nodeType, "string" != typeof t || !t || 1 !== u && 9 !== u && 11 !== u) return e;
        if (!r && L) {
          if (11 !== u && (i = yt.exec(t)))
            if (a = i[1]) {
              if (9 === u) {
                if (o = n.getElementById(a), !o || !o.parentNode) return e;
                if (o.id === a) return e.push(o), e
              } else if (n.ownerDocument && (o = n.ownerDocument.getElementById(a)) && q(n, o) && o.id === a) return e.push(o), e
            } else {
              if (i[2]) return Z.apply(e, n.getElementsByTagName(t)), e;
              if ((a = i[3]) && A.getElementsByClassName) return Z.apply(e, n.getElementsByClassName(a)), e
            }
          if (A.qsa && (!R || !R.test(t))) {
            if (p = f = U, d = n, g = 1 !== u && t, 1 === u && "object" !== n.nodeName.toLowerCase()) {
              for (c = k(t), (f = n.getAttribute("id")) ? p = f.replace(wt, "\\$&") : n.setAttribute("id", p), p = "[id='" + p + "'] ", s = c.length; s--;) c[s] = p + h(c[s]);
              d = bt.test(t) && l(n.parentNode) || n, g = c.join(",")
            }
            if (g) try {
              return Z.apply(e, d.querySelectorAll(g)), e
            } catch (v) {} finally {
              f || n.removeAttribute("id")
            }
          }
        }
        return E(t.replace(st, "$1"), n, e, r)
      }

      function e() {
        function t(e, r) {
          return n.push(e + " ") > x.cacheLength && delete t[n.shift()], t[e + " "] = r
        }
        var n = [];
        return t
      }

      function r(t) {
        return t[U] = !0, t
      }

      function i(t) {
        var n = D.createElement("div");
        try {
          return !!t(n)
        } catch (e) {
          return !1
        } finally {
          n.parentNode && n.parentNode.removeChild(n), n = null
        }
      }

      function o(t, n) {
        for (var e = t.split("|"), r = t.length; r--;) x.attrHandle[e[r]] = n
      }

      function a(t, n) {
        var e = n && t,
          r = e && 1 === t.nodeType && 1 === n.nodeType && (~n.sourceIndex || V) - (~t.sourceIndex || V);
        if (r) return r;
        if (e)
          for (; e = e.nextSibling;)
            if (e === n) return -1;
        return t ? 1 : -1
      }

      function u(t) {
        return function(n) {
          var e = n.nodeName.toLowerCase();
          return "input" === e && n.type === t
        }
      }

      function s(t) {
        return function(n) {
          var e = n.nodeName.toLowerCase();
          return ("input" === e || "button" === e) && n.type === t
        }
      }

      function c(t) {
        return r(function(n) {
          return n = +n, r(function(e, r) {
            for (var i, o = t([], e.length, n), a = o.length; a--;) e[i = o[a]] && (e[i] = !(r[i] = e[i]))
          })
        })
      }

      function l(t) {
        return t && "undefined" != typeof t.getElementsByTagName && t
      }

      function f() {}

      function h(t) {
        for (var n = 0, e = t.length, r = ""; e > n; n++) r += t[n].value;
        return r
      }

      function p(t, n, e) {
        var r = n.dir,
          i = e && "parentNode" === r,
          o = H++;
        return n.first ? function(n, e, o) {
          for (; n = n[r];)
            if (1 === n.nodeType || i) return t(n, e, o)
        } : function(n, e, a) {
          var u, s, c = [F, o];
          if (a) {
            for (; n = n[r];)
              if ((1 === n.nodeType || i) && t(n, e, a)) return !0
          } else
            for (; n = n[r];)
              if (1 === n.nodeType || i) {
                if (s = n[U] || (n[U] = {}), (u = s[r]) && u[0] === F && u[1] === o) return c[2] = u[2];
                if (s[r] = c, c[2] = t(n, e, a)) return !0
              }
        }
      }

      function d(t) {
        return t.length > 1 ? function(n, e, r) {
          for (var i = t.length; i--;)
            if (!t[i](n, e, r)) return !1;
          return !0
        } : t[0]
      }

      function g(t, e, r) {
        for (var i = 0, o = e.length; o > i; i++) n(t, e[i], r);
        return r
      }

      function v(t, n, e, r, i) {
        for (var o, a = [], u = 0, s = t.length, c = null != n; s > u; u++)(o = t[u]) && (!e || e(o, r, i)) && (a.push(o), c && n.push(u));
        return a
      }

      function m(t, n, e, i, o, a) {
        return i && !i[U] && (i = m(i)), o && !o[U] && (o = m(o, a)), r(function(r, a, u, s) {
          var c, l, f, h = [],
            p = [],
            d = a.length,
            m = r || g(n || "*", u.nodeType ? [u] : u, []),
            y = !t || !r && n ? m : v(m, h, t, u, s),
            b = e ? o || (r ? t : d || i) ? [] : a : y;
          if (e && e(y, b, u, s), i)
            for (c = v(b, p), i(c, [], u, s), l = c.length; l--;)(f = c[l]) && (b[p[l]] = !(y[p[l]] = f));
          if (r) {
            if (o || t) {
              if (o) {
                for (c = [], l = b.length; l--;)(f = b[l]) && c.push(y[l] = f);
                o(null, b = [], c, s)
              }
              for (l = b.length; l--;)(f = b[l]) && (c = o ? tt(r, f) : h[l]) > -1 && (r[c] = !(a[c] = f))
            }
          } else b = v(b === a ? b.splice(d, b.length) : b), o ? o(null, a, b, s) : Z.apply(a, b)
        })
      }

      function y(t) {
        for (var n, e, r, i = t.length, o = x.relative[t[0].type], a = o || x.relative[" "], u = o ? 1 : 0, s = p(function(t) {
            return t === n
          }, a, !0), c = p(function(t) {
            return tt(n, t) > -1
          }, a, !0), l = [function(t, e, r) {
            var i = !o && (r || e !== C) || ((n = e).nodeType ? s(t, e, r) : c(t, e, r));
            return n = null, i
          }]; i > u; u++)
          if (e = x.relative[t[u].type]) l = [p(d(l), e)];
          else {
            if (e = x.filter[t[u].type].apply(null, t[u].matches), e[U]) {
              for (r = ++u; i > r && !x.relative[t[r].type]; r++);
              return m(u > 1 && d(l), u > 1 && h(t.slice(0, u - 1).concat({
                value: " " === t[u - 2].type ? "*" : ""
              })).replace(st, "$1"), e, r > u && y(t.slice(u, r)), i > r && y(t = t.slice(r)), i > r && h(t))
            }
            l.push(e)
          }
        return d(l)
      }

      function b(t, e) {
        var i = e.length > 0,
          o = t.length > 0,
          a = function(r, a, u, s, c) {
            var l, f, h, p = 0,
              d = "0",
              g = r && [],
              m = [],
              y = C,
              b = r || o && x.find.TAG("*", c),
              w = F += null == y ? 1 : Math.random() || .1,
              A = b.length;
            for (c && (C = a !== D && a); d !== A && null != (l = b[d]); d++) {
              if (o && l) {
                for (f = 0; h = t[f++];)
                  if (h(l, a, u)) {
                    s.push(l);
                    break
                  }
                c && (F = w)
              }
              i && ((l = !h && l) && p--, r && g.push(l))
            }
            if (p += d, i && d !== p) {
              for (f = 0; h = e[f++];) h(g, m, a, u);
              if (r) {
                if (p > 0)
                  for (; d--;) g[d] || m[d] || (m[d] = Q.call(s));
                m = v(m)
              }
              Z.apply(s, m), c && !r && m.length > 0 && p + e.length > 1 && n.uniqueSort(s)
            }
            return c && (F = w, C = y), g
          };
        return i ? r(a) : a
      }
      var w, A, x, _, M, k, S, E, C, T, P, N, D, j, L, R, O, I, q, U = "sizzle" + 1 * new Date,
        z = t.document,
        F = 0,
        H = 0,
        B = e(),
        W = e(),
        $ = e(),
        X = function(t, n) {
          return t === n && (P = !0), 0
        },
        V = 1 << 31,
        Y = {}.hasOwnProperty,
        G = [],
        Q = G.pop,
        J = G.push,
        Z = G.push,
        K = G.slice,
        tt = function(t, n) {
          for (var e = 0, r = t.length; r > e; e++)
            if (t[e] === n) return e;
          return -1
        },
        nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        et = "[\\x20\\t\\r\\n\\f]",
        rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        it = rt.replace("w", "w#"),
        ot = "\\[" + et + "*(" + rt + ")(?:" + et + "*([*^$|!~]?=)" + et + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + et + "*\\]",
        at = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
        ut = new RegExp(et + "+", "g"),
        st = new RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"),
        ct = new RegExp("^" + et + "*," + et + "*"),
        lt = new RegExp("^" + et + "*([>+~]|" + et + ")" + et + "*"),
        ft = new RegExp("=" + et + "*([^\\]'\"]*?)" + et + "*\\]", "g"),
        ht = new RegExp(at),
        pt = new RegExp("^" + it + "$"),
        dt = {
          ID: new RegExp("^#(" + rt + ")"),
          CLASS: new RegExp("^\\.(" + rt + ")"),
          TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
          ATTR: new RegExp("^" + ot),
          PSEUDO: new RegExp("^" + at),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + nt + ")$", "i"),
          needsContext: new RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")
        },
        gt = /^(?:input|select|textarea|button)$/i,
        vt = /^h\d$/i,
        mt = /^[^{]+\{\s*\[native \w/,
        yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        bt = /[+~]/,
        wt = /'|\\/g,
        At = new RegExp("\\\\([\\da-f]{1,6}" + et + "?|(" + et + ")|.)", "ig"),
        xt = function(t, n, e) {
          var r = "0x" + n - 65536;
          return r !== r || e ? n : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        },
        _t = function() {
          N()
        };
      try {
        Z.apply(G = K.call(z.childNodes), z.childNodes), G[z.childNodes.length].nodeType
      } catch (Mt) {
        Z = {
          apply: G.length ? function(t, n) {
            J.apply(t, K.call(n))
          } : function(t, n) {
            for (var e = t.length, r = 0; t[e++] = n[r++];);
            t.length = e - 1
          }
        }
      }
      A = n.support = {}, M = n.isXML = function(t) {
        var n = t && (t.ownerDocument || t).documentElement;
        return n ? "HTML" !== n.nodeName : !1
      }, N = n.setDocument = function(t) {
        var n, e, r = t ? t.ownerDocument || t : z;
        return r !== D && 9 === r.nodeType && r.documentElement ? (D = r, j = r.documentElement, e = r.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", _t, !1) : e.attachEvent && e.attachEvent("onunload", _t)), L = !M(r), A.attributes = i(function(t) {
          return t.className = "i", !t.getAttribute("className")
        }), A.getElementsByTagName = i(function(t) {
          return t.appendChild(r.createComment("")), !t.getElementsByTagName("*").length
        }), A.getElementsByClassName = mt.test(r.getElementsByClassName), A.getById = i(function(t) {
          return j.appendChild(t).id = U, !r.getElementsByName || !r.getElementsByName(U).length
        }), A.getById ? (x.find.ID = function(t, n) {
          if ("undefined" != typeof n.getElementById && L) {
            var e = n.getElementById(t);
            return e && e.parentNode ? [e] : []
          }
        }, x.filter.ID = function(t) {
          var n = t.replace(At, xt);
          return function(t) {
            return t.getAttribute("id") === n
          }
        }) : (delete x.find.ID, x.filter.ID = function(t) {
          var n = t.replace(At, xt);
          return function(t) {
            var e = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
            return e && e.value === n
          }
        }), x.find.TAG = A.getElementsByTagName ? function(t, n) {
          return "undefined" != typeof n.getElementsByTagName ? n.getElementsByTagName(t) : A.qsa ? n.querySelectorAll(t) : void 0
        } : function(t, n) {
          var e, r = [],
            i = 0,
            o = n.getElementsByTagName(t);
          if ("*" === t) {
            for (; e = o[i++];) 1 === e.nodeType && r.push(e);
            return r
          }
          return o
        }, x.find.CLASS = A.getElementsByClassName && function(t, n) {
          return L ? n.getElementsByClassName(t) : void 0
        }, O = [], R = [], (A.qsa = mt.test(r.querySelectorAll)) && (i(function(t) {
          j.appendChild(t).innerHTML = "<a id='" + U + "'></a><select id='" + U + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + et + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || R.push("\\[" + et + "*(?:value|" + nt + ")"), t.querySelectorAll("[id~=" + U + "-]").length || R.push("~="), t.querySelectorAll(":checked").length || R.push(":checked"), t.querySelectorAll("a#" + U + "+*").length || R.push(".#.+[+~]")
        }), i(function(t) {
          var n = r.createElement("input");
          n.setAttribute("type", "hidden"), t.appendChild(n).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && R.push("name" + et + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), R.push(",.*:")
        })), (A.matchesSelector = mt.test(I = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && i(function(t) {
          A.disconnectedMatch = I.call(t, "div"), I.call(t, "[s!='']:x"), O.push("!=", at)
        }), R = R.length && new RegExp(R.join("|")), O = O.length && new RegExp(O.join("|")), n = mt.test(j.compareDocumentPosition), q = n || mt.test(j.contains) ? function(t, n) {
          var e = 9 === t.nodeType ? t.documentElement : t,
            r = n && n.parentNode;
          return t === r || !(!r || 1 !== r.nodeType || !(e.contains ? e.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
        } : function(t, n) {
          if (n)
            for (; n = n.parentNode;)
              if (n === t) return !0;
          return !1
        }, X = n ? function(t, n) {
          if (t === n) return P = !0, 0;
          var e = !t.compareDocumentPosition - !n.compareDocumentPosition;
          return e ? e : (e = (t.ownerDocument || t) === (n.ownerDocument || n) ? t.compareDocumentPosition(n) : 1, 1 & e || !A.sortDetached && n.compareDocumentPosition(t) === e ? t === r || t.ownerDocument === z && q(z, t) ? -1 : n === r || n.ownerDocument === z && q(z, n) ? 1 : T ? tt(T, t) - tt(T, n) : 0 : 4 & e ? -1 : 1)
        } : function(t, n) {
          if (t === n) return P = !0, 0;
          var e, i = 0,
            o = t.parentNode,
            u = n.parentNode,
            s = [t],
            c = [n];
          if (!o || !u) return t === r ? -1 : n === r ? 1 : o ? -1 : u ? 1 : T ? tt(T, t) - tt(T, n) : 0;
          if (o === u) return a(t, n);
          for (e = t; e = e.parentNode;) s.unshift(e);
          for (e = n; e = e.parentNode;) c.unshift(e);
          for (; s[i] === c[i];) i++;
          return i ? a(s[i], c[i]) : s[i] === z ? -1 : c[i] === z ? 1 : 0
        }, r) : D
      }, n.matches = function(t, e) {
        return n(t, null, null, e)
      }, n.matchesSelector = function(t, e) {
        if ((t.ownerDocument || t) !== D && N(t), e = e.replace(ft, "='$1']"), !(!A.matchesSelector || !L || O && O.test(e) || R && R.test(e))) try {
          var r = I.call(t, e);
          if (r || A.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
        } catch (i) {}
        return n(e, D, null, [t]).length > 0
      }, n.contains = function(t, n) {
        return (t.ownerDocument || t) !== D && N(t), q(t, n)
      }, n.attr = function(t, n) {
        (t.ownerDocument || t) !== D && N(t);
        var e = x.attrHandle[n.toLowerCase()],
          r = e && Y.call(x.attrHandle, n.toLowerCase()) ? e(t, n, !L) : void 0;
        return void 0 !== r ? r : A.attributes || !L ? t.getAttribute(n) : (r = t.getAttributeNode(n)) && r.specified ? r.value : null
      }, n.error = function(t) {
        throw new Error("Syntax error, unrecognized expression: " + t)
      }, n.uniqueSort = function(t) {
        var n, e = [],
          r = 0,
          i = 0;
        if (P = !A.detectDuplicates, T = !A.sortStable && t.slice(0), t.sort(X), P) {
          for (; n = t[i++];) n === t[i] && (r = e.push(i));
          for (; r--;) t.splice(e[r], 1)
        }
        return T = null, t
      }, _ = n.getText = function(t) {
        var n, e = "",
          r = 0,
          i = t.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ("string" == typeof t.textContent) return t.textContent;
            for (t = t.firstChild; t; t = t.nextSibling) e += _(t)
          } else if (3 === i || 4 === i) return t.nodeValue
        } else
          for (; n = t[r++];) e += _(n);
        return e
      }, x = n.selectors = {
        cacheLength: 50,
        createPseudo: r,
        match: dt,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function(t) {
            return t[1] = t[1].replace(At, xt), t[3] = (t[3] || t[4] || t[5] || "").replace(At, xt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
          },
          CHILD: function(t) {
            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || n.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && n.error(t[0]), t
          },
          PSEUDO: function(t) {
            var n, e = !t[6] && t[2];
            return dt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : e && ht.test(e) && (n = k(e, !0)) && (n = e.indexOf(")", e.length - n) - e.length) && (t[0] = t[0].slice(0, n), t[2] = e.slice(0, n)), t.slice(0, 3))
          }
        },
        filter: {
          TAG: function(t) {
            var n = t.replace(At, xt).toLowerCase();
            return "*" === t ? function() {
              return !0
            } : function(t) {
              return t.nodeName && t.nodeName.toLowerCase() === n
            }
          },
          CLASS: function(t) {
            var n = B[t + " "];
            return n || (n = new RegExp("(^|" + et + ")" + t + "(" + et + "|$)")) && B(t, function(t) {
              return n.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
            })
          },
          ATTR: function(t, e, r) {
            return function(i) {
              var o = n.attr(i, t);
              return null == o ? "!=" === e : e ? (o += "", "=" === e ? o === r : "!=" === e ? o !== r : "^=" === e ? r && 0 === o.indexOf(r) : "*=" === e ? r && o.indexOf(r) > -1 : "$=" === e ? r && o.slice(-r.length) === r : "~=" === e ? (" " + o.replace(ut, " ") + " ").indexOf(r) > -1 : "|=" === e ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
            }
          },
          CHILD: function(t, n, e, r, i) {
            var o = "nth" !== t.slice(0, 3),
              a = "last" !== t.slice(-4),
              u = "of-type" === n;
            return 1 === r && 0 === i ? function(t) {
              return !!t.parentNode
            } : function(n, e, s) {
              var c, l, f, h, p, d, g = o !== a ? "nextSibling" : "previousSibling",
                v = n.parentNode,
                m = u && n.nodeName.toLowerCase(),
                y = !s && !u;
              if (v) {
                if (o) {
                  for (; g;) {
                    for (f = n; f = f[g];)
                      if (u ? f.nodeName.toLowerCase() === m : 1 === f.nodeType) return !1;
                    d = g = "only" === t && !d && "nextSibling"
                  }
                  return !0
                }
                if (d = [a ? v.firstChild : v.lastChild], a && y) {
                  for (l = v[U] || (v[U] = {}), c = l[t] || [], p = c[0] === F && c[1], h = c[0] === F && c[2], f = p && v.childNodes[p]; f = ++p && f && f[g] || (h = p = 0) || d.pop();)
                    if (1 === f.nodeType && ++h && f === n) {
                      l[t] = [F, p, h];
                      break
                    }
                } else if (y && (c = (n[U] || (n[U] = {}))[t]) && c[0] === F) h = c[1];
                else
                  for (;
                    (f = ++p && f && f[g] || (h = p = 0) || d.pop()) && ((u ? f.nodeName.toLowerCase() !== m : 1 !== f.nodeType) || !++h || (y && ((f[U] || (f[U] = {}))[t] = [F, h]), f !== n)););
                return h -= i, h === r || h % r === 0 && h / r >= 0
              }
            }
          },
          PSEUDO: function(t, e) {
            var i, o = x.pseudos[t] || x.setFilters[t.toLowerCase()] || n.error("unsupported pseudo: " + t);
            return o[U] ? o(e) : o.length > 1 ? (i = [t, t, "", e], x.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, n) {
              for (var r, i = o(t, e), a = i.length; a--;) r = tt(t, i[a]), t[r] = !(n[r] = i[a])
            }) : function(t) {
              return o(t, 0, i)
            }) : o
          }
        },
        pseudos: {
          not: r(function(t) {
            var n = [],
              e = [],
              i = S(t.replace(st, "$1"));
            return i[U] ? r(function(t, n, e, r) {
              for (var o, a = i(t, null, r, []), u = t.length; u--;)(o = a[u]) && (t[u] = !(n[u] = o))
            }) : function(t, r, o) {
              return n[0] = t, i(n, null, o, e), n[0] = null, !e.pop()
            }
          }),
          has: r(function(t) {
            return function(e) {
              return n(t, e).length > 0
            }
          }),
          contains: r(function(t) {
            return t = t.replace(At, xt),
              function(n) {
                return (n.textContent || n.innerText || _(n)).indexOf(t) > -1
              }
          }),
          lang: r(function(t) {
            return pt.test(t || "") || n.error("unsupported lang: " + t), t = t.replace(At, xt).toLowerCase(),
              function(n) {
                var e;
                do
                  if (e = L ? n.lang : n.getAttribute("xml:lang") || n.getAttribute("lang")) return e = e.toLowerCase(), e === t || 0 === e.indexOf(t + "-");
                while ((n = n.parentNode) && 1 === n.nodeType);
                return !1
              }
          }),
          target: function(n) {
            var e = t.location && t.location.hash;
            return e && e.slice(1) === n.id
          },
          root: function(t) {
            return t === j
          },
          focus: function(t) {
            return t === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
          },
          enabled: function(t) {
            return t.disabled === !1
          },
          disabled: function(t) {
            return t.disabled === !0
          },
          checked: function(t) {
            var n = t.nodeName.toLowerCase();
            return "input" === n && !!t.checked || "option" === n && !!t.selected
          },
          selected: function(t) {
            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
          },
          empty: function(t) {
            for (t = t.firstChild; t; t = t.nextSibling)
              if (t.nodeType < 6) return !1;
            return !0
          },
          parent: function(t) {
            return !x.pseudos.empty(t)
          },
          header: function(t) {
            return vt.test(t.nodeName)
          },
          input: function(t) {
            return gt.test(t.nodeName)
          },
          button: function(t) {
            var n = t.nodeName.toLowerCase();
            return "input" === n && "button" === t.type || "button" === n
          },
          text: function(t) {
            var n;
            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (n = t.getAttribute("type")) || "text" === n.toLowerCase())
          },
          first: c(function() {
            return [0]
          }),
          last: c(function(t, n) {
            return [n - 1]
          }),
          eq: c(function(t, n, e) {
            return [0 > e ? e + n : e]
          }),
          even: c(function(t, n) {
            for (var e = 0; n > e; e += 2) t.push(e);
            return t
          }),
          odd: c(function(t, n) {
            for (var e = 1; n > e; e += 2) t.push(e);
            return t
          }),
          lt: c(function(t, n, e) {
            for (var r = 0 > e ? e + n : e; --r >= 0;) t.push(r);
            return t
          }),
          gt: c(function(t, n, e) {
            for (var r = 0 > e ? e + n : e; ++r < n;) t.push(r);
            return t
          })
        }
      }, x.pseudos.nth = x.pseudos.eq;
      for (w in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        }) x.pseudos[w] = u(w);
      for (w in {
          submit: !0,
          reset: !0
        }) x.pseudos[w] = s(w);
      return f.prototype = x.filters = x.pseudos, x.setFilters = new f, k = n.tokenize = function(t, e) {
        var r, i, o, a, u, s, c, l = W[t + " "];
        if (l) return e ? 0 : l.slice(0);
        for (u = t, s = [], c = x.preFilter; u;) {
          (!r || (i = ct.exec(u))) && (i && (u = u.slice(i[0].length) || u), s.push(o = [])), r = !1, (i = lt.exec(u)) && (r = i.shift(), o.push({
            value: r,
            type: i[0].replace(st, " ")
          }), u = u.slice(r.length));
          for (a in x.filter) !(i = dt[a].exec(u)) || c[a] && !(i = c[a](i)) || (r = i.shift(), o.push({
            value: r,
            type: a,
            matches: i
          }), u = u.slice(r.length));
          if (!r) break
        }
        return e ? u.length : u ? n.error(t) : W(t, s).slice(0)
      }, S = n.compile = function(t, n) {
        var e, r = [],
          i = [],
          o = $[t + " "];
        if (!o) {
          for (n || (n = k(t)), e = n.length; e--;) o = y(n[e]), o[U] ? r.push(o) : i.push(o);
          o = $(t, b(i, r)), o.selector = t
        }
        return o
      }, E = n.select = function(t, n, e, r) {
        var i, o, a, u, s, c = "function" == typeof t && t,
          f = !r && k(t = c.selector || t);
        if (e = e || [], 1 === f.length) {
          if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && A.getById && 9 === n.nodeType && L && x.relative[o[1].type]) {
            if (n = (x.find.ID(a.matches[0].replace(At, xt), n) || [])[0], !n) return e;
            c && (n = n.parentNode), t = t.slice(o.shift().value.length)
          }
          for (i = dt.needsContext.test(t) ? 0 : o.length; i-- && (a = o[i], !x.relative[u = a.type]);)
            if ((s = x.find[u]) && (r = s(a.matches[0].replace(At, xt), bt.test(o[0].type) && l(n.parentNode) || n))) {
              if (o.splice(i, 1), t = r.length && h(o), !t) return Z.apply(e, r), e;
              break
            }
        }
        return (c || S(t, f))(r, n, !L, e, bt.test(t) && l(n.parentNode) || n), e
      }, A.sortStable = U.split("").sort(X).join("") === U, A.detectDuplicates = !!P, N(), A.sortDetached = i(function(t) {
        return 1 & t.compareDocumentPosition(D.createElement("div"))
      }), i(function(t) {
        return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
      }) || o("type|href|height|width", function(t, n, e) {
        return e ? void 0 : t.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2)
      }), A.attributes && i(function(t) {
        return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
      }) || o("value", function(t, n, e) {
        return e || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
      }), i(function(t) {
        return null == t.getAttribute("disabled")
      }) || o(nt, function(t, n, e) {
        var r;
        return e ? void 0 : t[n] === !0 ? n.toLowerCase() : (r = t.getAttributeNode(n)) && r.specified ? r.value : null
      }), n
    }(t);
    K.find = it, K.expr = it.selectors, K.expr[":"] = K.expr.pseudos, K.unique = it.uniqueSort, K.text = it.getText, K.isXMLDoc = it.isXML, K.contains = it.contains;
    var ot = K.expr.match.needsContext,
      at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      ut = /^.[^:#\[\.,]*$/;
    K.filter = function(t, n, e) {
      var r = n[0];
      return e && (t = ":not(" + t + ")"), 1 === n.length && 1 === r.nodeType ? K.find.matchesSelector(r, t) ? [r] : [] : K.find.matches(t, K.grep(n, function(t) {
        return 1 === t.nodeType
      }))
    }, K.fn.extend({
      find: function(t) {
        var n, e = this.length,
          r = [],
          i = this;
        if ("string" != typeof t) return this.pushStack(K(t).filter(function() {
          for (n = 0; e > n; n++)
            if (K.contains(i[n], this)) return !0
        }));
        for (n = 0; e > n; n++) K.find(t, i[n], r);
        return r = this.pushStack(e > 1 ? K.unique(r) : r), r.selector = this.selector ? this.selector + " " + t : t, r
      },
      filter: function(t) {
        return this.pushStack(r(this, t || [], !1))
      },
      not: function(t) {
        return this.pushStack(r(this, t || [], !0))
      },
      is: function(t) {
        return !!r(this, "string" == typeof t && ot.test(t) ? K(t) : t || [], !1).length
      }
    });
    var st, ct = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      lt = K.fn.init = function(t, n) {
        var e, r;
        if (!t) return this;
        if ("string" == typeof t) {
          if (e = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : ct.exec(t), !e || !e[1] && n) return !n || n.jquery ? (n || st).find(t) : this.constructor(n).find(t);
          if (e[1]) {
            if (n = n instanceof K ? n[0] : n, K.merge(this, K.parseHTML(e[1], n && n.nodeType ? n.ownerDocument || n : J, !0)), at.test(e[1]) && K.isPlainObject(n))
              for (e in n) K.isFunction(this[e]) ? this[e](n[e]) : this.attr(e, n[e]);
            return this
          }
          return r = J.getElementById(e[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = J, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : K.isFunction(t) ? "undefined" != typeof st.ready ? st.ready(t) : t(K) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), K.makeArray(t, this))
      };
    lt.prototype = K.fn, st = K(J);
    var ft = /^(?:parents|prev(?:Until|All))/,
      ht = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
      };
    K.extend({
      dir: function(t, n, e) {
        for (var r = [], i = void 0 !== e;
          (t = t[n]) && 9 !== t.nodeType;)
          if (1 === t.nodeType) {
            if (i && K(t).is(e)) break;
            r.push(t)
          }
        return r
      },
      sibling: function(t, n) {
        for (var e = []; t; t = t.nextSibling) 1 === t.nodeType && t !== n && e.push(t);
        return e
      }
    }), K.fn.extend({
      has: function(t) {
        var n = K(t, this),
          e = n.length;
        return this.filter(function() {
          for (var t = 0; e > t; t++)
            if (K.contains(this, n[t])) return !0
        })
      },
      closest: function(t, n) {
        for (var e, r = 0, i = this.length, o = [], a = ot.test(t) || "string" != typeof t ? K(t, n || this.context) : 0; i > r; r++)
          for (e = this[r]; e && e !== n; e = e.parentNode)
            if (e.nodeType < 11 && (a ? a.index(e) > -1 : 1 === e.nodeType && K.find.matchesSelector(e, t))) {
              o.push(e);
              break
            }
        return this.pushStack(o.length > 1 ? K.unique(o) : o)
      },
      index: function(t) {
        return t ? "string" == typeof t ? X.call(K(t), this[0]) : X.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
      },
      add: function(t, n) {
        return this.pushStack(K.unique(K.merge(this.get(), K(t, n))))
      },
      addBack: function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
      }
    }), K.each({
      parent: function(t) {
        var n = t.parentNode;
        return n && 11 !== n.nodeType ? n : null
      },
      parents: function(t) {
        return K.dir(t, "parentNode")
      },
      parentsUntil: function(t, n, e) {
        return K.dir(t, "parentNode", e)
      },
      next: function(t) {
        return i(t, "nextSibling")
      },
      prev: function(t) {
        return i(t, "previousSibling")
      },
      nextAll: function(t) {
        return K.dir(t, "nextSibling")
      },
      prevAll: function(t) {
        return K.dir(t, "previousSibling")
      },
      nextUntil: function(t, n, e) {
        return K.dir(t, "nextSibling", e)
      },
      prevUntil: function(t, n, e) {
        return K.dir(t, "previousSibling", e)
      },
      siblings: function(t) {
        return K.sibling((t.parentNode || {}).firstChild, t)
      },
      children: function(t) {
        return K.sibling(t.firstChild)
      },
      contents: function(t) {
        return t.contentDocument || K.merge([], t.childNodes)
      }
    }, function(t, n) {
      K.fn[t] = function(e, r) {
        var i = K.map(this, n, e);
        return "Until" !== t.slice(-5) && (r = e), r && "string" == typeof r && (i = K.filter(r, i)), this.length > 1 && (ht[t] || K.unique(i), ft.test(t) && i.reverse()), this.pushStack(i)
      }
    });
    var pt = /\S+/g,
      dt = {};
    K.Callbacks = function(t) {
      t = "string" == typeof t ? dt[t] || o(t) : K.extend({}, t);
      var n, e, r, i, a, u, s = [],
        c = !t.once && [],
        l = function(o) {
          for (n = t.memory && o, e = !0, u = i || 0, i = 0, a = s.length, r = !0; s && a > u; u++)
            if (s[u].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
              n = !1;
              break
            }
          r = !1, s && (c ? c.length && l(c.shift()) : n ? s = [] : f.disable())
        },
        f = {
          add: function() {
            if (s) {
              var e = s.length;
              ! function o(n) {
                K.each(n, function(n, e) {
                  var r = K.type(e);
                  "function" === r ? t.unique && f.has(e) || s.push(e) : e && e.length && "string" !== r && o(e)
                })
              }(arguments), r ? a = s.length : n && (i = e, l(n))
            }
            return this
          },
          remove: function() {
            return s && K.each(arguments, function(t, n) {
              for (var e;
                (e = K.inArray(n, s, e)) > -1;) s.splice(e, 1), r && (a >= e && a--, u >= e && u--)
            }), this
          },
          has: function(t) {
            return t ? K.inArray(t, s) > -1 : !(!s || !s.length)
          },
          empty: function() {
            return s = [], a = 0, this
          },
          disable: function() {
            return s = c = n = void 0, this
          },
          disabled: function() {
            return !s
          },
          lock: function() {
            return c = void 0, n || f.disable(), this
          },
          locked: function() {
            return !c
          },
          fireWith: function(t, n) {
            return !s || e && !c || (n = n || [], n = [t, n.slice ? n.slice() : n], r ? c.push(n) : l(n)), this
          },
          fire: function() {
            return f.fireWith(this, arguments), this
          },
          fired: function() {
            return !!e
          }
        };
      return f
    }, K.extend({
      Deferred: function(t) {
        var n = [
            ["resolve", "done", K.Callbacks("once memory"), "resolved"],
            ["reject", "fail", K.Callbacks("once memory"), "rejected"],
            ["notify", "progress", K.Callbacks("memory")]
          ],
          e = "pending",
          r = {
            state: function() {
              return e
            },
            always: function() {
              return i.done(arguments).fail(arguments), this
            },
            then: function() {
              var t = arguments;
              return K.Deferred(function(e) {
                K.each(n, function(n, o) {
                  var a = K.isFunction(t[n]) && t[n];
                  i[o[1]](function() {
                    var t = a && a.apply(this, arguments);
                    t && K.isFunction(t.promise) ? t.promise().done(e.resolve).fail(e.reject).progress(e.notify) : e[o[0] + "With"](this === r ? e.promise() : this, a ? [t] : arguments)
                  })
                }), t = null
              }).promise()
            },
            promise: function(t) {
              return null != t ? K.extend(t, r) : r
            }
          },
          i = {};
        return r.pipe = r.then, K.each(n, function(t, o) {
          var a = o[2],
            u = o[3];
          r[o[1]] = a.add, u && a.add(function() {
            e = u
          }, n[1 ^ t][2].disable, n[2][2].lock), i[o[0]] = function() {
            return i[o[0] + "With"](this === i ? r : this, arguments), this
          }, i[o[0] + "With"] = a.fireWith
        }), r.promise(i), t && t.call(i, i), i
      },
      when: function(t) {
        var n, e, r, i = 0,
          o = B.call(arguments),
          a = o.length,
          u = 1 !== a || t && K.isFunction(t.promise) ? a : 0,
          s = 1 === u ? t : K.Deferred(),
          c = function(t, e, r) {
            return function(i) {
              e[t] = this, r[t] = arguments.length > 1 ? B.call(arguments) : i, r === n ? s.notifyWith(e, r) : --u || s.resolveWith(e, r)
            }
          };
        if (a > 1)
          for (n = new Array(a), e = new Array(a), r = new Array(a); a > i; i++) o[i] && K.isFunction(o[i].promise) ? o[i].promise().done(c(i, r, o)).fail(s.reject).progress(c(i, e, n)) : --u;
        return u || s.resolveWith(r, o), s.promise()
      }
    });
    var gt;
    K.fn.ready = function(t) {
      return K.ready.promise().done(t), this
    }, K.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function(t) {
        t ? K.readyWait++ : K.ready(!0)
      },
      ready: function(t) {
        (t === !0 ? --K.readyWait : K.isReady) || (K.isReady = !0, t !== !0 && --K.readyWait > 0 || (gt.resolveWith(J, [K]), K.fn.triggerHandler && (K(J).triggerHandler("ready"), K(J).off("ready"))))
      }
    }), K.ready.promise = function(n) {
      return gt || (gt = K.Deferred(), "complete" === J.readyState ? setTimeout(K.ready) : (J.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1))), gt.promise(n)
    }, K.ready.promise();
    var vt = K.access = function(t, n, e, r, i, o, a) {
      var u = 0,
        s = t.length,
        c = null == e;
      if ("object" === K.type(e)) {
        i = !0;
        for (u in e) K.access(t, n, u, e[u], !0, o, a)
      } else if (void 0 !== r && (i = !0, K.isFunction(r) || (a = !0), c && (a ? (n.call(t, r), n = null) : (c = n, n = function(t, n, e) {
          return c.call(K(t), e)
        })), n))
        for (; s > u; u++) n(t[u], e, a ? r : r.call(t[u], u, n(t[u], e)));
      return i ? t : c ? n.call(t) : s ? n(t[0], e) : o
    };
    K.acceptData = function(t) {
      return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
    }, u.uid = 1, u.accepts = K.acceptData, u.prototype = {
      key: function(t) {
        if (!u.accepts(t)) return 0;
        var n = {},
          e = t[this.expando];
        if (!e) {
          e = u.uid++;
          try {
            n[this.expando] = {
              value: e
            }, Object.defineProperties(t, n)
          } catch (r) {
            n[this.expando] = e, K.extend(t, n)
          }
        }
        return this.cache[e] || (this.cache[e] = {}), e
      },
      set: function(t, n, e) {
        var r, i = this.key(t),
          o = this.cache[i];
        if ("string" == typeof n) o[n] = e;
        else if (K.isEmptyObject(o)) K.extend(this.cache[i], n);
        else
          for (r in n) o[r] = n[r];
        return o
      },
      get: function(t, n) {
        var e = this.cache[this.key(t)];
        return void 0 === n ? e : e[n]
      },
      access: function(t, n, e) {
        var r;
        return void 0 === n || n && "string" == typeof n && void 0 === e ? (r = this.get(t, n), void 0 !== r ? r : this.get(t, K.camelCase(n))) : (this.set(t, n, e), void 0 !== e ? e : n)
      },
      remove: function(t, n) {
        var e, r, i, o = this.key(t),
          a = this.cache[o];
        if (void 0 === n) this.cache[o] = {};
        else {
          K.isArray(n) ? r = n.concat(n.map(K.camelCase)) : (i = K.camelCase(n), n in a ? r = [n, i] : (r = i, r = r in a ? [r] : r.match(pt) || [])), e = r.length;
          for (; e--;) delete a[r[e]]
        }
      },
      hasData: function(t) {
        return !K.isEmptyObject(this.cache[t[this.expando]] || {})
      },
      discard: function(t) {
        t[this.expando] && delete this.cache[t[this.expando]]
      }
    };
    var mt = new u,
      yt = new u,
      bt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      wt = /([A-Z])/g;
    K.extend({
      hasData: function(t) {
        return yt.hasData(t) || mt.hasData(t)
      },
      data: function(t, n, e) {
        return yt.access(t, n, e)
      },
      removeData: function(t, n) {
        yt.remove(t, n)
      },
      _data: function(t, n, e) {
        return mt.access(t, n, e)
      },
      _removeData: function(t, n) {
        mt.remove(t, n)
      }
    }), K.fn.extend({
      data: function(t, n) {
        var e, r, i, o = this[0],
          a = o && o.attributes;
        if (void 0 === t) {
          if (this.length && (i = yt.get(o), 1 === o.nodeType && !mt.get(o, "hasDataAttrs"))) {
            for (e = a.length; e--;) a[e] && (r = a[e].name, 0 === r.indexOf("data-") && (r = K.camelCase(r.slice(5)), s(o, r, i[r])));
            mt.set(o, "hasDataAttrs", !0)
          }
          return i
        }
        return "object" == typeof t ? this.each(function() {
          yt.set(this, t)
        }) : vt(this, function(n) {
          var e, r = K.camelCase(t);
          if (o && void 0 === n) {
            if (e = yt.get(o, t), void 0 !== e) return e;
            if (e = yt.get(o, r), void 0 !== e) return e;
            if (e = s(o, r, void 0), void 0 !== e) return e
          } else this.each(function() {
            var e = yt.get(this, r);
            yt.set(this, r, n), -1 !== t.indexOf("-") && void 0 !== e && yt.set(this, t, n)
          })
        }, null, n, arguments.length > 1, null, !0)
      },
      removeData: function(t) {
        return this.each(function() {
          yt.remove(this, t)
        })
      }
    }), K.extend({
      queue: function(t, n, e) {
        var r;
        return t ? (n = (n || "fx") + "queue", r = mt.get(t, n), e && (!r || K.isArray(e) ? r = mt.access(t, n, K.makeArray(e)) : r.push(e)), r || []) : void 0
      },
      dequeue: function(t, n) {
        n = n || "fx";
        var e = K.queue(t, n),
          r = e.length,
          i = e.shift(),
          o = K._queueHooks(t, n),
          a = function() {
            K.dequeue(t, n)
          };
        "inprogress" === i && (i = e.shift(), r--), i && ("fx" === n && e.unshift("inprogress"), delete o.stop, i.call(t, a, o)), !r && o && o.empty.fire()
      },
      _queueHooks: function(t, n) {
        var e = n + "queueHooks";
        return mt.get(t, e) || mt.access(t, e, {
          empty: K.Callbacks("once memory").add(function() {
            mt.remove(t, [n + "queue", e])
          })
        })
      }
    }), K.fn.extend({
      queue: function(t, n) {
        var e = 2;
        return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? K.queue(this[0], t) : void 0 === n ? this : this.each(function() {
          var e = K.queue(this, t, n);
          K._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && K.dequeue(this, t)
        })
      },
      dequeue: function(t) {
        return this.each(function() {
          K.dequeue(this, t)
        })
      },
      clearQueue: function(t) {
        return this.queue(t || "fx", [])
      },
      promise: function(t, n) {
        var e, r = 1,
          i = K.Deferred(),
          o = this,
          a = this.length,
          u = function() {
            --r || i.resolveWith(o, [o])
          };
        for ("string" != typeof t && (n = t, t = void 0), t = t || "fx"; a--;) e = mt.get(o[a], t + "queueHooks"), e && e.empty && (r++, e.empty.add(u));
        return u(), i.promise(n)
      }
    });
    var At = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      xt = ["Top", "Right", "Bottom", "Left"],
      _t = function(t, n) {
        return t = n || t, "none" === K.css(t, "display") || !K.contains(t.ownerDocument, t)
      },
      Mt = /^(?:checkbox|radio)$/i;
    ! function() {
      var t = J.createDocumentFragment(),
        n = t.appendChild(J.createElement("div")),
        e = J.createElement("input");
      e.setAttribute("type", "radio"), e.setAttribute("checked", "checked"), e.setAttribute("name", "t"), n.appendChild(e), Q.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, n.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue
    }();
    var kt = "undefined";
    Q.focusinBubbles = "onfocusin" in t;
    var St = /^key/,
      Et = /^(?:mouse|pointer|contextmenu)|click/,
      Ct = /^(?:focusinfocus|focusoutblur)$/,
      Tt = /^([^.]*)(?:\.(.+)|)$/;
    K.event = {
      global: {},
      add: function(t, n, e, r, i) {
        var o, a, u, s, c, l, f, h, p, d, g, v = mt.get(t);
        if (v)
          for (e.handler && (o = e, e = o.handler, i = o.selector), e.guid || (e.guid = K.guid++), (s = v.events) || (s = v.events = {}), (a = v.handle) || (a = v.handle = function(n) {
              return typeof K !== kt && K.event.triggered !== n.type ? K.event.dispatch.apply(t, arguments) : void 0
            }), n = (n || "").match(pt) || [""], c = n.length; c--;) u = Tt.exec(n[c]) || [], p = g = u[1], d = (u[2] || "").split(".").sort(), p && (f = K.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = K.event.special[p] || {}, l = K.extend({
            type: p,
            origType: g,
            data: r,
            handler: e,
            guid: e.guid,
            selector: i,
            needsContext: i && K.expr.match.needsContext.test(i),
            namespace: d.join(".")
          }, o), (h = s[p]) || (h = s[p] = [], h.delegateCount = 0, f.setup && f.setup.call(t, r, d, a) !== !1 || t.addEventListener && t.addEventListener(p, a, !1)), f.add && (f.add.call(t, l), l.handler.guid || (l.handler.guid = e.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), K.event.global[p] = !0)
      },
      remove: function(t, n, e, r, i) {
        var o, a, u, s, c, l, f, h, p, d, g, v = mt.hasData(t) && mt.get(t);
        if (v && (s = v.events)) {
          for (n = (n || "").match(pt) || [""], c = n.length; c--;)
            if (u = Tt.exec(n[c]) || [], p = g = u[1], d = (u[2] || "").split(".").sort(), p) {
              for (f = K.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, h = s[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = h.length; o--;) l = h[o], !i && g !== l.origType || e && e.guid !== l.guid || u && !u.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (h.splice(o, 1), l.selector && h.delegateCount--, f.remove && f.remove.call(t, l));
              a && !h.length && (f.teardown && f.teardown.call(t, d, v.handle) !== !1 || K.removeEvent(t, p, v.handle), delete s[p])
            } else
              for (p in s) K.event.remove(t, p + n[c], e, r, !0);
          K.isEmptyObject(s) && (delete v.handle, mt.remove(t, "events"))
        }
      },
      trigger: function(n, e, r, i) {
        var o, a, u, s, c, l, f, h = [r || J],
          p = G.call(n, "type") ? n.type : n,
          d = G.call(n, "namespace") ? n.namespace.split(".") : [];
        if (a = u = r = r || J, 3 !== r.nodeType && 8 !== r.nodeType && !Ct.test(p + K.event.triggered) && (p.indexOf(".") >= 0 && (d = p.split("."), p = d.shift(), d.sort()), c = p.indexOf(":") < 0 && "on" + p, n = n[K.expando] ? n : new K.Event(p, "object" == typeof n && n), n.isTrigger = i ? 2 : 3, n.namespace = d.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = void 0, n.target || (n.target = r), e = null == e ? [n] : K.makeArray(e, [n]), f = K.event.special[p] || {}, i || !f.trigger || f.trigger.apply(r, e) !== !1)) {
          if (!i && !f.noBubble && !K.isWindow(r)) {
            for (s = f.delegateType || p, Ct.test(s + p) || (a = a.parentNode); a; a = a.parentNode) h.push(a), u = a;
            u === (r.ownerDocument || J) && h.push(u.defaultView || u.parentWindow || t)
          }
          for (o = 0;
            (a = h[o++]) && !n.isPropagationStopped();) n.type = o > 1 ? s : f.bindType || p, l = (mt.get(a, "events") || {})[n.type] && mt.get(a, "handle"), l && l.apply(a, e), l = c && a[c], l && l.apply && K.acceptData(a) && (n.result = l.apply(a, e), n.result === !1 && n.preventDefault());
          return n.type = p, i || n.isDefaultPrevented() || f._default && f._default.apply(h.pop(), e) !== !1 || !K.acceptData(r) || c && K.isFunction(r[p]) && !K.isWindow(r) && (u = r[c], u && (r[c] = null), K.event.triggered = p, r[p](), K.event.triggered = void 0, u && (r[c] = u)), n.result
        }
      },
      dispatch: function(t) {
        t = K.event.fix(t);
        var n, e, r, i, o, a = [],
          u = B.call(arguments),
          s = (mt.get(this, "events") || {})[t.type] || [],
          c = K.event.special[t.type] || {};
        if (u[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
          for (a = K.event.handlers.call(this, t, s), n = 0;
            (i = a[n++]) && !t.isPropagationStopped();)
            for (t.currentTarget = i.elem, e = 0;
              (o = i.handlers[e++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(o.namespace)) && (t.handleObj = o, t.data = o.data, r = ((K.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u), void 0 !== r && (t.result = r) === !1 && (t.preventDefault(), t.stopPropagation()));
          return c.postDispatch && c.postDispatch.call(this, t), t.result
        }
      },
      handlers: function(t, n) {
        var e, r, i, o, a = [],
          u = n.delegateCount,
          s = t.target;
        if (u && s.nodeType && (!t.button || "click" !== t.type))
          for (; s !== this; s = s.parentNode || this)
            if (s.disabled !== !0 || "click" !== t.type) {
              for (r = [], e = 0; u > e; e++) o = n[e], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? K(i, this).index(s) >= 0 : K.find(i, this, null, [s]).length), r[i] && r.push(o);
              r.length && a.push({
                elem: s,
                handlers: r
              })
            }
        return u < n.length && a.push({
          elem: this,
          handlers: n.slice(u)
        }), a
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function(t, n) {
          return null == t.which && (t.which = null != n.charCode ? n.charCode : n.keyCode), t
        }
      },
      mouseHooks: {
        props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function(t, n) {
          var e, r, i, o = n.button;
          return null == t.pageX && null != n.clientX && (e = t.target.ownerDocument || J, r = e.documentElement, i = e.body, t.pageX = n.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), t.pageY = n.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
        }
      },
      fix: function(t) {
        if (t[K.expando]) return t;
        var n, e, r, i = t.type,
          o = t,
          a = this.fixHooks[i];
        for (a || (this.fixHooks[i] = a = Et.test(i) ? this.mouseHooks : St.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, t = new K.Event(o), n = r.length; n--;) e = r[n], t[e] = o[e];
        return t.target || (t.target = J), 3 === t.target.nodeType && (t.target = t.target.parentNode), a.filter ? a.filter(t, o) : t
      },
      special: {
        load: {
          noBubble: !0
        },
        focus: {
          trigger: function() {
            return this !== f() && this.focus ? (this.focus(), !1) : void 0
          },
          delegateType: "focusin"
        },
        blur: {
          trigger: function() {
            return this === f() && this.blur ? (this.blur(), !1) : void 0
          },
          delegateType: "focusout"
        },
        click: {
          trigger: function() {
            return "checkbox" === this.type && this.click && K.nodeName(this, "input") ? (this.click(), !1) : void 0
          },
          _default: function(t) {
            return K.nodeName(t.target, "a")
          }
        },
        beforeunload: {
          postDispatch: function(t) {
            void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
          }
        }
      },
      simulate: function(t, n, e, r) {
        var i = K.extend(new K.Event, e, {
          type: t,
          isSimulated: !0,
          originalEvent: {}
        });
        r ? K.event.trigger(i, null, n) : K.event.dispatch.call(n, i), i.isDefaultPrevented() && e.preventDefault()
      }
    }, K.removeEvent = function(t, n, e) {
      t.removeEventListener && t.removeEventListener(n, e, !1)
    }, K.Event = function(t, n) {
      return this instanceof K.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? c : l) : this.type = t, n && K.extend(this, n), this.timeStamp = t && t.timeStamp || K.now(), void(this[K.expando] = !0)) : new K.Event(t, n)
    }, K.Event.prototype = {
      isDefaultPrevented: l,
      isPropagationStopped: l,
      isImmediatePropagationStopped: l,
      preventDefault: function() {
        var t = this.originalEvent;
        this.isDefaultPrevented = c, t && t.preventDefault && t.preventDefault()
      },
      stopPropagation: function() {
        var t = this.originalEvent;
        this.isPropagationStopped = c, t && t.stopPropagation && t.stopPropagation()
      },
      stopImmediatePropagation: function() {
        var t = this.originalEvent;
        this.isImmediatePropagationStopped = c, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
      }
    }, K.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(t, n) {
      K.event.special[t] = {
        delegateType: n,
        bindType: n,
        handle: function(t) {
          var e, r = this,
            i = t.relatedTarget,
            o = t.handleObj;
          return (!i || i !== r && !K.contains(r, i)) && (t.type = o.origType, e = o.handler.apply(this, arguments), t.type = n), e
        }
      }
    }), Q.focusinBubbles || K.each({
      focus: "focusin",
      blur: "focusout"
    }, function(t, n) {
      var e = function(t) {
        K.event.simulate(n, t.target, K.event.fix(t), !0)
      };
      K.event.special[n] = {
        setup: function() {
          var r = this.ownerDocument || this,
            i = mt.access(r, n);
          i || r.addEventListener(t, e, !0), mt.access(r, n, (i || 0) + 1)
        },
        teardown: function() {
          var r = this.ownerDocument || this,
            i = mt.access(r, n) - 1;
          i ? mt.access(r, n, i) : (r.removeEventListener(t, e, !0), mt.remove(r, n))
        }
      }
    }), K.fn.extend({
      on: function(t, n, e, r, i) {
        var o, a;
        if ("object" == typeof t) {
          "string" != typeof n && (e = e || n, n = void 0);
          for (a in t) this.on(a, n, e, t[a], i);
          return this
        }
        if (null == e && null == r ? (r = n, e = n = void 0) : null == r && ("string" == typeof n ? (r = e, e = void 0) : (r = e, e = n, n = void 0)), r === !1) r = l;
        else if (!r) return this;
        return 1 === i && (o = r, r = function(t) {
          return K().off(t), o.apply(this, arguments)
        }, r.guid = o.guid || (o.guid = K.guid++)), this.each(function() {
          K.event.add(this, t, r, e, n)
        })
      },
      one: function(t, n, e, r) {
        return this.on(t, n, e, r, 1)
      },
      off: function(t, n, e) {
        var r, i;
        if (t && t.preventDefault && t.handleObj) return r = t.handleObj, K(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
        if ("object" == typeof t) {
          for (i in t) this.off(i, n, t[i]);
          return this
        }
        return (n === !1 || "function" == typeof n) && (e = n, n = void 0), e === !1 && (e = l), this.each(function() {
          K.event.remove(this, t, e, n)
        })
      },
      trigger: function(t, n) {
        return this.each(function() {
          K.event.trigger(t, n, this)
        })
      },
      triggerHandler: function(t, n) {
        var e = this[0];
        return e ? K.event.trigger(t, n, e, !0) : void 0
      }
    });
    var Pt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      Nt = /<([\w:]+)/,
      Dt = /<|&#?\w+;/,
      jt = /<(?:script|style|link)/i,
      Lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Rt = /^$|\/(?:java|ecma)script/i,
      Ot = /^true\/(.*)/,
      It = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      qt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
    qt.optgroup = qt.option, qt.tbody = qt.tfoot = qt.colgroup = qt.caption = qt.thead, qt.th = qt.td, K.extend({
      clone: function(t, n, e) {
        var r, i, o, a, u = t.cloneNode(!0),
          s = K.contains(t.ownerDocument, t);
        if (!(Q.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || K.isXMLDoc(t)))
          for (a = m(u), o = m(t), r = 0, i = o.length; i > r; r++) y(o[r], a[r]);
        if (n)
          if (e)
            for (o = o || m(t), a = a || m(u), r = 0, i = o.length; i > r; r++) v(o[r], a[r]);
          else v(t, u);
        return a = m(u, "script"), a.length > 0 && g(a, !s && m(t, "script")), u
      },
      buildFragment: function(t, n, e, r) {
        for (var i, o, a, u, s, c, l = n.createDocumentFragment(), f = [], h = 0, p = t.length; p > h; h++)
          if (i = t[h], i || 0 === i)
            if ("object" === K.type(i)) K.merge(f, i.nodeType ? [i] : i);
            else if (Dt.test(i)) {
          for (o = o || l.appendChild(n.createElement("div")), a = (Nt.exec(i) || ["", ""])[1].toLowerCase(), u = qt[a] || qt._default, o.innerHTML = u[1] + i.replace(Pt, "<$1></$2>") + u[2], c = u[0]; c--;) o = o.lastChild;
          K.merge(f, o.childNodes), o = l.firstChild, o.textContent = ""
        } else f.push(n.createTextNode(i));
        for (l.textContent = "", h = 0; i = f[h++];)
          if ((!r || -1 === K.inArray(i, r)) && (s = K.contains(i.ownerDocument, i), o = m(l.appendChild(i), "script"), s && g(o), e))
            for (c = 0; i = o[c++];) Rt.test(i.type || "") && e.push(i);
        return l
      },
      cleanData: function(t) {
        for (var n, e, r, i, o = K.event.special, a = 0; void 0 !== (e = t[a]); a++) {
          if (K.acceptData(e) && (i = e[mt.expando], i && (n = mt.cache[i]))) {
            if (n.events)
              for (r in n.events) o[r] ? K.event.remove(e, r) : K.removeEvent(e, r, n.handle);
            mt.cache[i] && delete mt.cache[i]
          }
          delete yt.cache[e[yt.expando]]
        }
      }
    }), K.fn.extend({
      text: function(t) {
        return vt(this, function(t) {
          return void 0 === t ? K.text(this) : this.empty().each(function() {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = t)
          })
        }, null, t, arguments.length)
      },
      append: function() {
        return this.domManip(arguments, function(t) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var n = h(this, t);
            n.appendChild(t)
          }
        })
      },
      prepend: function() {
        return this.domManip(arguments, function(t) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var n = h(this, t);
            n.insertBefore(t, n.firstChild)
          }
        })
      },
      before: function() {
        return this.domManip(arguments, function(t) {
          this.parentNode && this.parentNode.insertBefore(t, this)
        })
      },
      after: function() {
        return this.domManip(arguments, function(t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
        })
      },
      remove: function(t, n) {
        for (var e, r = t ? K.filter(t, this) : this, i = 0; null != (e = r[i]); i++) n || 1 !== e.nodeType || K.cleanData(m(e)), e.parentNode && (n && K.contains(e.ownerDocument, e) && g(m(e, "script")), e.parentNode.removeChild(e));
        return this
      },
      empty: function() {
        for (var t, n = 0; null != (t = this[n]); n++) 1 === t.nodeType && (K.cleanData(m(t, !1)), t.textContent = "");
        return this
      },
      clone: function(t, n) {
        return t = null == t ? !1 : t, n = null == n ? t : n, this.map(function() {
          return K.clone(this, t, n)
        })
      },
      html: function(t) {
        return vt(this, function(t) {
          var n = this[0] || {},
            e = 0,
            r = this.length;
          if (void 0 === t && 1 === n.nodeType) return n.innerHTML;
          if ("string" == typeof t && !jt.test(t) && !qt[(Nt.exec(t) || ["", ""])[1].toLowerCase()]) {
            t = t.replace(Pt, "<$1></$2>");
            try {
              for (; r > e; e++) n = this[e] || {}, 1 === n.nodeType && (K.cleanData(m(n, !1)), n.innerHTML = t);
              n = 0
            } catch (i) {}
          }
          n && this.empty().append(t)
        }, null, t, arguments.length)
      },
      replaceWith: function() {
        var t = arguments[0];
        return this.domManip(arguments, function(n) {
          t = this.parentNode, K.cleanData(m(this)), t && t.replaceChild(n, this)
        }), t && (t.length || t.nodeType) ? this : this.remove()
      },
      detach: function(t) {
        return this.remove(t, !0)
      },
      domManip: function(t, n) {
        t = W.apply([], t);
        var e, r, i, o, a, u, s = 0,
          c = this.length,
          l = this,
          f = c - 1,
          h = t[0],
          g = K.isFunction(h);
        if (g || c > 1 && "string" == typeof h && !Q.checkClone && Lt.test(h)) return this.each(function(e) {
          var r = l.eq(e);
          g && (t[0] = h.call(this, e, r.html())), r.domManip(t, n)
        });
        if (c && (e = K.buildFragment(t, this[0].ownerDocument, !1, this), r = e.firstChild, 1 === e.childNodes.length && (e = r), r)) {
          for (i = K.map(m(e, "script"), p), o = i.length; c > s; s++) a = e, s !== f && (a = K.clone(a, !0, !0), o && K.merge(i, m(a, "script"))), n.call(this[s], a, s);
          if (o)
            for (u = i[i.length - 1].ownerDocument, K.map(i, d), s = 0; o > s; s++) a = i[s], Rt.test(a.type || "") && !mt.access(a, "globalEval") && K.contains(u, a) && (a.src ? K._evalUrl && K._evalUrl(a.src) : K.globalEval(a.textContent.replace(It, "")))
        }
        return this
      }
    }), K.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(t, n) {
      K.fn[t] = function(t) {
        for (var e, r = [], i = K(t), o = i.length - 1, a = 0; o >= a; a++) e = a === o ? this : this.clone(!0), K(i[a])[n](e), $.apply(r, e.get());
        return this.pushStack(r)
      }
    });
    var Ut, zt = {},
      Ft = /^margin/,
      Ht = new RegExp("^(" + At + ")(?!px)[a-z%]+$", "i"),
      Bt = function(n) {
        return n.ownerDocument.defaultView.opener ? n.ownerDocument.defaultView.getComputedStyle(n, null) : t.getComputedStyle(n, null)
      };
    ! function() {
      function n() {
        a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", i.appendChild(o);
        var n = t.getComputedStyle(a, null);
        e = "1%" !== n.top, r = "4px" === n.width, i.removeChild(o)
      }
      var e, r, i = J.documentElement,
        o = J.createElement("div"),
        a = J.createElement("div");
      a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), t.getComputedStyle && K.extend(Q, {
        pixelPosition: function() {
          return n(), e
        },
        boxSizingReliable: function() {
          return null == r && n(), r
        },
        reliableMarginRight: function() {
          var n, e = a.appendChild(J.createElement("div"));
          return e.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", a.style.width = "1px", i.appendChild(o), n = !parseFloat(t.getComputedStyle(e, null).marginRight), i.removeChild(o), a.removeChild(e), n
        }
      }))
    }(), K.swap = function(t, n, e, r) {
      var i, o, a = {};
      for (o in n) a[o] = t.style[o],
        t.style[o] = n[o];
      i = e.apply(t, r || []);
      for (o in n) t.style[o] = a[o];
      return i
    };
    var Wt = /^(none|table(?!-c[ea]).+)/,
      $t = new RegExp("^(" + At + ")(.*)$", "i"),
      Xt = new RegExp("^([+-])=(" + At + ")", "i"),
      Vt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      Yt = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      Gt = ["Webkit", "O", "Moz", "ms"];
    K.extend({
      cssHooks: {
        opacity: {
          get: function(t, n) {
            if (n) {
              var e = A(t, "opacity");
              return "" === e ? "1" : e
            }
          }
        }
      },
      cssNumber: {
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: {
        "float": "cssFloat"
      },
      style: function(t, n, e, r) {
        if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
          var i, o, a, u = K.camelCase(n),
            s = t.style;
          return n = K.cssProps[u] || (K.cssProps[u] = _(s, u)), a = K.cssHooks[n] || K.cssHooks[u], void 0 === e ? a && "get" in a && void 0 !== (i = a.get(t, !1, r)) ? i : s[n] : (o = typeof e, "string" === o && (i = Xt.exec(e)) && (e = (i[1] + 1) * i[2] + parseFloat(K.css(t, n)), o = "number"), null != e && e === e && ("number" !== o || K.cssNumber[u] || (e += "px"), Q.clearCloneStyle || "" !== e || 0 !== n.indexOf("background") || (s[n] = "inherit"), a && "set" in a && void 0 === (e = a.set(t, e, r)) || (s[n] = e)), void 0)
        }
      },
      css: function(t, n, e, r) {
        var i, o, a, u = K.camelCase(n);
        return n = K.cssProps[u] || (K.cssProps[u] = _(t.style, u)), a = K.cssHooks[n] || K.cssHooks[u], a && "get" in a && (i = a.get(t, !0, e)), void 0 === i && (i = A(t, n, r)), "normal" === i && n in Yt && (i = Yt[n]), "" === e || e ? (o = parseFloat(i), e === !0 || K.isNumeric(o) ? o || 0 : i) : i
      }
    }), K.each(["height", "width"], function(t, n) {
      K.cssHooks[n] = {
        get: function(t, e, r) {
          return e ? Wt.test(K.css(t, "display")) && 0 === t.offsetWidth ? K.swap(t, Vt, function() {
            return S(t, n, r)
          }) : S(t, n, r) : void 0
        },
        set: function(t, e, r) {
          var i = r && Bt(t);
          return M(t, e, r ? k(t, n, r, "border-box" === K.css(t, "boxSizing", !1, i), i) : 0)
        }
      }
    }), K.cssHooks.marginRight = x(Q.reliableMarginRight, function(t, n) {
      return n ? K.swap(t, {
        display: "inline-block"
      }, A, [t, "marginRight"]) : void 0
    }), K.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(t, n) {
      K.cssHooks[t + n] = {
        expand: function(e) {
          for (var r = 0, i = {}, o = "string" == typeof e ? e.split(" ") : [e]; 4 > r; r++) i[t + xt[r] + n] = o[r] || o[r - 2] || o[0];
          return i
        }
      }, Ft.test(t) || (K.cssHooks[t + n].set = M)
    }), K.fn.extend({
      css: function(t, n) {
        return vt(this, function(t, n, e) {
          var r, i, o = {},
            a = 0;
          if (K.isArray(n)) {
            for (r = Bt(t), i = n.length; i > a; a++) o[n[a]] = K.css(t, n[a], !1, r);
            return o
          }
          return void 0 !== e ? K.style(t, n, e) : K.css(t, n)
        }, t, n, arguments.length > 1)
      },
      show: function() {
        return E(this, !0)
      },
      hide: function() {
        return E(this)
      },
      toggle: function(t) {
        return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
          _t(this) ? K(this).show() : K(this).hide()
        })
      }
    }), K.Tween = C, C.prototype = {
      constructor: C,
      init: function(t, n, e, r, i, o) {
        this.elem = t, this.prop = e, this.easing = i || "swing", this.options = n, this.start = this.now = this.cur(), this.end = r, this.unit = o || (K.cssNumber[e] ? "" : "px")
      },
      cur: function() {
        var t = C.propHooks[this.prop];
        return t && t.get ? t.get(this) : C.propHooks._default.get(this)
      },
      run: function(t) {
        var n, e = C.propHooks[this.prop];
        return this.pos = n = this.options.duration ? K.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * n + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), e && e.set ? e.set(this) : C.propHooks._default.set(this), this
      }
    }, C.prototype.init.prototype = C.prototype, C.propHooks = {
      _default: {
        get: function(t) {
          var n;
          return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (n = K.css(t.elem, t.prop, ""), n && "auto" !== n ? n : 0) : t.elem[t.prop]
        },
        set: function(t) {
          K.fx.step[t.prop] ? K.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[K.cssProps[t.prop]] || K.cssHooks[t.prop]) ? K.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
        }
      }
    }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
      set: function(t) {
        t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
      }
    }, K.easing = {
      linear: function(t) {
        return t
      },
      swing: function(t) {
        return .5 - Math.cos(t * Math.PI) / 2
      }
    }, K.fx = C.prototype.init, K.fx.step = {};
    var Qt, Jt, Zt = /^(?:toggle|show|hide)$/,
      Kt = new RegExp("^(?:([+-])=|)(" + At + ")([a-z%]*)$", "i"),
      tn = /queueHooks$/,
      nn = [D],
      en = {
        "*": [function(t, n) {
          var e = this.createTween(t, n),
            r = e.cur(),
            i = Kt.exec(n),
            o = i && i[3] || (K.cssNumber[t] ? "" : "px"),
            a = (K.cssNumber[t] || "px" !== o && +r) && Kt.exec(K.css(e.elem, t)),
            u = 1,
            s = 20;
          if (a && a[3] !== o) {
            o = o || a[3], i = i || [], a = +r || 1;
            do u = u || ".5", a /= u, K.style(e.elem, t, a + o); while (u !== (u = e.cur() / r) && 1 !== u && --s)
          }
          return i && (a = e.start = +a || +r || 0, e.unit = o, e.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), e
        }]
      };
    K.Animation = K.extend(L, {
        tweener: function(t, n) {
          K.isFunction(t) ? (n = t, t = ["*"]) : t = t.split(" ");
          for (var e, r = 0, i = t.length; i > r; r++) e = t[r], en[e] = en[e] || [], en[e].unshift(n)
        },
        prefilter: function(t, n) {
          n ? nn.unshift(t) : nn.push(t)
        }
      }), K.speed = function(t, n, e) {
        var r = t && "object" == typeof t ? K.extend({}, t) : {
          complete: e || !e && n || K.isFunction(t) && t,
          duration: t,
          easing: e && n || n && !K.isFunction(n) && n
        };
        return r.duration = K.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in K.fx.speeds ? K.fx.speeds[r.duration] : K.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
          K.isFunction(r.old) && r.old.call(this), r.queue && K.dequeue(this, r.queue)
        }, r
      }, K.fn.extend({
        fadeTo: function(t, n, e, r) {
          return this.filter(_t).css("opacity", 0).show().end().animate({
            opacity: n
          }, t, e, r)
        },
        animate: function(t, n, e, r) {
          var i = K.isEmptyObject(t),
            o = K.speed(n, e, r),
            a = function() {
              var n = L(this, K.extend({}, t), o);
              (i || mt.get(this, "finish")) && n.stop(!0)
            };
          return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(t, n, e) {
          var r = function(t) {
            var n = t.stop;
            delete t.stop, n(e)
          };
          return "string" != typeof t && (e = n, n = t, t = void 0), n && t !== !1 && this.queue(t || "fx", []), this.each(function() {
            var n = !0,
              i = null != t && t + "queueHooks",
              o = K.timers,
              a = mt.get(this);
            if (i) a[i] && a[i].stop && r(a[i]);
            else
              for (i in a) a[i] && a[i].stop && tn.test(i) && r(a[i]);
            for (i = o.length; i--;) o[i].elem !== this || null != t && o[i].queue !== t || (o[i].anim.stop(e), n = !1, o.splice(i, 1));
            (n || !e) && K.dequeue(this, t)
          })
        },
        finish: function(t) {
          return t !== !1 && (t = t || "fx"), this.each(function() {
            var n, e = mt.get(this),
              r = e[t + "queue"],
              i = e[t + "queueHooks"],
              o = K.timers,
              a = r ? r.length : 0;
            for (e.finish = !0, K.queue(this, t, []), i && i.stop && i.stop.call(this, !0), n = o.length; n--;) o[n].elem === this && o[n].queue === t && (o[n].anim.stop(!0), o.splice(n, 1));
            for (n = 0; a > n; n++) r[n] && r[n].finish && r[n].finish.call(this);
            delete e.finish
          })
        }
      }), K.each(["toggle", "show", "hide"], function(t, n) {
        var e = K.fn[n];
        K.fn[n] = function(t, r, i) {
          return null == t || "boolean" == typeof t ? e.apply(this, arguments) : this.animate(P(n, !0), t, r, i)
        }
      }), K.each({
        slideDown: P("show"),
        slideUp: P("hide"),
        slideToggle: P("toggle"),
        fadeIn: {
          opacity: "show"
        },
        fadeOut: {
          opacity: "hide"
        },
        fadeToggle: {
          opacity: "toggle"
        }
      }, function(t, n) {
        K.fn[t] = function(t, e, r) {
          return this.animate(n, t, e, r)
        }
      }), K.timers = [], K.fx.tick = function() {
        var t, n = 0,
          e = K.timers;
        for (Qt = K.now(); n < e.length; n++) t = e[n], t() || e[n] !== t || e.splice(n--, 1);
        e.length || K.fx.stop(), Qt = void 0
      }, K.fx.timer = function(t) {
        K.timers.push(t), t() ? K.fx.start() : K.timers.pop()
      }, K.fx.interval = 13, K.fx.start = function() {
        Jt || (Jt = setInterval(K.fx.tick, K.fx.interval))
      }, K.fx.stop = function() {
        clearInterval(Jt), Jt = null
      }, K.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
      }, K.fn.delay = function(t, n) {
        return t = K.fx ? K.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, e) {
          var r = setTimeout(n, t);
          e.stop = function() {
            clearTimeout(r)
          }
        })
      },
      function() {
        var t = J.createElement("input"),
          n = J.createElement("select"),
          e = n.appendChild(J.createElement("option"));
        t.type = "checkbox", Q.checkOn = "" !== t.value, Q.optSelected = e.selected, n.disabled = !0, Q.optDisabled = !e.disabled, t = J.createElement("input"), t.value = "t", t.type = "radio", Q.radioValue = "t" === t.value
      }();
    var rn, on, an = K.expr.attrHandle;
    K.fn.extend({
      attr: function(t, n) {
        return vt(this, K.attr, t, n, arguments.length > 1)
      },
      removeAttr: function(t) {
        return this.each(function() {
          K.removeAttr(this, t)
        })
      }
    }), K.extend({
      attr: function(t, n, e) {
        var r, i, o = t.nodeType;
        if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === kt ? K.prop(t, n, e) : (1 === o && K.isXMLDoc(t) || (n = n.toLowerCase(), r = K.attrHooks[n] || (K.expr.match.bool.test(n) ? on : rn)), void 0 === e ? r && "get" in r && null !== (i = r.get(t, n)) ? i : (i = K.find.attr(t, n), null == i ? void 0 : i) : null !== e ? r && "set" in r && void 0 !== (i = r.set(t, e, n)) ? i : (t.setAttribute(n, e + ""), e) : void K.removeAttr(t, n))
      },
      removeAttr: function(t, n) {
        var e, r, i = 0,
          o = n && n.match(pt);
        if (o && 1 === t.nodeType)
          for (; e = o[i++];) r = K.propFix[e] || e, K.expr.match.bool.test(e) && (t[r] = !1), t.removeAttribute(e)
      },
      attrHooks: {
        type: {
          set: function(t, n) {
            if (!Q.radioValue && "radio" === n && K.nodeName(t, "input")) {
              var e = t.value;
              return t.setAttribute("type", n), e && (t.value = e), n
            }
          }
        }
      }
    }), on = {
      set: function(t, n, e) {
        return n === !1 ? K.removeAttr(t, e) : t.setAttribute(e, e), e
      }
    }, K.each(K.expr.match.bool.source.match(/\w+/g), function(t, n) {
      var e = an[n] || K.find.attr;
      an[n] = function(t, n, r) {
        var i, o;
        return r || (o = an[n], an[n] = i, i = null != e(t, n, r) ? n.toLowerCase() : null, an[n] = o), i
      }
    });
    var un = /^(?:input|select|textarea|button)$/i;
    K.fn.extend({
      prop: function(t, n) {
        return vt(this, K.prop, t, n, arguments.length > 1)
      },
      removeProp: function(t) {
        return this.each(function() {
          delete this[K.propFix[t] || t]
        })
      }
    }), K.extend({
      propFix: {
        "for": "htmlFor",
        "class": "className"
      },
      prop: function(t, n, e) {
        var r, i, o, a = t.nodeType;
        if (t && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !K.isXMLDoc(t), o && (n = K.propFix[n] || n, i = K.propHooks[n]), void 0 !== e ? i && "set" in i && void 0 !== (r = i.set(t, e, n)) ? r : t[n] = e : i && "get" in i && null !== (r = i.get(t, n)) ? r : t[n]
      },
      propHooks: {
        tabIndex: {
          get: function(t) {
            return t.hasAttribute("tabindex") || un.test(t.nodeName) || t.href ? t.tabIndex : -1
          }
        }
      }
    }), Q.optSelected || (K.propHooks.selected = {
      get: function(t) {
        var n = t.parentNode;
        return n && n.parentNode && n.parentNode.selectedIndex, null
      }
    }), K.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
      K.propFix[this.toLowerCase()] = this
    });
    var sn = /[\t\r\n\f]/g;
    K.fn.extend({
      addClass: function(t) {
        var n, e, r, i, o, a, u = "string" == typeof t && t,
          s = 0,
          c = this.length;
        if (K.isFunction(t)) return this.each(function(n) {
          K(this).addClass(t.call(this, n, this.className))
        });
        if (u)
          for (n = (t || "").match(pt) || []; c > s; s++)
            if (e = this[s], r = 1 === e.nodeType && (e.className ? (" " + e.className + " ").replace(sn, " ") : " ")) {
              for (o = 0; i = n[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
              a = K.trim(r), e.className !== a && (e.className = a)
            }
        return this
      },
      removeClass: function(t) {
        var n, e, r, i, o, a, u = 0 === arguments.length || "string" == typeof t && t,
          s = 0,
          c = this.length;
        if (K.isFunction(t)) return this.each(function(n) {
          K(this).removeClass(t.call(this, n, this.className))
        });
        if (u)
          for (n = (t || "").match(pt) || []; c > s; s++)
            if (e = this[s], r = 1 === e.nodeType && (e.className ? (" " + e.className + " ").replace(sn, " ") : "")) {
              for (o = 0; i = n[o++];)
                for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
              a = t ? K.trim(r) : "", e.className !== a && (e.className = a)
            }
        return this
      },
      toggleClass: function(t, n) {
        var e = typeof t;
        return "boolean" == typeof n && "string" === e ? n ? this.addClass(t) : this.removeClass(t) : this.each(K.isFunction(t) ? function(e) {
          K(this).toggleClass(t.call(this, e, this.className, n), n)
        } : function() {
          if ("string" === e)
            for (var n, r = 0, i = K(this), o = t.match(pt) || []; n = o[r++];) i.hasClass(n) ? i.removeClass(n) : i.addClass(n);
          else(e === kt || "boolean" === e) && (this.className && mt.set(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : mt.get(this, "__className__") || "")
        })
      },
      hasClass: function(t) {
        for (var n = " " + t + " ", e = 0, r = this.length; r > e; e++)
          if (1 === this[e].nodeType && (" " + this[e].className + " ").replace(sn, " ").indexOf(n) >= 0) return !0;
        return !1
      }
    });
    var cn = /\r/g;
    K.fn.extend({
      val: function(t) {
        var n, e, r, i = this[0]; {
          if (arguments.length) return r = K.isFunction(t), this.each(function(e) {
            var i;
            1 === this.nodeType && (i = r ? t.call(this, e, K(this).val()) : t, null == i ? i = "" : "number" == typeof i ? i += "" : K.isArray(i) && (i = K.map(i, function(t) {
              return null == t ? "" : t + ""
            })), n = K.valHooks[this.type] || K.valHooks[this.nodeName.toLowerCase()], n && "set" in n && void 0 !== n.set(this, i, "value") || (this.value = i))
          });
          if (i) return n = K.valHooks[i.type] || K.valHooks[i.nodeName.toLowerCase()], n && "get" in n && void 0 !== (e = n.get(i, "value")) ? e : (e = i.value, "string" == typeof e ? e.replace(cn, "") : null == e ? "" : e)
        }
      }
    }), K.extend({
      valHooks: {
        option: {
          get: function(t) {
            var n = K.find.attr(t, "value");
            return null != n ? n : K.trim(K.text(t))
          }
        },
        select: {
          get: function(t) {
            for (var n, e, r = t.options, i = t.selectedIndex, o = "select-one" === t.type || 0 > i, a = o ? null : [], u = o ? i + 1 : r.length, s = 0 > i ? u : o ? i : 0; u > s; s++)
              if (e = r[s], !(!e.selected && s !== i || (Q.optDisabled ? e.disabled : null !== e.getAttribute("disabled")) || e.parentNode.disabled && K.nodeName(e.parentNode, "optgroup"))) {
                if (n = K(e).val(), o) return n;
                a.push(n)
              }
            return a
          },
          set: function(t, n) {
            for (var e, r, i = t.options, o = K.makeArray(n), a = i.length; a--;) r = i[a], (r.selected = K.inArray(r.value, o) >= 0) && (e = !0);
            return e || (t.selectedIndex = -1), o
          }
        }
      }
    }), K.each(["radio", "checkbox"], function() {
      K.valHooks[this] = {
        set: function(t, n) {
          return K.isArray(n) ? t.checked = K.inArray(K(t).val(), n) >= 0 : void 0
        }
      }, Q.checkOn || (K.valHooks[this].get = function(t) {
        return null === t.getAttribute("value") ? "on" : t.value
      })
    }), K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, n) {
      K.fn[n] = function(t, e) {
        return arguments.length > 0 ? this.on(n, null, t, e) : this.trigger(n)
      }
    }), K.fn.extend({
      hover: function(t, n) {
        return this.mouseenter(t).mouseleave(n || t)
      },
      bind: function(t, n, e) {
        return this.on(t, null, n, e)
      },
      unbind: function(t, n) {
        return this.off(t, null, n)
      },
      delegate: function(t, n, e, r) {
        return this.on(n, t, e, r)
      },
      undelegate: function(t, n, e) {
        return 1 === arguments.length ? this.off(t, "**") : this.off(n, t || "**", e)
      }
    });
    var ln = K.now(),
      fn = /\?/;
    K.parseJSON = function(t) {
      return JSON.parse(t + "")
    }, K.parseXML = function(t) {
      var n, e;
      if (!t || "string" != typeof t) return null;
      try {
        e = new DOMParser, n = e.parseFromString(t, "text/xml")
      } catch (r) {
        n = void 0
      }
      return (!n || n.getElementsByTagName("parsererror").length) && K.error("Invalid XML: " + t), n
    };
    var hn = /#.*$/,
      pn = /([?&])_=[^&]*/,
      dn = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      gn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      vn = /^(?:GET|HEAD)$/,
      mn = /^\/\//,
      yn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      bn = {},
      wn = {},
      An = "*/".concat("*"),
      xn = t.location.href,
      _n = yn.exec(xn.toLowerCase()) || [];
    K.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: xn,
        type: "GET",
        isLocal: gn.test(_n[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": An,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /xml/,
          html: /html/,
          json: /json/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": K.parseJSON,
          "text xml": K.parseXML
        },
        flatOptions: {
          url: !0,
          context: !0
        }
      },
      ajaxSetup: function(t, n) {
        return n ? I(I(t, K.ajaxSettings), n) : I(K.ajaxSettings, t)
      },
      ajaxPrefilter: R(bn),
      ajaxTransport: R(wn),
      ajax: function(t, n) {
        function e(t, n, e, a) {
          var s, l, m, y, w, x = n;
          2 !== b && (b = 2, u && clearTimeout(u), r = void 0, o = a || "", A.readyState = t > 0 ? 4 : 0, s = t >= 200 && 300 > t || 304 === t, e && (y = q(f, A, e)), y = U(f, y, A, s), s ? (f.ifModified && (w = A.getResponseHeader("Last-Modified"), w && (K.lastModified[i] = w), w = A.getResponseHeader("etag"), w && (K.etag[i] = w)), 204 === t || "HEAD" === f.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = y.state, l = y.data, m = y.error, s = !m)) : (m = x, (t || !x) && (x = "error", 0 > t && (t = 0))), A.status = t, A.statusText = (n || x) + "", s ? d.resolveWith(h, [l, x, A]) : d.rejectWith(h, [A, x, m]), A.statusCode(v), v = void 0, c && p.trigger(s ? "ajaxSuccess" : "ajaxError", [A, f, s ? l : m]), g.fireWith(h, [A, x]), c && (p.trigger("ajaxComplete", [A, f]), --K.active || K.event.trigger("ajaxStop")))
        }
        "object" == typeof t && (n = t, t = void 0), n = n || {};
        var r, i, o, a, u, s, c, l, f = K.ajaxSetup({}, n),
          h = f.context || f,
          p = f.context && (h.nodeType || h.jquery) ? K(h) : K.event,
          d = K.Deferred(),
          g = K.Callbacks("once memory"),
          v = f.statusCode || {},
          m = {},
          y = {},
          b = 0,
          w = "canceled",
          A = {
            readyState: 0,
            getResponseHeader: function(t) {
              var n;
              if (2 === b) {
                if (!a)
                  for (a = {}; n = dn.exec(o);) a[n[1].toLowerCase()] = n[2];
                n = a[t.toLowerCase()]
              }
              return null == n ? null : n
            },
            getAllResponseHeaders: function() {
              return 2 === b ? o : null
            },
            setRequestHeader: function(t, n) {
              var e = t.toLowerCase();
              return b || (t = y[e] = y[e] || t, m[t] = n), this
            },
            overrideMimeType: function(t) {
              return b || (f.mimeType = t), this
            },
            statusCode: function(t) {
              var n;
              if (t)
                if (2 > b)
                  for (n in t) v[n] = [v[n], t[n]];
                else A.always(t[A.status]);
              return this
            },
            abort: function(t) {
              var n = t || w;
              return r && r.abort(n), e(0, n), this
            }
          };
        if (d.promise(A).complete = g.add, A.success = A.done, A.error = A.fail, f.url = ((t || f.url || xn) + "").replace(hn, "").replace(mn, _n[1] + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = K.trim(f.dataType || "*").toLowerCase().match(pt) || [""], null == f.crossDomain && (s = yn.exec(f.url.toLowerCase()), f.crossDomain = !(!s || s[1] === _n[1] && s[2] === _n[2] && (s[3] || ("http:" === s[1] ? "80" : "443")) === (_n[3] || ("http:" === _n[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = K.param(f.data, f.traditional)), O(bn, f, n, A), 2 === b) return A;
        c = K.event && f.global, c && 0 === K.active++ && K.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !vn.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (fn.test(i) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = pn.test(i) ? i.replace(pn, "$1_=" + ln++) : i + (fn.test(i) ? "&" : "?") + "_=" + ln++)), f.ifModified && (K.lastModified[i] && A.setRequestHeader("If-Modified-Since", K.lastModified[i]), K.etag[i] && A.setRequestHeader("If-None-Match", K.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && A.setRequestHeader("Content-Type", f.contentType), A.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + An + "; q=0.01" : "") : f.accepts["*"]);
        for (l in f.headers) A.setRequestHeader(l, f.headers[l]);
        if (f.beforeSend && (f.beforeSend.call(h, A, f) === !1 || 2 === b)) return A.abort();
        w = "abort";
        for (l in {
            success: 1,
            error: 1,
            complete: 1
          }) A[l](f[l]);
        if (r = O(wn, f, n, A)) {
          A.readyState = 1, c && p.trigger("ajaxSend", [A, f]), f.async && f.timeout > 0 && (u = setTimeout(function() {
            A.abort("timeout")
          }, f.timeout));
          try {
            b = 1, r.send(m, e)
          } catch (x) {
            if (!(2 > b)) throw x;
            e(-1, x)
          }
        } else e(-1, "No Transport");
        return A
      },
      getJSON: function(t, n, e) {
        return K.get(t, n, e, "json")
      },
      getScript: function(t, n) {
        return K.get(t, void 0, n, "script")
      }
    }), K.each(["get", "post"], function(t, n) {
      K[n] = function(t, e, r, i) {
        return K.isFunction(e) && (i = i || r, r = e, e = void 0), K.ajax({
          url: t,
          type: n,
          dataType: i,
          data: e,
          success: r
        })
      }
    }), K._evalUrl = function(t) {
      return K.ajax({
        url: t,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        "throws": !0
      })
    }, K.fn.extend({
      wrapAll: function(t) {
        var n;
        return K.isFunction(t) ? this.each(function(n) {
          K(this).wrapAll(t.call(this, n))
        }) : (this[0] && (n = K(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && n.insertBefore(this[0]), n.map(function() {
          for (var t = this; t.firstElementChild;) t = t.firstElementChild;
          return t
        }).append(this)), this)
      },
      wrapInner: function(t) {
        return this.each(K.isFunction(t) ? function(n) {
          K(this).wrapInner(t.call(this, n))
        } : function() {
          var n = K(this),
            e = n.contents();
          e.length ? e.wrapAll(t) : n.append(t)
        })
      },
      wrap: function(t) {
        var n = K.isFunction(t);
        return this.each(function(e) {
          K(this).wrapAll(n ? t.call(this, e) : t)
        })
      },
      unwrap: function() {
        return this.parent().each(function() {
          K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
        }).end()
      }
    }), K.expr.filters.hidden = function(t) {
      return t.offsetWidth <= 0 && t.offsetHeight <= 0
    }, K.expr.filters.visible = function(t) {
      return !K.expr.filters.hidden(t)
    };
    var Mn = /%20/g,
      kn = /\[\]$/,
      Sn = /\r?\n/g,
      En = /^(?:submit|button|image|reset|file)$/i,
      Cn = /^(?:input|select|textarea|keygen)/i;
    K.param = function(t, n) {
      var e, r = [],
        i = function(t, n) {
          n = K.isFunction(n) ? n() : null == n ? "" : n, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(n)
        };
      if (void 0 === n && (n = K.ajaxSettings && K.ajaxSettings.traditional), K.isArray(t) || t.jquery && !K.isPlainObject(t)) K.each(t, function() {
        i(this.name, this.value)
      });
      else
        for (e in t) z(e, t[e], n, i);
      return r.join("&").replace(Mn, "+")
    }, K.fn.extend({
      serialize: function() {
        return K.param(this.serializeArray())
      },
      serializeArray: function() {
        return this.map(function() {
          var t = K.prop(this, "elements");
          return t ? K.makeArray(t) : this
        }).filter(function() {
          var t = this.type;
          return this.name && !K(this).is(":disabled") && Cn.test(this.nodeName) && !En.test(t) && (this.checked || !Mt.test(t))
        }).map(function(t, n) {
          var e = K(this).val();
          return null == e ? null : K.isArray(e) ? K.map(e, function(t) {
            return {
              name: n.name,
              value: t.replace(Sn, "\r\n")
            }
          }) : {
            name: n.name,
            value: e.replace(Sn, "\r\n")
          }
        }).get()
      }
    }), K.ajaxSettings.xhr = function() {
      try {
        return new XMLHttpRequest
      } catch (t) {}
    };
    var Tn = 0,
      Pn = {},
      Nn = {
        0: 200,
        1223: 204
      },
      Dn = K.ajaxSettings.xhr();
    t.attachEvent && t.attachEvent("onunload", function() {
      for (var t in Pn) Pn[t]()
    }), Q.cors = !!Dn && "withCredentials" in Dn, Q.ajax = Dn = !!Dn, K.ajaxTransport(function(t) {
      var n;
      return Q.cors || Dn && !t.crossDomain ? {
        send: function(e, r) {
          var i, o = t.xhr(),
            a = ++Tn;
          if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
            for (i in t.xhrFields) o[i] = t.xhrFields[i];
          t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
          for (i in e) o.setRequestHeader(i, e[i]);
          n = function(t) {
            return function() {
              n && (delete Pn[a], n = o.onload = o.onerror = null, "abort" === t ? o.abort() : "error" === t ? r(o.status, o.statusText) : r(Nn[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                text: o.responseText
              } : void 0, o.getAllResponseHeaders()))
            }
          }, o.onload = n(), o.onerror = n("error"), n = Pn[a] = n("abort");
          try {
            o.send(t.hasContent && t.data || null)
          } catch (u) {
            if (n) throw u
          }
        },
        abort: function() {
          n && n()
        }
      } : void 0
    }), K.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /(?:java|ecma)script/
      },
      converters: {
        "text script": function(t) {
          return K.globalEval(t), t
        }
      }
    }), K.ajaxPrefilter("script", function(t) {
      void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
    }), K.ajaxTransport("script", function(t) {
      if (t.crossDomain) {
        var n, e;
        return {
          send: function(r, i) {
            n = K("<script>").prop({
              async: !0,
              charset: t.scriptCharset,
              src: t.url
            }).on("load error", e = function(t) {
              n.remove(), e = null, t && i("error" === t.type ? 404 : 200, t.type)
            }), J.head.appendChild(n[0])
          },
          abort: function() {
            e && e()
          }
        }
      }
    });
    var jn = [],
      Ln = /(=)\?(?=&|$)|\?\?/;
    K.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var t = jn.pop() || K.expando + "_" + ln++;
        return this[t] = !0, t
      }
    }), K.ajaxPrefilter("json jsonp", function(n, e, r) {
      var i, o, a, u = n.jsonp !== !1 && (Ln.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Ln.test(n.data) && "data");
      return u || "jsonp" === n.dataTypes[0] ? (i = n.jsonpCallback = K.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Ln, "$1" + i) : n.jsonp !== !1 && (n.url += (fn.test(n.url) ? "&" : "?") + n.jsonp + "=" + i), n.converters["script json"] = function() {
        return a || K.error(i + " was not called"), a[0]
      }, n.dataTypes[0] = "json", o = t[i], t[i] = function() {
        a = arguments
      }, r.always(function() {
        t[i] = o, n[i] && (n.jsonpCallback = e.jsonpCallback, jn.push(i)), a && K.isFunction(o) && o(a[0]), a = o = void 0
      }), "script") : void 0
    }), K.parseHTML = function(t, n, e) {
      if (!t || "string" != typeof t) return null;
      "boolean" == typeof n && (e = n, n = !1), n = n || J;
      var r = at.exec(t),
        i = !e && [];
      return r ? [n.createElement(r[1])] : (r = K.buildFragment([t], n, i), i && i.length && K(i).remove(), K.merge([], r.childNodes))
    };
    var Rn = K.fn.load;
    K.fn.load = function(t, n, e) {
      if ("string" != typeof t && Rn) return Rn.apply(this, arguments);
      var r, i, o, a = this,
        u = t.indexOf(" ");
      return u >= 0 && (r = K.trim(t.slice(u)), t = t.slice(0, u)), K.isFunction(n) ? (e = n, n = void 0) : n && "object" == typeof n && (i = "POST"), a.length > 0 && K.ajax({
        url: t,
        type: i,
        dataType: "html",
        data: n
      }).done(function(t) {
        o = arguments, a.html(r ? K("<div>").append(K.parseHTML(t)).find(r) : t)
      }).complete(e && function(t, n) {
        a.each(e, o || [t.responseText, n, t])
      }), this
    }, K.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, n) {
      K.fn[n] = function(t) {
        return this.on(n, t)
      }
    }), K.expr.filters.animated = function(t) {
      return K.grep(K.timers, function(n) {
        return t === n.elem
      }).length
    };
    var On = t.document.documentElement;
    K.offset = {
      setOffset: function(t, n, e) {
        var r, i, o, a, u, s, c, l = K.css(t, "position"),
          f = K(t),
          h = {};
        "static" === l && (t.style.position = "relative"), u = f.offset(), o = K.css(t, "top"), s = K.css(t, "left"), c = ("absolute" === l || "fixed" === l) && (o + s).indexOf("auto") > -1, c ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(s) || 0), K.isFunction(n) && (n = n.call(t, e, u)), null != n.top && (h.top = n.top - u.top + a), null != n.left && (h.left = n.left - u.left + i), "using" in n ? n.using.call(t, h) : f.css(h)
      }
    }, K.fn.extend({
      offset: function(t) {
        if (arguments.length) return void 0 === t ? this : this.each(function(n) {
          K.offset.setOffset(this, t, n)
        });
        var n, e, r = this[0],
          i = {
            top: 0,
            left: 0
          },
          o = r && r.ownerDocument;
        if (o) return n = o.documentElement, K.contains(n, r) ? (typeof r.getBoundingClientRect !== kt && (i = r.getBoundingClientRect()), e = F(o), {
          top: i.top + e.pageYOffset - n.clientTop,
          left: i.left + e.pageXOffset - n.clientLeft
        }) : i
      },
      position: function() {
        if (this[0]) {
          var t, n, e = this[0],
            r = {
              top: 0,
              left: 0
            };
          return "fixed" === K.css(e, "position") ? n = e.getBoundingClientRect() : (t = this.offsetParent(), n = this.offset(), K.nodeName(t[0], "html") || (r = t.offset()), r.top += K.css(t[0], "borderTopWidth", !0), r.left += K.css(t[0], "borderLeftWidth", !0)), {
            top: n.top - r.top - K.css(e, "marginTop", !0),
            left: n.left - r.left - K.css(e, "marginLeft", !0)
          }
        }
      },
      offsetParent: function() {
        return this.map(function() {
          for (var t = this.offsetParent || On; t && !K.nodeName(t, "html") && "static" === K.css(t, "position");) t = t.offsetParent;
          return t || On
        })
      }
    }), K.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function(n, e) {
      var r = "pageYOffset" === e;
      K.fn[n] = function(i) {
        return vt(this, function(n, i, o) {
          var a = F(n);
          return void 0 === o ? a ? a[e] : n[i] : void(a ? a.scrollTo(r ? t.pageXOffset : o, r ? o : t.pageYOffset) : n[i] = o)
        }, n, i, arguments.length, null)
      }
    }), K.each(["top", "left"], function(t, n) {
      K.cssHooks[n] = x(Q.pixelPosition, function(t, e) {
        return e ? (e = A(t, n), Ht.test(e) ? K(t).position()[n] + "px" : e) : void 0
      })
    }), K.each({
      Height: "height",
      Width: "width"
    }, function(t, n) {
      K.each({
        padding: "inner" + t,
        content: n,
        "": "outer" + t
      }, function(e, r) {
        K.fn[r] = function(r, i) {
          var o = arguments.length && (e || "boolean" != typeof r),
            a = e || (r === !0 || i === !0 ? "margin" : "border");
          return vt(this, function(n, e, r) {
            var i;
            return K.isWindow(n) ? n.document.documentElement["client" + t] : 9 === n.nodeType ? (i = n.documentElement, Math.max(n.body["scroll" + t], i["scroll" + t], n.body["offset" + t], i["offset" + t], i["client" + t])) : void 0 === r ? K.css(n, e, a) : K.style(n, e, r, a)
          }, n, o ? r : void 0, o, null)
        }
      })
    }), K.fn.size = function() {
      return this.length
    }, K.fn.andSelf = K.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
      return K
    });
    var In = t.jQuery,
      qn = t.$;
    return K.noConflict = function(n) {
      return t.$ === K && (t.$ = qn), n && t.jQuery === K && (t.jQuery = In), K
    }, typeof n === kt && (t.jQuery = t.$ = K), K
  }),
  function() {
    var t = {
      VERSION: "2.3.5",
      Result: {
        SUCCEEDED: 1,
        NOTRANSITION: 2,
        CANCELLED: 3,
        PENDING: 4
      },
      Error: {
        INVALID_TRANSITION: 100,
        PENDING_TRANSITION: 200,
        INVALID_CALLBACK: 300
      },
      WILDCARD: "*",
      ASYNC: "async",
      create: function(n, e) {
        var r = "string" == typeof n.initial ? {
            state: n.initial
          } : n.initial,
          i = n.terminal || n["final"],
          o = e || n.target || {},
          a = n.events || [],
          u = n.callbacks || {},
          s = {},
          c = {},
          l = function(n) {
            var e = n.from instanceof Array ? n.from : n.from ? [n.from] : [t.WILDCARD];
            s[n.name] = s[n.name] || {};
            for (var r = 0; r < e.length; r++) c[e[r]] = c[e[r]] || [], c[e[r]].push(n.name), s[n.name][e[r]] = n.to || e[r]
          };
        r && (r.event = r.event || "startup", l({
          name: r.event,
          from: "none",
          to: r.state
        }));
        for (var f = 0; f < a.length; f++) l(a[f]);
        for (var h in s) s.hasOwnProperty(h) && (o[h] = t.buildEvent(h, s[h]));
        for (var h in u) u.hasOwnProperty(h) && (o[h] = u[h]);
        return o.current = "none", o.is = function(t) {
          return t instanceof Array ? t.indexOf(this.current) >= 0 : this.current === t
        }, o.can = function(n) {
          return !this.transition && (s[n].hasOwnProperty(this.current) || s[n].hasOwnProperty(t.WILDCARD))
        }, o.cannot = function(t) {
          return !this.can(t)
        }, o.transitions = function() {
          return c[this.current]
        }, o.isFinished = function() {
          return this.is(i)
        }, o.error = n.error || function(t, n, e, r, i, o, a) {
          throw a || o
        }, r && !r.defer && o[r.event](), o
      },
      doCallback: function(n, e, r, i, o, a) {
        if (e) try {
          return e.apply(n, [r, i, o].concat(a))
        } catch (u) {
          return n.error(r, i, o, a, t.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", u)
        }
      },
      beforeAnyEvent: function(n, e, r, i, o) {
        return t.doCallback(n, n.onbeforeevent, e, r, i, o)
      },
      afterAnyEvent: function(n, e, r, i, o) {
        return t.doCallback(n, n.onafterevent || n.onevent, e, r, i, o)
      },
      leaveAnyState: function(n, e, r, i, o) {
        return t.doCallback(n, n.onleavestate, e, r, i, o)
      },
      enterAnyState: function(n, e, r, i, o) {
        return t.doCallback(n, n.onenterstate || n.onstate, e, r, i, o)
      },
      changeState: function(n, e, r, i, o) {
        return t.doCallback(n, n.onchangestate, e, r, i, o)
      },
      beforeThisEvent: function(n, e, r, i, o) {
        return t.doCallback(n, n["onbefore" + e], e, r, i, o)
      },
      afterThisEvent: function(n, e, r, i, o) {
        return t.doCallback(n, n["onafter" + e] || n["on" + e], e, r, i, o)
      },
      leaveThisState: function(n, e, r, i, o) {
        return t.doCallback(n, n["onleave" + r], e, r, i, o)
      },
      enterThisState: function(n, e, r, i, o) {
        return t.doCallback(n, n["onenter" + i] || n["on" + i], e, r, i, o)
      },
      beforeEvent: function(n, e, r, i, o) {
        return !1 === t.beforeThisEvent(n, e, r, i, o) || !1 === t.beforeAnyEvent(n, e, r, i, o) ? !1 : void 0
      },
      afterEvent: function(n, e, r, i, o) {
        t.afterThisEvent(n, e, r, i, o), t.afterAnyEvent(n, e, r, i, o)
      },
      leaveState: function(n, e, r, i, o) {
        var a = t.leaveThisState(n, e, r, i, o),
          u = t.leaveAnyState(n, e, r, i, o);
        return !1 === a || !1 === u ? !1 : t.ASYNC === a || t.ASYNC === u ? t.ASYNC : void 0
      },
      enterState: function(n, e, r, i, o) {
        t.enterThisState(n, e, r, i, o), t.enterAnyState(n, e, r, i, o)
      },
      buildEvent: function(n, e) {
        return function() {
          var r = this.current,
            i = e[r] || e[t.WILDCARD] || r,
            o = Array.prototype.slice.call(arguments);
          if (this.transition) return this.error(n, r, i, o, t.Error.PENDING_TRANSITION, "event " + n + " inappropriate because previous transition did not complete");
          if (this.cannot(n)) return this.error(n, r, i, o, t.Error.INVALID_TRANSITION, "event " + n + " inappropriate in current state " + this.current);
          if (!1 === t.beforeEvent(this, n, r, i, o)) return t.Result.CANCELLED;
          if (r === i) return t.afterEvent(this, n, r, i, o), t.Result.NOTRANSITION;
          var a = this;
          this.transition = function() {
            return a.transition = null, a.current = i, t.enterState(a, n, r, i, o), t.changeState(a, n, r, i, o), t.afterEvent(a, n, r, i, o), t.Result.SUCCEEDED
          }, this.transition.cancel = function() {
            a.transition = null, t.afterEvent(a, n, r, i, o)
          };
          var u = t.leaveState(this, n, r, i, o);
          return !1 === u ? (this.transition = null, t.Result.CANCELLED) : t.ASYNC === u ? t.Result.PENDING : this.transition ? this.transition() : void 0
        }
      }
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = t), exports.StateMachine = t) : "function" == typeof define && define.amd ? define(function(n) {
      return t
    }) : "undefined" != typeof window ? window.StateMachine = t : "undefined" != typeof self && (self.StateMachine = t)
  }(),
  function(t) {
    function n(t, n, e) {
      var r = document.createElement("source");
      r.src = e, r.type = "video/" + n, t.appendChild(r)
    }
    var e = {
        Android: /Android/gi.test(navigator.userAgent),
        iOS: /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent)
      },
      r = {
        WebM: "data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA=",
        MP4: "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=="
      },
      i = function() {
        return e.iOS ? this.noSleepTimer = null : e.Android && (this.noSleepVideo = document.createElement("video"), this.noSleepVideo.setAttribute("loop", ""), n(this.noSleepVideo, "webm", r.WebM), n(this.noSleepVideo, "mp4", r.MP4)), this
      };
    i.prototype.enable = function(t) {
      e.iOS ? (this.disable(), this.noSleepTimer = window.setInterval(function() {
        window.location = window.location, window.setTimeout(window.stop, 0)
      }, t || 15e3)) : e.Android && this.noSleepVideo.play()
    }, i.prototype.disable = function() {
      e.iOS ? this.noSleepTimer && (window.clearInterval(this.noSleepTimer), this.noSleepTimer = null) : e.Android && this.noSleepVideo.pause()
    }, t.NoSleep = i
  }(this),
  function() {
    if ("performance" in window == 0 && (window.performance = {}), Date.now = Date.now || function() {
        return (new Date).getTime()
      }, "now" in window.performance == 0) {
      var t = Date.now();
      performance.timing && performance.timing.navigationStart && (t = performance.timing.navigationStart), window.performance.now = function() {
        return Date.now() - t
      }
    }
  }(),
  function() {
    for (var t = 0, n = ["ms", "moz", "webkit", "o"], e = 0; e < n.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[n[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n[e] + "CancelAnimationFrame"] || window[n[e] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(n, e) {
      var r = (new Date).getTime(),
        i = Math.max(0, 16 - (r - t)),
        o = window.setTimeout(function() {
          n(r + i)
        }, i);
      return t = r + i, o
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
      clearTimeout(t)
    })
  }(), ("undefined" == typeof window.localStorage || "undefined" == typeof window.sessionStorage) && function() {
    var t = function(t) {
      function n(t, n, e) {
        var r, i;
        e ? (r = new Date, r.setTime(r.getTime() + 24 * e * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()) : i = "", document.cookie = t + "=" + n + i + "; path=/"
      }

      function e(t) {
        var n, e, r = t + "=",
          i = document.cookie.split(";");
        for (n = 0; n < i.length; n++) {
          for (e = i[n];
            " " == e.charAt(0);) e = e.substring(1, e.length);
          if (0 == e.indexOf(r)) return e.substring(r.length, e.length)
        }
        return null
      }

      function r(e) {
        e = JSON.stringify(e), "session" == t ? window.name = e : n("localStorage", e, 365)
      }

      function i() {
        "session" == t ? window.name = "" : n("localStorage", "", 365)
      }

      function o() {
        var n = "session" == t ? window.name : e("localStorage");
        return n ? JSON.parse(n) : {}
      }
      var a = o();
      return {
        length: 0,
        clear: function() {
          a = {}, this.length = 0, i()
        },
        getItem: function(t) {
          return void 0 === a[t] ? null : a[t]
        },
        key: function(t) {
          var n = 0;
          for (var e in a) {
            if (n == t) return e;
            n++
          }
          return null
        },
        removeItem: function(t) {
          delete a[t], this.length--, r(a)
        },
        setItem: function(t, n) {
          a[t] = n + "", this.length++, r(a)
        }
      }
    };
    "undefined" == typeof window.localStorage && (window.localStorage = new t("local")), "undefined" == typeof window.sessionStorage && (window.sessionStorage = new t("session"))
  }();
var features = function(t, n, e) {
    return t.addTest("proximity", "ondeviceproximity" in n && "onuserproximity" in n), t.addTest("batterystatus", "getBattery" in e), _.reduce(["geolocation", "touchevents", "webaudio", "ambientlight", "deviceorientation", "batterystatus", "getusermedia", "vibrate", "proximity"], function(n, e) {
      return n[e] = t[e], n
    }, {})
  }(Modernizr, window, navigator),
  central = $.Callbacks(),
  connectState = $.Callbacks(),
  disconnect = noop,
  id = sessionStorage.getItem("id");
id && (features.id = parseInt(id, 10)), $.post("/", features).then(function(t) {
  if (sessionStorage.setItem("id", id = parseInt(t.id, 10)), features.memory = t.heading, features.id = t.id, "pusher" === t.connection.type) {
    var n = new Pusher(t.connection.key, {
        encrypted: !0
      }),
      e = n.subscribe(t.connection.channel);
    e.bind("slide", function(t) {
      central.fire(t.message)
    }), connectState.fire("connecting"), n.connection.bind("connected", function() {
      connectState.fire("good")
    }), n.connection.bind("unavailable", function() {
      connectState.fire("bad")
    }), n.connection.bind("failed", function() {
      connectState.fire("bad")
    }), n.connection.bind("disconnected", function() {
      connectState.fire("bad")
    }), disconnect = function() {
      n.disconnect()
    }
  }
}), connectState.add(function(t) {
  $("#status").attr("class", t)
}), central.add(function(t) {
  window.console && console.log(">>", t)
});
var data = features,
  colors = {
    positive: "#00FFBF",
    positive_l: "#cfe",
    very_positive: "#f08",
    very_positive_l: "#fbd",
    meh: "#eee"
  },
  size = Math.min(window.innerHeight, window.innerWidth),
  width = size,
  height = size,
  r = .45 * size,
  svg = d3.select("#data").append("svg").attr("width", size).attr("height", size),
  heading = d3.select("#data-heading"),
  touchCallback, circle = svg.append("circle").datum(data).attr("r", 0).attr("cx", width / 2).attr("cy", height / 2).attr("fill", colors.positive).on("touchstart", function() {
    touchCallback && touchCallback()
  });
circle.transition().duration(1500).attr("r", r);
var update = noop,
  gamma = d3.scale.linear().domain([-90, 90]).range([20, width - 20]).clamp(!0),
  beta = d3.scale.linear().domain([-180, 180]).range([20, height - 20]).clamp(!0),
  block_circle_resize;
$(window).on("resize", function() {
  size = Math.min(window.innerHeight, window.innerWidth), width = size, height = size, r = .45 * size, svg.attr("width", size).attr("height", size), block_circle_resize || circle.attr("cx", width / 2).attr("cy", height / 2).transition().duration(1500).attr("r", r), gamma.range([20, width - 20]), beta.range([20, height - 20])
});
var input = {
  ambientlight: $.Callbacks("memory"),
  orientation: $.Callbacks("memory"),
  battery: $.Callbacks("memory"),
  touch: $.Callbacks(),
  proximity: $.Callbacks("memory"),
  timings: $.Callbacks(),
  memory: $.Callbacks()
};
$.each(input, function(t, n) {
    n.add(function(n) {
      $.extend(data, flatten(t, n))
    })
  }), navigator.getBattery && navigator.getBattery().then(function(t) {
    function n() {
      input.battery.fire({
        charging: t.charging,
        level: t.level
      })
    }
    t.addEventListener("chargingchange", n), t.addEventListener("levelchange", n), n()
  }), window.addEventListener("deviceorientation", function(t) {
    input.orientation.fire({
      beta: t.beta,
      gamma: t.gamma
    })
  }, !0), window.addEventListener("devicelight", function(t, n) {
    return function(e) {
      var r = e.value;
      return t || n ? (n = Math.max(r, n), t = Math.min(r, t), void input.ambientlight.fire({
        value: r,
        scaled: (r - t) / (n - t)
      })) : (t = r - 1, void(n = r + 1))
    }
  }()), window.addEventListener("deviceproximity", function(t, n) {
    return function(t) {
      var n = t.value,
        e = t.min || 0,
        r = t.max || 5,
        i = (n - e) / (r - e);
      i = (4 * i + .5) / 5, input.proximity.fire({
        value: proximity_value = parseFloat(i)
      })
    }
  }()), circle.on("touchstart", function(t) {
    return function() {
      input.touch.fire({
        count: t++
      })
    }
  }(0)),
  function t(n) {
    function e(t) {
      navigator.vibrate && navigator.vibrate(t || 100)
    }

    function r(t) {
      a.eq(t).css("transform", "scale(0.6)").css("background", "#00FFBF")
    }

    function i() {
      a.css("transform", "scale(1)").css("background", colors.meh)
    }
    var o = $("#time-buttons"),
      a = o.find("li"),
      u = StateMachine.create({
        initial: "_",
        events: [{
          name: "a",
          from: "_",
          to: "A"
        }, {
          name: "a",
          from: "A",
          to: "A"
        }, {
          name: "b",
          from: "A",
          to: "B"
        }, {
          name: "b",
          from: "B",
          to: "B"
        }, {
          name: "c",
          from: "B",
          to: "C"
        }, {
          name: "check",
          from: "C",
          to: "Check"
        }, {
          name: "notYet",
          from: "Check",
          to: "_"
        }, {
          name: "reset",
          from: ["A", "B", "C", "_"],
          to: "_"
        }]
      }),
      t = [];
    u.on_ = function() {
      t = [], i(), e()
    }, u.onA = function() {
      t[0] = performance.now(), r(1), e()
    }, u.onB = function() {
      t[1] = performance.now(), r(2), e()
    }, u.onC = function() {
      t[2] = performance.now(), r(3), u.check(), e()
    }, u.onCheck = function() {
      function r() {
        setTimeout(function() {
          u.notYet()
        }, 500)
      }
      a.css("transform", "scale(0.2)").css("background", "#000"), $.post("/state").then(function(i) {
        if ("positions" === i.state) {
          var o = 15e3,
            a = t[0],
            u = t[1],
            s = t[2],
            c = {};
          c.a = mod(a - s, o) / o * Math.PI * 2, c.r = mod(u - s, o) / o * 10, c.y = Math.cos(c.a) * c.r * -1, c.x = Math.sin(c.a) * c.r, c.offset = s, n.fire(c), e(500)
        } else r()
      }, r)
    }, a.on("touchstart mousedown click", function(t) {
      t.preventDefault(), t.stopPropagation();
      var n = $(this),
        e = n.index();
      if (0 === e) return void(u.can("reset") && u.reset());
      var r = ["a", "b", "c"][e - 1];
      u.can(r) ? u[r]() : u.can("reset") ? u.reset() : console.log("..")
    })
  }(input.timings);
var tween_raf_running, _positions_started;
input.timings.add(function(t) {
    function n() {
      return TWEEN.getAll().length ? (requestAnimationFrame(n), void TWEEN.update(performance.now())) : tween_raf_running = !1
    }
    $("#content").fadeOut(3e3), TWEEN.removeAll(), TWEEN.update(performance.now());
    var e = $("body"),
      r = {
        l: 1,
        s: .5,
        h: t.a / (2 * Math.PI) * 360
      },
      i = {
        l: .5,
        s: .5,
        h: t.a / (2 * Math.PI) * 360
      },
      o = {
        l: .5,
        s: .5,
        h: mod(70 * t.y, 360)
      },
      a = {
        l: 1,
        s: .5,
        h: 0
      };
    new TWEEN.Tween(r).to(i, 3e3).onUpdate(function() {
      e.css("background", hsl_basic(this.h, this.s, this.l))
    }).start(t.offset + 15e3), new TWEEN.Tween(i).to(o, 5e3).onUpdate(function() {
      e.css("background", hsl_basic(this.h, this.s, this.l))
    }).start(t.offset + 3e4), new TWEEN.Tween(o).to(a, 500).onUpdate(function() {
      e.css("background", hsl_basic(this.h, this.s, this.l))
    }).onComplete(function() {
      setTimeout(function() {
        play(), $("#content").fadeIn(3e3), _positions_started || (e.css("background", "#f08"), setTimeout(function() {
          e.css("background", "#fff")
        }, 4e3))
      }, t.a / (2 * Math.PI) * 15e3)
    }).start(t.offset + 45e3), tween_raf_running || (tween_raf_running = !0, n());
    var u = flatten("timings", t);
    u.id = id, $.post("/update", u)
  }),
  function(t) {
    function n(n) {
      var e = flatten("memory", {
        value: n
      });
      e.id = id, $.post("/update", e), $("form").fadeOut(), t.fire({
        value: n
      })
    }
    var e;
    $("form").on("click", "button.manual", function(t) {
      if (t.preventDefault(), !e) {
        var n = $(this);
        n.attr("disabled", !0), e = !0, $.post("/state").then(function(t) {
          t.state && central.fire(t.state)
        }).always(function() {
          n.attr("disabled", !1), e = !1
        })
      }
    }).on("submit", function(t) {
      t.preventDefault();
      var e = $("input[type=text]", this),
        r = e.val() || "";
      if (r = $.trim(r), r = r.substr(0, 4).toLowerCase(), e.val(""), r) {
        if ("phil" == r) return disconnect(), void $("form").prepend('<p>Phil owes me a hug</p><p><button class="manual">update</button></p>');
        "memory" == last_state ? n(r) : $.post("/state").then(function(t) {
          "memory" == t.state && n(r)
        })
      }
    })
  }(input.memory);
var publish = function() {
    function t(t) {
      i(e, t)
    }
    var n, e, r = 20,
      i = _.throttle(function(t, n) {
        if (!(r-- < 0)) {
          var e = flatten(t, n);
          e.id = id, $.post("/update", e)
        }
      }, 2e3);
    return function(i) {
      n && n.remove(t), n = null, input[i] && (r = 20, n = input[i], e = i, input[i].add(t))
    }
  }(),
  states = {},
  last_state;
central.add(function(t) {
  if ("_reload" === t) return location.reload(!0);
  if ("_echomemory" === t) return $("input[type=text]").val(features.memory).parent().submit();
  if ("_positions_started" === t) return _positions_started = !0;
  if ("_republish" === t) return $.post("/update", features);
  if ("_rate_ping" === t) return ratePing();
  if ("_rate_rook" === t) return rateRook();
  if ("_rate_king" === t) return rateKing();
  if ("_note" === t.substr(0, 5)) return ping(parseInt(t.substr(6)));
  if ("action" === t.substr(0, 6)) return void action(t.slice(7).split(" ").map(parseFloat));
  if ("_color" === t.substr(0, 6)) return circle.transition().attr("fill", $.trim(t.slice(7)));
  if (t !== last_state) {
    var n = states[last_state];
    n && n.exit && n.exit();
    var e = states[t];
    e && e.enter && e.enter(), last_state = t
  }
}), $.post("/state").then(function(t) {
  t.state && central.fire(t.state)
}), state("start", function() {
  features.memory && heading.text(features.memory), circle.transition().attr("fill", colors.positive).attr("r", r).style("stroke-width", 0)
}), state("intro", function() {
  circle.transition().attr("fill", colors.meh).attr("r", r).style("stroke-width", 0)
}), state("blank", function() {
  heading.html("&nbsp;"), circle.transition().style("stroke-width", 0).attr("fill", colors.meh).attr("r", r).attr("cx", width / 2).attr("cy", height / 2)
}), state("positive", function() {
  heading.html("&nbsp;"), circle.transition().style("stroke-width", 0).attr("fill", colors.positive).attr("r", r).attr("cx", width / 2).attr("cy", height / 2)
}), state("battery", function() {
  heading.text("Battery"), circle.attr("r", 0), publish("battery"), this.handler(), input.battery.add(this.handler)
}, function() {
  publish(null), input.battery.remove(this.handler)
}, {
  handler: function() {
    function t(t) {
      return t.batterystatus
    }

    function n(t) {
      return t.battery_level ? i(t.battery_level, 0, 1) : 1
    }

    function e(n) {
      return t(n) && n.battery_charging
    }

    function i(t, n, e) {
      return Math.max(n, Math.min(t, e)) || n
    }
    circle.transition().attr("fill", function(n) {
      return t(n) ? e(n) ? colors.very_positive : colors.positive : colors.meh
    }).attr("stroke", function(n) {
      return t(n) ? e(n) ? colors.very_positive_l : colors.positive_l : colors.meh
    }).attr("r", function(t) {
      return n(t) * (r / 2) + r / 2
    }).style("stroke-width", function(t) {
      return (1 - n(t)) * r
    })
  }
}), state("geolocation", function() {
  heading.html("location"), circle.transition().style("stroke-width", 0).attr("fill", data.geolocation ? colors.positive : colors.meh).attr("r", r).attr("cx", width / 2).attr("cy", height / 2)
}), state("orientation", function() {
  heading.text("Orientation"), circle.style("stroke-width", 0).attr("fill", data.deviceorientation ? colors.positive : colors.meh), input.orientation.add(this.handler), publish("orientation"), block_circle_resize = !0, data.deviceorientation && svg.style("border-top", "1px solid " + colors.positive).style("border-bottom", "1px solid " + colors.positive)
}, function() {
  input.orientation.remove(this.handler), publish(null), block_circle_resize = !1, svg.style("border-top", "").style("border-bottom", ""), circle.attr("r", r).style("stroke-width", 0)
}, {
  handler: function() {
    circle.attr("r", r / 5).attr("cx", function(t) {
      var n = t.deviceorientation && t.orientation_gamma || 0;
      return gamma(n)
    }).attr("cy", function(t) {
      var n = t.deviceorientation && t.orientation_beta || 0;
      return beta(n)
    })
  }
}), state("proximity", function() {
  heading.text("Proximity"), circle.style("stroke-width", 0).attr("r", r).attr("cx", width / 2).attr("cy", height / 2).attr("fill", features.proximity ? colors.positive : colors.meh), input.proximity.add(this.handler), publish("proximity")
}, function() {
  input.proximity.remove(this.handler), publish(null)
}, {
  handler: function(t) {
    circle.transition().attr("r", r * t.value).attr("fill", colors.positive)
  }
}), state("gum", function() {
  heading.html("VIDEO & AUDIO"), circle.style("stroke-width", 0).attr("fill", data.getusermedia ? colors.positive : colors.meh).attr("r", r).attr("cx", width / 2).attr("cy", height / 2)
}), state("ambientlight", function() {
  heading.text("Ambient Light"), circle.style("stroke-width", 0).attr("fill", features.ambientlight ? colors.positive : colors.meh), input.ambientlight.add(this.handler), publish("ambientlight")
}, function() {
  input.ambientlight.remove(this.handler), publish(null)
}, {
  handler: function(t) {
    circle.transition().attr("r", r * t.scaled).attr("fill", colors.positive)
  }
}), state("touch", function() {
  heading.text("touch"), circle.transition().attr("r", r / 2).style("stroke-width", 0).transition().attr("r", r).attr("fill", features.touchevents ? colors.positive : colors.meh), input.touch.add(this.handler), publish("touch")
}, function() {
  input.touch.remove(this.handler), publish(null)
}, {
  handler: function() {
    circle.transition().attr("r", .8 * r).attr("fill", "#fff").transition().attr("r", r).attr("fill", colors.positive)
  }
}), state("vibrate", function() {
  heading.html("Movement"), circle.style("stroke-width", 0).attr("fill", data.vibrate ? colors.positive : colors.meh).attr("r", r).attr("cx", width / 2).attr("cy", height / 2), this.interval = setInterval(function() {
    navigator.vibrate && (navigator.vibrate(300), circle.transition().attr("r", .8 * r).attr("fill", "#fff").transition().delay(500).attr("r", r).attr("fill", colors.positive))
  }, 2e3)
}, function() {
  circle.transition().attr("r", r), clearInterval(this.interval)
}), state("display", function() {
  heading.style("opacity", 0), circle.transition().duration(2500).attr("r", .2 * r).attr("fill", colors.positive).transition().duration(500).each("end", function() {
    $("#content").css({
      background: colors.positive
    })
  }).transition().duration(500).attr("r", 2 * r).attr("fill", colors.positive)
}, function() {
  heading.style("opacity", 1), circle.transition().attr("r", r), $("#content").css({
    background: "#fff"
  })
}), state("webaudio", function() {
  heading.html("Audio"), circle.style("stroke-width", 0).attr("fill", data.webaudio ? colors.positive : colors.meh).attr("r", r).attr("cx", width / 2).attr("cy", height / 2), this.interval = setInterval(function() {
    ping(3e3 * Math.random() + 1e3, .5), circle.transition().attr("r", .8 * r).attr("fill", "#fff").transition().attr("r", r).attr("fill", colors.positive), console.log("ting")
  }, 2e3)
}, function() {
  clearInterval(this.interval), circle.transition().attr("r", r).attr("fill", colors.positive)
}, {}), state("thanks", function() {
  $("#thanks").fadeIn(), heading.text("")
}), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.context = parent.context || new AudioContext;
var play = function(t) {
    var n, e = new XMLHttpRequest;
    return e.open("GET", "ting.mp3", !0), e.responseType = "arraybuffer", e.onload = function() {
        t.decodeAudioData(e.response, function(t) {
          n = t
        }, function(t) {
          console.log("an error occured requesting ", "ting.mp3", t)
        })
      }, e.send(),
      function(e, r) {
        if (!n) return !1;
        var i = t.createBufferSource(),
          o = t.createGain();
        return i.buffer = n, o.gain.value = e ? 1e-4 : r || 1, i.connect(o), o.connect(t.destination), i.start(0), !0
      }
  }(window.context),
  playRook = function(t) {
    var n, e = new XMLHttpRequest;
    return e.open("GET", "rook.mp3", !0), e.responseType = "arraybuffer", e.onload = function() {
        t.decodeAudioData(e.response, function(t) {
          n = t
        }, function(t) {
          console.log("an error occured requesting ", "rook.mp3", t)
        })
      }, e.send(),
      function(e, r) {
        if (!n) return !1;
        var i = t.createBufferSource(),
          o = t.createGain();
        return i.buffer = n, o.gain.value = e ? 1e-4 : r || 1, i.connect(o), o.connect(t.destination), i.start(0), !0
      }
  }(window.context),
  playKing = function(t) {
    var n, e = new XMLHttpRequest;
    return e.open("GET", "king.mp3", !0), e.responseType = "arraybuffer", e.onload = function() {
        t.decodeAudioData(e.response, function(t) {
          n = t
        }, function(t) {
          console.log("an error occured requesting ", "king.mp3", t)
        })
      }, e.send(),
      function(e, r) {
        if (!n) return !1;
        var i = t.createBufferSource(),
          o = t.createGain();
        return i.buffer = n, o.gain.value = e ? 1e-4 : r || 1, i.connect(o), o.connect(t.destination), i.start(0), !0
      }
  }(window.context);
$(document).on("mousedown touchstart", function() {
  play(!0) && $(document).off("mousedown touchstart")
});
var noSleep = new NoSleep,
  noSleepAdded, noSleepEnabled;
central.add(function(t) {
  "_" != t.charAt(0) && ("positions" == t ? noSleepAdded || (noSleepAdded = !0, document.addEventListener("touchstart", enableNoSleep, !1)) : noSleepAdded && (noSleepEnabled ? noSleep.disable() : document.removeEventListener("touchstart", enableNoSleep, !1), noSleepAdded = noSleepEnabled = !1))
});
