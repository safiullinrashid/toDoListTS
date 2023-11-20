// Получение всех необходимых элементов
const inputBox: HTMLInputElement = document.querySelector(".inputField input")!;
const addBtn: HTMLButtonElement = document.querySelector(".inputField button")!;
const todoList: HTMLElement = document.querySelector(".todoList")!;
const deleteAllBtn: HTMLButtonElement = document.querySelector(".footer button")!;

// Событие onkeyup
inputBox.onkeyup = () => {
    let userEnteredValue: string = inputBox.value;
    if (userEnteredValue.trim() !== "") {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
};

showTasks();

addBtn.onclick = () => {
    let userEnteredValue: string = inputBox.value;
    let getLocalStorageData: string | null = localStorage.getItem("New Todo");
    let listArray: string[] = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
    listArray.push(userEnteredValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
};

function showTasks(): void {
    let getLocalStorageData: string | null = localStorage.getItem("New Todo");
    let listArray: string[] = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];

    const pendingTasksNumb: HTMLElement = document.querySelector(".pendingTasks")!;
    pendingTasksNumb.textContent = listArray.length.toString();

    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }

    let newLiTag: string = "";
    listArray.forEach((element: string, index: number) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });

    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

// Функция для удаления задачи
function deleteTask(index: number): void {
    let getLocalStorageData: string | null = localStorage.getItem("New Todo");
    let listArray: string[] = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

// Очистка всех задач
deleteAllBtn.onclick = () => {
    let listArray: string[] = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}