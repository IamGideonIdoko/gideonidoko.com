!(function (e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
        ? (exports.Scrambler = t())
        : (e.Scrambler = t());
})(window, function () {
    return (function (e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var i = (t[n] = { i: n, l: !1, exports: {} });
            return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function (e, t, n) {
                r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (r.r = function (e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (r.t = function (e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
                var n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
                    2 & t && 'string' != typeof e)
                )
                    for (var i in e)
                        r.d(
                            n,
                            i,
                            function (t) {
                                return e[t];
                            }.bind(null, i),
                        );
                return n;
            }),
            (r.n = function (e) {
                var t =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return r.d(t, 'a', t), t;
            }),
            (r.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = ''),
            r((r.s = 0))
        );
    })([
        function (e, t, r) {
            'use strict';
            r.r(t);
            t.default = class {
                constructor() {
                    (this.specialCharacters = ['@', '#', '$', '%', '£', '&', '*', '§', '+', '_']),
                        (this.maxCounter = 12),
                        (this.targetText = ''),
                        (this.scrambledText = ''),
                        (this.encodingCounters = []),
                        (this.decodingCounters = []),
                        (this.onScramble = null),
                        (this.frameId = null),
                        (this.frameIndex = 0);
                }
                scramble(e, t) {
                    (this.targetText = e),
                        (this.encodingCounters = this._generateCounters(this.scrambledText)),
                        (this.decodingCounters = this._generateCounters(this.targetText)),
                        (this.onScramble = t),
                        (this.frameId = null),
                        (this.frameIndex = 0),
                        (this.frameId = requestAnimationFrame(() => this._encode()));
                }
                _randomText(e) {
                    let t = '';
                    for (let r = 0; r < e; r += 1)
                        t += this.specialCharacters[Math.floor(Math.random() * this.specialCharacters.length)];
                    return t;
                }
                _generateCounters(e) {
                    return new Array(e.length).fill(0).map(() => Math.floor(Math.random() * this.maxCounter) + 1);
                }
                _encode() {
                    if (0 === this.frameIndex) {
                        if (0 === this.encodingCounters.reduce((e, t) => e + t, 0))
                            return void (this.frameId = requestAnimationFrame(() => this._fill()));
                        for (let e = 0; e < this.encodingCounters.length; e += 1)
                            if (0 !== this.encodingCounters[e])
                                (this.encodingCounters[e] -= 1), this.onScramble(this.scrambledText);
                            else {
                                const t = this.scrambledText.split('');
                                (t[e] = this._randomText(1)), (this.scrambledText = t.join(''));
                            }
                    }
                    (this.frameIndex = (this.frameIndex + 1) % 3),
                        (this.frameId = requestAnimationFrame(() => this._encode()));
                }
                _fill() {
                    if (0 === this.frameIndex) {
                        if (this.scrambledText.length === this.targetText.length)
                            return void (this.frameId = requestAnimationFrame(() => this._decode()));
                        const e = this.scrambledText.length < this.targetText.length ? 1 : -1;
                        (this.scrambledText = this._randomText(this.scrambledText.length + e)),
                            this.onScramble(this.scrambledText);
                    }
                    (this.frameIndex = (this.frameIndex + 1) % 2),
                        (this.frameId = requestAnimationFrame(() => this._fill()));
                }
                _decode() {
                    if (this.scrambledText === this.targetText) cancelAnimationFrame(this.frameId);
                    else {
                        if (0 === this.frameIndex) {
                            let e = '';
                            for (let t = 0; t < this.decodingCounters.length; t += 1)
                                0 !== this.decodingCounters[t]
                                    ? ((e +=
                                          this.specialCharacters[
                                              Math.floor(Math.random() * this.specialCharacters.length)
                                          ]),
                                      (this.decodingCounters[t] -= 1))
                                    : (e += this.targetText[t]);
                            (this.scrambledText = e), this.onScramble(this.scrambledText);
                        }
                        (this.frameIndex = (this.frameIndex + 1) % 4),
                            (this.frameId = requestAnimationFrame(() => this._decode()));
                    }
                }
            };
        },
    ]).default;
});
