import { Task } from './classes.js'
import { Project } from './classes.js'
import { User } from './classes.js'
import { Subtask } from './classes.js'
import { users } from './classes.js'
import { mainMenu } from './main-menu.js'
import { Priority } from './classes.js'

// Функция регистрации пользователя
export function registerUser() {
    const name = prompt("Введите имя пользователя:");
    const user = new User(name);
    users.push(user);
    console.log(`Пользователь ${name} успешно зарегистрирован!`);
}

// Функция проверки существования пользователя при регистрации
export function checkUser() {
    const name = prompt("Введите имя пользователя:");
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
        project = currentUser.projects[projectIndex];
        createTask(currentUser, project);
    } else {
        const projectName = prompt("Введите название проекта:");
        const addCommentChoice = prompt("Хотите добавить комментарий к проекту? (y/n)").toLowerCase();
        let comment;
        if (addCommentChoice === "y") {
            comment = prompt("Введите комментарий:");
            project = new Project(projectName, comment);
            currentUser.projects.push(project);
            console.log(`Проект "${projectName}" успешно создан для пользователя "${currentUser.name}"!`);
            createTask(currentUser, project);
        } else if (addCommentChoice === "n") {
            comment = "No comment";
            project = new Project(projectName, comment);
            currentUser.projects.push(project);
            console.log(`Проект "${projectName}" успешно создан для пользователя "${currentUser.name}"!`);
            createTask(currentUser, project);
        }
        else {
            console.log("Неверный ввод")
        }
    }

}


