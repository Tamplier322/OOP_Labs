import { Task } from './classes.js'
import { Project } from './classes.js'
import { User } from './classes.js'
import { Subtask } from './classes.js'
import { users } from './classes.js'
import { mainMenu } from './main-menu.js'
import { Priority } from './classes.js'
import { Comment } from './classes.js'

//Функция поверки на null
export function checkNull(value) {
    if (value === null || value === "") {
        console.log("Неверный ввод.");
        mainMenu();
    }
}


// Функция регистрации пользователя
export function registerUser() {
    const name = prompt("Введите имя пользователя:");
    checkNull(name)
    const user = new User(name);
    users.push(user);
    console.log(`Пользователь ${name} успешно зарегистрирован!`);

}


// Функция проверки существования пользователя при регистрации
export function checkUser() {
    const name = prompt("Введите имя пользователя:");
    checkNull(name)
    let user = users.find((user) => user.name === name);

    if (user) {
        console.log(`Пользователь ${name} уже зарегистрирован!`);
        return user;
    } else {
        user = new User(name);
        users.push(user);
        console.log(`Пользователь ${name} успешно зарегистрирован!`);
        return user;
    }
}


// Функция проверки существования пользователя при добавлении проектов и задач
export function checkUserForProjects() {
    const name = prompt("Введите имя пользователя:");
    checkNull(name)
    let user = users.find((user) => user.name === name);
    if (user) {
        return user;
    } else {
        console.log(`Такого пользователя не существует`);
        mainMenu();
    }
}


// Функция добавления задачи к выбранному пользователю
export function addTaskToCurrentUser() {
    const currentUser = checkUser();

    console.log(`Задачи пользователя ${currentUser.name}:`);
    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        if (project.tasks.length === 0) {
            console.log("  Нет задач");
        } else {
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: ${task.title}`);
                console.log(`  Приоритет: ${task.priority}`);
            });
        }
    });
    let project;
    if (currentUser.projects.length > 0) {
        const projectIndex = prompt("Введите индекс проекта пользователя (от 0 до " + (currentUser.projects.length - 1) + "):");
        checkNull(projectIndex);
        project = currentUser.projects[projectIndex];
        createTask(currentUser, project);
    } else {
        const projectName = prompt("Введите название проекта:");
        project = new Project(projectName);
        currentUser.projects.push(project);
        console.log(`Проект "${projectName}" успешно создан для пользователя "${currentUser.name}"!`);
        createTask(currentUser, project);
    }

}


// Функция создания задачи
export function createTask(currentUser, project) {
    const title = prompt("Введите название задачи:");
    checkNull(title);
    const description = prompt("Введите описание задачи:");
    checkNull(description);
    const deadline = prompt("Введите крайний срок выполнения задачи:");
    checkNull(deadline);
    const typeChoice = prompt("Выберите тип задачи:\n 1. Встреча\n 2. Событие\n 3. Работа\n 4. Учеба\n 5. Вечиринка\n 6. Торжественное мероприятие\n")
    checkNull(typeChoice);
    const priorityChoice = prompt("Выберите приоритет задачи:\n 1. Важная\n 2. Срочная\n 3. Несрочная\n 4. Неважная")
    checkNull(priorityChoice);
    let priority;
    let type;
    switch (priorityChoice) {
        case "1":
            priority = "Важная";
            break;
        case "2":
            priority = "Срочная";
            break;
        case "3":
            priority = "Несрочная";
            break;
        case "4":
            priority = "Неважная";
            break;
        default:
            console.log("Неверный выбор приоритета!");
            return;
    }

    switch (typeChoice) {
        case "1":
            type = "Встреча";
            break;
        case "2":
            type = "Событие";
            break;
        case "3":
            type = "Работа";
            break;
        case "4":
            type = "Учеба";
            break;
        case "5":
            type = "Вечиринка";
            break;
        case "6":
            type = "Торжественное мероприятие";
            break;
        default:
            console.log("Неверный выбор приоритета!");
            return;
    }
    const task = new Task(title, description, deadline, priority, type);
    task.addSubtasks();
    project.addTask(task);
    console.log(`Задача "${title}" успешно добавлена в проект "${project.name}" пользователя "${currentUser.name}"!`);
}


// Функция добавления комментария
export function addCommentToProject() {
    const currentUser = checkUserForProjects();

    if (currentUser.projects.length === 0) {
        console.log("У текущего пользователя нет проектов.");
        return;
    }

    console.log(`Задачи пользователя ${currentUser.name}:`);
    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        if (project.tasks.length === 0) {
            console.log("  Нет задач");
        } else {
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: ${task.title}`);
                console.log(`  Приоритет: ${task.priority}`)
                if (task.subtasks.length > 0) {
                    task.subtasks.forEach((subtask, subtaskIndex) => {
                        console.log(`    Подзадача ${subtaskIndex}: ${subtask.title}`);
                    });
                }
            });
        }
    });

    const choice = prompt("Выберите, к чему вы хотите добавить комментарий:\n1. Проект\n2. Задача\n3. Подзадача");
    checkNull(choice);

    switch (choice) {
        case "1":
            addCommentToProjectPrompt(currentUser.projects, currentUser);
            break;
        case "2":
            addCommentToTaskPrompt(currentUser.projects, currentUser);
            break;
        case "3":
            addCommentToSubtaskPrompt(currentUser.projects, currentUser);
            break;
        default:
            console.log("Неверный выбор!");
            break;
    }
}

