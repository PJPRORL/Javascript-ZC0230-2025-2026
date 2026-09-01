import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

import {CollectiePage} from './pages/collectie/collectie.ts'
import {KaartenPage} from './pages/kaarten/kaarten.ts'
import {Router} from './router/router.ts'

// De router koppelt een URL-pad aan een pagina-KLASSE (geen instantie!).
// Hij maakt zelf een nieuwe instantie aan bij elke navigatie.
new Router({
  '/': KaartenPage,
  '/collectie': CollectiePage,
})
