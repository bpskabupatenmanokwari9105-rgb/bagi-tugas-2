"use strict";

function _slicedToArray(t, a) {
    return _arrayWithHoles(t) || _iterableToArrayLimit(t, a) || _unsupportedIterableToArray(t, a) || _nonIterableRest()
}

function _iterableToArrayLimit(t, a) {
    if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
        var e = [],
            n = !0,
            i = !1,
            s = void 0;
        try {
            for (var o, l = t[Symbol.iterator](); !(n = (o = l.next()).done) && (e.push(o.value), !a || e.length !== a); n = !0);
        } catch (t) {
            i = !0, s = t
        } finally {
            try {
                n || null == l.return || l.return()
            } finally {
                if (i) throw s
            }
        }
        return e
    }
}

function _toArray(t) {
    return _arrayWithHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _arrayWithHoles(t) {
    if (Array.isArray(t)) return t
}

function _objectWithoutProperties(t, a) {
    if (null == t) return {};
    var e, n = _objectWithoutPropertiesLoose(t, a);
    if (Object.getOwnPropertySymbols)
        for (var i = Object.getOwnPropertySymbols(t), s = 0; s < i.length; s++) e = i[s], 0 <= a.indexOf(e) || Object.prototype.propertyIsEnumerable.call(t, e) && (n[e] = t[e]);
    return n
}

function _objectWithoutPropertiesLoose(t, a) {
    if (null == t) return {};
    for (var e, n = {}, i = Object.keys(t), s = 0; s < i.length; s++) e = i[s], 0 <= a.indexOf(e) || (n[e] = t[e]);
    return n
}

function _toConsumableArray(t) {
    return _arrayWithoutHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(t, a) {
    if (t) {
        if ("string" == typeof t) return _arrayLikeToArray(t, a);
        var e = Object.prototype.toString.call(t).slice(8, -1);
        return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? _arrayLikeToArray(t, a) : void 0
    }
}

function _iterableToArray(t) {
    if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
}

function _arrayWithoutHoles(t) {
    if (Array.isArray(t)) return _arrayLikeToArray(t)
}

function _arrayLikeToArray(t, a) {
    (null == a || a > t.length) && (a = t.length);
    for (var e = 0, n = new Array(a); e < a; e++) n[e] = t[e];
    return n
}

function ownKeys(a, t) {
    var e, n = Object.keys(a);
    return Object.getOwnPropertySymbols && (e = Object.getOwnPropertySymbols(a), t && (e = e.filter(function(t) {
        return Object.getOwnPropertyDescriptor(a, t).enumerable
    })), n.push.apply(n, e)), n
}

function _objectSpread(a) {
    for (var t = 1; t < arguments.length; t++) {
        var e = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ownKeys(Object(e), !0).forEach(function(t) {
            _defineProperty(a, t, e[t])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : ownKeys(Object(e)).forEach(function(t) {
            Object.defineProperty(a, t, Object.getOwnPropertyDescriptor(e, t))
        })
    }
    return a
}

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t
}

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}
$(function() {
    $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover()
});
var toggle_sidebar = !1,
    toggle_quick_sidebar = !1,
    toggle_topbar = !1,
    minimize_sidebar = !1,
    toggle_page_sidebar = !1,
    toggle_overlay_sidebar = !1,
    nav_open = 0,
    quick_sidebar_open = 0,
    topbar_open = 0,
    mini_sidebar = 0,
    page_sidebar_open = 0,
    overlay_sidebar_open = 0;
$(document).ready(function() {
    $(".btn-refresh-card").on("click", function() {
        var t = $(this).parents(".card");
        t.length && (t.addClass("is-loading"), setTimeout(function() {
            t.removeClass("is-loading")
        }, 3e3))
    });
    var t = $(".sidebar .scrollbar");
    0 < t.length && t.scrollbar();
    t = $(".main-panel .content-scroll");
    0 < t.length && t.scrollbar();
    t = $(".messages-scroll");
    0 < t.length && t.scrollbar();
    t = $(".tasks-scroll");
    0 < t.length && t.scrollbar();
    t = $(".quick-scroll");
    0 < t.length && t.scrollbar();
    t = $(".message-notif-scroll");
    0 < t.length && t.scrollbar();
    t = $(".notif-scroll");
    0 < t.length && t.scrollbar();
    t = $(".quick-actions-scroll");
    0 < t.length && t.scrollbar();
    var a, e, n, i, s, t = $(".dropdown-user-scroll");
    0 < t.length && t.scrollbar(), $(".scroll-bar").draggable(), toggle_sidebar || ((a = $(".sidenav-toggler")).on("click", function() {
        nav_open = 1 == nav_open ? ($("html").removeClass("nav_open"), a.removeClass("toggled"), 0) : ($("html").addClass("nav_open"), a.addClass("toggled"), 1)
    }), toggle_sidebar = !0), quick_sidebar_open || ((a = $(".quick-sidebar-toggler")).on("click", function() {
        quick_sidebar_open = 1 == nav_open ? ($("html").removeClass("quick_sidebar_open"), $(".quick-sidebar-overlay").remove(), a.removeClass("toggled"), 0) : ($("html").addClass("quick_sidebar_open"), a.addClass("toggled"), $('<div class="quick-sidebar-overlay"></div>').insertAfter(".quick-sidebar"), 1)
    }), $(".wrapper").mouseup(function(t) {
        var a = $(".quick-sidebar");
        t.target.className == a.attr("class") || a.has(t.target).length || ($("html").removeClass("quick_sidebar_open"), $(".quick-sidebar-toggler").removeClass("toggled"), $(".quick-sidebar-overlay").remove(), quick_sidebar_open = 0)
    }), $(".close-quick-sidebar").on("click", function() {
        $("html").removeClass("quick_sidebar_open"), $(".quick-sidebar-toggler").removeClass("toggled"), $(".quick-sidebar-overlay").remove(), quick_sidebar_open = 0
    }), quick_sidebar_open = !0), toggle_topbar || ((e = $(".topbar-toggler")).on("click", function() {
        topbar_open = 1 == topbar_open ? ($("html").removeClass("topbar_open"), e.removeClass("toggled"), 0) : ($("html").addClass("topbar_open"), e.addClass("toggled"), 1)
    }), toggle_topbar = !0), minimize_sidebar || (n = $(".toggle-sidebar"), $(".wrapper").hasClass("sidebar_minimize") && (mini_sidebar = 1, n.addClass("toggled"), n.html('<i class="icon-options-vertical"></i>')), n.on("click", function() {
        mini_sidebar = 1 == mini_sidebar ? ($(".wrapper").removeClass("sidebar_minimize"), n.removeClass("toggled"), n.html('<i class="icon-menu"></i>'), 0) : ($(".wrapper").addClass("sidebar_minimize"), n.addClass("toggled"), n.html('<i class="icon-options-vertical"></i>'), 1), $(window).resize()
    }), minimize_sidebar = !0), toggle_page_sidebar || ((i = $(".page-sidebar-toggler")).on("click", function() {
        page_sidebar_open = 1 == page_sidebar_open ? ($("html").removeClass("pagesidebar_open"), i.removeClass("toggled"), 0) : ($("html").addClass("pagesidebar_open"), i.addClass("toggled"), 1)
    }), $(".page-sidebar .back").on("click", function() {
        $("html").removeClass("pagesidebar_open"), i.removeClass("toggled"), page_sidebar_open = 0
    }), toggle_page_sidebar = !0), toggle_overlay_sidebar || (s = $(".sidenav-overlay-toggler"), $(".wrapper").hasClass("is-show") && (overlay_sidebar_open = 1, s.addClass("toggled"), s.html('<i class="icon-options-vertical"></i>')), s.on("click", function() {
        overlay_sidebar_open = 1 == overlay_sidebar_open ? ($(".wrapper").removeClass("is-show"), s.removeClass("toggled"), s.html('<i class="icon-menu"></i>'), 0) : ($(".wrapper").addClass("is-show"), s.addClass("toggled"), s.html('<i class="icon-options-vertical"></i>'), 1), $(window).resize()
    }), minimize_sidebar = !0), $(".sidebar").hover(function() {
        $(".wrapper").hasClass("sidebar_minimize") && $(".wrapper").addClass("sidebar_minimize_hover")
    }, function() {
        $(".wrapper").hasClass("sidebar_minimize") && $(".wrapper").removeClass("sidebar_minimize_hover")
    }), $(".nav-item a").on("click", function() {
        $(this).parent().find(".collapse").hasClass("show") ? $(this).parent().removeClass("submenu") : $(this).parent().addClass("submenu")
    }), $('[data-select="checkbox"]').change(function() {
        var t = $(this).attr("data-target");
        $(t).prop("checked", $(this).prop("checked"))
    }), $(".form-group-default .form-control").focus(function() {
        $(this).parent().addClass("active")
    }).blur(function() {
        $(this).parent().removeClass("active")
    })
});
var containerSignIn = $(".container-login"),
    containerSignUp = $(".container-signup"),
    showSignIn = !0,
    showSignUp = !1;

function changeContainer() {
    1 == showSignIn ? containerSignIn.css("display", "block") : containerSignIn.css("display", "none"), 1 == showSignUp ? containerSignUp.css("display", "block") : containerSignUp.css("display", "none")
}
$("#show-signup").on("click", function() {
        showSignIn = !(showSignUp = !0), changeContainer()
    }), $("#show-signin").on("click", function() {
        showSignIn = !(showSignUp = !1), changeContainer()
    }), changeContainer(),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery)
    }(function(o) {
        function e(t, a, e) {
            var i, s, a = {
                content: {
                    message: "object" == _typeof(a) ? a.message : a,
                    title: a.title || "",
                    icon: a.icon || "",
                    url: a.url || "#",
                    target: a.target || "-"
                }
            };
            e = o.extend(!0, {}, a, e), this.settings = o.extend(!0, {}, n, e), this._defaults = n, "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
                start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
                end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
            }, "number" == typeof this.settings.offset && (this.settings.offset = {
                x: this.settings.offset,
                y: this.settings.offset
            }), !this.settings.allow_duplicates && (this.settings.allow_duplicates || (i = this, s = !1, o('[data-notify="container"]').each(function(t, a) {
                var e = o(a),
                    n = e.find('[data-notify="title"]').text().trim(),
                    a = e.find('[data-notify="message"]').html().trim(),
                    n = n === o("<div>" + i.settings.content.title + "</div>").html().trim(),
                    a = a === o("<div>" + i.settings.content.message + "</div>").html().trim(),
                    e = e.hasClass("alert-" + i.settings.type);
                return n && a && e && (s = !0), !s
            }), s)) || this.init()
        }
        var n = {
            element: "body",
            position: null,
            type: "info",
            allow_dismiss: !0,
            allow_duplicates: !0,
            newest_on_top: !1,
            showProgressbar: !1,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5e3,
            timer: 1e3,
            url_target: "_blank",
            mouse_over: null,
            animate: {
                enter: "animated fadeInDown",
                exit: "animated fadeOutUp"
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: "class",
            template: '<div data-notify="container" class="col-10 col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
        };
        String.format = function() {
            for (var t = arguments[0], a = 1; a < arguments.length; a++) t = t.replace(RegExp("\\{" + (a - 1) + "\\}", "gm"), arguments[a]);
            return t
        }, o.extend(e.prototype, {
            init: function() {
                var s = this;
                this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.styleDismiss(), this.placement(), this.bind(), this.notify = {
                    $ele: this.$ele,
                    update: function(t, a) {
                        var e, n = {};
                        for (e in "string" == typeof t ? n[t] = a : n = t, n) switch (e) {
                            case "type":
                                this.$ele.removeClass("alert-" + s.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + s.settings.type), s.settings.type = n[e], this.$ele.addClass("alert-" + n[e]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + n[e]);
                                break;
                            case "icon":
                                var i = this.$ele.find('[data-notify="icon"]');
                                "class" === s.settings.icon_type.toLowerCase() ? i.removeClass(s.settings.content.icon).addClass(n[e]) : (i.is("img") || i.find("img"), i.attr("src", n[e]));
                                break;
                            case "progress":
                                i = s.settings.delay - s.settings.delay * (n[e] / 100);
                                this.$ele.data("notify-delay", i), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", n[e]).css("width", n[e] + "%");
                                break;
                            case "url":
                                this.$ele.find('[data-notify="url"]').attr("href", n[e]);
                                break;
                            case "target":
                                this.$ele.find('[data-notify="url"]').attr("target", n[e]);
                                break;
                            default:
                                this.$ele.find('[data-notify="' + e + '"]').html(n[e])
                        }
                        t = this.$ele.outerHeight() + parseInt(s.settings.spacing) + parseInt(s.settings.offset.y);
                        s.reposition(t)
                    },
                    close: function() {
                        s.close()
                    }
                }
            },
            buildNotify: function() {
                var t = this.settings.content;
                this.$ele = o(String.format(this.settings.template, this.settings.type, t.title, t.message, t.url, t.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
            },
            setIcon: function() {
                "class" === this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
            },
            styleDismiss: function() {
                this.$ele.find('[data-notify="dismiss"]').css({
                    position: "absolute",
                    right: "10px",
                    top: "5px",
                    zIndex: this.settings.z_index + 2
                })
            },
            styleURL: function() {
                this.$ele.find('[data-notify="url"]').css({
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                    height: "100%",
                    left: 0,
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    zIndex: this.settings.z_index + 1
                })
            },
            placement: function() {
                var e = this,
                    t = this.settings.offset.y,
                    a = {
                        display: "inline-block",
                        margin: "0px auto",
                        paddingLeft: "65px",
                        position: this.settings.position || ("body" === this.settings.element ? "fixed" : "absolute"),
                        transition: "all .5s ease-in-out",
                        zIndex: this.settings.z_index
                    },
                    n = !1,
                    i = this.settings;
                switch (o('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
                    t = Math.max(t, parseInt(o(this).css(i.placement.from)) + parseInt(o(this).outerHeight()) + parseInt(i.spacing))
                }), !0 === this.settings.newest_on_top && (t = this.settings.offset.y), a[this.settings.placement.from] = t + "px", this.settings.placement.align) {
                    case "left":
                    case "right":
                        a[this.settings.placement.align] = this.settings.offset.x + "px";
                        break;
                    case "center":
                        a.left = 0, a.right = 0
                }
                this.$ele.css(a).addClass(this.settings.animate.enter), o.each(Array("webkit-", "moz-", "o-", "ms-", ""), function(t, a) {
                    e.$ele[0].style[a + "AnimationIterationCount"] = 1
                }), o(this.settings.element).append(this.$ele), !0 === this.settings.newest_on_top && (t = parseInt(t) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(t)), o.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function() {
                    n = !0
                }).one(this.animations.end, function() {
                    e.$ele.removeClass(e.settings.animate.enter), o.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
                }), setTimeout(function() {
                    n || o.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
                }, 600)
            },
            bind: function() {
                var e, n = this;
                this.$ele.find('[data-notify="dismiss"]').on("click", function() {
                    n.close()
                }), this.$ele.mouseover(function() {
                    o(this).data("data-hover", "true")
                }).mouseout(function() {
                    o(this).data("data-hover", "false")
                }), this.$ele.data("data-hover", "false"), 0 < this.settings.delay && (n.$ele.data("notify-delay", n.settings.delay), e = setInterval(function() {
                    var t, a = parseInt(n.$ele.data("notify-delay")) - n.settings.timer;
                    ("false" === n.$ele.data("data-hover") && "pause" === n.settings.mouse_over || "pause" != n.settings.mouse_over) && (t = (n.settings.delay - a) / n.settings.delay * 100, n.$ele.data("notify-delay", a), n.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", t).css("width", t + "%")), a <= -n.settings.timer && (clearInterval(e), n.close())
                }, n.settings.timer))
            },
            close: function() {
                var t = this,
                    a = parseInt(this.$ele.css(this.settings.placement.from)),
                    e = !1;
                this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit), t.reposition(a), o.isFunction(t.settings.onClose) && t.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function() {
                    e = !0
                }).one(this.animations.end, function() {
                    o(this).remove(), o.isFunction(t.settings.onClosed) && t.settings.onClosed.call(this)
                }), setTimeout(function() {
                    e || (t.$ele.remove(), t.settings.onClosed && t.settings.onClosed(t.$ele))
                }, 600)
            },
            reposition: function(t) {
                var a = this,
                    e = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                    n = this.$ele.nextAll(e);
                !0 === this.settings.newest_on_top && (n = this.$ele.prevAll(e)), n.each(function() {
                    o(this).css(a.settings.placement.from, t), t = parseInt(t) + parseInt(a.settings.spacing) + o(this).outerHeight()
                })
            }
        }), o.notify = function(t, a) {
            return new e(0, t, a).notify
        }, o.notifyDefaults = function(t) {
            return n = o.extend(!0, {}, n, t)
        }, o.notifyClose = function(t) {
            "warning" === t && (t = "danger"), o(void 0 === t || "all" === t ? "[data-notify]" : "success" === t || "info" === t || "warning" === t || "danger" === t ? ".alert-" + t + "[data-notify]" : t ? t + "[data-notify]" : '[data-notify-position="' + t + '"]').find('[data-notify="dismiss"]').trigger("click")
        }, o.notifyCloseExcept = function(t) {
            "warning" === t && (t = "danger"), ("success" === t || "info" === t || "warning" === t || "danger" === t ? o("[data-notify]").not(".alert-" + t) : o("[data-notify]").not(t)).find('[data-notify="dismiss"]').trigger("click")
        }
    }),
    function(T) {
        T.fn.gantt = function(t) {
            var o = ["hours", "days", "weeks", "months"],
                _ = {
                    source: [],
                    itemsPerPage: 10,
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    dow: ["S", "M", "T", "W", "T", "F", "S"],
                    navigate: "buttons",
                    scale: "days",
                    useCookie: !1,
                    maxScale: "months",
                    minScale: "hours",
                    waitText: "Please wait...",
                    onItemClick: function(t) {},
                    onAddClick: function(t) {},
                    onRender: function(t, a) {},
                    scrollToToday: !0
                };

            function $(t, a) {
                for (var e = 1;; e++) {
                    var n = new Date(t);
                    if (n.setHours(t.getHours() + a * e), n.getTime() !== t.getTime()) return n
                }
            }
            t && T.extend(_, t), _.useCookie = _.useCookie && T.isFunction(T.cookie), T.extend(T.expr[":"], {
                findday: function(t, a, e) {
                    var n = new Date(parseInt(e[3], 10)),
                        e = T(t).attr("id"),
                        t = (e = e || "").indexOf("-") + 1,
                        e = new Date(parseInt(e.substring(t, e.length), 10)),
                        n = new Date(n.getFullYear(), n.getMonth(), n.getDate()),
                        e = new Date(e.getFullYear(), e.getMonth(), e.getDate());
                    return n.getTime() === e.getTime()
                }
            }), T.extend(T.expr[":"], {
                findweek: function(t, a, e) {
                    var n = new Date(parseInt(e[3], 10)),
                        e = T(t).attr("id"),
                        t = (e = e || "").indexOf("-") + 1;
                    return (n = n.getFullYear() + "-" + n.getDayForWeek().getWeekOfYear()) === e.substring(t, e.length)
                }
            }), T.extend(T.expr[":"], {
                findmonth: function(t, a, e) {
                    var n = (n = new Date(parseInt(e[3], 10))).getFullYear() + "-" + n.getMonth(),
                        e = T(t).attr("id"),
                        t = (e = e || "").indexOf("-") + 1;
                    return n === e.substring(t, e.length)
                }
            }), Date.prototype.getWeekId = function() {
                var t = this.getFullYear(),
                    a = this.getDayForWeek().getWeekOfYear();
                return 11 === this.getMonth() && 1 === a && t++, "dh-" + t + "-" + a
            }, Date.prototype.getRepDate = function() {
                switch (_.scale) {
                    case "hours":
                        return this.getTime();
                    case "weeks":
                        return this.getDayForWeek().getTime();
                    case "months":
                        return new Date(this.getFullYear(), this.getMonth(), 1).getTime();
                    default:
                        return this.getTime()
                }
            }, Date.prototype.getDayOfYear = function() {
                var t = new Date(this.getFullYear(), 0, 0),
                    a = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                return Math.ceil((a - t) / 864e5)
            }, Date.prototype.getWeekOfYear = function() {
                var t = new Date(this.getFullYear(), 0, 1),
                    a = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                3 < t.getDay() && (t = new Date(a.getFullYear(), 0, 7 - t.getDay()));
                t = a.getDayOfYear() - t.getDayOfYear();
                return Math.ceil(t / 7)
            }, Date.prototype.getDaysInMonth = function() {
                return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate()
            }, Date.prototype.hasWeek = function() {
                var t = new Date(this.valueOf());
                t.setDate(t.getDate() - t.getDay());
                var a = new Date(this.valueOf());
                return a.setDate(a.getDate() + (6 - a.getDay())), t.getMonth() === a.getMonth() || (t.getMonth() === this.getMonth() && a.getDate() < 4 || t.getMonth() !== this.getMonth() && 4 <= a.getDate())
            }, Date.prototype.getDayForWeek = function() {
                var t = new Date(this.valueOf());
                t.setDate(t.getDate() - t.getDay());
                var a = new Date(this.valueOf());
                return a.setDate(a.getDate() + (6 - a.getDay())), t.getMonth() === a.getMonth() || t.getMonth() !== a.getMonth() && 4 <= a.getDate() ? new Date(a.setDate(a.getDate() - 3)) : new Date(t.setDate(t.getDate() + 3))
            };
            var D = {
                    elementFromPoint: "CSS1Compat" === document.compatMode ? function(t, a) {
                        return t -= window.pageXOffset, a -= window.pageYOffset, document.elementFromPoint(t, a)
                    } : function(t, a) {
                        return t -= T(document).scrollLeft(), a -= T(document).scrollTop(), document.elementFromPoint(t, a)
                    },
                    create: function(a) {
                        "string" != typeof _.source ? (a.data = _.source, D.init(a)) : T.getJSON(_.source, function(t) {
                            a.data = t, D.init(a)
                        })
                    },
                    init: function(t) {
                        t.rowsNum = t.data.length, t.pageCount = Math.ceil(t.rowsNum / _.itemsPerPage), t.rowsOnLastPage = t.rowsNum - Math.floor(t.rowsNum / _.itemsPerPage) * _.itemsPerPage, t.dateStart = _.dateStart || P.getMinDate(t), t.dateEnd = _.dateEnd || P.getMaxDate(t), D.waitToggle(t, !0, function() {
                            D.render(t)
                        })
                    },
                    render: function(t) {
                        var a = T('<div class="fn-content"/>'),
                            e = D.leftPanel(t);
                        a.append(e);
                        var n = D.rightPanel(t, e);
                        a.append(n), a.append(D.navigation(t));
                        var i = n.find(".dataPanel");
                        t.gantt = T('<div class="fn-gantt" />').append(a), T(t).empty().append(t.gantt), t.scrollNavigation.panelMargin = parseInt(i.css("margin-left").replace("px", ""), 10), t.scrollNavigation.panelMaxPos = i.width() - n.width(), t.scrollNavigation.canScroll = i.width() > n.width(), D.markNow(t), D.fillData(t, i, e), !_.useCookie || (a = T.cookie(this.cookieKey + "ScrollPos")) && (t.hPosition = a), _.scrollToToday ? (D.navigateTo(t, "now"), D.scrollPanel(t, 0)) : (0 !== t.hPosition && (t.scaleOldWidth ? (n = 0 < (n = (i.width() - n.width()) * t.hPosition / t.scaleOldWidth) ? 0 : n, i.css({
                            "margin-left": n + "px"
                        }), t.scrollNavigation.panelMargin = n, t.hPosition = n, t.scaleOldWidth = null) : (i.css({
                            "margin-left": t.hPosition + "px"
                        }), t.scrollNavigation.panelMargin = t.hPosition)), D.repositionLabel(t)), i.css({
                            height: e.height()
                        }), D.waitToggle(t, !1), _.onRender(D, t)
                    },
                    leftPanel: function(e) {
                        var t = T('<div class="leftPanel"/>').append(T('<div class="row spacer"/>').css("height", P.getCellSize() * e.headerRows + "px").css("width", "100%")),
                            n = [];
                        return T.each(e.data, function(t, a) {
                            t >= e.pageNum * _.itemsPerPage && t < e.pageNum * _.itemsPerPage + _.itemsPerPage && (n.push('<div class="row name row' + t + (a.desc ? "" : " fn-wide") + '" id="rowheader' + t + '" offset="' + t % _.itemsPerPage * P.getCellSize() + '">'), n.push('<span class="fn-label' + (a.cssClass ? " " + a.cssClass : "") + '">' + (a.name || "") + "</span>"), n.push("</div>"), a.desc && (n.push('<div class="row desc row' + t + ' " id="RowdId_' + t + '" data-id="' + a.id + '">'), n.push('<span class="fn-label' + (a.cssClass ? " " + a.cssClass : "") + '">' + a.desc + "</span>"), n.push("</div>")))
                        }), t.append(n.join("")), t
                    },
                    dataPanel: function(i, t) {
                        var a = T('<div class="dataPanel" style="width: ' + t + 'px;"/>'),
                            t = "onwheel" in i ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                        return T(i).on(t, function(t) {
                            D.wheelScroll(i, t)
                        }), a.click(function(t) {
                            var a;
                            t.stopPropagation();
                            var e = T(i).find(".fn-gantt .leftPanel"),
                                n = T(i).find(".fn-gantt .dataPanel");
                            switch (_.scale) {
                                case "weeks":
                                    a = 2 * P.getCellSize();
                                    break;
                                case "months":
                                    a = P.getCellSize();
                                    break;
                                case "hours":
                                    a = 4 * P.getCellSize();
                                    break;
                                case "days":
                                    a = 3 * P.getCellSize();
                                    break;
                                default:
                                    a = 2 * P.getCellSize()
                            }
                            n = D.elementFromPoint(t.pageX, n.offset().top + a);
                            null === n && (n = document.elementFromPoint(t.pageX, 70));
                            n = (n = "fn-label" === n.className ? T(n.parentNode) : T(n)).attr("repdate"), t = D.elementFromPoint(e.offset().left + e.width() - 10, t.pageY), t = (t = 0 === t.className.indexOf("fn-label") ? T(t.parentNode) : T(t)).data().id;
                            _.onAddClick(n, t)
                        }), a
                    },
                    rightPanel: function(t, a) {
                        var e = null,
                            n = ["sn", "wd", "wd", "wd", "wd", "wd", "sa"],
                            i = ['<div class="row"/>'],
                            s = 0,
                            o = ['<div class="row"/>'],
                            l = 0,
                            r = [],
                            d = 0,
                            c = [],
                            m = [],
                            u = new Date,
                            u = new Date(u.getFullYear(), u.getMonth(), u.getDate());
                        switch (_.scale) {
                            case "hours":
                                for (var p = (e = P.parseTimeRange(t.dateStart, t.dateEnd, t.scaleStep))[0].getFullYear(), g = e[0].getMonth(), f = e[0], v = 0, h = e.length; v < h; v++) {
                                    var b = (k = e[v]).getFullYear();
                                    b !== p && (i.push('<div class="row header year" style="width: ' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), p = b, s = 0), s++;
                                    b = k.getMonth();
                                    b !== g && (o.push('<div class="row header month" style="width: ' + P.getCellSize() * l + 'px"><div class="fn-label">' + _.months[g] + "</div></div>"), g = b, l = 0), l++;
                                    var b = k.getDay(),
                                        w = f.getDay(),
                                        y = n[b];
                                    P.isHoliday(k) && (y = "holiday"), b !== w && (b = u - f == 0 ? "today" : P.isHoliday(f.getTime()) ? "holiday" : n[w], r.push('<div class="row date ' + b + '"  style="width: ' + P.getCellSize() * d + 'px;">  <div class="fn-label">' + f.getDate() + "</div></div>"), c.push('<div class="row day ' + b + '"  style="width: ' + P.getCellSize() * d + 'px;">  <div class="fn-label">' + _.dow[w] + "</div></div>"), f = k, d = 0), d++, m.push('<div class="row day ' + y + '" id="dh-' + k.getTime() + '"  offset="' + v * P.getCellSize() + '" repdate="' + k.getRepDate() + '"><div class="fn-label">' + k.getHours() + "</div></div>")
                                }
                                i.push('<div class="row header year" style="width: ' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), o.push('<div class="row header month" style="width: ' + P.getCellSize() * l + 'px"><div class="fn-label">' + _.months[g] + "</div></div>");
                                y = n[f.getDay()];
                                P.isHoliday(f) && (y = "holiday"), r.push('<div class="row date ' + y + '"  style="width: ' + P.getCellSize() * d + 'px;">  <div class="fn-label">' + f.getDate() + "</div></div>"), c.push('<div class="row day ' + y + '"  style="width: ' + P.getCellSize() * d + 'px;">  <div class="fn-label">' + _.dow[f.getDay()] + "</div></div>"), (S = D.dataPanel(t, e.length * P.getCellSize())).append(i.join("")), S.append(o.join("")), S.append(T('<div class="row"/>').html(r.join(""))), S.append(T('<div class="row"/>').html(c.join(""))), S.append(T('<div class="row"/>').html(m.join("")));
                                break;
                            case "weeks":
                                i = ['<div class="row"/>'], o = ['<div class="row"/>'];
                                for (p = (e = P.parseWeeksRange(t.dateStart, t.dateEnd))[0].getFullYear(), g = e[0].getMonth(), f = e[0], v = 0, h = e.length; v < h; v++)(k = e[v]).getFullYear() !== p && (i.push('<div class="row header year" style="width: ' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), p = k.getFullYear(), s = 0), s++, k.getMonth() !== g && (o.push('<div class="row header month" style="width:' + P.getCellSize() * l + 'px;"><div class="fn-label">' + _.months[g] + "</div></div>"), g = k.getMonth(), l = 0), l++, r.push('<div class="row day wd"  id="' + k.getWeekId() + '" offset="' + v * P.getCellSize() + '" repdate="' + k.getRepDate() + '">  <div class="fn-label">' + k.getWeekOfYear() + "</div></div>");
                                i.push('<div class="row header year" style="width: ' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), o.push('<div class="row header month" style="width: ' + P.getCellSize() * l + 'px"><div class="fn-label">' + _.months[g] + "</div></div>"), (S = D.dataPanel(t, e.length * P.getCellSize())).append(i.join("") + o.join("") + r.join("") + c.join(""));
                                break;
                            case "months":
                                for (p = (e = P.parseMonthsRange(t.dateStart, t.dateEnd))[0].getFullYear(), g = e[0].getMonth(), f = e[0], v = 0, h = e.length; v < h; v++)(k = e[v]).getFullYear() !== p && (i.push('<div class="row header year" style="width: ' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), p = k.getFullYear(), s = 0), s++, o.push('<div class="row day wd" id="dh-' + P.genId(k.getTime()) + '" offset="' + v * P.getCellSize() + '" repdate="' + k.getRepDate() + '">' + (1 + k.getMonth()) + "</div>");
                                i.push('<div class="row header year" style="width: ' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), o.push('<div class="row header month" style="width: ' + P.getCellSize() * l + 'px"><div class="fn-label">' + _.months[g] + "</div></div>"), (S = D.dataPanel(t, e.length * P.getCellSize())).append(i.join("")), S.append(o.join("")), S.append(T('<div class="row"/>').html(r.join(""))), S.append(T('<div class="row"/>').html(c.join("")));
                                break;
                            default:
                                for (var k, S, x = $((e = P.parseDateRange(t.dateStart, t.dateEnd))[0], -1), p = x.getFullYear(), g = x.getMonth(), f = x, v = 0, h = e.length; v < h; v++) {
                                    (k = e[v]).getFullYear() !== p && (i.push('<div class="row header year" style="width:' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), p = k.getFullYear(), s = 0), s++, k.getMonth() !== g && (o.push('<div class="row header month" style="width:' + P.getCellSize() * l + 'px;"><div class="fn-label">' + _.months[g] + "</div></div>"), g = k.getMonth(), l = 0), l++;
                                    y = n[w = k.getDay()];
                                    P.isHoliday(k) && (y += " holiday"), r.push('<div class="row date ' + y + '"  id="dh-' + P.genId(k.getTime()) + '" offset="' + v * P.getCellSize() + '" repdate="' + k.getRepDate() + '">  <div class="fn-label">' + k.getDate() + "</div></div>"), c.push('<div class="row day ' + y + '"  id="dw-' + P.genId(k.getTime()) + '"  repdate="' + k.getRepDate() + '">  <div class="fn-label">' + _.dow[w] + "</div></div>")
                                }
                                i.push('<div class="row header year" style="width: ' + P.getCellSize() * s + 'px;"><div class="fn-label">' + p + "</div></div>"), o.push('<div class="row header month" style="width: ' + P.getCellSize() * l + 'px"><div class="fn-label">' + _.months[g] + "</div></div>"), (S = D.dataPanel(t, e.length * P.getCellSize())).append(i.join("")), S.append(o.join("")), S.append(T('<div class="row" style="margin-left: 0;" />').html(r.join(""))), S.append(T('<div class="row" style="margin-left: 0;" />').html(c.join("")))
                        }
                        return T('<div class="rightPanel"></div>').append(S)
                    },
                    navigation: function(t) {
                        var a = null;
                        return "scroll" === _.navigate ? (a = T('<div class="navigate" />').append(T('<div class="nav-slider" />').append(T('<div class="nav-slider-left" />').append(T('<button type="button" class="nav-link nav-page-back" title="Halaman Sebelumnya"/>').html("&lt;").click(function() {
                            D.navigatePage(t, -1)
                        })).append(T('<div class="page-number"/>').append(T("<span/>").html(t.pageNum + 1 + " / " + t.pageCount))).append(T('<button type="button" class="nav-link nav-page-next" title="Halaman Selanjutnya"/>').html("&gt;").click(function() {
                            D.navigatePage(t, 1)
                        })).append(T('<button type="button" class="nav-link nav-now" title="Hari Ini"/>').html("&#9679;").click(function() {
                            D.navigateTo(t, "now")
                        })).append(T('<button type="button" class="nav-link nav-prev-week" title="Bulan Lalu"/>').html("&lt;&lt;").click(function() {
                            "hours" === _.scale ? D.navigateTo(t, 8 * P.getCellSize()) : "days" === _.scale ? D.navigateTo(t, 30 * P.getCellSize()) : "weeks" === _.scale ? D.navigateTo(t, 12 * P.getCellSize()) : "months" === _.scale && D.navigateTo(t, 6 * P.getCellSize())
                        })).append(T('<button type="button" class="nav-link nav-prev-day" title="Minggu Lalu"/>').html("&lt;").click(function() {
                            "hours" === _.scale ? D.navigateTo(t, 4 * P.getCellSize()) : "days" === _.scale ? D.navigateTo(t, 7 * P.getCellSize()) : "weeks" === _.scale ? D.navigateTo(t, 4 * P.getCellSize()) : "months" === _.scale && D.navigateTo(t, 3 * P.getCellSize())
                        }))).append(T('<div class="nav-slider-content" />').append(T('<input type="range" class="custom-range nav-slider-range" value="0">').on("input change", function() {
                            D.sliderRange(t, T(this).val())
                        }))).append(T('<div class="nav-slider-right" />').append(T('<button type="button" class="nav-link nav-next-day" title="Minggu Depan"/>').html("&gt;").click(function() {
                            "hours" === _.scale ? D.navigateTo(t, -4 * P.getCellSize()) : "days" === _.scale ? D.navigateTo(t, -7 * P.getCellSize()) : "weeks" === _.scale ? D.navigateTo(t, -4 * P.getCellSize()) : "months" === _.scale && D.navigateTo(t, -3 * P.getCellSize())
                        })).append(T('<button type="button" class="nav-link nav-next-week" title="Bulan Depan"/>').html("&gt;&gt;").click(function() {
                            "hours" === _.scale ? D.navigateTo(t, -8 * P.getCellSize()) : "days" === _.scale ? D.navigateTo(t, -30 * P.getCellSize()) : "weeks" === _.scale ? D.navigateTo(t, -12 * P.getCellSize()) : "months" === _.scale && D.navigateTo(t, -6 * P.getCellSize())
                        })).append(T('<button type="button" class="nav-link nav-zoomIn"/>').html("&#43;").click(function() {
                            D.zoomInOut(t, -1)
                        })).append(T('<button type="button" class="nav-link nav-zoomOut"/>').html("&#45;").click(function() {
                            D.zoomInOut(t, 1)
                        })))), T(document).mouseup(function() {
                            t.scrollNavigation.scrollerMouseDown = !1
                        })) : a = T('<div class="navigate" />').append(T('<button type="button" class="nav-link nav-page-back"/>').html("&lt;").click(function() {
                            D.navigatePage(t, -1)
                        })).append(T('<div class="page-number"/>').append(T("<span/>").html(t.pageNum + 1 + " of " + t.pageCount))).append(T('<button type="button" class="nav-link nav-page-next"/>').html("&gt;").click(function() {
                            D.navigatePage(t, 1)
                        })).append(T('<button type="button" class="nav-link nav-begin"/>').html("&#124;&lt;").click(function() {
                            D.navigateTo(t, "begin")
                        })).append(T('<button type="button" class="nav-link nav-prev-week"/>').html("&lt;&lt;").click(function() {
                            D.navigateTo(t, 7 * P.getCellSize())
                        })).append(T('<button type="button" class="nav-link nav-prev-day"/>').html("&lt;").click(function() {
                            D.navigateTo(t, P.getCellSize())
                        })).append(T('<button type="button" class="nav-link nav-now"/>').html("&#9679;").click(function() {
                            D.navigateTo(t, "now")
                        })).append(T('<button type="button" class="nav-link nav-next-day"/>').html("&gt;").click(function() {
                            D.navigateTo(t, -1 * P.getCellSize())
                        })).append(T('<button type="button" class="nav-link nav-next-week"/>').html("&gt;&gt;").click(function() {
                            D.navigateTo(t, -7 * P.getCellSize())
                        })).append(T('<button type="button" class="nav-link nav-end"/>').html("&gt;&#124;").click(function() {
                            D.navigateTo(t, "end")
                        })).append(T('<button type="button" class="nav-link nav-zoomIn"/>').html("&#43;").click(function() {
                            D.zoomInOut(t, -1)
                        })).append(T('<button type="button" class="nav-link nav-zoomOut"/>').html("&#45;").click(function() {
                            D.zoomInOut(t, 1)
                        })), T('<div class="bottom"/>').append(a)
                    },
                    createProgressBar: function(t, a, e, n, i) {
                        var s = P.getCellSize(),
                            o = P.getProgressBarMargin() || 0,
                            o = T('<div class="bar"><div class="fn-label">' + n + "</div></div>").addClass(a).css({
                                width: s * t - o + 2
                            }).data("dataObj", i);
                        return e && o.mouseover(function(t) {
                            var a = T('<div class="fn-gantt-hint" />').html(e);
                            T("body").append(a), a.css("left", t.pageX), a.css("top", t.pageY), a.show()
                        }).mouseout(function() {
                            T(".fn-gantt-hint").remove()
                        }).mousemove(function(t) {
                            T(".fn-gantt-hint").css("left", t.pageX), T(".fn-gantt-hint").css("top", t.pageY + 15)
                        }), o.click(function(t) {
                            t.stopPropagation(), _.onItemClick(i)
                        }), _.popover && o.popover(_.popover(i)), o
                    },
                    markNow: function(t) {
                        switch (_.scale) {
                            case "weeks":
                                var a = Date.parse(new Date);
                                a = 364e5 * Math.floor(a / 364e5), T(t).find(':findweek("' + a + '")').removeClass("wd").addClass("today");
                                break;
                            case "months":
                                T(t).find(':findmonth("' + (new Date).getTime() + '")').removeClass("wd").addClass("today");
                                break;
                            default:
                                a = Date.parse(new Date);
                                a = 364e5 * Math.floor(a / 364e5), T(t).find("#dh-" + moment().startOf("day").valueOf() + ",#dw-" + moment().startOf("day").valueOf()).removeClass("wd").addClass("today")
                        }
                    },
                    fillData: function(h, b, t) {
                        T.each(h.data, function(v, t) {
                            v >= h.pageNum * _.itemsPerPage && v < h.pageNum * _.itemsPerPage + _.itemsPerPage && T.each(t.values, function(t, a) {
                                var e = null;
                                switch (_.scale) {
                                    case "hours":
                                        var n = P.genId(P.dateDeserialize(a.from).getTime(), h.scaleStep),
                                            i = T(h).find("#dh-" + n),
                                            s = P.genId(P.dateDeserialize(a.to).getTime(), h.scaleStep),
                                            o = T(h).find("#dh-" + s),
                                            l = i.attr("offset"),
                                            r = o.attr("offset"),
                                            d = Math.floor((r - l) / P.getCellSize()) + 1,
                                            e = D.createProgressBar(d, a.customClass || "", a.desc || "", a.label || "", a.dataObj || null),
                                            c = T(h).find("#rowheader" + v),
                                            m = 5 * P.getCellSize() + 2 + parseInt(c.attr("offset"), 10);
                                        e.css({
                                            top: m,
                                            left: Math.floor(l)
                                        }), b.append(e);
                                        break;
                                    case "weeks":
                                        var u = P.dateDeserialize(a.from),
                                            p = P.dateDeserialize(a.to);
                                        u.getDate() <= 3 && 0 === u.getMonth() && u.setDate(u.getDate() + 4), u.getDate() <= 3 && 0 === u.getMonth() && u.setDate(u.getDate() + 4), p.getDate() <= 3 && 0 === p.getMonth() && p.setDate(p.getDate() + 4);
                                        l = (i = T(h).find("#" + u.getWeekId())).attr("offset"), r = (o = T(h).find("#" + p.getWeekId())).attr("offset"), d = Math.round((r - l) / P.getCellSize()) + 1;
                                        e = D.createProgressBar(d, a.customClass || "", a.desc || "", a.label || "", a.dataObj || null);
                                        c = T(h).find("#rowheader" + v), m = 3 * P.getCellSize() + 2 + parseInt(c.attr("offset"), 10);
                                        e.css({
                                            top: m,
                                            left: Math.floor(l)
                                        }), b.append(e);
                                        break;
                                    case "months":
                                        u = P.dateDeserialize(a.from), p = P.dateDeserialize(a.to);
                                        u.getDate() <= 3 && 0 === u.getMonth() && u.setDate(u.getDate() + 4), u.getDate() <= 3 && 0 === u.getMonth() && u.setDate(u.getDate() + 4), p.getDate() <= 3 && 0 === p.getMonth() && p.setDate(p.getDate() + 4);
                                        l = (i = T(h).find("#dh-" + P.genId(u.getTime()))).attr("offset"), r = (o = T(h).find("#dh-" + P.genId(p.getTime()))).attr("offset"), d = Math.round((r - l) / P.getCellSize()) + 1;
                                        e = D.createProgressBar(d, a.customClass || "", a.desc || "", a.label || "", a.dataObj || null);
                                        c = T(h).find("#rowheader" + v), m = 2 * P.getCellSize() + 2 + parseInt(c.attr("offset"), 10);
                                        e.css({
                                            top: m,
                                            left: Math.floor(l)
                                        }), b.append(e);
                                        break;
                                    default:
                                        n = P.genId(P.dateDeserialize(a.from).getTime()), s = P.genId(P.dateDeserialize(a.to).getTime()), l = (i = T(h).find("#dh-" + n)).attr("offset"), d = Math.floor((s / 1e3 - n / 1e3) / 86400) + 1;
                                        e = D.createProgressBar(d, a.customClass || "", a.desc || "", a.label || "", a.dataObj || null);
                                        c = T(h).find("#rowheader" + v), m = 4 * P.getCellSize() + 2 + parseInt(c.attr("offset"), 10);
                                        e.css({
                                            top: m,
                                            left: void 0 === l ? -24 : Math.floor(l)
                                        }), b.append(e)
                                }
                                var g, f = e.find(".fn-label");
                                f && e.length ? (g = function(t) {
                                    try {
                                        var a = (t = t.replace("rgb(", "").replace(")", "")).split(","),
                                            e = parseInt(a[0], 10),
                                            n = parseInt(a[1], 10),
                                            a = parseInt(a[2], 10),
                                            a = Math.round(.9 * (255 - (.299 * e + .587 * n + .114 * a)));
                                        return "rgb(" + a + ", " + a + ", " + a + ")"
                                    } catch (t) {
                                        return ""
                                    }
                                }(e[0].style.backgroundColor), f.css("color", g)) : f && f.css("color", "")
                            })
                        })
                    },
                    navigateTo: function(t, a) {
                        function e() {
                            D.repositionLabel(t)
                        }
                        var n = T(t).find(".fn-gantt .rightPanel"),
                            i = n.find(".dataPanel"),
                            s = n.width(),
                            o = i.width();
                        switch (a) {
                            case "begin":
                                i.animate({
                                    "margin-left": "0px"
                                }, "fast", e), t.scrollNavigation.panelMargin = 0;
                                break;
                            case "end":
                                var l = o - s;
                                t.scrollNavigation.panelMargin = -1 * l, i.animate({
                                    "margin-left": "-" + l + "px"
                                }, "fast", e);
                                break;
                            case "now":
                                if (!t.scrollNavigation.canScroll || !i.find(".today").length) return !1;
                                var r = -1 * (o - s),
                                    d = i.css("margin-left").replace("px", ""),
                                    a = i.find(".today").offset().left - i.offset().left;
                                0 < (a *= -1) ? a = 0 : a < r && (a = r), i.animate({
                                    "margin-left": a + "px"
                                }, "fast", e), t.scrollNavigation.panelMargin = a;
                                break;
                            default:
                                r = -1 * (o - s), d = i.css("margin-left").replace("px", ""), a = parseInt(d, 10) + a;
                                i.animate({
                                    "margin-left": Math.min(0, Math.max(r, a)) + "px"
                                }, "fast", e), t.scrollNavigation.panelMargin = a
                        }
                        setTimeout(D.synchronizeScroller, 200, t)
                    },
                    navigatePage: function(t, a) {
                        D.waitToggle(t, !0, function() {
                            t.pageNum = (t.pageNum + a + t.pageCount) % t.pageCount, t.hPosition = T(".fn-gantt .dataPanel").css("margin-left").replace("px", ""), t.scaleOldWidth = !1, D.init(t)
                        })
                    },
                    zoomInOut: function(i, s) {
                        D.waitToggle(i, !0, function() {
                            var t = s < 0,
                                a = (a = i.scaleStep + 3 * s) <= 1 ? 1 : 4 === a ? 3 : a,
                                e = _.scale,
                                n = i.headerRows;
                            "hours" === _.scale && 13 <= a ? (e = "days", n = 4, a = 13) : "days" === _.scale && t ? (e = "hours", n = 5, a = 12) : "days" !== _.scale || t ? "weeks" !== _.scale || t ? "weeks" === _.scale && t ? (e = "days", n = 4, a = 13) : "months" === _.scale && t && (e = "weeks", n = 3, a = 13) : (e = "months", n = 2, a = 14) : (e = "weeks", n = 3, a = 13), t && T.inArray(e, o) < T.inArray(_.minScale, o) || !t && T.inArray(e, o) > T.inArray(_.maxScale, o) || (i.scaleStep = a, _.scale = e, i.headerRows = n, n = (e = T(i).find(".fn-gantt .rightPanel")).find(".dataPanel"), i.hPosition = n.css("margin-left").replace("px", ""), i.scaleOldWidth = n.width() - e.width(), _.useCookie && (T.cookie(this.cookieKey + "CurrentScale", _.scale), T.cookie(this.cookieKey + "ScrollPos", null))), D.init(i)
                        })
                    },
                    mouseScroll: function(t, a) {
                        var e = T(t).find(".fn-gantt .dataPanel");
                        e.css("cursor", "move");
                        e.offset();
                        e = null === t.scrollNavigation.mouseX ? a.pageX : t.scrollNavigation.mouseX, e = a.pageX - e;
                        t.scrollNavigation.mouseX = a.pageX, D.scrollPanel(t, e), clearTimeout(t.scrollNavigation.repositionDelay), t.scrollNavigation.repositionDelay = setTimeout(D.repositionLabel, 50, t)
                    },
                    wheelScroll: function(t, a) {
                        if (0 === T(a.target).closest(".rightPanel").length) return !0;
                        a.preventDefault();
                        a = "wheelDelta" in a.originalEvent ? -1 / 120 * a.originalEvent.wheelDelta : a.originalEvent.deltaY ? a.originalEvent.deltaY / Math.abs(a.originalEvent.deltaY) : a.originalEvent.detail;
                        D.scrollPanel(t, -50 * a), clearTimeout(t.scrollNavigation.repositionDelay), t.scrollNavigation.repositionDelay = setTimeout(D.repositionLabel, 50, t)
                    },
                    sliderScroll: function(t, a) {
                        var e = T(t).find(".nav-slider-bar"),
                            n = e.find(".nav-slider-button"),
                            i = T(t).find(".fn-gantt .rightPanel"),
                            s = i.find(".dataPanel"),
                            o = e.offset(),
                            l = e.width(),
                            e = n.width();
                        a.pageX >= o.left && a.pageX <= o.left + l && (o = a.pageX - o.left, o -= e / 2, n.css("left", o), 0 <= (i = o * (n = s.width() - i.width()) / l * -1) ? (s.css("margin-left", "0px"), t.scrollNavigation.panelMargin = 0) : l - +e <= o ? (s.css("margin-left", -1 * n + "px"), t.scrollNavigation.panelMargin = -1 * n) : (s.css("margin-left", i + "px"), t.scrollNavigation.panelMargin = i), clearTimeout(t.scrollNavigation.repositionDelay), t.scrollNavigation.repositionDelay = setTimeout(D.repositionLabel, 5, t))
                    },
                    scrollPanel: function(t, a) {
                        if (!t.scrollNavigation.canScroll) return !1;
                        a = parseInt(t.scrollNavigation.panelMargin, 10) + a;
                        0 < a ? t.scrollNavigation.panelMargin = 0 : a < -1 * t.scrollNavigation.panelMaxPos ? t.scrollNavigation.panelMargin = -1 * t.scrollNavigation.panelMaxPos : t.scrollNavigation.panelMargin = a, T(t).find(".fn-gantt .dataPanel").css("margin-left", t.scrollNavigation.panelMargin + "px"), D.synchronizeScroller(t)
                    },
                    sliderRange: function(t, a) {
                        var e = T(t).find(".fn-gantt .rightPanel"),
                            t = e.find(".dataPanel"),
                            e = e.width() - t.width();
                        t.css("margin-left", (a / 100 * e).toFixed(0) + "px")
                    },
                    synchronizeScroller: function(t) {
                        var a, e;
                        "scroll" === _.navigate && (e = (a = T(t).find(".fn-gantt .rightPanel")).find(".dataPanel"), a = a.width() - e.width(), e = e.css("margin-left") ? e.css("margin-left").replace("px", "") : 0, T(t).find(".nav-slider-range").val((e / a * 100).toFixed(0)))
                    },
                    repositionLabel: function(a) {
                        setTimeout(function() {
                            var t;
                            t = a ? T(a).find(".fn-gantt .rightPanel").find(".dataPanel") : T(".fn-gantt .rightPanel .dataPanel"), _.useCookie && T.cookie(this.cookieKey + "ScrollPos", t.css("margin-left").replace("px", ""))
                        }, 500)
                    },
                    waitToggle: function(t, a, e) {
                        a ? (T(t).offset(), T(t).outerWidth(), T(t).outerHeight(), t.loader || (t.loader = T('<div class="fn-gantt-loader"><div class="fn-gantt-loader-spinner"><span>' + _.waitText + "</span></div></div>")), T(t).append(t.loader), setTimeout(e, 500)) : t.loader && t.loader.detach()
                    }
                },
                P = {
                    getMaxDate: function(t) {
                        var e = null;
                        switch (T.each(t.data, function(t, a) {
                            T.each(a.values, function(t, a) {
                                e = e < P.dateDeserialize(a.to) ? P.dateDeserialize(a.to) : e
                            })
                        }), e = e || new Date, _.scale) {
                            case "hours":
                                e.setHours(Math.ceil(e.getHours() / t.scaleStep) * t.scaleStep), e.setHours(e.getHours() + 3 * t.scaleStep);
                                break;
                            case "weeks":
                                var a = new Date(e.getTime()),
                                    a = new Date(a.setDate(a.getDate() + 21)),
                                    n = 7 * Math.floor(a.getDate() / 7),
                                    e = new Date(a.getFullYear(), a.getMonth(), 0 == n ? 4 : n - 3);
                                break;
                            case "months":
                                (a = new Date(e.getFullYear(), e.getMonth(), 1)).setMonth(a.getMonth() + 2), e = new Date(a.getFullYear(), a.getMonth(), 1);
                                break;
                            default:
                                e.setHours(0), e.setDate(e.getDate() + 3)
                        }
                        return e
                    },
                    getMinDate: function(t) {
                        var e = null;
                        switch (T.each(t.data, function(t, a) {
                            T.each(a.values, function(t, a) {
                                e = e > P.dateDeserialize(a.from) || null === e ? P.dateDeserialize(a.from) : e
                            })
                        }), e = e || new Date, _.scale) {
                            case "hours":
                                e.setHours(Math.floor(e.getHours() / t.scaleStep) * t.scaleStep), e.setHours(e.getHours() - 3 * t.scaleStep);
                                break;
                            case "weeks":
                                var a = new Date(e.getTime()),
                                    a = new Date(a.setDate(a.getDate() - 21)),
                                    n = 7 * Math.floor(a.getDate() / 7),
                                    e = new Date(a.getFullYear(), a.getMonth(), 0 == n ? 4 : n - 3);
                                break;
                            case "months":
                                (a = new Date(e.getFullYear(), e.getMonth(), 1)).setMonth(a.getMonth() - 3), e = new Date(a.getFullYear(), a.getMonth(), 1);
                                break;
                            default:
                                e.setHours(0), e.setDate(e.getDate() - 3)
                        }
                        return e
                    },
                    parseDateRange: function(t, a) {
                        for (var e = new Date(t.getTime()), n = (new Date(a.getTime()), []), i = 0; n[i++] = new Date(e.getTime()), e.setDate(e.getDate() + 1), e.getTime() <= a.getTime(););
                        return n
                    },
                    parseTimeRange: function(t, a, e) {
                        var n = new Date(t),
                            t = new Date(a);
                        n.setMilliseconds(0), n.setSeconds(0), n.setMinutes(0), n.setHours(0), t.setMilliseconds(0), t.setSeconds(0), (0 < t.getMinutes() || 0 < t.getHours()) && (t.setMinutes(0), t.setHours(0), t.setTime(t.getTime() + 864e5));
                        for (var i = [], s = 0;;) {
                            var o = new Date(n);
                            if (o.setHours(Math.floor(n.getHours() / e) * e), i[s] && o.getDay() !== i[s].getDay() && o.setHours(0), i[s] = o, n.getTime() > a.getTime()) break;
                            n = $(o, e), s++
                        }
                        return i
                    },
                    parseWeeksRange: function(t, a) {
                        for (var e = new Date(t), n = (new Date(a), []), i = 0; 0 === e.getDay() && (n[i++] = e.getDayForWeek()), e.setDate(e.getDate() + 1), e.getTime() <= a.getTime(););
                        return n
                    },
                    parseMonthsRange: function(t, a) {
                        for (var e = new Date(t), n = (new Date(a), []), i = 0; n[i++] = new Date(e.getFullYear(), e.getMonth(), 1), e.setMonth(e.getMonth() + 1), e.getTime() <= a.getTime(););
                        return n
                    },
                    dateDeserialize: function(t) {
                        return "string" == typeof t && (t = t.replace(/\/Date\((.*)\)\//, "$1"), t = T.isNumeric(t) ? parseInt(t, 10) : T.trim(t)), new Date(t)
                    },
                    genId: function(t) {
                        var a = new Date(t);
                        switch (_.scale) {
                            case "hours":
                                var e = a.getHours();
                                return 2 <= arguments.length && (e = Math.floor(a.getHours() / arguments[1]) * arguments[1]), new Date(a.getFullYear(), a.getMonth(), a.getDate(), e).getTime();
                            case "weeks":
                                var n = a.getFullYear(),
                                    e = a.getDayForWeek().getWeekOfYear();
                                return 11 === a.getMonth() && 1 === e && n++, n + "-" + e;
                            case "months":
                                return a.getFullYear() + "-" + a.getMonth();
                            default:
                                return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
                        }
                    },
                    _datesToDays: function(t) {
                        for (var a = {}, e = 0, n = t.length; e < n; e++) a[P.dateDeserialize(t[e]).setHours(0, 0, 0, 0)] = !0;
                        return a
                    },
                    isHoliday: function() {
                        if (!_.holidays) return function() {
                            return !1
                        };
                        var a = !1;
                        return function(t) {
                            return !!(a = a || P._datesToDays(_.holidays))[T.isNumeric(t) ? t : new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime()]
                        }
                    }(),
                    _getCellSize: null,
                    getCellSize: function() {
                        return P._getCellSize || (T("body").append(T('<div style="display: none; position: absolute;" class="fn-gantt" id="measureCellWidth"><div class="row"></div></div>')), P._getCellSize = T("#measureCellWidth .row").height(), T("#measureCellWidth").empty().remove()), P._getCellSize
                    },
                    getRightPanelSize: function() {
                        T("body").append(T('<div style="display: none; position: absolute;" class="fn-gantt" id="measureCellWidth"><div class="rightPanel"></div></div>'));
                        var t = T("#measureCellWidth .rightPanel").height();
                        return T("#measureCellWidth").empty().remove(), t
                    },
                    getPageHeight: function(t) {
                        return t.pageNum + 1 === t.pageCount ? t.rowsOnLastPage * P.getCellSize() : _.itemsPerPage * P.getCellSize()
                    },
                    _getProgressBarMargin: null,
                    getProgressBarMargin: function() {
                        return P._getProgressBarMargin || 0 === P._getProgressBarMargin || (T("body").append(T('<div style="display: none; position: absolute;" id="measureBarWidth" ><div class="fn-gantt"><div class="rightPanel"><div class="dataPanel"><div class="row day"><div class="bar" /></div></div></div></div></div>')), P._getProgressBarMargin = parseInt(T("#measureBarWidth .fn-gantt .rightPanel .day .bar").css("margin-left").replace("px", ""), 10), P._getProgressBarMargin += parseInt(T("#measureBarWidth .fn-gantt .rightPanel .day .bar").css("margin-right").replace("px", ""), 10), T("#measureBarWidth").empty().remove()), P._getProgressBarMargin
                    }
                };
            this.each(function() {
                switch (this.data = null, this.pageNum = 0, this.pageCount = 0, this.rowsOnLastPage = 0, this.rowsNum = 0, this.hPosition = 0, this.dateStart = null, this.dateEnd = null, this.scrollClicked = !1, this.scaleOldWidth = null, this.headerRows = null, _.useCookie && (T.cookie(this.cookieKey + "CurrentScale") ? _.scale = T.cookie(this.cookieKey + "CurrentScale") : T.cookie(this.cookieKey + "CurrentScale", _.scale)), _.scale) {
                    case "hours":
                        this.headerRows = 5, this.scaleStep = 1;
                        break;
                    case "weeks":
                        this.headerRows = 3, this.scaleStep = 13;
                        break;
                    case "months":
                        this.headerRows = 2, this.scaleStep = 14;
                        break;
                    default:
                        this.headerRows = 4, this.scaleStep = 13
                }
                this.scrollNavigation = {
                    panelMouseDown: !1,
                    scrollerMouseDown: !1,
                    mouseX: null,
                    panelMargin: 0,
                    repositionDelay: 0,
                    panelMaxPos: 0,
                    canScroll: !0
                }, this.gantt = null, this.loader = null, D.create(this)
            })
        }
    }(jQuery);
var $link = document.querySelector('link[href*="main.css"]');
$link && console.info("Version: " + ($link.href || "").split("?v=")[1]);
var TODAY = moment().format("DD/MM/YYYY"),
    PREVWEEK = moment().subtract(7, "days"),
    IS_WEEKEND = 0 === moment().day() || 6 === moment().day(),
    autoc = {},
    urlParams = new URLSearchParams(window.location.search),
    urlBase = (document.getElementsByTagName("base")[0] || {}).href,
    urlPath = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
        return null === t ? window.location.href.split("?")[0].split("#")[0].split(urlBase).join("") : t === window.location.href.split("?")[0].split("#")[0].split(urlBase).join("")
    },
    urlHost = window.location.host,
    $routes = $("[data-route]"),
    $navLinks = $("#nav > .nav-item"),
    $navToggler = $(".sidenav-toggler"),
    route = function(t) {
        var a = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        window.scrollTo(0, 0);
        var e = $('[data-route="'.concat(t, '"]')),
            n = $navLinks.find('[href="'.concat(t, '"]')).parent();
        0 === e.length && (e = $('[data-route="404"]')), $routes.hide(), e.show(), $navLinks.removeClass("active"), n.addClass("active"), document.documentElement.classList.remove("nav_open"), $navToggler.removeClass("toggled"), nav_open = 0, document.title = e.data("title"), a && window.history.pushState(null, document.title, urlBase + t), "" === t && ganttNotRendered && renderGantt({
            pegawai: pegawai,
            surat: surat,
            libur: libur,
            tglGantt: tglGantt,
            ganttItems: ganttItems
        })
    };
window.onpopstate = function(t) {
    route(urlPath(), !1)
}, $(function() {
    $(document).on("click", '[data-custom-link][data-group="main"]', function(t) {
        t.preventDefault();
        t = $(this).attr("href");
        urlPath(t) || route(t)
    }).on("click", ".page-inner[data-route]", function(t) {
        document.documentElement.classList.remove("nav_open"), $navToggler.removeClass("toggled"), nav_open = 0
    }), route(urlPath(), !1), refresh()
});
var $modal = $("#modal"),
    $modalDialog = $("#modal > .modal-dialog"),
    $modalTitle = $("#modal-title"),
    $modalBody = $("#modal-body"),
    $modalBtn = [$("#modal-footer > .btn-primary"), $("#modal-footer > .btn-default")],
    $modalBtnBefore = $("#modal-footer > .d-flex"),
    modalHiddenAction = !1,
    modal = function(t) {
        var a = t.title,
            e = t.body,
            n = t.data,
            i = void 0 === n ? {} : n,
            s = t.primaryBtn,
            o = void 0 === s ? "" : s,
            l = t.primaryBtnLabel,
            r = void 0 === l ? "Ok" : l,
            n = t.secondaryBtn,
            s = void 0 === n ? "" : n,
            l = t.secondaryBtnLabel,
            n = void 0 === l ? "Batal" : l,
            l = t.modalDialog,
            l = void 0 === l ? "" : l,
            t = t.misc,
            t = void 0 === t ? "" : t;
        return $modalTitle.html(a), $modalBody.html(e), $modalBtn[0].html(r).attr("class", "btn btn-primary").addClass(o), $modalBtn[1].html(n).attr("class", "btn btn-default").addClass(s), $modalBtnBefore.html(t), $modalDialog.attr("class", "modal-dialog").addClass(l), $modal.data(i).modal("show")
    };
$modal.length && $modal.on("hidden.bs.modal", function(t) {
    $modalBtn[0].removeData().prop("disabled", !1), $modal.removeData(), modalHiddenAction && modalHiddenAction(), modalHiddenAction = !1
}).on("shown.bs.modal", function(t) {
    $modal.data("shown.bs.modal") && $modal.data("shown.bs.modal")()
}).on("show.bs.modal", function(t) {
    $modal.find(".selectpicker").selectpicker("render"), $modal.data("show.bs.modal") && $modal.data("show.bs.modal")()
}), $.notifyDefaults({
    placement: {
        from: "bottom"
    },
    animate: {
        enter: "animated fadeInUp",
        exit: "animated fadeOutDown"
    }
});
var notif = function(t, a) {
    var e = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        n = 3 < arguments.length ? arguments[3] : void 0,
        i = 4 < arguments.length ? arguments[4] : void 0;
    e && $.notifyClose();
    e = "icon-info";
    "wait" === a && (e = "icon-hourglass", a = "info"), "success" === a && (e = "icon-check"), "danger" === a && (e = "icon-exclamation"), $.notify(_objectSpread({
        message: t,
        icon: e
    }, i), _objectSpread({
        type: a
    }, n))
};

function throttle(t, a) {
    var e = Date.now();
    return function() {
        e + a - Date.now() < 0 && (t(), e = Date.now())
    }
}
$.fn.datepicker.defaults.maxViewMode = 1, $.fn.datepicker.defaults.format = "dd/mm/yyyy", $.fn.datepicker.defaults.startDate = "01/01/2019", $.fn.datepicker.defaults.endDate = NEXTMONTH, $.fn.datepicker.defaults.language = "id", $.fn.datepicker.defaults.weekStart = 1, $.extend(!0, $.fn.dataTable.defaults, {
    dom: "<'row'<'col'l><'col'f>>r<'table-responsive't><'row'<'col'i><'col'p>>",
    language: {
        decimal: ",",
        thousands: ".",
        lengthMenu: "Menampilkan _MENU_ data",
        search: "Cari",
        info: "Halaman _PAGE_ dari _PAGES_",
        infoFiltered: "(disaring dari total _MAX_ data)",
        infoEmpty: "Menampilkan 0 hasil",
        paginate: {
            previous: '<i class="fas fa-chevron-left"></i>',
            next: '<i class="fas fa-chevron-right"></i>'
        },
        zeroRecords: "Tidak ada hasil",
        emptyTable: "Tidak ada data",
        select: {
            rows: {
                _: "%d surat dipilih",
                0: ""
            }
        }
    }
}), "undefined" != typeof numeral && (numeral.register("locale", "id", {
    delimiters: {
        thousands: ".",
        decimal: ","
    },
    abbreviations: {
        thousand: "Rb",
        million: "Jt",
        billion: "M",
        trillion: "T"
    },
    currency: {
        symbol: "Rp&nbsp;"
    }
}), numeral.locale("id"));
var getNomorSurat = function(t, a) {
        var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            n = moment(a).format("MM"),
            a = moment(a).format("YYYY");
        return 2 === setting.sistem ? t.replace("{BB}", n).replace("{MM}", n).replace("{TTTT}", a).replace("{YYYY}", a) : "spd" === e ? [t, n, "SPD", a].join("/") : "pws" === e ? "-" === t ? "-" : [t, n, "ST", "PWS", a].join("/") : "-" === t ? "-" : [t, n, "ST", a].join("/")
    },
    getWaktu = function(t) {
        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        if (null == a || t === a) return moment(t).format("D MMMM YYYY");
        t = moment(t).format("D MMMM YYYY").split(" "), a = moment(a).format("D MMMM YYYY").split(" ");
        return t[2] === a[2] ? t[1] === a[1] ? t[0] + " s.d. " + a.join(" ") : t[0] + " " + t[1] + " s.d. " + a.join(" ") : t.join(" ") + " s.d. " + a.join(" ")
    },
    getOrang = function(a) {
        var t = "m" === a.charAt(0) ? mitra.find(function(t) {
            return t.id == a.substr(1)
        }) : pegawaiByNip[a.replace(/[#]/g, "")];
        return t ? _objectSpread({
            jabatan: "Mitra BPS",
            nip: "-",
            golongan: "-",
            pangkat: "-"
        }, t) : {
            nama: ".........",
            jabatan: "",
            nip: ""
        }
    },
    pelaksanaToString = function(t) {
        var a = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        return t = t.split(","), getOrang(t[0]).nama + (a && t[1] ? ", dkk" : "")
    };

function Nip(t) {
    this.nip = t
}
var nip = function(t) {
    return new Nip(t)
};
nip.fn = Nip.prototype = {
    print: function() {
        return this.nip.substr(0, 8) + " " + this.nip.substr(8, 6) + " " + this.nip.substr(14, 1) + " " + this.nip.substr(15, 3)
    }
};
var selectpickerPegawai = function(t) {
        var a = t.name,
            a = void 0 === a ? "pegawai" : a,
            e = t.selected,
            t = t.title,
            t = void 0 === t ? "Pilih pegawai..." : t;
        return '\n\t<select class="selectpicker" name="'.concat(a, '" data-width="100%" data-live-search="true" title="').concat(t, '" data-style="btn-light btn-sm" ').concat(a.includes("[]") ? "multiple" : "", ">\n\t\t").concat(pegawai.map(function(t, a) {
            return '<option value="'.concat(t.nipbps, '" ').concat(e === a || (e || "").toString().includes(t.nipbps) ? "selected" : "", ">").concat(t.nama, "</option>")
        }).join(""), "\n\t</select>\n")
    },
    selectpickerPegawaiDanMitra = function(t) {
        var a = t.name,
            e = void 0 === a ? "pelaksana" : a,
            n = t.selected,
            a = t.title,
            a = void 0 === a ? "Pilih pelaksana..." : a,
            t = t.disabled,
            t = void 0 !== t && t;
        return '\n\t<select class="selectpicker" name="'.concat(e, '" data-width="100%" data-live-search="true" title="').concat(a, '" data-style="btn-light btn-sm"').concat(e.includes("[]") ? " multiple" : "").concat(t ? " disabled" : "", ">\n\t\t").concat(pegawai.map(function(t, a) {
            return '<option value="'.concat(t.nipbps, '" ').concat((n || "").toString().includes(t.nipbps) ? "selected" : "", ">").concat(t.nama, "</option>")
        }).join(""), "\n\t\t").concat(mitra.length && '<optgroup label="Mitra">' + mitra.map(function(t, a) {
            return '<option value="m'.concat(t.id, '" data-subtext="').concat(t.asal, '" ').concat((n || "").toString().includes("m" + t.id) ? "selected" : "", ">").concat(t.nama, "</option>")
        }).join("") + "</optgroup>", "\n\t</select>\n")
    },
    selectpickerJenisKegiatan = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
        return ("00" === SATKER.substr(2) ? '\n\t<select name="jenis" class="selectpicker" data-width="100%" title="Pilih jenis kegiatan..." data-style="btn-light btn-sm">\n\t\t<option value="1" '.concat(1 == t ? "selected" : "", '>Kegiatan TU</option>\n\t\t<option value="2" ').concat(2 == t ? "selected" : "", '>Kegiatan Bidang Statistik Sosial</option>\n\t\t<option value="3" ').concat(3 == t ? "selected" : "", '>Kegiatan Bidang Statistik Produksi</option>\n\t\t<option value="4" ').concat(4 == t ? "selected" : "", '>Kegiatan Bidang Statistik Distribusi</option>\n\t\t<option value="5" ').concat(5 == t ? "selected" : "", '>Kegiatan Bidang NWAS</option>\n\t\t<option value="6" ').concat(6 == t ? "selected" : "", '>Kegiatan Bidang IPDS</option>\n\t\t<option value="0" ') : '\n\t<select name="jenis" class="selectpicker" data-width="100%" title="Pilih jenis kegiatan..." data-style="btn-light btn-sm">\n\t\t<option value="1" '.concat(1 == t ? "selected" : "", '>Kegiatan TU</option>\n\t\t<option value="2" ').concat(2 == t ? "selected" : "", '>Kegiatan Seksi Statistik Sosial</option>\n\t\t<option value="3" ').concat(3 == t ? "selected" : "", '>Kegiatan Seksi Statistik Produksi</option>\n\t\t<option value="4" ').concat(4 == t ? "selected" : "", '>Kegiatan Seksi Statistik Distribusi</option>\n\t\t<option value="5" ').concat(5 == t ? "selected" : "", '>Kegiatan Seksi NWAS</option>\n\t\t<option value="6" ').concat(6 == t ? "selected" : "", '>Kegiatan Seksi IPDS</option>\n\t\t<option value="0" ')).concat(0 == t ? "selected" : "", ">Kegiatan Lainnya</option>\n\t</select>\n")
    },
    selectpickerSeksi = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
        return ("00" === SATKER.substr(2) ? '\n\t<select name="seksi" class="selectpicker" data-width="100%" title="Pilih bidang..." data-style="btn-light btn-sm">\n\t\t<option value="1" '.concat(1 == t ? "selected" : "", '>Bagian TU</option>\n\t\t<option value="2" ').concat(2 == t ? "selected" : "", '>Bidang Statistik Sosial</option>\n\t\t<option value="3" ').concat(3 == t ? "selected" : "", '>Bidang Statistik Produksi</option>\n\t\t<option value="4" ').concat(4 == t ? "selected" : "", '>Bidang Statistik Distribusi</option>\n\t\t<option value="5" ').concat(5 == t ? "selected" : "", '>Bidang NWAS</option>\n\t\t<option value="6" ').concat(6 == t ? "selected" : "", '>Bidang IPDS</option>\n\t\t<option value="0" ') : '\n\t<select name="seksi" class="selectpicker" data-width="100%" title="Pilih seksi..." data-style="btn-light btn-sm">\n\t\t<option value="1" '.concat(1 == t ? "selected" : "", '>Sub-Bagian TU</option>\n\t\t<option value="2" ').concat(2 == t ? "selected" : "", '>Seksi Statistik Sosial</option>\n\t\t<option value="3" ').concat(3 == t ? "selected" : "", '>Seksi Statistik Produksi</option>\n\t\t<option value="4" ').concat(4 == t ? "selected" : "", '>Seksi Statistik Distribusi</option>\n\t\t<option value="5" ').concat(5 == t ? "selected" : "", '>Seksi NWAS</option>\n\t\t<option value="6" ').concat(6 == t ? "selected" : "", '>Seksi IPDS</option>\n\t\t<option value="0" ')).concat(0 == t ? "selected" : "", ">Lainnya</option>\n\t</select>\n")
    },
    modalEditSetting = function() {
        modal({
            title: "Pengaturan",
            body: '\n\t\t\t<div class="form-view">\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">Penomoran Surat</div>\n\t\t\t\t\t<div class="col-9 mb-2-3"><select name="sistem" class="selectpicker" data-width="100%" data-style="btn-light btn-sm"><option value="0">Sistem 1 &nbsp;(ST, ST PWS, SPD)</option><option value="1" '.concat(1 == setting.sistem ? "selected" : "", '>Sistem 2 &nbsp;(ST, SPD)</option><option value="2" ').concat(2 == setting.sistem ? "selected" : "", '>Sistem 3 &nbsp;(Custom)</option></select></div>\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">').concat("00" === SATKER.substr(2) ? "Provinsi" : "Kabupaten/Kota", '</div>\n\t\t\t\t\t<div class="col-9 mb-2-3"><input type="text" name="nama_bps" class="form-control form-control-sm" value="').concat(setting.nama_bps || "", '" maxlength="45"></div>\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">Kepala BPS</div>\n\t\t\t\t\t<div class="col-9 mb-2-3">').concat(selectpickerPegawai({
                name: "kepala",
                selected: setting.kepala || "",
                title: "Pilih kepala BPS..."
            }), '</div>\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">PPK</div>\n\t\t\t\t\t<div class="col-9 mb-2-3">').concat(selectpickerPegawai({
                name: "ppk",
                selected: setting.ppk || "",
                title: "Pilih PPK..."
            }), '</div>\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">Alamat</div>\n\t\t\t\t\t<div class="col-9 mb-2-3"><input type="text" name="alamat" class="form-control form-control-sm" value="').concat(setting.alamat || "", '" maxlength="45"></div>\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">Alamat TTD</div>\n\t\t\t\t\t<div class="col-9 mb-2-3"><input type="text" name="alamat_ttd" class="form-control form-control-sm" value="').concat(setting.alamat_ttd || "", '" maxlength="30"></div>\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">Footer Surat<div class="text-success fw-400 fz-13">(Opsional)</div></div>\n\t\t\t\t\t<div class="col-9 mb-2-3"><textarea name="footer_surat" class="form-control form-control-sm" rows="4">').concat(setting.footer_surat || "", '</textarea></div>\n\t\t\t\t\t<div class="col-12 px-0"><hr class="mt-1"></div>\n\t\t\t\t\t<div class="col-3 mb-2-3 mt-1">Server</div>\n\t\t\t\t\t<div class="col-9 mb-2-3"><input type="text" name="server" placeholder="Default" class="form-control form-control-sm" value="').concat(setting.server || "", '" maxlength="64"></div>\n\t\t\t\t\t<div class="col-9 offset-3 fz-12 mt--2"><a class="text-warning" href="bantuan#pengaturan-server" target="_blank"><i>Baca panduan sebelum mengedit server</i></a></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t'),
            primaryBtn: "submit-setting-btn btn-secondary",
            primaryBtnLabel: "Simpan Perubahan"
        })
    },
    modalUploadTemplate = function() {
        modal({
            title: "Ubah Template Dokumen",
            body: '\n\t\t\t<form id="form-upload-template" action="api/upload-template" method="post" enctype="multipart/form-data">\n\t\t\t\t<div class="bg-lightgray fz-13 p-3 mt--3" style="margin-left: -15px; margin-right: -15px;">\n\t\t\t\t\tDownload template default terlebih dahulu<br>→ modifikasi → upload</i>\n\t\t\t\t</div>\n\t\t\t\t<div class="pt-4">\n\t\t\t\t\t<select class="selectpicker" name="type" data-width="100%" title="Tipe Dokumen" data-style="btn-light btn-sm" required>\n\t\t\t\t\t\t<option value="st">Surat Tugas</option>\n\t\t\t\t\t\t<option value="st-spd">Surat Tugas dengan SPD</option>\n\t\t\t\t\t\t<option value="kwitansi">Kwitansi</option>\n\t\t\t\t\t\t<option value="kwitansi-riil">Kwitansi dengan Pengeluaran Riil</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div class="pt-4">\n\t\t\t\t\t<input type="file" name="template" accept=".doc,.docx">\n\t\t\t\t</div>\n\t\t\t\t<div class="pt-1-2 fz-11 text-warning">(Maksimal 3 MB)</div>\n\t\t\t</form>\n\t\t',
            primaryBtn: "submit-upload-template-btn btn-secondary",
            primaryBtnLabel: "Upload",
            modalDialog: "modal-sm"
        })
    },
    modalDeleteTemplate = function(t) {
        modal({
            title: "Hapus Template Dokumen",
            body: "Apakah Anda yakin akan mengembalikan template dokumen ke pengaturan default?",
            primaryBtn: "submit-delete-template-btn btn-danger",
            primaryBtnLabel: "Ya",
            modalDialog: "modal-sm",
            data: {
                type: t
            }
        })
    };
$(function() {
    $modal.on("click", ".submit-setting-btn", function() {
        var t = {
            sistem: $('#modal [name="sistem"]').val(),
            nama_bps: $('#modal [name="nama_bps"]').val(),
            kepala: $('#modal [name="kepala"]').val(),
            ppk: $('#modal [name="ppk"]').val(),
            alamat: $('#modal [name="alamat"]').val(),
            alamat_ttd: $('#modal [name="alamat_ttd"]').val(),
            footer_surat: $('#modal [name="footer_surat"]').val(),
            server: $('#modal [name="server"]').val()
        };
        $.ajax({
            type: "POST",
            data: t,
            url: "api/save-setting",
            success: function(t) {
                console.info("Response from api/save-setting", t), t.success ? (delete t.success, setting = t, notif("Pengaturan berhasil diperbarui", "success", 1), announce("pengaturan"), refresh()) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), $modal.modal("hide"), notif("Menyimpan pengaturan...", "wait")
    }).on("click", ".submit-upload-template-btn", function() {
        var i = 1;
        $modal.find("[name]").each(function(t, a) {
            var e = $(a),
                n = e.attr("name"),
                a = e.val();
            console.log({
                name: n,
                val: a
            }), a ? e.parent().removeClass("has-error") : (e.parent().addClass("has-error"), i = 0)
        }), i && ($("#form-upload-template").submit(), $modal.modal("hide"), notif("Menyimpan pengaturan...", "wait"))
    }).on("click", ".submit-delete-template-btn", function() {
        $.ajax({
            type: "POST",
            data: {
                type: $modal.data("type")
            },
            url: "api/delete-template",
            success: function(t) {
                location.reload()
            },
            error: function(t) {
                location.reload()
            }
        }), $modal.modal("hide"), notif("Menghapus template dokumen...", "wait")
    })
});
var $setting = $("#setting"),
    updateSetting = function() {
        glob = {
            kab: setting.nama_bps,
            alamat: setting.alamat,
            footer: setting.footer_surat,
            tempat: setting.alamat_ttd,
            kpl: {
                nama: pegawaiByNip[setting.kepala] ? pegawaiByNip[setting.kepala].nama : ".....",
                nip: pegawaiByNip[setting.kepala] ? pegawaiByNip[setting.kepala].nip : "....."
            },
            ppk: {
                nama: pegawaiByNip[setting.ppk] ? pegawaiByNip[setting.ppk].nama : ".....",
                nip: pegawaiByNip[setting.ppk] ? pegawaiByNip[setting.ppk].nip : "....."
            },
            server: setting.server
        }, setting.sistem = parseInt(setting.sistem), setting.sistem ? ($("#panel-tugas, #panel-tugas-pengawasan, #panel-perjalanan-dinas").removeClass("col-xl-4"), $("body").addClass("without-st-pws")) : ($("#panel-tugas, #panel-tugas-pengawasan, #panel-perjalanan-dinas").addClass("col-xl-4"), $("body").removeClass("without-st-pws")), $setting.html('\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Penomoran Surat <a href="bantuan#penomoran-surat" title="Sistem penomoran ST/SPD"><sup>[?]</sup></a></div>\n\t\t<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="'.concat(["Sistem 1  (ST, ST PWS, SPD)", "Sistem 2  (ST, SPD)", "Sistem 3  (Custom)"][setting.sistem], '"></div>\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">').concat("00" === SATKER.substr(2) ? "Provinsi" : "Kabupaten/Kota", '</div>\n\t\t<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="').concat(glob.kab, '"></div>\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Kepala BPS</div>\n\t\t<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="').concat(glob.kpl.nama, "  /  ").concat(glob.kpl.nip, '"></div>\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">PPK</div>\n\t\t<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="').concat(glob.ppk.nama, "  /  ").concat(glob.ppk.nip, '"></div>\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Alamat</div>\n\t\t<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="').concat(glob.alamat, '"></div>\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Alamat TTD</div>\n\t\t<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="').concat(glob.tempat, '"></div>\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 mb-2 text-right fw-600 mt-1">Footer Surat</div>\n\t\t<div class="col-7 col-sm-9 col-xl-10"><textarea class="form-control form-control-sm mb-2" rows="3" readonly>').concat(glob.footer, '</textarea></div>\n\t\t<div class="col-5 col-sm-3 col-xl-2 pr-0 pl-1 text-right fw-600 mt-1">Server <a href="bantuan#pengaturan-server" title="Server untuk generate surat"><sup>[?]</sup></a></div>\n\t\t<div class="col-7 col-sm-9 col-xl-10 mb-2"><input type="text" class="form-control form-control-sm" readonly value="').concat(glob.server || "Default", '"></div>\n\t'))
    };
template && $("#setting-template").html('\n\t\t<div class="fz-11 fw-600">Surat Tugas:</div>\n\t\t<a href="'.concat(template.st.replace("app/docs/", "assets/docs/"), '">\n\t\t\t<i class="').concat(template.st.startsWith("app/docs/") ? "far" : "fas", ' fa-file-word mr-1"></i>\n\t\t\t<span ').concat(template.st.startsWith("app/docs/") ? "" : 'class="fw-600"', ">\n\t\t\t\t").concat(template.st.replace("app/docs/", "assets/docs/").replace("assets/docs/", "").replace("custom/", ""), "\n\t\t\t</span>\n\t\t</a>\n\t\t").concat(template.st.startsWith("app/docs/") ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'st\')"><i class="fas fa-trash mr-1"></i>Hapus</button>', '\n\t\t<div class="fz-11 fw-600 pt-3">Surat Tugas dengan SPD:</div>\n\t\t<a href="').concat(template["st-spd"].replace("app/docs/", "assets/docs/"), '">\n\t\t\t<i class="').concat(template["st-spd"].startsWith("app/docs/") ? "far" : "fas", ' fa-file-word mr-1"></i>\n\t\t\t<span ').concat(template["st-spd"].startsWith("app/docs/") ? "" : 'class="fw-600"', ">\n\t\t\t\t").concat(template["st-spd"].replace("app/docs/", "assets/docs/").replace("assets/docs/", "").replace("custom/", ""), "\n\t\t\t</span>\n\t\t</a>\n\t\t").concat(template["st-spd"].startsWith("app/docs/") ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'st-spd\')"><i class="fas fa-trash mr-1"></i>Hapus</button>', '\n\t\t<hr style="margin-left: -20px; margin-right: -20px;">\n\t\t<div class="fz-11 fw-600">Kwitansi:</div>\n\t\t<a href="').concat(template.kwitansi.replace("app/docs/", "assets/docs/"), '">\n\t\t\t<i class="').concat(template.kwitansi.startsWith("app/docs/") ? "far" : "fas", ' fa-file-word mr-1"></i>\n\t\t\t<span ').concat(template.kwitansi.startsWith("app/docs/") ? "" : 'class="fw-600"', ">\n\t\t\t\t").concat(template.kwitansi.replace("app/docs/", "assets/docs/").replace("assets/docs/", "").replace("custom/", ""), "\n\t\t\t</span>\n\t\t</a>\n\t\t").concat(template.kwitansi.startsWith("app/docs/") ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'kwitansi\')"><i class="fas fa-trash mr-1"></i>Hapus</button>', '\n\t\t<div class="fz-11 fw-600 pt-3">Kwitansi dengan Pengeluaran Riil:</div>\n\t\t<a href="').concat(template["kwitansi-riil"].replace("app/docs/", "assets/docs/"), '">\n\t\t\t<i class="').concat(template["kwitansi-riil"].startsWith("app/docs/") ? "far" : "fas", ' fa-file-word mr-1"></i>\n\t\t\t<span ').concat(template["kwitansi-riil"].startsWith("app/docs/") ? "" : 'class="fw-600"', ">\n\t\t\t\t").concat(template["kwitansi-riil"].replace("app/docs/", "assets/docs/").replace("assets/docs/", "").replace("custom/", ""), "\n\t\t\t</span>\n\t\t</a>\n\t\t").concat(template["kwitansi-riil"].startsWith("app/docs/") ? '<small class="text-gray">(default)</small>' : '<button class="btn px-1 py-0 ml-1 text-danger" onclick="modalDeleteTemplate(\'kwitansi-riil\')"><i class="fas fa-trash mr-1"></i>Hapus</button>', "\n\t"));
var refresh = function() {
        urlPath("") ? renderGantt({
            pegawai: pegawai,
            surat: surat,
            libur: libur,
            tglGantt: tglGantt,
            ganttItems: ganttItems
        }) : ganttNotRendered = !0, $(function() {
            suratTable.clear().rows.add(surat.filter(function(t) {
                return moment(t.tgl_mulai).isSameOrAfter(tglGantt[0], "day")
            }).reverse()).draw()
        }), autoc = {
            kec: _toConsumableArray(new Set(mitra.map(function(t) {
                return t.kec
            }))),
            tjn: _toConsumableArray(new Set(surat.map(function(t) {
                return t.tujuan
            }))),
            tmp: _toConsumableArray(new Set(surat.map(function(t) {
                return t.tempat
            })))
        }, updateSetting(), updateDaftarTugas(), generateCalendar()
    },
    refreshPegawai = function() {
        pegawaiTable.clear().rows.add(pegawai).draw(), pegawaiByNip = pegawai.reduce(function(t, a) {
            var e = a.nipbps,
                n = a.nip,
                a = _objectWithoutProperties(a, ["nipbps", "nip"]);
            return t[e] = _objectSpread({
                nip: nip(n).print()
            }, a), t
        }, {}), mitraTable.clear().rows.add(mitra).draw(), refresh()
    };
$(function() {
    $("#nav-user-avatar").attr("src", "https://community.bps.go.id/images/avatar/" + ME.urlfoto), $("#nav-user-name").html(ME.nama).attr("title", ME.nama), $("#nav-user-email").html(ME.username + "@bps.go.id").attr("title", ME.username + "@bps.go.id"), $(".scrollbar-inner").scrollbar(), $('#akun-saya-container-1 [name="nama"]').val(ME.nama), $('#akun-saya-container-1 [name="username"]').val(ME.username), $('#akun-saya-container-1 [name="peran"]').val(["", "Top Manager", "Developer", "Supervisor", "Administrator", "Editor", "Viewer"][LV]), $('#akun-saya-container-2 [name="nip"]').val(ME.nip || "-"), $('#akun-saya-container-2 [name="nipbps"]').val(/^bps\d{4}$/.test(NIP) ? "-" : NIP), $('#akun-saya-container-2 [name="email"]').val(ME.username + "@bps.go.id"), $('#akun-saya-container-2 [name="jabatan"]').val(ME.jabatan || "-"), $('#akun-saya-container-2 [name="golongan"]').val(ME.golongan || "-"), $('#akun-saya-container-2 [name="pangkat"]').val(ME.pangkat || "-"), 5 < LV && ($(".buat-st-btn").hide(), $(".buat-pws-btn").hide())
});
var suratTable, suratCalendar, $ganttTopRow, JENIS = "00" === SATKER.substr(2) ? ["Lainnya", "Bagian Tata Usaha", "Bidang Statistik Sosial", "Bidang Statistik Produksi", "Bidang Statistik Distribusi", "Bidang NWAS", "Bidang IPDS"] : ["Lainnya", "Subbagian Tata Usaha", "Seksi Statistik Sosial", "Seksi Statistik Produksi", "Seksi Statistik Distribusi", "Seksi NWAS", "Seksi IPDS"],
    ANGKUTAN = ["", "Kendaraan Dinas", "Kendaraan Pribadi", "Angkutan Umum"],
    COLOR = ["#343a40", "#ffe180", "#f9bad6", "#d2ea95", "#ccc", "#fcd29a", "#b6d5fc"],
    f0 = "YYYY-MM-DD",
    f1 = "DD/MM/YYYY",
    f2 = "D MMMM YYYY",
    ganttBar = function(t) {
        return ["bg-dark text-white", "ganttYellow", "ganttRed", "ganttGreen", "ganttGray", "ganttOrange", "ganttBlue"][t] + (!(1 < arguments.length && void 0 !== arguments[1]) || arguments[1] ? " has-flag" : "")
    },
    ganttColor = function(t) {
        return ["text-dark", "ganttYellow-text", "ganttRed-text", "ganttGreen-text", "ganttGray-text", "ganttOrange-text", "ganttBlue-text"][t]
    },
    sortNo = function(t, a) {
        var e = t.no,
            n = a.no,
            t = parseInt(n, 10),
            a = parseInt(e, 10);
        return t != a ? t - a : 1e3 * n.charCodeAt(n.length - 2) + n.charCodeAt(n.length - 1) - 1e3 * e.charCodeAt(e.length - 2) + e.charCodeAt(e.length - 1)
    },
    sortNoSpd = function(t, a) {
        var e = t.no_spd,
            n = void 0 === e ? 0 : e,
            t = a.no_spd,
            e = void 0 === t ? 0 : t,
            a = parseInt(e, 10),
            t = parseInt(n, 10);
        return a != t ? a - t : 1e3 * e.charCodeAt(e.length - 2) + e.charCodeAt(e.length - 1) - 1e3 * n.charCodeAt(n.length - 2) + n.charCodeAt(n.length - 1)
    },
    sortTgl = function(t, a) {
        t = t.tgl, a = a.tgl;
        return moment(t, f0).isBefore(moment(a, f0), "day") ? 1 : moment(t, f0).isAfter(moment(a, f0), "day") ? -1 : 0
    },
    getSurat = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
            a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
            t = ("spd" === t ? surat.filter(function(t) {
                return null != t.no_spd && "-" != t.no_spd
            }).sort(sortNoSpd) : ("pws" === t ? surat.filter(function(t) {
                return "1" === t.pws
            }) : surat.filter(function(t) {
                return "0" === t.pws || null == t.pws
            })).sort(sortNo)).sort(sortTgl);
        return a ? t.filter(function(t) {
            return t.tgl === a
        }) : t
    },
    generateNomorSurat = function(t) {
        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
            e = a ? getSurat(t).find(function(t) {
                return moment(t.tgl, f0).isSameOrBefore(moment(a, f0), "day")
            }) : getSurat(t)[0];
        return e ? parseInt("spd" === t ? e.no_spd : e.no, 10) + 1 : ""
    },
    allowEditSurat = function(t, a) {
        return LV < 6 && (0 == t || t == ME.seksi || a == NIP || LV < 5)
    },
    $gantt = $("#gantt"),
    tglGantt = [moment().subtract(40, "days").toDate(), moment().add(30, "days").toDate()],
    ganttNotRendered = !1,
    ganttItems = 999;

function ganttSticky() {
    var t = $(window).scrollTop() - $gantt.offset().top + 14;
    $ganttTopRow && $ganttTopRow.css("top", (0 < t ? t : 0) + "px")
}
$(function() {
    window.addEventListener("scroll", function(t) {
        ganttSticky()
    })
});
var renderGantt = function(t) {
        var a = t.pegawai,
            e = t.surat,
            n = t.libur,
            i = t.tglGantt,
            t = t.ganttItems,
            t = void 0 === t ? 999 : t;
        $gantt.gantt({
            source: a.map(function(t) {
                return mapPegawaiSurat(t, e, i[0])
            }),
            holidays: n,
            navigate: "scroll",
            scale: "days",
            maxScale: "days",
            minScale: "days",
            months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            dow: ["M", "S", "S", "R", "K", "J", "S"],
            waitText: "Mohon tunggu...",
            scrollToToday: !1,
            itemsPerPage: t,
            dateStart: (i[0] ? moment(i[0]) : moment().subtract(1, "months")).toDate(),
            dateEnd: (i[1] ? moment(i[1]) : moment().add(1, "months")).toDate(),
            onItemClick: function(t) {
                console.log(t), modalViewSurat(t)
            },
            onAddClick: function(t, a) {
                console.log(t, a);
                t = t ? moment.unix(t / 1e3) : moment();
                if (a) {
                    if (LV < 6) {
                        if (4 < LV) {
                            if (t.isBefore(PREVWEEK, "day")) return notif('Pembuatan surat tugas sebelum minggu lalu hanya dapat dilakukan oleh <span class="fw-600">Administrator</span>', "danger", 0, {
                                delay: 1e3
                            });
                            if (t.isAfter(moment(NEXTMONTH, f1), "day")) return notif('Pembuatan surat tugas di atas sebulan yang akan datang hanya dapat dilakukan oleh <span class="fw-600">Administrator</span>', "danger", 0, {
                                delay: 1e3
                            })
                        }
                        modalEditSurat({
                            pelaksana: a,
                            tgl: t.format(f1)
                        })
                    }
                } else modalRekap(t)
            },
            popover: function(t) {
                var a = t.no,
                    e = t.no_spd,
                    n = t.pws,
                    i = t.tgl,
                    s = t.tujuan,
                    o = t.tempat,
                    l = t.tgl_mulai,
                    t = t.tgl_akhir;
                return {
                    title: "-" === a ? "" : getNomorSurat(a, i, 1 == n ? "pws" : null) + (null != e && "-" != e ? '<div class="d-inline-block mx-1">·</div>' + getNomorSurat(e, i, "spd") : ""),
                    content: popoverBar({
                        tujuan: s,
                        tempat: o,
                        tgl_mulai: l,
                        tgl_akhir: t
                    }),
                    trigger: "hover",
                    placement: function() {
                        return matchMedia("(min-width: 576px)").matches ? "auto" : "top"
                    },
                    html: !0
                }
            },
            onRender: function(t, a) {
                var e = $(a).find(".rightPanel"),
                    n = e.find(".dataPanel"),
                    i = e.width(),
                    e = n.width();
                if (!a.scrollNavigation.canScroll || !n.find(".today").length) return !1;
                e = -1 * (e - i), n.css("margin-left").replace("px", ""), i = n.find(".today").offset().left - n.offset().left;
                i -= 167, 0 < (i *= -1) ? i = 0 : i < e && (i = e), n.animate({
                    "margin-left": i + "px"
                }, "fast", function() {
                    t.repositionLabel(a)
                }), a.scrollNavigation.panelMargin = i, setTimeout(t.synchronizeScroller, 200, a), ganttNotRendered = !1, $ganttTopRow = $("#gantt .dataPanel > .row, #gantt .leftPanel > .row.spacer")
            }
        })
    },
    mapPegawaiSurat = function(t, a, o) {
        var i = t.nipbps,
            e = (t.nip, t.username, t.nama);
        t.urlfoto;
        return {
            id: i,
            name: a.find(function(t) {
                var a = t.tgl_mulai,
                    e = t.tgl_akhir,
                    n = t.pelaksana,
                    t = t.no_spd;
                return IS_WEEKEND || n.includes(i) && moment().isBetween(a, e, "day", "[]") && t
            }) ? '<i class="fa-fw fas fa-fingerprint text-lightgray"></i>' : '<i class="fa-fw fas fa-fingerprint text-success"></i>',
            desc: e,
            values: a.filter(function(t) {
                return t.pelaksana.includes(i)
            }).map(function(t) {
                var a = t.no_spd,
                    e = t.pws,
                    n = t.tgl_mulai,
                    i = t.tgl_akhir,
                    s = t.jenis,
                    t = _objectWithoutProperties(t, ["no_spd", "pws", "tgl_mulai", "tgl_akhir", "jenis"]);
                return {
                    from: (moment(n).isBefore(o, "day") ? moment(o).subtract(1, "days") : moment(n)).format(),
                    to: moment(i).format(),
                    dataObj: _objectSpread({
                        no_spd: a,
                        pws: e,
                        tgl_mulai: n,
                        tgl_akhir: i,
                        jenis: s
                    }, t),
                    customClass: ganttBar(s, a),
                    label: "1" === e ? '<i class="fas fa-user-tie"></i>' : ""
                }
            })
        }
    },
    popoverBar = function(t) {
        var a = t.tujuan,
            e = t.tempat,
            n = t.tgl_mulai,
            t = t.tgl_akhir;
        return '\n\t<div class="font-weight-bold">'.concat(a, "</div>\n\t<div>di ").concat(e, '</div>\n\t<div class="text-muted mt-2"><i class="far fa-calendar-alt mr-2"></i>').concat(getWaktu(n, t), "</div>\n")
    },
    modalEditTanggal = function() {
        modal({
            title: "Atur Rentang Waktu",
            body: '<div class="text-muted mb-3">Atur rentang waktu tugas & perjalanan dinas yang akan ditampilakan:</div><div class="input-daterange input-group input-group-sm" id="datepicker"><input type="text" class="input-sm form-control" name="start" value="'.concat(moment(tglGantt[0]).format(f1), '"><div class="input-group-prepend"><span class="input-group-text">sampai</span></div><input type="text" class="input-sm form-control" name="end" value="').concat(moment(tglGantt[1]).format(f1), '"></div>'),
            modalDialog: "modal-sm",
            primaryBtn: "submit-tgl-btn",
            primaryBtnLabel: "Simpan",
            data: {
                "shown.bs.modal": function() {
                    $("#modal .input-daterange").datepicker({
                        endDate: moment().add(2, "months").format(f1)
                    }), $("#modal input[name=start]").focus()
                }
            }
        })
    },
    modalEditTanggalProcessData = function() {
        return {
            mulai: moment($modal.find('[name="start"]').val(), f1).format(f0),
            akhir: moment($modal.find('[name="end"]').val(), f1).format(f0)
        }
    },
    submitTanggal = function(a) {
        $.ajax({
            type: "POST",
            data: a,
            url: "api/get-surat",
            success: function(t) {
                console.info("Response from api/get-surat", t), Array.isArray(t) ? (surat = t, tglGantt = [moment(a.mulai).toDate(), moment(a.akhir).toDate()], notif("Rentang waktu telah diperbarui", "success", 1), refresh()) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), notif("Memperbarui rentang waktu...", "wait")
    },
    modalRekap = function(n) {
        var t = surat.filter(function(t) {
                var a = t.pelaksana,
                    e = t.tgl_mulai,
                    t = t.tgl_akhir;
                return moment(n).isBetween(e, t, "day", "[]") && !a.split(",").every(function(t) {
                    return t.includes("m")
                })
            }),
            a = moment(n).subtract(1, "days"),
            e = moment(n).add(1, "days");
        modal({
            title: n.format("dddd, D MMMM YYYY"),
            body: t.length ? t.map(function(t) {
                var a = t.pelaksana,
                    e = (t.no_spd, t.tempat),
                    t = [],
                    a = (t = a.split(",").map(function(t) {
                        return getOrang(t)
                    })).shift();
                return '\n\t\t\t\t<div class="d-flex">\n\t\t\t\t\t<div class="avatar-group justify-content-end avatar-group-custom" style="min-width:84px">\n\t\t\t\t\t\t'.concat(getAva(a), "\n\t\t\t\t\t\t").concat(1 === t.length ? getAva(t[0]) : 1 < t.length ? '<div class="avatar" title="'.concat(t.map(function(t) {
                    return t.nama
                }).join(",<br>"), '" data-toggle="tooltip" data-trigger="hover" data-placement="right" data-html="true"><span class="avatar-title rounded-circle border border-white bg-gray fz-15">+').concat(t.length, "</span></div>") : "", '\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="w-100 ml-3 pt-1 text-truncate"><div class="fz-11 text-truncate">').concat(a.nama + (t.length ? ", dkk" : ""), '</div><div class="text-gray text-truncate"><i class="fas fa-map-marker-alt mr-2"></i>').concat(e, "</div></div>\n\t\t\t\t</div>\n\t\t\t")
            }).join('<div class="pb-2"></div>') : '<div class="text-center py-3"><i class="fas fa-ban fa-5x text-lightgray"></i><div class="mt-3 text-gray">Tidak ada tugas</div></div>',
            primaryBtn: "d-none",
            secondaryBtn: "d-none",
            misc: '\n\t\t\t<button type="button" class="btn btn-primary mr-2" onclick="modalRekap(moment(\''.concat(a.format(f0), "'))\" ").concat(moment(a).isBefore(tglGantt[0], "day") ? "disabled" : "", '><i class="fas fa-chevron-left"></i></button>\n\t\t\t<button type="button" class="btn btn-primary mr-2" onclick="modalRekap(moment(\'').concat(e.format(f0), "'))\" ").concat(moment(e).isAfter(tglGantt[1], "day") ? "disabled" : "", '><i class="fas fa-chevron-right"></i></button>\n\t\t'),
            data: {
                "shown.bs.modal": function() {
                    $('[data-toggle="tooltip"]').tooltip()
                }
            }
        })
    },
    getAva = function(t) {
        var a = t.urlfoto,
            e = t.nama,
            t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        return a ? '<div class="avatar" title="'.concat(e, '" ').concat(t ? 'data-toggle="tooltip" data-trigger="hover" data-placement="right"' : "", '><img src="https://community.bps.go.id/images/avatar/').concat(a, '" class="avatar-img rounded-circle opos-top border border-white"></div>') : '<div class="avatar"><span class="avatar-title rounded-circle border border-white bg-secondary">'.concat((e || " ").charAt(0), "</span></div>")
    },
    modalViewSurat = function t(a) {
        var e = a.id,
            n = a.no,
            i = void 0 === n ? "" : n,
            s = a.no_spd,
            o = void 0 === s ? "" : s,
            l = a.pws,
            r = a.tgl,
            d = a.ttd,
            c = a.pelaksana,
            m = a.tujuan,
            u = void 0 === m ? "" : m,
            p = a.tempat,
            g = void 0 === p ? "" : p,
            f = a.angkutan,
            v = void 0 === f ? "" : f,
            n = a.tgl_mulai,
            s = a.tgl_akhir,
            m = a.jenis,
            p = a.dibuat_oleh,
            f = a.terakhir_update;
        if (e && !i) return t(surat.find(function(t) {
            return t.id == e
        })), !1;
        a = [], c = (a = c.split(",")).shift();
        modal({
            title: "Surat Tugas",
            body: '\n\t\t\t<div class="form-view">\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Nomor</div>\n\t\t\t\t\t<div class="col-9">'.concat(getNomorSurat(i, r, 1 == l ? "pws" : null), '</div>\n\t\t\t\t\t<div class="col-9 offset-3">').concat(null != o && "-" != o ? '<div class="d-inline-block mr-3">'.concat(getNomorSurat(o, r, "spd"), "</div>").concat(allowEditSurat(m, p) ? '<a href="javascript:void(0)" class="open-modal-kwitansi-btn d-inline-block text-success"><i class="fas fa-file-alt" style="margin-right:6px"></i>Kwitansi</a>' : "") : "", '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Tanggal</div>\n\t\t\t\t\t<div class="col-9">').concat(moment(r).format("D MMMM YYYY (dddd)"), '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">TTD').concat(d !== setting.kepala && d.endsWith("#") ? '<span class="fw-400 ml-1 text-gray">(Plh.)</span>' : "", '</div>\n\t\t\t\t\t<div class="col-9">').concat(getOrang(d).nama, '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Pelaksana</div>\n\t\t\t\t\t<div class="col-9">').concat(getOrang(c).nama, '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Anggota</div>\n\t\t\t\t\t<div class="col-9">').concat(a.length ? a.map(function(t) {
                return getOrang(t).nama
            }).join("<br>") : "-", '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Tujuan</div>\n\t\t\t\t\t<div class="col-9">').concat(u, '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Tempat</div>\n\t\t\t\t\t<div class="col-9">').concat(g, '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3" ').concat(o ? "" : 'style="display:none"', '>\n\t\t\t\t\t<div class="col-3">Angkutan</div>\n\t\t\t\t\t<div class="col-9">').concat(ANGKUTAN[v], '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Waktu</div>\n\t\t\t\t\t<div class="col-9">').concat(getWaktu(n, s), '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3">Jenis</div>\n\t\t\t\t\t<div class="col-9">Kegiatan ').concat(JENIS[m], '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-3">Dibuat Oleh</div>\n\t\t\t\t\t<div class="col-9">').concat(getOrang(p).nama, "</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"),
            primaryBtn: "d-none",
            secondaryBtn: "d-none",
            misc: "\n\t\t\t".concat(allowEditSurat(m, p) ? '<button type="button" class="btn btn-danger hapus-surat-tugas-btn mr-2" '.concat(4 < LV && moment(n).isBefore(PREVWEEK, "day") ? "disabled" : "", '><i class="fas fa-trash-alt d-sm-none fz-16"></i><span class="d-none d-sm-inline">Hapus</span></button>') : "", "\n\t\t\t").concat(allowEditSurat(m, p) ? '<button type="button" class="btn btn-primary edit-surat-tugas-btn mr-2" '.concat(4 < LV && moment(n).isBefore(PREVWEEK, "day") ? "disabled" : "", '><i class="fas fa-pen d-sm-none fz-16"></i><span class="d-none d-sm-inline">Edit</span></button>') : "", '\n\t\t\t<button type="button" class="btn btn-secondary download-surat-word-btn"><i class="fas fa-download fz-16 mr-sm-2"></i><span class="d-none d-sm-inline">Download</span></button>\n\t\t'),
            data: {
                id: e,
                no: i,
                no_spd: o,
                pws: l,
                tgl: r,
                ttd: d,
                pelaksana: c,
                anggota: a,
                tujuan: u,
                tempat: g,
                angkutan: v,
                tgl_mulai: n,
                tgl_akhir: s,
                jenis: m,
                dibuat_oleh: p,
                terakhir_update: f
            }
        })
    },
    modalEditSurat = function(t) {
        var a, e, n = t.id,
            i = t.no,
            s = void 0 === i ? "" : i,
            o = t.no_spd,
            l = void 0 === o ? "" : o,
            r = t.pws,
            d = t.tgl,
            c = t.ttd,
            m = t.pelaksana,
            u = t.anggota,
            p = void 0 === u ? [] : u,
            g = t.tujuan,
            i = void 0 === g ? "" : g,
            o = t.tempat,
            u = void 0 === o ? "" : o,
            g = t.angkutan,
            o = void 0 === g ? "" : g,
            f = t.tgl_mulai,
            v = t.tgl_akhir,
            g = t.jenis,
            h = (t.dibuat_oleh, t.terakhir_update),
            t = "",
            n = h ? (t = '<input type="hidden" name="id" value="'.concat(n, '">'), d = moment(d).format(f1), f = moment(f).format(f1), v = moment(v).format(f1), a = "Edit Surat Tugas", e = "submit-surat-tugas-btn btn-secondary", "Simpan Perubahan") : (v = f = d || TODAY, d = moment(d, f1).isBefore(moment(), "day") ? d : TODAY, a = "Buat Surat Tugas", e = "submit-surat-tugas-btn", "Simpan");
        return setting.sistem && (r = 0), modal({
            title: a,
            primaryBtn: e,
            primaryBtnLabel: n,
            body: '\n\t\t\t<div class="form-edit">\n\t\t\t\t'.concat((2 === setting.sistem ? '<div class="row mb-1-2">\n\t\t\t\t\t\t'.concat(t, '\n\t\t\t\t\t\t<div class="col-2 mt-1">Nomor</div>\n\t\t\t\t\t\t<div class="col-5 pr-0">\n\t\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t\t<input data-req="1" type="text" class="form-control" name="no" value="').concat(s, '" maxlength="30" placeholder="No. ST">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-5"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t\t<div class="col-5 pr-0 offset-2">\n\t\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t\t<input type="text" class="form-control" name="no_spd" value="').concat(l || "", '" maxlength="30" placeholder="No. SPD" ').concat(l ? "" : "disabled", '>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-5">\n\t\t\t\t\t\t\t<div class="custom-control custom-switch mt-1">\n\t\t\t\t\t\t\t\t<input type="checkbox" class="custom-control-input toggle-no-spd" id="custom-switch-spd" ') : '<div class="row mb-1-2">\n\t\t\t\t\t\t'.concat(t, '\n\t\t\t\t\t\t<div class="col-2 mt-1">Nomor</div>\n\t\t\t\t\t\t<div class="col-4">\n\t\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t\t<input data-req="1" type="text" class="form-control" name="no" value="').concat(s, '" maxlength="5" placeholder="No. ST">\n\t\t\t\t\t\t\t\t<div class="input-group-append">\n\t\t\t\t\t\t\t\t\t<button class="btn btn-light border-gray get-no-st-btn" type="button" title="Buat nomor otomatis" ').concat(c ? "disabled" : "", '><i class="fas fa-sync"></i></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-6 pl-2">\n\t\t\t\t\t\t\t<div class="custom-control custom-switch mt-1 without-st-pws-hidden">\n\t\t\t\t\t\t\t\t<input type="checkbox" class="custom-control-input toggle-pws" id="custom-switch-pws" name="pws" ').concat(1 == r ? "checked" : "", '>\n\t\t\t\t\t\t\t\t<label class="custom-control-label d-block cur-p" for="custom-switch-pws">Pengawasan</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t\t<div class="col-4 offset-2">\n\t\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t\t<input type="text" class="form-control" name="no_spd" value="').concat(l || "", '" maxlength="5" placeholder="No. SPD" ').concat(l ? "" : "disabled", '>\n\t\t\t\t\t\t\t\t<div class="input-group-append">\n\t\t\t\t\t\t\t\t\t<button class="btn btn-light border-gray get-no-spd-btn" type="button" title="Buat nomor otomatis" ').concat(l && !c ? "" : "disabled", '><i class="fas fa-sync"></i></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-6 pl-2">\n\t\t\t\t\t\t\t<div class="custom-control custom-switch mt-1">\n\t\t\t\t\t\t\t\t<input type="checkbox" class="custom-control-input toggle-no-spd" id="custom-switch-spd" ')).concat(l ? "checked" : "", '>\n\t\t\t\t\t\t\t\t<label class="custom-control-label d-block cur-p" for="custom-switch-spd">Perjalanan Dinas</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>'), '\n\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t<div class="col-2 mt-1">Tanggal</div>\n\t\t\t\t\t<div class="col-10"><input data-req="1" type="text" class="form-control form-control-sm" name="tgl" value="').concat(d, '"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t<div class="col-2 mt-1">TTD</div>\n\t\t\t\t\t<div class="col-10">\n\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t<div class="col">').concat(selectpickerPegawai({
                name: "ttd",
                selected: c ? c.replace(/[*#]/g, "") : 0
            }), '</div>\n\t\t\t\t\t\t\t<div class="col-auto pl-0 position-relative" id="ttd-setting-container" style="display:none">\n\t\t\t\t\t\t\t\t<div class="position-absolute text-center" style="pointer-events: none; left: 8px; top: 7px; width: 22px; height: 22px; z-index: 2"><i class="fas fa-cog fz-16"></i></div>\n\t\t\t\t\t\t\t\t<select id="ttd-setting" class="selectpicker" data-selected-text-format="static" title="" data-width="fit" data-style="btn-light btn-sm transparent-caret" data-dropdown-align-right="true">\n\t\t\t\t\t\t\t\t\t<option value="1" data-subtext="(Atas Nama)">A.n</option>\n\t\t\t\t\t\t\t\t\t<option value="2"').concat((c || "").endsWith("#") ? " selected" : "", ' data-subtext="(Pelaksana Harian)">Plh.</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t<div class="col-2 mt-1">Pelaksana</div>\n\t\t\t\t\t<div class="col-10">').concat(selectpickerPegawaiDanMitra({
                selected: m
            }), '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t<div class="col-2 mt-1">Anggota</div>\n\t\t\t\t\t<div class="col-10">').concat(selectpickerPegawaiDanMitra({
                name: "anggota[]",
                selected: p,
                title: "Pilih anggota..."
            }), '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t<div class="col-2 mt-1">Tujuan</div>\n\t\t\t\t\t<div class="col-10"><input data-req="1" type="text" class="form-control form-control-sm placeholder-italic" name="tujuan" value="').concat(i, '" maxlength="120" placeholder="Contoh: Pencacahan Susenas Maret 2021"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t<div class="col-2 mt-1">Tempat</div>\n\t\t\t\t\t<div class="col-10"><input data-req="1" type="text" class="form-control form-control-sm" name="tempat" value="').concat(u, '" maxlength="120"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-1-2 form-angkutan" ').concat(l ? "" : 'style="display:none"', '>\n\t\t\t\t\t<div class="col-2 mt-1">Angkutan</div>\n\t\t\t\t\t<div class="col-10">\n\t\t\t\t\t\t<select name="angkutan" class="selectpicker" data-width="100%" title="Pilih jenis angkutan yang digunakan..." data-style="btn-light btn-sm">\n\t\t\t\t\t\t\t<option value="1" ').concat(1 == o ? "selected" : "", ' selected>Kendaraan Dinas</option>\n\t\t\t\t\t\t\t<option value="2" ').concat(2 == o ? "selected" : "", '>Kendaraan Pribadi</option>\n\t\t\t\t\t\t\t<option value="3" ').concat(3 == o ? "selected" : "", '>Angkutan Umum</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-1-2">\n\t\t\t\t\t<div class="col-2 mt-1">Waktu</div>\n\t\t\t\t\t<div class="col-10"><div class="input-daterange input-group input-group-sm" id="datepicker"><input data-req="1" type="text" class="input-sm form-control" name="tgl_mulai" value="').concat(f, '"><div class="input-group-prepend"><span class="input-group-text">sampai</span></div><input data-req="1" type="text" class="input-sm form-control" name="tgl_akhir" value="').concat(v, '"></div></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-2 mt-1">Jenis</div>\n\t\t\t\t\t<div class="col-10">').concat(selectpickerJenisKegiatan(g), "</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"),
            data: {
                "shown.bs.modal": function() {
                    $("#modal .toggle-pws").change(function() {
                        $('#modal [name="no"]').val("")
                    }), $("#modal .toggle-no-spd").change(function() {
                        var t = !$(this).is(":checked");
                        $('#modal [name="no_spd"], #modal .get-no-spd-btn').prop("disabled", t), $("#modal .form-angkutan").slideToggle(t), t && $('#modal [name="no_spd"]').val("")
                    }), $('#modal [name="tgl"]').datepicker(4 < LV ? {
                        startDate: PREVWEEK.format(f1),
                        endDate: moment(tglGantt[1]).format(f1)
                    } : {
                        endDate: moment(tglGantt[1]).format(f1)
                    }), $("#modal .input-daterange").datepicker(4 < LV ? {
                        startDate: PREVWEEK.format(f1)
                    } : {
                        endDate: moment().add(2, "months").format(f1)
                    }), $('#modal [name="tujuan"]').autocomplete({
                        source: autoc.tjn
                    }), $('#modal [name="tempat"]').autocomplete({
                        source: autoc.tmp
                    }), $('#modal [name="ttd"]').change(function() {
                        $("#ttd-setting-container").toggle($(this).val() !== setting.kepala)
                    }).change()
                },
                "show.bs.modal": function() {
                    h && 4 < LV && (moment(v, f1).isAfter(moment(NEXTMONTH, f1), "day") && $('#modal [name="tgl_akhir"]').datepicker("update", ""), moment(f, f1).isAfter(moment(NEXTMONTH, f1), "day") && $('#modal [name="tgl_mulai"]').datepicker("update", ""))
                }
            }
        }), $modal
    },
    modalEditSuratProcessData = function() {
        var i = 1,
            s = {};
        return $modal.find("[name]").each(function(t, a) {
            var e = $(a),
                n = e.attr("name"),
                a = e.val();
            "pws" === n ? s.pws = e.is(":checked") ? 1 : 0 : "" == (s[n] = a) && e.data("req") || "no_spd" === n && "" === a && !e.attr("disabled") || "pelaksana" === n && !a || "tgl_akhir" === n && "" === s.tgl_mulai ? (e.closest('[class^="col-"]').addClass("has-error"), i = 0) : e.closest('[class^="col-"]').removeClass("has-error")
        }), moment(s.tgl_mulai, f1).isBefore(moment(s.tgl, f1), "day") && ($('#modal [name="tgl"]').closest('[class^="col-"]').addClass("has-error"), i = 0), !!i && ($("#custom-switch-spd").is(":checked") || (s.angkutan = null), s.tgl = moment(s.tgl, f1).format(f0), s.tgl_mulai = moment(s.tgl_mulai, f1).format(f0), s.tgl_akhir = moment(s.tgl_akhir, f1).format(f0), s.ttd !== setting.kepala && "2" === $("#ttd-setting").val() && (s.ttd += "#"), s)
    },
    modalDeleteSurat = function(t) {
        var a = t.id,
            e = t.no,
            n = t.no_spd,
            i = t.pws,
            t = t.tgl;
        modal({
            data: {
                id: a
            },
            title: "Hapus Surat Tugas",
            body: 'Apakah Anda yakin akan menghapus <span class="text-primary fw-600">'.concat(getNomorSurat(e, t, 1 == i ? "pws" : null) + (null != n && "-" != n ? '</span> & <span class="text-primary fw-600">' + getNomorSurat(n, t, "spd") : ""), "</span>?"),
            primaryBtn: "btn-danger hapus-surat-tugas-ok-btn",
            primaryBtnLabel: "Ya",
            modalDialog: "modal-sm"
        })
    },
    submitSurat = function(i) {
        $.ajax({
            type: "POST",
            data: i,
            url: "api/save-surat",
            success: function(a) {
                var t, e, n;
                console.info("Response from api/save-surat", a), a.success ? (delete a.success, i.id ? (surat[surat.findIndex(function(t) {
                    return t.id === a.id
                })] = a, notif("Surat tugas berhasil diperbarui", "success", 1)) : (surat.push(a), notif("Surat tugas berhasil dibuat", "success", 1)), announce("surat tugas"), refresh()) : a.fail && Array.isArray(a.data) ? (n = (e = a.data[0]).tujuan, t = e.tgl_mulai, e = e.tgl_akhir, notif('<span class="fw-600">'.concat(getOrang(a.conflict).nama, "</span> tidak dapat diberi tugas karena ada ").concat(n, ' pada <span class="fw-600">').concat(getWaktu(t, e), "</span>"), "danger", 1)) : a.fail && a.exist ? (t = (n = a.exist).no, e = n.pws, n = n.tgl, notif('Nomor surat <span class="fw-600">'.concat(getNomorSurat(t, n, 1 == e ? "pws" : null), "</span> sudah terpakai"), "danger", 1)) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), notif("Memproses surat tugas...", "wait")
    },
    deleteSurat = function(t) {
        $.ajax({
            type: "POST",
            data: {
                id: t.id
            },
            url: "api/delete-surat",
            success: function(a) {
                console.info("Response from api/delete-surat", a), a.success ? (surat.splice(surat.findIndex(function(t) {
                    return t.id === a.id
                }), 1), notif("Surat tugas berhasil dihapus", "success", 1), announce("surat tugas"), refresh()) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), notif("Menghapus surat tugas...", "wait")
    },
    downloadSelectedSurat = function() {
        var a = surat.filter(function(t) {
                return moment(t.tgl_mulai).isSameOrAfter(tglGantt[0], "day")
            }).reverse(),
            t = {
                glob: glob,
                data: suratTable.rows({
                    selected: !0
                })[0].map(function(t) {
                    return prepareDataToPost(a[t])
                })
            };
        console.info(t), postAndDownload(setting.server || "api/generate-surat", t)
    },
    exportSurat = function() {
        notif("Mengekspor ke Excel...", "wait", !1, {
            delay: 500
        });
        var t = XLSX.utils.book_new(),
            a = XLSX.utils.aoa_to_sheet([
                ["Tanggal Surat", "TTD", "No. ST", "No. SPD", "Pelaksana", "Anggota", "Pelaksana - NIP", "Pelaksana - Jabatan", "Pelaksana - Golongan & Pangkat", "Tujuan", "Tempat", "Angkutan", "Waktu", "Waktu Mulai", "Waktu Berakhir", "Subject Matter", "Dibuat/Diupdate Oleh"]
            ].concat(_toConsumableArray(surat.reverse().map(function(t) {
                var a = t.no,
                    e = void 0 === a ? "" : a,
                    n = t.no_spd,
                    i = void 0 === n ? "" : n,
                    s = t.pws,
                    o = t.tgl,
                    l = t.ttd,
                    r = t.pelaksana,
                    d = t.tujuan,
                    c = void 0 === d ? "" : d,
                    m = t.tempat,
                    u = void 0 === m ? "" : m,
                    p = t.angkutan,
                    g = void 0 === p ? "" : p,
                    f = t.tgl_mulai,
                    v = t.tgl_akhir,
                    a = t.jenis,
                    n = t.dibuat_oleh,
                    d = (t.terakhir_update, getOrang(r.split(",")[0])),
                    m = d.nip,
                    p = d.jabatan,
                    t = d.golongan,
                    t = void 0 === t ? "-" : t,
                    d = d.pangkat,
                    d = void 0 === d ? "-" : d;
                return [moment(o).format(f2), getOrang(l).nama, getNomorSurat(e, o, 1 == s ? "pws" : null), null == i || "-" === i ? "-" : getNomorSurat(i, o, "spd"), pelaksanaToString(r, 0), function(t) {
                    t = _toArray(t.split(",")), t[0], t = t.slice(1);
                    return t.length ? t.map(function(t) {
                        return "- " + getOrang(t).nama
                    }).join(" \n") : ""
                }(r), m, p, t + "  /  " + d, c, u, ANGKUTAN[g], getWaktu(f, v), getWaktu(f), getWaktu(v), JENIS[a], getOrang(n).nama]
            }))));
        XLSX.utils.book_append_sheet(t, a, "BagiTugas " + SATKER), XLSX.writeFile(t, "BagiTugas " + moment().format("YYYYMMDD-HHmm") + ".xlsx")
    },
    $daftarTugas = {
        st: $("#daftar-st"),
        pws: $("#daftar-pws"),
        spd: $("#daftar-spd")
    },
    $downloadBtn = $("#download-btn"),
    updateDaftarTugas = function() {
        generateDaftarTugas(getSurat(), "st"), generateDaftarTugas(getSurat("pws"), "pws"), generateDaftarTugas(getSurat("spd"), "spd")
    },
    generateDaftarTugas = function(e, n) {
        var i = "spd" === n ? "no_spd" : "no",
            s = '<div class="activity-feed activity-feed-custom">';
        e.forEach(function(t, a) {
            s += generateTimeline({
                id: t.id,
                no: getNomorSurat(t[i], t.tgl, n),
                tgl: (!a || e[a - 1].tgl !== t.tgl) && moment(t.tgl, f0).format("D MMM"),
                pelaksana: t.pelaksana,
                jenis: t.jenis
            }, a)
        }), s += "</div></div></div>", $daftarTugas[n].html(s)
    },
    generateTimeline = function(t, a) {
        var e = t.id,
            n = t.no,
            i = t.tgl,
            s = t.pelaksana,
            t = t.jenis,
            n = ("-" === n ? '<a href="javascript:void(0)" onclick="modalViewSurat({id:'.concat(e, '})"><div><i class="fas fa-file-alt mr-2 ').concat(ganttColor(t), '"></i></div><div><div class="no d-none">').concat(n, '</div><div style="padding-top:2px">') : '<a href="javascript:void(0)" onclick="modalViewSurat({id:'.concat(e, '})"><div><i class="fas fa-file-alt mr-2 ').concat(ganttColor(t), '"></i></div><div><div class="no">').concat(n, "</div><div>")).concat(pelaksanaToString(s), "</div></div></a>");
        return (i ? "".concat(a ? '</div></div><div class="w-100"></div>' : "", "<div>").concat(i, '</div><div class="feed-item"><div><div>') : "<div>").concat(n, "</div>")
    };
$(function() {
    $(".set-tgl-btn").click(function() {
        modalEditTanggal()
    }), $modal.on("click", ".get-no-st-btn", function() {
        var t = $('#modal [name="pws"]').is(":checked"),
            a = $('#modal [name="tgl"]').val();
        $('#modal [name="no"]').val(generateNomorSurat(t ? "pws" : "st", a ? moment(a, f1).format(f0) : null))
    }).on("click", ".get-no-spd-btn", function() {
        var t = $('#modal [name="tgl"]').val();
        $('#modal [name="no_spd"]').val(generateNomorSurat("spd", t ? moment(t, f1).format(f0) : null))
    }).on("click", ".submit-tgl-btn", function() {
        var t = modalEditTanggalProcessData();
        t && ($modalBtn[0].prop("disabled", !0).blur(), $modal.modal("hide"), submitTanggal(t))
    }).on("click", ".edit-surat-tugas-btn", function() {
        modalEditSurat($modal.data()).trigger("show").trigger("shown")
    }).on("click", ".submit-surat-tugas-btn", function() {
        var t = modalEditSuratProcessData();
        t && ($modalBtn[0].prop("disabled", !0).blur(), $modal.modal("hide"), submitSurat(t))
    }).on("click", ".hapus-surat-tugas-btn", function() {
        modalDeleteSurat($modal.data())
    }).on("click", ".hapus-surat-tugas-ok-btn", function() {
        var t = $modal.data();
        $modalBtn[0].prop("disabled", !0).blur(), $modal.modal("hide"), deleteSurat(t)
    }).on("click", ".download-surat-word-btn", function() {
        var t = {
            glob: glob,
            data: [prepareDataToPost($modal.data())]
        };
        console.info(t), $modal.modal("hide"), postAndDownload(setting.server || "api/generate-surat", t)
    }), $(".buat-st-btn").click(function() {
        modalEditSurat({
            pelaksana: "",
            no: generateNomorSurat("st")
        })
    }), $(".buat-pws-btn").click(function() {
        modalEditSurat({
            pws: "1",
            pelaksana: "",
            no: generateNomorSurat("pws")
        })
    }), suratTable = $("#table-surat").DataTable({
        data: [],
        rowId: "id",
        order: [],
        pageLength: 50,
        select: !0,
        language: {
            select: {
                rows: {
                    _: '<a href="javascript:void(0)" onclick="downloadSelectedSurat()">download %d surat yang terpilih</a>',
                    0: ""
                }
            }
        },
        columns: [{
            title: "Tanggal",
            data: "tgl",
            render: function(t) {
                return moment(t).format(f2)
            }
        }, {
            title: "PWS",
            data: "pws",
            searchable: !1,
            render: function(t) {
                return 1 == t ? '<div class="d-none">1</div><i class="fas fa-check"></i>' : '<div class="d-none">2</div><span class="text-muted">-</span>'
            }
        }, {
            title: "No. ST",
            data: null,
            render: function(t) {
                var a = t.no,
                    e = t.tgl,
                    t = t.pws;
                return getNomorSurat(a, e, 1 == t ? "pws" : null)
            }
        }, {
            title: "No. SPD",
            data: null,
            render: function(t) {
                var a = t.no_spd,
                    t = t.tgl;
                return null != a && "-" != a ? getNomorSurat(a, t, "spd") : '<span class="text-muted">-</span>'
            }
        }, {
            title: "Subject Matter",
            data: "jenis",
            render: function(t) {
                return JENIS[t]
            }
        }, {
            title: "Pelaksana",
            data: "pelaksana",
            render: function(t) {
                return pelaksanaToString(t)
            }
        }, {
            title: "Tujuan",
            data: "tujuan"
        }, {
            title: "",
            data: null,
            searchable: !1,
            sortable: !1,
            render: function(t) {
                t = t.id;
                return '<i class="fas fa-info-circle fa-fw py-1 cur-p fz-16 text-primary" title="Edit" onclick="modalViewSurat({id:'.concat(t, '})"></i>')
            }
        }]
    }), $("#table-surat").on("draw.dt", function() {
        $("#table-surat th:nth-child(2), #table-surat td:nth-child(2)").addClass("without-st-pws-hidden")
    }), suratTable.on("select deselect", function() {
        var t = suratTable.rows({
            selected: !0
        })[0].length;
        t ? $downloadBtn.html("Download ".concat(t, " surat yang terpilih")).parent().show() : $downloadBtn.parent().hide()
    })
});
var pegawaiTable, mitraTable, generateCalendar = function() {
        $(function() {
            suratCalendar = new Calendar("#calendar", {
                style: "background",
                roundRangeLimits: !0,
                minDate: moment().startOf("year").toDate(),
                maxDate: moment().endOf("year").toDate(),
                dataSource: surat.filter(function(t) {
                    return t.pelaksana.includes(NIP)
                }).map(function(t) {
                    var a = t.id,
                        e = t.no,
                        n = t.no_spd,
                        i = t.pws,
                        s = t.tgl,
                        o = t.tujuan,
                        l = t.tempat,
                        r = t.tgl_mulai,
                        d = t.tgl_akhir,
                        t = t.jenis;
                    return {
                        startDate: moment(r).toDate(),
                        endDate: moment(d).toDate(),
                        id: a,
                        no: e,
                        no_spd: n,
                        pws: i,
                        tgl: s,
                        tujuan: o,
                        tempat: l,
                        tgl_mulai: r,
                        tgl_akhir: d,
                        jenis: t,
                        color: COLOR[t]
                    }
                }),
                mouseOnDay: function(t) {
                    var a, e, n, i, s, o, l, r = t.element,
                        d = t.events;
                    d.length && ((a = d[0]).id, e = a.no, n = a.no_spd, i = a.pws, s = a.tgl, o = a.tujuan, l = a.tempat, t = a.tgl_mulai, d = a.tgl_akhir, a.jenis, $(r).popover({
                        trigger: "manual",
                        container: "body",
                        placement: "bottom",
                        html: !0,
                        title: getNomorSurat(e, s, 1 == i ? "pws" : null) + (null != n && "-" != n ? '<div class="d-inline-block mx-1">·</div>' + getNomorSurat(n, s, "spd") : ""),
                        content: popoverBar({
                            tujuan: o,
                            tempat: l,
                            tgl_mulai: t,
                            tgl_akhir: d
                        })
                    }), $(r).popover("show"))
                },
                mouseOutDay: function(t) {
                    var a = t.element;
                    t.events.length && $(a).popover("hide")
                },
                clickDay: function(t) {
                    t = t.events;
                    t.length && modalViewSurat({
                        id: t[0].id
                    })
                },
                customDayRenderer: function(t, a) {
                    0 !== a.getDay() && 6 !== a.getDay() || t.classList.add("text-danger"), libur.includes(moment(a).format(f0)) && t.classList.add("holiday"), moment().isSame(a, "day") && t.classList.add("today")
                }
            })
        })
    },
    postAndDownload = function(t, a) {
        $('\n\t\t<form action="'.concat(t, '" method="POST" target="_blank" class="d-none">\n\t\t\t<input type="text" name="data" id="data">\n\t\t\t<input type="submit">\n\t\t</form>\n\t')).appendTo("body").find("#data").val(JSON.stringify(a)).next().click().closest("form").remove()
    },
    prepareDataToPost = function(t) {
        t.id;
        var a = t.no,
            e = t.no_spd,
            n = t.pws,
            i = t.tgl,
            s = t.ttd,
            o = t.pelaksana,
            l = t.anggota,
            r = t.tujuan,
            d = t.tempat,
            c = t.angkutan,
            m = t.tgl_mulai,
            u = t.tgl_akhir;
        t.jenis, t.dibuat_oleh, t.terakhir_update;
        l || (o = (l = o.split(",")).shift());
        var p = getOrang(o),
            g = p.nama,
            f = p.nip,
            t = p.jabatan,
            o = p.golongan,
            p = p.pangkat,
            s = getOrang(s).nip === glob.kpl.nip ? {
                nama: getOrang(s).nama,
                NAMA: getOrang(s).nama.toUpperCase(),
                nip: getOrang(s).nip,
                tgl: moment(i).format("D MMMM YYYY")
            } : s.endsWith("#") ? {
                nama: getOrang(s).nama,
                NAMA: getOrang(s).nama.toUpperCase(),
                nip: getOrang(s).nip,
                tgl: moment(i).format("D MMMM YYYY"),
                plh: 1
            } : {
                nama: getOrang(s).nama,
                NAMA: getOrang(s).nama.toUpperCase(),
                nip: getOrang(s).nip,
                tgl: moment(i).format("D MMMM YYYY"),
                an: 1,
                jabatan: getOrang(s).jabatan
            };
        return {
            no: getNomorSurat(a, i, 1 == n ? "pws" : null),
            nama: g,
            nip: f,
            jabatan: t,
            golongan: o,
            pangkat: p,
            anggota: l.map(function(t) {
                return getOrang(t).nama
            }),
            tujuan: r,
            tempat: d,
            angkutan: ANGKUTAN[c],
            tgl_mulai: moment(m).format(f2),
            tgl_akhir: moment(u).format(f2),
            waktu: getWaktu(m, u),
            ttd: s,
            spd: null == e || "-" == e ? void 0 : {
                no: getNomorSurat(e, i, "spd"),
                tingkat_biaya: "C",
                lama: moment(u).diff(moment(m), "days") + 1 + " hari"
            }
        }
    },
    pegawaiByNip = pegawai.reduce(function(t, a) {
        var e = a.nipbps,
            n = a.nip,
            a = _objectWithoutProperties(a, ["nipbps", "nip"]);
        return t[e] = _objectSpread({
            nip: nip(n).print()
        }, a), t
    }, {}),
    ME = pegawaiByNip[NIP] || {
        nama: NIP,
        username: NIP
    },
    modalViewPegawai = function(t) {
        console.info(pegawaiByNip[t]);
        var a = pegawaiByNip[t],
            e = a.nip,
            n = a.username,
            i = a.nama,
            s = a.urlfoto,
            o = (a.satker, a.pangkat, a.golongan, a.seksi, a.jabatan);
        a.level, a.login_terakhir;
        modal({
            title: i,
            body: '\n\t\t\t<div class="text-center">\n\t\t\t\t<div class="avatar avatar-xxl">\n\t\t\t\t\t<img src="https://community.bps.go.id/images/avatar/'.concat(s, '" alt="..." class="avatar-img rounded-circle opos-top">\n\t\t\t\t</div>\n\t\t\t\t<h3 class="mt-2 mb-0">').concat(i, '</h3>\n\t\t\t\t<div class="text-muted mb-2">').concat(o, '</div>\n\t\t\t\t<div class="text-primary"><i class="fas fa-envelope mr-2"></i>').concat(n ? n + "@bps.go.id" : "-", '</div>\n\t\t\t\t<div class="fz-13">NIP. ').concat(e, '<div class="d-inline-block mx-1">/</div>').concat(t, "</div>\n\t\t\t</div>\n\t\t"),
            primaryBtn: "d-none",
            secondaryBtnLabel: "Tutup",
            modalDialog: "modal-sm"
        })
    },
    modalEditPegawai = function(t) {
        var a = pegawaiByNip[t] || {},
            e = a.nip,
            n = a.urlfoto,
            i = a.seksi,
            s = a.urutan,
            o = a.nama,
            l = a.username,
            r = a.jabatan,
            d = a.golongan,
            c = a.pangkat,
            m = a.level,
            a = void 0 === m ? "6" : m,
            m = function(t, a) {
                var e = a.name,
                    n = a.value,
                    i = a.maxlength,
                    s = void 0 === i ? 64 : i,
                    i = a.inputmode,
                    a = a.placeholder;
                return '\n\t\t<div class="row mb-2-3">\n\t\t\t<div class="col-2 mt-1">'.concat(t, '</div>\n\t\t\t<div class="col-10">\n\t\t\t\t<input\n\t\t\t\t\tclass="form-control form-control-sm"\n\t\t\t\t\ttype="text"\n\t\t\t\t\tname="').concat(e, '"\n\t\t\t\t\tvalue="').concat(n || "", '"\n\t\t\t\t\tmaxlength="').concat(s, '"\n\t\t\t\t\t').concat(i ? 'inputmode="'.concat(i, '" ') : "", "\n\t\t\t\t\t").concat(a ? 'placeholder="'.concat(a, '" ') : "", "\n\t\t\t\t>\n\t\t\t</div>\n\t\t</div>")
            };
        modal({
            title: t ? "Edit Pegawai" : "Tambah Pegawai",
            body: '\n\t\t\t<div class="form-edit">\n\t\t\t\t'.concat(t ? '<input type="hidden" class="d-none" name="id" value="'.concat(t, '">') : "", "\n\t\t\t\t").concat(m("No. Urut", {
                name: "urutan",
                value: s,
                inputmode: "numeric",
                maxlength: 3
            }), "\n\t\t\t\t").concat(m("Nama", {
                name: "nama",
                value: o,
                maxlength: 48
            }), "\n\t\t\t\t").concat(m("NIP BPS", {
                name: "nipbps",
                value: t,
                inputmode: "numeric",
                maxlength: 9,
                placeholder: "(9 digit)"
            }), "\n\t\t\t\t").concat(m("NIP PNS", {
                name: "nip",
                value: (e || "").replace(/\s/g, ""),
                inputmode: "numeric",
                maxlength: 18,
                placeholder: "(18 digit)"
            }), "\n\t\t\t\t").concat(m("Username", {
                name: "username",
                value: l,
                maxlength: 24
            }), "\n\t\t\t\t").concat(m("Jabatan", {
                name: "jabatan",
                value: r
            }), "\n\t\t\t\t").concat(m("Golongan", {
                name: "golongan",
                value: d
            }), "\n\t\t\t\t").concat(m("Pangkat", {
                name: "pangkat",
                value: c
            }), "\n\t\t\t\t").concat(m("URL Foto", {
                name: "urlfoto",
                value: n
            }), '\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-2 mt-1">').concat("00" === SATKER.substr(2) ? "Bidang" : "Seksi", '</div>\n\t\t\t\t\t<div class="col-10">').concat(selectpickerSeksi(i), '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-2 mt-1">Peran</div>\n\t\t\t\t\t<div class="col-10">\n\t\t\t\t\t\t<select class="selectpicker" data-width="100%" data-style="btn-light btn-sm" name="level">\n\t\t\t\t\t\t\t<option value="4" ').concat("4" === a ? "selected" : "", '>Administrator</option>\n\t\t\t\t\t\t\t<option value="5" ').concat("5" === a ? "selected" : "", '>Editor</option>\n\t\t\t\t\t\t\t<option value="6" ').concat("6" === a ? "selected" : "", ">Viewer</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"),
            primaryBtn: "submit-pegawai-btn",
            primaryBtnLabel: t ? "Simpan Perubahan" : "Simpan",
            data: {
                "shown.bs.modal": function() {
                    $('#modal [name="urutan"]').focus()
                }
            }
        })
    },
    modalEditPegawaiProcessData = function() {
        $("#modal .has-error").removeClass("has-error");
        var t = 1,
            a = {
                id: $('#modal [name="id"]').val(),
                urutan: parseInt($('#modal [name="urutan"]').val()),
                nama: $('#modal [name="nama"]').val(),
                nipbps: $('#modal [name="nipbps"]').val(),
                nip: $('#modal [name="nip"]').val(),
                username: $('#modal [name="username"]').val(),
                jabatan: $('#modal [name="jabatan"]').val(),
                golongan: $('#modal [name="golongan"]').val(),
                pangkat: $('#modal [name="pangkat"]').val(),
                urlfoto: $('#modal [name="urlfoto"]').val(),
                seksi: $('#modal [name="seksi"]').val(),
                level: $('#modal [name="level"]').val()
            };
        if (a.urutan || ($('#modal [name="urutan"]').closest('[class^="col-"]').addClass("has-error"), t = 0), a.nama || ($('#modal [name="nama"]').closest('[class^="col-"]').addClass("has-error"), t = 0), /\d{9}/.test(a.nipbps) || ($('#modal [name="nipbps"]').closest('[class^="col-"]').addClass("has-error"), t = 0), /\d{18}/.test(a.nip) || ($('#modal [name="nip"]').closest('[class^="col-"]').addClass("has-error"), t = 0), a.username || ($('#modal [name="username"]').closest('[class^="col-"]').addClass("has-error"), t = 0), a.jabatan || ($('#modal [name="jabatan"]').closest('[class^="col-"]').addClass("has-error"), t = 0), a.golongan || ($('#modal [name="golongan"]').closest('[class^="col-"]').addClass("has-error"), t = 0), a.pangkat || ($('#modal [name="pangkat"]').closest('[class^="col-"]').addClass("has-error"), t = 0), a.seksi || ($('#modal [name="seksi"]').closest('[class^="col-"]').addClass("has-error"), t = 0), t) return a
    },
    modalDeletePegawai = function(t) {
        var a = pegawaiByNip[t] || {},
            e = a.nama,
            a = a.jabatan;
        console.info("Hapus", t), modal({
            data: {
                nipbps: t
            },
            title: "Hapus Pegawai",
            body: 'Apakah Anda yakin akan menghapus<br><span class="text-primary fw-600">'.concat(e, "</span> ").concat(a, "?"),
            primaryBtn: "btn-danger hapus-pegawai-ok-btn",
            primaryBtnLabel: "Ya",
            modalDialog: "modal-sm"
        })
    },
    modalRefreshPegawai = function() {
        modal({
            title: "Refresh Data Pegawai",
            body: "Sistem akan mengurutkan ulang dan memperbaiki data pegawai yang tidak sesuai atau belum lengkap",
            primaryBtn: "btn-success refresh-pegawai-ok-btn",
            primaryBtnLabel: "Ya",
            modalDialog: "modal-sm"
        })
    },
    submitPegawai = function(e) {
        console.log(e);
        var t = _slicedToArray(e.id ? ["api/update-pegawai", "Memproses data pegawai..."] : ["api/add-pegawai", "Menambahkan data pegawai..."], 2),
            n = t[0],
            t = t[1];
        $.ajax({
            type: "POST",
            data: e,
            url: n,
            success: function(a) {
                var t;
                console.info("Response from ".concat(n), a), a.success ? (delete a.success, e.id ? (t = pegawai.findIndex(function(t) {
                    return t.nipbps === a.nipbps
                }), pegawai[t] = a) : pegawai.push(a), refreshPegawai(), notif("Data pegawai berhasil diperbarui", "success", 1), announce("data pegawai"), setTimeout(function() {
                    location.reload()
                }, 600)) : !e.id && a.data ? notif("Pegawai dengan NIP ".concat(e.nipbps, ' telah dipakai oleh <span class="fw-600">BPS ').concat(a.data, "</span>"), "danger", 1) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), notif(t, "wait")
    },
    deletePegawai = function(t) {
        $.ajax({
            type: "POST",
            data: {
                nipbps: t.nipbps
            },
            url: "api/delete-pegawai",
            success: function(a) {
                console.info("Response from api/delete-pegawai", a), a.success ? (pegawai.splice(pegawai.findIndex(function(t) {
                    return t.id === a.id
                }), 1), refreshPegawai(), notif("Data pegawai berhasil dihapus", "success", 1), announce("data pegawai")) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), notif("Menghapus data pegawai...", "wait")
    },
    refreshDataPegawai = function() {
        $.ajax({
            type: "POST",
            data: {},
            url: "satker/refresh",
            success: function(t) {
                console.info("Response from satker/refresh", t), Array.isArray(t) ? (pegawai = t, refreshPegawai(), announce("data pegawai"), notif("Data pegawai berhasil diperbarui", "success", 1)) : notif("Terjadi kesalahan", "danger", 1), $("#refresh-data-pegawai-btn").hide()
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1), $("#refresh-data-pegawai-btn").hide()
            }
        }), notif("Melakukan sinkronisasi data pegawai...", "wait")
    },
    modalEditMitra = function t(a) {
        var e = a.id,
            n = void 0 === e ? "" : e,
            i = a.kec,
            s = void 0 === i ? "" : i,
            o = a.nama,
            l = void 0 === o ? "" : o,
            r = a.asal,
            e = void 0 === r ? "" : r,
            i = a.no_hp,
            o = void 0 === i ? "" : i,
            r = a.nik,
            i = void 0 === r ? "" : r,
            r = a.no_rek,
            r = void 0 === r ? "" : r,
            a = a.npwp,
            a = void 0 === a ? "" : a;
        if (n && !l) return t(mitra.find(function(t) {
            return t.id == n
        })), !1;
        modal({
            title: n ? "Edit Mitra" : "Tambah Mitra Baru",
            body: '\n\t\t\t<div class="form-edit">\n\t\t\t\t<input type="hidden" class="d-none" name="id" value="'.concat(n, '">\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3 mt-1 text-right-bold">Nama</div>\n\t\t\t\t\t<div class="col-9"><input type="text" class="form-control form-control-sm" name="nama" value="').concat(l, '"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3 mt-1 text-right-bold">Kecamatan</div>\n\t\t\t\t\t<div class="col-9"><input type="text" class="form-control form-control-sm" name="kec" value="').concat(s, '"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3 mt-1 text-right-bold">Asal</div>\n\t\t\t\t\t<div class="col-9"><input type="text" class="form-control form-control-sm" name="asal" value="').concat(e, '"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3 mt-1 text-right-bold">No. Hp</div>\n\t\t\t\t\t<div class="col-9"><input type="text" class="form-control form-control-sm" name="no_hp" value="').concat(o, '"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3 mt-1 text-right-bold">NIK</div>\n\t\t\t\t\t<div class="col-9"><input type="text" class="form-control form-control-sm" name="nik" value="').concat(i, '"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row mb-2-3">\n\t\t\t\t\t<div class="col-3 mt-1 text-right-bold">No. Rekening</div>\n\t\t\t\t\t<div class="col-9"><input type="text" class="form-control form-control-sm" name="no_rek" value="').concat(r || "", '"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-3 mt-1 text-right-bold">NPWP</div>\n\t\t\t\t\t<div class="col-9"><input type="text" class="form-control form-control-sm" name="npwp" value="').concat(a || "", '"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t'),
            primaryBtn: "submit-mitra-btn",
            primaryBtnLabel: n ? "Simpan Perubahan" : "Simpan",
            data: {
                "shown.bs.modal": function() {
                    $('#modal [name="kec"]').autocomplete({
                        source: autoc.kec
                    }), $('#modal [name="nama"]').focus()
                }
            }
        })
    },
    modalEditMitraProcessData = function() {
        $("#modal .has-error").removeClass("has-error");
        var t = 1,
            a = {
                id: $('#modal [name="id"]').val(),
                kec: $('#modal [name="kec"]').val(),
                nama: $('#modal [name="nama"]').val(),
                asal: $('#modal [name="asal"]').val(),
                no_hp: $('#modal [name="no_hp"]').val(),
                nik: $('#modal [name="nik"]').val(),
                no_rek: $('#modal [name="no_rek"]').val(),
                npwp: $('#modal [name="npwp"]').val()
            };
        if (a.kec || ($('#modal [name="kec"]').closest('[class^="col-"]').addClass("has-error"), t = 0), a.nama || ($('#modal [name="nama"]').closest('[class^="col-"]').addClass("has-error"), t = 0), t) return a
    },
    modalDeleteMitra = function(a) {
        var t = mitra.find(function(t) {
                return t.id == a
            }),
            e = t.nama,
            t = t.kec;
        console.info("Hapus", a), modal({
            data: {
                id: a
            },
            title: "Hapus Mitra",
            body: 'Apakah Anda yakin akan menghapus<br><span class="text-primary fw-600">'.concat(e, "</span> dari ").concat(t, "?"),
            primaryBtn: "btn-danger hapus-mitra-ok-btn",
            primaryBtnLabel: "Ya",
            modalDialog: "modal-sm"
        })
    },
    submitMitra = function(t) {
        $.ajax({
            type: "POST",
            data: t,
            url: "api/save-mitra",
            success: function(a) {
                console.info("Response from api/save-mitra", a), a.success ? (delete a.success, t.id ? (mitra[mitra.findIndex(function(t) {
                    return t.id === a.id
                })] = a, refreshPegawai(), notif("Data mitra berhasil diperbarui", "success", 1)) : (mitra.push(a), refreshPegawai(), notif("Data mitra baru berhasil dibuat", "success", 1)), announce("data pegawai"), refresh()) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), notif("Memproses data mitra...", "wait")
    },
    deleteMitra = function(t) {
        $.ajax({
            type: "POST",
            data: {
                id: t.id
            },
            url: "api/delete-mitra",
            success: function(a) {
                console.info("Response from api/delete-mitra", a), a.success ? (mitra.splice(mitra.findIndex(function(t) {
                    return t.id === a.id
                }), 1), refreshPegawai(), notif("Data mitra berhasil dihapus", "success", 1), announce("data pegawai")) : notif("Terjadi kesalahan", "danger", 1)
            },
            error: function(t) {
                console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Terjadi kesalahan", "danger", 1)
            }
        }), notif("Menghapus data mitra...", "wait")
    },
    exportMitra = function() {
        var t = XLSX.utils.book_new(),
            a = XLSX.utils.aoa_to_sheet([
                ["Nama", "Kecamatan", "Asal Desa/Kelurahan", "No. Hp", "NIK", "No. Rekening", "NPWP"]
            ].concat(_toConsumableArray(mitra.map(function(t) {
                return [t.nama, t.kec, t.asal, t.no_hp, t.nik, t.no_rek, t.npwp]
            }))));
        XLSX.utils.book_append_sheet(t, a, "Mitra " + SATKER), XLSX.writeFile(t, "BagiTugas - Mitra " + moment().format("YYYYMMDD-HHmm") + ".xlsx")
    };
$(function() {
    $gantt.on("click", ".desc[data-id]", function() {
        modalViewPegawai($(this).data("id"))
    }), $(".tambah-pegawai-btn").click(function() {
        modalEditPegawai()
    }), $(".tambah-mitra-btn").click(function() {
        modalEditMitra({})
    }), $modal.on("click", ".submit-pegawai-btn", function() {
        var t = modalEditPegawaiProcessData();
        t && ($modalBtn[0].prop("disabled", !0).blur(), $modal.modal("hide"), submitPegawai(t))
    }).on("click", ".hapus-pegawai-ok-btn", function() {
        var t = $modal.data();
        $modalBtn[0].prop("disabled", !0).blur(), $modal.modal("hide"), console.log("deleteMitra()"), deletePegawai(t)
    }).on("click", ".refresh-pegawai-ok-btn", function() {
        $("#refresh-data-pegawai-btn").prop("disabled", !0).html('<i class="fas fa-sync fa-spin fa-fw"></i>'), $modal.modal("hide"), refreshDataPegawai()
    }).on("click", ".submit-mitra-btn", function() {
        var t = modalEditMitraProcessData();
        t && ($modalBtn[0].prop("disabled", !0).blur(), $modal.modal("hide"), submitMitra(t))
    }).on("click", ".hapus-mitra-ok-btn", function() {
        var t = $modal.data();
        $modalBtn[0].prop("disabled", !0).blur(), $modal.modal("hide"), console.log("deleteMitra()"), deleteMitra(t)
    }), $("#refresh-data-pegawai-btn").click(function() {
        $(this).prop("disabled") || modalRefreshPegawai()
    }), pegawaiTable = $("#table-pegawai").DataTable(LV < 5 ? {
        data: pegawai,
        rowId: "nipbps",
        pageLength: 50,
        columns: [{
            title: "No",
            data: "urutan"
        }, {
            title: "Nama / NIP",
            data: null,
            render: function(t) {
                var a = t.nipbps,
                    e = t.nip,
                    t = t.nama;
                return '<div class="hover:underline cur-p text-primary" onclick="modalViewPegawai('.concat(a, ')">').concat(t, '</div><div class="text-muted fz-10">').concat(e, "</div>")
            }
        }, {
            title: "Email",
            data: "username",
            render: function(t) {
                return t + '<span class="text-muted">@bps.go.id</span>'
            }
        }, {
            title: "Jabatan",
            data: "jabatan"
        }, {
            title: "Pangkat / Golongan",
            data: null,
            render: function(t) {
                var a = t.pangkat,
                    t = t.golongan;
                return "<div>".concat(a, '</div><div class="text-muted fz-10">').concat(t, "</div>")
            }
        }, {
            title: "Peran",
            data: "level",
            render: function(t) {
                return ["", "Top Manager", "Developer", "Supervisor", "Administrator", "Editor", "Viewer"][t]
            }
        }, {
            title: "",
            data: null,
            searchable: !1,
            sortable: !1,
            render: function(t) {
                t = t.nipbps;
                return '<i class="fas fa-pen fa-fw py-1 cur-p fz-16 text-primary mr-2" title="Edit" onclick="modalEditPegawai('.concat(t, ')"></i><i class="fas fa-trash fa-fw py-1 cur-p fz-16 text-danger" title="Hapus" onclick="modalDeletePegawai(').concat(t, ')"></i>')
            }
        }]
    } : {
        data: pegawai,
        rowId: "nipbps",
        pageLength: 50,
        columns: [{
            title: "No",
            data: "urutan"
        }, {
            title: "Nama / NIP",
            data: null,
            render: function(t) {
                var a = t.nipbps,
                    e = t.nip,
                    t = t.nama;
                return '<div class="hover:underline cur-p text-primary" onclick="modalViewPegawai('.concat(a, ')">').concat(t, '</div><div class="text-muted fz-10">').concat(e, "</div>")
            }
        }, {
            title: "Email",
            data: "username",
            render: function(t) {
                return t + '<span class="text-muted">@bps.go.id</span>'
            }
        }, {
            title: "Jabatan",
            data: "jabatan"
        }, {
            title: "Pangkat / Golongan",
            data: null,
            render: function(t) {
                var a = t.pangkat,
                    t = t.golongan;
                return "<div>".concat(a, '</div><div class="text-muted fz-10">').concat(t, "</div>")
            }
        }, {
            title: "Peran",
            data: "level",
            render: function(t) {
                return ["", "Top Manager", "Developer", "Supervisor", "Administrator", "Editor", "Viewer"][t]
            }
        }]
    }), mitraTable = $("#table-mitra").DataTable(LV < 5 ? {
        data: mitra,
        rowId: "id",
        order: [],
        pageLength: 25,
        columns: [{
            title: "Nama",
            data: "nama"
        }, {
            title: "Asal",
            data: null,
            render: function(t) {
                var a = t.kec,
                    t = t.asal;
                return "".concat(a, '<div class="text-muted fz-11">').concat(t, "</div>")
            }
        }, {
            title: "No. Hp",
            data: "no_hp"
        }, {
            title: "NIK",
            data: "nik"
        }, {
            title: "No. Rekening",
            data: "no_rek"
        }, {
            title: "NPWP",
            data: "npwp"
        }, {
            title: "",
            data: null,
            searchable: !1,
            sortable: !1,
            render: function(t) {
                t = t.id;
                return '<i class="fas fa-pen fa-fw py-1 cur-p fz-16 text-primary mr-2" title="Edit" onclick="modalEditMitra({id:'.concat(t, '})"></i><i class="fas fa-trash fa-fw py-1 cur-p fz-16 text-danger" title="Hapus" onclick="modalDeleteMitra(').concat(t, ')"></i>')
            }
        }]
    } : {
        data: mitra,
        rowId: "id",
        order: [],
        columns: [{
            title: "Nama",
            data: "nama"
        }, {
            title: "Asal",
            data: null,
            render: function(t) {
                var a = t.kec,
                    t = t.asal;
                return "".concat(a, '<div class="text-muted fz-11">').concat(t, "</div>")
            }
        }, {
            title: "No. Hp",
            data: "no_hp"
        }, {
            title: "NIK",
            data: "nik"
        }, {
            title: "No. Rekening",
            data: "no_rek"
        }, {
            title: "NPWP",
            data: "npwp"
        }]
    })
}), $(function() {
    $modal.on("click", ".open-modal-kwitansi-btn", function() {
        var t = $modal.data(),
            a = t.id,
            e = t.no,
            n = t.tgl,
            i = t.pws,
            s = t.pelaksana,
            o = t.anggota,
            l = t.tempat,
            r = t.tgl_mulai,
            d = t.tgl_akhir,
            t = (pegawai.find(function(t) {
                return t.jabatan.includes("endahara")
            }) || {}).nipbps,
            r = moment(d).diff(moment(r), "days") + 1;
        modal({
            title: 'Kwitansi SPD <span class="text-primary">No.&nbsp;' + getNomorSurat(e, n, 1 == i ? "pws" : null) + "</span>",
            body: '\n\t\t\t<div class="form-edit">\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-4 mt-sm-1 fw-600 text-sm-right pr-0">Pelaksana</div>\n\t\t\t\t\t<div class="col-sm-8">'.concat(selectpickerPegawaiDanMitra({
                name: "pelaksana[]",
                selected: [s].concat(_toConsumableArray(o)),
                title: "Pilih pelaksana..."
            }), '</div>\n\t\t\t\t\t<div class="w-100 mb-1"></div>\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Tempat Asal</div>\n\t\t\t\t\t<div class="col-sm-8"><input type="text" class="form-control form-control-sm" name="tempat_asal" value="').concat(setting.alamat_ttd, '" maxlength="120"></div>\n\t\t\t\t\t<div class="w-100 mb-1"></div>\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Tempat Tujuan</div>\n\t\t\t\t\t<div class="col-sm-8"><input type="text" class="form-control form-control-sm" name="tempat_tujuan" value="').concat(l, '" readonly></div>\n\t\t\t\t\t<div class="w-100 mb-1"></div>\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Lamanya Perjalanan</div>\n\t\t\t\t\t<div class="col-sm-8">\n\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t<input type="text" class="form-control form-control-sm" name="hari" value="').concat(r, '" readonly>\n\t\t\t\t\t\t\t<div class="input-group-append"><span class="input-group-text bg-light"><div class="px-1">hari</div></span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="w-100"><hr></div>\n\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Uang Harian</div>\n\t\t\t\t\t<div class="col-7 col-sm-5 pr-2-3">\n\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">@</div></span></div>\n\t\t\t\t\t\t\t<input type="text" class="form-control form-control-sm text-right uang" name="uang_harian" value="150000" maxlength="12">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-5 col-sm-3 pl-0 mb-1">\n\t\t\t\t\t\t<div class="d-flex align-items-center">\n\t\t\t\t\t\t\t<i class="fas fa-times fz-12 mr-2-3"></i>\n\t\t\t\t\t\t\t<div><input class="form-control form-control-sm text-center" type="number" name="uang_harian_n" value="').concat(r, '" min="0" max="1000"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Biaya Transportasi</div>\n\t\t\t\t\t<div class="col-7 col-sm-5 pr-2-3">\n\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">@</div></span></div>\n\t\t\t\t\t\t\t<input type="text" class="form-control form-control-sm text-right uang" name="uang_transportasi" placeholder="0" maxlength="12">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-5 col-sm-3 pl-0 mb-1">\n\t\t\t\t\t\t<div class="d-flex align-items-center">\n\t\t\t\t\t\t\t<i class="fas fa-times fz-12 mr-2-3"></i>\n\t\t\t\t\t\t\t<div><input class="form-control form-control-sm text-center" type="number" name="uang_transportasi_n" value="2" min="0" max="1000"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Biaya Penginapan</div>\n\t\t\t\t\t<div class="col-7 col-sm-5 pr-2-3">\n\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">@</div></span></div>\n\t\t\t\t\t\t\t<input type="text" class="form-control form-control-sm text-right uang" name="uang_penginapan" placeholder="0" maxlength="12">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-5 col-sm-3 pl-0">\n\t\t\t\t\t\t<div class="d-flex align-items-center">\n\t\t\t\t\t\t\t<i class="fas fa-times fz-12 mr-2-3"></i>\n\t\t\t\t\t\t\t<div><input class="form-control form-control-sm text-center" type="number" name="uang_penginapan_n" value="').concat(r - 1, '" min="0" max="1000"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="col-12 mt-3 mb-1 text-center fz-12">Pengeluaran Riil<div class="text-gray">(yang tidak dapat diperoleh bukti-bukti pengeluarannya)</div></div>\n\t\t\t\t\t<div class="col-sm-7 pr-sm-0 mb-1 mb-sm-0"><input name="uraian_riil1" type="text" class="form-control form-control-sm" placeholder="Uraian pengeluaran riil #1"></div>\n\t\t\t\t\t<div class="col-sm-5 pr-2-3">\n\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">Rp</div></span></div>\n\t\t\t\t\t\t\t<input type="text" class="form-control form-control-sm text-right uang" name="uang_riil1" placeholder="0" maxlength="12">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-7 pr-sm-0 mb-1 mb-sm-0 mt-3 mt-sm-1"><input name="uraian_riil2" type="text" class="form-control form-control-sm" placeholder="Uraian pengeluaran riil #2"></div>\n\t\t\t\t\t<div class="col-sm-5 pr-2-3 mt-sm-1">\n\t\t\t\t\t\t<div class="input-group input-group-sm">\n\t\t\t\t\t\t\t<div class="input-group-prepend"><span class="input-group-text bg-light"><div class="px-1">Rp</div></span></div>\n\t\t\t\t\t\t\t<input type="text" class="form-control form-control-sm text-right uang" name="uang_riil2" placeholder="0" maxlength="12">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="w-100"><hr></div>\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Bendahara</div>\n\t\t\t\t\t<div class="col-sm-8">').concat(selectpickerPegawaiDanMitra({
                name: "bendahara",
                selected: t,
                title: "Pilih bendahara pengeluaran..."
            }), '</div>\n\t\t\t\t\t<div class="w-100 mb-1"></div>\n\t\t\t\t\t<div class="col-sm-4 mt-2 mt-sm-1 mb-1 fw-600 text-sm-right pr-0">Tanggal Dibayarkan</div>\n\t\t\t\t\t<div class="col-sm-8"><input type="text" class="form-control form-control-sm" name="tgl_bayar" value="').concat(moment().format(f1), '"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t'),
            primaryBtn: "submit-kwitansi-btn btn-secondary",
            primaryBtnLabel: '<i class="fas fa-download fz-16 mr-2"></i>Download',
            secondaryBtn: "d-none",
            misc: '<button type="button" class="btn btn-default" onclick="modalViewSurat({id:\''.concat(a, '\'})"><i class="fas fa-arrow-left fz-16 mr-sm-2"></i><span class="d-none d-sm-inline">Kembali</span></button>'),
            data: {
                "show.bs.modal": function() {
                    $('#modal [name="tgl_bayar"]').datepicker(), $("#modal .uang").toArray().forEach(function(t) {
                        new Cleave(t, {
                            numeral: !0,
                            numericOnly: !0,
                            numeralDecimalScale: 0,
                            numeralDecimalMark: ",",
                            delimiter: "."
                        })
                    })
                }
            }
        }).trigger("show.bs.modal")
    }).on("click", ".submit-kwitansi-btn", function() {
        var t = $modal.data(),
            a = t.no,
            e = t.tgl,
            n = t.pws,
            i = t.tujuan,
            s = getNomorSurat(a, e, 1 == n ? "pws" : null),
            o = moment(e).format(f2),
            l = $('#modal [name="tempat_asal"]').val(),
            r = $('#modal [name="tempat_tujuan"]').val(),
            d = $('#modal [name="hari"]').val(),
            c = numeral($('#modal [name="uang_harian"]').val())._value,
            m = Number($('#modal [name="uang_harian_n"]').val()),
            u = numeral($('#modal [name="uang_transportasi"]').val())._value,
            p = Number($('#modal [name="uang_transportasi_n"]').val()),
            g = numeral($('#modal [name="uang_penginapan"]').val())._value,
            f = Number($('#modal [name="uang_penginapan_n"]').val()),
            v = numeral($('#modal [name="uang_riil1"]').val())._value,
            h = numeral($('#modal [name="uang_riil2"]').val())._value,
            b = $('#modal [name="uraian_riil1"]').val(),
            w = $('#modal [name="uraian_riil2"]').val(),
            y = moment($('#modal [name="tgl_bayar"]').val(), f1).format(f2),
            k = getOrang($('#modal [name="bendahara"]').val()),
            S = c * m,
            x = u * p,
            _ = g * f,
            t = v + h,
            a = S + x + _ + t,
            n = terbilang(t),
            e = terbilang(a),
            k = {
                glob: _objectSpread(_objectSpread({}, glob), {}, {
                    tujuan: i,
                    tempat_tujuan: r,
                    tempat_asal: l,
                    hari: d,
                    spd_no: s,
                    spd_tgl: o,
                    u_harian: c,
                    u_harian_n: m,
                    u_transport: u,
                    u_transport_n: p,
                    u_penginapan: g,
                    u_penginapan_n: f,
                    u_riil1: v,
                    u_riil2: h,
                    uraian_riil1: b,
                    uraian_riil2: w,
                    u_t1: S,
                    u_t2: x,
                    u_t3: _,
                    u_t4: t,
                    u_t: a,
                    u_t4_terbilang: n,
                    u_t_terbilang: e,
                    tgl_bayar: y,
                    bendahara: {
                        nama: k.nama,
                        nip: k.nip
                    }
                }),
                data: $('#modal [name="pelaksana[]"]').val().map(function(t) {
                    var a = getOrang(t),
                        e = a.nama,
                        n = a.nip,
                        t = (a.jabatan, a.golongan);
                    a.pangkat;
                    return {
                        nama: e,
                        nip: n,
                        golongan: t
                    }
                })
            };
        $modal.modal("hide"), postAndDownload("api/generate-kwitansi", k)
    })
});
var firebaseConfig, db, initialLoad, dbBagitugas = null,
    KEY = Math.random().toString(36).substring(7);

function announced(t) {
    $.ajax({
        type: "POST",
        data: {
            mulai: moment(tglGantt[0]).format(f0),
            akhir: moment(tglGantt[1]).format(f0)
        },
        url: "api/get-data",
        success: function(t) {
            console.info("Response from api/refresh", t), t.surat && t.pegawai && t.mitra ? (surat = t.surat, pegawai = t.pegawai, mitra = t.mitra, setting = t.setting, refresh()) : notif("Gagal sinkronisasi data", "danger", 1, {
                delay: 1e3
            })
        },
        error: function(t) {
            console.warn(t.status, t.statusText), "localhost" === window.location.hostname && console.error(t.responseText), notif("Gagal sinkronisasi data", "danger", 1, {
                delay: 1e3
            })
        }
    }), notif(t, "wait", 0, {
        delay: 2e3
    }, {
        icon: "icon-refresh"
    })
}

function announce(t) {
    void 0 !== dbBagitugas && dbBagitugas.set({
        user: NIP,
        key: KEY,
        time: (new Date).getTime(),
        msg: "".concat(ME.nama || "Seseorang", " memperbarui ").concat(t || "data", ".<br>Sistem akan melakukan sinkronisasi...")
    })
}
"undefined" != typeof firebase && (firebase.initializeApp(firebaseConfig = {
    apiKey: "AIzaSyC9FeUBhIpZil0RgJoSg1ahnRwEr-P2miY",
    authDomain: "bagitugas-app.firebaseapp.com",
    databaseURL: "https://bagitugas-app.firebaseio.com",
    projectId: "bagitugas-app",
    storageBucket: "bagitugas-app.appspot.com",
    messagingSenderId: "106511037524",
    appId: "1:106511037524:web:0c62ddb81444a7a9"
}), db = firebase.firestore(), dbBagitugas = db.collection(DEV ? "bagitugas-dev" : "bagitugas").doc(SATKER.toString()), initialLoad = !0, dbBagitugas.onSnapshot(function(t, a) {
    var e, n, i;
    initialLoad ? initialLoad = !1 : t._document && (t = void 0 === (e = (n = t.data()).user) ? "" : e, e = void 0 === (e = n.key) ? "" : e, n = n.msg, i = void 0 === n ? "" : n, t && e !== KEY && i && ($modal.hasClass("show") ? modalHiddenAction = function() {
        announced(i)
    } : announced(i)))
}));
//# sourceMappingURL=main.js.map