import {
    registerUser, checkUser, checkUserForProjects, addTaskToCurrentUser,
    createTask, changeTaskStatus, changeCurrentUserData, changeUserData,
    displayUserTasksAndProjectsInfo, deleteItem, addSubtaskToExistedTask,
    setTaskPriority, addCommentToProject, removeCommentPrompt, viewAllUsers,
    createGroup, deleteGroup, displayAllGroups, addUserToGroup, removeCurrentUserFromGroup,
    createProject
} from './funcs.js'

export const choose_text = 'Что хотите сделать?\n' +
    '1. Добавить задание пользователя.\n' +
    '2. Изменить данные задач, подзадач или проектов.\n' +
    '3. Создать новый проект.\n' +
    '4. Изменить статус готовности задачи или подзадачи.\n' +
    '5. Вывести информацию о задачах или проектах.\n' +
    '6. Удалить проект, задачу или подзадачу.\n' +
    '7. Установить приоритет задачи или подзадачи.\n' +
    '8. Регистраци.\n' +
    '9. Добавить комментарий.\n' +
    '10. Удалить комментарий.\n' +
    '11. Добавить подзадачу к существующей задаче.\n' +
    '12. Вывести всех зарегистрированных пользователей.\n' +
    '13. Изменить данные пользователя.\n' +
    '14. Создать группу.\n' +
    '15. Удалить группу.\n' +
    '16. Вывести все группы.\n' +
    '17. Добавить пользователя в группу.\n' +
    '18. Удалить пользователя из группы.\n' +
    '111. Exit'
export let choose = "0"



const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('myModal');
const closeModal = document.getElementsByClassName('close')[0];
const submitButton = document.getElementById('submitValue');
const inputField = document.getElementById('inputValue');

openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
let variable

submitButton.addEventListener('click', () => {
    const value = inputField.value;

    variable = parseInt(value)
    mainMenu(value)
    inputField.value = '';
    modal.style.display = 'none';
});

export function mainMenu(value) {
    if (value == "111") {
        return;
    }
    switch (value) {
        case "1":
            addTaskToCurrentUser();
            break;
        case "2":
            changeCurrentUserData()
            break;
        case "3":
            createProject();
            break;
        case "4":
            changeTaskStatus();
            break;
        case "5":
            displayUserTasksAndProjectsInfo();
            break;
        case "6":
            deleteItem()
            break;
        case "7":
            setTaskPriority();
            break;
        case "8":
            registerUser();
            break;
        case "9":
            addCommentToProject();
            break;
        case "10":
            removeCommentPrompt();
            break;
        case "11":
            addSubtaskToExistedTask();
            break;
        case "12":
            viewAllUsers();
            break;
        case "13":
            changeUserData();
            break;
        case "14":
            createGroup();
            break;
        case "15":
            deleteGroup();
            break;
        case "16":
            displayAllGroups();
            break;
        case "17":
            addUserToGroup();
            break;
        case "18":
            removeCurrentUserFromGroup();
            break;
    }
}