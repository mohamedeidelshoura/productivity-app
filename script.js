// Load user preferences from local storage
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    if (localStorage.getItem("language") === "ar") {
        toggleLanguage();
    }
});

// Dark Mode Toggle
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem("dark-mode", document.body.classList.contains('dark-mode') ? "enabled" : "disabled");
});

// Language Toggle
document.getElementById('toggle-language').addEventListener('click', toggleLanguage);

function toggleLanguage() {
    let isArabic = document.documentElement.lang === "en";
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.getElementById('toggle-language').textContent = isArabic ? "English" : "العربية";
    localStorage.setItem("language", isArabic ? "ar" : "en");
}

// Sidebar Search
document.getElementById('search-bar').addEventListener("input", function () {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll("#menu-list li");
    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
});

// Edit Modal
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'block';
    });
});
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
});
// Dark Mode Toggle
const themeToggle = document.getElementById('toggle-theme');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Language Toggle
const languageToggle = document.getElementById('toggle-language');
let isArabic = false;
languageToggle.addEventListener('click', () => {
    isArabic = !isArabic;
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    languageToggle.textContent = isArabic ? 'English' : 'العربية';

    // Change text dynamically
    const elements = document.querySelectorAll('.card h3');
    const translations = {
        "Task Management": "إدارة المهام",
        "Habit Tracking": "تتبع العادات",
        "Time Planning": "تخطيط الوقت",
        "Recurring Tasks": "المهام المتكررة",
        "Reminders": "التذكيرات",
        "Google Calendar": "تقويم Google",
        "Notion & Trello": "Notion و Trello",
        "Group Collaboration": "التعاون الجماعي"
    };

    elements.forEach(el => {
        el.textContent = isArabic ? translations[el.textContent] : Object.keys(translations).find(key => translations[key] === el.textContent);
    });
});
