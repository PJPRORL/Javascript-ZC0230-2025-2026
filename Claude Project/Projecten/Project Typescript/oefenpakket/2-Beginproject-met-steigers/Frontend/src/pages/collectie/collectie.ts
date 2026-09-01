// ══════════════════════════════════════════════════════════════════════════
//  LES 4 — skelet  ·  LES 7 — collectie tonen
// ══════════════════════════════════════════════════════════════════════════

// TODO 4.6b  Importeer hier de component-bestanden die deze pagina gebruikt.

import {Page} from '../../router/page.ts'
import html from './collectie.html?raw'

export class CollectiePage extends Page {
  constructor() {
    super(html)
  }

  // TODO 7.4  Overschrijf render(): super.render(), abonneren op de
  //           collectie-provider, unsubscribe bewaren, getAll() aanroepen.

  // TODO 7.5  Toon de collectie:
  //           - een element per item in #collectie-lijst
  //           - het aantal in #aantal-kaarten
  //           - de totale waarde in #collectie-totaal
  //           Voor dat totaal is reduce() de nette manier.
}
