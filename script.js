const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// تابع برای بارگذاری تسک‌ها از localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <button class="deleteButton">حذف</button>
        `;
        taskList.appendChild(li);
    });
}

// تابع برای ذخیره تسک‌ها در localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.querySelector(".taskCheckbox").checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// بارگذاری تسک‌ها موقع لود صفحه
loadTasks();

// وقتی دکمه "اضافه کن" کلیک می‌شه
addButton.addEventListener("click", function() {
    const taskText = taskInput.value;

    if (taskText.trim() === "") {
        alert("لطفاً یه تسک وارد کن!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="taskCheckbox">
        <span>${taskText}</span>
        <button class="deleteButton">حذف</button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks(); // ذخیره بعد از اضافه کردن
});

// مدیریت کلیک روی چک‌باکس و دکمه حذف
taskList.addEventListener("click", function(event) {
    if (event.target.className === "deleteButton") {
        const li = event.target.parentElement;
        taskList.removeChild(li);
        saveTasks(); // ذخیره بعد از حذف
    } else if (event.target.className === "taskCheckbox") {
        const span = event.target.nextElementSibling;
        if (event.target.checked) {
            span.classList.add("completed");
        } else {
            span.classList.remove("completed");
        }
        saveTasks(); // ذخیره بعد از تغییر وضعیت
    }
});