// Функция добавления комментария к проекту
function addCommentToProjectPrompt(projects, currentUser) {
    const projectIndex = prompt("Введите индекс проекта (от 0 до " + (projects.length - 1) + "):");
    checkNull(projectIndex);
    const projectIndexNum = parseInt(projectIndex)
    if (projectIndexNum > projects.length - 1 || projectIndexNum < 0) {
        console.log("Неверный ввод")
    }
    else {
        const project = projects[projectIndexNum];
        const commentText = prompt("Введите комментарий к проекту:");
        checkNull(commentText);
        if (commentText) {
            const comment = new Comment(currentUser.name, commentText, new Date());
            project.addComment(comment);
            console.log(`Комментарий успешно добавлен к проекту "${project.name}".`);
        } else {
            console.log("Вы не ввели комментарий.");
        }
    }
}

// Функция добавления комментария к задаче
function addCommentToTaskPrompt(projects, currentUser) {
    const projectIndex = prompt("Введите индекс проекта (от 0 до " + (projects.length - 1) + "):");
    checkNull(projectIndex);
    const projectIndexNum = parseInt(projectIndex)
    if (projectIndexNum > projects.length - 1 || projectIndexNum < 0) {
        console.log("Неверный ввод")
    }
    else {
        const project = projects[projectIndexNum];
        if (project.tasks.length === 0) {
            console.log("В выбранном проекте нет задач.");
            return;
        }

        const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
        checkNull(taskIndex);
        const taskIndexNum = parseInt(taskIndex)
        if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const task = project.tasks[taskIndexNum];
            const commentText = prompt("Введите комментарий к задаче:");
            checkNull(commentText);
            if (commentText) {
                const comment = new Comment(currentUser.name, commentText, new Date());
                task.addComment(comment);
                console.log(`Комментарий успешно добавлен к задаче "${task.title}".`);
            } else {
                console.log("Вы не ввели комментарий.");
            }
        }
    }
}

// Функция добавления комментария к подзадаче
function addCommentToSubtaskPrompt(projects, currentUser) {
    const projectIndex = prompt("Введите индекс проекта (от 0 до " + (projects.length - 1) + "):");
    checkNull(projectIndex);
    const projectIndexNum = parseInt(projectIndex)
    if (projectIndexNum > projects.length - 1 || projectIndexNum < 0) {
        console.log("Неверный ввод")
    }
    else {
        const project = projects[projectIndexNum];
        if (project.tasks.length === 0) {
            console.log("В выбранном проекте нет задач.");
            return;
        }

        const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
        checkNull(taskIndex);
        const taskIndexNum = parseInt(taskIndex)
        if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const task = project.tasks[taskIndexNum];
            if (task.subtasks.length === 0) {
                console.log("В выбранной задаче нет подзадач.");
                return;
            }

            const subtaskIndex = prompt("Введите индекс подзадачи (от 0 до " + (task.subtasks.length - 1) + "):");
            checkNull(subtaskIndex);
            const subtaskIndexNum = parseInt(subtaskIndex)
            if (subtaskIndexNum > task.subtasks.length - 1 || subtaskIndexNum < 0) {
                console.log("Неверный ввод")
            }
            else {
                const subtask = task.subtasks[subtaskIndexNum];
                const commentText = prompt("Введите комментарий к подзадаче:");
                checkNull(commentText);
                if (commentText) {
                    const comment = new Comment(currentUser.name, commentText, new Date());
                    subtask.addComment(comment);
                    console.log(`Комментарий успешно добавлен к подзадаче "${subtask.title}".`);
                } else {
                    console.log("Вы не ввели комментарий.");
                }
            }
        }
    }
}


