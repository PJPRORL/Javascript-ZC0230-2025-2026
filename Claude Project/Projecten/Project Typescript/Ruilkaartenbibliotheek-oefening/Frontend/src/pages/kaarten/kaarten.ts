// ============================================================================
// De kaartenpagina (home, route '/').
//   VRAAG 1 (1 punt)  — de klasse die de HTML toont
//   VRAAG 2 (5 punten) — kaarten ophalen via de API en tonen
//   VRAAG 3 (4 punten) — toevoegen/verwijderen afhandelen
// ============================================================================
//
// De HTML (kaarten.html) heeft <custom-navbar> en een lege
// <div id="kaarten-container"> waarin de kaarten moeten komen.
//
// ---------------------------------------------------------------------------
// TODO 1 (vraag 1): importeer de componentbestanden die deze pagina gebruikt —
//                   navbar én kaartKaart. Die import ÍS de registratie van het
//                   custom element; zonder import blijft de tag onbekend.
//                   Maak dan een klasse KaartenPage die Page uitbreidt, met een
//                   constructor die super(html) aanroept.
//                   Test: je zou nu de navbar en de titel moeten zien.
//
// TODO 2 (vraag 2): override render(). Roep EERST super.render() aan (die zet de
//                   HTML in #app), en daarna:
//                     a) abonneer op de kaarten met kaartenProvider.addObserver(...)
//                        en duw de teruggegeven functie in this.unsubscribe
//                     b) roep kaartenProvider.getAll() aan
//                   Die volgorde is belangrijk: getAll() verwittigt meteen alle
//                   observers. Abonneer je pas daarna, dan mis je die melding
//                   en blijft je scherm leeg.
//
// TODO 3 (vraag 2): schrijf de methode die de kaarten tekent. Maak de container
//                   eerst leeg, en maak dan per kaart een element aan met
//                   document.createElement('<jouw-elementnaam>'). Geef alle
//                   properties door met setAttribute — in kebab-case, en met
//                   String(...) rond de getallen.
//
// TODO 4 (vraag 3): luister in de CONSTRUCTOR (niet in render()!) op het
//                   'kaart-toggle' event van this.body. render() kan meerdere
//                   keren draaien; de constructor maar één keer per instantie.
//
// TODO 5 (vraag 3): schrijf de afhandeling van die toggle:
//                     - zit de kaart al in de collectie (zelfde kaartId)?
//                       → verwijderen en stoppen
//                     - zit er een ANDERE kaart met dezelfde naam in?
//                       → alert() tonen en verder niets doen
//                     - anders → toevoegen met collectieProvider.create(...)
//
// TIP bij vraag 3: nadat je de kaarten in de DOM hebt gezet, roep je één keer
// collectieProvider.getAll() aan. Elke kaart is dan geabonneerd en zet meteen
// het juiste symbool (+ of ✓) op zijn knop.
