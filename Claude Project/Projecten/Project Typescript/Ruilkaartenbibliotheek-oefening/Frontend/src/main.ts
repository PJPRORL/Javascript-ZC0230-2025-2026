import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

// ============================================================================
// VRAAG 1 — Pagina's & componenten (1 punt)
// ============================================================================
//
// TODO 1: Importeer KaartenPage en CollectiePage.
// TODO 2: Maak een new Router({...}) aan met twee routes:
//           '/'           → de kaartenpagina (home)
//           '/collectie'  → de collectiepagina
//
// LET OP: de routetabel bevat KLASSEN, geen instanties.
//         Dus  {'/': KaartenPage}  en niet  {'/': new KaartenPage()}.
//         De router maakt zelf een nieuwe instantie bij elke navigatie.
//
// De navbar-links werken automatisch: de router zoekt alle elementen met een
// data-link attribuut op en hangt daar een click-listener aan. Je hoeft daar
// zelf niets voor te schrijven — als je de router maar aanmaakt.
