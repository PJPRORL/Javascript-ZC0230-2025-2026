import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import type {Question} from './models/question'
import homePage from './pages/home/home.html?raw'

// Import the home page HTML
const root = document.querySelector<HTMLDivElement>('#app')!
root.innerHTML = homePage

// Get elements from the DOM
const questionElement = document.querySelector<HTMLElement>('#question')!
const answersElement = document.querySelector<HTMLElement>('#answers')!
const scoreElement = document.querySelector<HTMLElement>('#score')!
const submitButton = document.querySelector<HTMLButtonElement>('#submit')!

// Initialize variables
let questions: Question[] = []
let currentQuestionIndex = -1
let score = 0
let currentQuestion: Question

// Init page
loadQuestions().then(() => {
    showNextQuestion()
    submitButton.addEventListener('click', () => {
        showNextQuestion()
    })
})

// Functions
async function loadQuestions() {
    await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy')
        .then(response => response.json())
        .then(data => {
            questions = data.results
        })
}

function checkAnswerAndUpdateScore() {
    if (currentQuestionIndex >= 0) {
        const selectedAnswer = document.querySelector<HTMLInputElement>('input[name="answer"]:checked')

        if (selectedAnswer) {
            const answer = selectedAnswer.value

            if (answer === currentQuestion.correct_answer) {
                score++
                scoreElement.innerHTML = `Score: ${score}`
            }
        }
    }
}

function showNextQuestion() {
    // Clear the previous answers:
    checkAnswerAndUpdateScore()
    answersElement.innerHTML = ''

    // Is the game done?
    if (currentQuestionIndex >= questions.length - 1) {
        // Show the score and return
        questionElement.innerHTML = `Quiz finished! Your score is ${score} out of ${questions.length}`
        answersElement.innerHTML = ''
        return
    }

    // Iterate to the next question
    currentQuestionIndex++

    // Set the current question
    currentQuestion = questions[currentQuestionIndex]

    // Show the question
    questionElement.innerHTML = currentQuestion.question

    // Show the answers
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]

    allAnswers.forEach(answer => {
        const answerElement = createAnswer(answer)
        answersElement.appendChild(answerElement)
    })
}

function createAnswer(answer: string): HTMLElement {
    const divElement = document.createElement('div')
    divElement.classList.add('form-check')

    const inputElement = document.createElement('input')
    inputElement.classList.add('form-check-input')
    inputElement.type = 'radio'
    inputElement.name = 'answer'
    inputElement.value = answer

    divElement.appendChild(inputElement)

    const labelElement = document.createElement('label')
    labelElement.classList.add('form-check-label')
    labelElement.innerHTML = answer

    divElement.appendChild(labelElement)

    return divElement
}
