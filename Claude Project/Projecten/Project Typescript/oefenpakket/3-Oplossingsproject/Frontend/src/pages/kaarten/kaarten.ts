// Een component-bestand importeren registreert het custom element én maakt de
// `declare global`-uitbreidingen erin zichtbaar. Vergeet je dit, dan blijft de tag leeg.
import type {KaartToggleDetail} from '../../components/kaartKaart/kaartKaart.ts'
import '../../components/kaartKaart/kaartKaart.ts'
import '../../components/navbar/navbar.ts'

import {collectieProvider, kaartenProvider} from '../../data/data.ts'
import {zoek} from '../../dom.ts'
import type {TradingCard} from '../../models/tradingCard.ts'
import {Page} from '../../router/page.ts'
import html from './kaarten.html?raw'

export class KaartenPage extends Page {
  constructor() {
    super(html)

    // Listeners in de CONSTRUCTOR: render() kan meermaals draaien, de constructor niet.
    // Dankzij de HTMLElementEventMap-uitbreiding in kaartKaart.ts is `evt` hier
    // een CustomEvent<KaartToggleDetail> — geen `as` nodig.
    this.body.addEventListener('kaart-toggle', evt => {
      void this.#verwerkToggle(evt.detail)
    })
  }

  render() {
    super.render()

    // Abonneren vóór ophalen: getAll() verwittigt de observers zelf.
    this.unsubscribe.push(kaartenProvider.addObserver(kaarten => this.#toonKaarten(kaarten)))
    void this.#laadKaarten()
  }

  async #laadKaarten() {
    try {
      await kaartenProvider.getAll()
    } catch {
      zoek(this.body, '#kaarten-container').textContent =
        'Kan de kaarten niet ophalen. Draait de Server met `pnpm dev` op poort 3000?'
    }
  }

  #toonKaarten(kaarten: TradingCard[]) {
    const container = zoek(this.body, '#kaarten-container')
    container.innerHTML = ''

    for (const kaart of kaarten) {
      // Dankzij de HTMLElementTagNameMap-uitbreiding is `element` hier een KaartKaart
      // en niet zomaar een HTMLElement.
      const element = document.createElement('kaart-kaart')

      // Properties doorgeven kan enkel als string en in kebab-case.
      element.setAttribute('kaart-id', kaart.id)
      element.setAttribute('naam', kaart.naam)
      element.setAttribute('serie', kaart.serie)
      element.setAttribute('kaart-type', kaart.type)
      element.setAttribute('zeldzaamheid', kaart.zeldzaamheid)
      element.setAttribute('aanvalskracht', String(kaart.aanvalskracht))
      element.setAttribute('waarde', String(kaart.waarde))

      container.appendChild(element)
    }

    // Nu alle kaarten in de DOM staan (en dus geabonneerd zijn), één keer de collectie
    // ophalen. Elke kaart zet daardoor meteen het juiste symbool (+ of ✓).
    void collectieProvider.getAll()
  }

  async #verwerkToggle(detail: KaartToggleDetail) {
    const collectie = await collectieProvider.getAll()

    // Zit déze kaart al in de collectie? Dan is de klik een "verwijderen".
    const bestaand = collectie.find(item => item.kaartId === detail.kaartId)
    if (bestaand) {
      await collectieProvider.delete(bestaand.id)
      return
    }

    // Een ándere kaart met dezelfde naam? Melden en niets doen.
    if (collectie.some(item => item.naam === detail.naam)) {
      alert(`Er zit al een kaart met de naam "${detail.naam}" in je collectie.`)
      return
    }

    await collectieProvider.create({
      kaartId: detail.kaartId,
      naam: detail.naam,
      waarde: detail.waarde,
    })
  }
}
