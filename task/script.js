let tasks = [];
let currentStatus = "Pending";

const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const prioritySelect = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const tabs = document.querySelectorAll(".tab");

// Add Task
addTaskBtn.addEventListener("click", () => {
  if (titleInput.value.trim() === "") return;

  const newTask = {
    id: Date.now(),
    title: titleInput.value,
    description: descInput.value,
    priority: prioritySelect.value,
    status: "Pending",
  };

  tasks.push(newTask);
  titleInput.value = "";
  descInput.value = "";

  renderTasks();
});

// Render Tasks
const renderTasks = () => {
  const filteredTasks = tasks.filter(
    (task) => task.status === currentStatus
  );

  taskList.innerHTML = filteredTasks
    .map(
      (task) => `
      <div class="task-card ${task.priority}">
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <small>Status: ${task.status}</small>
        </div>
        <div class="task-actions">
          ${
            task.status !== "Completed"
              ? `<button class="complete-btn" onclick="markCompleted(${task.id})">Complete</button>`
              : ""
          }
          <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      </div>
    `
    )
    .join("");
};

// Mark Completed
window.markCompleted = (id) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, status: "Completed" } : task
  );
  renderTasks();
};

// Delete Task
window.deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
};

// Tabs
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentStatus = tab.dataset.status;
    renderTasks();
  });
});
