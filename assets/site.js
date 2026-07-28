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

    /* 3b) Capas de vídeo (click-to-play, só um toca por vez) */
    function bindFacade(frame) {
      var f = frame.querySelector(".vfacade");
      if (!f) return;
      f.addEventListener("click", function () {
        var url = f.getAttribute("data-embed");
        if (!url) return;
        // Pausa/reseta qualquer vídeo que esteja tocando
        document.querySelectorAll(".vframe.playing").forEach(function (fr) {
          fr.innerHTML = fr.getAttribute("data-facade");
          fr.classList.remove("playing");
          bindFacade(fr);
        });
        // Carrega e toca o vídeo clicado
        var ifr = document.createElement("iframe");
        ifr.src = url;
        ifr.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        ifr.setAttribute("allowfullscreen", "");
        ifr.setAttribute("scrolling", "no");
        frame.innerHTML = "";
        frame.appendChild(ifr);
        frame.classList.add("playing");
      });
    }
    document.querySelectorAll(".vframe").forEach(function (frame) {
      frame.setAttribute("data-facade", frame.innerHTML);
      bindFacade(frame);
    });

    /* 3c) Carrossel de reels (setas laterais) */
    document.querySelectorAll(".reel-carousel").forEach(function (car) {
      var track = car.querySelector(".reel-track");
      var prev = car.querySelector(".prev");
      var next = car.querySelector(".next");
      function stepSize() {
        var first = track.querySelector("*");
        return first ? first.offsetWidth + 20 : 256;
      }
      if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -stepSize(), behavior: "smooth" }); });
      if (next) next.addEventListener("click", function () { track.scrollBy({ left: stepSize(), behavior: "smooth" }); });
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
