import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

import {InfoPage} from './pages/info/info.ts'
import {OverzichtPage} from './pages/overzicht/overzicht.ts'
import {Router} from './router/router.ts'

// Pad → pagina-KLASSE (geen instantie). De router maakt er zelf een aan per navigatie.
// Een pagina toevoegen = hier één regel, plus een <a data-link="..."> in navbar.html.
new Router({
  '/': OverzichtPage,
  '/info': InfoPage,
})
