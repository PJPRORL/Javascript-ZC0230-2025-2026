// ============================================================================
// De centrale plaats waar de "data managers" van de applicatie leven.
// Hier maak je je providers aan — nergens anders.
// ============================================================================
//
// Dit is een ESM-module: de objecten die je hier exporteert worden maar ÉÉN keer
// aangemaakt. Iedereen die dit bestand importeert krijgt exact dezelfde instantie,
// en dus dezelfde observers. Dat is precies wat het observer-patroon nodig heeft.
//
// TODO 1: exporteer een `kaartenProvider`.
//         → RestPersistenceProvider<TradingCard>
//         → de API draait op http://localhost:3000/kaarten
//
// TODO 2: exporteer een `collectieProvider`.
//         → LocalStoragePersistenceProvider<CollectieItem>
//         → kies een sleutel voor localStorage, bv. 'collectie'
//
// Maak hier GEEN nieuwe providers aan in je pagina's of componenten: dan krijgt
// elk onderdeel zijn eigen observerlijst en zie je wijzigingen niet doorkomen.
