import {CustomElement} from '../../router/customElement.ts'
import HTML from './author.html?raw'
import './author.css'

export class Author extends CustomElement {
    constructor() {
        super(HTML)
    }
}
