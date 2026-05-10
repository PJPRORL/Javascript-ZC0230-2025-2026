import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import type {Post} from './models/post.ts'
import homePage from './pages/home/home.html?raw'

const root = document.querySelector<HTMLDivElement>('#app')!
root.innerHTML = homePage

const postList = document.querySelector<HTMLTableSectionElement>('#posts')!

async function renderPosts() {
    // We gebruiken hier de gratis en fake jsonplaceholder API om te testen
    const result = await fetch('https://jsonplaceholder.typicode.com/posts')

    // Via de json() methode kunnen we de data omzetten naar een JavaScript object
    const posts: Post[] = await result.json()
    posts.forEach(post => {
        postList.appendChild(createPost(post))
    })
}

function createPost(post: Post): HTMLDivElement {
    const postCard = document.createElement('div')
    postCard.classList.add('card', 'my-3')

    const postBody = document.createElement('div')
    postBody.classList.add('card-body')
    postCard.appendChild(postBody)

    const postTitle = document.createElement('h5')
    postTitle.classList.add('card-title')
    postTitle.textContent = post.title
    postBody.appendChild(postTitle)

    const postContent = document.createElement('p')
    postContent.classList.add('card-text')
    postContent.textContent = post.body
    postBody.appendChild(postContent)

    return postCard
}

void renderPosts()
