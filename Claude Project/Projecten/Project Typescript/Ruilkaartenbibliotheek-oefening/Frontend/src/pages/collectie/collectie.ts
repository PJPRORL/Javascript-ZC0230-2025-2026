// ============================================================================
// De collectiepagina (route '/collectie').
//   VRAAG 1 (1 punt)  — de klasse die de HTML toont
//   VRAAG 4 (4 punten) — de collectie inladen, tonen en de totale waarde
// ============================================================================
//
// De HTML (collectie.html) heeft deze id's klaarstaan:
//   #collectie-lijst     de <ul> waarin de items komen
//   #aantal-kaarten      de badge rechtsboven
//   #collectie-totaal    de totale waarde rechtsonder
//
// ---------------------------------------------------------------------------
// TODO 1 (vraag 1): importeer navbar én collectieItem (die imports registreren
//                   de custom elements). Maak een klasse CollectiePage die Page
//                   uitbreidt met een constructor die super(html) aanroept.
//
// TODO 2 (vraag 4): override render(): eerst super.render(), dan abonneren op
//                   collectieProvider en de unsubscribe in this.unsubscribe
//                   duwen, dan collectieProvider.getAll() aanroepen.
//
// TODO 3 (vraag 4): schrijf de methode die de lijst tekent. Maak #collectie-lijst
//                   leeg en maak per item een element aan met de attributen
//                   item-id, naam en waarde (allemaal strings).
//
// TODO 4 (vraag 4): vul #aantal-kaarten met het aantal items, en bereken de
//                   totale waarde met reduce(). Toon die met twee decimalen
//                   (toFixed(2)) in #collectie-totaal.
//
// Deze pagina hoeft niets te doen voor het verwijderen (vraag 5): het
// collectieItem-element regelt dat zelf. Omdat deze pagina geabonneerd is op
// dezelfde provider, hertekent ze vanzelf zodra er iets verdwijnt.
