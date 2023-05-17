import {
    registerUser, checkUser, checkUserForProjects, addTaskToCurrentUser,
    createTask, changeTaskStatus, changeCurrentUserData,
    displayUserTasksAndProjectsInfo, deleteItem, addSubtaskToExistedTask,
    setTaskPriority, addCommentToProject, removeCommentPrompt
} from './funcs.js'

export const choose_text = 'What do u want to do?\n' +
    '1. Add task to choosed user.\n' +
    '2. Change user data.\n' +
    '3. Create new project.\n' +
    '4. Change task or subtask status.\n' +
    '5. Display users tasks anf projects info.\n' +
    '6. Delete project, task or subtask.\n' +
    '7. Set tasks or subtasks priority.\n' +
    '8. Sign in.\n' +
    '9. Add comment to project.\n' +
    '10. Delete comment.\n' +
    '11. Add subtask to existed task\n' +
    'exit. Exit'
export let choose = "0"



export function mainMenu() {
    choose = prompt(choose_text)
    if (choose == "111") {
        return;
    }
    switch (choose) {
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
    }
    mainMenu()
}