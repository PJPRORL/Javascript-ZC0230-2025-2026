// ============================================================================
// Custom element dat ÉÉN item uit de collectie toont.
//   VRAAG 1 (1 punt)  — het element registreren
//   VRAAG 4 (4 punten) — naam en waarde tonen via een template literal
//   VRAAG 5 (2 punten) — verwijderen via de X-knop
// ============================================================================
//
// De HTML (collectieItem.html) heeft deze id's klaarstaan:
//   #collectie-item-info   #delete-btn
//
// Attributen: item-id, naam, waarde
//
// ---------------------------------------------------------------------------
// TODO 1 (vraag 1): klasse die CustomElement uitbreidt, constructor met
//                   super(html), en customElements.define() onderaan met een
//                   zelfgekozen naam met streepje.
//
// TODO 2 (vraag 4): getters voor itemId, naam en waarde.
//                   waarde is een getal → Number(...).
//
// TODO 3 (vraag 4): in connectedCallback() (na super.connectedCallback()!)
//                   #collectie-item-info vullen met een TEMPLATE LITERAL die
//                   naam en waarde in één regel zet. De opgave vraagt hier
//                   uitdrukkelijk om een template literal.
//
// TODO 4 (vraag 5): click-listener op #delete-btn die de kaart verwijdert.
//                   LET OP — de opgave vraagt hier GEEN custom event: dit element
//                   spreekt zelf collectieProvider.delete(this.itemId) aan.
//                   Dat mag, omdat de collectiepagina via een observer luistert
//                   en dus vanzelf hertekent.
