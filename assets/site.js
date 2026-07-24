/* =========================================================
   PetShowCar — script compartilhado
   >>> TROQUE O NÚMERO DO WHATSAPP AQUI (só dígitos, com DDD e 55) <<<
   Ex.: Brasil, DDD 11, número 91234-5678  ->  "5511912345678"
   ========================================================= */
var WHATSAPP = "5515981080355";

(function () {
  function waLink(msg) {
    var base = "https://wa.me/" + WHATSAPP;
    return msg ? base + "?text=" + encodeURIComponent(msg) : base;
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* 1) Aplica o número em todos os links de WhatsApp */
    document.querySelectorAll("[data-wpp]").forEach(function (el) {
      var msg = el.getAttribute("data-msg") || "Olá! Vim pelo site da PetShowCar.";
      el.setAttribute("href", waLink(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    /* 2) Menu lateral (mobile) */
    var body = document.body;
    var btn = document.getElementById("menuBtn");
    var overlay = document.getElementById("overlay");
    function setMenu(open) { body.classList.toggle("nav-open", open); }
    if (btn) btn.addEventListener("click", function () { setMenu(!body.classList.contains("nav-open")); });
    if (overlay) overlay.addEventListener("click", function () { setMenu(false); });
    document.querySelectorAll(".side-nav a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });

    /* 3b) Capas de vídeo (click-to-play) */
    document.querySelectorAll(".vfacade").forEach(function (f) {
      f.addEventListener("click", function () {
        var url = f.getAttribute("data-embed");
        var frame = f.closest(".vframe");
        if (!url || !frame) return;
        var ifr = document.createElement("iframe");
        ifr.src = url;
        ifr.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        ifr.setAttribute("allowfullscreen", "");
        ifr.setAttribute("scrolling", "no");
        frame.innerHTML = "";
        frame.appendChild(ifr);
      });
    });

    /* 3) Formulários que enviam pro WhatsApp */
    document.querySelectorAll("form.wpp-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var intro = form.getAttribute("data-intro") || "Olá! Segue meu contato:";
        var linhas = [intro, ""];
        form.querySelectorAll("[name]").forEach(function (campo) {
          var label = campo.getAttribute("data-label") || campo.name;
          var valor = (campo.value || "").trim();
          if (valor) linhas.push("*" + label + ":* " + valor);
        });
        window.open(waLink(linhas.join("\n")), "_blank");
      });
    });
  });
})();
