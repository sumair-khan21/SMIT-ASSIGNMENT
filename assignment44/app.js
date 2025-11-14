import { getDate } from './date.js';



let inputTodo = document.getElementById('inputTodo');
let todoBtn = document.getElementById('todoBtn');
let todoList = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];


// is mai edit or delete global function per kam nhi kr rahe te
// function render() {
//     todoList.innerHTML = '';

//     if (todos.length === 0) {
//         todoList.innerHTML = `
//                     <div class="empty-state">
//                         <div class="empty-icon">📝</div>
//                         <div>No todos yet. Add one above to get started!</div>
//                     </div>
//                 `;
//         return;
//     }

//     for (let i = 0; i < todos.length; i++) {
//         todoList.innerHTML += `
//                    <li>
//                        <span class="todo-text">${todos[i]}</span>
//                        <div class="todo-actions">
//                            <button class="edit-btn" onclick="edit(${i})">Edit</button>
//                            <button class="delete-btn" onclick="del(${i})">Delete</button>
//                        </div>
//                    </li>`
//     }
// }
function render() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <div>No todos yet. Add one above to get started!</div>
            </div>
        `;
        return;
    }

    for (let i = 0; i < todos.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="todo-text">${todos[i]}</span>
            <div class="todo-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        li.querySelector('.edit-btn').addEventListener('click', () => edit(i));
        li.querySelector('.delete-btn').addEventListener('click', () => del(i));

        todoList.appendChild(li);
    }
}


render();

todoBtn.addEventListener('click', function () {
    let todoText = inputTodo.value.trim();
    if (todoText !== "") {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        render();
        inputTodo.value = '';
    } else {
        alert('Please enter a todo item');
    }
})

function del(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

function edit(index) {
    let newTodo = prompt('Edit your new todo', todos[index]);
    if (newTodo != null && newTodo.trim() != "") {
        todos[index] = newTodo.trim()
        localStorage.setItem('todos', JSON.stringify(todos));
        render();

    }
}

getDate();  