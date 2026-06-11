export type CharacterClass = 'Warrior' | 'Mage' | 'Rogue' | 'Paladin' | 'Ranger' | 'Necromancer' | 'Bard';
export interface Character {
    id: string;
    name: string;
    class: CharacterClass;
    health: number;
    mana: number;
    lastStrike: Date | null;
}
export type Attack = [attacker: Character, defender: Character];
//# sourceMappingURL=types.d.ts.map