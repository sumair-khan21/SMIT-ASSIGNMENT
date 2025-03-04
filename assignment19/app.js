let text = document.getElementById("todo-list");
let ui = document.getElementById("show");
let todoData  = JSON.parse(localStorage.getItem('todo')) || [];


render()

function render(){
  text.innerHTML = "";
  for(let i = 0; i < todoData.length; i++){
    text.innerHTML += `
    <li>
        ${todoData[i]} 
        <button class="edit-btn" onclick="edit(${i})">Edit</button>
        <button class="del" onclick="deleteItem(${i})">del</button></li>
    `;

  }
}

function add() {
  if (ui.value.trim() !== ""){
    // var li = document.createElement("li");
    // // li.innerHTML = `${ui.value} 
    // //       <div>
    // //           <button class="edit-btn" onclick="edit(this)">Edit</button> 
    // //           <button onclick="del(this)">Del</button>
    // //       </div>
    // //   `;
  
    // text.appendChild(li);

    todoData.push(ui.value)
    localStorage.setItem('todo', JSON.stringify(todoData))
    ui.value = "";
    render()
  }else{
   Swal.fire("Please Enter Todo!");

  }

 
}


function deleteItem(button){
  todoData.splice(button,1)
  localStorage.setItem('todo', JSON.stringify(todoData));
  render()
}

function edit(button){
  let updated = prompt("Edited your todo" , todoData[button])
  if(updated !== "" && updated.trim() !== ""){
 todoData[button] = updated;
 localStorage.setItem('todo', JSON.stringify(todoData))
  }
  render()
}

// --------------------------------------------------------

// function edit(button) {
//   let newTodo = prompt(
//     "Edit your todo:",
//     button.parentElement.firstChild.nodeValue.trim()
//   );
//   if (newTodo) {
//     button.parentElement.firstChild.nodeValue = newTodo;
//   }
// }

// function del(button) {
//   button.parentElement.remove();
// }

