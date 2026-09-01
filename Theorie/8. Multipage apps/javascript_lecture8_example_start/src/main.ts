import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import HomePageHTML from './pages/home/home.html?raw'

const root = document.querySelector('#app')!
root.innerHTML = HomePageHTML
