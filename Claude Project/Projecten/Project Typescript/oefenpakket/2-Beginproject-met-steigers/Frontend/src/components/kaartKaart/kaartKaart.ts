// ══════════════════════════════════════════════════════════════════════════
//  LES 4 — skelet  ·  LES 5 — kaarten tonen  ·  LES 6 — toevoegen
// ══════════════════════════════════════════════════════════════════════════

import {CustomElement} from '../../router/customElement.ts'
import html from './kaartKaart.html?raw'

export class KaartKaart extends CustomElement {
  constructor() {
    super(html)
  }

  // TODO 5.1  Schrijf getters voor de attributen die dit element krijgt:
  //           kaart-id, naam, serie, kaart-type, zeldzaamheid, aanvalskracht, waarde.
  //           Let op: getAttribute geeft `string | null`, en getallen moet je
  //           zelf omzetten.

  // TODO 5.2  Overschrijf connectedCallback().
  //           Roep als EERSTE regel super.connectedCallback() aan — anders staat
  //           de HTML nog niet in de DOM en vindt querySelector niets.
  //           Vul daarna de elementen met de ids uit kaartKaart.html:
  //           #serie, #naam, #type, #aanvalskracht, #waarde, #zeldzaamheid-badge.
  //           De badge krijgt ook een klasse: zie index.css.

  // TODO 6.1  Hang een click-listener aan #add-button die een custom event
  //           uitstuurt. Zet `bubbles: true` zodat het event de pagina bereikt,
  //           en geef in `detail` mee wat de pagina nodig heeft.

  // TODO 6.2  Abonneer je op de collectie-provider zodat deze knop zijn eigen
  //           symbool aanpast: '+' of '&check;'.
  //           Meld je weer af in disconnectedCallback() — anders blijft de
  //           observer draaien nadat het element uit de DOM is.
}

// TODO 4.4  Registreer dit element onder een zelfgekozen naam met een streepje.
