import {Page} from '../../router/page.ts'
import HTML from './library.html?raw'

export class LibraryPage extends Page {
    constructor() {
        super(HTML)

        // TODO: Nieuw boek toevoegen via een submit event.
    }

    render() {
        super.render()

        // TODO: Boeken tabel opvullen.

        // TODO: Series dropdown opvullen.

        // TODO: Author dropdown opvullen.
    }
}
