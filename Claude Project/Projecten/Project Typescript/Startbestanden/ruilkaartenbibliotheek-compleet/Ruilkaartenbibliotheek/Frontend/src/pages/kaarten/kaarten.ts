// De import van een component-bestand registreert het custom element (customElements.define).
// Zonder deze imports blijven <custom-navbar> en <kaart-kaart> "onbekende" tags.
import '../../components/kaartKaart/kaartKaart.ts'
import '../../components/navbar/navbar.ts'

import {collectieProvider, kaartenProvider} from '../../data/data.ts'
import type {CollectieItem} from '../../models/collectieItem.ts'
import type {TradingCard} from '../../models/tradingCard.ts'
import {Page} from '../../router/page.ts'
import html from './kaarten.html?raw'

// Het type van wat er in het custom event zit.
type KaartToggleDetail = Pick<CollectieItem, 'kaartId' | 'naam' | 'waarde'>

export class KaartenPage extends Page {
  constructor() {
    super(html)

    // Event listeners in de CONSTRUCTOR, niet in render():
    // render() kan meerdere keren draaien, de constructor maar één keer per pagina-instantie.
    this.body.addEventListener('kaart-toggle', evt => {
      void this.#verwerkToggle((evt as CustomEvent<KaartToggleDetail>).detail)
    })
  }

  render() {
    super.render() // zet de HTML van de pagina in #app

    // Abonneer op de kaarten. De callback draait telkens de data verandert.
    this.unsubscribe.push(kaartenProvider.addObserver(kaarten => this.#toonKaarten(kaarten)))

    // getAll() haalt op én verwittigt meteen alle observers → daar begint alles.
    void kaartenProvider.getAll()
  }

  #toonKaarten(kaarten: TradingCard[]) {
    const container = this.body.querySelector('#kaarten-container')!
    container.innerHTML = ''

    for (const kaart of kaarten) {
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

    // Zit deze kaart al in de collectie? Dan is de klik een "verwijderen".
    const bestaand = collectie.find(item => item.kaartId === detail.kaartId)
    if (bestaand) {
      await collectieProvider.delete(bestaand.id)
      return
    }

    // Een andere kaart met dezelfde naam? Melden en niets doen.
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
