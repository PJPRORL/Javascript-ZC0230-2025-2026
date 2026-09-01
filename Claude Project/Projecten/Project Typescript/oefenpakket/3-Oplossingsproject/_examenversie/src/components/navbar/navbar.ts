import {CustomElement} from '../../router/customElement.ts'
// ?raw is een Vite-truc: importeer het bestand als string in plaats van het uit te voeren.
import html from './navbar.html?raw'

export class Navbar extends CustomElement {
  constructor() {
    // De basisklasse zet deze string in een <div> die in connectedCallback in de DOM komt.
    super(html)
  }
}

// De naam moet een streepje bevatten (verplicht door de webstandaard) en is opgelegd door de opgave.
customElements.define('custom-navbar', Navbar)
