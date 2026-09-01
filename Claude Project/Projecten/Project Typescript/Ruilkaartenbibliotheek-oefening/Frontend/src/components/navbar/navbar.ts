// ============================================================================
// VRAAG 1 — Pagina's & componenten (1 punt)
// ============================================================================
//
// Het eenvoudigste custom element van het project: het toont alleen HTML.
// Gebruik dit als sjabloon voor de twee andere componenten.
//
// TODO 1: importeer CustomElement uit '../../router/customElement.ts'
//         en de HTML met  import html from './navbar.html?raw'
//         (?raw is een Vite-truc: importeer het bestand als string)
//
// TODO 2: maak een klasse Navbar die CustomElement uitbreidt.
//         De constructor roept super(html) aan — meer is er niet nodig,
//         de basisklasse zet die string in de DOM.
//
// TODO 3: eindig het bestand met customElements.define(...).
//         De opgave legt de naam op: 'custom-navbar'.
//         Die naam MOET een streepje bevatten (webstandaard).
//
// Vergeet niet: de import van dit bestand in een pagina ís de registratie.
// Zonder die import blijft <custom-navbar> een onbekende tag en zie je niets.
