import HTML from './collection.html?raw'
import {Page} from '../../router/page.ts'
import {CollectionItem} from '../../models/collectionItem.ts'
import {collectionPersistenceProvider} from '../../data/data.ts'
import {CustomCollectionItem} from '../../components/customCollectionItem/customCollectionItem.ts'

export class CollectionPage extends Page {

  #collectionItems: CollectionItem[] = []
  #inCollectionContainer = this.body.querySelector<HTMLSpanElement>('#in-collection')!
  #collectionValueContainer = this.body.querySelector<HTMLSpanElement>('#collection-value')!
  #collectionItemsContainer = this.body.querySelector<HTMLDivElement>('#collection-items')!

  constructor() {
    super(HTML)

    this.unsubscribe.push(collectionPersistenceProvider.addObserver(items => {
      this.#collectionItems = items
      this.render()
    }))

    void collectionPersistenceProvider.getAll()
  }

  render() {
    super.render()

    let totalRetail = 0
    let totalResale = 0

    this.#collectionItems.forEach(item => {
      totalRetail += item.retail
      totalResale += item.resale ?? item.retail
    })

    this.#collectionValueContainer.innerHTML = `${totalRetail.toFixed(2)} / ${totalResale.toFixed(2)}`
    this.#inCollectionContainer.innerHTML = this.#collectionItems.length.toString()

    this.#collectionItemsContainer.innerHTML = ''
    this.#collectionItems.map(item => {
      const itemComponent = new CustomCollectionItem()
      itemComponent.setAttribute('id', item.id)
      itemComponent.setAttribute('title', item.title)
      itemComponent.setAttribute('value', `${item.retail.toFixed(2)} / ${item.resale?.toFixed(2) || 'N/A'}`)
      this.#collectionItemsContainer.appendChild(itemComponent)
    })
  }
}
