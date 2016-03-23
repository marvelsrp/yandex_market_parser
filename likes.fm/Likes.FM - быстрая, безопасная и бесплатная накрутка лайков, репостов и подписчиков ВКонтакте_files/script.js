var JSON;
if (!JSON) {
  JSON = {}
}
(function () {
  function f(n) {
    return n < 10 ? "0" + n : n
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function (key) {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
      return this.valueOf()
    }
  }
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
  }, rep;

  function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + string + '"'
  }

  function str(key, holder) {
    var i, k, v, length, mind = gap, partial, value = holder[key];
    if (value && typeof value === "object" && typeof value.toJSON === "function") {
      value = value.toJSON(key)
    }
    if (typeof rep === "function") {
      value = rep.call(holder, key, value)
    }
    switch (typeof value) {
      case"string":
        return quote(value);
      case"number":
        return isFinite(value) ? String(value) : "null";
      case"boolean":
      case"null":
        return String(value);
      case"object":
        if (!value) {
          return "null"
        }
        gap += indent;
        partial = [];
        if (Object.prototype.toString.apply(value) === "[object Array]") {
          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null"
          }
          v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
          gap = mind;
          return v
        }
        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v)
              }
            }
          }
        } else {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v)
              }
            }
          }
        }
        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
        gap = mind;
        return v
    }
  }

  if (typeof JSON.stringify !== "function") {
    JSON.stringify = function (value, replacer, space) {
      var i;
      gap = "";
      indent = "";
      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " "
        }
      } else {
        if (typeof space === "string") {
          indent = space
        }
      }
      rep = replacer;
      if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
        throw new Error("JSON.stringify")
      }
      return str("", {"": value})
    }
  }
  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {
      var j;

      function walk(holder, key) {
        var k, v, value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v
              } else {
                delete value[k]
              }
            }
          }
        }
        return reviver.call(holder, key, value)
      }

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })
      }
      if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({"": j}, "") : j
      }
      throw new SyntaxError("JSON.parse")
    }
  }
}());
(function (a, b) {
  function cy(a) {
    return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
  }

  function cu(a) {
    if (!cj[a]) {
      var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
      d.remove();
      if (e === "none" || e === "") {
        ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
        if (!cl || !ck.createElement)cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
        d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
      }
      cj[a] = e
    }
    return cj[a]
  }

  function ct(a, b) {
    var c = {};
    f.each(cp.concat.apply([], cp.slice(0, b)), function () {
      c[this] = a
    });
    return c
  }

  function cs() {
    cq = b
  }

  function cr() {
    setTimeout(cs, 0);
    return cq = f.now()
  }

  function ci() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP")
    } catch (b) {
    }
  }

  function ch() {
    try {
      return new a.XMLHttpRequest
    } catch (b) {
    }
  }

  function cb(a, c) {
    a.dataFilter && (c = a.dataFilter(c, a.dataType));
    var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
    for (g = 1; g < i; g++) {
      if (g === 1)for (h in a.converters)typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
      l = k, k = d[g];
      if (k === "*")k = l; else if (l !== "*" && l !== k) {
        m = l + " " + k, n = e[m] || e["* " + k];
        if (!n) {
          p = b;
          for (o in e) {
            j = o.split(" ");
            if (j[0] === l || j[0] === "*") {
              p = e[j[1] + " " + k];
              if (p) {
                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                break
              }
            }
          }
        }
        !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
      }
    }
    return c
  }

  function ca(a, c, d) {
    var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
    for (i in g)i in d && (c[g[i]] = d[i]);
    while (f[0] === "*")f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
    if (h)for (i in e)if (e[i] && e[i].test(h)) {
      f.unshift(i);
      break
    }
    if (f[0] in d)j = f[0]; else {
      for (i in d) {
        if (!f[0] || a.converters[i + " " + f[0]]) {
          j = i;
          break
        }
        k || (k = i)
      }
      j = j || k
    }
    if (j) {
      j !== f[0] && f.unshift(j);
      return d[j]
    }
  }

  function b_(a, b, c, d) {
    if (f.isArray(b))f.each(b, function (b, e) {
      c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
    }); else if (!c && f.type(b) === "object")for (var e in b)b_(a + "[" + e + "]", b[e], c, d); else d(a, b)
  }

  function b$(a, c) {
    var d, e, g = f.ajaxSettings.flatOptions || {};
    for (d in c)c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
    e && f.extend(!0, a, e)
  }

  function bZ(a, c, d, e, f, g) {
    f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
    var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
    for (; i < j && (k || !l); i++)l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
    (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
    return l
  }

  function bY(a) {
    return function (b, c) {
      typeof b != "string" && (c = b, b = "*");
      if (f.isFunction(c)) {
        var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
        for (; e < g; e++)h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
      }
    }
  }

  function bB(a, b, c) {
    var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
    if (d > 0) {
      if (c !== "border")for (; e < g; e += 2)c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
      return d + "px"
    }
    d = by(a, b);
    if (d < 0 || d == null)d = a.style[b];
    if (bt.test(d))return d;
    d = parseFloat(d) || 0;
    if (c)for (; e < g; e += 2)d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
    return d + "px"
  }

  function bo(a) {
    var b = c.createElement("div");
    bh.appendChild(b), b.innerHTML = a.outerHTML;
    return b.firstChild
  }

  function bn(a) {
    var b = (a.nodeName || "").toLowerCase();
    b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
  }

  function bm(a) {
    if (a.type === "checkbox" || a.type === "radio")a.defaultChecked = a.checked
  }

  function bl(a) {
    return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
  }

  function bk(a, b) {
    var c;
    b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
  }

  function bj(a, b) {
    if (b.nodeType === 1 && !!f.hasData(a)) {
      var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
      if (i) {
        delete h.handle, h.events = {};
        for (c in i)for (d = 0, e = i[c].length; d < e; d++)f.event.add(b, c, i[c][d])
      }
      h.data && (h.data = f.extend({}, h.data))
    }
  }

  function bi(a, b) {
    return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function U(a) {
    var b = V.split("|"), c = a.createDocumentFragment();
    if (c.createElement)while (b.length)c.createElement(b.pop());
    return c
  }

  function T(a, b, c) {
    b = b || 0;
    if (f.isFunction(b))return f.grep(a, function (a, d) {
      var e = !!b.call(a, d, a);
      return e === c
    });
    if (b.nodeType)return f.grep(a, function (a, d) {
      return a === b === c
    });
    if (typeof b == "string") {
      var d = f.grep(a, function (a) {
        return a.nodeType === 1
      });
      if (O.test(b))return f.filter(b, d, !c);
      b = f.filter(b, d)
    }
    return f.grep(a, function (a, d) {
      return f.inArray(a, b) >= 0 === c
    })
  }

  function S(a) {
    return !a || !a.parentNode || a.parentNode.nodeType === 11
  }

  function K() {
    return !0
  }

  function J() {
    return !1
  }

  function n(a, b, c) {
    var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
    h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
      !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
    }, 0)
  }

  function m(a) {
    for (var b in a) {
      if (b === "data" && f.isEmptyObject(a[b]))continue;
      if (b !== "toJSON")return !1
    }
    return !0
  }

  function l(a, c, d) {
    if (d === b && a.nodeType === 1) {
      var e = "data-" + c.replace(k, "-$1").toLowerCase();
      d = a.getAttribute(e);
      if (typeof d == "string") {
        try {
          d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
        } catch (g) {
        }
        f.data(a, c, d)
      } else d = b
    }
    return d
  }

  function h(a) {
    var b = g[a] = {}, c, d;
    a = a.split(/\s+/);
    for (c = 0, d = a.length; c < d; c++)b[a[c]] = !0;
    return b
  }

  var c = a.document, d = a.navigator, e = a.location, f = function () {
    function J() {
      if (!e.isReady) {
        try {
          c.documentElement.doScroll("left")
        } catch (a) {
          setTimeout(J, 1);
          return
        }
        e.ready()
      }
    }

    var e = function (a, b) {
      return new e.fn.init(a, b, h)
    }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
      return (b + "").toUpperCase()
    }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
    e.fn = e.prototype = {
      constructor: e, init: function (a, d, f) {
        var g, h, j, k;
        if (!a)return this;
        if (a.nodeType) {
          this.context = this[0] = a, this.length = 1;
          return this
        }
        if (a === "body" && !d && c.body) {
          this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
          return this
        }
        if (typeof a == "string") {
          a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
          if (g && (g[1] || !d)) {
            if (g[1]) {
              d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
              return e.merge(this, a)
            }
            h = c.getElementById(g[2]);
            if (h && h.parentNode) {
              if (h.id !== g[2])return f.find(a);
              this.length = 1, this[0] = h
            }
            this.context = c, this.selector = a;
            return this
          }
          return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
        }
        if (e.isFunction(a))return f.ready(a);
        a.selector !== b && (this.selector = a.selector, this.context = a.context);
        return e.makeArray(a, this)
      }, selector: "", jquery: "1.7.2", length: 0, size: function () {
        return this.length
      }, toArray: function () {
        return F.call(this, 0)
      }, get: function (a) {
        return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
      }, pushStack: function (a, b, c) {
        var d = this.constructor();
        e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
        return d
      }, each: function (a, b) {
        return e.each(this, a, b)
      }, ready: function (a) {
        e.bindReady(), A.add(a);
        return this
      }, eq: function (a) {
        a = +a;
        return a === -1 ? this.slice(a) : this.slice(a, a + 1)
      }, first: function () {
        return this.eq(0)
      }, last: function () {
        return this.eq(-1)
      }, slice: function () {
        return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
      }, map: function (a) {
        return this.pushStack(e.map(this, function (b, c) {
          return a.call(b, c, b)
        }))
      }, end: function () {
        return this.prevObject || this.constructor(null)
      }, push: E, sort: [].sort, splice: [].splice
    }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
      var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
      typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
      for (; j < k; j++)if ((a = arguments[j]) != null)for (c in a) {
        d = i[c], f = a[c];
        if (i === f)continue;
        l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
      }
      return i
    }, e.extend({
      noConflict: function (b) {
        a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
        return e
      }, isReady: !1, readyWait: 1, holdReady: function (a) {
        a ? e.readyWait++ : e.ready(!0)
      }, ready: function (a) {
        if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
          if (!c.body)return setTimeout(e.ready, 1);
          e.isReady = !0;
          if (a !== !0 && --e.readyWait > 0)return;
          A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
        }
      }, bindReady: function () {
        if (!A) {
          A = e.Callbacks("once memory");
          if (c.readyState === "complete")return setTimeout(e.ready, 1);
          if (c.addEventListener)c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
            var b = !1;
            try {
              b = a.frameElement == null
            } catch (d) {
            }
            c.documentElement.doScroll && b && J()
          }
        }
      }, isFunction: function (a) {
        return e.type(a) === "function"
      }, isArray: Array.isArray || function (a) {
        return e.type(a) === "array"
      }, isWindow: function (a) {
        return a != null && a == a.window
      }, isNumeric: function (a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
      }, type: function (a) {
        return a == null ? String(a) : I[C.call(a)] || "object"
      }, isPlainObject: function (a) {
        if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a))return !1;
        try {
          if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf"))return !1
        } catch (c) {
          return !1
        }
        var d;
        for (d in a);
        return d === b || D.call(a, d)
      }, isEmptyObject: function (a) {
        for (var b in a)return !1;
        return !0
      }, error: function (a) {
        throw new Error(a)
      }, parseJSON: function (b) {
        if (typeof b != "string" || !b)return null;
        b = e.trim(b);
        if (a.JSON && a.JSON.parse)return a.JSON.parse(b);
        if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))return (new Function("return " + b))();
        e.error("Invalid JSON: " + b)
      }, parseXML: function (c) {
        if (typeof c != "string" || !c)return null;
        var d, f;
        try {
          a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
        } catch (g) {
          d = b
        }
        (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
        return d
      }, noop: function () {
      }, globalEval: function (b) {
        b && j.test(b) && (a.execScript || function (b) {
          a.eval.call(a, b)
        })(b)
      }, camelCase: function (a) {
        return a.replace(w, "ms-").replace(v, x)
      }, nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
      }, each: function (a, c, d) {
        var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
        if (d) {
          if (i) {
            for (f in a)if (c.apply(a[f], d) === !1)break
          } else for (; g < h;)if (c.apply(a[g++], d) === !1)break
        } else if (i) {
          for (f in a)if (c.call(a[f], f, a[f]) === !1)break
        } else for (; g < h;)if (c.call(a[g], g, a[g++]) === !1)break;
        return a
      }, trim: G ? function (a) {
        return a == null ? "" : G.call(a)
      } : function (a) {
        return a == null ? "" : (a + "").replace(k, "").replace(l, "")
      }, makeArray: function (a, b) {
        var c = b || [];
        if (a != null) {
          var d = e.type(a);
          a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
        }
        return c
      }, inArray: function (a, b, c) {
        var d;
        if (b) {
          if (H)return H.call(b, a, c);
          d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
          for (; c < d; c++)if (c in b && b[c] === a)return c
        }
        return -1
      }, merge: function (a, c) {
        var d = a.length, e = 0;
        if (typeof c.length == "number")for (var f = c.length; e < f; e++)a[d++] = c[e]; else while (c[e] !== b)a[d++] = c[e++];
        a.length = d;
        return a
      }, grep: function (a, b, c) {
        var d = [], e;
        c = !!c;
        for (var f = 0, g = a.length; f < g; f++)e = !!b(a[f], f), c !== e && d.push(a[f]);
        return d
      }, map: function (a, c, d) {
        var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
        if (k)for (; i < j; i++)f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a)f = c(a[g], g, d), f != null && (h[h.length] = f);
        return h.concat.apply([], h)
      }, guid: 1, proxy: function (a, c) {
        if (typeof c == "string") {
          var d = a[c];
          c = a, a = d
        }
        if (!e.isFunction(a))return b;
        var f = F.call(arguments, 2), g = function () {
          return a.apply(c, f.concat(F.call(arguments)))
        };
        g.guid = a.guid = a.guid || g.guid || e.guid++;
        return g
      }, access: function (a, c, d, f, g, h, i) {
        var j, k = d == null, l = 0, m = a.length;
        if (d && typeof d == "object") {
          for (l in d)e.access(a, c, l, d[l], 1, h, f);
          g = 1
        } else if (f !== b) {
          j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
            return j.call(e(a), c)
          }) : (c.call(a, f), c = null));
          if (c)for (; l < m; l++)c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
          g = 1
        }
        return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
      }, now: function () {
        return (new Date).getTime()
      }, uaMatch: function (a) {
        a = a.toLowerCase();
        var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
        return {browser: b[1] || "", version: b[2] || "0"}
      }, sub: function () {
        function a(b, c) {
          return new a.fn.init(b, c)
        }

        e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
          f && f instanceof e && !(f instanceof a) && (f = a(f));
          return e.fn.init.call(this, d, f, b)
        }, a.fn.init.prototype = a.fn;
        var b = a(c);
        return a
      }, browser: {}
    }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
      I["[object " + b + "]"] = b.toLowerCase()
    }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
      c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
    } : c.attachEvent && (B = function () {
      c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
    });
    return e
  }(), g = {};
  f.Callbacks = function (a) {
    a = a ? g[a] || h(a) : {};
    var c = [], d = [], e, i, j, k, l, m, n = function (b) {
      var d, e, g, h, i;
      for (d = 0, e = b.length; d < e; d++)g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
    }, o = function (b, f) {
      f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
      for (; c && m < l; m++)if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
        e = !0;
        break
      }
      j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
    }, p = {
      add: function () {
        if (c) {
          var a = c.length;
          n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
        }
        return this
      }, remove: function () {
        if (c) {
          var b = arguments, d = 0, e = b.length;
          for (; d < e; d++)for (var f = 0; f < c.length; f++)if (b[d] === c[f]) {
            j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
            if (a.unique)break
          }
        }
        return this
      }, has: function (a) {
        if (c) {
          var b = 0, d = c.length;
          for (; b < d; b++)if (a === c[b])return !0
        }
        return !1
      }, empty: function () {
        c = [];
        return this
      }, disable: function () {
        c = d = e = b;
        return this
      }, disabled: function () {
        return !c
      }, lock: function () {
        d = b, (!e || e === !0) && p.disable();
        return this
      }, locked: function () {
        return !d
      }, fireWith: function (b, c) {
        d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
        return this
      }, fire: function () {
        p.fireWith(this, arguments);
        return this
      }, fired: function () {
        return !!i
      }
    };
    return p
  };
  var i = [].slice;
  f.extend({
    Deferred: function (a) {
      var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
        resolve: b,
        reject: c,
        notify: d
      }, h = {
        done: b.add, fail: c.add, progress: d.add, state: function () {
          return e
        }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
          i.done(a).fail(b).progress(c);
          return this
        }, always: function () {
          i.done.apply(i, arguments).fail.apply(i, arguments);
          return this
        }, pipe: function (a, b, c) {
          return f.Deferred(function (d) {
            f.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
              var c = b[0], e = b[1], g;
              f.isFunction(c) ? i[a](function () {
                g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
              }) : i[a](d[e])
            })
          }).promise()
        }, promise: function (a) {
          if (a == null)a = h; else for (var b in h)a[b] = h[b];
          return a
        }
      }, i = h.promise({}), j;
      for (j in g)i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
      i.done(function () {
        e = "resolved"
      }, c.disable, d.lock).fail(function () {
        e = "rejected"
      }, b.disable, d.lock), a && a.call(i, i);
      return i
    }, when: function (a) {
      function m(a) {
        return function (b) {
          e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
        }
      }

      function l(a) {
        return function (c) {
          b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
        }
      }

      var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
      if (d > 1) {
        for (; c < d; c++)b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
        g || j.resolveWith(j, b)
      } else j !== a && j.resolveWith(j, d ? [a] : []);
      return k
    }
  }), f.support = function () {
    var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
    p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
    if (!d || !d.length || !e)return {};
    g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
      leadingWhitespace: p.firstChild.nodeType === 3,
      tbody: !p.getElementsByTagName("tbody").length,
      htmlSerialize: !!p.getElementsByTagName("link").length,
      style: /top/.test(e.getAttribute("style")),
      hrefNormalized: e.getAttribute("href") === "/a",
      opacity: /^0.55/.test(e.style.opacity),
      cssFloat: !!e.style.cssFloat,
      checkOn: i.value === "on",
      optSelected: h.selected,
      getSetAttribute: p.className !== "t",
      enctype: !!c.createElement("form").enctype,
      html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
      submitBubbles: !0,
      changeBubbles: !0,
      focusinBubbles: !1,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      pixelMargin: !0
    }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
    try {
      delete p.test
    } catch (r) {
      b.deleteExpando = !1
    }
    !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
      b.noCloneEvent = !1
    }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
    if (p.attachEvent)for (n in{
      submit: 1,
      change: 1,
      focusin: 1
    })m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
    j.removeChild(p), j = g = h = p = i = null, f(function () {
      var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
      !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {marginRight: 0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
        doesNotAddBorder: g.offsetTop !== 5,
        doesAddBorderForTableAndCells: i.offsetTop === 5
      }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {marginTop: 0}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
    });
    return b
  }();
  var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
  f.extend({
    cache: {},
    uuid: 0,
    expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
    hasData: function (a) {
      a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
      return !!a && !m(a)
    },
    data: function (a, c, d, e) {
      if (!!f.acceptData(a)) {
        var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
        if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)return;
        n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
        if (typeof c == "object" || typeof c == "function")e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
        g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
        if (o && !h[c])return g.events;
        k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
        return i
      }
    },
    removeData: function (a, b, c) {
      if (!!f.acceptData(a)) {
        var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
        if (!j[k])return;
        if (b) {
          d = c ? j[k] : j[k].data;
          if (d) {
            f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
            for (e = 0, g = b.length; e < g; e++)delete d[b[e]];
            if (!(c ? m : f.isEmptyObject)(d))return
          }
        }
        if (!c) {
          delete j[k].data;
          if (!m(j[k]))return
        }
        f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
      }
    },
    _data: function (a, b, c) {
      return f.data(a, b, c, !0)
    },
    acceptData: function (a) {
      if (a.nodeName) {
        var b = f.noData[a.nodeName.toLowerCase()];
        if (b)return b !== !0 && a.getAttribute("classid") === b
      }
      return !0
    }
  }), f.fn.extend({
    data: function (a, c) {
      var d, e, g, h, i, j = this[0], k = 0, m = null;
      if (a === b) {
        if (this.length) {
          m = f.data(j);
          if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
            g = j.attributes;
            for (i = g.length; k < i; k++)h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
            f._data(j, "parsedAttrs", !0)
          }
        }
        return m
      }
      if (typeof a == "object")return this.each(function () {
        f.data(this, a)
      });
      d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
      return f.access(this, function (c) {
        if (c === b) {
          m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
          return m === b && d[1] ? this.data(d[0]) : m
        }
        d[1] = c, this.each(function () {
          var b = f(this);
          b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
        })
      }, null, c, arguments.length > 1, null, !1)
    }, removeData: function (a) {
      return this.each(function () {
        f.removeData(this, a)
      })
    }
  }), f.extend({
    _mark: function (a, b) {
      a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
    }, _unmark: function (a, b, c) {
      a !== !0 && (c = b, b = a, a = !1);
      if (b) {
        c = c || "fx";
        var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
        e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
      }
    }, queue: function (a, b, c) {
      var d;
      if (a) {
        b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
        return d || []
      }
    }, dequeue: function (a, b) {
      b = b || "fx";
      var c = f.queue(a, b), d = c.shift(), e = {};
      d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
        f.dequeue(a, b)
      }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
    }
  }), f.fn.extend({
    queue: function (a, c) {
      var d = 2;
      typeof a != "string" && (c = a, a = "fx", d--);
      if (arguments.length < d)return f.queue(this[0], a);
      return c === b ? this : this.each(function () {
        var b = f.queue(this, a, c);
        a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
      })
    }, dequeue: function (a) {
      return this.each(function () {
        f.dequeue(this, a)
      })
    }, delay: function (a, b) {
      a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
      return this.queue(b, function (b, c) {
        var d = setTimeout(b, a);
        c.stop = function () {
          clearTimeout(d)
        }
      })
    }, clearQueue: function (a) {
      return this.queue(a || "fx", [])
    }, promise: function (a, c) {
      function m() {
        --h || d.resolveWith(e, [e])
      }

      typeof a != "string" && (c = a, a = b), a = a || "fx";
      var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
      while (g--)if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0))h++, l.add(m);
      m();
      return d.promise(c)
    }
  });
  var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
  f.fn.extend({
    attr: function (a, b) {
      return f.access(this, f.attr, a, b, arguments.length > 1)
    }, removeAttr: function (a) {
      return this.each(function () {
        f.removeAttr(this, a)
      })
    }, prop: function (a, b) {
      return f.access(this, f.prop, a, b, arguments.length > 1)
    }, removeProp: function (a) {
      a = f.propFix[a] || a;
      return this.each(function () {
        try {
          this[a] = b, delete this[a]
        } catch (c) {
        }
      })
    }, addClass: function (a) {
      var b, c, d, e, g, h, i;
      if (f.isFunction(a))return this.each(function (b) {
        f(this).addClass(a.call(this, b, this.className))
      });
      if (a && typeof a == "string") {
        b = a.split(p);
        for (c = 0, d = this.length; c < d; c++) {
          e = this[c];
          if (e.nodeType === 1)if (!e.className && b.length === 1)e.className = a; else {
            g = " " + e.className + " ";
            for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
            e.className = f.trim(g)
          }
        }
      }
      return this
    }, removeClass: function (a) {
      var c, d, e, g, h, i, j;
      if (f.isFunction(a))return this.each(function (b) {
        f(this).removeClass(a.call(this, b, this.className))
      });
      if (a && typeof a == "string" || a === b) {
        c = (a || "").split(p);
        for (d = 0, e = this.length; d < e; d++) {
          g = this[d];
          if (g.nodeType === 1 && g.className)if (a) {
            h = (" " + g.className + " ").replace(o, " ");
            for (i = 0, j = c.length; i < j; i++)h = h.replace(" " + c[i] + " ", " ");
            g.className = f.trim(h)
          } else g.className = ""
        }
      }
      return this
    }, toggleClass: function (a, b) {
      var c = typeof a, d = typeof b == "boolean";
      if (f.isFunction(a))return this.each(function (c) {
        f(this).toggleClass(a.call(this, c, this.className, b), b)
      });
      return this.each(function () {
        if (c === "string") {
          var e, g = 0, h = f(this), i = b, j = a.split(p);
          while (e = j[g++])i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
        } else if (c === "undefined" || c === "boolean")this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
      })
    }, hasClass: function (a) {
      var b = " " + a + " ", c = 0, d = this.length;
      for (; c < d; c++)if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1)return !0;
      return !1
    }, val: function (a) {
      var c, d, e, g = this[0];
      {
        if (!!arguments.length) {
          e = f.isFunction(a);
          return this.each(function (d) {
            var g = f(this), h;
            if (this.nodeType === 1) {
              e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                return a == null ? "" : a + ""
              })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
              if (!c || !("set" in c) || c.set(this, h, "value") === b)this.value = h
            }
          })
        }
        if (g) {
          c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
          if (c && "get" in c && (d = c.get(g, "value")) !== b)return d;
          d = g.value;
          return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
        }
      }
    }
  }), f.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text
        }
      }, select: {
        get: function (a) {
          var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
          if (g < 0)return null;
          c = j ? g : 0, d = j ? g + 1 : i.length;
          for (; c < d; c++) {
            e = i[c];
            if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
              b = f(e).val();
              if (j)return b;
              h.push(b)
            }
          }
          if (j && !h.length && i.length)return f(i[g]).val();
          return h
        }, set: function (a, b) {
          var c = f.makeArray(b);
          f(a).find("option").each(function () {
            this.selected = f.inArray(f(this).val(), c) >= 0
          }), c.length || (a.selectedIndex = -1);
          return c
        }
      }
    },
    attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
    attr: function (a, c, d, e) {
      var g, h, i, j = a.nodeType;
      if (!!a && j !== 3 && j !== 8 && j !== 2) {
        if (e && c in f.attrFn)return f(a)[c](d);
        if (typeof a.getAttribute == "undefined")return f.prop(a, c, d);
        i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
        if (d !== b) {
          if (d === null) {
            f.removeAttr(a, c);
            return
          }
          if (h && "set" in h && i && (g = h.set(a, d, c)) !== b)return g;
          a.setAttribute(c, "" + d);
          return d
        }
        if (h && "get" in h && i && (g = h.get(a, c)) !== null)return g;
        g = a.getAttribute(c);
        return g === null ? b : g
      }
    },
    removeAttr: function (a, b) {
      var c, d, e, g, h, i = 0;
      if (b && a.nodeType === 1) {
        d = b.toLowerCase().split(p), g = d.length;
        for (; i < g; i++)e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
      }
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (r.test(a.nodeName) && a.parentNode)f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
            var c = a.value;
            a.setAttribute("type", b), c && (a.value = c);
            return b
          }
        }
      }, value: {
        get: function (a, b) {
          if (w && f.nodeName(a, "button"))return w.get(a, b);
          return b in a ? a.value : null
        }, set: function (a, b, c) {
          if (w && f.nodeName(a, "button"))return w.set(a, b, c);
          a.value = b
        }
      }
    },
    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
    prop: function (a, c, d) {
      var e, g, h, i = a.nodeType;
      if (!!a && i !== 3 && i !== 8 && i !== 2) {
        h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
        return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
      }
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var c = a.getAttributeNode("tabindex");
          return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
        }
      }
    }
  }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
    get: function (a, c) {
      var d, e = f.prop(a, c);
      return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
    }, set: function (a, b, c) {
      var d;
      b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
      return c
    }
  }, v || (y = {name: !0, id: !0, coords: !0}, w = f.valHooks.button = {
    get: function (a, c) {
      var d;
      d = a.getAttributeNode(c);
      return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
    }, set: function (a, b, d) {
      var e = a.getAttributeNode(d);
      e || (e = c.createAttribute(d), a.setAttributeNode(e));
      return e.nodeValue = b + ""
    }
  }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
    f.attrHooks[b] = f.extend(f.attrHooks[b], {
      set: function (a, c) {
        if (c === "") {
          a.setAttribute(b, "auto");
          return c
        }
      }
    })
  }), f.attrHooks.contenteditable = {
    get: w.get, set: function (a, b, c) {
      b === "" && (b = "false"), w.set(a, b, c)
    }
  }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
    f.attrHooks[c] = f.extend(f.attrHooks[c], {
      get: function (a) {
        var d = a.getAttribute(c, 2);
        return d === null ? b : d
      }
    })
  }), f.support.style || (f.attrHooks.style = {
    get: function (a) {
      return a.style.cssText.toLowerCase() || b
    }, set: function (a, b) {
      return a.style.cssText = "" + b
    }
  }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
    get: function (a) {
      var b = a.parentNode;
      b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
      return null
    }
  })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
    f.valHooks[this] = {
      get: function (a) {
        return a.getAttribute("value") === null ? "on" : a.value
      }
    }
  }), f.each(["radio", "checkbox"], function () {
    f.valHooks[this] = f.extend(f.valHooks[this], {
      set: function (a, b) {
        if (f.isArray(b))return a.checked = f.inArray(f(a).val(), b) >= 0
      }
    })
  });
  var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
    var b = F.exec(a);
    b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
    return b
  }, H = function (a, b) {
    var c = a.attributes || {};
    return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
  }, I = function (a) {
    return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
  };
  f.event = {
    add: function (a, c, d, e, g) {
      var h, i, j, k, l, m, n, o, p, q, r, s;
      if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
        d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
          return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
        }, i.elem = a), c = f.trim(I(c)).split(" ");
        for (k = 0; k < c.length; k++) {
          l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
            type: m,
            origType: l[1],
            data: e,
            handler: d,
            guid: d.guid,
            selector: g,
            quick: g && G(g),
            namespace: n.join(".")
          }, p), r = j[m];
          if (!r) {
            r = j[m] = [], r.delegateCount = 0;
            if (!s.setup || s.setup.call(a, e, n, i) === !1)a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
          }
          s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
        }
        a = null
      }
    },
    global: {},
    remove: function (a, b, c, d, e) {
      var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
      if (!!g && !!(o = g.events)) {
        b = f.trim(I(b || "")).split(" ");
        for (h = 0; h < b.length; h++) {
          i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
          if (!j) {
            for (j in o)f.event.remove(a, j + b[h], c, d, !0);
            continue
          }
          p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
          for (n = 0; n < r.length; n++)s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
          r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
        }
        f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
      }
    },
    customEvent: {getData: !0, setData: !0, changeData: !0},
    trigger: function (c, d, e, g) {
      if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
        var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
        if (E.test(h + f.event.triggered))return;
        h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
        if ((!e || f.event.customEvent[h]) && !f.event.global[h])return;
        c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
        if (!e) {
          j = f.cache;
          for (l in j)j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
          return
        }
        c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
        if (p.trigger && p.trigger.apply(e, d) === !1)return;
        r = [[e, p.bindType || h]];
        if (!g && !p.noBubble && !f.isWindow(e)) {
          s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
          for (; m; m = m.parentNode)r.push([m, s]), n = m;
          n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
        }
        for (l = 0; l < r.length && !c.isPropagationStopped(); l++)m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
        c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
        return c.result
      }
    },
    dispatch: function (c) {
      c = f.event.fix(c || a.event);
      var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
      g[0] = c, c.delegateTarget = this;
      if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
        if (e && (!c.button || c.type !== "click")) {
          n = f(this), n.context = this.ownerDocument || this;
          for (m = c.target; m != this; m = m.parentNode || this)if (m.disabled !== !0) {
            p = {}, r = [], n[0] = m;
            for (k = 0; k < e; k++)s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
            r.length && j.push({elem: m, matches: r})
          }
        }
        d.length > e && j.push({elem: this, matches: d.slice(e)});
        for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
          q = j[k], c.currentTarget = q.elem;
          for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
            s = q.matches[l];
            if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace))c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
          }
        }
        i.postDispatch && i.postDispatch.call(this, c);
        return c.result
      }
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "), filter: function (a, b) {
        a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
        return a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (a, d) {
        var e, f, g, h = d.button, i = d.fromElement;
        a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
        return a
      }
    },
    fix: function (a) {
      if (a[f.expando])return a;
      var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
      a = f.Event(g);
      for (d = i.length; d;)e = i[--d], a[e] = g[e];
      a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
      return h.filter ? h.filter(a, g) : a
    },
    special: {
      ready: {setup: f.bindReady},
      load: {noBubble: !0},
      focus: {delegateType: "focusin"},
      blur: {delegateType: "focusout"},
      beforeunload: {
        setup: function (a, b, c) {
          f.isWindow(this) && (this.onbeforeunload = c)
        }, teardown: function (a, b) {
          this.onbeforeunload === b && (this.onbeforeunload = null)
        }
      }
    },
    simulate: function (a, b, c, d) {
      var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
      d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }
  }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1)
  } : function (a, b, c) {
    a.detachEvent && a.detachEvent("on" + b, c)
  }, f.Event = function (a, b) {
    if (!(this instanceof f.Event))return new f.Event(a, b);
    a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
  }, f.Event.prototype = {
    preventDefault: function () {
      this.isDefaultPrevented = K;
      var a = this.originalEvent;
      !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    }, stopPropagation: function () {
      this.isPropagationStopped = K;
      var a = this.originalEvent;
      !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = K, this.stopPropagation()
    }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J
  }, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
    f.event.special[a] = {
      delegateType: b, bindType: b, handle: function (a) {
        var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
        if (!d || d !== c && !f.contains(c, d))a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
        return h
      }
    }
  }), f.support.submitBubbles || (f.event.special.submit = {
    setup: function () {
      if (f.nodeName(this, "form"))return !1;
      f.event.add(this, "click._submit keypress._submit", function (a) {
        var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
        d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
          a._submit_bubble = !0
        }), d._submit_attached = !0)
      })
    }, postDispatch: function (a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
    }, teardown: function () {
      if (f.nodeName(this, "form"))return !1;
      f.event.remove(this, "._submit")
    }
  }), f.support.changeBubbles || (f.event.special.change = {
    setup: function () {
      if (z.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio")f.event.add(this, "propertychange._change", function (a) {
          a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
        }), f.event.add(this, "click._change", function (a) {
          this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
        });
        return !1
      }
      f.event.add(this, "beforeactivate._change", function (a) {
        var b = a.target;
        z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
          this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
        }), b._change_attached = !0)
      })
    }, handle: function (a) {
      var b = a.target;
      if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")return a.handleObj.handler.apply(this, arguments)
    }, teardown: function () {
      f.event.remove(this, "._change");
      return z.test(this.nodeName)
    }
  }), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
    var d = 0, e = function (a) {
      f.event.simulate(b, a.target, f.event.fix(a), !0)
    };
    f.event.special[b] = {
      setup: function () {
        d++ === 0 && c.addEventListener(a, e, !0)
      }, teardown: function () {
        --d === 0 && c.removeEventListener(a, e, !0)
      }
    }
  }), f.fn.extend({
    on: function (a, c, d, e, g) {
      var h, i;
      if (typeof a == "object") {
        typeof c != "string" && (d = d || c, c = b);
        for (i in a)this.on(i, c, d, a[i], g);
        return this
      }
      d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
      if (e === !1)e = J; else if (!e)return this;
      g === 1 && (h = e, e = function (a) {
        f().off(a);
        return h.apply(this, arguments)
      }, e.guid = h.guid || (h.guid = f.guid++));
      return this.each(function () {
        f.event.add(this, a, e, d, c)
      })
    }, one: function (a, b, c, d) {
      return this.on(a, b, c, d, 1)
    }, off: function (a, c, d) {
      if (a && a.preventDefault && a.handleObj) {
        var e = a.handleObj;
        f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
        return this
      }
      if (typeof a == "object") {
        for (var g in a)this.off(g, c, a[g]);
        return this
      }
      if (c === !1 || typeof c == "function")d = c, c = b;
      d === !1 && (d = J);
      return this.each(function () {
        f.event.remove(this, a, d, c)
      })
    }, bind: function (a, b, c) {
      return this.on(a, null, b, c)
    }, unbind: function (a, b) {
      return this.off(a, null, b)
    }, live: function (a, b, c) {
      f(this.context).on(a, this.selector, b, c);
      return this
    }, die: function (a, b) {
      f(this.context).off(a, this.selector || "**", b);
      return this
    }, delegate: function (a, b, c, d) {
      return this.on(b, a, c, d)
    }, undelegate: function (a, b, c) {
      return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
    }, trigger: function (a, b) {
      return this.each(function () {
        f.event.trigger(a, b, this)
      })
    }, triggerHandler: function (a, b) {
      if (this[0])return f.event.trigger(a, b, this[0], !0)
    }, toggle: function (a) {
      var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
        var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
        f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
        return b[e].apply(this, arguments) || !1
      };
      e.guid = c;
      while (d < b.length)b[d++].guid = c;
      return this.click(e)
    }, hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    }
  }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    f.fn[b] = function (a, c) {
      c == null && (c = a, a = null);
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
  }), function () {
    function x(a, b, c, e, f, g) {
      for (var h = 0, i = e.length; h < i; h++) {
        var j = e[h];
        if (j) {
          var k = !1;
          j = j[a];
          while (j) {
            if (j[d] === c) {
              k = e[j.sizset];
              break
            }
            if (j.nodeType === 1) {
              g || (j[d] = c, j.sizset = h);
              if (typeof b != "string") {
                if (j === b) {
                  k = !0;
                  break
                }
              } else if (m.filter(b, [j]).length > 0) {
                k = j;
                break
              }
            }
            j = j[a]
          }
          e[h] = k
        }
      }
    }

    function w(a, b, c, e, f, g) {
      for (var h = 0, i = e.length; h < i; h++) {
        var j = e[h];
        if (j) {
          var k = !1;
          j = j[a];
          while (j) {
            if (j[d] === c) {
              k = e[j.sizset];
              break
            }
            j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
            if (j.nodeName.toLowerCase() === b) {
              k = j;
              break
            }
            j = j[a]
          }
          e[h] = k
        }
      }
    }

    var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
    [0, 0].sort(function () {
      i = !1;
      return 0
    });
    var m = function (b, d, e, f) {
      e = e || [], d = d || c;
      var h = d;
      if (d.nodeType !== 1 && d.nodeType !== 9)return [];
      if (!b || typeof b != "string")return e;
      var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
      do {
        a.exec(""), i = a.exec(x);
        if (i) {
          x = i[3], w.push(i[1]);
          if (i[2]) {
            l = i[3];
            break
          }
        }
      } while (i);
      if (w.length > 1 && p.exec(b))if (w.length === 2 && o.relative[w[0]])j = y(w[0] + w[1], d, f); else {
        j = o.relative[w[0]] ? [d] : m(w.shift(), d);
        while (w.length)b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
      } else {
        !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
        if (d) {
          n = f ? {
            expr: w.pop(),
            set: s(f)
          } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
          while (w.length)q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
        } else k = w = []
      }
      k || (k = j), k || m.error(q || b);
      if (g.call(k) === "[object Array]")if (!u)e.push.apply(e, k); else if (d && d.nodeType === 1)for (t = 0; k[t] != null; t++)k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++)k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
      l && (m(l, h, e, f), m.uniqueSort(e));
      return e
    };
    m.uniqueSort = function (a) {
      if (u) {
        h = i, a.sort(u);
        if (h)for (var b = 1; b < a.length; b++)a[b] === a[b - 1] && a.splice(b--, 1)
      }
      return a
    }, m.matches = function (a, b) {
      return m(a, null, null, b)
    }, m.matchesSelector = function (a, b) {
      return m(b, null, null, [a]).length > 0
    }, m.find = function (a, b, c) {
      var d, e, f, g, h, i;
      if (!a)return [];
      for (e = 0, f = o.order.length; e < f; e++) {
        h = o.order[e];
        if (g = o.leftMatch[h].exec(a)) {
          i = g[1], g.splice(1, 1);
          if (i.substr(i.length - 1) !== "\\") {
            g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
            if (d != null) {
              a = a.replace(o.match[h], "");
              break
            }
          }
        }
      }
      d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
      return {set: d, expr: a}
    }, m.filter = function (a, c, d, e) {
      var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
      while (a && c.length) {
        for (h in o.filter)if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
          k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
          if (l.substr(l.length - 1) === "\\")continue;
          s === r && (r = []);
          if (o.preFilter[h]) {
            f = o.preFilter[h](f, s, d, r, e, t);
            if (!f)g = i = !0; else if (f === !0)continue
          }
          if (f)for (n = 0; (j = s[n]) != null; n++)j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
          if (i !== b) {
            d || (s = r), a = a.replace(o.match[h], "");
            if (!g)return [];
            break
          }
        }
        if (a === q)if (g == null)m.error(a); else break;
        q = a
      }
      return s
    }, m.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    };
    var n = m.getText = function (a) {
      var b, c, d = a.nodeType, e = "";
      if (d) {
        if (d === 1 || d === 9 || d === 11) {
          if (typeof a.textContent == "string")return a.textContent;
          if (typeof a.innerText == "string")return a.innerText.replace(k, "");
          for (a = a.firstChild; a; a = a.nextSibling)e += n(a)
        } else if (d === 3 || d === 4)return a.nodeValue
      } else for (b = 0; c = a[b]; b++)c.nodeType !== 8 && (e += n(c));
      return e
    }, o = m.selectors = {
      order: ["ID", "NAME", "TAG"],
      match: {
        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
      },
      leftMatch: {},
      attrMap: {"class": "className", "for": "htmlFor"},
      attrHandle: {
        href: function (a) {
          return a.getAttribute("href")
        }, type: function (a) {
          return a.getAttribute("type")
        }
      },
      relative: {
        "+": function (a, b) {
          var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
          d && (b = b.toLowerCase());
          for (var f = 0, g = a.length, h; f < g; f++)if (h = a[f]) {
            while ((h = h.previousSibling) && h.nodeType !== 1);
            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
          }
          e && m.filter(b, a, !0)
        }, ">": function (a, b) {
          var c, d = typeof b == "string", e = 0, f = a.length;
          if (d && !l.test(b)) {
            b = b.toLowerCase();
            for (; e < f; e++) {
              c = a[e];
              if (c) {
                var g = c.parentNode;
                a[e] = g.nodeName.toLowerCase() === b ? g : !1
              }
            }
          } else {
            for (; e < f; e++)c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
            d && m.filter(b, a, !0)
          }
        }, "": function (a, b, c) {
          var d, f = e++, g = x;
          typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
        }, "~": function (a, b, c) {
          var d, f = e++, g = x;
          typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
        }
      },
      find: {
        ID: function (a, b, c) {
          if (typeof b.getElementById != "undefined" && !c) {
            var d = b.getElementById(a[1]);
            return d && d.parentNode ? [d] : []
          }
        }, NAME: function (a, b) {
          if (typeof b.getElementsByName != "undefined") {
            var c = [], d = b.getElementsByName(a[1]);
            for (var e = 0, f = d.length; e < f; e++)d[e].getAttribute("name") === a[1] && c.push(d[e]);
            return c.length === 0 ? null : c
          }
        }, TAG: function (a, b) {
          if (typeof b.getElementsByTagName != "undefined")return b.getElementsByTagName(a[1])
        }
      },
      preFilter: {
        CLASS: function (a, b, c, d, e, f) {
          a = " " + a[1].replace(j, "") + " ";
          if (f)return a;
          for (var g = 0, h; (h = b[g]) != null; g++)h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
          return !1
        }, ID: function (a) {
          return a[1].replace(j, "")
        }, TAG: function (a, b) {
          return a[1].replace(j, "").toLowerCase()
        }, CHILD: function (a) {
          if (a[1] === "nth") {
            a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
            var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
            a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
          } else a[2] && m.error(a[0]);
          a[0] = e++;
          return a
        }, ATTR: function (a, b, c, d, e, f) {
          var g = a[1] = a[1].replace(j, "");
          !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
          return a
        }, PSEUDO: function (b, c, d, e, f) {
          if (b[1] === "not")if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))b[3] = m(b[3], null, null, c); else {
            var g = m.filter(b[3], c, d, !0 ^ f);
            d || e.push.apply(e, g);
            return !1
          } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))return !0;
          return b
        }, POS: function (a) {
          a.unshift(!0);
          return a
        }
      },
      filters: {
        enabled: function (a) {
          return a.disabled === !1 && a.type !== "hidden"
        }, disabled: function (a) {
          return a.disabled === !0
        }, checked: function (a) {
          return a.checked === !0
        }, selected: function (a) {
          a.parentNode && a.parentNode.selectedIndex;
          return a.selected === !0
        }, parent: function (a) {
          return !!a.firstChild
        }, empty: function (a) {
          return !a.firstChild
        }, has: function (a, b, c) {
          return !!m(c[3], a).length
        }, header: function (a) {
          return /h\d/i.test(a.nodeName)
        }, text: function (a) {
          var b = a.getAttribute("type"), c = a.type;
          return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
        }, radio: function (a) {
          return a.nodeName.toLowerCase() === "input" && "radio" === a.type
        }, checkbox: function (a) {
          return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
        }, file: function (a) {
          return a.nodeName.toLowerCase() === "input" && "file" === a.type
        }, password: function (a) {
          return a.nodeName.toLowerCase() === "input" && "password" === a.type
        }, submit: function (a) {
          var b = a.nodeName.toLowerCase();
          return (b === "input" || b === "button") && "submit" === a.type
        }, image: function (a) {
          return a.nodeName.toLowerCase() === "input" && "image" === a.type
        }, reset: function (a) {
          var b = a.nodeName.toLowerCase();
          return (b === "input" || b === "button") && "reset" === a.type
        }, button: function (a) {
          var b = a.nodeName.toLowerCase();
          return b === "input" && "button" === a.type || b === "button"
        }, input: function (a) {
          return /input|select|textarea|button/i.test(a.nodeName)
        }, focus: function (a) {
          return a === a.ownerDocument.activeElement
        }
      },
      setFilters: {
        first: function (a, b) {
          return b === 0
        }, last: function (a, b, c, d) {
          return b === d.length - 1
        }, even: function (a, b) {
          return b % 2 === 0
        }, odd: function (a, b) {
          return b % 2 === 1
        }, lt: function (a, b, c) {
          return b < c[3] - 0
        }, gt: function (a, b, c) {
          return b > c[3] - 0
        }, nth: function (a, b, c) {
          return c[3] - 0 === b
        }, eq: function (a, b, c) {
          return c[3] - 0 === b
        }
      },
      filter: {
        PSEUDO: function (a, b, c, d) {
          var e = b[1], f = o.filters[e];
          if (f)return f(a, c, b, d);
          if (e === "contains")return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
          if (e === "not") {
            var g = b[3];
            for (var h = 0, i = g.length; h < i; h++)if (g[h] === a)return !1;
            return !0
          }
          m.error(e)
        }, CHILD: function (a, b) {
          var c, e, f, g, h, i, j, k = b[1], l = a;
          switch (k) {
            case"only":
            case"first":
              while (l = l.previousSibling)if (l.nodeType === 1)return !1;
              if (k === "first")return !0;
              l = a;
            case"last":
              while (l = l.nextSibling)if (l.nodeType === 1)return !1;
              return !0;
            case"nth":
              c = b[2], e = b[3];
              if (c === 1 && e === 0)return !0;
              f = b[0], g = a.parentNode;
              if (g && (g[d] !== f || !a.nodeIndex)) {
                i = 0;
                for (l = g.firstChild; l; l = l.nextSibling)l.nodeType === 1 && (l.nodeIndex = ++i);
                g[d] = f
              }
              j = a.nodeIndex - e;
              return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
          }
        }, ID: function (a, b) {
          return a.nodeType === 1 && a.getAttribute("id") === b
        }, TAG: function (a, b) {
          return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
        }, CLASS: function (a, b) {
          return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
        }, ATTR: function (a, b) {
          var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
          return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
        }, POS: function (a, b, c, d) {
          var e = b[2], f = o.setFilters[e];
          if (f)return f(a, c, b, d)
        }
      }
    }, p = o.match.POS, q = function (a, b) {
      return "\\" + (b - 0 + 1)
    };
    for (var r in o.match)o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
    o.match.globalPOS = p;
    var s = function (a, b) {
      a = Array.prototype.slice.call(a, 0);
      if (b) {
        b.push.apply(b, a);
        return b
      }
      return a
    };
    try {
      Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
    } catch (t) {
      s = function (a, b) {
        var c = 0, d = b || [];
        if (g.call(a) === "[object Array]")Array.prototype.push.apply(d, a); else if (typeof a.length == "number")for (var e = a.length; c < e; c++)d.push(a[c]); else for (; a[c]; c++)d.push(a[c]);
        return d
      }
    }
    var u, v;
    c.documentElement.compareDocumentPosition ? u = function (a, b) {
      if (a === b) {
        h = !0;
        return 0
      }
      if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a.compareDocumentPosition ? -1 : 1;
      return a.compareDocumentPosition(b) & 4 ? -1 : 1
    } : (u = function (a, b) {
      if (a === b) {
        h = !0;
        return 0
      }
      if (a.sourceIndex && b.sourceIndex)return a.sourceIndex - b.sourceIndex;
      var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
      if (g === i)return v(a, b);
      if (!g)return -1;
      if (!i)return 1;
      while (j)e.unshift(j), j = j.parentNode;
      j = i;
      while (j)f.unshift(j), j = j.parentNode;
      c = e.length, d = f.length;
      for (var k = 0; k < c && k < d; k++)if (e[k] !== f[k])return v(e[k], f[k]);
      return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
    }, v = function (a, b, c) {
      if (a === b)return c;
      var d = a.nextSibling;
      while (d) {
        if (d === b)return -1;
        d = d.nextSibling
      }
      return 1
    }), function () {
      var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
      a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
        if (typeof c.getElementById != "undefined" && !d) {
          var e = c.getElementById(a[1]);
          return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
        }
      }, o.filter.ID = function (a, b) {
        var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
        return a.nodeType === 1 && c && c.nodeValue === b
      }), e.removeChild(a), e = a = null
    }(), function () {
      var a = c.createElement("div");
      a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
        var c = b.getElementsByTagName(a[1]);
        if (a[1] === "*") {
          var d = [];
          for (var e = 0; c[e]; e++)c[e].nodeType === 1 && d.push(c[e]);
          c = d
        }
        return c
      }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
        return a.getAttribute("href", 2)
      }), a = null
    }(), c.querySelectorAll && function () {
      var a = m, b = c.createElement("div"), d = "__sizzle__";
      b.innerHTML = "<p class='TEST'></p>";
      if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
        m = function (b, e, f, g) {
          e = e || c;
          if (!g && !m.isXML(e)) {
            var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
            if (h && (e.nodeType === 1 || e.nodeType === 9)) {
              if (h[1])return s(e.getElementsByTagName(b), f);
              if (h[2] && o.find.CLASS && e.getElementsByClassName)return s(e.getElementsByClassName(h[2]), f)
            }
            if (e.nodeType === 9) {
              if (b === "body" && e.body)return s([e.body], f);
              if (h && h[3]) {
                var i = e.getElementById(h[3]);
                if (!i || !i.parentNode)return s([], f);
                if (i.id === h[3])return s([i], f)
              }
              try {
                return s(e.querySelectorAll(b), f)
              } catch (j) {
              }
            } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
              var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
              l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
              try {
                if (!q || p)return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
              } catch (r) {
              } finally {
                l || k.removeAttribute("id")
              }
            }
          }
          return a(b, e, f, g)
        };
        for (var e in a)m[e] = a[e];
        b = null
      }
    }(), function () {
      var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
      if (b) {
        var d = !b.call(c.createElement("div"), "div"), e = !1;
        try {
          b.call(c.documentElement, "[test!='']:sizzle")
        } catch (f) {
          e = !0
        }
        m.matchesSelector = function (a, c) {
          c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
          if (!m.isXML(a))try {
            if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
              var f = b.call(a, c);
              if (f || !d || a.document && a.document.nodeType !== 11)return f
            }
          } catch (g) {
          }
          return m(c, null, null, [a]).length > 0
        }
      }
    }(), function () {
      var a = c.createElement("div");
      a.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
        a.lastChild.className = "e";
        if (a.getElementsByClassName("e").length === 1)return;
        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
          if (typeof b.getElementsByClassName != "undefined" && !c)return b.getElementsByClassName(a[1])
        }, a = null
      }
    }(), c.documentElement.contains ? m.contains = function (a, b) {
      return a !== b && (a.contains ? a.contains(b) : !0)
    } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
      return !!(a.compareDocumentPosition(b) & 16)
    } : m.contains = function () {
      return !1
    }, m.isXML = function (a) {
      var b = (a ? a.ownerDocument || a : 0).documentElement;
      return b ? b.nodeName !== "HTML" : !1
    };
    var y = function (a, b, c) {
      var d, e = [], f = "", g = b.nodeType ? [b] : b;
      while (d = o.match.PSEUDO.exec(a))f += d[0], a = a.replace(o.match.PSEUDO, "");
      a = o.relative[a] ? a + "*" : a;
      for (var h = 0, i = g.length; h < i; h++)m(a, g[h], e, c);
      return m.filter(f, e)
    };
    m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
  }();
  var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.globalPOS, R = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };
  f.fn.extend({
    find: function (a) {
      var b = this, c, d;
      if (typeof a != "string")return f(a).filter(function () {
        for (c = 0, d = b.length; c < d; c++)if (f.contains(b[c], this))return !0
      });
      var e = this.pushStack("", "find", a), g, h, i;
      for (c = 0, d = this.length; c < d; c++) {
        g = e.length, f.find(a, this[c], e);
        if (c > 0)for (h = g; h < e.length; h++)for (i = 0; i < g; i++)if (e[i] === e[h]) {
          e.splice(h--, 1);
          break
        }
      }
      return e
    }, has: function (a) {
      var b = f(a);
      return this.filter(function () {
        for (var a = 0, c = b.length; a < c; a++)if (f.contains(this, b[a]))return !0
      })
    }, not: function (a) {
      return this.pushStack(T(this, a, !1), "not", a)
    }, filter: function (a) {
      return this.pushStack(T(this, a, !0), "filter", a)
    }, is: function (a) {
      return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
    }, closest: function (a, b) {
      var c = [], d, e, g = this[0];
      if (f.isArray(a)) {
        var h = 1;
        while (g && g.ownerDocument && g !== b) {
          for (d = 0; d < a.length; d++)f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
          g = g.parentNode, h++
        }
        return c
      }
      var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
      for (d = 0, e = this.length; d < e; d++) {
        g = this[d];
        while (g) {
          if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
            c.push(g);
            break
          }
          g = g.parentNode;
          if (!g || !g.ownerDocument || g === b || g.nodeType === 11)break
        }
      }
      c = c.length > 1 ? f.unique(c) : c;
      return this.pushStack(c, "closest", a)
    }, index: function (a) {
      if (!a)return this[0] && this[0].parentNode ? this.prevAll().length : -1;
      if (typeof a == "string")return f.inArray(this[0], f(a));
      return f.inArray(a.jquery ? a[0] : a, this)
    }, add: function (a, b) {
      var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
      return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
    }, andSelf: function () {
      return this.add(this.prevObject)
    }
  }), f.each({
    parent: function (a) {
      var b = a.parentNode;
      return b && b.nodeType !== 11 ? b : null
    }, parents: function (a) {
      return f.dir(a, "parentNode")
    }, parentsUntil: function (a, b, c) {
      return f.dir(a, "parentNode", c)
    }, next: function (a) {
      return f.nth(a, 2, "nextSibling")
    }, prev: function (a) {
      return f.nth(a, 2, "previousSibling")
    }, nextAll: function (a) {
      return f.dir(a, "nextSibling")
    }, prevAll: function (a) {
      return f.dir(a, "previousSibling")
    }, nextUntil: function (a, b, c) {
      return f.dir(a, "nextSibling", c)
    }, prevUntil: function (a, b, c) {
      return f.dir(a, "previousSibling", c)
    }, siblings: function (a) {
      return f.sibling((a.parentNode || {}).firstChild, a)
    }, children: function (a) {
      return f.sibling(a.firstChild)
    }, contents: function (a) {
      return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
    }
  }, function (a, b) {
    f.fn[a] = function (c, d) {
      var e = f.map(this, b, c);
      L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
      return this.pushStack(e, a, P.call(arguments).join(","))
    }
  }), f.extend({
    filter: function (a, b, c) {
      c && (a = ":not(" + a + ")");
      return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
    }, dir: function (a, c, d) {
      var e = [], g = a[c];
      while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d)))g.nodeType === 1 && e.push(g), g = g[c];
      return e
    }, nth: function (a, b, c, d) {
      b = b || 1;
      var e = 0;
      for (; a; a = a[c])if (a.nodeType === 1 && ++e === b)break;
      return a
    }, sibling: function (a, b) {
      var c = [];
      for (; a; a = a.nextSibling)a.nodeType === 1 && a !== b && c.push(a);
      return c
    }
  });
  var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    area: [1, "<map>", "</map>"],
    _default: [0, "", ""]
  }, bh = U(c);
  bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
    text: function (a) {
      return f.access(this, function (a) {
        return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
      }, null, a, arguments.length)
    }, wrapAll: function (a) {
      if (f.isFunction(a))return this.each(function (b) {
        f(this).wrapAll(a.call(this, b))
      });
      if (this[0]) {
        var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          var a = this;
          while (a.firstChild && a.firstChild.nodeType === 1)a = a.firstChild;
          return a
        }).append(this)
      }
      return this
    }, wrapInner: function (a) {
      if (f.isFunction(a))return this.each(function (b) {
        f(this).wrapInner(a.call(this, b))
      });
      return this.each(function () {
        var b = f(this), c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    }, wrap: function (a) {
      var b = f.isFunction(a);
      return this.each(function (c) {
        f(this).wrapAll(b ? a.call(this, c) : a)
      })
    }, unwrap: function () {
      return this.parent().each(function () {
        f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
      }).end()
    }, append: function () {
      return this.domManip(arguments, !0, function (a) {
        this.nodeType === 1 && this.appendChild(a)
      })
    }, prepend: function () {
      return this.domManip(arguments, !0, function (a) {
        this.nodeType === 1 && this.insertBefore(a, this.firstChild)
      })
    }, before: function () {
      if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this)
      });
      if (arguments.length) {
        var a = f
          .clean(arguments);
        a.push.apply(a, this.toArray());
        return this.pushStack(a, "before", arguments)
      }
    }, after: function () {
      if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this.nextSibling)
      });
      if (arguments.length) {
        var a = this.pushStack(this, "after", arguments);
        a.push.apply(a, f.clean(arguments));
        return a
      }
    }, remove: function (a, b) {
      for (var c = 0, d; (d = this[c]) != null; c++)if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
      return this
    }, empty: function () {
      for (var a = 0, b; (b = this[a]) != null; a++) {
        b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
        while (b.firstChild)b.removeChild(b.firstChild)
      }
      return this
    }, clone: function (a, b) {
      a = a == null ? !1 : a, b = b == null ? a : b;
      return this.map(function () {
        return f.clone(this, a, b)
      })
    }, html: function (a) {
      return f.access(this, function (a) {
        var c = this[0] || {}, d = 0, e = this.length;
        if (a === b)return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
        if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = a.replace(Y, "<$1></$2>");
          try {
            for (; d < e; d++)c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
            c = 0
          } catch (g) {
          }
        }
        c && this.empty().append(a)
      }, null, a, arguments.length)
    }, replaceWith: function (a) {
      if (this[0] && this[0].parentNode) {
        if (f.isFunction(a))return this.each(function (b) {
          var c = f(this), d = c.html();
          c.replaceWith(a.call(this, b, d))
        });
        typeof a != "string" && (a = f(a).detach());
        return this.each(function () {
          var b = this.nextSibling, c = this.parentNode;
          f(this).remove(), b ? f(b).before(a) : f(c).append(a)
        })
      }
      return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
    }, detach: function (a) {
      return this.remove(a, !0)
    }, domManip: function (a, c, d) {
      var e, g, h, i, j = a[0], k = [];
      if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j))return this.each(function () {
        f(this).domManip(a, c, d, !0)
      });
      if (f.isFunction(j))return this.each(function (e) {
        var g = f(this);
        a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
      });
      if (this[0]) {
        i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
        if (g) {
          c = c && f.nodeName(g, "tr");
          for (var l = 0, m = this.length, n = m - 1; l < m; l++)d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
        }
        k.length && f.each(k, function (a, b) {
          b.src ? f.ajax({
            type: "GET",
            global: !1,
            url: b.src,
            async: !1,
            dataType: "script"
          }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
        })
      }
      return this
    }
  }), f.buildFragment = function (a, b, d) {
    var e, g, h, i, j = a[0];
    b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
    return {fragment: e, cacheable: g}
  }, f.fragments = {}, f.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (a, b) {
    f.fn[a] = function (c) {
      var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
      if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
        e[b](this[0]);
        return this
      }
      for (var h = 0, i = e.length; h < i; h++) {
        var j = (h > 0 ? this.clone(!0) : this).get();
        f(e[h])[b](j), d = d.concat(j)
      }
      return this.pushStack(d, a, e.selector)
    }
  }), f.extend({
    clone: function (a, b, c) {
      var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
      if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
        bk(a, h), d = bl(a), e = bl(h);
        for (g = 0; d[g]; ++g)e[g] && bk(d[g], e[g])
      }
      if (b) {
        bj(a, h);
        if (c) {
          d = bl(a), e = bl(h);
          for (g = 0; d[g]; ++g)bj(d[g], e[g])
        }
      }
      d = e = null;
      return h
    }, clean: function (a, b, d, e) {
      var g, h, i, j = [];
      b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
      for (var k = 0, l; (l = a[k]) != null; k++) {
        typeof l == "number" && (l += "");
        if (!l)continue;
        if (typeof l == "string")if (!_.test(l))l = b.createTextNode(l); else {
          l = l.replace(Y, "<$1></$2>");
          var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0], p = b.createElement("div"), q = bh.childNodes, r;
          b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
          while (o--)p = p.lastChild;
          if (!f.support.tbody) {
            var s = $.test(l), t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
            for (i = t.length - 1; i >= 0; --i)f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
          }
          !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
        }
        var u;
        if (!f.support.appendChecked)if (l[0] && typeof (u = l.length) == "number")for (i = 0; i < u; i++)bn(l[i]); else bn(l);
        l.nodeType ? j.push(l) : j = f.merge(j, l)
      }
      if (d) {
        g = function (a) {
          return !a.type || be.test(a.type)
        };
        for (k = 0; j[k]; k++) {
          h = j[k];
          if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type)))e.push(h.parentNode ? h.parentNode.removeChild(h) : h); else {
            if (h.nodeType === 1) {
              var v = f.grep(h.getElementsByTagName("script"), g);
              j.splice.apply(j, [k + 1, 0].concat(v))
            }
            d.appendChild(h)
          }
        }
      }
      return j
    }, cleanData: function (a) {
      var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
      for (var h = 0, i; (i = a[h]) != null; h++) {
        if (i.nodeName && f.noData[i.nodeName.toLowerCase()])continue;
        c = i[f.expando];
        if (c) {
          b = d[c];
          if (b && b.events) {
            for (var j in b.events)e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
            b.handle && (b.handle.elem = null)
          }
          g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
        }
      }
    }
  });
  var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i, bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/, bw = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  }, bx = ["Top", "Right", "Bottom", "Left"], by, bz, bA;
  f.fn.css = function (a, c) {
    return f.access(this, function (a, c, d) {
      return d !== b ? f.style(a, c, d) : f.css(a, c)
    }, a, c, arguments.length > 1)
  }, f.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = by(a, "opacity");
            return c === "" ? "1" : c
          }
          return a.style.opacity
        }
      }
    },
    cssNumber: {
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"},
    style: function (a, c, d, e) {
      if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
        var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
        c = f.cssProps[i] || i;
        if (d === b) {
          if (k && "get" in k && (g = k.get(a, !1, e)) !== b)return g;
          return j[c]
        }
        h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
        if (d == null || h === "number" && isNaN(d))return;
        h === "number" && !f.cssNumber[i] && (d += "px");
        if (!k || !("set" in k) || (d = k.set(a, d)) !== b)try {
          j[c] = d
        } catch (l) {
        }
      }
    },
    css: function (a, c, d) {
      var e, g;
      c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
      if (g && "get" in g && (e = g.get(a, !0, d)) !== b)return e;
      if (by)return by(a, c)
    },
    swap: function (a, b, c) {
      var d = {}, e, f;
      for (f in b)d[f] = a.style[f], a.style[f] = b[f];
      e = c.call(a);
      for (f in b)a.style[f] = d[f];
      return e
    }
  }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
    var c, d, e, g, h = a.style;
    b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
    return c
  }), c.documentElement.currentStyle && (bA = function (a, b) {
    var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
    f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
    return f === "" ? "auto" : f
  }), by = bz || bA, f.each(["height", "width"], function (a, b) {
    f.cssHooks[b] = {
      get: function (a, c, d) {
        if (c)return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
          return bB(a, b, d)
        })
      }, set: function (a, b) {
        return bs.test(b) ? b + "px" : b
      }
    }
  }), f.support.opacity || (f.cssHooks.opacity = {
    get: function (a, b) {
      return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
    }, set: function (a, b) {
      var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
      c.zoom = 1;
      if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
        c.removeAttribute("filter");
        if (d && !d.filter)return
      }
      c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
    }
  }), f(function () {
    f.support.reliableMarginRight || (f.cssHooks.marginRight = {
      get: function (a, b) {
        return f.swap(a, {display: "inline-block"}, function () {
          return b ? by(a, "margin-right") : a.style.marginRight
        })
      }
    })
  }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
    var b = a.offsetWidth, c = a.offsetHeight;
    return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
  }, f.expr.filters.visible = function (a) {
    return !f.expr.filters.hidden(a)
  }), f.each({margin: "", padding: "", border: "Width"}, function (a, b) {
    f.cssHooks[a + b] = {
      expand: function (c) {
        var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
        for (d = 0; d < 4; d++)f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
        return f
      }
    }
  });
  var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//, bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/, bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bR = f.fn.load, bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
  try {
    bU = e.href
  } catch (bX) {
    bU = c.createElement("a"), bU.href = "", bU = bU.href
  }
  bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
    load: function (a, c, d) {
      if (typeof a != "string" && bR)return bR.apply(this, arguments);
      if (!this.length)return this;
      var e = a.indexOf(" ");
      if (e >= 0) {
        var g = a.slice(e, a.length);
        a = a.slice(0, e)
      }
      var h = "GET";
      c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
      var i = this;
      f.ajax({
        url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
          c = a.responseText, a.isResolved() && (a.done(function (a) {
            c = a
          }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
        }
      });
      return this
    }, serialize: function () {
      return f.param(this.serializeArray())
    }, serializeArray: function () {
      return this.map(function () {
        return this.elements ? f.makeArray(this.elements) : this
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
      }).map(function (a, b) {
        var c = f(this).val();
        return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
          return {name: b.name, value: a.replace(bE, "\r\n")}
        }) : {name: b.name, value: c.replace(bE, "\r\n")}
      }).get()
    }
  }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
    f.fn[b] = function (a) {
      return this.on(b, a)
    }
  }), f.each(["get", "post"], function (a, c) {
    f[c] = function (a, d, e, g) {
      f.isFunction(d) && (g = g || e, e = d, d = b);
      return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
    }
  }), f.extend({
    getScript: function (a, c) {
      return f.get(a, b, c, "script")
    },
    getJSON: function (a, b, c) {
      return f.get(a, b, c, "json")
    },
    ajaxSetup: function (a, b) {
      b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
      return a
    },
    ajaxSettings: {
      url: bU,
      isLocal: bI.test(bV[1]),
      global: !0,
      type: "GET",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      processData: !0,
      async: !0,
      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": bW
      },
      contents: {xml: /xml/, html: /html/, json: /json/},
      responseFields: {xml: "responseXML", text: "responseText"},
      converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML},
      flatOptions: {context: !0, url: !0}
    },
    ajaxPrefilter: bY(bS),
    ajaxTransport: bY(bT),
    ajax: function (a, c) {
      function w(a, c, l, m) {
        if (s !== 2) {
          s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
          var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
          if (a >= 200 && a < 300 || a === 304) {
            if (d.ifModified) {
              if (y = v.getResponseHeader("Last-Modified"))f.lastModified[k] = y;
              if (z = v.getResponseHeader("Etag"))f.etag[k] = z
            }
            if (a === 304)w = "notmodified", o = !0; else try {
              r = cb(d, x), w = "success", o = !0
            } catch (A) {
              w = "parsererror", u = A
            }
          } else {
            u = w;
            if (!w || a)w = "error", a < 0 && (a = 0)
          }
          v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
        }
      }

      typeof a == "object" && (c = a, a = b), c = c || {};
      var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
        readyState: 0,
        setRequestHeader: function (a, b) {
          if (!s) {
            var c = a.toLowerCase();
            a = m[c] = m[c] || a, l[a] = b
          }
          return this
        },
        getAllResponseHeaders: function () {
          return s === 2 ? n : null
        },
        getResponseHeader: function (a) {
          var c;
          if (s === 2) {
            if (!o) {
              o = {};
              while (c = bG.exec(n))o[c[1].toLowerCase()] = c[2]
            }
            c = o[a.toLowerCase()]
          }
          return c === b ? null : c
        },
        overrideMimeType: function (a) {
          s || (d.mimeType = a);
          return this
        },
        abort: function (a) {
          a = a || "abort", p && p.abort(a), w(0, a);
          return this
        }
      };
      h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
        if (a) {
          var b;
          if (s < 2)for (b in a)j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
        }
        return this
      }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
      if (s === 2)return !1;
      t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
      if (!d.hasContent) {
        d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
        if (d.cache === !1) {
          var x = f.now(), y = d.url.replace(bP, "$1_=" + x);
          d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
        }
      }
      (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
      for (u in d.headers)v.setRequestHeader(u, d.headers[u]);
      if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
        v.abort();
        return !1
      }
      for (u in{success: 1, error: 1, complete: 1})v[u](d[u]);
      p = bZ(bT, d, c, v);
      if (!p)w(-1, "No Transport"); else {
        v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
          v.abort("timeout")
        }, d.timeout));
        try {
          s = 1, p.send(l, w)
        } catch (z) {
          if (s < 2)w(-1, z); else throw z
        }
      }
      return v
    },
    param: function (a, c) {
      var d = [], e = function (a, b) {
        b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
      c === b && (c = f.ajaxSettings.traditional);
      if (f.isArray(a) || a.jquery && !f.isPlainObject(a))f.each(a, function () {
        e(this.name, this.value)
      }); else for (var g in a)b_(g, a[g], c, e);
      return d.join("&").replace(bC, "+")
    }
  }), f.extend({active: 0, lastModified: {}, etag: {}});
  var cc = f.now(), cd = /(\=)\?(&|$)|\?\?/i;
  f.ajaxSetup({
    jsonp: "callback", jsonpCallback: function () {
      return f.expando + "_" + cc++
    }
  }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
    if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
      var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
      b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
        g = [a]
      }, d.always(function () {
        a[h] = i, g && f.isFunction(i) && a[h](g[0])
      }), b.converters["script json"] = function () {
        g || f.error(h + " was not called");
        return g[0]
      }, b.dataTypes[0] = "json";
      return "script"
    }
  }), f.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /javascript|ecmascript/},
    converters: {
      "text script": function (a) {
        f.globalEval(a);
        return a
      }
    }
  }), f.ajaxPrefilter("script", function (a) {
    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
  }), f.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
      return {
        send: function (f, g) {
          d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
            if (c || !d.readyState || /loaded|complete/.test(d.readyState))d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
          }, e.insertBefore(d, e.firstChild)
        }, abort: function () {
          d && d.onload(0, 1)
        }
      }
    }
  });
  var ce = a.ActiveXObject ? function () {
    for (var a in cg)cg[a](0, 1)
  } : !1, cf = 0, cg;
  f.ajaxSettings.xhr = a.ActiveXObject ? function () {
    return !this.isLocal && ch() || ci()
  } : ch, function (a) {
    f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials" in a})
  }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
    if (!c.crossDomain || f.support.cors) {
      var d;
      return {
        send: function (e, g) {
          var h = c.xhr(), i, j;
          c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
          if (c.xhrFields)for (j in c.xhrFields)h[j] = c.xhrFields[j];
          c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (j in e)h.setRequestHeader(j, e[j])
          } catch (k) {
          }
          h.send(c.hasContent && c.data || null), d = function (a, e) {
            var j, k, l, m, n;
            try {
              if (d && (e || h.readyState === 4)) {
                d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                if (e)h.readyState !== 4 && h.abort(); else {
                  j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                  try {
                    m.text = h.responseText
                  } catch (a) {
                  }
                  try {
                    k = h.statusText
                  } catch (o) {
                    k = ""
                  }
                  !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                }
              }
            } catch (p) {
              e || g(-1, p)
            }
            m && g(j, k, m, l)
          }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
        }, abort: function () {
          d && d(0, 1)
        }
      }
    }
  });
  var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co, cp = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], cq;
  f.fn.extend({
    show: function (a, b, c) {
      var d, e;
      if (a || a === 0)return this.animate(ct("show", 3), a, b, c);
      for (var g = 0, h = this.length; g < h; g++)d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
      for (g = 0; g < h; g++) {
        d = this[g];
        if (d.style) {
          e = d.style.display;
          if (e === "" || e === "none")d.style.display = f._data(d, "olddisplay") || ""
        }
      }
      return this
    }, hide: function (a, b, c) {
      if (a || a === 0)return this.animate(ct("hide", 3), a, b, c);
      var d, e, g = 0, h = this.length;
      for (; g < h; g++)d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
      for (g = 0; g < h; g++)this[g].style && (this[g].style.display = "none");
      return this
    }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
      var d = typeof a == "boolean";
      f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
        var b = d ? a : f(this).is(":hidden");
        f(this)[b ? "show" : "hide"]()
      }) : this.animate(ct("toggle", 3), a, b, c);
      return this
    }, fadeTo: function (a, b, c, d) {
      return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
    }, animate: function (a, b, c, d) {
      function g() {
        e.queue === !1 && f._mark(this);
        var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
        b.animatedProperties = {};
        for (i in a) {
          g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
          if ((k = f.cssHooks[g]) && "expand" in k) {
            l = k.expand(a[g]), delete a[g];
            for (i in l)i in a || (a[i] = l[i])
          }
        }
        for (g in a) {
          h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
          if (h === "hide" && d || h === "show" && !d)return b.complete.call(this);
          c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
        }
        b.overflow != null && (this.style.overflow = "hidden");
        for (i in a)j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
        return !0
      }

      var e = f.speed(b, c, d);
      if (f.isEmptyObject(a))return this.each(e.complete, [!1]);
      a = f.extend({}, a);
      return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
    }, stop: function (a, c, d) {
      typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
      return this.each(function () {
        function h(a, b, c) {
          var e = b[c];
          f.removeData(a, c, !0), e.stop(d)
        }

        var b, c = !1, e = f.timers, g = f._data(this);
        d || f._unmark(!0, this);
        if (a == null)for (b in g)g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
        for (b = e.length; b--;)e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
        (!d || !c) && f.dequeue(this, a)
      })
    }
  }), f.each({
    slideDown: ct("show", 1),
    slideUp: ct("hide", 1),
    slideToggle: ct("toggle", 1),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function (a, b) {
    f.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d)
    }
  }), f.extend({
    speed: function (a, b, c) {
      var d = a && typeof a == "object" ? f.extend({}, a) : {
        complete: c || !c && b || f.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !f.isFunction(b) && b
      };
      d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
      if (d.queue == null || d.queue === !0)d.queue = "fx";
      d.old = d.complete, d.complete = function (a) {
        f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
      };
      return d
    }, easing: {
      linear: function (a) {
        return a
      }, swing: function (a) {
        return -Math.cos(a * Math.PI) / 2 + .5
      }
    }, timers: [], fx: function (a, b, c) {
      this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
    }
  }), f.fx.prototype = {
    update: function () {
      this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
    }, cur: function () {
      if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
      var a, b = f.css(this.elem, this.prop);
      return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
    }, custom: function (a, c, d) {
      function h(a) {
        return e.step(a)
      }

      var e = this, g = f.fx;
      this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
        f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
      }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
    }, show: function () {
      var a = f._data(this.elem, "fxshow" + this.prop);
      this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
    }, hide: function () {
      this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
    }, step: function (a) {
      var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
      if (a || e >= i.duration + this.startTime) {
        this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
        for (b in i.animatedProperties)i.animatedProperties[b] !== !0 && (g = !1);
        if (g) {
          i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
            h.style["overflow" + b] = i.overflow[a]
          }), i.hide && f(h).hide();
          if (i.hide || i.show)for (b in i.animatedProperties)f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
          d = i.complete, d && (i.complete = !1, d.call(h))
        }
        return !1
      }
      i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
      return !0
    }
  }, f.extend(f.fx, {
    tick: function () {
      var a, b = f.timers, c = 0;
      for (; c < b.length; c++)a = b[c], !a() && b[c] === a && b.splice(c--, 1);
      b.length || f.fx.stop()
    }, interval: 13, stop: function () {
      clearInterval(co), co = null
    }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
      opacity: function (a) {
        f.style(a.elem, "opacity", a.now)
      }, _default: function (a) {
        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
      }
    }
  }), f.each(cp.concat.apply([], cp), function (a, b) {
    b.indexOf("margin") && (f.fx.step[b] = function (a) {
      f.style(a.elem, b, Math.max(0, a.now) + a.unit)
    })
  }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
    return f.grep(f.timers, function (b) {
      return a === b.elem
    }).length
  });
  var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
  "getBoundingClientRect" in c.documentElement ? cv = function (a, b, c, d) {
    try {
      d = a.getBoundingClientRect()
    } catch (e) {
    }
    if (!d || !f.contains(c, a))return d ? {top: d.top, left: d.left} : {top: 0, left: 0};
    var g = b.body, h = cy(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0, k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop, l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i, n = d.left + l - j;
    return {top: m, left: n}
  } : cv = function (a, b, c) {
    var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
    while ((a = a.parentNode) && a !== h && a !== c) {
      if (f.support.fixedPosition && j.position === "fixed")break;
      d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
    }
    if (j.position === "relative" || j.position === "static")k += h.offsetTop, l += h.offsetLeft;
    f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
    return {top: k, left: l}
  }, f.fn.offset = function (a) {
    if (arguments.length)return a === b ? this : this.each(function (b) {
      f.offset.setOffset(this, a, b)
    });
    var c = this[0], d = c && c.ownerDocument;
    if (!d)return null;
    if (c === d.body)return f.offset.bodyOffset(c);
    return cv(c, d, d.documentElement)
  }, f.offset = {
    bodyOffset: function (a) {
      var b = a.offsetTop, c = a.offsetLeft;
      f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
      return {top: b, left: c}
    }, setOffset: function (a, b, c) {
      var d = f.css(a, "position");
      d === "static" && (a.style.position = "relative");
      var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
      j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
    }
  }, f.fn.extend({
    position: function () {
      if (!this[0])return null;
      var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {
        top: 0,
        left: 0
      } : b.offset();
      c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
      return {top: c.top - d.top, left: c.left - d.left}
    }, offsetParent: function () {
      return this.map(function () {
        var a = this.offsetParent || c.body;
        while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static")a = a.offsetParent;
        return a
      })
    }
  }), f.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
    var d = /Y/.test(c);
    f.fn[a] = function (e) {
      return f.access(this, function (a, e, g) {
        var h = cy(a);
        if (g === b)return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
        h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
      }, a, e, arguments.length, null)
    }
  }), f.each({Height: "height", Width: "width"}, function (a, c) {
    var d = "client" + a, e = "scroll" + a, g = "offset" + a;
    f.fn["inner" + a] = function () {
      var a = this[0];
      return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
    }, f.fn["outer" + a] = function (a) {
      var b = this[0];
      return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
    }, f.fn[c] = function (a) {
      return f.access(this, function (a, c, h) {
        var i, j, k, l;
        if (f.isWindow(a)) {
          i = a.document, j = i.documentElement[d];
          return f.support.boxModel && j || i.body && i.body[d] || j
        }
        if (a.nodeType === 9) {
          i = a.documentElement;
          if (i[d] >= i[e])return i[d];
          return Math.max(a.body[e], i[e], a.body[g], i[g])
        }
        if (h === b) {
          k = f.css(a, c), l = parseFloat(k);
          return f.isNumeric(l) ? l : k
        }
        f(a).css(c, h)
      }, c, a, arguments.length, null)
    }
  }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
    return f
  })
})(window);
(function (a, b) {
  function c(b, c) {
    var e = b.nodeName.toLowerCase();
    if ("area" === e) {
      var f = b.parentNode, g = f.name, h;
      return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !!h && d(h))
    }
    return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
  }

  function d(b) {
    return !a(b).parents().andSelf().filter(function () {
      return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
    }).length
  }

  a.ui = a.ui || {};
  if (a.ui.version)return;
  a.extend(a.ui, {
    version: "1.8.20",
    keyCode: {
      ALT: 18,
      BACKSPACE: 8,
      CAPS_LOCK: 20,
      COMMA: 188,
      COMMAND: 91,
      COMMAND_LEFT: 91,
      COMMAND_RIGHT: 93,
      CONTROL: 17,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      MENU: 93,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SHIFT: 16,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      WINDOWS: 91
    }
  }), a.fn.extend({
    propAttr: a.fn.prop || a.fn.attr, _focus: a.fn.focus, focus: function (b, c) {
      return typeof b == "number" ? this.each(function () {
        var d = this;
        setTimeout(function () {
          a(d).focus(), c && c.call(d)
        }, b)
      }) : this._focus.apply(this, arguments)
    }, scrollParent: function () {
      var b;
      return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function () {
        return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
      }).eq(0) : b = this.parents().filter(function () {
        return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
      }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
    }, zIndex: function (c) {
      if (c !== b)return this.css("zIndex", c);
      if (this.length) {
        var d = a(this[0]), e, f;
        while (d.length && d[0] !== document) {
          e = d.css("position");
          if (e === "absolute" || e === "relative" || e === "fixed") {
            f = parseInt(d.css("zIndex"), 10);
            if (!isNaN(f) && f !== 0)return f
          }
          d = d.parent()
        }
      }
      return 0
    }, disableSelection: function () {
      return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
        a.preventDefault()
      })
    }, enableSelection: function () {
      return this.unbind(".ui-disableSelection")
    }
  }), a.each(["Width", "Height"], function (c, d) {
    function h(b, c, d, f) {
      return a.each(e, function () {
        c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
      }), c
    }

    var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], f = d.toLowerCase(), g = {
      innerWidth: a.fn.innerWidth,
      innerHeight: a.fn.innerHeight,
      outerWidth: a.fn.outerWidth,
      outerHeight: a.fn.outerHeight
    };
    a.fn["inner" + d] = function (c) {
      return c === b ? g["inner" + d].call(this) : this.each(function () {
        a(this).css(f, h(this, c) + "px")
      })
    }, a.fn["outer" + d] = function (b, c) {
      return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function () {
        a(this).css(f, h(this, b, !0, c) + "px")
      })
    }
  }), a.extend(a.expr[":"], {
    data: function (b, c, d) {
      return !!a.data(b, d[3])
    }, focusable: function (b) {
      return c(b, !isNaN(a.attr(b, "tabindex")))
    }, tabbable: function (b) {
      var d = a.attr(b, "tabindex"), e = isNaN(d);
      return (e || d >= 0) && c(b, !e)
    }
  }), a(function () {
    var b = document.body, c = b.appendChild(c = document.createElement("div"));
    c.offsetHeight, a.extend(c.style, {
      minHeight: "100px",
      height: "auto",
      padding: 0,
      borderWidth: 0
    }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
  }), a.extend(a.ui, {
    plugin: {
      add: function (b, c, d) {
        var e = a.ui[b].prototype;
        for (var f in d)e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
      }, call: function (a, b, c) {
        var d = a.plugins[b];
        if (!d || !a.element[0].parentNode)return;
        for (var e = 0; e < d.length; e++)a.options[d[e][0]] && d[e][1].apply(a.element, c)
      }
    }, contains: function (a, b) {
      return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
    }, hasScroll: function (b, c) {
      if (a(b).css("overflow") === "hidden")return !1;
      var d = c && c === "left" ? "scrollLeft" : "scrollTop", e = !1;
      return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
    }, isOverAxis: function (a, b, c) {
      return a > b && a < b + c
    }, isOver: function (b, c, d, e, f, g) {
      return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
    }
  })
})(jQuery);
(function (a, b) {
  if (a.cleanData) {
    var c = a.cleanData;
    a.cleanData = function (b) {
      for (var d = 0, e; (e = b[d]) != null; d++)try {
        a(e).triggerHandler("remove")
      } catch (f) {
      }
      c(b)
    }
  } else {
    var d = a.fn.remove;
    a.fn.remove = function (b, c) {
      return this.each(function () {
        return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function () {
          try {
            a(this).triggerHandler("remove")
          } catch (b) {
          }
        }), d.call(a(this), b, c)
      })
    }
  }
  a.widget = function (b, c, d) {
    var e = b.split(".")[0], f;
    b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function (c) {
      return !!a.data(c, b)
    }, a[e] = a[e] || {}, a[e][b] = function (a, b) {
      arguments.length && this._createWidget(a, b)
    };
    var g = new c;
    g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
      namespace: e,
      widgetName: b,
      widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
      widgetBaseClass: f
    }, d), a.widget.bridge(b, a[e][b])
  }, a.widget.bridge = function (c, d) {
    a.fn[c] = function (e) {
      var f = typeof e == "string", g = Array.prototype.slice.call(arguments, 1), h = this;
      return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function () {
        var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
        if (f !== d && f !== b)return h = f, !1
      }) : this.each(function () {
        var b = a.data(this, c);
        b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
      }), h)
    }
  }, a.Widget = function (a, b) {
    arguments.length && this._createWidget(a, b)
  }, a.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    options: {disabled: !1},
    _createWidget: function (b, c) {
      a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
      var d = this;
      this.element.bind("remove." + this.widgetName, function () {
        d.destroy()
      }), this._create(), this._trigger("create"), this._init()
    },
    _getCreateOptions: function () {
      return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
    },
    _create: function () {
    },
    _init: function () {
    },
    destroy: function () {
      this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
    },
    widget: function () {
      return this.element
    },
    option: function (c, d) {
      var e = c;
      if (arguments.length === 0)return a.extend({}, this.options);
      if (typeof c == "string") {
        if (d === b)return this.options[c];
        e = {}, e[c] = d
      }
      return this._setOptions(e), this
    },
    _setOptions: function (b) {
      var c = this;
      return a.each(b, function (a, b) {
        c._setOption(a, b)
      }), this
    },
    _setOption: function (a, b) {
      return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
    },
    enable: function () {
      return this._setOption("disabled", !1)
    },
    disable: function () {
      return this._setOption("disabled", !0)
    },
    _trigger: function (b, c, d) {
      var e, f, g = this.options[b];
      d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
      if (f)for (e in f)e in c || (c[e] = f[e]);
      return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
    }
  }
})(jQuery);
"use strict";
jQuery.base64 = (function (f) {
  var d = "=", b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "1.0";

  function g(l, k) {
    var j = b.indexOf(l.charAt(k));
    if (j === -1) {
      throw"Cannot decode base64"
    }
    return j
  }

  function a(m) {
    var o = 0, l, n, k = m.length, j = [];
    m = String(m);
    if (k === 0) {
      return m
    }
    if (k % 4 !== 0) {
      throw"Cannot decode base64"
    }
    if (m.charAt(k - 1) === d) {
      o = 1;
      if (m.charAt(k - 2) === d) {
        o = 2
      }
      k -= 4
    }
    for (l = 0; l < k; l += 4) {
      n = (g(m, l) << 18) | (g(m, l + 1) << 12) | (g(m, l + 2) << 6) | g(m, l + 3);
      j.push(String.fromCharCode(n >> 16, (n >> 8) & 255, n & 255))
    }
    switch (o) {
      case 1:
        n = (g(m, l) << 18) | (g(m, l + 1) << 12) | (g(m, l + 2) << 6);
        j.push(String.fromCharCode(n >> 16, (n >> 8) & 255));
        break;
      case 2:
        n = (g(m, l) << 18) | (g(m, l + 1) << 12);
        j.push(String.fromCharCode(n >> 16));
        break
    }
    return j.join("")
  }

  function e(l, k) {
    var j = l.charCodeAt(k);
    if (j > 255) {
      throw"INVALID_CHARACTER_ERR: DOM Exception 5"
    }
    return j
  }

  function h(m) {
    if (arguments.length !== 1) {
      throw"SyntaxError: exactly one argument required"
    }
    m = String(m);
    var l, n, j = [], k = m.length - m.length % 3;
    if (m.length === 0) {
      return m
    }
    for (l = 0; l < k; l += 3) {
      n = (e(m, l) << 16) | (e(m, l + 1) << 8) | e(m, l + 2);
      j.push(b.charAt(n >> 18));
      j.push(b.charAt((n >> 12) & 63));
      j.push(b.charAt((n >> 6) & 63));
      j.push(b.charAt(n & 63))
    }
    switch (m.length - k) {
      case 1:
        n = e(m, l) << 16;
        j.push(b.charAt(n >> 18) + b.charAt((n >> 12) & 63) + d + d);
        break;
      case 2:
        n = (e(m, l) << 16) | (e(m, l + 1) << 8);
        j.push(b.charAt(n >> 18) + b.charAt((n >> 12) & 63) + b.charAt((n >> 6) & 63) + d);
        break
    }
    return j.join("")
  }

  return {decode: a, encode: h, VERSION: c}
}(jQuery));
(function ($, s) {
  var h, n = Array.prototype.slice, u = decodeURIComponent, a = $.param, j, c, m, z, b = $.bbq = $.bbq || {}, t, y, k, e = $.event.special, d = "hashchange", C = "querystring", G = "fragment", A = "elemUrlAttr", l = "href", x = "src", p = /^.*\?|#.*$/g, v, I, g, i, D, F = {};

  function H(J) {
    return typeof J === "string"
  }

  function E(K) {
    var J = n.call(arguments, 1);
    return function () {
      return K.apply(this, J.concat(n.call(arguments)))
    }
  }

  function o(J) {
    return J.replace(I, "$2")
  }

  function q(J) {
    return J.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
  }

  function f(L, Q, J, M, K) {
    var S, P, O, R, N;
    if (M !== h) {
      O = J.match(L ? I : /^([^#?]*)\??([^#]*)(#?.*)/);
      N = O[3] || "";
      if (K === 2 && H(M)) {
        P = M.replace(L ? v : p, "")
      } else {
        R = m(O[2]);
        M = H(M) ? m[L ? G : C](M) : M;
        P = K === 2 ? M : K === 1 ? $.extend({}, M, R) : $.extend({}, R, M);
        P = j(P);
        if (L) {
          P = P.replace(g, u)
        }
      }
      S = O[1] + (L ? D : P || !O[1] ? "?" : "") + P + N
    } else {
      S = Q(J !== h ? J : location.href)
    }
    return S
  }

  a[C] = E(f, 0, q);
  a[G] = c = E(f, 1, o);
  a.sorted = j = function (K, L) {
    var J = [], M = {};
    $.each(a(K, L).split("&"), function (Q, N) {
      var P = N.replace(/(?:%5B|=).*$/, ""), O = M[P];
      if (!O) {
        O = M[P] = [];
        J.push(P)
      }
      O.push(N)
    });
    return $.map(J.sort(), function (N) {
      return M[N]
    }).join("&")
  };
  c.noEscape = function (K) {
    K = K || "";
    var J = $.map(K.split(""), encodeURIComponent);
    g = new RegExp(J.join("|"), "g")
  };
  c.noEscape(",/");
  c.ajaxCrawlable = function (J) {
    if (J !== h) {
      if (J) {
        v = /^.*(?:#!|#)/;
        I = /^([^#]*)(?:#!|#)?(.*)$/;
        D = "#!"
      } else {
        v = /^.*#/;
        I = /^([^#]*)#?(.*)$/;
        D = "#"
      }
      i = !!J
    }
    return i
  };
  c.ajaxCrawlable(0);
  $.deparam = m = function (M, J) {
    var L = {}, K = {"true": !0, "false": !1, "null": null};
    $.each(M.replace(/\+/g, " ").split("&"), function (P, U) {
      var O = U.split("="), T = u(O[0]), N, S = L, Q = 0, V = T.split("]["), R = V.length - 1;
      if (/\[/.test(V[0]) && /\]$/.test(V[R])) {
        V[R] = V[R].replace(/\]$/, "");
        V = V.shift().split("[").concat(V);
        R = V.length - 1
      } else {
        R = 0
      }
      if (O.length === 2) {
        N = u(O[1]);
        if (J) {
          N = N && !isNaN(N) ? +N : N === "undefined" ? h : K[N] !== h ? K[N] : N
        }
        if (R) {
          for (; Q <= R; Q++) {
            T = V[Q] === "" ? S.length : V[Q];
            S = S[T] = Q < R ? S[T] || (V[Q + 1] && isNaN(V[Q + 1]) ? {} : []) : N
          }
        } else {
          if ($.isArray(L[T])) {
            L[T].push(N)
          } else {
            if (L[T] !== h) {
              L[T] = [L[T], N]
            } else {
              L[T] = N
            }
          }
        }
      } else {
        if (T) {
          L[T] = J ? h : ""
        }
      }
    });
    return L
  };
  function B(L, J, K) {
    if (J === h || typeof J === "boolean") {
      K = J;
      J = a[L ? G : C]()
    } else {
      J = H(J) ? J.replace(L ? v : p, "") : J
    }
    return m(J, K)
  }

  m[C] = E(B, 0);
  m[G] = z = E(B, 1);
  $[A] || ($[A] = function (J) {
    return $.extend(F, J)
  })({a: l, base: l, iframe: x, img: x, input: x, form: "action", link: l, script: x});
  k = $[A];
  function w(M, K, L, J) {
    if (!H(L) && typeof L !== "object") {
      J = L;
      L = K;
      K = h
    }
    return this.each(function () {
      var P = $(this), N = K || k()[(this.nodeName || "").toLowerCase()] || "", O = N && P.attr(N) || "";
      P.attr(N, a[M](O, L, J))
    })
  }

  $.fn[C] = E(w, C);
  $.fn[G] = E(w, G);
  b.pushState = t = function (M, J) {
    if (H(M) && /^#/.test(M) && J === h) {
      J = 2
    }
    var L = M !== h, K = c(location.href, L ? M : {}, L ? J : 2);
    location.href = K
  };
  b.getState = y = function (J, K) {
    return J === h || typeof J === "boolean" ? z(J) : z(K)[J]
  };
  b.removeState = function (J) {
    var K = {};
    if (J !== h) {
      K = y();
      $.each($.isArray(J) ? J : arguments, function (M, L) {
        delete K[L]
      })
    }
    t(K, 2)
  };
  e[d] = $.extend(e[d], {
    add: function (J) {
      var L;

      function K(N) {
        var M = N[G] = c();
        N.getState = function (O, P) {
          return O === h || typeof O === "boolean" ? m(M, O) : m(M, P)[O]
        };
        L.apply(this, arguments)
      }

      if ($.isFunction(J)) {
        L = J;
        return K
      } else {
        L = J.handler;
        J.handler = K
      }
    }
  })
})(jQuery, this);
(function ($, e, b) {
  var c = "hashchange", h = document, f, g = $.event.special, i = h.documentMode, d = "on" + c in e && (i === b || i > 7);

  function a(j) {
    j = j || location.href;
    return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
  }

  $.fn[c] = function (j) {
    return j ? this.bind(c, j) : this.trigger(c)
  };
  $.fn[c].delay = 50;
  g[c] = $.extend(g[c], {
    setup: function () {
      if (d) {
        return false
      }
      $(f.start)
    }, teardown: function () {
      if (d) {
        return false
      }
      $(f.stop)
    }
  });
  f = (function () {
    var j = {}, p, m = a(), k = function (q) {
      return q
    }, l = k, o = k;
    j.start = function () {
      p || n()
    };
    j.stop = function () {
      p && clearTimeout(p);
      p = b
    };
    function n() {
      var s = a(), q = o(m);
      if (s !== m) {
        l(m = s, q);
        $(e).trigger(c)
      } else {
        if (q !== m) {
          location.href = location.href.replace(/#.*/, "") + q
        }
      }
      p = setTimeout(n, $.fn[c].delay)
    }

    $.browser.msie && !d && (function () {
      var q, s;
      j.start = function () {
        if (!q) {
          s = $.fn[c].src;
          s = s && s + a();
          q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
            s || l(a());
            n()
          }).attr("src", s || "javascript:0").insertAfter("body")[0].contentWindow;
          h.onpropertychange = function () {
            try {
              if (event.propertyName === "title") {
                q.document.title = h.title
              }
            } catch (t) {
            }
          }
        }
      };
      j.stop = k;
      o = function () {
        return a(q.location.href)
      };
      l = function (w, t) {
        var v = q.document, u = $.fn[c].domain;
        if (w !== t) {
          v.title = h.title;
          v.open();
          u && v.write('<script>document.domain="' + u + '"<\/script>');
          v.close();
          q.location.hash = w
        }
      }
    })();
    return j
  })()
})(jQuery, this);
(function (a) {
  a.cookie = function (g, f, k) {
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(f)) || f === null || f === undefined)) {
      k = a.extend({}, k);
      if (f === null || f === undefined) {
        k.expires = -1
      }
      if (typeof k.expires === "number") {
        var h = k.expires, j = k.expires = new Date();
        j.setDate(j.getDate() + h)
      }
      f = String(f);
      return (document.cookie = [encodeURIComponent(g), "=", k.raw ? f : encodeURIComponent(f), k.expires ? "; expires=" + k.expires.toUTCString() : "", k.path ? "; path=" + k.path : "", k.domain ? "; domain=" + k.domain : "", k.secure ? "; secure" : ""].join(""))
    }
    k = f || {};
    var b = k.raw ? function (i) {
      return i
    } : decodeURIComponent;
    var c = document.cookie.split("; ");
    for (var e = 0, d; d = c[e] && c[e].split("="); e++) {
      if (b(d[0]) === g) {
        return b(d[1] || "")
      }
    }
    return null
  }
})(jQuery);
(function (b) {
  function a(d) {
    this.input = d;
    if (d.attr("type") == "password") {
      this.handlePassword()
    }
    b(d[0].form).submit(function () {
      if (d.hasClass("placeholder") && d[0].value == d.attr("placeholder")) {
        d[0].value = ""
      }
    })
  }

  a.prototype = {
    show: function (f) {
      if (this.input[0].value === "" || (f && this.valueIsPlaceholder())) {
        if (this.isPassword) {
          try {
            this.input[0].setAttribute("type", "text")
          } catch (d) {
            this.input.before(this.fakePassword.show()).hide()
          }
        }
        this.input.addClass("placeholder");
        this.input[0].value = this.input.attr("placeholder")
      }
    }, hide: function () {
      if (this.valueIsPlaceholder() && this.input.hasClass("placeholder")) {
        this.input.removeClass("placeholder");
        this.input[0].value = "";
        if (this.isPassword) {
          try {
            this.input[0].setAttribute("type", "password")
          } catch (d) {
          }
          this.input.show();
          this.input[0].focus()
        }
      }
    }, valueIsPlaceholder: function () {
      return this.input[0].value == this.input.attr("placeholder")
    }, handlePassword: function () {
      var d = this.input;
      d.attr("realType", "password");
      this.isPassword = true;
      if (b.browser.msie && d[0].outerHTML) {
        var e = b(d[0].outerHTML.replace(/type=(['"])?password\1/gi, "type=$1text$1"));
        this.fakePassword = e.val(d.attr("placeholder")).addClass("placeholder").focus(function () {
          d.trigger("focus");
          b(this).hide()
        });
        b(d[0].form).submit(function () {
          e.remove();
          d.show()
        })
      }
    }
  };
  var c = !!("placeholder" in document.createElement("input"));
  b.fn.placeholder = function () {
    return c ? this : this.each(function () {
      var d = b(this);
      var e = new a(d);
      e.show(true);
      d.focus(function () {
        e.hide()
      });
      d.blur(function () {
        e.show(false)
      });
      if (b.browser.msie) {
        b(window).load(function () {
          if (d.val()) {
            d.removeClass("placeholder")
          }
          e.show(true)
        });
        d.focus(function () {
          if (this.value == "") {
            var f = this.createTextRange();
            f.collapse(true);
            f.moveStart("character", 0);
            f.select()
          }
        })
      }
    })
  }
})(jQuery);
(function () {
  var x = this;
  var k = x._;
  var E = {};
  var D = Array.prototype, f = Object.prototype, s = Function.prototype;
  var I = D.push, o = D.slice, z = D.concat, d = f.toString, j = f.hasOwnProperty;
  var M = D.forEach, q = D.map, F = D.reduce, c = D.reduceRight, b = D.filter, C = D.every, p = D.some, n = D.indexOf, l = D.lastIndexOf, v = Array.isArray, e = Object.keys, G = s.bind;
  var N = function (O) {
    if (O instanceof N) {
      return O
    }
    if (!(this instanceof N)) {
      return new N(O)
    }
    this._wrapped = O
  };
  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = N
    }
    exports._ = N
  } else {
    x._ = N
  }
  N.VERSION = "1.5.2";
  var J = N.each = N.forEach = function (T, Q, P) {
    if (T == null) {
      return
    }
    if (M && T.forEach === M) {
      T.forEach(Q, P)
    } else {
      if (T.length === +T.length) {
        for (var O = 0, S = T.length; O < S; O++) {
          if (Q.call(P, T[O], O, T) === E) {
            return
          }
        }
      } else {
        var R = N.keys(T);
        for (var O = 0, S = R.length; O < S; O++) {
          if (Q.call(P, T[R[O]], R[O], T) === E) {
            return
          }
        }
      }
    }
  };
  N.map = N.collect = function (R, Q, P) {
    var O = [];
    if (R == null) {
      return O
    }
    if (q && R.map === q) {
      return R.map(Q, P)
    }
    J(R, function (U, S, T) {
      O.push(Q.call(P, U, S, T))
    });
    return O
  };
  var g = "Reduce of empty array with no initial value";
  N.reduce = N.foldl = N.inject = function (S, R, O, Q) {
    var P = arguments.length > 2;
    if (S == null) {
      S = []
    }
    if (F && S.reduce === F) {
      if (Q) {
        R = N.bind(R, Q)
      }
      return P ? S.reduce(R, O) : S.reduce(R)
    }
    J(S, function (V, T, U) {
      if (!P) {
        O = V;
        P = true
      } else {
        O = R.call(Q, O, V, T, U)
      }
    });
    if (!P) {
      throw new TypeError(g)
    }
    return O
  };
  N.reduceRight = N.foldr = function (U, R, O, Q) {
    var P = arguments.length > 2;
    if (U == null) {
      U = []
    }
    if (c && U.reduceRight === c) {
      if (Q) {
        R = N.bind(R, Q)
      }
      return P ? U.reduceRight(R, O) : U.reduceRight(R)
    }
    var T = U.length;
    if (T !== +T) {
      var S = N.keys(U);
      T = S.length
    }
    J(U, function (X, V, W) {
      V = S ? S[--T] : --T;
      if (!P) {
        O = U[V];
        P = true
      } else {
        O = R.call(Q, O, U[V], V, W)
      }
    });
    if (!P) {
      throw new TypeError(g)
    }
    return O
  };
  N.find = N.detect = function (R, Q, P) {
    var O;
    B(R, function (U, S, T) {
      if (Q.call(P, U, S, T)) {
        O = U;
        return true
      }
    });
    return O
  };
  N.filter = N.select = function (R, Q, P) {
    var O = [];
    if (R == null) {
      return O
    }
    if (b && R.filter === b) {
      return R.filter(Q, P)
    }
    J(R, function (U, S, T) {
      if (Q.call(P, U, S, T)) {
        O.push(U)
      }
    });
    return O
  };
  N.reject = function (Q, P, O) {
    return N.filter(Q, function (T, R, S) {
      return !P.call(O, T, R, S)
    }, O)
  };
  N.every = N.all = function (R, Q, P) {
    Q || (Q = N.identity);
    var O = true;
    if (R == null) {
      return O
    }
    if (C && R.every === C) {
      return R.every(Q, P)
    }
    J(R, function (U, S, T) {
      if (!(O = O && Q.call(P, U, S, T))) {
        return E
      }
    });
    return !!O
  };
  var B = N.some = N.any = function (R, Q, P) {
    Q || (Q = N.identity);
    var O = false;
    if (R == null) {
      return O
    }
    if (p && R.some === p) {
      return R.some(Q, P)
    }
    J(R, function (U, S, T) {
      if (O || (O = Q.call(P, U, S, T))) {
        return E
      }
    });
    return !!O
  };
  N.contains = N.include = function (P, O) {
    if (P == null) {
      return false
    }
    if (n && P.indexOf === n) {
      return P.indexOf(O) != -1
    }
    return B(P, function (Q) {
      return Q === O
    })
  };
  N.invoke = function (Q, R) {
    var O = o.call(arguments, 2);
    var P = N.isFunction(R);
    return N.map(Q, function (S) {
      return (P ? R : S[R]).apply(S, O)
    })
  };
  N.pluck = function (P, O) {
    return N.map(P, function (Q) {
      return Q[O]
    })
  };
  N.where = function (P, O, Q) {
    if (N.isEmpty(O)) {
      return Q ? void 0 : []
    }
    return N[Q ? "find" : "filter"](P, function (S) {
      for (var R in O) {
        if (O[R] !== S[R]) {
          return false
        }
      }
      return true
    })
  };
  N.findWhere = function (P, O) {
    return N.where(P, O, true)
  };
  N.max = function (R, Q, P) {
    if (!Q && N.isArray(R) && R[0] === +R[0] && R.length < 65535) {
      return Math.max.apply(Math, R)
    }
    if (!Q && N.isEmpty(R)) {
      return -Infinity
    }
    var O = {computed: -Infinity, value: -Infinity};
    J(R, function (V, S, U) {
      var T = Q ? Q.call(P, V, S, U) : V;
      T > O.computed && (O = {value: V, computed: T})
    });
    return O.value
  };
  N.min = function (R, Q, P) {
    if (!Q && N.isArray(R) && R[0] === +R[0] && R.length < 65535) {
      return Math.min.apply(Math, R)
    }
    if (!Q && N.isEmpty(R)) {
      return Infinity
    }
    var O = {computed: Infinity, value: Infinity};
    J(R, function (V, S, U) {
      var T = Q ? Q.call(P, V, S, U) : V;
      T < O.computed && (O = {value: V, computed: T})
    });
    return O.value
  };
  N.shuffle = function (R) {
    var Q;
    var P = 0;
    var O = [];
    J(R, function (S) {
      Q = N.random(P++);
      O[P - 1] = O[Q];
      O[Q] = S
    });
    return O
  };
  N.sample = function (P, Q, O) {
    if (arguments.length < 2 || O) {
      return P[N.random(P.length - 1)]
    }
    return N.shuffle(P).slice(0, Math.max(0, Q))
  };
  var a = function (O) {
    return N.isFunction(O) ? O : function (P) {
      return P[O]
    }
  };
  N.sortBy = function (R, Q, O) {
    var P = a(Q);
    return N.pluck(N.map(R, function (U, S, T) {
      return {value: U, index: S, criteria: P.call(O, U, S, T)}
    }).sort(function (V, U) {
      var T = V.criteria;
      var S = U.criteria;
      if (T !== S) {
        if (T > S || T === void 0) {
          return 1
        }
        if (T < S || S === void 0) {
          return -1
        }
      }
      return V.index - U.index
    }), "value")
  };
  var u = function (O) {
    return function (T, S, Q) {
      var P = {};
      var R = S == null ? N.identity : a(S);
      J(T, function (W, U) {
        var V = R.call(Q, W, U, T);
        O(P, V, W)
      });
      return P
    }
  };
  N.groupBy = u(function (O, P, Q) {
    (N.has(O, P) ? O[P] : (O[P] = [])).push(Q)
  });
  N.indexBy = u(function (O, P, Q) {
    O[P] = Q
  });
  N.countBy = u(function (O, P) {
    N.has(O, P) ? O[P]++ : O[P] = 1
  });
  N.sortedIndex = function (V, U, R, Q) {
    R = R == null ? N.identity : a(R);
    var T = R.call(Q, U);
    var O = 0, S = V.length;
    while (O < S) {
      var P = (O + S) >>> 1;
      R.call(Q, V[P]) < T ? O = P + 1 : S = P
    }
    return O
  };
  N.toArray = function (O) {
    if (!O) {
      return []
    }
    if (N.isArray(O)) {
      return o.call(O)
    }
    if (O.length === +O.length) {
      return N.map(O, N.identity)
    }
    return N.values(O)
  };
  N.size = function (O) {
    if (O == null) {
      return 0
    }
    return (O.length === +O.length) ? O.length : N.keys(O).length
  };
  N.first = N.head = N.take = function (Q, P, O) {
    if (Q == null) {
      return void 0
    }
    return (P == null) || O ? Q[0] : o.call(Q, 0, P)
  };
  N.initial = function (Q, P, O) {
    return o.call(Q, 0, Q.length - ((P == null) || O ? 1 : P))
  };
  N.last = function (Q, P, O) {
    if (Q == null) {
      return void 0
    }
    if ((P == null) || O) {
      return Q[Q.length - 1]
    } else {
      return o.call(Q, Math.max(Q.length - P, 0))
    }
  };
  N.rest = N.tail = N.drop = function (Q, P, O) {
    return o.call(Q, (P == null) || O ? 1 : P)
  };
  N.compact = function (O) {
    return N.filter(O, N.identity)
  };
  var y = function (P, Q, O) {
    if (Q && N.every(P, N.isArray)) {
      return z.apply(O, P)
    }
    J(P, function (R) {
      if (N.isArray(R) || N.isArguments(R)) {
        Q ? I.apply(O, R) : y(R, Q, O)
      } else {
        O.push(R)
      }
    });
    return O
  };
  N.flatten = function (P, O) {
    return y(P, O, [])
  };
  N.without = function (O) {
    return N.difference(O, o.call(arguments, 1))
  };
  N.uniq = N.unique = function (U, T, S, R) {
    if (N.isFunction(T)) {
      R = S;
      S = T;
      T = false
    }
    var P = S ? N.map(U, S, R) : U;
    var Q = [];
    var O = [];
    J(P, function (W, V) {
      if (T ? (!V || O[O.length - 1] !== W) : !N.contains(O, W)) {
        O.push(W);
        Q.push(U[V])
      }
    });
    return Q
  };
  N.union = function () {
    return N.uniq(N.flatten(arguments, true))
  };
  N.intersection = function (P) {
    var O = o.call(arguments, 1);
    return N.filter(N.uniq(P), function (Q) {
      return N.every(O, function (R) {
        return N.indexOf(R, Q) >= 0
      })
    })
  };
  N.difference = function (P) {
    var O = z.apply(D, o.call(arguments, 1));
    return N.filter(P, function (Q) {
      return !N.contains(O, Q)
    })
  };
  N.zip = function () {
    var Q = N.max(N.pluck(arguments, "length").concat(0));
    var P = new Array(Q);
    for (var O = 0; O < Q; O++) {
      P[O] = N.pluck(arguments, "" + O)
    }
    return P
  };
  N.object = function (S, P) {
    if (S == null) {
      return {}
    }
    var O = {};
    for (var Q = 0, R = S.length; Q < R; Q++) {
      if (P) {
        O[S[Q]] = P[Q]
      } else {
        O[S[Q][0]] = S[Q][1]
      }
    }
    return O
  };
  N.indexOf = function (S, Q, R) {
    if (S == null) {
      return -1
    }
    var O = 0, P = S.length;
    if (R) {
      if (typeof R == "number") {
        O = (R < 0 ? Math.max(0, P + R) : R)
      } else {
        O = N.sortedIndex(S, Q);
        return S[O] === Q ? O : -1
      }
    }
    if (n && S.indexOf === n) {
      return S.indexOf(Q, R)
    }
    for (; O < P; O++) {
      if (S[O] === Q) {
        return O
      }
    }
    return -1
  };
  N.lastIndexOf = function (S, Q, R) {
    if (S == null) {
      return -1
    }
    var O = R != null;
    if (l && S.lastIndexOf === l) {
      return O ? S.lastIndexOf(Q, R) : S.lastIndexOf(Q)
    }
    var P = (O ? R : S.length);
    while (P--) {
      if (S[P] === Q) {
        return P
      }
    }
    return -1
  };
  N.range = function (T, Q, S) {
    if (arguments.length <= 1) {
      Q = T || 0;
      T = 0
    }
    S = arguments[2] || 1;
    var R = Math.max(Math.ceil((Q - T) / S), 0);
    var O = 0;
    var P = new Array(R);
    while (O < R) {
      P[O++] = T;
      T += S
    }
    return P
  };
  var H = function () {
  };
  N.bind = function (R, P) {
    var O, Q;
    if (G && R.bind === G) {
      return G.apply(R, o.call(arguments, 1))
    }
    if (!N.isFunction(R)) {
      throw new TypeError
    }
    O = o.call(arguments, 2);
    return Q = function () {
      if (!(this instanceof Q)) {
        return R.apply(P, O.concat(o.call(arguments)))
      }
      H.prototype = R.prototype;
      var T = new H;
      H.prototype = null;
      var S = R.apply(T, O.concat(o.call(arguments)));
      if (Object(S) === S) {
        return S
      }
      return T
    }
  };
  N.partial = function (P) {
    var O = o.call(arguments, 1);
    return function () {
      return P.apply(this, O.concat(o.call(arguments)))
    }
  };
  N.bindAll = function (P) {
    var O = o.call(arguments, 1);
    if (O.length === 0) {
      throw new Error("bindAll must be passed function names")
    }
    J(O, function (Q) {
      P[Q] = N.bind(P[Q], P)
    });
    return P
  };
  N.memoize = function (Q, P) {
    var O = {};
    P || (P = N.identity);
    return function () {
      var R = P.apply(this, arguments);
      return N.has(O, R) ? O[R] : (O[R] = Q.apply(this, arguments))
    }
  };
  N.delay = function (P, Q) {
    var O = o.call(arguments, 2);
    return setTimeout(function () {
      return P.apply(null, O)
    }, Q)
  };
  N.defer = function (O) {
    return N.delay.apply(N, [O, 1].concat(o.call(arguments, 1)))
  };
  N.throttle = function (P, R, V) {
    var O, T, W;
    var U = null;
    var S = 0;
    V || (V = {});
    var Q = function () {
      S = V.leading === false ? 0 : new Date;
      U = null;
      W = P.apply(O, T)
    };
    return function () {
      var X = new Date;
      if (!S && V.leading === false) {
        S = X
      }
      var Y = R - (X - S);
      O = this;
      T = arguments;
      if (Y <= 0) {
        clearTimeout(U);
        U = null;
        S = X;
        W = P.apply(O, T)
      } else {
        if (!U && V.trailing !== false) {
          U = setTimeout(Q, Y)
        }
      }
      return W
    }
  };
  N.debounce = function (S, V, P) {
    var U, Q, R, T, O;
    return function () {
      R = this;
      Q = arguments;
      T = new Date();
      var X = function () {
        var Y = (new Date()) - T;
        if (Y < V) {
          U = setTimeout(X, V - Y)
        } else {
          U = null;
          if (!P) {
            O = S.apply(R, Q)
          }
        }
      };
      var W = P && !U;
      if (!U) {
        U = setTimeout(X, V)
      }
      if (W) {
        O = S.apply(R, Q)
      }
      return O
    }
  };
  N.once = function (Q) {
    var O = false, P;
    return function () {
      if (O) {
        return P
      }
      O = true;
      P = Q.apply(this, arguments);
      Q = null;
      return P
    }
  };
  N.wrap = function (O, P) {
    return function () {
      var Q = [O];
      I.apply(Q, arguments);
      return P.apply(this, Q)
    }
  };
  N.compose = function () {
    var O = arguments;
    return function () {
      var P = arguments;
      for (var Q = O.length - 1; Q >= 0; Q--) {
        P = [O[Q].apply(this, P)]
      }
      return P[0]
    }
  };
  N.after = function (P, O) {
    return function () {
      if (--P < 1) {
        return O.apply(this, arguments)
      }
    }
  };
  N.keys = e || function (Q) {
      if (Q !== Object(Q)) {
        throw new TypeError("Invalid object")
      }
      var P = [];
      for (var O in Q) {
        if (N.has(Q, O)) {
          P.push(O)
        }
      }
      return P
    };
  N.values = function (S) {
    var R = N.keys(S);
    var Q = R.length;
    var O = new Array(Q);
    for (var P = 0; P < Q; P++) {
      O[P] = S[R[P]]
    }
    return O
  };
  N.pairs = function (S) {
    var Q = N.keys(S);
    var P = Q.length;
    var R = new Array(P);
    for (var O = 0; O < P; O++) {
      R[O] = [Q[O], S[Q[O]]]
    }
    return R
  };
  N.invert = function (S) {
    var O = {};
    var R = N.keys(S);
    for (var P = 0, Q = R.length; P < Q; P++) {
      O[S[R[P]]] = R[P]
    }
    return O
  };
  N.functions = N.methods = function (Q) {
    var P = [];
    for (var O in Q) {
      if (N.isFunction(Q[O])) {
        P.push(O)
      }
    }
    return P.sort()
  };
  N.extend = function (O) {
    J(o.call(arguments, 1), function (P) {
      if (P) {
        for (var Q in P) {
          O[Q] = P[Q]
        }
      }
    });
    return O
  };
  N.pick = function (P) {
    var Q = {};
    var O = z.apply(D, o.call(arguments, 1));
    J(O, function (R) {
      if (R in P) {
        Q[R] = P[R]
      }
    });
    return Q
  };
  N.omit = function (Q) {
    var R = {};
    var P = z.apply(D, o.call(arguments, 1));
    for (var O in Q) {
      if (!N.contains(P, O)) {
        R[O] = Q[O]
      }
    }
    return R
  };
  N.defaults = function (O) {
    J(o.call(arguments, 1), function (P) {
      if (P) {
        for (var Q in P) {
          if (O[Q] === void 0) {
            O[Q] = P[Q]
          }
        }
      }
    });
    return O
  };
  N.clone = function (O) {
    if (!N.isObject(O)) {
      return O
    }
    return N.isArray(O) ? O.slice() : N.extend({}, O)
  };
  N.tap = function (P, O) {
    O(P);
    return P
  };
  var K = function (V, U, P, Q) {
    if (V === U) {
      return V !== 0 || 1 / V == 1 / U
    }
    if (V == null || U == null) {
      return V === U
    }
    if (V instanceof N) {
      V = V._wrapped
    }
    if (U instanceof N) {
      U = U._wrapped
    }
    var S = d.call(V);
    if (S != d.call(U)) {
      return false
    }
    switch (S) {
      case"[object String]":
        return V == String(U);
      case"[object Number]":
        return V != +V ? U != +U : (V == 0 ? 1 / V == 1 / U : V == +U);
      case"[object Date]":
      case"[object Boolean]":
        return +V == +U;
      case"[object RegExp]":
        return V.source == U.source && V.global == U.global && V.multiline == U.multiline && V.ignoreCase == U.ignoreCase
    }
    if (typeof V != "object" || typeof U != "object") {
      return false
    }
    var O = P.length;
    while (O--) {
      if (P[O] == V) {
        return Q[O] == U
      }
    }
    var T = V.constructor, R = U.constructor;
    if (T !== R && !(N.isFunction(T) && (T instanceof T) && N.isFunction(R) && (R instanceof R))) {
      return false
    }
    P.push(V);
    Q.push(U);
    var Y = 0, X = true;
    if (S == "[object Array]") {
      Y = V.length;
      X = Y == U.length;
      if (X) {
        while (Y--) {
          if (!(X = K(V[Y], U[Y], P, Q))) {
            break
          }
        }
      }
    } else {
      for (var W in V) {
        if (N.has(V, W)) {
          Y++;
          if (!(X = N.has(U, W) && K(V[W], U[W], P, Q))) {
            break
          }
        }
      }
      if (X) {
        for (W in U) {
          if (N.has(U, W) && !(Y--)) {
            break
          }
        }
        X = !Y
      }
    }
    P.pop();
    Q.pop();
    return X
  };
  N.isEqual = function (P, O) {
    return K(P, O, [], [])
  };
  N.isEmpty = function (P) {
    if (P == null) {
      return true
    }
    if (N.isArray(P) || N.isString(P)) {
      return P.length === 0
    }
    for (var O in P) {
      if (N.has(P, O)) {
        return false
      }
    }
    return true
  };
  N.isElement = function (O) {
    return !!(O && O.nodeType === 1)
  };
  N.isArray = v || function (O) {
      return d.call(O) == "[object Array]"
    };
  N.isObject = function (O) {
    return O === Object(O)
  };
  J(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (O) {
    N["is" + O] = function (P) {
      return d.call(P) == "[object " + O + "]"
    }
  });
  if (!N.isArguments(arguments)) {
    N.isArguments = function (O) {
      return !!(O && N.has(O, "callee"))
    }
  }
  if (typeof(/./) !== "function") {
    N.isFunction = function (O) {
      return typeof O === "function"
    }
  }
  N.isFinite = function (O) {
    return isFinite(O) && !isNaN(parseFloat(O))
  };
  N.isNaN = function (O) {
    return N.isNumber(O) && O != +O
  };
  N.isBoolean = function (O) {
    return O === true || O === false || d.call(O) == "[object Boolean]"
  };
  N.isNull = function (O) {
    return O === null
  };
  N.isUndefined = function (O) {
    return O === void 0
  };
  N.has = function (P, O) {
    return j.call(P, O)
  };
  N.noConflict = function () {
    x._ = k;
    return this
  };
  N.identity = function (O) {
    return O
  };
  N.times = function (S, R, Q) {
    var O = Array(Math.max(0, S));
    for (var P = 0; P < S; P++) {
      O[P] = R.call(Q, P)
    }
    return O
  };
  N.random = function (P, O) {
    if (O == null) {
      O = P;
      P = 0
    }
    return P + Math.floor(Math.random() * (O - P + 1))
  };
  var m = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
  m.unescape = N.invert(m.escape);
  var L = {
    escape: new RegExp("[" + N.keys(m.escape).join("") + "]", "g"),
    unescape: new RegExp("(" + N.keys(m.unescape).join("|") + ")", "g")
  };
  N.each(["escape", "unescape"], function (O) {
    N[O] = function (P) {
      if (P == null) {
        return ""
      }
      return ("" + P).replace(L[O], function (Q) {
        return m[O][Q]
      })
    }
  });
  N.result = function (O, Q) {
    if (O == null) {
      return void 0
    }
    var P = O[Q];
    return N.isFunction(P) ? P.call(O) : P
  };
  N.mixin = function (O) {
    J(N.functions(O), function (P) {
      var Q = N[P] = O[P];
      N.prototype[P] = function () {
        var R = [this._wrapped];
        I.apply(R, arguments);
        return t.call(this, Q.apply(N, R))
      }
    })
  };
  var A = 0;
  N.uniqueId = function (O) {
    var P = ++A + "";
    return O ? O + P : P
  };
  N.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
  var w = /(.)^/;
  var h = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\t": "t", "\u2028": "u2028", "\u2029": "u2029"};
  var i = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  N.template = function (W, R, Q) {
    var P;
    Q = N.defaults({}, Q, N.templateSettings);
    var S = new RegExp([(Q.escape || w).source, (Q.interpolate || w).source, (Q.evaluate || w).source].join("|") + "|$", "g");
    var T = 0;
    var O = "__p+='";
    W.replace(S, function (Y, Z, X, ab, aa) {
      O += W.slice(T, aa).replace(i, function (ac) {
        return "\\" + h[ac]
      });
      if (Z) {
        O += "'+\n((__t=(" + Z + "))==null?'':_.escape(__t))+\n'"
      }
      if (X) {
        O += "'+\n((__t=(" + X + "))==null?'':__t)+\n'"
      }
      if (ab) {
        O += "';\n" + ab + "\n__p+='"
      }
      T = aa + Y.length;
      return Y
    });
    O += "';\n";
    if (!Q.variable) {
      O = "with(obj||{}){\n" + O + "}\n"
    }
    O = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + O + "return __p;\n";
    try {
      P = new Function(Q.variable || "obj", "_", O)
    } catch (U) {
      U.source = O;
      throw U
    }
    if (R) {
      return P(R, N)
    }
    var V = function (X) {
      return P.call(this, X, N)
    };
    V.source = "function(" + (Q.variable || "obj") + "){\n" + O + "}";
    return V
  };
  N.chain = function (O) {
    return N(O).chain()
  };
  var t = function (O) {
    return this._chain ? N(O).chain() : O
  };
  N.mixin(N);
  J(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (O) {
    var P = D[O];
    N.prototype[O] = function () {
      var Q = this._wrapped;
      P.apply(Q, arguments);
      if ((O == "shift" || O == "splice") && Q.length === 0) {
        delete Q[0]
      }
      return t.call(this, Q)
    }
  });
  J(["concat", "join", "slice"], function (O) {
    var P = D[O];
    N.prototype[O] = function () {
      return t.call(this, P.apply(this._wrapped, arguments))
    }
  });
  N.extend(N.prototype, {
    chain: function () {
      this._chain = true;
      return this
    }, value: function () {
      return this._wrapped
    }
  })
}).call(this);
Date.CultureInfo = {
  name: "en-US",
  englishName: "English (United States)",
  nativeName: "English (United States)",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  amDesignator: "AM",
  pmDesignator: "PM",
  firstDayOfWeek: 0,
  twoDigitYearMax: 2029,
  dateElementOrder: "mdy",
  formatPatterns: {
    shortDate: "M/d/yyyy",
    longDate: "dddd, MMMM dd, yyyy",
    shortTime: "h:mm tt",
    longTime: "h:mm:ss tt",
    fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
    sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
    universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
    rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
    monthDay: "MMMM dd",
    yearMonth: "MMMM, yyyy"
  },
  regexPatterns: {
    jan: /^jan(uary)?/i,
    feb: /^feb(ruary)?/i,
    mar: /^mar(ch)?/i,
    apr: /^apr(il)?/i,
    may: /^may/i,
    jun: /^jun(e)?/i,
    jul: /^jul(y)?/i,
    aug: /^aug(ust)?/i,
    sep: /^sep(t(ember)?)?/i,
    oct: /^oct(ober)?/i,
    nov: /^nov(ember)?/i,
    dec: /^dec(ember)?/i,
    sun: /^su(n(day)?)?/i,
    mon: /^mo(n(day)?)?/i,
    tue: /^tu(e(s(day)?)?)?/i,
    wed: /^we(d(nesday)?)?/i,
    thu: /^th(u(r(s(day)?)?)?)?/i,
    fri: /^fr(i(day)?)?/i,
    sat: /^sa(t(urday)?)?/i,
    future: /^next/i,
    past: /^last|past|prev(ious)?/i,
    add: /^(\+|aft(er)?|from|hence)/i,
    subtract: /^(\-|bef(ore)?|ago)/i,
    yesterday: /^yes(terday)?/i,
    today: /^t(od(ay)?)?/i,
    tomorrow: /^tom(orrow)?/i,
    now: /^n(ow)?/i,
    millisecond: /^ms|milli(second)?s?/i,
    second: /^sec(ond)?s?/i,
    minute: /^mn|min(ute)?s?/i,
    hour: /^h(our)?s?/i,
    week: /^w(eek)?s?/i,
    month: /^m(onth)?s?/i,
    day: /^d(ay)?s?/i,
    year: /^y(ear)?s?/i,
    shortMeridian: /^(a|p)/i,
    longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
    timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
    ordinalSuffix: /^\s*(st|nd|rd|th)/i,
    timeContext: /^\s*(\:|a(?!u|p)|p)/i
  },
  timezones: [{name: "UTC", offset: "-000"}, {name: "GMT", offset: "-000"}, {
    name: "EST",
    offset: "-0500"
  }, {name: "EDT", offset: "-0400"}, {name: "CST", offset: "-0600"}, {name: "CDT", offset: "-0500"}, {
    name: "MST",
    offset: "-0700"
  }, {name: "MDT", offset: "-0600"}, {name: "PST", offset: "-0800"}, {name: "PDT", offset: "-0700"}]
};
(function () {
  var b = Date, a = b.prototype, d = b.CultureInfo, g = function (i, h) {
    if (!h) {
      h = 2
    }
    return ("000" + i).slice(h * -1)
  };
  a.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this
  };
  a.setTimeToNow = function () {
    var h = new Date();
    this.setHours(h.getHours());
    this.setMinutes(h.getMinutes());
    this.setSeconds(h.getSeconds());
    this.setMilliseconds(h.getMilliseconds());
    return this
  };
  b.today = function () {
    return new Date().clearTime()
  };
  b.compare = function (i, h) {
    if (isNaN(i) || isNaN(h)) {
      throw new Error(i + " - " + h)
    } else {
      if (i instanceof Date && h instanceof Date) {
        return (i < h) ? -1 : (i > h) ? 1 : 0
      } else {
        throw new TypeError(i + " - " + h)
      }
    }
  };
  b.equals = function (i, h) {
    return (i.compareTo(h) === 0)
  };
  b.getDayNumberFromName = function (j) {
    var q = d.dayNames, h = d.abbreviatedDayNames, p = d.shortestDayNames, l = j.toLowerCase();
    for (var k = 0; k < q.length; k++) {
      if (q[k].toLowerCase() == l || h[k].toLowerCase() == l || p[k].toLowerCase() == l) {
        return k
      }
    }
    return -1
  };
  b.getMonthNumberFromName = function (j) {
    var o = d.monthNames, h = d.abbreviatedMonthNames, l = j.toLowerCase();
    for (var k = 0; k < o.length; k++) {
      if (o[k].toLowerCase() == l || h[k].toLowerCase() == l) {
        return k
      }
    }
    return -1
  };
  b.isLeapYear = function (h) {
    return ((h % 4 === 0 && h % 100 !== 0) || h % 400 === 0)
  };
  b.getDaysInMonth = function (h, i) {
    return [31, (b.isLeapYear(h) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i]
  };
  b.getTimezoneAbbreviation = function (l) {
    var k = d.timezones, j;
    for (var h = 0; h < k.length; h++) {
      if (k[h].offset === l) {
        return k[h].name
      }
    }
    return null
  };
  b.getTimezoneOffset = function (h) {
    var l = d.timezones, k;
    for (var j = 0; j < l.length; j++) {
      if (l[j].name === h.toUpperCase()) {
        return l[j].offset
      }
    }
    return null
  };
  a.clone = function () {
    return new Date(this.getTime())
  };
  a.compareTo = function (h) {
    return Date.compare(this, h)
  };
  a.equals = function (h) {
    return Date.equals(this, h || new Date())
  };
  a.between = function (i, h) {
    return this.getTime() >= i.getTime() && this.getTime() <= h.getTime()
  };
  a.isAfter = function (h) {
    return this.compareTo(h || new Date()) === 1
  };
  a.isBefore = function (h) {
    return (this.compareTo(h || new Date()) === -1)
  };
  a.isToday = function () {
    return this.isSameDay(new Date())
  };
  a.isSameDay = function (h) {
    return this.clone().clearTime().equals(h.clone().clearTime())
  };
  a.addMilliseconds = function (h) {
    this.setMilliseconds(this.getMilliseconds() + h);
    return this
  };
  a.addSeconds = function (h) {
    return this.addMilliseconds(h * 1000)
  };
  a.addMinutes = function (h) {
    return this.addMilliseconds(h * 60000)
  };
  a.addHours = function (h) {
    return this.addMilliseconds(h * 3600000)
  };
  a.addDays = function (h) {
    this.setDate(this.getDate() + h);
    return this
  };
  a.addWeeks = function (h) {
    return this.addDays(h * 7)
  };
  a.addMonths = function (h) {
    var i = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + h);
    this.setDate(Math.min(i, b.getDaysInMonth(this.getFullYear(), this.getMonth())));
    return this
  };
  a.addYears = function (h) {
    return this.addMonths(h * 12)
  };
  a.add = function (i) {
    if (typeof i == "number") {
      this._orient = i;
      return this
    }
    var h = i;
    if (h.milliseconds) {
      this.addMilliseconds(h.milliseconds)
    }
    if (h.seconds) {
      this.addSeconds(h.seconds)
    }
    if (h.minutes) {
      this.addMinutes(h.minutes)
    }
    if (h.hours) {
      this.addHours(h.hours)
    }
    if (h.weeks) {
      this.addWeeks(h.weeks)
    }
    if (h.months) {
      this.addMonths(h.months)
    }
    if (h.years) {
      this.addYears(h.years)
    }
    if (h.days) {
      this.addDays(h.days)
    }
    return this
  };
  var e, f, c;
  a.getWeek = function () {
    var p, o, m, l, k, j, i, h, t, q;
    e = (!e) ? this.getFullYear() : e;
    f = (!f) ? this.getMonth() + 1 : f;
    c = (!c) ? this.getDate() : c;
    if (f <= 2) {
      p = e - 1;
      o = (p / 4 | 0) - (p / 100 | 0) + (p / 400 | 0);
      m = ((p - 1) / 4 | 0) - ((p - 1) / 100 | 0) + ((p - 1) / 400 | 0);
      t = o - m;
      k = 0;
      j = c - 1 + (31 * (f - 1))
    } else {
      p = e;
      o = (p / 4 | 0) - (p / 100 | 0) + (p / 400 | 0);
      m = ((p - 1) / 4 | 0) - ((p - 1) / 100 | 0) + ((p - 1) / 400 | 0);
      t = o - m;
      k = t + 1;
      j = c + ((153 * (f - 3) + 2) / 5) + 58 + t
    }
    i = (p + o) % 7;
    l = (j + i - k) % 7;
    h = (j + 3 - l) | 0;
    if (h < 0) {
      q = 53 - ((i - t) / 5 | 0)
    } else {
      if (h > 364 + t) {
        q = 1
      } else {
        q = (h / 7 | 0) + 1
      }
    }
    e = f = c = null;
    return q
  };
  a.getISOWeek = function () {
    e = this.getUTCFullYear();
    f = this.getUTCMonth() + 1;
    c = this.getUTCDate();
    return g(this.getWeek())
  };
  a.setWeek = function (h) {
    return this.moveToDayOfWeek(1).addWeeks(h - this.getWeek())
  };
  b._validate = function (k, j, h, i) {
    if (typeof k == "undefined") {
      return false
    } else {
      if (typeof k != "number") {
        throw new TypeError(k + " is not a Number.")
      } else {
        if (k < j || k > h) {
          throw new RangeError(k + " is not a valid value for " + i + ".")
        }
      }
    }
    return true
  };
  b.validateMillisecond = function (h) {
    return b._validate(h, 0, 999, "millisecond")
  };
  b.validateSecond = function (h) {
    return b._validate(h, 0, 59, "second")
  };
  b.validateMinute = function (h) {
    return b._validate(h, 0, 59, "minute")
  };
  b.validateHour = function (h) {
    return b._validate(h, 0, 23, "hour")
  };
  b.validateDay = function (i, h, j) {
    return b._validate(i, 1, b.getDaysInMonth(h, j), "day")
  };
  b.validateMonth = function (h) {
    return b._validate(h, 0, 11, "month")
  };
  b.validateYear = function (h) {
    return b._validate(h, 0, 9999, "year")
  };
  a.set = function (h) {
    if (b.validateMillisecond(h.millisecond)) {
      this.addMilliseconds(h.millisecond - this.getMilliseconds())
    }
    if (b.validateSecond(h.second)) {
      this.addSeconds(h.second - this.getSeconds())
    }
    if (b.validateMinute(h.minute)) {
      this.addMinutes(h.minute - this.getMinutes())
    }
    if (b.validateHour(h.hour)) {
      this.addHours(h.hour - this.getHours())
    }
    if (b.validateMonth(h.month)) {
      this.addMonths(h.month - this.getMonth())
    }
    if (b.validateYear(h.year)) {
      this.addYears(h.year - this.getFullYear())
    }
    if (b.validateDay(h.day, this.getFullYear(), this.getMonth())) {
      this.addDays(h.day - this.getDate())
    }
    if (h.timezone) {
      this.setTimezone(h.timezone)
    }
    if (h.timezoneOffset) {
      this.setTimezoneOffset(h.timezoneOffset)
    }
    if (h.week && b._validate(h.week, 0, 53, "week")) {
      this.setWeek(h.week)
    }
    return this
  };
  a.moveToFirstDayOfMonth = function () {
    return this.set({day: 1})
  };
  a.moveToLastDayOfMonth = function () {
    return this.set({day: b.getDaysInMonth(this.getFullYear(), this.getMonth())})
  };
  a.moveToNthOccurrence = function (i, j) {
    var h = 0;
    if (j > 0) {
      h = j - 1
    } else {
      if (j === -1) {
        this.moveToLastDayOfMonth();
        if (this.getDay() !== i) {
          this.moveToDayOfWeek(i, -1)
        }
        return this
      }
    }
    return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(i, +1).addWeeks(h)
  };
  a.moveToDayOfWeek = function (h, i) {
    var j = (h - this.getDay() + 7 * (i || +1)) % 7;
    return this.addDays((j === 0) ? j += 7 * (i || +1) : j)
  };
  a.moveToMonth = function (j, h) {
    var i = (j - this.getMonth() + 12 * (h || +1)) % 12;
    return this.addMonths((i === 0) ? i += 12 * (h || +1) : i)
  };
  a.getOrdinalNumber = function () {
    return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1
  };
  a.getTimezone = function () {
    return b.getTimezoneAbbreviation(this.getUTCOffset())
  };
  a.setTimezoneOffset = function (j) {
    var h = this.getTimezoneOffset(), i = Number(j) * -6 / 10;
    return this.addMinutes(i - h)
  };
  a.setTimezone = function (h) {
    return this.setTimezoneOffset(b.getTimezoneOffset(h))
  };
  a.hasDaylightSavingTime = function () {
    return (Date.today().set({month: 0, day: 1}).getTimezoneOffset() !== Date.today().set({
      month: 6,
      day: 1
    }).getTimezoneOffset())
  };
  a.isDaylightSavingTime = function () {
    return (this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({
      month: 6,
      day: 1
    }).getTimezoneOffset())
  };
  a.getUTCOffset = function () {
    var i = this.getTimezoneOffset() * -10 / 6, h;
    if (i < 0) {
      h = (i - 10000).toString();
      return h.charAt(0) + h.substr(2)
    } else {
      h = (i + 10000).toString();
      return "+" + h.substr(1)
    }
  };
  a.getElapsed = function (h) {
    return (h || new Date()) - this
  };
  if (!a.toISOString) {
    a.toISOString = function () {
      function h(i) {
        return i < 10 ? "0" + i : i
      }

      return '"' + this.getUTCFullYear() + "-" + h(this.getUTCMonth() + 1) + "-" + h(this.getUTCDate()) + "T" + h(this.getUTCHours()) + ":" + h(this.getUTCMinutes()) + ":" + h(this.getUTCSeconds()) + 'Z"'
    }
  }
  a._toString = a.toString;
  a.toString = function (j) {
    var h = this;
    if (j && j.length == 1) {
      var k = d.formatPatterns;
      h.t = h.toString;
      switch (j) {
        case"d":
          return h.t(k.shortDate);
        case"D":
          return h.t(k.longDate);
        case"F":
          return h.t(k.fullDateTime);
        case"m":
          return h.t(k.monthDay);
        case"r":
          return h.t(k.rfc1123);
        case"s":
          return h.t(k.sortableDateTime);
        case"t":
          return h.t(k.shortTime);
        case"T":
          return h.t(k.longTime);
        case"u":
          return h.t(k.universalSortableDateTime);
        case"y":
          return h.t(k.yearMonth)
      }
    }
    var i = function (l) {
      switch (l * 1) {
        case 1:
        case 21:
        case 31:
          return "st";
        case 2:
        case 22:
          return "nd";
        case 3:
        case 23:
          return "rd";
        default:
          return "th"
      }
    };
    return j ? j.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function (l) {
      if (l.charAt(0) === "\\") {
        return l.replace("\\", "")
      }
      h.h = h.getHours;
      switch (l) {
        case"hh":
          return g(h.h() < 13 ? (h.h() === 0 ? 12 : h.h()) : (h.h() - 12));
        case"h":
          return h.h() < 13 ? (h.h() === 0 ? 12 : h.h()) : (h.h() - 12);
        case"HH":
          return g(h.h());
        case"H":
          return h.h();
        case"mm":
          return g(h.getMinutes());
        case"m":
          return h.getMinutes();
        case"ss":
          return g(h.getSeconds());
        case"s":
          return h.getSeconds();
        case"yyyy":
          return g(h.getFullYear(), 4);
        case"yy":
          return g(h.getFullYear());
        case"dddd":
          return d.dayNames[h.getDay()];
        case"ddd":
          return d.abbreviatedDayNames[h.getDay()];
        case"dd":
          return g(h.getDate());
        case"d":
          return h.getDate();
        case"MMMM":
          return d.monthNames[h.getMonth()];
        case"MMM":
          return d.abbreviatedMonthNames[h.getMonth()];
        case"MM":
          return g((h.getMonth() + 1));
        case"M":
          return h.getMonth() + 1;
        case"t":
          return h.h() < 12 ? d.amDesignator.substring(0, 1) : d.pmDesignator.substring(0, 1);
        case"tt":
          return h.h() < 12 ? d.amDesignator : d.pmDesignator;
        case"S":
          return i(h.getDate());
        default:
          return l
      }
    }) : this._toString()
  }
}());
(function () {
  var v = Date, g = v.prototype, w = v.CultureInfo, o = Number.prototype;
  g._orient = +1;
  g._nth = null;
  g._is = false;
  g._same = false;
  g._isSecond = false;
  o._dateElement = "day";
  g.next = function () {
    this._orient = +1;
    return this
  };
  v.next = function () {
    return v.today().next()
  };
  g.last = g.prev = g.previous = function () {
    this._orient = -1;
    return this
  };
  v.last = v.prev = v.previous = function () {
    return v.today().last()
  };
  g.is = function () {
    this._is = true;
    return this
  };
  g.same = function () {
    this._same = true;
    this._isSecond = false;
    return this
  };
  g.today = function () {
    return this.same().day()
  };
  g.weekday = function () {
    if (this._is) {
      this._is = false;
      return (!this.is().sat() && !this.is().sun())
    }
    return false
  };
  g.at = function (i) {
    return (typeof i === "string") ? v.parse(this.toString("d") + " " + i) : this.set(i)
  };
  o.fromNow = o.after = function (i) {
    var j = {};
    j[this._dateElement] = this;
    return ((!i) ? new Date() : i.clone()).add(j)
  };
  o.ago = o.before = function (i) {
    var j = {};
    j[this._dateElement] = this * -1;
    return ((!i) ? new Date() : i.clone()).add(j)
  };
  var e = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/), h = ("january february march april may june july august september october november december").split(/\s/), n = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/), p = ("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/), b = ("final first second third fourth fifth").split(/\s/), y;
  g.toObject = function () {
    var k = {};
    for (var j = 0; j < n.length; j++) {
      k[n[j].toLowerCase()] = this["get" + p[j]]()
    }
    return k
  };
  v.fromObject = function (i) {
    i.week = null;
    return Date.today().set(i)
  };
  var x = function (i) {
    return function () {
      if (this._is) {
        this._is = false;
        return this.getDay() == i
      }
      if (this._nth !== null) {
        if (this._isSecond) {
          this.addSeconds(this._orient * -1)
        }
        this._isSecond = false;
        var k = this._nth;
        this._nth = null;
        var j = this.clone().moveToLastDayOfMonth();
        this.moveToNthOccurrence(i, k);
        if (this > j) {
          throw new RangeError(v.getDayName(i) + " does not occur " + k + " times in the month of " + v.getMonthName(j.getMonth()) + " " + j.getFullYear() + ".")
        }
        return this
      }
      return this.moveToDayOfWeek(i, this._orient)
    }
  };
  var f = function (i) {
    return function () {
      var k = v.today(), j = i - k.getDay();
      if (i === 0 && w.firstDayOfWeek === 1 && k.getDay() !== 0) {
        j = j + 7
      }
      return k.addDays(j)
    }
  };
  for (var u = 0; u < e.length; u++) {
    v[e[u].toUpperCase()] = v[e[u].toUpperCase().substring(0, 3)] = u;
    v[e[u]] = v[e[u].substring(0, 3)] = f(u);
    g[e[u]] = g[e[u].substring(0, 3)] = x(u)
  }
  var z = function (i) {
    return function () {
      if (this._is) {
        this._is = false;
        return this.getMonth() === i
      }
      return this.moveToMonth(i, this._orient)
    }
  };
  var m = function (i) {
    return function () {
      return v.today().set({month: i, day: 1})
    }
  };
  for (var t = 0; t < h.length; t++) {
    v[h[t].toUpperCase()] = v[h[t].toUpperCase().substring(0, 3)] = t;
    v[h[t]] = v[h[t].substring(0, 3)] = m(t);
    g[h[t]] = g[h[t].substring(0, 3)] = z(t)
  }
  var c = function (i) {
    return function () {
      if (this._isSecond) {
        this._isSecond = false;
        return this
      }
      if (this._same) {
        this._same = this._is = false;
        var C = this.toObject(), B = (arguments[0] || new Date()).toObject(), A = "", l = i.toLowerCase();
        for (var j = (n.length - 1); j > -1; j--) {
          A = n[j].toLowerCase();
          if (C[A] != B[A]) {
            return false
          }
          if (l == A) {
            break
          }
        }
        return true
      }
      if (i.substring(i.length - 1) != "s") {
        i += "s"
      }
      return this["add" + i](this._orient)
    }
  };
  var d = function (i) {
    return function () {
      this._dateElement = i;
      return this
    }
  };
  for (var s = 0; s < n.length; s++) {
    y = n[s].toLowerCase();
    g[y] = g[y + "s"] = c(n[s]);
    o[y] = o[y + "s"] = d(y)
  }
  g._ss = c("Second");
  var a = function (i) {
    return function (j) {
      if (this._same) {
        return this._ss(arguments[0])
      }
      if (j || j === 0) {
        return this.moveToNthOccurrence(j, i)
      }
      this._nth = i;
      if (i === 2 && (j === undefined || j === null)) {
        this._isSecond = true;
        return this.addSeconds(this._orient)
      }
      return this
    }
  };
  for (var q = 0; q < b.length; q++) {
    g[b[q]] = (q === 0) ? a(-1) : a(q)
  }
}());
(function () {
  Date.Parsing = {
    Exception: function (i) {
      this.message = "Parse error at '" + i.substring(0, 10) + " ...'"
    }
  };
  var a = Date.Parsing;
  var c = a.Operators = {
    rtoken: function (i) {
      return function (j) {
        var k = j.match(i);
        if (k) {
          return ([k[0], j.substring(k[0].length)])
        } else {
          throw new a.Exception(j)
        }
      }
    }, token: function (i) {
      return function (j) {
        return c.rtoken(new RegExp("^s*" + j + "s*"))(j)
      }
    }, stoken: function (i) {
      return c.rtoken(new RegExp("^" + i))
    }, until: function (i) {
      return function (j) {
        var k = [], m = null;
        while (j.length) {
          try {
            m = i.call(this, j)
          } catch (l) {
            k.push(m[0]);
            j = m[1];
            continue
          }
          break
        }
        return [k, j]
      }
    }, many: function (i) {
      return function (j) {
        var m = [], k = null;
        while (j.length) {
          try {
            k = i.call(this, j)
          } catch (l) {
            return [m, j]
          }
          m.push(k[0]);
          j = k[1]
        }
        return [m, j]
      }
    }, optional: function (i) {
      return function (j) {
        var k = null;
        try {
          k = i.call(this, j)
        } catch (l) {
          return [null, j]
        }
        return [k[0], k[1]]
      }
    }, not: function (i) {
      return function (j) {
        try {
          i.call(this, j)
        } catch (k) {
          return [null, j]
        }
        throw new a.Exception(j)
      }
    }, ignore: function (i) {
      return i ? function (j) {
        var k = null;
        k = i.call(this, j);
        return [null, k[1]]
      } : null
    }, product: function () {
      var k = arguments[0], l = Array.prototype.slice.call(arguments, 1), m = [];
      for (var j = 0; j < k.length; j++) {
        m.push(c.each(k[j], l))
      }
      return m
    }, cache: function (k) {
      var i = {}, j = null;
      return function (l) {
        try {
          j = i[l] = (i[l] || k.call(this, l))
        } catch (m) {
          j = i[l] = m
        }
        if (j instanceof a.Exception) {
          throw j
        } else {
          return j
        }
      }
    }, any: function () {
      var i = arguments;
      return function (k) {
        var l = null;
        for (var j = 0; j < i.length; j++) {
          if (i[j] == null) {
            continue
          }
          try {
            l = (i[j].call(this, k))
          } catch (m) {
            l = null
          }
          if (l) {
            return l
          }
        }
        throw new a.Exception(k)
      }
    }, each: function () {
      var i = arguments;
      return function (k) {
        var n = [], l = null;
        for (var j = 0; j < i.length; j++) {
          if (i[j] == null) {
            continue
          }
          try {
            l = (i[j].call(this, k))
          } catch (m) {
            throw new a.Exception(k)
          }
          n.push(l[0]);
          k = l[1]
        }
        return [n, k]
      }
    }, all: function () {
      var j = arguments, i = i;
      return i.each(i.optional(j))
    }, sequence: function (i, j, k) {
      j = j || c.rtoken(/^\s*/);
      k = k || null;
      if (i.length == 1) {
        return i[0]
      }
      return function (o) {
        var p = null, t = null;
        var v = [];
        for (var n = 0; n < i.length; n++) {
          try {
            p = i[n].call(this, o)
          } catch (u) {
            break
          }
          v.push(p[0]);
          try {
            t = j.call(this, p[1])
          } catch (m) {
            t = null;
            break
          }
          o = t[1]
        }
        if (!p) {
          throw new a.Exception(o)
        }
        if (t) {
          throw new a.Exception(t[1])
        }
        if (k) {
          try {
            p = k.call(this, p[1])
          } catch (l) {
            throw new a.Exception(p[1])
          }
        }
        return [v, (p ? p[1] : o)]
      }
    }, between: function (j, k, i) {
      i = i || j;
      var l = c.each(c.ignore(j), k, c.ignore(i));
      return function (m) {
        var n = l.call(this, m);
        return [[n[0][0], r[0][2]], n[1]]
      }
    }, list: function (i, j, k) {
      j = j || c.rtoken(/^\s*/);
      k = k || null;
      return (i instanceof Array ? c.each(c.product(i.slice(0, -1), c.ignore(j)), i.slice(-1), c.ignore(k)) : c.each(c.many(c.each(i, c.ignore(j))), px, c.ignore(k)))
    }, set: function (i, j, k) {
      j = j || c.rtoken(/^\s*/);
      k = k || null;
      return function (B) {
        var l = null, n = null, m = null, o = null, t = [[], B], A = false;
        for (var v = 0; v < i.length; v++) {
          m = null;
          n = null;
          l = null;
          A = (i.length == 1);
          try {
            l = i[v].call(this, B)
          } catch (y) {
            continue
          }
          o = [[l[0]], l[1]];
          if (l[1].length > 0 && !A) {
            try {
              m = j.call(this, l[1])
            } catch (z) {
              A = true
            }
          } else {
            A = true
          }
          if (!A && m[1].length === 0) {
            A = true
          }
          if (!A) {
            var w = [];
            for (var u = 0; u < i.length; u++) {
              if (v != u) {
                w.push(i[u])
              }
            }
            n = c.set(w, j).call(this, m[1]);
            if (n[0].length > 0) {
              o[0] = o[0].concat(n[0]);
              o[1] = n[1]
            }
          }
          if (o[1].length < t[1].length) {
            t = o
          }
          if (t[1].length === 0) {
            break
          }
        }
        if (t[0].length === 0) {
          return t
        }
        if (k) {
          try {
            m = k.call(this, t[1])
          } catch (x) {
            throw new a.Exception(t[1])
          }
          t[1] = m[1]
        }
        return t
      }
    }, forward: function (i, j) {
      return function (k) {
        return i[j].call(this, k)
      }
    }, replace: function (j, i) {
      return function (k) {
        var l = j.call(this, k);
        return [i, l[1]]
      }
    }, process: function (j, i) {
      return function (k) {
        var l = j.call(this, k);
        return [i.call(this, l[0]), l[1]]
      }
    }, min: function (i, j) {
      return function (k) {
        var l = j.call(this, k);
        if (l[0].length < i) {
          throw new a.Exception(k)
        }
        return l
      }
    }
  };
  var h = function (i) {
    return function () {
      var j = null, m = [];
      if (arguments.length > 1) {
        j = Array.prototype.slice.call(arguments)
      } else {
        if (arguments[0] instanceof Array) {
          j = arguments[0]
        }
      }
      if (j) {
        for (var l = 0, k = j.shift(); l < k.length; l++) {
          j.unshift(k[l]);
          m.push(i.apply(null, j));
          j.shift();
          return m
        }
      } else {
        return i.apply(null, arguments)
      }
    }
  };
  var g = "optional not ignore cache".split(/\s/);
  for (var d = 0; d < g.length; d++) {
    c[g[d]] = h(c[g[d]])
  }
  var f = function (i) {
    return function () {
      if (arguments[0] instanceof Array) {
        return i.apply(null, arguments[0])
      } else {
        return i.apply(null, arguments)
      }
    }
  };
  var e = "each any all".split(/\s/);
  for (var b = 0; b < e.length; b++) {
    c[e[b]] = f(c[e[b]])
  }
}());
(function () {
  var e = Date, l = e.prototype, f = e.CultureInfo;
  var h = function (m) {
    var n = [];
    for (var g = 0; g < m.length; g++) {
      if (m[g] instanceof Array) {
        n = n.concat(h(m[g]))
      } else {
        if (m[g]) {
          n.push(m[g])
        }
      }
    }
    return n
  };
  e.Grammar = {};
  e.Translator = {
    hour: function (g) {
      return function () {
        this.hour = Number(g)
      }
    }, minute: function (g) {
      return function () {
        this.minute = Number(g)
      }
    }, second: function (g) {
      return function () {
        this.second = Number(g)
      }
    }, meridian: function (g) {
      return function () {
        this.meridian = g.slice(0, 1).toLowerCase()
      }
    }, timezone: function (g) {
      return function () {
        var m = g.replace(/[^\d\+\-]/g, "");
        if (m.length) {
          this.timezoneOffset = Number(m)
        } else {
          this.timezone = g.toLowerCase()
        }
      }
    }, day: function (g) {
      var m = g[0];
      return function () {
        this.day = Number(m.match(/\d+/)[0])
      }
    }, month: function (g) {
      return function () {
        this.month = (g.length == 3) ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(g) / 4 : Number(g) - 1
      }
    }, year: function (g) {
      return function () {
        var m = Number(g);
        this.year = ((g.length > 2) ? m : (m + (((m + 2000) < f.twoDigitYearMax) ? 2000 : 1900)))
      }
    }, rday: function (g) {
      return function () {
        switch (g) {
          case"yesterday":
            this.days = -1;
            break;
          case"tomorrow":
            this.days = 1;
            break;
          case"today":
            this.days = 0;
            break;
          case"now":
            this.days = 0;
            this.now = true;
            break
        }
      }
    }, finishExact: function (g) {
      g = (g instanceof Array) ? g : [g];
      for (var n = 0; n < g.length; n++) {
        if (g[n]) {
          g[n].call(this)
        }
      }
      var m = new Date();
      if ((this.hour || this.minute) && (!this.month && !this.year && !this.day)) {
        this.day = m.getDate()
      }
      if (!this.year) {
        this.year = m.getFullYear()
      }
      if (!this.month && this.month !== 0) {
        this.month = m.getMonth()
      }
      if (!this.day) {
        this.day = 1
      }
      if (!this.hour) {
        this.hour = 0
      }
      if (!this.minute) {
        this.minute = 0
      }
      if (!this.second) {
        this.second = 0
      }
      if (this.meridian && this.hour) {
        if (this.meridian == "p" && this.hour < 12) {
          this.hour = this.hour + 12
        } else {
          if (this.meridian == "a" && this.hour == 12) {
            this.hour = 0
          }
        }
      }
      if (this.day > e.getDaysInMonth(this.year, this.month)) {
        throw new RangeError(this.day + " is not a valid value for days.")
      }
      var o = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
      if (this.timezone) {
        o.set({timezone: this.timezone})
      } else {
        if (this.timezoneOffset) {
          o.set({timezoneOffset: this.timezoneOffset})
        }
      }
      return o
    }, finish: function (g) {
      g = (g instanceof Array) ? h(g) : [g];
      if (g.length === 0) {
        return null
      }
      for (var q = 0; q < g.length; q++) {
        if (typeof g[q] == "function") {
          g[q].call(this)
        }
      }
      var n = e.today();
      if (this.now && !this.unit && !this.operator) {
        return new Date()
      } else {
        if (this.now) {
          n = new Date()
        }
      }
      var s = !!(this.days && this.days !== null || this.orient || this.operator);
      var t, p, o;
      o = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
      if (!this.now && "hour minute second".indexOf(this.unit) != -1) {
        n.setTimeToNow()
      }
      if (this.month || this.month === 0) {
        if ("year day hour minute second".indexOf(this.unit) != -1) {
          this.value = this.month + 1;
          this.month = null;
          s = true
        }
      }
      if (!s && this.weekday && !this.day && !this.days) {
        var m = Date[this.weekday]();
        this.day = m.getDate();
        if (!this.month) {
          this.month = m.getMonth()
        }
        this.year = m.getFullYear()
      }
      if (s && this.weekday && this.unit != "month") {
        this.unit = "day";
        t = (e.getDayNumberFromName(this.weekday) - n.getDay());
        p = 7;
        this.days = t ? ((t + (o * p)) % p) : (o * p)
      }
      if (this.month && this.unit == "day" && this.operator) {
        this.value = (this.month + 1);
        this.month = null
      }
      if (this.value != null && this.month != null && this.year != null) {
        this.day = this.value * 1
      }
      if (this.month && !this.day && this.value) {
        n.set({day: this.value * 1});
        if (!s) {
          this.day = this.value * 1
        }
      }
      if (!this.month && this.value && this.unit == "month" && !this.now) {
        this.month = this.value;
        s = true
      }
      if (s && (this.month || this.month === 0) && this.unit != "year") {
        this.unit = "month";
        t = (this.month - n.getMonth());
        p = 12;
        this.months = t ? ((t + (o * p)) % p) : (o * p);
        this.month = null
      }
      if (!this.unit) {
        this.unit = "day"
      }
      if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
        this[this.unit + "s"] = this[this.unit + "s"] + ((this.operator == "add") ? 1 : -1) + (this.value || 0) * o
      } else {
        if (this[this.unit + "s"] == null || this.operator != null) {
          if (!this.value) {
            this.value = 1
          }
          this[this.unit + "s"] = this.value * o
        }
      }
      if (this.meridian && this.hour) {
        if (this.meridian == "p" && this.hour < 12) {
          this.hour = this.hour + 12
        } else {
          if (this.meridian == "a" && this.hour == 12) {
            this.hour = 0
          }
        }
      }
      if (this.weekday && !this.day && !this.days) {
        var m = Date[this.weekday]();
        this.day = m.getDate();
        if (m.getMonth() !== n.getMonth()) {
          this.month = m.getMonth()
        }
      }
      if ((this.month || this.month === 0) && !this.day) {
        this.day = 1
      }
      if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
        return Date.today().setWeek(this.value)
      }
      if (s && this.timezone && this.day && this.days) {
        this.day = this.days
      }
      return (s) ? n.add(this) : n.set(this)
    }
  };
  var i = e.Parsing.Operators, d = e.Grammar, k = e.Translator, b;
  d.datePartDelimiter = i.rtoken(/^([\s\-\.\,\/\x27]+)/);
  d.timePartDelimiter = i.stoken(":");
  d.whiteSpace = i.rtoken(/^\s*/);
  d.generalDelimiter = i.rtoken(/^(([\s\,]|at|@|on)+)/);
  var a = {};
  d.ctoken = function (p) {
    var o = a[p];
    if (!o) {
      var q = f.regexPatterns;
      var n = p.split(/\s+/), m = [];
      for (var g = 0; g < n.length; g++) {
        m.push(i.replace(i.rtoken(q[n[g]]), n[g]))
      }
      o = a[p] = i.any.apply(null, m)
    }
    return o
  };
  d.ctoken2 = function (g) {
    return i.rtoken(f.regexPatterns[g])
  };
  d.h = i.cache(i.process(i.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), k.hour));
  d.hh = i.cache(i.process(i.rtoken(/^(0[0-9]|1[0-2])/), k.hour));
  d.H = i.cache(i.process(i.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), k.hour));
  d.HH = i.cache(i.process(i.rtoken(/^([0-1][0-9]|2[0-3])/), k.hour));
  d.m = i.cache(i.process(i.rtoken(/^([0-5][0-9]|[0-9])/), k.minute));
  d.mm = i.cache(i.process(i.rtoken(/^[0-5][0-9]/), k.minute));
  d.s = i.cache(i.process(i.rtoken(/^([0-5][0-9]|[0-9])/), k.second));
  d.ss = i.cache(i.process(i.rtoken(/^[0-5][0-9]/), k.second));
  d.hms = i.cache(i.sequence([d.H, d.m, d.s], d.timePartDelimiter));
  d.t = i.cache(i.process(d.ctoken2("shortMeridian"), k.meridian));
  d.tt = i.cache(i.process(d.ctoken2("longMeridian"), k.meridian));
  d.z = i.cache(i.process(i.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), k.timezone));
  d.zz = i.cache(i.process(i.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), k.timezone));
  d.zzz = i.cache(i.process(d.ctoken2("timezone"), k.timezone));
  d.timeSuffix = i.each(i.ignore(d.whiteSpace), i.set([d.tt, d.zzz]));
  d.time = i.each(i.optional(i.ignore(i.stoken("T"))), d.hms, d.timeSuffix);
  d.d = i.cache(i.process(i.each(i.rtoken(/^([0-2]\d|3[0-1]|\d)/), i.optional(d.ctoken2("ordinalSuffix"))), k.day));
  d.dd = i.cache(i.process(i.each(i.rtoken(/^([0-2]\d|3[0-1])/), i.optional(d.ctoken2("ordinalSuffix"))), k.day));
  d.ddd = d.dddd = i.cache(i.process(d.ctoken("sun mon tue wed thu fri sat"), function (g) {
    return function () {
      this.weekday = g
    }
  }));
  d.M = i.cache(i.process(i.rtoken(/^(1[0-2]|0\d|\d)/), k.month));
  d.MM = i.cache(i.process(i.rtoken(/^(1[0-2]|0\d)/), k.month));
  d.MMM = d.MMMM = i.cache(i.process(d.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), k.month));
  d.y = i.cache(i.process(i.rtoken(/^(\d\d?)/), k.year));
  d.yy = i.cache(i.process(i.rtoken(/^(\d\d)/), k.year));
  d.yyy = i.cache(i.process(i.rtoken(/^(\d\d?\d?\d?)/), k.year));
  d.yyyy = i.cache(i.process(i.rtoken(/^(\d\d\d\d)/), k.year));
  b = function () {
    return i.each(i.any.apply(null, arguments), i.not(d.ctoken2("timeContext")))
  };
  d.day = b(d.d, d.dd);
  d.month = b(d.M, d.MMM);
  d.year = b(d.yyyy, d.yy);
  d.orientation = i.process(d.ctoken("past future"), function (g) {
    return function () {
      this.orient = g
    }
  });
  d.operator = i.process(d.ctoken("add subtract"), function (g) {
    return function () {
      this.operator = g
    }
  });
  d.rday = i.process(d.ctoken("yesterday tomorrow today now"), k.rday);
  d.unit = i.process(d.ctoken("second minute hour day week month year"), function (g) {
    return function () {
      this.unit = g
    }
  });
  d.value = i.process(i.rtoken(/^\d\d?(st|nd|rd|th)?/), function (g) {
    return function () {
      this.value = g.replace(/\D/g, "")
    }
  });
  d.expression = i.set([d.rday, d.operator, d.value, d.unit, d.orientation, d.ddd, d.MMM]);
  b = function () {
    return i.set(arguments, d.datePartDelimiter)
  };
  d.mdy = b(d.ddd, d.month, d.day, d.year);
  d.ymd = b(d.ddd, d.year, d.month, d.day);
  d.dmy = b(d.ddd, d.day, d.month, d.year);
  d.date = function (g) {
    return ((d[f.dateElementOrder] || d.mdy).call(this, g))
  };
  d.format = i.process(i.many(i.any(i.process(i.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (g) {
    if (d[g]) {
      return d[g]
    } else {
      throw e.Parsing.Exception(g)
    }
  }), i.process(i.rtoken(/^[^dMyhHmstz]+/), function (g) {
    return i.ignore(i.stoken(g))
  }))), function (g) {
    return i.process(i.each.apply(null, g), k.finishExact)
  });
  var j = {};
  var c = function (g) {
    return j[g] = (j[g] || d.format(g)[0])
  };
  d.formats = function (m) {
    if (m instanceof Array) {
      var n = [];
      for (var g = 0; g < m.length; g++) {
        n.push(c(m[g]))
      }
      return i.any.apply(null, n)
    } else {
      return c(m)
    }
  };
  d._formats = d.formats(['"yyyy-MM-ddTHH:mm:ssZ"', "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyy", "Mdyy", "dMyy", "d"]);
  d._start = i.process(i.set([d.date, d.time, d.expression], d.generalDelimiter, d.whiteSpace), k.finish);
  d.start = function (g) {
    try {
      var m = d._formats.call({}, g);
      if (m[1].length === 0) {
        return m
      }
    } catch (n) {
    }
    return d._start.call({}, g)
  };
  e._parse = e.parse;
  e.parse = function (g) {
    var m = null;
    if (!g) {
      return null
    }
    if (g instanceof Date) {
      return g
    }
    try {
      m = e.Grammar.start.call({}, g.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"))
    } catch (n) {
      return null
    }
    return ((m[1].length === 0) ? m[0] : null)
  };
  e.getParseFunction = function (m) {
    var g = e.Grammar.formats(m);
    return function (n) {
      var o = null;
      try {
        o = g.call({}, n)
      } catch (p) {
        return null
      }
      return ((o[1].length === 0) ? o[0] : null)
    }
  };
  e.parseExact = function (g, m) {
    return e.getParseFunction(m)(g)
  }
}());
function Sound(b) {
  var c = false;
  try {
    var a = document.createElement("audio");
    c = !!a.canPlayType
  } catch (d) {
  }
  if (c) {
    a.src = b;
    var f = false;
    a.addEventListener("ended", function () {
      f = true
    }, true);
    a.load();
    this.play = function () {
      if (f) {
        a.load()
      }
      a.play();
      f = false
    };
    this.pause = function () {
      a.pause()
    }
  } else {
    if ($.browser.msie) {
      if ($("bgsound").length == 0) {
        $("body").append("<bgsound>")
      }
      this.play = function () {
        $("bgsound").attr({src: b})
      }
    }
  }
}
(function (e) {
  e.extend(e.support, {rgba: c()});
  e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (g, f) {
    e.fx.step[f] = function (i) {
      var h = [];
      if (!i.colorInit) {
        i.start = d(i.elem, f);
        i.end = b(i.end);
        i.alphavalue = {start: 4 === i.start.length, end: 4 === i.end.length};
        if (!i.alphavalue.start) {
          i.start.push(1)
        }
        if (!i.alphavalue.end) {
          i.end.push(1)
        }
        if (e.support.rgba && (!i.alphavalue.start && i.alphavalue.end) || (i.alphavalue.start && i.alphavalue.end) || (i.alphavalue.start && !i.alphavalue.end)) {
          i.colorModel = "rgba"
        } else {
          i.colorModel = "rgb"
        }
        i.colorInit = true
      }
      h.push(Math.max(Math.min(parseInt((i.pos * (i.end[0] - i.start[0])) + i.start[0]), 255), 0));
      h.push(Math.max(Math.min(parseInt((i.pos * (i.end[1] - i.start[1])) + i.start[1]), 255), 0));
      h.push(Math.max(Math.min(parseInt((i.pos * (i.end[2] - i.start[2])) + i.start[2]), 255), 0));
      if (i.colorModel == "rgba") {
        h.push(Math.max(Math.min(parseFloat((i.pos * (i.end[3] - i.start[3])) + i.start[3]), 1), 0).toFixed(2))
      }
      i.elem.style[f] = i.colorModel + "(" + h.join(",") + ")"
    }
  });
  function b(g) {
    var f, i, j = "(?:,\\s*((?:1|0)(?:\\.0+)?|(?:0?\\.[0-9]+))\\s*)?\\)", h = new RegExp("rgb(a)?\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*" + j), k = new RegExp("rgb(a)?\\(\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*,\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*,\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*" + j);
    if (g && g.constructor == Array && g.length >= 3 && g.length <= 4) {
      return g
    }
    if (f = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)) {
      return [parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16)]
    }
    if (f = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)) {
      return [parseInt(f[1] + f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16)]
    }
    if (f = h.exec(g)) {
      i = [parseInt(f[2]), parseInt(f[3]), parseInt(f[4])];
      if (f[1] && f[5]) {
        i.push(parseFloat(f[5]))
      }
      return i
    }
    if (f = k.exec(g)) {
      i = [parseFloat(f[2]) * 2.55, parseFloat(f[3]) * 2.55, parseFloat(f[4]) * 2.55];
      if (f[1] && f[5]) {
        i.push(parseFloat(f[5]))
      }
      return i
    }
    return a[e.trim(g).toLowerCase()]
  }

  function d(h, f) {
    var g;
    do {
      g = e.curCSS(h, f);
      if (g != "" && g != "transparent" || e.nodeName(h, "body")) {
        break
      }
      f = "backgroundColor"
    } while (h = h.parentNode);
    return b(g)
  }

  function c() {
    var h = e("script:first"), g = h.css("color"), f = false;
    if (/^rgba/.test(g)) {
      f = true
    } else {
      try {
        f = (g != h.css("color", "rgba(0, 0, 0, 0.5)").css("color"));
        h.css("color", g)
      } catch (i) {
      }
    }
    return f
  }

  var a = {
    aqua: [0, 255, 255],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    black: [0, 0, 0],
    blue: [0, 0, 255],
    brown: [165, 42, 42],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgrey: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkviolet: [148, 0, 211],
    fuchsia: [255, 0, 255],
    gold: [255, 215, 0],
    green: [0, 128, 0],
    indigo: [75, 0, 130],
    khaki: [240, 230, 140],
    lightblue: [173, 216, 230],
    lightcyan: [224, 255, 255],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    navy: [0, 0, 128],
    olive: [128, 128, 0],
    orange: [255, 165, 0],
    pink: [255, 192, 203],
    purple: [128, 0, 128],
    violet: [128, 0, 128],
    red: [255, 0, 0],
    silver: [192, 192, 192],
    white: [255, 255, 255],
    yellow: [255, 255, 0],
    transparent: (e.support.rgba) ? [0, 0, 0, 0] : [255, 255, 255]
  }
})(jQuery);
(function (g, h) {
  var i = "ui-state-active", t = "ui-state-hover", e = "ui-state-disabled", k = g.ui.keyCode, m = k.UP, n = k.DOWN, s = k.RIGHT, f = k.LEFT, j = k.PAGE_UP, p = k.PAGE_DOWN, q = k.HOME, d = k.END, l = g.browser.msie, c = g.browser.mozilla ? "DOMMouseScroll" : "mousewheel", o = ".uispinner", a = [m, n, s, f, j, p, q, d, k.BACKSPACE, k.DELETE, k.TAB], b;
  g.widget("ui.spinner", {
    options: {
      min: null,
      max: null,
      allowNull: false,
      group: "",
      point: ".",
      prefix: "",
      suffix: "",
      places: null,
      defaultStep: 1,
      largeStep: 10,
      mouseWheel: true,
      increment: "slow",
      className: null,
      showOn: "always",
      width: 16,
      upIconClass: "ui-icon-triangle-1-n",
      downIconClass: "ui-icon-triangle-1-s",
      format: function (x, w) {
        var v = this, y = /(\d+)(\d{3})/, u = ((isNaN(x) ? 0 : Math.abs(x)).toFixed(w)) + "";
        for (u = u.replace(".", v.point); y.test(u) && v.group; u = u.replace(y, "$1" + v.group + "$2")) {
        }
        return (x < 0 ? "-" : "") + v.prefix + u + v.suffix
      },
      parse: function (v) {
        var u = this;
        if (u.group == ".") {
          v = v.replace(".", "")
        }
        if (u.point != ".") {
          v = v.replace(u.point, ".")
        }
        return parseFloat(v.replace(/[^0-9\-\.]/g, ""))
      }
    }, _create: function () {
      var v = this, u = v.element, w = u.attr("type");
      if (!u.is("input") || ((w != "text") && (w != "number"))) {
        console.error("Invalid target for ui.spinner");
        return
      }
      v._procOptions(true);
      v._createButtons(u);
      if (!u.is(":enabled")) {
        v.disable()
      }
    }, _createButtons: function (F) {
      function E(X) {
        return X == "auto" ? 0 : parseInt(X)
      }

      var I = this, y = I.options, w = y.className, O = y.width, z = y.showOn, D = g.support.boxModel, J = F.outerHeight(), S = I.oMargin = E(F.css("margin-right")), B = I.wrapper = F.css({
        width: (I.oWidth = (D ? F.width() : F.outerWidth())) - O,
        marginRight: S + O,
        textAlign: "right"
      }).after('<span class="ui-spinner ui-widget"></span>').next(), M = I.btnContainer = g('<div class="ui-spinner-buttons"><div class="ui-spinner-up ui-spinner-button ui-state-default ui-corner-tr"><span class="ui-icon ' + y.upIconClass + '">&nbsp;</span></div><div class="ui-spinner-down ui-spinner-button ui-state-default ui-corner-br"><span class="ui-icon ' + y.downIconClass + '">&nbsp;</span></div></div>'), x, v, R, W, G, C, H, Q, K, P, A = F[0].dir == "rtl";
      if (w) {
        B.addClass(w)
      }
      B.append(M.css({height: J, left: -O - S, top: (F.offset().top - B.offset().top) + "px"}));
      R = I.buttons = M.find(".ui-spinner-button");
      R.css({width: O - (D ? R.outerWidth() - R.width() : 0), height: J / 2 - (D ? R.outerHeight() - R.height() : 0)});
      x = R[0];
      v = R[1];
      W = R.find(".ui-icon");
      W.css({marginLeft: (R.innerWidth() - W.width()) / 2, marginTop: (R.innerHeight() - W.height()) / 2});
      M.width(R.outerWidth());
      if (z != "always") {
        M.css("opacity", 0)
      }
      if (z == "hover" || z == "both") {
        R.add(F).bind("mouseenter" + o, function () {
          U(function () {
            H = true;
            if (!I.focused || (z == "hover")) {
              I.showButtons()
            }
          })
        }).bind("mouseleave" + o, function L() {
          U(function () {
            H = false;
            if (!I.focused || (z == "hover")) {
              I.hideButtons()
            }
          })
        })
      }
      R.hover(function () {
        I.buttons.removeClass(t);
        if (!y.disabled) {
          g(this).addClass(t)
        }
      }, function () {
        g(this).removeClass(t)
      }).mousedown(V).mouseup(T).mouseout(T);
      if (l) {
        R.dblclick(function () {
          if (!y.disabled) {
            I._change();
            I._doSpin((this === x ? 1 : -1) * y.step)
          }
          return false
        }).bind("selectstart", function () {
          return false
        })
      }
      F.bind("keydown" + o, function (ab) {
        var Y, Z, X, aa = ab.keyCode;
        if (ab.ctrl || ab.alt) {
          return true
        }
        if (u(aa)) {
          K = true
        }
        if (Q) {
          return false
        }
        switch (aa) {
          case m:
          case j:
            Y = 1;
            Z = aa == j;
            break;
          case n:
          case p:
            Y = -1;
            Z = aa == p;
            break;
          case s:
          case f:
            Y = (aa == s) ^ A ? 1 : -1;
            break;
          case q:
            X = I.options.min;
            if (X != null) {
              I._setValue(X)
            }
            return false;
          case d:
            X = I.options.max;
            X = I.options.max;
            if (X != null) {
              I._setValue(X)
            }
            return false
        }
        if (Y) {
          if (!Q && !y.disabled) {
            keyDir = Y;
            g(Y > 0 ? x : v).addClass(i);
            Q = true;
            I._startSpin(Y, Z)
          }
          return false
        }
      }).bind("keyup" + o, function (X) {
        if (X.ctrl || X.alt) {
          return true
        }
        if (u(k)) {
          K = false
        }
        switch (X.keyCode) {
          case m:
          case s:
          case j:
          case n:
          case f:
          case p:
            R.removeClass(i);
            I._stopSpin();
            Q = false;
            return false
        }
      }).bind("keypress" + o, function (X) {
        if (N(X.keyCode, X.charCode)) {
          return false
        }
      }).bind("change" + o, function () {
        I._change()
      }).bind("focus" + o, function () {
        function X() {
          I.element.select()
        }

        l ? X() : setTimeout(X, 0);
        I.focused = true;
        b = I;
        if (!H && (z == "focus" || z == "both")) {
          I.showButtons()
        }
      }).bind("blur" + o, function () {
        I.focused = false;
        if (!H && (z == "focus" || z == "both")) {
          I.hideButtons()
        }
      });
      function u(Y) {
        for (var X = 0; X < a.length; X++) {
          if (a[X] == Y) {
            return true
          }
        }
        return false
      }

      function N(aa, X) {
        if (K) {
          return false
        }
        var Z = String.fromCharCode(X || aa), Y = I.options;
        if ((Z >= "0") && (Z <= "9") || (Z == "-")) {
          return false
        }
        if (((I.places > 0) && (Z == Y.point)) || (Z == Y.group)) {
          return false
        }
        return true
      }

      function U(Y) {
        if (G) {
          if (Y === C) {
            return
          }
          clearTimeout(G)
        }
        C = Y;
        G = setTimeout(X, 100);
        function X() {
          G = 0;
          Y()
        }
      }

      function V() {
        if (!y.disabled) {
          var X = I.element[0], Y = (this === x ? 1 : -1);
          X.focus();
          X.select();
          g(this).addClass(i);
          P = true;
          I._startSpin(Y)
        }
        return false
      }

      function T() {
        if (P) {
          g(this).removeClass(i);
          I._stopSpin();
          P = false
        }
        return false
      }
    }, _procOptions: function (B) {
      var C = this, z = C.element, D = C.options, x = D.min, y = D.max, w = D.step, u = D.places, v = -1, A;
      if (D.increment == "slow") {
        D.increment = [{count: 1, mult: 1, delay: 250}, {count: 3, mult: 1, delay: 100}, {count: 0, mult: 1, delay: 50}]
      } else {
        if (D.increment == "fast") {
          D.increment = [{count: 1, mult: 1, delay: 250}, {count: 19, mult: 1, delay: 100}, {
            count: 80,
            mult: 1,
            delay: 20
          }, {count: 100, mult: 10, delay: 20}, {count: 0, mult: 100, delay: 20}]
        }
      }
      if ((x == null) && ((A = z.attr("min")) != null)) {
        x = parseFloat(A)
      }
      if ((y == null) && ((A = z.attr("max")) != null)) {
        y = parseFloat(A)
      }
      if (!w && ((A = z.attr("step")) != null)) {
        if (A != "any") {
          w = parseFloat(A);
          D.largeStep *= w
        }
      }
      D.step = w = w || D.defaultStep;
      if ((u == null) && ((A = w + "").indexOf(".") != -1)) {
        u = A.length - A.indexOf(".") - 1
      }
      C.places = u;
      if ((y != null) && (x != null)) {
        if (x > y) {
          x = y
        }
        v = Math.max(Math.max(v, D.format(y, u, z).length), D.format(x, u, z).length)
      }
      if (B) {
        C.inputMaxLength = z[0].maxLength
      }
      A = C.inputMaxLength;
      if (A > 0) {
        v = v > 0 ? Math.min(A, v) : A;
        A = Math.pow(10, v) - 1;
        if ((y == null) || (y > A)) {
          y = A
        }
        A = -(A + 1) / 10 + 1;
        if ((x == null) || (x < A)) {
          x = A
        }
      }
      if (v > 0) {
        z.attr("maxlength", v)
      }
      D.min = x;
      D.max = y;
      C._change();
      z.unbind(c + o);
      if (D.mouseWheel) {
        z.bind(c + o, C._mouseWheel)
      }
    }, _mouseWheel: function (v) {
      var u = g.data(this, "spinner");
      if (!u.options.disabled && u.focused && (b === u)) {
        u._change();
        u._doSpin(((v.wheelDelta || -v.detail) > 0 ? 1 : -1) * u.options.step);
        return false
      }
    }, _setTimer: function (w, v, y) {
      var u = this;
      u._stopSpin();
      u.timer = setInterval(x, w);
      function x() {
        u._spin(v, y)
      }
    }, _stopSpin: function () {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = 0
      }
    }, _startSpin: function (x, y) {
      var v = this, w = v.options, u = w.increment;
      v._change();
      v._doSpin(x * (y ? v.options.largeStep : v.options.step));
      if (u && u.length > 0) {
        v.counter = 0;
        v.incCounter = 0;
        v._setTimer(u[0].delay, x, y)
      }
    }, _spin: function (w, x) {
      var v = this, u = v.options.increment, y = u[v.incCounter];
      v._doSpin(w * y.mult * (x ? v.options.largeStep : v.options.step));
      v.counter++;
      if ((v.counter > y.count) && (v.incCounter < u.length - 1)) {
        v.counter = 0;
        y = u[++v.incCounter];
        v._setTimer(y.delay, w, x)
      }
    }, _doSpin: function (v) {
      var u = this, w = u.curvalue;
      if (w == null) {
        w = (v > 0 ? u.options.min : u.options.max) || 0
      }
      u._setValue(w + v)
    }, _parseValue: function () {
      var u = this.element.val();
      return u ? this.options.parse(u, this.element) : null
    }, _validate: function (x) {
      var v = this.options, w = v.min, u = v.max;
      if ((x == null) && !v.allowNull) {
        x = this.curvalue != null ? this.curvalue : w || u || 0
      }
      if ((u != null) && (x > u)) {
        return u
      } else {
        if ((w != null) && (x < w)) {
          return w
        } else {
          return x
        }
      }
    }, _change: function () {
      var v = this, x = v._parseValue(), w = v.options.min, u = v.options.max;
      if (!v.selfChange) {
        if (isNaN(x)) {
          x = v.curvalue
        }
        v._setValue(x, true)
      }
    }, _setOption: function (u, v) {
      g.Widget.prototype._setOption.call(this, u, v);
      this._procOptions()
    }, increment: function () {
      this._doSpin(this.options.step)
    }, decrement: function () {
      this._doSpin(-this.options.step)
    }, showButtons: function (v) {
      var u = this.btnContainer.stop();
      if (v) {
        u.css("opacity", 1)
      } else {
        u.fadeTo("fast", 1)
      }
    }, hideButtons: function (v) {
      var u = this.btnContainer.stop();
      if (v) {
        u.css("opacity", 0)
      } else {
        u.fadeTo("fast", 0)
      }
      this.buttons.removeClass(t)
    }, _setValue: function (w, u) {
      var v = this;
      v.curvalue = w = v._validate(w);
      v.element.val(w != null ? v.options.format(w, v.places, v.element) : "");
      if (!u) {
        v.selfChange = true;
        v.element.change();
        v.selfChange = false
      }
    }, value: function (u) {
      if (arguments.length) {
        this._setValue(u);
        return this.element
      }
      return this.curvalue
    }, enable: function () {
      this.buttons.removeClass(e);
      this.element[0].disabled = false;
      g.Widget.prototype.enable.call(this)
    }, disable: function () {
      this.buttons.addClass(e).removeClass(t);
      this.element[0].disabled = true;
      g.Widget.prototype.disable.call(this)
    }, destroy: function (u) {
      this.wrapper.remove();
      this.element.unbind(o).css({width: this.oWidth, marginRight: this.oMargin});
      g.Widget.prototype.destroy.call(this)
    }
  })
})(jQuery);
(function (d) {
  d.tools = d.tools || {version: "@VERSION"};
  d.tools.tooltip = {
    conf: {
      effect: "toggle",
      fadeOutSpeed: "fast",
      predelay: 0,
      delay: 30,
      opacity: 1,
      tip: 0,
      fadeIE: false,
      position: ["top", "center"],
      offset: [0, 0],
      relative: false,
      cancelDefault: true,
      events: {
        def: "mouseenter,mouseleave",
        input: "focus,blur",
        widget: "focus mouseenter,blur mouseleave",
        tooltip: "mouseenter,mouseleave"
      },
      layout: "<div/>",
      tipClass: "tooltip"
    }, addEffect: function (e, g, f) {
      c[e] = [g, f]
    }
  };
  var c = {
    toggle: [function (e) {
      var f = this.getConf(), g = this.getTip(), h = f.opacity;
      if (h < 1) {
        g.css({opacity: h})
      }
      g.show();
      e.call()
    }, function (e) {
      this.getTip().hide();
      e.call()
    }], fade: [function (e) {
      var f = this.getConf();
      if (!d.browser.msie || f.fadeIE) {
        this.getTip().fadeTo(f.fadeInSpeed, f.opacity, e)
      } else {
        this.getTip().show();
        e()
      }
    }, function (e) {
      var f = this.getConf();
      if (!d.browser.msie || f.fadeIE) {
        this.getTip().fadeOut(f.fadeOutSpeed, e)
      } else {
        this.getTip().hide();
        e()
      }
    }]
  };

  function b(g, i, f) {
    var k = f.relative ? g.position().top : g.offset().top, j = f.relative ? g.position().left : g.offset().left, l = f.position[0];
    k -= i.outerHeight() - f.offset[0];
    j += g.outerWidth() + f.offset[1];
    if (/iPad/i.test(navigator.userAgent)) {
      k -= d(window).scrollTop()
    }
    var e = i.outerHeight() + g.outerHeight();
    if (l == "center") {
      k += e / 2
    }
    if (l == "bottom") {
      k += e
    }
    l = f.position[1];
    var h = i.outerWidth() + g.outerWidth();
    if (l == "center") {
      j -= h / 2
    }
    if (l == "left") {
      j -= h
    }
    return {top: k, left: j}
  }

  function a(h, j) {
    var s = this, g = h.add(s), o, f = 0, q = 0, m = h.attr("title"), i = h.attr("data-tooltip"), t = c[j.effect], n, l = h.is(":input"), e = l && h.is(":checkbox, :radio, select, :button, :submit"), k = h.attr("type"), p = j.events[k] || j.events[l ? (e ? "widget" : "input") : "def"];
    if (!t) {
      throw'Nonexistent effect "' + j.effect + '"'
    }
    p = p.split(/,\s*/);
    if (p.length != 2) {
      throw"Tooltip: bad events configuration for " + k
    }
    h.on(p[0], function (u) {
      clearTimeout(f);
      if (j.predelay) {
        q = setTimeout(function () {
          s.show(u)
        }, j.predelay)
      } else {
        s.show(u)
      }
    }).on(p[1], function (u) {
      clearTimeout(q);
      if (j.delay) {
        f = setTimeout(function () {
          s.hide(u)
        }, j.delay)
      } else {
        s.hide(u)
      }
    });
    if (m && j.cancelDefault) {
      h.removeAttr("title");
      h.data("title", m)
    }
    d.extend(s, {
      show: function (v) {
        if (!o) {
          if (i) {
            o = d(i)
          } else {
            if (j.tip) {
              o = d(j.tip).eq(0)
            } else {
              if (m) {
                o = d(j.layout).addClass(j.tipClass).appendTo(document.body).hide().append(m)
              } else {
                o = h.next();
                if (!o.length) {
                  o = h.parent().next()
                }
              }
            }
          }
          if (!o.length) {
            throw"Cannot find tooltip for " + h
          }
        }
        if (s.isShown()) {
          return s
        }
        o.stop(true, true);
        var w = b(h, o, j);
        if (j.tip) {
          o.html(h.data("title"))
        }
        v = d.Event();
        v.type = "onBeforeShow";
        g.trigger(v, [w]);
        if (v.isDefaultPrevented()) {
          return s
        }
        w = b(h, o, j);
        o.css({position: "absolute", top: w.top, left: w.left});
        n = true;
        t[0].call(s, function () {
          v.type = "onShow";
          n = "full";
          g.trigger(v)
        });
        var u = j.events.tooltip.split(/,\s*/);
        if (!o.data("__set")) {
          o.off(u[0]).on(u[0], function () {
            clearTimeout(f);
            clearTimeout(q)
          });
          if (u[1] && !h.is("input:not(:checkbox, :radio), textarea")) {
            o.off(u[1]).on(u[1], function (x) {
              if (x.relatedTarget != h[0]) {
                h.trigger(p[1].split(" ")[0])
              }
            })
          }
          if (!j.tip) {
            o.data("__set", true)
          }
        }
        return s
      }, hide: function (u) {
        if (!o || !s.isShown()) {
          return s
        }
        u = d.Event();
        u.type = "onBeforeHide";
        g.trigger(u);
        if (u.isDefaultPrevented()) {
          return
        }
        n = false;
        c[j.effect][1].call(s, function () {
          u.type = "onHide";
          g.trigger(u)
        });
        return s
      }, isShown: function (u) {
        return u ? n == "full" : n
      }, getConf: function () {
        return j
      }, getTip: function () {
        return o
      }, getTrigger: function () {
        return h
      }
    });
    d.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function (v, u) {
      if (d.isFunction(j[u])) {
        d(s).on(u, j[u])
      }
      s[u] = function (w) {
        if (w) {
          d(s).on(u, w)
        }
        return s
      }
    })
  }

  d.fn.tooltip = function (e) {
    var f = this.data("tooltip");
    if (f) {
      return f
    }
    e = d.extend(true, {}, d.tools.tooltip.conf, e);
    if (typeof e.position == "string") {
      e.position = e.position.split(/,?\s/)
    }
    this.each(function () {
      f = new a(d(this), e);
      d(this).data("tooltip", f)
    });
    return e.api ? f : this
  }
})(jQuery);
(function (b) {
  var a = b.tools.tooltip;
  b.extend(a.conf, {
    direction: "up",
    bounce: false,
    slideOffset: 10,
    slideInSpeed: 200,
    slideOutSpeed: 200,
    slideFade: !b.browser.msie
  });
  var c = {up: ["-", "top"], down: ["+", "top"], left: ["-", "left"], right: ["+", "left"]};
  a.addEffect("slide", function (d) {
    var f = this.getConf(), g = this.getTip(), h = f.slideFade ? {opacity: f.opacity} : {}, e = c[f.direction] || c.up;
    h[e[1]] = e[0] + "=" + f.slideOffset;
    if (f.slideFade) {
      g.css({opacity: 0})
    }
    g.show().animate(h, f.slideInSpeed, d)
  }, function (e) {
    var g = this.getConf(), i = g.slideOffset, h = g.slideFade ? {opacity: 0} : {}, f = c[g.direction] || c.up;
    var d = "" + f[0];
    if (g.bounce) {
      d = d == "+" ? "-" : "+"
    }
    h[f[1]] = d + "=" + i;
    this.getTip().animate(h, g.slideOutSpeed, function () {
      b(this).hide();
      e.call()
    })
  })
})(jQuery);
(function (b) {
  b.tools = b.tools || {version: "@VERSION"};
  var e;
  e = b.tools.expose = {
    conf: {
      maskId: "exposeMask",
      loadSpeed: "slow",
      closeSpeed: "fast",
      closeOnClick: true,
      closeOnEsc: true,
      zIndex: 9998,
      opacity: 0.8,
      startOpacity: 0,
      color: "#fff",
      onLoad: null,
      onClose: null
    }
  };
  function f() {
    if (b.browser.msie) {
      var k = b(document).height(), j = b(window).height();
      return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, k - j < 20 ? j : k]
    }
    return [b(document).width(), b(document).height()]
  }

  function h(j) {
    if (j) {
      return j.call(b.mask)
    }
  }

  var i, d, c, a, g;
  b.mask = {
    load: function (j, l) {
      if (c) {
        return this
      }
      if (typeof j == "string") {
        j = {color: j}
      }
      j = j || a;
      a = j = b.extend(b.extend({}, e.conf), j);
      i = b("#" + j.maskId);
      if (!i.length) {
        i = b("<div/>").attr("id", j.maskId);
        b("body").append(i)
      }
      var k = f();
      i.css({
        position: "absolute",
        top: 0,
        left: 0,
        width: k[0],
        height: k[1],
        display: "none",
        opacity: j.startOpacity,
        zIndex: j.zIndex
      });
      if (j.color) {
        i.css("backgroundColor", j.color)
      }
      if (h(j.onBeforeLoad) === false) {
        return this
      }
      if (j.closeOnEsc) {
        b(document).on("keydown.mask", function (m) {
          if (m.keyCode == 27) {
            b.mask.close(m)
          }
        })
      }
      if (j.closeOnClick) {
        i.on("click.mask", function (m) {
          b.mask.close(m)
        })
      }
      b(window).on("resize.mask", function () {
        b.mask.fit()
      });
      if (l && l.length) {
        g = l.eq(0).css("zIndex");
        b.each(l, function () {
          var m = b(this);
          if (!/relative|absolute|fixed/i.test(m.css("position"))) {
            m.css("position", "relative")
          }
        });
        d = l.css({zIndex: Math.max(j.zIndex + 1, g == "auto" ? 0 : g)})
      }
      i.css({display: "block"}).fadeTo(j.loadSpeed, j.opacity, function () {
        b.mask.fit();
        h(j.onLoad);
        c = "full"
      });
      c = true;
      return this
    }, close: function () {
      if (c) {
        if (h(a.onBeforeClose) === false) {
          return this
        }
        i.fadeOut(a.closeSpeed, function () {
          h(a.onClose);
          if (d) {
            d.css({zIndex: g})
          }
          c = false
        });
        b(document).off("keydown.mask");
        i.off("click.mask");
        b(window).off("resize.mask")
      }
      return this
    }, fit: function () {
      if (c) {
        var j = f();
        i.css({width: j[0], height: j[1]})
      }
    }, getMask: function () {
      return i
    }, isLoaded: function (j) {
      return j ? c == "full" : c
    }, getConf: function () {
      return a
    }, getExposed: function () {
      return d
    }
  };
  b.fn.mask = function (j) {
    b.mask.load(j);
    return this
  };
  b.fn.expose = function (j) {
    b.mask.load(j, this);
    return this
  }
})(jQuery);
