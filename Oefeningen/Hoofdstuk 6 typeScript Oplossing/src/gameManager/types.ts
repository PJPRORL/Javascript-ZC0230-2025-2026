// Type alias voor classes
export type CharacterClass = 'Warrior' | 'Mage' | 'Rogue' | 'Paladin' | 'Ranger' | 'Necromancer' | 'Bard'

// Karakter interface
export interface Character {
    id: string
    name: string
    class: CharacterClass
    health: number
    mana: number
    lastStrike: Date | null
}

// Type alias voor aanval
export type Attack = [attacker: Character, defender: Character]