// Функция удаления комментария
export function removeProjectComment() {
    const currentUser = checkUserForProjects();

    console.log(`Задачи пользователя ${currentUser.name}:`);
    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        console.log("Комментарии к проекту:");
        if (project.comments.length === 0) {
            console.log("  Нет комментариев");
        } else {
            project.comments.forEach((comment, commentIndex) => {
                console.log(`  Комментарий ${commentIndex}: ${comment}`);
            });
        }
    });

    const projectIndex = prompt(
        "Введите индекс проекта пользователя (от 0 до " +
        (currentUser.projects.length - 1) +
        "):"
    );
    checkNull(projectIndex);
    const project = currentUser.projects[projectIndex];
    if (!project) {
        console.log("Неверный индекс проекта");
        return;
    }

    const commentIndex = prompt(
        "Введите индекс комментария (от 0 до " +
        (project.comments.length - 1) +
        "):"
    );
    checkNull(commentIndex);
    const commentIndexNum = parseInt(commentIndex);
    if (isNaN(commentIndexNum) || commentIndexNum < 0 || commentIndexNum >= project.comments.length) {
        console.log("Неверный индекс комментария");
        return;
    }

    project.removeComment(commentIndexNum);
    console.log("Комментарий успешно удален");
}


// Функция изменения статуса задачи
export function changeTaskStatus() {
    const currentUser = checkUserForProjects();

    if (currentUser.projects.length === 0) {
        console.log("У текущего пользователя нет проектов.");
        mainMenu();
    }

    console.log(`Задачи пользователя ${currentUser.name}:`);
    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        if (project.tasks.length === 0) {
            console.log("  Нет задач");
        } else {
            project.tasks.forEach((task, taskIndex) => {
                const status = task.completed ? '[Завершено]' : '[Ожидает выполнения]';
                console.log(`  Задача ${taskIndex}: ${task.title}, ${status}`);
                if (task.subtasks.length > 0) {
                    task.subtasks.forEach((subtask, subtaskIndex) => {
                        const subtaskStatus = subtask.completed ? '[Завершено]' : '[Ожидает выполнения]';
                        console.log(`    Подзадача ${subtaskIndex}: ${subtask.title}, ${subtaskStatus}`);
                    });
                }
            });
        }
    });

    const projectIndex = prompt("Введите индекс проекта (от 0 до " + (currentUser.projects.length - 1) + "):");
    checkNull(projectIndex);
    const projectIndexNum = parseInt(projectIndex)
    if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
        console.log("Неверный ввод")
    }
    else {
        const project = currentUser.projects[projectIndex];

        if (project.tasks.length === 0) {
            console.log("В выбранном проекте нет задач.");
            mainMenu();
        }

        const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
        checkNull(taskIndex);
        checkNull(taskIndex);
        const taskIndexNum = parseInt(taskIndex)
        if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const task = project.tasks[taskIndex];

            const changeTaskStatusChoice = confirm("Хотите изменить статус готовности задачи?");
            if (changeTaskStatusChoice && project.tasks.length > 0) {
                const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
                checkNull(taskIndex);
                const taskIndexNum = parseInt(taskIndex);
                if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
                    console.log("Неверный ввод");
                } else {
                    if (task.completed == false) {
                        const isCompleted = confirm("Задача выполнена? Нажмите 'ОК' для выполненной задачи или 'Отмена' для ожидающей выполнения задачи.");
                        task.completed = isCompleted;
                        const status = isCompleted ? "выполнена" : "ожидает выполнения";

                        console.log(`Состояние задачи "${task.title}" изменено на "${status}"!`);
                    }
                    else {
                        const isCompleted = confirm("Задача не выполнена? Нажмите 'ОК' для изменения статуса задачи на 'ожидает выполнения' или 'Отмена' для отмены изменения статуса.");
                        task.completed = !isCompleted;
                        const status = isCompleted ? "ожидает выполнения" : "выполнена";

                        console.log(`Состояние задачи "${task.title}" изменено на "${status}"!`);
                    }
                }
            }

            const changeSubtaskStatusChoice = confirm("Хотите изменить статус готовности подзадачи?");
            if (changeSubtaskStatusChoice && task.subtasks.length > 0) {
                const subtaskIndex = prompt("Введите индекс подзадачи (от 0 до " + (task.subtasks.length - 1) + "):");
                checkNull(subtaskIndex);
                const subtaskIndexNum = parseInt(subtaskIndex);
                if (subtaskIndexNum > task.subtasks.length - 1 || subtaskIndexNum < 0) {
                    console.log("Неверный ввод");
                } else {
                    const subtask = task.subtasks[subtaskIndex];

                    if (subtask.completed == false) {
                        const isCompleted = confirm("Подзадача выполнена? Нажмите 'ОК' для выполненной подзадачи или 'Отмена' для ожидающей выполнения подзадачи.");
                        subtask.completed = isCompleted;
                        const status = isCompleted ? "выполнена" : "ожидает выполнения";

                        console.log(`Состояние подзадачи "${subtask.title}" изменено на "${status}"!`);
                    } else {
                        const isCompleted = confirm("Подзадача не выполнена? Нажмите 'ОК' для изменения статуса подзадачи на 'ожидает выполнения' или 'Отмена' для отмены изменения статуса.");
                        subtask.completed = !isCompleted;
                        const status = isCompleted ? "ожидает выполнения" : "выполнена";

                        console.log(`Состояние подзадачи "${subtask.title}" изменено на "${status}"!`);
                    }
                }
            }


        }
    }


}


