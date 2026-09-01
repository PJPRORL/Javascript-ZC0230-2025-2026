import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {HomePage} from './pages/home/home.ts'
import {QuestionComponent} from './components/question/question.ts'
import {CustomNavbar} from './components/navbar/navbar.ts'
import {QuizzesPage} from './pages/quizzes/quizzes.ts'
import {TestPage} from './pages/test/test.ts'

window.customElements.define('custom-question', QuestionComponent)
window.customElements.define('custom-navbar', CustomNavbar)

new Router({
  '/': HomePage,
  '/quizzes': QuizzesPage,
  '/quizzes-test': TestPage,
})