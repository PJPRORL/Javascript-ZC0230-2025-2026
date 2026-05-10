import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import {Images} from './data/images'
import homePage from './pages/home/home.html?raw'

const root = document.querySelector<HTMLDivElement>('#app')!
root.innerHTML = homePage

const foto = document.querySelector<HTMLImageElement>('#foto')!
const result = document.querySelector<HTMLElement>('#result')!

let [previousImageId] = Images[0]

function chooseRandomImage() {
    let newImageId = getRandomInteger(1, 9)

    while (newImageId === previousImageId) {
        newImageId = getRandomInteger(1, 9)
    }

    const newImage = Images.find(([id]) => id === newImageId)

    if (newImage) {
        const [, newImageFilename] = newImage
        foto.src = newImageFilename
        previousImageId = newImageId

        result.innerHTML += `<p>${newImageId}</p>`
        document.querySelector<HTMLElement>('#last-photo')!.innerHTML = newImageId.toString()
    }
}

function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

document.querySelector<HTMLButtonElement>('#random-button')?.addEventListener('click', chooseRandomImage)
