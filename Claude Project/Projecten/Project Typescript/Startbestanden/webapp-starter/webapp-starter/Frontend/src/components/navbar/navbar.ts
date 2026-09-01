import {CustomElement} from '../../router/customElement.ts'
import html from './navbar.html?raw'

export class Navbar extends CustomElement {
  constructor() {
    super(html)
  }
}

// De naam moet een streepje bevatten. Voeg hier een <a data-link="..."> toe
// in navbar.html voor elke nieuwe pagina; de router pikt die vanzelf op.
customElements.define('app-navbar', Navbar)
