// Получение всех необходимых элементов
var inputBox = document.querySelector(".inputField input");
var addBtn = document.querySelector(".inputField button");
var todoList = document.querySelector(".todoList");
var deleteAllBtn = document.querySelector(".footer button");
// Событие onkeyup
inputBox.onkeyup = function () {
    var userEnteredValue = inputBox.value;
    if (userEnteredValue.trim() !== "") {
        addBtn.classList.add("active");
    }
    else {
        addBtn.classList.remove("active");
    }
};
showTasks();
addBtn.onclick = function () {
    var userEnteredValue = inputBox.value;
    var getLocalStorageData = localStorage.getItem("New Todo");
    var listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
    listArray.push(userEnteredValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
};
function showTasks() {
    var getLocalStorageData = localStorage.getItem("New Todo");
    var listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
    var pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length.toString();
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    }
    else {
        deleteAllBtn.classList.remove("active");
    }
    var newLiTag = "";
    listArray.forEach(function (element, index) {
        newLiTag += "<li>".concat(element, "<span class=\"icon\" onclick=\"deleteTask(").concat(index, ")\"><i class=\"fas fa-trash\"></i></span></li>");
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}
// Функция для удаления задачи
function deleteTask(index) {
    var getLocalStorageData = localStorage.getItem("New Todo");
    var listArray = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}
// Очистка всех задач
deleteAllBtn.onclick = function () {
    var listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
};
//# sourceMappingURL=toDo.js.map