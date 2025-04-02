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
            <button class="editButton">ویرایش</button>
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
        <button class="editButton">ویرایش</button>
        <button class="deleteButton">حذف</button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
});

// مدیریت کلیک روی چک‌باکس، حذف و ویرایش
taskList.addEventListener("click", function(event) {
    const li = event.target.parentElement;

    if (event.target.className === "deleteButton") {
        taskList.removeChild(li);
        saveTasks();
    } else if (event.target.className === "taskCheckbox") {
        const span = event.target.nextElementSibling;
        if (event.target.checked) {
            span.classList.add("completed");
        } else {
            span.classList.remove("completed");
        }
        saveTasks();
    } else if (event.target.className === "editButton") {
        const span = li.querySelector("span");
        const currentText = span.textContent;

        // جایگزین کردن span با input برای ویرایش
        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox" ${li.querySelector(".taskCheckbox").checked ? "checked" : ""}>
            <input type="text" class="editInput" value="${currentText}">
            <button class="saveButton">ذخیره</button>
            <button class="deleteButton">حذف</button>
        `;
    } else if (event.target.className === "saveButton") {
        const editInput = li.querySelector(".editInput");
        const newText = editInput.value;

        if (newText.trim() === "") {
            alert("تسک نمی‌تونه خالی باشه!");
            return;
        }

        // برگرداندن به حالت عادی با متن جدید
        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox" ${li.querySelector(".taskCheckbox").checked ? "checked" : ""}>
            <span>${newText}</span>
            <button class="editButton">ویرایش</button>
            <button class="deleteButton">حذف</button>
        `;
        if (li.querySelector(".taskCheckbox").checked) {
            li.querySelector("span").classList.add("completed");
        }
        saveTasks();
    }
});