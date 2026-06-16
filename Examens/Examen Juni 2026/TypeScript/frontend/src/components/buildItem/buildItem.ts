import {CustomElement} from '../../router/customElement.ts'
import HTML from './buildItem.html?raw'

export class buildItemComponent extends CustomElement {
    constructor() {
        super(HTML)
    }
    // observedAttributes + attributeChangedCallback komen in stap 6
}