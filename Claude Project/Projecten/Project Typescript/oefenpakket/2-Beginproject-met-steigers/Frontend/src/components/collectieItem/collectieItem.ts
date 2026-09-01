// ══════════════════════════════════════════════════════════════════════════
//  LES 4 — skelet  ·  LES 7 — collectie tonen en verwijderen
// ══════════════════════════════════════════════════════════════════════════

import {CustomElement} from '../../router/customElement.ts'
import html from './collectieItem.html?raw'

export class CollectieItemElement extends CustomElement {
  constructor() {
    super(html)
  }

  // TODO 7.1  Getters voor de attributen: item-id, naam, waarde.

  // TODO 7.2  connectedCallback(): vul #collectie-item-info met naam én waarde
  //           in één regel. De opgave vraagt uitdrukkelijk een template literal.

  // TODO 7.3  Hang een listener aan #delete-btn.
  //           Let op: hier GEEN custom event. De opgave vraagt dat dit element
  //           het verwijderen zelf afhandelt. Waarom mag dat hier wel, en bij
  //           kaartKaart niet? (Zie les 7.)
}

// TODO 4.5  Registreer dit element onder een zelfgekozen naam met een streepje.
