// DOM Elementen ophalen
const titleHeaders = document.getElementsByClassName("title");
const subtitleHeaders = document.getElementsByClassName("subtitle");
let buttonTitle = document.getElementById("buttonTitels");
let buttonSub = document.getElementById("buttonSub");
let buttonAll = document.getElementById("buttonAll");

function changeTitle() {
    for (const header of titleHeaders) {
        header.classList.add("headers");
    }
}

function changeSub() {
    for (const subHeader of subtitleHeaders) {
        subHeader.classList.add("tekst");
    }
}

buttonTitle.addEventListener("click", changeTitle);
buttonSub.addEventListener("click", changeSub);
buttonAll.addEventListener("click", function () {
    changeTitle();
    changeSub();
})