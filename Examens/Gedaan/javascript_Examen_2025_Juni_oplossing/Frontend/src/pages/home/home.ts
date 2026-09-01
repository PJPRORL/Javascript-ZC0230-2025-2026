import {Page} from '../../router/page.ts'
import HTML from './home.html?raw'
import type {Question} from '../../models/questions.ts'
import {questionPersistenceProvider, quizPersistenceProvider} from '../../data/data.ts'
import {QuestionComponent} from '../../components/question/question.ts'

export class HomePage extends Page {

  #questions: Question[] = []
  #questionContainer = this.body.querySelector<HTMLDivElement>('#questions')!

  #selectedType: 'multiple-choice' | 'true-false' = 'multiple-choice'
  #difficultyFilter = this.body.querySelector<HTMLSelectElement>('#difficulty-filter')!
  #selectedDifficulty: 'easy' | 'medium' | 'hard' | 'all' = 'all'

  #trueFalseInput = this.body.querySelector<HTMLInputElement>('#true-false')!
  #multipleChoiceInput = this.body.querySelector<HTMLInputElement>('#multiple-choice')!

  #selectedQuestionIds: Set<string> = new Set()
  #quizNameInput = this.body.querySelector<HTMLInputElement>('#quiz-name')!
  #createQuizButton = this.body.querySelector<HTMLButtonElement>('#create-quiz')!

  constructor() {
    super(HTML)

    this.unsubscribe.push(questionPersistenceProvider.addObserver(questions => {
      this.#questions = questions
      this.render()
    }))

    void questionPersistenceProvider.getAll()

    this.#trueFalseInput.addEventListener('change', () => {
      this.#selectedType = 'true-false'
      this.render()
    })

    this.#multipleChoiceInput.addEventListener('change', () => {
      this.#selectedType = 'multiple-choice'
      this.render()
    })

    this.#difficultyFilter.addEventListener('change', () => {
      this.#selectedDifficulty = this.#difficultyFilter.value as 'easy' | 'medium' | 'hard' | 'all'
      this.render()
    })

    this.#quizNameInput.addEventListener('change', () => this.render())

    this.#createQuizButton.addEventListener('click', async () => {
      void quizPersistenceProvider.create({
        name: this.#quizNameInput.value!,
        questions: this.#questions.filter(q => this.#selectedQuestionIds.has(q.id))
      })
      this.#selectedQuestionIds = new Set()
      this.#quizNameInput.value = ''
      this.render()
    })
  }

  render(): void {
    super.render()

    this.#questionContainer.innerHTML = ''
    this.#questions.filter(q => this.#questionMatchesFilter(q)).map(q => {
      const question = new QuestionComponent()
      question.setAttribute('question', q.question)
      question.setAttribute('type', q.type)
      question.setAttribute('difficulty', q.difficulty)
      question.setAttribute('correct-answer', q.correctAnswer)
      question.setAttribute('incorrect-answers', JSON.stringify(q.incorrectAnswers))
      question.setAttribute('id', q.id)
      question.setAttribute('selected', this.#selectedQuestionIds.has(q.id).toString())

      question.addEventListener('add-remove-question', () => {
        if (this.#selectedQuestionIds.has(q.id)) {
          this.#selectedQuestionIds.delete(q.id)
        } else {
          this.#selectedQuestionIds.add(q.id)
        }
        this.render()
      })

      this.#questionContainer.appendChild(question)
    })

    this.#createQuizButton.disabled = this.#selectedQuestionIds.size === 0
  }

  #questionMatchesFilter(question: Question): boolean {
    if (question.type !== this.#selectedType) return false

    return this.#selectedDifficulty === 'all' || question.difficulty === this.#selectedDifficulty
  }

}