import HTML from './question.html?raw'
import {CustomElement} from '../../router/customElement.ts'
import {questionPersistenceProvider} from '../../data/data.ts'

export class QuestionComponent extends CustomElement {
  static observedAttributes = ['question', 'type', 'difficulty', 'correct-answer', 'incorrect-answers', 'selected', 'hide-delete']

  #questionText = this.componentBody.querySelector<HTMLHeadingElement>('#question-text')!
  #questionType = this.componentBody.querySelector<HTMLHeadingElement>('#question-type')!
  #questionDifficulty = this.componentBody.querySelector<HTMLParagraphElement>('#question-difficulty')!
  #answersList = this.componentBody.querySelector<HTMLUListElement>('#answers-list')!
  #correctAnswer = this.componentBody.querySelector<HTMLParagraphElement>('#correct-answer')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-question')!
  #addRemoveBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-remove-question')!

  constructor() {
    super(HTML)
    this.#deleteBtn.addEventListener('click', () => questionPersistenceProvider.delete(this.id))
    this.#addRemoveBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-remove-question'))
    })
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'question':
        this.#questionText.innerText = newValue
        break
      case 'type':
        this.#questionType.innerText = newValue
        break
      case 'difficulty':
        this.#questionDifficulty.innerText = newValue
        break
      case 'correct-answer':
        this.#correctAnswer.innerText = newValue
        break
      case 'incorrect-answers':
        this.#answersList.innerHTML = ''
        const answers = JSON.parse(newValue)
        answers.map((answer: string) => {
          const li = document.createElement('li')
          li.innerText = answer
          this.#answersList.appendChild(li)
        })
        break
      case 'selected':
        this.#addRemoveBtn.innerText = newValue === 'true' ? '-' : '+'
        break
      case 'hide-delete':
        this.#deleteBtn.hidden = newValue === 'true'
    }
  }
}