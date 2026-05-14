import {Page} from '../../router/page.ts'
import HTML from './home.html?raw'

export class HomePage extends Page {

    constructor() {
        super(HTML)
    }
}