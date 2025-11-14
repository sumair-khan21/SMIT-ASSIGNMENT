let taskBtn = document.getElementById('addTask')
let arr = [];

taskBtn.addEventListener('click', function(){
    let taskInput = document.getElementById('task').value;
    
    if(taskInput === ''){
        alert('Please enter a tasks')
        return;
    }
    
    let taskList = document.getElementById('tasklist')
    let taskItem = document.createElement('li')
    taskItem.innerHTML = taskInput;
    taskList.appendChild(taskItem);
    arr.push(taskInput);

    let taskCount = document.getElementById('taskCount')
    taskCount.innerHTML = `Total Tasks: ${arr.length}`;
    
})

