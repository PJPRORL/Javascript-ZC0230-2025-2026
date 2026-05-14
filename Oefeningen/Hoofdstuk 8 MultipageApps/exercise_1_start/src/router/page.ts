export abstract class Page {

    protected readonly body: HTMLDivElement
    static readonly #root = document.querySelector<HTMLDivElement>('#app')!
  
    protected constructor(body: string) {
      this.body = document.createElement('div')
      this.body.innerHTML = body
    }
  
    render() {
      Page.#root.innerHTML = ''
      Page.#root.appendChild(this.body)
    }
  }