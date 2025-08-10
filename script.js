document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    const addBtn = document.getElementById('add-btn');
    const taskInput = document.getElementById('task-input');

    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });
});

// Load tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again while loading
}

// Add a new task to the DOM + optionally save to Local Storage
function addTask(taskText, save = true) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = taskText;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');

    removeBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromStorage(taskText);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

// Remove a task from Local Storage
function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}
