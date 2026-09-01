// ============================================================================
// navbar.ts = het custom element voor de navigatiebalk (<custom-navbar>).
// Hoort bij VRAAG "Routing & componenten (1 punt)".
// De links werken via het data-link attribuut (zie router.ts).
// ============================================================================

import {CustomElement} from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

export class CustomNavbar extends CustomElement {

  constructor() {
    super(HTML)
  }
}
