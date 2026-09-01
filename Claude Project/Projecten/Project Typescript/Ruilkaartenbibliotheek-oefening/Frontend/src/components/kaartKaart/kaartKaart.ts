// ============================================================================
// Custom element dat ÉÉN ruilkaart toont.
//   VRAAG 1 (1 punt)  — het element registreren zodat de HTML verschijnt
//   VRAAG 2 (5 punten) — de properties invullen in de HTML
//   VRAAG 3 (4 punten) — het custom event + het symbool op de knop
// ============================================================================
//
// De HTML (kaartKaart.html) heeft deze id's klaarstaan:
//   #serie  #zeldzaamheid-badge  #naam  #type  #aanvalskracht  #waarde  #add-button
//
// Attributen die dit element krijgt (ALTIJD strings, ALTIJD kebab-case):
//   kaart-id, naam, serie, kaart-type, zeldzaamheid, aanvalskracht, waarde
//
// Let op 'kaart-type': 'type' alleen is een bestaand HTML-attribuut, vandaar de prefix.
//
// ---------------------------------------------------------------------------
// TODO 1 (vraag 1): klasse KaartKaart die CustomElement uitbreidt,
//                   constructor met super(html), en customElements.define()
//                   onderaan met een zelfgekozen naam met streepje.
//
// TODO 2 (vraag 2): schrijf getters die de string-attributen omzetten:
//                     get naam(): string      → this.getAttribute('naam') ?? ''
//                     get waarde(): number    → Number(this.getAttribute('waarde') ?? '0')
//                   Doe dat voor alle zeven attributen.
//
// TODO 3 (vraag 2): override connectedCallback().
//                   BEGIN met super.connectedCallback() — anders staat de HTML
//                   nog niet in de DOM en vindt querySelector niets.
//                   Vul daarna elk element via zijn id met textContent.
//                   Voor de badge: zet ook de klasse
//                     `zeldzaamheid-${this.zeldzaamheid}`
//                   erop (die staan in index.css).
//
// TODO 4 (vraag 3): hang een click-listener aan #add-button die een CustomEvent
//                   'kaart-toggle' verstuurt met bubbles: true, en in detail
//                   {kaartId, naam, waarde}. Het element handelt het toevoegen
//                   NIET zelf af — de pagina luistert en beslist.
//
// TODO 5 (vraag 3): abonneer met collectieProvider.addObserver(...) en zet het
//                   symbool op de knop: '&check;' als deze kaart in de collectie
//                   zit, anders '+'. Gebruik knop.innerHTML (niet textContent,
//                   anders zie je de letterlijke tekst &check;).
//
// TODO 6 (vraag 3): bewaar de unsubscribe-functie in een privéveld en roep ze op
//                   in disconnectedCallback(). Doe je dat niet, dan blijven
//                   observers zich opstapelen bij elke navigatie.
