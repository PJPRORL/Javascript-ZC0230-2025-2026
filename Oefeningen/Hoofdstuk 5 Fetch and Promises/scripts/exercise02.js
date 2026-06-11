async function dataOphalen()
{
    try {
        const response = await fetch('https://swapi-api.hbtn.io/api/people/');
        const data = await response.json();

        data.results.forEach(element => createCharacter(element));
    }
    catch(err){
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('d-none');
        errorMessage.textContent = 'Er is een fout opgetreden bij het ophalen van de data.'
    }

}

const lijstCharacters = document.querySelector('#personages')

function createCharacter(character){
    const characterListItem = document.createElement('li');
    characterListItem.classList.add('list-group-item');
    characterListItem.textContent = `${character.name}${character.gender === 'n/a' ? '' : ' (' + character.gender + ')'}`;
    lijstCharacters.appendChild(characterListItem);
}

dataOphalen();