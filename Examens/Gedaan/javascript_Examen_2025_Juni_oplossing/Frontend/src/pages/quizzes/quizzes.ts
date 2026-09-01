import HTML from './quizzes.html?raw'
import {Page} from '../../router/page.ts'
import {Quiz} from '../../models/quiz.ts'
import {quizPersistenceProvider} from '../../data/data.ts'
import {QuestionComponent} from '../../components/question/question.ts'

export class QuizzesPage extends Page {

  #quizNameList = this.body.querySelector<HTMLUListElement>('#quizzes-list')!
  #questionList = this.body.querySelector<HTMLUListElement>('#questions-list')!
  #activeQuiz: string | null = null
  #quizzes: Quiz[] = []

  constructor() {
    super(HTML)

    this.unsubscribe.push(quizPersistenceProvider.addObserver(quizzes => {
      this.#quizzes = quizzes
      this.render()
    }))

    void quizPersistenceProvider.getAll()
  }

  render() {
    super.render()

    this.#quizNameList.innerHTML = ''
    this.#quizzes.map(quiz => {
      const li = document.createElement('li')
      li.innerText = quiz.name
      li.classList.add('list-group-item', 'list-group-item-action')
      this.#quizNameList.appendChild(li)

      li.addEventListener('click', () => {
        this.#activeQuiz = quiz.id
        this.render()
      })
    })


    const activeQuiz = this.#quizzes.find(quiz => quiz.id === this.#activeQuiz)
    this.#questionList.innerHTML = activeQuiz ? '' : 'Select a quiz to see the questions, if there are no quizzes, create one!'
    activeQuiz?.questions.map(q => {
      const question = new QuestionComponent()
      question.setAttribute('question', q.question)
      question.setAttribute('type', q.type)
      question.setAttribute('difficulty', q.difficulty)
      question.setAttribute('correct-answer', q.correctAnswer)
      question.setAttribute('incorrect-answers', JSON.stringify(q.incorrectAnswers))
      question.setAttribute('id', q.id)
      question.setAttribute('selected', 'true')
      question.setAttribute('hide-delete', 'true')

      question.addEventListener('add-remove-question', () => {
        void quizPersistenceProvider.update(activeQuiz.id, {
          ...activeQuiz,
          questions: activeQuiz.questions.filter(question => question.id !== q.id)
        })
      })

      this.#questionList.appendChild(question)
    })

  }
}
