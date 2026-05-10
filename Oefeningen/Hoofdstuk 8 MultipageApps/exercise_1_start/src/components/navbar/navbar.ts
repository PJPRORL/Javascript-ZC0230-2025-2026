import {CustomElement} from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

export class Navbar extends CustomElement {

  constructor() {
    super(HTML)
  }
}