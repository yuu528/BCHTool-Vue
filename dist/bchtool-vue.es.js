import './index.css';var yu = Object.defineProperty;
var bu = (e, t, n) => t in e ? yu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Fn = (e, t, n) => bu(e, typeof t != "symbol" ? t + "" : t, n);
import { defineComponent as Y0, ref as ae, onMounted as Pn, watch as ge, openBlock as Wn, createElementBlock as Na, reactive as Tn, computed as M, watchEffect as kt, toRefs as or, capitalize as sr, Fragment as Te, isVNode as xu, Comment as wu, shallowRef as pe, unref as De, warn as K0, getCurrentInstance as Su, provide as Ge, inject as Ve, camelize as Bi, h as X0, onScopeDispose as nt, effectScope as ur, toRaw as Ne, createVNode as w, createBlock as Ii, withCtx as M0, isRef as Bn, toRef as J, onBeforeUnmount as Ct, onUpdated as ku, mergeProps as oe, Text as Cu, readonly as cr, Transition as gn, resolveDynamicComponent as Au, nextTick as Ze, withDirectives as dt, onBeforeUpdate as Mu, TransitionGroup as dr, onBeforeMount as zi, resolveDirective as Vn, vShow as En, Teleport as Tu, onDeactivated as Bu, cloneVNode as Iu, createTextVNode as V0, withModifiers as Qr, toDisplayString as Da, createElementVNode as ha } from "vue";
class bt {
  constructor(t) {
    Fn(this, "_value", []);
    this.value = t;
  }
  static numberToBinaryArray(t) {
    return bt.stringToBinaryArray((t >>> 0).toString(2));
  }
  static stringToBinaryArray(t) {
    return t.split("").map((n) => n === "1").reverse();
  }
  setBitAt(t, n) {
    t >= this._value.length && this._value.push(...Array(t - this._value.length + 1).fill(!1)), this._value[t] = n;
  }
  getBitAt(t) {
    return this._value[t];
  }
  set value(t) {
    typeof t == "number" ? this._value = bt.numberToBinaryArray(t) : typeof t == "string" ? this._value = bt.stringToBinaryArray(t) : this._value = t;
  }
  get asArray() {
    return this._value;
  }
  get asNumber() {
    return parseInt(this.asString, 2);
  }
  get asString() {
    return this._value.map((t) => t ? "1" : "0").reverse().join("");
  }
  get length() {
    return this._value.lastIndexOf(!0) + 1;
  }
}
const Et = class Et {
  // x^4 + x + 1
  static encode(t) {
    const n = new bt(t), a = [
      new bt(n.asString + "0".repeat(Et.codeLength - Et.infoBitsLength))
    ], r = new bt(0), l = Et.generator.length - 1, i = Et.generator.asArray.map(
      (s, c) => s ? c : -1
    ).filter((s) => s >= 0);
    let o;
    for (; (o = a[a.length - 1].length - 1) >= l; ) {
      const s = o - l;
      r.setBitAt(s, !0), a.push(new bt(0));
      for (const c of i)
        a[a.length - 1].setBitAt(s + c, !0);
      a.push(new bt(0));
      for (let c = 0; c < a[a.length - 2].length; c++)
        a[a.length - 2].getBitAt(c) !== a[a.length - 3].getBitAt(c) && a[a.length - 1].setBitAt(c, !0);
    }
    return {
      input: n,
      quotient: r,
      work: a
    };
  }
};
// bit array:
//    x^0 x^1 x^2 ...
//   [0,  0,  0,  ...]
// BCH(11, 4)
Fn(Et, "codeLength", 15), Fn(Et, "infoBitsLength", 11), Fn(Et, "generator", new bt("10011"));
let ft = Et;
class rt {
  // The + prefix indicates that these fields aren't writeable
  // Lexer holding the input string.
  // Start offset, zero-based inclusive.
  // End offset, zero-based exclusive.
  constructor(t, n, a) {
    this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = t, this.start = n, this.end = a;
  }
  /**
   * Merges two `SourceLocation`s from location providers, given they are
   * provided in order of appearance.
   * - Returns the first one's location if only the first is provided.
   * - Returns a merged range of the first and the last if both are provided
   *   and their lexers match.
   * - Otherwise, returns null.
   */
  static range(t, n) {
    return n ? !t || !t.loc || !n.loc || t.loc.lexer !== n.loc.lexer ? null : new rt(t.loc.lexer, t.loc.start, n.loc.end) : t && t.loc;
  }
}
class ct {
  // don't expand the token
  // used in \noexpand
  constructor(t, n) {
    this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = t, this.loc = n;
  }
  /**
   * Given a pair of tokens (this and endToken), compute a `Token` encompassing
   * the whole input range enclosed by these two.
   */
  range(t, n) {
    return new ct(n, rt.range(this, t));
  }
}
class W {
  // Error start position based on passed-in Token or ParseNode.
  // Length of affected text based on passed-in Token or ParseNode.
  // The underlying error message without any context added.
  constructor(t, n) {
    this.name = void 0, this.position = void 0, this.length = void 0, this.rawMessage = void 0;
    var a = "KaTeX parse error: " + t, r, l, i = n && n.loc;
    if (i && i.start <= i.end) {
      var o = i.lexer.input;
      r = i.start, l = i.end, r === o.length ? a += " at end of input: " : a += " at position " + (r + 1) + ": ";
      var s = o.slice(r, l).replace(/[^]/g, "$&̲"), c;
      r > 15 ? c = "…" + o.slice(r - 15, r) : c = o.slice(0, r);
      var m;
      l + 15 < o.length ? m = o.slice(l, l + 15) + "…" : m = o.slice(l), a += c + s + m;
    }
    var f = new Error(a);
    return f.name = "ParseError", f.__proto__ = W.prototype, f.position = r, r != null && l != null && (f.length = l - r), f.rawMessage = t, f;
  }
}
W.prototype.__proto__ = Error.prototype;
var zu = function(e, t) {
  return e.indexOf(t) !== -1;
}, Pu = function(e, t) {
  return e === void 0 ? t : e;
}, Vu = /([A-Z])/g, Eu = function(e) {
  return e.replace(Vu, "-$1").toLowerCase();
}, Ou = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#x27;"
}, _u = /[&><"']/g;
function Lu(e) {
  return String(e).replace(_u, (t) => Ou[t]);
}
var Pi = function e(t) {
  return t.type === "ordgroup" || t.type === "color" ? t.body.length === 1 ? e(t.body[0]) : t : t.type === "font" ? e(t.body) : t;
}, Ru = function(e) {
  var t = Pi(e);
  return t.type === "mathord" || t.type === "textord" || t.type === "atom";
}, Nu = function(e) {
  if (!e)
    throw new Error("Expected non-null, but got " + String(e));
  return e;
}, Du = function(e) {
  var t = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);
  return t ? t[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t[1]) ? null : t[1].toLowerCase() : "_relative";
}, ne = {
  contains: zu,
  deflt: Pu,
  escape: Lu,
  hyphenate: Eu,
  getBaseElem: Pi,
  isCharacterBox: Ru,
  protocolFromUrl: Du
}, T0 = {
  displayMode: {
    type: "boolean",
    description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
    cli: "-d, --display-mode"
  },
  output: {
    type: {
      enum: ["htmlAndMathml", "html", "mathml"]
    },
    description: "Determines the markup language of the output.",
    cli: "-F, --format <type>"
  },
  leqno: {
    type: "boolean",
    description: "Render display math in leqno style (left-justified tags)."
  },
  fleqn: {
    type: "boolean",
    description: "Render display math flush left."
  },
  throwOnError: {
    type: "boolean",
    default: !0,
    cli: "-t, --no-throw-on-error",
    cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
  },
  errorColor: {
    type: "string",
    default: "#cc0000",
    cli: "-c, --error-color <color>",
    cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
    cliProcessor: (e) => "#" + e
  },
  macros: {
    type: "object",
    cli: "-m, --macro <def>",
    cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
    cliDefault: [],
    cliProcessor: (e, t) => (t.push(e), t)
  },
  minRuleThickness: {
    type: "number",
    description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
    processor: (e) => Math.max(0, e),
    cli: "--min-rule-thickness <size>",
    cliProcessor: parseFloat
  },
  colorIsTextColor: {
    type: "boolean",
    description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
    cli: "-b, --color-is-text-color"
  },
  strict: {
    type: [{
      enum: ["warn", "ignore", "error"]
    }, "boolean", "function"],
    description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
    cli: "-S, --strict",
    cliDefault: !1
  },
  trust: {
    type: ["boolean", "function"],
    description: "Trust the input, enabling all HTML features such as \\url.",
    cli: "-T, --trust"
  },
  maxSize: {
    type: "number",
    default: 1 / 0,
    description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
    processor: (e) => Math.max(0, e),
    cli: "-s, --max-size <n>",
    cliProcessor: parseInt
  },
  maxExpand: {
    type: "number",
    default: 1e3,
    description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
    processor: (e) => Math.max(0, e),
    cli: "-e, --max-expand <n>",
    cliProcessor: (e) => e === "Infinity" ? 1 / 0 : parseInt(e)
  },
  globalGroup: {
    type: "boolean",
    cli: !1
  }
};
function Fu(e) {
  if (e.default)
    return e.default;
  var t = e.type, n = Array.isArray(t) ? t[0] : t;
  if (typeof n != "string")
    return n.enum[0];
  switch (n) {
    case "boolean":
      return !1;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
  }
}
class mr {
  constructor(t) {
    this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, t = t || {};
    for (var n in T0)
      if (T0.hasOwnProperty(n)) {
        var a = T0[n];
        this[n] = t[n] !== void 0 ? a.processor ? a.processor(t[n]) : t[n] : Fu(a);
      }
  }
  /**
   * Report nonstrict (non-LaTeX-compatible) input.
   * Can safely not be called if `this.strict` is false in JavaScript.
   */
  reportNonstrict(t, n, a) {
    var r = this.strict;
    if (typeof r == "function" && (r = r(t, n, a)), !(!r || r === "ignore")) {
      if (r === !0 || r === "error")
        throw new W("LaTeX-incompatible input and strict mode is set to 'error': " + (n + " [" + t + "]"), a);
      r === "warn" ? typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (n + " [" + t + "]")) : typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + r + "': " + n + " [" + t + "]"));
    }
  }
  /**
   * Check whether to apply strict (LaTeX-adhering) behavior for unusual
   * input (like `\\`).  Unlike `nonstrict`, will not throw an error;
   * instead, "error" translates to a return value of `true`, while "ignore"
   * translates to a return value of `false`.  May still print a warning:
   * "warn" prints a warning and returns `false`.
   * This is for the second category of `errorCode`s listed in the README.
   */
  useStrictBehavior(t, n, a) {
    var r = this.strict;
    if (typeof r == "function")
      try {
        r = r(t, n, a);
      } catch {
        r = "error";
      }
    return !r || r === "ignore" ? !1 : r === !0 || r === "error" ? !0 : r === "warn" ? (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (n + " [" + t + "]")), !1) : (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + r + "': " + n + " [" + t + "]")), !1);
  }
  /**
   * Check whether to test potentially dangerous input, and return
   * `true` (trusted) or `false` (untrusted).  The sole argument `context`
   * should be an object with `command` field specifying the relevant LaTeX
   * command (as a string starting with `\`), and any other arguments, etc.
   * If `context` has a `url` field, a `protocol` field will automatically
   * get added by this function (changing the specified object).
   */
  isTrusted(t) {
    if (t.url && !t.protocol) {
      var n = ne.protocolFromUrl(t.url);
      if (n == null)
        return !1;
      t.protocol = n;
    }
    var a = typeof this.trust == "function" ? this.trust(t) : this.trust;
    return !!a;
  }
}
class Yt {
  constructor(t, n, a) {
    this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = t, this.size = n, this.cramped = a;
  }
  /**
   * Get the style of a superscript given a base in the current style.
   */
  sup() {
    return xt[qu[this.id]];
  }
  /**
   * Get the style of a subscript given a base in the current style.
   */
  sub() {
    return xt[Hu[this.id]];
  }
  /**
   * Get the style of a fraction numerator given the fraction in the current
   * style.
   */
  fracNum() {
    return xt[$u[this.id]];
  }
  /**
   * Get the style of a fraction denominator given the fraction in the current
   * style.
   */
  fracDen() {
    return xt[Gu[this.id]];
  }
  /**
   * Get the cramped version of a style (in particular, cramping a cramped style
   * doesn't change the style).
   */
  cramp() {
    return xt[Wu[this.id]];
  }
  /**
   * Get a text or display version of this style.
   */
  text() {
    return xt[ju[this.id]];
  }
  /**
   * Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
   */
  isTight() {
    return this.size >= 2;
  }
}
var hr = 0, E0 = 1, Mn = 2, Lt = 3, Kn = 4, ut = 5, In = 6, Xe = 7, xt = [new Yt(hr, 0, !1), new Yt(E0, 0, !0), new Yt(Mn, 1, !1), new Yt(Lt, 1, !0), new Yt(Kn, 2, !1), new Yt(ut, 2, !0), new Yt(In, 3, !1), new Yt(Xe, 3, !0)], qu = [Kn, ut, Kn, ut, In, Xe, In, Xe], Hu = [ut, ut, ut, ut, Xe, Xe, Xe, Xe], $u = [Mn, Lt, Kn, ut, In, Xe, In, Xe], Gu = [Lt, Lt, ut, ut, Xe, Xe, Xe, Xe], Wu = [E0, E0, Lt, Lt, ut, ut, Xe, Xe], ju = [hr, E0, Mn, Lt, Mn, Lt, Mn, Lt], ie = {
  DISPLAY: xt[hr],
  TEXT: xt[Mn],
  SCRIPT: xt[Kn],
  SCRIPTSCRIPT: xt[In]
}, Fa = [{
  // Latin characters beyond the Latin-1 characters we have metrics for.
  // Needed for Czech, Hungarian and Turkish text, for example.
  name: "latin",
  blocks: [
    [256, 591],
    // Latin Extended-A and Latin Extended-B
    [768, 879]
    // Combining Diacritical marks
  ]
}, {
  // The Cyrillic script used by Russian and related languages.
  // A Cyrillic subset used to be supported as explicitly defined
  // symbols in symbols.js
  name: "cyrillic",
  blocks: [[1024, 1279]]
}, {
  // Armenian
  name: "armenian",
  blocks: [[1328, 1423]]
}, {
  // The Brahmic scripts of South and Southeast Asia
  // Devanagari (0900–097F)
  // Bengali (0980–09FF)
  // Gurmukhi (0A00–0A7F)
  // Gujarati (0A80–0AFF)
  // Oriya (0B00–0B7F)
  // Tamil (0B80–0BFF)
  // Telugu (0C00–0C7F)
  // Kannada (0C80–0CFF)
  // Malayalam (0D00–0D7F)
  // Sinhala (0D80–0DFF)
  // Thai (0E00–0E7F)
  // Lao (0E80–0EFF)
  // Tibetan (0F00–0FFF)
  // Myanmar (1000–109F)
  name: "brahmic",
  blocks: [[2304, 4255]]
}, {
  name: "georgian",
  blocks: [[4256, 4351]]
}, {
  // Chinese and Japanese.
  // The "k" in cjk is for Korean, but we've separated Korean out
  name: "cjk",
  blocks: [
    [12288, 12543],
    // CJK symbols and punctuation, Hiragana, Katakana
    [19968, 40879],
    // CJK ideograms
    [65280, 65376]
    // Fullwidth punctuation
    // TODO: add halfwidth Katakana and Romanji glyphs
  ]
}, {
  // Korean
  name: "hangul",
  blocks: [[44032, 55215]]
}];
function Uu(e) {
  for (var t = 0; t < Fa.length; t++)
    for (var n = Fa[t], a = 0; a < n.blocks.length; a++) {
      var r = n.blocks[a];
      if (e >= r[0] && e <= r[1])
        return n.name;
    }
  return null;
}
var B0 = [];
Fa.forEach((e) => e.blocks.forEach((t) => B0.push(...t)));
function Vi(e) {
  for (var t = 0; t < B0.length; t += 2)
    if (e >= B0[t] && e <= B0[t + 1])
      return !0;
  return !1;
}
var kn = 80, Yu = function(e, t) {
  return "M95," + (622 + e + t) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e / 2.075 + " -" + e + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Ku = function(e, t) {
  return "M263," + (601 + e + t) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e / 2.084 + " -" + e + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Xu = function(e, t) {
  return "M983 " + (10 + e + t) + `
l` + e / 3.13 + " -" + e + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, Zu = function(e, t) {
  return "M424," + (2398 + e + t) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e / 4.223 + " -" + e + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e) + " " + t + `
h400000v` + (40 + e) + "h-400000z";
}, Qu = function(e, t) {
  return "M473," + (2713 + e + t) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e / 5.298 + " -" + e + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "H1017.7z";
}, Ju = function(e) {
  var t = e / 2;
  return "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, ec = function(e, t, n) {
  var a = n - 54 - t - e;
  return "M702 " + (e + t) + "H400000" + (40 + e) + `
H742v` + a + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + t + "H400000v" + (40 + e) + "H742z";
}, tc = function(e, t, n) {
  t = 1e3 * t;
  var a = "";
  switch (e) {
    case "sqrtMain":
      a = Yu(t, kn);
      break;
    case "sqrtSize1":
      a = Ku(t, kn);
      break;
    case "sqrtSize2":
      a = Xu(t, kn);
      break;
    case "sqrtSize3":
      a = Zu(t, kn);
      break;
    case "sqrtSize4":
      a = Qu(t, kn);
      break;
    case "sqrtTall":
      a = ec(t, kn, n);
  }
  return a;
}, nc = function(e, t) {
  switch (e) {
    case "⎜":
      return "M291 0 H417 V" + t + " H291z M291 0 H417 V" + t + " H291z";
    case "∣":
      return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145z";
    case "∥":
      return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145z" + ("M367 0 H410 V" + t + " H367z M367 0 H410 V" + t + " H367z");
    case "⎟":
      return "M457 0 H583 V" + t + " H457z M457 0 H583 V" + t + " H457z";
    case "⎢":
      return "M319 0 H403 V" + t + " H319z M319 0 H403 V" + t + " H319z";
    case "⎥":
      return "M263 0 H347 V" + t + " H263z M263 0 H347 V" + t + " H263z";
    case "⎪":
      return "M384 0 H504 V" + t + " H384z M384 0 H504 V" + t + " H384z";
    case "⏐":
      return "M312 0 H355 V" + t + " H312z M312 0 H355 V" + t + " H312z";
    case "‖":
      return "M257 0 H300 V" + t + " H257z M257 0 H300 V" + t + " H257z" + ("M478 0 H521 V" + t + " H478z M478 0 H521 V" + t + " H478z");
    default:
      return "";
  }
}, Jr = {
  // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
  doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,
  // doublerightarrow is from glyph U+21D2 in font KaTeX Main
  doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,
  // leftarrow is from glyph U+2190 in font KaTeX Main
  leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,
  // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
  leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,
  leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,
  // overgroup is from the MnSymbol package (public domain)
  leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,
  leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,
  // Harpoons are from glyph U+21BD in font KaTeX Main
  leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,
  leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,
  leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,
  leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,
  // hook is from glyph U+21A9 in font KaTeX Main
  lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,
  leftlinesegment: `M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,
  leftmapsto: `M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,
  // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
  leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,
  longequal: `M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,
  midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,
  midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,
  oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,
  oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,
  oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,
  oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,
  rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,
  rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,
  rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,
  rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,
  rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,
  rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,
  rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,
  rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,
  rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,
  righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,
  rightlinesegment: `M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,
  rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,
  // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
  twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,
  twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,
  // tilde1 is a modified version of a glyph from the MnSymbol package
  tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,
  // ditto tilde2, tilde3, & tilde4
  tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,
  tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,
  tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,
  // vec is from glyph U+20D7 in font KaTeX Main
  vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,
  // widehat1 is a modified version of a glyph from the MnSymbol package
  widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,
  // ditto widehat2, widehat3, & widehat4
  widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  // widecheck paths are all inverted versions of widehat
  widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,
  widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  // The next ten paths support reaction arrows from the mhchem package.
  // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
  // baraboveleftarrow is mostly from glyph U+2190 in font KaTeX Main
  baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,
  // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
  rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,
  // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
  // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
  baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,
  rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,
  shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,
  shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`
}, ac = function(e, t) {
  switch (e) {
    case "lbrack":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v1759 h347 v-84
H403z M403 1759 V0 H319 V1759 v` + t + " v1759 h84z";
    case "rbrack":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` + t + " v1759 h84z";
    case "vert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + " v585 h43z";
    case "doublevert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + ` v585 h43z
M367 15 v585 v` + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` + t + " v585 h43z";
    case "lfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "rfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "lceil":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v602 h84z
M403 1759 V0 H319 V1759 v` + t + " v602 h84z";
    case "rceil":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v602 h84z
M347 1759 V0 h-84 V1759 v` + t + " v602 h84z";
    case "lparen":
      return `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` + (t + 84) + `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` + (t + 92) + `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;
    case "rparen":
      return `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` + (t + 9) + `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` + (t + 144) + `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;
    default:
      throw new Error("Unknown stretchy delimiter.");
  }
};
class r0 {
  // HtmlDomNode
  // Never used; needed for satisfying interface.
  constructor(t) {
    this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = t, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
  }
  hasClass(t) {
    return ne.contains(this.classes, t);
  }
  /** Convert the fragment into a node. */
  toNode() {
    for (var t = document.createDocumentFragment(), n = 0; n < this.children.length; n++)
      t.appendChild(this.children[n].toNode());
    return t;
  }
  /** Convert the fragment into HTML markup. */
  toMarkup() {
    for (var t = "", n = 0; n < this.children.length; n++)
      t += this.children[n].toMarkup();
    return t;
  }
  /**
   * Converts the math node into a string, similar to innerText. Applies to
   * MathDomNode's only.
   */
  toText() {
    var t = (n) => n.toText();
    return this.children.map(t).join("");
  }
}
var wt = {
  "AMS-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68889, 0, 0, 0.72222],
    66: [0, 0.68889, 0, 0, 0.66667],
    67: [0, 0.68889, 0, 0, 0.72222],
    68: [0, 0.68889, 0, 0, 0.72222],
    69: [0, 0.68889, 0, 0, 0.66667],
    70: [0, 0.68889, 0, 0, 0.61111],
    71: [0, 0.68889, 0, 0, 0.77778],
    72: [0, 0.68889, 0, 0, 0.77778],
    73: [0, 0.68889, 0, 0, 0.38889],
    74: [0.16667, 0.68889, 0, 0, 0.5],
    75: [0, 0.68889, 0, 0, 0.77778],
    76: [0, 0.68889, 0, 0, 0.66667],
    77: [0, 0.68889, 0, 0, 0.94445],
    78: [0, 0.68889, 0, 0, 0.72222],
    79: [0.16667, 0.68889, 0, 0, 0.77778],
    80: [0, 0.68889, 0, 0, 0.61111],
    81: [0.16667, 0.68889, 0, 0, 0.77778],
    82: [0, 0.68889, 0, 0, 0.72222],
    83: [0, 0.68889, 0, 0, 0.55556],
    84: [0, 0.68889, 0, 0, 0.66667],
    85: [0, 0.68889, 0, 0, 0.72222],
    86: [0, 0.68889, 0, 0, 0.72222],
    87: [0, 0.68889, 0, 0, 1],
    88: [0, 0.68889, 0, 0, 0.72222],
    89: [0, 0.68889, 0, 0, 0.72222],
    90: [0, 0.68889, 0, 0, 0.66667],
    107: [0, 0.68889, 0, 0, 0.55556],
    160: [0, 0, 0, 0, 0.25],
    165: [0, 0.675, 0.025, 0, 0.75],
    174: [0.15559, 0.69224, 0, 0, 0.94666],
    240: [0, 0.68889, 0, 0, 0.55556],
    295: [0, 0.68889, 0, 0, 0.54028],
    710: [0, 0.825, 0, 0, 2.33334],
    732: [0, 0.9, 0, 0, 2.33334],
    770: [0, 0.825, 0, 0, 2.33334],
    771: [0, 0.9, 0, 0, 2.33334],
    989: [0.08167, 0.58167, 0, 0, 0.77778],
    1008: [0, 0.43056, 0.04028, 0, 0.66667],
    8245: [0, 0.54986, 0, 0, 0.275],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8487: [0, 0.68889, 0, 0, 0.72222],
    8498: [0, 0.68889, 0, 0, 0.55556],
    8502: [0, 0.68889, 0, 0, 0.66667],
    8503: [0, 0.68889, 0, 0, 0.44445],
    8504: [0, 0.68889, 0, 0, 0.66667],
    8513: [0, 0.68889, 0, 0, 0.63889],
    8592: [-0.03598, 0.46402, 0, 0, 0.5],
    8594: [-0.03598, 0.46402, 0, 0, 0.5],
    8602: [-0.13313, 0.36687, 0, 0, 1],
    8603: [-0.13313, 0.36687, 0, 0, 1],
    8606: [0.01354, 0.52239, 0, 0, 1],
    8608: [0.01354, 0.52239, 0, 0, 1],
    8610: [0.01354, 0.52239, 0, 0, 1.11111],
    8611: [0.01354, 0.52239, 0, 0, 1.11111],
    8619: [0, 0.54986, 0, 0, 1],
    8620: [0, 0.54986, 0, 0, 1],
    8621: [-0.13313, 0.37788, 0, 0, 1.38889],
    8622: [-0.13313, 0.36687, 0, 0, 1],
    8624: [0, 0.69224, 0, 0, 0.5],
    8625: [0, 0.69224, 0, 0, 0.5],
    8630: [0, 0.43056, 0, 0, 1],
    8631: [0, 0.43056, 0, 0, 1],
    8634: [0.08198, 0.58198, 0, 0, 0.77778],
    8635: [0.08198, 0.58198, 0, 0, 0.77778],
    8638: [0.19444, 0.69224, 0, 0, 0.41667],
    8639: [0.19444, 0.69224, 0, 0, 0.41667],
    8642: [0.19444, 0.69224, 0, 0, 0.41667],
    8643: [0.19444, 0.69224, 0, 0, 0.41667],
    8644: [0.1808, 0.675, 0, 0, 1],
    8646: [0.1808, 0.675, 0, 0, 1],
    8647: [0.1808, 0.675, 0, 0, 1],
    8648: [0.19444, 0.69224, 0, 0, 0.83334],
    8649: [0.1808, 0.675, 0, 0, 1],
    8650: [0.19444, 0.69224, 0, 0, 0.83334],
    8651: [0.01354, 0.52239, 0, 0, 1],
    8652: [0.01354, 0.52239, 0, 0, 1],
    8653: [-0.13313, 0.36687, 0, 0, 1],
    8654: [-0.13313, 0.36687, 0, 0, 1],
    8655: [-0.13313, 0.36687, 0, 0, 1],
    8666: [0.13667, 0.63667, 0, 0, 1],
    8667: [0.13667, 0.63667, 0, 0, 1],
    8669: [-0.13313, 0.37788, 0, 0, 1],
    8672: [-0.064, 0.437, 0, 0, 1.334],
    8674: [-0.064, 0.437, 0, 0, 1.334],
    8705: [0, 0.825, 0, 0, 0.5],
    8708: [0, 0.68889, 0, 0, 0.55556],
    8709: [0.08167, 0.58167, 0, 0, 0.77778],
    8717: [0, 0.43056, 0, 0, 0.42917],
    8722: [-0.03598, 0.46402, 0, 0, 0.5],
    8724: [0.08198, 0.69224, 0, 0, 0.77778],
    8726: [0.08167, 0.58167, 0, 0, 0.77778],
    8733: [0, 0.69224, 0, 0, 0.77778],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8737: [0, 0.69224, 0, 0, 0.72222],
    8738: [0.03517, 0.52239, 0, 0, 0.72222],
    8739: [0.08167, 0.58167, 0, 0, 0.22222],
    8740: [0.25142, 0.74111, 0, 0, 0.27778],
    8741: [0.08167, 0.58167, 0, 0, 0.38889],
    8742: [0.25142, 0.74111, 0, 0, 0.5],
    8756: [0, 0.69224, 0, 0, 0.66667],
    8757: [0, 0.69224, 0, 0, 0.66667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8765: [-0.13313, 0.37788, 0, 0, 0.77778],
    8769: [-0.13313, 0.36687, 0, 0, 0.77778],
    8770: [-0.03625, 0.46375, 0, 0, 0.77778],
    8774: [0.30274, 0.79383, 0, 0, 0.77778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8778: [0.08167, 0.58167, 0, 0, 0.77778],
    8782: [0.06062, 0.54986, 0, 0, 0.77778],
    8783: [0.06062, 0.54986, 0, 0, 0.77778],
    8785: [0.08198, 0.58198, 0, 0, 0.77778],
    8786: [0.08198, 0.58198, 0, 0, 0.77778],
    8787: [0.08198, 0.58198, 0, 0, 0.77778],
    8790: [0, 0.69224, 0, 0, 0.77778],
    8791: [0.22958, 0.72958, 0, 0, 0.77778],
    8796: [0.08198, 0.91667, 0, 0, 0.77778],
    8806: [0.25583, 0.75583, 0, 0, 0.77778],
    8807: [0.25583, 0.75583, 0, 0, 0.77778],
    8808: [0.25142, 0.75726, 0, 0, 0.77778],
    8809: [0.25142, 0.75726, 0, 0, 0.77778],
    8812: [0.25583, 0.75583, 0, 0, 0.5],
    8814: [0.20576, 0.70576, 0, 0, 0.77778],
    8815: [0.20576, 0.70576, 0, 0, 0.77778],
    8816: [0.30274, 0.79383, 0, 0, 0.77778],
    8817: [0.30274, 0.79383, 0, 0, 0.77778],
    8818: [0.22958, 0.72958, 0, 0, 0.77778],
    8819: [0.22958, 0.72958, 0, 0, 0.77778],
    8822: [0.1808, 0.675, 0, 0, 0.77778],
    8823: [0.1808, 0.675, 0, 0, 0.77778],
    8828: [0.13667, 0.63667, 0, 0, 0.77778],
    8829: [0.13667, 0.63667, 0, 0, 0.77778],
    8830: [0.22958, 0.72958, 0, 0, 0.77778],
    8831: [0.22958, 0.72958, 0, 0, 0.77778],
    8832: [0.20576, 0.70576, 0, 0, 0.77778],
    8833: [0.20576, 0.70576, 0, 0, 0.77778],
    8840: [0.30274, 0.79383, 0, 0, 0.77778],
    8841: [0.30274, 0.79383, 0, 0, 0.77778],
    8842: [0.13597, 0.63597, 0, 0, 0.77778],
    8843: [0.13597, 0.63597, 0, 0, 0.77778],
    8847: [0.03517, 0.54986, 0, 0, 0.77778],
    8848: [0.03517, 0.54986, 0, 0, 0.77778],
    8858: [0.08198, 0.58198, 0, 0, 0.77778],
    8859: [0.08198, 0.58198, 0, 0, 0.77778],
    8861: [0.08198, 0.58198, 0, 0, 0.77778],
    8862: [0, 0.675, 0, 0, 0.77778],
    8863: [0, 0.675, 0, 0, 0.77778],
    8864: [0, 0.675, 0, 0, 0.77778],
    8865: [0, 0.675, 0, 0, 0.77778],
    8872: [0, 0.69224, 0, 0, 0.61111],
    8873: [0, 0.69224, 0, 0, 0.72222],
    8874: [0, 0.69224, 0, 0, 0.88889],
    8876: [0, 0.68889, 0, 0, 0.61111],
    8877: [0, 0.68889, 0, 0, 0.61111],
    8878: [0, 0.68889, 0, 0, 0.72222],
    8879: [0, 0.68889, 0, 0, 0.72222],
    8882: [0.03517, 0.54986, 0, 0, 0.77778],
    8883: [0.03517, 0.54986, 0, 0, 0.77778],
    8884: [0.13667, 0.63667, 0, 0, 0.77778],
    8885: [0.13667, 0.63667, 0, 0, 0.77778],
    8888: [0, 0.54986, 0, 0, 1.11111],
    8890: [0.19444, 0.43056, 0, 0, 0.55556],
    8891: [0.19444, 0.69224, 0, 0, 0.61111],
    8892: [0.19444, 0.69224, 0, 0, 0.61111],
    8901: [0, 0.54986, 0, 0, 0.27778],
    8903: [0.08167, 0.58167, 0, 0, 0.77778],
    8905: [0.08167, 0.58167, 0, 0, 0.77778],
    8906: [0.08167, 0.58167, 0, 0, 0.77778],
    8907: [0, 0.69224, 0, 0, 0.77778],
    8908: [0, 0.69224, 0, 0, 0.77778],
    8909: [-0.03598, 0.46402, 0, 0, 0.77778],
    8910: [0, 0.54986, 0, 0, 0.76042],
    8911: [0, 0.54986, 0, 0, 0.76042],
    8912: [0.03517, 0.54986, 0, 0, 0.77778],
    8913: [0.03517, 0.54986, 0, 0, 0.77778],
    8914: [0, 0.54986, 0, 0, 0.66667],
    8915: [0, 0.54986, 0, 0, 0.66667],
    8916: [0, 0.69224, 0, 0, 0.66667],
    8918: [0.0391, 0.5391, 0, 0, 0.77778],
    8919: [0.0391, 0.5391, 0, 0, 0.77778],
    8920: [0.03517, 0.54986, 0, 0, 1.33334],
    8921: [0.03517, 0.54986, 0, 0, 1.33334],
    8922: [0.38569, 0.88569, 0, 0, 0.77778],
    8923: [0.38569, 0.88569, 0, 0, 0.77778],
    8926: [0.13667, 0.63667, 0, 0, 0.77778],
    8927: [0.13667, 0.63667, 0, 0, 0.77778],
    8928: [0.30274, 0.79383, 0, 0, 0.77778],
    8929: [0.30274, 0.79383, 0, 0, 0.77778],
    8934: [0.23222, 0.74111, 0, 0, 0.77778],
    8935: [0.23222, 0.74111, 0, 0, 0.77778],
    8936: [0.23222, 0.74111, 0, 0, 0.77778],
    8937: [0.23222, 0.74111, 0, 0, 0.77778],
    8938: [0.20576, 0.70576, 0, 0, 0.77778],
    8939: [0.20576, 0.70576, 0, 0, 0.77778],
    8940: [0.30274, 0.79383, 0, 0, 0.77778],
    8941: [0.30274, 0.79383, 0, 0, 0.77778],
    8994: [0.19444, 0.69224, 0, 0, 0.77778],
    8995: [0.19444, 0.69224, 0, 0, 0.77778],
    9416: [0.15559, 0.69224, 0, 0, 0.90222],
    9484: [0, 0.69224, 0, 0, 0.5],
    9488: [0, 0.69224, 0, 0, 0.5],
    9492: [0, 0.37788, 0, 0, 0.5],
    9496: [0, 0.37788, 0, 0, 0.5],
    9585: [0.19444, 0.68889, 0, 0, 0.88889],
    9586: [0.19444, 0.74111, 0, 0, 0.88889],
    9632: [0, 0.675, 0, 0, 0.77778],
    9633: [0, 0.675, 0, 0, 0.77778],
    9650: [0, 0.54986, 0, 0, 0.72222],
    9651: [0, 0.54986, 0, 0, 0.72222],
    9654: [0.03517, 0.54986, 0, 0, 0.77778],
    9660: [0, 0.54986, 0, 0, 0.72222],
    9661: [0, 0.54986, 0, 0, 0.72222],
    9664: [0.03517, 0.54986, 0, 0, 0.77778],
    9674: [0.11111, 0.69224, 0, 0, 0.66667],
    9733: [0.19444, 0.69224, 0, 0, 0.94445],
    10003: [0, 0.69224, 0, 0, 0.83334],
    10016: [0, 0.69224, 0, 0, 0.83334],
    10731: [0.11111, 0.69224, 0, 0, 0.66667],
    10846: [0.19444, 0.75583, 0, 0, 0.61111],
    10877: [0.13667, 0.63667, 0, 0, 0.77778],
    10878: [0.13667, 0.63667, 0, 0, 0.77778],
    10885: [0.25583, 0.75583, 0, 0, 0.77778],
    10886: [0.25583, 0.75583, 0, 0, 0.77778],
    10887: [0.13597, 0.63597, 0, 0, 0.77778],
    10888: [0.13597, 0.63597, 0, 0, 0.77778],
    10889: [0.26167, 0.75726, 0, 0, 0.77778],
    10890: [0.26167, 0.75726, 0, 0, 0.77778],
    10891: [0.48256, 0.98256, 0, 0, 0.77778],
    10892: [0.48256, 0.98256, 0, 0, 0.77778],
    10901: [0.13667, 0.63667, 0, 0, 0.77778],
    10902: [0.13667, 0.63667, 0, 0, 0.77778],
    10933: [0.25142, 0.75726, 0, 0, 0.77778],
    10934: [0.25142, 0.75726, 0, 0, 0.77778],
    10935: [0.26167, 0.75726, 0, 0, 0.77778],
    10936: [0.26167, 0.75726, 0, 0, 0.77778],
    10937: [0.26167, 0.75726, 0, 0, 0.77778],
    10938: [0.26167, 0.75726, 0, 0, 0.77778],
    10949: [0.25583, 0.75583, 0, 0, 0.77778],
    10950: [0.25583, 0.75583, 0, 0, 0.77778],
    10955: [0.28481, 0.79383, 0, 0, 0.77778],
    10956: [0.28481, 0.79383, 0, 0, 0.77778],
    57350: [0.08167, 0.58167, 0, 0, 0.22222],
    57351: [0.08167, 0.58167, 0, 0, 0.38889],
    57352: [0.08167, 0.58167, 0, 0, 0.77778],
    57353: [0, 0.43056, 0.04028, 0, 0.66667],
    57356: [0.25142, 0.75726, 0, 0, 0.77778],
    57357: [0.25142, 0.75726, 0, 0, 0.77778],
    57358: [0.41951, 0.91951, 0, 0, 0.77778],
    57359: [0.30274, 0.79383, 0, 0, 0.77778],
    57360: [0.30274, 0.79383, 0, 0, 0.77778],
    57361: [0.41951, 0.91951, 0, 0, 0.77778],
    57366: [0.25142, 0.75726, 0, 0, 0.77778],
    57367: [0.25142, 0.75726, 0, 0, 0.77778],
    57368: [0.25142, 0.75726, 0, 0, 0.77778],
    57369: [0.25142, 0.75726, 0, 0, 0.77778],
    57370: [0.13597, 0.63597, 0, 0, 0.77778],
    57371: [0.13597, 0.63597, 0, 0, 0.77778]
  },
  "Caligraphic-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68333, 0, 0.19445, 0.79847],
    66: [0, 0.68333, 0.03041, 0.13889, 0.65681],
    67: [0, 0.68333, 0.05834, 0.13889, 0.52653],
    68: [0, 0.68333, 0.02778, 0.08334, 0.77139],
    69: [0, 0.68333, 0.08944, 0.11111, 0.52778],
    70: [0, 0.68333, 0.09931, 0.11111, 0.71875],
    71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
    72: [0, 0.68333, 965e-5, 0.11111, 0.84452],
    73: [0, 0.68333, 0.07382, 0, 0.54452],
    74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
    75: [0, 0.68333, 0.01445, 0.05556, 0.76195],
    76: [0, 0.68333, 0, 0.13889, 0.68972],
    77: [0, 0.68333, 0, 0.13889, 1.2009],
    78: [0, 0.68333, 0.14736, 0.08334, 0.82049],
    79: [0, 0.68333, 0.02778, 0.11111, 0.79611],
    80: [0, 0.68333, 0.08222, 0.08334, 0.69556],
    81: [0.09722, 0.68333, 0, 0.11111, 0.81667],
    82: [0, 0.68333, 0, 0.08334, 0.8475],
    83: [0, 0.68333, 0.075, 0.13889, 0.60556],
    84: [0, 0.68333, 0.25417, 0, 0.54464],
    85: [0, 0.68333, 0.09931, 0.08334, 0.62583],
    86: [0, 0.68333, 0.08222, 0, 0.61278],
    87: [0, 0.68333, 0.08222, 0.08334, 0.98778],
    88: [0, 0.68333, 0.14643, 0.13889, 0.7133],
    89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
    90: [0, 0.68333, 0.07944, 0.13889, 0.72473],
    160: [0, 0, 0, 0, 0.25]
  },
  "Fraktur-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69141, 0, 0, 0.29574],
    34: [0, 0.69141, 0, 0, 0.21471],
    38: [0, 0.69141, 0, 0, 0.73786],
    39: [0, 0.69141, 0, 0, 0.21201],
    40: [0.24982, 0.74947, 0, 0, 0.38865],
    41: [0.24982, 0.74947, 0, 0, 0.38865],
    42: [0, 0.62119, 0, 0, 0.27764],
    43: [0.08319, 0.58283, 0, 0, 0.75623],
    44: [0, 0.10803, 0, 0, 0.27764],
    45: [0.08319, 0.58283, 0, 0, 0.75623],
    46: [0, 0.10803, 0, 0, 0.27764],
    47: [0.24982, 0.74947, 0, 0, 0.50181],
    48: [0, 0.47534, 0, 0, 0.50181],
    49: [0, 0.47534, 0, 0, 0.50181],
    50: [0, 0.47534, 0, 0, 0.50181],
    51: [0.18906, 0.47534, 0, 0, 0.50181],
    52: [0.18906, 0.47534, 0, 0, 0.50181],
    53: [0.18906, 0.47534, 0, 0, 0.50181],
    54: [0, 0.69141, 0, 0, 0.50181],
    55: [0.18906, 0.47534, 0, 0, 0.50181],
    56: [0, 0.69141, 0, 0, 0.50181],
    57: [0.18906, 0.47534, 0, 0, 0.50181],
    58: [0, 0.47534, 0, 0, 0.21606],
    59: [0.12604, 0.47534, 0, 0, 0.21606],
    61: [-0.13099, 0.36866, 0, 0, 0.75623],
    63: [0, 0.69141, 0, 0, 0.36245],
    65: [0, 0.69141, 0, 0, 0.7176],
    66: [0, 0.69141, 0, 0, 0.88397],
    67: [0, 0.69141, 0, 0, 0.61254],
    68: [0, 0.69141, 0, 0, 0.83158],
    69: [0, 0.69141, 0, 0, 0.66278],
    70: [0.12604, 0.69141, 0, 0, 0.61119],
    71: [0, 0.69141, 0, 0, 0.78539],
    72: [0.06302, 0.69141, 0, 0, 0.7203],
    73: [0, 0.69141, 0, 0, 0.55448],
    74: [0.12604, 0.69141, 0, 0, 0.55231],
    75: [0, 0.69141, 0, 0, 0.66845],
    76: [0, 0.69141, 0, 0, 0.66602],
    77: [0, 0.69141, 0, 0, 1.04953],
    78: [0, 0.69141, 0, 0, 0.83212],
    79: [0, 0.69141, 0, 0, 0.82699],
    80: [0.18906, 0.69141, 0, 0, 0.82753],
    81: [0.03781, 0.69141, 0, 0, 0.82699],
    82: [0, 0.69141, 0, 0, 0.82807],
    83: [0, 0.69141, 0, 0, 0.82861],
    84: [0, 0.69141, 0, 0, 0.66899],
    85: [0, 0.69141, 0, 0, 0.64576],
    86: [0, 0.69141, 0, 0, 0.83131],
    87: [0, 0.69141, 0, 0, 1.04602],
    88: [0, 0.69141, 0, 0, 0.71922],
    89: [0.18906, 0.69141, 0, 0, 0.83293],
    90: [0.12604, 0.69141, 0, 0, 0.60201],
    91: [0.24982, 0.74947, 0, 0, 0.27764],
    93: [0.24982, 0.74947, 0, 0, 0.27764],
    94: [0, 0.69141, 0, 0, 0.49965],
    97: [0, 0.47534, 0, 0, 0.50046],
    98: [0, 0.69141, 0, 0, 0.51315],
    99: [0, 0.47534, 0, 0, 0.38946],
    100: [0, 0.62119, 0, 0, 0.49857],
    101: [0, 0.47534, 0, 0, 0.40053],
    102: [0.18906, 0.69141, 0, 0, 0.32626],
    103: [0.18906, 0.47534, 0, 0, 0.5037],
    104: [0.18906, 0.69141, 0, 0, 0.52126],
    105: [0, 0.69141, 0, 0, 0.27899],
    106: [0, 0.69141, 0, 0, 0.28088],
    107: [0, 0.69141, 0, 0, 0.38946],
    108: [0, 0.69141, 0, 0, 0.27953],
    109: [0, 0.47534, 0, 0, 0.76676],
    110: [0, 0.47534, 0, 0, 0.52666],
    111: [0, 0.47534, 0, 0, 0.48885],
    112: [0.18906, 0.52396, 0, 0, 0.50046],
    113: [0.18906, 0.47534, 0, 0, 0.48912],
    114: [0, 0.47534, 0, 0, 0.38919],
    115: [0, 0.47534, 0, 0, 0.44266],
    116: [0, 0.62119, 0, 0, 0.33301],
    117: [0, 0.47534, 0, 0, 0.5172],
    118: [0, 0.52396, 0, 0, 0.5118],
    119: [0, 0.52396, 0, 0, 0.77351],
    120: [0.18906, 0.47534, 0, 0, 0.38865],
    121: [0.18906, 0.47534, 0, 0, 0.49884],
    122: [0.18906, 0.47534, 0, 0, 0.39054],
    160: [0, 0, 0, 0, 0.25],
    8216: [0, 0.69141, 0, 0, 0.21471],
    8217: [0, 0.69141, 0, 0, 0.21471],
    58112: [0, 0.62119, 0, 0, 0.49749],
    58113: [0, 0.62119, 0, 0, 0.4983],
    58114: [0.18906, 0.69141, 0, 0, 0.33328],
    58115: [0.18906, 0.69141, 0, 0, 0.32923],
    58116: [0.18906, 0.47534, 0, 0, 0.50343],
    58117: [0, 0.69141, 0, 0, 0.33301],
    58118: [0, 0.62119, 0, 0, 0.33409],
    58119: [0, 0.47534, 0, 0, 0.50073]
  },
  "Main-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.35],
    34: [0, 0.69444, 0, 0, 0.60278],
    35: [0.19444, 0.69444, 0, 0, 0.95833],
    36: [0.05556, 0.75, 0, 0, 0.575],
    37: [0.05556, 0.75, 0, 0, 0.95833],
    38: [0, 0.69444, 0, 0, 0.89444],
    39: [0, 0.69444, 0, 0, 0.31944],
    40: [0.25, 0.75, 0, 0, 0.44722],
    41: [0.25, 0.75, 0, 0, 0.44722],
    42: [0, 0.75, 0, 0, 0.575],
    43: [0.13333, 0.63333, 0, 0, 0.89444],
    44: [0.19444, 0.15556, 0, 0, 0.31944],
    45: [0, 0.44444, 0, 0, 0.38333],
    46: [0, 0.15556, 0, 0, 0.31944],
    47: [0.25, 0.75, 0, 0, 0.575],
    48: [0, 0.64444, 0, 0, 0.575],
    49: [0, 0.64444, 0, 0, 0.575],
    50: [0, 0.64444, 0, 0, 0.575],
    51: [0, 0.64444, 0, 0, 0.575],
    52: [0, 0.64444, 0, 0, 0.575],
    53: [0, 0.64444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0, 0.64444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0, 0.64444, 0, 0, 0.575],
    58: [0, 0.44444, 0, 0, 0.31944],
    59: [0.19444, 0.44444, 0, 0, 0.31944],
    60: [0.08556, 0.58556, 0, 0, 0.89444],
    61: [-0.10889, 0.39111, 0, 0, 0.89444],
    62: [0.08556, 0.58556, 0, 0, 0.89444],
    63: [0, 0.69444, 0, 0, 0.54305],
    64: [0, 0.69444, 0, 0, 0.89444],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0, 0, 0.81805],
    67: [0, 0.68611, 0, 0, 0.83055],
    68: [0, 0.68611, 0, 0, 0.88194],
    69: [0, 0.68611, 0, 0, 0.75555],
    70: [0, 0.68611, 0, 0, 0.72361],
    71: [0, 0.68611, 0, 0, 0.90416],
    72: [0, 0.68611, 0, 0, 0.9],
    73: [0, 0.68611, 0, 0, 0.43611],
    74: [0, 0.68611, 0, 0, 0.59444],
    75: [0, 0.68611, 0, 0, 0.90138],
    76: [0, 0.68611, 0, 0, 0.69166],
    77: [0, 0.68611, 0, 0, 1.09166],
    78: [0, 0.68611, 0, 0, 0.9],
    79: [0, 0.68611, 0, 0, 0.86388],
    80: [0, 0.68611, 0, 0, 0.78611],
    81: [0.19444, 0.68611, 0, 0, 0.86388],
    82: [0, 0.68611, 0, 0, 0.8625],
    83: [0, 0.68611, 0, 0, 0.63889],
    84: [0, 0.68611, 0, 0, 0.8],
    85: [0, 0.68611, 0, 0, 0.88472],
    86: [0, 0.68611, 0.01597, 0, 0.86944],
    87: [0, 0.68611, 0.01597, 0, 1.18888],
    88: [0, 0.68611, 0, 0, 0.86944],
    89: [0, 0.68611, 0.02875, 0, 0.86944],
    90: [0, 0.68611, 0, 0, 0.70277],
    91: [0.25, 0.75, 0, 0, 0.31944],
    92: [0.25, 0.75, 0, 0, 0.575],
    93: [0.25, 0.75, 0, 0, 0.31944],
    94: [0, 0.69444, 0, 0, 0.575],
    95: [0.31, 0.13444, 0.03194, 0, 0.575],
    97: [0, 0.44444, 0, 0, 0.55902],
    98: [0, 0.69444, 0, 0, 0.63889],
    99: [0, 0.44444, 0, 0, 0.51111],
    100: [0, 0.69444, 0, 0, 0.63889],
    101: [0, 0.44444, 0, 0, 0.52708],
    102: [0, 0.69444, 0.10903, 0, 0.35139],
    103: [0.19444, 0.44444, 0.01597, 0, 0.575],
    104: [0, 0.69444, 0, 0, 0.63889],
    105: [0, 0.69444, 0, 0, 0.31944],
    106: [0.19444, 0.69444, 0, 0, 0.35139],
    107: [0, 0.69444, 0, 0, 0.60694],
    108: [0, 0.69444, 0, 0, 0.31944],
    109: [0, 0.44444, 0, 0, 0.95833],
    110: [0, 0.44444, 0, 0, 0.63889],
    111: [0, 0.44444, 0, 0, 0.575],
    112: [0.19444, 0.44444, 0, 0, 0.63889],
    113: [0.19444, 0.44444, 0, 0, 0.60694],
    114: [0, 0.44444, 0, 0, 0.47361],
    115: [0, 0.44444, 0, 0, 0.45361],
    116: [0, 0.63492, 0, 0, 0.44722],
    117: [0, 0.44444, 0, 0, 0.63889],
    118: [0, 0.44444, 0.01597, 0, 0.60694],
    119: [0, 0.44444, 0.01597, 0, 0.83055],
    120: [0, 0.44444, 0, 0, 0.60694],
    121: [0.19444, 0.44444, 0.01597, 0, 0.60694],
    122: [0, 0.44444, 0, 0, 0.51111],
    123: [0.25, 0.75, 0, 0, 0.575],
    124: [0.25, 0.75, 0, 0, 0.31944],
    125: [0.25, 0.75, 0, 0, 0.575],
    126: [0.35, 0.34444, 0, 0, 0.575],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.86853],
    168: [0, 0.69444, 0, 0, 0.575],
    172: [0, 0.44444, 0, 0, 0.76666],
    176: [0, 0.69444, 0, 0, 0.86944],
    177: [0.13333, 0.63333, 0, 0, 0.89444],
    184: [0.17014, 0, 0, 0, 0.51111],
    198: [0, 0.68611, 0, 0, 1.04166],
    215: [0.13333, 0.63333, 0, 0, 0.89444],
    216: [0.04861, 0.73472, 0, 0, 0.89444],
    223: [0, 0.69444, 0, 0, 0.59722],
    230: [0, 0.44444, 0, 0, 0.83055],
    247: [0.13333, 0.63333, 0, 0, 0.89444],
    248: [0.09722, 0.54167, 0, 0, 0.575],
    305: [0, 0.44444, 0, 0, 0.31944],
    338: [0, 0.68611, 0, 0, 1.16944],
    339: [0, 0.44444, 0, 0, 0.89444],
    567: [0.19444, 0.44444, 0, 0, 0.35139],
    710: [0, 0.69444, 0, 0, 0.575],
    711: [0, 0.63194, 0, 0, 0.575],
    713: [0, 0.59611, 0, 0, 0.575],
    714: [0, 0.69444, 0, 0, 0.575],
    715: [0, 0.69444, 0, 0, 0.575],
    728: [0, 0.69444, 0, 0, 0.575],
    729: [0, 0.69444, 0, 0, 0.31944],
    730: [0, 0.69444, 0, 0, 0.86944],
    732: [0, 0.69444, 0, 0, 0.575],
    733: [0, 0.69444, 0, 0, 0.575],
    915: [0, 0.68611, 0, 0, 0.69166],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0, 0, 0.89444],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0, 0, 0.76666],
    928: [0, 0.68611, 0, 0, 0.9],
    931: [0, 0.68611, 0, 0, 0.83055],
    933: [0, 0.68611, 0, 0, 0.89444],
    934: [0, 0.68611, 0, 0, 0.83055],
    936: [0, 0.68611, 0, 0, 0.89444],
    937: [0, 0.68611, 0, 0, 0.83055],
    8211: [0, 0.44444, 0.03194, 0, 0.575],
    8212: [0, 0.44444, 0.03194, 0, 1.14999],
    8216: [0, 0.69444, 0, 0, 0.31944],
    8217: [0, 0.69444, 0, 0, 0.31944],
    8220: [0, 0.69444, 0, 0, 0.60278],
    8221: [0, 0.69444, 0, 0, 0.60278],
    8224: [0.19444, 0.69444, 0, 0, 0.51111],
    8225: [0.19444, 0.69444, 0, 0, 0.51111],
    8242: [0, 0.55556, 0, 0, 0.34444],
    8407: [0, 0.72444, 0.15486, 0, 0.575],
    8463: [0, 0.69444, 0, 0, 0.66759],
    8465: [0, 0.69444, 0, 0, 0.83055],
    8467: [0, 0.69444, 0, 0, 0.47361],
    8472: [0.19444, 0.44444, 0, 0, 0.74027],
    8476: [0, 0.69444, 0, 0, 0.83055],
    8501: [0, 0.69444, 0, 0, 0.70277],
    8592: [-0.10889, 0.39111, 0, 0, 1.14999],
    8593: [0.19444, 0.69444, 0, 0, 0.575],
    8594: [-0.10889, 0.39111, 0, 0, 1.14999],
    8595: [0.19444, 0.69444, 0, 0, 0.575],
    8596: [-0.10889, 0.39111, 0, 0, 1.14999],
    8597: [0.25, 0.75, 0, 0, 0.575],
    8598: [0.19444, 0.69444, 0, 0, 1.14999],
    8599: [0.19444, 0.69444, 0, 0, 1.14999],
    8600: [0.19444, 0.69444, 0, 0, 1.14999],
    8601: [0.19444, 0.69444, 0, 0, 1.14999],
    8636: [-0.10889, 0.39111, 0, 0, 1.14999],
    8637: [-0.10889, 0.39111, 0, 0, 1.14999],
    8640: [-0.10889, 0.39111, 0, 0, 1.14999],
    8641: [-0.10889, 0.39111, 0, 0, 1.14999],
    8656: [-0.10889, 0.39111, 0, 0, 1.14999],
    8657: [0.19444, 0.69444, 0, 0, 0.70277],
    8658: [-0.10889, 0.39111, 0, 0, 1.14999],
    8659: [0.19444, 0.69444, 0, 0, 0.70277],
    8660: [-0.10889, 0.39111, 0, 0, 1.14999],
    8661: [0.25, 0.75, 0, 0, 0.70277],
    8704: [0, 0.69444, 0, 0, 0.63889],
    8706: [0, 0.69444, 0.06389, 0, 0.62847],
    8707: [0, 0.69444, 0, 0, 0.63889],
    8709: [0.05556, 0.75, 0, 0, 0.575],
    8711: [0, 0.68611, 0, 0, 0.95833],
    8712: [0.08556, 0.58556, 0, 0, 0.76666],
    8715: [0.08556, 0.58556, 0, 0, 0.76666],
    8722: [0.13333, 0.63333, 0, 0, 0.89444],
    8723: [0.13333, 0.63333, 0, 0, 0.89444],
    8725: [0.25, 0.75, 0, 0, 0.575],
    8726: [0.25, 0.75, 0, 0, 0.575],
    8727: [-0.02778, 0.47222, 0, 0, 0.575],
    8728: [-0.02639, 0.47361, 0, 0, 0.575],
    8729: [-0.02639, 0.47361, 0, 0, 0.575],
    8730: [0.18, 0.82, 0, 0, 0.95833],
    8733: [0, 0.44444, 0, 0, 0.89444],
    8734: [0, 0.44444, 0, 0, 1.14999],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.31944],
    8741: [0.25, 0.75, 0, 0, 0.575],
    8743: [0, 0.55556, 0, 0, 0.76666],
    8744: [0, 0.55556, 0, 0, 0.76666],
    8745: [0, 0.55556, 0, 0, 0.76666],
    8746: [0, 0.55556, 0, 0, 0.76666],
    8747: [0.19444, 0.69444, 0.12778, 0, 0.56875],
    8764: [-0.10889, 0.39111, 0, 0, 0.89444],
    8768: [0.19444, 0.69444, 0, 0, 0.31944],
    8771: [222e-5, 0.50222, 0, 0, 0.89444],
    8773: [0.027, 0.638, 0, 0, 0.894],
    8776: [0.02444, 0.52444, 0, 0, 0.89444],
    8781: [222e-5, 0.50222, 0, 0, 0.89444],
    8801: [222e-5, 0.50222, 0, 0, 0.89444],
    8804: [0.19667, 0.69667, 0, 0, 0.89444],
    8805: [0.19667, 0.69667, 0, 0, 0.89444],
    8810: [0.08556, 0.58556, 0, 0, 1.14999],
    8811: [0.08556, 0.58556, 0, 0, 1.14999],
    8826: [0.08556, 0.58556, 0, 0, 0.89444],
    8827: [0.08556, 0.58556, 0, 0, 0.89444],
    8834: [0.08556, 0.58556, 0, 0, 0.89444],
    8835: [0.08556, 0.58556, 0, 0, 0.89444],
    8838: [0.19667, 0.69667, 0, 0, 0.89444],
    8839: [0.19667, 0.69667, 0, 0, 0.89444],
    8846: [0, 0.55556, 0, 0, 0.76666],
    8849: [0.19667, 0.69667, 0, 0, 0.89444],
    8850: [0.19667, 0.69667, 0, 0, 0.89444],
    8851: [0, 0.55556, 0, 0, 0.76666],
    8852: [0, 0.55556, 0, 0, 0.76666],
    8853: [0.13333, 0.63333, 0, 0, 0.89444],
    8854: [0.13333, 0.63333, 0, 0, 0.89444],
    8855: [0.13333, 0.63333, 0, 0, 0.89444],
    8856: [0.13333, 0.63333, 0, 0, 0.89444],
    8857: [0.13333, 0.63333, 0, 0, 0.89444],
    8866: [0, 0.69444, 0, 0, 0.70277],
    8867: [0, 0.69444, 0, 0, 0.70277],
    8868: [0, 0.69444, 0, 0, 0.89444],
    8869: [0, 0.69444, 0, 0, 0.89444],
    8900: [-0.02639, 0.47361, 0, 0, 0.575],
    8901: [-0.02639, 0.47361, 0, 0, 0.31944],
    8902: [-0.02778, 0.47222, 0, 0, 0.575],
    8968: [0.25, 0.75, 0, 0, 0.51111],
    8969: [0.25, 0.75, 0, 0, 0.51111],
    8970: [0.25, 0.75, 0, 0, 0.51111],
    8971: [0.25, 0.75, 0, 0, 0.51111],
    8994: [-0.13889, 0.36111, 0, 0, 1.14999],
    8995: [-0.13889, 0.36111, 0, 0, 1.14999],
    9651: [0.19444, 0.69444, 0, 0, 1.02222],
    9657: [-0.02778, 0.47222, 0, 0, 0.575],
    9661: [0.19444, 0.69444, 0, 0, 1.02222],
    9667: [-0.02778, 0.47222, 0, 0, 0.575],
    9711: [0.19444, 0.69444, 0, 0, 1.14999],
    9824: [0.12963, 0.69444, 0, 0, 0.89444],
    9825: [0.12963, 0.69444, 0, 0, 0.89444],
    9826: [0.12963, 0.69444, 0, 0, 0.89444],
    9827: [0.12963, 0.69444, 0, 0, 0.89444],
    9837: [0, 0.75, 0, 0, 0.44722],
    9838: [0.19444, 0.69444, 0, 0, 0.44722],
    9839: [0.19444, 0.69444, 0, 0, 0.44722],
    10216: [0.25, 0.75, 0, 0, 0.44722],
    10217: [0.25, 0.75, 0, 0, 0.44722],
    10815: [0, 0.68611, 0, 0, 0.9],
    10927: [0.19667, 0.69667, 0, 0, 0.89444],
    10928: [0.19667, 0.69667, 0, 0, 0.89444],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Main-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.11417, 0, 0.38611],
    34: [0, 0.69444, 0.07939, 0, 0.62055],
    35: [0.19444, 0.69444, 0.06833, 0, 0.94444],
    37: [0.05556, 0.75, 0.12861, 0, 0.94444],
    38: [0, 0.69444, 0.08528, 0, 0.88555],
    39: [0, 0.69444, 0.12945, 0, 0.35555],
    40: [0.25, 0.75, 0.15806, 0, 0.47333],
    41: [0.25, 0.75, 0.03306, 0, 0.47333],
    42: [0, 0.75, 0.14333, 0, 0.59111],
    43: [0.10333, 0.60333, 0.03306, 0, 0.88555],
    44: [0.19444, 0.14722, 0, 0, 0.35555],
    45: [0, 0.44444, 0.02611, 0, 0.41444],
    46: [0, 0.14722, 0, 0, 0.35555],
    47: [0.25, 0.75, 0.15806, 0, 0.59111],
    48: [0, 0.64444, 0.13167, 0, 0.59111],
    49: [0, 0.64444, 0.13167, 0, 0.59111],
    50: [0, 0.64444, 0.13167, 0, 0.59111],
    51: [0, 0.64444, 0.13167, 0, 0.59111],
    52: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    53: [0, 0.64444, 0.13167, 0, 0.59111],
    54: [0, 0.64444, 0.13167, 0, 0.59111],
    55: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    56: [0, 0.64444, 0.13167, 0, 0.59111],
    57: [0, 0.64444, 0.13167, 0, 0.59111],
    58: [0, 0.44444, 0.06695, 0, 0.35555],
    59: [0.19444, 0.44444, 0.06695, 0, 0.35555],
    61: [-0.10889, 0.39111, 0.06833, 0, 0.88555],
    63: [0, 0.69444, 0.11472, 0, 0.59111],
    64: [0, 0.69444, 0.09208, 0, 0.88555],
    65: [0, 0.68611, 0, 0, 0.86555],
    66: [0, 0.68611, 0.0992, 0, 0.81666],
    67: [0, 0.68611, 0.14208, 0, 0.82666],
    68: [0, 0.68611, 0.09062, 0, 0.87555],
    69: [0, 0.68611, 0.11431, 0, 0.75666],
    70: [0, 0.68611, 0.12903, 0, 0.72722],
    71: [0, 0.68611, 0.07347, 0, 0.89527],
    72: [0, 0.68611, 0.17208, 0, 0.8961],
    73: [0, 0.68611, 0.15681, 0, 0.47166],
    74: [0, 0.68611, 0.145, 0, 0.61055],
    75: [0, 0.68611, 0.14208, 0, 0.89499],
    76: [0, 0.68611, 0, 0, 0.69777],
    77: [0, 0.68611, 0.17208, 0, 1.07277],
    78: [0, 0.68611, 0.17208, 0, 0.8961],
    79: [0, 0.68611, 0.09062, 0, 0.85499],
    80: [0, 0.68611, 0.0992, 0, 0.78721],
    81: [0.19444, 0.68611, 0.09062, 0, 0.85499],
    82: [0, 0.68611, 0.02559, 0, 0.85944],
    83: [0, 0.68611, 0.11264, 0, 0.64999],
    84: [0, 0.68611, 0.12903, 0, 0.7961],
    85: [0, 0.68611, 0.17208, 0, 0.88083],
    86: [0, 0.68611, 0.18625, 0, 0.86555],
    87: [0, 0.68611, 0.18625, 0, 1.15999],
    88: [0, 0.68611, 0.15681, 0, 0.86555],
    89: [0, 0.68611, 0.19803, 0, 0.86555],
    90: [0, 0.68611, 0.14208, 0, 0.70888],
    91: [0.25, 0.75, 0.1875, 0, 0.35611],
    93: [0.25, 0.75, 0.09972, 0, 0.35611],
    94: [0, 0.69444, 0.06709, 0, 0.59111],
    95: [0.31, 0.13444, 0.09811, 0, 0.59111],
    97: [0, 0.44444, 0.09426, 0, 0.59111],
    98: [0, 0.69444, 0.07861, 0, 0.53222],
    99: [0, 0.44444, 0.05222, 0, 0.53222],
    100: [0, 0.69444, 0.10861, 0, 0.59111],
    101: [0, 0.44444, 0.085, 0, 0.53222],
    102: [0.19444, 0.69444, 0.21778, 0, 0.4],
    103: [0.19444, 0.44444, 0.105, 0, 0.53222],
    104: [0, 0.69444, 0.09426, 0, 0.59111],
    105: [0, 0.69326, 0.11387, 0, 0.35555],
    106: [0.19444, 0.69326, 0.1672, 0, 0.35555],
    107: [0, 0.69444, 0.11111, 0, 0.53222],
    108: [0, 0.69444, 0.10861, 0, 0.29666],
    109: [0, 0.44444, 0.09426, 0, 0.94444],
    110: [0, 0.44444, 0.09426, 0, 0.64999],
    111: [0, 0.44444, 0.07861, 0, 0.59111],
    112: [0.19444, 0.44444, 0.07861, 0, 0.59111],
    113: [0.19444, 0.44444, 0.105, 0, 0.53222],
    114: [0, 0.44444, 0.11111, 0, 0.50167],
    115: [0, 0.44444, 0.08167, 0, 0.48694],
    116: [0, 0.63492, 0.09639, 0, 0.385],
    117: [0, 0.44444, 0.09426, 0, 0.62055],
    118: [0, 0.44444, 0.11111, 0, 0.53222],
    119: [0, 0.44444, 0.11111, 0, 0.76777],
    120: [0, 0.44444, 0.12583, 0, 0.56055],
    121: [0.19444, 0.44444, 0.105, 0, 0.56166],
    122: [0, 0.44444, 0.13889, 0, 0.49055],
    126: [0.35, 0.34444, 0.11472, 0, 0.59111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0.11473, 0, 0.59111],
    176: [0, 0.69444, 0, 0, 0.94888],
    184: [0.17014, 0, 0, 0, 0.53222],
    198: [0, 0.68611, 0.11431, 0, 1.02277],
    216: [0.04861, 0.73472, 0.09062, 0, 0.88555],
    223: [0.19444, 0.69444, 0.09736, 0, 0.665],
    230: [0, 0.44444, 0.085, 0, 0.82666],
    248: [0.09722, 0.54167, 0.09458, 0, 0.59111],
    305: [0, 0.44444, 0.09426, 0, 0.35555],
    338: [0, 0.68611, 0.11431, 0, 1.14054],
    339: [0, 0.44444, 0.085, 0, 0.82666],
    567: [0.19444, 0.44444, 0.04611, 0, 0.385],
    710: [0, 0.69444, 0.06709, 0, 0.59111],
    711: [0, 0.63194, 0.08271, 0, 0.59111],
    713: [0, 0.59444, 0.10444, 0, 0.59111],
    714: [0, 0.69444, 0.08528, 0, 0.59111],
    715: [0, 0.69444, 0, 0, 0.59111],
    728: [0, 0.69444, 0.10333, 0, 0.59111],
    729: [0, 0.69444, 0.12945, 0, 0.35555],
    730: [0, 0.69444, 0, 0, 0.94888],
    732: [0, 0.69444, 0.11472, 0, 0.59111],
    733: [0, 0.69444, 0.11472, 0, 0.59111],
    915: [0, 0.68611, 0.12903, 0, 0.69777],
    916: [0, 0.68611, 0, 0, 0.94444],
    920: [0, 0.68611, 0.09062, 0, 0.88555],
    923: [0, 0.68611, 0, 0, 0.80666],
    926: [0, 0.68611, 0.15092, 0, 0.76777],
    928: [0, 0.68611, 0.17208, 0, 0.8961],
    931: [0, 0.68611, 0.11431, 0, 0.82666],
    933: [0, 0.68611, 0.10778, 0, 0.88555],
    934: [0, 0.68611, 0.05632, 0, 0.82666],
    936: [0, 0.68611, 0.10778, 0, 0.88555],
    937: [0, 0.68611, 0.0992, 0, 0.82666],
    8211: [0, 0.44444, 0.09811, 0, 0.59111],
    8212: [0, 0.44444, 0.09811, 0, 1.18221],
    8216: [0, 0.69444, 0.12945, 0, 0.35555],
    8217: [0, 0.69444, 0.12945, 0, 0.35555],
    8220: [0, 0.69444, 0.16772, 0, 0.62055],
    8221: [0, 0.69444, 0.07939, 0, 0.62055]
  },
  "Main-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.12417, 0, 0.30667],
    34: [0, 0.69444, 0.06961, 0, 0.51444],
    35: [0.19444, 0.69444, 0.06616, 0, 0.81777],
    37: [0.05556, 0.75, 0.13639, 0, 0.81777],
    38: [0, 0.69444, 0.09694, 0, 0.76666],
    39: [0, 0.69444, 0.12417, 0, 0.30667],
    40: [0.25, 0.75, 0.16194, 0, 0.40889],
    41: [0.25, 0.75, 0.03694, 0, 0.40889],
    42: [0, 0.75, 0.14917, 0, 0.51111],
    43: [0.05667, 0.56167, 0.03694, 0, 0.76666],
    44: [0.19444, 0.10556, 0, 0, 0.30667],
    45: [0, 0.43056, 0.02826, 0, 0.35778],
    46: [0, 0.10556, 0, 0, 0.30667],
    47: [0.25, 0.75, 0.16194, 0, 0.51111],
    48: [0, 0.64444, 0.13556, 0, 0.51111],
    49: [0, 0.64444, 0.13556, 0, 0.51111],
    50: [0, 0.64444, 0.13556, 0, 0.51111],
    51: [0, 0.64444, 0.13556, 0, 0.51111],
    52: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    53: [0, 0.64444, 0.13556, 0, 0.51111],
    54: [0, 0.64444, 0.13556, 0, 0.51111],
    55: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    56: [0, 0.64444, 0.13556, 0, 0.51111],
    57: [0, 0.64444, 0.13556, 0, 0.51111],
    58: [0, 0.43056, 0.0582, 0, 0.30667],
    59: [0.19444, 0.43056, 0.0582, 0, 0.30667],
    61: [-0.13313, 0.36687, 0.06616, 0, 0.76666],
    63: [0, 0.69444, 0.1225, 0, 0.51111],
    64: [0, 0.69444, 0.09597, 0, 0.76666],
    65: [0, 0.68333, 0, 0, 0.74333],
    66: [0, 0.68333, 0.10257, 0, 0.70389],
    67: [0, 0.68333, 0.14528, 0, 0.71555],
    68: [0, 0.68333, 0.09403, 0, 0.755],
    69: [0, 0.68333, 0.12028, 0, 0.67833],
    70: [0, 0.68333, 0.13305, 0, 0.65277],
    71: [0, 0.68333, 0.08722, 0, 0.77361],
    72: [0, 0.68333, 0.16389, 0, 0.74333],
    73: [0, 0.68333, 0.15806, 0, 0.38555],
    74: [0, 0.68333, 0.14028, 0, 0.525],
    75: [0, 0.68333, 0.14528, 0, 0.76888],
    76: [0, 0.68333, 0, 0, 0.62722],
    77: [0, 0.68333, 0.16389, 0, 0.89666],
    78: [0, 0.68333, 0.16389, 0, 0.74333],
    79: [0, 0.68333, 0.09403, 0, 0.76666],
    80: [0, 0.68333, 0.10257, 0, 0.67833],
    81: [0.19444, 0.68333, 0.09403, 0, 0.76666],
    82: [0, 0.68333, 0.03868, 0, 0.72944],
    83: [0, 0.68333, 0.11972, 0, 0.56222],
    84: [0, 0.68333, 0.13305, 0, 0.71555],
    85: [0, 0.68333, 0.16389, 0, 0.74333],
    86: [0, 0.68333, 0.18361, 0, 0.74333],
    87: [0, 0.68333, 0.18361, 0, 0.99888],
    88: [0, 0.68333, 0.15806, 0, 0.74333],
    89: [0, 0.68333, 0.19383, 0, 0.74333],
    90: [0, 0.68333, 0.14528, 0, 0.61333],
    91: [0.25, 0.75, 0.1875, 0, 0.30667],
    93: [0.25, 0.75, 0.10528, 0, 0.30667],
    94: [0, 0.69444, 0.06646, 0, 0.51111],
    95: [0.31, 0.12056, 0.09208, 0, 0.51111],
    97: [0, 0.43056, 0.07671, 0, 0.51111],
    98: [0, 0.69444, 0.06312, 0, 0.46],
    99: [0, 0.43056, 0.05653, 0, 0.46],
    100: [0, 0.69444, 0.10333, 0, 0.51111],
    101: [0, 0.43056, 0.07514, 0, 0.46],
    102: [0.19444, 0.69444, 0.21194, 0, 0.30667],
    103: [0.19444, 0.43056, 0.08847, 0, 0.46],
    104: [0, 0.69444, 0.07671, 0, 0.51111],
    105: [0, 0.65536, 0.1019, 0, 0.30667],
    106: [0.19444, 0.65536, 0.14467, 0, 0.30667],
    107: [0, 0.69444, 0.10764, 0, 0.46],
    108: [0, 0.69444, 0.10333, 0, 0.25555],
    109: [0, 0.43056, 0.07671, 0, 0.81777],
    110: [0, 0.43056, 0.07671, 0, 0.56222],
    111: [0, 0.43056, 0.06312, 0, 0.51111],
    112: [0.19444, 0.43056, 0.06312, 0, 0.51111],
    113: [0.19444, 0.43056, 0.08847, 0, 0.46],
    114: [0, 0.43056, 0.10764, 0, 0.42166],
    115: [0, 0.43056, 0.08208, 0, 0.40889],
    116: [0, 0.61508, 0.09486, 0, 0.33222],
    117: [0, 0.43056, 0.07671, 0, 0.53666],
    118: [0, 0.43056, 0.10764, 0, 0.46],
    119: [0, 0.43056, 0.10764, 0, 0.66444],
    120: [0, 0.43056, 0.12042, 0, 0.46389],
    121: [0.19444, 0.43056, 0.08847, 0, 0.48555],
    122: [0, 0.43056, 0.12292, 0, 0.40889],
    126: [0.35, 0.31786, 0.11585, 0, 0.51111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.66786, 0.10474, 0, 0.51111],
    176: [0, 0.69444, 0, 0, 0.83129],
    184: [0.17014, 0, 0, 0, 0.46],
    198: [0, 0.68333, 0.12028, 0, 0.88277],
    216: [0.04861, 0.73194, 0.09403, 0, 0.76666],
    223: [0.19444, 0.69444, 0.10514, 0, 0.53666],
    230: [0, 0.43056, 0.07514, 0, 0.71555],
    248: [0.09722, 0.52778, 0.09194, 0, 0.51111],
    338: [0, 0.68333, 0.12028, 0, 0.98499],
    339: [0, 0.43056, 0.07514, 0, 0.71555],
    710: [0, 0.69444, 0.06646, 0, 0.51111],
    711: [0, 0.62847, 0.08295, 0, 0.51111],
    713: [0, 0.56167, 0.10333, 0, 0.51111],
    714: [0, 0.69444, 0.09694, 0, 0.51111],
    715: [0, 0.69444, 0, 0, 0.51111],
    728: [0, 0.69444, 0.10806, 0, 0.51111],
    729: [0, 0.66786, 0.11752, 0, 0.30667],
    730: [0, 0.69444, 0, 0, 0.83129],
    732: [0, 0.66786, 0.11585, 0, 0.51111],
    733: [0, 0.69444, 0.1225, 0, 0.51111],
    915: [0, 0.68333, 0.13305, 0, 0.62722],
    916: [0, 0.68333, 0, 0, 0.81777],
    920: [0, 0.68333, 0.09403, 0, 0.76666],
    923: [0, 0.68333, 0, 0, 0.69222],
    926: [0, 0.68333, 0.15294, 0, 0.66444],
    928: [0, 0.68333, 0.16389, 0, 0.74333],
    931: [0, 0.68333, 0.12028, 0, 0.71555],
    933: [0, 0.68333, 0.11111, 0, 0.76666],
    934: [0, 0.68333, 0.05986, 0, 0.71555],
    936: [0, 0.68333, 0.11111, 0, 0.76666],
    937: [0, 0.68333, 0.10257, 0, 0.71555],
    8211: [0, 0.43056, 0.09208, 0, 0.51111],
    8212: [0, 0.43056, 0.09208, 0, 1.02222],
    8216: [0, 0.69444, 0.12417, 0, 0.30667],
    8217: [0, 0.69444, 0.12417, 0, 0.30667],
    8220: [0, 0.69444, 0.1685, 0, 0.51444],
    8221: [0, 0.69444, 0.06961, 0, 0.51444],
    8463: [0, 0.68889, 0, 0, 0.54028]
  },
  "Main-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.27778],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.77778],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.19444, 0.10556, 0, 0, 0.27778],
    45: [0, 0.43056, 0, 0, 0.33333],
    46: [0, 0.10556, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.64444, 0, 0, 0.5],
    49: [0, 0.64444, 0, 0, 0.5],
    50: [0, 0.64444, 0, 0, 0.5],
    51: [0, 0.64444, 0, 0, 0.5],
    52: [0, 0.64444, 0, 0, 0.5],
    53: [0, 0.64444, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0, 0.64444, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0, 0.64444, 0, 0, 0.5],
    58: [0, 0.43056, 0, 0, 0.27778],
    59: [0.19444, 0.43056, 0, 0, 0.27778],
    60: [0.0391, 0.5391, 0, 0, 0.77778],
    61: [-0.13313, 0.36687, 0, 0, 0.77778],
    62: [0.0391, 0.5391, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.77778],
    65: [0, 0.68333, 0, 0, 0.75],
    66: [0, 0.68333, 0, 0, 0.70834],
    67: [0, 0.68333, 0, 0, 0.72222],
    68: [0, 0.68333, 0, 0, 0.76389],
    69: [0, 0.68333, 0, 0, 0.68056],
    70: [0, 0.68333, 0, 0, 0.65278],
    71: [0, 0.68333, 0, 0, 0.78472],
    72: [0, 0.68333, 0, 0, 0.75],
    73: [0, 0.68333, 0, 0, 0.36111],
    74: [0, 0.68333, 0, 0, 0.51389],
    75: [0, 0.68333, 0, 0, 0.77778],
    76: [0, 0.68333, 0, 0, 0.625],
    77: [0, 0.68333, 0, 0, 0.91667],
    78: [0, 0.68333, 0, 0, 0.75],
    79: [0, 0.68333, 0, 0, 0.77778],
    80: [0, 0.68333, 0, 0, 0.68056],
    81: [0.19444, 0.68333, 0, 0, 0.77778],
    82: [0, 0.68333, 0, 0, 0.73611],
    83: [0, 0.68333, 0, 0, 0.55556],
    84: [0, 0.68333, 0, 0, 0.72222],
    85: [0, 0.68333, 0, 0, 0.75],
    86: [0, 0.68333, 0.01389, 0, 0.75],
    87: [0, 0.68333, 0.01389, 0, 1.02778],
    88: [0, 0.68333, 0, 0, 0.75],
    89: [0, 0.68333, 0.025, 0, 0.75],
    90: [0, 0.68333, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.27778],
    92: [0.25, 0.75, 0, 0, 0.5],
    93: [0.25, 0.75, 0, 0, 0.27778],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.31, 0.12056, 0.02778, 0, 0.5],
    97: [0, 0.43056, 0, 0, 0.5],
    98: [0, 0.69444, 0, 0, 0.55556],
    99: [0, 0.43056, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.55556],
    101: [0, 0.43056, 0, 0, 0.44445],
    102: [0, 0.69444, 0.07778, 0, 0.30556],
    103: [0.19444, 0.43056, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.55556],
    105: [0, 0.66786, 0, 0, 0.27778],
    106: [0.19444, 0.66786, 0, 0, 0.30556],
    107: [0, 0.69444, 0, 0, 0.52778],
    108: [0, 0.69444, 0, 0, 0.27778],
    109: [0, 0.43056, 0, 0, 0.83334],
    110: [0, 0.43056, 0, 0, 0.55556],
    111: [0, 0.43056, 0, 0, 0.5],
    112: [0.19444, 0.43056, 0, 0, 0.55556],
    113: [0.19444, 0.43056, 0, 0, 0.52778],
    114: [0, 0.43056, 0, 0, 0.39167],
    115: [0, 0.43056, 0, 0, 0.39445],
    116: [0, 0.61508, 0, 0, 0.38889],
    117: [0, 0.43056, 0, 0, 0.55556],
    118: [0, 0.43056, 0.01389, 0, 0.52778],
    119: [0, 0.43056, 0.01389, 0, 0.72222],
    120: [0, 0.43056, 0, 0, 0.52778],
    121: [0.19444, 0.43056, 0.01389, 0, 0.52778],
    122: [0, 0.43056, 0, 0, 0.44445],
    123: [0.25, 0.75, 0, 0, 0.5],
    124: [0.25, 0.75, 0, 0, 0.27778],
    125: [0.25, 0.75, 0, 0, 0.5],
    126: [0.35, 0.31786, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.76909],
    167: [0.19444, 0.69444, 0, 0, 0.44445],
    168: [0, 0.66786, 0, 0, 0.5],
    172: [0, 0.43056, 0, 0, 0.66667],
    176: [0, 0.69444, 0, 0, 0.75],
    177: [0.08333, 0.58333, 0, 0, 0.77778],
    182: [0.19444, 0.69444, 0, 0, 0.61111],
    184: [0.17014, 0, 0, 0, 0.44445],
    198: [0, 0.68333, 0, 0, 0.90278],
    215: [0.08333, 0.58333, 0, 0, 0.77778],
    216: [0.04861, 0.73194, 0, 0, 0.77778],
    223: [0, 0.69444, 0, 0, 0.5],
    230: [0, 0.43056, 0, 0, 0.72222],
    247: [0.08333, 0.58333, 0, 0, 0.77778],
    248: [0.09722, 0.52778, 0, 0, 0.5],
    305: [0, 0.43056, 0, 0, 0.27778],
    338: [0, 0.68333, 0, 0, 1.01389],
    339: [0, 0.43056, 0, 0, 0.77778],
    567: [0.19444, 0.43056, 0, 0, 0.30556],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.62847, 0, 0, 0.5],
    713: [0, 0.56778, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.66786, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.75],
    732: [0, 0.66786, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.68333, 0, 0, 0.625],
    916: [0, 0.68333, 0, 0, 0.83334],
    920: [0, 0.68333, 0, 0, 0.77778],
    923: [0, 0.68333, 0, 0, 0.69445],
    926: [0, 0.68333, 0, 0, 0.66667],
    928: [0, 0.68333, 0, 0, 0.75],
    931: [0, 0.68333, 0, 0, 0.72222],
    933: [0, 0.68333, 0, 0, 0.77778],
    934: [0, 0.68333, 0, 0, 0.72222],
    936: [0, 0.68333, 0, 0, 0.77778],
    937: [0, 0.68333, 0, 0, 0.72222],
    8211: [0, 0.43056, 0.02778, 0, 0.5],
    8212: [0, 0.43056, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5],
    8224: [0.19444, 0.69444, 0, 0, 0.44445],
    8225: [0.19444, 0.69444, 0, 0, 0.44445],
    8230: [0, 0.123, 0, 0, 1.172],
    8242: [0, 0.55556, 0, 0, 0.275],
    8407: [0, 0.71444, 0.15382, 0, 0.5],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8465: [0, 0.69444, 0, 0, 0.72222],
    8467: [0, 0.69444, 0, 0.11111, 0.41667],
    8472: [0.19444, 0.43056, 0, 0.11111, 0.63646],
    8476: [0, 0.69444, 0, 0, 0.72222],
    8501: [0, 0.69444, 0, 0, 0.61111],
    8592: [-0.13313, 0.36687, 0, 0, 1],
    8593: [0.19444, 0.69444, 0, 0, 0.5],
    8594: [-0.13313, 0.36687, 0, 0, 1],
    8595: [0.19444, 0.69444, 0, 0, 0.5],
    8596: [-0.13313, 0.36687, 0, 0, 1],
    8597: [0.25, 0.75, 0, 0, 0.5],
    8598: [0.19444, 0.69444, 0, 0, 1],
    8599: [0.19444, 0.69444, 0, 0, 1],
    8600: [0.19444, 0.69444, 0, 0, 1],
    8601: [0.19444, 0.69444, 0, 0, 1],
    8614: [0.011, 0.511, 0, 0, 1],
    8617: [0.011, 0.511, 0, 0, 1.126],
    8618: [0.011, 0.511, 0, 0, 1.126],
    8636: [-0.13313, 0.36687, 0, 0, 1],
    8637: [-0.13313, 0.36687, 0, 0, 1],
    8640: [-0.13313, 0.36687, 0, 0, 1],
    8641: [-0.13313, 0.36687, 0, 0, 1],
    8652: [0.011, 0.671, 0, 0, 1],
    8656: [-0.13313, 0.36687, 0, 0, 1],
    8657: [0.19444, 0.69444, 0, 0, 0.61111],
    8658: [-0.13313, 0.36687, 0, 0, 1],
    8659: [0.19444, 0.69444, 0, 0, 0.61111],
    8660: [-0.13313, 0.36687, 0, 0, 1],
    8661: [0.25, 0.75, 0, 0, 0.61111],
    8704: [0, 0.69444, 0, 0, 0.55556],
    8706: [0, 0.69444, 0.05556, 0.08334, 0.5309],
    8707: [0, 0.69444, 0, 0, 0.55556],
    8709: [0.05556, 0.75, 0, 0, 0.5],
    8711: [0, 0.68333, 0, 0, 0.83334],
    8712: [0.0391, 0.5391, 0, 0, 0.66667],
    8715: [0.0391, 0.5391, 0, 0, 0.66667],
    8722: [0.08333, 0.58333, 0, 0, 0.77778],
    8723: [0.08333, 0.58333, 0, 0, 0.77778],
    8725: [0.25, 0.75, 0, 0, 0.5],
    8726: [0.25, 0.75, 0, 0, 0.5],
    8727: [-0.03472, 0.46528, 0, 0, 0.5],
    8728: [-0.05555, 0.44445, 0, 0, 0.5],
    8729: [-0.05555, 0.44445, 0, 0, 0.5],
    8730: [0.2, 0.8, 0, 0, 0.83334],
    8733: [0, 0.43056, 0, 0, 0.77778],
    8734: [0, 0.43056, 0, 0, 1],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.27778],
    8741: [0.25, 0.75, 0, 0, 0.5],
    8743: [0, 0.55556, 0, 0, 0.66667],
    8744: [0, 0.55556, 0, 0, 0.66667],
    8745: [0, 0.55556, 0, 0, 0.66667],
    8746: [0, 0.55556, 0, 0, 0.66667],
    8747: [0.19444, 0.69444, 0.11111, 0, 0.41667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8768: [0.19444, 0.69444, 0, 0, 0.27778],
    8771: [-0.03625, 0.46375, 0, 0, 0.77778],
    8773: [-0.022, 0.589, 0, 0, 0.778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8781: [-0.03625, 0.46375, 0, 0, 0.77778],
    8784: [-0.133, 0.673, 0, 0, 0.778],
    8801: [-0.03625, 0.46375, 0, 0, 0.77778],
    8804: [0.13597, 0.63597, 0, 0, 0.77778],
    8805: [0.13597, 0.63597, 0, 0, 0.77778],
    8810: [0.0391, 0.5391, 0, 0, 1],
    8811: [0.0391, 0.5391, 0, 0, 1],
    8826: [0.0391, 0.5391, 0, 0, 0.77778],
    8827: [0.0391, 0.5391, 0, 0, 0.77778],
    8834: [0.0391, 0.5391, 0, 0, 0.77778],
    8835: [0.0391, 0.5391, 0, 0, 0.77778],
    8838: [0.13597, 0.63597, 0, 0, 0.77778],
    8839: [0.13597, 0.63597, 0, 0, 0.77778],
    8846: [0, 0.55556, 0, 0, 0.66667],
    8849: [0.13597, 0.63597, 0, 0, 0.77778],
    8850: [0.13597, 0.63597, 0, 0, 0.77778],
    8851: [0, 0.55556, 0, 0, 0.66667],
    8852: [0, 0.55556, 0, 0, 0.66667],
    8853: [0.08333, 0.58333, 0, 0, 0.77778],
    8854: [0.08333, 0.58333, 0, 0, 0.77778],
    8855: [0.08333, 0.58333, 0, 0, 0.77778],
    8856: [0.08333, 0.58333, 0, 0, 0.77778],
    8857: [0.08333, 0.58333, 0, 0, 0.77778],
    8866: [0, 0.69444, 0, 0, 0.61111],
    8867: [0, 0.69444, 0, 0, 0.61111],
    8868: [0, 0.69444, 0, 0, 0.77778],
    8869: [0, 0.69444, 0, 0, 0.77778],
    8872: [0.249, 0.75, 0, 0, 0.867],
    8900: [-0.05555, 0.44445, 0, 0, 0.5],
    8901: [-0.05555, 0.44445, 0, 0, 0.27778],
    8902: [-0.03472, 0.46528, 0, 0, 0.5],
    8904: [5e-3, 0.505, 0, 0, 0.9],
    8942: [0.03, 0.903, 0, 0, 0.278],
    8943: [-0.19, 0.313, 0, 0, 1.172],
    8945: [-0.1, 0.823, 0, 0, 1.282],
    8968: [0.25, 0.75, 0, 0, 0.44445],
    8969: [0.25, 0.75, 0, 0, 0.44445],
    8970: [0.25, 0.75, 0, 0, 0.44445],
    8971: [0.25, 0.75, 0, 0, 0.44445],
    8994: [-0.14236, 0.35764, 0, 0, 1],
    8995: [-0.14236, 0.35764, 0, 0, 1],
    9136: [0.244, 0.744, 0, 0, 0.412],
    9137: [0.244, 0.745, 0, 0, 0.412],
    9651: [0.19444, 0.69444, 0, 0, 0.88889],
    9657: [-0.03472, 0.46528, 0, 0, 0.5],
    9661: [0.19444, 0.69444, 0, 0, 0.88889],
    9667: [-0.03472, 0.46528, 0, 0, 0.5],
    9711: [0.19444, 0.69444, 0, 0, 1],
    9824: [0.12963, 0.69444, 0, 0, 0.77778],
    9825: [0.12963, 0.69444, 0, 0, 0.77778],
    9826: [0.12963, 0.69444, 0, 0, 0.77778],
    9827: [0.12963, 0.69444, 0, 0, 0.77778],
    9837: [0, 0.75, 0, 0, 0.38889],
    9838: [0.19444, 0.69444, 0, 0, 0.38889],
    9839: [0.19444, 0.69444, 0, 0, 0.38889],
    10216: [0.25, 0.75, 0, 0, 0.38889],
    10217: [0.25, 0.75, 0, 0, 0.38889],
    10222: [0.244, 0.744, 0, 0, 0.412],
    10223: [0.244, 0.745, 0, 0, 0.412],
    10229: [0.011, 0.511, 0, 0, 1.609],
    10230: [0.011, 0.511, 0, 0, 1.638],
    10231: [0.011, 0.511, 0, 0, 1.859],
    10232: [0.024, 0.525, 0, 0, 1.609],
    10233: [0.024, 0.525, 0, 0, 1.638],
    10234: [0.024, 0.525, 0, 0, 1.858],
    10236: [0.011, 0.511, 0, 0, 1.638],
    10815: [0, 0.68333, 0, 0, 0.75],
    10927: [0.13597, 0.63597, 0, 0, 0.77778],
    10928: [0.13597, 0.63597, 0, 0, 0.77778],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Math-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.44444, 0, 0, 0.575],
    49: [0, 0.44444, 0, 0, 0.575],
    50: [0, 0.44444, 0, 0, 0.575],
    51: [0.19444, 0.44444, 0, 0, 0.575],
    52: [0.19444, 0.44444, 0, 0, 0.575],
    53: [0.19444, 0.44444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0.19444, 0.44444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0.19444, 0.44444, 0, 0, 0.575],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0.04835, 0, 0.8664],
    67: [0, 0.68611, 0.06979, 0, 0.81694],
    68: [0, 0.68611, 0.03194, 0, 0.93812],
    69: [0, 0.68611, 0.05451, 0, 0.81007],
    70: [0, 0.68611, 0.15972, 0, 0.68889],
    71: [0, 0.68611, 0, 0, 0.88673],
    72: [0, 0.68611, 0.08229, 0, 0.98229],
    73: [0, 0.68611, 0.07778, 0, 0.51111],
    74: [0, 0.68611, 0.10069, 0, 0.63125],
    75: [0, 0.68611, 0.06979, 0, 0.97118],
    76: [0, 0.68611, 0, 0, 0.75555],
    77: [0, 0.68611, 0.11424, 0, 1.14201],
    78: [0, 0.68611, 0.11424, 0, 0.95034],
    79: [0, 0.68611, 0.03194, 0, 0.83666],
    80: [0, 0.68611, 0.15972, 0, 0.72309],
    81: [0.19444, 0.68611, 0, 0, 0.86861],
    82: [0, 0.68611, 421e-5, 0, 0.87235],
    83: [0, 0.68611, 0.05382, 0, 0.69271],
    84: [0, 0.68611, 0.15972, 0, 0.63663],
    85: [0, 0.68611, 0.11424, 0, 0.80027],
    86: [0, 0.68611, 0.25555, 0, 0.67778],
    87: [0, 0.68611, 0.15972, 0, 1.09305],
    88: [0, 0.68611, 0.07778, 0, 0.94722],
    89: [0, 0.68611, 0.25555, 0, 0.67458],
    90: [0, 0.68611, 0.06979, 0, 0.77257],
    97: [0, 0.44444, 0, 0, 0.63287],
    98: [0, 0.69444, 0, 0, 0.52083],
    99: [0, 0.44444, 0, 0, 0.51342],
    100: [0, 0.69444, 0, 0, 0.60972],
    101: [0, 0.44444, 0, 0, 0.55361],
    102: [0.19444, 0.69444, 0.11042, 0, 0.56806],
    103: [0.19444, 0.44444, 0.03704, 0, 0.5449],
    104: [0, 0.69444, 0, 0, 0.66759],
    105: [0, 0.69326, 0, 0, 0.4048],
    106: [0.19444, 0.69326, 0.0622, 0, 0.47083],
    107: [0, 0.69444, 0.01852, 0, 0.6037],
    108: [0, 0.69444, 88e-4, 0, 0.34815],
    109: [0, 0.44444, 0, 0, 1.0324],
    110: [0, 0.44444, 0, 0, 0.71296],
    111: [0, 0.44444, 0, 0, 0.58472],
    112: [0.19444, 0.44444, 0, 0, 0.60092],
    113: [0.19444, 0.44444, 0.03704, 0, 0.54213],
    114: [0, 0.44444, 0.03194, 0, 0.5287],
    115: [0, 0.44444, 0, 0, 0.53125],
    116: [0, 0.63492, 0, 0, 0.41528],
    117: [0, 0.44444, 0, 0, 0.68102],
    118: [0, 0.44444, 0.03704, 0, 0.56666],
    119: [0, 0.44444, 0.02778, 0, 0.83148],
    120: [0, 0.44444, 0, 0, 0.65903],
    121: [0.19444, 0.44444, 0.03704, 0, 0.59028],
    122: [0, 0.44444, 0.04213, 0, 0.55509],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68611, 0.15972, 0, 0.65694],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0.03194, 0, 0.86722],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0.07458, 0, 0.84125],
    928: [0, 0.68611, 0.08229, 0, 0.98229],
    931: [0, 0.68611, 0.05451, 0, 0.88507],
    933: [0, 0.68611, 0.15972, 0, 0.67083],
    934: [0, 0.68611, 0, 0, 0.76666],
    936: [0, 0.68611, 0.11653, 0, 0.71402],
    937: [0, 0.68611, 0.04835, 0, 0.8789],
    945: [0, 0.44444, 0, 0, 0.76064],
    946: [0.19444, 0.69444, 0.03403, 0, 0.65972],
    947: [0.19444, 0.44444, 0.06389, 0, 0.59003],
    948: [0, 0.69444, 0.03819, 0, 0.52222],
    949: [0, 0.44444, 0, 0, 0.52882],
    950: [0.19444, 0.69444, 0.06215, 0, 0.50833],
    951: [0.19444, 0.44444, 0.03704, 0, 0.6],
    952: [0, 0.69444, 0.03194, 0, 0.5618],
    953: [0, 0.44444, 0, 0, 0.41204],
    954: [0, 0.44444, 0, 0, 0.66759],
    955: [0, 0.69444, 0, 0, 0.67083],
    956: [0.19444, 0.44444, 0, 0, 0.70787],
    957: [0, 0.44444, 0.06898, 0, 0.57685],
    958: [0.19444, 0.69444, 0.03021, 0, 0.50833],
    959: [0, 0.44444, 0, 0, 0.58472],
    960: [0, 0.44444, 0.03704, 0, 0.68241],
    961: [0.19444, 0.44444, 0, 0, 0.6118],
    962: [0.09722, 0.44444, 0.07917, 0, 0.42361],
    963: [0, 0.44444, 0.03704, 0, 0.68588],
    964: [0, 0.44444, 0.13472, 0, 0.52083],
    965: [0, 0.44444, 0.03704, 0, 0.63055],
    966: [0.19444, 0.44444, 0, 0, 0.74722],
    967: [0.19444, 0.44444, 0, 0, 0.71805],
    968: [0.19444, 0.69444, 0.03704, 0, 0.75833],
    969: [0, 0.44444, 0.03704, 0, 0.71782],
    977: [0, 0.69444, 0, 0, 0.69155],
    981: [0.19444, 0.69444, 0, 0, 0.7125],
    982: [0, 0.44444, 0.03194, 0, 0.975],
    1009: [0.19444, 0.44444, 0, 0, 0.6118],
    1013: [0, 0.44444, 0, 0, 0.48333],
    57649: [0, 0.44444, 0, 0, 0.39352],
    57911: [0.19444, 0.44444, 0, 0, 0.43889]
  },
  "Math-Italic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.43056, 0, 0, 0.5],
    49: [0, 0.43056, 0, 0, 0.5],
    50: [0, 0.43056, 0, 0, 0.5],
    51: [0.19444, 0.43056, 0, 0, 0.5],
    52: [0.19444, 0.43056, 0, 0, 0.5],
    53: [0.19444, 0.43056, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0.19444, 0.43056, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0.19444, 0.43056, 0, 0, 0.5],
    65: [0, 0.68333, 0, 0.13889, 0.75],
    66: [0, 0.68333, 0.05017, 0.08334, 0.75851],
    67: [0, 0.68333, 0.07153, 0.08334, 0.71472],
    68: [0, 0.68333, 0.02778, 0.05556, 0.82792],
    69: [0, 0.68333, 0.05764, 0.08334, 0.7382],
    70: [0, 0.68333, 0.13889, 0.08334, 0.64306],
    71: [0, 0.68333, 0, 0.08334, 0.78625],
    72: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    73: [0, 0.68333, 0.07847, 0.11111, 0.43958],
    74: [0, 0.68333, 0.09618, 0.16667, 0.55451],
    75: [0, 0.68333, 0.07153, 0.05556, 0.84931],
    76: [0, 0.68333, 0, 0.02778, 0.68056],
    77: [0, 0.68333, 0.10903, 0.08334, 0.97014],
    78: [0, 0.68333, 0.10903, 0.08334, 0.80347],
    79: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    80: [0, 0.68333, 0.13889, 0.08334, 0.64201],
    81: [0.19444, 0.68333, 0, 0.08334, 0.79056],
    82: [0, 0.68333, 773e-5, 0.08334, 0.75929],
    83: [0, 0.68333, 0.05764, 0.08334, 0.6132],
    84: [0, 0.68333, 0.13889, 0.08334, 0.58438],
    85: [0, 0.68333, 0.10903, 0.02778, 0.68278],
    86: [0, 0.68333, 0.22222, 0, 0.58333],
    87: [0, 0.68333, 0.13889, 0, 0.94445],
    88: [0, 0.68333, 0.07847, 0.08334, 0.82847],
    89: [0, 0.68333, 0.22222, 0, 0.58056],
    90: [0, 0.68333, 0.07153, 0.08334, 0.68264],
    97: [0, 0.43056, 0, 0, 0.52859],
    98: [0, 0.69444, 0, 0, 0.42917],
    99: [0, 0.43056, 0, 0.05556, 0.43276],
    100: [0, 0.69444, 0, 0.16667, 0.52049],
    101: [0, 0.43056, 0, 0.05556, 0.46563],
    102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
    103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
    104: [0, 0.69444, 0, 0, 0.57616],
    105: [0, 0.65952, 0, 0, 0.34451],
    106: [0.19444, 0.65952, 0.05724, 0, 0.41181],
    107: [0, 0.69444, 0.03148, 0, 0.5206],
    108: [0, 0.69444, 0.01968, 0.08334, 0.29838],
    109: [0, 0.43056, 0, 0, 0.87801],
    110: [0, 0.43056, 0, 0, 0.60023],
    111: [0, 0.43056, 0, 0.05556, 0.48472],
    112: [0.19444, 0.43056, 0, 0.08334, 0.50313],
    113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
    114: [0, 0.43056, 0.02778, 0.05556, 0.45116],
    115: [0, 0.43056, 0, 0.05556, 0.46875],
    116: [0, 0.61508, 0, 0.08334, 0.36111],
    117: [0, 0.43056, 0, 0.02778, 0.57246],
    118: [0, 0.43056, 0.03588, 0.02778, 0.48472],
    119: [0, 0.43056, 0.02691, 0.08334, 0.71592],
    120: [0, 0.43056, 0, 0.02778, 0.57153],
    121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
    122: [0, 0.43056, 0.04398, 0.05556, 0.46505],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68333, 0.13889, 0.08334, 0.61528],
    916: [0, 0.68333, 0, 0.16667, 0.83334],
    920: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    923: [0, 0.68333, 0, 0.16667, 0.69445],
    926: [0, 0.68333, 0.07569, 0.08334, 0.74236],
    928: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    931: [0, 0.68333, 0.05764, 0.08334, 0.77986],
    933: [0, 0.68333, 0.13889, 0.05556, 0.58333],
    934: [0, 0.68333, 0, 0.08334, 0.66667],
    936: [0, 0.68333, 0.11, 0.05556, 0.61222],
    937: [0, 0.68333, 0.05017, 0.08334, 0.7724],
    945: [0, 0.43056, 37e-4, 0.02778, 0.6397],
    946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
    947: [0.19444, 0.43056, 0.05556, 0, 0.51773],
    948: [0, 0.69444, 0.03785, 0.05556, 0.44444],
    949: [0, 0.43056, 0, 0.08334, 0.46632],
    950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
    951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
    952: [0, 0.69444, 0.02778, 0.08334, 0.46944],
    953: [0, 0.43056, 0, 0.05556, 0.35394],
    954: [0, 0.43056, 0, 0, 0.57616],
    955: [0, 0.69444, 0, 0, 0.58334],
    956: [0.19444, 0.43056, 0, 0.02778, 0.60255],
    957: [0, 0.43056, 0.06366, 0.02778, 0.49398],
    958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
    959: [0, 0.43056, 0, 0.05556, 0.48472],
    960: [0, 0.43056, 0.03588, 0, 0.57003],
    961: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
    963: [0, 0.43056, 0.03588, 0, 0.57141],
    964: [0, 0.43056, 0.1132, 0.02778, 0.43715],
    965: [0, 0.43056, 0.03588, 0.02778, 0.54028],
    966: [0.19444, 0.43056, 0, 0.08334, 0.65417],
    967: [0.19444, 0.43056, 0, 0.05556, 0.62569],
    968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
    969: [0, 0.43056, 0.03588, 0, 0.62245],
    977: [0, 0.69444, 0, 0.08334, 0.59144],
    981: [0.19444, 0.69444, 0, 0.08334, 0.59583],
    982: [0, 0.43056, 0.02778, 0, 0.82813],
    1009: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    1013: [0, 0.43056, 0, 0.05556, 0.4059],
    57649: [0, 0.43056, 0, 0.02778, 0.32246],
    57911: [0.19444, 0.43056, 0, 0.08334, 0.38403]
  },
  "SansSerif-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.36667],
    34: [0, 0.69444, 0, 0, 0.55834],
    35: [0.19444, 0.69444, 0, 0, 0.91667],
    36: [0.05556, 0.75, 0, 0, 0.55],
    37: [0.05556, 0.75, 0, 0, 1.02912],
    38: [0, 0.69444, 0, 0, 0.83056],
    39: [0, 0.69444, 0, 0, 0.30556],
    40: [0.25, 0.75, 0, 0, 0.42778],
    41: [0.25, 0.75, 0, 0, 0.42778],
    42: [0, 0.75, 0, 0, 0.55],
    43: [0.11667, 0.61667, 0, 0, 0.85556],
    44: [0.10556, 0.13056, 0, 0, 0.30556],
    45: [0, 0.45833, 0, 0, 0.36667],
    46: [0, 0.13056, 0, 0, 0.30556],
    47: [0.25, 0.75, 0, 0, 0.55],
    48: [0, 0.69444, 0, 0, 0.55],
    49: [0, 0.69444, 0, 0, 0.55],
    50: [0, 0.69444, 0, 0, 0.55],
    51: [0, 0.69444, 0, 0, 0.55],
    52: [0, 0.69444, 0, 0, 0.55],
    53: [0, 0.69444, 0, 0, 0.55],
    54: [0, 0.69444, 0, 0, 0.55],
    55: [0, 0.69444, 0, 0, 0.55],
    56: [0, 0.69444, 0, 0, 0.55],
    57: [0, 0.69444, 0, 0, 0.55],
    58: [0, 0.45833, 0, 0, 0.30556],
    59: [0.10556, 0.45833, 0, 0, 0.30556],
    61: [-0.09375, 0.40625, 0, 0, 0.85556],
    63: [0, 0.69444, 0, 0, 0.51945],
    64: [0, 0.69444, 0, 0, 0.73334],
    65: [0, 0.69444, 0, 0, 0.73334],
    66: [0, 0.69444, 0, 0, 0.73334],
    67: [0, 0.69444, 0, 0, 0.70278],
    68: [0, 0.69444, 0, 0, 0.79445],
    69: [0, 0.69444, 0, 0, 0.64167],
    70: [0, 0.69444, 0, 0, 0.61111],
    71: [0, 0.69444, 0, 0, 0.73334],
    72: [0, 0.69444, 0, 0, 0.79445],
    73: [0, 0.69444, 0, 0, 0.33056],
    74: [0, 0.69444, 0, 0, 0.51945],
    75: [0, 0.69444, 0, 0, 0.76389],
    76: [0, 0.69444, 0, 0, 0.58056],
    77: [0, 0.69444, 0, 0, 0.97778],
    78: [0, 0.69444, 0, 0, 0.79445],
    79: [0, 0.69444, 0, 0, 0.79445],
    80: [0, 0.69444, 0, 0, 0.70278],
    81: [0.10556, 0.69444, 0, 0, 0.79445],
    82: [0, 0.69444, 0, 0, 0.70278],
    83: [0, 0.69444, 0, 0, 0.61111],
    84: [0, 0.69444, 0, 0, 0.73334],
    85: [0, 0.69444, 0, 0, 0.76389],
    86: [0, 0.69444, 0.01528, 0, 0.73334],
    87: [0, 0.69444, 0.01528, 0, 1.03889],
    88: [0, 0.69444, 0, 0, 0.73334],
    89: [0, 0.69444, 0.0275, 0, 0.73334],
    90: [0, 0.69444, 0, 0, 0.67223],
    91: [0.25, 0.75, 0, 0, 0.34306],
    93: [0.25, 0.75, 0, 0, 0.34306],
    94: [0, 0.69444, 0, 0, 0.55],
    95: [0.35, 0.10833, 0.03056, 0, 0.55],
    97: [0, 0.45833, 0, 0, 0.525],
    98: [0, 0.69444, 0, 0, 0.56111],
    99: [0, 0.45833, 0, 0, 0.48889],
    100: [0, 0.69444, 0, 0, 0.56111],
    101: [0, 0.45833, 0, 0, 0.51111],
    102: [0, 0.69444, 0.07639, 0, 0.33611],
    103: [0.19444, 0.45833, 0.01528, 0, 0.55],
    104: [0, 0.69444, 0, 0, 0.56111],
    105: [0, 0.69444, 0, 0, 0.25556],
    106: [0.19444, 0.69444, 0, 0, 0.28611],
    107: [0, 0.69444, 0, 0, 0.53056],
    108: [0, 0.69444, 0, 0, 0.25556],
    109: [0, 0.45833, 0, 0, 0.86667],
    110: [0, 0.45833, 0, 0, 0.56111],
    111: [0, 0.45833, 0, 0, 0.55],
    112: [0.19444, 0.45833, 0, 0, 0.56111],
    113: [0.19444, 0.45833, 0, 0, 0.56111],
    114: [0, 0.45833, 0.01528, 0, 0.37222],
    115: [0, 0.45833, 0, 0, 0.42167],
    116: [0, 0.58929, 0, 0, 0.40417],
    117: [0, 0.45833, 0, 0, 0.56111],
    118: [0, 0.45833, 0.01528, 0, 0.5],
    119: [0, 0.45833, 0.01528, 0, 0.74445],
    120: [0, 0.45833, 0, 0, 0.5],
    121: [0.19444, 0.45833, 0.01528, 0, 0.5],
    122: [0, 0.45833, 0, 0, 0.47639],
    126: [0.35, 0.34444, 0, 0, 0.55],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0, 0, 0.55],
    176: [0, 0.69444, 0, 0, 0.73334],
    180: [0, 0.69444, 0, 0, 0.55],
    184: [0.17014, 0, 0, 0, 0.48889],
    305: [0, 0.45833, 0, 0, 0.25556],
    567: [0.19444, 0.45833, 0, 0, 0.28611],
    710: [0, 0.69444, 0, 0, 0.55],
    711: [0, 0.63542, 0, 0, 0.55],
    713: [0, 0.63778, 0, 0, 0.55],
    728: [0, 0.69444, 0, 0, 0.55],
    729: [0, 0.69444, 0, 0, 0.30556],
    730: [0, 0.69444, 0, 0, 0.73334],
    732: [0, 0.69444, 0, 0, 0.55],
    733: [0, 0.69444, 0, 0, 0.55],
    915: [0, 0.69444, 0, 0, 0.58056],
    916: [0, 0.69444, 0, 0, 0.91667],
    920: [0, 0.69444, 0, 0, 0.85556],
    923: [0, 0.69444, 0, 0, 0.67223],
    926: [0, 0.69444, 0, 0, 0.73334],
    928: [0, 0.69444, 0, 0, 0.79445],
    931: [0, 0.69444, 0, 0, 0.79445],
    933: [0, 0.69444, 0, 0, 0.85556],
    934: [0, 0.69444, 0, 0, 0.79445],
    936: [0, 0.69444, 0, 0, 0.85556],
    937: [0, 0.69444, 0, 0, 0.79445],
    8211: [0, 0.45833, 0.03056, 0, 0.55],
    8212: [0, 0.45833, 0.03056, 0, 1.10001],
    8216: [0, 0.69444, 0, 0, 0.30556],
    8217: [0, 0.69444, 0, 0, 0.30556],
    8220: [0, 0.69444, 0, 0, 0.55834],
    8221: [0, 0.69444, 0, 0, 0.55834]
  },
  "SansSerif-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.05733, 0, 0.31945],
    34: [0, 0.69444, 316e-5, 0, 0.5],
    35: [0.19444, 0.69444, 0.05087, 0, 0.83334],
    36: [0.05556, 0.75, 0.11156, 0, 0.5],
    37: [0.05556, 0.75, 0.03126, 0, 0.83334],
    38: [0, 0.69444, 0.03058, 0, 0.75834],
    39: [0, 0.69444, 0.07816, 0, 0.27778],
    40: [0.25, 0.75, 0.13164, 0, 0.38889],
    41: [0.25, 0.75, 0.02536, 0, 0.38889],
    42: [0, 0.75, 0.11775, 0, 0.5],
    43: [0.08333, 0.58333, 0.02536, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0.01946, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0.13164, 0, 0.5],
    48: [0, 0.65556, 0.11156, 0, 0.5],
    49: [0, 0.65556, 0.11156, 0, 0.5],
    50: [0, 0.65556, 0.11156, 0, 0.5],
    51: [0, 0.65556, 0.11156, 0, 0.5],
    52: [0, 0.65556, 0.11156, 0, 0.5],
    53: [0, 0.65556, 0.11156, 0, 0.5],
    54: [0, 0.65556, 0.11156, 0, 0.5],
    55: [0, 0.65556, 0.11156, 0, 0.5],
    56: [0, 0.65556, 0.11156, 0, 0.5],
    57: [0, 0.65556, 0.11156, 0, 0.5],
    58: [0, 0.44444, 0.02502, 0, 0.27778],
    59: [0.125, 0.44444, 0.02502, 0, 0.27778],
    61: [-0.13, 0.37, 0.05087, 0, 0.77778],
    63: [0, 0.69444, 0.11809, 0, 0.47222],
    64: [0, 0.69444, 0.07555, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0.08293, 0, 0.66667],
    67: [0, 0.69444, 0.11983, 0, 0.63889],
    68: [0, 0.69444, 0.07555, 0, 0.72223],
    69: [0, 0.69444, 0.11983, 0, 0.59722],
    70: [0, 0.69444, 0.13372, 0, 0.56945],
    71: [0, 0.69444, 0.11983, 0, 0.66667],
    72: [0, 0.69444, 0.08094, 0, 0.70834],
    73: [0, 0.69444, 0.13372, 0, 0.27778],
    74: [0, 0.69444, 0.08094, 0, 0.47222],
    75: [0, 0.69444, 0.11983, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0.08094, 0, 0.875],
    78: [0, 0.69444, 0.08094, 0, 0.70834],
    79: [0, 0.69444, 0.07555, 0, 0.73611],
    80: [0, 0.69444, 0.08293, 0, 0.63889],
    81: [0.125, 0.69444, 0.07555, 0, 0.73611],
    82: [0, 0.69444, 0.08293, 0, 0.64584],
    83: [0, 0.69444, 0.09205, 0, 0.55556],
    84: [0, 0.69444, 0.13372, 0, 0.68056],
    85: [0, 0.69444, 0.08094, 0, 0.6875],
    86: [0, 0.69444, 0.1615, 0, 0.66667],
    87: [0, 0.69444, 0.1615, 0, 0.94445],
    88: [0, 0.69444, 0.13372, 0, 0.66667],
    89: [0, 0.69444, 0.17261, 0, 0.66667],
    90: [0, 0.69444, 0.11983, 0, 0.61111],
    91: [0.25, 0.75, 0.15942, 0, 0.28889],
    93: [0.25, 0.75, 0.08719, 0, 0.28889],
    94: [0, 0.69444, 0.0799, 0, 0.5],
    95: [0.35, 0.09444, 0.08616, 0, 0.5],
    97: [0, 0.44444, 981e-5, 0, 0.48056],
    98: [0, 0.69444, 0.03057, 0, 0.51667],
    99: [0, 0.44444, 0.08336, 0, 0.44445],
    100: [0, 0.69444, 0.09483, 0, 0.51667],
    101: [0, 0.44444, 0.06778, 0, 0.44445],
    102: [0, 0.69444, 0.21705, 0, 0.30556],
    103: [0.19444, 0.44444, 0.10836, 0, 0.5],
    104: [0, 0.69444, 0.01778, 0, 0.51667],
    105: [0, 0.67937, 0.09718, 0, 0.23889],
    106: [0.19444, 0.67937, 0.09162, 0, 0.26667],
    107: [0, 0.69444, 0.08336, 0, 0.48889],
    108: [0, 0.69444, 0.09483, 0, 0.23889],
    109: [0, 0.44444, 0.01778, 0, 0.79445],
    110: [0, 0.44444, 0.01778, 0, 0.51667],
    111: [0, 0.44444, 0.06613, 0, 0.5],
    112: [0.19444, 0.44444, 0.0389, 0, 0.51667],
    113: [0.19444, 0.44444, 0.04169, 0, 0.51667],
    114: [0, 0.44444, 0.10836, 0, 0.34167],
    115: [0, 0.44444, 0.0778, 0, 0.38333],
    116: [0, 0.57143, 0.07225, 0, 0.36111],
    117: [0, 0.44444, 0.04169, 0, 0.51667],
    118: [0, 0.44444, 0.10836, 0, 0.46111],
    119: [0, 0.44444, 0.10836, 0, 0.68334],
    120: [0, 0.44444, 0.09169, 0, 0.46111],
    121: [0.19444, 0.44444, 0.10836, 0, 0.46111],
    122: [0, 0.44444, 0.08752, 0, 0.43472],
    126: [0.35, 0.32659, 0.08826, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0.06385, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.73752],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0.04169, 0, 0.23889],
    567: [0.19444, 0.44444, 0.04169, 0, 0.26667],
    710: [0, 0.69444, 0.0799, 0, 0.5],
    711: [0, 0.63194, 0.08432, 0, 0.5],
    713: [0, 0.60889, 0.08776, 0, 0.5],
    714: [0, 0.69444, 0.09205, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0.09483, 0, 0.5],
    729: [0, 0.67937, 0.07774, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.73752],
    732: [0, 0.67659, 0.08826, 0, 0.5],
    733: [0, 0.69444, 0.09205, 0, 0.5],
    915: [0, 0.69444, 0.13372, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0.07555, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0.12816, 0, 0.66667],
    928: [0, 0.69444, 0.08094, 0, 0.70834],
    931: [0, 0.69444, 0.11983, 0, 0.72222],
    933: [0, 0.69444, 0.09031, 0, 0.77778],
    934: [0, 0.69444, 0.04603, 0, 0.72222],
    936: [0, 0.69444, 0.09031, 0, 0.77778],
    937: [0, 0.69444, 0.08293, 0, 0.72222],
    8211: [0, 0.44444, 0.08616, 0, 0.5],
    8212: [0, 0.44444, 0.08616, 0, 1],
    8216: [0, 0.69444, 0.07816, 0, 0.27778],
    8217: [0, 0.69444, 0.07816, 0, 0.27778],
    8220: [0, 0.69444, 0.14205, 0, 0.5],
    8221: [0, 0.69444, 316e-5, 0, 0.5]
  },
  "SansSerif-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.31945],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.75834],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.65556, 0, 0, 0.5],
    49: [0, 0.65556, 0, 0, 0.5],
    50: [0, 0.65556, 0, 0, 0.5],
    51: [0, 0.65556, 0, 0, 0.5],
    52: [0, 0.65556, 0, 0, 0.5],
    53: [0, 0.65556, 0, 0, 0.5],
    54: [0, 0.65556, 0, 0, 0.5],
    55: [0, 0.65556, 0, 0, 0.5],
    56: [0, 0.65556, 0, 0, 0.5],
    57: [0, 0.65556, 0, 0, 0.5],
    58: [0, 0.44444, 0, 0, 0.27778],
    59: [0.125, 0.44444, 0, 0, 0.27778],
    61: [-0.13, 0.37, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0, 0, 0.66667],
    67: [0, 0.69444, 0, 0, 0.63889],
    68: [0, 0.69444, 0, 0, 0.72223],
    69: [0, 0.69444, 0, 0, 0.59722],
    70: [0, 0.69444, 0, 0, 0.56945],
    71: [0, 0.69444, 0, 0, 0.66667],
    72: [0, 0.69444, 0, 0, 0.70834],
    73: [0, 0.69444, 0, 0, 0.27778],
    74: [0, 0.69444, 0, 0, 0.47222],
    75: [0, 0.69444, 0, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0, 0, 0.875],
    78: [0, 0.69444, 0, 0, 0.70834],
    79: [0, 0.69444, 0, 0, 0.73611],
    80: [0, 0.69444, 0, 0, 0.63889],
    81: [0.125, 0.69444, 0, 0, 0.73611],
    82: [0, 0.69444, 0, 0, 0.64584],
    83: [0, 0.69444, 0, 0, 0.55556],
    84: [0, 0.69444, 0, 0, 0.68056],
    85: [0, 0.69444, 0, 0, 0.6875],
    86: [0, 0.69444, 0.01389, 0, 0.66667],
    87: [0, 0.69444, 0.01389, 0, 0.94445],
    88: [0, 0.69444, 0, 0, 0.66667],
    89: [0, 0.69444, 0.025, 0, 0.66667],
    90: [0, 0.69444, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.28889],
    93: [0.25, 0.75, 0, 0, 0.28889],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.35, 0.09444, 0.02778, 0, 0.5],
    97: [0, 0.44444, 0, 0, 0.48056],
    98: [0, 0.69444, 0, 0, 0.51667],
    99: [0, 0.44444, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.51667],
    101: [0, 0.44444, 0, 0, 0.44445],
    102: [0, 0.69444, 0.06944, 0, 0.30556],
    103: [0.19444, 0.44444, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.51667],
    105: [0, 0.67937, 0, 0, 0.23889],
    106: [0.19444, 0.67937, 0, 0, 0.26667],
    107: [0, 0.69444, 0, 0, 0.48889],
    108: [0, 0.69444, 0, 0, 0.23889],
    109: [0, 0.44444, 0, 0, 0.79445],
    110: [0, 0.44444, 0, 0, 0.51667],
    111: [0, 0.44444, 0, 0, 0.5],
    112: [0.19444, 0.44444, 0, 0, 0.51667],
    113: [0.19444, 0.44444, 0, 0, 0.51667],
    114: [0, 0.44444, 0.01389, 0, 0.34167],
    115: [0, 0.44444, 0, 0, 0.38333],
    116: [0, 0.57143, 0, 0, 0.36111],
    117: [0, 0.44444, 0, 0, 0.51667],
    118: [0, 0.44444, 0.01389, 0, 0.46111],
    119: [0, 0.44444, 0.01389, 0, 0.68334],
    120: [0, 0.44444, 0, 0, 0.46111],
    121: [0.19444, 0.44444, 0.01389, 0, 0.46111],
    122: [0, 0.44444, 0, 0, 0.43472],
    126: [0.35, 0.32659, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.66667],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0, 0, 0.23889],
    567: [0.19444, 0.44444, 0, 0, 0.26667],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.63194, 0, 0, 0.5],
    713: [0, 0.60889, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.67937, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.66667],
    732: [0, 0.67659, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.69444, 0, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0, 0, 0.66667],
    928: [0, 0.69444, 0, 0, 0.70834],
    931: [0, 0.69444, 0, 0, 0.72222],
    933: [0, 0.69444, 0, 0, 0.77778],
    934: [0, 0.69444, 0, 0, 0.72222],
    936: [0, 0.69444, 0, 0, 0.77778],
    937: [0, 0.69444, 0, 0, 0.72222],
    8211: [0, 0.44444, 0.02778, 0, 0.5],
    8212: [0, 0.44444, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5]
  },
  "Script-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.7, 0.22925, 0, 0.80253],
    66: [0, 0.7, 0.04087, 0, 0.90757],
    67: [0, 0.7, 0.1689, 0, 0.66619],
    68: [0, 0.7, 0.09371, 0, 0.77443],
    69: [0, 0.7, 0.18583, 0, 0.56162],
    70: [0, 0.7, 0.13634, 0, 0.89544],
    71: [0, 0.7, 0.17322, 0, 0.60961],
    72: [0, 0.7, 0.29694, 0, 0.96919],
    73: [0, 0.7, 0.19189, 0, 0.80907],
    74: [0.27778, 0.7, 0.19189, 0, 1.05159],
    75: [0, 0.7, 0.31259, 0, 0.91364],
    76: [0, 0.7, 0.19189, 0, 0.87373],
    77: [0, 0.7, 0.15981, 0, 1.08031],
    78: [0, 0.7, 0.3525, 0, 0.9015],
    79: [0, 0.7, 0.08078, 0, 0.73787],
    80: [0, 0.7, 0.08078, 0, 1.01262],
    81: [0, 0.7, 0.03305, 0, 0.88282],
    82: [0, 0.7, 0.06259, 0, 0.85],
    83: [0, 0.7, 0.19189, 0, 0.86767],
    84: [0, 0.7, 0.29087, 0, 0.74697],
    85: [0, 0.7, 0.25815, 0, 0.79996],
    86: [0, 0.7, 0.27523, 0, 0.62204],
    87: [0, 0.7, 0.27523, 0, 0.80532],
    88: [0, 0.7, 0.26006, 0, 0.94445],
    89: [0, 0.7, 0.2939, 0, 0.70961],
    90: [0, 0.7, 0.24037, 0, 0.8212],
    160: [0, 0, 0, 0, 0.25]
  },
  "Size1-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.35001, 0.85, 0, 0, 0.45834],
    41: [0.35001, 0.85, 0, 0, 0.45834],
    47: [0.35001, 0.85, 0, 0, 0.57778],
    91: [0.35001, 0.85, 0, 0, 0.41667],
    92: [0.35001, 0.85, 0, 0, 0.57778],
    93: [0.35001, 0.85, 0, 0, 0.41667],
    123: [0.35001, 0.85, 0, 0, 0.58334],
    125: [0.35001, 0.85, 0, 0, 0.58334],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.72222, 0, 0, 0.55556],
    732: [0, 0.72222, 0, 0, 0.55556],
    770: [0, 0.72222, 0, 0, 0.55556],
    771: [0, 0.72222, 0, 0, 0.55556],
    8214: [-99e-5, 0.601, 0, 0, 0.77778],
    8593: [1e-5, 0.6, 0, 0, 0.66667],
    8595: [1e-5, 0.6, 0, 0, 0.66667],
    8657: [1e-5, 0.6, 0, 0, 0.77778],
    8659: [1e-5, 0.6, 0, 0, 0.77778],
    8719: [0.25001, 0.75, 0, 0, 0.94445],
    8720: [0.25001, 0.75, 0, 0, 0.94445],
    8721: [0.25001, 0.75, 0, 0, 1.05556],
    8730: [0.35001, 0.85, 0, 0, 1],
    8739: [-599e-5, 0.606, 0, 0, 0.33333],
    8741: [-599e-5, 0.606, 0, 0, 0.55556],
    8747: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8748: [0.306, 0.805, 0.19445, 0, 0.47222],
    8749: [0.306, 0.805, 0.19445, 0, 0.47222],
    8750: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8896: [0.25001, 0.75, 0, 0, 0.83334],
    8897: [0.25001, 0.75, 0, 0, 0.83334],
    8898: [0.25001, 0.75, 0, 0, 0.83334],
    8899: [0.25001, 0.75, 0, 0, 0.83334],
    8968: [0.35001, 0.85, 0, 0, 0.47222],
    8969: [0.35001, 0.85, 0, 0, 0.47222],
    8970: [0.35001, 0.85, 0, 0, 0.47222],
    8971: [0.35001, 0.85, 0, 0, 0.47222],
    9168: [-99e-5, 0.601, 0, 0, 0.66667],
    10216: [0.35001, 0.85, 0, 0, 0.47222],
    10217: [0.35001, 0.85, 0, 0, 0.47222],
    10752: [0.25001, 0.75, 0, 0, 1.11111],
    10753: [0.25001, 0.75, 0, 0, 1.11111],
    10754: [0.25001, 0.75, 0, 0, 1.11111],
    10756: [0.25001, 0.75, 0, 0, 0.83334],
    10758: [0.25001, 0.75, 0, 0, 0.83334]
  },
  "Size2-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.65002, 1.15, 0, 0, 0.59722],
    41: [0.65002, 1.15, 0, 0, 0.59722],
    47: [0.65002, 1.15, 0, 0, 0.81111],
    91: [0.65002, 1.15, 0, 0, 0.47222],
    92: [0.65002, 1.15, 0, 0, 0.81111],
    93: [0.65002, 1.15, 0, 0, 0.47222],
    123: [0.65002, 1.15, 0, 0, 0.66667],
    125: [0.65002, 1.15, 0, 0, 0.66667],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1],
    732: [0, 0.75, 0, 0, 1],
    770: [0, 0.75, 0, 0, 1],
    771: [0, 0.75, 0, 0, 1],
    8719: [0.55001, 1.05, 0, 0, 1.27778],
    8720: [0.55001, 1.05, 0, 0, 1.27778],
    8721: [0.55001, 1.05, 0, 0, 1.44445],
    8730: [0.65002, 1.15, 0, 0, 1],
    8747: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8748: [0.862, 1.36, 0.44445, 0, 0.55556],
    8749: [0.862, 1.36, 0.44445, 0, 0.55556],
    8750: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8896: [0.55001, 1.05, 0, 0, 1.11111],
    8897: [0.55001, 1.05, 0, 0, 1.11111],
    8898: [0.55001, 1.05, 0, 0, 1.11111],
    8899: [0.55001, 1.05, 0, 0, 1.11111],
    8968: [0.65002, 1.15, 0, 0, 0.52778],
    8969: [0.65002, 1.15, 0, 0, 0.52778],
    8970: [0.65002, 1.15, 0, 0, 0.52778],
    8971: [0.65002, 1.15, 0, 0, 0.52778],
    10216: [0.65002, 1.15, 0, 0, 0.61111],
    10217: [0.65002, 1.15, 0, 0, 0.61111],
    10752: [0.55001, 1.05, 0, 0, 1.51112],
    10753: [0.55001, 1.05, 0, 0, 1.51112],
    10754: [0.55001, 1.05, 0, 0, 1.51112],
    10756: [0.55001, 1.05, 0, 0, 1.11111],
    10758: [0.55001, 1.05, 0, 0, 1.11111]
  },
  "Size3-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.95003, 1.45, 0, 0, 0.73611],
    41: [0.95003, 1.45, 0, 0, 0.73611],
    47: [0.95003, 1.45, 0, 0, 1.04445],
    91: [0.95003, 1.45, 0, 0, 0.52778],
    92: [0.95003, 1.45, 0, 0, 1.04445],
    93: [0.95003, 1.45, 0, 0, 0.52778],
    123: [0.95003, 1.45, 0, 0, 0.75],
    125: [0.95003, 1.45, 0, 0, 0.75],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1.44445],
    732: [0, 0.75, 0, 0, 1.44445],
    770: [0, 0.75, 0, 0, 1.44445],
    771: [0, 0.75, 0, 0, 1.44445],
    8730: [0.95003, 1.45, 0, 0, 1],
    8968: [0.95003, 1.45, 0, 0, 0.58334],
    8969: [0.95003, 1.45, 0, 0, 0.58334],
    8970: [0.95003, 1.45, 0, 0, 0.58334],
    8971: [0.95003, 1.45, 0, 0, 0.58334],
    10216: [0.95003, 1.45, 0, 0, 0.75],
    10217: [0.95003, 1.45, 0, 0, 0.75]
  },
  "Size4-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [1.25003, 1.75, 0, 0, 0.79167],
    41: [1.25003, 1.75, 0, 0, 0.79167],
    47: [1.25003, 1.75, 0, 0, 1.27778],
    91: [1.25003, 1.75, 0, 0, 0.58334],
    92: [1.25003, 1.75, 0, 0, 1.27778],
    93: [1.25003, 1.75, 0, 0, 0.58334],
    123: [1.25003, 1.75, 0, 0, 0.80556],
    125: [1.25003, 1.75, 0, 0, 0.80556],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.825, 0, 0, 1.8889],
    732: [0, 0.825, 0, 0, 1.8889],
    770: [0, 0.825, 0, 0, 1.8889],
    771: [0, 0.825, 0, 0, 1.8889],
    8730: [1.25003, 1.75, 0, 0, 1],
    8968: [1.25003, 1.75, 0, 0, 0.63889],
    8969: [1.25003, 1.75, 0, 0, 0.63889],
    8970: [1.25003, 1.75, 0, 0, 0.63889],
    8971: [1.25003, 1.75, 0, 0, 0.63889],
    9115: [0.64502, 1.155, 0, 0, 0.875],
    9116: [1e-5, 0.6, 0, 0, 0.875],
    9117: [0.64502, 1.155, 0, 0, 0.875],
    9118: [0.64502, 1.155, 0, 0, 0.875],
    9119: [1e-5, 0.6, 0, 0, 0.875],
    9120: [0.64502, 1.155, 0, 0, 0.875],
    9121: [0.64502, 1.155, 0, 0, 0.66667],
    9122: [-99e-5, 0.601, 0, 0, 0.66667],
    9123: [0.64502, 1.155, 0, 0, 0.66667],
    9124: [0.64502, 1.155, 0, 0, 0.66667],
    9125: [-99e-5, 0.601, 0, 0, 0.66667],
    9126: [0.64502, 1.155, 0, 0, 0.66667],
    9127: [1e-5, 0.9, 0, 0, 0.88889],
    9128: [0.65002, 1.15, 0, 0, 0.88889],
    9129: [0.90001, 0, 0, 0, 0.88889],
    9130: [0, 0.3, 0, 0, 0.88889],
    9131: [1e-5, 0.9, 0, 0, 0.88889],
    9132: [0.65002, 1.15, 0, 0, 0.88889],
    9133: [0.90001, 0, 0, 0, 0.88889],
    9143: [0.88502, 0.915, 0, 0, 1.05556],
    10216: [1.25003, 1.75, 0, 0, 0.80556],
    10217: [1.25003, 1.75, 0, 0, 0.80556],
    57344: [-499e-5, 0.605, 0, 0, 1.05556],
    57345: [-499e-5, 0.605, 0, 0, 1.05556],
    57680: [0, 0.12, 0, 0, 0.45],
    57681: [0, 0.12, 0, 0, 0.45],
    57682: [0, 0.12, 0, 0, 0.45],
    57683: [0, 0.12, 0, 0, 0.45]
  },
  "Typewriter-Regular": {
    32: [0, 0, 0, 0, 0.525],
    33: [0, 0.61111, 0, 0, 0.525],
    34: [0, 0.61111, 0, 0, 0.525],
    35: [0, 0.61111, 0, 0, 0.525],
    36: [0.08333, 0.69444, 0, 0, 0.525],
    37: [0.08333, 0.69444, 0, 0, 0.525],
    38: [0, 0.61111, 0, 0, 0.525],
    39: [0, 0.61111, 0, 0, 0.525],
    40: [0.08333, 0.69444, 0, 0, 0.525],
    41: [0.08333, 0.69444, 0, 0, 0.525],
    42: [0, 0.52083, 0, 0, 0.525],
    43: [-0.08056, 0.53055, 0, 0, 0.525],
    44: [0.13889, 0.125, 0, 0, 0.525],
    45: [-0.08056, 0.53055, 0, 0, 0.525],
    46: [0, 0.125, 0, 0, 0.525],
    47: [0.08333, 0.69444, 0, 0, 0.525],
    48: [0, 0.61111, 0, 0, 0.525],
    49: [0, 0.61111, 0, 0, 0.525],
    50: [0, 0.61111, 0, 0, 0.525],
    51: [0, 0.61111, 0, 0, 0.525],
    52: [0, 0.61111, 0, 0, 0.525],
    53: [0, 0.61111, 0, 0, 0.525],
    54: [0, 0.61111, 0, 0, 0.525],
    55: [0, 0.61111, 0, 0, 0.525],
    56: [0, 0.61111, 0, 0, 0.525],
    57: [0, 0.61111, 0, 0, 0.525],
    58: [0, 0.43056, 0, 0, 0.525],
    59: [0.13889, 0.43056, 0, 0, 0.525],
    60: [-0.05556, 0.55556, 0, 0, 0.525],
    61: [-0.19549, 0.41562, 0, 0, 0.525],
    62: [-0.05556, 0.55556, 0, 0, 0.525],
    63: [0, 0.61111, 0, 0, 0.525],
    64: [0, 0.61111, 0, 0, 0.525],
    65: [0, 0.61111, 0, 0, 0.525],
    66: [0, 0.61111, 0, 0, 0.525],
    67: [0, 0.61111, 0, 0, 0.525],
    68: [0, 0.61111, 0, 0, 0.525],
    69: [0, 0.61111, 0, 0, 0.525],
    70: [0, 0.61111, 0, 0, 0.525],
    71: [0, 0.61111, 0, 0, 0.525],
    72: [0, 0.61111, 0, 0, 0.525],
    73: [0, 0.61111, 0, 0, 0.525],
    74: [0, 0.61111, 0, 0, 0.525],
    75: [0, 0.61111, 0, 0, 0.525],
    76: [0, 0.61111, 0, 0, 0.525],
    77: [0, 0.61111, 0, 0, 0.525],
    78: [0, 0.61111, 0, 0, 0.525],
    79: [0, 0.61111, 0, 0, 0.525],
    80: [0, 0.61111, 0, 0, 0.525],
    81: [0.13889, 0.61111, 0, 0, 0.525],
    82: [0, 0.61111, 0, 0, 0.525],
    83: [0, 0.61111, 0, 0, 0.525],
    84: [0, 0.61111, 0, 0, 0.525],
    85: [0, 0.61111, 0, 0, 0.525],
    86: [0, 0.61111, 0, 0, 0.525],
    87: [0, 0.61111, 0, 0, 0.525],
    88: [0, 0.61111, 0, 0, 0.525],
    89: [0, 0.61111, 0, 0, 0.525],
    90: [0, 0.61111, 0, 0, 0.525],
    91: [0.08333, 0.69444, 0, 0, 0.525],
    92: [0.08333, 0.69444, 0, 0, 0.525],
    93: [0.08333, 0.69444, 0, 0, 0.525],
    94: [0, 0.61111, 0, 0, 0.525],
    95: [0.09514, 0, 0, 0, 0.525],
    96: [0, 0.61111, 0, 0, 0.525],
    97: [0, 0.43056, 0, 0, 0.525],
    98: [0, 0.61111, 0, 0, 0.525],
    99: [0, 0.43056, 0, 0, 0.525],
    100: [0, 0.61111, 0, 0, 0.525],
    101: [0, 0.43056, 0, 0, 0.525],
    102: [0, 0.61111, 0, 0, 0.525],
    103: [0.22222, 0.43056, 0, 0, 0.525],
    104: [0, 0.61111, 0, 0, 0.525],
    105: [0, 0.61111, 0, 0, 0.525],
    106: [0.22222, 0.61111, 0, 0, 0.525],
    107: [0, 0.61111, 0, 0, 0.525],
    108: [0, 0.61111, 0, 0, 0.525],
    109: [0, 0.43056, 0, 0, 0.525],
    110: [0, 0.43056, 0, 0, 0.525],
    111: [0, 0.43056, 0, 0, 0.525],
    112: [0.22222, 0.43056, 0, 0, 0.525],
    113: [0.22222, 0.43056, 0, 0, 0.525],
    114: [0, 0.43056, 0, 0, 0.525],
    115: [0, 0.43056, 0, 0, 0.525],
    116: [0, 0.55358, 0, 0, 0.525],
    117: [0, 0.43056, 0, 0, 0.525],
    118: [0, 0.43056, 0, 0, 0.525],
    119: [0, 0.43056, 0, 0, 0.525],
    120: [0, 0.43056, 0, 0, 0.525],
    121: [0.22222, 0.43056, 0, 0, 0.525],
    122: [0, 0.43056, 0, 0, 0.525],
    123: [0.08333, 0.69444, 0, 0, 0.525],
    124: [0.08333, 0.69444, 0, 0, 0.525],
    125: [0.08333, 0.69444, 0, 0, 0.525],
    126: [0, 0.61111, 0, 0, 0.525],
    127: [0, 0.61111, 0, 0, 0.525],
    160: [0, 0, 0, 0, 0.525],
    176: [0, 0.61111, 0, 0, 0.525],
    184: [0.19445, 0, 0, 0, 0.525],
    305: [0, 0.43056, 0, 0, 0.525],
    567: [0.22222, 0.43056, 0, 0, 0.525],
    711: [0, 0.56597, 0, 0, 0.525],
    713: [0, 0.56555, 0, 0, 0.525],
    714: [0, 0.61111, 0, 0, 0.525],
    715: [0, 0.61111, 0, 0, 0.525],
    728: [0, 0.61111, 0, 0, 0.525],
    730: [0, 0.61111, 0, 0, 0.525],
    770: [0, 0.61111, 0, 0, 0.525],
    771: [0, 0.61111, 0, 0, 0.525],
    776: [0, 0.61111, 0, 0, 0.525],
    915: [0, 0.61111, 0, 0, 0.525],
    916: [0, 0.61111, 0, 0, 0.525],
    920: [0, 0.61111, 0, 0, 0.525],
    923: [0, 0.61111, 0, 0, 0.525],
    926: [0, 0.61111, 0, 0, 0.525],
    928: [0, 0.61111, 0, 0, 0.525],
    931: [0, 0.61111, 0, 0, 0.525],
    933: [0, 0.61111, 0, 0, 0.525],
    934: [0, 0.61111, 0, 0, 0.525],
    936: [0, 0.61111, 0, 0, 0.525],
    937: [0, 0.61111, 0, 0, 0.525],
    8216: [0, 0.61111, 0, 0, 0.525],
    8217: [0, 0.61111, 0, 0, 0.525],
    8242: [0, 0.61111, 0, 0, 0.525],
    9251: [0.11111, 0.21944, 0, 0, 0.525]
  }
}, m0 = {
  slant: [0.25, 0.25, 0.25],
  // sigma1
  space: [0, 0, 0],
  // sigma2
  stretch: [0, 0, 0],
  // sigma3
  shrink: [0, 0, 0],
  // sigma4
  xHeight: [0.431, 0.431, 0.431],
  // sigma5
  quad: [1, 1.171, 1.472],
  // sigma6
  extraSpace: [0, 0, 0],
  // sigma7
  num1: [0.677, 0.732, 0.925],
  // sigma8
  num2: [0.394, 0.384, 0.387],
  // sigma9
  num3: [0.444, 0.471, 0.504],
  // sigma10
  denom1: [0.686, 0.752, 1.025],
  // sigma11
  denom2: [0.345, 0.344, 0.532],
  // sigma12
  sup1: [0.413, 0.503, 0.504],
  // sigma13
  sup2: [0.363, 0.431, 0.404],
  // sigma14
  sup3: [0.289, 0.286, 0.294],
  // sigma15
  sub1: [0.15, 0.143, 0.2],
  // sigma16
  sub2: [0.247, 0.286, 0.4],
  // sigma17
  supDrop: [0.386, 0.353, 0.494],
  // sigma18
  subDrop: [0.05, 0.071, 0.1],
  // sigma19
  delim1: [2.39, 1.7, 1.98],
  // sigma20
  delim2: [1.01, 1.157, 1.42],
  // sigma21
  axisHeight: [0.25, 0.25, 0.25],
  // sigma22
  // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
  // they correspond to the font parameters of the extension fonts (family 3).
  // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
  // match cmex7, we'd use cmex7.tfm values for script and scriptscript
  // values.
  defaultRuleThickness: [0.04, 0.049, 0.049],
  // xi8; cmex7: 0.049
  bigOpSpacing1: [0.111, 0.111, 0.111],
  // xi9
  bigOpSpacing2: [0.166, 0.166, 0.166],
  // xi10
  bigOpSpacing3: [0.2, 0.2, 0.2],
  // xi11
  bigOpSpacing4: [0.6, 0.611, 0.611],
  // xi12; cmex7: 0.611
  bigOpSpacing5: [0.1, 0.143, 0.143],
  // xi13; cmex7: 0.143
  // The \sqrt rule width is taken from the height of the surd character.
  // Since we use the same font at all sizes, this thickness doesn't scale.
  sqrtRuleThickness: [0.04, 0.04, 0.04],
  // This value determines how large a pt is, for metrics which are defined
  // in terms of pts.
  // This value is also used in katex.scss; if you change it make sure the
  // values match.
  ptPerEm: [10, 10, 10],
  // The space between adjacent `|` columns in an array definition. From
  // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
  doubleRuleSep: [0.2, 0.2, 0.2],
  // The width of separator lines in {array} environments. From
  // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
  arrayRuleWidth: [0.04, 0.04, 0.04],
  // Two values from LaTeX source2e:
  fboxsep: [0.3, 0.3, 0.3],
  //        3 pt / ptPerEm
  fboxrule: [0.04, 0.04, 0.04]
  // 0.4 pt / ptPerEm
}, el = {
  // Latin-1
  Å: "A",
  Ð: "D",
  Þ: "o",
  å: "a",
  ð: "d",
  þ: "o",
  // Cyrillic
  А: "A",
  Б: "B",
  В: "B",
  Г: "F",
  Д: "A",
  Е: "E",
  Ж: "K",
  З: "3",
  И: "N",
  Й: "N",
  К: "K",
  Л: "N",
  М: "M",
  Н: "H",
  О: "O",
  П: "N",
  Р: "P",
  С: "C",
  Т: "T",
  У: "y",
  Ф: "O",
  Х: "X",
  Ц: "U",
  Ч: "h",
  Ш: "W",
  Щ: "W",
  Ъ: "B",
  Ы: "X",
  Ь: "B",
  Э: "3",
  Ю: "X",
  Я: "R",
  а: "a",
  б: "b",
  в: "a",
  г: "r",
  д: "y",
  е: "e",
  ж: "m",
  з: "e",
  и: "n",
  й: "n",
  к: "n",
  л: "n",
  м: "m",
  н: "n",
  о: "o",
  п: "n",
  р: "p",
  с: "c",
  т: "o",
  у: "y",
  ф: "b",
  х: "x",
  ц: "n",
  ч: "n",
  ш: "w",
  щ: "w",
  ъ: "a",
  ы: "m",
  ь: "a",
  э: "e",
  ю: "m",
  я: "r"
};
function rc(e, t) {
  wt[e] = t;
}
function fr(e, t, n) {
  if (!wt[t])
    throw new Error("Font metrics not found for font: " + t + ".");
  var a = e.charCodeAt(0), r = wt[t][a];
  if (!r && e[0] in el && (a = el[e[0]].charCodeAt(0), r = wt[t][a]), !r && n === "text" && Vi(a) && (r = wt[t][77]), r)
    return {
      depth: r[0],
      height: r[1],
      italic: r[2],
      skew: r[3],
      width: r[4]
    };
}
var fa = {};
function lc(e) {
  var t;
  if (e >= 5 ? t = 0 : e >= 3 ? t = 1 : t = 2, !fa[t]) {
    var n = fa[t] = {
      cssEmPerMu: m0.quad[t] / 18
    };
    for (var a in m0)
      m0.hasOwnProperty(a) && (n[a] = m0[a][t]);
  }
  return fa[t];
}
var ic = [
  // Each element contains [textsize, scriptsize, scriptscriptsize].
  // The size mappings are taken from TeX with \normalsize=10pt.
  [1, 1, 1],
  // size1: [5, 5, 5]              \tiny
  [2, 1, 1],
  // size2: [6, 5, 5]
  [3, 1, 1],
  // size3: [7, 5, 5]              \scriptsize
  [4, 2, 1],
  // size4: [8, 6, 5]              \footnotesize
  [5, 2, 1],
  // size5: [9, 6, 5]              \small
  [6, 3, 1],
  // size6: [10, 7, 5]             \normalsize
  [7, 4, 2],
  // size7: [12, 8, 6]             \large
  [8, 6, 3],
  // size8: [14.4, 10, 7]          \Large
  [9, 7, 6],
  // size9: [17.28, 12, 10]        \LARGE
  [10, 8, 7],
  // size10: [20.74, 14.4, 12]     \huge
  [11, 10, 9]
  // size11: [24.88, 20.74, 17.28] \HUGE
], tl = [
  // fontMetrics.js:getGlobalMetrics also uses size indexes, so if
  // you change size indexes, change that function.
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
  1.2,
  1.44,
  1.728,
  2.074,
  2.488
], nl = function(e, t) {
  return t.size < 2 ? e : ic[e - 1][t.size - 1];
};
class Ot {
  // A font family applies to a group of fonts (i.e. SansSerif), while a font
  // represents a specific font (i.e. SansSerif Bold).
  // See: https://tex.stackexchange.com/questions/22350/difference-between-textrm-and-mathrm
  /**
   * The base size index.
   */
  constructor(t) {
    this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = t.style, this.color = t.color, this.size = t.size || Ot.BASESIZE, this.textSize = t.textSize || this.size, this.phantom = !!t.phantom, this.font = t.font || "", this.fontFamily = t.fontFamily || "", this.fontWeight = t.fontWeight || "", this.fontShape = t.fontShape || "", this.sizeMultiplier = tl[this.size - 1], this.maxSize = t.maxSize, this.minRuleThickness = t.minRuleThickness, this._fontMetrics = void 0;
  }
  /**
   * Returns a new options object with the same properties as "this".  Properties
   * from "extension" will be copied to the new options object.
   */
  extend(t) {
    var n = {
      style: this.style,
      size: this.size,
      textSize: this.textSize,
      color: this.color,
      phantom: this.phantom,
      font: this.font,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontShape: this.fontShape,
      maxSize: this.maxSize,
      minRuleThickness: this.minRuleThickness
    };
    for (var a in t)
      t.hasOwnProperty(a) && (n[a] = t[a]);
    return new Ot(n);
  }
  /**
   * Return an options object with the given style. If `this.style === style`,
   * returns `this`.
   */
  havingStyle(t) {
    return this.style === t ? this : this.extend({
      style: t,
      size: nl(this.textSize, t)
    });
  }
  /**
   * Return an options object with a cramped version of the current style. If
   * the current style is cramped, returns `this`.
   */
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  /**
   * Return an options object with the given size and in at least `\textstyle`.
   * Returns `this` if appropriate.
   */
  havingSize(t) {
    return this.size === t && this.textSize === t ? this : this.extend({
      style: this.style.text(),
      size: t,
      textSize: t,
      sizeMultiplier: tl[t - 1]
    });
  }
  /**
   * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
   * changes to at least `\textstyle`.
   */
  havingBaseStyle(t) {
    t = t || this.style.text();
    var n = nl(Ot.BASESIZE, t);
    return this.size === n && this.textSize === Ot.BASESIZE && this.style === t ? this : this.extend({
      style: t,
      size: n
    });
  }
  /**
   * Remove the effect of sizing changes such as \Huge.
   * Keep the effect of the current style, such as \scriptstyle.
   */
  havingBaseSizing() {
    var t;
    switch (this.style.id) {
      case 4:
      case 5:
        t = 3;
        break;
      case 6:
      case 7:
        t = 1;
        break;
      default:
        t = 6;
    }
    return this.extend({
      style: this.style.text(),
      size: t
    });
  }
  /**
   * Create a new options object with the given color.
   */
  withColor(t) {
    return this.extend({
      color: t
    });
  }
  /**
   * Create a new options object with "phantom" set to true.
   */
  withPhantom() {
    return this.extend({
      phantom: !0
    });
  }
  /**
   * Creates a new options object with the given math font or old text font.
   * @type {[type]}
   */
  withFont(t) {
    return this.extend({
      font: t
    });
  }
  /**
   * Create a new options objects with the given fontFamily.
   */
  withTextFontFamily(t) {
    return this.extend({
      fontFamily: t,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontWeight(t) {
    return this.extend({
      fontWeight: t,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontShape(t) {
    return this.extend({
      fontShape: t,
      font: ""
    });
  }
  /**
   * Return the CSS sizing classes required to switch from enclosing options
   * `oldOptions` to `this`. Returns an array of classes.
   */
  sizingClasses(t) {
    return t.size !== this.size ? ["sizing", "reset-size" + t.size, "size" + this.size] : [];
  }
  /**
   * Return the CSS sizing classes required to switch to the base size. Like
   * `this.havingSize(BASESIZE).sizingClasses(this)`.
   */
  baseSizingClasses() {
    return this.size !== Ot.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + Ot.BASESIZE] : [];
  }
  /**
   * Return the font metrics for this size.
   */
  fontMetrics() {
    return this._fontMetrics || (this._fontMetrics = lc(this.size)), this._fontMetrics;
  }
  /**
   * Gets the CSS color of the current options object
   */
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
}
Ot.BASESIZE = 6;
var qa = {
  // https://en.wikibooks.org/wiki/LaTeX/Lengths and
  // https://tex.stackexchange.com/a/8263
  pt: 1,
  // TeX point
  mm: 7227 / 2540,
  // millimeter
  cm: 7227 / 254,
  // centimeter
  in: 72.27,
  // inch
  bp: 803 / 800,
  // big (PostScript) points
  pc: 12,
  // pica
  dd: 1238 / 1157,
  // didot
  cc: 14856 / 1157,
  // cicero (12 didot)
  nd: 685 / 642,
  // new didot
  nc: 1370 / 107,
  // new cicero (12 new didot)
  sp: 1 / 65536,
  // scaled point (TeX's internal smallest unit)
  // https://tex.stackexchange.com/a/41371
  px: 803 / 800
  // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX
}, oc = {
  ex: !0,
  em: !0,
  mu: !0
}, Ei = function(e) {
  return typeof e != "string" && (e = e.unit), e in qa || e in oc || e === "ex";
}, Pe = function(e, t) {
  var n;
  if (e.unit in qa)
    n = qa[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
  else if (e.unit === "mu")
    n = t.fontMetrics().cssEmPerMu;
  else {
    var a;
    if (t.style.isTight() ? a = t.havingStyle(t.style.text()) : a = t, e.unit === "ex")
      n = a.fontMetrics().xHeight;
    else if (e.unit === "em")
      n = a.fontMetrics().quad;
    else
      throw new W("Invalid unit: '" + e.unit + "'");
    a !== t && (n *= a.sizeMultiplier / t.sizeMultiplier);
  }
  return Math.min(e.number * n, t.maxSize);
}, K = function(e) {
  return +e.toFixed(4) + "em";
}, Jt = function(e) {
  return e.filter((t) => t).join(" ");
}, Oi = function(e, t, n) {
  if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n || {}, t) {
    t.style.isTight() && this.classes.push("mtight");
    var a = t.getColor();
    a && (this.style.color = a);
  }
}, _i = function(e) {
  var t = document.createElement(e);
  t.className = Jt(this.classes);
  for (var n in this.style)
    this.style.hasOwnProperty(n) && (t.style[n] = this.style[n]);
  for (var a in this.attributes)
    this.attributes.hasOwnProperty(a) && t.setAttribute(a, this.attributes[a]);
  for (var r = 0; r < this.children.length; r++)
    t.appendChild(this.children[r].toNode());
  return t;
}, Li = function(e) {
  var t = "<" + e;
  this.classes.length && (t += ' class="' + ne.escape(Jt(this.classes)) + '"');
  var n = "";
  for (var a in this.style)
    this.style.hasOwnProperty(a) && (n += ne.hyphenate(a) + ":" + this.style[a] + ";");
  n && (t += ' style="' + ne.escape(n) + '"');
  for (var r in this.attributes)
    this.attributes.hasOwnProperty(r) && (t += " " + r + '="' + ne.escape(this.attributes[r]) + '"');
  t += ">";
  for (var l = 0; l < this.children.length; l++)
    t += this.children[l].toMarkup();
  return t += "</" + e + ">", t;
};
class l0 {
  constructor(t, n, a, r) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, Oi.call(this, t, a, r), this.children = n || [];
  }
  /**
   * Sets an arbitrary attribute on the span. Warning: use this wisely. Not
   * all browsers support attributes the same, and having too many custom
   * attributes is probably bad.
   */
  setAttribute(t, n) {
    this.attributes[t] = n;
  }
  hasClass(t) {
    return ne.contains(this.classes, t);
  }
  toNode() {
    return _i.call(this, "span");
  }
  toMarkup() {
    return Li.call(this, "span");
  }
}
class vr {
  constructor(t, n, a, r) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, Oi.call(this, n, r), this.children = a || [], this.setAttribute("href", t);
  }
  setAttribute(t, n) {
    this.attributes[t] = n;
  }
  hasClass(t) {
    return ne.contains(this.classes, t);
  }
  toNode() {
    return _i.call(this, "a");
  }
  toMarkup() {
    return Li.call(this, "a");
  }
}
class sc {
  constructor(t, n, a) {
    this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = n, this.src = t, this.classes = ["mord"], this.style = a;
  }
  hasClass(t) {
    return ne.contains(this.classes, t);
  }
  toNode() {
    var t = document.createElement("img");
    t.src = this.src, t.alt = this.alt, t.className = "mord";
    for (var n in this.style)
      this.style.hasOwnProperty(n) && (t.style[n] = this.style[n]);
    return t;
  }
  toMarkup() {
    var t = '<img src="' + ne.escape(this.src) + '"' + (' alt="' + ne.escape(this.alt) + '"'), n = "";
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (n += ne.hyphenate(a) + ":" + this.style[a] + ";");
    return n && (t += ' style="' + ne.escape(n) + '"'), t += "'/>", t;
  }
}
var uc = {
  î: "ı̂",
  ï: "ı̈",
  í: "ı́",
  // 'ī': '\u0131\u0304', // enable when we add Extended Latin
  ì: "ı̀"
};
class mt {
  constructor(t, n, a, r, l, i, o, s) {
    this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = t, this.height = n || 0, this.depth = a || 0, this.italic = r || 0, this.skew = l || 0, this.width = i || 0, this.classes = o || [], this.style = s || {}, this.maxFontSize = 0;
    var c = Uu(this.text.charCodeAt(0));
    c && this.classes.push(c + "_fallback"), /[îïíì]/.test(this.text) && (this.text = uc[this.text]);
  }
  hasClass(t) {
    return ne.contains(this.classes, t);
  }
  /**
   * Creates a text node or span from a symbol node. Note that a span is only
   * created if it is needed.
   */
  toNode() {
    var t = document.createTextNode(this.text), n = null;
    this.italic > 0 && (n = document.createElement("span"), n.style.marginRight = K(this.italic)), this.classes.length > 0 && (n = n || document.createElement("span"), n.className = Jt(this.classes));
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (n = n || document.createElement("span"), n.style[a] = this.style[a]);
    return n ? (n.appendChild(t), n) : t;
  }
  /**
   * Creates markup for a symbol node.
   */
  toMarkup() {
    var t = !1, n = "<span";
    this.classes.length && (t = !0, n += ' class="', n += ne.escape(Jt(this.classes)), n += '"');
    var a = "";
    this.italic > 0 && (a += "margin-right:" + this.italic + "em;");
    for (var r in this.style)
      this.style.hasOwnProperty(r) && (a += ne.hyphenate(r) + ":" + this.style[r] + ";");
    a && (t = !0, n += ' style="' + ne.escape(a) + '"');
    var l = ne.escape(this.text);
    return t ? (n += ">", n += l, n += "</span>", n) : l;
  }
}
class Nt {
  constructor(t, n) {
    this.children = void 0, this.attributes = void 0, this.children = t || [], this.attributes = n || {};
  }
  toNode() {
    var t = "http://www.w3.org/2000/svg", n = document.createElementNS(t, "svg");
    for (var a in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, a) && n.setAttribute(a, this.attributes[a]);
    for (var r = 0; r < this.children.length; r++)
      n.appendChild(this.children[r].toNode());
    return n;
  }
  toMarkup() {
    var t = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var n in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, n) && (t += " " + n + '="' + ne.escape(this.attributes[n]) + '"');
    t += ">";
    for (var a = 0; a < this.children.length; a++)
      t += this.children[a].toMarkup();
    return t += "</svg>", t;
  }
}
class en {
  constructor(t, n) {
    this.pathName = void 0, this.alternate = void 0, this.pathName = t, this.alternate = n;
  }
  toNode() {
    var t = "http://www.w3.org/2000/svg", n = document.createElementNS(t, "path");
    return this.alternate ? n.setAttribute("d", this.alternate) : n.setAttribute("d", Jr[this.pathName]), n;
  }
  toMarkup() {
    return this.alternate ? '<path d="' + ne.escape(this.alternate) + '"/>' : '<path d="' + ne.escape(Jr[this.pathName]) + '"/>';
  }
}
class Ha {
  constructor(t) {
    this.attributes = void 0, this.attributes = t || {};
  }
  toNode() {
    var t = "http://www.w3.org/2000/svg", n = document.createElementNS(t, "line");
    for (var a in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, a) && n.setAttribute(a, this.attributes[a]);
    return n;
  }
  toMarkup() {
    var t = "<line";
    for (var n in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, n) && (t += " " + n + '="' + ne.escape(this.attributes[n]) + '"');
    return t += "/>", t;
  }
}
function al(e) {
  if (e instanceof mt)
    return e;
  throw new Error("Expected symbolNode but got " + String(e) + ".");
}
function cc(e) {
  if (e instanceof l0)
    return e;
  throw new Error("Expected span<HtmlDomNode> but got " + String(e) + ".");
}
var dc = {
  bin: 1,
  close: 1,
  inner: 1,
  open: 1,
  punct: 1,
  rel: 1
}, mc = {
  "accent-token": 1,
  mathord: 1,
  "op-token": 1,
  spacing: 1,
  textord: 1
}, Me = {
  math: {},
  text: {}
};
function u(e, t, n, a, r, l) {
  Me[e][r] = {
    font: t,
    group: n,
    replace: a
  }, l && a && (Me[e][a] = Me[e][r]);
}
var d = "math", q = "text", h = "main", k = "ams", Ie = "accent-token", Q = "bin", Qe = "close", On = "inner", le = "mathord", Le = "op-token", it = "open", Z0 = "punct", C = "rel", Ht = "spacing", T = "textord";
u(d, h, C, "≡", "\\equiv", !0);
u(d, h, C, "≺", "\\prec", !0);
u(d, h, C, "≻", "\\succ", !0);
u(d, h, C, "∼", "\\sim", !0);
u(d, h, C, "⊥", "\\perp");
u(d, h, C, "⪯", "\\preceq", !0);
u(d, h, C, "⪰", "\\succeq", !0);
u(d, h, C, "≃", "\\simeq", !0);
u(d, h, C, "∣", "\\mid", !0);
u(d, h, C, "≪", "\\ll", !0);
u(d, h, C, "≫", "\\gg", !0);
u(d, h, C, "≍", "\\asymp", !0);
u(d, h, C, "∥", "\\parallel");
u(d, h, C, "⋈", "\\bowtie", !0);
u(d, h, C, "⌣", "\\smile", !0);
u(d, h, C, "⊑", "\\sqsubseteq", !0);
u(d, h, C, "⊒", "\\sqsupseteq", !0);
u(d, h, C, "≐", "\\doteq", !0);
u(d, h, C, "⌢", "\\frown", !0);
u(d, h, C, "∋", "\\ni", !0);
u(d, h, C, "∝", "\\propto", !0);
u(d, h, C, "⊢", "\\vdash", !0);
u(d, h, C, "⊣", "\\dashv", !0);
u(d, h, C, "∋", "\\owns");
u(d, h, Z0, ".", "\\ldotp");
u(d, h, Z0, "⋅", "\\cdotp");
u(d, h, T, "#", "\\#");
u(q, h, T, "#", "\\#");
u(d, h, T, "&", "\\&");
u(q, h, T, "&", "\\&");
u(d, h, T, "ℵ", "\\aleph", !0);
u(d, h, T, "∀", "\\forall", !0);
u(d, h, T, "ℏ", "\\hbar", !0);
u(d, h, T, "∃", "\\exists", !0);
u(d, h, T, "∇", "\\nabla", !0);
u(d, h, T, "♭", "\\flat", !0);
u(d, h, T, "ℓ", "\\ell", !0);
u(d, h, T, "♮", "\\natural", !0);
u(d, h, T, "♣", "\\clubsuit", !0);
u(d, h, T, "℘", "\\wp", !0);
u(d, h, T, "♯", "\\sharp", !0);
u(d, h, T, "♢", "\\diamondsuit", !0);
u(d, h, T, "ℜ", "\\Re", !0);
u(d, h, T, "♡", "\\heartsuit", !0);
u(d, h, T, "ℑ", "\\Im", !0);
u(d, h, T, "♠", "\\spadesuit", !0);
u(d, h, T, "§", "\\S", !0);
u(q, h, T, "§", "\\S");
u(d, h, T, "¶", "\\P", !0);
u(q, h, T, "¶", "\\P");
u(d, h, T, "†", "\\dag");
u(q, h, T, "†", "\\dag");
u(q, h, T, "†", "\\textdagger");
u(d, h, T, "‡", "\\ddag");
u(q, h, T, "‡", "\\ddag");
u(q, h, T, "‡", "\\textdaggerdbl");
u(d, h, Qe, "⎱", "\\rmoustache", !0);
u(d, h, it, "⎰", "\\lmoustache", !0);
u(d, h, Qe, "⟯", "\\rgroup", !0);
u(d, h, it, "⟮", "\\lgroup", !0);
u(d, h, Q, "∓", "\\mp", !0);
u(d, h, Q, "⊖", "\\ominus", !0);
u(d, h, Q, "⊎", "\\uplus", !0);
u(d, h, Q, "⊓", "\\sqcap", !0);
u(d, h, Q, "∗", "\\ast");
u(d, h, Q, "⊔", "\\sqcup", !0);
u(d, h, Q, "◯", "\\bigcirc", !0);
u(d, h, Q, "∙", "\\bullet", !0);
u(d, h, Q, "‡", "\\ddagger");
u(d, h, Q, "≀", "\\wr", !0);
u(d, h, Q, "⨿", "\\amalg");
u(d, h, Q, "&", "\\And");
u(d, h, C, "⟵", "\\longleftarrow", !0);
u(d, h, C, "⇐", "\\Leftarrow", !0);
u(d, h, C, "⟸", "\\Longleftarrow", !0);
u(d, h, C, "⟶", "\\longrightarrow", !0);
u(d, h, C, "⇒", "\\Rightarrow", !0);
u(d, h, C, "⟹", "\\Longrightarrow", !0);
u(d, h, C, "↔", "\\leftrightarrow", !0);
u(d, h, C, "⟷", "\\longleftrightarrow", !0);
u(d, h, C, "⇔", "\\Leftrightarrow", !0);
u(d, h, C, "⟺", "\\Longleftrightarrow", !0);
u(d, h, C, "↦", "\\mapsto", !0);
u(d, h, C, "⟼", "\\longmapsto", !0);
u(d, h, C, "↗", "\\nearrow", !0);
u(d, h, C, "↩", "\\hookleftarrow", !0);
u(d, h, C, "↪", "\\hookrightarrow", !0);
u(d, h, C, "↘", "\\searrow", !0);
u(d, h, C, "↼", "\\leftharpoonup", !0);
u(d, h, C, "⇀", "\\rightharpoonup", !0);
u(d, h, C, "↙", "\\swarrow", !0);
u(d, h, C, "↽", "\\leftharpoondown", !0);
u(d, h, C, "⇁", "\\rightharpoondown", !0);
u(d, h, C, "↖", "\\nwarrow", !0);
u(d, h, C, "⇌", "\\rightleftharpoons", !0);
u(d, k, C, "≮", "\\nless", !0);
u(d, k, C, "", "\\@nleqslant");
u(d, k, C, "", "\\@nleqq");
u(d, k, C, "⪇", "\\lneq", !0);
u(d, k, C, "≨", "\\lneqq", !0);
u(d, k, C, "", "\\@lvertneqq");
u(d, k, C, "⋦", "\\lnsim", !0);
u(d, k, C, "⪉", "\\lnapprox", !0);
u(d, k, C, "⊀", "\\nprec", !0);
u(d, k, C, "⋠", "\\npreceq", !0);
u(d, k, C, "⋨", "\\precnsim", !0);
u(d, k, C, "⪹", "\\precnapprox", !0);
u(d, k, C, "≁", "\\nsim", !0);
u(d, k, C, "", "\\@nshortmid");
u(d, k, C, "∤", "\\nmid", !0);
u(d, k, C, "⊬", "\\nvdash", !0);
u(d, k, C, "⊭", "\\nvDash", !0);
u(d, k, C, "⋪", "\\ntriangleleft");
u(d, k, C, "⋬", "\\ntrianglelefteq", !0);
u(d, k, C, "⊊", "\\subsetneq", !0);
u(d, k, C, "", "\\@varsubsetneq");
u(d, k, C, "⫋", "\\subsetneqq", !0);
u(d, k, C, "", "\\@varsubsetneqq");
u(d, k, C, "≯", "\\ngtr", !0);
u(d, k, C, "", "\\@ngeqslant");
u(d, k, C, "", "\\@ngeqq");
u(d, k, C, "⪈", "\\gneq", !0);
u(d, k, C, "≩", "\\gneqq", !0);
u(d, k, C, "", "\\@gvertneqq");
u(d, k, C, "⋧", "\\gnsim", !0);
u(d, k, C, "⪊", "\\gnapprox", !0);
u(d, k, C, "⊁", "\\nsucc", !0);
u(d, k, C, "⋡", "\\nsucceq", !0);
u(d, k, C, "⋩", "\\succnsim", !0);
u(d, k, C, "⪺", "\\succnapprox", !0);
u(d, k, C, "≆", "\\ncong", !0);
u(d, k, C, "", "\\@nshortparallel");
u(d, k, C, "∦", "\\nparallel", !0);
u(d, k, C, "⊯", "\\nVDash", !0);
u(d, k, C, "⋫", "\\ntriangleright");
u(d, k, C, "⋭", "\\ntrianglerighteq", !0);
u(d, k, C, "", "\\@nsupseteqq");
u(d, k, C, "⊋", "\\supsetneq", !0);
u(d, k, C, "", "\\@varsupsetneq");
u(d, k, C, "⫌", "\\supsetneqq", !0);
u(d, k, C, "", "\\@varsupsetneqq");
u(d, k, C, "⊮", "\\nVdash", !0);
u(d, k, C, "⪵", "\\precneqq", !0);
u(d, k, C, "⪶", "\\succneqq", !0);
u(d, k, C, "", "\\@nsubseteqq");
u(d, k, Q, "⊴", "\\unlhd");
u(d, k, Q, "⊵", "\\unrhd");
u(d, k, C, "↚", "\\nleftarrow", !0);
u(d, k, C, "↛", "\\nrightarrow", !0);
u(d, k, C, "⇍", "\\nLeftarrow", !0);
u(d, k, C, "⇏", "\\nRightarrow", !0);
u(d, k, C, "↮", "\\nleftrightarrow", !0);
u(d, k, C, "⇎", "\\nLeftrightarrow", !0);
u(d, k, C, "△", "\\vartriangle");
u(d, k, T, "ℏ", "\\hslash");
u(d, k, T, "▽", "\\triangledown");
u(d, k, T, "◊", "\\lozenge");
u(d, k, T, "Ⓢ", "\\circledS");
u(d, k, T, "®", "\\circledR");
u(q, k, T, "®", "\\circledR");
u(d, k, T, "∡", "\\measuredangle", !0);
u(d, k, T, "∄", "\\nexists");
u(d, k, T, "℧", "\\mho");
u(d, k, T, "Ⅎ", "\\Finv", !0);
u(d, k, T, "⅁", "\\Game", !0);
u(d, k, T, "‵", "\\backprime");
u(d, k, T, "▲", "\\blacktriangle");
u(d, k, T, "▼", "\\blacktriangledown");
u(d, k, T, "■", "\\blacksquare");
u(d, k, T, "⧫", "\\blacklozenge");
u(d, k, T, "★", "\\bigstar");
u(d, k, T, "∢", "\\sphericalangle", !0);
u(d, k, T, "∁", "\\complement", !0);
u(d, k, T, "ð", "\\eth", !0);
u(q, h, T, "ð", "ð");
u(d, k, T, "╱", "\\diagup");
u(d, k, T, "╲", "\\diagdown");
u(d, k, T, "□", "\\square");
u(d, k, T, "□", "\\Box");
u(d, k, T, "◊", "\\Diamond");
u(d, k, T, "¥", "\\yen", !0);
u(q, k, T, "¥", "\\yen", !0);
u(d, k, T, "✓", "\\checkmark", !0);
u(q, k, T, "✓", "\\checkmark");
u(d, k, T, "ℶ", "\\beth", !0);
u(d, k, T, "ℸ", "\\daleth", !0);
u(d, k, T, "ℷ", "\\gimel", !0);
u(d, k, T, "ϝ", "\\digamma", !0);
u(d, k, T, "ϰ", "\\varkappa");
u(d, k, it, "┌", "\\@ulcorner", !0);
u(d, k, Qe, "┐", "\\@urcorner", !0);
u(d, k, it, "└", "\\@llcorner", !0);
u(d, k, Qe, "┘", "\\@lrcorner", !0);
u(d, k, C, "≦", "\\leqq", !0);
u(d, k, C, "⩽", "\\leqslant", !0);
u(d, k, C, "⪕", "\\eqslantless", !0);
u(d, k, C, "≲", "\\lesssim", !0);
u(d, k, C, "⪅", "\\lessapprox", !0);
u(d, k, C, "≊", "\\approxeq", !0);
u(d, k, Q, "⋖", "\\lessdot");
u(d, k, C, "⋘", "\\lll", !0);
u(d, k, C, "≶", "\\lessgtr", !0);
u(d, k, C, "⋚", "\\lesseqgtr", !0);
u(d, k, C, "⪋", "\\lesseqqgtr", !0);
u(d, k, C, "≑", "\\doteqdot");
u(d, k, C, "≓", "\\risingdotseq", !0);
u(d, k, C, "≒", "\\fallingdotseq", !0);
u(d, k, C, "∽", "\\backsim", !0);
u(d, k, C, "⋍", "\\backsimeq", !0);
u(d, k, C, "⫅", "\\subseteqq", !0);
u(d, k, C, "⋐", "\\Subset", !0);
u(d, k, C, "⊏", "\\sqsubset", !0);
u(d, k, C, "≼", "\\preccurlyeq", !0);
u(d, k, C, "⋞", "\\curlyeqprec", !0);
u(d, k, C, "≾", "\\precsim", !0);
u(d, k, C, "⪷", "\\precapprox", !0);
u(d, k, C, "⊲", "\\vartriangleleft");
u(d, k, C, "⊴", "\\trianglelefteq");
u(d, k, C, "⊨", "\\vDash", !0);
u(d, k, C, "⊪", "\\Vvdash", !0);
u(d, k, C, "⌣", "\\smallsmile");
u(d, k, C, "⌢", "\\smallfrown");
u(d, k, C, "≏", "\\bumpeq", !0);
u(d, k, C, "≎", "\\Bumpeq", !0);
u(d, k, C, "≧", "\\geqq", !0);
u(d, k, C, "⩾", "\\geqslant", !0);
u(d, k, C, "⪖", "\\eqslantgtr", !0);
u(d, k, C, "≳", "\\gtrsim", !0);
u(d, k, C, "⪆", "\\gtrapprox", !0);
u(d, k, Q, "⋗", "\\gtrdot");
u(d, k, C, "⋙", "\\ggg", !0);
u(d, k, C, "≷", "\\gtrless", !0);
u(d, k, C, "⋛", "\\gtreqless", !0);
u(d, k, C, "⪌", "\\gtreqqless", !0);
u(d, k, C, "≖", "\\eqcirc", !0);
u(d, k, C, "≗", "\\circeq", !0);
u(d, k, C, "≜", "\\triangleq", !0);
u(d, k, C, "∼", "\\thicksim");
u(d, k, C, "≈", "\\thickapprox");
u(d, k, C, "⫆", "\\supseteqq", !0);
u(d, k, C, "⋑", "\\Supset", !0);
u(d, k, C, "⊐", "\\sqsupset", !0);
u(d, k, C, "≽", "\\succcurlyeq", !0);
u(d, k, C, "⋟", "\\curlyeqsucc", !0);
u(d, k, C, "≿", "\\succsim", !0);
u(d, k, C, "⪸", "\\succapprox", !0);
u(d, k, C, "⊳", "\\vartriangleright");
u(d, k, C, "⊵", "\\trianglerighteq");
u(d, k, C, "⊩", "\\Vdash", !0);
u(d, k, C, "∣", "\\shortmid");
u(d, k, C, "∥", "\\shortparallel");
u(d, k, C, "≬", "\\between", !0);
u(d, k, C, "⋔", "\\pitchfork", !0);
u(d, k, C, "∝", "\\varpropto");
u(d, k, C, "◀", "\\blacktriangleleft");
u(d, k, C, "∴", "\\therefore", !0);
u(d, k, C, "∍", "\\backepsilon");
u(d, k, C, "▶", "\\blacktriangleright");
u(d, k, C, "∵", "\\because", !0);
u(d, k, C, "⋘", "\\llless");
u(d, k, C, "⋙", "\\gggtr");
u(d, k, Q, "⊲", "\\lhd");
u(d, k, Q, "⊳", "\\rhd");
u(d, k, C, "≂", "\\eqsim", !0);
u(d, h, C, "⋈", "\\Join");
u(d, k, C, "≑", "\\Doteq", !0);
u(d, k, Q, "∔", "\\dotplus", !0);
u(d, k, Q, "∖", "\\smallsetminus");
u(d, k, Q, "⋒", "\\Cap", !0);
u(d, k, Q, "⋓", "\\Cup", !0);
u(d, k, Q, "⩞", "\\doublebarwedge", !0);
u(d, k, Q, "⊟", "\\boxminus", !0);
u(d, k, Q, "⊞", "\\boxplus", !0);
u(d, k, Q, "⋇", "\\divideontimes", !0);
u(d, k, Q, "⋉", "\\ltimes", !0);
u(d, k, Q, "⋊", "\\rtimes", !0);
u(d, k, Q, "⋋", "\\leftthreetimes", !0);
u(d, k, Q, "⋌", "\\rightthreetimes", !0);
u(d, k, Q, "⋏", "\\curlywedge", !0);
u(d, k, Q, "⋎", "\\curlyvee", !0);
u(d, k, Q, "⊝", "\\circleddash", !0);
u(d, k, Q, "⊛", "\\circledast", !0);
u(d, k, Q, "⋅", "\\centerdot");
u(d, k, Q, "⊺", "\\intercal", !0);
u(d, k, Q, "⋒", "\\doublecap");
u(d, k, Q, "⋓", "\\doublecup");
u(d, k, Q, "⊠", "\\boxtimes", !0);
u(d, k, C, "⇢", "\\dashrightarrow", !0);
u(d, k, C, "⇠", "\\dashleftarrow", !0);
u(d, k, C, "⇇", "\\leftleftarrows", !0);
u(d, k, C, "⇆", "\\leftrightarrows", !0);
u(d, k, C, "⇚", "\\Lleftarrow", !0);
u(d, k, C, "↞", "\\twoheadleftarrow", !0);
u(d, k, C, "↢", "\\leftarrowtail", !0);
u(d, k, C, "↫", "\\looparrowleft", !0);
u(d, k, C, "⇋", "\\leftrightharpoons", !0);
u(d, k, C, "↶", "\\curvearrowleft", !0);
u(d, k, C, "↺", "\\circlearrowleft", !0);
u(d, k, C, "↰", "\\Lsh", !0);
u(d, k, C, "⇈", "\\upuparrows", !0);
u(d, k, C, "↿", "\\upharpoonleft", !0);
u(d, k, C, "⇃", "\\downharpoonleft", !0);
u(d, h, C, "⊶", "\\origof", !0);
u(d, h, C, "⊷", "\\imageof", !0);
u(d, k, C, "⊸", "\\multimap", !0);
u(d, k, C, "↭", "\\leftrightsquigarrow", !0);
u(d, k, C, "⇉", "\\rightrightarrows", !0);
u(d, k, C, "⇄", "\\rightleftarrows", !0);
u(d, k, C, "↠", "\\twoheadrightarrow", !0);
u(d, k, C, "↣", "\\rightarrowtail", !0);
u(d, k, C, "↬", "\\looparrowright", !0);
u(d, k, C, "↷", "\\curvearrowright", !0);
u(d, k, C, "↻", "\\circlearrowright", !0);
u(d, k, C, "↱", "\\Rsh", !0);
u(d, k, C, "⇊", "\\downdownarrows", !0);
u(d, k, C, "↾", "\\upharpoonright", !0);
u(d, k, C, "⇂", "\\downharpoonright", !0);
u(d, k, C, "⇝", "\\rightsquigarrow", !0);
u(d, k, C, "⇝", "\\leadsto");
u(d, k, C, "⇛", "\\Rrightarrow", !0);
u(d, k, C, "↾", "\\restriction");
u(d, h, T, "‘", "`");
u(d, h, T, "$", "\\$");
u(q, h, T, "$", "\\$");
u(q, h, T, "$", "\\textdollar");
u(d, h, T, "%", "\\%");
u(q, h, T, "%", "\\%");
u(d, h, T, "_", "\\_");
u(q, h, T, "_", "\\_");
u(q, h, T, "_", "\\textunderscore");
u(d, h, T, "∠", "\\angle", !0);
u(d, h, T, "∞", "\\infty", !0);
u(d, h, T, "′", "\\prime");
u(d, h, T, "△", "\\triangle");
u(d, h, T, "Γ", "\\Gamma", !0);
u(d, h, T, "Δ", "\\Delta", !0);
u(d, h, T, "Θ", "\\Theta", !0);
u(d, h, T, "Λ", "\\Lambda", !0);
u(d, h, T, "Ξ", "\\Xi", !0);
u(d, h, T, "Π", "\\Pi", !0);
u(d, h, T, "Σ", "\\Sigma", !0);
u(d, h, T, "Υ", "\\Upsilon", !0);
u(d, h, T, "Φ", "\\Phi", !0);
u(d, h, T, "Ψ", "\\Psi", !0);
u(d, h, T, "Ω", "\\Omega", !0);
u(d, h, T, "A", "Α");
u(d, h, T, "B", "Β");
u(d, h, T, "E", "Ε");
u(d, h, T, "Z", "Ζ");
u(d, h, T, "H", "Η");
u(d, h, T, "I", "Ι");
u(d, h, T, "K", "Κ");
u(d, h, T, "M", "Μ");
u(d, h, T, "N", "Ν");
u(d, h, T, "O", "Ο");
u(d, h, T, "P", "Ρ");
u(d, h, T, "T", "Τ");
u(d, h, T, "X", "Χ");
u(d, h, T, "¬", "\\neg", !0);
u(d, h, T, "¬", "\\lnot");
u(d, h, T, "⊤", "\\top");
u(d, h, T, "⊥", "\\bot");
u(d, h, T, "∅", "\\emptyset");
u(d, k, T, "∅", "\\varnothing");
u(d, h, le, "α", "\\alpha", !0);
u(d, h, le, "β", "\\beta", !0);
u(d, h, le, "γ", "\\gamma", !0);
u(d, h, le, "δ", "\\delta", !0);
u(d, h, le, "ϵ", "\\epsilon", !0);
u(d, h, le, "ζ", "\\zeta", !0);
u(d, h, le, "η", "\\eta", !0);
u(d, h, le, "θ", "\\theta", !0);
u(d, h, le, "ι", "\\iota", !0);
u(d, h, le, "κ", "\\kappa", !0);
u(d, h, le, "λ", "\\lambda", !0);
u(d, h, le, "μ", "\\mu", !0);
u(d, h, le, "ν", "\\nu", !0);
u(d, h, le, "ξ", "\\xi", !0);
u(d, h, le, "ο", "\\omicron", !0);
u(d, h, le, "π", "\\pi", !0);
u(d, h, le, "ρ", "\\rho", !0);
u(d, h, le, "σ", "\\sigma", !0);
u(d, h, le, "τ", "\\tau", !0);
u(d, h, le, "υ", "\\upsilon", !0);
u(d, h, le, "ϕ", "\\phi", !0);
u(d, h, le, "χ", "\\chi", !0);
u(d, h, le, "ψ", "\\psi", !0);
u(d, h, le, "ω", "\\omega", !0);
u(d, h, le, "ε", "\\varepsilon", !0);
u(d, h, le, "ϑ", "\\vartheta", !0);
u(d, h, le, "ϖ", "\\varpi", !0);
u(d, h, le, "ϱ", "\\varrho", !0);
u(d, h, le, "ς", "\\varsigma", !0);
u(d, h, le, "φ", "\\varphi", !0);
u(d, h, Q, "∗", "*", !0);
u(d, h, Q, "+", "+");
u(d, h, Q, "−", "-", !0);
u(d, h, Q, "⋅", "\\cdot", !0);
u(d, h, Q, "∘", "\\circ", !0);
u(d, h, Q, "÷", "\\div", !0);
u(d, h, Q, "±", "\\pm", !0);
u(d, h, Q, "×", "\\times", !0);
u(d, h, Q, "∩", "\\cap", !0);
u(d, h, Q, "∪", "\\cup", !0);
u(d, h, Q, "∖", "\\setminus", !0);
u(d, h, Q, "∧", "\\land");
u(d, h, Q, "∨", "\\lor");
u(d, h, Q, "∧", "\\wedge", !0);
u(d, h, Q, "∨", "\\vee", !0);
u(d, h, T, "√", "\\surd");
u(d, h, it, "⟨", "\\langle", !0);
u(d, h, it, "∣", "\\lvert");
u(d, h, it, "∥", "\\lVert");
u(d, h, Qe, "?", "?");
u(d, h, Qe, "!", "!");
u(d, h, Qe, "⟩", "\\rangle", !0);
u(d, h, Qe, "∣", "\\rvert");
u(d, h, Qe, "∥", "\\rVert");
u(d, h, C, "=", "=");
u(d, h, C, ":", ":");
u(d, h, C, "≈", "\\approx", !0);
u(d, h, C, "≅", "\\cong", !0);
u(d, h, C, "≥", "\\ge");
u(d, h, C, "≥", "\\geq", !0);
u(d, h, C, "←", "\\gets");
u(d, h, C, ">", "\\gt", !0);
u(d, h, C, "∈", "\\in", !0);
u(d, h, C, "", "\\@not");
u(d, h, C, "⊂", "\\subset", !0);
u(d, h, C, "⊃", "\\supset", !0);
u(d, h, C, "⊆", "\\subseteq", !0);
u(d, h, C, "⊇", "\\supseteq", !0);
u(d, k, C, "⊈", "\\nsubseteq", !0);
u(d, k, C, "⊉", "\\nsupseteq", !0);
u(d, h, C, "⊨", "\\models");
u(d, h, C, "←", "\\leftarrow", !0);
u(d, h, C, "≤", "\\le");
u(d, h, C, "≤", "\\leq", !0);
u(d, h, C, "<", "\\lt", !0);
u(d, h, C, "→", "\\rightarrow", !0);
u(d, h, C, "→", "\\to");
u(d, k, C, "≱", "\\ngeq", !0);
u(d, k, C, "≰", "\\nleq", !0);
u(d, h, Ht, " ", "\\ ");
u(d, h, Ht, " ", "\\space");
u(d, h, Ht, " ", "\\nobreakspace");
u(q, h, Ht, " ", "\\ ");
u(q, h, Ht, " ", " ");
u(q, h, Ht, " ", "\\space");
u(q, h, Ht, " ", "\\nobreakspace");
u(d, h, Ht, null, "\\nobreak");
u(d, h, Ht, null, "\\allowbreak");
u(d, h, Z0, ",", ",");
u(d, h, Z0, ";", ";");
u(d, k, Q, "⊼", "\\barwedge", !0);
u(d, k, Q, "⊻", "\\veebar", !0);
u(d, h, Q, "⊙", "\\odot", !0);
u(d, h, Q, "⊕", "\\oplus", !0);
u(d, h, Q, "⊗", "\\otimes", !0);
u(d, h, T, "∂", "\\partial", !0);
u(d, h, Q, "⊘", "\\oslash", !0);
u(d, k, Q, "⊚", "\\circledcirc", !0);
u(d, k, Q, "⊡", "\\boxdot", !0);
u(d, h, Q, "△", "\\bigtriangleup");
u(d, h, Q, "▽", "\\bigtriangledown");
u(d, h, Q, "†", "\\dagger");
u(d, h, Q, "⋄", "\\diamond");
u(d, h, Q, "⋆", "\\star");
u(d, h, Q, "◃", "\\triangleleft");
u(d, h, Q, "▹", "\\triangleright");
u(d, h, it, "{", "\\{");
u(q, h, T, "{", "\\{");
u(q, h, T, "{", "\\textbraceleft");
u(d, h, Qe, "}", "\\}");
u(q, h, T, "}", "\\}");
u(q, h, T, "}", "\\textbraceright");
u(d, h, it, "{", "\\lbrace");
u(d, h, Qe, "}", "\\rbrace");
u(d, h, it, "[", "\\lbrack", !0);
u(q, h, T, "[", "\\lbrack", !0);
u(d, h, Qe, "]", "\\rbrack", !0);
u(q, h, T, "]", "\\rbrack", !0);
u(d, h, it, "(", "\\lparen", !0);
u(d, h, Qe, ")", "\\rparen", !0);
u(q, h, T, "<", "\\textless", !0);
u(q, h, T, ">", "\\textgreater", !0);
u(d, h, it, "⌊", "\\lfloor", !0);
u(d, h, Qe, "⌋", "\\rfloor", !0);
u(d, h, it, "⌈", "\\lceil", !0);
u(d, h, Qe, "⌉", "\\rceil", !0);
u(d, h, T, "\\", "\\backslash");
u(d, h, T, "∣", "|");
u(d, h, T, "∣", "\\vert");
u(q, h, T, "|", "\\textbar", !0);
u(d, h, T, "∥", "\\|");
u(d, h, T, "∥", "\\Vert");
u(q, h, T, "∥", "\\textbardbl");
u(q, h, T, "~", "\\textasciitilde");
u(q, h, T, "\\", "\\textbackslash");
u(q, h, T, "^", "\\textasciicircum");
u(d, h, C, "↑", "\\uparrow", !0);
u(d, h, C, "⇑", "\\Uparrow", !0);
u(d, h, C, "↓", "\\downarrow", !0);
u(d, h, C, "⇓", "\\Downarrow", !0);
u(d, h, C, "↕", "\\updownarrow", !0);
u(d, h, C, "⇕", "\\Updownarrow", !0);
u(d, h, Le, "∐", "\\coprod");
u(d, h, Le, "⋁", "\\bigvee");
u(d, h, Le, "⋀", "\\bigwedge");
u(d, h, Le, "⨄", "\\biguplus");
u(d, h, Le, "⋂", "\\bigcap");
u(d, h, Le, "⋃", "\\bigcup");
u(d, h, Le, "∫", "\\int");
u(d, h, Le, "∫", "\\intop");
u(d, h, Le, "∬", "\\iint");
u(d, h, Le, "∭", "\\iiint");
u(d, h, Le, "∏", "\\prod");
u(d, h, Le, "∑", "\\sum");
u(d, h, Le, "⨂", "\\bigotimes");
u(d, h, Le, "⨁", "\\bigoplus");
u(d, h, Le, "⨀", "\\bigodot");
u(d, h, Le, "∮", "\\oint");
u(d, h, Le, "∯", "\\oiint");
u(d, h, Le, "∰", "\\oiiint");
u(d, h, Le, "⨆", "\\bigsqcup");
u(d, h, Le, "∫", "\\smallint");
u(q, h, On, "…", "\\textellipsis");
u(d, h, On, "…", "\\mathellipsis");
u(q, h, On, "…", "\\ldots", !0);
u(d, h, On, "…", "\\ldots", !0);
u(d, h, On, "⋯", "\\@cdots", !0);
u(d, h, On, "⋱", "\\ddots", !0);
u(d, h, T, "⋮", "\\varvdots");
u(d, h, Ie, "ˊ", "\\acute");
u(d, h, Ie, "ˋ", "\\grave");
u(d, h, Ie, "¨", "\\ddot");
u(d, h, Ie, "~", "\\tilde");
u(d, h, Ie, "ˉ", "\\bar");
u(d, h, Ie, "˘", "\\breve");
u(d, h, Ie, "ˇ", "\\check");
u(d, h, Ie, "^", "\\hat");
u(d, h, Ie, "⃗", "\\vec");
u(d, h, Ie, "˙", "\\dot");
u(d, h, Ie, "˚", "\\mathring");
u(d, h, le, "", "\\@imath");
u(d, h, le, "", "\\@jmath");
u(d, h, T, "ı", "ı");
u(d, h, T, "ȷ", "ȷ");
u(q, h, T, "ı", "\\i", !0);
u(q, h, T, "ȷ", "\\j", !0);
u(q, h, T, "ß", "\\ss", !0);
u(q, h, T, "æ", "\\ae", !0);
u(q, h, T, "œ", "\\oe", !0);
u(q, h, T, "ø", "\\o", !0);
u(q, h, T, "Æ", "\\AE", !0);
u(q, h, T, "Œ", "\\OE", !0);
u(q, h, T, "Ø", "\\O", !0);
u(q, h, Ie, "ˊ", "\\'");
u(q, h, Ie, "ˋ", "\\`");
u(q, h, Ie, "ˆ", "\\^");
u(q, h, Ie, "˜", "\\~");
u(q, h, Ie, "ˉ", "\\=");
u(q, h, Ie, "˘", "\\u");
u(q, h, Ie, "˙", "\\.");
u(q, h, Ie, "¸", "\\c");
u(q, h, Ie, "˚", "\\r");
u(q, h, Ie, "ˇ", "\\v");
u(q, h, Ie, "¨", '\\"');
u(q, h, Ie, "˝", "\\H");
u(q, h, Ie, "◯", "\\textcircled");
var Ri = {
  "--": !0,
  "---": !0,
  "``": !0,
  "''": !0
};
u(q, h, T, "–", "--", !0);
u(q, h, T, "–", "\\textendash");
u(q, h, T, "—", "---", !0);
u(q, h, T, "—", "\\textemdash");
u(q, h, T, "‘", "`", !0);
u(q, h, T, "‘", "\\textquoteleft");
u(q, h, T, "’", "'", !0);
u(q, h, T, "’", "\\textquoteright");
u(q, h, T, "“", "``", !0);
u(q, h, T, "“", "\\textquotedblleft");
u(q, h, T, "”", "''", !0);
u(q, h, T, "”", "\\textquotedblright");
u(d, h, T, "°", "\\degree", !0);
u(q, h, T, "°", "\\degree");
u(q, h, T, "°", "\\textdegree", !0);
u(d, h, T, "£", "\\pounds");
u(d, h, T, "£", "\\mathsterling", !0);
u(q, h, T, "£", "\\pounds");
u(q, h, T, "£", "\\textsterling", !0);
u(d, k, T, "✠", "\\maltese");
u(q, k, T, "✠", "\\maltese");
var rl = '0123456789/@."';
for (var va = 0; va < rl.length; va++) {
  var ll = rl.charAt(va);
  u(d, h, T, ll, ll);
}
var il = '0123456789!@*()-=+";:?/.,';
for (var ga = 0; ga < il.length; ga++) {
  var ol = il.charAt(ga);
  u(q, h, T, ol, ol);
}
var O0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var pa = 0; pa < O0.length; pa++) {
  var h0 = O0.charAt(pa);
  u(d, h, le, h0, h0), u(q, h, T, h0, h0);
}
u(d, k, T, "C", "ℂ");
u(q, k, T, "C", "ℂ");
u(d, k, T, "H", "ℍ");
u(q, k, T, "H", "ℍ");
u(d, k, T, "N", "ℕ");
u(q, k, T, "N", "ℕ");
u(d, k, T, "P", "ℙ");
u(q, k, T, "P", "ℙ");
u(d, k, T, "Q", "ℚ");
u(q, k, T, "Q", "ℚ");
u(d, k, T, "R", "ℝ");
u(q, k, T, "R", "ℝ");
u(d, k, T, "Z", "ℤ");
u(q, k, T, "Z", "ℤ");
u(d, h, le, "h", "ℎ");
u(q, h, le, "h", "ℎ");
var ue = "";
for (var Ke = 0; Ke < O0.length; Ke++) {
  var Ee = O0.charAt(Ke);
  ue = String.fromCharCode(55349, 56320 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56372 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56424 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56580 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56684 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56736 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56788 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56840 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56944 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), Ke < 26 && (ue = String.fromCharCode(55349, 56632 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue), ue = String.fromCharCode(55349, 56476 + Ke), u(d, h, le, Ee, ue), u(q, h, T, Ee, ue));
}
ue = "𝕜";
u(d, h, le, "k", ue);
u(q, h, T, "k", ue);
for (var dn = 0; dn < 10; dn++) {
  var Kt = dn.toString();
  ue = String.fromCharCode(55349, 57294 + dn), u(d, h, le, Kt, ue), u(q, h, T, Kt, ue), ue = String.fromCharCode(55349, 57314 + dn), u(d, h, le, Kt, ue), u(q, h, T, Kt, ue), ue = String.fromCharCode(55349, 57324 + dn), u(d, h, le, Kt, ue), u(q, h, T, Kt, ue), ue = String.fromCharCode(55349, 57334 + dn), u(d, h, le, Kt, ue), u(q, h, T, Kt, ue);
}
var $a = "ÐÞþ";
for (var ya = 0; ya < $a.length; ya++) {
  var f0 = $a.charAt(ya);
  u(d, h, le, f0, f0), u(q, h, T, f0, f0);
}
var v0 = [
  ["mathbf", "textbf", "Main-Bold"],
  // A-Z bold upright
  ["mathbf", "textbf", "Main-Bold"],
  // a-z bold upright
  ["mathnormal", "textit", "Math-Italic"],
  // A-Z italic
  ["mathnormal", "textit", "Math-Italic"],
  // a-z italic
  ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
  // A-Z bold italic
  ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
  // a-z bold italic
  // Map fancy A-Z letters to script, not calligraphic.
  // This aligns with unicode-math and math fonts (except Cambria Math).
  ["mathscr", "textscr", "Script-Regular"],
  // A-Z script
  ["", "", ""],
  // a-z script.  No font
  ["", "", ""],
  // A-Z bold script. No font
  ["", "", ""],
  // a-z bold script. No font
  ["mathfrak", "textfrak", "Fraktur-Regular"],
  // A-Z Fraktur
  ["mathfrak", "textfrak", "Fraktur-Regular"],
  // a-z Fraktur
  ["mathbb", "textbb", "AMS-Regular"],
  // A-Z double-struck
  ["mathbb", "textbb", "AMS-Regular"],
  // k double-struck
  // Note that we are using a bold font, but font metrics for regular Fraktur.
  ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
  // A-Z bold Fraktur
  ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
  // a-z bold Fraktur
  ["mathsf", "textsf", "SansSerif-Regular"],
  // A-Z sans-serif
  ["mathsf", "textsf", "SansSerif-Regular"],
  // a-z sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // A-Z bold sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // a-z bold sans-serif
  ["mathitsf", "textitsf", "SansSerif-Italic"],
  // A-Z italic sans-serif
  ["mathitsf", "textitsf", "SansSerif-Italic"],
  // a-z italic sans-serif
  ["", "", ""],
  // A-Z bold italic sans. No font
  ["", "", ""],
  // a-z bold italic sans. No font
  ["mathtt", "texttt", "Typewriter-Regular"],
  // A-Z monospace
  ["mathtt", "texttt", "Typewriter-Regular"]
  // a-z monospace
], sl = [
  ["mathbf", "textbf", "Main-Bold"],
  // 0-9 bold
  ["", "", ""],
  // 0-9 double-struck. No KaTeX font.
  ["mathsf", "textsf", "SansSerif-Regular"],
  // 0-9 sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // 0-9 bold sans-serif
  ["mathtt", "texttt", "Typewriter-Regular"]
  // 0-9 monospace
], hc = function(e, t) {
  var n = e.charCodeAt(0), a = e.charCodeAt(1), r = (n - 55296) * 1024 + (a - 56320) + 65536, l = t === "math" ? 0 : 1;
  if (119808 <= r && r < 120484) {
    var i = Math.floor((r - 119808) / 26);
    return [v0[i][2], v0[i][l]];
  } else if (120782 <= r && r <= 120831) {
    var o = Math.floor((r - 120782) / 10);
    return [sl[o][2], sl[o][l]];
  } else {
    if (r === 120485 || r === 120486)
      return [v0[0][2], v0[0][l]];
    if (120486 < r && r < 120782)
      return ["", ""];
    throw new W("Unsupported character: " + e);
  }
}, Q0 = function(e, t, n) {
  return Me[n][e] && Me[n][e].replace && (e = Me[n][e].replace), {
    value: e,
    metrics: fr(e, t, n)
  };
}, vt = function(e, t, n, a, r) {
  var l = Q0(e, t, n), i = l.metrics;
  e = l.value;
  var o;
  if (i) {
    var s = i.italic;
    (n === "text" || a && a.font === "mathit") && (s = 0), o = new mt(e, i.height, i.depth, s, i.skew, i.width, r);
  } else
    typeof console < "u" && console.warn("No character metrics " + ("for '" + e + "' in style '" + t + "' and mode '" + n + "'")), o = new mt(e, 0, 0, 0, 0, 0, r);
  if (a) {
    o.maxFontSize = a.sizeMultiplier, a.style.isTight() && o.classes.push("mtight");
    var c = a.getColor();
    c && (o.style.color = c);
  }
  return o;
}, fc = function(e, t, n, a) {
  return a === void 0 && (a = []), n.font === "boldsymbol" && Q0(e, "Main-Bold", t).metrics ? vt(e, "Main-Bold", t, n, a.concat(["mathbf"])) : e === "\\" || Me[t][e].font === "main" ? vt(e, "Main-Regular", t, n, a) : vt(e, "AMS-Regular", t, n, a.concat(["amsrm"]));
}, vc = function(e, t, n, a, r) {
  return r !== "textord" && Q0(e, "Math-BoldItalic", t).metrics ? {
    fontName: "Math-BoldItalic",
    fontClass: "boldsymbol"
  } : {
    fontName: "Main-Bold",
    fontClass: "mathbf"
  };
}, gc = function(e, t, n) {
  var a = e.mode, r = e.text, l = ["mord"], i = a === "math" || a === "text" && t.font, o = i ? t.font : t.fontFamily, s = "", c = "";
  if (r.charCodeAt(0) === 55349 && ([s, c] = hc(r, a)), s.length > 0)
    return vt(r, s, a, t, l.concat(c));
  if (o) {
    var m, f;
    if (o === "boldsymbol") {
      var v = vc(r, a, t, l, n);
      m = v.fontName, f = [v.fontClass];
    } else i ? (m = Fi[o].fontName, f = [o]) : (m = g0(o, t.fontWeight, t.fontShape), f = [o, t.fontWeight, t.fontShape]);
    if (Q0(r, m, a).metrics)
      return vt(r, m, a, t, l.concat(f));
    if (Ri.hasOwnProperty(r) && m.slice(0, 10) === "Typewriter") {
      for (var g = [], p = 0; p < r.length; p++)
        g.push(vt(r[p], m, a, t, l.concat(f)));
      return Di(g);
    }
  }
  if (n === "mathord")
    return vt(r, "Math-Italic", a, t, l.concat(["mathnormal"]));
  if (n === "textord") {
    var b = Me[a][r] && Me[a][r].font;
    if (b === "ams") {
      var x = g0("amsrm", t.fontWeight, t.fontShape);
      return vt(r, x, a, t, l.concat("amsrm", t.fontWeight, t.fontShape));
    } else if (b === "main" || !b) {
      var S = g0("textrm", t.fontWeight, t.fontShape);
      return vt(r, S, a, t, l.concat(t.fontWeight, t.fontShape));
    } else {
      var A = g0(b, t.fontWeight, t.fontShape);
      return vt(r, A, a, t, l.concat(A, t.fontWeight, t.fontShape));
    }
  } else
    throw new Error("unexpected type: " + n + " in makeOrd");
}, pc = (e, t) => {
  if (Jt(e.classes) !== Jt(t.classes) || e.skew !== t.skew || e.maxFontSize !== t.maxFontSize)
    return !1;
  if (e.classes.length === 1) {
    var n = e.classes[0];
    if (n === "mbin" || n === "mord")
      return !1;
  }
  for (var a in e.style)
    if (e.style.hasOwnProperty(a) && e.style[a] !== t.style[a])
      return !1;
  for (var r in t.style)
    if (t.style.hasOwnProperty(r) && e.style[r] !== t.style[r])
      return !1;
  return !0;
}, yc = (e) => {
  for (var t = 0; t < e.length - 1; t++) {
    var n = e[t], a = e[t + 1];
    n instanceof mt && a instanceof mt && pc(n, a) && (n.text += a.text, n.height = Math.max(n.height, a.height), n.depth = Math.max(n.depth, a.depth), n.italic = a.italic, e.splice(t + 1, 1), t--);
  }
  return e;
}, gr = function(e) {
  for (var t = 0, n = 0, a = 0, r = 0; r < e.children.length; r++) {
    var l = e.children[r];
    l.height > t && (t = l.height), l.depth > n && (n = l.depth), l.maxFontSize > a && (a = l.maxFontSize);
  }
  e.height = t, e.depth = n, e.maxFontSize = a;
}, Je = function(e, t, n, a) {
  var r = new l0(e, t, n, a);
  return gr(r), r;
}, Ni = (e, t, n, a) => new l0(e, t, n, a), bc = function(e, t, n) {
  var a = Je([e], [], t);
  return a.height = Math.max(n || t.fontMetrics().defaultRuleThickness, t.minRuleThickness), a.style.borderBottomWidth = K(a.height), a.maxFontSize = 1, a;
}, xc = function(e, t, n, a) {
  var r = new vr(e, t, n, a);
  return gr(r), r;
}, Di = function(e) {
  var t = new r0(e);
  return gr(t), t;
}, wc = function(e, t) {
  return e instanceof r0 ? Je([], [e], t) : e;
}, Sc = function(e) {
  if (e.positionType === "individualShift") {
    for (var t = e.children, n = [t[0]], a = -t[0].shift - t[0].elem.depth, r = a, l = 1; l < t.length; l++) {
      var i = -t[l].shift - r - t[l].elem.depth, o = i - (t[l - 1].elem.height + t[l - 1].elem.depth);
      r = r + i, n.push({
        type: "kern",
        size: o
      }), n.push(t[l]);
    }
    return {
      children: n,
      depth: a
    };
  }
  var s;
  if (e.positionType === "top") {
    for (var c = e.positionData, m = 0; m < e.children.length; m++) {
      var f = e.children[m];
      c -= f.type === "kern" ? f.size : f.elem.height + f.elem.depth;
    }
    s = c;
  } else if (e.positionType === "bottom")
    s = -e.positionData;
  else {
    var v = e.children[0];
    if (v.type !== "elem")
      throw new Error('First child must have type "elem".');
    if (e.positionType === "shift")
      s = -v.elem.depth - e.positionData;
    else if (e.positionType === "firstBaseline")
      s = -v.elem.depth;
    else
      throw new Error("Invalid positionType " + e.positionType + ".");
  }
  return {
    children: e.children,
    depth: s
  };
}, kc = function(e, t) {
  for (var {
    children: n,
    depth: a
  } = Sc(e), r = 0, l = 0; l < n.length; l++) {
    var i = n[l];
    if (i.type === "elem") {
      var o = i.elem;
      r = Math.max(r, o.maxFontSize, o.height);
    }
  }
  r += 2;
  var s = Je(["pstrut"], []);
  s.style.height = K(r);
  for (var c = [], m = a, f = a, v = a, g = 0; g < n.length; g++) {
    var p = n[g];
    if (p.type === "kern")
      v += p.size;
    else {
      var b = p.elem, x = p.wrapperClasses || [], S = p.wrapperStyle || {}, A = Je(x, [s, b], void 0, S);
      A.style.top = K(-r - v - b.depth), p.marginLeft && (A.style.marginLeft = p.marginLeft), p.marginRight && (A.style.marginRight = p.marginRight), c.push(A), v += b.height + b.depth;
    }
    m = Math.min(m, v), f = Math.max(f, v);
  }
  var V = Je(["vlist"], c);
  V.style.height = K(f);
  var P;
  if (m < 0) {
    var z = Je([], []), _ = Je(["vlist"], [z]);
    _.style.height = K(-m);
    var O = Je(["vlist-s"], [new mt("​")]);
    P = [Je(["vlist-r"], [V, O]), Je(["vlist-r"], [_])];
  } else
    P = [Je(["vlist-r"], [V])];
  var B = Je(["vlist-t"], P);
  return P.length === 2 && B.classes.push("vlist-t2"), B.height = f, B.depth = -m, B;
}, Cc = (e, t) => {
  var n = Je(["mspace"], [], t), a = Pe(e, t);
  return n.style.marginRight = K(a), n;
}, g0 = function(e, t, n) {
  var a = "";
  switch (e) {
    case "amsrm":
      a = "AMS";
      break;
    case "textrm":
      a = "Main";
      break;
    case "textsf":
      a = "SansSerif";
      break;
    case "texttt":
      a = "Typewriter";
      break;
    default:
      a = e;
  }
  var r;
  return t === "textbf" && n === "textit" ? r = "BoldItalic" : t === "textbf" ? r = "Bold" : t === "textit" ? r = "Italic" : r = "Regular", a + "-" + r;
}, Fi = {
  // styles
  mathbf: {
    variant: "bold",
    fontName: "Main-Bold"
  },
  mathrm: {
    variant: "normal",
    fontName: "Main-Regular"
  },
  textit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathnormal: {
    variant: "italic",
    fontName: "Math-Italic"
  },
  // "boldsymbol" is missing because they require the use of multiple fonts:
  // Math-BoldItalic and Main-Bold.  This is handled by a special case in
  // makeOrd which ends up calling boldsymbol.
  // families
  mathbb: {
    variant: "double-struck",
    fontName: "AMS-Regular"
  },
  mathcal: {
    variant: "script",
    fontName: "Caligraphic-Regular"
  },
  mathfrak: {
    variant: "fraktur",
    fontName: "Fraktur-Regular"
  },
  mathscr: {
    variant: "script",
    fontName: "Script-Regular"
  },
  mathsf: {
    variant: "sans-serif",
    fontName: "SansSerif-Regular"
  },
  mathtt: {
    variant: "monospace",
    fontName: "Typewriter-Regular"
  }
}, qi = {
  //   path, width, height
  vec: ["vec", 0.471, 0.714],
  // values from the font glyph
  oiintSize1: ["oiintSize1", 0.957, 0.499],
  // oval to overlay the integrand
  oiintSize2: ["oiintSize2", 1.472, 0.659],
  oiiintSize1: ["oiiintSize1", 1.304, 0.499],
  oiiintSize2: ["oiiintSize2", 1.98, 0.659]
}, Ac = function(e, t) {
  var [n, a, r] = qi[e], l = new en(n), i = new Nt([l], {
    width: K(a),
    height: K(r),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + K(a),
    viewBox: "0 0 " + 1e3 * a + " " + 1e3 * r,
    preserveAspectRatio: "xMinYMin"
  }), o = Ni(["overlay"], [i], t);
  return o.height = r, o.style.height = K(r), o.style.width = K(a), o;
}, I = {
  fontMap: Fi,
  makeSymbol: vt,
  mathsym: fc,
  makeSpan: Je,
  makeSvgSpan: Ni,
  makeLineSpan: bc,
  makeAnchor: xc,
  makeFragment: Di,
  wrapFragment: wc,
  makeVList: kc,
  makeOrd: gc,
  makeGlue: Cc,
  staticSvg: Ac,
  svgData: qi,
  tryCombineChars: yc
}, ze = {
  number: 3,
  unit: "mu"
}, mn = {
  number: 4,
  unit: "mu"
}, Vt = {
  number: 5,
  unit: "mu"
}, Mc = {
  mord: {
    mop: ze,
    mbin: mn,
    mrel: Vt,
    minner: ze
  },
  mop: {
    mord: ze,
    mop: ze,
    mrel: Vt,
    minner: ze
  },
  mbin: {
    mord: mn,
    mop: mn,
    mopen: mn,
    minner: mn
  },
  mrel: {
    mord: Vt,
    mop: Vt,
    mopen: Vt,
    minner: Vt
  },
  mopen: {},
  mclose: {
    mop: ze,
    mbin: mn,
    mrel: Vt,
    minner: ze
  },
  mpunct: {
    mord: ze,
    mop: ze,
    mrel: Vt,
    mopen: ze,
    mclose: ze,
    mpunct: ze,
    minner: ze
  },
  minner: {
    mord: ze,
    mop: ze,
    mbin: mn,
    mrel: Vt,
    mopen: ze,
    mpunct: ze,
    minner: ze
  }
}, Tc = {
  mord: {
    mop: ze
  },
  mop: {
    mord: ze,
    mop: ze
  },
  mbin: {},
  mrel: {},
  mopen: {},
  mclose: {
    mop: ze
  },
  mpunct: {},
  minner: {
    mop: ze
  }
}, Hi = {}, _0 = {}, L0 = {};
function X(e) {
  for (var {
    type: t,
    names: n,
    props: a,
    handler: r,
    htmlBuilder: l,
    mathmlBuilder: i
  } = e, o = {
    type: t,
    numArgs: a.numArgs,
    argTypes: a.argTypes,
    allowedInArgument: !!a.allowedInArgument,
    allowedInText: !!a.allowedInText,
    allowedInMath: a.allowedInMath === void 0 ? !0 : a.allowedInMath,
    numOptionalArgs: a.numOptionalArgs || 0,
    infix: !!a.infix,
    primitive: !!a.primitive,
    handler: r
  }, s = 0; s < n.length; ++s)
    Hi[n[s]] = o;
  t && (l && (_0[t] = l), i && (L0[t] = i));
}
function yn(e) {
  var {
    type: t,
    htmlBuilder: n,
    mathmlBuilder: a
  } = e;
  X({
    type: t,
    names: [],
    props: {
      numArgs: 0
    },
    handler() {
      throw new Error("Should never be called.");
    },
    htmlBuilder: n,
    mathmlBuilder: a
  });
}
var R0 = function(e) {
  return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, Oe = function(e) {
  return e.type === "ordgroup" ? e.body : [e];
}, Dt = I.makeSpan, Bc = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"], Ic = ["rightmost", "mrel", "mclose", "mpunct"], zc = {
  display: ie.DISPLAY,
  text: ie.TEXT,
  script: ie.SCRIPT,
  scriptscript: ie.SCRIPTSCRIPT
}, Pc = {
  mord: "mord",
  mop: "mop",
  mbin: "mbin",
  mrel: "mrel",
  mopen: "mopen",
  mclose: "mclose",
  mpunct: "mpunct",
  minner: "minner"
}, Fe = function(e, t, n, a) {
  a === void 0 && (a = [null, null]);
  for (var r = [], l = 0; l < e.length; l++) {
    var i = xe(e[l], t);
    if (i instanceof r0) {
      var o = i.children;
      r.push(...o);
    } else
      r.push(i);
  }
  if (I.tryCombineChars(r), !n)
    return r;
  var s = t;
  if (e.length === 1) {
    var c = e[0];
    c.type === "sizing" ? s = t.havingSize(c.size) : c.type === "styling" && (s = t.havingStyle(zc[c.style]));
  }
  var m = Dt([a[0] || "leftmost"], [], t), f = Dt([a[1] || "rightmost"], [], t), v = n === "root";
  return ul(r, (g, p) => {
    var b = p.classes[0], x = g.classes[0];
    b === "mbin" && ne.contains(Ic, x) ? p.classes[0] = "mord" : x === "mbin" && ne.contains(Bc, b) && (g.classes[0] = "mord");
  }, {
    node: m
  }, f, v), ul(r, (g, p) => {
    var b = Ga(p), x = Ga(g), S = b && x ? g.hasClass("mtight") ? Tc[b][x] : Mc[b][x] : null;
    if (S)
      return I.makeGlue(S, s);
  }, {
    node: m
  }, f, v), r;
}, ul = function e(t, n, a, r, l) {
  r && t.push(r);
  for (var i = 0; i < t.length; i++) {
    var o = t[i], s = $i(o);
    if (s) {
      e(s.children, n, a, null, l);
      continue;
    }
    var c = !o.hasClass("mspace");
    if (c) {
      var m = n(o, a.node);
      m && (a.insertAfter ? a.insertAfter(m) : (t.unshift(m), i++));
    }
    c ? a.node = o : l && o.hasClass("newline") && (a.node = Dt(["leftmost"])), a.insertAfter = /* @__PURE__ */ ((f) => (v) => {
      t.splice(f + 1, 0, v), i++;
    })(i);
  }
  r && t.pop();
}, $i = function(e) {
  return e instanceof r0 || e instanceof vr || e instanceof l0 && e.hasClass("enclosing") ? e : null;
}, Vc = function e(t, n) {
  var a = $i(t);
  if (a) {
    var r = a.children;
    if (r.length) {
      if (n === "right")
        return e(r[r.length - 1], "right");
      if (n === "left")
        return e(r[0], "left");
    }
  }
  return t;
}, Ga = function(e, t) {
  return e ? (t && (e = Vc(e, t)), Pc[e.classes[0]] || null) : null;
}, Xn = function(e, t) {
  var n = ["nulldelimiter"].concat(e.baseSizingClasses());
  return Dt(t.concat(n));
}, xe = function(e, t, n) {
  if (!e)
    return Dt();
  if (_0[e.type]) {
    var a = _0[e.type](e, t);
    if (n && t.size !== n.size) {
      a = Dt(t.sizingClasses(n), [a], t);
      var r = t.sizeMultiplier / n.sizeMultiplier;
      a.height *= r, a.depth *= r;
    }
    return a;
  } else
    throw new W("Got group of unknown type: '" + e.type + "'");
};
function p0(e, t) {
  var n = Dt(["base"], e, t), a = Dt(["strut"]);
  return a.style.height = K(n.height + n.depth), n.depth && (a.style.verticalAlign = K(-n.depth)), n.children.unshift(a), n;
}
function Wa(e, t) {
  var n = null;
  e.length === 1 && e[0].type === "tag" && (n = e[0].tag, e = e[0].body);
  var a = Fe(e, t, "root"), r;
  a.length === 2 && a[1].hasClass("tag") && (r = a.pop());
  for (var l = [], i = [], o = 0; o < a.length; o++)
    if (i.push(a[o]), a[o].hasClass("mbin") || a[o].hasClass("mrel") || a[o].hasClass("allowbreak")) {
      for (var s = !1; o < a.length - 1 && a[o + 1].hasClass("mspace") && !a[o + 1].hasClass("newline"); )
        o++, i.push(a[o]), a[o].hasClass("nobreak") && (s = !0);
      s || (l.push(p0(i, t)), i = []);
    } else a[o].hasClass("newline") && (i.pop(), i.length > 0 && (l.push(p0(i, t)), i = []), l.push(a[o]));
  i.length > 0 && l.push(p0(i, t));
  var c;
  n ? (c = p0(Fe(n, t, !0)), c.classes = ["tag"], l.push(c)) : r && l.push(r);
  var m = Dt(["katex-html"], l);
  if (m.setAttribute("aria-hidden", "true"), c) {
    var f = c.children[0];
    f.style.height = K(m.height + m.depth), m.depth && (f.style.verticalAlign = K(-m.depth));
  }
  return m;
}
function Gi(e) {
  return new r0(e);
}
class st {
  constructor(t, n, a) {
    this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = t, this.attributes = {}, this.children = n || [], this.classes = a || [];
  }
  /**
   * Sets an attribute on a MathML node. MathML depends on attributes to convey a
   * semantic content, so this is used heavily.
   */
  setAttribute(t, n) {
    this.attributes[t] = n;
  }
  /**
   * Gets an attribute on a MathML node.
   */
  getAttribute(t) {
    return this.attributes[t];
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    var t = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
    for (var n in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, n) && t.setAttribute(n, this.attributes[n]);
    this.classes.length > 0 && (t.className = Jt(this.classes));
    for (var a = 0; a < this.children.length; a++)
      t.appendChild(this.children[a].toNode());
    return t;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    var t = "<" + this.type;
    for (var n in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, n) && (t += " " + n + '="', t += ne.escape(this.attributes[n]), t += '"');
    this.classes.length > 0 && (t += ' class ="' + ne.escape(Jt(this.classes)) + '"'), t += ">";
    for (var a = 0; a < this.children.length; a++)
      t += this.children[a].toMarkup();
    return t += "</" + this.type + ">", t;
  }
  /**
   * Converts the math node into a string, similar to innerText, but escaped.
   */
  toText() {
    return this.children.map((t) => t.toText()).join("");
  }
}
class jn {
  constructor(t) {
    this.text = void 0, this.text = t;
  }
  /**
   * Converts the text node into a DOM text node.
   */
  toNode() {
    return document.createTextNode(this.text);
  }
  /**
   * Converts the text node into escaped HTML markup
   * (representing the text itself).
   */
  toMarkup() {
    return ne.escape(this.toText());
  }
  /**
   * Converts the text node into a string
   * (representing the text itself).
   */
  toText() {
    return this.text;
  }
}
class Ec {
  /**
   * Create a Space node with width given in CSS ems.
   */
  constructor(t) {
    this.width = void 0, this.character = void 0, this.width = t, t >= 0.05555 && t <= 0.05556 ? this.character = " " : t >= 0.1666 && t <= 0.1667 ? this.character = " " : t >= 0.2222 && t <= 0.2223 ? this.character = " " : t >= 0.2777 && t <= 0.2778 ? this.character = "  " : t >= -0.05556 && t <= -0.05555 ? this.character = " ⁣" : t >= -0.1667 && t <= -0.1666 ? this.character = " ⁣" : t >= -0.2223 && t <= -0.2222 ? this.character = " ⁣" : t >= -0.2778 && t <= -0.2777 ? this.character = " ⁣" : this.character = null;
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    if (this.character)
      return document.createTextNode(this.character);
    var t = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
    return t.setAttribute("width", K(this.width)), t;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + K(this.width) + '"/>';
  }
  /**
   * Converts the math node into a string, similar to innerText.
   */
  toText() {
    return this.character ? this.character : " ";
  }
}
var G = {
  MathNode: st,
  TextNode: jn,
  SpaceNode: Ec,
  newDocumentFragment: Gi
}, ht = function(e, t, n) {
  return Me[t][e] && Me[t][e].replace && e.charCodeAt(0) !== 55349 && !(Ri.hasOwnProperty(e) && n && (n.fontFamily && n.fontFamily.slice(4, 6) === "tt" || n.font && n.font.slice(4, 6) === "tt")) && (e = Me[t][e].replace), new G.TextNode(e);
}, pr = function(e) {
  return e.length === 1 ? e[0] : new G.MathNode("mrow", e);
}, yr = function(e, t) {
  if (t.fontFamily === "texttt")
    return "monospace";
  if (t.fontFamily === "textsf")
    return t.fontShape === "textit" && t.fontWeight === "textbf" ? "sans-serif-bold-italic" : t.fontShape === "textit" ? "sans-serif-italic" : t.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
  if (t.fontShape === "textit" && t.fontWeight === "textbf")
    return "bold-italic";
  if (t.fontShape === "textit")
    return "italic";
  if (t.fontWeight === "textbf")
    return "bold";
  var n = t.font;
  if (!n || n === "mathnormal")
    return null;
  var a = e.mode;
  if (n === "mathit")
    return "italic";
  if (n === "boldsymbol")
    return e.type === "textord" ? "bold" : "bold-italic";
  if (n === "mathbf")
    return "bold";
  if (n === "mathbb")
    return "double-struck";
  if (n === "mathfrak")
    return "fraktur";
  if (n === "mathscr" || n === "mathcal")
    return "script";
  if (n === "mathsf")
    return "sans-serif";
  if (n === "mathtt")
    return "monospace";
  var r = e.text;
  if (ne.contains(["\\imath", "\\jmath"], r))
    return null;
  Me[a][r] && Me[a][r].replace && (r = Me[a][r].replace);
  var l = I.fontMap[n].fontName;
  return fr(r, l, a) ? I.fontMap[n].variant : null;
}, at = function(e, t, n) {
  if (e.length === 1) {
    var a = Ae(e[0], t);
    return n && a instanceof st && a.type === "mo" && (a.setAttribute("lspace", "0em"), a.setAttribute("rspace", "0em")), [a];
  }
  for (var r = [], l, i = 0; i < e.length; i++) {
    var o = Ae(e[i], t);
    if (o instanceof st && l instanceof st) {
      if (o.type === "mtext" && l.type === "mtext" && o.getAttribute("mathvariant") === l.getAttribute("mathvariant")) {
        l.children.push(...o.children);
        continue;
      } else if (o.type === "mn" && l.type === "mn") {
        l.children.push(...o.children);
        continue;
      } else if (o.type === "mi" && o.children.length === 1 && l.type === "mn") {
        var s = o.children[0];
        if (s instanceof jn && s.text === ".") {
          l.children.push(...o.children);
          continue;
        }
      } else if (l.type === "mi" && l.children.length === 1) {
        var c = l.children[0];
        if (c instanceof jn && c.text === "̸" && (o.type === "mo" || o.type === "mi" || o.type === "mn")) {
          var m = o.children[0];
          m instanceof jn && m.text.length > 0 && (m.text = m.text.slice(0, 1) + "̸" + m.text.slice(1), r.pop());
        }
      }
    }
    r.push(o), l = o;
  }
  return r;
}, tn = function(e, t, n) {
  return pr(at(e, t, n));
}, Ae = function(e, t) {
  if (!e)
    return new G.MathNode("mrow");
  if (L0[e.type]) {
    var n = L0[e.type](e, t);
    return n;
  } else
    throw new W("Got group of unknown type: '" + e.type + "'");
};
function cl(e, t, n, a, r) {
  var l = at(e, n), i;
  l.length === 1 && l[0] instanceof st && ne.contains(["mrow", "mtable"], l[0].type) ? i = l[0] : i = new G.MathNode("mrow", l);
  var o = new G.MathNode("annotation", [new G.TextNode(t)]);
  o.setAttribute("encoding", "application/x-tex");
  var s = new G.MathNode("semantics", [i, o]), c = new G.MathNode("math", [s]);
  c.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), a && c.setAttribute("display", "block");
  var m = r ? "katex" : "katex-mathml";
  return I.makeSpan([m], [c]);
}
var Wi = function(e) {
  return new Ot({
    style: e.displayMode ? ie.DISPLAY : ie.TEXT,
    maxSize: e.maxSize,
    minRuleThickness: e.minRuleThickness
  });
}, ji = function(e, t) {
  if (t.displayMode) {
    var n = ["katex-display"];
    t.leqno && n.push("leqno"), t.fleqn && n.push("fleqn"), e = I.makeSpan(n, [e]);
  }
  return e;
}, Oc = function(e, t, n) {
  var a = Wi(n), r;
  if (n.output === "mathml")
    return cl(e, t, a, n.displayMode, !0);
  if (n.output === "html") {
    var l = Wa(e, a);
    r = I.makeSpan(["katex"], [l]);
  } else {
    var i = cl(e, t, a, n.displayMode, !1), o = Wa(e, a);
    r = I.makeSpan(["katex"], [i, o]);
  }
  return ji(r, n);
}, _c = function(e, t, n) {
  var a = Wi(n), r = Wa(e, a), l = I.makeSpan(["katex"], [r]);
  return ji(l, n);
}, Lc = {
  widehat: "^",
  widecheck: "ˇ",
  widetilde: "~",
  utilde: "~",
  overleftarrow: "←",
  underleftarrow: "←",
  xleftarrow: "←",
  overrightarrow: "→",
  underrightarrow: "→",
  xrightarrow: "→",
  underbrace: "⏟",
  overbrace: "⏞",
  overgroup: "⏠",
  undergroup: "⏡",
  overleftrightarrow: "↔",
  underleftrightarrow: "↔",
  xleftrightarrow: "↔",
  Overrightarrow: "⇒",
  xRightarrow: "⇒",
  overleftharpoon: "↼",
  xleftharpoonup: "↼",
  overrightharpoon: "⇀",
  xrightharpoonup: "⇀",
  xLeftarrow: "⇐",
  xLeftrightarrow: "⇔",
  xhookleftarrow: "↩",
  xhookrightarrow: "↪",
  xmapsto: "↦",
  xrightharpoondown: "⇁",
  xleftharpoondown: "↽",
  xrightleftharpoons: "⇌",
  xleftrightharpoons: "⇋",
  xtwoheadleftarrow: "↞",
  xtwoheadrightarrow: "↠",
  xlongequal: "=",
  xtofrom: "⇄",
  xrightleftarrows: "⇄",
  xrightequilibrium: "⇌",
  // Not a perfect match.
  xleftequilibrium: "⇋",
  // None better available.
  "\\cdrightarrow": "→",
  "\\cdleftarrow": "←",
  "\\cdlongequal": "="
}, Rc = function(e) {
  var t = new G.MathNode("mo", [new G.TextNode(Lc[e.replace(/^\\/, "")])]);
  return t.setAttribute("stretchy", "true"), t;
}, Nc = {
  //   path(s), minWidth, height, align
  overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
  "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
  // CD minwwidth2.5pc
  xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
  "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
  Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
  xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
  xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
  overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
  overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
  xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
  "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
  xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
  xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
  overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
  underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
  underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
  xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
  xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
  xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
  xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
  xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
  overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
  undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
  xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
  xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
  // The next three arrows are from the mhchem package.
  // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
  // document as \xrightarrow or \xrightleftharpoons. Those have
  // min-length = 1.75em, so we set min-length on these next three to match.
  xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
  xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
  xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
}, Dc = function(e) {
  return e.type === "ordgroup" ? e.body.length : 1;
}, Fc = function(e, t) {
  function n() {
    var i = 4e5, o = e.label.slice(1);
    if (ne.contains(["widehat", "widecheck", "widetilde", "utilde"], o)) {
      var s = e, c = Dc(s.base), m, f, v;
      if (c > 5)
        o === "widehat" || o === "widecheck" ? (m = 420, i = 2364, v = 0.42, f = o + "4") : (m = 312, i = 2340, v = 0.34, f = "tilde4");
      else {
        var g = [1, 1, 2, 2, 3, 3][c];
        o === "widehat" || o === "widecheck" ? (i = [0, 1062, 2364, 2364, 2364][g], m = [0, 239, 300, 360, 420][g], v = [0, 0.24, 0.3, 0.3, 0.36, 0.42][g], f = o + g) : (i = [0, 600, 1033, 2339, 2340][g], m = [0, 260, 286, 306, 312][g], v = [0, 0.26, 0.286, 0.3, 0.306, 0.34][g], f = "tilde" + g);
      }
      var p = new en(f), b = new Nt([p], {
        width: "100%",
        height: K(v),
        viewBox: "0 0 " + i + " " + m,
        preserveAspectRatio: "none"
      });
      return {
        span: I.makeSvgSpan([], [b], t),
        minWidth: 0,
        height: v
      };
    } else {
      var x = [], S = Nc[o], [A, V, P] = S, z = P / 1e3, _ = A.length, O, B;
      if (_ === 1) {
        var E = S[3];
        O = ["hide-tail"], B = [E];
      } else if (_ === 2)
        O = ["halfarrow-left", "halfarrow-right"], B = ["xMinYMin", "xMaxYMin"];
      else if (_ === 3)
        O = ["brace-left", "brace-center", "brace-right"], B = ["xMinYMin", "xMidYMin", "xMaxYMin"];
      else
        throw new Error(`Correct katexImagesData or update code here to support
                    ` + _ + " children.");
      for (var j = 0; j < _; j++) {
        var F = new en(A[j]), L = new Nt([F], {
          width: "400em",
          height: K(z),
          viewBox: "0 0 " + i + " " + P,
          preserveAspectRatio: B[j] + " slice"
        }), D = I.makeSvgSpan([O[j]], [L], t);
        if (_ === 1)
          return {
            span: D,
            minWidth: V,
            height: z
          };
        D.style.height = K(z), x.push(D);
      }
      return {
        span: I.makeSpan(["stretchy"], x, t),
        minWidth: V,
        height: z
      };
    }
  }
  var {
    span: a,
    minWidth: r,
    height: l
  } = n();
  return a.height = l, a.style.height = K(l), r > 0 && (a.style.minWidth = K(r)), a;
}, qc = function(e, t, n, a, r) {
  var l, i = e.height + e.depth + n + a;
  if (/fbox|color|angl/.test(t)) {
    if (l = I.makeSpan(["stretchy", t], [], r), t === "fbox") {
      var o = r.color && r.getColor();
      o && (l.style.borderColor = o);
    }
  } else {
    var s = [];
    /^[bx]cancel$/.test(t) && s.push(new Ha({
      x1: "0",
      y1: "0",
      x2: "100%",
      y2: "100%",
      "stroke-width": "0.046em"
    })), /^x?cancel$/.test(t) && s.push(new Ha({
      x1: "0",
      y1: "100%",
      x2: "100%",
      y2: "0",
      "stroke-width": "0.046em"
    }));
    var c = new Nt(s, {
      width: "100%",
      height: K(i)
    });
    l = I.makeSvgSpan([], [c], r);
  }
  return l.height = i, l.style.height = K(i), l;
}, Ft = {
  encloseSpan: qc,
  mathMLnode: Rc,
  svgSpan: Fc
};
function fe(e, t) {
  if (!e || e.type !== t)
    throw new Error("Expected node of type " + t + ", but got " + (e ? "node of type " + e.type : String(e)));
  return e;
}
function br(e) {
  var t = J0(e);
  if (!t)
    throw new Error("Expected node of symbol group type, but got " + (e ? "node of type " + e.type : String(e)));
  return t;
}
function J0(e) {
  return e && (e.type === "atom" || mc.hasOwnProperty(e.type)) ? e : null;
}
var xr = (e, t) => {
  var n, a, r;
  e && e.type === "supsub" ? (a = fe(e.base, "accent"), n = a.base, e.base = n, r = cc(xe(e, t)), e.base = a) : (a = fe(e, "accent"), n = a.base);
  var l = xe(n, t.havingCrampedStyle()), i = a.isShifty && ne.isCharacterBox(n), o = 0;
  if (i) {
    var s = ne.getBaseElem(n), c = xe(s, t.havingCrampedStyle());
    o = al(c).skew;
  }
  var m = a.label === "\\c", f = m ? l.height + l.depth : Math.min(l.height, t.fontMetrics().xHeight), v;
  if (a.isStretchy)
    v = Ft.svgSpan(a, t), v = I.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: l
      }, {
        type: "elem",
        elem: v,
        wrapperClasses: ["svg-align"],
        wrapperStyle: o > 0 ? {
          width: "calc(100% - " + K(2 * o) + ")",
          marginLeft: K(2 * o)
        } : void 0
      }]
    }, t);
  else {
    var g, p;
    a.label === "\\vec" ? (g = I.staticSvg("vec", t), p = I.svgData.vec[1]) : (g = I.makeOrd({
      mode: a.mode,
      text: a.label
    }, t, "textord"), g = al(g), g.italic = 0, p = g.width, m && (f += g.depth)), v = I.makeSpan(["accent-body"], [g]);
    var b = a.label === "\\textcircled";
    b && (v.classes.push("accent-full"), f = l.height);
    var x = o;
    b || (x -= p / 2), v.style.left = K(x), a.label === "\\textcircled" && (v.style.top = ".2em"), v = I.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: l
      }, {
        type: "kern",
        size: -f
      }, {
        type: "elem",
        elem: v
      }]
    }, t);
  }
  var S = I.makeSpan(["mord", "accent"], [v], t);
  return r ? (r.children[0] = S, r.height = Math.max(S.height, r.height), r.classes[0] = "mord", r) : S;
}, Ui = (e, t) => {
  var n = e.isStretchy ? Ft.mathMLnode(e.label) : new G.MathNode("mo", [ht(e.label, e.mode)]), a = new G.MathNode("mover", [Ae(e.base, t), n]);
  return a.setAttribute("accent", "true"), a;
}, Hc = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((e) => "\\" + e).join("|"));
X({
  type: "accent",
  names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
  props: {
    numArgs: 1
  },
  handler: (e, t) => {
    var n = R0(t[0]), a = !Hc.test(e.funcName), r = !a || e.funcName === "\\widehat" || e.funcName === "\\widetilde" || e.funcName === "\\widecheck";
    return {
      type: "accent",
      mode: e.parser.mode,
      label: e.funcName,
      isStretchy: a,
      isShifty: r,
      base: n
    };
  },
  htmlBuilder: xr,
  mathmlBuilder: Ui
});
X({
  type: "accent",
  names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
  props: {
    numArgs: 1,
    allowedInText: !0,
    allowedInMath: !0,
    // unless in strict mode
    argTypes: ["primitive"]
  },
  handler: (e, t) => {
    var n = t[0], a = e.parser.mode;
    return a === "math" && (e.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + e.funcName + " works only in text mode"), a = "text"), {
      type: "accent",
      mode: a,
      label: e.funcName,
      isStretchy: !1,
      isShifty: !0,
      base: n
    };
  },
  htmlBuilder: xr,
  mathmlBuilder: Ui
});
X({
  type: "accentUnder",
  names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
  props: {
    numArgs: 1
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0];
    return {
      type: "accentUnder",
      mode: n.mode,
      label: a,
      base: r
    };
  },
  htmlBuilder: (e, t) => {
    var n = xe(e.base, t), a = Ft.svgSpan(e, t), r = e.label === "\\utilde" ? 0.12 : 0, l = I.makeVList({
      positionType: "top",
      positionData: n.height,
      children: [{
        type: "elem",
        elem: a,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: r
      }, {
        type: "elem",
        elem: n
      }]
    }, t);
    return I.makeSpan(["mord", "accentunder"], [l], t);
  },
  mathmlBuilder: (e, t) => {
    var n = Ft.mathMLnode(e.label), a = new G.MathNode("munder", [Ae(e.base, t), n]);
    return a.setAttribute("accentunder", "true"), a;
  }
});
var y0 = (e) => {
  var t = new G.MathNode("mpadded", e ? [e] : []);
  return t.setAttribute("width", "+0.6em"), t.setAttribute("lspace", "0.3em"), t;
};
X({
  type: "xArrow",
  names: [
    "\\xleftarrow",
    "\\xrightarrow",
    "\\xLeftarrow",
    "\\xRightarrow",
    "\\xleftrightarrow",
    "\\xLeftrightarrow",
    "\\xhookleftarrow",
    "\\xhookrightarrow",
    "\\xmapsto",
    "\\xrightharpoondown",
    "\\xrightharpoonup",
    "\\xleftharpoondown",
    "\\xleftharpoonup",
    "\\xrightleftharpoons",
    "\\xleftrightharpoons",
    "\\xlongequal",
    "\\xtwoheadrightarrow",
    "\\xtwoheadleftarrow",
    "\\xtofrom",
    // The next 3 functions are here to support the mhchem extension.
    // Direct use of these functions is discouraged and may break someday.
    "\\xrightleftarrows",
    "\\xrightequilibrium",
    "\\xleftequilibrium",
    // The next 3 functions are here only to support the {CD} environment.
    "\\\\cdrightarrow",
    "\\\\cdleftarrow",
    "\\\\cdlongequal"
  ],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler(e, t, n) {
    var {
      parser: a,
      funcName: r
    } = e;
    return {
      type: "xArrow",
      mode: a.mode,
      label: r,
      body: t[0],
      below: n[0]
    };
  },
  // Flow is unable to correctly infer the type of `group`, even though it's
  // unambiguously determined from the passed-in `type` above.
  htmlBuilder(e, t) {
    var n = t.style, a = t.havingStyle(n.sup()), r = I.wrapFragment(xe(e.body, a, t), t), l = e.label.slice(0, 2) === "\\x" ? "x" : "cd";
    r.classes.push(l + "-arrow-pad");
    var i;
    e.below && (a = t.havingStyle(n.sub()), i = I.wrapFragment(xe(e.below, a, t), t), i.classes.push(l + "-arrow-pad"));
    var o = Ft.svgSpan(e, t), s = -t.fontMetrics().axisHeight + 0.5 * o.height, c = -t.fontMetrics().axisHeight - 0.5 * o.height - 0.111;
    (r.depth > 0.25 || e.label === "\\xleftequilibrium") && (c -= r.depth);
    var m;
    if (i) {
      var f = -t.fontMetrics().axisHeight + i.height + 0.5 * o.height + 0.111;
      m = I.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: r,
          shift: c
        }, {
          type: "elem",
          elem: o,
          shift: s
        }, {
          type: "elem",
          elem: i,
          shift: f
        }]
      }, t);
    } else
      m = I.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: r,
          shift: c
        }, {
          type: "elem",
          elem: o,
          shift: s
        }]
      }, t);
    return m.children[0].children[0].children[1].classes.push("svg-align"), I.makeSpan(["mrel", "x-arrow"], [m], t);
  },
  mathmlBuilder(e, t) {
    var n = Ft.mathMLnode(e.label);
    n.setAttribute("minsize", e.label.charAt(0) === "x" ? "1.75em" : "3.0em");
    var a;
    if (e.body) {
      var r = y0(Ae(e.body, t));
      if (e.below) {
        var l = y0(Ae(e.below, t));
        a = new G.MathNode("munderover", [n, l, r]);
      } else
        a = new G.MathNode("mover", [n, r]);
    } else if (e.below) {
      var i = y0(Ae(e.below, t));
      a = new G.MathNode("munder", [n, i]);
    } else
      a = y0(), a = new G.MathNode("mover", [n, a]);
    return a;
  }
});
var $c = I.makeSpan;
function Yi(e, t) {
  var n = Fe(e.body, t, !0);
  return $c([e.mclass], n, t);
}
function Ki(e, t) {
  var n, a = at(e.body, t);
  return e.mclass === "minner" ? n = new G.MathNode("mpadded", a) : e.mclass === "mord" ? e.isCharacterBox ? (n = a[0], n.type = "mi") : n = new G.MathNode("mi", a) : (e.isCharacterBox ? (n = a[0], n.type = "mo") : n = new G.MathNode("mo", a), e.mclass === "mbin" ? (n.attributes.lspace = "0.22em", n.attributes.rspace = "0.22em") : e.mclass === "mpunct" ? (n.attributes.lspace = "0em", n.attributes.rspace = "0.17em") : e.mclass === "mopen" || e.mclass === "mclose" ? (n.attributes.lspace = "0em", n.attributes.rspace = "0em") : e.mclass === "minner" && (n.attributes.lspace = "0.0556em", n.attributes.width = "+0.1111em")), n;
}
X({
  type: "mclass",
  names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0];
    return {
      type: "mclass",
      mode: n.mode,
      mclass: "m" + a.slice(5),
      // TODO(kevinb): don't prefix with 'm'
      body: Oe(r),
      isCharacterBox: ne.isCharacterBox(r)
    };
  },
  htmlBuilder: Yi,
  mathmlBuilder: Ki
});
var ea = (e) => {
  var t = e.type === "ordgroup" && e.body.length ? e.body[0] : e;
  return t.type === "atom" && (t.family === "bin" || t.family === "rel") ? "m" + t.family : "mord";
};
X({
  type: "mclass",
  names: ["\\@binrel"],
  props: {
    numArgs: 2
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "mclass",
      mode: n.mode,
      mclass: ea(t[0]),
      body: Oe(t[1]),
      isCharacterBox: ne.isCharacterBox(t[1])
    };
  }
});
X({
  type: "mclass",
  names: ["\\stackrel", "\\overset", "\\underset"],
  props: {
    numArgs: 2
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e, r = t[1], l = t[0], i;
    a !== "\\stackrel" ? i = ea(r) : i = "mrel";
    var o = {
      type: "op",
      mode: r.mode,
      limits: !0,
      alwaysHandleSupSub: !0,
      parentIsSupSub: !1,
      symbol: !1,
      suppressBaseShift: a !== "\\stackrel",
      body: Oe(r)
    }, s = {
      type: "supsub",
      mode: l.mode,
      base: o,
      sup: a === "\\underset" ? null : l,
      sub: a === "\\underset" ? l : null
    };
    return {
      type: "mclass",
      mode: n.mode,
      mclass: i,
      body: [s],
      isCharacterBox: ne.isCharacterBox(s)
    };
  },
  htmlBuilder: Yi,
  mathmlBuilder: Ki
});
X({
  type: "pmb",
  names: ["\\pmb"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "pmb",
      mode: n.mode,
      mclass: ea(t[0]),
      body: Oe(t[0])
    };
  },
  htmlBuilder(e, t) {
    var n = Fe(e.body, t, !0), a = I.makeSpan([e.mclass], n, t);
    return a.style.textShadow = "0.02em 0.01em 0.04px", a;
  },
  mathmlBuilder(e, t) {
    var n = at(e.body, t), a = new G.MathNode("mstyle", n);
    return a.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), a;
  }
});
var Gc = {
  ">": "\\\\cdrightarrow",
  "<": "\\\\cdleftarrow",
  "=": "\\\\cdlongequal",
  A: "\\uparrow",
  V: "\\downarrow",
  "|": "\\Vert",
  ".": "no arrow"
}, dl = () => ({
  type: "styling",
  body: [],
  mode: "math",
  style: "display"
}), ml = (e) => e.type === "textord" && e.text === "@", Wc = (e, t) => (e.type === "mathord" || e.type === "atom") && e.text === t;
function jc(e, t, n) {
  var a = Gc[e];
  switch (a) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return n.callFunction(a, [t[0]], [t[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var r = n.callFunction("\\\\cdleft", [t[0]], []), l = {
        type: "atom",
        text: a,
        mode: "math",
        family: "rel"
      }, i = n.callFunction("\\Big", [l], []), o = n.callFunction("\\\\cdright", [t[1]], []), s = {
        type: "ordgroup",
        mode: "math",
        body: [r, i, o]
      };
      return n.callFunction("\\\\cdparent", [s], []);
    }
    case "\\\\cdlongequal":
      return n.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var c = {
        type: "textord",
        text: "\\Vert",
        mode: "math"
      };
      return n.callFunction("\\Big", [c], []);
    }
    default:
      return {
        type: "textord",
        text: " ",
        mode: "math"
      };
  }
}
function Uc(e) {
  var t = [];
  for (e.gullet.beginGroup(), e.gullet.macros.set("\\cr", "\\\\\\relax"), e.gullet.beginGroup(); ; ) {
    t.push(e.parseExpression(!1, "\\\\")), e.gullet.endGroup(), e.gullet.beginGroup();
    var n = e.fetch().text;
    if (n === "&" || n === "\\\\")
      e.consume();
    else if (n === "\\end") {
      t[t.length - 1].length === 0 && t.pop();
      break;
    } else
      throw new W("Expected \\\\ or \\cr or \\end", e.nextToken);
  }
  for (var a = [], r = [a], l = 0; l < t.length; l++) {
    for (var i = t[l], o = dl(), s = 0; s < i.length; s++)
      if (!ml(i[s]))
        o.body.push(i[s]);
      else {
        a.push(o), s += 1;
        var c = br(i[s]).text, m = new Array(2);
        if (m[0] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, m[1] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, !("=|.".indexOf(c) > -1)) if ("<>AV".indexOf(c) > -1)
          for (var f = 0; f < 2; f++) {
            for (var v = !0, g = s + 1; g < i.length; g++) {
              if (Wc(i[g], c)) {
                v = !1, s = g;
                break;
              }
              if (ml(i[g]))
                throw new W("Missing a " + c + " character to complete a CD arrow.", i[g]);
              m[f].body.push(i[g]);
            }
            if (v)
              throw new W("Missing a " + c + " character to complete a CD arrow.", i[s]);
          }
        else
          throw new W('Expected one of "<>AV=|." after @', i[s]);
        var p = jc(c, m, e), b = {
          type: "styling",
          body: [p],
          mode: "math",
          style: "display"
          // CD is always displaystyle.
        };
        a.push(b), o = dl();
      }
    l % 2 === 0 ? a.push(o) : a.shift(), a = [], r.push(a);
  }
  e.gullet.endGroup(), e.gullet.endGroup();
  var x = new Array(r[0].length).fill({
    type: "align",
    align: "c",
    pregap: 0.25,
    // CD package sets \enskip between columns.
    postgap: 0.25
    // So pre and post each get half an \enskip, i.e. 0.25em.
  });
  return {
    type: "array",
    mode: "math",
    body: r,
    arraystretch: 1,
    addJot: !0,
    rowGaps: [null],
    cols: x,
    colSeparationType: "CD",
    hLinesBeforeRow: new Array(r.length + 1).fill([])
  };
}
X({
  type: "cdlabel",
  names: ["\\\\cdleft", "\\\\cdright"],
  props: {
    numArgs: 1
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e;
    return {
      type: "cdlabel",
      mode: n.mode,
      side: a.slice(4),
      label: t[0]
    };
  },
  htmlBuilder(e, t) {
    var n = t.havingStyle(t.style.sup()), a = I.wrapFragment(xe(e.label, n, t), t);
    return a.classes.push("cd-label-" + e.side), a.style.bottom = K(0.8 - a.depth), a.height = 0, a.depth = 0, a;
  },
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mrow", [Ae(e.label, t)]);
    return n = new G.MathNode("mpadded", [n]), n.setAttribute("width", "0"), e.side === "left" && n.setAttribute("lspace", "-1width"), n.setAttribute("voffset", "0.7em"), n = new G.MathNode("mstyle", [n]), n.setAttribute("displaystyle", "false"), n.setAttribute("scriptlevel", "1"), n;
  }
});
X({
  type: "cdlabelparent",
  names: ["\\\\cdparent"],
  props: {
    numArgs: 1
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "cdlabelparent",
      mode: n.mode,
      fragment: t[0]
    };
  },
  htmlBuilder(e, t) {
    var n = I.wrapFragment(xe(e.fragment, t), t);
    return n.classes.push("cd-vert-arrow"), n;
  },
  mathmlBuilder(e, t) {
    return new G.MathNode("mrow", [Ae(e.fragment, t)]);
  }
});
X({
  type: "textord",
  names: ["\\@char"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(e, t) {
    for (var {
      parser: n
    } = e, a = fe(t[0], "ordgroup"), r = a.body, l = "", i = 0; i < r.length; i++) {
      var o = fe(r[i], "textord");
      l += o.text;
    }
    var s = parseInt(l), c;
    if (isNaN(s))
      throw new W("\\@char has non-numeric argument " + l);
    if (s < 0 || s >= 1114111)
      throw new W("\\@char with invalid code point " + l);
    return s <= 65535 ? c = String.fromCharCode(s) : (s -= 65536, c = String.fromCharCode((s >> 10) + 55296, (s & 1023) + 56320)), {
      type: "textord",
      mode: n.mode,
      text: c
    };
  }
});
var Xi = (e, t) => {
  var n = Fe(e.body, t.withColor(e.color), !1);
  return I.makeFragment(n);
}, Zi = (e, t) => {
  var n = at(e.body, t.withColor(e.color)), a = new G.MathNode("mstyle", n);
  return a.setAttribute("mathcolor", e.color), a;
};
X({
  type: "color",
  names: ["\\textcolor"],
  props: {
    numArgs: 2,
    allowedInText: !0,
    argTypes: ["color", "original"]
  },
  handler(e, t) {
    var {
      parser: n
    } = e, a = fe(t[0], "color-token").color, r = t[1];
    return {
      type: "color",
      mode: n.mode,
      color: a,
      body: Oe(r)
    };
  },
  htmlBuilder: Xi,
  mathmlBuilder: Zi
});
X({
  type: "color",
  names: ["\\color"],
  props: {
    numArgs: 1,
    allowedInText: !0,
    argTypes: ["color"]
  },
  handler(e, t) {
    var {
      parser: n,
      breakOnTokenText: a
    } = e, r = fe(t[0], "color-token").color;
    n.gullet.macros.set("\\current@color", r);
    var l = n.parseExpression(!0, a);
    return {
      type: "color",
      mode: n.mode,
      color: r,
      body: l
    };
  },
  htmlBuilder: Xi,
  mathmlBuilder: Zi
});
X({
  type: "cr",
  names: ["\\\\"],
  props: {
    numArgs: 0,
    numOptionalArgs: 0,
    allowedInText: !0
  },
  handler(e, t, n) {
    var {
      parser: a
    } = e, r = a.gullet.future().text === "[" ? a.parseSizeGroup(!0) : null, l = !a.settings.displayMode || !a.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
    return {
      type: "cr",
      mode: a.mode,
      newLine: l,
      size: r && fe(r, "size").value
    };
  },
  // The following builders are called only at the top level,
  // not within tabular/array environments.
  htmlBuilder(e, t) {
    var n = I.makeSpan(["mspace"], [], t);
    return e.newLine && (n.classes.push("newline"), e.size && (n.style.marginTop = K(Pe(e.size, t)))), n;
  },
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mspace");
    return e.newLine && (n.setAttribute("linebreak", "newline"), e.size && n.setAttribute("height", K(Pe(e.size, t)))), n;
  }
});
var ja = {
  "\\global": "\\global",
  "\\long": "\\\\globallong",
  "\\\\globallong": "\\\\globallong",
  "\\def": "\\gdef",
  "\\gdef": "\\gdef",
  "\\edef": "\\xdef",
  "\\xdef": "\\xdef",
  "\\let": "\\\\globallet",
  "\\futurelet": "\\\\globalfuture"
}, Qi = (e) => {
  var t = e.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(t))
    throw new W("Expected a control sequence", e);
  return t;
}, Yc = (e) => {
  var t = e.gullet.popToken();
  return t.text === "=" && (t = e.gullet.popToken(), t.text === " " && (t = e.gullet.popToken())), t;
}, Ji = (e, t, n, a) => {
  var r = e.gullet.macros.get(n.text);
  r == null && (n.noexpand = !0, r = {
    tokens: [n],
    numArgs: 0,
    // reproduce the same behavior in expansion
    unexpandable: !e.gullet.isExpandable(n.text)
  }), e.gullet.macros.set(t, r, a);
};
X({
  type: "internal",
  names: [
    "\\global",
    "\\long",
    "\\\\globallong"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n
    } = e;
    t.consumeSpaces();
    var a = t.fetch();
    if (ja[a.text])
      return (n === "\\global" || n === "\\\\globallong") && (a.text = ja[a.text]), fe(t.parseFunction(), "internal");
    throw new W("Invalid token after macro prefix", a);
  }
});
X({
  type: "internal",
  names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n
    } = e, a = t.gullet.popToken(), r = a.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(r))
      throw new W("Expected a control sequence", a);
    for (var l = 0, i, o = [[]]; t.gullet.future().text !== "{"; )
      if (a = t.gullet.popToken(), a.text === "#") {
        if (t.gullet.future().text === "{") {
          i = t.gullet.future(), o[l].push("{");
          break;
        }
        if (a = t.gullet.popToken(), !/^[1-9]$/.test(a.text))
          throw new W('Invalid argument number "' + a.text + '"');
        if (parseInt(a.text) !== l + 1)
          throw new W('Argument number "' + a.text + '" out of order');
        l++, o.push([]);
      } else {
        if (a.text === "EOF")
          throw new W("Expected a macro definition");
        o[l].push(a.text);
      }
    var {
      tokens: s
    } = t.gullet.consumeArg();
    return i && s.unshift(i), (n === "\\edef" || n === "\\xdef") && (s = t.gullet.expandTokens(s), s.reverse()), t.gullet.macros.set(r, {
      tokens: s,
      numArgs: l,
      delimiters: o
    }, n === ja[n]), {
      type: "internal",
      mode: t.mode
    };
  }
});
X({
  type: "internal",
  names: [
    "\\let",
    "\\\\globallet"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n
    } = e, a = Qi(t.gullet.popToken());
    t.gullet.consumeSpaces();
    var r = Yc(t);
    return Ji(t, a, r, n === "\\\\globallet"), {
      type: "internal",
      mode: t.mode
    };
  }
});
X({
  type: "internal",
  names: [
    "\\futurelet",
    "\\\\globalfuture"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n
    } = e, a = Qi(t.gullet.popToken()), r = t.gullet.popToken(), l = t.gullet.popToken();
    return Ji(t, a, l, n === "\\\\globalfuture"), t.gullet.pushToken(l), t.gullet.pushToken(r), {
      type: "internal",
      mode: t.mode
    };
  }
});
var Hn = function(e, t, n) {
  var a = Me.math[e] && Me.math[e].replace, r = fr(a || e, t, n);
  if (!r)
    throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
  return r;
}, wr = function(e, t, n, a) {
  var r = n.havingBaseStyle(t), l = I.makeSpan(a.concat(r.sizingClasses(n)), [e], n), i = r.sizeMultiplier / n.sizeMultiplier;
  return l.height *= i, l.depth *= i, l.maxFontSize = r.sizeMultiplier, l;
}, eo = function(e, t, n) {
  var a = t.havingBaseStyle(n), r = (1 - t.sizeMultiplier / a.sizeMultiplier) * t.fontMetrics().axisHeight;
  e.classes.push("delimcenter"), e.style.top = K(r), e.height -= r, e.depth += r;
}, Kc = function(e, t, n, a, r, l) {
  var i = I.makeSymbol(e, "Main-Regular", r, a), o = wr(i, t, a, l);
  return n && eo(o, a, t), o;
}, Xc = function(e, t, n, a) {
  return I.makeSymbol(e, "Size" + t + "-Regular", n, a);
}, to = function(e, t, n, a, r, l) {
  var i = Xc(e, t, r, a), o = wr(I.makeSpan(["delimsizing", "size" + t], [i], a), ie.TEXT, a, l);
  return n && eo(o, a, ie.TEXT), o;
}, ba = function(e, t, n) {
  var a;
  t === "Size1-Regular" ? a = "delim-size1" : a = "delim-size4";
  var r = I.makeSpan(["delimsizinginner", a], [I.makeSpan([], [I.makeSymbol(e, t, n)])]);
  return {
    type: "elem",
    elem: r
  };
}, xa = function(e, t, n) {
  var a = wt["Size4-Regular"][e.charCodeAt(0)] ? wt["Size4-Regular"][e.charCodeAt(0)][4] : wt["Size1-Regular"][e.charCodeAt(0)][4], r = new en("inner", nc(e, Math.round(1e3 * t))), l = new Nt([r], {
    width: K(a),
    height: K(t),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + K(a),
    viewBox: "0 0 " + 1e3 * a + " " + Math.round(1e3 * t),
    preserveAspectRatio: "xMinYMin"
  }), i = I.makeSvgSpan([], [l], n);
  return i.height = t, i.style.height = K(t), i.style.width = K(a), {
    type: "elem",
    elem: i
  };
}, Ua = 8e-3, b0 = {
  type: "kern",
  size: -1 * Ua
}, Zc = ["|", "\\lvert", "\\rvert", "\\vert"], Qc = ["\\|", "\\lVert", "\\rVert", "\\Vert"], no = function(e, t, n, a, r, l) {
  var i, o, s, c, m = "", f = 0;
  i = s = c = e, o = null;
  var v = "Size1-Regular";
  e === "\\uparrow" ? s = c = "⏐" : e === "\\Uparrow" ? s = c = "‖" : e === "\\downarrow" ? i = s = "⏐" : e === "\\Downarrow" ? i = s = "‖" : e === "\\updownarrow" ? (i = "\\uparrow", s = "⏐", c = "\\downarrow") : e === "\\Updownarrow" ? (i = "\\Uparrow", s = "‖", c = "\\Downarrow") : ne.contains(Zc, e) ? (s = "∣", m = "vert", f = 333) : ne.contains(Qc, e) ? (s = "∥", m = "doublevert", f = 556) : e === "[" || e === "\\lbrack" ? (i = "⎡", s = "⎢", c = "⎣", v = "Size4-Regular", m = "lbrack", f = 667) : e === "]" || e === "\\rbrack" ? (i = "⎤", s = "⎥", c = "⎦", v = "Size4-Regular", m = "rbrack", f = 667) : e === "\\lfloor" || e === "⌊" ? (s = i = "⎢", c = "⎣", v = "Size4-Regular", m = "lfloor", f = 667) : e === "\\lceil" || e === "⌈" ? (i = "⎡", s = c = "⎢", v = "Size4-Regular", m = "lceil", f = 667) : e === "\\rfloor" || e === "⌋" ? (s = i = "⎥", c = "⎦", v = "Size4-Regular", m = "rfloor", f = 667) : e === "\\rceil" || e === "⌉" ? (i = "⎤", s = c = "⎥", v = "Size4-Regular", m = "rceil", f = 667) : e === "(" || e === "\\lparen" ? (i = "⎛", s = "⎜", c = "⎝", v = "Size4-Regular", m = "lparen", f = 875) : e === ")" || e === "\\rparen" ? (i = "⎞", s = "⎟", c = "⎠", v = "Size4-Regular", m = "rparen", f = 875) : e === "\\{" || e === "\\lbrace" ? (i = "⎧", o = "⎨", c = "⎩", s = "⎪", v = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (i = "⎫", o = "⎬", c = "⎭", s = "⎪", v = "Size4-Regular") : e === "\\lgroup" || e === "⟮" ? (i = "⎧", c = "⎩", s = "⎪", v = "Size4-Regular") : e === "\\rgroup" || e === "⟯" ? (i = "⎫", c = "⎭", s = "⎪", v = "Size4-Regular") : e === "\\lmoustache" || e === "⎰" ? (i = "⎧", c = "⎭", s = "⎪", v = "Size4-Regular") : (e === "\\rmoustache" || e === "⎱") && (i = "⎫", c = "⎩", s = "⎪", v = "Size4-Regular");
  var g = Hn(i, v, r), p = g.height + g.depth, b = Hn(s, v, r), x = b.height + b.depth, S = Hn(c, v, r), A = S.height + S.depth, V = 0, P = 1;
  if (o !== null) {
    var z = Hn(o, v, r);
    V = z.height + z.depth, P = 2;
  }
  var _ = p + A + V, O = Math.max(0, Math.ceil((t - _) / (P * x))), B = _ + O * P * x, E = a.fontMetrics().axisHeight;
  n && (E *= a.sizeMultiplier);
  var j = B / 2 - E, F = [];
  if (m.length > 0) {
    var L = B - p - A, D = Math.round(B * 1e3), $ = ac(m, Math.round(L * 1e3)), Z = new en(m, $), te = (f / 1e3).toFixed(3) + "em", de = (D / 1e3).toFixed(3) + "em", me = new Nt([Z], {
      width: te,
      height: de,
      viewBox: "0 0 " + f + " " + D
    }), R = I.makeSvgSpan([], [me], a);
    R.height = D / 1e3, R.style.width = te, R.style.height = de, F.push({
      type: "elem",
      elem: R
    });
  } else {
    if (F.push(ba(c, v, r)), F.push(b0), o === null) {
      var N = B - p - A + 2 * Ua;
      F.push(xa(s, N, a));
    } else {
      var H = (B - p - A - V) / 2 + 2 * Ua;
      F.push(xa(s, H, a)), F.push(b0), F.push(ba(o, v, r)), F.push(b0), F.push(xa(s, H, a));
    }
    F.push(b0), F.push(ba(i, v, r));
  }
  var Y = a.havingBaseStyle(ie.TEXT), ye = I.makeVList({
    positionType: "bottom",
    positionData: j,
    children: F
  }, Y);
  return wr(I.makeSpan(["delimsizing", "mult"], [ye], Y), ie.TEXT, a, l);
}, wa = 80, Sa = 0.08, ka = function(e, t, n, a, r) {
  var l = tc(e, a, n), i = new en(e, l), o = new Nt([i], {
    // Note: 1000:1 ratio of viewBox to document em width.
    width: "400em",
    height: K(t),
    viewBox: "0 0 400000 " + n,
    preserveAspectRatio: "xMinYMin slice"
  });
  return I.makeSvgSpan(["hide-tail"], [o], r);
}, Jc = function(e, t) {
  var n = t.havingBaseSizing(), a = io("\\surd", e * n.sizeMultiplier, lo, n), r = n.sizeMultiplier, l = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), i, o = 0, s = 0, c = 0, m;
  return a.type === "small" ? (c = 1e3 + 1e3 * l + wa, e < 1 ? r = 1 : e < 1.4 && (r = 0.7), o = (1 + l + Sa) / r, s = (1 + l) / r, i = ka("sqrtMain", o, c, l, t), i.style.minWidth = "0.853em", m = 0.833 / r) : a.type === "large" ? (c = (1e3 + wa) * Un[a.size], s = (Un[a.size] + l) / r, o = (Un[a.size] + l + Sa) / r, i = ka("sqrtSize" + a.size, o, c, l, t), i.style.minWidth = "1.02em", m = 1 / r) : (o = e + l + Sa, s = e + l, c = Math.floor(1e3 * e + l) + wa, i = ka("sqrtTall", o, c, l, t), i.style.minWidth = "0.742em", m = 1.056), i.height = s, i.style.height = K(o), {
    span: i,
    advanceWidth: m,
    // Calculate the actual line width.
    // This actually should depend on the chosen font -- e.g. \boldmath
    // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
    // have thicker rules.
    ruleWidth: (t.fontMetrics().sqrtRuleThickness + l) * r
  };
}, ao = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "\\surd"], e1 = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱"], ro = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"], Un = [0, 1.2, 1.8, 2.4, 3], t1 = function(e, t, n, a, r) {
  if (e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle"), ne.contains(ao, e) || ne.contains(ro, e))
    return to(e, t, !1, n, a, r);
  if (ne.contains(e1, e))
    return no(e, Un[t], !1, n, a, r);
  throw new W("Illegal delimiter: '" + e + "'");
}, n1 = [{
  type: "small",
  style: ie.SCRIPTSCRIPT
}, {
  type: "small",
  style: ie.SCRIPT
}, {
  type: "small",
  style: ie.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}], a1 = [{
  type: "small",
  style: ie.SCRIPTSCRIPT
}, {
  type: "small",
  style: ie.SCRIPT
}, {
  type: "small",
  style: ie.TEXT
}, {
  type: "stack"
}], lo = [{
  type: "small",
  style: ie.SCRIPTSCRIPT
}, {
  type: "small",
  style: ie.SCRIPT
}, {
  type: "small",
  style: ie.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}, {
  type: "stack"
}], r1 = function(e) {
  if (e.type === "small")
    return "Main-Regular";
  if (e.type === "large")
    return "Size" + e.size + "-Regular";
  if (e.type === "stack")
    return "Size4-Regular";
  throw new Error("Add support for delim type '" + e.type + "' here.");
}, io = function(e, t, n, a) {
  for (var r = Math.min(2, 3 - a.style.size), l = r; l < n.length && n[l].type !== "stack"; l++) {
    var i = Hn(e, r1(n[l]), "math"), o = i.height + i.depth;
    if (n[l].type === "small") {
      var s = a.havingBaseStyle(n[l].style);
      o *= s.sizeMultiplier;
    }
    if (o > t)
      return n[l];
  }
  return n[n.length - 1];
}, oo = function(e, t, n, a, r, l) {
  e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle");
  var i;
  ne.contains(ro, e) ? i = n1 : ne.contains(ao, e) ? i = lo : i = a1;
  var o = io(e, t, i, a);
  return o.type === "small" ? Kc(e, o.style, n, a, r, l) : o.type === "large" ? to(e, o.size, n, a, r, l) : no(e, t, n, a, r, l);
}, l1 = function(e, t, n, a, r, l) {
  var i = a.fontMetrics().axisHeight * a.sizeMultiplier, o = 901, s = 5 / a.fontMetrics().ptPerEm, c = Math.max(t - i, n + i), m = Math.max(
    // In real TeX, calculations are done using integral values which are
    // 65536 per pt, or 655360 per em. So, the division here truncates in
    // TeX but doesn't here, producing different results. If we wanted to
    // exactly match TeX's calculation, we could do
    //   Math.floor(655360 * maxDistFromAxis / 500) *
    //    delimiterFactor / 655360
    // (To see the difference, compare
    //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
    // in TeX and KaTeX)
    c / 500 * o,
    2 * c - s
  );
  return oo(e, m, !0, a, r, l);
}, Rt = {
  sqrtImage: Jc,
  sizedDelim: t1,
  sizeToMaxHeight: Un,
  customSizedDelim: oo,
  leftRightDelim: l1
}, hl = {
  "\\bigl": {
    mclass: "mopen",
    size: 1
  },
  "\\Bigl": {
    mclass: "mopen",
    size: 2
  },
  "\\biggl": {
    mclass: "mopen",
    size: 3
  },
  "\\Biggl": {
    mclass: "mopen",
    size: 4
  },
  "\\bigr": {
    mclass: "mclose",
    size: 1
  },
  "\\Bigr": {
    mclass: "mclose",
    size: 2
  },
  "\\biggr": {
    mclass: "mclose",
    size: 3
  },
  "\\Biggr": {
    mclass: "mclose",
    size: 4
  },
  "\\bigm": {
    mclass: "mrel",
    size: 1
  },
  "\\Bigm": {
    mclass: "mrel",
    size: 2
  },
  "\\biggm": {
    mclass: "mrel",
    size: 3
  },
  "\\Biggm": {
    mclass: "mrel",
    size: 4
  },
  "\\big": {
    mclass: "mord",
    size: 1
  },
  "\\Big": {
    mclass: "mord",
    size: 2
  },
  "\\bigg": {
    mclass: "mord",
    size: 3
  },
  "\\Bigg": {
    mclass: "mord",
    size: 4
  }
}, i1 = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "<", ">", "\\langle", "⟨", "\\rangle", "⟩", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
function ta(e, t) {
  var n = J0(e);
  if (n && ne.contains(i1, n.text))
    return n;
  throw n ? new W("Invalid delimiter '" + n.text + "' after '" + t.funcName + "'", e) : new W("Invalid delimiter type '" + e.type + "'", e);
}
X({
  type: "delimsizing",
  names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
  props: {
    numArgs: 1,
    argTypes: ["primitive"]
  },
  handler: (e, t) => {
    var n = ta(t[0], e);
    return {
      type: "delimsizing",
      mode: e.parser.mode,
      size: hl[e.funcName].size,
      mclass: hl[e.funcName].mclass,
      delim: n.text
    };
  },
  htmlBuilder: (e, t) => e.delim === "." ? I.makeSpan([e.mclass]) : Rt.sizedDelim(e.delim, e.size, t, e.mode, [e.mclass]),
  mathmlBuilder: (e) => {
    var t = [];
    e.delim !== "." && t.push(ht(e.delim, e.mode));
    var n = new G.MathNode("mo", t);
    e.mclass === "mopen" || e.mclass === "mclose" ? n.setAttribute("fence", "true") : n.setAttribute("fence", "false"), n.setAttribute("stretchy", "true");
    var a = K(Rt.sizeToMaxHeight[e.size]);
    return n.setAttribute("minsize", a), n.setAttribute("maxsize", a), n;
  }
});
function fl(e) {
  if (!e.body)
    throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
X({
  type: "leftright-right",
  names: ["\\right"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (e, t) => {
    var n = e.parser.gullet.macros.get("\\current@color");
    if (n && typeof n != "string")
      throw new W("\\current@color set to non-string in \\right");
    return {
      type: "leftright-right",
      mode: e.parser.mode,
      delim: ta(t[0], e).text,
      color: n
      // undefined if not set via \color
    };
  }
});
X({
  type: "leftright",
  names: ["\\left"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (e, t) => {
    var n = ta(t[0], e), a = e.parser;
    ++a.leftrightDepth;
    var r = a.parseExpression(!1);
    --a.leftrightDepth, a.expect("\\right", !1);
    var l = fe(a.parseFunction(), "leftright-right");
    return {
      type: "leftright",
      mode: a.mode,
      body: r,
      left: n.text,
      right: l.delim,
      rightColor: l.color
    };
  },
  htmlBuilder: (e, t) => {
    fl(e);
    for (var n = Fe(e.body, t, !0, ["mopen", "mclose"]), a = 0, r = 0, l = !1, i = 0; i < n.length; i++)
      n[i].isMiddle ? l = !0 : (a = Math.max(n[i].height, a), r = Math.max(n[i].depth, r));
    a *= t.sizeMultiplier, r *= t.sizeMultiplier;
    var o;
    if (e.left === "." ? o = Xn(t, ["mopen"]) : o = Rt.leftRightDelim(e.left, a, r, t, e.mode, ["mopen"]), n.unshift(o), l)
      for (var s = 1; s < n.length; s++) {
        var c = n[s], m = c.isMiddle;
        m && (n[s] = Rt.leftRightDelim(m.delim, a, r, m.options, e.mode, []));
      }
    var f;
    if (e.right === ".")
      f = Xn(t, ["mclose"]);
    else {
      var v = e.rightColor ? t.withColor(e.rightColor) : t;
      f = Rt.leftRightDelim(e.right, a, r, v, e.mode, ["mclose"]);
    }
    return n.push(f), I.makeSpan(["minner"], n, t);
  },
  mathmlBuilder: (e, t) => {
    fl(e);
    var n = at(e.body, t);
    if (e.left !== ".") {
      var a = new G.MathNode("mo", [ht(e.left, e.mode)]);
      a.setAttribute("fence", "true"), n.unshift(a);
    }
    if (e.right !== ".") {
      var r = new G.MathNode("mo", [ht(e.right, e.mode)]);
      r.setAttribute("fence", "true"), e.rightColor && r.setAttribute("mathcolor", e.rightColor), n.push(r);
    }
    return pr(n);
  }
});
X({
  type: "middle",
  names: ["\\middle"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (e, t) => {
    var n = ta(t[0], e);
    if (!e.parser.leftrightDepth)
      throw new W("\\middle without preceding \\left", n);
    return {
      type: "middle",
      mode: e.parser.mode,
      delim: n.text
    };
  },
  htmlBuilder: (e, t) => {
    var n;
    if (e.delim === ".")
      n = Xn(t, []);
    else {
      n = Rt.sizedDelim(e.delim, 1, t, e.mode, []);
      var a = {
        delim: e.delim,
        options: t
      };
      n.isMiddle = a;
    }
    return n;
  },
  mathmlBuilder: (e, t) => {
    var n = e.delim === "\\vert" || e.delim === "|" ? ht("|", "text") : ht(e.delim, e.mode), a = new G.MathNode("mo", [n]);
    return a.setAttribute("fence", "true"), a.setAttribute("lspace", "0.05em"), a.setAttribute("rspace", "0.05em"), a;
  }
});
var Sr = (e, t) => {
  var n = I.wrapFragment(xe(e.body, t), t), a = e.label.slice(1), r = t.sizeMultiplier, l, i = 0, o = ne.isCharacterBox(e.body);
  if (a === "sout")
    l = I.makeSpan(["stretchy", "sout"]), l.height = t.fontMetrics().defaultRuleThickness / r, i = -0.5 * t.fontMetrics().xHeight;
  else if (a === "phase") {
    var s = Pe({
      number: 0.6,
      unit: "pt"
    }, t), c = Pe({
      number: 0.35,
      unit: "ex"
    }, t), m = t.havingBaseSizing();
    r = r / m.sizeMultiplier;
    var f = n.height + n.depth + s + c;
    n.style.paddingLeft = K(f / 2 + s);
    var v = Math.floor(1e3 * f * r), g = Ju(v), p = new Nt([new en("phase", g)], {
      width: "400em",
      height: K(v / 1e3),
      viewBox: "0 0 400000 " + v,
      preserveAspectRatio: "xMinYMin slice"
    });
    l = I.makeSvgSpan(["hide-tail"], [p], t), l.style.height = K(f), i = n.depth + s + c;
  } else {
    /cancel/.test(a) ? o || n.classes.push("cancel-pad") : a === "angl" ? n.classes.push("anglpad") : n.classes.push("boxpad");
    var b = 0, x = 0, S = 0;
    /box/.test(a) ? (S = Math.max(
      t.fontMetrics().fboxrule,
      // default
      t.minRuleThickness
      // User override.
    ), b = t.fontMetrics().fboxsep + (a === "colorbox" ? 0 : S), x = b) : a === "angl" ? (S = Math.max(t.fontMetrics().defaultRuleThickness, t.minRuleThickness), b = 4 * S, x = Math.max(0, 0.25 - n.depth)) : (b = o ? 0.2 : 0, x = b), l = Ft.encloseSpan(n, a, b, x, t), /fbox|boxed|fcolorbox/.test(a) ? (l.style.borderStyle = "solid", l.style.borderWidth = K(S)) : a === "angl" && S !== 0.049 && (l.style.borderTopWidth = K(S), l.style.borderRightWidth = K(S)), i = n.depth + x, e.backgroundColor && (l.style.backgroundColor = e.backgroundColor, e.borderColor && (l.style.borderColor = e.borderColor));
  }
  var A;
  if (e.backgroundColor)
    A = I.makeVList({
      positionType: "individualShift",
      children: [
        // Put the color background behind inner;
        {
          type: "elem",
          elem: l,
          shift: i
        },
        {
          type: "elem",
          elem: n,
          shift: 0
        }
      ]
    }, t);
  else {
    var V = /cancel|phase/.test(a) ? ["svg-align"] : [];
    A = I.makeVList({
      positionType: "individualShift",
      children: [
        // Write the \cancel stroke on top of inner.
        {
          type: "elem",
          elem: n,
          shift: 0
        },
        {
          type: "elem",
          elem: l,
          shift: i,
          wrapperClasses: V
        }
      ]
    }, t);
  }
  return /cancel/.test(a) && (A.height = n.height, A.depth = n.depth), /cancel/.test(a) && !o ? I.makeSpan(["mord", "cancel-lap"], [A], t) : I.makeSpan(["mord"], [A], t);
}, kr = (e, t) => {
  var n = 0, a = new G.MathNode(e.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [Ae(e.body, t)]);
  switch (e.label) {
    case "\\cancel":
      a.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      a.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\phase":
      a.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      a.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      a.setAttribute("notation", "box");
      break;
    case "\\angl":
      a.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox":
      if (n = t.fontMetrics().fboxsep * t.fontMetrics().ptPerEm, a.setAttribute("width", "+" + 2 * n + "pt"), a.setAttribute("height", "+" + 2 * n + "pt"), a.setAttribute("lspace", n + "pt"), a.setAttribute("voffset", n + "pt"), e.label === "\\fcolorbox") {
        var r = Math.max(
          t.fontMetrics().fboxrule,
          // default
          t.minRuleThickness
          // user override
        );
        a.setAttribute("style", "border: " + r + "em solid " + String(e.borderColor));
      }
      break;
    case "\\xcancel":
      a.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  return e.backgroundColor && a.setAttribute("mathbackground", e.backgroundColor), a;
};
X({
  type: "enclose",
  names: ["\\colorbox"],
  props: {
    numArgs: 2,
    allowedInText: !0,
    argTypes: ["color", "text"]
  },
  handler(e, t, n) {
    var {
      parser: a,
      funcName: r
    } = e, l = fe(t[0], "color-token").color, i = t[1];
    return {
      type: "enclose",
      mode: a.mode,
      label: r,
      backgroundColor: l,
      body: i
    };
  },
  htmlBuilder: Sr,
  mathmlBuilder: kr
});
X({
  type: "enclose",
  names: ["\\fcolorbox"],
  props: {
    numArgs: 3,
    allowedInText: !0,
    argTypes: ["color", "color", "text"]
  },
  handler(e, t, n) {
    var {
      parser: a,
      funcName: r
    } = e, l = fe(t[0], "color-token").color, i = fe(t[1], "color-token").color, o = t[2];
    return {
      type: "enclose",
      mode: a.mode,
      label: r,
      backgroundColor: i,
      borderColor: l,
      body: o
    };
  },
  htmlBuilder: Sr,
  mathmlBuilder: kr
});
X({
  type: "enclose",
  names: ["\\fbox"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInText: !0
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "enclose",
      mode: n.mode,
      label: "\\fbox",
      body: t[0]
    };
  }
});
X({
  type: "enclose",
  names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
  props: {
    numArgs: 1
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0];
    return {
      type: "enclose",
      mode: n.mode,
      label: a,
      body: r
    };
  },
  htmlBuilder: Sr,
  mathmlBuilder: kr
});
X({
  type: "enclose",
  names: ["\\angl"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInText: !1
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "enclose",
      mode: n.mode,
      label: "\\angl",
      body: t[0]
    };
  }
});
var so = {};
function At(e) {
  for (var {
    type: t,
    names: n,
    props: a,
    handler: r,
    htmlBuilder: l,
    mathmlBuilder: i
  } = e, o = {
    type: t,
    numArgs: a.numArgs || 0,
    allowedInText: !1,
    numOptionalArgs: 0,
    handler: r
  }, s = 0; s < n.length; ++s)
    so[n[s]] = o;
  l && (_0[t] = l), i && (L0[t] = i);
}
var uo = {};
function y(e, t) {
  uo[e] = t;
}
function vl(e) {
  var t = [];
  e.consumeSpaces();
  var n = e.fetch().text;
  for (n === "\\relax" && (e.consume(), e.consumeSpaces(), n = e.fetch().text); n === "\\hline" || n === "\\hdashline"; )
    e.consume(), t.push(n === "\\hdashline"), e.consumeSpaces(), n = e.fetch().text;
  return t;
}
var na = (e) => {
  var t = e.parser.settings;
  if (!t.displayMode)
    throw new W("{" + e.envName + "} can be used only in display mode.");
};
function Cr(e) {
  if (e.indexOf("ed") === -1)
    return e.indexOf("*") === -1;
}
function an(e, t, n) {
  var {
    hskipBeforeAndAfter: a,
    addJot: r,
    cols: l,
    arraystretch: i,
    colSeparationType: o,
    autoTag: s,
    singleRow: c,
    emptySingleRow: m,
    maxNumCols: f,
    leqno: v
  } = t;
  if (e.gullet.beginGroup(), c || e.gullet.macros.set("\\cr", "\\\\\\relax"), !i) {
    var g = e.gullet.expandMacroAsText("\\arraystretch");
    if (g == null)
      i = 1;
    else if (i = parseFloat(g), !i || i < 0)
      throw new W("Invalid \\arraystretch: " + g);
  }
  e.gullet.beginGroup();
  var p = [], b = [p], x = [], S = [], A = s != null ? [] : void 0;
  function V() {
    s && e.gullet.macros.set("\\@eqnsw", "1", !0);
  }
  function P() {
    A && (e.gullet.macros.get("\\df@tag") ? (A.push(e.subparse([new ct("\\df@tag")])), e.gullet.macros.set("\\df@tag", void 0, !0)) : A.push(!!s && e.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (V(), S.push(vl(e)); ; ) {
    var z = e.parseExpression(!1, c ? "\\end" : "\\\\");
    e.gullet.endGroup(), e.gullet.beginGroup(), z = {
      type: "ordgroup",
      mode: e.mode,
      body: z
    }, n && (z = {
      type: "styling",
      mode: e.mode,
      style: n,
      body: [z]
    }), p.push(z);
    var _ = e.fetch().text;
    if (_ === "&") {
      if (f && p.length === f) {
        if (c || o)
          throw new W("Too many tab characters: &", e.nextToken);
        e.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
      }
      e.consume();
    } else if (_ === "\\end") {
      P(), p.length === 1 && z.type === "styling" && z.body[0].body.length === 0 && (b.length > 1 || !m) && b.pop(), S.length < b.length + 1 && S.push([]);
      break;
    } else if (_ === "\\\\") {
      e.consume();
      var O = void 0;
      e.gullet.future().text !== " " && (O = e.parseSizeGroup(!0)), x.push(O ? O.value : null), P(), S.push(vl(e)), p = [], b.push(p), V();
    } else
      throw new W("Expected & or \\\\ or \\cr or \\end", e.nextToken);
  }
  return e.gullet.endGroup(), e.gullet.endGroup(), {
    type: "array",
    mode: e.mode,
    addJot: r,
    arraystretch: i,
    body: b,
    cols: l,
    rowGaps: x,
    hskipBeforeAndAfter: a,
    hLinesBeforeRow: S,
    colSeparationType: o,
    tags: A,
    leqno: v
  };
}
function Ar(e) {
  return e.slice(0, 1) === "d" ? "display" : "text";
}
var Mt = function(e, t) {
  var n, a, r = e.body.length, l = e.hLinesBeforeRow, i = 0, o = new Array(r), s = [], c = Math.max(
    // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
    t.fontMetrics().arrayRuleWidth,
    t.minRuleThickness
    // User override.
  ), m = 1 / t.fontMetrics().ptPerEm, f = 5 * m;
  if (e.colSeparationType && e.colSeparationType === "small") {
    var v = t.havingStyle(ie.SCRIPT).sizeMultiplier;
    f = 0.2778 * (v / t.sizeMultiplier);
  }
  var g = e.colSeparationType === "CD" ? Pe({
    number: 3,
    unit: "ex"
  }, t) : 12 * m, p = 3 * m, b = e.arraystretch * g, x = 0.7 * b, S = 0.3 * b, A = 0;
  function V(c0) {
    for (var d0 = 0; d0 < c0.length; ++d0)
      d0 > 0 && (A += 0.25), s.push({
        pos: A,
        isDashed: c0[d0]
      });
  }
  for (V(l[0]), n = 0; n < e.body.length; ++n) {
    var P = e.body[n], z = x, _ = S;
    i < P.length && (i = P.length);
    var O = new Array(P.length);
    for (a = 0; a < P.length; ++a) {
      var B = xe(P[a], t);
      _ < B.depth && (_ = B.depth), z < B.height && (z = B.height), O[a] = B;
    }
    var E = e.rowGaps[n], j = 0;
    E && (j = Pe(E, t), j > 0 && (j += S, _ < j && (_ = j), j = 0)), e.addJot && (_ += p), O.height = z, O.depth = _, A += z, O.pos = A, A += _ + j, o[n] = O, V(l[n + 1]);
  }
  var F = A / 2 + t.fontMetrics().axisHeight, L = e.cols || [], D = [], $, Z, te = [];
  if (e.tags && e.tags.some((c0) => c0))
    for (n = 0; n < r; ++n) {
      var de = o[n], me = de.pos - F, R = e.tags[n], N = void 0;
      R === !0 ? N = I.makeSpan(["eqn-num"], [], t) : R === !1 ? N = I.makeSpan([], [], t) : N = I.makeSpan([], Fe(R, t, !0), t), N.depth = de.depth, N.height = de.height, te.push({
        type: "elem",
        elem: N,
        shift: me
      });
    }
  for (
    a = 0, Z = 0;
    // Continue while either there are more columns or more column
    // descriptions, so trailing separators don't get lost.
    a < i || Z < L.length;
    ++a, ++Z
  ) {
    for (var H = L[Z] || {}, Y = !0; H.type === "separator"; ) {
      if (Y || ($ = I.makeSpan(["arraycolsep"], []), $.style.width = K(t.fontMetrics().doubleRuleSep), D.push($)), H.separator === "|" || H.separator === ":") {
        var ye = H.separator === "|" ? "solid" : "dashed", re = I.makeSpan(["vertical-separator"], [], t);
        re.style.height = K(A), re.style.borderRightWidth = K(c), re.style.borderRightStyle = ye, re.style.margin = "0 " + K(-c / 2);
        var Se = A - F;
        Se && (re.style.verticalAlign = K(-Se)), D.push(re);
      } else
        throw new W("Invalid separator type: " + H.separator);
      Z++, H = L[Z] || {}, Y = !1;
    }
    if (!(a >= i)) {
      var ee = void 0;
      (a > 0 || e.hskipBeforeAndAfter) && (ee = ne.deflt(H.pregap, f), ee !== 0 && ($ = I.makeSpan(["arraycolsep"], []), $.style.width = K(ee), D.push($)));
      var he = [];
      for (n = 0; n < r; ++n) {
        var Ce = o[n], Re = Ce[a];
        if (Re) {
          var ke = Ce.pos - F;
          Re.depth = Ce.depth, Re.height = Ce.height, he.push({
            type: "elem",
            elem: Re,
            shift: ke
          });
        }
      }
      he = I.makeVList({
        positionType: "individualShift",
        children: he
      }, t), he = I.makeSpan(["col-align-" + (H.align || "c")], [he]), D.push(he), (a < i - 1 || e.hskipBeforeAndAfter) && (ee = ne.deflt(H.postgap, f), ee !== 0 && ($ = I.makeSpan(["arraycolsep"], []), $.style.width = K(ee), D.push($)));
    }
  }
  if (o = I.makeSpan(["mtable"], D), s.length > 0) {
    for (var yt = I.makeLineSpan("hline", t, c), un = I.makeLineSpan("hdashline", t, c), Ut = [{
      type: "elem",
      elem: o,
      shift: 0
    }]; s.length > 0; ) {
      var cn = s.pop(), Dn = cn.pos - F;
      cn.isDashed ? Ut.push({
        type: "elem",
        elem: un,
        shift: Dn
      }) : Ut.push({
        type: "elem",
        elem: yt,
        shift: Dn
      });
    }
    o = I.makeVList({
      positionType: "individualShift",
      children: Ut
    }, t);
  }
  if (te.length === 0)
    return I.makeSpan(["mord"], [o], t);
  var Sn = I.makeVList({
    positionType: "individualShift",
    children: te
  }, t);
  return Sn = I.makeSpan(["tag"], [Sn], t), I.makeFragment([o, Sn]);
}, o1 = {
  c: "center ",
  l: "left ",
  r: "right "
}, Tt = function(e, t) {
  for (var n = [], a = new G.MathNode("mtd", [], ["mtr-glue"]), r = new G.MathNode("mtd", [], ["mml-eqn-num"]), l = 0; l < e.body.length; l++) {
    for (var i = e.body[l], o = [], s = 0; s < i.length; s++)
      o.push(new G.MathNode("mtd", [Ae(i[s], t)]));
    e.tags && e.tags[l] && (o.unshift(a), o.push(a), e.leqno ? o.unshift(r) : o.push(r)), n.push(new G.MathNode("mtr", o));
  }
  var c = new G.MathNode("mtable", n), m = e.arraystretch === 0.5 ? 0.1 : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
  c.setAttribute("rowspacing", K(m));
  var f = "", v = "";
  if (e.cols && e.cols.length > 0) {
    var g = e.cols, p = "", b = !1, x = 0, S = g.length;
    g[0].type === "separator" && (f += "top ", x = 1), g[g.length - 1].type === "separator" && (f += "bottom ", S -= 1);
    for (var A = x; A < S; A++)
      g[A].type === "align" ? (v += o1[g[A].align], b && (p += "none "), b = !0) : g[A].type === "separator" && b && (p += g[A].separator === "|" ? "solid " : "dashed ", b = !1);
    c.setAttribute("columnalign", v.trim()), /[sd]/.test(p) && c.setAttribute("columnlines", p.trim());
  }
  if (e.colSeparationType === "align") {
    for (var V = e.cols || [], P = "", z = 1; z < V.length; z++)
      P += z % 2 ? "0em " : "1em ";
    c.setAttribute("columnspacing", P.trim());
  } else e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? c.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? c.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? c.setAttribute("columnspacing", "0.5em") : c.setAttribute("columnspacing", "1em");
  var _ = "", O = e.hLinesBeforeRow;
  f += O[0].length > 0 ? "left " : "", f += O[O.length - 1].length > 0 ? "right " : "";
  for (var B = 1; B < O.length - 1; B++)
    _ += O[B].length === 0 ? "none " : O[B][0] ? "dashed " : "solid ";
  return /[sd]/.test(_) && c.setAttribute("rowlines", _.trim()), f !== "" && (c = new G.MathNode("menclose", [c]), c.setAttribute("notation", f.trim())), e.arraystretch && e.arraystretch < 1 && (c = new G.MathNode("mstyle", [c]), c.setAttribute("scriptlevel", "1")), c;
}, co = function(e, t) {
  e.envName.indexOf("ed") === -1 && na(e);
  var n = [], a = e.envName.indexOf("at") > -1 ? "alignat" : "align", r = e.envName === "split", l = an(e.parser, {
    cols: n,
    addJot: !0,
    autoTag: r ? void 0 : Cr(e.envName),
    emptySingleRow: !0,
    colSeparationType: a,
    maxNumCols: r ? 2 : void 0,
    leqno: e.parser.settings.leqno
  }, "display"), i, o = 0, s = {
    type: "ordgroup",
    mode: e.mode,
    body: []
  };
  if (t[0] && t[0].type === "ordgroup") {
    for (var c = "", m = 0; m < t[0].body.length; m++) {
      var f = fe(t[0].body[m], "textord");
      c += f.text;
    }
    i = Number(c), o = i * 2;
  }
  var v = !o;
  l.body.forEach(function(x) {
    for (var S = 1; S < x.length; S += 2) {
      var A = fe(x[S], "styling"), V = fe(A.body[0], "ordgroup");
      V.body.unshift(s);
    }
    if (v)
      o < x.length && (o = x.length);
    else {
      var P = x.length / 2;
      if (i < P)
        throw new W("Too many math in a row: " + ("expected " + i + ", but got " + P), x[0]);
    }
  });
  for (var g = 0; g < o; ++g) {
    var p = "r", b = 0;
    g % 2 === 1 ? p = "l" : g > 0 && v && (b = 1), n[g] = {
      type: "align",
      align: p,
      pregap: b,
      postgap: 0
    };
  }
  return l.colSeparationType = v ? "align" : "alignat", l;
};
At({
  type: "array",
  names: ["array", "darray"],
  props: {
    numArgs: 1
  },
  handler(e, t) {
    var n = J0(t[0]), a = n ? [t[0]] : fe(t[0], "ordgroup").body, r = a.map(function(i) {
      var o = br(i), s = o.text;
      if ("lcr".indexOf(s) !== -1)
        return {
          type: "align",
          align: s
        };
      if (s === "|")
        return {
          type: "separator",
          separator: "|"
        };
      if (s === ":")
        return {
          type: "separator",
          separator: ":"
        };
      throw new W("Unknown column alignment: " + s, i);
    }), l = {
      cols: r,
      hskipBeforeAndAfter: !0,
      // \@preamble in lttab.dtx
      maxNumCols: r.length
    };
    return an(e.parser, l, Ar(e.envName));
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
  props: {
    numArgs: 0
  },
  handler(e) {
    var t = {
      matrix: null,
      pmatrix: ["(", ")"],
      bmatrix: ["[", "]"],
      Bmatrix: ["\\{", "\\}"],
      vmatrix: ["|", "|"],
      Vmatrix: ["\\Vert", "\\Vert"]
    }[e.envName.replace("*", "")], n = "c", a = {
      hskipBeforeAndAfter: !1,
      cols: [{
        type: "align",
        align: n
      }]
    };
    if (e.envName.charAt(e.envName.length - 1) === "*") {
      var r = e.parser;
      if (r.consumeSpaces(), r.fetch().text === "[") {
        if (r.consume(), r.consumeSpaces(), n = r.fetch().text, "lcr".indexOf(n) === -1)
          throw new W("Expected l or c or r", r.nextToken);
        r.consume(), r.consumeSpaces(), r.expect("]"), r.consume(), a.cols = [{
          type: "align",
          align: n
        }];
      }
    }
    var l = an(e.parser, a, Ar(e.envName)), i = Math.max(0, ...l.body.map((o) => o.length));
    return l.cols = new Array(i).fill({
      type: "align",
      align: n
    }), t ? {
      type: "leftright",
      mode: e.mode,
      body: [l],
      left: t[0],
      right: t[1],
      rightColor: void 0
      // \right uninfluenced by \color in array
    } : l;
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["smallmatrix"],
  props: {
    numArgs: 0
  },
  handler(e) {
    var t = {
      arraystretch: 0.5
    }, n = an(e.parser, t, "script");
    return n.colSeparationType = "small", n;
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["subarray"],
  props: {
    numArgs: 1
  },
  handler(e, t) {
    var n = J0(t[0]), a = n ? [t[0]] : fe(t[0], "ordgroup").body, r = a.map(function(i) {
      var o = br(i), s = o.text;
      if ("lc".indexOf(s) !== -1)
        return {
          type: "align",
          align: s
        };
      throw new W("Unknown column alignment: " + s, i);
    });
    if (r.length > 1)
      throw new W("{subarray} can contain only one column");
    var l = {
      cols: r,
      hskipBeforeAndAfter: !1,
      arraystretch: 0.5
    };
    if (l = an(e.parser, l, "script"), l.body.length > 0 && l.body[0].length > 1)
      throw new W("{subarray} can contain only one column");
    return l;
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["cases", "dcases", "rcases", "drcases"],
  props: {
    numArgs: 0
  },
  handler(e) {
    var t = {
      arraystretch: 1.2,
      cols: [{
        type: "align",
        align: "l",
        pregap: 0,
        // TODO(kevinb) get the current style.
        // For now we use the metrics for TEXT style which is what we were
        // doing before.  Before attempting to get the current style we
        // should look at TeX's behavior especially for \over and matrices.
        postgap: 1
        /* 1em quad */
      }, {
        type: "align",
        align: "l",
        pregap: 0,
        postgap: 0
      }]
    }, n = an(e.parser, t, Ar(e.envName));
    return {
      type: "leftright",
      mode: e.mode,
      body: [n],
      left: e.envName.indexOf("r") > -1 ? "." : "\\{",
      right: e.envName.indexOf("r") > -1 ? "\\}" : ".",
      rightColor: void 0
    };
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["align", "align*", "aligned", "split"],
  props: {
    numArgs: 0
  },
  handler: co,
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["gathered", "gather", "gather*"],
  props: {
    numArgs: 0
  },
  handler(e) {
    ne.contains(["gather", "gather*"], e.envName) && na(e);
    var t = {
      cols: [{
        type: "align",
        align: "c"
      }],
      addJot: !0,
      colSeparationType: "gather",
      autoTag: Cr(e.envName),
      emptySingleRow: !0,
      leqno: e.parser.settings.leqno
    };
    return an(e.parser, t, "display");
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["alignat", "alignat*", "alignedat"],
  props: {
    numArgs: 1
  },
  handler: co,
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["equation", "equation*"],
  props: {
    numArgs: 0
  },
  handler(e) {
    na(e);
    var t = {
      autoTag: Cr(e.envName),
      emptySingleRow: !0,
      singleRow: !0,
      maxNumCols: 1,
      leqno: e.parser.settings.leqno
    };
    return an(e.parser, t, "display");
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
At({
  type: "array",
  names: ["CD"],
  props: {
    numArgs: 0
  },
  handler(e) {
    return na(e), Uc(e.parser);
  },
  htmlBuilder: Mt,
  mathmlBuilder: Tt
});
y("\\nonumber", "\\gdef\\@eqnsw{0}");
y("\\notag", "\\nonumber");
X({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\hline", "\\hdashline"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !0
  },
  handler(e, t) {
    throw new W(e.funcName + " valid only within array environment");
  }
});
var gl = so;
X({
  type: "environment",
  names: ["\\begin", "\\end"],
  props: {
    numArgs: 1,
    argTypes: ["text"]
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0];
    if (r.type !== "ordgroup")
      throw new W("Invalid environment name", r);
    for (var l = "", i = 0; i < r.body.length; ++i)
      l += fe(r.body[i], "textord").text;
    if (a === "\\begin") {
      if (!gl.hasOwnProperty(l))
        throw new W("No such environment: " + l, r);
      var o = gl[l], {
        args: s,
        optArgs: c
      } = n.parseArguments("\\begin{" + l + "}", o), m = {
        mode: n.mode,
        envName: l,
        parser: n
      }, f = o.handler(m, s, c);
      n.expect("\\end", !1);
      var v = n.nextToken, g = fe(n.parseFunction(), "environment");
      if (g.name !== l)
        throw new W("Mismatch: \\begin{" + l + "} matched by \\end{" + g.name + "}", v);
      return f;
    }
    return {
      type: "environment",
      mode: n.mode,
      name: l,
      nameGroup: r
    };
  }
});
var mo = (e, t) => {
  var n = e.font, a = t.withFont(n);
  return xe(e.body, a);
}, ho = (e, t) => {
  var n = e.font, a = t.withFont(n);
  return Ae(e.body, a);
}, pl = {
  "\\Bbb": "\\mathbb",
  "\\bold": "\\mathbf",
  "\\frak": "\\mathfrak",
  "\\bm": "\\boldsymbol"
};
X({
  type: "font",
  names: [
    // styles, except \boldsymbol defined below
    "\\mathrm",
    "\\mathit",
    "\\mathbf",
    "\\mathnormal",
    // families
    "\\mathbb",
    "\\mathcal",
    "\\mathfrak",
    "\\mathscr",
    "\\mathsf",
    "\\mathtt",
    // aliases, except \bm defined below
    "\\Bbb",
    "\\bold",
    "\\frak"
  ],
  props: {
    numArgs: 1,
    allowedInArgument: !0
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = R0(t[0]), l = a;
    return l in pl && (l = pl[l]), {
      type: "font",
      mode: n.mode,
      font: l.slice(1),
      body: r
    };
  },
  htmlBuilder: mo,
  mathmlBuilder: ho
});
X({
  type: "mclass",
  names: ["\\boldsymbol", "\\bm"],
  props: {
    numArgs: 1
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e, a = t[0], r = ne.isCharacterBox(a);
    return {
      type: "mclass",
      mode: n.mode,
      mclass: ea(a),
      body: [{
        type: "font",
        mode: n.mode,
        font: "boldsymbol",
        body: a
      }],
      isCharacterBox: r
    };
  }
});
X({
  type: "font",
  names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a,
      breakOnTokenText: r
    } = e, {
      mode: l
    } = n, i = n.parseExpression(!0, r), o = "math" + a.slice(1);
    return {
      type: "font",
      mode: l,
      font: o,
      body: {
        type: "ordgroup",
        mode: n.mode,
        body: i
      }
    };
  },
  htmlBuilder: mo,
  mathmlBuilder: ho
});
var fo = (e, t) => {
  var n = t;
  return e === "display" ? n = n.id >= ie.SCRIPT.id ? n.text() : ie.DISPLAY : e === "text" && n.size === ie.DISPLAY.size ? n = ie.TEXT : e === "script" ? n = ie.SCRIPT : e === "scriptscript" && (n = ie.SCRIPTSCRIPT), n;
}, Mr = (e, t) => {
  var n = fo(e.size, t.style), a = n.fracNum(), r = n.fracDen(), l;
  l = t.havingStyle(a);
  var i = xe(e.numer, l, t);
  if (e.continued) {
    var o = 8.5 / t.fontMetrics().ptPerEm, s = 3.5 / t.fontMetrics().ptPerEm;
    i.height = i.height < o ? o : i.height, i.depth = i.depth < s ? s : i.depth;
  }
  l = t.havingStyle(r);
  var c = xe(e.denom, l, t), m, f, v;
  e.hasBarLine ? (e.barSize ? (f = Pe(e.barSize, t), m = I.makeLineSpan("frac-line", t, f)) : m = I.makeLineSpan("frac-line", t), f = m.height, v = m.height) : (m = null, f = 0, v = t.fontMetrics().defaultRuleThickness);
  var g, p, b;
  n.size === ie.DISPLAY.size || e.size === "display" ? (g = t.fontMetrics().num1, f > 0 ? p = 3 * v : p = 7 * v, b = t.fontMetrics().denom1) : (f > 0 ? (g = t.fontMetrics().num2, p = v) : (g = t.fontMetrics().num3, p = 3 * v), b = t.fontMetrics().denom2);
  var x;
  if (m) {
    var S = t.fontMetrics().axisHeight;
    g - i.depth - (S + 0.5 * f) < p && (g += p - (g - i.depth - (S + 0.5 * f))), S - 0.5 * f - (c.height - b) < p && (b += p - (S - 0.5 * f - (c.height - b)));
    var A = -(S - 0.5 * f);
    x = I.makeVList({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: c,
        shift: b
      }, {
        type: "elem",
        elem: m,
        shift: A
      }, {
        type: "elem",
        elem: i,
        shift: -g
      }]
    }, t);
  } else {
    var V = g - i.depth - (c.height - b);
    V < p && (g += 0.5 * (p - V), b += 0.5 * (p - V)), x = I.makeVList({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: c,
        shift: b
      }, {
        type: "elem",
        elem: i,
        shift: -g
      }]
    }, t);
  }
  l = t.havingStyle(n), x.height *= l.sizeMultiplier / t.sizeMultiplier, x.depth *= l.sizeMultiplier / t.sizeMultiplier;
  var P;
  n.size === ie.DISPLAY.size ? P = t.fontMetrics().delim1 : n.size === ie.SCRIPTSCRIPT.size ? P = t.havingStyle(ie.SCRIPT).fontMetrics().delim2 : P = t.fontMetrics().delim2;
  var z, _;
  return e.leftDelim == null ? z = Xn(t, ["mopen"]) : z = Rt.customSizedDelim(e.leftDelim, P, !0, t.havingStyle(n), e.mode, ["mopen"]), e.continued ? _ = I.makeSpan([]) : e.rightDelim == null ? _ = Xn(t, ["mclose"]) : _ = Rt.customSizedDelim(e.rightDelim, P, !0, t.havingStyle(n), e.mode, ["mclose"]), I.makeSpan(["mord"].concat(l.sizingClasses(t)), [z, I.makeSpan(["mfrac"], [x]), _], t);
}, Tr = (e, t) => {
  var n = new G.MathNode("mfrac", [Ae(e.numer, t), Ae(e.denom, t)]);
  if (!e.hasBarLine)
    n.setAttribute("linethickness", "0px");
  else if (e.barSize) {
    var a = Pe(e.barSize, t);
    n.setAttribute("linethickness", K(a));
  }
  var r = fo(e.size, t.style);
  if (r.size !== t.style.size) {
    n = new G.MathNode("mstyle", [n]);
    var l = r.size === ie.DISPLAY.size ? "true" : "false";
    n.setAttribute("displaystyle", l), n.setAttribute("scriptlevel", "0");
  }
  if (e.leftDelim != null || e.rightDelim != null) {
    var i = [];
    if (e.leftDelim != null) {
      var o = new G.MathNode("mo", [new G.TextNode(e.leftDelim.replace("\\", ""))]);
      o.setAttribute("fence", "true"), i.push(o);
    }
    if (i.push(n), e.rightDelim != null) {
      var s = new G.MathNode("mo", [new G.TextNode(e.rightDelim.replace("\\", ""))]);
      s.setAttribute("fence", "true"), i.push(s);
    }
    return pr(i);
  }
  return n;
};
X({
  type: "genfrac",
  names: [
    "\\dfrac",
    "\\frac",
    "\\tfrac",
    "\\dbinom",
    "\\binom",
    "\\tbinom",
    "\\\\atopfrac",
    // can’t be entered directly
    "\\\\bracefrac",
    "\\\\brackfrac"
    // ditto
  ],
  props: {
    numArgs: 2,
    allowedInArgument: !0
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0], l = t[1], i, o = null, s = null, c = "auto";
    switch (a) {
      case "\\dfrac":
      case "\\frac":
      case "\\tfrac":
        i = !0;
        break;
      case "\\\\atopfrac":
        i = !1;
        break;
      case "\\dbinom":
      case "\\binom":
      case "\\tbinom":
        i = !1, o = "(", s = ")";
        break;
      case "\\\\bracefrac":
        i = !1, o = "\\{", s = "\\}";
        break;
      case "\\\\brackfrac":
        i = !1, o = "[", s = "]";
        break;
      default:
        throw new Error("Unrecognized genfrac command");
    }
    switch (a) {
      case "\\dfrac":
      case "\\dbinom":
        c = "display";
        break;
      case "\\tfrac":
      case "\\tbinom":
        c = "text";
        break;
    }
    return {
      type: "genfrac",
      mode: n.mode,
      continued: !1,
      numer: r,
      denom: l,
      hasBarLine: i,
      leftDelim: o,
      rightDelim: s,
      size: c,
      barSize: null
    };
  },
  htmlBuilder: Mr,
  mathmlBuilder: Tr
});
X({
  type: "genfrac",
  names: ["\\cfrac"],
  props: {
    numArgs: 2
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0], l = t[1];
    return {
      type: "genfrac",
      mode: n.mode,
      continued: !0,
      numer: r,
      denom: l,
      hasBarLine: !0,
      leftDelim: null,
      rightDelim: null,
      size: "display",
      barSize: null
    };
  }
});
X({
  type: "infix",
  names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
  props: {
    numArgs: 0,
    infix: !0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n,
      token: a
    } = e, r;
    switch (n) {
      case "\\over":
        r = "\\frac";
        break;
      case "\\choose":
        r = "\\binom";
        break;
      case "\\atop":
        r = "\\\\atopfrac";
        break;
      case "\\brace":
        r = "\\\\bracefrac";
        break;
      case "\\brack":
        r = "\\\\brackfrac";
        break;
      default:
        throw new Error("Unrecognized infix genfrac command");
    }
    return {
      type: "infix",
      mode: t.mode,
      replaceWith: r,
      token: a
    };
  }
});
var yl = ["display", "text", "script", "scriptscript"], bl = function(e) {
  var t = null;
  return e.length > 0 && (t = e, t = t === "." ? null : t), t;
};
X({
  type: "genfrac",
  names: ["\\genfrac"],
  props: {
    numArgs: 6,
    allowedInArgument: !0,
    argTypes: ["math", "math", "size", "text", "math", "math"]
  },
  handler(e, t) {
    var {
      parser: n
    } = e, a = t[4], r = t[5], l = R0(t[0]), i = l.type === "atom" && l.family === "open" ? bl(l.text) : null, o = R0(t[1]), s = o.type === "atom" && o.family === "close" ? bl(o.text) : null, c = fe(t[2], "size"), m, f = null;
    c.isBlank ? m = !0 : (f = c.value, m = f.number > 0);
    var v = "auto", g = t[3];
    if (g.type === "ordgroup") {
      if (g.body.length > 0) {
        var p = fe(g.body[0], "textord");
        v = yl[Number(p.text)];
      }
    } else
      g = fe(g, "textord"), v = yl[Number(g.text)];
    return {
      type: "genfrac",
      mode: n.mode,
      numer: a,
      denom: r,
      continued: !1,
      hasBarLine: m,
      barSize: f,
      leftDelim: i,
      rightDelim: s,
      size: v
    };
  },
  htmlBuilder: Mr,
  mathmlBuilder: Tr
});
X({
  type: "infix",
  names: ["\\above"],
  props: {
    numArgs: 1,
    argTypes: ["size"],
    infix: !0
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a,
      token: r
    } = e;
    return {
      type: "infix",
      mode: n.mode,
      replaceWith: "\\\\abovefrac",
      size: fe(t[0], "size").value,
      token: r
    };
  }
});
X({
  type: "genfrac",
  names: ["\\\\abovefrac"],
  props: {
    numArgs: 3,
    argTypes: ["math", "size", "math"]
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0], l = Nu(fe(t[1], "infix").size), i = t[2], o = l.number > 0;
    return {
      type: "genfrac",
      mode: n.mode,
      numer: r,
      denom: i,
      continued: !1,
      hasBarLine: o,
      barSize: l,
      leftDelim: null,
      rightDelim: null,
      size: "auto"
    };
  },
  htmlBuilder: Mr,
  mathmlBuilder: Tr
});
var vo = (e, t) => {
  var n = t.style, a, r;
  e.type === "supsub" ? (a = e.sup ? xe(e.sup, t.havingStyle(n.sup()), t) : xe(e.sub, t.havingStyle(n.sub()), t), r = fe(e.base, "horizBrace")) : r = fe(e, "horizBrace");
  var l = xe(r.base, t.havingBaseStyle(ie.DISPLAY)), i = Ft.svgSpan(r, t), o;
  if (r.isOver ? (o = I.makeVList({
    positionType: "firstBaseline",
    children: [{
      type: "elem",
      elem: l
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: i
    }]
  }, t), o.children[0].children[0].children[1].classes.push("svg-align")) : (o = I.makeVList({
    positionType: "bottom",
    positionData: l.depth + 0.1 + i.height,
    children: [{
      type: "elem",
      elem: i
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: l
    }]
  }, t), o.children[0].children[0].children[0].classes.push("svg-align")), a) {
    var s = I.makeSpan(["mord", r.isOver ? "mover" : "munder"], [o], t);
    r.isOver ? o = I.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: s
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: a
      }]
    }, t) : o = I.makeVList({
      positionType: "bottom",
      positionData: s.depth + 0.2 + a.height + a.depth,
      children: [{
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: s
      }]
    }, t);
  }
  return I.makeSpan(["mord", r.isOver ? "mover" : "munder"], [o], t);
}, s1 = (e, t) => {
  var n = Ft.mathMLnode(e.label);
  return new G.MathNode(e.isOver ? "mover" : "munder", [Ae(e.base, t), n]);
};
X({
  type: "horizBrace",
  names: ["\\overbrace", "\\underbrace"],
  props: {
    numArgs: 1
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e;
    return {
      type: "horizBrace",
      mode: n.mode,
      label: a,
      isOver: /^\\over/.test(a),
      base: t[0]
    };
  },
  htmlBuilder: vo,
  mathmlBuilder: s1
});
X({
  type: "href",
  names: ["\\href"],
  props: {
    numArgs: 2,
    argTypes: ["url", "original"],
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e, a = t[1], r = fe(t[0], "url").url;
    return n.settings.isTrusted({
      command: "\\href",
      url: r
    }) ? {
      type: "href",
      mode: n.mode,
      href: r,
      body: Oe(a)
    } : n.formatUnsupportedCmd("\\href");
  },
  htmlBuilder: (e, t) => {
    var n = Fe(e.body, t, !1);
    return I.makeAnchor(e.href, [], n, t);
  },
  mathmlBuilder: (e, t) => {
    var n = tn(e.body, t);
    return n instanceof st || (n = new st("mrow", [n])), n.setAttribute("href", e.href), n;
  }
});
X({
  type: "href",
  names: ["\\url"],
  props: {
    numArgs: 1,
    argTypes: ["url"],
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e, a = fe(t[0], "url").url;
    if (!n.settings.isTrusted({
      command: "\\url",
      url: a
    }))
      return n.formatUnsupportedCmd("\\url");
    for (var r = [], l = 0; l < a.length; l++) {
      var i = a[l];
      i === "~" && (i = "\\textasciitilde"), r.push({
        type: "textord",
        mode: "text",
        text: i
      });
    }
    var o = {
      type: "text",
      mode: n.mode,
      font: "\\texttt",
      body: r
    };
    return {
      type: "href",
      mode: n.mode,
      href: a,
      body: Oe(o)
    };
  }
});
X({
  type: "hbox",
  names: ["\\hbox"],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInText: !0,
    primitive: !0
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "hbox",
      mode: n.mode,
      body: Oe(t[0])
    };
  },
  htmlBuilder(e, t) {
    var n = Fe(e.body, t, !1);
    return I.makeFragment(n);
  },
  mathmlBuilder(e, t) {
    return new G.MathNode("mrow", at(e.body, t));
  }
});
X({
  type: "html",
  names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
  props: {
    numArgs: 2,
    argTypes: ["raw", "original"],
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a,
      token: r
    } = e, l = fe(t[0], "raw").string, i = t[1];
    n.settings.strict && n.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
    var o, s = {};
    switch (a) {
      case "\\htmlClass":
        s.class = l, o = {
          command: "\\htmlClass",
          class: l
        };
        break;
      case "\\htmlId":
        s.id = l, o = {
          command: "\\htmlId",
          id: l
        };
        break;
      case "\\htmlStyle":
        s.style = l, o = {
          command: "\\htmlStyle",
          style: l
        };
        break;
      case "\\htmlData": {
        for (var c = l.split(","), m = 0; m < c.length; m++) {
          var f = c[m].split("=");
          if (f.length !== 2)
            throw new W("Error parsing key-value for \\htmlData");
          s["data-" + f[0].trim()] = f[1].trim();
        }
        o = {
          command: "\\htmlData",
          attributes: s
        };
        break;
      }
      default:
        throw new Error("Unrecognized html command");
    }
    return n.settings.isTrusted(o) ? {
      type: "html",
      mode: n.mode,
      attributes: s,
      body: Oe(i)
    } : n.formatUnsupportedCmd(a);
  },
  htmlBuilder: (e, t) => {
    var n = Fe(e.body, t, !1), a = ["enclosing"];
    e.attributes.class && a.push(...e.attributes.class.trim().split(/\s+/));
    var r = I.makeSpan(a, n, t);
    for (var l in e.attributes)
      l !== "class" && e.attributes.hasOwnProperty(l) && r.setAttribute(l, e.attributes[l]);
    return r;
  },
  mathmlBuilder: (e, t) => tn(e.body, t)
});
X({
  type: "htmlmathml",
  names: ["\\html@mathml"],
  props: {
    numArgs: 2,
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e;
    return {
      type: "htmlmathml",
      mode: n.mode,
      html: Oe(t[0]),
      mathml: Oe(t[1])
    };
  },
  htmlBuilder: (e, t) => {
    var n = Fe(e.html, t, !1);
    return I.makeFragment(n);
  },
  mathmlBuilder: (e, t) => tn(e.mathml, t)
});
var Ca = function(e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))
    return {
      number: +e,
      unit: "bp"
    };
  var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!t)
    throw new W("Invalid size: '" + e + "' in \\includegraphics");
  var n = {
    number: +(t[1] + t[2]),
    // sign + magnitude, cast to number
    unit: t[3]
  };
  if (!Ei(n))
    throw new W("Invalid unit: '" + n.unit + "' in \\includegraphics.");
  return n;
};
X({
  type: "includegraphics",
  names: ["\\includegraphics"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    argTypes: ["raw", "url"],
    allowedInText: !1
  },
  handler: (e, t, n) => {
    var {
      parser: a
    } = e, r = {
      number: 0,
      unit: "em"
    }, l = {
      number: 0.9,
      unit: "em"
    }, i = {
      number: 0,
      unit: "em"
    }, o = "";
    if (n[0])
      for (var s = fe(n[0], "raw").string, c = s.split(","), m = 0; m < c.length; m++) {
        var f = c[m].split("=");
        if (f.length === 2) {
          var v = f[1].trim();
          switch (f[0].trim()) {
            case "alt":
              o = v;
              break;
            case "width":
              r = Ca(v);
              break;
            case "height":
              l = Ca(v);
              break;
            case "totalheight":
              i = Ca(v);
              break;
            default:
              throw new W("Invalid key: '" + f[0] + "' in \\includegraphics.");
          }
        }
      }
    var g = fe(t[0], "url").url;
    return o === "" && (o = g, o = o.replace(/^.*[\\/]/, ""), o = o.substring(0, o.lastIndexOf("."))), a.settings.isTrusted({
      command: "\\includegraphics",
      url: g
    }) ? {
      type: "includegraphics",
      mode: a.mode,
      alt: o,
      width: r,
      height: l,
      totalheight: i,
      src: g
    } : a.formatUnsupportedCmd("\\includegraphics");
  },
  htmlBuilder: (e, t) => {
    var n = Pe(e.height, t), a = 0;
    e.totalheight.number > 0 && (a = Pe(e.totalheight, t) - n);
    var r = 0;
    e.width.number > 0 && (r = Pe(e.width, t));
    var l = {
      height: K(n + a)
    };
    r > 0 && (l.width = K(r)), a > 0 && (l.verticalAlign = K(-a));
    var i = new sc(e.src, e.alt, l);
    return i.height = n, i.depth = a, i;
  },
  mathmlBuilder: (e, t) => {
    var n = new G.MathNode("mglyph", []);
    n.setAttribute("alt", e.alt);
    var a = Pe(e.height, t), r = 0;
    if (e.totalheight.number > 0 && (r = Pe(e.totalheight, t) - a, n.setAttribute("valign", K(-r))), n.setAttribute("height", K(a + r)), e.width.number > 0) {
      var l = Pe(e.width, t);
      n.setAttribute("width", K(l));
    }
    return n.setAttribute("src", e.src), n;
  }
});
X({
  type: "kern",
  names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
  props: {
    numArgs: 1,
    argTypes: ["size"],
    primitive: !0,
    allowedInText: !0
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e, r = fe(t[0], "size");
    if (n.settings.strict) {
      var l = a[1] === "m", i = r.value.unit === "mu";
      l ? (i || n.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " supports only mu units, " + ("not " + r.value.unit + " units")), n.mode !== "math" && n.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " works only in math mode")) : i && n.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " doesn't support mu units");
    }
    return {
      type: "kern",
      mode: n.mode,
      dimension: r.value
    };
  },
  htmlBuilder(e, t) {
    return I.makeGlue(e.dimension, t);
  },
  mathmlBuilder(e, t) {
    var n = Pe(e.dimension, t);
    return new G.SpaceNode(n);
  }
});
X({
  type: "lap",
  names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0];
    return {
      type: "lap",
      mode: n.mode,
      alignment: a.slice(5),
      body: r
    };
  },
  htmlBuilder: (e, t) => {
    var n;
    e.alignment === "clap" ? (n = I.makeSpan([], [xe(e.body, t)]), n = I.makeSpan(["inner"], [n], t)) : n = I.makeSpan(["inner"], [xe(e.body, t)]);
    var a = I.makeSpan(["fix"], []), r = I.makeSpan([e.alignment], [n, a], t), l = I.makeSpan(["strut"]);
    return l.style.height = K(r.height + r.depth), r.depth && (l.style.verticalAlign = K(-r.depth)), r.children.unshift(l), r = I.makeSpan(["thinbox"], [r], t), I.makeSpan(["mord", "vbox"], [r], t);
  },
  mathmlBuilder: (e, t) => {
    var n = new G.MathNode("mpadded", [Ae(e.body, t)]);
    if (e.alignment !== "rlap") {
      var a = e.alignment === "llap" ? "-1" : "-0.5";
      n.setAttribute("lspace", a + "width");
    }
    return n.setAttribute("width", "0px"), n;
  }
});
X({
  type: "styling",
  names: ["\\(", "$"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !1
  },
  handler(e, t) {
    var {
      funcName: n,
      parser: a
    } = e, r = a.mode;
    a.switchMode("math");
    var l = n === "\\(" ? "\\)" : "$", i = a.parseExpression(!1, l);
    return a.expect(l), a.switchMode(r), {
      type: "styling",
      mode: a.mode,
      style: "text",
      body: i
    };
  }
});
X({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\)", "\\]"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !1
  },
  handler(e, t) {
    throw new W("Mismatched " + e.funcName);
  }
});
var xl = (e, t) => {
  switch (t.style.size) {
    case ie.DISPLAY.size:
      return e.display;
    case ie.TEXT.size:
      return e.text;
    case ie.SCRIPT.size:
      return e.script;
    case ie.SCRIPTSCRIPT.size:
      return e.scriptscript;
    default:
      return e.text;
  }
};
X({
  type: "mathchoice",
  names: ["\\mathchoice"],
  props: {
    numArgs: 4,
    primitive: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e;
    return {
      type: "mathchoice",
      mode: n.mode,
      display: Oe(t[0]),
      text: Oe(t[1]),
      script: Oe(t[2]),
      scriptscript: Oe(t[3])
    };
  },
  htmlBuilder: (e, t) => {
    var n = xl(e, t), a = Fe(n, t, !1);
    return I.makeFragment(a);
  },
  mathmlBuilder: (e, t) => {
    var n = xl(e, t);
    return tn(n, t);
  }
});
var go = (e, t, n, a, r, l, i) => {
  e = I.makeSpan([], [e]);
  var o = n && ne.isCharacterBox(n), s, c;
  if (t) {
    var m = xe(t, a.havingStyle(r.sup()), a);
    c = {
      elem: m,
      kern: Math.max(a.fontMetrics().bigOpSpacing1, a.fontMetrics().bigOpSpacing3 - m.depth)
    };
  }
  if (n) {
    var f = xe(n, a.havingStyle(r.sub()), a);
    s = {
      elem: f,
      kern: Math.max(a.fontMetrics().bigOpSpacing2, a.fontMetrics().bigOpSpacing4 - f.height)
    };
  }
  var v;
  if (c && s) {
    var g = a.fontMetrics().bigOpSpacing5 + s.elem.height + s.elem.depth + s.kern + e.depth + i;
    v = I.makeVList({
      positionType: "bottom",
      positionData: g,
      children: [{
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: s.elem,
        marginLeft: K(-l)
      }, {
        type: "kern",
        size: s.kern
      }, {
        type: "elem",
        elem: e
      }, {
        type: "kern",
        size: c.kern
      }, {
        type: "elem",
        elem: c.elem,
        marginLeft: K(l)
      }, {
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }]
    }, a);
  } else if (s) {
    var p = e.height - i;
    v = I.makeVList({
      positionType: "top",
      positionData: p,
      children: [{
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: s.elem,
        marginLeft: K(-l)
      }, {
        type: "kern",
        size: s.kern
      }, {
        type: "elem",
        elem: e
      }]
    }, a);
  } else if (c) {
    var b = e.depth + i;
    v = I.makeVList({
      positionType: "bottom",
      positionData: b,
      children: [{
        type: "elem",
        elem: e
      }, {
        type: "kern",
        size: c.kern
      }, {
        type: "elem",
        elem: c.elem,
        marginLeft: K(l)
      }, {
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }]
    }, a);
  } else
    return e;
  var x = [v];
  if (s && l !== 0 && !o) {
    var S = I.makeSpan(["mspace"], [], a);
    S.style.marginRight = K(l), x.unshift(S);
  }
  return I.makeSpan(["mop", "op-limits"], x, a);
}, po = ["\\smallint"], _n = (e, t) => {
  var n, a, r = !1, l;
  e.type === "supsub" ? (n = e.sup, a = e.sub, l = fe(e.base, "op"), r = !0) : l = fe(e, "op");
  var i = t.style, o = !1;
  i.size === ie.DISPLAY.size && l.symbol && !ne.contains(po, l.name) && (o = !0);
  var s;
  if (l.symbol) {
    var c = o ? "Size2-Regular" : "Size1-Regular", m = "";
    if ((l.name === "\\oiint" || l.name === "\\oiiint") && (m = l.name.slice(1), l.name = m === "oiint" ? "\\iint" : "\\iiint"), s = I.makeSymbol(l.name, c, "math", t, ["mop", "op-symbol", o ? "large-op" : "small-op"]), m.length > 0) {
      var f = s.italic, v = I.staticSvg(m + "Size" + (o ? "2" : "1"), t);
      s = I.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: s,
          shift: 0
        }, {
          type: "elem",
          elem: v,
          shift: o ? 0.08 : 0
        }]
      }, t), l.name = "\\" + m, s.classes.unshift("mop"), s.italic = f;
    }
  } else if (l.body) {
    var g = Fe(l.body, t, !0);
    g.length === 1 && g[0] instanceof mt ? (s = g[0], s.classes[0] = "mop") : s = I.makeSpan(["mop"], g, t);
  } else {
    for (var p = [], b = 1; b < l.name.length; b++)
      p.push(I.mathsym(l.name[b], l.mode, t));
    s = I.makeSpan(["mop"], p, t);
  }
  var x = 0, S = 0;
  return (s instanceof mt || l.name === "\\oiint" || l.name === "\\oiiint") && !l.suppressBaseShift && (x = (s.height - s.depth) / 2 - t.fontMetrics().axisHeight, S = s.italic), r ? go(s, n, a, t, i, S, x) : (x && (s.style.position = "relative", s.style.top = K(x)), s);
}, i0 = (e, t) => {
  var n;
  if (e.symbol)
    n = new st("mo", [ht(e.name, e.mode)]), ne.contains(po, e.name) && n.setAttribute("largeop", "false");
  else if (e.body)
    n = new st("mo", at(e.body, t));
  else {
    n = new st("mi", [new jn(e.name.slice(1))]);
    var a = new st("mo", [ht("⁡", "text")]);
    e.parentIsSupSub ? n = new st("mrow", [n, a]) : n = Gi([n, a]);
  }
  return n;
}, u1 = {
  "∏": "\\prod",
  "∐": "\\coprod",
  "∑": "\\sum",
  "⋀": "\\bigwedge",
  "⋁": "\\bigvee",
  "⋂": "\\bigcap",
  "⋃": "\\bigcup",
  "⨀": "\\bigodot",
  "⨁": "\\bigoplus",
  "⨂": "\\bigotimes",
  "⨄": "\\biguplus",
  "⨆": "\\bigsqcup"
};
X({
  type: "op",
  names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "∏", "∐", "∑", "⋀", "⋁", "⋂", "⋃", "⨀", "⨁", "⨂", "⨄", "⨆"],
  props: {
    numArgs: 0
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = a;
    return r.length === 1 && (r = u1[r]), {
      type: "op",
      mode: n.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !0,
      name: r
    };
  },
  htmlBuilder: _n,
  mathmlBuilder: i0
});
X({
  type: "op",
  names: ["\\mathop"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e, a = t[0];
    return {
      type: "op",
      mode: n.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      body: Oe(a)
    };
  },
  htmlBuilder: _n,
  mathmlBuilder: i0
});
var c1 = {
  "∫": "\\int",
  "∬": "\\iint",
  "∭": "\\iiint",
  "∮": "\\oint",
  "∯": "\\oiint",
  "∰": "\\oiiint"
};
X({
  type: "op",
  names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
  props: {
    numArgs: 0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n
    } = e;
    return {
      type: "op",
      mode: t.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      name: n
    };
  },
  htmlBuilder: _n,
  mathmlBuilder: i0
});
X({
  type: "op",
  names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
  props: {
    numArgs: 0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n
    } = e;
    return {
      type: "op",
      mode: t.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !1,
      name: n
    };
  },
  htmlBuilder: _n,
  mathmlBuilder: i0
});
X({
  type: "op",
  names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "∫", "∬", "∭", "∮", "∯", "∰"],
  props: {
    numArgs: 0
  },
  handler(e) {
    var {
      parser: t,
      funcName: n
    } = e, a = n;
    return a.length === 1 && (a = c1[a]), {
      type: "op",
      mode: t.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !0,
      name: a
    };
  },
  htmlBuilder: _n,
  mathmlBuilder: i0
});
var yo = (e, t) => {
  var n, a, r = !1, l;
  e.type === "supsub" ? (n = e.sup, a = e.sub, l = fe(e.base, "operatorname"), r = !0) : l = fe(e, "operatorname");
  var i;
  if (l.body.length > 0) {
    for (var o = l.body.map((f) => {
      var v = f.text;
      return typeof v == "string" ? {
        type: "textord",
        mode: f.mode,
        text: v
      } : f;
    }), s = Fe(o, t.withFont("mathrm"), !0), c = 0; c < s.length; c++) {
      var m = s[c];
      m instanceof mt && (m.text = m.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
    }
    i = I.makeSpan(["mop"], s, t);
  } else
    i = I.makeSpan(["mop"], [], t);
  return r ? go(i, n, a, t, t.style, 0, 0) : i;
}, d1 = (e, t) => {
  for (var n = at(e.body, t.withFont("mathrm")), a = !0, r = 0; r < n.length; r++) {
    var l = n[r];
    if (!(l instanceof G.SpaceNode)) if (l instanceof G.MathNode)
      switch (l.type) {
        case "mi":
        case "mn":
        case "ms":
        case "mspace":
        case "mtext":
          break;
        case "mo": {
          var i = l.children[0];
          l.children.length === 1 && i instanceof G.TextNode ? i.text = i.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : a = !1;
          break;
        }
        default:
          a = !1;
      }
    else
      a = !1;
  }
  if (a) {
    var o = n.map((m) => m.toText()).join("");
    n = [new G.TextNode(o)];
  }
  var s = new G.MathNode("mi", n);
  s.setAttribute("mathvariant", "normal");
  var c = new G.MathNode("mo", [ht("⁡", "text")]);
  return e.parentIsSupSub ? new G.MathNode("mrow", [s, c]) : G.newDocumentFragment([s, c]);
};
X({
  type: "operatorname",
  names: ["\\operatorname@", "\\operatornamewithlimits"],
  props: {
    numArgs: 1
  },
  handler: (e, t) => {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0];
    return {
      type: "operatorname",
      mode: n.mode,
      body: Oe(r),
      alwaysHandleSupSub: a === "\\operatornamewithlimits",
      limits: !1,
      parentIsSupSub: !1
    };
  },
  htmlBuilder: yo,
  mathmlBuilder: d1
});
y("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
yn({
  type: "ordgroup",
  htmlBuilder(e, t) {
    return e.semisimple ? I.makeFragment(Fe(e.body, t, !1)) : I.makeSpan(["mord"], Fe(e.body, t, !0), t);
  },
  mathmlBuilder(e, t) {
    return tn(e.body, t, !0);
  }
});
X({
  type: "overline",
  names: ["\\overline"],
  props: {
    numArgs: 1
  },
  handler(e, t) {
    var {
      parser: n
    } = e, a = t[0];
    return {
      type: "overline",
      mode: n.mode,
      body: a
    };
  },
  htmlBuilder(e, t) {
    var n = xe(e.body, t.havingCrampedStyle()), a = I.makeLineSpan("overline-line", t), r = t.fontMetrics().defaultRuleThickness, l = I.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: n
      }, {
        type: "kern",
        size: 3 * r
      }, {
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: r
      }]
    }, t);
    return I.makeSpan(["mord", "overline"], [l], t);
  },
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mo", [new G.TextNode("‾")]);
    n.setAttribute("stretchy", "true");
    var a = new G.MathNode("mover", [Ae(e.body, t), n]);
    return a.setAttribute("accent", "true"), a;
  }
});
X({
  type: "phantom",
  names: ["\\phantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e, a = t[0];
    return {
      type: "phantom",
      mode: n.mode,
      body: Oe(a)
    };
  },
  htmlBuilder: (e, t) => {
    var n = Fe(e.body, t.withPhantom(), !1);
    return I.makeFragment(n);
  },
  mathmlBuilder: (e, t) => {
    var n = at(e.body, t);
    return new G.MathNode("mphantom", n);
  }
});
X({
  type: "hphantom",
  names: ["\\hphantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e, a = t[0];
    return {
      type: "hphantom",
      mode: n.mode,
      body: a
    };
  },
  htmlBuilder: (e, t) => {
    var n = I.makeSpan([], [xe(e.body, t.withPhantom())]);
    if (n.height = 0, n.depth = 0, n.children)
      for (var a = 0; a < n.children.length; a++)
        n.children[a].height = 0, n.children[a].depth = 0;
    return n = I.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: n
      }]
    }, t), I.makeSpan(["mord"], [n], t);
  },
  mathmlBuilder: (e, t) => {
    var n = at(Oe(e.body), t), a = new G.MathNode("mphantom", n), r = new G.MathNode("mpadded", [a]);
    return r.setAttribute("height", "0px"), r.setAttribute("depth", "0px"), r;
  }
});
X({
  type: "vphantom",
  names: ["\\vphantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      parser: n
    } = e, a = t[0];
    return {
      type: "vphantom",
      mode: n.mode,
      body: a
    };
  },
  htmlBuilder: (e, t) => {
    var n = I.makeSpan(["inner"], [xe(e.body, t.withPhantom())]), a = I.makeSpan(["fix"], []);
    return I.makeSpan(["mord", "rlap"], [n, a], t);
  },
  mathmlBuilder: (e, t) => {
    var n = at(Oe(e.body), t), a = new G.MathNode("mphantom", n), r = new G.MathNode("mpadded", [a]);
    return r.setAttribute("width", "0px"), r;
  }
});
X({
  type: "raisebox",
  names: ["\\raisebox"],
  props: {
    numArgs: 2,
    argTypes: ["size", "hbox"],
    allowedInText: !0
  },
  handler(e, t) {
    var {
      parser: n
    } = e, a = fe(t[0], "size").value, r = t[1];
    return {
      type: "raisebox",
      mode: n.mode,
      dy: a,
      body: r
    };
  },
  htmlBuilder(e, t) {
    var n = xe(e.body, t), a = Pe(e.dy, t);
    return I.makeVList({
      positionType: "shift",
      positionData: -a,
      children: [{
        type: "elem",
        elem: n
      }]
    }, t);
  },
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mpadded", [Ae(e.body, t)]), a = e.dy.number + e.dy.unit;
    return n.setAttribute("voffset", a), n;
  }
});
X({
  type: "internal",
  names: ["\\relax"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(e) {
    var {
      parser: t
    } = e;
    return {
      type: "internal",
      mode: t.mode
    };
  }
});
X({
  type: "rule",
  names: ["\\rule"],
  props: {
    numArgs: 2,
    numOptionalArgs: 1,
    argTypes: ["size", "size", "size"]
  },
  handler(e, t, n) {
    var {
      parser: a
    } = e, r = n[0], l = fe(t[0], "size"), i = fe(t[1], "size");
    return {
      type: "rule",
      mode: a.mode,
      shift: r && fe(r, "size").value,
      width: l.value,
      height: i.value
    };
  },
  htmlBuilder(e, t) {
    var n = I.makeSpan(["mord", "rule"], [], t), a = Pe(e.width, t), r = Pe(e.height, t), l = e.shift ? Pe(e.shift, t) : 0;
    return n.style.borderRightWidth = K(a), n.style.borderTopWidth = K(r), n.style.bottom = K(l), n.width = a, n.height = r + l, n.depth = -l, n.maxFontSize = r * 1.125 * t.sizeMultiplier, n;
  },
  mathmlBuilder(e, t) {
    var n = Pe(e.width, t), a = Pe(e.height, t), r = e.shift ? Pe(e.shift, t) : 0, l = t.color && t.getColor() || "black", i = new G.MathNode("mspace");
    i.setAttribute("mathbackground", l), i.setAttribute("width", K(n)), i.setAttribute("height", K(a));
    var o = new G.MathNode("mpadded", [i]);
    return r >= 0 ? o.setAttribute("height", K(r)) : (o.setAttribute("height", K(r)), o.setAttribute("depth", K(-r))), o.setAttribute("voffset", K(r)), o;
  }
});
function bo(e, t, n) {
  for (var a = Fe(e, t, !1), r = t.sizeMultiplier / n.sizeMultiplier, l = 0; l < a.length; l++) {
    var i = a[l].classes.indexOf("sizing");
    i < 0 ? Array.prototype.push.apply(a[l].classes, t.sizingClasses(n)) : a[l].classes[i + 1] === "reset-size" + t.size && (a[l].classes[i + 1] = "reset-size" + n.size), a[l].height *= r, a[l].depth *= r;
  }
  return I.makeFragment(a);
}
var wl = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], m1 = (e, t) => {
  var n = t.havingSize(e.size);
  return bo(e.body, n, t);
};
X({
  type: "sizing",
  names: wl,
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler: (e, t) => {
    var {
      breakOnTokenText: n,
      funcName: a,
      parser: r
    } = e, l = r.parseExpression(!1, n);
    return {
      type: "sizing",
      mode: r.mode,
      // Figure out what size to use based on the list of functions above
      size: wl.indexOf(a) + 1,
      body: l
    };
  },
  htmlBuilder: m1,
  mathmlBuilder: (e, t) => {
    var n = t.havingSize(e.size), a = at(e.body, n), r = new G.MathNode("mstyle", a);
    return r.setAttribute("mathsize", K(n.sizeMultiplier)), r;
  }
});
X({
  type: "smash",
  names: ["\\smash"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    allowedInText: !0
  },
  handler: (e, t, n) => {
    var {
      parser: a
    } = e, r = !1, l = !1, i = n[0] && fe(n[0], "ordgroup");
    if (i)
      for (var o = "", s = 0; s < i.body.length; ++s) {
        var c = i.body[s];
        if (o = c.text, o === "t")
          r = !0;
        else if (o === "b")
          l = !0;
        else {
          r = !1, l = !1;
          break;
        }
      }
    else
      r = !0, l = !0;
    var m = t[0];
    return {
      type: "smash",
      mode: a.mode,
      body: m,
      smashHeight: r,
      smashDepth: l
    };
  },
  htmlBuilder: (e, t) => {
    var n = I.makeSpan([], [xe(e.body, t)]);
    if (!e.smashHeight && !e.smashDepth)
      return n;
    if (e.smashHeight && (n.height = 0, n.children))
      for (var a = 0; a < n.children.length; a++)
        n.children[a].height = 0;
    if (e.smashDepth && (n.depth = 0, n.children))
      for (var r = 0; r < n.children.length; r++)
        n.children[r].depth = 0;
    var l = I.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: n
      }]
    }, t);
    return I.makeSpan(["mord"], [l], t);
  },
  mathmlBuilder: (e, t) => {
    var n = new G.MathNode("mpadded", [Ae(e.body, t)]);
    return e.smashHeight && n.setAttribute("height", "0px"), e.smashDepth && n.setAttribute("depth", "0px"), n;
  }
});
X({
  type: "sqrt",
  names: ["\\sqrt"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler(e, t, n) {
    var {
      parser: a
    } = e, r = n[0], l = t[0];
    return {
      type: "sqrt",
      mode: a.mode,
      body: l,
      index: r
    };
  },
  htmlBuilder(e, t) {
    var n = xe(e.body, t.havingCrampedStyle());
    n.height === 0 && (n.height = t.fontMetrics().xHeight), n = I.wrapFragment(n, t);
    var a = t.fontMetrics(), r = a.defaultRuleThickness, l = r;
    t.style.id < ie.TEXT.id && (l = t.fontMetrics().xHeight);
    var i = r + l / 4, o = n.height + n.depth + i + r, {
      span: s,
      ruleWidth: c,
      advanceWidth: m
    } = Rt.sqrtImage(o, t), f = s.height - c;
    f > n.height + n.depth + i && (i = (i + f - n.height - n.depth) / 2);
    var v = s.height - n.height - i - c;
    n.style.paddingLeft = K(m);
    var g = I.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: n,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: -(n.height + v)
      }, {
        type: "elem",
        elem: s
      }, {
        type: "kern",
        size: c
      }]
    }, t);
    if (e.index) {
      var p = t.havingStyle(ie.SCRIPTSCRIPT), b = xe(e.index, p, t), x = 0.6 * (g.height - g.depth), S = I.makeVList({
        positionType: "shift",
        positionData: -x,
        children: [{
          type: "elem",
          elem: b
        }]
      }, t), A = I.makeSpan(["root"], [S]);
      return I.makeSpan(["mord", "sqrt"], [A, g], t);
    } else
      return I.makeSpan(["mord", "sqrt"], [g], t);
  },
  mathmlBuilder(e, t) {
    var {
      body: n,
      index: a
    } = e;
    return a ? new G.MathNode("mroot", [Ae(n, t), Ae(a, t)]) : new G.MathNode("msqrt", [Ae(n, t)]);
  }
});
var Sl = {
  display: ie.DISPLAY,
  text: ie.TEXT,
  script: ie.SCRIPT,
  scriptscript: ie.SCRIPTSCRIPT
};
X({
  type: "styling",
  names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(e, t) {
    var {
      breakOnTokenText: n,
      funcName: a,
      parser: r
    } = e, l = r.parseExpression(!0, n), i = a.slice(1, a.length - 5);
    return {
      type: "styling",
      mode: r.mode,
      // Figure out what style to use by pulling out the style from
      // the function name
      style: i,
      body: l
    };
  },
  htmlBuilder(e, t) {
    var n = Sl[e.style], a = t.havingStyle(n).withFont("");
    return bo(e.body, a, t);
  },
  mathmlBuilder(e, t) {
    var n = Sl[e.style], a = t.havingStyle(n), r = at(e.body, a), l = new G.MathNode("mstyle", r), i = {
      display: ["0", "true"],
      text: ["0", "false"],
      script: ["1", "false"],
      scriptscript: ["2", "false"]
    }, o = i[e.style];
    return l.setAttribute("scriptlevel", o[0]), l.setAttribute("displaystyle", o[1]), l;
  }
});
var h1 = function(e, t) {
  var n = e.base;
  if (n)
    if (n.type === "op") {
      var a = n.limits && (t.style.size === ie.DISPLAY.size || n.alwaysHandleSupSub);
      return a ? _n : null;
    } else if (n.type === "operatorname") {
      var r = n.alwaysHandleSupSub && (t.style.size === ie.DISPLAY.size || n.limits);
      return r ? yo : null;
    } else {
      if (n.type === "accent")
        return ne.isCharacterBox(n.base) ? xr : null;
      if (n.type === "horizBrace") {
        var l = !e.sub;
        return l === n.isOver ? vo : null;
      } else
        return null;
    }
  else return null;
};
yn({
  type: "supsub",
  htmlBuilder(e, t) {
    var n = h1(e, t);
    if (n)
      return n(e, t);
    var {
      base: a,
      sup: r,
      sub: l
    } = e, i = xe(a, t), o, s, c = t.fontMetrics(), m = 0, f = 0, v = a && ne.isCharacterBox(a);
    if (r) {
      var g = t.havingStyle(t.style.sup());
      o = xe(r, g, t), v || (m = i.height - g.fontMetrics().supDrop * g.sizeMultiplier / t.sizeMultiplier);
    }
    if (l) {
      var p = t.havingStyle(t.style.sub());
      s = xe(l, p, t), v || (f = i.depth + p.fontMetrics().subDrop * p.sizeMultiplier / t.sizeMultiplier);
    }
    var b;
    t.style === ie.DISPLAY ? b = c.sup1 : t.style.cramped ? b = c.sup3 : b = c.sup2;
    var x = t.sizeMultiplier, S = K(0.5 / c.ptPerEm / x), A = null;
    if (s) {
      var V = e.base && e.base.type === "op" && e.base.name && (e.base.name === "\\oiint" || e.base.name === "\\oiiint");
      (i instanceof mt || V) && (A = K(-i.italic));
    }
    var P;
    if (o && s) {
      m = Math.max(m, b, o.depth + 0.25 * c.xHeight), f = Math.max(f, c.sub2);
      var z = c.defaultRuleThickness, _ = 4 * z;
      if (m - o.depth - (s.height - f) < _) {
        f = _ - (m - o.depth) + s.height;
        var O = 0.8 * c.xHeight - (m - o.depth);
        O > 0 && (m += O, f -= O);
      }
      var B = [{
        type: "elem",
        elem: s,
        shift: f,
        marginRight: S,
        marginLeft: A
      }, {
        type: "elem",
        elem: o,
        shift: -m,
        marginRight: S
      }];
      P = I.makeVList({
        positionType: "individualShift",
        children: B
      }, t);
    } else if (s) {
      f = Math.max(f, c.sub1, s.height - 0.8 * c.xHeight);
      var E = [{
        type: "elem",
        elem: s,
        marginLeft: A,
        marginRight: S
      }];
      P = I.makeVList({
        positionType: "shift",
        positionData: f,
        children: E
      }, t);
    } else if (o)
      m = Math.max(m, b, o.depth + 0.25 * c.xHeight), P = I.makeVList({
        positionType: "shift",
        positionData: -m,
        children: [{
          type: "elem",
          elem: o,
          marginRight: S
        }]
      }, t);
    else
      throw new Error("supsub must have either sup or sub.");
    var j = Ga(i, "right") || "mord";
    return I.makeSpan([j], [i, I.makeSpan(["msupsub"], [P])], t);
  },
  mathmlBuilder(e, t) {
    var n = !1, a, r;
    e.base && e.base.type === "horizBrace" && (r = !!e.sup, r === e.base.isOver && (n = !0, a = e.base.isOver)), e.base && (e.base.type === "op" || e.base.type === "operatorname") && (e.base.parentIsSupSub = !0);
    var l = [Ae(e.base, t)];
    e.sub && l.push(Ae(e.sub, t)), e.sup && l.push(Ae(e.sup, t));
    var i;
    if (n)
      i = a ? "mover" : "munder";
    else if (e.sub)
      if (e.sup) {
        var o = e.base;
        o && o.type === "op" && o.limits && t.style === ie.DISPLAY || o && o.type === "operatorname" && o.alwaysHandleSupSub && (t.style === ie.DISPLAY || o.limits) ? i = "munderover" : i = "msubsup";
      } else {
        var s = e.base;
        s && s.type === "op" && s.limits && (t.style === ie.DISPLAY || s.alwaysHandleSupSub) || s && s.type === "operatorname" && s.alwaysHandleSupSub && (s.limits || t.style === ie.DISPLAY) ? i = "munder" : i = "msub";
      }
    else {
      var c = e.base;
      c && c.type === "op" && c.limits && (t.style === ie.DISPLAY || c.alwaysHandleSupSub) || c && c.type === "operatorname" && c.alwaysHandleSupSub && (c.limits || t.style === ie.DISPLAY) ? i = "mover" : i = "msup";
    }
    return new G.MathNode(i, l);
  }
});
yn({
  type: "atom",
  htmlBuilder(e, t) {
    return I.mathsym(e.text, e.mode, t, ["m" + e.family]);
  },
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mo", [ht(e.text, e.mode)]);
    if (e.family === "bin") {
      var a = yr(e, t);
      a === "bold-italic" && n.setAttribute("mathvariant", a);
    } else e.family === "punct" ? n.setAttribute("separator", "true") : (e.family === "open" || e.family === "close") && n.setAttribute("stretchy", "false");
    return n;
  }
});
var xo = {
  mi: "italic",
  mn: "normal",
  mtext: "normal"
};
yn({
  type: "mathord",
  htmlBuilder(e, t) {
    return I.makeOrd(e, t, "mathord");
  },
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mi", [ht(e.text, e.mode, t)]), a = yr(e, t) || "italic";
    return a !== xo[n.type] && n.setAttribute("mathvariant", a), n;
  }
});
yn({
  type: "textord",
  htmlBuilder(e, t) {
    return I.makeOrd(e, t, "textord");
  },
  mathmlBuilder(e, t) {
    var n = ht(e.text, e.mode, t), a = yr(e, t) || "normal", r;
    return e.mode === "text" ? r = new G.MathNode("mtext", [n]) : /[0-9]/.test(e.text) ? r = new G.MathNode("mn", [n]) : e.text === "\\prime" ? r = new G.MathNode("mo", [n]) : r = new G.MathNode("mi", [n]), a !== xo[r.type] && r.setAttribute("mathvariant", a), r;
  }
});
var Aa = {
  "\\nobreak": "nobreak",
  "\\allowbreak": "allowbreak"
}, Ma = {
  " ": {},
  "\\ ": {},
  "~": {
    className: "nobreak"
  },
  "\\space": {},
  "\\nobreakspace": {
    className: "nobreak"
  }
};
yn({
  type: "spacing",
  htmlBuilder(e, t) {
    if (Ma.hasOwnProperty(e.text)) {
      var n = Ma[e.text].className || "";
      if (e.mode === "text") {
        var a = I.makeOrd(e, t, "textord");
        return a.classes.push(n), a;
      } else
        return I.makeSpan(["mspace", n], [I.mathsym(e.text, e.mode, t)], t);
    } else {
      if (Aa.hasOwnProperty(e.text))
        return I.makeSpan(["mspace", Aa[e.text]], [], t);
      throw new W('Unknown type of space "' + e.text + '"');
    }
  },
  mathmlBuilder(e, t) {
    var n;
    if (Ma.hasOwnProperty(e.text))
      n = new G.MathNode("mtext", [new G.TextNode(" ")]);
    else {
      if (Aa.hasOwnProperty(e.text))
        return new G.MathNode("mspace");
      throw new W('Unknown type of space "' + e.text + '"');
    }
    return n;
  }
});
var kl = () => {
  var e = new G.MathNode("mtd", []);
  return e.setAttribute("width", "50%"), e;
};
yn({
  type: "tag",
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mtable", [new G.MathNode("mtr", [kl(), new G.MathNode("mtd", [tn(e.body, t)]), kl(), new G.MathNode("mtd", [tn(e.tag, t)])])]);
    return n.setAttribute("width", "100%"), n;
  }
});
var Cl = {
  "\\text": void 0,
  "\\textrm": "textrm",
  "\\textsf": "textsf",
  "\\texttt": "texttt",
  "\\textnormal": "textrm"
}, Al = {
  "\\textbf": "textbf",
  "\\textmd": "textmd"
}, f1 = {
  "\\textit": "textit",
  "\\textup": "textup"
}, Ml = (e, t) => {
  var n = e.font;
  if (n) {
    if (Cl[n])
      return t.withTextFontFamily(Cl[n]);
    if (Al[n])
      return t.withTextFontWeight(Al[n]);
    if (n === "\\emph")
      return t.fontShape === "textit" ? t.withTextFontShape("textup") : t.withTextFontShape("textit");
  } else return t;
  return t.withTextFontShape(f1[n]);
};
X({
  type: "text",
  names: [
    // Font families
    "\\text",
    "\\textrm",
    "\\textsf",
    "\\texttt",
    "\\textnormal",
    // Font weights
    "\\textbf",
    "\\textmd",
    // Font Shapes
    "\\textit",
    "\\textup",
    "\\emph"
  ],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInArgument: !0,
    allowedInText: !0
  },
  handler(e, t) {
    var {
      parser: n,
      funcName: a
    } = e, r = t[0];
    return {
      type: "text",
      mode: n.mode,
      body: Oe(r),
      font: a
    };
  },
  htmlBuilder(e, t) {
    var n = Ml(e, t), a = Fe(e.body, n, !0);
    return I.makeSpan(["mord", "text"], a, n);
  },
  mathmlBuilder(e, t) {
    var n = Ml(e, t);
    return tn(e.body, n);
  }
});
X({
  type: "underline",
  names: ["\\underline"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "underline",
      mode: n.mode,
      body: t[0]
    };
  },
  htmlBuilder(e, t) {
    var n = xe(e.body, t), a = I.makeLineSpan("underline-line", t), r = t.fontMetrics().defaultRuleThickness, l = I.makeVList({
      positionType: "top",
      positionData: n.height,
      children: [{
        type: "kern",
        size: r
      }, {
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: 3 * r
      }, {
        type: "elem",
        elem: n
      }]
    }, t);
    return I.makeSpan(["mord", "underline"], [l], t);
  },
  mathmlBuilder(e, t) {
    var n = new G.MathNode("mo", [new G.TextNode("‾")]);
    n.setAttribute("stretchy", "true");
    var a = new G.MathNode("munder", [Ae(e.body, t), n]);
    return a.setAttribute("accentunder", "true"), a;
  }
});
X({
  type: "vcenter",
  names: ["\\vcenter"],
  props: {
    numArgs: 1,
    argTypes: ["original"],
    // In LaTeX, \vcenter can act only on a box.
    allowedInText: !1
  },
  handler(e, t) {
    var {
      parser: n
    } = e;
    return {
      type: "vcenter",
      mode: n.mode,
      body: t[0]
    };
  },
  htmlBuilder(e, t) {
    var n = xe(e.body, t), a = t.fontMetrics().axisHeight, r = 0.5 * (n.height - a - (n.depth + a));
    return I.makeVList({
      positionType: "shift",
      positionData: r,
      children: [{
        type: "elem",
        elem: n
      }]
    }, t);
  },
  mathmlBuilder(e, t) {
    return new G.MathNode("mpadded", [Ae(e.body, t)], ["vcenter"]);
  }
});
X({
  type: "verb",
  names: ["\\verb"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(e, t, n) {
    throw new W("\\verb ended by end of line instead of matching delimiter");
  },
  htmlBuilder(e, t) {
    for (var n = Tl(e), a = [], r = t.havingStyle(t.style.text()), l = 0; l < n.length; l++) {
      var i = n[l];
      i === "~" && (i = "\\textasciitilde"), a.push(I.makeSymbol(i, "Typewriter-Regular", e.mode, r, ["mord", "texttt"]));
    }
    return I.makeSpan(["mord", "text"].concat(r.sizingClasses(t)), I.tryCombineChars(a), r);
  },
  mathmlBuilder(e, t) {
    var n = new G.TextNode(Tl(e)), a = new G.MathNode("mtext", [n]);
    return a.setAttribute("mathvariant", "monospace"), a;
  }
});
var Tl = (e) => e.body.replace(/ /g, e.star ? "␣" : " "), Zt = Hi, wo = `[ \r
	]`, v1 = "\\\\[a-zA-Z@]+", g1 = "\\\\[^\uD800-\uDFFF]", p1 = "(" + v1 + ")" + wo + "*", y1 = `\\\\(
|[ \r	]+
?)[ \r	]*`, Ya = "[̀-ͯ]", b1 = new RegExp(Ya + "+$"), x1 = "(" + wo + "+)|" + // whitespace
(y1 + "|") + // \whitespace
"([!-\\[\\]-‧‪-퟿豈-￿]" + // single codepoint
(Ya + "*") + // ...plus accents
"|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
(Ya + "*") + // ...plus accents
"|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + // \verb unstarred
("|" + p1) + // \macroName + spaces
("|" + g1 + ")");
class Bl {
  // Category codes. The lexer only supports comment characters (14) for now.
  // MacroExpander additionally distinguishes active (13).
  constructor(t, n) {
    this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = t, this.settings = n, this.tokenRegex = new RegExp(x1, "g"), this.catcodes = {
      "%": 14,
      // comment character
      "~": 13
      // active character
    };
  }
  setCatcode(t, n) {
    this.catcodes[t] = n;
  }
  /**
   * This function lexes a single token.
   */
  lex() {
    var t = this.input, n = this.tokenRegex.lastIndex;
    if (n === t.length)
      return new ct("EOF", new rt(this, n, n));
    var a = this.tokenRegex.exec(t);
    if (a === null || a.index !== n)
      throw new W("Unexpected character: '" + t[n] + "'", new ct(t[n], new rt(this, n, n + 1)));
    var r = a[6] || a[3] || (a[2] ? "\\ " : " ");
    if (this.catcodes[r] === 14) {
      var l = t.indexOf(`
`, this.tokenRegex.lastIndex);
      return l === -1 ? (this.tokenRegex.lastIndex = t.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = l + 1, this.lex();
    }
    return new ct(r, new rt(this, n, this.tokenRegex.lastIndex));
  }
}
class w1 {
  /**
   * Both arguments are optional.  The first argument is an object of
   * built-in mappings which never change.  The second argument is an object
   * of initial (global-level) mappings, which will constantly change
   * according to any global/top-level `set`s done.
   */
  constructor(t, n) {
    t === void 0 && (t = {}), n === void 0 && (n = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = n, this.builtins = t, this.undefStack = [];
  }
  /**
   * Start a new nested group, affecting future local `set`s.
   */
  beginGroup() {
    this.undefStack.push({});
  }
  /**
   * End current nested group, restoring values before the group began.
   */
  endGroup() {
    if (this.undefStack.length === 0)
      throw new W("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
    var t = this.undefStack.pop();
    for (var n in t)
      t.hasOwnProperty(n) && (t[n] == null ? delete this.current[n] : this.current[n] = t[n]);
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    for (; this.undefStack.length > 0; )
      this.endGroup();
  }
  /**
   * Detect whether `name` has a definition.  Equivalent to
   * `get(name) != null`.
   */
  has(t) {
    return this.current.hasOwnProperty(t) || this.builtins.hasOwnProperty(t);
  }
  /**
   * Get the current value of a name, or `undefined` if there is no value.
   *
   * Note: Do not use `if (namespace.get(...))` to detect whether a macro
   * is defined, as the definition may be the empty string which evaluates
   * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
   * `if (namespace.has(...))`.
   */
  get(t) {
    return this.current.hasOwnProperty(t) ? this.current[t] : this.builtins[t];
  }
  /**
   * Set the current value of a name, and optionally set it globally too.
   * Local set() sets the current value and (when appropriate) adds an undo
   * operation to the undo stack.  Global set() may change the undo
   * operation at every level, so takes time linear in their number.
   * A value of undefined means to delete existing definitions.
   */
  set(t, n, a) {
    if (a === void 0 && (a = !1), a) {
      for (var r = 0; r < this.undefStack.length; r++)
        delete this.undefStack[r][t];
      this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][t] = n);
    } else {
      var l = this.undefStack[this.undefStack.length - 1];
      l && !l.hasOwnProperty(t) && (l[t] = this.current[t]);
    }
    n == null ? delete this.current[t] : this.current[t] = n;
  }
}
var S1 = uo;
y("\\noexpand", function(e) {
  var t = e.popToken();
  return e.isExpandable(t.text) && (t.noexpand = !0, t.treatAsRelax = !0), {
    tokens: [t],
    numArgs: 0
  };
});
y("\\expandafter", function(e) {
  var t = e.popToken();
  return e.expandOnce(!0), {
    tokens: [t],
    numArgs: 0
  };
});
y("\\@firstoftwo", function(e) {
  var t = e.consumeArgs(2);
  return {
    tokens: t[0],
    numArgs: 0
  };
});
y("\\@secondoftwo", function(e) {
  var t = e.consumeArgs(2);
  return {
    tokens: t[1],
    numArgs: 0
  };
});
y("\\@ifnextchar", function(e) {
  var t = e.consumeArgs(3);
  e.consumeSpaces();
  var n = e.future();
  return t[0].length === 1 && t[0][0].text === n.text ? {
    tokens: t[1],
    numArgs: 0
  } : {
    tokens: t[2],
    numArgs: 0
  };
});
y("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
y("\\TextOrMath", function(e) {
  var t = e.consumeArgs(2);
  return e.mode === "text" ? {
    tokens: t[0],
    numArgs: 0
  } : {
    tokens: t[1],
    numArgs: 0
  };
});
var Il = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
y("\\char", function(e) {
  var t = e.popToken(), n, a = "";
  if (t.text === "'")
    n = 8, t = e.popToken();
  else if (t.text === '"')
    n = 16, t = e.popToken();
  else if (t.text === "`")
    if (t = e.popToken(), t.text[0] === "\\")
      a = t.text.charCodeAt(1);
    else {
      if (t.text === "EOF")
        throw new W("\\char` missing argument");
      a = t.text.charCodeAt(0);
    }
  else
    n = 10;
  if (n) {
    if (a = Il[t.text], a == null || a >= n)
      throw new W("Invalid base-" + n + " digit " + t.text);
    for (var r; (r = Il[e.future().text]) != null && r < n; )
      a *= n, a += r, e.popToken();
  }
  return "\\@char{" + a + "}";
});
var Br = (e, t, n) => {
  var a = e.consumeArg().tokens;
  if (a.length !== 1)
    throw new W("\\newcommand's first argument must be a macro name");
  var r = a[0].text, l = e.isDefined(r);
  if (l && !t)
    throw new W("\\newcommand{" + r + "} attempting to redefine " + (r + "; use \\renewcommand"));
  if (!l && !n)
    throw new W("\\renewcommand{" + r + "} when command " + r + " does not yet exist; use \\newcommand");
  var i = 0;
  if (a = e.consumeArg().tokens, a.length === 1 && a[0].text === "[") {
    for (var o = "", s = e.expandNextToken(); s.text !== "]" && s.text !== "EOF"; )
      o += s.text, s = e.expandNextToken();
    if (!o.match(/^\s*[0-9]+\s*$/))
      throw new W("Invalid number of arguments: " + o);
    i = parseInt(o), a = e.consumeArg().tokens;
  }
  return e.macros.set(r, {
    tokens: a,
    numArgs: i
  }), "";
};
y("\\newcommand", (e) => Br(e, !1, !0));
y("\\renewcommand", (e) => Br(e, !0, !1));
y("\\providecommand", (e) => Br(e, !0, !0));
y("\\message", (e) => {
  var t = e.consumeArgs(1)[0];
  return console.log(t.reverse().map((n) => n.text).join("")), "";
});
y("\\errmessage", (e) => {
  var t = e.consumeArgs(1)[0];
  return console.error(t.reverse().map((n) => n.text).join("")), "";
});
y("\\show", (e) => {
  var t = e.popToken(), n = t.text;
  return console.log(t, e.macros.get(n), Zt[n], Me.math[n], Me.text[n]), "";
});
y("\\bgroup", "{");
y("\\egroup", "}");
y("~", "\\nobreakspace");
y("\\lq", "`");
y("\\rq", "'");
y("\\aa", "\\r a");
y("\\AA", "\\r A");
y("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
y("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
y("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
y("ℬ", "\\mathscr{B}");
y("ℰ", "\\mathscr{E}");
y("ℱ", "\\mathscr{F}");
y("ℋ", "\\mathscr{H}");
y("ℐ", "\\mathscr{I}");
y("ℒ", "\\mathscr{L}");
y("ℳ", "\\mathscr{M}");
y("ℛ", "\\mathscr{R}");
y("ℭ", "\\mathfrak{C}");
y("ℌ", "\\mathfrak{H}");
y("ℨ", "\\mathfrak{Z}");
y("\\Bbbk", "\\Bbb{k}");
y("·", "\\cdotp");
y("\\llap", "\\mathllap{\\textrm{#1}}");
y("\\rlap", "\\mathrlap{\\textrm{#1}}");
y("\\clap", "\\mathclap{\\textrm{#1}}");
y("\\mathstrut", "\\vphantom{(}");
y("\\underbar", "\\underline{\\text{#1}}");
y("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
y("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
y("\\ne", "\\neq");
y("≠", "\\neq");
y("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}");
y("∉", "\\notin");
y("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}");
y("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
y("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
y("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
y("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}");
y("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
y("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
y("⟂", "\\perp");
y("‼", "\\mathclose{!\\mkern-0.8mu!}");
y("∌", "\\notni");
y("⌜", "\\ulcorner");
y("⌝", "\\urcorner");
y("⌞", "\\llcorner");
y("⌟", "\\lrcorner");
y("©", "\\copyright");
y("®", "\\textregistered");
y("️", "\\textregistered");
y("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
y("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
y("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
y("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
y("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}");
y("⋮", "\\vdots");
y("\\varGamma", "\\mathit{\\Gamma}");
y("\\varDelta", "\\mathit{\\Delta}");
y("\\varTheta", "\\mathit{\\Theta}");
y("\\varLambda", "\\mathit{\\Lambda}");
y("\\varXi", "\\mathit{\\Xi}");
y("\\varPi", "\\mathit{\\Pi}");
y("\\varSigma", "\\mathit{\\Sigma}");
y("\\varUpsilon", "\\mathit{\\Upsilon}");
y("\\varPhi", "\\mathit{\\Phi}");
y("\\varPsi", "\\mathit{\\Psi}");
y("\\varOmega", "\\mathit{\\Omega}");
y("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
y("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
y("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
y("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
y("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
y("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
var zl = {
  ",": "\\dotsc",
  "\\not": "\\dotsb",
  // \keybin@ checks for the following:
  "+": "\\dotsb",
  "=": "\\dotsb",
  "<": "\\dotsb",
  ">": "\\dotsb",
  "-": "\\dotsb",
  "*": "\\dotsb",
  ":": "\\dotsb",
  // Symbols whose definition starts with \DOTSB:
  "\\DOTSB": "\\dotsb",
  "\\coprod": "\\dotsb",
  "\\bigvee": "\\dotsb",
  "\\bigwedge": "\\dotsb",
  "\\biguplus": "\\dotsb",
  "\\bigcap": "\\dotsb",
  "\\bigcup": "\\dotsb",
  "\\prod": "\\dotsb",
  "\\sum": "\\dotsb",
  "\\bigotimes": "\\dotsb",
  "\\bigoplus": "\\dotsb",
  "\\bigodot": "\\dotsb",
  "\\bigsqcup": "\\dotsb",
  "\\And": "\\dotsb",
  "\\longrightarrow": "\\dotsb",
  "\\Longrightarrow": "\\dotsb",
  "\\longleftarrow": "\\dotsb",
  "\\Longleftarrow": "\\dotsb",
  "\\longleftrightarrow": "\\dotsb",
  "\\Longleftrightarrow": "\\dotsb",
  "\\mapsto": "\\dotsb",
  "\\longmapsto": "\\dotsb",
  "\\hookrightarrow": "\\dotsb",
  "\\doteq": "\\dotsb",
  // Symbols whose definition starts with \mathbin:
  "\\mathbin": "\\dotsb",
  // Symbols whose definition starts with \mathrel:
  "\\mathrel": "\\dotsb",
  "\\relbar": "\\dotsb",
  "\\Relbar": "\\dotsb",
  "\\xrightarrow": "\\dotsb",
  "\\xleftarrow": "\\dotsb",
  // Symbols whose definition starts with \DOTSI:
  "\\DOTSI": "\\dotsi",
  "\\int": "\\dotsi",
  "\\oint": "\\dotsi",
  "\\iint": "\\dotsi",
  "\\iiint": "\\dotsi",
  "\\iiiint": "\\dotsi",
  "\\idotsint": "\\dotsi",
  // Symbols whose definition starts with \DOTSX:
  "\\DOTSX": "\\dotsx"
};
y("\\dots", function(e) {
  var t = "\\dotso", n = e.expandAfterFuture().text;
  return n in zl ? t = zl[n] : (n.slice(0, 4) === "\\not" || n in Me.math && ne.contains(["bin", "rel"], Me.math[n].group)) && (t = "\\dotsb"), t;
});
var Ir = {
  // \rightdelim@ checks for the following:
  ")": !0,
  "]": !0,
  "\\rbrack": !0,
  "\\}": !0,
  "\\rbrace": !0,
  "\\rangle": !0,
  "\\rceil": !0,
  "\\rfloor": !0,
  "\\rgroup": !0,
  "\\rmoustache": !0,
  "\\right": !0,
  "\\bigr": !0,
  "\\biggr": !0,
  "\\Bigr": !0,
  "\\Biggr": !0,
  // \extra@ also tests for the following:
  $: !0,
  // \extrap@ checks for the following:
  ";": !0,
  ".": !0,
  ",": !0
};
y("\\dotso", function(e) {
  var t = e.future().text;
  return t in Ir ? "\\ldots\\," : "\\ldots";
});
y("\\dotsc", function(e) {
  var t = e.future().text;
  return t in Ir && t !== "," ? "\\ldots\\," : "\\ldots";
});
y("\\cdots", function(e) {
  var t = e.future().text;
  return t in Ir ? "\\@cdots\\," : "\\@cdots";
});
y("\\dotsb", "\\cdots");
y("\\dotsm", "\\cdots");
y("\\dotsi", "\\!\\cdots");
y("\\dotsx", "\\ldots\\,");
y("\\DOTSI", "\\relax");
y("\\DOTSB", "\\relax");
y("\\DOTSX", "\\relax");
y("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
y("\\,", "\\tmspace+{3mu}{.1667em}");
y("\\thinspace", "\\,");
y("\\>", "\\mskip{4mu}");
y("\\:", "\\tmspace+{4mu}{.2222em}");
y("\\medspace", "\\:");
y("\\;", "\\tmspace+{5mu}{.2777em}");
y("\\thickspace", "\\;");
y("\\!", "\\tmspace-{3mu}{.1667em}");
y("\\negthinspace", "\\!");
y("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
y("\\negthickspace", "\\tmspace-{5mu}{.277em}");
y("\\enspace", "\\kern.5em ");
y("\\enskip", "\\hskip.5em\\relax");
y("\\quad", "\\hskip1em\\relax");
y("\\qquad", "\\hskip2em\\relax");
y("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
y("\\tag@paren", "\\tag@literal{({#1})}");
y("\\tag@literal", (e) => {
  if (e.macros.get("\\df@tag"))
    throw new W("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
y("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
y("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
y("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
y("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
y("\\newline", "\\\\\\relax");
y("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var So = K(wt["Main-Regular"][84][1] - 0.7 * wt["Main-Regular"][65][1]);
y("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + So + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
y("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + So + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
y("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
y("\\@hspace", "\\hskip #1\\relax");
y("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
y("\\ordinarycolon", ":");
y("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
y("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
y("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
y("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
y("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
y("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
y("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
y("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
y("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
y("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
y("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
y("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
y("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
y("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
y("∷", "\\dblcolon");
y("∹", "\\eqcolon");
y("≔", "\\coloneqq");
y("≕", "\\eqqcolon");
y("⩴", "\\Coloneqq");
y("\\ratio", "\\vcentcolon");
y("\\coloncolon", "\\dblcolon");
y("\\colonequals", "\\coloneqq");
y("\\coloncolonequals", "\\Coloneqq");
y("\\equalscolon", "\\eqqcolon");
y("\\equalscoloncolon", "\\Eqqcolon");
y("\\colonminus", "\\coloneq");
y("\\coloncolonminus", "\\Coloneq");
y("\\minuscolon", "\\eqcolon");
y("\\minuscoloncolon", "\\Eqcolon");
y("\\coloncolonapprox", "\\Colonapprox");
y("\\coloncolonsim", "\\Colonsim");
y("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
y("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
y("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
y("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
y("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
y("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
y("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
y("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
y("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
y("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
y("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
y("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
y("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
y("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
y("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
y("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
y("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
y("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
y("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
y("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
y("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
y("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
y("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
y("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
y("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
y("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
y("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
y("\\imath", "\\html@mathml{\\@imath}{ı}");
y("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
y("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}");
y("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}");
y("⟦", "\\llbracket");
y("⟧", "\\rrbracket");
y("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}");
y("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}");
y("⦃", "\\lBrace");
y("⦄", "\\rBrace");
y("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}");
y("⦵", "\\minuso");
y("\\darr", "\\downarrow");
y("\\dArr", "\\Downarrow");
y("\\Darr", "\\Downarrow");
y("\\lang", "\\langle");
y("\\rang", "\\rangle");
y("\\uarr", "\\uparrow");
y("\\uArr", "\\Uparrow");
y("\\Uarr", "\\Uparrow");
y("\\N", "\\mathbb{N}");
y("\\R", "\\mathbb{R}");
y("\\Z", "\\mathbb{Z}");
y("\\alef", "\\aleph");
y("\\alefsym", "\\aleph");
y("\\Alpha", "\\mathrm{A}");
y("\\Beta", "\\mathrm{B}");
y("\\bull", "\\bullet");
y("\\Chi", "\\mathrm{X}");
y("\\clubs", "\\clubsuit");
y("\\cnums", "\\mathbb{C}");
y("\\Complex", "\\mathbb{C}");
y("\\Dagger", "\\ddagger");
y("\\diamonds", "\\diamondsuit");
y("\\empty", "\\emptyset");
y("\\Epsilon", "\\mathrm{E}");
y("\\Eta", "\\mathrm{H}");
y("\\exist", "\\exists");
y("\\harr", "\\leftrightarrow");
y("\\hArr", "\\Leftrightarrow");
y("\\Harr", "\\Leftrightarrow");
y("\\hearts", "\\heartsuit");
y("\\image", "\\Im");
y("\\infin", "\\infty");
y("\\Iota", "\\mathrm{I}");
y("\\isin", "\\in");
y("\\Kappa", "\\mathrm{K}");
y("\\larr", "\\leftarrow");
y("\\lArr", "\\Leftarrow");
y("\\Larr", "\\Leftarrow");
y("\\lrarr", "\\leftrightarrow");
y("\\lrArr", "\\Leftrightarrow");
y("\\Lrarr", "\\Leftrightarrow");
y("\\Mu", "\\mathrm{M}");
y("\\natnums", "\\mathbb{N}");
y("\\Nu", "\\mathrm{N}");
y("\\Omicron", "\\mathrm{O}");
y("\\plusmn", "\\pm");
y("\\rarr", "\\rightarrow");
y("\\rArr", "\\Rightarrow");
y("\\Rarr", "\\Rightarrow");
y("\\real", "\\Re");
y("\\reals", "\\mathbb{R}");
y("\\Reals", "\\mathbb{R}");
y("\\Rho", "\\mathrm{P}");
y("\\sdot", "\\cdot");
y("\\sect", "\\S");
y("\\spades", "\\spadesuit");
y("\\sub", "\\subset");
y("\\sube", "\\subseteq");
y("\\supe", "\\supseteq");
y("\\Tau", "\\mathrm{T}");
y("\\thetasym", "\\vartheta");
y("\\weierp", "\\wp");
y("\\Zeta", "\\mathrm{Z}");
y("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
y("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
y("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
y("\\bra", "\\mathinner{\\langle{#1}|}");
y("\\ket", "\\mathinner{|{#1}\\rangle}");
y("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
y("\\Bra", "\\left\\langle#1\\right|");
y("\\Ket", "\\left|#1\\right\\rangle");
var ko = (e) => (t) => {
  var n = t.consumeArg().tokens, a = t.consumeArg().tokens, r = t.consumeArg().tokens, l = t.consumeArg().tokens, i = t.macros.get("|"), o = t.macros.get("\\|");
  t.macros.beginGroup();
  var s = (f) => (v) => {
    e && (v.macros.set("|", i), r.length && v.macros.set("\\|", o));
    var g = f;
    if (!f && r.length) {
      var p = v.future();
      p.text === "|" && (v.popToken(), g = !0);
    }
    return {
      tokens: g ? r : a,
      numArgs: 0
    };
  };
  t.macros.set("|", s(!1)), r.length && t.macros.set("\\|", s(!0));
  var c = t.consumeArg().tokens, m = t.expandTokens([
    ...l,
    ...c,
    ...n
    // reversed
  ]);
  return t.macros.endGroup(), {
    tokens: m.reverse(),
    numArgs: 0
  };
};
y("\\bra@ket", ko(!1));
y("\\bra@set", ko(!0));
y("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
y("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
y("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
y("\\angln", "{\\angl n}");
y("\\blue", "\\textcolor{##6495ed}{#1}");
y("\\orange", "\\textcolor{##ffa500}{#1}");
y("\\pink", "\\textcolor{##ff00af}{#1}");
y("\\red", "\\textcolor{##df0030}{#1}");
y("\\green", "\\textcolor{##28ae7b}{#1}");
y("\\gray", "\\textcolor{gray}{#1}");
y("\\purple", "\\textcolor{##9d38bd}{#1}");
y("\\blueA", "\\textcolor{##ccfaff}{#1}");
y("\\blueB", "\\textcolor{##80f6ff}{#1}");
y("\\blueC", "\\textcolor{##63d9ea}{#1}");
y("\\blueD", "\\textcolor{##11accd}{#1}");
y("\\blueE", "\\textcolor{##0c7f99}{#1}");
y("\\tealA", "\\textcolor{##94fff5}{#1}");
y("\\tealB", "\\textcolor{##26edd5}{#1}");
y("\\tealC", "\\textcolor{##01d1c1}{#1}");
y("\\tealD", "\\textcolor{##01a995}{#1}");
y("\\tealE", "\\textcolor{##208170}{#1}");
y("\\greenA", "\\textcolor{##b6ffb0}{#1}");
y("\\greenB", "\\textcolor{##8af281}{#1}");
y("\\greenC", "\\textcolor{##74cf70}{#1}");
y("\\greenD", "\\textcolor{##1fab54}{#1}");
y("\\greenE", "\\textcolor{##0d923f}{#1}");
y("\\goldA", "\\textcolor{##ffd0a9}{#1}");
y("\\goldB", "\\textcolor{##ffbb71}{#1}");
y("\\goldC", "\\textcolor{##ff9c39}{#1}");
y("\\goldD", "\\textcolor{##e07d10}{#1}");
y("\\goldE", "\\textcolor{##a75a05}{#1}");
y("\\redA", "\\textcolor{##fca9a9}{#1}");
y("\\redB", "\\textcolor{##ff8482}{#1}");
y("\\redC", "\\textcolor{##f9685d}{#1}");
y("\\redD", "\\textcolor{##e84d39}{#1}");
y("\\redE", "\\textcolor{##bc2612}{#1}");
y("\\maroonA", "\\textcolor{##ffbde0}{#1}");
y("\\maroonB", "\\textcolor{##ff92c6}{#1}");
y("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
y("\\maroonD", "\\textcolor{##ca337c}{#1}");
y("\\maroonE", "\\textcolor{##9e034e}{#1}");
y("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
y("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
y("\\purpleC", "\\textcolor{##aa87ff}{#1}");
y("\\purpleD", "\\textcolor{##7854ab}{#1}");
y("\\purpleE", "\\textcolor{##543b78}{#1}");
y("\\mintA", "\\textcolor{##f5f9e8}{#1}");
y("\\mintB", "\\textcolor{##edf2df}{#1}");
y("\\mintC", "\\textcolor{##e0e5cc}{#1}");
y("\\grayA", "\\textcolor{##f6f7f7}{#1}");
y("\\grayB", "\\textcolor{##f0f1f2}{#1}");
y("\\grayC", "\\textcolor{##e3e5e6}{#1}");
y("\\grayD", "\\textcolor{##d6d8da}{#1}");
y("\\grayE", "\\textcolor{##babec2}{#1}");
y("\\grayF", "\\textcolor{##888d93}{#1}");
y("\\grayG", "\\textcolor{##626569}{#1}");
y("\\grayH", "\\textcolor{##3b3e40}{#1}");
y("\\grayI", "\\textcolor{##21242c}{#1}");
y("\\kaBlue", "\\textcolor{##314453}{#1}");
y("\\kaGreen", "\\textcolor{##71B307}{#1}");
var Co = {
  "^": !0,
  // Parser.js
  _: !0,
  // Parser.js
  "\\limits": !0,
  // Parser.js
  "\\nolimits": !0
  // Parser.js
};
class k1 {
  constructor(t, n, a) {
    this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = n, this.expansionCount = 0, this.feed(t), this.macros = new w1(S1, n.macros), this.mode = a, this.stack = [];
  }
  /**
   * Feed a new input string to the same MacroExpander
   * (with existing macros etc.).
   */
  feed(t) {
    this.lexer = new Bl(t, this.settings);
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(t) {
    this.mode = t;
  }
  /**
   * Start a new group nesting within all namespaces.
   */
  beginGroup() {
    this.macros.beginGroup();
  }
  /**
   * End current group nesting within all namespaces.
   */
  endGroup() {
    this.macros.endGroup();
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    this.macros.endGroups();
  }
  /**
   * Returns the topmost token on the stack, without expanding it.
   * Similar in behavior to TeX's `\futurelet`.
   */
  future() {
    return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
  }
  /**
   * Remove and return the next unexpanded token.
   */
  popToken() {
    return this.future(), this.stack.pop();
  }
  /**
   * Add a given token to the token stack.  In particular, this get be used
   * to put back a token returned from one of the other methods.
   */
  pushToken(t) {
    this.stack.push(t);
  }
  /**
   * Append an array of tokens to the token stack.
   */
  pushTokens(t) {
    this.stack.push(...t);
  }
  /**
   * Find an macro argument without expanding tokens and append the array of
   * tokens to the token stack. Uses Token as a container for the result.
   */
  scanArgument(t) {
    var n, a, r;
    if (t) {
      if (this.consumeSpaces(), this.future().text !== "[")
        return null;
      n = this.popToken(), {
        tokens: r,
        end: a
      } = this.consumeArg(["]"]);
    } else
      ({
        tokens: r,
        start: n,
        end: a
      } = this.consumeArg());
    return this.pushToken(new ct("EOF", a.loc)), this.pushTokens(r), n.range(a, "");
  }
  /**
   * Consume all following space tokens, without expansion.
   */
  consumeSpaces() {
    for (; ; ) {
      var t = this.future();
      if (t.text === " ")
        this.stack.pop();
      else
        break;
    }
  }
  /**
   * Consume an argument from the token stream, and return the resulting array
   * of tokens and start/end token.
   */
  consumeArg(t) {
    var n = [], a = t && t.length > 0;
    a || this.consumeSpaces();
    var r = this.future(), l, i = 0, o = 0;
    do {
      if (l = this.popToken(), n.push(l), l.text === "{")
        ++i;
      else if (l.text === "}") {
        if (--i, i === -1)
          throw new W("Extra }", l);
      } else if (l.text === "EOF")
        throw new W("Unexpected end of input in a macro argument, expected '" + (t && a ? t[o] : "}") + "'", l);
      if (t && a)
        if ((i === 0 || i === 1 && t[o] === "{") && l.text === t[o]) {
          if (++o, o === t.length) {
            n.splice(-o, o);
            break;
          }
        } else
          o = 0;
    } while (i !== 0 || a);
    return r.text === "{" && n[n.length - 1].text === "}" && (n.pop(), n.shift()), n.reverse(), {
      tokens: n,
      start: r,
      end: l
    };
  }
  /**
   * Consume the specified number of (delimited) arguments from the token
   * stream and return the resulting array of arguments.
   */
  consumeArgs(t, n) {
    if (n) {
      if (n.length !== t + 1)
        throw new W("The length of delimiters doesn't match the number of args!");
      for (var a = n[0], r = 0; r < a.length; r++) {
        var l = this.popToken();
        if (a[r] !== l.text)
          throw new W("Use of the macro doesn't match its definition", l);
      }
    }
    for (var i = [], o = 0; o < t; o++)
      i.push(this.consumeArg(n && n[o + 1]).tokens);
    return i;
  }
  /**
   * Increment `expansionCount` by the specified amount.
   * Throw an error if it exceeds `maxExpand`.
   */
  countExpansion(t) {
    if (this.expansionCount += t, this.expansionCount > this.settings.maxExpand)
      throw new W("Too many expansions: infinite loop or need to increase maxExpand setting");
  }
  /**
   * Expand the next token only once if possible.
   *
   * If the token is expanded, the resulting tokens will be pushed onto
   * the stack in reverse order, and the number of such tokens will be
   * returned.  This number might be zero or positive.
   *
   * If not, the return value is `false`, and the next token remains at the
   * top of the stack.
   *
   * In either case, the next token will be on the top of the stack,
   * or the stack will be empty (in case of empty expansion
   * and no other tokens).
   *
   * Used to implement `expandAfterFuture` and `expandNextToken`.
   *
   * If expandableOnly, only expandable tokens are expanded and
   * an undefined control sequence results in an error.
   */
  expandOnce(t) {
    var n = this.popToken(), a = n.text, r = n.noexpand ? null : this._getExpansion(a);
    if (r == null || t && r.unexpandable) {
      if (t && r == null && a[0] === "\\" && !this.isDefined(a))
        throw new W("Undefined control sequence: " + a);
      return this.pushToken(n), !1;
    }
    this.countExpansion(1);
    var l = r.tokens, i = this.consumeArgs(r.numArgs, r.delimiters);
    if (r.numArgs) {
      l = l.slice();
      for (var o = l.length - 1; o >= 0; --o) {
        var s = l[o];
        if (s.text === "#") {
          if (o === 0)
            throw new W("Incomplete placeholder at end of macro body", s);
          if (s = l[--o], s.text === "#")
            l.splice(o + 1, 1);
          else if (/^[1-9]$/.test(s.text))
            l.splice(o, 2, ...i[+s.text - 1]);
          else
            throw new W("Not a valid argument number", s);
        }
      }
    }
    return this.pushTokens(l), l.length;
  }
  /**
   * Expand the next token only once (if possible), and return the resulting
   * top token on the stack (without removing anything from the stack).
   * Similar in behavior to TeX's `\expandafter\futurelet`.
   * Equivalent to expandOnce() followed by future().
   */
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  /**
   * Recursively expand first token, then return first non-expandable token.
   */
  expandNextToken() {
    for (; ; )
      if (this.expandOnce() === !1) {
        var t = this.stack.pop();
        return t.treatAsRelax && (t.text = "\\relax"), t;
      }
    throw new Error();
  }
  /**
   * Fully expand the given macro name and return the resulting list of
   * tokens, or return `undefined` if no such macro is defined.
   */
  expandMacro(t) {
    return this.macros.has(t) ? this.expandTokens([new ct(t)]) : void 0;
  }
  /**
   * Fully expand the given token stream and return the resulting list of
   * tokens.  Note that the input tokens are in reverse order, but the
   * output tokens are in forward order.
   */
  expandTokens(t) {
    var n = [], a = this.stack.length;
    for (this.pushTokens(t); this.stack.length > a; )
      if (this.expandOnce(!0) === !1) {
        var r = this.stack.pop();
        r.treatAsRelax && (r.noexpand = !1, r.treatAsRelax = !1), n.push(r);
      }
    return this.countExpansion(n.length), n;
  }
  /**
   * Fully expand the given macro name and return the result as a string,
   * or return `undefined` if no such macro is defined.
   */
  expandMacroAsText(t) {
    var n = this.expandMacro(t);
    return n && n.map((a) => a.text).join("");
  }
  /**
   * Returns the expanded macro as a reversed array of tokens and a macro
   * argument count.  Or returns `null` if no such macro.
   */
  _getExpansion(t) {
    var n = this.macros.get(t);
    if (n == null)
      return n;
    if (t.length === 1) {
      var a = this.lexer.catcodes[t];
      if (a != null && a !== 13)
        return;
    }
    var r = typeof n == "function" ? n(this) : n;
    if (typeof r == "string") {
      var l = 0;
      if (r.indexOf("#") !== -1)
        for (var i = r.replace(/##/g, ""); i.indexOf("#" + (l + 1)) !== -1; )
          ++l;
      for (var o = new Bl(r, this.settings), s = [], c = o.lex(); c.text !== "EOF"; )
        s.push(c), c = o.lex();
      s.reverse();
      var m = {
        tokens: s,
        numArgs: l
      };
      return m;
    }
    return r;
  }
  /**
   * Determine whether a command is currently "defined" (has some
   * functionality), meaning that it's a macro (in the current group),
   * a function, a symbol, or one of the special commands listed in
   * `implicitCommands`.
   */
  isDefined(t) {
    return this.macros.has(t) || Zt.hasOwnProperty(t) || Me.math.hasOwnProperty(t) || Me.text.hasOwnProperty(t) || Co.hasOwnProperty(t);
  }
  /**
   * Determine whether a command is expandable.
   */
  isExpandable(t) {
    var n = this.macros.get(t);
    return n != null ? typeof n == "string" || typeof n == "function" || !n.unexpandable : Zt.hasOwnProperty(t) && !Zt[t].primitive;
  }
}
var Pl = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, x0 = Object.freeze({
  "₊": "+",
  "₋": "-",
  "₌": "=",
  "₍": "(",
  "₎": ")",
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "ₐ": "a",
  "ₑ": "e",
  "ₕ": "h",
  "ᵢ": "i",
  "ⱼ": "j",
  "ₖ": "k",
  "ₗ": "l",
  "ₘ": "m",
  "ₙ": "n",
  "ₒ": "o",
  "ₚ": "p",
  "ᵣ": "r",
  "ₛ": "s",
  "ₜ": "t",
  "ᵤ": "u",
  "ᵥ": "v",
  "ₓ": "x",
  "ᵦ": "β",
  "ᵧ": "γ",
  "ᵨ": "ρ",
  "ᵩ": "ϕ",
  "ᵪ": "χ",
  "⁺": "+",
  "⁻": "-",
  "⁼": "=",
  "⁽": "(",
  "⁾": ")",
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "ᴬ": "A",
  "ᴮ": "B",
  "ᴰ": "D",
  "ᴱ": "E",
  "ᴳ": "G",
  "ᴴ": "H",
  "ᴵ": "I",
  "ᴶ": "J",
  "ᴷ": "K",
  "ᴸ": "L",
  "ᴹ": "M",
  "ᴺ": "N",
  "ᴼ": "O",
  "ᴾ": "P",
  "ᴿ": "R",
  "ᵀ": "T",
  "ᵁ": "U",
  "ⱽ": "V",
  "ᵂ": "W",
  "ᵃ": "a",
  "ᵇ": "b",
  "ᶜ": "c",
  "ᵈ": "d",
  "ᵉ": "e",
  "ᶠ": "f",
  "ᵍ": "g",
  ʰ: "h",
  "ⁱ": "i",
  ʲ: "j",
  "ᵏ": "k",
  ˡ: "l",
  "ᵐ": "m",
  ⁿ: "n",
  "ᵒ": "o",
  "ᵖ": "p",
  ʳ: "r",
  ˢ: "s",
  "ᵗ": "t",
  "ᵘ": "u",
  "ᵛ": "v",
  ʷ: "w",
  ˣ: "x",
  ʸ: "y",
  "ᶻ": "z",
  "ᵝ": "β",
  "ᵞ": "γ",
  "ᵟ": "δ",
  "ᵠ": "ϕ",
  "ᵡ": "χ",
  "ᶿ": "θ"
}), Ta = {
  "́": {
    text: "\\'",
    math: "\\acute"
  },
  "̀": {
    text: "\\`",
    math: "\\grave"
  },
  "̈": {
    text: '\\"',
    math: "\\ddot"
  },
  "̃": {
    text: "\\~",
    math: "\\tilde"
  },
  "̄": {
    text: "\\=",
    math: "\\bar"
  },
  "̆": {
    text: "\\u",
    math: "\\breve"
  },
  "̌": {
    text: "\\v",
    math: "\\check"
  },
  "̂": {
    text: "\\^",
    math: "\\hat"
  },
  "̇": {
    text: "\\.",
    math: "\\dot"
  },
  "̊": {
    text: "\\r",
    math: "\\mathring"
  },
  "̋": {
    text: "\\H"
  },
  "̧": {
    text: "\\c"
  }
}, Vl = {
  á: "á",
  à: "à",
  ä: "ä",
  ǟ: "ǟ",
  ã: "ã",
  ā: "ā",
  ă: "ă",
  ắ: "ắ",
  ằ: "ằ",
  ẵ: "ẵ",
  ǎ: "ǎ",
  â: "â",
  ấ: "ấ",
  ầ: "ầ",
  ẫ: "ẫ",
  ȧ: "ȧ",
  ǡ: "ǡ",
  å: "å",
  ǻ: "ǻ",
  ḃ: "ḃ",
  ć: "ć",
  ḉ: "ḉ",
  č: "č",
  ĉ: "ĉ",
  ċ: "ċ",
  ç: "ç",
  ď: "ď",
  ḋ: "ḋ",
  ḑ: "ḑ",
  é: "é",
  è: "è",
  ë: "ë",
  ẽ: "ẽ",
  ē: "ē",
  ḗ: "ḗ",
  ḕ: "ḕ",
  ĕ: "ĕ",
  ḝ: "ḝ",
  ě: "ě",
  ê: "ê",
  ế: "ế",
  ề: "ề",
  ễ: "ễ",
  ė: "ė",
  ȩ: "ȩ",
  ḟ: "ḟ",
  ǵ: "ǵ",
  ḡ: "ḡ",
  ğ: "ğ",
  ǧ: "ǧ",
  ĝ: "ĝ",
  ġ: "ġ",
  ģ: "ģ",
  ḧ: "ḧ",
  ȟ: "ȟ",
  ĥ: "ĥ",
  ḣ: "ḣ",
  ḩ: "ḩ",
  í: "í",
  ì: "ì",
  ï: "ï",
  ḯ: "ḯ",
  ĩ: "ĩ",
  ī: "ī",
  ĭ: "ĭ",
  ǐ: "ǐ",
  î: "î",
  ǰ: "ǰ",
  ĵ: "ĵ",
  ḱ: "ḱ",
  ǩ: "ǩ",
  ķ: "ķ",
  ĺ: "ĺ",
  ľ: "ľ",
  ļ: "ļ",
  ḿ: "ḿ",
  ṁ: "ṁ",
  ń: "ń",
  ǹ: "ǹ",
  ñ: "ñ",
  ň: "ň",
  ṅ: "ṅ",
  ņ: "ņ",
  ó: "ó",
  ò: "ò",
  ö: "ö",
  ȫ: "ȫ",
  õ: "õ",
  ṍ: "ṍ",
  ṏ: "ṏ",
  ȭ: "ȭ",
  ō: "ō",
  ṓ: "ṓ",
  ṑ: "ṑ",
  ŏ: "ŏ",
  ǒ: "ǒ",
  ô: "ô",
  ố: "ố",
  ồ: "ồ",
  ỗ: "ỗ",
  ȯ: "ȯ",
  ȱ: "ȱ",
  ő: "ő",
  ṕ: "ṕ",
  ṗ: "ṗ",
  ŕ: "ŕ",
  ř: "ř",
  ṙ: "ṙ",
  ŗ: "ŗ",
  ś: "ś",
  ṥ: "ṥ",
  š: "š",
  ṧ: "ṧ",
  ŝ: "ŝ",
  ṡ: "ṡ",
  ş: "ş",
  ẗ: "ẗ",
  ť: "ť",
  ṫ: "ṫ",
  ţ: "ţ",
  ú: "ú",
  ù: "ù",
  ü: "ü",
  ǘ: "ǘ",
  ǜ: "ǜ",
  ǖ: "ǖ",
  ǚ: "ǚ",
  ũ: "ũ",
  ṹ: "ṹ",
  ū: "ū",
  ṻ: "ṻ",
  ŭ: "ŭ",
  ǔ: "ǔ",
  û: "û",
  ů: "ů",
  ű: "ű",
  ṽ: "ṽ",
  ẃ: "ẃ",
  ẁ: "ẁ",
  ẅ: "ẅ",
  ŵ: "ŵ",
  ẇ: "ẇ",
  ẘ: "ẘ",
  ẍ: "ẍ",
  ẋ: "ẋ",
  ý: "ý",
  ỳ: "ỳ",
  ÿ: "ÿ",
  ỹ: "ỹ",
  ȳ: "ȳ",
  ŷ: "ŷ",
  ẏ: "ẏ",
  ẙ: "ẙ",
  ź: "ź",
  ž: "ž",
  ẑ: "ẑ",
  ż: "ż",
  Á: "Á",
  À: "À",
  Ä: "Ä",
  Ǟ: "Ǟ",
  Ã: "Ã",
  Ā: "Ā",
  Ă: "Ă",
  Ắ: "Ắ",
  Ằ: "Ằ",
  Ẵ: "Ẵ",
  Ǎ: "Ǎ",
  Â: "Â",
  Ấ: "Ấ",
  Ầ: "Ầ",
  Ẫ: "Ẫ",
  Ȧ: "Ȧ",
  Ǡ: "Ǡ",
  Å: "Å",
  Ǻ: "Ǻ",
  Ḃ: "Ḃ",
  Ć: "Ć",
  Ḉ: "Ḉ",
  Č: "Č",
  Ĉ: "Ĉ",
  Ċ: "Ċ",
  Ç: "Ç",
  Ď: "Ď",
  Ḋ: "Ḋ",
  Ḑ: "Ḑ",
  É: "É",
  È: "È",
  Ë: "Ë",
  Ẽ: "Ẽ",
  Ē: "Ē",
  Ḗ: "Ḗ",
  Ḕ: "Ḕ",
  Ĕ: "Ĕ",
  Ḝ: "Ḝ",
  Ě: "Ě",
  Ê: "Ê",
  Ế: "Ế",
  Ề: "Ề",
  Ễ: "Ễ",
  Ė: "Ė",
  Ȩ: "Ȩ",
  Ḟ: "Ḟ",
  Ǵ: "Ǵ",
  Ḡ: "Ḡ",
  Ğ: "Ğ",
  Ǧ: "Ǧ",
  Ĝ: "Ĝ",
  Ġ: "Ġ",
  Ģ: "Ģ",
  Ḧ: "Ḧ",
  Ȟ: "Ȟ",
  Ĥ: "Ĥ",
  Ḣ: "Ḣ",
  Ḩ: "Ḩ",
  Í: "Í",
  Ì: "Ì",
  Ï: "Ï",
  Ḯ: "Ḯ",
  Ĩ: "Ĩ",
  Ī: "Ī",
  Ĭ: "Ĭ",
  Ǐ: "Ǐ",
  Î: "Î",
  İ: "İ",
  Ĵ: "Ĵ",
  Ḱ: "Ḱ",
  Ǩ: "Ǩ",
  Ķ: "Ķ",
  Ĺ: "Ĺ",
  Ľ: "Ľ",
  Ļ: "Ļ",
  Ḿ: "Ḿ",
  Ṁ: "Ṁ",
  Ń: "Ń",
  Ǹ: "Ǹ",
  Ñ: "Ñ",
  Ň: "Ň",
  Ṅ: "Ṅ",
  Ņ: "Ņ",
  Ó: "Ó",
  Ò: "Ò",
  Ö: "Ö",
  Ȫ: "Ȫ",
  Õ: "Õ",
  Ṍ: "Ṍ",
  Ṏ: "Ṏ",
  Ȭ: "Ȭ",
  Ō: "Ō",
  Ṓ: "Ṓ",
  Ṑ: "Ṑ",
  Ŏ: "Ŏ",
  Ǒ: "Ǒ",
  Ô: "Ô",
  Ố: "Ố",
  Ồ: "Ồ",
  Ỗ: "Ỗ",
  Ȯ: "Ȯ",
  Ȱ: "Ȱ",
  Ő: "Ő",
  Ṕ: "Ṕ",
  Ṗ: "Ṗ",
  Ŕ: "Ŕ",
  Ř: "Ř",
  Ṙ: "Ṙ",
  Ŗ: "Ŗ",
  Ś: "Ś",
  Ṥ: "Ṥ",
  Š: "Š",
  Ṧ: "Ṧ",
  Ŝ: "Ŝ",
  Ṡ: "Ṡ",
  Ş: "Ş",
  Ť: "Ť",
  Ṫ: "Ṫ",
  Ţ: "Ţ",
  Ú: "Ú",
  Ù: "Ù",
  Ü: "Ü",
  Ǘ: "Ǘ",
  Ǜ: "Ǜ",
  Ǖ: "Ǖ",
  Ǚ: "Ǚ",
  Ũ: "Ũ",
  Ṹ: "Ṹ",
  Ū: "Ū",
  Ṻ: "Ṻ",
  Ŭ: "Ŭ",
  Ǔ: "Ǔ",
  Û: "Û",
  Ů: "Ů",
  Ű: "Ű",
  Ṽ: "Ṽ",
  Ẃ: "Ẃ",
  Ẁ: "Ẁ",
  Ẅ: "Ẅ",
  Ŵ: "Ŵ",
  Ẇ: "Ẇ",
  Ẍ: "Ẍ",
  Ẋ: "Ẋ",
  Ý: "Ý",
  Ỳ: "Ỳ",
  Ÿ: "Ÿ",
  Ỹ: "Ỹ",
  Ȳ: "Ȳ",
  Ŷ: "Ŷ",
  Ẏ: "Ẏ",
  Ź: "Ź",
  Ž: "Ž",
  Ẑ: "Ẑ",
  Ż: "Ż",
  ά: "ά",
  ὰ: "ὰ",
  ᾱ: "ᾱ",
  ᾰ: "ᾰ",
  έ: "έ",
  ὲ: "ὲ",
  ή: "ή",
  ὴ: "ὴ",
  ί: "ί",
  ὶ: "ὶ",
  ϊ: "ϊ",
  ΐ: "ΐ",
  ῒ: "ῒ",
  ῑ: "ῑ",
  ῐ: "ῐ",
  ό: "ό",
  ὸ: "ὸ",
  ύ: "ύ",
  ὺ: "ὺ",
  ϋ: "ϋ",
  ΰ: "ΰ",
  ῢ: "ῢ",
  ῡ: "ῡ",
  ῠ: "ῠ",
  ώ: "ώ",
  ὼ: "ὼ",
  Ύ: "Ύ",
  Ὺ: "Ὺ",
  Ϋ: "Ϋ",
  Ῡ: "Ῡ",
  Ῠ: "Ῠ",
  Ώ: "Ώ",
  Ὼ: "Ὼ"
};
class aa {
  constructor(t, n) {
    this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new k1(t, n, this.mode), this.settings = n, this.leftrightDepth = 0;
  }
  /**
   * Checks a result to make sure it has the right type, and throws an
   * appropriate error otherwise.
   */
  expect(t, n) {
    if (n === void 0 && (n = !0), this.fetch().text !== t)
      throw new W("Expected '" + t + "', got '" + this.fetch().text + "'", this.fetch());
    n && this.consume();
  }
  /**
   * Discards the current lookahead token, considering it consumed.
   */
  consume() {
    this.nextToken = null;
  }
  /**
   * Return the current lookahead token, or if there isn't one (at the
   * beginning, or if the previous lookahead token was consume()d),
   * fetch the next token as the new lookahead token and return it.
   */
  fetch() {
    return this.nextToken == null && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(t) {
    this.mode = t, this.gullet.switchMode(t);
  }
  /**
   * Main parsing function, which parses an entire input.
   */
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var t = this.parseExpression(!1);
      return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), t;
    } finally {
      this.gullet.endGroups();
    }
  }
  /**
   * Fully parse a separate sequence of tokens as a separate job.
   * Tokens should be specified in reverse order, as in a MacroDefinition.
   */
  subparse(t) {
    var n = this.nextToken;
    this.consume(), this.gullet.pushToken(new ct("}")), this.gullet.pushTokens(t);
    var a = this.parseExpression(!1);
    return this.expect("}"), this.nextToken = n, a;
  }
  /**
   * Parses an "expression", which is a list of atoms.
   *
   * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
   *                 happens when functions have higher precedence han infix
   *                 nodes in implicit parses.
   *
   * `breakOnTokenText`: The text of the token that the expression should end
   *                     with, or `null` if something else should end the
   *                     expression.
   */
  parseExpression(t, n) {
    for (var a = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var r = this.fetch();
      if (aa.endOfExpression.indexOf(r.text) !== -1 || n && r.text === n || t && Zt[r.text] && Zt[r.text].infix)
        break;
      var l = this.parseAtom(n);
      if (l) {
        if (l.type === "internal")
          continue;
      } else break;
      a.push(l);
    }
    return this.mode === "text" && this.formLigatures(a), this.handleInfixNodes(a);
  }
  /**
   * Rewrites infix operators such as \over with corresponding commands such
   * as \frac.
   *
   * There can only be one infix operator per group.  If there's more than one
   * then the expression is ambiguous.  This can be resolved by adding {}.
   */
  handleInfixNodes(t) {
    for (var n = -1, a, r = 0; r < t.length; r++)
      if (t[r].type === "infix") {
        if (n !== -1)
          throw new W("only one infix operator per group", t[r].token);
        n = r, a = t[r].replaceWith;
      }
    if (n !== -1 && a) {
      var l, i, o = t.slice(0, n), s = t.slice(n + 1);
      o.length === 1 && o[0].type === "ordgroup" ? l = o[0] : l = {
        type: "ordgroup",
        mode: this.mode,
        body: o
      }, s.length === 1 && s[0].type === "ordgroup" ? i = s[0] : i = {
        type: "ordgroup",
        mode: this.mode,
        body: s
      };
      var c;
      return a === "\\\\abovefrac" ? c = this.callFunction(a, [l, t[n], i], []) : c = this.callFunction(a, [l, i], []), [c];
    } else
      return t;
  }
  /**
   * Handle a subscript or superscript with nice errors.
   */
  handleSupSubscript(t) {
    var n = this.fetch(), a = n.text;
    this.consume(), this.consumeSpaces();
    var r = this.parseGroup(t);
    if (!r)
      throw new W("Expected group after '" + a + "'", n);
    return r;
  }
  /**
   * Converts the textual input of an unsupported command into a text node
   * contained within a color node whose color is determined by errorColor
   */
  formatUnsupportedCmd(t) {
    for (var n = [], a = 0; a < t.length; a++)
      n.push({
        type: "textord",
        mode: "text",
        text: t[a]
      });
    var r = {
      type: "text",
      mode: this.mode,
      body: n
    }, l = {
      type: "color",
      mode: this.mode,
      color: this.settings.errorColor,
      body: [r]
    };
    return l;
  }
  /**
   * Parses a group with optional super/subscripts.
   */
  parseAtom(t) {
    var n = this.parseGroup("atom", t);
    if (this.mode === "text")
      return n;
    for (var a, r; ; ) {
      this.consumeSpaces();
      var l = this.fetch();
      if (l.text === "\\limits" || l.text === "\\nolimits") {
        if (n && n.type === "op") {
          var i = l.text === "\\limits";
          n.limits = i, n.alwaysHandleSupSub = !0;
        } else if (n && n.type === "operatorname")
          n.alwaysHandleSupSub && (n.limits = l.text === "\\limits");
        else
          throw new W("Limit controls must follow a math operator", l);
        this.consume();
      } else if (l.text === "^") {
        if (a)
          throw new W("Double superscript", l);
        a = this.handleSupSubscript("superscript");
      } else if (l.text === "_") {
        if (r)
          throw new W("Double subscript", l);
        r = this.handleSupSubscript("subscript");
      } else if (l.text === "'") {
        if (a)
          throw new W("Double superscript", l);
        var o = {
          type: "textord",
          mode: this.mode,
          text: "\\prime"
        }, s = [o];
        for (this.consume(); this.fetch().text === "'"; )
          s.push(o), this.consume();
        this.fetch().text === "^" && s.push(this.handleSupSubscript("superscript")), a = {
          type: "ordgroup",
          mode: this.mode,
          body: s
        };
      } else if (x0[l.text]) {
        var c = Pl.test(l.text), m = [];
        for (m.push(new ct(x0[l.text])), this.consume(); ; ) {
          var f = this.fetch().text;
          if (!x0[f] || Pl.test(f) !== c)
            break;
          m.unshift(new ct(x0[f])), this.consume();
        }
        var v = this.subparse(m);
        c ? r = {
          type: "ordgroup",
          mode: "math",
          body: v
        } : a = {
          type: "ordgroup",
          mode: "math",
          body: v
        };
      } else
        break;
    }
    return a || r ? {
      type: "supsub",
      mode: this.mode,
      base: n,
      sup: a,
      sub: r
    } : n;
  }
  /**
   * Parses an entire function, including its base and all of its arguments.
   */
  parseFunction(t, n) {
    var a = this.fetch(), r = a.text, l = Zt[r];
    if (!l)
      return null;
    if (this.consume(), n && n !== "atom" && !l.allowedInArgument)
      throw new W("Got function '" + r + "' with no arguments" + (n ? " as " + n : ""), a);
    if (this.mode === "text" && !l.allowedInText)
      throw new W("Can't use function '" + r + "' in text mode", a);
    if (this.mode === "math" && l.allowedInMath === !1)
      throw new W("Can't use function '" + r + "' in math mode", a);
    var {
      args: i,
      optArgs: o
    } = this.parseArguments(r, l);
    return this.callFunction(r, i, o, a, t);
  }
  /**
   * Call a function handler with a suitable context and arguments.
   */
  callFunction(t, n, a, r, l) {
    var i = {
      funcName: t,
      parser: this,
      token: r,
      breakOnTokenText: l
    }, o = Zt[t];
    if (o && o.handler)
      return o.handler(i, n, a);
    throw new W("No function handler for " + t);
  }
  /**
   * Parses the arguments of a function or environment
   */
  parseArguments(t, n) {
    var a = n.numArgs + n.numOptionalArgs;
    if (a === 0)
      return {
        args: [],
        optArgs: []
      };
    for (var r = [], l = [], i = 0; i < a; i++) {
      var o = n.argTypes && n.argTypes[i], s = i < n.numOptionalArgs;
      (n.primitive && o == null || // \sqrt expands into primitive if optional argument doesn't exist
      n.type === "sqrt" && i === 1 && l[0] == null) && (o = "primitive");
      var c = this.parseGroupOfType("argument to '" + t + "'", o, s);
      if (s)
        l.push(c);
      else if (c != null)
        r.push(c);
      else
        throw new W("Null argument, please report this as a bug");
    }
    return {
      args: r,
      optArgs: l
    };
  }
  /**
   * Parses a group when the mode is changing.
   */
  parseGroupOfType(t, n, a) {
    switch (n) {
      case "color":
        return this.parseColorGroup(a);
      case "size":
        return this.parseSizeGroup(a);
      case "url":
        return this.parseUrlGroup(a);
      case "math":
      case "text":
        return this.parseArgumentGroup(a, n);
      case "hbox": {
        var r = this.parseArgumentGroup(a, "text");
        return r != null ? {
          type: "styling",
          mode: r.mode,
          body: [r],
          style: "text"
          // simulate \textstyle
        } : null;
      }
      case "raw": {
        var l = this.parseStringGroup("raw", a);
        return l != null ? {
          type: "raw",
          mode: "text",
          string: l.text
        } : null;
      }
      case "primitive": {
        if (a)
          throw new W("A primitive argument cannot be optional");
        var i = this.parseGroup(t);
        if (i == null)
          throw new W("Expected group as " + t, this.fetch());
        return i;
      }
      case "original":
      case null:
      case void 0:
        return this.parseArgumentGroup(a);
      default:
        throw new W("Unknown group type as " + t, this.fetch());
    }
  }
  /**
   * Discard any space tokens, fetching the next non-space token.
   */
  consumeSpaces() {
    for (; this.fetch().text === " "; )
      this.consume();
  }
  /**
   * Parses a group, essentially returning the string formed by the
   * brace-enclosed tokens plus some position information.
   */
  parseStringGroup(t, n) {
    var a = this.gullet.scanArgument(n);
    if (a == null)
      return null;
    for (var r = "", l; (l = this.fetch()).text !== "EOF"; )
      r += l.text, this.consume();
    return this.consume(), a.text = r, a;
  }
  /**
   * Parses a regex-delimited group: the largest sequence of tokens
   * whose concatenated strings match `regex`. Returns the string
   * formed by the tokens plus some position information.
   */
  parseRegexGroup(t, n) {
    for (var a = this.fetch(), r = a, l = "", i; (i = this.fetch()).text !== "EOF" && t.test(l + i.text); )
      r = i, l += r.text, this.consume();
    if (l === "")
      throw new W("Invalid " + n + ": '" + a.text + "'", a);
    return a.range(r, l);
  }
  /**
   * Parses a color description.
   */
  parseColorGroup(t) {
    var n = this.parseStringGroup("color", t);
    if (n == null)
      return null;
    var a = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(n.text);
    if (!a)
      throw new W("Invalid color: '" + n.text + "'", n);
    var r = a[0];
    return /^[0-9a-f]{6}$/i.test(r) && (r = "#" + r), {
      type: "color-token",
      mode: this.mode,
      color: r
    };
  }
  /**
   * Parses a size specification, consisting of magnitude and unit.
   */
  parseSizeGroup(t) {
    var n, a = !1;
    if (this.gullet.consumeSpaces(), !t && this.gullet.future().text !== "{" ? n = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : n = this.parseStringGroup("size", t), !n)
      return null;
    !t && n.text.length === 0 && (n.text = "0pt", a = !0);
    var r = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(n.text);
    if (!r)
      throw new W("Invalid size: '" + n.text + "'", n);
    var l = {
      number: +(r[1] + r[2]),
      // sign + magnitude, cast to number
      unit: r[3]
    };
    if (!Ei(l))
      throw new W("Invalid unit: '" + l.unit + "'", n);
    return {
      type: "size",
      mode: this.mode,
      value: l,
      isBlank: a
    };
  }
  /**
   * Parses an URL, checking escaped letters and allowed protocols,
   * and setting the catcode of % as an active character (as in \hyperref).
   */
  parseUrlGroup(t) {
    this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
    var n = this.parseStringGroup("url", t);
    if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), n == null)
      return null;
    var a = n.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return {
      type: "url",
      mode: this.mode,
      url: a
    };
  }
  /**
   * Parses an argument with the mode specified.
   */
  parseArgumentGroup(t, n) {
    var a = this.gullet.scanArgument(t);
    if (a == null)
      return null;
    var r = this.mode;
    n && this.switchMode(n), this.gullet.beginGroup();
    var l = this.parseExpression(!1, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var i = {
      type: "ordgroup",
      mode: this.mode,
      loc: a.loc,
      body: l
    };
    return n && this.switchMode(r), i;
  }
  /**
   * Parses an ordinary group, which is either a single nucleus (like "x")
   * or an expression in braces (like "{x+y}") or an implicit group, a group
   * that starts at the current position, and ends right before a higher explicit
   * group ends, or at EOF.
   */
  parseGroup(t, n) {
    var a = this.fetch(), r = a.text, l;
    if (r === "{" || r === "\\begingroup") {
      this.consume();
      var i = r === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var o = this.parseExpression(!1, i), s = this.fetch();
      this.expect(i), this.gullet.endGroup(), l = {
        type: "ordgroup",
        mode: this.mode,
        loc: rt.range(a, s),
        body: o,
        // A group formed by \begingroup...\endgroup is a semi-simple group
        // which doesn't affect spacing in math mode, i.e., is transparent.
        // https://tex.stackexchange.com/questions/1930/when-should-one-
        // use-begingroup-instead-of-bgroup
        semisimple: r === "\\begingroup" || void 0
      };
    } else if (l = this.parseFunction(n, t) || this.parseSymbol(), l == null && r[0] === "\\" && !Co.hasOwnProperty(r)) {
      if (this.settings.throwOnError)
        throw new W("Undefined control sequence: " + r, a);
      l = this.formatUnsupportedCmd(r), this.consume();
    }
    return l;
  }
  /**
   * Form ligature-like combinations of characters for text mode.
   * This includes inputs like "--", "---", "``" and "''".
   * The result will simply replace multiple textord nodes with a single
   * character in each value by a single textord node having multiple
   * characters in its value.  The representation is still ASCII source.
   * The group will be modified in place.
   */
  formLigatures(t) {
    for (var n = t.length - 1, a = 0; a < n; ++a) {
      var r = t[a], l = r.text;
      l === "-" && t[a + 1].text === "-" && (a + 1 < n && t[a + 2].text === "-" ? (t.splice(a, 3, {
        type: "textord",
        mode: "text",
        loc: rt.range(r, t[a + 2]),
        text: "---"
      }), n -= 2) : (t.splice(a, 2, {
        type: "textord",
        mode: "text",
        loc: rt.range(r, t[a + 1]),
        text: "--"
      }), n -= 1)), (l === "'" || l === "`") && t[a + 1].text === l && (t.splice(a, 2, {
        type: "textord",
        mode: "text",
        loc: rt.range(r, t[a + 1]),
        text: l + l
      }), n -= 1);
    }
  }
  /**
   * Parse a single symbol out of the string. Here, we handle single character
   * symbols and special functions like \verb.
   */
  parseSymbol() {
    var t = this.fetch(), n = t.text;
    if (/^\\verb[^a-zA-Z]/.test(n)) {
      this.consume();
      var a = n.slice(5), r = a.charAt(0) === "*";
      if (r && (a = a.slice(1)), a.length < 2 || a.charAt(0) !== a.slice(-1))
        throw new W(`\\verb assertion failed --
                    please report what input caused this bug`);
      return a = a.slice(1, -1), {
        type: "verb",
        mode: "text",
        body: a,
        star: r
      };
    }
    Vl.hasOwnProperty(n[0]) && !Me[this.mode][n[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + n[0] + '" used in math mode', t), n = Vl[n[0]] + n.slice(1));
    var l = b1.exec(n);
    l && (n = n.substring(0, l.index), n === "i" ? n = "ı" : n === "j" && (n = "ȷ"));
    var i;
    if (Me[this.mode][n]) {
      this.settings.strict && this.mode === "math" && $a.indexOf(n) >= 0 && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + n[0] + '" used in math mode', t);
      var o = Me[this.mode][n].group, s = rt.range(t), c;
      if (dc.hasOwnProperty(o)) {
        var m = o;
        c = {
          type: "atom",
          mode: this.mode,
          family: m,
          loc: s,
          text: n
        };
      } else
        c = {
          type: o,
          mode: this.mode,
          loc: s,
          text: n
        };
      i = c;
    } else if (n.charCodeAt(0) >= 128)
      this.settings.strict && (Vi(n.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + n[0] + '" used in math mode', t) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + n[0] + '"' + (" (" + n.charCodeAt(0) + ")"), t)), i = {
        type: "textord",
        mode: "text",
        loc: rt.range(t),
        text: n
      };
    else
      return null;
    if (this.consume(), l)
      for (var f = 0; f < l[0].length; f++) {
        var v = l[0][f];
        if (!Ta[v])
          throw new W("Unknown accent ' " + v + "'", t);
        var g = Ta[v][this.mode] || Ta[v].text;
        if (!g)
          throw new W("Accent " + v + " unsupported in " + this.mode + " mode", t);
        i = {
          type: "accent",
          mode: this.mode,
          loc: rt.range(t),
          label: g,
          isStretchy: !1,
          isShifty: !0,
          // $FlowFixMe
          base: i
        };
      }
    return i;
  }
}
aa.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
var zr = function(e, t) {
  if (!(typeof e == "string" || e instanceof String))
    throw new TypeError("KaTeX can only parse string typed expression");
  var n = new aa(e, t);
  delete n.gullet.macros.current["\\df@tag"];
  var a = n.parse();
  if (delete n.gullet.macros.current["\\current@color"], delete n.gullet.macros.current["\\color"], n.gullet.macros.get("\\df@tag")) {
    if (!t.displayMode)
      throw new W("\\tag works only in display equations");
    a = [{
      type: "tag",
      mode: "text",
      body: a,
      tag: n.subparse([new ct("\\df@tag")])
    }];
  }
  return a;
}, Ao = function(e, t, n) {
  t.textContent = "";
  var a = Pr(e, n).toNode();
  t.appendChild(a);
};
typeof document < "u" && document.compatMode !== "CSS1Compat" && (typeof console < "u" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), Ao = function() {
  throw new W("KaTeX doesn't work in quirks mode.");
});
var C1 = function(e, t) {
  var n = Pr(e, t).toMarkup();
  return n;
}, A1 = function(e, t) {
  var n = new mr(t);
  return zr(e, n);
}, Mo = function(e, t, n) {
  if (n.throwOnError || !(e instanceof W))
    throw e;
  var a = I.makeSpan(["katex-error"], [new mt(t)]);
  return a.setAttribute("title", e.toString()), a.setAttribute("style", "color:" + n.errorColor), a;
}, Pr = function(e, t) {
  var n = new mr(t);
  try {
    var a = zr(e, n);
    return Oc(a, e, n);
  } catch (r) {
    return Mo(r, e, n);
  }
}, M1 = function(e, t) {
  var n = new mr(t);
  try {
    var a = zr(e, n);
    return _c(a, e, n);
  } catch (r) {
    return Mo(r, e, n);
  }
}, T1 = {
  /**
   * Current KaTeX version
   */
  version: "0.16.11",
  /**
   * Renders the given LaTeX into an HTML+MathML combination, and adds
   * it as a child to the specified DOM node.
   */
  render: Ao,
  /**
   * Renders the given LaTeX into an HTML+MathML combination string,
   * for sending to the client.
   */
  renderToString: C1,
  /**
   * KaTeX error, usually during parsing.
   */
  ParseError: W,
  /**
   * The shema of Settings
   */
  SETTINGS_SCHEMA: T0,
  /**
   * Parses the given LaTeX into KaTeX's internal parse tree structure,
   * without rendering to HTML or MathML.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __parse: A1,
  /**
   * Renders the given LaTeX into an HTML+MathML internal DOM tree
   * representation, without flattening that representation to a string.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __renderToDomTree: Pr,
  /**
   * Renders the given LaTeX into an HTML internal DOM tree representation,
   * without MathML and without flattening that representation to a string.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __renderToHTMLTree: M1,
  /**
   * extends internal font metrics object with a new object
   * each key in the new object represents a font name
  */
  __setFontMetrics: rc,
  /**
   * adds a new symbol to builtin symbols table
   */
  __defineSymbol: u,
  /**
   * adds a new function to builtin function list,
   * which directly produce parse tree elements
   * and have their own html/mathml builders
   */
  __defineFunction: X,
  /**
   * adds a new macro to builtin macro list
   */
  __defineMacro: y,
  /**
   * Expose the dom tree node types, which can be useful for type checking nodes.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __domTree: {
    Span: l0,
    Anchor: vr,
    SymbolNode: mt,
    SvgNode: Nt,
    PathNode: en,
    LineNode: Ha
  }
};
const B1 = /* @__PURE__ */ Y0({
  __name: "KaTeX",
  props: {
    expr: {}
  },
  setup(e) {
    const t = e, n = ae(null);
    Pn(() => {
      a();
    }), ge(() => t.expr, () => {
      a();
    }, { deep: !0 });
    function a() {
      T1.render(t.expr, n.value, {
        displayMode: !0,
        strict: !1,
        trust: !0
      });
    }
    return (r, l) => (Wn(), Na("span", {
      ref_key: "target",
      ref: n
    }, null, 512));
  }
});
function U(e, t) {
  return (n) => Object.keys(e).reduce((a, r) => {
    const i = typeof e[r] == "object" && e[r] != null && !Array.isArray(e[r]) ? e[r] : {
      type: e[r]
    };
    return n && r in n ? a[r] = {
      ...i,
      default: n[r]
    } : a[r] = i, t && !a[r].source && (a[r].source = t), a;
  }, {});
}
const we = U({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), $e = typeof window < "u", Vr = $e && "IntersectionObserver" in window;
function To(e, t, n) {
  const a = t.length - 1;
  if (a < 0) return e === void 0 ? n : e;
  for (let r = 0; r < a; r++) {
    if (e == null)
      return n;
    e = e[t[r]];
  }
  return e == null || e[t[a]] === void 0 ? n : e[t[a]];
}
function rn(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((a) => rn(e[a], t[a]));
}
function Zn(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), To(e, t.split("."), n));
}
function et(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const r = t(e, n);
    return typeof r > "u" ? n : r;
  }
  if (typeof t == "string") return Zn(e, t, n);
  if (Array.isArray(t)) return To(e, t, n);
  if (typeof t != "function") return n;
  const a = t(e, n);
  return typeof a > "u" ? n : a;
}
function w0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, a) => t + a);
}
function ce(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function I1(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function El(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function Bo(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Ol = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
}), _l = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function Ba(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Io(e, t) {
  const n = {}, a = new Set(Object.keys(e));
  for (const r of t)
    a.has(r) && (n[r] = e[r]);
  return n;
}
function Ll(e, t, n) {
  const a = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  for (const l in e)
    t.some((i) => i instanceof RegExp ? i.test(l) : i === l) && !(n != null && n.some((i) => i === l)) ? a[l] = e[l] : r[l] = e[l];
  return [a, r];
}
function Ln(e, t) {
  const n = {
    ...e
  };
  return t.forEach((a) => delete n[a]), n;
}
function z1(e, t) {
  const n = {};
  return t.forEach((a) => n[a] = e[a]), n;
}
const zo = /^on[^a-z]/, ra = (e) => zo.test(e), P1 = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function Po(e) {
  const [t, n] = Ll(e, [zo]), a = Ln(t, P1), [r, l] = Ll(n, ["class", "style", "id", /^data-/]);
  return Object.assign(r, t), Object.assign(l, a), [r, l];
}
function Ye(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function V1(e, t) {
  let n = 0;
  const a = function() {
    for (var r = arguments.length, l = new Array(r), i = 0; i < r; i++)
      l[i] = arguments[i];
    clearTimeout(n), n = setTimeout(() => e(...l), De(t));
  };
  return a.clear = () => {
    clearTimeout(n);
  }, a.immediate = e, a;
}
function gt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Rl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function E1(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let a = 0;
  for (; a < e.length; )
    n.push(e.substr(a, t)), a += t;
  return n;
}
function _t() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const a = {};
  for (const r in e)
    a[r] = e[r];
  for (const r in t) {
    const l = e[r], i = t[r];
    if (El(l) && El(i)) {
      a[r] = _t(l, i, n);
      continue;
    }
    if (n && Array.isArray(l) && Array.isArray(i)) {
      a[r] = n(l, i);
      continue;
    }
    a[r] = i;
  }
  return a;
}
function Vo(e) {
  return e.map((t) => t.type === Te ? Vo(t.children) : t).flat();
}
function hn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (hn.cache.has(e)) return hn.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return hn.cache.set(e, t), t;
}
hn.cache = /* @__PURE__ */ new Map();
function $n(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => $n(e, n)).flat(1);
  if (t.suspense)
    return $n(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => $n(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return $n(e, t.component.subTree).flat(1);
  }
  return [];
}
function Er(e) {
  const t = Tn({}), n = M(e);
  return kt(() => {
    for (const a in n.value)
      t[a] = n.value[a];
  }, {
    flush: "sync"
  }), or(t);
}
function N0(e, t) {
  return e.includes(t);
}
function Eo(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const je = () => [Function, Array];
function Nl(e, t) {
  return t = "on" + sr(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function O1(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  if (Array.isArray(e))
    for (const r of e)
      r(...n);
  else typeof e == "function" && e(...n);
}
function D0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((a) => `${a}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Oo(e, t, n) {
  let a, r = e.indexOf(document.activeElement);
  const l = t === "next" ? 1 : -1;
  do
    r += l, a = e[r];
  while ((!a || a.offsetParent == null || !((n == null ? void 0 : n(a)) ?? !0)) && r < e.length && r >= 0);
  return a;
}
function Yn(e, t) {
  var a, r, l, i;
  const n = D0(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((a = n[0]) == null || a.focus());
  else if (t === "first")
    (r = n[0]) == null || r.focus();
  else if (t === "last")
    (l = n.at(-1)) == null || l.focus();
  else if (typeof t == "number")
    (i = n[t]) == null || i.focus();
  else {
    const o = Oo(n, t);
    o ? o.focus() : Yn(e, t === "next" ? "first" : "last");
  }
}
function S0(e) {
  return e == null || typeof e == "string" && e.trim() === "";
}
function F0(e, t) {
  if (!($e && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function _o(e) {
  return e.some((t) => xu(t) ? t.type === wu ? !1 : t.type !== Te || _o(t.children) : !0) ? e : null;
}
function _1(e, t) {
  if (!$e || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function L1(e, t) {
  const n = e.clientX, a = e.clientY, r = t.getBoundingClientRect(), l = r.left, i = r.top, o = r.right, s = r.bottom;
  return n >= l && n <= o && a >= i && a <= s;
}
function Ka() {
  const e = pe(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => Bo(e.value)
  }), t;
}
function Dl(e) {
  const t = e.key.length === 1, n = !e.ctrlKey && !e.metaKey && !e.altKey;
  return t && n;
}
const Lo = ["top", "bottom"], R1 = ["start", "end", "left", "right"];
function Xa(e, t) {
  let [n, a] = e.split(" ");
  return a || (a = N0(Lo, n) ? "start" : N0(R1, n) ? "top" : "center"), {
    side: Fl(n, t),
    align: Fl(a, t)
  };
}
function Fl(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Ia(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function za(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function ql(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Hl(e) {
  return N0(Lo, e.side) ? "y" : "x";
}
class fn {
  constructor(t) {
    let {
      x: n,
      y: a,
      width: r,
      height: l
    } = t;
    this.x = n, this.y = a, this.width = r, this.height = l;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function $l(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function Ro(e) {
  return Array.isArray(e) ? new fn({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Or(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), a = n.transform;
  if (a) {
    let r, l, i, o, s;
    if (a.startsWith("matrix3d("))
      r = a.slice(9, -1).split(/, /), l = +r[0], i = +r[5], o = +r[12], s = +r[13];
    else if (a.startsWith("matrix("))
      r = a.slice(7, -1).split(/, /), l = +r[0], i = +r[3], o = +r[4], s = +r[5];
    else
      return new fn(t);
    const c = n.transformOrigin, m = t.x - o - (1 - l) * parseFloat(c), f = t.y - s - (1 - i) * parseFloat(c.slice(c.indexOf(" ") + 1)), v = l ? t.width / l : e.offsetWidth + 1, g = i ? t.height / i : e.offsetHeight + 1;
    return new fn({
      x: m,
      y: f,
      width: v,
      height: g
    });
  } else
    return new fn(t);
}
function An(e, t, n) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let a;
  try {
    a = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof a.finished > "u" && (a.finished = new Promise((r) => {
    a.onfinish = () => {
      r(a);
    };
  })), a;
}
const I0 = /* @__PURE__ */ new WeakMap();
function N1(e, t) {
  Object.keys(t).forEach((n) => {
    if (ra(n)) {
      const a = Eo(n), r = I0.get(e);
      if (t[n] == null)
        r == null || r.forEach((l) => {
          const [i, o] = l;
          i === a && (e.removeEventListener(a, o), r.delete(l));
        });
      else if (!r || ![...r].some((l) => l[0] === a && l[1] === t[n])) {
        e.addEventListener(a, t[n]);
        const l = r || /* @__PURE__ */ new Set();
        l.add([a, t[n]]), I0.has(e) || I0.set(e, l);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function D1(e, t) {
  Object.keys(t).forEach((n) => {
    if (ra(n)) {
      const a = Eo(n), r = I0.get(e);
      r == null || r.forEach((l) => {
        const [i, o] = l;
        i === a && (e.removeEventListener(a, o), r.delete(l));
      });
    } else
      e.removeAttribute(n);
  });
}
const Cn = 2.4, Gl = 0.2126729, Wl = 0.7151522, jl = 0.072175, F1 = 0.55, q1 = 0.58, H1 = 0.57, $1 = 0.62, k0 = 0.03, Ul = 1.45, G1 = 5e-4, W1 = 1.25, j1 = 1.25, Yl = 0.078, Kl = 12.82051282051282, C0 = 0.06, Xl = 1e-3;
function Zl(e, t) {
  const n = (e.r / 255) ** Cn, a = (e.g / 255) ** Cn, r = (e.b / 255) ** Cn, l = (t.r / 255) ** Cn, i = (t.g / 255) ** Cn, o = (t.b / 255) ** Cn;
  let s = n * Gl + a * Wl + r * jl, c = l * Gl + i * Wl + o * jl;
  if (s <= k0 && (s += (k0 - s) ** Ul), c <= k0 && (c += (k0 - c) ** Ul), Math.abs(c - s) < G1) return 0;
  let m;
  if (c > s) {
    const f = (c ** F1 - s ** q1) * W1;
    m = f < Xl ? 0 : f < Yl ? f - f * Kl * C0 : f - C0;
  } else {
    const f = (c ** $1 - s ** H1) * j1;
    m = f > -Xl ? 0 : f > -Yl ? f - f * Kl * C0 : f + C0;
  }
  return m * 100;
}
function vn(e) {
  K0(`Vuetify: ${e}`);
}
function _r(e) {
  K0(`Vuetify error: ${e}`);
}
function U1(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, K0(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
function Za(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Y1(e) {
  return Za(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Ql = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, K1 = {
  rgb: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  rgba: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  hsl: (e, t, n, a) => Jl({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsla: (e, t, n, a) => Jl({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsv: (e, t, n, a) => Qn({
    h: e,
    s: t,
    v: n,
    a
  }),
  hsva: (e, t, n, a) => Qn({
    h: e,
    s: t,
    v: n,
    a
  })
};
function Gn(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && vn(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Ql.test(e)) {
    const {
      groups: t
    } = e.match(Ql), {
      fn: n,
      values: a
    } = t, r = a.split(/,\s*/).map((l) => l.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(l) / 100 : parseFloat(l));
    return K1[n](...r);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((a) => a + a).join("") : [6, 8].includes(t.length) || vn(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && vn(`'${e}' is not a valid hex(a) color`), X1(t);
  } else if (typeof e == "object") {
    if (Ba(e, ["r", "g", "b"]))
      return e;
    if (Ba(e, ["h", "s", "l"]))
      return Qn(No(e));
    if (Ba(e, ["h", "s", "v"]))
      return Qn(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Qn(e) {
  const {
    h: t,
    s: n,
    v: a,
    a: r
  } = e, l = (o) => {
    const s = (o + t / 60) % 6;
    return a - a * n * Math.max(Math.min(s, 4 - s, 1), 0);
  }, i = [l(5), l(3), l(1)].map((o) => Math.round(o * 255));
  return {
    r: i[0],
    g: i[1],
    b: i[2],
    a: r
  };
}
function Jl(e) {
  return Qn(No(e));
}
function No(e) {
  const {
    h: t,
    s: n,
    l: a,
    a: r
  } = e, l = a + n * Math.min(a, 1 - a), i = l === 0 ? 0 : 2 - 2 * a / l;
  return {
    h: t,
    s: i,
    v: l,
    a: r
  };
}
function X1(e) {
  e = Z1(e);
  let [t, n, a, r] = E1(e, 2).map((l) => parseInt(l, 16));
  return r = r === void 0 ? r : r / 255, {
    r: t,
    g: n,
    b: a,
    a: r
  };
}
function Z1(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Rl(Rl(e, 6), 8, "F")), e;
}
function Q1(e) {
  const t = Math.abs(Zl(Gn(0), Gn(e)));
  return Math.abs(Zl(Gn(16777215), Gn(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function _e(e, t) {
  const n = Su();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function Bt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = _e(e).type;
  return hn((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Do = 0, z0 = /* @__PURE__ */ new WeakMap();
function $t() {
  const e = _e("getUid");
  if (z0.has(e)) return z0.get(e);
  {
    const t = Do++;
    return z0.set(e, t), t;
  }
}
$t.reset = () => {
  Do = 0, z0 = /* @__PURE__ */ new WeakMap();
};
function J1(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _e("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const q0 = Symbol.for("vuetify:defaults");
function Lr() {
  const e = Ve(q0);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function nn(e, t) {
  const n = Lr(), a = ae(e), r = M(() => {
    if (De(t == null ? void 0 : t.disabled)) return n.value;
    const i = De(t == null ? void 0 : t.scoped), o = De(t == null ? void 0 : t.reset), s = De(t == null ? void 0 : t.root);
    if (a.value == null && !(i || o || s)) return n.value;
    let c = _t(a.value, {
      prev: n.value
    });
    if (i) return c;
    if (o || s) {
      const m = Number(o || 1 / 0);
      for (let f = 0; f <= m && !(!c || !("prev" in c)); f++)
        c = c.prev;
      return c && typeof s == "string" && s in c && (c = _t(_t(c, {
        prev: c
      }), c[s])), c;
    }
    return c.prev ? _t(c.prev, c) : c;
  });
  return Ge(q0, r), r;
}
function ed(e, t) {
  var n, a;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((a = e.props) == null ? void 0 : a[hn(t)]) < "u";
}
function td() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lr();
  const a = _e("useDefaults");
  if (t = t ?? a.type.name ?? a.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const r = M(() => {
    var s;
    return (s = n.value) == null ? void 0 : s[e._as ?? t];
  }), l = new Proxy(e, {
    get(s, c) {
      var f, v, g, p, b, x, S;
      const m = Reflect.get(s, c);
      return c === "class" || c === "style" ? [(f = r.value) == null ? void 0 : f[c], m].filter((A) => A != null) : typeof c == "string" && !ed(a.vnode, c) ? ((v = r.value) == null ? void 0 : v[c]) !== void 0 ? (g = r.value) == null ? void 0 : g[c] : ((b = (p = n.value) == null ? void 0 : p.global) == null ? void 0 : b[c]) !== void 0 ? (S = (x = n.value) == null ? void 0 : x.global) == null ? void 0 : S[c] : m : m;
    }
  }), i = pe();
  kt(() => {
    if (r.value) {
      const s = Object.entries(r.value).filter((c) => {
        let [m] = c;
        return m.startsWith(m[0].toUpperCase());
      });
      i.value = s.length ? Object.fromEntries(s) : void 0;
    } else
      i.value = void 0;
  });
  function o() {
    const s = J1(q0, a);
    Ge(q0, M(() => i.value ? _t((s == null ? void 0 : s.value) ?? {}, i.value) : s == null ? void 0 : s.value));
  }
  return {
    props: l,
    provideSubDefaults: o
  };
}
function o0(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return vn("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = U(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(a) {
      return Io(a, t);
    }, e.props._as = String, e.setup = function(a, r) {
      const l = Lr();
      if (!l.value) return e._setup(a, r);
      const {
        props: i,
        provideSubDefaults: o
      } = td(a, a._as ?? e.name, l), s = e._setup(i, r);
      return o(), s;
    };
  }
  return e;
}
function se() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? o0 : Y0)(t);
}
function nd(e, t) {
  return t.props = e, t;
}
function ad(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return se()({
    name: n ?? sr(Bi(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...we()
    },
    setup(a, r) {
      let {
        slots: l
      } = r;
      return () => {
        var i;
        return X0(a.tag, {
          class: [e, a.class],
          style: a.style
        }, (i = l.default) == null ? void 0 : i.call(l));
      };
    }
  });
}
function Fo(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const H0 = "cubic-bezier(0.4, 0, 0.2, 1)", rd = "cubic-bezier(0.0, 0, 0.2, 1)", ld = "cubic-bezier(0.4, 0, 1, 1)";
function ei(e, t, n) {
  return Object.keys(e).filter((a) => ra(a) && a.endsWith(t)).reduce((a, r) => (a[r.slice(0, -t.length)] = (l) => e[r](l, n(l)), a), {});
}
function qo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? id(e) : Rr(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function $0(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Rr(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Rr(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function id(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function od(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ve(e) {
  const t = _e("useRender");
  t.render = e;
}
const Gt = U({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Wt(e) {
  return {
    dimensionStyles: M(() => {
      const n = {}, a = ce(e.height), r = ce(e.maxHeight), l = ce(e.maxWidth), i = ce(e.minHeight), o = ce(e.minWidth), s = ce(e.width);
      return a != null && (n.height = a), r != null && (n.maxHeight = r), l != null && (n.maxWidth = l), i != null && (n.minHeight = i), o != null && (n.minWidth = o), s != null && (n.width = s), n;
    })
  };
}
function pn(e, t) {
  let n;
  function a() {
    n = ur(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), a();
    }) : t());
  }
  ge(e, (r) => {
    r && !n ? a() : r || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), nt(() => {
    n == null || n.stop();
  });
}
function Be(e, t, n) {
  let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const l = _e("useProxiedModel"), i = ae(e[t] !== void 0 ? e[t] : n), o = hn(t), c = o !== t ? M(() => {
    var f, v, g, p;
    return e[t], !!(((f = l.vnode.props) != null && f.hasOwnProperty(t) || (v = l.vnode.props) != null && v.hasOwnProperty(o)) && ((g = l.vnode.props) != null && g.hasOwnProperty(`onUpdate:${t}`) || (p = l.vnode.props) != null && p.hasOwnProperty(`onUpdate:${o}`)));
  }) : M(() => {
    var f, v;
    return e[t], !!((f = l.vnode.props) != null && f.hasOwnProperty(t) && ((v = l.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`)));
  });
  pn(() => !c.value, () => {
    ge(() => e[t], (f) => {
      i.value = f;
    });
  });
  const m = M({
    get() {
      const f = e[t];
      return a(c.value ? f : i.value);
    },
    set(f) {
      const v = r(f), g = Ne(c.value ? e[t] : i.value);
      g === v || a(g) === f || (i.value = v, l == null || l.emit(`update:${t}`, v));
    }
  });
  return Object.defineProperty(m, "externalValue", {
    get: () => c.value ? e[t] : i.value
  }), m;
}
const Ho = Symbol.for("vuetify:locale");
function ln() {
  const e = Ve(Ho);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function It() {
  const e = Ve(Ho);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const We = U({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), sd = U({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...we(),
  ...Gt(),
  ...We()
}, "VContainer"), $o = se()({
  name: "VContainer",
  props: sd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      rtlClasses: a
    } = It(), {
      dimensionStyles: r
    } = Wt(e);
    return ve(() => w(e.tag, {
      class: ["v-container", {
        "v-container--fluid": e.fluid
      }, a.value, e.class],
      style: [r.value, e.style]
    }, n)), {};
  }
}), ud = Symbol.for("vuetify:display"), la = U({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function bn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  const n = Ve(ud);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const a = M(() => {
    if (e.mobile != null) return e.mobile;
    if (!e.mobileBreakpoint) return n.mobile.value;
    const l = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < l;
  }), r = M(() => t ? {
    [`${t}--mobile`]: a.value
  } : {});
  return {
    ...n,
    displayClasses: r,
    mobile: a
  };
}
const cd = /* @__PURE__ */ Y0({
  __name: "BCHEncodeResult",
  props: {
    quotient: {},
    divisor: {},
    work: {}
  },
  setup(e) {
    const t = e, n = M(() => {
      Math.max(
        t.quotient.length,
        t.divisor.length,
        ...t.work.map((m) => m.length)
      );
      const r = a(t.quotient, !0), l = a(t.divisor, !1), i = t.work.map((m) => a(m, !0));
      let o = [];
      i.forEach((m, f) => {
        o.push(m), (f + 1) % 2 === 0 ? o.push("\\\\\\hline") : o.push("\\\\");
      });
      const s = "\\begin{array}{r}\\color{transparent}0\\\\" + l + "\\color{transparent}\\Big) \\\\" + "\\color{transparent}0\\\\".repeat(t.work.length - 1) + "\\end{array}", c = "\\begin{array}{r}" + r + " \\\\\\hline\\htmlStyle{margin-left: -.5em}{\\Big)} \\quad" + o.join("") + "\\end{array}";
      return "\\begin{array}{rr}" + s + "&" + c + "\\end{array}";
    });
    function a(r, l) {
      return r.map((i, o) => {
        const s = o === 0 ? "+1" : `+x^{${o}}`;
        return l ? i ? `{${s}}` : `{\\color{white}${s}}` : i ? s : "";
      }).toReversed().join("").replace(/({|)\+/, function() {
        return arguments[1];
      });
    }
    return (r, l) => (Wn(), Ii($o, null, {
      default: M0(() => [
        w(De(B1), { expr: n.value }, null, 8, ["expr"])
      ]),
      _: 1
    }));
  }
}), on = U({
  border: [Boolean, Number, String]
}, "border");
function xn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  return {
    borderClasses: M(() => {
      const a = Bn(e) ? e.value : e.border, r = [];
      if (a === !0 || a === "")
        r.push(`${t}--border`);
      else if (typeof a == "string" || a === 0)
        for (const l of String(a).split(" "))
          r.push(`border-${l}`);
      return r;
    })
  };
}
const dd = [null, "default", "comfortable", "compact"], zt = U({
  density: {
    type: String,
    default: "default",
    validator: (e) => dd.includes(e)
  }
}, "density");
function jt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  return {
    densityClasses: M(() => `${t}--density-${e.density}`)
  };
}
const wn = U({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function Rn(e) {
  return {
    elevationClasses: M(() => {
      const n = Bn(e) ? e.value : e.elevation, a = [];
      return n == null || a.push(`elevation-${n}`), a;
    })
  };
}
const pt = U({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function Pt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  return {
    roundedClasses: M(() => {
      const a = Bn(e) ? e.value : e.rounded, r = Bn(e) ? e.value : e.tile, l = [];
      if (a === !0 || a === "")
        l.push(`${t}--rounded`);
      else if (typeof a == "string" || a === 0)
        for (const i of String(a).split(" "))
          l.push(`rounded-${i}`);
      else (r || a === !1) && l.push("rounded-0");
      return l;
    })
  };
}
const ti = Symbol.for("vuetify:theme"), qe = U({
  theme: String
}, "theme");
function Ue(e) {
  _e("provideTheme");
  const t = Ve(ti, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = M(() => e.theme ?? t.name.value), a = M(() => t.themes.value[n.value]), r = M(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), l = {
    ...t,
    name: n,
    current: a,
    themeClasses: r
  };
  return Ge(ti, l), l;
}
function Nr(e) {
  return Er(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Za(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && Y1(e.value.background)) {
          const a = Gn(e.value.background);
          if (a.a == null || a.a === 1) {
            const r = Q1(a);
            n.color = r, n.caretColor = r;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Za(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function qt(e, t) {
  const n = M(() => ({
    text: Bn(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: a,
    colorStyles: r
  } = Nr(n);
  return {
    textColorClasses: a,
    textColorStyles: r
  };
}
function St(e, t) {
  const n = M(() => ({
    background: Bn(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: a,
    colorStyles: r
  } = Nr(n);
  return {
    backgroundColorClasses: a,
    backgroundColorStyles: r
  };
}
const md = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function ia(e, t) {
  return w(Te, null, [e && w("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), w("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const sn = U({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => md.includes(e)
  }
}, "variant");
function oa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  const n = M(() => {
    const {
      variant: l
    } = De(e);
    return `${t}--variant-${l}`;
  }), {
    colorClasses: a,
    colorStyles: r
  } = Nr(M(() => {
    const {
      variant: l,
      color: i
    } = De(e);
    return {
      [["elevated", "flat"].includes(l) ? "background" : "text"]: i
    };
  }));
  return {
    colorClasses: a,
    colorStyles: r,
    variantClasses: n
  };
}
const Go = U({
  baseColor: String,
  divided: Boolean,
  ...on(),
  ...we(),
  ...zt(),
  ...wn(),
  ...pt(),
  ...We(),
  ...qe(),
  ...sn()
}, "VBtnGroup"), ni = se()({
  name: "VBtnGroup",
  props: Go(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ue(e), {
      densityClasses: r
    } = jt(e), {
      borderClasses: l
    } = xn(e), {
      elevationClasses: i
    } = Rn(e), {
      roundedClasses: o
    } = Pt(e);
    nn({
      VBtn: {
        height: "auto",
        baseColor: J(e, "baseColor"),
        color: J(e, "color"),
        density: J(e, "density"),
        flat: !0,
        variant: J(e, "variant")
      }
    }), ve(() => w(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, a.value, l.value, r.value, i.value, o.value, e.class],
      style: e.style
    }, n));
  }
}), Dr = U({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Wo = U({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function jo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const a = _e("useGroupItem");
  if (!a)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const r = $t();
  Ge(Symbol.for(`${t.description}:id`), r);
  const l = Ve(t, null);
  if (!l) {
    if (!n) return l;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const i = J(e, "value"), o = M(() => !!(l.disabled.value || e.disabled));
  l.register({
    id: r,
    value: i,
    disabled: o
  }, a), Ct(() => {
    l.unregister(r);
  });
  const s = M(() => l.isSelected(r)), c = M(() => l.items.value[0].id === r), m = M(() => l.items.value[l.items.value.length - 1].id === r), f = M(() => s.value && [l.selectedClass.value, e.selectedClass]);
  return ge(s, (v) => {
    a.emit("group:selected", {
      value: v
    });
  }, {
    flush: "sync"
  }), {
    id: r,
    isSelected: s,
    isFirst: c,
    isLast: m,
    toggle: () => l.select(r, !s.value),
    select: (v) => l.select(r, v),
    selectedClass: f,
    value: i,
    disabled: o,
    group: l
  };
}
function Fr(e, t) {
  let n = !1;
  const a = Tn([]), r = Be(e, "modelValue", [], (v) => v == null ? [] : Uo(a, Ye(v)), (v) => {
    const g = fd(a, v);
    return e.multiple ? g : g[0];
  }), l = _e("useGroup");
  function i(v, g) {
    const p = v, b = Symbol.for(`${t.description}:id`), S = $n(b, l == null ? void 0 : l.vnode).indexOf(g);
    De(p.value) == null && (p.value = S, p.useIndexAsValue = !0), S > -1 ? a.splice(S, 0, p) : a.push(p);
  }
  function o(v) {
    if (n) return;
    s();
    const g = a.findIndex((p) => p.id === v);
    a.splice(g, 1);
  }
  function s() {
    const v = a.find((g) => !g.disabled);
    v && e.mandatory === "force" && !r.value.length && (r.value = [v.id]);
  }
  Pn(() => {
    s();
  }), Ct(() => {
    n = !0;
  }), ku(() => {
    for (let v = 0; v < a.length; v++)
      a[v].useIndexAsValue && (a[v].value = v);
  });
  function c(v, g) {
    const p = a.find((b) => b.id === v);
    if (!(g && (p != null && p.disabled)))
      if (e.multiple) {
        const b = r.value.slice(), x = b.findIndex((A) => A === v), S = ~x;
        if (g = g ?? !S, S && e.mandatory && b.length <= 1 || !S && e.max != null && b.length + 1 > e.max) return;
        x < 0 && g ? b.push(v) : x >= 0 && !g && b.splice(x, 1), r.value = b;
      } else {
        const b = r.value.includes(v);
        if (e.mandatory && b) return;
        r.value = g ?? !b ? [v] : [];
      }
  }
  function m(v) {
    if (e.multiple && vn('This method is not supported when using "multiple" prop'), r.value.length) {
      const g = r.value[0], p = a.findIndex((S) => S.id === g);
      let b = (p + v) % a.length, x = a[b];
      for (; x.disabled && b !== p; )
        b = (b + v) % a.length, x = a[b];
      if (x.disabled) return;
      r.value = [a[b].id];
    } else {
      const g = a.find((p) => !p.disabled);
      g && (r.value = [g.id]);
    }
  }
  const f = {
    register: i,
    unregister: o,
    selected: r,
    select: c,
    disabled: J(e, "disabled"),
    prev: () => m(a.length - 1),
    next: () => m(1),
    isSelected: (v) => r.value.includes(v),
    selectedClass: M(() => e.selectedClass),
    items: M(() => a),
    getItemIndex: (v) => hd(a, v)
  };
  return Ge(t, f), f;
}
function hd(e, t) {
  const n = Uo(e, [t]);
  return n.length ? e.findIndex((a) => a.id === n[0]) : -1;
}
function Uo(e, t) {
  const n = [];
  return t.forEach((a) => {
    const r = e.find((i) => rn(a, i.value)), l = e[a];
    (r == null ? void 0 : r.value) != null ? n.push(r.id) : l != null && n.push(l.id);
  }), n;
}
function fd(e, t) {
  const n = [];
  return t.forEach((a) => {
    const r = e.findIndex((l) => l.id === a);
    if (~r) {
      const l = e[r];
      n.push(l.value != null ? l.value : r);
    }
  }), n;
}
const Yo = Symbol.for("vuetify:v-btn-toggle"), vd = U({
  ...Go(),
  ...Dr()
}, "VBtnToggle");
se()({
  name: "VBtnToggle",
  props: vd(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: a,
      next: r,
      prev: l,
      select: i,
      selected: o
    } = Fr(e, Yo);
    return ve(() => {
      const s = ni.filterProps(e);
      return w(ni, oe({
        class: ["v-btn-toggle", e.class]
      }, s, {
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: a,
            next: r,
            prev: l,
            select: i,
            selected: o
          })];
        }
      });
    }), {
      next: r,
      prev: l,
      select: i
    };
  }
});
const gd = U({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), tt = se(!1)({
  name: "VDefaultsProvider",
  props: gd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: a,
      disabled: r,
      reset: l,
      root: i,
      scoped: o
    } = or(e);
    return nn(a, {
      reset: l,
      root: i,
      scoped: o,
      disabled: r
    }), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
}), be = [String, Function, Object, Array], pd = Symbol.for("vuetify:icons"), sa = U({
  icon: {
    type: be
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), ai = se()({
  name: "VComponentIcon",
  props: sa(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const a = e.icon;
      return w(e.tag, null, {
        default: () => {
          var r;
          return [e.icon ? w(a, null, null) : (r = n.default) == null ? void 0 : r.call(n)];
        }
      });
    };
  }
}), yd = o0({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: sa(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => w(e.tag, oe(n, {
      style: null
    }), {
      default: () => [w("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((a) => Array.isArray(a) ? w("path", {
        d: a[0],
        "fill-opacity": a[1]
      }, null) : w("path", {
        d: a
      }, null)) : w("path", {
        d: e.icon
      }, null)])]
    });
  }
});
o0({
  name: "VLigatureIcon",
  props: sa(),
  setup(e) {
    return () => w(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
o0({
  name: "VClassIcon",
  props: sa(),
  setup(e) {
    return () => w(e.tag, {
      class: e.icon
    }, null);
  }
});
const bd = (e) => {
  const t = Ve(pd);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: M(() => {
      var s;
      const a = De(e);
      if (!a) return {
        component: ai
      };
      let r = a;
      if (typeof r == "string" && (r = r.trim(), r.startsWith("$") && (r = (s = t.aliases) == null ? void 0 : s[r.slice(1)])), r || vn(`Could not find aliased icon "${a}"`), Array.isArray(r))
        return {
          component: yd,
          icon: r
        };
      if (typeof r != "string")
        return {
          component: ai,
          icon: r
        };
      const l = Object.keys(t.sets).find((c) => typeof r == "string" && r.startsWith(`${c}:`)), i = l ? r.slice(l.length + 1) : r;
      return {
        component: t.sets[l ?? t.defaultSet].component,
        icon: i
      };
    })
  };
}, xd = ["x-small", "small", "default", "large", "x-large"], Nn = U({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function s0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  return Er(() => {
    let n, a;
    return N0(xd, e.size) ? n = `${t}--size-${e.size}` : e.size && (a = {
      width: ce(e.size),
      height: ce(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: a
    };
  });
}
const wd = U({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: be,
  ...we(),
  ...Nn(),
  ...We({
    tag: "i"
  }),
  ...qe()
}, "VIcon"), He = se()({
  name: "VIcon",
  props: wd(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const r = ae(), {
      themeClasses: l
    } = Ue(e), {
      iconData: i
    } = bd(M(() => r.value || e.icon)), {
      sizeClasses: o
    } = s0(e), {
      textColorClasses: s,
      textColorStyles: c
    } = qt(J(e, "color"));
    return ve(() => {
      var v, g;
      const m = (v = a.default) == null ? void 0 : v.call(a);
      m && (r.value = (g = Vo(m).filter((p) => p.type === Cu && p.children && typeof p.children == "string")[0]) == null ? void 0 : g.children);
      const f = !!(n.onClick || n.onClickOnce);
      return w(i.value.component, {
        tag: e.tag,
        icon: i.value.icon,
        class: ["v-icon", "notranslate", l.value, o.value, s.value, {
          "v-icon--clickable": f,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [o.value ? void 0 : {
          fontSize: ce(e.size),
          height: ce(e.size),
          width: ce(e.size)
        }, c.value, e.style],
        role: f ? "button" : void 0,
        "aria-hidden": !f,
        tabindex: f ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [m]
      });
    }), {};
  }
});
function Ko(e, t) {
  const n = ae(), a = pe(!1);
  if (Vr) {
    const r = new IntersectionObserver((l) => {
      a.value = !!l.find((i) => i.isIntersecting);
    }, t);
    Ct(() => {
      r.disconnect();
    }), ge(n, (l, i) => {
      i && (r.unobserve(i), a.value = !1), l && r.observe(l);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: a
  };
}
function zn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = Ka(), a = ae();
  if ($e) {
    const r = new ResizeObserver((l) => {
      e == null || e(l, r), l.length && (t === "content" ? a.value = l[0].contentRect : a.value = l[0].target.getBoundingClientRect());
    });
    Ct(() => {
      r.disconnect();
    }), ge(() => n.el, (l, i) => {
      i && (r.unobserve(i), a.value = void 0), l && r.observe(l);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: cr(a)
  };
}
const Sd = U({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...we(),
  ...Nn(),
  ...We({
    tag: "div"
  }),
  ...qe()
}, "VProgressCircular"), kd = se()({
  name: "VProgressCircular",
  props: Sd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = 20, r = 2 * Math.PI * a, l = ae(), {
      themeClasses: i
    } = Ue(e), {
      sizeClasses: o,
      sizeStyles: s
    } = s0(e), {
      textColorClasses: c,
      textColorStyles: m
    } = qt(J(e, "color")), {
      textColorClasses: f,
      textColorStyles: v
    } = qt(J(e, "bgColor")), {
      intersectionRef: g,
      isIntersecting: p
    } = Ko(), {
      resizeRef: b,
      contentRect: x
    } = zn(), S = M(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), A = M(() => Number(e.width)), V = M(() => s.value ? Number(e.size) : x.value ? x.value.width : Math.max(A.value, 32)), P = M(() => a / (1 - A.value / V.value) * 2), z = M(() => A.value / V.value * P.value), _ = M(() => ce((100 - S.value) / 100 * r));
    return kt(() => {
      g.value = l.value, b.value = l.value;
    }), ve(() => w(e.tag, {
      ref: l,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": p.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, i.value, o.value, c.value, e.class],
      style: [s.value, m.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : S.value
    }, {
      default: () => [w("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${P.value} ${P.value}`
      }, [w("circle", {
        class: ["v-progress-circular__underlay", f.value],
        style: v.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": z.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": 0
      }, null), w("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": z.value,
        "stroke-dasharray": r,
        "stroke-dashoffset": _.value
      }, null)]), n.default && w("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: S.value
      })])]
    })), {};
  }
}), ri = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, qr = U({
  location: String
}, "location");
function Hr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: a
  } = It();
  return {
    locationStyles: M(() => {
      if (!e.location) return {};
      const {
        side: l,
        align: i
      } = Xa(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, a.value);
      function o(c) {
        return n ? n(c) : 0;
      }
      const s = {};
      return l !== "center" && (t ? s[ri[l]] = `calc(100% - ${o(l)}px)` : s[l] = 0), i !== "center" ? t ? s[ri[i]] = `calc(100% - ${o(i)}px)` : s[i] = 0 : (l === "center" ? s.top = s.left = "50%" : s[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[l]] = "50%", s.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[l]), s;
    })
  };
}
const Cd = U({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...we(),
  ...qr({
    location: "top"
  }),
  ...pt(),
  ...We(),
  ...qe()
}, "VProgressLinear"), Ad = se()({
  name: "VProgressLinear",
  props: Cd(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    var F;
    let {
      slots: n
    } = t;
    const a = Be(e, "modelValue"), {
      isRtl: r,
      rtlClasses: l
    } = It(), {
      themeClasses: i
    } = Ue(e), {
      locationStyles: o
    } = Hr(e), {
      textColorClasses: s,
      textColorStyles: c
    } = qt(e, "color"), {
      backgroundColorClasses: m,
      backgroundColorStyles: f
    } = St(M(() => e.bgColor || e.color)), {
      backgroundColorClasses: v,
      backgroundColorStyles: g
    } = St(M(() => e.bufferColor || e.bgColor || e.color)), {
      backgroundColorClasses: p,
      backgroundColorStyles: b
    } = St(e, "color"), {
      roundedClasses: x
    } = Pt(e), {
      intersectionRef: S,
      isIntersecting: A
    } = Ko(), V = M(() => parseFloat(e.max)), P = M(() => parseFloat(e.height)), z = M(() => gt(parseFloat(e.bufferValue) / V.value * 100, 0, 100)), _ = M(() => gt(parseFloat(a.value) / V.value * 100, 0, 100)), O = M(() => r.value !== e.reverse), B = M(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), E = $e && ((F = window.matchMedia) == null ? void 0 : F.call(window, "(forced-colors: active)").matches);
    function j(L) {
      if (!S.value) return;
      const {
        left: D,
        right: $,
        width: Z
      } = S.value.getBoundingClientRect(), te = O.value ? Z - L.clientX + ($ - Z) : L.clientX - D;
      a.value = Math.round(te / Z * V.value);
    }
    return ve(() => w(e.tag, {
      ref: S,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && A.value,
        "v-progress-linear--reverse": O.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, x.value, i.value, l.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? ce(P.value) : 0,
        "--v-progress-linear-height": ce(P.value),
        ...e.absolute ? o.value : {}
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : _.value,
      onClick: e.clickable && j
    }, {
      default: () => [e.stream && w("div", {
        key: "stream",
        class: ["v-progress-linear__stream", s.value],
        style: {
          ...c.value,
          [O.value ? "left" : "right"]: ce(-P.value),
          borderTop: `${ce(P.value / 2)} dotted`,
          opacity: parseFloat(e.bufferOpacity),
          top: `calc(50% - ${ce(P.value / 4)})`,
          width: ce(100 - z.value, "%"),
          "--v-progress-linear-stream-to": ce(P.value * (O.value ? 1 : -1))
        }
      }, null), w("div", {
        class: ["v-progress-linear__background", E ? void 0 : m.value],
        style: [f.value, {
          opacity: parseFloat(e.bgOpacity),
          width: e.stream ? 0 : void 0
        }]
      }, null), w("div", {
        class: ["v-progress-linear__buffer", E ? void 0 : v.value],
        style: [g.value, {
          opacity: parseFloat(e.bufferOpacity),
          width: ce(z.value, "%")
        }]
      }, null), w(gn, {
        name: B.value
      }, {
        default: () => [e.indeterminate ? w("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((L) => w("div", {
          key: L,
          class: ["v-progress-linear__indeterminate", L, E ? void 0 : p.value],
          style: b.value
        }, null))]) : w("div", {
          class: ["v-progress-linear__determinate", E ? void 0 : p.value],
          style: [b.value, {
            width: ce(_.value, "%")
          }]
        }, null)]
      }), n.default && w("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: _.value,
        buffer: z.value
      })])]
    })), {};
  }
}), $r = U({
  loading: [Boolean, String]
}, "loader");
function Gr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  return {
    loaderClasses: M(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Xo(e, t) {
  var a;
  let {
    slots: n
  } = t;
  return w("div", {
    class: `${e.name}__loader`
  }, [((a = n.default) == null ? void 0 : a.call(n, {
    color: e.color,
    isActive: e.active
  })) || w(Ad, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Md = ["static", "relative", "fixed", "absolute", "sticky"], Zo = U({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => Md.includes(e)
    )
  }
}, "position");
function Qo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  return {
    positionClasses: M(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Td() {
  const e = _e("useRoute");
  return M(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function Bd() {
  var e, t;
  return (t = (e = _e("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Wr(e, t) {
  var f, v;
  const n = Au("RouterLink"), a = M(() => !!(e.href || e.to)), r = M(() => (a == null ? void 0 : a.value) || Nl(t, "click") || Nl(e, "click"));
  if (typeof n == "string" || !("useLink" in n)) {
    const g = J(e, "href");
    return {
      isLink: a,
      isClickable: r,
      href: g,
      linkProps: Tn({
        href: g
      })
    };
  }
  const l = M(() => ({
    ...e,
    to: J(() => e.to || "")
  })), i = n.useLink(l.value), o = M(() => e.to ? i : void 0), s = Td(), c = M(() => {
    var g, p, b;
    return o.value ? e.exact ? s.value ? ((b = o.value.isExactActive) == null ? void 0 : b.value) && rn(o.value.route.value.query, s.value.query) : ((p = o.value.isExactActive) == null ? void 0 : p.value) ?? !1 : ((g = o.value.isActive) == null ? void 0 : g.value) ?? !1 : !1;
  }), m = M(() => {
    var g;
    return e.to ? (g = o.value) == null ? void 0 : g.route.value.href : e.href;
  });
  return {
    isLink: a,
    isClickable: r,
    isActive: c,
    route: (f = o.value) == null ? void 0 : f.route,
    navigate: (v = o.value) == null ? void 0 : v.navigate,
    href: m,
    linkProps: Tn({
      href: m,
      "aria-current": M(() => c.value ? "page" : void 0)
    })
  };
}
const jr = U({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let Pa = !1;
function Id(e, t) {
  let n = !1, a, r;
  $e && (Ze(() => {
    window.addEventListener("popstate", l), a = e == null ? void 0 : e.beforeEach((i, o, s) => {
      Pa ? n ? t(s) : s() : setTimeout(() => n ? t(s) : s()), Pa = !0;
    }), r = e == null ? void 0 : e.afterEach(() => {
      Pa = !1;
    });
  }), nt(() => {
    window.removeEventListener("popstate", l), a == null || a(), r == null || r();
  }));
  function l(i) {
    var o;
    (o = i.state) != null && o.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function zd(e, t) {
  ge(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && Ze(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const Qa = Symbol("rippleStop"), Pd = 80;
function li(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Ja(e) {
  return e.constructor.name === "TouchEvent";
}
function Jo(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Vd = function(e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = 0, r = 0;
  if (!Jo(e)) {
    const v = t.getBoundingClientRect(), g = Ja(e) ? e.touches[e.touches.length - 1] : e;
    a = g.clientX - v.left, r = g.clientY - v.top;
  }
  let l = 0, i = 0.3;
  (f = t._ripple) != null && f.circle ? (i = 0.15, l = t.clientWidth / 2, l = n.center ? l : l + Math.sqrt((a - l) ** 2 + (r - l) ** 2) / 4) : l = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const o = `${(t.clientWidth - l * 2) / 2}px`, s = `${(t.clientHeight - l * 2) / 2}px`, c = n.center ? o : `${a - l}px`, m = n.center ? s : `${r - l}px`;
  return {
    radius: l,
    scale: i,
    x: c,
    y: m,
    centerX: o,
    centerY: s
  };
}, G0 = {
  /* eslint-disable max-statements */
  show(e, t) {
    var g;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((g = t == null ? void 0 : t._ripple) != null && g.enabled))
      return;
    const a = document.createElement("span"), r = document.createElement("span");
    a.appendChild(r), a.className = "v-ripple__container", n.class && (a.className += ` ${n.class}`);
    const {
      radius: l,
      scale: i,
      x: o,
      y: s,
      centerX: c,
      centerY: m
    } = Vd(e, t, n), f = `${l * 2}px`;
    r.className = "v-ripple__animation", r.style.width = f, r.style.height = f, t.appendChild(a);
    const v = window.getComputedStyle(t);
    v && v.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), r.classList.add("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--visible"), li(r, `translate(${o}, ${s}) scale3d(${i},${i},${i})`), r.dataset.activated = String(performance.now()), setTimeout(() => {
      r.classList.remove("v-ripple__animation--enter"), r.classList.add("v-ripple__animation--in"), li(r, `translate(${c}, ${m}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var l;
    if (!((l = e == null ? void 0 : e._ripple) != null && l.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding) return;
    n.dataset.isHiding = "true";
    const a = performance.now() - Number(n.dataset.activated), r = Math.max(250 - a, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var o;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((o = n.parentNode) == null ? void 0 : o.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, r);
  }
};
function es(e) {
  return typeof e > "u" || !!e;
}
function Jn(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[Qa])) {
    if (e[Qa] = !0, Ja(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || Jo(e), n._ripple.class && (t.class = n._ripple.class), Ja(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        G0.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var a;
        (a = n == null ? void 0 : n._ripple) != null && a.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Pd);
    } else
      G0.show(e, n, t);
  }
}
function ii(e) {
  e[Qa] = !0;
}
function lt(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        lt(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), G0.hide(t);
  }
}
function ts(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let e0 = !1;
function ns(e) {
  !e0 && (e.keyCode === Ol.enter || e.keyCode === Ol.space) && (e0 = !0, Jn(e));
}
function as(e) {
  e0 = !1, lt(e);
}
function rs(e) {
  e0 && (e0 = !1, lt(e));
}
function ls(e, t, n) {
  const {
    value: a,
    modifiers: r
  } = t, l = es(a);
  if (l || G0.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = l, e._ripple.centered = r.center, e._ripple.circle = r.circle, I1(a) && a.class && (e._ripple.class = a.class), l && !n) {
    if (r.stop) {
      e.addEventListener("touchstart", ii, {
        passive: !0
      }), e.addEventListener("mousedown", ii);
      return;
    }
    e.addEventListener("touchstart", Jn, {
      passive: !0
    }), e.addEventListener("touchend", lt, {
      passive: !0
    }), e.addEventListener("touchmove", ts, {
      passive: !0
    }), e.addEventListener("touchcancel", lt), e.addEventListener("mousedown", Jn), e.addEventListener("mouseup", lt), e.addEventListener("mouseleave", lt), e.addEventListener("keydown", ns), e.addEventListener("keyup", as), e.addEventListener("blur", rs), e.addEventListener("dragstart", lt, {
      passive: !0
    });
  } else !l && n && is(e);
}
function is(e) {
  e.removeEventListener("mousedown", Jn), e.removeEventListener("touchstart", Jn), e.removeEventListener("touchend", lt), e.removeEventListener("touchmove", ts), e.removeEventListener("touchcancel", lt), e.removeEventListener("mouseup", lt), e.removeEventListener("mouseleave", lt), e.removeEventListener("keydown", ns), e.removeEventListener("keyup", as), e.removeEventListener("dragstart", lt), e.removeEventListener("blur", rs);
}
function Ed(e, t) {
  ls(e, t, !1);
}
function Od(e) {
  delete e._ripple, is(e);
}
function _d(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = es(t.oldValue);
  ls(e, t, n);
}
const ua = {
  mounted: Ed,
  unmounted: Od,
  updated: _d
}, Ld = U({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: Yo
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: be,
  appendIcon: be,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...on(),
  ...we(),
  ...zt(),
  ...Gt(),
  ...wn(),
  ...Wo(),
  ...$r(),
  ...qr(),
  ...Zo(),
  ...pt(),
  ...jr(),
  ...Nn(),
  ...We({
    tag: "button"
  }),
  ...qe(),
  ...sn({
    variant: "elevated"
  })
}, "VBtn"), Xt = se()({
  name: "VBtn",
  props: Ld(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: r
    } = Ue(e), {
      borderClasses: l
    } = xn(e), {
      densityClasses: i
    } = jt(e), {
      dimensionStyles: o
    } = Wt(e), {
      elevationClasses: s
    } = Rn(e), {
      loaderClasses: c
    } = Gr(e), {
      locationStyles: m
    } = Hr(e), {
      positionClasses: f
    } = Qo(e), {
      roundedClasses: v
    } = Pt(e), {
      sizeClasses: g,
      sizeStyles: p
    } = s0(e), b = jo(e, e.symbol, !1), x = Wr(e, n), S = M(() => {
      var F;
      return e.active !== void 0 ? e.active : x.isLink.value ? (F = x.isActive) == null ? void 0 : F.value : b == null ? void 0 : b.isSelected.value;
    }), A = M(() => S.value ? e.activeColor ?? e.color : e.color), V = M(() => {
      var L, D;
      return {
        color: (b == null ? void 0 : b.isSelected.value) && (!x.isLink.value || ((L = x.isActive) == null ? void 0 : L.value)) || !b || ((D = x.isActive) == null ? void 0 : D.value) ? A.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: P,
      colorStyles: z,
      variantClasses: _
    } = oa(V), O = M(() => (b == null ? void 0 : b.disabled.value) || e.disabled), B = M(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), E = M(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function j(F) {
      var L;
      O.value || x.isLink.value && (F.metaKey || F.ctrlKey || F.shiftKey || F.button !== 0 || n.target === "_blank") || ((L = x.navigate) == null || L.call(x, F), b == null || b.toggle());
    }
    return zd(x, b == null ? void 0 : b.select), ve(() => {
      const F = x.isLink.value ? "a" : e.tag, L = !!(e.prependIcon || a.prepend), D = !!(e.appendIcon || a.append), $ = !!(e.icon && e.icon !== !0);
      return dt(w(F, oe({
        type: F === "a" ? void 0 : "button",
        class: ["v-btn", b == null ? void 0 : b.selectedClass.value, {
          "v-btn--active": S.value,
          "v-btn--block": e.block,
          "v-btn--disabled": O.value,
          "v-btn--elevated": B.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, r.value, l.value, P.value, i.value, s.value, c.value, f.value, v.value, g.value, _.value, e.class],
        style: [z.value, o.value, m.value, p.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: O.value || void 0,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: j,
        value: E.value
      }, x.linkProps), {
        default: () => {
          var Z;
          return [ia(!0, "v-btn"), !e.icon && L && w("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [a.prepend ? w(tt, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, a.prepend) : w(He, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), w("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!a.default && $ ? w(He, {
            key: "content-icon",
            icon: e.icon
          }, null) : w(tt, {
            key: "content-defaults",
            disabled: !$,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var te;
              return [((te = a.default) == null ? void 0 : te.call(a)) ?? e.text];
            }
          })]), !e.icon && D && w("span", {
            key: "append",
            class: "v-btn__append"
          }, [a.append ? w(tt, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, a.append) : w(He, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && w("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((Z = a.loader) == null ? void 0 : Z.call(a)) ?? w(kd, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[ua, !O.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: b
    };
  }
}), Rd = Symbol.for("vuetify:goto");
function Nd() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (e) => e,
      easeInQuad: (e) => e ** 2,
      easeOutQuad: (e) => e * (2 - e),
      easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
      easeInCubic: (e) => e ** 3,
      easeOutCubic: (e) => --e ** 3 + 1,
      easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
      easeInQuart: (e) => e ** 4,
      easeOutQuart: (e) => 1 - --e ** 4,
      easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
      easeInQuint: (e) => e ** 5,
      easeOutQuint: (e) => 1 + --e ** 5,
      easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5
    }
  };
}
function Dd(e) {
  return Ur(e) ?? (document.scrollingElement || document.body);
}
function Ur(e) {
  return typeof e == "string" ? document.querySelector(e) : Bo(e);
}
function Va(e, t, n) {
  if (typeof e == "number") return t && n ? -e : e;
  let a = Ur(e), r = 0;
  for (; a; )
    r += t ? a.offsetLeft : a.offsetTop, a = a.offsetParent;
  return r;
}
async function oi(e, t, n, a) {
  const r = n ? "scrollLeft" : "scrollTop", l = _t((a == null ? void 0 : a.options) ?? Nd(), t), i = a == null ? void 0 : a.rtl.value, o = (typeof e == "number" ? e : Ur(e)) ?? 0, s = l.container === "parent" && o instanceof HTMLElement ? o.parentElement : Dd(l.container), c = typeof l.easing == "function" ? l.easing : l.patterns[l.easing];
  if (!c) throw new TypeError(`Easing function "${l.easing}" not found.`);
  let m;
  if (typeof o == "number")
    m = Va(o, n, i);
  else if (m = Va(o, n, i) - Va(s, n, i), l.layout) {
    const p = window.getComputedStyle(o).getPropertyValue("--v-layout-top");
    p && (m -= parseInt(p, 10));
  }
  m += l.offset, m = qd(s, m, !!i, !!n);
  const f = s[r] ?? 0;
  if (m === f) return Promise.resolve(m);
  const v = performance.now();
  return new Promise((g) => requestAnimationFrame(function p(b) {
    const S = (b - v) / l.duration, A = Math.floor(f + (m - f) * c(gt(S, 0, 1)));
    if (s[r] = A, S >= 1 && Math.abs(A - s[r]) < 10)
      return g(m);
    if (S > 2)
      return vn("Scroll target is not reachable"), g(s[r]);
    requestAnimationFrame(p);
  }));
}
function Fd() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = Ve(Rd), {
    isRtl: n
  } = It();
  if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
  const a = {
    ...t,
    // can be set via VLocaleProvider
    rtl: M(() => t.rtl.value || n.value)
  };
  async function r(l, i) {
    return oi(l, _t(e, i), !1, a);
  }
  return r.horizontal = async (l, i) => oi(l, _t(e, i), !0, a), r;
}
function qd(e, t, n, a) {
  const {
    scrollWidth: r,
    scrollHeight: l
  } = e, [i, o] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let s, c;
  return a ? n ? (s = -(r - i), c = 0) : (s = 0, c = r - i) : (s = 0, c = l + -o), Math.max(Math.min(t, c), s);
}
function Hd() {
  const e = ae([]);
  Mu(() => e.value = []);
  function t(n, a) {
    e.value[a] = n;
  }
  return {
    refs: e,
    updateRef: t
  };
}
const $d = U({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (e) => e.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (e) => e % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: be,
    default: "$first"
  },
  prevIcon: {
    type: be,
    default: "$prev"
  },
  nextIcon: {
    type: be,
    default: "$next"
  },
  lastIcon: {
    type: be,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...on(),
  ...we(),
  ...zt(),
  ...wn(),
  ...pt(),
  ...Nn(),
  ...We({
    tag: "nav"
  }),
  ...qe(),
  ...sn({
    variant: "text"
  })
}, "VPagination"), si = se()({
  name: "VPagination",
  props: $d(),
  emits: {
    "update:modelValue": (e) => !0,
    first: (e) => !0,
    prev: (e) => !0,
    next: (e) => !0,
    last: (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const r = Be(e, "modelValue"), {
      t: l,
      n: i
    } = ln(), {
      isRtl: o
    } = It(), {
      themeClasses: s
    } = Ue(e), {
      width: c
    } = bn(), m = pe(-1);
    nn(void 0, {
      scoped: !0
    });
    const {
      resizeRef: f
    } = zn((B) => {
      if (!B.length) return;
      const {
        target: E,
        contentRect: j
      } = B[0], F = E.querySelector(".v-pagination__list > *");
      if (!F) return;
      const L = j.width, D = F.offsetWidth + parseFloat(getComputedStyle(F).marginRight) * 2;
      m.value = b(L, D);
    }), v = M(() => parseInt(e.length, 10)), g = M(() => parseInt(e.start, 10)), p = M(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : m.value >= 0 ? m.value : b(c.value, 58));
    function b(B, E) {
      const j = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((B - E * j) / E).toFixed(2)
      ));
    }
    const x = M(() => {
      if (v.value <= 0 || isNaN(v.value) || v.value > Number.MAX_SAFE_INTEGER) return [];
      if (p.value <= 0) return [];
      if (p.value === 1) return [r.value];
      if (v.value <= p.value)
        return w0(v.value, g.value);
      const B = p.value % 2 === 0, E = B ? p.value / 2 : Math.floor(p.value / 2), j = B ? E : E + 1, F = v.value - E;
      if (j - r.value >= 0)
        return [...w0(Math.max(1, p.value - 1), g.value), e.ellipsis, v.value];
      if (r.value - F >= (B ? 1 : 0)) {
        const L = p.value - 1, D = v.value - L + g.value;
        return [g.value, e.ellipsis, ...w0(L, D)];
      } else {
        const L = Math.max(1, p.value - 3), D = L === 1 ? r.value : r.value - Math.ceil(L / 2) + g.value;
        return [g.value, e.ellipsis, ...w0(L, D), e.ellipsis, v.value];
      }
    });
    function S(B, E, j) {
      B.preventDefault(), r.value = E, j && a(j, E);
    }
    const {
      refs: A,
      updateRef: V
    } = Hd();
    nn({
      VPaginationBtn: {
        color: J(e, "color"),
        border: J(e, "border"),
        density: J(e, "density"),
        size: J(e, "size"),
        variant: J(e, "variant"),
        rounded: J(e, "rounded"),
        elevation: J(e, "elevation")
      }
    });
    const P = M(() => x.value.map((B, E) => {
      const j = (F) => V(F, E);
      if (typeof B == "string")
        return {
          isActive: !1,
          key: `ellipsis-${E}`,
          page: B,
          props: {
            ref: j,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const F = B === r.value;
        return {
          isActive: F,
          key: B,
          page: i(B),
          props: {
            ref: j,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || +e.length < 2,
            color: F ? e.activeColor : e.color,
            "aria-current": F,
            "aria-label": l(F ? e.currentPageAriaLabel : e.pageAriaLabel, B),
            onClick: (L) => S(L, B)
          }
        };
      }
    })), z = M(() => {
      const B = !!e.disabled || r.value <= g.value, E = !!e.disabled || r.value >= g.value + v.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: o.value ? e.lastIcon : e.firstIcon,
          onClick: (j) => S(j, g.value, "first"),
          disabled: B,
          "aria-label": l(e.firstAriaLabel),
          "aria-disabled": B
        } : void 0,
        prev: {
          icon: o.value ? e.nextIcon : e.prevIcon,
          onClick: (j) => S(j, r.value - 1, "prev"),
          disabled: B,
          "aria-label": l(e.previousAriaLabel),
          "aria-disabled": B
        },
        next: {
          icon: o.value ? e.prevIcon : e.nextIcon,
          onClick: (j) => S(j, r.value + 1, "next"),
          disabled: E,
          "aria-label": l(e.nextAriaLabel),
          "aria-disabled": E
        },
        last: e.showFirstLastPage ? {
          icon: o.value ? e.firstIcon : e.lastIcon,
          onClick: (j) => S(j, g.value + v.value - 1, "last"),
          disabled: E,
          "aria-label": l(e.lastAriaLabel),
          "aria-disabled": E
        } : void 0
      };
    });
    function _() {
      var E;
      const B = r.value - g.value;
      (E = A.value[B]) == null || E.$el.focus();
    }
    function O(B) {
      B.key === _l.left && !e.disabled && r.value > +e.start ? (r.value = r.value - 1, Ze(_)) : B.key === _l.right && !e.disabled && r.value < g.value + v.value - 1 && (r.value = r.value + 1, Ze(_));
    }
    return ve(() => w(e.tag, {
      ref: f,
      class: ["v-pagination", s.value, e.class],
      style: e.style,
      role: "navigation",
      "aria-label": l(e.ariaLabel),
      onKeydown: O,
      "data-test": "v-pagination-root"
    }, {
      default: () => [w("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && w("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [n.first ? n.first(z.value.first) : w(Xt, oe({
        _as: "VPaginationBtn"
      }, z.value.first), null)]), w("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [n.prev ? n.prev(z.value.prev) : w(Xt, oe({
        _as: "VPaginationBtn"
      }, z.value.prev), null)]), P.value.map((B, E) => w("li", {
        key: B.key,
        class: ["v-pagination__item", {
          "v-pagination__item--is-active": B.isActive
        }],
        "data-test": "v-pagination-item"
      }, [n.item ? n.item(B) : w(Xt, oe({
        _as: "VPaginationBtn"
      }, B.props), {
        default: () => [B.page]
      })])), w("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [n.next ? n.next(z.value.next) : w(Xt, oe({
        _as: "VPaginationBtn"
      }, z.value.next), null)]), e.showFirstLastPage && w("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [n.last ? n.last(z.value.last) : w(Xt, oe({
        _as: "VPaginationBtn"
      }, z.value.last), null)])])]
    })), {};
  }
}), Gd = U({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function ot(e, t, n) {
  return se()({
    name: e,
    props: Gd({
      mode: n,
      origin: t
    }),
    setup(a, r) {
      let {
        slots: l
      } = r;
      const i = {
        onBeforeEnter(o) {
          a.origin && (o.style.transformOrigin = a.origin);
        },
        onLeave(o) {
          if (a.leaveAbsolute) {
            const {
              offsetTop: s,
              offsetLeft: c,
              offsetWidth: m,
              offsetHeight: f
            } = o;
            o._transitionInitialStyles = {
              position: o.style.position,
              top: o.style.top,
              left: o.style.left,
              width: o.style.width,
              height: o.style.height
            }, o.style.position = "absolute", o.style.top = `${s}px`, o.style.left = `${c}px`, o.style.width = `${m}px`, o.style.height = `${f}px`;
          }
          a.hideOnLeave && o.style.setProperty("display", "none", "important");
        },
        onAfterLeave(o) {
          if (a.leaveAbsolute && (o != null && o._transitionInitialStyles)) {
            const {
              position: s,
              top: c,
              left: m,
              width: f,
              height: v
            } = o._transitionInitialStyles;
            delete o._transitionInitialStyles, o.style.position = s || "", o.style.top = c || "", o.style.left = m || "", o.style.width = f || "", o.style.height = v || "";
          }
        }
      };
      return () => {
        const o = a.group ? dr : gn;
        return X0(o, {
          name: a.disabled ? "" : e,
          css: !a.disabled,
          ...a.group ? void 0 : {
            mode: a.mode
          },
          ...a.disabled ? {} : i
        }, l.default);
      };
    }
  });
}
function os(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return se()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean,
      group: Boolean
    },
    setup(a, r) {
      let {
        slots: l
      } = r;
      const i = a.group ? dr : gn;
      return () => X0(i, {
        name: a.disabled ? "" : e,
        css: !a.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...a.disabled ? {} : t
      }, l.default);
    }
  });
}
function ss() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", a = Bi(`offset-${n}`);
  return {
    onBeforeEnter(i) {
      i._parent = i.parentNode, i._initialStyle = {
        transition: i.style.transition,
        overflow: i.style.overflow,
        [n]: i.style[n]
      };
    },
    onEnter(i) {
      const o = i._initialStyle;
      i.style.setProperty("transition", "none", "important"), i.style.overflow = "hidden";
      const s = `${i[a]}px`;
      i.style[n] = "0", i.offsetHeight, i.style.transition = o.transition, e && i._parent && i._parent.classList.add(e), requestAnimationFrame(() => {
        i.style[n] = s;
      });
    },
    onAfterEnter: l,
    onEnterCancelled: l,
    onLeave(i) {
      i._initialStyle = {
        transition: "",
        overflow: i.style.overflow,
        [n]: i.style[n]
      }, i.style.overflow = "hidden", i.style[n] = `${i[a]}px`, i.offsetHeight, requestAnimationFrame(() => i.style[n] = "0");
    },
    onAfterLeave: r,
    onLeaveCancelled: r
  };
  function r(i) {
    e && i._parent && i._parent.classList.remove(e), l(i);
  }
  function l(i) {
    const o = i._initialStyle[n];
    i.style.overflow = i._initialStyle.overflow, o != null && (i.style[n] = o), delete i._initialStyle;
  }
}
const Wd = U({
  target: [Object, Array]
}, "v-dialog-transition"), us = se()({
  name: "VDialogTransition",
  props: Wd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = {
      onBeforeEnter(r) {
        r.style.pointerEvents = "none", r.style.visibility = "hidden";
      },
      async onEnter(r, l) {
        var v;
        await new Promise((g) => requestAnimationFrame(g)), await new Promise((g) => requestAnimationFrame(g)), r.style.visibility = "";
        const {
          x: i,
          y: o,
          sx: s,
          sy: c,
          speed: m
        } = ci(e.target, r), f = An(r, [{
          transform: `translate(${i}px, ${o}px) scale(${s}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * m,
          easing: rd
        });
        (v = ui(r)) == null || v.forEach((g) => {
          An(g, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * m,
            easing: H0
          });
        }), f.finished.then(() => l());
      },
      onAfterEnter(r) {
        r.style.removeProperty("pointer-events");
      },
      onBeforeLeave(r) {
        r.style.pointerEvents = "none";
      },
      async onLeave(r, l) {
        var v;
        await new Promise((g) => requestAnimationFrame(g));
        const {
          x: i,
          y: o,
          sx: s,
          sy: c,
          speed: m
        } = ci(e.target, r);
        An(r, [{}, {
          transform: `translate(${i}px, ${o}px) scale(${s}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * m,
          easing: ld
        }).finished.then(() => l()), (v = ui(r)) == null || v.forEach((g) => {
          An(g, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * m,
            easing: H0
          });
        });
      },
      onAfterLeave(r) {
        r.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? w(gn, oe({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), n) : w(gn, {
      name: "dialog-transition"
    }, n);
  }
});
function ui(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function ci(e, t) {
  const n = Ro(e), a = Or(t), [r, l] = getComputedStyle(t).transformOrigin.split(" ").map((S) => parseFloat(S)), [i, o] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let s = n.left + n.width / 2;
  i === "left" || o === "left" ? s -= n.width / 2 : (i === "right" || o === "right") && (s += n.width / 2);
  let c = n.top + n.height / 2;
  i === "top" || o === "top" ? c -= n.height / 2 : (i === "bottom" || o === "bottom") && (c += n.height / 2);
  const m = n.width / a.width, f = n.height / a.height, v = Math.max(1, m, f), g = m / v || 0, p = f / v || 0, b = a.width * a.height / (window.innerWidth * window.innerHeight), x = b > 0.12 ? Math.min(1.5, (b - 0.12) * 10 + 1) : 1;
  return {
    x: s - (r + a.left),
    y: c - (l + a.top),
    sx: g,
    sy: p,
    speed: x
  };
}
ot("fab-transition", "center center", "out-in");
ot("dialog-bottom-transition");
ot("dialog-top-transition");
const di = ot("fade-transition");
ot("scale-transition");
ot("scroll-x-transition");
ot("scroll-x-reverse-transition");
ot("scroll-y-transition");
ot("scroll-y-reverse-transition");
ot("slide-x-transition");
ot("slide-x-reverse-transition");
const cs = ot("slide-y-transition");
ot("slide-y-reverse-transition");
const jd = os("expand-transition", ss()), ds = os("expand-x-transition", ss("", !0));
function Ud(e) {
  return {
    aspectStyles: M(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const ms = U({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...we(),
  ...Gt()
}, "VResponsive"), mi = se()({
  name: "VResponsive",
  props: ms(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: a
    } = Ud(e), {
      dimensionStyles: r
    } = Wt(e);
    return ve(() => {
      var l;
      return w("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [r.value, e.style]
      }, [w("div", {
        class: "v-responsive__sizer",
        style: a.value
      }, null), (l = n.additional) == null ? void 0 : l.call(n), n.default && w("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), u0 = U({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Qt = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: a,
    disabled: r,
    group: l,
    ...i
  } = e, {
    component: o = l ? dr : gn,
    ...s
  } = typeof a == "object" ? a : {};
  return X0(o, oe(typeof a == "string" ? {
    name: r ? "" : a
  } : s, typeof a == "string" ? {} : Object.fromEntries(Object.entries({
    disabled: r,
    group: l
  }).filter((c) => {
    let [m, f] = c;
    return f !== void 0;
  })), i), n);
};
function Yd(e, t) {
  if (!Vr) return;
  const n = t.modifiers || {}, a = t.value, {
    handler: r,
    options: l
  } = typeof a == "object" ? a : {
    handler: a,
    options: {}
  }, i = new IntersectionObserver(function() {
    var f;
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 ? arguments[1] : void 0;
    const c = (f = e._observe) == null ? void 0 : f[t.instance.$.uid];
    if (!c) return;
    const m = o.some((v) => v.isIntersecting);
    r && (!n.quiet || c.init) && (!n.once || m || c.init) && r(m, o, s), m && n.once ? hs(e, t) : c.init = !0;
  }, l);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: i
  }, i.observe(e);
}
function hs(e, t) {
  var a;
  const n = (a = e._observe) == null ? void 0 : a[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const fs = {
  mounted: Yd,
  unmounted: hs
}, Kd = U({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...ms(),
  ...we(),
  ...pt(),
  ...u0()
}, "VImg"), Xd = se()({
  name: "VImg",
  directives: {
    intersect: fs
  },
  props: Kd(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const {
      backgroundColorClasses: r,
      backgroundColorStyles: l
    } = St(J(e, "color")), {
      roundedClasses: i
    } = Pt(e), o = _e("VImg"), s = pe(""), c = ae(), m = pe(e.eager ? "loading" : "idle"), f = pe(), v = pe(), g = M(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), p = M(() => g.value.aspect || f.value / v.value || 0);
    ge(() => e.src, () => {
      b(m.value !== "idle");
    }), ge(p, (L, D) => {
      !L && D && c.value && P(c.value);
    }), zi(() => b());
    function b(L) {
      if (!(e.eager && L) && !(Vr && !L && !e.eager)) {
        if (m.value = "loading", g.value.lazySrc) {
          const D = new Image();
          D.src = g.value.lazySrc, P(D, null);
        }
        g.value.src && Ze(() => {
          var D;
          n("loadstart", ((D = c.value) == null ? void 0 : D.currentSrc) || g.value.src), setTimeout(() => {
            var $;
            if (!o.isUnmounted)
              if (($ = c.value) != null && $.complete) {
                if (c.value.naturalWidth || S(), m.value === "error") return;
                p.value || P(c.value, null), m.value === "loading" && x();
              } else
                p.value || P(c.value), A();
          });
        });
      }
    }
    function x() {
      var L;
      o.isUnmounted || (A(), P(c.value), m.value = "loaded", n("load", ((L = c.value) == null ? void 0 : L.currentSrc) || g.value.src));
    }
    function S() {
      var L;
      o.isUnmounted || (m.value = "error", n("error", ((L = c.value) == null ? void 0 : L.currentSrc) || g.value.src));
    }
    function A() {
      const L = c.value;
      L && (s.value = L.currentSrc || L.src);
    }
    let V = -1;
    Ct(() => {
      clearTimeout(V);
    });
    function P(L) {
      let D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const $ = () => {
        if (clearTimeout(V), o.isUnmounted) return;
        const {
          naturalHeight: Z,
          naturalWidth: te
        } = L;
        Z || te ? (f.value = te, v.value = Z) : !L.complete && m.value === "loading" && D != null ? V = window.setTimeout($, D) : (L.currentSrc.endsWith(".svg") || L.currentSrc.startsWith("data:image/svg+xml")) && (f.value = 1, v.value = 1);
      };
      $();
    }
    const z = M(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), _ = () => {
      var $;
      if (!g.value.src || m.value === "idle") return null;
      const L = w("img", {
        class: ["v-img__img", z.value],
        style: {
          objectPosition: e.position
        },
        src: g.value.src,
        srcset: g.value.srcset,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: c,
        onLoad: x,
        onError: S
      }, null), D = ($ = a.sources) == null ? void 0 : $.call(a);
      return w(Qt, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [dt(D ? w("picture", {
          class: "v-img__picture"
        }, [D, L]) : L, [[En, m.value === "loaded"]])]
      });
    }, O = () => w(Qt, {
      transition: e.transition
    }, {
      default: () => [g.value.lazySrc && m.value !== "loaded" && w("img", {
        class: ["v-img__img", "v-img__img--preload", z.value],
        style: {
          objectPosition: e.position
        },
        src: g.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), B = () => a.placeholder ? w(Qt, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(m.value === "loading" || m.value === "error" && !a.error) && w("div", {
        class: "v-img__placeholder"
      }, [a.placeholder()])]
    }) : null, E = () => a.error ? w(Qt, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [m.value === "error" && w("div", {
        class: "v-img__error"
      }, [a.error()])]
    }) : null, j = () => e.gradient ? w("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, F = pe(!1);
    {
      const L = ge(p, (D) => {
        D && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            F.value = !0;
          });
        }), L());
      });
    }
    return ve(() => {
      const L = mi.filterProps(e);
      return dt(w(mi, oe({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !F.value
        }, r.value, i.value, e.class],
        style: [{
          width: ce(e.width === "auto" ? f.value : e.width)
        }, l.value, e.style]
      }, L, {
        aspectRatio: p.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => w(Te, null, [w(_, null, null), w(O, null, null), w(j, null, null), w(B, null, null), w(E, null, null)]),
        default: a.default
      }), [[Vn("intersect"), {
        handler: b,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: s,
      image: c,
      state: m,
      naturalWidth: f,
      naturalHeight: v
    };
  }
}), Zd = U({
  start: Boolean,
  end: Boolean,
  icon: be,
  image: String,
  text: String,
  ...on(),
  ...we(),
  ...zt(),
  ...pt(),
  ...Nn(),
  ...We(),
  ...qe(),
  ...sn({
    variant: "flat"
  })
}, "VAvatar"), t0 = se()({
  name: "VAvatar",
  props: Zd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ue(e), {
      borderClasses: r
    } = xn(e), {
      colorClasses: l,
      colorStyles: i,
      variantClasses: o
    } = oa(e), {
      densityClasses: s
    } = jt(e), {
      roundedClasses: c
    } = Pt(e), {
      sizeClasses: m,
      sizeStyles: f
    } = s0(e);
    return ve(() => w(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, a.value, r.value, l.value, s.value, c.value, m.value, o.value, e.class],
      style: [i.value, f.value, e.style]
    }, {
      default: () => [n.default ? w(tt, {
        key: "content-defaults",
        defaults: {
          VImg: {
            cover: !0,
            src: e.image
          },
          VIcon: {
            icon: e.icon
          }
        }
      }, {
        default: () => [n.default()]
      }) : e.image ? w(Xd, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? w(He, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, ia(!1, "v-avatar")]
    })), {};
  }
}), Qd = U({
  text: String,
  onClick: je(),
  ...we(),
  ...qe()
}, "VLabel"), vs = se()({
  name: "VLabel",
  props: Qd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => {
      var a;
      return w("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), gs = Symbol.for("vuetify:selection-control-group"), ps = U({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: be,
  trueIcon: be,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: rn
  },
  ...we(),
  ...zt(),
  ...qe()
}, "SelectionControlGroup"), Jd = U({
  ...ps({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
se()({
  name: "VSelectionControlGroup",
  props: Jd(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Be(e, "modelValue"), r = $t(), l = M(() => e.id || `v-selection-control-group-${r}`), i = M(() => e.name || l.value), o = /* @__PURE__ */ new Set();
    return Ge(gs, {
      modelValue: a,
      forceUpdate: () => {
        o.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        o.add(s), nt(() => {
          o.delete(s);
        });
      }
    }), nn({
      [e.defaultsTarget]: {
        color: J(e, "color"),
        disabled: J(e, "disabled"),
        density: J(e, "density"),
        error: J(e, "error"),
        inline: J(e, "inline"),
        modelValue: a,
        multiple: M(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)),
        name: i,
        falseIcon: J(e, "falseIcon"),
        trueIcon: J(e, "trueIcon"),
        readonly: J(e, "readonly"),
        ripple: J(e, "ripple"),
        type: J(e, "type"),
        valueComparator: J(e, "valueComparator")
      }
    }), ve(() => {
      var s;
      return w("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(s = n.default) == null ? void 0 : s.call(n)]);
    }), {};
  }
});
const ys = U({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...we(),
  ...ps()
}, "VSelectionControl");
function e4(e) {
  const t = Ve(gs, void 0), {
    densityClasses: n
  } = jt(e), a = Be(e, "modelValue"), r = M(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), l = M(() => e.falseValue !== void 0 ? e.falseValue : !1), i = M(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), o = M({
    get() {
      const g = t ? t.modelValue.value : a.value;
      return i.value ? Ye(g).some((p) => e.valueComparator(p, r.value)) : e.valueComparator(g, r.value);
    },
    set(g) {
      if (e.readonly) return;
      const p = g ? r.value : l.value;
      let b = p;
      i.value && (b = g ? [...Ye(a.value), p] : Ye(a.value).filter((x) => !e.valueComparator(x, r.value))), t ? t.modelValue.value = b : a.value = b;
    }
  }), {
    textColorClasses: s,
    textColorStyles: c
  } = qt(M(() => {
    if (!(e.error || e.disabled))
      return o.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: m,
    backgroundColorStyles: f
  } = St(M(() => o.value && !e.error && !e.disabled ? e.color : e.baseColor)), v = M(() => o.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: r,
    falseValue: l,
    model: o,
    textColorClasses: s,
    textColorStyles: c,
    backgroundColorClasses: m,
    backgroundColorStyles: f,
    icon: v
  };
}
const hi = se()({
  name: "VSelectionControl",
  directives: {
    Ripple: ua
  },
  inheritAttrs: !1,
  props: ys(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      group: r,
      densityClasses: l,
      icon: i,
      model: o,
      textColorClasses: s,
      textColorStyles: c,
      backgroundColorClasses: m,
      backgroundColorStyles: f,
      trueValue: v
    } = e4(e), g = $t(), p = pe(!1), b = pe(!1), x = ae(), S = M(() => e.id || `input-${g}`), A = M(() => !e.disabled && !e.readonly);
    r == null || r.onForceUpdate(() => {
      x.value && (x.value.checked = o.value);
    });
    function V(O) {
      A.value && (p.value = !0, F0(O.target, ":focus-visible") !== !1 && (b.value = !0));
    }
    function P() {
      p.value = !1, b.value = !1;
    }
    function z(O) {
      O.stopPropagation();
    }
    function _(O) {
      if (!A.value) {
        x.value && (x.value.checked = o.value);
        return;
      }
      e.readonly && r && Ze(() => r.forceUpdate()), o.value = O.target.checked;
    }
    return ve(() => {
      var F, L;
      const O = a.label ? a.label({
        label: e.label,
        props: {
          for: S.value
        }
      }) : e.label, [B, E] = Po(n), j = w("input", oe({
        ref: x,
        checked: o.value,
        disabled: !!e.disabled,
        id: S.value,
        onBlur: P,
        onFocus: V,
        onInput: _,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: v.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? o.value : void 0
      }, E), null);
      return w("div", oe({
        class: ["v-selection-control", {
          "v-selection-control--dirty": o.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": p.value,
          "v-selection-control--focus-visible": b.value,
          "v-selection-control--inline": e.inline
        }, l.value, e.class]
      }, B, {
        style: e.style
      }), [w("div", {
        class: ["v-selection-control__wrapper", s.value],
        style: c.value
      }, [(F = a.default) == null ? void 0 : F.call(a, {
        backgroundColorClasses: m,
        backgroundColorStyles: f
      }), dt(w("div", {
        class: ["v-selection-control__input"]
      }, [((L = a.input) == null ? void 0 : L.call(a, {
        model: o,
        textColorClasses: s,
        textColorStyles: c,
        backgroundColorClasses: m,
        backgroundColorStyles: f,
        inputNode: j,
        icon: i.value,
        props: {
          onFocus: V,
          onBlur: P,
          id: S.value
        }
      })) ?? w(Te, null, [i.value && w(He, {
        key: "icon",
        icon: i.value
      }, null), j])]), [[Vn("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), O && w(vs, {
        for: S.value,
        onClick: z
      }, {
        default: () => [O]
      })]);
    }), {
      isFocused: p,
      input: x
    };
  }
}), t4 = U({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: be,
    default: "$checkboxIndeterminate"
  },
  ...ys({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), ca = se()({
  name: "VCheckboxBtn",
  props: t4(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Be(e, "indeterminate"), r = Be(e, "modelValue");
    function l(s) {
      a.value && (a.value = !1);
    }
    const i = M(() => a.value ? e.indeterminateIcon : e.falseIcon), o = M(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return ve(() => {
      const s = Ln(hi.filterProps(e), ["modelValue"]);
      return w(hi, oe(s, {
        modelValue: r.value,
        "onUpdate:modelValue": [(c) => r.value = c, l],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: i.value,
        trueIcon: o.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), n);
    }), {};
  }
});
function bs(e) {
  const {
    t
  } = ln();
  function n(a) {
    let {
      name: r
    } = a;
    const l = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[r], i = e[`onClick:${r}`], o = i && l ? t(`$vuetify.input.${l}`, e.label ?? "") : void 0;
    return w(He, {
      icon: e[`${r}Icon`],
      "aria-label": o,
      onClick: i
    }, null);
  }
  return {
    InputIcon: n
  };
}
const n4 = U({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...we(),
  ...u0({
    transition: {
      component: cs,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), a4 = se()({
  name: "VMessages",
  props: n4(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = M(() => Ye(e.messages)), {
      textColorClasses: r,
      textColorStyles: l
    } = qt(M(() => e.color));
    return ve(() => w(Qt, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", r.value, e.class],
      style: [l.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && a.value.map((i, o) => w("div", {
        class: "v-messages__message",
        key: `${o}-${a.value}`
      }, [n.message ? n.message({
        message: i
      }) : i]))]
    })), {};
  }
}), xs = U({
  focused: Boolean,
  "onUpdate:focused": je()
}, "focus");
function ws(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt();
  const n = Be(e, "focused"), a = M(() => ({
    [`${t}--focused`]: n.value
  }));
  function r() {
    n.value = !0;
  }
  function l() {
    n.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: n,
    focus: r,
    blur: l
  };
}
const r4 = Symbol.for("vuetify:form");
function Ss() {
  return Ve(r4, null);
}
const l4 = U({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...xs()
}, "validation");
function i4(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Bt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $t();
  const a = Be(e, "modelValue"), r = M(() => e.validationValue === void 0 ? a.value : e.validationValue), l = Ss(), i = ae([]), o = pe(!0), s = M(() => !!(Ye(a.value === "" ? null : a.value).length || Ye(r.value === "" ? null : r.value).length)), c = M(() => !!(e.disabled ?? (l == null ? void 0 : l.isDisabled.value))), m = M(() => !!(e.readonly ?? (l == null ? void 0 : l.isReadonly.value))), f = M(() => {
    var z;
    return (z = e.errorMessages) != null && z.length ? Ye(e.errorMessages).concat(i.value).slice(0, Math.max(0, +e.maxErrors)) : i.value;
  }), v = M(() => {
    let z = (e.validateOn ?? (l == null ? void 0 : l.validateOn.value)) || "input";
    z === "lazy" && (z = "input lazy"), z === "eager" && (z = "input eager");
    const _ = new Set((z == null ? void 0 : z.split(" ")) ?? []);
    return {
      input: _.has("input"),
      blur: _.has("blur") || _.has("input") || _.has("invalid-input"),
      invalidInput: _.has("invalid-input"),
      lazy: _.has("lazy"),
      eager: _.has("eager")
    };
  }), g = M(() => {
    var z;
    return e.error || (z = e.errorMessages) != null && z.length ? !1 : e.rules.length ? o.value ? i.value.length || v.value.lazy ? null : !0 : !i.value.length : !0;
  }), p = pe(!1), b = M(() => ({
    [`${t}--error`]: g.value === !1,
    [`${t}--dirty`]: s.value,
    [`${t}--disabled`]: c.value,
    [`${t}--readonly`]: m.value
  })), x = _e("validation"), S = M(() => e.name ?? De(n));
  zi(() => {
    l == null || l.register({
      id: S.value,
      vm: x,
      validate: P,
      reset: A,
      resetValidation: V
    });
  }), Ct(() => {
    l == null || l.unregister(S.value);
  }), Pn(async () => {
    v.value.lazy || await P(!v.value.eager), l == null || l.update(S.value, g.value, f.value);
  }), pn(() => v.value.input || v.value.invalidInput && g.value === !1, () => {
    ge(r, () => {
      if (r.value != null)
        P();
      else if (e.focused) {
        const z = ge(() => e.focused, (_) => {
          _ || P(), z();
        });
      }
    });
  }), pn(() => v.value.blur, () => {
    ge(() => e.focused, (z) => {
      z || P();
    });
  }), ge([g, f], () => {
    l == null || l.update(S.value, g.value, f.value);
  });
  async function A() {
    a.value = null, await Ze(), await V();
  }
  async function V() {
    o.value = !0, v.value.lazy ? i.value = [] : await P(!v.value.eager);
  }
  async function P() {
    let z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const _ = [];
    p.value = !0;
    for (const O of e.rules) {
      if (_.length >= +(e.maxErrors ?? 1))
        break;
      const E = await (typeof O == "function" ? O : () => O)(r.value);
      if (E !== !0) {
        if (E !== !1 && typeof E != "string") {
          console.warn(`${E} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        _.push(E || "");
      }
    }
    return i.value = _, p.value = !1, o.value = z, i.value;
  }
  return {
    errorMessages: f,
    isDirty: s,
    isDisabled: c,
    isReadonly: m,
    isPristine: o,
    isValid: g,
    isValidating: p,
    reset: A,
    resetValidation: V,
    validate: P,
    validationClasses: b
  };
}
const ks = U({
  id: String,
  appendIcon: be,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: be,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  "onClick:prepend": je(),
  "onClick:append": je(),
  ...we(),
  ...zt(),
  ...z1(Gt(), ["maxWidth", "minWidth", "width"]),
  ...qe(),
  ...l4()
}, "VInput"), fi = se()({
  name: "VInput",
  props: {
    ...ks()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: r
    } = t;
    const {
      densityClasses: l
    } = jt(e), {
      dimensionStyles: i
    } = Wt(e), {
      themeClasses: o
    } = Ue(e), {
      rtlClasses: s
    } = It(), {
      InputIcon: c
    } = bs(e), m = $t(), f = M(() => e.id || `input-${m}`), v = M(() => `${f.value}-messages`), {
      errorMessages: g,
      isDirty: p,
      isDisabled: b,
      isReadonly: x,
      isPristine: S,
      isValid: A,
      isValidating: V,
      reset: P,
      resetValidation: z,
      validate: _,
      validationClasses: O
    } = i4(e, "v-input", f), B = M(() => ({
      id: f,
      messagesId: v,
      isDirty: p,
      isDisabled: b,
      isReadonly: x,
      isPristine: S,
      isValid: A,
      isValidating: V,
      reset: P,
      resetValidation: z,
      validate: _
    })), E = M(() => {
      var j;
      return (j = e.errorMessages) != null && j.length || !S.value && g.value.length ? g.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ve(() => {
      var $, Z, te, de;
      const j = !!(a.prepend || e.prependIcon), F = !!(a.append || e.appendIcon), L = E.value.length > 0, D = !e.hideDetails || e.hideDetails === "auto" && (L || !!a.details);
      return w("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, l.value, o.value, s.value, O.value, e.class],
        style: [i.value, e.style]
      }, [j && w("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [($ = a.prepend) == null ? void 0 : $.call(a, B.value), e.prependIcon && w(c, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), a.default && w("div", {
        class: "v-input__control"
      }, [(Z = a.default) == null ? void 0 : Z.call(a, B.value)]), F && w("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && w(c, {
        key: "append-icon",
        name: "append"
      }, null), (te = a.append) == null ? void 0 : te.call(a, B.value)]), D && w("div", {
        class: "v-input__details"
      }, [w(a4, {
        id: v.value,
        active: L,
        messages: E.value
      }, {
        message: a.message
      }), (de = a.details) == null ? void 0 : de.call(a, B.value)])]);
    }), {
      reset: P,
      resetValidation: z,
      validate: _,
      isValid: A,
      errorMessages: g
    };
  }
});
function o4(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: a,
    isHorizontal: r
  } = e;
  const l = n0(r, n), i = Cs(r, a, n), o = n0(r, t), s = As(r, t), c = o * 0.4;
  return i > s ? s - c : i + l < s + o ? s - l + o + c : i;
}
function s4(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: a
  } = e;
  const r = n0(a, n), l = As(a, t), i = n0(a, t);
  return l - r / 2 + i / 2;
}
function vi(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function u4(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Cs(e, t, n) {
  if (!n)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: r,
    scrollWidth: l
  } = n;
  return e ? t ? l - r + a : a : n.scrollTop;
}
function n0(e, t) {
  const n = e ? "offsetWidth" : "offsetHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function As(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const c4 = Symbol.for("vuetify:v-slide-group"), Ms = U({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: c4
  },
  nextIcon: {
    type: be,
    default: "$next"
  },
  prevIcon: {
    type: be,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...we(),
  ...la({
    mobile: null
  }),
  ...We(),
  ...Dr({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), gi = se()({
  name: "VSlideGroup",
  props: Ms(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: a
    } = It(), {
      displayClasses: r,
      mobile: l
    } = bn(e), i = Fr(e, e.symbol), o = pe(!1), s = pe(0), c = pe(0), m = pe(0), f = M(() => e.direction === "horizontal"), {
      resizeRef: v,
      contentRect: g
    } = zn(), {
      resizeRef: p,
      contentRect: b
    } = zn(), x = Fd(), S = M(() => ({
      container: v.el,
      duration: 200,
      easing: "easeOutQuart"
    })), A = M(() => i.selected.value.length ? i.items.value.findIndex((N) => N.id === i.selected.value[0]) : -1), V = M(() => i.selected.value.length ? i.items.value.findIndex((N) => N.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if ($e) {
      let N = -1;
      ge(() => [i.selected.value, g.value, b.value, f.value], () => {
        cancelAnimationFrame(N), N = requestAnimationFrame(() => {
          if (g.value && b.value) {
            const H = f.value ? "width" : "height";
            c.value = g.value[H], m.value = b.value[H], o.value = c.value + 1 < m.value;
          }
          if (A.value >= 0 && p.el) {
            const H = p.el.children[V.value];
            z(H, e.centerActive);
          }
        });
      });
    }
    const P = pe(!1);
    function z(N, H) {
      let Y = 0;
      H ? Y = s4({
        containerElement: v.el,
        isHorizontal: f.value,
        selectedElement: N
      }) : Y = o4({
        containerElement: v.el,
        isHorizontal: f.value,
        isRtl: a.value,
        selectedElement: N
      }), _(Y);
    }
    function _(N) {
      if (!$e || !v.el) return;
      const H = n0(f.value, v.el), Y = Cs(f.value, a.value, v.el);
      if (!(vi(f.value, v.el) <= H || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(N - Y) < 16)) {
        if (f.value && a.value && v.el) {
          const {
            scrollWidth: re,
            offsetWidth: Se
          } = v.el;
          N = re - Se - N;
        }
        f.value ? x.horizontal(N, S.value) : x(N, S.value);
      }
    }
    function O(N) {
      const {
        scrollTop: H,
        scrollLeft: Y
      } = N.target;
      s.value = f.value ? Y : H;
    }
    function B(N) {
      if (P.value = !0, !(!o.value || !p.el)) {
        for (const H of N.composedPath())
          for (const Y of p.el.children)
            if (Y === H) {
              z(Y);
              return;
            }
      }
    }
    function E(N) {
      P.value = !1;
    }
    let j = !1;
    function F(N) {
      var H;
      !j && !P.value && !(N.relatedTarget && ((H = p.el) != null && H.contains(N.relatedTarget))) && $(), j = !1;
    }
    function L() {
      j = !0;
    }
    function D(N) {
      if (!p.el) return;
      function H(Y) {
        N.preventDefault(), $(Y);
      }
      f.value ? N.key === "ArrowRight" ? H(a.value ? "prev" : "next") : N.key === "ArrowLeft" && H(a.value ? "next" : "prev") : N.key === "ArrowDown" ? H("next") : N.key === "ArrowUp" && H("prev"), N.key === "Home" ? H("first") : N.key === "End" && H("last");
    }
    function $(N) {
      var Y, ye;
      if (!p.el) return;
      let H;
      if (!N)
        H = D0(p.el)[0];
      else if (N === "next") {
        if (H = (Y = p.el.querySelector(":focus")) == null ? void 0 : Y.nextElementSibling, !H) return $("first");
      } else if (N === "prev") {
        if (H = (ye = p.el.querySelector(":focus")) == null ? void 0 : ye.previousElementSibling, !H) return $("last");
      } else N === "first" ? H = p.el.firstElementChild : N === "last" && (H = p.el.lastElementChild);
      H && H.focus({
        preventScroll: !0
      });
    }
    function Z(N) {
      const H = f.value && a.value ? -1 : 1, Y = (N === "prev" ? -H : H) * c.value;
      let ye = s.value + Y;
      if (f.value && a.value && v.el) {
        const {
          scrollWidth: re,
          offsetWidth: Se
        } = v.el;
        ye += re - Se;
      }
      _(ye);
    }
    const te = M(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), de = M(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !l.value;
        case !0:
          return o.value || Math.abs(s.value) > 0;
        case "mobile":
          return l.value || o.value || Math.abs(s.value) > 0;
        default:
          return !l.value && (o.value || Math.abs(s.value) > 0);
      }
    }), me = M(() => Math.abs(s.value) > 1), R = M(() => {
      if (!v.value) return !1;
      const N = vi(f.value, v.el), H = u4(f.value, v.el);
      return N - H - Math.abs(s.value) > 1;
    });
    return ve(() => w(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !f.value,
        "v-slide-group--has-affixes": de.value,
        "v-slide-group--is-overflowing": o.value
      }, r.value, e.class],
      style: e.style,
      tabindex: P.value || i.selected.value.length ? -1 : 0,
      onFocus: F
    }, {
      default: () => {
        var N, H, Y;
        return [de.value && w("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !me.value
          }],
          onMousedown: L,
          onClick: () => me.value && Z("prev")
        }, [((N = n.prev) == null ? void 0 : N.call(n, te.value)) ?? w(di, null, {
          default: () => [w(He, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), w("div", {
          key: "container",
          ref: v,
          class: "v-slide-group__container",
          onScroll: O
        }, [w("div", {
          ref: p,
          class: "v-slide-group__content",
          onFocusin: B,
          onFocusout: E,
          onKeydown: D
        }, [(H = n.default) == null ? void 0 : H.call(n, te.value)])]), de.value && w("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !R.value
          }],
          onMousedown: L,
          onClick: () => R.value && Z("next")
        }, [((Y = n.next) == null ? void 0 : Y.call(n, te.value)) ?? w(di, null, {
          default: () => [w(He, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: Z,
      scrollOffset: s,
      focus: $,
      hasPrev: me,
      hasNext: R
    };
  }
}), Ts = Symbol.for("vuetify:v-chip-group"), d4 = U({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: rn
  },
  ...Ms(),
  ...we(),
  ...Dr({
    selectedClass: "v-chip--selected"
  }),
  ...We(),
  ...qe(),
  ...sn({
    variant: "tonal"
  })
}, "VChipGroup");
se()({
  name: "VChipGroup",
  props: d4(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ue(e), {
      isSelected: r,
      select: l,
      next: i,
      prev: o,
      selected: s
    } = Fr(e, Ts);
    return nn({
      VChip: {
        color: J(e, "color"),
        disabled: J(e, "disabled"),
        filter: J(e, "filter"),
        variant: J(e, "variant")
      }
    }), ve(() => {
      const c = gi.filterProps(e);
      return w(gi, oe(c, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var m;
          return [(m = n.default) == null ? void 0 : m.call(n, {
            isSelected: r,
            select: l,
            next: i,
            prev: o,
            selected: s.value
          })];
        }
      });
    }), {};
  }
});
const m4 = U({
  activeClass: String,
  appendAvatar: String,
  appendIcon: be,
  closable: Boolean,
  closeIcon: {
    type: be,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: be,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: je(),
  onClickOnce: je(),
  ...on(),
  ...we(),
  ...zt(),
  ...wn(),
  ...Wo(),
  ...pt(),
  ...jr(),
  ...Nn(),
  ...We({
    tag: "span"
  }),
  ...qe(),
  ...sn({
    variant: "tonal"
  })
}, "VChip"), Bs = se()({
  name: "VChip",
  directives: {
    Ripple: ua
  },
  props: m4(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: r
    } = t;
    const {
      t: l
    } = ln(), {
      borderClasses: i
    } = xn(e), {
      colorClasses: o,
      colorStyles: s,
      variantClasses: c
    } = oa(e), {
      densityClasses: m
    } = jt(e), {
      elevationClasses: f
    } = Rn(e), {
      roundedClasses: v
    } = Pt(e), {
      sizeClasses: g
    } = s0(e), {
      themeClasses: p
    } = Ue(e), b = Be(e, "modelValue"), x = jo(e, Ts, !1), S = Wr(e, n), A = M(() => e.link !== !1 && S.isLink.value), V = M(() => !e.disabled && e.link !== !1 && (!!x || e.link || S.isClickable.value)), P = M(() => ({
      "aria-label": l(e.closeLabel),
      onClick(O) {
        O.preventDefault(), O.stopPropagation(), b.value = !1, a("click:close", O);
      }
    }));
    function z(O) {
      var B;
      a("click", O), V.value && ((B = S.navigate) == null || B.call(S, O), x == null || x.toggle());
    }
    function _(O) {
      (O.key === "Enter" || O.key === " ") && (O.preventDefault(), z(O));
    }
    return () => {
      const O = S.isLink.value ? "a" : e.tag, B = !!(e.appendIcon || e.appendAvatar), E = !!(B || r.append), j = !!(r.close || e.closable), F = !!(r.filter || e.filter) && x, L = !!(e.prependIcon || e.prependAvatar), D = !!(L || r.prepend), $ = !x || x.isSelected.value;
      return b.value && dt(w(O, oe({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": V.value,
          "v-chip--filter": F,
          "v-chip--pill": e.pill
        }, p.value, i.value, $ ? o.value : void 0, m.value, f.value, v.value, g.value, c.value, x == null ? void 0 : x.selectedClass.value, e.class],
        style: [$ ? s.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: V.value ? 0 : void 0,
        onClick: z,
        onKeydown: V.value && !A.value && _
      }, S.linkProps), {
        default: () => {
          var Z;
          return [ia(V.value, "v-chip"), F && w(ds, {
            key: "filter"
          }, {
            default: () => [dt(w("div", {
              class: "v-chip__filter"
            }, [r.filter ? w(tt, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, r.filter) : w(He, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[En, x.isSelected.value]])]
          }), D && w("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [r.prepend ? w(tt, {
            key: "prepend-defaults",
            disabled: !L,
            defaults: {
              VAvatar: {
                image: e.prependAvatar,
                start: !0
              },
              VIcon: {
                icon: e.prependIcon,
                start: !0
              }
            }
          }, r.prepend) : w(Te, null, [e.prependIcon && w(He, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && w(t0, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), w("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((Z = r.default) == null ? void 0 : Z.call(r, {
            isSelected: x == null ? void 0 : x.isSelected.value,
            selectedClass: x == null ? void 0 : x.selectedClass.value,
            select: x == null ? void 0 : x.select,
            toggle: x == null ? void 0 : x.toggle,
            value: x == null ? void 0 : x.value.value,
            disabled: e.disabled
          })) ?? e.text]), E && w("div", {
            key: "append",
            class: "v-chip__append"
          }, [r.append ? w(tt, {
            key: "append-defaults",
            disabled: !B,
            defaults: {
              VAvatar: {
                end: !0,
                image: e.appendAvatar
              },
              VIcon: {
                end: !0,
                icon: e.appendIcon
              }
            }
          }, r.append) : w(Te, null, [e.appendIcon && w(He, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && w(t0, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), j && w("button", oe({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, P.value), [r.close ? w(tt, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, r.close) : w(He, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Vn("ripple"), V.value && e.ripple, null]]);
    };
  }
}), er = Symbol.for("vuetify:list");
function Is() {
  const e = Ve(er, {
    hasPrepend: pe(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: pe(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return Ge(er, t), e;
}
function zs() {
  return Ve(er, null);
}
const Yr = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: a,
        value: r,
        activated: l
      } = n;
      return a = Ne(a), e && !r && l.size === 1 && l.has(a) || (r ? l.add(a) : l.delete(a)), l;
    },
    in: (n, a, r) => {
      let l = /* @__PURE__ */ new Set();
      if (n != null)
        for (const i of Ye(n))
          l = t.activate({
            id: i,
            value: !0,
            activated: new Set(l),
            children: a,
            parents: r
          });
      return l;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, Ps = (e) => {
  const t = Yr(e);
  return {
    activate: (a) => {
      let {
        activated: r,
        id: l,
        ...i
      } = a;
      l = Ne(l);
      const o = r.has(l) ? /* @__PURE__ */ new Set([l]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...i,
        id: l,
        activated: o
      });
    },
    in: (a, r, l) => {
      let i = /* @__PURE__ */ new Set();
      if (a != null) {
        const o = Ye(a);
        o.length && (i = t.in(o.slice(0, 1), r, l));
      }
      return i;
    },
    out: (a, r, l) => t.out(a, r, l)
  };
}, h4 = (e) => {
  const t = Yr(e);
  return {
    activate: (a) => {
      let {
        id: r,
        activated: l,
        children: i,
        ...o
      } = a;
      return r = Ne(r), i.has(r) ? l : t.activate({
        id: r,
        activated: l,
        children: i,
        ...o
      });
    },
    in: t.in,
    out: t.out
  };
}, f4 = (e) => {
  const t = Ps(e);
  return {
    activate: (a) => {
      let {
        id: r,
        activated: l,
        children: i,
        ...o
      } = a;
      return r = Ne(r), i.has(r) ? l : t.activate({
        id: r,
        activated: l,
        children: i,
        ...o
      });
    },
    in: t.in,
    out: t.out
  };
}, v4 = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: r
    } = e;
    if (n) {
      const l = /* @__PURE__ */ new Set();
      l.add(t);
      let i = r.get(t);
      for (; i != null; )
        l.add(i), i = r.get(i);
      return l;
    } else
      return a.delete(t), a;
  },
  select: () => null
}, Vs = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: r
    } = e;
    if (n) {
      let l = r.get(t);
      for (a.add(t); l != null && l !== t; )
        a.add(l), l = r.get(l);
      return a;
    } else
      a.delete(t);
    return a;
  },
  select: () => null
}, g4 = {
  open: Vs.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: r
    } = e;
    if (!n) return a;
    const l = [];
    let i = r.get(t);
    for (; i != null; )
      l.push(i), i = r.get(i);
    return new Set(l);
  }
}, Kr = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: r,
        selected: l
      } = n;
      if (a = Ne(a), e && !r) {
        const i = Array.from(l.entries()).reduce((o, s) => {
          let [c, m] = s;
          return m === "on" && o.push(c), o;
        }, []);
        if (i.length === 1 && i[0] === a) return l;
      }
      return l.set(a, r ? "on" : "off"), l;
    },
    in: (n, a, r) => {
      let l = /* @__PURE__ */ new Map();
      for (const i of n || [])
        l = t.select({
          id: i,
          value: !0,
          selected: new Map(l),
          children: a,
          parents: r
        });
      return l;
    },
    out: (n) => {
      const a = [];
      for (const [r, l] of n.entries())
        l === "on" && a.push(r);
      return a;
    }
  };
  return t;
}, Es = (e) => {
  const t = Kr(e);
  return {
    select: (a) => {
      let {
        selected: r,
        id: l,
        ...i
      } = a;
      l = Ne(l);
      const o = r.has(l) ? /* @__PURE__ */ new Map([[l, r.get(l)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...i,
        id: l,
        selected: o
      });
    },
    in: (a, r, l) => {
      let i = /* @__PURE__ */ new Map();
      return a != null && a.length && (i = t.in(a.slice(0, 1), r, l)), i;
    },
    out: (a, r, l) => t.out(a, r, l)
  };
}, p4 = (e) => {
  const t = Kr(e);
  return {
    select: (a) => {
      let {
        id: r,
        selected: l,
        children: i,
        ...o
      } = a;
      return r = Ne(r), i.has(r) ? l : t.select({
        id: r,
        selected: l,
        children: i,
        ...o
      });
    },
    in: t.in,
    out: t.out
  };
}, y4 = (e) => {
  const t = Es(e);
  return {
    select: (a) => {
      let {
        id: r,
        selected: l,
        children: i,
        ...o
      } = a;
      return r = Ne(r), i.has(r) ? l : t.select({
        id: r,
        selected: l,
        children: i,
        ...o
      });
    },
    in: t.in,
    out: t.out
  };
}, b4 = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: r,
        selected: l,
        children: i,
        parents: o
      } = n;
      a = Ne(a);
      const s = new Map(l), c = [a];
      for (; c.length; ) {
        const f = c.shift();
        l.set(Ne(f), r ? "on" : "off"), i.has(f) && c.push(...i.get(f));
      }
      let m = Ne(o.get(a));
      for (; m; ) {
        const f = i.get(m), v = f.every((p) => l.get(Ne(p)) === "on"), g = f.every((p) => !l.has(Ne(p)) || l.get(Ne(p)) === "off");
        l.set(m, v ? "on" : g ? "off" : "indeterminate"), m = Ne(o.get(m));
      }
      return e && !r && Array.from(l.entries()).reduce((v, g) => {
        let [p, b] = g;
        return b === "on" && v.push(p), v;
      }, []).length === 0 ? s : l;
    },
    in: (n, a, r) => {
      let l = /* @__PURE__ */ new Map();
      for (const i of n || [])
        l = t.select({
          id: i,
          value: !0,
          selected: new Map(l),
          children: a,
          parents: r
        });
      return l;
    },
    out: (n, a) => {
      const r = [];
      for (const [l, i] of n.entries())
        i === "on" && !a.has(l) && r.push(l);
      return r;
    }
  };
  return t;
}, a0 = Symbol.for("vuetify:nested"), Os = {
  id: pe(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ae(/* @__PURE__ */ new Map()),
    children: ae(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ae(!1),
    selectable: ae(!1),
    opened: ae(/* @__PURE__ */ new Set()),
    activated: ae(/* @__PURE__ */ new Set()),
    selected: ae(/* @__PURE__ */ new Map()),
    selectedValues: ae([]),
    getPath: () => []
  }
}, x4 = U({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested"), w4 = (e) => {
  let t = !1;
  const n = ae(/* @__PURE__ */ new Map()), a = ae(/* @__PURE__ */ new Map()), r = Be(e, "opened", e.opened, (p) => new Set(p), (p) => [...p.values()]), l = M(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    if (typeof e.activeStrategy == "function") return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return h4(e.mandatory);
      case "single-leaf":
        return f4(e.mandatory);
      case "independent":
        return Yr(e.mandatory);
      case "single-independent":
      default:
        return Ps(e.mandatory);
    }
  }), i = M(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    if (typeof e.selectStrategy == "function") return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return y4(e.mandatory);
      case "leaf":
        return p4(e.mandatory);
      case "independent":
        return Kr(e.mandatory);
      case "single-independent":
        return Es(e.mandatory);
      case "classic":
      default:
        return b4(e.mandatory);
    }
  }), o = M(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return g4;
      case "single":
        return v4;
      case "multiple":
      default:
        return Vs;
    }
  }), s = Be(e, "activated", e.activated, (p) => l.value.in(p, n.value, a.value), (p) => l.value.out(p, n.value, a.value)), c = Be(e, "selected", e.selected, (p) => i.value.in(p, n.value, a.value), (p) => i.value.out(p, n.value, a.value));
  Ct(() => {
    t = !0;
  });
  function m(p) {
    const b = [];
    let x = p;
    for (; x != null; )
      b.unshift(x), x = a.value.get(x);
    return b;
  }
  const f = _e("nested"), v = /* @__PURE__ */ new Set(), g = {
    id: pe(),
    root: {
      opened: r,
      activatable: J(e, "activatable"),
      selectable: J(e, "selectable"),
      activated: s,
      selected: c,
      selectedValues: M(() => {
        const p = [];
        for (const [b, x] of c.value.entries())
          x === "on" && p.push(b);
        return p;
      }),
      register: (p, b, x) => {
        if (v.has(p)) {
          const S = m(p).map(String).join(" -> "), A = m(b).concat(p).map(String).join(" -> ");
          _r(`Multiple nodes with the same ID
	${S}
	${A}`);
          return;
        } else
          v.add(p);
        b && p !== b && a.value.set(p, b), x && n.value.set(p, []), b != null && n.value.set(b, [...n.value.get(b) || [], p]);
      },
      unregister: (p) => {
        if (t) return;
        v.delete(p), n.value.delete(p);
        const b = a.value.get(p);
        if (b) {
          const x = n.value.get(b) ?? [];
          n.value.set(b, x.filter((S) => S !== p));
        }
        a.value.delete(p);
      },
      open: (p, b, x) => {
        f.emit("click:open", {
          id: p,
          value: b,
          path: m(p),
          event: x
        });
        const S = o.value.open({
          id: p,
          value: b,
          opened: new Set(r.value),
          children: n.value,
          parents: a.value,
          event: x
        });
        S && (r.value = S);
      },
      openOnSelect: (p, b, x) => {
        const S = o.value.select({
          id: p,
          value: b,
          selected: new Map(c.value),
          opened: new Set(r.value),
          children: n.value,
          parents: a.value,
          event: x
        });
        S && (r.value = S);
      },
      select: (p, b, x) => {
        f.emit("click:select", {
          id: p,
          value: b,
          path: m(p),
          event: x
        });
        const S = i.value.select({
          id: p,
          value: b,
          selected: new Map(c.value),
          children: n.value,
          parents: a.value,
          event: x
        });
        S && (c.value = S), g.root.openOnSelect(p, b, x);
      },
      activate: (p, b, x) => {
        if (!e.activatable)
          return g.root.select(p, !0, x);
        f.emit("click:activate", {
          id: p,
          value: b,
          path: m(p),
          event: x
        });
        const S = l.value.activate({
          id: p,
          value: b,
          activated: new Set(s.value),
          children: n.value,
          parents: a.value,
          event: x
        });
        S && (s.value = S);
      },
      children: n,
      parents: a,
      getPath: m
    }
  };
  return Ge(a0, g), g.root;
}, _s = (e, t) => {
  const n = Ve(a0, Os), a = Symbol($t()), r = M(() => e.value !== void 0 ? e.value : a), l = {
    ...n,
    id: r,
    open: (i, o) => n.root.open(r.value, i, o),
    openOnSelect: (i, o) => n.root.openOnSelect(r.value, i, o),
    isOpen: M(() => n.root.opened.value.has(r.value)),
    parent: M(() => n.root.parents.value.get(r.value)),
    activate: (i, o) => n.root.activate(r.value, i, o),
    isActivated: M(() => n.root.activated.value.has(Ne(r.value))),
    select: (i, o) => n.root.select(r.value, i, o),
    isSelected: M(() => n.root.selected.value.get(Ne(r.value)) === "on"),
    isIndeterminate: M(() => n.root.selected.value.get(r.value) === "indeterminate"),
    isLeaf: M(() => !n.root.children.value.get(r.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(r.value, n.id.value, t), Ct(() => {
    !n.isGroupActivator && n.root.unregister(r.value);
  }), t && Ge(a0, l), l;
}, S4 = () => {
  const e = Ve(a0, Os);
  Ge(a0, {
    ...e,
    isGroupActivator: !0
  });
};
function k4() {
  const e = pe(!1);
  return Pn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: M(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: cr(e)
  };
}
const C4 = o0({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return S4(), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), A4 = U({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: be,
    default: "$collapse"
  },
  expandIcon: {
    type: be,
    default: "$expand"
  },
  prependIcon: be,
  appendIcon: be,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...we(),
  ...We()
}, "VListGroup"), pi = se()({
  name: "VListGroup",
  props: A4(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: a,
      open: r,
      id: l
    } = _s(J(e, "value"), !0), i = M(() => `v-list-group--id-${String(l.value)}`), o = zs(), {
      isBooted: s
    } = k4();
    function c(g) {
      g.stopPropagation(), r(!a.value, g);
    }
    const m = M(() => ({
      onClick: c,
      class: "v-list-group__header",
      id: i.value
    })), f = M(() => a.value ? e.collapseIcon : e.expandIcon), v = M(() => ({
      VListItem: {
        active: a.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && f.value,
        appendIcon: e.appendIcon || !e.subgroup && f.value,
        title: e.title,
        value: e.value
      }
    }));
    return ve(() => w(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": o == null ? void 0 : o.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": a.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && w(tt, {
        defaults: v.value
      }, {
        default: () => [w(C4, null, {
          default: () => [n.activator({
            props: m.value,
            isOpen: a.value
          })]
        })]
      }), w(Qt, {
        transition: {
          component: jd
        },
        disabled: !s.value
      }, {
        default: () => {
          var g;
          return [dt(w("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": i.value
          }, [(g = n.default) == null ? void 0 : g.call(n)]), [[En, a.value]])];
        }
      })]
    })), {
      isOpen: a
    };
  }
}), M4 = U({
  opacity: [Number, String],
  ...we(),
  ...We()
}, "VListItemSubtitle"), T4 = se()({
  name: "VListItemSubtitle",
  props: M4(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => w(e.tag, {
      class: ["v-list-item-subtitle", e.class],
      style: [{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style]
    }, n)), {};
  }
}), B4 = ad("v-list-item-title"), I4 = U({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: be,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: be,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: je(),
  onClickOnce: je(),
  ...on(),
  ...we(),
  ...zt(),
  ...Gt(),
  ...wn(),
  ...pt(),
  ...jr(),
  ...We(),
  ...qe(),
  ...sn({
    variant: "text"
  })
}, "VListItem"), W0 = se()({
  name: "VListItem",
  directives: {
    Ripple: ua
  },
  props: I4(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: r
    } = t;
    const l = Wr(e, n), i = M(() => e.value === void 0 ? l.href.value : e.value), {
      activate: o,
      isActivated: s,
      select: c,
      isOpen: m,
      isSelected: f,
      isIndeterminate: v,
      isGroupActivator: g,
      root: p,
      parent: b,
      openOnSelect: x,
      id: S
    } = _s(i, !1), A = zs(), V = M(() => {
      var Y;
      return e.active !== !1 && (e.active || ((Y = l.isActive) == null ? void 0 : Y.value) || (p.activatable.value ? s.value : f.value));
    }), P = M(() => e.link !== !1 && l.isLink.value), z = M(() => !e.disabled && e.link !== !1 && (e.link || l.isClickable.value || !!A && (p.selectable.value || p.activatable.value || e.value != null))), _ = M(() => e.rounded || e.nav), O = M(() => e.color ?? e.activeColor), B = M(() => ({
      color: V.value ? O.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    ge(() => {
      var Y;
      return (Y = l.isActive) == null ? void 0 : Y.value;
    }, (Y) => {
      Y && b.value != null && p.open(b.value, !0), Y && x(Y);
    }, {
      immediate: !0
    });
    const {
      themeClasses: E
    } = Ue(e), {
      borderClasses: j
    } = xn(e), {
      colorClasses: F,
      colorStyles: L,
      variantClasses: D
    } = oa(B), {
      densityClasses: $
    } = jt(e), {
      dimensionStyles: Z
    } = Wt(e), {
      elevationClasses: te
    } = Rn(e), {
      roundedClasses: de
    } = Pt(_), me = M(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), R = M(() => ({
      isActive: V.value,
      select: c,
      isOpen: m.value,
      isSelected: f.value,
      isIndeterminate: v.value
    }));
    function N(Y) {
      var ye;
      r("click", Y), z.value && ((ye = l.navigate) == null || ye.call(l, Y), !g && (p.activatable.value ? o(!s.value, Y) : (p.selectable.value || e.value != null) && c(!f.value, Y)));
    }
    function H(Y) {
      (Y.key === "Enter" || Y.key === " ") && (Y.preventDefault(), Y.target.dispatchEvent(new MouseEvent("click", Y)));
    }
    return ve(() => {
      const Y = P.value ? "a" : e.tag, ye = a.title || e.title != null, re = a.subtitle || e.subtitle != null, Se = !!(e.appendAvatar || e.appendIcon), ee = !!(Se || a.append), he = !!(e.prependAvatar || e.prependIcon), Ce = !!(he || a.prepend);
      return A == null || A.updateHasPrepend(Ce), e.activeColor && U1("active-color", ["color", "base-color"]), dt(w(Y, oe({
        class: ["v-list-item", {
          "v-list-item--active": V.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": z.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !Ce && (A == null ? void 0 : A.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && V.value
        }, E.value, j.value, F.value, $.value, te.value, me.value, de.value, D.value, e.class],
        style: [L.value, Z.value, e.style],
        tabindex: z.value ? A ? -2 : 0 : void 0,
        "aria-selected": p.activatable.value ? s.value : f.value,
        onClick: N,
        onKeydown: z.value && !P.value && H
      }, l.linkProps), {
        default: () => {
          var Re;
          return [ia(z.value || V.value, "v-list-item"), Ce && w("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [a.prepend ? w(tt, {
            key: "prepend-defaults",
            disabled: !he,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var ke;
              return [(ke = a.prepend) == null ? void 0 : ke.call(a, R.value)];
            }
          }) : w(Te, null, [e.prependAvatar && w(t0, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && w(He, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), w("div", {
            class: "v-list-item__spacer"
          }, null)]), w("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [ye && w(B4, {
            key: "title"
          }, {
            default: () => {
              var ke;
              return [((ke = a.title) == null ? void 0 : ke.call(a, {
                title: e.title
              })) ?? e.title];
            }
          }), re && w(T4, {
            key: "subtitle"
          }, {
            default: () => {
              var ke;
              return [((ke = a.subtitle) == null ? void 0 : ke.call(a, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (Re = a.default) == null ? void 0 : Re.call(a, R.value)]), ee && w("div", {
            key: "append",
            class: "v-list-item__append"
          }, [a.append ? w(tt, {
            key: "append-defaults",
            disabled: !Se,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var ke;
              return [(ke = a.append) == null ? void 0 : ke.call(a, R.value)];
            }
          }) : w(Te, null, [e.appendIcon && w(He, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && w(t0, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), w("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Vn("ripple"), z.value && e.ripple]]);
    }), {
      activate: o,
      isActivated: s,
      isGroupActivator: g,
      isSelected: f,
      list: A,
      select: c,
      root: p,
      id: S
    };
  }
}), z4 = U({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...we(),
  ...We()
}, "VListSubheader"), P4 = se()({
  name: "VListSubheader",
  props: z4(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: a,
      textColorStyles: r
    } = qt(J(e, "color"));
    return ve(() => {
      const l = !!(n.default || e.title);
      return w(e.tag, {
        class: ["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, a.value, e.class],
        style: [{
          textColorStyles: r
        }, e.style]
      }, {
        default: () => {
          var i;
          return [l && w("div", {
            class: "v-list-subheader__text"
          }, [((i = n.default) == null ? void 0 : i.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), V4 = U({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...we(),
  ...qe()
}, "VDivider"), Ls = se()({
  name: "VDivider",
  props: V4(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: r
    } = Ue(e), {
      textColorClasses: l,
      textColorStyles: i
    } = qt(J(e, "color")), o = M(() => {
      const s = {};
      return e.length && (s[e.vertical ? "height" : "width"] = ce(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = ce(e.thickness)), s;
    });
    return ve(() => {
      const s = w("hr", {
        class: [{
          "v-divider": !0,
          "v-divider--inset": e.inset,
          "v-divider--vertical": e.vertical
        }, r.value, l.value, e.class],
        style: [o.value, i.value, {
          "--v-border-opacity": e.opacity
        }, e.style],
        "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
        role: `${n.role || "separator"}`
      }, null);
      return a.default ? w("div", {
        class: ["v-divider__wrapper", {
          "v-divider__wrapper--vertical": e.vertical,
          "v-divider__wrapper--inset": e.inset
        }]
      }, [s, w("div", {
        class: "v-divider__content"
      }, [a.default()]), s]) : s;
    }), {};
  }
}), E4 = U({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), Rs = se()({
  name: "VListChildren",
  props: E4(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Is(), () => {
      var a, r;
      return ((a = n.default) == null ? void 0 : a.call(n)) ?? ((r = e.items) == null ? void 0 : r.map((l) => {
        var v, g;
        let {
          children: i,
          props: o,
          type: s,
          raw: c
        } = l;
        if (s === "divider")
          return ((v = n.divider) == null ? void 0 : v.call(n, {
            props: o
          })) ?? w(Ls, o, null);
        if (s === "subheader")
          return ((g = n.subheader) == null ? void 0 : g.call(n, {
            props: o
          })) ?? w(P4, o, null);
        const m = {
          subtitle: n.subtitle ? (p) => {
            var b;
            return (b = n.subtitle) == null ? void 0 : b.call(n, {
              ...p,
              item: c
            });
          } : void 0,
          prepend: n.prepend ? (p) => {
            var b;
            return (b = n.prepend) == null ? void 0 : b.call(n, {
              ...p,
              item: c
            });
          } : void 0,
          append: n.append ? (p) => {
            var b;
            return (b = n.append) == null ? void 0 : b.call(n, {
              ...p,
              item: c
            });
          } : void 0,
          title: n.title ? (p) => {
            var b;
            return (b = n.title) == null ? void 0 : b.call(n, {
              ...p,
              item: c
            });
          } : void 0
        }, f = pi.filterProps(o);
        return i ? w(pi, oe({
          value: o == null ? void 0 : o.value
        }, f), {
          activator: (p) => {
            let {
              props: b
            } = p;
            const x = {
              ...o,
              ...b,
              value: e.returnObject ? c : o.value
            };
            return n.header ? n.header({
              props: x
            }) : w(W0, x, m);
          },
          default: () => w(Rs, {
            items: i,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: o
        }) : w(W0, oe(o, {
          value: e.returnObject ? c : o.value
        }), m);
      }));
    };
  }
}), Ns = U({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: {
    type: Function,
    default: rn
  }
}, "list-items");
function tr(e, t) {
  const n = et(t, e.itemTitle, t), a = et(t, e.itemValue, n), r = et(t, e.itemChildren), l = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Ln(t, ["children"]) : t : void 0 : et(t, e.itemProps), i = {
    title: n,
    value: a,
    ...l
  };
  return {
    title: String(i.title ?? ""),
    value: i.value,
    props: i,
    children: Array.isArray(r) ? Ds(e, r) : void 0,
    raw: t
  };
}
function Ds(e, t) {
  const n = [];
  for (const a of t)
    n.push(tr(e, a));
  return n;
}
function O4(e) {
  const t = M(() => Ds(e, e.items)), n = M(() => t.value.some((l) => l.value === null));
  function a(l) {
    return n.value || (l = l.filter((i) => i !== null)), l.map((i) => e.returnObject && typeof i == "string" ? tr(e, i) : t.value.find((o) => e.valueComparator(i, o.value)) || tr(e, i));
  }
  function r(l) {
    return e.returnObject ? l.map((i) => {
      let {
        raw: o
      } = i;
      return o;
    }) : l.map((i) => {
      let {
        value: o
      } = i;
      return o;
    });
  }
  return {
    items: t,
    transformIn: a,
    transformOut: r
  };
}
function _4(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function L4(e, t) {
  const n = et(t, e.itemType, "item"), a = _4(t) ? t : et(t, e.itemTitle), r = et(t, e.itemValue, void 0), l = et(t, e.itemChildren), i = e.itemProps === !0 ? Ln(t, ["children"]) : et(t, e.itemProps), o = {
    title: a,
    value: r,
    ...i
  };
  return {
    type: n,
    title: o.title,
    value: o.value,
    props: o,
    children: n === "item" && l ? Fs(e, l) : void 0,
    raw: t
  };
}
function Fs(e, t) {
  const n = [];
  for (const a of t)
    n.push(L4(e, a));
  return n;
}
function R4(e) {
  return {
    items: M(() => Fs(e, e.items))
  };
}
const N4 = U({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": je(),
  "onClick:select": je(),
  "onUpdate:opened": je(),
  ...x4({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...on(),
  ...we(),
  ...zt(),
  ...Gt(),
  ...wn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...Ns(),
  ...pt(),
  ...We(),
  ...qe(),
  ...sn({
    variant: "text"
  })
}, "VList"), D4 = se()({
  name: "VList",
  props: N4(),
  emits: {
    "update:selected": (e) => !0,
    "update:activated": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:activate": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: a
    } = R4(e), {
      themeClasses: r
    } = Ue(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: i
    } = St(J(e, "bgColor")), {
      borderClasses: o
    } = xn(e), {
      densityClasses: s
    } = jt(e), {
      dimensionStyles: c
    } = Wt(e), {
      elevationClasses: m
    } = Rn(e), {
      roundedClasses: f
    } = Pt(e), {
      children: v,
      open: g,
      parents: p,
      select: b,
      getPath: x
    } = w4(e), S = M(() => e.lines ? `v-list--${e.lines}-line` : void 0), A = J(e, "activeColor"), V = J(e, "baseColor"), P = J(e, "color");
    Is(), nn({
      VListGroup: {
        activeColor: A,
        baseColor: V,
        color: P,
        expandIcon: J(e, "expandIcon"),
        collapseIcon: J(e, "collapseIcon")
      },
      VListItem: {
        activeClass: J(e, "activeClass"),
        activeColor: A,
        baseColor: V,
        color: P,
        density: J(e, "density"),
        disabled: J(e, "disabled"),
        lines: J(e, "lines"),
        nav: J(e, "nav"),
        slim: J(e, "slim"),
        variant: J(e, "variant")
      }
    });
    const z = pe(!1), _ = ae();
    function O(D) {
      z.value = !0;
    }
    function B(D) {
      z.value = !1;
    }
    function E(D) {
      var $;
      !z.value && !(D.relatedTarget && (($ = _.value) != null && $.contains(D.relatedTarget))) && L();
    }
    function j(D) {
      const $ = D.target;
      if (!(!_.value || ["INPUT", "TEXTAREA"].includes($.tagName))) {
        if (D.key === "ArrowDown")
          L("next");
        else if (D.key === "ArrowUp")
          L("prev");
        else if (D.key === "Home")
          L("first");
        else if (D.key === "End")
          L("last");
        else
          return;
        D.preventDefault();
      }
    }
    function F(D) {
      z.value = !0;
    }
    function L(D) {
      if (_.value)
        return Yn(_.value, D);
    }
    return ve(() => w(e.tag, {
      ref: _,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, r.value, l.value, o.value, s.value, m.value, S.value, f.value, e.class],
      style: [i.value, c.value, e.style],
      tabindex: e.disabled || z.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: O,
      onFocusout: B,
      onFocus: E,
      onKeydown: j,
      onMousedown: F
    }, {
      default: () => [w(Rs, {
        items: a.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: g,
      select: b,
      focus: L,
      children: v,
      parents: p,
      getPath: x
    };
  }
});
function Ea(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function F4(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function yi(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: a
    } = e, r = a === "left" ? 0 : a === "center" ? t.width / 2 : a === "right" ? t.width : a, l = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return Ea({
      x: r,
      y: l
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: a
    } = e, r = n === "left" ? 0 : n === "right" ? t.width : n, l = a === "top" ? 0 : a === "center" ? t.height / 2 : a === "bottom" ? t.height : a;
    return Ea({
      x: r,
      y: l
    }, t);
  }
  return Ea({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const qs = {
  static: $4,
  // specific viewport position, usually centered
  connected: W4
  // connected to a certain element
}, q4 = U({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in qs
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function H4(e, t) {
  const n = ae({}), a = ae();
  $e && pn(() => !!(t.isActive.value && e.locationStrategy), (l) => {
    var i, o;
    ge(() => e.locationStrategy, l), nt(() => {
      window.removeEventListener("resize", r), a.value = void 0;
    }), window.addEventListener("resize", r, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (i = e.locationStrategy(t, e, n)) == null ? void 0 : i.updateLocation : a.value = (o = qs[e.locationStrategy](t, e, n)) == null ? void 0 : o.updateLocation;
  });
  function r(l) {
    var i;
    (i = a.value) == null || i.call(a, l);
  }
  return {
    contentStyles: n,
    updateLocation: a
  };
}
function $4() {
}
function G4(e, t) {
  const n = Or(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function W4(e, t, n) {
  (Array.isArray(e.target.value) || od(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: r,
    preferredOrigin: l
  } = Er(() => {
    const p = Xa(t.location, e.isRtl.value), b = t.origin === "overlap" ? p : t.origin === "auto" ? Ia(p) : Xa(t.origin, e.isRtl.value);
    return p.side === b.side && p.align === za(b).align ? {
      preferredAnchor: ql(p),
      preferredOrigin: ql(b)
    } : {
      preferredAnchor: p,
      preferredOrigin: b
    };
  }), [i, o, s, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((p) => M(() => {
    const b = parseFloat(t[p]);
    return isNaN(b) ? 1 / 0 : b;
  })), m = M(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const p = t.offset.split(" ").map(parseFloat);
      return p.length < 2 && p.push(0), p;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let f = !1;
  const v = new ResizeObserver(() => {
    f && g();
  });
  ge([e.target, e.contentEl], (p, b) => {
    let [x, S] = p, [A, V] = b;
    A && !Array.isArray(A) && v.unobserve(A), x && !Array.isArray(x) && v.observe(x), V && v.unobserve(V), S && v.observe(S);
  }, {
    immediate: !0
  }), nt(() => {
    v.disconnect();
  });
  function g() {
    if (f = !1, requestAnimationFrame(() => f = !0), !e.target.value || !e.contentEl.value) return;
    const p = Ro(e.target.value), b = G4(e.contentEl.value, e.isRtl.value), x = $0(e.contentEl.value), S = 12;
    x.length || (x.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (b.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), b.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const A = x.reduce((F, L) => {
      const D = L.getBoundingClientRect(), $ = new fn({
        x: L === document.documentElement ? 0 : D.x,
        y: L === document.documentElement ? 0 : D.y,
        width: L.clientWidth,
        height: L.clientHeight
      });
      return F ? new fn({
        x: Math.max(F.left, $.left),
        y: Math.max(F.top, $.top),
        width: Math.min(F.right, $.right) - Math.max(F.left, $.left),
        height: Math.min(F.bottom, $.bottom) - Math.max(F.top, $.top)
      }) : $;
    }, void 0);
    A.x += S, A.y += S, A.width -= S * 2, A.height -= S * 2;
    let V = {
      anchor: r.value,
      origin: l.value
    };
    function P(F) {
      const L = new fn(b), D = yi(F.anchor, p), $ = yi(F.origin, L);
      let {
        x: Z,
        y: te
      } = F4(D, $);
      switch (F.anchor.side) {
        case "top":
          te -= m.value[0];
          break;
        case "bottom":
          te += m.value[0];
          break;
        case "left":
          Z -= m.value[0];
          break;
        case "right":
          Z += m.value[0];
          break;
      }
      switch (F.anchor.align) {
        case "top":
          te -= m.value[1];
          break;
        case "bottom":
          te += m.value[1];
          break;
        case "left":
          Z -= m.value[1];
          break;
        case "right":
          Z += m.value[1];
          break;
      }
      return L.x += Z, L.y += te, L.width = Math.min(L.width, s.value), L.height = Math.min(L.height, c.value), {
        overflows: $l(L, A),
        x: Z,
        y: te
      };
    }
    let z = 0, _ = 0;
    const O = {
      x: 0,
      y: 0
    }, B = {
      x: !1,
      y: !1
    };
    let E = -1;
    for (; ; ) {
      if (E++ > 10) {
        _r("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: F,
        y: L,
        overflows: D
      } = P(V);
      z += F, _ += L, b.x += F, b.y += L;
      {
        const $ = Hl(V.anchor), Z = D.x.before || D.x.after, te = D.y.before || D.y.after;
        let de = !1;
        if (["x", "y"].forEach((me) => {
          if (me === "x" && Z && !B.x || me === "y" && te && !B.y) {
            const R = {
              anchor: {
                ...V.anchor
              },
              origin: {
                ...V.origin
              }
            }, N = me === "x" ? $ === "y" ? za : Ia : $ === "y" ? Ia : za;
            R.anchor = N(R.anchor), R.origin = N(R.origin);
            const {
              overflows: H
            } = P(R);
            (H[me].before <= D[me].before && H[me].after <= D[me].after || H[me].before + H[me].after < (D[me].before + D[me].after) / 2) && (V = R, de = B[me] = !0);
          }
        }), de) continue;
      }
      D.x.before && (z += D.x.before, b.x += D.x.before), D.x.after && (z -= D.x.after, b.x -= D.x.after), D.y.before && (_ += D.y.before, b.y += D.y.before), D.y.after && (_ -= D.y.after, b.y -= D.y.after);
      {
        const $ = $l(b, A);
        O.x = A.width - $.x.before - $.x.after, O.y = A.height - $.y.before - $.y.after, z += $.x.before, b.x += $.x.before, _ += $.y.before, b.y += $.y.before;
      }
      break;
    }
    const j = Hl(V.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${V.anchor.side} ${V.anchor.align}`,
      transformOrigin: `${V.origin.side} ${V.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ce(Oa(_)),
      left: e.isRtl.value ? void 0 : ce(Oa(z)),
      right: e.isRtl.value ? ce(Oa(-z)) : void 0,
      minWidth: ce(j === "y" ? Math.min(i.value, p.width) : i.value),
      maxWidth: ce(bi(gt(O.x, i.value === 1 / 0 ? 0 : i.value, s.value))),
      maxHeight: ce(bi(gt(O.y, o.value === 1 / 0 ? 0 : o.value, c.value)))
    }), {
      available: O,
      contentBox: b
    };
  }
  return ge(() => [r.value, l.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => g()), Ze(() => {
    const p = g();
    if (!p) return;
    const {
      available: b,
      contentBox: x
    } = p;
    x.height > b.y && requestAnimationFrame(() => {
      g(), requestAnimationFrame(() => {
        g();
      });
    });
  }), {
    updateLocation: g
  };
}
function Oa(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function bi(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let nr = !0;
const j0 = [];
function j4(e) {
  !nr || j0.length ? (j0.push(e), ar()) : (nr = !1, e(), ar());
}
let xi = -1;
function ar() {
  cancelAnimationFrame(xi), xi = requestAnimationFrame(() => {
    const e = j0.shift();
    e && e(), j0.length ? ar() : nr = !0;
  });
}
const P0 = {
  none: null,
  close: K4,
  block: X4,
  reposition: Z4
}, U4 = U({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in P0
  }
}, "VOverlay-scroll-strategies");
function Y4(e, t) {
  if (!$e) return;
  let n;
  kt(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = ur(), await new Promise((a) => setTimeout(a)), n.active && n.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (a = P0[e.scrollStrategy]) == null || a.call(P0, t, e, n);
    }));
  }), nt(() => {
    n == null || n.stop();
  });
}
function K4(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Hs(e.targetEl.value ?? e.contentEl.value, t);
}
function X4(e, t) {
  var i;
  const n = (i = e.root.value) == null ? void 0 : i.offsetParent, a = [.../* @__PURE__ */ new Set([...$0(e.targetEl.value, t.contained ? n : void 0), ...$0(e.contentEl.value, t.contained ? n : void 0)])].filter((o) => !o.classList.contains("v-overlay-scroll-blocked")), r = window.innerWidth - document.documentElement.offsetWidth, l = ((o) => Rr(o) && o)(n || document.documentElement);
  l && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((o, s) => {
    o.style.setProperty("--v-body-scroll-x", ce(-o.scrollLeft)), o.style.setProperty("--v-body-scroll-y", ce(-o.scrollTop)), o !== document.documentElement && o.style.setProperty("--v-scrollbar-offset", ce(r)), o.classList.add("v-overlay-scroll-blocked");
  }), nt(() => {
    a.forEach((o, s) => {
      const c = parseFloat(o.style.getPropertyValue("--v-body-scroll-x")), m = parseFloat(o.style.getPropertyValue("--v-body-scroll-y")), f = o.style.scrollBehavior;
      o.style.scrollBehavior = "auto", o.style.removeProperty("--v-body-scroll-x"), o.style.removeProperty("--v-body-scroll-y"), o.style.removeProperty("--v-scrollbar-offset"), o.classList.remove("v-overlay-scroll-blocked"), o.scrollLeft = -c, o.scrollTop = -m, o.style.scrollBehavior = f;
    }), l && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Z4(e, t, n) {
  let a = !1, r = -1, l = -1;
  function i(o) {
    j4(() => {
      var m, f;
      const s = performance.now();
      (f = (m = e.updateLocation).value) == null || f.call(m, o), a = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  l = (typeof requestIdleCallback > "u" ? (o) => o() : requestIdleCallback)(() => {
    n.run(() => {
      Hs(e.targetEl.value ?? e.contentEl.value, (o) => {
        a ? (cancelAnimationFrame(r), r = requestAnimationFrame(() => {
          r = requestAnimationFrame(() => {
            i(o);
          });
        })) : i(o);
      });
    });
  }), nt(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(l), cancelAnimationFrame(r);
  });
}
function Hs(e, t) {
  const n = [document, ...$0(e)];
  n.forEach((a) => {
    a.addEventListener("scroll", t, {
      passive: !0
    });
  }), nt(() => {
    n.forEach((a) => {
      a.removeEventListener("scroll", t);
    });
  });
}
const rr = Symbol.for("vuetify:v-menu"), Q4 = U({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function J4(e, t) {
  let n = () => {
  };
  function a(i) {
    n == null || n();
    const o = Number(i ? e.openDelay : e.closeDelay);
    return new Promise((s) => {
      n = _1(o, () => {
        t == null || t(i), s(i);
      });
    });
  }
  function r() {
    return a(!0);
  }
  function l() {
    return a(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: r,
    runCloseDelay: l
  };
}
const em = U({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...Q4()
}, "VOverlay-activator");
function tm(e, t) {
  let {
    isActive: n,
    isTop: a,
    contentEl: r
  } = t;
  const l = _e("useActivator"), i = ae();
  let o = !1, s = !1, c = !0;
  const m = M(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), f = M(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !m.value), {
    runOpenDelay: v,
    runCloseDelay: g
  } = J4(e, (B) => {
    B === (e.openOnHover && o || m.value && s) && !(e.openOnHover && n.value && !a.value) && (n.value !== B && (c = !0), n.value = B);
  }), p = ae(), b = {
    onClick: (B) => {
      B.stopPropagation(), i.value = B.currentTarget || B.target, n.value || (p.value = [B.clientX, B.clientY]), n.value = !n.value;
    },
    onMouseenter: (B) => {
      var E;
      (E = B.sourceCapabilities) != null && E.firesTouchEvents || (o = !0, i.value = B.currentTarget || B.target, v());
    },
    onMouseleave: (B) => {
      o = !1, g();
    },
    onFocus: (B) => {
      F0(B.target, ":focus-visible") !== !1 && (s = !0, B.stopPropagation(), i.value = B.currentTarget || B.target, v());
    },
    onBlur: (B) => {
      s = !1, B.stopPropagation(), g();
    }
  }, x = M(() => {
    const B = {};
    return f.value && (B.onClick = b.onClick), e.openOnHover && (B.onMouseenter = b.onMouseenter, B.onMouseleave = b.onMouseleave), m.value && (B.onFocus = b.onFocus, B.onBlur = b.onBlur), B;
  }), S = M(() => {
    const B = {};
    if (e.openOnHover && (B.onMouseenter = () => {
      o = !0, v();
    }, B.onMouseleave = () => {
      o = !1, g();
    }), m.value && (B.onFocusin = () => {
      s = !0, v();
    }, B.onFocusout = () => {
      s = !1, g();
    }), e.closeOnContentClick) {
      const E = Ve(rr, null);
      B.onClick = () => {
        n.value = !1, E == null || E.closeParents();
      };
    }
    return B;
  }), A = M(() => {
    const B = {};
    return e.openOnHover && (B.onMouseenter = () => {
      c && (o = !0, c = !1, v());
    }, B.onMouseleave = () => {
      o = !1, g();
    }), B;
  });
  ge(a, (B) => {
    var E;
    B && (e.openOnHover && !o && (!m.value || !s) || m.value && !s && (!e.openOnHover || !o)) && !((E = r.value) != null && E.contains(document.activeElement)) && (n.value = !1);
  }), ge(n, (B) => {
    B || setTimeout(() => {
      p.value = void 0;
    });
  }, {
    flush: "post"
  });
  const V = Ka();
  kt(() => {
    V.value && Ze(() => {
      i.value = V.el;
    });
  });
  const P = Ka(), z = M(() => e.target === "cursor" && p.value ? p.value : P.value ? P.el : $s(e.target, l) || i.value), _ = M(() => Array.isArray(z.value) ? void 0 : z.value);
  let O;
  return ge(() => !!e.activator, (B) => {
    B && $e ? (O = ur(), O.run(() => {
      nm(e, l, {
        activatorEl: i,
        activatorEvents: x
      });
    })) : O && O.stop();
  }, {
    flush: "post",
    immediate: !0
  }), nt(() => {
    O == null || O.stop();
  }), {
    activatorEl: i,
    activatorRef: V,
    target: z,
    targetEl: _,
    targetRef: P,
    activatorEvents: x,
    contentEvents: S,
    scrimEvents: A
  };
}
function nm(e, t, n) {
  let {
    activatorEl: a,
    activatorEvents: r
  } = n;
  ge(() => e.activator, (s, c) => {
    if (c && s !== c) {
      const m = o(c);
      m && i(m);
    }
    s && Ze(() => l());
  }, {
    immediate: !0
  }), ge(() => e.activatorProps, () => {
    l();
  }), nt(() => {
    i();
  });
  function l() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : o(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && N1(s, oe(r.value, c));
  }
  function i() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : o(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && D1(s, oe(r.value, c));
  }
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const c = $s(s, t);
    return a.value = (c == null ? void 0 : c.nodeType) === Node.ELEMENT_NODE ? c : void 0, a.value;
  }
}
function $s(e, t) {
  var a, r;
  if (!e) return;
  let n;
  if (e === "parent") {
    let l = (r = (a = t == null ? void 0 : t.proxy) == null ? void 0 : a.$el) == null ? void 0 : r.parentNode;
    for (; l != null && l.hasAttribute("data-no-activator"); )
      l = l.parentNode;
    n = l;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
function am() {
  if (!$e) return pe(!1);
  const {
    ssr: e
  } = bn();
  if (e) {
    const t = pe(!1);
    return Pn(() => {
      t.value = !0;
    }), t;
  } else
    return pe(!0);
}
const rm = U({
  eager: Boolean
}, "lazy");
function lm(e, t) {
  const n = pe(!1), a = M(() => n.value || e.eager || t.value);
  ge(t, () => n.value = !0);
  function r() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: a,
    onAfterLeave: r
  };
}
function Gs() {
  const t = _e("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const wi = Symbol.for("vuetify:stack"), qn = Tn([]);
function im(e, t, n) {
  const a = _e("useStack"), r = !n, l = Ve(wi, void 0), i = Tn({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Ge(wi, i);
  const o = pe(+t.value);
  pn(e, () => {
    var f;
    const m = (f = qn.at(-1)) == null ? void 0 : f[1];
    o.value = m ? m + 10 : +t.value, r && qn.push([a.uid, o.value]), l == null || l.activeChildren.add(a.uid), nt(() => {
      if (r) {
        const v = Ne(qn).findIndex((g) => g[0] === a.uid);
        qn.splice(v, 1);
      }
      l == null || l.activeChildren.delete(a.uid);
    });
  });
  const s = pe(!0);
  r && kt(() => {
    var f;
    const m = ((f = qn.at(-1)) == null ? void 0 : f[0]) === a.uid;
    setTimeout(() => s.value = m);
  });
  const c = M(() => !i.activeChildren.size);
  return {
    globalTop: cr(s),
    localTop: c,
    stackStyles: M(() => ({
      zIndex: o.value
    }))
  };
}
function om(e) {
  return {
    teleportTarget: M(() => {
      const n = e();
      if (n === !0 || !$e) return;
      const a = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (a == null) {
        K0(`Unable to locate target ${n}`);
        return;
      }
      let r = [...a.children].find((l) => l.matches(".v-overlay-container"));
      return r || (r = document.createElement("div"), r.className = "v-overlay-container", a.appendChild(r)), r;
    })
  };
}
function sm() {
  return !0;
}
function Ws(e, t, n) {
  if (!e || js(e, n) === !1) return !1;
  const a = Fo(t);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const r = (typeof n.value == "object" && n.value.include || (() => []))();
  return r.push(t), !r.some((l) => l == null ? void 0 : l.contains(e.target));
}
function js(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || sm)(e);
}
function um(e, t, n) {
  const a = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && Ws(e, t, n) && setTimeout(() => {
    js(e, n) && a && a(e);
  }, 0);
}
function Si(e, t) {
  const n = Fo(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const cm = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (r) => um(r, e, t), a = (r) => {
      e._clickOutside.lastMousedownWasOutside = Ws(r, e, t);
    };
    Si(e, (r) => {
      r.addEventListener("click", n, !0), r.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: a
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (Si(e, (n) => {
      var l;
      if (!n || !((l = e._clickOutside) != null && l[t.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: r
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", a, !0), n.removeEventListener("mousedown", r, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function dm(e) {
  const {
    modelValue: t,
    color: n,
    ...a
  } = e;
  return w(gn, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && w("div", oe({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const Us = U({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...em(),
  ...we(),
  ...Gt(),
  ...rm(),
  ...q4(),
  ...U4(),
  ...qe(),
  ...u0()
}, "VOverlay"), ki = se()({
  name: "VOverlay",
  directives: {
    ClickOutside: cm
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Us()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: a,
      emit: r
    } = t;
    const l = _e("VOverlay"), i = ae(), o = ae(), s = ae(), c = Be(e, "modelValue"), m = M({
      get: () => c.value,
      set: (ee) => {
        ee && e.disabled || (c.value = ee);
      }
    }), {
      themeClasses: f
    } = Ue(e), {
      rtlClasses: v,
      isRtl: g
    } = It(), {
      hasContent: p,
      onAfterLeave: b
    } = lm(e, m), x = St(M(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: S,
      localTop: A,
      stackStyles: V
    } = im(m, J(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: P,
      activatorRef: z,
      target: _,
      targetEl: O,
      targetRef: B,
      activatorEvents: E,
      contentEvents: j,
      scrimEvents: F
    } = tm(e, {
      isActive: m,
      isTop: A,
      contentEl: s
    }), {
      teleportTarget: L
    } = om(() => {
      var Ce, Re, ke;
      const ee = e.attach || e.contained;
      if (ee) return ee;
      const he = ((Ce = P == null ? void 0 : P.value) == null ? void 0 : Ce.getRootNode()) || ((ke = (Re = l.proxy) == null ? void 0 : Re.$el) == null ? void 0 : ke.getRootNode());
      return he instanceof ShadowRoot ? he : !1;
    }), {
      dimensionStyles: D
    } = Wt(e), $ = am(), {
      scopeId: Z
    } = Gs();
    ge(() => e.disabled, (ee) => {
      ee && (m.value = !1);
    });
    const {
      contentStyles: te,
      updateLocation: de
    } = H4(e, {
      isRtl: g,
      contentEl: s,
      target: _,
      isActive: m
    });
    Y4(e, {
      root: i,
      contentEl: s,
      targetEl: O,
      isActive: m,
      updateLocation: de
    });
    function me(ee) {
      r("click:outside", ee), e.persistent ? ye() : m.value = !1;
    }
    function R(ee) {
      return m.value && S.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || ee.target === o.value || ee instanceof MouseEvent && ee.shadowTarget === o.value);
    }
    $e && ge(m, (ee) => {
      ee ? window.addEventListener("keydown", N) : window.removeEventListener("keydown", N);
    }, {
      immediate: !0
    }), Ct(() => {
      $e && window.removeEventListener("keydown", N);
    });
    function N(ee) {
      var he, Ce;
      ee.key === "Escape" && S.value && (e.persistent ? ye() : (m.value = !1, (he = s.value) != null && he.contains(document.activeElement) && ((Ce = P.value) == null || Ce.focus())));
    }
    const H = Bd();
    pn(() => e.closeOnBack, () => {
      Id(H, (ee) => {
        S.value && m.value ? (ee(!1), e.persistent ? ye() : m.value = !1) : ee();
      });
    });
    const Y = ae();
    ge(() => m.value && (e.absolute || e.contained) && L.value == null, (ee) => {
      if (ee) {
        const he = qo(i.value);
        he && he !== document.scrollingElement && (Y.value = he.scrollTop);
      }
    });
    function ye() {
      e.noClickAnimation || s.value && An(s.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: H0
      });
    }
    function re() {
      r("afterEnter");
    }
    function Se() {
      b(), r("afterLeave");
    }
    return ve(() => {
      var ee;
      return w(Te, null, [(ee = n.activator) == null ? void 0 : ee.call(n, {
        isActive: m.value,
        targetRef: B,
        props: oe({
          ref: z
        }, E.value, e.activatorProps)
      }), $.value && p.value && w(Tu, {
        disabled: !L.value,
        to: L.value
      }, {
        default: () => [w("div", oe({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": m.value,
            "v-overlay--contained": e.contained
          }, f.value, v.value, e.class],
          style: [V.value, {
            "--v-overlay-opacity": e.opacity,
            top: ce(Y.value)
          }, e.style],
          ref: i
        }, Z, a), [w(dm, oe({
          color: x,
          modelValue: m.value && !!e.scrim,
          ref: o
        }, F.value), null), w(Qt, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: _.value,
          onAfterEnter: re,
          onAfterLeave: Se
        }, {
          default: () => {
            var he;
            return [dt(w("div", oe({
              ref: s,
              class: ["v-overlay__content", e.contentClass],
              style: [D.value, te.value]
            }, j.value, e.contentProps), [(he = n.default) == null ? void 0 : he.call(n, {
              isActive: m
            })]), [[En, m.value], [Vn("click-outside"), {
              handler: me,
              closeConditional: R,
              include: () => [P.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: P,
      scrimEl: o,
      target: _,
      animateClick: ye,
      contentEl: s,
      globalTop: S,
      localTop: A,
      updateLocation: de
    };
  }
}), _a = Symbol("Forwarded refs");
function La(e, t) {
  let n = e;
  for (; n; ) {
    const a = Reflect.getOwnPropertyDescriptor(n, t);
    if (a) return a;
    n = Object.getPrototypeOf(n);
  }
}
function Xr(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return e[_a] = n, new Proxy(e, {
    get(r, l) {
      if (Reflect.has(r, l))
        return Reflect.get(r, l);
      if (!(typeof l == "symbol" || l.startsWith("$") || l.startsWith("__"))) {
        for (const i of n)
          if (i.value && Reflect.has(i.value, l)) {
            const o = Reflect.get(i.value, l);
            return typeof o == "function" ? o.bind(i.value) : o;
          }
      }
    },
    has(r, l) {
      if (Reflect.has(r, l))
        return !0;
      if (typeof l == "symbol" || l.startsWith("$") || l.startsWith("__")) return !1;
      for (const i of n)
        if (i.value && Reflect.has(i.value, l))
          return !0;
      return !1;
    },
    set(r, l, i) {
      if (Reflect.has(r, l))
        return Reflect.set(r, l, i);
      if (typeof l == "symbol" || l.startsWith("$") || l.startsWith("__")) return !1;
      for (const o of n)
        if (o.value && Reflect.has(o.value, l))
          return Reflect.set(o.value, l, i);
      return !1;
    },
    getOwnPropertyDescriptor(r, l) {
      var o;
      const i = Reflect.getOwnPropertyDescriptor(r, l);
      if (i) return i;
      if (!(typeof l == "symbol" || l.startsWith("$") || l.startsWith("__"))) {
        for (const s of n) {
          if (!s.value) continue;
          const c = La(s.value, l) ?? ("_" in s.value ? La((o = s.value._) == null ? void 0 : o.setupState, l) : void 0);
          if (c) return c;
        }
        for (const s of n) {
          const c = s.value && s.value[_a];
          if (!c) continue;
          const m = c.slice();
          for (; m.length; ) {
            const f = m.shift(), v = La(f.value, l);
            if (v) return v;
            const g = f.value && f.value[_a];
            g && m.push(...g);
          }
        }
      }
    }
  });
}
const mm = U({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...Ln(Us({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: us
    }
  }), ["absolute"])
}, "VMenu"), hm = se()({
  name: "VMenu",
  props: mm(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Be(e, "modelValue"), {
      scopeId: r
    } = Gs(), {
      isRtl: l
    } = It(), i = $t(), o = M(() => e.id || `v-menu-${i}`), s = ae(), c = Ve(rr, null), m = pe(/* @__PURE__ */ new Set());
    Ge(rr, {
      register() {
        m.value.add(i);
      },
      unregister() {
        m.value.delete(i);
      },
      closeParents(x) {
        setTimeout(() => {
          var S;
          !m.value.size && !e.persistent && (x == null || (S = s.value) != null && S.contentEl && !L1(x, s.value.contentEl)) && (a.value = !1, c == null || c.closeParents());
        }, 40);
      }
    }), Ct(() => c == null ? void 0 : c.unregister()), Bu(() => a.value = !1);
    async function f(x) {
      var V, P, z;
      const S = x.relatedTarget, A = x.target;
      await Ze(), a.value && S !== A && ((V = s.value) != null && V.contentEl) && // We're the topmost menu
      ((P = s.value) != null && P.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(A) && // It isn't inside the menu body
      !s.value.contentEl.contains(A) && ((z = D0(s.value.contentEl)[0]) == null || z.focus());
    }
    ge(a, (x) => {
      x ? (c == null || c.register(), document.addEventListener("focusin", f, {
        once: !0
      })) : (c == null || c.unregister(), document.removeEventListener("focusin", f));
    });
    function v(x) {
      c == null || c.closeParents(x);
    }
    function g(x) {
      var S, A, V, P, z;
      if (!e.disabled)
        if (x.key === "Tab" || x.key === "Enter" && !e.closeOnContentClick) {
          if (x.key === "Enter" && (x.target instanceof HTMLTextAreaElement || x.target instanceof HTMLInputElement && x.target.closest("form"))) return;
          x.key === "Enter" && x.preventDefault(), Oo(D0((S = s.value) == null ? void 0 : S.contentEl, !1), x.shiftKey ? "prev" : "next", (O) => O.tabIndex >= 0) || (a.value = !1, (V = (A = s.value) == null ? void 0 : A.activatorEl) == null || V.focus());
        } else e.submenu && x.key === (l.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (z = (P = s.value) == null ? void 0 : P.activatorEl) == null || z.focus());
    }
    function p(x) {
      var A;
      if (e.disabled) return;
      const S = (A = s.value) == null ? void 0 : A.contentEl;
      S && a.value ? x.key === "ArrowDown" ? (x.preventDefault(), x.stopImmediatePropagation(), Yn(S, "next")) : x.key === "ArrowUp" ? (x.preventDefault(), x.stopImmediatePropagation(), Yn(S, "prev")) : e.submenu && (x.key === (l.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : x.key === (l.value ? "ArrowLeft" : "ArrowRight") && (x.preventDefault(), Yn(S, "first"))) : (e.submenu ? x.key === (l.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(x.key)) && (a.value = !0, x.preventDefault(), setTimeout(() => setTimeout(() => p(x))));
    }
    const b = M(() => oe({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-owns": o.value,
      onKeydown: p
    }, e.activatorProps));
    return ve(() => {
      const x = ki.filterProps(e);
      return w(ki, oe({
        ref: s,
        id: o.value,
        class: ["v-menu", e.class],
        style: e.style
      }, x, {
        modelValue: a.value,
        "onUpdate:modelValue": (S) => a.value = S,
        absolute: !0,
        activatorProps: b.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": v,
        onKeydown: g
      }, r), {
        activator: n.activator,
        default: function() {
          for (var S = arguments.length, A = new Array(S), V = 0; V < S; V++)
            A[V] = arguments[V];
          return w(tt, {
            root: "VMenu"
          }, {
            default: () => {
              var P;
              return [(P = n.default) == null ? void 0 : P.call(n, ...A)];
            }
          });
        }
      });
    }), Xr({
      id: o,
      ΨopenChildren: m
    }, s);
  }
}), fm = U({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...we(),
  ...u0({
    transition: {
      component: cs
    }
  })
}, "VCounter"), vm = se()({
  name: "VCounter",
  functional: !0,
  props: fm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = M(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ve(() => w(Qt, {
      transition: e.transition
    }, {
      default: () => [dt(w("div", {
        class: ["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[En, e.active]])]
    })), {};
  }
}), gm = U({
  floating: Boolean,
  ...we()
}, "VFieldLabel"), A0 = se()({
  name: "VFieldLabel",
  props: gm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ve(() => w(vs, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
}), pm = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Ys = U({
  appendInnerIcon: be,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: be,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: be,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => pm.includes(e)
  },
  "onClick:clear": je(),
  "onClick:appendInner": je(),
  "onClick:prependInner": je(),
  ...we(),
  ...$r(),
  ...pt(),
  ...qe()
}, "VField"), Ks = se()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...xs(),
    ...Ys()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: r
    } = t;
    const {
      themeClasses: l
    } = Ue(e), {
      loaderClasses: i
    } = Gr(e), {
      focusClasses: o,
      isFocused: s,
      focus: c,
      blur: m
    } = ws(e), {
      InputIcon: f
    } = bs(e), {
      roundedClasses: v
    } = Pt(e), {
      rtlClasses: g
    } = It(), p = M(() => e.dirty || e.active), b = M(() => !e.singleLine && !!(e.label || r.label)), x = $t(), S = M(() => e.id || `input-${x}`), A = M(() => `${S.value}-messages`), V = ae(), P = ae(), z = ae(), _ = M(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: O,
      backgroundColorStyles: B
    } = St(J(e, "bgColor")), {
      textColorClasses: E,
      textColorStyles: j
    } = qt(M(() => e.error || e.disabled ? void 0 : p.value && s.value ? e.color : e.baseColor));
    ge(p, ($) => {
      if (b.value) {
        const Z = V.value.$el, te = P.value.$el;
        requestAnimationFrame(() => {
          const de = Or(Z), me = te.getBoundingClientRect(), R = me.x - de.x, N = me.y - de.y - (de.height / 2 - me.height / 2), H = me.width / 0.75, Y = Math.abs(H - de.width) > 1 ? {
            maxWidth: ce(H)
          } : void 0, ye = getComputedStyle(Z), re = getComputedStyle(te), Se = parseFloat(ye.transitionDuration) * 1e3 || 150, ee = parseFloat(re.getPropertyValue("--v-field-label-scale")), he = re.getPropertyValue("color");
          Z.style.visibility = "visible", te.style.visibility = "hidden", An(Z, {
            transform: `translate(${R}px, ${N}px) scale(${ee})`,
            color: he,
            ...Y
          }, {
            duration: Se,
            easing: H0,
            direction: $ ? "normal" : "reverse"
          }).finished.then(() => {
            Z.style.removeProperty("visibility"), te.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const F = M(() => ({
      isActive: p,
      isFocused: s,
      controlRef: z,
      blur: m,
      focus: c
    }));
    function L($) {
      $.target !== document.activeElement && $.preventDefault();
    }
    function D($) {
      var Z;
      $.key !== "Enter" && $.key !== " " || ($.preventDefault(), $.stopPropagation(), (Z = e["onClick:clear"]) == null || Z.call(e, new MouseEvent("click")));
    }
    return ve(() => {
      var R, N, H;
      const $ = e.variant === "outlined", Z = !!(r["prepend-inner"] || e.prependInnerIcon), te = !!(e.clearable || r.clear), de = !!(r["append-inner"] || e.appendInnerIcon || te), me = () => r.label ? r.label({
        ...F.value,
        label: e.label,
        props: {
          for: S.value
        }
      }) : e.label;
      return w("div", oe({
        class: ["v-field", {
          "v-field--active": p.value,
          "v-field--appended": de,
          "v-field--center-affix": e.centerAffix ?? !_.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": Z,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !me(),
          [`v-field--variant-${e.variant}`]: !0
        }, l.value, O.value, o.value, i.value, v.value, g.value, e.class],
        style: [B.value, e.style],
        onClick: L
      }, n), [w("div", {
        class: "v-field__overlay"
      }, null), w(Xo, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: r.loader
      }), Z && w("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && w(f, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (R = r["prepend-inner"]) == null ? void 0 : R.call(r, F.value)]), w("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && b.value && w(A0, {
        key: "floating-label",
        ref: P,
        class: [E.value],
        floating: !0,
        for: S.value,
        style: j.value
      }, {
        default: () => [me()]
      }), w(A0, {
        ref: V,
        for: S.value
      }, {
        default: () => [me()]
      }), (N = r.default) == null ? void 0 : N.call(r, {
        ...F.value,
        props: {
          id: S.value,
          class: "v-field__input",
          "aria-describedby": A.value
        },
        focus: c,
        blur: m
      })]), te && w(ds, {
        key: "clear"
      }, {
        default: () => [dt(w("div", {
          class: "v-field__clearable",
          onMousedown: (Y) => {
            Y.preventDefault(), Y.stopPropagation();
          }
        }, [w(tt, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [r.clear ? r.clear({
            ...F.value,
            props: {
              onKeydown: D,
              onFocus: c,
              onBlur: m,
              onClick: e["onClick:clear"]
            }
          }) : w(f, {
            name: "clear",
            onKeydown: D,
            onFocus: c,
            onBlur: m
          }, null)]
        })]), [[En, e.dirty]])]
      }), de && w("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(H = r["append-inner"]) == null ? void 0 : H.call(r, F.value), e.appendInnerIcon && w(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), w("div", {
        class: ["v-field__outline", E.value],
        style: j.value
      }, [$ && w(Te, null, [w("div", {
        class: "v-field__outline__start"
      }, null), b.value && w("div", {
        class: "v-field__outline__notch"
      }, [w(A0, {
        ref: P,
        floating: !0,
        for: S.value
      }, {
        default: () => [me()]
      })]), w("div", {
        class: "v-field__outline__end"
      }, null)]), _.value && b.value && w(A0, {
        ref: P,
        floating: !0,
        for: S.value
      }, {
        default: () => [me()]
      })])]);
    }), {
      controlRef: z
    };
  }
});
function ym(e) {
  const t = Object.keys(Ks.props).filter((n) => !ra(n) && n !== "class" && n !== "style");
  return Io(e, t);
}
const bm = ["color", "file", "time", "date", "datetime-local", "week", "month"], Xs = U({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...ks(),
  ...Ys()
}, "VTextField"), lr = se()({
  name: "VTextField",
  directives: {
    Intersect: fs
  },
  inheritAttrs: !1,
  props: Xs(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: r
    } = t;
    const l = Be(e, "modelValue"), {
      isFocused: i,
      focus: o,
      blur: s
    } = ws(e), c = M(() => typeof e.counterValue == "function" ? e.counterValue(l.value) : typeof e.counterValue == "number" ? e.counterValue : (l.value ?? "").toString().length), m = M(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = M(() => ["plain", "underlined"].includes(e.variant));
    function v(_, O) {
      var B, E;
      !e.autofocus || !_ || (E = (B = O[0].target) == null ? void 0 : B.focus) == null || E.call(B);
    }
    const g = ae(), p = ae(), b = ae(), x = M(() => bm.includes(e.type) || e.persistentPlaceholder || i.value || e.active);
    function S() {
      var _;
      b.value !== document.activeElement && ((_ = b.value) == null || _.focus()), i.value || o();
    }
    function A(_) {
      a("mousedown:control", _), _.target !== b.value && (S(), _.preventDefault());
    }
    function V(_) {
      S(), a("click:control", _);
    }
    function P(_) {
      _.stopPropagation(), S(), Ze(() => {
        l.value = null, O1(e["onClick:clear"], _);
      });
    }
    function z(_) {
      var B;
      const O = _.target;
      if (l.value = O.value, (B = e.modelModifiers) != null && B.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const E = [O.selectionStart, O.selectionEnd];
        Ze(() => {
          O.selectionStart = E[0], O.selectionEnd = E[1];
        });
      }
    }
    return ve(() => {
      const _ = !!(r.counter || e.counter !== !1 && e.counter != null), O = !!(_ || r.details), [B, E] = Po(n), {
        modelValue: j,
        ...F
      } = fi.filterProps(e), L = ym(e);
      return w(fi, oe({
        ref: g,
        modelValue: l.value,
        "onUpdate:modelValue": (D) => l.value = D,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": f.value
        }, e.class],
        style: e.style
      }, B, F, {
        centerAffix: !f.value,
        focused: i.value
      }), {
        ...r,
        default: (D) => {
          let {
            id: $,
            isDisabled: Z,
            isDirty: te,
            isReadonly: de,
            isValid: me
          } = D;
          return w(Ks, oe({
            ref: p,
            onMousedown: A,
            onClick: V,
            "onClick:clear": P,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, L, {
            id: $.value,
            active: x.value || te.value,
            dirty: te.value || e.dirty,
            disabled: Z.value,
            focused: i.value,
            error: me.value === !1
          }), {
            ...r,
            default: (R) => {
              let {
                props: {
                  class: N,
                  ...H
                }
              } = R;
              const Y = dt(w("input", oe({
                ref: b,
                value: l.value,
                onInput: z,
                autofocus: e.autofocus,
                readonly: de.value,
                disabled: Z.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: S,
                onBlur: s
              }, H, E), null), [[Vn("intersect"), {
                handler: v
              }, null, {
                once: !0
              }]]);
              return w(Te, null, [e.prefix && w("span", {
                class: "v-text-field__prefix"
              }, [w("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), r.default ? w("div", {
                class: N,
                "data-no-activator": ""
              }, [r.default(), Y]) : Iu(Y, {
                class: N
              }), e.suffix && w("span", {
                class: "v-text-field__suffix"
              }, [w("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: O ? (D) => {
          var $;
          return w(Te, null, [($ = r.details) == null ? void 0 : $.call(r, D), _ && w(Te, null, [w("span", null, null), w(vm, {
            active: e.persistentCounter || i.value,
            value: c.value,
            max: m.value,
            disabled: e.disabled
          }, r.counter)])]);
        } : void 0
      });
    }), Xr({}, g, p, b);
  }
}), xm = U({
  renderless: Boolean,
  ...we()
}, "VVirtualScrollItem"), wm = se()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: xm(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: r
    } = t;
    const {
      resizeRef: l,
      contentRect: i
    } = zn(void 0, "border");
    ge(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.height;
    }, (o) => {
      o != null && a("update:height", o);
    }), ve(() => {
      var o, s;
      return e.renderless ? w(Te, null, [(o = r.default) == null ? void 0 : o.call(r, {
        itemRef: l
      })]) : w("div", oe({
        ref: l,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(s = r.default) == null ? void 0 : s.call(r)]);
    });
  }
}), Sm = -1, km = 1, Ra = 100, Cm = U({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function Am(e, t) {
  const n = bn(), a = pe(0);
  kt(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const r = pe(0), l = pe(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (a.value || 16)
  ) || 1), i = pe(0), o = pe(0), s = ae(), c = ae();
  let m = 0;
  const {
    resizeRef: f,
    contentRect: v
  } = zn();
  kt(() => {
    f.value = s.value;
  });
  const g = M(() => {
    var R;
    return s.value === document.documentElement ? n.height.value : ((R = v.value) == null ? void 0 : R.height) || parseInt(e.height) || 0;
  }), p = M(() => !!(s.value && c.value && g.value && a.value));
  let b = Array.from({
    length: t.value.length
  }), x = Array.from({
    length: t.value.length
  });
  const S = pe(0);
  let A = -1;
  function V(R) {
    return b[R] || a.value;
  }
  const P = V1(() => {
    const R = performance.now();
    x[0] = 0;
    const N = t.value.length;
    for (let H = 1; H <= N - 1; H++)
      x[H] = (x[H - 1] || 0) + V(H - 1);
    S.value = Math.max(S.value, performance.now() - R);
  }, S), z = ge(p, (R) => {
    R && (z(), m = c.value.offsetTop, P.immediate(), Z(), ~A && Ze(() => {
      $e && window.requestAnimationFrame(() => {
        de(A), A = -1;
      });
    }));
  });
  nt(() => {
    P.clear();
  });
  function _(R, N) {
    const H = b[R], Y = a.value;
    a.value = Y ? Math.min(a.value, N) : N, (H !== N || Y !== a.value) && (b[R] = N, P());
  }
  function O(R) {
    return R = gt(R, 0, t.value.length - 1), x[R] || 0;
  }
  function B(R) {
    return Mm(x, R);
  }
  let E = 0, j = 0, F = 0;
  ge(g, (R, N) => {
    N && (Z(), R < N && requestAnimationFrame(() => {
      j = 0, Z();
    }));
  });
  function L() {
    if (!s.value || !c.value) return;
    const R = s.value.scrollTop, N = performance.now();
    N - F > 500 ? (j = Math.sign(R - E), m = c.value.offsetTop) : j = R - E, E = R, F = N, Z();
  }
  function D() {
    !s.value || !c.value || (j = 0, F = 0, Z());
  }
  let $ = -1;
  function Z() {
    cancelAnimationFrame($), $ = requestAnimationFrame(te);
  }
  function te() {
    if (!s.value || !g.value) return;
    const R = E - m, N = Math.sign(j), H = Math.max(0, R - Ra), Y = gt(B(H), 0, t.value.length), ye = R + g.value + Ra, re = gt(B(ye) + 1, Y + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (N !== Sm || Y < r.value) && (N !== km || re > l.value)
    ) {
      const Se = O(r.value) - O(Y), ee = O(re) - O(l.value);
      Math.max(Se, ee) > Ra ? (r.value = Y, l.value = re) : (Y <= 0 && (r.value = Y), re >= t.value.length && (l.value = re));
    }
    i.value = O(r.value), o.value = O(t.value.length) - O(l.value);
  }
  function de(R) {
    const N = O(R);
    !s.value || R && !N ? A = R : s.value.scrollTop = N;
  }
  const me = M(() => t.value.slice(r.value, l.value).map((R, N) => ({
    raw: R,
    index: N + r.value
  })));
  return ge(t, () => {
    b = Array.from({
      length: t.value.length
    }), x = Array.from({
      length: t.value.length
    }), P.immediate(), Z();
  }, {
    deep: !0
  }), {
    calculateVisibleItems: Z,
    containerRef: s,
    markerRef: c,
    computedItems: me,
    paddingTop: i,
    paddingBottom: o,
    scrollToIndex: de,
    handleScroll: L,
    handleScrollend: D,
    handleItemResize: _
  };
}
function Mm(e, t) {
  let n = e.length - 1, a = 0, r = 0, l = null, i = -1;
  if (e[n] < t)
    return n;
  for (; a <= n; )
    if (r = a + n >> 1, l = e[r], l > t)
      n = r - 1;
    else if (l < t)
      i = r, a = r + 1;
    else return l === t ? r : a;
  return i;
}
const Tm = U({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Cm(),
  ...we(),
  ...Gt()
}, "VVirtualScroll"), Bm = se()({
  name: "VVirtualScroll",
  props: Tm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = _e("VVirtualScroll"), {
      dimensionStyles: r
    } = Wt(e), {
      calculateVisibleItems: l,
      containerRef: i,
      markerRef: o,
      handleScroll: s,
      handleScrollend: c,
      handleItemResize: m,
      scrollToIndex: f,
      paddingTop: v,
      paddingBottom: g,
      computedItems: p
    } = Am(e, J(e, "items"));
    return pn(() => e.renderless, () => {
      function b() {
        var A, V;
        const S = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        i.value === document.documentElement ? (document[S]("scroll", s, {
          passive: !0
        }), document[S]("scrollend", c)) : ((A = i.value) == null || A[S]("scroll", s, {
          passive: !0
        }), (V = i.value) == null || V[S]("scrollend", c));
      }
      Pn(() => {
        i.value = qo(a.vnode.el, !0), b(!0);
      }), nt(b);
    }), ve(() => {
      const b = p.value.map((x) => w(wm, {
        key: x.index,
        renderless: e.renderless,
        "onUpdate:height": (S) => m(x.index, S)
      }, {
        default: (S) => {
          var A;
          return (A = n.default) == null ? void 0 : A.call(n, {
            item: x.raw,
            index: x.index,
            ...S
          });
        }
      }));
      return e.renderless ? w(Te, null, [w("div", {
        ref: o,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: ce(v.value)
        }
      }, null), b, w("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ce(g.value)
        }
      }, null)]) : w("div", {
        ref: i,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: s,
        onScrollend: c,
        style: [r.value, e.style]
      }, [w("div", {
        ref: o,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: ce(v.value),
          paddingBottom: ce(g.value)
        }
      }, [b])]);
    }), {
      calculateVisibleItems: l,
      scrollToIndex: f
    };
  }
});
function Im(e, t) {
  const n = pe(!1);
  let a;
  function r(o) {
    cancelAnimationFrame(a), n.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function l() {
    await new Promise((o) => requestAnimationFrame(o)), await new Promise((o) => requestAnimationFrame(o)), await new Promise((o) => requestAnimationFrame(o)), await new Promise((o) => {
      if (n.value) {
        const s = ge(n, () => {
          s(), o();
        });
      } else o();
    });
  }
  async function i(o) {
    var m, f;
    if (o.key === "Tab" && ((m = t.value) == null || m.focus()), !["PageDown", "PageUp", "Home", "End"].includes(o.key)) return;
    const s = (f = e.value) == null ? void 0 : f.$el;
    if (!s) return;
    (o.key === "Home" || o.key === "End") && s.scrollTo({
      top: o.key === "Home" ? 0 : s.scrollHeight,
      behavior: "smooth"
    }), await l();
    const c = s.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (o.key === "PageDown" || o.key === "Home") {
      const v = s.getBoundingClientRect().top;
      for (const g of c)
        if (g.getBoundingClientRect().top >= v) {
          g.focus();
          break;
        }
    } else {
      const v = s.getBoundingClientRect().bottom;
      for (const g of [...c].reverse())
        if (g.getBoundingClientRect().bottom <= v) {
          g.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: r,
    onKeydown: i
  };
}
const zm = U({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: be,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...Ns({
    itemChildren: !1
  })
}, "Select"), Pm = U({
  ...zm(),
  ...Ln(Xs({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...u0({
    transition: {
      component: us
    }
  })
}, "VSelect"), Zs = se()({
  name: "VSelect",
  props: Pm(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = ln(), r = ae(), l = ae(), i = ae(), o = Be(e, "menu"), s = M({
      get: () => o.value,
      set: (R) => {
        var N;
        o.value && !R && ((N = l.value) != null && N.ΨopenChildren.size) || (o.value = R);
      }
    }), {
      items: c,
      transformIn: m,
      transformOut: f
    } = O4(e), v = Be(e, "modelValue", [], (R) => m(R === null ? [null] : Ye(R)), (R) => {
      const N = f(R);
      return e.multiple ? N : N[0] ?? null;
    }), g = M(() => typeof e.counterValue == "function" ? e.counterValue(v.value) : typeof e.counterValue == "number" ? e.counterValue : v.value.length), p = Ss(), b = M(() => v.value.map((R) => R.value)), x = pe(!1), S = M(() => s.value ? e.closeText : e.openText);
    let A = "", V;
    const P = M(() => e.hideSelected ? c.value.filter((R) => !v.value.some((N) => e.valueComparator(N, R))) : c.value), z = M(() => e.hideNoData && !P.value.length || e.readonly || (p == null ? void 0 : p.isReadonly.value)), _ = M(() => {
      var R;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((R = e.menuProps) == null ? void 0 : R.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), O = ae(), B = Im(O, r);
    function E(R) {
      e.openOnClear && (s.value = !0);
    }
    function j() {
      z.value || (s.value = !s.value);
    }
    function F(R) {
      Dl(R) && L(R);
    }
    function L(R) {
      var ye, re;
      if (!R.key || e.readonly || p != null && p.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(R.key) && R.preventDefault(), ["Enter", "ArrowDown", " "].includes(R.key) && (s.value = !0), ["Escape", "Tab"].includes(R.key) && (s.value = !1), R.key === "Home" ? (ye = O.value) == null || ye.focus("first") : R.key === "End" && ((re = O.value) == null || re.focus("last"));
      const N = 1e3;
      if (e.multiple || !Dl(R)) return;
      const H = performance.now();
      H - V > N && (A = ""), A += R.key.toLowerCase(), V = H;
      const Y = c.value.find((Se) => Se.title.toLowerCase().startsWith(A));
      if (Y !== void 0) {
        v.value = [Y];
        const Se = P.value.indexOf(Y);
        $e && window.requestAnimationFrame(() => {
          var ee;
          Se >= 0 && ((ee = i.value) == null || ee.scrollToIndex(Se));
        });
      }
    }
    function D(R) {
      let N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!R.props.disabled)
        if (e.multiple) {
          const H = v.value.findIndex((ye) => e.valueComparator(ye.value, R.value)), Y = N ?? !~H;
          if (~H) {
            const ye = Y ? [...v.value, R] : [...v.value];
            ye.splice(H, 1), v.value = ye;
          } else Y && (v.value = [...v.value, R]);
        } else {
          const H = N !== !1;
          v.value = H ? [R] : [], Ze(() => {
            s.value = !1;
          });
        }
    }
    function $(R) {
      var N;
      (N = O.value) != null && N.$el.contains(R.relatedTarget) || (s.value = !1);
    }
    function Z() {
      var R;
      e.eager && ((R = i.value) == null || R.calculateVisibleItems());
    }
    function te() {
      var R;
      x.value && ((R = r.value) == null || R.focus());
    }
    function de(R) {
      x.value = !0;
    }
    function me(R) {
      if (R == null) v.value = [];
      else if (F0(r.value, ":autofill") || F0(r.value, ":-webkit-autofill")) {
        const N = c.value.find((H) => H.title === R);
        N && D(N);
      } else r.value && (r.value.value = "");
    }
    return ge(s, () => {
      if (!e.hideSelected && s.value && v.value.length) {
        const R = P.value.findIndex((N) => v.value.some((H) => e.valueComparator(H.value, N.value)));
        $e && window.requestAnimationFrame(() => {
          var N;
          R >= 0 && ((N = i.value) == null || N.scrollToIndex(R));
        });
      }
    }), ge(() => e.items, (R, N) => {
      s.value || x.value && !N.length && R.length && (s.value = !0);
    }), ve(() => {
      const R = !!(e.chips || n.chip), N = !!(!e.hideNoData || P.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), H = v.value.length > 0, Y = lr.filterProps(e), ye = H || !x.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return w(lr, oe({
        ref: r
      }, Y, {
        modelValue: v.value.map((re) => re.props.value).join(", "),
        "onUpdate:modelValue": me,
        focused: x.value,
        "onUpdate:focused": (re) => x.value = re,
        validationValue: v.externalValue,
        counterValue: g.value,
        dirty: H,
        class: ["v-select", {
          "v-select--active-menu": s.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": v.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: ye,
        "onClick:clear": E,
        "onMousedown:control": j,
        onBlur: $,
        onKeydown: L,
        "aria-label": a(S.value),
        title: a(S.value)
      }), {
        ...n,
        default: () => w(Te, null, [w(hm, oe({
          ref: l,
          modelValue: s.value,
          "onUpdate:modelValue": (re) => s.value = re,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: z.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: Z,
          onAfterLeave: te
        }, _.value), {
          default: () => [N && w(D4, oe({
            ref: O,
            selected: b.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (re) => re.preventDefault(),
            onKeydown: F,
            onFocusin: de,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, B, e.listProps), {
            default: () => {
              var re, Se, ee;
              return [(re = n["prepend-item"]) == null ? void 0 : re.call(n), !P.value.length && !e.hideNoData && (((Se = n["no-data"]) == null ? void 0 : Se.call(n)) ?? w(W0, {
                title: a(e.noDataText)
              }, null)), w(Bm, {
                ref: i,
                renderless: !0,
                items: P.value
              }, {
                default: (he) => {
                  var un;
                  let {
                    item: Ce,
                    index: Re,
                    itemRef: ke
                  } = he;
                  const yt = oe(Ce.props, {
                    ref: ke,
                    key: Re,
                    onClick: () => D(Ce, null)
                  });
                  return ((un = n.item) == null ? void 0 : un.call(n, {
                    item: Ce,
                    index: Re,
                    props: yt
                  })) ?? w(W0, oe(yt, {
                    role: "option"
                  }), {
                    prepend: (Ut) => {
                      let {
                        isSelected: cn
                      } = Ut;
                      return w(Te, null, [e.multiple && !e.hideSelected ? w(ca, {
                        key: Ce.value,
                        modelValue: cn,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, Ce.props.prependAvatar && w(t0, {
                        image: Ce.props.prependAvatar
                      }, null), Ce.props.prependIcon && w(He, {
                        icon: Ce.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (ee = n["append-item"]) == null ? void 0 : ee.call(n)];
            }
          })]
        }), v.value.map((re, Se) => {
          function ee(ke) {
            ke.stopPropagation(), ke.preventDefault(), D(re, !1);
          }
          const he = {
            "onClick:close": ee,
            onKeydown(ke) {
              ke.key !== "Enter" && ke.key !== " " || (ke.preventDefault(), ke.stopPropagation(), ee(ke));
            },
            onMousedown(ke) {
              ke.preventDefault(), ke.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, Ce = R ? !!n.chip : !!n.selection, Re = Ce ? _o(R ? n.chip({
            item: re,
            index: Se,
            props: he
          }) : n.selection({
            item: re,
            index: Se
          })) : void 0;
          if (!(Ce && !Re))
            return w("div", {
              key: re.value,
              class: "v-select__selection"
            }, [R ? n.chip ? w(tt, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: re.title
                }
              }
            }, {
              default: () => [Re]
            }) : w(Bs, oe({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: re.title,
              disabled: re.props.disabled
            }, he), null) : Re ?? w("span", {
              class: "v-select__selection-text"
            }, [re.title, e.multiple && Se < v.value.length - 1 && w("span", {
              class: "v-select__selection-comma"
            }, [V0(",")])])]);
        })]),
        "append-inner": function() {
          var he;
          for (var re = arguments.length, Se = new Array(re), ee = 0; ee < re; ee++)
            Se[ee] = arguments[ee];
          return w(Te, null, [(he = n["append-inner"]) == null ? void 0 : he.call(n, ...Se), e.menuIcon ? w(He, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), Xr({
      isFocused: x,
      menu: s,
      select: D
    }, r);
  }
}), Vm = U({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), Qs = Symbol.for("vuetify:data-table-pagination");
function Em(e) {
  const t = Be(e, "page", void 0, (a) => +(a ?? 1)), n = Be(e, "itemsPerPage", void 0, (a) => +(a ?? 10));
  return {
    page: t,
    itemsPerPage: n
  };
}
function Om(e) {
  const {
    page: t,
    itemsPerPage: n,
    itemsLength: a
  } = e, r = M(() => n.value === -1 ? 0 : n.value * (t.value - 1)), l = M(() => n.value === -1 ? a.value : Math.min(a.value, r.value + n.value)), i = M(() => n.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / n.value));
  ge([t, i], () => {
    t.value > i.value && (t.value = i.value);
  });
  function o(v) {
    n.value = v, t.value = 1;
  }
  function s() {
    t.value = gt(t.value + 1, 1, i.value);
  }
  function c() {
    t.value = gt(t.value - 1, 1, i.value);
  }
  function m(v) {
    t.value = gt(v, 1, i.value);
  }
  const f = {
    page: t,
    itemsPerPage: n,
    startIndex: r,
    stopIndex: l,
    pageCount: i,
    itemsLength: a,
    nextPage: s,
    prevPage: c,
    setPage: m,
    setItemsPerPage: o
  };
  return Ge(Qs, f), f;
}
function _m() {
  const e = Ve(Qs);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Lm(e) {
  const t = _e("usePaginatedItems"), {
    items: n,
    startIndex: a,
    stopIndex: r,
    itemsPerPage: l
  } = e, i = M(() => l.value <= 0 ? n.value : n.value.slice(a.value, r.value));
  return ge(i, (o) => {
    t.emit("update:currentItems", o);
  }), {
    paginatedItems: i
  };
}
const Js = U({
  prevIcon: {
    type: be,
    default: "$prev"
  },
  nextIcon: {
    type: be,
    default: "$next"
  },
  firstIcon: {
    type: be,
    default: "$first"
  },
  lastIcon: {
    type: be,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter"), Ci = se()({
  name: "VDataTableFooter",
  props: Js(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = ln(), {
      page: r,
      pageCount: l,
      startIndex: i,
      stopIndex: o,
      itemsLength: s,
      itemsPerPage: c,
      setItemsPerPage: m
    } = _m(), f = M(() => e.itemsPerPageOptions.map((v) => typeof v == "number" ? {
      value: v,
      title: v === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(v)
    } : {
      ...v,
      title: isNaN(Number(v.title)) ? a(v.title) : v.title
    }));
    return ve(() => {
      var g;
      const v = si.filterProps(e);
      return w("div", {
        class: "v-data-table-footer"
      }, [(g = n.prepend) == null ? void 0 : g.call(n), w("div", {
        class: "v-data-table-footer__items-per-page"
      }, [w("span", null, [a(e.itemsPerPageText)]), w(Zs, {
        items: f.value,
        modelValue: c.value,
        "onUpdate:modelValue": (p) => m(Number(p)),
        density: "compact",
        variant: "outlined",
        "hide-details": !0
      }, null)]), w("div", {
        class: "v-data-table-footer__info"
      }, [w("div", null, [a(e.pageText, s.value ? i.value + 1 : 0, o.value, s.value)])]), w("div", {
        class: "v-data-table-footer__pagination"
      }, [w(si, oe({
        modelValue: r.value,
        "onUpdate:modelValue": (p) => r.value = p,
        density: "comfortable",
        "first-aria-label": e.firstPageLabel,
        "last-aria-label": e.lastPageLabel,
        length: l.value,
        "next-aria-label": e.nextPageLabel,
        "previous-aria-label": e.prevPageLabel,
        rounded: !0,
        "show-first-last-page": !0,
        "total-visible": e.showCurrentPage ? 1 : 0,
        variant: "plain"
      }, v), null)])]);
    }), {};
  }
}), U0 = nd({
  align: {
    type: String,
    default: "start"
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (e, t) => {
  let {
    slots: n
  } = t;
  const a = e.tag ?? "td";
  return w(a, {
    class: ["v-data-table__td", {
      "v-data-table-column--fixed": e.fixed,
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap
    }, `v-data-table-column--align-${e.align}`],
    style: {
      height: ce(e.height),
      width: ce(e.width),
      maxWidth: ce(e.maxWidth),
      left: ce(e.fixedOffset || null)
    }
  }, {
    default: () => {
      var r;
      return [(r = n.default) == null ? void 0 : r.call(n)];
    }
  });
}), Rm = U({
  headers: Array
}, "DataTable-header"), eu = Symbol.for("vuetify:data-table-headers"), tu = {
  title: "",
  sortable: !1
}, Nm = {
  ...tu,
  width: 48
};
function Dm() {
  const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).map((n) => ({
    element: n,
    priority: 0
  }));
  return {
    enqueue: (n, a) => {
      let r = !1;
      for (let l = 0; l < t.length; l++)
        if (t[l].priority > a) {
          t.splice(l, 0, {
            element: n,
            priority: a
          }), r = !0;
          break;
        }
      r || t.push({
        element: n,
        priority: a
      });
    },
    size: () => t.length,
    count: () => {
      let n = 0;
      if (!t.length) return 0;
      const a = Math.floor(t[0].priority);
      for (let r = 0; r < t.length; r++)
        Math.floor(t[r].priority) === a && (n += 1);
      return n;
    },
    dequeue: () => t.shift()
  };
}
function ir(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    t.push(e);
  else
    for (const n of e.children)
      ir(n, t);
  return t;
}
function nu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const n of e)
    n.key && t.add(n.key), n.children && nu(n.children, t);
  return t;
}
function Fm(e) {
  if (e.key) {
    if (e.key === "data-table-group") return tu;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return Nm;
  }
}
function Zr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(t, ...e.children.map((n) => Zr(n, t + 1))) : t;
}
function qm(e) {
  let t = !1;
  function n(l) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (l)
      if (i && (l.fixed = !0), l.fixed)
        if (l.children)
          for (let o = l.children.length - 1; o >= 0; o--)
            n(l.children[o], !0);
        else
          t ? isNaN(+l.width) && _r(`Multiple fixed columns should have a static width (key: ${l.key})`) : l.lastFixed = !0, t = !0;
      else if (l.children)
        for (let o = l.children.length - 1; o >= 0; o--)
          n(l.children[o]);
      else
        t = !1;
  }
  for (let l = e.length - 1; l >= 0; l--)
    n(e[l]);
  function a(l) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!l) return i;
    if (l.children) {
      l.fixedOffset = i;
      for (const o of l.children)
        i = a(o, i);
    } else l.fixed && (l.fixedOffset = i, i += parseFloat(l.width || "0") || 0);
    return i;
  }
  let r = 0;
  for (const l of e)
    r = a(l, r);
}
function Hm(e, t) {
  const n = [];
  let a = 0;
  const r = Dm(e);
  for (; r.size() > 0; ) {
    let i = r.count();
    const o = [];
    let s = 1;
    for (; i > 0; ) {
      const {
        element: c,
        priority: m
      } = r.dequeue(), f = t - a - Zr(c);
      if (o.push({
        ...c,
        rowspan: f ?? 1,
        colspan: c.children ? ir(c).length : 1
      }), c.children)
        for (const v of c.children) {
          const g = m % 1 + s / Math.pow(10, a + 2);
          r.enqueue(v, a + f + g);
        }
      s += 1, i -= 1;
    }
    a += 1, n.push(o);
  }
  return {
    columns: e.map((i) => ir(i)).flat(),
    headers: n
  };
}
function au(e) {
  const t = [];
  for (const n of e) {
    const a = {
      ...Fm(n),
      ...n
    }, r = a.key ?? (typeof a.value == "string" ? a.value : null), l = a.value ?? r ?? null, i = {
      ...a,
      key: r,
      value: l,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? au(a.children) : void 0
    };
    t.push(i);
  }
  return t;
}
function $m(e, t) {
  const n = ae([]), a = ae([]), r = ae({}), l = ae({}), i = ae({});
  kt(() => {
    var b, x, S;
    const c = (e.headers || Object.keys(e.items[0] ?? {}).map((A) => ({
      key: A,
      title: sr(A)
    }))).slice(), m = nu(c);
    (b = t == null ? void 0 : t.groupBy) != null && b.value.length && !m.has("data-table-group") && c.unshift({
      key: "data-table-group",
      title: "Group"
    }), (x = t == null ? void 0 : t.showSelect) != null && x.value && !m.has("data-table-select") && c.unshift({
      key: "data-table-select"
    }), (S = t == null ? void 0 : t.showExpand) != null && S.value && !m.has("data-table-expand") && c.push({
      key: "data-table-expand"
    });
    const f = au(c);
    qm(f);
    const v = Math.max(...f.map((A) => Zr(A))) + 1, g = Hm(f, v);
    n.value = g.headers, a.value = g.columns;
    const p = g.headers.flat(1);
    for (const A of p)
      A.key && (A.sortable && (A.sort && (r.value[A.key] = A.sort), A.sortRaw && (l.value[A.key] = A.sortRaw)), A.filter && (i.value[A.key] = A.filter));
  });
  const o = {
    headers: n,
    columns: a,
    sortFunctions: r,
    sortRawFunctions: l,
    filterFunctions: i
  };
  return Ge(eu, o), o;
}
function da() {
  const e = Ve(eu);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const Gm = {
  showSelectAll: !1,
  allSelected: () => [],
  select: (e) => {
    var a;
    let {
      items: t,
      value: n
    } = e;
    return new Set(n ? [(a = t[0]) == null ? void 0 : a.value] : []);
  },
  selectAll: (e) => {
    let {
      selected: t
    } = e;
    return t;
  }
}, ru = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      currentPage: t
    } = e;
    return t;
  },
  select: (e) => {
    let {
      items: t,
      value: n,
      selected: a
    } = e;
    for (const r of t)
      n ? a.add(r.value) : a.delete(r.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: t,
      currentPage: n,
      selected: a
    } = e;
    return ru.select({
      items: n,
      value: t,
      selected: a
    });
  }
}, lu = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      allItems: t
    } = e;
    return t;
  },
  select: (e) => {
    let {
      items: t,
      value: n,
      selected: a
    } = e;
    for (const r of t)
      n ? a.add(r.value) : a.delete(r.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: t,
      allItems: n,
      selected: a
    } = e;
    return lu.select({
      items: n,
      value: t,
      selected: a
    });
  }
}, Wm = U({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: {
    type: Function,
    default: rn
  }
}, "DataTable-select"), iu = Symbol.for("vuetify:data-table-selection");
function jm(e, t) {
  let {
    allItems: n,
    currentPage: a
  } = t;
  const r = Be(e, "modelValue", e.modelValue, (S) => new Set(Ye(S).map((A) => {
    var V;
    return ((V = n.value.find((P) => e.valueComparator(A, P.value))) == null ? void 0 : V.value) ?? A;
  })), (S) => [...S.values()]), l = M(() => n.value.filter((S) => S.selectable)), i = M(() => a.value.filter((S) => S.selectable)), o = M(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return Gm;
      case "all":
        return lu;
      case "page":
      default:
        return ru;
    }
  });
  function s(S) {
    return Ye(S).every((A) => r.value.has(A.value));
  }
  function c(S) {
    return Ye(S).some((A) => r.value.has(A.value));
  }
  function m(S, A) {
    const V = o.value.select({
      items: S,
      value: A,
      selected: new Set(r.value)
    });
    r.value = V;
  }
  function f(S) {
    m([S], !s([S]));
  }
  function v(S) {
    const A = o.value.selectAll({
      value: S,
      allItems: l.value,
      currentPage: i.value,
      selected: new Set(r.value)
    });
    r.value = A;
  }
  const g = M(() => r.value.size > 0), p = M(() => {
    const S = o.value.allSelected({
      allItems: l.value,
      currentPage: i.value
    });
    return !!S.length && s(S);
  }), b = M(() => o.value.showSelectAll), x = {
    toggleSelect: f,
    select: m,
    selectAll: v,
    isSelected: s,
    isSomeSelected: c,
    someSelected: g,
    allSelected: p,
    showSelectAll: b
  };
  return Ge(iu, x), x;
}
function ma() {
  const e = Ve(iu);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const Um = U({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort"), ou = Symbol.for("vuetify:data-table-sort");
function Ym(e) {
  const t = Be(e, "sortBy"), n = J(e, "mustSort"), a = J(e, "multiSort");
  return {
    sortBy: t,
    mustSort: n,
    multiSort: a
  };
}
function Km(e) {
  const {
    sortBy: t,
    mustSort: n,
    multiSort: a,
    page: r
  } = e, l = (s) => {
    if (s.key == null) return;
    let c = t.value.map((f) => ({
      ...f
    })) ?? [];
    const m = c.find((f) => f.key === s.key);
    m ? m.order === "desc" ? n.value ? m.order = "asc" : c = c.filter((f) => f.key !== s.key) : m.order = "desc" : a.value ? c = [...c, {
      key: s.key,
      order: "asc"
    }] : c = [{
      key: s.key,
      order: "asc"
    }], t.value = c, r && (r.value = 1);
  };
  function i(s) {
    return !!t.value.find((c) => c.key === s.key);
  }
  const o = {
    sortBy: t,
    toggleSort: l,
    isSorted: i
  };
  return Ge(ou, o), o;
}
function su() {
  const e = Ve(ou);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function Xm(e, t, n, a) {
  const r = ln();
  return {
    sortedItems: M(() => {
      var i, o;
      return n.value.length ? Zm(t.value, n.value, r.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(i = a == null ? void 0 : a.sortFunctions) == null ? void 0 : i.value
        },
        sortRawFunctions: (o = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : o.value
      }) : t.value;
    })
  };
}
function Zm(e, t, n, a) {
  const r = new Intl.Collator(n, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((i) => [i, a != null && a.transform ? a.transform(i) : i]).sort((i, o) => {
    var s, c;
    for (let m = 0; m < t.length; m++) {
      let f = !1;
      const v = t[m].key, g = t[m].order ?? "asc";
      if (g === !1) continue;
      let p = Zn(i[1], v), b = Zn(o[1], v), x = i[0].raw, S = o[0].raw;
      if (g === "desc" && ([p, b] = [b, p], [x, S] = [S, x]), (s = a == null ? void 0 : a.sortRawFunctions) != null && s[v]) {
        const A = a.sortRawFunctions[v](x, S);
        if (A == null) continue;
        if (f = !0, A) return A;
      }
      if ((c = a == null ? void 0 : a.sortFunctions) != null && c[v]) {
        const A = a.sortFunctions[v](p, b);
        if (A == null) continue;
        if (f = !0, A) return A;
      }
      if (!f) {
        if (p instanceof Date && b instanceof Date)
          return p.getTime() - b.getTime();
        if ([p, b] = [p, b].map((A) => A != null ? A.toString().toLocaleLowerCase() : A), p !== b)
          return S0(p) && S0(b) ? 0 : S0(p) ? -1 : S0(b) ? 1 : !isNaN(p) && !isNaN(b) ? Number(p) - Number(b) : r.compare(p, b);
      }
    }
    return 0;
  }).map((i) => {
    let [o] = i;
    return o;
  });
}
const uu = U({
  color: String,
  sticky: Boolean,
  disableSort: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: be,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: be,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  ...la(),
  ...$r()
}, "VDataTableHeaders"), Ai = se()({
  name: "VDataTableHeaders",
  props: uu(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = ln(), {
      toggleSort: r,
      sortBy: l,
      isSorted: i
    } = su(), {
      someSelected: o,
      allSelected: s,
      selectAll: c,
      showSelectAll: m
    } = ma(), {
      columns: f,
      headers: v
    } = da(), {
      loaderClasses: g
    } = Gr(e);
    function p(B, E) {
      if (!(!e.sticky && !B.fixed))
        return {
          position: "sticky",
          left: B.fixed ? ce(B.fixedOffset) : void 0,
          top: e.sticky ? `calc(var(--v-table-header-height) * ${E})` : void 0
        };
    }
    function b(B) {
      const E = l.value.find((j) => j.key === B.key);
      return E ? E.order === "asc" ? e.sortAscIcon : e.sortDescIcon : e.sortAscIcon;
    }
    const {
      backgroundColorClasses: x,
      backgroundColorStyles: S
    } = St(e, "color"), {
      displayClasses: A,
      mobile: V
    } = bn(e), P = M(() => ({
      headers: v.value,
      columns: f.value,
      toggleSort: r,
      isSorted: i,
      sortBy: l.value,
      someSelected: o.value,
      allSelected: s.value,
      selectAll: c,
      getSortIcon: b
    })), z = M(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky
    }, A.value, g.value]), _ = (B) => {
      let {
        column: E,
        x: j,
        y: F
      } = B;
      const L = E.key === "data-table-select" || E.key === "data-table-expand", D = oe(e.headerProps ?? {}, E.headerProps ?? {});
      return w(U0, oe({
        tag: "th",
        align: E.align,
        class: [{
          "v-data-table__th--sortable": E.sortable && !e.disableSort,
          "v-data-table__th--sorted": i(E),
          "v-data-table__th--fixed": E.fixed
        }, ...z.value],
        style: {
          width: ce(E.width),
          minWidth: ce(E.minWidth),
          maxWidth: ce(E.maxWidth),
          ...p(E, F)
        },
        colspan: E.colspan,
        rowspan: E.rowspan,
        onClick: E.sortable ? () => r(E) : void 0,
        fixed: E.fixed,
        nowrap: E.nowrap,
        lastFixed: E.lastFixed,
        noPadding: L
      }, D), {
        default: () => {
          var te;
          const $ = `header.${E.key}`, Z = {
            column: E,
            selectAll: c,
            isSorted: i,
            toggleSort: r,
            sortBy: l.value,
            someSelected: o.value,
            allSelected: s.value,
            getSortIcon: b
          };
          return n[$] ? n[$](Z) : E.key === "data-table-select" ? ((te = n["header.data-table-select"]) == null ? void 0 : te.call(n, Z)) ?? (m.value && w(ca, {
            modelValue: s.value,
            indeterminate: o.value && !s.value,
            "onUpdate:modelValue": c
          }, null)) : w("div", {
            class: "v-data-table-header__content"
          }, [w("span", null, [E.title]), E.sortable && !e.disableSort && w(He, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: b(E)
          }, null), e.multiSort && i(E) && w("div", {
            key: "badge",
            class: ["v-data-table-header__sort-badge", ...x.value],
            style: S.value
          }, [l.value.findIndex((de) => de.key === E.key) + 1])]);
        }
      });
    }, O = () => {
      const B = oe(e.headerProps ?? {} ?? {}), E = M(() => f.value.filter((F) => (F == null ? void 0 : F.sortable) && !e.disableSort)), j = M(() => {
        if (f.value.find((L) => L.key === "data-table-select") != null)
          return s.value ? "$checkboxOn" : o.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return w(U0, oe({
        tag: "th",
        class: [...z.value],
        colspan: v.value.length + 1
      }, B), {
        default: () => [w("div", {
          class: "v-data-table-header__content"
        }, [w(Zs, {
          chips: !0,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: E.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => l.value = [],
          appendIcon: j.value,
          "onClick:append": () => c(!s.value)
        }, {
          ...n,
          chip: (F) => {
            var L;
            return w(Bs, {
              onClick: (L = F.item.raw) != null && L.sortable ? () => r(F.item.raw) : void 0,
              onMousedown: (D) => {
                D.preventDefault(), D.stopPropagation();
              }
            }, {
              default: () => [F.item.title, w(He, {
                class: ["v-data-table__td-sort-icon", i(F.item.raw) && "v-data-table__td-sort-icon-active"],
                icon: b(F.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    ve(() => V.value ? w("tr", null, [w(O, null, null)]) : w(Te, null, [n.headers ? n.headers(P.value) : v.value.map((B, E) => w("tr", null, [B.map((j, F) => w(_, {
      column: j,
      x: F,
      y: E
    }, null))])), e.loading && w("tr", {
      class: "v-data-table-progress"
    }, [w("th", {
      colspan: f.value.length
    }, [w(Xo, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" ? void 0 : e.loading,
      indeterminate: !0
    }, {
      default: n.loader
    })])])]));
  }
}), Qm = U({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), cu = Symbol.for("vuetify:data-table-group");
function Jm(e) {
  return {
    groupBy: Be(e, "groupBy")
  };
}
function eh(e) {
  const {
    disableSort: t,
    groupBy: n,
    sortBy: a
  } = e, r = ae(/* @__PURE__ */ new Set()), l = M(() => n.value.map((m) => ({
    ...m,
    order: m.order ?? !1
  })).concat(t != null && t.value ? [] : a.value));
  function i(m) {
    return r.value.has(m.id);
  }
  function o(m) {
    const f = new Set(r.value);
    i(m) ? f.delete(m.id) : f.add(m.id), r.value = f;
  }
  function s(m) {
    function f(v) {
      const g = [];
      for (const p of v.items)
        "type" in p && p.type === "group" ? g.push(...f(p)) : g.push(p);
      return g;
    }
    return f({
      type: "group",
      items: m,
      id: "dummy",
      key: "dummy",
      value: "dummy",
      depth: 0
    });
  }
  const c = {
    sortByWithGroups: l,
    toggleGroup: o,
    opened: r,
    groupBy: n,
    extractRows: s,
    isGroupOpen: i
  };
  return Ge(cu, c), c;
}
function du() {
  const e = Ve(cu);
  if (!e) throw new Error("Missing group!");
  return e;
}
function th(e, t) {
  if (!e.length) return [];
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const r = Zn(a.raw, t);
    n.has(r) || n.set(r, []), n.get(r).push(a);
  }
  return n;
}
function mu(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!t.length) return [];
  const r = th(e, t[0]), l = [], i = t.slice(1);
  return r.forEach((o, s) => {
    const c = t[0], m = `${a}_${c}_${s}`;
    l.push({
      depth: n,
      id: m,
      key: c,
      value: s,
      items: i.length ? mu(o, i, n + 1, m) : o,
      type: "group"
    });
  }), l;
}
function hu(e, t) {
  const n = [];
  for (const a of e)
    "type" in a && a.type === "group" ? (a.value != null && n.push(a), (t.has(a.id) || a.value == null) && n.push(...hu(a.items, t))) : n.push(a);
  return n;
}
function nh(e, t, n) {
  return {
    flatItems: M(() => {
      if (!t.value.length) return e.value;
      const r = mu(e.value, t.value.map((l) => l.key));
      return hu(r, n.value);
    })
  };
}
const ah = U({
  item: {
    type: Object,
    required: !0
  }
}, "VDataTableGroupHeaderRow"), rh = se()({
  name: "VDataTableGroupHeaderRow",
  props: ah(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isGroupOpen: a,
      toggleGroup: r,
      extractRows: l
    } = du(), {
      isSelected: i,
      isSomeSelected: o,
      select: s
    } = ma(), {
      columns: c
    } = da(), m = M(() => l([e.item]));
    return () => w("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [c.value.map((f) => {
      var v, g;
      if (f.key === "data-table-group") {
        const p = a(e.item) ? "$expand" : "$next", b = () => r(e.item);
        return ((v = n["data-table-group"]) == null ? void 0 : v.call(n, {
          item: e.item,
          count: m.value.length,
          props: {
            icon: p,
            onClick: b
          }
        })) ?? w(U0, {
          class: "v-data-table-group-header-row__column"
        }, {
          default: () => [w(Xt, {
            size: "small",
            variant: "text",
            icon: p,
            onClick: b
          }, null), w("span", null, [e.item.value]), w("span", null, [V0("("), m.value.length, V0(")")])]
        });
      }
      if (f.key === "data-table-select") {
        const p = i(m.value), b = o(m.value) && !p, x = (S) => s(m.value, S);
        return ((g = n["data-table-select"]) == null ? void 0 : g.call(n, {
          props: {
            modelValue: p,
            indeterminate: b,
            "onUpdate:modelValue": x
          }
        })) ?? w("td", null, [w(ca, {
          modelValue: p,
          indeterminate: b,
          "onUpdate:modelValue": x
        }, null)]);
      }
      return w("td", null, null);
    })]);
  }
}), lh = U({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), fu = Symbol.for("vuetify:datatable:expanded");
function ih(e) {
  const t = J(e, "expandOnClick"), n = Be(e, "expanded", e.expanded, (o) => new Set(o), (o) => [...o.values()]);
  function a(o, s) {
    const c = new Set(n.value);
    s ? c.add(o.value) : c.delete(o.value), n.value = c;
  }
  function r(o) {
    return n.value.has(o.value);
  }
  function l(o) {
    a(o, !r(o));
  }
  const i = {
    expand: a,
    expanded: n,
    expandOnClick: t,
    isExpanded: r,
    toggleExpand: l
  };
  return Ge(fu, i), i;
}
function vu() {
  const e = Ve(fu);
  if (!e) throw new Error("foo");
  return e;
}
const oh = U({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: je(),
  onContextmenu: je(),
  onDblclick: je(),
  ...la()
}, "VDataTableRow"), sh = se()({
  name: "VDataTableRow",
  props: oh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      displayClasses: a,
      mobile: r
    } = bn(e, "v-data-table__tr"), {
      isSelected: l,
      toggleSelect: i,
      someSelected: o,
      allSelected: s,
      selectAll: c
    } = ma(), {
      isExpanded: m,
      toggleExpand: f
    } = vu(), {
      toggleSort: v,
      sortBy: g,
      isSorted: p
    } = su(), {
      columns: b
    } = da();
    ve(() => w("tr", {
      class: ["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value],
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && b.value.map((x, S) => {
      const A = e.item, V = `item.${x.key}`, P = `header.${x.key}`, z = {
        index: e.index,
        item: A.raw,
        internalItem: A,
        value: Zn(A.columns, x.key),
        column: x,
        isSelected: l,
        toggleSelect: i,
        isExpanded: m,
        toggleExpand: f
      }, _ = {
        column: x,
        selectAll: c,
        isSorted: p,
        toggleSort: v,
        sortBy: g.value,
        someSelected: o.value,
        allSelected: s.value,
        getSortIcon: () => ""
      }, O = typeof e.cellProps == "function" ? e.cellProps({
        index: z.index,
        item: z.item,
        internalItem: z.internalItem,
        value: z.value,
        column: x
      }) : e.cellProps, B = typeof x.cellProps == "function" ? x.cellProps({
        index: z.index,
        item: z.item,
        internalItem: z.internalItem,
        value: z.value
      }) : x.cellProps;
      return w(U0, oe({
        align: x.align,
        class: {
          "v-data-table__td--expanded-row": x.key === "data-table-expand",
          "v-data-table__td--select-row": x.key === "data-table-select"
        },
        fixed: x.fixed,
        fixedOffset: x.fixedOffset,
        lastFixed: x.lastFixed,
        maxWidth: r.value ? void 0 : x.maxWidth,
        noPadding: x.key === "data-table-select" || x.key === "data-table-expand",
        nowrap: x.nowrap,
        width: r.value ? void 0 : x.width
      }, O, B), {
        default: () => {
          var j, F, L, D, $;
          if (n[V] && !r.value) return (j = n[V]) == null ? void 0 : j.call(n, z);
          if (x.key === "data-table-select")
            return ((F = n["item.data-table-select"]) == null ? void 0 : F.call(n, z)) ?? w(ca, {
              disabled: !A.selectable,
              modelValue: l([A]),
              onClick: Qr(() => i(A), ["stop"])
            }, null);
          if (x.key === "data-table-expand")
            return ((L = n["item.data-table-expand"]) == null ? void 0 : L.call(n, z)) ?? w(Xt, {
              icon: m(A) ? "$collapse" : "$expand",
              size: "small",
              variant: "text",
              onClick: Qr(() => f(A), ["stop"])
            }, null);
          const E = Da(z.value);
          return r.value ? w(Te, null, [w("div", {
            class: "v-data-table__td-title"
          }, [((D = n[P]) == null ? void 0 : D.call(n, _)) ?? x.title]), w("div", {
            class: "v-data-table__td-value"
          }, [(($ = n[V]) == null ? void 0 : $.call(n, z)) ?? E])]) : E;
        }
      });
    })]));
  }
}), gu = U({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...la()
}, "VDataTableRows"), Mi = se()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: gu(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      columns: r
    } = da(), {
      expandOnClick: l,
      toggleExpand: i,
      isExpanded: o
    } = vu(), {
      isSelected: s,
      toggleSelect: c
    } = ma(), {
      toggleGroup: m,
      isGroupOpen: f
    } = du(), {
      t: v
    } = ln(), {
      mobile: g
    } = bn(e);
    return ve(() => {
      var p, b;
      return e.loading && (!e.items.length || a.loading) ? w("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [w("td", {
        colspan: r.value.length
      }, [((p = a.loading) == null ? void 0 : p.call(a)) ?? v(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? w("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [w("td", {
        colspan: r.value.length
      }, [((b = a["no-data"]) == null ? void 0 : b.call(a)) ?? v(e.noDataText)])]) : w(Te, null, [e.items.map((x, S) => {
        var P;
        if (x.type === "group") {
          const z = {
            index: S,
            item: x,
            columns: r.value,
            isExpanded: o,
            toggleExpand: i,
            isSelected: s,
            toggleSelect: c,
            toggleGroup: m,
            isGroupOpen: f
          };
          return a["group-header"] ? a["group-header"](z) : w(rh, oe({
            key: `group-header_${x.id}`,
            item: x
          }, ei(n, ":group-header", () => z)), a);
        }
        const A = {
          index: S,
          item: x.raw,
          internalItem: x,
          columns: r.value,
          isExpanded: o,
          toggleExpand: i,
          isSelected: s,
          toggleSelect: c
        }, V = {
          ...A,
          props: oe({
            key: `item_${x.key ?? x.index}`,
            onClick: l.value ? () => {
              i(x);
            } : void 0,
            index: S,
            item: x,
            cellProps: e.cellProps,
            mobile: g.value
          }, ei(n, ":row", () => A), typeof e.rowProps == "function" ? e.rowProps({
            item: A.item,
            index: A.index,
            internalItem: A.internalItem
          }) : e.rowProps)
        };
        return w(Te, {
          key: V.props.key
        }, [a.item ? a.item(V) : w(sh, V.props, a), o(x) && ((P = a["expanded-row"]) == null ? void 0 : P.call(a, A))]);
      })]);
    }), {};
  }
}), pu = U({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...we(),
  ...zt(),
  ...We(),
  ...qe()
}, "VTable"), Ti = se()({
  name: "VTable",
  props: pu(),
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const {
      themeClasses: r
    } = Ue(e), {
      densityClasses: l
    } = jt(e);
    return ve(() => w(e.tag, {
      class: ["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!n.top,
        "v-table--has-bottom": !!n.bottom,
        "v-table--hover": e.hover
      }, r.value, l.value, e.class],
      style: e.style
    }, {
      default: () => {
        var i, o, s;
        return [(i = n.top) == null ? void 0 : i.call(n), n.default ? w("div", {
          class: "v-table__wrapper",
          style: {
            height: ce(e.height)
          }
        }, [w("table", null, [n.default()])]) : (o = n.wrapper) == null ? void 0 : o.call(n), (s = n.bottom) == null ? void 0 : s.call(n)];
      }
    })), {};
  }
}), uh = U({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function ch(e, t, n, a) {
  const r = e.returnObject ? t : et(t, e.itemValue), l = et(t, e.itemSelectable, !0), i = a.reduce((o, s) => (s.key != null && (o[s.key] = et(t, s.value)), o), {});
  return {
    type: "item",
    key: e.returnObject ? et(t, e.itemValue) : r,
    index: n,
    value: r,
    selectable: l,
    columns: i,
    raw: t
  };
}
function dh(e, t, n) {
  return t.map((a, r) => ch(e, a, r, n));
}
function mh(e, t) {
  return {
    items: M(() => dh(e, e.items, t.value))
  };
}
function hh(e) {
  let {
    page: t,
    itemsPerPage: n,
    sortBy: a,
    groupBy: r,
    search: l
  } = e;
  const i = _e("VDataTable"), o = M(() => ({
    page: t.value,
    itemsPerPage: n.value,
    sortBy: a.value,
    groupBy: r.value,
    search: l.value
  }));
  let s = null;
  ge(o, () => {
    rn(s, o.value) || (s && s.search !== o.value.search && (t.value = 1), i.emit("update:options", o.value), s = o.value);
  }, {
    deep: !0,
    immediate: !0
  });
}
const fh = (e, t, n) => e == null || t == null ? -1 : e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()), vh = U({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function gh(e, t, n) {
  var o;
  const a = [], r = (n == null ? void 0 : n.default) ?? fh, l = n != null && n.filterKeys ? Ye(n.filterKeys) : !1, i = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let s = 0; s < e.length; s++) {
    const [c, m = c] = Ye(e[s]), f = {}, v = {};
    let g = -1;
    if ((t || i > 0) && !(n != null && n.noFilter)) {
      if (typeof c == "object") {
        const x = l || Object.keys(m);
        for (const S of x) {
          const A = et(m, S), V = (o = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : o[S];
          if (g = V ? V(A, t, c) : r(A, t, c), g !== -1 && g !== !1)
            V ? f[S] = g : v[S] = g;
          else if ((n == null ? void 0 : n.filterMode) === "every")
            continue e;
        }
      } else
        g = r(c, t, c), g !== -1 && g !== !1 && (v.title = g);
      const p = Object.keys(v).length, b = Object.keys(f).length;
      if (!p && !b || (n == null ? void 0 : n.filterMode) === "union" && b !== i && !p || (n == null ? void 0 : n.filterMode) === "intersection" && (b !== i || !p)) continue;
    }
    a.push({
      index: s,
      matches: {
        ...v,
        ...f
      }
    });
  }
  return a;
}
function ph(e, t, n, a) {
  const r = ae([]), l = ae(/* @__PURE__ */ new Map()), i = M(() => a != null && a.transform ? De(t).map((s) => [s, a.transform(s)]) : De(t));
  kt(() => {
    const s = typeof n == "function" ? n() : De(n), c = typeof s != "string" && typeof s != "number" ? "" : String(s), m = gh(i.value, c, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...De(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), f = De(t), v = [], g = /* @__PURE__ */ new Map();
    m.forEach((p) => {
      let {
        index: b,
        matches: x
      } = p;
      const S = f[b];
      v.push(S), g.set(S.value, x);
    }), r.value = v, l.value = g;
  });
  function o(s) {
    return l.value.get(s.value);
  }
  return {
    filteredItems: r,
    filteredMatches: l,
    getMatches: o
  };
}
const yh = U({
  ...gu(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...lh(),
  ...Qm(),
  ...Rm(),
  ...uh(),
  ...Wm(),
  ...Um(),
  ...uu(),
  ...pu()
}, "DataTable"), bh = U({
  ...Vm(),
  ...yh(),
  ...vh(),
  ...Js()
}, "VDataTable"), xh = se()({
  name: "VDataTable",
  props: bh(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:page": (e) => !0,
    "update:itemsPerPage": (e) => !0,
    "update:sortBy": (e) => !0,
    "update:options": (e) => !0,
    "update:groupBy": (e) => !0,
    "update:expanded": (e) => !0,
    "update:currentItems": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      groupBy: r
    } = Jm(e), {
      sortBy: l,
      multiSort: i,
      mustSort: o
    } = Ym(e), {
      page: s,
      itemsPerPage: c
    } = Em(e), {
      disableSort: m
    } = or(e), {
      columns: f,
      headers: v,
      sortFunctions: g,
      sortRawFunctions: p,
      filterFunctions: b
    } = $m(e, {
      groupBy: r,
      showSelect: J(e, "showSelect"),
      showExpand: J(e, "showExpand")
    }), {
      items: x
    } = mh(e, f), S = J(e, "search"), {
      filteredItems: A
    } = ph(e, x, S, {
      transform: (he) => he.columns,
      customKeyFilter: b
    }), {
      toggleSort: V
    } = Km({
      sortBy: l,
      multiSort: i,
      mustSort: o,
      page: s
    }), {
      sortByWithGroups: P,
      opened: z,
      extractRows: _,
      isGroupOpen: O,
      toggleGroup: B
    } = eh({
      groupBy: r,
      sortBy: l,
      disableSort: m
    }), {
      sortedItems: E
    } = Xm(e, A, P, {
      transform: (he) => ({
        ...he.raw,
        ...he.columns
      }),
      sortFunctions: g,
      sortRawFunctions: p
    }), {
      flatItems: j
    } = nh(E, r, z), F = M(() => j.value.length), {
      startIndex: L,
      stopIndex: D,
      pageCount: $,
      setItemsPerPage: Z
    } = Om({
      page: s,
      itemsPerPage: c,
      itemsLength: F
    }), {
      paginatedItems: te
    } = Lm({
      items: j,
      startIndex: L,
      stopIndex: D,
      itemsPerPage: c
    }), de = M(() => _(te.value)), {
      isSelected: me,
      select: R,
      selectAll: N,
      toggleSelect: H,
      someSelected: Y,
      allSelected: ye
    } = jm(e, {
      allItems: x,
      currentPage: de
    }), {
      isExpanded: re,
      toggleExpand: Se
    } = ih(e);
    hh({
      page: s,
      itemsPerPage: c,
      sortBy: l,
      groupBy: r,
      search: S
    }), nn({
      VDataTableRows: {
        hideNoData: J(e, "hideNoData"),
        noDataText: J(e, "noDataText"),
        loading: J(e, "loading"),
        loadingText: J(e, "loadingText")
      }
    });
    const ee = M(() => ({
      page: s.value,
      itemsPerPage: c.value,
      sortBy: l.value,
      pageCount: $.value,
      toggleSort: V,
      setItemsPerPage: Z,
      someSelected: Y.value,
      allSelected: ye.value,
      isSelected: me,
      select: R,
      selectAll: N,
      toggleSelect: H,
      isExpanded: re,
      toggleExpand: Se,
      isGroupOpen: O,
      toggleGroup: B,
      items: de.value.map((he) => he.raw),
      internalItems: de.value,
      groupedItems: te.value,
      columns: f.value,
      headers: v.value
    }));
    return ve(() => {
      const he = Ci.filterProps(e), Ce = Ai.filterProps(e), Re = Mi.filterProps(e), ke = Ti.filterProps(e);
      return w(Ti, oe({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, ke), {
        top: () => {
          var yt;
          return (yt = a.top) == null ? void 0 : yt.call(a, ee.value);
        },
        default: () => {
          var yt, un, Ut, cn, Dn, Sn;
          return a.default ? a.default(ee.value) : w(Te, null, [(yt = a.colgroup) == null ? void 0 : yt.call(a, ee.value), !e.hideDefaultHeader && w("thead", {
            key: "thead"
          }, [w(Ai, Ce, a)]), (un = a.thead) == null ? void 0 : un.call(a, ee.value), !e.hideDefaultBody && w("tbody", null, [(Ut = a["body.prepend"]) == null ? void 0 : Ut.call(a, ee.value), a.body ? a.body(ee.value) : w(Mi, oe(n, Re, {
            items: te.value
          }), a), (cn = a["body.append"]) == null ? void 0 : cn.call(a, ee.value)]), (Dn = a.tbody) == null ? void 0 : Dn.call(a, ee.value), (Sn = a.tfoot) == null ? void 0 : Sn.call(a, ee.value)]);
        },
        bottom: () => a.bottom ? a.bottom(ee.value) : !e.hideDefaultFooter && w(Te, null, [w(Ls, null, null), w(Ci, he, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
}), wh = U({
  color: String,
  ...on(),
  ...we(),
  ...Gt(),
  ...wn(),
  ...qr(),
  ...Zo(),
  ...pt(),
  ...We(),
  ...qe()
}, "VSheet"), Sh = se()({
  name: "VSheet",
  props: wh(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ue(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: l
    } = St(J(e, "color")), {
      borderClasses: i
    } = xn(e), {
      dimensionStyles: o
    } = Wt(e), {
      elevationClasses: s
    } = Rn(e), {
      locationStyles: c
    } = Hr(e), {
      positionClasses: m
    } = Qo(e), {
      roundedClasses: f
    } = Pt(e);
    return ve(() => w(e.tag, {
      class: ["v-sheet", a.value, r.value, i.value, s.value, m.value, f.value, e.class],
      style: [l.value, o.value, c.value, e.style]
    }, n)), {};
  }
}), kh = {
  key: 0,
  style: { "user-select": "none" }
}, Ch = { key: 1 }, Ah = /* @__PURE__ */ Y0({
  __name: "BCHTool",
  setup(e) {
    const t = ae("10001000011"), n = ae(ft.encode(t.value)), a = M(() => [
      c(n.value.input.asString),
      m(n.value.work[n.value.work.length - 1].asString, ft.codeLength - ft.infoBitsLength)
    ].join(" ")), r = [
      { title: "10進数", value: "index" },
      { title: "情報ビット", value: "infoBits" },
      { title: "符号ビット", value: "codeBits" }
    ];
    let l = 1 / 0;
    const i = [...Array(2048)].map((v, g) => {
      const p = ft.encode(g), b = p.work[p.work.length - 1], x = p.input.asArray.filter((S) => S).length + b.asArray.filter((S) => S).length;
      return x !== 0 && x < l && (l = x), {
        index: g,
        infoBits: c(p.input.asString.padStart(ft.infoBitsLength, "0")),
        codeBits: m(b.asString, ft.codeLength - ft.infoBitsLength)
      };
    });
    function o() {
      n.value = ft.encode(t.value);
    }
    function s(v, g) {
      t.value = g.item.index.toString(2).padStart(11, "0"), o();
    }
    function c(v) {
      return v.split("").map(
        (g, p) => p % 4 === 0 ? " " + g : g
      ).join("");
    }
    function m(v, g) {
      return v.substring(v.length - g).padStart(g, "0");
    }
    function f(v) {
      return /[^01]/.test(v) ? "2進数で入力してください" : v.length !== 11 ? "11bitで入力してください" : !0;
    }
    return (v, g) => (Wn(), Ii($o, null, {
      default: M0(() => [
        w(Sh, { class: "d-flex align-stretch" }, {
          default: M0(() => [
            w(lr, {
              density: "compact",
              label: "2進数",
              modelValue: t.value,
              "onUpdate:modelValue": g[0] || (g[0] = (p) => t.value = p),
              rules: [f]
            }, null, 8, ["modelValue", "rules"]),
            w(Xt, {
              class: "ml-2",
              disabled: f(t.value) !== !0,
              onClick: o
            }, {
              default: M0(() => g[1] || (g[1] = [
                V0("計算する")
              ])),
              _: 1
            }, 8, ["disabled"])
          ]),
          _: 1
        }),
        ha("p", null, " 結果: " + Da(a.value), 1),
        n.value.input.asString.indexOf("1") !== -1 ? (Wn(), Na("div", kh, [
          w(cd, {
            quotient: n.value.quotient.asArray,
            divisor: De(ft).generator.asArray,
            work: n.value.work.map((p) => p.asArray)
          }, null, 8, ["quotient", "divisor", "work"])
        ])) : (Wn(), Na("div", Ch, g[2] || (g[2] = [
          ha("br", null, null, -1)
        ]))),
        ha("p", null, "全結果 最小ハミング距離: " + Da(De(l)), 1),
        w(xh, {
          density: "compact",
          headers: r,
          items: De(i),
          "onClick:row": s
        }, null, 8, ["items"])
      ]),
      _: 1
    }));
  }
}), Bh = {
  install(e, t = {}) {
    e.component("BCHTool", Ah);
  }
};
export {
  Bh as default
};
