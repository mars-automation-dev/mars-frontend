# HP-12C — PWA

Emulador da calculadora financeira **HP-12C** como PWA (Progressive Web App)
instalável e que funciona **offline** em iPhone e iPad. Servido pelo app
`mars-frontend` na rota **`/hp12c/`**.

## O que é isto

A **interface** (HTML/CSS/JS de montagem) foi reescrita do zero para ser
responsiva, touch-friendly e instalável. O **motor de cálculo** (`motor.js`) é
**derivado de um projeto de terceiros** — veja a seção de licença abaixo.

Sem build step, sem framework, sem npm: são arquivos estáticos servidos de
`public/hp12c/`. Para funcionar, basta que o host sirva a pasta.

## Arquivos

```
public/hp12c/
  index.html      estrutura + elementos de id que o motor exige
  app.js          monta visor e teclado, chama Init_hp12c(), persistência iOS, registra SW
  styles.css      layout responsivo; visor de 7 segmentos em CSS puro
  motor.js        motor original (GPL-3.0) com 2 patches cirúrgicos (ver abaixo)
  sw.js           service worker: precache + cache-first
  manifest.json   manifesto PWA (standalone, portrait)
  icons/          ícones 180/192/512
  LICENSE         GNU GPL v3
  README.md
```

## Patches aplicados ao `motor.js`

O motor foi mantido **intacto**, exceto por dois patches necessários para o iOS:

1. **Persistência via `localStorage`** em vez de cookie. O Safari expira cookies
   escritos por script em 7 dias, o que apagaria registradores e programas.
   As funções `save_memory` / `recover_memory` passaram a usar
   `localStorage` (a serialização `save_memory2`/`recover_memory2` não mudou).
2. **Salvar no momento certo:** `window/document.onunload` não disparam de forma
   confiável no iOS. Em `app.js`, após `Init_hp12c()`, o estado é salvo em
   `visibilitychange` (hidden) e `pagehide` (resetando a guarda `close_hp12c.done`).

Nenhuma lógica de cálculo foi alterada.

## Como usar

- **Teclado na tela:** toque nas teclas. `f` (amarelo) e `g` (azul) são prefixos;
  os rótulos secundários aparecem acima (f) e abaixo (g) de cada tecla.
- **Teclado físico** (ex.: iPad com teclado): funciona, pois o motor registra
  `document.onkeypress`.
- **Instalar no iOS:** Safari → Compartilhar → *Adicionar à Tela de Início*.
  Abre em tela cheia (standalone) e funciona offline.

> Observação sobre a tecla **ON**: na HP-12C física é o botão de ligar. Neste
> motor, essa tecla alterna o separador decimal entre ponto e vírgula (padrão BR).

## Licença e atribuição

Este emulador é distribuído sob a **GNU General Public License v3.0** (veja
[`LICENSE`](./LICENSE)).

O **motor de cálculo (`motor.js`) é derivado** do repositório:

- **calculadora-hp12c** — https://github.com/jonatasbitencourt/calculadora-hp12c
  (branch `master`, licença GPL-3.0).

O autor daquele repositório declara **não ser o criador original** do emulador,
portanto a **autoria anterior do motor é incerta**. Os créditos e direitos do
motor pertencem a seus autores originais, quem quer que sejam. Esta reescrita
cobre apenas a interface (`index.html`, `app.js`, `styles.css`, `sw.js`,
`manifest.json`, ícones) e os dois patches descritos acima.
