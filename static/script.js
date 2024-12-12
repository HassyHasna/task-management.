let taskIdCounter = 0; // Local counter for task IDs

// Function to add a new task
function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;

    if (title && description) {
        const task = {
            id: ++taskIdCounter,
            title: title,
            description: description,
            completed: false,
            dateAdded: new Date().toLocaleDateString() // Get the current date
        };

        // Simulate adding to backend and update UI
        createTaskCard(task);

        // Clear input fields
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    } else {
        alert('Please enter both title and description');
    }
}

// Function to create and display a task card
function createTaskCard(task) {
    const tasksContainer = document.getElementById('tasks');

    // Create the card
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.setAttribute('data-id', task.id);

    taskCard.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Date Added:</strong> ${task.dateAdded}</p>
        <button onclick="markAsComplete(${task.id})">Complete</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    tasksContainer.appendChild(taskCard);
}

// Function to mark a task as complete
function markAsComplete(taskId) {
    const taskCard = document.querySelector(`.task-card[data-id='${taskId}']`);
    if (taskCard) {
        taskCard.classList.toggle('completed');
        const button = taskCard.querySelector('button:nth-child(3)');
        button.textContent = taskCard.classList.contains('completed') ? 'Unmark' : 'Complete';
    }
}

// Function to edit a task
function editTask(taskId) {
    const taskCard = document.querySelector(`.task-card[data-id='${taskId}']`);

    if (taskCard) {
        const title = prompt('Edit Task Title', taskCard.querySelector('h3').textContent);
        const description = prompt('Edit Task Description', taskCard.querySelector('p').textContent);

        if (title && description) {
            taskCard.querySelector('h3').textContent = title;
            taskCard.querySelector('p').textContent = description;
        } else {
            alert('Both title and description are required');
        }
    }
}

// Function to delete a task
function deleteTask(taskId) {
    const taskCard = document.querySelector(`.task-card[data-id='${taskId}']`);
    if (taskCard) {
        taskCard.remove();
    }
}
