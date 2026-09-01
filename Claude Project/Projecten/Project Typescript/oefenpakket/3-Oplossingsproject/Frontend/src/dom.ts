/**
 * Kleine DOM-hulpjes die het non-null assertion-teken `!` overbodig maken.
 *
 * Waarom: `querySelector` geeft `Element | null`. Met `!` beloof je de compiler
 * dat het niet null is — en als je je vergist, krijg je verderop een onduidelijke
 * "Cannot read properties of null". Goldberg noemt assertions iets dat je
 * "sparingly, and only when you're absolutely certain" gebruikt (hfst. 9,
 * Type Modifiers). Een echte controle is even kort en zegt meteen wát er ontbreekt.
 */

/**
 * Zoekt precies één element binnen `root` en gooit een leesbare fout als het er niet is.
 *
 * @example const knop = zoek<HTMLButtonElement>(this, '#add-button')
 */
export function zoek<E extends Element = HTMLElement>(root: ParentNode, selector: string): E {
  const element = root.querySelector<E>(selector)
  if (element === null) {
    throw new Error(`Geen element gevonden voor selector "${selector}". Staat het in de HTML van dit onderdeel?`)
  }
  return element
}

/**
 * Leest een attribuut en geeft een lege string als het ontbreekt.
 * Attributen zijn in HTML altijd strings; getallen zet je zelf om.
 */
export function attribuut(element: Element, naam: string): string {
  return element.getAttribute(naam) ?? ''
}

/**
 * Leest een attribuut als getal. Geeft `fallback` bij een ontbrekende of ongeldige waarde,
 * zodat je nooit stil met NaN verder rekent.
 */
export function attribuutAlsGetal(element: Element, naam: string, fallback = 0): number {
  const ruw = element.getAttribute(naam)
  if (ruw === null || ruw.trim() === '') return fallback
  const getal = Number(ruw)
  return Number.isNaN(getal) ? fallback : getal
}
