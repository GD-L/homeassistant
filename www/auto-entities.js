!(function (t) {
  var e = {};
  function i(r) {
    if (e[r]) return e[r].exports;
    var s = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(s.exports, s, s.exports, i), (s.l = !0), s.exports;
  }
  (i.m = t),
    (i.c = e),
    (i.d = function (t, e, r) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (i.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (i.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var s in t)
          i.d(
            r,
            s,
            function (e) {
              return t[e];
            }.bind(null, s)
          );
      return r;
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = ""),
    i((i.s = 0));
})([
  function (t, e, i) {
    "use strict";
    i.r(e);
    const r = customElements.get("home-assistant-main")
        ? Object.getPrototypeOf(customElements.get("home-assistant-main"))
        : Object.getPrototypeOf(customElements.get("hui-view")),
      s = r.prototype.html;
    r.prototype.css;
    function n() {
      return document.querySelector("hc-main")
        ? document.querySelector("hc-main").hass
        : document.querySelector("home-assistant")
        ? document.querySelector("home-assistant").hass
        : void 0;
    }
    const a = n().callWS({ type: "config/area_registry/list" }),
      o = n().callWS({ type: "config/device_registry/list" }),
      c = n().callWS({ type: "config/entity_registry/list" });
    async function l() {
      return (
        (window.cardToolsData = window.cardToolsData || {
          areas: await a,
          devices: await o,
          entities: await c,
        }),
        window.cardToolsData
      );
    }
    function u(t) {
      const e = window.cardToolsData;
      let i = [];
      if (!t) return i;
      for (const r of e.devices) r.area_id === t.area_id && i.push(r);
      return i;
    }
    function f(t) {
      const e = window.cardToolsData;
      let i = [];
      if (!t) return i;
      for (const r of e.entities) r.device_id === t.id && i.push(r.entity_id);
      return i;
    }
    function d(t, e) {
      if (
        "string" == typeof e &&
        "string" == typeof t &&
        ((t.startsWith("/") && t.endsWith("/")) || -1 !== t.indexOf("*"))
      ) {
        return (
          t.startsWith("/") ||
            (t = `/^${(t = t.replace(/\./g, ".").replace(/\*/g, ".*"))}$/`),
          new RegExp(t.slice(1, -1)).test(e)
        );
      }
      if ("string" == typeof t) {
        if (t.startsWith("<=")) return parseFloat(e) <= parseFloat(t.substr(2));
        if (t.startsWith(">=")) return parseFloat(e) >= parseFloat(t.substr(2));
        if (t.startsWith("<")) return parseFloat(e) < parseFloat(t.substr(1));
        if (t.startsWith(">")) return parseFloat(e) > parseFloat(t.substr(1));
        if (t.startsWith("!")) return parseFloat(e) != parseFloat(t.substr(1));
        if (t.startsWith("=")) return parseFloat(e) == parseFloat(t.substr(1));
      }
      return t === e;
    }
    function h(t, e) {
      return function (i) {
        const r = "string" == typeof i ? t.states[i] : t.states[i.entity];
        if (!i) return !1;
        for (const [s, n] of Object.entries(e))
          switch (s.split(" ")[0]) {
            case "options":
            case "sort":
              break;
            case "domain":
              if (!d(n, r.entity_id.split(".")[0])) return !1;
              break;
            case "entity_id":
              if (!d(n, r.entity_id)) return !1;
              break;
            case "state":
              if (!d(n, r.state)) return !1;
              break;
            case "name":
              if (
                !r.attributes.friendly_name ||
                !d(n, r.attributes.friendly_name)
              )
                return !1;
              break;
            case "group":
              if (
                !(
                  n.startsWith("group.") &&
                  t.states[n] &&
                  t.states[n].attributes.entity_id &&
                  t.states[n].attributes.entity_id.includes(r.entity_id)
                )
              )
                return !1;
              break;
            case "attributes":
              for (const [t, e] of Object.entries(n)) {
                let i = t.trim(),
                  s = r.attributes;
                for (; i && s; ) {
                  let t;
                  ([t, i] = i.split(":")), (s = s[t]);
                }
                if (void 0 === s || (void 0 !== e && !d(e, s))) return !1;
              }
              break;
            case "not":
              if (h(t, n)(i)) return !1;
              break;
            case "device":
              if (!window.cardToolsData || !window.cardToolsData.devices)
                return !1;
              let e = !1;
              for (const t of window.cardToolsData.devices)
                d(n, t.name) && f(t).includes(r.entity_id) && (e = !0);
              if (!e) return !1;
              break;
            case "area":
              if (!window.cardToolsData || !window.cardToolsData.areas)
                return !1;
              let s = !1;
              for (const t of window.cardToolsData.areas)
                d(n, t.name) &&
                  u(t).flatMap(f).includes(r.entity_id) &&
                  (s = !0);
              if (!s) return !1;
              break;
            case "last_changed":
              if (
                !d(
                  n,
                  (new Date().getTime() - new Date(r.last_changed).getTime()) /
                    6e4
                )
              )
                return !1;
              break;
            case "last_updated":
              if (
                !d(
                  n,
                  (new Date().getTime() - new Date(r.last_updated).getTime()) /
                    6e4
                )
              )
                return !1;
              break;
            default:
              return !1;
          }
        return !0;
      };
    }
    function g(t, e) {
      return (
        "string" == typeof e && (e = { method: e }),
        function (i, r) {
          const s = "string" == typeof i ? t.states[i] : t.states[i.entity],
            n = "string" == typeof r ? t.states[r] : t.states[r.entity];
          if (void 0 === s || void 0 === n) return 0;
          const [a, o] = e.reverse ? [-1, 1] : [1, -1];
          function c(t, i) {
            return (
              e.ignore_case && t.toLowerCase && (t = t.toLowerCase()),
              e.ignore_case && i.toLowerCase && (i = i.toLowerCase()),
              e.numeric &&
                ((isNaN(parseFloat(t)) && isNaN(parseFloat(i))) ||
                  ((t = isNaN(parseFloat(t)) ? void 0 : parseFloat(t)),
                  (i = isNaN(parseFloat(i)) ? void 0 : parseFloat(i)))),
              void 0 === t && void 0 === i
                ? 0
                : void 0 === t
                ? a
                : void 0 === i
                ? o
                : t < i
                ? o
                : t > i
                ? a
                : 0
            );
          }
          switch (e.method) {
            case "domain":
              return c(s.entity_id.split(".")[0], n.entity_id.split(".")[0]);
            case "entity_id":
              return c(s.entity_id, n.entity_id);
            case "friendly_name":
            case "name":
              return c(
                s.attributes.friendly_name || s.entity_id.split(".")[1],
                n.attributes.friendly_name || n.entity_id.split(".")[1]
              );
            case "state":
              return c(s.state, n.state);
            case "attribute":
              let t = s.attributes,
                i = n.attributes,
                r = e.attribute;
              for (; r; ) {
                let e;
                if (
                  (([e, r] = r.split(":")),
                  (t = t[e]),
                  (i = i[e]),
                  void 0 === t && void 0 === i)
                )
                  return 0;
                if (void 0 === t) return a;
                if (void 0 === i) return o;
              }
              return c(t, i);
            case "last_changed":
            case "last_updated":
              return (
                (e.numeric = !0),
                c(
                  new Date(n.last_changed).getTime(),
                  new Date(s.last_changed).getTime()
                )
              );
            case "last_triggered":
              return null == s.attributes.last_triggered ||
                null == n.attributes.last_triggered
                ? 0
                : ((e.numeric = !0),
                  c(
                    new Date(n.attributes.last_triggered).getTime(),
                    new Date(s.attributes.last_triggered).getTime()
                  ));
            default:
              return 0;
          }
        }
      );
    }
    function p(t, e, i = null) {
      if (
        (((t = new Event(t, {
          bubbles: !0,
          cancelable: !1,
          composed: !0,
        })).detail = e || {}),
        i)
      )
        i.dispatchEvent(t);
      else {
        var r = (function () {
          var t = document.querySelector("hc-main");
          return (t = t
            ? (t =
                (t =
                  (t = t && t.shadowRoot) && t.querySelector("hc-lovelace")) &&
                t.shadowRoot) && t.querySelector("hui-view")
            : (t =
                (t =
                  (t =
                    (t =
                      (t =
                        (t =
                          ((t =
                            (t =
                              (t =
                                (t =
                                  (t =
                                    document.querySelector("home-assistant")) &&
                                  t.shadowRoot) &&
                                t.querySelector("home-assistant-main")) &&
                              t.shadowRoot) &&
                            t.querySelector(
                              "app-drawer-layout partial-panel-resolver"
                            )) &&
                            t.shadowRoot) ||
                          t) && t.querySelector("ha-panel-lovelace")) &&
                      t.shadowRoot) && t.querySelector("hui-root")) &&
                  t.shadowRoot) && t.querySelector("ha-app-layout #view")) &&
              t.firstElementChild);
        })();
        r && r.dispatchEvent(t);
      }
    }
    l();
    function y(t, e) {
      const i = document.createElement("hui-error-card");
      return i.setConfig({ type: "error", error: t, origConfig: e }), i;
    }
    function m(t, e) {
      if (!e || "object" != typeof e || !e.type)
        return y(`No ${t} type configured`, e);
      let i = e.type;
      if (
        ((i = i.startsWith("custom:")
          ? i.substr("custom:".length)
          : `hui-${i}-${t}`),
        customElements.get(i))
      )
        return (function (t, e) {
          const i = document.createElement(t);
          try {
            i.setConfig(e);
          } catch (t) {
            return y(t, e);
          }
          return i;
        })(i, e);
      const r = y(`Custom element doesn't exist: ${i}.`, e);
      r.style.display = "None";
      const s = setTimeout(() => {
        r.style.display = "";
      }, 2e3);
      return (
        customElements.whenDefined(i).then(() => {
          clearTimeout(s), p("ll-rebuild", {}, r);
        }),
        r
      );
    }
    let _ = (function () {
      if (window.fully && "function" == typeof fully.getDeviceId)
        return fully.getDeviceId();
      if (!localStorage["lovelace-player-device-id"]) {
        const t = () =>
          Math.floor(1e5 * (1 + Math.random()))
            .toString(16)
            .substring(1);
        localStorage["lovelace-player-device-id"] = `${t()}${t()}-${t()}${t()}`;
      }
      return localStorage["lovelace-player-device-id"];
    })();
    customElements.define(
      "auto-entities",
      class extends r {
        static get properties() {
          return { hass: {} };
        }
        setConfig(t) {
          if (!t || !t.card) throw new Error("Invalid configuration");
          this._config
            ? ((this._config = t), (this.hass = this.hass))
            : ((this._config = t),
              (this.hass = n()),
              this._getEntities(),
              (this.cardConfig = { entities: this.entities, ...t.card }),
              (this.card = (function (t) {
                return m("card", t);
              })(this.cardConfig))),
            t.filter &&
              t.filter.template &&
              ((this.template = ""),
              (String(t.filter.template).includes("{%") ||
                String(t.filter.template).includes("{{")) &&
                (function (t, e, i) {
                  t || (t = n().connection);
                  let r = {
                      user: n().user.name,
                      browser: _,
                      hash: location.hash.substr(1) || " ",
                      ...i.variables,
                    },
                    s = i.template,
                    a = i.entity_ids;
                  t.subscribeMessage(
                    (t) => {
                      let i = t.result;
                      (i = i.replace(
                        /_\([^)]*\)/g,
                        (t) => n().localize(t.substring(2, t.length - 1)) || t
                      )),
                        e(i);
                    },
                    {
                      type: "render_template",
                      template: s,
                      variables: r,
                      entity_ids: a,
                    }
                  );
                })(
                  null,
                  (t) => {
                    (this.template = t), this._getEntities();
                  },
                  {
                    template: t.filter.template,
                    variables: { config: t },
                    entity_ids: t.filter.entity_ids,
                  }
                )),
            l().then(() => this._getEntities());
        }
        _getEntities() {
          const t = (t) =>
            t ? ("string" == typeof t ? { entity: t.trim() } : t) : null;
          let e = [];
          if (
            (this._config.entities &&
              (e = e.concat(this._config.entities.map(t))),
            !this.hass || !this._config.filter)
          )
            return e;
          if (
            (this.template &&
              (e = e.concat(this.template.split(/[\s,]+/).map(t))),
            (e = e.filter(Boolean)),
            this._config.filter.include)
          ) {
            const i = Object.keys(this.hass.states).map(t);
            for (const t of this._config.filter.include) {
              if (void 0 !== t.type) {
                e.push(t);
                continue;
              }
              let r = i
                .filter(h(this.hass, t))
                .map((e) =>
                  JSON.parse(
                    JSON.stringify(new Object({ ...e, ...t.options })).replace(
                      /this.entity_id/g,
                      e.entity
                    )
                  )
                );
              void 0 !== t.sort && (r = r.sort(g(this.hass, t.sort))),
                (e = e.concat(r));
            }
          }
          if (this._config.filter.exclude)
            for (const t of this._config.filter.exclude)
              e = e.filter(
                (e) =>
                  ("string" != typeof e && void 0 === e.entity) ||
                  !h(this.hass, t)(e)
              );
          if (
            this._config.sort &&
            ((e = e.sort(g(this.hass, this._config.sort))),
            this._config.sort.count)
          ) {
            const t = this._config.sort.first || 0;
            e = e.slice(t, t + this._config.sort.count);
          }
          if (this._config.unique) {
            function i(t, e) {
              return (
                typeof t == typeof e &&
                ("object" != typeof t
                  ? t === e
                  : !Object.keys(t).some((t) => !Object.keys(e).includes(t)) &&
                    Object.keys(t).every((r) => i(t[r], e[r])))
              );
            }
            let t = [];
            for (const r of e) t.some((t) => i(t, r)) || t.push(r);
            e = t;
          }
          this.entities = e;
        }
        set entities(t) {
          (function (t, e) {
            if (t === e) return !0;
            if (null == t || null == e) return !1;
            if (t.length != e.length) return !1;
            for (var i = 0; i < t.length; i++)
              if (JSON.stringify(t[i]) !== JSON.stringify(e[i])) return !1;
            return !0;
          })(t, this._entities) ||
            ((this._entities = t),
            (this.cardConfig = {
              ...this.cardConfig,
              entities: this._entities,
            }),
            0 === t.length && !1 === this._config.show_empty
              ? ((this.style.display = "none"), (this.style.margin = "0"))
              : ((this.style.display = null), (this.style.margin = null)));
        }
        get entities() {
          return this._entities;
        }
        set cardConfig(t) {
          (this._cardConfig = t), this.card && this.card.setConfig(t);
        }
        get cardConfig() {
          return this._cardConfig;
        }
        updated(t) {
          t.has("hass") &&
            this.hass &&
            ((this.card.hass = this.hass),
            setTimeout(() => this._getEntities(), 0));
        }
        createRenderRoot() {
          return this;
        }
        render() {
          return s`
    ${this.card}`;
        }
        getCardSize() {
          let t = 0;
          return (
            this.card && this.card.getCardSize && (t = this.card.getCardSize()),
            1 === t && this.entities.length && (t = this.entities.length),
            0 === t &&
              this._config.filter &&
              this._config.filter.include &&
              (t = Object.keys(this._config.filter.include).length),
            t || 1
          );
        }
      }
    ),
      p("ll-rebuild", {});
  },
]);
