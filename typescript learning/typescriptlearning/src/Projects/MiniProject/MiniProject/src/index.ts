const btn = document.getElementById("btn")!;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;

 btn.addEventListener("click", function (){
     alert(input.value);
     input.value = "";
 });

form.addEventListener("submit", function (e){
    e.preventDefault();
    console.log("SUBMITTED!");
})