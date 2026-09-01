import {CustomElement} from '../../router/customElement.ts'
import html from './navbar.html?raw'

declare global {
  interface HTMLElementTagNameMap {
    'custom-navbar': Navbar
  }
}

export class Navbar extends CustomElement {
  constructor() {
    super(html)
  }
}

// De naam is opgelegd door de opgave en moet een streepje bevatten.
customElements.define('custom-navbar', Navbar)
