var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
    init_modules_watch_stub();
  }
});

// node_modules/tweetnacl/nacl-fast.js
var require_nacl_fast = __commonJS({
  "node_modules/tweetnacl/nacl-fast.js"(exports, module) {
    init_modules_watch_stub();
    (function(nacl) {
      "use strict";
      var gf = /* @__PURE__ */ __name(function(init) {
        var i3, r = new Float64Array(16);
        if (init)
          for (i3 = 0; i3 < init.length; i3++)
            r[i3] = init[i3];
        return r;
      }, "gf");
      var randombytes = /* @__PURE__ */ __name(function() {
        throw new Error("no PRNG");
      }, "randombytes");
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf(), gf1 = gf([1]), _121665 = gf([56129, 1]), D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
      function ts64(x, i3, h, l2) {
        x[i3] = h >> 24 & 255;
        x[i3 + 1] = h >> 16 & 255;
        x[i3 + 2] = h >> 8 & 255;
        x[i3 + 3] = h & 255;
        x[i3 + 4] = l2 >> 24 & 255;
        x[i3 + 5] = l2 >> 16 & 255;
        x[i3 + 6] = l2 >> 8 & 255;
        x[i3 + 7] = l2 & 255;
      }
      __name(ts64, "ts64");
      function vn(x, xi, y, yi, n) {
        var i3, d2 = 0;
        for (i3 = 0; i3 < n; i3++)
          d2 |= x[xi + i3] ^ y[yi + i3];
        return (1 & d2 - 1 >>> 8) - 1;
      }
      __name(vn, "vn");
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16);
      }
      __name(crypto_verify_16, "crypto_verify_16");
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32);
      }
      __name(crypto_verify_32, "crypto_verify_32");
      function core_salsa20(o2, p2, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p2[0] & 255 | (p2[1] & 255) << 8 | (p2[2] & 255) << 16 | (p2[3] & 255) << 24, j7 = p2[4] & 255 | (p2[5] & 255) << 8 | (p2[6] & 255) << 16 | (p2[7] & 255) << 24, j8 = p2[8] & 255 | (p2[9] & 255) << 8 | (p2[10] & 255) << 16 | (p2[11] & 255) << 24, j9 = p2[12] & 255 | (p2[13] & 255) << 8 | (p2[14] & 255) << 16 | (p2[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i3 = 0; i3 < 20; i3 += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o2[0] = x0 >>> 0 & 255;
        o2[1] = x0 >>> 8 & 255;
        o2[2] = x0 >>> 16 & 255;
        o2[3] = x0 >>> 24 & 255;
        o2[4] = x1 >>> 0 & 255;
        o2[5] = x1 >>> 8 & 255;
        o2[6] = x1 >>> 16 & 255;
        o2[7] = x1 >>> 24 & 255;
        o2[8] = x2 >>> 0 & 255;
        o2[9] = x2 >>> 8 & 255;
        o2[10] = x2 >>> 16 & 255;
        o2[11] = x2 >>> 24 & 255;
        o2[12] = x3 >>> 0 & 255;
        o2[13] = x3 >>> 8 & 255;
        o2[14] = x3 >>> 16 & 255;
        o2[15] = x3 >>> 24 & 255;
        o2[16] = x4 >>> 0 & 255;
        o2[17] = x4 >>> 8 & 255;
        o2[18] = x4 >>> 16 & 255;
        o2[19] = x4 >>> 24 & 255;
        o2[20] = x5 >>> 0 & 255;
        o2[21] = x5 >>> 8 & 255;
        o2[22] = x5 >>> 16 & 255;
        o2[23] = x5 >>> 24 & 255;
        o2[24] = x6 >>> 0 & 255;
        o2[25] = x6 >>> 8 & 255;
        o2[26] = x6 >>> 16 & 255;
        o2[27] = x6 >>> 24 & 255;
        o2[28] = x7 >>> 0 & 255;
        o2[29] = x7 >>> 8 & 255;
        o2[30] = x7 >>> 16 & 255;
        o2[31] = x7 >>> 24 & 255;
        o2[32] = x8 >>> 0 & 255;
        o2[33] = x8 >>> 8 & 255;
        o2[34] = x8 >>> 16 & 255;
        o2[35] = x8 >>> 24 & 255;
        o2[36] = x9 >>> 0 & 255;
        o2[37] = x9 >>> 8 & 255;
        o2[38] = x9 >>> 16 & 255;
        o2[39] = x9 >>> 24 & 255;
        o2[40] = x10 >>> 0 & 255;
        o2[41] = x10 >>> 8 & 255;
        o2[42] = x10 >>> 16 & 255;
        o2[43] = x10 >>> 24 & 255;
        o2[44] = x11 >>> 0 & 255;
        o2[45] = x11 >>> 8 & 255;
        o2[46] = x11 >>> 16 & 255;
        o2[47] = x11 >>> 24 & 255;
        o2[48] = x12 >>> 0 & 255;
        o2[49] = x12 >>> 8 & 255;
        o2[50] = x12 >>> 16 & 255;
        o2[51] = x12 >>> 24 & 255;
        o2[52] = x13 >>> 0 & 255;
        o2[53] = x13 >>> 8 & 255;
        o2[54] = x13 >>> 16 & 255;
        o2[55] = x13 >>> 24 & 255;
        o2[56] = x14 >>> 0 & 255;
        o2[57] = x14 >>> 8 & 255;
        o2[58] = x14 >>> 16 & 255;
        o2[59] = x14 >>> 24 & 255;
        o2[60] = x15 >>> 0 & 255;
        o2[61] = x15 >>> 8 & 255;
        o2[62] = x15 >>> 16 & 255;
        o2[63] = x15 >>> 24 & 255;
      }
      __name(core_salsa20, "core_salsa20");
      function core_hsalsa20(o2, p2, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p2[0] & 255 | (p2[1] & 255) << 8 | (p2[2] & 255) << 16 | (p2[3] & 255) << 24, j7 = p2[4] & 255 | (p2[5] & 255) << 8 | (p2[6] & 255) << 16 | (p2[7] & 255) << 24, j8 = p2[8] & 255 | (p2[9] & 255) << 8 | (p2[10] & 255) << 16 | (p2[11] & 255) << 24, j9 = p2[12] & 255 | (p2[13] & 255) << 8 | (p2[14] & 255) << 16 | (p2[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i3 = 0; i3 < 20; i3 += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        o2[0] = x0 >>> 0 & 255;
        o2[1] = x0 >>> 8 & 255;
        o2[2] = x0 >>> 16 & 255;
        o2[3] = x0 >>> 24 & 255;
        o2[4] = x5 >>> 0 & 255;
        o2[5] = x5 >>> 8 & 255;
        o2[6] = x5 >>> 16 & 255;
        o2[7] = x5 >>> 24 & 255;
        o2[8] = x10 >>> 0 & 255;
        o2[9] = x10 >>> 8 & 255;
        o2[10] = x10 >>> 16 & 255;
        o2[11] = x10 >>> 24 & 255;
        o2[12] = x15 >>> 0 & 255;
        o2[13] = x15 >>> 8 & 255;
        o2[14] = x15 >>> 16 & 255;
        o2[15] = x15 >>> 24 & 255;
        o2[16] = x6 >>> 0 & 255;
        o2[17] = x6 >>> 8 & 255;
        o2[18] = x6 >>> 16 & 255;
        o2[19] = x6 >>> 24 & 255;
        o2[20] = x7 >>> 0 & 255;
        o2[21] = x7 >>> 8 & 255;
        o2[22] = x7 >>> 16 & 255;
        o2[23] = x7 >>> 24 & 255;
        o2[24] = x8 >>> 0 & 255;
        o2[25] = x8 >>> 8 & 255;
        o2[26] = x8 >>> 16 & 255;
        o2[27] = x8 >>> 24 & 255;
        o2[28] = x9 >>> 0 & 255;
        o2[29] = x9 >>> 8 & 255;
        o2[30] = x9 >>> 16 & 255;
        o2[31] = x9 >>> 24 & 255;
      }
      __name(core_hsalsa20, "core_hsalsa20");
      function crypto_core_salsa20(out, inp, k, c) {
        core_salsa20(out, inp, k, c);
      }
      __name(crypto_core_salsa20, "crypto_core_salsa20");
      function crypto_core_hsalsa20(out, inp, k, c) {
        core_hsalsa20(out, inp, k, c);
      }
      __name(crypto_core_hsalsa20, "crypto_core_hsalsa20");
      var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
      function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i3;
        for (i3 = 0; i3 < 16; i3++)
          z[i3] = 0;
        for (i3 = 0; i3 < 8; i3++)
          z[i3] = n[i3];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i3 = 0; i3 < 64; i3++)
            c[cpos + i3] = m[mpos + i3] ^ x[i3];
          u = 1;
          for (i3 = 8; i3 < 16; i3++) {
            u = u + (z[i3] & 255) | 0;
            z[i3] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
          mpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i3 = 0; i3 < b; i3++)
            c[cpos + i3] = m[mpos + i3] ^ x[i3];
        }
        return 0;
      }
      __name(crypto_stream_salsa20_xor, "crypto_stream_salsa20_xor");
      function crypto_stream_salsa20(c, cpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i3;
        for (i3 = 0; i3 < 16; i3++)
          z[i3] = 0;
        for (i3 = 0; i3 < 8; i3++)
          z[i3] = n[i3];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i3 = 0; i3 < 64; i3++)
            c[cpos + i3] = x[i3];
          u = 1;
          for (i3 = 8; i3 < 16; i3++) {
            u = u + (z[i3] & 255) | 0;
            z[i3] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i3 = 0; i3 < b; i3++)
            c[cpos + i3] = x[i3];
        }
        return 0;
      }
      __name(crypto_stream_salsa20, "crypto_stream_salsa20");
      function crypto_stream(c, cpos, d2, n, k) {
        var s2 = new Uint8Array(32);
        crypto_core_hsalsa20(s2, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i3 = 0; i3 < 8; i3++)
          sn[i3] = n[i3 + 16];
        return crypto_stream_salsa20(c, cpos, d2, sn, s2);
      }
      __name(crypto_stream, "crypto_stream");
      function crypto_stream_xor(c, cpos, m, mpos, d2, n, k) {
        var s2 = new Uint8Array(32);
        crypto_core_hsalsa20(s2, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i3 = 0; i3 < 8; i3++)
          sn[i3] = n[i3 + 16];
        return crypto_stream_salsa20_xor(c, cpos, m, mpos, d2, sn, s2);
      }
      __name(crypto_stream_xor, "crypto_stream_xor");
      var poly1305 = /* @__PURE__ */ __name(function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      }, "poly1305");
      poly1305.prototype.blocks = function(m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c = 0;
          d0 = c;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          d1 = c;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          d2 = c;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          d3 = c;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          d4 = c;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          d5 = c;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          d6 = c;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          d7 = c;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          d8 = c;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          d9 = c;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g = new Uint16Array(10);
        var c, mask, f, i3;
        if (this.leftover) {
          i3 = this.leftover;
          this.buffer[i3++] = 1;
          for (; i3 < 16; i3++)
            this.buffer[i3] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i3 = 2; i3 < 10; i3++) {
          this.h[i3] += c;
          c = this.h[i3] >>> 13;
          this.h[i3] &= 8191;
        }
        this.h[0] += c * 5;
        c = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c;
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c;
        g[0] = this.h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (i3 = 1; i3 < 10; i3++) {
          g[i3] = this.h[i3] + c;
          c = g[i3] >>> 13;
          g[i3] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c ^ 1) - 1;
        for (i3 = 0; i3 < 10; i3++)
          g[i3] &= mask;
        mask = ~mask;
        for (i3 = 0; i3 < 10; i3++)
          this.h[i3] = this.h[i3] & mask | g[i3];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f = this.h[0] + this.pad[0];
        this.h[0] = f & 65535;
        for (i3 = 1; i3 < 8; i3++) {
          f = (this.h[i3] + this.pad[i3] | 0) + (f >>> 16) | 0;
          this.h[i3] = f & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m, mpos, bytes) {
        var i3, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes)
            want = bytes;
          for (i3 = 0; i3 < want; i3++)
            this.buffer[this.leftover + i3] = m[mpos + i3];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16)
            return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i3 = 0; i3 < bytes; i3++)
            this.buffer[this.leftover + i3] = m[mpos + i3];
          this.leftover += bytes;
        }
      };
      function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
        var s2 = new poly1305(k);
        s2.update(m, mpos, n);
        s2.finish(out, outpos);
        return 0;
      }
      __name(crypto_onetimeauth, "crypto_onetimeauth");
      function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
        var x = new Uint8Array(16);
        crypto_onetimeauth(x, 0, m, mpos, n, k);
        return crypto_verify_16(h, hpos, x, 0);
      }
      __name(crypto_onetimeauth_verify, "crypto_onetimeauth_verify");
      function crypto_secretbox(c, m, d2, n, k) {
        var i3;
        if (d2 < 32)
          return -1;
        crypto_stream_xor(c, 0, m, 0, d2, n, k);
        crypto_onetimeauth(c, 16, c, 32, d2 - 32, c);
        for (i3 = 0; i3 < 16; i3++)
          c[i3] = 0;
        return 0;
      }
      __name(crypto_secretbox, "crypto_secretbox");
      function crypto_secretbox_open(m, c, d2, n, k) {
        var i3;
        var x = new Uint8Array(32);
        if (d2 < 32)
          return -1;
        crypto_stream(x, 0, 32, n, k);
        if (crypto_onetimeauth_verify(c, 16, c, 32, d2 - 32, x) !== 0)
          return -1;
        crypto_stream_xor(m, 0, c, 0, d2, n, k);
        for (i3 = 0; i3 < 32; i3++)
          m[i3] = 0;
        return 0;
      }
      __name(crypto_secretbox_open, "crypto_secretbox_open");
      function set25519(r, a) {
        var i3;
        for (i3 = 0; i3 < 16; i3++)
          r[i3] = a[i3] | 0;
      }
      __name(set25519, "set25519");
      function car25519(o2) {
        var i3, v, c = 1;
        for (i3 = 0; i3 < 16; i3++) {
          v = o2[i3] + c + 65535;
          c = Math.floor(v / 65536);
          o2[i3] = v - c * 65536;
        }
        o2[0] += c - 1 + 37 * (c - 1);
      }
      __name(car25519, "car25519");
      function sel25519(p2, q, b) {
        var t, c = ~(b - 1);
        for (var i3 = 0; i3 < 16; i3++) {
          t = c & (p2[i3] ^ q[i3]);
          p2[i3] ^= t;
          q[i3] ^= t;
        }
      }
      __name(sel25519, "sel25519");
      function pack25519(o2, n) {
        var i3, j, b;
        var m = gf(), t = gf();
        for (i3 = 0; i3 < 16; i3++)
          t[i3] = n[i3];
        car25519(t);
        car25519(t);
        car25519(t);
        for (j = 0; j < 2; j++) {
          m[0] = t[0] - 65517;
          for (i3 = 1; i3 < 15; i3++) {
            m[i3] = t[i3] - 65535 - (m[i3 - 1] >> 16 & 1);
            m[i3 - 1] &= 65535;
          }
          m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
          b = m[15] >> 16 & 1;
          m[14] &= 65535;
          sel25519(t, m, 1 - b);
        }
        for (i3 = 0; i3 < 16; i3++) {
          o2[2 * i3] = t[i3] & 255;
          o2[2 * i3 + 1] = t[i3] >> 8;
        }
      }
      __name(pack25519, "pack25519");
      function neq25519(a, b) {
        var c = new Uint8Array(32), d2 = new Uint8Array(32);
        pack25519(c, a);
        pack25519(d2, b);
        return crypto_verify_32(c, 0, d2, 0);
      }
      __name(neq25519, "neq25519");
      function par25519(a) {
        var d2 = new Uint8Array(32);
        pack25519(d2, a);
        return d2[0] & 1;
      }
      __name(par25519, "par25519");
      function unpack25519(o2, n) {
        var i3;
        for (i3 = 0; i3 < 16; i3++)
          o2[i3] = n[2 * i3] + (n[2 * i3 + 1] << 8);
        o2[15] &= 32767;
      }
      __name(unpack25519, "unpack25519");
      function A(o2, a, b) {
        for (var i3 = 0; i3 < 16; i3++)
          o2[i3] = a[i3] + b[i3];
      }
      __name(A, "A");
      function Z(o2, a, b) {
        for (var i3 = 0; i3 < 16; i3++)
          o2[i3] = a[i3] - b[i3];
      }
      __name(Z, "Z");
      function M(o2, a, b) {
        var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        o2[0] = t0;
        o2[1] = t1;
        o2[2] = t2;
        o2[3] = t3;
        o2[4] = t4;
        o2[5] = t5;
        o2[6] = t6;
        o2[7] = t7;
        o2[8] = t8;
        o2[9] = t9;
        o2[10] = t10;
        o2[11] = t11;
        o2[12] = t12;
        o2[13] = t13;
        o2[14] = t14;
        o2[15] = t15;
      }
      __name(M, "M");
      function S(o2, a) {
        M(o2, a, a);
      }
      __name(S, "S");
      function inv25519(o2, i3) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++)
          c[a] = i3[a];
        for (a = 253; a >= 0; a--) {
          S(c, c);
          if (a !== 2 && a !== 4)
            M(c, c, i3);
        }
        for (a = 0; a < 16; a++)
          o2[a] = c[a];
      }
      __name(inv25519, "inv25519");
      function pow2523(o2, i3) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++)
          c[a] = i3[a];
        for (a = 250; a >= 0; a--) {
          S(c, c);
          if (a !== 1)
            M(c, c, i3);
        }
        for (a = 0; a < 16; a++)
          o2[a] = c[a];
      }
      __name(pow2523, "pow2523");
      function crypto_scalarmult(q, n, p2) {
        var z = new Uint8Array(32);
        var x = new Float64Array(80), r, i3;
        var a = gf(), b = gf(), c = gf(), d2 = gf(), e2 = gf(), f = gf();
        for (i3 = 0; i3 < 31; i3++)
          z[i3] = n[i3];
        z[31] = n[31] & 127 | 64;
        z[0] &= 248;
        unpack25519(x, p2);
        for (i3 = 0; i3 < 16; i3++) {
          b[i3] = x[i3];
          d2[i3] = a[i3] = c[i3] = 0;
        }
        a[0] = d2[0] = 1;
        for (i3 = 254; i3 >= 0; --i3) {
          r = z[i3 >>> 3] >>> (i3 & 7) & 1;
          sel25519(a, b, r);
          sel25519(c, d2, r);
          A(e2, a, c);
          Z(a, a, c);
          A(c, b, d2);
          Z(b, b, d2);
          S(d2, e2);
          S(f, a);
          M(a, c, a);
          M(c, b, e2);
          A(e2, a, c);
          Z(a, a, c);
          S(b, a);
          Z(c, d2, f);
          M(a, c, _121665);
          A(a, a, d2);
          M(c, c, a);
          M(a, d2, f);
          M(d2, b, x);
          S(b, e2);
          sel25519(a, b, r);
          sel25519(c, d2, r);
        }
        for (i3 = 0; i3 < 16; i3++) {
          x[i3 + 16] = a[i3];
          x[i3 + 32] = c[i3];
          x[i3 + 48] = b[i3];
          x[i3 + 64] = d2[i3];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        inv25519(x32, x32);
        M(x16, x16, x32);
        pack25519(q, x16);
        return 0;
      }
      __name(crypto_scalarmult, "crypto_scalarmult");
      function crypto_scalarmult_base(q, n) {
        return crypto_scalarmult(q, n, _9);
      }
      __name(crypto_scalarmult_base, "crypto_scalarmult_base");
      function crypto_box_keypair(y, x) {
        randombytes(x, 32);
        return crypto_scalarmult_base(y, x);
      }
      __name(crypto_box_keypair, "crypto_box_keypair");
      function crypto_box_beforenm(k, y, x) {
        var s2 = new Uint8Array(32);
        crypto_scalarmult(s2, x, y);
        return crypto_core_hsalsa20(k, _0, s2, sigma);
      }
      __name(crypto_box_beforenm, "crypto_box_beforenm");
      var crypto_box_afternm = crypto_secretbox;
      var crypto_box_open_afternm = crypto_secretbox_open;
      function crypto_box(c, m, d2, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_afternm(c, m, d2, n, k);
      }
      __name(crypto_box, "crypto_box");
      function crypto_box_open(m, c, d2, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_open_afternm(m, c, d2, n, k);
      }
      __name(crypto_box_open, "crypto_box_open");
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function crypto_hashblocks_hl(hh, hl, m, n) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i3, j, h, l2, a, b, c, d2;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n >= 128) {
          for (i3 = 0; i3 < 16; i3++) {
            j = 8 * i3 + pos;
            wh[i3] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
            wl[i3] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
          }
          for (i3 = 0; i3 < 80; i3++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h = ah7;
            l2 = al7;
            a = l2 & 65535;
            b = l2 >>> 16;
            c = h & 65535;
            d2 = h >>> 16;
            h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l2 = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a += l2 & 65535;
            b += l2 >>> 16;
            c += h & 65535;
            d2 += h >>> 16;
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l2 = al4 & al5 ^ ~al4 & al6;
            a += l2 & 65535;
            b += l2 >>> 16;
            c += h & 65535;
            d2 += h >>> 16;
            h = K[i3 * 2];
            l2 = K[i3 * 2 + 1];
            a += l2 & 65535;
            b += l2 >>> 16;
            c += h & 65535;
            d2 += h >>> 16;
            h = wh[i3 % 16];
            l2 = wl[i3 % 16];
            a += l2 & 65535;
            b += l2 >>> 16;
            c += h & 65535;
            d2 += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d2 += c >>> 16;
            th = c & 65535 | d2 << 16;
            tl = a & 65535 | b << 16;
            h = th;
            l2 = tl;
            a = l2 & 65535;
            b = l2 >>> 16;
            c = h & 65535;
            d2 = h >>> 16;
            h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l2 = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a += l2 & 65535;
            b += l2 >>> 16;
            c += h & 65535;
            d2 += h >>> 16;
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l2 = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l2 & 65535;
            b += l2 >>> 16;
            c += h & 65535;
            d2 += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d2 += c >>> 16;
            bh7 = c & 65535 | d2 << 16;
            bl7 = a & 65535 | b << 16;
            h = bh3;
            l2 = bl3;
            a = l2 & 65535;
            b = l2 >>> 16;
            c = h & 65535;
            d2 = h >>> 16;
            h = th;
            l2 = tl;
            a += l2 & 65535;
            b += l2 >>> 16;
            c += h & 65535;
            d2 += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d2 += c >>> 16;
            bh3 = c & 65535 | d2 << 16;
            bl3 = a & 65535 | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i3 % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h = wh[j];
                l2 = wl[j];
                a = l2 & 65535;
                b = l2 >>> 16;
                c = h & 65535;
                d2 = h >>> 16;
                h = wh[(j + 9) % 16];
                l2 = wl[(j + 9) % 16];
                a += l2 & 65535;
                b += l2 >>> 16;
                c += h & 65535;
                d2 += h >>> 16;
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l2 = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a += l2 & 65535;
                b += l2 >>> 16;
                c += h & 65535;
                d2 += h >>> 16;
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l2 = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a += l2 & 65535;
                b += l2 >>> 16;
                c += h & 65535;
                d2 += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d2 += c >>> 16;
                wh[j] = c & 65535 | d2 << 16;
                wl[j] = a & 65535 | b << 16;
              }
            }
          }
          h = ah0;
          l2 = al0;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[0];
          l2 = hl[0];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[0] = ah0 = c & 65535 | d2 << 16;
          hl[0] = al0 = a & 65535 | b << 16;
          h = ah1;
          l2 = al1;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[1];
          l2 = hl[1];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[1] = ah1 = c & 65535 | d2 << 16;
          hl[1] = al1 = a & 65535 | b << 16;
          h = ah2;
          l2 = al2;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[2];
          l2 = hl[2];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[2] = ah2 = c & 65535 | d2 << 16;
          hl[2] = al2 = a & 65535 | b << 16;
          h = ah3;
          l2 = al3;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[3];
          l2 = hl[3];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[3] = ah3 = c & 65535 | d2 << 16;
          hl[3] = al3 = a & 65535 | b << 16;
          h = ah4;
          l2 = al4;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[4];
          l2 = hl[4];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[4] = ah4 = c & 65535 | d2 << 16;
          hl[4] = al4 = a & 65535 | b << 16;
          h = ah5;
          l2 = al5;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[5];
          l2 = hl[5];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[5] = ah5 = c & 65535 | d2 << 16;
          hl[5] = al5 = a & 65535 | b << 16;
          h = ah6;
          l2 = al6;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[6];
          l2 = hl[6];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[6] = ah6 = c & 65535 | d2 << 16;
          hl[6] = al6 = a & 65535 | b << 16;
          h = ah7;
          l2 = al7;
          a = l2 & 65535;
          b = l2 >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = hh[7];
          l2 = hl[7];
          a += l2 & 65535;
          b += l2 >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          hh[7] = ah7 = c & 65535 | d2 << 16;
          hl[7] = al7 = a & 65535 | b << 16;
          pos += 128;
          n -= 128;
        }
        return n;
      }
      __name(crypto_hashblocks_hl, "crypto_hashblocks_hl");
      function crypto_hash(out, m, n) {
        var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i3, b = n;
        hh[0] = 1779033703;
        hh[1] = 3144134277;
        hh[2] = 1013904242;
        hh[3] = 2773480762;
        hh[4] = 1359893119;
        hh[5] = 2600822924;
        hh[6] = 528734635;
        hh[7] = 1541459225;
        hl[0] = 4089235720;
        hl[1] = 2227873595;
        hl[2] = 4271175723;
        hl[3] = 1595750129;
        hl[4] = 2917565137;
        hl[5] = 725511199;
        hl[6] = 4215389547;
        hl[7] = 327033209;
        crypto_hashblocks_hl(hh, hl, m, n);
        n %= 128;
        for (i3 = 0; i3 < n; i3++)
          x[i3] = m[b - n + i3];
        x[n] = 128;
        n = 256 - 128 * (n < 112 ? 1 : 0);
        x[n - 9] = 0;
        ts64(x, n - 8, b / 536870912 | 0, b << 3);
        crypto_hashblocks_hl(hh, hl, x, n);
        for (i3 = 0; i3 < 8; i3++)
          ts64(out, 8 * i3, hh[i3], hl[i3]);
        return 0;
      }
      __name(crypto_hash, "crypto_hash");
      function add(p2, q) {
        var a = gf(), b = gf(), c = gf(), d2 = gf(), e2 = gf(), f = gf(), g = gf(), h = gf(), t = gf();
        Z(a, p2[1], p2[0]);
        Z(t, q[1], q[0]);
        M(a, a, t);
        A(b, p2[0], p2[1]);
        A(t, q[0], q[1]);
        M(b, b, t);
        M(c, p2[3], q[3]);
        M(c, c, D2);
        M(d2, p2[2], q[2]);
        A(d2, d2, d2);
        Z(e2, b, a);
        Z(f, d2, c);
        A(g, d2, c);
        A(h, b, a);
        M(p2[0], e2, f);
        M(p2[1], h, g);
        M(p2[2], g, f);
        M(p2[3], e2, h);
      }
      __name(add, "add");
      function cswap(p2, q, b) {
        var i3;
        for (i3 = 0; i3 < 4; i3++) {
          sel25519(p2[i3], q[i3], b);
        }
      }
      __name(cswap, "cswap");
      function pack(r, p2) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p2[2]);
        M(tx, p2[0], zi);
        M(ty, p2[1], zi);
        pack25519(r, ty);
        r[31] ^= par25519(tx) << 7;
      }
      __name(pack, "pack");
      function scalarmult(p2, q, s2) {
        var b, i3;
        set25519(p2[0], gf0);
        set25519(p2[1], gf1);
        set25519(p2[2], gf1);
        set25519(p2[3], gf0);
        for (i3 = 255; i3 >= 0; --i3) {
          b = s2[i3 / 8 | 0] >> (i3 & 7) & 1;
          cswap(p2, q, b);
          add(q, p2);
          add(p2, p2);
          cswap(p2, q, b);
        }
      }
      __name(scalarmult, "scalarmult");
      function scalarbase(p2, s2) {
        var q = [gf(), gf(), gf(), gf()];
        set25519(q[0], X);
        set25519(q[1], Y);
        set25519(q[2], gf1);
        M(q[3], X, Y);
        scalarmult(p2, q, s2);
      }
      __name(scalarbase, "scalarbase");
      function crypto_sign_keypair(pk, sk, seeded) {
        var d2 = new Uint8Array(64);
        var p2 = [gf(), gf(), gf(), gf()];
        var i3;
        if (!seeded)
          randombytes(sk, 32);
        crypto_hash(d2, sk, 32);
        d2[0] &= 248;
        d2[31] &= 127;
        d2[31] |= 64;
        scalarbase(p2, d2);
        pack(pk, p2);
        for (i3 = 0; i3 < 32; i3++)
          sk[i3 + 32] = pk[i3];
        return 0;
      }
      __name(crypto_sign_keypair, "crypto_sign_keypair");
      var L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
      function modL(r, x) {
        var carry, i3, j, k;
        for (i3 = 63; i3 >= 32; --i3) {
          carry = 0;
          for (j = i3 - 32, k = i3 - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i3] * L[j - (i3 - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
          }
          x[j] += carry;
          x[i3] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L[j];
          carry = x[j] >> 8;
          x[j] &= 255;
        }
        for (j = 0; j < 32; j++)
          x[j] -= carry * L[j];
        for (i3 = 0; i3 < 32; i3++) {
          x[i3 + 1] += x[i3] >> 8;
          r[i3] = x[i3] & 255;
        }
      }
      __name(modL, "modL");
      function reduce(r) {
        var x = new Float64Array(64), i3;
        for (i3 = 0; i3 < 64; i3++)
          x[i3] = r[i3];
        for (i3 = 0; i3 < 64; i3++)
          r[i3] = 0;
        modL(r, x);
      }
      __name(reduce, "reduce");
      function crypto_sign(sm, m, n, sk) {
        var d2 = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
        var i3, j, x = new Float64Array(64);
        var p2 = [gf(), gf(), gf(), gf()];
        crypto_hash(d2, sk, 32);
        d2[0] &= 248;
        d2[31] &= 127;
        d2[31] |= 64;
        var smlen = n + 64;
        for (i3 = 0; i3 < n; i3++)
          sm[64 + i3] = m[i3];
        for (i3 = 0; i3 < 32; i3++)
          sm[32 + i3] = d2[32 + i3];
        crypto_hash(r, sm.subarray(32), n + 32);
        reduce(r);
        scalarbase(p2, r);
        pack(sm, p2);
        for (i3 = 32; i3 < 64; i3++)
          sm[i3] = sk[i3];
        crypto_hash(h, sm, n + 64);
        reduce(h);
        for (i3 = 0; i3 < 64; i3++)
          x[i3] = 0;
        for (i3 = 0; i3 < 32; i3++)
          x[i3] = r[i3];
        for (i3 = 0; i3 < 32; i3++) {
          for (j = 0; j < 32; j++) {
            x[i3 + j] += h[i3] * d2[j];
          }
        }
        modL(sm.subarray(32), x);
        return smlen;
      }
      __name(crypto_sign, "crypto_sign");
      function unpackneg(r, p2) {
        var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r[2], gf1);
        unpack25519(r[1], p2);
        S(num, r[1]);
        M(den, num, D);
        Z(num, num, r[2]);
        A(den, r[2], den);
        S(den2, den);
        S(den4, den2);
        M(den6, den4, den2);
        M(t, den6, num);
        M(t, t, den);
        pow2523(t, t);
        M(t, t, num);
        M(t, t, den);
        M(t, t, den);
        M(r[0], t, den);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num))
          M(r[0], r[0], I);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num))
          return -1;
        if (par25519(r[0]) === p2[31] >> 7)
          Z(r[0], gf0, r[0]);
        M(r[3], r[0], r[1]);
        return 0;
      }
      __name(unpackneg, "unpackneg");
      function crypto_sign_open(m, sm, n, pk) {
        var i3;
        var t = new Uint8Array(32), h = new Uint8Array(64);
        var p2 = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
        if (n < 64)
          return -1;
        if (unpackneg(q, pk))
          return -1;
        for (i3 = 0; i3 < n; i3++)
          m[i3] = sm[i3];
        for (i3 = 0; i3 < 32; i3++)
          m[i3 + 32] = pk[i3];
        crypto_hash(h, m, n);
        reduce(h);
        scalarmult(p2, q, h);
        scalarbase(q, sm.subarray(32));
        add(p2, q);
        pack(t, p2);
        n -= 64;
        if (crypto_verify_32(sm, 0, t, 0)) {
          for (i3 = 0; i3 < n; i3++)
            m[i3] = 0;
          return -1;
        }
        for (i3 = 0; i3 < n; i3++)
          m[i3] = sm[i3 + 64];
        return n;
      }
      __name(crypto_sign_open, "crypto_sign_open");
      var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
      nacl.lowlevel = {
        crypto_core_hsalsa20,
        crypto_stream_xor,
        crypto_stream,
        crypto_stream_salsa20_xor,
        crypto_stream_salsa20,
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_verify_16,
        crypto_verify_32,
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_box_beforenm,
        crypto_box_afternm,
        crypto_box,
        crypto_box_open,
        crypto_box_keypair,
        crypto_hash,
        crypto_sign,
        crypto_sign_keypair,
        crypto_sign_open,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_hash_BYTES,
        gf,
        D,
        L,
        pack25519,
        unpack25519,
        M,
        A,
        S,
        Z,
        pow2523,
        add,
        set25519,
        modL,
        scalarmult,
        scalarbase
      };
      function checkLengths(k, n) {
        if (k.length !== crypto_secretbox_KEYBYTES)
          throw new Error("bad key size");
        if (n.length !== crypto_secretbox_NONCEBYTES)
          throw new Error("bad nonce size");
      }
      __name(checkLengths, "checkLengths");
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        if (sk.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
      }
      __name(checkBoxLengths, "checkBoxLengths");
      function checkArrayTypes() {
        for (var i3 = 0; i3 < arguments.length; i3++) {
          if (!(arguments[i3] instanceof Uint8Array))
            throw new TypeError("unexpected type, use Uint8Array");
        }
      }
      __name(checkArrayTypes, "checkArrayTypes");
      function cleanup(arr) {
        for (var i3 = 0; i3 < arr.length; i3++)
          arr[i3] = 0;
      }
      __name(cleanup, "cleanup");
      nacl.randomBytes = function(n) {
        var b = new Uint8Array(n);
        randombytes(b, n);
        return b;
      };
      nacl.secretbox = function(msg, nonce, key) {
        checkArrayTypes(msg, nonce, key);
        checkLengths(key, nonce);
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
        var c = new Uint8Array(m.length);
        for (var i3 = 0; i3 < msg.length; i3++)
          m[i3 + crypto_secretbox_ZEROBYTES] = msg[i3];
        crypto_secretbox(c, m, m.length, nonce, key);
        return c.subarray(crypto_secretbox_BOXZEROBYTES);
      };
      nacl.secretbox.open = function(box, nonce, key) {
        checkArrayTypes(box, nonce, key);
        checkLengths(key, nonce);
        var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
        var m = new Uint8Array(c.length);
        for (var i3 = 0; i3 < box.length; i3++)
          c[i3 + crypto_secretbox_BOXZEROBYTES] = box[i3];
        if (c.length < 32)
          return null;
        if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0)
          return null;
        return m.subarray(crypto_secretbox_ZEROBYTES);
      };
      nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
      nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
      nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
      nacl.scalarMult = function(n, p2) {
        checkArrayTypes(n, p2);
        if (n.length !== crypto_scalarmult_SCALARBYTES)
          throw new Error("bad n size");
        if (p2.length !== crypto_scalarmult_BYTES)
          throw new Error("bad p size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult(q, n, p2);
        return q;
      };
      nacl.scalarMult.base = function(n) {
        checkArrayTypes(n);
        if (n.length !== crypto_scalarmult_SCALARBYTES)
          throw new Error("bad n size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult_base(q, n);
        return q;
      };
      nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
      nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
      nacl.box = function(msg, nonce, publicKey, secretKey) {
        var k = nacl.box.before(publicKey, secretKey);
        return nacl.secretbox(msg, nonce, k);
      };
      nacl.box.before = function(publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey);
        checkBoxLengths(publicKey, secretKey);
        var k = new Uint8Array(crypto_box_BEFORENMBYTES);
        crypto_box_beforenm(k, publicKey, secretKey);
        return k;
      };
      nacl.box.after = nacl.secretbox;
      nacl.box.open = function(msg, nonce, publicKey, secretKey) {
        var k = nacl.box.before(publicKey, secretKey);
        return nacl.secretbox.open(msg, nonce, k);
      };
      nacl.box.open.after = nacl.secretbox.open;
      nacl.box.keyPair = function() {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl.box.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult_base(pk, secretKey);
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
      nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
      nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
      nacl.box.nonceLength = crypto_box_NONCEBYTES;
      nacl.box.overheadLength = nacl.secretbox.overheadLength;
      nacl.sign = function(msg, secretKey) {
        checkArrayTypes(msg, secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
        crypto_sign(signedMsg, msg, msg.length, secretKey);
        return signedMsg;
      };
      nacl.sign.open = function(signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey);
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var tmp = new Uint8Array(signedMsg.length);
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
        if (mlen < 0)
          return null;
        var m = new Uint8Array(mlen);
        for (var i3 = 0; i3 < m.length; i3++)
          m[i3] = tmp[i3];
        return m;
      };
      nacl.sign.detached = function(msg, secretKey) {
        var signedMsg = nacl.sign(msg, secretKey);
        var sig = new Uint8Array(crypto_sign_BYTES);
        for (var i3 = 0; i3 < sig.length; i3++)
          sig[i3] = signedMsg[i3];
        return sig;
      };
      nacl.sign.detached.verify = function(msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey);
        if (sig.length !== crypto_sign_BYTES)
          throw new Error("bad signature size");
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
        var m = new Uint8Array(crypto_sign_BYTES + msg.length);
        var i3;
        for (i3 = 0; i3 < crypto_sign_BYTES; i3++)
          sm[i3] = sig[i3];
        for (i3 = 0; i3 < msg.length; i3++)
          sm[i3 + crypto_sign_BYTES] = msg[i3];
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
      };
      nacl.sign.keyPair = function() {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        crypto_sign_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl.sign.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        for (var i3 = 0; i3 < pk.length; i3++)
          pk[i3] = secretKey[32 + i3];
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl.sign.keyPair.fromSeed = function(seed) {
        checkArrayTypes(seed);
        if (seed.length !== crypto_sign_SEEDBYTES)
          throw new Error("bad seed size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        for (var i3 = 0; i3 < 32; i3++)
          sk[i3] = seed[i3];
        crypto_sign_keypair(pk, sk, true);
        return { publicKey: pk, secretKey: sk };
      };
      nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
      nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
      nacl.sign.seedLength = crypto_sign_SEEDBYTES;
      nacl.sign.signatureLength = crypto_sign_BYTES;
      nacl.hash = function(msg) {
        checkArrayTypes(msg);
        var h = new Uint8Array(crypto_hash_BYTES);
        crypto_hash(h, msg, msg.length);
        return h;
      };
      nacl.hash.hashLength = crypto_hash_BYTES;
      nacl.verify = function(x, y) {
        checkArrayTypes(x, y);
        if (x.length === 0 || y.length === 0)
          return false;
        if (x.length !== y.length)
          return false;
        return vn(x, 0, y, 0, x.length) === 0 ? true : false;
      };
      nacl.setPRNG = function(fn) {
        randombytes = fn;
      };
      (function() {
        var crypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (crypto && crypto.getRandomValues) {
          var QUOTA = 65536;
          nacl.setPRNG(function(x, n) {
            var i3, v = new Uint8Array(n);
            for (i3 = 0; i3 < n; i3 += QUOTA) {
              crypto.getRandomValues(v.subarray(i3, i3 + Math.min(n - i3, QUOTA)));
            }
            for (i3 = 0; i3 < n; i3++)
              x[i3] = v[i3];
            cleanup(v);
          });
        } else if (typeof __require !== "undefined") {
          crypto = require_crypto();
          if (crypto && crypto.randomBytes) {
            nacl.setPRNG(function(x, n) {
              var i3, v = crypto.randomBytes(n);
              for (i3 = 0; i3 < n; i3++)
                x[i3] = v[i3];
              cleanup(v);
            });
          }
        }
      })();
    })(typeof module !== "undefined" && module.exports ? module.exports : self.nacl = self.nacl || {});
  }
});

