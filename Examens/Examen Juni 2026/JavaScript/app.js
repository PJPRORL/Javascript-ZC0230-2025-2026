const artikelen = document.querySelector('#recipe-list');

const recipes = [
  {
    id: 1,
    title: "Pannenkoeken",
    difficulty: "makkelijk",
    time: 20,
    description: "Luchtige pannenkoeken voor een snel ontbijt."
  },
  {
    id: 2,
    title: "Tomatensoep",
    difficulty: "makkelijk",
    time: 35,
    description: "Een warme soep met tomaat, ui en basilicum."
  },
  {
    id: 3,
    title: "Groentepasta",
    difficulty: "gemiddeld",
    time: 30,
    description: "Pasta met courgette, paprika en een lichte saus."
  },
  {
    id: 4,
    title: "Appelcrumble",
    difficulty: "gemiddeld",
    time: 50,
    description: "Warme appel uit de oven met een krokante kruimellaag."
  }
];

// Template voor 1 recept:
// <article class="recipe-card">
//   <h2>Pannenkoeken</h2>
//   <p><strong>Moeilijkheid:</strong> makkelijk</p>
//   <p><strong>Bereidingstijd:</strong> 20 minuten</p>
//   <p>Luchtige pannenkoeken voor een snel ontbijt.</p>
// </article>



renderItems();


function createRecipeCard(recipe) {
  const recipeCard = document.createElement('article');
  recipeCard.classList.add('recipe-card');
  const recipeHeader = document.createElement('h2');
  recipeHeader.innerHTML = recipe.title;
  recipeCard.appendChild(recipeHeader);
  const recipeDifficulty = document.createElement('p')
  recipeDifficulty.innerHTML = `<strong>Moeilijkheid: </strong> ${recipe.difficulty}`;
  recipeCard.appendChild(recipeDifficulty);
  const recipeTime = document.createElement('p')
  recipeTime.innerHTML = `<strong>Bereidingstijd: </strong> ${recipe.time}`;
  recipeCard.appendChild(recipeTime);
  const recipeDescription = document.createElement('p')
  recipeDescription.innerHTML = `${recipe.description}`;
  recipeCard.appendChild(recipeDescription);

  return recipeCard;
}

function renderItems(){
  recipes.forEach((recipe) => {
    artikelen.appendChild(createRecipeCard(recipe));
  })
}