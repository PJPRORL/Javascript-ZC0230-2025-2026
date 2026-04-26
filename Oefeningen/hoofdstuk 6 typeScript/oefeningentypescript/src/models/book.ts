export type BookType = 'ebook' | 'audiobook' | 'print'

export interface Book {
    id: string
    title: string
    publicationYear: number
    series?: {
        name: string
        number: number
    }
    author: string
    type: BookType
}