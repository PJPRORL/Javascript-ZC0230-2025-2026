export type QuestionType = 'multiple' | 'boolean'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
    type: QuestionType
    difficulty: Difficulty
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}
