export interface Recipe {
  id: string
  name: string
  cuisine: string
  difficulty: 'easy' | 'medium' | 'hard'
  minutes: number
  rating: number
}
