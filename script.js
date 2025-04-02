const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCategory = document.getElementById("taskCategory");

// تابع برای بارگذاری تسک‌ها از localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed" : ""}">${task.text} (${task.category})</span>
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
        const span = li.querySelector("span");
        const textWithCategory = span.textContent.match(/^(.*) \((.*)\)$/);
        const text = textWithCategory ? textWithCategory[1] : span.textContent;
        const category = textWithCategory ? textWithCategory[2] : "کار";
        const completed = li.querySelector(".taskCheckbox").checked;
        tasks.push({ text, category, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// بارگذاری تسک‌ها موقع لود صفحه
loadTasks();

// وقتی دکمه "اضافه کن" کلیک می‌شه
addButton.addEventListener("click", function() {
    const taskText = taskInput.value;
    const category = taskCategory.value;

    if (taskText.trim() === "") {
        alert("لطفاً یه تسک وارد کن!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="taskCheckbox">
        <span>${taskText} (${category})</span>
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
        const currentTextWithCategory = span.textContent.match(/^(.*) \((.*)\)$/);
        const currentText = currentTextWithCategory ? currentTextWithCategory[1] : span.textContent;
        const currentCategory = currentTextWithCategory ? currentTextWithCategory[2] : "کار";

        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox" ${li.querySelector(".taskCheckbox").checked ? "checked" : ""}>
            <input type="text" class="editInput" value="${currentText}">
            <select class="editCategory">
                <option value="کار" ${currentCategory === "کار" ? "selected" : ""}>کار</option>
                <option value="شخصی" ${currentCategory === "شخصی" ? "selected" : ""}>شخصی</option>
                <option value="فوری" ${currentCategory === "فوری" ? "selected" : ""}>فوری</option>
                <option value="تحصیل" ${currentCategory === "تحصیل" ? "selected" : ""}>تحصیل</option>
            </select>
            <button class="saveButton">ذخیره</button>
            <button class="deleteButton">حذف</button>
        `;
    } else if (event.target.className === "saveButton") {
        const editInput = li.querySelector(".editInput");
        const editCategory = li.querySelector(".editCategory");
        const newText = editInput.value;
        const newCategory = editCategory.value;

        if (newText.trim() === "") {
            alert("تسک نمی‌تونه خالی باشه!");
            return;
        }

        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox" ${li.querySelector(".taskCheckbox").checked ? "checked" : ""}>
            <span>${newText} (${newCategory})</span>
            <button class="editButton">ویرایش</button>
            <button class="deleteButton">حذف</button>
        `;
        if (li.querySelector(".taskCheckbox").checked) {
            li.querySelector("span").classList.add("completed");
        }
        saveTasks();
    }
});