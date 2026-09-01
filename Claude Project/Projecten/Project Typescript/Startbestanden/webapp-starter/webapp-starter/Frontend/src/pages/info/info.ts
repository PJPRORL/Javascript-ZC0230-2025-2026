import '../../components/navbar/navbar.ts'

import {Page} from '../../router/page.ts'
import html from './info.html?raw'

// Een pagina zonder data: enkel de HTML tonen. render() overschrijven hoeft niet.
export class InfoPage extends Page {
  constructor() {
    super(html)
  }
}
