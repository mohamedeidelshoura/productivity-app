const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('task-list');

let tasks = [];

// تحميل المهام من التخزين
async function loadTasks() {
  tasks = await window.electron.loadTasks();
  renderTasks();
}

// حفظ المهام إلى التخزين
function saveTasks() {
  window.electron.saveTasks(tasks);
}

// عرض المهام في القائمة
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  });
}

// إضافة مهمة جديدة
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  tasks.push(taskText);
  saveTasks();
  renderTasks();
  taskInput.value = '';
});

// تحميل المهام عند بدء التشغيل
loadTasks();
