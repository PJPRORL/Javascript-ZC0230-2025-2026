export interface TradingCard {
  id: string
  naam: string
  serie: string
  type: string
  zeldzaamheid: 'gewoon' | 'ongewoon' | 'zeldzaam' | 'legendarisch'
  aanvalskracht: number
  waarde: number
}
