// Oefening structuur
async function ophalenUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersData = await response.json();

    let users = document.querySelector("#user-list");

    usersData.forEach(user => {
        const usersLijst = document.createElement('li')
        usersLijst.textContent = user.name;
        users.appendChild(usersLijst);

        usersLijst.setAttribute('class', 'highLight')
    });
}

ophalenUsers();