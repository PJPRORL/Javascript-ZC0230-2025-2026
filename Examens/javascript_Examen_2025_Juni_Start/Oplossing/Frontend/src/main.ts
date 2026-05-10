import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import {Router} from './router/router.ts'
import {HomePage} from './pages/home/home.ts'
import {CustomBook} from './components/customBook/customBook.ts'
import {CustomNavbar} from './components/navbar/navbar.ts'
import {CustomCollectionItem} from './components/customCollectionItem/customCollectionItem.ts'
import {CollectionPage} from './pages/collection/collection.ts'

window.customElements.define('custom-book', CustomBook)
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-collection-item', CustomCollectionItem)

new Router({
  '/': HomePage,
  '/collection': CollectionPage,
})