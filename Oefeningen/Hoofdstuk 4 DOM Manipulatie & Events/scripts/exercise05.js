const imageSelection = document.querySelector("#afbeelding");
const buttonAan = document.querySelector("#lichtAan");
const buttonUit = document.querySelector("#lichtUit");

buttonUit.hidden = true;

function lichtAan () {
    imageSelection.src = "./img/pic_bulbon.gif";
    buttonAan.hidden = true;
    buttonUit.hidden = false;
}

function lichtUit () {
    imageSelection.src = "./img/pic_bulboff.gif";
    buttonUit.hidden = true;
    buttonAan.hidden = false;
}

buttonAan.addEventListener("click",lichtAan)
buttonUit.addEventListener("click",lichtUit)
