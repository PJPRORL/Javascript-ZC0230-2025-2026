export interface Book {
  id: string
  title: string
  author: string
  type: "Limited" | "Rare/Deluxe/Roman Numeral"  | "Lettered"
  retail: number
  resale?: number
  image: string
  properties: string[]
}