// Функция создания задачи
export function createTask(currentUser, project) {
    const title = prompt("Введите название задачи:");
    const description = prompt("Введите описание задачи:");
    const deadline = prompt("Введите крайний срок выполнения задачи:");
    const typeChoice = prompt("Выберите тип задачи:\n 1. Встреча\n 2. Событие\n 3. Работа\n 4. Учеба\n 5. Вечиринка\n 6. Торжественное мероприятие\n")
    const priorityChoice = prompt("Выберите приоритет задачи:\n 1. Важная\n 2. Срочная\n 3. Несрочная\n 4. Неважная")
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


// Функция создания проекта
export function createProject() {
    const currentUser = checkUserForProjects();

    const projectName = prompt("Введите название проекта:");
    const answ = prompt("Хотите ввести коммент к проекту?(y/n)")
    if (answ === "y") {
        let comment = prompt("Введите коммент к проекту")
        const project = new Project(projectName, comment);
        currentUser.projects.push(project);
        console.log(`Проект "${project.name}" успешно создан для пользователя "${currentUser.name}"!`);
    }
    else if (answ === "n") {
        let comment = "No comment"
        const project = new Project(projectName, comment);
        currentUser.projects.push(project);
        console.log(`Проект "${project.name}" успешно создан для пользователя "${currentUser.name}"!`);
    }
    else {
        console.log("Неверный ввод")
    }
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
            });
        }
    });

    const projectIndex = prompt("Введите индекс проекта (от 0 до " + (currentUser.projects.length - 1) + "):");
    const projectIndexNum = parseInt(projectIndex)
    if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
        console.log("Неверный ввод")
    }
    else {
        const project = currentUser.projects[projectIndex];
        const comment = prompt("Введите комментарий к проекту:");
        if (comment) {
            project.addComment(comment);
            console.log(`Комментарий успешно добавлен к проекту "${project.name}".`);
        } else {
            console.log("Вы не ввели комментарий.");
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
        const taskIndexNum = parseInt(taskIndex)
        if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const task = project.tasks[taskIndex];

            const changeTaskStatusChoice = confirm("Хотите изменить статус готовности задачи?");
            if (changeTaskStatusChoice && project.tasks.length > 0) {
                const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
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
        console.log(`Проект ${projectIndex}: ${project.name}, comment - ${project.comment}`);
        if (project.tasks.length === 0) {
            console.log("  Нет задач");
        } else {
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Задача ${taskIndex}: ${task.title}`);
            });
        }
    });

    const choice = prompt("Выберите действие:\n1. Просмотреть задачу\n2. Просмотреть проект");
    if (choice === "1") {
        const projectIndex = prompt("Введите индекс проекта пользователя (от 0 до " + (currentUser.projects.length - 1) + "):");
        const projectIndexNum = parseInt(projectIndex)
        if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
            console.log("Неверный ввод")
            mainMenu();
        }
        else {
            const project = currentUser.projects[projectIndex];
            const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
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
                        console.log(`   Готовность: ${subtask.completed ? 'Завершено' : 'Ожидает выполнения'}`);
                    });
                }
            }
        }
    } else if (choice === "2") {
        const projectIndex = prompt("Введите индекс проекта пользователя (от 0 до " + (currentUser.projects.length - 1) + "):");
        const projectIndexNum = parseInt(projectIndex)
        if (projectIndexNum > currentUser.projects.length - 1 || projectIndexNum < 0) {
            console.log("Неверный ввод")
            mainMenu();
        }
        else {
            const project = currentUser.projects[projectIndex];

            if (project.tasks.length === 0) {
                console.log("  Нет задач");
            } else {
                console.log(`Задачи проекта "${project.name}":`);
                project.tasks.forEach((task, taskIndex) => {
                    console.log(`  Задача ${taskIndex}: ${task.title}`);
                });
                console.log(`  Комментарии к проекту: ${project.comment}`);
                const taskIndex = prompt("Введите индекс задачи (от 0 до " + (project.tasks.length - 1) + "):");
                const taskIndexNum = parseInt(taskIndex)
                if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
                    console.log("Неверный ввод")
                }
                else {
                    const task = project.tasks[taskIndex];

                    console.log(`Вы выбрали задачу "${task.title}"`);
                    console.log(`Описание задачи: ${task.description}`);
                    console.log(`Тип задачи: ${task.type}`)
                    console.log(`Время выполнения: ${task.deadline}`);
                    console.log(`Приоритет: ${task.priority}`)
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
                            console.log(`   Готовность: ${subtask.completed ? 'Завершено' : 'Ожидает выполнения'}`);
                        });
                    }
                }
            }
        }
    } else {
        console.log("Неверный выбор!");
    }
}


// Функция изменения данных проектов и задач
export function changeCurrentUserData() {
    const currentUser = checkUserForProjects();

    const choice = prompt("Выберите, что вы хотите изменить:\n1. Проекты\n2. Задачи");

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
        const selectedProject = currentUser.projects[projectIndex];

        if (selectedProject) {
            const newComment = prompt("Введите новый комментарий к проекту:");
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
                console.log(`  Задача ${taskIndex}: Имя - ${task.title} Описание - ${task.description}`);
                console.log(`  Время выполнения: ${task.deadline}`);
                console.log(`  Приоритет: ${task.priority}`)
            });
        });

        const projectIndex = prompt("Введите индекс проекта:");
        const selectedProject = currentUser.projects[projectIndex];

        if (selectedProject) {
            const taskIndex = prompt("Введите индекс задачи, которую вы хотите изменить:");
            const selectedTask = selectedProject.tasks[taskIndex];

            if (selectedTask) {
                const newTitleChoise = prompt("Хотите введите новое имя задачи?(y/n)");
                if (newTitleChoise === "y") {
                    const newTitle = prompt("Введите новое имя задачи:")
                    selectedTask.title = newTitle;
                }
                const newDescriptionChoise = prompt("Хотите введите новое описание задачи?(y/n)");
                if (newDescriptionChoise === "y") {
                    const newDescription = prompt("Введите новое описание задачи:")
                    selectedTask.description = newDescription;
                }
                const newDeadlineChoise = prompt("Хотите ввести новую дату выполнения задачи?(y/n):");
                if (newDeadlineChoise === "y") {
                    const newDeadline = prompt("Введите новый дедлайн задачи:")
                    selectedTask.deadline = newDeadline;
                }
                const newPriorityChoise = prompt("Хотите ввести новый приоритет задачи?(y/n)");
                if (newPriorityChoise === "y") {
                    const priorityChoice = prompt("Введите новый приоритет задачи:\n 1. Важная\n 2. Срочная\n 3. Несрочная\n 4.Неважная")
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
                console.log("Задача успешно изменена.");
            } else {
                console.log("Неверный индекс задачи.");
            }
        } else {
            console.log("Неверный индекс проекта.");
        }
    } else {
        console.log("Неверный выбор!");
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

    if (choice === "1") {
        const projectIndex = prompt("Введите индекс проекта (от 0 до " + (currentUser.projects.length - 1) + "):");
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
        const taskIndexNum = parseInt(taskIndex)
        if (taskIndexNum > project.tasks.length - 1 || taskIndexNum < 0) {
            console.log("Неверный ввод")
        }
        else {
            const task = project.tasks[taskIndex];
            const priorityChoice = prompt("Выберите приоритет задачи:\n1. Важная\n2. Срочная\n3. Несрочная\n4. Неважная");
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

