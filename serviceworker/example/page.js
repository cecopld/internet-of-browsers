(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
        1: [function(require, module, exports) {
            "use strict";
            var loadScripts = require("./load-scripts"),
                polyfillsNeeded = [];
            window.Promise || polyfillsNeeded.push("js/promise-polyfill.js"), /(iPhone|iPad);/.test(navigator.userAgent) && polyfillsNeeded.push("js/fastclick.js"), loadScripts(polyfillsNeeded, function() {
                require("babelify/node_modules/babel-core/node_modules/regenerator/runtime"), new(require("./main-controller"))
            }, function() {
                console.error("Failed to load polyfills")
            });
            //# sourceMappingURL=out.js.map

        }, {
            "./load-scripts": 6,
            "./main-controller": 7,
            "babelify/node_modules/babel-core/node_modules/regenerator/runtime": 2
        }],
        2: [function(require, module, exports) {
            (function(process, global) {
                ! function(t) {
                    "use strict";

                    function r(t, r, e, o) {
                        var i = Object.create((r || n).prototype);
                        return i._invoke = f(t, e || null, new h(o || [])), i
                    }

                    function e(t, r, e) {
                        try {
                            return {
                                type: "normal",
                                arg: t.call(r, e)
                            }
                        } catch (n) {
                            return {
                                type: "throw",
                                arg: n
                            }
                        }
                    }

                    function n() {}

                    function o() {}

                    function i() {}

                    function a(t) {
                        ["next", "throw", "return"].forEach(function(r) {
                            t[r] = function(t) {
                                return this._invoke(r, t)
                            }
                        })
                    }

                    function c(t) {
                        this.arg = t
                    }

                    function u(t) {
                        function r(r, e) {
                            var n = t[r](e),
                                a = n.value;
                            return a instanceof c ? Promise.resolve(a.arg).then(o, i) : Promise.resolve(a).then(function(t) {
                                return n.value = t, n
                            })
                        }

                        function e(t, e) {
                            var o = n ? n.then(function() {
                                return r(t, e)
                            }) : new Promise(function(n) {
                                n(r(t, e))
                            });
                            return n = o["catch"](function(t) {}), o
                        }
                        "object" == typeof process && process.domain && (r = process.domain.bind(r));
                        var n, o = r.bind(t, "next"),
                            i = r.bind(t, "throw");
                        r.bind(t, "return");
                        this._invoke = e
                    }

                    function f(t, r, n) {
                        var o = L;
                        return function(i, a) {
                            if (o === b) throw new Error("Generator is already running");
                            if (o === E) {
                                if ("throw" === i) throw a;
                                return y()
                            }
                            for (;;) {
                                var c = n.delegate;
                                if (c) {
                                    if ("return" === i || "throw" === i && c.iterator[i] === v) {
                                        n.delegate = null;
                                        var u = c.iterator["return"];
                                        if (u) {
                                            var f = e(u, c.iterator, a);
                                            if ("throw" === f.type) {
                                                i = "throw", a = f.arg;
                                                continue
                                            }
                                        }
                                        if ("return" === i) continue
                                    }
                                    var f = e(c.iterator[i], c.iterator, a);
                                    if ("throw" === f.type) {
                                        n.delegate = null, i = "throw", a = f.arg;
                                        continue
                                    }
                                    i = "next", a = v;
                                    var l = f.arg;
                                    if (!l.done) return o = x, l;
                                    n[c.resultName] = l.value, n.next = c.nextLoc, n.delegate = null
                                }
                                if ("next" === i) o === x ? n.sent = a : n.sent = v;
                                else if ("throw" === i) {
                                    if (o === L) throw o = E, a;
                                    n.dispatchException(a) && (i = "next", a = v)
                                } else "return" === i && n.abrupt("return", a);
                                o = b;
                                var f = e(t, r, n);
                                if ("normal" === f.type) {
                                    o = n.done ? E : x;
                                    var l = {
                                        value: f.arg,
                                        done: n.done
                                    };
                                    if (f.arg !== j) return l;
                                    n.delegate && "next" === i && (a = v)
                                } else "throw" === f.type && (o = E, i = "throw", a = f.arg)
                            }
                        }
                    }

                    function l(t) {
                        var r = {
                            tryLoc: t[0]
                        };
                        1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r)
                    }

                    function s(t) {
                        var r = t.completion || {};
                        r.type = "normal", delete r.arg, t.completion = r
                    }

                    function h(t) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }], t.forEach(l, this), this.reset(!0)
                    }

                    function p(t) {
                        if (t) {
                            var r = t[g];
                            if (r) return r.call(t);
                            if ("function" == typeof t.next) return t;
                            if (!isNaN(t.length)) {
                                var e = -1,
                                    n = function o() {
                                        for (; ++e < t.length;)
                                            if (d.call(t, e)) return o.value = t[e], o.done = !1, o;
                                        return o.value = v, o.done = !0, o
                                    };
                                return n.next = n
                            }
                        }
                        return {
                            next: y
                        }
                    }

                    function y() {
                        return {
                            value: v,
                            done: !0
                        }
                    }
                    var v, d = Object.prototype.hasOwnProperty,
                        g = "function" == typeof Symbol && Symbol.iterator || "@@iterator",
                        w = "object" == typeof module,
                        m = t.regeneratorRuntime;
                    if (m) return void(w && (module.exports = m));
                    m = t.regeneratorRuntime = w ? module.exports : {}, m.wrap = r;
                    var L = "suspendedStart",
                        x = "suspendedYield",
                        b = "executing",
                        E = "completed",
                        j = {},
                        k = i.prototype = n.prototype;
                    o.prototype = k.constructor = i, i.constructor = o, o.displayName = "GeneratorFunction", m.isGeneratorFunction = function(t) {
                        var r = "function" == typeof t && t.constructor;
                        return r ? r === o || "GeneratorFunction" === (r.displayName || r.name) : !1
                    }, m.mark = function(t) {
                        return t.__proto__ = i, t.prototype = Object.create(k), t
                    }, m.awrap = function(t) {
                        return new c(t)
                    }, a(u.prototype), m.async = function(t, e, n, o) {
                        var i = new u(r(t, e, n, o));
                        return m.isGeneratorFunction(e) ? i : i.next().then(function(t) {
                            return t.done ? t.value : i.next()
                        })
                    }, a(k), k[g] = function() {
                        return this
                    }, k.toString = function() {
                        return "[object Generator]"
                    }, m.keys = function(t) {
                        var r = [];
                        for (var e in t) r.push(e);
                        return r.reverse(),
                            function n() {
                                for (; r.length;) {
                                    var e = r.pop();
                                    if (e in t) return n.value = e, n.done = !1, n
                                }
                                return n.done = !0, n
                            }
                    }, m.values = p, h.prototype = {
                        constructor: h,
                        reset: function(t) {
                            if (this.prev = 0, this.next = 0, this.sent = v, this.done = !1, this.delegate = null, this.tryEntries.forEach(s), !t)
                                for (var r in this) "t" === r.charAt(0) && d.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = v)
                        },
                        stop: function() {
                            this.done = !0;
                            var t = this.tryEntries[0],
                                r = t.completion;
                            if ("throw" === r.type) throw r.arg;
                            return this.rval
                        },
                        dispatchException: function(t) {
                            function r(r, n) {
                                return i.type = "throw", i.arg = t, e.next = r, !!n
                            }
                            if (this.done) throw t;
                            for (var e = this, n = this.tryEntries.length - 1; n > = 0; --n) {
                                var o = this.tryEntries[n],
                                    i = o.completion;
                                if ("root" === o.tryLoc) return r("end");
                                if (o.tryLoc <= this.prev) {
                                    var a = d.call(o, "catchLoc"),
                                        c = d.call(o, "finallyLoc");
                                    if (a && c) {
                                        if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                                        if (this.prev < o.finallyLoc) return r(o.finallyLoc)
                                    } else if (a) {
                                        if (this.prev < o.catchLoc) return r(o.catchLoc, !0)
                                    } else {
                                        if (!c) throw new Error("try statement without catch or finally");
                                        if (this.prev < o.finallyLoc) return r(o.finallyLoc)
                                    }
                                }
                            }
                        },
                        abrupt: function(t, r) {
                            for (var e = this.tryEntries.length - 1; e > = 0; --e) {
                                var n = this.tryEntries[e];
                                if (n.tryLoc <= this.prev && d.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                    var o = n;
                                    break
                                }
                            }
                            o && ("break" === t || "continue" === t) && o.tryLoc <= r && r <= o.finallyLoc && (o = null);
                            var i = o ? o.completion : {};
                            return i.type = t, i.arg = r, o ? this.next = o.finallyLoc : this.complete(i), j
                        },
                        complete: function(t, r) {
                            if ("throw" === t.type) throw t.arg;
                            "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = t.arg, this.next = "end") : "normal" === t.type && r && (this.next = r)
                        },
                        finish: function(t) {
                            for (var r = this.tryEntries.length - 1; r > = 0; --r) {
                                var e = this.tryEntries[r];
                                if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), s(e), j
                            }
                        },
                        "catch": function(t) {
                            for (var r = this.tryEntries.length - 1; r > = 0; --r) {
                                var e = this.tryEntries[r];
                                if (e.tryLoc === t) {
                                    var n = e.completion;
                                    if ("throw" === n.type) {
                                        var o = n.arg;
                                        s(e)
                                    }
                                    return o
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function(t, r, e) {
                            return this.delegate = {
                                iterator: p(t),
                                resultName: r,
                                nextLoc: e
                            }, j
                        }
                    }
                }("object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : this);
            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {
            "_process": 4
        }],
        3: [function(require, module, exports) {
            function EventEmitter() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function isFunction(e) {
                return "function" == typeof e
            }

            function isNumber(e) {
                return "number" == typeof e
            }

            function isObject(e) {
                return "object" == typeof e && null !== e
            }

            function isUndefined(e) {
                return void 0 === e
            }
            module.exports = EventEmitter, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.prototype.setMaxListeners = function(e) {
                if (!isNumber(e) || 0 >
                    e || isNaN(e)) throw TypeError("n must be a positive number");
                return this._maxListeners = e, this
            }, EventEmitter.prototype.emit = function(e) {
                var t, n, s, i, r, o;
                if (this._events || (this._events = {}), "error" === e && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                    if (t = arguments[1], t instanceof Error) throw t;
                    throw TypeError('Uncaught, unspecified "error" event.')
                }
                if (n = this._events[e], isUndefined(n)) return !1;
                if (isFunction(n)) switch (arguments.length) {
                    case 1:
                        n.call(this);
                        break;
                    case 2:
                        n.call(this, arguments[1]);
                        break;
                    case 3:
                        n.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        for (s = arguments.length, i = new Array(s - 1), r = 1; s >
                            r; r++) i[r - 1] = arguments[r];
                        n.apply(this, i)
                } else if (isObject(n)) {
                    for (s = arguments.length, i = new Array(s - 1), r = 1; s >
                        r; r++) i[r - 1] = arguments[r];
                    for (o = n.slice(), s = o.length, r = 0; s >
                        r; r++) o[r].apply(this, i)
                }
                return !0
            }, EventEmitter.prototype.addListener = function(e, t) {
                var n;
                if (!isFunction(t)) throw TypeError("listener must be a function");
                if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, isFunction(t.listener) ? t.listener : t), this._events[e] ? isObject(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, isObject(this._events[e]) && !this._events[e].warned) {
                    var n;
                    n = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners, n && n >
                        0 && this._events[e].length >
                        n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
                }
                return this
            }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function(e, t) {
                function n() {
                    this.removeListener(e, n), s || (s = !0, t.apply(this, arguments))
                }
                if (!isFunction(t)) throw TypeError("listener must be a function");
                var s = !1;
                return n.listener = t, this.on(e, n), this
            }, EventEmitter.prototype.removeListener = function(e, t) {
                var n, s, i, r;
                if (!isFunction(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                if (n = this._events[e], i = n.length, s = -1, n === t || isFunction(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
                else if (isObject(n)) {
                    for (r = i; r-- >
                        0;)
                        if (n[r] === t || n[r].listener && n[r].listener === t) {
                            s = r;
                            break
                        }
                    if (0 >
                        s) return this;
                    1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(s, 1), this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }, EventEmitter.prototype.removeAllListeners = function(e) {
                var t, n;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                if (0 === arguments.length) {
                    for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (n = this._events[e], isFunction(n)) this.removeListener(e, n);
                else
                    for (; n.length;) this.removeListener(e, n[n.length - 1]);
                return delete this._events[e], this
            }, EventEmitter.prototype.listeners = function(e) {
                var t;
                return t = this._events && this._events[e] ? isFunction(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
            }, EventEmitter.listenerCount = function(e, t) {
                var n;
                return n = e._events && e._events[t] ? isFunction(e._events[t]) ? 1 : e._events[t].length : 0
            };
        }, {}],
        4: [function(require, module, exports) {
            function drainQueue() {
                if (!draining) {
                    draining = !0;
                    for (var e, o = queue.length; o;) {
                        e = queue, queue = [];
                        for (var r = -1; ++r < o;) e[r]();
                        o = queue.length
                    }
                    draining = !1
                }
            }

            function noop() {}
            var process = module.exports = {},
                queue = [],
                draining = !1;
            process.nextTick = function(e) {
                queue.push(e), draining || setTimeout(drainQueue, 0)
            }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, process.cwd = function() {
                return "/"
            }, process.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }, process.umask = function() {
                return 0
            };
        }, {}],
        5: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function _inherits(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            var _createClass = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }(),
                _get = function(e, t, r) {
                    for (var o = !0; o;) {
                        var n = e,
                            i = t,
                            u = r;
                        a = s = c = void 0, o = !1, null === n && (n = Function.prototype);
                        var a = Object.getOwnPropertyDescriptor(n, i);
                        if (void 0 !== a) {
                            if ("value" in a) return a.value;
                            var c = a.get;
                            return void 0 === c ? void 0 : c.call(u)
                        }
                        var s = Object.getPrototypeOf(n);
                        if (null === s) return void 0;
                        e = s, t = i, r = u, o = !0
                    }
                },
                Gzip = function(e) {
                    function t() {
                        _classCallCheck(this, t), _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "js/gzip-worker.js")
                    }
                    return _inherits(t, e), _createClass(t, [{
                        key: "compress",
                        value: function(e) {
                            return this._requestResponse({
                                data: e
                            })
                        }
                    }]), t
                }(require("./worker-messenger"));
            module.exports = Gzip;
            //# sourceMappingURL=out.js.map

        }, {
            "./worker-messenger": 30
        }],
        6: [function(require, module, exports) {
            "use strict";
            module.exports = function(e, n, t) {
                var o = e.length,
                    r = !1;
                return 0 == e.length ? n() : void e.forEach(function(e) {
                    var c = document.createElement("script");
                    c.onload = function() {
                        r || --o || n()
                    }, c.onerror = function() {
                        r || (t(), r = !0)
                    }, c.src = e, document.head.insertBefore(c, document.head.firstChild)
                })
            };
            //# sourceMappingURL=out.js.map

        }, {}],
        7: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            var _createClass = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }(),
                utils = require("./utils"),
                svgo = new(require("./svgo")),
                storage = require("../utils/storage"),
                SvgFile = require("./svg-file"),
                MainController = function() {
                    function e() {
                        var t = this;
                        _classCallCheck(this, e), this._container = null, this._mainUi = null, this._outputUi = new(require("./ui/output")), this._downloadButtonUi = new(require("./ui/download-button")), this._resultsUi = new(require("./ui/results")), this._settingsUi = new(require("./ui/settings")), this._mainMenuUi = new(require("./ui/main-menu")), this._toastsUi = new(require("./ui/toasts")), this._dropUi = new(require("./ui/file-drop")), this._preloaderUi = new(require("./ui/preloader")), this._changelogUi = new(require("./ui/changelog"))(self.version), this._resultsContainerUi = new(require("./ui/results-container"))(this._resultsUi), this._viewTogglerUi = new(require("./ui/view-toggler")), this._settingsUi.on("change", function(e) {
                            return t._onSettingsChange()
                        }), this._mainMenuUi.on("svgDataLoad", function(e) {
                            return t._onInputChange(e)
                        }), this._dropUi.on("svgDataLoad", function(e) {
                            return t._onInputChange(e)
                        }), this._mainMenuUi.on("error", function(e) {
                            var n = e.error;
                            return t._handleError(n)
                        }), this._viewTogglerUi.on("change", function(e) {
                            return t._onViewSelectionChange(e)
                        }), this._inputFilename = "image.svg", this._inputSvg = null, this._cache = new(require("./results-cache"))(10), this._latestCompressJobId = 0, this._userHasInteracted = !1,

                          "serviceWorker" in navigator && navigator.serviceWorker.register("sw.js", {
                            scope: "./"
                        }).then(function(e) {
                            e.addEventListener("updatefound", function(n) {
                                return t._onUpdateFound(e)
                            })
                        }), storage.get("last-seen-version").then(function(e) {
                            e && t._changelogUi.showLogFrom(e), storage.set("last-seen-version", self.version)
                        }), utils.domReady.then(function(e) {
                            t._container = document.querySelector(".app-output"), t._mainUi = new(require("./ui/main-ui"))(document.querySelector(".toolbar"), document.querySelector(".action-button-container"), t._outputUi.container, t._settingsUi.container), document.querySelector(".action-button-container").appendChild(t._downloadButtonUi.container), document.querySelector(".output").appendChild(t._outputUi.container), t._container.appendChild(t._toastsUi.container), t._container.appendChild(t._dropUi.container), document.querySelector(".menu-extra").appendChild(t._changelogUi.container), t._preloaderUi.activated && t._toastsUi.show("Ready now!", {
                                duration: 3e3
                            })
                        })
                    }
                    return _createClass(e, [{
                        key: "_onViewSelectionChange",
                        value: function(e) {
                            this._outputUi.set(e.value)
                        }
                    }, {
                        key: "_onUpdateFound",
                        value: function(e) {
                            var t = this,
                                n = e.installing;
                            e.installing.addEventListener("statechange", function(e) {
                                var r, i, a;
                                return regeneratorRuntime.async(function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if ("activated" != n.state || navigator.serviceWorker.controller) {
                                                e.next = 3;
                                                break
                                            }
                                            return this._toastsUi.show("Ready to work offline", {
                                                duration: 5e3
                                            }), e.abrupt("return");
                                        case 3:
                                            if ("installed" != n.state || !navigator.serviceWorker.controller) {
                                                e.next = 17;
                                                break
                                            }
                                            return e.next = 6, regeneratorRuntime.awrap(storage.get("active-version"));
                                        case 6:
                                            if (r = e.sent, !r || r.split(".")[0] == self.version.split(".")[0]) {
                                                e.next = 9;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 9:
                                            if (this._userHasInteracted) {
                                                e.next = 12;
                                                break
                                            }
                                            return location.reload(), e.abrupt("return");
                                        case 12:
                                            return i = this._toastsUi.show("Update available", {
                                                buttons: ["reload", "dismiss"]
                                            }), e.next = 15, regeneratorRuntime.awrap(i.answer);
                                        case 15:
                                            a = e.sent, "reload" == a && location.reload();
                                        case 17:
                                        case "end":
                                            return e.stop()
                                    }
                                }, null, t)
                            })
                        }
                    }, {
                        key: "_onSettingsChange",
                        value: function() {
                            this._compressSvg()
                        }
                    }, {
                        key: "_onInputChange",
                        value: function(e) {
                            var t;
                            return regeneratorRuntime.async(function(n) {
                                for (var r = this;;) switch (n.prev = n.next) {
                                    case 0:
                                        return this._userHasInteracted = !0, n.prev = 1, n.next = 4, regeneratorRuntime.awrap(svgo.load(e.data));
                                    case 4:
                                        this._inputSvg = n.sent, this._inputFilename = e.filename, n.next = 14;
                                        break;
                                    case 8:
                                        return n.prev = 8, n.t0 = n["catch"](1), n.t0.message = "Load failed: " + n.t0.message, this._mainMenuUi.stopSpinner(), this._handleError(n.t0), n.abrupt("return");
                                    case 14:
                                        this._cache.purge(), t = !0, this._compressSvg(function(e) {
                                            t && (r._outputUi.reset(), r._mainUi.activate(), r._mainMenuUi.allowHide = !0, r._mainMenuUi.hide(), t = !1)
                                        });
                                    case 17:
                                    case "end":
                                        return n.stop()
                                }
                            }, null, this, [
                                [1, 8]
                            ])
                        }
                    }, {
                        key: "_handleError",
                        value: function(e) {
                            this._toastsUi.show(e.message), console.error(e)
                        }
                    }, {
                        key: "_compressSvg",
                        value: function() {
                            var e, t, n, r, i = arguments.length <= 0 || void 0 === arguments[0] ? function() {} : arguments[0];
                            return regeneratorRuntime.async(function(a) {
                                for (var s = this;;) switch (a.prev = a.next) {
                                    case 0:
                                        return e = this._latestCompressJobId = Math.random(), t = this._settingsUi.getSettings(), a.next = 4, regeneratorRuntime.awrap(svgo.abortCurrent());
                                    case 4:
                                        if (e == this._latestCompressJobId) {
                                            a.next = 6;
                                            break
                                        }
                                        return a.abrupt("return");
                                    case 6:
                                        if (!t.original) {
                                            a.next = 9;
                                            break
                                        }
                                        return this._updateForFile(this._inputSvg, {
                                            gzip: t.gzip
                                        }), a.abrupt("return");
                                    case 9:
                                        if (n = this._cache.match(t.fingerprint), !n) {
                                            a.next = 13;
                                            break
                                        }
                                        return this._updateForFile(n, {
                                            compareToFile: this._inputSvg,
                                            gzip: t.gzip
                                        }), a.abrupt("return");
                                    case 13:
                                        return this._downloadButtonUi.working(), a.prev = 14, a.next = 17, regeneratorRuntime.awrap(svgo.process(t, function(e) {
                                            i(e), s._updateForFile(e, {
                                                compareToFile: s._inputSvg,
                                                gzip: t.gzip
                                            })
                                        }));
                                    case 17:
                                        r = a.sent, this._cache.add(t.fingerprint, r), a.next = 24;
                                        break;
                                    case 21:
                                        a.prev = 21, a.t0 = a["catch"](14), "abort" != a.t0.message && (a.t0.message = "Minifying error: " + a.t0.message, this._handleError(a.t0));
                                    case 24:
                                        this._downloadButtonUi.done();
                                    case 25:
                                    case "end":
                                        return a.stop()
                                }
                            }, null, this, [
                                [14, 21]
                            ])
                        }
                    }, {
                        key: "_updateForFile",
                        value: function(e, t) {
                            var n = t.compareToFile,
                                r = t.gzip;
                            return regeneratorRuntime.async(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (this._outputUi.update(e), this._downloadButtonUi.setDownload(this._inputFilename, e), t.t0 = this._resultsUi, t.t1 = n, !t.t1) {
                                            t.next = 8;
                                            break
                                        }
                                        return t.next = 7, regeneratorRuntime.awrap(n.size({
                                            compress: r
                                        }));
                                    case 7:
                                        t.t1 = t.sent;
                                    case 8:
                                        return t.t2 = t.t1, t.next = 11, regeneratorRuntime.awrap(e.size({
                                            compress: r
                                        }));
                                    case 11:
                                        t.t3 = t.sent, t.t4 = {
                                            comparisonSize: t.t2,
                                            size: t.t3
                                        }, t.t0.update.call(t.t0, t.t4);
                                    case 14:
                                    case "end":
                                        return t.stop()
                                }
                            }, null, this)
                        }
                    }]), e
                }();
            module.exports = MainController;
            //# sourceMappingURL=out.js.map

        }, {
            "../utils/storage": 32,
            "./results-cache": 9,
            "./svg-file": 10,
            "./svgo": 11,
            "./ui/changelog": 12,
            "./ui/download-button": 14,
            "./ui/file-drop": 15,
            "./ui/main-menu": 16,
            "./ui/main-ui": 17,
            "./ui/output": 19,
            "./ui/preloader": 21,
            "./ui/results": 23,
            "./ui/results-container": 22,
            "./ui/settings": 24,
            "./ui/toasts": 27,
            "./ui/view-toggler": 28,
            "./utils": 29
        }],
        8: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function _inherits(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            var _createClass = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }(),
                _get = function(e, t, r) {
                    for (var o = !0; o;) {
                        var n = e,
                            i = t,
                            u = r;
                        a = s = c = void 0, o = !1, null === n && (n = Function.prototype);
                        var a = Object.getOwnPropertyDescriptor(n, i);
                        if (void 0 !== a) {
                            if ("value" in a) return a.value;
                            var c = a.get;
                            return void 0 === c ? void 0 : c.call(u)
                        }
                        var s = Object.getPrototypeOf(n);
                        if (null === s) return void 0;
                        e = s, t = i, r = u, o = !0
                    }
                },
                Prism = function(e) {
                    function t() {
                        _classCallCheck(this, t), _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "js/prism-worker.js")
                    }
                    return _inherits(t, e), _createClass(t, [{
                        key: "highlight",
                        value: function(e) {
                            return this._requestResponse({
                                data: e
                            })
                        }
                    }]), t
                }(require("./worker-messenger"));
            module.exports = Prism;
            //# sourceMappingURL=out.js.map

        }, {
            "./worker-messenger": 30
        }],
        9: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(e, i) {
                if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function")
            }
            var _createClass = function() {
                    function e(e, i) {
                        for (var t = 0; t < i.length; t++) {
                            var n = i[t];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }
                    return function(i, t, n) {
                        return t && e(i.prototype, t), n && e(i, n), i
                    }
                }(),
                ResultsCache = function() {
                    function e(i) {
                        _classCallCheck(this, e), this._size = i, this.purge()
                    }
                    return _createClass(e, [{
                        key: "purge",
                        value: function() {
                            this._fingerprints = [], this._files = [], this._index = 0
                        }
                    }, {
                        key: "add",
                        value: function(e, i) {
                            var t = this._files[this._index];
                            t && t.release(), this._fingerprints[this._index] = e, this._files[this._index] = i, this._index = (this._index + 1) % this._size
                        }
                    }, {
                        key: "match",
                        value: function(e) {
                            return this._files[this._fingerprints.indexOf(e)]
                        }
                    }]), e
                }();
            module.exports = ResultsCache;
            //# sourceMappingURL=out.js.map

        }, {}],
        10: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            var _createClass = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }
                    return function(t, r, n) {
                        return r && e(t.prototype, r), n && e(t, n), t
                    }
                }(),
                gzip = new(require("./gzip")),
                SvgFile = function() {
                    function e(t, r, n) {
                        _classCallCheck(this, e), this.text = t, this._compressedSize = null, this._url = "", this._blob = null, this.width = r, this.height = n
                    }
                    return _createClass(e, [{
                        key: "size",
                        value: function(e) {
                            var t = e.compress;
                            return regeneratorRuntime.async(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (t) {
                                            e.next = 2;
                                            break
                                        }
                                        return e.abrupt("return", this.text.length);
                                    case 2:
                                        return this._compressedSize || (this._compressedSize = gzip.compress(this.text).then(function(e) {
                                            return e.byteLength
                                        })), e.abrupt("return", this._compressedSize);
                                    case 4:
                                    case "end":
                                        return e.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "_create",
                        value: function() {
                            this._blob = new Blob([this.text], {
                                type: "image/svg+xml"
                            }), this._url = URL.createObjectURL(this._blob)
                        }
                    }, {
                        key: "release",
                        value: function() {
                            this._url && (this._blob = null, URL.revokeObjectURL(this._url))
                        }
                    }, {
                        key: "blob",
                        get: function() {
                            return this._blob || this._create(), this._blob
                        }
                    }, {
                        key: "url",
                        get: function() {
                            return this._url || this._create(), this._url
                        }
                    }]), e
                }();
            module.exports = SvgFile;
            //# sourceMappingURL=out.js.map

        }, {
            "./gzip": 5
        }],
        11: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function _inherits(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            var _createClass = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var n = t[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }
                    return function(t, r, n) {
                        return r && e(t.prototype, r), n && e(t, n), t
                    }
                }(),
                _get = function(e, t, r) {
                    for (var n = !0; n;) {
                        var o = e,
                            s = t,
                            i = r;
                        a = c = u = void 0, n = !1, null === o && (o = Function.prototype);
                        var a = Object.getOwnPropertyDescriptor(o, s);
                        if (void 0 !== a) {
                            if ("value" in a) return a.value;
                            var u = a.get;
                            return void 0 === u ? void 0 : u.call(i)
                        }
                        var c = Object.getPrototypeOf(o);
                        if (null === c) return void 0;
                        e = c, t = s, r = i, n = !0
                    }
                },
                SvgFile = require("./svg-file"),
                Svgo = function(e) {
                    function t() {
                        _classCallCheck(this, t), _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, "js/svgo-worker.js"), this._multiPass = !1, this._abortOnNextItter = !1, this._currentJob = Promise.resolve()
                    }
                    return _inherits(t, e), _createClass(t, [{
                        key: "load",
                        value: function(e) {
                            return this._requestResponse({
                                action: "load",
                                data: e
                            }).then(function(t) {
                                var r = t.width,
                                    n = t.height;
                                return new SvgFile(e, r, n)
                            })
                        }
                    }, {
                        key: "process",
                        value: function(e, t) {
                            var r = this;
                            return this._currentJob = this.abortCurrent().then(function(n) {
                                var o, s;
                                return regeneratorRuntime.async(function(r) {
                                    for (;;) switch (r.prev = r.next) {
                                        case 0:
                                            return this._abortOnNextItter = !1, r.next = 3, regeneratorRuntime.awrap(this._requestResponse({
                                                action: "process",
                                                settings: e
                                            }));
                                        case 3:
                                            if (o = r.sent, s = new SvgFile(o.data, o.dimensions.width, o.dimensions.height), t(s), !e.multipass) {
                                                r.next = 16;
                                                break
                                            }
                                        case 7:
                                            return r.next = 9, regeneratorRuntime.awrap(this.nextPass());
                                        case 9:
                                            if (!(o = r.sent)) {
                                                r.next = 16;
                                                break
                                            }
                                            if (!this._abortOnNextItter) {
                                                r.next = 12;
                                                break
                                            }
                                            throw Error("abort");
                                        case 12:
                                            s = new SvgFile(o.data, o.dimensions.width, o.dimensions.height), t(s), r.next = 7;
                                            break;
                                        case 16:
                                            return r.abrupt("return", s);
                                        case 17:
                                        case "end":
                                            return r.stop()
                                    }
                                }, null, r)
                            })
                        }
                    }, {
                        key: "nextPass",
                        value: function() {
                            return this._requestResponse({
                                action: "nextPass"
                            })
                        }
                    }, {
                        key: "abortCurrent",
                        value: function() {
                            return regeneratorRuntime.async(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return this._abortOnNextItter = !0, e.prev = 1, e.next = 4, regeneratorRuntime.awrap(this._currentJob);
                                    case 4:
                                        e.next = 8;
                                        break;
                                    case 6:
                                        e.prev = 6, e.t0 = e["catch"](1);
                                    case 8:
                                    case "end":
                                        return e.stop()
                                }
                            }, null, this, [
                                [1, 6]
                            ])
                        }
                    }]), t
                }(require("./worker-messenger"));
            module.exports = Svgo;
            //# sourceMappingURL=out.js.map

        }, {
            "./svg-file": 10,
            "./worker-messenger": 30
        }],
        12: [function(require, module, exports) {
                    "use strict";

                    function _classCallCheck(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }

                    function _taggedTemplateLiteral(e, t) {
                        return Object.freeze(Object.defineProperties(e, {
                            raw: {
                                value: Object.freeze(t)
                            }
                        }))
                    }
                    var _createClass = function() {
                            function e(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n];
                                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                                }
                            }
                            return function(t, n, r) {
                                return n && e(t.prototype, n), r && e(t, r), t
                            }
                        }(),
                        _templateObject = _taggedTemplateLiteral([" < li >
                            "," < /li>
                            "],[" < li >
                            "," < /li>
                            "]),utils=require(".. / utils "),Changelog=function(){function e(t){_classCallCheck(this,e),this.container=utils.strToEl(' < section class = "changelog" >
                            < /section>
                            '),this._loadedVersion=t}return _createClass(e,[{key:"showLogFrom",value:function(e){var t,n,r,a,i,s;return regeneratorRuntime.async(function(l){for(;;)switch(l.prev=l.next){case 0:if(e!=this._loadedVersion){l.next=2;break}return l.abrupt("return");case 2:return l.next=4,regeneratorRuntime.awrap(utils.get("changelog.json").then(JSON.parse));case 4:t=l.sent,n=0,r=0,a=0;case 8:if(!(a < t.length)) {
                            l.next = 20;
                            break
                        }
                    if (i = t[a], i.version !== this._loadedVersion) {
                        l.next = 14;
                        break
                    }
                    n = a, l.next = 16;
                    break;
                    case 14:
                        if (i.version !== e) {
                            l.next = 16;
                            break
                        }
                        return l.abrupt("break", 20);
                    case 16:
                        r = a + 1;
                    case 17:
                        a++, l.next = 8;
                        break;
                    case 20:
                        return s = t.slice(n, r).reduce(function(e, t) {
                                return e.concat(t.changes)
                            }, []).map(function(e) {
                                return utils.escapeHtmlTag(_templateObject, e)
                            }), this.container.appendChild(utils.strToEl(" < h1 >
                                Updated!
                                < /h1>
                                ")),this.container.appendChild(utils.strToEl(" < ul >
                                "+s.join("
                                ")+" < /ul>
                                ")),l.next=25,regeneratorRuntime.awrap(utils.domReady);case 25:utils.transitionToClass(this.container);case 26:case"
                                end ":return l.stop()}},null,this)}}]),e}();module.exports=Changelog;
                                //# sourceMappingURL=out.js.map

                            }, {
                                "../utils": 29
                            }], 13: [function(require, module, exports) {
                                    "use strict";

                                    function _classCallCheck(e, t) {
                                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                    }
                                    var _createClass = function() {
                                            function e(e, t) {
                                                for (var r = 0; r < t.length; r++) {
                                                    var n = t[r];
                                                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                                                }
                                            }
                                            return function(t, r, n) {
                                                return r && e(t.prototype, r), n && e(t, n), t
                                            }
                                        }(),
                                        utils = require("../utils"),
                                        prism = new(require("../prism")),
                                        CodeOutput = function() {
                                            function e() {
                                                _classCallCheck(this, e), this.container = utils.strToEl(' < div class = "code-output" >
                                                    < pre >
                                                    < code >
                                                    < /code> < /pre> < /div>
                                                    '),this._codeEl=this.container.querySelector("code")}return _createClass(e,[{key:"setSvg",value:function(e){return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(prism.highlight(e.text));case 2:this._codeEl.innerHTML=t.sent;case 3:case"end":return t.stop()}},null,this)}},{key:"reset",value:function(){this._codeEl.innerHTML=""}}]),e}();module.exports=CodeOutput;
                                                    //# sourceMappingURL=out.js.map

                                                }, {
                                                    "../prism": 8,
                                                    "../utils": 29
                                                }], 14: [function(require, module, exports) {
                                                        "use strict";

                                                        function _classCallCheck(n, e) {
                                                            if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                        }
                                                        var _createClass = function() {
                                                                function n(n, e) {
                                                                    for (var t = 0; t < e.length; t++) {
                                                                        var i = e[t];
                                                                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
                                                                    }
                                                                }
                                                                return function(e, t, i) {
                                                                    return t && n(e.prototype, t), i && n(e, i), e
                                                                }
                                                            }(),
                                                            utils = require("../utils"),
                                                            Spinner = require("./spinner"),
                                                            DownloadButton = function() {
                                                                function n() {
                                                                    var e = this;
                                                                    _classCallCheck(this, n), this.container = utils.strToEl(' < a href = "./"
                                                                        class = "floating-action-button" >
                                                                        < svg viewBox = "0 0 24 24"
                                                                        class = "icon" >
                                                                        < title >
                                                                        Download output < /title> < path d = "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" / >
                                                                        < /svg> < /a>
                                                                        '),this._spinner=new Spinner,this.container.appendChild(this._spinner.container),this._svgFile=null,"msSaveBlob"in navigator&&this.container.addEventListener("click",function(n){n.preventDefault(),navigator.msSaveBlob(e._svgFile.blob,e.container.download)})}return _createClass(n,[{key:"setDownload",value:function(n,e){this.container.download=n,this.container.href=e.url,this._svgFile=e}},{key:"working",value:function(){this._spinner.show(500)}},{key:"done",value:function(){this._spinner.hide()}}]),n}();module.exports=DownloadButton;
                                                                        //# sourceMappingURL=out.js.map

                                                                    }, {
                                                                        "../utils": 29,
                                                                        "./spinner": 25
                                                                    }], 15: [function(require, module, exports) {
                                                                            "use strict";

                                                                            function _classCallCheck(t, e) {
                                                                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                                            }

                                                                            function _inherits(t, e) {
                                                                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                                                                t.prototype = Object.create(e && e.prototype, {
                                                                                    constructor: {
                                                                                        value: t,
                                                                                        enumerable: !1,
                                                                                        writable: !0,
                                                                                        configurable: !0
                                                                                    }
                                                                                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                                                                            }
                                                                            var _createClass = function() {
                                                                                    function t(t, e) {
                                                                                        for (var r = 0; r < e.length; r++) {
                                                                                            var n = e[r];
                                                                                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                                                                                        }
                                                                                    }
                                                                                    return function(e, r, n) {
                                                                                        return r && t(e.prototype, r), n && t(e, n), e
                                                                                    }
                                                                                }(),
                                                                                _get = function(t, e, r) {
                                                                                    for (var n = !0; n;) {
                                                                                        var o = t,
                                                                                            i = e,
                                                                                            a = r;
                                                                                        s = l = u = void 0, n = !1, null === o && (o = Function.prototype);
                                                                                        var s = Object.getOwnPropertyDescriptor(o, i);
                                                                                        if (void 0 !== s) {
                                                                                            if ("value" in s) return s.value;
                                                                                            var u = s.get;
                                                                                            return void 0 === u ? void 0 : u.call(a)
                                                                                        }
                                                                                        var l = Object.getPrototypeOf(o);
                                                                                        if (null === l) return void 0;
                                                                                        t = l, e = i, r = a, n = !0
                                                                                    }
                                                                                },
                                                                                utils = require("../utils"),
                                                                                FileDrop = function(t) {
                                                                                    function e() {
                                                                                        var t = this;
                                                                                        _classCallCheck(this, e), _get(Object.getPrototypeOf(e.prototype), "constructor", this).call(this), this.container = utils.strToEl(' < div class = "drop-overlay" >
                                                                                            Drop it!
                                                                                            < /div>
                                                                                            '),this._activeEnters=0,this._currentEnteredElement=null,utils.domReady.then(function(e){document.addEventListener("dragover",function(t){return t.preventDefault()}),document.addEventListener("dragenter",function(e){return t._onDragEnter(e)}),document.addEventListener("dragleave",function(e){return t._onDragLeave(e)}),document.addEventListener("drop",function(e){return t._onDrop(e)})})}return _inherits(e,t),_createClass(e,[{key:"_onDragEnter",value:function(t){this._currentEnteredElement!=t.target&&(this._currentEnteredElement=t.target,this._activeEnters++||utils.transitionToClass(this.container))}},{key:"_onDragLeave",value:function(t){this._currentEnteredElement=null,--this._activeEnters||utils.transitionFromClass(this.container)}},{key:"_onDrop",value:function(t){var e;return regeneratorRuntime.async(function(r){for(;;)switch(r.prev=r.next){case 0:return t.preventDefault(),utils.transitionFromClass(this.container),e=t.dataTransfer.files[0],r.t0=this,r.next=6,regeneratorRuntime.awrap(utils.readFileAsText(e));case 6:r.t1=r.sent,r.t2=e.name,r.t3={data:r.t1,filename:r.t2},r.t0.emit.call(r.t0,"svgDataLoad",r.t3);case 10:case"end":return r.stop()}},null,this)}}]),e}(require("events").EventEmitter);module.exports=FileDrop;
                                                                                            //# sourceMappingURL=out.js.map

                                                                                        }, {
                                                                                            "../utils": 29,
                                                                                            "events": 3
                                                                                        }], 16: [function(require, module, exports) {
                                                                                        "use strict";

                                                                                        function _classCallCheck(e, t) {
                                                                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                        }

                                                                                        function _inherits(e, t) {
                                                                                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                                                                                            e.prototype = Object.create(t && t.prototype, {
                                                                                                constructor: {
                                                                                                    value: e,
                                                                                                    enumerable: !1,
                                                                                                    writable: !0,
                                                                                                    configurable: !0
                                                                                                }
                                                                                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                                                                                        }
                                                                                        var _createClass = function() {
                                                                                                function e(e, t) {
                                                                                                    for (var n = 0; n < t.length; n++) {
                                                                                                        var r = t[n];
                                                                                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                                                                                                    }
                                                                                                }
                                                                                                return function(t, n, r) {
                                                                                                    return n && e(t.prototype, n), r && e(t, r), t
                                                                                                }
                                                                                            }(),
                                                                                            _get = function(e, t, n) {
                                                                                                for (var r = !0; r;) {
                                                                                                    var i = e,
                                                                                                        o = t,
                                                                                                        a = n;
                                                                                                    s = u = l = void 0, r = !1, null === i && (i = Function.prototype);
                                                                                                    var s = Object.getOwnPropertyDescriptor(i, o);
                                                                                                    if (void 0 !== s) {
                                                                                                        if ("value" in s) return s.value;
                                                                                                        var l = s.get;
                                                                                                        return void 0 === l ? void 0 : l.call(a)
                                                                                                    }
                                                                                                    var u = Object.getPrototypeOf(i);
                                                                                                    if (null === u) return void 0;
                                                                                                    e = u, t = o, n = a, r = !0
                                                                                                }
                                                                                            },
                                                                                            utils = require("../utils"),
                                                                                            Spinner = require("./spinner"),
                                                                                            MainMenu = function(e) {
                                                                                                function t() {
                                                                                                    var e = this;
                                                                                                    _classCallCheck(this, t), _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.allowHide = !1, this._spinner = new Spinner, utils.domReady.then(function(t) {
                                                                                                        e.container = document.querySelector(".main-menu"), e._selectFileInput = document.querySelector(".select-file-input"), e._pasteInput = document.querySelector(".paste-input"), e._loadDemoBtn = document.querySelector(".load-demo"), e._selectFileBtn = document.querySelector(".select-file"), e._pasteLabel = document.querySelector(".menu-input"), e._overlay = e.container.querySelector(".overlay"), e._menu = e.container.querySelector(".menu"), document.querySelector(".menu-btn").addEventListener("click", function(t) {
                                                                                                            return e._onMenuButtonClick(t)
                                                                                                        }), e._overlay.addEventListener("click", function(t) {
                                                                                                            return e._onOverlayClick(t)
                                                                                                        }), e._selectFileBtn.addEventListener("click", function(t) {
                                                                                                            return e._onSelectFileClick(t)
                                                                                                        }), e._loadDemoBtn.addEventListener("click", function(t) {
                                                                                                            return e._onLoadDemoClick(t)
                                                                                                        }), e._selectFileInput.addEventListener("change", function(t) {
                                                                                                            return e._onFileInputChange(t)
                                                                                                        }), e._pasteInput.addEventListener("input", function(t) {
                                                                                                            return e._onTextInputChange(t)
                                                                                                        })
                                                                                                    })
                                                                                                }
                                                                                                return _inherits(t, e), _createClass(t, [{
                                                                                                        key: "show",
                                                                                                        value: function() {
                                                                                                            this.container.classList.remove("hidden"), utils.transitionFromClass(this._overlay, "hidden"), utils.transitionFromClass(this._menu, "hidden")
                                                                                                        }
                                                                                                    }, {
                                                                                                        key: "hide",
                                                                                                        value: function() {
                                                                                                            this.allowHide && (this.stopSpinner(), this.container.classList.add("hidden"), utils.transitionToClass(this._overlay, "hidden"), utils.transitionToClass(this._menu, "hidden"))
                                                                                                        }
                                                                                                    }, {
                                                                                                        key: "stopSpinner",
                                                                                                        value: function() {
                                                                                                            this._spinner.hide()
                                                                                                        }
                                                                                                    }, {
                                                                                                        key: "_onOverlayClick",
                                                                                                        value: function(e) {
                                                                                                            e.preventDefault(), this.hide()
                                                                                                        }
                                                                                                    }, {
                                                                                                        key: "_onMenuButtonClick",
                                                                                                        value: function(e) {
                                                                                                            e.preventDefault(), this.show()
                                                                                                        }
                                                                                                    }, {
                                                                                                        key: "_onTextInputChange",
                                                                                                        value: function(e) {
                                                                                                            var t = this._pasteInput.value.trim(); - 1 != t.indexOf(" < /svg>
                                                                                                                ")&&(this._pasteInput.value="
                                                                                                                ",this._pasteInput.blur(),this._pasteLabel.appendChild(this._spinner.container),this._spinner.show(),this.emit("
                                                                                                                svgDataLoad ",{data:t,filename:"
                                                                                                                image.svg "}))}},{key:"
                                                                                                                _onSelectFileClick ",value:function(e){e.preventDefault(),e.target.blur(),this._selectFileInput.click()}},{key:"
                                                                                                                _onFileInputChange ",value:function(e){var t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this._selectFileInput.files[0]){e.next=3;break}return e.abrupt("
                                                                                                                return ");case 3:return this._selectFileBtn.appendChild(this._spinner.container),this._spinner.show(),e.t0=this,e.next=8,regeneratorRuntime.awrap(utils.readFileAsText(t));case 8:e.t1=e.sent,e.t2=t.name,e.t3={data:e.t1,filename:e.t2},e.t0.emit.call(e.t0,"
                                                                                                                svgDataLoad ",e.t3);case 12:case"
                                                                                                                end ":return e.stop()}},null,this)}},{key:"
                                                                                                                _onLoadDemoClick ",value:function(e){var t;return regeneratorRuntime.async(function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),e.target.blur(),this._loadDemoBtn.appendChild(this._spinner.container),this._spinner.show(),n.prev=4,n.t0=this,n.next=8,regeneratorRuntime.awrap(utils.get("
                                                                                                                test - svgs / car - lite.svg "));case 8:n.t1=n.sent,n.t2={data:n.t1,filename:"
                                                                                                                car.svg "},n.t0.emit.call(n.t0,"
                                                                                                                svgDataLoad ",n.t2),n.next=18;break;case 13:n.prev=13,n.t3=n["
                                                                                                                catch "](4),this.stopSpinner(),t="
                                                                                                                serviceWorker "in navigator&&navigator.serviceWorker.controller?Error("
                                                                                                                Demo not available offline "):Error("
                                                                                                                Couldn 't fetch demo SVG"),this.emit("error",{error:t});case 18:case"end":return n.stop()}},null,this,[[4,13]])}}]),t}(require("events").EventEmitter);module.exports=MainMenu;
                                                                                                                //# sourceMappingURL=out.js.map

                                                                                                            }, {
                                                                                                                "../utils": 29,
                                                                                                                "./spinner": 25,
                                                                                                                "events": 3
                                                                                                            }],
                                                                                                        17: [function(require, module, exports) {
                                                                                                            "use strict";

                                                                                                            function _classCallCheck(t, e) {
                                                                                                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                                                                            }
                                                                                                            var _createClass = function() {
                                                                                                                    function t(t, e) {
                                                                                                                        for (var a = 0; a < e.length; a++) {
                                                                                                                            var n = e[a];
                                                                                                                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                                                                                                                        }
                                                                                                                    }
                                                                                                                    return function(e, a, n) {
                                                                                                                        return a && t(e.prototype, a), n && t(e, n), e
                                                                                                                    }
                                                                                                                }(),
                                                                                                                utils = require("../utils"),
                                                                                                                MainUi = function() {
                                                                                                                    function t() {
                                                                                                                        _classCallCheck(this, t), this._activated = !1;
                                                                                                                        for (var e = arguments.length, a = Array(e), n = 0; e >
                                                                                                                            n; n++) a[n] = arguments[n];
                                                                                                                        this._toActivate = a
                                                                                                                    }
                                                                                                                    return _createClass(t, [{
                                                                                                                        key: "activate",
                                                                                                                        value: function() {
                                                                                                                            return this._activated ? void 0 : (this._activated = !0, Promise.all(this._toActivate.map(function(t) {
                                                                                                                                return utils.transitionToClass(t)
                                                                                                                            })))
                                                                                                                        }
                                                                                                                    }]), t
                                                                                                                }();
                                                                                                            module.exports = MainUi;
                                                                                                            //# sourceMappingURL=out.js.map

                                                                                                        }, {
                                                                                                            "../utils": 29
                                                                                                        }],
                                                                                                        18: [function(require, module, exports) {
                                                                                                                "use strict";

                                                                                                                function _classCallCheck(n, e) {
                                                                                                                    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                                                                                }
                                                                                                                var _createClass = function() {
                                                                                                                        function n(n, e) {
                                                                                                                            for (var t = 0; t < e.length; t++) {
                                                                                                                                var i = e[t];
                                                                                                                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
                                                                                                                            }
                                                                                                                        }
                                                                                                                        return function(e, t, i) {
                                                                                                                            return t && n(e.prototype, t), i && n(e, i), e
                                                                                                                        }
                                                                                                                    }(),
                                                                                                                    utils = require("../utils"),
                                                                                                                    MaterialSlider = function() {
                                                                                                                        function n(e) {
                                                                                                                            var t = this;
                                                                                                                            _classCallCheck(this, n), this.container = utils.strToEl('\n < div class = "material-slider" > \n < div class = "track" > \n < div class = "track-on" >
                                                                                                                                < /div>\
                                                                                                                                n < div class = "handle" > \n < div class = "arrow" >
                                                                                                                                < /div>\
                                                                                                                                n < div class = "val" >
                                                                                                                                < /div>\
                                                                                                                                n < /div>\
                                                                                                                                n < /div>\
                                                                                                                                n < /div>\
                                                                                                                                n '),this.range=e,this._handle=this.container.querySelector(".handle"),this._trackOn=this.container.querySelector(".track-on"),this._val=this.container.querySelector(".val"),e.parentNode.insertBefore(this.container,e),this.container.insertBefore(e,this.container.firstChild);var i=utils.isIe?"change":"input";e.addEventListener(i,function(n){return t._onInputChange(n)}),this.range.addEventListener("mousedown",function(n){return t._onRangeMouseDown(n)}),this.range.addEventListener("touchstart",function(n){return t._onRangeTouchStart(n)}),this.range.addEventListener("touchend",function(n){return t._onRangeTouchEnd(n)}),this._setPosition()}return _createClass(n,[{key:"_onRangeTouchStart",value:function(n){this.range.focus()}},{key:"_onRangeTouchEnd",value:function(n){this.range.blur()}},{key:"_onRangeMouseDown",value:function(n){var e=this;this.range.classList.add("active");var t=function i(n){requestAnimationFrame(function(n){e.range.blur()}),e.range.classList.remove("active"),document.removeEventListener("mouseup",i)};document.addEventListener("mouseup",t)}},{key:"_onInputChange",value:function(n){var e=this;requestAnimationFrame(function(n){return e._setPosition()})}},{key:"_setPosition",value:function(){var n=this.range,e=n.min,t=n.max,i=n.value,a=(Number(i)-e)/(t-e);this._trackOn.style.width=this._handle.style.left=100*a+"%",this._val.textContent=i}}]),n}();module.exports=MaterialSlider;
                                                                                                                                //# sourceMappingURL=out.js.map

                                                                                                                            }, {
                                                                                                                                "../utils": 29
                                                                                                                            }], 19: [function(require, module, exports) {
                                                                                                                                "use strict";

                                                                                                                                function _classCallCheck(e, t) {
                                                                                                                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                                                                }
                                                                                                                                var _createClass = function() {
                                                                                                                                        function e(e, t) {
                                                                                                                                            for (var i = 0; i < t.length; i++) {
                                                                                                                                                var s = t[i];
                                                                                                                                                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                        return function(t, i, s) {
                                                                                                                                            return i && e(t.prototype, i), s && e(t, s), t
                                                                                                                                        }
                                                                                                                                    }(),
                                                                                                                                    utils = require("../utils"),
                                                                                                                                    Output = function() {
                                                                                                                                        function e() {
                                                                                                                                            _classCallCheck(this, e), this.container = utils.strToEl(' < div class = "output-switcher" >
                                                                                                                                                < /div>
                                                                                                                                                '),this._types={image:new(require("./svg-output")),code:new(require("./code-output"))},this._svgFile=null,this._switchQueue=Promise.resolve(),this.set("image",{noAnimate:!0})}return _createClass(e,[{key:"update",value:function(e){return this._svgFile=e,this._types[this._activeType].setSvg(e)}},{key:"reset",value:function(){this._types[this._activeType].reset()}},{key:"set",value:function(e){var t=this,i=arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], s = i.noAnimate, n = void 0 === s ? !1 : s;
                                                                                                                                                return this._switchQueue = this._switchQueue.then(function(i) {
                                                                                                                                                    var s, r, a;
                                                                                                                                                    return regeneratorRuntime.async(function(t) {
                                                                                                                                                        for (;;) switch (t.prev = t.next) {
                                                                                                                                                            case 0:
                                                                                                                                                                if (this._activeType && (s = this._types[this._activeType].container), this._activeType = e, r = this._types[this._activeType].container, this.container.appendChild(r), !this._svgFile) {
                                                                                                                                                                    t.next = 7;
                                                                                                                                                                    break
                                                                                                                                                                }
                                                                                                                                                                return t.next = 7, regeneratorRuntime.awrap(this.update(this._svgFile));
                                                                                                                                                            case 7:
                                                                                                                                                                if (!n) {
                                                                                                                                                                    t.next = 12;
                                                                                                                                                                    break
                                                                                                                                                                }
                                                                                                                                                                r.classList.add("active"), s && s.classList.remove("active"), t.next = 16;
                                                                                                                                                                break;
                                                                                                                                                            case 12:
                                                                                                                                                                return a = [utils.transitionToClass(r)], s && a.push(utils.transitionFromClass(s)), t.next = 16, regeneratorRuntime.awrap(Promise.all(a));
                                                                                                                                                            case 16:
                                                                                                                                                                s && this.container.removeChild(s);
                                                                                                                                                            case 17:
                                                                                                                                                            case "end":
                                                                                                                                                                return t.stop()
                                                                                                                                                        }
                                                                                                                                                    }, null, t)
                                                                                                                                                })
                                                                                                                                            }
                                                                                                                                        }]), e
                                                                                                                        }();
                                                                                                                        module.exports = Output;
                                                                                                                        //# sourceMappingURL=out.js.map

                                                                                                                    },
                                                                                                                    {
                                                                                                                        "../utils": 29,
                                                                                                                        "./code-output": 13,
                                                                                                                        "./svg-output": 26
                                                                                                                    }], 20: [function(require, module, exports) {
                                                                                                                "use strict";

                                                                                                                function _classCallCheck(t, e) {
                                                                                                                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                                                                                }

                                                                                                                function getXY(t) {
                                                                                                                    return {
                                                                                                                        x: t.pageX,
                                                                                                                        y: t.pageY
                                                                                                                    }
                                                                                                                }

                                                                                                                function touchDistance(t, e) {
                                                                                                                    var n = Math.abs(e.x - t.x),
                                                                                                                        i = Math.abs(e.y - t.y);
                                                                                                                    return Math.sqrt(n * n + i * i)
                                                                                                                }

                                                                                                                function getMidpoint(t, e) {
                                                                                                                    return {
                                                                                                                        x: (t.x + e.x) / 2,
                                                                                                                        y: (t.y + e.y) / 2
                                                                                                                    }
                                                                                                                }

                                                                                                                function getPoints(t) {
                                                                                                                    return t.touches ? Array.prototype.map.call(t.touches, getXY) : [getXY(t)]
                                                                                                                }
                                                                                                                var _createClass = function() {
                                                                                                                        function t(t, e) {
                                                                                                                            for (var n = 0; n < e.length; n++) {
                                                                                                                                var i = e[n];
                                                                                                                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                                                                                                            }
                                                                                                                        }
                                                                                                                        return function(e, n, i) {
                                                                                                                            return n && t(e.prototype, n), i && t(e, i), e
                                                                                                                        }
                                                                                                                    }(),
                                                                                                                    utils = require("../utils"),
                                                                                                                    PanZoom = function() {
                                                                                                                        function t(e) {
                                                                                                                            var n = this,
                                                                                                                                i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                                                                                                                o = i.eventArea,
                                                                                                                                s = void 0 === o ? e : o,
                                                                                                                                r = i.shouldCaptureFunc,
                                                                                                                                a = void 0 === r ? function(t) {
                                                                                                                                    return !0
                                                                                                                                } : r;
                                                                                                                            _classCallCheck(this, t), this._target = e, this._shouldCaptureFunc = a, this._dx = 0, this._dy = 0, this._scale = 1, this._active = 0, this._lastPoints = [], ["_onPointerDown", "_onPointerMove", "_onPointerUp"].forEach(function(t) {
                                                                                                                                n[t] = n[t].bind(n)
                                                                                                                            }), s.addEventListener("mousedown", this._onPointerDown), s.addEventListener("touchstart", this._onPointerDown), s.addEventListener("wheel", function(t) {
                                                                                                                                return n._onWheel(t)
                                                                                                                            })
                                                                                                                        }
                                                                                                                        return _createClass(t, [{
                                                                                                                            key: "reset",
                                                                                                                            value: function() {
                                                                                                                                this._dx = 0, this._dy = 0, this._scale = 1, this._update()
                                                                                                                            }
                                                                                                                        }, {
                                                                                                                            key: "_onWheel",
                                                                                                                            value: function(t) {
                                                                                                                                if (this._shouldCaptureFunc(t.target)) {
                                                                                                                                    t.preventDefault();
                                                                                                                                    var e = this._target.getBoundingClientRect(),
                                                                                                                                        n = t.deltaY;
                                                                                                                                    1 === t.deltaMode && (n *= 15), n = Math.max(Math.min(n, 60), -60);
                                                                                                                                    var i = n / 300 + 1;
                                                                                                                                    this._scale * i < .05 || (this._scale *= i, this._dx -= (t.pageX - e.left) * (i - 1), this._dy -= (t.pageY - e.top) * (i - 1), this._update())
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }, {
                                                                                                                            key: "_onFirstPointerDown",
                                                                                                                            value: function(t) {
                                                                                                                                document.addEventListener("mousemove", this._onPointerMove), document.addEventListener("mouseup", this._onPointerUp), document.addEventListener("touchmove", this._onPointerMove), document.addEventListener("touchend", this._onPointerUp)
                                                                                                                            }
                                                                                                                        }, {
                                                                                                                            key: "_onPointerDown",
                                                                                                                            value: function(t) {
                                                                                                                                ("mousedown" != t.type || 1 == t.which) && this._shouldCaptureFunc(t.target) && (t.preventDefault(), this._lastPoints = getPoints(t), this._active++, 1 === this._active && this._onFirstPointerDown(t))
                                                                                                                            }
                                                                                                                        }, {
                                                                                                                            key: "_onPointerMove",
                                                                                                                            value: function(t) {
                                                                                                                                t.preventDefault();
                                                                                                                                var e = getPoints(t),
                                                                                                                                    n = e.reduce(getMidpoint),
                                                                                                                                    i = this._lastPoints.reduce(getMidpoint),
                                                                                                                                    o = this._target.getBoundingClientRect();
                                                                                                                                if (this._dx += n.x - i.x, this._dy += n.y - i.y, e[1]) {
                                                                                                                                    var s = touchDistance(e[0], e[1]) / touchDistance(this._lastPoints[0], this._lastPoints[1]);
                                                                                                                                    this._scale *= s, this._dx -= (n.x - o.left) * (s - 1), this._dy -= (n.y - o.top) * (s - 1)
                                                                                                                                }
                                                                                                                                this._update(), this._lastPoints = e
                                                                                                                            }
                                                                                                                        }, {
                                                                                                                            key: "_update",
                                                                                                                            value: function() {
                                                                                                                                this._target.style.WebkitTransform = this._target.style.transform = "translate3d(" + this._dx + "px, " + this._dy + "px, 0) scale(" + this._scale + ")"
                                                                                                                            }
                                                                                                                        }, {
                                                                                                                            key: "_onPointerUp",
                                                                                                                            value: function(t) {
                                                                                                                                return t.preventDefault(), this._active--, this._lastPoints.pop(), this._active ? void(this._lastPoints = getPoints(t)) : (document.removeEventListener("mousemove", this._onPointerMove), document.removeEventListener("mouseup", this._onPointerUp), document.removeEventListener("touchmove", this._onPointerMove), void document.removeEventListener("touchend", this._onPointerUp))
                                                                                                                            }
                                                                                                                        }]), t
                                                                                                                    }();
                                                                                                                module.exports = PanZoom;
                                                                                                                //# sourceMappingURL=out.js.map

                                                                                                            }, {
                                                                                                                "../utils": 29
                                                                                                            }], 21: [function(require, module, exports) {
                                                                                                                "use strict";

                                                                                                                function _classCallCheck(e, t) {
                                                                                                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                                                }
                                                                                                                var _createClass = function() {
                                                                                                                        function e(e, t) {
                                                                                                                            for (var n = 0; n < t.length; n++) {
                                                                                                                                var r = t[n];
                                                                                                                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                                                                                                                            }
                                                                                                                        }
                                                                                                                        return function(t, n, r) {
                                                                                                                            return n && e(t.prototype, n), r && e(t, r), t
                                                                                                                        }
                                                                                                                    }(),
                                                                                                                    utils = require("../utils"),
                                                                                                                    Preloader = function() {
                                                                                                                        function e() {
                                                                                                                            var t = this;
                                                                                                                            _classCallCheck(this, e), utils.domReady.then(function(e) {
                                                                                                                                t.container = document.querySelector(".preloader"), t.activated = t.container.classList.contains("active"), t.hide()
                                                                                                                            })
                                                                                                                        }
                                                                                                                        return _createClass(e, [{
                                                                                                                            key: "hide",
                                                                                                                            value: function() {
                                                                                                                                return regeneratorRuntime.async(function(e) {
                                                                                                                                    for (;;) switch (e.prev = e.next) {
                                                                                                                                        case 0:
                                                                                                                                            return e.next = 2, regeneratorRuntime.awrap(utils.transitionFromClass(this.container, "active"));
                                                                                                                                        case 2:
                                                                                                                                            this.container.style.display = "none";
                                                                                                                                        case 3:
                                                                                                                                        case "end":
                                                                                                                                            return e.stop()
                                                                                                                                    }
                                                                                                                                }, null, this)
                                                                                                                            }
                                                                                                                        }]), e
                                                                                                                    }();
                                                                                                                module.exports = Preloader;
                                                                                                                //# sourceMappingURL=out.js.map

                                                                                                            }, {
                                                                                                                "../utils": 29
                                                                                                            }], 22: [function(require, module, exports) {
                                                                                                                "use strict";

                                                                                                                function _classCallCheck(e, t) {
                                                                                                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                                                }
                                                                                                                var _createClass = function() {
                                                                                                                        function e(e, t) {
                                                                                                                            for (var n = 0; n < t.length; n++) {
                                                                                                                                var i = t[n];
                                                                                                                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                                                                                                            }
                                                                                                                        }
                                                                                                                        return function(t, n, i) {
                                                                                                                            return n && e(t.prototype, n), i && e(t, i), t
                                                                                                                        }
                                                                                                                    }(),
                                                                                                                    utils = require("../utils"),
                                                                                                                    ResultsContainer = function() {
                                                                                                                        function e(t) {
                                                                                                                            var n = this;
                                                                                                                            _classCallCheck(this, e), this._results = t, utils.domReady.then(function(e) {
                                                                                                                                n._mobileContainer = document.querySelector(".results-container-mobile"), n._container = document.querySelector(".results-container"), n._query = matchMedia("(min-width: 640px)"), n._query.addListener(function(e) {
                                                                                                                                    return n._positionResults()
                                                                                                                                }), n._positionResults()
                                                                                                                            })
                                                                                                                        }
                                                                                                                        return _createClass(e, [{
                                                                                                                            key: "_positionResults",
                                                                                                                            value: function() {
                                                                                                                                this._query.matches ? this._container.appendChild(this._results.container) : this._mobileContainer.appendChild(this._results.container)
                                                                                                                            }
                                                                                                                        }]), e
                                                                                                                    }();
                                                                                                                module.exports = ResultsContainer;
                                                                                                                //# sourceMappingURL=out.js.map

                                                                                                            }, {
                                                                                                                "../utils": 29
                                                                                                            }], 23: [function(require, module, exports) {
                                                                                                                "use strict";

                                                                                                                function _classCallCheck(t, e) {
                                                                                                                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                                                                                }

                                                                                                                function round(t, e) {
                                                                                                                    var n = Math.pow(10, e);
                                                                                                                    return Math.floor(Math.round(t * n)) / n
                                                                                                                }

                                                                                                                function humanSize(t) {
                                                                                                                    return 1024 >
                                                                                                                        t ? t + " bytes" : round(t / 1024, 2) + "k"
                                                                                                                }
                                                                                                                var _createClass = function() {
                                                                                                                        function t(t, e) {
                                                                                                                            for (var n = 0; n < e.length; n++) {
                                                                                                                                var i = e[n];
                                                                                                                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                                                                                                            }
                                                                                                                        }
                                                                                                                        return function(e, n, i) {
                                                                                                                            return n && t(e.prototype, n), i && t(e, i), e
                                                                                                                        }
                                                                                                                    }(),
                                                                                                                    utils = require("../utils"),
                                                                                                                    Results = function() {
                                                                                                                        function t() {
                                                                                                                            _classCallCheck(this, t), this.container = utils.strToEl(' < div class = "results" >
                                                                                                                                < span class = "size" >
                                                                                                                                < /span> < span class = "diff" >
                                                                                                                                < /span> < /div>
                                                                                                                                '),this._sizeEl=this.container.querySelector(".size"),this._diffEl=this.container.querySelector(".diff")}return _createClass(t,[{key:"update",value:function(t){var e=t.size,n=t.comparisonSize;return this._sizeEl.textContent=humanSize(e),n?void(e==n?this._diffEl.textContent=" - no change":e>
                                                                                                                                n ? this._diffEl.textContent = " - " + round(e / n * 100 - 100, 2) + "% increase" : this._diffEl.textContent = " - " + round(100 - e / n * 100, 2) + "% saving"): void(this._diffEl.textContent = "")
                                                                                                                        }
                                                                                                                    }]), t
                                                                                                        }();module.exports = Results;
                                                                                                        //# sourceMappingURL=out.js.map

                                                                                                    }, {
                                                                                                        "../utils": 29
                                                                                                    }], 24: [function(require, module, exports) {
                                                                                                        "use strict";

                                                                                                        function _classCallCheck(e, t) {
                                                                                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                                        }

                                                                                                        function _inherits(e, t) {
                                                                                                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                                                                                                            e.prototype = Object.create(t && t.prototype, {
                                                                                                                constructor: {
                                                                                                                    value: e,
                                                                                                                    enumerable: !1,
                                                                                                                    writable: !0,
                                                                                                                    configurable: !0
                                                                                                                }
                                                                                                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                                                                                                        }
                                                                                                        var _createClass = function() {
                                                                                                                function e(e, t) {
                                                                                                                    for (var n = 0; n < t.length; n++) {
                                                                                                                        var r = t[n];
                                                                                                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                                                                                                                    }
                                                                                                                }
                                                                                                                return function(t, n, r) {
                                                                                                                    return n && e(t.prototype, n), r && e(t, r), t
                                                                                                                }
                                                                                                            }(),
                                                                                                            _get = function(e, t, n) {
                                                                                                                for (var r = !0; r;) {
                                                                                                                    var o = e,
                                                                                                                        i = t,
                                                                                                                        u = n;
                                                                                                                    l = c = a = void 0, r = !1, null === o && (o = Function.prototype);
                                                                                                                    var l = Object.getOwnPropertyDescriptor(o, i);
                                                                                                                    if (void 0 !== l) {
                                                                                                                        if ("value" in l) return l.value;
                                                                                                                        var a = l.get;
                                                                                                                        return void 0 === a ? void 0 : a.call(u)
                                                                                                                    }
                                                                                                                    var c = Object.getPrototypeOf(o);
                                                                                                                    if (null === c) return void 0;
                                                                                                                    e = c, t = i, n = u, r = !0
                                                                                                                }
                                                                                                            },
                                                                                                            utils = require("../utils"),
                                                                                                            Slider = require("./material-slider"),
                                                                                                            Settings = function(e) {
                                                                                                                function t() {
                                                                                                                    var e = this;
                                                                                                                    _classCallCheck(this, t), _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this._throttleTimeout = null, utils.domReady.then(function(t) {
                                                                                                                        e._pluginInputs = utils.toArray(document.querySelectorAll(".settings .plugins input")), e._globalInputs = utils.toArray(document.querySelectorAll(".settings .global input")), utils.toArray(document.querySelectorAll(".settings input[type=range]")).forEach(function(e) {
                                                                                                                            return new Slider(e)
                                                                                                                        }), e.container = document.querySelector(".settings"), e._scroller = document.querySelector(".settings-scroller"), e.container.addEventListener("change", function(t) {
                                                                                                                            return e._onChange(t)
                                                                                                                        }), e.container.addEventListener("input", function(t) {
                                                                                                                            return e._onChange(t)
                                                                                                                        }), e._scroller.addEventListener("wheel", function(t) {
                                                                                                                            return e._onMouseWheel(t)
                                                                                                                        }), e._scroller.addEventListener("mousedown", function(e) {
                                                                                                                            utils.closest(e.target, "input[type=range]") || e.preventDefault()
                                                                                                                        })
                                                                                                                    })
                                                                                                                }
                                                                                                                return _inherits(t, e), _createClass(t, [{
                                                                                                                    key: "_onMouseWheel",
                                                                                                                    value: function(e) {
                                                                                                                        e.deltaMode || (e.preventDefault(), e.currentTarget.scrollTop += e.deltaY)
                                                                                                                    }
                                                                                                                }, {
                                                                                                                    key: "_onChange",
                                                                                                                    value: function(e) {
                                                                                                                        var t = this;
                                                                                                                        (utils.isIe || "change" != e.type || "range" != e.target.type) && (clearTimeout(this._throttleTimeout), "range" == e.target.type ? this._throttleTimeout = setTimeout(function(e) {
                                                                                                                            return t.emit("change")
                                                                                                                        }, 150) : this.emit("change"))
                                                                                                                    }
                                                                                                                }, {
                                                                                                                    key: "getSettings",
                                                                                                                    value: function() {
                                                                                                                        var e = [],
                                                                                                                            t = {
                                                                                                                                plugins: {}
                                                                                                                            };
                                                                                                                        return this._globalInputs.forEach(function(n) {
                                                                                                                            "gzip" != n.name && "original" != n.name && ("checkbox" == n.type ? e.push(Number(n.checked)) : e.push("|" + n.value + "|")), "checkbox" == n.type ? t[n.name] = n.checked : t[n.name] = n.value
                                                                                                                        }), this._pluginInputs.forEach(function(n) {
                                                                                                                            e.push(Number(n.checked)), t.plugins[n.name] = n.checked
                                                                                                                        }), t.fingerprint = e.join(), t
                                                                                                                    }
                                                                                                                }]), t
                                                                                                            }(require("events").EventEmitter);
                                                                                                        module.exports = Settings;
                                                                                                        //# sourceMappingURL=out.js.map

                                                                                                    }, {
                                                                                                        "../utils": 29,
                                                                                                        "./material-slider": 18,
                                                                                                        "events": 3
                                                                                                    }], 25: [function(require, module, exports) {
                                                                                                            "use strict";

                                                                                                            function _classCallCheck(i, e) {
                                                                                                                if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                                                                            }
                                                                                                            var _createClass = function() {
                                                                                                                    function i(i, e) {
                                                                                                                        for (var n = 0; n < e.length; n++) {
                                                                                                                            var t = e[n];
                                                                                                                            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(i, t.key, t)
                                                                                                                        }
                                                                                                                    }
                                                                                                                    return function(e, n, t) {
                                                                                                                        return n && i(e.prototype, n), t && i(e, t), e
                                                                                                                    }
                                                                                                                }(),
                                                                                                                utils = require("../utils"),
                                                                                                                Spinner = function() {
                                                                                                                    function i() {
                                                                                                                        var e = this;
                                                                                                                        _classCallCheck(this, i), this.container = utils.strToEl(' < div class = "spinner" >
                                                                                                                            < div class = "spinner-container" >
                                                                                                                            < div class = "spinner-layer" >
                                                                                                                            < div class = "circle-clipper left" >
                                                                                                                            < div class = "circle" >
                                                                                                                            < /div> < /div> < div class = "gap-patch" >
                                                                                                                            < div class = "circle" >
                                                                                                                            < /div> < /div> < div class = "circle-clipper right" >
                                                                                                                            < div class = "circle" >
                                                                                                                            < /div> < /div> < /div> < /div> < /div>
                                                                                                                            '),this._showTimeout=null,this.container.style.display="none";var n=function(i){i.target==e.container&&(e.container.style.display="none")};this.container.addEventListener("webkitAnimationEnd",n),this.container.addEventListener("animationend",n)}return _createClass(i,[{key:"show",value:function(){var i=this,e=arguments.length <= 0 || void 0 === arguments[0] ? 300 : arguments[0]; clearTimeout(this._showTimeout), this.container.style.display = "none", this.container.classList.remove("cooldown"), this._showTimeout = setTimeout(function(e) {
                                                                                                                                i.container.style.display = ""
                                                                                                                            }, e)
                                                                                                                        }
                                                                                                                    }, {
                                                                                                                        key: "hide",
                                                                                                                        value: function() {
                                                                                                                            clearTimeout(this._showTimeout), this.container.classList.add("cooldown")
                                                                                                                        }
                                                                                                                    }]), i
                                                                                                    }(); module.exports = Spinner;
                                                                                                    //# sourceMappingURL=out.js.map

                                                                                                }, {
                                                                                                    "../utils": 29
                                                                                                }],
                                                                                            26: [function(require, module, exports) {
                                                                                                "use strict";

                                                                                                function _classCallCheck(e, t) {
                                                                                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                                }
                                                                                                var _createClass = function() {
                                                                                                        function e(e, t) {
                                                                                                            for (var n = 0; n < t.length; n++) {
                                                                                                                var s = t[n];
                                                                                                                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
                                                                                                            }
                                                                                                        }
                                                                                                        return function(t, n, s) {
                                                                                                            return n && e(t.prototype, n), s && e(t, s), t
                                                                                                        }
                                                                                                    }(),
                                                                                                    utils = require("../utils"),
                                                                                                    PanZoom = require("./pan-zoom"),
                                                                                                    SvgOutput = function() {
                                                                                                        function e() {
                                                                                                            var t = this;
                                                                                                            _classCallCheck(this, e);
                                                                                                            var n = utils.isIe ? ' < img class = "svg-frame" >
                                                                                                                ':' < iframe class = "svg-frame"
                                                                                                            sandbox = "allow-scripts" >
                                                                                                                < /iframe>
                                                                                                            ';this.container=utils.strToEl(' < div class = "svg-output" >
                                                                                                                < div class = "svg-container" >
                                                                                                                '+n+' < /div> < div class = "svg-clickjacker" >
                                                                                                                < /div> < /div>
                                                                                                            '),this._svgFrame=this.container.querySelector(".svg-frame"),this._svgFrame.scrolling="no",this._svgContainer=this.container.querySelector(".svg-container"),utils.domReady.then(function(e){t._panZoom=new PanZoom(t._svgContainer,{eventArea:t.container})})}return _createClass(e,[{key:"setSvg",value:function(e){var t=this._nextLoadPromise();return this._svgFrame.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(e.text),this._svgFrame.width=e.width,this._svgFrame.height=e.height,t}},{key:"reset",value:function(){this._svgFrame.src="about:blank",this._panZoom.reset()}},{key:"_nextLoadPromise",value:function(){var e=this;return new Promise(function(t){var n=function s(n){e._svgFrame.removeEventListener("load",s),t()};e._svgFrame.addEventListener("load",n)})}}]),e}();module.exports=SvgOutput;
                                                                                                            //# sourceMappingURL=out.js.map

                                                                                                        }, {
                                                                                                            "../utils": 29,
                                                                                                            "./pan-zoom": 20
                                                                                                        }],
                                                                                                    27: [function(require, module, exports) {
                                                                                                            "use strict";

                                                                                                            function _classCallCheck(t, e) {
                                                                                                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                                                                                            }
                                                                                                            var _createClass = function() {
                                                                                                                    function t(t, e) {
                                                                                                                        for (var n = 0; n < e.length; n++) {
                                                                                                                            var i = e[n];
                                                                                                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                                                                                                                        }
                                                                                                                    }
                                                                                                                    return function(e, n, i) {
                                                                                                                        return n && t(e.prototype, n), i && t(e, i), e
                                                                                                                    }
                                                                                                                }(),
                                                                                                                utils = require("../utils"),
                                                                                                                Toast = function() {
                                                                                                                    function t(e, n, i) {
                                                                                                                        var s = this;
                                                                                                                        _classCallCheck(this, t), this.container = utils.strToEl(' < div class = "toast" >
                                                                                                                            < div class = "toast-content" >
                                                                                                                            < /div> < /div>
                                                                                                                            '),this._content=this.container.querySelector(".toast-content"),this._content.textContent=e,this._answerResolve,this._hideTimeout,this.answer=new Promise(function(t){return s._answerResolve=t}),i.forEach(function(t){var e=document.createElement("button");e.className="unbutton",e.textContent=t,e.addEventListener("click",function(e){s._answerResolve(t)}),s.container.appendChild(e)}),n&&(this._hideTimeout=setTimeout(function(t){return s.hide()},n))}return _createClass(t,[{key:"hide",value:function(){return clearTimeout(this._hideTimeout),this._answerResolve(),utils.transitionToClass(this.container,"hide")}}]),t}(),Toasts=function(){function t(){_classCallCheck(this,t),this.container=utils.strToEl(" < div class = 'toasts' >
                                                                                                                            < /div>
                                                                                                                            ")}return _createClass(t,[{key:"
                                                                                                                            show ",value:function(t){var e=this,n=arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], i = n.duration, s = void 0 === i ? 0 : i, o = n.buttons, r = void 0 === o ? ["dismiss"] : o, a = new Toast(t, s, r);
                                                                                                                            return this.container.appendChild(a.container), a.answer.then(function(t) {
                                                                                                                                return a.hide()
                                                                                                                            }).then(function(t) {
                                                                                                                                e.container.removeChild(a.container)
                                                                                                                            }), a
                                                                                                                        }
                                                                                                                    }]), t
                                                                                                    }();
                                                                                                module.exports = Toasts;
                                                                                                //# sourceMappingURL=out.js.map

                                                                                            }, {
                                                                                                "../utils": 29
                                                                                            }], 28: [function(require, module, exports) {
                                                                                                "use strict";

                                                                                                function _classCallCheck(e, t) {
                                                                                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                                }

                                                                                                function _inherits(e, t) {
                                                                                                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                                                                                                    e.prototype = Object.create(t && t.prototype, {
                                                                                                        constructor: {
                                                                                                            value: e,
                                                                                                            enumerable: !1,
                                                                                                            writable: !0,
                                                                                                            configurable: !0
                                                                                                        }
                                                                                                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                                                                                                }
                                                                                                var _createClass = function() {
                                                                                                        function e(e, t) {
                                                                                                            for (var r = 0; r < t.length; r++) {
                                                                                                                var n = t[r];
                                                                                                                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                                                                                                            }
                                                                                                        }
                                                                                                        return function(t, r, n) {
                                                                                                            return r && e(t.prototype, r), n && e(t, n), t
                                                                                                        }
                                                                                                    }(),
                                                                                                    _get = function(e, t, r) {
                                                                                                        for (var n = !0; n;) {
                                                                                                            var o = e,
                                                                                                                i = t,
                                                                                                                u = r;
                                                                                                            c = l = a = void 0, n = !1, null === o && (o = Function.prototype);
                                                                                                            var c = Object.getOwnPropertyDescriptor(o, i);
                                                                                                            if (void 0 !== c) {
                                                                                                                if ("value" in c) return c.value;
                                                                                                                var a = c.get;
                                                                                                                return void 0 === a ? void 0 : a.call(u)
                                                                                                            }
                                                                                                            var l = Object.getPrototypeOf(o);
                                                                                                            if (null === l) return void 0;
                                                                                                            e = l, t = i, r = u, n = !0
                                                                                                        }
                                                                                                    },
                                                                                                    utils = require("../utils"),
                                                                                                    ViewToggler = function(e) {
                                                                                                        function t() {
                                                                                                            var e = this;
                                                                                                            _classCallCheck(this, t), _get(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.container = null, utils.domReady.then(function(t) {
                                                                                                                e.container = document.querySelector(".view-toggler"), e.container.output[0].checked = !0, e.container.addEventListener("change", function(t) {
                                                                                                                    return e._onChange(t)
                                                                                                                })
                                                                                                            })
                                                                                                        }
                                                                                                        return _inherits(t, e), _createClass(t, [{
                                                                                                            key: "_onChange",
                                                                                                            value: function(e) {
                                                                                                                var t = this.container.output.value;
                                                                                                                t || (t = utils.toArray(this.container.output).reduce(function(e, t) {
                                                                                                                    return e || (t.checked ? t.value : "")
                                                                                                                }, "")), this.emit("change", {
                                                                                                                    value: t
                                                                                                                })
                                                                                                            }
                                                                                                        }]), t
                                                                                                    }(require("events").EventEmitter);
                                                                                                module.exports = ViewToggler;
                                                                                                //# sourceMappingURL=out.js.map

                                                                                            }, {
                                                                                                "../utils": 29,
                                                                                                "events": 3
                                                                                            }], 29: [function(require, module, exports) {
                                                                                                    "use strict";

                                                                                                    function transitionClassFunc() {
                                                                                                        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                                                                                                            t = e.removeClass,
                                                                                                            n = void 0 === t ? !1 : t;
                                                                                                        return function(e) {
                                                                                                            var t = arguments.length <= 1 || void 0 === arguments[1] ? "active" : arguments[1],
                                                                                                                r = arguments.length <= 2 || void 0 === arguments[2] ? "transition" : arguments[2];
                                                                                                            if (n) {
                                                                                                                if (!e.classList.contains(t)) return Promise.resolve()
                                                                                                            } else if (e.classList.contains(t)) return Promise.resolve();
                                                                                                            return new Promise(function(s) {
                                                                                                                var o = function i(t) {
                                                                                                                    t.target == e && (e.removeEventListener("webkitTransitionEnd", i), e.removeEventListener("transitionend", i), e.classList.remove(r), s())
                                                                                                                };
                                                                                                                e.classList.add(r), requestAnimationFrame(function(r) {
                                                                                                                    e.addEventListener("webkitTransitionEnd", o), e.addEventListener("transitionend", o), e.classList[n ? "remove" : "add"](t)
                                                                                                                })
                                                                                                            })
                                                                                                        }
                                                                                                    }
                                                                                                    exports.toArray = function(e) {
                                                                                                        return Array.prototype.slice.apply(e)
                                                                                                    }, exports.domReady = new Promise(function(e) {
                                                                                                        function t() {
                                                                                                            "loading" != document.readyState && e()
                                                                                                        }
                                                                                                        document.addEventListener("readystatechange", t), t()
                                                                                                    }), exports.get = function(e) {
                                                                                                        return new Promise(function(t, n) {
                                                                                                            var r = new XMLHttpRequest;
                                                                                                            r.open("GET", e), r.onload = function() {
                                                                                                                200 == r.status ? t(r.response) : n(Error(r.statusText))
                                                                                                            }, r.onerror = function() {
                                                                                                                n(Error("Network Error"))
                                                                                                            }, r.send()
                                                                                                        })
                                                                                                    }, exports.strToEl = function() {
                                                                                                        var e = document.createElement("div");
                                                                                                        return function(t) {
                                                                                                            var n;
                                                                                                            for (e.innerHTML = t, n = e.children[0]; e.firstChild;) e.removeChild(e.firstChild);
                                                                                                            return n
                                                                                                        }
                                                                                                    }();
                                                                                                    var entityMap = {
                                                                                                            "&": "&amp;",
                                                                                                            " < ":" & lt;
                                                                                                            "," >
                                                                                                            ":" & gt;
                                                                                                            ",'"
                                                                                                            ':"&quot;","'
                                                                                                            ":" & #39;","/":"&# x2F;
                                                                                                            "};exports.escapeHtml=function(e){return String(e).replace(/[& < >
                                                                                                            "'\/]/g,function(e){return entityMap[e]})},exports.escapeHtmlTag=function(e){for(var t=arguments.length,n=Array(t>
                                                                                                            1 ? t - 1 : 0),
                                                                                                        r = 1;
                                                                                                    t >
                                                                                                        r;
                                                                                                    r++) n[r - 1] = arguments[r];
                                                                                                return n = n.map(exports.escapeHtml), e.reduce(function(e, t, r) {
                                                                                                    return e += t + (n[r] || "")
                                                                                                }, "")
                                                                                            }, exports.readFileAsText = function(e) {
                                                                                                return new Promise(function(t, n) {
                                                                                                    var r = new FileReader;
                                                                                                    r.readAsText(e), r.onerror = function() {
                                                                                                        n(r.error)
                                                                                                    }, r.onload = function() {
                                                                                                        t(r.result)
                                                                                                    }
                                                                                                })
                                                                                            },
                                                                                            exports.transitionToClass = transitionClassFunc(),
                                                                                            exports.transitionFromClass = transitionClassFunc({
                                                                                                removeClass: !0
                                                                                            }),
                                                                                            exports.closest = function(e, t) {
                                                                                                if (e.closest) return e.closest(t);
                                                                                                var n = e.matches || e.msMatchesSelector;
                                                                                                do
                                                                                                    if (1 == e.nodeType && n.call(e, t)) return e;
                                                                                                while (e = e.parentNode);
                                                                                                return void 0
                                                                                            },
                                                                                            exports.isIe = -1 !== navigator.userAgent.indexOf("Trident/"),
                                                                                            exports.loadCss = function(e) {
                                                                                                return new Promise(function(t, n) {
                                                                                                    var r = document.createElement("link");
                                                                                                    r.rel = "stylesheet", r.href = e, r.addEventListener("load", function(e) {
                                                                                                        return t()
                                                                                                    }), r.addEventListener("error", function(e) {
                                                                                                        return n()
                                                                                                    }), document.head.appendChild(r)
                                                                                                })
                                                                                            };
                                                                                        //# sourceMappingURL=out.js.map

                                                                                    }, {}], 30: [function(require, module, exports) {
                                                                                        "use strict";

                                                                                        function _classCallCheck(e, r) {
                                                                                            if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
                                                                                        }
                                                                                        var _createClass = function() {
                                                                                                function e(e, r) {
                                                                                                    for (var n = 0; n < r.length; n++) {
                                                                                                        var t = r[n];
                                                                                                        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t)
                                                                                                    }
                                                                                                }
                                                                                                return function(r, n, t) {
                                                                                                    return n && e(r.prototype, n), t && e(r, t), r
                                                                                                }
                                                                                            }(),
                                                                                            WorkerMessenger = function() {
                                                                                                function e(r) {
                                                                                                    var n = this;
                                                                                                    _classCallCheck(this, e), this._requestId = 0, this._worker = new Worker(r), this._pending = {}, this._worker.onmessage = function(e) {
                                                                                                        return n._onMessage(e)
                                                                                                    }
                                                                                                }
                                                                                                return _createClass(e, [{
                                                                                                    key: "_onMessage",
                                                                                                    value: function(e) {
                                                                                                        if (!e.data.id) return void console.log("Unexpected message", e);
                                                                                                        var r = this._pending[e.data.id];
                                                                                                        return r ? (delete this._pending[e.data.id], e.data.error ? void r[1](new Error(e.data.error)) : void r[0](e.data.result)) : void console.log("No resolver for", e)
                                                                                                    }
                                                                                                }, {
                                                                                                    key: "_requestResponse",
                                                                                                    value: function(e) {
                                                                                                        var r = this,
                                                                                                            n = ++this._requestId;
                                                                                                        return e.id = n, new Promise(function(t, o) {
                                                                                                            r._pending[n] = [t, o], r._worker.postMessage(e)
                                                                                                        })
                                                                                                    }
                                                                                                }]), e
                                                                                            }();
                                                                                        module.exports = WorkerMessenger;
                                                                                        //# sourceMappingURL=out.js.map

                                                                                    }, {}], 31: [function(require, module, exports) {
                                                                                        "use strict";

                                                                                        function _classCallCheck(e, t) {
                                                                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                                                                        }

                                                                                        function promisifyRequest(e) {
                                                                                            return new Promise(function(t, n) {
                                                                                                function r(n) {
                                                                                                    t(e.result), i()
                                                                                                }

                                                                                                function o(t) {
                                                                                                    n(e.error), i()
                                                                                                }

                                                                                                function i() {
                                                                                                    e.removeEventListener("complete", r), e.removeEventListener("success", r), e.removeEventListener("error", o), e.removeEventListener("abort", o)
                                                                                                }
                                                                                                e.addEventListener("complete", r), e.addEventListener("success", r), e.addEventListener("error", o), e.addEventListener("abort", o)
                                                                                            })
                                                                                        }
                                                                                        var _createClass = function() {
                                                                                                function e(e, t) {
                                                                                                    for (var n = 0; n < t.length; n++) {
                                                                                                        var r = t[n];
                                                                                                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                                                                                                    }
                                                                                                }
                                                                                                return function(t, n, r) {
                                                                                                    return n && e(t.prototype, n), r && e(t, r), t
                                                                                                }
                                                                                            }(),
                                                                                            IndexedDouchebag = function() {
                                                                                                function e(t, n, r) {
                                                                                                    _classCallCheck(this, e);
                                                                                                    var o = indexedDB.open(t, n);
                                                                                                    this.ready = promisifyRequest(o), o.onupgradeneeded = function(e) {
                                                                                                        r(o.result, e.oldVersion)
                                                                                                    }
                                                                                                }
                                                                                                return _createClass(e, [{
                                                                                                    key: "transaction",
                                                                                                    value: function(e, t, n) {
                                                                                                        return this.ready.then(function(r) {
                                                                                                            var o = "readonly";
                                                                                                            t.apply ? n = t : t && (o = t);
                                                                                                            var i, u = r.transaction(e, o),
                                                                                                                a = n(u, r),
                                                                                                                s = promisifyRequest(u);
                                                                                                            return a ? (i = a[0] && "result" in a[0] ? Promise.all(a.map(promisifyRequest)) : promisifyRequest(a), s.then(function() {
                                                                                                                return i
                                                                                                            })) : s
                                                                                                        })
                                                                                                    }
                                                                                                }, {
                                                                                                    key: "get",
                                                                                                    value: function(e, t) {
                                                                                                        return this.transaction(e, function(n) {
                                                                                                            return n.objectStore(e).get(t)
                                                                                                        })
                                                                                                    }
                                                                                                }, {
                                                                                                    key: "put",
                                                                                                    value: function(e, t, n) {
                                                                                                        return this.transaction(e, "readwrite", function(r) {
                                                                                                            r.objectStore(e).put(n, t)
                                                                                                        })
                                                                                                    }
                                                                                                }, {
                                                                                                    key: "delete",
                                                                                                    value: function(e, t) {
                                                                                                        return this.transaction(e, "readwrite", function(n) {
                                                                                                            n.objectStore(e)["delete"](t)
                                                                                                        })
                                                                                                    }
                                                                                                }]), e
                                                                                            }();
                                                                                        module.exports = IndexedDouchebag;
                                                                                        //# sourceMappingURL=out.js.map

                                                                                    }, {}], 32: [function(require, module, exports) {
                                                                                        "use strict";

                                                                                        function getIdb() {
                                                                                            return idb || (idb = new Idb("svgo-keyval", 1, function(e) {
                                                                                                e.createObjectStore("keyval")
                                                                                            })), idb
                                                                                        }
                                                                                        var Idb = require("./indexeddouchbag"),
                                                                                            idb;
                                                                                        self.indexedDB ? module.exports = {
                                                                                            get: function(e) {
                                                                                                return getIdb().get("keyval", e)
                                                                                            },
                                                                                            set: function(e, t) {
                                                                                                return getIdb().put("keyval", e, t)
                                                                                            },
                                                                                            "delete": function(e) {
                                                                                                return getIdb()["delete"]("keyval", e)
                                                                                            }
                                                                                        } : module.exports = {
                                                                                            get: function(e) {
                                                                                                return Promise.resolve(localStorage.getItem(e))
                                                                                            },
                                                                                            set: function(e, t) {
                                                                                                return Promise.resolve(localStorage.setItem(e, t))
                                                                                            },
                                                                                            "delete": function(e) {
                                                                                                return Promise.resolve(localStorage.removeItem(e))
                                                                                            }
                                                                                        };
                                                                                        //# sourceMappingURL=out.js.map

                                                                                    }, {
                                                                                        "./indexeddouchbag": 31
                                                                                    }]
                                                                                },
                                                                                {}, [1])


                                                                        //# sourceMappingURL=page.js.map