// Функция вывод на экран информации о задачах и проектах пользователя
export function displayUserTasksAndProjectsInfo() {
    const currentUser = checkUserForProjects();

    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        if (project.tasks.length === 0) {
            console.log("  Нет задач");
        } else {
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: ${task.title}`);
            });
        }
    });

    const choice = prompt("Выберите действие:\n1. Просмотреть задачу\n2. Просмотреть проект");
    checkNull(choice);
    if (choice === "1") {
        const projectIndex = prompt("Введите индекс проекта пользователя (от 0 до " + (currentUser.projects.length - 1) + "):");
        checkNull(projectIndex);
        const projectIndexNum = parseInt(projectIndex)
        if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
            console.log("Неверный ввод")
            mainMenu();
        }
        else {
            const project = currentUser.projects[projectIndex];
            const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
            checkNull(taskIndex);
            const taskIndexNum = parseInt(taskIndex)
            if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
                console.log("Неверный ввод")

            }
            else {
                const task = project.tasks[taskIndex];
                console.log(`Описание задачи "${task.title}": ${task.description}`);
                console.log(`Тип задачи: ${task.type}`)
                console.log(`Время выполнения: ${task.deadline}`);
                console.log(`Приоритет: ${task.priority}`)
                console.log(`Комментарии к задаче "${task.title}":`);
                if (project.comments.length === 0) {
                    console.log("  Нет комментариев");
                } else {
                    project.comments.forEach((comment, commentIndex) => {
                        console.log(`   Комментарий ${commentIndex}: ${comment.text} (оставил - ${comment.author}, дата - ${comment.dateAdded})`);
                    });
                }
                const status = task.completed ? 'Завершено' : 'Ожидает выполнения';
                console.log(`Статус: ${status}`)
                if (task.subtasks.length === 0) {
                    console.log("Нет подзадач");
                } else {
                    task.subtasks.forEach((subtask, subtaskIndex) => {
                        console.log(`Подзадача ${subtaskIndex}: ${subtask.title}`);
                        console.log(`   Дата: ${subtask.dueDate}`);
                        console.log(`   Описание: ${subtask.description}`);
                        console.log(`   Тип подзадачи: ${subtask.type}`)
                        console.log(`   Комментарии к подзадаче "${subtask.title}":`);
                        if (project.comments.length === 0) {
                            console.log("   Нет комментариев");
                        } else {
                            project.comments.forEach((comment, commentIndex) => {
                                console.log(`      Комментарий ${commentIndex}: ${comment.text} (оставил - ${comment.author}, дата - ${comment.dateAdded})`);
                            });
                        }
                        console.log(`   Готовность: ${subtask.completed ? 'Завершено' : 'Ожидает выполнения'}`);
                    });
                }
            }
        }
    } else if (choice === "2") {
        const projectIndex = prompt("Введите индекс проекта пользователя (от 0 до " + (currentUser.projects.length - 1) + "):");
        checkNull(projectIndex);
        const projectIndexNum = parseInt(projectIndex)
        if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
            console.log("Неверный ввод")
            mainMenu();
        }
        else {
            const project = currentUser.projects[projectIndex];
            console.log(`  Комментарии к проекту: ${project.comment}`);
            if (project.comments.length === 0) {
                console.log("  Нет комментариев");
            } else {
                project.comments.forEach((comment, commentIndex) => {
                    console.log(`   Комментарий ${commentIndex}: ${comment.text} (оставил - ${comment.author}, дата - ${comment.dateAdded})`);
                });
            }
            if (project.tasks.length === 0) {
                console.log("  Нет задач");
            } else {
                console.log(`  Задачи проекта "${project.name}":`);
                project.tasks.forEach((task, taskIndex) => {
                    console.log(`    Задача ${taskIndex}: ${task.title}`);
                });
            }
        }
    } else {
        console.log("Неверный выбор!");
    }
}


// Функция изменения данных проектов и задач
export function changeCurrentUserData() {
    const currentUser = checkUserForProjects();

    const choice = prompt("Выберите, что вы хотите изменить:\n1. Проекты\n2. Задачи\n3. Подзадача");
    checkNull(choice);

    if (choice === "1") {
        console.log(`Проекты пользователя ${currentUser.name}:`);
        currentUser.projects.forEach((project, projectIndex) => {
            console.log(`Проект ${projectIndex}: ${project.name}, comment - ${project.comment}`);
            if (project.tasks.length === 0) {
                console.log("  Нет задач");
            } else {
                project.tasks.forEach((task, taskIndex) => {
                    console.log(`  Задача ${taskIndex}: ${task.title}`);
                    console.log(`  Приоритет: ${task.priority}`)
                });
            }
        });
        const projectIndex = prompt("Введите индекс проекта, который вы хотите изменить:");
        checkNull(projectIndex);
        const selectedProject = currentUser.projects[projectIndex];
        if (selectedProject) {
            const newComment = prompt("Введите новый комментарий к проекту:");
            checkNull(newComment);
            selectedProject.comment = newComment;
            console.log(`Комментарий проекта "${selectedProject.name}" успешно изменен.`);
        } else {
            console.log("Неверный индекс проекта.");
        }
    } else if (choice === "2") {
        console.log("Задачи пользователя:");
        currentUser.projects.forEach((project, projectIndex) => {
            console.log(`Проект ${projectIndex}: ${project.name}`);
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: Имя - ${task.title}`);
                console.log(`  Описание задачи: ${task.description}`);
                console.log(`  Тип задачи: ${task.type}`)
                console.log(`  Время выполнения: ${task.deadline}`);
                console.log(`  Приоритет: ${task.priority}`)
                const status = task.completed ? 'Завершено' : 'Ожидает выполнения';
                console.log(`  Статус: ${status}`)
                if (task.subtasks.length === 0) {
                    console.log("Нет подзадач");
                } else {
                    task.subtasks.forEach((subtask, subtaskIndex) => {
                        console.log(`    Подзадача ${subtaskIndex}: ${subtask.title}`);
                    });
                }
            });
        });

        const projectIndex = prompt("Введите индекс проекта:");
        checkNull(projectIndex);
        const selectedProject = currentUser.projects[projectIndex];

        if (selectedProject) {
            const taskIndex = prompt("Введите индекс задачи, которую вы хотите изменить:");
            checkNull(taskIndex);
            const selectedTask = selectedProject.tasks[taskIndex];

            if (selectedTask) {
                const newTitleChoise = prompt("Хотите введите новое имя задачи?(y/n)");
                checkNull(newTitleChoise);
                if (newTitleChoise === "y") {
                    const newTitle = prompt("Введите новое имя задачи:")
                    checkNull(newTitle);
                    selectedTask.title = newTitle;
                }
                const newDescriptionChoise = prompt("Хотите введите новое описание задачи?(y/n)");
                checkNull(newDeadlineChoise);
                if (newDescriptionChoise === "y") {
                    const newDescription = prompt("Введите новое описание задачи:")
                    checkNull(newDescription);
                    selectedTask.description = newDescription;
                }
                const newDeadlineChoise = prompt("Хотите ввести новую дату выполнения задачи?(y/n):");
                checkNull(newDeadlineChoise);
                if (newDeadlineChoise === "y") {
                    const newDeadline = prompt("Введите новый дедлайн задачи:")
                    checkNull(newDeadline);
                    selectedTask.deadline = newDeadline;
                }
                const newPriorityChoise = prompt("Хотите ввести новый приоритет задачи?(y/n)");
                checkNull(newPriorityChoise);
                if (newPriorityChoise === "y") {
                    const priorityChoice = prompt("Введите новый приоритет задачи:\n 1. Важная\n 2. Срочная\n 3. Несрочная\n 4.Неважная")
                    checkNull(priorityChoice);
                    let priority;
                    switch (priorityChoice) {
                        case "1":
                            priority = "Важная";
                            break;
                        case "2":
                            priority = "Срочная";
                            break;
                        case "3":
                            priority = "Несрочная";
                            break;
                        case "4":
                            priority = "Неважная";
                            break;
                        default:
                            console.log("Неверный выбор приоритета!");
                            return;
                    }
                    selectedTask.priority = priority;
                }
                const newTypeChoise = prompt("Хотите ввести новый тип задачи?(y/n)");
                checkNull(newTypeChoise);
                if (newTypeChoise === "y") {
                    const typeChoice = prompt("Выберите тип задачи:\n 1. Встреча\n 2. Событие\n 3. Работа\n 4. Учеба\n 5. Вечиринка\n 6. Торжественное мероприятие\n")
                    checkNull(typeChoice);
                    let type;
                    switch (typeChoice) {
                        case "1":
                            type = "Встреча";
                            break;
                        case "2":
                            type = "Событие";
                            break;
                        case "3":
                            type = "Работа";
                            break;
                        case "4":
                            type = "Учеба";
                            break;
                        case "5":
                            type = "Вечиринка";
                            break;
                        case "6":
                            type = "Торжественное мероприятие";
                            break;
                        default:
                            console.log("Неверный выбор приоритета!");
                            return;
                    }
                    selectedTask.type = type;
                }
                console.log("Задача успешно изменена.");
            } else {
                console.log("Неверный индекс задачи.");
            }
        } else {
            console.log("Неверный индекс проекта.");
        }
    }
    else if (choice === "3") {
        console.log("Задачи пользователя:");
        currentUser.projects.forEach((project, projectIndex) => {
            console.log(`Проект ${projectIndex}: ${project.name}`);
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: Имя - ${task.title} Описание - ${task.description}`);
                task.subtasks.forEach((subtask, subtaskIndex) => {
                    console.log(`     Подзадача ${subtaskIndex}: ${subtask.title}`);
                    console.log(`       Дата: ${subtask.dueDate}`);
                    console.log(`       Описание: ${subtask.description}`);
                    console.log(`       Тип подзадачи: ${subtask.type}`)
                    console.log(`       Готовность: ${subtask.completed ? 'Завершено' : 'Ожидает выполнения'}`);
                });
            });
        });
        const projectIndex = prompt("Введите индекс проекта:");
        checkNull(projectIndex);
        const selectedProject = currentUser.projects[projectIndex];
        if (selectedProject) {
            const taskIndex = prompt("Введите индекс задачи, которую вы хотите изменить:");
            checkNull(taskIndex);
            const selectedTask = selectedProject.tasks[taskIndex];
            if (selectedTask) {
                const subtaskIndex = prompt("Введите индекс подзадачи, которую вы хотите изменить:");
                checkNull(subtaskIndex);
                const selectedSubtask = selectedTask.subtasks[subtaskIndex];
                if (selectedSubtask) {
                    const newTitleChoise = prompt("Хотите введите новое имя подзадачи?(y/n)");
                    checkNull(newTitleChoise);
                    if (newTitleChoise === "y") {
                        const newTitle = prompt("Введите новое имя подзадачи:")
                        checkNull(newTitle);
                        selectedSubtask.title = newTitle;
                    }
                    const newDescriptionChoise = prompt("Хотите введите новое описание подзадачи?(y/n)");
                    checkNull(newDeadlineChoise);
                    if (newDescriptionChoise === "y") {
                        const newDescription = prompt("Введите новое описание подзадачи:")
                        checkNull(newDescription);
                        selectedSubtask.description = newDescription;
                    }
                    const newDeadlineChoise = prompt("Хотите ввести новую дату выполнения подзадачи?(y/n):");
                    checkNull(newDeadlineChoise);
                    if (newDeadlineChoise === "y") {
                        const newDeadline = prompt("Введите новый дедлайн подзадачи:")
                        checkNull(newDeadline);
                        selectedSubtask.dueDate = newDeadline;
                    }
                    const newTypeChoise = prompt("Хотите ввести новый тип подзадачи?(y/n)");
                    checkNull(newTypeChoise);
                    if (newTypeChoise === "y") {
                        const typeChoice = prompt("Выберите тип подзадачи:\n 1. Встреча\n 2. Событие\n 3. Работа\n 4. Учеба\n 5. Вечиринка\n 6. Торжественное мероприятие\n")
                        checkNull(typeChoice);
                        let type;
                        switch (typeChoice) {
                            case "1":
                                type = "Встреча";
                                break;
                            case "2":
                                type = "Событие";
                                break;
                            case "3":
                                type = "Работа";
                                break;
                            case "4":
                                type = "Учеба";
                                break;
                            case "5":
                                type = "Вечиринка";
                                break;
                            case "6":
                                type = "Торжественное мероприятие";
                                break;
                            default:
                                console.log("Неверный выбор приоритета!");
                                return;
                        }
                        selectedSubtask.type = type;
                    }
                    console.log("Подзадача успешно изменена.");
                } else {
                    console.log("Неверный индекс задачи.");
                }
            }
        }
        else {
            console.log("Неверный выбор!");
        }
    }
}


// Функция удаления проекта или задачи
export function deleteItem() {
    const currentUser = checkUserForProjects();

    if (currentUser.projects.length === 0) {
        console.log("У текущего пользователя нет проектов.");
        mainMenu();
    }

    console.log(`Задачи пользователя ${currentUser.name}:`);
    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        if (project.tasks.length === 0) {
            console.log("  Нет задач");
        } else {
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: ${task.title}`);
                console.log(`  Приоритет: ${task.priority}`);
                if (task.subtasks.length > 0) {
                    console.log("    Подзадачи:");
                    task.subtasks.forEach((subtask, subtaskIndex) => {
                        console.log(`    Подзадача ${subtaskIndex}: ${subtask.title}`);
                    });
                } else {
                    console.log("    Нет подзадач");
                }
            });
        }
    });

    const choice = prompt("Что вы хотите удалить?\n1. Проект\n2. Задачу\n3. Подзадачу");
    checkNull(choice);

    if (choice === "1") {
        const projectIndex = prompt("Введите индекс проекта (от 0 до " + (currentUser.projects.length - 1) + "):");
        checkNull(projectIndex);
        const projectIndexNum = parseInt(projectIndex)
        if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const project = currentUser.projects[projectIndex];
            currentUser.projects.splice(projectIndex, 1);
            console.log(`Проект "${project.name}" удален.`);
        }
    } else if (choice === "2") {
        const projectIndex = prompt("Введите индекс проекта (от 0 до " + (currentUser.projects.length - 1) + "):");
        checkNull(projectIndex);
        const projectIndexNum = parseInt(projectIndex)
        if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const project = currentUser.projects[projectIndex];

            if (project.tasks.length === 0) {
                console.log("В выбранном проекте нет задач.");
                mainMenu();
            }

            const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
            checkNull(taskIndex);
            const taskIndexNum = parseInt(projectIndex)
            if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
                console.log("Неверный ввод")
            }
            else {
                const task = project.tasks[taskIndex];
                project.tasks.splice(taskIndex, 1);
                console.log(`Задача "${task.title}" удалена.`);
            }
        }
    } else if (choice === "3") {
        const projectIndex = prompt(
            "Введите индекс проекта (от 0 до " + (currentUser.projects.length - 1) + "):"
        );
        checkNull(projectIndex);
        const projectIndexNum = parseInt(projectIndex);
        if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
            console.log("Неверный ввод");
        } else {
            const project = currentUser.projects[projectIndex];

            if (project.tasks.length === 0) {
                console.log("В выбранном проекте нет задач.");
                mainMenu();
            }

            const taskIndex = prompt(
                "Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):"
            );
            checkNull(taskIndex);
            const taskIndexNum = parseInt(taskIndex);
            if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
                console.log("Неверный ввод");
            } else {
                const task = project.tasks[taskIndex];

                if (task.subtasks.length === 0) {
                    console.log("В выбранной задаче нет подзадач.");
                    mainMenu();
                }

                const subtaskIndex = prompt(
                    "Введите индекс подзадачи (от 0 до " + (task.subtasks.length - 1) + "):"
                );
                checkNull(subtaskIndex);
                const subtaskIndexNum = parseInt(subtaskIndex);
                if (subtaskIndexNum > task.subtasks.length - 1 || subtaskIndexNum < 0) {
                    console.log("Неверный ввод");
                } else {
                    const subtask = task.subtasks[subtaskIndexNum];
                    task.subtasks.splice(subtaskIndexNum, 1);
                    console.log(`Подзадача "${subtask.title}" удалена.`);
                }
            }
        }
    } else {
        console.log("Неверный выбор!");
    }
}


