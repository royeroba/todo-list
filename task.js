// Get references to HTML elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const formButton = document.getElementById("send_button");
const list = document.getElementById("list");

// Retrieve existing tasks from localStorage
const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
const tasks = [...existingTasks];
let isEditing = false;
let taskEditing = null;

// Render the list of tasks
const renderTasks = () => {
  list.innerHTML = "";
  tasks.forEach((task) => {
    list.appendChild(createListItem(task));
  });
};

// Delete a task
const onDeleteTask = (taskId) => {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index > -1) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
};

// Create a list of task
const createListItem = (task) => {
  const li = document.createElement("li");

  li.innerHTML = `${task.task}<button class="editButton" onclick="onEditTask('${task.id}')">Edit</button><button onclick="onDeleteTask('${task.id}')">X</button>`;
  return li;
};

// Edit task
const onEditTask = (taskId) => {
  const foundTask = tasks.find((t) => t.id == taskId);

  if (foundTask) {
    isEditing = true;
    taskEditing = foundTask;
    input.value = foundTask.task;
    formButton.innerText = "Edit Task";
  }
};

// Save the edited task
const handleEditTask = () => {
  const newTaskValue = input.value.trim();
  if (newTaskValue) {
    const index = tasks.findIndex((t) => t.id === taskEditing.id);
    if (index > -1) {
      tasks[index] = {
        ...tasks[index],
        task: newTaskValue,
      };
      localStorage.setItem("tasks", JSON.stringify(tasks));
      input.value = "";
      isEditing = false;
      formButton.innerText = "Add Task";
      renderTasks();
    }
  }
};

// Add a new task
const addTask = (event) => {
  event.preventDefault();

  if (isEditing) {
    return handleEditTask();
  }

  const id = Math.random().toString(36).substr(2, 9);
  const obj = {
    id,
    task: event.target[0].value,
  };
  if (obj) {
    tasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
  }
};

// submit form
form.addEventListener("submit", addTask);
renderTasks();
