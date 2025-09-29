const taskInput = document.getElementById("taskInput");
const btn = document.getElementById("addTask");
const list = document.getElementById("taskList");
const clear=document.getElementById("clear");

// Save all tasks into localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.querySelector("input[type=checkbox]").checked
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => add(t.text, t.completed));
}

function add(taskText, completed = false) {
  const ele = document.createElement("li");

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;
 

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";

    // Move task depending on completion
    if (checkbox.checked) {
      list.appendChild(ele);
    } else {
      list.insertBefore(ele, list.firstChild);
    }
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    list.removeChild(ele);
    saveTasks();
  });

  // Add everything to <li>
  ele.appendChild(span);
  ele.appendChild(checkbox);
  ele.appendChild(delBtn);

  // Insert new tasks at top
  list.insertBefore(ele, list.firstChild);
  saveTasks();
}

function handleAdd() {
  const text = taskInput.value.trim();
  if (text !== "") {
    add(text);
    taskInput.value = "";
  }
}

btn.addEventListener("click", handleAdd);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAdd();
  }
});

// Load saved tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

clear.addEventListener("click",()=>{
  list.innerHTML="";
  saveTasks();
});
