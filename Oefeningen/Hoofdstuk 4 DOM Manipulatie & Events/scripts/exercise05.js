imageSelection = document.querySelector("#afbeelding");
buttonAan = document.querySelector("#lichtAan");
buttonUit = document.querySelector("#lichtUit");

function init(){
    buttonUit.hidden = true;
}

window.onload = init();

buttonAan.addEventListener("click", function () {
    imageSelection.src = "img/pic_bulbon.gif";
})

buttonUit.addEventListener("click", function () {
    imageSelection.src = "img/pic_bulboff.gif";
})