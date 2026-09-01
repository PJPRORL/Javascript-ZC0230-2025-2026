// ============================================================================
// navbar.ts = het custom element voor de navigatiebalk (<custom-navbar>).
// Hoort bij VRAAG "Routing & componenten (1 punt)".
// De navbar heeft geen eigen logica nodig: hij toont enkel de HTML uit navbar.html.
// De links werken via het data-link attribuut (zie router.ts).
// ============================================================================

import {CustomElement} from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

export class CustomNavbar extends CustomElement {

  constructor() {
    super(HTML) // de basisklasse zet de meegegeven HTML als inhoud van het element
  }
}
