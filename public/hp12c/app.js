/* HP-12C PWA — camada de interface.
 * NÃO contém lógica de cálculo. Todo cálculo vive em motor.js (original, GPL-3.0).
 * Este arquivo apenas: monta o visor (99 segmentos), monta o teclado (39 teclas),
 * chama Init_hp12c() e registra persistência para iOS + service worker.
 *
 * Contrato com o motor (motor.js):
 *  - Visor: elementos de id lcd{0..10}{a,b,c,d,e,f,g,p,t}. O motor liga/desliga
 *    cada segmento com style.visibility. Geometria dos sufixos (decodificada do
 *    lcdmap do motor):
 *      a=topo  b=vert.sup.esq  c=vert.sup.dir  d=meio
 *      e=vert.inf.esq  f=vert.inf.dir  g=base  p=ponto  t=cauda da vírgula
 *  - Indicadores: begin, dmyc, modifier, pgrm (o motor escreve innerHTML).
 *  - display: fallback textual do visor.
 *  - pointer_div: precisa existir com width/height inline (armadilha do Init).
 *  - Acionar tecla: dispatch(codigo).
 *  - document.onkeypress = kbd já é registrado pelo motor; NÃO sobrescrever.
 */
(function () {
  "use strict";

  // ---- Visor: 11 posições x 9 segmentos ----
  var LCD_POSITIONS = 11;
  var SEGMENTS = ["a", "b", "c", "d", "e", "f", "g", "p", "t"];

  function buildDisplay() {
    var lcd = document.getElementById("lcd");
    for (var i = 0; i < LCD_POSITIONS; i++) {
      var cell = document.createElement("div");
      cell.className = "digit";
      for (var s = 0; s < SEGMENTS.length; s++) {
        var seg = document.createElement("div");
        seg.className = "seg seg-" + SEGMENTS[s];
        seg.id = "lcd" + i + SEGMENTS[s];
        cell.appendChild(seg);
      }
      lcd.appendChild(cell);
    }
  }

  // ---- Teclado ----
  // Rótulos extraídos diretamente das funções kkNN do motor (blocos FF/GG).
  // p = rótulo primário (branco), f = função amarela, g = função azul.
  var KEYS = {
    11: { p: "n",    f: "AMORT",  g: "12×" },
    12: { p: "i",    f: "INT",    g: "12÷" },
    13: { p: "PV",   f: "NPV",    g: "CF₀" },
    14: { p: "PMT",  f: "RND",    g: "CFⱼ" },
    15: { p: "FV",   f: "IRR",    g: "Nⱼ" },
    16: { p: "CHS",  f: "",       g: "DATE" },
    7:  { p: "7",    f: "",       g: "" },
    8:  { p: "8",    f: "",       g: "" },
    9:  { p: "9",    f: "",       g: "" },
    10: { p: "÷", f: "",     g: "" },

    21: { p: "yˣ", f: "PRICE", g: "√x" },
    22: { p: "1/x",  f: "YTM",    g: "eˣ" },
    23: { p: "%T",   f: "SL",     g: "LN" },
    24: { p: "Δ%", f: "SOYD", g: "FRAC" },
    25: { p: "%",    f: "DB",     g: "INTG" },
    26: { p: "EEX",  f: "",       g: "ΔDYS" },
    4:  { p: "4",    f: "",       g: "D.MY" },
    5:  { p: "5",    f: "",       g: "M.DY" },
    6:  { p: "6",    f: "",       g: "x̄w" },
    20: { p: "×", f: "",     g: "" },

    31: { p: "R/S",  f: "P/R",    g: "PSE" },
    32: { p: "SST",  f: "Σ", g: "BST" },
    33: { p: "R↓", f: "PRGM", g: "" },
    34: { p: "x≷y", f: "FIN", g: "" },
    35: { p: "CLx",  f: "REG",    g: "" },
    36: { p: "ENTER", f: "PREFIX", g: "LSTx" },
    1:  { p: "1",    f: "",       g: "x̂,r" },
    2:  { p: "2",    f: "",       g: "ŷ,r" },
    3:  { p: "3",    f: "",       g: "n!" },
    30: { p: "−", f: "",     g: "" },

    41: { p: "ON",   f: "",       g: "" },
    42: { p: "f",    f: "",       g: "" },
    43: { p: "g",    f: "",       g: "" },
    44: { p: "STO",  f: "",       g: "" },
    45: { p: "RCL",  f: "",       g: "" },
    0:  { p: "0",    f: "",       g: "x̄" },
    48: { p: ".",    f: "",       g: "s" },
    49: { p: "Σ+", f: "",    g: "Σ−" },
    40: { p: "+",    f: "",       g: "" }
  };

  // Grade 4 linhas x 10 colunas (códigos conforme mapa do motor).
  var GRID = [
    [11, 12, 13, 14, 15, 16, 7, 8, 9, 10],
    [21, 22, 23, 24, 25, 26, 4, 5, 6, 20],
    [31, 32, 33, 34, 35, 36, 1, 2, 3, 30],
    [41, 42, 43, 44, 45, 36, 0, 48, 49, 40]
  ];

  function buildKeyboard() {
    var kb = document.getElementById("keyboard");
    var enterPlaced = false;
    for (var r = 0; r < GRID.length; r++) {
      for (var c = 0; c < GRID[r].length; c++) {
        var code = GRID[r][c];
        // ENTER (36) ocupa col 5, linhas 2 e 3: um único botão com span 2.
        if (code === 36) {
          if (enterPlaced) continue;
          enterPlaced = true;
        }
        var btn = makeKey(code, r, c);
        kb.appendChild(btn);
      }
    }
  }

  function makeKey(code, r, c) {
    var def = KEYS[code] || { p: "?", f: "", g: "" };
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "key key-" + code;
    if (code === 42) btn.classList.add("key-f");
    if (code === 43) btn.classList.add("key-g");
    if (code === 36) btn.classList.add("key-enter");
    if (code === 41) btn.classList.add("key-on");

    // Posicionamento explícito na grade (1-based).
    btn.style.gridColumn = (c + 1).toString();
    if (code === 36) {
      btn.style.gridRow = "3 / span 2";
    } else {
      btn.style.gridRow = (r + 1).toString();
    }

    var fLbl = document.createElement("span");
    fLbl.className = "lbl-f";
    fLbl.textContent = def.f || "";

    var pLbl = document.createElement("span");
    pLbl.className = "lbl-p";
    pLbl.textContent = def.p || "";

    var gLbl = document.createElement("span");
    gLbl.className = "lbl-g";
    gLbl.textContent = def.g || "";

    btn.appendChild(fLbl);
    btn.appendChild(pLbl);
    btn.appendChild(gLbl);

    btn.setAttribute("aria-label", def.p || String(code));
    btn.addEventListener("click", function () {
      if (typeof dispatch === "function") dispatch(code);
    });
    return btn;
  }

  // ---- Persistência no iOS (Patch 2 do plano) ----
  // window/document.onunload não disparam de forma confiável no iOS. close_hp12c
  // tem guarda de execução única (close_hp12c.done); resetar antes de cada chamada.
  function wirePersistence() {
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        if (typeof close_hp12c === "function") {
          close_hp12c.done = 0;
          close_hp12c();
        }
      }
    });
    window.addEventListener("pagehide", function () {
      if (typeof close_hp12c === "function") {
        close_hp12c.done = 0;
        close_hp12c();
      }
    });
  }

  function registerSW() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("./sw.js").catch(function () {});
      });
    }
  }

  function boot() {
    buildDisplay();
    buildKeyboard();
    // Init_hp12c() lê pointer_div.style.width/height e os elementos de id fixo.
    if (typeof Init_hp12c === "function") {
      Init_hp12c();
    }
    wirePersistence(); // depois de Init_hp12c(), conforme o plano.
    registerSW();
    // NÃO sobrescrever document.onkeypress: o motor já registra kbd.
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
