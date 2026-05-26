import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import {Author} from './components/author/author.ts'
import {Navbar} from './components/navbar/navbar.ts'
import {Series} from './components/series/series.ts'
import {AuthorsPage} from './pages/authors/authors.ts'
import {HomePage} from './pages/home/home.ts'
import {LibraryPage} from './pages/library/library.ts'
import {SeriesPage} from './pages/series/series.ts'
import {Router} from './router/router.ts'

// Een custom element is een zelfgedefinieerd herbruikbaar HTML-element met een eigen UI, bepaalde extra attributen en
// eventuele custom events.
// Custom elements moeten geregistreerd worden bij de browser voordat deze gebruikt kunnen worden.
// De eerste parameter is de naam waaronder het element gebruikt kan worden in HTML-code, de naam moet een koppelteken
// bevatten.
// De tweede parameter is de naam van de klasse die de custom element implementeert, de constructor mag hier niet
// opgeroepen worden.
customElements.define('custom-navbar', Navbar)
customElements.define('custom-author', Author)
customElements.define('custom-series', Series)

// De router klasse is een niet-standaard, zelfgeschreven klasse die de navigatie tussen verschillende pagina's in de
// applicatie mogelijk maakt.
// Je KRIJGT deze klasse op het examen en moet de code enkel kunnen gebruiken, niet zelf schrijven.
new Router({
    // Map een route naar een klasse die de pagina representeert.
    // Je mag opnieuw geen constructor oproepen, de router zal dit voor jou doen.
    '/': HomePage,
    '/library': LibraryPage,
    '/authors': AuthorsPage,
    '/series': SeriesPage,
})
