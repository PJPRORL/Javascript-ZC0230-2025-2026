import type { Character } from './types.js';
export declare class GameManager {
    private characters;
    constructor(characters: Character[]);
    private showMenu;
    private showCharacters;
    private filter;
    private filterOnClass;
    private filterOnStat;
    private addCharacter;
    private findCharacterByName;
    private removeCharacter;
    private performAttack;
    private attack;
    private processChoice;
    start(): void;
}
//# sourceMappingURL=gameManager.d.ts.map