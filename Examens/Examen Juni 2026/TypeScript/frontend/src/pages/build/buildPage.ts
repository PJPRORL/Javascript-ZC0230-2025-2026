import {Page} from '../../router/page.ts'
import HTML from './build.html?raw'

export class buildPage extends Page {
    constructor() {
        super(HTML)
    }
    // render() vul je later aan (stap 2)
}