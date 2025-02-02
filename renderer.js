// renderer.js
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("task-list");
  const themeToggle = document.getElementById("themeToggle");

  // Load saved theme
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-theme", currentTheme === "dark");
  themeToggle.textContent = currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Toggle theme with smooth transition
  themeToggle.addEventListener("click", () => {
    document.body.classList.add("theme-transition");
    document.body.classList.toggle("dark-theme");
    const newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

    // Remove transition class after the animation
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 300);
  });

  // Add task
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const taskCategory = document.getElementById("taskCategory").value;
    if (taskText) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${taskText} (${taskCategory})</span>
        <div class="task-actions">
          <button onclick="editTask(this)">✏️</button>
          <button onclick="deleteTask(this)">❌</button>
        </div>
      `;
      taskList.appendChild(li);
      taskInput.value = "";
    }
  });

  // Edit task
  window.editTask = (button) => {
    const li = button.closest("li");
    const taskText = li.querySelector("span").textContent.split(" (")[0];
    const newText = prompt("Edit your task:", taskText);
    if (newText) {
      li.querySelector("span").textContent = `${newText} (${taskCategory})`;
    }
  };

  // Delete task
  window.deleteTask = (button) => {
    const li = button.closest("li");
    li.remove();
  };
});

// Language toggle
const languageToggle = document.getElementById("languageToggle");
const currentLanguage = localStorage.getItem("language") || "en";

// Set initial language
document.body.setAttribute("dir", currentLanguage === "ar" ? "rtl" : "ltr");
languageToggle.textContent = currentLanguage === "ar" ? "🌐 English" : "🌐 العربية";

// Toggle language
languageToggle.addEventListener("click", () => {
  const newLanguage = currentLanguage === "ar" ? "en" : "ar";
  document.body.setAttribute("dir", newLanguage === "ar" ? "rtl" : "ltr");
  localStorage.setItem("language", newLanguage);
  languageToggle.textContent = newLanguage === "ar" ? "🌐 English" : "🌐 العربية";
  location.reload(); // Refresh to apply language changes
});

// Toast notifications
function showToast(message, duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

// Example usage
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    showToast("Task added successfully!");
  }
});