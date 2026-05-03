const btn = document.getElementById("btn")!;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("#todoform")!;
const ul = document.querySelector("todolist")!;

 // btn.addEventListener("click", function (){
 //     alert(input.value);
 //     input.value = "";
 // });

function handleSubmit(e: SubmitEvent){
    e.preventDefault();
    const newTodoText = input.value;
    const newLI = document.createElement("li");
    newLI.append(newTodoText);
    ul.appendChild(newLI);
    input.value = "";
}

// function handleSubmit(e: SubmitEvent){
//     e.preventDefault();
//     const newTodoText = input.value;
//     const newLI = document.createElement("li");
//     newLI.append(newTodoText);
//     list..append(newLI);
//     input.value = "";
// }

form.addEventListener("submit", handleSubmit);

