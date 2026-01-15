"use strict";
var modalDaftarSatker = function() {
        $(".modal").modal("hide"), $("#modal-daftar-satker").modal("show")
    },
    modalTentang = function() {
        $(".modal").modal("hide"), $("#modal-tentang").modal("show")
    },
    updateForms = function() {
        !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0] ? ($("#modal-daftar-satker").modal("hide"), $("#daftar-satker-btn").prop("disabled", !0).html("Mendaftarkan..."), $("#login-btn, input").prop("disabled", !0)) : ($("#daftar-satker-btn").prop("disabled", !1).html("Daftar"), $("#login-btn, input").prop("disabled", !1))
    },
    daftarSatker = function(a, t) {
        var e = 1;
        /\d{4}/.test(a) ? $("#modal-daftar-satker [name=satker]").parent().removeClass("has-error") : ($("#modal-daftar-satker [name=satker]").parent().addClass("has-error"), e = !1), /\d{9}/.test(t) || /\d{18}/.test(t) ? $("#modal-daftar-satker [name=user]").parent().removeClass("has-error") : ($("#modal-daftar-satker [name=user]").parent().addClass("has-error"), e = !1), e && ($.ajax({
            type: "POST",
            url: registrationUrl,
            data: {
                satker: a,
                user: t,
                isSatkerRegistered: satkerTerdaftar.includes(a)
            },
            success: function(a) {
                console.info(a), $.notifyClose(), "SUCCESS" === a.status ? $.notify({
                    message: "Registrasi berhasil",
                    icon: "icon-check"
                }, {
                    type: "success"
                }) : "ERROR" === a.status ? $.notify({
                    message: a.message,
                    icon: "icon-exclamation"
                }, {
                    type: "danger"
                }) : $.notify({
                    message: "Registrasi gagal",
                    icon: "icon-exclamation"
                }, {
                    type: "danger"
                }), updateForms(0)
            },
            error: function(a) {
                console.warn(a.status, a.statusText), "localhost" === window.location.hostname && console.error(a.responseText), $.notifyClose(), $.notify({
                    message: "Ooops... terjadi kesalahan pada server",
                    icon: "icon-exclamation"
                }, {
                    type: "danger"
                }), updateForms(0)
            }
        }), updateForms(), $.notify({
            message: "Harap tunggu...",
            icon: "icon-hourglass"
        }, {
            type: "info",
            allow_dismiss: !1,
            delay: 0
        }))
    };
$(function() {
    $('[data-toggle="tooltip"]').tooltip(), $("#modal-daftar-satker").on("shown.bs.modal", function() {
        $("#modal-daftar-satker .form-control:first").focus()
    }), $("#daftar-satker-form").submit(function(a) {
        a.preventDefault(), daftarSatker($(this).find("[name=satker]").val(), $(this).find("[name=user]").val())
    })
});