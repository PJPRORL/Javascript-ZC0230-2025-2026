import {Page} from '../../router/page.ts'
import HTML from './home.html?raw'
import './home.css'

export class HomePage extends Page {
    constructor() {
        super(HTML)
    }
}
