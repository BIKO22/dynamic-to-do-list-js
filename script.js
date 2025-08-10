// Wait for the page to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from local storage
    loadTasks();

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Prevent adding empty tasks
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        // Append remove button to list item
        li.appendChild(removeBtn);

        // Append list item to the task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save to local storage
        saveTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            // Get the text part before the remove button
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = () => {
                taskList.removeChild(li);
                saveTasks();
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing Enter key
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
