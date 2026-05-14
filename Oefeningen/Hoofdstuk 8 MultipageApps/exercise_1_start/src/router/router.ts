import {Page} from './page.ts'

// Een type dat alle concrete subklassen van de Page klasse voorstelt.
type ConcretePage = new () => Page
// Map een padnaam naar een constructor van een subklasse van Page.
type RouteMap = Record<string, ConcretePage>

export class Router {
  readonly #pages: RouteMap

  constructor(pages: RouteMap) {
      this.#pages = pages
      const pathName = window.location.pathname
      this.navigate(this.#pages[pathName] ? pathName : '/')
  }

  navigate(path: string) {
    const page = new this.#pages[path]()
    page.render()
    this.#setupRouter()
  }

  #setupRouter() {
    document.querySelectorAll('[data-link]')?.forEach(link => {
      const path = link.getAttribute('data-link')!
      link.addEventListener('click', (evt) => {
        evt.preventDefault()
        window.history.pushState(null, '', `${window.location.origin}${path}`)
        this.navigate(path)
      })
    })
  }
}