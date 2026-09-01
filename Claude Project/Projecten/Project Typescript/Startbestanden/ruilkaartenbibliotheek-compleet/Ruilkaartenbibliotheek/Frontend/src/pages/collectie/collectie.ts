import '../../components/collectieItem/collectieItem.ts'
import '../../components/navbar/navbar.ts'

import {collectieProvider} from '../../data/data.ts'
import type {CollectieItem} from '../../models/collectieItem.ts'
import {Page} from '../../router/page.ts'
import html from './collectie.html?raw'

export class CollectiePage extends Page {
  constructor() {
    super(html)
  }

  render() {
    super.render()

    this.unsubscribe.push(collectieProvider.addObserver(items => this.#toonCollectie(items)))
    void collectieProvider.getAll()
  }

  #toonCollectie(items: CollectieItem[]) {
    const lijst = this.body.querySelector('#collectie-lijst')!
    lijst.innerHTML = ''

    for (const item of items) {
      const element = document.createElement('collectie-item')
      element.setAttribute('item-id', item.id)
      element.setAttribute('naam', item.naam)
      element.setAttribute('waarde', String(item.waarde))
      lijst.appendChild(element)
    }

    this.body.querySelector('#aantal-kaarten')!.textContent = `${items.length} kaarten`

    const totaal = items.reduce((som, item) => som + item.waarde, 0)
    this.body.querySelector('#collectie-totaal')!.textContent = totaal.toFixed(2)
  }
}
