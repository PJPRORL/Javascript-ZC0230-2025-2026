// ══════════════════════════════════════════════════════════════════════════
//  LES 4 — skelet  ·  LES 5 — kaarten tonen  ·  LES 6 — toevoegen
// ══════════════════════════════════════════════════════════════════════════

// TODO 4.6a  Importeer hier de component-bestanden die deze pagina gebruikt.
//            Die import ís de registratie: zonder deze regels blijven de tags leeg,
//            zónder foutmelding. Dit is de meest verwarrende bug van dit examen.

import {Page} from '../../router/page.ts'
import html from './kaarten.html?raw'

export class KaartenPage extends Page {
  constructor() {
    super(html)

    // TODO 6.3  Vang hier het custom event van kaartKaart op.
    //           Waarom in de constructor en niet in render()? (Zie les 4.)
  }

  // TODO 5.3  Overschrijf render().
  //           Roep eerst super.render() aan.
  //           Abonneer je daarna op de kaarten-provider en duw de unsubscribe
  //           in `this.unsubscribe`, zodat cleanup() hem opruimt.
  //           Roep tot slot getAll() aan: die verwittigt de observers en zet
  //           daarmee de eerste weergave in gang.

  // TODO 5.4  Schrijf een privémethode die de kaarten toont.
  //           Maak per kaart een element aan, zet de attributen (strings!,
  //           kebab-case!) en hang het in #kaarten-container.

  // TODO 6.4  Schrijf de afhandeling van het event:
  //           - zit deze kaart al in de collectie? → verwijderen
  //           - zit er al een ANDERE kaart met dezelfde naam in? → meldingspopup
  //           - anders → toevoegen
  //           Let op de volgorde van die twee controles.
}
