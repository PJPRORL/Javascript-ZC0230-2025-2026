import type {Author} from './author.ts'
import type {Series} from './series.ts'

export type BookType = 'ebook' | 'audiobook' | 'print'

export interface Book {
    id: string
    title: string
    publicationYear: number
    series?: Series & {number: number}
    author: Author
    type: BookType
}
