import {Page} from '../../router/page.ts'
import HTML from './cart.html?raw'

export class cartPage extends Page {
    constructor() {
        super(HTML)
    }
    // render() vul je later aan (stap 2). Voorlopig volstaat de render() van de basisklasse.
}