// Фкункция выставления приоритета задачи
export function setTaskPriority() {
    const currentUser = checkUserForProjects();

    if (currentUser.projects.length === 0) {
        console.log("У текущего пользователя нет проектов.");
        return;
    }

    console.log(`Задачи пользователя ${currentUser.name}:`);
    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        if (project.tasks.length === 0) {
            console.log("  Нет задач");
        } else {
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: ${task.title}`);
                console.log(`  Приоритет: ${task.priority}`)
            });
        }
    });

    const projectIndex = prompt("Введите индекс проекта (от 0 до " + (currentUser.projects.length - 1) + "):");
    checkNull(projectIndex);
    const projectIndexNum = parseInt(projectIndex)
    if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
        console.log("Неверный ввод")
    }
    else {
        const project = currentUser.projects[projectIndex];
        if (project.tasks.length === 0) {
            console.log("В выбранном проекте нет задач.");
            return;
        }
        const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
        checkNull(taskIndex);
        const taskIndexNum = parseInt(taskIndex)
        if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const task = project.tasks[taskIndex];
            const priorityChoice = prompt("Выберите приоритет задачи:\n1. Важная\n2. Срочная\n3. Несрочная\n4. Неважная");
            checkNull(priorityChoice);
            switch (priorityChoice) {
                case "1":
                    task.priority = Priority.IMPORTANT;
                    break;
                case "2":
                    task.priority = Priority.URGENT;
                    break;
                case "3":
                    task.priority = Priority.NOT_URGENT;
                    break;
                case "4":
                    task.priority = Priority.NOT_IMPORTANT;
                    break;
                default:
                    console.log("Неверный выбор приоритета!");
                    return;
            }

            console.log(`Приоритет задачи "${task.title}" установлен на: ${task.priority}`);
        }
    }
}


//Функция добавления подзадачи
export function addSubtaskToExistedTask() {
    const currentUser = checkUserForProjects();

    console.log("Добавление подзадачи к задаче:");
    currentUser.projects.forEach((project, projectIndex) => {
        console.log(`Проект ${projectIndex}: ${project.name}`);
        project.tasks.forEach((task, taskIndex) => {
            console.log(`  Задача ${taskIndex}: Имя - ${task.title} Описание - ${task.description}`);
        });
    });

    const projectIndex = prompt("Введите индекс проекта:");
    checkNull(projectIndex);
    const selectedProject = currentUser.projects[projectIndex];
    const project = currentUser.projects[projectIndex];

    if (selectedProject) {
        const taskIndex = prompt("Введите индекс задачи, к которой вы хотите добавить подзадачу:");
        checkNull(taskIndex);
        const selectedTask = selectedProject.tasks[taskIndex];
        const task = project.tasks[taskIndex];

        if (selectedTask) {
            const newTitle = prompt("Введите имя новой подзадачи");
            checkNull(newTitle);
            const newDate = prompt("Введите время новой подзадачи");
            checkNull(newDate);
            const newDescription = prompt("Введите описание новой подзадачи");
            checkNull(newDescription);
            const newSubtask = {
                title: newTitle,
                dueDate: newDate,
                description: newDescription,
                type: task.type
            };

            selectedTask.subtasks.push(newSubtask);
            console.log("Подзадача успешно добавлена к задаче.");
        } else {
            console.log("Неверный индекс задачи.");
        }
    } else {
        console.log("Неверный индекс проекта.");
    }
}