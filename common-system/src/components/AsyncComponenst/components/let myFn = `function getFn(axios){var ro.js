const objFn = {}
const myFn = `objFn.fn = function getFn(axios){var root = function (e) {
  var t = {};

  function n (o) {
    if (t[o]) return t[o].exports;
    var r = t[o] = {
      i: o,
      l: !1,
      exports: {}
    };
    return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
  }
  return n.m = e, n.c = t, n.d = function (e, t, o) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: o
    })
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var o = Object.create(null);
    if (n.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e)
      for (var r in e) n.d(o, r, function (t) {
        return e[t]
      }.bind(null, r));
    return o
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 1)
}([function (e, t) {
  e.exports = axios
}, function (e, t, n) {
  "use strict";
  n.r(t);
  var o = function () {
    var e = this.$createElement;
    return (this._self._c || e)("div")
  };
  o._withStripped = !0;
  var r = n(0),
    i = n.n(r);
  console.log("in Axios:", i.a);
  var u = function (e, t, n, o, r, i, u, s) {
    var l, a = "function" == typeof e ? e.options : e;
    if (t && (a.render = t, a.staticRenderFns = n, a._compiled = !0), o && (a.functional = !0), i && (a._scopeId = "data-v-" + i), u ? (l = function (e) {
      (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), r && r.call(this, e), e && e._registeredComponents && e._registeredComponents.add(u)
    }, a._ssrRegister = l) : r && (l = s ? function () {
      r.call(this, (a.functional ? this.parent : this).$root.$options.shadowRoot)
    } : r), l)
      if (a.functional) {
        a._injectStyles = l;
        var c = a.render;
        a.render = function (e, t) {
          return l.call(t), c(e, t)
        }
      } else {
        var f = a.beforeCreate;
        a.beforeCreate = f ? [].concat(f, l) : [l]
      } return {
        exports: e,
        options: a
      }
  }({
    mounted: function () {
      console.log("axios:", i.a), i.a.get("/test.json").then((function (e) {
        console.log(e)
      }))
    }
  }, o, [], !1, null, null, null);
  u.options.__file = "src/plugins/InputTest3/index.vue";
  t.default = u.exports
}]);
return root
 }
 `
console.log(eval(myFn))
console.log(objFn)
