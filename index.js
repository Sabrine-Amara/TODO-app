let inputTask = document.getElementById("input-task");
let tasksContainer = document.querySelector(".tasks-container");
let typing = document.querySelector(".typing");
let countItemsContainer = document.querySelector(".items-left span");
let btnMode = document.getElementById("btn-mode");
let options = Array.from(
  document.getElementsByClassName("options")[0].children
);
let todoWrapper = document.querySelector(".todo-wrapper");
console.log(options);

let count = 0;
let tasksArr = [];
let mood = "all";
let id = 0;
let selected = null;

// Dark theme / light theme

function enableDarkMode() {
  btnMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
  document.body.classList.toggle("dark");
  localStorage.setItem("dark-mode", "enabled");
}
function disableDarkMode() {
  btnMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;
  document.body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
}
function switchMode(darkMode) {
  darkMode = localStorage.getItem("dark-mode");

  console.log(darkMode);
  if (darkMode === "enabled") {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

// Create data

let storeTasks = JSON.parse(localStorage.getItem("tasks"));

function generateID(array) {
  let maxId = array[0].id;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id > maxId) {
      maxId = array[i].id;
    }
  }
  return maxId + 1;
}

if (storeTasks.length >= 1) {
  tasksArr = storeTasks;
  count = tasksArr.length;
  countItems(count);
  tasksArr.map((task) => {
    renderTask(task);
  });
  id = generateID(storeTasks);
}

function addTask() {
  let newTask = {};
  if (inputTask.value) {
    newTask = {
      value: inputTask.value,
      completed: false,
      id: id,
    };
    id++;
    inputTask.value = "";
    typing.classList.replace("d-block", "hide");
    inputTask.attributes.placeholder.value = "Create a todo...";
    tasksArr.push(newTask);
    console.log(tasksArr);
    // renderTask(newTask);
    options[0].click();
    count++;
    countItems(count);
  } else {
    inputTask.focus();
    typing.classList.replace("hide", "d-block");
    inputTask.attributes.placeholder.value = " ";
  }
}

// Show data

function renderTask(newTask) {
  tasksContainer.innerHTML += `<div class="task" draggable="true" id="${
    newTask.id * 0.2
  }" >
  <button class="circle" id="${newTask.id}" onclick="completeTask(this,${
    newTask.id
  })" ><svg class="visible" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></button><p class="task-text">${
    newTask.value
  }</p>
  <button class="delete-btn" onclick="deleteTask(${
    newTask.id
  })"><svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" 
  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg></button></div>`;
  if (newTask.completed) {
    let circleBtn = document.getElementById(`${newTask.id}`);

    circleBtn.classList.add("linear-bg");

    circleBtn.nextElementSibling.classList.add("finished");
    circleBtn.firstElementChild.classList.remove("visible");
  }
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  dragtasks();
}
// update data

function completeTask(elementbtn, id) {
  let index = tasksArr.findIndex((object) => {
    return object.id === id;
  });
  console.log(elementbtn);
  elementbtn.classList.toggle("linear-bg");
  elementbtn.nextElementSibling.classList.toggle("finished");
  elementbtn.firstElementChild.classList.toggle("visible");
  tasksArr[index].completed = !tasksArr[index].completed;
  console.log("finished task", tasksArr, "index", index);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function countItems(count) {
  countItemsContainer.innerHTML = `${count}`;
}

// delete data

function deleteTask(id) {
  let index = tasksArr.findIndex((object) => {
    return object.id === id;
  });
  console.log("this is index before splice", index);

  tasksArr.splice(index, 1);
  count--;
  countItems(count);
  console.log("after delete", tasksArr);
  tasksContainer.innerHTML = "";
  tasksArr.map((task) => {
    renderTask(task);
  });
}
// search / filter data

function getMoodSearch(event) {
  options.map((option) => {
    option.classList.remove("active");
  });
  if (event.target.id == "all") {
    mood = "all";
    console.log(mood, event);
  } else if (event.target.id == "Active") {
    mood = "active";

    console.log(mood);
  } else if (event.target.id == "completed") {
    mood = "completed";

    console.log(mood);
  }
  event.target.classList.add("active");
  filterTasks(mood);
}

function filterTasks(mood) {
  let filtredTasks = [];

  switch (mood) {
    case "all":
      filtredTasks = tasksArr;
      console.log(mood);
      break;
    case "active":
      filtredTasks = tasksArr.filter((task) => !task.completed);
      console.log(mood, filtredTasks, tasksArr);
      break;
    case "completed":
      filtredTasks = tasksArr.filter((task) => task.completed === true);
      console.log(mood, filtredTasks);
      break;
    default:
      filtredTasks = tasksArr;
      console.log(mood);
      break;
  }
  tasksContainer.innerHTML = "";
  filtredTasks.map((task) => {
    renderTask(task);
  });
}
function clearAll() {
  tasksContainer.innerHTML = "";
  tasksArr = [];
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  count = 0;
  countItems(count);
}

// Drag and Drop Task

function dragtasks() {
  let listOfTaks = Array.from(tasksContainer.children);
  console.log(listOfTaks);

  listOfTaks.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("dragging");
      console.log(task);
    });
    task.addEventListener("dragend", () => {
  
      task.classList.remove("dragging");
      console.log(task);
    });
  });
  tasksContainer.addEventListener("dragover", (e) => {
    e.preventDefault();

    let afterElement = getAfterElementOffset(tasksContainer, e.clientY);
    let draggable = document.querySelector(".dragging");
    console.log("this is afterelement",afterElement);
    if (afterElement== null) {
      tasksContainer.appendChild(draggable);
    } else {
      tasksContainer.insertBefore(draggable, afterElement);
    }
   console.log( tasksContainer.children);
   console.log(tasksArr);
  });

  //  tasksContainer.addEventListener("dragleave",(params) => {
  //   tasksContainer.style.border="1px solid blue";
  //  })

  // tasksContainer.addEventListener("drop",(params) => {
  //   tasksContainer.prepend(selected);
  //  })

  //   })
  //
}

function getAfterElementOffset(tasksContainer, y) {
  let draggableElements = [
    ...tasksContainer.querySelectorAll(".task:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, task) => {

      let box = task.getBoundingClientRect();
      let offset = y - box.top - box.height / 2;

      console.log("##########this is offset", offset);
      console.log("#############this is closest ofset",closest.offset);
      if (offset < 0 && offset > closest.offset) {
        console.log("this is offset", offset);
        console.log("this is closest offset", closest.offset);
        return { offset: offset, element: task };
        
      } else {
        console.log("closest is ",closest);
        return closest;
      
      }
    },
    { offset: Number.NEGATIVE_INFINITY}
  ).element;
}