// node_modules/discord-interactions/dist/components.js
var require_components = __commonJS({
  "node_modules/discord-interactions/dist/components.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextStyleTypes = exports.ChannelTypes = exports.ButtonStyleTypes = exports.MessageComponentTypes = void 0;
    var MessageComponentTypes3;
    (function(MessageComponentTypes4) {
      MessageComponentTypes4[MessageComponentTypes4["ACTION_ROW"] = 1] = "ACTION_ROW";
      MessageComponentTypes4[MessageComponentTypes4["BUTTON"] = 2] = "BUTTON";
      MessageComponentTypes4[MessageComponentTypes4["STRING_SELECT"] = 3] = "STRING_SELECT";
      MessageComponentTypes4[MessageComponentTypes4["INPUT_TEXT"] = 4] = "INPUT_TEXT";
      MessageComponentTypes4[MessageComponentTypes4["USER_SELECT"] = 5] = "USER_SELECT";
      MessageComponentTypes4[MessageComponentTypes4["ROLE_SELECT"] = 6] = "ROLE_SELECT";
      MessageComponentTypes4[MessageComponentTypes4["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
      MessageComponentTypes4[MessageComponentTypes4["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
    })(MessageComponentTypes3 = exports.MessageComponentTypes || (exports.MessageComponentTypes = {}));
    var ButtonStyleTypes2;
    (function(ButtonStyleTypes3) {
      ButtonStyleTypes3[ButtonStyleTypes3["PRIMARY"] = 1] = "PRIMARY";
      ButtonStyleTypes3[ButtonStyleTypes3["SECONDARY"] = 2] = "SECONDARY";
      ButtonStyleTypes3[ButtonStyleTypes3["SUCCESS"] = 3] = "SUCCESS";
      ButtonStyleTypes3[ButtonStyleTypes3["DANGER"] = 4] = "DANGER";
      ButtonStyleTypes3[ButtonStyleTypes3["LINK"] = 5] = "LINK";
    })(ButtonStyleTypes2 = exports.ButtonStyleTypes || (exports.ButtonStyleTypes = {}));
    var ChannelTypes;
    (function(ChannelTypes2) {
      ChannelTypes2[ChannelTypes2["DM"] = 1] = "DM";
      ChannelTypes2[ChannelTypes2["GROUP_DM"] = 3] = "GROUP_DM";
      ChannelTypes2[ChannelTypes2["GUILD_TEXT"] = 0] = "GUILD_TEXT";
      ChannelTypes2[ChannelTypes2["GUILD_VOICE"] = 2] = "GUILD_VOICE";
      ChannelTypes2[ChannelTypes2["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
      ChannelTypes2[ChannelTypes2["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
      ChannelTypes2[ChannelTypes2["GUILD_STORE"] = 6] = "GUILD_STORE";
    })(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
    var TextStyleTypes;
    (function(TextStyleTypes2) {
      TextStyleTypes2[TextStyleTypes2["SHORT"] = 1] = "SHORT";
      TextStyleTypes2[TextStyleTypes2["PARAGRAPH"] = 2] = "PARAGRAPH";
    })(TextStyleTypes = exports.TextStyleTypes || (exports.TextStyleTypes = {}));
  }
});

// node_modules/discord-interactions/dist/index.js
var require_dist = __commonJS({
  "node_modules/discord-interactions/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o2, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o2, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o2, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o2[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p2 in m)
        if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
          __createBinding(exports2, m, p2);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verifyKeyMiddleware = exports.verifyKey = exports.InteractionResponseFlags = exports.InteractionResponseType = exports.InteractionType = void 0;
    var tweetnacl_1 = __importDefault(require_nacl_fast());
    var InteractionType2;
    (function(InteractionType3) {
      InteractionType3[InteractionType3["PING"] = 1] = "PING";
      InteractionType3[InteractionType3["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
      InteractionType3[InteractionType3["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
      InteractionType3[InteractionType3["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
      InteractionType3[InteractionType3["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
    })(InteractionType2 = exports.InteractionType || (exports.InteractionType = {}));
    var InteractionResponseType3;
    (function(InteractionResponseType4) {
      InteractionResponseType4[InteractionResponseType4["PONG"] = 1] = "PONG";
      InteractionResponseType4[InteractionResponseType4["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
      InteractionResponseType4[InteractionResponseType4["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
      InteractionResponseType4[InteractionResponseType4["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
      InteractionResponseType4[InteractionResponseType4["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
      InteractionResponseType4[InteractionResponseType4["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
      InteractionResponseType4[InteractionResponseType4["MODAL"] = 9] = "MODAL";
    })(InteractionResponseType3 = exports.InteractionResponseType || (exports.InteractionResponseType = {}));
    var InteractionResponseFlags2;
    (function(InteractionResponseFlags3) {
      InteractionResponseFlags3[InteractionResponseFlags3["EPHEMERAL"] = 64] = "EPHEMERAL";
    })(InteractionResponseFlags2 = exports.InteractionResponseFlags || (exports.InteractionResponseFlags = {}));
    function valueToUint8Array(value, format) {
      if (value == null) {
        return new Uint8Array();
      }
      if (typeof value === "string") {
        if (format === "hex") {
          const matches = value.match(/.{1,2}/g);
          if (matches == null) {
            throw new Error("Value is not a valid hex string");
          }
          const hexVal = matches.map((byte) => parseInt(byte, 16));
          return new Uint8Array(hexVal);
        } else {
          return new TextEncoder().encode(value);
        }
      }
      try {
        if (Buffer.isBuffer(value)) {
          return new Uint8Array(value);
        }
      } catch (ex) {
      }
      if (value instanceof ArrayBuffer) {
        return new Uint8Array(value);
      }
      if (value instanceof Uint8Array) {
        return value;
      }
      throw new Error("Unrecognized value type, must be one of: string, Buffer, ArrayBuffer, Uint8Array");
    }
    __name(valueToUint8Array, "valueToUint8Array");
    function concatUint8Arrays(arr1, arr2) {
      const merged = new Uint8Array(arr1.length + arr2.length);
      merged.set(arr1);
      merged.set(arr2, arr1.length);
      return merged;
    }
    __name(concatUint8Arrays, "concatUint8Arrays");
    function verifyKey2(rawBody, signature, timestamp, clientPublicKey) {
      try {
        const timestampData = valueToUint8Array(timestamp);
        const bodyData = valueToUint8Array(rawBody);
        const message = concatUint8Arrays(timestampData, bodyData);
        const signatureData = valueToUint8Array(signature, "hex");
        const publicKeyData = valueToUint8Array(clientPublicKey, "hex");
        return tweetnacl_1.default.sign.detached.verify(message, signatureData, publicKeyData);
      } catch (ex) {
        console.error("[discord-interactions]: Invalid verifyKey parameters", ex);
        return false;
      }
    }
    __name(verifyKey2, "verifyKey");
    exports.verifyKey = verifyKey2;
    function verifyKeyMiddleware(clientPublicKey) {
      if (!clientPublicKey) {
        throw new Error("You must specify a Discord client public key");
      }
      return function(req, res, next) {
        const timestamp = req.header("X-Signature-Timestamp") || "";
        const signature = req.header("X-Signature-Ed25519") || "";
        function onBodyComplete(rawBody) {
          if (!verifyKey2(rawBody, signature, timestamp, clientPublicKey)) {
            res.statusCode = 401;
            res.end("[discord-interactions] Invalid signature");
            return;
          }
          const body = JSON.parse(rawBody.toString("utf-8")) || {};
          if (body.type === InteractionType2.PING) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
              type: InteractionResponseType3.PONG
            }));
            return;
          }
          req.body = body;
          next();
        }
        __name(onBodyComplete, "onBodyComplete");
        if (req.body) {
          if (Buffer.isBuffer(req.body)) {
            onBodyComplete(req.body);
          } else if (typeof req.body === "string") {
            onBodyComplete(Buffer.from(req.body, "utf-8"));
          } else {
            console.warn("[discord-interactions]: req.body was tampered with, probably by some other middleware. We recommend disabling middleware for interaction routes so that req.body is a raw buffer.");
            onBodyComplete(Buffer.from(JSON.stringify(req.body), "utf-8"));
          }
        } else {
          const chunks = [];
          req.on("data", (chunk) => {
            chunks.push(chunk);
          });
          req.on("end", () => {
            const rawBody = Buffer.concat(chunks);
            onBodyComplete(rawBody);
          });
        }
      };
    }
    __name(verifyKeyMiddleware, "verifyKeyMiddleware");
    exports.verifyKeyMiddleware = verifyKeyMiddleware;
    __exportStar(require_components(), exports);
  }
});

// .wrangler/tmp/bundle-WVMLaz/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-WVMLaz/middleware-insertion-facade.js
init_modules_watch_stub();

// src/server.js
init_modules_watch_stub();

// node_modules/itty-router/index.mjs
init_modules_watch_stub();
var e = /* @__PURE__ */ __name(({ base: e2 = "", routes: t = [] } = {}) => ({ __proto__: new Proxy({}, { get: (o2, s2, r, n) => (o3, ...a) => t.push([s2.toUpperCase(), RegExp(`^${(n = (e2 + "/" + o3).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`), a, n]) && r }), routes: t, async handle(e3, ...o2) {
  let s2, r, n = new URL(e3.url), a = e3.query = { __proto__: null };
  for (let [e4, t2] of n.searchParams)
    a[e4] = void 0 === a[e4] ? t2 : [a[e4], t2].flat();
  for (let [a2, c, l2, i3] of t)
    if ((a2 === e3.method || "ALL" === a2) && (r = n.pathname.match(c))) {
      e3.params = r.groups || {}, e3.route = i3;
      for (let t2 of l2)
        if (void 0 !== (s2 = await t2(e3.proxy || e3, ...o2)))
          return s2;
    }
} }), "e");
var o = /* @__PURE__ */ __name((e2 = "text/plain; charset=utf-8", t) => (o2, s2) => {
  const { headers: r = {}, ...n } = s2 || {};
  return "Response" === o2?.constructor.name ? o2 : new Response(t ? t(o2) : o2, { headers: { "content-type": e2, ...r }, ...n });
}, "o");
var s = o("application/json; charset=utf-8", JSON.stringify);
var l = o("text/html");
var i2 = o("image/jpeg");
var p = o("image/png");
var d = o("image/webp");

// src/server.js
var import_discord_interactions2 = __toESM(require_dist(), 1);

// src/commands.js
init_modules_watch_stub();
var PBEM_COMMAND = {
  name: "pbem",
  description: "Basic command",
  options: [
    {
      type: 3,
      name: "name",
      description: "Name your game",
      required: true
    },
    {
      type: 5,
      name: "issequential",
      description: "Clicking done alerts the next person in the game",
      required: true
    }
  ],
  type: 1
};
var DICE_COMMAND = {
  name: "dice",
  description: "Roll a dice",
  options: [
    {
      type: 4,
      name: "sides",
      description: "How many Sides?",
      required: true
    }
  ],
  type: 1
};

// src/interactions.js
init_modules_watch_stub();
var import_discord_interactions = __toESM(require_dist(), 1);

// src/utils.js
init_modules_watch_stub();
function SplitCustomId(string) {
  const words = string.split("_");
  const id = {
    "owner": `${words[0]}`,
    "header": `${words[1]}`,
    "name": `${words[2]}`,
    "datetime": `${words[3]}`,
    "isSequential": `${words[4]}`
  };
  return id;
}
__name(SplitCustomId, "SplitCustomId");
function SplitMessage(string) {
  const words = string.split(`
`);
  const id = {
    "message": `${words[0]}`,
    "alert": `${words[1]}`
  };
  return id;
}
__name(SplitMessage, "SplitMessage");

// src/interactions.js
function SendUserOrderSelectMessage(message, customId, options) {
  return {
    type: import_discord_interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: [
        {
          type: import_discord_interactions.MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: import_discord_interactions.MessageComponentTypes.STRING_SELECT,
              custom_id: `${customId}`,
              options
              //Required to pass through state
            }
          ]
        }
      ]
    }
  };
}
__name(SendUserOrderSelectMessage, "SendUserOrderSelectMessage");
function SendUserSelectMessage(message, customId, maxUsers) {
  return {
    type: import_discord_interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: [
        {
          type: import_discord_interactions.MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: import_discord_interactions.MessageComponentTypes.USER_SELECT,
              custom_id: `${customId}`,
              //Required to pass through state
              min_values: 2,
              max_values: maxUsers
            }
          ]
        }
      ]
    }
  };
}
__name(SendUserSelectMessage, "SendUserSelectMessage");
function SendEphemeralMessage(message) {
  return {
    type: import_discord_interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      flags: import_discord_interactions.InteractionResponseFlags.EPHEMERAL
    }
  };
}
__name(SendEphemeralMessage, "SendEphemeralMessage");
function SendMessage(message, components) {
  return {
    type: import_discord_interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components
    }
  };
}
__name(SendMessage, "SendMessage");
function SendError(error) {
  return {
    type: import_discord_interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `I died...${error}`,
      components: []
    }
  };
}
__name(SendError, "SendError");
function UpdateMessage(interaction, alertContent) {
  const requestMessage = SplitMessage(interaction.message.content);
  const newMessage = `${requestMessage.message}
${alertContent}`;
  return SendMessage(newMessage, interaction.message.components);
}
__name(UpdateMessage, "UpdateMessage");
function SendButtons(buttons, message, alertContent) {
  return {
    type: import_discord_interactions.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}
${alertContent}`,
      components: [
        {
          type: import_discord_interactions.MessageComponentTypes.ACTION_ROW,
          components: buttons
        }
      ]
    }
  };
}
__name(SendButtons, "SendButtons");

// src/server.js
var JsonResponse = class extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    };
    super(jsonBody, init);
  }
};
__name(JsonResponse, "JsonResponse");
var router = e();
var orderedUserList = [];
router.get("/", (request, env) => {
  return new Response(`\u{1F44B} ${env.DISCORD_APPLICATION_ID}`);
});
router.post("/", async (request, env) => {
  const dateTime = (/* @__PURE__ */ new Date()).toDateString();
  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env
  );
  if (!isValid || !interaction) {
    return new Response("Bad request signature.", { status: 401 });
  }
  if (interaction.type === import_discord_interactions2.InteractionType.PING) {
    return new JsonResponse({
      type: import_discord_interactions2.InteractionResponseType.PONG
    });
  }
  if (interaction.type === import_discord_interactions2.InteractionType.APPLICATION_COMMAND) {
    switch (interaction.data.name.toLowerCase()) {
      case DICE_COMMAND.name.toLocaleLowerCase(): {
        const sides = interaction.data.options[0].value;
        const random = Math.floor(Math.random() * (sides - 0 + 1)) + 0;
        return new JsonResponse(SendEphemeralMessage(`You rolled a ${random}`));
      }
      case PBEM_COMMAND.name.toLowerCase(): {
        const gameName = interaction.data.options[0].value;
        const isSequential = interaction.data.options[1].value;
        const message = `Choose players for a new game of ${gameName}`;
        const customId = `DISCORD_NEWGAME_${gameName}_${dateTime}_${isSequential}`;
        return new JsonResponse(SendUserSelectMessage(message, customId, 10));
      }
      default:
        return new JsonResponse({ error: "Unknown Type" }, { status: 400 });
    }
  }
  if (interaction.type === import_discord_interactions2.InteractionType.MESSAGE_COMPONENT) {
    const customObj = SplitCustomId(interaction.data.custom_id);
    if (customObj.header === "NEWGAME") {
      const userList = [];
      const keys = Object.keys(interaction.data.resolved.users);
      keys.forEach((key) => {
        userList.push({
          "id": interaction.data.resolved.users[key].id,
          "username": interaction.data.resolved.users[key].username
        });
      });
      if (customObj.isSequential === "true") {
        const customId = `$DISCORD_USERSORTING_${customObj.name}_${dateTime}_${customObj.isSequential}`;
        const options = userList.map(function(user) {
          return {
            label: `${user.username}`,
            value: `${user.id}`
          };
        });
        try {
          await DeleteMessage(env, interaction);
          return new JsonResponse(SendUserOrderSelectMessage("Select Player 1", customId, options));
        } catch (error) {
          return new JsonResponse(SendError(error));
        }
      }
      if (customObj.isSequential === "false") {
        return CreateAndSendButtonsFromList(env, interaction, userList, customObj);
      }
    }
    if (customObj.header === "USERSORTING") {
      const selectedUser = interaction.data.values[0];
      const selectedUserName = interaction.message.components[0].components[0].options.find((user) => user.value === selectedUser).label;
      orderedUserList.push({
        "id": selectedUser,
        "username": selectedUserName
      });
      const options = interaction.message.components[0].components[0].options.filter((item) => item.value !== selectedUser);
      if (options.length > 1) {
        try {
          await DeleteMessage(env, interaction);
          return new JsonResponse(SendUserOrderSelectMessage(`Select Player ${orderedUserList.length + 1}`, interaction.data.custom_id, options));
        } catch (error) {
          return new JsonResponse(SendError(error));
        }
      } else {
        orderedUserList.push({
          "id": options[0].value,
          "username": options[0].label
        });
        return CreateAndSendButtonsFromList(env, interaction, orderedUserList, customObj);
      }
    }
    const userId = interaction.member.user.id;
    if (customObj.header === "USERBUTTON") {
      const messageComponents = interaction.message.components;
      const buttons = messageComponents[0].components;
      if (customObj.isSequential === "true") {
        const clickedButtonIndex = buttons.findIndex((button) => button.custom_id.includes(SplitCustomId(interaction.data.custom_id).owner));
        const clickedButton = buttons[clickedButtonIndex];
        for (let i3 = 0; i3 < buttons.length; i3++) {
          buttons[i3].label = buttons[i3].label.replace("Ready", "Done");
          buttons[i3].style = import_discord_interactions2.ButtonStyleTypes.SUCCESS;
          buttons[i3].disabled = false;
        }
        clickedButton.style = import_discord_interactions2.ButtonStyleTypes.PRIMARY;
        clickedButton.disabled = true;
        clickedButton.label = clickedButton.label.replace("Done", "Ready");
      } else {
        const buttonIndex = buttons.findIndex((button) => button.custom_id.includes(SplitCustomId(interaction.data.custom_id).owner));
        const userButton = buttons[buttonIndex];
        if (userButton.label.includes("Ready")) {
          userButton.label = userButton.label.replace("Ready", "Done");
          userButton.style = import_discord_interactions2.ButtonStyleTypes.SUCCESS;
          if (buttons.every((button) => button.label.includes("Done"))) {
            for (let i3 = 0; i3 < buttons.length; i3++) {
              buttons[i3].label = buttons[i3].label.replace("Done", "Ready");
              buttons[i3].style = import_discord_interactions2.ButtonStyleTypes.PRIMARY;
            }
          }
        }
        if (userButton.label.includes("Done")) {
          userButton.label = buttons[i].label.replace("Done", "Ready");
          userButton.style = import_discord_interactions2.ButtonStyleTypes.PRIMARY;
        }
      }
      const alertMessage = CreateAlertMessage(buttons);
      try {
        await DeleteMessage(env, interaction);
        return new JsonResponse(UpdateMessage(interaction, alertMessage));
      } catch (error) {
        return new JsonResponse(SendError(error));
      }
    }
  }
  console.error("Unknown Type");
  return new JsonResponse({ error: "Unknown Type" }, { status: 400 });
});
router.all("*", () => new Response("Not Found.", { status: 404 }));
async function verifyDiscordRequest(request, env) {
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  const body = await request.text();
  const isValidRequest = signature && timestamp && (0, import_discord_interactions2.verifyKey)(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
  if (!isValidRequest) {
    return { isValid: false };
  }
  return { interaction: JSON.parse(body), isValid: true };
}
__name(verifyDiscordRequest, "verifyDiscordRequest");
var server = {
  verifyDiscordRequest,
  fetch: async function(request, env) {
    return router.handle(request, env);
  }
};
var server_default = server;
async function CreateAndSendButtonsFromList(env, interaction, list, customObj) {
  const userButtons = list.map(function(user) {
    return {
      type: import_discord_interactions2.MessageComponentTypes.BUTTON,
      custom_id: `${user.id}_USERBUTTON_${customObj.name}_${customObj.dateTime}_${customObj.isSequential}`,
      label: `${user.username}: Ready`,
      style: import_discord_interactions2.ButtonStyleTypes.PRIMARY
    };
  });
  if (customObj.isSequential === "true") {
    userButtons[0].disabled = true;
    for (let i3 = 1; i3 < userButtons.length; i3++) {
      userButtons[i3].disabled = false;
      userButtons[i3].label = userButtons[i3].label.replace("Ready", "Done");
      userButtons[i3].style = import_discord_interactions2.ButtonStyleTypes.SUCCESS;
    }
  }
  const message = `Playing: ${customObj.name}. (Started at: ${customObj.datetime}).`;
  const alertContent = CreateAlertMessage(userButtons);
  orderedUserList = [];
  try {
    await DeleteMessage(env, interaction);
    return new JsonResponse(SendButtons(userButtons, message, alertContent));
  } catch (error) {
    return new JsonResponse(SendError(error));
  }
}
__name(CreateAndSendButtonsFromList, "CreateAndSendButtonsFromList");
function CreateAlertMessage(buttons) {
  let alertUsers = [];
  for (let i3 = 0; i3 < buttons.length; i3++) {
    if (buttons[i3].label.includes("Ready")) {
      const id = SplitCustomId(buttons[i3].custom_id).owner;
      alertUsers.push(id);
    }
  }
  return alertUsers.map(function(id) {
    return ` <@${id}>`;
  }).toString();
}
__name(CreateAlertMessage, "CreateAlertMessage");
async function DiscordRequest(env, endpoint, options) {
  const url = `https://discord.com/api/v10/` + endpoint;
  if (options.body)
    options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.DISCORD_TOKEN}`
    },
    ...options
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  return res;
}
__name(DiscordRequest, "DiscordRequest");
async function DeleteMessage(env, interaction) {
  const endpoint = `/channels/${interaction.message.channel_id}/messages/${interaction.message.id}`;
  return await DiscordRequest(env, endpoint, { method: "DELETE" });
}
__name(DeleteMessage, "DeleteMessage");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-WVMLaz/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = server_default;

// node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-WVMLaz/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=server.js.map
