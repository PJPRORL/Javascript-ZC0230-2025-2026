// ══════════════════════════════════════════════════════════════════════════
//  LES 4 — Het skelet: componenten registreren
// ══════════════════════════════════════════════════════════════════════════

import {CustomElement} from '../../router/customElement.ts'
import html from './navbar.html?raw'

export class Navbar extends CustomElement {
  constructor() {
    super(html)
  }
}

// TODO 4.3  Registreer dit element.
//           De opgave schrijft de naam voor. Vergeet het streepje niet.
//           Denk eraan: deze regel draait pas wanneer dit bestand ergens
//           geïmporteerd wordt.
//
// customElements.define('...', Navbar)
