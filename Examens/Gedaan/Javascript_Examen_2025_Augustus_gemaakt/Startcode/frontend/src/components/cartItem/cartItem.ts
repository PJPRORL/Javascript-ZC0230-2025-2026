import {CustomElement} from '../../router/customElement.ts'
import HTML from './cartItem.html?raw'

export class ItemCard extends CustomElement {
    constructor() {
        super(HTML)
    }
    // observedAttributes + attributeChangedCallback komen er later bij (stap 2).
}