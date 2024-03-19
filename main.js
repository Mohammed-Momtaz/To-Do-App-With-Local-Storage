let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

addTasksToPageFromLocalStorage();

let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
};

submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    };
};

tasksDiv.addEventListener("click", (element) => {
    if (element.target.classList.contains("del")) {
        deleteTask(element.target.parentElement.id);
        element.target.parentElement.remove();
    };
    if (element.target.classList.contains("task")) {
        toggleStatusTask(element.target.id);
        element.target.classList.toggle("done");
    }
});

function addTaskToArray(taskTitle) {
    const task = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
    };
    arrayOfTasks.push(task);
    addElementsToPage(arrayOfTasks);
    addTaskToLocalStorage(arrayOfTasks);
};

function addElementsToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement('div');
        div.classList.add('task');
        if (task.completed) {
            div.classList.add('done');
        };
        div.id = task.id;
        div.innerHTML = task.title;
        let span = document.createElement('span');
        span.className = "del";
        span.innerHTML = "Delete";
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
};

function addTaskToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};

function addTasksToPageFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        addElementsToPage(JSON.parse(data));
    };
};

function deleteTask(id) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
    addTaskToLocalStorage(arrayOfTasks);
};

function toggleStatusTask(id) {
    for (let i = 0; i < arrayOfTasks.length; i++ ) {
        if (arrayOfTasks[i].id == id) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        };
    };
    addTaskToLocalStorage(arrayOfTasks);
};