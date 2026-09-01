import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Question} from '../models/questions.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {Quiz} from '../models/quiz.ts'

export const questionPersistenceProvider = new RestPersistenceProvider<Question>('http://localhost:3000/questions')
export const quizPersistenceProvider = new LocalStoragePersistenceProvider<Quiz>('quizzes')