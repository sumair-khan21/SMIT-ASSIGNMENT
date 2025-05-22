let taskBtn = document.getElementById('addTask')
let arr = [];

taskBtn.addEventListener('click', function(){
    let taskInput = document.getElementById('task')
    let taskText = taskInput.value;
    
    if(taskInput.value === ''){
        alert('Please enter a tasks')
        return;
    }
    
    let taskList = document.getElementById('tasklist')
    let taskItem = document.createElement('li')
    taskItem.innerHTML = taskText;
    taskList.appendChild(taskItem);
    arr.push(taskText);

    let taskCount = document.getElementById('taskCount')
    taskCount.innerHTML = `Total Tasks: ${arr.length}`;
    
})