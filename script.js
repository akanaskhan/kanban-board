document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("loggedIn") === "true") {
        showKanbanBoard();
    } else {
        showLogin();
    }
});

function showSignup() {
    document.getElementById("signup-container").style.display = "flex";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("kanban-container").style.display = "none";
}

function showLogin() {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("login-container").style.display = "flex";
    document.getElementById("kanban-container").style.display = "none";
}

function showKanbanBoard() {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("kanban-container").style.display = "block";
}

function signUp() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Sign up successful! Please log in.");
        showLogin();
    } else {
        alert("Please fill in all fields.");
    }
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem("loggedIn", "true");
        showKanbanBoard();
    } else {
        showPopup("Invalid username or password.");
    }
}

function logout() {
    localStorage.setItem("loggedIn", "false");
    showLogin();
}

// function showPopup()

function showPopup(message) {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.innerHTML = `
        <p>${message}</p>
        <button onclick="closePopup()">Close</button>
    `;
    document.body.appendChild(popup);
    popup.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        document.body.removeChild(popup);
    }
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();

    if (taskText) {
        const task = createTaskElement(taskText);
        document.getElementById('todo-tasks').appendChild(task);
        newTaskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const task = document.createElement('div');
    task.className = 'task';
    task.textContent = taskText;
    task.draggable = true;

    task.ondragstart = function (e) {
        e.dataTransfer.setData('text/plain', taskText);
        e.dataTransfer.setData('parentId', task.parentNode.id);
    };

    return task;
}

function handleDrop(e) {
    e.preventDefault();

    const taskText = e.dataTransfer.getData('text/plain');
    const parentId = e.dataTransfer.getData('parentId');

    const newTask = createTaskElement(taskText);

    const parent = document.getElementById(parentId);
    const tasks = parent.getElementsByClassName('task');

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].textContent === taskText) {
            parent.removeChild(tasks[i]);
            break;
        }
    }

    e.target.appendChild(newTask);
}

function handleDragOver(e) {
    e.preventDefault();
}

function setupColumns() {
    const columns = ['todo-tasks', 'in-progress-tasks', 'done-tasks'];

    for (const columnId of columns) {
        const column = document.getElementById(columnId);
        column.ondrop = handleDrop;
        column.ondragover = handleDragOver;
    }
}

window.onload = setupColumns;

