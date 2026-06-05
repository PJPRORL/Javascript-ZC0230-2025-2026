// ============================================================================
// menu.ts = de logica achter de weekmenu-pagina ('/menu').
// Het beantwoordt:
//   - "Weekmenu renderen + porties aanpassen (4 punten)": het weekmenu uit localStorage tonen,
//     de porties per item aanpassen (update in localStorage) en de totalen tonen.
// (Verwijderen van een item zit in het menuItem-component zelf, zie menuItem.ts.)
// ============================================================================

import {Page} from '../../router/page.ts'
import HTML from './menu.html?raw'
import {menuLocalProvider} from '../../data/data.ts'
import {MenuItem} from '../../models/menuItem.ts'

export class MenuPage extends Page {

  #menuContainer = this.body.querySelector<HTMLUListElement>('#menu-list')!
  #totalServings = this.body.querySelector<HTMLSpanElement>('#total-servings')!
  #totalMinutes = this.body.querySelector<HTMLSpanElement>('#total-minutes')!

  #menu: MenuItem[] = []

  constructor() {
    super(HTML)

    // --- VRAAG "Weekmenu renderen + porties aanpassen (4 punten)" ---
    // Observer + inladen van het weekmenu via de LocalStoragePersistenceProvider.
    this.unsubscribe.push(menuLocalProvider.addObserver(menu => {
      this.#menu = menu
      this.render()
    }))
    void menuLocalProvider.getAll()
  }

  render(): void {
    super.render()

    this.#menuContainer.innerHTML = ''
    this.#menu.map(item => {
      const element = document.createElement('custom-menu-item')
      // Titel + keuken in één regel via een TEMPLATE LITERAL.
      element.setAttribute('title', `${item.recipe.name} (${item.recipe.cuisine})`)
      element.setAttribute('servings', item.servings.toString())
      element.setAttribute('id', item.id)

      // --- VRAAG "Weekmenu renderen + porties aanpassen (4 punten)" ---
      // Luister op 'changeServings'. De verandering (+1 of -1) zit in event.detail.delta.
      // We berekenen het nieuwe aantal porties (minimum 1) en bewaren het via update in localStorage.
      element.addEventListener('changeServings', async evt => {
        const delta = (evt as CustomEvent<{delta: number}>).detail.delta
        const newServings = Math.max(1, item.servings + delta)
        await menuLocalProvider.update(item.id, {...item, servings: newServings})
      })

      this.#menuContainer.appendChild(element)
    })

    // Totalen berekenen met reduce.
    // - totaal aantal porties = som van alle servings.
    // - totale bereidingstijd = som van (minuten van het recept) over alle items.
    const totalServings = this.#menu.reduce((sum, item) => sum + item.servings, 0)
    const totalMinutes = this.#menu.reduce((sum, item) => sum + item.recipe.minutes, 0)

    this.#totalServings.innerText = totalServings.toString()
    this.#totalMinutes.innerText = totalMinutes.toString()
  }
}
