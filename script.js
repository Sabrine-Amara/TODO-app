let input = document.getElementById("input-task");
const tasksContainer = document.querySelector(".tasks-container");
const itemsLeft = document.querySelector(".items-left");
const options = document.getElementsByClassName("options");
// const allTasks = document.querySelector(".options span:first-child");
// const activeTasks = document.querySelector(".options span:nth-child(2)");
// const tasksCompleted = document.querySelector(".options span:last-child");
let typing = document.querySelector(".typing");
let countAll = 0;
let leftItems = 0;
let completedTasks = 0;

console.log(tasksContainer);
input.addEventListener("focus", (e) => {
  typing.style.display = "block";
  input.attributes.placeholder.value = " ";
});
input.addEventListener("mouseout", (e) => {
  if (!input.value) {
    input.blur;
    typing.style.display = "none";
    input.attributes.placeholder.value = " Create a new todo...";
  }
});
input.addEventListener("change", (e) => {
  e.preventDefault();

  if (input.value) {
    tasksContainer.innerHTML += `
    <div class="task" data-completed="not yet">
      <div class="circle">
      
      </div>
      <p class="task-text">${e.target.value}</p>
      <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path fill="#494C6B" fill-rule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
      </svg>
    </div> 
`;
    input.value = "";
    countAll++;
    console.log("all tasks", countAll);
  }

  console.log(e.target.value);
});
tasksContainer.addEventListener("click", (e) => {
  if (e.target.className == "circle") {
    console.log(e.target);
    e.target.classList.add("linear-bg");
    e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;
    e.target.nextElementSibling.style.textDecoration = "line-through";
    e.target.nextElementSibling.style.color = "hsl(233, 11%, 84%)";
    completedTasks++;
    itemsLeft.firstChild.innerHTML = `${countAll - completedTasks}`;
    console.log("completed tasks", completedTasks);
    e.target.parentElement.setAttribute("data-completed", "done");
    console.log(e.target.parentElement.getAttribute("data-completed"));
  } else if (e.target.tagName == "svg") {
    e.target.parentElement.remove();
  } else {
    console.log("bye");
  }
});
options[0].addEventListener("click", (e) => {
  const arrOptions = Array.from(options[0].children);
  let tasksArr = Array.from(
    document.getElementsByClassName("tasks-container")[0].children
  );
  let statusArr = [];
  console.log("this is tasks array", tasksArr);
  console.log(arrOptions);
  for (let j = 0; j < arrOptions.length; j++) {
    if (arrOptions[j].classList.contains("active")) {
      arrOptions[j].classList.remove("active");
    }
  }
  console.log(e.target);
  e.target.classList.add("active");
  if (e.target.innerHTML == "Completed") {
    statusArr = tasksArr.filter(
      (option) => option.getAttribute("data-completed") == "done"
    );
  } else if (e.target.innerHTML == "Active") {
    statusArr = tasksArr.filter(
      (option) => option.getAttribute("data-completed") == "not yet"
    );
  }

  console.log("this is status Arr", statusArr);
  tasksContainer.append(statusArr[0]);
});
