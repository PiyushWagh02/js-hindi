const taskInput = document.getElementById("taskInput");
const btn = document.getElementById("addTask");
const list = document.getElementById("taskList");

function add(taskText) {
  const ele = document.createElement("li");

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";

    // 🔥 Move task to bottom if completed, back to top if unchecked
    if (checkbox.checked) {
      list.appendChild(ele); // move to bottom
    } else {
      list.insertBefore(ele, list.firstChild); // move to top
    }
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    list.removeChild(ele);
  });

  // Add everything to <li>
  ele.appendChild(span);
  ele.appendChild(checkbox);
  ele.appendChild(delBtn);

  list.insertBefore(ele, list.firstChild); // new tasks go to top
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
