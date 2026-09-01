/**
 * De vier toegestane zeldzaamheden, één keer opgeschreven.
 *
 * `as const` maakt er een readonly tuple van literal types van, zodat het type
 * hieronder er rechtstreeks uit afgeleid kan worden. Zo bestaat de lijst maar op
 * één plaats: als er een zeldzaamheid bijkomt, past het type zich vanzelf aan.
 * (Freeman hfst. 7 over literal types; Goldberg hfst. 3, Unions and Literals.)
 */
export const ZELDZAAMHEDEN = ['gewoon', 'ongewoon', 'zeldzaam', 'legendarisch'] as const

/** 'gewoon' | 'ongewoon' | 'zeldzaam' | 'legendarisch' — afgeleid, niet overgetypt. */
export type Zeldzaamheid = (typeof ZELDZAAMHEDEN)[number]

/**
 * Type predicate: versmalt een gewone string naar Zeldzaamheid.
 * Nodig omdat alles wat uit een HTML-attribuut of uit JSON komt, string is.
 * (Goldberg hfst. 9, Type Modifiers — "user-defined type guard".)
 */
export function isZeldzaamheid(waarde: string): waarde is Zeldzaamheid {
  // De assertie gaat hier naar een breder type (readonly string[]), en dat is
  // altijd veilig. Ze staat er alleen omdat includes() op een readonly tuple
  // enkel waarden van dat tuple aanvaardt.
  return (ZELDZAAMHEDEN as readonly string[]).includes(waarde)
}

export interface TradingCard {
  id: string
  naam: string
  serie: string
  type: string
  zeldzaamheid: Zeldzaamheid
  aanvalskracht: number
  waarde: number
}
