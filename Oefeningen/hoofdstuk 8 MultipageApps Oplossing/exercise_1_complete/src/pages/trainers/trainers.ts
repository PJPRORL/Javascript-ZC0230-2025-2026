// <!-- TODO: startbestanden: leegmaken -->

import {dataManager} from '../../data/data.ts'
import {Page} from '../../router/page.ts'
import HTML from './trainers.html?raw'

export class TrainersPage extends Page {
    readonly #trainerList = this.body.querySelector<HTMLUListElement>('#trainerList')!

    constructor() {
        super(HTML)
    }

    render() {
        super.render()

        this.#trainerList.innerHTML = ''

        dataManager.trainers.forEach(t => {
            const trainers = document.createElement('div')
            trainers.className = 'card'
            trainers.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${t.name}</h5>
        <p class="card-text">Age: ${t.age}</p>
      </div>
    `
            this.#trainerList.appendChild(trainers)
        })
    }
}
