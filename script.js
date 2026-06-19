const createTaskBtn = document.querySelector(".nav-create-task");
const formDiv = document.querySelector(".form");
const tasksDiv = document.querySelector(".tasks");
const taskStatus = document.querySelector(".task-status");
const form = document.querySelector("form");
const formBackBtn = document.querySelector("#form-back-btn");
const themeBtn = document.querySelector("#theme-btn");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

let taskList = [];
let taskIndex = null;

function taskListRender() {
  tasksDiv.innerHTML = "";
  taskList.forEach((element, index) => {
    tasksDiv.innerHTML += `<div class="task">
          <div class="task-status">${element.taskStatus}</div>
          <div class="task-category">${element.taskCategory}</div>
          <div class="task-desc">${element.taskDesc}</div>
          <div class="task-button">
            <button class="task-edit" onclick="updateTask(${index})">Edit</button>
            <button class="task-complete" onclick="completeTask(${index})">Complete</button>
            <button class="task-delete" onclick="deleteTask(${index})">Delete</button>
          </div>
        </div>`;
  });
}
taskListRender();

function updateTask(index) {
  formDiv.style.display = "flex";
  let task = taskList[index];
  taskIndex = index;

  form[0].value = task.taskDesc;
  form[1].value = task.taskCategory;
}

function completeTask(index) {
  const task = taskList[index];

  task.taskStatus = "completed";
  taskListRender();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  taskListRender();
}

createTaskBtn.addEventListener("click", () => {
  formDiv.style.display = "flex";
});

formBackBtn.addEventListener("click", () => {
  formDiv.style.display = "none";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDesc = event.target[0].value;
  const taskCategory = event.target[1].value;

  let obj = {
    id: taskList.length + 1,
    taskDesc,
    taskCategory,
    taskStatus: "pending",
  };

  if (taskIndex != null) {
    taskList[taskIndex] = obj;
    taskIndex = null;
  } else {
    taskList.push(obj);
  }

  taskListRender();
  form.reset();
  formDiv.style.display = "none";
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const darkMode = document.body.classList.contains("dark");
  localStorage.setItem("theme", darkMode ? "dark" : "light");
  themeBtn.textContent = darkMode ? "☀️" : "🌙";
});
