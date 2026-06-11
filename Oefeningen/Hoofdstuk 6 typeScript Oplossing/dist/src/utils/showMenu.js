export function showMenu(optionsMap, menuText) {
    const options = Object.keys(optionsMap);
    console.table(options);
    const selectedOption = Number(prompt(menuText));
    if (Number.isNaN(selectedOption) || selectedOption < 0 || selectedOption >= options.length) {
        throw new Error('Invalid selection');
    }
    return optionsMap[options[selectedOption]];
}
//# sourceMappingURL=showMenu.js.map