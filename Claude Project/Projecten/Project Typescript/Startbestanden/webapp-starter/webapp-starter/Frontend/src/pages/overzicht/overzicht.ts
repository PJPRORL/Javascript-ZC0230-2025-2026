// Een component-bestand importeren registreert het custom element.
// Vergeet je dit, dan blijft de tag leeg zonder enige foutmelding.
import '../../components/itemKaart/itemKaart.ts'
import '../../components/navbar/navbar.ts'

import {itemProvider} from '../../data/data.ts'
import type {Item} from '../../models/item.ts'
import {Page} from '../../router/page.ts'
import html from './overzicht.html?raw'

export class OverzichtPage extends Page {
  constructor() {
    super(html)

    // Listeners in de constructor: render() kan meermaals draaien, de constructor niet.
    this.body.querySelector<HTMLFormElement>('#nieuw-formulier')!.addEventListener('submit', evt => {
      evt.preventDefault()
      void this.#voegToe()
    })
  }

  render() {
    super.render()

    // Abonneren vóór ophalen: getAll() verwittigt de observers zelf.
    this.unsubscribe.push(itemProvider.addObserver(items => this.#toonItems(items)))
    void this.#laadItems()
  }

  async #laadItems() {
    try {
      await itemProvider.getAll()
    } catch {
      this.#toonFout('Kan de server niet bereiken. Draait Server met `pnpm dev` op poort 3000?')
    }
  }

  #toonItems(items: Item[]) {
    const container = this.body.querySelector('#items-container')!
    container.innerHTML = ''

    for (const item of items) {
      const kolom = document.createElement('div')
      kolom.className = 'col-sm-6 col-lg-4'

      const kaart = document.createElement('item-kaart')
      kaart.setAttribute('item-id', item.id)
      kaart.setAttribute('naam', item.naam)
      kaart.setAttribute('beschrijving', item.beschrijving)
      kaart.setAttribute('aantal', String(item.aantal))

      kolom.appendChild(kaart)
      container.appendChild(kolom)
    }
  }

  async #voegToe() {
    const naam = this.body.querySelector<HTMLInputElement>('#veld-naam')!
    const beschrijving = this.body.querySelector<HTMLInputElement>('#veld-beschrijving')!
    const aantal = this.body.querySelector<HTMLInputElement>('#veld-aantal')!

    try {
      // create() krijgt het object ZONDER id: Omit<Item, 'id'>.
      // De server genereert het id en de provider verwittigt daarna de observers.
      await itemProvider.create({
        naam: naam.value,
        beschrijving: beschrijving.value,
        aantal: Number(aantal.value),
      })
      naam.value = ''
      beschrijving.value = ''
      aantal.value = '1'
    } catch {
      this.#toonFout('Toevoegen mislukt.')
    }
  }

  #toonFout(tekst: string) {
    const melding = this.body.querySelector<HTMLParagraphElement>('#foutmelding')!
    melding.textContent = tekst
    melding.hidden = false
  }
}
