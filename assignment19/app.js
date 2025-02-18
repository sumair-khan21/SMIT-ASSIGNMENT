let text = document.getElementById("todo-list");
let ui = document.getElementById("show");

function add() {
  if (ui.value.trim() === "") return;

  var li = document.createElement("li");
  li.innerHTML = `${ui.value} 
        <div>
            <button class="edit-btn" onclick="edit(this)">Edit</button> 
            <button onclick="del(this)">Del</button>
        </div>
    `;

  text.appendChild(li);
  ui.value = "";
}

function edit(button) {
  let newTodo = prompt(
    "Edit your todo:",
    button.parentElement.parentElement.firstChild.nodeValue.trim()
  );
  if (newTodo) {
    button.parentElement.parentElement.firstChild.nodeValue = newTodo;
  }
}

function del(button) {
  button.parentElement.parentElement.remove();
}
