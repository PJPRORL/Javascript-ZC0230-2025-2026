export abstract class CustomElement extends HTMLElement {
    protected readonly componentBody: HTMLDivElement
  
    protected constructor(body: string) {
      super()
      this.componentBody = document.createElement('div')
      this.componentBody.innerHTML = body
    }
  
    connectedCallback() {
      this.innerHTML = ''
      this.appendChild(this.componentBody)
    }
  }