// renderer.js - Manages UI interactions in the Electron app

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const notifyBtn = document.getElementById('notify-btn');
  const themeToggle = document.getElementById('theme-toggle');

  // Load tasks from storage
  async function loadTasks() {
      const tasks = await window.electron.loadTasks();
      taskList.innerHTML = ''; // Clear existing list
      tasks.forEach(task => addTaskToUI(task));
  }

  // Add task to UI
  function addTaskToUI(task) {
      const li = document.createElement('li');
      li.textContent = task.name;
      li.classList.add('task-item');
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => deleteTask(task, li));

      const completeBtn = document.createElement('button');
      completeBtn.textContent = '✔';
      completeBtn.classList.add('complete-btn');
      completeBtn.addEventListener('click', () => toggleTaskCompletion(li));

      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
  }

  // Save task
  addTaskBtn.addEventListener('click', () => {
      const task = { name: taskInput.value };
      if (task.name.trim() === '') return;

      window.electron.saveTask(task);
      addTaskToUI(task);
      taskInput.value = ''; // Clear input
  });

  // Delete task
  function deleteTask(task, taskElement) {
      taskElement.remove();
      window.electron.deleteTask(task);
  }

  // Toggle task completion
  function toggleTaskCompletion(taskElement) {
      taskElement.classList.toggle('completed');
  }

  // Show notification
  notifyBtn.addEventListener('click', () => {
      window.electron.showNotification('Time to check your tasks!');
  });

  // Toggle theme
  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
  });

  // Load saved tasks on startup
  loadTasks();
});